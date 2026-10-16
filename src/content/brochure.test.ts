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
    assert.match(copy.information.intro, /direttamente dal proprietario|directly by the owner/);
    assert.match(copy.property.intro, /intera proprietà|for sale as a whole/);
    assert.match(copy.property.intro, /aree esterne e il limoneto|outdoor areas and lemon garden/);
    assert.match(copy.information.topics[0].text, /Sono disponibili planimetrie e visure catastali|Floor plans and cadastral records are available/);
    assert.match(copy.information.topics[1].text, /documenti della concessione stagionale|Documents relating to the seasonal pontoon concession/);
    assert.match(copy.information.topics[2].text, /direttamente con il proprietario|directly with the owner/);
    assert.ok(copy.history.mill.startsWith(property.heritage.paperMillNote[locale]));
    assert.match(copy.history.mill, /Part of the building|Parte dell’edificio/);
    assert.doesNotMatch(copy.history.mill, /The property is the paper mill|La proprietà è la cartiera/);
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
  assert.match(brochureCopy("en").property.intro, /single building set on the rock[\s\S]*No other buildings stand on this beach/);
  assert.match(brochureCopy("it").property.intro, /unico blocco edificato sulla roccia[\s\S]*Nessun altro edificio affaccia su questa spiaggia/);
  assert.match(brochureCopy("en").location.land, /about 200 steps/);
  assert.match(brochureCopy("it").location.land, /circa 200 gradini/);
  assert.match(brochureCopy("en").location.sea, /10 minutes from Salerno harbour[\s\S]*5 minutes from Vietri[\s\S]*10 minutes from Cetara/);
  assert.match(brochureCopy("it").location.sea, /10 minuti dal porto di Salerno[\s\S]*5 minuti da Vietri[\s\S]*10 minuti da Cetara/);
  assert.doesNotMatch(brochureCopy("en").location.sea, /indicative/i);
  assert.doesNotMatch(brochureCopy("it").location.sea, /indicativ/i);
  assert.match(brochureCopy("en").location.sea, /about 10 minutes/);
  assert.match(brochureCopy("it").location.sea, /circa 10 minuti/);
  assert.match(brochureCopy("en").hero.lead, /only building on the beach[\s\S]*offered for sale as a whole/);
  assert.match(brochureCopy("it").hero.lead, /unico edificio sulla spiaggia[\s\S]*in vendita/);
  for (const locale of ["en", "it"] as const) {
    const privacy = JSON.stringify(messages[locale].privacy);
    assert.match(messages[locale].privacy.intro, /GDPR/);
    assert.match(privacy, /6\(1\)\(b\)|paragrafo 1, lettera b/);
    assert.match(privacy, /OpenFreeMap/);
    assert.match(privacy, /Garante/);
    assert.match(privacy, /email/);
    assert.match(privacy, /personal link|link personale/);
    assert.match(privacy, /cookie/);
    assert.match(privacy, /180/);
    assert.doesNotMatch(privacy, /enquiry form|modulo di richiesta|Required fields|Campi obbligatori/);
    const information = brochureCopy(locale).information;
    for (const topic of information.topics) {
      assert.match(topic.subject, /^Marina d’Albori · /);
      assert.match(topic.body, /Marina d’Albori/);
      assert.ok(topic.action.length > 0);
    }
    assert.match(information.replyOnly, /email/);
    assert.equal("form" in messages[locale], false);
  }
});
