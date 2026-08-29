import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { t } from "@/content/messages";
import { localeMetadata } from "@/lib/seo";
import { availableImage } from "@/content/images";
import { Photo } from "@/components/Photo";
import { PageShell } from "@/components/PageShell";
import { LemonGrove } from "@/components/LemonGrove";
import { property } from "@/content/property";
import { localizedPath } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return localeMetadata(locale, "/heritage", {
    title: `${copy.nav.heritage} · ${copy.meta.siteName}`,
    description: copy.heritage.pageIntro,
  });
}

export default async function HeritagePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale).heritage;
  const mill = copy.items[0];
  const landscape = copy.items[1];
  const vietri = copy.items[2];
  const sea = copy.items[3];
  const pergola = availableImage("garden-night-pergola");
  const mosaic = availableImage("corridor-mosaic");
  const bath = availableImage("bathroom-majolica");
  const path = availableImage("path-stairs-sea");
  const rocks = availableImage("sea-rocks-buoys");

  return (
    <PageShell locale={locale} pathname="/heritage" header={null}>
      <header className="heritage-hero shell">
        <p className="kicker">{copy.pageKicker}</p>
        <h1 className="display mt-0 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.75rem)]">
          {copy.pageTitle}
        </h1>
        <p className="lede mt-8 mb-0">{copy.pageIntro}</p>
      </header>

      {mill ? (
        <section className="heritage-chapter shell" aria-labelledby="heritage-mill">
          <p className="heritage-year m-0">{mill.year ?? property.heritage.paperMillYear}</p>
          <div className="mt-8 max-w-[36rem]">
            <h2 id="heritage-mill" className="display mt-0 text-[clamp(2rem,3.8vw,3.4rem)]">
              {mill.title}
            </h2>
            <p className="m-0 text-[clamp(1.05rem,0.95rem+0.35vw,1.22rem)] text-[var(--ink-soft)]">
              {mill.body}
            </p>
          </div>
        </section>
      ) : null}

      {landscape ? (
        <section
          className="heritage-chapter shell grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end"
          aria-labelledby="heritage-landscape"
        >
          <div>
            <h2 id="heritage-landscape" className="display mt-0 max-w-[12ch] text-[clamp(2rem,3.8vw,3.4rem)]">
              {landscape.title}
            </h2>
            <p className="lede">{landscape.body}</p>
            <div className="mt-8">
              <LemonGrove locale={locale} />
            </div>
          </div>
          {pergola ? (
            <Photo
              image={pergola}
              locale={locale}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="lg:mb-4"
            />
          ) : null}
        </section>
      ) : null}

      {vietri ? (
        <section className="heritage-chapter" aria-labelledby="heritage-vietri">
          <div className="shell max-w-[38rem]">
            <h2 id="heritage-vietri" className="display mt-0 text-[clamp(2rem,3.8vw,3.4rem)]">
              {vietri.title}
            </h2>
            <p className="lede mb-0">{vietri.body}</p>
          </div>
          {mosaic || bath ? (
            <div className="shell mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
              {mosaic ? (
                <Photo
                  image={mosaic}
                  locale={locale}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className={bath ? "md:col-span-7" : "md:col-span-12"}
                />
              ) : null}
              {bath ? (
                <Photo
                  image={bath}
                  locale={locale}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={mosaic ? "md:col-span-5 md:mt-20 xl:mt-32" : "md:col-span-12"}
                  frameClassName="aspect-[3/4]"
                />
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {sea ? (
        <section className="heritage-chapter shell" aria-labelledby="heritage-sea">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {path ? (
              <Photo
                image={path}
                locale={locale}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="lg:mt-24"
              />
            ) : null}
            <div className={path ? "lg:pl-4" : ""}>
              <h2 id="heritage-sea" className="display mt-0 text-[clamp(2rem,3.8vw,3.4rem)]">
                {sea.title}
              </h2>
              <p className="lede">{sea.body}</p>
              {rocks ? (
                <Photo
                  image={rocks}
                  locale={locale}
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="mt-10 max-w-[26rem]"
                />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <div className="shell mt-[clamp(2rem,5vw,4rem)] border-t border-[var(--line)] pt-10">
        <Link className="btn" href={localizedPath(locale, "/request")}>
          {t(locale).cta.request}
        </Link>
      </div>
    </PageShell>
  );
}
