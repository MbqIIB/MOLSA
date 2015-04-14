/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

/**	@fileOverview Plugin to create new lotus toolbars and drop down menus used in the lotus toolbars.
 *
 *	This plugin also adds the ability to create command button menus by specifing the
 *	definitions in a config file. The following configuration creates two menus,
 *	MenuLink and MenuPaste.
 *
 *	config.menus =
 *	{
 *		link :
 *		{
 *			buttonClass : 'cke_button_link',
 *			commands : ['urllink'],
 *			label : 'link.title'
 *		},
 *		paste :
 *		{
 *			buttonClass : 'cke_button_paste',
 *			commands : ['paste', 'pastetext', 'pastefromword']
 *		}
 *	};
 *
 *	The menus will contain buttons for each command listed in the commands property. The
 *	label property should contain the name of a language object in the language file.
 *	The string 'link.title' will reference the string returned by editor.lang.link.title;
 *	If the label property is omitted the language property editor.lang.ibm.menu.<name> will
 *	be used, where <name> is the menu definition property name.
 */
 	CKEDITOR.plugins.add('lotustoolbars',
	{

		requires : ['menubutton', 'toolbar'],
		init : function( editor )
		{
			//only support floating toolbar if the ibmFloatToolbar config option is true, and do not support for IE6 or quirks mode (position:fixed does not work on these browsers)
			if (!editor.config.ibmFloatToolbar || (CKEDITOR.env.ie && CKEDITOR.env.version < 7 ) || (CKEDITOR.env.quirks && CKEDITOR.env.ie))
				return;

			var toolbarDiv, editorIFrame, toolbarParentTD, win, iframeOffset,
				prevHeight,		//used to monitor the height of the editor in IE so that the toolbar position can be updated when content is deleted from the editor
				toolbarFloated = false,
				toolbarItemFocused = false,		//the toolbar should remain floating for all toolbar invoked UI elements - menu, dialogs, font combo boxes, color panels, ALT+F10, ALT+F11
				hiddenDiv = new CKEDITOR.dom.element("div");		//div used to set min width on editor when browser window is resized

			/* Overwrite the onOpen functions of panel buttons and rich combos so that we know when context menus, combo boxes, color panels etc are open.
			 * The floating toolbar should remain floated when these ui elements are visible.
			 */
			var uiItems = editor.ui._.items;	//reference to all toolbar elements

			for (var i in uiItems){
				if (uiItems[i].type == 'panelbutton' || uiItems[i].type == 'richcombo') {

					//store a reference to the onOpen function of uiItem if it exists
					if(uiItems[i].args[0].onOpen){
						var uiItemOnOpen = uiItems[i].args[0].onOpen;
						uiItems[i].args[0].origOnOpen = uiItemOnOpen;		//add it to the uiItem so that it has the correct scope
					}

					//overwrite onOpen to execute origOnOpen() if it exists and then set the toolbarItemFocused flag
					uiItems[i].args[0].onOpen = function (){
						if (this.origOnOpen)
							this.origOnOpen();	//call original onOpen() if it exists

						toolbarItemFocused = true;
					}
				}
			}

			//function called to remove scroll and resize event listeners from the browser window
			function removeListeners()
			{
				if (win.$.removeEventListener){
					win.$.removeEventListener('scroll', positionToolbar, false);
					win.$.removeEventListener('resize', resetToolbarProps, false);
				} else if (win.$.detachEvent){
					win.$.detachEvent('onscroll', positionToolbar);
					win.$.detachEvent('onresize', resetToolbarProps);
				}
			}

			//function called to add event listeners to the browser window's scroll and resize events
			function addListeners()
			{
				if (win.$.addEventListener){
					win.$.addEventListener('scroll', positionToolbar, false);
					win.$.addEventListener('resize', resetToolbarProps, false);
				} else if (win.$.attachEvent){
					win.$.attachEvent('onscroll', positionToolbar);
					win.$.attachEvent('onresize', resetToolbarProps);
				}
			}

			//function called when the browser is scrolled to determine whether to 'float' or 'dock' the toolbar
			var positionToolbar = function ()
			{

				//floating toolbar is only supported in wysiwyg mode, also check that the editor is visible
				if (editor.mode == 'wysiwyg' && editor.container.isVisible()){

					/* if a reference to the iframe element does not already exist, get it
					 * Also calling setData() on the editor recreates the iframe, therefore it is necessary to get the new editorIFrame each time setData() is called - editorIFrame.getParent() will be null if the iframe has been recreated because
					 * it will be a reference to the old iframe e.g. onCancel() of the lotusSpellChecker plugin calls setData().
					 */
					if(!editorIFrame || editorIFrame.getParent() == null)
						editorIFrame = editor.container.getElementsByTag('iframe').getItem(0);

					/* When the toolbar is floating, the iframe position is decreased by the height of the toolbar. toolbarOffset is used to monitor this difference.
					 * When the toolbar is floating, the toolbarOffset is set to 30px to ensure the toolbar is docked when the user scrolls to the top of the editor using arrow keys.
					 * When the toolbar is docked, the toolbarOffset is set to 0px to ensure the toolbar starts to float as soon as the toolbar disappears out of the current view pane.
					 */
					var toolbarOffset = toolbarFloated ? 30 : 0;
					iframeOffset = editorIFrame.getDocumentPosition().y + toolbarOffset;

					var winHeight = win.getViewPaneSize().height;
					var currentScroll = win.getScrollPosition().y;
				}

				if (editor.mode != 'wysiwyg' || (iframeOffset > currentScroll && iframeOffset < (currentScroll + winHeight))){

					//toolbar is visible in the current view pane or the editor is in source mode

					toolbarDiv.removeClass('cke_floating_toolbox');
					hiddenDiv.remove();

					if (toolbarFloated){
						if(win.$.dojo)
							fadeToolbar();
						toolbarFloated = false;
					}

				} else if (currentScroll > iframeOffset){		//if the user has already scrolled past the iframe - this prevents the toolbar being floated when the user scrolls to the page contents before the iframe
					//toolbar is not visible in the current view pane

					toolbarDiv.addClass('cke_floating_toolbox');

					//get the width of the largest toolbar group
					var width = -1,
						currentChild, currentWidth;
					for (var i = 0; i<toolbarDiv.getChildCount(); i++){
						currentChild = toolbarDiv.getChild(i);
						if (currentChild.getAttribute('class') == 'cke_toolbar'){
							currentWidth = CKEDITOR.env.ie ? currentChild.$.clientWidth : parseInt(currentChild.getComputedStyle('width'), 10);
							if(currentWidth > width){
								width = currentWidth;
							}
						}
					}

					//apply the largest toolbar width to the hidden div
					if(width != -1){
						hiddenDiv.setStyle('width', width+'px');
					}

					//In IE, we need to reserve place for the toolbar when it is docked again - set the height of the hidden div to the height of the original toolbar div ref: RTC defect 22023
					var toolbarDivHeight = CKEDITOR.env.ie ? toolbarDiv.$.clientHeight : parseInt(toolbarDiv.getComputedStyle('height'), 10);
					hiddenDiv.setStyle('height', toolbarDivHeight+'px');

					//add the hidden div to the same table cell as the toolbox div - this will prevent the editor from getting narrower than the largest toolbar group when the browser is resized
					toolbarParentTD.append(hiddenDiv);

					if (!toolbarFloated){
							if (win.$.dojo)
								fadeToolbar();
						toolbarFloated = true;
					}

					resetToolbarProps();
				}
			}

			//function called to reset the toolbar width and left positioning when the toolbar is initially floated and when the browser window is resized
			var resetToolbarProps = function ()
			{
				if (toolbarFloated){
					var tdWidth = CKEDITOR.env.ie ? toolbarParentTD.$.clientWidth : parseInt(toolbarParentTD.getComputedStyle('width'), 10);
					toolbarDiv.setStyle('width', tdWidth+'px');

					var iframeX = editorIFrame.getDocumentPosition().x,
						winX = win.getScrollPosition().x;
						toolbarDiv.setStyle('left', (iframeX-winX)+'px');
				}
			}

			//use the dojo fade effect
			var fadeToolbar = function ()
			{
				var fadeTarget =  toolbarDiv.$;
				dojo.style(fadeTarget, "opacity", "0");
				var fadeArgs = {
					node: fadeTarget,
					duration: 500
				};
				dojo.fadeIn(fadeArgs).play();
			}


			//reset editorIFrame when the editor is destroyed - ref RTC defect #27389
			editor.on('destroy', function ()
			{
				editorIFrame = null;
			});

			editor.on( 'mode', function()
			{

				if (win) {		//instanceReady has already been called

					if(editor.mode == 'wysiwyg'){ 	//wysiwyg mode

						//get a reference to the iframe element
						editorIFrame = editor.container.getElementsByTag('iframe').getItem(0);

						//focus event is not triggered when we switch mode - need to explicity add the listeners again
						addListeners();


					}else{	//editor is in source mode

						positionToolbar();

						//detach listeners for the browser scroll and resize events
						removeListeners();
					}
				}
			});

			editor.on('blur', function ()
			{
				setTimeout(function() {

					//detach listeners for the browser scroll and resize events
					removeListeners();

					if(editor.mode == 'wysiwyg' &&  !toolbarItemFocused){	//the blur event can be triggered in source mode, only dock the toolbar if in wysiwyg mode
						toolbarDiv.removeClass('cke_floating_toolbox');
						hiddenDiv.remove();
						toolbarFloated = false;
					}
				}, 100);
			});

			editor.on('focus', function ()
			{
				//if this is the first time the editor gets focus, get a reference to the toolbarDiv, window etc.
				if(!toolbarDiv){
					//find the toolbar element
					var divElements = editor.container.getElementsByTag('div');
					for(var i=0; i<divElements.count(); i++){
						if(divElements.getItem(i).getAttribute('class') == "cke_toolbox"){
							toolbarDiv = divElements.getItem(i);
							break;
						}
					}

					if(!toolbarDiv)
						return;

					toolbarParentTD = toolbarDiv.getParent();
					win = toolbarDiv.getWindow();

					prevHeight = editor.element.getSize('height');
				}

				toolbarItemFocused = false;	//reset toolbarItemFocused

				positionToolbar();

				if (editor.mode == 'wysiwyg'){
						//attach listeners for the browser scroll and resize events
						addListeners();
				}

			});

			// IE does not fire the onscroll event when content is deleted from a contentEditable area, therefore the positionToolbar handler does not get triggered.
			// For IE, we use the editor's resize event to monitor when the height of the editor gets smaller and trigger the positionToolbar hander function.
			editor.on('resize', function(){
				if (CKEDITOR.env.ie){
					var currentHeight = editor.element.getSize('height');
					if (currentHeight < prevHeight){
						positionToolbar();
					}
					prevHeight = currentHeight;
				}
			});

			//the toolbar should remain floating when a dialog is opened
			editor.on('dialogShow', function ( evt )
			{

				if (evt.data.getName() == 'find')
					toolbarItemFocused = false;
				else
					toolbarItemFocused = true;

			});

			editor.on('dialogHide', function ( evt )
			{
				setTimeout(function() {
					if (evt.data.getName() == 'find'){

						var editor = evt.editor;

						//Determine whether the selection is visible or not
						var selection = editor.getSelection();
						var selectionYOffsetEditor = selection.getStartElement().getDocumentPosition().y;	//Y offset within the editor window

						//add 1px in IE because the very start of the selection is sometimes slightly outside the current view pane
						if (CKEDITOR.env.ie)
							selectionYOffsetEditor += 1;

						iframeOffset = editorIFrame.getDocumentPosition().y;

						//Get the Yoffset in relation to the browser window. editor.window.getScrollPosition().y is the scroll position of the editor window. It will always be 0 if the editor does not have a scroll bar.
						var selectionYOffsetWindow = iframeOffset + selectionYOffsetEditor - editor.window.getScrollPosition().y;

						//when the toolbar is floated again the view pane will be reduce by the height of the toolbar
						var toolbarHeight = toolbarDiv.getParent().getSize('height', true);
						var currentScroll = win.getScrollPosition().y;
						var scrollPlusToolbar = currentScroll + toolbarHeight;
						var winHeight = win.getViewPaneSize().height;
						var winLessToolbar =  winHeight - toolbarHeight;

						if (selectionYOffsetWindow < currentScroll || selectionYOffsetWindow > (currentScroll + winHeight)){
							//selection is entirely outside the current viewpane - should only occur in the case of a collapsed selection
							selection.scrollIntoView();
						} else if (!(selectionYOffsetWindow > scrollPlusToolbar && selectionYOffsetWindow < (scrollPlusToolbar + winLessToolbar))){
							//selection is not within the view pane when the toolbar is floated (i.e. the toolbar obstructs the selection)
							var newY = (win.getScrollPosition().y - toolbarHeight ) - 10;	//add a 10px margin to ensure no overlap with the toolbar
							win.$.scrollTo(win.getScrollPosition().x, newY);		//scroll the window by the height of the toolbar to make sure the selection can be seen
						}
					}
				}, 0);

			});

			//the toolbar should remain floating when a menu is opened
			editor.on('menuShow', function ()
			{
				toolbarItemFocused = true;
			});


			//the toolbar should remain floating when ALT+F10 (toolbar navigation) and ALT+F11 (elements path navigation) are pressed
			editor.on('beforeCommandExec', function ( evt )
			{
				if(evt.data.name === 'toolbarFocus' || evt.data.name === 'elementsPathFocus'){
					toolbarItemFocused = true;
				}
			});

		},

		afterInit : function(editor)
		{
			var config = editor.config;
			if (config.menus)
			{
				this.createConfigCommandMenus(editor);
				//this.replaceLinkButtonWithMenu(editor);		//no longer want to replace the link button with the menu - both Link and MenuLink are now valid toolbar entries
			}
		},

		createConfigCommandMenus : function(editor)
		{
			var menu;
			var menus = editor.config.menus;
			for (menu in menus)
			{
				var currentMenu = menus[menu];
				if (typeof currentMenu.buttonClass != 'string'
						|| typeof currentMenu.commands === 'undefined')
				{
					continue;
				}

				var label;
				if (typeof currentMenu.label === 'string')
				{
					// The label string can be 'ibm.menus.mymenu', therefore we need to
					// navigate the lang object to the mymenu property.
					label = editor.lang;
					var langNames = currentMenu.label.split('.');
					for(var i = 0, n = langNames.length; i < n; ++i)
					{
						label = label[langNames[i]];
					}
				}
				else
				{
					label = editor.lang.ibm.menu[menu];
				}

				var groupName = 'menu' + menu;
				if (typeof currentMenu.groupName === 'string')
				{
					groupName = currentMenu.groupName;
				}

				var menuHelper = new CKEDITOR.ibm.menus(editor, groupName);
				menuHelper.createCommandMenu(
							'Menu' + menu.substr(0,1).toUpperCase() + menu.substr(1),
							label,
							currentMenu.buttonClass,
							currentMenu.commands);
			}
		},

		replaceLinkButtonWithMenu : function(editor)
		{
			var config = editor.config;

			// If there is no link menu defined do nothing.
			if (!config.menus || !config.menus.link)
			{
				return;
			}

			// Determine what toolbar is being used.
			var toolbar = (config.toolbar instanceof Array ) ?
							editor.config.toolbar :
							editor.config['toolbar_' + editor.config.toolbar];

			// [IE6] Create Array function to return index of array item.
			if (!Array.prototype.indexOf) {
			  Array.prototype.indexOf = function (obj, fromIndex) {
				if (fromIndex == null) {
					fromIndex = 0;
				} else if (fromIndex < 0) {
					fromIndex = Math.max(0, this.length + fromIndex);
				}
				for (var i = fromIndex, j = this.length; i < j; i++) {
					if (this[i] === obj)
						return i;
				}
				return -1;
			  };
			}

			for (var i = 0; i < toolbar.length; i++)
			{
				if (typeof toolbar[i] === 'object')
				{
					index = toolbar[i].items.indexOf('Link');
					if (index !== -1)
					{
						toolbar[i].items[index] = 'MenuLink';
						break; // Assume only one Link button on toolbar.
					}
				} else {
					var index = toolbar[i].indexOf('Link');
					if (index !== -1)
					{
						toolbar[i][index] = 'MenuLink';
						break; // Assume only one Link button on toolbar.
					}
				}
			}
		}

	});

	if (typeof CKEDITOR.ibm === 'undefined') { CKEDITOR.ibm = {}; }

	CKEDITOR.ibm.menus = CKEDITOR.tools.createClass(
	{
		$ : function(editor, menuGroup)
		{
			this.editor = editor;
			this._.menuGroup = menuGroup;
			this._.menuItemOrder = 0;

			if (typeof this.editor._.menuGroups[menuGroup] === 'undefined')
			{
				this.editor.addMenuGroup(menuGroup);
			}
		},

		privates :
		{
			getCommandLabel : function(commandName)
			{
				for (var name in this.editor.ui._.items)
				{
					if (this.editor.ui._.items[name].command === commandName)
					{
						return this.editor.ui._.items[name].args[0].label;
					}
				}
				return '';
			},

			getCommandClassName : function(commandName)
			{
				for (var name in this.editor.ui._.items)
				{
					if (this.editor.ui._.items[name].command === commandName)
					{
						var className = this.editor.ui._.items[name].args[0].className;
						if ( typeof className === 'undefined' )
						{
							return 'cke_button_' + commandName;
						}
					}
				}
				return '';
			},

			getMenuItemOrder : function()
			{
				return ++this._.menuItemOrder;
			},

			getMenuItemState : function( itemName )
			{
				var item = this.editor.getMenuItem( itemName );
				if (typeof item === 'undefined')
				{
					return CKEDITOR.TRISTATE_OFF;
				}

				var cmd = this.editor.getCommand( item.cmdName );
				if (typeof cmd === 'undefined')
				{
					return CKEDITOR.TRISTATE_OFF;
				}

				return cmd.state;
			}
		},

		proto :
		{
			getIconPath : function()
			{
				return this._.iconPath;
			},

			getMenuGroup : function()
			{
				return this._.menuGroup;
			},

			addMenuItem : function(commandName, menuName)
			{
				var cmd = this.editor.getCommand(commandName);
				if (typeof cmd !== 'object')
				{
					return;
				}

				this.editor.addMenuItem(menuName + '_' + commandName,
					{
						cmdName : commandName,
						onClick : function() {
							// Use onClick with the command, this way it will be rendered even if disabled.
							this.editor.getCommand( this.cmdName ).exec();
						},
						group : this.getMenuGroup(),
						label : this._.getCommandLabel(commandName),
						order : this._.getMenuItemOrder(),
						className : this._.getCommandClassName(commandName)

					});
			},

			createCommandMenu : function(name, label, className, commands)
			{
				var me = this;
				var definition =
				{
					label : label,
					title : label,
					className : className,
					modes : { wysiwyg : 1 },
					onRender: function()
					{
						for (var idx = 0; idx < commands.length; ++idx)
						{
							me.addMenuItem(commands[idx], name);
						}
					},
					onMenu : function(element, selection)
					{
						var itemsToDisplay = {};
						for (var idx = 0; idx < commands.length; ++idx)
						{
							var itemName = name + '_' + commands[idx];
							itemsToDisplay[itemName] = me._.getMenuItemState(itemName);
						}
						return itemsToDisplay;
					}
				};
				this.createMenu(name, definition);
			},

			createMenu : function(name, definition)
			{
				this.editor.ui.add(name, CKEDITOR.UI_MENUBUTTON, definition);
			}
		}
	});

CKEDITOR.tools.extend( CKEDITOR.config,
{
	ibmFloatToolbar : false
} );

CKEDITOR.config.toolbar_Slim =
[
	['Bold','Italic','Underline','Strike','TextColor','NumberedList','BulletedList','BidiLtr','BidiRtl','Image','Link','Smiley']
];


CKEDITOR.config.toolbar_Medium =
[
	{ name: 'tools',		items :['Undo','Redo','MenuPaste','LotusSpellChecker']},
	{ name: 'styles',		items :['Font','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor']},
	{ name: 'paragraph',	items :['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'NumberedList','BulletedList','Indent','Outdent','BidiLtr','BidiRtl']},
	{ name: 'insert',		items :['Table','Image','MenuLink','Anchor','Smiley']}
];


CKEDITOR.config.toolbar_Large =
[
	{ name: 'tools',		items :['Undo','Redo','MenuPaste','Find','LotusSpellChecker','ShowBlocks']},
	{ name: 'styles',		items :['Format','Font','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor','Subscript','Superscript','RemoveFormat']},
	{ name: 'paragraph',	items :['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','NumberedList','BulletedList','Indent','Outdent','Blockquote','BidiLtr','BidiRtl' ]},
	{ name: 'insert',		items :['Table','Image','MenuLink','Anchor','Iframe','Flash','PageBreak','HorizontalRule','SpecialChar', 'Smiley']}
];


CKEDITOR.config.toolbar = 'Large';
