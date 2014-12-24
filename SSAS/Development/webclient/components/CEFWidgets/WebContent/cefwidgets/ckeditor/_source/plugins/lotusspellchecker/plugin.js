/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

/**
 * @fileOverview Spell Check As You Type (IBM).
 */
(function()
{
	CKEDITOR.plugins.add( 'lotusspellchecker',
	{
		requires: ['ajax', 'dialog', 'styles'],

		init: function(editor)
		{
			//add plugin to toolbar and set up dialog reference.
			editor.addCommand('lotusspellchecker', new CKEDITOR.dialogCommand('lotusspellchecker'));
			editor.ui.addButton('LotusSpellChecker',
			{
				label: editor.lang.ibm.spellchecker.title,
				command: 'lotusspellchecker',
				modes: {source: 0, wysiwyg: 1}
			});
			CKEDITOR.dialog.add('lotusspellchecker', this.path + 'dialogs/lotusspellchecker.js');
		}
	});
})();
