#!/usr/bin/env python3
"""Generate the France buyer-origin prospect CSV from verified research notes.

Buyer-origin test for every row:
Can this organisation or person realistically bring, represent, introduce,
advise, or be a buyer/investor FROM France for a €6M–€12M Amalfi Coast
luxury property?

Geography is the origin of the buyer/capital, not the location of inventory.
Generic French domestic agencies, portals, mortgage brokers, construction
firms, and institutional funds with incompatible tickets are excluded.
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
# +3 strong French UHNW/private/institutional capital access
# +2 demonstrated international luxury real-estate activity
# +2 demonstrated Italy/Europe relevance
# +1 luxury/trophy/coastal asset relevance
# +1 hospitality/leisure relevance
# +1 €6M–€12M appears compatible

ROWS = [
    {
        "city": "Paris",
        "company_name": "BARNES Private Office",
        "type": "private_office",
        "contact_name": "Claire Drean",
        "contact_role": "Named on the official Private Office team page",
        "email": "",
        "phone": "+33 1 85 34 70 66",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-private-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "",
        "investment_focus": "UHNW / family-office trophy residential; exceptional assets presented off-market in France and internationally through the Paris Private Office",
        "geographic_focus": "Paris 8th desk at 14 avenue George V serving French and international private clients into the BARNES network, including Italian offices",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "compatible with €6M–€12M trophy residential; exact typical ticket unpublished",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-private-office.html",
        "source_2": "https://www.barnes-international.com/en/contact/italy/barnes-milano.html",
        "notes": "BUYER-ORIGIN: French-founded luxury group; this row is the Paris Private Office, not an Italian listing desk. Official Private Office page publishes 14 avenue George V, 75008 Paris, +33 1 85 34 70 66 and names Claire Drean, Edmond Tran and Meige Wang. No personal or agency sales email is published. Official BARNES Milano FAQ states the Paris Private Office can present exceptional assets to investors and family offices, and that international buyers — particularly French clients investing abroad — get a single point of contact with other BARNES agencies. Italy offices include Milan, Rome, Venice, Cortina and Sardinia; Amalfi/Campania is not named. Score 9: +3 French UHNW/FO access, +2 international luxury RE, +2 Italy network plus explicit French-clients-abroad language, +1 trophy, +1 ticket compatibility.",
    },
    {
        "city": "Paris",
        "company_name": "BARNES Family Office",
        "type": "private_office",
        "contact_name": "Charles Brunswick",
        "contact_role": "Named first on the official Family Office team page",
        "email": "",
        "phone": "+33 1 86 95 93 75",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-family-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "",
        "investment_focus": "Family-office / private-client real-estate advisory for luxury assets in France and internationally, distinct from the George V Private Office",
        "geographic_focus": "20 avenue Kleber, 75016 Paris; introductions into the BARNES international network including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-family-office.html",
        "source_2": "https://www.barnes-international.com/en/contact/italy/barnes-roma.html",
        "notes": "BUYER-ORIGIN: Official Family Office page publishes 20 avenue Kleber, 75016 Paris, +33 1 86 95 93 75 and names Charles Brunswick, Morgane Agostini, Julien Magitteri, Brice Anger and Aron Shadbolt. No email is published. This is a Paris wealth/family-office introduction path for French private clients, not a principal single-family office and not a duplicate of the George V Private Office. Italy interest is via the BARNES network (Rome FAQ repeats the French-clients-investing-abroad coordination language); Amalfi is not named. Score 8: +3 French FO-client access, +2 international luxury RE, +2 Italy network, +1 trophy.",
    },
    {
        "city": "Paris",
        "company_name": "BARNES Global Office",
        "type": "international_property_advisor",
        "contact_name": "",
        "contact_role": "Paris network hub for cross-border BARNES files (no named advisor on the office page)",
        "email": "",
        "phone": "+33 1 55 61 92 90",
        "website": "https://www.barnes-international.com/en/contact/france/barnes-global-office.html",
        "linkedin_company": "https://www.linkedin.com/company/barnes_realty",
        "linkedin_contact": "",
        "investment_focus": "Central Paris routing desk for international BARNES referrals; not a substitute for the George V Private Office UHNW team",
        "geographic_focus": "81 avenue Kleber, 75016 Paris; directory lists Italian BARNES offices (Milan, Rome, Venice, Cortina, Sardinia)",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.barnes-international.com/en/contact/france/barnes-global-office.html",
        "source_2": "https://www.barnes-international.com/en/about-barnes/find-an-agency.html",
        "notes": "BUYER-ORIGIN: Official Global Office page publishes 81 avenue Kleber, 75016 Paris, +33 1 55 61 92 90. No email or named advisor is published. Official agency directory lists BARNES Global Office alongside Italian offices. Kept as a distinct network-routing function from Private Office and Family Office, scored below those named UHNW desks. Amalfi is not named. Score 6: +2 Paris network hub, +2 international BARNES, +2 Italy offices.",
    },
    {
        "city": "Paris",
        "company_name": "Belles Demeures de France | Daniel Feau (Christie's International Real Estate)",
        "type": "international_property_advisor",
        "contact_name": "Aline Nagasawa",
        "contact_role": "International Desk Coordinator",
        "email": "international@feau-bdf.com",
        "phone": "+33 1 53 23 80 48",
        "website": "https://danielfeau.com/en/International-network",
        "linkedin_company": "https://www.linkedin.com/company/danielfeauimmobilier",
        "linkedin_contact": "",
        "investment_focus": "Paris and western-suburbs luxury residential plus a dedicated international desk that both receives foreign buyers and assists French clients searching abroad via Christie's International Real Estate and Luxury Portfolio International",
        "geographic_focus": "Paris 8th (30 avenue Pierre 1er de Serbie); outbound search 'whatever the destination' through CIRE, including current Italian stock such as Lake Como",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "group states 42.4% of Parisian sales above €4M; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://danielfeau.com/en/real-estate-agency-details/3161",
        "source_2": "https://www.leadingre.com/members/belles-demeures-de-france",
        "notes": "BUYER-ORIGIN: Official Belles Demeures de France agency page states the firm is the reference for international customers seeking upmarket properties 'while also assisting French buyers in their research abroad'. The same page names Aline Nagasawa as International desk coordinator at +33 1 53 23 80 48 and publishes the agency at 30 avenue Pierre 1er de Serbie, 75008 Paris, +33 1 53 23 81 81, notif.leads.bdf@bdfrance.fr. LeadingRE member record publishes international@feau-bdf.com as the referral inbox (used here; personal emails are not published). Official international-network page says clients who give search criteria for a beautiful property abroad, whatever the destination, are accompanied by CIRE professionals. Italy evidence is CIRE plus a published Lake Como listing; Amalfi is not named. Score 9: +3 explicit French-buyer-abroad desk, +2 CIRE international luxury, +2 Italy/Como, +1 trophy, +1 ticket.",
    },
    {
        "city": "Paris",
        "company_name": "Junot Private Office",
        "type": "private_office",
        "contact_name": "Charles Gensollen",
        "contact_role": "Director",
        "email": "privateoffice@junot.fr",
        "phone": "+33 1 55 26 87 57",
        "website": "https://www.junot.fr/en/agencies/junot-private-office-6th-district-rue-tournon-paris",
        "linkedin_company": "https://www.linkedin.com/company/junotfineproperties",
        "linkedin_contact": "https://www.linkedin.com/in/charles-gensollen-71210610a",
        "investment_focus": "Ultra-luxury sales and acquisitions in Paris and internationally; Forbes Global Properties representative for France and Belgium",
        "geographic_focus": "11 rue de Tournon, 75006 Paris; official copy names Tuscany among worldwide acquisition destinations for clients",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "ultra-luxury Paris stock; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.junot.fr/en/agencies/junot-private-office-6th-district-rue-tournon-paris",
        "source_2": "https://www.junot.fr/en/junot-private-office/about-us",
        "notes": "BUYER-ORIGIN: Official agency page publishes 11 rue de Tournon, 75006 Paris, +33 1 55 26 87 57, privateoffice@junot.fr and names Charles Gensollen as Director. It states the team is with the client at every stage 'both in Paris and internationally' and, as Forbes Global Properties representative, assists clients in acquiring luxury properties in France and abroad, naming 'the serene hills of Tuscany' among destinations. Gensollen's public appointment post describes the desk as serving French and international clients. About-us also markets Paris stock to international buyers, so the book is two-way; the outbound Tuscany/FGP language is the Italy evidence. Amalfi is not named. Score 8: +3 Paris UHNW Private Office, +2 international acquisitions/FGP, +2 Tuscany named, +1 trophy.",
    },
    {
        "city": "Cannes",
        "company_name": "Cote d'Azur Sotheby's International Realty — Private Desk",
        "type": "private_office",
        "contact_name": "Maud Damevin",
        "contact_role": "Manager, CASIR Cannes (legal representative)",
        "email": "info@cotedazur-sothebysrealty.com",
        "phone": "+33 4 92 92 12 88",
        "website": "https://www.cotedazur-sothebysrealty.com/en/private-desk/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Private Desk for luxury and off-market French Riviera properties, with SIR network access to properties in France and internationally",
        "geographic_focus": "Cannes Croisette flagship plus Beaulieu, Cap Ferrat, Saint-Tropez, Nice and Mougins; Italy via sister Italy Sotheby's International Realty (including Naples)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "Private Desk stock currently includes about €15M–€27M Riviera houses; compatible with and above €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.cotedazur-sothebysrealty.com/en/private-desk/",
        "source_2": "https://www.cotedazur-sothebysrealty.com/en/legal-notices/",
        "notes": "BUYER-ORIGIN: Official Private Desk page is the prestige/off-market department of the French Riviera SIR affiliate, with Cannes at 74 boulevard de la Croisette, +33 4 92 92 12 88. Legal notices name SARL CASIR Cannes, manager Maud Damevin, and publish info@cotedazur-sothebysrealty.com (also info@azur-sir.com). Ticket evidence is on-page Private Desk listings (e.g. Port Grimaud €15M, Saint-Tropez €25M–€27M). Italy is via the global SIR network, including Italy Sotheby's International Realty offices (Naples is the nearest published SIR desk to Amalfi). Amalfi itself is not named on the French pages. Some Riviera flow is inbound foreigners; the desk still holds a French/Monaco UHNW book at trophy coastal tickets. Score 8: +3 Riviera UHNW origin, +2 international SIR, +2 Italy SIR/Naples, +1 coastal trophy.",
    },
    {
        "city": "Paris",
        "company_name": "Engel & Volkers France",
        "type": "private_office",
        "contact_name": "Christophe Michel",
        "contact_role": "CEO France / Chairman of EV MMC France SAS",
        "email": "paris@engelvoelkers.com",
        "phone": "+33 1 45 64 30 30",
        "website": "https://www.engelvoelkers.com/fr/en/company/team",
        "linkedin_company": "https://www.linkedin.com/company/engelvoelkers-global",
        "linkedin_contact": "",
        "investment_focus": "French luxury residential plus Engel & Volkers Private Office advisors in Paris for UHNW / cross-border acquisitions",
        "geographic_focus": "France HQ at 170 rue du Faubourg Saint-Honore, 75008 Paris, with Private Office advisors listed on the Paris shop and a global PO network including Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.engelvoelkers.com/fr/en/imprint",
        "source_2": "https://www.engelvoelkers.com/fr/en/shops/paris/team",
        "notes": "BUYER-ORIGIN: Official France imprint names EV MMC France SAS, 170 rue du Faubourg Saint-Honore, 75008 Paris, represented by Christophe Michel as Chairman, +33 1 45 64 30 30, paris@engelvoelkers.com. Official team page names him CEO France. Official Paris shop team lists multiple Private Office advisors (self-employed) with published French mobiles; personal emails are not published, so the imprint inbox is used. Italy is via Engel & Volkers' Italian shops and global Private Office, not a named Amalfi mandate; Amalfi relevance is moderate through the Italian PO network. Distinct from the Hamburg Private Office headquarters already in the Germany file: this row is French-origin client access. Score 8: +3 French UHNW/PO, +2 international luxury network, +2 Italy PO/shops, +1 trophy.",
    },
    {
        "city": "Cannes",
        "company_name": "John Taylor Cannes (Artcurial Group)",
        "type": "luxury_agency",
        "contact_name": "Gilles Tejedor",
        "contact_role": "Executive Director",
        "email": "cannes@john-taylor.com",
        "phone": "+33 4 97 06 65 65",
        "website": "https://www.john-taylor.com/luxury-real-estate-agency/cannes/",
        "linkedin_company": "https://www.linkedin.com/company/john-taylor-luxury-real-estate",
        "linkedin_contact": "",
        "investment_focus": "French Riviera trophy residential from the group's historic Cannes house; Artcurial/Dassault-owned international luxury brokerage",
        "geographic_focus": "6 rue Frederic Amouretti, Cannes; group navigation and agencies include Italy (Como, Milan, Tuscany)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "Riviera trophy; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.john-taylor.com/luxury-real-estate-agency/cannes/",
        "source_2": "https://www.john-taylor.com/pdf/fees_3235.pdf",
        "notes": "BUYER-ORIGIN: John Taylor was founded in Cannes in 1864; this is the French-origin flagship, not an Italian listing agency and not the Paris inbound shop. Official Cannes page publishes +33 4 97 06 65 65, 6 rue Frederic Amouretti, Gilles Tejedor as Executive Director and Ernandes as Agency Manager. Official Cannes fee schedule PDF and Cannes blog post publish cannes@john-taylor.com. Official site navigation lists Italy Como, Milan and Tuscany as buy/agency markets, and a Milan office exists. Amalfi is not named; coastal-trophy DNA plus the Italian offices support moderate Amalfi relevance. Score 8: +3 Cannes UHNW origin, +2 international luxury brokerage, +2 Italy Como/Milan/Tuscany, +1 coastal trophy.",
    },
    {
        "city": "Paris",
        "company_name": "Les Domaines de Fontenille (Fontenille Collection)",
        "type": "hospitality_investor",
        "contact_name": "Frederic Biousse",
        "contact_role": "Co-founder and director of publication",
        "email": "contact@fontenillecollection.com",
        "phone": "",
        "website": "https://fontenille-collection.com/en/",
        "linkedin_company": "https://www.linkedin.com/company/fontenille-collection",
        "linkedin_contact": "",
        "investment_focus": "Owner-operator of intimate luxury hotels and heritage houses in France, Spain (Menorca) and Italy (Tuscany); LVMH minority capital is publicly described as funding further Italy/Spain expansion",
        "geographic_focus": "Registered office Lauris (Vaucluse); Paris secondary establishment at 9 avenue de l'Opera, 75001; operating asset in Tuscany (Pieve Aldina)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "unknown per asset; share capital €94,626,400; boutique houses with small room counts are more compatible with €6M–€12M than large branded hotels",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://fontenille-collection.com/en/legal-information/",
        "source_2": "https://fontenille-collection.com/en/",
        "notes": "BUYER-ORIGIN: Official legal notice names Les Domaines de Fontenille SAS, registered office Domaine de Fontenille 84360 Lauris, secondary establishment 9 avenue de l'Opera 75001 Paris, director of publication Frederic Biousse, share capital €94,626,400, and footer contact@fontenillecollection.com (privacy@fontenillecollection.com is data-rights only and is not used). Official homepage positions the collection in France, Menorca and Tuscany. Pieve Aldina in Tuscany is an owned/operated Italian house. CoStar/Forbes coverage of the LVMH/Anais minority investment describes capital to expand in Italy and Spain; Amalfi is not a named Fontenille asset. Closest French hospitality owner-operator fit for a trophy house or villa-to-boutique conversion. Score 9: +3 French private capital, +2 international luxury hospitality RE, +2 Tuscany asset, +1 trophy/heritage, +1 hospitality. Ticket per asset unpublished so the +1 ticket point is not added.",
    },
    {
        "city": "Paris",
        "company_name": "Evok Collection",
        "type": "hospitality_investor",
        "contact_name": "Romain Yzerman",
        "contact_role": "Chief Executive Officer",
        "email": "",
        "phone": "",
        "website": "https://www.evokcollection.com/group/",
        "linkedin_company": "https://www.linkedin.com/company/evokcollection",
        "linkedin_contact": "https://www.linkedin.com/in/romain-yzerman-20120324",
        "investment_focus": "Owner-backed luxury hotel brands Brach and Nolinski plus unique houses; sourcing exceptional real-estate assets to convert into hotels",
        "geographic_focus": "Paris origin; Venice operating; Madrid operating; Saint-Tropez and Rome in development; public search list has included Amalfi, Capri, Como, Milan",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "strong",
        "estimated_ticket": "unknown per asset; Famille C injected €130M into the platform; urban palace hotels often sit above €6M–€12M, unique houses may be closer",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://www.evokcollection.com/group/",
        "source_2": "https://fr.fashionnetwork.com/news/Famille-c-participations-investit-130-millions-d-euros-dans-l-hotellerie,1609211.html",
        "notes": "BUYER-ORIGIN: Official group page states Evok is owned by Pierre Bastid, led by CEO Romain Yzerman, expanded to Venice (2023) then Madrid, with Saint-Tropez and Rome to follow, and that Famille C Participations (Courtin family) entered in 2024. FashionNetwork, quoting Yzerman as directeur general of Zaka and owner of Evok, reports the €130M is to select exceptional assets 'notably in the Alps, St-Tropez, London, Milan, Ibiza, Como, Capri, Amalfi or Marrakech'. A commercial group email was not published on the official group page reviewed (left empty). Fit is as a French principal hospitality buyer for a coastal trophy conversion, not as a residential broker. Typical Brach/Nolinski palaces may exceed this ticket; Amalfi is nonetheless a named hunt. Score 9: +3 French UHNW/FO capital, +2 international luxury hotels, +2 Italy operating/pipeline, +1 trophy, +1 hospitality. Ticket compatibility not added.",
    },
    {
        "city": "Paris",
        "company_name": "Zaka Investments",
        "type": "real_estate_investor",
        "contact_name": "Romain Yzerman",
        "contact_role": "Director Hotel Development / foncier of the Pierre Bastid family office",
        "email": "contact@zakainvest.com",
        "phone": "+33 1 84 25 06 12",
        "website": "https://zakainvestments.com/",
        "linkedin_company": "https://www.linkedin.com/company/zaka-investments",
        "linkedin_contact": "https://www.linkedin.com/in/romain-yzerman-20120324",
        "investment_focus": "Private fonciere of Pierre Bastid's family office: prime Paris offices historically, now sourcing/acquiring/structuring Evok hotels through delivery",
        "geographic_focus": "Paris HQ; hotels delivered in Paris and Venice; hotels in development including Brach Rome and Nolinski Saint-Tropez",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "strong",
        "estimated_ticket": "site cites >€1.4bn of transactions since 2012; per-hotel tickets unpublished and often larger than €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://zakainvestments.com/",
        "source_2": "https://fr.fashionnetwork.com/news/Famille-c-participations-investit-130-millions-d-euros-dans-l-hotellerie,1609211.html",
        "notes": "BUYER-ORIGIN: Official site describes Zaka as the private fonciere of Pierre Bastid's family office, piloted from origin by Romain Yzerman, majority shareholder of Evok, and responsible for sourcing, acquisition, structuring and works of Evok hotels until delivery. Contact block publishes Tel 01 84 25 06 12 and contact@zakainvest.com. Distinct function from the Evok operating brand: this is the acquisition vehicle. Five hotels delivered in Paris and Venice; three in development including Brach Rome. Amalfi relevance is inherited from Yzerman's published Evok asset-search list (Amalfi, Capri, Como). Not a duplicate of Evok: different legal entity and mandate (buy the real estate). Score 8: +3 French family-office capital, +2 international hotel RE, +2 Italy delivered/pipeline, +1 luxury/hospitality combined as +1 because typical tickets may exceed €6M–€12M so the ticket point is withheld.",
    },
    {
        "city": "Paris",
        "company_name": "Famille C Participations",
        "type": "family_office",
        "contact_name": "Prisca Courtin",
        "contact_role": "Managing Director",
        "email": "",
        "phone": "",
        "website": "https://famillec-participations.com/en/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Courtin family investment firm: beauty/skincare, beauty tech, and luxury hotels / well-being experiences; strategic shareholder of Evok Collection; also invested in Le Collectionist",
        "geographic_focus": "12 avenue de la Porte des Ternes, 75017 Paris; hospitality exposure via Evok (Venice, Rome pipeline, named Amalfi search)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "strong",
        "estimated_ticket": "evidenced hospitality cheque €130M into Evok; official site says it invests at all sizes and stages",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "8",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://famillec-participations.com/en/",
        "source_2": "https://fr.fashionnetwork.com/news/Famille-c-participations-investit-130-millions-d-euros-dans-l-hotellerie,1609211.html",
        "notes": "BUYER-ORIGIN: Official site identifies Famille C Participations as the Courtin family's investment firm, guided by Prisca Courtin, with a third vertical in luxury hotels, address 12 avenue de la Porte des Ternes, 75017 Paris. No email or phone is published (contact form only). FashionNetwork quotes Prisca Courtin on the €130M Evok investment. Capital origin is French UHNW (Clarins family). More likely to fund via Evok/Zaka than to bid a single villa as principal; still authentic French hospitality capital with a published Amalfi hunt through Evok. Score 8: +3 French family office, +2 luxury-hotel investing, +2 Italy via Evok, +1 hospitality. Direct €6M–€12M ticket not evidenced so not added.",
    },
    {
        "city": "Paris",
        "company_name": "Maisons Pariente",
        "type": "hospitality_investor",
        "contact_name": "Leslie Kouhana",
        "contact_role": "Co-founder / President",
        "email": "",
        "phone": "",
        "website": "https://www.maisonspariente.com",
        "linkedin_company": "https://www.linkedin.com/company/maisons-pariente",
        "linkedin_contact": "",
        "investment_focus": "Family-owned collection of intimate 5-star houses (Provence, Saint-Tropez, Meribel, Paris Marais, Courchevel in development); owner-operator, not a chain",
        "geographic_focus": "France-focused to date; Il Sole 24 Ore interview: evaluating Italy including Sardinia, Puglia and the Amalfi Coast",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "strong",
        "estimated_ticket": "unknown; intimate 5-star houses are a closer product match to a €6M–€12M coastal trophy than large hotels",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "9",
        "priority": "A",
        "verification_status": "verified",
        "source_1": "https://en.ilsole24ore.com/art/maison-pariente-luxury-brand-expansion-targets-italy-AF01kDWD",
        "source_2": "https://www.challenges.fr/vie-entreprise/club-entrepreneurs/maisons-pariente-developpe-une-hotellerie-de-luxe-decontracte_907513",
        "notes": "BUYER-ORIGIN: Family hospitality platform founded by Patrick Pariente with daughters Leslie Kouhana and Kimberley Cohen. Challenges interview: they own and operate their houses, invest according to location quality, and name Italy among future destinations. Il Sole 24 Ore exclusive: Leslie says the group is looking across the border 'particularly in Italy' and that 'Sardinia, Puglia and the Amalfi Coast are of interest'. No Italy asset yet and no origination email published on pages reviewed (legal page was not publicly fetchable; DPO inboxes are not used). Product fit for a trophy Amalfi house is among the strongest French names. Score 9: +3 French family capital, +2 luxury hospitality RE, +2 named Italy/Amalfi search, +1 trophy houses, +1 hospitality.",
    },
    {
        "city": "Paris",
        "company_name": "Knight Frank France — Prime Residential",
        "type": "luxury_agency",
        "contact_name": "Alison Ashby",
        "contact_role": "Partner, Head of Paris Prime Residential",
        "email": "",
        "phone": "+33 1 43 16 88 88",
        "website": "https://www.knightfrank.fr/en/services/residential/",
        "linkedin_company": "https://www.linkedin.com/company/knight-frank-france",
        "linkedin_contact": "https://www.linkedin.com/in/alison-ashby-7002bb10",
        "investment_focus": "In-house prime and super-prime Paris residential sales and acquisitions; access to Knight Frank's international residential network including Italy associates",
        "geographic_focus": "7 place Vendome, 75001 Paris; mandate is Paris prime, with the global KF network as the Italy path",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "super-prime Paris; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.knightfrank.fr/en/services/residential/",
        "source_2": "https://www.knightfrank.co.uk/newsroom/article/2026/2/knight-frank-france-establishes-new-residential-department-in-paris-and-appoints-alison-ashby-as-head",
        "notes": "BUYER-ORIGIN: Official residential page names Alison Ashby as Partner, Head of Paris Prime Residential, +33 1 43 16 88 88; email is a form button only and is left empty (do not invent first.last@fr.knightfrank.com). February 2026 Knight Frank newsroom: the new in-house Paris residential department advises on sale and acquisition of luxury real estate in Paris neighbourhoods and is described as essential for international clients. That is partly inbound-to-Paris. Inclusion is as a Place Vendome prime desk that can still introduce French UHNW clients into Knight Frank's international residential network (Italy associates exist at group level). Amalfi is not named. Score 7: +2 French prime desk (not a full +3 because published mandate is Paris-inbound), +2 international KF network, +2 Italy associates, +1 trophy.",
    },
    {
        "city": "Nice",
        "company_name": "Savills French Riviera Private Office",
        "type": "private_office",
        "contact_name": "Alex Balkin",
        "contact_role": "Executive Director, Savills French Riviera & French Alps (named in market coverage; PO page itself is team-generic)",
        "email": "riviera@savills.com",
        "phone": "+33 4 93 87 41 15",
        "website": "https://riviera.savills.fr/en/private-office/",
        "linkedin_company": "https://www.linkedin.com/company/savills-french-riviera-french-alps",
        "linkedin_contact": "",
        "investment_focus": "Savills Private Office for HNW/UHNW individuals and advisers: confidential access to Savills' global residential and related services, with a dedicated Riviera team",
        "geographic_focus": "Head office 11 avenue Jean Medecin, 06000 Nice; French Riviera and Alps; Savills Italy is a separate company",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://riviera.savills.fr/en/private-office/",
        "source_2": "https://riviera.savills.fr/en/contact/",
        "notes": "BUYER-ORIGIN: Official Private Office page describes a 2007 UHNW/adviser service across Savills' global offices, with dedicated locally based Riviera representatives. Official contact page publishes 11 avenue Jean Medecin, Nice, +33 4 93 87 41 15 and riviera@savills.com. Much published Riviera activity is foreigners buying France; French UHNW on the Cote d'Azur remain a realistic origin via this PO, and Savills has an Italian business. Amalfi is not named. Score 7: +2 French Riviera UHNW (moderate origin because of inbound mix), +2 international Savills PO, +2 Italy via group, +1 trophy coastal.",
    },
    {
        "city": "Cannes",
        "company_name": "Michael Zingraf Real Estate (Christie's International Real Estate PACA)",
        "type": "luxury_agency",
        "contact_name": "Michael Zingraf",
        "contact_role": "Founder and Chairman",
        "email": "contact@michaelzingraf.com",
        "phone": "+33 4 93 39 77 77",
        "website": "https://www.michaelzingraf.com/en/agencies",
        "linkedin_company": "https://www.linkedin.com/company/michael-zingraf-immobilier",
        "linkedin_contact": "",
        "investment_focus": "French Riviera luxury sales, rentals and valuations for French and international clients; exclusive Christie's International Real Estate affiliate for PACA",
        "geographic_focus": "Head office 53-54 boulevard de la Croisette, Cannes, plus Cap Ferrat, Mougins, Mandelieu and other Riviera offices; Italy via CIRE affiliates",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.michaelzingraf.com/en/agencies",
        "source_2": "https://www.michaelzingraf.com/en/contact-us",
        "notes": "BUYER-ORIGIN: Official agencies page states the group has for nearly 50 years accompanied a French and international clientele on exceptional property, backed by exclusive CIRE affiliation for PACA. Head office email contact@michaelzingraf.com and Cannes Croisette +33 4 93 39 77 77 / cannes@michaelzingraf.com are published. Public mandate is stronger on selling Riviera homes to foreigners than on originating French buyers into Amalfi; CIRE is the Italy path. Score 7: +2 French+international Riviera UHNW, +2 CIRE international luxury, +2 Italy affiliates, +1 trophy coastal.",
    },
    {
        "city": "Paris",
        "company_name": "Emile Garcin International",
        "type": "luxury_agency",
        "contact_name": "Nathalie Garcin",
        "contact_role": "President / co-president of Emile Garcin Proprietes",
        "email": "",
        "phone": "+33 1 58 12 02 02",
        "website": "https://emilegarcin.com/fr/agence-immobilier-luxe/emile-garcin-international",
        "linkedin_company": "https://www.linkedin.com/company/emile-garcin-proprietes-aix-en-provence",
        "linkedin_contact": "",
        "investment_focus": "French family house specialising in prestige properties (Paris, Provence, Alps, chateaux) with a dedicated International office",
        "geographic_focus": "24 rue du Boccador, 75008 Paris; abroad offices publicly named include Morocco, Geneva and Brussels — not Italy",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://emilegarcin.com/fr/agence-immobilier-luxe/emile-garcin-international",
        "source_2": "https://www.emilegarcin.com/fr/actualites",
        "notes": "BUYER-ORIGIN: Official International agency page publishes 24 rue du Boccador, 75008 Paris and +33 1 58 12 02 02. No sales email is published (rgpd@emilegarcin.com is GDPR only and is not used). Nathalie Garcin is publicly interviewed as co-president / dirigeante of the family group. Strong French UHNW family agency with a dedicated international office, but the named foreign offices are Morocco, Geneva and Brussels, not Italy, so Italy/Amalfi remain unclear. Score 7: +3 French UHNW family house, +2 dedicated international office, +1 trophy, +1 Europe (Geneva/Brussels) without a full +2 Italy point.",
    },
    {
        "city": "Paris",
        "company_name": "Vaneau Collection Privee",
        "type": "luxury_agency",
        "contact_name": "Alexandra Leca",
        "contact_role": "Directrice generale / CEO (group; Collection Privee is the ultra-luxury desk)",
        "email": "collection-privee@vaneau.fr",
        "phone": "+33 1 53 10 15 15",
        "website": "https://www.vaneau.fr/en/real-estate-agencies/vaneau-collection-privee",
        "linkedin_company": "https://www.linkedin.com/company/vaneau",
        "linkedin_contact": "",
        "investment_focus": "Haute-couture / exceptional Paris and international luxury residential; official desk copy addresses French and international clients in the multi-million band",
        "geographic_focus": "19 avenue Raymond Poincare, 75116 Paris; other Vaneau geographies include Cannes, Brussels and Marrakech — Italy is not a published destination",
        "buyer_origin_relevance": "strong",
        "italy_interest": "unclear",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "desk described in group materials in the €4M to over €50M band; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.vaneau.fr/en/real-estate-agencies/vaneau-collection-privee",
        "source_2": "https://www.vaneau.fr/en",
        "notes": "BUYER-ORIGIN: Official Collection Privee page publishes 19 avenue Raymond Poincare, 75116 Paris, +33 1 53 10 15 15 and collection-privee@vaneau.fr. Ticket-compatible French UHNW desk. Italy is not a published destination, so this is a gated Paris ultra-luxury introduction path rather than a demonstrated Italy buyer origin. Score 6: +3 French UHNW, +2 international luxury (Brussels/Marrakech/Cannes), +1 trophy/ticket. Italy/Amalfi points not added.",
    },
    {
        "city": "Paris",
        "company_name": "Paris Ouest Sotheby's International Realty",
        "type": "luxury_agency",
        "contact_name": "",
        "contact_role": "Paris 16th / Neuilly luxury SIR affiliate (named MD not published on homepage)",
        "email": "parisouest@parisouest-sothebysrealty.com",
        "phone": "+33 1 40 60 50 00",
        "website": "https://www.parisouest-sothebysrealty.com/en/",
        "linkedin_company": "https://www.linkedin.com/company/paris-ouest-sothebys-interntional-realty",
        "linkedin_contact": "",
        "investment_focus": "Prime apartments and hotels particuliers in Paris 16th/17th, the Marais and Neuilly, marketed through the Sotheby's International Realty network",
        "geographic_focus": "95 avenue Victor Hugo, 75116 Paris; Italy via sister Italy Sotheby's International Realty (Naples among Italian offices)",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "moderate",
        "estimated_ticket": "network commentary cites foreign buyer budgets from €3M to more than €20M on Paris prime",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "partially_verified",
        "source_1": "https://www.parisouest-sothebysrealty.com/en/",
        "source_2": "https://www.parisouest-sothebysrealty.com/en/offices/",
        "notes": "BUYER-ORIGIN: Official offices page publishes 95 avenue Victor Hugo, 75116 Paris, +33 1 40 60 50 00. Company LinkedIn posts publish parisouest@parisouest-sothebysrealty.com (site itself is form-led). Public market notes emphasise inbound foreign buyers (US, Middle East, Europe) into Paris as well as a wealthy French clientele. Italy is SIR-sister access including Naples, not a documented French-clients-abroad desk. Included as a Paris UHNW SIR affiliate with a plausible French book, scored below the Cote d'Azur Private Desk. Score 6: +2 mixed French/international Paris UHNW, +2 SIR international, +2 Italy SIR/Naples.",
    },
    {
        "city": "Paris",
        "company_name": "Experimental Group",
        "type": "hospitality_investor",
        "contact_name": "",
        "contact_role": "French lifestyle hospitality group (Venice operating; Rome opening)",
        "email": "",
        "phone": "",
        "website": "https://www.experimentalgroup.com/explore",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Lifestyle boutique hotels, beach clubs and F&B; Italian assets include Il Palazzo Experimental Venice and Experimental Roma (opening)",
        "geographic_focus": "Paris-origin group with hotels in France, UK, US, Venice, Menorca, Ibiza, Verbier; Rome and others in pipeline",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "unknown; Brookfield platform capital is reported at group level and is non-French co-capital",
        "luxury_real_estate": "unclear",
        "hospitality_interest": "yes",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.experimentalgroup.com/fr/mentions-legales",
        "source_2": "https://www.experimentalgroup.com/explore",
        "notes": "BUYER-ORIGIN: Official mentions legales list Venice among current destinations and Rome as forthcoming. Official explore/destination navigation confirms Il Palazzo Experimental (Venice) and Experimental Roma. The only published email on the legal notice is gdpr@expegroup.com (not used). Operating buyer is still a French group even where Brookfield is reported as platform co-capital. Product is lifestyle boutique rather than ultra-trophy residential; plausible for a hospitality conversion, weaker for a pure trophy villa. Amalfi is not named. Score 7: +3 French hospitality operator, +2 international leisure hotels, +2 Italy (Venice/Rome).",
    },
    {
        "city": "Paris",
        "company_name": "Eternam (Groupe Cyrus) — Alcyon Hospitality Europe",
        "type": "real_estate_fund",
        "contact_name": "Jonathan Donio",
        "contact_role": "President / publication director",
        "email": "contact@eternam.fr",
        "phone": "+33 1 53 93 23 23",
        "website": "https://www.eternam.fr/mentions-legales/",
        "linkedin_company": "https://www.linkedin.com/company/eternam-groupecyrus",
        "linkedin_contact": "",
        "investment_focus": "FPCI hospitality funds acquiring and repositioning mid and high-end European hotels (walls + business) in metros and tourist destinations",
        "geographic_focus": "50 boulevard Haussmann, 75009 Paris; first Alcyon Hospitality Europe deal is Hilton Garden Inn Rome Claridge (JV with Extendam, Sofiparc, Sohoma)",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "weak",
        "estimated_ticket": "Alcyon Hospitality Europe fund target cited around €60–80M; per-asset price of the Rome hotel unpublished",
        "luxury_real_estate": "no",
        "hospitality_interest": "yes",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.eternam.fr/mentions-legales/",
        "source_2": "https://www.eternam.fr/eternam-extendam-sohoma-international-et-sofiparc-sassocient-en-joint-venture-pour-lacquisition-de-lhotel-hilton-garden-inn-rom-claridge/",
        "notes": "BUYER-ORIGIN: Official legal notice: Eternam SAS, 50 boulevard Haussmann 75009 Paris, +33 1 53 93 23 23, contact@eternam.fr, publication director Jonathan Donio, AMF-regulated. Official 9 July 2026 release: JV acquisition of Hilton Garden Inn Rome Claridge (93 keys, 4-star, Parioli) with Extendam, Sohoma International and Sofiparc, with a 2027 renovation programme. Donio is quoted that European hospitality (Rome, Paris, Athens) is a core conviction and that this is the first step of a European deployment. Product is value-add 4-star hotel, not a luxury Amalfi villa. Include only if the Amalfi asset is recast as a yielding hotel conversion. Score 7: +3 French PE/hospitality capital, +2 European hotel investing, +2 documented Italy acquisition.",
    },
    {
        "city": "Paris",
        "company_name": "Extendam",
        "type": "private_equity_real_estate",
        "contact_name": "Matthieu Dracs",
        "contact_role": "Directeur General / legal representative",
        "email": "",
        "phone": "+33 1 53 96 52 50",
        "website": "https://extendam.com/en/extendam/who-we-are/",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "European hotel private equity focused primarily on economy and midscale hotels, with some lifestyle/boutique club deals (including Experimental Hotels Collection)",
        "geographic_focus": "79 rue La Boetie, 75008 Paris; active in France, Spain, Portugal, Germany, Italy, Belgium and the Netherlands; Rome Hilton Garden Inn JV",
        "buyer_origin_relevance": "strong",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "weak",
        "estimated_ticket": "per-asset prices unpublished; core book is branded midscale, not trophy villas",
        "luxury_real_estate": "no",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://extendam.com/en/legal-notice/",
        "source_2": "https://www.eternam.fr/eternam-extendam-sohoma-international-et-sofiparc-sassocient-en-joint-venture-pour-lacquisition-de-lhotel-hilton-garden-inn-rom-claridge/",
        "notes": "BUYER-ORIGIN: Official legal notice: 79 rue La Boetie, 75008 Paris, +33 1 53 96 52 50, legal representative Matthieu Dracs. No sales/investment email is published (contact form only). Official who-we-are: widest PE coverage dedicated to economy and midscale hotels in Continental Europe, including Italy. Documented Italy: JV on Hilton Garden Inn Rome Claridge. Also markets co-investment with Experimental. Strong French hospitality capital with Italy, but core product is incompatible with a luxury Amalfi trophy residence. Score 6: +3 French hotel PE, +2 European hotels, +2 Italy, luxury/trophy points not added, ticket point not added.",
    },
    {
        "city": "Paris",
        "company_name": "Le Collectionist",
        "type": "other_relevant",
        "contact_name": "",
        "contact_role": "Luxury villa rental platform with Amalfi inventory and French UHNW guest book",
        "email": "",
        "phone": "+33 1 73 03 02 02",
        "website": "https://www.lecollectionist.com/en/luxury-villas-rentals/amalfi",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Curated luxury villa and chalet rentals for HNW/UHNW travellers; Amalfi Coast is a live destination with multiple villas; Famille C is a disclosed investor",
        "geographic_focus": "Paris-based; Italy destinations include Amalfi Coast, Tuscany, Puglia, Sicily, Sardinia and Lake Como",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "strong",
        "estimated_ticket": "unknown for acquisitions; rental inventory is trophy coastal",
        "luxury_real_estate": "yes",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.lecollectionist.com/en/luxury-villas-rentals/amalfi",
        "source_2": "https://www.lecollectionist.com/en/contact",
        "notes": "BUYER-ORIGIN: French luxury-villa platform with a dedicated Amalfi rental collection and a Paris contact line +33 1 73 03 02 02 (official contact page). No origination email is published (form only). Not a brokerage and not a principal buyer; included because the guest/owner book is French-origin UHNW already using Amalfi trophy houses, which is a realistic introduction path. Famille C's hospitality/well-being investing (separate row) is publicly associated with the company. Score 6: +2 French UHNW user book, +2 international luxury homes, +2 Amalfi inventory. Not scored as a confirmed buyer of a €6M–€12M sale.",
    },
    {
        "city": "Paris",
        "company_name": "Sofiparc (Burelle SA)",
        "type": "family_office",
        "contact_name": "Valerie Bros",
        "contact_role": "Administratrice and Directrice Generale of Sofiparc (named on the Rome hotel release); Secretaire Generale of Burelle SA",
        "email": "investor.relations@burelle.fr",
        "phone": "+33 1 40 87 64 49",
        "website": "https://www.burelle.fr",
        "linkedin_company": "",
        "linkedin_contact": "",
        "investment_focus": "Real-estate subsidiary of the listed Burelle family holding; Sofiparc Hotels is expanding internationally via hotel co-investments",
        "geographic_focus": "Burelle management in the Paris area; Rome Hilton Garden Inn Claridge JV (2026) with Eternam/Extendam/Sohoma",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "weak",
        "estimated_ticket": "unknown; prior international step reported as a minority stake in a Bruges 4-star; Rome deal is a JV not a sole bid",
        "luxury_real_estate": "no",
        "hospitality_interest": "yes",
        "fit_score": "6",
        "priority": "B",
        "verification_status": "partially_verified",
        "source_1": "https://burelle.fr/espace-actionnaires/contacts/",
        "source_2": "https://www.eternam.fr/eternam-extendam-sohoma-international-et-sofiparc-sassocient-en-joint-venture-pour-lacquisition-de-lhotel-hilton-garden-inn-rom-claridge/",
        "notes": "BUYER-ORIGIN: Burelle is the listed holding of the Burelle/Peugeot industrial family. Official contacts page publishes investor.relations@burelle.fr and +33 1 40 87 64 49 (IR, not a hotel origination desk — used because no Sofiparc sales email is published). Eternam's Rome release names Sofiparc as a JV buyer of Hilton Garden Inn Rome Claridge and quotes Valerie Bros on accelerating Sofiparc Hotels' international development. Italy evidence is real; product is mid/upscale branded hotel co-invest, not a trophy Amalfi villa. Score 6: +3 French family holding capital, +1 Italy JV (not a full +2 platform), +2 hospitality Europe. Luxury/trophy points not added.",
    },
    {
        "city": "Paris",
        "company_name": "John Taylor Paris (Artcurial Group)",
        "type": "luxury_agency",
        "contact_name": "Geoffrey Benoit",
        "contact_role": "Executive Director, Paris",
        "email": "paris@john-taylor.com",
        "phone": "+33 1 80 18 79 40",
        "website": "https://www.john-taylor.com/luxury-real-estate-agency/paris/",
        "linkedin_company": "https://www.linkedin.com/company/john-taylor-luxury-real-estate",
        "linkedin_contact": "",
        "investment_focus": "Paris Golden Triangle / Rive Gauche / Paris Ouest luxury apartments and hotels particuliers; group also covers Italy (Milan, Como, Tuscany)",
        "geographic_focus": "32 avenue Pierre 1er de Serbie, 75008 Paris (Triangle d'or), plus Saint-Germain and La Muette flagships",
        "buyer_origin_relevance": "moderate",
        "italy_interest": "yes",
        "amalfi_coast_relevance": "unclear",
        "estimated_ticket": "Paris page discusses super-prime including a published €35M apartment sale; compatible with €6M–€12M",
        "luxury_real_estate": "yes",
        "hospitality_interest": "unclear",
        "fit_score": "7",
        "priority": "B",
        "verification_status": "verified",
        "source_1": "https://www.john-taylor.com/luxury-real-estate-agency/paris/",
        "source_2": "https://www.john-taylor.com/luxury-real-estate-agency/milan/",
        "notes": "BUYER-ORIGIN: Official Paris page names three agencies including Triangle d'or at 32 avenue Pierre 1er de Serbie, +33 1 80 18 79 40, and lists Geoffrey Benoit and David Samama as Executive Directors. It states that in Paris more than 70% of buyers are from abroad — that is inbound, so origin is only moderate. Company LinkedIn posts publish paris@john-taylor.com. Kept as a separate row from Cannes because the buyer book is Paris UHNW, not Riviera, and the group still has Milan/Como/Tuscany offices that a Paris team can access. Amalfi is not named. Score 7: +2 mixed French/international Paris UHNW, +2 international luxury group, +2 Italy offices, +1 trophy.",
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
    keys: dict[tuple[str, str, str], str] = {}
    emails: dict[str, str] = {}
    for row in rows:
        name = row.get("company_name", "?")
        for h in HEADERS:
            if h not in row:
                errors.append(f"{name}: missing {h}")
        if row["country"] != COUNTRY:
            errors.append(f"{name}: bad country")
        if row["type"] not in ALLOWED_TYPE:
            errors.append(f"{name}: bad type {row['type']}")
        if row["buyer_origin_relevance"] not in ALLOWED_BUYER_ORIGIN:
            errors.append(f"{name}: bad buyer_origin")
        if row["italy_interest"] not in ALLOWED_ITALY:
            errors.append(f"{name}: bad italy_interest")
        if row["amalfi_coast_relevance"] not in ALLOWED_AMALFI:
            errors.append(f"{name}: bad amalfi")
        if row["luxury_real_estate"] not in ALLOWED_LUXURY:
            errors.append(f"{name}: bad luxury")
        if row["hospitality_interest"] not in ALLOWED_HOSP:
            errors.append(f"{name}: bad hospitality")
        if row["verification_status"] not in ALLOWED_VERIF:
            errors.append(f"{name}: bad verification")
        if row["priority"] not in ALLOWED_PRIORITY:
            errors.append(f"{name}: bad priority")
        if row["priority"] != priority_from_score(row["fit_score"]):
            errors.append(f"{name}: priority {row['priority']} != score {row['fit_score']}")
        if not (1 <= int(row["fit_score"]) <= 10):
            errors.append(f"{name}: fit_score out of range")
        if row["priority"] == "A" and row["buyer_origin_relevance"] not in {"strong", "moderate"}:
            errors.append(f"{name}: Priority A needs strong/moderate buyer origin")
        if row["priority"] == "A" and not row.get("source_2", "").strip():
            errors.append(f"{name}: Priority A missing source_2")
        if not row.get("source_1", "").strip():
            errors.append(f"{name}: missing source_1")
        email = (row.get("email") or "").strip()
        if email and not EMAIL_RE.match(email):
            errors.append(f"{name}: invalid email {email}")
            emails[email.lower()] = name
        elif email:
            prev = emails.get(email.lower())
            if prev:
                errors.append(f"duplicate email {email}: {prev} / {name}")
            emails[email.lower()] = name
        for field in ("website", "source_1", "source_2", "linkedin_company", "linkedin_contact"):
            val = (row.get(field) or "").strip()
            if val and not URL_RE.match(val):
                errors.append(f"{name}: {field} is not an https URL")
        if row.get("last_verified") != LAST_VERIFIED:
            errors.append(f"{name}: last_verified")
        key = (
            row.get("company_name", "").strip().lower(),
            row.get("city", "").strip().lower(),
            row.get("contact_name", "").strip().lower(),
        )
        if key in keys:
            errors.append(f"duplicate key {key}")
        keys[key] = name
    if errors:
        raise SystemExit("QA failed:\n" + "\n".join(f" - {e}" for e in errors))


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
