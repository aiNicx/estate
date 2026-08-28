import Image from "next/image";
import type { Locale } from "@/content/property";
import type { ResolvedImage } from "@/content/images";

type PhotoProps = {
  image?: ResolvedImage;
  locale: Locale;
  priority?: boolean;
  sizes: string;
  className?: string;
  frameClassName?: string;
  caption?: boolean | string;
};

export function Photo({
  image,
  locale,
  priority = false,
  sizes,
  className = "",
  frameClassName = "aspect-[3/4]",
  caption = false,
}: PhotoProps) {
  if (!image?.available) return null;

  const captionText =
    typeof caption === "string" ? caption : caption ? image.caption[locale] : null;

  return (
    <figure className={className}>
      <div className={`photo-frame relative h-full w-full ${frameClassName}`.trim()}>
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
      {captionText ? (
        <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">
          {captionText}
        </figcaption>
      ) : null}
    </figure>
  );
}
