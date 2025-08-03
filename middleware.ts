import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // only run for paths that start with /foo
  if (pathname.startsWith("/foo")) {
    const url = request.nextUrl.clone();

    url.pathname = "/hardhat2/redirect";
    url.search = `r=${encodeURIComponent(pathname + search)}`;

    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hardhat-runner/:path*"],
};
