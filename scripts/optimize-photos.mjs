#!/usr/bin/env node
/**
 * Optimise property photographs for the public site.
 * - Converts HEIC/PNG/TIFF to JPEG
 * - Resizes the long edge to 2200px
 * - Writes JPEG (q82) as the canonical file
 * - Removes obsolete originals after a successful convert
 *
 * Usage: node scripts/optimize-photos.mjs
 */
import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "property");
const MAX_EDGE = 2200;
const JPEG_QUALITY = 82;
const SOURCE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
  ".avif",
]);

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default;
  } catch {
    console.error("Install sharp first: npm install sharp");
    process.exit(1);
  }
}

function stemOf(filename) {
  return filename.replace(/\.[^.]+$/, "");
}

async function main() {
  const sharp = await loadSharp();
  await mkdir(ROOT, { recursive: true });
  const names = (await readdir(ROOT)).filter((name) => !name.startsWith("."));
  const convertedFrom = new Set();

  for (const name of names) {
    const ext = path.extname(name).toLowerCase();
    if (!SOURCE_EXT.has(ext)) continue;
    const input = path.join(ROOT, name);
    const info = await stat(input);
    if (!info.isFile()) continue;

    const image = sharp(input, { failOn: "none" }).rotate();
    const meta = await image.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const longEdge = Math.max(width, height);
    const needsResize = longEdge > MAX_EDGE;
    const needsConvert = ext !== ".jpg" && ext !== ".jpeg";
    const oversizedBytes = info.size > 1_800_000;

    if (!needsResize && !needsConvert && !oversizedBytes) {
      console.log(`keep  ${name} (${Math.round(info.size / 1024)} KB, ${width}×${height})`);
      continue;
    }

    const outName = `${stemOf(name)}.jpg`;
    const output = path.join(ROOT, outName);
    const tmp = path.join(ROOT, `.tmp-${outName}`);

    let pipeline = image;
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(tmp);

    const { rename } = await import("node:fs/promises");
    await rename(tmp, output);
    const outStat = await stat(output);
    console.log(
      `write ${outName} (${Math.round(outStat.size / 1024)} KB) from ${name}`,
    );

    if (path.resolve(input) !== path.resolve(output)) {
      convertedFrom.add(input);
    }
  }

  for (const original of convertedFrom) {
    await unlink(original);
    console.log(`delete obsolete ${path.basename(original)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
