import assert from "node:assert/strict";
import test from "node:test";
import { assignUploadedFiles } from "./images.ts";

test("numbered architecture files are not assigned to the hero by the aerial keyword", () => {
  const { byId, extras } = assignUploadedFiles([
    "02-architecture-hillside-aerial.jpg",
    "terrazza-pranzo.jpg",
    "IMG_9999.jpg",
  ]);
  assert.equal(byId["hero-cove-aerial"], null);
  assert.equal(byId["architecture-hillside-aerial"], "02-architecture-hillside-aerial.jpg");
  assert.equal(byId["terrace-dining-sea"], "terrazza-pranzo.jpg");
  assert.deepEqual(extras, ["IMG_9999.jpg"]);
});

test("preferred filenames win over later keyword matches", () => {
  const { byId } = assignUploadedFiles([
    "01-hero-cove-aerial.jpg",
    "08-corridor-mosaic.jpg",
  ]);
  assert.equal(byId["hero-cove-aerial"], "01-hero-cove-aerial.jpg");
  assert.equal(byId["corridor-mosaic"], "08-corridor-mosaic.jpg");
});

test("numbered catalog files map one-to-one and leave no extras", async () => {
  const { imageSpecs } = await import("./images.ts");
  const files = imageSpecs.map((spec) => spec.file);
  const { byId, extras } = assignUploadedFiles(files);
  for (const spec of imageSpecs) {
    assert.equal(byId[spec.id], spec.file, spec.id);
  }
  assert.deepEqual(extras, []);
});

test("homepage editorial gallery ids stay within the image map", async () => {
  const { HOME_GALLERY_IDS, HOME_SEA_IMAGE_IDS, imageSpecs } = await import("./images.ts");
  const ids = new Set(imageSpecs.map((spec) => spec.id));
  for (const id of [...HOME_GALLERY_IDS, ...HOME_SEA_IMAGE_IDS]) {
    assert.ok(ids.has(id), id);
  }
});

test("replacement aerials take precedence over originals and PNG source copies", () => {
  const { byId } = assignUploadedFiles([
    "01-hero-cove-aerial.jpg", "02-architecture-hillside-aerial.jpg",
    "01_new.png", "02_new.png", "01_new.jpg", "02_new.jpg",
  ]);
  assert.equal(byId["hero-cove-aerial"], "01_new.jpg");
  assert.equal(byId["architecture-hillside-aerial"], "02_new.jpg");
});

test("brochure gallery publishes only the selected photos in chapter order", async () => {
  const { BROCHURE_GALLERY_IDS, imageSpecs, imagesFor } = await import("./images.ts");
  const catalog = new Set(imageSpecs.map((spec) => spec.id));
  assert.equal(new Set(BROCHURE_GALLERY_IDS).size, BROCHURE_GALLERY_IDS.length);
  for (const id of BROCHURE_GALLERY_IDS) assert.ok(catalog.has(id), id);
  const published = imagesFor("gallery");
  assert.ok(published.every((image) => BROCHURE_GALLERY_IDS.includes(image.id as typeof BROCHURE_GALLERY_IDS[number])));
  assert.ok(published.every((image) => !image.src.endsWith(".png") && !image.id.startsWith("extra-")));
});
