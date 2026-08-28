import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import type { ResolvedImage } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { localizedPath } from "@/lib/site";
import type { Locale } from "@/content/property";

type PageProps = { params: Promise<{ locale: string }> };

const CHAPTERS = [
  {
    images: ["architecture-hillside-aerial"],
    variant: "full",
  },
  {
    images: ["terrace-wicker-sea", "balcony-arch-beach", "garden-night-terrace"],
    variant: "cluster",
  },
  {
    images: ["living-sea-view", "living-kitchen", "living-vaulted-tv"],
    variant: "lead-pair",
  },
  {
    images: ["bedroom-vaulted-sea", "bedroom-balcony-sea"],
    variant: "split",
  },
  {
    images: ["kitchen-dining-majolica"],
    variant: "quiet",
  },
] as const;

function photosOf(ids: readonly string[]) {
  return ids
    .map((id) => availableImage(id))
    .filter((image): image is ResolvedImage => Boolean(image));
}

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
  const hero = availableImage("terrace-dining-sea");

  return (
    <PageShell locale={locale} pathname="/spaces" header={null}>
      <section className="spaces-hero grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:min-h-[calc(100svh-4.5rem)]">
        {hero ? (
          <div className="relative order-1 min-h-[62svh] lg:order-2 lg:min-h-full">
            <Photo
              image={hero}
              locale={locale}
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="absolute inset-0 h-full"
              frameClassName="absolute inset-0"
            />
          </div>
        ) : null}
        <div className="order-2 flex flex-col justify-end gap-5 px-[clamp(1.25rem,4vw,4.5rem)] py-12 lg:order-1 lg:py-[clamp(3rem,8vw,6rem)]">
          <p className="kicker mb-0">{copy.kicker}</p>
          <h1 className="display m-0 max-w-[11ch] text-[clamp(2.6rem,6.2vw,5.4rem)]">
            {copy.title}
          </h1>
          <p className="spaces-deck m-0 max-w-[22rem]">{copy.deck}</p>
          <p className="lede m-0">{copy.intro}</p>
        </div>
      </section>

      {copy.chapters.map((chapter, index) => {
        const layout = CHAPTERS[index];
        if (!layout) return null;
        return (
          <SpaceChapter
            key={chapter.title}
            index={index}
            title={chapter.title}
            body={chapter.body}
            images={photosOf(layout.images)}
            variant={layout.variant}
            locale={locale}
          />
        );
      })}

      <div className="shell mt-[clamp(3rem,7vw,6rem)] flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-8">
        <Link className="text-link" href={localizedPath(locale, "/the-property")}>
          {copy.nextProperty}
        </Link>
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}

function SpaceChapter({
  index,
  title,
  body,
  images,
  variant,
  locale,
}: {
  index: number;
  title: string;
  body: string;
  images: ResolvedImage[];
  variant: (typeof CHAPTERS)[number]["variant"];
  locale: Locale;
}) {
  const number = String(index + 1).padStart(2, "0");
  const heading = (
    <div className="max-w-[28rem]">
      <p className="kicker">
        {number}
        <span className="sr-only"> — </span>
      </p>
      <h2 className="display mt-0 text-[clamp(2rem,3.8vw,3.25rem)]">{title}</h2>
      <p className="m-0 text-[var(--ink-soft)]">{body}</p>
    </div>
  );

  if (variant === "full") {
    return (
      <section className="spaces-chapter">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          {images[0] ? (
            <Photo
              image={images[0]}
              locale={locale}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="lg:col-span-8"
              frameClassName="aspect-[3/4] lg:aspect-auto lg:min-h-[min(78svh,54rem)]"
            />
          ) : null}
          <div className={`px-[clamp(1.25rem,4vw,4.5rem)] lg:col-span-4 lg:px-0 lg:pr-[clamp(1.25rem,4vw,4.5rem)] lg:pb-6 ${images[0] ? "" : "lg:col-span-12"}`}>
            {heading}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cluster") {
    return (
      <section className="spaces-chapter shell">
        <div className="max-w-[34rem]">{heading}</div>
        <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-5">
          {images[0] ? (
            <Photo
              image={images[0]}
              locale={locale}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="md:col-span-7 md:row-span-2"
              frameClassName="aspect-[3/4] md:aspect-auto md:min-h-[42rem]"
            />
          ) : null}
          {images[1] ? (
            <Photo
              image={images[1]}
              locale={locale}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:col-span-5"
            />
          ) : null}
          {images[2] ? (
            <Photo
              image={images[2]}
              locale={locale}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:col-span-5 md:mt-4"
            />
          ) : null}
        </div>
      </section>
    );
  }

  if (variant === "lead-pair") {
    return (
      <section className="spaces-chapter">
        {images[0] ? (
          <Photo
            image={images[0]}
            locale={locale}
            sizes="100vw"
            className="w-full"
            frameClassName="aspect-[4/5] md:aspect-[16/10] min-h-[28rem] md:min-h-[min(72svh,46rem)]"
          />
        ) : null}
        <div className="shell mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          {heading}
          <div className="grid gap-4 sm:grid-cols-2">
            {images[1] ? (
              <Photo image={images[1]} locale={locale} sizes="(max-width: 640px) 100vw, 28vw" />
            ) : null}
            {images[2] ? (
              <Photo
                image={images[2]}
                locale={locale}
                sizes="(max-width: 640px) 100vw, 28vw"
                className="sm:mt-12"
              />
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="spaces-chapter shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          {images[0] ? (
            <Photo
              image={images[0]}
              locale={locale}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="lg:max-w-[32rem]"
            />
          ) : null}
          <div className="lg:pb-4">{heading}</div>
        </div>
        {images[1] ? (
          <Photo
            image={images[1]}
            locale={locale}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="mt-8 ml-auto max-w-[42rem] lg:mt-16"
            frameClassName="aspect-[3/4] lg:aspect-[4/5]"
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className="spaces-chapter shell">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="lg:pr-8">{heading}</div>
        {images[0] ? (
          <Photo
            image={images[0]}
            locale={locale}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="lg:max-w-[28rem] lg:justify-self-end"
          />
        ) : null}
      </div>
    </section>
  );
}
