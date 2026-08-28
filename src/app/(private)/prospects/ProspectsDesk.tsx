"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import type { Prospect } from "@/lib/prospects/schema";
import type { ProspectsSearch } from "@/lib/prospects/query";
import { prospectsHref } from "@/lib/prospects/query";
import { prospectsCopy, typeLabel, valueLabel } from "@/lib/prospects/copy";
import { lockProspects } from "./actions";

export function ProspectsDesk({
  search,
  countries,
  cities,
  types,
  rows,
  selected,
  totalCount,
}: {
  search: ProspectsSearch;
  countries: string[];
  cities: string[];
  types: string[];
  rows: Prospect[];
  selected: Prospect | null;
  totalCount: number;
}) {
  const copy = prospectsCopy;
  const router = useRouter();
  const filtersActive = Boolean(search.country || search.city || search.type);
  const listHref = prospectsHref({ ...search, id: "" });

  useEffect(() => {
    if (!search.id) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push(listHref);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search.id, listHref, router]);

  function replaceFilters(next: Partial<ProspectsSearch>) {
    router.replace(prospectsHref({ ...search, id: "", ...next }));
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,white)]">
        <div className="shell flex flex-wrap items-end justify-between gap-4 py-5">
          <div>
            <p className="kicker mb-2">{copy.desk.kicker}</p>
            <h1 className="display m-0 text-3xl">{copy.desk.title}</h1>
          </div>
          <form action={lockProspects}>
            <button className="btn btn-ghost" type="submit">
              {copy.desk.lock}
            </button>
          </form>
        </div>
      </header>

      <div className="shell grid flex-1 gap-0 lg:grid-cols-[minmax(24rem,0.92fr)_minmax(0,1.08fr)]">
        <section
          className={`border-[var(--line)] py-8 lg:border-r lg:pr-8 ${selected ? "hidden lg:block" : ""}`}
        >
          <p className="lede mt-0">{copy.desk.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <label className="form-field mb-0">
              <span>{copy.filters.country}</span>
              <select
                value={search.country}
                onChange={(event) =>
                  replaceFilters({ country: event.target.value, city: "" })
                }
              >
                <option value="">{copy.filters.allCountries}</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field mb-0">
              <span>{copy.filters.city}</span>
              <select
                value={search.city}
                onChange={(event) => replaceFilters({ city: event.target.value })}
              >
                <option value="">{copy.filters.allCities}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field mb-0">
              <span>{copy.filters.type}</span>
              <select
                value={search.type}
                onChange={(event) => replaceFilters({ type: event.target.value })}
              >
                <option value="">{copy.filters.allTypes}</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {typeLabel(type)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--ink-soft)]">
            <p className="m-0">{copy.desk.count(rows.length, totalCount)}</p>
            {filtersActive ? (
              <Link href="/prospects" className="text-[var(--sea)]" scroll={false}>
                {copy.filters.reset}
              </Link>
            ) : null}
          </div>

          {rows.length === 0 ? (
            <p className="mt-8 text-[var(--ink-soft)]">{copy.desk.empty}</p>
          ) : (
            <ul className="mt-6 list-none p-0">
              {rows.map((prospect) => {
                const current = selected?.id === prospect.id;
                return (
                  <li key={prospect.id} className="border-b border-[var(--line)]">
                    <Link
                      href={prospectsHref({ ...search, id: prospect.id })}
                      scroll={false}
                      prefetch={false}
                      className={`block no-underline hover:bg-[var(--white)] ${current ? "bg-[var(--white)]" : ""}`}
                      aria-current={current ? "page" : undefined}
                    >
                      <article className="px-3 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h2 className="display m-0 text-xl">{prospect.companyName}</h2>
                          <p className="m-0 text-xs tracking-[0.12em] uppercase text-[var(--ink-soft)]">
                            {typeLabel(prospect.type)}
                            {prospect.priority ? ` · ${prospect.priority}` : ""}
                            {prospect.fitScore != null ? ` · ${prospect.fitScore}` : ""}
                          </p>
                        </div>
                        <p className="mt-1 mb-0 text-sm">
                          {prospect.contactName || "—"}
                          {prospect.contactRole ? ` · ${prospect.contactRole}` : ""}
                        </p>
                        <p className="mt-1 mb-0 text-sm text-[var(--ink-soft)]">
                          {prospect.city}, {prospect.country}
                          {prospect.email ? ` · ${prospect.email}` : ""}
                          {prospect.phone ? ` · ${prospect.phone}` : ""}
                        </p>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <aside className={`py-8 lg:pl-10 ${selected ? "" : "hidden lg:block"}`}>
          {selected ? (
            <ProspectDetail prospect={selected} backHref={listHref} />
          ) : search.id ? (
            <p className="text-[var(--ink-soft)]">{copy.desk.missing}</p>
          ) : (
            <p className="text-[var(--ink-soft)]">{copy.desk.select}</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function ProspectDetail({
  prospect,
  backHref,
}: {
  prospect: Prospect;
  backHref: string;
}) {
  const copy = prospectsCopy;

  return (
    <article>
      <p>
        <Link href={backHref} className="text-sm text-[var(--sea)]" scroll={false}>
          ← {copy.desk.close}
        </Link>
      </p>
      <p className="kicker">{typeLabel(prospect.type)}</p>
      <h2 className="display mt-0 text-[clamp(1.8rem,4vw,2.8rem)]">{prospect.companyName}</h2>
      <p className="lede">
        {[prospect.city, prospect.country].filter(Boolean).join(", ")}
      </p>

      <DetailSection title={copy.detail.identity}>
        <Fact label={copy.fields.companyName} value={prospect.companyName} />
        <Fact label={copy.fields.type} value={typeLabel(prospect.type)} />
        <Fact label={copy.fields.country} value={prospect.country} />
        <Fact label={copy.fields.city} value={prospect.city} />
      </DetailSection>

      <DetailSection title={copy.detail.people}>
        <Fact label={copy.fields.contactName} value={prospect.contactName} />
        <Fact label={copy.fields.contactRole} value={prospect.contactRole} />
        <Fact label={copy.fields.email} value={prospect.email} href={mailHref(prospect.email)} />
        <Fact label={copy.fields.phone} value={prospect.phone} href={telHref(prospect.phone)} />
        <Fact label={copy.fields.website} value={prospect.website} href={prospect.website} />
        <Fact
          label={copy.fields.linkedinCompany}
          value={prospect.linkedinCompany}
          href={prospect.linkedinCompany}
        />
        <Fact
          label={copy.fields.linkedinContact}
          value={prospect.linkedinContact}
          href={prospect.linkedinContact}
        />
      </DetailSection>

      <DetailSection title={copy.detail.fit}>
        <Fact label={copy.fields.investmentFocus} value={prospect.investmentFocus} />
        <Fact label={copy.fields.geographicFocus} value={prospect.geographicFocus} />
        <Fact
          label={copy.fields.buyerOriginRelevance}
          value={valueLabel(prospect.buyerOriginRelevance)}
        />
        <Fact label={copy.fields.italyInterest} value={valueLabel(prospect.italyInterest)} />
        <Fact
          label={copy.fields.amalfiCoastRelevance}
          value={valueLabel(prospect.amalfiCoastRelevance)}
        />
        <Fact label={copy.fields.estimatedTicket} value={prospect.estimatedTicket} />
        <Fact
          label={copy.fields.luxuryRealEstate}
          value={valueLabel(prospect.luxuryRealEstate)}
        />
        <Fact
          label={copy.fields.hospitalityInterest}
          value={valueLabel(prospect.hospitalityInterest)}
        />
        <Fact
          label={copy.fields.fitScore}
          value={prospect.fitScore != null ? String(prospect.fitScore) : ""}
        />
        <Fact label={copy.fields.priority} value={prospect.priority} />
        <Fact
          label={copy.fields.verificationStatus}
          value={valueLabel(prospect.verificationStatus)}
        />
      </DetailSection>

      <DetailSection title={copy.detail.sources}>
        <Fact label={copy.fields.source1} value={prospect.source1} href={prospect.source1} />
        <Fact label={copy.fields.source2} value={prospect.source2} href={prospect.source2} />
        <Fact label={copy.fields.lastVerified} value={prospect.lastVerified} />
      </DetailSection>

      <DetailSection title={copy.detail.notes}>
        <Fact label={copy.fields.notes} value={prospect.notes} multiline />
      </DetailSection>
    </article>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h3 className="display mt-0 text-2xl">{title}</h3>
      <table className="facts">
        <tbody>{children}</tbody>
      </table>
    </section>
  );
}

function Fact({
  label,
  value,
  href,
  multiline,
}: {
  label: string;
  value: string;
  href?: string;
  multiline?: boolean;
}) {
  const display = value || "—";
  const link = href && isSafeHref(href) ? href : null;
  return (
    <tr>
      <th>{label}</th>
      <td className={multiline ? "whitespace-pre-wrap" : ""}>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer">
            {display}
          </a>
        ) : (
          display
        )}
      </td>
    </tr>
  );
}

function mailHref(email: string): string | undefined {
  return email.includes("@") ? `mailto:${email}` : undefined;
}

function telHref(phone: string): string | undefined {
  const compact = phone.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : undefined;
}

function isSafeHref(value: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(value);
}
