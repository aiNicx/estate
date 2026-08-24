import type { Locale } from "@/content/property";
import { t } from "@/content/messages";

/**
 * Abstract cove elevation — a graphic, not a photograph of the estate.
 * Used on the cover when the aerial has not yet been uploaded.
 */
export function CoveDiagram({ locale }: { locale: Locale }) {
  const copy = t(locale).diagram;
  return (
    <figure className="cove-diagram relative m-0 h-full min-h-[52svh] overflow-hidden lg:min-h-full">
      <svg
        viewBox="0 0 640 860"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <rect width="640" height="860" fill="#d7e4e7" />
        <path d="M0 210 C 90 150, 170 250, 280 190 390 130, 470 220, 640 160 L 640 360 L 0 360 Z" fill="#3c4f3d" />
        <path d="M0 250 C 120 200, 210 300, 340 240 470 180, 540 270, 640 220 L 640 380 L 0 380 Z" fill="#4a5e48" />
        <g fill="#fbf8f2" stroke="#cfc4b3" strokeWidth="1.2">
          <rect x="268" y="228" width="52" height="70" />
          <rect x="322" y="248" width="70" height="78" />
          <rect x="394" y="268" width="48" height="72" />
          <rect x="220" y="268" width="46" height="64" />
          <rect x="168" y="292" width="50" height="58" />
          <rect x="444" y="300" width="58" height="50" />
          <rect x="504" y="318" width="42" height="44" />
        </g>
        <g stroke="#8b3e2a" strokeWidth="3" fill="none">
          <path d="M150 352 H 560" />
          <path d="M170 366 H 540" />
          <path d="M190 380 H 510" />
        </g>
        <g fill="#b0892a">
          <circle cx="210" cy="236" r="5" />
          <circle cx="232" cy="228" r="4.5" />
          <circle cx="248" cy="242" r="5" />
          <circle cx="188" cy="248" r="4" />
          <circle cx="470" cy="250" r="5" />
          <circle cx="492" cy="238" r="4.5" />
          <circle cx="508" cy="256" r="4" />
          <circle cx="448" cy="262" r="4.5" />
        </g>
        <rect x="0" y="390" width="640" height="470" fill="#1b3a4a" />
        <path d="M0 390 C 80 410, 160 375, 240 398 320 420, 400 372, 480 400 560 428, 600 382, 640 404 L 640 390 Z" fill="#122830" />
        <path d="M0 720 C 90 700, 180 740, 280 718 380 696, 470 742, 560 720 600 712, 630 728, 640 722 L 640 860 L 0 860 Z" fill="#cfc4b3" />
        <rect x="318" y="398" width="10" height="92" fill="#fbf8f2" opacity="0.85" />
        <rect x="300" y="486" width="92" height="8" fill="#fbf8f2" opacity="0.85" />
        <path
          d="M40 560 C 90 548, 120 572, 170 560 S 240 548, 290 560 360 572, 410 560 480 548, 530 560 590 572, 620 560"
          fill="none"
          stroke="#e4eef0"
          strokeWidth="1.4"
          opacity="0.55"
        />
      </svg>
      <figcaption className="absolute bottom-0 left-0 right-0 bg-[color-mix(in_srgb,var(--sea-deep)_78%,transparent)] px-5 py-4 text-sm text-[var(--foam)]">
        <span className="kicker mb-1 text-[#e8b3a3]">{copy.coveLabel}</span>
        <span className="block">{copy.coveCaption}</span>
      </figcaption>
    </figure>
  );
}
