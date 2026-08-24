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
  return localeMetadata(locale, "/heritage", {
    title: `${copy.nav.heritage} · ${copy.meta.siteName}`,
    description: copy.heritage.intro,
  });
}

export default async function HeritagePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).heritage;
  const mosaic = imageById("corridor-mosaic");
  const bath = imageById("bathroom-majolica");

  return (
    <PageShell locale={locale} pathname="/heritage" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell grid gap-4 md:grid-cols-2">
        {mosaic ? <Photo image={mosaic} locale={locale} sizes="50vw" caption /> : null}
        {bath ? <Photo image={bath} locale={locale} sizes="50vw" caption /> : null}
      </div>
      <div className="shell mt-16 grid gap-10 md:grid-cols-2">
        {copy.items.map((item) => (
          <article key={item.title}>
            <h2 className="display mt-0 text-3xl">{item.title}</h2>
            <p className="text-[var(--ink-soft)]">{item.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
