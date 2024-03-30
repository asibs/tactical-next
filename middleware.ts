import { NextResponse, URLPattern } from "next/server";
import { ipAddress } from "@vercel/edge";

export const config = { matcher: ["/", "/join", "/abtest/:path*"] };

export default function middleware(request: Request) {
  const urlPattern = new URLPattern(request.url);

  if (urlPattern.pathname.match("abtest")) {
    //Don't allow manual navigation to abtests
    return NextResponse.error();
  }

  // Randomize where no ip address (should only be the case in dev...)
  const ip = ipAddress(request) || (Math.random() * 100).toString();
  const pageVersion = (parseInt(ip.split(".").join("")) || 0) % 2;

  const url = new URL(
    "abtest/" + pageVersion + urlPattern.pathname,
    request.url,
  );
  return NextResponse.rewrite(url);
}
