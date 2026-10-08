import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { availableImage, imagesByIds } from "@/content/images";
import { property } from "@/content/property";
import { brochureCopy, brochureMetrics, brochurePhotoGroups } from "@/content/brochure";
import { straightLineFromProperty, formatStraightLine } from "@/content/geography";
import { localeMetadata } from "@/lib/seo";
import { buildJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Gallery } from "@/components/Gallery";
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
  const copy = brochureCopy(locale);
  const hero = availableImage("hero-cove-aerial");
  const groups = brochurePhotoGroups.map((group) => ({
    id: group.id,
    ...copy.spaces.groups[group.id],
    images: imagesByIds(group.imageIds),
  }));
  const connections = [
    { id: "salerno-station" as const, label: copy.location.rail },
    { id: "qsr" as const, label: copy.location.salernoAirport },
    { id: "nap" as const, label: copy.location.naplesAirport },
  ];

  return (
    <main className="brochure" id="inizio">
      <JsonLd data={buildJsonLd(locale, "")} />
      <section className="brochure-hero" aria-labelledby="brochure-title">
        <div className="brochure-hero-copy">
          <p className="kicker">{copy.hero.place}</p>
          <h1 id="brochure-title">{copy.hero.title}</h1>
          <p className="brochure-hero-lead">{copy.hero.lead}</p>
          <a className="quiet-link" href="#proprieta">{copy.hero.action}<span aria-hidden="true"> ↓</span></a>
        </div>
        <figure className="brochure-hero-photo">
          <div className="brochure-hero-frame photo-frame">
            {hero ? <Image src={hero.src} alt={hero.alt[locale]} fill priority fetchPriority="high" sizes="(max-width: 760px) 100vw, 56vw" style={{ objectPosition: hero.objectPosition }} /> : null}
          </div>
          <figcaption>{copy.hero.caption}</figcaption>
        </figure>
      </section>

      <section id="proprieta" className="brochure-section shell" aria-labelledby="property-title">
        <div className="brochure-section-heading">
          <p className="kicker">{copy.property.kicker}</p>
          <h2 id="property-title">{copy.property.title}</h2>
        </div>
        <dl className="brochure-metrics">
          {brochureMetrics(locale).map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
        </dl>
        <p className="brochure-note">{copy.property.areaNote}</p>
        <div className="brochure-property-grid">
          <Photo image={availableImage("architecture-hillside-aerial")} locale={locale} sizes="(max-width: 760px) 100vw, 46vw" className="brochure-property-photo" frameClassName="aspect-[4/5]" caption />
          <div className="brochure-property-copy">
            <p className="brochure-body">{copy.property.intro}</p>
            <dl className="brochure-composition">
              <div><dt>{copy.property.residential}</dt><dd>{property.units.residential}</dd></div>
              <div><dt>{copy.property.commercial}</dt><dd>{property.units.commercial}</dd></div>
            </dl>
            <h3>{copy.property.useTitle}</h3>
            <p>{copy.property.use}</p>
          </div>
        </div>
      </section>

      <section id="spazi" className="brochure-section brochure-spaces" aria-labelledby="spaces-title">
        <div className="shell">
          <div className="brochure-section-heading brochure-heading-pair">
            <div><p className="kicker">{copy.spaces.kicker}</p><h2 id="spaces-title">{copy.spaces.title}</h2></div>
            <div><p className="brochure-body">{copy.spaces.intro}</p><p className="brochure-note">{copy.spaces.photoHint}</p></div>
          </div>
          <Gallery locale={locale} groups={groups} brochure />
        </div>
      </section>

      <section id="storia" className="brochure-section shell" aria-labelledby="history-title">
        <div className="brochure-section-heading"><p className="kicker">{copy.history.kicker}</p><h2 id="history-title">{copy.history.title}</h2></div>
        <div className="brochure-history-grid">
          <div className="brochure-history-copy">
            <div><h3>{copy.history.millTitle} {property.heritage.paperMillYear}</h3><p>{copy.history.mill}</p></div>
            <div><h3>{copy.history.gardenTitle}</h3><p>{copy.history.garden}</p></div>
            <div><h3>{copy.history.ceramicsTitle}</h3><p>{copy.history.ceramics}</p></div>
          </div>
          <div className="brochure-history-photos">
            <Photo image={availableImage("corridor-mosaic")} locale={locale} sizes="(max-width: 760px) 48vw, 27vw" frameClassName="aspect-[3/4]" caption />
            <Photo image={availableImage("kitchen-dining-majolica")} locale={locale} sizes="(max-width: 760px) 48vw, 27vw" frameClassName="aspect-[3/4]" caption />
          </div>
        </div>
      </section>

      <section id="posizione" className="brochure-section brochure-location" aria-labelledby="location-title">
        <div className="shell">
          <div className="brochure-section-heading brochure-heading-pair"><div><p className="kicker">{copy.location.kicker}</p><h2 id="location-title">{copy.location.title}</h2></div><p className="brochure-body">{copy.location.intro}</p></div>
          <div className="brochure-location-grid">
            <LocationMap locale={locale} compact />
            <div className="brochure-access">
              <a className="quiet-link" href={property.geo.mapsUrl} target="_blank" rel="noopener noreferrer">{copy.location.mapAction}<span aria-hidden="true"> ↗</span></a>
              <div><h3>{copy.location.landTitle}</h3><p>{copy.location.land}</p></div>
              <div><h3>{copy.location.seaTitle}</h3><p>{copy.location.sea}</p></div>
            </div>
          </div>
          <div className="brochure-travel-grid">
            <Photo image={availableImage("path-stairs-sea")} locale={locale} sizes="(max-width: 760px) 100vw, 30vw" frameClassName="aspect-[4/5]" caption />
            <div><h3>{copy.location.connectionsTitle}</h3><dl className="brochure-connections">{connections.map((place) => <div key={place.id}><dt>{place.label}</dt><dd>{formatStraightLine(locale, straightLineFromProperty(place.id).km)}</dd></div>)}</dl><p className="brochure-note">{copy.location.distanceNote}</p></div>
          </div>
        </div>
      </section>

      <section id="informazioni" className="brochure-section brochure-information" aria-labelledby="information-title">
        <div className="shell">
          <div className="brochure-information-intro"><p className="kicker">{copy.information.kicker}</p><h2 id="information-title">{copy.information.title}</h2><p>{copy.information.intro}</p></div>
          <ul className="brochure-topics">{copy.information.topics.map((topic) => <li key={topic.title}><h3>{topic.title}</h3><p>{topic.text}</p></li>)}</ul>
          <div className="brochure-information-end"><p>{copy.information.closing}</p><a className="quiet-link" href="#inizio">{copy.information.back}<span aria-hidden="true"> ↑</span></a></div>
        </div>
      </section>
    </main>
  );
}
