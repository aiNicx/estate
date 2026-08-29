import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";
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
      <div className="location-map-meta">
        <div className="min-w-0">
          <p className="kicker m-0">{copy.mapKicker}</p>
          <p className="location-map-caption">{copy.mapCaption}</p>
          <p className="location-map-credit">{copy.mapCredit}</p>
        </div>
        <a
          className="location-map-cta"
          href={property.geo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.mapAria}
        >
          {copy.openMaps}
        </a>
      </div>
      <div className="location-map-mosaic" aria-hidden="true">
        <MosaicBand />
      </div>
    </figure>
  );
}
