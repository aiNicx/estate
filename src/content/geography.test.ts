import assert from "node:assert/strict";
import test from "node:test";
import { property } from "./property.ts";
import {
  access,
  formatStraightLine,
  locationMap,
  mapPlaces,
  mapResources,
  placeById,
  places,
  straightLineFromProperty,
} from "./geography.ts";
import { brochureCopy } from "./brochure.ts";
import { messages } from "./messages.ts";

test("listing pin is the only supplied estate coordinate", () => {
  const pin = placeById("property");
  assert.equal(pin.latitude, property.geo.latitude);
  assert.equal(pin.longitude, property.geo.longitude);
  assert.equal(pin.status, "supplied");
  for (const place of places) {
    if (place.id === "property") continue;
    assert.equal(place.status, "geographic-context");
  }
});

test("land and sea access stay within verified facts", () => {
  assert.equal(access.land.mode, "pedestrian-stepped-path");
  assert.equal(access.land.stepCount, 200);
  assert.equal(access.land.vehicularAccessToBuildings, null);
  assert.equal(access.sea.seasonalLandingConcession, true);
  assert.equal(access.sea.privateHarbour, false);
  assert.equal(access.sea.scheduledFerryAtProperty, false);
  assert.equal(property.landAccess.stepCount, 200);
  assert.equal(property.landAccess.vehicularAccessToBuildings, null);
  assert.equal(property.seaApproach.indicativeMinutes.salernoHarbour, 10);
  assert.equal(property.seaApproach.indicativeMinutes.vietri, 5);
  assert.equal(property.seaApproach.indicativeMinutes.cetara, 10);
  assert.equal(property.seaApproach.qualifier, "approximately");
  assert.equal(property.seaApproach.status, "supplied");
});

test("straight-line distances are approximate and not travel times", () => {
  const vietri = straightLineFromProperty("vietri");
  assert.equal(vietri.qualifier, "approximately");
  assert.equal(vietri.method, "haversine-from-listing-pin");
  assert.ok(vietri.km > 0);
  assert.ok(vietri.km < 5);
  assert.match(formatStraightLine("en", vietri.km), /straight line/);
  assert.match(formatStraightLine("it", vietri.km), /linea d'aria/);
  assert.doesNotMatch(formatStraightLine("en", vietri.km), /min/);
  assert.match(brochureCopy("en").location.distanceNote, /Straight-line/);
  assert.match(brochureCopy("it").location.distanceNote, /linea d’aria/);
  assert.doesNotMatch(brochureCopy("en").location.distanceNote, /approximate|indicative/i);
  assert.doesNotMatch(brochureCopy("it").location.distanceNote, /indicativ/);
  assert.doesNotMatch(brochureCopy("en").location.distanceNote, /\bmin\b/);
  assert.doesNotMatch(brochureCopy("it").location.distanceNote, /\bmin\b/);
});

test("one authoritative map uses a keyless production basemap", () => {
  assert.deepEqual([...locationMap.placeIds], ["property", "vietri", "salerno"]);
  assert.deepEqual(
    mapPlaces().map((place) => place.id),
    ["property", "vietri", "salerno"],
  );
  assert.equal(mapResources.requiresToken, false);
  assert.match(
    mapResources.basemapStyle,
    /^https:\/\/tiles\.openfreemap\.org\/styles\/positron$/,
  );
  assert.doesNotMatch(mapResources.basemapStyle, /carto|tile\.openstreetmap\.org/i);
  assert.match(mapResources.terrainTiles, /^https:\/\/s3\.amazonaws\.com\//);
});

test("location copy is bilingual and states land stairs and seasonal sea times", () => {
  assert.deepEqual(
    Object.keys(messages.en.location.mapLabels),
    Object.keys(messages.it.location.mapLabels),
  );
  assert.equal("levels" in messages.en.location.map, false);
  assert.equal("levels" in messages.it.location.map, false);

  const landEn = brochureCopy("en").location.land;
  const landIt = brochureCopy("it").location.land;
  const seaEn = brochureCopy("en").location.sea;
  const seaIt = brochureCopy("it").location.sea;

  assert.match(landEn, /about 200 steps|staircase of about 200/);
  assert.match(landIt, /circa 200 gradini/);
  assert.match(landEn, /Amalfi Coast|state road/);
  assert.match(landIt, /strada statale|Costiera/);
  assert.doesNotMatch(landEn, /assess during a visit/i);
  assert.doesNotMatch(landIt, /valutare durante la visita/i);
  assert.doesNotMatch(landEn, /difficult access|inconvenient|limitation/i);
  assert.doesNotMatch(landIt, /accesso difficil|scomodo|limitazione/i);

  assert.match(seaEn, /seasonal.*concession/);
  assert.match(seaIt, /concessione stagionale/);
  assert.match(seaEn, /Boat journey times/);
  assert.match(seaIt, /Tempi di navigazione/);
  assert.doesNotMatch(seaEn, /indicative/i);
  assert.doesNotMatch(seaIt, /indicativ/i);
  assert.match(seaEn, /10 minutes from Salerno harbour/);
  assert.match(seaEn, /5 minutes from Vietri/);
  assert.match(seaEn, /10 minutes from Cetara/);
  assert.match(seaIt, /10 minuti dal porto di Salerno/);
  assert.match(seaIt, /5 minuti da Vietri/);
  assert.match(seaIt, /10 minuti da Cetara/);
  assert.doesNotMatch(seaEn, /terms and duration.*documentation/i);
  assert.doesNotMatch(seaIt, /Termini e durata.*documentazione/);
  assert.doesNotMatch(seaEn, /private harbour|year-round|ferry|transfer|\b3 minutes\b/i);
  assert.doesNotMatch(seaIt, /porto privato|accesso garantito|traghetto|transfer|\b3 minut/i);
});
