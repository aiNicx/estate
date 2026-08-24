export const site = {
  name: {
    en: "Marina d'Albori Estate",
    it: "Proprietà Marina d'Albori",
  },
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

export const routes = [
  { href: "", id: "overview" },
  { href: "/the-property", id: "property" },
  { href: "/spaces", id: "spaces" },
  { href: "/location", id: "location" },
  { href: "/investment", id: "investment" },
  { href: "/heritage", id: "heritage" },
  { href: "/gallery", id: "gallery" },
  { href: "/request", id: "request" },
] as const;

export type RouteId = (typeof routes)[number]["id"];
