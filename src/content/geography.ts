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
  offsetNorth,
  roundPublishedKm,
  type GeoBounds,
  type LonLat,
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

export const mapFrame = { width: 1400, height: 820 } as const;

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

/**
 * Simplified Tyrrhenian shoreline, west → east, land to the north.
 * Derived from OpenStreetMap coastline, generalised for the editorial chart.
 */
export const coastline: readonly LonLat[] = [
  { longitude: 14.45, latitude: 40.628 },
  { longitude: 14.485, latitude: 40.626 },
  { longitude: 14.53, latitude: 40.611 },
  { longitude: 14.57, latitude: 40.618 },
  { longitude: 14.603, latitude: 40.631 },
  { longitude: 14.627, latitude: 40.648 },
  { longitude: 14.641, latitude: 40.647 },
  { longitude: 14.67, latitude: 40.644 },
  { longitude: 14.701, latitude: 40.646 },
  { longitude: 14.707, latitude: 40.652 },
  { longitude: 14.712, latitude: 40.658 },
  { longitude: 14.7152, latitude: 40.6618 },
  { longitude: 14.7185, latitude: 40.6648 },
  { longitude: 14.723, latitude: 40.6678 },
  { longitude: 14.728, latitude: 40.6705 },
  { longitude: 14.745, latitude: 40.673 },
  { longitude: 14.768, latitude: 40.676 },
  { longitude: 14.8, latitude: 40.678 },
  { longitude: 14.85, latitude: 40.668 },
  { longitude: 14.91, latitude: 40.652 },
];

export const hillBands = {
  near: offsetNorth(coastline, 0.004),
  mid: offsetNorth(coastline, 0.01),
  far: offsetNorth(coastline, 0.018),
};

/** Schematic coastal-road alignment inland of the shore — not a surveyed carriageway. */
export const coastalRoad = offsetNorth(
  coastline.filter((point) => point.longitude >= 14.69 && point.longitude <= 14.74),
  0.0032,
);

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

export const gulfLabelAnchor: LonLat = { longitude: 14.72, latitude: 40.63 };
