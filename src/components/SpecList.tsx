export type SpecRow = {
  term: string;
  value: string;
};

export function SpecList({
  rows,
  className = "",
}: {
  rows: SpecRow[];
  className?: string;
}) {
  return (
    <dl className={`spec-list ${className}`.trim()}>
      {rows.map((row) => (
        <div className="spec-row" key={row.term}>
          <dt>{row.term}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SpecBand({
  rows,
  label,
}: {
  rows: SpecRow[];
  label: string;
}) {
  return (
    <section aria-label={label}>
      <dl className="spec-band">
        {rows.map((row) => (
          <div className="spec-item" key={row.term}>
            <dt>{row.term}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
