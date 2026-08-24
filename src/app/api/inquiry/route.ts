import { NextResponse } from "next/server";
import { deliverInquiry, validateInquiry } from "@/lib/inquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const result = validateInquiry({
    name: String(input.name ?? ""),
    company: String(input.company ?? ""),
    email: String(input.email ?? ""),
    phone: String(input.phone ?? ""),
    buyerType: String(input.buyerType ?? ""),
    country: String(input.country ?? ""),
    message: String(input.message ?? ""),
    locale: String(input.locale ?? "en"),
    privacyConsent: Boolean(input.privacyConsent),
  });

  if (!result.payload) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    const delivery = await deliverInquiry(result.payload);
    return NextResponse.json({ ok: true, ...delivery });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
