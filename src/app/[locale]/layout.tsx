import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales } from "@/content/property";
import { isLocale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      <div id="content" className="flex-1">
        {children}
      </div>
      <Footer locale={locale} />
    </>
  );
}
