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

CKEDITOR.lang["de"] =
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
	editorTitle : "Rich Text Editor, %1, drücken Sie ALT 0 für Hilfe.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Symbolleisten im Editor ",
	editor	: "Rich Text Editor",

	// Toolbar buttons without dialogs.
	source			: "Quelle",
	newPage			: "Neue Seite",
	save			: "Speichern",
	preview			: "Vorschau:",
	cut				: "Ausschneiden",
	copy			: "Kopieren",
	paste			: "Einfügen",
	print			: "Drucken",
	underline		: "Unterstreichen",
	bold			: "Fett",
	italic			: "Kursiv",
	selectAll		: "Alle auswählen",
	removeFormat	: "Formatierung entfernen",
	strike			: "Durchgestrichen",
	subscript		: "Tiefgestellt",
	superscript		: "Hochgestellt",
	horizontalrule	: "Horizontale Linie einfügen",
	pagebreak		: "Seitenumbruch einfügen",
	pagebreakAlt		: "Seitenumbruch",
	unlink			: "Link entfernen",
	undo			: "Rückgängig machen",
	redo			: "Wiederherstellen",

	// Common messages and labels.
	common :
	{
		browseServer	: "Browser-Server:",
		url				: "URL:",
		protocol		: "Protokoll:",
		upload			: "Hochladen:",
		uploadSubmit	: "An den Server senden",
		image			: "Bild einfügen",
		flash			: "Flashfilm einfügen",
		form			: "Maske einfügen",
		checkbox		: "Kontrollkästchen einfügen",
		radio			: "Optionsfeld einfügen",
		textField		: "Textfeld einfügen",
		textarea		: "Textbereich einfügen",
		hiddenField		: "Verdecktes Feld einfügen",
		button			: "Schaltfläche einfügen",
		select			: "Auswahlfeld einfügen",
		imageButton		: "Grafikschaltfläche einfügen",
		notSet			: "<nicht festgelegt>",
		id				: "ID:",
		name			: "Name:",
		langDir			: "Sprachrichtung:",
		langDirLtr		: "Von links nach rechts",
		langDirRtl		: "Von rechts nach links",
		langCode		: "Sprachcode:",
		longDescr		: "Langbeschreibung URL:",
		cssClass		: "Formatvorlageklassen:",
		advisoryTitle	: "Ratgebertitel:",
		cssStyle		: "Formatvorlage:",
		ok				: "OK",
		cancel			: "Abbrechen",
		close : "Schließen",
		preview			: "Vorschau:",
		generalTab		: "Allgemein",
		advancedTab		: "Erweitert",
		validateNumberFailed	: "Dieser Wert ist keine Zahl.",
		confirmNewPage	: "Alle nicht gespeicherten Änderungen an diesem Inhalt gehen verloren. Möchten Sie wirklich eine neue Seite laden?",
		confirmCancel	: "Einige Optionen wurden geändert. Möchten Sie das Dialogfenster wirklich schließen?",
		options : "Optionen",
		target			: "Ziel:",
		targetNew		: "Neues Fenster (_blank)",
		targetTop		: "Aktives Fenster (_top)",
		targetSelf		: "Gleiches Fenster (_self)",
		targetParent	: "Übergeordnetes Fenster (_parent)",
		langDirLTR		: "Von links nach rechts",
		langDirRTL		: "Von rechts nach links",
		styles			: "Formatvorlage:",
		cssClasses		: "Formatvorlageklassen:",
		width			: "Breite:",
		height			: "Höhe:",
		align			: "Ausrichten:",
		alignLeft		: "Links",
		alignRight		: "Rechts",
		alignCenter		: "Zentriert",
		alignTop		: "Oben",
		alignMiddle		: "Mitte",
		alignBottom		: "Unten",
		invalidHeight	: "Die Höhe muss eine positive Ganzzahl sein.",
		invalidWidth	: "Die Breite muss eine positive Ganzzahl sein.",
		invalidCssLength	: "Der Wert für das Feld '%1' muss eine positive Zahl mit oder ohne gültige CSS-Maßeinheit sein (px, %, in, cm, mm, em, ex, pt oder pc).",
		invalidHtmlLength	: "Der Wert für das Feld '%1' muss eine positive Zahl mit oder ohne gültige HTML-Maßeinheit sein (px oder %).",
		invalidInlineStyle	: "Der Wert für den Inlinestil muss aus einem oder mehreren Tupeln mit dem Format \"Name : Wert\" bestehen. Die Tupel werden durch Semikolons getrennt.",
		cssLengthTooltip	: "Geben Sie eine Zahl für einen Wert in Pixeln oder eine Zahl mit einer gültigen CSS-Einheit ein (px, %, in, cm, mm, em, ex, pt oder pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, nicht verfügbar</span>"
	},

	contextmenu :
	{
		options : "Kontextmenüoptionen"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Sonderzeichen einfügen",
		title		: "Sonderzeichen",
		options : "Optionen für Sonderzeichen"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL-Link",
		other 		: "<sonstiges>",
		menu		: "Link bearbeiten",
		title		: "Link",
		info		: "Linkinformationen",
		target		: "Ziel",
		upload		: "Hochladen:",
		advanced	: "Erweitert",
		type		: "Linktyp:",
		toUrl		: "URL",
		toAnchor	: "Link zu Anker im Text",
		toEmail		: "E-Mail",
		targetFrame	: "<Rahmen>",
		targetPopup	: "<Dialogfenster>",
		targetFrameName	: "Name des Zielrahmens:",
		targetPopupName	: "Name des Dialogfensters:",
		popupFeatures	: "Funktionen des Dialogfensters:",
		popupResizable	: "Größenverstellbar",
		popupStatusBar	: "Statusleiste",
		popupLocationBar	: "Adresszeile",
		popupToolbar	: "Symbolleiste",
		popupMenuBar	: "Menüleiste",
		popupFullScreen	: "Vollbild (IE)",
		popupScrollBars	: "Bildlaufleisten",
		popupDependent	: "Abhängig (Netscape)",
		popupLeft		: "Linke Position",
		popupTop		: "Oberste Position",
		id				: "ID:",
		langDir			: "Sprachrichtung:",
		langDirLTR		: "Von links nach rechts",
		langDirRTL		: "Von rechts nach links",
		acccessKey		: "Zugriffstaste:",
		name			: "Name:",
		langCode		: "Sprachcode:",
		tabIndex		: "Tabulatorindex:",
		advisoryTitle	: "Ratgebertitel:",
		advisoryContentType	: "Ratgeber-Inhaltstyp:",
		cssClasses		: "Formatvorlageklassen:",
		charset			: "Zeichensatz der verlinkten Ressource:",
		styles			: "Formatvorlage:",
		rel			: "Beziehung",
		selectAnchor	: "Anker auswählen",
		anchorName		: "Nach Ankernamen",
		anchorId		: "Nach Element-ID",
		emailAddress	: "E-Mail-Adresse",
		emailSubject	: "Betreff der Nachricht",
		emailBody		: "Nachrichtentext",
		noAnchors		: "Im Dokument sind keine Lesezeichen vorhanden. Klicken Sie in der Symbolleiste auf das Symbol 'Dokumentlesezeichen einfügen', um ein Lesezeichen einzufügen. ",
		noUrl			: "Geben Sie die Link-URL ein",
		noEmail			: "Geben Sie die E-Mail-Adresse ein"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Dokumentlesezeichen einfügen",
		menu		: "Dokumentlesezeichen bearbeiten",
		title		: "Dokumentlesezeichen",
		name		: "Name:",
		errorName	: "Geben Sie einen Namen für das Dokumentlesezeichen ein.",
		remove		: "Dokumentlesezeichen löschen"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Eigenschaften der nummerierten Liste",
		bulletedTitle		: "Eigenschaften der Liste mit Punkten",
		type				: "Listenstil",
		start				: "Start:",
		validateStartNumber				:"Der Startwert für die Liste muss eine ganze Zahl sein..",
		circle				: "Circle (Kreis)",
		disc				: "Disc (ausgefüllter Kreis)",
		square				: "Square (Quadrat)",
		none				: "Keine",
		notset				: "<nicht festgelegt>",
		armenian			: "Armenische Nummerierung",
		georgian			: "Georgische Nummerierung (an, ban, gan usw.)",
		lowerRoman			: "Kleine römische Zahlen (i, ii, iii, iv, v usw.)",
		upperRoman			: "Große römische Zahlen (I, II, III, IV, V usw.)",
		lowerAlpha			: "Kleine alphabetische Nummerierung (a, b, c, d, e usw.)",
		upperAlpha			: "Große alphabetische Nummerierung (A, B, C, D, E usw.)",
		lowerGreek			: "Kleine griechische Nummerierung (alpha, beta, gamma usw.)",
		decimal				: "Dezimalzahlen (1, 2, 3 etc.)",
		decimalLeadingZero	: "Dezimalzahlen mit führender Null (01, 02, 03 etc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Suchen und Ersetzen",
		find				: "Suchen",
		replace				: "Ersetzen",
		findWhat			: "Suchen:",
		replaceWith			: "Ersetzen mit:",
		notFoundMsg			: "Der angegebene Text wurde nicht gefunden.",
		findOptions			: "Optionen suchen",
		matchCase			: "Groß-/Kleinschreibung beachten",
		matchWord			: "Ganzes Wort",
		matchCyclic			: "Von Anfang an suchen",
		replaceAll			: "Alle ersetzen",
		replaceSuccessMsg	: "%1 Vorkommen ersetzt."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Tabelle einfügen",
		title		: "Tabelle",
		menu		: "Tabelleneigenschaften",
		deleteTable	: "Tabelle löschen",
		rows		: "Zeilen:",
		columns		: "Spalten:",
		border		: "Größe der Umrandung:",
		widthPx		: "Pixel",
		widthPc		: "Prozent",
		widthUnit	: "Einheit für Breite:",
		cellSpace	: "Zellenabstand:",
		cellPad		: "Zellenrandbreite:",
		caption		: "Beschriftung:",
		summary		: "Zusammenfassung:",
		headers		: "Überschriften:",
		headersNone		: "Keine",
		headersColumn	: "Erste Spalte",
		headersRow		: "Erste Zeile",
		headersBoth		: "Beide",
		invalidRows		: "Die Anzahl der Zeilen muss eine Ganzzahl größer als null sein.",
		invalidCols		: "Die Anzahl der Spalten muss eine Ganzzahl größer als null sein.",
		invalidBorder	: "Die Größe der Umrandung muss eine positive Zahl sein.",
		invalidWidth	: "Die Tabellenbreite muss eine positive Zahl sein.",
		invalidHeight	: "Die Tabellenhöhe muss eine positive Zahl sein.",
		invalidCellSpacing	: "Der Zellenabstand muss eine positive Zahl sein.",
		invalidCellPadding	: "Die Zellenrandbreite muss eine positive Zahl sein.",

		cell :
		{
			menu			: "Zelle",
			insertBefore	: "Zelle davor einfügen",
			insertAfter		: "Zelle dahinter einfügen",
			deleteCell		: "Zellen löschen",
			merge			: "Zellen verbinden",
			mergeRight		: "Rechts verbinden",
			mergeDown		: "Unten verbinden",
			splitHorizontal	: "Zelle horizontal teilen",
			splitVertical	: "Zelle vertikal teilen",
			title			: "Zelleneigenschaften",
			cellType		: "Zellentyp:",
			rowSpan			: "Zelle erstreckt sich über mehrere Zeilen:",
			colSpan			: "Zelle erstreckt sich über mehrere Spalten:",
			wordWrap		: "Zeilenumbruch:",
			hAlign			: "Horizontale Ausrichtung:",
			vAlign			: "Vertikale Ausrichtung:",
			alignBaseline	: "Grundlinie",
			bgColor			: "Hintergrundfarbe:",
			borderColor		: "Umrandungsfarbe:",
			data			: "Daten",
			header			: "Überschrift",
			yes				: "Ja",
			no				: "Nein",
			invalidWidth	: "Die Zellenbreite muss eine positive Zahl sein.",
			invalidHeight	: "Die Zellenhöhe muss eine positive Zahl sein.",
			invalidRowSpan	: "Die Tabellenzelle, die sich über mehrere Zeilen erstreckt, muss eine positive Ganzzahl sein.",
			invalidColSpan	: "Die Tabellenzelle, die sich über mehrere Spalten erstreckt, muss eine positive Ganzzahl sein.",
			chooseColor 	: "Weitere Farben..."
		},

		row :
		{
			menu			: "Zeile",
			insertBefore	: "Zeile davor einfügen",
			insertAfter		: "Zeile dahinter einfügen",
			deleteRow		: "Zeilen löschen"
		},

		column :
		{
			menu			: "Spalte",
			insertBefore	: "Spalte davor einfügen",
			insertAfter		: "Spalte dahinter einfügen",
			deleteColumn	: "Spalten löschen"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Schaltflächeneigenschaften",
		text		: "Text (Wert):",
		type		: "Typ:",
		typeBtn		: "Schaltfläche",
		typeSbm		: "Senden",
		typeRst		: "Zurücksetzen"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Kontrollkästcheneigenschaften",
		radioTitle	: "Optionsfeldeigenschaften",
		value		: "Wert:",
		selected	: "Ausgewählt"
	},

	// Form Dialog.
	form :
	{
		title		: "Maske einfügen",
		menu		: "Maskeneigenschaften",
		action		: "Aktion:",
		method		: "Methode:",
		encoding	: "Codierung:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Feldeigenschaften auswählen",
		selectInfo	: "Info zum Feld 'Auswählen'",
		opAvail		: "Verfügbare Optionen",
		value		: "Wert:",
		size		: "Größe:",
		lines		: "Linien",
		chkMulti	: "Mehrfachauswahl zulassen",
		opText		: "Text:",
		opValue		: "Wert:",
		btnAdd		: "Hinzufügen",
		btnModify	: "Ändern",
		btnUp		: "Nach oben",
		btnDown		: "Nach unten",
		btnSetValue : "Als ausgewählten Wert festlegen",
		btnDelete	: "Löschen"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Textbereicheigenschaften",
		cols		: "Spalten:",
		rows		: "Zeilen:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Textfeldeigenschaften",
		name		: "Name:",
		value		: "Wert:",
		charWidth	: "Zeichenbreite:",
		maxChars	: "Maximal zulässige Zeichen:",
		type		: "Typ:",
		typeText	: "Text",
		typePass	: "Kennwort "
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Eigenschaften für verdecktes Feld",
		name	: "Name:",
		value	: "Wert:"
	},

	// Image Dialog.
	image :
	{
		title		: "Grafik",
		titleButton	: "Eigenschaften der Grafikschaltfläche",
		menu		: "Grafikeigenschaften",
		infoTab	: "Grafikinformationen",
		btnUpload	: "Grafik hochladen",
		upload	: "Hochladen",
		alt		: "Alternativer Text:",
		lockRatio	: "Seitenverhältnis sperren",
		resetSize	: "Größe zurücksetzen",
		border	: "Rahmen:",
		hSpace	: "Horizontaler Abstand:",
		vSpace	: "Vertikaler Abstand:",
		alertUrl	: "Geben Sie die Grafik-URL ein",
		linkTab	: "Link",
		button2Img	: "Möchten Sie die ausgewählte Grafikschaltfläche in eine einfache Grafik umwandeln?",
		img2Button	: "Möchten Sie die ausgewählte Grafik in eine Grafikschaltfläche umwandeln?",
		urlMissing : "Die Quell-URL für die Grafik fehlt.",
		validateBorder : "Der Rahmen muss eine positive Ganzzahl sein.",
		validateHSpace : "Der horizontale Abstand muss eine positive Ganzzahl sein.",
		validateVSpace : "Der vertikale Abstand muss eine positive Ganzzahl sein."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flash-Eigenschaften",
		propertiesTab	: "Eigenschaften",
		title		: "Flash",
		chkPlay		: "Automatische Wiedergabe",
		chkLoop		: "Wiederholt abspielen",
		chkMenu		: "Flash-Menü aktivieren",
		chkFull		: "Gesamtanzeige zulassen",
 		scale		: "Maßstab:",
		scaleAll		: "Alle anzeigen",
		scaleNoBorder	: "Kein Rahmen",
		scaleFit		: "Exakte Anpassung",
		access			: "Script-Zugriff:",
		accessAlways	: "Immer",
		accessSameDomain	: "Dieselbe Domäne",
		accessNever	: "Nie",
		alignAbsBottom: "Abs. unten",
		alignAbsMiddle: "Abs. Mitte",
		alignBaseline	: "Grundlinie",
		alignTextTop	: "Oben am Text",
		quality		: "Qualität:",
		qualityBest	: "Höchste",
		qualityHigh	: "Hoch",
		qualityAutoHigh	: "Automatisch hoch",
		qualityMedium	: "Mittel",
		qualityAutoLow	: "Automatisch niedrig",
		qualityLow	: "Niedrig",
		windowModeWindow	: "Fenster",
		windowModeOpaque	: "Nicht transparent",
		windowModeTransparent	: "Transparent",
		windowMode	: "Fenstermodus:",
		flashvars	: "Variablen:",
		bgcolor	: "Hintergrundfarbe:",
		hSpace	: "Horizontaler Abstand:",
		vSpace	: "Vertikaler Abstand:",
		validateSrc : "Die URL darf nicht leer sein.",
		validateHSpace : "Der horizontale Abstand muss eine positive Ganzzahl sein.",
		validateVSpace : "Der vertikale Abstand muss eine positive Ganzzahl sein."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Rechtschreibprüfung",
		title			: "Rechtschreibprüfung",
		notAvailable	: "Der Service ist derzeit leider nicht verfügbar.",
		errorLoading	: "Fehler beim Laden des Anwendungsservice-Hosts: %s.",
		notInDic		: "Nicht im Wörterbuch",
		changeTo		: "Ändern in",
		btnIgnore		: "Ignorieren",
		btnIgnoreAll	: "Alle ignorieren",
		btnReplace		: "Ersetzen",
		btnReplaceAll	: "Alle ersetzen",
		btnUndo			: "Rückgängig machen",
		noSuggestions	: "- Keine Vorschläge -",
		progress		: "Rechtschreibprüfung läuft...",
		noMispell		: "Rechtschreibprüfung abgeschlossen: Keine Rechtschreibfehler gefunden",
		noChanges		: "Rechtschreibprüfung abgeschlossen: Keine Wörter geändert",
		oneChange		: "Rechtschreibprüfung abgeschlossen: Ein Wort geändert",
		manyChanges		: "Rechtschreibprüfung abgeschlossen: %1 Wörter geändert",
		ieSpellDownload	: "Das Programm für die Rechtschreibprüfung ist nicht installiert. Möchten Sie das Programm jetzt herunterladen?"
	},

	smiley :
	{
		toolbar	: "Emoticon einfügen",
		title	: "Emoticons",
		options : "Optionen für Emoticons"
	},

	elementsPath :
	{
		eleLabel : "Elementpfad",
		eleTitle : "%1 Element"
	},

	numberedlist : "Nummerierte Liste",
	bulletedlist : "Liste mit Punkten",
	indent : "Einzug vergrößern",
	outdent : "Einzug verringern",

	justify :
	{
		left : "Linksbündig",
		center : "Zentriert",
		right : "Rechtsbündig",
		block : "Als Blocksatz ausrichten"
	},

	blockquote : "Blockzitat",

	clipboard :
	{
		title		: "Einfügen",
		cutError	: "Die Sicherheitseinstellungen des Browsers verhindern ein automatisches Ausschneiden. Verwenden Sie stattdessen die Tastenkombination Strg+X.",
		copyError	: "Die Sicherheitseinstellungen des Browsers verhindern ein automatisches Kopieren. Verwenden Sie stattdessen die Tastenkombination Strg+C.",
		pasteMsg	: "Drücken Sie zum Einfügen unten die Tastenkombination Strg+V (Befehl-V unter MAC).",
		securityMsg	: "Die Sicherheitseinstellungen des Browsers verhindern ein direktes Einfügen aus der Zwischenablage.",
		pasteArea	: "Bereich einfügen"
	},

	pastefromword :
	{
		confirmCleanup	: "Der Text, den Sie einfügen möchten, wurde offenbar aus Word kopiert. Möchten Sie den Text vor dem Einfügen bereinigen?",
		toolbar			: "Selektiv einfügen",
		title			: "Selektiv einfügen",
		error			: "Aufgrund eines internen Fehlers konnten die eingefügten Daten nicht bereinigt werden"
	},

	pasteText :
	{
		button	: "Als unverschlüsselten Text einfügen",
		title	: "Als unverschlüsselten Text einfügen"
	},

	templates :
	{
		button 			: "Vorlagen",
		title : "Inhaltsvorlagen",
		options : "Vorlagenoptionen",
		insertOption: "Vorhandenen Inhalt ersetzen",
		selectPromptMsg: "Wählen Sie die Vorlage aus, die im Editor geöffnet werden soll",
		emptyListMsg : "(Keine Vorlagen definiert)"
	},

	showBlocks : "Blöcke anzeigen",

	stylesCombo :
	{
		label		: "Formatvorlagen",
		panelTitle 	: "Formatvorlagen",
		panelTitle1	: "Block-Formatvorlagen",
		panelTitle2	: "Inline-Formatvorlagen",
		panelTitle3	: "Objekt-Formatvorlagen"
	},

	format :
	{
		label		: "Format",
		panelTitle	: "Absatzformat",

		tag_p		: "Normal",
		tag_pre		: "Formatiert",
		tag_address	: "Adresse",
		tag_h1		: "Überschrift 1",
		tag_h2		: "Überschrift 2",
		tag_h3		: "Überschrift 3",
		tag_h4		: "Überschrift 4",
		tag_h5		: "Überschrift 5",
		tag_h6		: "Überschrift 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Div-Container erstellen",
		toolbar				: "Div-Container erstellen",
		cssClassInputLabel	: "Formatvorlageklassen",
		styleSelectLabel	: "Formatvorlage",
		IdInputLabel		: "ID",
		languageCodeInputLabel	: " Sprachcode",
		inlineStyleInputLabel	: "Inline-Formatvorlage",
		advisoryTitleInputLabel	: "Ratgebertitel",
		langDirLabel		: "Sprachrichtung",
		langDirLTRLabel		: "Von links nach rechts (LNR)",
		langDirRTLLabel		: "Von rechts nach links (RNL)",
		edit				: "Div bearbeiten",
		remove				: "Div entfernen"
  	},

	iframe :
	{
		title		: "I-Frame-Eigenschaften",
		toolbar		: "I-Frame einfügen",
		noUrl		: "Geben Sie die I-Frame-URL ein.",
		scrolling	: "Bildlaufleisten aktivieren",
		border		: "Rahmenumrandung anzeigen"
	},

	font :
	{
		label		: "Schriftart",
		voiceLabel	: "Schriftart",
		panelTitle	: "Schriftartname"
	},

	fontSize :
	{
		label		: "Größe",
		voiceLabel	: "Schriftgröße",
		panelTitle	: "Schriftgröße"
	},

	colorButton :
	{
		textColorTitle	: "Textfarbe",
		bgColorTitle	: "Hintergrundfarbe",
		panelTitle		: "Farben",
		auto			: "Automatisch",
		more			: "Weitere Farben..."
	},

	colors :
	{
		"000" : "Schwarz",
		"800000" : "Kastanienbraun",
		"8B4513" : "Sattelbraun",
		"2F4F4F" : "Dunkles Schiefergrau",
		"008080" : "Blaugrün",
		"000080" : "Marineblau",
		"4B0082" : "Indigo",
		"696969" : "Dunkelgrau",
		"B22222" : "Ziegelrot",
		"A52A2A" : "Braun",
		"DAA520" : "Goldgelb",
		"006400" : "Dunkelgrün",
		"40E0D0" : "Türkis",
		"0000CD" : "Mittelblau",
		"800080" : "Purpurrot",
		"808080" : "Grau",
		"F00" : "Rot",
		"FF8C00" : "Dunkelorange",
		"FFD700" : "Gold",
		"008000" : "Grün",
		"0FF" : "Zyanblau",
		"00F" : "Blau",
		"EE82EE" : "Violett",
		"A9A9A9" : "Mattgrau",
		"FFA07A" : "Helles Lachsrot",
		"FFA500" : "Orange",
		"FFFF00" : "Gelb",
		"00FF00" : "Gelbgrün",
		"AFEEEE" : "Blasstürkis",
		"ADD8E6" : "Hellblau",
		"DDA0DD" : "Pflaumenblau",
		"D3D3D3" : "Hellgrau",
		"FFF0F5" : "Helles Flieder",
		"FAEBD7" : "Antikweiß",
		"FFFFE0" : "Hellgelb",
		"F0FFF0" : "Blassgrün",
		"F0FFFF" : "Pastellblau",
		"F0F8FF" : "Eisblau",
		"E6E6FA" : "Lavendel",
		"FFF" : "Weiß"
	},

	scayt :
	{
		title			: "Rechtschreibprüfung bei Eingabe",
		opera_title		: "Nicht unterstützt von Opera",
		enable			: "SCAYT aktivieren",
		disable			: "SCAYT inaktivieren",
		about			: "Informationen zu SCAYT",
		toggle			: "SCAYT ein-/ausschalten",
		options			: "Optionen",
		langs			: "Sprachen",
		moreSuggestions	: "Weitere Vorschläge",
		ignore			: "Ignorieren",
		ignoreAll		: "Alle ignorieren",
		addWord			: "Wort hinzufügen",
		emptyDic		: "Der Wörterbuchname darf nicht leer sein.",

		optionsTab		: "Optionen",
		allCaps			: "Wörter in Großbuchstaben ignorieren",
		ignoreDomainNames : "Domänennamen ignorieren",
		mixedCase		: "Wörter mit Groß-/Kleinschreibung ignorieren",
		mixedWithDigits	: "Wörter mit Zahlen ignorieren",

		languagesTab	: "Sprachen",

		dictionariesTab	: "Wörterbücher",
		dic_field_name	: "Wörterbuchname",
		dic_create		: "Erstellen",
		dic_restore		: "Wiederherstellen",
		dic_delete		: "Löschen",
		dic_rename		: "Umbenennen",
		dic_info		: "Das Benutzerwörterbuch wird zunächst in einem Cookie gespeichert. Die Größe von Cookies ist jedoch begrenzt. Wenn das Benutzerwörterbuch eine Größe erreicht, bei der es nicht mehr in einem Cookie gespeichert werden kann, können Sie das Wörterbuch auf unserem Server speichern. Um Ihr persönliches Wörterbuch auf unserem Server zu speichern, müssen Sie einen Namen für das Wörterbuch angeben. Wenn Sie bereits ein Wörterbuch gespeichert haben, geben Sie den Namen des Wörterbuchs ein und klicken Sie auf die Schaltfläche 'Wiederherstellen'. ",

		aboutTab		: "Produktinformation"
	},

	about :
	{
		title		: "Informationen zu CKEditor",
		dlgTitle	: "Informationen zu CKEditor",
		help	: "Über $1 erhalten Sie Hilfe.",
		userGuide : "Benutzerhandbuch für CKEditor",
		moreInfo	: "Lizenzinformationen finden Sie auf unserer Website:",
		copy		: "Copyright &copy; $1. Alle Rechte vorbehalten."
	},

	maximize : "Maximieren",
	minimize : "Minimieren",

	fakeobjects :
	{
		anchor	: "Anker",
		flash	: "Flash-Animation",
		iframe		: "I-Frame",
		hiddenfield	: "Verdecktes Feld",
		unknown	: "Unbekanntes Objekt"
	},

	resize : "Zum Ändern der Größe ziehen",

	colordialog :
	{
		title		: "Farbe auswählen",
		options	:	"Farboptionen",
		highlight	: "Hervorheben",
		selected	: "Ausgewählte Farbe",
		clear		: "Löschen"
	},

	toolbarCollapse	: "Symbolleiste ausblenden",
	toolbarExpand	: "Symbolleiste einblenden",

	toolbarGroups :
	{
		document : "Dokument",
		clipboard : "Zwischenablage/Rückgängig machen",
		editing : "Bearbeitung",
		forms : "Formulare",
		basicstyles : "Allgemeine Formatvorlagen",
		paragraph : "Absatz",
		links : "Links",
		insert : "Einfügen",
		styles : "Formatvorlagen",
		colors : "Farben",
		tools : "Tools"
	},

	bidi :
	{
		ltr : "Textausrichtung von links nach rechts",
		rtl : "Textausrichtung von rechts nach links"
	},

	docprops :
	{
		label : "Dokumenteigenschaften",
		title : "Dokumenteigenschaften",
		design : "Entwurf",
		meta : "Meta-Tags",
		chooseColor : "Auswählen",
		other : "Andere...",
		docTitle :	"Seitentitel",
		charset : 	"Zeichensatzcodierung",
		charsetOther : "Andere Zeichensatzcodierung",
		charsetASCII : "ASCII",
		charsetCE : "Zentraleuropäisch",
		charsetCT : "Traditionelles Chinesisch (Big5)",
		charsetCR : "Kyrillisch",
		charsetGR : "Griechisch",
		charsetJP : "Japanisch",
		charsetKR : "Koreanisch",
		charsetTR : "Türkisch",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Westeuropäisch",
		docType : "Kopfzeile des Dokumenttyps",
		docTypeOther : "Andere Kopfzeile des Dokumenttyps",
		xhtmlDec : "XHTML-Deklarationen einschließen",
		bgColor : "Hintergrundfarbe",
		bgImage : "URL für Hintergrundbild",
		bgFixed : "Fixierter Hintergrund (kein Bildlauf)",
		txtColor : "Textfarbe",
		margin : "Seitenränder",
		marginTop : "Oben",
		marginLeft : "Links",
		marginRight : "Rechts",
		marginBottom : "Unten",
		metaKeywords : "Schlüsselwörter für Dokumentindex (durch Kommas getrennt)",
		metaDescription : "Dokumentbeschreibung",
		metaAuthor : "Autor",
		metaCopyright : "Copyright",
		previewHtml : "<p>Dies ist <strong>Beispieltext</strong>. Sie verwenden <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "Zoll",
			widthCm	: "Zentimeter",
			widthMm	: "Millimeter",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "Punkt",
			widthPc	: "Pica",
			required : "Erforderlich"
		},
		table :
		{
			createTable : 'Tabelle einfügen',
			heightUnit	: "Einheit für Höhe:",
			insertMultipleRows : "Zeilen einfügen",
			insertMultipleCols : "Spalten einfügen",
			noOfRows : "Anzahl der Zeilen:",
			noOfCols : "Anzahl der Spalten:",
			insertPosition : "Position:",
			insertBefore : "Vor",
			insertAfter : "Nach",
			selectTable : "Tabelle auswählen",
			selectRow : "Zeile auswählen",
			columnTitle : "Spaltenbreite",
			colProps : "Spalteneigenschaften",
			invalidColumnWidth	: "Die Spaltenbreite muss eine positive Zahl sein.",
			fixedColWidths : "Feste Spaltenbreiten"
		},
		cell :
		{
			title : "Zelle"
		},
		colordialog :
		{
			currentColor	: "Aktuelle Farbe"
		},
		emoticon :
		{
			angel		: "Engel",
			angry		: "Wütend",
			cool		: "Cool",
			crying		: "Weinend",
			eyebrow		: "Augenbraue",
			frown		: "Stirnrunzeln",
			goofy		: "Albern",
			grin		: "Grinsend",
			half		: "Halb",
			idea		: "Idee",
			laughing	: "Lachend",
			laughroll	: "Rollend lachend",
			no			: "Nein",
			oops		: "ups!",
			shy			: "Schüchtern",
			smile		: "Lächelnd",
			tongue		: "Zunge",
			wink		: "Winken",
			yes			: "Ja"
		},

		menu :
		{
			link	: "Link einfügen",
			list	: "Liste",
			paste	: "Einfügen",
			action	: "Aktion",
			align	: "Ausrichten",
			emoticon: "Emoticon"
		},

		iframe :
		{
			title	: "I-Frame"
		},

		list:
		{
			numberedTitle		: "Nummerierte Liste",
			bulletedTitle		: "Liste mit Punkten",
			description			: "Einstellungen werden auf aktuelle Listenebene angewendet",
			fontsize			: "Schriftgröße:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Geben Sie einen beschreibenden Namen für das Lesezeichen ein, z. B. 'Abschnitt 1.2'. Wenn Sie das Lesezeichen eingefügt haben, klicken Sie auf das Symbol für 'Link' oder 'Link für Dokumentlesezeichen', um eine Verknüpfung zu erstellen. ",
			title		: "Link für Dokumentlesezeichen",
			linkTo		: "Link zu:"
		},

		urllink :
		{
			title : "URL-Link",
			linkText : "Linktext:",
			selectAnchor: "Wählen Sie einen Anker aus:",
			nourl: "Geben Sie eine URL in das Textfeld ein.",
			urlhelp: "Geben Sie eine URL an, die geöffnet werden soll, wenn Benutzer auf diesen Link klicken. Beispiel: http://www.example.com",
			displaytxthelp: "Geben Sie die Textanzeige für den Link an.",
			openinnew : "Link in neuem Fenster öffnen"
		},

		spellchecker :
		{
			title : "Überprüfen Sie die Schreibweise",
			replace : "Ersetzen:",
			suggesstion : "Vorschläge:",
			withLabel : "Mit:",
			replaceButton : "Ersetzen",
			replaceallButton:"Alle ersetzen",
			skipButton:"Überspringen",
			skipallButton: "Alle überspringen",
			undochanges: "Änderungen rückgängig machen",
			complete: "Rechtschreibprüfung abgeschlossen",
			problem: "Fehler beim Abrufen von XML-Daten",
			addDictionary: "Zum Wörterbuch hinzufügen",
			editDictionary: "Wörterbuch bearbeiten"
		},

		status :
		{
			keystrokeForHelp: "Drücken Sie ALT 0 für Hilfe"
		},

		linkdialog :
		{
			label : "Linkdialogfenster"
		},

		imagedatauri :
		{
			error : "Das Einfügen von Grafiken wird derzeit nicht unterstützt. Verwenden Sie stattdessen die Symbolleistenoption \'Grafik einfügen\'."
		},

		image :
		{
			previewText : "Der Textfluss um die hinzuzufügende Grafik sieht wie in diesem Beispiel aus.",
			fileUpload : "Wählen Sie eine Grafikdatei aus Ihrem Computer aus:"
		}
	}

};
