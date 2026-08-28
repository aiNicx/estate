import { t } from "./messages.ts";
import {
  formatArea,
  formatTerraceRange,
  property,
  type Locale,
} from "./property.ts";

function initialUpper(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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

export function getFactRows(locale: Locale) {
  const terms = t(locale).facts.terms;
  const en = locale === "en";

  return [
    { term: terms.locality, value: property.location.locality },
    { term: terms.municipality, value: property.location.municipality },
    { term: terms.coast, value: property.location.coast[locale] },
    {
      term: terms.internalArea,
      value: initialUpper(
        formatArea(
          locale,
          property.internalArea.squareMetres,
          property.internalArea.qualifier,
        ),
      ),
    },
    {
      term: terms.terraces,
      value: initialUpper(formatTerraceRange(locale)),
    },
    {
      term: terms.units,
      value: `${property.units.total} ${
        en ? "independent units" : "unità indipendenti"
      }`,
    },
    { term: terms.residentialUnits, value: String(property.units.residential) },
    { term: terms.commercialUnits, value: String(property.units.commercial) },
    {
      term: terms.hospitality,
      value: property.currentUse.holidayAccommodation
        ? en
          ? "Yes — holiday accommodation activity"
          : "Sì — attività di accoglienza per vacanze"
        : en
          ? "No"
          : "No",
    },
    {
      term: terms.restaurant,
      value: property.currentUse.restaurant
        ? en
          ? "Yes — existing activity"
          : "Sì — attività esistente"
        : en
          ? "No"
          : "No",
    },
    {
      term: terms.lemonGarden,
      value: property.lemonGarden.present
        ? en
          ? `Yes — approximately ${property.lemonGarden.treeCount} trees, around ${property.lemonGarden.treeAgeYears} years old`
          : `Sì — circa ${property.lemonGarden.treeCount} alberi, circa ${property.lemonGarden.treeAgeYears} anni`
        : en
          ? "No"
          : "No",
    },
    {
      term: terms.waterfront,
      value: property.waterfront.seaRelationship
        ? en
          ? "Yes — waterfront cove"
          : "Sì — cala fronte mare"
        : en
          ? "No"
          : "No",
    },
    {
      term: terms.pontoon,
      value: property.waterfront.seasonalPontoonConcession
        ? en
          ? "Seasonal landing / pontoon concession associated with the property"
          : "Concessione stagionale di approdo / pontile associata alla proprietà"
        : en
          ? "Not stated"
          : "Non indicata",
    },
    {
      term: terms.paperMill,
      value: en
        ? `Associated cartiera dated ${property.heritage.paperMillYear}`
        : `Cartiera associata datata ${property.heritage.paperMillYear}`,
    },
  ];
}
