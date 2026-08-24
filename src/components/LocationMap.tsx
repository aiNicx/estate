import { useId } from "react";
import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";

/**
 * Simplified Gulf of Salerno / eastern Amalfi Coast, north-up.
 * Coastline derived from OpenStreetMap and reduced for the illustration.
 * Pin sits on the published property coordinates.
 */
const COAST =
  "M10.9 638.8 L35.4 612.6 L84.2 560.1 L114.6 534.9 L126.3 537.0 L128.5 536.3 L121.1 532.9 L119.2 528.6 L122.7 523.4 L135.4 521.2 L157.1 522.1 L182.8 504.1 L212.4 467.1 L229.0 440.2 L232.4 423.5 L242.9 409.6 L260.5 398.5 L284.6 393.8 L315.4 395.3 L349.9 409.5 L388.3 436.3 L419.0 449.5 L442.1 449.2 L452.3 453.3 L449.6 462.0 L471.2 479.8 L517.1 506.8 L557.6 519.8 L592.6 518.7 L611.8 511.0 L615.3 496.7 L621.0 488.6 L629.2 486.5 L635.9 472.5 L641.2 446.7 L651.5 430.9 L666.6 425.1 L669.7 422.9 L660.8 424.2 L660.6 420.3 L669.0 411.0 L674.0 400.6 L675.6 389.1 L682.7 370.5 L695.4 344.9 L706.2 329.4 L715.1 324.2 L718.9 316.2 L717.5 305.4 L718.9 298.2 L723.2 294.6 L725.2 290.7 L725.2 286.5 L729.1 281.0 L736.8 274.1 L742.9 266.0 L747.4 256.8 L762.0 251.0 L786.9 248.5 L806.9 240.3 L822.2 226.3 L842.3 217.2 L867.4 213.1 L879.5 203.0 L878.6 186.9 L881.8 177.4 L888.9 174.4 L894.4 170.3 L898.3 165.0 L906.1 167.8 L918.0 178.5 L928.6 185.6 L937.9 189.2 L942.0 185.6 L941.0 174.8 L944.1 167.8 L951.4 164.5 L969.6 172.0 L998.8 190.3 L1007.8 201.9 L996.4 206.8 L999.1 206.4 L1015.8 200.8 L1045.3 212.2 L1087.5 240.6 L1143.0 291.0 L1211.9 363.4 L1246.3 399.6";

const LAND = `${COAST} L1260 0 L0 0 L0 640 Z`;

const HILL_NEAR =
  "M10.9 582.8 L35.4 556.6 L84.2 504.1 L114.6 478.9 L126.3 481.0 L128.5 480.3 L121.1 476.9 L119.2 472.6 L122.7 467.4 L135.4 465.2 L157.1 466.1 L182.8 448.1 L212.4 411.1 L229.0 384.2 L232.4 367.5 L242.9 353.6 L260.5 342.5 L284.6 337.8 L315.4 339.3 L349.9 353.5 L388.3 380.3 L419.0 393.5 L442.1 393.2 L452.3 397.3 L449.6 406.0 L471.2 423.8 L517.1 450.8 L557.6 463.8 L592.6 462.7 L611.8 455.0 L615.3 440.7 L621.0 432.6 L629.2 430.5 L635.9 416.5 L641.2 390.7 L651.5 374.9 L666.6 369.1 L669.7 366.9 L660.8 368.2 L660.6 364.3 L669.0 355.0 L674.0 344.6 L675.6 333.1 L682.7 314.5 L695.4 288.9 L706.2 273.4 L715.1 268.2 L718.9 260.2 L717.5 249.4 L718.9 242.2 L723.2 238.6 L725.2 234.7 L725.2 230.5 L729.1 225.0 L736.8 218.1 L742.9 210.0 L747.4 200.8 L762.0 195.0 L786.9 192.5 L806.9 184.3 L822.2 170.3 L842.3 161.2 L867.4 157.1 L879.5 147.0 L878.6 130.9 L881.8 121.4 L888.9 118.4 L894.4 114.3 L898.3 109.0 L906.1 111.8 L918.0 122.5 L928.6 129.6 L937.9 133.2 L942.0 129.6 L941.0 118.8 L944.1 111.8 L951.4 108.5 L969.6 116.0 L998.8 134.3 L1007.8 145.9 L996.4 150.8 L999.1 150.4 L1015.8 144.8 L1045.3 156.2 L1087.5 184.6 L1143.0 235.0 L1211.9 307.4 L1246.3 343.6 L1260 -40 L0 -40 Z";

const HILL_MID =
  "M10.9 520.8 L35.4 494.6 L84.2 442.1 L114.6 416.9 L126.3 419.0 L128.5 418.3 L121.1 414.9 L119.2 410.6 L122.7 405.4 L135.4 403.2 L157.1 404.1 L182.8 386.1 L212.4 349.1 L229.0 322.2 L232.4 305.5 L242.9 291.6 L260.5 280.5 L284.6 275.8 L315.4 277.3 L349.9 291.5 L388.3 318.3 L419.0 331.5 L442.1 331.2 L452.3 335.3 L449.6 344.0 L471.2 361.8 L517.1 388.8 L557.6 401.8 L592.6 400.7 L611.8 393.0 L615.3 378.7 L621.0 370.6 L629.2 368.5 L635.9 354.5 L641.2 328.7 L651.5 312.9 L666.6 307.1 L669.7 304.9 L660.8 306.2 L660.6 302.3 L669.0 293.0 L674.0 282.6 L675.6 271.1 L682.7 252.5 L695.4 226.9 L706.2 211.4 L715.1 206.2 L718.9 198.2 L717.5 187.4 L718.9 180.2 L723.2 176.6 L725.2 172.7 L725.2 168.5 L729.1 163.0 L736.8 156.1 L742.9 148.0 L747.4 138.8 L762.0 133.0 L786.9 130.5 L806.9 122.3 L822.2 108.3 L842.3 99.2 L867.4 95.1 L879.5 85.0 L878.6 68.9 L881.8 59.4 L888.9 56.4 L894.4 52.3 L898.3 47.0 L906.1 49.8 L918.0 60.5 L928.6 67.6 L937.9 71.2 L942.0 67.6 L941.0 56.8 L944.1 49.8 L951.4 46.5 L969.6 54.0 L998.8 72.3 L1007.8 83.9 L996.4 88.8 L999.1 88.4 L1015.8 82.8 L1045.3 94.2 L1087.5 122.6 L1143.0 173.0 L1211.9 245.4 L1246.3 281.6 L1260 -40 L0 -40 Z";

const HILL_FAR =
  "M10.9 450.8 L35.4 424.6 L84.2 372.1 L114.6 346.9 L126.3 349.0 L128.5 348.3 L121.1 344.9 L119.2 340.6 L122.7 335.4 L135.4 333.2 L157.1 334.1 L182.8 316.1 L212.4 279.1 L229.0 252.2 L232.4 235.5 L242.9 221.6 L260.5 210.5 L284.6 205.8 L315.4 207.3 L349.9 221.5 L388.3 248.3 L419.0 261.5 L442.1 261.2 L452.3 265.3 L449.6 274.0 L471.2 291.8 L517.1 318.8 L557.6 331.8 L592.6 330.7 L611.8 323.0 L615.3 308.7 L621.0 300.6 L629.2 298.5 L635.9 284.5 L641.2 258.7 L651.5 242.9 L666.6 237.1 L669.7 234.9 L660.8 236.2 L660.6 232.3 L669.0 223.0 L674.0 212.6 L675.6 201.1 L682.7 182.5 L695.4 156.9 L706.2 141.4 L715.1 136.2 L718.9 128.2 L717.5 117.4 L718.9 110.2 L723.2 106.6 L725.2 102.7 L725.2 98.5 L729.1 93.0 L736.8 86.1 L742.9 78.0 L747.4 68.8 L762.0 63.0 L786.9 60.5 L806.9 52.3 L822.2 38.3 L842.3 29.2 L867.4 25.1 L879.5 15.0 L878.6 -1.1 L881.8 -10.6 L888.9 -13.6 L894.4 -17.7 L898.3 -23.0 L906.1 -20.2 L918.0 -9.5 L928.6 -2.4 L937.9 1.2 L942.0 -2.4 L941.0 -13.2 L944.1 -20.2 L951.4 -23.5 L969.6 -16.0 L998.8 2.3 L1007.8 13.9 L996.4 18.8 L999.1 18.4 L1015.8 12.8 L1045.3 24.2 L1087.5 52.6 L1143.0 103.0 L1211.9 175.4 L1246.3 211.6 L1260 -40 L0 -40 Z";

/** Equirectangular projection used by the illustration (must match path generation). */
const VIEW = {
  west: 14.575,
  east: 14.805,
  south: 40.608,
  north: 40.698,
  width: 1200,
  height: 720,
} as const;

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
            <radialGradient id={seaGlow} cx="62%" cy="42%" r="48%">
              <stop offset="0%" stopColor="#2d6a78" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#1b3a4a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#122830" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="720" fill="#122830" />
          <rect width="1200" height="720" fill={`url(#${seaGlow})`} />
          <path
            d="M40 560 C 90 548, 120 572, 170 560 S 240 548, 290 560 360 572, 410 560 480 548, 530 560 590 572, 620 560 700 548, 780 562 860 576, 940 558 1020 540, 1100 555, 1180 548"
            fill="none"
            stroke="#e4eef0"
            strokeWidth="1.4"
            opacity="0.28"
          />
          <path
            d="M20 620 C 80 608, 140 632, 200 618 S 320 604, 380 620 500 636, 560 618 680 604, 760 622 880 640, 980 618 1080 596, 1180 614"
            fill="none"
            stroke="#e4eef0"
            strokeWidth="1.15"
            opacity="0.18"
          />
          <path
            d="M80 680 C 160 666, 240 692, 320 676 S 460 658, 540 678 680 698, 760 676 900 654, 1000 674"
            fill="none"
            stroke="#e4eef0"
            strokeWidth="1"
            opacity="0.12"
          />

          <g clipPath={`url(#${landClip})`}>
            <path d={LAND} fill="#e7e0d2" />
            <path d={HILL_FAR} fill="#3c4f3d" opacity="0.34" />
            <path d={HILL_MID} fill="#4a5e48" opacity="0.28" />
            <path d={HILL_NEAR} fill="#cfc4b3" opacity="0.55" />
            <g stroke="#8b3e2a" strokeWidth="2.2" fill="none" opacity="0.55">
              <path d="M688 252 H 758" />
              <path d="M698 240 H 750" />
              <path d="M708 228 H 742" />
            </g>
            <g fill="#b0892a">
              <circle cx="704" cy="218" r="4.5" />
              <circle cx="718" cy="212" r="4" />
              <circle cx="732" cy="220" r="4.5" />
              <circle cx="712" cy="230" r="3.5" />
            </g>
          </g>

          <path d={COAST} fill="none" stroke="#1b3a4a" strokeWidth="2.2" opacity="0.55" />
          <path d={COAST} fill="none" stroke="#fbf8f2" strokeWidth="1" opacity="0.35" />

          <text
            x="470"
            y="612"
            className="location-map-sea-label"
            textAnchor="middle"
          >
            {copy.mapLabels.gulf}
          </text>

          <g className="location-map-place-label">
            <text x="150" y="488" paintOrder="stroke">
              {copy.mapLabels.amalfi}
            </text>
            <text x="632" y="372" paintOrder="stroke">
              {copy.mapLabels.cetara}
            </text>
            <text x="808" y="188" paintOrder="stroke">
              {copy.mapLabels.vietri}
            </text>
            <text x="1006" y="118" paintOrder="stroke">
              {copy.mapLabels.salerno}
            </text>
          </g>

          <g className="location-map-compass" transform="translate(64 72)">
            <circle r="22" fill="#fbf8f2" fillOpacity="0.82" stroke="#cfc4b3" strokeWidth="1" />
            <path d="M0 -14 L4 8 L0 4 L-4 8 Z" fill="#8b3e2a" />
            <text y="32" textAnchor="middle">
              {copy.mapLabels.north}
            </text>
          </g>

          <g className="location-map-scale" transform="translate(64 656)">
            <path d="M0 0 H 309" stroke="#fbf8f2" strokeWidth="2" />
            <path d="M0 -5 V 5 M309 -5 V 5" stroke="#fbf8f2" strokeWidth="2" />
            <text x="154.5" y="22" textAnchor="middle">
              {copy.mapLabels.scale}
            </text>
          </g>

          <g transform={`translate(${pinX} ${pinY})`}>
            <g className="location-map-pin">
              <circle className="location-map-pin-halo" r="42" fill="#8b3e2a" />
              <circle className="location-map-pin-halo location-map-pin-halo-delay" r="26" fill="#8b3e2a" />
              <path
                d="M0 0 C -1 -14, -16 -22, -16 -34 C -16 -46, -9 -54, 0 -54 C 9 -54, 16 -46, 16 -34 C 16 -22, 1 -14, 0 0 Z"
                fill="#8b3e2a"
              />
              <circle cx="0" cy="-34" r="6.5" fill="#fbf8f2" />
              <text className="location-map-pin-label" x="20" y="-28" paintOrder="stroke">
                {copy.mapLabels.property}
              </text>
            </g>
          </g>
        </svg>
      </div>
      <div className="location-map-meta">
        <div className="min-w-0">
          <p className="kicker m-0">{copy.mapKicker}</p>
          <p className="location-map-caption">{copy.mapCaption}</p>
          <p className="location-map-credit">{copy.mapCredit}</p>
        </div>
        <span className="location-map-cta">
          {copy.openMaps}
        </span>
      </div>
      <div className="location-map-mosaic" aria-hidden="true">
        <MosaicBand />
      </div>
    </a>
  );
}
