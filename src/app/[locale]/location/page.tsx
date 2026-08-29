import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { LocationAtlas } from "@/components/LocationAtlas";
import { localizedPath } from "@/lib/site";
import {
  formatStraightLine,
  placesForView,
  straightLineFromProperty,
  type PlaceId,
} from "@/content/geography";

type PageProps = { params: Promise<{ locale: string }> };

const AIR_PLACES = ["qsr", "nap"] as const satisfies readonly PlaceId[];
const RAIL_PLACES = ["salerno-station"] as const satisfies readonly PlaceId[];

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/location", {
    title: `${copy.nav.location} · ${copy.meta.siteName}`,
    description: copy.location.metaDescription,
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).location;
  const aerial = availableImage("hero-cove-aerial");
  const stairs = availableImage("path-stairs-sea");
  const rocks = availableImage("sea-rocks-buoys");
  const hillside = availableImage("architecture-hillside-aerial");
  const localPlaces = placesForView("local");
  const coastPlaces = placesForView("coast");

  return (
    <PageShell
      locale={locale}
      pathname="/location"
      header={
        <header className="location-hero shell">
          <p className="kicker">{copy.kicker}</p>
          <h1 className="display mt-0 max-w-[16ch] text-[clamp(2.35rem,5.2vw,4.6rem)]">
            {copy.title}
          </h1>
          <p className="lede mt-7 mb-0 max-w-[38rem]">{copy.intro}</p>
          <dl className="location-access-preview">
            <div>
              <dt>{copy.accessPreview.land.kicker}</dt>
              <dd>{copy.accessPreview.land.label}</dd>
            </div>
            <div>
              <dt>{copy.accessPreview.sea.kicker}</dt>
              <dd>{copy.accessPreview.sea.label}</dd>
            </div>
          </dl>
        </header>
      }
    >
      <section className="shell" aria-labelledby="location-map-heading">
        <h2 id="location-map-heading" className="sr-only">
          {copy.map.kicker}
        </h2>
        <LocationAtlas locale={locale} />
        <ol className="location-gazetteer">
          {coastPlaces.map((place) => (
            <li key={place.id}>
              <strong>{copy.mapLabels[place.id]}</strong>
              {place.id !== "property" ? (
                <span>{formatStraightLine(locale, straightLineFromProperty(place.id).km)}</span>
              ) : (
                <span>{copy.mapLabels.cove}</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section
        className="location-chapter location-topo shell"
        aria-labelledby="location-topo-heading"
      >
        <div className="location-chapter-copy">
          <p className="kicker">{copy.topography.kicker}</p>
          <h2 id="location-topo-heading" className="display mt-0 max-w-[14ch] text-[clamp(2rem,3.8vw,3.4rem)]">
            {copy.topography.title}
          </h2>
          <p className="lede">{copy.topography.body}</p>
        </div>
        <ol className="location-strata">
          {copy.topography.strata.map((item, index) => (
            <li key={item.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="location-chapter location-access-chapter"
        aria-labelledby="location-access-heading"
      >
        <div className="shell">
          <p className="kicker">{copy.access.kicker}</p>
          <h2 id="location-access-heading" className="display mt-0 max-w-[14ch] text-[clamp(2rem,3.8vw,3.4rem)]">
            {copy.access.title}
          </h2>
          <p className="lede">{copy.access.intro}</p>
          <div className="location-access-grid">
            <article className="location-access-panel">
              {stairs ? (
                <Photo
                  image={stairs}
                  locale={locale}
                  caption
                  sizes="(max-width: 900px) 100vw, 46vw"
                  frameClassName="aspect-[3/4] max-h-[36rem]"
                />
              ) : null}
              <p className="kicker">{copy.access.land.kicker}</p>
              <h3>{copy.access.land.title}</h3>
              <p className="location-access-label">{copy.access.land.label}</p>
              <p>{copy.access.land.body}</p>
            </article>
            <article className="location-access-panel">
              {rocks ? (
                <Photo
                  image={rocks}
                  locale={locale}
                  caption
                  sizes="(max-width: 900px) 100vw, 46vw"
                  frameClassName="aspect-[3/4] max-h-[36rem]"
                />
              ) : null}
              <p className="kicker">{copy.access.sea.kicker}</p>
              <h3>{copy.access.sea.title}</h3>
              <p className="location-access-label">{copy.access.sea.label}</p>
              <p>{copy.access.sea.body}</p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="location-chapter shell"
        aria-labelledby="location-connect-heading"
      >
        <p className="kicker">{copy.connectivity.kicker}</p>
        <h2 id="location-connect-heading" className="display mt-0 max-w-[16ch] text-[clamp(2rem,3.8vw,3.4rem)]">
          {copy.connectivity.title}
        </h2>
        <p className="lede">{copy.connectivity.intro}</p>
        <p className="location-distance-note">{copy.connectivity.distanceNote}</p>
        <div className="location-connect-grid">
          {copy.connectivity.modes.map((mode) => (
            <article key={mode.id}>
              <h3>{mode.title}</h3>
              <p>{mode.body}</p>
              {mode.id === "air" ? (
                <ul>
                  {AIR_PLACES.map((id) => (
                    <li key={id}>
                      {copy.mapLabels[id]}
                      <span>{formatStraightLine(locale, straightLineFromProperty(id).km)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {mode.id === "rail" ? (
                <ul>
                  {RAIL_PLACES.map((id) => (
                    <li key={id}>
                      {copy.mapLabels[id]}
                      <span>{formatStraightLine(locale, straightLineFromProperty(id).km)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {aerial || hillside ? (
        <section className="location-chapter shell" aria-labelledby="location-images-heading">
          <h2 id="location-images-heading" className="sr-only">
            {copy.context.kicker}
          </h2>
          <div className="location-images">
            {aerial ? (
              <Photo
                image={aerial}
                locale={locale}
                caption
                sizes="(max-width: 900px) 100vw, 58vw"
                className="location-images-lead"
                frameClassName="aspect-[3/4] md:aspect-[4/5]"
              />
            ) : null}
            {hillside ? (
              <Photo
                image={hillside}
                locale={locale}
                caption
                sizes="(max-width: 900px) 100vw, 40vw"
                className="location-images-support"
                frameClassName="aspect-[3/4]"
              />
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        className="location-chapter shell"
        aria-labelledby="location-context-heading"
      >
        <p className="kicker">{copy.context.kicker}</p>
        <h2 id="location-context-heading" className="display mt-0 max-w-[16ch] text-[clamp(2rem,3.8vw,3.4rem)]">
          {copy.context.title}
        </h2>
        <p className="lede">{copy.context.body}</p>
        <ul className="location-context-list">
          {localPlaces
            .filter((place) => place.id !== "property")
            .map((place) => (
              <li key={place.id}>
                <strong>{copy.mapLabels[place.id]}</strong>
                <span>{formatStraightLine(locale, straightLineFromProperty(place.id).km)}</span>
              </li>
            ))}
        </ul>
      </section>

      <section
        className="location-chapter shell"
        aria-labelledby="location-distinct-heading"
      >
        <h2 id="location-distinct-heading" className="display mt-0 max-w-[16ch] text-[clamp(2rem,3.8vw,3.4rem)]">
          {copy.distinctTitle}
        </h2>
        <ol className="location-distinct">
          {copy.distinct.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="shell location-dossier">
        <p className="m-0 max-w-[32rem] text-[var(--ink-soft)]">{copy.dossierLead}</p>
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}
