//middleware.js
import { NextResponse } from "next/server";
const PACKERS_DOMAIN = "lesliedoesthelambeauleap.com";
const VIKINGS_DOMAIN = "martinminneapolismiracle.com";

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // Only rewrite the site root so deep links still work
  if (pathname === "/") {
    if (host.includes(PACKERS_DOMAIN)) {
      const url = req.nextUrl.clone();
      url.pathname = "/packers";
      return NextResponse.rewrite(url);
    }
    if (host.includes(VIKINGS_DOMAIN)) {
      const url = req.nextUrl.clone();
      url.pathname = "/vikings";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
