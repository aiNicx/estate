import type { Locale } from "@/content/property";
import { property } from "@/content/property";
import { t } from "@/content/messages";

export function LemonGrove({ locale }: { locale: Locale }) {
  const copy = t(locale).diagram;
  const count = property.lemonGarden.treeCount;
  return (
    <figure className="m-0">
      <div className="lemon-grove" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <svg key={index} className="lemon-mark" viewBox="0 0 28 38">
            <path d="M14 4 C 12 10, 12 14, 14 16 C 16 14, 16 10, 14 4 Z" fill="#3c4f3d" />
            <ellipse cx="14" cy="26" rx="7.5" ry="9.5" fill="#b0892a" />
            <path d="M14 17 C 18 20, 19 26, 16 32" fill="none" stroke="#8a6a1e" strokeWidth="0.8" />
          </svg>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">{copy.lemonCaption}</figcaption>
    </figure>
  );
}
