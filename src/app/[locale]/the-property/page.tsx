import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import { property } from "@/content/property";
import { getAssetDetailGroups, getKeyFacts } from "@/content/facts";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { SpecBand, SpecList } from "@/components/SpecList";
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
  const facts = t(locale).facts;
  const aerial = availableImage("architecture-hillside-aerial");
  const pines = availableImage("exterior-pines-stream");
  const keyFacts = getKeyFacts(locale);
  const groups = getAssetDetailGroups(locale);
  const unitCounts = [property.units.residential, property.units.commercial];

  return (
    <PageShell
      locale={locale}
      pathname="/the-property"
      header={
        <header className="shell pb-10 pt-4 md:pb-14 md:pt-6">
          <p className="kicker">{copy.kicker}</p>
          <h1 className="display mt-0 max-w-[16ch] text-[clamp(2rem,4.2vw,3.55rem)]">
            {copy.title}
          </h1>
          <p className="lede mt-6 mb-0">{copy.intro}</p>
        </header>
      }
    >
      <div className="shell">
        <SpecBand rows={keyFacts} label={copy.factsLabel} />
      </div>

      <section className="shell mt-[clamp(3.5rem,7vw,6.5rem)]" aria-labelledby="composition-heading">
        <p className="kicker">{copy.compositionTitle}</p>
        <h2 id="composition-heading" className="sr-only">
          {copy.compositionTitle}
        </h2>
        <div className="mt-2 grid gap-10 md:grid-cols-2 md:gap-16">
          {copy.units.map((unit, index) => (
            <article key={unit.label} className="border-t border-[var(--line)] pt-6">
              <p className="composition-figure m-0">{unitCounts[index]}</p>
              <h3 className="mt-4 mb-2 text-[1.15rem] font-normal tracking-[-0.02em]">
                {unit.label}
              </h3>
              <p className="m-0 max-w-[28rem] text-[var(--ink-soft)]">{unit.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {aerial || pines ? (
        <section className="shell mt-[clamp(3.5rem,7vw,6.5rem)]">
          <div className="grid gap-4 md:grid-cols-12 md:gap-5">
            {aerial ? (
              <Photo
                image={aerial}
                locale={locale}
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className={pines ? "md:col-span-7" : "md:col-span-12"}
              />
            ) : null}
            {pines ? (
              <Photo
                image={pines}
                locale={locale}
                sizes="(max-width: 768px) 100vw, 40vw"
                className={aerial ? "md:col-span-5 md:mt-16 xl:mt-28" : "md:col-span-12"}
              />
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        className="shell mt-[clamp(4rem,8vw,7.5rem)]"
        aria-labelledby="asset-details-heading"
      >
        <p className="kicker">{facts.kicker}</p>
        <h2 id="asset-details-heading" className="display mt-0 max-w-[16ch] text-[clamp(2rem,3.6vw,3.15rem)]">
          {facts.title}
        </h2>
        <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="m-0 text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-[var(--ink-soft)]">
                {group.title}
              </h3>
              <SpecList rows={group.rows} className="mt-3" />
            </div>
          ))}
        </div>
      </section>

      <section
        className="shell mt-[clamp(4rem,8vw,7.5rem)]"
        aria-labelledby="distinct-heading"
      >
        <h2 id="distinct-heading" className="display mt-0 max-w-[16ch] text-[clamp(2rem,3.6vw,3.15rem)]">
          {copy.distinctTitle}
        </h2>
        <ol className="mt-8 m-0 max-w-[40rem] list-none space-y-5 p-0">
          {copy.distinct.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-[var(--line)] pt-4"
            >
              <span className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-[var(--terracotta)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="m-0">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="shell mt-[clamp(3.5rem,7vw,6rem)] flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-8">
        <p className="m-0 max-w-[28rem] text-[var(--ink-soft)]">
          {t(locale).request.confidentialNote}
        </p>
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}
