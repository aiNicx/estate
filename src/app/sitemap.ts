import { locales } from "@/content/property";
import { getSiteUrl, localizedPath } from "@/lib/site";

const paths = [
  "",
  "/the-property",
  "/spaces",
  "/location",
  "/investment",
  "/heritage",
  "/gallery",
  "/request",
  "/privacy",
];

export default function sitemap() {
  const site = getSiteUrl();
  return locales.flatMap((locale) =>
    paths.map((pathname) => ({
      url: `${site}${localizedPath(locale, pathname)}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${site}${localizedPath("en", pathname)}`,
          it: `${site}${localizedPath("it", pathname)}`,
          "x-default": `${site}${localizedPath("en", pathname)}`,
        },
      },
    })),
  );
}
