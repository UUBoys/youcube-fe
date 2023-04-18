import cookie from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { sessionUser } = cookie.parse(request.headers.get("cookie") || "");

  if (sessionUser === undefined || sessionUser === null) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  const parsedUser = JSON.parse(sessionUser);

  if (parsedUser.jwt === undefined || parsedUser.jwt === "") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/video/create"],
};
