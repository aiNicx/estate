import Link from "next/link";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { routes, localizedPath } from "@/lib/site";

export function ContentsIndex({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const items = routes.filter((route) => route.id !== "overview");
  return (
    <nav aria-labelledby="contents-heading">
      <p className="kicker">{copy.contents.kicker}</p>
      <h2 id="contents-heading" className="display mt-0 text-4xl">
        {copy.contents.title}
      </h2>
      <ol className="contents-index mt-8">
        {items.map((route, index) => (
          <li key={route.id}>
            <Link href={localizedPath(locale, route.href)}>
              <span className="contents-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="contents-title">{copy.nav[route.id]}</span>
              <span className="text-sm text-[var(--ink-soft)]">{copy.contents.hints[route.id]}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
