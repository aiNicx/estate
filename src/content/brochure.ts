import { property, formatArea, type Locale } from "./property.ts";

/** The brochure has one reading order, shared by both languages. */
export const brochureSections = [
  { id: "proprieta", label: { it: "Proprietà", en: "Property" } },
  { id: "spazi", label: { it: "Spazi", en: "Spaces" } },
  { id: "storia", label: { it: "Storia", en: "History" } },
  { id: "posizione", label: { it: "Posizione", en: "Location" } },
  { id: "informazioni", label: { it: "Richieste", en: "Enquiries" } },
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
  history: ["lemon-garden", "corridor-mosaic"],
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
      imageKicker: "Proprietà fronte mare in vendita",
      imageLine: `${property.units.total} unità indipendenti · Terrazze sul mare`,
    },
    hero: {
      place: "Vietri sul Mare · Costiera Amalfitana",
      title: "Marina d’Albori",
      lead: "L’unico edificio sulla spiaggia di Marina d’Albori: sette unità indipendenti, terrazze sul mare e un limoneto, in vendita come un’unica proprietà.",
      action: "La proprietà",
      enquire: "Richiedi informazioni",
      status: "Vendita riservata · Direttamente dal proprietario",
    },
    property: {
      kicker: "01 / La proprietà",
      title: "Un complesso di unità indipendenti",
      intro: "Sulla spiaggia di Marina d’Albori, nel comune di Vietri sul Mare, la proprietà è un unico blocco edificato sulla roccia, a filo d’acqua. Nessun altro edificio affaccia su questa spiaggia. Al suo interno riunisce unità residenziali e spazi commerciali. La vendita riguarda l’intera proprietà, comprese le aree esterne e il limoneto.",
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
      photoHint: "Selezionare una fotografia per vederla per intero.",
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
      mill: `${property.heritage.paperMillNote.it} La cartiera si inseriva in una tradizione produttiva diffusa lungo la Costiera: la lavorazione della carta era presente non solo ad Amalfi, ma anche nel territorio di Vietri sul Mare, con diversi opifici.`,
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
      land: `Dalla strada statale si scende a piedi per una scalinata di circa ${property.landAccess.stepCount} gradini, tipica della Costiera, fino all’edificio e alla spiaggia.`,
      seaTitle: "Il pontile stagionale",
      sea: `L’arrivo via mare avviene al pontile, oggetto di una concessione stagionale associata alla proprietà. In barca si arriva in circa ${property.seaApproach.indicativeMinutes.salernoHarbour} minuti dal porto di Salerno, ${property.seaApproach.indicativeMinutes.vietri} minuti da Vietri e ${property.seaApproach.indicativeMinutes.cetara} minuti da Cetara.`,
      connectionsTitle: "Stazione e aeroporti",
      rail: "Stazione ferroviaria di Salerno",
      salernoAirport: "Aeroporto di Salerno Costa d’Amalfi",
      naplesAirport: "Aeroporto di Napoli Capodichino",
      distanceNote: "In linea d’aria dalla proprietà; non corrispondono ai percorsi stradali.",
    },
    information: {
      kicker: "05 / Richieste",
      title: "Documenti, condizioni e visita",
      intro: "La vendita è seguita direttamente dal proprietario. Per ricevere la documentazione e le condizioni di vendita, o per concordare un sopralluogo, è sufficiente scrivere via email: il proprietario risponde personalmente.",
      topics: [
        {
          title: "La proprietà e i documenti",
          text: "Sono disponibili planimetrie e visure catastali della proprietà, inviate direttamente dal proprietario su richiesta.",
          action: "Richiedi planimetrie e visure",
          subject: "Marina d’Albori · Planimetrie e visure catastali",
          body: "Buongiorno,\n\nvorrei ricevere le planimetrie e le visure catastali della proprietà di Marina d’Albori.\n\nCordiali saluti,\n",
        },
        {
          title: "La concessione e le condizioni",
          text: "Sono disponibili i documenti della concessione stagionale del pontile e le condizioni di vendita, condivisi su richiesta.",
          action: "Richiedi concessione e condizioni",
          subject: "Marina d’Albori · Concessione e condizioni di vendita",
          body: "Buongiorno,\n\nvorrei ricevere i documenti della concessione stagionale del pontile e le condizioni di vendita della proprietà di Marina d’Albori.\n\nCordiali saluti,\n",
        },
        {
          title: "Il sopralluogo",
          text: "Il sopralluogo si concorda direttamente con il proprietario, per visitare gli interni, le terrazze e le aree esterne.",
          action: "Proponi un sopralluogo",
          subject: "Marina d’Albori · Richiesta di sopralluogo",
          body: "Buongiorno,\n\nvorrei concordare un sopralluogo della proprietà di Marina d’Albori.\n\nDate possibili:\n\nCordiali saluti,\n",
        },
      ],
      contactLabel: "Scrivere al proprietario",
      contactSubject: "Marina d’Albori · Richiesta di informazioni",
      contactBody: "Buongiorno,\n\nscrivo in merito alla proprietà di Marina d’Albori.\n\nCordiali saluti,\n",
      replyNote: "Oppure rispondere direttamente all’email con cui si è ricevuta questa presentazione.",
      replyOnly: "Per richiedere documenti o un sopralluogo è sufficiente rispondere all’email con cui si è ricevuta questa presentazione.",
      closing: "Le richieste sono trattate con riservatezza. I documenti vengono condivisi via email e non sono pubblicati su questo sito.",
      back: "Torna all’inizio",
    },
    footer: "Vendita riservata · Marina d’Albori, Vietri sul Mare",
  },
  en: {
    meta: {
      title: "Marina d’Albori · Waterfront property in Vietri sul Mare",
      description: `Property on the beach at Marina d’Albori, Vietri sul Mare: ${property.units.total} independent units, approximately ${property.internalArea.squareMetres} m² of internal space and approximately ${property.terraces.squareMetres} m² of terraces, with a lemon garden.`,
      siteName: property.shortName,
      imageKicker: "Waterfront property for sale",
      imageLine: `${property.units.total} independent units · Sea-facing terraces`,
    },
    hero: {
      place: "Vietri sul Mare · Amalfi Coast",
      title: "Marina d’Albori",
      lead: "The only building on the beach at Marina d’Albori: seven independent units, terraces over the sea and a lemon garden, offered for sale as a whole.",
      action: "The property",
      enquire: "Request information",
      status: "Private sale · Directly from the owner",
    },
    property: {
      kicker: "01 / The property",
      title: "A collection of independent units",
      intro: "On the beach at Marina d’Albori, in the municipality of Vietri sul Mare, the property is a single building set on the rock, at the water’s edge. No other buildings stand on this beach. It brings together residential units and commercial spaces. The property is offered for sale as a whole, including the outdoor areas and lemon garden.",
      internal: "Internal floor area",
      terraces: "Terraces",
      units: "Independent units",
      residential: "Residential units",
      commercial: "Commercial units",
      useTitle: "Current use",
      use: "Some residential units are used as holiday accommodation. A restaurant also operates on the property.",
      possibilitiesTitle: "Residential, hospitality and mixed use",
      scenarios: [
        { title: "Private residence", text: "The independent residential units lend themselves to family use, with separate quarters for the owners and their guests." },
        { title: "Hospitality and dining", text: "Holiday accommodation and a restaurant already give the property an established hospitality use, alongside the residential units." },
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
      mill: `${property.heritage.paperMillNote.en} The mill formed part of a wider papermaking tradition along the coast, with several mills in the territory of Vietri sul Mare as well as in Amalfi.`,
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
      land: `From the coastal road, access is on foot down a staircase of about ${property.landAccess.stepCount} steps to the building and the beach, a typical approach on the Amalfi Coast.`,
      seaTitle: "The seasonal pontoon",
      sea: `Arrival by sea is via the pontoon, covered by a seasonal concession associated with the property. By boat, the journey takes about ${property.seaApproach.indicativeMinutes.salernoHarbour} minutes from Salerno harbour, ${property.seaApproach.indicativeMinutes.vietri} minutes from Vietri and ${property.seaApproach.indicativeMinutes.cetara} minutes from Cetara.`,
      connectionsTitle: "Railway station and airports",
      rail: "Salerno railway station",
      salernoAirport: "Salerno Costa d’Amalfi Airport",
      naplesAirport: "Naples Capodichino Airport",
      distanceNote: "Straight-line distances from the property; these are not road distances.",
    },
    information: {
      kicker: "05 / Enquiries",
      title: "Documents, terms and viewings",
      intro: "The sale is handled directly by the owner. To receive the documents and terms of sale, or to arrange a viewing, simply write by email: the owner replies personally.",
      topics: [
        {
          title: "The property and its documents",
          text: "Floor plans and cadastral records are available and are sent directly by the owner on request.",
          action: "Request plans and records",
          subject: "Marina d’Albori · Floor plans and cadastral records",
          body: "Good morning,\n\nI would like to receive the floor plans and cadastral records of the property at Marina d’Albori.\n\nKind regards,\n",
        },
        {
          title: "The concession and sale terms",
          text: "Documents relating to the seasonal pontoon concession and the terms of sale are available on request.",
          action: "Request concession and terms",
          subject: "Marina d’Albori · Concession documents and sale terms",
          body: "Good morning,\n\nI would like to receive the documents relating to the seasonal pontoon concession and the terms of sale of the property at Marina d’Albori.\n\nKind regards,\n",
        },
        {
          title: "The viewing",
          text: "Viewings are arranged directly with the owner and cover the interiors, terraces and outdoor areas.",
          action: "Propose a viewing",
          subject: "Marina d’Albori · Viewing request",
          body: "Good morning,\n\nI would like to arrange a viewing of the property at Marina d’Albori.\n\nPossible dates:\n\nKind regards,\n",
        },
      ],
      contactLabel: "Write to the owner",
      contactSubject: "Marina d’Albori · Request for information",
      contactBody: "Good morning,\n\nI am writing about the property at Marina d’Albori.\n\nKind regards,\n",
      replyNote: "Or reply directly to the email in which you received this presentation.",
      replyOnly: "To request documents or a viewing, simply reply to the email in which you received this presentation.",
      closing: "Requests are handled in confidence. Documents are shared by email and are not published on this site.",
      back: "Back to the top",
    },
    footer: "Private sale · Marina d’Albori, Vietri sul Mare",
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
