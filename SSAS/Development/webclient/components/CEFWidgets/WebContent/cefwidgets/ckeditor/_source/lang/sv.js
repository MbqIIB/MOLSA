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

CKEDITOR.lang["sv"] =
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
	editorTitle : "RTF-redigeraren, %1, tryck på ALT 0 för hjälp.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Redigerarverktygsfält",
	editor	: "RTF-redigerare",

	// Toolbar buttons without dialogs.
	source			: "Källa",
	newPage			: "Ny sida",
	save			: "Spara",
	preview			: "Förhandsgranskning:",
	cut				: "Klipp ut",
	copy			: "Kopiera",
	paste			: "Klistra in",
	print			: "Skriv ut",
	underline		: "Understrykning",
	bold			: "Fet",
	italic			: "Kursiv",
	selectAll		: "Markera allt",
	removeFormat	: "Ta bort formatering",
	strike			: "Genomstrykning",
	subscript		: "Nedsänkt",
	superscript		: "Upphöjt",
	horizontalrule	: "Infoga horisontell linje",
	pagebreak		: "Infoga sidbrytning",
	pagebreakAlt		: "Sidbrytning",
	unlink			: "Ta bort länk",
	undo			: "Ångra",
	redo			: "Gör om",

	// Common messages and labels.
	common :
	{
		browseServer	: "Webbläsarserver:",
		url				: "URL-adress:",
		protocol		: "Protokoll:",
		upload			: "Överför:",
		uploadSubmit	: "Sänd till servern",
		image			: "Infoga bild",
		flash			: "Infoga Flash-film",
		form			: "Infoga formulär",
		checkbox		: "Infoga kryssruta",
		radio			: "Infoga alternativknapp",
		textField		: "Infoga textfält",
		textarea		: "Infoga textområde",
		hiddenField		: "Infoga gömt fält",
		button			: "Infoga knapp",
		select			: "Infoga urvalsfält",
		imageButton		: "Infoga bildknapp",
		notSet			: "<inte angett>",
		id				: "ID:",
		name			: "Namn:",
		langDir			: "Språkriktning:",
		langDirLtr		: "Vänster till höger",
		langDirRtl		: "Höger till vänster",
		langCode		: "Språkkod:",
		longDescr		: "URL-adress till lång beskrivning:",
		cssClass		: "Formatmallsklasser:",
		advisoryTitle	: "Beskrivande namn:",
		cssStyle		: "Format:",
		ok				: "OK",
		cancel			: "Avbryt",
		close : "Stäng",
		preview			: "Förhandsgranskning:",
		generalTab		: "Allmänt",
		advancedTab		: "Avancerat",
		validateNumberFailed	: "Det här värdet är inte ett tal.",
		confirmNewPage	: "Du kommer att förlora eventuella ändringar du inte har sparat. Vill du läsa in en ny sida?",
		confirmCancel	: "Vissa av alternativen har ändrats. Vill du stänga dialogrutan?",
		options : "Alternativ",
		target			: "Mål:",
		targetNew		: "Nytt fönster (_blank)",
		targetTop		: "Det översta fönstret (_top)",
		targetSelf		: "Samma fönster (_self)",
		targetParent	: "Det överordnade fönstret (_parent)",
		langDirLTR		: "Vänster till höger",
		langDirRTL		: "Höger till vänster",
		styles			: "Format:",
		cssClasses		: "Formatmallsklasser:",
		width			: "Bredd:",
		height			: "Höjd:",
		align			: "Justera:",
		alignLeft		: "Vänsterjustera",
		alignRight		: "Högerjustera",
		alignCenter		: "Centrera",
		alignTop		: "Överkant",
		alignMiddle		: "Mitten",
		alignBottom		: "Underkant",
		invalidHeight	: "Höjden måste vara ett positivt heltal.",
		invalidWidth	: "Höjden måste vara ett positivt heltal.",
		invalidCssLength	: "Värdet på fältet '%1' måste vara ett positivt tal med eller utan giltiga CSS-måttenheter (px, %, in, cm, mm, em, ex, pt eller pc).",
		invalidHtmlLength	: "Värdet på fältet '%1' måste vara ett positivt tal med eller utan giltiga HTML-måttenheter (px eller %).",
		invalidInlineStyle	: "Värdet på det infogade formatet måste bestå av ett eller flera värdepar med formatet \"namn : värde\", avgränsade med semikolon.",
		cssLengthTooltip	: "Ange ett tal om du vill ange ett värde i bildpunkter eller ett tal med en giltig CSS-enhet (px, %, in, cm, mm, em, ex, pt eller pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, ej tillgängligt</span>"
	},

	contextmenu :
	{
		options : "Alternativ på snabbmenyn"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Infoga specialtecken",
		title		: "Specialtecken",
		options : "Alternativ för specialtecken"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL-adresslänk",
		other 		: "<annat>",
		menu		: "Redigera länk",
		title		: "Länk",
		info		: "Länkinformation",
		target		: "Mål",
		upload		: "Överför:",
		advanced	: "Avancerat",
		type		: "Länktyp:",
		toUrl		: "URL-adress",
		toAnchor	: "Länk till ankare i texten",
		toEmail		: "E-postadress",
		targetFrame	: "<ram>",
		targetPopup	: "<fönster>",
		targetFrameName	: "Målramnamn:",
		targetPopupName	: "Fönsternamn:",
		popupFeatures	: "Fönsterfunktioner:",
		popupResizable	: "Storleksändringsbart",
		popupStatusBar	: "Statusfält",
		popupLocationBar	: "Adressfält",
		popupToolbar	: "Verktygsfält",
		popupMenuBar	: "Menyrad",
		popupFullScreen	: "Helskärmsläge (endast Internet Explorer)",
		popupScrollBars	: "Rullningslistor",
		popupDependent	: "Beroende (Netscape)",
		popupLeft		: "Position för vänsterkanten",
		popupTop		: "Position för överkanten",
		id				: "ID:",
		langDir			: "Språkriktning:",
		langDirLTR		: "Vänster till höger",
		langDirRTL		: "Höger till vänster",
		acccessKey		: "Snabbtangent:",
		name			: "Namn:",
		langCode		: "Språkkod:",
		tabIndex		: "Tabbindex:",
		advisoryTitle	: "Beskrivande namn:",
		advisoryContentType	: "Rådgivande innehållstyp:",
		cssClasses		: "Formatmallsklasser:",
		charset			: "Länkad resursteckenuppsättning:",
		styles			: "Format:",
		rel			: "Relation",
		selectAnchor	: "Välj ett ankare",
		anchorName		: "Efter ankarnamn",
		anchorId		: "Efter element-ID",
		emailAddress	: "E-postadress",
		emailSubject	: "Meddelandeärende",
		emailBody		: "Meddelandeinnehåll",
		noAnchors		: "Det finns inga bokmärken i dokumentet. Om du vill lägga till ett klickar du på Infoga dokumentbokmärke i verktygsfältet.",
		noUrl			: "Du måste ange länk-URL-adressen",
		noEmail			: "Du måste ange e-postadressen"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Infoga dokumentbokmärke",
		menu		: "Redigera dokumentbokmärke",
		title		: "Dokumentbokmärke",
		name		: "Namn:",
		errorName	: "Du måste ange ett namn för dokumentbokmärket",
		remove		: "Ta bort dokumentbokmärke"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Egenskaper för numrerad lista",
		bulletedTitle		: "Egenskaper för punktlista",
		type				: "Listformat:",
		start				: "Start:",
		validateStartNumber				:"Startnumret för listan måste vara ett heltal.",
		circle				: "Cirkel",
		disc				: "Skiva",
		square				: "Fyrkant",
		none				: "Inget",
		notset				: "<inte angett>",
		armenian			: "Armenisk numrering",
		georgian			: "Georgisk numrering (an, ban, gan osv.)",
		lowerRoman			: "Romerska gemener (i, ii, iii, iv, v osv.)",
		upperRoman			: "Romerska versaler (I, II, III, IV, V osv.)",
		lowerAlpha			: "Gemener (a, b, c, d, e osv.)",
		upperAlpha			: "Versaler (A, B, C, D, E osv.)",
		lowerGreek			: "Grekiska bokstavsbenämningar (alfa, beta, gamma osv.)",
		decimal				: "Decimaltal (1, 2, 3 osv.)",
		decimalLeadingZero	: "Decimaltal med inledande nolla (01, 02, 03 osv.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Sök och ersätt",
		find				: "Sök",
		replace				: "Ersätt",
		findWhat			: "Sök efter:",
		replaceWith			: "Ersätt med:",
		notFoundMsg			: "Det gick inte att hitta den angivna texten.",
		findOptions			: "Sökalternativ",
		matchCase			: "Exakt jämförelse",
		matchWord			: "Matcha hela ord",
		matchCyclic			: "Sök i hela dokumentet",
		replaceAll			: "Ersätt alla",
		replaceSuccessMsg	: "%1 förekomster ersattes."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Infoga tabell",
		title		: "Tabell",
		menu		: "Tabellegenskaper",
		deleteTable	: "Ta bort tabell",
		rows		: "Rader:",
		columns		: "Kolumner:",
		border		: "Ramstorlek:",
		widthPx		: "bildpunkter",
		widthPc		: "procent",
		widthUnit	: "Breddenhet:",
		cellSpace	: "Cellavstånd:",
		cellPad		: "Cellutfyllnad:",
		caption		: "Bildtext:",
		summary		: "Sammanfattning:",
		headers		: "Rubriker:",
		headersNone		: "Inget",
		headersColumn	: "Första kolumnen",
		headersRow		: "Första raden",
		headersBoth		: "Båda delarna",
		invalidRows		: "Antal rader måste vara ett positivt heltal som är större än noll.",
		invalidCols		: "Antal kolumner måste vara ett positivt tal som är större än noll.",
		invalidBorder	: "Ramstorleken måste vara ett positivt heltal.",
		invalidWidth	: "Tabellbredden måste vara ett positivt heltal.",
		invalidHeight	: "Tabellhöjden måste vara ett positivt heltal.",
		invalidCellSpacing	: "Cellavståndet måste vara ett positivt heltal.",
		invalidCellPadding	: "Cellutfyllnaden måste vara ett positivt heltal.",

		cell :
		{
			menu			: "Cell",
			insertBefore	: "Infoga cell före",
			insertAfter		: "Infoga cell efter",
			deleteCell		: "Ta bort celler",
			merge			: "Sammanfoga celler",
			mergeRight		: "Sammanfoga åt höger",
			mergeDown		: "Sammanfoga nedåt",
			splitHorizontal	: "Dela cell horisontellt",
			splitVertical	: "Dela cell vertikalt",
			title			: "Cellegenskaper",
			cellType		: "Celltyp:",
			rowSpan			: "Radomfång:",
			colSpan			: "Kolumnomfång:",
			wordWrap		: "Radbrytning:",
			hAlign			: "Horisontal justering:",
			vAlign			: "Vertikal justering:",
			alignBaseline	: "Baslinje",
			bgColor			: "Bakgrundsfärg:",
			borderColor		: "Ramfärg:",
			data			: "Data",
			header			: "Rubrik",
			yes				: "Ja",
			no				: "Nej",
			invalidWidth	: "Cellbredden måste vara ett positivt heltal.",
			invalidHeight	: "Cellhöjden måste vara ett positivt heltal.",
			invalidRowSpan	: "Radomfånget måste vara ett positivt heltal.",
			invalidColSpan	: "Kolumnomfånget måste vara ett positivt heltal.",
			chooseColor 	: "Fler färger..."
		},

		row :
		{
			menu			: "Rad",
			insertBefore	: "Infoga rad före",
			insertAfter		: "Infoga rad efter",
			deleteRow		: "Ta bort rader"
		},

		column :
		{
			menu			: "Kolumn",
			insertBefore	: "Infoga kolumn före",
			insertAfter		: "Infoga kolumn efter",
			deleteColumn	: "Ta bort kolumner"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Knappegenskaper",
		text		: "Text (värde):",
		type		: "Typ:",
		typeBtn		: "Knapp",
		typeSbm		: "Lämna in",
		typeRst		: "Återställ"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Kryssruteegenskaper",
		radioTitle	: "Alternativknappsegenskaper",
		value		: "Värde:",
		selected	: "Valt"
	},

	// Form Dialog.
	form :
	{
		title		: "Infoga formulär",
		menu		: "Formuläregenskaper",
		action		: "Åtgärd:",
		method		: "Metod:",
		encoding	: "Kodning:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Välj fältegenskaper",
		selectInfo	: "Välj information",
		opAvail		: "Tillgängliga alternativ",
		value		: "Värde:",
		size		: "Storlek:",
		lines		: "rader",
		chkMulti	: "Tillåt val av flera alternativ",
		opText		: "Text:",
		opValue		: "Värde:",
		btnAdd		: "Lägg till",
		btnModify	: "Ändra",
		btnUp		: "Uppåt",
		btnDown		: "Nedåt",
		btnSetValue : "Ange som valt värde",
		btnDelete	: "Ta bort"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Textområdesegenskaper",
		cols		: "Kolumner:",
		rows		: "Rader:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Textfältsegenskaper",
		name		: "Namn:",
		value		: "Värde:",
		charWidth	: "Teckenbredd:",
		maxChars	: "Maximalt teckenantal:",
		type		: "Typ:",
		typeText	: "Text",
		typePass	: "Lösenord"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Egenskaper för gömt fält",
		name	: "Namn:",
		value	: "Värde:"
	},

	// Image Dialog.
	image :
	{
		title		: "Bild",
		titleButton	: "Bildknappsegenskaper",
		menu		: "Bildegenskaper",
		infoTab	: "Bildinformation",
		btnUpload	: "Överför bild",
		upload	: "Överför",
		alt		: "Alternativtext:",
		lockRatio	: "Lås höjd/bredd-förhållandet",
		resetSize	: "Återställ storleken",
		border	: "Ram:",
		hSpace	: "Horisontalt avstånd:",
		vSpace	: "Vertikalt avstånd:",
		alertUrl	: "Du måste ange URL-adressen till bilden",
		linkTab	: "Länk",
		button2Img	: "Vill du omvandla den valda bildknappen till en bild?",
		img2Button	: "Vill du omvandla den valda bilden till en bildknapp?",
		urlMissing : "URL-adressen till bildkällan saknas.",
		validateBorder : "Ramvärdet måste vara ett positivt heltal.",
		validateHSpace : "Det horisontella avståndet måste vara ett positivt heltal.",
		validateVSpace : "Det vertikala avståndet måste vara ett positivt heltal."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flash-egenskaper",
		propertiesTab	: "Egenskaper",
		title		: "Flash",
		chkPlay		: "Spela upp automatiskt",
		chkLoop		: "Slinga",
		chkMenu		: "Aktivera Flash-menyn",
		chkFull		: "Tillåt helskärmsläge",
 		scale		: "Skala:",
		scaleAll		: "Visa alla",
		scaleNoBorder	: "Ingen ram",
		scaleFit		: "Passa exakt",
		access			: "Skriptåtkomst:",
		accessAlways	: "Alltid",
		accessSameDomain	: "Samma domän",
		accessNever	: "Aldrig",
		alignAbsBottom: "Absolut efter underkant",
		alignAbsMiddle: "Absolut efter mitten",
		alignBaseline	: "Baslinje",
		alignTextTop	: "Text överst",
		quality		: "Kvalitet:",
		qualityBest	: "Bästa",
		qualityHigh	: "Högsta",
		qualityAutoHigh	: "Automatiskt högsta",
		qualityMedium	: "Medelhög",
		qualityAutoLow	: "Automatiskt lägsta",
		qualityLow	: "Lägsta",
		windowModeWindow	: "Fönster",
		windowModeOpaque	: "Ogenomskinligt",
		windowModeTransparent	: "Genomskinligt",
		windowMode	: "Fönsterläge:",
		flashvars	: "Variabler:",
		bgcolor	: "Bakgrundsfärg:",
		hSpace	: "Horisontalt avstånd:",
		vSpace	: "Vertikalt avstånd:",
		validateSrc : "Du måste ange en URL-adress.",
		validateHSpace : "Det horisontella avståndet måste vara ett positivt heltal.",
		validateVSpace : "Det vertikala avståndet måste vara ett positivt heltal."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Stavningskontroll",
		title			: "Stavningskontroll",
		notAvailable	: "Tjänsten är inte tillgänglig.",
		errorLoading	: "Det uppstod ett fel när programtjänstevärden skulle läsas in: %s.",
		notInDic		: "Finns inte i ordlistan",
		changeTo		: "Ändra till",
		btnIgnore		: "Ignorera",
		btnIgnoreAll	: "Ignorera alla",
		btnReplace		: "Ersätt",
		btnReplaceAll	: "Ersätt alla",
		btnUndo			: "Ångra",
		noSuggestions	: "- inga förslag -",
		progress		: "Stavningskontrollen utförs...",
		noMispell		: "Stavningskontrollen slutfördes: Inga stavfel hittades",
		noChanges		: "Stavningskontrollen slutfördes: Inga ord ändrades",
		oneChange		: "Stavningskontrollen slutfördes: Ett ord ändrades",
		manyChanges		: "Stavningskontrollen slutfördes: %1 ord ändrades",
		ieSpellDownload	: "Stavningskontrollsfunktionen är inte installerad. Vill du hämta den nu?"
	},

	smiley :
	{
		toolbar	: "Infoga känslolägesikon",
		title	: "Känslolägesikoner",
		options : "Alternativ för känslolägesikoner"
	},

	elementsPath :
	{
		eleLabel : "Elementsökväg",
		eleTitle : "%1-element"
	},

	numberedlist : "Numrerad lista",
	bulletedlist : "Punktlista",
	indent : "Öka indrag",
	outdent : "Minska indrag",

	justify :
	{
		left : "Vänsterjustera",
		center : "Centrera",
		right : "Högerjustera",
		block : "Marginaljustera"
	},

	blockquote : "Blockcitat",

	clipboard :
	{
		title		: "Klistra in",
		cutError	: "Säkerhetsinställningarna för webbläsaren innebär att det inte går att klippa ut automatiskt. Tryck på Ctrl+X i stället.",
		copyError	: "Säkerhetsinställningarna för webbläsaren innebär att det inte går att kopiera automatiskt. Tryck på Ctrl+C i stället.",
		pasteMsg	: "Tryck på Ctrl+V (Kommando+V i Mac OS) om du vill klistra in nedan.",
		securityMsg	: "Säkerhetsinställningarna för webbläsaren innebär att det inte går att klistra in direkt från Urklipp.",
		pasteArea	: "Klistra in område"
	},

	pastefromword :
	{
		confirmCleanup	: "Det verkar som om den text du vill klistra in är kopierad från Word. Vill du rensa den innan du klistrar in?",
		toolbar			: "Klistra in innehåll",
		title			: "Klistra in innehåll",
		error			: "Det gick inte att rensa inklistrade data på grund av ett internt fel"
	},

	pasteText :
	{
		button	: "Klistra in som oformaterad text",
		title	: "Klistra in som oformaterad text"
	},

	templates :
	{
		button 			: "Mallar",
		title : "Innehållsmallar",
		options : "Alternativ för mallar",
		insertOption: "Ersätt faktiskt innehåll",
		selectPromptMsg: "Välj den mall du vill öppna i redigeraren",
		emptyListMsg : "(Det finns inga definierade mallar)"
	},

	showBlocks : "Visa block",

	stylesCombo :
	{
		label		: "Format",
		panelTitle 	: "Format",
		panelTitle1	: "Blockformat",
		panelTitle2	: "Textformat",
		panelTitle3	: "Objektformat"
	},

	format :
	{
		label		: "Format",
		panelTitle	: "Styckeformat",

		tag_p		: "Normalt",
		tag_pre		: "Formaterat",
		tag_address	: "Adress",
		tag_h1		: "Rubrik 1",
		tag_h2		: "Rubrik 2",
		tag_h3		: "Rubrik 3",
		tag_h4		: "Rubrik 4",
		tag_h5		: "Rubrik 5",
		tag_h6		: "Rubrik 6",
		tag_div		: "Normalt (DIV)"
	},

	div :
	{
		title				: "Skapa DIV-behållare",
		toolbar				: "Skapa DIV-behållare",
		cssClassInputLabel	: "Formatmallsklasser",
		styleSelectLabel	: "Format",
		IdInputLabel		: "ID",
		languageCodeInputLabel	: "  Språkkod",
		inlineStyleInputLabel	: "Integrerat format",
		advisoryTitleInputLabel	: "Beskrivande namn",
		langDirLabel		: "Språkriktning",
		langDirLTRLabel		: "Vänster till höger (LTR)",
		langDirRTLLabel		: "Höger till vänster (RTL)",
		edit				: "Redigera DIV",
		remove				: "Ta bort DIV"
  	},

	iframe :
	{
		title		: "IFrame-ramsegenskaper",
		toolbar		: "Infoga IFrame-ram",
		noUrl		: "Ange URL-adressen till IFrame-ramen",
		scrolling	: "Aktivera rullningslister",
		border		: "Visa ramkant"
	},

	font :
	{
		label		: "Teckensnitt",
		voiceLabel	: "Teckensnitt",
		panelTitle	: "Teckensnittsnamn"
	},

	fontSize :
	{
		label		: "Storlek",
		voiceLabel	: "Teckenstorlek",
		panelTitle	: "Teckenstorlek"
	},

	colorButton :
	{
		textColorTitle	: "Textfärg",
		bgColorTitle	: "Bakgrundsfärg",
		panelTitle		: "Färger",
		auto			: "Automatiskt",
		more			: "Fler färger..."
	},

	colors :
	{
		"000" : "Svart",
		"800000" : "Rödbrunt",
		"8B4513" : "Sadelbrunt",
		"2F4F4F" : "Mörkt skiffergrått",
		"008080" : "Blågrönt",
		"000080" : "Marinblått",
		"4B0082" : "Indigoblått",
		"696969" : "Mörkgrått",
		"B22222" : "Tegelstensrött",
		"A52A2A" : "Brunt",
		"DAA520" : "Gyllenrött",
		"006400" : "Mörkgrönt",
		"40E0D0" : "Turkost",
		"0000CD" : "Mellanblått",
		"800080" : "Lila",
		"808080" : "Grått",
		"F00" : "Rött",
		"FF8C00" : "Mörkorange",
		"FFD700" : "Guld",
		"008000" : "Grönt",
		"0FF" : "Cyan",
		"00F" : "Blått",
		"EE82EE" : "Violett",
		"A9A9A9" : "Dimgrått",
		"FFA07A" : "Ljust laxrosa",
		"FFA500" : "Orange",
		"FFFF00" : "Gult",
		"00FF00" : "Limegrönt",
		"AFEEEE" : "Ljusturkost",
		"ADD8E6" : "Ljusblått",
		"DDA0DD" : "Plommon",
		"D3D3D3" : "Ljusgrått",
		"FFF0F5" : "Lavendelrosa",
		"FAEBD7" : "Antikvitt",
		"FFFFE0" : "Ljusgult",
		"F0FFF0" : "Honungsdagg",
		"F0FFFF" : "Azurblått",
		"F0F8FF" : "Aliceblått",
		"E6E6FA" : "Lavendel",
		"FFF" : "Vitt"
	},

	scayt :
	{
		title			: "Stavningskontrollera medan du skriver",
		opera_title		: "Kan inte användas i Opera",
		enable			: "Aktivera SCAYT",
		disable			: "Avaktivera SCAYT",
		about			: "Om SCAYT",
		toggle			: "Växla SCAYT",
		options			: "Alternativ",
		langs			: "Språk",
		moreSuggestions	: "Fler förslag",
		ignore			: "Ignorera",
		ignoreAll		: "Ignorera alla",
		addWord			: "Lägg till ord",
		emptyDic		: "Ordlistans namn får inte vara tomt.",

		optionsTab		: "Alternativ",
		allCaps			: "Ignorera ord med endast versaler",
		ignoreDomainNames : "Ignorera domännamn",
		mixedCase		: "Ignorera ord med både versaler och gemener",
		mixedWithDigits	: "Ignorera ord som innehåller tal",

		languagesTab	: "Språk",

		dictionariesTab	: "Ordlistor",
		dic_field_name	: "Ordlistenamn",
		dic_create		: "Skapa",
		dic_restore		: "Återställ",
		dic_delete		: "Ta bort",
		dic_rename		: "Ändra namn",
		dic_info		: "Användarordlistan lagras ursprungligen i en kaka, men kakor har en begränsad storlek. Det innebär att när användarordlistan blir så stor att det inte går att lagra den i en kaka så går det att lagra den på servern. Om du vill lagra din privata ordlista på servern anger du ett namn för den. Om du redan har en lagrad ordlista anger du namnet på den och sedan klickar du på Återställ.",

		aboutTab		: "Om"
	},

	about :
	{
		title		: "Om CKEditor",
		dlgTitle	: "Om CKEditor",
		help	: "Om du behöver hjälp läser du i $1.",
		userGuide : "Användarhandbok för CKEditor",
		moreInfo	: "Om du vill ha information om licensiering går du till vår webbplats:",
		copy		: "Copyright &copy; $1. Med ensamrätt."
	},

	maximize : "Maximera",
	minimize : "Minimera",

	fakeobjects :
	{
		anchor	: "Ankare",
		flash	: "Flash-animering",
		iframe		: "IFrame-ram",
		hiddenfield	: "Gömt fält",
		unknown	: "Okänt objekt"
	},

	resize : "Om du vill ändra storlek drar du",

	colordialog :
	{
		title		: "Välj färg",
		options	:	"Färgalternativ",
		highlight	: "Framhävning",
		selected	: "Vald färg",
		clear		: "Rensa"
	},

	toolbarCollapse	: "Komprimera verktygsfält",
	toolbarExpand	: "Expandera verktygsfält",

	toolbarGroups :
	{
		document : "Dokument",
		clipboard : "Urklipp/Ångra",
		editing : "Redigeringsverktygsfält",
		forms : "Formulär",
		basicstyles : "Grundläggande format",
		paragraph : "Stycke",
		links : "Länkar",
		insert : "Infoga",
		styles : "Format",
		colors : "Färger",
		tools : "Verktyg"
	},

	bidi :
	{
		ltr : "Textriktning från vänster till höger",
		rtl : "Textriktning från höger till vänster"
	},

	docprops :
	{
		label : "Dokumentegenskaper",
		title : "Dokumentegenskaper",
		design : "Design",
		meta : "Metamärkord",
		chooseColor : "Välj",
		other : "Annat...",
		docTitle :	"Sidrubrik",
		charset : 	"Teckentabell",
		charsetOther : "Annan teckentabell",
		charsetASCII : "ASCII",
		charsetCE : "Centraleuropisk",
		charsetCT : "Kinesisk (traditionell) (Big5)",
		charsetCR : "Kyrillisk",
		charsetGR : "Grekiska",
		charsetJP : "Japanska",
		charsetKR : "Koreanska",
		charsetTR : "Turkiska",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Västeuropeisk",
		docType : "Dokumenttypshuvud",
		docTypeOther : "Annat dokumenttypshuvud",
		xhtmlDec : "Ta med XHTML-deklarationer",
		bgColor : "Bakgrundsfärg",
		bgImage : "URL-adress till bakgrundsbild",
		bgFixed : "Icke-rullande (fast) bakgrund",
		txtColor : "Textfärg",
		margin : "Sidmarginaler",
		marginTop : "Överkant",
		marginLeft : "Vänsterjustera",
		marginRight : "Högerjustera",
		marginBottom : "Underkant",
		metaKeywords : "Dokumentindexeringsnyckelord (kommaavgränsade)",
		metaDescription : "Dokumentbeskrivning",
		metaAuthor : "Författare",
		metaCopyright : "Copyright",
		previewHtml : "<p>Det här är <strong>exempeltext</strong>. Du använder <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "tum",
			widthCm	: "centimeter",
			widthMm	: "millimeter",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "punkter",
			widthPc	: "pica",
			required : "Obligatoriskt"
		},
		table :
		{
			createTable : 'Infoga tabell',
			heightUnit	: "Höjdenhet:",
			insertMultipleRows : "Infoga rader",
			insertMultipleCols : "Infoga kolumner",
			noOfRows : "Antal rader:",
			noOfCols : "Antal kolumner:",
			insertPosition : "Position:",
			insertBefore : "Före",
			insertAfter : "Efter",
			selectTable : "Välj tabell",
			selectRow : "Välj rad",
			columnTitle : "Kolumnbredd",
			colProps : "Kolumnegenskaper",
			invalidColumnWidth	: "Kolumnbredden måste vara ett positivt tal.",
			fixedColWidths : "Kolumner med fast bredd"
		},
		cell :
		{
			title : "Cell"
		},
		colordialog :
		{
			currentColor	: "Aktuell färg"
		},
		emoticon :
		{
			angel		: "Ängel",
			angry		: "Arg",
			cool		: "Cool",
			crying		: "Gråter",
			eyebrow		: "Ögonbryn",
			frown		: "Miner",
			goofy		: "Tokig",
			grin		: "Leende",
			half		: "Halv",
			idea		: "Idé",
			laughing	: "Skrattar",
			laughroll	: "Gapskratt",
			no			: "Nej",
			oops		: "Hoppsan",
			shy			: "Blyg",
			smile		: "Glad min",
			tongue		: "Tunga",
			wink		: "Blinkar med ena ögat",
			yes			: "Ja"
		},

		menu :
		{
			link	: "Infoga länk",
			list	: "Lista",
			paste	: "Klistra in",
			action	: "Åtgärd",
			align	: "Justera",
			emoticon: "Känslolägesikon"
		},

		iframe :
		{
			title	: "IFrame-ram"
		},

		list:
		{
			numberedTitle		: "Numrerad lista",
			bulletedTitle		: "Punktlista",
			description			: "Inställningarna används på den aktuella listnivån",
			fontsize			: "Teckenstorlek:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Ange ett beskrivande bokmärksnamn, som 'Avsnitt 1.2'. När du har infogat bokmärket länkar du till det genom att klicka på Länk eller Dokumentbokmärkslänk.",
			title		: "Dokumentbokmärkslänk",
			linkTo		: "Länk till:"
		},

		urllink :
		{
			title : "URL-adresslänk",
			linkText : "Länktext:",
			selectAnchor: "Välj ett ankare:",
			nourl: "Ange en URL-adress i textfältet.",
			urlhelp: "Skriv eller klistra in en URL-adress som ska öppnas när användare klickar på länken. Exempel: http://www.företaget.se/.",
			displaytxthelp: "Skriv den text som ska visas i länken.",
			openinnew : "Öppna länken i nytt fönster"
		},

		spellchecker :
		{
			title : "Stavningskontrollera",
			replace : "Ersätt:",
			suggesstion : "Förslag:",
			withLabel : "Med:",
			replaceButton : "Ersätt",
			replaceallButton:"Ersätt alla",
			skipButton:"Ignorera",
			skipallButton: "Ignorera alla",
			undochanges: "Ångra ändringar",
			complete: "Stavningskontrollen är slutförd",
			problem: "Problem med hämtningen av XML-data",
			addDictionary: "Lägg till i ordlista",
			editDictionary: "Redigera ordlista"
		},

		status :
		{
			keystrokeForHelp: "Om du vill visa hjälpen trycker du på Alt+0."
		},

		linkdialog :
		{
			label : "Länkdialogruta"
		},

		imagedatauri :
		{
			error : "Det går inte att klistra in bilder. Om du vill klistra in en bild använder du alternativet Infoga bild i verktygsfältet i stället."
		},

		image :
		{
			previewText : "Texten flödas runt den bilden du lägger till som i exemplet.",
			fileUpload : "Välj en bild på datorn:"
		}
	}

};
