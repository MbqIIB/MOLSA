/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license

Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.skins.add('lotus21', (function() {
	var preload = [];

	if (CKEDITOR.env.ie && CKEDITOR.env.version < 7) {

		// For IE6, we need to preload some images, otherwhise they will be
		// downloaded several times (CSS background bug).
		preload.push('icons_ltr_ie6.png');
		preload.push('icons_rtl_ie6.png');
	}

	// Because we customise the dialogs they need new widths and heights.
	var dialogDimensions = {
		// Dialog name: [width, height]
		anchor: [300, 120],
		allyHelp: [600, 400],
		cellProperties: [280, 230],
		colordialog: [360, 230],
		find: [300, 100],
		flash: [340, 292],
		iframe: [350, 220],
		image: [366, 353],
		link: [450, 300],
		paste: [300, 220],
		pastetext: [300, 220],
		smiley: [300, 80],
		specialchar: [410, 305],
		table: [300, 100],
		tableProperties: [300, 250],
		numberedListStyle: [360, 45],
		bulletedListStyle: [200, 45]
	};

	return {
		preload		: preload,
		editor		: { css: [ 'editor.css' ] },
		dialog		: { css: [ 'dialog.css' ], dimensions: dialogDimensions },
		templates	: { css: [ 'templates.css' ] },
		margins		: [ 0, 14, 18, 14 ]
	};
})());
