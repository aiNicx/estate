import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, accessConfig, verifyToken } from "@/lib/access";
import { deviceFrom, locationFrom, notifyView, shouldNotify } from "@/lib/views";

export const dynamic = "force-dynamic";

const empty = (status: number) => new NextResponse(null, { status, headers: { "Cache-Control": "no-store" } });

/** Records that a personal link was actually viewed. No body is returned. */
export async function POST(request: NextRequest) {
  const access = accessConfig();
  if (access.mode !== "protected") return empty(access.mode === "open" ? 204 : 403);

  const slug = await verifyToken(request.cookies.get(ACCESS_COOKIE)?.value, access.secret, access.revoked);
  if (!slug) return empty(403);

  let locale: "en" | "it" = "en";
  try {
    const body = (await request.json()) as { locale?: unknown };
    if (body.locale === "it") locale = "it";
  } catch {
    // An empty or malformed body still counts as a view in English.
  }

  const view = { slug, locale, at: new Date(), device: deviceFrom(request.headers.get("user-agent")), ...locationFrom(request.headers) };
  console.info("[view]", JSON.stringify({ ...view, at: view.at.toISOString() }));

  if (shouldNotify(slug)) {
    try {
      await notifyView(view);
    } catch (error) {
      console.error("[view] notification not sent", error instanceof Error ? error.message : error);
    }
  }
  return empty(204);
}
