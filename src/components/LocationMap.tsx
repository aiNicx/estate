import { useId } from "react";
import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";

/**
 * Editorial chart of the eastern Costiera Amalfitana, north-up.
 * Coastline simplified from OpenStreetMap; pin uses the published coordinates.
 */
const COAST =
  "M11.0 639.0 C23.2 625.8 59.7 579.5 84.0 560.0 C108.3 540.5 132.3 544.7 157.0 522.0 C181.7 499.3 205.7 445.2 232.0 424.0 C258.3 402.8 283.8 390.7 315.0 395.0 C346.2 399.3 385.3 431.3 419.0 450.0 C452.7 468.7 484.8 496.8 517.0 507.0 C549.2 517.2 589.5 523.7 612.0 511.0 C634.5 498.3 641.3 451.3 652.0 431.0 C662.7 410.7 665.5 406.8 676.0 389.0 C686.5 371.2 704.8 343.2 715.0 324.0 C725.2 304.8 725.0 286.5 737.0 274.0 C749.0 261.5 765.3 259.2 787.0 249.0 C808.7 238.8 839.7 227.0 867.0 213.0 C894.3 199.0 921.3 165.2 951.0 165.0 C980.7 164.8 1013.0 191.0 1045.0 212.0 C1077.0 233.0 1109.5 259.7 1143.0 291.0 C1176.5 322.3 1228.8 381.8 1246.0 400.0";

const LAND = `${COAST} L1260 0 L0 0 L0 640 Z`;

const FOAM = `${COAST} L1246.0 416.0 C1228.8 397.8 1176.5 338.3 1143.0 307.0 C1109.5 275.7 1077.0 249.0 1045.0 228.0 C1013.0 207.0 980.7 180.8 951.0 181.0 C921.3 181.2 894.3 215.0 867.0 229.0 C839.7 243.0 808.7 254.8 787.0 265.0 C765.3 275.2 749.0 277.5 737.0 290.0 C725.0 302.5 725.2 320.8 715.0 340.0 C704.8 359.2 686.5 387.2 676.0 405.0 C665.5 422.8 662.7 426.7 652.0 447.0 C641.3 467.3 634.5 514.3 612.0 527.0 C589.5 539.7 549.2 533.2 517.0 523.0 C484.8 512.8 452.7 484.7 419.0 466.0 C385.3 447.3 346.2 415.3 315.0 411.0 C283.8 406.7 258.3 418.8 232.0 440.0 C205.7 461.2 181.7 515.3 157.0 538.0 C132.3 560.7 108.3 556.5 84.0 576.0 C59.7 595.5 23.2 641.8 11.0 655.0 Z`;

const HILL_NEAR =
  "M11.0 569.0 C35.3 549.5 106.3 492.7 157.0 452.0 C207.7 411.3 255.0 327.5 315.0 325.0 C375.0 322.5 460.8 431.0 517.0 437.0 C573.2 443.0 619.0 391.5 652.0 361.0 C685.0 330.5 692.5 284.3 715.0 254.0 C737.5 223.7 747.7 205.5 787.0 179.0 C826.3 152.5 891.7 88.0 951.0 95.0 C1010.3 102.0 1093.8 181.8 1143.0 221.0 C1192.2 260.2 1228.8 311.8 1246.0 330.0 L1260 -20 L0 -20 Z";

const HILL_MID =
  "M11.0 499.0 C35.3 479.5 106.3 422.7 157.0 382.0 C207.7 341.3 255.0 257.5 315.0 255.0 C375.0 252.5 460.8 361.0 517.0 367.0 C573.2 373.0 619.0 321.5 652.0 291.0 C685.0 260.5 692.5 214.3 715.0 184.0 C737.5 153.7 747.7 135.5 787.0 109.0 C826.3 82.5 891.7 18.0 951.0 25.0 C1010.3 32.0 1093.8 111.8 1143.0 151.0 C1192.2 190.2 1228.8 241.8 1246.0 260.0 L1260 -20 L0 -20 Z";

const HILL_FAR =
  "M11.0 419.0 C35.3 399.5 106.3 342.7 157.0 302.0 C207.7 261.3 255.0 177.5 315.0 175.0 C375.0 172.5 460.8 281.0 517.0 287.0 C573.2 293.0 619.0 241.5 652.0 211.0 C685.0 180.5 692.5 134.3 715.0 104.0 C737.5 73.7 747.7 55.5 787.0 29.0 C826.3 2.5 891.7 -62.0 951.0 -55.0 C1010.3 -48.0 1093.8 31.8 1143.0 71.0 C1192.2 110.2 1228.8 161.8 1246.0 180.0 L1260 -20 L0 -20 Z";

const COAST_LETTER =
  "M157.0 630.0 C169.5 613.7 205.7 553.2 232.0 532.0 C258.3 510.8 283.8 498.7 315.0 503.0 C346.2 507.3 385.3 539.3 419.0 558.0 C452.7 576.7 484.8 604.8 517.0 615.0 C549.2 625.2 589.5 631.7 612.0 619.0 C634.5 606.3 641.3 559.3 652.0 539.0 C662.7 518.7 665.5 514.8 676.0 497.0 C686.5 479.2 704.8 451.2 715.0 432.0 C725.2 412.8 725.0 394.5 737.0 382.0 C749.0 369.5 765.3 367.2 787.0 357.0 C808.7 346.8 839.7 335.0 867.0 321.0 C894.3 307.0 937.0 281.0 951.0 273.0";

const VIEW = {
  west: 14.575,
  east: 14.805,
  south: 40.608,
  north: 40.698,
  width: 1200,
  height: 720,
} as const;

const TOWNS = [
  { id: "amalfi" as const, x: 157, y: 522, labelX: 132, labelY: 498 },
  { id: "vietri" as const, x: 787, y: 249, labelX: 852, labelY: 178 },
  { id: "salerno" as const, x: 1045, y: 212, labelX: 1068, labelY: 128 },
];

function project(longitude: number, latitude: number) {
  const x = ((longitude - VIEW.west) / (VIEW.east - VIEW.west)) * VIEW.width;
  const y = ((VIEW.north - latitude) / (VIEW.north - VIEW.south)) * VIEW.height;
  return { x, y };
}

export function LocationMap({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const copy = t(locale).location;
  const uid = useId().replace(/:/g, "");
  const landClip = `${uid}-land`;
  const seaGlow = `${uid}-glow`;
  const hatch = `${uid}-hatch`;
  const letterPath = `${uid}-letter`;
  const { x: pinX, y: pinY } = project(property.geo.longitude, property.geo.latitude);

  return (
    <a
      className={`location-map ${compact ? "location-map-compact" : ""}`}
      href={property.geo.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.mapAria}
    >
      <div className="location-map-frame">
        <svg
          viewBox="0 0 1200 720"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="location-map-svg"
        >
          <defs>
            <clipPath id={landClip}>
              <path d={LAND} />
            </clipPath>
            <radialGradient id={seaGlow} cx="61%" cy="40%" r="52%">
              <stop offset="0%" stopColor="#2d6a78" stopOpacity="0.62" />
              <stop offset="48%" stopColor="#1b3a4a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#122830" stopOpacity="0" />
            </radialGradient>
            <pattern id={hatch} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
              <path d="M0 0 V10" stroke="#3c4f3d" strokeWidth="0.7" opacity="0.22" />
            </pattern>
            <path id={letterPath} d={COAST_LETTER} fill="none" />
          </defs>

          <rect width="1200" height="720" fill="#122830" />
          <rect width="1200" height="720" fill={`url(#${seaGlow})`} />
          <path
            d="M40 575 C 110 560, 170 588, 250 572 S 400 552, 490 574 640 596, 730 572 880 548, 990 568 1100 588, 1180 562"
            fill="none"
            stroke="#e4eef0"
            strokeWidth="1.3"
            opacity="0.22"
          />
          <path
            d="M30 640 C 120 622, 210 652, 300 634 S 470 612, 560 636 720 658, 820 634 980 610, 1100 630"
            fill="none"
            stroke="#e4eef0"
            strokeWidth="1.1"
            opacity="0.14"
          />

          <path d={FOAM} fill="#2d6a78" opacity="0.42" />

          <g clipPath={`url(#${landClip})`}>
            <path d={LAND} fill="#e7e0d2" />
            <path d={HILL_FAR} fill="#3c4f3d" opacity="0.38" />
            <path d={HILL_MID} fill="#4a5e48" opacity="0.3" />
            <path d={HILL_NEAR} fill="#cfc4b3" opacity="0.58" />
            <path d={LAND} fill={`url(#${hatch})`} />
            <g stroke="#8b3e2a" strokeWidth="2.1" fill="none" opacity="0.62">
              <path d="M688 250 H 760" />
              <path d="M698 238 H 752" />
              <path d="M708 226 H 744" />
            </g>
            <g fill="#b0892a">
              <circle cx="704" cy="216" r="4.6" />
              <circle cx="718" cy="210" r="4.1" />
              <circle cx="732" cy="218" r="4.6" />
              <circle cx="712" cy="228" r="3.6" />
            </g>
          </g>

          <path d={COAST} fill="none" stroke="#fbf8f2" strokeWidth="5" opacity="0.28" />
          <path d={COAST} fill="none" stroke="#1b3a4a" strokeWidth="1.8" />

          <text className="location-map-coast-label" textAnchor="middle" dy="10">
            <textPath href={`#${letterPath}`} startOffset="50%">
              {copy.mapLabels.coast}
            </textPath>
          </text>

          <g className="location-map-towns">
            {TOWNS.map((town) => (
              <g key={town.id}>
                <circle cx={town.x} cy={town.y} r="4.2" />
                <text x={town.labelX} y={town.labelY} paintOrder="stroke">
                  {copy.mapLabels[town.id]}
                </text>
              </g>
            ))}
          </g>

          <g className="location-map-compass" transform="translate(70 78)">
            <circle r="20" fill="#fbf8f2" fillOpacity="0.9" stroke="#cfc4b3" strokeWidth="1" />
            <path d="M0 -12 L3.6 7 L0 3.2 L-3.6 7 Z" fill="#8b3e2a" />
            <text y="34" textAnchor="middle">
              {copy.mapLabels.north}
            </text>
          </g>

          <g transform={`translate(${pinX} ${pinY})`}>
            <g className="location-map-pin">
              <circle className="location-map-pin-halo" r="46" fill="#8b3e2a" />
              <circle className="location-map-pin-halo location-map-pin-halo-delay" r="28" fill="#8b3e2a" />
              <path
                d="M0 0 C -1 -16, -17 -24, -17 -36 C -17 -49, -9.4 -57, 0 -57 C 9.4 -57, 17 -49, 17 -36 C 17 -24, 1 -16, 0 0 Z"
                fill="#8b3e2a"
              />
              <circle cx="0" cy="-36" r="6.8" fill="#fbf8f2" />
              <path d="M8 10 L18 28" fill="none" stroke="#fbf8f2" strokeWidth="1.4" opacity="0.7" />
              <text className="location-map-pin-label" x="22" y="46">
                {copy.mapLabels.property}
              </text>
            </g>
          </g>

          <rect
            x="14"
            y="14"
            width="1172"
            height="692"
            fill="none"
            stroke="#fbf8f2"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="location-map-meta">
        <div className="min-w-0">
          <p className="kicker m-0">{copy.mapKicker}</p>
          <p className="location-map-caption">{copy.mapCaption}</p>
          <p className="location-map-credit">{copy.mapCredit}</p>
        </div>
        <span className="location-map-cta">{copy.openMaps}</span>
      </div>
      <div className="location-map-mosaic" aria-hidden="true">
        <MosaicBand />
      </div>
    </a>
  );
}
