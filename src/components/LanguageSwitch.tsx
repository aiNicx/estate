"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/content/messages";
import type { Locale } from "@/content/property";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const en = pathname.replace(/^\/(en|it)(?=\/|$)/, "/en") || "/en";
  const it = pathname.replace(/^\/(en|it)(?=\/|$)/, "/it") || "/it";

  return (
    <p role="group" aria-label={t(locale).nav.language} className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase">
      {locale === "en" ? (
        <span aria-current="true">EN</span>
      ) : (
        <Link href={en} hrefLang="en" lang="en" aria-label="English">
          EN
        </Link>
      )}
      <span aria-hidden="true">/</span>
      {locale === "it" ? (
        <span aria-current="true">IT</span>
      ) : (
        <Link href={it} hrefLang="it" lang="it" aria-label="Italiano">
          IT
        </Link>
      )}
    </p>
  );
}
