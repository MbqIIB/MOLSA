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
 * 1 Nov 2010 PDN   [CR00224597]  Created to support the Rich Text Editor.
 */

/**
 * This file provides javascript functionality that is required by the Rich Text
 * Editor Renderer.
 */

/**
 * The initialize method instantiate's a rich text editor by replacing an
 * existing field specified with a target id.
 * 
 * @param targetID the id of the field that will be replaced by the editor
 * @param configFile the name of the CKEditor config file
 * @param height the height of the editors content area in pixels.
 * @param width the width of the editor widget in pixels. 
 */
function initialize(targetID, configFile, height, width){
	 
	CKEDITOR.replace(targetID, {customConfig : '../ckeditor_settings/' + 
	 configFile, height: height, width: width});
}


 
 