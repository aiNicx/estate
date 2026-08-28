import { prospectTypes, type ProspectType } from "./schema.ts";

export const prospectsCopy = {
  pin: {
    kicker: "Archivio riservato",
    title: "Prospect",
    body: "Inserisci il PIN per aprire l’elenco contatti.",
    label: "PIN",
    submit: "Entra",
    error: "PIN non riconosciuto.",
  },
  desk: {
    kicker: "Archivio riservato",
    title: "Prospect",
    intro: "Contatti in anagrafica, con filtri per paese, città e tipologia.",
    lock: "Chiudi sessione",
    count: (visible: number, total: number) =>
      visible === total
        ? `${total} ${total === 1 ? "contatto" : "contatti"}`
        : `${visible} di ${total} ${total === 1 ? "contatto" : "contatti"}`,
    empty: "Nessun contatto con questi filtri.",
    select: "Seleziona un contatto per il dossier completo.",
    close: "Torna all’elenco",
    missing: "Contatto non trovato.",
  },
  filters: {
    country: "Paese",
    city: "Città",
    type: "Tipologia",
    allCountries: "Tutti i paesi",
    allCities: "Tutte le città",
    allTypes: "Tutte le tipologie",
    reset: "Azzera filtri",
  },
  detail: {
    identity: "Identità",
    people: "Contatto",
    fit: "Profilo",
    sources: "Fonti",
    notes: "Note",
  },
  fields: {
    country: "Paese",
    city: "Città",
    companyName: "Società",
    type: "Tipologia",
    contactName: "Nome",
    contactRole: "Ruolo",
    email: "Email",
    phone: "Telefono",
    website: "Sito",
    linkedinCompany: "LinkedIn società",
    linkedinContact: "LinkedIn contatto",
    investmentFocus: "Focus di investimento",
    geographicFocus: "Focus geografico",
    buyerOriginRelevance: "Origine buyer",
    italyInterest: "Interesse Italia",
    amalfiCoastRelevance: "Rilevanza Costiera",
    estimatedTicket: "Ticket stimato",
    luxuryRealEstate: "Immobiliare di lusso",
    hospitalityInterest: "Hospitality",
    fitScore: "Fit score",
    priority: "Priorità",
    verificationStatus: "Verifica",
    source1: "Fonte 1",
    source2: "Fonte 2",
    notes: "Note",
    lastVerified: "Ultimo controllo",
  },
  types: {
    luxury_agency: "Agenzia di lusso",
    private_office: "Private office",
    family_office: "Family office",
    real_estate_investor: "Investitore immobiliare",
    real_estate_fund: "Fondo immobiliare",
    private_equity_real_estate: "Private equity immobiliare",
    hospitality_investor: "Investitore hospitality",
    private_capital: "Capitale privato",
    international_property_advisor: "Advisor immobiliare internazionale",
    other_relevant: "Altro",
  } satisfies Record<ProspectType, string>,
  values: {
    strong: "Forte",
    moderate: "Moderata",
    weak: "Debole",
    unclear: "Non chiaro",
    yes: "Sì",
    no: "No",
    verified: "Verificato",
    partially_verified: "Parziale",
    needs_review: "Da rivedere",
  },
} as const;

export function typeLabel(type: string): string {
  if ((prospectTypes as readonly string[]).includes(type)) {
    return prospectsCopy.types[type as ProspectType];
  }
  return humanizeToken(type);
}

export function valueLabel(value: string): string {
  const known = prospectsCopy.values as Record<string, string>;
  return known[value] ?? value;
}

export function humanizeToken(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
