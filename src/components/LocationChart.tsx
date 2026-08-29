import { useId } from "react";
import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import {
  coastalRoad,
  coastline,
  gulfLabelAnchor,
  hillBands,
  mapFrame,
  mapViews,
  placesForView,
  type MapViewId,
} from "@/content/geography";
import { polyline, project, clipToBounds } from "@/lib/geo";

const W = mapFrame.width;
const H = mapFrame.height;

export function LocationChart({
  locale,
  view,
}: {
  locale: Locale;
  view: MapViewId;
}) {
  const copy = t(locale).location;
  const uid = useId().replace(/:/g, "");
  const bounds = mapViews[view];
  const landClip = `${uid}-land`;
  const hatch = `${uid}-hatch`;
  const shore = clipToBounds(coastline, bounds);
  const hillsNear = clipToBounds(hillBands.near, bounds);
  const hillsMid = clipToBounds(hillBands.mid, bounds);
  const hillsFar = clipToBounds(hillBands.far, bounds);
  const road = clipToBounds(coastalRoad, bounds, 0.01);
  const coastD = polyline(shore, bounds, W, H);
  const landD = `${coastD} L${W} 0 L0 0 Z`;
  const foamD = `${coastD} L${W} ${H} L0 ${H} Z`;
  const nearD = `${polyline(hillsNear, bounds, W, H)} L${W} 0 L0 0 Z`;
  const midD = `${polyline(hillsMid, bounds, W, H)} L${W} 0 L0 0 Z`;
  const farD = `${polyline(hillsFar, bounds, W, H)} L${W} 0 L0 0 Z`;
  const roadD = road.length > 1 ? polyline(road, bounds, W, H) : "";
  const pin = project(
    { longitude: property.geo.longitude, latitude: property.geo.latitude },
    bounds,
    W,
    H,
  );
  const gulf = project(gulfLabelAnchor, bounds, W, H);
  const marks = placesForView(view);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={copy.map.chartAria[view]}
      className="location-map-svg"
    >
      <defs>
        <clipPath id={landClip}>
          <path d={landD} />
        </clipPath>
        <pattern
          id={hatch}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 0 V9" stroke="#3c4f3d" strokeWidth="0.55" opacity="0.2" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="#122830" />
      <path d={foamD} fill="#1b3a4a" />
      <path d={foamD} fill="#2d6a78" opacity="0.22" />

      {view !== "connections" && gulf.y > 40 && gulf.y < H - 40 ? (
        <text
          className="location-map-gulf-label"
          x={gulf.x}
          y={gulf.y}
          textAnchor="middle"
        >
          {copy.mapLabels.gulf}
        </text>
      ) : null}

      <g clipPath={`url(#${landClip})`}>
        <path d={landD} fill="#e7e0d2" />
        <path d={farD} fill="#3c4f3d" opacity="0.34" />
        <path d={midD} fill="#4a5e48" opacity="0.28" />
        <path d={nearD} fill="#cfc4b3" opacity="0.55" />
        <path d={landD} fill={`url(#${hatch})`} />
      </g>

      <path d={coastD} fill="none" stroke="#fbf8f2" strokeWidth="6" opacity="0.22" />
      <path d={coastD} fill="none" stroke="#1b3a4a" strokeWidth="1.7" />

      {view === "local" && roadD ? (
        <g className="location-map-road">
          <path d={roadD} fill="none" stroke="#8b3e2a" strokeWidth="2.4" strokeDasharray="10 8" />
          <text
            x={pin.x + 86}
            y={pin.y - 78}
            className="location-map-annotation"
          >
            {copy.mapLabels.roadLevel}
          </text>
        </g>
      ) : null}

      {view === "local" ? (
        <g className="location-map-section" aria-hidden="true">
          <path
            d={`M${pin.x} ${pin.y - 92} L${pin.x} ${Math.min(pin.y + 118, H - 40)}`}
            fill="none"
            stroke="#8b3e2a"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <text x={pin.x - 14} y={pin.y - 98} textAnchor="end" className="location-map-annotation">
            {copy.mapLabels.hillside}
          </text>
          <text x={pin.x - 14} y={pin.y + 108} textAnchor="end" className="location-map-annotation location-map-annotation-sea">
            {copy.mapLabels.cove}
          </text>
        </g>
      ) : null}

      {view === "coast" ? (
        <text className="location-map-coast-label" x={220} y={H - 64}>
          {copy.mapLabels.coast}
        </text>
      ) : null}

      <g className="location-map-towns">
        {marks
          .filter((place) => place.id !== "property")
          .map((place) => {
            const point = project(place, bounds, W, H);
            const label = copy.mapLabels[place.id as keyof typeof copy.mapLabels];
            const offset = labelOffset(place.id, view);
            return (
              <g key={place.id}>
                <circle cx={point.x} cy={point.y} r={view === "connections" ? 5 : 4} />
                <text
                  x={point.x + offset.x}
                  y={point.y + offset.y}
                  textAnchor={offset.anchor}
                  paintOrder="stroke"
                >
                  {label}
                </text>
              </g>
            );
          })}
      </g>

      <g className="location-map-compass" transform="translate(64 72)">
        <circle r="18" fill="#fbf8f2" fillOpacity="0.92" stroke="#cfc4b3" strokeWidth="1" />
        <path d="M0 -11 L3.2 6.5 L0 3 L-3.2 6.5 Z" fill="#8b3e2a" />
        <text y="32" textAnchor="middle">
          {copy.mapLabels.north}
        </text>
      </g>

      <g transform={`translate(${pin.x} ${pin.y})`}>
        <circle r="22" fill="#8b3e2a" fillOpacity="0.14" />
        <circle r="7.5" fill="#8b3e2a" />
        <circle r="3.2" fill="#fbf8f2" />
        <text className="location-map-pin-label" x="16" y="6">
          {copy.mapLabels.property}
        </text>
      </g>

      <rect
        x="12"
        y="12"
        width={W - 24}
        height={H - 24}
        fill="none"
        stroke="#fbf8f2"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
    </svg>
  );
}

function labelOffset(
  id: string,
  view: MapViewId,
): { x: number; y: number; anchor: "start" | "end" | "middle" } {
  if (view === "connections") {
    if (id === "nap") return { x: 12, y: -10, anchor: "start" };
    if (id === "qsr") return { x: 12, y: 18, anchor: "start" };
    if (id === "salerno-station") return { x: 12, y: 22, anchor: "start" };
    if (id === "salerno") return { x: -12, y: -12, anchor: "end" };
  }
  if (view === "local") {
    if (id === "vietri") return { x: 12, y: -8, anchor: "start" };
    if (id === "cetara") return { x: -12, y: 16, anchor: "end" };
  }
  if (id === "positano") return { x: 0, y: -14, anchor: "middle" };
  if (id === "amalfi") return { x: -10, y: -12, anchor: "end" };
  if (id === "maiori") return { x: 8, y: -12, anchor: "start" };
  if (id === "cetara") return { x: 8, y: 18, anchor: "start" };
  if (id === "vietri") return { x: 10, y: -12, anchor: "start" };
  if (id === "salerno") return { x: 12, y: -8, anchor: "start" };
  return { x: 10, y: -8, anchor: "start" };
}
