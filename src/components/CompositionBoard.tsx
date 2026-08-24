import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";

export function CompositionBoard({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const residential = Array.from({ length: property.units.residential }, (_, index) => index);
  const commercial = Array.from({ length: property.units.commercial }, (_, index) => index);

  return (
    <div className="composition-board">
      <p className="kicker m-0">{copy.property.compositionTitle}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {residential.map((index) => (
          <div className="unit-chip" key={`r-${index}`}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span>{copy.diagram.residentialShort}</span>
          </div>
        ))}
        {commercial.map((index) => (
          <div className="unit-chip unit-chip-commercial" key={`c-${index}`}>
            <strong>{String(property.units.residential + index + 1).padStart(2, "0")}</strong>
            <span>{copy.diagram.commercialShort}</span>
          </div>
        ))}
      </div>
      <p className="m-0 text-sm text-[var(--ink-soft)]">{copy.diagram.unitsNote}</p>
    </div>
  );
}
