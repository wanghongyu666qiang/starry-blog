import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_token";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const password = process.env.ADMIN_PASSWORD;

    if (!password || !token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expected = hashPassword(password + password);
    if (token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
