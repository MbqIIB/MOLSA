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

CKEDITOR.lang["ru"] =
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
	editorTitle : "Редактор RTF, %1, нажмите ALT 0 для просмотра справки.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Панели инструментов редактора",
	editor	: "Редактор RTE",

	// Toolbar buttons without dialogs.
	source			: "Источник",
	newPage			: "Создать страницу",
	save			: "Сохранить",
	preview			: "Предварительный просмотр:",
	cut				: "Вырезать",
	copy			: "Копировать",
	paste			: "Вставить",
	print			: "Печать",
	underline		: "Подчеркивание",
	bold			: "Полужирный",
	italic			: "Курсив",
	selectAll		: "Выбрать все",
	removeFormat	: "Удалить формат",
	strike			: "Перечеркивание",
	subscript		: "Нижний индекс",
	superscript		: "Верхний индекс",
	horizontalrule	: "Вставить горизонтальную линию",
	pagebreak		: "Вставить разрыв страницы",
	pagebreakAlt		: "Разделитель страниц",
	unlink			: "Удалить ссылку",
	undo			: "Отменить",
	redo			: "Повторить",

	// Common messages and labels.
	common :
	{
		browseServer	: "Сервер браузера:",
		url				: "URL:",
		protocol		: "Протокол:",
		upload			: "Передать:",
		uploadSubmit	: "Отправить на сервер",
		image			: "Вставить изображение",
		flash			: "Вставить ролик Flash",
		form			: "Вставить форму",
		checkbox		: "Вставить переключатель",
		radio			: "Вставить переключатель для выбора одного элемента",
		textField		: "Вставить текстовое поле",
		textarea		: "Вставить область текста",
		hiddenField		: "Вставить скрытое поле",
		button			: "Вставить кнопку",
		select			: "Вставить поле выбора",
		imageButton		: "Вставить кнопку с рисунком",
		notSet			: "<не задано>",
		id				: "ИД:",
		name			: "Имя:",
		langDir			: "Направление:",
		langDirLtr		: "Слева направо",
		langDirRtl		: "Справа налево",
		langCode		: "Код языка:",
		longDescr		: "URL длинного описания:",
		cssClass		: "Классы таблицы стилей:",
		advisoryTitle	: "Название совета:",
		cssStyle		: "Стиль:",
		ok				: "OK",
		cancel			: "Отмена",
		close : "Закрыть",
		preview			: "Предварительный просмотр:",
		generalTab		: "Общие",
		advancedTab		: "Дополнительно",
		validateNumberFailed	: "Это значение не является числом.",
		confirmNewPage	: "Все несохраненные изменения в документе будут утеряны. Вы действительно хотите загрузить новую страницу?",
		confirmCancel	: "Некоторые параметры были изменены. Вы действительно хотите закрыть окно?",
		options : "Опции",
		target			: "Целевой объект:",
		targetNew		: "Новое окно (_blank)",
		targetTop		: "Самое верхнее окно (_top)",
		targetSelf		: "То же окне (_self)",
		targetParent	: "Родительское окно (_parent)",
		langDirLTR		: "Слева направо",
		langDirRTL		: "Справа налево",
		styles			: "Стиль:",
		cssClasses		: "Классы таблиц стилей:",
		width			: "Ширина:",
		height			: "Высота:",
		align			: "Выровнять:",
		alignLeft		: "По левому краю",
		alignRight		: "По правому краю",
		alignCenter		: "По центру",
		alignTop		: "Вверх",
		alignMiddle		: "Посередине",
		alignBottom		: "По нижнему краю",
		invalidHeight	: "Значение высоты должно быть положительным целым числом.",
		invalidWidth	: "Значение ширины должно быть положительным целым числом.",
		invalidCssLength	: "Значение, указанное для поля '%1', должно быть положительным числом с верной единицей измерения CSS (px, %, in, cm, mm, em, ex, pt или pc) или без нее.",
		invalidHtmlLength	: "Значение, указанное для поля '%1', должно быть положительным числом с верной единицей измерения HTML (px или %).",
		invalidInlineStyle	: "Значение, указанное для локального стиля, должно состоять из одного или нескольких кортежей в формате \"имя : значение\", разделенных точкой с запятой.",
		cssLengthTooltip	: "Введите число для значения в пикселах или число с верной единицей CSS (px, %, in, cm, mm, em, ex, pt или pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, недоступно</span>"
	},

	contextmenu :
	{
		options : "Параметры контекстного меню"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Вставить специальный символ",
		title		: "Специальный символ",
		options : "Параметры специальных символов"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Ссылка URL",
		other 		: "<прочее>",
		menu		: "Изменить ссылку",
		title		: "Ссылка",
		info		: "Информация о ссылке",
		target		: "Целевой объект",
		upload		: "Передать:",
		advanced	: "Дополнительно",
		type		: "Тип ссылки:",
		toUrl		: "URL",
		toAnchor	: "Ссылка на метку в тексте",
		toEmail		: "Электронная почта",
		targetFrame	: "<фрейм>",
		targetPopup	: "<всплывающее окно>",
		targetFrameName	: "Имя целевого фрейма:",
		targetPopupName	: "Имя всплывающего окна:",
		popupFeatures	: "Возможности всплывающего окна:",
		popupResizable	: "Изменяемый размер",
		popupStatusBar	: "Строка состояния",
		popupLocationBar	: "Строка адреса",
		popupToolbar	: "Панель инструментов",
		popupMenuBar	: "Строка меню",
		popupFullScreen	: "Полноэкранный режим (IE)",
		popupScrollBars	: "Полосы прокрутки",
		popupDependent	: "Зависимости (Netscape)",
		popupLeft		: "Расположение слева",
		popupTop		: "Расположение сверху",
		id				: "ИД:",
		langDir			: "Направление:",
		langDirLTR		: "Слева направо",
		langDirRTL		: "Справа налево",
		acccessKey		: "Код доступа:",
		name			: "Имя:",
		langCode		: "Код языка:",
		tabIndex		: "Указатель табуляции:",
		advisoryTitle	: "Название совета:",
		advisoryContentType	: "Тип информационного сообщения:",
		cssClasses		: "Классы таблицы стилей:",
		charset			: "Связанный набор символов ресурсов:",
		styles			: "Стиль:",
		rel			: "Взаимоотношения",
		selectAnchor	: "Выберите метку",
		anchorName		: "По имени метки",
		anchorId		: "По ИД элемента",
		emailAddress	: "Адрес электронной почты",
		emailSubject	: "Тема сообщения",
		emailBody		: "Текст сообщения",
		noAnchors		: "Нет закладок, доступных в документе. Щелкните на значке 'Вставить закладку документа' на панели инструментов для добавления закладки.",
		noUrl			: "Введите URL ссылки",
		noEmail			: "Введите адрес электронной почты"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Вставить закладку документа",
		menu		: "Изменить закладку документа",
		title		: "Закладка документа",
		name		: "Имя:",
		errorName	: "Введите имя для закладки документа",
		remove		: "Удалить закладку документа"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Пронумерованный список свойств",
		bulletedTitle		: "Маркированный список свойств",
		type				: "Стиль списка:",
		start				: "Начало:",
		validateStartNumber				:"Начальный номер списка должен быть целым числом.",
		circle				: "Круг",
		disc				: "Диск",
		square				: "Квадрат",
		none				: "Нет",
		notset				: "<не задано>",
		armenian			: "Армянская нумерация",
		georgian			: "Грузинская нумерация (an, ban, gan, и т.д.)",
		lowerRoman			: "Нижняя римская (i, ii, iii, iv, v, и т.д.)",
		upperRoman			: "Верхняя римская (I, II, III, IV, V, и т.д.)",
		lowerAlpha			: "Нижняя альфа (a, b, c, d, e, и т.д.)",
		upperAlpha			: "Верхняя альфа (A, B, C, D, E, и т.д.)",
		lowerGreek			: "Нижняя греческая (alpha, beta, gamma, и т.д.)",
		decimal				: "Десятичная (1, 2, 3, и т.д.)",
		decimalLeadingZero	: "Десятичная начинающаяся с нуля (01, 02, 03, и т.д.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Найти и заменить",
		find				: "Найти",
		replace				: "Заменить",
		findWhat			: "Найти:",
		replaceWith			: "Заменить на:",
		notFoundMsg			: "Указанный текст не найден.",
		findOptions			: "Найти опции",
		matchCase			: "С учетом регистра",
		matchWord			: "Слово целиком",
		matchCyclic			: "Циклическое совпадение",
		replaceAll			: "Заменить все",
		replaceSuccessMsg	: "Заменено вхождений: %1."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Вставить таблицу",
		title		: "Таблица",
		menu		: "Свойства таблицы",
		deleteTable	: "Удалить таблицу",
		rows		: "Строк:",
		columns		: "Столбцов:",
		border		: "Размер рамки:",
		widthPx		: "пикселов",
		widthPc		: "процентов",
		widthUnit	: "Единица измерения ширины:",
		cellSpace	: "Расстояние между ячейками:",
		cellPad		: "Отступ внутри ячеек:",
		caption		: "Название:",
		summary		: "Краткое описание:",
		headers		: "Заголовки:",
		headersNone		: "Нет",
		headersColumn	: "Первый столбец",
		headersRow		: "Первая строка",
		headersBoth		: "Оба",
		invalidRows		: "Количество строк должно быть целым числом, большим 0.",
		invalidCols		: "Количество столбцов должно быть целым числом, большим 0.",
		invalidBorder	: "Размер рамки должен быть положительным числом.",
		invalidWidth	: "Ширина таблицы должна быть положительным числом.",
		invalidHeight	: "Высота таблицы должна быть положительным числом.",
		invalidCellSpacing	: "Расстояние между ячейками должно быть положительным числом.",
		invalidCellPadding	: "Отступ внутри ячеек должен быть положительным числом.",

		cell :
		{
			menu			: "Ячейка",
			insertBefore	: "Вставить ячейку слева",
			insertAfter		: "Вставить ячейку справа",
			deleteCell		: "Удалить ячейки",
			merge			: "Объединить ячейки",
			mergeRight		: "Объединить с ячейкой справа",
			mergeDown		: "Объединить с ячейкой снизу",
			splitHorizontal	: "Разделить ячейку по горизонтали",
			splitVertical	: "Разделить ячейку по вертикали",
			title			: "Свойства ячейки",
			cellType		: "Тип ячейки:",
			rowSpan			: "Число строк:",
			colSpan			: "Число столбцов:",
			wordWrap		: "Перенос слов:",
			hAlign			: "Выравнивание по горизонтали:",
			vAlign			: "Выравнивание по вертикали:",
			alignBaseline	: "По базовой линии",
			bgColor			: "Цвет фона:",
			borderColor		: "Цвет рамки:",
			data			: "Данные",
			header			: "Заголовок",
			yes				: "Да",
			no				: "Нет",
			invalidWidth	: "Ширина ячейки должна быть положительным числом.",
			invalidHeight	: "Высота ячейки должна быть положительным числом.",
			invalidRowSpan	: "Число строк должно быть целым положительным числом.",
			invalidColSpan	: "Число столбцов должно быть целым положительным числом.",
			chooseColor 	: "Дополнительные цвета..."
		},

		row :
		{
			menu			: "Строка",
			insertBefore	: "Вставить строку сверху",
			insertAfter		: "Вставить строку снизу",
			deleteRow		: "Удалить строки"
		},

		column :
		{
			menu			: "Столбец",
			insertBefore	: "Вставить столбец слева",
			insertAfter		: "Вставить столбец справа",
			deleteColumn	: "Удалить столбцы"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Свойства кнопки",
		text		: "Текст (значение):",
		type		: "Тип:",
		typeBtn		: "Кнопка",
		typeSbm		: "Отправить",
		typeRst		: "Сбросить"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Свойства переключателя",
		radioTitle	: "Свойства переключателя для выбора одного элемента",
		value		: "Значение:",
		selected	: "Выбран"
	},

	// Form Dialog.
	form :
	{
		title		: "Вставить форму",
		menu		: "Свойства формы",
		action		: "Действие:",
		method		: "Метод:",
		encoding	: "Кодировка:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Выбор свойств поля",
		selectInfo	: "Выбрать информацию",
		opAvail		: "Доступные параметры",
		value		: "Значение:",
		size		: "Размер:",
		lines		: "строк",
		chkMulti	: "Разрешить выбор нескольких вариантов",
		opText		: "Текст:",
		opValue		: "Значение:",
		btnAdd		: "Добавить",
		btnModify	: "Изменить",
		btnUp		: "Вверх",
		btnDown		: "Вниз",
		btnSetValue : "Задать как выбранное значение",
		btnDelete	: "Удалить"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Свойства области текста",
		cols		: "Столбцов:",
		rows		: "Строк:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Свойства текстового поля",
		name		: "Имя:",
		value		: "Значение:",
		charWidth	: "Ширина символов:",
		maxChars	: "Максимальное число символов:",
		type		: "Тип:",
		typeText	: "Текст",
		typePass	: "Пароль"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Свойства скрытого поля",
		name	: "Имя:",
		value	: "Значение:"
	},

	// Image Dialog.
	image :
	{
		title		: "Изображение",
		titleButton	: "Свойства кнопки с рисунком",
		menu		: "Свойства изображения",
		infoTab	: "Информация об изображении",
		btnUpload	: "Передать изображение",
		upload	: "Передать",
		alt		: "Альтернативный текст:",
		lockRatio	: "Коэффициент блокировок",
		resetSize	: "Сбросить размер",
		border	: "Рамка:",
		hSpace	: "Интервал по горизонтали:",
		vSpace	: "Интервал по вертикали:",
		alertUrl	: "Введите URL изображения",
		linkTab	: "Ссылка",
		button2Img	: "Преобразовать выбранную кнопку с рисунком в простое изображение?",
		img2Button	: "Преобразовать выбранное изображение в кнопку с рисунком?",
		urlMissing : "Отсутствует URL источника изображения.",
		validateBorder : "Значение рамки должно быть целым положительным числом.",
		validateHSpace : "Интервал по горизонтали должен быть целым положительным числом.",
		validateVSpace : "Интервал по вертикали должен быть целым положительным числом."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Свойства анимации Flash",
		propertiesTab	: "Свойства",
		title		: "Объект Flash",
		chkPlay		: "Автоматическое воспроизведение",
		chkLoop		: "Циклически",
		chkMenu		: "Включить меню Flash",
		chkFull		: "Разрешить полноэкранный режим",
 		scale		: "Масштаб:",
		scaleAll		: "Показать все",
		scaleNoBorder	: "Без рамки",
		scaleFit		: "Точное соответствие",
		access			: "Доступ к сценариям:",
		accessAlways	: "Всегда",
		accessSameDomain	: "Тот же домен",
		accessNever	: "Никогда",
		alignAbsBottom: "По нижней границе",
		alignAbsMiddle: "Точно по центру строки",
		alignBaseline	: "По базовой линии",
		alignTextTop	: "По верхнему краю текста",
		quality		: "Качество:",
		qualityBest	: "Наилучшее",
		qualityHigh	: "Высокий",
		qualityAutoHigh	: "Высокое автоматически",
		qualityMedium	: "Среднее",
		qualityAutoLow	: "Низкое автоматически",
		qualityLow	: "Низкий",
		windowModeWindow	: "Окно",
		windowModeOpaque	: "Непрозрачное",
		windowModeTransparent	: "Прозрачное",
		windowMode	: "Режим окна:",
		flashvars	: "Переменные:",
		bgcolor	: "Цвет фона:",
		hSpace	: "Интервал по горизонтали:",
		vSpace	: "Интервал по вертикали:",
		validateSrc : "URL не должен быть пустым.",
		validateHSpace : "Интервал по горизонтали должен быть целым положительным числом.",
		validateVSpace : "Интервал по вертикали должен быть целым положительным числом."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Проверка орфографии",
		title			: "Проверка орфографии",
		notAvailable	: "В данный момент служба недоступна.",
		errorLoading	: "Ошибка при загрузке хоста службы приложений: %s.",
		notInDic		: "Отсутствует в словаре",
		changeTo		: "Заменить на",
		btnIgnore		: "Пропустить",
		btnIgnoreAll	: "Игнорировать все",
		btnReplace		: "Заменить",
		btnReplaceAll	: "Заменить все",
		btnUndo			: "Отменить",
		noSuggestions	: "- Варианты отсутствуют -",
		progress		: "Выполняется проверка орфографии...",
		noMispell		: "Проверка орфографии завершена: ошибки не найдены",
		noChanges		: "Проверка орфографии завершена: слова не изменены",
		oneChange		: "Проверка орфографии завершена: изменено одно слово",
		manyChanges		: "Проверка орфографии завершена. Изменено слов: %1",
		ieSpellDownload	: "Модуль проверки орфографии не установлен. Загрузить его?"
	},

	smiley :
	{
		toolbar	: "Вставить значок настроения",
		title	: "Значки настроения",
		options : "Параметры значков настроения"
	},

	elementsPath :
	{
		eleLabel : "Путь к элементам",
		eleTitle : "Элемент %1"
	},

	numberedlist : "Нумерованный список",
	bulletedlist : "Ненумерованный список",
	indent : "Увеличить отступ",
	outdent : "Уменьшить отступ",

	justify :
	{
		left : "По левому краю",
		center : "По центру",
		right : "По правому краю",
		block : "Выровнять по ширине"
	},

	blockquote : "Блок цитат",

	clipboard :
	{
		title		: "Вставить",
		cutError	: "Параметры защиты браузера запрещают применять функцию автоматического вырезания. Воспользуйтесь сочетанием клавиш Ctrl+X.",
		copyError	: "Параметры защиты браузера запрещают применять функцию автоматического копирования. Воспользуйтесь сочетанием клавиш Ctrl+C.",
		pasteMsg	: "Нажмите Ctrl+V (Cmd+V для MAC) для вставки ниже.",
		securityMsg	: "Параметры защиты браузера запрещают вставлять данные напрямую из буфера обмена.",
		pasteArea	: "Область для вставки"
	},

	pastefromword :
	{
		confirmCleanup	: "Текст для вставки, вероятно, скопирован из программы Word. Очистить форматирование перед вставкой?",
		toolbar			: "Специальная вставка",
		title			: "Специальная вставка",
		error			: "Не удалось очистить вставленные данные из-за внутренней ошибки"
	},

	pasteText :
	{
		button	: "Вставить как простой текст",
		title	: "Вставить как простой текст"
	},

	templates :
	{
		button 			: "Шаблоны",
		title : "Шаблоны материалов",
		options : "Параметры шаблона",
		insertOption: "Заменить фактическое содержимое",
		selectPromptMsg: "Выберите шаблон, который необходимо открыть в редакторе",
		emptyListMsg : "(Шаблоны не заданы)"
	},

	showBlocks : "Показать блоки",

	stylesCombo :
	{
		label		: "Стили",
		panelTitle 	: "Стили",
		panelTitle1	: "Стили блоков",
		panelTitle2	: "Локальные стили",
		panelTitle3	: "Стили объектов"
	},

	format :
	{
		label		: "Формат",
		panelTitle	: "Формат абзаца",

		tag_p		: "Обычный",
		tag_pre		: "Форматированное",
		tag_address	: "Адрес",
		tag_h1		: "Заголовок 1",
		tag_h2		: "Заголовок 2",
		tag_h3		: "Заголовок 3",
		tag_h4		: "Заголовок 4",
		tag_h5		: "Заголовок 5",
		tag_h6		: "Заголовок 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Создать контейнер Div",
		toolbar				: "Создать контейнер Div",
		cssClassInputLabel	: "Классы таблицы стилей",
		styleSelectLabel	: "Стиль",
		IdInputLabel		: "ИД",
		languageCodeInputLabel	: " Код языка",
		inlineStyleInputLabel	: "Локальный стиль",
		advisoryTitleInputLabel	: "Информационный заголовок",
		langDirLabel		: "Направление",
		langDirLTRLabel		: "Слева направо",
		langDirRTLLabel		: "Справа налево",
		edit				: "Изменить Div",
		remove				: "Удалить Div"
  	},

	iframe :
	{
		title		: "Свойства IFrame",
		toolbar		: "Вставить IFrame",
		noUrl		: "Введите URL iframe",
		scrolling	: "Включить полосы прокрутки",
		border		: "Показать рамку фрейма"
	},

	font :
	{
		label		: "Шрифт",
		voiceLabel	: "Шрифт",
		panelTitle	: "Название шрифта"
	},

	fontSize :
	{
		label		: "Размер",
		voiceLabel	: "Размер шрифта",
		panelTitle	: "Размер шрифта"
	},

	colorButton :
	{
		textColorTitle	: "Цвет текста",
		bgColorTitle	: "Цвет фона",
		panelTitle		: "Цвета",
		auto			: "Авто",
		more			: "Дополнительные цвета..."
	},

	colors :
	{
		"000" : "Черный",
		"800000" : "Темно-коричневый",
		"8B4513" : "Кожано-коричневый",
		"2F4F4F" : "Темный грифельно-серый",
		"008080" : "Темно-бирюзовый",
		"000080" : "Темно-синий",
		"4B0082" : "Индиго",
		"696969" : "Темно-серый",
		"B22222" : "Кирпичный",
		"A52A2A" : "Коричневый",
		"DAA520" : "Красного золота",
		"006400" : "Темно-зеленый",
		"40E0D0" : "Бирюзовый",
		"0000CD" : "Синий нейтральный",
		"800080" : "Пурпурный",
		"808080" : "Серый",
		"F00" : "Красный",
		"FF8C00" : "Темно-оранжевый",
		"FFD700" : "Золото",
		"008000" : "Зеленый",
		"0FF" : "Голубой",
		"00F" : "Синий",
		"EE82EE" : "Фиолетовый",
		"A9A9A9" : "Грязно-серый",
		"FFA07A" : "Светлый оранжево-розовый",
		"FFA500" : "Оранжевый",
		"FFFF00" : "Желтый",
		"00FF00" : "Лайм",
		"AFEEEE" : "Бледно-бирюзовый",
		"ADD8E6" : "Светло-голубой",
		"DDA0DD" : "Слива",
		"D3D3D3" : "Светло-серый",
		"FFF0F5" : "Голубой с красным отливом",
		"FAEBD7" : "Белый-антик",
		"FFFFE0" : "Светло-желтый",
		"F0FFF0" : "Желто-оранжевый",
		"F0FFFF" : "Лазурный",
		"F0F8FF" : "Бледно-голубой",
		"E6E6FA" : "Лаванда",
		"FFF" : "Белый"
	},

	scayt :
	{
		title			: "Автоматически проверять орфографию",
		opera_title		: "Не поддерживается в Opera",
		enable			: "Включить SCAYT",
		disable			: "Отключить SCAYT",
		about			: "О программе SCAYT",
		toggle			: "Переключить режим SCAYT",
		options			: "Опции",
		langs			: "Языки",
		moreSuggestions	: "Другие варианты",
		ignore			: "Пропустить",
		ignoreAll		: "Игнорировать все",
		addWord			: "Добавить слово",
		emptyDic		: "Имя словаря не может быть пустым.",

		optionsTab		: "Опции",
		allCaps			: "Игнорировать регистр слов",
		ignoreDomainNames : "Игнорировать доменные имена",
		mixedCase		: "Игнорировать слова со смешанным регистром",
		mixedWithDigits	: "Игнорировать слова с цифрами",

		languagesTab	: "Языки",

		dictionariesTab	: "Словари",
		dic_field_name	: "Словарное имя",
		dic_create		: "Создать",
		dic_restore		: "Восстановить",
		dic_delete		: "Удалить",
		dic_rename		: "Переименовать",
		dic_info		: "Сначала пользовательский словарь храниться в cookies. Однако Cookies имеет ограниченный размер. Когда пользовательский словарь вырастает до размера, который не помещается в Cookie, его можно сохранить на нашем сервере. Для сохранения вашего персонального словаря на нашем сервере, вам необходимо указать имя для вашего словаря. Если вы уже имеете сохраненный словарь, пожалуйста введите его имя и нажмите кнопку Восстановить.",

		aboutTab		: "О программе"
	},

	about :
	{
		title		: "О программе CKEditor",
		dlgTitle	: "О программе CKEditor",
		help	: "Проверьте $1 для справки.",
		userGuide : "Руководство пользователя CKEditor",
		moreInfo	: "Дополнительная информация о лицензировании приведена на следующем веб-сайте:",
		copy		: "Copyright &copy; $1. Все права защищены."
	},

	maximize : "Развернуть",
	minimize : "Свернуть",

	fakeobjects :
	{
		anchor	: "Метка",
		flash	: "Анимация Flash",
		iframe		: "IFrame",
		hiddenfield	: "Скрытое поле",
		unknown	: "Неизвестный объект"
	},

	resize : "Перетащите для изменения размера",

	colordialog :
	{
		title		: "Выбор цвета",
		options	:	"Свойства цвета",
		highlight	: "Выделить",
		selected	: "Выбранный цвет",
		clear		: "Очистить"
	},

	toolbarCollapse	: "Свернуть панель инструментов",
	toolbarExpand	: "Развернуть панель инструментов",

	toolbarGroups :
	{
		document : "Документ",
		clipboard : "Буфер обмена/Отменить",
		editing : "Правка",
		forms : "Формы",
		basicstyles : "Основные стили",
		paragraph : "Абзац",
		links : "Ссылки",
		insert : "Вставить",
		styles : "Стили",
		colors : "Цвета",
		tools : "Сервис"
	},

	bidi :
	{
		ltr : "Направление текста слева направо",
		rtl : "Направление текста справа налево"
	},

	docprops :
	{
		label : "Свойства документа",
		title : "Свойства документа",
		design : "Эскиз",
		meta : "Мета-теги",
		chooseColor : "Выбрать",
		other : "Другой...",
		docTitle :	"Заголовок страницы",
		charset : 	"Кодировка набора символов",
		charsetOther : "Другая кодировка набора символов",
		charsetASCII : "ASCII",
		charsetCE : "Центрально-европейское время",
		charsetCT : "Китайская, Тайвань (Big5)",
		charsetCR : "Кириллица",
		charsetGR : "Греческий",
		charsetJP : "Японский",
		charsetKR : "Корейский",
		charsetTR : "Турецкий",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Западноевропейская",
		docType : "Заголовок типа документа",
		docTypeOther : "Другой заголовок типа документа",
		xhtmlDec : "Включить объявления XHTML",
		bgColor : "Цвет фона",
		bgImage : "URL изображения фона",
		bgFixed : "Фиксированный фон",
		txtColor : "Цвет текста",
		margin : "Поля страницы",
		marginTop : "Вверх",
		marginLeft : "По левому краю",
		marginRight : "По правому краю",
		marginBottom : "По нижнему краю",
		metaKeywords : "Ключевые слова индексации документа (через запятую)",
		metaDescription : "Описание документа",
		metaAuthor : "Автор",
		metaCopyright : "Информация об авторских правах",
		previewHtml : "<p>Это <strong>текст примера</strong>. Вы используете <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "дюймов",
			widthCm	: "сантиметров",
			widthMm	: "миллиметров",
			widthEm	: "ширины M",
			widthEx	: "ширины Х",
			widthPt	: "пунктов",
			widthPc	: "пика",
			required : "Обязательное"
		},
		table :
		{
			createTable : 'Вставить таблицу',
			heightUnit	: "Единица измерения высоты:",
			insertMultipleRows : "Вставить строки",
			insertMultipleCols : "Вставить столбцы",
			noOfRows : "Число строк:",
			noOfCols : "Число столбцов:",
			insertPosition : "Положение в списке:",
			insertBefore : "До",
			insertAfter : "После",
			selectTable : "Выбрать таблицу",
			selectRow : "Выбрать строку",
			columnTitle : "Ширина столбца",
			colProps : "Свойства столбца",
			invalidColumnWidth	: "Ширина столбца должна быть положительным числом.",
			fixedColWidths : "Фиксированная ширина столбцов"
		},
		cell :
		{
			title : "Ячейка"
		},
		colordialog :
		{
			currentColor	: "Текущий цвет"
		},
		emoticon :
		{
			angel		: "Ангел",
			angry		: "Злой",
			cool		: "Круто",
			crying		: "Плачу",
			eyebrow		: "Брови",
			frown		: "Нахмуренные брови",
			goofy		: "Сошел с ума",
			grin		: "Ухмылка",
			half		: "Ужасно",
			idea		: "Идея",
			laughing	: "Смех",
			laughroll	: "Катаюсь от смеха",
			no			: "Нет",
			oops		: "Ой",
			shy			: "Стеснительный",
			smile		: "Улыбка",
			tongue		: "Язык",
			wink		: "Подмигивание",
			yes			: "Да"
		},

		menu :
		{
			link	: "Вставить ссылку",
			list	: "Список",
			paste	: "Вставить",
			action	: "Действие",
			align	: "Выравнивание",
			emoticon: "Значок настроения"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Нумерованный список",
			bulletedTitle		: "Ненумерованный список",
			description			: "Параметры будут применены к текущему уровню списка",
			fontsize			: "Размер шрифта:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Введите описательное имя закладки, такое как 'Раздел 1.2'. После вставки закладки щелкните или на значке 'Ссылка', или на значке 'Ссылка на закладку документа', чтобы связать ее.",
			title		: "Ссылка на закладку документа",
			linkTo		: "Ссылка на:"
		},

		urllink :
		{
			title : "Ссылка URL",
			linkText : "Текст ссылки:",
			selectAnchor: "Выберите метку:",
			nourl: "Укажите URL в этом текстовом поле.",
			urlhelp: "Введите или вставьте URL, который следует открывать при нажатии этой ссылки, например http://www.example.com.",
			displaytxthelp: "Введите отображаемый текст ссылки.",
			openinnew : "Открыть ссылку в новом окне"
		},

		spellchecker :
		{
			title : "Проверка орфографии",
			replace : "Заменить:",
			suggesstion : "Варианты:",
			withLabel : "С:",
			replaceButton : "Заменить",
			replaceallButton:"Заменить все",
			skipButton:"Пропустить",
			skipallButton: "Пропустить все",
			undochanges: "Отменить изменения",
			complete: "Проверка орфографии выполнена",
			problem: "Ошибка при получении данных XML",
			addDictionary: "Добавить в словарь",
			editDictionary: "Изменить словарь"
		},

		status :
		{
			keystrokeForHelp: "Для просмотра справки нажмите клавиши ALT 0"
		},

		linkdialog :
		{
			label : "Окно ссылки"
		},

		imagedatauri :
		{
			error : "Вставка изображений пока не поддерживается. Используйте команду Вставить изображение на панели инструментов."
		},

		image :
		{
			previewText : "Текст будет обтекать изображение, как в этом примере.",
			fileUpload : "Выберите файл изображения в своей системе."
		}
	}

};
