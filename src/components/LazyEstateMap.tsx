"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/property";

const EstateMap = dynamic(
  () => import("./EstateMap").then((module) => module.EstateMap),
  {
    ssr: false,
    loading: () => <div className="estate-map-loading" aria-hidden="true" />,
  },
);

export function LazyEstateMap({
  locale,
  interactive = true,
}: {
  locale: Locale;
  interactive?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="estate-map-shell">
      {nearViewport ? (
        <EstateMap locale={locale} interactive={interactive} />
      ) : (
        <div className="estate-map-loading" aria-hidden="true" />
      )}
    </div>
  );
}
