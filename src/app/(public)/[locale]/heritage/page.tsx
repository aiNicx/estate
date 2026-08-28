import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { LemonGrove } from "@/components/LemonGrove";
import { MosaicBand } from "@/components/MosaicBand";
import { WaveRule } from "@/components/WaveRule";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/heritage", {
    title: `${copy.nav.heritage} · ${copy.meta.siteName}`,
    description: copy.heritage.intro,
  });
}

export default async function HeritagePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).heritage;
  const mosaic = availableImage("corridor-mosaic");
  const bath = availableImage("bathroom-majolica");

  return (
    <PageShell locale={locale} pathname="/heritage" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      {mosaic || bath ? (
        <div className="shell grid gap-4 md:grid-cols-2">
          <Photo image={mosaic} locale={locale} sizes="50vw" caption />
          <Photo image={bath} locale={locale} sizes="50vw" caption />
        </div>
      ) : (
        <div className="shell grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
          <div>
            <p className="heritage-year m-0">1830</p>
            <p className="kicker mt-4">{copy.items[0]?.title}</p>
            <WaveRule />
          </div>
          <div className="space-y-6">
            <MosaicBand />
            <LemonGrove locale={locale} />
          </div>
        </div>
      )}
      <div className="shell mt-16 grid gap-10 md:grid-cols-2">
        {copy.items.map((item) => (
          <article key={item.title} className="border-t border-[var(--line)] pt-6">
            <h2 className="display mt-0 text-3xl">{item.title}</h2>
            <p className="text-[var(--ink-soft)]">{item.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
