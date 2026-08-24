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
  metrics: {
    internalArea: string;
    terraces: string;
    units: string;
    composition: string;
  };
  property: {
    kicker: string;
    title: string;
    intro: string;
    compositionTitle: string;
    units: { label: string; detail: string }[];
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
      emptyTitle: string;
      emptyBody: string;
      close: string;
      next: string;
      previous: string;
    };
  facts: {
    kicker: string;
    title: string;
    terms: {
      locality: string;
      municipality: string;
      coast: string;
      internalArea: string;
      terraces: string;
      units: string;
      residentialUnits: string;
      commercialUnits: string;
      hospitality: string;
      restaurant: string;
      lemonGarden: string;
      waterfront: string;
      pontoon: string;
      paperMill: string;
    };
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
    geography: string;
  };
  diagram: {
    coveLabel: string;
    coveCaption: string;
    residentialShort: string;
    commercialShort: string;
    unitsNote: string;
    lemonCaption: string;
  };
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
      property: "Estate",
      spaces: "Spaces",
      location: "Location",
      investment: "Investment",
      heritage: "Heritage",
      gallery: "Gallery",
      request: "Request dossier",
      privacy: "Privacy",
      menu: "Open menu",
      close: "Close menu",
    },
    cta: {
      request: "Request the private dossier",
      requestDetails: "View the estate",
      requestInvestment: "Explore strategic optionality",
    },
    hero: {
      eyebrow: "Available for acquisition",
      title: "Marina d'Albori",
      lead: "Private waterfront estate · Amalfi Coast, Italy",
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
      kicker: "The estate",
      title: "A waterfront holding between hillside and sea.",
      body: [
        "Seven independent units bring together residential, hospitality and restaurant uses in a secluded cove at Marina d'Albori. Terraces, a historic limoneto and a seasonal landing / pontoon concession establish a direct relationship with the sea.",
      ],
    },
    metrics: {
      internalArea: "Internal area",
      terraces: "Terraces",
      units: "Independent units",
      composition: "Residential / commercial",
    },
    property: {
      kicker: "The acquisition",
      title: "A multi-building estate with existing mixed use.",
      intro:
        "The acquisition comprises seven independent units, extensive terraces and the associated waterfront and historic elements described below.",
      compositionTitle: "Estate composition",
      units: [
        {
          label: "Five residential units",
          detail:
            "Independent dwellings, currently used in part for holiday accommodation.",
        },
        {
          label: "Two commercial units",
          detail:
            "Commercial spaces forming part of the estate, including the existing restaurant activity.",
        },
      ],
    },
    spaces: {
      kicker: "Architecture",
      title: "Terrace, ceramic and water.",
      intro:
        "White masonry, outdoor rooms and Vietri ceramic work define the estate.",
      items: [
        {
          title: "The cove",
          body: "White buildings step down a steep, vegetated hillside towards a pebble beach and the seasonal pontoon.",
          imageId: "architecture-hillside-aerial",
        },
        {
          title: "Terraces",
          body: "Approximately 300–350 m² of outdoor rooms extend the estate towards the Tyrrhenian Sea.",
          imageId: "terrace-dining-sea",
        },
        {
          title: "Residential interiors",
          body: "White rooms, patterned ceramic floors and compact kitchens give the residential units a direct Mediterranean character.",
          imageId: "living-kitchen",
        },
        {
          title: "Guest rooms",
          body: "Part of the residential accommodation is already arranged for hospitality use.",
          imageId: "bedroom",
        },
      ],
    },
    location: {
      kicker: "Position",
      title: "A secluded cove at the eastern threshold of the Amalfi Coast.",
      intro:
        "Marina d'Albori belongs to Vietri sul Mare, where the Amalfi Coast meets the Gulf of Salerno.",
      hierarchyTitle: "From cove to coast",
      hierarchy: [
        {
          name: "Marina d'Albori",
          relation: "The waterfront cove occupied by the estate.",
        },
        {
          name: "Vietri sul Mare",
          relation: "The municipality and eastern gateway to the Amalfi Coast.",
        },
        {
          name: "Amalfi Coast (Costiera Amalfitana)",
          relation:
            "The coastal landscape of southern Campania, Italy.",
        },
      ],
      body: [
        "The position combines the privacy of an enclosed waterfront setting with the cultural identity of Vietri sul Mare and its ceramic tradition.",
        "Marina d'Albori is the coastal locality; the hill village of Albori lies inland within the same municipality.",
      ],
      distinctTitle: "What makes the position distinctive",
      distinct: [
        "An enclosed waterfront setting.",
        "A seasonal landing / pontoon concession associated with the property.",
        "Hillside terraces and a historic limoneto above the buildings.",
      ],
    },
    investment: {
      kicker: "Strategic optionality",
      title: "An existing mixed-use estate with several paths forward.",
      intro:
        "Residential, hospitality and restaurant uses already coexist across seven independent units.",
      presentTitle: "Existing asset",
      present: [
        "Five independent residential units, used in part for holiday accommodation.",
        "Two commercial units, including an existing restaurant activity.",
        "Approximately 900 m² of covered internal area and 300–350 m² of terraces.",
        "Seasonal landing / pontoon concession associated with the property.",
      ],
      possibleTitle: "Strategic optionality",
      scenarios: [
        {
          title: "Private residence / family estate",
          body: "A single private holding with independent accommodation for family and guests.",
        },
        {
          title: "Hospitality with food and beverage",
          body: "A focused hospitality proposition combining accommodation with the existing restaurant activity.",
        },
        {
          title: "Mixed residential and hospitality asset",
          body: "A balance of private apartments, operated accommodation and commercial space.",
        },
        {
          title: "Long-term estate holding",
          body: "A long-term hold defined by waterfront scarcity and the difficulty of replicating the setting.",
        },
      ],
      disclaimer:
        "All future configurations are indicative and subject to due diligence, applicable approvals and verification of concession documentation.",
    },
    heritage: {
      kicker: "Provenance",
      title: "Cartiera, limoneto, ceramic and sea.",
      intro:
        "The estate carries material traces of the history and craft of Vietri sul Mare.",
      items: [
        {
          title: "Cartiera, 1830",
          body: "A historic paper mill associated with the property dates to 1830.",
        },
        {
          title: "Limoneto",
          body: "Approximately eight mature lemon trees, around seventy years old, remain on the hillside terraces.",
        },
        {
          title: "Vietri ceramic",
          body: "Patterned floors, maiolica and mosaic connect the interiors to Vietri's ceramic tradition.",
        },
        {
          title: "The cove",
          body: "Steep vegetated slopes create privacy through the natural topography of the cove.",
        },
      ],
    },
    gallery: {
      kicker: "Visual archive",
      title: "The estate, from cove to interior.",
      intro:
        "A private photographic portfolio accompanies the acquisition dossier.",
      emptyTitle: "Private photographic portfolio",
      emptyBody:
        "Interior, architectural and waterfront photography is available to qualified parties with the private dossier.",
      close: "Close photograph",
      next: "Next photograph",
      previous: "Previous photograph",
    },
    facts: {
      kicker: "Acquisition schedule",
      title: "Principal facts",
      terms: {
        locality: "Locality",
        municipality: "Municipality",
        coast: "Coast",
        internalArea: "Covered internal space",
        terraces: "Terraces",
        units: "Units",
        residentialUnits: "Residential units",
        commercialUnits: "Commercial units",
        hospitality: "Current hospitality use",
        restaurant: "Restaurant",
        lemonGarden: "Lemon garden",
        waterfront: "Sea relationship",
        pontoon: "Pontoon",
        paperMill: "Historic paper mill",
      },
    },
    request: {
      kicker: "Private enquiry",
      title: "Request the private dossier.",
      intro:
        "Qualified parties may request access to the detailed acquisition materials.",
      confidentialNote:
        "Enquiries are handled discreetly.",
      topicsTitle: "Confidential materials",
      topics: [
        "Technical, planning and cadastral documentation",
        "Plans and due diligence materials",
        "Commercial information",
        "Concession and operating documentation",
      ],
      successTitle: "Request received.",
      successBody:
        "Thank you. The acquisition team will review your enquiry and respond directly.",
      errorGeneric: "The request could not be sent. Please try again.",
      sending: "Sending…",
      submit: "Request the dossier",
      required: "Required",
      fields: {
        name: "Full name",
        company: "Company",
        email: "Professional email",
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
      updated: "Private enquiries",
      body: [
        "Information submitted through the private enquiry form is used only to assess and respond to that enquiry.",
        "The information requested is limited to contact details, the nature of the prospective buyer or organisation, country and any message provided voluntarily.",
        "Enquiry data is not used for unrelated marketing. Requests concerning access, correction or deletion may be made through the same enquiry channel.",
      ],
    },
    footer: {
      geography: "Marina d'Albori · Amalfi Coast · Italy",
    },
    diagram: {
      coveLabel: "Marina d'Albori",
      coveCaption:
        "Waterfront estate · Amalfi Coast",
      residentialShort: "Residential",
      commercialShort: "Commercial",
      unitsNote: "independent units in total",
      lemonCaption: "Historic limoneto: approximately eight mature trees, around seventy years old.",
    },
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
      property: "Proprietà",
      spaces: "Spazi",
      location: "Posizione",
      investment: "Investimento",
      heritage: "Identità",
      gallery: "Galleria",
      request: "Richiedi il dossier",
      privacy: "Privacy",
      menu: "Apri il menu",
      close: "Chiudi il menu",
    },
    cta: {
      request: "Richiedi il dossier riservato",
      requestDetails: "Scopri la proprietà",
      requestInvestment: "Esplora le opzioni strategiche",
    },
    hero: {
      eyebrow: "Disponibile per l'acquisizione",
      title: "Marina d'Albori",
      lead: "Proprietà privata fronte mare · Costiera Amalfitana, Italia",
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
      kicker: "La proprietà",
      title: "Una proprietà fronte mare tra il versante e il mare.",
      body: [
        "Sette unità indipendenti riuniscono usi residenziali, ricettivi e di ristorazione in una cala appartata a Marina d'Albori. Terrazze, limoneto storico e concessione stagionale di approdo / pontile stabiliscono un rapporto insolitamente diretto con il mare.",
      ],
    },
    metrics: {
      internalArea: "Superficie interna",
      terraces: "Terrazze",
      units: "Unità indipendenti",
      composition: "Residenziali / commerciali",
    },
    property: {
      kicker: "L'acquisizione",
      title: "Una proprietà articolata, con uso misto esistente.",
      intro:
        "L'acquisizione comprende sette unità indipendenti, ampie terrazze e gli elementi storici e fronte mare descritti di seguito.",
      compositionTitle: "Composizione",
      units: [
        {
          label: "Cinque unità residenziali",
          detail:
            "Abitazioni indipendenti, in parte usate per l'accoglienza turistica.",
        },
        {
          label: "Due unità commerciali",
          detail:
            "Spazi commerciali parte della proprietà, inclusa l'attività di ristorazione esistente.",
        },
      ],
    },
    spaces: {
      kicker: "Architettura",
      title: "Terrazza, ceramica e acqua.",
      intro:
        "Muratura chiara, stanze all'aperto e ceramica vietrese definiscono la proprietà.",
      items: [
        {
          title: "La cala",
          body: "Edifici bianchi scendono un versante vegetato verso la spiaggia di ciottoli e il pontile stagionale.",
          imageId: "architecture-hillside-aerial",
        },
        {
          title: "Terrazze",
          body: "Circa 300–350 m² di stanze all'aperto proiettano la proprietà verso il Mar Tirreno.",
          imageId: "terrace-dining-sea",
        },
        {
          title: "Interni residenziali",
          body: "Stanze chiare, pavimenti in ceramica decorata e cucine compatte danno agli interni un carattere mediterraneo diretto.",
          imageId: "living-kitchen",
        },
        {
          title: "Camere",
          body: "Parte degli spazi residenziali è già predisposta per l'uso ricettivo.",
          imageId: "bedroom",
        },
      ],
    },
    location: {
      kicker: "Posizione",
      title: "Una cala appartata alla soglia orientale della Costiera Amalfitana.",
      intro:
        "Marina d'Albori appartiene a Vietri sul Mare, dove la Costiera Amalfitana incontra il Golfo di Salerno.",
      hierarchyTitle: "Dalla cala alla costa",
      hierarchy: [
        {
          name: "Marina d'Albori",
          relation: "La cala fronte mare occupata dalla proprietà.",
        },
        {
          name: "Vietri sul Mare",
          relation: "Il comune e porta orientale della Costiera Amalfitana.",
        },
        {
          name: "Costiera Amalfitana",
          relation:
            "Il paesaggio costiero della Campania meridionale, in Italia.",
        },
      ],
      body: [
        "La posizione unisce la riservatezza di un contesto fronte mare raccolto all'identità culturale di Vietri sul Mare e della sua tradizione ceramica.",
        "Marina d'Albori è la località costiera; il borgo di Albori sorge nell'entroterra dello stesso comune.",
      ],
      distinctTitle: "Perché la posizione è specifica",
      distinct: [
        "Un contesto fronte mare raccolto.",
        "Una concessione stagionale di approdo / pontile associata alla proprietà.",
        "Terrazzamenti e limoneto storico sopra gli edifici.",
      ],
    },
    investment: {
      kicker: "Opzioni strategiche",
      title: "Una proprietà a uso misto con diverse traiettorie possibili.",
      intro:
        "Usi residenziali, ricettivi e di ristorazione già coesistono nelle sette unità indipendenti.",
      presentTitle: "Asset esistente",
      present: [
        "Cinque unità residenziali indipendenti, in parte usate per l'accoglienza turistica.",
        "Due unità commerciali, inclusa un'attività di ristorazione esistente.",
        "Circa 900 m² interni coperti e 300–350 m² di terrazze.",
        "Concessione stagionale di approdo / pontile associata alla proprietà.",
      ],
      possibleTitle: "Opzioni strategiche",
      scenarios: [
        {
          title: "Residenza privata / tenuta di famiglia",
          body: "Un'unica proprietà privata con alloggi indipendenti per famiglia e ospiti.",
        },
        {
          title: "Ricettività e ristorazione",
          body: "Una proposta ricettiva che unisce accoglienza e attività di ristorazione esistente.",
        },
        {
          title: "Asset misto residenziale e ricettivo",
          body: "Un equilibrio tra appartamenti privati, ospitalità gestita e spazi commerciali.",
        },
        {
          title: "Detenzione di lungo periodo",
          body: "Una detenzione di lungo periodo definita dalla scarsità fronte mare e dalla difficoltà di replicare il contesto.",
        },
      ],
      disclaimer:
        "Ogni configurazione futura è indicativa e soggetta a due diligence, autorizzazioni applicabili e verifica della documentazione concessoria.",
    },
    heritage: {
      kicker: "Provenienza",
      title: "Cartiera, limoneto, ceramica e mare.",
      intro:
        "La proprietà conserva tracce materiali della storia e dell'artigianato di Vietri sul Mare.",
      items: [
        {
          title: "Cartiera, 1830",
          body: "Una cartiera storica associata alla proprietà risale al 1830.",
        },
        {
          title: "Limoneto",
          body: "Circa otto limoni maturi, di circa settant'anni, restano sui terrazzamenti del versante.",
        },
        {
          title: "Ceramica vietrese",
          body: "Pavimenti decorati, maiolica e mosaico legano gli interni alla tradizione ceramica vietrese.",
        },
        {
          title: "La cala",
          body: "Versanti vegetati e ripidi creano riservatezza attraverso la topografia naturale della cala.",
        },
      ],
    },
    gallery: {
      kicker: "Archivio visivo",
      title: "La proprietà, dalla cala agli interni.",
      intro:
        "Un portfolio fotografico riservato accompagna il dossier di acquisizione.",
      emptyTitle: "Portfolio fotografico riservato",
      emptyBody:
        "Fotografie degli interni, dell'architettura e del fronte mare sono disponibili per i soggetti qualificati insieme al dossier riservato.",
      close: "Chiudi la fotografia",
      next: "Fotografia successiva",
      previous: "Fotografia precedente",
      },
    facts: {
      kicker: "Scheda di acquisizione",
      title: "Dati principali",
      terms: {
        locality: "Località",
        municipality: "Comune",
        coast: "Costa",
        internalArea: "Superficie interna coperta",
        terraces: "Terrazze",
        units: "Unità",
        residentialUnits: "Unità residenziali",
        commercialUnits: "Unità commerciali",
        hospitality: "Uso ricettivo attuale",
        restaurant: "Ristorante",
        lemonGarden: "Limoneto",
        waterfront: "Rapporto con il mare",
        pontoon: "Pontile",
        paperMill: "Cartiera storica",
      },
    },
    request: {
      kicker: "Richiesta riservata",
      title: "Richiedi il dossier riservato.",
      intro:
        "I soggetti qualificati possono richiedere accesso ai materiali di acquisizione di dettaglio.",
      confidentialNote:
        "Le richieste sono gestite con discrezione.",
      topicsTitle: "Materiali riservati",
      topics: [
        "Documentazione tecnica, urbanistica e catastale",
        "Planimetrie e materiali di due diligence",
        "Informazioni commerciali",
        "Documentazione concessoria e gestionale",
      ],
      successTitle: "Richiesta ricevuta.",
      successBody:
        "Grazie. Il team incaricato dell'acquisizione esaminerà la richiesta e risponderà direttamente.",
      errorGeneric: "Non è stato possibile inviare la richiesta. Riprovare.",
      sending: "Invio…",
      submit: "Richiedi il dossier",
      required: "Obbligatorio",
      fields: {
        name: "Nome e cognome",
        company: "Società",
        email: "Email professionale",
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
      updated: "Richieste riservate",
      body: [
        "Le informazioni inviate tramite il modulo riservato sono utilizzate esclusivamente per valutare e rispondere alla richiesta.",
        "Le informazioni richieste sono limitate ai dati di contatto, alla natura del potenziale acquirente o organizzazione, al paese e all'eventuale messaggio fornito volontariamente.",
        "I dati della richiesta non sono utilizzati per attività di marketing non correlate. Richieste di accesso, rettifica o cancellazione possono essere inviate tramite lo stesso canale.",
      ],
    },
    footer: {
      geography: "Marina d'Albori · Costiera Amalfitana · Italia",
    },
    diagram: {
      coveLabel: "Marina d'Albori",
      coveCaption:
        "Proprietà fronte mare · Costiera Amalfitana",
      residentialShort: "Residenziale",
      commercialShort: "Commerciale",
      unitsNote: "unità indipendenti complessive",
      lemonCaption: "Limoneto storico: circa otto alberi maturi, di circa settant'anni.",
    },
    skip: "Vai al contenuto",
  },
};

export function t(locale: Locale): Copy {
  return messages[locale];
}
