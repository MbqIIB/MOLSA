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

CKEDITOR.lang["fi"] =
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
	editorTitle : "RTF-tekstin muokkausohjelma, %1, avaa ohje painamalla ALT 0.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Muokkausohjelman työkalurivit",
	editor	: "RTF-muokkausohjelma",

	// Toolbar buttons without dialogs.
	source			: "Lähdekoodi",
	newPage			: "Uusi sivu",
	save			: "Tallenna",
	preview			: "Esikatselu:",
	cut				: "Leikkaa",
	copy			: "Kopioi",
	paste			: "Liitä",
	print			: "Tulosta",
	underline		: "Alleviivaus",
	bold			: "Lihavointi",
	italic			: "Kursivointi",
	selectAll		: "Valitse kaikki",
	removeFormat	: "Poista muotoilu",
	strike			: "Yliviivaus",
	subscript		: "Alennettu",
	superscript		: "Korotettu",
	horizontalrule	: "Lisää jakoviiva",
	pagebreak		: "Lisää sivunvaihto",
	pagebreakAlt		: "Sivunvaihto",
	unlink			: "Poista linkki",
	undo			: "Kumoa",
	redo			: "Tee uudelleen",

	// Common messages and labels.
	common :
	{
		browseServer	: "Selainpalvelin:",
		url				: "URL-osoite:",
		protocol		: "Yhteyskäytäntö:",
		upload			: "Siirto:",
		uploadSubmit	: "Lähetä palvelimeen",
		image			: "Lisää kuva",
		flash			: "Lisää Flash-esitys",
		form			: "Lisää lomake",
		checkbox		: "Lisää valintaruutu",
		radio			: "Lisää valintanappi",
		textField		: "Lisää tekstikenttä",
		textarea		: "Lisää tekstialue",
		hiddenField		: "Lisää piilokenttä",
		button			: "Lisää painike",
		select			: "Lisää valintakenttä",
		imageButton		: "Lisää kuvapainike",
		notSet			: "<ei asetettu>",
		id				: "Tunnus:",
		name			: "Nimi:",
		langDir			: "Kielen suunta:",
		langDirLtr		: "Vasemmalta oikealle",
		langDirRtl		: "Oikealta vasemmalle",
		langCode		: "Kielikoodi:",
		longDescr		: "Pitkän kuvauksen URL-osoite:",
		cssClass		: "Tyylitiedoston luokat:",
		advisoryTitle	: "Ohjeellinen otsikko:",
		cssStyle		: "Tyyli:",
		ok				: "OK",
		cancel			: "Peruuta",
		close : "Sulje",
		preview			: "Esikatselu:",
		generalTab		: "Yleiset",
		advancedTab		: "Tarkennettu haku",
		validateNumberFailed	: "Tämä arvo ei ole numero.",
		confirmNewPage	: "Tähän sisältöön tehdyt tallentamattomat muutokset menetetään. Haluatko varmasti ladata uuden sivun?",
		confirmCancel	: "Asetuksia on muutettu. Haluatko varmasti sulkea valintaikkunan?",
		options : "Asetukset",
		target			: "Kohde:",
		targetNew		: "Uusi ikkuna (_blank)",
		targetTop		: "Päällimmäinen ikkuna (_top)",
		targetSelf		: "Sama ikkuna (_self)",
		targetParent	: "Pääikkuna (_parent)",
		langDirLTR		: "Vasemmalta oikealle",
		langDirRTL		: "Oikealta vasemmalle",
		styles			: "Tyyli:",
		cssClasses		: "Tyylitiedoston luokat:",
		width			: "Leveys:",
		height			: "Korkeus:",
		align			: "Tasaa:",
		alignLeft		: "Vasen",
		alignRight		: "Oikea",
		alignCenter		: "Keskitä",
		alignTop		: "Alkuun",
		alignMiddle		: "Keskikohta",
		alignBottom		: "Alareuna",
		invalidHeight	: "Korkeuden on oltava positiivinen kokonaisluku.",
		invalidWidth	: "Leveyden on oltava positiivinen kokonaisluku.",
		invalidCssLength	: "Kenttään %1 määritetyn arvon on oltava positiivinen luku, jonka lisäksi voidaan antaa kelvollinen CSS-mittayksikkö (px, %, in, cm, mm, em, ex, pt tai pc).",
		invalidHtmlLength	: "Kenttään %1 määritetyn arvon on oltava positiivinen luku, jonka lisäksi voidaan antaa kelvollinen HTML-mittayksikkö (px tai %).",
		invalidInlineStyle	: "Sisäiselle tyylille määritetyn arvon tulee sisältää ainakin yksi kaksikko, jonka muoto on \"nimi : arvo\". Jos kaksikoita on useita, ne on erotettava toisistaan puolipistein.",
		cssLengthTooltip	: "Anna arvoksi luku pikseleinä tai kelvollisessa CSS-mittayksikössä (px, %, in, cm, mm, em, ex, pt tai pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, ei käytettävissä</span>"
	},

	contextmenu :
	{
		options : "Kohovalikon valinnat"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Lisää erikoismerkki",
		title		: "Erikoismerkki",
		options : "Erikoismerkkien asetukset"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL-linkki",
		other 		: "<muu>",
		menu		: "Muokkaa linkkiä",
		title		: "Linkki",
		info		: "Linkin tiedot",
		target		: "Kohde",
		upload		: "Siirto:",
		advanced	: "Tarkennettu haku",
		type		: "Linkkilaji:",
		toUrl		: "URL-osoite",
		toAnchor	: "Linkitä tekstin ankkuriin",
		toEmail		: "Sähköpostiosoite",
		targetFrame	: "<kehys>",
		targetPopup	: "<kohoikkuna>",
		targetFrameName	: "Kohdekehyksen nimi:",
		targetPopupName	: "Ponnahdusikkunan nimi:",
		popupFeatures	: "Ponnahdusikkunan ominaisuudet:",
		popupResizable	: "Koko muutettavissa",
		popupStatusBar	: "Tilarivi",
		popupLocationBar	: "Sijaintirivi",
		popupToolbar	: "Työkalurivi",
		popupMenuBar	: "Valikkorivi",
		popupFullScreen	: "Koko näyttö (IE)",
		popupScrollBars	: "Vierityspalkit",
		popupDependent	: "Alisteinen (Netscape)",
		popupLeft		: "Vasen sijainti",
		popupTop		: "Ylin sijainti",
		id				: "Tunnus:",
		langDir			: "Kielen suunta:",
		langDirLTR		: "Vasemmalta oikealle",
		langDirRTL		: "Oikealta vasemmalle",
		acccessKey		: "Pikanäppäin:",
		name			: "Nimi:",
		langCode		: "Kielikoodi:",
		tabIndex		: "Välilehtihakemisto:",
		advisoryTitle	: "Ohjeellinen otsikko:",
		advisoryContentType	: "Ohjeellinen sisältölaji:",
		cssClasses		: "Tyylitiedoston luokat:",
		charset			: "Linkitetyn resurssin merkistö",
		styles			: "Tyyli:",
		rel			: "Suhde",
		selectAnchor	: "Valitse ankkuri",
		anchorName		: "Ankkurin nimen mukaan",
		anchorId		: "Elementin tunnuksen mukaan",
		emailAddress	: "Sähköpostiosoite",
		emailSubject	: "Viestin aihe",
		emailBody		: "Viestin sisältö",
		noAnchors		: "Asiakirjassa ei ole käytettävissä olevia kirjanmerkkejä. Lisää kirjanmerkki napsauttamalla työkalurivin Lisää asiakirjan kirjanmerkki -kuvaketta.",
		noUrl			: "Kirjoita linkin URL-osoite",
		noEmail			: "Kirjoita sähköpostiosoite"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Lisää asiakirjan kirjanmerkki",
		menu		: "Muokkaa asiakirjan kirjanmerkkiä",
		title		: "Asiakirjan kirjanmerkki",
		name		: "Nimi:",
		errorName	: "Anna asiakirjan kirjanmerkin nimi",
		remove		: "Poista asiakirjan kirjanmerkki"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Numeroidun luettelon ominaisuudet",
		bulletedTitle		: "Luettelomerkein merkityn luettelon ominaisuudet",
		type				: "Luettelon tyyli:",
		start				: "Aloitus:",
		validateStartNumber				:"Luettelon aloitusluvun on oltava kokonaisluku.",
		circle				: "Ympyrä",
		disc				: "Pallo",
		square				: "Neliö",
		none				: "Ei mitään",
		notset				: "<ei asetettu>",
		armenian			: "Armenialaiset numerot",
		georgian			: "Georgialaiset numerot (an, ban, gan, etc.)",
		lowerRoman			: "Roomalaiset numerot pienin kirjaimin (i, ii, iii, iv, v...)",
		upperRoman			: "Roomalaiset numerot isoin kirjaimin (I, II, III, IV, V...)",
		lowerAlpha			: "Pienet aakkoset (a, b, c, d, e...)",
		upperAlpha			: "Isot aakkoset (A, B, C, D, E...)",
		lowerGreek			: "Pienet kreikkalaiset kirjaimet (alfa, beeta, gamma...)",
		decimal				: "Kymmenjärjestelmän numerot (1, 2, 3...)",
		decimalLeadingZero	: "Kymmenjärjestelmän numerot ja etunollat (01, 02, 03...)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Etsi ja korvaa",
		find				: "Etsi",
		replace				: "Korvaa",
		findWhat			: "Etsi:",
		replaceWith			: "Korvaava:",
		notFoundMsg			: "Määritettyä tekstiä ei löytynyt.",
		findOptions			: "Hakuasetukset",
		matchCase			: "Sama kirjainkoko",
		matchWord			: "Kokonainen sana",
		matchCyclic			: "Syklinen vastaavuus",
		replaceAll			: "Korvaa kaikki",
		replaceSuccessMsg	: "%1 esiintymä(ä) on korvattu."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Lisää taulukko",
		title		: "Taulukko",
		menu		: "Taulukon ominaisuudet",
		deleteTable	: "Poista taulukko",
		rows		: "Rivit:",
		columns		: "Sarakkeet:",
		border		: "Reunan koko:",
		widthPx		: "pikseliä",
		widthPc		: "prosenttia",
		widthUnit	: "Leveyden yksikkö:",
		cellSpace	: "Solujen välit:",
		cellPad		: "Solujen täyttö:",
		caption		: "Kuvateksti:",
		summary		: "Tiivistelmä:",
		headers		: "Ylätunnisteet:",
		headersNone		: "Ei mitään",
		headersColumn	: "Ensimmäinen sarake",
		headersRow		: "Ensimmäinen rivi",
		headersBoth		: "Molemmat",
		invalidRows		: "Rivien määrän on oltava kokonaisluku, joka on suurempi kuin 0.",
		invalidCols		: "Sarakkeiden määrän on oltava kokonaisluku, joka on suurempi kuin 0.",
		invalidBorder	: "Reunan koon on oltava positiivinen numeroarvo.",
		invalidWidth	: "Taulukon leveyden on oltava positiivinen numeroarvo.",
		invalidHeight	: "Taulukon korkeuden on oltava positiivinen numeroarvo.",
		invalidCellSpacing	: "Solujen välin on oltava positiivinen numeroarvo.",
		invalidCellPadding	: "Solujen täytön on oltava positiivinen numeroarvo.",

		cell :
		{
			menu			: "Solu",
			insertBefore	: "Lisää solu edelle",
			insertAfter		: "Lisää solu jälkeen",
			deleteCell		: "Poista solut",
			merge			: "Yhdistä solut",
			mergeRight		: "Yhdistä oikealle",
			mergeDown		: "Yhdistä alas",
			splitHorizontal	: "Jaa solu vaakasuunnassa",
			splitVertical	: "Jaa solu pystysuunnassa",
			title			: "Solun ominaisuudet",
			cellType		: "Solun laji:",
			rowSpan			: "Rivin korkeus:",
			colSpan			: "Sarakkeen leveys:",
			wordWrap		: "Rivitys:",
			hAlign			: "Vaakatasaus:",
			vAlign			: "Pystytasaus:",
			alignBaseline	: "Perustaso",
			bgColor			: "Taustaväri:",
			borderColor		: "Reunan väri:",
			data			: "Tiedot",
			header			: "Otsikko",
			yes				: "Kyllä",
			no				: "Ei",
			invalidWidth	: "Solun leveyden on oltava positiivinen numeroarvo.",
			invalidHeight	: "Solun korkeuden on oltava positiivinen numeroarvo.",
			invalidRowSpan	: "Useita rivejä sisältävän solun korkeuden on oltava positiivinen kokonaisluku.",
			invalidColSpan	: "Useita sarakkeita sisältävän solun korkeuden on oltava positiivinen kokonaisluku.",
			chooseColor 	: "Lisää värejä..."
		},

		row :
		{
			menu			: "Rivi",
			insertBefore	: "Lisää rivi edelle",
			insertAfter		: "Lisää rivi jälkeen",
			deleteRow		: "Poista rivit"
		},

		column :
		{
			menu			: "Sarake",
			insertBefore	: "Lisää sarake edelle",
			insertAfter		: "Lisää sarake jälkeen",
			deleteColumn	: "Poista sarakkeet"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Painikkeen ominaisuudet",
		text		: "Teksti (arvo):",
		type		: "Laji:",
		typeBtn		: "Painike",
		typeSbm		: "Lähetä",
		typeRst		: "Palauta"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Valintaruudun ominaisuudet",
		radioTitle	: "Valintanapin ominaisuudet",
		value		: "Arvo:",
		selected	: "Valittu"
	},

	// Form Dialog.
	form :
	{
		title		: "Lisää lomake",
		menu		: "Lomakkeen ominaisuudet",
		action		: "Toiminto:",
		method		: "Menetelmä:",
		encoding	: "Koodaus:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Kentän ominaisuuksien valinta",
		selectInfo	: "Valitse tiedot",
		opAvail		: "Käytettävissä olevat vaihtoehdot",
		value		: "Arvo:",
		size		: "Koko:",
		lines		: "riviä",
		chkMulti	: "Salli useita valintoja",
		opText		: "Teksti:",
		opValue		: "Arvo:",
		btnAdd		: "Lisää",
		btnModify	: "Muokkaa",
		btnUp		: "Ylös",
		btnDown		: "Alas",
		btnSetValue : "Määritä valituksi arvoksi",
		btnDelete	: "Poista"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Tekstialueen ominaisuudet",
		cols		: "Sarakkeet:",
		rows		: "Rivit:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Tekstikentän ominaisuudet",
		name		: "Nimi:",
		value		: "Arvo:",
		charWidth	: "Merkkileveys:",
		maxChars	: "Merkkien enimmäismäärä:",
		type		: "Laji:",
		typeText	: "Teksti",
		typePass	: "Salasana"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Piilotetun kentän ominaisuudet",
		name	: "Nimi:",
		value	: "Arvo:"
	},

	// Image Dialog.
	image :
	{
		title		: "Kuva",
		titleButton	: "Kuvapainikkeen ominaisuudet",
		menu		: "Kuvan ominaisuudet",
		infoTab	: "Kuvan tiedot",
		btnUpload	: "Siirrä kuva palvelimeen",
		upload	: "Siirrä",
		alt		: "Vaihtoehtoinen teksti:",
		lockRatio	: "Lukitse suhde",
		resetSize	: "Palauta koko",
		border	: "Reuna:",
		hSpace	: "Vaakatila:",
		vSpace	: "Pystytila:",
		alertUrl	: "Kirjoita kuvan URL-osoite",
		linkTab	: "Linkki",
		button2Img	: "Haluatko muuntaa valitun kuvapainikkeen yksinkertaiseksi kuvaksi?",
		img2Button	: "Haluatko muuntaa valitun kuvan kuvapainikkeeksi?",
		urlMissing : "Kuvalähteen URL-osoite puuttuu.",
		validateBorder : "Reunan on oltava positiivinen kokonaisluku.",
		validateHSpace : "Vaakatilan on oltava positiivinen kokonaisluku.",
		validateVSpace : "Pystytilan on oltava positiivinen kokonaisluku."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flash-ominaisuudet",
		propertiesTab	: "Ominaisuudet",
		title		: "Flash",
		chkPlay		: "Automaattinen toisto",
		chkLoop		: "Silmukka",
		chkMenu		: "Ota Flash-valikko käyttöön",
		chkFull		: "Salli koko näyttö",
 		scale		: "Mitta:",
		scaleAll		: "Näytä kaikki",
		scaleNoBorder	: "Ei reunaa",
		scaleFit		: "Sovita tarkalleen",
		access			: "Komentotiedoston käyttö:",
		accessAlways	: "Aina",
		accessSameDomain	: "Sama verkkoalue",
		accessNever	: "Ei koskaan",
		alignAbsBottom: "Abs. alareuna",
		alignAbsMiddle: "Abs. keskikohta",
		alignBaseline	: "Perustaso",
		alignTextTop	: "Tekstin yläreuna",
		quality		: "Laatu:",
		qualityBest	: "Paras",
		qualityHigh	: "Korkea",
		qualityAutoHigh	: "Korkea, autom.",
		qualityMedium	: "Normaali",
		qualityAutoLow	: "Matala, autom.",
		qualityLow	: "Matala",
		windowModeWindow	: "Ikkuna",
		windowModeOpaque	: "Samea",
		windowModeTransparent	: "Läpinäkyvä",
		windowMode	: "Ikkunatila:",
		flashvars	: "Muuttujat:",
		bgcolor	: "Taustaväri:",
		hSpace	: "Vaakatila:",
		vSpace	: "Pystytila:",
		validateSrc : "URL-osoite ei saa olla tyhjä.",
		validateHSpace : "Vaakatilan on oltava positiivinen kokonaisluku.",
		validateVSpace : "Pystytilan on oltava positiivinen kokonaisluku."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Oikeinkirjoituksen tarkistus",
		title			: "Oikeinkirjoituksen tarkistus",
		notAvailable	: "Palvelu ei ole juuri nyt käytettävissä.",
		errorLoading	: "Sovelluspalvelun pääkoneen latauksessa on ilmennyt virhe: %s.",
		notInDic		: "Sana ei ole sanastossa",
		changeTo		: "Muuta seuraavaksi",
		btnIgnore		: "Hylkää",
		btnIgnoreAll	: "Ohita kaikki",
		btnReplace		: "Korvaa",
		btnReplaceAll	: "Korvaa kaikki",
		btnUndo			: "Kumoa",
		noSuggestions	: "- Ei ehdotuksia -",
		progress		: "Oikeinkirjoituksen tarkistus on meneillään...",
		noMispell		: "Oikeinkirjoituksen tarkistus on valmis: kirjoitusvirheitä ei löytynyt",
		noChanges		: "Oikeinkirjoituksen tarkistus on valmis: sanoja ei muutettu",
		oneChange		: "Oikeinkirjoituksen tarkistus on valmis: yksi sana on muutettu",
		manyChanges		: "Oikeinkirjoituksen tarkistus on valmis: %1 sanaa on muutettu",
		ieSpellDownload	: "Oikeinkirjoituksen tarkistustoimintoa ei ole asennettu. Haluatko ladata sen nyt?"
	},

	smiley :
	{
		toolbar	: "Lisää hymiö",
		title	: "Hymiöt",
		options : "Hymiövalinnat"
	},

	elementsPath :
	{
		eleLabel : "Elementtien polku",
		eleTitle : "%1 elementti"
	},

	numberedlist : "Numeroitu luettelo",
	bulletedlist : "Luettelomerkein merkitty luettelo",
	indent : "Suurenna sisennystä",
	outdent : "Pienennä sisennystä",

	justify :
	{
		left : "Tasaus vasemmalle",
		center : "Tasaus keskelle",
		right : "Tasaus oikealle",
		block : "Tasaa molemmat reunat:"
	},

	blockquote : "Blockquote",

	clipboard :
	{
		title		: "Liitä",
		cutError	: "Selaimen suojausasetukset estävät automaattisen leikkauksen. Käytä sen sijasta näppäinyhdistelmää Ctrl+X.",
		copyError	: "Selaimen suojausasetukset estävät automaattisen kopioinnin. Käytä sen sijasta näppäinyhdistelmää Ctrl+C.",
		pasteMsg	: "Liitä käyttämällä näppäinyhdistelmää Ctrl+V (Macintosh: Komento+V).",
		securityMsg	: "Selaimen suojausasetukset estävät liittämisen suoraan leikepöydältä.",
		pasteArea	: "Liitosalue"
	},

	pastefromword :
	{
		confirmCleanup	: "Liitettävä teksti on kopioitu Wordista. Haluatko puhdistaa sen ennen liittämistä?",
		toolbar			: "Liitä määräten",
		title			: "Liitä määräten",
		error			: "Liitetyn tekstin puhdistaminen ei onnistunut sisäisen virheen vuoksi"
	},

	pasteText :
	{
		button	: "Liitä tekstitiedostona",
		title	: "Liitä tekstitiedostona"
	},

	templates :
	{
		button 			: "Mallipohjat",
		title : "Sisältömallipohjat",
		options : "Mallipohjan asetukset",
		insertOption: "Korvaa varsinainen sisältö",
		selectPromptMsg: "Valitse mallipohja, joka avataan muokkausohjelmassa",
		emptyListMsg : "(Mallipohjia ei ole määritetty)"
	},

	showBlocks : "Näytä estot",

	stylesCombo :
	{
		label		: "Tyylit",
		panelTitle 	: "Tyylit",
		panelTitle1	: "Lohkotyylit",
		panelTitle2	: "Sisäiset tyylit",
		panelTitle3	: "Objektityylit"
	},

	format :
	{
		label		: "Muotoile",
		panelTitle	: "Kappaleen muotoilu",

		tag_p		: "Normaali",
		tag_pre		: "Muotoiltu",
		tag_address	: "Osoite",
		tag_h1		: "Otsikko 1",
		tag_h2		: "Otsikko 2",
		tag_h3		: "Otsikko 3",
		tag_h4		: "Otsikko 4",
		tag_h5		: "Otsikko 5",
		tag_h6		: "Otsikko 6",
		tag_div		: "Normaali (DIV)"
	},

	div :
	{
		title				: "Luo Div-säilö",
		toolbar				: "Luo Div-säilö",
		cssClassInputLabel	: "Tyylitiedoston luokat",
		styleSelectLabel	: "Tyyli",
		IdInputLabel		: "Tunnus",
		languageCodeInputLabel	: " Kielikoodi",
		inlineStyleInputLabel	: "Sisäinen tyyli",
		advisoryTitleInputLabel	: "Ohjeellinen otsikko",
		langDirLabel		: "Kielen suunta",
		langDirLTRLabel		: "Vasemmalta oikealle",
		langDirRTLLabel		: "Oikealta vasemmalle",
		edit				: "Muokkaa Div-kohdetta",
		remove				: "Poista Div-kohde"
  	},

	iframe :
	{
		title		: "IFrame-ominaisuudet",
		toolbar		: "Lisää iFrame-kehys",
		noUrl		: "Kirjoita iFrame-kehyksen URL-osoite",
		scrolling	: "Ota vierityspalkit käyttöön",
		border		: "Näytä kehyksen reuna"
	},

	font :
	{
		label		: "Fontti",
		voiceLabel	: "Fontti",
		panelTitle	: "Fontin nimi"
	},

	fontSize :
	{
		label		: "Koko",
		voiceLabel	: "Fonttikoko",
		panelTitle	: "Fonttikoko"
	},

	colorButton :
	{
		textColorTitle	: "Tekstin väri",
		bgColorTitle	: "Taustaväri",
		panelTitle		: "Värit",
		auto			: "Automaattinen",
		more			: "Lisää värejä..."
	},

	colors :
	{
		"000" : "Musta",
		"800000" : "Kastanjanruskea",
		"8B4513" : "Satulanruskea",
		"2F4F4F" : "Tummanharmaa",
		"008080" : "Sinivihreä",
		"000080" : "Tummansininen",
		"4B0082" : "Indigo",
		"696969" : "Tummanharmaa",
		"B22222" : "Poltetun tiilen punainen",
		"A52A2A" : "Ruskea",
		"DAA520" : "Kullanruskea",
		"006400" : "Tummanvihreä",
		"40E0D0" : "Turkoosi",
		"0000CD" : "Keskisininen",
		"800080" : "Punavioletti",
		"808080" : "Harmaa",
		"F00" : "Punainen",
		"FF8C00" : "Tummanoranssi",
		"FFD700" : "Kultainen",
		"008000" : "Vihreä",
		"0FF" : "Syaani",
		"00F" : "Sininen",
		"EE82EE" : "Violetti",
		"A9A9A9" : "Himmeänharmaa",
		"FFA07A" : "Vaalea lohenpunainen",
		"FFA500" : "Oranssi",
		"FFFF00" : "Keltainen",
		"00FF00" : "Vaaleanvihreä",
		"AFEEEE" : "Haalea turkoosi",
		"ADD8E6" : "Vaaleansininen",
		"DDA0DD" : "Luumunpunainen",
		"D3D3D3" : "Vaaleanharmaa",
		"FFF0F5" : "Laventelinpunainen",
		"FAEBD7" : "Antiikinvalkoinen",
		"FFFFE0" : "Vaaleankeltainen",
		"F0FFF0" : "Hunajameloninvihreä",
		"F0FFFF" : "Taivaansininen",
		"F0F8FF" : "Vaaleanharmaansininen",
		"E6E6FA" : "Laventeli",
		"FFF" : "Valkoinen"
	},

	scayt :
	{
		title			: "Oikeinkirjoituksen tarkistus kirjoittamisen yhteydessä",
		opera_title		: "Ei tuettu Opera-ohjelmassa",
		enable			: "Ota tarkistus käyttöön",
		disable			: "Poista tarkistus käytöstä",
		about			: "Tietoja oikeinkirjoituksen tarkistuksesta kirjoittamisen yhteydessä",
		toggle			: "Ota tarkistus käyttöön tai poista se käytöstä",
		options			: "Asetukset",
		langs			: "Kielet",
		moreSuggestions	: "Lisää ehdotuksia",
		ignore			: "Hylkää",
		ignoreAll		: "Ohita kaikki",
		addWord			: "Lisää sana",
		emptyDic		: "Sanaston nimi ei saa olla tyhjä.",

		optionsTab		: "Asetukset",
		allCaps			: "Ohita kokonaan isoin kirjaimin kirjoitetut sanat",
		ignoreDomainNames : "Ohita verkkotunnukset",
		mixedCase		: "Ohita sanat, joissa isoja ja pieniä kirjaimia sekaisin",
		mixedWithDigits	: "Ohita sanat, joissa on numeroita",

		languagesTab	: "Kielet",

		dictionariesTab	: "Sanastot",
		dic_field_name	: "Sanaston nimi",
		dic_create		: "Luo",
		dic_restore		: "Palauta",
		dic_delete		: "Poista",
		dic_rename		: "Nimeä uudelleen",
		dic_info		: "Alun perin apusanasto on tallennettu evästeeseen. Evästeiden koko on kuitenkin rajallinen. Kun apusanasto kasvaa niin suureksi, ettei sitä voi tallentaa evästeeseen, sanasto voidaan tallentaa palvelimeemme. Voit tallentaa henkilökohtaisen sanaston palvelimeemme määrittämällä sanastollesi nimen. Jos sanasto on jo tallennettu, kirjoita sen nimi ja napsauta Palauta-painiketta.",

		aboutTab		: "Tietoja"
	},

	about :
	{
		title		: "Tietoja CKEditor-muokkausohjelmasta",
		dlgTitle	: "Tietoja CKEditor-muokkausohjelmasta",
		help	: "Saat ohjeita kohteesta $1.",
		userGuide : "CKEditor-muokkausohjelman käyttöopas",
		moreInfo	: "Käyttöoikeustiedot ovat saatavana Web-sivustostamme:",
		copy		: "Copyright &copy; $1. Kaikki oikeudet pidätetään."
	},

	maximize : "Suurenna",
	minimize : "Pienennä",

	fakeobjects :
	{
		anchor	: "Ankkuri",
		flash	: "Flash-animaatio",
		iframe		: "IFrame-kehys",
		hiddenfield	: "Piilokenttä",
		unknown	: "Tuntematon objekti"
	},

	resize : "Muuta kokoa vetämällä",

	colordialog :
	{
		title		: "Valitse väri",
		options	:	"Väriasetukset",
		highlight	: "Korostus",
		selected	: "Valittu väri",
		clear		: "Tyhjennä"
	},

	toolbarCollapse	: "Pienennä työkalurivi",
	toolbarExpand	: "Laajenna työkalurivi",

	toolbarGroups :
	{
		document : "Asiakirja",
		clipboard : "Leikepöytä/kumoa",
		editing : "Muokkaus on meneillään",
		forms : "Lomakkeet",
		basicstyles : "Perustyylit",
		paragraph : "Kappale",
		links : "Linkit",
		insert : "Lisää",
		styles : "Tyylit",
		colors : "Värit",
		tools : "Työkalut"
	},

	bidi :
	{
		ltr : "Tekstin suunta vasemmalta oikealle",
		rtl : "Tekstin suunta oikealta vasemmalle"
	},

	docprops :
	{
		label : "Asiakirjan ominaisuudet",
		title : "Asiakirjan ominaisuudet",
		design : "Rakenne",
		meta : "Metatunnisteet",
		chooseColor : "Valitse",
		other : "Muu...",
		docTitle :	"Sivun otsikko",
		charset : 	"Merkistökoodaus",
		charsetOther : "Muu merkistökoodaus",
		charsetASCII : "ASCII",
		charsetCE : "Keskieurooppalainen",
		charsetCT : "Perinteinen kiinalainen (Big5)",
		charsetCR : "Kyrillinen",
		charsetGR : "Kreikkalainen",
		charsetJP : "Japanilainen",
		charsetKR : "Korealainen",
		charsetTR : "Turkkilainen",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Länsieurooppalainen",
		docType : "Asiakirjalajin otsikko",
		docTypeOther : "Muu asiakirjalajin otsikko",
		xhtmlDec : "Sisällytä XHTML-esittelyt",
		bgColor : "Taustaväri",
		bgImage : "Taustakuvan URL-osoite",
		bgFixed : "Kiinteä tausta (ei taustan vieritystä)",
		txtColor : "Tekstin väri",
		margin : "Sivun reunukset",
		marginTop : "Alkuun",
		marginLeft : "Vasen",
		marginRight : "Oikea",
		marginBottom : "Alareuna",
		metaKeywords : "Asiakirjan indeksoinnin avainsanat (pilkuin erotettuna)",
		metaDescription : "Asiakirjan kuvaus",
		metaAuthor : "Tekijä",
		metaCopyright : "Copyright",
		previewHtml : "<p>Tämä on <strong>esimerkkiteksti</strong>. Käytät nyt <a href=\"javascript:void(0)\">CKEditor</a>-muokkausohjelmaa.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "tuumaa",
			widthCm	: "senttiä",
			widthMm	: "milliä",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "pistettä",
			widthPc	: "picaa",
			required : "Pakollinen"
		},
		table :
		{
			createTable : 'Lisää taulukko',
			heightUnit	: "Korkeuden yksikkö:",
			insertMultipleRows : "Lisää rivejä",
			insertMultipleCols : "Lisää sarakkeita",
			noOfRows : "Rivien määrä:",
			noOfCols : "Sarakkeiden määrä:",
			insertPosition : "Sijainti:",
			insertBefore : "Ennen",
			insertAfter : "Jälkeen",
			selectTable : "Valitse taulukko",
			selectRow : "Valitse rivi",
			columnTitle : "Sarakkeen leveys",
			colProps : "Sarakkeen ominaisuudet",
			invalidColumnWidth	: "Sarakkeen leveyden on oltava positiivinen numeroarvo.",
			fixedColWidths : "Kiinteät sarakeleveydet"
		},
		cell :
		{
			title : "Solu"
		},
		colordialog :
		{
			currentColor	: "Nykyinen väri"
		},
		emoticon :
		{
			angel		: "Enkeli",
			angry		: "Vihainen",
			cool		: "Viileä hymy",
			crying		: "Itkeä",
			eyebrow		: "Ihmetellä",
			frown		: "Irvistää",
			goofy		: "Hölmö",
			grin		: "Virnistää",
			half		: "Puolikas",
			idea		: "Idea",
			laughing	: "Nauraa",
			laughroll	: "Nauraa kippurassa",
			no			: "Ei",
			oops		: "Hups",
			shy			: "Ujo",
			smile		: "Hymyillä",
			tongue		: "Näyttää kieltä",
			wink		: "Iskeä silmää",
			yes			: "Kyllä"
		},

		menu :
		{
			link	: "Lisää linkki",
			list	: "Luettelo",
			paste	: "Liitä",
			action	: "Toiminto",
			align	: "Tasaa",
			emoticon: "Hymiö"
		},

		iframe :
		{
			title	: "IFrame-kehys"
		},

		list:
		{
			numberedTitle		: "Numeroitu luettelo",
			bulletedTitle		: "Luettelomerkein merkitty luettelo",
			description			: "Asetuksia käytetään nykyisellä luettelotasolla",
			fontsize			: "Fonttikoko:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Kirjoita kuvaava kirjanmerkin nimi, kuten \"Osa 1.2\". Kun olet lisännyt kirjanmerkin, lisää siihen osoittava linkki napsauttamalla Linkki- tai Asiakirjan kirjanmerkin linkki -kuvaketta.",
			title		: "Asiakirjan kirjanmerkin linkki",
			linkTo		: "Linkki kohteeseen:"
		},

		urllink :
		{
			title : "URL-linkki",
			linkText : "Linkin teksti:",
			selectAnchor: "Valitse ankkuri:",
			nourl: "Kirjoita URL-osoite tekstikenttään.",
			urlhelp: "Kirjoita tai liitä URL-osoite, joka avautuu, kun käyttäjät napsauttavat tätä linkkiä. Esimerkki: http://www.example.com.",
			displaytxthelp: "Kirjoita teksti, joka näkyy linkissä.",
			openinnew : "Avaa linkki uudessa ikkunassa"
		},

		spellchecker :
		{
			title : "Tarkista oikeinkirjoitus",
			replace : "Korvaa:",
			suggesstion : "Ehdotukset:",
			withLabel : "Korvaava:",
			replaceButton : "Korvaa",
			replaceallButton:"Korvaa kaikki",
			skipButton:"Ohita",
			skipallButton: "Ohita kaikki",
			undochanges: "Kumoa muutokset",
			complete: "Oikoluku valmis",
			problem: "XML-tietoja noudettaessa on ilmennyt ongelma",
			addDictionary: "Lisää sanastoon",
			editDictionary: "Muokkaa sanastoa"
		},

		status :
		{
			keystrokeForHelp: "Tuo ohje näkyviin painamalla ALT- ja 0-näppäintä"
		},

		linkdialog :
		{
			label : "Linkki-valintaikkuna"
		},

		imagedatauri :
		{
			error : "Kuvien liittäminen ei ole tällä hetkellä tuettua. Käytä sen sijasta työkalurivin vaihtoehtoa \'Lisää kuva\'."
		},

		image :
		{
			previewText : "Teksti asettautuu lisäämäsi kuvan ympärille, kuten tässä esimerkissä.",
			fileUpload : "Valitse kuvatiedosto omasta tietokoneestasi:"
		}
	}

};
