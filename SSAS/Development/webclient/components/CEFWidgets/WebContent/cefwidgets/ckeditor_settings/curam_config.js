/*
 * Copyright 2010,2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/* Modification History
 * ====================
 * 9 Sept 2013 DM [CR00395981]   Provide the ability to select the spellcheck language 
 								 by adding a new 'LangOption' custom plugin and populating it
 								 with values coming from a codetable.
 * 29 May 2013 DM [CR00384800]   The 'lotusspellchecker' plugin has been enabled within CKEditor
 *
 * 19 Apr 2013 SD   [CR00381444]  The 'Curam' context has been removed from the
 *                                 skin settings.
 * 04 Jan 2013 SD   [CR00362536]  Remove 'Curam' context from config path for CSS settings.
 * 22 Aug 2012 ELG  [CR00338893]  Update related to locale setting. This update
 *                                is needed for the CKEditor localisation to work properly.
 * 21 Jun 2012 DG   [CR00329440]  Update to set the locale.
 * 13 Mar 2012 BD   [CR00310120]  Updates to facilitate the migration to the IBM
 *                                FCKEditor. Some plugins have been removed to enable
 *                                the working of the FCKEditor. TODO. Revisit the
 *                                the removal of these plugins to check if it was 
 *                                necessary.
 * 01 Nov 2010 PDN  [CR00224597]  Created for the CKEditor Rich Text Editor.
 */


/*
 * This function defines the default configuration for the rich text editor
 * 
 */
CKEDITOR.editorConfig = function( config )
{
    config.uiColor = '#FFFFFF';
    
    // BEGIN, CR00338893, ELG
    // Set the locale
    config.language = dojo.locale;
    // END, CR00338893
    
    // The css file this is used for the text area
    config.contentsCss = '../cefwidgets/ckeditor_settings/curam_contents.css';
    
    // The spell check as you type function
    config.scayt_autoStartup = false;

    config.removePlugins = 'elementspath|scayt|wsc|div';
        
    config.toolbarCanCollapse = false;
    config.resize_enabled = false;
    
    // Define the Toolbar and its items
    config.toolbar = 'CEFToolbar';
    
    // Define the styling of the widget
    config.skin = 'curamv1,../../cefwidgets/ckeditor_settings/skins/curamv1/';
     
    if (enableSpellcheckPlugin === 'true') {
   	 config.toolbar_CEFToolbar = 
    		[
      			['Cut','Copy','Paste','PasteText','Print'],
      			['Link','Unlink'],
      			['Undo','Redo',,'SelectAll','RemoveFormat','Bold','Italic','Underline'],
      			['TextColor','BGColor'],
      			['Subscript','Superscript','NumberedList','BulletedList','Outdent','Indent'],
      			['Font','FontSize'],
				['LangOption','LotusSpellChecker']
			];
	
   		//Lotus Spell Checker config.
		config.extraPlugins += ',customdialogs,lotusspellchecker,langoption';
		config.lotusSpellChecker = {
			service:'XTAF',
			restUrl:'/spellbridge/spellcheck/rest/spell',
			lang:spellcheckDefaultLocale[0],
			suggestions:'5',
			format:'json',
			highlight: { element : 'span', styles : { 'background-color' : 'yellow', 'color' : 'black' } },
        	preventCache: true
		};
    } else {
     config.toolbar_CEFToolbar = 
    	[
      		['Cut','Copy','Paste','PasteText','Print'],
      		['Link','Unlink'],
      		['Undo','Redo',,'SelectAll','RemoveFormat','Bold','Italic','Underline'],
      		['TextColor','BGColor'],
      		['Subscript','Superscript','NumberedList','BulletedList','Outdent','Indent'],
      		['Font','FontSize']
    	];
    	config.extraPlugins += ',customdialogs';
     }
 
} ;
