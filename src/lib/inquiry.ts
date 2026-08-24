import { buyerTypes, type BuyerType, type Locale } from "../content/property.ts";

export type InquiryInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  buyerType: string;
  country: string;
  message?: string;
  locale: string;
  privacyConsent: boolean;
};

export type InquiryPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  buyerType: BuyerType;
  country: string;
  message?: string;
  locale: Locale;
  privacyConsent: true;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryInput): {
  errors: Partial<Record<keyof InquiryInput, true>>;
  payload?: InquiryPayload;
} {
  const errors: Partial<Record<keyof InquiryInput, true>> = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const country = input.country?.trim() ?? "";
  const company = input.company?.trim() || undefined;
  const phone = input.phone?.trim() || undefined;
  const message = input.message?.trim() || undefined;

  if (name.length < 2) errors.name = true;
  if (!EMAIL.test(email)) errors.email = true;
  if (!buyerTypes.includes(input.buyerType as BuyerType)) errors.buyerType = true;
  if (country.length < 2) errors.country = true;
  if (!input.privacyConsent) errors.privacyConsent = true;
  if (input.locale !== "en" && input.locale !== "it") errors.locale = true;

  if (Object.keys(errors).length) return { errors };

  return {
    errors: {},
    payload: {
      name,
      company,
      email,
      phone,
      buyerType: input.buyerType as BuyerType,
      country,
      message,
      locale: input.locale as Locale,
      privacyConsent: true,
    },
  };
}

/**
 * Abstracted delivery. Connect a real inbox by setting INQUIRY_ENDPOINT
 * to a POST URL (Formspree, a CRM webhook, or a private API).
 */
export async function deliverInquiry(payload: InquiryPayload): Promise<{
  delivered: boolean;
  mode: "endpoint" | "logged";
}> {
  const endpoint = process.env.INQUIRY_ENDPOINT;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Inquiry endpoint returned ${response.status}`);
    }
    return { delivered: true, mode: "endpoint" };
  }

  console.info("[inquiry]", JSON.stringify({ ...payload, privacyConsent: true }));
  return { delivered: false, mode: "logged" };
}
