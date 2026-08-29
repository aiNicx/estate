import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";
import { LocationChart } from "./LocationChart";

/**
 * Compact coastal chart for the homepage. The listing pin uses published coordinates.
 * The full Location page carries the interactive atlas.
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
    <a
      className={`location-map ${compact ? "location-map-compact" : ""}`}
      href={property.geo.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.mapAria}
    >
      <div className="location-map-frame">
        <LocationChart locale={locale} view="coast" />
      </div>
      <div className="location-map-meta">
        <div className="min-w-0">
          <p className="kicker m-0">{copy.mapKicker}</p>
          <p className="location-map-caption">{copy.mapCaption}</p>
          <p className="location-map-credit">{copy.mapCredit}</p>
        </div>
        <span className="location-map-cta">{copy.openMaps}</span>
      </div>
      <div className="location-map-mosaic" aria-hidden="true">
        <MosaicBand />
      </div>
    </a>
  );
}
