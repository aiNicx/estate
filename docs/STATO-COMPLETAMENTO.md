# Stato di completamento — Marina d’Albori

## 17 ottobre 2026 — link personali, notifiche di apertura, contatto via email

Su istruzione del committente il modulo e l’invio tramite Resend sono stati **rimossi**. Il committente scrive ai destinatari da una propria casella e riceve le risposte lì. Restano le richieste di documenti e sopralluogo tramite link mailto. Il registro del 16 ottobre resta come storico.

- **Accesso:**
  - `src/proxy.ts` e `src/lib/access.ts` proteggono pagine, anteprime social e route legacy.
  - Il link `/v/<slug>.<firma HMAC>` imposta un cookie tecnico di 180 giorni.
  - Senza link valido viene servita una pagina neutra 403 che non nomina la proprietà.
  - `/privacy` resta pubblica. Revoca tramite `ACCESS_REVOKED`.
  - Senza `ACCESS_SECRET` il sito è aperto in sviluppo e chiuso in produzione.
- **Link:** `npm run link -- [--it] "Nome"` genera i link personali.
- **Aperture:** `ViewBeacon` segnala una sola visita per sessione, dopo 4 secondi visibili e un’interazione, così gli scanner email non contano. `/api/view` verifica il cookie, registra nel log e notifica via `VIEW_NOTIFY_URL` (ntfy).
- **Contatto:**
  - `CONTACT_EMAIL`, letto in build, mostra l’indirizzo e tre mailto precompilati IT/EN: planimetrie e visure, concessione e condizioni, sopralluogo.
  - Senza indirizzo la pagina invita a rispondere all’email ricevuta.
- **Informativa:** riscritta per link personale, cookie, registrazione delle aperture e corrispondenza email.
- **Rimossi:** modulo, `/api/inquiry`, `src/lib/inquiry.ts` e i relativi test, tipi del modulo nel modello, CSS del modulo.

Verifiche del 17 ottobre 2026 sulla build di produzione locale:

- 31 test Node, ESLint, TypeScript e build superati.
- `npm run test:browser` superato con segreto e contatto di prova: IT/EN a 1440, 820 e 390 px.
- Coperti dal controllo browser:
  - 403 neutro senza link, con link falsificato e con link alterato.
  - Privacy pubblica.
  - Cookie HttpOnly.
  - Quattro mailto con oggetto e testo.
  - Una sola segnalazione di apertura, solo dopo interazione.
  - Redirect, OG, 404.
- **Non eseguito:** notifica ntfy reale e controllo sull’hosting definitivo.

Limite noto: i file in `public/images/property/` restano raggiungibili da chi conosce l’URL esatto, perché l’ottimizzatore di immagini deve leggerli senza cookie.

Fotografie, stesso giorno: nella Storia la foto della cucina in maiolica è sostituita da `27-lemon-garden.jpg`, scatto del limoneto fornito dal committente nella versione senza persone. Il file è ridimensionato a 2200 px sul lato lungo; l’originale non è nel repository. Il canone resta di 12 fotografie. JSON-LD, didascalie IT/EN e test browser sono allineati.

## 16 ottobre 2026 — modulo di richiesta, email e rifinitura IT/EN

Su istruzione diretta del committente il percorso di contatto comprende ora il **modulo** (Fase 5, variante form), con notifica email al proprietario. La risposta all’email originaria resta indicata come alternativa.

- **Modulo:** sezione `#informazioni` (menu «Richieste» / «Enquiries»). Campi: nome, email, telefono facoltativo, società facoltativa, paese, profilo, documenti richiesti, messaggio, presa visione dell’informativa. Errori accessibili con riepilogo focalizzato, conferma solo dopo l’accettazione del provider.
- **Invio:** `src/lib/inquiry.ts` usa l’API HTTP di Resend, senza nuove dipendenze. La notifica è in italiano, con `Reply-To` sul richiedente. È disponibile una conferma facoltativa al richiedente nella sua lingua. Webhook `INQUIRY_ENDPOINT` come alternativa.
- **Protezioni:** validazione server, controllo origine e content-type, limite dimensione, honeypot, tempo minimo, rate limit best-effort. Ai bot risponde un finto successo, senza alcun invio.
- **Informativa:** riscritta IT/EN per il modulo, con titolare, dati, basi giuridiche art. 6.1.b/f, destinatari per categoria, conservazione, mappa, diritti e Garante. Identità del titolare configurabile con `PRIVACY_CONTROLLER`; non inventata.
- **Copy:**
  - La hero dichiara la vendita: «L’unico edificio sulla spiaggia…», «Vendita riservata · Direttamente dal proprietario», secondo invito «Richiedi informazioni».
  - Tempi via mare qualificati con «circa»/«about», risolvendo la discrepanza B del piano.
  - L’italiano dell’interfaccia passa a forme impersonali.
  - Rimosso il link duplicato nella sezione Proprietà.
  - Rifinite alcune frasi inglesi.
- **Test:** suite Node da 24 a 33 test, con validazione, bot, rate limit, escaping HTML dell’email, modalità Resend/webhook/non configurato e conferma facoltativa. `scripts/check-brochure.mjs` aggiornato al nuovo contratto: modulo presente, invio intercettato, 422/403 dall’API.

Verifiche eseguite il 16 ottobre 2026 sulla build di produzione locale:

- Test Node, ESLint, TypeScript e build superati.
- `npm run test:browser` superato: IT/EN a 1440, 820 e 390 px, mappa reale e 14 redirect.
- Prova end-to-end separata con un ricevitore webhook locale: invio IT ed EN ricevuti con i campi corretti, bot e richieste cross-origin non inoltrati.
- Senza configurazione l’API risponde 503 e l’interfaccia mostra l’errore.
- **Non eseguito:** invio reale tramite Resend, perché mancano la chiave e l’indirizzo di ricezione. Nessun deploy.

Restano: chiave Resend e `INQUIRY_TO`, identità del titolare per l’informativa, dominio e hosting definitivi, prova di ricezione reale dopo la configurazione.

## 9 ottobre 2026 — conferme del proprietario

Recepite nel modello, nel copy IT/EN e nella documentazione:

- Cartiera limitata a parte dell’edificio e vasche nel sotterraneo.
- Fonte storica indicata: testi comunali e volume di Aniello Tesauro; verificati i dati bibliografici dell’editore, non i passaggi del libro.
- Vendita dell’intera proprietà, comprese aree esterne e limoneto, senza inventario pubblico.
- Disponibilità di planimetrie, visure catastali, documenti della concessione e condizioni.
- Richieste e sopralluoghi seguiti personalmente dal proprietario, attraverso il canale email esistente.

Aggiornati i test esistenti per proteggere la distinzione tra parte dell’edificio e intera proprietà e le nuove conferme IT/EN. La storia nei dati strutturati deriva dal medesimo testo della brochure.

Le fasi del piano non sono dichiarate interamente completate da questa revisione. Restano configurazione di pubblicazione/privacy e gli altri interventi individuati nel piano. Nessun deploy o invio esterno.

Verifiche di questa revisione: 24 test superati; ESLint, TypeScript e build di produzione superati. Browser Chrome sulla nuova build locale: IT/EN a 1440 e 390 px, testo di Proprietà/Storia/Informazioni e storia nel JSON-LD coerenti, nessuno scroll orizzontale e nessun errore JavaScript rilevato nelle quattro viste. Screenshot e report in test-results/owner-confirmations/. Controllo mirato dei contenuti modificati, non riesecuzione dell’intera suite browser di rilascio.
