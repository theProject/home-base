import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  // ✅ 1. Allow essential static & framework assets through
  if (
    pathname.startsWith("/_next") || // Next.js internals
    pathname.startsWith("/api") ||   // APIs
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/fonts") ||
    pathname.match(/\.(?:mp4|webm|jpg|jpeg|png|gif|svg|ico|css|js|txt|json|xml|map)$/i)
  ) {
    return NextResponse.next();
  }

  // ✅ 2. Redirect everything else if maintenance mode is enabled
  if (maintenance) {
    const url = new URL("/maintenance", request.url);
    return NextResponse.redirect(url);
  }

  // ✅ 3. Otherwise, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
