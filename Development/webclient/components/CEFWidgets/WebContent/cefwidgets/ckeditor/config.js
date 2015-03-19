/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license

Portions Copyright IBM Corp., 2009-2013.
*/

CKEDITOR.editorConfig = function( config )
{

	config.dialog_backgroundCoverColor = 'black';
	config.dialog_backgroundCoverOpacity = 0.3;
	config.skin = 'oneui3';
	config.dialog_startupFocusTab = true;
	config.colorButton_enableMore = false;
	config.resize_enabled = false;
	config.toolbarCanCollapse = false;
	config.toolbar = 'Large';
	config.disableNativeSpellChecker = false;
	config.forceEnterMode = true;
	config.useComputedState = true;
	config.ignoreEmptyParagraph = false;
	config.autoGrow_onStartup = true;
	config.ibmFloatToolbar = true;
	config.ibmFilterPastedDataUriImage = false;

	//add a border to the default styling for find_highlight (specified in plugins/find/plugin.js) so that found text is also visibly highlighted in high contrast mode
	config.find_highlight = { element : 'span', styles : { 'background-color' : '#004', 'color' : '#fff', 'border' : '1px solid #004' } };

	// Plugins not required if 'Large' toolbar is being used.
	var removePlugins = 'scayt|wsc|div|forms|about|resize';

	// Plugins not required if 'Medium' toolbar is being used.
	//var removePlugins = 'about|colordialog|div|filebrowser|forms|maximize|newpage|popup|preview|print|resize|save|scayt|sourcearea|templates|wsc';

	// Plugins not required if 'Slim' toolbar is being used.
	//var removePlugins = 'about|bidi|blockquote|colordialog|dialogadvtab|div|filebrowser|find|flash|font|format|forms|horizontalrule|justify|maximize|newpage|pagebreak|pastefromword|pastetext|popup|preview|print|removeformat|resize|save|scayt|showblocks|showborders|sourcearea|stylescombo|table|tabletools|specialchar|templates|wsc';

	var removeRegex = new RegExp('(?:^|,)(?:' + removePlugins + ')(?=,|$)' , 'g');
	config.plugins = config.plugins.replace(removeRegex, '');
	config.plugins += ',tableresize,autogrow,sametimeemoticons,customdialogs,lotustoolbars,urllink,lotusstatusmessage,lotusbidi,lotuspastenotesdatalink,lotuspastevideo,lotuspasteiframe,lotustabletools,imagedatauri';

	// Paste from Word (Paste Special) configuration
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;

	//Example Lotus Spell Checker config.
	/*
	config.extraPlugins += ',lotusspellchecker';
	config.lotusSpellChecker = {
		service:'XTAF',
		restUrl:'',
		lang:'en',
		suggestions:'5',
		format:'json',
		highlight: { element : 'span', styles : { 'background-color' : 'yellow', 'color' : 'black' } },
        preventCache: true
	};
	*/

	// See the release notes for how to add a custom link dialog to the MenuLink button menu.
	config.menus =
	{
		/* Create a menu called MenuLink containing menu items for the urllink and bookmarks commands.
		   Include 'MenuLink' in the toolbar definition to see this menu in the editor*/
		link :
		{
			buttonClass : 'cke_button_link',
			commands : ['link', 'bookmark']
		},


		// Create a menu called MenuPaste containing menu items for the specified commands.
		paste :
		{
			buttonClass : 'cke_button_pastetext',
			groupName : 'clipboard',
			commands : ['paste', 'pastetext']
			// label will default to editor.lang.ibm.menu.paste
		}
	};
};
