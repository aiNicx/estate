#!/usr/bin/env python3
"""Generate verified Russia-origin buyer/introducer prospect CSVs.

Qualified rows follow the same schema as united-arab-emirates.csv.
Excluded rows capture named-firm screening outcomes and other rejects.
"""

from __future__ import annotations

import csv
from pathlib import Path

LAST_VERIFIED = "2026-08-27"

QUALIFIED_HEADERS = [
    "country",
    "city",
    "company_name",
    "type",
    "contact_name",
    "contact_role",
    "email",
    "phone",
    "website",
    "linkedin_company",
    "linkedin_contact",
    "investment_focus",
    "geographic_focus",
    "estimated_ticket",
    "italy_interest",
    "luxury_real_estate",
    "hospitality_interest",
    "fit_score",
    "verification_status",
    "source_1",
    "source_2",
    "notes",
    "last_verified",
]

EXCLUDED_HEADERS = [
    "company_name",
    "city",
    "type",
    "exclusion_reason",
    "source_1",
    "source_2",
    "notes",
    "last_verified",
]

QUALIFIED_ROWS = [
    {
        "country": "Russia",
        "city": "Moscow",
        "company_name": "UFG Wealth Management",
        "type": "family_office",
        "contact_name": "Andrey Rozov",
        "contact_role": "Head of Real Estate",
        "email": "info@ufgwm.com",
        "phone": "+7 495 230 09 04",
        "website": "https://www.ufgwm.com",
        "linkedin_company": "https://www.linkedin.com/company/ufg-w-m",
        "linkedin_contact": "https://www.linkedin.com/in/andrey-rozov-05411182",
        "investment_focus": "Multi-family office for Russian UHNW clients; dedicated commercial real-estate search, purchase, sale and management in Europe",
        "geographic_focus": "Europe (published Luxembourg commercial case); offices in Moscow, Umm Al Quwain, Cyprus, UK and the Netherlands",
        "estimated_ticket": "unknown; firm states clients invested about EUR 700 million in European commercial real estate over 7 years (aggregate, not a per-deal ticket)",
        "italy_interest": "unclear",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "verification_status": "verified",
        "source_1": "https://www.ufgwm.com/commercial-real-estate",
        "source_2": "https://www.ufgwm.com/about-ufg",
        "notes": "Best evidenced Russian-origin multi-family office with an international real-estate desk. Official commercial-RE page states clients invested approximately EUR 700 million in European commercial property over 7 years and describes off-market search, bank negotiation and asset management; a published case is a Class A Luxembourg office building. Awards history includes SPEAR'S Russia Best Family Office and Chambers HNW. Official site publishes info@ufgwm.com and a sanctions/AML compliance statement (UN/EU/OFAC/OFSI). HQ is now listed as Umm Al Quwain with a Moscow office at Tsvetnoy Blvd 2. Andrey Rozov is Head of Real Estate on his public LinkedIn (from Jan 2014); Artyom Korsovskiy is listed as Investment Director, Real Estate on the company LinkedIn. Phone is from the company LinkedIn, not the website. Not found as an EU/US/UK designated entity in this review. Caveats: published product is commercial European real estate, not Italian trophy residential; Rozov has unrelated historical press around IC Expert / a 2014-15 New York office flip (not a sanctions listing). Fit is as a Russian UHNW introducer/allocator into European property, not as a proven Amalfi buyer.",
    },
    {
        "country": "Russia",
        "city": "Moscow",
        "company_name": "Russia Sotheby's International Realty",
        "type": "other_relevant",
        "contact_name": "Elena Bashkatova",
        "contact_role": "Senior real estate / investment-migration consultant",
        "email": "ebashkatova@sothebys-realty.ru",
        "phone": "+7 903 709 5493",
        "website": "https://www.sothebys-realty.ru",
        "linkedin_company": "https://www.linkedin.com/company/russia-sothebys-international-realty",
        "linkedin_contact": "",
        "investment_focus": "UHNW overseas luxury residential (apartments, villas, residences and hotel projects) plus residence/citizenship-by-investment advisory",
        "geographic_focus": "Global Sotheby's International Realty network; company materials list Italy among coverage countries; Moscow office at 1st Kolobovsky Lane 17/1",
        "estimated_ticket": "unknown",
        "italy_interest": "yes",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "verification_status": "verified",
        "source_1": "https://events.sothebys-realty.ru/property_20260520",
        "source_2": "https://www.homesoverseas.ru/eng/companies/Russia_Sothebys_International_Realty",
        "notes": "Russian-speaking Sotheby's International Realty affiliate serving exceptional/overseas buyers, i.e. a UHNW intermediary rather than principal capital. Official events page publishes Elena Bashkatova, +7 903 709-5493 and ebashkatova@sothebys-realty.ru. HomesOverseas company profile lists Italy among countries the office works with and describes EU/US/Caribbean investment-migration plus luxury foreign property. Do not confuse with Italy Sotheby's International Realty (Milan), which is an Italian affiliate with no Russian-origin capital. Company LinkedIn also lists request@sothebys-realty.ru as a general inbox. Strongest trophy-residential match in this set because the mandate is luxury villas/residences via a network that includes Italian coastal stock. No public evidence of a closed Amalfi transaction.",
    },
    {
        "country": "Russia",
        "city": "Moscow",
        "company_name": "NF GROUP",
        "type": "other_relevant",
        "contact_name": "Anna Larina",
        "contact_role": "Director, International and Resort Real Estate Department",
        "email": "ms@nfgroup.ru",
        "phone": "+7 495 151 90 00",
        "website": "https://nf.group",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Luxury and foreign residential brokerage plus commercial/hotel consulting; dedicated overseas and resort-property desk for private and corporate clients",
        "geographic_focus": "Moscow HQ (Mercury Tower); offices in St Petersburg, Dubai, Istanbul, Cyprus and Bali; international department lists Italy among 70+ countries",
        "estimated_ticket": "unknown",
        "italy_interest": "yes",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "7",
        "verification_status": "verified",
        "source_1": "https://nf.group/department-international",
        "source_2": "https://kf.expert/en/about",
        "notes": "Former Knight Frank Russia, now NF GROUP. Official international/resort department page is led by Anna Larina and lists Italy in its country set, alongside villas in resort locations, commercial including hotels, and EU residence-by-investment advice. kf.expert about page names Anna Larina as Director of Foreign Real Estate Department and publishes ms@nfgroup.ru for that desk; kf.expert luxury homepage publishes nf@nfgroup.ru and +7 495 151-90-00. This is a buyer-rep/introducer into Russian UHNW and HNW clients, not a principal fund. Published exclusive international examples on the department page are Spain, London, Cyprus, Turkey, UAE, Bali and the Maldives rather than Amalfi; Italy is listed geographically but no Amalfi closing is evidenced. General Moscow switchboard on nf.group/contacts also shows +7 495 021-05-75 for office passes.",
    },
    {
        "country": "Russia",
        "city": "Moscow",
        "company_name": "Intermark Real Estate",
        "type": "other_relevant",
        "contact_name": "Olga Katrich",
        "contact_role": "Director, International Projects Department (Intermark Investments); also Global Director of Immigration at Intermark Global (Dubai)",
        "email": "info@intermark.ru",
        "phone": "+7 495 252 00 99",
        "website": "https://intermark.ru/en",
        "linkedin_company": "https://www.linkedin.com/company/intermark-realestate",
        "linkedin_contact": "https://www.linkedin.com/in/olga-katrich-a88959346",
        "investment_focus": "Prime Moscow and overseas residential; international investment team for Western Europe/UK/US/UAE; immigration-linked property",
        "geographic_focus": "Moscow (formerly Savills Russia 2006-2022); overseas materials explicitly include Italy; related Intermark Global office in Dubai",
        "estimated_ticket": "overseas investment examples from USD 150,000 (income apartments) and from USD 1,000,000 (value-add projects); trophy-home ticket unknown",
        "italy_interest": "yes",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "verification_status": "verified",
        "source_1": "https://intermark.ru/en/company/services/property-sales/international-property",
        "source_2": "https://intermark.ru/en/company/our-managers/olga-katrich",
        "notes": "Long-standing Moscow prime agency (1993; Savills-branded 2006-2022) advising Russian private clients on overseas luxury property. Official international-sales page lists France, Italy, Austria, Switzerland and the USA among overseas residential markets. Olga Katrich's official manager page states personal knowledge of Italy, France and the Netherlands and publishes +7 495 252 00 99; no personal email is on that page, so the site footer inbox info@intermark.ru is used (sales_web@intermark.ru also appears in site materials). Related Intermark Global (https://intermark.global/contacts) is the Dubai international/immigration arm: client@intermark.global, +971 4 439 6368, Emaar Square Building 6; partner materials mention Italian residence-permit routes. Treat as one introducer group, not two capital sources. No public Amalfi closing evidenced.",
    },
    {
        "country": "United Kingdom",
        "city": "London",
        "company_name": "VIY Management (VIYM)",
        "type": "private_equity_real_estate",
        "contact_name": "Andrey Yakunin",
        "contact_role": "Co-founder and partner",
        "email": "info@viym.co.uk",
        "phone": "+44 20 7495 4330",
        "website": "https://www.andreyyakunin.com/about",
        "linkedin_company": "https://www.linkedin.com/company/viy-management-llp",
        "linkedin_contact": "",
        "investment_focus": "European urban hospitality and mixed-use real estate with branded operators; historically also CIS mid-cap PE",
        "geographic_focus": "London HQ (historically also Luxembourg AIFM, Moscow and St Petersburg); documented Italian hospitality in Umbria; other European hotels in Vienna and Davos",
        "estimated_ticket": "Mergr profile: real-estate practice historically targeted EUR 20-75 million; Umbria Antognolla reconstruction was reported at EUR 150 million-plus. Above a EUR 6-12 million residential ticket as a fund; unknown as a personal UHNW bid",
        "italy_interest": "yes",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "verification_status": "partially_verified",
        "source_1": "https://www.andreyyakunin.com/about",
        "source_2": "https://en.wikipedia.org/wiki/Andrey_Yakunin",
        "notes": "Only named Russian-origin hospitality principal in this review with documented Italian hotel/resort investment who is not on EU, US or UK sanctions lists as of OpenSanctions entity Q19975571 (PEP/close associate of sanctioned father Vladimir Yakunin; ACF person of interest). Co-founded VIYM in 2006. Vedomosti (2016) reported VIY Greater Europe Hospitality Fund taking a majority stake in the Antognolla Umbria estate with planned investment above EUR 150 million. Personal site and 2025 press say Six Senses Antognolla / the Umbria estate was sold in October 2025 to Mohamed Alabbar. Yakunin states he publicly opposed the 2022 invasion and exited remaining Russian-entity roles; he has lived in Italy. Email/phone are widely republished (Mergr/LinkedIn/RocketReach) against historic domain viym.co.uk, which currently 404s; LinkedIn lists homepage viymanagement.com. KYC: family link to a designated person requires independent legal screening before any approach. Current acquisition appetite after the 2025 Italy exit is unknown. More plausible as a hospitality/mixed-use conversation or a personal UHNW bid than as a PE fund writing EUR 6-12 million.",
    },
]

EXCLUDED_ROWS = [
    {
        "company_name": "AFK Sistema / Cosmos Hotel Group",
        "city": "Moscow",
        "type": "hospitality_investor",
        "exclusion_reason": "EU/UK sanctions on founder Vladimir Yevtushenkov; UK designation of AFK Sistema. Not an outreach target.",
        "source_1": "https://data.europa.eu/apps/eusanctionstracker/subjects/173163",
        "source_2": "https://en.wikipedia.org/wiki/Vladimir_Yevtushenkov",
        "notes": "Market context only: Cosmos historically included Principe Forte dei Marmi (Tuscany coast) and Savoy Westend (Karlovy Vary). Current public posture is domestic: Vedomosti 4 Aug 2026 reported a ~RUB 700 billion / 100-hotel Russia build-out and a possible Cosmos IPO. 2023 Wenaas deal was ten hotels inside Russia (~EUR 203 million). Do not approach Sistema, Cosmos or Yevtushenkov as buyers.",
    },
    {
        "company_name": "A1 Investment Company (Alfa Group)",
        "city": "Moscow",
        "type": "private_capital",
        "exclusion_reason": "US OFAC SDN (14 Sep 2023, EO 14024) for operating in Russian financial services. Former Alfa Group principals (Fridman, Khan, Kuzmichev, Aven) are widely designated. Not an outreach target.",
        "source_1": "https://www.opensanctions.org/entities/NK-Y8MoLpTdgiK9w5bXm2osua/",
        "source_2": "https://www.bailii.org/ew/cases/EWHC/Ch/2024/1048.pdf",
        "notes": "EWHC (Ch) 2024/1048 records A1 as US-sanctioned from 14 Sep 2023 while not itself an EU/UK designated person; Alfa-Bank is a designated person. Current public narrative is an 'Eastern pivot' (Middle East/Asia into Russia), not European trophy real estate. Historic London super-prime lending was LetterOne/Alfa, not a current A1 Italy desk.",
    },
    {
        "company_name": "Gleden Invest / AZIMUT Hotels (Alexander Klyachin)",
        "city": "Moscow",
        "type": "hospitality_investor",
        "exclusion_reason": "Current mandate is Russia-centric after a full European hotel exit; no Italy evidence. Not a realistic EUR 6-12 million Amalfi buyer today.",
        "source_1": "https://www.rbc.ru/business/22/01/2025/678fd94d9a79474c06a5108d",
        "source_2": "https://www.opensanctions.org/entities/Q28498303/",
        "notes": "AZIMUT entered Austria/Germany/Czechia in 2008 (about 20 hotels from Austrian Hotel Company). RBC 22 Jan 2025: CEO Maxim Brodovsky said European assets were agreed in 2023 and sold to Premier Inn. Current AZIMUT site emphasises 70+ hotels mainly in Russia plus new Central Asia management. Klyachin is on Ukraine's NSDC list and the 2018 CAATSA oligarch report but was not found on EU/US/UK designation lists in this review. Ukraine-only listing is not the user's EU/US/UK outreach bar; exclusion is for current geographic/ticket fit, not that bar. Do not treat as a live European hospitality acquirer.",
    },
    {
        "company_name": "Elbrus Capital (Moscow PE)",
        "city": "Moscow",
        "type": "private_capital",
        "exclusion_reason": "Growth PE in consumer/tech/CIS, not real estate, hospitality or European trophy homes.",
        "source_1": "https://elbcp.com/team/",
        "source_2": "https://mergr.com/investor/elbrus-capital",
        "notes": "Official site elbcp.com: FSU growth PE, 110+ acquisitions, controlling/significant-minority stakes in operating companies. Mergr lists Moscow HQ and ~USD 1bn AUM. Distinct from unrelated New York broker Elbrus Capital Group and from London FCA firm Elbrus Capital Partners LLP.",
    },
    {
        "company_name": "Baring Vostok Capital Partners / Vostok Investments",
        "city": "Moscow",
        "type": "private_capital",
        "exclusion_reason": "Historic CIS private equity (Yandex, Ozon, etc.), not real estate/hospitality/Europe trophy. Post-2022 split; not a buyer channel for this asset.",
        "source_1": "https://alphabet.pro/en/news/baring-vostok-yet-to-fully-exit-russian-assets-despite-announced-withdrawal",
        "source_2": "https://mergr.com/transaction/jsc-pharmstandard-invests-in-european-medical-center-emc",
        "notes": "Typical historical cheques USD 30-200 million into operating companies. 'European Medical Center' in coverage is a Moscow hospital operator, not European real estate.",
    },
    {
        "company_name": "Da Vinci Capital",
        "city": "London",
        "type": "private_capital",
        "exclusion_reason": "Tech/growth PE (EPAM, DataArt, Gett, Softline). No real-estate or hospitality mandate.",
        "source_1": "https://www.prnewswire.com/news-releases/da-vinci-capital-invests-in-global-technology-consultancy-dataart-300748184.html",
        "source_2": "https://www.linkedin.com/company/da-vinci-capital-management",
        "notes": "London/Guernsey manager with a historic Russia/CIS tech book. Unrelated to Arizona brokerage da Vinci Realty.",
    },
    {
        "company_name": "Investservice SFO S.r.l. (Aleksei Migushov)",
        "city": "Milan",
        "type": "family_office",
        "exclusion_reason": "Italian-registered 2023 boutique advisory; founder name is Russian, but no public evidence this is Russian-origin UHNW capital or a principal buyer.",
        "source_1": "https://www.investservice.ch/",
        "source_2": "https://www.aziende.it/investservice-sfo-s-r-l",
        "notes": "Official site: family office founded by Aleksei Migushov; real-estate advisory in Italy and Germany. Italian register: incorporated 7 Jul 2023, Milan, P.IVA 13050760969, 2024 revenue EUR 551,374, loss EUR 28,226, share capital EUR 100,000, ATECO 70.22.09 (management consulting). PEC investoservicesfo@pec.it is a legal address, not a proven sales inbox. No public client names, tickets or Russian UHNW principals. Treat as an unproven Italy/Germany advisor, not as qualified Russian capital. Do not invent a general email or mobile; those were not on the official pages reviewed.",
    },
    {
        "company_name": "Alfa Capital",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Alfa-group financial platform: related Alfa-Bank/Alfa Capital Markets are US-designated; public real-estate products are Russian ZPIFs and UAE residential, not Italy trophy access.",
        "source_1": "https://www.alfacapital.ru/realty",
        "source_2": "https://home.treasury.gov/news/press-releases/jy0705",
        "notes": "Alfa Capital's published 'Alfa Arab Metres' strategy is UAE off-plan apartments from RUB 1 million for qualified investors. US Treasury designated Alfa-Bank and Alfa Capital Markets Ltd. Do not use as an outreach path into European trophy homes.",
    },
    {
        "company_name": "ATON",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Independent broker/investment company. No dedicated international real-estate desk evidenced.",
        "source_1": "https://www.linkedin.com/company/aton",
        "source_2": "https://www.aton.ru",
        "notes": "Markets capital, brokerage and wealth management. Presence in Spain/UAE/UK/Cyprus is securities distribution, not a property acquisitions desk.",
    },
    {
        "company_name": "BCS Private / FG BCS",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Broker/wealth platform. No credible dedicated international property desk found.",
        "source_1": "https://bcs.ru",
        "source_2": "https://www.linkedin.com/company/fg-bcs",
        "notes": "Generic private-banking real-estate mentions without an evidenced overseas trophy desk are not enough under the quality bar.",
    },
    {
        "company_name": "T-Bank Private (ex-Tinkoff)",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Premium banking/investments. No dedicated international real-estate desk evidenced.",
        "source_1": "https://www.tbank.ru",
        "source_2": "https://www.tbank.ru/private/",
        "notes": "Excluded as a generic bank/advisor under the user's constraints, not as a verified overseas-property channel.",
    },
    {
        "company_name": "Sber Private Banking / VTB Private Banking",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Parent banks are clearly EU/US/UK sanctioned. Even though both advertise real-estate concierge, they are not outreach targets.",
        "source_1": "https://home.treasury.gov/news/press-releases/jy0705",
        "source_2": "https://private.vtb.ru/",
        "notes": "VTB Private pages mention elite residential/commercial real estate as alternative investments; Sber Private has non-financial property services via partners. Sanctions on the banks bar outreach.",
    },
    {
        "company_name": "LetterOne / Alfa Group founders' international vehicles",
        "city": "Luxembourg",
        "type": "private_capital",
        "exclusion_reason": "Principals Mikhail Fridman, German Khan, Alexei Kuzmichev (and related) are well-known EU/US/UK designated persons. Market context only.",
        "source_1": "https://www.propertyweek.com/markets/residential/oligarch-angels",
        "source_2": "https://home.treasury.gov/news/press-releases/jy0705",
        "notes": "Historic UK super-prime lending (e.g. Grosvenor Crescent via Wainbridge) is not a live compliant buyer channel.",
    },
    {
        "company_name": "Kalinka Ecosystem",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Russian luxury agency, but current marketed geographies are Moscow/UAE/Turkey/Thailand/London; no evidenced Italy residential desk.",
        "source_1": "https://kalinka-realty.com/",
        "source_2": "https://kalinka-realty.com/documents/company-profile-kalinka-eng.pdf",
        "notes": "Company profile mentions yacht charter including Italy, which is not a real-estate allocation. Quality bar: do not stretch a yacht line into an Amalfi buyer channel.",
    },
    {
        "company_name": "Tranio",
        "city": "Moscow",
        "type": "other_relevant",
        "exclusion_reason": "Mass overseas-property portal/broker network. 2023 survey: Italy average Russian-speaking purchase ~EUR 800k and activity down ~5x vs 2021. Incompatible with a EUR 6-12 million trophy process.",
        "source_1": "https://tranio.com/articles/russian-speaking-buyers-of-overseas-real-estate-2023/",
        "source_2": "https://tranio.com",
        "notes": "Useful as market colour (transfer friction killed many Italy deals) rather than as a qualified introducer.",
    },
    {
        "company_name": "Italy Sotheby's International Realty / other Italian agencies",
        "city": "Milan",
        "type": "other_relevant",
        "exclusion_reason": "Italian firms with no Russian-origin capital. Buyer-origin principle excludes them from this list.",
        "source_1": "https://www.italy-sothebysrealty.com/en/about-us/",
        "source_2": "https://www.italy-sothebysrealty.com/it/uffici-e-contatti/",
        "notes": "Relevant operationally if a qualified Russian introducer already has a client; they are not themselves Russian capital or Russian UHNW desks.",
    },
]


def _write(path: Path, headers: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for row in rows:
            full = {h: row.get(h, "") for h in headers}
            full["last_verified"] = LAST_VERIFIED
            writer.writerow(full)
    print(f"Wrote {len(rows)} rows to {path}")


def main() -> None:
    root = Path("/workspace/data/real-estate-prospects")
    _write(root / "russia.csv", QUALIFIED_HEADERS, QUALIFIED_ROWS)
    _write(root / "russia-excluded.csv", EXCLUDED_HEADERS, EXCLUDED_ROWS)


if __name__ == "__main__":
    main()
