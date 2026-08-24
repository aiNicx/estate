import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/content/property";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/site";
import { t } from "@/content/messages";

export function PageShell({
  locale,
  pathname,
  kicker,
  title,
  intro,
  children,
}: {
  locale: Locale;
  pathname: string;
  kicker: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const copy = t(locale);
  return (
    <main className="pb-20">
      <JsonLd data={buildJsonLd(locale, pathname)} />
      <Breadcrumbs locale={locale} pathname={pathname} />
      <header className="shell pb-10 pt-4">
        <p className="kicker">{kicker}</p>
        <h1 className="display mt-0 max-w-[18ch] text-[clamp(2.2rem,5vw,4.2rem)]">{title}</h1>
        {intro ? <p className="lede">{intro}</p> : null}
      </header>
      {children}
      <div className="shell mt-16 flex flex-wrap gap-3">
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {copy.cta.request}
        </Link>
        <Link className="btn btn-ghost" href={localizedPath(locale, "/gallery")}>
          {copy.nav.gallery}
        </Link>
      </div>
    </main>
  );
}
