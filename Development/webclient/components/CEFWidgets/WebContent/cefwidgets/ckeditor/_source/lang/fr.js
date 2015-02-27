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

CKEDITOR.lang["fr"] =
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
	editorTitle : "Editeur de texte enrichi, %1, appuyez sur ALT 0 pour obtenir de l'aide.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Barres d'outil d'éditeur",
	editor	: "Editeur de texte enrichi",

	// Toolbar buttons without dialogs.
	source			: "Source",
	newPage			: "Nouvelle page",
	save			: "Enregistrer",
	preview			: "Aperçu :",
	cut				: "Couper",
	copy			: "Copier",
	paste			: "Coller",
	print			: "Imprimer",
	underline		: "Soulignement",
	bold			: "Gras",
	italic			: "Italique",
	selectAll		: "Sélectionner tout",
	removeFormat	: "Supprimer la mise en forme",
	strike			: "Barré",
	subscript		: "Indice",
	superscript		: "Exposant",
	horizontalrule	: "Insérer une ligne horizontale",
	pagebreak		: "Insérer un saut de page",
	pagebreakAlt		: "Saut de page",
	unlink			: "Supprimer le lien",
	undo			: "Annuler",
	redo			: "Rétablir",

	// Common messages and labels.
	common :
	{
		browseServer	: "Serveur d'exploration :",
		url				: "URL :",
		protocol		: "Protocole :",
		upload			: "Envoi par téléchargement :",
		uploadSubmit	: "L'envoyer au serveur",
		image			: "Insérer une image",
		flash			: "Insérer un film Flash",
		form			: "Insérer un formulaire",
		checkbox		: "Insérer une case à cocher",
		radio			: "Insérer un bouton radio",
		textField		: "Insérer un champ de texte",
		textarea		: "Insérer une zone de texte",
		hiddenField		: "Insérer une zone masquée",
		button			: "Insérer un bouton",
		select			: "Insérer une zone de sélection",
		imageButton		: "Insérer un bouton d'image",
		notSet			: "<non défini>",
		id				: "Identificateur :",
		name			: "Nom :",
		langDir			: "Sens de la langue :",
		langDirLtr		: "De gauche à droite",
		langDirRtl		: "De droite à gauche",
		langCode		: "Code de la langue :",
		longDescr		: "URL de description longue :",
		cssClass		: "Classes de feuille de style :",
		advisoryTitle	: "Titre de recommandation :",
		cssStyle		: "Style :",
		ok				: "OK",
		cancel			: "Annuler",
		close : "Fermer",
		preview			: "Aperçu :",
		generalTab		: "Général",
		advancedTab		: "Avancé",
		validateNumberFailed	: "Cette valeur n'est pas un nombre.",
		confirmNewPage	: "Toutes les modifications non enregistrées qui ont été apportées à ce contenu seront perdues. Etes-vous sûr de vouloir charger une nouvelle page ?",
		confirmCancel	: "Certaines options ont été modifiées. Etes-vous sûr de vouloir vraiment fermer la boîte de dialogue ?",
		options : "Options",
		target			: "Cible :",
		targetNew		: "Nouvelle fenêtre (_vide)",
		targetTop		: "Fenêtre de 1er plan (_haut)",
		targetSelf		: "Même fenêtre (_auto)",
		targetParent	: "Fenêtre parente (_parent)",
		langDirLTR		: "De gauche à droite",
		langDirRTL		: "De droite à gauche",
		styles			: "Style :",
		cssClasses		: "Classes de feuille de style :",
		width			: "Largeur :",
		height			: "Hauteur :",
		align			: "Aligner :",
		alignLeft		: "Gauche",
		alignRight		: "Droite",
		alignCenter		: "Centre",
		alignTop		: "Haut",
		alignMiddle		: "Milieu",
		alignBottom		: "Bas",
		invalidHeight	: "La hauteur doit être un nombre entier positif.",
		invalidWidth	: "La largeur doit être un nombre entier positif.",
		invalidCssLength	: "La valeur spécifiée pour la zone '%1' doit un nombre positif avec ou sans unité de mesure CSS valide (px, %, in, cm, mm, em, ex, pt ou pc).",
		invalidHtmlLength	: "La valeur indiquée pour la zone '%1' doit être un nombre positif avec ou sans unité de mesure HTML valide (px ou %).",
		invalidInlineStyle	: "La valeur indiquée pour le style en ligne doit se composer d'un ou plusieurs uplets avec le format \"nom : valeur\", séparées par des points-virgules.",
		cssLengthTooltip	: "Entrez un nombre pour une valeur en pixels ou un nombre avec une unité CSS valide (px,%, in, cm, mm, em, ex, pt ou pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, indisponible</span>"
	},

	contextmenu :
	{
		options : "Options de menu contextuel"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Insérer un caractère spécial",
		title		: "Caractère spécial",
		options : "Options de caractère spécial"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Lien de l'URL",
		other 		: "<autre>",
		menu		: "Editer le lien",
		title		: "Lien",
		info		: "Informations sur le lien",
		target		: "Cible",
		upload		: "Envoi par téléchargement :",
		advanced	: "Avancé",
		type		: "Type de lien :",
		toUrl		: "URL",
		toAnchor	: "Lier au point d'ancrage dans le texte",
		toEmail		: "Adresse électronique",
		targetFrame	: "<cadre>",
		targetPopup	: "<fenêtre en incrustation>",
		targetFrameName	: "Nom du cadre cible :",
		targetPopupName	: "Nom de la fenêtre en incrustation :",
		popupFeatures	: "Fonctions de la fenêtre en incrustation :",
		popupResizable	: "Redimensionnable",
		popupStatusBar	: "Barre d'état",
		popupLocationBar	: "Barre d'emplacement",
		popupToolbar	: "Barre d'outils",
		popupMenuBar	: "Barre de menus",
		popupFullScreen	: "Plein écran (IE)",
		popupScrollBars	: "Barres de défilement",
		popupDependent	: "Dépendant (Netscape)",
		popupLeft		: "Position gauche",
		popupTop		: "Position supérieure",
		id				: "Identificateur :",
		langDir			: "Sens de la langue :",
		langDirLTR		: "De gauche à droite",
		langDirRTL		: "De droite à gauche",
		acccessKey		: "Clé d'accès :",
		name			: "Nom :",
		langCode		: "Code de la langue :",
		tabIndex		: "Index de l'onglet :",
		advisoryTitle	: "Titre de recommandation :",
		advisoryContentType	: "Type de contenu consultatif :",
		cssClasses		: "Classes de feuille de style :",
		charset			: "Jeu de caractères de la ressource liée :",
		styles			: "Style :",
		rel			: "Relation",
		selectAnchor	: "Sélectionner un point d'ancrage",
		anchorName		: "Par nom de point d'ancrage",
		anchorId		: "Par identificateur d'élément",
		emailAddress	: "Adresse électronique",
		emailSubject	: "Objet du message",
		emailBody		: "Corps du message",
		noAnchors		: "Aucun signet disponible dans le document. Cliquez sur l'icône 'Insérer un signet de document' dans la barre d'outils pour ajouter un.",
		noUrl			: "Entrez l'URL du lien",
		noEmail			: "Entrez l'adresse électronique"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Insérer un signet de document",
		menu		: "Editer un signet de document",
		title		: "Signet de document",
		name		: "Nom :",
		errorName	: "Entrez un nom pour le signet du document",
		remove		: "Supprimer un signet de document"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Liste des propriétés (liste numérotée)",
		bulletedTitle		: "Liste des propriétés (liste à puces)",
		type				: "Style de liste :",
		start				: "Début :",
		validateStartNumber				:"Le premier numéro de la liste doit être un nombre entier.",
		circle				: "Cercle",
		disc				: "Disque",
		square				: "Carré",
		none				: "Aucun",
		notset				: "<non défini>",
		armenian			: "Numérotation arménienne",
		georgian			: "Numérotation géorgienne (an, ban, gan, etc.)",
		lowerRoman			: "Numérotation romaine, minuscules (i, ii, iii, iv, v, etc.)",
		upperRoman			: "Numérotation romaine, majuscules (I, II, III, IV, V, etc.)",
		lowerAlpha			: "Numérotation alphabétique, minuscules (a, b, c, d, e, etc.)",
		upperAlpha			: "Numérotation alphabétique, majuscules (A, B, C, D, E, etc.)",
		lowerGreek			: "Numérotation grecque, minuscules (alpha, beta, gamma, etc.)",
		decimal				: "Numérotation décimale (1, 2, 3, etc.)",
		decimalLeadingZero	: "Numérotation décimale avec zéro en tête (01, 02, 03, etc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Rechercher et remplacer",
		find				: "Rechercher",
		replace				: "Remplacer",
		findWhat			: "Rechercher :",
		replaceWith			: "Remplacer par :",
		notFoundMsg			: "Le texte spécifié est introuvable.",
		findOptions			: "Options de recherche",
		matchCase			: "Correspondance maj/min",
		matchWord			: "Correspondance du mot entier",
		matchCyclic			: "Correspondance cyclique",
		replaceAll			: "Remplacer tout",
		replaceSuccessMsg	: "%1 occurrence(s) remplacée(s)."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Insérer un tableau",
		title		: "Tableau",
		menu		: "Propriétés du tableau",
		deleteTable	: "Supprimer le tableau",
		rows		: "Lignes :",
		columns		: "Colonnes :",
		border		: "Taille de la bordure :",
		widthPx		: "pixels",
		widthPc		: "pour cent",
		widthUnit	: "Unité de largeur :",
		cellSpace	: "Espacement entre les cellules :",
		cellPad		: "Marge intérieure des cellules :",
		caption		: "Légende :",
		summary		: "Récapitulatif :",
		headers		: "En-têtes :",
		headersNone		: "Aucun",
		headersColumn	: "Première colonne",
		headersRow		: "Première ligne",
		headersBoth		: "Les deux",
		invalidRows		: "Le nombre de lignes doit être un nombre entier supérieur à zéro.",
		invalidCols		: "Le nombre de colonnes doit être un nombre entier supérieur à zéro.",
		invalidBorder	: "La taille de la bordure doit être un nombre positif.",
		invalidWidth	: "La largeur du tableau doit être un nombre positif.",
		invalidHeight	: "La hauteur du tableau doit être un nombre positif.",
		invalidCellSpacing	: "L'espacement entre les cellules doit être un nombre positif.",
		invalidCellPadding	: "La marge intérieure des cellules doit être un nombre positif.",

		cell :
		{
			menu			: "Cellule",
			insertBefore	: "Insérer une cellule avant",
			insertAfter		: "Insérer une cellule après",
			deleteCell		: "Supprimer des cellules",
			merge			: "Fusionner des cellules",
			mergeRight		: "Fusionner à droite",
			mergeDown		: "Fusionner en bas",
			splitHorizontal	: "Fractionner la cellule horizontalement",
			splitVertical	: "Fractionner la cellule verticalement",
			title			: "Propriétés de la cellule",
			cellType		: "Type de cellule :",
			rowSpan			: "Plage de lignes :",
			colSpan			: "Plage de colonnes :",
			wordWrap		: "Retour à la ligne automatique :",
			hAlign			: "Alignement horizontal :",
			vAlign			: "Alignement vertical :",
			alignBaseline	: "Ligne de base",
			bgColor			: "Couleur de l'arrière-plan :",
			borderColor		: "Couleur de la bordure :",
			data			: "Données",
			header			: "En-tête",
			yes				: "Oui",
			no				: "Non",
			invalidWidth	: "La largeur de la cellule doit être un nombre positif.",
			invalidHeight	: "La hauteur de la cellule doit être un nombre positif.",
			invalidRowSpan	: "L'étendue de la ligne doit être un nombre entier positif.",
			invalidColSpan	: "L'étendue des colonnes doit être un nombre entier positif.",
			chooseColor 	: "Couleurs supplémentaires..."
		},

		row :
		{
			menu			: "Ligne",
			insertBefore	: "Insérer la ligne avant",
			insertAfter		: "Insérer la ligne après",
			deleteRow		: "Supprimer des lignes"
		},

		column :
		{
			menu			: "Colonne",
			insertBefore	: "Insérer la colonne avant",
			insertAfter		: "Insérer la colonne après",
			deleteColumn	: "Supprimer des colonnes"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Propriétés du bouton",
		text		: "Texte (valeur) :",
		type		: "Type :",
		typeBtn		: "Bouton",
		typeSbm		: "Soumettre",
		typeRst		: "Réinitialiser"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Propriétés de la case à cocher",
		radioTitle	: "Propriétés du bouton radio",
		value		: "Valeur :",
		selected	: "Sélectionnée"
	},

	// Form Dialog.
	form :
	{
		title		: "Insérer un formulaire",
		menu		: "Propriétés du formulaire",
		action		: "Action :",
		method		: "Méthode :",
		encoding	: "Codage :"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Sélectionner les propriétés de la zone",
		selectInfo	: "Sélectionner les informations",
		opAvail		: "Options disponibles",
		value		: "Valeur :",
		size		: "Taille :",
		lines		: "lignes",
		chkMulti	: "Autoriser plusieurs sélections",
		opText		: "Texte :",
		opValue		: "Valeur :",
		btnAdd		: "Ajouter",
		btnModify	: "Modifier",
		btnUp		: "Haut",
		btnDown		: "Bas",
		btnSetValue : "Définir comme valeur sélectionnée",
		btnDelete	: "Supprimer"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Propriétés de la zone de texte",
		cols		: "Colonnes :",
		rows		: "Lignes :"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Propriétés de la zone de texte",
		name		: "Nom :",
		value		: "Valeur :",
		charWidth	: "Largeur de caractère :",
		maxChars	: "Nombre maximal de caractères :",
		type		: "Type :",
		typeText	: "Texte",
		typePass	: "Mot de passe"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Propriétés de la zone masquée",
		name	: "Nom :",
		value	: "Valeur :"
	},

	// Image Dialog.
	image :
	{
		title		: "Image",
		titleButton	: "Propriétés du bouton d'image",
		menu		: "Propriétés de l'image",
		infoTab	: "Informations sur l'image",
		btnUpload	: "Envoyer l'image par téléchargement",
		upload	: "Envoyer par téléchargement",
		alt		: "Texte de remplacement :",
		lockRatio	: "Verrouiller le ratio",
		resetSize	: "Réinitialiser la taille",
		border	: "Bordure :",
		hSpace	: "Espace horizontal :",
		vSpace	: "Espace vertical :",
		alertUrl	: "Entrez l'URL de l'image",
		linkTab	: "Lien",
		button2Img	: "Voulez-vous convertir le bouton d'image sélectionné en image simple ?",
		img2Button	: "Voulez-vous convertir l'image sélectionnée en bouton d'image ?",
		urlMissing : "L'URL source de l'image est manquante.",
		validateBorder : "La bordure doit être un nombre entier positif.",
		validateHSpace : "L'espacement horizontal doit être un nombre entier positif.",
		validateVSpace : "L'espacement vertical doit être un nombre entier positif."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Propriétés de l'animation flash",
		propertiesTab	: "Propriétés",
		title		: "Flash",
		chkPlay		: "Lecture automatique",
		chkLoop		: "Boucle",
		chkMenu		: "Activer le menu flash",
		chkFull		: "Autoriser le plein écran",
 		scale		: "Mettre à l'échelle :",
		scaleAll		: "Afficher tout",
		scaleNoBorder	: "Aucune bordure",
		scaleFit		: "Ajustement exact",
		access			: "Accès au script :",
		accessAlways	: "Toujours",
		accessSameDomain	: "Même domaine",
		accessNever	: "Jamais",
		alignAbsBottom: "Bas abs",
		alignAbsMiddle: "Milieu abs",
		alignBaseline	: "Ligne de base",
		alignTextTop	: "Haut du texte",
		quality		: "Qualité :",
		qualityBest	: "Maximale",
		qualityHigh	: "Haute",
		qualityAutoHigh	: "Haute auto",
		qualityMedium	: "Moyenne",
		qualityAutoLow	: "Faible auto",
		qualityLow	: "Basse",
		windowModeWindow	: "Fenêtre",
		windowModeOpaque	: "Opaque",
		windowModeTransparent	: "Transparent",
		windowMode	: "Mode fenêtre :",
		flashvars	: "Variables :",
		bgcolor	: "Couleur de l'arrière-plan :",
		hSpace	: "Espace horizontal :",
		vSpace	: "Espace vertical :",
		validateSrc : "L'URL ne doit pas être vide.",
		validateHSpace : "L'espacement horizontal doit être un nombre entier positif.",
		validateVSpace : "L'espacement vertical doit être un nombre entier positif."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Vérification orthographique",
		title			: "Vérification orthographique",
		notAvailable	: "Désolé, mais le service est actuellement indisponible.",
		errorLoading	: "Erreur lors du chargement de l'hôte du service d'application : %s.",
		notInDic		: "Absent du dictionnaire",
		changeTo		: "Modifier à",
		btnIgnore		: "Ignorer",
		btnIgnoreAll	: "Ignorer tout",
		btnReplace		: "Remplacer",
		btnReplaceAll	: "Remplacer tout",
		btnUndo			: "Annuler",
		noSuggestions	: "- Aucune suggestion -",
		progress		: "Vérification orthographique en cours...",
		noMispell		: "Vérification orthographique terminée : aucune erreur d'orthographe trouvée",
		noChanges		: "Vérification orthographique terminée : aucun mot modifié",
		oneChange		: "Vérification orthographique terminée : un mot modifié",
		manyChanges		: "Vérification orthographique : %1 mots modifiés",
		ieSpellDownload	: "Le vérificateur orthographique n'est pas installé. Voulez-vous le télécharger maintenant ?"
	},

	smiley :
	{
		toolbar	: "Insérer une émoticône",
		title	: "Emoticônes",
		options : "Options d'émoticône"
	},

	elementsPath :
	{
		eleLabel : "Chemin d'accès aux éléments",
		eleTitle : "Elément %1"
	},

	numberedlist : "Liste numérotée",
	bulletedlist : "Liste à puces",
	indent : "Augmenter le retrait",
	outdent : "Diminuer le retrait",

	justify :
	{
		left : "Aligner à gauche",
		center : "Aligner au centre",
		right : "Aligner à droite",
		block : "Justifier"
	},

	blockquote : "Bloc de citation",

	clipboard :
	{
		title		: "Coller",
		cutError	: "Les paramètres de sécurité de votre navigateur empêchent la coupe automatique. Utilisez plutôt les touches Ctrl+X du clavier.",
		copyError	: "Les paramètres de sécurité de votre navigateur empêchent la copie automatique. Utilisez plutôt les touches Ctrl+C du clavier.",
		pasteMsg	: "Appuyez sur les touches Ctrl+V (Cmd+V sur MAC) pour coller ci-dessous.",
		securityMsg	: "Les paramètres de sécurité de votre navigateur empêchent le collage directement depuis le presse-papiers.",
		pasteArea	: "Zone de collage"
	},

	pastefromword :
	{
		confirmCleanup	: "Le texte que vous voulez coller semble avoir été copié à partir de Word. Voulez-vous le nettoyer avant de le coller ?",
		toolbar			: "Collage spécial",
		title			: "Collage spécial",
		error			: "Le nettoyage des données collées n'a pas pu être effectué en raison d'une erreur interne"
	},

	pasteText :
	{
		button	: "Coller en tant que texte brut",
		title	: "Coller en tant que texte brut"
	},

	templates :
	{
		button 			: "Modèles",
		title : "Modèles de contenu",
		options : "Options de modèle",
		insertOption: "Remplacer le contenu réel",
		selectPromptMsg: "Sélectionner le modèle à ouvrir dans l'éditeur",
		emptyListMsg : "(Aucun modèle défini)"
	},

	showBlocks : "Afficher les blocs",

	stylesCombo :
	{
		label		: "Styles",
		panelTitle 	: "Styles",
		panelTitle1	: "Styles de bloc",
		panelTitle2	: "Styles internes",
		panelTitle3	: "Styles d'objet"
	},

	format :
	{
		label		: "Formater",
		panelTitle	: "Formatage du paragraphe",

		tag_p		: "Normal",
		tag_pre		: "Mis(e) en forme",
		tag_address	: "Adresse",
		tag_h1		: "En-tête 1",
		tag_h2		: "En-tête 2",
		tag_h3		: "En-tête 3",
		tag_h4		: "En-tête 4",
		tag_h5		: "En-tête 5",
		tag_h6		: "En-tête 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Créer un conteneur Div",
		toolbar				: "Créer un conteneur Div",
		cssClassInputLabel	: "Classes de feuille de style",
		styleSelectLabel	: "Style",
		IdInputLabel		: "Id",
		languageCodeInputLabel	: " Code de la langue",
		inlineStyleInputLabel	: "Style interne",
		advisoryTitleInputLabel	: "Titre de recommandation",
		langDirLabel		: "Sens de la langue",
		langDirLTRLabel		: "De gauche à droite (GAD)",
		langDirRTLLabel		: "De droite à gauche (DAG)",
		edit				: "Editer Div",
		remove				: "Supprimer Div"
  	},

	iframe :
	{
		title		: "Propriétés IFrame",
		toolbar		: "Insérer IFrame",
		noUrl		: "Entrez l'URL iframe",
		scrolling	: "Activer les barres de défilement",
		border		: "Afficher la bordure du cadre"
	},

	font :
	{
		label		: "Police",
		voiceLabel	: "Police",
		panelTitle	: "Nom de police"
	},

	fontSize :
	{
		label		: "Taille",
		voiceLabel	: "Taille de police",
		panelTitle	: "Taille de police"
	},

	colorButton :
	{
		textColorTitle	: "Couleur du texte",
		bgColorTitle	: "Couleur d'arrière-plan",
		panelTitle		: "Couleurs",
		auto			: "Automatique",
		more			: "Couleurs supplémentaires..."
	},

	colors :
	{
		"000" : "Noir",
		"800000" : "Marron",
		"8B4513" : "Cuir",
		"2F4F4F" : "Gris ardoise foncé",
		"008080" : "Sarcelle",
		"000080" : "Bleu marine",
		"4B0082" : "Indigo",
		"696969" : "Gris foncé",
		"B22222" : "Rouge brique",
		"A52A2A" : "Brun",
		"DAA520" : "Jaune paille",
		"006400" : "Vert foncé",
		"40E0D0" : "Turquoise",
		"0000CD" : "Bleu moyen",
		"800080" : "Violet",
		"808080" : "Gris",
		"F00" : "Rouge",
		"FF8C00" : "Orange foncé",
		"FFD700" : "Mordoré",
		"008000" : "Vert",
		"0FF" : "Cyan",
		"00F" : "Bleu",
		"EE82EE" : "Violet",
		"A9A9A9" : "Gris rabattu",
		"FFA07A" : "Saumon clair",
		"FFA500" : "Orange",
		"FFFF00" : "Jaune",
		"00FF00" : "Citron vert",
		"AFEEEE" : "Turquoise pâle",
		"ADD8E6" : "Bleu clair",
		"DDA0DD" : "Prune",
		"D3D3D3" : "Gris clair",
		"FFF0F5" : "Lavande rougeâtre",
		"FAEBD7" : "Blanc antique",
		"FFFFE0" : "Jaune clair",
		"F0FFF0" : "Miel",
		"F0FFFF" : "Azur",
		"F0F8FF" : "Bleu Alice",
		"E6E6FA" : "Lavande",
		"FFF" : "Blanc"
	},

	scayt :
	{
		title			: "Vérifier l'orthographe pendant la saisie",
		opera_title		: "Non pris en charge par Opera",
		enable			: "Activer SCAYT",
		disable			: "Désactiver SCAYT",
		about			: "A propos de SCAYT",
		toggle			: "Activer/désactiver SCAYT",
		options			: "Options",
		langs			: "Langues",
		moreSuggestions	: "Suggestions supplémentaires",
		ignore			: "Ignorer",
		ignoreAll		: "Ignorer tout",
		addWord			: "Ajouter un mot",
		emptyDic		: "Le nom du dictionnaire ne doit pas être vide.",

		optionsTab		: "Options",
		allCaps			: "Ignorer les mots en majuscules",
		ignoreDomainNames : "Ignorer les noms de domaine",
		mixedCase		: "Ignorer les mots à casse mixte",
		mixedWithDigits	: "Ignorer les mots comportant des chiffres",

		languagesTab	: "Langues",

		dictionariesTab	: "Dictionnaires",
		dic_field_name	: "Nom du dictionnaire",
		dic_create		: "Créer",
		dic_restore		: "Restaurer",
		dic_delete		: "Supprimer",
		dic_rename		: "Renommer",
		dic_info		: "A l'origine, le dictionnaire utilisateur est stocké dans un cookie. Toutefois, les cookies sont limités en taille. Lorsque le dictionnaire utilisateur devient trop volumineux pour être stockée dans un cookie, il peut être stocké sur notre serveur. Pour stocker votre dictionnaire personnel sur notre serveur, vous devez lui donner un nom. Si vous avez déjà un dictionnaire stocké, entrez son nom et cliquez sur le bouton Restaurer.",

		aboutTab		: "A propos de"
	},

	about :
	{
		title		: "A propos de CKEditor",
		dlgTitle	: "A propos de CKEditor",
		help	: "Consultez $1 pour obtenir de l'aide.",
		userGuide : "Guide d'utilisation de CKEditor",
		moreInfo	: "Pour obtenir des informations sur les licences, consultez notre site Web :",
		copy		: "Copyright &copy; $1. Tous droits réservés."
	},

	maximize : "Agrandir",
	minimize : "Réduire",

	fakeobjects :
	{
		anchor	: "Point d'ancrage",
		flash	: "Animation flash",
		iframe		: "IFrame",
		hiddenfield	: "Zone masquée",
		unknown	: "Objet inconnu"
	},

	resize : "Faire glisser pour redimensionner",

	colordialog :
	{
		title		: "Sélectionner une couleur",
		options	:	"Options de couleur",
		highlight	: "Mettre en évidence",
		selected	: "Couleur sélectionnée",
		clear		: "Effacer"
	},

	toolbarCollapse	: "Réduire la barre d'outils",
	toolbarExpand	: "Développer la barre d'outils",

	toolbarGroups :
	{
		document : "Document",
		clipboard : "Presse-papiers/Annuler",
		editing : "Edition",
		forms : "Formulaires",
		basicstyles : "Styles de base",
		paragraph : "Paragraphe",
		links : "Liens",
		insert : "Insérer",
		styles : "Styles",
		colors : "Couleurs",
		tools : "Outils"
	},

	bidi :
	{
		ltr : "Direction du texte de gauche à droite",
		rtl : "Direction du texte de droite à gauche"
	},

	docprops :
	{
		label : "Propriétés de document",
		title : "Propriétés de document",
		design : "Conception",
		meta : "Balises meta",
		chooseColor : "Choisir",
		other : "Autre ...",
		docTitle :	"Titre de la page",
		charset : 	"Codage de jeu de caractères",
		charsetOther : "Autre codage de jeu de caractères",
		charsetASCII : "ASCII",
		charsetCE : "Europe centrale",
		charsetCT : "Chinois traditionnel (Big5)",
		charsetCR : "Cyrillique",
		charsetGR : "Grec",
		charsetJP : "Japonais",
		charsetKR : "Coréen",
		charsetTR : "Turc",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Europe occidentale",
		docType : "En-tête de type de document",
		docTypeOther : "Autre en-tête de type de document",
		xhtmlDec : "Déclarations XHTML d'inclusion",
		bgColor : "Couleur d'arrière-plan",
		bgImage : "URL d'image d'arrière-plan",
		bgFixed : "Arrière-plan non défilant (fixe)",
		txtColor : "Couleur du texte",
		margin : "Marges de page",
		marginTop : "Haut",
		marginLeft : "Gauche",
		marginRight : "Droite",
		marginBottom : "Bas",
		metaKeywords : "Mots clés d'indexation de document (séparés par des virgules)",
		metaDescription : "Description du document",
		metaAuthor : "Auteur",
		metaCopyright : "Copyright",
		previewHtml : "<p>Voici un <strong>modèle de texte</strong>. Vous utilisez <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "pouces",
			widthCm	: "centimètres",
			widthMm	: "millimètres",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "points",
			widthPc	: "points pica",
			required : "Obligatoire"
		},
		table :
		{
			createTable : 'Insérer un tableau',
			heightUnit	: "Unité de hauteur :",
			insertMultipleRows : "Insérer des lignes",
			insertMultipleCols : "Insérer des colonnes",
			noOfRows : "Nombre de lignes :",
			noOfCols : "Nombre de colonnes :",
			insertPosition : "Position :",
			insertBefore : "Avant",
			insertAfter : "Après",
			selectTable : "Sélectionnez un tableau",
			selectRow : "Sélectionner une ligne",
			columnTitle : "Largeur de colonne",
			colProps : "Propriétés de la colonne",
			invalidColumnWidth	: "La largeur de colonne doit être un nombre positif.",
			fixedColWidths : "Largeurs de colonne fixes"
		},
		cell :
		{
			title : "Cellule"
		},
		colordialog :
		{
			currentColor	: "Couleur actuelle"
		},
		emoticon :
		{
			angel		: "Ange",
			angry		: "Fâché",
			cool		: "Décontracté",
			crying		: "En pleurs",
			eyebrow		: "Sourciller",
			frown		: "Bouder",
			goofy		: "Grimace",
			grin		: "Grand sourire",
			half		: "Sourire en coin",
			idea		: "Idée",
			laughing	: "Rire",
			laughroll	: "Hurler de rire",
			no			: "Non",
			oops		: "Oops",
			shy			: "Timide",
			smile		: "Sourire",
			tongue		: "Tirer la langue",
			wink		: "Clin d'oeil",
			yes			: "Oui"
		},

		menu :
		{
			link	: "Insertion de lien",
			list	: "Liste",
			paste	: "Coller",
			action	: "Action",
			align	: "Aligner",
			emoticon: "Emoticône"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Liste numérotée",
			bulletedTitle		: "Liste à puces",
			description			: "Les paramètres seront appliqués au niveau de liste en cours",
			fontsize			: "Taille de police :"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Entrez un nom de signet explicite, tel que 'Section 1.2'. Après avoir inséré le signet, cliquez sur sur l'icône 'Lien vers' ou 'Lien de signet de document' pour l'y associer.",
			title		: "Lien de signet de document",
			linkTo		: "Lien vers :"
		},

		urllink :
		{
			title : "Lien de l'URL",
			linkText : "Texte du lien :",
			selectAnchor: "Sélectionnez une ancre :",
			nourl: "Entrez une URL dans la zone de texte.",
			urlhelp: "Entrez ou collez une URL à ouvrir lorsque les utilisateurs cliquent sur ce lien, par exemple, http://www.exemple.com.",
			displaytxthelp: "Entrez le texte à afficher pour le lien.",
			openinnew : "Ouvrir le lien dans une nouvelle fenêtre"
		},

		spellchecker :
		{
			title : "Vérification orthographique",
			replace : "Remplacer :",
			suggesstion : "Suggestions :",
			withLabel : "Avec :",
			replaceButton : "Remplacer",
			replaceallButton:"Remplacer tout",
			skipButton:"Ignorer",
			skipallButton: "Ignorer tout",
			undochanges: "Annuler les modifications",
			complete: "Vérification orthographique terminée",
			problem: "Problème d'extraction des données XML",
			addDictionary: "Ajouter au dictionnaire",
			editDictionary: "Editer le dictionnaire"
		},

		status :
		{
			keystrokeForHelp: "Appuyez sur ALT 0 pour obtenir de l'aide"
		},

		linkdialog :
		{
			label : "Boîte de dialogue Lier"
		},

		imagedatauri :
		{
			error : "Le collage des images n'est actuellement pas pris en charge. Utilisez l'option \'Insérer une image\' de la barre d'outils à la place."
		},

		image :
		{
			previewText : "Le texte va entourer l'image que vous ajoutez, comme illustré dans cet exemple.",
			fileUpload : "Sélectionnez un fichier d'image à partir de votre ordinateur :"
		}
	}

};
