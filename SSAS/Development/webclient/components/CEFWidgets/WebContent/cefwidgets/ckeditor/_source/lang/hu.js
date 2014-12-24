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

CKEDITOR.lang["hu"] =
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
	editorTitle : "Formázottszöveg-szerkesztő, %1, segítségért nyomja meg az ALT 0 billentyűkombinációt.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Szerkesztő eszköztárak",
	editor	: "Formázott szöveg szerkesztő",

	// Toolbar buttons without dialogs.
	source			: "Forrás",
	newPage			: "Új oldal",
	save			: "Mentés",
	preview			: "Előkép:",
	cut				: "Kivágás",
	copy			: "Másolás",
	paste			: "Beillesztés",
	print			: "Nyomtatás",
	underline		: "Aláhúzás",
	bold			: "Félkövér",
	italic			: "Dőlt",
	selectAll		: "Összes kijelölése",
	removeFormat	: "Formátum eltávolítása",
	strike			: "Áthúzás",
	subscript		: "Alsó index",
	superscript		: "Felső index",
	horizontalrule	: "Vízszintes vonal beszúrása",
	pagebreak		: "Oldaltörés beszúrása",
	pagebreakAlt		: "Oldaltörés",
	unlink			: "Hivatkozás eltávolítása",
	undo			: "Visszavonás",
	redo			: "Újra",

	// Common messages and labels.
	common :
	{
		browseServer	: "Böngészőkiszolgáló:",
		url				: "URL:",
		protocol		: "Protokoll:",
		upload			: "Feltöltés:",
		uploadSubmit	: "Küldés a kiszolgálóra",
		image			: "Kép beszúrása",
		flash			: "Flash film beszúrása",
		form			: "Űrlap beszúrása",
		checkbox		: "Jelölőnégyzet beszúrása",
		radio			: "Választógomb beszúrása",
		textField		: "Szövegmező beszúrása",
		textarea		: "Szövegterület beszúrása",
		hiddenField		: "Rejtett mező beszúrása",
		button			: "Gomb beszúrása",
		select			: "Választólista beszúrása",
		imageButton		: "Képgomb beszúrása",
		notSet			: "<nincs beállítva>",
		id				: "Azonosító:",
		name			: "Név:",
		langDir			: "Nyelv iránya:",
		langDirLtr		: "Balról jobbra",
		langDirRtl		: "Jobbról balra",
		langCode		: "Nyelvkód:",
		longDescr		: "Hosszú leírás URL címe:",
		cssClass		: "Stíluslaposztályok:",
		advisoryTitle	: "Tanácsadói cím:",
		cssStyle		: "Stílus:",
		ok				: "OK",
		cancel			: "Mégse",
		close : "Bezárás",
		preview			: "Előkép:",
		generalTab		: "Általános",
		advancedTab		: "További",
		validateNumberFailed	: "Ez az érték nem szám.",
		confirmNewPage	: "A tartalom minden nem mentett módosítása elveszik. Biztosan betölt egy új oldalt?",
		confirmCancel	: "Néhány beállítás módosult. Biztosan bezárja a párbeszédpanelt?",
		options : "Beállítások",
		target			: "Cél:",
		targetNew		: "Új ablak (_blank)",
		targetTop		: "Legfelső ablak (_top)",
		targetSelf		: "Ugyanaz az ablak (_self)",
		targetParent	: "Szülőablak (_parent)",
		langDirLTR		: "Balról jobbra",
		langDirRTL		: "Jobbról balra",
		styles			: "Stílus:",
		cssClasses		: "Stíluslaposztályok:",
		width			: "Szélesség:",
		height			: "Magasság:",
		align			: "Igazítás:",
		alignLeft		: "Bal",
		alignRight		: "Jobb",
		alignCenter		: "Középen",
		alignTop		: "Legfelső",
		alignMiddle		: "Középső",
		alignBottom		: "Alsó",
		invalidHeight	: "A magasságnak pozitív egész számnak kell lennie.",
		invalidWidth	: "A szélességnek pozitív egész számnak kell lennie.",
		invalidCssLength	: "A(z) '%1' mezőhöz megadott értéknek pozitív számnak kell lennie érvényes CSS mértékegységgel vagy anélkül (px, %, in, cm, mm, em, ex, pt vagy pc).",
		invalidHtmlLength	: "A(z) '%1' mezőhöz megadott értéknek pozitív számnak kell lennie érvényes HTML mértékegységgel vagy anélkül (px vagy %).",
		invalidInlineStyle	: "A beágyazott stílushoz megadott értéknek néhány \"név : érték\" formátumú rekordból kell állnia, pontosvesszőkkel elválasztva.",
		cssLengthTooltip	: "Adjon meg egy számértéket pixelben vagy egy számot érvényes CSS mértékegységgel (px, %, in, cm, mm, em, ex, pt vagy pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, elérhetetlen</span>"
	},

	contextmenu :
	{
		options : "Helyi menü lehetőség"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Speciális karakter beszúrása",
		title		: "Speciális karakter",
		options : "Speciális karakter lehetőség"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL hivatkozás",
		other 		: "<másik>",
		menu		: "Hivatkozás szerkesztése",
		title		: "Hivatkozás",
		info		: "Hivatkozásinformációk",
		target		: "Cél",
		upload		: "Feltöltés:",
		advanced	: "További",
		type		: "Hivatkozás típusa:",
		toUrl		: "URL",
		toAnchor	: "Szövegbeli horgonyra mutató hivatkozás",
		toEmail		: "E-mail",
		targetFrame	: "<keret>",
		targetPopup	: "<előugró ablak>",
		targetFrameName	: "Célkeret neve:",
		targetPopupName	: "Előugró ablak neve:",
		popupFeatures	: "Előugró ablak szolgáltatásai:",
		popupResizable	: "Átméretezhető",
		popupStatusBar	: "Állapotsor",
		popupLocationBar	: "Helysor",
		popupToolbar	: "Eszköztár",
		popupMenuBar	: "Menüsor",
		popupFullScreen	: "Teljes képernyő (IE)",
		popupScrollBars	: "Görgetősávok",
		popupDependent	: "Függő (Netscape)",
		popupLeft		: "Bal oldali pozíció",
		popupTop		: "Felső pozíció",
		id				: "Azonosító:",
		langDir			: "Nyelv iránya:",
		langDirLTR		: "Balról jobbra",
		langDirRTL		: "Jobbról balra",
		acccessKey		: "Hozzáférési kulcs:",
		name			: "Név:",
		langCode		: "Nyelvkód:",
		tabIndex		: "Bejárási index:",
		advisoryTitle	: "Tanácsadói cím:",
		advisoryContentType	: "Tanácsadói tartalomtípus:",
		cssClasses		: "Stíluslaposztályok:",
		charset			: "Hivatkozott erőforrás-karakterkészlet:",
		styles			: "Stílus:",
		rel			: "Viszony",
		selectAnchor	: "Válasszon horgonyt",
		anchorName		: "Horgonynév szerint",
		anchorId		: "Elemazonosító szerint",
		emailAddress	: "E-mail cím",
		emailSubject	: "Üzenettárgy",
		emailBody		: "Üzenettörzs",
		noAnchors		: "Nem áll rendelkezésre könyvjelző a dokumentumban. Könyvjelző hozzáadásához kattintson a 'Dokumentum könyvjelző beszúrása' ikonra az eszköztárban.",
		noUrl			: "Írja be a hivatkozás URL címét",
		noEmail			: "Írja be az e-mail címet"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Dokumentum könyvjelző beszúrása",
		menu		: "Dokumentum könyvjelző szerkesztése",
		title		: "Dokumentum könyvjelző",
		name		: "Név:",
		errorName	: "Adja meg a dokumentum könyvjelző nevét",
		remove		: "Dokumentum könyvjelző eltávolítása"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Számozott lista tulajdonságai",
		bulletedTitle		: "Felsorolásjeles lista tulajdonságai",
		type				: "Lista stílusa:",
		start				: "Kezdés:",
		validateStartNumber				:"A lista kezdő számának egész számnak kell lennie.",
		circle				: "Kör",
		disc				: "Korong",
		square				: "Négyzet",
		none				: "Nincs",
		notset				: "<nincs beállítva>",
		armenian			: "Örmény számozás",
		georgian			: "Grúz számozás (an, ban, gan stb.)",
		lowerRoman			: "Kisbetűs római (i, ii, iii, iv, v stb.)",
		upperRoman			: "Nagybetűs római (I, II, III, IV, V stb.)",
		lowerAlpha			: "Kisbetűs (a, b, c, d, e stb.)",
		upperAlpha			: "Nagybetűs (A, B, C, D, E stb.)",
		lowerGreek			: "Kisbetűs görög (alpha, beta, gamma stb.)",
		decimal				: "Számok (1, 2, 3 stb.)",
		decimalLeadingZero	: "Számok kezdő nullával (01, 02, 03 stb.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Keresés és csere",
		find				: "Keresés",
		replace				: "Csere",
		findWhat			: "Keresés:",
		replaceWith			: "Csere a következőre:",
		notFoundMsg			: "A megadott szöveg nem található.",
		findOptions			: "Beállítások keresése",
		matchCase			: "Kis-nagybetűk egyeznek",
		matchWord			: "Csak teljes szavak",
		matchCyclic			: "Körkörös",
		replaceAll			: "Összes cseréje",
		replaceSuccessMsg	: "%1 előfordulás cserélve."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Táblázat beszúrása",
		title		: "Táblázat",
		menu		: "Táblázat tulajdonságai",
		deleteTable	: "Táblázat törlése",
		rows		: "Sorok:",
		columns		: "Oszlopok:",
		border		: "Szegély mérete:",
		widthPx		: "képpont",
		widthPc		: "százalék",
		widthUnit	: "Szélesség egysége:",
		cellSpace	: "Cellatávolság:",
		cellPad		: "Cellakitöltés:",
		caption		: "Felirat:",
		summary		: "Összegzés:",
		headers		: "Fejlécek:",
		headersNone		: "Nincs",
		headersColumn	: "Első oszlop",
		headersRow		: "Első sor",
		headersBoth		: "Mindkettő",
		invalidRows		: "A sorok számának nullánál nagyobb egész számnak kell lennie.",
		invalidCols		: "Az oszlopok számának nullánál nagyobb egész számnak kell lennie.",
		invalidBorder	: "A szegély méretének pozitív számnak kell lennie.",
		invalidWidth	: "A táblázat szélességének pozitív számnak kell lennie.",
		invalidHeight	: "A táblázat magasságának pozitív számnak kell lennie.",
		invalidCellSpacing	: "A cellatávolságnak pozitív számnak kell lennie.",
		invalidCellPadding	: "A cellakitöltésnek pozitív számnak kell lennie.",

		cell :
		{
			menu			: "Cella",
			insertBefore	: "Cella beszúrása elé",
			insertAfter		: "Cella beszúrása mögé",
			deleteCell		: "Cellák törlése",
			merge			: "Cellák összevonása",
			mergeRight		: "Összevonás jobbra",
			mergeDown		: "Összevonás lefelé",
			splitHorizontal	: "Cella felosztása vízszintesen",
			splitVertical	: "Cella felosztása függőlegesen",
			title			: "Cellatulajdonságok",
			cellType		: "Cella típusa:",
			rowSpan			: "Sortávolság:",
			colSpan			: "Oszloptávolság:",
			wordWrap		: "Szótördelés:",
			hAlign			: "Vízszintes igazítás:",
			vAlign			: "Függőleges igazítás:",
			alignBaseline	: "Alapsor",
			bgColor			: "Háttérszín:",
			borderColor		: "Szegélyszín:",
			data			: "Adatok",
			header			: "Fejléc",
			yes				: "Igen",
			no				: "Nem",
			invalidWidth	: "A cellaszélességnek pozitív számnak kell lennie.",
			invalidHeight	: "A cellamagasságnak pozitív számnak kell lennie.",
			invalidRowSpan	: "A sortávolságnak pozitív egész számnak kell lennie.",
			invalidColSpan	: "Az oszloptávolságnak pozitív egész számnak kell lennie.",
			chooseColor 	: "További színek..."
		},

		row :
		{
			menu			: "Sor",
			insertBefore	: "Sor beszúrása elé",
			insertAfter		: "Sor beszúrása mögé",
			deleteRow		: "Sorok törlése"
		},

		column :
		{
			menu			: "Oszlop",
			insertBefore	: "Oszlop beszúrása elé",
			insertAfter		: "Oszlop beszúrása mögé",
			deleteColumn	: "Oszlopok törlése"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Gombtulajdonságok",
		text		: "Szöveg (érték):",
		type		: "Típus:",
		typeBtn		: "Gomb",
		typeSbm		: "Elküldés",
		typeRst		: "Visszaállítás"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Jelölőnégyzet tulajdonságai",
		radioTitle	: "Választógomb tulajdonságai",
		value		: "Érték:",
		selected	: "Kijelölt"
	},

	// Form Dialog.
	form :
	{
		title		: "Űrlap beszúrása",
		menu		: "Űrlap tulajdonságai",
		action		: "Művelet:",
		method		: "Metódus:",
		encoding	: "Kódolás:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Mezőtulajdonságok kiválasztása",
		selectInfo	: "Válasszon információkat",
		opAvail		: "Rendelkezésre álló beállítások",
		value		: "Érték:",
		size		: "Méret:",
		lines		: "vonalak",
		chkMulti	: "Többszörös kijelölések engedélyezése",
		opText		: "Szöveg:",
		opValue		: "Érték:",
		btnAdd		: "Hozzáadás",
		btnModify	: "Módosítás",
		btnUp		: "Fel",
		btnDown		: "Le",
		btnSetValue : "Beállítás kijelölt értékként",
		btnDelete	: "Törlés"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Szövegterület tulajdonságai",
		cols		: "Oszlopok:",
		rows		: "Sorok:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Szövegmező tulajdonságai",
		name		: "Név:",
		value		: "Érték:",
		charWidth	: "Karakterszélesség:",
		maxChars	: "Karakterek maximális száma:",
		type		: "Típus:",
		typeText	: "Szöveg",
		typePass	: "Jelszó"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Rejtett mező tulajdonságai",
		name	: "Név:",
		value	: "Érték:"
	},

	// Image Dialog.
	image :
	{
		title		: "Kép",
		titleButton	: "Képgomb tulajdonságai",
		menu		: "Képtulajdonságok",
		infoTab	: "Képinformációk",
		btnUpload	: "Kép feltöltése",
		upload	: "Feltöltés",
		alt		: "Alternatív szöveg:",
		lockRatio	: "Zárolási arány",
		resetSize	: "Méret alaphelyzetbe állítása",
		border	: "Szegély:",
		hSpace	: "Vízszintes hely:",
		vSpace	: "Függőleges hely:",
		alertUrl	: "Írja be a kép URL címét",
		linkTab	: "Hivatkozás",
		button2Img	: "Átalakítja a kiválasztott képgombot egyszerű képpé?",
		img2Button	: "Átalakítja a kiválasztott képet képgombbá?",
		urlMissing : "A kép forrás URL címe hiányzik.",
		validateBorder : "A szegélynek pozitív egész számnak kell lennie.",
		validateHSpace : "A vízszintes helynek pozitív egész számnak kell lennie.",
		validateVSpace : "A függőleges helynek pozitív egész számnak kell lennie."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flash tulajdonságai",
		propertiesTab	: "Tulajdonságok",
		title		: "Flash",
		chkPlay		: "Automatikus lejátszás",
		chkLoop		: "Ismétlés",
		chkMenu		: "Flash menü engedélyezése",
		chkFull		: "Teljes képernyő engedélyezése",
 		scale		: "Méretezés:",
		scaleAll		: "Összes megjelenítése",
		scaleNoBorder	: "Nincs szegély",
		scaleFit		: "Pontos illeszkedés",
		access			: "Parancsfájl-hozzáférés:",
		accessAlways	: "Mindig",
		accessSameDomain	: "Egyező tartomány",
		accessNever	: "Soha",
		alignAbsBottom: "Absz. alsó",
		alignAbsMiddle: "Absz. középső",
		alignBaseline	: "Alapsor",
		alignTextTop	: "Szöveg legfelül",
		quality		: "Minőség:",
		qualityBest	: "Legjobb",
		qualityHigh	: "Magas",
		qualityAutoHigh	: "Auto. magas",
		qualityMedium	: "Közepes",
		qualityAutoLow	: "Auto. alacsony",
		qualityLow	: "Alacsony",
		windowModeWindow	: "Ablak",
		windowModeOpaque	: "Átlátszatlan",
		windowModeTransparent	: "Átlátszó",
		windowMode	: "Ablakmód:",
		flashvars	: "Változók:",
		bgcolor	: "Háttérszín:",
		hSpace	: "Vízszintes hely:",
		vSpace	: "Függőleges hely:",
		validateSrc : "Az URL nem lehet üres.",
		validateHSpace : "A vízszintes helynek pozitív egész számnak kell lennie.",
		validateVSpace : "A függőleges helynek pozitív egész számnak kell lennie."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Helyesírás-ellenőrzés",
		title			: "Helyesírás-ellenőrzés",
		notAvailable	: "Sajnáljuk, a szolgáltatás jelenleng nem érhető el.",
		errorLoading	: "Hiba az alkalmazás %s szolgáltatáshosztjának betöltésekor.",
		notInDic		: "Nincs a könyvtárban",
		changeTo		: "Módosítása a következőre:",
		btnIgnore		: "Mellőzés",
		btnIgnoreAll	: "Összes mellőzése",
		btnReplace		: "Csere",
		btnReplaceAll	: "Összes cseréje",
		btnUndo			: "Visszavonás",
		noSuggestions	: "- Nincsenek javaslatok -",
		progress		: "Helyesírás-ellenőrzés folyamatban...",
		noMispell		: "Helyesírás-ellenőrzés kész: Nincsenek hibák",
		noChanges		: "Helyesírás-ellenőrzés kész: Nem módosultak szavak",
		oneChange		: "Helyesírás-ellenőrzés kész: Egy szó módosult",
		manyChanges		: "Helyesírás-ellenőrzés kész: %1 szó módosult",
		ieSpellDownload	: "A helyesírás-ellenőrző nincs telepítve. Letölti most?"
	},

	smiley :
	{
		toolbar	: "Hangulatjel beszúrása",
		title	: "Hangulatjelek",
		options : "Hangulatjelek lehetőség"
	},

	elementsPath :
	{
		eleLabel : "Elem elérési útja",
		eleTitle : "%1 elem"
	},

	numberedlist : "Számozott lista",
	bulletedlist : "Felsorolásjeles lista",
	indent : "Behúzás növelése",
	outdent : "Behúzás csökkentése",

	justify :
	{
		left : "Igazítás balra",
		center : "Igazítás középre",
		right : "Igazítás jobbra",
		block : "Sorkizárt igazítás"
	},

	blockquote : "Blokkidézet",

	clipboard :
	{
		title		: "Beillesztés",
		cutError	: "Böngészője biztonsági beállításai megakadályozzák az automatikus kivágást. Helyette használja a Ctrl+X billentyűkombinációt a billentyűzetről.",
		copyError	: "Böngészője biztonsági beállításai megakadályozzák az automatikus másolást. Helyette használja a Ctrl+C billentyűkombinációt a billentyűzetről.",
		pasteMsg	: "A beillesztéshez nyomja meg a Ctrl+V (MAC esetén a Cmd+V) billentyűkombinációt.",
		securityMsg	: "A böngésző biztonsági beállításai nem engedik a közvetlen beillesztést a vágólapról.",
		pasteArea	: "Beillesztési terület"
	},

	pastefromword :
	{
		confirmCleanup	: "A beilleszteni kívánt szöveg úgy tűnik a Word alkalmazásból származik. Tisztítja a beillesztése előtt?",
		toolbar			: "Irányított beillesztés",
		title			: "Irányított beillesztés",
		error			: "Belső hiba miatt nem sikerült a beillesztett adatok tisztítása"
	},

	pasteText :
	{
		button	: "Beillesztés sima szövegként",
		title	: "Beillesztés sima szövegként"
	},

	templates :
	{
		button 			: "Sablonok",
		title : "Tartalomsablonok",
		options : "Sablon lehetőség",
		insertOption: "Aktuális tartalom cseréje",
		selectPromptMsg: "Válassza ki a szerkesztőben megnyitandó sablont",
		emptyListMsg : "(Nincsenek megadva sablonok)"
	},

	showBlocks : "Blokkok megjelenítése",

	stylesCombo :
	{
		label		: "Stílusok",
		panelTitle 	: "Stílusok",
		panelTitle1	: "Blokkstílusok",
		panelTitle2	: "Belső stílusok",
		panelTitle3	: "Objektumstílusok"
	},

	format :
	{
		label		: "Formátum",
		panelTitle	: "Bekezdésformátum",

		tag_p		: "Normális",
		tag_pre		: "Formázott",
		tag_address	: "Cím",
		tag_h1		: "1. fejléc",
		tag_h2		: "2. fejléc",
		tag_h3		: "3. fejléc",
		tag_h4		: "4. fejléc",
		tag_h5		: "5. fejléc",
		tag_h6		: "6. fejléc",
		tag_div		: "Normális (DIV)"
	},

	div :
	{
		title				: "Div tároló létrehozása",
		toolbar				: "Div tároló létrehozása",
		cssClassInputLabel	: "Stíluslaposztályok",
		styleSelectLabel	: "Stílus",
		IdInputLabel		: "Azonosító",
		languageCodeInputLabel	: " Nyelvkód",
		inlineStyleInputLabel	: "Belső stílus",
		advisoryTitleInputLabel	: "Tanácsadói cím",
		langDirLabel		: "Nyelv iránya",
		langDirLTRLabel		: "Balról jobbra (B-J)",
		langDirRTLLabel		: "Jobbról balra (J-B)",
		edit				: "Div szerkesztése",
		remove				: "Div eltávolítása"
  	},

	iframe :
	{
		title		: "IFrame tulajdonságok",
		toolbar		: "IFrame beszúrása",
		noUrl		: "Írja be az iframe URL-címét",
		scrolling	: "Görgetősávok engedélyezése",
		border		: "Keret szegélyének megjelenítése"
	},

	font :
	{
		label		: "Betűtípus",
		voiceLabel	: "Betűtípus",
		panelTitle	: "Betűtípus neve"
	},

	fontSize :
	{
		label		: "Méret",
		voiceLabel	: "Betűméret",
		panelTitle	: "Betűméret"
	},

	colorButton :
	{
		textColorTitle	: "Szövegszín",
		bgColorTitle	: "Háttérszín",
		panelTitle		: "Színek",
		auto			: "Automatikus",
		more			: "További színek..."
	},

	colors :
	{
		"000" : "Fekete",
		"800000" : "Gesztenyebarna",
		"8B4513" : "Dióbarna",
		"2F4F4F" : "Sötét palazöld",
		"008080" : "Szürkészöld",
		"000080" : "Tengerészkék",
		"4B0082" : "Indigókék",
		"696969" : "Sötétszürke",
		"B22222" : "Téglavörös",
		"A52A2A" : "Barna",
		"DAA520" : "Aranysárga",
		"006400" : "Sötétzöld",
		"40E0D0" : "Türkizkék",
		"0000CD" : "Középkék",
		"800080" : "Lila",
		"808080" : "Szürke",
		"F00" : "Vörös",
		"FF8C00" : "Sötét narancsszín",
		"FFD700" : "Arany",
		"008000" : "Zöld",
		"0FF" : "Cián",
		"00F" : "Kék",
		"EE82EE" : "Ibolyaszín",
		"A9A9A9" : "Tompaszürke",
		"FFA07A" : "Világos lazacszínű",
		"FFA500" : "Narancs",
		"FFFF00" : "Sárga",
		"00FF00" : "Élénkzöld",
		"AFEEEE" : "Halvány türkizkék",
		"ADD8E6" : "Világoskék",
		"DDA0DD" : "Szilvakék",
		"D3D3D3" : "Világosszürke",
		"FFF0F5" : "Halvány levendulaszín",
		"FAEBD7" : "Ófehér",
		"FFFFE0" : "Világossárga",
		"F0FFF0" : "Halvány dinnyezöld",
		"F0FFFF" : "Azúrkék",
		"F0F8FF" : "Alizkék",
		"E6E6FA" : "Levendulaszín",
		"FFF" : "Fehér"
	},

	scayt :
	{
		title			: "Helyesírás-ellenőrzés gépeléskor (SCAYT)",
		opera_title		: "Az Opera nem támogatja",
		enable			: "SCAYT engedélyezése",
		disable			: "SCAYT letiltása",
		about			: "A SCAYT névjegye",
		toggle			: "A SCAYT átkapcsolása",
		options			: "Beállítások",
		langs			: "Nyelvek",
		moreSuggestions	: "További javaslatok",
		ignore			: "Mellőzés",
		ignoreAll		: "Összes mellőzése",
		addWord			: "Szó hozzáadása",
		emptyDic		: "A szótár neve nem lehet üres.",

		optionsTab		: "Beállítások",
		allCaps			: "Csupa nagybetűs szavak mellőzése",
		ignoreDomainNames : "Tartománynevek mellőzése",
		mixedCase		: "Kis- és nagybetűket vegyesen tartalmazó szavak mellőzése",
		mixedWithDigits	: "Számokat tartalmazó szavak mellőzése",

		languagesTab	: "Nyelvek",

		dictionariesTab	: "Szótárak",
		dic_field_name	: "Szótár neve",
		dic_create		: "Létrehozás",
		dic_restore		: "Visszaállítás",
		dic_delete		: "Törlés",
		dic_rename		: "Átnevezés",
		dic_info		: "A felhasználói szótár kezdetben egy cookie-ban van tárolva. A cookie-k mérete azonban korlátozott. Ha a felhasználói szótár mérete meghaladja a cookie-ban tárolható méretet, akkor a szótárt tárolhatja a szerverünkön is. A személyes szótár szerverünkön való tárolásához adja meg annak nevét. Ha már van tárolt személyes szótára, akkor írja be a nevét, és kattintson a Visszaállítás gombra.",

		aboutTab		: "Névjegy"
	},

	about :
	{
		title		: "A CKEditor névjegye",
		dlgTitle	: "A CKEditor névjegye",
		help	: "Segítséget itt talál: $1",
		userGuide : "CKEditor felhasználói kézikönyv",
		moreInfo	: "A licenckezelési információkért tekintse meg webhelyünket:",
		copy		: "Copyright &copy; $1. Minden jog fenntartva."
	},

	maximize : "Teljes méret",
	minimize : "Kis méret",

	fakeobjects :
	{
		anchor	: "Horgony",
		flash	: "Flash animáció",
		iframe		: "IFrame",
		hiddenfield	: "Rejtett mező",
		unknown	: "Ismeretlen objektum"
	},

	resize : "Húzza az átméretezéshez",

	colordialog :
	{
		title		: "Szín kiválasztása",
		options	:	"Színbeállítások",
		highlight	: "Kiemelés",
		selected	: "Kiválasztott szín",
		clear		: "Törlés"
	},

	toolbarCollapse	: "Eszköztár összehúzása",
	toolbarExpand	: "Eszköztár kibontása",

	toolbarGroups :
	{
		document : "Dokumentum",
		clipboard : "Vágólap/visszavonás",
		editing : "Szerkesztés",
		forms : "Űrlapok",
		basicstyles : "Alapvető stílusok",
		paragraph : "Bekezdés",
		links : "Hivatkozások",
		insert : "Beszúrás",
		styles : "Stílusok",
		colors : "Színek",
		tools : "Eszközök"
	},

	bidi :
	{
		ltr : "Szövegirány balról jobbra",
		rtl : "Szövegirány jobbról balra"
	},

	docprops :
	{
		label : "Dokumentum tulajdonságok",
		title : "Dokumentum tulajdonságok",
		design : "Terv",
		meta : "Metacímkék",
		chooseColor : "Kiválasztás",
		other : "Egyéb...",
		docTitle :	"Oldal címe",
		charset : 	"Karakterkészlet kódolás",
		charsetOther : "Egyéb karakterkészlet kódolás",
		charsetASCII : "ASCII",
		charsetCE : "Közép-európai",
		charsetCT : "Hagyományos kínai (Big5)",
		charsetCR : "Cirill",
		charsetGR : "Görög",
		charsetJP : "Japán",
		charsetKR : "Koreai",
		charsetTR : "Török",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Nyugat-európai",
		docType : "Dokumentumtípus fejléc",
		docTypeOther : "Egyéb dokumentumtípus fejléc",
		xhtmlDec : "XHTML deklarációk tartalmazása",
		bgColor : "Háttérszín",
		bgImage : "Háttérkép URL-címe",
		bgFixed : "Nem görgethető (rögzített) háttér",
		txtColor : "Szövegszín",
		margin : "Oldalmargók",
		marginTop : "Legfelső",
		marginLeft : "Bal",
		marginRight : "Jobb",
		marginBottom : "Alsó",
		metaKeywords : "Dokumentumindexelési kulcsszavak (vesszővel elválasztott)",
		metaDescription : "Dokumentum leírása",
		metaAuthor : "Szerző",
		metaCopyright : "Copyright",
		previewHtml : "<p>Ez egy <strong>mintaszöveg</strong>. A <a href=\"javascript:void(0)\">CKEditor</a>-t használja.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "hüvelyk",
			widthCm	: "centiméter",
			widthMm	: "milliméter",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "pont",
			widthPc	: "ciceró",
			required : "Szükséges"
		},
		table :
		{
			createTable : 'Táblázat beszúrása',
			heightUnit	: "Magasság egysége:",
			insertMultipleRows : "Sorok beszúrása",
			insertMultipleCols : "Oszlopok beszúrása",
			noOfRows : "Sorok száma:",
			noOfCols : "Oszlopok száma:",
			insertPosition : "Pozíció:",
			insertBefore : "Előtt",
			insertAfter : "Után",
			selectTable : "Táblázat kiválasztása",
			selectRow : "Sor kiválasztása",
			columnTitle : "Oszlopszélesség",
			colProps : "Oszlop tulajdonságai",
			invalidColumnWidth	: "Az oszlopszélességnek pozitív számnak kell lennie.",
			fixedColWidths : "Rögzített oszlopszélesség"
		},
		cell :
		{
			title : "Cella"
		},
		colordialog :
		{
			currentColor	: "Aktuális szín"
		},
		emoticon :
		{
			angel		: "Angyal",
			angry		: "Mérges",
			cool		: "Laza",
			crying		: "Sírós",
			eyebrow		: "Szemöldökhúzós",
			frown		: "Rosszalló",
			goofy		: "Ostoba",
			grin		: "Vigyorgó",
			half		: "Fél",
			idea		: "Ötlet",
			laughing	: "Nevető",
			laughroll	: "Nevetéstől guruló",
			no			: "Nem",
			oops		: "Hoppá",
			shy			: "Szégyenlős",
			smile		: "Mosolygó",
			tongue		: "Nyújtott nyelvű",
			wink		: "Kacsintó",
			yes			: "Igen"
		},

		menu :
		{
			link	: "Hivatkozás beszúrása",
			list	: "Listázás",
			paste	: "Beillesztés",
			action	: "Művelet",
			align	: "Igazítás",
			emoticon: "Hangulatjel"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Számozott lista",
			bulletedTitle		: "Felsorolásjeles lista",
			description			: "A beállítások az aktuális listaszintre lesznek alkalmazva",
			fontsize			: "Betűméret:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Írjon be egy beszédes könyvjelzőnevet, például '1.2 fejezet'. A könyvjelző beszúrása után kattintson vagy a 'Hivatkozás' vagy a 'Dokumentum könyvjelző hivatkozás' ikonra, hogy hivatkozást hozzon létre arra.",
			title		: "Dokumentum könyvjelző hivatkozás",
			linkTo		: "Hivatkozás a következőre:"
		},

		urllink :
		{
			title : "URL hivatkozás",
			linkText : "Hivatkozás szövege:",
			selectAnchor: "Válasszon egy horgonyt:",
			nourl: "Írjon be URL címet a szövegmezőbe.",
			urlhelp: "Írjon vagy illesszen olyan URL címet, amely megnyílik akkor, ha a felhasználók erre hivatkozásra kattintanak (például http://www.pelda.com).",
			displaytxthelp: "Írjon be a hivatkozáshoz megjelenítendő szöveget.",
			openinnew : "Hivatkozás megnyitása új ablakban"
		},

		spellchecker :
		{
			title : "Helyesírás ellenőrzése",
			replace : "Csere:",
			suggesstion : "Javaslatok:",
			withLabel : "A következőre:",
			replaceButton : "Csere",
			replaceallButton:"Összes cseréje",
			skipButton:"Kihagyás",
			skipallButton: "Összes kihagyása",
			undochanges: "Módosítok visszavonása",
			complete: "Helyesírás-ellenőrzés kész",
			problem: "Probléma az XML adatok beolvasása során",
			addDictionary: "Hozzáadás a szótárhoz",
			editDictionary: "Szótár szerkesztése"
		},

		status :
		{
			keystrokeForHelp: "Segítségért nyomja meg az ALT 0 billentyűkombinációt"
		},

		linkdialog :
		{
			label : "Hivatkozás párbeszédpanel"
		},

		imagedatauri :
		{
			error : "A képek beillesztése jelenleg nem támogatott. Használja helyette az eszköztár \'Kép beszúrása\' lehetőségét."
		},

		image :
		{
			previewText : "A hozzáadott képet a szöveg körbe fogja venni, mint ebben a példában.",
			fileUpload : "Válasszon ki egy képfájlt a számítógépén:"
		}
	}

};
