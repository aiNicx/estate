import type { Locale } from "@/content/property";
import { getMetrics } from "@/content/facts";

export function MetricBand({ locale }: { locale: Locale }) {
  const metrics = getMetrics(locale);
  return (
    <dl className="metric-grid">
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
