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

CKEDITOR.lang["th"] =
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
	editorTitle : "Rich text editor, %1 กด 0 เพื่อดูวิธีใช้",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "แถบเครื่องมือเอดิเตอร์",
	editor	: "เอดิเตอร์ Rich Text",

	// Toolbar buttons without dialogs.
	source			: "ซอร์ส",
	newPage			: "เพจใหม่",
	save			: "บันทึก",
	preview			: "แสดงตัวอย่าง:",
	cut				: "ตัด",
	copy			: "คัดลอก",
	paste			: "วาง",
	print			: "พิมพ์",
	underline		: "ขีดเส้นใต้",
	bold			: "ตัวหนา",
	italic			: "ตัวเอียง",
	selectAll		: "เลือกทั้งหมด",
	removeFormat	: "ลบรูปแบบ",
	strike			: "ขีดทับ",
	subscript		: "ตัวห้อย",
	superscript		: "ตัวยก",
	horizontalrule	: "แทรกเส้นแนวนอน",
	pagebreak		: "แทรกเส้นกั้นหน้า",
	pagebreakAlt		: "เส้นกั้นหน้า",
	unlink			: "ลบลิงก์",
	undo			: "เลิกทำ",
	redo			: "ทำซ้ำ",

	// Common messages and labels.
	common :
	{
		browseServer	: "เบราว์เซอร์เซิร์ฟเวอร์:",
		url				: "URL:",
		protocol		: "โปรโตคอล:",
		upload			: "อัพโหลด:",
		uploadSubmit	: "ส่งไปยังเซิร์ฟเวอร์",
		image			: "แทรกรูปภาพ",
		flash			: "แทรกไฟล์ Flash ภาพยนตร์",
		form			: "แทรกฟอร์ม",
		checkbox		: "แทรกเช็กบ็อกซ์",
		radio			: "แทรกปุ่มแบบเรดิโอ",
		textField		: "แทรกฟิลด์ข้อความ",
		textarea		: "แทรกพื้นที่ข้อความ",
		hiddenField		: "แทรกฟิลด์ที่ซ่อน",
		button			: "แทรกปุ่ม",
		select			: "แทรกฟิลด์การเลือก",
		imageButton		: "แทรกปุ่มรูปภาพ",
		notSet			: "<ไม่ได้ตั้งค่า>",
		id				: "Id:",
		name			: "ชื่อ:",
		langDir			: "ทิศทางของภาษา:",
		langDirLtr		: "ซ้ายไปขวา",
		langDirRtl		: "ขวาไปซ้าย",
		langCode		: "รหัสภาษา:",
		longDescr		: "URL รายละเอียด:",
		cssClass		: "คลาสสไตล์ชีต:",
		advisoryTitle	: "หัวเรื่องแนะนำ:",
		cssStyle		: "ลักษณะ:",
		ok				: "OK",
		cancel			: "ยกเลิก",
		close : "ปิด",
		preview			: "แสดงตัวอย่าง:",
		generalTab		: "ทั่วไป",
		advancedTab		: "ขั้นสูง",
		validateNumberFailed	: "ค่านี้ไม่เป็นตัวเลข",
		confirmNewPage	: "การเปลี่ยนแปลงที่ยังไม่บันทึกในเนื้อหานี้จะสูญหาย คุณแน่ใจหรือไม่ว่าคุณต้องการโหลดเพจใหม่?",
		confirmCancel	: "อ็อพชันบางตัวมีการเปลี่ยนแปลง คุณแน่ใจหรือไม่ว่าคุณต้องการปิดไดอะล็อก?",
		options : "อ็อพชัน",
		target			: "ปลายทาง:",
		targetNew		: "หน้าต่างใหม่ (_blank)",
		targetTop		: "หน้าต่างบนสุด (_top)",
		targetSelf		: "หน้าต่างเดียวกัน (_self)",
		targetParent	: "หน้าต่างหลัก (_parent)",
		langDirLTR		: "ซ้ายไปขวา",
		langDirRTL		: "ขวาไปซ้าย",
		styles			: "ลักษณะ:",
		cssClasses		: "คลาสสไตล์ชีต:",
		width			: "ความกว้าง:",
		height			: "ความสูง:",
		align			: "จัดแนว:",
		alignLeft		: "ซ้าย",
		alignRight		: "ขวา",
		alignCenter		: "กึ่งกลาง",
		alignTop		: "บน",
		alignMiddle		: "กลาง",
		alignBottom		: "ล่าง",
		invalidHeight	: "ความสูงต้องเป็นตัวเลขจำนวนเต็มบวก",
		invalidWidth	: "ความกว้างต้องเป็นตัวเลขจำนวนเต็มบวก",
		invalidCssLength	: "ค่าที่ระบุไว้สำหรับฟิลด์ '%1' ต้องเป็นจำนวนบวกที่มีหรือไม่มีหน่วยการวัด CSS ที่ถูกต้อง (px, %, in, cm, mm, em, ex, pt หรือ pc)",
		invalidHtmlLength	: "ค่าที่ระบุไว้สำหรับฟิลด์ '%1' ต้องเป็นจำนวนบวกที่มีหรือไม่มีหน่วยการวัด HTML ที่ถูกต้อง (px หรือ %)",
		invalidInlineStyle	: "ค่าที่ระบุไว้สำหรับลักษณะอินไลน์ต้องประกอบด้วยทูเพิลตั้งแต่หนึ่งตัวขึ้นไปด้วยรูปแบบของ \"ชื่อ : ค่า\" คั่นด้วยเซมิโคลอน",
		cssLengthTooltip	: "ป้อนจำนวนสำหรับค่าในพิกเซลหรือจำนวนที่มีหน่วย CSS ที่ถูกต้อง (px, %, in, cm, mm, em, ex, pt หรือ pc)",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\"> ไม่พร้อมใช้งาน</span>"
	},

	contextmenu :
	{
		options : "เมนูคอนเท็กซ์อ็อพชัน"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "แทรกอักขระพิเศษ",
		title		: "อักขระพิเศษ",
		options : "อ็อพชันอักขระพิเศษ"
	},

	// Link dialog.
	link :
	{
		toolbar		: "ลิงก์ URL",
		other 		: "<อื่นๆ>",
		menu		: "แก้ไขลิงก์",
		title		: "ลิงก์์",
		info		: "ข้อมูลลิงก์",
		target		: "ปลายทาง",
		upload		: "อัพโหลด:",
		advanced	: "ขั้นสูง",
		type		: "ชนิดของการเชื่อมโยง:",
		toUrl		: "URL",
		toAnchor	: "ลิงก์ไปยังจุดยึดในข้อความ",
		toEmail		: "อีเมล",
		targetFrame	: "<เฟรม>",
		targetPopup	: "<หน้าต่างป็อปอัพ>",
		targetFrameName	: "ชื่อเฟรมปลายทาง:",
		targetPopupName	: "ชื่อหน้าต่างป็อปอัพ:",
		popupFeatures	: "คุณลักษณะหน้าต่างป็อปอัพ:",
		popupResizable	: "ปรับขนาดได้",
		popupStatusBar	: "แถบสถานะ",
		popupLocationBar	: "แถบตำแหน่ง",
		popupToolbar	: "แถบเครื่องมือ",
		popupMenuBar	: "แถบเมนู",
		popupFullScreen	: "เต็มหน้าจอ (IE)",
		popupScrollBars	: "แถบเลื่อน",
		popupDependent	: "ขึ้นอยู่กับ (Netscape)",
		popupLeft		: "ตำแหน่งซ้าย",
		popupTop		: "ตำแหน่งบน",
		id				: "Id:",
		langDir			: "ทิศทางของภาษา:",
		langDirLTR		: "ซ้ายไปขวา",
		langDirRTL		: "ขวาไปซ้าย",
		acccessKey		: "แอ็กเซสคีย์:",
		name			: "ชื่อ:",
		langCode		: "รหัสภาษา:",
		tabIndex		: "ดัชนีแท็บ:",
		advisoryTitle	: "หัวเรื่องแนะนำ:",
		advisoryContentType	: "ประเภทเนื้อหาแนะนำ:",
		cssClasses		: "คลาสสไตล์ชีต:",
		charset			: "ชุดอักขระรีซอร์สที่ลิงก์:",
		styles			: "ลักษณะ:",
		rel			: "ความสัมพันธ์",
		selectAnchor	: "เลือกจุดยึด",
		anchorName		: "ตามชื่อจุดยึด",
		anchorId		: "ตาม Id อิลิเมนต์",
		emailAddress	: "อีเมลแอดเดรส",
		emailSubject	: "เรื่องข้อความ",
		emailBody		: "เนื้อความ",
		noAnchors		: "ไม่มีบุ๊กมาร์กอยู่ในเอกสาร คลิกไอคอน 'Insert Document Bookmark' บนแถบเครื่องมือเพื่อเพิ่มบุ๊กมาร์ก",
		noUrl			: "โปรดพิมพ์ URLลิงก์",
		noEmail			: "โปรดพิมพ์อีเมลแอดเดรส"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "แทรกบุ๊กมาร์กเอกสาร",
		menu		: "แก้ไขบุ๊กมาร์กเอกสาร",
		title		: "บุ๊กมาร์กเอกสาร",
		name		: "ชื่อ:",
		errorName	: "โปรดป้อนชื่อสำหรับบุ๊กมาร์กเอกสาร",
		remove		: "ลบบุ๊กมาร์กเอกสารออก"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "คุณสมบัติรายการหัวข้อ",
		bulletedTitle		: "คุณสมบัติรายการสัญลักษณ์แสดงหัวข้อย่อย",
		type				: "แสดงรายการลักษณะ:",
		start				: "เริ่มต้น:",
		validateStartNumber				:"หมายเลขเริ่มต้นของรายการต้องเป็นเลขจำนวนเต็ม",
		circle				: "วงกลม",
		disc				: "ดิสก์",
		square				: "สี่เหลี่ยมจตุรัส",
		none				: "ไม่กำหนด",
		notset				: "<ไม่ได้ตั้งค่า>",
		armenian			: "ลำดับตัวเลขแบบอาร์เมเนีย",
		georgian			: "ลำดับตัวเลขแบบจอร์เจีย (an, ban, gan และอื่นๆ)",
		lowerRoman			: "อักษรโรมันตัวพิมพ์เล็ก (i, ii, iii, iv, v และอื่นๆ)",
		upperRoman			: "อักษรโรมันตัวพิมพ์ใหญ่ (I, II, III, IV, V และอื่นๆ)",
		lowerAlpha			: "อักษรตัวพิมพ์เล็ก (a, b, c, d, e และอื่นๆ)",
		upperAlpha			: "อักษรตัวพิมพ์ใหญ่ (A, B, C, D, E และอื่นๆ)",
		lowerGreek			: "อักษรกรีกตัวพิมพ์เล็ก (alpha, beta, gamma และอื่นๆ)",
		decimal				: "ทศนิยม (1, 2, 3 และอื่นๆ)",
		decimalLeadingZero	: "ทศนิยมที่มีศูนย์นำหน้า (01, 02, 03 และอื่นๆ)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "ค้นหาและแทนที่",
		find				: "ค้นหา",
		replace				: "แทนที่",
		findWhat			: "ค้นหา:",
		replaceWith			: "แทนที่ด้วย:",
		notFoundMsg			: "ไม่พบข้อความที่ระบุ",
		findOptions			: "ค้นหาอ็อพชัน",
		matchCase			: "ตรงตามตัวพิมพ์ใหญ่เล็ก",
		matchWord			: "ตรงกันทั้งคำ",
		matchCyclic			: "ตรงกันแบบ cyclic",
		replaceAll			: "แทนที่ทั้งหมด",
		replaceSuccessMsg	: "แทนที่ %1 ครั้ง"
	},

	// Table Dialog
	table :
	{
		toolbar		: "แทรกตาราง",
		title		: "ตาราง",
		menu		: "คุณสมบัติตาราง",
		deleteTable	: "ลบตาราง",
		rows		: "แถว:",
		columns		: "คอลัมน์:",
		border		: "ขนาดเส้นขอบ:",
		widthPx		: "พิกเซล",
		widthPc		: "เปอร์เซ็นต์",
		widthUnit	: "หน่วยความกว้าง:",
		cellSpace	: "ระยะห่างเซลล์:",
		cellPad		: "การเสริมเต็มเซลล์:",
		caption		: "คำบรรยาย:",
		summary		: "ข้อมูลสรุป:",
		headers		: "ส่วนหัว:",
		headersNone		: "ไม่กำหนด",
		headersColumn	: "คอลัมน์แรก",
		headersRow		: "แถวแรก",
		headersBoth		: "ทั้งสอง",
		invalidRows		: "จำนวนแถวต้องเป็นจำนวนเต็มที่มากกว่าศูนย์",
		invalidCols		: "จำนวนคอลัมน์ต้องเป็นจำนวนเต็มที่มากกว่าศูนย์",
		invalidBorder	: "ขนาดเส้นขอบต้องเป็นจำนวนเต็มบวก",
		invalidWidth	: "ความกว้างของตารางต้องเป็นจำนวนเต็มบวก",
		invalidHeight	: "ความสูงของตารางต้องเป็นจำนวนเต็มบวก",
		invalidCellSpacing	: "ระยะห่างเซลล์ต้องเป็นจำนวนเต็มบวก",
		invalidCellPadding	: "ส่วนเสริมเซลล์ต้องเป็นจำนวนเต็มบวก",

		cell :
		{
			menu			: "เซลล์",
			insertBefore	: "แทรกเซลล์ก่อนหน้า",
			insertAfter		: "แทรกเซลล์หลัง",
			deleteCell		: "ลบเซลล์",
			merge			: "ผสานเซลล์",
			mergeRight		: "ผสานด้านขวา",
			mergeDown		: "ผสานด้านล่าง",
			splitHorizontal	: "แบ่งเซลล์แนวนอน",
			splitVertical	: "แบ่งเซลล์แนวดิ่ง",
			title			: "คุณสมบัติเซลล์",
			cellType		: "ประเภทเซลล์:",
			rowSpan			: "ช่วงห่างแถว:",
			colSpan			: "ช่วงห่างคอลัมน์:",
			wordWrap		: "การตัดคำ:",
			hAlign			: "การจัดตำแหน่งแนวนอน:",
			vAlign			: "การจัดตำแหน่งแนวดิ่ง:",
			alignBaseline	: "เส้นอ้างอิง",
			bgColor			: "สีพื้นหลัง:",
			borderColor		: "สีเส้นขอบ:",
			data			: "ข้อมูล",
			header			: "ส่วนหัว",
			yes				: "ใช่",
			no				: "ไม่",
			invalidWidth	: "ความกว้างของเซลล์ต้องเป็นจำนวนเต็มบวก",
			invalidHeight	: "ความสูงของเซลล์ต้องเป็นจำนวนเต็มบวก",
			invalidRowSpan	: "การแตกแถวต้องเป็นจำนวนเต็มบวก",
			invalidColSpan	: "การแตกแถวคอลัมน์ต้องเป็นจำนวนเต็มบวก",
			chooseColor 	: "สีเพิ่มเติม..."
		},

		row :
		{
			menu			: "แถว",
			insertBefore	: "แทรกแถวก่อน",
			insertAfter		: "แทรกแถวหลัง",
			deleteRow		: "ลบแถว"
		},

		column :
		{
			menu			: "คอลัมน์",
			insertBefore	: "แทรกคอลัมน์ก่อนหน้า",
			insertAfter		: "แทรกคอลัมน์หลัง",
			deleteColumn	: "ลบคอลัมน์"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "คุณสมบัติปุ่ม",
		text		: "ข้อความ (ค่า):",
		type		: "ประเภท:",
		typeBtn		: "ปุ่ม",
		typeSbm		: "ส่ง",
		typeRst		: "รีเซ็ต"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "คุณสมบัติเช็กบ็อกซ์",
		radioTitle	: "คุณสมบัติปุ่มแบบเรดิโอ",
		value		: "ค่า:",
		selected	: "ถูกเลือก"
	},

	// Form Dialog.
	form :
	{
		title		: "แทรกฟอร์ม",
		menu		: "คุณสมบัติฟอร์ม",
		action		: "การดำเนินการ:",
		method		: "เมธอด:",
		encoding	: "การเข้ารหัส:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "เลือกคุณสมบัติฟิลด์",
		selectInfo	: "เลือกข้อมูล",
		opAvail		: "อ็อพชันที่มีอยู่",
		value		: "ค่า:",
		size		: "ขนาด:",
		lines		: "บรรทัด",
		chkMulti	: "อนุญาตการเลือกหลายตำแหน่ง",
		opText		: "ข้อความ:",
		opValue		: "ค่า:",
		btnAdd		: "เพิ่ม",
		btnModify	: "แก้ไข",
		btnUp		: "ขึ้น",
		btnDown		: "ลบ",
		btnSetValue : "ตั้งเป็นค่าที่เลือก",
		btnDelete	: "ลบ"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "คุณสมบัติ Textarea",
		cols		: "คอลัมน์:",
		rows		: "แถว:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "คุณสมบัติฟิลด์ข้อความ",
		name		: "ชื่อ:",
		value		: "ค่า:",
		charWidth	: "ความกว้างอักขระ:",
		maxChars	: "จำนวนอักขระสูงสุด:",
		type		: "ประเภท:",
		typeText	: "ข้อความ",
		typePass	: "รหัสผ่าน"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "คุณสมบัติฟิลด์ที่ซ่อน",
		name	: "ชื่อ:",
		value	: "ค่า:"
	},

	// Image Dialog.
	image :
	{
		title		: "รูปภาพ",
		titleButton	: "คุณสมบัติปุ่มรูปภาพ",
		menu		: "คุณสมบัติรูปภาพ",
		infoTab	: "ข้อมูลรูปภาพ",
		btnUpload	: "อัพโหลดรูปภาพ",
		upload	: "อัพโหลด",
		alt		: "ข้อความแสดงแทน:",
		lockRatio	: "ล็อกอัตราส่วน",
		resetSize	: "รีเซ็ตขนาด",
		border	: "เส้นขอบ:",
		hSpace	: "ช่องว่างแนวนอน:",
		vSpace	: "ช่องว่างแนวดิ่ง:",
		alertUrl	: "โปรดพิมพ์ URL รูปภาพ",
		linkTab	: "ลิงก์์",
		button2Img	: "คุณต้องการแปลงปุ่มรูปภาพที่เลือกเป็นรูปแบบแบบธรรมดาหรือไม่?",
		img2Button	: "คุณต้องการแปลงรูปภาพที่เลือกเป็นปุ่มรูปภาพหรือไม่?",
		urlMissing : "URL ซอร์สรูปภาพสูญหาย",
		validateBorder : "เส้นขอบต้องเป็นจำนวนเต็มบวก",
		validateHSpace : "พื้นที่ตามแนวนอนต้องเป็นจำนวนเต็มบวก",
		validateVSpace : "พื้นที่ตามแนวตั้งต้องเป็นจำนวนเต็มบวก"
	},

	// Flash Dialog
	flash :
	{
		properties		: "คุณสมบัติ Flash",
		propertiesTab	: "คุณสมบัติ",
		title		: "Flash",
		chkPlay		: "เล่นอัตโนมัติ",
		chkLoop		: "วนซ้ำ",
		chkMenu		: "เปิดใช้งานเมนู Flash",
		chkFull		: "อนุญาตให้เปิดเต็มหน้าจอ",
 		scale		: "มาตราส่วน:",
		scaleAll		: "แสดงทั้งหมด",
		scaleNoBorder	: "ไม่มีเส้นขอบ",
		scaleFit		: "พอดี",
		access			: "เข้าถึงสคริปต์:",
		accessAlways	: "เสมอ",
		accessSameDomain	: "โดเมนเดียวกัน",
		accessNever	: "ไม่เคย",
		alignAbsBottom: "Abs ด้านล่าง",
		alignAbsMiddle: "Abs กึ่งกลาง",
		alignBaseline	: "เส้นอ้างอิง",
		alignTextTop	: "ข้อความด้านบน",
		quality		: "คุณภาพ:",
		qualityBest	: "ดีเยี่ยม",
		qualityHigh	: "สูง",
		qualityAutoHigh	: "สูงอัตโนมัติ",
		qualityMedium	: "กลาง",
		qualityAutoLow	: "ต่ำอัตโนมัติ",
		qualityLow	: "ต่ำ",
		windowModeWindow	: "หน้าต่าง",
		windowModeOpaque	: "ทึบแสง",
		windowModeTransparent	: "โปร่งใส",
		windowMode	: "โหมดหน้าต่าง:",
		flashvars	: "ตัวแปร:",
		bgcolor	: "สีพื้นหลัง:",
		hSpace	: "ช่องว่างแนวนอน:",
		vSpace	: "ช่องว่างแนวดิ่ง:",
		validateSrc : "URL ต้องไม่ว่าง",
		validateHSpace : "พื้นที่ตามแนวนอนต้องเป็นจำนวนเต็มบวก",
		validateVSpace : "พื้นที่ตามแนวตั้งต้องเป็นจำนวนเต็มบวก"
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "ตรวจสอบการสะกดคำ",
		title			: "ตรวจสอบการสะกดคำ",
		notAvailable	: "ขอแสดงความเสียใจ ขณะนี้ยังไม่พร้อมให้บริการ",
		errorLoading	: "เกิดข้อผิดพลาดในการโหลดแอ็พพลิเคชันเซอร์วิสโฮสต์: %s",
		notInDic		: "ไม่อยู่ในพจนานุกรม",
		changeTo		: "เปลี่ยนเป็น",
		btnIgnore		: "ละเว้น",
		btnIgnoreAll	: "ละเว้นทั้งหมด",
		btnReplace		: "แทนที่",
		btnReplaceAll	: "แทนที่ทั้งหมด",
		btnUndo			: "เลิกทำ",
		noSuggestions	: "- ไม่มีข้อเสนอแนะ -",
		progress		: "กำลังดำเนินการตรวจสอบการสะกดคำ...",
		noMispell		: "การตรวจสอบการสะกดคำเสร็จสิ้น: ไม่พบการสะกดคำผิด",
		noChanges		: "การตรวจสอบการสะกดคำเสร็จสิ้น: ไม่มีคำถูกเปลี่ยนแปลง",
		oneChange		: "การตรวจสอบการสะกดคำเสร็จสิ้น: ถูกเปลี่ยนหนึ่งคำ",
		manyChanges		: "การตรวจสอบการสะกดคำเสร็จสิ้น: ถูกเปลี่ยน %1 คำ",
		ieSpellDownload	: "ไม่ได้ติดตั้งตัวตรวจสอบการสะกด คุณต้องการดาวน์โหลดตอนนี้?"
	},

	smiley :
	{
		toolbar	: "แทรกไอคอนแสดงอารมณ์",
		title	: "ไอคอนแสดงอารมณ์",
		options : "อ็อพชันไอคอนแสดงอารมณ์"
	},

	elementsPath :
	{
		eleLabel : "พาธอิลิเมนต์",
		eleTitle : "%1 อิลิเมนต์"
	},

	numberedlist : "รายการแสดงหมายเลข",
	bulletedlist : "รายการแสดงสัญลักษณ์แสดงหัวข้อย่อย",
	indent : "เพิ่มย่อหน้า",
	outdent : "ลดย่อหน้า",

	justify :
	{
		left : "ชิดขอบซ้าย",
		center : "จัดแนวกึ่งกลาง",
		right : "ชิดขอบขวา",
		block : "ชิดซ้ายขวา"
	},

	blockquote : "บล็อกคำพูด",

	clipboard :
	{
		title		: "วาง",
		cutError	: "การตั้งค่าการรักษาความปลอดภัยเบราว์เซอร์ของคุณป้องกันมิให้ตัดค่าโดยอัตโนมัติ ใช้ Ctrl+X บนคีย์บอร์ดของคุณแทน",
		copyError	: "การตั้งค่าการรักษาความปลอดภัยเบราว์เซอร์ของคุณป้องกันการคัดลอกอัตโนมัติ ใช้ Ctrl+C บนคีย์บอร์ดของคุณแทน",
		pasteMsg	: "กด Ctrl+V (Cmd+V บน MAC) เพื่อวางด้านล่าง",
		securityMsg	: "การรักษาความปลอดภัยเบราว์เซอร์ของคุณบล็อกการวางโดยตรงจากคลิปบอร์ด",
		pasteArea	: "วางพื้นที่"
	},

	pastefromword :
	{
		confirmCleanup	: "ข้อความที่คุณต้องการวางถูกคัดลอกมาจาก Word คุณต้องการล้างรูปแบบก่อนวางหรือไม่?",
		toolbar			: "วางแบบพิเศษ",
		title			: "วางแบบพิเศษ",
		error			: "ไม่สามารถล้างค่าข้อมูลที่วางได้เนื่องจากมีข้อผิดพลาดภายใน"
	},

	pasteText :
	{
		button	: "วางแบบข้อความธรรมดา",
		title	: "วางแบบข้อความธรรมดา"
	},

	templates :
	{
		button 			: "เทมเพลต",
		title : "เทมเพลตเนื้อหา",
		options : "อ็อพชันเทมเพลต",
		insertOption: "แทนที่เนื้อหาจริง",
		selectPromptMsg: "เลือกเทมเพลตเพื่อเปิดในเอดิเตอร์",
		emptyListMsg : "(ไม่มีเทมเพลตถูกกำหนด)"
	},

	showBlocks : "แสดงบล็อก",

	stylesCombo :
	{
		label		: "ลักษณะ",
		panelTitle 	: "ลักษณะ",
		panelTitle1	: "ลักษณะบล็อก",
		panelTitle2	: "ลักษณะอินไลน์",
		panelTitle3	: "ลักษณะอ็อบเจ็กต์"
	},

	format :
	{
		label		: "รูปแบบ",
		panelTitle	: "รูปแบบย่อหน้า",

		tag_p		: "ปกติ",
		tag_pre		: "จัดรูปแบบ",
		tag_address	: "ที่อยู่",
		tag_h1		: "ส่วนหัว 1",
		tag_h2		: "ส่วนหัว 2",
		tag_h3		: "ส่วนหัว 3",
		tag_h4		: "ส่วนหัว 4",
		tag_h5		: "ส่วนหัว 5",
		tag_h6		: "ส่วนหัว 6",
		tag_div		: "ปกติ (DIV)"
	},

	div :
	{
		title				: "สร้างคอนเทนเนอร์ Div",
		toolbar				: "สร้างคอนเทนเนอร์ Div",
		cssClassInputLabel	: "คลาสสไตล์ชีต",
		styleSelectLabel	: "ลักษณะ",
		IdInputLabel		: "Id",
		languageCodeInputLabel	: " รหัสภาษา",
		inlineStyleInputLabel	: "ลักษณะอินไลน์",
		advisoryTitleInputLabel	: "หัวเรื่องแนะนำ",
		langDirLabel		: "ทิศทางของภาษา",
		langDirLTRLabel		: "ซ้ายไปขวา (LTR)",
		langDirRTLLabel		: "ขวาไปซ้าย (RTL)",
		edit				: "แก้ไข Div",
		remove				: "ลบ Div"
  	},

	iframe :
	{
		title		: "คุณสมบัติ IFrame",
		toolbar		: "แทรก IFrame",
		noUrl		: "โปรดพิมพ์ iframe URL",
		scrolling	: "เปิดใช้งานการเลื่อน",
		border		: "แสดงเส้นขอบของกรอบ"
	},

	font :
	{
		label		: "ฟอนต์",
		voiceLabel	: "ฟอนต์",
		panelTitle	: "ชื่อฟอนต์"
	},

	fontSize :
	{
		label		: "ขนาด",
		voiceLabel	: "ขนาดฟอนต์",
		panelTitle	: "ขนาดฟอนต์"
	},

	colorButton :
	{
		textColorTitle	: "สีข้อความ",
		bgColorTitle	: "สีพื้นหลัง",
		panelTitle		: "สี",
		auto			: "อัตโนมัติ",
		more			: "สีเพิ่มเติม..."
	},

	colors :
	{
		"000" : "ดำ",
		"800000" : "แดงเลือดนก",
		"8B4513" : "น้ำตาลอานม้า",
		"2F4F4F" : "เทานวลเข้ม",
		"008080" : "เขียวหัวเป็ด",
		"000080" : "กรมท่า",
		"4B0082" : "คราม",
		"696969" : "เทาเข้ม",
		"B22222" : "อิฐน้ำตาลแดง",
		"A52A2A" : "น้ำตาล",
		"DAA520" : "ทองเข้ม",
		"006400" : "เขียมเข้ม",
		"40E0D0" : "ฟ้าเทอร์คอยส์",
		"0000CD" : "น้ำเงินปานกลาง",
		"800080" : "ม่วง",
		"808080" : "เทา",
		"F00" : "แดง",
		"FF8C00" : "ส้มเข้ม",
		"FFD700" : "ทอง",
		"008000" : "สีเขียว",
		"0FF" : "เขียวแกมน้ำเงิน",
		"00F" : "น้ำเงิน",
		"EE82EE" : "ม่วงไวโอเล็ต",
		"A9A9A9" : "เทาหม่น",
		"FFA07A" : "เนื้อแซลมอนสว่าง",
		"FFA500" : "ส้ม",
		"FFFF00" : "เหลือง",
		"00FF00" : "เขียวมะนาว",
		"AFEEEE" : "ฟ้าเทอร์คอยส์จาง",
		"ADD8E6" : "น้ำเงินสว่าง",
		"DDA0DD" : "พลัม",
		"D3D3D3" : "เทาอ่อน",
		"FFF0F5" : "ลาเวนเดอร์บลัช",
		"FAEBD7" : "ขาวแอนทีค",
		"FFFFE0" : "เหลืองสว่าง",
		"F0FFF0" : "เขียวแตงอ่อน",
		"F0FFFF" : "ฟ้าอ่อน",
		"F0F8FF" : "น้ำเงินสว่าง",
		"E6E6FA" : "ลาเวนเดอร์",
		"FFF" : "ขาว"
	},

	scayt :
	{
		title			: "ตรวจสอบการสะกดคำขณะพิมพ์",
		opera_title		: "ไม่สนับสนุนโดย Opera",
		enable			: "เปิดใช้งาน SCAYT",
		disable			: "ปิดใช้งาน SCAYT",
		about			: "เกี่ยวกับ SCAYT",
		toggle			: "สลับ SCAYT",
		options			: "อ็อพชัน",
		langs			: "ภาษา",
		moreSuggestions	: "ข้อเสนอแนะเพิ่มเติม",
		ignore			: "ละเว้น",
		ignoreAll		: "ละเว้นทั้งหมด",
		addWord			: "เพิ่มคำ",
		emptyDic		: "ชื่อพจนานุกรมไม่ควรว่าง",

		optionsTab		: "อ็อพชัน",
		allCaps			: "ข้ามคำที่เป็นตัวพิมพ์ใหญ่ทั้งหมด",
		ignoreDomainNames : "ข้ามโดเมนเนม",
		mixedCase		: "ข้ามคำที่มีตัวพิมพ์ใหญ่เล็กรวมกัน",
		mixedWithDigits	: "ข้ามคำที่มีตัวเลข",

		languagesTab	: "ภาษา",

		dictionariesTab	: "พจนานุกรม",
		dic_field_name	: "ชื่อพจนานุกรม",
		dic_create		: "สร้าง",
		dic_restore		: "เรียกคืน",
		dic_delete		: "ลบ",
		dic_rename		: "เปลี่ยนชื่อ",
		dic_info		: "ในตอนเริ่มแรกพจนานุกรมผู้ใช้ถูกเก็บในคุกกี้ อย่างไรก็ตาม คุกกี้มีขนาดที่จำกัด เมื่อพจนานุกรมผู้ใช้ขยายใหญ่ขึ้นจนถึงจุดที่ไม่สามารถเก็บในคุกกี้ได้ ดังนั้นพจนานุกรมอาจถูกเก็บบนเซิร์ฟเวอร์ของเรา เมื่อต้องการเรียกคืนพจนานุกรมส่วนบุคคลของคุณบนเซิร์ฟเวอร์ของเรา คุณควรระบุชื่อสำหรับพจนานุกรมของคุณ ถ้าคุณมีพจนานุกรมที่เก็บอยู่แล้ว โปรดพิมพ์ชื่อและคลิกปุ่ม Restore",

		aboutTab		: "เกี่ยวกับ"
	},

	about :
	{
		title		: "เกี่ยวกับ CKEditor",
		dlgTitle	: "เกี่ยวกับ CKEditor",
		help	: "ตรวจสอบ $1 สำหรับวิธีใช้",
		userGuide : "คู่มือผู้ใช้ CKEditor",
		moreInfo	: "สำหรับข้อมูลเกี่ยวกับไลเซนส์โปรดเยี่ยมชมที่เว็บไซต์ของเรา:",
		copy		: "ลิขสิทธิ์ &copy; $1 สงวนสิทธิ์ทั้งหมด"
	},

	maximize : "ขยายให้ใหญ่สุด",
	minimize : "ย่อขนาดเล็กสุด",

	fakeobjects :
	{
		anchor	: "จุดยึด",
		flash	: "ภาพเคลื่อนไหว Flash",
		iframe		: "IFrame",
		hiddenfield	: "ฟิลด์ที่ซ่อนไว้",
		unknown	: "อ็อบเจ็กต์ที่ไม่รู้จัก"
	},

	resize : "ลากเพื่อปรับขนาด",

	colordialog :
	{
		title		: "เลือกสี",
		options	:	"อ็อพชันสี",
		highlight	: "ไฮไลต์",
		selected	: "สีที่เลือกไว้",
		clear		: "เคลียร์"
	},

	toolbarCollapse	: "ยุบแถบเครื่องมือ",
	toolbarExpand	: "ขยายแถบเครื่องมือ",

	toolbarGroups :
	{
		document : "เอกสาร",
		clipboard : "คลิปบอร์ด/เลิกทำ",
		editing : "การแก้ไข",
		forms : "ฟอร์ม",
		basicstyles : "ลักษณะระดับต้น",
		paragraph : "ย่อหน้า",
		links : "ลิงก์",
		insert : "แทรก",
		styles : "ลักษณะ",
		colors : "สี",
		tools : "เครื่องมือ"
	},

	bidi :
	{
		ltr : "ทิศทางของข้อความจากซ้ายไปขวา",
		rtl : "ทิศทางของข้อความจากขวาไปซ้าย"
	},

	docprops :
	{
		label : "คุณสมบัติของเอกสาร",
		title : "คุณสมบัติของเอกสาร",
		design : "ออกแบบ",
		meta : "แท็กเมตา",
		chooseColor : "เลือก",
		other : "อื่นๆ...",
		docTitle :	"หัวเรื่องของหน้า",
		charset : 	"การเข้ารหัสชุดอักขระ",
		charsetOther : "การเข้ารหัสชุดอักขระอื่นๆ",
		charsetASCII : "ASCII",
		charsetCE : "ยุโรปกลาง",
		charsetCT : "จีนดั้งเดิม (Big5)",
		charsetCR : "ภาษาซีริลลิค",
		charsetGR : "ภาษากรีก",
		charsetJP : "ภาษาญี่ปุ่น",
		charsetKR : "ภาษาเกาหลี",
		charsetTR : "ภาษาตุรกี",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "ยูโรปตะวันตก",
		docType : "ส่วนหัวประเภทเอกสาร",
		docTypeOther : "ส่วนหัวประเภทเอกสารอื่น",
		xhtmlDec : "สอดแทรกการประกาศ XHTML",
		bgColor : "สีพื้นหลัง",
		bgImage : "URL อิมเมจพื้นหลัง",
		bgFixed : "พื้นหลังที่ไม่มีการเลื่อน (แก้ไขแล้ว)",
		txtColor : "สีข้อความ",
		margin : "ขอบหน้า",
		marginTop : "บน",
		marginLeft : "ซ้าย",
		marginRight : "ขวา",
		marginBottom : "ล่าง",
		metaKeywords : "คีย์เวิร์ดการทำดัชนีเอกสาร (คั่นด้วยเครื่องหมายคอมมา)",
		metaDescription : "คำอธิบายเอกสาร",
		metaAuthor : "ผู้เขียน",
		metaCopyright : "ลิขสิทธิ์",
		previewHtml : "<p>นี้คือ <strong>ข้อความตัวอย่าง</strong> บางส่วน คุณกำลังใช้ <a href=\"javascript:void(0)\">CKEditor</a></p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "นิ้ว",
			widthCm	: "เซนติเมตร",
			widthMm	: "มิลลิเมตร",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "จุด",
			widthPc	: "พิกา",
			required : "จำเป็น"
		},
		table :
		{
			createTable : 'แทรกตาราง',
			heightUnit	: "หน่วยความสูง:",
			insertMultipleRows : "แทรกแถว",
			insertMultipleCols : "แทรกคอลัมน์",
			noOfRows : "จำนวนของแถว:",
			noOfCols : "จำนวนของคอลัมน์:",
			insertPosition : "ตำแหน่ง:",
			insertBefore : "ก่อน",
			insertAfter : "หลัง",
			selectTable : "เลือกตาราง",
			selectRow : "เลือกแถว",
			columnTitle : "ความกว้างคอลัมน์",
			colProps : "คุณสมบัติคอลัมน์",
			invalidColumnWidth	: "ความกว้างคอลัมน์ต้องเป็นจำนวนเต็มบวก",
			fixedColWidths : "ความกว้างคอลัมน์คงที่"
		},
		cell :
		{
			title : "เซลล์"
		},
		colordialog :
		{
			currentColor	: "สีปัจจุบัน"
		},
		emoticon :
		{
			angel		: "เทวดา",
			angry		: "โกรธ",
			cool		: "เจ๋ง",
			crying		: "ร้องไห้",
			eyebrow		: "คิ้ว",
			frown		: "หน้าบึ้ง",
			goofy		: "น่าขำ",
			grin		: "ยิ้มยิงฟัน",
			half		: "ครึ่ง",
			idea		: "ไอเดีย",
			laughing	: "กำลังหัวเราะ",
			laughroll	: "นอนกลิ้งหัวเราะ",
			no			: "ไม่",
			oops		: "อุ๊บ",
			shy			: "อาย",
			smile		: "ยิ้ม",
			tongue		: "แลบลิ้น",
			wink		: "ขยิบตา",
			yes			: "ใช่"
		},

		menu :
		{
			link	: "แทรกลิงก์",
			list	: "ลิสต์",
			paste	: "วาง",
			action	: "การดำเนินการ",
			align	: "จัดแนว",
			emoticon: "ไอคอนแสดงอารมณ์"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "รายการแสดงหมายเลข",
			bulletedTitle		: "รายการแสดงสัญลักษณ์แสดงหัวข้อย่อย",
			description			: "ค่าติดตั้งจะใช้กับระดับรายการปัจจุบัน",
			fontsize			: "ขนาดฟอนต์:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "พิมพ์ชื่อบุ๊กมาร์กแบบอธิบาย เช่น 'Section 1.2' หลังจากแทรกบุ๊กมาร์ก คลิก 'Link' หรือ 'Document Bookmark Link' เพื่อลิงก์กับบุ๊กมาร์ก",
			title		: "ลิงก์บุ๊กมาร์กเอกสาร",
			linkTo		: "ลิงก์ไปยัง:"
		},

		urllink :
		{
			title : "ลิงก์ URL",
			linkText : "ลิงก์ข้อความ:",
			selectAnchor: "เลือกตัวยึด:",
			nourl: "โปรดป้อน URL ลงในฟิลด์ข้อความ",
			urlhelp: "พิมพ์หรือวาง URL ที่จะเปิดเมื่อผู้ใช้คลิกลิงก์นี้ ตัวอย่างเช่น http://www.example.com",
			displaytxthelp: "พิมพ์ข้อความที่แสดงสำหรับลิงก์",
			openinnew : "เปิดลิงก์ในหน้าต่างใหม่"
		},

		spellchecker :
		{
			title : "การตรวจการสะกดคำ",
			replace : "แทนที่:",
			suggesstion : "ข้อเสนอแนะ:",
			withLabel : "ด้วย:",
			replaceButton : "แทนที่",
			replaceallButton:"แทนที่ทั้งหมด",
			skipButton:"ข้าม",
			skipallButton: "ข้ามทั้งหมด",
			undochanges: "เลิกทำการเปลี่ยนแปลง",
			complete: "การตรวจสอบการสะกดคำเสร็จสิ้น",
			problem: "มีปัญหาในการเรียกข้อมูล XML",
			addDictionary: "เพิ่มในพจนานุกรม",
			editDictionary: "แก้ไขพจนานุกรม"
		},

		status :
		{
			keystrokeForHelp: "กด ALT 0 เพื่อดูวิธีใช้"
		},

		linkdialog :
		{
			label : "ลิงก์ไดอะล็อก"
		},

		imagedatauri :
		{
			error : "ขณะนี้การวางรูปภาพไม่สามารถใช้ได้ โปรดใช้อ็อพชันแถบเครื่องมือ \'Insert Image\' แทน"
		},

		image :
		{
			previewText : "ข้อความจะเรียงล้อมรอบรูปภาพที่คุณกำลังเพิ่มเหมือนในตัวอย่างนี้",
			fileUpload : "เลือกไฟล์รูปภาพจากคอมพิวเตอร์ของคุณ:"
		}
	}

};
