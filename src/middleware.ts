import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("auth_session")?.value;

  const publicPaths = ["/login", "/register", "/home", "/ds"];

  if (tokenCookie && publicPaths.some((path) => pathname.startsWith(path))) {
    const payload = await verifyToken(tokenCookie);
    if (payload) {
      const userRole = payload.Role as string;
      const url = userRole === "admin" ? "/admin/dashboard" : "/";
      return NextResponse.redirect(new URL(url, request.url));
    }
  }

  if (!tokenCookie) {
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(tokenCookie);

  if (!payload) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_session");
    return response;
  }

  const userRole = payload.Role as string;
  const isAdminRoute = pathname.startsWith("/admin");

  if (userRole === "admin") {
    if (!isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } else {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
