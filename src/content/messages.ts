import type { Locale } from "./property.ts";

/** Interface and privacy only. Editorial copy lives in brochure.ts. */
export const messages = {
  "en": {
    "nav": {
      "overview": "The property",
      "privacy": "Privacy",
      "menu": "Menu",
      "close": "Close",
      "navigation": "Main navigation",
      "mobileNavigation": "Menu navigation",
      "breadcrumb": "Breadcrumb navigation",
      "language": "Language"
    },
    "location": {
      "mapCaption": "Marina d’Albori · Vietri sul Mare",
      "map": {
        "title": "The location",
        "ariaLabel": "Map of the property at Marina d’Albori, with Vietri sul Mare and Salerno.",
        "unavailableTitle": "The map is currently unavailable",
        "unavailableBody": "The property is at Marina d’Albori, in the municipality of Vietri sul Mare."
      },
      "mapLabels": {
        "vietri": "Vietri sul Mare",
        "salerno": "Salerno",
        "cetara": "Cetara",
        "salerno-station": "Salerno station",
        "qsr": "Salerno Costa d’Amalfi Airport",
        "nap": "Naples Capodichino Airport",
        "property": "The property"
      }
    },
    "gallery": {
      "title": "From the beach to the interiors.",
      "close": "Close",
      "next": "Next",
      "previous": "Previous"
    },
    "privacy": {
      "title": "Privacy and contact",
      "updated": "About this presentation",
      "body": [
        "This presentation has no contact form. To request documents or a visit, reply to the email in which you received the link. Your reply is sent through your email service to that sender.",
        "For information about the handling of your correspondence, including who is responsible for your data and how to request access, correction or deletion, contact the person who sent you the presentation.",
        "The map loads external mapping resources from OpenFreeMap and AWS Terrain Tiles. Displaying it sends technical requests, including the visitor’s IP address, to those services. Opening the Google Maps link takes you to an external service."
      ]
    },
    "skip": "Skip to content"
  },
  "it": {
    "nav": {
      "overview": "La proprietà",
      "privacy": "Privacy",
      "menu": "Menu",
      "close": "Chiudi",
      "navigation": "Navigazione principale",
      "mobileNavigation": "Navigazione del menu",
      "breadcrumb": "Percorso di navigazione",
      "language": "Lingua"
    },
    "location": {
      "mapCaption": "Marina d’Albori · Vietri sul Mare",
      "map": {
        "title": "La posizione",
        "ariaLabel": "Mappa della proprietà a Marina d’Albori, con Vietri sul Mare e Salerno.",
        "unavailableTitle": "La mappa non è disponibile al momento",
        "unavailableBody": "La proprietà si trova a Marina d’Albori, nel comune di Vietri sul Mare."
      },
      "mapLabels": {
        "vietri": "Vietri sul Mare",
        "salerno": "Salerno",
        "cetara": "Cetara",
        "salerno-station": "Stazione di Salerno",
        "qsr": "Aeroporto di Salerno Costa d’Amalfi",
        "nap": "Aeroporto di Napoli Capodichino",
        "property": "La proprietà"
      }
    },
    "gallery": {
      "title": "Dalla spiaggia agli interni.",
      "close": "Chiudi",
      "next": "Successiva",
      "previous": "Precedente"
    },
    "privacy": {
      "title": "Privacy e contatto",
      "updated": "Questa presentazione",
      "body": [
        "Questa presentazione non contiene un modulo di contatto. Per chiedere documenti o una visita, rispondi all’email con cui hai ricevuto il link. La risposta viene inviata attraverso il tuo servizio email al mittente di quel messaggio.",
        "Per informazioni sul trattamento della corrispondenza, sul soggetto responsabile dei dati e su come richiederne accesso, rettifica o cancellazione, rivolgiti a chi ti ha inviato la presentazione.",
        "La mappa carica risorse cartografiche esterne di OpenFreeMap e AWS Terrain Tiles. La visualizzazione invia a questi servizi richieste tecniche che comprendono l’indirizzo IP del visitatore. Il collegamento a Google Maps apre un servizio esterno."
      ]
    },
    "skip": "Vai al contenuto"
  }
} as const;

export function t(locale: Locale) { return messages[locale]; }
