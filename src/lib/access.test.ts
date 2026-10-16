import assert from "node:assert/strict";
import test from "node:test";
import { accessConfig, createToken, restrictedPage, slugify, verifyToken } from "./access.ts";

const secret = "test-secret-with-enough-entropy";

test("recipient labels become stable, readable slugs", () => {
  assert.equal(slugify("Mario Rossi · Family Office Zürich"), "mario-rossi-family-office-zurich");
  assert.equal(slugify("  --Ånna  O’Brien-- "), "anna-o-brien");
  assert.equal(slugify("x".repeat(80)).length, 60);
});

test("a personal link verifies only with the right secret and an untouched slug", async () => {
  const token = await createToken("Mario Rossi", secret);
  assert.match(token, /^mario-rossi\.[A-Za-z0-9_-]{22}$/);
  assert.equal(await verifyToken(token, secret), "mario-rossi");
  assert.equal(await verifyToken(token, "another-secret"), null);
  assert.equal(await verifyToken(token.replace("mario", "maria"), secret), null);
  assert.equal(await verifyToken(`${token.slice(0, -1)}${token.endsWith("A") ? "B" : "A"}`, secret), null);
  assert.equal(await verifyToken("mario-rossi", secret), null);
  assert.equal(await verifyToken("", secret), null);
  assert.equal(await verifyToken(undefined, secret), null);
  assert.equal(await verifyToken(`${"a".repeat(200)}.x`, secret), null);
});

test("a revoked recipient loses access without affecting the others", async () => {
  const mario = await createToken("Mario Rossi", secret);
  const anna = await createToken("Anna Bianchi", secret);
  assert.equal(await verifyToken(mario, secret, ["mario-rossi"]), null);
  assert.equal(await verifyToken(anna, secret, ["mario-rossi"]), "anna-bianchi");
});

test("a missing secret opens development and locks production", () => {
  assert.deepEqual(accessConfig({ NODE_ENV: "development" }), { mode: "open" });
  assert.deepEqual(accessConfig({ NODE_ENV: "production", ACCESS_SECRET: "  " }), { mode: "locked" });
  assert.deepEqual(accessConfig({ NODE_ENV: "production", ACCESS_SECRET: "s", ACCESS_REVOKED: "Mario Rossi, ,anna-bianchi" }), {
    mode: "protected",
    secret: "s",
    revoked: ["mario-rossi", "anna-bianchi"],
  });
});

test("the restricted page reveals nothing about the property", () => {
  const html = restrictedPage();
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /link personale/);
  assert.match(html, /personal link/);
  assert.doesNotMatch(html, /Albori|Vietri|Amalfi|spiaggia|beach|limon|lemon|<img|<script|https?:/i);
});
