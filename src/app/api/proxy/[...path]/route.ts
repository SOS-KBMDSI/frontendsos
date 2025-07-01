import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import axios, { Method } from "axios";

const PROXY_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;

  const params = await context.params;
  const path = params.path.join("/");

  if (!path) {
    return NextResponse.json({ message: "Path tidak valid" }, { status: 400 });
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let body: FormData | object | null = null;
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      body = await request.formData();
    } else if (contentType?.includes("application/json")) {
      body = await request.json();
      headers["Content-Type"] = "application/json";
    }

    const response = await axios({
      method: request.method as Method,
      url: `${PROXY_API_BASE_URL}/${path}`,
      headers: headers,
      data: body,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    let message = "Terjadi kesalahan pada proxy";
    let status = 500;
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
      status = error.response?.status || status;
    }
    return NextResponse.json({ message }, { status });
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
