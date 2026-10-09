import { NextResponse } from "next/server";

/** Contact is by reply to the original email. Phase 2 must explicitly enable delivery. */
export async function POST() {
  return NextResponse.json({ ok: false, delivered: false }, { status: 503 });
}
