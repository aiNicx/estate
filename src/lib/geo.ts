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

export type ProjectedPoint = { x: number; y: number };

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

export function project(
  point: LonLat,
  bounds: GeoBounds,
  width: number,
  height: number,
): ProjectedPoint {
  const x = ((point.longitude - bounds.west) / (bounds.east - bounds.west)) * width;
  const y = ((bounds.north - point.latitude) / (bounds.north - bounds.south)) * height;
  return { x, y };
}

export function polyline(
  points: readonly LonLat[],
  bounds: GeoBounds,
  width: number,
  height: number,
): string {
  return points
    .map((point, index) => {
      const { x, y } = project(point, bounds, width, height);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function clipToBounds(
  points: readonly LonLat[],
  bounds: GeoBounds,
  pad = 0.04,
): LonLat[] {
  const west = bounds.west - pad;
  const east = bounds.east + pad;
  return points.filter(
    (point) => point.longitude >= west && point.longitude <= east,
  );
}

export function offsetNorth(points: readonly LonLat[], degrees: number): LonLat[] {
  return points.map((point) => ({
    longitude: point.longitude,
    latitude: point.latitude + degrees,
  }));
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
