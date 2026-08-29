export type LonLat = {
  longitude: number;
  latitude: number;
};

export type GeoBounds = {
  west: number;
  east: number;
  south: number;
  north: number;
};

const EARTH_RADIUS_KM = 6371;

export function haversineKm(from: LonLat, to: LonLat): number {
  const φ1 = toRadians(from.latitude);
  const φ2 = toRadians(to.latitude);
  const Δφ = toRadians(to.latitude - from.latitude);
  const Δλ = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Straight-line distances for publication: one decimal under 3 km, otherwise whole kilometres. */
export function roundPublishedKm(km: number): number {
  if (km < 3) return Math.round(km * 10) / 10;
  return Math.round(km);
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
