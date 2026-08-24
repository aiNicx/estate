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
  return localeMetadata(locale, "/spaces", {
    title: `${copy.nav.spaces} · ${copy.meta.siteName}`,
    description: copy.spaces.intro,
  });
}

export default async function SpacesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).spaces;

  return (
    <PageShell locale={locale} pathname="/spaces" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell space-y-20">
        {copy.items.map((item, index) => {
          const image = imageById(item.imageId);
          const reverse = index % 2 === 1;
          return (
            <article
              key={item.title}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>figure]:order-2" : ""}`}
            >
              {image ? (
                <Photo image={image} locale={locale} sizes="(max-width: 1024px) 100vw, 50vw" caption />
              ) : null}
              <div>
                <h2 className="display mt-0 text-4xl">{item.title}</h2>
                <p className="lede">{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
