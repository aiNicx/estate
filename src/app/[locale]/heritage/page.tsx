import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { brochurePath, legacyBrochureSections } from "@/content/brochure";

export default async function LegacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  permanentRedirect(brochurePath(locale, legacyBrochureSections["heritage"]));
}
