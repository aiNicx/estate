import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";
import { InquiryForm } from "@/components/InquiryForm";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/request", {
    title: `${copy.nav.request} · ${copy.meta.siteName}`,
    description: copy.request.intro,
  });
}

export default async function RequestPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).request;

  return (
    <PageShell locale={locale} pathname="/request" kicker={copy.kicker} title={copy.title} intro={copy.intro}>
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <InquiryForm locale={locale} />
        <aside>
          <p className="text-sm text-[var(--ink-soft)]">{copy.confidentialNote}</p>
          <h2 className="display mt-8 text-2xl">{copy.topicsTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {copy.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <h2 className="display mt-10 text-2xl">{copy.nextTitle}</h2>
          <ol className="mt-4 space-y-4 pl-5 text-sm text-[var(--ink-soft)]">
            {copy.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </aside>
      </div>
    </PageShell>
  );
}
