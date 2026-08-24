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
