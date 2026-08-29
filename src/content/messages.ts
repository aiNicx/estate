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
    seaAccess: string;
    seaAccessValue: string;
  };
  home: {
    galleryCta: string;
    seaKicker: string;
    seaTitle: string;
    seaBody: string;
    connectionsTitle: string;
    connections: { name: string; relation: string }[];
    dossierIntro: string;
    dossierMaterials: string[];
  };
  property: {
    kicker: string;
    title: string;
    intro: string;
    factsLabel: string;
    compositionTitle: string;
    units: { label: string; detail: string }[];
    distinctTitle: string;
    distinct: string[];
  };
  spaces: {
    kicker: string;
    title: string;
    deck: string;
    intro: string;
    chapters: { title: string; body: string }[];
    nextProperty: string;
  };
  location: {
    kicker: string;
    title: string;
    intro: string;
    metaDescription: string;
    accessPreview: {
      land: { kicker: string; label: string };
      sea: { kicker: string; label: string };
    };
    topography: {
      kicker: string;
      title: string;
      body: string;
      strata: { label: string; note: string }[];
    };
    access: {
      kicker: string;
      title: string;
      intro: string;
      land: { kicker: string; title: string; label: string; body: string };
      sea: { kicker: string; title: string; label: string; body: string };
    };
    connectivity: {
      kicker: string;
      title: string;
      intro: string;
      distanceNote: string;
      modes: { id: "road" | "sea" | "rail" | "air"; title: string; body: string }[];
    };
    context: {
      kicker: string;
      title: string;
      body: string;
    };
    distinctTitle: string;
    distinct: { title: string; body: string }[];
    dossierLead: string;
    mapCaption: string;
    map: {
      title: string;
      ariaLabel: string;
      unavailableTitle: string;
      unavailableBody: string;
    };
    mapLabels: {
      vietri: string;
      salerno: string;
      cetara: string;
      "salerno-station": string;
      qsr: string;
      nap: string;
      property: string;
    };
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
    pageKicker: string;
    pageTitle: string;
    pageIntro: string;
    items: { year?: string; title: string; body: string }[];
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
    groups: {
      location: string;
      use: string;
      waterfront: string;
      landscape: string;
    };
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
      landAccess: string;
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
      request: "Request the confidential dossier",
      requestDetails: "View the estate",
      requestInvestment: "Explore strategic options",
    },
    hero: {
      eyebrow: "Marina d'Albori",
      title: "A private waterfront estate on the Amalfi Coast.",
      lead: "Vietri sul Mare.",
      scroll: "Continue",
    },
    overview: {
      kicker: "The estate",
      title: "Seven independent units on a private cove.",
      body: [
        "Five residential and two commercial units occupy a secluded waterfront setting. Terraces and a seasonal pontoon concession open the estate to the sea.",
      ],
    },
    metrics: {
      internalArea: "Internal area",
      terraces: "Terraces",
      units: "Independent units",
      composition: "Residential / commercial",
      seaAccess: "Sea access",
      seaAccessValue: "Waterfront",
    },
    home: {
      galleryCta: "View the gallery",
      seaKicker: "Sea access",
      seaTitle: "A seasonal pontoon in a private cove.",
      seaBody:
        "A landing / pontoon concession associated with the property, in an enclosed waterfront setting.",
      connectionsTitle: "Connections",
      connections: [
        {
          name: "Vietri sul Mare",
          relation: "The municipality, and eastern gateway to the Amalfi Coast.",
        },
        {
          name: "Salerno",
          relation: "The provincial capital, on the Gulf of Salerno.",
        },
        {
          name: "Amalfi Coast",
          relation: "The coastal landscape of southern Campania.",
        },
      ],
      dossierIntro:
        "Qualified parties may request plans, specifications, additional photography and further confidential documentation.",
      dossierMaterials: [
        "Plans",
        "Property areas and specifications",
        "Additional photography",
        "Technical, cadastral and concession documentation",
      ],
    },
    property: {
      kicker: "The property",
      title: "Seven independent units facing the sea.",
      intro:
        "A mixed-use holding on the hillside of Marina d'Albori, in Vietri sul Mare.",
      factsLabel: "Property facts",
      compositionTitle: "Composition",
      units: [
        {
          label: "Five residential units",
          detail:
            "Independent dwellings, in part used for holiday accommodation.",
        },
        {
          label: "Two commercial units",
          detail:
            "Commercial spaces belonging to the estate, including the existing restaurant.",
        },
      ],
      distinctTitle: "Distinguishing elements",
      distinct: [
        "A waterfront cove, with direct access to the sea.",
        "A seasonal landing / pontoon concession associated with the property.",
        "Hospitality and restaurant use already in operation.",
        "A historic paper mill associated with the estate, dated 1830.",
        "A lemon grove on the hillside terraces.",
      ],
    },
    spaces: {
      kicker: "Spaces",
      title: "Spaces built around the sea.",
      deck: "Terrace, ceramic and water.",
      intro:
        "From the hillside to the cove, the rooms open toward the water.",
      chapters: [
        {
          title: "The cove",
          body: "White buildings step down the planted hillside to a pebble beach and the seasonal pontoon.",
        },
        {
          title: "Terraces",
          body: "About 300–350 m² of outdoor rooms, continuous with the interiors and facing the Tyrrhenian.",
        },
        {
          title: "Living spaces",
          body: "Vaulted rooms and open-plan interiors open onto the terraces. Inside and outside are barely set apart.",
        },
        {
          title: "Rooms and hospitality",
          body: "Part of the residential accommodation is already in hospitality use. Some vaulted rooms open directly to the sea.",
        },
        {
          title: "Materials",
          body: "White masonry, vaulted ceilings, ceramic floors.",
        },
      ],
      nextProperty: "Property specification",
    },
    location: {
      kicker: "Position · Marina d'Albori",
      title: "A reserved cove at the threshold of the Amalfi Coast.",
      intro:
        "Marina d'Albori is a coastal locality of Vietri sul Mare, where the Amalfi Coast meets the Gulf of Salerno.",
      metaDescription:
        "Marina d'Albori, Vietri sul Mare, Campania: a waterfront cove on the eastern Amalfi Coast. Pedestrian stepped access from road level; seasonal landing / pontoon concession. Geographic context for Salerno, rail and airports.",
      accessPreview: {
        land: {
          kicker: "Land access",
          label: "Pedestrian · stepped path from road level",
        },
        sea: {
          kicker: "Sea access",
          label: "Waterfront cove · seasonal landing / pontoon concession",
        },
      },
      topography: {
        kicker: "Setting",
        title: "Between hillside and waterline.",
        body: "The estate occupies a vertical stretch of this coast: road level above, buildings and cove below, the Gulf of Salerno immediately to the south. Marina d'Albori is the shore locality; the hill village of Albori lies inland within the same municipality.",
        strata: [
          {
            label: "Road level",
            note: "The coastal road sits above the cove.",
          },
          {
            label: "Stepped descent",
            note: "The property is reached on foot from the road.",
          },
          {
            label: "Estate and cove",
            note: "Buildings, terraces and shoreline.",
          },
          {
            label: "Sea",
            note: "Waterfront, with a seasonal landing concession.",
          },
        ],
      },
      access: {
        kicker: "Approach",
        title: "Between road and sea",
        intro:
          "The estate has two relationships with access — one from land, one from water — both shaped by the same coastal section.",
        land: {
          kicker: "Via land",
          title: "Land access",
          label: "Pedestrian · stepped path from road level",
          body: "From road level, the property is reached on foot via a stepped path descending through the hillside towards the cove. The arrangement follows the vertical morphology of this stretch of coast.",
        },
        sea: {
          kicker: "Via sea",
          title: "Sea access",
          label: "Waterfront cove · seasonal landing / pontoon concession",
          body: "The buildings, terraces and cove sit on the waterline. A seasonal landing / pontoon concession is associated with the property: a time-limited use right, not a private harbour and not a guarantee of year-round boat access.",
        },
      },
      connectivity: {
        kicker: "Network",
        title: "Road, sea, rail and air",
        intro:
          "The cove is secluded in section, yet it sits at the eastern edge of the Amalfi Coast, facing Salerno and Campania's transport network.",
        distanceNote:
          "Kilometres below are approximate straight-line distances from the published listing pin, not journey times.",
        modes: [
          {
            id: "road",
            title: "Road",
            body: "This stretch of coast is served by the SS163 Amalfitana, the coastal state road that runs at road level above the cove. Vehicles relate to that road level; the final approach to the buildings is on foot, by the stepped path.",
          },
          {
            id: "sea",
            title: "Sea",
            body: "The estate is on the waterfront of the cove, with the associated seasonal landing / pontoon concession. Seasonal maritime services along the coast call at harbours, not at the property.",
          },
          {
            id: "rail",
            title: "Rail",
            body: "Salerno is the relevant nearby long-distance rail gateway, including access to Italy's high-speed network.",
          },
          {
            id: "air",
            title: "Air",
            body: "Two airports frame the geography: Salerno–Costa d'Amalfi and Naples International (Capodichino). Neither distance below is a travel time.",
          },
        ],
      },
      context: {
        kicker: "Coast",
        title: "The eastern Amalfi Coast, on the Gulf of Salerno.",
        body: "West of the cove the shoreline runs through Cetara, Maiori, Amalfi and Positano. East and north-east lie Vietri sul Mare and Salerno, in Campania, Italy.",
      },
      distinctTitle: "A position that is difficult to replicate",
      distinct: [
        {
          title: "Waterfront",
          body: "Buildings, terraces and cove have an unusually direct relationship with the shoreline.",
        },
        {
          title: "Separation",
          body: "The vertical sequence of road, hillside and cove gives the estate a clearly defined physical setting.",
        },
        {
          title: "Connectivity",
          body: "The property remains geographically close to Vietri sul Mare and Salerno while belonging to the Amalfi Coast.",
        },
      ],
      dossierLead:
        "Plans, concession documents and further geographic detail are reserved for the confidential dossier.",
      mapCaption: "Marina d'Albori · Vietri sul Mare",
      map: {
        title: "Geographic setting",
        ariaLabel:
          "Map showing the estate at Marina d'Albori on the coast between Vietri sul Mare and Salerno.",
        unavailableTitle: "Map temporarily unavailable",
        unavailableBody:
          "Marina d'Albori · Vietri sul Mare · eastern Amalfi Coast",
      },
      mapLabels: {
        vietri: "Vietri sul Mare",
        salerno: "Salerno",
        cetara: "Cetara",
        "salerno-station": "Salerno station",
        qsr: "Salerno–Costa d'Amalfi Airport",
        nap: "Naples International Airport",
        property: "The estate",
      },
    },
    investment: {
      kicker: "Use",
      title: "Three possible configurations.",
      intro:
        "Residential, hospitality and restaurant uses already coexist across seven independent units.",
      presentTitle: "Existing asset",
      present: [
        "Five independent residential units, used in part for holiday accommodation.",
        "Two commercial units, including an existing restaurant activity.",
        "Approximately 900 m² of covered internal area and 300–350 m² of terraces.",
        "Seasonal landing / pontoon concession associated with the property.",
      ],
      possibleTitle: "Possible configurations",
      scenarios: [
        {
          title: "Private Estate",
          body: "A single private holding, with independent accommodation for family and guests.",
        },
        {
          title: "Hospitality",
          body: "Accommodation combined with the existing restaurant activity.",
        },
        {
          title: "Mixed-use Investment",
          body: "Private apartments, operated hospitality and commercial space in one holding.",
        },
      ],
      disclaimer:
        "All future configurations are indicative and subject to due diligence, applicable approvals and verification of concession documentation.",
    },
    heritage: {
      kicker: "Provenance",
      title: "A property with a history.",
      intro:
        "Paper mill, lemon grove, Vietri ceramic and the sea still shape the estate.",
      pageKicker: "Identity · Marina d'Albori",
      pageTitle:
        "Nearly two centuries of material, landscape and the Mediterranean.",
      pageIntro:
        "Industry, cultivation and coast remain visible on the hillside and in the rooms.",
      items: [
        {
          year: "1830",
          title: "The paper mill",
          body: "A historic paper mill associated with the property dates to 1830. It is the most specific fact in the estate's history.",
        },
        {
          title: "The cultivated landscape",
          body: "On the hillside terraces, about eight mature lemon trees remain, around seventy years old.",
        },
        {
          title: "Vietri",
          body: "Floors, maiolica and mosaic bind the interiors to the ceramic tradition of Vietri sul Mare.",
        },
        {
          title: "The sea",
          body: "The cove, the steep slope and the shoreline give the estate its privacy and turn the rooms toward the water.",
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
      kicker: "Specification",
      title: "Asset schedule",
      groups: {
        location: "Location",
        use: "Current use",
        waterfront: "Waterfront",
        landscape: "Landscape and history",
      },
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
        pontoon: "Landing / pontoon",
        landAccess: "Land access",
        paperMill: "Historic paper mill",
      },
    },
    request: {
      kicker: "Private enquiry",
      title: "Request the confidential dossier.",
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
      eyebrow: "Marina d'Albori",
      title: "Una proprietà privata fronte mare, in Costiera Amalfitana.",
      lead: "Vietri sul Mare.",
      scroll: "Continua",
    },
    overview: {
      kicker: "La proprietà",
      title: "Sette unità indipendenti in una cala privata sul mare.",
      body: [
        "Cinque unità residenziali e due commerciali occupano un contesto fronte mare appartato. Le terrazze e la concessione stagionale di pontile aprono la proprietà al mare.",
      ],
    },
    metrics: {
      internalArea: "Superficie interna",
      terraces: "Terrazze",
      units: "Unità indipendenti",
      composition: "Residenziali / commerciali",
      seaAccess: "Accesso al mare",
      seaAccessValue: "Fronte mare",
    },
    home: {
      galleryCta: "Vedi la galleria",
      seaKicker: "Accesso al mare",
      seaTitle: "Un pontile stagionale in una cala privata.",
      seaBody:
        "Una concessione di approdo / pontile associata alla proprietà, in un contesto fronte mare raccolto.",
      connectionsTitle: "Collegamenti",
      connections: [
        {
          name: "Vietri sul Mare",
          relation: "Il comune, porta orientale della Costiera Amalfitana.",
        },
        {
          name: "Salerno",
          relation: "Il capoluogo provinciale, sul Golfo di Salerno.",
        },
        {
          name: "Costiera Amalfitana",
          relation: "Il paesaggio costiero della Campania meridionale.",
        },
      ],
      dossierIntro:
        "I soggetti qualificati possono richiedere planimetrie, dati dimensionali, fotografie aggiuntive e ulteriore documentazione riservata.",
      dossierMaterials: [
        "Planimetrie",
        "Superfici e dati della proprietà",
        "Fotografie aggiuntive",
        "Documentazione tecnica, catastale e concessoria",
      ],
    },
    property: {
      kicker: "La proprietà",
      title: "Sette unità indipendenti affacciate sul mare.",
      intro:
        "Un complesso a uso misto sul versante di Marina d'Albori, nel comune di Vietri sul Mare.",
      factsLabel: "Dati della proprietà",
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
            "Spazi commerciali della proprietà, inclusa l'attività di ristorazione esistente.",
        },
      ],
      distinctTitle: "Caratteri distintivi",
      distinct: [
        "Una cala fronte mare, con accesso diretto all'acqua.",
        "Una concessione stagionale di approdo / pontile associata alla proprietà.",
        "Uso ricettivo e di ristorazione già in essere.",
        "Una cartiera storica associata alla proprietà, datata 1830.",
        "Un limoneto sui terrazzamenti del versante.",
      ],
    },
    spaces: {
      kicker: "Spazi",
      title: "Spazi costruiti intorno al mare.",
      deck: "Terrazza, ceramica e acqua.",
      intro:
        "Dal versante alla cala, gli ambienti si aprono verso l'acqua.",
      chapters: [
        {
          title: "La cala",
          body: "Edifici bianchi scendono il versante vegetato fino alla spiaggia di ciottoli e al pontile stagionale.",
        },
        {
          title: "Le terrazze",
          body: "Circa 300–350 m² di stanze all'aperto, in continuità con gli interni e rivolte al Tirreno.",
        },
        {
          title: "Spazi residenziali",
          body: "Soggiorni a volta e open space si aprono sulle terrazze. Tra interno ed esterno la soglia è sottile.",
        },
        {
          title: "Camere e ospitalità",
          body: "Parte delle unità residenziali è già in uso ricettivo. Alcune camere a volta si aprono direttamente sul mare.",
        },
        {
          title: "Materia",
          body: "Muratura chiara, soffitti a volta, pavimenti in ceramica.",
        },
      ],
      nextProperty: "Scheda della proprietà",
    },
    location: {
      kicker: "Posizione · Marina d'Albori",
      title: "Una cala riservata alle porte della Costiera Amalfitana.",
      intro:
        "Marina d'Albori è una località costiera del comune di Vietri sul Mare, nel punto in cui la Costiera Amalfitana si apre sul Golfo di Salerno.",
      metaDescription:
        "Marina d'Albori, Vietri sul Mare, Campania: cala fronte mare all'ingresso orientale della Costiera Amalfitana. Accesso pedonale a scale dal livello stradale; concessione stagionale di approdo / pontile. Quadro geografico verso Salerno, ferrovia e aeroporti.",
      accessPreview: {
        land: {
          kicker: "Accesso da terra",
          label: "Pedonale · percorso a scale dal livello stradale",
        },
        sea: {
          kicker: "Accesso dal mare",
          label: "Cala fronte mare · concessione stagionale di approdo / pontile",
        },
      },
      topography: {
        kicker: "Morfologia",
        title: "Tra versante e linea d'acqua.",
        body: "La proprietà occupa un tratto verticale di questa costa: il livello stradale a monte, edifici e cala a valle, il Golfo di Salerno subito a sud. Marina d'Albori è la località di riva; il borgo di Albori sorge nell'entroterra dello stesso comune.",
        strata: [
          {
            label: "Livello stradale",
            note: "La strada costiera corre sopra la cala.",
          },
          {
            label: "Discesa a scale",
            note: "Dalla strada la proprietà si raggiunge a piedi.",
          },
          {
            label: "Proprietà e cala",
            note: "Edifici, terrazze e riva.",
          },
          {
            label: "Mare",
            note: "Fronte mare, con concessione stagionale di approdo.",
          },
        ],
      },
      access: {
        kicker: "Accesso",
        title: "Tra strada e mare",
        intro:
          "La proprietà ha due rapporti con l'accesso — da terra e dall'acqua — entrambi legati allo stesso tratto di costa.",
        land: {
          kicker: "Via terra",
          title: "Accesso da terra",
          label: "Pedonale · percorso a scale dal livello stradale",
          body: "Dal livello stradale, la proprietà si raggiunge a piedi attraverso un percorso a scale che scende lungo il versante verso la cala. Una configurazione strettamente legata alla morfologia verticale di questo tratto di costa.",
        },
        sea: {
          kicker: "Via mare",
          title: "Accesso dal mare",
          label: "Cala fronte mare · concessione stagionale di approdo / pontile",
          body: "Edifici, terrazze e cala si affacciano sulla linea di costa. Alla proprietà è associata una concessione stagionale di approdo / pontile: un diritto d'uso a termine, non un porto privato e non un accesso nautico garantito tutto l'anno.",
        },
      },
      connectivity: {
        kicker: "Rete",
        title: "Strada, mare, ferrovia, aria",
        intro:
          "In sezione la cala è appartata; in pianta resta all'estremità orientale della Costiera, rivolta verso Salerno e la rete della Campania.",
        distanceNote:
          "I chilometri indicati sono distanze indicative in linea d'aria dal pin pubblicato, non tempi di percorrenza.",
        modes: [
          {
            id: "road",
            title: "Strada",
            body: "Questo tratto di costa è servito dalla SS163 Amalfitana, la statale che corre a livello stradale sopra la cala. I veicoli restano a quella quota; l'ultimo tratto verso gli edifici è pedonale, sul percorso a scale.",
          },
          {
            id: "sea",
            title: "Mare",
            body: "La proprietà è fronte mare sulla cala, con la concessione stagionale di approdo / pontile associata. I collegamenti marittimi stagionali della costa fanno scalo nei porti, non presso la proprietà.",
          },
          {
            id: "rail",
            title: "Ferrovia",
            body: "Salerno è il riferimento ferroviario di lungo raggio più prossimo, incluso l'accesso alla rete ad alta velocità.",
          },
          {
            id: "air",
            title: "Aria",
            body: "Due aeroporti inquadrano la geografia: Salerno–Costa d'Amalfi e Napoli-Capodichino. Le distanze non sono tempi di viaggio.",
          },
        ],
      },
      context: {
        kicker: "Costa",
        title: "L'estremo orientale della Costiera, sul Golfo di Salerno.",
        body: "A ovest della cala la riva corre per Cetara, Maiori, Amalfi e Positano. A est e nord-est si trovano Vietri sul Mare e Salerno, in Campania, Italia.",
      },
      distinctTitle: "Una posizione difficile da replicare",
      distinct: [
        {
          title: "Fronte mare",
          body: "Edifici, terrazze e cala hanno un rapporto insolitamente diretto con la linea di costa.",
        },
        {
          title: "Separazione",
          body: "La sequenza verticale tra strada, versante e cala dà alla proprietà un perimetro fisico chiaro.",
        },
        {
          title: "Connessione",
          body: "La proprietà resta geograficamente prossima a Vietri sul Mare e a Salerno, pur appartenendo al contesto della Costiera.",
        },
      ],
      dossierLead:
        "Planimetrie, documentazione concessoria e ulteriori dati geografici restano nel dossier riservato.",
      mapCaption: "Marina d'Albori · Vietri sul Mare",
      map: {
        title: "Inquadramento geografico",
        ariaLabel:
          "Mappa della proprietà a Marina d'Albori, sulla costa tra Vietri sul Mare e Salerno.",
        unavailableTitle: "Mappa temporaneamente non disponibile",
        unavailableBody:
          "Marina d'Albori · Vietri sul Mare · ingresso orientale della Costiera Amalfitana",
      },
      mapLabels: {
        vietri: "Vietri sul Mare",
        salerno: "Salerno",
        cetara: "Cetara",
        "salerno-station": "Stazione di Salerno",
        qsr: "Aeroporto Salerno–Costa d'Amalfi",
        nap: "Aeroporto di Napoli-Capodichino",
        property: "La proprietà",
      },
    },
    investment: {
      kicker: "Uso",
      title: "Tre configurazioni possibili.",
      intro:
        "Usi residenziali, ricettivi e di ristorazione già coesistono nelle sette unità indipendenti.",
      presentTitle: "Asset esistente",
      present: [
        "Cinque unità residenziali indipendenti, in parte usate per l'accoglienza turistica.",
        "Due unità commerciali, inclusa un'attività di ristorazione esistente.",
        "Circa 900 m² interni coperti e 300–350 m² di terrazze.",
        "Concessione stagionale di approdo / pontile associata alla proprietà.",
      ],
      possibleTitle: "Configurazioni possibili",
      scenarios: [
        {
          title: "Residenza privata",
          body: "Un'unica proprietà privata, con alloggi indipendenti per famiglia e ospiti.",
        },
        {
          title: "Ricettività",
          body: "Accoglienza unita all'attività di ristorazione esistente.",
        },
        {
          title: "Investimento a uso misto",
          body: "Appartamenti privati, ospitalità gestita e spazi commerciali in un unico complesso.",
        },
      ],
      disclaimer:
        "Ogni configurazione futura è indicativa e soggetta a due diligence, autorizzazioni applicabili e verifica della documentazione concessoria.",
    },
    heritage: {
      kicker: "Provenienza",
      title: "Una proprietà con una storia.",
      intro:
        "Cartiera, limoneto, ceramica vietrese e mare definiscono ancora la proprietà.",
      pageKicker: "Identità · Marina d'Albori",
      pageTitle: "Quasi due secoli di materia, paesaggio e Mediterraneo.",
      pageIntro:
        "Lavoro, coltivazione e costa restano visibili nel versante e negli interni.",
      items: [
        {
          year: "1830",
          title: "La cartiera",
          body: "Una cartiera storica associata alla proprietà risale al 1830. È il dato più preciso della sua storia.",
        },
        {
          title: "Il paesaggio coltivato",
          body: "Sui terrazzamenti restano circa otto limoni maturi, di circa settant'anni.",
        },
        {
          title: "Vietri",
          body: "Pavimenti, maiolica e mosaico legano gli interni alla tradizione ceramica di Vietri sul Mare.",
        },
        {
          title: "Il mare",
          body: "La cala, il versante ripido e la linea di costa danno riservatezza e orientano gli spazi verso l'acqua.",
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
      kicker: "Specifiche",
      title: "Scheda dell'immobile",
      groups: {
        location: "Posizione",
        use: "Uso attuale",
        waterfront: "Fronte mare",
        landscape: "Paesaggio e storia",
      },
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
        pontoon: "Approdo / pontile",
        landAccess: "Accesso da terra",
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
