import { property, formatArea, type Locale } from "./property.ts";

/** The brochure has one reading order, shared by both languages. */
export const brochureSections = [
  { id: "proprieta", label: { it: "Proprietà", en: "Property" } },
  { id: "spazi", label: { it: "Spazi", en: "Spaces" } },
  { id: "storia", label: { it: "Storia", en: "History" } },
  { id: "posizione", label: { it: "Posizione", en: "Location" } },
  { id: "informazioni", label: { it: "Informazioni", en: "Information" } },
] as const;
export type BrochureSectionId = (typeof brochureSections)[number]["id"];

export function brochurePath(locale: Locale, section: BrochureSectionId) {
  return `/${locale}#${section}`;
}

export const legacyBrochureSections = {
  "the-property": "proprieta",
  investment: "proprieta",
  spaces: "spazi",
  gallery: "spazi",
  heritage: "storia",
  location: "posizione",
  request: "informazioni",
} as const satisfies Record<string, BrochureSectionId>;

export const brochurePhotoGroups = [
  { id: "terrazze", imageIds: ["terrace-casa-4-panorama", "terrace-casa-4-loungers", "balcony-arch-beach"] },
  { id: "interni", imageIds: ["living-vaulted-tv", "living-sea-view"] },
  { id: "camere", imageIds: ["bedroom-view-pines", "bedroom-balcony-sea"] },
] as const;

/** Page photographs, in reading order; shared with structured data. */
export const brochurePhotos = {
  hero: "hero-cove-aerial",
  property: "architecture-hillside-aerial",
  history: ["corridor-mosaic", "kitchen-dining-majolica"],
  access: "path-stairs-sea",
} as const;
export const brochurePhotoIds = [
  brochurePhotos.hero, brochurePhotos.property,
  ...brochurePhotoGroups.flatMap((group) => [...group.imageIds]),
  ...brochurePhotos.history, brochurePhotos.access,
] as const;

const copy = {
  it: {
    meta: {
      title: "Marina d’Albori · Proprietà fronte mare a Vietri sul Mare",
      description: `Proprietà sulla spiaggia di Marina d’Albori, a Vietri sul Mare: ${property.units.total} unità indipendenti, circa ${property.internalArea.squareMetres} m² interni e circa ${property.terraces.squareMetres} m² di terrazze, con un limoneto.`,
      siteName: property.shortName,
      imageKicker: "Proprietà fronte mare",
      imageLine: `${property.units.total} unità indipendenti · Terrazze sul mare`,
    },
    hero: {
      place: "Vietri sul Mare · Costiera Amalfitana",
      title: "Marina d’Albori",
      lead: "Una proprietà sulla spiaggia di Marina d’Albori, con terrazze sul mare, un limoneto e unità indipendenti.",
      action: "La proprietà",
    },
    property: {
      kicker: "01 / La proprietà",
      title: "Un complesso di unità indipendenti",
      intro: "La proprietà comprende gli unici edifici sulla spiaggia di Marina d’Albori, nel comune di Vietri sul Mare. Disposti lungo il versante fino al mare, riuniscono unità residenziali e spazi commerciali in un unico complesso.",
      internal: "Superficie interna",
      terraces: "Terrazze",
      units: "Unità indipendenti",
      residential: "Unità residenziali",
      commercial: "Unità commerciali",
      useTitle: "L’uso attuale",
      use: "Parte delle unità residenziali è destinata ad alloggi per vacanze. Nella proprietà è inoltre presente un’attività di ristorazione.",
      possibilitiesTitle: "Residenza, accoglienza, uso misto",
      scenarios: [
        { title: "Residenza", text: "Le unità residenziali indipendenti si prestano a un uso familiare, con alloggi distinti per i proprietari e i loro ospiti." },
        { title: "Accoglienza e ristorazione", text: "La presenza di alloggi per vacanze e di un’attività di ristorazione dà alla proprietà anche una dimensione ricettiva, già parte degli usi attuali." },
        { title: "Uso misto", text: "L’articolazione in unità autonome consente di riservare alcuni spazi all’uso personale e altri all’accoglienza, mantenendo distinti gli ambienti all’interno dello stesso complesso." },
      ],
      next: "Documenti, condizioni e visita",
    },
    spaces: {
      kicker: "02 / Gli spazi",
      title: "Le terrazze e gli ambienti interni",
      intro: "Le fotografie mostrano una selezione degli spazi della proprietà: terrazze, soggiorni e camere di unità diverse.",
      photoHint: "Seleziona una fotografia per vederla per intero.",
      groups: {
        terrazze: { title: "Le terrazze sul mare", description: "La terrazza aperta, con lettini e sedute, e il balcone coperto ad arco offrono affacci diversi sulla spiaggia e sul mare." },
        interni: { title: "I soggiorni", description: "Gli ambienti hanno forme e dimensioni diverse. Nelle fotografie si vedono soffitti a volta, pavimenti in ceramica e aperture verso il mare." },
        camere: { title: "Le camere", description: "Due camere di unità diverse: una affacciata verso i pini e il mare, l’altra aperta su una terrazza in cotto." },
      },
    },
    history: {
      kicker: "03 / La storia del luogo",
      title: "La cartiera, il limoneto, le ceramiche",
      lead: "La spiaggia di Marina d’Albori si trova nel comune di Vietri sul Mare, all’estremità orientale della Costiera Amalfitana. La cartiera, il limoneto e le ceramiche legano la proprietà alla storia produttiva e al paesaggio di questa costa.",
      millTitle: "La cartiera del",
      mill: `La proprietà è la cartiera del ${property.heritage.paperMillYear} a Marina d’Albori. Nel piano sotterraneo restano le vasche di macerazione. Faceva parte di una tradizione produttiva diffusa lungo la Costiera: la lavorazione della carta era presente non solo ad Amalfi, ma anche nel territorio di Vietri sul Mare, con diversi opifici.`,
      gardenTitle: "Il limoneto",
      garden: `Sul versante cresce un piccolo limoneto: circa ${property.lemonGarden.treeCount} alberi, di circa ${property.lemonGarden.treeAgeYears} anni. Accanto agli spazi abitati, questa presenza agricola richiama la coltivazione dei limoni che caratterizza il paesaggio della Costiera.`,
      ceramicsTitle: "Le ceramiche",
      ceramics: "La tradizione ceramica di Vietri sul Mare trova un richiamo negli interni della proprietà. Pavimenti in maiolica, rivestimenti decorati e mosaici accompagnano soggiorni, cucine e passaggi interni, con motivi e colori diversi da un ambiente all’altro.",
    },
    location: {
      kicker: "04 / La posizione",
      title: "A Marina d’Albori, nel comune di Vietri",
      intro: "Marina d’Albori si trova lungo il tratto di costa tra il centro di Vietri sul Mare e Cetara. A est, Salerno offre i collegamenti ferroviari e i servizi della città; verso ovest, la costa prosegue fino ad Amalfi.",
      mapAction: "Apri la posizione su Google Maps",
      landTitle: "L’arrivo da terra",
      land: `Dalla strada statale si scende a piedi per una scalinata di circa ${property.landAccess.stepCount} gradini, tipica della Costiera, fino agli edifici e alla spiaggia.`,
      seaTitle: "Il pontile stagionale",
      sea: `L’arrivo via mare avviene al pontile, oggetto di una concessione stagionale associata alla proprietà. Tempi di navigazione: ${property.seaApproach.indicativeMinutes.salernoHarbour} minuti dal porto di Salerno, ${property.seaApproach.indicativeMinutes.vietri} minuti da Vietri e ${property.seaApproach.indicativeMinutes.cetara} minuti da Cetara.`,
      connectionsTitle: "Stazione e aeroporti",
      rail: "Stazione ferroviaria di Salerno",
      salernoAirport: "Aeroporto di Salerno Costa d’Amalfi",
      naplesAirport: "Aeroporto di Napoli Capodichino",
      distanceNote: "In linea d’aria dalla proprietà; non corrispondono ai percorsi stradali.",
    },
    information: {
      kicker: "05 / Informazioni",
      title: "Documenti, condizioni e visita",
      intro: "Questa presentazione è riservata. Per documenti, condizioni di vendita e un sopralluogo, rispondi all’email con cui hai ricevuto il link.",
      topics: [
        { title: "La proprietà e i documenti", text: "Definizione del perimetro di vendita, planimetrie, ripartizione delle unità e documentazione tecnica, urbanistica e catastale per la due diligence." },
        { title: "Le attività e le condizioni", text: "Usi attuali, titoli delle attività, termini della concessione stagionale del pontile e condizioni di vendita." },
        { title: "Il sopralluogo", text: "Visita degli interni e delle terrazze, con il percorso a scale dalla strada, per conoscere la disposizione degli spazi e il rapporto con la spiaggia." },
      ],
      closing: "La conversazione prosegue in forma riservata, via email.",
      back: "Torna all’inizio",
    },
    footer: "Presentazione della proprietà · Marina d’Albori, Vietri sul Mare",
  },
  en: {
    meta: {
      title: "Marina d’Albori · Waterfront property in Vietri sul Mare",
      description: `Property on the beach at Marina d’Albori, Vietri sul Mare: ${property.units.total} independent units, approximately ${property.internalArea.squareMetres} m² of internal space and approximately ${property.terraces.squareMetres} m² of terraces, with a lemon garden.`,
      siteName: property.shortName,
      imageKicker: "Waterfront property",
      imageLine: `${property.units.total} independent units · Sea-facing terraces`,
    },
    hero: {
      place: "Vietri sul Mare · Amalfi Coast",
      title: "Marina d’Albori",
      lead: "A property on the beach at Marina d’Albori, with sea-facing terraces, a lemon garden and independent units.",
      action: "The property",
    },
    property: {
      kicker: "01 / The property",
      title: "A collection of independent units",
      intro: "The property comprises the only buildings on the beach at Marina d’Albori, in the municipality of Vietri sul Mare. Set along the hillside down to the sea, they bring together residential units and commercial spaces within a single property.",
      internal: "Internal floor area",
      terraces: "Terraces",
      units: "Independent units",
      residential: "Residential units",
      commercial: "Commercial units",
      useTitle: "Current use",
      use: "Some residential units are used as holiday accommodation. A restaurant also operates on the property.",
      possibilitiesTitle: "Residential, hospitality and mixed use",
      scenarios: [
        { title: "Residential use", text: "The independent residential units lend themselves to family use, with separate accommodation for owners and their guests." },
        { title: "Hospitality and dining", text: "Holiday accommodation and a restaurant give the property an established hospitality use alongside its residential accommodation." },
        { title: "Mixed use", text: "The separate units allow some spaces to be set aside for personal use and others for guest accommodation, keeping them distinct within the same property." },
      ],
      next: "Documents, terms and viewings",
    },
    spaces: {
      kicker: "02 / The spaces",
      title: "The terraces and interiors",
      intro: "The photographs show a selection of spaces across the property: terraces, living rooms and bedrooms in different units.",
      photoHint: "Select a photograph to see the full image.",
      groups: {
        terrazze: { title: "Terraces facing the sea", description: "The open terrace, with loungers and seating, and the covered arched balcony offer different views of the beach and sea." },
        interni: { title: "The living rooms", description: "The rooms vary in shape and size. The photographs show vaulted ceilings, ceramic floors and openings towards the sea." },
        camere: { title: "The bedrooms", description: "Two bedrooms in different units: one looking towards the pines and sea, the other opening onto a terracotta terrace." },
      },
    },
    history: {
      kicker: "03 / Local heritage",
      title: "The paper mill, lemon garden and ceramics",
      lead: "The beach at Marina d’Albori lies in the municipality of Vietri sul Mare, at the eastern end of the Amalfi Coast. The paper mill, lemon garden and ceramics connect the property to the history of local industry, agriculture and craft.",
      millTitle: "The paper mill —",
      mill: `The property is the paper mill of ${property.heritage.paperMillYear} at Marina d’Albori. Remains of the maceration tanks survive in the basement. It formed part of a wider papermaking tradition along the coast, with several mills in the territory of Vietri sul Mare as well as in Amalfi.`,
      gardenTitle: "The lemon garden",
      garden: `A small lemon garden grows on the hillside: around ${property.lemonGarden.treeCount} trees, around ${property.lemonGarden.treeAgeYears} years old. Alongside the living spaces, it reflects the lemon cultivation that is characteristic of the Amalfi Coast’s landscape.`,
      ceramicsTitle: "The ceramics",
      ceramics: "The interiors echo Vietri sul Mare’s ceramic tradition. Maiolica floors, decorative tiles and mosaics feature in living rooms, kitchens and passageways, with patterns and colours that vary from one space to the next.",
    },
    location: {
      kicker: "04 / The location",
      title: "Marina d’Albori, in Vietri sul Mare",
      intro: "Marina d’Albori lies on the stretch of coast between the town of Vietri sul Mare and Cetara. To the east, Salerno provides rail connections and city services; to the west, the coast continues towards Amalfi.",
      mapAction: "Open the location in Google Maps",
      landTitle: "Arriving by land",
      land: `From the coastal road, access is on foot down a staircase of about ${property.landAccess.stepCount} steps to the buildings and the beach, a typical approach on the Amalfi Coast.`,
      seaTitle: "The seasonal pontoon",
      sea: `Arrival by sea is via the pontoon, covered by a seasonal concession associated with the property. Boat journey times: ${property.seaApproach.indicativeMinutes.salernoHarbour} minutes from Salerno harbour, ${property.seaApproach.indicativeMinutes.vietri} minutes from Vietri and ${property.seaApproach.indicativeMinutes.cetara} minutes from Cetara.`,
      connectionsTitle: "Railway station and airports",
      rail: "Salerno railway station",
      salernoAirport: "Salerno Costa d’Amalfi Airport",
      naplesAirport: "Naples Capodichino Airport",
      distanceNote: "Straight-line distances from the property; these are not road distances.",
    },
    information: {
      kicker: "05 / Information",
      title: "Documents, terms and viewings",
      intro: "This presentation is private. For documents, sale terms and a viewing, reply to the email in which you received this link.",
      topics: [
        { title: "The property and its documents", text: "Confirmation of what is included in the sale, floor plans, the breakdown of units, and technical, planning and cadastral documentation for due diligence." },
        { title: "The businesses and sale terms", text: "Current uses, operating licences, the terms of the seasonal pontoon concession and the conditions of sale." },
        { title: "The viewing", text: "A visit to the interiors and terraces, including the steps from the road, to understand the layout and the property’s relationship with the beach." },
      ],
      closing: "The conversation continues in confidence by email.",
      back: "Back to the top",
    },
    footer: "Property presentation · Marina d’Albori, Vietri sul Mare",
  },
} as const;

export function brochureCopy(locale: Locale) { return copy[locale]; }

export function brochureMetrics(locale: Locale) {
  const labels = copy[locale].property;
  return [
    { label: labels.internal, value: formatArea(locale, property.internalArea.squareMetres, property.internalArea.qualifier) },
    { label: labels.terraces, value: formatArea(locale, property.terraces.squareMetres, property.terraces.qualifier) },
    { label: labels.units, value: String(property.units.total) },
  ];
}
