"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/content/property";
import { brochureSections, brochurePath } from "@/content/brochure";
import { t } from "@/content/messages";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header brochure-header">
      <div className="shell brochure-header-inner">
        <Link href={`/${locale}`} className="brochure-brand" onClick={() => setOpen(false)}>
          <span>Vietri sul Mare</span><span className="display">Marina d’Albori</span>
        </Link>
        <nav aria-label={copy.nav.navigation} className="brochure-desktop-nav">
          {brochureSections.map((section) => <Link className="nav-link" key={section.id} href={brochurePath(locale, section.id)}>{section.label[locale]}</Link>)}
        </nav>
        <div className="brochure-header-actions">
          <LanguageSwitch locale={locale} />
          <button type="button" className="brochure-menu-button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>{open ? copy.nav.close : copy.nav.menu}</button>
        </div>
      </div>
      <div id={menuId} hidden={!open} className="mobile-menu brochure-mobile-menu">
        <nav aria-label={copy.nav.mobileNavigation} className="shell">
          {brochureSections.map((section) => <Link className="nav-link" key={section.id} href={brochurePath(locale, section.id)} onClick={() => setOpen(false)}>{section.label[locale]}</Link>)}
        </nav>
      </div>
    </header>
  );
}
