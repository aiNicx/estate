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
  assert.equal(property.geo.latitude, null);
  assert.equal(property.streetAddress.value, null);
  assert.equal(property.seller.name, null);
});

test("english and italian copy both exist", () => {
  assert.ok(messages.en.hero.title.length > 10);
  assert.ok(messages.it.hero.title.length > 10);
  assert.equal(messages.en.facts.rows.length, messages.it.facts.rows.length);
  assert.equal(messages.en.questions.items.length, 10);
});

test("image map covers the eight supplied photographs", () => {
  assert.equal(imageSpecs.length, 8);
  assert.equal(imageSpecs[0]?.id, "hero-cove-aerial");
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
