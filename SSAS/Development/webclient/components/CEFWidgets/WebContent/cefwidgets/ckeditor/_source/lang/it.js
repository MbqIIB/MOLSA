/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the English
 *		language. This is the base file for all translations.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
// NLS_ENCODING=UTF-8
// NLS_MESSAGEFORMAT_NONE
// G11N GA UI

CKEDITOR.lang["it"] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default "ltr"
	 */
	dir : "ltr",

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : "Editor Rich text, %1, premere ALT 0 per la guida.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Barre degli strumenti dell'editor",
	editor	: "Editor Rich Text",

	// Toolbar buttons without dialogs.
	source			: "Origine",
	newPage			: "Nuova pagina",
	save			: "Salva",
	preview			: "Anteprima:",
	cut				: "Taglia",
	copy			: "Copia",
	paste			: "Incolla",
	print			: "Stampa",
	underline		: "Sottolinea",
	bold			: "Grassetto",
	italic			: "Corsivo",
	selectAll		: "Seleziona tutto",
	removeFormat	: "Rimuovi formato",
	strike			: "Barrato",
	subscript		: "Attributo deponente",
	superscript		: "Attributo esponente",
	horizontalrule	: "Inserisci linea orizzontale",
	pagebreak		: "Inserisci interruzione di pagina",
	pagebreakAlt		: "Interruzione di pagina",
	unlink			: "Rimuovi collegamento",
	undo			: "Annulla",
	redo			: "Riesegui",

	// Common messages and labels.
	common :
	{
		browseServer	: "Server browser:",
		url				: "URL:",
		protocol		: "Protocollo:",
		upload			: "Caricamento:",
		uploadSubmit	: "Invia al server",
		image			: "Inserisci immagine",
		flash			: "Inserisci filmato Flash",
		form			: "Inserisci modulo",
		checkbox		: "Inserisci casella di spunta",
		radio			: "Inserisci pulsante di scelta",
		textField		: "Inserisci campo di testo",
		textarea		: "Inserisci area di testo",
		hiddenField		: "Inserisci campo nascosto",
		button			: "Inserisci pulsante",
		select			: "Inserisci campo di selezione",
		imageButton		: "Inserisci pulsante immagine",
		notSet			: "<non impostato>",
		id				: "Id:",
		name			: "Nome:",
		langDir			: "Direzione lingua:",
		langDirLtr		: "Da sinistra a destra",
		langDirRtl		: "Da destra a sinistra",
		langCode		: "Codice lingua:",
		longDescr		: "URL descrizione estesa:",
		cssClass		: "Classi foglio di stile:",
		advisoryTitle	: "Titolo advisory:",
		cssStyle		: "Stile:",
		ok				: "OK",
		cancel			: "Annulla",
		close : "Chiudi",
		preview			: "Anteprima:",
		generalTab		: "Generale",
		advancedTab		: "Avanzata",
		validateNumberFailed	: "Questo valore non è un numero.",
		confirmNewPage	: "Eventuali modifiche non salvate a questo contenuto andranno perse. Caricare una nuova pagina?",
		confirmCancel	: "Alcune delle opzioni sono state modificate. Chiudere la finestra di dialogo?",
		options : "Opzioni",
		target			: "Destinazione:",
		targetNew		: "Nuova finestra (_blank)",
		targetTop		: "Finestra iniziale (_top)",
		targetSelf		: "Stessa finestra (_self)",
		targetParent	: "Finestra parent (_parent)",
		langDirLTR		: "Da sinistra a destra",
		langDirRTL		: "Da destra a sinistra",
		styles			: "Stile:",
		cssClasses		: "Classi foglio di stile:",
		width			: "Larghezza:",
		height			: "Altezza:",
		align			: "Allinea:",
		alignLeft		: "A sinistra",
		alignRight		: "A destra",
		alignCenter		: "Al centro",
		alignTop		: "In alto",
		alignMiddle		: "In mezzo",
		alignBottom		: "In basso",
		invalidHeight	: "L'altezza deve essere un numero intero positivo.",
		invalidWidth	: "La larghezza deve essere un numero intero positivo.",
		invalidCssLength	: "Il valore specificato per il campo '%1' deve essere un numero positivo con o senza un'unità di misura CSS valida (px, %, pollici, cm, mm, em, ex, pt o pc).",
		invalidHtmlLength	: "Il valore specificato per il campo '%1' deve essere un numero positivo con o senza un'unità di misura HTML (px o %).",
		invalidInlineStyle	: "Il valore specificato per lo stile in linea deve essere costituito da una o più tuple in formato \"nome : valore\", separate dal punto e virgola.",
		cssLengthTooltip	: "Immettere un numero per il valore in pixel o un numero con un'unità CSS valida (px, %, pollici, cm, mm, em, ex, pt o pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, non disponibile</span>"
	},

	contextmenu :
	{
		options : "Opzioni menu contestuale"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Inserisci carattere speciale",
		title		: "Carattere speciale",
		options : "Opzioni caratteri speciali"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Collegamento URL",
		other 		: "<altro>",
		menu		: "Modifica collegamento",
		title		: "Collegamento",
		info		: "Informazioni collegamento",
		target		: "Destinazione",
		upload		: "Caricamento:",
		advanced	: "Avanzata",
		type		: "Tipo di collegamento:",
		toUrl		: "URL",
		toAnchor	: "Collega ad ancoraggio nel testo",
		toEmail		: "Email",
		targetFrame	: "<frame>",
		targetPopup	: "<finestra a comparsa>",
		targetFrameName	: "Nome cornice di destinazione:",
		targetPopupName	: "Nome finestra pop-up:",
		popupFeatures	: "Funzioni finestra pop-up:",
		popupResizable	: "Ridimensionabile",
		popupStatusBar	: "Barra di stato",
		popupLocationBar	: "Barra degli indirizzi",
		popupToolbar	: "Barra degli strumenti",
		popupMenuBar	: "Barra dei menu",
		popupFullScreen	: "A tutto schermo (IE)",
		popupScrollBars	: "Barre di scorrimento",
		popupDependent	: "Dipendente (Netscape)",
		popupLeft		: "A sinistra",
		popupTop		: "In alto",
		id				: "Id:",
		langDir			: "Direzione lingua:",
		langDirLTR		: "Da sinistra a destra",
		langDirRTL		: "Da destra a sinistra",
		acccessKey		: "Chiave di accesso:",
		name			: "Nome:",
		langCode		: "Codice lingua:",
		tabIndex		: "Indice schede:",
		advisoryTitle	: "Titolo advisory:",
		advisoryContentType	: "Tipo di contenuto advisory:",
		cssClasses		: "Classi foglio di stile:",
		charset			: "Set di caratteri risorsa collegata:",
		styles			: "Stile:",
		rel			: "Relazione",
		selectAnchor	: "Seleziona un ancoraggio",
		anchorName		: "Per nome ancoraggio",
		anchorId		: "Per Id elemento",
		emailAddress	: "Indirizzo email",
		emailSubject	: "Oggetto del messaggio",
		emailBody		: "Corpo del messaggio",
		noAnchors		: "Nel documento non è disponibile alcun segnalibro. Fare clic sull'icona 'Inserisci segnalibro documento' nella barra degli strumenti per aggiungerne uno.",
		noUrl			: "Immettere l'URL di collegamento",
		noEmail			: "Immettere l'indirizzo email"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Inserire il segnalibro del documento",
		menu		: "Modificare il segnalibro del documento",
		title		: "Segnalibro del documento",
		name		: "Nome:",
		errorName	: "Immettere un nome per il segnalibro del documento",
		remove		: "Rimuovi il segnalibro del documento"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Proprietà elenchi numerati",
		bulletedTitle		: "Proprietà elenchi puntati",
		type				: "Visualizza lo stile: ",
		start				: "Inizio:",
		validateStartNumber				:"Il numero iniziale dell'elenco deve essere un numero intero.",
		circle				: "Cerchio",
		disc				: "Disco",
		square				: "Quadrato",
		none				: "Nessuno",
		notset				: "<non impostato>",
		armenian			: "Numerazione armena",
		georgian			: "Numerazione georgiana (an, ban, gan, ecc.)",
		lowerRoman			: "Romano minuscolo (i, ii, iii, iv, v, ecc.)",
		upperRoman			: "Romano maiuscolo (I, II, III, IV, V, ecc.)",
		lowerAlpha			: "Alfabetico minuscolo (a, b, c, d, e, ecc.)",
		upperAlpha			: "Alfabetico maiuscolo (A, B, C, D, E, ecc.)",
		lowerGreek			: "Greco minuscolo (alfa, beta, gamma, ecc.)",
		decimal				: "Decimale (1, 2, 3, ecc.)",
		decimalLeadingZero	: "Decimale con zero iniziale (01, 02, 03, ecc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Trova e sostituisci",
		find				: "Trova",
		replace				: "Sostituisci",
		findWhat			: "Trova:",
		replaceWith			: "Sostituisci con:",
		notFoundMsg			: "Il testo specificato non è stato trovato.",
		findOptions			: "Opzioni Trova",
		matchCase			: "Maiuscole/minuscole",
		matchWord			: "Parole intere",
		matchCyclic			: "Corrispondenza ciclica",
		replaceAll			: "Sostituisci tutto",
		replaceSuccessMsg	: "%1 ricorrenze sostituite."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Inserisci tabella",
		title		: "Tabella",
		menu		: "Proprietà tabella",
		deleteTable	: "Elimina tabella",
		rows		: "Righe:",
		columns		: "Colonne:",
		border		: "Dimensione bordo:",
		widthPx		: "pixel",
		widthPc		: "percentuale",
		widthUnit	: "Unità di misura larghezza:",
		cellSpace	: "Spaziatura celle:",
		cellPad		: "Riempimento celle:",
		caption		: "Didascalia:",
		summary		: "Riepilogo:",
		headers		: "Intestazioni:",
		headersNone		: "Nessuno",
		headersColumn	: "Prima colonna",
		headersRow		: "Prima riga",
		headersBoth		: "Entrambe",
		invalidRows		: "Il numero di righe deve essere un numero intero maggiore di zero.",
		invalidCols		: "Il numero di colonne deve essere un numero intero maggiore di zero.",
		invalidBorder	: "La dimensione del bordo deve essere un numero positivo.",
		invalidWidth	: "La larghezza della tabella deve essere un numero positivo.",
		invalidHeight	: "L'altezza della tabella deve essere un numero positivo.",
		invalidCellSpacing	: "La spaziatura delle celle deve essere un numero positivo.",
		invalidCellPadding	: "Il riempimento delle celle deve essere un numero positivo.",

		cell :
		{
			menu			: "Cella",
			insertBefore	: "Inserisci cella prima",
			insertAfter		: "Inserisci cella dopo",
			deleteCell		: "Elimina celle",
			merge			: "Unisci celle",
			mergeRight		: "Unisci a destra",
			mergeDown		: "Unisci in basso",
			splitHorizontal	: "Suddividi cella orizzontalmente",
			splitVertical	: "Suddividi cella verticalmente",
			title			: "Proprietà cella",
			cellType		: "Tipo di cella:",
			rowSpan			: "Espansione righe:",
			colSpan			: "Espansione colonne:",
			wordWrap		: "A capo automatico",
			hAlign			: "Allineamento orizzontale",
			vAlign			: "Allineamento verticale",
			alignBaseline	: "Base",
			bgColor			: "Colore sfondo:",
			borderColor		: "Colore bordo:",
			data			: "Dati",
			header			: "Intestazione",
			yes				: "Sì",
			no				: "No",
			invalidWidth	: "La larghezza delle celle deve essere un numero positivo.",
			invalidHeight	: "L'altezza delle celle deve essere un numero positivo.",
			invalidRowSpan	: "L'espansione delle righe deve essere un numero intero positivo.",
			invalidColSpan	: "L'estensione delle colonne deve essere un numero intero positivo.",
			chooseColor 	: "Altri colori..."
		},

		row :
		{
			menu			: "Riga",
			insertBefore	: "Inserisci riga prima",
			insertAfter		: "Inserisci riga dopo",
			deleteRow		: "Elimina righe"
		},

		column :
		{
			menu			: "Colonna",
			insertBefore	: "Inserisci colonna prima",
			insertAfter		: "Inserisci colonna dopo",
			deleteColumn	: "Elimina colonne"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Proprietà pulsante",
		text		: "Testo (Valore):",
		type		: "Tipo:",
		typeBtn		: "Pulsante",
		typeSbm		: "Inoltra",
		typeRst		: "Reimposta"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Proprietà casella di spunta",
		radioTitle	: "Proprietà pulsante di scelta",
		value		: "Valore:",
		selected	: "Selected"
	},

	// Form Dialog.
	form :
	{
		title		: "Inserisci modulo",
		menu		: "Proprietà modulo",
		action		: "Azione:",
		method		: "Metodo:",
		encoding	: "Codifica:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Seleziona proprietà campo",
		selectInfo	: "Info selezione",
		opAvail		: "Opzioni disponibili",
		value		: "Valore:",
		size		: "Dimensione:",
		lines		: "righe",
		chkMulti	: "Consenti selezioni multiple",
		opText		: "Testo:",
		opValue		: "Valore:",
		btnAdd		: "Aggiungi",
		btnModify	: "Modifica",
		btnUp		: "Su",
		btnDown		: "Giù",
		btnSetValue : "Imposta come valore selezionato",
		btnDelete	: "Elimina"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Proprietà area testo",
		cols		: "Colonne:",
		rows		: "Righe:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Seleziona campo testo",
		name		: "Nome:",
		value		: "Valore:",
		charWidth	: "Larghezza carattere:",
		maxChars	: "Numero massimo di caratteri:",
		type		: "Tipo:",
		typeText	: "Testo",
		typePass	: "Password"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Proprietà campo nascoste",
		name	: "Nome:",
		value	: "Valore:"
	},

	// Image Dialog.
	image :
	{
		title		: "Immagine",
		titleButton	: "Proprietà pulsante immagine",
		menu		: "Proprietà immagine",
		infoTab	: "Informazioni immagine",
		btnUpload	: "Carica immagine",
		upload	: "Carica",
		alt		: "Testo alternativo:",
		lockRatio	: "Blocca percentuale",
		resetSize	: "Reimposta dimensione",
		border	: "Bordo:",
		hSpace	: "Spaziatura orizzontale:",
		vSpace	: "Spaziatura verticale",
		alertUrl	: "Immettere l'URL immagine",
		linkTab	: "Collegamento",
		button2Img	: "Convertire il pulsante immagine selezionato in un'immagine semplice?",
		img2Button	: "Convertire l'immagine selezionata in un pulsante immagine?",
		urlMissing : "URL di origine immagine mancante.",
		validateBorder : "Il bordo deve essere un numero intero positivo.",
		validateHSpace : "La spaziatura orizzontale deve essere un numero intero positivo.",
		validateVSpace : "La spaziatura verticale deve essere un numero intero positivo."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Proprietà flash",
		propertiesTab	: "Proprietà",
		title		: "Flash",
		chkPlay		: "Riproduzione automatica",
		chkLoop		: "Riproduzione ciclica",
		chkMenu		: "Abilita menu flash",
		chkFull		: "Consenti schermo intero",
 		scale		: "Scala:",
		scaleAll		: "Mostra tutto",
		scaleNoBorder	: "Nessun bordo",
		scaleFit		: "Adatta al bordo",
		access			: "Accesso script:",
		accessAlways	: "Sempre",
		accessSameDomain	: "Stesso dominio",
		accessNever	: "Mai",
		alignAbsBottom: "Abs in basso",
		alignAbsMiddle: "Abs al centro",
		alignBaseline	: "Base",
		alignTextTop	: "Inizio testo",
		quality		: "Qualità:",
		qualityBest	: "Migliore",
		qualityHigh	: "Elevata",
		qualityAutoHigh	: "Elevata automatica",
		qualityMedium	: "Medio",
		qualityAutoLow	: "Bassa automatica",
		qualityLow	: "Bassa",
		windowModeWindow	: "Finestra",
		windowModeOpaque	: "Opaca",
		windowModeTransparent	: "Trasparente",
		windowMode	: "Modalità finestra:",
		flashvars	: "Variabili:",
		bgcolor	: "Colore sfondo:",
		hSpace	: "Spaziatura orizzontale:",
		vSpace	: "Spaziatura verticale",
		validateSrc : "L'URL non deve essere vuoto.",
		validateHSpace : "La spaziatura orizzontale deve essere un numero intero positivo.",
		validateVSpace : "La spaziatura verticale deve essere un numero intero positivo."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Controllo ortografico",
		title			: "Controllo ortografico",
		notAvailable	: "Servizio attualmente non disponibile.",
		errorLoading	: "Errore di caricamento dell'host di servizio dell'applicazione: %s.",
		notInDic		: "Non nel dizionario",
		changeTo		: "Passa a",
		btnIgnore		: "Ignora",
		btnIgnoreAll	: "Ignora tutto",
		btnReplace		: "Sostituisci",
		btnReplaceAll	: "Sostituisci tutto",
		btnUndo			: "Annulla",
		noSuggestions	: "- Nessun suggerimento -",
		progress		: "Controllo ortografico in corso...",
		noMispell		: "Controllo ortografico completo: nessun errore di ortografia trovato",
		noChanges		: "Controllo ortografico completo: nessuna parola modificata",
		oneChange		: "Controllo ortografico completo: una parola modificata",
		manyChanges		: "Controllo ortografico completo: %1 parole modificate",
		ieSpellDownload	: "Controllo ortografico non installato. Scaricarlo ora?"
	},

	smiley :
	{
		toolbar	: "Inserisci emoticon",
		title	: "Emoticon",
		options : "Opzioni emoticon"
	},

	elementsPath :
	{
		eleLabel : "Percorso elementi",
		eleTitle : "%1 elemento"
	},

	numberedlist : "Elenco numerato",
	bulletedlist : "Elenco puntato",
	indent : "Aumenta rientro",
	outdent : "Diminuisci rientro",

	justify :
	{
		left : "Allinea a sinistra",
		center : "Allinea al centro",
		right : "Allinea a destra",
		block : "Giustificato"
	},

	blockquote : "Citazione",

	clipboard :
	{
		title		: "Incolla",
		cutError	: "Le impostazioni della sicurezza del browser impediscono la copia automatica. Utilizzare invece Ctrl+X sulla tastiera.",
		copyError	: "Le impostazioni della sicurezza del browser impediscono la copia automatica. Utilizzare invece Ctrl+C sulla tastiera.",
		pasteMsg	: "Premere Ctrl+V (Cmd+V su MAC) per incollare.",
		securityMsg	: "I blocchi di sicurezza del browser vengono incollati direttamente dagli appunti.",
		pasteArea	: "Area di Incolla"
	},

	pastefromword :
	{
		confirmCleanup	: "Il testo da incollare è stato copiato da Word. Cancellarlo prima di incollarlo?",
		toolbar			: "Incolla speciale",
		title			: "Incolla speciale",
		error			: "Non è stato possibile cancellare i dati incollati a causa di un errore interno"
	},

	pasteText :
	{
		button	: "Incolla come testo normale",
		title	: "Incolla come testo normale"
	},

	templates :
	{
		button 			: "Modelli",
		title : "Modelli di contenuto",
		options : "Opzioni modello",
		insertOption: "Sostituisci contenuto effettivo",
		selectPromptMsg: "Selezionare il modello da aprire nell'editor",
		emptyListMsg : "(Nessun modello definito)"
	},

	showBlocks : "Mostra blocchi",

	stylesCombo :
	{
		label		: "Stili",
		panelTitle 	: "Stili",
		panelTitle1	: "Stili blocco",
		panelTitle2	: "Stili in linea",
		panelTitle3	: "Stili oggetto"
	},

	format :
	{
		label		: "Formato",
		panelTitle	: "Formato paragrafo",

		tag_p		: "Normale",
		tag_pre		: "Formattato",
		tag_address	: "Indirizzo",
		tag_h1		: "Intestazione 1",
		tag_h2		: "Intestazione 2",
		tag_h3		: "Intestazione 3",
		tag_h4		: "Intestazione 4",
		tag_h5		: "Intestazione 5",
		tag_h6		: "Intestazione 6",
		tag_div		: "Normale (DIV)"
	},

	div :
	{
		title				: "Crea contenitore Div",
		toolbar				: "Crea contenitore Div",
		cssClassInputLabel	: "Classi foglio di stile",
		styleSelectLabel	: "Stile",
		IdInputLabel		: "Id",
		languageCodeInputLabel	: " Codice lingua",
		inlineStyleInputLabel	: "Stile in linea",
		advisoryTitleInputLabel	: "Titolo advisory",
		langDirLabel		: "Direzione lingua",
		langDirLTRLabel		: "Da sinistra a destra (LTR)",
		langDirRTLLabel		: "Da destra a sinistra (RTL)",
		edit				: "Modifica Div",
		remove				: "Rimuovi Div"
  	},

	iframe :
	{
		title		: "Proprietà IFrame",
		toolbar		: "Inserisci IFrame",
		noUrl		: "Immettere l'URL dell'iframe",
		scrolling	: "Abilita barre di scorrimento",
		border		: "Mostra bordo della cornice"
	},

	font :
	{
		label		: "Carattere",
		voiceLabel	: "Carattere",
		panelTitle	: "Nome carattere"
	},

	fontSize :
	{
		label		: "Dimensione",
		voiceLabel	: "Dimensione carattere",
		panelTitle	: "Dimensione carattere"
	},

	colorButton :
	{
		textColorTitle	: "Colore testo",
		bgColorTitle	: "Colore sfondo",
		panelTitle		: "Colori",
		auto			: "Automatico",
		more			: "Altri colori..."
	},

	colors :
	{
		"000" : "Nero",
		"800000" : "Bordeaux",
		"8B4513" : "Marrone scuro",
		"2F4F4F" : "Grigio antracite",
		"008080" : "Verde acqua",
		"000080" : "Blu scuro",
		"4B0082" : "Indaco",
		"696969" : "Grigio scuro",
		"B22222" : "Mattone",
		"A52A2A" : "Marrone",
		"DAA520" : "Solidago",
		"006400" : "Verde scuro",
		"40E0D0" : "Turchese",
		"0000CD" : "Blu medio",
		"800080" : "Porpora",
		"808080" : "Grigio",
		"F00" : "Rosso",
		"FF8C00" : "Arancione scuro",
		"FFD700" : "Oro",
		"008000" : "Verde",
		"0FF" : "Ciano",
		"00F" : "Blu",
		"EE82EE" : "Viola",
		"A9A9A9" : "Grigio sfumato",
		"FFA07A" : "Salmone chiaro",
		"FFA500" : "Arancione",
		"FFFF00" : "Giallo",
		"00FF00" : "Lime",
		"AFEEEE" : "Turchese pallido",
		"ADD8E6" : "Azzurro",
		"DDA0DD" : "Prugna",
		"D3D3D3" : "Grigio chiaro",
		"FFF0F5" : "Bianco rosato",
		"FAEBD7" : "Avorio",
		"FFFFE0" : "Giallo chiaro",
		"F0FFF0" : "Giallo melone",
		"F0FFFF" : "Azzurro",
		"F0F8FF" : "Blu alice",
		"E6E6FA" : "Lavanda",
		"FFF" : "Bianco"
	},

	scayt :
	{
		title			: "Controllo ortografico durante la digitazione",
		opera_title		: "Non supportato da Opera",
		enable			: "Abilita SCAYT",
		disable			: "Disabilita SCAYT",
		about			: "Informazioni su SCAYT",
		toggle			: "Attiva SCAYT",
		options			: "Opzioni",
		langs			: "Lingue",
		moreSuggestions	: "Ulteriori suggerimenti",
		ignore			: "Ignora",
		ignoreAll		: "Ignora tutto",
		addWord			: "Aggiungi parola",
		emptyDic		: "Il nome dizionario non deve essere vuoto.",

		optionsTab		: "Opzioni",
		allCaps			: "Ignora parole tutte in maiuscolo",
		ignoreDomainNames : "Ignora nomi di dominio",
		mixedCase		: "Ignora parole in maiuscolo e minuscolo",
		mixedWithDigits	: "Ignora parole con numeri",

		languagesTab	: "Lingue",

		dictionariesTab	: "Dizionari",
		dic_field_name	: "Nome dizionario",
		dic_create		: "Crea",
		dic_restore		: "Ripristina",
		dic_delete		: "Elimina",
		dic_rename		: "Rinomina",
		dic_info		: "Inizialmente il dizionario utente è memorizzato in un cookie. Le dimensioni dei cookie, tuttavia, sono limitate. Quando le dimensioni di un dizionario utente aumentano al punto che non può più essere memorizzato in un cookie, può essere memorizzato sul server. Per memorizzare il dizionario personale sul server, è necessario specificare un nome per il dizionario. Se si dispone già di un dizionario memorizzato, immetterne il nome e fare clic sul pulsante Ripristina.",

		aboutTab		: "Informazioni"
	},

	about :
	{
		title		: "Informazioni su CKEditor",
		dlgTitle	: "Informazioni su CKEditor",
		help	: "Selezionare $1 per la guida.",
		userGuide : "Guida dell'utente di CKEditor",
		moreInfo	: "Per informazioni sulla licenza, visitare il nostro sito Web:",
		copy		: "Copyright &copy; $1. Tutti i diritti riservati."
	},

	maximize : "Ingrandisci",
	minimize : "Riduci",

	fakeobjects :
	{
		anchor	: "Ancoraggio",
		flash	: "Animazione flash",
		iframe		: "IFrame",
		hiddenfield	: "Campo nascosto",
		unknown	: "Oggetto sconosciuto"
	},

	resize : "Trascina per ridimensionare",

	colordialog :
	{
		title		: "Seleziona colore",
		options	:	"Opzioni colore",
		highlight	: "Evidenzia",
		selected	: "Colore selezionato",
		clear		: "Elimina"
	},

	toolbarCollapse	: "Comprimi barra degli strumenti",
	toolbarExpand	: "Espandi barra degli strumenti",

	toolbarGroups :
	{
		document : "Documento",
		clipboard : "Appunti/Annulla",
		editing : "Modifica",
		forms : "Moduli",
		basicstyles : "Stili di base",
		paragraph : "Paragrafo",
		links : "Collegamento",
		insert : "Inserisci",
		styles : "Stili",
		colors : "Colori",
		tools : "Strumenti"
	},

	bidi :
	{
		ltr : "Direzione del testo da sinistra a destra",
		rtl : "Direzione del testo da destra a sinistra"
	},

	docprops :
	{
		label : "Proprietà del documento",
		title : "Proprietà del documento",
		design : "Aspetto",
		meta : "Metatag",
		chooseColor : "Scegli",
		other : "Altro...",
		docTitle :	"Titolo della pagina",
		charset : 	"Codifica del set di caratteri",
		charsetOther : "Altra codifica del set di caratteri",
		charsetASCII : "ASCII",
		charsetCE : "Europa Centrale",
		charsetCT : "Cinese tradizionale (Big5)",
		charsetCR : "Cirillico",
		charsetGR : "Greco",
		charsetJP : "Giapponese",
		charsetKR : "Coreano",
		charsetTR : "Turco",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Europa Occidentale",
		docType : "Intestazione tipo di documento",
		docTypeOther : "Altra intestazione tipo di documento",
		xhtmlDec : "Includi dichiarazioni XHTML",
		bgColor : "Colore sfondo",
		bgImage : "URL immagine di sfondo",
		bgFixed : "Sfondo non scorrevole (fisso)",
		txtColor : "Colore testo",
		margin : "Margini della pagina",
		marginTop : "In alto",
		marginLeft : "A sinistra",
		marginRight : "A destra",
		marginBottom : "In basso",
		metaKeywords : "Parole chiave di indicizzazione documento (separate da virgole)",
		metaDescription : "Descrizione del documento",
		metaAuthor : "Autore",
		metaCopyright : "Copyright",
		previewHtml : "<p>Questo è un <strong>testo di esempio</strong>. Si sta utilizzando <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "pollici",
			widthCm	: "centimetri",
			widthMm	: "millimetri",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "punti",
			widthPc	: "pica",
			required : "Obbligatorio"
		},
		table :
		{
			createTable : 'Inserisci tabella',
			heightUnit	: "Unità di misura altezza:",
			insertMultipleRows : "Inserisci righe",
			insertMultipleCols : "Inserisci colonne",
			noOfRows : "Numero di righe:",
			noOfCols : "Numero di colonne:",
			insertPosition : "Posizione:",
			insertBefore : "Prima",
			insertAfter : "Dopo",
			selectTable : "Seleziona tabella",
			selectRow : "Seleziona riga",
			columnTitle : "Larghezza colonna",
			colProps : "Proprietà colonna",
			invalidColumnWidth	: "La colonna deve essere un numero positivo.",
			fixedColWidths : "Larghezze di colonna fissa"
		},
		cell :
		{
			title : "Cella"
		},
		colordialog :
		{
			currentColor	: "Colore corrente"
		},
		emoticon :
		{
			angel		: "Angelo",
			angry		: "Arrabbiato",
			cool		: "Disinvolto",
			crying		: "In lacrime",
			eyebrow		: "Sopracciglia",
			frown		: "Accigliato",
			goofy		: "Goffo",
			grin		: "Ghigno",
			half		: "Metà",
			idea		: "Idea",
			laughing	: "Risata",
			laughroll	: "Risata sguaiata",
			no			: "No",
			oops		: "Oops",
			shy			: "Timido",
			smile		: "Sorriso",
			tongue		: "Linguaccia",
			wink		: "Occhietto",
			yes			: "Sì"
		},

		menu :
		{
			link	: "Inserisci collegamento",
			list	: "Elenco",
			paste	: "Incolla",
			action	: "Azione",
			align	: "Allinea",
			emoticon: "Emoticon"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Elenco numerato",
			bulletedTitle		: "Elenco puntato",
			description			: "Le impostazioni verranno applicate a livello di elenco corrente ",
			fontsize			: "Dimensione tipo di carattere:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Immettere un nome descrittivo del segnalibro, ad esempio 'Sezione 1.2'. Dopo l'inserimento del segnalibro, fare clic sull'icona 'Collegamento' o sull'icona 'Collegamento segnalibro documento' per collegarlo.",
			title		: "Collegamento segnalibro documento",
			linkTo		: "Collega a:"
		},

		urllink :
		{
			title : "Collegamento URL",
			linkText : "Testo collegamento:",
			selectAnchor: "Selezionare un ancoraggio:",
			nourl: "Immettere un URL nel campo di testo.",
			urlhelp: "Immettere o incollare un URL da aprire quando gli utenti fanno clic su questo collegamento, ad esempio http://www.example.com.",
			displaytxthelp: "Immettere un testo da visualizzare per il collegamento.",
			openinnew : "Apri collegamento in una nuova finestra"
		},

		spellchecker :
		{
			title : "Controlla ortografia",
			replace : "Sostituisci:",
			suggesstion : "Suggerimenti:",
			withLabel : "Con:",
			replaceButton : "Sostituisci",
			replaceallButton:"Sostituisci tutto",
			skipButton:"Ignora",
			skipallButton: "Ignora tutto",
			undochanges: "Annulla modifiche",
			complete: "Controllo ortografico completo",
			problem: "Problema di richiamo dei dati XML",
			addDictionary: "Aggiungi al dizionario",
			editDictionary: "Modifica dizionario"
		},

		status :
		{
			keystrokeForHelp: "Premere ALT 0 per la Guida"
		},

		linkdialog :
		{
			label : "Finestra di dialogo Collegamento"
		},

		imagedatauri :
		{
			error : "Al momento non è possibile incollare le immagini. Utilizzare l'opzione della barra degli strumenti \'Inserisci immagine\'."
		},

		image :
		{
			previewText : "Il testo verrà posizionato attorno all'immagine che viene aggiunta, come in questo esempio.",
			fileUpload : "Selezionare un file di immagine dal computer:"
		}
	}

};
