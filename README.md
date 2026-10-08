# Marina d'Albori Estate

Digital sales brochure for a waterfront estate in Marina d'Albori, Vietri sul Mare, on the Amalfi Coast, shared directly with prospective buyers and advisers. English and Italian. Facts live in `src/content/property.ts`. Pages carry `noindex, nofollow`; social link previews are retained.

## Photographs

Upload files into `public/images/property/`. Preferred names are listed in that folder’s README.

The current aerials are `01_new.jpg` and `02_new.jpg`, optimized from the supplied PNGs. The original files are preserved. The public gallery is an explicit selection of 16 images in five chapters, defined by `BROCHURE_GALLERY_GROUPS` in `src/content/images.ts`; additional uploads are not automatically added to the gallery.

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
- `INQUIRY_ENDPOINT` — POST URL for the request form (Formspree, a CRM webhook, or your API). Until this is set, the form reports that website enquiries are unavailable. Successful submission is shown only when the delivery endpoint accepts the request.

### Vercel

The production site must be **public**. If the URL shows a Vercel login or “Authentication Required”, open the Vercel project → **Settings → Deployment Protection** and turn **Standard Protection** off for Production.

Also set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables.
