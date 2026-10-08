import { property, formatArea, type Locale } from "./property.ts";

/** The brochure has one reading order, shared by both languages. */
export const brochureSections = [
  { id: "proprieta", label: { it: "Proprietà", en: "Property" } },
  { id: "spazi", label: { it: "Spazi", en: "Spaces" } },
  { id: "storia", label: { it: "Storia", en: "History" } },
  { id: "posizione", label: { it: "Posizione", en: "Location" } },
  { id: "informazioni", label: { it: "Informazioni", en: "Enquiries" } },
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
} as const satisfies Record<string, BrochureSectionId>;

export const brochurePhotoGroups = [
  { id: "terrazze", imageIds: ["terrace-casa-4-panorama", "terrace-casa-4-loungers", "balcony-arch-beach"] },
  { id: "interni", imageIds: ["living-vaulted-tv", "living-sea-view"] },
  { id: "camere", imageIds: ["bedroom-view-pines", "bedroom-balcony-sea"] },
] as const;

const copy = {
  it: {
    hero: {
      place: "Vietri sul Mare · Costiera Amalfitana",
      title: "Marina d’Albori",
      lead: "Una proprietà affacciata sulla cala, con terrazze sul mare, un limoneto e unità indipendenti.",
      action: "Scopri la proprietà",
      caption: "La cala di Marina d’Albori e gli edifici lungo il versante.",
    },
    property: {
      kicker: "01 / La proprietà",
      title: "Gli edifici e la loro composizione",
      intro: "La proprietà si trova nel comune di Vietri sul Mare. Gli edifici seguono il pendio fino alla cala e comprendono unità residenziali e locali commerciali.",
      internal: "Superficie interna",
      terraces: "Terrazze",
      units: "Unità indipendenti",
      residential: "Unità residenziali",
      commercial: "Unità commerciali",
      areaNote: "Le superfici riportate sono indicative.",
      useTitle: "L’uso attuale",
      use: "Alcune unità residenziali sono utilizzate come alloggi per vacanze. Nella proprietà è presente anche un’attività di ristorazione. La distribuzione degli ambienti e la situazione delle attività sono aspetti da approfondire nel contatto diretto.",
    },
    spaces: {
      kicker: "02 / Gli spazi",
      title: "Le terrazze e gli ambienti interni",
      intro: "Le fotografie mostrano una selezione degli spazi della proprietà: terrazze, soggiorni e camere di unità diverse.",
      photoHint: "Seleziona una fotografia per vederla per intero.",
      groups: {
        terrazze: { title: "Le terrazze sul mare", description: "Spazi aperti affacciati sulla cala, con zone per sedersi, pranzare e stare all’aperto. Le immagini mostrano sia la terrazza più ampia sia un balcone coperto ad arco." },
        interni: { title: "I soggiorni", description: "Gli ambienti hanno forme e dimensioni diverse. Nelle fotografie si vedono soffitti a volta, pavimenti in ceramica e aperture verso il mare." },
        camere: { title: "Le camere", description: "Due degli ambienti destinati al riposo: una camera con vista tra i pini e una con accesso al balcone sul mare." },
      },
    },
    history: {
      kicker: "03 / La storia del luogo",
      title: "La cartiera, il limoneto, le ceramiche",
      millTitle: "La cartiera del",
      mill: "Una cartiera storica è legata alla proprietà.",
      gardenTitle: "Il limoneto",
      garden: `Il giardino conserva circa ${property.lemonGarden.treeCount} alberi di limone, con un’età indicativa di ${property.lemonGarden.treeAgeYears} anni.`,
      ceramicsTitle: "Le ceramiche negli interni",
      ceramics: "Pavimenti decorati, rivestimenti e dettagli in maiolica compaiono in più ambienti. Le fotografie ne mostrano i colori e i disegni, diversi da un’unità all’altra.",
    },
    location: {
      kicker: "04 / La posizione",
      title: "A Marina d’Albori, nel comune di Vietri",
      intro: "La cala si trova sul tratto di costa tra Vietri sul Mare e Cetara, all’estremità orientale della Costiera Amalfitana. Salerno è il riferimento vicino per la stazione ferroviaria e i servizi della città.",
      mapAction: "Apri la posizione su Google Maps",
      landTitle: "L’arrivo da terra",
      land: "Dalla strada si scende a piedi lungo un percorso a gradini verso gli edifici e il mare. Il percorso di accesso è uno degli aspetti da valutare durante la visita.",
      seaTitle: "Il pontile stagionale",
      sea: "Alla proprietà è associata una concessione stagionale per il pontile. Condizioni, durata e modalità d’uso vanno approfondite nella documentazione.",
      connectionsTitle: "I riferimenti per il viaggio",
      rail: "Stazione ferroviaria di Salerno",
      salernoAirport: "Aeroporto di Salerno Costa d’Amalfi",
      naplesAirport: "Aeroporto di Napoli Capodichino",
      distanceNote: "Distanze indicative in linea d’aria dalla proprietà; non corrispondono ai percorsi stradali.",
    },
    information: {
      kicker: "05 / Per approfondire",
      title: "Informazioni e visite",
      intro: "Se hai ricevuto questa presentazione via email, puoi rispondere allo stesso messaggio per chiedere informazioni o concordare una visita.",
      topics: [
        { title: "Gli immobili", text: "Planimetrie, distribuzione delle unità e documentazione tecnica." },
        { title: "Le attività e la vendita", text: "Situazione degli usi attuali, concessione del pontile e condizioni di vendita." },
        { title: "La visita", text: "Accesso alla proprietà e organizzazione del sopralluogo." },
      ],
      closing: "Nel messaggio indica quali aspetti desideri approfondire e, se vuoi visitare la proprietà, il periodo in cui potresti venire.",
      back: "Torna all’inizio",
    },
    footer: "Presentazione della proprietà · Marina d’Albori, Vietri sul Mare",
  },
  en: {
    hero: {
      place: "Vietri sul Mare · Amalfi Coast",
      title: "Marina d’Albori",
      lead: "A property overlooking the cove, with sea-facing terraces, a lemon garden and independent units.",
      action: "Explore the property",
      caption: "The cove at Marina d’Albori and the buildings on the hillside.",
    },
    property: {
      kicker: "01 / The property",
      title: "The buildings and their layout",
      intro: "The property is in the municipality of Vietri sul Mare. Its buildings follow the hillside down to the cove and comprise residential and commercial units.",
      internal: "Internal floor area",
      terraces: "Terraces",
      units: "Independent units",
      residential: "Residential units",
      commercial: "Commercial units",
      areaNote: "The areas shown are approximate.",
      useTitle: "Current use",
      use: "Some residential units are used as holiday accommodation. There is also a restaurant business on the property. The layout of the buildings and the status of the businesses can be discussed directly.",
    },
    spaces: {
      kicker: "02 / The spaces",
      title: "The terraces and interiors",
      intro: "The photographs show a selection of spaces across the property: terraces, living rooms and bedrooms in different units.",
      photoHint: "Select a photograph to see the full image.",
      groups: {
        terrazze: { title: "The sea-facing terraces", description: "Outdoor spaces overlooking the cove, with areas for seating, dining and spending time outside. The photographs include the larger terrace and a covered, arched balcony." },
        interni: { title: "The living rooms", description: "The rooms vary in shape and size. The photographs show vaulted ceilings, ceramic floors and openings towards the sea." },
        camere: { title: "The bedrooms", description: "Two of the bedrooms: one with a view through the pine trees and another opening onto a balcony above the sea." },
      },
    },
    history: {
      kicker: "03 / The history of the place",
      title: "The paper mill, lemon garden and ceramics",
      millTitle: "The paper mill of",
      mill: "A historic paper mill is associated with the property.",
      gardenTitle: "The lemon garden",
      garden: `The garden has around ${property.lemonGarden.treeCount} lemon trees, approximately ${property.lemonGarden.treeAgeYears} years old.`,
      ceramicsTitle: "Ceramics in the interiors",
      ceramics: "Patterned floors, wall tiles and majolica details appear in several rooms. The photographs show their colours and designs, which vary from one unit to another.",
    },
    location: {
      kicker: "04 / The location",
      title: "Marina d’Albori, in Vietri sul Mare",
      intro: "The cove lies on the coast between Vietri sul Mare and Cetara, at the eastern end of the Amalfi Coast. Nearby Salerno provides the main railway station and city services.",
      mapAction: "Open the location in Google Maps",
      landTitle: "Arriving by land",
      land: "From road level, a stepped pedestrian path descends towards the buildings and the sea. The approach is one of the practical details to assess during a visit.",
      seaTitle: "The seasonal pontoon",
      sea: "A seasonal pontoon concession is associated with the property. Its terms, duration and conditions of use need to be reviewed in the documentation.",
      connectionsTitle: "Travel reference points",
      rail: "Salerno railway station",
      salernoAirport: "Salerno Costa d’Amalfi Airport",
      naplesAirport: "Naples Capodichino Airport",
      distanceNote: "Approximate straight-line distances from the property; these are not road distances.",
    },
    information: {
      kicker: "05 / Find out more",
      title: "Enquiries and visits",
      intro: "If you received this presentation by email, reply to that message to ask for further information or arrange a visit.",
      topics: [
        { title: "The buildings", text: "Floor plans, unit layout and technical documentation." },
        { title: "The businesses and the sale", text: "Current uses, the pontoon concession and sale terms." },
        { title: "A visit", text: "Access to the property and arrangements for a viewing." },
      ],
      closing: "Please mention what you would like to discuss and, if you wish to visit, when you could come.",
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
