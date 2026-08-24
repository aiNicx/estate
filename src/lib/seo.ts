import type { Metadata } from "next";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { imageById } from "@/content/images";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export function localeMetadata(
  locale: Locale,
  pathname: string,
  overrides?: { title?: string; description?: string },
): Metadata {
  const copy = t(locale);
  const title = overrides?.title ?? copy.meta.title;
  const description = overrides?.description ?? copy.meta.description;
  const url = absoluteUrl(locale, pathname);
  const hero = imageById("hero-cove-aerial");
  const ogImage = hero?.available ? `${getSiteUrl()}${hero.src}` : undefined;

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
      title: overrides?.title ?? copy.meta.ogTitle,
      description: overrides?.description ?? copy.meta.ogDescription,
      images: ogImage
        ? [{ url: ogImage, alt: hero?.alt[locale] }]
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
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
