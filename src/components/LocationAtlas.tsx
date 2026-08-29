import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { LazyEstateMap } from "./LazyEstateMap";

export function LocationAtlas({ locale }: { locale: Locale }) {
  const copy = t(locale).location;

  return (
    <figure className="location-atlas">
      <div className="location-atlas-frame">
        <LazyEstateMap locale={locale} />
      </div>
      <figcaption className="location-atlas-caption">
        {copy.mapCaption}
      </figcaption>
    </figure>
  );
}
