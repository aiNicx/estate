import assert from "node:assert/strict";
import test from "node:test";
import { deviceFrom, locationFrom, notifyView, resetNotifications, shouldNotify, viewMessage, type ViewDetails } from "./views.ts";

const view: ViewDetails = { slug: "mario-rossi", locale: "en", at: new Date("2026-10-17T08:30:00Z"), city: "Zürich", country: "CH", device: "computer" };

test("device type is read from the user agent", () => {
  assert.equal(deviceFrom("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148"), "smartphone");
  assert.equal(deviceFrom("Mozilla/5.0 (Linux; Android 15; Pixel 9) Mobile Safari/537.36"), "smartphone");
  assert.equal(deviceFrom("Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)"), "tablet");
  assert.equal(deviceFrom("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/141.0"), "computer");
  assert.equal(deviceFrom(null), "computer");
});

test("approximate location comes from encoded geo headers when present", () => {
  assert.deepEqual(locationFrom(new Headers({ "x-vercel-ip-city": "Z%C3%BCrich", "x-vercel-ip-country": "CH" })), { city: "Zürich", country: "CH" });
  assert.deepEqual(locationFrom(new Headers()), { city: undefined, country: undefined });
});

test("the notification says who opened the presentation, when and where, in Italian", () => {
  const { title, body } = viewMessage(view);
  assert.equal(title, "Marina d'Albori: aperta da mario-rossi");
  assert.match(body, /^mario-rossi ha aperto la presentazione in inglese\./);
  assert.match(body, /10:30/);
  assert.match(body, /Zürich, CH · computer/);
});

test("repeated views from the same recipient are not notified twice in a short window", () => {
  resetNotifications();
  assert.equal(shouldNotify("mario-rossi", 0), true);
  assert.equal(shouldNotify("mario-rossi", 60_000), false);
  assert.equal(shouldNotify("anna-bianchi", 60_000), true);
  assert.equal(shouldNotify("mario-rossi", 21 * 60_000), true);
  resetNotifications();
});

test("notifications are posted as plain text with an ASCII title, only when configured", async (t) => {
  const calls: { url: string; init: RequestInit }[] = [];
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response("{}", { status: 200 });
  });
  assert.equal(await notifyView(view, ""), false);
  assert.equal(calls.length, 0);
  assert.equal(await notifyView(view, "https://ntfy.sh/secret-topic"), true);
  assert.equal(calls[0].url, "https://ntfy.sh/secret-topic");
  const headers = calls[0].init.headers as Record<string, string>;
  assert.match(headers.Title, /^[\x20-\x7e]+$/);
  assert.match(String(calls[0].init.body), /mario-rossi ha aperto/);
});

test("a rejected notification is reported as an error", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 500 }));
  await assert.rejects(notifyView(view, "https://ntfy.sh/secret-topic"), /returned 500/);
});
