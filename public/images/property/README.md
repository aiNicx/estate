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

Nomi consigliati (opzionali):

| File | Soggetto |
| --- | --- |
| `01-hero-cove-aerial.jpg` | Vista aerea della cala (hero) |
| `02-architecture-hillside-aerial.jpg` | Edificio e terrazze dall’alto |
| `03-terrace-dining-sea.jpg` | Terrazza da pranzo sul mare |
| `04-living-kitchen.jpg` | Soggiorno / cucina |
| `05-bedroom.jpg` | Camera |
| `06-bathroom-majolica.jpg` | Bagno con maioliche blu |
| `07-bathroom-geometric.jpg` | Bagno con piastrelle geometriche |
| `08-corridor-mosaic.jpg` | Corridoio a mosaico |

Puoi caricare anche altre foto: finiscono in galleria. Evita HEIC; se ne hai, lo script li converte.
