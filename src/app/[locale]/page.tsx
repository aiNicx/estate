import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { availableImage, HOME_SEA_IMAGE_IDS, imagesByIds } from "@/content/images";
import { localeMetadata } from "@/lib/seo";
import { buildJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { MetricBand } from "@/components/MetricBand";
import { WaveRule } from "@/components/WaveRule";
import { CoveDiagram } from "@/components/CoveDiagram";
import { LocationMap } from "@/components/LocationMap";
import { HomeGallery } from "@/components/HomeGallery";

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
  const seaPhoto =
    imagesByIds(HOME_SEA_IMAGE_IDS)[0] ?? availableImage("path-stairs-sea");
  const mosaic = availableImage("corridor-mosaic");

  return (
    <main>
      <JsonLd data={buildJsonLd(locale, "")} />

      <section className="hero">
        <div className="hero-media">
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
        <div className="hero-copy">
          <p className="kicker hero-eyebrow">{copy.hero.eyebrow}</p>
          <h1 className="display hero-title">{copy.hero.title}</h1>
          {copy.hero.lead ? (
            <p className="hero-lead">{copy.hero.lead}</p>
          ) : null}
          <WaveRule />
          <div className="hero-cta">
            <Link className="btn" href={localizedPath(locale, "/request")}>
              {copy.cta.request}
            </Link>
          </div>
        </div>
      </section>

      <div className="facts-strip">
        <div className="shell">
          <h2 className="sr-only">{copy.facts.title}</h2>
          <MetricBand locale={locale} />
        </div>
      </div>

      <HomeGallery locale={locale} />

      <section className="section">
        <div className="shell">
          <div className="overview-block">
            <p className="kicker">{copy.overview.kicker}</p>
            <h2 className="display overview-title">{copy.overview.title}</h2>
            {copy.overview.body.map((paragraph) => (
              <p key={paragraph} className="overview-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-band">
        <div className="shell location-band-intro">
          <p className="kicker location-kicker">{copy.location.kicker}</p>
          <h2 className="display location-title">{copy.location.title}</h2>
          <p className="location-intro">{copy.location.intro}</p>
        </div>
        <div className="shell location-band-grid">
          <div className="location-sea">
            {seaPhoto ? (
              <Photo
                image={seaPhoto}
                locale={locale}
                sizes="(max-width: 1024px) 100vw, 42vw"
                caption
                frameClassName="location-sea-frame"
              />
            ) : null}
            <p className="kicker location-sea-kicker">{copy.home.seaKicker}</p>
            <h3 className="display location-sea-title">{copy.home.seaTitle}</h3>
            <p className="location-sea-body">{copy.home.seaBody}</p>
          </div>
          <LocationMap locale={locale} compact />
        </div>
        <div className="shell location-connections">
          <p className="kicker">{copy.home.connectionsTitle}</p>
          <ul>
            {copy.home.connections.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.relation}</span>
              </li>
            ))}
          </ul>
          <Link className="quiet-link location-more" href={localizedPath(locale, "/location")}>
            {copy.nav.location}
          </Link>
        </div>
      </section>

      <section className="shell section heritage-home">
        {mosaic ? (
          <Photo
            image={mosaic}
            locale={locale}
            sizes="(max-width: 900px) 100vw, 38vw"
            className="heritage-home-photo"
            caption
          />
        ) : null}
        <div className="heritage-home-copy">
          <p className="kicker">{copy.heritage.kicker}</p>
          <h2 className="display heritage-home-title">{copy.heritage.title}</h2>
          <p className="lede">{copy.heritage.intro}</p>
          <ol className="heritage-sequence">
            {copy.heritage.items.map((item) => (
              <li key={item.title}>
                <span className="heritage-sequence-year">{item.year ?? ""}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="quiet-link" href={localizedPath(locale, "/heritage")}>
            {copy.nav.heritage}
          </Link>
        </div>
      </section>

      <section className="shell section investment-home">
        <div className="investment-home-intro">
          <p className="kicker">{copy.investment.kicker}</p>
          <h2 className="display investment-home-title">{copy.investment.title}</h2>
          <p className="lede">{copy.investment.intro}</p>
        </div>
        <div className="investment-scenarios">
          {copy.investment.scenarios.map((scenario) => (
            <article key={scenario.title}>
              <h3>{scenario.title}</h3>
              <p>{scenario.body}</p>
            </article>
          ))}
        </div>
        <Link className="quiet-link" href={localizedPath(locale, "/investment")}>
          {copy.cta.requestInvestment}
        </Link>
      </section>

      <section className="section dossier-band">
        <div className="shell dossier-band-inner">
          <div>
            <p className="kicker">{copy.request.kicker}</p>
            <h2 className="display dossier-title">{copy.request.title}</h2>
            <p className="dossier-intro">{copy.home.dossierIntro}</p>
            <ul className="dossier-materials">
              {copy.home.dossierMaterials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Link className="btn" href={localizedPath(locale, "/request")}>
            {copy.cta.request}
          </Link>
        </div>
      </section>
    </main>
  );
}
