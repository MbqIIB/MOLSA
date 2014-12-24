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

CKEDITOR.lang["hr"] =
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
	editorTitle : "Editor bogatog teksta, %1, pritisnite ALT 0 za pomoć.",
	editorHelp : "",

	// ARIA descriptions.
	toolbar	: "Traka s alatima",
	editor	: "Bogat bogatog teksta",

	// Toolbar buttons without dialogs.
	source			: "Izvor",
	newPage			: "Novo stranica",
	save			: "Spremi",
	preview			: "Pregled:",
	cut				: "Izreži",
	copy			: "Kopija",
	paste			: "Zalijepi",
	print			: "Ispiši",
	underline		: "Podcrtaj",
	bold			: "Podebljaj",
	italic			: "Kurziv",
	selectAll		: "Izaberi sve",
	removeFormat	: "Ukloni formatiranje",
	strike			: "Izbaci skroz",
	subscript		: "Indeks",
	superscript		: "Superskript",
	horizontalrule	: "Umetni prekid linije",
	pagebreak		: "Umetni prekid stranice",
	pagebreakAlt		: "Page Break",
	unlink			: "Ukloni vezu",
	undo			: "Poništi",
	redo			: "Ponovno napravi",

	// Common messages and labels.
	common :
	{
		browseServer	: "Poslužitelj pretražitelja:",
		url				: "URL:",
		protocol		: "Protokol:",
		upload			: "Učitavanje:",
		uploadSubmit	: "Pošalji poslužitelju",
		image			: "Umetni sliku",
		flash			: "Umetni fleš",
		form			: "Umetni obrazac",
		checkbox		: "Umetni kontrolnu kućicu",
		radio			: "Umetni kružni izbornik",
		textField		: "Umetni tekstno polje",
		textarea		: "Umetni tekstno područje",
		hiddenField		: "Umetni skriveno polje",
		button			: "Umetni gumb",
		select			: "Umetni odabrano polje",
		imageButton		: "Umetni gumb slike",
		notSet			: "<not set>",
		id				: "Id:",
		name			: "Ime:",
		langDir			: "Smjer jezika:",
		langDirLtr		: "S lijeva na desno (LTR)",
		langDirRtl		: "S desna na lijevo (RTL)",
		langCode		: "Šifra jezika:",
		longDescr		: "Dugi opis URL:",
		cssClass		: "Klase liste stila:",
		advisoryTitle	: "Savjetodavni naslov:",
		cssStyle		: "Stil:",
		ok				: "OK",
		cancel			: "Opoziv",
		close : "Zatvori",
		preview			: "Pregled:",
		generalTab		: "Općenito",
		advancedTab		: "Napredno",
		validateNumberFailed	: "Ova vrijednost nije broj.",
		confirmNewPage	: "Sve promjene ovog sadržaja koje nisu spremljene, bit će izgubljene. Jeste li sigurni da želite učitati novu stranicu?",
		confirmCancel	: "Neke od opcija su promijenjene. Jeste li sigurni da želite zatvoriti dijalog?",
		options : "Opcije",
		target			: "Cilj:",
		targetNew		: "Novi prozor (_blank)",
		targetTop		: "Najviši prozor (_top)",
		targetSelf		: "Isti prozor (_self)",
		targetParent	: "Nadređeni prozor (_parent)",
		advanced		: "Advanced",
		langDirLTR		: "Left to Right",
		langDirRTL		: "Right to Left",
		styles			: "Style",
		cssClasses		: "Stylesheet Classes",
		alignCenter	: "Poravnaj po sredini",
		align		: "Poravnaj:",
		alignLeft	: "Lijevo",
		alignBottom	: "Dno",
		alignMiddle	: "Sredina",
		alignRight	: "Desno",
		alignTop	: "Vrh",
		width	: "Širina:",
		height	: "Visina:",
		invalidHeight	: "Visina mora biti broj.",
		validateWidth : "Širina mora biti broj.",
		invalidCssLength	: "Value specified for the '%1' field must be a positive number with or without a valid CSS measurement unit (px, %, in, cm, mm, em, ex, pt, or pc).",
		invalidHtmlLength	: "Value specified for the '%1' field must be a positive number with or without a valid HTML measurement unit (px or %).",
		invalidInlineStyle	: "Value specified for the inline style must be one or multiple tuples with the form \"name : value\" which are separated by semi-colon.",
		cssLengthTooltip	: "Enter a number for a value in pixels or a number with a valid CSS unit (px, %, in, cm, mm, em, ex, pt, or pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, nedostupno</span>"
	},

	contextmenu :
	{
		options : "Opcije kontekstnog izbornika"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Poseban znak",
		title		: "Izaberite posebni znak",
		options : "Opcije posebnog znaka"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Umetnuti vezu",
		other 		: "<other>",
		menu		: "Urediti vezu",
		title		: "Veza",
		info		: "Informacija o vezi",
		target		: "Cilj",
		upload		: "Učitavanje:",
		advanced	: "Napredno",
		type		: "Tip veze:",
		toUrl		: "URL",
		toAnchor	: "Veza na sidro u tekstu",
		toEmail		: "E-pošta",
		targetFrame	: "<frame>",
		targetPopup	: "<popup window>",
		targetFrameName	: "Ime ciljnog okvira:",
		targetPopupName	: "Ime iskačućeg prozora:",
		popupFeatures	: "Karakteristike iskačućeg prozora:",
		popupResizable	: "Promjenjiva veličina",
		popupStatusBar	: "Statusna traka",
		popupLocationBar	: "Lokacijska traka",
		popupToolbar	: "Traka s alatima",
		popupMenuBar	: "Traka s izbornicima",
		popupFullScreen	: "Pun ekran (IE)",
		popupScrollBars	: "Klizna traka",
		popupDependent	: "Ovisan (Netscape)",
		popupWidth		: "Širina",
		popupLeft		: "Lijevi položaj",
		popupHeight		: "Visina",
		popupTop		: "Najviši položaj",
		id				: "Id:",
		langDir			: "Smjer jezika:",
		langDirLTR		: "S lijeva na desno",
		langDirRTL		: "S desna na lijevo",
		acccessKey		: "Pristupna tipka:",
		name			: "Ime:",
		langCode		: "Šifra jezika:",
		tabIndex		: "Kartični indeks:",
		advisoryTitle	: "Savjetodavni naslov:",
		advisoryContentType	: "Tip savjetodavnog sadržaja:",
		cssClasses		: "Klase liste stila:",
		charset			: "Povezani skup znakova resursa:",
		styles			: "Stil:",
		rel			: "Relationship",
		selectAnchor	: "Izaberite sidro",
		anchorName		: "Po imenu sidra",
		anchorId		: "Po ID-u elementa",
		emailAddress	: "Adresa e-pošte",
		emailSubject	: "Predmet poruke",
		emailBody		: "Tijelo poruke",
		noAnchors		: "(Nema dostupnih sidra u dokumentu)",
		noUrl			: "Molimo upišite vezu za URL",
		noEmail			: "Molimo upišite adresu e-pošte"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Umetni sidro",
		menu		: "Uređivanje sidra",
		title		: "Svojstva sidra",
		name		: "Ime sidra:",
		errorName	: "Molimo upišite ime sidra",
		remove		: "Remove Document Bookmark"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Numbered List Properties",
		bulletedTitle		: "Bulleted List Properties",
		type				: "Type",
		start				: "Start",
		validateStartNumber				:"List start number must be a whole number.",
		circle				: "Circle",
		disc				: "Disc",
		square				: "Square",
		none				: "None",
		notset				: "<not set>",
		armenian			: "Armenian numbering",
		georgian			: "Georgian numbering (an, ban, gan, etc.)",
		lowerRoman			: "Lower Roman (i, ii, iii, iv, v, etc.)",
		upperRoman			: "Upper Roman (I, II, III, IV, V, etc.)",
		lowerAlpha			: "Lower Alpha (a, b, c, d, e, etc.)",
		upperAlpha			: "Upper Alpha (A, B, C, D, E, etc.)",
		lowerGreek			: "Lower Greek (alpha, beta, gamma, etc.)",
		decimal				: "Decimal (1, 2, 3, etc.)",
		decimalLeadingZero	: "Decimal leading zero (01, 02, 03, etc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Nađi i zamijeni",
		find				: "Nađi",
		replace				: "Zamijeni",
		findWhat			: "Nađi:",
		replaceWith			: "Zamijeni s:",
		notFoundMsg			: "Navedeni tekst nije nađen.",
		findOptions			: "Find Options",
		matchCase			: "Upari slovo",
		matchWord			: "Upari cijelu riječ",
		matchCyclic			: "Uparuj ciklički",
		replaceAll			: "Zamijeni sve",
		replaceSuccessMsg	: "%1 zamijenjenih pojavljivanja"
	},

	// Table Dialog
	table :
	{
		toolbar		: "Umetnuti tablicu",
		title		: "Svojstva tablica",
		menu		: "Svojstva tablica",
		deleteTable	: "Briši tablicu",
		rows		: "Redovi:",
		columns		: "Stupci:",
		border		: "Veličina ruba:",
		align		: "Poravnaj:",
		alignLeft	: "Poravnaj nalijevo",
		alignCenter	: "Poravnaj po sredini",
		alignRight	: "Poravnaj desno",
		width		: "Širina:",
		widthPx		: "pikseli",
		widthPc		: "postotak",
		widthUnit	: "Jedinica širine:",
		height		: "Visina:",
		cellSpace	: "Prored ćelije:",
		cellPad		: "Punjenje ćelije:",
		caption		: "Naslov ekrana:",
		summary		: "Sažetak:",
		headers		: "Zaglavlja:",
		headersNone		: "Nijedno",
		headersColumn	: "Prvi stupac",
		headersRow		: "Prvi red",
		headersBoth		: "Oboje",
		invalidRows		: "Broj redova mora biti veći od 0.",
		invalidCols		: "Broj stupaca mora biti veći od 0.",
		invalidBorder	: "Veličina ruba mora biti broj.",
		invalidWidth	: "Širina tablice mora biti broj.",
		invalidHeight	: "Visina tablice mora biti broj.",
		invalidCellSpacing	: "Prored ćelije mora biti broj.",
		invalidCellPadding	: "Punjenje ćelije mora biti broj.",

		cell :
		{
			menu			: "Ćelija",
			insertBefore	: "Umetni ćeliju ispred",
			insertAfter		: "Umetni ćeliju nakon",
			deleteCell		: "Briši ćelije",
			merge			: "Spajaj ćelije",
			mergeRight		: "Spajaj desno",
			mergeDown		: "Spajaj dolje",
			splitHorizontal	: "Razdijeli ćeliju horizontalno",
			splitVertical	: "Razdijeli ćeliju vertikalno",
			title			: "Svojstva ćelija",
			cellType		: "Tip ćelije:",
			rowSpan			: "Protezanje redova:",
			colSpan			: "Protezanje stupaca:",
			wordWrap		: "Prelamanje riječi:",
			hAlign			: "Vodoravno poravnanje:",
			vAlign			: "Okomito poravnanje:",
			alignTop		: "Vrh",
			alignMiddle		: "Sredina",
			alignBottom		: "Dno",
			alignBaseline	: "Osnovna linija",
			bgColor			: "Boja pozadine:",
			borderColor		: "Boja ruba:",
			data			: "Podaci",
			header			: "Zaglavlje",
			yes				: "Da",
			no				: "Ne",
			invalidWidth	: "Širina ćelije mora biti broj.",
			invalidHeight	: "Visina ćelije mora biti broj.",
			invalidRowSpan	: "Protezanje redova mora biti broj.",
			invalidColSpan	: "Protezanje stupaca mora biti broj.",
			chooseColor : "Izaberite"
		},

		row :
		{
			menu			: "Red",
			insertBefore	: "Umetni red ispred",
			insertAfter		: "Umetni red nakon",
			deleteRow		: "Briši redove"
		},

		column :
		{
			menu			: "Stupac",
			insertBefore	: "Umetni stupac ispred",
			insertAfter		: "Umetni stupac nakon",
			deleteColumn	: "Briši stupce"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Svojstva gumba",
		text		: "Tekst (vrijednost):",
		type		: "Tip:",
		typeBtn		: "Gumb",
		typeSbm		: "Slanje",
		typeRst		: "Reset"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Svojstva kontrolne kućice",
		radioTitle	: "Svojstva kružnog izbornika",
		value		: "Vrijednost:",
		selected	: "Izabrano"
	},

	// Form Dialog.
	form :
	{
		title		: "Umetni obrazac",
		menu		: "Svojstva obrasca",
		action		: "Akcija:",
		method		: "Metoda:",
		encoding	: "Kodiranje:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Izaberite svojstva polja",
		selectInfo	: "Izaberite informaciju",
		opAvail		: "Raspoložive opcije",
		value		: "Vrijednost:",
		size		: "Veličina:",
		lines		: "linije",
		chkMulti	: "Dozvolite višestruk izbor",
		opText		: "Tekst:",
		opValue		: "Vrijednost:",
		btnAdd		: "Dodaj",
		btnModify	: "Promijeni",
		btnUp		: "Gore",
		btnDown		: "Dolje",
		btnSetValue : "Postavi izabranu vrijednost",
		btnDelete	: "Briši"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Svojstva područja teksta",
		cols		: "Stupci:",
		rows		: "Redovi:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Svojstva tekstualnih polja",
		name		: "Ime:",
		value		: "Vrijednost:",
		charWidth	: "Širina znaka:",
		maxChars	: "Maksimum znakova:",
		type		: "Tip:",
		typeText	: "Tekst",
		typePass	: "Lozinka"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Svojstva skrivenog polja",
		name	: "Ime:",
		value	: "Vrijednost:"
	},

	// Image Dialog.
	image :
	{
		title		: "Svojstva slike",
		titleButton	: "Svojstva gumba slike",
		menu		: "Svojstva slike",
		infoTab	: "Informacije o slici",
		btnUpload	: "Pošalji na poslužitelj",
		upload	: "Učitaj",
		alt		: "Alternativni tekst:",
		width		: "Širina:",
		height	: "Visina:",
		lockRatio	: "Zaključaj omjer",
		unlockRatio	: "Otključaj omjer",
		resetSize	: "Reset veličine",
		border	: "Rub:",
		hSpace	: "Vodoravni razmak:",
		vSpace	: "Okomiti razmak:",
		align		: "Poravnaj:",
		alignLeft	: "Lijevo",
		alignRight	: "Desno",
		alertUrl	: "Molimo, unesite URL slike",
		linkTab	: "Veza",
		button2Img	: "Želite li pretvoriti izabrani gumb slike u jednostavnu sliku?",
		img2Button	: "Želite li pretvoriti izabranu sliku u gumb slike?",
		urlMissing : "Nedostaje URL izvora slike.",
		validateWidth : "Širina mora biti cijeli broj.",
		validateHeight : "Visina mora biti cijeli broj.",
		validateBorder : "Rub mora biti cijeli broj.",
		validateHSpace : "Vodoravni razmak mora biti cijeli broj.",
		validateVSpace : "Okomiti razmak mora biti cijeli broj."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Svojstva fleša",
		propertiesTab	: "Svojstva",
		title		: "Svojstva fleša",
		chkPlay		: "Auto igra",
		chkLoop		: "Petlja",
		chkMenu		: "Omogući fleš izbornik",
		chkFull		: "Dozvoli cjelovit ekran",
 		scale		: "Skala:",
		scaleAll		: "Pokaži sve",
		scaleNoBorder	: "Bez ruba",
		scaleFit		: "Točno podešen",
		access			: "Pristup skripta:",
		accessAlways	: "Uvijek",
		accessSameDomain	: "Ista domena",
		accessNever	: "Nikad",
		align		: "Poravnaj:",
		alignLeft	: "Lijevo",
		alignAbsBottom: "Aps dno",
		alignAbsMiddle: "Aps sredina",
		alignBaseline	: "Osnovna linija",
		alignBottom	: "Dno",
		alignMiddle	: "Sredina",
		alignRight	: "Desno",
		alignTextTop	: "Vrh teksta",
		alignTop	: "Vrh",
		quality		: "Kvaliteta:",
		qualityBest	: "Najbolje",
		qualityHigh	: "Visoko",
		qualityAutoHigh	: "Auto visoko",
		qualityMedium	: "Srednje",
		qualityAutoLow	: "Auto nisko",
		qualityLow	: "Nisko",
		windowModeWindow	: "Prozor",
		windowModeOpaque	: "Mutno",
		windowModeTransparent	: "Prozirno",
		windowMode	: "Način prozora:",
		flashvars	: "Varijable:",
		bgcolor	: "Boja pozadine:",
		width	: "Širina:",
		height	: "Visina:",
		hSpace	: "Vodoravni razmak:",
		vSpace	: "Okomiti razmak:",
		validateSrc : "URL ne smije biti prazan.",
		validateWidth : "Širina mora biti broj.",
		validateHeight : "Visina mora biti broj.",
		validateHSpace : "Vodoravni razmak mora biti broj.",
		validateVSpace : "Okomiti razmak mora biti broj."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Provjera pravopisa",
		title			: "Provjera pravopisa",
		notAvailable	: "Oprostite, usluga je sada nedostupna.",
		errorLoading	: "Greška kod učitavanja uslužnog hosta aplikacije: %s.",
		notInDic		: "Nije u rječniku",
		changeTo		: "Promijeni u",
		btnIgnore		: "Zanemari",
		btnIgnoreAll	: "Zanemari sve",
		btnReplace		: "Zamijeni",
		btnReplaceAll	: "Zamijeni sve",
		btnUndo			: "Poništi",
		noSuggestions	: "- Bez prijedloga -",
		progress		: "Provjera pravopisa u toku...",
		noMispell		: "Provjera pravopisa dovršena: Nije nađen pogrešan napis",
		noChanges		: "Provjera pravopisa dovršena: Nijedna riječ nije promijenjena",
		oneChange		: "Provjera pravopisa dovršena: Jedna riječ je promijenjena",
		manyChanges		: "Provjera pravopisa dovršena: %1 riječi promijenjeno",
		ieSpellDownload	: "Provjera pravopisa nije instalirana. Želite li je sada preuzeti?"
	},

	smiley :
	{
		toolbar	: "Umetni simbole za osjećaje",
		title	: "Simboli za osjećaje",
		options : "Opcije simbola za osjećaje"
	},

	elementsPath :
	{
		eleLabel : "Staza elemenata",
		eleTitle : "%1 element"
	},

	numberedlist : "Brojevi",
	bulletedlist : "Oznake",
	indent : "Uvlačenje odlomaka",
	outdent : "Izvlaka",

	justify :
	{
		left : "Poravnaj nalijevo",
		center : "Poravnaj po sredini",
		right : "Poravnaj desno",
		block : "Poravnano poravnaj"
	},

	blockquote : "Navodnik bloka",

	clipboard :
	{
		title		: "Zalijepi",
		cutError	: "Sigurnosne postavke vašeg pretražitelja sprečavaju automatsko rezanje. U zamjenu koristite Ctrl+X na vašoj tipkovnici.",
		copyError	: "Postavke sigurnosti vašeg pretražitelja sprječavaju automatsko kopiranje. U zamjenu koristite Ctrl+C na vašoj tipkovnici.",
		pasteMsg	: "Pritisnite Ctrl+V (Cmd+V na MAC-u) da dolje zalijepite.",
		securityMsg	: "Sigurnost vašeg pretražitelja blokira izravno lijepljenje iz memorije za isječke.",
		pasteArea	: "Zalijepi područje"
	},

	pastefromword :
	{
		confirmCleanup	: "Tekst koji želite zalijepiti izgleda da je kopiran iz Worda. Da li ga želite brisati prije lijepljena?",
		toolbar			: "Zalijepiti posebno",
		title			: "Zalijepiti posebno",
		error			: "Nije moguće očistiti zalijepljene podatke radi interne greške"
	},

	pasteText :
	{
		button	: "Zalijepi kao obični tekst",
		title	: "Zalijepiti kao obični tekst"
	},

	templates :
	{
		button 			: "Predlošci",
		title : "Predlošci sa sadržajem",
		options : "Opcije predloška",
		insertOption: "Zamijeni stvarni sadržaj",
		selectPromptMsg: "Izaberite predložak za otvaranje editora",
		emptyListMsg : "(Nema definiranih predložaka)"
	},

	showBlocks : "Pokaži blokove",

	stylesCombo :
	{
		label		: "Stilske pojave",
		panelTitle 	: "Stilske pojave",
		panelTitle1	: "Stilovi blokova",
		panelTitle2	: "Stilovi istoj razini",
		panelTitle3	: "Stilovi objekata"
	},

	format :
	{
		label		: "Format",
		panelTitle	: "Format odlomka",

		tag_p		: "Normalno",
		tag_pre		: "Formatirano",
		tag_address	: "Adresa",
		tag_h1		: "Naslov 1",
		tag_h2		: "Naslov 2",
		tag_h3		: "Naslov 3",
		tag_h4		: "Naslov 4",
		tag_h5		: "Naslov 5",
		tag_h6		: "Naslov 6",
		tag_div		: "Normalno (DIV)"
	},

	div :
	{
		title				: "Kreiranje Div spremnika",
		toolbar				: "Kreiranje Div spremnika",
		cssClassInputLabel	: "Klase lista stilova",
		styleSelectLabel	: "Stil",
		IdInputLabel		: "Id",
		languageCodeInputLabel	: " Šifra jezika",
		inlineStyleInputLabel	: "Stil u istoj razini",
		advisoryTitleInputLabel	: "Savjetodavni naslov",
		langDirLabel		: "Smjer jezika",
		langDirLTRLabel		: "S lijeva na desno (LTR)",
		langDirRTLLabel		: "S desna na lijevo (RTL)",
		edit				: "Uredi Div",
		remove				: "Ukloni Div"
  	},

	iframe :
	{
		title		: 'iFrame Properties',
		toolbar		: 'iFrame',
		noUrl		: 'Please type the iFrame URL',
		scrolling	: 'Enable scrollbars',
		border		: 'Show frame border'
	},

	font :
	{
		label		: "Font",
		voiceLabel	: "Font",
		panelTitle	: "Ime fonta"
	},

	fontSize :
	{
		label		: "Veličina",
		voiceLabel	: "Veličina fonta",
		panelTitle	: "Veličina fonta"
	},

	colorButton :
	{
		textColorTitle	: "Boja teksta",
		bgColorTitle	: "Boja pozadine",
		panelTitle		: "Boje",
		auto			: "Automatski",
		more			: "Još boja..."
	},

	colors :
	{
		"000" : "Crna",
		"800000" : "Kestenjasta",
		"8B4513" : "Srednje smeđa",
		"2F4F4F" : "Tamno škriljevac siva",
		"008080" : "Srednje plavo zelena",
		"000080" : "Mornarsko plava",
		"4B0082" : "Indigo",
		"696969" : "Mutno siva",
		"B22222" : "Boja cigle",
		"A52A2A" : "Smeđa",
		"DAA520" : "Tamnije zlatna",
		"006400" : "Tamno zelena",
		"40E0D0" : "Tirkizna",
		"0000CD" : "Srednje plava",
		"800080" : "Grimizna",
		"808080" : "Siva",
		"F00" : "Crvena",
		"FF8C00" : "Tamno narančasta",
		"FFD700" : "Zlatna",
		"008000" : "Zelena",
		"0FF" : "Modra",
		"00F" : "Plava",
		"EE82EE" : "Ljubičasta",
		"A9A9A9" : "Tamno siva",
		"FFA07A" : "Svjetlo ružičasto žuta",
		"FFA500" : "Narančasta",
		"FFFF00" : "Žuta",
		"00FF00" : "Boja limete",
		"AFEEEE" : "Blijedo tirkizna",
		"ADD8E6" : "Svjetlo plava",
		"DDA0DD" : "Tamnoljubičasta",
		"D3D3D3" : "Svjetlo siva",
		"FFF0F5" : "Boja cvijeta lavande",
		"FAEBD7" : "Antička bijela",
		"FFFFE0" : "Svjetlo žuta",
		"F0FFF0" : "Pastelna proljetno zelena",
		"F0FFFF" : "Azurna",
		"F0F8FF" : "Alice plava",
		"E6E6FA" : "Lavanda",
		"FFF" : "Bijela"
	},

	scayt :
	{
		title			: "Provjera pravopisa za vrijeme upisivanja",
		opera_title		: "Not supported by Opera",
		enable			: "Omogući SCAYT",
		disable			: "Onemogući SCAYT",
		about			: "O SCAYT-u",
		toggle			: "Prebaci SCAYT",
		options			: "Opcije",
		langs			: "Jezici",
		moreSuggestions	: "Još prijedloga",
		ignore			: "Zanemari",
		ignoreAll		: "Zanemari sve",
		addWord			: "Dodaj riječ",
		emptyDic		: "Ime rječnika ne smije biti prazno.",

		optionsTab		: "Opcije",
		allCaps			: "Ignore All-Caps Words",
		ignoreDomainNames : "Ignore Domain Names",
		mixedCase		: "Ignore Words with Mixed Case",
		mixedWithDigits	: "Ignore Words with Numbers",

		languagesTab	: "Jezici",

		dictionariesTab	: "Rječnici",
		dic_field_name	: "Dictionary name",
		dic_create		: "Create",
		dic_restore		: "Restore",
		dic_delete		: "Delete",
		dic_rename		: "Rename",
		dic_info		: "Initially the User Dictionary is stored in a Cookie. However, Cookies are limited in size. When the User Dictionary grows to a point where it cannot be stored in a Cookie, then the dictionary may be stored on our server. To store your personal dictionary on our server you should specify a name for your dictionary. If you already have a stored dictionary, please type it\'s name and click the Restore button.",

		aboutTab		: "About"
	},

	about :
	{
		title		: "O CKEditor-u",
		dlgTitle	: "O CKEditor-u",
		help	: "Check $1 for help.",
		userGuide : "CKEditor User's Guide",
		moreInfo	: "Za informacije o licenciranju, molimo, posjetite našu Web stranicu:",
		copy		: "Autorsko pravo &copy; $1. Sva prava pridržana."
	},

	maximize : "Maksimirati",
	minimize : "Minimizirati",

	fakeobjects :
	{
		anchor	: "Sidro",
		flash	: "Animacija fleša",
		iframe		: 'iFrame',
		hiddenfield	: 'Hidden Field',
		unknown	: "Nepoznat objekt"
	},

	resize : "Povuci da bi se promijenila veličina",

	colordialog :
	{
		title		: "Izaberite boju",
		options	:	"Color Options",
		highlight	: "Osvijetliti",
		selected	: "Izabrano",
		clear		: "Očisti"
	},

	toolbarCollapse	: "Smanjiti traku s alatima",
	toolbarExpand	: "Proširiti traku s alatima",

	toolbarGroups :
	{
		document : "Document",
		clipboard : "Clipboard/Undo",
		editing : "Editing",
		forms : "Forms",
		basicstyles : "Basic Styles",
		paragraph : "Paragraph",
		links : "Links",
		insert : "Insert",
		styles : "Styles",
		colors : "Colors",
		tools : "Tools"
	},

	bidi :
	{
		ltr :"Text direction from left to right",
		rtl : "Text direction from right to left"
	},

	docprops :
	{
		label : "Document Properties",
		title : "Document Properties",
		design : "Design",
		meta : "Meta Tags",
		chooseColor : "Choose",
		other : "Other...",
		docTitle :	"Page Title",
		charset : 	"Character Set Encoding",
		charsetOther : "Other Character Set Encoding",
		charsetASCII : "ASCII",
		charsetCE : "Central European",
		charsetCT : "Chinese Traditional (Big5)",
		charsetCR : "Cyrillic",
		charsetGR : "Greek",
		charsetJP : "Japanese",
		charsetKR : "Korean",
		charsetTR : "Turkish",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Western European",
		docType : "Document Type Heading",
		docTypeOther : "Other Document Type Heading",
		xhtmlDec : "Include XHTML Declarations",
		bgColor : "Background Color",
		bgImage : "Background Image URL",
		bgFixed : "Non-scrolling (Fixed) Background",
		txtColor : "Text Color",
		margin : "Page Margins",
		marginTop : "Top",
		marginLeft : "Left",
		marginRight : "Right",
		marginBottom : "Bottom",
		metaKeywords : "Document Indexing Keywords (comma separated)",
		metaDescription : "Document Description",
		metaAuthor : "Author",
		metaCopyright : "Copyright",
		previewHtml : "<p>This is some <strong>sample text</strong>. You are using <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{
		common :
		{
			widthIn	: "inches",
			widthCm	: "centimeters",
			widthMm	: "millimeters",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "points",
			widthPc	: "picas",
			required : "Required"
		},
		table :
		{
			createTable : 'Create Table',
			heightUnit	: "Height unit:",
			insertMultipleRows : "Insert Rows",
			insertMultipleCols : "Insert Columns",
			noOfRows : "Number of Rows:",
			noOfCols : "Number of Columns:",
			insertPosition : "Position:",
			insertBefore : "Before",
			insertAfter : "After",
			selectTable : "Select Table",
			selectRow : "Select Row",
			columnTitle : "Column",
			colProps : "Column Properties",
			invalidColumnWidth	: "Column width must be a positive number.",
			fixedColWidths : "Fixed Column Widths"
		},
		cell :
		{
			title : "Cell"
		},
		colordialog :
		{
			currentColor	: "Current color"
		},
		emoticon :
		{
			angel		: "Anđeo",
			angry		: "Ljutnja",
			cool		: "Spokojan",
			crying		: "Plačući",
			eyebrow		: "Obrva",
			frown		: "Namršten",
			goofy		: "Budalast",
			grin		: "Nasmiješen",
			half		: "Napola",
			idea		: "Zamisao",
			laughing	: "Smijanje",
			laughroll	: "Valjanje od smijeha",
			no			: "Ne",
			oops		: "Ajoj",
			shy			: "Stidljiv",
			smile		: "Nasmiješen",
			tongue		: "Jezik",
			wink		: "Namigivanje",
			yes			: "Da"
		},

		menu :
		{
			link	: "Insert Link",
			list	: "Ispis",
			paste	: "Zalijepi",
			action	: "Akcija",
			align	: "Poravnavanje",
			emoticon: "Simbol za osjećaj"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Numbered List",
			bulletedTitle		: "Bulleted List",
			description		: "Settings will be applied to the entire list",
			fontsize			: "Font size:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Type a descriptive bookmark name, such as 'Section 1.2'. After inserting the bookmark, click either the 'Link' or 'Document Bookmark Link' icon to link to it.",
			title		: "Document Bookmark Link",
			linkTo		: "Link to:"
		},

		urllink :
		{
			title : "URL Link",
			linkText : "Link Text:",
			selectAnchor: "Select an Anchor:",
			nourl: "Molimo, unesite URL u tekstno polje.",
			urlhelp: "Upišite ili zalijepite URL za otvaranje kad korisnici kliknu ovu vezu, na primjer  http://www.example.com.",
			displaytxthelp: "Upišite prikaz teksta za vezu.",
			openinnew : "Otvorite vezu u novom prozoru"
		},

		spellchecker :
		{
			title : "Provjera sricanja",
			replace : "Zamjena:",
			suggesstion : "Prijedlozi:",
			withLabel : "Sa:",
			replaceButton : "Zamijeni",
			replaceallButton:"Zamijeni sve",
			skipButton:"Preskoči",
			skipallButton: "Preskoči sve",
			undochanges: "Poništi promjene",
			complete: "Dovršena je provjera pravopisa",
			problem: "Problem kod dohvaćanja XML podataka",
			addDictionary: "Dodaj u rječnik",
			editDictionary: "Uredi rječnik"
		},

		status :
		{
			keystrokeForHelp: "Press ALT 0 for help"
		},

		linkdialog :
		{
			label : "Veza na dijalog"
		},

		imagedatauri :
		{
			error : "Pasting images that use data URIs is currently not supported. Please use the \'Insert Image\' toolbar option to embed the image instead."
		},

		image :
		{
			previewText : "Tekst će teći okolo slike koju dodajete kao u ovom primjeru. ",
			fileUpload : "Select an image file from your computer:"
		}
	}

};
