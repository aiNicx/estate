import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import type { Locale } from "./property.ts";

export const PROPERTY_IMAGE_DIR = "images/property";
export const PROPERTY_IMAGE_PUBLIC_DIR = path.join(
  process.cwd(),
  "public",
  PROPERTY_IMAGE_DIR,
);

export type ImageRole =
  | "hero"
  | "sea-landscape"
  | "architecture"
  | "terraces"
  | "interiors"
  | "hospitality"
  | "waterfront"
  | "atmosphere";

export type ImageSpec = {
  id: string;
  /** Preferred filename after upload. */
  file: string;
  role: ImageRole;
  /** CSS object-position to keep the subject in crop. */
  objectPosition: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  /** Where the image should appear besides the gallery. */
  placements: Array<
    | "hero"
    | "home-intro"
    | "property"
    | "spaces"
    | "location"
    | "heritage"
    | "gallery"
  >;
};

/**
 * Image / content map based on the eight photographs already shared.
 * Files are resolved from public/images/property/ when present.
 */
export const imageSpecs: ImageSpec[] = [
  {
    id: "hero-cove-aerial",
    file: "01-hero-cove-aerial.jpg",
    role: "hero",
    objectPosition: "42% 48%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Aerial view of the Marina d'Albori waterfront estate in a secluded cove, with white buildings, a pebble beach, seasonal pontoon and the Amalfi Coast hillside.",
      it: "Vista aerea della proprietà fronte mare a Marina d'Albori in una cala appartata, con edifici bianchi, spiaggia di ciottoli, pontile stagionale e il versante della Costiera Amalfitana.",
    },
    caption: {
      en: "The estate in its cove, Marina d'Albori.",
      it: "La proprietà nella cala, Marina d'Albori.",
    },
    placements: ["hero", "location", "gallery"],
  },
  {
    id: "architecture-hillside-aerial",
    file: "02-architecture-hillside-aerial.jpg",
    role: "architecture",
    objectPosition: "50% 42%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Aerial view of the white hillside buildings, terraces, beach lounge and lemon groves above the cove at Marina d'Albori.",
      it: "Vista aerea degli edifici bianchi sul versante, delle terrazze, dell'area lounge sulla spiaggia e dei limoneti sopra la cala a Marina d'Albori.",
    },
    caption: {
      en: "Buildings, terraces and the cove, seen from above.",
      it: "Edifici, terrazze e cala, visti dall'alto.",
    },
    placements: ["property", "spaces", "gallery"],
  },
  {
    id: "terrace-dining-sea",
    file: "03-terrace-dining-sea.jpg",
    role: "terraces",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Outdoor dining terrace framed by a white arch, looking out to the Tyrrhenian Sea from Marina d'Albori.",
      it: "Terrazza da pranzo inquadrata da un arco bianco, con vista sul Mar Tirreno da Marina d'Albori.",
    },
    caption: {
      en: "A terrace looking south over the sea.",
      it: "Una terrazza rivolta a sud, sul mare.",
    },
    placements: ["home-intro", "spaces", "gallery"],
  },
  {
    id: "living-kitchen",
    file: "04-living-kitchen.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Open-plan living, dining and kitchen interior with patterned Vietri-style ceramic floor tiles in a residential unit.",
      it: "Interno open space con soggiorno, pranzo e cucina, pavimento in ceramica a motivo in stile Vietri in un'unità residenziale.",
    },
    caption: {
      en: "Residential interior: living, dining and kitchen.",
      it: "Interno residenziale: soggiorno, pranzo e cucina.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom",
    file: "05-bedroom.jpg",
    role: "hospitality",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bedroom prepared for guests, with a red bedspread, patterned ceramic floor and a daybed against the far wall.",
      it: "Camera preparata per gli ospiti, con copriletto rosso, pavimento in ceramica decorata e daybed sulla parete di fondo.",
    },
    caption: {
      en: "A residential room prepared for hospitality use.",
      it: "Una camera residenziale allestita per l'ospitalità.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bathroom-majolica",
    file: "06-bathroom-majolica.jpg",
    role: "atmosphere",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bathroom with navy floor tiles and a walk-in shower lined in traditional Vietri-style blue and white maiolica.",
      it: "Bagno con pavimento blu e doccia walk-in rivestita in maiolica tradizionale vietrese blu e bianca.",
    },
    caption: {
      en: "Maiolica from the Vietri ceramic tradition, in a contemporary bathroom.",
      it: "Maiolica della tradizione ceramica vietrese, in un bagno contemporaneo.",
    },
    placements: ["heritage", "gallery"],
  },
  {
    id: "bathroom-geometric",
    file: "07-bathroom-geometric.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bathroom with a glass shower whose back wall is finished in colourful geometric ceramic tiles.",
      it: "Bagno con doccia in vetro e parete di fondo in piastrelle ceramiche geometriche colorate.",
    },
    caption: {
      en: "A second bathroom, with geometric ceramic work in the shower.",
      it: "Un secondo bagno, con rivestimento geometrico in ceramica nella doccia.",
    },
    placements: ["gallery"],
  },
  {
    id: "corridor-mosaic",
    file: "08-corridor-mosaic.jpg",
    role: "atmosphere",
    objectPosition: "50% 50%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Interior corridor with terracotta floor tiles and a wave-shaped mosaic wainscot in blue, turquoise, orange and yellow ceramic fragments.",
      it: "Corridoio interno con pavimento in cotto e zoccolo a mosaico ondulato in frammenti ceramici blu, turchese, arancio e giallo.",
    },
    caption: {
      en: "Mosaic work in the circulation of the house.",
      it: "Lavoro a mosaico nei percorsi interni.",
    },
    placements: ["heritage", "gallery", "home-intro"],
  },
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type ResolvedImage = ImageSpec & {
  src: string;
  available: boolean;
};

function listUploadedFiles(): string[] {
  if (!existsSync(PROPERTY_IMAGE_PUBLIC_DIR)) return [];
  return readdirSync(PROPERTY_IMAGE_PUBLIC_DIR).filter((name) => {
    const ext = path.extname(name).toLowerCase();
    return IMAGE_EXT.has(ext) && !name.startsWith(".");
  });
}

function matchFile(spec: ImageSpec, files: string[]): string | null {
  const lower = spec.file.toLowerCase();
  const exact = files.find((f) => f.toLowerCase() === lower);
  if (exact) return exact;
  const stem = spec.file.replace(/\.[^.]+$/, "").toLowerCase();
  const byStem = files.find((f) => f.toLowerCase().startsWith(stem));
  if (byStem) return byStem;
  const index = stem.slice(0, 3);
  if (/^\d{2}-$/.test(index)) {
    const byIndex = files.find((f) => f.toLowerCase().startsWith(index.toLowerCase()));
    if (byIndex) return byIndex;
  }
  return null;
}

function extraSpec(file: string, index: number): ImageSpec {
  const stem = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return {
    id: `extra-${index}-${file.toLowerCase()}`,
    file,
    role: "atmosphere",
    objectPosition: "50% 50%",
    width: 3024,
    height: 4032,
    alt: {
      en: `Additional photograph of the Marina d'Albori estate (${stem}).`,
      it: `Fotografia aggiuntiva della proprietà Marina d'Albori (${stem}).`,
    },
    caption: {
      en: "Additional view of the estate.",
      it: "Vista aggiuntiva della proprietà.",
    },
    placements: ["gallery"],
  };
}

export function resolveImages(): ResolvedImage[] {
  const files = listUploadedFiles();
  const mapped = imageSpecs.map((spec) => {
    const matched = matchFile(spec, files);
    return {
      ...spec,
      src: matched ? `/${PROPERTY_IMAGE_DIR}/${matched}` : `/${PROPERTY_IMAGE_DIR}/${spec.file}`,
      available: Boolean(matched),
    };
  });
  const used = new Set(
    mapped
      .filter((image) => image.available)
      .map((image) => path.basename(image.src).toLowerCase()),
  );
  const extras = files
    .filter((file) => !used.has(file.toLowerCase()))
    .map((file, index) => {
      const spec = extraSpec(file, index);
      return {
        ...spec,
        src: `/${PROPERTY_IMAGE_DIR}/${file}`,
        available: true,
      };
    });
  return [...mapped, ...extras];
}

export function imageById(id: string): ResolvedImage | undefined {
  return resolveImages().find((image) => image.id === id);
}

export function imagesFor(
  placement: ImageSpec["placements"][number],
): ResolvedImage[] {
  return resolveImages().filter((image) => image.placements.includes(placement));
}

/** Uploaded files that are not yet mapped to a known spec. */
export function unmappedUploads(): string[] {
  const files = listUploadedFiles();
  const resolved = resolveImages()
    .filter((image) => image.available)
    .map((image) => path.basename(image.src).toLowerCase());
  return files.filter((file) => !resolved.includes(file.toLowerCase()));
}

export const missingVisualCategories = [
  "Dedicated close photographs of the limoneto (lemon garden) are not yet in the set; the hillside aerial shows terraced planting above the buildings.",
  "No interior photographs of the restaurant dining room were supplied; commercial use is described in copy and visible as the beach lounge in the aerials.",
] as const;
