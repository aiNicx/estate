import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { getFactRows } from "@/content/facts";

export function FactsTable({ locale }: { locale: Locale }) {
  const copy = t(locale).facts;
  const rows = getFactRows(locale);
  return (
    <section aria-labelledby="facts-heading">
      <p className="kicker">{copy.kicker}</p>
      <h2 id="facts-heading" className="display mt-0 text-4xl">
        {copy.title}
      </h2>
      <table className="facts mt-8">
        <tbody>
          {rows.map((row) => (
            <tr key={row.term}>
              <th scope="row">{row.term}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
