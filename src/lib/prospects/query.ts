import type { Prospect, ProspectFilters } from "./schema.ts";

export type ProspectsSearch = ProspectFilters & { id: string };

export function emptyFilters(): ProspectFilters {
  return { country: "", city: "", type: "" };
}

export function parseProspectsSearch(
  input: Record<string, string | string[] | undefined>,
): ProspectsSearch {
  return {
    country: readParam(input.country),
    city: readParam(input.city),
    type: readParam(input.type),
    id: readParam(input.id),
  };
}

export function filterProspects(
  prospects: readonly Prospect[],
  filters: ProspectFilters,
): Prospect[] {
  return prospects.filter((prospect) => {
    if (filters.country && prospect.country !== filters.country) return false;
    if (filters.city && prospect.city !== filters.city) return false;
    if (filters.type && prospect.type !== filters.type) return false;
    return true;
  });
}

export function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "en"));
}

export function citiesForCountry(
  prospects: readonly Prospect[],
  country: string,
): string[] {
  const pool = country
    ? prospects.filter((prospect) => prospect.country === country)
    : prospects;
  return uniqueSorted(pool.map((prospect) => prospect.city));
}

export function prospectsHref(search: Partial<ProspectsSearch>): string {
  const params = new URLSearchParams();
  if (search.country) params.set("country", search.country);
  if (search.city) params.set("city", search.city);
  if (search.type) params.set("type", search.type);
  if (search.id) params.set("id", search.id);
  const query = params.toString();
  return query ? `/prospects?${query}` : "/prospects";
}

export function slugPart(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "item";
}

export function prospectIdFrom(record: {
  country: string;
  city: string;
  companyName: string;
  contactName: string;
  type: string;
}): string {
  return [
    slugPart(record.country),
    slugPart(record.companyName),
    slugPart(record.contactName || record.type),
    slugPart(record.city),
  ].join("-");
}

function readParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? "";
  return value?.trim() ?? "";
}
