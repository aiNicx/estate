# Marina d’Albori

Brochure digitale off-market per una proprietà sulla spiaggia di Marina d’Albori, a Vietri sul Mare. Si condivide direttamente via email con interessati e advisor selezionati. Italiano e inglese, una pagina per lingua, cinque sezioni: `#proprieta`, `#spazi`, `#storia`, `#posizione`, `#informazioni`.

## Stato al 9 ottobre 2026

Contenuti, traduzioni, anteprime e percorso di lettura finalizzati in locale. Il passo successivo è rispondere all’email ricevuta per documenti disponibili, condizioni di vendita e sopralluogo. Nessun form esposto o collegato, nessun deploy eseguito.

Le sei vecchie route editoriali e `/request` restituiscono 308 verso la sezione corrispondente in entrambe le lingue. `/privacy` resta separata e descrive il contatto via email e le risorse cartografiche esterne. `POST /api/inquiry` restituisce sempre 503 senza leggere o inoltrare dati, anche in presenza di variabili di invio. Il modulo di validazione/consegna in `src/lib/inquiry.ts` resta isolato e testato per la futura Fase 2.

Tutte le pagine mantengono `noindex, nofollow`. `robots.txt` permette la lettura di questi metadati e delle anteprime, senza pubblicizzare una sitemap; `/sitemap.xml` è vuota. Questa è una scelta di indicizzazione, non un controllo di accesso.

## Fonti dei contenuti

- `src/content/property.ts`: fatti forniti e valori sconosciuti lasciati `null`.
- `src/content/geography.ts`: coordinate e distanze indicative in linea d’aria.
- `src/content/brochure.ts`: unico copy editoriale IT/EN, titoli e descrizioni per pagina, OG, Twitter e JSON-LD; ordine delle sezioni e selezione fotografica.
- `src/content/images.ts`: catalogo, risoluzione dei file, didascalie e testi alternativi.
- `src/content/messages.ts`: solo navigazione, galleria, mappa e privacy. Nessun secondo sito editoriale.

Le tre letture — residenza, accoglienza con ristorazione, uso misto — descrivono la composizione nella sezione proprietà, con un solo rinvio ai documenti, ai titoli e alle autorizzazioni applicabili. La proprietà sta sulla spiaggia di Marina d’Albori; da terra si scende per una scalinata di circa 200 gradini, via mare si arriva a un pontile in concessione stagionale. Superfici indicative e cartiera associata restano qualificati anche nei dati strutturati.

La revisione editoriale della Fase 3 comprende una rilettura completa IT/EN: storia della cartiera, limoneto e ceramiche, usi possibili, descrizioni degli spazi e contatto riservato. Il contesto storico resta distinto dai fatti forniti dal committente; non prova l’inclusione della cartiera nella vendita né la provenienza delle ceramiche. Fonti e criteri in [docs/REVISIONE-EDITORIALE.md](docs/REVISIONE-EDITORIALE.md).

## Fotografie

La pagina mostra **12 fotografie**: hero, seconda aerea, sette foto apribili nella galleria Spazi, due dettagli nella Storia e la scala nella Posizione. `brochurePhotos`, `brochurePhotoGroups` e `brochurePhotoIds` in `brochure.ts` definiscono un solo canone, condiviso da pagina e JSON-LD. Le due foto delle terrazze sono mantenute; la numerazione interna dei file non compare nelle didascalie.

Il catalogo più ampio resta in `public/images/property/`; un nuovo upload non entra automaticamente nella brochure. Le aeree utilizzate sono `01_new.jpg` e `02_new.jpg`. Nessuna fotografia è stata modificata in questa finalizzazione.

Per future ottimizzazioni: `npm run optimize:photos`. Lo script riduce il lato lungo a 2200 px e converte i formati sorgente supportati in JPEG; elimina le sorgenti obsolete dopo la conversione, quindi conservarne una copia prima di usarlo.

## Sviluppo e verifica

```bash
npm install
npm run dev
```

Aprire `http://localhost:3000`; `/` porta a `/en`.

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Verifica browser ripetibile con Chrome installato, contro la build locale:

```bash
npm run start -- --hostname 127.0.0.1 -p 3100
# In un altro terminale:
npm run test:browser
```

`BROCHURE_TEST_URL` può indicare un’altra origine locale. Il controllo usa Playwright e salva screenshot e report in `test-results/brochure/` (ignorata da Git). Verifica IT/EN a 1440, 820 e 390 px, immagini, mappa reale, galleria e tastiera, menu, cinque hash nel cambio lingua, 14 redirect, OG PNG, privacy, API disabilitata, sitemap e 404. Serve accesso alla rete per le risorse cartografiche esterne.

## Da completare con il proprietario

Le **Fasi 2 e 3 di FINALIZZAZIONE** (contatto e pubblicazione, distinte dalle fasi della revisione editoriale) restano aperte: casella destinataria, soggetto di contatto e titolare privacy, URL HTTPS definitivo e hosting. Non impostare un endpoint o pubblicare prima di questi dati. L’attivazione futura del form richiede UI, informativa effettiva, protezioni dall’abuso e prova di consegna; impostare `INQUIRY_ENDPOINT` da solo non abilita l’API.

`NEXT_PUBLIC_SITE_URL` rimane vuoto in `.env.example`. Senza configurazione, i link assoluti usano il fallback locale; nessun dominio di produzione viene ipotizzato. Piano e verifiche in [docs/FINALIZZAZIONE.md](docs/FINALIZZAZIONE.md).
