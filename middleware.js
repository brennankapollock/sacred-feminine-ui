import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if this is an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the authentication status from cookies or headers
    const isAuthenticated =
      request.cookies.get("adminAuthenticated")?.value === "true";

    // If not authenticated and not on the login page, redirect to admin root
    if (!isAuthenticated && request.nextUrl.pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
