"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t } from "@/content/messages";
import type { Locale } from "@/content/property";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const en = pathname.replace(/^\/(en|it)(?=\/|$)/, "/en") || "/en";
  const it = pathname.replace(/^\/(en|it)(?=\/|$)/, "/it") || "/it";

  function preserveSection(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.location.hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    router.push(`${event.currentTarget.pathname}${window.location.hash}`);
  }

  return (
    <p role="group" aria-label={t(locale).nav.language} className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase">
      {locale === "en" ? (
        <span aria-current="true">EN</span>
      ) : (
        <Link onClick={preserveSection} href={en} hrefLang="en" lang="en" aria-label="English">
          EN
        </Link>
      )}
      <span aria-hidden="true">/</span>
      {locale === "it" ? (
        <span aria-current="true">IT</span>
      ) : (
        <Link onClick={preserveSection} href={it} hrefLang="it" lang="it" aria-label="Italiano">
          IT
        </Link>
      )}
    </p>
  );
}
