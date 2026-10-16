import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

// Start the production build locally before running this check, with the same
// ACCESS_SECRET passed here as BROCHURE_TEST_SECRET and, optionally, CONTACT_EMAIL
// as BROCHURE_TEST_CONTACT. No email or notification is sent.
const baseURL = process.env.BROCHURE_TEST_URL || "http://localhost:3100";
const secret = process.env.BROCHURE_TEST_SECRET;
const contact = process.env.BROCHURE_TEST_CONTACT || null;
if (!secret) throw new Error("Set BROCHURE_TEST_SECRET to the server's ACCESS_SECRET.");

/** Same algorithm as src/lib/access.ts. */
function token(slug) {
  const signature = createHmac("sha256", secret).update(`access:${slug}`).digest().subarray(0, 16).toString("base64url");
  return `${slug}.${signature}`;
}
const personalLink = (locale) => `/v/${token("browser-check")}${locale === "it" ? "?lang=it" : ""}`;

const output = "test-results/brochure";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const sections = ["proprieta", "spazi", "storia", "posizione", "informazioni"];
const redirects = { "the-property": "proprieta", investment: "proprieta", spaces: "spazi", gallery: "spazi", heritage: "storia", location: "posizione", request: "informazioni" };
const reports = [];
try {
  // Without a personal link nothing about the property is served.
  const stranger = await browser.newContext({ baseURL });
  for (const path of ["/en", "/it", "/it#informazioni", "/en/opengraph-image", "/it/gallery", "/v/browser-check.forged", `/v/${token("browser-check").replace("browser", "browsers")}`]) {
    const response = await stranger.request.get(path, { maxRedirects: 0 });
    assert.equal(response.status(), 403, path);
    const text = await response.text();
    assert.match(text, /Presentazione riservata/);
    assert.doesNotMatch(text, /Albori|Vietri|spiaggia|beach/i, path);
    assert.match(response.headers()["x-robots-tag"], /noindex/);
  }
  for (const locale of ["it", "en"]) {
    const privacy = await stranger.request.get(`/${locale}/privacy`);
    assert.equal(privacy.status(), 200, "privacy stays public");
    assert.doesNotMatch(await privacy.text(), /<form/);
  }
  assert.equal((await stranger.request.post("/api/view", { data: { locale: "en" } })).status(), 403);
  const entry = await stranger.request.get(personalLink("it"), { maxRedirects: 0 });
  assert.equal(entry.status(), 302);
  assert.equal(new URL(entry.headers().location, baseURL).pathname, "/it");
  assert.match(entry.headers()["set-cookie"], /mda_access=browser-check\.[^;]+;.*HttpOnly/i);
  await stranger.close();

  for (const width of [1440, 820, 390]) {
    for (const locale of ["it", "en"]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, baseURL, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(personalLink(locale));
      assert.equal(response.status(), 200);
      assert.equal(new URL(page.url()).pathname, `/${locale}`);
      await page.locator(".brochure-hero img").evaluate(image => image.decode());
      await page.screenshot({ path: `${output}/${locale}-${width}-hero.png` });
      assert.equal(await page.locator("html").getAttribute("lang"), locale);
      assert.equal(await page.locator("h1").innerText(), "Marina d’Albori");
      assert.equal(await page.locator("form").count(), 0);
      const title = await page.title();
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute("content"), title);
      assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute("content"), title);
      assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex, nofollow/);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      assert.equal(await page.locator('meta[property="og:description"]').getAttribute("content"), description);
      const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
      const structuredPage = data["@graph"].find(node => node["@type"] === "WebPage");
      assert.equal(structuredPage.name, title);
      assert.equal(structuredPage.description, description);
      assert.equal(structuredPage.image.length, 12);
      const published = await page.locator("main img").evaluateAll(images => images.map(image => ({ alt: image.alt, src: new URL(image.src).searchParams.get("url") || new URL(image.src).pathname })));
      assert.deepEqual(published.map(image => image.src), structuredPage.image.map(image => new URL(image.contentUrl).pathname));
      assert.deepEqual(published.map(image => image.alt), structuredPage.image.map(image => image.description));
      for (const id of sections) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        const photographs = page.locator(`#${id} img`);
        for (const photo of await photographs.all()) {
          await photo.scrollIntoViewIfNeeded();
          await photo.evaluate(image => image.decode());
        }
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        assert.ok(await page.locator(`#${id} h2`).isVisible());
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale}/${id} at ${width}px`);
        // A tall element screenshot temporarily resizes the viewport, which can interrupt WebGL rendering.
        if (id !== "posizione" && (width === 1440 || width === 390)) await page.locator(`#${id}`).screenshot({ path: `${output}/${locale}-${width}-${id}.png`, style: ".site-header { visibility: hidden; }" });
      }
      await page.locator(".location-map").scrollIntoViewIfNeeded();
      await page.locator(".estate-map-canvas-ready").waitFor({ timeout: 25000 });
      await page.waitForLoadState("networkidle");
      await page.locator(".location-map").screenshot({ path: `${output}/${locale}-${width}-map-detail.png`, style: ".site-header { visibility: hidden; }" });
      const mapWidth = await page.locator(".location-map-frame").evaluate(frame => frame.clientWidth);
      const canvasWidth = await page.locator(".location-map canvas").evaluate(canvas => canvas.getBoundingClientRect().width);
      assert.ok(Math.abs(mapWidth - canvasWidth) <= 1, `Map canvas must fit the frame at ${width}px`);
      const information = page.locator("#informazioni");
      assert.ok((await information.innerText()).includes("email"));
      const mailtos = await information.locator('a[href^="mailto:"]').evaluateAll(links => links.map(link => link.getAttribute("href")));
      if (contact) {
        assert.equal(mailtos.length, 4, "three topic requests and one general address");
        for (const href of mailtos) {
          const url = new URL(href);
          assert.equal(url.pathname, contact);
          assert.match(url.searchParams.get("subject"), /^Marina d’Albori · /);
          assert.match(url.searchParams.get("body"), /Marina d’Albori/);
        }
        assert.equal(await information.locator(".brochure-contact-email").innerText(), contact);
      } else {
        assert.equal(mailtos.length, 0);
      }
      assert.equal(await page.locator(".brochure-scenarios li").count(), 3);
      await page.locator("#spazi button").first().click();
      await page.locator("dialog[open]").waitFor();
      assert.match(await page.locator("dialog").innerText(), /1 \/ 7/);
      await page.keyboard.press("ArrowRight");
      assert.match(await page.locator("dialog").innerText(), /2 \/ 7/);
      await page.keyboard.press("ArrowLeft");
      assert.match(await page.locator("dialog").innerText(), /1 \/ 7/);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("dialog[open]").count(), 0);
      assert.ok(await page.locator("#spazi button").first().evaluate(button => document.activeElement === button));
      if (width < 1100) {
        const toggle = page.locator(".brochure-menu-button");
        await toggle.click();
        assert.equal(await toggle.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
        await toggle.click();
        await page.locator(`.brochure-mobile-menu a[href="/${locale}#informazioni"]`).click();
        await page.waitForURL(`**/${locale}#informazioni`);
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      }
      for (const section of sections) {
        await page.goto(`/${locale}#${section}`);
        await page.getByRole("link", { name: locale === "it" ? "English" : "Italiano", exact: true }).click();
        await page.waitForURL(`**/${locale === "it" ? "en" : "it"}#${section}`);
        await page.waitForFunction(id => {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          return top !== undefined && top >= 0 && top < window.innerHeight / 2;
        }, section);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
      if (width === 1440) {
        // The view is reported once, after a few visible seconds and a real interaction.
        const fresh = await context.newPage();
        const reported = [];
        fresh.on("request", request => { if (request.url().endsWith("/api/view")) reported.push(request); });
        await fresh.goto(`/${locale}`);
        await fresh.waitForTimeout(4500);
        assert.equal(reported.length, 0, "no report without interaction");
        const viewResponse = fresh.waitForResponse(response => response.url().endsWith("/api/view"));
        await fresh.mouse.move(200, 300);
        await fresh.mouse.move(260, 340);
        assert.equal((await viewResponse).status(), 204);
        assert.deepEqual(reported[0].postDataJSON(), { locale });
        await fresh.mouse.move(300, 380);
        await fresh.waitForTimeout(300);
        assert.equal(reported.length, 1, "one report per session");
        await fresh.close();
      }
      assert.deepEqual(errors, []);
      reports.push({ locale, width, sections: "pass", images: published.length, map: "ready", gallery: "keyboard and focus pass", languageHashes: "5/5", contact: contact ? "4 mailto" : "reply only", view: width === 1440 ? "reported once after interaction" : "not tested", pageErrors: errors });
      await context.close();
    }
  }
  const context = await browser.newContext({ baseURL });
  await context.request.get(personalLink("it"));
  const fallback = await context.newPage();
  await fallback.route("https://tiles.openfreemap.org/**", route => route.abort());
  await fallback.goto("/it#posizione");
  await fallback.locator(".estate-map-unavailable").waitFor({ timeout: 20000 });
  assert.ok(await fallback.getByRole("link", { name: /Apri la posizione su Google Maps/ }).isVisible());
  await fallback.close();
  for (const locale of ["it", "en"]) {
    for (const [route, section] of Object.entries(redirects)) {
      const response = await context.request.get(`/${locale}/${route}`, { maxRedirects: 0 });
      assert.equal(response.status(), 308, `${locale}/${route}`);
      assert.equal(new URL(response.headers().location, baseURL).pathname + new URL(response.headers().location, baseURL).hash, `/${locale}#${section}`);
    }
    const og = await context.request.get(`/${locale}/opengraph-image`);
    assert.equal(og.status(), 200);
    assert.match(og.headers()["content-type"], /image\/png/);
    await writeFile(`${output}/${locale}-opengraph.png`, await og.body());
  }
  assert.equal((await context.request.post("/api/inquiry", { data: { probe: true } })).status(), 404, "the old form API is gone");
  assert.doesNotMatch(await (await context.request.get("/sitemap.xml")).text(), /<loc>/);
  assert.doesNotMatch(await (await context.request.get("/robots.txt")).text(), /Sitemap:/);
  assert.equal((await context.request.get("/it/non-esiste")).status(), 404);
  await context.close();
  await writeFile(`${output}/report.json`, JSON.stringify({ checkedAt: new Date().toISOString(), baseURL, views: reports, access: "403 neutral page without link, forged and altered tokens refused, privacy public", redirects: 14, og: "IT/EN PNG 200", sitemap: "empty", notFound: 404 }, null, 2));
  console.log(JSON.stringify(reports, null, 2));
  console.log("Access control, 14 redirects, IT/EN OG, privacy, contact, view report, sitemap and 404: PASS");
} finally {
  await browser.close();
}
