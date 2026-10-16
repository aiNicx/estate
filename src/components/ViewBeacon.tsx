"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/property";

const SENT_KEY = "mda_view_reported";
const MIN_VISIBLE_MS = 4_000;
const INTERACTIONS = ["pointerdown", "pointermove", "wheel", "touchstart", "keydown"] as const;

/**
 * Reports one view per browser session, only after the page has been visible
 * for a few seconds and someone has interacted with it. Email security
 * scanners that prefetch links do neither, so they are not counted.
 */
export function ViewBeacon({ locale }: { locale: Locale }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SENT_KEY)) return;
    } catch {
      // Storage may be unavailable; the server still limits duplicates.
    }
    let interacted = false;
    let longEnough = false;
    let sent = false;

    const send = () => {
      if (sent || !interacted || !longEnough || document.visibilityState !== "visible") return;
      sent = true;
      try {
        sessionStorage.setItem(SENT_KEY, "1");
      } catch {
        // Not fatal: at worst a later page load reports again.
      }
      void fetch("/api/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
        keepalive: true,
      }).catch(() => {});
      cleanup();
    };
    const onInteraction = () => {
      interacted = true;
      send();
    };
    const timer = window.setTimeout(() => {
      longEnough = true;
      send();
    }, MIN_VISIBLE_MS);
    const cleanup = () => {
      window.clearTimeout(timer);
      for (const name of INTERACTIONS) window.removeEventListener(name, onInteraction);
      document.removeEventListener("visibilitychange", send);
    };
    for (const name of INTERACTIONS) window.addEventListener(name, onInteraction, { passive: true });
    document.addEventListener("visibilitychange", send);
    return cleanup;
  }, [locale]);

  return null;
}
