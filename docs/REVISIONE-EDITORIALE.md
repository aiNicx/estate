# Revisione editoriale — Marina d’Albori

Piano in tre fasi per correggere voce, luogo e storia della brochure. Ogni fase ha un prompt da eseguire per intero, da sola, prima di passare alla successiva. Non mescolare le fasi: la prima sistema come si parla dell’asset, la seconda rende leggibile il sito, la terza completa la storia senza inventare.

## Obiettivo del progetto

Resta quello di [FINALIZZAZIONE.md](FINALIZZAZIONE.md): brochure privata di vendita, link via email a interessati e advisor selezionati. Una pagina per lingua (`/it`, `/en`), cinque sezioni. Deve rendere leggibili **composizione, carattere, usi possibili e passo successivo**, senza promesse economiche e senza fatti non fondati.

Il lettore non è un turista del ristorante. È un possibile acquirente, un family office o un advisor. Il tono è quello di una nota di proprietà off-market: preciso, composto, senza inviti, senza slogan, senza chiedere al lettore di “valutare” a ogni paragrafo.

## Perché queste tre fasi

Dal sito oggi non si capisce che Marina d’Albori è **una spiaggia** e che **gli edifici su quella spiaggia sono quelli di questa proprietà**. Non si capisce l’accesso da terra (scalinata di circa 200 gradini, tipica della Costiera) né l’arrivo via mare (pontile stagionale in concessione). La storia è un abbozzo. Intanto il copy chiede troppo, invita troppo e usa “cala” in modo ripetuto.

Se si riscrive tutto insieme si mescolano tre lavori diversi: registro, fatti di luogo, ricerca storica. Meglio in quest’ordine:

1. **Voce dell’asset** — togliere cala/invito, descrivere l’uso, riformulare i tre scenari, chiudere da privati.
2. **Il luogo** — spiaggia, unicità degli edifici, scalinata, pontile e tempi di navigazione.
3. **La storia** — cartiera, limoneto, ceramiche, con fonti e senza invenzioni.

## Principi che restano in tutte le fasi

- Fonte unica del racconto: `src/content/brochure.ts`. Interfaccia e privacy: `src/content/messages.ts`. Fatti: `src/content/property.ts`. Didascalie e alt: `src/content/images.ts`.
- Italiano e inglese equivalenti per struttura e senso. Apostrofo: **d’Albori**.
- Superfici indicative (≈ 900 m², ≈ 350 m²). Sette unità, cinque residenziali, due commerciali.
- Cartiera del 1830 **associata / legata** alla proprietà, non inclusa nella vendita finché i documenti non lo dicono.
- Nessun prezzo, nessun rendimento, nessun form, nessun contatto pubblico (telefono, WhatsApp, email del ristorante).
- Non copiare il sito del ristorante ([marinadalbori.it](https://www.marinadalbori.it/it)): menu, prezzi, orari, “esperienza”, “anima della Costiera”, chef, “case vacanza” da booking.
- Non usare: exclusive, luxury, lusso, trophy, one-of-a-kind, irripetibile, cap rate, occupancy, yield, private harbour, porto privato, year-round, ferry, cala esclusiva, spiaggia privata, spiaggia esclusiva.
- Non aggiungere sezioni, route, form, foto. Non cambiare layout se il copy entra nello schema attuale.
- Due diligence: **una sola nota** in fondo agli usi, più la sezione Informazioni. Non in ogni card.
- Id tecnici (`hero-cove-aerial`, keyword di file `cala`/`cove`) possono restare. Il copy visibile no.

## Fatti nuovi del committente

Questi fatti **sostituiscono** le cautele precedenti su gradini sconosciuti e “nessuna stima di viaggio”, ma **solo** per quanto elencato qui.

| Fatto | Come scriverlo | Come non scriverlo |
| --- | --- | --- |
| Marina d’Albori è una spiaggia; gli edifici su quella spiaggia sono questa proprietà | Fatto geografico, tono piano | Exclusive, unica al mondo, unica spiaggia della costa, spiaggia privata |
| Dalla strada si scende con una scalinata di 200 gradini, tipica della Costiera | Circa 200 gradini; carattere del luogo | Ostacolo, scomodo, da valutare in visita, 250/280 (fonti turistiche discordanti) |
| Concessione per pontile stagionale; arrivo via mare | Concessione stagionale; tempi **indicativi** | Porto privato, traghetto, accesso annuale garantito, transfer del ristorante |
| Tempi indicativi di navigazione | 10 min dal porto di Salerno, 5 min da Vietri, 10 min da Cetara | I 3 minuti da Marina di Vietri citati dalla stampa; minuti mescolati ai km in linea d’aria |

Accesso veicolare agli edifici: resta sconosciuto. Perimetro di vendita, planimetrie, titoli e termini della concessione: restano da chiedere in privato, non da dichiarare già in pagina.

---

## Fase 1 — Voce dell’asset

**Stato:** da eseguire per prima.  
**Obiettivo:** la brochure parla da nota di proprietà, non da invito. Il lettore capisce *che tipo di insediamento è*, senza essere mandato a “valutare” o a compilare la risposta.

### Cosa corregge

1. **Cala / cove** — termine rifiutato. In tutto il copy pubblicato (brochure, gallery title, alt, didascalie) usare spiaggia, mare, fronte mare, Marina d’Albori. In inglese: beach, waterfront, sea, Marina d’Albori. Non sostituire con sinonimi di cala (caletta, insenatura, cove).
2. **Invito** — “invita a considerare” è brochure-speak. L’intro descrive la composizione, non chiede di immaginare.
3. **Uso attuale** — oggi non descrive e chiude in cattivo gusto (“per valutarne la gestione…”). Deve dire cosa c’è ora. La gestione sta nella nota unica e in Informazioni.
4. **Tre letture** — restano, perché sette unità indipendenti (5+2) con accoglienza e ristorazione già presenti *sono* il dato da decodificare. Cambia il taglio: conseguenze della composizione, non menu di ipotesi da esaminare. Togliere family office dalla card: è un destinatario della brochure, non un uso.
5. **Chiusura** — oggi è poco professionale (“puoi chiedere”, “nella risposta indica…”). Il canale resta la risposta all’email. Il testo assume un interlocutore già in rapporto.

### Prompt — Fase 1

```
Sei l’editor della brochure privata di vendita di Marina d’Albori (repo estate). Esegui SOLO la Fase 1. Non toccare ancora i 200 gradini, i tempi via mare, né la sezione Storia oltre al lessico cala/cove. Non inventare fatti.

OBIETTIVO
Una nota off-market per acquirente, advisor o family office. Composizione e usi leggibili, tono composto. Niente inviti, niente slogan, niente “da valutare” ripetuto.

FILE DA MODIFICARE
- src/content/brochure.ts (copy IT/EN: meta, hero, property, spaces.groups.terrazze, information)
- src/content/messages.ts (gallery.title IT/EN)
- src/content/images.ts (alt e caption pubblicati che dicono cala/cove; NON rinominare gli id; le FILE_KEYWORDS cala/cove possono restare)
- test che fissano il copy vecchio in src/content/brochure.test.ts e, se falliscono, gli assert di forma in property.test.ts
Non modificare page.tsx, CSS, foto, geography.ts, property.ts in questa fase. Non riattivare componenti morti (facts.ts, CoveDiagram, form).

LESSICO
Banditi nel copy visibile: cala, caletta, cove, invita, invito, “puoi chiedere”, “da valutare”, “da approfondire sul posto”, “ipotesi da esaminare”, “punto di partenza per un operatore” come refrain.
Preferiti: spiaggia, mare, fronte mare, Marina d’Albori, versante, unità indipendenti; EN: beach, waterfront, sea, hillside, independent units.
Titoli: “fronte cala” / “on the cove” → formulazioni su spiaggia / waterfront / Marina d’Albori, senza superlativi.

1) INTRO PROPRIETÀ (niente “invito”)
Oggi: gli edifici seguono il versante fino alla cala; la composizione invita a considerare.
Direzione: gli edifici scendono il versante fino alla spiaggia di Marina d’Albori, nel comune di Vietri sul Mare. Le unità indipendenti tengono insieme gli spazi per abitare, quelli per gli ospiti e le attività già presenti.
Non anticipare ancora “gli unici edifici sulla spiaggia”: è Fase 2. Non ripetere i numeri 7/5/2: sono già nella griglia accanto.

2) USO ATTUALE (descrivere, non giudicare)
Oggi apre bene (“Parte delle unità residenziali…”) e rovina chiudendo sulla valutazione della gestione.
Mantieni un attacco analogo (i test agganciano “Parte delle unità residenziali” / “Some residential units”) e ferma il testo sui fatti: parte delle residenziali è alloggio per vacanze; è presente un’attività di ristorazione. Sono gli usi in essere. Niente “documenti delle attività”, niente “visita per valutarne la gestione”. Quel rinvio sta già in possibilitiesNote e in #informazioni.
Non nominare il brand del ristorante, menu, coperti, licenze, trasferibilità.

3) TRE LETTURE — taglio da esperto del settore
Non eliminare le tre card: la composizione (unità indipendenti, residenziale + commerciale, accoglienza e ristorazione già presenti) è ciò che un lettore sofisticato deve capire. Non è un business plan e non è un quiz.
Titolo: non “Tre modi di leggere la proprietà” (laboratorio). Meglio qualcosa come “Residenza, attività, uso misto” / “Residence, hospitality, mixed use”, o “La composizione” se il titolo-elenco suona ancora da menu. Stessa struttura HTML (tre item).
Ogni card DESCRIVE una conseguenza già inscritta negli edifici. Nessun “da valutare”, “da approfondire”, “ipotesi”. Family office/advisor fuori dalle card.
Direzione di senso, non da copiare alla lettera se trovi una linea più secca:
- Residenza. Insediamento sul mare già articolato in unità distinte: si abita come casa di famiglia, con alloggi separati per gli ospiti, senza unire gli edifici.
- Accoglienza e ristorazione. Alloggi per vacanze e ristorazione sono già esercitati. Non è una residenza da convertire: è un insediamento che comprende anche queste attività. Continuità, affidamento o riorganizzazione restano sui titoli — e questo si dice UNA volta nella nota sotto, non nella card.
- Uso misto. Occupazione personale e attività possono stare nello stesso perimetro perché le unità sono già autonome. È la lettura più naturale per una proprietà di questa composizione sulla costa, non un’opzione esotica.
Mantieni possibilitiesNote (documenti tecnici, urbanistici, catastali, concessori; cambi d’uso e autorizzazioni). È l’unico caveat. Il link “Documenti, condizioni e visita” può restare.

4) CHIUSURA (#informazioni)
Canale invariato: risposta all’email con cui è arrivato il link. Nessun form, nessun mailto, nessun telefono.
Togli il registro da helpdesk (“puoi chiedere”, “nella risposta indica l’uso, i documenti, il periodo”).
Titolo: più procedurale che narrativo. Esempi di registro: “Documenti, condizioni, visita” / “Documents, terms, viewing”. Non “Dalla presentazione alla visita”.
Intro: questa presentazione è riservata; documenti disponibili, condizioni di vendita e sopralluogo si concordano rispondendo a chi ha inviato il link.
I tre topic restano come ordine della conversazione (proprietà e documenti; attività, concessione, condizioni; visita), formulati come contenuti di quel passaggio, non come istruzioni al lettore.
Chiudi senza compiti per casa. Al massimo una riga che conferma il canale.

5) HERO, META, SPAZI, GALLERY
Allinea lead, title, description, imageKicker al nuovo lessico (spiaggia/waterfront, non cala/cove).
Didascalia terrazze: affaccio sulla spiaggia / sul mare, non sulla cala.
Gallery title: non “Dalla cala / From the cove”.

VINCOLI
- IT e EN isomorfi (stesse chiavi, stessa lunghezza d’uso).
- possibilitiesNote resta sostanziosa; i test cercano urbanistica/catastale/concessoria e planning/cadastral/concession.
- information.intro deve ancora contenere “email”.
- Vietati i termini già in brochure.test.ts (exclusive, luxury, lusso, ferry, porto privato, cala esclusiva, ecc.). Aggiungi un assert che nel copy visibile non compaiano \bcala\b / \bcove\b (esclusi id e keyword di file).
- Non pubblicare via, CAP, telefono, email del ristorante.

VERIFICA
npm test && npm run lint && npm run typecheck
Controlla /it e /en: hero, #proprieta (intro, uso, tre card, nota), didascalie, titolo galleria, #informazioni. Nessuna cala/cove visibile. Nessun “invito”. L’uso attuale descrive. Le card non chiedono di valutare. La chiusura è da privati.
Non commitare.
```

### Criteri di accettazione — Fase 1

- Nessuna “cala” / “cove” visibile in pagina, OG, alt, didascalie.
- Intro proprietà senza invito; uso attuale senza richiesta di valutazione.
- Tre card: conseguenze della composizione; una sola nota legale sotto.
- Informazioni: canale email, tono procedurale, niente istruzioni su cosa scrivere.
- Test verdi.

---

## Fase 2 — Il luogo: spiaggia, scalinata, mare

**Stato:** dopo la Fase 1.  
**Obiettivo:** dalla pagina si capisce *dove* si è. Marina d’Albori non è un toponimo vago: è la spiaggia su cui sorge questa proprietà, con due arrivi (terra e mare).

### Cosa corregge

Oggi `#posizione` parla di Costiera, Vietri, Cetara e di un percorso a gradini “da valutare in visita”. Manca l’essenziale:

- gli edifici sulla spiaggia di Marina d’Albori sono quelli di questa proprietà;
- da terra si scende dalla strada con una scalinata di circa 200 gradini, tipica della Costiera;
- via mare: pontile in concessione stagionale; tempi indicativi 10 min porto di Salerno, 5 min Vietri, 10 min Cetara.

I km in linea d’aria (stazione, aeroporti) restano dov’è: griglia di viaggio, qualificati come linea d’aria. I minuti via mare stanno nel blocco del pontile, non mescolati ai km.

### Prompt — Fase 2

```
Sei l’editor della brochure privata di Marina d’Albori. La Fase 1 (voce, niente cala/invito) è già fatta. Esegui SOLO la Fase 2: rendere il LUOGO leggibile. Non allargare la Storia oltre quanto serve a una frase di contesto geografico. Non inventare.

OBIETTIVO
Un lettore che apre /it o /en deve capire tre cose senza inferenze:
1. Marina d’Albori è una spiaggia; gli edifici su quella spiaggia sono questa proprietà.
2. Da terra: scalinata di circa 200 gradini dalla strada, tipica della Costiera.
3. Da mare: pontile in concessione stagionale; tempi indicativi di navigazione 10 min dal porto di Salerno, 5 min da Vietri, 10 min da Cetara.

NUOVI FATTI (committente). Aggiorna i dati strutturati, non solo il prosa.
- property.landAccess.stepCount: 200 (non più null). In copy: “circa 200” è lecito; non scrivere 250 o 280.
- property.landAccess resta pedonale dalla strada; vehicularAccessToBuildings resta null.
- Aggiungi in property.ts i tempi via mare come fatti supplied, qualificati “indicative” / “approximately”, distinti dalla geografia haversine. Non creare un pin del porto di Salerno. Non derivare i minuti dai km.
- geography.ts access.land.stepCount continuerà a leggere property; aggiorna i test.

DOVE SCRIVERLO
- property.intro (e se serve location.intro): una frase chiara che gli edifici sulla spiaggia di Marina d’Albori sono quelli di questa proprietà. Non “unica spiaggia”, non “spiaggia privata”, non exclusive. Intorno ci sono altre spiagge (Schiarata, Fuenti): non negarle e non nominarle se non servono.
- location.land: dalla strada statale si scende a piedi per una scalinata di circa 200 gradini, tipica della Costiera, fino agli edifici e alla spiaggia. Tono di carattere del luogo, non di limite. TOGLI “da valutare durante la visita” / “assess during a visit” da questo blocco: i test attuali lo esigono e vanno RISCRITTI. La visita resta in #informazioni.
- location.sea: concessione stagionale per il pontile, per l’arrivo via mare. Poi i tre tempi indicativi (porto di Salerno 10, Vietri 5, Cetara 10). Una riga che termini e durata della concessione sono nei documenti — senza farne il tema del paragrafo. Vietato: porto privato, traghetto, ferry, year-round, accesso garantito, transfer, 3 minuti.
- Hero/lead può allinearsi (proprietà sulla spiaggia di Marina d’Albori) senza ripetere tre volte l’unicità.
- Topic visita in #informazioni: si visita per leggere spazi e percorso a scale, non per “scoprire se i gradini esistono”.
- Didascalia della foto scale (path-stairs-sea): verso la spiaggia / the beach, coerente con Fase 1.

PAGINA
Non aggiungere componenti. I minuti stanno nel paragrafo del pontile (o in tre righe di prosa). Non inserirli nella dl dei km in linea d’aria. Non cambiare la mappa.

TEST DA AGGIORNARE (oggi contraddicono questa fase)
src/content/geography.test.ts:
- stepCount non è più null: aspettati 200 da property e access.land.
- Togli gli assert che VIETANO cifre nei testi land (“\\d+ steps”, “\\d+ gradin”).
- Togli gli assert che ESIGONO “assess during a visit” / “valutare durante la visita” nel land.
- Mantieni: niente private harbour / porto privato / year-round; concessione stagionale; land non deve dire scomodo/limitazione/difficult access.
- I km restano “straight line” / “linea d’aria”, senza “min”.
brochure.test.ts / property.test.ts: allinea assert sul copy di land/sea se fissano il testo vecchio.
Aggiungi assert minimi sui tre tempi (10, 5, 10) e su “circa 200” / “200” nel land, in entrambe le lingue.
Qualifica i minuti come indicativi nel copy visibile.

NON SCRIVERE
- Indirizzo, CAP, “km 48,2”, SS 163 numerata, parcheggio, bus SITA (sito ristorante / Pro Loco: fuori perimetro brochure).
- Due lidi, torrente, grotta, stabilimento balneare anni ’50, Enzuccio, transfer 2025.
- Promesse di ormeggio privato libero.

VERIFICA
npm test && npm run lint && npm run typecheck
Apri /it e /en, sezione Posizione e intro Proprietà: unicità degli edifici sulla spiaggia, 200 gradini come dato, pontile stagionale con i tre tempi, km aeroporti ancora in linea d’aria. Desktop e mobile: il blocco accesso non deve spezzarsi in modo illeggibile.
Non commitare.
```

### Criteri di accettazione — Fase 2

- `property.landAccess.stepCount === 200`.
- In pagina, IT e EN: spiaggia, unici edifici su quella spiaggia, circa 200 gradini, pontile stagionale, 10/5/10 minuti indicativi.
- Nessun “da valutare” sui gradini; visita resta in Informazioni.
- Linea d’aria e minuti restano due grandezze distinte.
- Test verdi, compresi quelli aggiornati.

---

## Fase 3 — Storia del luogo, senza inventare

**Stato:** riesaminata il 9 ottobre 2026, con rilettura completa del copy IT/EN.

**Obiettivo:** `#storia` diventa un testo compiuto sul *luogo*, non tre didascalie. Solo fatti supplied o contesto geografico documentato. Niente romanzo.

### Revisione dell’esecuzione — 9 ottobre 2026

Il prompt sotto conserva il brief originario, non costituisce testo da pubblicare. La prima esecuzione ne aveva ripreso troppo letteralmente le indicazioni: «giardino agricolo», «comune della tradizione ceramica» e i calchi inglesi non spiegavano il luogo. La revisione riscrive i tre blocchi, collega il lead al loro contenuto e allinea l’intera pagina nelle due lingue.

- Cartiera: anno e associazione alla proprietà restano fatti del committente. La presenza di più cartiere nel territorio di Vietri è contesto; nessuna deduzione sul perimetro di vendita. `property.heritage.paperMillNote` conserva solo il dato fornito e il limite sul perimetro; il racconto contestuale resta in `brochure.ts`.
- Limoneto: circa 8 alberi di circa 70 anni, con un richiamo alla coltivazione dei limoni nel paesaggio costiero. Nessuna attribuzione di varietà, certificazione o raccolto.
- Ceramiche: descrizione di pavimenti, rivestimenti e mosaici visibili. Il rapporto con la tradizione vietrese è un richiamo, non un’attribuzione di provenienza o autore.
- Rilettura generale: corretti i calchi inglesi, l’uso familiare presentato come già in essere, le descrizioni non equivalenti delle camere e la disponibilità documentale data per acquisita. Conservati cinque sezioni, dodici fotografie, superfici indicative, accessi e canale email.

Fonti consultate per questa revisione:

| Fonte | Uso e limite |
| --- | --- |
| [Carta Amalfitana — Marina d’Albori](https://www.marinadalbori.it/it/blog/carta-amalfitana-storia-cartiere-e-museo-della-tradizione) | Riscontro del 1830 e delle cartiere a Vietri. Fonte del sito del ristorante già ammessa nel piano; non prova titoli, proprietà o inclusione nella vendita. |
| [Vietri sul Mare](https://it.wikipedia.org/wiki/Vietri_sul_Mare) | Inquadramento geografico all’estremità orientale della Costiera. |
| [Regione Campania — Limone Costa d’Amalfi](https://www.agricoltura.regione.campania.it/tipici/limone-amalfi.html) | Solo il rapporto tra limonicoltura e paesaggio. La scheda IGP non certifica gli alberi della proprietà. |
| [Soprintendenza di Salerno e Avellino — Villa Comunale di Vietri](https://sabap-saav.cultura.gov.it/2023/03/17/villa-comunale-di-vietri-sul-mare-sa-paesaggio-ceramica-poesia/) | Contesto della tradizione ceramica locale; nessuna attribuzione ai manufatti fotografati. |

Verifiche della revisione: 24 test superati, lint, TypeScript e build di produzione locale riusciti. Browser IT/EN a 1440, 820 e 390 px: cinque sezioni, dodici immagini, mappa, galleria, navigazione e cambio lingua verificati. Screenshot e report in `test-results/brochure/`. Nessun commit o deploy.

### Perché è abbozzata

Oggi: “Una cartiera storica è legata alla proprietà.” Poi otto limoni e le maioliche. Manca il filo: Marina d’Albori come spiaggia-insediamento di Vietri, la cartiera del 1830 in un distretto cartario della Costiera, il limoneto come misura agricola del versante, la ceramica vietrese negli interni.

### Fonti usabili (già vagliate)

Usare come **contesto del luogo**, non come titolo di vendita e non come prova del perimetro.

**Si può fondare**

- Fatti supplied: cartiera associata, 1830; limoneto circa 8 alberi, circa 70 anni; pavimenti, mosaici, maioliche visibili nelle foto.
- [Articolo Carta Amalfitana sul sito del ristorante](https://www.marinadalbori.it/it/blog/carta-amalfitana-storia-cartiere-e-museo-della-tradizione): a Vietri sul Mare c’erano cinque cartiere storiche; una sorgeva a Marina d’Albori, costruita nel 1830, sulle acque del ruscello locale; oggi non ci sono cartiere attive a Vietri; il sito della cartiera di Marina d’Albori ospita il ristorante sulla spiaggia. Coerente con `property.heritage.paperMillYear`. Si può dire che la cartiera del 1830 associata alla proprietà si iscrive in quella tradizione costiera. Non copiare Museo della Carta, filigrana, stracci, prezzi, FAQ turistiche.
- [Wikipedia — Vietri sul Mare](https://it.wikipedia.org/wiki/Vietri_sul_Mare): comune all’ingresso orientale della Costiera; tradizione della ceramica; fra i luoghi “Torre Albori con cartiera e spiaggia”; Albori è frazione collinare. Utile per inquadrare il comune, non per biografie.
- Tradizione del limone in Costiera: contesto agricolo generico, senza date o DOP se non supplied. I numeri restano 8 e 70 da `property.ts`.

**Non scrivere, anche se compare in rete**

- Monaci benedettini di Cava come fondatori della cartiera (stampa locale; contraddice il 1830 supplied).
- Cinque livelli, distruzione nell’alluvione del 1910, rivalità con Amalfi ([Vocidipiazza](http://vocidipiazza.blogspot.com/2009/08/marina-dalbori-patrimonio-da.html)): non confermati dal committente.
- Stabilimento balneare anni ’50, Enzuccio, transfer 2025, “tre minuti di gommone” ([Amalfi Notizie](https://amalfinotizie.it/marina-d-albori-experience/)).
- “Spiaggia privata” del casato Mellucci ([Portale Ceramica](https://www.portaleceramicavietri.it/albori/)): profilo giuridico del demanio non è in brochure.
- Menu, orari, WhatsApp, “case sul mare” da [marinadalbori.it](https://www.marinadalbori.it/it).
- Inclusione della cartiera (o della torre) nel perimetro di vendita.

Il torrente/ruscello: l’articolo del ristorante lo collega alla cartiera del 1830. Si può accennare che quella cartiera usava le acque del ruscello locale, senza descrivere un corso d’acqua visibile oggi e senza contraddire i test che vietano “stream” / “corso d’acqua” come fatto fotografico inventato. Se il test scatta, tieni il ruscello fuori e resta sul 1830 + tradizione di Vietri. Non “inventare” il corso d’acqua nelle didascalie delle foto.

### Prompt — Fase 3

```
Sei l’editor della brochure privata di Marina d’Albori. Fasi 1–2 già fatte (voce; spiaggia, 200 gradini, pontile). Esegui la Fase 3: completare #storia senza inventare, poi allineare documenti interni.

OBIETTIVO
La sezione 03 deve far capire il carattere storico del LUOGO in tre fili già annunciati dal titolo (cartiera, limoneto, ceramiche), con un breve inquadramento. Non è una pagina Wikipedia e non è il blog del ristorante. Lunghezza: un lead breve + tre blocchi più compiuti degli attuali, ancora nello schema di page.tsx (tre h3 + due foto). Non aggiungere sezioni o componenti.

STRUTTURA
- Lead (se serve un campo nuovo in brochure.history, aggiungilo in IT e EN e montalo in page.tsx sopra la griglia, senza cambiare le foto). Inquadra: Marina d’Albori è la spiaggia, nel comune di Vietri sul Mare, all’ingresso orientale della Costiera; gli edifici della proprietà stanno su quella spiaggia. Una frase, non un saggio.
- Cartiera del 1830. Testo attuale (“è legata / associated”) è vero ma vuoto. Completa: cartiera storica del 1830 associata alla proprietà; a Vietri sul Mare il lavoro della carta è documentato in più opifici; una di quelle cartiere sorgeva a Marina d’Albori. Tradizione costiera (Amalfi/Vietri), senza Museo della Carta, senza tecniche di produzione, senza monaci, senza alluvioni. Resta la parola associated/legata: i test la cercano; non affermare che la cartiera è nella vendita.
- Limoneto. Tieni 8 alberi e circa 70 anni. Aggiungi il senso: è il giardino agricolo del versante, non un’aiuola. Niente pergola di agrumi, niente numeri inventati.
- Ceramiche. Vietri sul Mare è il comune della tradizione ceramica; pavimenti, mosaici e maioliche nelle unità lo rendono visibile in casa, con variazioni da un’unità all’altra. Non citare Solimene, museo, ciucciariello, artisti.

TONO
Stesso registro delle Fasi 1–2: nota di proprietà, non storytelling turistico. Niente “scrigno”, “paradiso”, “secoli di storia”, “anima”.

ALLINEAMENTO
- property.heritage.paperMillNote IT/EN: stesso senso del nuovo mill, ancora “associata/associated”, anno 1830.
- JSON-LD pesca brochure.history.mill: si aggiorna da solo; non introdurre Accommodation/Offer.
- docs/FINALIZZAZIONE.md, paragrafo “Perimetro dei fatti”: i gradini non sono più sconosciuti (circa 200, supplied); i tre tempi via mare sono supplied e indicativi; la cartiera resta associata; accesso veicolare ancora unknown. Non riscrivere le Fasi 2–3 di pubblicazione (form, hosting).
- README.md: togli “fronte cala” se è rimasto; una riga su spiaggia / scalinata / pontile se descrivi il contenuto.
- public/images/property/README.md: “cala” solo se è etichetta interna di file; in descrizione usa spiaggia/mare.
- Test: mill deve ancora matchare associated|legata; garden deve ancora contenere 8 e 70; niente stream/corso d’acqua/pergola se i test lo vietano. Allinea assert che fissano la frase vecchia di una riga.

VIETATO
Monaci di Cava, 1910, cinque livelli, spiaggia privata, Mellucci, anni ’50, Enzuccio, menu, 3 minuti, inclusione della cartiera, prezzi, UNESCO come argomento di vendita.

VERIFICA
npm test && npm run lint && npm run typecheck
Apri /it e /en #storia: lead + tre blocchi compiuti, foto invariate, nessuna invenzione. Rileggere tutta la pagina: lessico Fase 1, luogo Fase 2, storia Fase 3, una sola voce.
Verifica browser sulle cinque sezioni in entrambe le lingue, desktop e un viewport stretto.
Non commitare.
```

### Criteri di accettazione — Fase 3

- Storia leggibile come luogo (Vietri, cartiera 1830 associata, limoneto numerato, ceramica visibile), senza romanzo e senza periplo turistico.
- Nessuna affermazione di inclusione della cartiera.
- FINALIZZAZIONE aggiornata sul perimetro dei fatti.
- Test verdi; pagina coerente IT/EN.

---

## Dopo le tre fasi

Non rientrano in questo piano, e restano aperti come in FINALIZZAZIONE:

- **Contatto sul sito** (form, casella, titolare privacy).
- **Pubblicazione** (URL, hosting, noindex vs autenticazione).

Se dopo la Fase 3 il testo delle tre card o della storia risultasse lungo per il layout, si accorcia il copy: non si aggiunge un sesto blocco.

## File di riferimento rapido

| File | Ruolo |
| --- | --- |
| `src/content/brochure.ts` | Racconto, meta, sezioni |
| `src/content/property.ts` | Fatti supplied / unknown |
| `src/content/geography.ts` | Pin, km in linea d’aria, accessi |
| `src/content/images.ts` | Alt e didascalie |
| `src/content/messages.ts` | Nav, gallery, mappa, privacy |
| `src/app/[locale]/page.tsx` | Montaggio (toccare solo se serve un lead in Storia) |
| `src/content/*.test.ts` | Confini fattuali e copy |

## Ordine

1. Incollare il prompt della Fase 1 → verificare.  
2. Incollare il prompt della Fase 2 → verificare.  
3. Incollare il prompt della Fase 3 → verificare.  

Non eseguire due fasi nello stesso giro.
