import type { Metadata } from "next";
import type { Locale } from "../content/property.ts";
import { brochureCopy } from "../content/brochure.ts";
import { absoluteUrl, getSiteUrl } from "./site.ts";

export function localeMetadata(
  locale: Locale,
  pathname: string,
  overrides?: { title?: string; description?: string },
): Metadata {
  const copy = brochureCopy(locale);
  const title = overrides?.title ?? copy.meta.title;
  const description = overrides?.description ?? copy.meta.description;
  const url = absoluteUrl(locale, pathname);
  const ogImage = absoluteUrl(locale, "/opengraph-image");

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl("en", pathname),
        it: absoluteUrl("it", pathname),
        "x-default": absoluteUrl("en", pathname),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_GB",
      alternateLocale: locale === "it" ? ["en_GB"] : ["it_IT"],
      url,
      siteName: copy.meta.siteName,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: copy.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: false,
      follow: false,
    },
    other: {
      "og:locale:alternate": locale === "en" ? "it_IT" : "en_GB",
    },
  };
}

export function hreflangLinks(pathname: string) {
  return [
    { rel: "alternate", hreflang: "en", href: absoluteUrl("en", pathname) },
    { rel: "alternate", hreflang: "it", href: absoluteUrl("it", pathname) },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: absoluteUrl("en", pathname),
    },
  ] as const;
}
