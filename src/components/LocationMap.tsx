import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { EstateMap } from "./EstateMap";

/**
 * Compact coastal map for the homepage. The listing pin uses published coordinates.
 */
export function LocationMap({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const copy = t(locale).location;

  return (
    <figure className={`location-map ${compact ? "location-map-compact" : ""}`}>
      <div className="location-map-frame">
        <EstateMap locale={locale} view="coast" interactive={false} />
      </div>
      <figcaption className="location-map-simple-caption">
        {copy.mapCaption}
      </figcaption>
    </figure>
  );
}
