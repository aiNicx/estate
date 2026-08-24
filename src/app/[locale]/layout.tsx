import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales } from "@/content/property";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
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
  const copy = t(locale);

  return (
    <div lang={locale} className="flex min-h-full flex-col">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <Header locale={locale} />
      <div id="content" className="flex-1">
        {children}
      </div>
      <Footer locale={locale} />
    </div>
  );
}
