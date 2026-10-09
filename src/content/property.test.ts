import assert from "node:assert/strict";
import test from "node:test";
import { property } from "./property.ts";
import { imageSpecs } from "./images.ts";
import { messages } from "./messages.ts";
import { brochureCopy, brochureMetrics } from "./brochure.ts";
import { buildJsonLd } from "../lib/jsonld.ts";
import { validateInquiry } from "../lib/inquiry.ts";

test("property facts stay within supplied information", () => {
  assert.equal(property.internalArea.squareMetres, 900);
  assert.equal(property.terraces.squareMetres, 350);
  assert.equal(property.units.total, 7);
  assert.equal(property.units.residential, 5);
  assert.equal(property.units.commercial, 2);
  assert.equal(property.lemonGarden.treeCount, 8);
  assert.equal(property.heritage.paperMillYear, 1830);
  assert.match(property.heritage.paperMillNote.it, /è la cartiera/);
  assert.match(property.heritage.paperMillNote.en, /is the paper mill/);
  assert.match(property.heritage.paperMillNote.it, /vasche di macerazione/);
  assert.match(property.heritage.paperMillNote.en, /maceration tanks/);
  assert.match(property.heritage.paperMillNote.it, /1830/);
  assert.match(property.heritage.paperMillNote.en, /1830/);
  assert.equal(property.landAccess.stepCount, 200);
  assert.equal(property.landAccess.vehicularAccessToBuildings, null);
  assert.equal(property.seaApproach.indicativeMinutes.salernoHarbour, 10);
  assert.equal(property.seaApproach.indicativeMinutes.vietri, 5);
  assert.equal(property.seaApproach.indicativeMinutes.cetara, 10);
  assert.equal(property.seaApproach.qualifier, "approximately");
  assert.equal(property.price.value, null);
  assert.equal(property.geo.latitude, 40.6637081);
  assert.equal(property.geo.longitude, 14.7150181);
  assert.match(property.geo.mapsUrl, /^https:\/\/maps\.app\.goo\.gl\//);
  assert.equal(property.streetAddress.value, null);
  assert.equal(property.seller.name, null);
});

test("english and italian live copy have equivalent structure and three composition readings", () => {
  function shape(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(shape);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
    return typeof value;
  }
  assert.deepEqual(shape(brochureCopy("en")), shape(brochureCopy("it")));
  assert.deepEqual(shape(messages.en), shape(messages.it));
  for (const locale of ["en", "it"] as const) {
    const copy = brochureCopy(locale);
    assert.equal(copy.hero.title, property.shortName);
    assert.ok(copy.hero.lead.length > 40);
    assert.equal(copy.property.scenarios.length, 3);
    assert.equal(Object.keys(copy.spaces.groups).length, 3);
    assert.equal(copy.information.topics.length, 3);
    assert.equal("possibilitiesNote" in copy.property, false);
    assert.equal("areaNote" in copy.property, false);
    assert.equal("investment" in messages[locale], false);
    assert.equal("meta" in messages[locale], false);
  }
  assert.equal(messages.en.location.mapLabels.property, "The property");
  assert.equal(messages.it.location.mapLabels.property, "La proprietà");
});

test("visible metrics and structured facts derive from the property source", () => {
  for (const locale of ["en", "it"] as const) {
    const copy = brochureCopy(locale);
    const metrics = brochureMetrics(locale);
    assert.equal(metrics[0].value, `≈ ${property.internalArea.squareMetres} m²`);
    assert.equal(metrics[1].value, `≈ ${property.terraces.squareMetres} m²`);
    assert.equal(metrics[2].value, String(property.units.total));
    assert.ok(copy.meta.description.includes(String(property.terraces.squareMetres)));
    assert.equal(copy.meta.description.includes("300"), false);
    assert.ok(copy.history.garden.includes(String(property.lemonGarden.treeCount)));
    assert.ok(copy.history.garden.includes(String(property.lemonGarden.treeAgeYears)));
    const place = buildJsonLd(locale, "")["@graph"].find(node => node["@type"] === "Place");
    assert.ok(place && "additionalProperty" in place);
    const rows = place.additionalProperty;
    assert.ok(rows.some(row => row.name === copy.property.residential && row.value === String(property.units.residential)));
    assert.ok(rows.some(row => row.name === copy.property.commercial && row.value === String(property.units.commercial)));
    assert.ok(rows.some(row => row.name.includes(String(property.heritage.paperMillYear)) && row.value === copy.history.mill));
  }
});

test("image map covers the supplied photographs", () => {
  assert.ok(imageSpecs.length >= 26);
  assert.equal(new Set(imageSpecs.map((image) => image.id)).size, imageSpecs.length);
  assert.equal(imageSpecs[0]?.id, "hero-cove-aerial");
  assert.equal(imageSpecs[0]?.file, "01_new.jpg");
});

test("every specified photograph has filename keywords for flexible uploads", async () => {
  const { FILE_KEYWORDS } = await import("./images.ts");
  for (const spec of imageSpecs) {
    assert.ok((FILE_KEYWORDS[spec.id] ?? []).length > 0, spec.id);
  }
});

test("inquiry validation rejects incomplete payloads", () => {
  const invalid = validateInquiry({
    name: "",
    email: "not-an-email",
    buyerType: "",
    country: "",
    locale: "en",
    privacyConsent: false,
  });
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.privacyConsent);

  const valid = validateInquiry({
    name: "Anna Rossi",
    email: "anna@example.com",
    buyerType: "familyOffice",
    country: "Italy",
    locale: "it",
    privacyConsent: true,
  });
  assert.ok(valid.payload);
});
