import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const password = process.env.ADMIN_PASSWORD;

    if (!password || !token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Simple comparison (Edge Runtime compatible — no crypto)
    const expected = "starry_" + btoa(password);
    if (token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
