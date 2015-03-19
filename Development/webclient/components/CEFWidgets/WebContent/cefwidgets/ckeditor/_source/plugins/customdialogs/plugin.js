/* Copyright IBM Corp. 2010-2013 All Rights Reserved.   */


if (CKEDITOR.ibm === undefined) { CKEDITOR.ibm = {}; }

/**
 * Class used to customise the standard dialogs shipped with CKEditor. A property named
 * after a dialog name references a function that is used to modify the corresponding
 * dialog. Each function is split out into its own JavaScript file, named after the dialog
 * it customises. These JavaScript files are located in the 'dialogs' folder in this plugin.
 * Each of these JavaScript files are responsible for adding their function to this class.
 */

CKEDITOR.ibm.dialogs = CKEDITOR.tools.createClass( {

	$ : function() { },

	statics: {

		/** The default comma separated list of dialogs that are to be customized. This can be configured using config.ibmCustomDialogs.
		 *  *** ANY CUSTOM DIALOG FILES ADDED HERE SHOULD BE PACKED INTO ckeditor.js USING ckeditor.pack ***
		 */
		customDialogs: 'table,image,flash,link,cellProperties,find,paste,pastetext,specialchar,bulletedListStyle,numberedListStyle,smiley,iframe,anchor,colordialog,tableProperties,a11yHelp',

		/** Style width used to make dialog fields the same size and expand. */
		styleWidth100Pc: 'width:100%;',

		/**
		 * Event listener that customizes the current dialog if the dialog's name is in customDialogs, and
		 * this object has a function with the same name as the dialog's name.
		 *
		 * See the files in the 'dialogs' folder of this plugin. Each dialog has a corresponding file which
		 * extends this object by adding a function called the dialog name. These files are packed into
		 * ckeditor.js during a build.
		 */
		customizeListener: function(eventInfo) {

			var data = eventInfo.data,
				editor = eventInfo.editor,
				def = data.definition,
				containsRequiredField = false;

			// Function to add an asterisk to required field labels.
			var markRequiredFields = function(elements) {
					for (var j = elements.length; j--; ) {

						// if its a vbox or hbox process its child elements.
						if (elements[j].children) {
							markRequiredFields(elements[j].children);

						// if it is a required field with a label, mark it.
						} else if (elements[j].required && elements[j].label) {
							elements[j].label = '*' + elements[j].label;
							containsRequiredField = true;
						}
					}
				};

			// loop through the tabs adding an asterisk to mark required fields.
			for (var tabId in def.contents) {
				containsRequiredField = false;
				markRequiredFields(def.contents[tabId].elements);

				/*If there is a required field on this dialog, add a label explaining the * to the beginning of the dialog.
				  * Note: any dialog that is customised will need to process this further since the customisation would otherwise remove this label. See the files in the 'dialogs' folder of this plugin.
				*/
				if (containsRequiredField){

					def.contents[tabId].add(
						{
							type : 'html',
							id : 'requiredLabel',
							style : 'color: #666666;font-size: 0.9em;padding-top:10px;',
							html : '<div>* '+ editor.lang.ibm.common.required+' </div>'
						});
				}
			}

			var dialogName = data.name;

			// Change the dialog name to find when opening the find and replace dialog
			if (dialogName === 'replace') {
				dialogName = 'find';
			}

			// Disable all dialog resizing
			this.applyCommonCustomizations (def, editor);

			// If the current dialog should be customized and a function has been added to do this then call it,
			// otherwise do nothing and allow the dialog to display as is.
			var dialogsToCustomize = editor.config.ibmCustomDialogs != undefined ? editor.config.ibmCustomDialogs : this.customDialogs;
			if (dialogsToCustomize.indexOf(dialogName) !== -1) {
				if (typeof this[dialogName] === 'function') {
					this[dialogName](def, editor);
				}
			}
		},

		applyCommonCustomizations: function(dialogDefinition, editor) {
			dialogDefinition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
		},

		getDialogWidth: function(dialog) {
			var name = dialog.getName(),
			contents = dialog.parts.contents,
				skin = dialog.getParentEditor().skin,
				width = (skin.dialog.dimensions && skin.dialog.dimensions[name] ? skin.dialog.dimensions[name][0] : dialog.definition.minWidth);
			//quirks mode requires extra width
			if (CKEDITOR.env.quirks  && CKEDITOR.env.ie){
				width += this.getWidthAdjustment(contents, width);
			}

			// Some dialog layouts increase the offsetWidth unneccessarily.
			if (name === 'image' || name === 'smiley' || name === 'a11yHelp') {
				return width;
			} else {

				// Check if the browser needs more width, but do not allow it more than 25% extra.
				return Math.min(Math.max(width, dialog.parts.contents.$.offsetWidth, dialog.parts.title.$.offsetWidth), width * 1.25);
			}
		},

		getDialogHeight: function(dialog) {
			var name = dialog.getName(),
				contents = dialog.parts.contents,
				skin = dialog.getParentEditor().skin,
				height = (skin.dialog.dimensions && skin.dialog.dimensions[name] ? skin.dialog.dimensions[name][1] : dialog.definition.minHeight);

			// Get the largest tab height.
			for (var i = contents.getChildCount(); i--; ) {
				height = Math.max(height, contents.getChild(i).getChild(0).$.offsetHeight);
			}

			//quirks mode requires extra height
			if (CKEDITOR.env.quirks && CKEDITOR.env.ie){
				height += this.getHeightAdjustment(contents, height);
			}

			return height;
		},

		//Calculate the height adjustment for quirks mode - account for padding, margins and borders
		getHeightAdjustment: function(contents, height) {

			//padding-top
			var addToHeight = this.getAdjustmentValue(contents.$.currentStyle.paddingTop, height);

			//padding-bottom
			addToHeight += this.getAdjustmentValue(contents.$.currentStyle.paddingBottom, height);

			//margin-top
			if (contents.$.currentStyle.marginTop != 'auto'){
				addToHeight += this.getAdjustmentValue(contents.$.currentStyle.marginTop, height);
			}

			//margin-bottom
			if (contents.$.currentStyle.marginBottom != 'auto'){
				addToHeight += this.getAdjustmentValue(contents.$.currentStyle.marginBottom, height);
			}

			//border-top-width
			var borderTopWidth = contents.$.currentStyle.borderTopWidth;
			if (borderTopWidth != 'thin' && borderTopWidth != 'medium' && borderTopWidth != 'thick'){
				addToHeight += this.getAdjustmentValue(borderTopWidth, height);
			}

			//border-top-bottom
			var borderBottomWidth = contents.$.currentStyle.borderBottomWidth;
			if (borderBottomWidth != 'thin' && borderBottomWidth != 'medium' && borderBottomWidth != 'thick'){
				addToHeight += this.getAdjustmentValue(borderBottomWidth, height);
			}

			return addToHeight;
		},

		//Calculate the width adjustment for quirks mode - account for padding, margins and borders
		getWidthAdjustment: function(contents, width) {

			//padding-right
			var addToWidth = this.getAdjustmentValue(contents.$.currentStyle.paddingRight, width);

			//padding-left
			addToWidth += this.getAdjustmentValue(contents.$.currentStyle.paddingLeft, width);

			//margin-right
			if (contents.$.currentStyle.marginTop != 'auto'){
				addToWidth += this.getAdjustmentValue(contents.$.currentStyle.marginRight, width);
			}

			//margin-left
			if (contents.$.currentStyle.marginBottom != 'auto'){
				addToWidth += this.getAdjustmentValue(contents.$.currentStyle.marginLeft, width);
			}

			//border-left-width
			var borderLeftWidth = contents.$.currentStyle.borderLeftWidth;
			if (borderLeftWidth != 'thin' && borderLeftWidth != 'medium' && borderLeftWidth != 'thick'){
				addToWidth += this.getAdjustmentValue(borderLeftWidth, width);
			}

			//border-right-bottom
			var borderRightWidth = contents.$.currentStyle.borderRightWidth;
			if (borderRightWidth != 'thin' && borderRightWidth != 'medium' && borderRightWidth != 'thick'){
				addToWidth += this.getAdjustmentValue(borderRightWidth, width);
			}

			return addToWidth;
		},

		//Calculate the adjustment value for a particular property value
		getAdjustmentValue: function(propertyValue, height) {

			var adjustment;

			//calculate the adjustment if the value uses %
			if (propertyValue.indexOf('%') != -1){
				propertyValue = Math.abs(parseInt(propertyValue, 10))/100;
				adjustment = height*propertyValue;
			}else{
				//convert em, pt, px etc values to a number
				propertyValue = Math.abs(parseInt(propertyValue, 10));
				adjustment = propertyValue;
			}

			return adjustment;
		},

		dialogSizeListener: function(evt) {

			evt.data.definition.dialog.on('load', function(evt) {
				var dialog = evt.sender,
					viewSize = CKEDITOR.document.getWindow().getViewPaneSize();

				// Set the size of the dialogs content area.
				dialog.parts.contents.setStyles({
						width: CKEDITOR.ibm.dialogs.getDialogWidth(dialog) + 'px',
						height: CKEDITOR.ibm.dialogs.getDialogHeight(dialog) + 'px'
				});

				// The the dialog to recalculate its size next time dialog.getSize() is called.
				dialog._.updateSize = true;
				var dialogSize = dialog.getSize();

				// Move the dialog to the center of the screen, using the width and height of the entire dialog.
				dialog.move((viewSize.width - dialogSize.width) / 2,
							(viewSize.height - dialogSize.height) / 2);
			});
		}
	}
});

(function()
{

	/**
	 * Determines if the specified listener function is registered to be called on the
	 * CKEDITOR.dialogDefinition event.
	 */
	var	isListenerRegistered = function(listenerFunction) {

		if (!CKEDITOR.hasListeners('dialogDefinition')) {
			return false;
		}

		var index = CKEDITOR._.events.dialogDefinition.getListenerIndex(listenerFunction);
		return (index >= 0);
	};

	CKEDITOR.plugins.add('customdialogs', {

	// @Packager.Remove.Start

		beforeInit: function(editor) {

			// Load up the files containing the custom dialog functions. These are packed into ckeditor.js during a build.
			var names = editor.config.ibmCustomDialogs != undefined ? editor.config.ibmCustomDialogs.split(',') : CKEDITOR.ibm.dialogs.customDialogs.split(',');
			var dialogPath = this.path + 'dialogs/';
			for (idx in names) {
				CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(dialogPath + names[idx] + '.js'));
			}
		},
	// @Packager.Remove.End

		init: function(editor) {

			// Register the customise dialog listener function once, to fire on the CKEDITOR.dialogDefinition event.
			var dialogs = CKEDITOR.ibm.dialogs;
			if (!isListenerRegistered(dialogs.customizeListener)) {
				CKEDITOR.on('dialogDefinition', dialogs.customizeListener, dialogs, null, 1);
			}

			// Register the dialog size listener function once, to fire on the CKEDITOR.dialogDefinition event.
			if (!isListenerRegistered(dialogs.dialogSizeListener)) {
				CKEDITOR.on('dialogDefinition', dialogs.dialogSizeListener, dialogs, null, 1);
			}

			// Listen for doubleclick events that open dialogs.
			editor.on('doubleclick', function(evt) {

				// Open the urllink dialog instead of the link dialog.
				if (typeof evt.data.dialog !== 'undefined' && evt.data.dialog !== '') {
					evt.data.dialog = '';
				}
			}, null, null, 1000);

			// Set the order of the OK and Cancel dialog buttons the same as the language direction.
			editor.config.dialog_buttonsOrder = editor.lang.dir;
		},

		afterInit: function(editor) {
			if(editor.ui._.items.Find){
				editor.ui._.items.Find.args[0].label = editor.lang.findAndReplace.title;
			}
		}
	});

})();
