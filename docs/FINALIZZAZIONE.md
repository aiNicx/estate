# Marina d’Albori — chiusura del progetto

## Obiettivo

Una brochure digitale bilingue, da inviare come link nelle email a potenziali interessati. La pagina deve spiegare la proprietà, mostrare gli spazi e permettere di proseguire il contatto. Contenuti e design vengono chiusi prima dell’integrazione del form e della pubblicazione.

## Fase 1 — contenuti e design

Stato: completata sul progetto locale, 8 ottobre 2026.

- Un’unica pagina per lingua: /it e /en.
- Cinque sezioni: proprietà, spazi, storia, posizione, informazioni.
- Dati di superficie e composizione raccolti insieme e derivati da src/content/property.ts.
- Dodici fotografie selezionate, comprese entrambe le nuove foto delle terrazze; sette immagini della sezione spazi apribili in galleria.
- Testi della brochure in src/content/brochure.ts; didascalie e testi alternativi in src/content/images.ts.
- Le sei precedenti pagine editoriali reindirizzano alla sezione corrispondente, in entrambe le lingue.
- Navigazione per sezioni; pagina privacy separata. Il form esistente è conservato, fuori dal percorso della brochure.
- Nessuna promessa di rendimento, esclusività della cala o accesso nautico tutto l’anno. Accesso pedonale e concessione stagionale descritti esplicitamente.
- Chiusura provvisoria coerente con la distribuzione via email: rispondere al messaggio ricevuto.
- Noindex/nofollow e anteprime del link conservati.

Verifiche: build, TypeScript, lint e 22 test; browser di test a 1440, 820 e 390 px; caricamento immagini e mappa; menu mobile; galleria e tastiera; redirect HTTP 308 delle vecchie pagine IT/EN; cambio lingua con mantenimento della sezione; risposta delle anteprime IT/EN (HTTP 200, image/png).

## Fase 2 — contatto

Obiettivo di chiusura: una richiesta inviata dal sito arriva alla casella scelta, e solo l’avvenuta consegna genera la conferma al visitatore.

Attività tecniche:

1. Collegare il servizio di invio e configurare il destinatario.
2. Semplificare il form alle informazioni necessarie al primo contatto.
3. Integrare il form nella sezione informazioni della brochure e aggiornare la chiusura via email.
4. Allineare la privacy al titolare e al servizio effettivamente utilizzati.
5. Verificare un invio reale, gestione degli errori e protezione dallo spam.

Informazioni da fornire: casella destinataria, nome/soggetto di contatto e dati del titolare per la privacy.

## Fase 3 — pubblicazione

Obiettivo di chiusura: un URL HTTPS definitivo, apribile dal destinatario della mail, con brochure IT/EN e contatto verificati in produzione.

1. Definire dominio e hosting.
2. Configurare URL pubblico e variabili del servizio di contatto.
3. Pubblicare e controllare home, lingue, vecchi link e anteprime di condivisione.
4. Verificare la ricezione di una richiesta dall’URL definitivo.
5. Inserire il link italiano o inglese nella mail di presentazione.

Informazioni da fornire: dominio desiderato e account/hosting su cui pubblicare, se già disponibili.

## Perimetro dei contenuti

Le superfici sono indicative. Prezzo, planimetrie, documenti delle attività e termini della concessione vengono approfonditi nel contatto diretto. La cartiera è descritta come associata alla proprietà: inclusione e condizioni non sono state dedotte dalle fotografie. L’aggiunta di informazioni richiede il dato effettivo del proprietario.
