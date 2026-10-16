import assert from "node:assert/strict";
import test from "node:test";
import { getSiteUrl } from "./site.ts";

const KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
] as const;

test("getSiteUrl never throws on empty or invalid env values", () => {
  const previous = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));
  for (const key of KEYS) delete process.env[key];

  process.env.NEXT_PUBLIC_SITE_URL = "   ";
  assert.match(getSiteUrl(), /^https?:\/\//);

  process.env.NEXT_PUBLIC_SITE_URL = "not a url";
  assert.match(getSiteUrl(), /^https?:\/\//);

  process.env.NEXT_PUBLIC_SITE_URL = "estate.example.com";
  assert.equal(getSiteUrl(), "https://estate.example.com");

  for (const key of KEYS) {
    const value = previous[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("contact address is optional and mailto links encode subject and body", async () => {
  const { contactEmail, mailtoHref } = await import("./site.ts");
  assert.equal(contactEmail({}), null);
  assert.equal(contactEmail({ CONTACT_EMAIL: "not an address" }), null);
  assert.equal(contactEmail({ CONTACT_EMAIL: " owner@example.com " }), "owner@example.com");
  assert.equal(
    mailtoHref("owner@example.com", "Marina d’Albori · Viewing", "Good morning,\n\nKind regards,"),
    "mailto:owner@example.com?subject=Marina%20d%E2%80%99Albori%20%C2%B7%20Viewing&body=Good%20morning%2C%0A%0AKind%20regards%2C",
  );
});
