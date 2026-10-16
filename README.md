# Marina d’Albori

Brochure digitale off-market per una proprietà sulla spiaggia di Marina d’Albori, a Vietri sul Mare. Si condivide direttamente via email con interessati e advisor selezionati. Italiano e inglese, una pagina per lingua, cinque sezioni: `#proprieta`, `#spazi`, `#storia`, `#posizione`, `#informazioni`.

## Stato al 17 ottobre 2026

Contenuti IT/EN, fotografie e percorso di lettura completi. La brochure è **riservata**: si apre solo con un link personale, uno per destinatario. Le richieste avvengono via email.

- **Link personali.** Hanno la forma `/v/<destinatario>.<firma>`. La firma HMAC con `ACCESS_SECRET` impedisce di inventarli o modificarli. Al primo uso il link imposta un cookie tecnico di 180 giorni e apre la brochure nella lingua indicata. Chi non ha il link, o lo ha alterato, vede una pagina neutra bilingue che non nomina la proprietà. L’informativa privacy resta pubblica.
- **Notifica di apertura.** Quando un destinatario apre davvero la presentazione, il proprietario riceve una notifica push con nome del link, ora, lingua, dispositivo e località approssimativa. Conta solo una visita reale: la pagina deve restare visibile qualche secondo e serve un’interazione. Così gli scanner antispam che aprono i link in anticipo non generano false aperture.
- **Contatto via email.** La sezione `#informazioni` («Richieste» / «Enquiries») mostra l’indirizzo `CONTACT_EMAIL` e tre link mailto già compilati: planimetrie e visure, concessione e condizioni, sopralluogo. Resta indicata anche la risposta all’email ricevuta. I documenti non sono pubblicati sul sito.

### Creare e revocare i link

```bash
# .env.local deve contenere lo stesso ACCESS_SECRET dell’hosting e NEXT_PUBLIC_SITE_URL
npm run link -- "Mario Rossi Family Office"
npm run link -- --it "Anna Bianchi" "Studio Verdi"
```

Il nome diventa parte del link e compare nelle notifiche. Per disattivare un link si aggiunge il destinatario a `ACCESS_REVOKED`. Cambiare `ACCESS_SECRET` invalida tutti i link già inviati.

### Notifiche gratuite con ntfy

Installare l’app ntfy e iscriversi a un topic lungo e non indovinabile. Poi impostare `VIEW_NOTIFY_URL=https://ntfy.sh/<topic>`. Senza notifica configurata, le aperture restano solo nei log dell’hosting.

Limite noto: le fotografie in `public/images/property/` restano raggiungibili da chi conosce l’indirizzo esatto del file. Testi, dati, mappa, pagine e anteprime social sono invece protetti. L’ottimizzazione delle immagini di Next.js richiede che i file sorgente non passino dal controllo di accesso.

Le sei vecchie route editoriali e `/request` restituiscono 308 verso la sezione corrispondente, sempre dietro il link personale.

Tutte le pagine mantengono `noindex, nofollow`, anche nell’intestazione `X-Robots-Tag`. `/sitemap.xml` è vuota. Il controllo di accesso è affidato ai link personali.

## Fonti dei contenuti

- `src/content/property.ts`: fatti forniti e valori sconosciuti lasciati `null`.
- `src/content/geography.ts`: coordinate e distanze indicative in linea d’aria.
- `src/content/brochure.ts`: unico copy editoriale IT/EN, titoli e descrizioni per pagina, OG, Twitter e JSON-LD; ordine delle sezioni e selezione fotografica.
- `src/content/images.ts`: catalogo, risoluzione dei file, didascalie e testi alternativi.
- `src/content/messages.ts`: solo navigazione, galleria, mappa e privacy. Nessun secondo sito editoriale.

Le tre letture — residenza, accoglienza con ristorazione, uso misto — descrivono la composizione nella sezione proprietà, con un solo rinvio ai documenti, ai titoli e alle autorizzazioni applicabili. La proprietà sta sulla spiaggia di Marina d’Albori; da terra si scende per una scalinata di circa 200 gradini, via mare si arriva a un pontile in concessione stagionale. Le superfici restano indicative. La cartiera del 1830 corrisponde a parte dell’edificio e conserva vasche di macerazione nel sotterraneo; il dato è coerente anche nei dati strutturati.

La revisione editoriale della Fase 3 comprende una rilettura completa IT/EN: storia della cartiera, limoneto e ceramiche, usi possibili, descrizioni degli spazi e contatto riservato. Il proprietario conferma la vendita dell’intera proprietà, comprese le aree esterne e il limoneto, e segue personalmente risposte e sopralluoghi. Sono disponibili planimetrie, visure catastali, documenti della concessione e condizioni di vendita. Per la cartiera indica testi comunali storici e il volume di Aniello Tesauro, *Le cartiere di Vietri tra Settecento ed Ottocento*. Conferme e limiti delle fonti in [docs/REGISTRO-FATTI.md](docs/REGISTRO-FATTI.md); piano aggiornato in [docs/PIANO-COMPLETAMENTO.md](docs/PIANO-COMPLETAMENTO.md).

## Fotografie

La pagina mostra **12 fotografie**: hero, seconda aerea, sette foto apribili nella galleria Spazi, il limoneto e il mosaico nella Storia, la scala nella Posizione. `brochurePhotos`, `brochurePhotoGroups` e `brochurePhotoIds` in `brochure.ts` definiscono un solo canone, condiviso da pagina e JSON-LD. Le due foto delle terrazze sono mantenute; la numerazione interna dei file non compare nelle didascalie.

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
CONTACT_EMAIL=richieste@example.com npm run build
ACCESS_SECRET=prova npm run start -- --hostname 127.0.0.1 -p 3100
# In un altro terminale:
BROCHURE_TEST_SECRET=prova BROCHURE_TEST_CONTACT=richieste@example.com npm run test:browser
```

`BROCHURE_TEST_URL` può indicare un’altra origine locale. Il controllo usa Playwright e salva screenshot e report in `test-results/brochure/` (ignorata da Git). Verifica IT/EN a 1440, 820 e 390 px, immagini, mappa reale, galleria e tastiera, menu, cinque hash nel cambio lingua, accesso con link personale e pagina neutra, link mailto, notifica di apertura dopo interazione, 14 redirect, OG PNG, privacy pubblica, sitemap e 404. Non invia email né notifiche. Serve accesso alla rete per le risorse cartografiche esterne.

## Da completare prima della pubblicazione

- **Dominio:** URL HTTPS definitivo in `NEXT_PUBLIC_SITE_URL`.
- **Segreto:** `ACCESS_SECRET` sull’hosting e in `.env.local`, per generare i link. Senza, in produzione il sito resta chiuso a tutti.
- **Contatto:** `CONTACT_EMAIL` con l’indirizzo da cui scriverete ai destinatari.
- **Notifiche:** topic ntfy in `VIEW_NOTIFY_URL`, facoltativo.
- **Informativa:** nome e recapito del titolare in `PRIVACY_CONTROLLER`.

Tutte le variabili sono descritte in `.env.example`. Piano e verifiche in [docs/FINALIZZAZIONE.md](docs/FINALIZZAZIONE.md) e [docs/STATO-COMPLETAMENTO.md](docs/STATO-COMPLETAMENTO.md).
