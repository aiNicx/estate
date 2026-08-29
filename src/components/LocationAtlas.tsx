"use client";

import { useState } from "react";
import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import { mapViewIds, type MapViewId } from "@/content/geography";
import { EstateMap } from "./EstateMap";

export function LocationAtlas({ locale }: { locale: Locale }) {
  const copy = t(locale).location;
  const [view, setView] = useState<MapViewId>("local");

  return (
    <figure className="location-atlas">
      <div className="location-atlas-toolbar">
        <p className="kicker m-0">{copy.map.kicker}</p>
        <div className="location-atlas-levels" role="tablist" aria-label={copy.map.levelsLabel}>
          {mapViewIds.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              className="location-atlas-level"
              onClick={() => setView(id)}
            >
              {copy.map.levels[id]}
            </button>
          ))}
        </div>
      </div>
      <div className={`location-atlas-frame location-atlas-frame-${view}`}>
        <EstateMap locale={locale} view={view} />
      </div>
      <figcaption className="location-map-meta">
        <div className="min-w-0">
          <p className="location-map-caption">{copy.map.captions[view]}</p>
          <p className="location-map-credit">{copy.map.credit}</p>
        </div>
        <a
          className="location-map-cta"
          href={property.geo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.openMaps}
        </a>
      </figcaption>
    </figure>
  );
}
