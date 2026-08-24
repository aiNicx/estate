import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { imageById } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/location", {
    title: `${copy.nav.location} · ${copy.meta.siteName}`,
    description: copy.location.intro,
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).location;
  const hero = imageById("hero-cove-aerial");

  return (
    <PageShell locale={locale} pathname="/location" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell grid gap-10 lg:grid-cols-2">
        {hero ? (
          <Photo image={hero} locale={locale} sizes="(max-width: 1024px) 100vw, 50vw" caption />
        ) : null}
        <div>
          <h2 className="display text-3xl">{copy.hierarchyTitle}</h2>
          <ol className="mt-6 space-y-5">
            {copy.hierarchy.map((item, index) => (
              <li key={item.name}>
                <span className="text-xs tracking-[0.16em] uppercase text-[var(--terracotta)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1 mt-1 text-xl">{item.name}</h3>
                <p className="m-0 text-[var(--ink-soft)]">{item.relation}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <section className="shell mt-16 max-w-[42rem] space-y-4">
        {copy.body.map((paragraph) => (
          <p key={paragraph} className="text-[var(--ink-soft)]">
            {paragraph}
          </p>
        ))}
        <h2 className="display pt-6 text-3xl">{copy.distinctTitle}</h2>
        <ul className="space-y-3">
          {copy.distinct.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
