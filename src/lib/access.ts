/**
 * Personal access links.
 *
 * Each recipient gets a link such as /v/mario-rossi.Q2x9… where the part
 * after the dot is an HMAC of the recipient slug. Nothing is stored: a token
 * is valid if its signature matches ACCESS_SECRET and its slug has not been
 * revoked in ACCESS_REVOKED. Web Crypto only, so the proxy, the API and the
 * link script share the same code.
 */

export const ACCESS_COOKIE = "mda_access";
export const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const SIGNATURE_BYTES = 16;
const SLUG_MAX = 60;

export function slugify(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX)
    .replace(/-+$/g, "");
}

function base64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signature(slug: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`access:${slug}`)));
  return base64url(mac.slice(0, SIGNATURE_BYTES));
}

function sameString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

export async function createToken(label: string, secret: string): Promise<string> {
  const slug = slugify(label);
  if (!slug) throw new Error("The recipient label must contain letters or digits.");
  return `${slug}.${await signature(slug, secret)}`;
}

/** Returns the recipient slug when the token is authentic and not revoked. */
export async function verifyToken(token: string | undefined | null, secret: string, revoked: readonly string[] = []): Promise<string | null> {
  if (!token || token.length > SLUG_MAX + 40) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const slug = token.slice(0, dot);
  const given = token.slice(dot + 1);
  if (slugify(slug) !== slug) return null;
  if (!sameString(given, await signature(slug, secret))) return null;
  if (revoked.includes(slug)) return null;
  return slug;
}

export type AccessConfig =
  | { mode: "open" }
  | { mode: "locked" }
  | { mode: "protected"; secret: string; revoked: string[] };

/**
 * Without ACCESS_SECRET the site is open in development and locked in
 * production, so a missing variable can never publish the brochure.
 */
export function accessConfig(env: Record<string, string | undefined> = process.env): AccessConfig {
  const secret = env.ACCESS_SECRET?.trim();
  if (!secret) return env.NODE_ENV === "production" ? { mode: "locked" } : { mode: "open" };
  const revoked = (env.ACCESS_REVOKED ?? "").split(",").map((entry) => slugify(entry)).filter(Boolean);
  return { mode: "protected", secret, revoked };
}

/** Bilingual page shown to anyone without a valid link. Deliberately says nothing about the property. */
export function restrictedPage(): string {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Presentazione riservata · Private presentation</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f3efe6; color: #1c1914; font: 16px/1.6 Georgia, "Times New Roman", serif; }
  main { max-width: 30rem; padding: 2.5rem 1.5rem; }
  h1 { font-weight: 400; font-size: 1.6rem; line-height: 1.25; margin: 0 0 .75rem; }
  p { margin: 0 0 2rem; color: #4e4840; font-family: "Helvetica Neue", Arial, sans-serif; font-size: .95rem; }
  p:last-child { margin: 0; }
  hr { border: 0; border-top: 1px solid #cfc4b3; margin: 0 0 2rem; width: 4rem; }
</style>
</head>
<body>
<main>
  <h1>Presentazione riservata</h1>
  <p>Questa pagina è accessibile soltanto tramite il link personale ricevuto via email.</p>
  <hr>
  <h1 lang="en">Private presentation</h1>
  <p lang="en">This page can only be opened with the personal link received by email.</p>
</main>
</body>
</html>`;
}
