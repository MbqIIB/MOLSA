   CKEDITOR.plugins.add('langoption',
    {
    requires : ['richcombo'],
    init: function (editor) {
            var pluginName = 'langoption';
            var config = editor.config;
			lang = editor.lang.format;
					
            editor.ui.addRichCombo('LangOption',
				{
					title: editor.lang.ibm.spellchecker.title,
                    multiSelect: false,
                    className : 'cke_format',
                    panel :
					{
					css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
					attributes : { 'aria-label' : editor.lang.ibm.spellchecker.title }
					},
                    init: function () {
                         	for (var this_locale in spellcheckLocales){
                     			this.add(spellcheckLocales[this_locale][0],spellcheckLocales[this_locale][1],spellcheckLocales[this_locale][2]);
                    		}
                    },
        			onRender : function()
					{
					 	editor.on( 'selectionChange', function( ev1 )
							{
							editor.config.lotusSpellChecker.lang=this.getValue();
							},
							this);
						
						editor.on( 'instanceReady', function( ev )
							{
								this.setValue(spellcheckDefaultLocale[0],spellcheckDefaultLocale[1],spellcheckDefaultLocale[1]);
							
					    	},this);
					},
					
					onClick : function( value )
					{
						editor.config.lotusSpellChecker.lang=value;
					}
        		
        		}
				
				);
				

        }
    });

