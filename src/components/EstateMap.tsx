"use client";

import { useEffect, useRef, useState } from "react";
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import {
  locationMap,
  mapPlaces,
  mapResources,
} from "@/content/geography";

type MapStatus = "loading" | "ready" | "failed";
type EditorialPaintProperty =
  | "background-color"
  | "fill-color"
  | "fill-opacity"
  | "fill-outline-color"
  | "line-color";

const REMOVED_LAYER_PREFIXES = [
  "aeroway",
  "airport",
  "boundary",
  "label_",
  "railway",
  "water_name",
  "waterway_line_label",
] as const;

function configureEditorialStyle(map: MapLibreMap, reducedMotion: boolean) {
  const layers = map.getStyle().layers ?? [];
  for (const layer of layers) {
    if (
      layer.type === "symbol" ||
      REMOVED_LAYER_PREFIXES.some((prefix) => layer.id.startsWith(prefix))
    ) {
      map.removeLayer(layer.id);
    }
  }

  const setPaint = (
    layerId: string,
    propertyName: EditorialPaintProperty,
    value: string | number,
  ) => {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, propertyName, value);
    }
  };

  setPaint("background", "background-color", "#e7e0d2");
  setPaint("water", "fill-color", "#1b3a4a");
  setPaint("park", "fill-color", "#cdd0c1");
  setPaint("park", "fill-opacity", 0.52);
  setPaint("landcover_wood", "fill-color", "#687563");
  setPaint("landcover_wood", "fill-opacity", 0.2);
  setPaint("landuse_residential", "fill-color", "#ddd5c7");
  setPaint("building", "fill-color", "#d2c7b7");
  setPaint("building", "fill-outline-color", "#b8ad9b");
  setPaint("waterway", "line-color", "#2d6a78");
  setPaint("highway_minor", "line-color", "#f3efe6");
  setPaint("highway_major_casing", "line-color", "#b8ad9b");
  setPaint("highway_major_inner", "line-color", "#fbf8f2");
  setPaint("highway_major_subtle", "line-color", "#c9beac");
  setPaint("highway_motorway_casing", "line-color", "#b8ad9b");
  setPaint("highway_motorway_inner", "line-color", "#fbf8f2");
  setPaint("highway_motorway_subtle", "line-color", "#c9beac");

  if (!map.getSource("estate-terrain")) {
    map.addSource("estate-terrain", {
      type: "raster-dem",
      tiles: [mapResources.terrainTiles],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 15,
      attribution:
        '<a href="https://registry.opendata.aws/terrain-tiles/">AWS Terrain Tiles</a> · EU-DEM: produced using Copernicus data and information funded by the European Union',
    });
  }

  if (!map.getLayer("estate-terrain-shading")) {
    map.addLayer(
      {
        id: "estate-terrain-shading",
        type: "hillshade",
        source: "estate-terrain",
        paint: {
          "hillshade-exaggeration": 0.34,
          "hillshade-shadow-color": "#3c4f3d",
          "hillshade-highlight-color": "#fbf8f2",
          "hillshade-accent-color": "#1b3a4a",
          "hillshade-illumination-direction": 315,
        },
      },
      map.getLayer("water") ? "water" : undefined,
    );
  }

  if (!reducedMotion) {
    try {
      map.setTerrain({ source: "estate-terrain", exaggeration: 1.08 });
    } catch {
      // Terrain is an enhancement; the geographic basemap remains useful.
    }
  }
}

export function EstateMap({
  locale,
  interactive = true,
}: {
  locale: Locale;
  interactive?: boolean;
}) {
  const copy = t(locale).location;
  const markerLabels = copy.mapLabels;
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [status, setStatus] = useState<MapStatus>("loading");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compactPointer = window.matchMedia("(pointer: coarse)").matches;
    const canInteract = interactive && !compactPointer;
    const mobile = host.clientWidth < 640;

    setStatus("loading");
    const map = new MapLibreMap({
      container: host,
      style: mapResources.basemapStyle,
      center: locationMap.center,
      zoom: mobile ? locationMap.zoom.mobile : locationMap.zoom.desktop,
      pitch: reducedMotion || mobile ? 0 : locationMap.pitch,
      bearing: locationMap.bearing,
      minZoom: locationMap.minZoom,
      maxZoom: locationMap.maxZoom,
      maxBounds: [
        [14.42, 40.52],
        [14.96, 40.82],
      ],
      attributionControl: false,
      interactive: canInteract,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      doubleClickZoom: false,
      fadeDuration: reducedMotion ? 0 : 250,
    });

    map.addControl(
      new AttributionControl({ compact: true }),
      "bottom-left",
    );

    markersRef.current = mapPlaces().map((place) => {
      const isProperty = place.id === "property";
      const root = document.createElement("div");
      root.className = isProperty
        ? "estate-marker estate-marker-property"
        : "estate-marker";

      if (isProperty) {
        const locality = document.createElement("small");
        locality.textContent = property.location.locality;
        root.append(locality);
      }

      const label = document.createElement(isProperty ? "strong" : "span");
      label.textContent =
        markerLabels[place.id as keyof typeof markerLabels];
      root.append(label);

      const dot = document.createElement("i");
      dot.setAttribute("aria-hidden", "true");
      root.append(dot);

      return new Marker({
        element: root,
        anchor: "bottom",
        pitchAlignment: "viewport",
        rotationAlignment: "viewport",
      })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);
    });

    let basemapErrors = 0;
    map.once("style.load", () => {
      configureEditorialStyle(map, reducedMotion);
      setStatus("ready");
    });
    map.on("error", (event) => {
      const sourceId = (event as { sourceId?: string }).sourceId;
      if (sourceId !== "openmaptiles") return;
      basemapErrors += 1;
      if (basemapErrors >= 4) setStatus("failed");
    });

    const initializationTimer = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "failed" : current));
    }, 12_000);

    mapRef.current = map;
    return () => {
      window.clearTimeout(initializationTimer);
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [interactive, markerLabels]);

  return (
    <>
      <div
        ref={hostRef}
        className={`estate-map-canvas estate-map-canvas-${status}`}
        role="img"
        aria-label={copy.map.ariaLabel}
      />
      {status === "loading" ? (
        <div className="estate-map-loading" aria-hidden="true" />
      ) : null}
      {status === "failed" ? (
        <div className="estate-map-unavailable" role="status">
          <p>{copy.map.unavailableTitle}</p>
          <span>{copy.map.unavailableBody}</span>
        </div>
      ) : null}
    </>
  );
}
