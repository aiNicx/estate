/**
 * Single source of truth for property facts.
 * Only include supplied facts, photograph-observable details,
 * or clearly labelled geographic context.
 * Unknown values stay null so they can be filled later without rewriting UI.
 */

export type FactQualifier = "exact" | "approximately";

export type FactStatus =
  | "supplied"
  | "photograph"
  | "geographic-context"
  | "unknown";

export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const property = {
  id: "marina-dalbori-estate",
  shortName: "Marina d'Albori",
  names: {
    en: "Marina d'Albori Estate",
    it: "Proprietà Marina d'Albori",
  },
  /** Public marketing name used in titles. */
  listingTitle: {
    en: "Marina d'Albori, Vietri sul Mare",
    it: "Marina d'Albori, Vietri sul Mare",
  },
  location: {
    locality: "Marina d'Albori",
    municipality: "Vietri sul Mare",
    province: "Salerno",
    region: "Campania",
    country: {
      en: "Italy",
      it: "Italia",
    },
    countryCode: "IT",
    coast: {
      en: "Amalfi Coast",
      it: "Costiera Amalfitana",
    },
    /** Public geographic context, not a property measurement. */
    notes: {
      en: "Marina d'Albori is a coastal locality within the municipality of Vietri sul Mare, at the eastern entrance of the Amalfi Coast in the province of Salerno, Campania.",
      it: "Marina d'Albori è una località costiera nel comune di Vietri sul Mare, all'ingresso orientale della Costiera Amalfitana, in provincia di Salerno, Campania.",
    },
    status: "geographic-context" as FactStatus,
  },
  streetAddress: {
    value: null as string | null,
    status: "unknown" as FactStatus,
    todo: "Add civic address / street if it may be published.",
  },
  postalCode: {
    value: null as string | null,
    status: "unknown" as FactStatus,
    todo: "Confirm whether 84019 may be published.",
  },
  geo: {
    latitude: 40.6637081,
    longitude: 14.7150181,
    /** Public pin supplied for the listing; opens the live map. */
    mapsUrl: "https://maps.app.goo.gl/vvfs2Sp99ceQ8XZW9",
    status: "supplied" as FactStatus,
  },
  internalArea: {
    squareMetres: 900,
    qualifier: "approximately" as FactQualifier,
    status: "supplied" as FactStatus,
  },
  terraces: {
    squareMetresMin: 300,
    squareMetresMax: 350,
    qualifier: "approximately" as FactQualifier,
    status: "supplied" as FactStatus,
  },
  units: {
    total: 7,
    residential: 5,
    commercial: 2,
    independent: true,
    status: "supplied" as FactStatus,
  },
  currentUse: {
    hospitality: true,
    holidayAccommodation: true,
    restaurant: true,
    status: "supplied" as FactStatus,
  },
  lemonGarden: {
    present: true,
    treeCount: 8,
    treeAgeYears: 70,
    qualifier: "approximately" as FactQualifier,
    status: "supplied" as FactStatus,
  },
  waterfront: {
    seaRelationship: true,
    seasonalPontoonConcession: true,
    status: "supplied" as FactStatus,
  },
  /**
   * Land approach is photograph-observable (stone staircase descending toward the sea;
   * buildings step down the hillside). Step count is not recorded. Direct vehicular
   * arrival at the buildings is not stated.
   */
  landAccess: {
    pedestrianSteppedPathFromRoadLevel: true,
    stepCount: null as number | null,
    vehicularAccessToBuildings: null as boolean | null,
    status: "photograph" as FactStatus,
  },
  heritage: {
    paperMillYear: 1830,
    paperMillNote: {
      en: "A historic paper mill (cartiera) associated with the property dates to 1830.",
      it: "Una cartiera storica associata alla proprietà risale al 1830.",
    },
    status: "supplied" as FactStatus,
  },
  price: {
    value: null as number | null,
    currency: "EUR",
    status: "unknown" as FactStatus,
    todo: "Price is not published on the public site.",
  },
  seller: {
    name: null as string | null,
    organization: null as string | null,
    email: null as string | null,
    telephone: null as string | null,
    status: "unknown" as FactStatus,
    todo: "Add selling entity only if it should appear publicly.",
  },
  confidentialTopics: [
    "technicalDocumentation",
    "plans",
    "dueDiligence",
    "cadastral",
    "unitBreakdown",
    "commercialInformation",
    "concessionDetails",
    "operatingDocuments",
  ] as const,
} as const;

export type Property = typeof property;

export const buyerTypes = [
  "privateBuyer",
  "realEstateAgency",
  "investmentFund",
  "familyOffice",
  "hospitalityOperator",
  "other",
] as const;

export type BuyerType = (typeof buyerTypes)[number];

export function formatArea(
  locale: Locale,
  metres: number,
  qualifier: FactQualifier,
): string {
  const unit = "m²";
  const number = new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB").format(
    metres,
  );
  if (qualifier === "approximately") {
    return locale === "it" ? `circa ${number} ${unit}` : `approximately ${number} ${unit}`;
  }
  return `${number} ${unit}`;
}

export function formatTerraceRange(locale: Locale): string {
  const { squareMetresMin, squareMetresMax, qualifier } = property.terraces;
  const nf = new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB");
  const range = `${nf.format(squareMetresMin)}–${nf.format(squareMetresMax)} m²`;
  if (qualifier === "approximately") {
    return locale === "it" ? `circa ${range}` : `approximately ${range}`;
  }
  return range;
}
