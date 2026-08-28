export const prospectTypes = [
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
] as const;

export type ProspectType = (typeof prospectTypes)[number];

export const prospectColumns = [
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
] as const;

export type ProspectColumn = (typeof prospectColumns)[number];

export const prospectPriorities = ["A", "B", "C"] as const;
export type ProspectPriority = (typeof prospectPriorities)[number];

export type ProspectRecord = {
  country: string;
  city: string;
  companyName: string;
  type: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  website: string;
  linkedinCompany: string;
  linkedinContact: string;
  investmentFocus: string;
  geographicFocus: string;
  buyerOriginRelevance: string;
  italyInterest: string;
  amalfiCoastRelevance: string;
  estimatedTicket: string;
  luxuryRealEstate: string;
  hospitalityInterest: string;
  fitScore: number | null;
  priority: ProspectPriority | "";
  verificationStatus: string;
  source1: string;
  source2: string;
  notes: string;
  lastVerified: string;
};

export type Prospect = ProspectRecord & { id: string };

export type ProspectFilters = {
  country: string;
  city: string;
  type: string;
};
