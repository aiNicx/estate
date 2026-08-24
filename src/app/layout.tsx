import { headers } from "next/headers";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { parseLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: "/icon",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = parseLocale((await headers()).get("x-locale") ?? "en");
  const copy = t(locale);
  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col antialiased">
        <a className="skip-link" href="#content">
          {copy.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
