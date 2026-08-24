import Image from "next/image";
import type { Locale } from "@/content/property";
import type { ResolvedImage } from "@/content/images";
import { t } from "@/content/messages";

type PhotoProps = {
  image: ResolvedImage;
  locale: Locale;
  priority?: boolean;
  sizes: string;
  className?: string;
  caption?: boolean;
};

export function Photo({
  image,
  locale,
  priority = false,
  sizes,
  className = "",
  caption = false,
}: PhotoProps) {
  const copy = t(locale);
  if (!image.available) {
    return (
      <figure className={className}>
        <div className="photo-pending" role="img" aria-label={image.alt[locale]}>
          <span className="sr-only">{copy.gallery.pending}</span>
        </div>
        {caption ? (
          <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">
            {image.caption[locale]}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={className}>
      <div className="photo-frame relative aspect-[3/4] h-full w-full">
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          className="object-cover"
          style={{ objectPosition: image.objectPosition }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">
          {image.caption[locale]}
        </figcaption>
      ) : null}
    </figure>
  );
}
