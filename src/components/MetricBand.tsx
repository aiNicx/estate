import type { Locale } from "@/content/property";
import { t } from "@/content/messages";

export function MetricBand({ locale }: { locale: Locale }) {
  const metrics = t(locale).metrics;
  return (
    <dl className="metric-grid">
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
          {metric.note ? (
            <p className="m-0 mt-1 text-xs tracking-[0.08em] uppercase text-[var(--ink-soft)]">
              {metric.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
