import assert from "node:assert/strict";
import test from "node:test";
import { property } from "./property.ts";
import { imageSpecs } from "./images.ts";
import { messages } from "./messages.ts";
import { getFactRows, getMetrics } from "./facts.ts";
import { validateInquiry } from "../lib/inquiry.ts";

test("property facts stay within supplied information", () => {
  assert.equal(property.internalArea.squareMetres, 900);
  assert.equal(property.units.total, 7);
  assert.equal(property.units.residential, 5);
  assert.equal(property.units.commercial, 2);
  assert.equal(property.lemonGarden.treeCount, 8);
  assert.equal(property.heritage.paperMillYear, 1830);
  assert.equal(property.price.value, null);
  assert.equal(property.geo.latitude, 40.6637081);
  assert.equal(property.geo.longitude, 14.7150181);
  assert.match(property.geo.mapsUrl, /^https:\/\/maps\.app\.goo\.gl\//);
  assert.equal(property.streetAddress.value, null);
  assert.equal(property.seller.name, null);
});

test("english and italian copy both exist", () => {
  assert.ok(messages.en.hero.title.length > 10);
  assert.ok(messages.it.hero.title.length > 10);
  assert.notEqual(messages.en.hero.title, "Marina d'Albori");
  assert.notEqual(messages.it.hero.title, "Marina d'Albori");
  assert.equal(messages.en.hero.eyebrow, "Marina d'Albori");
  assert.equal(messages.it.hero.eyebrow, "Marina d'Albori");
  assert.equal("geography" in messages.en.hero, false);
  assert.equal("geography" in messages.it.hero, false);
  assert.equal(messages.en.investment.scenarios.length, 3);
  assert.equal(messages.it.investment.scenarios.length, 3);
  assert.deepEqual(
    Object.keys(messages.en.facts.terms),
    Object.keys(messages.it.facts.terms),
  );
  assert.deepEqual(
    Object.keys(messages.en.metrics),
    Object.keys(messages.it.metrics),
  );
  assert.deepEqual(Object.keys(messages.en.home), Object.keys(messages.it.home));
  assert.equal(messages.en.gallery.emptyBody.length > 0, true);
  assert.equal(messages.it.gallery.emptyBody.length > 0, true);
  assert.equal(messages.en.investment.disclaimer.length > 0, true);
  assert.equal(messages.it.investment.disclaimer.length > 0, true);
  assert.equal(messages.en.location.mapLabels.coast, "Costiera Amalfitana");
  assert.equal(messages.it.location.mapLabels.coast, "Costiera Amalfitana");
  assert.deepEqual(
    Object.keys(messages.en.location.mapLabels),
    Object.keys(messages.it.location.mapLabels),
  );
});

test("visible metrics and fact rows derive from the property source", () => {
  const metrics = getMetrics("en");
  const facts = getFactRows("it");
  assert.equal(metrics[0]?.value, `≈ ${property.internalArea.squareMetres} m²`);
  assert.equal(metrics[2]?.value, String(property.units.total));
  assert.equal(
    metrics[2]?.note,
    `${property.units.residential} residential · ${property.units.commercial} commercial`,
  );
  assert.equal(metrics[3]?.value, messages.en.metrics.seaAccessValue);
  assert.ok(
    facts.some(
      ({ value }) =>
        value ===
        `Sì — circa ${property.lemonGarden.treeCount} alberi, circa ${property.lemonGarden.treeAgeYears} anni`,
    ),
  );
});

test("image map covers the supplied photographs", () => {
  assert.equal(imageSpecs.length, 26);
  assert.equal(imageSpecs[0]?.id, "hero-cove-aerial");
  assert.equal(imageSpecs[0]?.file, "01-hero-cove-aerial.jpg");
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
