import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Locale prefix only. No app imports — keeps the Vercel function tiny.
 * `/` is also redirected from next.config.ts so the site still opens
 * if this function is skipped.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
