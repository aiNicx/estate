/**
 * Open notifications: who opened the presentation and when.
 * The browser reports a view only after a real visit (see ViewBeacon), so
 * link scanners that prefetch emails do not trigger it.
 */

export type ViewDetails = {
  slug: string;
  locale: "en" | "it";
  at: Date;
  city?: string;
  country?: string;
  device: "smartphone" | "tablet" | "computer";
};

export function deviceFrom(userAgent: string | null): ViewDetails["device"] {
  const agent = userAgent ?? "";
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(agent)) return "tablet";
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(agent)) return "smartphone";
  return "computer";
}

function decoded(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value).slice(0, 80);
  } catch {
    return value.slice(0, 80);
  }
}

/** Approximate location from the hosting provider's geo headers, when present. */
export function locationFrom(headers: Headers): { city?: string; country?: string } {
  return {
    city: decoded(headers.get("x-vercel-ip-city")),
    country: decoded(headers.get("x-vercel-ip-country")),
  };
}

export function viewMessage(view: ViewDetails) {
  const when = new Intl.DateTimeFormat("it-IT", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Rome" }).format(view.at);
  const place = [view.city, view.country].filter(Boolean).join(", ");
  const title = `Marina d'Albori: aperta da ${view.slug}`;
  const body = [
    `${view.slug} ha aperto la presentazione in ${view.locale === "it" ? "italiano" : "inglese"}.`,
    [when, place, view.device].filter(Boolean).join(" · "),
  ].join("\n");
  return { title, body };
}

/** Best-effort, per-instance: one notification per recipient every 20 minutes. */
const recent = new Map<string, number>();
export function shouldNotify(slug: string, now = Date.now(), windowMs = 20 * 60_000): boolean {
  const last = recent.get(slug);
  if (last !== undefined && now - last < windowMs) return false;
  recent.set(slug, now);
  if (recent.size > 2_000) {
    for (const [key, time] of recent) if (now - time >= windowMs) recent.delete(key);
  }
  return true;
}

export function resetNotifications() {
  recent.clear();
}

/**
 * Sends the notification to VIEW_NOTIFY_URL, typically an ntfy.sh topic
 * (https://ntfy.sh/<secret-topic>): plain-text POST, delivered as a push
 * notification by the free ntfy app. Returns false when it is not configured.
 */
export async function notifyView(view: ViewDetails, url = process.env.VIEW_NOTIFY_URL?.trim()): Promise<boolean> {
  if (!url) return false;
  const { title, body } = viewMessage(view);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // ntfy reads these; other webhooks ignore them. Header values must be ASCII.
      Title: title.normalize("NFD").replace(/[^\x20-\x7e]/g, ""),
      Tags: "house",
    },
    body,
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`Notification endpoint returned ${response.status}`);
  return true;
}
