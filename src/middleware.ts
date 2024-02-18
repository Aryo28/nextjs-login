import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const ispublicPath = path === "/login" || path === "/signup";
  const currentToken = request.cookies.get("token")?.value || "";
  if (ispublicPath && currentToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!ispublicPath && !currentToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:path*", "/login/:path*", "/signup/:path*"],
};
