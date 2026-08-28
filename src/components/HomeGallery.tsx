import Link from "next/link";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { HOME_GALLERY_IDS, imagesByIds, imagesFor } from "@/content/images";
import { localizedPath } from "@/lib/site";
import { Photo } from "./Photo";

export function HomeGallery({ locale }: { locale: Locale }) {
  const preferred = imagesByIds(HOME_GALLERY_IDS);
  const images = preferred.length ? preferred : imagesFor("gallery").slice(0, 3);
  if (!images.length) return null;

  const [featured, ...supporting] = images;
  const copy = t(locale);

  return (
    <section className="section" aria-label={copy.nav.gallery}>
      <div className="shell">
        <div className="editorial-gallery">
          {featured ? (
            <Photo
              image={featured}
              locale={locale}
              priority
              sizes="(max-width: 768px) 100vw, 62vw"
              className="editorial-gallery-feature"
              frameClassName="editorial-gallery-feature-frame"
            />
          ) : null}
          {supporting.map((image) => (
            <Photo
              key={image.id}
              image={image}
              locale={locale}
              sizes="(max-width: 768px) 50vw, 32vw"
              className="editorial-gallery-support"
              frameClassName="editorial-gallery-support-frame"
            />
          ))}
        </div>
        <p className="editorial-gallery-cta">
          <Link className="quiet-link" href={localizedPath(locale, "/gallery")}>
            {copy.home.galleryCta}
          </Link>
        </p>
      </div>
    </section>
  );
}
