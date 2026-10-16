import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, ACCESS_COOKIE_MAX_AGE, accessConfig, restrictedPage, verifyToken } from "./lib/access.ts";

/**
 * Access control for the private brochure.
 * - /v/<token>[?lang=it] checks a personal link, stores it in a cookie and opens the brochure.
 * - Every page needs a valid cookie; otherwise a neutral page is returned.
 * - The privacy notice stays public. Static assets are excluded by the matcher.
 */

const PUBLIC_PATHS = new Set(["/en/privacy", "/it/privacy"]);

function restricted() {
  return new NextResponse(restrictedPage(), {
    status: 403,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  const response = NextResponse.redirect(url, 302);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

function protect(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const access = accessConfig();

  if (pathname.startsWith("/v/")) {
    const locale = searchParams.get("lang") === "it" ? "it" : "en";
    if (access.mode === "open") return redirect(request, `/${locale}`);
    if (access.mode === "locked") return restricted();
    let token = "";
    try {
      token = decodeURIComponent(pathname.slice(3).replace(/\/$/, ""));
    } catch {
      return restricted();
    }
    if (!(await verifyToken(token, access.secret, access.revoked))) return restricted();
    const response = redirect(request, `/${locale}`);
    response.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });
    return response;
  }

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  if (access.mode === "locked") {
    console.error("[access] ACCESS_SECRET is not set: every page is locked");
    return restricted();
  }
  if (access.mode === "protected") {
    const slug = await verifyToken(request.cookies.get(ACCESS_COOKIE)?.value, access.secret, access.revoked);
    if (!slug) return restricted();
  }

  if (pathname === "/") return redirect(request, "/en");
  return access.mode === "protected" ? protect(NextResponse.next()) : NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|images/|vendor/|icon|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)",
  ],
};
