import { locales, type Locale } from "@/content/property";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function parseLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) return value;
  return "en";
}
