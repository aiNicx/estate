"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/content/property";
import type { ResolvedImage } from "@/content/images";
import { t } from "@/content/messages";

export function Gallery({
  locale,
  images,
}: {
  locale: Locale;
  images: ResolvedImage[];
}) {
  const copy = t(locale).gallery;
  const available = images.filter((image) => image.available);
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, next, previous]);

  if (!available.length) {
    return <p className="lede">{copy.pending}</p>;
  }

  return (
    <div>
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, imageIndex) => {
          const availableIndex = available.findIndex((item) => item.id === image.id);
          return (
            <li
              key={image.id}
              className={imageIndex % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              {image.available ? (
                <button
                  type="button"
                  className="block h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
                  onClick={() => setIndex(availableIndex)}
                  aria-label={image.alt[locale]}
                >
                          <span className="photo-frame relative block aspect-[3/4] h-full w-full">
                            <Image
                              src={image.src}
                              alt={image.alt[locale]}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                              style={{ objectPosition: image.objectPosition }}
                            />
                          </span>
                </button>
              ) : (
                <div className="photo-pending aspect-[3/4]" role="img" aria-label={image.alt[locale]}>
                  <span className="sr-only">{copy.pending}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

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
            <div className="photo-frame relative max-h-[80vh] min-h-[50vh]">
              <Image
                src={active.src}
                alt={active.alt[locale]}
                fill
                sizes="96vw"
                className="object-contain"
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
              <button type="button" className="btn" onClick={close}>
                {copy.close}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
