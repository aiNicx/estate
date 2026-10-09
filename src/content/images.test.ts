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

test("replacement aerials take precedence over originals and PNG source copies", () => {
  const { byId } = assignUploadedFiles([
    "01-hero-cove-aerial.jpg", "02-architecture-hillside-aerial.jpg",
    "01_new.png", "02_new.png", "01_new.jpg", "02_new.jpg",
  ]);
  assert.equal(byId["hero-cove-aerial"], "01_new.jpg");
  assert.equal(byId["architecture-hillside-aerial"], "02_new.jpg");
});

test("brochure gallery publishes only the selected photos in chapter order", async () => {
  const { brochurePhotoIds } = await import("./brochure.ts");
  const { imageSpecs, imagesFor } = await import("./images.ts");
  const catalog = new Set(imageSpecs.map((spec) => spec.id));
  assert.equal(new Set(brochurePhotoIds).size, brochurePhotoIds.length);
  for (const id of brochurePhotoIds) assert.ok(catalog.has(id), id);
  const published = imagesFor("gallery");
  assert.equal(brochurePhotoIds.length, 12);
  assert.deepEqual(published.map(image => image.id), [...brochurePhotoIds]);
  assert.ok(published.every((image) => brochurePhotoIds.includes(image.id as typeof brochurePhotoIds[number])));
  assert.ok(published.every((image) => !image.src.endsWith(".png") && !image.id.startsWith("extra-")));
});
