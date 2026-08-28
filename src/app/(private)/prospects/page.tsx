import { hasProspectsSession } from "./actions";
import { UnlockForm } from "./UnlockForm";
import { ProspectsDesk } from "./ProspectsDesk";
import { loadProspects, catalogFacets } from "@/lib/prospects/catalog";
import { citiesForCountry, filterProspects, parseProspectsSearch } from "@/lib/prospects/query";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProspectsPage({ searchParams }: PageProps) {
  const unlocked = await hasProspectsSession();
  if (!unlocked) return <UnlockForm />;

  const search = parseProspectsSearch(await searchParams);
  const all = loadProspects();
  const facets = catalogFacets(all);
  const rows = filterProspects(all, search);
  const selected = search.id ? (all.find((prospect) => prospect.id === search.id) ?? null) : null;

  return (
    <ProspectsDesk
      search={search}
      countries={facets.countries}
      cities={citiesForCountry(all, search.country)}
      types={facets.types}
      rows={rows}
      selected={selected}
      totalCount={all.length}
    />
  );
}
