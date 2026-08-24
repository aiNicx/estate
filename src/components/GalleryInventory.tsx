import type { Locale } from "@/content/property";
import { imageSpecs } from "@/content/images";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";

export function GalleryInventory({ locale }: { locale: Locale }) {
  const copy = t(locale).gallery;
  return (
    <div className="max-w-[42rem]">
      <h2 className="display mt-0 text-3xl">{copy.emptyTitle}</h2>
      <p className="lede">{copy.emptyBody}</p>
      <div className="mt-6">
        <MosaicBand />
      </div>
      <ol className="mt-10 space-y-5">
        {imageSpecs.map((spec, specIndex) => (
          <li key={spec.id} className="border-t border-[var(--line)] pt-4">
            <span className="text-xs tracking-[0.16em] uppercase text-[var(--terracotta)]">
              {String(specIndex + 1).padStart(2, "0")} · {spec.role}
            </span>
            <p className="mt-1 mb-0">{spec.caption[locale]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
