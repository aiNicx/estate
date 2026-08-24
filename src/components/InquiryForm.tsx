"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Locale } from "@/content/property";
import { buyerTypes } from "@/content/property";
import { t } from "@/content/messages";
import { validateInquiry, type InquiryInput } from "@/lib/inquiry";

const empty: InquiryInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  buyerType: "",
  country: "",
  message: "",
  locale: "en",
  privacyConsent: false,
};

export function InquiryForm({ locale }: { locale: Locale }) {
  const copy = t(locale).request;
  const [values, setValues] = useState<InquiryInput>({ ...empty, locale });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryInput, true>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  function update<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...values, locale };
    const result = validateInquiry(next);
    setErrors(result.errors);
    if (!result.payload) {
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.payload),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[var(--line)] bg-[var(--white)] p-6" role="status">
        <h2 className="display mt-0 text-3xl">{copy.successTitle}</h2>
        <p className="lede">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {errorCount > 0 ? (
        <div className="mb-4 border border-[var(--terracotta)] p-4" role="alert">
          {copy.errors.name && errors.name ? <p>{copy.errors.name}</p> : null}
          {errors.email ? <p>{copy.errors.email}</p> : null}
          {errors.buyerType ? <p>{copy.errors.buyerType}</p> : null}
          {errors.country ? <p>{copy.errors.country}</p> : null}
          {errors.privacyConsent ? <p>{copy.errors.privacy}</p> : null}
        </div>
      ) : null}

      <label className="form-field">
        <span>
          {copy.fields.name} <abbr title={copy.required}>*</abbr>
        </span>
        <input
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={errors.name ? true : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>{copy.fields.company}</span>
        <input
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>
          {copy.fields.email} <abbr title={copy.required}>*</abbr>
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={errors.email ? true : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>
          {copy.fields.phone}{" "}
          <span className="text-[var(--ink-soft)]">({copy.fields.phoneOptional})</span>
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>
          {copy.fields.buyerType} <abbr title={copy.required}>*</abbr>
        </span>
        <select
          name="buyerType"
          value={values.buyerType}
          aria-invalid={errors.buyerType ? true : undefined}
          onChange={(event) => update("buyerType", event.target.value)}
        >
          <option value=""></option>
          {buyerTypes.map((type) => (
            <option key={type} value={type}>
              {copy.buyerTypes[type]}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span>
          {copy.fields.country} <abbr title={copy.required}>*</abbr>
        </span>
        <input
          name="country"
          autoComplete="country-name"
          value={values.country}
          aria-invalid={errors.country ? true : undefined}
          onChange={(event) => update("country", event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>{copy.fields.message}</span>
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </label>

      <label className="mb-6 flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="privacyConsent"
          checked={values.privacyConsent}
          aria-invalid={errors.privacyConsent ? true : undefined}
          onChange={(event) => update("privacyConsent", event.target.checked)}
          className="mt-1 h-5 w-5"
        />
        <span>{copy.fields.privacy}</span>
      </label>

      {status === "error" ? (
        <p role="alert" className="error mb-4">
          {copy.errorGeneric}
        </p>
      ) : null}

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
