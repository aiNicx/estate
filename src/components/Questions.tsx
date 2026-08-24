import type { Locale } from "@/content/property";
import { t } from "@/content/messages";

export function Questions({ locale }: { locale: Locale }) {
  const copy = t(locale).questions;
  return (
    <section className="shell section" aria-labelledby="questions-heading">
      <p className="kicker">{copy.kicker}</p>
      <h2 id="questions-heading" className="display mt-0 text-4xl">
        {copy.title}
      </h2>
      <dl className="mt-10 max-w-[46rem] space-y-8">
        {copy.items.map((item) => (
          <div key={item.q}>
            <dt className="font-medium">{item.q}</dt>
            <dd className="mt-2 ml-0 text-[var(--ink-soft)]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
