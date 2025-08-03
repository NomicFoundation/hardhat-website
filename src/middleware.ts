/**
 * This middleware is used to redirect `/hardhat-runner` links to the v2 website
 * through `/hardhat2/redirect?r=<path>`.
 */

/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/hardhat-runner")) {
    const url = request.nextUrl.clone();
    url.pathname = "/hardhat2/redirect";
    url.search = `r=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hardhat-runner/:path*"],
};
