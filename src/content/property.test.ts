import assert from "node:assert/strict";
import test from "node:test";
import { property } from "./property.ts";
import { imageSpecs } from "./images.ts";
import { messages } from "./messages.ts";
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
  assert.equal(messages.en.facts.rows.length, messages.it.facts.rows.length);
  assert.equal(messages.en.metrics.length, messages.it.metrics.length);
  assert.equal(messages.en.gallery.emptyBody.length > 0, true);
  assert.equal(messages.it.gallery.emptyBody.length > 0, true);
  assert.equal(messages.en.investment.potentialLabel.length > 0, true);
  assert.equal(messages.it.investment.potentialLabel.length > 0, true);
  assert.equal(messages.en.location.mapLabels.coast, "Costiera Amalfitana");
  assert.equal(messages.it.location.mapLabels.coast, "Costiera Amalfitana");
  assert.deepEqual(
    Object.keys(messages.en.location.mapLabels),
    Object.keys(messages.it.location.mapLabels),
  );
});

test("image map covers the eight supplied photographs", () => {
  assert.equal(imageSpecs.length, 8);
  assert.equal(imageSpecs[0]?.id, "hero-cove-aerial");
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
