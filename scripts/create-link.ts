/**
 * Creates personal links to the brochure.
 *
 *   npm run link -- "Mario Rossi Family Office"
 *   npm run link -- --it "Anna Bianchi" "Studio Verdi"
 *
 * Reads ACCESS_SECRET and NEXT_PUBLIC_SITE_URL from the environment or from
 * .env.local. The secret must be the same one configured on the hosting.
 */
import { existsSync, readFileSync } from "node:fs";
import { createToken, slugify } from "../src/lib/access.ts";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (!match || line.trim().startsWith("#")) continue;
    const [, key, raw] = match;
    if (process.env[key] === undefined) process.env[key] = raw.replace(/^(["'])(.*)\1$/, "$2");
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const args = process.argv.slice(2);
const italian = args.includes("--it");
const labels = args.filter((arg) => !arg.startsWith("--"));
const secret = process.env.ACCESS_SECRET?.trim();
const origin = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");

if (!secret) {
  console.error("ACCESS_SECRET is missing. Add it to .env.local (the same value as on the hosting).");
  process.exit(1);
}
if (!labels.length) {
  console.error('Usage: npm run link -- [--it] "Recipient name" ["Another recipient" ...]');
  process.exit(1);
}

for (const label of labels) {
  const token = await createToken(label, secret);
  console.log(`${label}  [${slugify(label)}]\n  ${origin}/v/${token}${italian ? "?lang=it" : ""}\n`);
}
