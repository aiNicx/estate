#!/usr/bin/env python3
"""Generate the France buyer-origin prospect CSV from verified research notes.

Buyer-origin test for every row:
Can this organisation or person realistically bring, represent, introduce,
advise, or be a buyer/investor FROM France (French UHNW/HNW clients) for a
EUR 6M-EUR 12M Amalfi Coast luxury property?

Geography is the origin of the buyer/capital, not the location of inventory.
Generic French domestic agencies that only sell French stock to foreigners,
portals, and mass-market brokers are excluded.
Emails are included only if published on an official site or a reputable
source (company legal notice, official blog, company LinkedIn). Never inferred.
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
COUNTRY = "France"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
URL_RE = re.compile(r"^https://", re.I)

# Fit scoring used in notes:
# +3 strong French UHNW/HNW/private-office capital access
# +2 demonstrated international / outbound luxury real-estate advisory
# +2 demonstrated Italy/Europe relevance
# +1 luxury/trophy/coastal asset relevance
# +1 EUR 6M-EUR 12M appears compatible

ROWS = [
    {
        "city": "Paris",
        "company_name": "BARNES Private Office Paris",
        "type": "private_office",
        "contact_name": "Claire Drean",
        "contact_role": "Business Manager, BARNES Private Office",
        "email": "",
        "phone": "+33 1 85 34 70 66",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-private-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "https://www.linkedin.com/in/claire-dr%C3%A9an-0b20b6a3",
        "investment_focus": "UHNW trophy residential (biens d'exception); Private Office advisory for exceptional assets, investors and family offices",
        "geographic_focus": "Paris 8th (14 avenue George V) serving French and international UHNW clients locally, nationally and internationally, with BARNES offices in Milano, Roma, Venezia, Cortina, Sardegna, Olbia and Catania",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "UHNW / compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-private-office.html",
        "source_2": "https://www.barnes-international.com/en/contact/italy/barnes-milano.html",
        "notes": "BUYER-ORIGIN: Official Private Office page lists Claire Drean as Business Manager with Edmond Tran and Meige Wang, 14 avenue George V, 75008 Paris, +33 1 85 34 70 66; no personal or desk email is published. barnes-paris.com names Vincent Desmarie as Network Director of the same department and states consultants assist locally, nationally or internationally. Official BARNES Milano and Roma FAQs state that for the most exceptional properties the Paris Private Office can present assets to investors and family offices in contact with UHNWI clients, and that international buyers particularly French clients investing abroad get a single point of contact coordinated with other network agencies. Italy offices exist; Amalfi/Campania is not named (Roma is the nearest Italian desk). Score 9: +3 French UHNW Private Office, +2 outbound international mandate, +2 Italy offices plus explicit French-clients-abroad language, +1 trophy, +1 ticket. Email empty because none is published.",
    },
    {
        "city": "Paris",
        "company_name": "BARNES Family Office",
        "type": "family_office",
        "contact_name": "Charles Brunswick",
        "contact_role": "President, BARNES Family Office by Come",
        "email": "",
        "phone": "+33 1 86 95 93 75",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-family-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "https://www.linkedin.com/in/charlesbrunswick",
        "investment_focus": "Multi-family-office wealth strategies combining tax, financial management, private equity and luxury real estate in France and internationally",
        "geographic_focus": "Paris 16th (20 avenue Kleber) family-office clients with access to the BARNES luxury network including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "family-office / UHNW; unknown for a single residence",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-family-office.html",
        "source_2": "https://comemaisonfinanciere.com/2023/11/27/barnesfamilyofficebycome/",
        "notes": "BUYER-ORIGIN: Official BARNES Family Office page lists Charles Brunswick and Julien Magitteri, 20 avenue Kleber, 75016 Paris, +33 1 86 95 93 75, and states the Come partnership offers unique support in luxury real estate both in France and internationally. Come's own announcement quotes Brunswick as president and describes France-and-international luxury real estate for family-office clients. Distinct access path from the George V Private Office: this is the wealth/FO introduction channel. No email is published on the official contact page. Amalfi is not named. Score 8: +3 French family-office UHNW, +2 France-and-international luxury RE mandate, +2 Italy via the BARNES network, +1 trophy. Ticket compatibility not added because a single coastal villa is not evidenced.",
    },
    {
        "city": "Paris",
        "company_name": "BARNES Global Office",
        "type": "international_property_advisor",
        "contact_name": "",
        "contact_role": "International network hub (no named advisor published on the office page)",
        "email": "",
        "phone": "+33 1 55 61 92 90",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-global-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "",
        "investment_focus": "Cross-border luxury residential search and referrals across the BARNES integrated network",
        "geographic_focus": "Paris 16th (81 avenue Kleber) hub coordinating the 150-agency / 22-country BARNES network including seven Italian offices",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-global-office.html",
        "source_2": "https://www.barnes-international.com/en/about-barnes/find-an-agency.html",
        "notes": "BUYER-ORIGIN: Official Global Office page publishes 81 avenue Kleber, 75016 Paris, +33 1 55 61 92 90; no team names or emails are listed. The Italian-language version of the same page states consultants accompany luxury projects in Italy or abroad. The official agency directory lists BARNES Cortina, Milano, Olbia, Roma, Sardegna, Venezia and Catania. This is the Paris network-routing desk, complementary to Private Office (UHNW trophy) and Family Office (wealth). No published email. Score 8: +3 Paris international hub for French-network clients, +2 explicit Italy-or-abroad language, +2 Italian office list, +1 trophy. Named contact empty because none is published.",
    },
    {
        "city": "Paris",
        "company_name": "Daniel Feau / Belles Demeures de France International Desk",
        "type": "international_property_advisor",
        "contact_name": "Aline Nagasawa",
        "contact_role": "International Desk Coordinator (incoming and outgoing referrals)",
        "email": "international@feau-bdf.com",
        "phone": "+33 1 53 23 80 48",
        "website": "https://danielfeau.com/en/team/7483",
        "linkedin_company": "https://www.linkedin.com/company/danielfeauimmobilier",
        "linkedin_contact": "",
        "investment_focus": "Paris and France luxury residential plus dedicated international referrals for clients buying or selling abroad; Christie's International Real Estate and LeadingRE member",
        "geographic_focus": "Paris 8th (30 avenue Pierre 1er de Serbie) international desk; published international stock includes a Lake Como villa; LeadingRE coverage of Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "Paris trophy and international listings into and above EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://danielfeau.com/en/team/6047",
        "source_2": "https://www.leadingre.com/es/members/daniel-feau-conseil-immobilier-sa",
        "notes": "BUYER-ORIGIN: Official Aline Nagasawa page names her International desk coordinator at Belles Demeures de France, states that from 2015 Marie-Helene Lundgreen entrusted her with international referrals for the Feau group, and that Marie-Helene and Aline advise clients on any international real estate projects. Official International Desk page publishes +33 1 53 23 80 48 and international@feau-bdf.com and currently lists a Lake Como villa among international properties. LeadingRE member profile names Aline Nagasawa as Relocation Director, Incoming Coordinator and Outgoing Coordinator, referral email international@feau-bdf.com, and Charles-Marie Jottras as broker. Lundgreen is published as Manager of Belles Demeures de France (direct +33 1 53 23 81 82 / +33 6 60 34 14 62); her personal email is not published. Outgoing coordinator is the strongest public evidence of French-client-abroad origination in this set. Amalfi is not named; Como is. Score 9: +3 Paris UHNW/international desk, +2 explicit outgoing mandate, +2 Italy listing plus LeadingRE Italy, +1 trophy, +1 ticket.",
    },
    {
        "city": "Paris",
        "company_name": "Engel & Volkers France Private Office",
        "type": "private_office",
        "contact_name": "Petya Bokova",
        "contact_role": "Private Office Advisor; Head of Private Office France since 2024",
        "email": "paris@engelvoelkers.com",
        "phone": "+33 6 47 62 09 05",
        "website": "https://www.engelvoelkers.com/private-office/fr/advisors/petya-bokova",
        "linkedin_company": "https://www.linkedin.com/company/engel-volkers-paris",
        "linkedin_contact": "https://www.linkedin.com/in/petyabokova",
        "investment_focus": "UHNW Private Office advisory for exceptional residential in France and via the global Private Office network, including off-market",
        "geographic_focus": "Paris Private Office advisors (also Charlotte Alfonsi, Beatrice Bernard, Karen Schoemaker, Anne Sauvignon) connected to Engel & Volkers shops in Italy and worldwide",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "published Paris/Riviera Private Office stock includes properties from about EUR 2.4M to EUR 23M; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.engelvoelkers.com/fr/fr/shops/paris/team",
        "source_2": "https://www.engelvoelkers.com/fr/en/imprint",
        "notes": "BUYER-ORIGIN: Official Paris shop team page lists five Private Office Advisors with published mobiles: Charlotte Alfonsi +33 7 82 28 08 00, Beatrice Bernard +33 6 03 84 09 69, Petya Bokova +33 6 47 62 09 05, Anne Sauvignon +33 7 56 89 28 18, Karen Schoemaker +33 6 87 82 39 64. Bokova's official advisor page states she has been responsible for the Private Office since 2024. Schoemaker's page states she advises U(HNWI) on acquisition in Paris and on certain international markets. No advisor personal email is published; official France imprint of EV MMC France SAS (170 rue du Faubourg Saint-Honore, 75008 Paris) publishes paris@engelvoelkers.com, which is used rather than a patterned address. Global Private Office also publishes info@private-office.com in Hamburg. Italy is the brand's Italian shop/Private Office network, not a named Amalfi mandate. Score 8: +3 Paris UHNW Private Office, +2 international PO network, +2 Italy shops in the group, +1 trophy.",
    },
    {
        "city": "Paris",
        "company_name": "Junot Private Office",
        "type": "private_office",
        "contact_name": "Charles Gensollen",
        "contact_role": "Director, Junot Private Office",
        "email": "privateoffice@junot.fr",
        "phone": "+33 1 55 26 87 57",
        "website": "https://www.junot.fr/en/agencies/junot-private-office-6th-district-rue-tournon-paris",
        "linkedin_company": "https://www.linkedin.com/company/junotfineproperties",
        "linkedin_contact": "https://www.linkedin.com/in/charles-gensollen-71210610a",
        "investment_focus": "Ultra-luxury sales and acquisitions in Paris and internationally for French and international clients; Forbes Global Properties exclusive member for France and Belgium",
        "geographic_focus": "Paris 6th (11 rue de Tournon); official copy names Tuscany among worldwide acquisition destinations via Forbes Global Properties",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "published Private Office stock includes Paris apartments and mansions from about EUR 4M to EUR 19.8M; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.junot.fr/en/agencies/junot-private-office-6th-district-rue-tournon-paris",
        "source_2": "https://www.junot.fr/en/junot-private-office/",
        "notes": "BUYER-ORIGIN: Official Private Office agency page publishes 11 rue de Tournon, 75006 Paris, +33 1 55 26 87 57 and privateoffice@junot.fr, names Charles Gensollen as Director, and states the team supports projects in Paris and internationally. Gensollen's public LinkedIn appointment post says the desk serves French and international clients on significant real estate matters. Official Private Office pages state Junot sells and acquires prestige properties all over the world and, with Forbes Global Properties, assists clients in acquiring luxury properties in France and abroad, explicitly naming the hills of Tuscany among destinations. Strongest additional French-origin outbound desk besides BARNES/Feau. Amalfi is not named (Tuscany is). Score 9: +3 French UHNW Private Office, +2 worldwide acquisition mandate, +2 named Italian destination plus FGP Italy members, +1 trophy, +1 ticket.",
    },
    {
        "city": "Cannes",
        "company_name": "Cote d'Azur Sotheby's International Realty Private Desk",
        "type": "private_office",
        "contact_name": "Peter Illovsky",
        "contact_role": "President; Private Desk (with Frederic Barth, Managing Director)",
        "email": "info@cotedazur-sothebysrealty.com",
        "phone": "+33 4 92 92 12 88",
        "website": "https://www.cotedazur-sothebysrealty.com/en/private-desk/",
        "linkedin_company": "https://www.linkedin.com/company/cote-d'azur-sotheby's-international-realty",
        "linkedin_contact": "https://www.linkedin.com/in/peter-illovsky",
        "investment_focus": "Off-market and trophy villas for high-profile owners and family offices; buyer search in France and internationally via the Sotheby's International Realty network",
        "geographic_focus": "Cannes Croisette flagship plus Beaulieu, Cap Ferrat, Saint-Tropez, Nice and Mougins; sister Italy Sotheby's International Realty includes a Naples office",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "Private Desk listings currently include properties from about EUR 12.5M to EUR 49M; compatible with and above EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.cotedazur-sothebysrealty.com/en/private-desk/",
        "source_2": "https://www.cotedazur-sothebysrealty.com/en/legal-notices/",
        "notes": "BUYER-ORIGIN: Official Private Desk page names Peter Illovsky as President and Frederic Barth as Managing Director and states clients get privileged access to the finest properties in France and internationally; the homepage also presents them as dedicated interlocutors for investment projects in France and abroad. The firm says it welcomes a privileged French, Monegasque and international clientele. Legal notices publish info@cotedazur-sothebysrealty.com. Italy Sotheby's International Realty operates 15 offices including Naples, which is the nearest SIR desk to the Amalfi Coast; Amalfi itself is not named on the French pages. Barth LinkedIn: https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-barth. Score 9: +3 Riviera French/Monaco UHNW, +2 explicit France-and-abroad buyer mandate, +2 SIR Italy including Naples, +1 trophy, +1 ticket.",
    },
    {
        "city": "Nice",
        "company_name": "Savills French Riviera Private Office",
        "type": "private_office",
        "contact_name": "Alex Balkin",
        "contact_role": "Executive Director, Savills French Riviera and French Alps",
        "email": "riviera@savills.com",
        "phone": "+33 4 93 87 41 15",
        "website": "https://riviera.savills.fr/en/private-office/",
        "linkedin_company": "https://www.linkedin.com/company/savills-french-riviera-french-alps",
        "linkedin_contact": "https://www.linkedin.com/in/alex-balkin",
        "investment_focus": "Savills Private Office for HNWI/UHNWI and their advisers: confidential international property search, financing, investment and lifestyle introductions across 70 countries",
        "geographic_focus": "Nice head office (11 Avenue Jean Medecin) covering Monaco to Saint-Tropez and the French Alps; Savills also operates in Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "record Riviera super-prime; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://riviera.savills.fr/en/private-office/",
        "source_2": "https://riviera.savills.fr/en/contact/",
        "notes": "BUYER-ORIGIN: Official Private Office page describes a 2007 UHNW service with 20 global colleagues, 700 offices in 70 countries, and locally based Riviera representatives. No Private Office-specific names or emails are published on that page. Alex Balkin is the named Executive Director of Savills French Riviera and French Alps on the official Nice agency page; his bio states the business covers St Tropez to the Italian border. Official contact/legal pages publish riviera@savills.com and +33 4 93 87 41 15. Company LinkedIn also publishes capferrat@savills.com for the Cap Ferrat team; the head-office inbox is used here. Savills Italy (Milan) is a separate operating company; the Riviera PO is the French-origin routing desk. Much of the published Riviera book is inbound foreigners buying France; French UHNW on the Cote d'Azur remain a realistic origin via this PO. Score 8: +3 Riviera UHNW, +2 global Private Office, +2 Italy via Savills Italy plus border adjacency, +1 trophy. No personal email for Balkin is published.",
    },
    {
        "city": "Cannes",
        "company_name": "John Taylor Cannes",
        "type": "luxury_agency",
        "contact_name": "Gilles Tejedor",
        "contact_role": "Executive Director (Cannes office; also quoted as group executive director)",
        "email": "cannes@john-taylor.com",
        "phone": "+33 4 97 06 65 65",
        "website": "https://www.john-taylor.com/luxury-real-estate-agency/cannes/",
        "linkedin_company": "https://www.linkedin.com/company/john-taylor-luxury-real-estate",
        "linkedin_contact": "",
        "investment_focus": "Cote d'Azur luxury sales, rentals and estate management since 1864; intra-group introductions including Milan/Como",
        "geographic_focus": "Cannes (6 rue Frederic Amouretti) plus Cap d'Antibes, Saint-Jean-Cap-Ferrat, Saint-Tropez, Mougins; sister offices in Milan (Via Saffi and Via Senato)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "Riviera trophy; published Cannes sale stock is mixed, with group super-prime well above EUR 6M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.john-taylor.com/luxury-real-estate-agency/cannes/",
        "source_2": "https://www.john-taylor.com/luxury-real-estate-agency/milan/",
        "notes": "BUYER-ORIGIN: Official Cannes page lists Gilles Tejedor as Executive Director and Frederic Ernandes as Agency Manager (Italian-speaking), 6 rue Frederic Amouretti, 06400 Cannes, +33 4 97 06 65 65. Official John Taylor blog and company LinkedIn posts publish cannes@john-taylor.com; legal notice publishes contact@john-taylor.com. Official Milan page (Sumptuosae Domus SRL) lists two offices, +39 02 48 19 94 64, and a team including Nicola Schon (President), Felice Rusconi (Managing Director) and Antonella Gresia (Commercial Director); a John Taylor newsletter publishes milan@john-taylor.com. Residences Immobilier quotes Tejedor on orchestrating outsize sales per year in France and abroad. This is a French-origin Riviera house (1864, Cannes), not a Paris inbound shop. Amalfi is not named; Milan/Como is the published Italian coverage. Score 8: +3 Cannes UHNW French-origin house, +2 France-and-abroad language plus international group, +2 Milan offices, +1 trophy/coastal.",
    },
    {
        "city": "Paris",
        "company_name": "Knight Frank France Prime Residential",
        "type": "luxury_agency",
        "contact_name": "Alison Ashby",
        "contact_role": "Partner, Head of Paris Prime Residential Real Estate",
        "email": "",
        "phone": "+33 1 43 16 88 88",
        "website": "https://www.knightfrank.fr/en/services/residential/",
        "linkedin_company": "https://www.linkedin.com/company/knight-frank-france",
        "linkedin_contact": "https://www.linkedin.com/in/alison-ashby-7002bb10",
        "investment_focus": "Prime and ultra-luxury residential sales and acquisitions in France and Monaco; international residential network including Italy associates",
        "geographic_focus": "Paris (7 Place Vendome) with associate partners on the Cote d'Azur, Alps, Provence and South-West; Knight Frank Italy residential associates",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Paris prime UHNW; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.knightfrank.fr/en/services/residential/",
        "source_2": "https://www.knightfrank.fr/actualites/knight-frank-cree-un-nouveau-departement-residentiel-prime-a-paris-et-nomme-alison-ashby-a-sa-tete",
        "notes": "BUYER-ORIGIN: Official residential page names Alison Ashby as Partner, Head of Paris Prime Residential, phone 01 43 16 88 88, with a Send an email control that does not disclose the address. Official launch release states the department advises clients on sale and acquisition of ultra-luxury property in Paris and quotes Ashby on accompanying clients in an increasingly international market; Mark Harvey (Knight Frank International Residential) is quoted on internalising this capability in France. Knight Frank separately maintains Italy residential associates (including La Reale Domus / Lake Como coverage). Legal notice publishes only knightfrank.dpd@fr.knightfrank.com (data-protection mailbox), which is not used as a sales inbox. Personal first.last email is not published and is not inferred. Score 8: +3 Paris prime UHNW, +2 international residential platform, +2 Knight Frank Italy associates, +1 trophy.",
    },
    {
        "city": "Cannes",
        "company_name": "Michael Zingraf Real Estate",
        "type": "luxury_agency",
        "contact_name": "Michael Zingraf",
        "contact_role": "Founder and Chairman",
        "email": "contact@michaelzingraf.com",
        "phone": "+33 4 93 39 77 77",
        "website": "https://www.michaelzingraf.com/en/real-estate-agency/michael-zingraf-head-office",
        "linkedin_company": "https://www.linkedin.com/company/michael-zingraf-immobilier",
        "linkedin_contact": "https://www.linkedin.com/in/micha%C3%ABl-zingraf-631a2a2a",
        "investment_focus": "Cote d'Azur and Provence trophy residential; exclusive Christie International Real Estate affiliate for PACA; Europe/Italy listings via group site",
        "geographic_focus": "Cannes Croisette head office plus Riviera, Provence, Paris, Alps and Mauritius; Europe sale section includes Italy",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Riviera trophy; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.michaelzingraf.com/en/agencies",
        "source_2": "https://www.michaelzingraf.com/en/group/christies-international-real-estate",
        "notes": "BUYER-ORIGIN: Official agencies page publishes Michael Zingraf Head Office, 53-54 Bd de la Croisette, 06400 Cannes, +33 4 93 39 77 77, contact@michaelzingraf.com, plus cannes@michaelzingraf.com. Official buying guide states the firm has assisted French and international clients since 1977; Christie affiliate page states the teams support a French and international clientele. Official Europe/Italy sale pages show the group markets Italian stock through the network. Heathcliff Zingraf (son) joined in 2001 per the about page. The published mandate is stronger on selling French Riviera homes to international buyers than on originating French clients into Amalfi; CIRE Italian affiliates are the Italy path. Score 7: +2 French UHNW clientele (not a full +3 because the public book is inbound-heavy), +2 CIRE international network, +2 Italy listings/affiliates, +1 trophy.",
    },
    {
        "city": "Paris",
        "company_name": "Emile Garcin International",
        "type": "luxury_agency",
        "contact_name": "Nathalie Garcin",
        "contact_role": "President, Emile Garcin Proprietes (International office at 24 rue du Boccador)",
        "email": "",
        "phone": "+33 1 58 12 02 02",
        "website": "https://emilegarcin.com/en/agency/emile-garcin-international",
        "linkedin_company": "https://www.linkedin.com/company/emile-garcin-proprietes-aix-en-provence",
        "linkedin_contact": "https://www.linkedin.com/in/nathalie-garcin-ba87a467",
        "investment_focus": "Family-owned prestige residential; dedicated Paris International office for cross-border search among 27 owned agencies plus Morocco, Geneva and Brussels",
        "geographic_focus": "Paris 8th International office; owned network across France plus Belgium, Switzerland (Geneva) and Morocco; Italy not a published office",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "character prestige; unknown for a typical Italy purchase",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://emilegarcin.com/en/agency/emile-garcin-international",
        "source_2": "https://www.emilegarcin.com/en/contact-us",
        "notes": "BUYER-ORIGIN: Official International agency page publishes 24 rue du Boccador, 75008 Paris, +33 1 58 12 02 02. Contact forms list Emile Garcin - International as a selectable office. Homepage states the family house (Nathalie, Emmanuel and Antoine Garcin) has 27 non-franchised agencies and a presence abroad in Morocco, Geneva and Brussels. Martial Michaux is publicly identified as Director of Development and Director of Emile Garcin Paris; no personal email for Nathalie Garcin or Michaux is published. The only published mailbox on the contact pages is rgpd@emilegarcin.com (GDPR), which is not used as a sales inbox. Italy is not a named office or destination on the pages reviewed, so italy_interest is unclear despite a genuine International desk. Score 6: +3 French family UHNW house, +2 dedicated International office, +1 trophy. Italy/Europe points not added.",
    },
    {
        "city": "Paris",
        "company_name": "Vaneau Collection Privee",
        "type": "luxury_agency",
        "contact_name": "Alexandra Leca",
        "contact_role": "Directrice generale / CEO, Vaneau",
        "email": "collection-privee@vaneau.fr",
        "phone": "+33 1 53 10 15 15",
        "website": "https://www.vaneau.fr/en/real-estate-agencies/vaneau-collection-privee",
        "linkedin_company": "https://www.linkedin.com/company/vaneau",
        "linkedin_contact": "https://www.linkedin.com/in/alexandra-leca-b50ab225",
        "investment_focus": "Haute-couture residential for French and international clients from about EUR 4M to over EUR 50M, including off-market",
        "geographic_focus": "Paris 16th (19 avenue Raymond Poincare) plus Cannes, Brussels and Marrakech teams; Italy not a published office",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "EUR 4M to over EUR 50M; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.vaneau.fr/en/real-estate-agencies/vaneau-collection-privee",
        "source_2": "https://www.vaneau.fr/en",
        "notes": "BUYER-ORIGIN: Official Collection Privee page publishes 19 avenue Raymond Poincare, 75116 Paris, +33 1 53 10 15 15 and collection-privee@vaneau.fr, names Alexandra Leca as Directrice generale, and states the house caters to a demanding French and international clientele seeking rare properties from EUR 4 million to over EUR 50 million in Paris, Cannes, Brussels and Marrakech. That ticket band matches this asset. Italy is not named; international evidence is Brussels/Marrakech plus a claim of global luxury-market expertise rather than an Italy desk. Score 7: +3 French UHNW EUR 4M-EUR 50M book, +2 international offices, +1 trophy, +1 ticket. Italy points not added.",
    },
    {
        "city": "Paris",
        "company_name": "Paris Ouest Sotheby's International Realty",
        "type": "luxury_agency",
        "contact_name": "",
        "contact_role": "Paris 16th / 17th / Neuilly luxury brokerage (no MD name on the homepage)",
        "email": "parisouest@parisouest-sothebysrealty.com",
        "phone": "+33 1 40 60 50 00",
        "website": "https://www.parisouest-sothebysrealty.com/en/",
        "linkedin_company": "https://www.linkedin.com/company/paris-ouest-sothebys-interntional-realty",
        "linkedin_contact": "",
        "investment_focus": "Prime Paris-Ouest residential; international Sotheby's International Realty referrals",
        "geographic_focus": "Paris 16th (95 avenue Victor Hugo), Auteuil, Wagram, Neuilly; Sotheby's International Realty France-Monaco network of nearly 80 agencies plus Italy SIR sister company",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Paris 16th trophy; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.parisouest-sothebysrealty.com/en/",
        "source_2": "https://www.italy-sothebysrealty.com/en/about-us/",
        "notes": "BUYER-ORIGIN: Official homepage publishes 95 avenue Victor Hugo, +33 1 40 60 50 00, and describes multilingual international professionals. Official company LinkedIn posts publish parisouest@parisouest-sothebysrealty.com; the website itself uses a form only, so the email is taken from the company's own LinkedIn, not inferred. FAQ copy on the same site says buyers come mainly from the United States, the Middle East and Europe, i.e. inbound to Paris, so French-client-abroad origination is only via the SIR network (Italy Sotheby's International Realty, 15 offices including Naples). No managing-director name is published on the homepage. Score 6: +2 Paris 16th UHNW access (not a full +3 because the published mandate is inbound), +2 SIR global/Italy network, +1 luxury, +1 ticket.",
    },
    {
        "city": "Paris",
        "company_name": "Proprietes Parisiennes Sotheby's International Realty",
        "type": "luxury_agency",
        "contact_name": "Pascale Constans",
        "contact_role": "Manager, Proprietes Parisiennes (Faubourg Saint-Honore)",
        "email": "sothebysir8@proprietesparisiennes.com",
        "phone": "+33 1 44 94 99 80",
        "website": "https://www.proprietesparisiennes-sothebysrealty.com/en/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Paris luxury apartments and hotels particuliers; Sotheby's International Realty network referrals",
        "geographic_focus": "Paris 8th, 7th, 6th and 9th offices; France-Monaco SIR network and Italy SIR sister company",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Paris trophy; compatible with EUR 6M-EUR 12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.proprietesparisiennes-sothebysrealty.com/en/legal-information-real-estate-agency-proprietes-parisiennes/",
        "source_2": "https://www.italy-sothebysrealty.com/en/about-us/",
        "notes": "BUYER-ORIGIN: Official legal notices name SAS Proprietes Parisiennes, 124 rue du Faubourg Saint-Honore, 75008 Paris, +33 1 44 94 99 80, manager Mrs Pascale Constans, and publish sothebysir8@proprietesparisiennes.com as the data-rights mailbox (the only published email; used because it is on the official site, not inferred). Additional offices: 114 rue du Bac +33 1 70 36 44 00; 29 rue Saint Sulpice +33 1 82 73 25 00; 26 avenue Trudaine +33 1 77 37 39 21. Like Paris Ouest, the public mandate is Paris luxury stock marketed internationally rather than a documented French-clients-buying-abroad desk. Italy is via Italy Sotheby's International Realty (including Naples). Score 6: +2 Paris UHNW (inbound-heavy), +2 SIR Italy sister, +1 luxury, +1 ticket.",
    },
    {
        "city": "Monte-Carlo",
        "company_name": "Sotheby's International Realty France-Monaco",
        "type": "luxury_agency",
        "contact_name": "Alexander Kraft",
        "contact_role": "Chairman, Sotheby's International Realty France-Monaco",
        "email": "info@sothebysrealty-france.com",
        "phone": "+377 97 70 35 15",
        "website": "https://www.sothebysrealty-france.com/en/sothebys-france-contact-us/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Master franchise for nearly 80 prime agencies across France and Monaco; global SIR marketing of French stock and network referrals",
        "geographic_focus": "Monte-Carlo HQ (17 boulevard de Suisse) covering Paris, Cote d'Azur, Provence, Bordeaux, Lyon, Corsica, La Baule and Monaco; sister Italy SIR network",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "2025 network average around EUR 1.95M; Private Desk / Paris trophy stock reaches EUR 6M-EUR 12M+",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.sothebysrealty-france.com/en/sothebys-france-contact-us/",
        "source_2": "https://www.parisouest-sothebysrealty.com/en/",
        "notes": "BUYER-ORIGIN: Official HQ contact page publishes 17 boulevard de Suisse, 98000 Monte-Carlo, +377 97 70 35 15 and info@sothebysrealty-france.com. Paris Ouest network copy names Alexander Kraft as chairman since 2004 and cites nearly 80 agencies and about EUR 1.95bn volume in 2025. This HQ is a network router, not a local UHNW desk; published buyer-origin language on affiliate sites emphasises inbound (US, Middle East, Europe) into French stock. Included because French-network clients can be referred into Italy Sotheby's International Realty (Naples among 15 Italian offices). Prefer the Cote d'Azur Private Desk row for a named Riviera UHNW conversation. Score 6: +2 French SIR network access, +2 Italy SIR sister including Naples, +1 luxury, +1 ticket at the trophy end of the book.",
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
        if row["priority"] == "A" and not row["source_2"].strip():
            errors.append(f"{row['company_name']}: Priority A missing source_2")
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
        if row["last_verified"] != LAST_VERIFIED:
            errors.append(f"{row['company_name']}: last_verified")
        # Anti-hallucination: never ship patterned first.last guesses
        if email and re.match(r"^[a-z]+\.[a-z]+@", email.lower()):
            if email.lower() not in {
                # none allowed unless they were copied from a page; keep this as a tripwire
            }:
                # Allow only if we explicitly listed it; currently no first.last emails.
                errors.append(f"{row['company_name']}: refusing patterned first.last email {email}")
    if errors:
        raise SystemExit("QA failed:\n" + "\n".join(errors))


def main() -> None:
    for row in ROWS:
        row["country"] = COUNTRY
        row["last_verified"] = LAST_VERIFIED
        for h in HEADERS:
            row.setdefault(h, "")
    qa(ROWS)
    out = Path("/workspace/data/real-estate-prospects/france.csv")
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
