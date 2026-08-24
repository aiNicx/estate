import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";

export function CompositionBoard({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <div className="composition-board">
      <p className="kicker m-0">{copy.property.compositionTitle}</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="unit-chip">
          <strong>{property.units.residential}</strong>
          <span>{copy.diagram.residentialShort}</span>
        </div>
        <div className="unit-chip unit-chip-commercial">
          <strong>{property.units.commercial}</strong>
          <span>{copy.diagram.commercialShort}</span>
        </div>
      </div>
      <p className="m-0 text-sm text-[var(--ink-soft)]">
        {property.units.total} · {copy.diagram.unitsNote}
      </p>
    </div>
  );
}
