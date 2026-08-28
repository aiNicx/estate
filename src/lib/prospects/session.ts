import { createHmac, timingSafeEqual } from "node:crypto";

export const PROSPECTS_COOKIE = "md_prospects";
const PURPOSE = "marina-dalbori-prospects-session-v1";
const PIN_COMPARE_KEY = "marina-dalbori-prospects-pin";

export const prospectsCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/prospects",
  maxAge: 60 * 60 * 12,
};

export function configuredPin(): string | null {
  const pin = process.env.PROSPECTS_PIN?.trim();
  return pin ? pin : null;
}

export function verifyPin(candidate: string): boolean {
  const pin = configuredPin();
  if (!pin || !candidate) return false;
  return safeEqual(hmac(PIN_COMPARE_KEY, candidate), hmac(PIN_COMPARE_KEY, pin));
}

export function sessionToken(): string | null {
  const pin = configuredPin();
  if (!pin) return null;
  return hmac(pin, PURPOSE);
}

export function isValidSessionToken(value: string | undefined): boolean {
  const expected = sessionToken();
  if (!expected || !value) return false;
  return safeEqual(value, expected);
}

function hmac(key: string, value: string): string {
  return createHmac("sha256", key).update(value).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
