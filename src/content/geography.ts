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
  type GeoBounds,
} from "../lib/geo.ts";

export const mapViewIds = ["local", "coast", "connections"] as const;
export type MapViewId = (typeof mapViewIds)[number];

export const placeIds = [
  "property",
  "vietri",
  "cetara",
  "maiori",
  "amalfi",
  "positano",
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
  views: readonly MapViewId[];
  /** Proper names shared across languages; labels that differ live in messages. */
  name?: string;
};

export const mapCameras: Record<
  MapViewId,
  {
    center: [number, number];
    zoom: number;
    minZoom: number;
    maxZoom: number;
    pitch: number;
    bearing: number;
  }
> = {
  local: {
    center: [property.geo.longitude, property.geo.latitude - 0.0018],
    zoom: 14.7,
    minZoom: 13,
    maxZoom: 16.5,
    pitch: 52,
    bearing: -28,
  },
  coast: {
    center: [14.632, 40.652],
    zoom: 10.45,
    minZoom: 9.2,
    maxZoom: 12.5,
    pitch: 28,
    bearing: -12,
  },
  connections: {
    center: [14.53, 40.74],
    zoom: 8.15,
    minZoom: 7,
    maxZoom: 10,
    pitch: 0,
    bearing: 0,
  },
};

export const mapViews: Record<
  MapViewId,
  GeoBounds & { places: readonly PlaceId[] }
> = {
  local: {
    west: 14.688,
    east: 14.748,
    south: 40.644,
    north: 40.684,
    places: ["property", "vietri", "cetara"],
  },
  coast: {
    west: 14.46,
    east: 14.82,
    south: 40.598,
    north: 40.7,
    places: ["property", "vietri", "cetara", "maiori", "amalfi", "positano", "salerno"],
  },
  connections: {
    west: 13.98,
    east: 15.12,
    south: 40.52,
    north: 41.02,
    places: ["property", "salerno", "salerno-station", "qsr", "nap"],
  },
};

export const places: readonly GeoPlace[] = [
  {
    id: "property",
    category: "property",
    longitude: property.geo.longitude,
    latitude: property.geo.latitude,
    status: property.geo.status,
    views: ["local", "coast", "connections"],
  },
  {
    id: "vietri",
    category: "municipality",
    name: "Vietri sul Mare",
    longitude: 14.7278,
    latitude: 40.6708,
    status: "geographic-context",
    views: ["local", "coast"],
  },
  {
    id: "cetara",
    category: "coast-town",
    name: "Cetara",
    longitude: 14.7008,
    latitude: 40.6475,
    status: "geographic-context",
    views: ["local", "coast"],
  },
  {
    id: "maiori",
    category: "coast-town",
    name: "Maiori",
    longitude: 14.6408,
    latitude: 40.6486,
    status: "geographic-context",
    views: ["coast"],
  },
  {
    id: "amalfi",
    category: "coast-town",
    name: "Amalfi",
    longitude: 14.6028,
    latitude: 40.6344,
    status: "geographic-context",
    views: ["coast"],
  },
  {
    id: "positano",
    category: "coast-town",
    name: "Positano",
    longitude: 14.4853,
    latitude: 40.6281,
    status: "geographic-context",
    views: ["coast"],
  },
  {
    id: "salerno",
    category: "city",
    name: "Salerno",
    longitude: 14.7594,
    latitude: 40.6806,
    status: "geographic-context",
    views: ["coast", "connections"],
  },
  {
    id: "salerno-station",
    category: "rail",
    longitude: 14.7728,
    latitude: 40.6753,
    status: "geographic-context",
    views: ["connections"],
  },
  {
    id: "qsr",
    category: "airport",
    longitude: 14.9113,
    latitude: 40.62,
    status: "geographic-context",
    views: ["connections"],
  },
  {
    id: "nap",
    category: "airport",
    longitude: 14.2908,
    latitude: 40.8847,
    status: "geographic-context",
    views: ["connections"],
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

export function placesForView(view: MapViewId): GeoPlace[] {
  return mapViews[view].places.map(placeById);
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
