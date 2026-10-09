# Fotografie della proprietà

Carica qui i file originali. Poi, dalla root del progetto:

```bash
npm install
npm run optimize:photos
```

Lo script converte HEIC/PNG in JPEG, riduce il lato lungo a 2200px e **cancella gli originali obsoleti**.

Le nuove viste aeree in uso sono `01_new.jpg` e `02_new.jpg`, derivate dai PNG forniti. I file precedenti sono conservati ma non compaiono nella brochure.

La brochure mostra **12 fotografie**, di cui **7 apribili nella galleria Spazi**, in tre gruppi (terrazze, interni, camere). Selezione e ordine sono definiti da `brochurePhotos`, `brochurePhotoGroups` e `brochurePhotoIds` in `src/content/brochure.ts`, condivisi con il JSON-LD. Il caricamento di un nuovo file non lo pubblica automaticamente.

Catalogo delle fotografie disponibili:

| File | Soggetto |
| --- | --- |
| `01_new.jpg` | Nuova vista aerea della spiaggia (**hero** del sito) |
| `02_new.jpg` | Nuova vista dell'edificio e delle terrazze dall’alto |
| `03-terrace-dining-sea.jpg` | Terrazza da pranzo sul mare |
| `04-living-kitchen.jpg` | Soggiorno / cucina open space |
| `05-bedroom.jpg` | Camera con copriletto rosso |
| `06-bathroom-majolica.jpg` | Bagno con maioliche blu |
| `07-bathroom-geometric.jpg` | Bagno con piastrelle geometriche |
| `08-corridor-mosaic.jpg` | Corridoio a mosaico |
| `09-sea-rocks-buoys.jpg` | Scogli e boe in mare |
| `10-exterior-pines-stream.jpg` | Edifici tra i pini |
| `11-bathroom-navy-geometric.jpg` | Bagno blu con doccia geometrica |
| `12-kitchen-dining-majolica.jpg` | Cucina e pranzo in maiolica |
| `13-corridor-unit-doors.jpg` | Pianerottolo con porte blu |
| `14-living-studio-daybed.jpg` | Studio con daybed |
| `15-terrace-wicker-sea.jpg` | Terrazza rattan vista mare |
| `16-garden-night-terrace.jpg` | Giardino terrazzato di sera |
| `17-garden-night-pergola.jpg` | Percorso in giardino di sera |
| `18-living-teal-sofa.jpg` | Soggiorno con divano verde acqua |
| `19-path-stairs-sea.jpg` | Scala verso la spiaggia |
| `20-bedroom-vaulted-sea.jpg` | Camera a volta con apertura verso una terrazza |
| `21-bedroom-view-pines.jpg` | Camera verso pini e mare |
| `22-living-vaulted-tv.jpg` | Soggiorno a volta con TV |
| `23-bathroom-vessel-shower.jpg` | Bagno con lavabo a bacinella |
| `24-balcony-arch-beach.jpg` | Balcone ad arco sulla spiaggia |
| `25-living-sea-view.jpg` | Open space con vista mare |
| `26-bedroom-balcony-sea.jpg` | Camera con terrazza sul mare |
| `terrazzo_casa_4-01.jpg` | Terrazza con lettini e sedute |
| `terrazzo_casa_4-02.jpg` | Terrazza e pini sul mare |

Nuove foto: `NN-slug-descrittivo.jpg`. Evita HEIC; se ne hai, lo script li converte.
