# Marina d’Albori — piano operativo di completamento

Data della ricognizione: 9 ottobre 2026. Base esaminata: commit 48ba4b4, working tree inizialmente pulito.

Questo documento è il piano operativo per le prossime esecuzioni, aggiornato con le conferme del proprietario del 9 ottobre 2026. Le conferme su cartiera, vendita, documenti e referente sono state recepite nel modello e nel copy IT/EN; le altre fasi restano da eseguire. I prompt sono pensati per sessioni successive, una fase per volta. Le istruzioni dirette del committente, comprese eventuali conferme più recenti, prevalgono sui vecchi documenti del repository.

## 1. Scopo e risultato da ottenere

La finalità ricostruita da README, documentazione, codice e archivio prospect è presentare una proprietà in vendita sulla spiaggia di Marina d’Albori a interlocutori selezionati: potenziali acquirenti privati, advisor, private office e operatori coerenti con la composizione dell’immobile.

Il percorso da completare è: **email personale → brochure IT/EN → comprensione di proprietà, spazi e accessi → conversazione riservata → documenti e sopralluogo**.

La brochure deve consentire a un lettore di capire rapidamente:

1. Dove si trova la proprietà e quali edifici/spazi si stanno presentando.
2. La composizione: circa 900 m² interni, circa 350 m² di terrazze, sette unità, cinque residenziali e due commerciali.
3. Gli usi attuali, distinti dalle possibilità future e dal perimetro effettivo della vendita.
4. Il carattere del luogo attraverso fotografie, storia essenziale, limoneto e ceramiche.
5. L’arrivo da terra e via mare, con qualifiche corrette.
6. A chi rispondere per proseguire e quali informazioni si possono richiedere.

Il progetto può essere completato come strumento di presentazione e contatto; la vendita dell’immobile è un risultato commerciale successivo. Nessun agente può certificare titoli, consistenze o concessioni sulla sola base del sito.

## 2. Diagnosi del progetto reale

### Cosa è già valido

- Architettura semplice: Next.js, una pagina per lingua, cinque sezioni e privacy separata.
- Separazione fra fatti in src/content/property.ts, racconto in brochure.ts, interfaccia in messages.ts, immagini in images.ts e geografia in geography.ts.
- Impianto editoriale riconoscibile: fondo carta, tipografia Fraunces/Outfit, colori marini, fotografie ampie e chiusura scura.
- Una selezione canonica di dodici fotografie, sette nella galleria apribile, condivisa con i dati strutturati.
- Navigazione per sezioni, cambio lingua, redirect delle vecchie route e mappa con caricamento differito.
- Contatto via risposta all’email; form assente e API deliberatamente disabilitata.
- Suite di test già esistente e script browser ripetibile. Evitare una riscrittura dello stack o un redesign completo senza un problema dimostrato.

### Cosa impedisce di chiamarlo concluso

**A. Cartiera e perimetro chiariti dal proprietario.** La cartiera del 1830 corrisponde a parte dell’edificio; nel sotterraneo si conservano le vasche di macerazione. Il proprietario indica testi comunali storici e il volume di Aniello Tesauro come fonti. La vendita riguarda l’intera proprietà, comprese le aree esterne e il limoneto. Modello, copy IT/EN e test sono stati allineati: non reintrodurre né l’identificazione di tutto l’immobile con la cartiera né il dubbio generico sulla sua inclusione. Registro in [REGISTRO-FATTI.md](REGISTRO-FATTI.md).

**B. Qualifiche dei tempi incoerenti.** property.seaApproach conserva approximately e indicativeMinutes; brochure.ts:110/194 pubblica 10/5/10 minuti senza circa o indicativi. brochure.test.ts:79/80 vieta esplicitamente la parola indicativi. L’agente deve risolvere la contraddizione semantica, senza limitarsi a far passare il test esistente.

**C. Documentazione e pagina differiscono anche sugli usi.** FINALIZZAZIONE dichiara una nota unica sulle verifiche documentali e autorizzative sotto gli scenari; in page.tsx:78 la nota non è più montata e nel copy attuale non c’è possibilitiesNote. La sezione Informazioni richiama ancora la due diligence. Serve decidere se mantenere quel solo richiamo e rendere le tre letture non assertive, oppure reinserire una singola nota breve. Nessuna disseminazione di disclaimer.

**D. Evidenze visive precedenti alla versione corrente.** Gli screenshot conservati mostrano ancora cartiera associata, una nota sugli usi e una chiusura email più lunga. Sono utili per valutare il linguaggio visivo, ma non provano lo stato del commit corrente. Il report JSON non identifica commit e data della build verificata.

**E. Referente confermato; pubblicazione ancora da configurare.** Il proprietario segue personalmente richieste e sopralluoghi. Planimetrie, visure catastali, documenti della concessione e condizioni di vendita sono disponibili. Il percorso resta la risposta all’email; un form è un’estensione eventuale. Restano da definire URL, hosting e dati identificativi necessari all’informativa, senza pubblicare recapiti personali non forniti.

**F. Riservatezza da definire concretamente.** noindex è già configurato, ma chi possiede il link può accedere in assenza di autenticazione. Va distinta la distribuzione selettiva da un accesso effettivamente protetto. La scelta influenza anche le anteprime email e social.

**G. Materiale commerciale separato e non ancora attuale per definizione.** Il repository contiene otto liste nazionali e un elenco di esclusione. Nei campioni Francia e Stati Uniti compare last_verified 2026-08-27; alcune note citano compatibilità con ticket €6M–€12M. Sono annotazioni sui destinatari, non una valutazione o un prezzo di questa proprietà. L’etichetta verified di una riga non sostituisce una verifica prima dell’uso.

### Verifiche della ricognizione iniziale, prima delle conferme

- Riletti documenti, dati, copy IT/EN, pagina, CSS, navigazione, mappa, endpoint, metadati e test pertinenti.
- Controllati cronologia recente e stato Git.
- Rieseguiti i sei file della suite Node: **24 test superati**.
- Rieseguiti ESLint e TypeScript senza emissione né cache incrementale: **superati**.
- Esaminati screenshot esistenti di hero desktop/mobile, Proprietà, Storia e Informazioni.
- Ricontrollate fonti pubbliche citate sotto e ispezionata la struttura del materiale prospect.
- **Non** eseguiti in questa ricognizione: nuova build di produzione, nuova sessione browser, verifica completa delle singole righe prospect, pubblicazione o invii. I loro risultati precedenti non sono presentati come nuove prove.

Aggiornamento successivo alle conferme: modello, copy IT/EN, documentazione e test allineati; 24 test, lint, TypeScript e nuova build superati. Verifica browser mirata a 1440/390 px in entrambe le lingue completata. Dettagli in [STATO-COMPLETAMENTO.md](STATO-COMPLETAMENTO.md).

## 3. Informazioni utilizzabili e limiti delle fonti

### Dati già registrati come forniti dal committente

Nel modello attuale risultano: circa 900 m² interni; circa 350 m² di terrazze; sette unità indipendenti, cinque residenziali e due commerciali; alloggi per vacanze in parte delle residenziali; presenza di ristorazione; circa otto alberi di limone di circa settant’anni; circa 200 gradini; concessione stagionale per il pontile; tempi via mare 10/5/10 minuti; pin geografico.

Sono dati forniti, non misure o titoli verificati autonomamente durante questo audit. L’età degli alberi va legata alla data della dichiarazione: non incrementarla automaticamente ogni anno. La frase sugli unici edifici sulla spiaggia compare tra i fatti del committente in REVISIONE-EDITORIALE; va mantenuta nel suo significato fisico senza dedurne proprietà della spiaggia.

### Conferme del proprietario recepite il 9 ottobre 2026

- **Cartiera:** corrisponde a parte dell’edificio. La presenza delle vasche nel sotterraneo e il 1830 sono dati confermati dal proprietario, che indica testi comunali storici e il volume *Le cartiere di Vietri tra Settecento ed Ottocento* di Aniello Tesauro.
- **Vendita:** intera proprietà in blocco, comprese le aree esterne e il limoneto. Il racconto pubblico resta unitario, senza inventari di attività, arredi o diritti.
- **Documenti:** planimetrie, visure catastali, documentazione della concessione e condizioni di vendita disponibili e condivisibili dal proprietario. Non estendere questa conferma a documenti diversi non nominati.
- **Referente:** il proprietario in persona gestisce le risposte e concorda i sopralluoghi. Canale attuale: risposta all’email della presentazione.

Non occorre chiedere di nuovo questi dati. Nome e recapiti da pubblicare, dati per l’informativa, dominio, hosting e grado di protezione del link non sono stati specificati. Prezzo, indirizzo pubblicabile e accesso veicolare diretto restano non indicati: non completarli da siti turistici, Google Maps o CSV commerciali.

### Fonti ricontrollate il 9 ottobre 2026

**Fonte indicata dal proprietario:** Aniello Tesauro, *Le cartiere di Vietri tra Settecento ed Ottocento*, Centro di Cultura e Storia Amalfitana, 2020, con il contributo di Mariandrea Avallone, 205 pp. L’esistenza e i dati bibliografici sono riscontrati nella [pagina dell’editore](https://www.centrodiculturaestoriaamalfitana.it/2020.html). I passaggi del volume e dei testi comunali non sono stati consultati: il loro richiamo non equivale a una verifica autonoma delle singole affermazioni. Non inventare pagine o citazioni.

1. [Marina d’Albori — Carta Amalfitana](https://www.marinadalbori.it/it/blog/carta-amalfitana-storia-cartiere-e-museo-della-tradizione), articolo datato 17 marzo 2026. Riporta una cartiera a Marina d’Albori nel 1830 e la presenza storica di cartiere a Vietri. È una fonte editoriale del sito dell’attività, non indipendente e non un documento sul perimetro di vendita.
2. [Marina d’Albori — Storia del luogo](https://www.marinadalbori.it/it/blog/storia-di-marina-dalbori-cartiera-pescatori-e-alluvione-del-1954), articolo datato 12 febbraio 2026. Offre ulteriore contesto su cartiera e accesso; non dimostra che l’intera proprietà attuale coincida con la cartiera né documenta le vasche nel suo sotterraneo. Due articoli dello stesso dominio non sono due conferme indipendenti.
3. [Regione Campania — Limone Costa d’Amalfi](https://www.agricoltura.regione.campania.it/tipici/limone-amalfi.html), scheda con aggiornamento 29 agosto 2019, recuperata tramite ricerca dopo errore dell’apertura diretta. Sostiene il rapporto fra coltivazione del limone e paesaggio costiero. Non certifica cultivar, IGP, numero, età o produttività degli alberi della proprietà.
4. [Soprintendenza Salerno e Avellino — Villa Comunale di Vietri](https://sabap-saav.cultura.gov.it/2023/03/17/villa-comunale-di-vietri-sul-mare-sa-paesaggio-ceramica-poesia/), 17 marzo 2023, recuperata tramite ricerca dopo timeout diretto. Sostiene il contesto ceramico vietrese; non attribuisce autore, epoca o provenienza alle ceramiche fotografate.
5. [Google Search Central — noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Documenta il controllo dell’indicizzazione e la necessità che il crawler possa leggere la direttiva. Non costituisce un meccanismo di autenticazione.

Una pubblicazione storica trovata nella ricerca, ospitata da SIGEA, non è stata consultata integralmente per limiti di recupero: non è usata come prova. Non introdurre alluvioni, ricostruzioni o altri racconti storici solo perché compaiono nei risultati di ricerca.

## 4. Direzione di tono e layout

### Voce

Una presentazione immobiliare privata, precisa e composta. Valorizzare il luogo attraverso ciò che è dimostrabile: disposizione degli edifici, unità indipendenti, affacci, terrazze, accessi e caratteri fotografati. Frasi attive e concrete, senza slogan o tono turistico.

- Mantenere Marina d’Albori, proprietà, unità indipendenti, spiaggia, terrazze, limoneto. In inglese property, independent units, beach, terraces, lemon garden.
- Evitare luxury, exclusive, trophy, opportunità irripetibile, paradiso, scrigno, porto privato e spiaggia privata; non introdurre rendimenti o promesse di conversione.
- Distinguere usi attuali, letture possibili della composizione e titoli effettivi. Autonomia delle unità non dimostra libertà di cambio d’uso.
- Non trasformare la storia in un elenco di cautele. La ricerca resta nel registro interno; in pagina entra solo il risultato verificato.
- Inglese naturale, coerente con un lettore internazionale, senza calchi dell’italiano. Stesse informazioni, qualifiche e possibilità di contatto in entrambe le lingue.
- La chiusura deve indicare una sola azione concreta: rispondere al mittente. L’attuale formulazione breve è una buona base; non tornare a un paragrafo burocratico.

Registro adottato: «La vendita è seguita direttamente dal proprietario». La chiusura invita a rispondere all’email ricevuta; i tre blocchi dichiarano la disponibilità dei documenti confermati e il sopralluogo concordato con il proprietario. La versione inglese mantiene lo stesso significato.

### Composizione della pagina

Conservare le cinque sezioni e l’identità visiva esistente. La sequenza ha già una logica: capire il bene, vedere gli spazi, riconoscerne il carattere, comprendere gli accessi, proseguire il contatto.

- **Hero:** nome, collocazione, frase descrittiva e fotografia aerea. Rendere immediatamente comprensibile la natura della presentazione di vendita con una dicitura sobria se la Fase 2 rileva ambiguità. Non aggiungere prezzi o badge promozionali.
- **Proprietà:** numeri ben leggibili, composizione 5+2, uso attuale, tre letture sintetiche. Verificare se i due rimandi identici a Informazioni siano entrambi utili.
- **Spazi:** mantenere la progressione terrazze → soggiorni → camere e l’apertura della fotografia completa. Le fotografie sono una selezione, non un inventario delle sette unità.
- **Storia:** un’introduzione e tre blocchi brevi. Le due immagini attuali documentano dettagli degli interni; non presentarle come prova visiva delle vasche o del limoneto.
- **Posizione:** mappa, accesso pedonale e pontile leggibili anche senza WebGL. Tempi marittimi separati dai km in linea d’aria.
- **Informazioni:** azione unica, tre temi di conversazione, privacy raggiungibile. Nessun pulsante che sembri inviare una richiesta se non esiste un invio.

Rifiniture da misurare su un nuovo rendering: spazio prima della prima fotografia su mobile; taglio della hero e della seconda aerea; lunghezza delle righe; spazi verticali; leggibilità delle didascalie; equilibrio della Storia; contrasto e focus nella chiusura scura. Gli screenshot delle sezioni sono ritagli del contenitore: non dedurre da essi margini del viewport mancanti.

## 5. Sequenza di applicazione

Ordine principale: **1 Fatti → 2 Copy → 3 Fotografie → 4 Layout → 5 Contatto e riservatezza → 6 Collaudo → 7 Pubblicazione**. La **Fase 8 commerciale** può iniziare dopo la 1; i materiali devono essere allineati alla brochure finale prima dell’uso.

Le informazioni operative della Fase 5 possono essere raccolte già durante la 1. Un dato mancante non deve fermare tutti i lavori indipendenti: indicare quale specifica pubblicazione o frase resta sospesa. Non eseguire più agenti sullo stesso file contemporaneamente. Le fasi rappresentano ruoli di lavoro, non impongono una delega simultanea.

### Regole comuni per tutti gli agenti

Ogni prompt richiama questo documento. Leggere le istruzioni repository eventualmente presenti, lo stato Git e i file correnti prima di intervenire. Conservare le modifiche del committente. Non assumere che la documentazione più vecchia prevalga sul codice o che un test verde provi un fatto reale. Non inventare conferme, documenti, prezzo, licenze, destinatari o risultati di prove.

Produrre a fine fase: file modificati; decisioni con fonti; controlli effettivamente eseguiti; questioni residue; esito completata/parziale/bloccata e prerequisiti per la fase successiva. Aggiornare un unico docs/STATO-COMPLETAMENTO.md con questi passaggi. Nessuna pubblicazione o comunicazione esterna è autorizzata dalla sola lettura di questo piano.

## Fase 1 — Consolidare fatti, fonti e decisioni

**Priorità:** necessaria prima della riscrittura. **Ruolo:** ricercatore editoriale e responsabile dei dati.

**Risultato:** un registro in docs/REGISTRO-FATTI.md con affermazione, origine, data, grado di conferma, uso consentito e punto ancora aperto; decisioni cartiera/vasche, tempi, usi e contatto registrate in modo univoco.

**Chiusura:** nessuna affermazione controversa viene promossa a fatto verificato per deduzione. Le sole questioni che richiedono il proprietario sono raccolte in un’unica richiesta breve. I testi non dipendenti da esse possono avanzare.

**Prompt pronto:**

~~~text
Lavora nel repository estate come responsabile dei fatti. Esegui solo la Fase 1 di docs/PIANO-COMPLETAMENTO.md e le sue regole comuni.

Leggi README.md, docs/FINALIZZAZIONE.md, docs/REVISIONE-EDITORIALE.md, property.ts, brochure.ts, geography.ts, images.ts, jsonld.ts e i test. Controlla la cronologia pertinente prima di dedurre che una differenza sia un errore.

Completa docs/REGISTRO-FATTI.md, già avviato con le conferme del proprietario: per ogni affermazione pubblicata registra origine precisa, data della conferma o della consultazione, stato (fornito dal committente, riscontro documentale, osservabile in foto, contesto pubblico, irrisolto), formulazione ammessa e limite. Non spacciare supplied per verifica indipendente.

Cartiera, vasche, vendita in blocco, disponibilità documentale e referente sono già confermati nel registro: applicali senza riproporre le domande. Esamina le divergenze ancora aperte sui 10/5/10 minuti senza qualifica e sulla nota degli usi. Il contatto attuale è diretto con il proprietario via risposta all’email; il form resta una possibilità futura. Non tornare ai testi precedenti alle conferme.

Verifica online solo le fonti pertinenti, privilegiando quelle primarie per fatti pubblici. Una fonte sul luogo non prova proprietà, metrature o titoli. Non usare i CSV come fonte del prezzo. Raggruppa le poche conferme realmente mancanti e continua il lavoro indipendente. Una domanda non risposta rimane aperta.

Non riscrivere ancora il sito o i test. Aggiorna docs/STATO-COMPLETAMENTO.md e registra esiti e dipendenze. Aggiorna nei vecchi piani solo i rimandi necessari a distinguere storico e piano operativo; non cancellare la cronologia.
~~~

## Fase 2 — Posizionamento e copy definitivo IT/EN

**Dipende da:** registro della Fase 1; questioni fattuali risolte oppure esplicitamente escluse dalla pubblicazione.

**Ruolo:** editor immobiliare bilingue. **Risultato:** un’unica voce in pagina, metadati, anteprime e dati strutturati.

**Chiusura:** chi legge comprende bene, composizione, accessi e prossimo passo. Nessun aumento della forza di una promessa nel passaggio IT→EN o dal testo al JSON-LD.

**Prompt pronto:**

~~~text
Esegui solo la Fase 2 di docs/PIANO-COMPLETAMENTO.md, applicando le regole comuni e docs/REGISTRO-FATTI.md. Il prodotto è una brochure privata di vendita per acquirenti e advisor selezionati. Parti dai testi correnti, senza ricopiare i prompt editoriali storici.

Finalizza src/content/brochure.ts in italiano e inglese: hero, composizione, usi attuali, tre letture, Spazi, Storia, Posizione e Informazioni. Mantieni cinque sezioni, superfici approssimate e distinzione tra dati disponibili e documenti da richiedere. Rendi riconoscibile la finalità di vendita con una formulazione sobria se oggi è ambigua.

Mantieni le conferme già applicate su cartiera limitata a parte dell’edificio, vasche, vendita dell’intera proprietà, documenti disponibili e contatto diretto con il proprietario. Applica le ulteriori decisioni della Fase 1 su tempi e nota sugli usi. Se una conferma manca, non rafforzare il claim: registra la frase sospesa o usa soltanto il fatto già sostenuto dalla fonte. Non cancellare una conferma recente perché un vecchio documento era più prudente.

Mantieni il tono concreto indicato nel piano, senza linguaggio turistico o superlativi. La chiusura indica il canale email in modo breve. Riduci duplicazioni, non informazioni utili. Italiano e inglese devono avere lo stesso significato anche per qualifiche, stagionalità e possibilità d’uso.

Aggiorna property.ts solo in conseguenza di decisioni documentate; messages.ts solo dove l’interfaccia deve allinearsi. Tocca page.tsx soltanto per il montaggio di un campo necessario. Nessun redesign, nuova route, foto aggiuntiva o form.

Allinea metadati, OG e JSON-LD. Rivedi i test che cristallizzano claim o parole sbagliate: devono proteggere fatti e qualifiche, senza imporre inutilmente una frase letterale. Esegui npm test, npm run lint e npm run typecheck. Registra le scelte e l’esito nello stato di completamento.
~~~

## Fase 3 — Fotografie, didascalie e fedeltà visiva

**Dipende da:** Fasi 1–2. **Ruolo:** photo editor per documentazione immobiliare.

**Risultato:** dodici immagini coerenti, correttamente descritte e visualizzate; eventuali fotografie mancanti richieste in modo mirato.

**Chiusura:** nessuna immagine dimostra più di ciò che mostra; soggetti importanti leggibili nei tagli desktop/mobile; selezione e ordine identici in pagina e dati strutturati.

**Prompt pronto:**

~~~text
Esegui solo la Fase 3 di docs/PIANO-COMPLETAMENTO.md. Leggi il registro dei fatti e ispeziona visivamente ogni fotografia pubblicata prima di cambiarne alt, didascalia o ritaglio.

Controlla public/images/property, src/content/images.ts, brochurePhotos, brochurePhotoGroups, brochurePhotoIds, Photo e Gallery. Il canone iniziale resta di dodici foto, con sette immagini nella galleria Spazi. Verifica esplicitamente le aeree 01_new.jpg e 02_new.jpg, le due terrazze e l’immagine della scala. Conserva gli identificatori tecnici stabili.

Per ogni foto verifica soggetto, dimensioni reali, nitidezza, peso, object-position, pertinenza del testo e corrispondenza IT/EN. Non attribuire le immagini a una specifica unità catastale senza una mappatura fornita. Non presentare mosaici e cucina come prove delle vasche o del limoneto. Registra provenienza e diritti d’uso se disponibili; non dedurli dal nome del file.

Preserva le fotografie reali: niente generazione di ambienti, rimozione di edifici o elementi strutturali, ampliamento artificiale di vedute. Se mancano foto documentarie utili, indica esattamente quale scatto chiedere e perché; non sostituirlo con un’immagine inventata. Ottimizzazioni solo preservando gli originali: lo script optimize:photos attuale può cancellare sorgenti.

Correggi soltanto mapping, alt, didascalie, ritagli e ottimizzazioni giustificate. Verifica l’apertura dell’intera immagine nella galleria e la corrispondenza con JSON-LD. Aggiorna il README fotografico e lo stato di completamento; esegui i test immagini e quelli editoriali pertinenti.
~~~

## Fase 4 — Rifinitura del layout e dell’esperienza

**Dipende da:** copy e selezione fotografica stabilizzati. **Ruolo:** designer frontend.

**Risultato:** una brochure equilibrata su desktop, tablet e telefono, verificata sulla build corrente.

**Chiusura:** nessun contenuto tagliato o scroll orizzontale; navigazione e galleria utilizzabili da tastiera; layout leggibile in entrambe le lingue e con testo ingrandito.

**Prompt pronto:**

~~~text
Esegui solo la Fase 4 di docs/PIANO-COMPLETAMENTO.md. Prima apri la versione locale corrente IT/EN e acquisisci una baseline nuova: gli screenshot preesistenti hanno copy diverso dal codice attuale.

Rifinisci src/app/[locale]/page.tsx, globals.css e i componenti visivi necessari, preservando cinque sezioni, palette carta/mare, Fraunces/Outfit e fotografie canoniche. Non introdurre un redesign, animazioni decorative, video automatici, nuove librerie UI o sezioni commerciali aggiuntive.

Controlla a 1440, 820, 390 e 320 px: spazio occupato dalla hero prima della foto, ritaglio delle aeree, gerarchia dei numeri, leggibilità 5+2, lunghezza delle righe, spazi tra sezioni, galleria, Storia, accessi e chiusura. Verifica se mantenere entrambi i link identici a Informazioni. Ogni modifica deve risolvere un problema osservato; non comprimere tutta la pagina per ridurre gli scroll.

Controlla menu, cambio lingua con hash preservato, sticky header, salti alle sezioni, skip link, focus visibile, Escape e ritorno del focus della galleria, target touch, zoom del testo e reduced motion. Verifica mappa reale e fallback senza rete/WebGL; accessi e link alla posizione devono restare leggibili anche con mappa indisponibile.

Non cambiare fatti per farli entrare nel layout. Eventuali accorciamenti del copy devono preservare il significato IT/EN e risultare nel registro delle decisioni. Non eliminare CSS storico senza averne controllato l’uso nelle pagine ancora esistenti.

Consegna screenshot nuovi prima/dopo per i cambi significativi, test pertinenti, lint e typecheck; aggiorna docs/STATO-COMPLETAMENTO.md indicando viewport, lingua, versione e difetti risolti.
~~~

## Fase 5 — Contatto, privacy e grado di riservatezza

**Dipende da:** decisione operativa del committente e dati del referente. **Ruolo:** responsabile del percorso di contatto e implementatore.

**Scelta proposta:** mantenere la risposta all’email come percorso finale. È coerente con la distribuzione personale già prevista e non richiede di riaprire il form. L’eventuale form è una variante da scegliere esplicitamente, non una condizione automatica per completare la brochure.

**Chiusura:** il canale descritto corrisponde al funzionamento reale; referente e informativa sono definiti; è documentato cosa accade se il link viene inoltrato.

**Prompt pronto:**

~~~text
Esegui solo la Fase 5 di docs/PIANO-COMPLETAMENTO.md. Leggi lo stato delle decisioni prima di chiedere dati già forniti. Prepara il percorso operativo effettivamente scelto dal committente.

Percorso consigliato: brochure condivisa tramite email personale e risposta al mittente. In questo caso non aggiungere un form: conserva API 503 e assenza di false conferme. Allinea Informazioni, privacy, README e FINALIZZAZIONE perché il form non figuri più come prerequisito del rilascio. Il proprietario segue già personalmente richieste e sopralluoghi: non cercare un intermediario. Definisci soltanto come gestire un link inoltrato senza l’email originaria. Non recuperare contatti del ristorante per trasformarli in contatti della vendita.

Raccogli i dati effettivi del responsabile del sito e del trattamento; verifica hosting, log, risorse cartografiche ed eventuali altri servizi caricati nel browser. Redigi l’informativa sulla configurazione reale, verificando le fonti normative ufficiali pertinenti al momento dell’esecuzione. Non inserire identità, basi, tempi di conservazione o consensi inventati. Non dichiarare compliance solo perché esiste una pagina privacy.

Documenta la scelta tra link non indicizzato accessibile a chi lo possiede e accesso autenticato. Non implementare un login se non richiesto. Se è scelto l’accesso protetto, verifica anche risorse, immagini e comportamento delle anteprime; nessuna anteprima deve aggirare la protezione scelta.

Solo se il committente ha scelto esplicitamente il form: realizza UI, validazione lato server, servizio di invio, protezioni dall’abuso ed errori veritieri. Verifica accettazione del provider e, separatamente, ricezione nella casella autorizzata. INQUIRY_ENDPOINT da solo non abilita l’API attuale. Gli invii di prova a persone richiedono una specifica istruzione, non sono autorizzati da questo piano.

Concludi con configurazione pronta, dati ancora mancanti e verifiche effettive. Nessun deploy o outreach in questa fase.
~~~

## Fase 6 — Collaudo completo della versione candidata

**Dipende da:** Fasi 1–5 implementate. **Ruolo:** QA editoriale, visivo e tecnico.

**Risultato:** una versione identificata e un rapporto ripetibile in docs/VERIFICA-RILASCIO.md.

**Chiusura:** nessun errore bloccante noto, nessun claim sospeso pubblicato, prove eseguite sul codice che verrà distribuito. Un impedimento di rete si registra come prova non eseguita, non come successo.

**Prompt pronto:**

~~~text
Esegui solo la Fase 6 di docs/PIANO-COMPLETAMENTO.md. Riesamina il sito con il registro dei fatti e le decisioni operative, senza fidarti del vecchio report o soltanto dei test testuali.

Esegui npm test, npm run lint, npm run typecheck e npm run build. Avvia la build di produzione localmente ed esegui npm run test:browser. Non usare una build preesistente senza verificarne corrispondenza al sorgente. Lo script browser richiede la mappa realmente caricata e Chrome: documenta dipendenze e impedimenti concreti.

Verifica entrambe le lingue, cinque sezioni, dodici immagini, sette immagini in galleria, keyboard/focus, menu, cinque hash del cambio lingua, quattordici redirect, privacy, 404, OG, metadati, JSON-LD, sitemap e API nel comportamento concordato. Aggiungi ai controlli esistenti solo regressioni significative: qualifiche dei tempi, decisione cartiera/vasche, nessuna promessa implicita sugli usi, e fallback della mappa. Se è stato scelto il form, aggiorna gli assert che richiedono assenza del form e 503 secondo il nuovo contratto.

Rileggi visivamente IT/EN a 1440, 820, 390 e 320 px; prova tastiera e zoom del testo. Misura il caricamento mobile delle immagini e della mappa e annota strumento, condizioni e risultati reali; non dichiarare Core Web Vitals di campo sulla base di una singola simulazione. Verifica console e richieste fallite.

Aggiungi al report browser data, commit, stato del working tree, versione build e origine verificata. Salva screenshot nuovi e redigi docs/VERIFICA-RILASCIO.md con risultati, errori risolti, residui e decisione pronta/non pronta. Se modifichi codice per un difetto, ripeti i controlli interessati e ricrea la build finale. Non pubblicare.
~~~

## Fase 7 — Pubblicazione e passaggio di gestione

**Dipende da:** collaudo concluso, dominio/hosting disponibili, decisioni contatto/privacy risolte e istruzione di pubblicare.

**Ruolo:** responsabile del rilascio. **Risultato:** URL HTTPS definitivo verificato e procedura di gestione documentata.

**Chiusura:** origine corretta in tutti i link assoluti e metadati; accesso conforme alla scelta; referente operativo; rollback e manutenzione definiti. La pubblicazione da sola non invia la brochure a nessuno.

**Prompt pronto:**

~~~text
Esegui la Fase 7 di docs/PIANO-COMPLETAMENTO.md applicando le regole comuni. Leggi docs/VERIFICA-RILASCIO.md e verifica che si riferisca alla versione da distribuire.

Completa la preparazione del rilascio: hosting/account autorizzato, dominio HTTPS, NEXT_PUBLIC_SITE_URL, variabili richieste dal canale scelto, build e configurazione di accesso. Il repository contiene vercel.json, ma questo non prova che account e dominio siano già decisi. Non scegliere servizi a pagamento o domini per deduzione.

Controlla che canonical, hreflang, OG, manifest e JSON-LD usino l’origine finale e non localhost o una preview. Mantieni noindex/nofollow e sitemap secondo la decisione della Fase 5; non trasformare il progetto in un sito SEO pubblico. Verifica anteprime e riservatezza insieme, senza esporre dati per far funzionare un crawler.

Se l’incarico corrente comprende la pubblicazione e i prerequisiti sono completi, esegui il deploy sull’account indicato. In assenza dell’istruzione di pubblicare, prepara un rilascio concreto e revisionabile e indica l’unico passaggio rimasto. Non chiedere di nuovo autorizzazioni già date.

Sull’origine definitiva ripeti smoke test IT/EN, hash, redirect, foto, mappa/fallback, privacy, OG, 404 e contatto. Per eventuali invii di prova usa soltanto destinatari e azioni autorizzati. Documenta versione, data, URL, configurazione senza segreti e modalità di rollback.

Aggiorna README, FINALIZZAZIONE e STATO-COMPLETAMENTO: separa ciò che è completato da eventuali estensioni future. Definisci chi aggiorna fatti, fotografie, concessione e contatto. Non inviare email commerciali in questa fase.
~~~

## Fase 8 — Preparare il materiale commerciale allineato alla brochure

**Dipende da:** fatti consolidati; versione definitiva per completare testi e link. **Ruolo:** ricercatore commerciale e editor delle comunicazioni.

**Perimetro:** utile perché il repository comprende già prospect e relativi script. Non è un requisito tecnico per pubblicare la brochure; serve a completare il suo impiego commerciale.

**Risultato:** destinatari selezionati con motivazione e fonti attuali, bozze IT/EN e procedura di risposta. Nessun invio automatico.

**Prompt pronto:**

~~~text
Esegui solo la Fase 8 di docs/PIANO-COMPLETAMENTO.md. Leggi il registro dei fatti e la brochure finale. Ispeziona data/real-estate-prospects e gli script che generano e verificano quei file. I CSV sono materiale di ricerca, non un elenco già autorizzato per invii.

Controlla fonti ufficiali correnti, identità aziendale, ruolo e recapito pubblicato, pertinenza rispetto a immobili in Italia e natura del destinatario: potenziale acquirente, intermediario o advisor. Mantieni separati fatti verificati e valutazioni di fit. Non inventare email personali o dedurre un mandato di acquisto da un generico interesse per il lusso. Non trattare last_verified o fit_score come prove autonome.

Deduci una shortlist motivata dai dati reali, senza riempire una quota prefissata. Deduplica gruppi e sedi mantenendo i casi di team distinti documentati. Conserva fonti, data e motivo di inclusione/esclusione. Le esclusioni già presenti non vanno reinserite automaticamente; eventuali vincoli normativi si verificano su fonti ufficiali aggiornate prima dell’uso.

Non trasformare €6M–€12M, presente in alcune note di compatibilità dei prospect, nel prezzo della proprietà. Nessun rendimento, disponibilità documentale o trasferibilità di licenze va aggiunto alle email se non confermato nel registro.

Prepara in docs/MATERIALI-COMMERCIALI.md: breve presentazione IT/EN, oggetto sobrio, versione per advisor e per acquirente, una bozza di seguito, risposte alle richieste tipiche di documenti e sopralluogo, passaggio delle risposte al referente. Usa l’URL finale solo quando esiste; niente dominio inventato. Allinea tono, numeri, storia e qualifiche alla brochure.

Consegna shortlist e bozze revisionabili e registra quali fonti sono state verificate. Non inviare, programmare messaggi, caricare contatti in un CRM o contattare terzi: ciascuna di queste azioni richiede un’istruzione specifica successiva.
~~~

## 6. Dati già acquisiti e aspetti operativi residui

Cartiera e vasche, vendita dell’intera proprietà comprese le aree esterne, disponibilità dei quattro gruppi di documenti e gestione personale di risposte e visite sono confermati. Non riaprire la raccolta di questi dati e non richiedere un inventario pubblico dei singoli beni.

Per il rilascio restano:

1. **Pubblicazione:** dominio HTTPS, account hosting e scelta tra link non indicizzato e accesso protetto.
2. **Informativa:** dati identificativi e recapito effettivo necessari, insieme alla configurazione dei servizi. Sapere che il referente è il proprietario non fornisce automaticamente questi dettagli.
3. **Link inoltrati:** percorso da mantenere per chi riceve il link senza l’email originaria.
4. **Fotografie:** eventuali conferme sulla provenienza e sull’uso, se non già disponibili.

Prezzo, indirizzo e altri dati non destinati alla brochure possono restare assenti. La consultazione puntuale del volume di Tesauro può completare l’archivio interno senza rimettere in discussione le conferme del proprietario. Non pubblicare documenti riservati nel repository o nella cartella public.

## 7. Definizione concreta di progetto completato

### Brochure pronta e pubblicata — Fasi 1–7

- [ ] Fatti e fonti registrati; discrepanze cartiera/vasche, tempi e usi risolte.
- [ ] Perimetro della presentazione coerente con ciò che si propone in vendita.
- [ ] Copy IT/EN definitivo, equivalente e senza affermazioni non sostenute.
- [ ] Foto reali, didascalie fedeli, tagli verificati e canone condiviso con JSON-LD.
- [ ] Layout, accessibilità pratica, navigazione, galleria e mappa verificati sulla versione corrente.
- [ ] Canale di contatto reale, referente e informativa definiti.
- [ ] Scelta di riservatezza documentata e implementata.
- [ ] Test, lint, tipi, build e verifiche browser superati con evidenze identificabili.
- [ ] HTTPS e origine definitiva configurati; controlli in produzione riusciti.
- [ ] README e piani senza istruzioni contraddittorie; gestione e rollback assegnati.

### Materiale commerciale pronto — Fase 8

- [ ] Shortlist verificata di recente e motivata, senza contatti duplicati o inventati.
- [ ] Bozze IT/EN coerenti con la brochure e con il referente reale.
- [ ] Nessuna fascia prospect scambiata per prezzo della proprietà.
- [ ] Invii esterni ancora separati dalla preparazione e soggetti a istruzione specifica.

Una volta soddisfatti questi criteri si chiude il progetto di realizzazione. Aggiornamenti a dati, disponibilità, titoli, fotografie e destinatari diventano manutenzione ordinaria, senza riaprire ogni volta tono e layout.
