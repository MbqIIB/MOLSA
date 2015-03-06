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

CKEDITOR.lang["tr"] =
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
	editorTitle : "Zengin metin düzenleyici, %1, yardım için ALT 0 tuşlarına basın.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Düzenleyici araç çubukları",
	editor	: "Zengin Metin Düzenleyici",

	// Toolbar buttons without dialogs.
	source			: "Kaynak",
	newPage			: "Yeni Sayfa",
	save			: "Kaydet",
	preview			: "Önizleme:",
	cut				: "Kes",
	copy			: "Kopyala",
	paste			: "Yapıştır",
	print			: "Yazdır",
	underline		: "Altı Çizili",
	bold			: "Kalın",
	italic			: "İtalik",
	selectAll		: "Tümünü Seç",
	removeFormat	: "Biçimi Kaldır",
	strike			: "Üstü Çizili",
	subscript		: "Alt Simge",
	superscript		: "Üst Simge",
	horizontalrule	: "Yatay Çizgi Ekle",
	pagebreak		: "Sayfa Sonu Ekle",
	pagebreakAlt		: "Sayfa Sonu",
	unlink			: "Bağlantıyı Kaldır",
	undo			: "Geri Al",
	redo			: "Yinele",

	// Common messages and labels.
	common :
	{
		browseServer	: "Tarayıcı Sunucusu:",
		url				: "URL:",
		protocol		: "Protokol:",
		upload			: "Karşıya Yükle:",
		uploadSubmit	: "Sunucuya gönder",
		image			: "Resim Ekle",
		flash			: "Flash Filmi Ekle",
		form			: "Form Ekle",
		checkbox		: "Onay Kutusu Ekle",
		radio			: "Radyo Düğmesi Ekle",
		textField		: "Metin Alanı Ekle",
		textarea		: "Metin Bölgesi Ekle",
		hiddenField		: "Gizli Alan Ekle",
		button			: "Düğme Ekle",
		select			: "Seçin Alanı Ekle",
		imageButton		: "Resim Düğmesi Ekle",
		notSet			: "<belirlenmedi>",
		id				: "Tanıtıcı:",
		name			: "Ad:",
		langDir			: "Dil Yönü:",
		langDirLtr		: "Soldan Sağa",
		langDirRtl		: "Sağdan Sola",
		langCode		: "Dil Kodu:",
		longDescr		: "Uzun Tanım URL Adresi:",
		cssClass		: "Stil sayfası sınıfları:",
		advisoryTitle	: "Danışman başlığı:",
		cssStyle		: "Stil:",
		ok				: "Tamam",
		cancel			: "İptal",
		close : "Kapat",
		preview			: "Önizleme:",
		generalTab		: "Genel",
		advancedTab		: "Gelişmiş",
		validateNumberFailed	: "Bu değer bir sayı değil.",
		confirmNewPage	: "Bu içerikteki saklanmamış değişiklikler kaybedilir. Yeni bir sayfa yüklemek istediğinizden emin misiniz?",
		confirmCancel	: "Bazı seçenekler değiştirildi. İletişim kutusunu kapatmak istediğinizden emin misiniz?",
		options : "Seçenekler",
		target			: "Hedef:",
		targetNew		: "Yeni Pencere (_blank)",
		targetTop		: "En Üstteki Pencere (_top)",
		targetSelf		: "Aynı Pencere (_self)",
		targetParent	: "Üst Pencere (_parent)",
		langDirLTR		: "Soldan Sağa",
		langDirRTL		: "Sağdan Sola",
		styles			: "Stil:",
		cssClasses		: "Stil Sayfası Sınıfları:",
		width			: "Genişlik:",
		height			: "Yükseklik:",
		align			: "Hizala:",
		alignLeft		: "Sola",
		alignRight		: "Sağa",
		alignCenter		: "Ortala",
		alignTop		: "En Üste",
		alignMiddle		: "Ortaya",
		alignBottom		: "Alta",
		invalidHeight	: "Yükseklik bir pozitif tamsayı olmalıdır.",
		invalidWidth	: "Genişlik bir pozitif tamsayı olmalıdır.",
		invalidCssLength	: "'%1' alanı için belirtilen değer, geçerli bir CSS ölçü birimiyle ya da CSS ölçü birimi olmadan (px, %, in, cm, mm, em, ex, pt veya pc) pozitif bir sayı olmalıdır.",
		invalidHtmlLength	: "'%1' alanı için belirtilen değer, geçerli bir HTML ölçü birimiyle ya da HTML ölçü birimi olmadan (px veya %) pozitif bir sayı olmalıdır.",
		invalidInlineStyle	: "Satır içi stili için belirtilen değer, iki noktayla birbirinden ayrılmış \"ad : değer\" biçimindeki bir ya da daha fazla değişken grubundan oluşmalıdır.",
		cssLengthTooltip	: "Piksel değeri için bir sayı ya da geçerli bir CSS birimiyle (px, %, in, cm, mm, em, ex, pt veya pc) sayı girin.",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, kullanılamıyor</span>"
	},

	contextmenu :
	{
		options : "Bağlam Menüsü Seçenekleri"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Özel Karakter Ekle",
		title		: "Özel Karakter",
		options : "Özel Karakter Seçenekleri"
	},

	// Link dialog.
	link :
	{
		toolbar		: "URL Bağlantısı",
		other 		: "<diğer>",
		menu		: "Bağlantıyı Düzenle",
		title		: "Bağlantı",
		info		: "Bağlantı Bilgileri",
		target		: "Hedef",
		upload		: "Karşıya Yükle:",
		advanced	: "Gelişmiş",
		type		: "Bağlantı Tipi:",
		toUrl		: "URL Adresi",
		toAnchor	: "Metne tutturulacak bağlantı",
		toEmail		: "E-posta",
		targetFrame	: "<çerçeve>",
		targetPopup	: "<açılan pencere>",
		targetFrameName	: "Hedef Çerçeve Adı:",
		targetPopupName	: "Beliren Pencere Adı:",
		popupFeatures	: "Beliren Pencere Özellikleri:",
		popupResizable	: "Boyutu değiştirilebilir",
		popupStatusBar	: "Durum Çubuğu",
		popupLocationBar	: "Yer Çubuğu",
		popupToolbar	: "Araç Çubuğu",
		popupMenuBar	: "Menü Çubuğu",
		popupFullScreen	: "Tüm Ekran (IE)",
		popupScrollBars	: "Kaydırma Çubukları",
		popupDependent	: "Bağımlı (Netscape)",
		popupLeft		: "Sol Konum",
		popupTop		: "Üst Konum",
		id				: "Tanıtıcı:",
		langDir			: "Dil Yönü:",
		langDirLTR		: "Soldan Sağa",
		langDirRTL		: "Sağdan Sola",
		acccessKey		: "Erişim Tuşu:",
		name			: "Ad:",
		langCode		: "Dil Kodu:",
		tabIndex		: "Etiket Dizini:",
		advisoryTitle	: "Danışman başlığı:",
		advisoryContentType	: "Öneri İçeriği Türü:",
		cssClasses		: "Stil sayfası sınıfları:",
		charset			: "Bağlı Kaynak Karakter Kümesi:",
		styles			: "Stil:",
		rel			: "İlişki",
		selectAnchor	: "Tutturucu Seç",
		anchorName		: "Tutturucu Adına Göre",
		anchorId		: "Öğe Tanıtıcısına Göre",
		emailAddress	: "E-Posta Adresi",
		emailSubject	: "İleti Konusu",
		emailBody		: "İleti Gövdesi",
		noAnchors		: "Belgede yer işareti yok. Bir yer işareti eklemek için araç çubuğunda 'Belge Yer İşareti Ekle' simgesini tıklatın.",
		noUrl			: "Lütfen bağlantı URL adresini yazın",
		noEmail			: "Lütfen e-posta adresini yazın"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Belge Yer İşareti Ekle",
		menu		: "Belge Yer İşaretini Düzenle",
		title		: "Belge Yer İşareti",
		name		: "Ad:",
		errorName	: "Lütfen belge yer işareti için bir ad girin",
		remove		: "Belge Yer İşaretini Kaldır"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Numaralı Liste Özellikleri",
		bulletedTitle		: "Madde İmli Liste Özellikleri",
		type				: "Liste stili:",
		start				: "Başlangıç:",
		validateStartNumber				:"Liste başlangıç sayısı tam sayı olmalıdır.",
		circle				: "Daire",
		disc				: "Disk",
		square				: "Kare",
		none				: "Yok",
		notset				: "<belirlenmedi>",
		armenian			: "Ermeni numaralandırma sistemi",
		georgian			: "Gürcü numaralandırma sistemi (an, ban, gan, vs.)",
		lowerRoman			: "Küçük Harf Roma Rakamları (i, ii, iii, iv, v, vs.)",
		upperRoman			: "Büyük Harf Roma Rakamları (I, II, III, IV, V, vs.)",
		lowerAlpha			: "Küçük Harf Alfa (a, b, c, d, e, vs.)",
		upperAlpha			: "Büyük Harf Alfa (A, B, C, D, E, vs.)",
		lowerGreek			: "Küçük Harf Yunan (alfa, beta, gama, vs.)",
		decimal				: "Ondalık (1, 2, 3, vs.)",
		decimalLeadingZero	: "Başında sıfır olan ondalık (01, 02, 03, vs.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Bul ve Değiştir",
		find				: "Bul",
		replace				: "Değiştir",
		findWhat			: "Bul:",
		replaceWith			: "Bununla değiştir:",
		notFoundMsg			: "Belirtilen metin bulunamadı.",
		findOptions			: "Bulma Seçenekleri",
		matchCase			: "Küçük/büyük harf eşleştir",
		matchWord			: "Tüm sözcük eşleştir",
		matchCyclic			: "Döngüsel olarak eşleştir",
		replaceAll			: "Tümünü Değiştir",
		replaceSuccessMsg	: "%1 geçiş değiştirildi"
	},

	// Table Dialog
	table :
	{
		toolbar		: "Tablo Ekle",
		title		: "Tablo",
		menu		: "Tablo Özellikleri",
		deleteTable	: "Tabloyu Sil",
		rows		: "Satır:",
		columns		: "Sütun:",
		border		: "Kenar boyutu:",
		widthPx		: "piksel",
		widthPc		: "yüzde",
		widthUnit	: "Genişlik birimi:",
		cellSpace	: "Hücre aralığı:",
		cellPad		: "Hücre dolgusu:",
		caption		: "Başlık:",
		summary		: "Özet:",
		headers		: "Üstbilgiler:",
		headersNone		: "Yok",
		headersColumn	: "Birinci Sütun",
		headersRow		: "Birinci Satır",
		headersBoth		: "Her İkisi",
		invalidRows		: "Satır sayısı, sıfırdan büyük bir tamsayı olmalıdır.",
		invalidCols		: "Sütun sayısı, sıfırdan büyük bir tamsayı olmalıdır.",
		invalidBorder	: "Kenar büyüklüğü pozitif bir sayı olmalıdır.",
		invalidWidth	: "Tablo genişliği pozitif bir sayı olmalıdır.",
		invalidHeight	: "Tablo yüksekliği pozitif bir sayı olmalıdır.",
		invalidCellSpacing	: "Hücre aralığı pozitif bir sayı olmalıdır.",
		invalidCellPadding	: "Hücre dolgusu pozitif bir sayı olmalıdır.",

		cell :
		{
			menu			: "Hücre",
			insertBefore	: "Hücreyi Öncesine Ekle",
			insertAfter		: "Hücreyi Sonrasına Ekle",
			deleteCell		: "Hücreleri Sil",
			merge			: "Hücreleri Birleştir",
			mergeRight		: "Sağıyla Birleştir",
			mergeDown		: "Altıyla Birleştir",
			splitHorizontal	: "Hücreyi Yatay Olarak Böl",
			splitVertical	: "Hücreyi Düşey Olarak Böl",
			title			: "Hücre Özellikleri",
			cellType		: "Hücre tipi:",
			rowSpan			: "Satır aralığı:",
			colSpan			: "Sütun aralığı:",
			wordWrap		: "Sözcük kaydırma:",
			hAlign			: "Yatay hizalama:",
			vAlign			: "Dikey hizalama:",
			alignBaseline	: "Taban Çizgisi",
			bgColor			: "Arka plan rengi:",
			borderColor		: "Kenar rengi:",
			data			: "Veri",
			header			: "Üstbilgi",
			yes				: "Evet",
			no				: "Hayır",
			invalidWidth	: "Hücre genişliği pozitif bir sayı olmalıdır.",
			invalidHeight	: "Hücre yüksekliği pozitif bir sayı olmalıdır.",
			invalidRowSpan	: "Satır aralığı bir pozitif tamsayı olmalıdır.",
			invalidColSpan	: "Sütun aralığı bir pozitif tamsayı olmalıdır.",
			chooseColor 	: "Ek Renkler..."
		},

		row :
		{
			menu			: "Satır",
			insertBefore	: "Satırı Önüne Ekle",
			insertAfter		: "Satırı Arkasına Ekle",
			deleteRow		: "Satırları Sil"
		},

		column :
		{
			menu			: "Sütun",
			insertBefore	: "Sütunu Önüne Ekle",
			insertAfter		: "Sütunu Arkasına Ekle",
			deleteColumn	: "Sütunları Sil"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Düğme Özellikleri",
		text		: "Metin (Değer):",
		type		: "Tip:",
		typeBtn		: "Düğme",
		typeSbm		: "Gönder",
		typeRst		: "Sıfırla"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Onay Kutusu Özellikleri",
		radioTitle	: "Radyo Düğmesi Özellikleri",
		value		: "Değer:",
		selected	: "Seçili"
	},

	// Form Dialog.
	form :
	{
		title		: "Form Ekle",
		menu		: "Form Özellikleri",
		action		: "İşlem",
		method		: "Yöntem:",
		encoding	: "Kodlama:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Alan Özellikleri Seç",
		selectInfo	: "Seçim Bilgileri",
		opAvail		: "Kullanılabilecek Seçenekler",
		value		: "Değer:",
		size		: "Boyut:",
		lines		: "satır",
		chkMulti	: "Birden çok satıra izin ver",
		opText		: "Metin:",
		opValue		: "Değer:",
		btnAdd		: "Ekle",
		btnModify	: "Değiştir",
		btnUp		: "Yukarı",
		btnDown		: "Aşağı",
		btnSetValue : "Seçilen değer olarak ayarla",
		btnDelete	: "Sil"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Metin Bölgesi Özellikleri",
		cols		: "Sütun:",
		rows		: "Satır:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Metin Alanı Özellikleri",
		name		: "Ad:",
		value		: "Değer:",
		charWidth	: "Karakter Genişliği",
		maxChars	: "Karakter Sayısı Üst Sınırı:",
		type		: "Tip:",
		typeText	: "Metin",
		typePass	: "Parola"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Gizlenmiş Alan Özellikleri",
		name	: "Ad:",
		value	: "Değer:"
	},

	// Image Dialog.
	image :
	{
		title		: "Resim",
		titleButton	: "Resim Düğmesi Özellikleri",
		menu		: "Resim Özellikleri",
		infoTab	: "Resim Bilgileri",
		btnUpload	: "Resmi karşıya yükle",
		upload	: "Karşıya Yükle",
		alt		: "Alternatif metin:",
		lockRatio	: "Kilitleme Oranı",
		resetSize	: "Büyüklüğü İlk Durumuna Getir",
		border	: "Kenar:",
		hSpace	: "Yatay boşluk:",
		vSpace	: "Düşey boşluk:",
		alertUrl	: "Lütfen resim URL adresini yazın",
		linkTab	: "Bağlantı",
		button2Img	: "Seçilen resim düğmesini yalın bir resme dönüştürmek istiyor musunuz?",
		img2Button	: "Seçilen resmi resim düğmesine dönüştürmek istiyor musunuz?",
		urlMissing : "Resim kaynağı URL adresi eksik.",
		validateBorder : "Kenar bir pozitif tamsayı olmalıdır.",
		validateHSpace : "Yatay boşluk bir pozitif tamsayı olmalıdır.",
		validateVSpace : "Dikey boşluk bir pozitif tamsayı olmalıdır."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Flaş Özellikleri",
		propertiesTab	: "Özellikler",
		title		: "Flaş",
		chkPlay		: "Otomatik yürüt",
		chkLoop		: "Döngü",
		chkMenu		: "Flaş menüsünü etkinleştir",
		chkFull		: "Tüm ekrana izin ver",
 		scale		: "Ölçek:",
		scaleAll		: "Tümünü göster",
		scaleNoBorder	: "Kenar Yok",
		scaleFit		: "Tam Sığdır",
		access			: "Komut dosyası erişimi:",
		accessAlways	: "Her zaman",
		accessSameDomain	: "Aynı etki alanı",
		accessNever	: "Hiçbir zaman",
		alignAbsBottom: "Mutlak Alta",
		alignAbsMiddle: "Mutlak Ortaya",
		alignBaseline	: "Taban Çizgisi",
		alignTextTop	: "Metni Üste",
		quality		: "Kalite:",
		qualityBest	: "En İyi",
		qualityHigh	: "Yüksek",
		qualityAutoHigh	: "Otomatik Yüksek",
		qualityMedium	: "Orta",
		qualityAutoLow	: "Otomatik Düşük",
		qualityLow	: "Düşük",
		windowModeWindow	: "Pencere",
		windowModeOpaque	: "Opak",
		windowModeTransparent	: "Saydam",
		windowMode	: "Pencere modu:",
		flashvars	: "Değişkenler:",
		bgcolor	: "Arka plan rengi:",
		hSpace	: "Yatay boşluk:",
		vSpace	: "Dikey boşluk:",
		validateSrc : "URL adresi boş olmamalıdır.",
		validateHSpace : "Yatay boşluk bir pozitif tamsayı olmalıdır.",
		validateVSpace : "Dikey boşluk bir pozitif tamsayı olmalıdır."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Yazım Denetimi",
		title			: "Yazım Denetimi",
		notAvailable	: "Üzgünüz, şu an hizmet kullanılamıyor.",
		errorLoading	: "Uygulama hizmeti anasistemi yüklenirken hata: %s.",
		notInDic		: "Sözlükte yok",
		changeTo		: "Buna çevir",
		btnIgnore		: "Yoksay",
		btnIgnoreAll	: "Tümünü Yoksay",
		btnReplace		: "Değiştir",
		btnReplaceAll	: "Tümünü Değiştir",
		btnUndo			: "Geri Al",
		noSuggestions	: "- Öneri yok -",
		progress		: "Yazım denetimi devam ediyor...",
		noMispell		: "Yazım denetimi tamamlandı: Yazım hatası bulunamadı",
		noChanges		: "Yazım denetimi tamamlandı: Hiçbir sözcük değiştirilmedi",
		oneChange		: "Yazım denetimi tamamlandı: Bir sözcük değiştirildi",
		manyChanges		: "Yazım denetimi tamamlandı: %1 sözcük değiştirildi",
		ieSpellDownload	: "Yazım denetleyici kurulu değil. Şimdi karşıdan yüklemek ister misiniz?"
	},

	smiley :
	{
		toolbar	: "Duygu Simgesi Ekle",
		title	: "Duygu Simgeleri",
		options : "Duygu Simgesi Seçenekleri"
	},

	elementsPath :
	{
		eleLabel : "Öğe yolu",
		eleTitle : "%1 öğesi"
	},

	numberedlist : "Numaralandırılmış Liste",
	bulletedlist : "Madde İşaretli Liste",
	indent : "Girintiyi Artır",
	outdent : "Girintiyi Azalt",

	justify :
	{
		left : "Sola Hizala",
		center : "Ortaya Hizala",
		right : "Sağa Hizala",
		block : "Yaslamalı Hizala"
	},

	blockquote : "Blok Alıntı",

	clipboard :
	{
		title		: "Yapıştır",
		cutError	: "Tarayıcınızın güvenlik ayarları otomatik kesmeyi önlüyor. Onun yerine klavyenizdeki Ctrl+X tuş birleşimini kullanın.",
		copyError	: "Tarayıcınızın güvenlik ayarları otomatik kopyalamayı önlüyor. Onun yerine klavyenizdeki Ctrl+C tuş birleşimini kullanın.",
		pasteMsg	: "Aşağıya yapıştırmak için Ctrl+V (MAC üzerinde Cmd+V) ttuş birleşimine basın.",
		securityMsg	: "Tarayıcınızın güvenliği doğrudan doğruya panodan yapıştırmayı engelliyor.",
		pasteArea	: "Yapıştırma Bölgesi"
	},

	pastefromword :
	{
		confirmCleanup	: "Yapıştırmak istediğiniz metin Word uygulamasından kopyalamış gibi görünüyor. Yapıştırmadan önce temizlemek ister misiniz?",
		toolbar			: "Özel Yapıştır",
		title			: "Özel Yapıştır",
		error			: "Bir iç hata nedeniyle, yapıştırılan veriler temizlenemedi"
	},

	pasteText :
	{
		button	: "Düz metin olarak yapıştır",
		title	: "Düz Metin Olarak Yapıştır"
	},

	templates :
	{
		button 			: "Şablonlar",
		title : "İçerik Şablonları",
		options : "Şablon Seçenekleri",
		insertOption: "Gerçek içeriği başkasıyla değiştir",
		selectPromptMsg: "Düzenleyicide açılacak şablonu seçin",
		emptyListMsg : "(Şablon tanımlanmadı)"
	},

	showBlocks : "Blokları Göster",

	stylesCombo :
	{
		label		: "Stiller",
		panelTitle 	: "Stiller",
		panelTitle1	: "Blok Stilleri",
		panelTitle2	: "Satır İçi Stiller",
		panelTitle3	: "Nesne Stilleri"
	},

	format :
	{
		label		: "Biçim",
		panelTitle	: "Paragraf Biçimi",

		tag_p		: "Normal",
		tag_pre		: "Biçimlenmiş",
		tag_address	: "Adres",
		tag_h1		: "Başlık 1",
		tag_h2		: "Başlık 2",
		tag_h3		: "Başlık 3",
		tag_h4		: "Başlık 4",
		tag_h5		: "Başlık 5",
		tag_h6		: "Başlık 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Bölüm Taşıyıcısı Oluştur",
		toolbar				: "Bölüm Taşıyıcısı Oluştur",
		cssClassInputLabel	: "Stil sayfası sınıfları",
		styleSelectLabel	: "Stil",
		IdInputLabel		: "Kimlik",
		languageCodeInputLabel	: " Dil Kodu",
		inlineStyleInputLabel	: "Yerleşik Stil",
		advisoryTitleInputLabel	: "Danışman başlığı",
		langDirLabel		: "Dil Yönü",
		langDirLTRLabel		: "Soldan Sağa (LTR)",
		langDirRTLLabel		: "Sağdan Sola (RTL)",
		edit				: "Bölümü Düzenle",
		remove				: "Bölümü Kaldır"
  	},

	iframe :
	{
		title		: "IFrame Özellikleri",
		toolbar		: "IFrame Ekle",
		noUrl		: "Lütfen iframe URL'sini yazın",
		scrolling	: "Kaydırma çubuklarını etkinleştir",
		border		: "Çerçeve kenarını göster"
	},

	font :
	{
		label		: "Yazı Tipi",
		voiceLabel	: "Yazı Tipi",
		panelTitle	: "Yazı Tipi Adı"
	},

	fontSize :
	{
		label		: "Boyut",
		voiceLabel	: "Yazı Tipi Boyutu",
		panelTitle	: "Yazı Tipi Boyutu"
	},

	colorButton :
	{
		textColorTitle	: "Metin Rengi",
		bgColorTitle	: "Arka Plan Rengi",
		panelTitle		: "Renkler",
		auto			: "Otomatik",
		more			: "Ek Renkler..."
	},

	colors :
	{
		"000" : "Siyah",
		"800000" : "Kızıl Kahverengi",
		"8B4513" : "Açık Kahverengi",
		"2F4F4F" : "Koyu Kurşuni",
		"008080" : "Yeşilimsi Mavi",
		"000080" : "Lacivert",
		"4B0082" : "İndigo",
		"696969" : "Koyu Gri",
		"B22222" : "Tuğla Rengi",
		"A52A2A" : "Kahverengi",
		"DAA520" : "Açık Altın Sarısı",
		"006400" : "Koyu Yeşil",
		"40E0D0" : "Türkuvaz",
		"0000CD" : "Orta Mavi",
		"800080" : "Mor",
		"808080" : "Gri",
		"F00" : "Kırmızı",
		"FF8C00" : "Koyu Turuncu",
		"FFD700" : "Altın Sarısı",
		"008000" : "Yeşil",
		"0FF" : "Camgöbeği",
		"00F" : "Mavi",
		"EE82EE" : "Menekşe Rengi",
		"A9A9A9" : "Soluk Gri",
		"FFA07A" : "Açık Somon",
		"FFA500" : "Turuncu",
		"FFFF00" : "Sarı",
		"00FF00" : "Yeşil Limon",
		"AFEEEE" : "Uçuk Türkuvaz",
		"ADD8E6" : "Açık Mavi",
		"DDA0DD" : "Erik Rengi",
		"D3D3D3" : "Açık Gri",
		"FFF0F5" : "Açık Lavanta",
		"FAEBD7" : "Kemik Beyazı",
		"FFFFE0" : "Açık Sarı",
		"F0FFF0" : "Kavun Rengi",
		"F0FFFF" : "Canlı Mavi",
		"F0F8FF" : "Çelik Mavisi",
		"E6E6FA" : "Lavanta",
		"FFF" : "Beyaz"
	},

	scayt :
	{
		title			: "Yazarken Yazım Denetimi",
		opera_title		: "Opera tarafından sıralanmamış",
		enable			: "SCAYT olanağını etkinleştir",
		disable			: "SCAYT olanağını geçersiz kıl",
		about			: "SCAYT ürün bilgisi",
		toggle			: "SCAYT aç/kapa",
		options			: "Seçenekler",
		langs			: "Diller",
		moreSuggestions	: "Ek öneriler",
		ignore			: "Yoksay",
		ignoreAll		: "Tümünü Yoksay",
		addWord			: "Sözcük Ekle",
		emptyDic		: "Sözlük adı boş olmamalıdır.",

		optionsTab		: "Seçenekler",
		allCaps			: "Tüm Büyük Harf Sözcükleri Yoksay",
		ignoreDomainNames : "Etki Alanı Adlarını Yoksay",
		mixedCase		: "Büyük/Büyük Harf Karışık Kullanılan Sözcükleri Yoksay",
		mixedWithDigits	: "Sayı İçeren Sözcükleri Yoksay",

		languagesTab	: "Diller",

		dictionariesTab	: "Sözlükler",
		dic_field_name	: "Sözlük adı",
		dic_create		: "Oluştur",
		dic_restore		: "Geri Yükle",
		dic_delete		: "Sil",
		dic_rename		: "Yeniden Adlandır",
		dic_info		: "Başlangıçta Kullanıcı Sözlüğü bir Tanımlama Bilgisinde saklanır. Ancak, Tanımlama Bilgilerinin boyutları sınırlıdır. Kullanıcı Sözlüğü, bir Tanımlama Bilgisinde saklanamayacak kadar büyüdüğünde, sözlük sunucumuzda saklanabilir. Kişisel sözlüğünüzü sunucumuzda saklamak için sözlüğünüz için bir ad belirlemelisiniz. Önceden saklanmış olan bir sözlüğünüz varsa lütfen bu sözlüğün adını girin ve Geri yükle düğmesini tıklatın.",

		aboutTab		: "Hakkında"
	},

	about :
	{
		title		: "CKEditor Ürün Bilgisi",
		dlgTitle	: "CKEditor Ürün Bilgisi",
		help	: "Yardım için bkz. $1.",
		userGuide : "CKEditor Kullanıcı Kılavuzu",
		moreInfo	: "Lisans bilgileri için lütfen Web sitemizi ziyaret edin:",
		copy		: "Copyright &copy; $1. Her hakkı saklıdır."
	},

	maximize : "Ekran Boyutuna Getir",
	minimize : "Simge Durumuna Küçült",

	fakeobjects :
	{
		anchor	: "Tutturma",
		flash	: "Flaş Canlandırma",
		iframe		: "IFrame",
		hiddenfield	: "Gizli Alan",
		unknown	: "Bilinmeyen Nokta"
	},

	resize : "Boyutunu değiştirmek için sürükleyin",

	colordialog :
	{
		title		: "Renk Seç",
		options	:	"Renk Seçenekleri",
		highlight	: "Vurgula",
		selected	: "Seçilen renk",
		clear		: "Temizle"
	},

	toolbarCollapse	: "Araç Çubuğunu Daralt",
	toolbarExpand	: "Araç Çubuğunu Genişlet",

	toolbarGroups :
	{
		document : "Belge",
		clipboard : "Pano/Geri Al",
		editing : "Düzenleme",
		forms : "Formlar",
		basicstyles : "Temel Stiller",
		paragraph : "Paragraf",
		links : "Bağlantılar",
		insert : "Ekle",
		styles : "Stiller",
		colors : "Renkler",
		tools : "Araçlar"
	},

	bidi :
	{
		ltr : "Metin yönü soldan sağa",
		rtl : "Metin yönü sağdan sola"
	},

	docprops :
	{
		label : "Belge Özellikleri",
		title : "Belge Özellikleri",
		design : "Tasarım",
		meta : "Meta Etiketler",
		chooseColor : "Seç",
		other : "Diğer...",
		docTitle :	"Sayfa Başlığı",
		charset : 	"Karakter Kümesi Kodlaması",
		charsetOther : "Diğer Karakter Kümesi Kodlaması",
		charsetASCII : "ASCII",
		charsetCE : "Orta Avrupa",
		charsetCT : "Geleneksel Çince (Big5)",
		charsetCR : "Kiril",
		charsetGR : "Yunanca",
		charsetJP : "Japonca",
		charsetKR : "Korece",
		charsetTR : "Türkçe",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Batı Avrupa",
		docType : "Belge Türü Başlığı",
		docTypeOther : "Diğer Belge Türü Başlığı",
		xhtmlDec : "XHTML Açıklamalarını İçer",
		bgColor : "Arka Plan Rengi",
		bgImage : "Arka Plan Resmi URL'si",
		bgFixed : "Kaymayan (Sabit) Arka Plan",
		txtColor : "Metin Rengi",
		margin : "Sayfa Kenar Boşlukları",
		marginTop : "En Üste",
		marginLeft : "Sola",
		marginRight : "Sağa",
		marginBottom : "Alta",
		metaKeywords : "Belge Dizin Oluşturma Anahtar Sözcükleri (virgülle ayrılmış)",
		metaDescription : "Belge Açıklaması",
		metaAuthor : "Yazar",
		metaCopyright : "Telif Hakkı",
		previewHtml : "<p>Bu <strong>örnek metindir</strong>. <a href=\"javascript:void(0)\">CKEditor</a> programını kullanıyorsunuz.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "inç",
			widthCm	: "santimetre",
			widthMm	: "milimetre",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "nokta",
			widthPc	: "pika",
			required : "Zorunlu"
		},
		table :
		{
			createTable : 'Tablo Ekle',
			heightUnit	: "Yükseklik birimi:",
			insertMultipleRows : "Satır Ekle",
			insertMultipleCols : "Sütun Ekle",
			noOfRows : "Satır Sayısı:",
			noOfCols : "Sütun Sayısı:",
			insertPosition : "Konum:",
			insertBefore : "Önüne",
			insertAfter : "Arkasına",
			selectTable : "Tablo Seç",
			selectRow : "Satır Seç",
			columnTitle : "Sütun Genişliği",
			colProps : "Sütun Özellikleri",
			invalidColumnWidth	: "Sütun genişliği pozitif bir sayı olmalıdır.",
			fixedColWidths : "Sabit sütun genişlikleri"
		},
		cell :
		{
			title : "Hücre"
		},
		colordialog :
		{
			currentColor	: "Geçerli renk"
		},
		emoticon :
		{
			angel		: "Melek",
			angry		: "Kızgın",
			cool		: "Havalı",
			crying		: "Ağlayan",
			eyebrow		: "Kaş",
			frown		: "Kaş çatma",
			goofy		: "Açık Ağızlı",
			grin		: "Sırıtma",
			half		: "Yarım Gülümseme",
			idea		: "Fikir",
			laughing	: "Gülme",
			laughroll	: "Kahkaha",
			no			: "Hayır",
			oops		: "Hoop",
			shy			: "Utangaç",
			smile		: "Gülümseme",
			tongue		: "Dil",
			wink		: "Göz kırpma",
			yes			: "Evet"
		},

		menu :
		{
			link	: "Bağlantı Ekle",
			list	: "Liste",
			paste	: "Yapıştır",
			action	: "Eylem",
			align	: "Hizala",
			emoticon: "Duygu Simgesi"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Numaralandırılmış Liste",
			bulletedTitle		: "Madde İşaretli Liste",
			description			: "Ayarlar, geçerli liste düzeyine uygulanacak.",
			fontsize			: "Yazı tipi boyutu:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "'Bölüm 1.2' gibi açıklayıcı bir yer işareti adı yazın. Yer işaretini ekledikten sonra, bağlantı oluşturmak için 'Bağlantı' ya da 'Belge Yer İşareti Bağlantısı' simgesini tıklatın.",
			title		: "Belge Yer İşareti Bağlantısı",
			linkTo		: "Bağlantı:"
		},

		urllink :
		{
			title : "URL Bağlantısı",
			linkText : "Bağlantı Metni:",
			selectAnchor: "Tutturucu Seç:",
			nourl: "Metin alanında bir URL adresi girin.",
			urlhelp: "Kullanıcılar bu bağlantıyı tıklattıklarında açılacak URL adresini yazın ya da yapıştırın; örneğin, http://www.ornek.com.",
			displaytxthelp: "Bağlantı için metin görüntüsünü yazın.",
			openinnew : "Bağlantıyı yeni pencerede aç"
		},

		spellchecker :
		{
			title : "Yazım Denetimi",
			replace : "Değiştir:",
			suggesstion : "Öneriler:",
			withLabel : "Bununla:",
			replaceButton : "Değiştir",
			replaceallButton:"Tümünü Değiştir",
			skipButton:"Atla",
			skipallButton: "Tümünü Atla",
			undochanges: "Değişiklikleri Geri Al",
			complete: "Yazım Denetimi Tamamlandı",
			problem: "XML verileri alınırken sorun oluştu",
			addDictionary: "Sözlüğe Ekle",
			editDictionary: "Sözlüğü Düzenle"
		},

		status :
		{
			keystrokeForHelp: "Yardım için ALT 0 tuşlarına basın"
		},

		linkdialog :
		{
			label : "Bağlantı İletişim Kutusu"
		},

		imagedatauri :
		{
			error : "Resim yapıştırma şu anda desteklenmemektedir. Lütfen bunun yerine \'Resim Eklee\' araç çubuğu seçeneğini kullanın."
		},

		image :
		{
			previewText : "Metin, bu örnekte olduğu gibi eklediğiniz resmin etrafında olacak.",
			fileUpload : "Bilgisayarınızdan bir resim dosyası seçin:"
		}
	}

};
