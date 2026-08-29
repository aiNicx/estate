import { t } from "./messages.ts";
import {
  formatArea,
  formatTerraceRange,
  property,
  type Locale,
} from "./property.ts";

function compactArea(value: number): string {
  return `≈ ${new Intl.NumberFormat("en-GB").format(value)} m²`;
}

function compositionNote(locale: Locale): string {
  const { residential, commercial } = property.units;
  return locale === "it"
    ? `${residential} residenziali · ${commercial} commerciali`
    : `${residential} residential · ${commercial} commercial`;
}

export function getMetrics(locale: Locale): {
  label: string;
  value: string;
  note?: string;
}[] {
  const labels = t(locale).metrics;
  return [
    {
      label: labels.internalArea,
      value: compactArea(property.internalArea.squareMetres),
    },
    {
      label: labels.terraces,
      value: `≈ ${property.terraces.squareMetresMin}–${property.terraces.squareMetresMax} m²`,
    },
    {
      label: labels.units,
      value: String(property.units.total),
      note: compositionNote(locale),
    },
    ...(property.waterfront.seaRelationship
      ? [
          {
            label: labels.seaAccess,
            value: labels.seaAccessValue,
          },
        ]
      : []),
  ];
}

export function getKeyFacts(locale: Locale) {
  const terms = t(locale).facts.terms;
  const metrics = t(locale).metrics;
  return [
    {
      term: metrics.internalArea,
      value: formatArea(
        locale,
        property.internalArea.squareMetres,
        property.internalArea.qualifier,
      ),
    },
    {
      term: metrics.terraces,
      value: formatTerraceRange(locale),
    },
    {
      term: metrics.units,
      value: String(property.units.total),
    },
    {
      term: terms.residentialUnits,
      value: String(property.units.residential),
    },
    {
      term: terms.commercialUnits,
      value: String(property.units.commercial),
    },
  ];
}

export function getAssetDetailGroups(locale: Locale) {
  const terms = t(locale).facts.terms;
  const groups = t(locale).facts.groups;
  const en = locale === "en";

  return [
    {
      id: "location",
      title: groups.location,
      rows: [
        { term: terms.locality, value: property.location.locality },
        { term: terms.municipality, value: property.location.municipality },
        { term: terms.coast, value: property.location.coast[locale] },
      ],
    },
    {
      id: "use",
      title: groups.use,
      rows: [
        {
          term: terms.hospitality,
          value: property.currentUse.holidayAccommodation
            ? en
              ? "Holiday accommodation, in operation"
              : "Accoglienza per vacanze, in essere"
            : en
              ? "Not stated"
              : "Non indicata",
        },
        {
          term: terms.restaurant,
          value: property.currentUse.restaurant
            ? en
              ? "Existing activity"
              : "Attività esistente"
            : en
              ? "Not stated"
              : "Non indicata",
        },
      ],
    },
    {
      id: "waterfront",
      title: groups.waterfront,
      rows: [
        {
          term: terms.waterfront,
          value: property.waterfront.seaRelationship
            ? en
              ? "Waterfront cove"
              : "Cala fronte mare"
            : en
              ? "Not stated"
              : "Non indicata",
        },
        {
          term: terms.landAccess,
          value: property.landAccess.pedestrianSteppedPathFromRoadLevel
            ? en
              ? "Pedestrian · stepped path from road level"
              : "Pedonale · percorso a scale dal livello stradale"
            : en
              ? "Not stated"
              : "Non indicata",
        },
        {
          term: terms.pontoon,
          value: property.waterfront.seasonalPontoonConcession
            ? en
              ? "Seasonal landing / pontoon concession"
              : "Concessione stagionale di approdo / pontile"
            : en
              ? "Not stated"
              : "Non indicata",
        },
      ],
    },
    {
      id: "landscape",
      title: groups.landscape,
      rows: [
        {
          term: terms.lemonGarden,
          value: property.lemonGarden.present
            ? en
              ? `Approximately ${property.lemonGarden.treeCount} trees, around ${property.lemonGarden.treeAgeYears} years old`
              : `Circa ${property.lemonGarden.treeCount} alberi, circa ${property.lemonGarden.treeAgeYears} anni`
            : en
              ? "Not stated"
              : "Non indicata",
        },
        {
          term: terms.paperMill,
          value: en
            ? `Dated ${property.heritage.paperMillYear}`
            : `Datata ${property.heritage.paperMillYear}`,
        },
      ],
    },
  ];
}
