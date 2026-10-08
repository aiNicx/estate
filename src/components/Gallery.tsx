"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/content/property";
import type { ResolvedImage } from "@/content/images";
import { t } from "@/content/messages";

export function Gallery({
  locale,
  groups,
  brochure = false,
}: {
  locale: Locale;
  groups: { id: string; title: string; description?: string; images: ResolvedImage[] }[];
  brochure?: boolean;
}) {
  const copy = t(locale).gallery;
  const available = groups.flatMap((group) => group.images.filter((image) => image.available));
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const labelId = useId();
  const active = index !== null ? available[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => {
    setIndex((current) =>
      current === null ? current : (current + 1) % available.length,
    );
  }, [available.length]);
  const previous = useCallback(() => {
    setIndex((current) =>
      current === null
        ? current
        : (current - 1 + available.length) % available.length,
    );
  }, [available.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, next, previous]);

  if (!available.length) {
    return null;
  }

  return (
    <div className={brochure ? "brochure-gallery" : undefined}>
      {!brochure ? <nav aria-label={copy.title} className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--line)] pb-5 text-sm">
        {groups.filter((group) => group.images.length).map((group) => (
          <a key={group.id} href={`#gallery-${group.id}`} className="underline-offset-4">{group.title}</a>
        ))}
      </nav> : null}
      {groups.map((group) => {
        const photos = group.images.filter((image) => image.available);
        if (!photos.length) return null;
        return (
          <section key={group.id} id={`gallery-${group.id}`} aria-labelledby={`gallery-title-${group.id}`} className={brochure ? "brochure-gallery-group" : "mb-16 scroll-mt-28"}>
            {brochure ? <div className="brochure-gallery-heading"><h3 id={`gallery-title-${group.id}`}>{group.title}</h3><p>{group.description}</p></div> : <h2 id={`gallery-title-${group.id}`} className="display mb-6 text-[clamp(1.8rem,3vw,2.6rem)]">{group.title}</h2>}
            <ul className={brochure ? `brochure-gallery-grid brochure-gallery-${group.id}` : `m-0 grid list-none items-start gap-x-5 gap-y-8 p-0 sm:grid-cols-2 ${photos.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {photos.map((image) => (
                <li key={image.id}>
                  <figure className="m-0">
                    <button type="button" className="block w-full cursor-zoom-in border-0 bg-transparent p-0" onClick={() => setIndex(available.findIndex((photo) => photo.id === image.id))} aria-label={image.alt[locale]}>
                      <span className={`photo-frame relative block w-full ${image.width > image.height ? "aspect-[3/2]" : "aspect-[4/5]"}`}>
                        <Image src={image.src} alt={image.alt[locale]} fill sizes={brochure ? (group.id === "terrazze" && image.id === photos[0].id ? "100vw" : "(max-width: 600px) 100vw, 50vw") : photos.length === 3 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 100vw, 50vw"} style={{ objectPosition: image.objectPosition }} />
                      </span>
                    </button>
                    <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">{image.caption[locale]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <dialog
        ref={dialogRef}
        className="m-auto w-[min(96vw,72rem)] max-h-[96vh] border-0 bg-[var(--paper)] p-4"
        onClose={close}
        aria-labelledby={labelId}
      >
        {active ? (
          <div>
            <p id={labelId} className="sr-only">
              {active.alt[locale]}
            </p>
            <div className="mb-3 flex items-center justify-between gap-4"><span className="text-sm">{(index ?? 0) + 1} / {available.length}</span><button type="button" className="btn btn-ghost" onClick={close}>{copy.close}</button></div>
            <div className="photo-frame relative h-[62svh]">
              <Image
                src={active.src}
                alt={active.alt[locale]}
                fill
                sizes="96vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="mt-3 text-sm">{active.caption[locale]}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn btn-ghost" onClick={previous}>
                {copy.previous}
              </button>
              <button type="button" className="btn btn-ghost" onClick={next}>
                {copy.next}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
