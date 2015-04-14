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

CKEDITOR.lang["sk"] =
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
	editorTitle : "Editor formátovaného textu, %1, pomoc zobrazíte stlačením kombinácie klávesov Alt + 0.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Lišty nástrojov editora",
	editor	: "Editor formátovaného textu",

	// Toolbar buttons without dialogs.
	source			: "Zdroj",
	newPage			: "Nová stránka",
	save			: "Uložiť",
	preview			: "Ukážka:",
	cut				: "Vystrihnúť",
	copy			: "Kopírovať",
	paste			: "Vložiť",
	print			: "Tlač",
	underline		: "Podčiarknuté",
	bold			: "Tučné",
	italic			: "Kurzíva",
	selectAll		: "Vybrať všetko",
	removeFormat	: "Odstrániť formátovanie",
	strike			: "Prečiarknutie",
	subscript		: "Dolný index",
	superscript		: "Horný index",
	horizontalrule	: "Vložiť vodorovnú čiaru",
	pagebreak		: "Vložiť oddeľovač stránky",
	pagebreakAlt		: "Oddeľovač stránky",
	unlink			: "Odstrániť odkaz",
	undo			: "Späť",
	redo			: "Znova vykonať",

	// Common messages and labels.
	common :
	{
		browseServer	: "Prehľadať server:",
		url				: "Adresa URL:",
		protocol		: "Protokol:",
		upload			: "Odoslať:",
		uploadSubmit	: "Odoslať na server",
		image			: "Vložiť obrázok",
		flash			: "Vložiť animáciu Flash",
		form			: "Vložiť formulár",
		checkbox		: "Vložiť začiarkavacie políčko",
		radio			: "Vložiť prepínač",
		textField		: "Vložiť textové pole",
		textarea		: "Vložiť textovú oblasť",
		hiddenField		: "Vložiť skryté pole",
		button			: "Vložiť tlačidlo",
		select			: "Vložiť výberové pole",
		imageButton		: "Vložiť tlačidlo s obrázkom",
		notSet			: "<nenastavené>",
		id				: "ID:",
		name			: "Názov:",
		langDir			: "Orientácia jazyka:",
		langDirLtr		: "Zľava doprava",
		langDirRtl		: "Sprava doľava",
		langCode		: "Kód jazyka:",
		longDescr		: "Dlhý opis adresy URL:",
		cssClass		: "Triedy šablón so štýlmi:",
		advisoryTitle	: "Pomocný nadpis:",
		cssStyle		: "Štýl:",
		ok				: "OK",
		cancel			: "Zrušiť",
		close : "Zatvoriť",
		preview			: "Ukážka:",
		generalTab		: "Všeobecné",
		advancedTab		: "Rozšírené",
		validateNumberFailed	: "Táto hodnota nie je číslo.",
		confirmNewPage	: "Prídete o všetky neuložené zmeny v obsahu. Naozaj chcete načítať novú stránku?",
		confirmCancel	: "Zmenili sa niektoré voľby. Naozaj chcete zatvoriť dialógové okno?",
		options : "Možnosti",
		target			: "Cieľ:",
		targetNew		: "Nové okno (_blank)",
		targetTop		: "Najvyššie okno (_top)",
		targetSelf		: "Rovnaké okno (_self)",
		targetParent	: "Rodičovské okno (_parent)",
		langDirLTR		: "Zľava doprava",
		langDirRTL		: "Sprava doľava",
		styles			: "Štýl:",
		cssClasses		: "Triedy hárka štýlov:",
		width			: "Šírka:",
		height			: "Výška:",
		align			: "Zarovnanie:",
		alignLeft		: "Vľavo",
		alignRight		: "Vpravo",
		alignCenter		: "Na stred",
		alignTop		: "Vrch",
		alignMiddle		: "Stred",
		alignBottom		: "Spodok",
		invalidHeight	: "Výška musí byť kladné celé číslo.",
		invalidWidth	: "Šírka musí byť kladné celé číslo.",
		invalidCssLength	: "Hodnota zadaná v poli '%1' musí byť kladné číslo s alebo bez platnej mernej jednotky CSS (px, %, in, cm, mm, em, ex, pt alebo pc).",
		invalidHtmlLength	: "Hodnota zadaná v poli '%1' musí byť kladné číslo s alebo bez platnej mernej jednotky HTML (px alebo %).",
		invalidInlineStyle	: "Hodnota zadaná pre štýl vloženia musí obsahovať jednu alebo viac usporiadaných párov vo formáte \"názov : hodnota\" oddelených bodkočiarkou.",
		cssLengthTooltip	: "Zadajte číslo pre hodnotu v pixloch alebo číslo s platnou jednotkou CSS (px, %, in, cm, mm, em, ex, pt alebo pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, nedostupné</span>"
	},

	contextmenu :
	{
		options : "Možnosti kontextovej ponuky"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Vložiť špeciálny znak",
		title		: "Špeciálny znak",
		options : "Možnosti špeciálneho znaku"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Prepojenie na adresu URL",
		other 		: "<iné>",
		menu		: "Upraviť prepojenie",
		title		: "Prepojenie",
		info		: "Informácie o prepojení",
		target		: "Cieľ",
		upload		: "Odoslať:",
		advanced	: "Rozšírené",
		type		: "Typ prepojenia:",
		toUrl		: "Adresa URL",
		toAnchor	: "Odkaz na kotvu v tomto texte",
		toEmail		: "E-mail",
		targetFrame	: "<rámec>",
		targetPopup	: "<vyskakovacie okno>",
		targetFrameName	: "Názov cieľového rámca:",
		targetPopupName	: "Názov vyskakovacieho okna:",
		popupFeatures	: "Vlastnosti vyskakovacieho okna:",
		popupResizable	: "Možnosť meniť veľkosť",
		popupStatusBar	: "Stavová lišta",
		popupLocationBar	: "Panel umiestnenia",
		popupToolbar	: "Lišta nástrojov",
		popupMenuBar	: "Ponuková lišta",
		popupFullScreen	: "Celá obrazovka (IE)",
		popupScrollBars	: "Posuvné lišty",
		popupDependent	: "Závislosť (Netscape)",
		popupLeft		: "Ľavý okraj",
		popupTop		: "Horný okraj",
		id				: "ID:",
		langDir			: "Orientácia jazyka:",
		langDirLTR		: "Zľava doprava",
		langDirRTL		: "Sprava doľava",
		acccessKey		: "Prístupový kláves:",
		name			: "Názov:",
		langCode		: "Kód jazyka:",
		tabIndex		: "Index karty:",
		advisoryTitle	: "Pomocný nadpis:",
		advisoryContentType	: "Pomocný typ obsahu:",
		cssClasses		: "Triedy šablón so štýlmi:",
		charset			: "Množina znakov prepojeného prostriedku:",
		styles			: "Štýl:",
		rel			: "Vzťah",
		selectAnchor	: "Vybrať kotvu",
		anchorName		: "Podľa názvu kotvy",
		anchorId		: "Podľa ID elementu",
		emailAddress	: "E-mailová adresa",
		emailSubject	: "Predmet správy",
		emailBody		: "Telo správy",
		noAnchors		: "V dokumente nie sú k dispozícii žiadne záložky. Ak chcete nejakú pridať, v lište nástrojov kliknite na ikonu 'Vložiť záložku dokumentu'.",
		noUrl			: "Zadajte adresu URL prepojenia",
		noEmail			: "Zadajte e-mailovú adresu"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Vložiť záložku dokumentu",
		menu		: "Upraviť záložku dokumentu",
		title		: "Záložka dokumentu",
		name		: "Názov:",
		errorName	: "Zadajte názov záložky dokumentu",
		remove		: "Odstrániť záložku dokumentu"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Vlastnosti číslovaného zoznamu",
		bulletedTitle		: "Vlastnosti zoznamu s odrážkami",
		type				: "Štýl zoznamu:",
		start				: "Začať:",
		validateStartNumber				:"Začiatočné číslo zoznamu musí byť celé číslo.",
		circle				: "Kruh",
		disc				: "Kruh s výplňou",
		square				: "Štvorec",
		none				: "Žiadne",
		notset				: "<nenastavené>",
		armenian			: "Arménske číslovanie",
		georgian			: "Gruzínske číslovanie (an, ban, gan, atď.)",
		lowerRoman			: "Malé rímske číslice (i, ii, iii, iv, v, atď.)",
		upperRoman			: "Veľké rímske číslice (I, II, III, IV, V, atď.)",
		lowerAlpha			: "Malé abecedné znaky (a, b, c, d, e, atď.)",
		upperAlpha			: "Veľké abecedné znaky (A, B, C, D, E, atď.)",
		lowerGreek			: "Malé grécke písmená (alfa, beta, gama, atď.)",
		decimal				: "Desiatkové číslice (1, 2, 3, atď.)",
		decimalLeadingZero	: "Desiatkové číslice s úvodnou nulou (01, 02, 03, atď.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Nájsť a nahradiť",
		find				: "Nájsť",
		replace				: "Nahradiť",
		findWhat			: "Vyhľadať:",
		replaceWith			: "Nahradiť čím:",
		notFoundMsg			: "Zadaný text sa nenašiel.",
		findOptions			: "Voľby hľadania",
		matchCase			: "Rozlišovať veľkosť písmen",
		matchWord			: "Len celé slová",
		matchCyclic			: "Hľadať cyklicky",
		replaceAll			: "Nahradiť všetko",
		replaceSuccessMsg	: "Počet nahradených výskytov: %1."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Vložiť tabuľku",
		title		: "Tabuľka",
		menu		: "Vlastnosti tabuľky",
		deleteTable	: "Vymazať tabuľku",
		rows		: "Riadky:",
		columns		: "Stĺpce:",
		border		: "Šírka ohraničenia:",
		widthPx		: "pixely",
		widthPc		: "percentá",
		widthUnit	: "Jednotka šírky:",
		cellSpace	: "Rozstup buniek:",
		cellPad		: "Výplň buniek:",
		caption		: "Nadpis:",
		summary		: "Súhrn:",
		headers		: "Hlavičky:",
		headersNone		: "Žiadne",
		headersColumn	: "Prvý stĺpec",
		headersRow		: "Prvý riadok",
		headersBoth		: "Oboje",
		invalidRows		: "Počet riadkov musí byť celé číslo väčšie ako nula.",
		invalidCols		: "Počet stĺpcov musí byť celé číslo väčšie ako nula.",
		invalidBorder	: "Hrúbka okraja musí byť kladné číslo.",
		invalidWidth	: "Šírka tabuľky musí byť kladné číslo.",
		invalidHeight	: "Výška tabuľky musí byť kladné číslo.",
		invalidCellSpacing	: "Rozstupy buniek musí byť kladné číslo.",
		invalidCellPadding	: "Odsadenie obsahu buniek musí byť kladné číslo.",

		cell :
		{
			menu			: "Bunka",
			insertBefore	: "Vložiť bunku pred",
			insertAfter		: "Vložiť bunku za",
			deleteCell		: "Vymazať bunky",
			merge			: "Zlúčiť bunky",
			mergeRight		: "Zlúčiť doprava",
			mergeDown		: "Zlúčiť nadol",
			splitHorizontal	: "Rozdeliť bunku horizontálne",
			splitVertical	: "Rozdeliť bunku vertikálne",
			title			: "Vlastnosti bunky",
			cellType		: "Typ bunky:",
			rowSpan			: "Spojenie riadkov:",
			colSpan			: "Spojenie stĺpcov:",
			wordWrap		: "Zalomiť slová:",
			hAlign			: "Vodorovné zarovnanie:",
			vAlign			: "Zvislé zarovnanie:",
			alignBaseline	: "Základná čiara",
			bgColor			: "Farba pozadia:",
			borderColor		: "Farba rámika:",
			data			: "Údaje",
			header			: "Hlavička",
			yes				: "Áno",
			no				: "Nie",
			invalidWidth	: "Šírka bunky musí byť kladné číslo.",
			invalidHeight	: "Výška bunky musí byť kladné číslo.",
			invalidRowSpan	: "Rozpätie riadkov musí byť kladné celé číslo.",
			invalidColSpan	: "Rozpätie stĺpcov musí byť kladné celé číslo.",
			chooseColor 	: "Viac farieb..."
		},

		row :
		{
			menu			: "Riadok",
			insertBefore	: "Vložiť riadok pred",
			insertAfter		: "Vložiť riadok za",
			deleteRow		: "Vymazať riadky"
		},

		column :
		{
			menu			: "Stĺpec",
			insertBefore	: "Vložiť stĺpec pred",
			insertAfter		: "Vložiť stĺpec za",
			deleteColumn	: "Vymazať stĺpce"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Vlastnosti tlačidla",
		text		: "Text (hodnota):",
		type		: "Typ:",
		typeBtn		: "Tlačidlo",
		typeSbm		: "Odoslať",
		typeRst		: "Vynulovať"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Vlastnosti začiarkavacieho políčka",
		radioTitle	: "Vlastnosti prepínača",
		value		: "Hodnota:",
		selected	: "Vybratá"
	},

	// Form Dialog.
	form :
	{
		title		: "Vložiť formulár",
		menu		: "Vlastnosti formulára",
		action		: "Akcia:",
		method		: "Metóda:",
		encoding	: "Kódovanie:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Vlastnosti výberového poľa",
		selectInfo	: "Informácie o výbere",
		opAvail		: "Dostupné voľby",
		value		: "Hodnota:",
		size		: "Veľkosť:",
		lines		: "riadkov",
		chkMulti	: "Povoliť viacnásobný výber",
		opText		: "Text:",
		opValue		: "Hodnota:",
		btnAdd		: "Pridať",
		btnModify	: "Upraviť",
		btnUp		: "Nahor",
		btnDown		: "Nadol",
		btnSetValue : "Nastaviť ako vybratú hodnotu",
		btnDelete	: "Vymazať"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Vlastnosti textovej oblasti",
		cols		: "Stĺpce:",
		rows		: "Riadky:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Vlastnosti textového poľa",
		name		: "Názov:",
		value		: "Hodnota:",
		charWidth	: "Šírka v znakoch:",
		maxChars	: "Maximálny počet znakov:",
		type		: "Typ:",
		typeText	: "Text",
		typePass	: "Heslo"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Vlastnosti skrytého poľa",
		name	: "Názov:",
		value	: "Hodnota:"
	},

	// Image Dialog.
	image :
	{
		title		: "Obrázok",
		titleButton	: "Vlastnosti tlačidla s obrázkom",
		menu		: "Vlastnosti obrázka",
		infoTab	: "Informácie o obrázku",
		btnUpload	: "Odoslať obrázok",
		upload	: "Odoslať",
		alt		: "Alternatívny text:",
		lockRatio	: "Zamknúť pomer strán",
		resetSize	: "Obnoviť veľkosť",
		border	: "Orámovanie:",
		hSpace	: "Vodorovné odsadenie:",
		vSpace	: "Zvislé odsadenie:",
		alertUrl	: "Zadajte adresu URL obrázka",
		linkTab	: "Prepojenie",
		button2Img	: "Chcete transformovať vybraté obrázkové tlačidlo na obyčajný obrázok?",
		img2Button	: "Chcete transformovať vybratý obrázok na obrázkové tlačidlo?",
		urlMissing : "Chýba zdrojová adresa URL obrázka.",
		validateBorder : "Ohraničenie musí byť kladné celé číslo.",
		validateHSpace : "Vodorovný odstup musí byť kladné celé číslo.",
		validateVSpace : "Zvislý odstup musí byť kladné celé číslo."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Vlastnosti elementu Flash",
		propertiesTab	: "Vlastnosti",
		title		: "Animácia Flash",
		chkPlay		: "Automatické prehrávanie",
		chkLoop		: "Prehrávať v slučke",
		chkMenu		: "Povoliť ponuku programu Flash",
		chkFull		: "Povoliť prehrávanie na celej obrazovke",
 		scale		: "Mierka:",
		scaleAll		: "Zobraziť všetko",
		scaleNoBorder	: "Bez okraja",
		scaleFit		: "Prispôsobiť",
		access			: "Prístup k skriptom:",
		accessAlways	: "Vždy",
		accessSameDomain	: "Rovnaká doména",
		accessNever	: "Nikdy",
		alignAbsBottom: "Abs. spodok",
		alignAbsMiddle: "Abs. stred",
		alignBaseline	: "Základná čiara",
		alignTextTop	: "Vrch textu",
		quality		: "Kvalita:",
		qualityBest	: "Najvyššia",
		qualityHigh	: "Vysoká",
		qualityAutoHigh	: "Automaticky vysoká",
		qualityMedium	: "Stredná",
		qualityAutoLow	: "Automaticky nízka",
		qualityLow	: "Nízka",
		windowModeWindow	: "Okno",
		windowModeOpaque	: "Nepriehľadné",
		windowModeTransparent	: "Transparentné",
		windowMode	: "Režim okna:",
		flashvars	: "Premenné:",
		bgcolor	: "Farba pozadia:",
		hSpace	: "Vodorovné odsadenie:",
		vSpace	: "Zvislé odsadenie:",
		validateSrc : "Pole Adresa URL nesmie byť prázdne.",
		validateHSpace : "Vodorovné odsadenie musí byť kladné celé číslo.",
		validateVSpace : "Zvislé odsadenie musí byť kladné celé číslo."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Skontrolovať pravopis",
		title			: "Kontrola pravopisu",
		notAvailable	: "Služba je momentálne nedostupná.",
		errorLoading	: "Nastala chyba pri zavádzaní hostiteľa aplikačnej služby: %s.",
		notInDic		: "Nie je v slovníku",
		changeTo		: "Zmeniť na",
		btnIgnore		: "Ignorovať",
		btnIgnoreAll	: "Ignorovať všetko",
		btnReplace		: "Nahradiť",
		btnReplaceAll	: "Nahradiť všetko",
		btnUndo			: "Späť",
		noSuggestions	: "- Žiadne návrhy -",
		progress		: "Prebieha kontrola pravopisu...",
		noMispell		: "Kontrola pravopisu je dokončená: nenašli sa chyby",
		noChanges		: "Kontrola pravopisu je dokončená: nezmenili sa žiadne slová",
		oneChange		: "Kontrola pravopisu je dokončená: zmenilo sa jedno slovo",
		manyChanges		: "Kontrola pravopisu je dokončená: počet zmenených slov: %1",
		ieSpellDownload	: "Nie je nainštalovaný program na kontrolu pravopisu. Chcete ho teraz prevziať?"
	},

	smiley :
	{
		toolbar	: "Vložiť emotikon",
		title	: "Emotikony",
		options : "Voľby emotikonov"
	},

	elementsPath :
	{
		eleLabel : "Cesta k elementom",
		eleTitle : "Element %1"
	},

	numberedlist : "Číslovaný zoznam",
	bulletedlist : "Zoznam s odrážkami",
	indent : "Zväčšiť zarážku",
	outdent : "Zmenšiť zarážku",

	justify :
	{
		left : "Zarovnať vľavo",
		center : "Zarovnať na stred",
		right : "Zarovnať vpravo",
		block : "Zarovnať k okrajom"
	},

	blockquote : "Označiť citát",

	clipboard :
	{
		title		: "Vložiť",
		cutError	: "Bezpečnostné nastavenia vášho prehliadača nedovoľujú automatické vystrihovanie. Použite klávesovú skratku Ctrl + X.",
		copyError	: "Bezpečnostné nastavenia vášho prehliadača nedovoľujú automatické kopírovanie. Použite klávesovú skratku Ctrl + C.",
		pasteMsg	: "Ak chcete prilepiť obsah dole, stlačte klávesovú skratku Ctrl + V (Cmd + V v systémoch Mac).",
		securityMsg	: "Bezpečnostné nastavenia vášho prehliadača blokujú priame prilepenie zo schránky.",
		pasteArea	: "Oblasť na prilepenie obsahu"
	},

	pastefromword :
	{
		confirmCleanup	: "Zdá sa, že chcete vložiť text skopírovaný z aplikácie Word. Chcete ho pred prilepením vyčistiť?",
		toolbar			: "Prilepiť špeciálne",
		title			: "Prilepiť špeciálne",
		error			: "Nastala interná chyba a nebolo možné vyčistiť prilepený obsah."
	},

	pasteText :
	{
		button	: "Prilepiť ako prostý text",
		title	: "Prilepiť ako prostý text"
	},

	templates :
	{
		button 			: "Šablóny",
		title : "Šablóny obsahu",
		options : "Možnosti pre šablóny",
		insertOption: "Nahradiť skutočný obsah",
		selectPromptMsg: "Vyberte šablónu, ktorú chcete otvoriť v editore",
		emptyListMsg : "(Nie sú definované žiadne šablóny)"
	},

	showBlocks : "Zobraziť bloky",

	stylesCombo :
	{
		label		: "Štýly",
		panelTitle 	: "Štýly",
		panelTitle1	: "Štýly blokov",
		panelTitle2	: "Inline štýly",
		panelTitle3	: "Štýly objektov"
	},

	format :
	{
		label		: "Formát",
		panelTitle	: "Formát odseku",

		tag_p		: "Normálny",
		tag_pre		: "Formátovaný",
		tag_address	: "Adresa",
		tag_h1		: "Nadpis 1",
		tag_h2		: "Nadpis 2",
		tag_h3		: "Nadpis 3",
		tag_h4		: "Nadpis 4",
		tag_h5		: "Nadpis 5",
		tag_h6		: "Nadpis 6",
		tag_div		: "Normálny (DIV)"
	},

	div :
	{
		title				: "Vytvoriť kontajner div",
		toolbar				: "Vytvoriť kontajner div",
		cssClassInputLabel	: "Triedy šablón so štýlmi",
		styleSelectLabel	: "Štýl",
		IdInputLabel		: "ID",
		languageCodeInputLabel	: " Kód jazyka",
		inlineStyleInputLabel	: "Inline štýl",
		advisoryTitleInputLabel	: "Pomocný nadpis",
		langDirLabel		: "Orientácia jazyka",
		langDirLTRLabel		: "Zľava doprava (LTR)",
		langDirRTLLabel		: "Sprava doľava (RTL)",
		edit				: "Upraviť div",
		remove				: "Odstrániť div"
  	},

	iframe :
	{
		title		: "Vlastnosti rámca IFrame",
		toolbar		: "Vložiť rámec IFrame",
		noUrl		: "Zadajte adresu URL rámca iframe",
		scrolling	: "Povoliť posuvné lišty",
		border		: "Zobraziť okraj rámca"
	},

	font :
	{
		label		: "Písmo",
		voiceLabel	: "Písmo",
		panelTitle	: "Názov písma"
	},

	fontSize :
	{
		label		: "Veľkosť",
		voiceLabel	: "Veľkosť písma",
		panelTitle	: "Veľkosť písma"
	},

	colorButton :
	{
		textColorTitle	: "Farba textu",
		bgColorTitle	: "Farba pozadia",
		panelTitle		: "Farby",
		auto			: "Automaticky",
		more			: "Viac farieb..."
	},

	colors :
	{
		"000" : "Čierna",
		"800000" : "Gaštanová",
		"8B4513" : "Sedlová hnedá",
		"2F4F4F" : "Tmavá bridlicová sivá",
		"008080" : "Zelenomodrá",
		"000080" : "Námornícka",
		"4B0082" : "Indigová",
		"696969" : "Tmavá sivá",
		"B22222" : "Ohňovzdorná tehla",
		"A52A2A" : "Hnedá",
		"DAA520" : "Zlatobyľ",
		"006400" : "Tmavá zelená",
		"40E0D0" : "Tyrkysová",
		"0000CD" : "Stredne modrá",
		"800080" : "Purpurová",
		"808080" : "Sivá",
		"F00" : "Červená",
		"FF8C00" : "Tmavá oranžová",
		"FFD700" : "Zlatá",
		"008000" : "Zelená",
		"0FF" : "Zelenomodrá",
		"00F" : "Modrá",
		"EE82EE" : "Fialová",
		"A9A9A9" : "Matná sivá",
		"FFA07A" : "Svetlá lososová",
		"FFA500" : "Oranžová",
		"FFFF00" : "Žltá",
		"00FF00" : "Lipovo zelená",
		"AFEEEE" : "Bledá tyrkysová",
		"ADD8E6" : "Svetlá modrá",
		"DDA0DD" : "Slivka",
		"D3D3D3" : "Svetlá sivá",
		"FFF0F5" : "Levanduľová červeň",
		"FAEBD7" : "Antická biela",
		"FFFFE0" : "Svetlá žltá",
		"F0FFF0" : "Ambróziová",
		"F0FFFF" : "Azúrová",
		"F0F8FF" : "Alicina modrá",
		"E6E6FA" : "Levanduľová",
		"FFF" : "Biela"
	},

	scayt :
	{
		title			: "Kontrolovať pravopis pri písaní",
		opera_title		: "Nepodporované prehliadačom Opera",
		enable			: "Povoliť SCAYT",
		disable			: "Zakázať SCAYT",
		about			: "Informácie o SCAYT",
		toggle			: "Prepnúť SCAYT",
		options			: "Možnosti",
		langs			: "Jazyky",
		moreSuggestions	: "Viac návrhov",
		ignore			: "Ignorovať",
		ignoreAll		: "Ignorovať všetko",
		addWord			: "Pridať slovo",
		emptyDic		: "Názov slovníka nemôže byť prázdny.",

		optionsTab		: "Možnosti",
		allCaps			: "Ignorovať slová, v ktorých sú všetky písmená veľké",
		ignoreDomainNames : "Ignorovať názvy domén",
		mixedCase		: "Ignorovať slová s rozličnou veľkosťou písmen",
		mixedWithDigits	: "Ignorovať slová obsahujúce číslice",

		languagesTab	: "Jazyky",

		dictionariesTab	: "Slovníky",
		dic_field_name	: "Názov slovníka",
		dic_create		: "Vytvoriť",
		dic_restore		: "Obnoviť",
		dic_delete		: "Vymazať",
		dic_rename		: "Premenovať",
		dic_info		: "Užívateľský slovník je najprv uložený v objekte cookie. Objekty cookie však majú obmedzenú veľkosť. Keď užívateľský slovník narastie do bodu, keď už nemôže byť uložený v objekte cookie, musí byť slovník uložený na našom serveri. Ak chcete uložiť váš osobná slovník na náš server, mali by ste zadať názov pre váš slovník. Ak už máte slovník uložený, zadajte jeho názov a kliknite na tlačidlo Obnoviť.",

		aboutTab		: "Informácie"
	},

	about :
	{
		title		: "Informácie o produkte CKEditor",
		dlgTitle	: "Informácie o produkte CKEditor",
		help	: "Pozrite si pomoc v $1.",
		userGuide : "Užívateľská príručka pre CKEditor",
		moreInfo	: "Informácie o licencii nájdete na našej webovej lokalite:",
		copy		: "Copyright &copy; $1. Všetky práva vyhradené."
	},

	maximize : "Maximalizovať",
	minimize : "Minimalizovať",

	fakeobjects :
	{
		anchor	: "Ukotvenie",
		flash	: "Animácia Flash",
		iframe		: "Rámec IFrame",
		hiddenfield	: "Skryté pole",
		unknown	: "Neznámy objekt"
	},

	resize : "Myšou zmeňte veľkosť",

	colordialog :
	{
		title		: "Vyberte farbu",
		options	:	"Voľby farby",
		highlight	: "Zvýraznenie",
		selected	: "Vybratá farba",
		clear		: "Vyčistiť"
	},

	toolbarCollapse	: "Zvinúť lištu nástrojov",
	toolbarExpand	: "Rozvinúť lištu nástrojov",

	toolbarGroups :
	{
		document : "Dokument",
		clipboard : "Schránka/Späť",
		editing : "Úprava",
		forms : "Formuláre",
		basicstyles : "Základné štýly",
		paragraph : "Odsek",
		links : "Prepojenia",
		insert : "Vložiť",
		styles : "Štýly",
		colors : "Farby",
		tools : "Nástroje"
	},

	bidi :
	{
		ltr : "Smer textu: zľava doprava",
		rtl : "Smer textu: sprava doľava"
	},

	docprops :
	{
		label : "Vlastnosti dokumentu",
		title : "Vlastnosti dokumentu",
		design : "Dizajn",
		meta : "Meta-označenia",
		chooseColor : "Vybrať",
		other : "Iné...",
		docTitle :	"Názov stránky",
		charset : 	"Kódovanie znakovej sady",
		charsetOther : "Iné kódovanie znakovej sady",
		charsetASCII : "ASCII",
		charsetCE : "Stredoeurópske",
		charsetCT : "Tradičná čínština (Big5)",
		charsetCR : "Cyrilika",
		charsetGR : "Gréčtina",
		charsetJP : "Japončina",
		charsetKR : "Kórejčina",
		charsetTR : "Turečtina",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Západné",
		docType : "Hlavička typu dokumentu",
		docTypeOther : "Iná hlavička typu dokumentu",
		xhtmlDec : "Zahrnúť deklaráciu XHTML",
		bgColor : "Farba pozadia",
		bgImage : "Adresa URL obrázka pozadia",
		bgFixed : "Nerolovateľné (pevné) pozadie",
		txtColor : "Farba textu",
		margin : "Okraje stránky",
		marginTop : "Vrch",
		marginLeft : "Vľavo",
		marginRight : "Vpravo",
		marginBottom : "Spodok",
		metaKeywords : "Kľúčové slová indexovania dokumentu (oddelené čiarkami)",
		metaDescription : "Popis dokumentu",
		metaAuthor : "Autor",
		metaCopyright : "Autorské práva",
		previewHtml : "<p>Toto je nejaký <strong>vzorový text</strong>. Používate <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "palce",
			widthCm	: "centimetre",
			widthMm	: "milimetre",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "body",
			widthPc	: "pica",
			required : "Vyžadované"
		},
		table :
		{
			createTable : 'Vložiť tabuľku',
			heightUnit	: "Jednotka výšky:",
			insertMultipleRows : "Vložiť riadky",
			insertMultipleCols : "Vložiť stĺpce",
			noOfRows : "Počet riadkov:",
			noOfCols : "Počet stĺpcov:",
			insertPosition : "Umiestnenie:",
			insertBefore : "Pred",
			insertAfter : "Za",
			selectTable : "Vybrať tabuľku",
			selectRow : "Vybrať riadok",
			columnTitle : "Šírka stĺpca",
			colProps : "Vlastnosti stĺpca",
			invalidColumnWidth	: "Šírka stĺpca musí byť kladné číslo.",
			fixedColWidths : "Pevné šírky stĺpcov"
		},
		cell :
		{
			title : "Bunka"
		},
		colordialog :
		{
			currentColor	: "Aktuálna farba"
		},
		emoticon :
		{
			angel		: "Anjel",
			angry		: "Nahnevaný",
			cool		: "Super",
			crying		: "Plač",
			eyebrow		: "Zdvihnuté obočie",
			frown		: "Mračenie",
			goofy		: "Pojašený",
			grin		: "Úškrn",
			half		: "Polovica",
			idea		: "Nápad",
			laughing	: "Smiech",
			laughroll	: "Záchvat smiechu",
			no			: "Nie",
			oops		: "Ups",
			shy			: "Hanblivý",
			smile		: "Úsmev",
			tongue		: "Jazyk",
			wink		: "Žmurknutie",
			yes			: "Áno"
		},

		menu :
		{
			link	: "Vložiť prepojenie",
			list	: "Zoznam",
			paste	: "Vložiť",
			action	: "Akcia",
			align	: "Zarovnať",
			emoticon: "Emotikon"
		},

		iframe :
		{
			title	: "Rámec IFrame"
		},

		list:
		{
			numberedTitle		: "Číslovaný zoznam",
			bulletedTitle		: "Zoznam s odrážkami",
			description			: "Nastavenia sa použijú pre aktuálnu úroveň zoznamu",
			fontsize			: "Veľkosť písma:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Napíšte popisný názov záložky, napríklad 'Časť 1.2'. Po vložení záložky ju prepojte kliknutím na ikonu 'Prepojenie' alebo 'Prepojenie na záložku dokumentu'.",
			title		: "Prepojenie na záložku dokumentu",
			linkTo		: "Prepojiť s:"
		},

		urllink :
		{
			title : "Prepojenie na adresu URL",
			linkText : "Text prepojenia:",
			selectAnchor: "Ukotvenie:",
			nourl: "Zadajte adresu URL do textového poľa.",
			urlhelp: "Napíšte alebo prilepte adresu URL, ktorá sa otvorí, keď užívatelia kliknú na toto prepojenie. Napríklad: http://www.example.com.",
			displaytxthelp: "Napíšte zobrazovaný text pre prepojenie.",
			openinnew : "Otvoriť prepojenie v novom okne"
		},

		spellchecker :
		{
			title : "Kontrola pravopisu",
			replace : "Nahradiť:",
			suggesstion : "Návrhy:",
			withLabel : "Čím:",
			replaceButton : "Nahradiť",
			replaceallButton:"Nahradiť všetko",
			skipButton:"Preskočiť",
			skipallButton: "Preskočiť všetko",
			undochanges: "Vrátiť zmeny",
			complete: "Kontrola pravopisu je dokončená",
			problem: "Nastal problém pri získavaní údajov XML",
			addDictionary: "Pridať do slovníka",
			editDictionary: "Upraviť slovník"
		},

		status :
		{
			keystrokeForHelp: "Pomoc získate stlačením ALT + 0"
		},

		linkdialog :
		{
			label : "Dialógové okno Odkaz"
		},

		imagedatauri :
		{
			error : "Vkladanie obrázkov momentálne nie je podporované. Namiesto toho použite voľbu \'Vložiť obrázok\' na lište nástrojov."
		},

		image :
		{
			previewText : "Text bude obtekať pridávaný obrázok ako v tomto príklade.",
			fileUpload : "Vyberte súbor obrázka vo vašom počítači:"
		}
	}

};
