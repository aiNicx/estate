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
  assert.equal(access.land.stepCount, null);
  assert.equal(access.land.vehicularAccessToBuildings, null);
  assert.equal(access.sea.seasonalLandingConcession, true);
  assert.equal(access.sea.privateHarbour, false);
  assert.equal(access.sea.scheduledFerryAtProperty, false);
  assert.equal(property.landAccess.stepCount, null);
  assert.equal(property.landAccess.vehicularAccessToBuildings, null);
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
});

test("one authoritative map uses a keyless production basemap", () => {
  assert.deepEqual([...locationMap.placeIds], ["property", "vietri", "salerno"]);
  assert.deepEqual(
    mapPlaces().map((place) => place.id),
    ["property", "vietri", "salerno"],
  );
  assert.equal(mapResources.requiresToken, false);
  assert.match(mapResources.basemapTileJson, /^https:\/\/tiles\.openfreemap\.org\//);
  assert.doesNotMatch(mapResources.basemapTileJson, /carto|tile\.openstreetmap\.org/i);
  assert.match(mapResources.terrainTiles, /^https:\/\/s3\.amazonaws\.com\//);
});

test("location copy is bilingual and states pedestrian stair access", () => {
  assert.deepEqual(
    Object.keys(messages.en.location.mapLabels),
    Object.keys(messages.it.location.mapLabels),
  );
  assert.equal("levels" in messages.en.location.map, false);
  assert.equal("levels" in messages.it.location.map, false);
  assert.equal(messages.en.location.access.land.label.includes("Pedestrian"), true);
  assert.equal(messages.it.location.access.land.label.includes("Pedonale"), true);
  assert.equal(messages.it.location.access.land.label.includes("scale"), true);
  assert.equal(messages.en.location.access.land.body.includes("stepped path"), true);
  assert.doesNotMatch(messages.en.location.access.land.body, /\d+\s+steps/i);
  assert.doesNotMatch(messages.it.location.access.land.body, /\d+\s+gradin/i);
  assert.match(messages.en.location.access.sea.body, /not a private harbour/);
  assert.match(messages.it.location.access.sea.body, /non un porto privato/);
  assert.doesNotMatch(messages.en.location.access.land.body, /difficult access|inconvenient|limitation/i);
  assert.doesNotMatch(messages.it.location.access.land.body, /accesso difficil|scomodo|limitazione/i);
  assert.equal(messages.en.location.distinct.length, 3);
  assert.equal(messages.it.location.distinct.length, 3);
});
