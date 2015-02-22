/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

CKEDITOR.plugins.add( 'lotusbidi',
{

	init : function( editor )
	{
		editor.on('key', function ( evt )
			{
				switch ( evt.data.keyCode )
				{
					case CKEDITOR.CTRL + CKEDITOR.SHIFT + 88 : // CTRL+SHIFT+X
						evt.cancel();
				}
			}, editor);

	},

	afterInit : function( editor )
	{
		var editorDir = editor.config.contentsLangDirection;
		editorDir == 'ui' && ( editorDir = editor.lang.dir );

		editor.dataProcessor.htmlFilter.addRules(
			{
				 elements :
				 {
					 $ : function( element )
					 {
						if (!element.parent.parent && CKEDITOR.dtd.$block[ element.name ])
						{
							 element.attributes.dir = computeDir( element );
						}
					 }
				 }
			});

		function computeDir( element )
		{
			 do
			 {
				if ( element.attributes && element.attributes.dir )
				{
					return element.attributes.dir;
				}
			 }
			 while ( ( element = element.parent ) )

			 return editorDir;
		}
	}
} );
