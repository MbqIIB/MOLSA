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

CKEDITOR.lang["el"] =
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
	editorTitle : "Rich Text Editor, %1 - Πατήστε ALT 0 για βοήθεια.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Γραμμές εργαλείων προγράμματος σύνταξης",
	editor	: "Πρόγραμμα σύνταξης εμπλουτισμένου κειμένου",

	// Toolbar buttons without dialogs.
	source			: "Προέλευση",
	newPage			: "Νέα σελίδα",
	save			: "Αποθήκευση",
	preview			: "Προεπισκόπηση:",
	cut				: "Αποκοπή",
	copy			: "Αντιγραφή",
	paste			: "Επικόλληση",
	print			: "Εκτύπωση",
	underline		: "Υπογράμμιση",
	bold			: "Έντονη γραφή",
	italic			: "Πλάγια γραφή",
	selectAll		: "Επιλογή όλων",
	removeFormat	: "Αφαίρεση μορφοποίησης",
	strike			: "Διαγράμμιση",
	subscript		: "Δείκτης",
	superscript		: "Εκθέτης",
	horizontalrule	: "Εισαγωγή οριζόντιας γραμμής",
	pagebreak		: "Εισαγωγή αλλαγής σελίδας",
	pagebreakAlt		: "Αλλαγή σελίδας",
	unlink			: "Αφαίρεση διασύνδεσης",
	undo			: "Αναίρεση",
	redo			: "Ακύρωση αναίρεσης",

	// Common messages and labels.
	common :
	{
		browseServer	: "Αναζήτηση εξυπηρετητή:",
		url				: "Διεύθυνση URL:",
		protocol		: "Πρωτόκολλο:",
		upload			: "Μεταφόρτωση:",
		uploadSubmit	: "Αποστολή στον εξυπηρετητή",
		image			: "Εισαγωγή εικόνας",
		flash			: "Εισαγωγή ταινίας Flash",
		form			: "Εισαγωγή φόρμας",
		checkbox		: "Εισαγωγή τετραγωνιδίου επιλογής",
		radio			: "Εισαγωγή κουμπιού επιλογής",
		textField		: "Εισαγωγή πεδίου κειμένου",
		textarea		: "Εισαγωγή περιοχής κειμένου",
		hiddenField		: "Εισαγωγή κρυφού αρχείου",
		button			: "Εισαγωγή κουμπιού",
		select			: "Εισαγωγή πεδίου επιλογής",
		imageButton		: "Εισαγωγή κουμπιού εικόνας",
		notSet			: "<δεν έχει οριστεί>",
		id				: "Ταυτότητα:",
		name			: "Όνομα:",
		langDir			: "Κατεύθυνση γλώσσας:",
		langDirLtr		: "Από αριστερά προς δεξιά",
		langDirRtl		: "Από δεξιά προς αριστερά",
		langCode		: "Κωδικός γλώσσας:",
		longDescr		: "Διεύθυνση URL αναλυτικής περιγραφής:",
		cssClass		: "Κλάσεις φύλλων στυλ:",
		advisoryTitle	: "Πληροφοριακός τίτλος:",
		cssStyle		: "Στυλ:",
		ok				: "ΟΚ",
		cancel			: "Ακύρωση",
		close : "Κλείσιμο",
		preview			: "Προεπισκόπηση:",
		generalTab		: "Γενικά",
		advancedTab		: "Σύνθετες επιλογές",
		validateNumberFailed	: "Αυτή η τιμή δεν είναι αριθμός.",
		confirmNewPage	: "Οι μη αποθηκευμένες αλλαγές σε αυτό το περιεχόμενο θα χαθούν. Είστε βέβαιοι ότι θέλετε να φορτώσετε μια νέα σελίδα;",
		confirmCancel	: "Ορισμένες επιλογές έχουν αλλάξει. Είστε βέβαιοι ότι θέλετε να κλείσετε το παράθυρο διαλόγου;",
		options : "Επιλογές",
		target			: "Προορισμός:",
		targetNew		: "Νέο παράθυρο (_blank)",
		targetTop		: "Παράθυρο σε πρώτο πλάνο (_top)",
		targetSelf		: "Ίδιο παράθυρο (_self)",
		targetParent	: "Γονικό παράθυρο (_parent)",
		langDirLTR		: "Από αριστερά προς δεξιά",
		langDirRTL		: "Από δεξιά προς αριστερά",
		styles			: "Στυλ:",
		cssClasses		: "Κλάσεις φύλλων στυλ:",
		width			: "Πλάτος:",
		height			: "Ύψος:",
		align			: "Στοίχιση:",
		alignLeft		: "Αριστερά",
		alignRight		: "Δεξιά",
		alignCenter		: "Στο κέντρο",
		alignTop		: "Πάνω",
		alignMiddle		: "Στο κέντρο",
		alignBottom		: "Κάτω",
		invalidHeight	: "Η τιμή για το ύψος πρέπει να είναι θετικός ακέραιος αριθμός.",
		invalidWidth	: "Η τιμή για το πλάτος πρέπει να είναι θετικός ακέραιος αριθμός.",
		invalidCssLength	: "Η τιμή για το πεδίο '%1' πρέπει να είναι ένας θετικός αριθμός με ή χωρίς μια έγκυρη μονάδα μέτρησης CSS (px, %, in, cm, mm, em, ex, pt ή pc).",
		invalidHtmlLength	: "Η τιμή για το πεδίο '%1' πρέπει να είναι ένας θετικός αριθμός με ή χωρίς μια έγκυρη μονάδα μέτρησης HTML (px ή %).",
		invalidInlineStyle	: "Η τιμή για το εσωτερικό στυλ πρέπει να αποτελείται από ένα η περισσότερα ζεύγη (πλειάδες) της μορφής \"όνομα : τιμή\" που θα χωρίζονται με ερωτηματικό (;).",
		cssLengthTooltip	: "Καταχωρήστε έναν αριθμό εικονοστοιχείων ή έναν αριθμό με μια έγκυρη μονάδα μέτρησης CSS (px, %, in, cm, mm, em, ex, pt ή pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\"> - Δεν είναι διαθέσιμο.</span>"
	},

	contextmenu :
	{
		options : "Επιλογές μενού περιβάλλοντος"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Εισαγωγή ειδικού χαρακτήρα",
		title		: "Ειδικός χαρακτήρας",
		options : "Επιλογές ειδικών χαρακτήρων"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Διεύθυνση URL διασύνδεσης",
		other 		: "<άλλο>",
		menu		: "Τροποποίηση διασύνδεσης",
		title		: "Διασύνδεση",
		info		: "Πληροφορίες διασύνδεσης",
		target		: "Προορισμός",
		upload		: "Μεταφόρτωση:",
		advanced	: "Σύνθετες επιλογές",
		type		: "Είδος διασύνδεσης:",
		toUrl		: "Διεύθυνση URL",
		toAnchor	: "Διασύνδεση με άγκυρα στο κείμενο",
		toEmail		: "Διεύθυνση e-mail",
		targetFrame	: "<πλαίσιο>",
		targetPopup	: "<αναδυόμενο παράθυρο>",
		targetFrameName	: "Όνομα πλαισίου προορισμού:",
		targetPopupName	: "Όνομα αναδυόμενου παραθύρου:",
		popupFeatures	: "Λειτουργίες αναδυόμενου παραθύρου:",
		popupResizable	: "Δυνατότητα αλλαγής μεγέθους",
		popupStatusBar	: "Γραμμή κατάστασης",
		popupLocationBar	: "Γραμμή θέσης",
		popupToolbar	: "Γραμμή εργαλείων",
		popupMenuBar	: "Γραμμή μενού",
		popupFullScreen	: "Πλήρης οθόνη (IE)",
		popupScrollBars	: "Γραμμές κύλισης",
		popupDependent	: "Εξαρτώμενο (Netscape)",
		popupLeft		: "Θέση αριστερά",
		popupTop		: "Θέση πάνω",
		id				: "Ταυτότητα:",
		langDir			: "Κατεύθυνση γλώσσας:",
		langDirLTR		: "Από αριστερά προς δεξιά",
		langDirRTL		: "Από δεξιά προς αριστερά",
		acccessKey		: "Πλήκτρο πρόσβασης:",
		name			: "Όνομα:",
		langCode		: "Κωδικός γλώσσας:",
		tabIndex		: "Σειρά ενεργοποίησης με το πλήκτρο Tab:",
		advisoryTitle	: "Πληροφοριακός τίτλος:",
		advisoryContentType	: "Πληροφορίες είδους περιεχομένου:",
		cssClasses		: "Κλάσεις φύλλων στυλ:",
		charset			: "Σύνολο χαρακτήρων διασυνδεδεμένου πόρου:",
		styles			: "Στυλ:",
		rel			: "Σχέση",
		selectAnchor	: "Επιλογή άγκυρας",
		anchorName		: "Βάσει ονόματος άγκυρας",
		anchorId		: "Βάσει ταυτότητας στοιχείου",
		emailAddress	: "Διεύθυνση e-mail",
		emailSubject	: "Θέμα μηνύματος",
		emailBody		: "Κείμενο μηνύματος",
		noAnchors		: "Δεν υπάρχουν σελιδοδείκτες στο έγγραφο. Πατήστε στο εικονίδιο 'Εισαγωγή σελιδοδείκτη εγγράφου' στη γραμμή εργαλείων για να προσθέσετε ένα σελιδοδείκτη.",
		noUrl			: "Καταχωρήστε τη διεύθυνση URL διασύνδεσης.",
		noEmail			: "Καταχωρήστε τη διεύθυνση e-mail."
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Εισαγωγή σελιδοδείκτη εγγράφου",
		menu		: "Τροποποίηση σελιδοδείκτη εγγράφου",
		title		: "Σελιδοδείκτης εγγράφου",
		name		: "Όνομα:",
		errorName	: "Καταχωρήστε ένα όνομα για το σελιδοδείκτη εγγράφου.",
		remove		: "Αφαίρεση σελιδοδείκτη εγγράφου"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Ιδιότητες αριθμημένης λίστας",
		bulletedTitle		: "Ιδιότητες λίστας με κουκίδες",
		type				: "Στυλ λίστας:",
		start				: "Έναρξη:",
		validateStartNumber				:"Η τιμή έναρξης για τη λίστα πρέπει να είναι ακέραιος αριθμός.",
		circle				: "Κύκλος",
		disc				: "Δίσκος",
		square				: "Τετράγωνο",
		none				: "Χωρίς",
		notset				: "<δεν έχει οριστεί>",
		armenian			: "Αρμένικο σύστημα αρίθμησης",
		georgian			: "Γεωργιανό σύστημα αρίθμησης (an, ban, gan, κ.λπ.)",
		lowerRoman			: "Πεζοί λατινικοί αριθμοί (i, ii, iii, iv, v, κ.λπ.)",
		upperRoman			: "Κεφαλαίοι λατινικοί αριθμοί (I, II, III, IV, V, κ.λπ.)",
		lowerAlpha			: "Πεζά γράμματα (a, b, c, d, e, κ.λπ.)",
		upperAlpha			: "Κεφαλαία γράμματα (A, B, C, D, E, κ.λπ.)",
		lowerGreek			: "Πεζά ελληνικά γράμματα (alpha, beta, gamma, κ.λπ.)",
		decimal				: "Αριθμοί (1, 2, 3, κ.λπ.)",
		decimalLeadingZero	: "Αριθμοί με προτασσόμενο μηδέν (01, 02, 03, κ.λπ.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Εύρεση και αντικατάσταση",
		find				: "Εύρεση",
		replace				: "Αντικατάσταση",
		findWhat			: "Εύρεση:",
		replaceWith			: "Αντικατάσταση με:",
		notFoundMsg			: "Δεν βρέθηκε το καθορισμένο κείμενο.",
		findOptions			: "Επιλογές εύρεσης",
		matchCase			: "Διάκριση πεζών/κεφαλαίων",
		matchWord			: "Αναζήτηση ολόκληρων λέξεων",
		matchCyclic			: "Κυκλική αντιστοίχιση",
		replaceAll			: "Αντικατάσταση όλων",
		replaceSuccessMsg	: "Έγινε αντικατάσταση %1 στοιχείων."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Εισαγωγή πίνακα",
		title		: "Πίνακας",
		menu		: "Ιδιότητες πίνακα",
		deleteTable	: "Διαγραφή πίνακα",
		rows		: "Γραμμές:",
		columns		: "Στήλες:",
		border		: "Μέγεθος περιγράμματος:",
		widthPx		: "εικονοστοιχεία",
		widthPc		: "%",
		widthUnit	: "Μονάδα μέτρησης πλάτους:",
		cellSpace	: "Διάστημα μεταξύ κελιών:",
		cellPad		: "Εσωτερικό περιθώριο κελιών:",
		caption		: "Λεζάντα:",
		summary		: "Σύνοψη:",
		headers		: "Κεφαλίδες:",
		headersNone		: "Χωρίς",
		headersColumn	: "Πρώτη στήλη",
		headersRow		: "Πρώτη γραμμή",
		headersBoth		: "Πρώτη γραμμή και πρώτη στήλη",
		invalidRows		: "Η τιμή για τον αριθμό των γραμμών πρέπει να είναι ακέραιος αριθμός μεγαλύτερος από το μηδέν.",
		invalidCols		: "Η τιμή για τον αριθμό των στηλών πρέπει να είναι ακέραιος αριθμός μεγαλύτερος από το μηδέν.",
		invalidBorder	: "Η τιμή για το μέγεθος περιγράμματος πρέπει να είναι θετικός αριθμός.",
		invalidWidth	: "Η τιμή για το πλάτος του πίνακα πρέπει να είναι θετικός αριθμός.",
		invalidHeight	: "Η τιμή για το ύψος του πίνακα πρέπει να είναι θετικός αριθμός.",
		invalidCellSpacing	: "Η τιμή για την απόσταση κελιών πρέπει να είναι θετικός αριθμός.",
		invalidCellPadding	: "Η τιμή για το περιθώριο κελιών πρέπει να είναι θετικός αριθμός.",

		cell :
		{
			menu			: "Κελί",
			insertBefore	: "Εισαγωγή κελιού πριν",
			insertAfter		: "Εισαγωγή κελιού μετά",
			deleteCell		: "Διαγραφή κελιών",
			merge			: "Συγχώνευση κελιών",
			mergeRight		: "Συγχώνευση δεξιά",
			mergeDown		: "Συγχώνευση κάτω",
			splitHorizontal	: "Οριζόντιος διαχωρισμός κελιού",
			splitVertical	: "Κατακόρυφος διαχωρισμός κελιού",
			title			: "Ιδιότητες κελιού",
			cellType		: "Είδος κελιού:",
			rowSpan			: "Κάλυψη γραμμών:",
			colSpan			: "Κάλυψη στηλών:",
			wordWrap		: "Αναδίπλωση κειμένου:",
			hAlign			: "Οριζόντια στοίχιση:",
			vAlign			: "Κατακόρυφη στοίχιση:",
			alignBaseline	: "Γραμμή βάσης",
			bgColor			: "Χρώμα φόντου:",
			borderColor		: "Χρώμα περιγράμματος:",
			data			: "Δεδομένα",
			header			: "Κεφαλίδα",
			yes				: "Ναι",
			no				: "Όχι",
			invalidWidth	: "Η τιμή για το πλάτος κελιών πρέπει να είναι θετικός αριθμός.",
			invalidHeight	: "Η τιμή για το ύψος κελιών πρέπει να είναι θετικός αριθμός.",
			invalidRowSpan	: "Η τιμή για το εύρος γραμμών πρέπει να είναι θετικός ακέραιος αριθμός.",
			invalidColSpan	: "Η τιμή για το εύρος στηλών πρέπει να είναι θετικός ακέραιος αριθμός.",
			chooseColor 	: "Περισσότερα χρώματα..."
		},

		row :
		{
			menu			: "Γραμμή",
			insertBefore	: "Εισαγωγή γραμμής πριν",
			insertAfter		: "Εισαγωγή γραμμής μετά",
			deleteRow		: "Διαγραφή γραμμών"
		},

		column :
		{
			menu			: "Στήλη",
			insertBefore	: "Εισαγωγή στήλης πριν",
			insertAfter		: "Εισαγωγή στήλης μετά",
			deleteColumn	: "Διαγραφή στηλών"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Ιδιότητες κουμπιού",
		text		: "Κείμενο (Τιμή):",
		type		: "Είδος:",
		typeBtn		: "Κουμπί",
		typeSbm		: "Υποβολή",
		typeRst		: "Επαναφορά"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Ιδιότητες τετραγωνιδίου ελέγχου",
		radioTitle	: "Ιδιότητες κουμπιού επιλογής",
		value		: "Τιμή:",
		selected	: "Επιλεγμένο"
	},

	// Form Dialog.
	form :
	{
		title		: "Εισαγωγή φόρμας",
		menu		: "Ιδιότητες φόρμας",
		action		: "Ενέργεια:",
		method		: "Μέθοδος:",
		encoding	: "Κωδικοποίηση:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Ιδιότητες πεδίου επιλογής",
		selectInfo	: "Πληροφορίες επιλογής",
		opAvail		: "Διαθέσιμες επιλογές",
		value		: "Τιμή:",
		size		: "Μέγεθος:",
		lines		: "γραμμές",
		chkMulti	: "Δυνατότητα πολλαπλών επιλογών",
		opText		: "Κείμενο:",
		opValue		: "Τιμή:",
		btnAdd		: "Προσθήκη",
		btnModify	: "Τροποποίηση",
		btnUp		: "Πάνω",
		btnDown		: "Κάτω",
		btnSetValue : "Ορισμός ως προεπιλεγμένης τιμής",
		btnDelete	: "Διαγραφή"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Ιδιότητες περιοχής κειμένου",
		cols		: "Στήλες:",
		rows		: "Γραμμές:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Ιδιότητες πεδίου κειμένου",
		name		: "Όνομα:",
		value		: "Τιμή:",
		charWidth	: "Πλάτος χαρακτήρων:",
		maxChars	: "Μέγιστος αριθμός χαρακτήρων:",
		type		: "Είδος:",
		typeText	: "Κείμενο",
		typePass	: "Κωδικός πρόσβασης"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Ιδιότητες κρυφού πεδίου",
		name	: "Όνομα:",
		value	: "Τιμή:"
	},

	// Image Dialog.
	image :
	{
		title		: "Εικόνα",
		titleButton	: "Ιδιότητες κουμπιού εικόνας",
		menu		: "Ιδιότητες εικόνας",
		infoTab	: "Πληροφορίες εικόνας",
		btnUpload	: "Μεταφόρτωση εικόνας",
		upload	: "Μεταφόρτωση",
		alt		: "Εναλλακτικό κείμενο:",
		lockRatio	: "Κλείδωμα αναλογιών",
		resetSize	: "Επαναφορά μεγέθους",
		border	: "Περίγραμμα:",
		hSpace	: "Οριζόντια απόσταση:",
		vSpace	: "Κατακόρυφη απόσταση:",
		alertUrl	: "Καταχωρήστε τη διεύθυνση URL της εικόνας.",
		linkTab	: "Διασύνδεση",
		button2Img	: "Θέλετε να μετατρέψετε το επιλεγμένο κουμπί εικόνας σε απλή εικόνα;",
		img2Button	: "Θέλετε να μετατρέψετε την επιλεγμένη εικόνα σε κουμπί εικόνας;",
		urlMissing : "Δεν έχει οριστεί η διεύθυνση URL για την προέλευση εικόνας.",
		validateBorder : "Η τιμή για το περίγραμμα πρέπει να είναι θετικός ακέραιος αριθμός.",
		validateHSpace : "Η τιμή για την οριζόντια απόσταση πρέπει να είναι θετικός ακέραιος αριθμός.",
		validateVSpace : "Η τιμή για την κατακόρυφη απόσταση πρέπει να είναι θετικός ακέραιος αριθμός."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Ιδιότητες αντικειμένου flash",
		propertiesTab	: "Ιδιότητες",
		title		: "Flash",
		chkPlay		: "Αυτόματη αναπαραγωγή",
		chkLoop		: "Επανάληψη",
		chkMenu		: "Ενεργοποίηση μενού Flash",
		chkFull		: "Επιτρέπεται κατάσταση πλήρους οθόνης",
 		scale		: "Κλίμακα:",
		scaleAll		: "Εμφάνιση όλων",
		scaleNoBorder	: "Χωρίς περίγραμμα",
		scaleFit		: "Ακριβής εφαρμογή",
		access			: "Πρόσβαση μέσω σεναρίου:",
		accessAlways	: "Πάντα",
		accessSameDomain	: "Ίδιος τομέας",
		accessNever	: "Ποτέ",
		alignAbsBottom: "Τελείως κάτω",
		alignAbsMiddle: "Τελείως στο κέντρο",
		alignBaseline	: "Γραμμή βάσης",
		alignTextTop	: "Κορυφή κειμένου",
		quality		: "Ποιότητα:",
		qualityBest	: "Βέλτιστη",
		qualityHigh	: "Υψηλή",
		qualityAutoHigh	: "Αυτόματη προσαρμογή - Υψηλή",
		qualityMedium	: "Μέτρια",
		qualityAutoLow	: "Αυτόματη προσαρμογή - Χαμηλή",
		qualityLow	: "Χαμηλή",
		windowModeWindow	: "Παράθυρο",
		windowModeOpaque	: "Αδιαφανές",
		windowModeTransparent	: "Διαφανές",
		windowMode	: "Κατάσταση παραθύρου:",
		flashvars	: "Μεταβλητές:",
		bgcolor	: "Χρώμα φόντου:",
		hSpace	: "Οριζόντια απόσταση:",
		vSpace	: "Κατακόρυφη απόσταση:",
		validateSrc : "Το πεδίο διεύθυνσης URL δεν μπορεί να είναι κενό.",
		validateHSpace : "Η τιμή για την οριζόντια απόσταση πρέπει να είναι θετικός ακέραιος αριθμός.",
		validateVSpace : "Η τιμή για την κατακόρυφη απόσταση πρέπει να είναι θετικός ακέραιος αριθμός."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Ορθογραφικός έλεγχος",
		title			: "Ορθογραφικός έλεγχος",
		notAvailable	: "Λυπούμαστε, αλλά η υπηρεσία δεν είναι διαθέσιμη.",
		errorLoading	: "Παρουσιάστηκε σφάλμα κατά τη φόρτωση της υπηρεσίας: %s.",
		notInDic		: "Δεν υπάρχει στο λεξικό",
		changeTo		: "Αλλαγή σε",
		btnIgnore		: "Αγνόηση",
		btnIgnoreAll	: "Αγνόηση όλων",
		btnReplace		: "Αντικατάσταση",
		btnReplaceAll	: "Αντικατάσταση όλων",
		btnUndo			: "Αναίρεση",
		noSuggestions	: "- Καμία πρόταση -",
		progress		: "Εκτελείται ορθογραφικός έλεγχος...",
		noMispell		: "Ο ορθογραφικός έλεγχος ολοκληρώθηκε: Δεν βρέθηκαν ορθογραφικά λάθη.",
		noChanges		: "Ο ορθογραφικός έλεγχος ολοκληρώθηκε: Δεν άλλαξε καμία λέξη.",
		oneChange		: "Ο ορθογραφικός έλεγχος ολοκληρώθηκε: Άλλαξε μία λέξη.",
		manyChanges		: "Ο ορθογραφικός έλεγχος ολοκληρώθηκε: Άλλαξαν %1 λέξεις.",
		ieSpellDownload	: "Το εργαλείο ορθογραφικού ελέγχου δεν έχει εγκατασταθεί. Θέλετε να το μεταφορτώσετε τώρα στον υπολογιστή σας;"
	},

	smiley :
	{
		toolbar	: "Εισαγωγή εικονιδίου συναισθήματος",
		title	: "Εικονίδια συναισθήματος",
		options : "Επιλογές εικονιδίων συναισθήματος"
	},

	elementsPath :
	{
		eleLabel : "Διαδρομή στοιχείων",
		eleTitle : "Στοιχείο %1"
	},

	numberedlist : "Αριθμημένη λίστα",
	bulletedlist : "Λίστα με κουκίδες",
	indent : "Αύξηση εσοχής",
	outdent : "Μείωση εσοχής",

	justify :
	{
		left : "Στοίχιση αριστερά",
		center : "Στοίχιση στο κέντρο",
		right : "Στοίχιση δεξιά",
		block : "Πλήρης στοίχιση"
	},

	blockquote : "Ενότητα παράθεσης",

	clipboard :
	{
		title		: "Επικόλληση",
		cutError	: "Οι ρυθμίσεις ασφάλειας του προγράμματος πλοήγησης δεν επιτρέπουν την αυτόματη αποκοπή. Μπορείτε να εκτελέσετε αυτή την ενέργεια μέσω του πληκτρολογίου χρησιμοποιώντας το συνδυασμό πλήκτρων Ctrl+X.",
		copyError	: "Οι ρυθμίσεις ασφάλειας του προγράμματος πλοήγησης δεν επιτρέπουν την αυτόματη αντιγραφή. Μπορείτε να εκτελέσετε αυτή την ενέργεια μέσω του πληκτρολογίου χρησιμοποιώντας το συνδυασμό πλήκτρων Ctrl+C.",
		pasteMsg	: "Πατήστε Ctrl+V (Cmd+V σε MAC) για να επικολλήσετε τα δεδομένα παρακάτω.",
		securityMsg	: "Οι ρυθμίσεις ασφάλειας του προγράμματος πλοήγησης δεν επιτρέπουν την άμεση επικόλληση από το πρόχειρο.",
		pasteArea	: "Περιοχή επικόλλησης"
	},

	pastefromword :
	{
		confirmCleanup	: "Το κείμενο προς επικόλληση προέρχεται μάλλον από το Word. Θέλετε να γίνει καθαρισμός του κειμένου πριν από την επικόλληση;",
		toolbar			: "Ειδική επικόλληση",
		title			: "Ειδική επικόλληση",
		error			: "Δεν ήταν δυνατός ο καθαρισμός του κειμένου λόγω εσωτερικού σφάλματος."
	},

	pasteText :
	{
		button	: "Επικόλληση σε μορφή απλού κειμένου",
		title	: "Επικόλληση σε μορφή απλού κειμένου"
	},

	templates :
	{
		button 			: "Πρότυπα",
		title : "Πρότυπα περιεχομένου",
		options : "Επιλογές προτύπου",
		insertOption: "Αντικατάσταση υπάρχοντος περιεχομένου",
		selectPromptMsg: "Επιλέξτε το πρότυπο που θέλετε να ανοίξετε στο πρόγραμμα σύνταξης.",
		emptyListMsg : "(Δεν έχουν οριστεί πρότυπα.)"
	},

	showBlocks : "Εμφάνιση ενοτήτων",

	stylesCombo :
	{
		label		: "Στυλ",
		panelTitle 	: "Στυλ",
		panelTitle1	: "Στυλ ενοτήτων",
		panelTitle2	: "Ενσωματωμένα στυλ",
		panelTitle3	: "Στυλ αντικειμένων"
	},

	format :
	{
		label		: "Μορφή",
		panelTitle	: "Μορφή παραγράφου",

		tag_p		: "Κανονική",
		tag_pre		: "Μορφοποιημένη",
		tag_address	: "Διεύθυνση",
		tag_h1		: "Επικεφαλίδα 1",
		tag_h2		: "Επικεφαλίδα 2",
		tag_h3		: "Επικεφαλίδα 3",
		tag_h4		: "Επικεφαλίδα 4",
		tag_h5		: "Επικεφαλίδα 5",
		tag_h6		: "Επικεφαλίδα 6",
		tag_div		: "Κανονική (DIV)"
	},

	div :
	{
		title				: "Δημιουργία υποδοχέα div",
		toolbar				: "Δημιουργία υποδοχέα div",
		cssClassInputLabel	: "Κλάσεις φύλλων στυλ",
		styleSelectLabel	: "Στυλ",
		IdInputLabel		: "Ταυτότητα",
		languageCodeInputLabel	: " Κωδικός γλώσσας",
		inlineStyleInputLabel	: "Ενσωματωμένο στυλ",
		advisoryTitleInputLabel	: "Πληροφοριακός τίτλος",
		langDirLabel		: "Κατεύθυνση γλώσσας",
		langDirLTRLabel		: "Από αριστερά προς δεξιά",
		langDirRTLLabel		: "Από δεξιά προς αριστερά",
		edit				: "Τροποποίηση div",
		remove				: "Αφαίρεση div"
  	},

	iframe :
	{
		title		: "Ιδιότητες IFrame",
		toolbar		: "Εισαγωγή IFrame",
		noUrl		: "Καταχωρήστε τη διεύθυνση URL του iFrame.",
		scrolling	: "Ενεργοποίηση γραμμών κύλισης",
		border		: "Εμφάνιση περιγράμματος πλαισίου"
	},

	font :
	{
		label		: "Γραμματοσειρά",
		voiceLabel	: "Γραμματοσειρά",
		panelTitle	: "Όνομα γραμματοσειράς"
	},

	fontSize :
	{
		label		: "Μέγεθος",
		voiceLabel	: "Μέγεθος γραμματοσειράς",
		panelTitle	: "Μέγεθος γραμματοσειράς"
	},

	colorButton :
	{
		textColorTitle	: "Χρώμα κειμένου",
		bgColorTitle	: "Χρώμα φόντου",
		panelTitle		: "Χρώματα",
		auto			: "Αυτόματα",
		more			: "Περισσότερα χρώματα..."
	},

	colors :
	{
		"000" : "Μαύρο",
		"800000" : "Καστανό",
		"8B4513" : "Απαλό καφέ",
		"2F4F4F" : "Γκρι πράσινο",
		"008080" : "Πετρόλ",
		"000080" : "Ναυτικό μπλε",
		"4B0082" : "Λουλακί",
		"696969" : "Σκούρο γκρι",
		"B22222" : "Σκούρο κόκκινο",
		"A52A2A" : "Καφέ",
		"DAA520" : "Χρυσοκίτρινο",
		"006400" : "Σκούρο πράσινο",
		"40E0D0" : "Τυρκουάζ",
		"0000CD" : "Μέτριο μπλε",
		"800080" : "Πορφυρό",
		"808080" : "Γκρι",
		"F00" : "Κόκκινο",
		"FF8C00" : "Σκούρο πορτοκαλί",
		"FFD700" : "Χρυσαφί",
		"008000" : "Πράσινο",
		"0FF" : "Γαλάζιο",
		"00F" : "Μπλε",
		"EE82EE" : "Βιολετί",
		"A9A9A9" : "Σκούρο γκρι",
		"FFA07A" : "Ανοιχτό σομόν",
		"FFA500" : "Πορτοκαλί",
		"FFFF00" : "Κίτρινο",
		"00FF00" : "Ανοιχτό πράσινο",
		"AFEEEE" : "Παλ τυρκουάζ",
		"ADD8E6" : "Ανοιχτό μπλε",
		"DDA0DD" : "Δαμασκηνί",
		"D3D3D3" : "Ανοιχτό γκρι",
		"FFF0F5" : "Ανοιχτό μενεξεδί",
		"FAEBD7" : "Εκρού",
		"FFFFE0" : "Ανοιχτό κίτρινο",
		"F0FFF0" : "Ανοιχτό γαλαζοπράσινο",
		"F0FFFF" : "Ανοιχτό γαλάζιο",
		"F0F8FF" : "Οινοπνευματί",
		"E6E6FA" : "Μενεξεδί",
		"FFF" : "Λευκό"
	},

	scayt :
	{
		title			: "Ορθογραφικός έλεγχος κατά την πληκτρολόγηση",
		opera_title		: "Δεν υποστηρίζεται από το Opera",
		enable			: "Ενεργοποίηση ορθογραφικού ελέγχου κατά την πληκτρολόγηση",
		disable			: "Απενεργοποίηση ορθογραφικού ελέγχου κατά την πληκτρολόγηση",
		about			: "Πληροφορίες για τον ορθογραφικό έλεγχο κατά την πληκτρολόγηση",
		toggle			: "Εναλλαγή ορθογραφικού ελέγχου κατά την πληκτρολόγηση",
		options			: "Επιλογές",
		langs			: "Γλώσσες",
		moreSuggestions	: "Περισσότερες προτάσεις",
		ignore			: "Αγνόηση",
		ignoreAll		: "Αγνόηση όλων",
		addWord			: "Προσθήκη λέξης",
		emptyDic		: "Το όνομα του λεξικού δεν μπορεί να είναι κενό.",

		optionsTab		: "Επιλογές",
		allCaps			: "Παράβλεψη των λέξεων με κεφαλαία γράμματα",
		ignoreDomainNames : "Παράβλεψη ονομάτων τομέων",
		mixedCase		: "Παράβλεψη λέξεων με ταυτόχρονη παρουσία πεζών και κεφαλαίων γράμματα",
		mixedWithDigits	: "Παράβλεψη λέξεων με αριθμούς",

		languagesTab	: "Γλώσσες",

		dictionariesTab	: "Λεξικά",
		dic_field_name	: "Όνομα λεξικού",
		dic_create		: "Δημιουργία",
		dic_restore		: "Επαναφορά",
		dic_delete		: "Διαγραφή",
		dic_rename		: "Μετονομασία",
		dic_info		: "Αρχικά, το λεξικό χρήστη αποθηκεύεται σε ένα cookie. Ωστόσο, το μέγεθος των cookies είναι περιορισμένο. Όταν το μέγεθος του λεξικού χρήστη αυξηθεί τόσο ώστε να μην είναι δυνατή η αποθήκευση του λεξικού σε ένα cookie, το λεξικό μπορεί να αποθηκευτεί στους εξυπηρετητές μας. Για να αποθηκεύσετε το λεξικό σας σε έναν εξυπηρετητή μας, πρέπει να ορίσετε ένα όνομα για το λεξικό. Αν έχετε αποθηκεύσει ήδη ένα λεξικό, καταχωρήστε το όνομά του και πατήστε το κουμπί Επαναφορά.",

		aboutTab		: "Πληροφορίες"
	},

	about :
	{
		title		: "Πληροφορίες για το CKEditor",
		dlgTitle	: "Πληροφορίες για το CKEditor",
		help	: "Ανατρέξτε στην τεκμηρίωση ($1) για βοήθεια.",
		userGuide : "Οδηγός χρήσης του CKEditor",
		moreInfo	: "Για πληροφορίες σχετικά με την άδεια χρήσης, επισκεφτείτε το δικτυακό μας τόπο:",
		copy		: "Copyright &copy; $1. Με την επιφύλαξη παντός δικαιώματος."
	},

	maximize : "Μεγιστοποίηση",
	minimize : "Ελαχιστοποίηση",

	fakeobjects :
	{
		anchor	: "Άγκυρα",
		flash	: "Αντικείμενο flash",
		iframe		: "IFrame",
		hiddenfield	: "Κρυφό πεδίο",
		unknown	: "Άγνωστο αντικείμενο"
	},

	resize : "Σύρετε με το ποντίκι για να αλλάξετε το μέγεθος.",

	colordialog :
	{
		title		: "Επιλογή χρώματος",
		options	:	"Επιλογές χρωμάτων",
		highlight	: "Επισήμανση",
		selected	: "Επιλεγμένο χρώμα",
		clear		: "Εκκαθάριση"
	},

	toolbarCollapse	: "Ανάπτυξη γραμμής εργαλείων",
	toolbarExpand	: "Σύμπτυξη γραμμής εργαλείων",

	toolbarGroups :
	{
		document : "Έγγραφο",
		clipboard : "Πρόχειρο/Αναίρεση",
		editing : "Τροποποίηση",
		forms : "Φόρμες",
		basicstyles : "Βασικά στυλ",
		paragraph : "Παράγραφος",
		links : "Διασυνδέσεις",
		insert : "Εισαγωγή",
		styles : "Στυλ",
		colors : "Χρώματα",
		tools : "Εργαλεία"
	},

	bidi :
	{
		ltr : "Κατεύθυνση κειμένου από αριστερά προς τα δεξιά",
		rtl : "Κατεύθυνση κειμένου από δεξιά προς τα αριστερά"
	},

	docprops :
	{
		label : "Ιδιότητες εγγράφου",
		title : "Ιδιότητες εγγράφου",
		design : "Σχεδίαση",
		meta : "Μετα-προσδιοριστικά",
		chooseColor : "Επιλογή",
		other : "Άλλο...",
		docTitle :	"Τίτλος σελίδας",
		charset : 	"Κωδικοποίηση συνόλου χαρακτήρων",
		charsetOther : "Άλλη κωδικοποίηση συνόλου χαρακτήρων",
		charsetASCII : "ASCII",
		charsetCE : "Κεντρική Ευρώπη",
		charsetCT : "Παραδοσιακά Κινεζικά (Big5)",
		charsetCR : "Κυριλλικό αλφάβητο",
		charsetGR : "Ελληνικά",
		charsetJP : "Ιαπωνικά",
		charsetKR : "Κορεατικά",
		charsetTR : "Τουρκικά",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Δυτική Ευρώπη",
		docType : "Επικεφαλίδα είδους εγγράφων",
		docTypeOther : "Επικεφαλίδα άλλου είδους εγγράφων",
		xhtmlDec : "Συμπερίληψη δηλώσεων XHTML",
		bgColor : "Χρώμα φόντου",
		bgImage : "Διεύθυνση URL εικόνας φόντου",
		bgFixed : "Μη κυλιόμενο (σταθερό) φόντο",
		txtColor : "Χρώμα κειμένου",
		margin : "Περιθώρια σελίδας",
		marginTop : "Πάνω",
		marginLeft : "Αριστερά",
		marginRight : "Δεξιά",
		marginBottom : "Κάτω",
		metaKeywords : "Λέξεις-κλειδιά ευρετηριοποίησης εγγράφου (διαχωρισμός με κόμμα)",
		metaDescription : "Περιγραφή εγγράφου",
		metaAuthor : "Συντάκτης",
		metaCopyright : "Πνευματικά δικαιώματα",
		previewHtml : "<p>Αυτό είναι ένα <strong>δείγμα κειμένου</strong>. Χρησιμοποιείτε το <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "ίντσες",
			widthCm	: "εκατοστά",
			widthMm	: "χιλιοστά",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "pt",
			widthPc	: "pc",
			required : "Απαιτείται"
		},
		table :
		{
			createTable : 'Εισαγωγή πίνακα',
			heightUnit	: "Μονάδα ύψους",
			insertMultipleRows : "Εισαγωγή γραμμών",
			insertMultipleCols : "Εισαγωγή στηλών",
			noOfRows : "Αριθμός γραμμών:",
			noOfCols : "Αριθμός στηλών:",
			insertPosition : "Θέση:",
			insertBefore : "Πριν",
			insertAfter : "Μετά",
			selectTable : "Επιλογή πίνακα",
			selectRow : "Επιλογή γραμμής",
			columnTitle : "Πλάτος στήλης",
			colProps : "Ιδιότητες στήλης",
			invalidColumnWidth	: "Η τιμή για το πλάτος της στήλης πρέπει να είναι θετικός αριθμός.",
			fixedColWidths : "Σταθερά πλάτη στηλών"
		},
		cell :
		{
			title : "Κελί"
		},
		colordialog :
		{
			currentColor	: "Τρέχον χρώμα"
		},
		emoticon :
		{
			angel		: "Αγγελούδι",
			angry		: "Θυμωμένος",
			cool		: "Άνετος",
			crying		: "Κλάμα",
			eyebrow		: "Σηκωμένο φρύδι",
			frown		: "Συνοφρυωμένος",
			goofy		: "Χαζόφατσα",
			grin		: "Πλατύ χαμόγελο",
			half		: "Μισό",
			idea		: "Ιδέα",
			laughing	: "Γέλιο",
			laughroll	: "Ξεκάρδισμα",
			no			: "Όχι",
			oops		: "Έκπληξη",
			shy			: "Ντροπαλός",
			smile		: "Χαμόγελο",
			tongue		: "Κοροϊδία",
			wink		: "Κλείσιμο ματιού",
			yes			: "Ναι"
		},

		menu :
		{
			link	: "Εισαγωγή διασύνδεσης",
			list	: "Λίστα",
			paste	: "Επικόλληση",
			action	: "Ενέργεια",
			align	: "Στοίχιση",
			emoticon: "Εικονίδιο συναισθήματος"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Αριθμημένη λίστα",
			bulletedTitle		: "Λίστα με κουκίδες",
			description			: "Οι ρυθμίσεις θα εφαρμοστούν στο τρέχον επίπεδο λίστας",
			fontsize			: "Μέγεθος γραμματοσειράς:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Καταχωρήστε ένα περιγραφικό όνομα για το σελιδοδείκτη (π.χ. 'Ενότητα 1.2'). Αφού προσθέσετε το σελιδοδείκτη, διασυνδέστε τον πατώντας στο εικονίδιο 'Διασύνδεση' ή 'Διασύνδεση σελιδοδείκτη εγγράφου'.",
			title		: "Διασύνδεση σελιδοδείκτη εγγράφου",
			linkTo		: "Διασύνδεση με:"
		},

		urllink :
		{
			title : "Διεύθυνση URL διασύνδεσης",
			linkText : "Κείμενο διασύνδεσης:",
			selectAnchor: "Επιλογή άγκυρας:",
			nourl: "Καταχωρήστε μια διεύθυνση URL στο πεδίο κειμένου.",
			urlhelp: "Καταχωρήστε ή επικολλήστε τη διεύθυνση URL στην οποία θα οδηγεί αυτή η διασύνδεση (π.χ. http://www.example.com).",
			displaytxthelp: "Καταχωρήστε το κείμενο που θα εμφανίζεται για τη διασύνδεση.",
			openinnew : "Άνοιγμα διασύνδεσης σε νέο παράθυρο"
		},

		spellchecker :
		{
			title : "Έλεγχος ορθογραφίας",
			replace : "Αντικατάσταση:",
			suggesstion : "Προτάσεις:",
			withLabel : "Με:",
			replaceButton : "Αντικατάσταση",
			replaceallButton:"Αντικατάσταση όλων",
			skipButton:"Παράβλεψη",
			skipallButton: "Παράβλεψη όλων",
			undochanges: "Αναίρεση αλλαγών",
			complete: "Ο ορθογραφικός έλεγχος ολοκληρώθηκε.",
			problem: "Παρουσιάστηκε πρόβλημα κατά την ανάκτηση των δεδομένων XML.",
			addDictionary: "Προσθήκη στο λεξικό",
			editDictionary: "Επεξεργασία λεξικού"
		},

		status :
		{
			keystrokeForHelp: "Πατήστε ALT 0 για βοήθεια"
		},

		linkdialog :
		{
			label : "Παράθυρο διαλόγου διασύνδεσης"
		},

		imagedatauri :
		{
			error : "Η επικόλληση εικόνων δεν υποστηρίζεται προς το παρόν. Χρησιμοποιήστε την επιλογή της γραμμής εργαλείων \'Εισαγωγή εικόνας\'."
		},

		image :
		{
			previewText : "Το κείμενο θα τοποθετηθεί γύρω από την εικόνα που προσθέτετε, όπως φαίνεται σε αυτό το παράδειγμα.",
			fileUpload : "Επιλέξτε ένα αρχείο εικόνας από τον υπολογιστή σας:"
		}
	}

};
