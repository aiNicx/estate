import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { availableImage, imagesFor } from "@/content/images";
import { localeMetadata } from "@/lib/seo";
import { buildJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { MetricBand } from "@/components/MetricBand";
import { WaveRule } from "@/components/WaveRule";
import { MosaicBand } from "@/components/MosaicBand";
import { CoveDiagram } from "@/components/CoveDiagram";
import { CompositionBoard } from "@/components/CompositionBoard";
import { LemonGrove } from "@/components/LemonGrove";
import { LocationMap } from "@/components/LocationMap";

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
  const hero = availableImage("hero-cove-aerial");
  const terrace = availableImage("terrace-dining-sea");
  const mosaic = availableImage("corridor-mosaic");
  const galleryPreview = imagesFor("gallery").slice(0, 4);

  return (
    <main>
      <JsonLd data={buildJsonLd(locale, "")} />
      <section className="grid min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
        <div className="relative min-h-[52svh] bg-[var(--paper-deep)] lg:min-h-full">
          {hero ? (
            <Image
              src={hero.src}
              alt={hero.alt[locale]}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover"
              style={{ objectPosition: hero.objectPosition }}
            />
          ) : (
            <CoveDiagram locale={locale} />
          )}
        </div>
        <div className="flex flex-col justify-end gap-6 px-[clamp(1.25rem,4vw,4.5rem)] py-12 lg:py-20">
          <p className="kicker">{copy.hero.eyebrow}</p>
          <h1 className="display m-0 max-w-[12ch] text-[clamp(3.2rem,8vw,7.5rem)]">{copy.hero.title}</h1>
          <p className="m-0 max-w-[28rem] text-[clamp(1.05rem,1.2vw,1.3rem)] text-[var(--ink-soft)]">
            {copy.hero.lead}
          </p>
          <WaveRule />
          <p className="geo-line">
            {copy.hero.geography.map((place) => (
              <span key={place}>{place}</span>
            ))}
          </p>
          <MosaicBand />
          <div className="flex flex-wrap gap-3">
            <Link className="btn" href={localizedPath(locale, "/request")}>
              {copy.cta.request}
            </Link>
            <Link className="text-link" href={localizedPath(locale, "/the-property")}>
              {copy.cta.requestDetails}
            </Link>
          </div>
        </div>
      </section>

      <div className="shell section">
        <MetricBand locale={locale} />
      </div>

      <section className="shell section grid gap-12 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="kicker">{copy.overview.kicker}</p>
          <h2 className="display mt-0 text-4xl md:text-5xl">{copy.overview.title}</h2>
          {copy.overview.body.map((paragraph) => (
            <p key={paragraph} className="max-w-[38rem] text-[var(--ink-soft)]">
              {paragraph}
            </p>
          ))}
        </div>
        {terrace ? (
          <Photo
            image={terrace}
            locale={locale}
            sizes="(max-width: 1024px) 100vw, 42vw"
            caption
          />
        ) : (
          <CompositionBoard locale={locale} />
        )}
      </section>

      <section className="section bg-[var(--sea)] text-[var(--white)]">
        <div className="shell grid gap-10 lg:grid-cols-[0.92fr_1.18fr] lg:items-center">
          <div>
            <p className="kicker" style={{ color: "#e8b3a3" }}>
              {copy.location.kicker}
            </p>
            <h2 className="display mt-0 text-4xl md:text-5xl">{copy.location.title}</h2>
            <p className="max-w-[38rem] text-[#d5e2e6]">{copy.location.intro}</p>
            <WaveRule invert />
            <div className="mt-6">
              <MosaicBand invert />
            </div>
            <Link className="btn mt-8 bg-[var(--white)] text-[var(--sea)] border-[var(--white)]" href={localizedPath(locale, "/location")}>
              {copy.nav.location}
            </Link>
          </div>
          <LocationMap locale={locale} compact />
        </div>
        <ol className="shell mt-12 m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
          {copy.location.hierarchy.map((item, index) => (
            <li key={item.name} className="border-t border-white/20 pt-4">
              <span className="block text-xs tracking-[0.18em] uppercase opacity-70">{String(index + 1).padStart(2, "0")}</span>
              <strong className="display text-2xl font-normal">{item.name}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell section grid gap-12 md:grid-cols-2 md:items-end">
        {mosaic ? (
          <Photo
            image={mosaic}
            locale={locale}
            sizes="(max-width: 768px) 100vw, 46vw"
            caption
          />
        ) : (
          <div>
            <p className="heritage-year m-0">1830</p>
            <WaveRule />
            <LemonGrove locale={locale} />
          </div>
        )}
        <div>
          <p className="kicker">{copy.heritage.kicker}</p>
          <h2 className="display mt-0 text-4xl">{copy.heritage.title}</h2>
          <p className="lede">{copy.heritage.intro}</p>
          <ul className="mt-6 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {copy.heritage.items.slice(0, 2).map((item) => (
              <li key={item.title}>
                <span className="text-lg">{item.title}</span>
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

      <section className="shell section grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="kicker">{copy.investment.kicker}</p>
          <h2 className="display mt-0 text-4xl">{copy.investment.title}</h2>
          <p className="lede">{copy.investment.intro}</p>
          <Link className="text-link mt-6" href={localizedPath(locale, "/investment")}>
            {copy.cta.requestInvestment}
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {copy.investment.scenarios.slice(0, 4).map((scenario) => (
            <article key={scenario.title} className="border-t border-[var(--line)] pt-4">
              <h3 className="mt-0 text-xl">{scenario.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--paper-deep)]">
        <div className="shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="kicker">{copy.request.kicker}</p>
            <h2 className="display mt-0 text-4xl">{copy.request.title}</h2>
          </div>
          <Link className="btn justify-self-start md:justify-self-end" href={localizedPath(locale, "/request")}>
            {copy.cta.request}
          </Link>
        </div>
      </section>
    </main>
  );
}
