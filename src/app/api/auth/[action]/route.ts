import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
        throw new Error("Token tidak ditemukan");
      }

      (await cookies()).set("auth_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "strict",
      });

      return NextResponse.json({
        message: response.data.message || "Login berhasil",
        profile: response.data.data.profile,
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
