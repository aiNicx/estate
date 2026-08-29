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
import { locationMap, mapBasemap, mapPlaces } from "@/content/geography";

type MapStatus = "loading" | "ready" | "failed";

function basemapStyle(): StyleSpecification {
  return {
    version: 8,
    sources: {
      basemap: {
        type: "raster",
        tiles: [...mapBasemap.tiles],
        tileSize: mapBasemap.tileSize,
        maxzoom: mapBasemap.maxzoom,
        attribution: mapBasemap.attribution,
      },
    },
    layers: [{ id: "basemap", type: "raster", source: "basemap" }],
  };
}

function markerElement(
  placeId: string,
  labels: ReturnType<typeof t>["location"]["mapLabels"],
) {
  const isProperty = placeId === "property";
  const root = document.createElement("div");
  root.className = isProperty ? "estate-marker estate-marker-property" : "estate-marker";

  if (isProperty) {
    const locality = document.createElement("small");
    locality.textContent = property.location.locality;
    root.append(locality);
  }

  const label = document.createElement(isProperty ? "strong" : "span");
  label.textContent = labels[placeId as keyof typeof labels];
  root.append(label);

  const dot = document.createElement("i");
  dot.setAttribute("aria-hidden", "true");
  root.append(dot);
  return root;
}

export function EstateMap({
  locale,
  interactive = true,
}: {
  locale: Locale;
  interactive?: boolean;
}) {
  const copy = t(locale).location;
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<MapStatus>("loading");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const labels = t(locale).location.mapLabels;
    const compactPointer = window.matchMedia("(pointer: coarse)").matches;
    const canInteract = interactive && !compactPointer;
    const mobile = host.clientWidth < 640;

    setStatus("loading");
    const map = new MapLibreMap({
      container: host,
      style: basemapStyle(),
      center: locationMap.center,
      zoom: mobile ? locationMap.zoom.mobile : locationMap.zoom.desktop,
      pitch: 0,
      bearing: 0,
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
      fadeDuration: 0,
    });

    map.addControl(new AttributionControl({ compact: true }), "bottom-left");

    const markers = mapPlaces().map((place) =>
      new Marker({
        element: markerElement(place.id, labels),
        anchor: "bottom",
        pitchAlignment: "viewport",
        rotationAlignment: "viewport",
      })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map),
    );

    const resize = () => map.resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    map.on("load", () => {
      map.resize();
      setStatus("ready");
    });

    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "failed" : current));
    }, 10_000);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
      for (const marker of markers) marker.remove();
      map.remove();
    };
  }, [interactive, locale]);

  return (
    <div className="estate-map-shell">
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
    </div>
  );
}
