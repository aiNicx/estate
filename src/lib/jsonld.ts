import { property, type Locale } from "@/content/property";
import { resolveImages } from "@/content/images";
import { t } from "@/content/messages";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export function buildJsonLd(locale: Locale, pathname: string) {
  const copy = t(locale);
  const url = absoluteUrl(locale, pathname);
  const siteUrl = getSiteUrl();
  const pageDetails: Record<string, { name: string; description: string }> = {
    "": { name: copy.meta.title, description: copy.meta.description },
    "/the-property": {
      name: `${copy.nav.property} · ${copy.meta.siteName}`,
      description: copy.property.intro,
    },
    "/spaces": {
      name: `${copy.nav.spaces} · ${copy.meta.siteName}`,
      description: copy.spaces.intro,
    },
    "/location": {
      name: `${copy.nav.location} · ${copy.meta.siteName}`,
      description: copy.location.intro,
    },
    "/investment": {
      name: `${copy.nav.investment} · ${copy.meta.siteName}`,
      description: copy.investment.intro,
    },
    "/heritage": {
      name: `${copy.nav.heritage} · ${copy.meta.siteName}`,
      description: copy.heritage.pageIntro,
    },
    "/gallery": {
      name: `${copy.nav.gallery} · ${copy.meta.siteName}`,
      description: copy.gallery.intro,
    },
    "/request": {
      name: `${copy.nav.request} · ${copy.meta.siteName}`,
      description: copy.request.intro,
    },
    "/privacy": {
      name: `${copy.nav.privacy} · ${copy.meta.siteName}`,
      description: copy.privacy.body[0],
    },
  };
  const page = pageDetails[pathname] ?? pageDetails[""];
  const images = resolveImages().filter((image) => image.available);
  const imageObjects = images.map((image) => ({
    "@type": "ImageObject",
    contentUrl: `${siteUrl}${image.src}`,
    caption: image.caption[locale],
    description: image.alt[locale],
    inLanguage: locale,
  }));

  const italy = {
    "@type": "Country",
    "@id": `${siteUrl}/#italy`,
    name: property.location.country[locale],
  };

  const campania = {
    "@type": "AdministrativeArea",
    "@id": `${siteUrl}/#campania`,
    name: property.location.region,
    containedInPlace: { "@id": italy["@id"] },
  };

  const salerno = {
    "@type": "AdministrativeArea",
    "@id": `${siteUrl}/#salerno`,
    name: property.location.province,
    containedInPlace: { "@id": campania["@id"] },
  };

  const vietri = {
    "@type": "City",
    "@id": `${siteUrl}/#vietri-sul-mare`,
    name: property.location.municipality,
    containedInPlace: { "@id": salerno["@id"] },
  };

  const amalfiCoast = {
    "@type": "Place",
    "@id": `${siteUrl}/#amalfi-coast`,
    name: property.location.coast[locale],
    containedInPlace: { "@id": campania["@id"] },
  };

  const marina = {
    "@type": "Place",
    "@id": `${siteUrl}/#marina-dalbori`,
    name: property.location.locality,
    description: property.location.notes[locale],
    containedInPlace: [{ "@id": vietri["@id"] }, { "@id": amalfiCoast["@id"] }],
  };

  const additionalProperty = [
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Terrazze" : "Terraces",
      minValue: property.terraces.squareMetresMin,
      maxValue: property.terraces.squareMetresMax,
      unitCode: "MTK",
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Unità" : "Units",
      value: property.units.total,
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Unità residenziali" : "Residential units",
      value: property.units.residential,
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Unità commerciali" : "Commercial units",
      value: property.units.commercial,
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Limoneto" : "Lemon garden",
      value:
        locale === "it"
          ? "Sì — circa 8 alberi, circa 70 anni"
          : "Yes — approximately 8 trees, around 70 years old",
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Cartiera" : "Paper mill",
      value: String(property.heritage.paperMillYear),
    },
    {
      "@type": "PropertyValue",
      name: locale === "it" ? "Pontile" : "Pontoon",
      value:
        locale === "it"
          ? "Concessione stagionale associata"
          : "Seasonal concession associated with the property",
    },
  ];

  const residence = {
    "@type": ["Residence", "Accommodation"],
    "@id": `${siteUrl}/#property`,
    name: property.names[locale],
    description: copy.meta.description,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.internalArea.squareMetres,
      unitCode: "MTK",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "it" ? "Attività ricettiva esistente" : "Existing hospitality use",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "it" ? "Ristorante esistente" : "Existing restaurant",
        value: true,
      },
    ],
    additionalProperty,
    containedInPlace: { "@id": marina["@id"] },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.geo.latitude,
      longitude: property.geo.longitude,
    },
    hasMap: property.geo.mapsUrl,
    ...(imageObjects.length
      ? { image: imageObjects.map((image) => image.contentUrl) }
      : {}),
  };

  const offer = {
    "@type": "Offer",
    "@id": `${siteUrl}/#offer`,
    businessFunction: "https://schema.org/Sell",
    itemOffered: { "@id": residence["@id"] },
    description:
      locale === "it" ? "Prezzo disponibile su richiesta" : "Price available on request",
  };

  const listing = {
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: locale,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": residence["@id"] },
    ...(images[0]
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            contentUrl: `${siteUrl}${images[0].src}`,
          },
        }
      : {}),
    offers: offer,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: copy.meta.siteName,
    url: siteUrl,
    inLanguage: ["en", "it"],
  };

  const webpage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: page.name,
    description: page.description,
    inLanguage: locale,
    isPartOf: { "@id": website["@id"] },
    about: { "@id": residence["@id"] },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  const crumbs = breadcrumbItems(locale, pathname).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  }));

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      webpage,
      ...(pathname === "" ? [listing] : []),
      residence,
      marina,
      vietri,
      salerno,
      campania,
      amalfiCoast,
      italy,
      breadcrumb,
      ...imageObjects,
    ],
  };
}

export function breadcrumbItems(locale: Locale, pathname: string) {
  const copy = t(locale);
  const items = [
    { name: copy.nav.overview, item: absoluteUrl(locale, "") },
  ];
  const map: Record<string, string> = {
    "/the-property": copy.nav.property,
    "/spaces": copy.nav.spaces,
    "/location": copy.nav.location,
    "/investment": copy.nav.investment,
    "/heritage": copy.nav.heritage,
    "/gallery": copy.nav.gallery,
    "/request": copy.nav.request,
    "/privacy": copy.nav.privacy,
  };
  if (pathname && pathname !== "/" && map[pathname]) {
    items.push({ name: map[pathname], item: absoluteUrl(locale, pathname) });
  }
  return items;
}
