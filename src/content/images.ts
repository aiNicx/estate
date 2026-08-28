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
    | "home-gallery"
    | "home-location"
    | "property"
    | "spaces"
    | "location"
    | "heritage"
    | "gallery"
  >;
};

const PORTRAIT = { width: 1650, height: 2200 };

/**
 * Image / content map. Files resolve from public/images/property/.
 * Numbered filenames keep gallery order stable and match preferred names exactly.
 */
export const imageSpecs: ImageSpec[] = [
  {
    id: "hero-cove-aerial",
    file: "01-hero-cove-aerial.jpg",
    role: "hero",
    objectPosition: "42% 48%",
    ...PORTRAIT,
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
    ...PORTRAIT,
    alt: {
      en: "Aerial view of the white hillside buildings, terraces, beach lounge and lemon groves above the cove at Marina d'Albori.",
      it: "Vista aerea degli edifici bianchi sul versante, delle terrazze, dell'area lounge sulla spiaggia e dei limoneti sopra la cala a Marina d'Albori.",
    },
    caption: {
      en: "Buildings, terraces and the cove, seen from above.",
      it: "Edifici, terrazze e cala, visti dall'alto.",
    },
    placements: ["property", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "terrace-dining-sea",
    file: "03-terrace-dining-sea.jpg",
    role: "terraces",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "Outdoor dining terrace framed by a white arch, looking out to the Tyrrhenian Sea from Marina d'Albori.",
      it: "Terrazza da pranzo inquadrata da un arco bianco, con vista sul Mar Tirreno da Marina d'Albori.",
    },
    caption: {
      en: "A terrace looking south over the sea.",
      it: "Una terrazza rivolta a sud, sul mare.",
    },
    placements: ["home-intro", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "living-kitchen",
    file: "04-living-kitchen.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    ...PORTRAIT,
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
    ...PORTRAIT,
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
    ...PORTRAIT,
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
    ...PORTRAIT,
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
    ...PORTRAIT,
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
  {
    id: "sea-rocks-buoys",
    file: "09-sea-rocks-buoys.jpg",
    role: "sea-landscape",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Limestone sea stacks and swimming-area buoys in the cove at Marina d'Albori, lit by warm low sun.",
      it: "Faraglioni e boe dell'area di balneazione nella cala di Marina d'Albori, illuminati da luce bassa e calda.",
    },
    caption: {
      en: "The cove from the waterline.",
      it: "La cala dalla linea d'acqua.",
    },
    placements: ["location", "heritage", "gallery", "home-location"],
  },
  {
    id: "exterior-pines-stream",
    file: "10-exterior-pines-stream.jpg",
    role: "architecture",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "White hillside buildings among tall stone pines, with a shallow stream, patio and wooden boat at Marina d'Albori.",
      it: "Edifici bianchi sul versante tra pini marittimi, con un corso d'acqua basso, patio e barca in legno a Marina d'Albori.",
    },
    caption: {
      en: "The buildings among the pines, beside the stream.",
      it: "Gli edifici tra i pini, accanto al torrente.",
    },
    placements: ["property", "location", "gallery"],
  },
  {
    id: "bathroom-navy-geometric",
    file: "11-bathroom-navy-geometric.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Bathroom with navy tiled floor and a glass shower lined in blue and white geometric ceramic.",
      it: "Bagno con pavimento blu e doccia in vetro rivestita in ceramica geometrica blu e bianca.",
    },
    caption: {
      en: "Navy floor and geometric ceramic in the shower.",
      it: "Pavimento blu e ceramica geometrica nella doccia.",
    },
    placements: ["gallery"],
  },
  {
    id: "kitchen-dining-majolica",
    file: "12-kitchen-dining-majolica.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    ...PORTRAIT,
    alt: {
      en: "Kitchen and dining room with floral majolica floor tiles, a dark wood table and a blue tiled kitchen backsplash.",
      it: "Cucina e sala da pranzo con pavimento in maiolica floreale, tavolo in legno scuro e alzata blu.",
    },
    caption: {
      en: "Kitchen and dining, with majolica underfoot.",
      it: "Cucina e pranzo, con maiolica a pavimento.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "corridor-unit-doors",
    file: "13-corridor-unit-doors.jpg",
    role: "atmosphere",
    objectPosition: "50% 50%",
    ...PORTRAIT,
    alt: {
      en: "Landing with cobalt-blue doors numbered 2 and 3, terracotta floor and a mosaic ceramic wainscot.",
      it: "Pianerottolo con porte blu cobalto numerate 2 e 3, pavimento in cotto e zoccolo a mosaico ceramico.",
    },
    caption: {
      en: "Doors to residential units, with mosaic work along the wall.",
      it: "Porte delle unità residenziali, con mosaico lungo la parete.",
    },
    placements: ["property", "heritage", "gallery"],
  },
  {
    id: "living-studio-daybed",
    file: "14-living-studio-daybed.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    ...PORTRAIT,
    alt: {
      en: "Open-plan studio with kitchen counter, dining table, daybed and patterned ceramic floor tiles.",
      it: "Studio open space con bancone cucina, tavolo da pranzo, daybed e pavimento in ceramica decorata.",
    },
    caption: {
      en: "A compact residential unit: kitchen, dining and sleeping.",
      it: "Un'unità compatta: cucina, pranzo e sleeping.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "terrace-wicker-sea",
    file: "15-terrace-wicker-sea.jpg",
    role: "terraces",
    objectPosition: "50% 35%",
    ...PORTRAIT,
    alt: {
      en: "Terrace with wicker chairs looking out over the Tyrrhenian Sea from Marina d'Albori.",
      it: "Terrazza con poltrone in rattan e vista sul Mar Tirreno da Marina d'Albori.",
    },
    caption: {
      en: "A private terrace facing the sea.",
      it: "Una terrazza privata rivolta al mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "garden-night-terrace",
    file: "16-garden-night-terrace.jpg",
    role: "atmosphere",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Terraced garden at night, with string lights in the trees, a lit palm and a stone path on the hillside.",
      it: "Giardino terrazzato di sera, con luci tra gli alberi, una palma illuminata e un sentiero in pietra sul versante.",
    },
    caption: {
      en: "The garden terraces after dark.",
      it: "I terrazzamenti del giardino dopo il tramonto.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "garden-night-pergola",
    file: "17-garden-night-pergola.jpg",
    role: "atmosphere",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "Night path under a wooden pergola of citrus trees, lit by warm festoon lights.",
      it: "Sentiero notturno sotto una pergola di agrumi, illuminata da luci calde.",
    },
    caption: {
      en: "Under the citrus pergola at night.",
      it: "Sotto la pergola di agrumi, di sera.",
    },
    placements: ["heritage", "gallery"],
  },
  {
    id: "living-teal-sofa",
    file: "18-living-teal-sofa.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    ...PORTRAIT,
    alt: {
      en: "Living room with a teal sofa, patterned ceramic floor and a television against a white wall.",
      it: "Soggiorno con divano verde acqua, pavimento in ceramica decorata e televisore su parete bianca.",
    },
    caption: {
      en: "A sitting room in one of the residential units.",
      it: "Un soggiorno in una delle unità residenziali.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "path-stairs-sea",
    file: "19-path-stairs-sea.jpg",
    role: "waterfront",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Stone staircase through fig leaves and Mediterranean plants, descending toward the sea.",
      it: "Scala in pietra tra foglie di fico e vegetazione mediterranea, che scende verso il mare.",
    },
    caption: {
      en: "The path down toward the water.",
      it: "Il percorso verso l'acqua.",
    },
    placements: ["location", "heritage", "gallery", "home-location"],
  },
  {
    id: "bedroom-vaulted-sea",
    file: "20-bedroom-vaulted-sea.jpg",
    role: "hospitality",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Bedroom with a vaulted ceiling, purple bedspread and an open door to a terrace with a sea view.",
      it: "Camera con soffitto a volta, copriletto viola e porta aperta su una terrazza con vista mare.",
    },
    caption: {
      en: "A vaulted bedroom opening to the sea.",
      it: "Una camera a volta aperta sul mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom-view-pines",
    file: "21-bedroom-view-pines.jpg",
    role: "hospitality",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "View from a bed toward an open terrace door, with pine trees and the sea beyond.",
      it: "Vista dal letto verso una porta aperta sulla terrazza, con pini e il mare oltre.",
    },
    caption: {
      en: "From the bed to the pines and the water.",
      it: "Dal letto ai pini e al mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "living-vaulted-tv",
    file: "22-living-vaulted-tv.jpg",
    role: "interiors",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "Living room with a barrel-vaulted ceiling, floral tiled floor, grey sofa and a contemporary television wall.",
      it: "Soggiorno con soffitto a botte, pavimento in maiolica floreale, divano grigio e parete TV contemporanea.",
    },
    caption: {
      en: "A vaulted sitting room.",
      it: "Un soggiorno a volta.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bathroom-vessel-shower",
    file: "23-bathroom-vessel-shower.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Long bathroom with a vessel sink, bidet and a glass shower finished in geometric ceramic tiles.",
      it: "Bagno allungato con lavabo a bacinella, bidet e doccia in vetro rivestita in ceramica geometrica.",
    },
    caption: {
      en: "Another bathroom, with geometric ceramic in the shower.",
      it: "Un altro bagno, con ceramica geometrica nella doccia.",
    },
    placements: ["gallery"],
  },
  {
    id: "balcony-arch-beach",
    file: "24-balcony-arch-beach.jpg",
    role: "terraces",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "Balcony framed by a white arch, with mosaic bistro furniture looking over the beach and the sea.",
      it: "Balcone inquadrato da un arco bianco, con set bistro a mosaico e vista sulla spiaggia e sul mare.",
    },
    caption: {
      en: "A balcony looking over the beach.",
      it: "Un balcone sulla spiaggia.",
    },
    placements: ["home-intro", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "living-sea-view",
    file: "25-living-sea-view.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    ...PORTRAIT,
    alt: {
      en: "Open-plan living, dining and kitchen with patterned floor tiles and open doors framing the sea.",
      it: "Open space con soggiorno, pranzo e cucina, pavimento decorato e porte aperte sul mare.",
    },
    caption: {
      en: "Living space opening directly to the sea.",
      it: "Soggiorno che si apre direttamente sul mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom-balcony-sea",
    file: "26-bedroom-balcony-sea.jpg",
    role: "hospitality",
    objectPosition: "50% 40%",
    ...PORTRAIT,
    alt: {
      en: "Bedroom looking through open balcony doors to terracotta tiles, boats and the Tyrrhenian Sea.",
      it: "Camera con porte aperte sulla terrazza in cotto, barche e il Mar Tirreno.",
    },
    caption: {
      en: "A bedroom with the sea at the threshold.",
      it: "Una camera con il mare sulla soglia.",
    },
    placements: ["spaces", "gallery"],
  },
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type ResolvedImage = ImageSpec & {
  src: string;
  available: boolean;
};

function listUploadedFiles(): string[] {
  try {
    if (!existsSync(PROPERTY_IMAGE_PUBLIC_DIR)) return [];
    return readdirSync(PROPERTY_IMAGE_PUBLIC_DIR).filter((name) => {
      const ext = path.extname(name).toLowerCase();
      return IMAGE_EXT.has(ext) && !name.startsWith(".");
    });
  } catch {
    return [];
  }
}

export const FILE_KEYWORDS: Record<string, string[]> = {
  "hero-cove-aerial": ["01-", "hero", "cove", "aerial", "drone", "aerea", "cala", "pontile", "pontoon"],
  "architecture-hillside-aerial": ["02-", "architecture", "hillside", "edificio", "versante"],
  "terrace-dining-sea": ["03-", "terrace", "terrazza", "dining", "pranzo", "arco", "archway"],
  "living-kitchen": ["04-", "living", "kitchen", "cucina", "soggiorno", "open-plan"],
  "bedroom": ["05-", "bedroom", "camera", "letto", "bedspread"],
  "bathroom-majolica": ["06-", "majolica", "maiolica", "navy"],
  "bathroom-geometric": ["07-", "geometric", "geometr"],
  "corridor-mosaic": ["08-", "corridor", "corridoio", "mosaic", "mosaico", "onda"],
  "sea-rocks-buoys": ["09-", "rocks", "buoys", "faraglioni", "boe"],
  "exterior-pines-stream": ["10-", "pines", "stream", "pini", "torrente"],
  "bathroom-navy-geometric": ["11-", "navy-geometric"],
  "kitchen-dining-majolica": ["12-", "kitchen-dining"],
  "corridor-unit-doors": ["13-", "unit-doors", "porte"],
  "living-studio-daybed": ["14-", "daybed", "studio"],
  "terrace-wicker-sea": ["15-", "wicker", "rattan"],
  "garden-night-terrace": ["16-", "garden-night", "giardino"],
  "garden-night-pergola": ["17-", "pergola"],
  "living-teal-sofa": ["18-", "teal", "sofa", "divano"],
  "path-stairs-sea": ["19-", "path", "stairs", "scala", "sentiero"],
  "bedroom-vaulted-sea": ["20-", "vaulted", "volta"],
  "bedroom-view-pines": ["21-", "view-pines"],
  "living-vaulted-tv": ["22-", "vaulted-tv"],
  "bathroom-vessel-shower": ["23-", "vessel"],
  "balcony-arch-beach": ["24-", "balcony", "balcone", "spiaggia"],
  "living-sea-view": ["25-", "sea-view", "vista-mare"],
  "bedroom-balcony-sea": ["26-", "balcony-sea"],
};

function unused(files: string[], used: Set<string>): string[] {
  return files.filter((file) => !used.has(file.toLowerCase()));
}

function numericPrefix(name: string): string | null {
  const match = name.toLowerCase().match(/^(\d{2})[-_]/);
  return match ? match[1] : null;
}

function matchPreferred(spec: ImageSpec, files: string[], used: Set<string>): string | null {
  const available = unused(files, used);
  const lowerPreferred = spec.file.toLowerCase();
  const exact = available.find((file) => file.toLowerCase() === lowerPreferred);
  if (exact) return exact;

  const stem = spec.file.replace(/\.[^.]+$/, "").toLowerCase();
  const byStem = available.find((file) => file.toLowerCase().startsWith(stem));
  if (byStem) return byStem;

  const specPrefix = numericPrefix(spec.file);
  if (!specPrefix) return null;
  return (
    available.find((file) => numericPrefix(file) === specPrefix) ?? null
  );
}

function matchKeywords(spec: ImageSpec, files: string[], used: Set<string>): string | null {
  const available = unused(files, used);
  const keywords = FILE_KEYWORDS[spec.id] ?? [];
  const specPrefix = numericPrefix(spec.file);
  return (
    available.find((file) => {
      const name = file.toLowerCase();
      const filePrefix = numericPrefix(file);
      if (filePrefix && specPrefix && filePrefix !== specPrefix) return false;
      return keywords.some((keyword) => {
        const needle = keyword.toLowerCase();
        if (/^\d{2}-?$/.test(needle)) return false;
        return name.includes(needle);
      });
    }) ?? null
  );
}

/** Pure assignment used by the filesystem resolver and by tests. */
export function assignUploadedFiles(files: string[]): {
  byId: Record<string, string | null>;
  extras: string[];
} {
  const used = new Set<string>();
  const byId: Record<string, string | null> = {};

  for (const spec of imageSpecs) {
    const matched = matchPreferred(spec, files, used);
    if (matched) used.add(matched.toLowerCase());
    byId[spec.id] = matched;
  }

  for (const spec of imageSpecs) {
    if (byId[spec.id]) continue;
    const matched = matchKeywords(spec, files, used);
    if (matched) {
      used.add(matched.toLowerCase());
      byId[spec.id] = matched;
    }
  }

  return {
    byId,
    extras: files.filter((file) => !used.has(file.toLowerCase())),
  };
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
  const { byId, extras } = assignUploadedFiles(files);
  const mapped = imageSpecs.map((spec) => {
    const matched = byId[spec.id];
    return {
      ...spec,
      src: matched ? `/${PROPERTY_IMAGE_DIR}/${matched}` : `/${PROPERTY_IMAGE_DIR}/${spec.file}`,
      available: Boolean(matched),
    };
  });
  const extraImages = extras.map((file, index) => {
    const spec = extraSpec(file, index);
    return {
      ...spec,
      src: `/${PROPERTY_IMAGE_DIR}/${file}`,
      available: true,
    };
  });
  return [...mapped, ...extraImages];
}

export function availableImage(id: string): ResolvedImage | undefined {
  const image = imageById(id);
  return image?.available ? image : undefined;
}

export function imagesByIds(ids: readonly string[]): ResolvedImage[] {
  return ids
    .map((id) => availableImage(id))
    .filter((image): image is ResolvedImage => Boolean(image));
}

/** Editorial homepage gallery: one featured image, then supporting views. */
export const HOME_GALLERY_IDS = [
  "architecture-hillside-aerial",
  "terrace-dining-sea",
  "balcony-arch-beach",
] as const;

export const HOME_SEA_IMAGE_IDS = [
  "path-stairs-sea",
  "sea-rocks-buoys",
] as const;

export function imageById(id: string): ResolvedImage | undefined {
  return resolveImages().find((image) => image.id === id);
}

export function imagesFor(
  placement: ImageSpec["placements"][number],
): ResolvedImage[] {
  return resolveImages().filter(
    (image) => image.available && image.placements.includes(placement),
  );
}

/** Uploaded files that are not yet mapped to a known spec. */
export function unmappedUploads(): string[] {
  const files = listUploadedFiles();
  const resolved = resolveImages()
    .filter((image) => image.available)
    .map((image) => path.basename(image.src).toLowerCase());
  return files.filter((file) => !resolved.includes(file.toLowerCase()));
}
