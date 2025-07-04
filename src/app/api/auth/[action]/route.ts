import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);
async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const { action } = await context.params;

  if (action === "login") {
    try {
      const body = await request.json();
      const response = await axios.post(`${API_BASE_URL}/api/login`, body);

      const { token } = response.data.data;

      if (!token) {
        throw new Error("Token tidak ditemukan dari backend");
      }

      const payload = await verifyToken(token);

      if (!payload) {
        throw new Error("Token dari backend tidak valid");
      }

      (await cookies()).set("auth_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 7,
        path: "/",
        sameSite: "strict",
      });

      const userRole = payload.Role as string;

      let redirectUrl = "/";
      if (userRole === "admin") {
        redirectUrl = "/admin/dashboard";
      }

      return NextResponse.json({
        message: response.data.message || "Login berhasil",
        profile: payload,
        redirectUrl: redirectUrl,
      });
    } catch (error: unknown) {
      let message = "Login gagal, email atau password salah.";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      return NextResponse.json({ message }, { status: 401 });
    }
  }

  if (action === "logout") {
    (await cookies()).delete("auth_session");
    return NextResponse.json({ message: "Logout berhasil" });
  }

  return NextResponse.json({ message: "Aksi tidak valid" }, { status: 400 });
}
