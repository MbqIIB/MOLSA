﻿/*
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

CKEDITOR.lang["nl"] =
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
	editorTitle : "Rich Text-editor, %1, druk op Alt 0 voor Help.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Editorwerkbalken",
	editor	: "Rich Text-editor",

	// Toolbar buttons without dialogs.
	source			: "Bron",
	newPage			: "Nieuwe pagina",
	save			: "Opslaan",
	preview			: "Preview:",
	cut				: "Knippen",
	copy			: "Kopiëren",
	paste			: "Plakken",
	print			: "Afdrukken",
	underline		: "Onderstrepen",
	bold			: "Vet",
	italic			: "Cursief",
	selectAll		: "Alles selecteren",
	removeFormat	: "Indeling verwijderen",
	strike			: "Doorhalen",
	subscript		: "Subscript",
	superscript		: "Superscript",
	horizontalrule	: "Horizontale regel invoegen",
	pagebreak		: "Paginaeinde invoegen",
	pagebreakAlt		: "Paginaeinde",
	unlink			: "Link verwijderen",
	undo			: "Ongedaan maken",
	redo			: "Opnieuw",

	// Common messages and labels.
	common :
	{
		browseServer	: "Browserserver:",
		url				: "URL:",
		protocol		: "Protocol:",
		upload			: "Uploaden:",
		uploadSubmit	: "Verzenden naar de server",
		image			: "Afbeelding invoegen",
		flash			: "Flash-movie invoegen",
		form			: "Formulier invoegen",
		checkbox		: "Selectievakje invoegen",
		radio			: "Keuzerondje invoegen",
		textField		: "Tekstveld invoegen",
		textarea		: "Tekstgebied invoegen",
		hiddenField		: "Verborgen veld invoegen",
		button			: "Knop invoegen",
		select			: "Keuzeveld invoegen",
		imageButton		: "Afbeeldingsknop invoegen",
		notSet			: "<niet ingesteld>",
		id				: "ID:",
		name			: "Naam:",
		langDir			: "Schrijfrichting:",
		langDirLtr		: "Links naar rechts",
		langDirRtl		: "Rechts naar links",
		langCode		: "Taalcode:",
		longDescr		: "URL lange beschrijving:",
		cssClass		: "Stijlbladklassen:",
		advisoryTitle	: "Voorgestelde titel:",
		cssStyle		: "Stijl:",
		ok				: "OK",
		cancel			: "Annuleren",
		close : "Sluiten",
		preview			: "Preview:",
		generalTab		: "Algemeen",
		advancedTab		: "Geavanceerd",
		validateNumberFailed	: "Deze waarde is geen getal.",
		confirmNewPage	: "Niet-opgeslagen wijzigingen van deze content gaan verloren. Weet u zeker dat u een nieuwe pagina wilt laden?",
		confirmCancel	: "Een aantal van deze opties is gewijzigd. Weet u zeker dat u het dialoogvenster wilt sluiten?",
		options : "Opties",
		target			: "Doel:",
		targetNew		: "Nieuw venster (_blank)",
		targetTop		: "Bovenste venster (_top)",
		targetSelf		: "Zelfde venster (_self)",
		targetParent	: "Hoofdvenster (_parent)",
		langDirLTR		: "Links naar rechts",
		langDirRTL		: "Rechts naar links",
		styles			: "Stijl:",
		cssClasses		: "Stijlbladklassen:",
		width			: "Breedte:",
		height			: "Hoogte:",
		align			: "Uitlijnen:",
		alignLeft		: "Links",
		alignRight		: "Rechts",
		alignCenter		: "Centreren",
		alignTop		: "Boven",
		alignMiddle		: "Midden",
		alignBottom		: "Onderaan",
		invalidHeight	: "Hoogte moet een positief geheel getal zijn.",
		invalidWidth	: "Breedte moet een positief geheel getal zijn.",
		invalidCssLength	: "De waarde voor veld '%1' moet een positief getal zijn, met of zonder een geldige CSS-maateenheid (px, %, in, cm, mm, em, ex, pt of pc).",
		invalidHtmlLength	: "De waarde voor veld '%1' moet een positief getal zijn, met of zonder een geldige HTML-maateenheid (px of %).",
		invalidInlineStyle	: "De waarde voor de inline stijl moet bestaan uit een of meer tuples met de notatie \"naam : waarde\", van elkaar gescheiden met puntkomma's.",
		cssLengthTooltip	: "Geef een getal op voor een waarde in pixels of geef een getal op met een geldige CSS-eenheid(px, %, in, cm, mm, em, ex, pt of pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, niet beschikbaar</span>"
	},

	contextmenu :
	{
		options : "Contextmenuopties"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Speciaal teken invoegen",
		title		: "Speciaal teken",
		options : "Opties voor speciale tekens"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL-link",
		other 		: "<overig>",
		menu		: "Link bewerken",
		title		: "Link",
		info		: "Linkgegevens",
		target		: "Doel",
		upload		: "Uploaden:",
		advanced	: "Geavanceerd",
		type		: "Linktype:",
		toUrl		: "URL",
		toAnchor	: "Link naar ankercode in de tekst",
		toEmail		: "E-mail",
		targetFrame	: "<frame>",
		targetPopup	: "<voorgrondvenster>",
		targetFrameName	: "Naam doelframe:",
		targetPopupName	: "Naam voorgrondvenster:",
		popupFeatures	: "Functies voorgrondvenster:",
		popupResizable	: "Verstelbaar",
		popupStatusBar	: "Statusbalk",
		popupLocationBar	: "Locatiebalk",
		popupToolbar	: "Werkbalk",
		popupMenuBar	: "Menubalk",
		popupFullScreen	: "Volledig scherm (IE)",
		popupScrollBars	: "Schuifbalken",
		popupDependent	: "Afhankelijk (Netscape)",
		popupLeft		: "Linkerpositie",
		popupTop		: "Bovenste positie",
		id				: "ID:",
		langDir			: "Schrijfrichting:",
		langDirLTR		: "Links naar rechts",
		langDirRTL		: "Rechts naar links",
		acccessKey		: "Toegangssleutel:",
		name			: "Naam:",
		langCode		: "Taalcode:",
		tabIndex		: "Tabvolgorde:",
		advisoryTitle	: "Voorgestelde titel:",
		advisoryContentType	: "Voorgesteld contenttype:",
		cssClasses		: "Stijlbladklassen:",
		charset			: "Tekenset gekoppelde resource:",
		styles			: "Stijl:",
		rel			: "Relatie",
		selectAnchor	: "Anker selecteren",
		anchorName		: "Op ankernaam",
		anchorId		: "Op element-ID",
		emailAddress	: "E-mailadres",
		emailSubject	: "Berichtonderwerp",
		emailBody		: "Berichttekst",
		noAnchors		: "Het document bevat geen bladwijzers. Klik op de werkbalk op het pictogram 'Documentbladwijzer invoegen' om een bladwijzer toe te voegen.",
		noUrl			: "Typ de URL voor de link",
		noEmail			: "Typ het e-mailadres"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Documentbladwijzer invoegen",
		menu		: "Documentbladwijzer bewerken",
		title		: "Documentbladwijzer",
		name		: "Naam:",
		errorName	: "Typ een naam voor de publicatiebladwijzer",
		remove		: "Documentbladwijzer verwijderen"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Eigenschappen genummerde lijst",
		bulletedTitle		: "Eigenschappen lijst met opsommingstekens",
		type				: "Lijststijl:",
		start				: "Begin:",
		validateStartNumber				:"Eerste nummer van lijst moet een geheel getal zijn.",
		circle				: "Cirkel",
		disc				: "Schijf",
		square				: "Vierkant",
		none				: "Geen",
		notset				: "<niet ingesteld>",
		armenian			: "Armeense nummering",
		georgian			: "Georgische nummering (an, ban, gan, etc.)",
		lowerRoman			: "Kleine Romaanse cijfers (i, ii, iii, iv, v, etc.)",
		upperRoman			: "Grote Romaanse cijfers (I, II, III, IV, V, etc.)",
		lowerAlpha			: "Alfa kleine letters (a, b, c, d, e, etc.)",
		upperAlpha			: "Alfa hoofdletters (A, B, C, D, E, etc.)",
		lowerGreek			: "Grieks kleine letters (alfa, bèta, gamma, etc.)",
		decimal				: "Decimalen (1, 2, 3, etc.)",
		decimalLeadingZero	: "Decimale voorafgaande nul (01, 02, 03, etc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Zoeken en vervangen",
		find				: "Zoeken",
		replace				: "Vervangen",
		findWhat			: "Zoeken:",
		replaceWith			: "Vervangen door:",
		notFoundMsg			: "De opgegeven tekst is niet gevonden.",
		findOptions			: "Zoekopties",
		matchCase			: "Hoofdlettergevoelig",
		matchWord			: "Heel woord",
		matchCyclic			: "Cyclische overeenkomst",
		replaceAll			: "Alles vervangen",
		replaceSuccessMsg	: "%1 vindplaats(en) vervangen."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Tabel invoegen",
		title		: "Tabel",
		menu		: "Tabeleigenschappen",
		deleteTable	: "Tabel wissen",
		rows		: "Rijen:",
		columns		: "Kolommen:",
		border		: "Randdikte:",
		widthPx		: "pixels",
		widthPc		: "procent",
		widthUnit	: "Breedte-eenheid:",
		cellSpace	: "Ruimte tussen cellen:",
		cellPad		: "Celopvulling:",
		caption		: "Bijschrift:",
		summary		: "Overzicht:",
		headers		: "Koppen:",
		headersNone		: "Geen",
		headersColumn	: "Eerste kolom",
		headersRow		: "Eerste rij",
		headersBoth		: "Beide",
		invalidRows		: "Aantal rijen moet een positief geheel getal zijn.",
		invalidCols		: "Aantal kolommen moet een positief geheel getal zijn.",
		invalidBorder	: "Randgrootte moet een positief getal zijn.",
		invalidWidth	: "Tabelbreedte moet een positief getal zijn.",
		invalidHeight	: "Tabelhoogte moet een positief getal zijn.",
		invalidCellSpacing	: "Celspatiëring moet een positief getal zijn.",
		invalidCellPadding	: "Celopvulling moet een positief getal zijn.",

		cell :
		{
			menu			: "Cel",
			insertBefore	: "Cel invoegen vóór",
			insertAfter		: "Cel invoegen na",
			deleteCell		: "Cellen wissen",
			merge			: "Cellen samenvoegen",
			mergeRight		: "Rechts samenvoegen",
			mergeDown		: "Omlaag samenvoegen",
			splitHorizontal	: "Cel horizontaal splitsen",
			splitVertical	: "Cel verticaal splitsen",
			title			: "Celeigenschappen",
			cellType		: "Celtype:",
			rowSpan			: "Omspannen rijen:",
			colSpan			: "Omspannen kolommen:",
			wordWrap		: "Automatische terugloop:",
			hAlign			: "Horizontale uitlijning:",
			vAlign			: "Verticale uitlijning:",
			alignBaseline	: "Basislijn",
			bgColor			: "Achtergrondkleur:",
			borderColor		: "Randkleur:",
			data			: "Gegevens",
			header			: "Koptekst",
			yes				: "Ja",
			no				: "Nee",
			invalidWidth	: "Celbreedte moet een positief getal zijn.",
			invalidHeight	: "Celhoogte moet een positief getal zijn.",
			invalidRowSpan	: "Rijbereik moet een positief geheel getal zijn.",
			invalidColSpan	: "Kolombereik moet een positief geheel getal zijn.",
			chooseColor 	: "Meer kleuren..."
		},

		row :
		{
			menu			: "Rij",
			insertBefore	: "Rij invoegen vóór",
			insertAfter		: "Rij invoegen na",
			deleteRow		: "Rijen wissen"
		},

		column :
		{
			menu			: "Kolom",
			insertBefore	: "Kolom invoegen vóór",
			insertAfter		: "Kolom invoegen na",
			deleteColumn	: "Kolommen wissen"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Knopeigenschappen",
		text		: "Tekst (waarde):",
		type		: "Type:",
		typeBtn		: "Knop",
		typeSbm		: "Verzenden",
		typeRst		: "Opnieuw instellen"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Eigenschappen selectievakje",
		radioTitle	: "Eigenschappen keuzerondje",
		value		: "Waarde:",
		selected	: "Geselecteerd"
	},

	// Form Dialog.
	form :
	{
		title		: "Formulier invoegen",
		menu		: "Formuliereigenschappen",
		action		: "Actie:",
		method		: "Methode:",
		encoding	: "Codering:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Veldeigenschappen selecteren",
		selectInfo	: "Info selecteren",
		opAvail		: "Beschikbare opties",
		value		: "Waarde:",
		size		: "Grootte:",
		lines		: "regels",
		chkMulti	: "Meerdere selecties toestaan",
		opText		: "Tekst:",
		opValue		: "Waarde:",
		btnAdd		: "Toevoegen",
		btnModify	: "Wijzigen",
		btnUp		: "Omhoog",
		btnDown		: "Omlaag",
		btnSetValue : "Instellen als geselecteerde waarde",
		btnDelete	: "Wissen"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Eigenschappen tekstgebied",
		cols		: "Kolommen:",
		rows		: "Rijen:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Eigenschappen tekstveld",
		name		: "Naam:",
		value		: "Waarde:",
		charWidth	: "Tekenbreedte:",
		maxChars	: "Maximumaantal tekens:",
		type		: "Type:",
		typeText	: "Tekst",
		typePass	: "Wachtwoord"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Eigenschappen verborgen veld",
		name	: "Naam:",
		value	: "Waarde:"
	},

	// Image Dialog.
	image :
	{
		title		: "Afbeelding",
		titleButton	: "Eigenschappen afbeeldingsknop",
		menu		: "Afbeeldingseigenschappen",
		infoTab	: "Afbeeldingsgegevens",
		btnUpload	: "Afbeelding uploaden",
		upload	: "Uploaden",
		alt		: "Alternatieve tekst:",
		lockRatio	: "Vergrendelingsverhouding",
		resetSize	: "Grootte opnieuw instellen",
		border	: "Rand:",
		hSpace	: "Horizontale ruimte:",
		vSpace	: "Verticale ruimte:",
		alertUrl	: "Typ de URL voor de afbeelding",
		linkTab	: "Link",
		button2Img	: "Wilt u de geselecteerde afbeeldingsknop converteren naar een eenvoudige afbeelding?",
		img2Button	: "Wilt u de geselecteerde afbeelding converteren naar een afbeeldingsknop?",
		urlMissing : "URL voor afbeeldingsbron ontbreekt.",
		validateBorder : "Rand moet een positief geheel getal zijn.",
		validateHSpace : "Horizontale ruimte moet een positief geheel getal zijn.",
		validateVSpace : "Verticale ruimte moet een positief geheel getal zijn."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flash-eigenschappen",
		propertiesTab	: "Eigenschappen",
		title		: "Flash",
		chkPlay		: "Automatisch afspelen",
		chkLoop		: "Lus",
		chkMenu		: "Flash-menu inschakelen",
		chkFull		: "Volledig scherm toestaan",
 		scale		: "Schaal:",
		scaleAll		: "Alles afbeelden",
		scaleNoBorder	: "Geen rand",
		scaleFit		: "Exact passend",
		access			: "Scripttoegang:",
		accessAlways	: "Altijd",
		accessSameDomain	: "Zelfde domein",
		accessNever	: "Nooit",
		alignAbsBottom: "Abs onderaan",
		alignAbsMiddle: "Abs midden",
		alignBaseline	: "Basislijn",
		alignTextTop	: "Tekst bovenaan",
		quality		: "Kwaliteit:",
		qualityBest	: "Beste",
		qualityHigh	: "Hoog",
		qualityAutoHigh	: "Automatisch hoog",
		qualityMedium	: "Gemiddeld",
		qualityAutoLow	: "Automatisch laag",
		qualityLow	: "Laag",
		windowModeWindow	: "Venster",
		windowModeOpaque	: "Ondoorzichtig",
		windowModeTransparent	: "Transparant",
		windowMode	: "Venstermodus:",
		flashvars	: "Variabelen:",
		bgcolor	: "Achtergrondkleur:",
		hSpace	: "Horizontale ruimte:",
		vSpace	: "Verticale ruimte:",
		validateSrc : "URL mag niet leeg zijn.",
		validateHSpace : "Horizontale ruimte moet een positief geheel getal zijn.",
		validateVSpace : "Verticale ruimte moet een positief geheel getal zijn."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Spellingcontrole",
		title			: "Spellingcontrole",
		notAvailable	: "De service is op dit moment niet beschikbaar.",
		errorLoading	: "Fout bij laden van host voor toepassingsservice: %s.",
		notInDic		: "Niet in woordenboek",
		changeTo		: "Wijzigen in",
		btnIgnore		: "Negeren",
		btnIgnoreAll	: "Alles negeren",
		btnReplace		: "Vervangen",
		btnReplaceAll	: "Alles vervangen",
		btnUndo			: "Ongedaan maken",
		noSuggestions	: "- Geen suggesties -",
		progress		: "Bezig met uitvoeren van spellingcontrole...",
		noMispell		: "Spellingcontrole voltooid: geen spelfouten gevonden",
		noChanges		: "Spellingcontrole voltooid: geen woorden gewijzigd",
		oneChange		: "Spellingcontrole voltooid: één woord gewijzigd",
		manyChanges		: "Spellingcontrole voltooid: %1 woorden gewijzigd",
		ieSpellDownload	: "Spellingcontrole niet geïnstalleerd. Wilt u het programma nu downloaden?"
	},

	smiley :
	{
		toolbar	: "Emoticon invoegen",
		title	: "Emoticons",
		options : "Opties voor emoticons"
	},

	elementsPath :
	{
		eleLabel : "Elementenpad",
		eleTitle : "%1 element"
	},

	numberedlist : "Genummerde lijst",
	bulletedlist : "Lijst met opsommingstekens",
	indent : "Inspringing vergroten",
	outdent : "Inspringing verkleinen",

	justify :
	{
		left : "Links uitlijnen",
		center : "Centreren",
		right : "Rechts uitlijnen",
		block : "Uitgevuld uitlijnen"
	},

	blockquote : "Bloktekst",

	clipboard :
	{
		title		: "Plakken",
		cutError	: "De beveiligingsinstellingen van uw browser verhinderen automatisch knippen. Gebruik in plaats daarvan Ctrl+X op uw toetsenbord.",
		copyError	: "De beveiligingsinstellingen van uw browser verhinderen automatisch kopiëren. Gebruik in plaats daarvan Ctrl+C op uw toetsenbord.",
		pasteMsg	: "Druk op Ctrl+V (Cmd+V op MAC) om hieronder te plakken.",
		securityMsg	: "De beveiligingsinstellingen van uw browser verhinderen rechtstreeks plakken vanaf het klembord.",
		pasteArea	: "Gebied plakken"
	},

	pastefromword :
	{
		confirmCleanup	: "De tekst die u wilt plakken lijkt gekopieerd uit Word. Wilt u de tekst opschonen voordat deze wordt geplakt?",
		toolbar			: "Plakken speciaal",
		title			: "Plakken speciaal",
		error			: "Het is niet mogelijk om de geplakte gegevens op te schonen vanwege een interne fout"
	},

	pasteText :
	{
		button	: "Plakken als platte tekst",
		title	: "Plakken als platte tekst"
	},

	templates :
	{
		button 			: "Sjablonen",
		title : "Contentsjablonen",
		options : "Opties voor sjablonen",
		insertOption: "Werkelijke content vervangen",
		selectPromptMsg: "Selecteer de sjabloon die u wilt openen in de editor",
		emptyListMsg : "(Geen sjablonen gedefinieerd)"
	},

	showBlocks : "Blokken afbeelden",

	stylesCombo :
	{
		label		: "Stijlen",
		panelTitle 	: "Stijlen",
		panelTitle1	: "Blokstijlen",
		panelTitle2	: "Inline stijlen",
		panelTitle3	: "Objectstijlen"
	},

	format :
	{
		label		: "Indeling",
		panelTitle	: "Alineaindeling",

		tag_p		: "Normaal",
		tag_pre		: "Ingedeeld",
		tag_address	: "Adres",
		tag_h1		: "Kop 1",
		tag_h2		: "Kop 2",
		tag_h3		: "Kop 3",
		tag_h4		: "Kop 4",
		tag_h5		: "Kop 5",
		tag_h6		: "Kop 6",
		tag_div		: "Normaal (DIV)"
	},

	div :
	{
		title				: "Div-container maken",
		toolbar				: "Div-container maken",
		cssClassInputLabel	: "Stijlbladklassen",
		styleSelectLabel	: "Stijl",
		IdInputLabel		: "ID",
		languageCodeInputLabel	: "  Taalcode",
		inlineStyleInputLabel	: "Inline stijl",
		advisoryTitleInputLabel	: "Voorgestelde titel",
		langDirLabel		: "Schrijfrichting",
		langDirLTRLabel		: "Links naar rechts (LTR)",
		langDirRTLLabel		: "Rechts naar links (RTL)",
		edit				: "Div bewerken",
		remove				: "Div verwijderen"
  	},

	iframe :
	{
		title		: "IFrame-eigenschappen",
		toolbar		: "IFrame invoegen",
		noUrl		: "Geef de URL van de iframe op",
		scrolling	: "Schuifbalken inschakelen",
		border		: "Framekader afbeelden"
	},

	font :
	{
		label		: "Lettertype",
		voiceLabel	: "Lettertype",
		panelTitle	: "Naam lettertype"
	},

	fontSize :
	{
		label		: "Grootte",
		voiceLabel	: "Lettergrootte",
		panelTitle	: "Lettergrootte"
	},

	colorButton :
	{
		textColorTitle	: "Tekstkleur",
		bgColorTitle	: "Achtergrondkleur",
		panelTitle		: "Kleuren",
		auto			: "Automatisch",
		more			: "Meer kleuren..."
	},

	colors :
	{
		"000" : "Zwart",
		"800000" : "Kastanjebruin",
		"8B4513" : "Leerbruin",
		"2F4F4F" : "Donkerleigrijs",
		"008080" : "Blauwgroen",
		"000080" : "Marineblauw",
		"4B0082" : "Indigoblauw",
		"696969" : "Donkergrijs",
		"B22222" : "Vuursteenrood",
		"A52A2A" : "Bruin",
		"DAA520" : "Guldenroede",
		"006400" : "Donkergroen",
		"40E0D0" : "Turkoois",
		"0000CD" : "Lichtblauw",
		"800080" : "Paars",
		"808080" : "Grijs",
		"F00" : "Rood",
		"FF8C00" : "Donkeroranje",
		"FFD700" : "Goud",
		"008000" : "Groen",
		"0FF" : "Cyaanblauw",
		"00F" : "Blauw",
		"EE82EE" : "Violet",
		"A9A9A9" : "Dofgrijs",
		"FFA07A" : "Lichtzalm",
		"FFA500" : "Oranje",
		"FFFF00" : "Geel",
		"00FF00" : "Bleekgroen",
		"AFEEEE" : "Lichtturkoois",
		"ADD8E6" : "Lichtblauw",
		"DDA0DD" : "Lila",
		"D3D3D3" : "Lichtgrijs",
		"FFF0F5" : "Lavendelblos",
		"FAEBD7" : "Antiek wit",
		"FFFFE0" : "Lichtgeel",
		"F0FFF0" : "Meloen",
		"F0FFFF" : "Azuur",
		"F0F8FF" : "Aliceblauw",
		"E6E6FA" : "Lavendel",
		"FFF" : "Wit"
	},

	scayt :
	{
		title			: "Spelling controleren terwijl u typt",
		opera_title		: "Niet ondersteund door Opera",
		enable			: "SCAYT inschakelen",
		disable			: "SCAYT uitschakelen",
		about			: "Info SCAYT",
		toggle			: "SCAYT in-/uitschakelen",
		options			: "Opties",
		langs			: "Talen",
		moreSuggestions	: "Meer suggesties",
		ignore			: "Negeren",
		ignoreAll		: "Alles negeren",
		addWord			: "Woord toevoegen",
		emptyDic		: "Veld voor woordenboeknaam mag niet leeg zijn.",

		optionsTab		: "Opties",
		allCaps			: "Woorden in hoofdletters negeren",
		ignoreDomainNames : "Domeinnamen negeren",
		mixedCase		: "Woorden met hoofd- en kleine letters negeren",
		mixedWithDigits	: "Woorden met getallen negeren",

		languagesTab	: "Talen",

		dictionariesTab	: "Woordenboeken",
		dic_field_name	: "Naam woordenboek",
		dic_create		: "Maken",
		dic_restore		: "Herstellen",
		dic_delete		: "Wissen",
		dic_rename		: "Naam wijzigen",
		dic_info		: "In eerste instantie wordt het gebruikerswoordenboek opgeslagen in een cookie. De grootte van cookies is echter beperkt. Als het gebruikerswoordenboek zo groot is geworden dat het niet meer kan worden opgeslagen in een cookie, kan het woordenboek worden opgeslagen op onze server. Om uw persoonlijke woordenboek op onze server op te slaan, moet u een naam opgeven voor het woordenboek. Als u al een opgeslagen woordenboek hebt, typ dan de naam ervan en klik op de knop Herstellen.",

		aboutTab		: "Info"
	},

	about :
	{
		title		: "Info CKEditor",
		dlgTitle	: "Info CKEditor",
		help	: "Controleer $1 voor Help.",
		userGuide : "Gebruikershandleiding voor CKEditor",
		moreInfo	: "Bezoek onze website voor licentiegegevens:",
		copy		: "Copyright &copy; $1. Alle rechten voorbehouden."
	},

	maximize : "Maximaliseren",
	minimize : "Minimaliseren",

	fakeobjects :
	{
		anchor	: "Ankercode",
		flash	: "Flash-animatie",
		iframe		: "IFrame",
		hiddenfield	: "Verborgen veld",
		unknown	: "Onbekend object"
	},

	resize : "Sleep om formaat te wijzigen",

	colordialog :
	{
		title		: "KLEUREN KIEZEN",
		options	:	"Opties voor kleuren",
		highlight	: "Accentueren",
		selected	: "Geselecteerde kleur",
		clear		: "Wissen"
	},

	toolbarCollapse	: "Werkbalk samenvouwen",
	toolbarExpand	: "Werkbalk uitvouwen",

	toolbarGroups :
	{
		document : "Document",
		clipboard : "Klembord/Ongedaan maken",
		editing : "Bewerken",
		forms : "Formulieren",
		basicstyles : "Basisstijlen",
		paragraph : "Alinea",
		links : "Links",
		insert : "Invoegen",
		styles : "Stijlen",
		colors : "Kleuren",
		tools : "Extra"
	},

	bidi :
	{
		ltr : "Tekstrichting van links naar rechts",
		rtl : "Tekstrichting van rechts naar links"
	},

	docprops :
	{
		label : "Documenteigenschappen",
		title : "Documenteigenschappen",
		design : "Ontwerp",
		meta : "Metatags",
		chooseColor : "Kiezen",
		other : "Overig...",
		docTitle :	"Paginatitel",
		charset : 	"Codering tekenset",
		charsetOther : "Andere tekensetcodering",
		charsetASCII : "ASCII",
		charsetCE : "Centraal-Europees",
		charsetCT : "Traditioneel Chinees (Big5)",
		charsetCR : "Cyrillisch",
		charsetGR : "Grieks",
		charsetJP : "Japans",
		charsetKR : "Koreaans",
		charsetTR : "Turks",
		charsetUN : "Unicode",
		charsetWE : "West-Europees",
		docType : "Kop documenttype",
		docTypeOther : "Kop andere documenttypen",
		xhtmlDec : "XHTML-declaraties opnemen",
		bgColor : "Achtergrondkleur",
		bgImage : "URL achtergrondafbeelding",
		bgFixed : "Achtergrond zonder bladeren (vast)",
		txtColor : "Tekstkleur",
		margin : "Paginamarges",
		marginTop : "Boven",
		marginLeft : "Links",
		marginRight : "Rechts",
		marginBottom : "Onderaan",
		metaKeywords : "Sleutelwoorden documentindex (gescheiden met komma's)",
		metaDescription : "Documentbeschrijving",
		metaAuthor : "Auteur",
		metaCopyright : "Copyright",
		previewHtml : "<p>Dit is <strong>voorbeeldtekst</strong>. U werkt met <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
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
			widthPt	: "punten",
			widthPc	: "pica's",
			required : "Verplicht"
		},
		table :
		{
			createTable : 'Tabel invoegen',
			heightUnit	: "Hoogte-eenheid:",
			insertMultipleRows : "Rijen invoegen",
			insertMultipleCols : "Kolommen invoegen",
			noOfRows : "Aantal rijen:",
			noOfCols : "Aantal kolommen:",
			insertPosition : "Positie:",
			insertBefore : "Links",
			insertAfter : "Na",
			selectTable : "Tabel selecteren",
			selectRow : "Rij selecteren",
			columnTitle : "Kolombreedte",
			colProps : "Kolomeigenschappen",
			invalidColumnWidth	: "Kolombreedte moet een positief getal zijn.",
			fixedColWidths : "Vaste kolombreedten"
		},
		cell :
		{
			title : "Cel"
		},
		colordialog :
		{
			currentColor	: "Huidige kleur"
		},
		emoticon :
		{
			angel		: "Engel",
			angry		: "Boos",
			cool		: "Cool",
			crying		: "Huilend",
			eyebrow		: "Wenkbrauw",
			frown		: "Frons",
			goofy		: "Goofy",
			grin		: "Grijns",
			half		: "Half",
			idea		: "Idee",
			laughing	: "Lachend",
			laughroll	: "Zich een breuk lachen",
			no			: "Nee",
			oops		: "Oeps",
			shy			: "Verlegen",
			smile		: "Glimlach",
			tongue		: "Tong",
			wink		: "Knipoog",
			yes			: "Ja"
		},

		menu :
		{
			link	: "Link invoegen",
			list	: "Lijst",
			paste	: "Plakken",
			action	: "Actie",
			align	: "Uitlijnen",
			emoticon: "Emoticon"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Genummerde lijst",
			bulletedTitle		: "Lijst met opsommingstekens",
			description			: "Instellingen worden toegepast op huidige niveau van lijst",
			fontsize			: "Lettergrootte:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Typ een beschrijvende naam voor de bladwijzer, bijvoorbeeld 'Sectie 1.2'. Nat het invoegen van de bladwijzer klikt u op het pictogram 'Link' of 'Bladwijzerlink document' om deze te openen.",
			title		: "Bladwijzerlink document",
			linkTo		: "Link naar:"
		},

		urllink :
		{
			title : "URL-link",
			linkText : "Linktekst:",
			selectAnchor: "Anker selecteren:",
			nourl: "Geef een URL op in het tekstveld.",
			urlhelp: "Typ of plak een URL die moet worden geopend wanneer gebruikers klikken op deze link, bijvoorbeeld http://www.voorbeeld.com.",
			displaytxthelp: "Typ de tekstweergave voor de link.",
			openinnew : "Link openen in nieuw venster"
		},

		spellchecker :
		{
			title : "Spellingcontrole",
			replace : "Vervangen:",
			suggesstion : "Suggesties:",
			withLabel : "Door:",
			replaceButton : "Vervangen",
			replaceallButton:"Alles vervangen",
			skipButton:"Overslaan",
			skipallButton: "Alles overslaan",
			undochanges: "Wijzigingen ongedaan maken",
			complete: "Spellingcontrole voltooid",
			problem: "Probleem bij ophalen van XML-gegevens",
			addDictionary: "Toevoegen aan woordenboek",
			editDictionary: "Woordenboek bewerken"
		},

		status :
		{
			keystrokeForHelp: "Druk op Alt-0 voor Help-informatie"
		},

		linkdialog :
		{
			label : "Linkvenster"
		},

		imagedatauri :
		{
			error : "De plakfunctie wordt momenteel niet ondersteund voor afbeeldingen. Gebruik in plaats daarvan de werkbalkoptie \'Afbeelding invoegen\'."
		},

		image :
		{
			previewText : "Tekst wordt rondom de door u toegevoegde afbeelding weergegeven, zoals in dit voorbeeld.",
			fileUpload : "Afbeelding selecteren van de computer"
		}
	}

};
