import Link from "next/link";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { routes, localizedPath } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const year = new Date().getFullYear();
  const footerRoutes = routes.filter(
    (route) => route.id !== "overview" && route.id !== "request",
  );

  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1fr_1.2fr_auto]">
        <div>
          <p className="display m-0 text-2xl">{copy.brand.wordmark}</p>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            {copy.footer.geography}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
            {footerRoutes.map((route) => (
              <li key={route.id}>
                <Link href={localizedPath(locale, route.href)}>{copy.nav[route.id]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm text-[var(--ink-soft)] md:text-right">
          <Link href={localizedPath(locale, "/request")}>{copy.nav.request}</Link>
          <span aria-hidden="true"> · </span>
          <Link href={localizedPath(locale, "/privacy")}>{copy.nav.privacy}</Link>
          <p className="mb-0 mt-4">© {year} {copy.brand.wordmark}</p>
        </div>
      </div>
    </footer>
  );
}
