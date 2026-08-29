import assert from "node:assert/strict";
import test from "node:test";
import { property } from "./property.ts";
import {
  access,
  formatStraightLine,
  mapViewIds,
  placeById,
  places,
  placesForView,
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

test("map views expose a bounded place set", () => {
  assert.deepEqual([...mapViewIds], ["local", "coast", "connections"]);
  assert.ok(placesForView("local").some((place) => place.id === "property"));
  assert.ok(placesForView("coast").some((place) => place.id === "amalfi"));
  assert.ok(placesForView("connections").some((place) => place.id === "nap"));
});

test("location copy is bilingual and states pedestrian stair access", () => {
  assert.deepEqual(
    Object.keys(messages.en.location.mapLabels),
    Object.keys(messages.it.location.mapLabels),
  );
  assert.deepEqual(
    Object.keys(messages.en.location.map.levels),
    Object.keys(messages.it.location.map.levels),
  );
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
