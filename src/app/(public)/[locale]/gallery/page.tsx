import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { imagesFor } from "@/content/images";
import { PageShell } from "@/components/PageShell";
import { Gallery } from "@/components/Gallery";
import { GalleryInventory } from "@/components/GalleryInventory";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/gallery", {
    title: `${copy.nav.gallery} · ${copy.meta.siteName}`,
    description: copy.gallery.intro,
  });
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).gallery;
  const images = imagesFor("gallery");

  return (
    <PageShell
      locale={locale}
      pathname="/gallery"
      kicker={copy.kicker}
      title={copy.title}
      intro={images.length ? copy.intro : undefined}
    >
      <div className="shell">
        {images.length ? <Gallery locale={locale} images={images} /> : <GalleryInventory locale={locale} />}
      </div>
    </PageShell>
  );
}
