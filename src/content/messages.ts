import type { BuyerType, Locale } from "./property.ts";
import type { RouteId } from "../lib/site.ts";

type Copy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    siteName: string;
  };
  brand: {
    kicker: string;
    wordmark: string;
    placeLine: string;
  };
  nav: Record<RouteId, string> & { privacy: string; menu: string; close: string };
  cta: {
    request: string;
    requestDetails: string;
    requestInvestment: string;
    privateDiscussion: string;
    documentation: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    geography: string[];
    scroll: string;
  };
  overview: {
    kicker: string;
    title: string;
    body: string[];
  };
  metrics: { label: string; value: string; note?: string }[];
  property: {
    kicker: string;
    title: string;
    intro: string;
    compositionTitle: string;
    units: { label: string; detail: string }[];
    includesTitle: string;
    includes: string[];
  };
  spaces: {
    kicker: string;
    title: string;
    intro: string;
    items: { title: string; body: string; imageId: string }[];
  };
  location: {
    kicker: string;
    title: string;
    intro: string;
    hierarchyTitle: string;
    hierarchy: { name: string; relation: string }[];
    body: string[];
    distinctTitle: string;
    distinct: string[];
  };
  investment: {
    kicker: string;
    title: string;
    intro: string;
    presentTitle: string;
    present: string[];
    possibleTitle: string;
    possibleNote: string;
    scenarios: { title: string; body: string }[];
    disclaimer: string;
  };
  heritage: {
    kicker: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    pending: string;
    close: string;
    next: string;
    previous: string;
  };
  facts: {
    kicker: string;
    title: string;
    rows: { term: string; value: string }[];
  };
  questions: {
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
  request: {
    kicker: string;
    title: string;
    intro: string;
    confidentialNote: string;
    topicsTitle: string;
    topics: string[];
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    sending: string;
    submit: string;
    required: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      phoneOptional: string;
      buyerType: string;
      country: string;
      message: string;
      privacy: string;
    };
    buyerTypes: Record<BuyerType, string>;
    errors: {
      name: string;
      email: string;
      buyerType: string;
      country: string;
      privacy: string;
    };
  };
  privacy: {
    title: string;
    updated: string;
    body: string[];
  };
  footer: {
    dossier: string;
    geography: string;
    notice: string;
    rights: string;
  };
  photoPending: string;
  skip: string;
};

export const messages: Record<Locale, Copy> = {
  en: {
    meta: {
      title:
        "Marina d'Albori Estate, Vietri sul Mare | Amalfi Coast property for sale",
      description:
        "A waterfront estate in Marina d'Albori, Vietri sul Mare, on the Amalfi Coast: approximately 900 m² internal space, 300–350 m² of terraces, seven units, hospitality and restaurant use, a historic lemon garden, and a seasonal pontoon concession.",
      ogTitle: "Marina d'Albori Estate — Vietri sul Mare, Amalfi Coast",
      ogDescription:
        "Private waterfront estate offered for sale in Marina d'Albori, Vietri sul Mare, Campania. Residential, commercial and hospitality composition on the Amalfi Coast.",
      siteName: "Marina d'Albori Estate",
    },
    brand: {
      kicker: "For sale",
      wordmark: "Marina d'Albori",
      placeLine: "Vietri sul Mare · Amalfi Coast",
    },
    nav: {
      overview: "Overview",
      property: "The property",
      spaces: "Spaces",
      location: "Location",
      investment: "Investment",
      heritage: "Heritage",
      gallery: "Gallery",
      request: "Request information",
      privacy: "Privacy",
      menu: "Open menu",
      close: "Close menu",
    },
    cta: {
      request: "Request further information",
      requestDetails: "Request property details",
      requestInvestment: "Request investment information",
      privateDiscussion: "Arrange a private discussion",
      documentation: "Request access to documentation",
    },
    hero: {
      eyebrow: "Estate for sale",
      title: "A waterfront estate in a private cove of the Amalfi Coast.",
      lead: "Marina d'Albori, Vietri sul Mare, Campania. Offered as a private trophy asset and as a hospitality investment.",
      geography: [
        "Marina d'Albori",
        "Vietri sul Mare",
        "Amalfi Coast",
        "Campania",
        "Italy",
      ],
      scroll: "Continue",
    },
    overview: {
      kicker: "The asset",
      title: "Seven independent units between the hillside and the sea.",
      body: [
        "The estate occupies a secluded cove at Marina d'Albori, in the municipality of Vietri sul Mare, at the eastern entrance of the Amalfi Coast. It combines residential accommodation, commercial space, an existing hospitality activity, a restaurant, a historic lemon garden, and a direct relationship with the water.",
        "Covered internal space is approximately 900 m², with approximately 300–350 m² of terraces. Five of the seven units are residential; two are commercial. A seasonal landing and pontoon concession is associated with the property.",
      ],
    },
    metrics: [
      { label: "Internal space", value: "≈ 900 m²", note: "Covered" },
      { label: "Terraces", value: "≈ 300–350 m²" },
      { label: "Units", value: "7", note: "Independent" },
      { label: "Residential", value: "5" },
      { label: "Commercial", value: "2" },
      { label: "Lemon trees", value: "≈ 8", note: "Around 70 years" },
    ],
    property: {
      kicker: "Composition",
      title: "What the estate comprises.",
      intro:
        "The property is not a single villa in the conventional sense. It is a group of independent units on a waterfront site, currently used for residence, holiday accommodation, restaurant service, and related commercial activity.",
      compositionTitle: "Units",
      units: [
        {
          label: "Five residential units",
          detail:
            "Independent dwellings, currently used in part as holiday accommodation. Interiors visible in the photography include living-kitchen rooms and guest bedrooms.",
        },
        {
          label: "Two commercial units",
          detail:
            "Commercial space forming part of the estate, including the existing restaurant activity. Detailed unit-by-unit plans are held for confidential review.",
        },
      ],
      includesTitle: "Also included",
      includes: [
        "Approximately 900 m² of covered internal space",
        "Approximately 300–350 m² of terraces",
        "Existing hospitality / holiday accommodation activity",
        "Existing restaurant activity",
        "Historic lemon garden (limoneto), with approximately eight mature trees around seventy years old",
        "A strong physical relationship with the sea and the Amalfi Coast landscape",
        "A seasonal landing / pontoon concession associated with the property",
        "A historic paper mill (cartiera) associated with the property, dating to 1830",
      ],
    },
    spaces: {
      kicker: "Architecture",
      title: "Spaces held between terrace, ceramic, and water.",
      intro:
        "The photographs record a Mediterranean construction of white masonry, outdoor rooms, and Vietri ceramic work. Dedicated close photographs of the limoneto and of the restaurant interior have not yet been added; those elements are described from supplied facts and from the aerial views.",
      items: [
        {
          title: "The cove",
          body: "White buildings step down a steep, vegetated hillside to a pebble beach. A seasonal pontoon extends from the shore. Beach lounge furniture visible in the aerials belongs to the existing hospitality use.",
          imageId: "architecture-hillside-aerial",
        },
        {
          title: "Terraces",
          body: "Outdoor rooms look over the Tyrrhenian Sea. Approximately 300–350 m² of terraces form a substantial part of the living area, typical of Amalfi Coast construction.",
          imageId: "terrace-dining-sea",
        },
        {
          title: "Residential interiors",
          body: "Units are finished in a contemporary Mediterranean manner: white rooms, patterned ceramic floors, and compact kitchens. The photography shows hospitality-ready bedrooms and living spaces.",
          imageId: "living-kitchen",
        },
        {
          title: "Guest rooms",
          body: "A representative bedroom, prepared with linen and towels, indicates the current holiday-accommodation use of part of the residential stock.",
          imageId: "bedroom",
        },
      ],
    },
    location: {
      kicker: "Geography",
      title: "Marina d'Albori, Vietri sul Mare, Amalfi Coast.",
      intro:
        "The property is not in Amalfi, Positano, or Ravello. It stands in Marina d'Albori, a coastal locality of Vietri sul Mare, the eastern gateway of the Amalfi Coast, in the province of Salerno, Campania, southern Italy.",
      hierarchyTitle: "Geographic hierarchy",
      hierarchy: [
        {
          name: "Marina d'Albori",
          relation: "Coastal locality of the estate; a cove on the Tyrrhenian Sea.",
        },
        {
          name: "Vietri sul Mare",
          relation:
            "Municipality. Known for its ceramic tradition; first town of the Amalfi Coast coming from Salerno.",
        },
        {
          name: "Province of Salerno",
          relation: "Administrative province in Campania.",
        },
        {
          name: "Campania",
          relation: "Region of southern Italy.",
        },
        {
          name: "Amalfi Coast (Costiera Amalfitana)",
          relation:
            "The coastal landscape and cultural geography to which Vietri sul Mare belongs.",
        },
        {
          name: "Italy",
          relation: "Country.",
        },
      ],
      body: [
        "Vietri sul Mare sits at the eastern end of the Amalfi Coast, facing the Gulf of Salerno. Salerno is the provincial capital and the nearest major city; exact road or sea times are not stated here until they can be verified for this site.",
        "Marina d'Albori is distinct from the hill village of Albori, which belongs to the same municipality but stands inland and above the coast. The estate presented here is the waterfront property in the cove.",
      ],
      distinctTitle: "What makes the position distinctive",
      distinct: [
        "A secluded cove rather than a town-front promenade.",
        "Direct visual and physical relationship with the sea, including a seasonal pontoon concession.",
        "Hillside terraces and a lemon garden above the buildings, characteristic of this coast.",
        "Location inside Vietri sul Mare, at the Amalfi Coast's eastern entrance, rather than in a more crowded western municipality.",
      ],
    },
    investment: {
      kicker: "Use",
      title: "Present activity, and what the asset could become.",
      intro:
        "The notes below separate facts about current use from possible future scenarios. No returns, occupancies, or valuations are stated.",
      presentTitle: "Current facts",
      present: [
        "The estate already supports hospitality / holiday accommodation.",
        "A restaurant activity is already in operation on the site.",
        "Five residential units and two commercial units make mixed use possible without inventing a new programme from nothing.",
        "A seasonal pontoon concession is associated with the property, which is relevant to sea access.",
      ],
      possibleTitle: "Possible future scenarios",
      possibleNote:
        "These are positioning hypotheses, not commitments, permissions, or forecasts. Any change of use would require appropriate verification and consents.",
      scenarios: [
        {
          title: "Private residence / family estate",
          body: "The cove, terraces and independent units could be held as a single private trophy asset, with or without staffed hospitality.",
        },
        {
          title: "Boutique hospitality",
          body: "The existing holiday-accommodation use could be refined as a small, highly specific hotel or house-hotel, subject to the applicable rules.",
        },
        {
          title: "Hospitality with food and beverage",
          body: "Restaurant and lodging already coexist. A buyer may continue or reconfigure that combination as a destination on the water.",
        },
        {
          title: "Mixed residential and hospitality asset",
          body: "Independent units allow a split between private apartments and operated rooms or commercial space.",
        },
        {
          title: "Long-term trophy holding",
          body: "The scarcity of true waterfront coves on the Amalfi Coast is the strategic point; it is not a statement about price trajectory.",
        },
      ],
      disclaimer:
        "Nothing on this site is an offer of securities, a guarantee of income, or a substitute for legal, cadastral, or planning due diligence. Detailed figures, concessions and operating documents are available only on request.",
    },
    heritage: {
      kicker: "Character",
      title: "Paper, ceramic, lemon, and sea.",
      intro:
        "The identity of the place is specific to Vietri sul Mare. It is not a generic Amalfi postcard, and it is not a reconstructed historical fantasy.",
      items: [
        {
          title: "Cartiera, 1830",
          body: "A historic paper mill (cartiera) associated with the property dates to 1830. Further archival and cadastral detail belongs in the confidential dossier.",
        },
        {
          title: "Limoneto",
          body: "A historic lemon garden remains on the estate, with approximately eight mature lemon trees around seventy years old. Close horticultural photographs will be added when available; the hillside aerial already shows terraced planting above the buildings.",
        },
        {
          title: "Vietri ceramic",
          body: "Vietri sul Mare is a centre of Campanian maiolica. The interiors include patterned floors, a blue-and-white shower, geometric tile, and a wave mosaic in broken ceramic — all visible in the photography, and consistent with that local craft.",
        },
        {
          title: "The cove",
          body: "Steep vegetated slopes enclose the site. Privacy here is a function of topography, not of a gate on a busy road.",
        },
      ],
    },
    gallery: {
      kicker: "Photographs",
      title: "A first visual record.",
      intro:
        "These images are the photographs supplied for this presentation. They are placed by subject — cove, architecture, terrace, interiors, ceramic — not as a repeated grid of the same view.",
      pending:
        "This photograph has been specified and will appear here as soon as the file is uploaded to the project.",
      close: "Close photograph",
      next: "Next photograph",
      previous: "Previous photograph",
    },
    facts: {
      kicker: "Dossier",
      title: "Property facts",
      rows: [
        { term: "Locality", value: "Marina d'Albori" },
        { term: "Municipality", value: "Vietri sul Mare" },
        { term: "Province", value: "Salerno" },
        { term: "Region", value: "Campania" },
        { term: "Country", value: "Italy" },
        { term: "Coast", value: "Amalfi Coast (Costiera Amalfitana)" },
        { term: "Covered internal space", value: "Approximately 900 m²" },
        { term: "Terraces", value: "Approximately 300–350 m²" },
        { term: "Units", value: "7 independent units" },
        { term: "Residential units", value: "5" },
        { term: "Commercial units", value: "2" },
        { term: "Current hospitality use", value: "Yes — holiday accommodation activity" },
        { term: "Restaurant", value: "Yes — existing activity" },
        { term: "Lemon garden", value: "Yes — approximately 8 trees, around 70 years old" },
        { term: "Sea relationship", value: "Yes — waterfront cove" },
        { term: "Pontoon", value: "Seasonal landing / pontoon concession associated with the property" },
        { term: "Historic paper mill", value: "Associated cartiera dated 1830" },
        { term: "Asking price", value: "Available on request" },
        { term: "Street address", value: "Available on request" },
        { term: "Coordinates", value: "Available on request" },
      ],
    },
    questions: {
      kicker: "In brief",
      title: "Questions a serious reader usually asks.",
      items: [
        {
          q: "Where is the property located?",
          a: "In Marina d'Albori, a coastal locality of Vietri sul Mare, province of Salerno, Campania, Italy, on the Amalfi Coast.",
        },
        {
          q: "What kind of property is it?",
          a: "A waterfront estate composed of multiple independent units, with residential, commercial, hospitality and restaurant uses.",
        },
        {
          q: "How large is it?",
          a: "Approximately 900 m² of covered internal space and approximately 300–350 m² of terraces.",
        },
        {
          q: "How many units does it contain?",
          a: "Seven independent units: five residential and two commercial.",
        },
        {
          q: "Does it include commercial spaces?",
          a: "Yes. Two units are commercial, and a restaurant activity already operates on the site.",
        },
        {
          q: "Does it have terraces?",
          a: "Yes. Terraces measure approximately 300–350 m².",
        },
        {
          q: "Does it have a lemon garden?",
          a: "Yes. A historic limoneto with approximately eight mature lemon trees, around seventy years old.",
        },
        {
          q: "Is it suitable for hospitality investment?",
          a: "Hospitality and holiday accommodation already exist. Future boutique-hotel or mixed-use scenarios are possible hypotheses, subject to due diligence and consents — not promised outcomes.",
        },
        {
          q: "What makes its position on the Amalfi Coast distinctive?",
          a: "It occupies a secluded cove in Vietri sul Mare, at the eastern entrance of the coast, with a direct sea relationship and a seasonal pontoon concession. It is not located in another Amalfi Coast municipality.",
        },
        {
          q: "How can an investor request additional information?",
          a: "Through the confidential request form on this site. Technical documents, plans, cadastral information and operating papers are not published here.",
        },
      ],
    },
    request: {
      kicker: "Confidential",
      title: "Request further information.",
      intro:
        "This form is for qualified buyers, agencies, family offices, funds and hospitality operators. Public marketing information is on the site; plans, cadastral extracts, concession papers and operating documents are released privately.",
      confidentialNote:
        "Please write from a professional address where possible. We do not publish price, coordinates, or unit-level documents on this website.",
      topicsTitle: "May be requested",
      topics: [
        "Technical documentation",
        "Plans",
        "Due diligence materials",
        "Cadastral documentation",
        "Detailed unit breakdown",
        "Commercial information",
        "Concession details",
        "Financial / operating documents",
      ],
      successTitle: "Request received.",
      successBody:
        "Thank you. Your message has been recorded. A reply will follow if the confidential inbox is connected for this site, or as soon as the selling party reviews submissions.",
      errorGeneric: "The request could not be sent. Please try again.",
      sending: "Sending…",
      submit: "Send request",
      required: "Required",
      fields: {
        name: "Full name",
        company: "Company",
        email: "Email",
        phone: "Telephone",
        phoneOptional: "optional",
        buyerType: "Buyer / organisation type",
        country: "Country",
        message: "Message",
        privacy:
          "I agree to the processing of my data solely to handle this information request, as described in the privacy note.",
      },
      buyerTypes: {
        privateBuyer: "Private buyer",
        realEstateAgency: "Real estate agency",
        investmentFund: "Investment fund",
        familyOffice: "Family office",
        hospitalityOperator: "Hospitality operator",
        other: "Other",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        buyerType: "Please select a buyer type.",
        country: "Please enter your country.",
        privacy: "Consent is required in order to send the request.",
      },
    },
    privacy: {
      title: "Privacy note",
      updated: "This note will be replaced by counsel’s text before public launch.",
      body: [
        "This website presents a private real-estate asset and collects enquiries from people who choose to write to the selling party.",
        "If you submit the form, the fields you enter (name, company, email, optional telephone, organisation type, country, message) are used only to assess and answer that enquiry. No marketing list is operated from this form.",
        "A delivery endpoint can be configured by the site operator. Until that endpoint is set, submissions are validated and stored only as a server-side request log in the hosting environment, if logging is enabled.",
        "No street address, price, or cadastral identifier is published on the public pages. Do not send documents that you do not wish to transmit.",
        "To ask for erasure of an enquiry you have sent, use the same email address in a new message with that request.",
      ],
    },
    footer: {
      dossier: "A confidential dossier is available on request.",
      geography: "Marina d'Albori, Vietri sul Mare, Amalfi Coast, Campania, Italy.",
      notice: "No price, returns, or ratings are published on this site.",
      rights: "All photographs are of the property presented. All rights reserved.",
    },
    photoPending: "Photograph to be placed — upload the file to public/images/property.",
    skip: "Skip to content",
  },
  it: {
    meta: {
      title:
        "Proprietà Marina d'Albori, Vietri sul Mare | Immobile in vendita in Costiera Amalfitana",
      description:
        "Proprietà fronte mare a Marina d'Albori, Vietri sul Mare, Costiera Amalfitana: circa 900 m² interni, 300–350 m² di terrazze, sette unità, ospitalità e ristorazione, limoneto storico e concessione stagionale di pontile.",
      ogTitle: "Proprietà Marina d'Albori — Vietri sul Mare, Costiera Amalfitana",
      ogDescription:
        "Proprietà fronte mare in vendita a Marina d'Albori, Vietri sul Mare, Campania. Composizione residenziale, commerciale e ricettiva sulla Costiera Amalfitana.",
      siteName: "Proprietà Marina d'Albori",
    },
    brand: {
      kicker: "In vendita",
      wordmark: "Marina d'Albori",
      placeLine: "Vietri sul Mare · Costiera Amalfitana",
    },
    nav: {
      overview: "Panoramica",
      property: "La proprietà",
      spaces: "Spazi",
      location: "Posizione",
      investment: "Investimento",
      heritage: "Identità",
      gallery: "Galleria",
      request: "Richiedi informazioni",
      privacy: "Privacy",
      menu: "Apri il menu",
      close: "Chiudi il menu",
    },
    cta: {
      request: "Richiedi ulteriori informazioni",
      requestDetails: "Richiedi la scheda della proprietà",
      requestInvestment: "Richiedi informazioni per investitori",
      privateDiscussion: "Richiedi un colloquio riservato",
      documentation: "Richiedi accesso alla documentazione",
    },
    hero: {
      eyebrow: "Proprietà in vendita",
      title: "Una proprietà fronte mare in una cala della Costiera Amalfitana.",
      lead: "Marina d'Albori, Vietri sul Mare, Campania. Proposta come asset privato di prestigio e come investimento ricettivo.",
      geography: [
        "Marina d'Albori",
        "Vietri sul Mare",
        "Costiera Amalfitana",
        "Campania",
        "Italia",
      ],
      scroll: "Continua",
    },
    overview: {
      kicker: "L'immobile",
      title: "Sette unità indipendenti tra il versante e il mare.",
      body: [
        "La proprietà occupa una cala appartata a Marina d'Albori, nel comune di Vietri sul Mare, all'ingresso orientale della Costiera Amalfitana. Riunisce residenze, spazi commerciali, un'attività ricettiva esistente, un ristorante, un limoneto storico e un rapporto diretto con l'acqua.",
        "La superficie interna coperta è di circa 900 m², con circa 300–350 m² di terrazze. Cinque delle sette unità sono residenziali; due sono commerciali. Alla proprietà è associata una concessione stagionale di approdo / pontile.",
      ],
    },
    metrics: [
      { label: "Superficie interna", value: "≈ 900 m²", note: "Coperta" },
      { label: "Terrazze", value: "≈ 300–350 m²" },
      { label: "Unità", value: "7", note: "Indipendenti" },
      { label: "Residenziali", value: "5" },
      { label: "Commerciali", value: "2" },
      { label: "Limoni", value: "≈ 8", note: "Circa 70 anni" },
    ],
    property: {
      kicker: "Composizione",
      title: "Di che cosa è composta la proprietà.",
      intro:
        "Non si tratta di una villa singola in senso convenzionale. È un insieme di unità indipendenti su un sito fronte mare, oggi usato per residenza, accoglienza turistica, ristorazione e attività commerciale connessa.",
      compositionTitle: "Unità",
      units: [
        {
          label: "Cinque unità residenziali",
          detail:
            "Abitazioni indipendenti, in parte usate come accoglienza per vacanze. Gli interni visibili nelle fotografie comprendono soggiorni-cucina e camere per gli ospiti.",
        },
        {
          label: "Due unità commerciali",
          detail:
            "Spazi commerciali parte della proprietà, inclusa l'attività di ristorazione esistente. Il dettaglio planimetrico per unità è riservato alla documentazione confidenziale.",
        },
      ],
      includesTitle: "Sono inoltre compresi",
      includes: [
        "Circa 900 m² di superficie interna coperta",
        "Circa 300–350 m² di terrazze",
        "Attività ricettiva / di accoglienza per vacanze già in essere",
        "Attività di ristorazione già in essere",
        "Limoneto storico, con circa otto alberi maturi di circa settant'anni",
        "Un rapporto fisico forte con il mare e il paesaggio della Costiera",
        "Una concessione stagionale di approdo / pontile associata alla proprietà",
        "Una cartiera storica associata alla proprietà, risalente al 1830",
      ],
    },
    spaces: {
      kicker: "Architettura",
      title: "Spazi tra terrazza, ceramica e acqua.",
      intro:
        "Le fotografie documentano una costruzione mediterranea in muratura chiara, stanze all'aperto e ceramica vietrese. Non sono ancora state inserite fotografie ravvicinate del limoneto né della sala del ristorante; tali elementi sono descritti dai fatti forniti e dalle viste aeree.",
      items: [
        {
          title: "La cala",
          body: "Edifici bianchi scendono un versante vegetato fino a una spiaggia di ciottoli. Un pontile stagionale si protende dalla riva. I lettini visibili nelle foto aeree appartengono all'uso ricettivo esistente.",
          imageId: "architecture-hillside-aerial",
        },
        {
          title: "Terrazze",
          body: "Stanze all'aperto guardano il Mar Tirreno. Circa 300–350 m² di terrazze costituiscono una parte sostanziale dello spazio abitabile, secondo la consuetudine della Costiera.",
          imageId: "terrace-dining-sea",
        },
        {
          title: "Interni residenziali",
          body: "Le unità sono finite in chiave mediterranea contemporanea: stanze chiare, pavimenti in ceramica decorata, cucine compatte. Le fotografie mostrano ambienti già predisposti all'accoglienza.",
          imageId: "living-kitchen",
        },
        {
          title: "Camere",
          body: "Una camera rappresentativa, preparata con biancheria, indica l'attuale uso ricettivo di parte del patrimonio residenziale.",
          imageId: "bedroom",
        },
      ],
    },
    location: {
      kicker: "Geografia",
      title: "Marina d'Albori, Vietri sul Mare, Costiera Amalfitana.",
      intro:
        "La proprietà non si trova ad Amalfi, Positano o Ravello. Sorge a Marina d'Albori, località costiera di Vietri sul Mare, porta orientale della Costiera Amalfitana, in provincia di Salerno, Campania, Italia meridionale.",
      hierarchyTitle: "Gerarchia geografica",
      hierarchy: [
        {
          name: "Marina d'Albori",
          relation: "Località costiera della proprietà; una cala sul Mar Tirreno.",
        },
        {
          name: "Vietri sul Mare",
          relation:
            "Comune. Noto per la tradizione ceramica; primo centro della Costiera provenendo da Salerno.",
        },
        {
          name: "Provincia di Salerno",
          relation: "Provincia amministrativa in Campania.",
        },
        {
          name: "Campania",
          relation: "Regione dell'Italia meridionale.",
        },
        {
          name: "Costiera Amalfitana",
          relation:
            "Paesaggio costiero e geografia culturale a cui appartiene Vietri sul Mare.",
        },
        {
          name: "Italia",
          relation: "Stato.",
        },
      ],
      body: [
        "Vietri sul Mare si trova all'estremità orientale della Costiera Amalfitana, sul Golfo di Salerno. Salerno è il capoluogo di provincia e la città maggiore più prossima; tempi di percorrenza stradali o marittimi non sono indicati finché non possono essere verificati per questo sito.",
        "Marina d'Albori è distinta dal borgo collinare di Albori, che appartiene allo stesso comune ma sorge nell'entroterra, sopra la costa. L'immobile qui presentato è la proprietà fronte mare nella cala.",
      ],
      distinctTitle: "Perché la posizione è specifica",
      distinct: [
        "Una cala appartata, non un lungomare di paese.",
        "Rapporto visivo e fisico diretto con il mare, inclusa una concessione stagionale di pontile.",
        "Terrazzamenti e limoneto sopra gli edifici, caratteristici di questa costa.",
        "Collocazione a Vietri sul Mare, all'ingresso orientale della Costiera, e non in un comune più occidentale e affollato.",
      ],
    },
    investment: {
      kicker: "Uso",
      title: "L'attività attuale, e ciò che l'immobile potrebbe diventare.",
      intro:
        "Le note seguenti separano i fatti sull'uso corrente da possibili scenari futuri. Non sono indicati rendimenti, occupazioni o valutazioni.",
      presentTitle: "Fatti attuali",
      present: [
        "La proprietà già sostiene un'attività ricettiva / di accoglienza per vacanze.",
        "Un'attività di ristorazione è già in esercizio sul sito.",
        "Cinque unità residenziali e due commerciali rendono possibile un uso misto senza inventare un programma da zero.",
        "Alla proprietà è associata una concessione stagionale di pontile, rilevante per l'accesso dal mare.",
      ],
      possibleTitle: "Possibili scenari futuri",
      possibleNote:
        "Si tratta di ipotesi di posizionamento, non di impegni, autorizzazioni o previsioni. Ogni mutamento d'uso richiede verifiche e titoli appropriati.",
      scenarios: [
        {
          title: "Residenza privata / tenuta di famiglia",
          body: "Cala, terrazze e unità indipendenti possono essere tenute come unico asset privato di prestigio, con o senza ospitalità servita.",
        },
        {
          title: "Ospitalità boutique",
          body: "L'uso ricettivo esistente può essere raffinato in una piccola struttura alberghiera o house-hotel, nel rispetto delle norme applicabili.",
        },
        {
          title: "Ricettività e ristorazione",
          body: "Ristorante e alloggi già coesistono. Un acquirente può proseguire o riorganizzare quella combinazione come destinazione sull'acqua.",
        },
        {
          title: "Asset misto residenziale e ricettivo",
          body: "Le unità indipendenti consentono una divisione tra appartamenti privati e camere o spazi commerciali gestiti.",
        },
        {
          title: "Detenzione di lungo periodo",
          body: "La scarsità di calette davvero fronte mare in Costiera è il punto strategico; non è un enunciato sull'andamento dei prezzi.",
        },
      ],
      disclaimer:
        "Nulla in questo sito costituisce offerta di strumenti finanziari, garanzia di reddito o sostituto di due diligence legale, catastale o urbanistica. Cifre di dettaglio, concessioni e documenti gestionali sono disponibili solo su richiesta.",
    },
    heritage: {
      kicker: "Carattere",
      title: "Carta, ceramica, limone e mare.",
      intro:
        "L'identità del luogo è specifica di Vietri sul Mare. Non è una cartolina generica della Costiera, né una ricostruzione storica di fantasia.",
      items: [
        {
          title: "Cartiera, 1830",
          body: "Una cartiera storica associata alla proprietà risale al 1830. L'approfondimento archivistico e catastale appartiene al dossier riservato.",
        },
        {
          title: "Limoneto",
          body: "Sulla proprietà resta un giardino di limoni storico, con circa otto alberi maturi di circa settant'anni. Fotografie agronomiche di dettaglio saranno aggiunte quando disponibili; la vista aerea del versante mostra già i terrazzamenti sopra gli edifici.",
        },
        {
          title: "Ceramica vietrese",
          body: "Vietri sul Mare è un centro della maiolica campana. Gli interni comprendono pavimenti a motivo, una doccia bianco-blu, piastrelle geometriche e un mosaico a onda in ceramica spezzata — visibili nelle fotografie e coerenti con quel mestiere locale.",
        },
        {
          title: "La cala",
          body: "Versanti vegetati e ripidi chiudono il sito. La riservatezza è un fatto di topografia, non di un cancello su una strada trafficata.",
        },
      ],
    },
    gallery: {
      kicker: "Fotografie",
      title: "Un primo inventario visivo.",
      intro:
        "Le immagini sono le fotografie fornite per questa presentazione. Sono collocate per soggetto — cala, architettura, terrazza, interni, ceramica — non come griglia ripetuta della stessa inquadratura.",
      pending:
        "Questa fotografia è stata prevista e comparirà qui non appena il file sarà caricato nel progetto.",
      close: "Chiudi la fotografia",
      next: "Fotografia successiva",
      previous: "Fotografia precedente",
      },
    facts: {
      kicker: "Dossier",
      title: "Dati della proprietà",
      rows: [
        { term: "Località", value: "Marina d'Albori" },
        { term: "Comune", value: "Vietri sul Mare" },
        { term: "Provincia", value: "Salerno" },
        { term: "Regione", value: "Campania" },
        { term: "Stato", value: "Italia" },
        { term: "Costa", value: "Costiera Amalfitana" },
        { term: "Superficie interna coperta", value: "Circa 900 m²" },
        { term: "Terrazze", value: "Circa 300–350 m²" },
        { term: "Unità", value: "7 unità indipendenti" },
        { term: "Unità residenziali", value: "5" },
        { term: "Unità commerciali", value: "2" },
        { term: "Uso ricettivo attuale", value: "Sì — attività di accoglienza per vacanze" },
        { term: "Ristorante", value: "Sì — attività esistente" },
        { term: "Limoneto", value: "Sì — circa 8 alberi, circa 70 anni" },
        { term: "Rapporto con il mare", value: "Sì — cala fronte mare" },
        { term: "Pontile", value: "Concessione stagionale di approdo / pontile associata alla proprietà" },
        { term: "Cartiera storica", value: "Cartiera associata datata 1830" },
        { term: "Prezzo richiesto", value: "Disponibile su richiesta" },
        { term: "Indirizzo", value: "Disponibile su richiesta" },
        { term: "Coordinate", value: "Disponibili su richiesta" },
      ],
    },
    questions: {
      kicker: "In sintesi",
      title: "Domande che un lettore serio pone di solito.",
      items: [
        {
          q: "Dov'è situata la proprietà?",
          a: "A Marina d'Albori, località costiera di Vietri sul Mare, provincia di Salerno, Campania, Italia, sulla Costiera Amalfitana.",
        },
        {
          q: "Che tipo di immobile è?",
          a: "Una proprietà fronte mare composta da più unità indipendenti, con usi residenziali, commerciali, ricettivi e di ristorazione.",
        },
        {
          q: "Quanto è grande?",
          a: "Circa 900 m² di superficie interna coperta e circa 300–350 m² di terrazze.",
        },
        {
          q: "Quante unità contiene?",
          a: "Sette unità indipendenti: cinque residenziali e due commerciali.",
        },
        {
          q: "Comprende spazi commerciali?",
          a: "Sì. Due unità sono commerciali e sul sito è già in esercizio un'attività di ristorazione.",
        },
        {
          q: "Ha terrazze?",
          a: "Sì. Le terrazze misurano circa 300–350 m².",
        },
        {
          q: "Ha un giardino di limoni?",
          a: "Sì. Un limoneto storico con circa otto alberi maturi, di circa settant'anni.",
        },
        {
          q: "È adatta a un investimento ricettivo?",
          a: "Ospitalità e accoglienza per vacanze esistono già. Scenari futuri di boutique hotel o uso misto sono ipotesi, soggette a due diligence e titoli — non risultati promessi.",
        },
        {
          q: "Che cosa rende distintiva la posizione in Costiera?",
          a: "Occupa una cala appartata a Vietri sul Mare, all'ingresso orientale della costa, con rapporto diretto col mare e concessione stagionale di pontile. Non si trova in un altro comune della Costiera.",
        },
        {
          q: "Come si richiedono informazioni aggiuntive?",
          a: "Tramite il modulo riservato su questo sito. Documenti tecnici, planimetrie, dati catastali e carte gestionali non sono pubblicati qui.",
        },
      ],
    },
    request: {
      kicker: "Riservato",
      title: "Richiedi ulteriori informazioni.",
      intro:
        "Il modulo è pensato per acquirenti qualificati, agenzie, family office, fondi e operatori ricettivi. Le informazioni di presentazione sono sul sito; planimetrie, visure, carte di concessione e documenti gestionali si rilasciano in privato.",
      confidentialNote:
        "Ove possibile, scrivere da un indirizzo professionale. Su questo sito non si pubblicano prezzo, coordinate o documenti di dettaglio delle unità.",
      topicsTitle: "Si può richiedere",
      topics: [
        "Documentazione tecnica",
        "Planimetrie",
        "Materiali di due diligence",
        "Documentazione catastale",
        "Dettaglio delle unità",
        "Informazioni commerciali",
        "Dettagli sulle concessioni",
        "Documenti finanziari / gestionali",
      ],
      successTitle: "Richiesta ricevuta.",
      successBody:
        "Grazie. Il messaggio è stato registrato. Seguirà una risposta se la casella riservata è collegata a questo sito, o non appena la parte venditrice esaminerà le richieste.",
      errorGeneric: "Non è stato possibile inviare la richiesta. Riprovare.",
      sending: "Invio…",
      submit: "Invia la richiesta",
      required: "Obbligatorio",
      fields: {
        name: "Nome e cognome",
        company: "Società",
        email: "Email",
        phone: "Telefono",
        phoneOptional: "facoltativo",
        buyerType: "Tipo di acquirente / organizzazione",
        country: "Paese",
        message: "Messaggio",
        privacy:
          "Acconsento al trattamento dei miei dati al solo fine di gestire questa richiesta, come descritto nella nota sulla privacy.",
      },
      buyerTypes: {
        privateBuyer: "Acquirente privato",
        realEstateAgency: "Agenzia immobiliare",
        investmentFund: "Fondo di investimento",
        familyOffice: "Family office",
        hospitalityOperator: "Operatore ricettivo",
        other: "Altro",
      },
      errors: {
        name: "Inserire il nome.",
        email: "Inserire un indirizzo email valido.",
        buyerType: "Selezionare un tipo di acquirente.",
        country: "Inserire il paese.",
        privacy: "Il consenso è necessario per inviare la richiesta.",
      },
    },
    privacy: {
      title: "Nota sulla privacy",
      updated: "Questo testo sarà sostituito da una versione legale prima del lancio pubblico.",
      body: [
        "Questo sito presenta un immobile privato e raccoglie richieste da chi sceglie di scrivere alla parte venditrice.",
        "Se si invia il modulo, i campi inseriti (nome, società, email, telefono facoltativo, tipo di organizzazione, paese, messaggio) sono usati solo per valutare e rispondere a quella richiesta. Da questo modulo non si gestisce alcuna lista di marketing.",
        "L'operatore del sito può configurare un endpoint di consegna. Finché l'endpoint non è impostato, le richieste sono convalidate e possono restare solo nei log server dell'ambiente di hosting, se i log sono attivi.",
        "Nelle pagine pubbliche non si pubblicano indirizzo stradale, prezzo o identificativi catastali. Non inviare documenti che non si desidera trasmettere.",
        "Per chiedere la cancellazione di una richiesta inviata, usare lo stesso indirizzo email in un nuovo messaggio con tale richiesta.",
      ],
    },
    footer: {
      dossier: "Un dossier riservato è disponibile su richiesta.",
      geography: "Marina d'Albori, Vietri sul Mare, Costiera Amalfitana, Campania, Italia.",
      notice: "Su questo sito non si pubblicano prezzi, rendimenti o valutazioni.",
      rights: "Le fotografie ritraggono la proprietà presentata. Tutti i diritti riservati.",
    },
    photoPending: "Fotografia da inserire — caricare il file in public/images/property.",
    skip: "Vai al contenuto",
  },
};

export function t(locale: Locale): Copy {
  return messages[locale];
}
