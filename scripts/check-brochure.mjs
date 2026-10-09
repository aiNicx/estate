import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

// Start the production build locally before running this check. No external forms are submitted.
const baseURL = process.env.BROCHURE_TEST_URL || "http://localhost:3100";
const output = "test-results/brochure";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const sections = ["proprieta", "spazi", "storia", "posizione", "informazioni"];
const redirects = { "the-property": "proprieta", investment: "proprieta", spaces: "spazi", gallery: "spazi", heritage: "storia", location: "posizione", request: "informazioni" };
const reports = [];
try {
  for (const width of [1440, 820, 390]) {
    for (const locale of ["it", "en"]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, baseURL, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(`/${locale}`);
      assert.equal(response.status(), 200);
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
      assert.ok(await page.locator("#informazioni").innerText().then(text => text.includes("email")));
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
      assert.deepEqual(errors, []);
      reports.push({ locale, width, sections: "pass", images: published.length, map: "ready", gallery: "keyboard and focus pass", languageHashes: "5/5", pageErrors: errors });
      await context.close();
    }
  }
  const context = await browser.newContext({ baseURL });
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
    const privacy = await context.request.get(`/${locale}/privacy`);
    assert.equal(privacy.status(), 200);
    assert.doesNotMatch(await privacy.text(), /<form/);
  }
  const unavailable = await context.request.post("/api/inquiry", { data: { probe: true } });
  assert.equal(unavailable.status(), 503);
  assert.deepEqual(await unavailable.json(), { ok: false, delivered: false });
  assert.doesNotMatch(await (await context.request.get("/sitemap.xml")).text(), /<loc>/);
  assert.doesNotMatch(await (await context.request.get("/robots.txt")).text(), /Sitemap:/);
  assert.equal((await context.request.get("/it/non-esiste")).status(), 404);
  await context.close();
  await writeFile(`${output}/report.json`, JSON.stringify({ views: reports, redirects: 14, og: "IT/EN PNG 200", contact: "503", sitemap: "empty", notFound: 404 }, null, 2));
  console.log(JSON.stringify(reports, null, 2));
  console.log("14 redirects, IT/EN OG, privacy, disabled contact, sitemap and 404: PASS");
} finally {
  await browser.close();
}
