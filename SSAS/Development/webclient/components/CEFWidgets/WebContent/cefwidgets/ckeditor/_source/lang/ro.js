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

CKEDITOR.lang["ro"] =
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
	editorTitle : "Editor Rich-text, %1, apăsaţi ALT 0 pentru ajutor.",
	editorHelp : "",

	// ARIA descriptions.
	toolbar	: "Bară de unelte",
	editor	: "Editor Rich Text",

	// Toolbar buttons without dialogs.
	source			: "Sursă",
	newPage			: "Pagină nouă",
	save			: "Salvare",
	preview			: "Previzualizare:",
	cut				: "Tăiere",
	copy			: "Copiere",
	paste			: "Lipire",
	print			: "Tipărire",
	underline		: "Subliniere",
	bold			: "Aldin  (Bold)",
	italic			: "Cursiv  (Italic)",
	selectAll		: "Selectare toate",
	removeFormat	: "Înlăturare formatare",
	strike			: "Supraimprimare",
	subscript		: "Indice inferior",
	superscript		: "Indice superior",
	horizontalrule	: "Inserare sfârşit de linie",
	pagebreak		: "Inserare sfârşit de pagină",
	pagebreakAlt		: "Page Break",
	unlink			: "Înlăturare legătură",
	undo			: "Anulare acţiune",
	redo			: "Refacere",

	// Common messages and labels.
	common :
	{
		browseServer	: "Server browser:",
		url				: "URL:",
		protocol		: "Protocol:",
		upload			: "Încărcare:",
		uploadSubmit	: "Trimite-l către server",
		image			: "Inserare imagine",
		flash			: "Inserare Flash",
		form			: "Inserare formular",
		checkbox		: "Inserare casetă de bifare",
		radio			: "Inserare buton radio",
		textField		: "Inserare câmp text",
		textarea		: "Inserare zonă text",
		hiddenField		: "Inserare câmp ascuns",
		button			: "Inserare buton",
		select			: "Inserare câmp de selecţie",
		imageButton		: "Inserare buton imagine",
		notSet			: "<not set>",
		id				: "Id:",
		name			: "Nume:",
		langDir			: "Direcţie limbă",
		langDirLtr		: "LTR (de la stânga la dreapta)",
		langDirRtl		: "RTL (de la dreapta la stânga)",
		langCode		: "Cod limbă:",
		longDescr		: "URL descriere lungă:",
		cssClass		: "Clase foaie de stil:",
		advisoryTitle	: "Titlu consultativ:",
		cssStyle		: "Stil:",
		ok				: "OK",
		cancel			: "Anulare",
		close : "Închidere",
		preview			: "Previzualizare:",
		generalTab		: "General",
		advancedTab		: "Avansat",
		validateNumberFailed	: "Această valoare nu este un număr.",
		confirmNewPage	: "Toate modificările nesalvate făcute acestui conţinut vor fi pierdute. Sunteţi sigur(ă) că vreţi să încărcaţi o nouă pagină?",
		confirmCancel	: "Unele opţiuni au fost modificate. Sunteţi sigur(ă) că vreţi să închideţi dialogul?",
		options : "Opţiuni",
		target			: "Destinaţie:",
		targetNew		: "Fereastră nouă (_blank)",
		targetTop		: "Fereastra din vârf (_top)",
		targetSelf		: "Aceeaşi fereastră (_self)",
		targetParent	: "Fereastra părinte (_parent)",
		advanced		: "Advanced",
		langDirLTR		: "Left to Right",
		langDirRTL		: "Right to Left",
		styles			: "Style",
		cssClasses		: "Stylesheet Classes",
		align		: "Aliniere:",
		alignLeft	: "Stânga",
		alignBottom	: "Jos",
		alignMiddle	: "Mijloc",
		alignRight	: "Dreapta",
		alignCenter	: "Aliniere centru",
		alignTop	: "Vârf",
		width	: "Lăţime:",
		height	: "Înălţime:",
		invalidHeight	: "Înălţimea trebuie să fie un număr.",
		invalidWidth	: "Lăţimea trebuie să fie un număr.",
		invalidCssLength	: "Value specified for the '%1' field must be a positive number with or without a valid CSS measurement unit (px, %, in, cm, mm, em, ex, pt, or pc).",
		invalidHtmlLength	: "Value specified for the '%1' field must be a positive number with or without a valid HTML measurement unit (px or %).",
		invalidInlineStyle	: "Value specified for the inline style must be one or multiple tuples with the form \"name : value\" which are separated by semi-colon.",
		cssLengthTooltip	: "Enter a number for a value in pixels or a number with a valid CSS unit (px, %, in, cm, mm, em, ex, pt, or pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, nedisponibil</span>"
	},

	contextmenu :
	{
		options : "Opţiuni meniu context"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Caracter special",
		title		: "Selectare caracter special",
		options : "Opţiuni caracter special"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Inserare legătură",
		other 		: "<other>",
		menu		: "Editare legătură",
		title		: "Legătură",
		info		: "Informaţii legătură",
		target		: "Destinaţie",
		upload		: "Încărcare:",
		advanced	: "Avansat",
		type		: "Tip legătură:",
		toUrl		: "URL",
		toAnchor	: "Legătură către ancoră în text",
		toEmail		: "E-mail",
		targetFrame	: "<frame>",
		targetPopup	: "<popup window>",
		targetFrameName	: "Nume cadru destinaţie:",
		targetPopupName	: "Nume fereastră popup:",
		popupFeatures	: "Caracteristici fereastră popup:",
		popupResizable	: "Mărime modificabilă",
		popupStatusBar	: "Bară de stre",
		popupLocationBar	: "Bară de locaţie",
		popupToolbar	: "Bară de unelte",
		popupMenuBar	: "Bara de meniuri",
		popupFullScreen	: "Ecran mare (IE)",
		popupScrollBars	: "Bare de defilare",
		popupDependent	: "Dependent (Netscape)",
		popupWidth		: "Lăţime",
		popupLeft		: "Poziţie stânga",
		popupHeight		: "Înălţime",
		popupTop		: "Poziţie de vârf",
		id				: "Id:",
		langDir			: "Direcţie limbă",
		langDirLTR		: "De la stânga la dreapta",
		langDirRTL		: "De la dreapta la stânga",
		acccessKey		: "Cheie acces:",
		name			: "Nume:",
		langCode		: "Cod limbă:",
		tabIndex		: "Index tab:",
		advisoryTitle	: "Titlu consultativ:",
		advisoryContentType	: "Tip conţinut consultativ:",
		cssClasses		: "Clase foaie de stil:",
		charset			: "Set de caractere resurse legate:",
		styles			: "Stil:",
		rel			: "Relationship",
		selectAnchor	: "Selectaţi o ancoră",
		anchorName		: "După nume ancoră",
		anchorId		: "După ID element",
		emailAddress	: "Adresă e-mail",
		emailSubject	: "Subiect mesaj",
		emailBody		: "Corp mesaj",
		noAnchors		: "(Nicio ancoră disponibilă în acest document)",
		noUrl			: "Vă rugăm tastaţi legătura URL",
		noEmail			: "Vă rugăm tastaţi adresa e-mail"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Inserare ancoră",
		menu		: "Editare ancoră",
		title		: "Proprietăţi ancoră",
		name		: "Nume ancoră:",
		errorName	: "Vă rugăm tastaţi numele ancorei",
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
		title				: "Găsire şi înlocuire",
		find				: "Găsire",
		replace				: "Înlocuire",
		findWhat			: "Găsire:",
		replaceWith			: "Înlocuire cu:",
		notFoundMsg			: "Textul specificat nu a fost găsit.",
		findOptions			: "Find Options",
		matchCase			: "Potrivire majuscule",
		matchWord			: "Potrivire cuvânt întreg",
		matchCyclic			: "Potrivire ciclică",
		replaceAll			: "Înlocuire tot",
		replaceSuccessMsg	: "%1 apariţii înlocuite."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Inserare tabel",
		title		: "Proprietăţi tabel",
		menu		: "Proprietăţi tabel",
		deleteTable	: "Ştergere tabel",
		rows		: "Rânduri:",
		columns		: "Coloane:",
		border		: "Dimensiune bordură:",
		align		: "Aliniere:",
		alignLeft	: "Aliniere stânga",
		alignCenter	: "Aliniere centru",
		alignRight	: "Aliniere dreapta",
		width		: "Lăţime:",
		widthPx		: "pixeli",
		widthPc		: "procent",
		widthUnit	: "Unitate lăţime:",
		height		: "Înălţime:",
		cellSpace	: "Spaţiu celule:",
		cellPad		: "Completare celulă:",
		caption		: "Titlu:",
		summary		: "Sumar:",
		headers		: "Anteturi:",
		headersNone		: "Fără",
		headersColumn	: "Prima coloană",
		headersRow		: "Primul rând",
		headersBoth		: "Ambele",
		invalidRows		: "Numărul de rânduri trebuie să fie mai mare decât 0.",
		invalidCols		: "Numbărul de coloane trebuie să fie mai mare decât 0.",
		invalidBorder	: "Dimensiunea bordurii trebuie să fie un număr.",
		invalidWidth	: "Lăţimea tabelei trebuie să fie un număr.",
		invalidHeight	: "Înălţimea tabelei trebuie să fie un număr.",
		invalidCellSpacing	: "Spaţiul dintre celule trebuie să fie un număr.",
		invalidCellPadding	: "Completarea celulelor trebuie să fie un număr.",

		cell :
		{
			menu			: "Celulă",
			insertBefore	: "Inserare celulă înainte de",
			insertAfter		: "Inserare celulă după",
			deleteCell		: "Ştergere celule",
			merge			: "Combinare celule",
			mergeRight		: "Combinare la dreapta",
			mergeDown		: "Combinare în jos",
			splitHorizontal	: "Separare celule pe orizontală",
			splitVertical	: "Separare celule pe verticală",
			title			: "Proprietăţi celulă",
			cellType		: "Tip celulă:",
			rowSpan			: "Întindere rânduri:",
			colSpan			: "Întindere coloane:",
			wordWrap		: "Wrap cuvânt:",
			hAlign			: "Aliniere orizontală:",
			vAlign			: "Aliniere verticală:",
			alignTop		: "Vârf",
			alignMiddle		: "Mijloc",
			alignBottom		: "Jos",
			alignBaseline	: "Linie de bază",
			bgColor			: "Culoare fundal:",
			borderColor		: "Culoare bordură:",
			data			: "Date",
			header			: "Antet",
			yes				: "Da",
			no				: "Nu",
			invalidWidth	: "Lăţimea celulei trebuie să fie un număr.",
			invalidHeight	: "Înălţimea celulelor trebuie să fie un număr.",
			invalidRowSpan	: "Întinderea rândurilor trebuie să fie un număr întreg.",
			invalidColSpan	: "Întinderea coloanelor trebuie să fie un număr întreg.",
			chooseColor : "Alegere"
		},

		row :
		{
			menu			: "Rând",
			insertBefore	: "Inserare rând înainte de",
			insertAfter		: "Inserare rând după",
			deleteRow		: "Ştergere rânduri"
		},

		column :
		{
			menu			: "Coloană",
			insertBefore	: "Inserare coloană înainte de",
			insertAfter		: "Inserare coloană după",
			deleteColumn	: "Ştergere coloane"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Proprietăţi buton",
		text		: "Text (valoare):",
		type		: "Tip:",
		typeBtn		: "Buton",
		typeSbm		: "Lansare",
		typeRst		: "Resetare"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Proprietăţi casetă de bifare",
		radioTitle	: "Proprietăţi buton radio",
		value		: "Valoare:",
		selected	: "Selectat"
	},

	// Form Dialog.
	form :
	{
		title		: "Inserare formular",
		menu		: "Proprietăţi formular",
		action		: "Acţiune:",
		method		: "Metodă:",
		encoding	: "Codare:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Selectare proprietăţi câmp",
		selectInfo	: "Selectare informaţie",
		opAvail		: "Opţiuni disponibile",
		value		: "Valoare:",
		size		: "Dimensiune:",
		lines		: "linii",
		chkMulti	: "Permitere selecţii multiple",
		opText		: "Text:",
		opValue		: "Valoare:",
		btnAdd		: "Adăugare",
		btnModify	: "Modificare",
		btnUp		: "Sus",
		btnDown		: "Jos",
		btnSetValue : "Setare ca valoare selectată",
		btnDelete	: "Ştergere"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Proprietăţile zonei de text",
		cols		: "Coloane:",
		rows		: "Rânduri:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Proprietăţi câmp text",
		name		: "Nume:",
		value		: "Valoare:",
		charWidth	: "Lăţime caracter:",
		maxChars	: "Număr maxim de caractere:",
		type		: "Tip:",
		typeText	: "Text",
		typePass	: "Parolă"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Proprietăţi câmp ascuns",
		name	: "Nume:",
		value	: "Valoare:"
	},

	// Image Dialog.
	image :
	{
		title		: "Proprietăţi imagine",
		titleButton	: "Proprietăţi buton imagine",
		menu		: "Proprietăţi imagine",
		infoTab	: "Informaţii imagine",
		btnUpload	: "Trimitere la server",
		upload	: "Încărcare",
		alt		: "Text alternativ:",
		width		: "Lăţime:",
		height	: "Înălţime:",
		lockRatio	: "Blocare raport",
		unlockRatio	: "Deblocare raport",
		resetSize	: "Resetare mărime",
		border	: "Bordură:",
		hSpace	: "Spaţiu orizontal:",
		vSpace	: "Spaţiu vertical:",
		align		: "Aliniere:",
		alignLeft	: "Stânga",
		alignRight	: "Dreapta",
		alertUrl	: "Vă rugăm tastaţi URL-ul imaginii",
		linkTab	: "Legătură",
		button2Img	: "Vreţi să tranformaţi butonul de imagine selectat într-o simplă imagine?",
		img2Button	: "Vreţi să transformaţi imaginea selectată într-un buton de imagine?",
		urlMissing : "URL-ul sursă al imaginii lipseşte.",
		validateWidth : "Lăţimea trebuie să fie un număr întreg.",
		validateHeight : "Înălţimea trebuie să fie un număr întreg.",
		validateBorder : "Bordura trebuie să fie un număr întreg.",
		validateHSpace : "Spaţiu orizontal trebuie să fe un număr întreg.",
		validateVSpace : "Spaţiu vertical trebuie să fie un număr întreg."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Proprietăţi Flash",
		propertiesTab	: "Proprietăţi",
		title		: "Proprietăţi Flash",
		chkPlay		: "Auto Play",
		chkLoop		: "Buclă",
		chkMenu		: "Activare meniu Flash",
		chkFull		: "Permite ecran complet",
 		scale		: "Scală:",
		scaleAll		: "Afişare toate",
		scaleNoBorder	: "Fără bordură",
		scaleFit		: "Potrivire exactă",
		access			: "Acces script:",
		accessAlways	: "Întotdeauna",
		accessSameDomain	: "Acelaşi domeniu",
		accessNever	: "Niciodată",
		align		: "Aliniere:",
		alignLeft	: "Stânga",
		alignAbsBottom: "Jos abs",
		alignAbsMiddle: "Mijloc abs",
		alignBaseline	: "Linie de bază",
		alignBottom	: "Jos",
		alignMiddle	: "Mijloc",
		alignRight	: "Dreapta",
		alignTextTop	: "Vârf text",
		alignTop	: "Vârf",
		quality		: "Calitate:",
		qualityBest	: "Cel mai bun",
		qualityHigh	: "Înălţime",
		qualityAutoHigh	: "Înalţime - Auto",
		qualityMedium	: "Medie",
		qualityAutoLow	: "Jos - Auto",
		qualityLow	: "Joasă",
		windowModeWindow	: "Fereastră",
		windowModeOpaque	: "Opac",
		windowModeTransparent	: "Transparent",
		windowMode	: "Mod fereastră:",
		flashvars	: "Variabile",
		bgcolor	: "Culoare fundal:",
		width	: "Lăţime:",
		height	: "Înălţime:",
		hSpace	: "Spaţiu orizontal:",
		vSpace	: "Spaţiu vertical:",
		validateSrc : "URL-ul nu trebuie să fie gol.",
		validateWidth : "Lăţimea trebuie să fie un număr.",
		validateHeight : "Înălţimea trebuie să fie un număr.",
		validateHSpace : "Spaţiu orizontal trebuie să fe un număr.",
		validateVSpace : "Spaţiu vertical trebuie să fie un număr."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Verificare ortografică",
		title			: "Verificare ortografică",
		notAvailable	: "Ne pare rău, dar serviciun nu este disponibil momentan.",
		errorLoading	: "Eroare la încărcarea gazdei serviciu a aplicaţiei: %s.",
		notInDic		: "Nu este în dicţionar",
		changeTo		: "Modifcare în",
		btnIgnore		: "Ignorare",
		btnIgnoreAll	: "Ignorare tot",
		btnReplace		: "Înlocuire",
		btnReplaceAll	: "Înlocuire tot",
		btnUndo			: "Anulare acţiune",
		noSuggestions	: "- Nicio sugestie -",
		progress		: "Verificare ortografică în progres...",
		noMispell		: "Verificare ortografică completă: Nu a fost găsită nicio greşeală ortografică",
		noChanges		: "Verificare ortografică completă: Niciun cuvânt modificat",
		oneChange		: "Verificare ortografică completă: Un cuvânt modificat",
		manyChanges		: "Verificare ortografică completă: %1 cuvinte modificate",
		ieSpellDownload	: "Verficatorul ortografic nu este instalat. Vreţi să-l descărcaţi acum?"
	},

	smiley :
	{
		toolbar	: "Inserare emoticoane",
		title	: "Emoticoane",
		options : "Opţiuni emoticoane"
	},

	elementsPath :
	{
		eleLabel : "Cale elemente",
		eleTitle : "element %1"
	},

	numberedlist : "Numere",
	bulletedlist : "Marcatori",
	indent : "Indentare paragraf",
	outdent : "Outdentare",

	justify :
	{
		left : "Aliniere stânga",
		center : "Aliniere centru",
		right : "Aliniere dreapta",
		block : "Aliniere"
	},

	blockquote : "Blocare ghilimele",

	clipboard :
	{
		title		: "Lipire",
		cutError	: "Setările de securitate ale browser-ului împiedică tăierea automată. Folosiţi în loc Ctrl+X de la tastatură.",
		copyError	: "Setările de securitate ale browser-ului împiedică copierea automată. Folosiţi în loc Ctrl+C de la tastatură.",
		pasteMsg	: "Apăsaţi Ctrl+V (Cmd+V la MAC) pentru a lipi mai jos.",
		securityMsg	: "Securitatea browser-ulu blochează lipirea directă din clipboard.",
		pasteArea	: "Zonă de lipire"
	},

	pastefromword :
	{
		confirmCleanup	: "Textul pe care vreţi să-l lipiţi pare copiat din Word. Doriţi să-l curăţaţi înainte de a-l lipi?",
		toolbar			: "Lipire specială",
		title			: "Lipire specială",
		error			: "Nu a fost posibilă curăţarea datelor lipite din cauza unei erori interne"
	},

	pasteText :
	{
		button	: "Lipire ca text simplu",
		title	: "Lipire ca text simplu"
	},

	templates :
	{
		button 			: "Şabloane",
		title : "Şabloane conţinut",
		options : "Opţiuni şabloane",
		insertOption: "Înlocuire conţinut real",
		selectPromptMsg: "Selectaţi şablonul care să fie deschis în editor",
		emptyListMsg : "(Niciun şablon definit)"
	},

	showBlocks : "Afişare blocuri",

	stylesCombo :
	{
		label		: "Stiluri",
		panelTitle 	: "Stiluri",
		panelTitle1	: "Stiluri bloc",
		panelTitle2	: "Stiluri inline",
		panelTitle3	: "Stiluri obiect"
	},

	format :
	{
		label		: "Format",
		panelTitle	: "Format paragraf",

		tag_p		: "Normal",
		tag_pre		: "Formatat",
		tag_address	: "Adresă",
		tag_h1		: "Antet 1",
		tag_h2		: "Antet 2",
		tag_h3		: "Antet 3",
		tag_h4		: "Antet 4",
		tag_h5		: "Antet 5",
		tag_h6		: "Antet 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Creare container Div",
		toolbar				: "Creare container Div",
		cssClassInputLabel	: "Clase foi de stil",
		styleSelectLabel	: "Stil",
		IdInputLabel		: "Id",
		languageCodeInputLabel	: " Cod limbă",
		inlineStyleInputLabel	: "Stil inline",
		advisoryTitleInputLabel	: "Titlu consultativ",
		langDirLabel		: "Direcţie limbaj",
		langDirLTRLabel		: "LTR (de la stânga la dreapta)",
		langDirRTLLabel		: "RTL (de la dreapta la stânga)",
		edit				: "Editare Div",
		remove				: "Înlăturare Div"
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
		panelTitle	: "Nume font"
	},

	fontSize :
	{
		label		: "Dimensiune",
		voiceLabel	: "Dimensiune font",
		panelTitle	: "Dimensiune font"
	},

	colorButton :
	{
		textColorTitle	: "Culoare text",
		bgColorTitle	: "Culoare fundal",
		panelTitle		: "Culori",
		auto			: "Automat",
		more			: "Mai multe culori..."
	},

	colors :
	{
		"000" : "Negru",
		"800000" : "Castaniu",
		"8B4513" : "Maro şea",
		"2F4F4F" : "Gri ardezie închis",
		"008080" : "Teal",
		"000080" : "Albastru marin (navy)",
		"4B0082" : "Indigo",
		"696969" : "Gri vag",
		"B22222" : "Cărămidă de foc",
		"A52A2A" : "Maro",
		"DAA520" : "Solidago",
		"006400" : "Verde închis",
		"40E0D0" : "Turcoaz",
		"0000CD" : "Albastru mediu",
		"800080" : "Mov",
		"808080" : "Gri",
		"F00" : "Roşu",
		"FF8C00" : "Portocaliu închis",
		"FFD700" : "Auriu",
		"008000" : "Verde",
		"0FF" : "Cyan",
		"00F" : "Albastru",
		"EE82EE" : "Violet",
		"A9A9A9" : "Gri închis",
		"FFA07A" : "Somon deschis",
		"FFA500" : "Portocaliu",
		"FFFF00" : "Galben",
		"00FF00" : "Lime",
		"AFEEEE" : "Turcaoz pal",
		"ADD8E6" : "Albastru deschis",
		"DDA0DD" : "Prună",
		"D3D3D3" : "Gri deschis",
		"FFF0F5" : "Lavandă cu roz",
		"FAEBD7" : "Alb antic",
		"FFFFE0" : "Galben deschis",
		"F0FFF0" : "Pepene galben",
		"F0FFFF" : "Azuriu",
		"F0F8FF" : "Albastru Alice",
		"E6E6FA" : "Levănţică",
		"FFF" : "Alb"
	},

	scayt :
	{
		title			: "Verificare ortografie în timp ce tastaţi",
		opera_title		: "Not supported by Opera",
		enable			: "Activare SCAYT",
		disable			: "Dezactivare SCAYT",
		about			: "Despre SCAYT",
		toggle			: "Comutare SCAYT",
		options			: "Opţiuni",
		langs			: "Limbi",
		moreSuggestions	: "Mai multe sugestii",
		ignore			: "Ignorare",
		ignoreAll		: "Ignorare tot",
		addWord			: "Adăugare cuvânt",
		emptyDic		: "Numele dicţionarelor nu ar trebui să fie goale.",

		optionsTab		: "Opţiuni",
		allCaps			: "Ignore All-Caps Words",
		ignoreDomainNames : "Ignore Domain Names",
		mixedCase		: "Ignore Words with Mixed Case",
		mixedWithDigits	: "Ignore Words with Numbers",

		languagesTab	: "Limbaje",

		dictionariesTab	: "Dicţionare",
		dic_field_name	: "Dictionary name",
		dic_create		: "Create",
		dic_restore		: "Restore",
		dic_delete		: "Delete",
		dic_rename		: "Rename",
		dic_info		: "Initially the User Dictionary is stored in a Cookie. However, Cookies are limited in size. When the User Dictionary grows to a point where it cannot be stored in a Cookie, then the dictionary may be stored on our server. To store your personal dictionary on our server you should specify a name for your dictionary. If you already have a stored dictionary, please type it\'s name and click the Restore button.",

		aboutTab		: "Despre"
	},

	about :
	{
		title		: "Despre CKEditor",
		dlgTitle	: "Despre CKEditor",
		help	: "Check $1 for help.",
		userGuide : "CKEditor User's Guide",
		moreInfo	: "Pentru informaţiile de licenţiere vă rugăm vizitaţi situl nostru web:",
		copy		: "Copyright &copy; $1. Toate drepturile rezervate."
	},

	maximize : "Maximizare",
	minimize : "Minimizare",

	fakeobjects :
	{
		anchor	: "Ancoră",
		flash	: "Animaţie Flash",
		iframe		: 'iFrame',
		hiddenfield	: 'Hidden Field',
		unknown	: "Obiect necunoscut"
	},

	resize : "Tragere pentru redimensionare",

	colordialog :
	{
		title		: "Selectare culoare",
		options	:	"Color Options",
		highlight	: "Evidenţiere",
		selected	: "Selectat",
		clear		: "Curăţare"
	},

	toolbarCollapse	: "Restrângere bară de unelte",
	toolbarExpand	: "Expandare bară de unelte",

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
			angel		: "Înger",
			angry		: "Furios",
			cool		: "Relaxat",
			crying		: "Plânge",
			eyebrow		: "Sprânceană",
			frown		: "Încruntat",
			goofy		: "Tont",
			grin		: "Rânjet",
			half		: "Jumătate",
			idea		: "Idee",
			laughing	: "Râzând",
			laughroll	: "Râzând tavalindu-se",
			no			: "Nu",
			oops		: "Oops",
			shy			: "Timid",
			smile		: "Zâmbet",
			tongue		: "Limbă",
			wink		: "Clipire",
			yes			: "Da"
		},

		menu :
		{
			link	: "Insert Link",
			list	: "Listare",
			paste	: "Lipire",
			action	: "Acţiune",
			align	: "Aliniere",
			emoticon: "Emoticon"
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
			nourl: "Vă rugăm introduceţi un URL în câmpul de text.",
			urlhelp: "Tastaţi sau lipiţi un URL pentru a se deschide atunci când utilizatorii fac clic pe această legătură, de exemplu http://www.example.com.",
			displaytxthelp: "Afişare tastare text pentru legătură.",
			openinnew : "Deschidere legătură în fereastră nouă"
		},

		spellchecker :
		{
			title : "Verificator ortografic",
			replace : "Înlocuire:",
			suggesstion : "Sugestii:",
			withLabel : "Cu:",
			replaceButton : "Înlocuire",
			replaceallButton:"Înlocuire tot",
			skipButton:"Ocolire",
			skipallButton: "Ocolire tot",
			undochanges: "Anulare modificări",
			complete: "Verificare ortografie completă",
			problem: "Problemă la recuperarea datelor XML",
			addDictionary: "Adăugare la dicţionar",
			editDictionary: "Editare dicţionar"
		},

		status :
		{
			keystrokeForHelp: "Press ALT 0 for help"
		},

		linkdialog :
		{
			label : "Dialog legătură"
		},

		imagedatauri :
		{
			error : "Pasting images that use data URIs is currently not supported. Please use the \'Insert Image\' toolbar option to embed the image instead."
		},

		image :
		{
			previewText : "Textul va curge în jurul imaginii pe care o adăugaţi, ca în acest exemplu.",
			fileUpload : "Select an image file from your computer:"
		}
	}

};
