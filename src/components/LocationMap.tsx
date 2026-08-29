import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { LazyEstateMap } from "./LazyEstateMap";

/**
 * Compact coastal map for the homepage. The listing pin uses published coordinates.
 */
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
        <LazyEstateMap locale={locale} interactive={false} />
      </div>
      <figcaption className="location-map-simple-caption">
        {copy.mapCaption}
      </figcaption>
    </figure>
  );
}
