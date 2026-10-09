import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Allow crawlers to read noindex and fetch link previews; no sitemap advertised.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}
