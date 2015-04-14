/*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/* Modification History
 * ====================
 * 28 Jan 2011 MJC   Created configuration of CKEditor for use with Quick 
 * Notes.
 */


/*
 * This function defines the default configuration for the rich text editor
 * 
 */
CKEDITOR.editorConfig = function( config )
{
    config.uiColor = '#FFFFFF';
    
    // The css file this is used for the text area
    config.contentsCss = '/Curam/cefwidgets/ckeditor_settings/curam_contents.css';
    
    // The spell check as you type function
    config.scayt_autoStartup = false;

    config.removePlugins = 'elementspath|scayt|wsc|div';
    config.toolbarCanCollapse = false;
    config.resize_enabled = false;
     
    // Define the Toolbar and its items
    config.toolbar = 'CEFToolbar';

    config.toolbar_CEFToolbar =     
    [
        ['Cut', 'Copy', 'Paste', 'Bold', 'Italic', 'Underline', 'TextColor'] 
    ];
    
    // Define the styling of the widget
    config.skin = 'curamv1,/Curam/cefwidgets/ckeditor_settings/skins/curamv1/';
    
    // Define locale
    config.language = dojo.locale;
}    
//BEGIN,CR00266959,ZT
CKEDITOR.on( 'instanceReady', function( ev )
    {
        // To format the output of the CKEditor to be "\r\n" when breaking the line.
        ev.editor.dataProcessor.writer.lineBreakChars = '\r\n';      
});  
//END,CR00266959