import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { MosaicBand } from "./MosaicBand";
import Link from "next/link";
import { localizedPath } from "@/lib/site";

export function GalleryInventory({ locale }: { locale: Locale }) {
  const copy = t(locale).gallery;
  return (
    <div className="max-w-[38rem] py-8 md:py-16">
      <h2 className="display mt-0 text-3xl">{copy.emptyTitle}</h2>
      <p className="lede">{copy.emptyBody}</p>
      <div className="mt-6">
        <MosaicBand />
      </div>
      <Link className="btn mt-10" href={localizedPath(locale, "/request")}>
        {t(locale).cta.request}
      </Link>
    </div>
  );
}
