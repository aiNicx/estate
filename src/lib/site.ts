import { property } from "../content/property.ts";

export const site = {
  name: property.names,
  /** Used when NEXT_PUBLIC_SITE_URL and Vercel URLs are unset. */
  defaultUrl: "http://localhost:3000",
  localePrefix: true,
} as const;

function originFrom(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (!url.hostname) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    originFrom(process.env.NEXT_PUBLIC_SITE_URL) ??
    originFrom(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    originFrom(process.env.VERCEL_URL) ??
    site.defaultUrl
  );
}

export function localizedPath(locale: string, pathname = ""): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: string, pathname = ""): string {
  return `${getSiteUrl()}${localizedPath(locale, pathname)}`;
}

/**
 * Optional controller identity for the privacy notice, e.g.
 * PRIVACY_CONTROLLER="Name Surname | Street, City | privacy@example.com".
 * Read at build time; nothing is shown when it is unset.
 */
export function privacyController(): string[] {
  return (process.env.PRIVACY_CONTROLLER ?? "")
    .split(/\s*[|\n]\s*/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);
}

const EMAIL = /^[^\s@<>()[\]\,;:"]+@[^\s@<>()[\]\,;:"]+\.[^\s@<>()[\]\,;:"]{2,}$/;

/** Address shown in the brochure for requests (CONTACT_EMAIL, read at build time). */
export function contactEmail(env: Record<string, string | undefined> = process.env): string | null {
  const value = env.CONTACT_EMAIL?.trim();
  return value && EMAIL.test(value) ? value : null;
}

export function mailtoHref(email: string, subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}?${params.join("&")}`;
}
