"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PROSPECTS_COOKIE,
  isValidSessionToken,
  prospectsCookieOptions,
  sessionToken,
  verifyPin,
} from "@/lib/prospects/session";

export async function hasProspectsSession(): Promise<boolean> {
  const jar = await cookies();
  return isValidSessionToken(jar.get(PROSPECTS_COOKIE)?.value);
}

export async function unlockProspects(
  _prev: { error: boolean } | null,
  formData: FormData,
): Promise<{ error: boolean }> {
  const pin = String(formData.get("pin") ?? "");
  if (!verifyPin(pin)) {
    return { error: true };
  }
  const token = sessionToken();
  if (!token) return { error: true };
  const jar = await cookies();
  jar.set(PROSPECTS_COOKIE, token, prospectsCookieOptions);
  redirect("/prospects");
}

export async function lockProspects(): Promise<void> {
  const jar = await cookies();
  jar.set(PROSPECTS_COOKIE, "", { ...prospectsCookieOptions, maxAge: 0 });
  redirect("/prospects");
}
