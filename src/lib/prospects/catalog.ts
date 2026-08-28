import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  prospectColumns,
  prospectPriorities,
  type Prospect,
  type ProspectPriority,
  type ProspectRecord,
} from "./schema.ts";
import { csvRowsToObjects, parseCsv } from "./csv.ts";
import { prospectIdFrom, uniqueSorted } from "./query.ts";

const DATA_DIR = join(process.cwd(), "data/real-estate-prospects");

let memo: Prospect[] | undefined;

export function prospectsDataDir(): string {
  return DATA_DIR;
}

export function loadProspects(): Prospect[] {
  if (process.env.NODE_ENV === "production" && memo) return memo;
  memo = readProspectFiles();
  return memo;
}

export function resetProspectsCache(): void {
  memo = undefined;
}

function readProspectFiles(): Prospect[] {
  const files = readdirSync(DATA_DIR)
    .filter((name) => name.endsWith(".csv") && !name.endsWith("-excluded.csv"))
    .sort();

  const used = new Map<string, number>();
  const prospects: Prospect[] = [];

  for (const file of files) {
    const text = readFileSync(join(DATA_DIR, file), "utf8");
    const rows = parseCsv(text);
    const header = rows[0] ?? [];
    assertHeader(file, header);

    for (const object of csvRowsToObjects(rows)) {
      const record = toRecord(object);
      if (!record.companyName) continue;
      prospects.push({ ...record, id: uniqueId(record, used) });
    }
  }

  return prospects.sort(compareProspects);
}

function assertHeader(file: string, header: string[]): void {
  const expected = prospectColumns as readonly string[];
  if (header.length !== expected.length || header.some((column, i) => column !== expected[i])) {
    throw new Error(`Unexpected CSV header in ${file}: ${header.join(",")}`);
  }
}

function toRecord(object: Record<string, string>): ProspectRecord {
  const score = object.fit_score?.trim() ?? "";
  const parsedScore = score === "" ? null : Number(score);
  const priority = object.priority?.trim() ?? "";

  return {
    country: object.country.trim(),
    city: object.city.trim(),
    companyName: object.company_name.trim(),
    type: object.type.trim(),
    contactName: object.contact_name.trim(),
    contactRole: object.contact_role.trim(),
    email: object.email.trim(),
    phone: object.phone.trim(),
    website: object.website.trim(),
    linkedinCompany: object.linkedin_company.trim(),
    linkedinContact: object.linkedin_contact.trim(),
    investmentFocus: object.investment_focus.trim(),
    geographicFocus: object.geographic_focus.trim(),
    buyerOriginRelevance: object.buyer_origin_relevance.trim(),
    italyInterest: object.italy_interest.trim(),
    amalfiCoastRelevance: object.amalfi_coast_relevance.trim(),
    estimatedTicket: object.estimated_ticket.trim(),
    luxuryRealEstate: object.luxury_real_estate.trim(),
    hospitalityInterest: object.hospitality_interest.trim(),
    fitScore: Number.isFinite(parsedScore) ? parsedScore : null,
    priority: isPriority(priority) ? priority : "",
    verificationStatus: object.verification_status.trim(),
    source1: object.source_1.trim(),
    source2: object.source_2.trim(),
    notes: object.notes.trim(),
    lastVerified: object.last_verified.trim(),
  };
}

function uniqueId(record: ProspectRecord, used: Map<string, number>): string {
  const base = prospectIdFrom(record);
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

function isPriority(value: string): value is ProspectPriority {
  return (prospectPriorities as readonly string[]).includes(value);
}

function compareProspects(a: Prospect, b: Prospect): number {
  return (
    a.country.localeCompare(b.country, "en") ||
    a.city.localeCompare(b.city, "en") ||
    a.companyName.localeCompare(b.companyName, "en") ||
    a.contactName.localeCompare(b.contactName, "en")
  );
}

export function catalogFacets(prospects: readonly Prospect[]): {
  countries: string[];
  types: string[];
} {
  return {
    countries: uniqueSorted(prospects.map((prospect) => prospect.country)),
    types: uniqueSorted(prospects.map((prospect) => prospect.type)),
  };
}
