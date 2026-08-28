import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/privacy", {
    title: `${copy.nav.privacy} · ${copy.meta.siteName}`,
    description: copy.privacy.body[0],
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).privacy;

  return (
    <PageShell locale={locale} pathname="/privacy" kicker={copy.updated} title={copy.title}>
      <div className="shell max-w-[42rem] space-y-4">
        {copy.body.map((paragraph) => (
          <p key={paragraph} className="text-[var(--ink-soft)]">
            {paragraph}
          </p>
        ))}
      </div>
    </PageShell>
  );
}
