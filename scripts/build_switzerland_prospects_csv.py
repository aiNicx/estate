#!/usr/bin/env python3
"""Generate the Switzerland buyer-origin prospect CSV from verified research notes.

Buyer-origin test for every row:
Can this organisation or person realistically bring, represent, introduce,
advise, or be a buyer/investor FROM Switzerland for a €6M–€12M Amalfi Coast
luxury property?

Geography is the origin of the buyer/capital, not the location of inventory.
Generic Swiss domestic agencies, portals, mortgage brokers, construction firms,
and institutional funds with incompatible tickets are excluded.
"""

from __future__ import annotations

import csv
import re
from pathlib import Path

HEADERS = [
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
    "buyer_origin_relevance",
    "italy_interest",
    "amalfi_coast_relevance",
    "estimated_ticket",
    "luxury_real_estate",
    "hospitality_interest",
    "fit_score",
    "priority",
    "verification_status",
    "source_1",
    "source_2",
    "notes",
    "last_verified",
]

ALLOWED_TYPE = {
    "luxury_agency",
    "private_office",
    "family_office",
    "real_estate_investor",
    "real_estate_fund",
    "private_equity_real_estate",
    "hospitality_investor",
    "private_capital",
    "international_property_advisor",
    "other_relevant",
}
ALLOWED_BUYER_ORIGIN = {"strong", "moderate", "weak", "unclear"}
ALLOWED_ITALY = {"yes", "no", "unclear"}
ALLOWED_AMALFI = {"strong", "moderate", "weak", "unclear"}
ALLOWED_LUXURY = {"yes", "no", "unclear"}
ALLOWED_HOSP = {"yes", "no", "unclear"}
ALLOWED_VERIF = {"verified", "partially_verified", "needs_review"}
ALLOWED_PRIORITY = {"A", "B", "C"}

LAST_VERIFIED = "2026-08-27"
COUNTRY = "Switzerland"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
URL_RE = re.compile(r"^https://", re.I)

# Fit scoring used in notes:
# +3 strong Swiss UHNW/private/institutional capital access
# +2 demonstrated international luxury real-estate activity
# +2 demonstrated Italy/Europe relevance
# +1 luxury/trophy/coastal asset relevance
# +1 hospitality/leisure relevance
# +1 €6M–€12M appears compatible

ROWS = [
    {
        "city": "Geneva",
        "company_name": "Naef Prestige | Knight Frank",
        "type": "private_office",
        "contact_name": "Selda Gungor",
        "contact_role": "International desk (Knight Frank Private Office access from Geneva)",
        "email": "selda.gungor@naefprestige-knightfrank.ch",
        "phone": "+41 22 839 38 22",
        "website": "https://www.naef-prestige.ch/en/private-office/",
        "linkedin_company": "https://www.linkedin.com/company/naef-prestige-knight-frank",
        "linkedin_contact": "",
        "investment_focus": "Knight Frank Private Office access for UHNW, family offices and advisors: prime residences worldwide, alpine chalets, commercial capital markets",
        "geographic_focus": "Geneva international desk serving Swiss and international private clients into Knight Frank's global network, including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "UHNW / compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.naef-prestige.ch/en/private-office/",
        "source_2": "https://www.knightfrank.co.uk/newsroom/article/2026/1/knight-frank-strengthens-italian-presence-with-new-preferred-agency-in-milan",
        "notes": "BUYER-ORIGIN: Official Private Office page is published on the Swiss Naef Prestige | Knight Frank site and describes advising HNW clients and family offices on buying a prime residence anywhere in the world, including a villa in the South of France. Official contacts page lists the International desk at Route de Florissant 57, Geneva, +41 22 839 38 22, international@npkf.ch and selda.gungor@naefprestige-knightfrank.ch. January 2026 Knight Frank newsroom states the firm is established across Lake Como, Florence, Lucca, Umbria, Sardinia, Portofino and Venice and added a Milan preferred agency; Amalfi Coast is not named. Score 9: +3 Swiss UHNW/FO access, +2 international luxury RE, +2 Italy/Europe network, +1 trophy, +1 ticket. Direct email is the International mailbox published on the official contacts page, not inferred.",
    },
    {
        "city": "Geneva",
        "company_name": "BARNES Switzerland",
        "type": "luxury_agency",
        "contact_name": "Jerome Felicite",
        "contact_role": "President, BARNES Suisse",
        "email": "geneve@barnes-suisse.ch",
        "phone": "+41 22 809 06 90",
        "website": "https://www.barnes-suisse.ch/soc-39-barnes-geneve.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes-international",
        "linkedin_contact": "",
        "investment_focus": "Prestige and ultra-luxury residential brokerage; BARNES Private Office for exceptional assets, family offices and UHNW clients; international referrals across the BARNES network",
        "geographic_focus": "Geneva flagship serving Swiss and international private clients, with BARNES offices in Italy and other European luxury markets",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-suisse.ch/soc-39-barnes-geneve.html",
        "source_2": "https://en.barnes-suisse.ch/soc-284-barnes-geneve-chatelaine.html",
        "notes": "BUYER-ORIGIN: Official BARNES Geneva agency page publishes Boulevard du Theatre 8-10, +41 22 809 06 90 and geneve@barnes-suisse.ch, and states the agency presents exceptional properties to a qualified local and international clientele. Head-office page names Jerome Felicite as President of BARNES Suisse. FAQ on the international BARNES Geneva page states consultants support international buyers and that BARNES Private Office (Paris, international reach) can present exceptional assets to investors and family offices. Italy interest is the BARNES International network's Italian offices, not a published Geneva-to-Amalfi mandate. Personal email is not published. Score 8: +3 Swiss UHNW access, +2 international luxury network, +2 Italy offices in the group, +1 trophy. Accent in the contact name is omitted for CSV safety; role is from the official head-office team list.",
    },
    {
        "city": "Geneva",
        "company_name": "John Taylor Geneva",
        "type": "luxury_agency",
        "contact_name": "Sandro Fanara",
        "contact_role": "Managing Partner",
        "email": "",
        "phone": "+41 22 347 55 33",
        "website": "https://www.john-taylor.com/luxury-real-estate-agency/geneva/",
        "linkedin_company": "https://www.linkedin.com/company/john-taylor",
        "linkedin_contact": "",
        "investment_focus": "Exceptional Geneva residential for an international UHNW clientele; Riviera-heritage luxury brokerage with group offices including Milan",
        "geographic_focus": "Geneva canton luxury market connected to John Taylor offices in Monaco, the French Riviera, Milan and other European luxury destinations",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "listed Geneva stock includes CHF 6.5M–CHF 37M waterfront villas; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.john-taylor.com/luxury-real-estate-agency/geneva/",
        "source_2": "https://www.john-taylor.fr/agence-immobiliere-de-prestige/geneve/",
        "notes": "BUYER-ORIGIN: Official Geneva agency page names the legal entity Sandro Fanara Sarl, Rue de Jargonnant 2, 1207 Geneva, +41 22 347 55 33, and lists Sandro Fanara as Managing Partner. The page states the firm has assisted clients for over 10 years on exceptional properties in the canton and is dedicated to an international clientele; published sale stock includes Cologny and Collonge-Bellerive villas at CHF 6.5M–CHF 37M, so ticket size is compatible. John Taylor (Dassault Artcurial Group) has a 160-year Riviera luxury-agency heritage and publicly lists Milan among its offices, which is the Italy evidence; Amalfi is not named, so Amalfi relevance is moderate via coastal-trophy DNA rather than a published Amalfi mandate. No sales email is published on the Geneva page, so email is empty. Score 9: +3 Geneva UHNW access, +2 international luxury RE, +2 Italy/Milan plus Riviera, +1 trophy/coastal, +1 ticket.",
    },
    {
        "city": "Geneva",
        "company_name": "SPG One | Christie's International Real Estate",
        "type": "luxury_agency",
        "contact_name": "Luana Vieira",
        "contact_role": "Managing Director",
        "email": "luana.vieira@spgone.ch",
        "phone": "+41 78 862 35 55",
        "website": "https://www.spgone.ch/en/our-experts/",
        "linkedin_company": "https://www.linkedin.com/company/spg-one",
        "linkedin_contact": "",
        "investment_focus": "Swiss Finest Properties luxury brokerage; confidential off-market sales; worldwide Christie's International Real Estate referrals",
        "geographic_focus": "French-speaking Switzerland and Gstaad, with exclusive CIRE affiliation giving access to luxury stock and buyers in 46+ countries including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.spgone.ch/en/our-experts/",
        "source_2": "https://www.spgone.ch/en/about",
        "notes": "BUYER-ORIGIN: Official experts page names Luana Vieira as Managing Director with luana.vieira@spgone.ch and +41 78 862 35 55, and Killian Bolay as International Real Estate Coordinator at +41 58 861 31 00 / contact@spgone.ch. About page states SPG One has been the exclusive Christie's International Real Estate partner in French-speaking Switzerland and Gstaad since 2005, with access to CIRE's global portfolio (138 affiliates, 46+ countries, seaside villas among the stated asset types). Chairwoman is Valentine Barbier-Mueller. Italy is via CIRE Italian affiliates, not a published Amalfi mandate. Score 8: +3 Swiss UHNW luxury desk, +2 international CIRE network, +2 Europe/Italy affiliates, +1 trophy. Direct MD email is published on the official experts page.",
    },
    {
        "city": "Lausanne",
        "company_name": "Switzerland Sotheby's International Realty",
        "type": "luxury_agency",
        "contact_name": "Benjamin Lamers",
        "contact_role": "Exceptional Sales Coordinator / International Sales Advisor",
        "email": "benjamin.lamers@swsir.ch",
        "phone": "+41 76 413 32 31",
        "website": "https://www.switzerland-sothebysrealty.ch/team/benjamin-lamers",
        "linkedin_company": "https://www.linkedin.com/company/switzerland-sothebysrealty",
        "linkedin_contact": "https://www.linkedin.com/in/benjamin-lamers-574549ba",
        "investment_focus": "Luxury residential for demanding private clients; international Sotheby's International Realty referrals; published marketing of exceptional Italian/Sardinian projects to Swiss clients",
        "geographic_focus": "Lausanne HQ covering French-speaking Switzerland, with Zurich SIR coverage and the global Sotheby's International Realty network including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.switzerland-sothebysrealty.ch/team/benjamin-lamers",
        "source_2": "https://www.linkedin.com/company/cardis-immobilier-sotheby's-international-realty",
        "notes": "BUYER-ORIGIN: Official Switzerland Sotheby's International Realty team page names Benjamin Lamers as Exceptional Sales Coordinator, publishes benjamin.lamers@swsir.ch and +41 76 413 32 31, and describes 15 years at Sotheby's including responsibility for Switzerland Sotheby's International Realty client development. Company LinkedIn for Cardis Sotheby's (the SIR affiliate) publicly marketed an exceptional Sardinia project to its Swiss audience and listed benjamin.lamers@cardis.ch / +41 21 781 01 34 with Italy and Sardinia tags — the strongest public evidence found of a Swiss luxury desk originating Italian coastal buyers. Amalfi is not the named destination (Sardinia is), so Amalfi relevance is moderate. The swsir.ch email from the official team page is used rather than the Cardis alias. Score 9: +3 Swiss UHNW/SIR clients, +2 international luxury RE, +2 documented Italy/Sardinia activity, +1 trophy/coastal, +1 ticket assumed compatible with SIR exceptional sales.",
    },
    {
        "city": "Geneva",
        "company_name": "PRIVALIA x Hamptons International",
        "type": "international_property_advisor",
        "contact_name": "Michael Ortiz",
        "contact_role": "Co-founder and Co-CEO",
        "email": "direction@privalia.ch",
        "phone": "+41 22 308 52 00",
        "website": "https://privalia.ch/en/international-real-estate-geneva/",
        "linkedin_company": "https://www.linkedin.com/company/privalia-hamptons-international",
        "linkedin_contact": "https://www.linkedin.com/in/michael-ortiz-b7037016",
        "investment_focus": "International real-estate strategies from Geneva for complex and confidential assets; Hamptons International exclusive partner for French-speaking Switzerland; prestige and off-market campaigns",
        "geographic_focus": "Geneva / Chene-Bougeries desk; published destinations include Italy, Paris, Monaco, London, Dubai and New York",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Hamptons partnership release cites houses from about £600,000 to upwards of £50 million",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://privalia.ch/en/international-real-estate-geneva/",
        "source_2": "https://privalia.ch/en/people/michael-ortiz/",
        "notes": "BUYER-ORIGIN: Official international page states PRIVALIA is the exclusive Hamptons International partner in French-speaking Switzerland, designs international real-estate strategies from Geneva (Route de Chene 116, Chene-Bougeries), and lists Italy among emblematic destinations. Official people page for Michael Ortiz publishes direction@privalia.ch and +41 22 308 52 00. Hamptons UK release names Christophe and Michael Ortiz as founders and describes high-end apartments, luxury villas and off-market investment properties. Company LinkedIn also publishes prestige@privalia.ch for prestige lettings; the direction inbox from the official people page is used. Amalfi is not named. Score 8: +3 Geneva private-client access, +2 international luxury network, +2 Italy listed as a destination, +1 trophy.",
    },
    {
        "city": "Geneva",
        "company_name": "Engel & Volkers Geneva Private Office",
        "type": "luxury_agency",
        "contact_name": "Konstantinos Dambassinas",
        "contact_role": "Licence Partner / Managing Director, Geneva; Private Office",
        "email": "switzerland@engelvoelkers.com",
        "phone": "+41 22 800 00 88",
        "website": "https://www.engelvoelkers.com/ch/en/real-estate-agent/geneva/geneva",
        "linkedin_company": "https://www.linkedin.com/company/engel-voelkers-geneva",
        "linkedin_contact": "https://www.linkedin.com/in/konstantinos-dambassinas-mrics-226aaa2",
        "investment_focus": "Prime Geneva residential including Private Office off-market sales; global Engel & Volkers referrals",
        "geographic_focus": "Geneva shop (Place de la Fusterie 5bis) serving local and international buyers, connected to Engel & Volkers shops in Italy and across Europe",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.engelvoelkers.com/ch/en/real-estate-agent/geneva/geneva",
        "source_2": "https://www.engelvoelkers.com/ch/en/imprint",
        "notes": "BUYER-ORIGIN: Official Geneva shop page lists Place de la Fusterie 5bis, 1204 Geneva, +41 22 800 00 88 and states the shop is rooted locally and networked worldwide (1,000+ locations) to reach international buyers. Company LinkedIn announced an off-market Quai Wilson sale by the Geneva Private Office and named Konstantinos Dambassinas MRICS, Ryan Pedroni and Amelie Vavasseur. Official Swiss imprint of Engel & Volkers Wohnen Schweiz AG (Poststrasse 26, Zug) publishes switzerland@engelvoelkers.com and +41 41 500 06 06; that verified master-licence inbox is used rather than a patterned personal address. Immobilier.ch also lists costas.dambassinas@engelvoelkers.com for the Geneva agency, but that directory listing is not used as the saved email. Italy interest is the brand's Italian shop network, not a published Geneva-to-Amalfi mandate. Distinct from the Ticino licence partner row. Score 8: +3 Geneva UHNW/Private Office, +2 international luxury network, +2 Italy shops in the group, +1 trophy.",
    },
    {
        "city": "Lugano",
        "company_name": "Engel & Volkers Ticino",
        "type": "luxury_agency",
        "contact_name": "Simon Incir",
        "contact_role": "Owner and CEO Ticino (Ticino Premium Properties SA)",
        "email": "",
        "phone": "+41 91 980 42 60",
        "website": "https://www.engelvoelkers.com/ch/en/advisors/simon-incir",
        "linkedin_company": "https://www.linkedin.com/company/engel-völkers-lugano",
        "linkedin_contact": "https://www.linkedin.com/in/simon-incir-19186254",
        "investment_focus": "Prestigious Ticino residential, villas and investment property; international Engel & Volkers referrals; Italian-speaking Swiss UHNW clientele",
        "geographic_focus": "Lugano and Ascona (Lake Lugano / Lake Maggiore), with the shop stating coverage of 'the most beautiful places in the world' via the global network",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "published Lugano listings include CHF 4.4M–CHF 5.5M lakefront and villa stock; higher off-market tickets unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.engelvoelkers.com/ch/en/advisors/simon-incir",
        "source_2": "https://www.engelvoelkers.com/ch/en/real-estate-agent/ticino/lugano",
        "notes": "BUYER-ORIGIN: Official advisor page names Simon Incir, B.A. HSG, CEMS MIM, as Owner & CEO Ticino acting for Ticino Premium Properties SA; shops Lugano, Ascona and Lugano Commercial; languages English, German and Italian; +41 91 980 42 60. Lugano shop page states the agency offers properties around Lake Lugano and in the most beautiful places in the world. Commercial register (CHE-288.856.372) confirms Simon Incir as the board member of Ticino Premium Properties SA. This is a distinct licence partner from the Geneva Private Office, giving access to Italian-speaking Swiss UHNW buyers in Ticino who historically purchase in Italy. No public email is published on the advisor page, so email is empty. Italy interest is geographic/cultural plus the E&V Italy network, not a named Amalfi mandate. Score 8: +3 Ticino/Swiss-Italian UHNW access, +2 international network, +2 Italy adjacency/network, +1 luxury.",
    },
    {
        "city": "Lugano",
        "company_name": "Wetag Consulting",
        "type": "luxury_agency",
        "contact_name": "Philipp Peter",
        "contact_role": "Owner and Co-CEO",
        "email": "info@wetag.ch",
        "phone": "+41 91 601 04 50",
        "website": "https://www.wetag.ch/en/",
        "linkedin_company": "https://www.linkedin.com/company/wetag-consulting",
        "linkedin_contact": "",
        "investment_focus": "Ticino luxury villas, penthouses and estates on Lake Lugano and Lake Maggiore; Christie's International Real Estate exclusive affiliate for Ticino; international buyer and referral network",
        "geographic_focus": "Lugano and Ascona; international marketing via Christie's, LeadingRE, Luxury Portfolio and EREN; Italian border / Lake Como adjacency",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "published Ticino luxury stock includes properties around CHF 11.9M; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.wetag.ch/en/why-wetag/",
        "source_2": "https://www.wetag.ch/en/why-wetag/team/",
        "notes": "BUYER-ORIGIN: Official why-Wetag and team pages name Philipp Peter and Iradj Alexander David as Owners & Co-CEOs, list Lugano (Riva Antonio Caccia 3, +41 91 601 04 50) and Ascona, and publish info@wetag.ch. Wetag is the exclusive Christie's International Real Estate affiliate in Ticino and a LeadingRE member. The firm primarily sells Ticino trophy homes to international buyers (inbound), so Swiss-origin capital access is moderate rather than automatic: Ticino UHNW clients and the CIRE referral desk are the relevant channels into Italy. Claudia Cattaneo is listed as Senior Consultant & Referral Coordinator. Score 7: +2 Ticino UHNW/CIRE (not a full +3 because the published mandate is selling Ticino, not originating outbound Italian buyers), +2 international luxury networks, +2 Italy border/CIRE Italy, +1 trophy/ticket. Not treated as a duplicate of SPG One; different legal entity and language region.",
    },
    {
        "city": "Geneva",
        "company_name": "Luxury Places",
        "type": "luxury_agency",
        "contact_name": "David Colle",
        "contact_role": "Director",
        "email": "info@luxury-places.ch",
        "phone": "+41 848 589 589",
        "website": "https://www.luxury-places.ch",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Buying, selling and renting exceptional properties only; international showcase for HNWI seeking main residences or holiday homes; Savills international associate",
        "geographic_focus": "Lake Geneva region and Swiss Alps, with a published International Showcase for Spain, Portugal, Greece, Monaco, Caribbean and other leisure destinations via Savills",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "company materials state average sale prices above CHF 6 million",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.savills.co.uk/insight-and-opinion/savills-news/174421-0/savills-strengthens-its-residential-property-network-in-europe",
        "source_2": "https://www.luxury-places.ch/sites/default/files/brochures/brochure-luxury-places_light.pdf",
        "notes": "BUYER-ORIGIN: Official Savills 2014 release names David Colle as director of Luxury Places, offices in Geneva and Lausanne, specialist in the top end of Lake Geneva residential. Official brochure publishes Lausanne (Rue du Grand-Pont 2bis) and Geneva (ICC, Route de Pre-Bois 20, Meyrin), +41 848 589 589, info@luxury-places.ch, and states Luxury Places is a Savills international associate that assists clients on worldwide projects. Italy is not named on the brochure (Spain, Portugal, Greece, Monaco are); Italy interest is via Savills Italia (Milan residential and other Italian offices), not a published Amalfi mandate. Score 7: +3 Geneva HNWI desk, +2 international luxury/Savills, +1 Europe leisure destinations (Italy not named on the local brochure, so not a full +2), +1 trophy/ticket. Capped below 8 because Italy is network-level rather than a named Luxury Places destination.",
    },
    {
        "city": "Zug",
        "company_name": "Limestone Capital AG",
        "type": "hospitality_investor",
        "contact_name": "Benjamin Habbel",
        "contact_role": "Founder, Managing Partner and CEO",
        "email": "info@limestone-capital.com",
        "phone": "",
        "website": "https://www.limestone-capital.com/",
        "linkedin_company": "https://www.linkedin.com/company/limestone-cap",
        "linkedin_contact": "",
        "investment_focus": "Private equity in branded lifestyle hospitality and value-add hotel real estate; Aethos Hotels, LOISIUM, Emerald Stay and related platforms; advises family offices and institutions",
        "geographic_focus": "Zug HQ with Lisbon, Munich and London offices; Italian assets in Costa Smeralda, Milan, Umbria and Monterosa plus Spain, Portugal, France and the UK",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "typical hotel investments appear larger than €6M–€12M; boutique Italian assets may overlap; unknown for a single coastal residence",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.limestone-capital.com/realestate",
        "source_2": "https://www.limestone-capital.com/contact",
        "notes": "BUYER-ORIGIN: Official site describes a Zug-headquartered PE firm with over €1bn invested across hospitality platforms, advising institutional and family-office investors. Official real-estate page documents Aethos Sardinia (Costa Smeralda, 58-key 5-star, acquired Q1 2024), Aethos Milan, Aethos Saragano (Umbria village hotel) and Aethos Monterosa (Italian Alps). Official contact page publishes Landis + Gyr-Strasse 1, 6300 Zug and info@limestone-capital.com. Official team page names Benjamin Habbel as Founder/CEO and Jeff Coe as General Partner leading real-estate assets and Aethos expansion into Italy. Amalfi is not a named destination; Sardinia coastal luxury hospitality is the closest analogue, so Amalfi relevance is moderate. Disclosed hotels are typically above this ticket; included as a Swiss capital source for Italian trophy hospitality/leisure, not as a likely bidder for a single villa. Score 9: +3 Swiss FO/institutional capital, +2 international luxury hospitality RE, +2 documented Italy, +1 coastal/trophy, +1 hospitality. Phone is not published on the contact page.",
    },
    {
        "city": "Geneva",
        "company_name": "Stoneweg (SWI Group)",
        "type": "real_estate_investor",
        "contact_name": "Jaume Sabater",
        "contact_role": "Founder and CEO, Stoneweg Asset Management SA",
        "email": "",
        "phone": "+41 22 552 40 30",
        "website": "https://swi.com/jaume-sabater/",
        "linkedin_company": "https://www.linkedin.com/company/stoneweg",
        "linkedin_contact": "",
        "investment_focus": "Alternative real-asset investment including living, logistics, hospitality, office and leisure; club deals, JVs and co-investments for institutions, family offices and private banks",
        "geographic_focus": "Geneva HQ; 23 offices including Milan; published strategies include pan-European hospitality and Italian distressed situations",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "institutional; disclosed platform AUM in the billions; typically larger than €6M–€12M",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "yes",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://swi.com/jaume-sabater/",
        "source_2": "https://stonewegeuropestapledtrust.com.sg/board-of-directors/jaume-sabater/",
        "notes": "BUYER-ORIGIN: Official SWI/SERT biographies confirm Jaume Sabater as Founder of Stoneweg Group and CEO of Stoneweg Asset Management SA, Swiss citizen resident in Geneva, previously Head of Real Estate at Edmond de Rothschild (Suisse). SERT biography states Stoneweg provides access to strategies including pan-European hospitality and Italian distressed situations and opened a Milan office. Company LinkedIn lists Geneva HQ and +41 22 552 40 30, and a Milan office. No public investment email is published on those pages, so email is empty (patterned addresses are not used). Tickets and asset types are institutional; included as a Geneva-origin real-asset/hospitality capital platform with an explicit Italy strategy, not as a likely bidder at €6M–€12M. Score 7: +3 Geneva real-asset capital, +2 Europe/hospitality, +2 Italy office and distressed strategy, hospitality +1, ticket compatibility not added.",
    },
    {
        "city": "Geneva",
        "company_name": "B-FLEXION",
        "type": "family_office",
        "contact_name": "",
        "contact_role": "Private investment firm of the Bertarelli family",
        "email": "",
        "phone": "",
        "website": "https://bflexion.com/contact",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Private investment firm covering private equity, venture, infrastructure, technology, real estate, hospitality, hedge funds and credit; family also owns the ColleMassari wine estate and agriturismo in Tuscany",
        "geographic_focus": "Geneva-headquartered with offices across Europe and the United States; documented Italian agricultural/hospitality estate in Tuscany (ColleMassari)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "family-office scale; unknown for a single €6M–€12M residential acquisition",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "yes",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.bertarelli.com/business",
        "source_2": "https://bflexion.com/contact",
        "notes": "BUYER-ORIGIN: Official Bertarelli family business page describes B-FLEXION as a private entrepreneurial investment firm with offices across Europe and the US, investing in real estate and hospitality among other areas. The same page documents the family's ColleMassari estate in Tuscany (105 vineyards, agriturismo suites). Wikipedia and company history identify B-FLEXION (formerly Waypoint Capital) as the Geneva vehicle for the Swiss-Italian Bertarelli family after the Serono sale. Official B-FLEXION contact page is a form only: no public email, phone or named investment principal is published, so those fields are empty. Crosstree (UK real estate) and Dona Bertarelli's Ledunfly Hospitality (Park Gstaad / Four Seasons conversion) are related family activities, not separately listed. Amalfi is not evidenced. Score 8: +3 Swiss-Italian family capital, +2 real estate/hospitality allocation, +2 documented Tuscany estate, +1 hospitality. Not scored 9/10 because there is no published mandate for trophy coastal residential at this ticket and no outreach email.",
    },
    {
        "city": "Zurich",
        "company_name": "Julius Baer Real Estate Ltd",
        "type": "private_office",
        "contact_name": "Thomas Hodel",
        "contact_role": "Chief Executive Officer",
        "email": "info@jbre.ch",
        "phone": "+41 43 344 65 00",
        "website": "https://realestate.juliusbaer.com",
        "linkedin_company": "https://www.linkedin.com/company/julius-baer-real-estate",
        "linkedin_contact": "",
        "investment_focus": "Residential brokerage, direct real-estate advisory and financing for Julius Baer private clients; in-house specialists plus selected international partners for property needs in other countries",
        "geographic_focus": "Zurich and Geneva teams serving Swiss UHNW banking clients; international support via partners",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.juliusbaer.com/ch/en/our-solutions/additional-services/real-estate/",
        "source_2": "https://www.local.ch/de/d/zuerich/8001/immobilien/julius-baer-real-estate-ag-UpVoxC5rSBgT4lylNPhZOg",
        "notes": "BUYER-ORIGIN: Official Julius Baer real-estate page states Julius Baer Real Estate Ltd offers residential brokerage and direct advisory, and that while the offering is local, the firm also works with partners around the world to support clients in other countries. Company LinkedIn names Thomas Hodel as CEO and describes a dedicated team covering search, brokerage and financing under one roof, with Zurich and Geneva transaction activity. Swiss directory local.ch publishes Schweizergasse 21, 8001 Zurich, +41 43 344 65 00 and info@jbre.ch. Italy is not named on the public pages, so italy_interest is unclear; the relevant fact is a Swiss private-bank real-estate desk that explicitly supports clients buying abroad. Score 8: +3 Julius Baer UHNW client access, +2 international partner capability, +1 Europe implied by worldwide partners (not a documented Italy desk, so not +2), +1 luxury private-client residential, +1 ticket likely compatible for UHNW clients.",
    },
    {
        "city": "Lugano",
        "company_name": "AURA Group",
        "type": "international_property_advisor",
        "contact_name": "Basir Amini",
        "contact_role": "President, AURA Helvetia Real Estate AG",
        "email": "",
        "phone": "",
        "website": "https://www.auragroup-re.com/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Buyer-side off-market advisory for villas, castles, wine estates and hotels in Italy; on-market Italian investment (Milan residential, hotels, development); Swiss off-market via the Lugano office",
        "geographic_focus": "Milano and Lugano; Italy briefs include Lake Como, Tuscany, Rome and Portofino; Switzerland via Lugano for Geneva, Lausanne, Zurich and Lugano",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.auragroup-re.com/",
        "source_2": "https://www.lixt.ch/it/registro-di-commercio/aura-helvetia-real-estate-ag-1649677",
        "notes": "BUYER-ORIGIN: Official site positions AURA as buyer-side advisors (not a brokerage) for off-market Italy (Lake Como, Tuscany, Rome, Portofino; villas, castles, wine estates, hotels) with a Lugano office for Swiss off-market access. Trusted-by list includes entrepreneurs in DACH, family offices, Eastern Europe and the Middle East. Swiss commercial register: AURA Helvetia Real Estate AG, CHE-479.862.251, c/o PROFID, Corso Elvezia 23, 6900 Lugano; Basir Amini (German citizen, Piacenza) president; Ferid Amini (Piacenza) and Stefano Volpi (Sorengo) board members. Buyer origin is moderate: the legal entity is Swiss/Lugano and DACH entrepreneurs are named, but the principals are based in Piacenza and the published client mix is international inbound to Italy rather than proven Swiss UHNW origination. Contact page is a form only; no public email or phone. Portofino is named, Amalfi is not, so Amalfi relevance is moderate. Score 7: +2 DACH/Lugano access, +2 Italy off-market trophy mandate, +2 named Italian coastal/trophy destinations, +1 luxury.",
    },
    {
        "city": "Zug",
        "company_name": "Artisa Group / ART Family Office",
        "type": "hospitality_investor",
        "contact_name": "Alain Artioli",
        "contact_role": "President of the Board / family principal",
        "email": "info@artisagroup.com",
        "phone": "+41 91 873 45 00",
        "website": "https://www.artisagroup.com",
        "linkedin_company": "https://www.linkedin.com/company/artisa-group",
        "linkedin_contact": "",
        "investment_focus": "Integrated Swiss real-estate development plus luxury hospitality repositioning; ART Family Office ownership of Grand Hotel Locarno (Marriott Luxury Collection conversion)",
        "geographic_focus": "Switzerland (Ticino, Zurich, Zug); company materials and LinkedIn also cite activity in Italy, Germany, France, Chile and the US",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Grand Hotel Locarno is a 110-room five-star conversion, well above €6M–€12M; unknown for single residential assets",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.arabella.com/en/arabella-hospitality-se-and-art-family-office-sa-bring-new-splendor-to-the-grand-hotel-locarno/",
        "source_2": "https://www.artisagroup.com",
        "notes": "BUYER-ORIGIN: Arabella Hospitality (19 December 2024) states Art Family Office SA, the Artioli family office, owns the historic Grand Hotel Locarno and commissioned Artisa Group (headed by Alain Artioli) to renovate it as a five-star Marriott Luxury Collection hotel with Arabella as operator. Official Artisa site lists Grand Hotel Locarno (110 rooms, 2026) among current projects and describes direct real-estate investment and development. Cookie policy on a group site publishes Artisa Group AG, Metallstrasse 4, 6300 Zug, privacy@artisagroup.com and +41 91 873 45 00; company LinkedIn publishes info@artisagroup.com. Italy interest is unclear: LinkedIn cites an Italy workforce, but published projects are Swiss. Included as Swiss family/hospitality capital that acquires and repositions trophy hotels, not as an Amalfi specialist. Score 6: +3 Swiss family capital, +1 hospitality, +1 luxury hotel real estate, +1 Europe (Swiss/Italian-speaking Ticino). Institutional hotel ticket is above this asset, so compatibility point is not added.",
    },
    {
        "city": "Baar",
        "company_name": "CC Trust Group AG",
        "type": "family_office",
        "contact_name": "Claudio Cisullo",
        "contact_role": "Founder and Executive Chairman",
        "email": "info@cctrust.ch",
        "phone": "+41 41 545 65 56",
        "website": "https://cctrust.ch",
        "linkedin_company": "https://www.linkedin.com/company/cc-trust-group-ag",
        "linkedin_contact": "",
        "investment_focus": "Single-family office private equity, corporate development and direct investments including real estate and leisure, alongside biotech, services, aviation and technology",
        "geographic_focus": "Switzerland home market; official site lists Australia, China, UK, Hong Kong, India, Japan, Romania, Singapore, Switzerland and the USA — Italy is not named",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "no",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "mid- to large-sized companies; unknown for a single residential trophy asset",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://cctrust.ch",
        "source_2": "https://www.linkedin.com/company/cc-trust-group-ag",
        "notes": "BUYER-ORIGIN: Official site describes a Switzerland-based family office with almost 30 years of track record, portfolio of 15+ investments including real estate and leisure, office at Neuhofstrasse 24, 6340 Baar, +41 41 545 65 56, info@cctrust.ch. Claudio Cisullo is named Founder & Executive Chairman. Geographic coverage page does not list Italy. Included as a publicly contactable Swiss family office with real-estate and leisure allocations that could theoretically look at a trophy European asset; not as an Italy specialist. Score 6: +3 Swiss private capital, +2 international investing, +1 real-estate allocation. Italy/Europe trophy and ticket compatibility not evidenced.",
    },
    {
        "city": "Basel",
        "company_name": "ATAG Family Office Ltd",
        "type": "family_office",
        "contact_name": "Igor Rusek",
        "contact_role": "Chairman",
        "email": "info@atag-familyoffice.ch",
        "phone": "+41 61 555 13 30",
        "website": "https://atag-familyoffice.ch/en/contact",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Independent multi-family office: wealth management, manager selection, legal/tax/estate, family governance and lifestyle management, including real-estate matters within a full-service mandate",
        "geographic_focus": "Basel and Zurich offices serving national and international family-business and UHNW clients",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://atag-familyoffice.ch/en/contact",
        "source_2": "https://atag-familyoffice.ch/en/imprint",
        "notes": "BUYER-ORIGIN: Official contact page lists ATAG Family Office Ltd, St. Jakobs-Strasse 17, 4052 Basel, +41 61 555 13 30, info@atag-familyoffice.ch. Imprint also lists Bellerivestrasse 245, 8008 Zurich, +41 44 555 45 00. Independent MFO working on assets-under-advisory rather than as a principal buyer. No published Italy or luxury-property track record; included only as a gated introduction path to Swiss and international families who use ATAG for lifestyle and wealth structuring. Score 6: +3 access to Swiss/international UHNW families, +1 international clientele, +1 full-service including lifestyle/real estate, +1 ticket unknown but UHNW-compatible in principle. Italy not evidenced.",
    },
    {
        "city": "Geneva",
        "company_name": "Crescendo Partners",
        "type": "private_capital",
        "contact_name": "Douglas Kalen",
        "contact_role": "Co-Founder",
        "email": "",
        "phone": "",
        "website": "https://crescendo-grp.com",
        "linkedin_company": "https://www.linkedin.com/company/crescendo-capital-sa",
        "linkedin_contact": "",
        "investment_focus": "Swiss-regulated wealth and asset manager for UHNW families; endowment-style allocation including private markets and real estate",
        "geographic_focus": "Geneva HQ (Crescendo Capital SA, 8C Avenue de Champel); serves UHNW families internationally",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "partially_verified",
        "source_1": "https://crescendo-grp.com",
        "source_2": "https://www.linkedin.com/company/crescendo-capital-sa",
        "notes": "BUYER-ORIGIN: Official site describes Crescendo Partners as a Swiss-regulated wealth manager for ultra-high-net-worth families, independently owned, Geneva HQ at 8C Avenue de Champel, CH-1206. Contact is a web form only; no public email or phone is published on the homepage, so those fields are empty. Company LinkedIn lists Douglas Kalen among leadership and the same Geneva address; third-party directories publish info@crescendo-grp.com, which is not used because it was not confirmed on the official site. No Italy or luxury-property evidence. Included as a Geneva UHNW allocator with a stated real-estate sleeve in third-party MFO directories, scored conservatively. Score 6: +3 Geneva UHNW families, +2 private-markets/real-estate allocation (directory-level, hence partially_verified), +1 international families.",
    },
    {
        "city": "Geneva",
        "company_name": "Pictet Alternative Advisors",
        "type": "private_capital",
        "contact_name": "Maurizio Arrigo",
        "contact_role": "Real estate / alternatives contact (SECA listing)",
        "email": "",
        "phone": "+41 58 323 23 23",
        "website": "https://www.pictet.com/ch/en/alternative-investments",
        "linkedin_company": "https://www.linkedin.com/company/the-pictet-group",
        "linkedin_contact": "",
        "investment_focus": "Direct and indirect hedge funds, private equity and real estate for Pictet private and institutional clients; about USD 4bn in real-estate assets within a USD 48bn alternatives platform (SECA, as of 31 March 2025)",
        "geographic_focus": "Geneva (Route des Acacias 60); Europe, North America and Asia alternatives; Pictet Group also has an Italian presence",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "institutional alternatives; typical tickets larger than €6M–€12M",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "partially_verified",
        "source_1": "https://www.seca.ch/en/find-members/pictet-alternative-advisors-sa/",
        "source_2": "https://www.griinstitute.org/realestate/company-profile/pictet-alternative-advisors_2853",
        "notes": "BUYER-ORIGIN: SECA member profile describes Pictet Alternative Advisors SA as the Pictet unit managing hedge funds, PE and real estate for private and institutional clients, Route des Acacias 60, 1211 Geneva 73, +41 58 323 23 23, and names Maurizio Arrigo and Denis Kocaman. GRI Institute lists the same Geneva address and phone. No public email. Real-estate AUM is institutional-scale; included as a path to Pictet UHNW/FO clients who allocate to real estate, not as a likely principal bidder for a single Amalfi villa. Pictet Group operates in Italy, but PAA's published RE activity is not Italy-trophy-specific. Score 6: +3 Pictet private-client capital, +2 alternatives/RE platform, ticket and Italy/trophy points not added. Roles of Arrigo/Kocaman are from the SECA listing, not a Pictet people page, hence partially_verified.",
    },
    {
        "city": "Zurich",
        "company_name": "JLL Switzerland Hotels & Hospitality",
        "type": "other_relevant",
        "contact_name": "Gregor Strocka",
        "contact_role": "Managing Director, Head of Capital Markets Switzerland",
        "email": "gregor.strocka@jll.com",
        "phone": "+41 44 215 75 15",
        "website": "https://www.jll.com/en-ch/property-types/hotels-hospitality",
        "linkedin_company": "https://www.linkedin.com/company/jll",
        "linkedin_contact": "",
        "investment_focus": "Hotel and hospitality capital markets, investment sales, valuation and advisory for Swiss and international capital",
        "geographic_focus": "Switzerland platform (Zurich Prime Tower) routing into JLL's global hotels desk, including Europe",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "advised hotel deals typically larger than €6M–€12M",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.jll.com/en-ch/property-types/hotels-hospitality",
        "source_2": "https://www.jlldealpage.ch/en/?op=impressum",
        "notes": "BUYER-ORIGIN: Official JLL Switzerland hotels and hospitality page names Gregor Strocka as Managing Director, Head Capital Markets Switzerland (gregor.strocka@jll.com, +41 44 215 75 15) and Daniel Macht as Head Valuation & Advisory Switzerland (daniel.macht@jll.com, +41 44 215 75 21). Swiss imprint: Jones Lang LaSalle AG, Prime Tower, Hardstrasse 201, 8005 Zurich, +41 44 215 75 00, info.ch@eu.jll.com. Included as an introducer to Swiss hospitality capital if the Amalfi asset is positioned as boutique hospitality/leisure rather than a pure residence. Italy is not named on the Swiss hotels page. Score 6: +3 Swiss institutional/private capital access via capital markets, +1 hospitality, +1 Europe via global JLL hotels, +1 advisory (not a principal). Ticket compatibility not added.",
    },
    {
        "city": "Kusnacht",
        "company_name": "Wuest und Wuest AG | Christie's International Real Estate",
        "type": "luxury_agency",
        "contact_name": "Pascal Vaucher",
        "contact_role": "CEO",
        "email": "info@wuw.ch",
        "phone": "+41 44 388 58 68",
        "website": "https://www.wuw.ch/en/about/",
        "linkedin_company": "https://www.linkedin.com/company/wüst-und-wüst",
        "linkedin_contact": "https://www.linkedin.com/in/pascal-vaucher-430ba440",
        "investment_focus": "Exclusive residential brokerage and off-market marketing in German-speaking Switzerland; exclusive Christie's International Real Estate affiliate since 2007",
        "geographic_focus": "Kusnacht/Zurich, Zug, Lucerne, St. Moritz, Pfaeffikon/SZ and Basel, with CIRE global buyer and listing access including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.wuw.ch/en/about/",
        "source_2": "https://www.linkedin.com/company/wüst-und-wüst",
        "notes": "BUYER-ORIGIN: Official about page states the family firm has brokered exclusive residential property since 1954, names Pascal Vaucher as CEO, lists offices in Kusnacht/Zurich, Zug, Lucerne, St. Moritz, Pfaeffikon/SZ and Basel, and describes an exclusive Christie's International Real Estate partnership that opens a global clientele and an exceptional worldwide portfolio for sale or purchase. Company LinkedIn publishes +41 44 388 58 68 and info@wuw.ch and restates exclusive CIRE coverage for those German-speaking Swiss offices. Distinct from SPG One (Romandie) and Wetag (Ticino): this is the Zurich-region UHNW Christie's desk. Italy is via CIRE Italian affiliates, not a published Amalfi mandate. Personal email is not published. Score 8: +3 Zurich-region UHNW, +2 international CIRE network, +2 Italy affiliates, +1 trophy.",
    },
    {
        "city": "Geneva",
        "company_name": "FGP Swiss & Alps",
        "type": "luxury_agency",
        "contact_name": "Quentin Epiney",
        "contact_role": "Founder and Chief Executive Officer",
        "email": "contact@fgp-swissandalps.com",
        "phone": "+41 22 319 89 15",
        "website": "https://www.fgp-swissandalps.com/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Rare and prestigious Swiss and French-Alps residential; Forbes Global Properties exclusive representative for Switzerland and the French Alps; international referral network",
        "geographic_focus": "Geneva HQ (Cours de Rive 7) plus Nyon, Montreux, Sion, Grimentz, Saanen and Verbier; FGP network includes dedicated Italy members (Lake Como, Liguria, Sicily, Venice, Florence)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://comptoir-immo.ch/en/agences/fgp-swiss-alps/",
        "source_2": "https://www.fgp-swissandalps.com/",
        "notes": "BUYER-ORIGIN: Official Comptoir Immobilier agency page (parent group, founded 1825) describes FGP Swiss & Alps as a founding Forbes Global Properties member specialised in rare and prestigious properties in Switzerland and the French Alps, and publishes Cours de Rive 7, 1204 Geneva, +41 22 319 89 15 and contact@fgp-swissandalps.com. Forbes Global Properties agent page names Quentin Epiney as Founder and CEO (mobile +41 79 246 06 32). FGP's European membership includes Italy specialists (INTERNO 21 Lake Como, Immobiliare ZB Liguria, Building Heritage Florence/Rome/Sicily, Ravagnan's Venice, Castellanum Northern Italy), so a Swiss FGP desk can introduce Swiss buyers into Italian luxury stock. Amalfi is not a named FGP Italy member market. Score 8: +3 Geneva UHNW/FGP clients, +2 international luxury network, +2 Italy FGP members, +1 trophy.",
    },
    {
        "city": "Lugano",
        "company_name": "LFG Family Office SA",
        "type": "family_office",
        "contact_name": "",
        "contact_role": "Multi-family office (FINMA-regulated)",
        "email": "info@lfgfo.ch",
        "phone": "+41 91 911 53 53",
        "website": "https://www.lfgfo.ch/contact-us/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Multi-family office wealth stewardship for entrepreneurial families: planning, risk oversight and discretionary asset management; Ticino base with Swiss-Italian cross-border clientele",
        "geographic_focus": "Lugano (Via F. Pelli 12); website states the firm is active especially in Canton Ticino and addresses clients domiciled in Switzerland",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.lfgfo.ch/contact-us/",
        "source_2": "https://www.lfgfo.ch/",
        "notes": "BUYER-ORIGIN: Official contact page publishes Via F. Pelli 12, 6900 Lugano, +41 91 911 53 53 and info@lfgfo.ch. Legal notice states LFGFO is active in Switzerland especially in Canton Ticino. No named principal or published Italy/real-estate track record. Included as a gated Lugano multi-family-office introduction path to Italian-speaking Swiss entrepreneurial families, not as a trophy-property specialist. Score 6: +3 Ticino/Swiss family capital access, +2 Italian-speaking Switzerland cross-border context, +1 regulated MFO platform. Italy property investing is not evidenced on the public pages.",
    },
]


def priority_from_score(score: str) -> str:
    n = int(score)
    if n >= 8:
        return "A"
    if n >= 6:
        return "B"
    return "C"


def qa(rows: list[dict]) -> None:
    errors: list[str] = []
    names: dict[str, str] = {}
    emails: dict[str, str] = {}
    domains: dict[str, str] = {}
    for row in rows:
        for h in HEADERS:
            if h not in row:
                errors.append(f"{row.get('company_name', '?')}: missing {h}")
        if row["country"] != COUNTRY:
            errors.append(f"{row['company_name']}: bad country")
        if row["type"] not in ALLOWED_TYPE:
            errors.append(f"{row['company_name']}: bad type {row['type']}")
        if row["buyer_origin_relevance"] not in ALLOWED_BUYER_ORIGIN:
            errors.append(f"{row['company_name']}: bad buyer_origin")
        if row["italy_interest"] not in ALLOWED_ITALY:
            errors.append(f"{row['company_name']}: bad italy_interest")
        if row["amalfi_coast_relevance"] not in ALLOWED_AMALFI:
            errors.append(f"{row['company_name']}: bad amalfi")
        if row["luxury_real_estate"] not in ALLOWED_LUXURY:
            errors.append(f"{row['company_name']}: bad luxury")
        if row["hospitality_interest"] not in ALLOWED_HOSP:
            errors.append(f"{row['company_name']}: bad hospitality")
        if row["verification_status"] not in ALLOWED_VERIF:
            errors.append(f"{row['company_name']}: bad verification")
        if row["priority"] not in ALLOWED_PRIORITY:
            errors.append(f"{row['company_name']}: bad priority")
        if row["priority"] != priority_from_score(row["fit_score"]):
            errors.append(
                f"{row['company_name']}: priority {row['priority']} != score {row['fit_score']}"
            )
        if not (1 <= int(row["fit_score"]) <= 10):
            errors.append(f"{row['company_name']}: fit_score out of range")
        if row["priority"] == "A" and row["buyer_origin_relevance"] not in {"strong", "moderate"}:
            errors.append(f"{row['company_name']}: Priority A needs strong/moderate buyer origin")
        if row["priority"] == "A" and not row["source_1"].strip():
            errors.append(f"{row['company_name']}: Priority A missing source_1")
        email = row["email"].strip()
        if email and not EMAIL_RE.match(email):
            errors.append(f"{row['company_name']}: invalid email {email}")
        for url_field in ("website", "linkedin_company", "linkedin_contact", "source_1", "source_2"):
            val = row[url_field].strip()
            if val and not URL_RE.match(val):
                errors.append(f"{row['company_name']}: invalid URL in {url_field}: {val}")
        key = row["company_name"].strip().lower()
        if key in names:
            errors.append(f"duplicate company_name: {row['company_name']}")
        names[key] = row["company_name"]
        if email:
            el = email.lower()
            if el in emails:
                errors.append(f"duplicate email {email}")
            emails[el] = row["company_name"]
        site = row["website"].strip().lower().rstrip("/")
        if site:
            if site in domains and names.get(key) != row["company_name"]:
                errors.append(f"duplicate website {site}")
            domains[site] = row["company_name"]
        if row["last_verified"] != LAST_VERIFIED:
            errors.append(f"{row['company_name']}: last_verified")
    if errors:
        raise SystemExit("QA failed:\n" + "\n".join(errors))


def main() -> None:
    for row in ROWS:
        row["country"] = COUNTRY
        row["last_verified"] = LAST_VERIFIED
        for h in HEADERS:
            row.setdefault(h, "")
    qa(ROWS)
    out = Path("/workspace/data/real-estate-prospects/switzerland.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for row in ROWS:
            writer.writerow({h: row.get(h, "") for h in HEADERS})

    n = len(ROWS)
    n_a = sum(1 for r in ROWS if r["priority"] == "A")
    n_b = sum(1 for r in ROWS if r["priority"] == "B")
    n_c = sum(1 for r in ROWS if r["priority"] == "C")
    n_email = sum(1 for r in ROWS if r["email"].strip())
    print(f"Wrote {n} rows to {out}")
    print(f"Priority A={n_a} B={n_b} C={n_c} verified_email={n_email}")


if __name__ == "__main__":
    main()
