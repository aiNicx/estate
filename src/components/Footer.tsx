import Link from "next/link";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { routes, localizedPath } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="shell grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="kicker">{copy.brand.kicker}</p>
          <p className="display text-3xl">{copy.brand.wordmark}</p>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">{copy.footer.geography}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="m-0 list-none space-y-2 p-0 text-sm">
            {routes.map((route) => (
              <li key={route.id}>
                <Link href={localizedPath(locale, route.href)}>{copy.nav[route.id]}</Link>
              </li>
            ))}
            <li>
              <Link href={localizedPath(locale, "/privacy")}>{copy.nav.privacy}</Link>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-[var(--ink-soft)]">
          <p>{copy.footer.dossier}</p>
          <p className="mt-3">{copy.footer.notice}</p>
          <p className="mt-6">
            © {year} {copy.brand.wordmark}. {copy.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
