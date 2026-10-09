import assert from "node:assert/strict";
import test from "node:test";
import { brochureCopy, brochurePhotoIds, brochureSections, legacyBrochureSections } from "./brochure.ts";
import { imagesByIds, imageSpecs } from "./images.ts";
import { messages } from "./messages.ts";
import { property } from "./property.ts";
import { buildJsonLd } from "../lib/jsonld.ts";
import { localeMetadata } from "../lib/seo.ts";

test("metadata, social cards and structured data share the live editorial source", () => {
  for (const locale of ["it", "en"] as const) {
    const copy = brochureCopy(locale);
    const metadata = localeMetadata(locale, "");
    assert.equal(metadata.title, copy.meta.title);
    assert.equal(metadata.description, copy.meta.description);
    assert.equal(metadata.openGraph?.title, copy.meta.title);
    assert.equal(metadata.openGraph?.description, copy.meta.description);
    assert.equal(metadata.twitter?.title, copy.meta.title);
    assert.equal(metadata.twitter?.description, copy.meta.description);
    assert.deepEqual(metadata.robots, { index: false, follow: false });
    const graph = buildJsonLd(locale, "")["@graph"];
    const page = graph.find(node => node["@type"] === "WebPage");
    assert.ok(page && "description" in page);
    assert.equal(page.name, copy.meta.title);
    assert.equal(page.description, copy.meta.description);
    assert.ok("image" in page && Array.isArray(page.image));
    const photographs = imagesByIds(brochurePhotoIds);
    assert.deepEqual(page.image.map(image => typeof image === "object" ? image.caption : null), photographs.map(image => image.caption[locale]));
    assert.equal(page.image.length, 12);
    assert.doesNotMatch(JSON.stringify(graph), /"@type":"(?:Accommodation|Offer|RealEstateListing)"|existing hospitality|floorSize|streetAddress|postalCode/i);
    const privacy = buildJsonLd(locale, "/privacy")["@graph"];
    assert.equal(privacy.some(node => node["@type"] === "Place"), false);
  }
});

test("five sections and every legacy route lead into the brochure", () => {
  assert.deepEqual(brochureSections.map(section => section.id), ["proprieta", "spazi", "storia", "posizione", "informazioni"]);
  assert.equal(legacyBrochureSections.request, "informazioni");
  assert.equal(legacyBrochureSections.investment, "proprieta");
  assert.equal(Object.keys(legacyBrochureSections).length, 7);
  for (const destination of Object.values(legacyBrochureSections)) {
    assert.ok(brochureSections.some(section => section.id === destination));
  }
});

test("published copy and captions keep names, contact channel and factual boundaries", () => {
  for (const locale of ["en", "it"] as const) {
    const copy = brochureCopy(locale);
    const text = JSON.stringify([copy, messages[locale], imageSpecs.map(image => [image.alt[locale], image.caption[locale]])]);
    assert.doesNotMatch(text, /\bestate\b|\bhomes\b|\bgrove\b|casa 4|d'Albori|dAlbori|\w\?\w|\uFFFD/i);
    assert.doesNotMatch(text, /exclusive|\bluxury\b|\blusso\b|trophy|one-of-a-kind|irripetibile|cap rate|occupancy|\byield\b|private harbour|year-round|ferry|porto privato|cala esclusiva/i);
    assert.doesNotMatch(text, /\bcala\b|\bcove\b/i);
    assert.doesNotMatch(text, /\bstream\b|corso d.acqua|citrus pergola|pergola di agrumi|numbered 2|numerate 2/i);
    assert.doesNotMatch(text, /https?:|mailto:|€|\b(?:EUR|GBP|USD)\b/);
    assert.match(copy.information.intro, /email/);
    assert.match(copy.history.mill, /is the paper mill|è la cartiera/);
    assert.match(copy.history.mill, /maceration tanks|vasche di macerazione/);
    assert.match(copy.history.mill, /1830/);
    assert.match(copy.history.mill, /Vietri sul Mare/);
    assert.doesNotMatch(text, /monaci|benedettin|\bmonks?\b|1910|Mellucci|Enzuccio|Solimene|ciucciariello|UNESCO|spiaggia privata|private beach|cinque livelli|five levels/i);
  }
  assert.equal(property.postalCode.value, null);
  assert.equal(property.seller.email, null);
  assert.equal(property.seller.telephone, null);
  assert.equal(property.internalArea.qualifier, "approximately");
  assert.equal(property.terraces.qualifier, "approximately");
  assert.match(brochureCopy("en").property.use, /^Some residential units/);
  assert.match(brochureCopy("it").property.use, /^Parte delle unità residenziali/);
  assert.match(brochureCopy("en").history.lead, /beach.*Marina d’Albori.*municipality of Vietri sul Mare/);
  assert.match(brochureCopy("it").history.lead, /spiaggia.*Marina d’Albori.*comune di Vietri sul Mare/);
  assert.match(brochureCopy("en").history.garden, /hillside/);
  assert.match(brochureCopy("it").history.garden, /versante/);
  assert.match(brochureCopy("en").property.intro, /property comprises the only buildings on the beach at Marina d’Albori/);
  assert.match(brochureCopy("it").property.intro, /proprietà comprende gli unici edifici sulla spiaggia di Marina d’Albori/);
  assert.match(brochureCopy("en").location.land, /about 200 steps/);
  assert.match(brochureCopy("it").location.land, /circa 200 gradini/);
  assert.match(brochureCopy("en").location.sea, /10 minutes from Salerno harbour[\s\S]*5 minutes from Vietri[\s\S]*10 minutes from Cetara/);
  assert.match(brochureCopy("it").location.sea, /10 minuti dal porto di Salerno[\s\S]*5 minuti da Vietri[\s\S]*10 minuti da Cetara/);
  assert.doesNotMatch(brochureCopy("en").location.sea, /indicative/i);
  assert.doesNotMatch(brochureCopy("it").location.sea, /indicativ/i);
  assert.match(messages.it.privacy.body[0], /non contiene un modulo/);
  assert.match(messages.en.privacy.body[0], /no contact form/);
});
