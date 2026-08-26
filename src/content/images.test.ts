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
