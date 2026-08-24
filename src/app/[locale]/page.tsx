import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { imageById, imagesFor } from "@/content/images";
import { localeMetadata } from "@/lib/seo";
import { buildJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { MetricBand } from "@/components/MetricBand";
import { FactsTable } from "@/components/FactsTable";
import { Questions } from "@/components/Questions";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return localeMetadata(locale, "");
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);
  const hero = imageById("hero-cove-aerial");
  const terrace = imageById("terrace-dining-sea");
  const mosaic = imageById("corridor-mosaic");
  const galleryPreview = imagesFor("gallery").filter((image) => image.available).slice(0, 4);

  return (
    <main>
      <JsonLd data={buildJsonLd(locale, "")} />
      <section
        className={
          hero?.available
            ? "grid min-h-[100svh] lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]"
            : "min-h-[92svh]"
        }
      >
        {hero?.available ? (
          <div className="relative min-h-[70svh] bg-[var(--paper-deep)]">
            <Image
              src={hero.src}
              alt={hero.alt[locale]}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              style={{ objectPosition: hero.objectPosition }}
            />
          </div>
        ) : null}
        <div
          className={
            hero?.available
              ? "flex flex-col justify-end gap-8 px-[clamp(1.25rem,4vw,3.5rem)] py-10 lg:py-16"
              : "shell flex min-h-[92svh] flex-col justify-end gap-8 pb-16 pt-28"
          }
        >
          <p className="kicker">{copy.hero.eyebrow}</p>
          <h1 className="display m-0 text-[clamp(2.4rem,6vw,4.6rem)]">{copy.hero.title}</h1>
          <p className="lede m-0">{copy.hero.lead}</p>
          <p className="geo-line">
            {copy.hero.geography.map((place) => (
              <span key={place}>{place}</span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn" href={localizedPath(locale, "/request")}>
              {copy.cta.request}
            </Link>
            <Link className="btn btn-ghost" href={localizedPath(locale, "/the-property")}>
              {copy.nav.property}
            </Link>
          </div>
        </div>
      </section>

      <div className="shell section">
        <MetricBand locale={locale} />
      </div>

      <section className="shell section grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="kicker">{copy.overview.kicker}</p>
          <h2 className="display mt-0 text-4xl md:text-5xl">{copy.overview.title}</h2>
          {copy.overview.body.map((paragraph) => (
            <p key={paragraph} className="max-w-[38rem] text-[var(--ink-soft)]">
              {paragraph}
            </p>
          ))}
        </div>
        {terrace?.available ? (
          <Photo
            image={terrace}
            locale={locale}
            sizes="(max-width: 1024px) 100vw, 42vw"
            caption
          />
        ) : null}
      </section>

      <section className="section bg-[var(--sea)] text-[var(--white)]">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker" style={{ color: "#e8b3a3" }}>
              {copy.location.kicker}
            </p>
            <h2 className="display mt-0 text-4xl md:text-5xl">{copy.location.title}</h2>
            <p className="max-w-[38rem] text-[#d5e2e6]">{copy.location.intro}</p>
            <Link className="btn mt-6 bg-[var(--white)] text-[var(--sea)] border-[var(--white)]" href={localizedPath(locale, "/location")}>
              {copy.nav.location}
            </Link>
          </div>
          <ol className="m-0 list-none space-y-4 p-0">
            {copy.location.hierarchy.map((item, index) => (
              <li key={item.name} className="border-t border-white/20 pt-4">
                <span className="block text-xs tracking-[0.18em] uppercase opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="display text-2xl font-normal">{item.name}</strong>
                <span className="mt-1 block text-sm text-[#d5e2e6]">{item.relation}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell section grid gap-10 md:grid-cols-2">
        {mosaic?.available ? (
          <Photo
            image={mosaic}
            locale={locale}
            sizes="(max-width: 768px) 100vw, 46vw"
            caption
          />
        ) : null}
        <div>
          <p className="kicker">{copy.heritage.kicker}</p>
          <h2 className="display mt-0 text-4xl">{copy.heritage.title}</h2>
          <p className="lede">{copy.heritage.intro}</p>
          <ul className="mt-6 space-y-4">
            {copy.heritage.items.slice(0, 2).map((item) => (
              <li key={item.title}>
                <h3 className="mb-1 text-lg">{item.title}</h3>
                <p className="m-0 text-[var(--ink-soft)]">{item.body}</p>
              </li>
            ))}
          </ul>
          <Link className="btn btn-ghost mt-6" href={localizedPath(locale, "/heritage")}>
            {copy.nav.heritage}
          </Link>
        </div>
      </section>

      {galleryPreview.length > 0 ? (
      <section className="shell section">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">{copy.gallery.kicker}</p>
            <h2 className="display mt-0 text-4xl">{copy.gallery.title}</h2>
          </div>
          <Link className="btn btn-ghost" href={localizedPath(locale, "/gallery")}>
            {copy.nav.gallery}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {galleryPreview.map((image, index) => (
            <Photo
              key={image.id}
              image={image}
              locale={locale}
              sizes="(max-width: 768px) 100vw, 25vw"
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            />
          ))}
        </div>
      </section>
      ) : null}

      <section className="shell section grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker">{copy.investment.kicker}</p>
          <h2 className="display mt-0 text-4xl">{copy.investment.title}</h2>
          <p className="lede">{copy.investment.intro}</p>
          <Link className="btn btn-ghost mt-6" href={localizedPath(locale, "/investment")}>
            {copy.nav.investment}
          </Link>
        </div>
        <FactsTable locale={locale} />
      </section>

      <Questions locale={locale} />

      <section className="section bg-[var(--paper-deep)]">
        <div className="shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="kicker">{copy.request.kicker}</p>
            <h2 className="display mt-0 text-4xl">{copy.request.title}</h2>
            <p className="lede">{copy.request.intro}</p>
          </div>
          <Link className="btn justify-self-start md:justify-self-end" href={localizedPath(locale, "/request")}>
            {copy.cta.privateDiscussion}
          </Link>
        </div>
      </section>
    </main>
  );
}
