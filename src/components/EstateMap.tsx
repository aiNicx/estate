"use client";

import { useEffect, useId, useRef } from "react";
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import {
  mapCameras,
  placesForView,
  type MapViewId,
} from "@/content/geography";

type EstateMapProps = {
  locale: Locale;
  view: MapViewId;
  interactive?: boolean;
};

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    basemap: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        "&copy; OpenStreetMap contributors &copy; CARTO",
      maxzoom: 20,
    },
    terrain: {
      type: "raster-dem",
      tiles: [
        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      ],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 15,
      attribution: "Elevation tiles by AWS",
    },
  },
  layers: [
    {
      id: "basemap",
      type: "raster",
      source: "basemap",
      paint: {
        "raster-saturation": -0.35,
        "raster-contrast": 0.08,
        "raster-brightness-min": 0.04,
        "raster-brightness-max": 0.96,
      },
    },
    {
      id: "terrain-shading",
      type: "hillshade",
      source: "terrain",
      paint: {
        "hillshade-exaggeration": 0.45,
        "hillshade-shadow-color": "#3c4f3d",
        "hillshade-highlight-color": "#fbf8f2",
        "hillshade-accent-color": "#1b3a4a",
        "hillshade-illumination-direction": 315,
      },
    },
  ],
};

export function EstateMap({ locale, view, interactive = true }: EstateMapProps) {
  const copy = t(locale).location;
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const viewRef = useRef(view);
  const localeRef = useRef(locale);
  const uid = useId();

  useEffect(() => {
    viewRef.current = view;
    localeRef.current = locale;
  }, [view, locale]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactPointer = window.matchMedia("(pointer: coarse)").matches;
    const canInteract = interactive && !compactPointer;
    const camera = mapCameras[viewRef.current];
    const map = new MapLibreMap({
      container: host,
      style: MAP_STYLE,
      center: camera.center,
      zoom: camera.zoom,
      pitch: reduceMotion ? 0 : camera.pitch,
      bearing: reduceMotion ? 0 : camera.bearing,
      minZoom: 7,
      maxZoom: 16.5,
      maxBounds: [
        [13.55, 40.28],
        [15.45, 41.22],
      ],
      attributionControl: false,
      interactive: canInteract,
      fadeDuration: reduceMotion ? 0 : 300,
      dragRotate: false,
      pitchWithRotate: false,
    });

    map.addControl(
      new AttributionControl({ compact: true }),
      "bottom-left",
    );

    if (canInteract) {
      map.addControl(
        new NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: false,
        }),
        "bottom-right",
      );
    }

    const applyView = (next: MapViewId, withMotion: boolean) => {
      const shot = mapCameras[next];
      const pitch = reduceMotion ? 0 : shot.pitch;
      const bearing = reduceMotion ? 0 : shot.bearing;
      map.setMinZoom(shot.minZoom);
      map.setMaxZoom(shot.maxZoom);
      const cameraOptions = {
        center: shot.center,
        zoom: shot.zoom,
        pitch,
        bearing,
      };
      if (withMotion) map.easeTo({ ...cameraOptions, duration: 850 });
      else map.jumpTo(cameraOptions);
      try {
        map.setTerrain(
          next === "local" && !reduceMotion
            ? { source: "terrain", exaggeration: 1.45 }
            : null,
        );
      } catch {
        /* DEM tiles are optional */
      }
    };

    const paintMarkers = () => {
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = [];
      const currentLocale = localeRef.current;
      const labels = t(currentLocale).location.mapLabels;
      const places = placesForView(viewRef.current);

      for (const place of places) {
        const root = document.createElement("div");
        const isProperty = place.id === "property";
        root.className = isProperty ? "estate-marker estate-marker-property" : "estate-marker";
        root.innerHTML = `<i></i><span>${labels[place.id as keyof typeof labels]}</span>`;
        const marker = new Marker({
          element: root,
          anchor: isProperty ? "center" : "bottom",
          pitchAlignment: "viewport",
          rotationAlignment: "viewport",
        })
          .setLngLat([place.longitude, place.latitude])
          .addTo(map);
        markersRef.current.push(marker);
      }
    };

    paintMarkers();
    map.on("load", () => {
      applyView(viewRef.current, false);
      paintMarkers();
    });

    mapRef.current = map;

    return () => {
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [interactive]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.loaded()) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shot = mapCameras[view];
    map.setMinZoom(shot.minZoom);
    map.setMaxZoom(shot.maxZoom);
    map.easeTo({
      center: shot.center,
      zoom: shot.zoom,
      pitch: reduceMotion ? 0 : shot.pitch,
      bearing: reduceMotion ? 0 : shot.bearing,
      duration: reduceMotion ? 0 : 850,
    });
    try {
      map.setTerrain(
        view === "local" && !reduceMotion
          ? { source: "terrain", exaggeration: 1.45 }
          : null,
      );
    } catch {
      /* DEM tiles are optional */
    }

    for (const marker of markersRef.current) marker.remove();
    markersRef.current = [];
    const labels = copy.mapLabels;
    for (const place of placesForView(view)) {
      const root = document.createElement("div");
      const isProperty = place.id === "property";
      root.className = isProperty ? "estate-marker estate-marker-property" : "estate-marker";
      root.innerHTML = `<i></i><span>${labels[place.id as keyof typeof labels]}</span>`;
      markersRef.current.push(
        new Marker({
          element: root,
          anchor: isProperty ? "center" : "bottom",
          pitchAlignment: "viewport",
          rotationAlignment: "viewport",
        })
          .setLngLat([place.longitude, place.latitude])
          .addTo(map),
      );
    }
  }, [view, copy.mapLabels]);

  return (
    <div className="estate-map-shell">
      <div
        ref={hostRef}
        id={uid}
        className="estate-map-canvas"
        role="img"
        aria-label={copy.map.chartAria[view]}
      />
    </div>
  );
}
