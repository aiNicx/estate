import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/content/property";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { getSiteUrl } from "@/lib/site";
import { fontClassName } from "@/app/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: { icon: "/icon" },
};

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
  const copy = t(locale);

  return (
    <html lang={locale} className={`${fontClassName} h-full`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col antialiased">
        <a className="skip-link" href="#content">
          {copy.skip}
        </a>
        <Header locale={locale} />
        <div id="content" className="flex-1">
          {children}
        </div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
