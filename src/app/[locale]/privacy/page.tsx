import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { brochureCopy } from "@/content/brochure";
import { localeMetadata } from "@/lib/seo";
import { privacyController } from "@/lib/site";
import { PageShell } from "@/components/PageShell";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/privacy", {
    title: `${copy.privacy.title} · ${brochureCopy(locale).meta.siteName}`,
    description: copy.privacy.intro,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).privacy;
  const controller = privacyController();

  return (
    <PageShell locale={locale} pathname="/privacy" kicker={copy.updated} title={copy.title} intro={copy.intro}>
      <div className="shell"><div className="privacy-body">
        {copy.sections.map((section, index) => (
          <section key={section.title} aria-labelledby={`privacy-${index}`}>
            <h2 id={`privacy-${index}`}>{section.title}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {index === 0 && controller.length ? (
              <address>
                <span className="privacy-label">{copy.controllerLabel}</span>
                {controller.map((line) => <span key={line}>{line}</span>)}
              </address>
            ) : null}
          </section>
        ))}
      </div></div>
    </PageShell>
  );
}
