import assert from "node:assert/strict";
import test from "node:test";
import { parseCsv, csvRowsToObjects } from "./csv.ts";
import { loadProspects, resetProspectsCache } from "./catalog.ts";
import {
  citiesForCountry,
  filterProspects,
  parseProspectsSearch,
  prospectIdFrom,
  prospectsHref,
} from "./query.ts";
import { isValidSessionToken, sessionToken, verifyPin } from "./session.ts";
import { typeLabel } from "./copy.ts";

test("parseCsv keeps commas inside quotes", () => {
  const rows = parseCsv('a,b\n"x, y",z\n');
  assert.deepEqual(rows, [
    ["a", "b"],
    ["x, y", "z"],
  ]);
  assert.deepEqual(csvRowsToObjects(rows), [{ a: "x, y", b: "z" }]);
});

test("parseCsv unescapes doubled quotes", () => {
  const rows = parseCsv('name,notes\n"Acme, Inc.","He said ""hello"""\n');
  assert.equal(rows[1][0], "Acme, Inc.");
  assert.equal(rows[1][1], 'He said "hello"');
});

test("catalog loads every included country file and skips excluded rows", () => {
  resetProspectsCache();
  const prospects = loadProspects();
  const countries = new Set(prospects.map((row) => row.country));

  assert.equal(prospects.length, 188);
  assert.deepEqual(
    [...countries].sort(),
    [
      "Australia",
      "China",
      "France",
      "Germany",
      "Russia",
      "Switzerland",
      "United Arab Emirates",
      "United States",
    ],
  );
  assert.equal(
    prospects.some((row) => row.companyName.includes("AFK Sistema")),
    false,
  );
  assert.equal(new Set(prospects.map((row) => row.id)).size, prospects.length);
  assert.ok(prospects.every((row) => row.companyName && row.country && row.type));
});

test("filters narrow by country, city and type", () => {
  const prospects = loadProspects();
  const france = filterProspects(prospects, {
    country: "France",
    city: "",
    type: "",
  });
  assert.ok(france.length > 0);
  assert.ok(france.every((row) => row.country === "France"));

  const parisOffices = filterProspects(prospects, {
    country: "France",
    city: "Paris",
    type: "private_office",
  });
  assert.ok(parisOffices.length > 0);
  assert.ok(
    parisOffices.every(
      (row) =>
        row.country === "France" && row.city === "Paris" && row.type === "private_office",
    ),
  );

  const parisCities = citiesForCountry(prospects, "France");
  assert.ok(parisCities.includes("Paris"));
  assert.ok(parisCities.includes("Cannes"));
  assert.ok(
    parisCities.every((city) =>
      prospects.some((row) => row.country === "France" && row.city === city),
    ),
  );
});

test("search params build a stable desk URL", () => {
  assert.equal(prospectsHref({}), "/prospects");
  assert.equal(
    prospectsHref({ country: "France", city: "Paris", type: "private_office", id: "abc" }),
    "/prospects?country=France&city=Paris&type=private_office&id=abc",
  );
  assert.deepEqual(parseProspectsSearch({ country: " Germany ", type: ["luxury_agency"] }), {
    country: "Germany",
    city: "",
    type: "luxury_agency",
    id: "",
  });
  assert.equal(
    prospectIdFrom({
      country: "France",
      companyName: "BARNES Private Office",
      contactName: "Claire Drean",
      city: "Paris",
      type: "private_office",
    }),
    "france-barnes-private-office-claire-drean-paris",
  );
  assert.equal(typeLabel("private_office"), "Private office");
});

test("PIN comparison is exact and session tokens follow the configured PIN", () => {
  const previous = process.env.PROSPECTS_PIN;
  delete process.env.PROSPECTS_PIN;
  assert.equal(verifyPin("1234"), false);
  assert.equal(sessionToken(), null);

  process.env.PROSPECTS_PIN = "4829";
  assert.equal(verifyPin("4829"), true);
  assert.equal(verifyPin("0000"), false);
  assert.equal(verifyPin("48290"), false);
  const token = sessionToken();
  assert.ok(token);
  assert.equal(isValidSessionToken(token), true);
  assert.equal(isValidSessionToken("deadbeef"), false);

  process.env.PROSPECTS_PIN = "0000";
  assert.equal(isValidSessionToken(token), false);

  if (previous === undefined) delete process.env.PROSPECTS_PIN;
  else process.env.PROSPECTS_PIN = previous;
});
