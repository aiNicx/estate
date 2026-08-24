import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";
import { localizedPath } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/investment", {
    title: `${copy.nav.investment} · ${copy.meta.siteName}`,
    description: copy.investment.intro,
  });
}

export default async function InvestmentPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).investment;

  return (
    <PageShell locale={locale} pathname="/investment" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="display text-3xl">{copy.presentTitle}</h2>
          <ul className="mt-6 space-y-3">
            {copy.present.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="display mt-0 text-3xl">{copy.possibleTitle}</h2>
          <div className="mt-6 space-y-4">
            {copy.scenarios.map((scenario) => (
              <article key={scenario.title} className="scenario-card">
                <h3 className="mb-2 text-xl">{scenario.title}</h3>
                <p className="m-0 text-[var(--ink-soft)]">{scenario.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div className="shell mt-16 grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="m-0 max-w-[42rem] text-sm text-[var(--ink-soft)]">{copy.disclaimer}</p>
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}
