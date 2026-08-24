import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { FactsTable } from "@/components/FactsTable";
import { CompositionBoard } from "@/components/CompositionBoard";
import { localizedPath } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/the-property", {
    title: `${copy.nav.property} · ${copy.meta.siteName}`,
    description: copy.property.intro,
  });
}

export default async function PropertyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).property;
  const aerial = availableImage("architecture-hillside-aerial");

  return (
    <PageShell locale={locale} pathname="/the-property" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className={aerial ? "shell grid gap-10 lg:grid-cols-2 lg:items-start" : "shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"}>
        {aerial ? (
          <Photo image={aerial} locale={locale} sizes="(max-width: 1024px) 100vw, 50vw" caption />
        ) : (
          <CompositionBoard locale={locale} />
        )}
        <div>
          <h2 className="display mt-0 text-3xl">{copy.compositionTitle}</h2>
          <ul className="mt-6 space-y-6">
            {copy.units.map((unit) => (
              <li key={unit.label}>
                <h3 className="mb-1 text-xl">{unit.label}</h3>
                <p className="m-0 text-[var(--ink-soft)]">{unit.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell mt-20 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <FactsTable locale={locale} />
        <Link className="btn lg:mb-1" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}
