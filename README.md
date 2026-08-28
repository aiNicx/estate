# Marina d'Albori Estate

Public presentation site for a waterfront estate in Marina d'Albori, Vietri sul Mare, on the Amalfi Coast. English and Italian. Facts live in `src/content/property.ts`.

## Photographs

Upload files into `public/images/property/`. Preferred names are listed in that folder’s README.

Then, from the project root:

```bash
npm install
npm run optimize:photos
```

That converts HEIC/PNG originals to JPEG, resizes the long edge to 2200px, and deletes obsolete source files.

If GitHub push hangs, the originals are almost certainly too large. Cancel the sync, run the optimiser, commit the JPEGs, then push.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — `/` redirects to `/en`.

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

## Launch

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — public origin, used for canonical URLs, hreflang, sitemap, Open Graph. On Vercel set this to the production domain (for example `https://www.example.com`).
- `INQUIRY_ENDPOINT` — POST URL for the request form (Formspree, a CRM webhook, or your API). Until this is set, validated requests are only logged on the server.
- `PROSPECTS_PIN` — PIN for the private contact desk at `/prospects` (not linked in navigation). Until this is set, the page stays locked.

### Vercel

The production site must be **public**. If the URL shows a Vercel login or “Authentication Required”, open the Vercel project → **Settings → Deployment Protection** and turn **Standard Protection** off for Production.

Also set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables.
