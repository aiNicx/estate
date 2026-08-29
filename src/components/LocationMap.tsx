"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";

const EstateMap = dynamic(
  () => import("./EstateMap").then((module) => module.EstateMap),
  {
    ssr: false,
    loading: () => <div className="estate-map-loading" aria-hidden="true" />,
  },
);

export function LocationMap({
  locale,
  compact = false,
  interactive = !compact,
}: {
  locale: Locale;
  compact?: boolean;
  interactive?: boolean;
}) {
  const copy = t(locale).location;

  return (
    <figure className={`location-map ${compact ? "location-map-compact" : ""}`}>
      <div className="location-map-frame">
        <EstateMap locale={locale} interactive={interactive} />
      </div>
      <figcaption className="location-map-caption">{copy.mapCaption}</figcaption>
    </figure>
  );
}
