import { property, type Locale } from "../content/property.ts";
import { imagesByIds } from "../content/images.ts";
import { brochureCopy, brochureMetrics, brochurePhotoIds } from "../content/brochure.ts";
import { t } from "../content/messages.ts";
import { absoluteUrl, getSiteUrl } from "./site.ts";

/** Current brochure and privacy page; no offers or inferred operating status. */
export function buildJsonLd(locale: Locale, pathname: "" | "/privacy") {
  const copy = brochureCopy(locale);
  const chrome = t(locale);
  const siteUrl = getSiteUrl();
  const url = absoluteUrl(locale, pathname);
  const isBrochure = pathname === "";
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: copy.meta.siteName,
    url: siteUrl,
    inLanguage: ["en", "it"],
  };
  const images = isBrochure ? imagesByIds(brochurePhotoIds).map((image) => ({
    "@type": "ImageObject",
    contentUrl: `${siteUrl}${image.src}`,
    caption: image.caption[locale],
    description: image.alt[locale],
    inLanguage: locale,
  })) : [];
  const propertyValues = [
    ...brochureMetrics(locale),
    { label: copy.property.residential, value: String(property.units.residential) },
    { label: copy.property.commercial, value: String(property.units.commercial) },
    { label: copy.property.useTitle, value: copy.property.use },
    { label: copy.history.gardenTitle, value: copy.history.garden },
    { label: `${copy.history.millTitle} ${property.heritage.paperMillYear}`, value: copy.history.mill },
    { label: copy.location.landTitle, value: copy.location.land },
    { label: copy.location.seaTitle, value: copy.location.sea },
  ].map(({ label, value }) => ({ "@type": "PropertyValue", name: label, value }));
  const place = {
    "@type": "Place",
    "@id": `${siteUrl}/#property`,
    name: property.names[locale],
    description: copy.hero.lead,
    additionalProperty: propertyValues,
    containedInPlace: { "@type": "Place", name: property.listingTitle[locale] },
    geo: { "@type": "GeoCoordinates", latitude: property.geo.latitude, longitude: property.geo.longitude },
    hasMap: property.geo.mapsUrl,
    image: images.map((image) => image.contentUrl),
  };
  const page = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: isBrochure ? copy.meta.title : `${chrome.privacy.title} · ${copy.meta.siteName}`,
    description: isBrochure ? copy.meta.description : chrome.privacy.body[0],
    inLanguage: locale,
    isPartOf: { "@id": website["@id"] },
    ...(isBrochure ? { about: { "@id": place["@id"] }, image: images, primaryImageOfPage: images[0] } : {}),
  };
  return { "@context": "https://schema.org", "@graph": [website, page, ...(isBrochure ? [place] : [])] };
}

export function breadcrumbItems(locale: Locale, pathname: string) {
  const copy = t(locale);
  const items: { name: string; item: string }[] = [{ name: copy.nav.overview, item: absoluteUrl(locale) }];
  if (pathname === "/privacy") items.push({ name: copy.privacy.title, item: absoluteUrl(locale, pathname) });
  return items;
}
