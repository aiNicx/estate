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
  nav: Record<RouteId, string> & { privacy: string; menu: string; close: string; navigation: string; mobileNavigation: string; footerNavigation: string; breadcrumb: string; language: string };
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
    areaNote: string;
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
    groups: Record<"waterfront" | "terraces" | "interiors" | "hospitality" | "details", string>;
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
    buyerTypePrompt: string;
    messagePlaceholder: string;
    unavailable: string;
    nextTitle: string;
    steps: string[];
    privacyLink: string;
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
  "en": {
    "meta": {
      "title": "Marina d'Albori | Waterfront estate in Vietri sul Mare",
      "description": "A waterfront estate at Marina d'Albori on the Amalfi Coast: seven residential and commercial units, approximately 900 m² of internal area and 300–350 m² of terraces, with existing holiday accommodation and restaurant use.",
      "ogTitle": "Marina d'Albori · A waterfront estate",
      "ogDescription": "Seven units, seafront terraces and a historic paper mill dating to 1830 associated with the property. An introduction to the estate and its setting in Vietri sul Mare.",
      "siteName": "Marina d'Albori"
    },
    "brand": {
      "kicker": "Property for sale",
      "wordmark": "Marina d'Albori",
      "placeLine": "Vietri sul Mare · Amalfi Coast"
    },
    "nav": {
      "overview": "Overview",
      "property": "Property",
      "spaces": "Spaces",
      "location": "Location",
      "investment": "Uses",
      "heritage": "History",
      "gallery": "Photographs",
      "request": "Enquiries",
      "privacy": "Privacy",
      "menu": "Menu",
      "close": "Close",
      "navigation": "Main navigation",
      "mobileNavigation": "Menu navigation",
      "footerNavigation": "Footer navigation",
      "breadcrumb": "Breadcrumb navigation",
      "language": "Language"
    },
    "cta": {
      "request": "Request information",
      "requestDetails": "Explore the property",
      "requestInvestment": "Current use and possibilities"
    },
    "hero": {
      "eyebrow": "Marina d'Albori",
      "title": "A waterfront estate on the Amalfi Coast.",
      "lead": "At Marina d'Albori, in the municipality of Vietri sul Mare.",
      "scroll": "Continue"
    },
    "overview": {
      "kicker": "The property",
      "title": "Seven units between the hillside and the sea.",
      "body": [
        "Five residential and two commercial units form the estate, arranged along the hillside above the cove. Terraces, views over the water and Mediterranean vegetation define the setting.",
        "Some of the homes are already used for holiday accommodation, alongside existing restaurant use. A seasonal landing and pontoon concession is associated with the property."
      ]
    },
    "metrics": {
      "internalArea": "Internal area",
      "terraces": "Terraces",
      "units": "Independent units",
      "composition": "Residential / commercial",
      "seaAccess": "Setting",
      "seaAccessValue": "Waterfront"
    },
    "home": {
      "galleryCta": "View the photographs",
      "seaKicker": "The waterfront",
      "seaTitle": "The cove and seasonal landing.",
      "seaBody": "The buildings and terraces overlook the cove. Details of the seasonal landing and pontoon concession can be explored through the property documentation.",
      "connectionsTitle": "The surroundings",
      "connections": [
        {
          "name": "Vietri sul Mare",
          "relation": "The property's municipality, at the eastern end of the Amalfi Coast."
        },
        {
          "name": "Salerno",
          "relation": "The nearby city and a point of access to the rail network."
        },
        {
          "name": "Amalfi Coast",
          "relation": "The coastal landscape extending towards Cetara, Amalfi and Positano."
        }
      ],
      "dossierIntro": "For further information about the units, documentation and sale terms, enquiries can be directed to the person handling the sale.",
      "dossierMaterials": [
        "Unit composition and floor areas",
        "Floor plans and technical documentation",
        "Seasonal landing and pontoon concession",
        "Sale terms and arrangements for a viewing"
      ]
    },
    "property": {
      "kicker": "The property",
      "title": "Seven units on the waterfront.",
      "intro": "Approximately 900 m² of internal area and 300–350 m² of terraces, comprising five residential and two commercial units. Homes, holiday accommodation and restaurant use within one estate.",
      "factsLabel": "Key facts",
      "compositionTitle": "The units",
      "areaNote": "Areas are approximate. The breakdown by unit and detailed measurements should be reviewed against the property documentation.",
      "units": [
        {
          "label": "Five residential units",
          "detail": "Independent homes, some of which are used for holiday accommodation."
        },
        {
          "label": "Two commercial units",
          "detail": "Commercial premises, including an existing restaurant."
        }
      ],
      "distinctTitle": "The elements of the estate",
      "distinct": [
        "The waterfront setting in the cove at Marina d'Albori.",
        "Terraces and views over the water.",
        "Existing holiday accommodation and restaurant use.",
        "The seasonal landing and pontoon concession associated with the property.",
        "A historic paper mill dating to 1830 associated with the property and a lemon grove on the hillside terraces."
      ]
    },
    "spaces": {
      "kicker": "Spaces",
      "title": "Spaces overlooking the sea.",
      "deck": "Terraces, residential interiors and ceramic detail.",
      "intro": "The photographs show how the buildings and outdoor spaces relate to the cove, alongside the interiors of the residential units.",
      "chapters": [
        {
          "title": "The buildings and the cove",
          "body": "White buildings follow the hillside down to the waterfront. Terraces and balconies articulate the façades, with the cove and seasonal pontoon below."
        },
        {
          "title": "The terraces",
          "body": "Approximately 300–350 m² of terraces in total. The photographs show views over the Tyrrhenian Sea, outdoor dining spaces and balconies framed by arches."
        },
        {
          "title": "The residential interiors",
          "body": "Vaulted sitting rooms, open interiors and ceramic floors feature in the spaces photographed. Layouts and views vary between units."
        },
        {
          "title": "The bedrooms",
          "body": "The bedrooms photographed look towards the sea and the hillside pines. Some of the residential units are already used for holiday accommodation."
        },
        {
          "title": "Ceramic and detail",
          "body": "Maiolica, mosaics and blue doors feature throughout the rooms and interior passageways, reflecting the ceramic tradition of Vietri sul Mare."
        }
      ],
      "nextProperty": "Property composition and facts"
    },
    "location": {
      "kicker": "Location",
      "title": "Marina d'Albori, where Vietri meets the Amalfi Coast.",
      "intro": "The estate is at Marina d'Albori, in the municipality of Vietri sul Mare, on the stretch of coast overlooking the Gulf of Salerno.",
      "metaDescription": "The estate's location at Marina d'Albori: pedestrian stair access from the road, a waterfront setting and a seasonal landing and pontoon concession. Vietri sul Mare, Salerno and the surrounding transport connections.",
      "accessPreview": {
        "land": {
          "kicker": "From land",
          "label": "Pedestrian · stepped path from the road"
        },
        "sea": {
          "kicker": "On the water",
          "label": "Waterfront · seasonal landing and pontoon concession"
        }
      },
      "topography": {
        "kicker": "The landscape",
        "title": "From hillside to cove.",
        "body": "The coastal road runs above the cove. Buildings and terraces extend down the hillside towards the shore. Marina d'Albori is the locality on the water; the village of Albori sits higher up, within the same municipality.",
        "strata": [
          {
            "label": "The road",
            "note": "The arrival point from land, above the cove."
          },
          {
            "label": "The path",
            "note": "The pedestrian descent by stairs towards the buildings."
          },
          {
            "label": "The estate",
            "note": "Buildings, terraces and views over the water."
          },
          {
            "label": "The shore",
            "note": "The cove and seasonal pontoon."
          }
        ]
      },
      "access": {
        "kicker": "Getting there",
        "title": "Access to the estate.",
        "intro": "The final approach from land is on foot. Landing from the water is subject to the seasonal concession associated with the property.",
        "land": {
          "kicker": "From the road",
          "title": "The pedestrian approach",
          "label": "Pedestrian · stepped path from the road",
          "body": "A stepped path descends from road level along the hillside towards the cove. Details of the route and arrival arrangements can be discussed ahead of a viewing."
        },
        "sea": {
          "kicker": "From the cove",
          "title": "The seasonal landing",
          "label": "Seasonal landing and pontoon concession",
          "body": "A seasonal landing and pontoon concession is associated with the property. Conditions of use, seasonal operation and the features of the landing should be reviewed in the relevant documentation."
        }
      },
      "connectivity": {
        "kicker": "Connections",
        "title": "Roads, ports, rail and airports.",
        "intro": "Vietri sul Mare and Salerno are the main points of reference for reaching this part of the coast and continuing towards the estate.",
        "distanceNote": "Distances shown are approximate and measured in a straight line from the estate's location. They do not indicate travel times.",
        "modes": [
          {
            "id": "road",
            "title": "Road",
            "body": "The SS163 Amalfitana follows the hillside above the cove. The final stretch to the buildings is on foot, along the stairs."
          },
          {
            "id": "sea",
            "title": "Ports and sea connections",
            "body": "Coastal boat services use the area's ports and landing points. The property's seasonal concession should be considered separately from these services."
          },
          {
            "id": "rail",
            "title": "Rail",
            "body": "Salerno station connects the area to Italy's national rail network, including high-speed services."
          },
          {
            "id": "air",
            "title": "Airports",
            "body": "The relevant airports are Salerno–Costa d'Amalfi and Naples International (Capodichino)."
          }
        ]
      },
      "context": {
        "kicker": "The coast",
        "title": "Vietri, Salerno and the coast towards Amalfi.",
        "body": "Vietri sul Mare and Salerno lie east of the cove. To the west, the coast continues through Cetara, Maiori, Amalfi and Positano."
      },
      "distinctTitle": "The estate's surroundings",
      "distinct": [
        {
          "title": "The shore",
          "body": "The cove brings together the buildings, hillside and sea."
        },
        {
          "title": "The hillside",
          "body": "The change in level between the road and shore shapes the arrangement of the spaces and the approach to the estate."
        },
        {
          "title": "The area",
          "body": "The estate forms part of Vietri sul Mare, at the eastern end of the Amalfi Coast."
        }
      ],
      "dossierLead": "Enquiries about access, floor plans and the seasonal concession can be directed to the person handling the sale.",
      "mapCaption": "Marina d'Albori · Vietri sul Mare",
      "map": {
        "title": "The location",
        "ariaLabel": "Map of the estate at Marina d'Albori, with Vietri sul Mare and Salerno.",
        "unavailableTitle": "The map is currently unavailable",
        "unavailableBody": "The estate is at Marina d'Albori, in the municipality of Vietri sul Mare."
      },
      "mapLabels": {
        "vietri": "Vietri sul Mare",
        "salerno": "Salerno",
        "cetara": "Cetara",
        "salerno-station": "Salerno station",
        "qsr": "Salerno–Costa d'Amalfi Airport",
        "nap": "Naples International Airport",
        "property": "The estate"
      }
    },
    "investment": {
      "kicker": "Uses and possibilities",
      "title": "Current use and possibilities to explore.",
      "intro": "The estate brings together homes, holiday accommodation and commercial premises. This composition allows several approaches to be considered, starting with the uses already in place.",
      "presentTitle": "Current use",
      "present": [
        "Five independent residential units, some used for holiday accommodation.",
        "Two commercial units, including an existing restaurant.",
        "Approximately 900 m² of internal area and 300–350 m² of terraces.",
        "A seasonal landing and pontoon concession associated with the property."
      ],
      "possibleTitle": "Possibilities to explore",
      "scenarios": [
        {
          "title": "Private use",
          "body": "The separate homes may be considered for family and guest use. Connections between spaces and any alterations would need to be reviewed."
        },
        {
          "title": "Accommodation and dining",
          "body": "Existing holiday accommodation and restaurant use provide a starting point for assessing management of the estate and its operational needs."
        },
        {
          "title": "Mixed use",
          "body": "The combination of residential and commercial units allows an approach combining personal use with managed activities to be considered."
        }
      ],
      "disclaimer": "These are possibilities to be assessed against technical, planning, cadastral and concession documentation. Changes of use or alterations require the relevant checks and approvals."
    },
    "heritage": {
      "kicker": "History and character",
      "title": "The paper mill, lemon grove and ceramic detail.",
      "intro": "A historic paper mill dating to 1830 is associated with the property. The lemon grove on the hillside terraces and ceramic details in the interiors add to its story.",
      "pageKicker": "History",
      "pageTitle": "Work, landscape and the ceramic tradition.",
      "pageIntro": "The paper mill associated with the estate, the lemon trees and the interior details connect this place to the history and landscape of Vietri sul Mare.",
      "items": [
        {
          "year": "1830",
          "title": "The paper mill",
          "body": "A historic paper mill associated with the property dates to 1830."
        },
        {
          "title": "The lemon grove",
          "body": "Approximately eight lemon trees, around seventy years old, stand on the hillside terraces. Citrus cultivation is part of the landscape of this stretch of coast."
        },
        {
          "title": "Vietri ceramic",
          "body": "Maiolica floors, blue and white tiles and coloured mosaics feature in the interiors photographed, reflecting the ceramic tradition of Vietri sul Mare."
        },
        {
          "title": "The cove",
          "body": "The shore and hillside shape the buildings and their outlook. The sea is the visual reference for the outdoor spaces."
        }
      ]
    },
    "gallery": {
      "kicker": "Photographs",
      "title": "From the cove to the interiors.",
      "intro": "A selection of photographs introduces the waterfront setting, terraces, residential interiors and details of the estate.",
      "groups": {
        "waterfront": "The cove and waterfront",
        "terraces": "The terraces",
        "interiors": "The residential interiors",
        "hospitality": "Bedrooms and views",
        "details": "Ceramic and garden"
      },
      "emptyTitle": "The photographs are currently unavailable",
      "emptyBody": "Enquiries about the estate and photographic material can be directed to the person handling the sale.",
      "close": "Close",
      "next": "Next",
      "previous": "Previous"
    },
    "facts": {
      "kicker": "Property facts",
      "title": "Composition and characteristics",
      "groups": {
        "location": "Location",
        "use": "Current use",
        "waterfront": "Waterfront and access",
        "landscape": "Landscape and history"
      },
      "terms": {
        "locality": "Locality",
        "municipality": "Municipality",
        "coast": "Coast",
        "internalArea": "Internal area",
        "terraces": "Terraces",
        "units": "Units",
        "residentialUnits": "Residential units",
        "commercialUnits": "Commercial units",
        "hospitality": "Holiday accommodation",
        "restaurant": "Restaurant use",
        "lemonGarden": "Lemon grove",
        "waterfront": "Setting",
        "pontoon": "Landing and pontoon",
        "landAccess": "Land access",
        "paperMill": "Paper mill associated with the property"
      }
    },
    "request": {
      "kicker": "Enquiries and viewings",
      "title": "Further information about the estate.",
      "intro": "For questions about the property, its documentation or a possible viewing, leave your contact details and let us know what you would like to explore.",
      "confidentialNote": "The details provided are used to handle your enquiry. The person handling the sale can discuss the matters raised in your message.",
      "topicsTitle": "What to discuss",
      "topics": [
        "Unit composition, floor areas and plans",
        "Technical, planning and cadastral documentation",
        "Seasonal landing and pontoon concession",
        "Current use and operational details",
        "Sale terms and arrangements for a viewing"
      ],
      "successTitle": "Enquiry sent.",
      "successBody": "Thank you. Your enquiry has been forwarded to the person handling the sale, who can respond using the contact details provided.",
      "errorGeneric": "Your enquiry was not sent. Please try again shortly.",
      "unavailable": "Enquiries through the website are currently unavailable. You can contact the person who shared this presentation with you.",
      "sending": "Sending your enquiry…",
      "submit": "Send enquiry",
      "required": "Required",
      "buyerTypePrompt": "Select your profile",
      "messagePlaceholder": "You can mention the aspects you would like to explore or your interest in a viewing.",
      "nextTitle": "After your enquiry",
      "steps": [
        "The person handling the sale receives your details and message.",
        "Further information and available materials are agreed according to your enquiry.",
        "A viewing can be arranged with the person handling the sale."
      ],
      "privacyLink": "Read the privacy note",
      "fields": {
        "name": "Full name",
        "company": "Company or practice",
        "email": "Email",
        "phone": "Telephone",
        "phoneOptional": "optional",
        "buyerType": "Profile",
        "country": "Country of residence or business",
        "message": "Questions or interest",
        "privacy": "I agree to my data being processed to handle this enquiry, as described in the privacy note."
      },
      "buyerTypes": {
        "privateBuyer": "Private buyer",
        "realEstateAgency": "Real estate agency",
        "investmentFund": "Investment fund",
        "familyOffice": "Family office",
        "hospitalityOperator": "Hospitality operator",
        "other": "Other"
      },
      "errors": {
        "name": "Please enter your full name.",
        "email": "Please enter a valid email address.",
        "buyerType": "Please select your profile.",
        "country": "Please enter your country of residence or business.",
        "privacy": "Consent is required to send your enquiry."
      }
    },
    "privacy": {
      "title": "Privacy note",
      "updated": "Handling enquiries",
      "body": [
        "The form collects the contact details, profile and country of residence or business of the person requesting information about the estate, together with any company name, telephone number and message provided.",
        "These details are used to handle the enquiry and enable the person handling the sale to respond. They are not intended for marketing unrelated to the enquiry.",
        "Requests to access, correct or delete your data can be included in your message to the person handling the sale.",
        "The map uses external mapping services. Displaying it involves technical requests to those services."
      ]
    },
    "footer": {
      "geography": "Marina d'Albori · Vietri sul Mare · Amalfi Coast"
    },
    "diagram": {
      "coveLabel": "Marina d'Albori",
      "coveCaption": "Waterfront estate · Amalfi Coast",
      "residentialShort": "Residential",
      "commercialShort": "Commercial",
      "unitsNote": "independent units in total",
      "lemonCaption": "Lemon grove: approximately eight lemon trees, around seventy years old."
    },
    "skip": "Skip to content"
  },
  "it": {
    "meta": {
      "title": "Marina d'Albori | Proprietà fronte mare a Vietri sul Mare",
      "description": "Una proprietà fronte mare a Marina d'Albori, in Costiera Amalfitana: sette unità residenziali e commerciali, circa 900 m² interni e 300–350 m² di terrazze, con uso ricettivo e di ristorazione già in essere.",
      "ogTitle": "Marina d'Albori · Una proprietà fronte mare",
      "ogDescription": "Sette unità, terrazze sul mare e una cartiera storica del 1830 associata alla proprietà. Una presentazione della proprietà e del suo contesto a Vietri sul Mare.",
      "siteName": "Marina d'Albori"
    },
    "brand": {
      "kicker": "Proprietà in vendita",
      "wordmark": "Marina d'Albori",
      "placeLine": "Vietri sul Mare · Costiera Amalfitana"
    },
    "nav": {
      "overview": "Panoramica",
      "property": "Proprietà",
      "spaces": "Spazi",
      "location": "Posizione",
      "investment": "Usi",
      "heritage": "Storia",
      "gallery": "Fotografie",
      "request": "Contatti",
      "privacy": "Privacy",
      "menu": "Menu",
      "close": "Chiudi",
      "navigation": "Navigazione principale",
      "mobileNavigation": "Navigazione del menu",
      "footerNavigation": "Navigazione a fondo pagina",
      "breadcrumb": "Percorso di navigazione",
      "language": "Lingua"
    },
    "cta": {
      "request": "Richiedi informazioni",
      "requestDetails": "Scopri la proprietà",
      "requestInvestment": "Uso attuale e prospettive"
    },
    "hero": {
      "eyebrow": "Marina d'Albori",
      "title": "Una proprietà fronte mare, in Costiera Amalfitana.",
      "lead": "A Marina d'Albori, nel comune di Vietri sul Mare.",
      "scroll": "Continua"
    },
    "overview": {
      "kicker": "La proprietà",
      "title": "Sette unità, tra il versante e il mare.",
      "body": [
        "Cinque unità residenziali e due commerciali compongono la proprietà, distribuita sul versante che scende verso la cala. Le terrazze, gli affacci sull'acqua e la vegetazione mediterranea ne definiscono il contesto.",
        "Parte delle abitazioni è già destinata all'accoglienza turistica; è inoltre presente un'attività di ristorazione. Alla proprietà è associata una concessione stagionale di approdo e pontile."
      ]
    },
    "metrics": {
      "internalArea": "Superficie interna",
      "terraces": "Terrazze",
      "units": "Unità indipendenti",
      "composition": "Residenziali / commerciali",
      "seaAccess": "Posizione",
      "seaAccessValue": "Fronte mare"
    },
    "home": {
      "galleryCta": "Vedi le fotografie",
      "seaKicker": "Il fronte mare",
      "seaTitle": "La cala e l'approdo stagionale.",
      "seaBody": "Gli edifici e le terrazze si affacciano sulla cala. La concessione stagionale di approdo e pontile è un elemento da approfondire nella documentazione della proprietà.",
      "connectionsTitle": "Il contesto",
      "connections": [
        {
          "name": "Vietri sul Mare",
          "relation": "Il comune della proprietà, all'ingresso orientale della Costiera."
        },
        {
          "name": "Salerno",
          "relation": "Il riferimento per i collegamenti ferroviari e il contesto urbano."
        },
        {
          "name": "Costiera Amalfitana",
          "relation": "Il paesaggio costiero che si estende verso Cetara, Amalfi e Positano."
        }
      ],
      "dossierIntro": "Per approfondire la composizione della proprietà, la documentazione e le condizioni di vendita, è possibile contattare il referente della vendita.",
      "dossierMaterials": [
        "Composizione e superfici delle unità",
        "Planimetrie e documentazione tecnica",
        "Concessione stagionale di approdo e pontile",
        "Condizioni di vendita e possibilità di visita"
      ]
    },
    "property": {
      "kicker": "La proprietà",
      "title": "Un complesso fronte mare, in sette unità.",
      "intro": "Circa 900 m² di superficie interna e 300–350 m² di terrazze, con cinque unità residenziali e due commerciali. Una composizione che riunisce abitazioni, accoglienza turistica e ristorazione.",
      "factsLabel": "Dati principali",
      "compositionTitle": "Le unità",
      "areaNote": "Le superfici sono indicative. La ripartizione per unità e i dati di dettaglio vanno approfonditi nella documentazione della proprietà.",
      "units": [
        {
          "label": "Cinque unità residenziali",
          "detail": "Abitazioni indipendenti, in parte destinate all'accoglienza turistica."
        },
        {
          "label": "Due unità commerciali",
          "detail": "Spazi commerciali, con un'attività di ristorazione già presente."
        }
      ],
      "distinctTitle": "Gli elementi della proprietà",
      "distinct": [
        "La posizione fronte mare nella cala di Marina d'Albori.",
        "Le terrazze e gli affacci sull'acqua.",
        "L'uso ricettivo e di ristorazione già in essere.",
        "La concessione stagionale di approdo e pontile associata alla proprietà.",
        "Una cartiera storica del 1830 associata alla proprietà e un limoneto sui terrazzamenti."
      ]
    },
    "spaces": {
      "kicker": "Spazi",
      "title": "Spazi affacciati sul mare.",
      "deck": "Terrazze, ambienti residenziali e ceramica.",
      "intro": "Le fotografie raccontano la relazione fra gli edifici, gli spazi all'aperto e la cala, insieme agli ambienti delle unità residenziali.",
      "chapters": [
        {
          "title": "Gli edifici e la cala",
          "body": "Gli edifici bianchi seguono il versante fino al fronte mare. Le terrazze e i balconi scandiscono le facciate, con la cala e il pontile stagionale ai piedi del complesso."
        },
        {
          "title": "Le terrazze",
          "body": "Circa 300–350 m² complessivi di terrazze. Le immagini mostrano affacci sul Tirreno, spazi per il pranzo all'aperto e balconi incorniciati da archi."
        },
        {
          "title": "Gli ambienti residenziali",
          "body": "Soggiorni a volta, ambienti aperti e pavimenti in ceramica caratterizzano gli interni fotografati. La distribuzione e gli affacci variano fra le unità."
        },
        {
          "title": "Le camere",
          "body": "Le camere fotografate mostrano affacci verso il mare e i pini del versante. Parte delle unità residenziali è già utilizzata per l'accoglienza turistica."
        },
        {
          "title": "Ceramica e dettagli",
          "body": "Maioliche, mosaici e porte blu accompagnano gli ambienti e i percorsi interni. Sono dettagli che richiamano la tradizione ceramica di Vietri sul Mare."
        }
      ],
      "nextProperty": "Composizione e dati della proprietà"
    },
    "location": {
      "kicker": "Posizione",
      "title": "Marina d'Albori, tra Vietri e la Costiera.",
      "intro": "La proprietà si trova a Marina d'Albori, nel comune di Vietri sul Mare, sul tratto di costa che si apre verso il Golfo di Salerno.",
      "metaDescription": "La posizione della proprietà a Marina d'Albori: accesso pedonale a scale dalla strada, fronte mare e concessione stagionale di approdo e pontile. Il contesto di Vietri sul Mare, Salerno e dei principali collegamenti.",
      "accessPreview": {
        "land": {
          "kicker": "Da terra",
          "label": "Pedonale · percorso a scale dalla strada"
        },
        "sea": {
          "kicker": "Sul mare",
          "label": "Fronte mare · concessione stagionale di approdo e pontile"
        }
      },
      "topography": {
        "kicker": "Il paesaggio",
        "title": "Dal versante alla cala.",
        "body": "La strada costiera corre sopra la cala. Gli edifici e le terrazze si sviluppano lungo il versante, fino alla riva. Marina d'Albori è la località sul mare; il borgo di Albori si trova più in alto, nello stesso comune.",
        "strata": [
          {
            "label": "La strada",
            "note": "Il livello di arrivo da terra, sopra la cala."
          },
          {
            "label": "Il percorso",
            "note": "La discesa pedonale a scale verso gli edifici."
          },
          {
            "label": "La proprietà",
            "note": "Gli edifici, le terrazze e gli affacci sul mare."
          },
          {
            "label": "La riva",
            "note": "La cala e il pontile stagionale."
          }
        ]
      },
      "access": {
        "kicker": "Come si raggiunge",
        "title": "L'accesso alla proprietà.",
        "intro": "L'arrivo da terra avviene a piedi. Per l'approdo dal mare, il riferimento è la concessione stagionale associata alla proprietà.",
        "land": {
          "kicker": "Dalla strada",
          "title": "Il percorso pedonale",
          "label": "Pedonale · percorso a scale dalla strada",
          "body": "Un percorso a scale scende dal livello stradale lungo il versante verso la cala. Le caratteristiche del tragitto e la logistica di arrivo possono essere approfondite in vista di una visita."
        },
        "sea": {
          "kicker": "Dalla cala",
          "title": "L'approdo stagionale",
          "label": "Concessione stagionale di approdo e pontile",
          "body": "Alla proprietà è associata una concessione stagionale di approdo e pontile. Condizioni d'uso, stagionalità e caratteristiche dell'approdo vanno approfondite nella relativa documentazione."
        }
      },
      "connectivity": {
        "kicker": "Collegamenti",
        "title": "Strada, porti, ferrovia e aeroporti.",
        "intro": "Vietri sul Mare e Salerno sono i riferimenti per raggiungere questo tratto della Costiera e proseguire verso la proprietà.",
        "distanceNote": "Le distanze indicate sono approssimative e in linea d'aria dalla posizione della proprietà. Non esprimono tempi di viaggio.",
        "modes": [
          {
            "id": "road",
            "title": "Strada",
            "body": "La SS163 Amalfitana segue il versante sopra la cala. L'ultimo tratto verso gli edifici si percorre a piedi, lungo le scale."
          },
          {
            "id": "sea",
            "title": "Porti e collegamenti marittimi",
            "body": "I servizi marittimi della Costiera fanno riferimento ai porti e agli approdi del territorio. La concessione stagionale della proprietà va considerata separatamente da questi collegamenti."
          },
          {
            "id": "rail",
            "title": "Ferrovia",
            "body": "La stazione di Salerno collega il territorio alla rete ferroviaria nazionale, inclusa l'alta velocità."
          },
          {
            "id": "air",
            "title": "Aeroporti",
            "body": "Gli aeroporti di riferimento sono Salerno–Costa d'Amalfi e Napoli-Capodichino."
          }
        ]
      },
      "context": {
        "kicker": "La Costiera",
        "title": "Vietri, Salerno e la costa verso Amalfi.",
        "body": "Vietri sul Mare e Salerno si trovano a est della cala. Verso ovest la costa prosegue per Cetara, Maiori, Amalfi e Positano."
      },
      "distinctTitle": "Il contesto della proprietà",
      "distinct": [
        {
          "title": "La riva",
          "body": "La cala è il punto di incontro fra gli edifici, il versante e il mare."
        },
        {
          "title": "Il versante",
          "body": "Il dislivello fra la strada e la riva caratterizza la disposizione degli spazi e il percorso di arrivo."
        },
        {
          "title": "Il territorio",
          "body": "La proprietà appartiene al contesto di Vietri sul Mare, all'estremità orientale della Costiera Amalfitana."
        }
      ],
      "dossierLead": "Per approfondire accessi, planimetrie e concessione stagionale, è possibile richiedere informazioni al referente della vendita.",
      "mapCaption": "Marina d'Albori · Vietri sul Mare",
      "map": {
        "title": "La posizione",
        "ariaLabel": "Mappa della proprietà a Marina d'Albori, con Vietri sul Mare e Salerno.",
        "unavailableTitle": "La mappa non è disponibile al momento",
        "unavailableBody": "La proprietà si trova a Marina d'Albori, nel comune di Vietri sul Mare."
      },
      "mapLabels": {
        "vietri": "Vietri sul Mare",
        "salerno": "Salerno",
        "cetara": "Cetara",
        "salerno-station": "Stazione di Salerno",
        "qsr": "Aeroporto Salerno–Costa d'Amalfi",
        "nap": "Aeroporto di Napoli-Capodichino",
        "property": "La proprietà"
      }
    },
    "investment": {
      "kicker": "Usi e prospettive",
      "title": "L'uso attuale e le possibilità da valutare.",
      "intro": "La proprietà riunisce abitazioni, accoglienza turistica e spazi commerciali. Questa composizione offre più percorsi di valutazione, a partire dagli usi già presenti.",
      "presentTitle": "L'uso attuale",
      "present": [
        "Cinque unità residenziali indipendenti, in parte utilizzate per l'accoglienza turistica.",
        "Due unità commerciali, con un'attività di ristorazione già presente.",
        "Circa 900 m² di superficie interna e 300–350 m² di terrazze.",
        "Una concessione stagionale di approdo e pontile associata alla proprietà."
      ],
      "possibleTitle": "Prospettive da approfondire",
      "scenarios": [
        {
          "title": "Uso privato",
          "body": "La composizione in più abitazioni può essere valutata per un uso familiare e per ospiti. Le esigenze di collegamento fra gli spazi e gli eventuali interventi vanno approfonditi."
        },
        {
          "title": "Accoglienza e ristorazione",
          "body": "Gli usi ricettivi e di ristorazione già presenti costituiscono il punto di partenza per valutare la gestione della proprietà e le esigenze operative."
        },
        {
          "title": "Uso misto",
          "body": "La presenza di unità residenziali e commerciali consente di esaminare un'impostazione che affianchi uso personale e attività gestite."
        }
      ],
      "disclaimer": "Queste prospettive sono ipotesi da valutare sulla documentazione tecnica, urbanistica, catastale e concessoria. Eventuali modifiche d'uso o interventi richiedono le verifiche e le autorizzazioni applicabili."
    },
    "heritage": {
      "kicker": "Storia e carattere",
      "title": "La cartiera, il limoneto, la ceramica.",
      "intro": "Una cartiera storica del 1830 è associata alla proprietà. Il limoneto sui terrazzamenti e la ceramica degli interni ne completano il racconto.",
      "pageKicker": "Storia",
      "pageTitle": "Una storia di lavoro, paesaggio e ceramica.",
      "pageIntro": "La cartiera associata alla proprietà, gli alberi di limone e i dettagli degli interni legano questo luogo alla storia e al paesaggio di Vietri sul Mare.",
      "items": [
        {
          "year": "1830",
          "title": "La cartiera",
          "body": "Una cartiera storica associata alla proprietà risale al 1830."
        },
        {
          "title": "Il limoneto",
          "body": "Sui terrazzamenti del versante si trovano circa otto alberi di limone, di circa settant'anni. La coltivazione degli agrumi appartiene al paesaggio di questo tratto di costa."
        },
        {
          "title": "La ceramica di Vietri",
          "body": "Maioliche a pavimento, rivestimenti blu e bianchi e mosaici colorati caratterizzano gli interni fotografati, richiamando la tradizione ceramica di Vietri sul Mare."
        },
        {
          "title": "La cala",
          "body": "La riva e il versante orientano gli edifici e i loro affacci. Il mare resta il riferimento visivo degli spazi all'aperto."
        }
      ]
    },
    "gallery": {
      "kicker": "Fotografie",
      "title": "Dalla cala agli interni.",
      "intro": "Una selezione di immagini racconta il contesto fronte mare, le terrazze, gli ambienti residenziali e i dettagli della proprietà.",
      "groups": {
        "waterfront": "La cala e il fronte mare",
        "terraces": "Le terrazze",
        "interiors": "Gli ambienti residenziali",
        "hospitality": "Le camere e gli affacci",
        "details": "Ceramica e giardino"
      },
      "emptyTitle": "Le fotografie non sono disponibili al momento",
      "emptyBody": "È possibile richiedere informazioni sulla proprietà e sul materiale fotografico al referente della vendita.",
      "close": "Chiudi",
      "next": "Successiva",
      "previous": "Precedente"
    },
    "facts": {
      "kicker": "Dati della proprietà",
      "title": "Composizione e caratteristiche",
      "groups": {
        "location": "Posizione",
        "use": "Uso attuale",
        "waterfront": "Fronte mare e accesso",
        "landscape": "Paesaggio e storia"
      },
      "terms": {
        "locality": "Località",
        "municipality": "Comune",
        "coast": "Costa",
        "internalArea": "Superficie interna",
        "terraces": "Terrazze",
        "units": "Unità",
        "residentialUnits": "Unità residenziali",
        "commercialUnits": "Unità commerciali",
        "hospitality": "Accoglienza turistica",
        "restaurant": "Ristorazione",
        "lemonGarden": "Limoneto",
        "waterfront": "Posizione",
        "pontoon": "Approdo e pontile",
        "landAccess": "Accesso da terra",
        "paperMill": "Cartiera associata alla proprietà"
      }
    },
    "request": {
      "kicker": "Informazioni e visite",
      "title": "Approfondire la proprietà.",
      "intro": "Per domande sulla proprietà, sulla documentazione o sulla possibilità di una visita, indica i tuoi recapiti e ciò che desideri approfondire.",
      "confidentialNote": "I dati forniti vengono utilizzati per gestire la richiesta. Il referente della vendita potrà approfondire gli aspetti indicati nel messaggio.",
      "topicsTitle": "Cosa approfondire",
      "topics": [
        "Composizione delle unità, superfici e planimetrie",
        "Documentazione tecnica, urbanistica e catastale",
        "Concessione stagionale di approdo e pontile",
        "Uso attuale e aspetti gestionali",
        "Condizioni di vendita e possibilità di visita"
      ],
      "successTitle": "Richiesta inviata.",
      "successBody": "Grazie. La richiesta è stata inoltrata al referente della vendita, che potrà rispondere ai recapiti indicati.",
      "errorGeneric": "La richiesta non è stata inviata. Riprova tra poco.",
      "unavailable": "L'invio dal sito non è disponibile al momento. Puoi contattare la persona che ti ha condiviso questa presentazione.",
      "sending": "Invio in corso…",
      "submit": "Invia la richiesta",
      "required": "Obbligatorio",
      "buyerTypePrompt": "Seleziona il profilo",
      "messagePlaceholder": "Puoi indicare gli aspetti che desideri approfondire o il tuo interesse per una visita.",
      "nextTitle": "Dopo la richiesta",
      "steps": [
        "Il referente della vendita riceve i recapiti e il messaggio.",
        "Gli approfondimenti e i materiali disponibili vengono concordati in base alla richiesta.",
        "Una visita può essere organizzata con il referente della vendita."
      ],
      "privacyLink": "Leggi la nota sulla privacy",
      "fields": {
        "name": "Nome e cognome",
        "company": "Società o studio",
        "email": "Email",
        "phone": "Telefono",
        "phoneOptional": "facoltativo",
        "buyerType": "Profilo",
        "country": "Paese di residenza o sede",
        "message": "Domande o interesse",
        "privacy": "Acconsento al trattamento dei miei dati per gestire questa richiesta, come descritto nella nota sulla privacy."
      },
      "buyerTypes": {
        "privateBuyer": "Acquirente privato",
        "realEstateAgency": "Agenzia immobiliare",
        "investmentFund": "Fondo di investimento",
        "familyOffice": "Family office",
        "hospitalityOperator": "Operatore ricettivo",
        "other": "Altro"
      },
      "errors": {
        "name": "Inserisci il nome e cognome.",
        "email": "Inserisci un indirizzo email valido.",
        "buyerType": "Seleziona il profilo.",
        "country": "Inserisci il paese di residenza o sede.",
        "privacy": "Per inviare la richiesta è necessario il consenso."
      }
    },
    "privacy": {
      "title": "Nota sulla privacy",
      "updated": "Gestione delle richieste",
      "body": [
        "Il modulo raccoglie i recapiti, il profilo e il paese di residenza o sede di chi richiede informazioni sulla proprietà, insieme all'eventuale società, numero di telefono e messaggio.",
        "Le informazioni fornite sono utilizzate per gestire la richiesta e consentire al referente della vendita di rispondere. Non sono destinate ad attività di marketing estranee alla richiesta.",
        "Eventuali richieste di accesso, rettifica o cancellazione dei dati possono essere indicate nel messaggio al referente della vendita.",
        "La mappa utilizza servizi cartografici esterni. La sua visualizzazione comporta richieste tecniche a tali servizi."
      ]
    },
    "footer": {
      "geography": "Marina d'Albori · Vietri sul Mare · Costiera Amalfitana"
    },
    "diagram": {
      "coveLabel": "Marina d'Albori",
      "coveCaption": "Proprietà fronte mare · Costiera Amalfitana",
      "residentialShort": "Residenziali",
      "commercialShort": "Commerciali",
      "unitsNote": "unità indipendenti complessive",
      "lemonCaption": "Limoneto: circa otto alberi di limone, di circa settant'anni."
    },
    "skip": "Vai al contenuto"
  }
};

export function t(locale: Locale): Copy {
  return messages[locale];
}
