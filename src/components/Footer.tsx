import Link from "next/link";
import type { Locale } from "@/content/property";
import { brochureCopy } from "@/content/brochure";
import { t } from "@/content/messages";

export function Footer({ locale }: { locale: Locale }) {
  return <footer className="brochure-footer"><div className="shell"><p>{brochureCopy(locale).footer}</p><Link href={`/${locale}/privacy`}>{t(locale).nav.privacy}</Link></div></footer>;
}
