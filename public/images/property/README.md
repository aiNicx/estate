# Fotografie della proprietà

Carica qui i file originali. Poi, dalla root del progetto:

```bash
npm install
npm run optimize:photos
```

Lo script converte HEIC/PNG in JPEG, riduce il lato lungo a 2200px e **cancella gli originali obsoleti**.

## Se il push GitHub resta in caricamento

I JPEG originali da telefono pesano spesso 8–25 MB l’uno. GitHub ha un limite di **100 MB per file**; anche sotto quel limite un commit da 150–300 MB può restare fermo su “Sync Changes”.

1. Fai una copia delle foto sul Desktop (sicurezza).
2. In Cursor, interrompi il sync (non continuare a premere Sync).
3. Nel terminale, sul branch `cursor/marina-dalbori-estate-site-0b0b`:

```bash
git fetch origin
git reset --soft HEAD~1
npm install
npm run optimize:photos
git add public/images/property
git commit -m "Add optimized property photographs"
git push -u origin cursor/marina-dalbori-estate-site-0b0b
```

`reset --soft` toglie il commit enorme ma **tiene i file**. Dopo l’ottimizzazione il nuovo commit è quello che va pushato.

Nomi in uso (prefisso numerico = ordine in galleria). L’ID in `src/content/images.ts` è lo slug dopo il numero.

| File | Soggetto |
| --- | --- |
| `01-hero-cove-aerial.jpg` | Vista aerea della cala (**hero** del sito) |
| `02-architecture-hillside-aerial.jpg` | Edificio e terrazze dall’alto |
| `03-terrace-dining-sea.jpg` | Terrazza da pranzo sul mare |
| `04-living-kitchen.jpg` | Soggiorno / cucina open space |
| `05-bedroom.jpg` | Camera con copriletto rosso |
| `06-bathroom-majolica.jpg` | Bagno con maioliche blu |
| `07-bathroom-geometric.jpg` | Bagno con piastrelle geometriche |
| `08-corridor-mosaic.jpg` | Corridoio a mosaico |
| `09-sea-rocks-buoys.jpg` | Faraglioni e boe in cala |
| `10-exterior-pines-stream.jpg` | Esterno con pini e torrente |
| `11-bathroom-navy-geometric.jpg` | Bagno blu con doccia geometrica |
| `12-kitchen-dining-majolica.jpg` | Cucina e pranzo in maiolica |
| `13-corridor-unit-doors.jpg` | Pianerottolo, porte unità 2 e 3 |
| `14-living-studio-daybed.jpg` | Studio con daybed |
| `15-terrace-wicker-sea.jpg` | Terrazza rattan vista mare |
| `16-garden-night-terrace.jpg` | Giardino terrazzato di sera |
| `17-garden-night-pergola.jpg` | Pergola di agrumi di sera |
| `18-living-teal-sofa.jpg` | Soggiorno con divano verde acqua |
| `19-path-stairs-sea.jpg` | Scala verso il mare |
| `20-bedroom-vaulted-sea.jpg` | Camera a volta, vista mare |
| `21-bedroom-view-pines.jpg` | Camera verso pini e mare |
| `22-living-vaulted-tv.jpg` | Soggiorno a volta con TV |
| `23-bathroom-vessel-shower.jpg` | Bagno con lavabo a bacinella |
| `24-balcony-arch-beach.jpg` | Balcone ad arco sulla spiaggia |
| `25-living-sea-view.jpg` | Open space con vista mare |
| `26-bedroom-balcony-sea.jpg` | Camera con terrazza sul mare |

Nuove foto: `NN-slug-descrittivo.jpg`. Evita HEIC; se ne hai, lo script li converte.
