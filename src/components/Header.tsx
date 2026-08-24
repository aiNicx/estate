"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/content/property";
import { t } from "@/content/messages";
import { routes, localizedPath } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = routes.map((route) => {
    const href = localizedPath(locale, route.href);
    const current =
      route.href === ""
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);
    return { ...route, href, current, label: copy.nav[route.id] };
  });
  const primary = items.filter((item) => item.id !== "request");
  const request = items.find((item) => item.id === "request");

  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <Link href={localizedPath(locale, "")} className="min-w-0 no-underline">
          <span className="block text-[0.68rem] tracking-[0.22em] uppercase text-[var(--terracotta)]">
            {copy.brand.kicker}
          </span>
          <span className="display block truncate text-xl leading-none">
            {copy.brand.wordmark}
          </span>
        </Link>
        <div className="hidden items-center gap-6 xl:flex">
          <nav aria-label="Primary" className="flex items-center gap-5">
            {primary.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="nav-link"
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitch locale={locale} />
          {request ? (
            <Link className="btn" href={request.href}>
              {request.label}
            </Link>
          ) : null}
        </div>
        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitch locale={locale} />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--sea)] px-3 text-sm text-[var(--sea)]"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? copy.nav.close : copy.nav.menu}
          </button>
        </div>
      </div>
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-[var(--line)] xl:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="nav-link min-h-11 py-3"
              aria-current={item.current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
