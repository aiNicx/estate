"use client";

import { useEffect, useRef, useState } from "react";
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker,
  type StyleSpecification,
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

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    openmaptiles: {
      type: "vector",
      url: mapResources.basemapTileJson,
      attribution:
        '<a href="https://openfreemap.org/">OpenFreeMap</a> · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    },
    terrain: {
      type: "raster-dem",
      tiles: [mapResources.terrainTiles],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 15,
      attribution:
        '<a href="https://registry.opendata.aws/terrain-tiles/">AWS Terrain Tiles</a> · EU-DEM: produced using Copernicus data and information funded by the European Union',
    },
  },
  layers: [
    {
      id: "land",
      type: "background",
      paint: { "background-color": "#e7e0d2" },
    },
    {
      id: "parks",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      paint: {
        "fill-color": "#cdd0c1",
        "fill-opacity": 0.5,
      },
    },
    {
      id: "residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "residential"],
      paint: {
        "fill-color": "#ddd5c7",
        "fill-opacity": 0.65,
      },
    },
    {
      id: "woodland",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "wood"],
      paint: {
        "fill-color": "#687563",
        "fill-opacity": 0.2,
      },
    },
    {
      id: "terrain-shading",
      type: "hillshade",
      source: "terrain",
      paint: {
        "hillshade-exaggeration": 0.34,
        "hillshade-shadow-color": "#3c4f3d",
        "hillshade-highlight-color": "#fbf8f2",
        "hillshade-accent-color": "#1b3a4a",
        "hillshade-illumination-direction": 315,
      },
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["!=", ["get", "brunnel"], "tunnel"],
      paint: {
        "fill-color": "#1b3a4a",
        "fill-antialias": true,
      },
    },
    {
      id: "waterways",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      paint: {
        "line-color": "#2d6a78",
        "line-opacity": 0.55,
        "line-width": 1,
      },
    },
    {
      id: "paths",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "path"],
      paint: {
        "line-color": "#b8ad9b",
        "line-opacity": 0.6,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.4, 15, 1.2],
        "line-dasharray": [2, 2],
      },
    },
    {
      id: "minor-roads",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["match", ["get", "class"], ["minor", "service", "track"], true, false],
      paint: {
        "line-color": "#f3efe6",
        "line-opacity": 0.9,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.7, 15, 2.2],
      },
    },
    {
      id: "major-road-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "match",
        ["get", "class"],
        ["primary", "secondary", "tertiary", "trunk", "motorway"],
        true,
        false,
      ],
      paint: {
        "line-color": "#b8ad9b",
        "line-opacity": 0.8,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.5, 15, 5],
      },
    },
    {
      id: "major-roads",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "match",
        ["get", "class"],
        ["primary", "secondary", "tertiary", "trunk", "motorway"],
        true,
        false,
      ],
      paint: {
        "line-color": "#fbf8f2",
        "line-opacity": 0.96,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 3.3],
      },
    },
    {
      id: "buildings",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 13,
      paint: {
        "fill-color": "#d2c7b7",
        "fill-outline-color": "#b8ad9b",
        "fill-opacity": 0.8,
      },
    },
  ],
};

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
      style: MAP_STYLE,
      center: locationMap.center,
      zoom: mobile ? locationMap.zoom.mobile : locationMap.zoom.desktop,
      pitch: reducedMotion ? 0 : locationMap.pitch,
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

    const ready = () => setStatus("ready");
    let basemapErrors = 0;
    map.once("style.load", ready);
    map.on("load", () => {
      ready();
      if (reducedMotion) return;
      try {
        map.setTerrain({ source: "terrain", exaggeration: 1.08 });
      } catch {
        // Terrain is an enhancement; the geographic basemap remains useful.
      }
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
