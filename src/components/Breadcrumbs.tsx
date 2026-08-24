import Link from "next/link";
import type { Locale } from "@/content/property";
import { breadcrumbItems } from "@/lib/jsonld";

export function Breadcrumbs({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  const items = breadcrumbItems(locale, pathname);
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="shell py-4 text-sm text-[var(--ink-soft)]">
      <ol className="m-0 flex flex-wrap gap-2 p-0 list-none">
        {items.map((item, index) => (
          <li key={item.item} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={new URL(item.item).pathname}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
