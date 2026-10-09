# Marina d’Albori — chiusura del progetto

## Obiettivo

Brochure privata di vendita, distribuita come link via email a interessati selezionati. Deve rendere leggibili composizione, carattere, usi possibili e prossimo passo, senza aggiungere fatti o promesse economiche. Una pagina per lingua: `/it` e `/en`.

## Fase 1 — contenuti, esperienza e design

Stato: finalizzata in locale il **9 ottobre 2026**, a partire dall’impianto visivo completato l’8 ottobre. Nessuna pubblicazione e nessun commit effettuati in questa attività.

### Decisioni editoriali e tecniche

1. `brochure.ts` è la fonte unica del racconto, dei metadati e del copy delle anteprime; `messages.ts` conserva soltanto interfaccia e privacy.
2. Naming pubblico: Marina d’Albori, proprietà / property, unità / units, limoneto / lemon garden; “complesso” chiarisce la composizione, senza suggerire ville autonome.
3. Tre letture nella sezione Proprietà: privato, accoglienza e ristorazione, misto; nessuna nuova sezione e nessun business plan.
4. Le possibilità rimandano ai documenti tecnici, urbanistici, catastali e concessori, ai titoli delle attività e alle autorizzazioni per eventuali cambi d’uso.
5. Le dodici foto live restano invariate; pagina e JSON-LD condividono selezione e ordine, con sette fotografie apribili nella galleria.
6. Didascalie e alt eliminano numerazioni interne e riferimenti non fondati a corso d’acqua o pergola di agrumi, anche nel catalogo non pubblicato.
7. Il contatto è la risposta all’email ricevuta: documenti disponibili, perimetro, condizioni e visita; un rimando diretto è presente anche accanto agli usi possibili.
8. `/request` reindirizza con 308 a `#informazioni`; form rimosso, API sempre 503. La libreria di consegna rimane isolata con i suoi test per la Fase 2.
9. JSON-LD descrive la pagina attuale e un `Place`, con superfici indicative e qualifiche identiche al testo; rimossi `Accommodation`, `Offer` e la vecchia IA.
10. Conservati noindex/nofollow e OG; sitemap vuota, robots leggibile dai crawler; rimossi componenti morti e vecchie route di navigazione, conservando i redirect.

### Verifiche

- Build di produzione locale, lint, TypeScript e 24 test di contenuto/libreria.
- Test fattuali precedenti preservati; le asserzioni sul vecchio copy sono migrate alla brochure live e ampliate su metadati, foto, cautele, canale email e termini vietati.
- Chrome headless via Playwright, IT/EN a 1440, 820 e 390 px: hero, composizione/usi, Spazi, Storia, mappa reale e Informazioni.
- Dodici immagini caricate e coerenti con i dati strutturati; galleria a sette foto, frecce, Escape e ritorno del focus.
- Corretto il canvas della mappa che eccedeva il riquadro mobile; stato pronto solo dopo il primo rendering completo, con verifica del fallback in caso di risorse indisponibili.
- Menu mobile, chiusura con Escape e selezione; tutte le cinque sezioni preservate nel cambio lingua in entrambe le direzioni.
- Quattordici redirect HTTP 308, anteprime IT/EN HTTP 200 PNG, privacy, 404, API 503 e sitemap vuota.
- Screenshot e report generati localmente in `test-results/brochure/`; procedura ripetibile con `npm run test:browser`.

Il browser integrato della sessione non era disponibile: la verifica è stata eseguita sulla build locale con Chrome e Playwright. Le risorse cartografiche richiedono rete; è stato verificato il caricamento effettivo oltre al fallback esistente.

## Fase 2 — contatto: aperta, dipendente dal proprietario

Obiettivo: una richiesta inviata dal sito arriva alla casella scelta e la conferma corrisponde a un invio realmente accettato dal servizio.

Dati mancanti: **casella destinataria, soggetto di contatto e dati del titolare privacy**. L’attivazione resta subordinata anche alla definizione dell’URL di produzione.

1. Definire destinatario, servizio di invio e trattamento dei dati con il titolare.
2. Progettare un form essenziale e collegarlo alla sezione Informazioni, sostituendo la chiusura via email solo quando operativo.
3. Aggiornare la privacy sulla configurazione effettiva, senza attribuire ruoli a soggetti non confermati.
4. Abilitare esplicitamente l’API, aggiungere protezioni dall’abuso e verificare errori e mancata consegna.
5. Provare un invio reale e la ricezione nella casella scelta. I test di consegna attuali usano un servizio simulato.

Non sono stati configurati endpoint, CRM, destinatari o titolari. `INQUIRY_ENDPOINT` è una riserva tecnica nella libreria, non un interruttore sufficiente a rendere operativo il sito.

## Fase 3 — pubblicazione: aperta, dipendente dal proprietario

Dati mancanti: **URL HTTPS definitivo e hosting/account di pubblicazione**.

1. Confermare dominio e hosting e configurare `NEXT_PUBLIC_SITE_URL`.
2. Riesaminare accessibilità del link per i destinatari e postura noindex; noindex non equivale a protezione tramite autenticazione.
3. Pubblicare solo dopo aver completato i prerequisiti del contatto e della privacy.
4. Ripetere verifiche di lingue, hash, redirect, immagini, mappa e anteprime sull’origine definitiva.
5. Verificare la ricezione reale del contatto in produzione, prima di distribuire il link.

## Perimetro dei fatti

Le superfici restano indicative: circa 900 m² interni e 350 m² di terrazze. Sette unità indipendenti, cinque residenziali e due commerciali. Solo parte delle unità residenziali è descritta come alloggio per vacanze; è presente un’attività di ristorazione, senza dedurne licenze, coperti o trasferibilità.

La cartiera del 1830 resta associata/legata alla proprietà, senza affermarne l’inclusione nella vendita. Anno e legame sono dati del committente; la tradizione cartaria di Vietri sul Mare è contesto storico, non un fatto classificato come fornito dal proprietario. Il limoneto conta circa 8 alberi di circa 70 anni: il richiamo alla coltivazione costiera non attribuisce cultivar, certificazioni o produttività. Le ceramiche sono descritte attraverso i dettagli visibili nelle fotografie, senza attribuzioni di autore, data o provenienza. Fonti e limiti sono registrati in [REVISIONE-EDITORIALE.md](REVISIONE-EDITORIALE.md).

Da terra si scende a piedi per una scalinata di circa 200 gradini: il numero è fornito dal committente. L’accesso veicolare agli edifici resta sconosciuto. Il pontile resta legato a una concessione stagionale. I tre tempi di navigazione — circa 10 minuti dal porto di Salerno, 5 da Vietri, 10 da Cetara — sono forniti dal committente e indicativi, distinti dalle distanze in linea d’aria.

Prezzo, planimetrie, perimetro di vendita, titoli e condizioni della concessione sono temi da richiedere al contatto, non materiali dichiarati già disponibili in pagina. Le distanze indicative in linea d’aria restano quelle derivate da `geography.ts`.

## File interessati

Modificati o aggiunti:

- `.env.example`
- `.gitignore`
- `README.md`
- `docs/FINALIZZAZIONE.md`
- `package-lock.json`
- `package.json`
- `public/images/property/README.md`
- `scripts/check-brochure.mjs`
- `src/app/[locale]/opengraph-image.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/privacy/page.tsx`
- `src/app/[locale]/request/page.tsx`
- `src/app/api/inquiry/route.ts`
- `src/app/globals.css`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/EstateMap.tsx`
- `src/components/Header.tsx`
- `src/components/PageShell.tsx`
- `src/content/brochure.test.ts`
- `src/content/brochure.ts`
- `src/content/geography.test.ts`
- `src/content/images.test.ts`
- `src/content/images.ts`
- `src/content/messages.ts`
- `src/content/property.test.ts`
- `src/content/property.ts`
- `src/lib/jsonld.ts`
- `src/lib/seo.ts`
- `src/lib/site.ts`

Rimossi perché non più usati dalla brochure:

- `src/components/CompositionBoard.tsx`
- `src/components/CoveDiagram.tsx`
- `src/components/GalleryInventory.tsx`
- `src/components/HomeGallery.tsx`
- `src/components/InquiryForm.tsx`
- `src/components/LemonGrove.tsx`
- `src/components/LocationAtlas.tsx`
- `src/components/MetricBand.tsx`
- `src/components/MosaicBand.tsx`
- `src/components/SpecList.tsx`
- `src/components/WaveRule.tsx`
- `src/content/facts.ts`
