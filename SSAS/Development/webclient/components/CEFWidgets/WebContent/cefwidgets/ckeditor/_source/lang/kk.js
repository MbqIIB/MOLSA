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

CKEDITOR.lang["kk"] =
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
	editorTitle : "Пішімделген мәтіннің өңдегіші, %1, анықтама алу үшін, ALT 0 пернесін басыңыз.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Өңдеуші құралдар тақтасы",
	editor	: "Пішімделген мәтіннің өңдегіші",

	// Toolbar buttons without dialogs.
	source			: "Көзі",
	newPage			: "Жаңа бет",
	save			: "Сақтау",
	preview			: "Алдын ара қарау:",
	cut				: "Қиып алу",
	copy			: "Көшіру",
	paste			: "Қою",
	print			: "Басып шығару",
	underline		: "Асты сызылған",
	bold			: "Қалың",
	italic			: "Көлбеу",
	selectAll		: "Барлығын таңдау",
	removeFormat	: "Пішімді алып тастау",
	strike			: "Сызылған",
	subscript		: "Жоласты",
	superscript		: "Жолүсті",
	horizontalrule	: "Көлденең жолақ кірістіру",
	pagebreak		: "Бет үзілімін кірістіру",
	pagebreakAlt		: "Бет үзілімі",
	unlink			: "Сілтемені жою",
	undo			: "Болдырмау",
	redo			: "Қайтару",

	// Common messages and labels.
	common :
	{
		browseServer	: "Шолғыш сервері:",
		url				: "URL мекенжайы:",
		protocol		: "Протокол:",
		upload			: "Жүктеп салу:",
		uploadSubmit	: "Оны серверге жіберу",
		image			: "Сурет кірістіру",
		flash			: "Флеш бейне кірістіру",
		form			: "Пішін кірістіру",
		checkbox		: "Құсбелгі кірістіру",
		radio			: "Радио түймешігін кірістіру",
		textField		: "Мәтін өрісін кірістіру",
		textarea		: "Мәтін аймағын кірістіру",
		hiddenField		: "Жасырын өріс кірістіру",
		button			: "Түймешік кірістіру",
		select			: "Таңдау өрісін кірістіру",
		imageButton		: "Сурет түймешігін кірістіру",
		notSet			: "<орнатылмаған>",
		id				: "ID:",
		name			: "Аты:",
		langDir			: "Тіл бағыты:",
		langDirLtr		: "Солдан оңға",
		langDirRtl		: "Оңнан солға",
		langCode		: "Тіл коды:",
		longDescr		: "Үзын сипаттаманың URL мекенжайы:",
		cssClass		: "Мәнерлер кестесінің класстары:",
		advisoryTitle	: "Кеңес тақырыбы:",
		cssStyle		: "Мәнер:",
		ok				: "OK",
		cancel			: "Болдырмау",
		close : "Жабу",
		preview			: "Алдын ара қарау:",
		generalTab		: "Жалпы",
		advancedTab		: "Кеңейтілген",
		validateNumberFailed	: "Мұл мән сан емес.",
		confirmNewPage	: "Осы мазмұнға енгізілген кез келген сақталмаған өзгеріс жоғалады. Расында жаңа бет жүктеу керек пе?",
		confirmCancel	: "Кейбір параметрлер өзгертілді. Тілқатысу терезесін расында жабу керек пе?",
		options : "Параметрлер",
		target			: "Мақсат:",
		targetNew		: "Жаңа терезе (_бос)",
		targetTop		: "Ең жоғарғы терезе (_жоғарғы)",
		targetSelf		: "Бірдей терезе (_өздік)",
		targetParent	: "Тектік терезе (_тектік)",
		langDirLTR		: "Солдан оңға",
		langDirRTL		: "Оңнан солға",
		styles			: "Мәнер:",
		cssClasses		: "Мәнерлер кестесінің класстары:",
		width			: "Ені:",
		height			: "Биіктігі:",
		align			: "Туралау:",
		alignLeft		: "Сол жақ",
		alignRight		: "Оң жақ",
		alignCenter		: "Орта",
		alignTop		: "Үстіңгі",
		alignMiddle		: "Ортасы",
		alignBottom		: "Төменгі жағы",
		invalidHeight	: "Биіктігі оң бүтін сан болуы қажет.",
		invalidWidth	: "Ені оң бүтін сан болуы қажет.",
		invalidCssLength	: "'%1' өрісі үшін көрсетілген мән жарамды CSS өлшем бірлігімен бірге немесе бөлек болуы қажет (пк, %, дюйм, см, мм, ем, ex, пт немесе шт).",
		invalidHtmlLength	: "'%1' өрісі үшін көрсетілген мән жарамды HTML өлшем бірлігімен бірге немесе бөлек болуы қажет (пк немесе %).",
		invalidInlineStyle	: "Ішкі жол мәнері үшін көрсетілген мән бір немесе бірнеше \"name : value\", пішімді мәндер жолақтарынан тұруы қажет.",
		cssLengthTooltip	: "Мән үшін санды пикселдер немесе жарамды CSS бірліктеріндегі сандармен енгізіңіз (пк, %, дюйм, см, мм, ем, ex, пт немесе шт).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, қолжетімсіз</span>"
	},

	contextmenu :
	{
		options : "Мәтінмәндік мәзір параметрлері"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Арнайы таңба енгізу",
		title		: "Арнайы таңба",
		options : "Арнайы таңба параметрлері"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL мекенжайы сілтемесі",
		other 		: "<басқа>",
		menu		: "Сілтемені өңдеу",
		title		: "Сілтеме",
		info		: "Сілтеме мәліметі",
		target		: "Мақсат",
		upload		: "Жүктеп салу:",
		advanced	: "Кеңейтілген",
		type		: "Сілтеме түрі:",
		toUrl		: "URL мекенжайы",
		toAnchor	: "Мәтіндегі бетбелгімен байланыстыру",
		toEmail		: "Электрондық пошта",
		targetFrame	: "<фрейм>",
		targetPopup	: "<қалқымалы терезе>",
		targetFrameName	: "Мақсатты жиек аты:",
		targetPopupName	: "Қалқымалы терезе атауы:",
		popupFeatures	: "Қалқымалы терезе мүмкіндіктері:",
		popupResizable	: "Өлшемі өзгереді",
		popupStatusBar	: "Күйі жолағы",
		popupLocationBar	: "Орын жолағы",
		popupToolbar	: "Құралдар тақтасы",
		popupMenuBar	: "Мәзір жолағы",
		popupFullScreen	: "Толық экран (IE)",
		popupScrollBars	: "Жылжыту жолдары",
		popupDependent	: "Тәуелді (Netscape)",
		popupLeft		: "Сол жағы",
		popupTop		: "Үстіңгі орын",
		id				: "ID:",
		langDir			: "Тіл бағыты:",
		langDirLTR		: "Солдан оңға",
		langDirRTL		: "Оңнан солға",
		acccessKey		: "Рұқсат кілті:",
		name			: "Аты:",
		langCode		: "Тіл коды:",
		tabIndex		: "Қойында индексі:",
		advisoryTitle	: "Кеңес тақырыбы:",
		advisoryContentType	: "Кеңес мазмұнының түрі:",
		cssClasses		: "Мәнерлер кестесінің класстары:",
		charset			: "Байланысқан ресурстың таңбалар жиынтығы:",
		styles			: "Мәнер:",
		rel			: "Қарым-қатынас",
		selectAnchor	: "Бетбелгі таңдау",
		anchorName		: "Бетбелгі аты бойынша",
		anchorId		: "Элемент ID коды бойынша",
		emailAddress	: "Электрондық пошта мекенжайы",
		emailSubject	: "Хабар тақырыбы",
		emailBody		: "Хабардың негізгі бөлігі",
		noAnchors		: "Құжатта қолжетімді бетбелгілер жоқ. Құралдар тақтасында 'Құжат бетбелгісін қою' белгішесін жаңасын қосу үшін басыңыз.",
		noUrl			: "Сілтеме URL мекенжайын жазыңыз",
		noEmail			: "Электрондық пошта мекенжайын жазыңыз"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Құжат бетбелгісін қою",
		menu		: "Құжат бетбелгісін өңдеу",
		title		: "Құжат бетбелгісі",
		name		: "Аты:",
		errorName	: "Құжат бетбелгісі үшін атау енгізіңіз",
		remove		: "Құжат бетбелгісін жою"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Нөмірленген тізім сипаттары",
		bulletedTitle		: "Таңбалауышты тізім сипаттары",
		type				: "Тізім мәнері:",
		start				: "Басталу:",
		validateStartNumber				:"Тізімнің басталу саны бүтін сан болуы керек.",
		circle				: "Шеңбер",
		disc				: "Диск",
		square				: "Шаршы",
		none				: "Ешбір",
		notset				: "<орнатылмаған>",
		armenian			: "Армения сан",
		georgian			: "Грузиндік сан (ан, бан, ган және т.б.)",
		lowerRoman			: "Кіші әріпті римдік (i, ii, iii, iv, v және т.б.)",
		upperRoman			: "Бас әріпті римдік (I, II, III, IV, V және т.б.)",
		lowerAlpha			: "Кіші әріпті альфа (a, b, c, d, e және т.б.)",
		upperAlpha			: "Бас әріпті альфа (A, B, C, D, E және т.б.)",
		lowerGreek			: "Кіші әріпті грек (альфа, бета, гамма және т.б.)",
		decimal				: "Ондық сан (1, 2, 3 және т.б.)",
		decimalLeadingZero	: "Оөлден басталатын ондық сан (01, 02, 03 және т.б.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Табу және ауыстыру",
		find				: "Табу",
		replace				: "Ауыстыру",
		findWhat			: "Табу:",
		replaceWith			: "Келесімен ауыстыру:",
		notFoundMsg			: "Көрсетілген мәтін табылмады.",
		findOptions			: "Табу опциялары",
		matchCase			: "Үлкен-кішілігін ескеріп",
		matchWord			: "Толық сөзді сәйкестендіру",
		matchCyclic			: "Кезеңді түрде сәйкестендіру",
		replaceAll			: "Барлығын ауыстыру",
		replaceSuccessMsg	: "%1 сәйкестік ауыстырылды."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Кесте кірістіру",
		title		: "Кесте",
		menu		: "Кесте сипаттары",
		deleteTable	: "Кестені жою",
		rows		: "Жолдар:",
		columns		: "Бағандар:",
		border		: "Жиек өлшемі:",
		widthPx		: "нүктелер",
		widthPc		: "пайыз",
		widthUnit	: "Ен бірлігі:",
		cellSpace	: "Ұяшықтар аралығы:",
		cellPad		: "Ұяшықтар өрісі:",
		caption		: "Тақырып:",
		summary		: "Қорытынды:",
		headers		: "Үстіңгі деректеме:",
		headersNone		: "Ешбір",
		headersColumn	: "Бірінші баған",
		headersRow		: "Бірінші жол",
		headersBoth		: "Екеуі",
		invalidRows		: "Нөлден жоғары бүтін сан болуы қажет жолдар саны.",
		invalidCols		: "Нөлден жоғары бүтін сан болуы қажет бағандар саны.",
		invalidBorder	: "Жиек өлшемі оң мән болуы қажет.",
		invalidWidth	: "Кесте ені оң мән болуы қажет.",
		invalidHeight	: "Кесте биіктігі оң сан болуы қажет.",
		invalidCellSpacing	: "Ұяшық орны оң сан болуы қажет.",
		invalidCellPadding	: "Ұяшықтар өрісі оң сан болуы қажет.",

		cell :
		{
			menu			: "Ұяшық",
			insertBefore	: "Ұяшықты алдына кірістіру",
			insertAfter		: "Ұяшықты артына кірістіру",
			deleteCell		: "Ұяшықтарды жою",
			merge			: "Ұяшықтарды біріктіру",
			mergeRight		: "Оң жақтағымен біріктіру",
			mergeDown		: "Төменгі жақтағымен біріктіру",
			splitHorizontal	: "Ұяшықты көлденеңінен бөлу",
			splitVertical	: "Ұяшықты тігінен бөлу",
			title			: "Ұяшық сипаттары",
			cellType		: "Ұяшық түрі:",
			rowSpan			: "Жолдар аралығы:",
			colSpan			: "Бағандар аралығы:",
			wordWrap		: "Сөздерді тасымалдау:",
			hAlign			: "Көлденеңінен туралау:",
			vAlign			: "Тігінен туралау:",
			alignBaseline	: "Тірек бағыттауыш",
			bgColor			: "Өң түсі:",
			borderColor		: "Жиек түсі:",
			data			: "Деректер",
			header			: "Үстіңгі деректеме",
			yes				: "Иә",
			no				: "Жоқ",
			invalidWidth	: "Ұяшық ені оң сан болуы қажет.",
			invalidHeight	: "Ұяшық саны оң сан болуы қажет.",
			invalidRowSpan	: "Жолдар аралығы оң бүтін сан болуы қажет.",
			invalidColSpan	: "Бағандар аралығы оң бүтін сан болуы қажет.",
			chooseColor 	: "Қосымша түстер..."
		},

		row :
		{
			menu			: "Жол",
			insertBefore	: "Жолды алдына кірістіру",
			insertAfter		: "Жолды артына кірістіру",
			deleteRow		: "Жолдарды жою"
		},

		column :
		{
			menu			: "Баған",
			insertBefore	: "Бағанды алдына кірістіру",
			insertAfter		: "Бағанды артына кірістіру",
			deleteColumn	: "Бағандарды жою"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Түймешік сипаттары",
		text		: "Мәтін (мән):",
		type		: "Түр:",
		typeBtn		: "Түймешік",
		typeSbm		: "Жіберу",
		typeRst		: "Ысыру"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Құсбелгі сипаттары",
		radioTitle	: "Радио түймешігінің сипаттары",
		value		: "Мәні:",
		selected	: "Бөлектелген"
	},

	// Form Dialog.
	form :
	{
		title		: "Пішін кірістіру",
		menu		: "Форма сипаттары",
		action		: "Әрекет:",
		method		: "Әдіс:",
		encoding	: "Кодтау:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Өріс сипаттарын таңдау",
		selectInfo	: "Ақпарат таңдау",
		opAvail		: "Қолжетімді параметрлер",
		value		: "Мәні:",
		size		: "Өлшемі:",
		lines		: "жолдар",
		chkMulti	: "Бірнешеуін таңдауға мүмкіндік беру",
		opText		: "Мәтін:",
		opValue		: "Мәні:",
		btnAdd		: "Қосу",
		btnModify	: "Өзгерту",
		btnUp		: "Жоғары",
		btnDown		: "Төмен",
		btnSetValue : "Бөлектелген мән ретінде орнату",
		btnDelete	: "Жою"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Мәтін аумағы сипаттары",
		cols		: "Бағандар:",
		rows		: "Жолдар:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Мәтін өрісі сипаттары",
		name		: "Аты:",
		value		: "Мәні:",
		charWidth	: "Таңба ені:",
		maxChars	: "Ең көп таңбалар саны:",
		type		: "Түр:",
		typeText	: "Мәтін",
		typePass	: "Құпия сөз"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Жасырын өріс сипаттары",
		name	: "Аты:",
		value	: "Мәні:"
	},

	// Image Dialog.
	image :
	{
		title		: "Кескін",
		titleButton	: "Сурет түймешігінің сипаттары",
		menu		: "Сурет сипаттары",
		infoTab	: "Сурет туралы ақпарат",
		btnUpload	: "Кескінді жүктеп салу",
		upload	: "Жүктеп салу",
		alt		: "Балама мәтін:",
		lockRatio	: "Коэффициентті құлыптау",
		resetSize	: "Өлшемді қайта орнату",
		border	: "Жиек:",
		hSpace	: "Көлденең орын:",
		vSpace	: "Тік орын:",
		alertUrl	: "Сурет URL мекенжайын жазыңыз",
		linkTab	: "Сілтеме",
		button2Img	: "Бөлектелген сурет түймешігін қарапайым суретке айналдыру керек пе?",
		img2Button	: "Бөлектелген суретті сурет түймешігіне айналдыру керек пе?",
		urlMissing : "Сурет көзінің URL мекенжайы жоқ.",
		validateBorder : "Жиек оң бүтін сан болуы қажет.",
		validateHSpace : "Көлденең аралығы оң бүтін сан болуы қажет.",
		validateVSpace : "Тік аралығы оң бүтін сан болуы қажет."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Флеш бейне сипаттары",
		propertiesTab	: "Сипаттар",
		title		: "Флеш",
		chkPlay		: "Автоойнату",
		chkLoop		: "Тұйықталу",
		chkMenu		: "Флеш мәзірді іске қосу",
		chkFull		: "Экранды толық ашуға рұқсат беру",
 		scale		: "Шкала:",
		scaleAll		: "Барлығын көрсету",
		scaleNoBorder	: "Жиек жоқ",
		scaleFit		: "Дәл бекіту",
		access			: "Сценарий рұқсаты:",
		accessAlways	: "Әрқашан",
		accessSameDomain	: "Бірдей домен",
		accessNever	: "Ешқашан",
		alignAbsBottom: "Abs төменгі жағы",
		alignAbsMiddle: "Abs ортасы",
		alignBaseline	: "Тірек бағыттауыш",
		alignTextTop	: "Мәтіннің жоғарғы жағы",
		quality		: "Сапасы:",
		qualityBest	: "Ең жақсы",
		qualityHigh	: "Жоғары",
		qualityAutoHigh	: "Авто жоғары",
		qualityMedium	: "Орташа",
		qualityAutoLow	: "Авто төмен",
		qualityLow	: "Төмен",
		windowModeWindow	: "Терезе",
		windowModeOpaque	: "Мөлдір емес",
		windowModeTransparent	: "Мөлдір",
		windowMode	: "Терезе күйі:",
		flashvars	: "Айнымалы мәндер:",
		bgcolor	: "Өң түсі:",
		hSpace	: "Көлденең орын:",
		vSpace	: "Тік орын:",
		validateSrc : "URL мекенжайының орны бос болмауы керек.",
		validateHSpace : "Көлденең аралығы оң бүтін сан болуы қажет.",
		validateVSpace : "Тік аралығы оң бүтін сан болуы қажет."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Емлені тексеру",
		title			: "Емлені тексеру",
		notAvailable	: "Кешіріңіз, бірақ қызмет қазір қолжетімді емес.",
		errorLoading	: "Бағдарламалық қызмет хостын жүктеу мүмкін емес: %s.",
		notInDic		: "Сөздікте жоқ",
		changeTo		: "Келесіге өзгерту",
		btnIgnore		: "Елемеу",
		btnIgnoreAll	: "Барлығын елемеу",
		btnReplace		: "Ауыстыру",
		btnReplaceAll	: "Барлығын ауыстыру",
		btnUndo			: "Болдырмау",
		noSuggestions	: "- Ұсыныс жоқ -",
		progress		: "Емле қатесі тексерілуде...",
		noMispell		: "Емле қатесі тексерілді: қате табылмады",
		noChanges		: "Еемле қатесі тексерілді: еш сөз өзгертілмеді",
		oneChange		: "Емле қатесі тексерілді: бір сөз өзгертілді",
		manyChanges		: "Есмле қатесі тексерілді: %1 сөз өзгертілді",
		ieSpellDownload	: "Емле қатесін тексергіш орнатылмаған. Оны қазір жүктеп алу керек пе?"
	},

	smiley :
	{
		toolbar	: "Эмограмма енгізу",
		title	: "Көңіл-күй таңбалары",
		options : "Көңіл-күй таңбалары параметрлері"
	},

	elementsPath :
	{
		eleLabel : "Элементтер жолы",
		eleTitle : "%1 элемент"
	},

	numberedlist : "Нөмірленген тізім",
	bulletedlist : "Таңбаланған тізім",
	indent : "Жол шегінісін көбейту",
	outdent : "Жол шегінісін азайту",

	justify :
	{
		left : "Сол жақ бойынша туралау",
		center : "Ортасы бойынша туралау",
		right : "Оң жақ бойынша туралау",
		block : "Ені бойынша тегісте"
	},

	blockquote : "Blockquote",

	clipboard :
	{
		title		: "Қою",
		cutError	: "Шолғыштың қауіпсіздік параметрлері автоматты түрде қиып алудың алдын алады. Оның орнына пернетақтадағы Ctrl+X пернелер тіркесімін пайдаланыңыз.",
		copyError	: "Шолғыштың қауіпсіздік параметрлері автоматты түрде көшірудің алдын алады. Оның орнына пернетақтадағы Ctrl+C пернелер тіркесімін пайдаланыңыз.",
		pasteMsg	: "Төменге қою үшін, Ctrl+V (MAC жүйесінде Cmd+V) пернелер тіркесімін басыңыз.",
		securityMsg	: "Шолғыштың қауіпсіздік параметрі аралық сақтағыштан тікелей қою мүмкіндігіне тыйым салады.",
		pasteArea	: "Қою аймағы"
	},

	pastefromword :
	{
		confirmCleanup	: "Қойғыңыз келген мәтін Word бағдарламасынан көшірілген сияқты. Қою алдында оны тазалау керек пе?",
		toolbar			: "Арнайы қою",
		title			: "Арнайы қою",
		error			: "Ішкі қатеге байланысты қойылған деректерді тазалау мүмкін болмады"
	},

	pasteText :
	{
		button	: "Қарапайым мәтін ретінде қою",
		title	: "Қарапайым мәтін ретінде қою"
	},

	templates :
	{
		button 			: "Үлгілер",
		title : "Мазмұн үлгілері",
		options : "Үлгі параметрлері",
		insertOption: "Нақты мазмұндарлы орналастыру",
		selectPromptMsg: "Өңдегіште ашылатын үлгіні таңдау",
		emptyListMsg : "(Еш үлгі анықталмады)"
	},

	showBlocks : "Құрсауларды көрсету",

	stylesCombo :
	{
		label		: "Мәнерлер",
		panelTitle 	: "Мәнерлер",
		panelTitle1	: "Мәнерлерді құлыптау",
		panelTitle2	: "Кірістірілген мәнерлер",
		panelTitle3	: "Нысан мәнерлері"
	},

	format :
	{
		label		: "Пішім",
		panelTitle	: "Еже пішімі",

		tag_p		: "Қалыпты",
		tag_pre		: "Пішімделген",
		tag_address	: "мекенжайы",
		tag_h1		: "1-тақырып",
		tag_h2		: "2-тақырып",
		tag_h3		: "3-тақырып",
		tag_h4		: "4-тақырып",
		tag_h5		: "5-тақырып",
		tag_h6		: "6-тақырып",
		tag_div		: "Қалыпты (DIV)"
	},

	div :
	{
		title				: "Div контейнерін жасау",
		toolbar				: "Div контейнерін жасау",
		cssClassInputLabel	: "Мәнерлер кестелері түрлері",
		styleSelectLabel	: "Мәнер",
		IdInputLabel		: "ID коды",
		languageCodeInputLabel	: " Тәл коды",
		inlineStyleInputLabel	: "Кірістірілген мәнер",
		advisoryTitleInputLabel	: "Кеңес тақырыбы",
		langDirLabel		: "Тіл бағыты",
		langDirLTRLabel		: "Солдан оңға (LTR)",
		langDirRTLLabel		: "Оңнан солға (RTL)",
		edit				: "Div өңдеу",
		remove				: "Div жою"
  	},

	iframe :
	{
		title		: "IFrame сипаттары",
		toolbar		: "IFrame қою",
		noUrl		: "iframe URL-мекенжайын енгізіңіз",
		scrolling	: "Айналдыру тақталарын қосу",
		border		: "Жақтау жиегін көрсету"
	},

	font :
	{
		label		: "Қаріп",
		voiceLabel	: "Қаріп",
		panelTitle	: "Қаріп атауы"
	},

	fontSize :
	{
		label		: "Өлшемі",
		voiceLabel	: "Қаріп өлшемі",
		panelTitle	: "Қаріп өлшемі"
	},

	colorButton :
	{
		textColorTitle	: "Мәтін түсі",
		bgColorTitle	: "Өң түсі",
		panelTitle		: "Түстер",
		auto			: "Автоматты",
		more			: "Қосымша түстер..."
	},

	colors :
	{
		"000" : "Қара",
		"800000" : "Қою қызыл",
		"8B4513" : "Қою қоңыр",
		"2F4F4F" : "Қара сұр",
		"008080" : "Жасыл-көк",
		"000080" : "Қара-көк",
		"4B0082" : "Индиго",
		"696969" : "Қара-сұр",
		"B22222" : "Сары кірпіш түсті",
		"A52A2A" : "Қоңыр",
		"DAA520" : "Алтын түсті",
		"006400" : "Қою жасыл",
		"40E0D0" : "Фируза",
		"0000CD" : "Орташа көк",
		"800080" : "Күлгін",
		"808080" : "Сұр",
		"F00" : "Қызыл",
		"FF8C00" : "Қою қызғылт-сары",
		"FFD700" : "Сары түсті",
		"008000" : "Жасыл",
		"0FF" : "Көгілдір",
		"00F" : "Көк",
		"EE82EE" : "Күлгін",
		"A9A9A9" : "Бұлыңғыр сұр",
		"FFA07A" : "Ашық сары-қызғылт",
		"FFA500" : "Қызғылт сары",
		"FFFF00" : "Сары",
		"00FF00" : "Ашық жасыл",
		"AFEEEE" : "Бозғылт көк",
		"ADD8E6" : "Ашық көк",
		"DDA0DD" : "Алхоры түсті",
		"D3D3D3" : "Ақшыл сұр",
		"FFF0F5" : "Бозғылт күлгін",
		"FAEBD7" : "Ақшыл сұр",
		"FFFFE0" : "Ашық сары",
		"F0FFF0" : "Балды шық түсті",
		"F0FFFF" : "Көкшіл",
		"F0F8FF" : "Сұрғылт көк",
		"E6E6FA" : "Ақшыл күлгін",
		"FFF" : "Ақ"
	},

	scayt :
	{
		title			: "Жазған кезде емле қатесін тексеру",
		opera_title		: "Opera шолғышында қолдау көрсетілмейді",
		enable			: "SCAYT мүмкіндігін іске қосу",
		disable			: "SCAYT мүмкіндігін ажырату",
		about			: "SCAYT туралы",
		toggle			: "SCAYT мүмкіндігін ажырата қосу",
		options			: "Параметрлер",
		langs			: "Тілдер",
		moreSuggestions	: "Қосымша ұсыныстар",
		ignore			: "Елемеу",
		ignoreAll		: "Барлығын елемеу",
		addWord			: "Сөз қосу",
		emptyDic		: "Сөздік аты бос болмау керек.",

		optionsTab		: "Параметрлер",
		allCaps			: "Барлығын Өткізіп жіберу-Caps сөздер",
		ignoreDomainNames : "Домен аттарын Өткізіп жіберу",
		mixedCase		: "Үлкен-кішілігі аралас сөздерді Өткізіп жіберу",
		mixedWithDigits	: "Сандары бар сөздерді Өткізіп жіберу",

		languagesTab	: "Тілдер",

		dictionariesTab	: "Сөздіктер",
		dic_field_name	: "Сөздік аты",
		dic_create		: "Жасау",
		dic_restore		: "Қалпына келтіру",
		dic_delete		: "Жою",
		dic_rename		: "Атын өзгерту",
		dic_info		: "Бастапқыда пайдаланушы сөздігі Cookie файлында сақталады. Дегенмен, cookie файлдарының өлшемдері шектелген. Пайдаланушы сөздігі cookie файлына сақталмайтындай деңгейге үлкейгенде, сөздікті біздің серверге сақтауға болады. Жеке сөздікті біздің серверге сақтау үшін, сөздіктің атын көрсету керек. Егер бұрын сақталған сөздік болса, оның атын жазып, Қалпына келтіру түймешігін басыңыз.",

		aboutTab		: "Туралы"
	},

	about :
	{
		title		: "CKEditor туралы",
		dlgTitle	: "CKEditor туралы",
		help	: "Көмек үшін $1 тексеріңіз.",
		userGuide : "CKEditor пайдаланушы нұсқаулығы",
		moreInfo	: "Лицензиялау туралв ақпаратты біздің тораптан көріңіз:",
		copy		: "Авторлық құқық &copy; $1. Барлық құқықтары қорғалған."
	},

	maximize : "Ұлғайту",
	minimize : "Кішірейту",

	fakeobjects :
	{
		anchor	: "Бетбелгі",
		flash	: "Флеш анимация",
		iframe		: "IFrame",
		hiddenfield	: "Жасырын өріс",
		unknown	: "Белгісіз нысан"
	},

	resize : "Өлшемін өзгерту үшін апару",

	colordialog :
	{
		title		: "Түс таңдау",
		options	:	"Түс параметрлері",
		highlight	: "Ерекшелеу",
		selected	: "Таңдалған түс",
		clear		: "Тазалау"
	},

	toolbarCollapse	: "Құралдар тақтасын тасалау",
	toolbarExpand	: "Құралдар тақтасын шығарып алу",

	toolbarGroups :
	{
		document : "Құжат",
		clipboard : "Аралық сақтағыш/Болдырмау",
		editing : "Өңдеу",
		forms : "Пішімдер",
		basicstyles : "Негізгі мәнерлер",
		paragraph : "Еже",
		links : "Сілтемелер",
		insert : "Кірістіру",
		styles : "Мәнерлер",
		colors : "Түстер",
		tools : "Құралдар"
	},

	bidi :
	{
		ltr : "Солдан оңға қарайғы мәтін бағыты",
		rtl : "Оңнан солға қарайғы мәтін бағыты"
	},

	docprops :
	{
		label : "Құжат сипаттары",
		title : "Құжат сипаттары",
		design : "Жоба",
		meta : "Мета тегтер",
		chooseColor : "Таңдау",
		other : "Басқа...",
		docTitle :	"Бет тақырыбы",
		charset : 	"Таңбалар жинағын шифрлау",
		charsetOther : "Басқа таңбалар жинағын шифрлау",
		charsetASCII : "ASCII",
		charsetCE : "Орталық Еуропалық",
		charsetCT : "Дәстүрлі Қытай (Big5)",
		charsetCR : "Кириллица",
		charsetGR : "Грек",
		charsetJP : "Жапон",
		charsetKR : "Корей",
		charsetTR : "Түрік",
		charsetUN : "Юникод (UTF-8)",
		charsetWE : "Шығыс Еуропалық",
		docType : "Құжат түрінің тақырыбы",
		docTypeOther : "Басқа құжат түрінің тақырыбы",
		xhtmlDec : "XHTML декларацияларын қосу",
		bgColor : "Өң түсі",
		bgImage : "Өң кескіні URL",
		bgFixed : "Айналдырылмайтын (Бекітілген) өң",
		txtColor : "Мәтін түсі",
		margin : "Бет жолдары",
		marginTop : "Үстіңгі",
		marginLeft : "Сол жақ",
		marginRight : "Оң жақ",
		marginBottom : "Төменгі жағы",
		metaKeywords : "Құжат индекстеуінің кілт сөздері (үтірмен бөлектелген)",
		metaDescription : "Құжат сипаттамасы",
		metaAuthor : "Автор",
		metaCopyright : "Авторлық құқық",
		previewHtml : "<p>Бұл кейбір <strong>мысалы мәтіні</strong>. <a href=\"javascript:void(0)\">CKEditor</a> пайдаланудасыз.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "дюймдер",
			widthCm	: "сантиметрлер",
			widthMm	: "милиметрлер",
			widthEm	: "ем",
			widthEx	: "ex",
			widthPt	: "нүктелер",
			widthPc	: "шыңдар",
			required : "Қажет етіледі"
		},
		table :
		{
			createTable : 'Кесте кірістіру',
			heightUnit	: "Биіктік бірлігі:",
			insertMultipleRows : "Жолдар қою",
			insertMultipleCols : "Бағандар қою",
			noOfRows : "Жолдар саны:",
			noOfCols : "Бағандар саны:",
			insertPosition : "Орны:",
			insertBefore : "Бұрын",
			insertAfter : "Кейін",
			selectTable : "Кестені таңдау",
			selectRow : "Жол таңдау",
			columnTitle : "Баған ені",
			colProps : "Баған сипаттары",
			invalidColumnWidth	: "Баған ені оң сан болуы қажет.",
			fixedColWidths : "Бекітілген баған ендері"
		},
		cell :
		{
			title : "Ұяшық"
		},
		colordialog :
		{
			currentColor	: "Ағымдағы түс"
		},
		emoticon :
		{
			angel		: "Періште",
			angry		: "Ашулы",
			cool		: "Тамаша",
			crying		: "Жылау",
			eyebrow		: "Қас",
			frown		: "Қабағын түю",
			goofy		: "Ақымақ",
			grin		: "Тіс қайрау",
			half		: "Жарты",
			idea		: "Ой",
			laughing	: "Күлу",
			laughroll	: "Күлкіден аунау",
			no			: "Жоқ",
			oops		: "Өй",
			shy			: "Ұялшақ",
			smile		: "Жымию",
			tongue		: "Тіл",
			wink		: "Көз қысу",
			yes			: "Иә"
		},

		menu :
		{
			link	: "Сілтеме кірістіру",
			list	: "Тізім",
			paste	: "Қою",
			action	: "Әрекет",
			align	: "Туралау",
			emoticon: "Көңіл-күй таңбасы"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Нөмірленген тізім",
			bulletedTitle		: "Таңбаланған тізім",
			description			: "Ағымдағы тізім деңгейіне арналған параметрлер пайда болады",
			fontsize			: "Қаріп өлшемі:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Сипаттамалы бетбелгі атауын теріңіз, '1.2 бөлімі' сияқты. Бетбелгіні қойғаннан кейін, 'Сілтеме' немесе 'Құжат бетбелгісінің сілтемесі' белгішесін оған байланысу үшін басыңыз.",
			title		: "Құжат бетбелгсінің сілтемесі",
			linkTo		: "Келесіге сілтеме:"
		},

		urllink :
		{
			title : "URL мекенжайы сілтемесі",
			linkText : "Сілтеме мәтіні:",
			selectAnchor: "Байлам таңдау:",
			nourl: "Мәтін өрісіне URL мекенжайын енгізіңіз.",
			urlhelp: "Пайдаланушылар осы сілтемені нұқыған кезде ашылатын URL мекенжайын жазыңыз немесе қойыңыз, мысалы http://www.example.com.",
			displaytxthelp: "Сілтемені көрсету мәтінін жазыңыз.",
			openinnew : "Сілтемені жаңа терезеде ашу"
		},

		spellchecker :
		{
			title : "Емлені тексеру",
			replace : "Ауыстыру:",
			suggesstion : "Ұсыныстар:",
			withLabel : "Келесімен:",
			replaceButton : "Ауыстыру",
			replaceallButton:"Барлығын ауыстыру",
			skipButton:"Өткізіп жіберу",
			skipallButton: "Барлығын өткізіп жіберу",
			undochanges: "Өзгерістерді болдырмау",
			complete: "Емлені тексеру аяқталды",
			problem: "XML деректерді шығарып алу мүмкін емес",
			addDictionary: "Сөздікке қосу",
			editDictionary: "Сөздікті өңдеу"
		},

		status :
		{
			keystrokeForHelp: "Анықтама алу үшін, ALT 0 пернелер тіркесімін басыңыз"
		},

		linkdialog :
		{
			label : "Сілтеме тілқатысу терезесі"
		},

		imagedatauri :
		{
			error : "Қазір кескінді қоюға қолдау көрсетілмейді. Құралдар тақтасының опциясының орнына \'Insert Image\' пайдаланыңыз."
		},

		image :
		{
			previewText : "Мәтін осы мысалдағыдай қосылудағы суреттің айналасында болады.",
			fileUpload : "Кескін файлын компьютеріңізден таңдаңыз:"
		}
	}

};