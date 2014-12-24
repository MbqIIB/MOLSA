/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,
{
	specialchar : function(dialogDefinition, editor)
	{
		if ('specialchar' !== dialogDefinition.dialog.getName())
		{
			return;
		}

		/* The dialog's dimensions are set in the skins skin.js */

		dialogDefinition.getContents('info').elements[0].widths = ['90%', '10%'];
	}
});
