import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { imageById } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { FactsTable } from "@/components/FactsTable";

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
  const aerial = imageById("architecture-hillside-aerial");

  return (
    <PageShell locale={locale} pathname="/the-property" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell grid gap-10 lg:grid-cols-2">
        {aerial ? (
          <Photo image={aerial} locale={locale} sizes="(max-width: 1024px) 100vw, 50vw" caption />
        ) : null}
        <div>
          <h2 className="display text-3xl">{copy.compositionTitle}</h2>
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
      <section className="shell mt-16">
        <h2 className="display text-3xl">{copy.includesTitle}</h2>
        <ul className="mt-6 max-w-[40rem] space-y-3">
          {copy.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <div className="shell mt-16">
        <FactsTable locale={locale} />
      </div>
    </PageShell>
  );
}
