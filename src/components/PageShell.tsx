import type { ReactNode } from "react";
import type { Locale } from "@/content/property";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildJsonLd } from "@/lib/jsonld";

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
  return (
    <main className="pb-[clamp(4rem,8vw,8rem)]">
      <JsonLd data={buildJsonLd(locale, pathname)} />
      <Breadcrumbs locale={locale} pathname={pathname} />
      <header className="page-header shell pb-12 pt-6">
        <p className="kicker">{kicker}</p>
        <h1 className="display mt-0 max-w-[18ch] text-[clamp(2.2rem,5vw,4.2rem)]">{title}</h1>
        {intro ? <p className="lede">{intro}</p> : null}
      </header>
      {children}
    </main>
  );
}
