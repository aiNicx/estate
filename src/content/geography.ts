/**
 * Geographic configuration for the Location page.
 * Factual coordinates and categories live here once; IT/EN presentation copy stays in messages.
 *
 * Coordinate classes:
 * - property.geo: supplied listing pin
 * - places: public geographic context (gazetteer), not a survey of the estate
 * Distances are straight-line from the listing pin and must be labelled approximate.
 */
import { property, type FactStatus, type Locale } from "./property.ts";
import {
  haversineKm,
  roundPublishedKm,
} from "../lib/geo.ts";

export const placeIds = [
  "property",
  "vietri",
  "cetara",
  "salerno",
  "salerno-station",
  "qsr",
  "nap",
] as const;
export type PlaceId = (typeof placeIds)[number];

export type PlaceCategory = "property" | "locality" | "municipality" | "coast-town" | "city" | "rail" | "airport";

export type GeoPlace = {
  id: PlaceId;
  category: PlaceCategory;
  longitude: number;
  latitude: number;
  status: FactStatus;
  /** Proper names shared across languages; labels that differ live in messages. */
  name?: string;
};

/**
 * A single authoritative map view. Wider coast and transport context stays in
 * normal HTML rather than competing with the immediate setting on the map.
 */
export const locationMap = {
  center: [14.738, 40.668] as [number, number],
  zoom: {
    mobile: 11.3,
    desktop: 12.35,
  },
  minZoom: 10,
  maxZoom: 16,
  placeIds: ["property", "vietri", "salerno"] as const satisfies readonly PlaceId[],
} as const;

/** Keyless raster tiles. Vector style URLs (OpenFreeMap) and DEM hillshade are not used. */
export const mapBasemap = {
  tiles: [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  ],
  tileSize: 256,
  maxzoom: 16,
  attribution:
    'Tiles © <a href="https://www.esri.com/">Esri</a> — Esri, USGS, NOAA, and the GIS User Community',
  requiresToken: false,
} as const;

export const places: readonly GeoPlace[] = [
  {
    id: "property",
    category: "property",
    longitude: property.geo.longitude,
    latitude: property.geo.latitude,
    status: property.geo.status,
  },
  {
    id: "vietri",
    category: "municipality",
    name: "Vietri sul Mare",
    longitude: 14.7278,
    latitude: 40.6708,
    status: "geographic-context",
  },
  {
    id: "cetara",
    category: "coast-town",
    name: "Cetara",
    longitude: 14.7008,
    latitude: 40.6475,
    status: "geographic-context",
  },
  {
    id: "salerno",
    category: "city",
    name: "Salerno",
    longitude: 14.7594,
    latitude: 40.6806,
    status: "geographic-context",
  },
  {
    id: "salerno-station",
    category: "rail",
    longitude: 14.7728,
    latitude: 40.6753,
    status: "geographic-context",
  },
  {
    id: "qsr",
    category: "airport",
    longitude: 14.9113,
    latitude: 40.62,
    status: "geographic-context",
  },
  {
    id: "nap",
    category: "airport",
    longitude: 14.2908,
    latitude: 40.8847,
    status: "geographic-context",
  },
];

export const access = {
  land: {
    mode: "pedestrian-stepped-path" as const,
    from: "road-level" as const,
    vehicularAccessToBuildings: property.landAccess.vehicularAccessToBuildings,
    stepCount: property.landAccess.stepCount,
    status: property.landAccess.status,
  },
  sea: {
    waterfrontCove: property.waterfront.seaRelationship,
    seasonalLandingConcession: property.waterfront.seasonalPontoonConcession,
    scheduledFerryAtProperty: false,
    privateHarbour: false,
    yearRoundBoatAccessGuaranteed: false,
    status: property.waterfront.status,
  },
} as const;

export function placeById(id: PlaceId): GeoPlace {
  const place = places.find((item) => item.id === id);
  if (!place) throw new Error(`Unknown place: ${id}`);
  return place;
}

export function mapPlaces(): GeoPlace[] {
  return locationMap.placeIds.map(placeById);
}

export function localContextPlaces(): GeoPlace[] {
  return [placeById("vietri"), placeById("cetara")];
}

export function straightLineFromProperty(id: PlaceId) {
  const place = placeById(id);
  const km = haversineKm(
    { longitude: property.geo.longitude, latitude: property.geo.latitude },
    { longitude: place.longitude, latitude: place.latitude },
  );
  return {
    km: roundPublishedKm(km),
    qualifier: "approximately" as const,
    method: "haversine-from-listing-pin" as const,
  };
}

export function formatStraightLine(locale: Locale, km: number): string {
  const number = new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB", {
    maximumFractionDigits: km < 3 ? 1 : 0,
  }).format(km);
  return locale === "it"
    ? `≈ ${number} km in linea d'aria`
    : `≈ ${number} km straight line`;
}
