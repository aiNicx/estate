import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { brochurePhotoIds } from "./brochure.ts";
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
/**
 * Image / content map. Files resolve from public/images/property/.
 * Preferred filenames resolve the assets; brochure groups define public order.
 */
export const imageSpecs: ImageSpec[] = [
  {
    id: "hero-cove-aerial",
    file: "01_new.jpg",
    role: "hero",
    objectPosition: "50% 62%",
    width: 1121,
    height: 1403,
    alt: {
      en: "Aerial view of the white buildings, terraces and beach, with the seasonal pontoon and hillside behind.",
      it: "Vista aerea degli edifici bianchi, delle terrazze e della spiaggia, con il pontile stagionale e il versante sullo sfondo.",
    },
    caption: {
      en: "The property and the beach at Marina d’Albori.",
      it: "La proprietà e la spiaggia di Marina d’Albori.",
    },
    placements: ["hero", "location", "gallery"],
  },
  {
    id: "architecture-hillside-aerial",
    file: "02_new.jpg",
    role: "architecture",
    objectPosition: "50% 42%",
    width: 1122,
    height: 1402,
    alt: {
      en: "Aerial view of the buildings and waterfront terraces, with pines and hillside terraces.",
      it: "Vista aerea degli edifici e delle terrazze sul fronte mare, con i pini e i terrazzamenti del versante.",
    },
    caption: {
      en: "Buildings, terraces and hillside, seen from above.",
      it: "Edifici, terrazze e versante, visti dall'alto.",
    },
    placements: ["property", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "terrace-dining-sea",
    file: "03-terrace-dining-sea.jpg",
    role: "terraces",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Dining terrace framed by a white arch, overlooking the sea.",
      it: "Terrazza con tavolo da pranzo, incorniciata da un arco bianco e affacciata sul mare.",
    },
    caption: {
      en: "A dining terrace overlooking the sea.",
      it: "Una terrazza da pranzo sul mare.",
    },
    placements: ["home-intro", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "living-kitchen",
    file: "04-living-kitchen.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    width: 3024,
    height: 3914,
    alt: {
      en: "Living room with a dining area, open kitchen, ceramic floor and pale walls.",
      it: "Soggiorno con zona pranzo e cucina aperta, pavimento in ceramica e pareti chiare.",
    },
    caption: {
      en: "Living, dining and kitchen in a residential unit.",
      it: "Soggiorno, pranzo e cucina in un'unità residenziale.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom",
    file: "05-bedroom.jpg",
    role: "hospitality",
    objectPosition: "50% 45%",
    width: 2762,
    height: 3741,
    alt: {
      en: "Bedroom with a red bedspread, patterned ceramic floor and an additional bed.",
      it: "Camera con copriletto rosso, pavimento in ceramica decorata e letto aggiuntivo.",
    },
    caption: {
      en: "A bedroom in a residential unit.",
      it: "Una camera in un'unità residenziale.",
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
      en: "Bathroom with a blue floor and a shower lined with blue and white ceramic tiles.",
      it: "Bagno con pavimento blu e doccia rivestita in ceramica blu e bianca.",
    },
    caption: {
      en: "Blue and white ceramic in a bathroom.",
      it: "Ceramica blu e bianca in un bagno.",
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
      en: "Bathroom with a glass shower and geometric ceramic tiles.",
      it: "Bagno con doccia in vetro e rivestimento in ceramica geometrica.",
    },
    caption: {
      en: "Detail of the shower tiles.",
      it: "Dettaglio del rivestimento della doccia.",
    },
    placements: ["gallery"],
  },
  {
    id: "corridor-mosaic",
    file: "08-corridor-mosaic.jpg",
    role: "atmosphere",
    objectPosition: "50% 50%",
    width: 2268,
    height: 4032,
    alt: {
      en: "Corridor with a terracotta floor, coloured mosaics along the walls and stairs at the far end.",
      it: "Corridoio con pavimento in cotto, mosaici colorati lungo le pareti e scale sul fondo.",
    },
    caption: {
      en: "Mosaic along an interior passageway.",
      it: "Il mosaico lungo un percorso interno.",
    },
    placements: ["heritage", "gallery", "home-intro"],
  },
  {
    id: "sea-rocks-buoys",
    file: "09-sea-rocks-buoys.jpg",
    role: "sea-landscape",
    objectPosition: "50% 45%",
    width: 5951,
    height: 3967,
    alt: {
      en: "Rock formations along the shore and buoys on the water, lit by low sunlight.",
      it: "Scogli a mare e boe sull'acqua, illuminati dalla luce del sole basso.",
    },
    caption: {
      en: "The rocks by the water.",
      it: "Gli scogli a mare.",
    },
    placements: ["location", "heritage", "gallery", "home-location"],
  },
  {
    id: "exterior-pines-stream",
    file: "10-exterior-pines-stream.jpg",
    role: "architecture",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "White buildings among pines, with outdoor spaces and a wooden boat.",
      it: "Edifici bianchi tra i pini, con spazi all’aperto e una barca in legno.",
    },
    caption: {
      en: "Buildings among the pines.",
      it: "Gli edifici tra i pini.",
    },
    placements: ["property", "location", "gallery"],
  },
  {
    id: "bathroom-navy-geometric",
    file: "11-bathroom-navy-geometric.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bathroom with a blue floor and a glass shower lined with blue and white geometric tiles.",
      it: "Bagno con pavimento blu e doccia in vetro rivestita in ceramica geometrica blu e bianca.",
    },
    caption: {
      en: "Blue flooring and geometric ceramic.",
      it: "Pavimento blu e ceramica geometrica.",
    },
    placements: ["gallery"],
  },
  {
    id: "kitchen-dining-majolica",
    file: "12-kitchen-dining-majolica.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    width: 2737,
    height: 3829,
    alt: {
      en: "Kitchen and dining area with floral maiolica flooring, a wooden table and blue tiles.",
      it: "Cucina e zona pranzo con pavimento in maiolica floreale, tavolo in legno e rivestimento blu.",
    },
    caption: {
      en: "Maiolica in the kitchen and dining area.",
      it: "La maiolica nella cucina e nella zona pranzo.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "corridor-unit-doors",
    file: "13-corridor-unit-doors.jpg",
    role: "atmosphere",
    objectPosition: "50% 50%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Landing with blue doors, a terracotta floor and mosaics along the walls.",
      it: "Pianerottolo con porte blu, pavimento in cotto e mosaici lungo le pareti.",
    },
    caption: {
      en: "Blue doors and mosaics along an interior passageway.",
      it: "Porte blu e mosaici lungo un percorso interno.",
    },
    placements: ["property", "heritage", "gallery"],
  },
  {
    id: "living-studio-daybed",
    file: "14-living-studio-daybed.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Open interior with a kitchen, dining table, daybed and ceramic floor.",
      it: "Ambiente aperto con cucina, tavolo da pranzo, letto-divano e pavimento in ceramica.",
    },
    caption: {
      en: "Kitchen, dining and sleeping areas in an open interior.",
      it: "Cucina, pranzo e zona notte in un ambiente aperto.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "terrace-wicker-sea",
    file: "15-terrace-wicker-sea.jpg",
    role: "terraces",
    objectPosition: "50% 35%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Terrace with woven chairs and a small table, overlooking the sea.",
      it: "Terrazza con poltrone intrecciate e tavolino, affacciata sul mare.",
    },
    caption: {
      en: "A view of the sea from the terrace.",
      it: "Un affaccio sul mare dalla terrazza.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "garden-night-terrace",
    file: "16-garden-night-terrace.jpg",
    role: "atmosphere",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Terraced garden in the evening, with lights among the trees and a stone path.",
      it: "Giardino terrazzato di sera, con luci fra gli alberi e un percorso in pietra.",
    },
    caption: {
      en: "The terraced garden in the evening.",
      it: "Il giardino terrazzato di sera.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "garden-night-pergola",
    file: "17-garden-night-pergola.jpg",
    role: "atmosphere",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Garden path with lights strung between the trees.",
      it: "Percorso in giardino, con luci sospese fra gli alberi.",
    },
    caption: {
      en: "An evening view of the garden path.",
      it: "Il percorso in giardino, di sera.",
    },
    placements: ["heritage", "gallery"],
  },
  {
    id: "living-teal-sofa",
    file: "18-living-teal-sofa.jpg",
    role: "interiors",
    objectPosition: "50% 50%",
    width: 4032,
    height: 3024,
    alt: {
      en: "Sitting room with a teal sofa, small table and patterned ceramic floor.",
      it: "Soggiorno con divano verde acqua, tavolino e pavimento in ceramica decorata.",
    },
    caption: {
      en: "A sitting room in the residential accommodation.",
      it: "Un soggiorno nelle unità residenziali.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "path-stairs-sea",
    file: "19-path-stairs-sea.jpg",
    role: "waterfront",
    objectPosition: "50% 45%",
    width: 2268,
    height: 4032,
    alt: {
      en: "Stone stairs among fig leaves and Mediterranean vegetation, with the sea beyond.",
      it: "Scala in pietra fra foglie di fico e vegetazione mediterranea, con il mare sul fondo.",
    },
    caption: {
      en: "The stairs towards the beach.",
      it: "Le scale verso la spiaggia.",
    },
    placements: ["location", "heritage", "gallery", "home-location"],
  },
  {
    id: "bedroom-vaulted-sea",
    file: "20-bedroom-vaulted-sea.jpg",
    role: "hospitality",
    objectPosition: "50% 45%",
    width: 2775,
    height: 3699,
    alt: {
      en: "Bedroom with a vaulted ceiling, purple bedspread and an opening towards a terrace.",
      it: "Camera con soffitto a volta, copriletto viola e apertura verso una terrazza.",
    },
    caption: {
      en: "A bedroom with a vaulted ceiling.",
      it: "Una camera con soffitto a volta.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom-view-pines",
    file: "21-bedroom-view-pines.jpg",
    role: "hospitality",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "View from the bed through an open terrace door, with pines and the sea beyond.",
      it: "Vista dal letto verso una porta aperta sulla terrazza, con i pini e il mare oltre.",
    },
    caption: {
      en: "A bedroom's outlook towards the pines and sea.",
      it: "L'affaccio di una camera verso i pini e il mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "living-vaulted-tv",
    file: "22-living-vaulted-tv.jpg",
    role: "interiors",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Sitting room with a vaulted ceiling, floral maiolica floor, grey sofa and television.",
      it: "Soggiorno con soffitto a volta, pavimento in maiolica floreale, divano grigio e televisore.",
    },
    caption: {
      en: "A vaulted sitting room with maiolica flooring.",
      it: "Un soggiorno a volta, con pavimento in maiolica.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bathroom-vessel-shower",
    file: "23-bathroom-vessel-shower.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bathroom with a vessel basin and a glass shower lined with geometric tiles.",
      it: "Bagno con lavabo a bacinella e doccia in vetro rivestita in ceramica geometrica.",
    },
    caption: {
      en: "A bathroom with geometric tiling.",
      it: "Un bagno con rivestimento geometrico.",
    },
    placements: ["gallery"],
  },
  {
    id: "balcony-arch-beach",
    file: "24-balcony-arch-beach.jpg",
    role: "terraces",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Balcony beneath a white arch, with a mosaic table and views over the beach and sea.",
      it: "Balcone sotto un arco bianco, con tavolino a mosaico e vista sulla spiaggia e sul mare.",
    },
    caption: {
      en: "The beach seen from the arched balcony.",
      it: "La spiaggia vista dal balcone ad arco.",
    },
    placements: ["home-intro", "spaces", "gallery", "home-gallery"],
  },
  {
    id: "living-sea-view",
    file: "25-living-sea-view.jpg",
    role: "interiors",
    objectPosition: "50% 45%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Living room with a kitchen and dining area, patterned floor and doors open towards the sea.",
      it: "Soggiorno con cucina e zona pranzo, pavimento decorato e porte aperte verso il mare.",
    },
    caption: {
      en: "A residential interior with a sea view.",
      it: "Un ambiente residenziale con affaccio sul mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "bedroom-balcony-sea",
    file: "26-bedroom-balcony-sea.jpg",
    role: "hospitality",
    objectPosition: "50% 40%",
    width: 3024,
    height: 4032,
    alt: {
      en: "Bedroom with doors open onto a terracotta terrace, with boats and the sea beyond.",
      it: "Camera con porte aperte su una terrazza in cotto, con barche e mare sullo sfondo.",
    },
    caption: {
      en: "A bedroom overlooking the terrace and sea.",
      it: "Una camera affacciata sulla terrazza e sul mare.",
    },
    placements: ["spaces", "gallery"],
  },
  {
    id: "terrace-casa-4-loungers",
    file: "terrazzo_casa_4-01.jpg",
    role: "terraces",
    objectPosition: "48% 45%",
    width: 6074,
    height: 4049,
    alt: {
      en: "Wide terrace with loungers and seating, overlooking boats on the sea.",
      it: "Ampia terrazza con lettini e sedute, affacciata sul mare con le barche.",
    },
    caption: {
      en: "The open terrace overlooking the sea.",
      it: "La terrazza aperta sul mare.",
    },
    placements: ["home-gallery", "spaces", "gallery"],
  },
  {
    id: "terrace-casa-4-panorama",
    file: "terrazzo_casa_4-02.jpg",
    role: "terraces",
    objectPosition: "52% 42%",
    width: 6240,
    height: 4160,
    alt: {
      en: "Panoramic terrace framed by pines, with seating and a wide view of the sea.",
      it: "Terrazza panoramica incorniciata dai pini, con sedute e un ampio affaccio sul mare.",
    },
    caption: {
      en: "The sea beyond the terrace and pines.",
      it: "Il mare oltre la terrazza e i pini.",
    },
    placements: ["home-gallery", "spaces", "gallery"],
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
  "terrace-casa-4-loungers": ["terrazzo_casa_4-01", "casa_4-01"],
  "terrace-casa-4-panorama": ["terrazzo_casa_4-02", "casa_4-02"],
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
      en: `Additional photograph of the Marina d’Albori property (${stem}).`,
      it: `Fotografia aggiuntiva della proprietà Marina d’Albori (${stem}).`,
    },
    caption: {
      en: "Additional view of the property.",
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

export function imageById(id: string): ResolvedImage | undefined {
  return resolveImages().find((image) => image.id === id);
}

export function imagesFor(
  placement: ImageSpec["placements"][number],
): ResolvedImage[] {
  if (placement === "gallery") return imagesByIds(brochurePhotoIds);
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
