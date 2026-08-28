import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontClassName } from "@/app/fonts";
import { getSiteUrl } from "@/lib/site";
import "../../globals.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Prospects",
  description: "Archivio riservato",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
  icons: { icon: "/icon" },
};

export default function ProspectsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${fontClassName} h-full`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
