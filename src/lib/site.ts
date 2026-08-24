export const site = {
  name: {
    en: "Marina d'Albori Estate",
    it: "Proprietà Marina d'Albori",
  },
  /** Used when NEXT_PUBLIC_SITE_URL is unset. Override in production. */
  defaultUrl: "http://localhost:3000",
  localePrefix: true,
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return site.defaultUrl;
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
