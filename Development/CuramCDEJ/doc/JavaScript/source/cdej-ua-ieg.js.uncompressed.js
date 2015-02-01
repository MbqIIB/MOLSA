require({cache:{
'dijit/form/TextBox':function(){
require({cache:{
'url:dijit/form/templates/TextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox", [
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/sniff", // has("ie") has("mozilla")
	"dojo/_base/window", // win.doc.selection.createRange
	"./_FormValueWidget",
	"./_TextBoxMixin",
	"dojo/text!./templates/TextBox.html",
	".."	// to export dijit._setSelectionRange, remove in 2.0
], function(declare, domConstruct, domStyle, kernel, lang, has, win,
			_FormValueWidget, _TextBoxMixin, template, dijit){

/*=====
	var _FormValueWidget = dijit.form._FormValueWidget;
	var _TextBoxMixin = dijit.form._TextBoxMixin;
=====*/

	// module:
	//		dijit/form/TextBox
	// summary:
	//		A base class for textbox form inputs

	var TextBox = declare(/*====="dijit.form.TextBox", =====*/ [_FormValueWidget, _TextBoxMixin], {
		// summary:
		//		A base class for textbox form inputs

		templateString: template,
		_singleNodeTemplate: '<input class="dijit dijitReset dijitLeft dijitInputField" data-dojo-attach-point="textbox,focusNode" autocomplete="off" type="${type}" ${!nameAttrSetting} />',

		_buttonInputDisabled: has("ie") ? "disabled" : "", // allows IE to disallow focus, but Firefox cannot be disabled for mousedown events

		baseClass: "dijitTextBox",

		postMixInProperties: function(){
			var type = this.type.toLowerCase();
			if(this.templateString && this.templateString.toLowerCase() == "input" || ((type == "hidden" || type == "file") && this.templateString == this.constructor.prototype.templateString)){
				this.templateString = this._singleNodeTemplate;
			}
			this.inherited(arguments);
		},

		_onInput: function(e){
			this.inherited(arguments);
			if(this.intermediateChanges){ // _TextBoxMixin uses onInput
				var _this = this;
				// the setTimeout allows the key to post to the widget input box
				setTimeout(function(){ _this._handleOnChange(_this.get('value'), false); }, 0);
			}
		},

		_setPlaceHolderAttr: function(v){
			this._set("placeHolder", v);
			if(!this._phspan){
				this._attachPoints.push('_phspan');
				// dijitInputField class gives placeHolder same padding as the input field
				// parent node already has dijitInputField class but it doesn't affect this <span>
				// since it's position: absolute.
				this._phspan = domConstruct.create('span',{ onmousedown:function(e){ e.preventDefault(); }, className:'dijitPlaceHolder dijitInputField'},this.textbox,'after');
			}
			this._phspan.innerHTML="";
			this._phspan.appendChild(document.createTextNode(v));
			this._updatePlaceHolder();
		},

		_updatePlaceHolder: function(){
			if(this._phspan){
				this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
			}
		},

		_setValueAttr: function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this.inherited(arguments);
			this._updatePlaceHolder();
		},

		getDisplayedValue: function(){
			// summary:
			//		Deprecated.  Use get('displayedValue') instead.
			// tags:
			//		deprecated
			kernel.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.", "", "2.0");
			return this.get('displayedValue');
		},

		setDisplayedValue: function(/*String*/ value){
			// summary:
			//		Deprecated.  Use set('displayedValue', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.", "", "2.0");
			this.set('displayedValue', value);
		},

		_onBlur: function(e){
			if(this.disabled){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
		},

		_onFocus: function(/*String*/ by){
			if(this.disabled || this.readOnly){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
		}
	});

	if(has("ie")){
		TextBox = declare(/*===== "dijit.form.TextBox.IEMixin", =====*/ TextBox, {
			declaredClass: "dijit.form.TextBox",	// for user code referencing declaredClass

			_isTextSelected: function(){
				var range = win.doc.selection.createRange();
				var parent = range.parentElement();
				return parent == this.textbox && range.text.length == 0;
			},

			postCreate: function(){
				this.inherited(arguments);
				// IE INPUT tag fontFamily has to be set directly using STYLE
				// the setTimeout gives IE a chance to render the TextBox and to deal with font inheritance
				setTimeout(lang.hitch(this, function(){
					try{
						var s = domStyle.getComputedStyle(this.domNode); // can throw an exception if widget is immediately destroyed
						if(s){
							var ff = s.fontFamily;
							if(ff){
								var inputs = this.domNode.getElementsByTagName("INPUT");
								if(inputs){
									for(var i=0; i < inputs.length; i++){
										inputs[i].style.fontFamily = ff;
									}
								}
							}
						}
					}catch(e){/*when used in a Dialog, and this is called before the dialog is
						shown, s.fontFamily would trigger "Invalid Argument" error.*/}
				}), 0);
			}
		});

		// Overrides definition of _setSelectionRange from _TextBoxMixin (TODO: move to _TextBoxMixin.js?)
		dijit._setSelectionRange = _TextBoxMixin._setSelectionRange = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
			if(element.createTextRange){
				var r = element.createTextRange();
				r.collapse(true);
				r.moveStart("character", -99999); // move to 0
				r.moveStart("character", start); // delta from 0 is the correct position
				r.moveEnd("character", stop-start);
				r.select();
			}
		}
	}else if(has("mozilla")){
		TextBox = declare(/*===== "dijit.form.TextBox.MozMixin", =====*/TextBox, {
			declaredClass: "dijit.form.TextBox",	// for user code referencing declaredClass

			_onBlur: function(e){
				this.inherited(arguments);
				if(this.selectOnClick){
						// clear selection so that the next mouse click doesn't reselect
					this.textbox.selectionStart = this.textbox.selectionEnd = undefined;
				}
			}
		});
	}else{
		TextBox.prototype.declaredClass = "dijit.form.TextBox";
	}
	lang.setObject("dijit.form.TextBox", TextBox);	// don't do direct assignment, it confuses API doc parser

	return TextBox;
});

},
'url:curam/widget/templates/IDXComboBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>",
'url:idx/oneui/templates/HoverHelpTooltip.html':"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>",
'dijit/_base/scroll':function(){
define("dijit/_base/scroll", [
	"dojo/window", // windowUtils.scrollIntoView
	".."	// export symbol to dijit
], function(windowUtils, dijit){
	// module:
	//		dijit/_base/scroll
	// summary:
	//		Back compatibility module, new code should use windowUtils directly instead of using this module.

	dijit.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
		// summary:
		//		Scroll the passed node into view, if it is not already.
		//		Deprecated, use `windowUtils.scrollIntoView` instead.

		windowUtils.scrollIntoView(node, pos);
	};
});

},
'dijit/_TemplatedMixin':function(){
define("dijit/_TemplatedMixin", [
	"dojo/_base/lang", // lang.getObject
	"dojo/touch",
	"./_WidgetBase",
	"dojo/string", // string.substitute string.trim
	"dojo/cache",	// dojo.cache
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.destroy, domConstruct.toDom
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window" // win.doc
], function(lang, touch, _WidgetBase, string, cache, array, declare, domConstruct, has, unload, win) {

/*=====
	var _WidgetBase = dijit._WidgetBase;
=====*/

	// module:
	//		dijit/_TemplatedMixin
	// summary:
	//		Mixin for widgets that are instantiated from a template

	var _TemplatedMixin = declare("dijit._TemplatedMixin", null, {
		// summary:
		//		Mixin for widgets that are instantiated from a template

		// templateString: [protected] String
		//		A string that represents the widget template.
		//		Use in conjunction with dojo.cache() to load from a file.
		templateString: null,

		// templatePath: [protected deprecated] String
		//		Path to template (HTML file) for this widget relative to dojo.baseUrl.
		//		Deprecated: use templateString with require([... "dojo/text!..."], ...) instead
		templatePath: null,

		// skipNodeCache: [protected] Boolean
		//		If using a cached widget template nodes poses issues for a
		//		particular widget class, it can set this property to ensure
		//		that its template is always re-built from a string
		_skipNodeCache: false,

		// _earlyTemplatedStartup: Boolean
		//		A fallback to preserve the 1.0 - 1.3 behavior of children in
		//		templates having their startup called before the parent widget
		//		fires postCreate. Defaults to 'false', causing child widgets to
		//		have their .startup() called immediately before a parent widget
		//		.startup(), but always after the parent .postCreate(). Set to
		//		'true' to re-enable to previous, arguably broken, behavior.
		_earlyTemplatedStartup: false,

/*=====
		// _attachPoints: [private] String[]
		//		List of widget attribute names associated with data-dojo-attach-point=... in the
		//		template, ex: ["containerNode", "labelNode"]
 		_attachPoints: [],
 =====*/

/*=====
		// _attachEvents: [private] Handle[]
		//		List of connections associated with data-dojo-attach-event=... in the
		//		template
 		_attachEvents: [],
 =====*/

		constructor: function(){
			this._attachPoints = [];
			this._attachEvents = [];
		},

		_stringRepl: function(tmpl){
			// summary:
			//		Does substitution of ${foo} type properties in template string
			// tags:
			//		private
			var className = this.declaredClass, _this = this;
			// Cache contains a string because we need to do property replacement
			// do the property replacement
			return string.substitute(tmpl, this, function(value, key){
				if(key.charAt(0) == '!'){ value = lang.getObject(key.substr(1), false, _this); }
				if(typeof value == "undefined"){ throw new Error(className+" template:"+key); } // a debugging aide
				if(value == null){ return ""; }

				// Substitution keys beginning with ! will skip the transform step,
				// in case a user wishes to insert unescaped markup, e.g. ${!foo}
				return key.charAt(0) == "!" ? value :
					// Safer substitution, see heading "Attribute values" in
					// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
					value.toString().replace(/"/g,"&quot;"); //TODO: add &amp? use encodeXML method?
			}, this);
		},

		buildRendering: function(){
			// summary:
			//		Construct the UI for this widget from a template, setting this.domNode.
			// tags:
			//		protected

			if(!this.templateString){
				this.templateString = cache(this.templatePath, {sanitize: true});
			}

			// Lookup cached version of template, and download to cache if it
			// isn't there already.  Returns either a DomNode or a string, depending on
			// whether or not the template contains ${foo} replacement parameters.
			var cached = _TemplatedMixin.getCachedTemplate(this.templateString, this._skipNodeCache);

			var node;
			if(lang.isString(cached)){
				node = domConstruct.toDom(this._stringRepl(cached));
				if(node.nodeType != 1){
					// Flag common problems such as templates with multiple top level nodes (nodeType == 11)
					throw new Error("Invalid template: " + cached);
				}
			}else{
				// if it's a node, all we have to do is clone it
				node = cached.cloneNode(true);
			}

			this.domNode = node;

			// Call down to _Widget.buildRendering() to get base classes assigned
			// TODO: change the baseClass assignment to _setBaseClassAttr
			this.inherited(arguments);

			// recurse through the node, looking for, and attaching to, our
			// attachment points and events, which should be defined on the template node.
			this._attachTemplateNodes(node, function(n,p){ return n.getAttribute(p); });

			this._beforeFillContent();		// hook for _WidgetsInTemplateMixin

			this._fillContent(this.srcNodeRef);
		},

		_beforeFillContent: function(){
		},

		_fillContent: function(/*DomNode*/ source){
			// summary:
			//		Relocate source contents to templated container node.
			//		this.containerNode must be able to receive children, or exceptions will be thrown.
			// tags:
			//		protected
			var dest = this.containerNode;
			if(source && dest){
				while(source.hasChildNodes()){
					dest.appendChild(source.firstChild);
				}
			}
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){
			// summary:
			//		Iterate through the template and attach functions and nodes accordingly.
			//		Alternately, if rootNode is an array of widgets, then will process data-dojo-attach-point
			//		etc. for those widgets.
			// description:
			//		Map widget properties and functions to the handlers specified in
			//		the dom node and it's descendants. This function iterates over all
			//		nodes and looks for these properties:
			//			* dojoAttachPoint/data-dojo-attach-point
			//			* dojoAttachEvent/data-dojo-attach-event
			// rootNode: DomNode|Widget[]
			//		the node to search for properties. All children will be searched.
			// getAttrFunc: Function
			//		a function which will be used to obtain property for a given
			//		DomNode/Widget
			// tags:
			//		private

			var nodes = lang.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x = lang.isArray(rootNode) ? 0 : -1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];
				if(this.widgetsInTemplate && (getAttrFunc(baseNode, "dojoType") || getAttrFunc(baseNode, "data-dojo-type"))){
					continue;
				}
				// Process data-dojo-attach-point
				var attachPoint = getAttrFunc(baseNode, "dojoAttachPoint") || getAttrFunc(baseNode, "data-dojo-attach-point");
				if(attachPoint){
					var point, points = attachPoint.split(/\s*,\s*/);
					while((point = points.shift())){
						if(lang.isArray(this[point])){
							this[point].push(baseNode);
						}else{
							this[point]=baseNode;
						}
						this._attachPoints.push(point);
					}
				}

				// Process data-dojo-attach-event
				var attachEvent = getAttrFunc(baseNode, "dojoAttachEvent") || getAttrFunc(baseNode, "data-dojo-attach-event");
				if(attachEvent){
					// NOTE: we want to support attributes that have the form
					// "domEvent: nativeEvent; ..."
					var event, events = attachEvent.split(/\s*,\s*/);
					var trim = lang.trim;
					while((event = events.shift())){
						if(event){
							var thisFunc = null;
							if(event.indexOf(":") != -1){
								// oh, if only JS had tuple assignment
								var funcNameArr = event.split(":");
								event = trim(funcNameArr[0]);
								thisFunc = trim(funcNameArr[1]);
							}else{
								event = trim(event);
							}
							if(!thisFunc){
								thisFunc = event;
							}
							// Map "press", "move" and "release" to keys.touch, keys.move, keys.release
							this._attachEvents.push(this.connect(baseNode, touch[event] || event, thisFunc));
						}
					}
				}
			}
		},

		destroyRendering: function(){
			// Delete all attach points to prevent IE6 memory leaks.
			array.forEach(this._attachPoints, function(point){
				delete this[point];
			}, this);
			this._attachPoints = [];

			// And same for event handlers
			array.forEach(this._attachEvents, this.disconnect, this);
			this._attachEvents = [];

			this.inherited(arguments);
		}
	});

	// key is templateString; object is either string or DOM tree
	_TemplatedMixin._templateCache = {};

	_TemplatedMixin.getCachedTemplate = function(templateString, alwaysUseString){
		// summary:
		//		Static method to get a template based on the templatePath or
		//		templateString key
		// templateString: String
		//		The template
		// alwaysUseString: Boolean
		//		Don't cache the DOM tree for this template, even if it doesn't have any variables
		// returns: Mixed
		//		Either string (if there are ${} variables that need to be replaced) or just
		//		a DOM tree (if the node can be cloned directly)

		// is it already cached?
		var tmplts = _TemplatedMixin._templateCache;
		var key = templateString;
		var cached = tmplts[key];
		if(cached){
			try{
				// if the cached value is an innerHTML string (no ownerDocument) or a DOM tree created within the current document, then use the current cached value
				if(!cached.ownerDocument || cached.ownerDocument == win.doc){
					// string or node of the same document
					return cached;
				}
			}catch(e){ /* squelch */ } // IE can throw an exception if cached.ownerDocument was reloaded
			domConstruct.destroy(cached);
		}

		templateString = string.trim(templateString);

		if(alwaysUseString || templateString.match(/\$\{([^\}]+)\}/g)){
			// there are variables in the template so all we can do is cache the string
			return (tmplts[key] = templateString); //String
		}else{
			// there are no variables in the template so we can cache the DOM tree
			var node = domConstruct.toDom(templateString);
			if(node.nodeType != 1){
				throw new Error("Invalid template: " + templateString);
			}
			return (tmplts[key] = node); //Node
		}
	};

	if(has("ie")){
		unload.addOnWindowUnload(function(){
			var cache = _TemplatedMixin._templateCache;
			for(var key in cache){
				var value = cache[key];
				if(typeof value == "object"){ // value is either a string or a DOM node template
					domConstruct.destroy(value);
				}
				delete cache[key];
			}
		});
	}

	// These arguments can be specified for widgets which are used in templates.
	// Since any widget can be specified as sub widgets in template, mix it
	// into the base widget class.  (This is a hack, but it's effective.)
	lang.extend(_WidgetBase,{
		dojoAttachEvent: "",
		dojoAttachPoint: ""
	});

	return _TemplatedMixin;
});

},
'curam/util/UimDialog':function(){
/*
 * Copyright 2010-2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/*
 * Modification History
 * --------------------
 * 25-Mar-2014  MV  [CR00423311] Handle usage from an external application.   
 * 06-Jul-2011  KW  [CR00275353] Correctly set the o3rpu value in openUrl()
 *                                function.
 * 01-Feb-2011  MV  [CR00250399] Fix the call to openModalDialog() function.
 * 21-Jan-2011  MV  [CR00243263] Fix the new openUrl function to return
 *    the dialog object. 
 * 14-Jan-2011  MK  [CR00240138] Added the openUrl() function. 
 * 13-Jan-2011  MV  [CR00241667] Added ready() function, updated documentation.
 * 19-Nov-2010  MV  [CR00231655] Added the get() function.
 * 01-Nov-2010  SD  [CR00225331] Initial version.
 */

define("curam/util/UimDialog", ["curam/util/RuntimeContext",
        "curam/util/external",
        "curam/util",
        "curam/define",
        "curam/dialog",
        "curam/util/DialogObject"
        ], function(RuntimeContext, external) {
  
  /**
   * @name curam.util.UimDialog
   * @namespace Provides the ability to open UIM content in a Curam dialog
   * and interact with the dialog window.<p/>
   * 
   * The API provides support for both opening a UIM page in a new dialog
   * and for accessing a dialog which is already open. See the <code>open()</code>
   * and <code>get()</code> functions.<p/>
   *  
   * It is required that the UIM page you are opening in the dialog resides
   * on the same Internet domain as the page the API is used from.<p/>
   * 
   * Example:<p/>
   * <pre>
   * dojo.require('curam.util.UimDialog');
   * 
   * var dialogObject = curam.util.UimDialog.open(
   *   'MyPage.do', { myParam:'1' }, {width:500,height:300});
   * 
   * dialogObject.registerBeforeCloseHandler(function() { alert("test"); });
   * dialogObject.registerOnDisplayHandler(function() {
   *   setTimeout(1000, function() { dialogObject.close() });
   * });
   * </pre><p/>
   *
   * It is possible to execute custom code on dialog open and/or close.<p/>
   * 
   * To add a customised handler function to a supported event:<ul>
   * <li>Make the UimDialog API call to open or get the dialog, which will
   *  return a {@link curam.util.DialogObject} object.
   * <li>This object will let you register handlers for the supported
   * <code>OnDisplay</code> and <code>BeforeClose</code> events.</li></ul>
   * <p/>
   * 
   * Lastly you can close the dialog by calling the <code>close()</code>
   * function.<p/>
   */





















  curam.define.singleton("curam.util.UimDialog",
  /**
   * @lends curam.util.UimDialog.prototype
   */
  {
    /**
     * Opens the specified UIM page in a Curam dialog.
     * 
     * @param {String} path URL path to the page to display in the dialog, without
     *              the query string.
     * @param {Object} pageParameters An object containing the required page
     *      parameters, or null if no page parameters are required.
     *      The following format is expected:
     *                        <code>{ param1Name:"value", param2Name:248 }</code>
     *      The infrastructure handles URL-encoding the values so do NOT encode
     *      them yourself.
     * @param {Object} [dialogSize] An object representing the required size
     *    of the dialog in pixels. The following form is required:
     *        <code>{ width:500, height:300 }</code> If size is not specified
     *      the default size will be used instead.
     *      
     * @returns {curam.util.DialogObject} An object, representing the dialog.
     */
    open: function(path, pageParameters, dialogSize) {    
      var url = path + curam.util.makeQueryString(pageParameters);    
      return this.openUrl(url, dialogSize);
    },

    /**
     * Opens the specified UIM page in a Curam dialog.
     * 
     * @param {String} path URL path to the page to display in the dialog, including
     *              the query string.
     *              
     * @param {Object} [dialogSize] An object representing the required size
     *    of the dialog in pixels. The following form is required:
     *        <code>{ width:500, height:300 }</code> If size is not specified
     *      the default size will be used instead.
     *
     * @returns {curam.util.DialogObject} An object, representing the dialog.
     */
    openUrl: function(url, dialogSize) {












      // generate a unique token, this is to be used to retrieve the
      // correct dialogID
      var uimToken = curam.util.getCacheBusterParameter();

      // create dialog object to be returned to the user
      var myDialogObject = new curam.util.DialogObject(uimToken);

      var windowOptions = null;
      if (dialogSize) {
        windowOptions = "width=" + dialogSize.width
        + ",height=" + dialogSize.height;
      }

      // call into modal logic with unique token
      curam.util.openModalDialog({ href: this._addRpu(url) },
          windowOptions, null, null, uimToken);

      return myDialogObject;
    },
    
    _addRpu: function(url) {
      var newUrl = url;
      
      if (curam.tab.inTabbedUI()) {
        // we are in tabbed UI, set RPU to the active tab content iframe
        var iframe = curam.tab.getContentPanelIframe();
        if (iframe) {
          newUrl = curam.util.setRpu(
              url, new RuntimeContext(iframe.contentWindow));
        }

      } else if (external.inExternalApp()) {
        // we are in the external application, try to get parent UIM iframe
        var parent = external.getUimParentWindow();
        if (parent) {
          newUrl = curam.util.setRpu(
              url, new RuntimeContext(parent));
        }
      }
      // else - unable to set RPU, this is valid for example in ext app fragment
      // scenarios

      return newUrl;
    },
    
    /**
     * Returns a dialog object corresponding to the runtime context
     * of the calling page.
     * 
     * If the calling page is not loaded in a dialog or the dialog infrastructure
     * is not yet initialized then exception will be thrown. In this case use the
     * ready() function to execute your code at the right point in time. 
     * 
     * @returns {curam.util.DialogObject} An object, representing the dialog.
     */
    get: function() {
      if (curam.dialog._id == null) {
        throw "Dialog infrastructure not ready.";
      }
      return new curam.util.DialogObject(null, curam.dialog._id);
    },

    /**
     * Executes the callback function when the dialog infrastructure
     * in the current runtime context becomes ready. If the infrastructure
     * is ready by the time this function is called, then the callback function
     * is executed immediately.
     * 
     * @param {Function} callback
     *    The function to run.
     */
    ready: function(callback) {
      if (curam.dialog._id == null) {
        // Dialog infrastructure not ready.
        dojo.subscribe("/curam/dialog/ready", callback);

      } else {
        // infrastructure ready - call the code now
        callback();
      }
    },

    /**
     * @private
     */
    _getDialogFrameWindow: function(dialogId) {
      var dialogWidget = window.top.dijit.byId(dialogId);
      return dialogWidget.uimController.getIFrame().contentWindow;
    }
  });
  
  return curam.util.UimDialog;
});

},
'curam/util/DialogObject':function(){
/*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/**
 * @name curam.util.DialogObject
 * @namespace Provides access to a dialog instance.
 * 
 */
define("curam/util/DialogObject", ["curam/dialog",
        "curam/util"
        ], function() { 
/*
 * Modification History
 * --------------------
 * 05-Feb-2013  MV  [CR00366128] Fix documentation comment.
 * 02-May-2012  MK  [CR00323691] Use new Dojo AMD format.
 * 13-Jan-2011  MV  [CR00241667] Added close() function. Updated documentation.
 * 19-Nov-2010  MV  [CR00231655] Added the registerOnDisplayHandler() function.
 * 04-Nov-2010  MV  [CR00229849] Unsubscribe handlers in the right context.
 * 01-Nov-2010  SD  [CR00225331] Initial version.
 */


var DialogObject = dojo.declare("curam.util.DialogObject", null, 
/** @lends curam.util.DialogObject.prototype */{  

    /**
     * Holds ID of the dialog in the current context.
     * @private
     */
    _id: null,
    
    /**
     * Constructor takes the input token and uses it to listen for a 
     * specific publish event which will return the dialogId for the
     * opened dialog.
     *
     * @constructor
     * @private
     */
    constructor: function(tokenValue, id) {
      if (!id) {
        var unSubConstructor = 
          window.top.dojo.subscribe(
            "/curam/dialog/uim/opened/" + tokenValue, this, function(dialogID) {
          this._id = dialogID;
          window.top.dojo.unsubscribe(unSubConstructor);
        });
      
      } else {
        this._id = id;
      }
    },
    
    /**
     * Registers a custom function that will be called before the dialog
     * is closed.
     * 
     * @param {Function} handler The handler function for the BeforeClose event.
     */
    registerBeforeCloseHandler: function(handler) {
      var unSubClose = 
        window.top.dojo.subscribe(
          "/curam/dialog/BeforeClose", this, function(dialogID) {
            if (dialogID == this._id) {
              handler();
            }
            window.top.dojo.unsubscribe(unSubClose);
      });
    },
    
    /**
     * Registers a custom handler for the onDispaly event of the dialog. 
     * If the handler is registered after the dialog has been displayed, then
     * it is executed immediately.
     * 
     * @param handler
     *    The handler function for the dialog OnDisplay event. The handler
     *    will be passed the size object in the following form:
     *    {width: 125, height: 236}
     */
    registerOnDisplayHandler: function(handler) {
      if (curam.dialog._displayed == true) {
        handler(curam.dialog._size);
        
      } else {
        var ut = window.top.dojo.subscribe(
            "/curam/dialog/displayed", this, function(dialogID, size) {
              if (dialogID == this._id) {
                handler(size);
              }
              window.top.dojo.unsubscribe(ut);
            });
      }
    },
    
    /**
     * Closes the dialog, optionally refreshing or redirecting the parent window.
     * 
     * @param {Boolean} [refreshParent=false] Should the parent be refreshed
     *              when this dialog closes?
     * @param {String} [newPageIdOrFullUrl] ID of the page the parent window
     *      should be redirected to when this dialog closes. Alternatively
     *      a full URL including the page parameters can be passed.
     * @param {Object} [pageParameters] Page parameters to be used when
     *        redirecting the parent to the new page. The following format
     *        is expected: <code>{ param1Name:"value", param2Name:248 }</code>
     *        The infrastructure handles URL-encoding the values so do NOT encode
     *        them yourself.
     *        If full URL is specified then the pageParameters are ignored.
     */
    close: function(/*optional*/ refreshParent, /*optional*/ newPageIdOrFullUrl,
        /*optional*/ pageParameters) {
      
      var win = curam.util.UimDialog._getDialogFrameWindow(this._id);
      var parentWindow = win.curam.dialog.getParentWindow(win);
      if (refreshParent && !newPageIdOrFullUrl) {
        win.curam.dialog.forceParentRefresh();
        curam.dialog.doRedirect(parentWindow, null);
        
      } else if (newPageIdOrFullUrl) {
        var newParentUrl = newPageIdOrFullUrl;
        // distinguish between pageId and full URL
        if (newPageIdOrFullUrl.indexOf("Page.do") == -1) {
          newParentUrl = newPageIdOrFullUrl + "Page.do"
              + curam.util.makeQueryString(pageParameters);
        }
  
        curam.dialog.doRedirect(parentWindow, newParentUrl);
      }
  
      curam.dialog.closeModalDialog();
    }
  });
  
  return DialogObject;  
});

},
'dijit/_CssStateMixin':function(){
define("dijit/_CssStateMixin", [
	"dojo/touch",
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/declare",	// declare
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/window" // win.body
], function(touch, array, declare, domClass, lang, win){

// module:
//		dijit/_CssStateMixin
// summary:
//		Mixin for widgets to set CSS classes on the widget DOM nodes depending on hover/mouse press/focus
//		state changes, and also higher-level state changes such becoming disabled or selected.

return declare("dijit._CssStateMixin", [], {
	// summary:
	//		Mixin for widgets to set CSS classes on the widget DOM nodes depending on hover/mouse press/focus
	//		state changes, and also higher-level state changes such becoming disabled or selected.
	//
	// description:
	//		By mixing this class into your widget, and setting the this.baseClass attribute, it will automatically
	//		maintain CSS classes on the widget root node (this.domNode) depending on hover,
	//		active, focus, etc. state.   Ex: with a baseClass of dijitButton, it will apply the classes
	//		dijitButtonHovered and dijitButtonActive, as the user moves the mouse over the widget and clicks it.
	//
	//		It also sets CSS like dijitButtonDisabled based on widget semantic state.
	//
	//		By setting the cssStateNodes attribute, a widget can also track events on subnodes (like buttons
	//		within the widget).

	// cssStateNodes: [protected] Object
	//		List of sub-nodes within the widget that need CSS classes applied on mouse hover/press and focus
	//.
	//		Each entry in the hash is a an attachpoint names (like "upArrowButton") mapped to a CSS class names
	//		(like "dijitUpArrowButton"). Example:
	//	|		{
	//	|			"upArrowButton": "dijitUpArrowButton",
	//	|			"downArrowButton": "dijitDownArrowButton"
	//	|		}
	//		The above will set the CSS class dijitUpArrowButton to the this.upArrowButton DOMNode when it
	//		is hovered, etc.
	cssStateNodes: {},

	// hovering: [readonly] Boolean
	//		True if cursor is over this widget
	hovering: false,

	// active: [readonly] Boolean
	//		True if mouse was pressed while over this widget, and hasn't been released yet
	active: false,

	_applyAttributes: function(){
		// This code would typically be in postCreate(), but putting in _applyAttributes() for
		// performance: so the class changes happen before DOM is inserted into the document.
		// Change back to postCreate() in 2.0.  See #11635.

		this.inherited(arguments);

		// Automatically monitor mouse events (essentially :hover and :active) on this.domNode
		array.forEach(["onmouseenter", "onmouseleave", touch.press], function(e){
			this.connect(this.domNode, e, "_cssMouseEvent");
		}, this);

		// Monitoring changes to disabled, readonly, etc. state, and update CSS class of root node
		array.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active"], function(attr){
			this.watch(attr, lang.hitch(this, "_setStateClass"));
		}, this);

		// Events on sub nodes within the widget
		for(var ap in this.cssStateNodes){
			this._trackMouseState(this[ap], this.cssStateNodes[ap]);
		}
		// Set state initially; there's probably no hover/active/focus state but widget might be
		// disabled/readonly/checked/selected so we want to set CSS classes for those conditions.
		this._setStateClass();
	},

	_cssMouseEvent: function(/*Event*/ event){
		// summary:
		//	Sets hovering and active properties depending on mouse state,
		//	which triggers _setStateClass() to set appropriate CSS classes for this.domNode.

		if(!this.disabled){
			switch(event.type){
				case "mouseenter":
				case "mouseover":	// generated on non-IE browsers even though we connected to mouseenter
					this._set("hovering", true);
					this._set("active", this._mouseDown);
					break;

				case "mouseleave":
				case "mouseout":	// generated on non-IE browsers even though we connected to mouseleave
					this._set("hovering", false);
					this._set("active", false);
					break;

				case "mousedown":
				case "touchpress":
					this._set("active", true);
					this._mouseDown = true;
					// Set a global event to handle mouseup, so it fires properly
					// even if the cursor leaves this.domNode before the mouse up event.
					// Alternately could set active=false on mouseout.
					var mouseUpConnector = this.connect(win.body(), touch.release, function(){
						this._mouseDown = false;
						this._set("active", false);
						this.disconnect(mouseUpConnector);
					});
					break;
			}
		}
	},

	_setStateClass: function(){
		// summary:
		//		Update the visual state of the widget by setting the css classes on this.domNode
		//		(or this.stateNode if defined) by combining this.baseClass with
		//		various suffixes that represent the current widget state(s).
		//
		// description:
		//		In the case where a widget has multiple
		//		states, it sets the class based on all possible
		//	 	combinations.  For example, an invalid form widget that is being hovered
		//		will be "dijitInput dijitInputInvalid dijitInputHover dijitInputInvalidHover".
		//
		//		The widget may have one or more of the following states, determined
		//		by this.state, this.checked, this.valid, and this.selected:
		//			- Error - ValidationTextBox sets this.state to "Error" if the current input value is invalid
		//			- Incomplete - ValidationTextBox sets this.state to "Incomplete" if the current input value is not finished yet
		//			- Checked - ex: a checkmark or a ToggleButton in a checked state, will have this.checked==true
		//			- Selected - ex: currently selected tab will have this.selected==true
		//
		//		In addition, it may have one or more of the following states,
		//		based on this.disabled and flags set in _onMouse (this.active, this.hovering) and from focus manager (this.focused):
		//			- Disabled	- if the widget is disabled
		//			- Active		- if the mouse (or space/enter key?) is being pressed down
		//			- Focused		- if the widget has focus
		//			- Hover		- if the mouse is over the widget

		// Compute new set of classes
		var newStateClasses = this.baseClass.split(" ");

		function multiply(modifier){
			newStateClasses = newStateClasses.concat(array.map(newStateClasses, function(c){ return c+modifier; }), "dijit"+modifier);
		}

		if(!this.isLeftToRight()){
			// For RTL mode we need to set an addition class like dijitTextBoxRtl.
			multiply("Rtl");
		}

		var checkedState = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
		if(this.checked){
			multiply(checkedState);
		}
		if(this.state){
			multiply(this.state);
		}
		if(this.selected){
			multiply("Selected");
		}

		if(this.disabled){
			multiply("Disabled");
		}else if(this.readOnly){
			multiply("ReadOnly");
		}else{
			if(this.active){
				multiply("Active");
			}else if(this.hovering){
				multiply("Hover");
			}
		}

		if(this.focused){
			multiply("Focused");
		}

		// Remove old state classes and add new ones.
		// For performance concerns we only write into domNode.className once.
		var tn = this.stateNode || this.domNode,
			classHash = {};	// set of all classes (state and otherwise) for node

		array.forEach(tn.className.split(" "), function(c){ classHash[c] = true; });

		if("_stateClasses" in this){
			array.forEach(this._stateClasses, function(c){ delete classHash[c]; });
		}

		array.forEach(newStateClasses, function(c){ classHash[c] = true; });

		var newClasses = [];
		for(var c in classHash){
			newClasses.push(c);
		}
    /* CURAM-FIX: replace followig line - only set className if classes are changed */
		// tn.className = newClasses.join(" ");
    var cls = newClasses.join(" ");
    if(cls != tn.className){
      tn.className = cls;
    }
    /* END CURAM-FIX */

		this._stateClasses = newStateClasses;
	},

	_trackMouseState: function(/*DomNode*/ node, /*String*/ clazz){
		// summary:
		//		Track mouse/focus events on specified node and set CSS class on that node to indicate
		//		current state.   Usually not called directly, but via cssStateNodes attribute.
		// description:
		//		Given class=foo, will set the following CSS class on the node
		//			- fooActive: if the user is currently pressing down the mouse button while over the node
		//			- fooHover: if the user is hovering the mouse over the node, but not pressing down a button
		//			- fooFocus: if the node is focused
		//
		//		Note that it won't set any classes if the widget is disabled.
		// node: DomNode
		//		Should be a sub-node of the widget, not the top node (this.domNode), since the top node
		//		is handled specially and automatically just by mixing in this class.
		// clazz: String
		//		CSS class name (ex: dijitSliderUpArrow).

		// Current state of node (initially false)
		// NB: setting specifically to false because domClass.toggle() needs true boolean as third arg
		var hovering=false, active=false, focused=false;

		var self = this,
			cn = lang.hitch(this, "connect", node);

		function setClass(){
			var disabled = ("disabled" in self && self.disabled) || ("readonly" in self && self.readonly);
			domClass.toggle(node, clazz+"Hover", hovering && !active && !disabled);
			domClass.toggle(node, clazz+"Active", active && !disabled);
			domClass.toggle(node, clazz+"Focused", focused && !disabled);
		}

		// Mouse
		cn("onmouseenter", function(){
			hovering = true;
			setClass();
		});
		cn("onmouseleave", function(){
			hovering = false;
			active = false;
			setClass();
		});
		cn(touch.press, function(){
			active = true;
			setClass();
		});
		cn(touch.release, function(){
			active = false;
			setClass();
		});

		// Focus
		cn("onfocus", function(){
			focused = true;
			setClass();
		});
		cn("onblur", function(){
			focused = false;
			setClass();
		});

		// Just in case widget is enabled/disabled while it has focus/hover/active state.
		// Maybe this is overkill.
		this.watch("disabled", setClass);
		this.watch("readOnly", setClass);
	}
});
});

},
'dijit/layout/ScrollingTabController':function(){
require({cache:{
'url:dijit/layout/templates/ScrollingTabController.html':"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n",
'url:dijit/layout/templates/_ScrollingTabControllerButton.html':"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>"}});
define("dijit/layout/ScrollingTabController", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.contains
	"dojo/dom-geometry", // domGeometry.contentBox
	"dojo/dom-style", // domStyle.style
	"dojo/_base/fx", // Animation
	"dojo/_base/lang", // lang.hitch
	"dojo/query", // query
	"dojo/_base/sniff", // has("ie"), has("webkit"), has("quirks")
	"../registry",	// registry.byId()
	"dojo/text!./templates/ScrollingTabController.html",
	"dojo/text!./templates/_ScrollingTabControllerButton.html",
	"./TabController",
	"./utils",	// marginBox2contextBox, layoutChildren
	"../_WidgetsInTemplateMixin",
	"../Menu",
	"../MenuItem",
	"../form/Button",
	"../_HasDropDown",
	"dojo/NodeList-dom" // NodeList.style
], function(array, declare, domClass, domGeometry, domStyle, fx, lang, query, has,
	registry, tabControllerTemplate, buttonTemplate, TabController, layoutUtils, _WidgetsInTemplateMixin,
	Menu, MenuItem, Button, _HasDropDown){

/*=====
var _WidgetsInTemplateMixin = dijit._WidgetsInTemplateMixin;
var Menu = dijit.Menu;
var _HasDropDown = dijit._HasDropDown;
var TabController = dijit.layout.TabController;
=====*/


// module:
//		dijit/layout/ScrollingTabController
// summary:
//		Set of tabs with left/right arrow keys and a menu to switch between tabs not
//		all fitting on a single row.

/* CURAM-FIX: Performance fixes and extension to support for disabling and hiding tabs */
var ScrollingTabController = declare("dijit.layout.ScrollingTabController", [TabController, _WidgetsInTemplateMixin], {
	// summary:
	//		Set of tabs with left/right arrow keys and a menu to switch between tabs not
	//		all fitting on a single row.
	//		Works only for horizontal tabs (either above or below the content, not to the left
	//		or right).
	// tags:
	//		private

	baseClass: "dijitTabController dijitScrollingTabController",

	templateString: tabControllerTemplate,

	// useMenu: [const] Boolean
	//		True if a menu should be used to select tabs when they are too
	//		wide to fit the TabContainer, false otherwise.
	useMenu: true,

	// useSlider: [const] Boolean
	//		True if a slider should be used to select tabs when they are too
	//		wide to fit the TabContainer, false otherwise.
	useSlider: true,

	// tabStripClass: [const] String
	//		The css class to apply to the tab strip, if it is visible.
	tabStripClass: "",

	widgetsInTemplate: true,

	// _minScroll: Number
	//		The distance in pixels from the edge of the tab strip which,
	//		if a scroll animation is less than, forces the scroll to
	//		go all the way to the left/right.
	_minScroll: 5,

	// Override default behavior mapping class to DOMNode
	_setClassAttr: { node: "containerNode", type: "class" },
	
       /* CURAM-FIX: added class member variable */
	_tabsWidth: -1,

	/* CURAM-FIX: added class member variable */
       _tablistMenuItemIdSuffix: "_stcMi",

	buildRendering: function(){
		this.inherited(arguments);
		var n = this.domNode;

		this.scrollNode = this.tablistWrapper;
		this._initButtons();

		if(!this.tabStripClass){
			this.tabStripClass = "dijitTabContainer" +
				this.tabPosition.charAt(0).toUpperCase() +
				this.tabPosition.substr(1).replace(/-.*/, "") +
				"None";
			domClass.add(n, "tabStrip-disabled")
		}

		domClass.add(this.tablistWrapper, this.tabStripClass);
	},

	onStartup: function(){
		this.inherited(arguments);

		// TabController is hidden until it finishes drawing, to give
		// a less visually jumpy instantiation.   When it's finished, set visibility to ""
		// to that the tabs are hidden/shown depending on the container's visibility setting.

		/* CURAM-FIX: don't touch visibility - this is slow in IE7
		 * this goes with a change in the HTML template, which now doesn't set
		 * visibility: hidden */
		// domStyle.set(this.domNode, "visibility", "");

		this._postStartup = true;
	},

	onAddChild: function(page, insertIndex){
		this.inherited(arguments);

		/* CURAM-FIX: addition */
		var pageID = page.id;
		// When a child is added, the size cache should be invalidated
		this.bustSizeCache = true;
		this._tabsWidth = -1;
		/* END CURAM-FIX */
		
		// changes to the tab button label or iconClass will have changed the width of the
		// buttons, so do a resize
		array.forEach(["label", "iconClass"], function(attr){
			this.pane2watches[page.id].push(
				this.pane2button[page.id].watch(attr, lang.hitch(this, function(){
					if(this._postStartup && this._dim){
						this.resize(this._dim);
					}
		                        /* CURAM-FIX: addition */
		                        if (this._dim){
		                          // When a label is changed, the size cache should be invalidated
		                          this.bustSizeCache = true;
		                          this._tabsWidth = -1;
		                          // Clear the cached width of a button
		                          this.pane2button[pageID].domNode._width = 0;
		                        }
		                        /* END CURAM-FIX */
				}))
			);
		}, this);

		/* CURAM-FIX: addition to enable tab hiding/disabling
		 * because this function has been created as a local variable, "this" has
		 * to be passed as a parameter. See calls to getMenuItem below.
		 * TODO: why was this created as a local variable? Can the function be
		 * attached to the class? Or should we hitch it in the class below?
		 * For now, "this" will be supplied as a parameter. Lowest risk change.
		 */
		    var getMenuItem = function(pid, theRealThis) {
		      var menuItem = null;
		      if (theRealThis._menuBtn.dropDown) {
		        var menuItemNode = dojo.query(pid + theRealThis._tablistMenuItemIdSuffix,
		            theRealThis._menuBtn.dropDown.domNode)[0];
		        if (menuItemNode) {
		          menuItem = dijit.byNode(menuItemNode);
		        }
		      }
		      return menuItem;
		    };

		    // update the menuItem visibility when the button visibility is updated
		    this.pane2button[pageID].connect(this.pane2button[pageID], "_setCuramVisibleAttr",
		      lang.hitch(this, function() {
		        //alert("visibility changed for "+page.id+", new value is: " + visible);
		        var menuItem = getMenuItem(pageID, this);
		        if(menuItem) {
		          this._setCuramVisibility(menuItem, pageID);
		        }
		      }));

		    // update the menuItem availability when the button availability is updated
		    this.pane2button[pageID].connect(this.pane2button[pageID], "_setCuramDisabledAttr", lang.hitch(this, function() {
		      // alert("availability changed for "+page.id+", new value is: " + enabled);
		      // getMenuItem
		      var menuItem = getMenuItem(pageID, this);
		      if(menuItem) {
		        this._setCuramAvailability(menuItem, pageID);
		      }
		    }));
		/* END CURAM-FIX */

		// Increment the width of the wrapper when a tab is added
		// This makes sure that the buttons never wrap.
		// The value 200 is chosen as it should be bigger than most
		// Tab button widths.
		domStyle.set(this.containerNode, "width",
			(domStyle.get(this.containerNode, "width") + 200) + "px");
		this.containerNode._width = 0; //  Invalidate the cached width of the wrapper
	},

	/* CURAM-FIX: added functions needed by Curam specific code */    
	_setCuramVisibility: function(menuItem, pageId) {
	      var visible = this.pane2button[pageId].curamVisible;
	      if (visible) {
	        dojo.replaceClass(menuItem.domNode, "visible", "hidden");
	      } else {
	        dojo.replaceClass(menuItem.domNode, "hidden", "visible");
	      }
	    },

	    _setCuramAvailability: function(menuItem, pageId) {
	      var enabled = !this.pane2button[pageId].curamDisabled;
	          menuItem.disabled = !enabled;
	          if (enabled) {
	            dojo.replaceClass(menuItem.domNode, "enabled", "disabled");

	          } else {
	            dojo.replaceClass(menuItem.domNode, "disabled", "enabled");
	          }
	    },
	    
	    /**
	     * Checks if we have cached the width for this node, and returns it if so
	     * Otherwise measures the width.
	     * @param node The node to measure.
	     * @returns The node width.
	     */
	    _getNodeWidth: function(node) {
	      if(!node._width){
	        node._width = dojo.style(node, "width");
	      }
	      return node._width;
	    },

	    destroyRendering: function(preserveDom) {
	      array.forEach(this._attachPoints, function (point) {
	        delete this[point];
	      }, this);
	      this._attachPoints = [];
	      array.forEach(this._attachEvents, this.disconnect, this);
	      this.attachEvents = [];
	    },
	    
	    destroy: function() {
	      if (this._menuBtn) {
	        this._menuBtn._curamOwnerController = null;
	      }
	      
	      this.inherited(arguments);
	    },
	/* END CURAM-FIX */

	onRemoveChild: function(page, insertIndex){
		// null out _selectedTab because we are about to delete that dom node
		var button = this.pane2button[page.id];
		if(this._selectedTab === button.domNode){
			this._selectedTab = null;
		}

		this.inherited(arguments);
		/* CURAM-FIX: addition */
		// When a child is removed, the size cache should be invalidated
		this.bustSizeCache = true;
		this._tabsWidth = -1;
		/* END CURAM-FIX */
	},

	_initButtons: function(){
		// summary:
		//		Creates the buttons used to scroll to view tabs that
		//		may not be visible if the TabContainer is too narrow.

		// Make a list of the buttons to display when the tab labels become
		// wider than the TabContainer, and hide the other buttons.
		// Also gets the total width of the displayed buttons.
		/* CURAM-FIX: subscription to the tab title setting event to adjust the tab 
		   scroll buttons subsequently */
		this.subscribe("tab.title.name.finished", this._measureBtns);
		/* END CURAM-FIX */
		this._btnWidth = 0;
		this._buttons = query("> .tabStripButton", this.domNode).filter(function(btn){
			if((this.useMenu && btn == this._menuBtn.domNode) ||
				(this.useSlider && (btn == this._rightBtn.domNode || btn == this._leftBtn.domNode))){
		                /* CURAM-FIX: replace next line to use getMarginBoxSimple() */
                                // this._btnWidth += domGeometry.getMarginSize(btn).w;
		                this._btnWidth += domGeometry.getMarginBoxSimple(btn).w;
				return true;
			}else{
				domStyle.set(btn, "display", "none");
				return false;
			}
		}, this);
		
		/* CURAM-FIX: addition next line */
	      this._menuBtn._curamOwnerController = this;
	},

	_getTabsWidth: function(){
	      /* CURAM-FIX: addition */
	      if(this._tabsWidth > -1){
	        return this._tabsWidth;
	      }
	      /* END CURAM-FIX */
	      
		var children = this.getChildren();
		if(children.length){
			var /* CURAM-FIX: comment this out: leftTab = children[this.isLeftToRight() ? 0 : children.length - 1].domNode, */
				rightTab = children[this.isLeftToRight() ? children.length - 1 : 0].domNode;
			/* CURAM-FIX: comment out the next line and replace with the next addition
                         * to remove one call to leftTab.offsetLeft */
			// return rightTab.offsetLeft + domStyle.get(rightTab, "width") - leftTab.offsetLeft;
			var rightWidth = this._getNodeWidth(rightTab);
			if(this.isLeftToRight()){	                
	                this._tabsWidth = rightTab.offsetLeft + rightWidth;
			}else{
				var leftTab = children[children.length - 1].domNode;
		    	this._tabsWidth = rightTab.offsetLeft + rightWidth - leftTab.offsetLeft;
			}
	                return this._tabsWidth;
	                /* END CURAM-FIX */
			
		}else{
			return 0;
		}
	},

	_enableBtn: function(width){
		// summary:
		//		Determines if the tabs are wider than the width of the TabContainer, and
		//		thus that we need to display left/right/menu navigation buttons.
		var tabsWidth = this._getTabsWidth();
		width = width || domStyle.get(this.scrollNode, "width");
		return tabsWidth > 0 && width < tabsWidth;
	},

	/* CURAM-FIX: additional method to re-measure tab controller to
    adjust tab scroll buttons	*/
	_measureBtns: function() {
      // summary:
	  // triggers controller size adjustment following tab name set to
	  // draw tab scrolling buttons once the correct width value is known.
	  if (this._enableBtn() && this._rightBtn.domNode.style.display == "none") {
	    this.resize(this._dim);
	    if (this.isLeftToRight()) {
	      this._rightBtn.set("disabled", true);
	    } else {
	      this._leftBtn.set("disabled", true);
		}
      }
	},
	/* END CURAM-FIX */

	/* CURAM-FIX: IE7 related optimizations to code around using the expensive
         * offsetWidth/offsetHeight calls
         */
	resize: function(dim){
		// summary:
		//		Hides or displays the buttons used to scroll the tab list and launch the menu
		//		that selects tabs.

    	      /* CURAM-FIX: addition - If there are no children, just hide the tab bar */
    	      if(dojo.query("> *", this.containerNode).length < 1){
    	        if(this.domNode.style.height != "1px"){
    	          dojo.style(this.domNode, "height", "1px");
    	        }
    	        return;
    	      }
    	      // If the width is the same, do nothing
    	      if(!this.bustSizeCache && this._dim && dim && this._dim.w == dim.w){
    	        return;
    	      }
    	      this.bustSizeCache = false;
    
    	      // curam.debug.log(bundle.getProperty("curam.dojo-hacks.msg"), this.domNode);
    	      this.scrollNodeHeight = this.scrollNodeHeight || this.scrollNode.offsetHeight;
    	      /* END CURAM_FIX */

	      // Save the dimensions to be used when a child is renamed.
		this._dim = dim;

		// Set my height to be my natural height (tall enough for one row of tab labels),
		// and my content-box width based on margin-box width specified in dim parameter.
		// But first reset scrollNode.height in case it was set by layoutChildren() call
		// in a previous run of this method.
		this.scrollNode.style.height = "auto";
		var cb = this._contentBox = layoutUtils.marginBox2contentBox(this.domNode, {h: 0, w: dim.w});
		/* CURAM-FIX: replace expensive call to offsetHeight */
                // cb.h = this.scrollNode.offsetHeight;
		cb.h = this.scrollNodeHeight;
		domGeometry.setContentSize(this.domNode, cb);

		// Show/hide the left/right/menu navigation buttons depending on whether or not they
		// are needed.
		var enable = this._enableBtn(this._contentBox.w);
		this._buttons.style("display", enable ? "" : "none");

		// Position and size the navigation buttons and the tablist
		this._leftBtn.layoutAlign = "left";
		this._rightBtn.layoutAlign = "right";
		this._menuBtn.layoutAlign = this.isLeftToRight() ? "right" : "left";
		      
		/* CURAM-FIX: replace the following statement*/ 
                //layoutUtils.layoutChildren(this.domNode, this._contentBox,
                //    [this._menuBtn, this._leftBtn, this._rightBtn, {domNode: this.scrollNode, layoutAlign: "client"}]);

                // fakeWidget property tells the layout code not to bother updating
	        // this JSON object with the widget size
	        var childDims;
	        if(enable){
	          childDims = dijit.layout.layoutChildren(this.domNode, this._contentBox,
	            [this._menuBtn, this._leftBtn, this._rightBtn,
	             {domNode: this.scrollNode, layoutAlign: "client", fakeWidget: true}]);
	        } else {
	          childDims = dijit.layout.layoutChildren(this.domNode, this._contentBox,
	            [{domNode: this.scrollNode, layoutAlign: "client", fakeWidget: true}]);
	        }
	        this.scrollNode._width = childDims.client.w;
	        /* END CURAM-FIX */

		// set proper scroll so that selected tab is visible
		if(this._selectedTab){
			if(this._anim && this._anim.status() == "playing"){
				this._anim.stop();
			}
			this.scrollNode.scrollLeft = this._convertToScrollLeft(this._getScrollForSelectedTab());
		}

		// Enable/disabled left right buttons depending on whether or not user can scroll to left or right
		this._setButtonClass(this._getScroll());

		this._postResize = true;

		// Return my size so layoutChildren() can use it.
		// Also avoids IE9 layout glitch on browser resize when scroll buttons present
		return {h: this._contentBox.h, w: dim.w};
	},

	_getScroll: function(){
		// summary:
		//		Returns the current scroll of the tabs where 0 means
		//		"scrolled all the way to the left" and some positive number, based on #
		//		of pixels of possible scroll (ex: 1000) means "scrolled all the way to the right"
		return (this.isLeftToRight() || has("ie") < 8 || (has("ie") && has("quirks")) || has("webkit")) ? this.scrollNode.scrollLeft :
				domStyle.get(this.containerNode, "width") - domStyle.get(this.scrollNode, "width")
					 + (has("ie") >= 8 ? -1 : 1) * this.scrollNode.scrollLeft;
	},

	_convertToScrollLeft: function(val){
		// summary:
		//		Given a scroll value where 0 means "scrolled all the way to the left"
		//		and some positive number, based on # of pixels of possible scroll (ex: 1000)
		//		means "scrolled all the way to the right", return value to set this.scrollNode.scrollLeft
		//		to achieve that scroll.
		//
		//		This method is to adjust for RTL funniness in various browsers and versions.
		if(this.isLeftToRight() || has("ie") < 8 || (has("ie") && has("quirks")) || has("webkit")){
			return val;
		}else{
			var maxScroll = domStyle.get(this.containerNode, "width") - domStyle.get(this.scrollNode, "width");
			return (has("ie") >= 8 ? -1 : 1) * (val - maxScroll);
		}
	},

	/* CURAM-FIX: Overriding this method to skip getting the scroll position
         * which can be expensive */
	onSelectChild: function(/*dijit._Widget*/ page){
		// summary:
		//		Smoothly scrolls to a tab when it is selected.

		var tab = this.pane2button[page.id];
		if(!tab || !page){return;}

		var node = tab.domNode;

		// Save the selection
		if(node != this._selectedTab){
			this._selectedTab = node;

			// Scroll to the selected tab, except on startup, when scrolling is handled in resize()
			if(this._postResize){
		          /* CURAM-FIX: addition Curam customized this to skip getting the scroll if not required */
		          var scrollNodeWidth = this._getNodeWidth(this.scrollNode);
		          if(this._getTabsWidth() < scrollNodeWidth){
		            tab.onClick(null);
		          } else {
		          /* END CURAM-FIX */
				var sl = this._getScroll();

				if(sl > node.offsetLeft ||
				                /* CURAM-FIX: replace following line */
						// sl + domStyle.get(this.scrollNode, "width") <
				                sl + scrollNodeWidth <
				                /* CURAM-FIX: replace following line */
						// node.offsetLeft + domStyle.get(node, "width")){
				                node.offsetLeft + this._getNodeWidth(node)) {
					this.createSmoothScroll().play();
				}
	                /* CURAM-FIX: addition */
	                }
                        /* END CURAM-FIX */
			}
		}

		this.inherited(arguments);
	},

	/* CURAM-FIX: Overriding this method to stop using offsetLeft and dojo.style calls
         * which can be expensive.
         */
	_getScrollBounds: function(){
		// summary:
		//		Returns the minimum and maximum scroll setting to show the leftmost and rightmost
		//		tabs (respectively)
		var children = this.getChildren(),
			/* CURAM-FIX: replace the style call in next two lines by faster function */
		        // scrollNodeWidth = domStyle.get(this.scrollNode, "width"),		// about 500px
			// containerWidth = domStyle.get(this.containerNode, "width"),	// 50,000px
		        scrollNodeWidth = this._getNodeWidth(this.scrollNode),     // about 500px
		        containerWidth = this._getNodeWidth(this.containerNode),   // 50,000px
		        /* END CURAM-FIX */
			maxPossibleScroll = containerWidth - scrollNodeWidth,	// scrolling until right edge of containerNode visible
			tabsWidth = this._getTabsWidth();

		if(children.length && tabsWidth > scrollNodeWidth){
			// Scrolling should happen
			return {
				//There is a padding of 10px at right of tabs list. See ".rtl .soria .appTabContainer .dijitTabContainerTop-tabs"
				//  in \TIVOB\client\CoreInf\CuramCDEJ\lib\curam\web\themes\soria_rtl\css\ApplicationTabContainer_rtl.css
				//  This padding is not included in the calculations. So, Decrease the minimum scroll value here.
				min: this.isLeftToRight() ? 0 : children[children.length-1].domNode.offsetLeft-10,  // 10px for padding of the wrapper
	                        /* CURAM-FIX: replace following line */      
				//max: this.isLeftToRight() ?
				//	(children[children.length-1].domNode.offsetLeft + domStyle.get(children[children.length-1].domNode, "width")) - scrollNodeWidth :
				//	maxPossibleScroll
		                max: this.isLeftToRight() ? tabsWidth - scrollNodeWidth : maxPossibleScroll 
			};
		}else{
			// No scrolling needed, all tabs visible, we stay either scrolled to far left or far right (depending on dir)
			var onlyScrollPosition = this.isLeftToRight() ? 0 : maxPossibleScroll;
			return {
				min: onlyScrollPosition,
				max: onlyScrollPosition
			};
		}
	},

	_getScrollForSelectedTab: function(){
		// summary:
		//		Returns the scroll value setting so that the selected tab
		//		will appear in the center
		var w = this.scrollNode,
			n = this._selectedTab,
			scrollNodeWidth = domStyle.get(this.scrollNode, "width"),
			scrollBounds = this._getScrollBounds();

		// TODO: scroll minimal amount (to either right or left) so that
		// selected tab is fully visible, and just return if it's already visible?
		var pos = (n.offsetLeft + domStyle.get(n, "width")/2) - scrollNodeWidth/2;
		pos = Math.min(Math.max(pos, scrollBounds.min), scrollBounds.max);

		// TODO:
		// If scrolling close to the left side or right side, scroll
		// all the way to the left or right.  See this._minScroll.
		// (But need to make sure that doesn't scroll the tab out of view...)
		return pos;
	},

	createSmoothScroll: function(x){
		// summary:
		//		Creates a dojo._Animation object that smoothly scrolls the tab list
		//		either to a fixed horizontal pixel value, or to the selected tab.
		// description:
		//		If an number argument is passed to the function, that horizontal
		//		pixel position is scrolled to.  Otherwise the currently selected
		//		tab is scrolled to.
		// x: Integer?
		//		An optional pixel value to scroll to, indicating distance from left.

		// Calculate position to scroll to
		if(arguments.length > 0){
			// position specified by caller, just make sure it's within bounds
			var scrollBounds = this._getScrollBounds();
			x = Math.min(Math.max(x, scrollBounds.min), scrollBounds.max);
		}else{
			// scroll to center the current tab
			x = this._getScrollForSelectedTab();
		}

		if(this._anim && this._anim.status() == "playing"){
			this._anim.stop();
		}

		var self = this,
			w = this.scrollNode,
			anim = new fx.Animation({
				beforeBegin: function(){
					if(this.curve){ delete this.curve; }
					var oldS = w.scrollLeft,
						newS = self._convertToScrollLeft(x);
					anim.curve = new fx._Line(oldS, newS);
				},
				onAnimate: function(val){
					w.scrollLeft = val;
				}
			});
		this._anim = anim;

		// Disable/enable left/right buttons according to new scroll position
		this._setButtonClass(x);

		return anim; // dojo._Animation
	},

	_getBtnNode: function(/*Event*/ e){
		// summary:
		//		Gets a button DOM node from a mouse click event.
		// e:
		//		The mouse click event.
		var n = e.target;
		while(n && !domClass.contains(n, "tabStripButton")){
			n = n.parentNode;
		}
		return n;
	},

	doSlideRight: function(/*Event*/ e){
		// summary:
		//		Scrolls the menu to the right.
		// e:
		//		The mouse click event.
		this.doSlide(1, this._getBtnNode(e));
	},

	doSlideLeft: function(/*Event*/ e){
		// summary:
		//		Scrolls the menu to the left.
		// e:
		//		The mouse click event.
		this.doSlide(-1,this._getBtnNode(e));
	},

	doSlide: function(/*Number*/ direction, /*DomNode*/ node){
		// summary:
		//		Scrolls the tab list to the left or right by 75% of the widget width.
		// direction:
		//		If the direction is 1, the widget scrolls to the right, if it is
		//		-1, it scrolls to the left.

		if(node && domClass.contains(node, "dijitTabDisabled")){return;}

		var sWidth = domStyle.get(this.scrollNode, "width");
		var d = (sWidth * 0.75) * direction;

		var to = this._getScroll() + d;

		this._setButtonClass(to);

		this.createSmoothScroll(to).play();
	},

	_setButtonClass: function(/*Number*/ scroll){
		// summary:
		//		Disables the left scroll button if the tabs are scrolled all the way to the left,
		//		or the right scroll button in the opposite case.
		// scroll: Integer
		//		amount of horizontal scroll

		var scrollBounds = this._getScrollBounds();
		this._leftBtn.set("disabled", scroll <= scrollBounds.min);
		this._rightBtn.set("disabled", scroll >= scrollBounds.max);
	}
});


var ScrollingTabControllerButtonMixin = declare("dijit.layout._ScrollingTabControllerButtonMixin", null, {
	baseClass: "dijitTab tabStripButton",

	templateString: buttonTemplate,

		// Override inherited tabIndex: 0 from dijit.form.Button, because user shouldn't be
		// able to tab to the left/right/menu buttons
	tabIndex: "",

	// Similarly, override FormWidget.isFocusable() because clicking a button shouldn't focus it
	// either (this override avoids focus() call in FormWidget.js)
	isFocusable: function(){ return false; }
});
/*=====
ScrollingTabControllerButtonMixin = dijit.layout._ScrollingTabControllerButtonMixin;
=====*/

// Class used in template
declare("dijit.layout._ScrollingTabControllerButton",
	[Button, ScrollingTabControllerButtonMixin]);

// Class used in template
declare(
	"dijit.layout._ScrollingTabControllerMenuButton",
	[Button, _HasDropDown, ScrollingTabControllerButtonMixin],
{
	// id of the TabContainer itself
	containerId: "",

	// -1 so user can't tab into the button, but so that button can still be focused programatically.
	// Because need to move focus to the button (or somewhere) before the menu is hidden or IE6 will crash.
	tabIndex: "-1",

	isLoaded: function(){
		// recreate menu every time, in case the TabContainer's list of children (or their icons/labels) have changed
		return false;
	},

	loadDropDown: function(callback){
		this.dropDown = new Menu({
			id: this.containerId + "_menu",
			dir: this.dir,
			lang: this.lang,
			textDir: this.textDir
		});
		var container = registry.byId(this.containerId);
		array.forEach(container.getChildren(), function(page){
			var menuItem = new MenuItem({
				id: page.id + "_stcMi",
				label: page.title,
				iconClass: page.iconClass,
				dir: page.dir,
				lang: page.lang,
				textDir: page.textDir,
				onClick: function(){
					container.selectChild(page);
				}
			});
			this.dropDown.addChild(menuItem);
		}, this);
		
		/* CURAM-FIX: set the right visibility and availability
		 * on newly loaded menu items
		 */
                dojo.forEach(this.dropDown.getChildren(), lang.hitch(this, function(menuItem) {
                  var pageId = menuItem.id.split(
                      this._curamOwnerController._tablistMenuItemIdSuffix)[0];
                      this._curamOwnerController._setCuramAvailability(menuItem, pageId);
                      this._curamOwnerController._setCuramVisibility(menuItem, pageId);
                      dojo.connect(menuItem, "destroy", function() {
                        setDynState = null;
                      });
                }));		      
		/* END CURAM-FIX */
		
		callback();
	},

	closeDropDown: function(/*Boolean*/ focus){
		this.inherited(arguments);
		if(this.dropDown){
			this.dropDown.destroyRecursive();
			delete this.dropDown;
		}
	}
});

return ScrollingTabController;
});

},
'dijit/place':function(){
define("dijit/place", [
	"dojo/_base/array", // array.forEach array.map array.some
	"dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.getBox
	".",	// dijit (defining dijit.place to match API doc)
  /* CURAM-FIX: added following dependency */
  "dojo/_base/lang" // lang.exists
], function(array, domGeometry, domStyle, kernel, win, winUtils, dijit, lang){

	// module:
	//		dijit/place
	// summary:
	//		Code to place a popup relative to another node


	function _place(/*DomNode*/ node, choices, layoutNode, aroundNodeCoords){
		// summary:
		//		Given a list of spots to put node, put it at the first spot where it fits,
		//		of if it doesn't fit anywhere then the place with the least overflow
		// choices: Array
		//		Array of elements like: {corner: 'TL', pos: {x: 10, y: 20} }
		//		Above example says to put the top-left corner of the node at (10,20)
		// layoutNode: Function(node, aroundNodeCorner, nodeCorner, size)
		//		for things like tooltip, they are displayed differently (and have different dimensions)
		//		based on their orientation relative to the parent.	 This adjusts the popup based on orientation.
		//		It also passes in the available size for the popup, which is useful for tooltips to
		//		tell them that their width is limited to a certain amount.	 layoutNode() may return a value expressing
		//		how much the popup had to be modified to fit into the available space.	 This is used to determine
		//		what the best placement is.
		// aroundNodeCoords: Object
		//		Size of aroundNode, ex: {w: 200, h: 50}

		// get {x: 10, y: 10, w: 100, h:100} type obj representing position of
		// viewport over document
		var view = winUtils.getBox();

		// This won't work if the node is inside a <div style="position: relative">,
		// so reattach it to win.doc.body.	 (Otherwise, the positioning will be wrong
		// and also it might get cutoff)
		if(!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body"){
			win.body().appendChild(node);
		}

		var best = null;
		array.some(choices, function(choice){
			var corner = choice.corner;
			var pos = choice.pos;
			var overflow = 0;

			// calculate amount of space available given specified position of node
			var spaceAvailable = {
				w: {
					'L': view.l + view.w - pos.x,
					'R': pos.x - view.l,
					'M': view.w
				   }[corner.charAt(1)],
				h: {
					'T': view.t + view.h - pos.y,
					'B': pos.y - view.t,
					'M': view.h
				   }[corner.charAt(0)]
			};

			// configure node to be displayed in given position relative to button
			// (need to do this in order to get an accurate size for the node, because
			// a tooltip's size changes based on position, due to triangle)
			if(layoutNode){
				var res = layoutNode(node, choice.aroundCorner, corner, spaceAvailable, aroundNodeCoords);
				overflow = typeof res == "undefined" ? 0 : res;
			}

			// get node's size
			var style = node.style;
			var oldDisplay = style.display;
			var oldVis = style.visibility;
			if(style.display == "none"){
				style.visibility = "hidden";
				style.display = "";
			}
			var mb = domGeometry. getMarginBox(node);
			style.display = oldDisplay;
			style.visibility = oldVis;

			// coordinates and size of node with specified corner placed at pos,
			// and clipped by viewport
			var
				startXpos = {
					'L': pos.x,
					'R': pos.x - mb.w,
					'M': Math.max(view.l, Math.min(view.l + view.w, pos.x + (mb.w >> 1)) - mb.w) // M orientation is more flexible
				}[corner.charAt(1)],
				startYpos = {
					'T': pos.y,
					'B': pos.y - mb.h,
					'M': Math.max(view.t, Math.min(view.t + view.h, pos.y + (mb.h >> 1)) - mb.h)
				}[corner.charAt(0)],
				startX = Math.max(view.l, startXpos),
				startY = Math.max(view.t, startYpos),
				endX = Math.min(view.l + view.w, startXpos + mb.w),
				endY = Math.min(view.t + view.h, startYpos + mb.h),
				width = endX - startX,
				height = endY - startY;

			overflow += (mb.w - width) + (mb.h - height);

      /* CURAM-FIX: Curam customized algorithm for placing the popup window around actions menu button.
       * If the overflow happens when the popup window tries to place its top or left corner
       * around the actions menu button, set the overflow variable with the maximum value
       * to prevent placing the popup window from these two places.
       */
	  var l = domGeometry.isBodyLtr();
      if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")
          && curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm == true) {
        if( (corner.charAt(0) == 'T' || (corner.charAt(1) == 'L' && l) || (corner.charAt(1) == 'R' && !l) )
          && overflow > 0 ){

          overflow = mb.w + mb.h;
        }
      }
      /* END CURAM-FIX */

			if(best == null || overflow < best.overflow){
				best = {
					corner: corner,
					aroundCorner: choice.aroundCorner,
					x: startX,
					y: startY,
					w: width,
					h: height,
					overflow: overflow,
					spaceAvailable: spaceAvailable
				};
			}

			return !overflow;
		});

		// In case the best position is not the last one we checked, need to call
		// layoutNode() again.
		if(best.overflow && layoutNode){
			layoutNode(node, best.aroundCorner, best.corner, best.spaceAvailable, aroundNodeCoords);
		}

		// And then position the node.  Do this last, after the layoutNode() above
		// has sized the node, due to browser quirks when the viewport is scrolled
		// (specifically that a Tooltip will shrink to fit as though the window was
		// scrolled to the left).
		//
		// In RTL mode, set style.right rather than style.left so in the common case,
		// window resizes move the popup along with the aroundNode.
		var l = domGeometry.isBodyLtr(),
		   	s = node.style;
		s.top = best.y + "px";
		s[l ? "left" : "right"] = (l ? best.x : view.w - best.x - best.w) + "px";
		s[l ? "right" : "left"] = "auto";	// needed for FF or else tooltip goes to far left

		return best;
	}

	/*=====
	dijit.place.__Position = function(){
		// x: Integer
		//		horizontal coordinate in pixels, relative to document body
		// y: Integer
		//		vertical coordinate in pixels, relative to document body

		this.x = x;
		this.y = y;
	};
	=====*/

	/*=====
	dijit.place.__Rectangle = function(){
		// x: Integer
		//		horizontal offset in pixels, relative to document body
		// y: Integer
		//		vertical offset in pixels, relative to document body
		// w: Integer
		//		width in pixels.   Can also be specified as "width" for backwards-compatibility.
		// h: Integer
		//		height in pixels.   Can also be specified as "height" from backwards-compatibility.

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};
	=====*/

	return (dijit.place = {
		// summary:
		//		Code to place a DOMNode relative to another DOMNode.
		//		Load using require(["dijit/place"], function(place){ ... }).

		at: function(node, pos, corners, padding){
			// summary:
			//		Positions one of the node's corners at specified position
			//		such that node is fully visible in viewport.
			// description:
			//		NOTE: node is assumed to be absolutely or relatively positioned.
			// node: DOMNode
			//		The node to position
			// pos: dijit.place.__Position
			//		Object like {x: 10, y: 20}
			// corners: String[]
			//		Array of Strings representing order to try corners in, like ["TR", "BL"].
			//		Possible values are:
			//			* "BL" - bottom left
			//			* "BR" - bottom right
			//			* "TL" - top left
			//			* "TR" - top right
			// padding: dijit.place.__Position?
			//		optional param to set padding, to put some buffer around the element you want to position.
			// example:
			//		Try to place node's top right corner at (10,20).
			//		If that makes node go (partially) off screen, then try placing
			//		bottom left corner at (10,20).
			//	|	place(node, {x: 10, y: 20}, ["TR", "BL"])
			var choices = array.map(corners, function(corner){
				var c = { corner: corner, pos: {x:pos.x,y:pos.y} };
				if(padding){
					c.pos.x += corner.charAt(1) == 'L' ? padding.x : -padding.x;
					c.pos.y += corner.charAt(0) == 'T' ? padding.y : -padding.y;
				}
				return c;
			});

			return _place(node, choices);
		},

		around: function(
			/*DomNode*/		node,
			/*DomNode || dijit.place.__Rectangle*/ anchor,
			/*String[]*/	positions,
			/*Boolean*/		leftToRight,
			/*Function?*/	layoutNode){

			// summary:
			//		Position node adjacent or kitty-corner to anchor
			//		such that it's fully visible in viewport.
			//
			// description:
			//		Place node such that corner of node touches a corner of
			//		aroundNode, and that node is fully visible.
			//
			// anchor:
			//		Either a DOMNode or a __Rectangle (object with x, y, width, height).
			//
			// positions:
			//		Ordered list of positions to try matching up.
			//			* before: places drop down to the left of the anchor node/widget, or to the right in the case
			//				of RTL scripts like Hebrew and Arabic; aligns either the top of the drop down
			//				with the top of the anchor, or the bottom of the drop down with bottom of the anchor.
			//			* after: places drop down to the right of the anchor node/widget, or to the left in the case
			//				of RTL scripts like Hebrew and Arabic; aligns either the top of the drop down
			//				with the top of the anchor, or the bottom of the drop down with bottom of the anchor.
			//			* before-centered: centers drop down to the left of the anchor node/widget, or to the right
			//				 in the case of RTL scripts like Hebrew and Arabic
			//			* after-centered: centers drop down to the right of the anchor node/widget, or to the left
			//				 in the case of RTL scripts like Hebrew and Arabic
			//			* above-centered: drop down is centered above anchor node
			//			* above: drop down goes above anchor node, left sides aligned
			//			* above-alt: drop down goes above anchor node, right sides aligned
			//			* below-centered: drop down is centered above anchor node
			//			* below: drop down goes below anchor node
			//			* below-alt: drop down goes below anchor node, right sides aligned
			//
			// layoutNode: Function(node, aroundNodeCorner, nodeCorner)
			//		For things like tooltip, they are displayed differently (and have different dimensions)
			//		based on their orientation relative to the parent.	 This adjusts the popup based on orientation.
			//
			// leftToRight:
			//		True if widget is LTR, false if widget is RTL.   Affects the behavior of "above" and "below"
			//		positions slightly.
			//
			// example:
			//	|	placeAroundNode(node, aroundNode, {'BL':'TL', 'TR':'BR'});
			//		This will try to position node such that node's top-left corner is at the same position
			//		as the bottom left corner of the aroundNode (ie, put node below
			//		aroundNode, with left edges aligned).	If that fails it will try to put
			// 		the bottom-right corner of node where the top right corner of aroundNode is
			//		(ie, put node above aroundNode, with right edges aligned)
			//

			// if around is a DOMNode (or DOMNode id), convert to coordinates
			var aroundNodePos = (typeof anchor == "string" || "offsetWidth" in anchor)
				? domGeometry.position(anchor, true)
				: anchor;

			// Compute position and size of visible part of anchor (it may be partially hidden by ancestor nodes w/scrollbars)
			if(anchor.parentNode){
				// ignore nodes between position:relative and position:absolute
				var sawPosAbsolute = domStyle.getComputedStyle(anchor).position == "absolute";
				var parent = anchor.parentNode;
				while(parent && parent.nodeType == 1 && parent.nodeName != "BODY"){  //ignoring the body will help performance
					var parentPos = domGeometry.position(parent, true),
						pcs = domStyle.getComputedStyle(parent);
					if(/relative|absolute/.test(pcs.position)){
						sawPosAbsolute = false;
					}
					if(!sawPosAbsolute && /hidden|auto|scroll/.test(pcs.overflow)){
						var bottomYCoord = Math.min(aroundNodePos.y + aroundNodePos.h, parentPos.y + parentPos.h);
						var rightXCoord = Math.min(aroundNodePos.x + aroundNodePos.w, parentPos.x + parentPos.w);
						aroundNodePos.x = Math.max(aroundNodePos.x, parentPos.x);
						aroundNodePos.y = Math.max(aroundNodePos.y, parentPos.y);
						aroundNodePos.h = bottomYCoord - aroundNodePos.y;
						aroundNodePos.w = rightXCoord - aroundNodePos.x;
					}
					if(pcs.position == "absolute"){
						sawPosAbsolute = true;
					}
					parent = parent.parentNode;
				}
			}


			var x = aroundNodePos.x,
				y = aroundNodePos.y,
				width = "w" in aroundNodePos ? aroundNodePos.w : (aroundNodePos.w = aroundNodePos.width),
				height = "h" in aroundNodePos ? aroundNodePos.h : (kernel.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+aroundNodePos.height+", width:"+width+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+aroundNodePos.height+", w:"+width+" }", "", "2.0"), aroundNodePos.h = aroundNodePos.height);

			// Convert positions arguments into choices argument for _place()
			var choices = [];
			function push(aroundCorner, corner){
				choices.push({
					aroundCorner: aroundCorner,
					corner: corner,
					pos: {
						x: {
							'L': x,
							'R': x + width,
							'M': x + (width >> 1)
						   }[aroundCorner.charAt(1)],
						y: {
							'T': y,
							'B': y + height,
							'M': y + (height >> 1)
						   }[aroundCorner.charAt(0)]
					}
				})
			}
			array.forEach(positions, function(pos){
				var ltr =  leftToRight;
				switch(pos){
					case "above-centered":
						push("TM", "BM");
						break;
					case "below-centered":
						push("BM", "TM");
						break;
					case "after-centered":
						ltr = !ltr;
						// fall through
					case "before-centered":
						push(ltr ? "ML" : "MR", ltr ? "MR" : "ML");
						break;
					case "after":
						ltr = !ltr;
						// fall through
					case "before":
						push(ltr ? "TL" : "TR", ltr ? "TR" : "TL");
						push(ltr ? "BL" : "BR", ltr ? "BR" : "BL");
						break;
					case "below-alt":
						ltr = !ltr;
						// fall through
					case "below":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "BL" : "BR", ltr ? "TL" : "TR");
						push(ltr ? "BR" : "BL", ltr ? "TR" : "TL");
						break;
					case "above-alt":
						ltr = !ltr;
						// fall through
					case "above":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "TL" : "TR", ltr ? "BL" : "BR");
						push(ltr ? "TR" : "TL", ltr ? "BR" : "BL");
						break;
					default:
						// To assist dijit/_base/place, accept arguments of type {aroundCorner: "BL", corner: "TL"}.
						// Not meant to be used directly.
						push(pos.aroundCorner, pos.corner);
				}
			});

			var position = _place(node, choices, layoutNode, {w: width, h: height});
			position.aroundNodePos = aroundNodePos;

			return position;
		}
	});
});

},
'dijit/_HasDropDown':function(){
define("dijit/_HasDropDown", [
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred",
	"dojo/_base/event", // event.stop
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-class", // domClass.add domClass.contains domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox domGeometry.position
	"dojo/dom-style", // domStyle.set
	"dojo/has",
	"dojo/keys", // keys.DOWN_ARROW keys.ENTER keys.ESCAPE
	"dojo/_base/lang", // lang.hitch lang.isFunction
	"dojo/touch",
	"dojo/_base/window", // win.doc
	"dojo/window", // winUtils.getBox
	"./registry",	// registry.byNode()
	"./focus",
	"./popup",
	"./_FocusMixin"
], function(declare, Deferred, event,dom, domAttr, domClass, domGeometry, domStyle, has, keys, lang, touch,
			win, winUtils, registry, focus, popup, _FocusMixin){

/*=====
	var _FocusMixin = dijit._FocusMixin;
=====*/

	// module:
	//		dijit/_HasDropDown
	// summary:
	//		Mixin for widgets that need drop down ability.

	return declare("dijit._HasDropDown", _FocusMixin, {
		// summary:
		//		Mixin for widgets that need drop down ability.

		// _buttonNode: [protected] DomNode
		//		The button/icon/node to click to display the drop down.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then either focusNode or domNode (if focusNode is also missing) will be used.
		_buttonNode: null,

		// _arrowWrapperNode: [protected] DomNode
		//		Will set CSS class dijitUpArrow, dijitDownArrow, dijitRightArrow etc. on this node depending
		//		on where the drop down is set to be positioned.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then _buttonNode will be used.
		_arrowWrapperNode: null,

		// _popupStateNode: [protected] DomNode
		//		The node to set the popupActive class on.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then focusNode or _buttonNode (if focusNode is missing) will be used.
		_popupStateNode: null,

		// _aroundNode: [protected] DomNode
		//		The node to display the popup around.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then domNode will be used.
		_aroundNode: null,

		// dropDown: [protected] Widget
		//		The widget to display as a popup.  This widget *must* be
		//		defined before the startup function is called.
		dropDown: null,

		// autoWidth: [protected] Boolean
		//		Set to true to make the drop down at least as wide as this
		//		widget.  Set to false if the drop down should just be its
		//		default width
		autoWidth: true,

		// forceWidth: [protected] Boolean
		//		Set to true to make the drop down exactly as wide as this
		//		widget.  Overrides autoWidth.
		forceWidth: false,

		// maxHeight: [protected] Integer
		//		The max height for our dropdown.
		//		Any dropdown taller than this will have scrollbars.
		//		Set to 0 for no max height, or -1 to limit height to available space in viewport
		maxHeight: 0,

		// dropDownPosition: [const] String[]
		//		This variable controls the position of the drop down.
		//		It's an array of strings with the following values:
		//
		//			* before: places drop down to the left of the target node/widget, or to the right in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* after: places drop down to the right of the target node/widget, or to the left in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* above: drop down goes above target node
		//			* below: drop down goes below target node
		//
		//		The list is positions is tried, in order, until a position is found where the drop down fits
		//		within the viewport.
		//
		dropDownPosition: ["below","above"],

		// _stopClickEvents: Boolean
		//		When set to false, the click events will not be stopped, in
		//		case you want to use them in your subwidget
		_stopClickEvents: true,

		_onDropDownMouseDown: function(/*Event*/ e){
			// summary:
			//		Callback when the user mousedown's on the arrow icon
			if(this.disabled || this.readOnly){ return; }

			// Prevent default to stop things like text selection, but don't stop propogation, so that:
			//		1. TimeTextBox etc. can focusthe <input> on mousedown
			//		2. dropDownButtonActive class applied by _CssStateMixin (on button depress)
			//		3. user defined onMouseDown handler fires
			e.preventDefault();

			this._docHandler = this.connect(win.doc, touch.release, "_onDropDownMouseUp");

			this.toggleDropDown();
		},

		_onDropDownMouseUp: function(/*Event?*/ e){
			// summary:
			//		Callback when the user lifts their mouse after mouse down on the arrow icon.
			//		If the drop down is a simple menu and the mouse is over the menu, we execute it, otherwise, we focus our
			//		drop down widget.  If the event is missing, then we are not
			//		a mouseup event.
			//
			//		This is useful for the common mouse movement pattern
			//		with native browser <select> nodes:
			//			1. mouse down on the select node (probably on the arrow)
			//			2. move mouse to a menu item while holding down the mouse button
			//			3. mouse up.  this selects the menu item as though the user had clicked it.
			if(e && this._docHandler){
				this.disconnect(this._docHandler);
			}
			var dropDown = this.dropDown, overMenu = false;

			if(e && this._opened){
				// This code deals with the corner-case when the drop down covers the original widget,
				// because it's so large.  In that case mouse-up shouldn't select a value from the menu.
				// Find out if our target is somewhere in our dropdown widget,
				// but not over our _buttonNode (the clickable node)
				var c = domGeometry.position(this._buttonNode, true);
				if(!(e.pageX >= c.x && e.pageX <= c.x + c.w) ||
					!(e.pageY >= c.y && e.pageY <= c.y + c.h)){
					var t = e.target;
					while(t && !overMenu){
						if(domClass.contains(t, "dijitPopup")){
							overMenu = true;
						}else{
							t = t.parentNode;
						}
					}
					if(overMenu){
						t = e.target;
						if(dropDown.onItemClick){
							var menuItem;
							while(t && !(menuItem = registry.byNode(t))){
								t = t.parentNode;
							}
							if(menuItem && menuItem.onClick && menuItem.getParent){
								menuItem.getParent().onItemClick(menuItem, e);
							}
						}
						return;
					}
				}
			}
			if(this._opened){
				if(dropDown.focus && dropDown.autoFocus !== false){
					// Focus the dropdown widget - do it on a delay so that we
					// don't steal our own focus.
					window.setTimeout(lang.hitch(dropDown, "focus"), 1);
				}
			}else{
				// The drop down arrow icon probably can't receive focus, but widget itself should get focus.
				// setTimeout() needed to make it work on IE (test DateTextBox)
				setTimeout(lang.hitch(this, "focus"), 0);
			}

			if(has("ios")){
				this._justGotMouseUp = true;
				setTimeout(lang.hitch(this, function(){
					this._justGotMouseUp = false;
				}), 0);
			}
		},

		_onDropDownClick: function(/*Event*/ e){
			if(has("ios") && !this._justGotMouseUp){
				// This branch fires on iPhone for ComboBox, because the button node is an <input> and doesn't
				// generate touchstart/touchend events.   Pretend we just got a mouse down / mouse up.
				// The if(has("ios") is necessary since IE and desktop safari get spurious onclick events
				// when there are nested tables (specifically, clicking on a table that holds a dijit.form.Select,
				// but not on the Select itself, causes an onclick event on the Select)
				this._onDropDownMouseDown(e);
				this._onDropDownMouseUp(e);
			}

			// The drop down was already opened on mousedown/keydown; just need to call stopEvent().
			if(this._stopClickEvents){
				event.stop(e);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);

			this._buttonNode = this._buttonNode || this.focusNode || this.domNode;
			this._popupStateNode = this._popupStateNode || this.focusNode || this._buttonNode;

			// Add a class to the "dijitDownArrowButton" type class to _buttonNode so theme can set direction of arrow
			// based on where drop down will normally appear
			var defaultPos = {
					"after" : this.isLeftToRight() ? "Right" : "Left",
					"before" : this.isLeftToRight() ? "Left" : "Right",
					"above" : "Up",
					"below" : "Down",
					"left" : "Left",
					"right" : "Right"
			}[this.dropDownPosition[0]] || this.dropDownPosition[0] || "Down";
			domClass.add(this._arrowWrapperNode || this._buttonNode, "dijit" + defaultPos + "ArrowButton");
		},

		postCreate: function(){
			// summary:
			//		set up nodes and connect our mouse and keypress events

			this.inherited(arguments);

			this.connect(this._buttonNode, touch.press, "_onDropDownMouseDown");
			this.connect(this._buttonNode, "onclick", "_onDropDownClick");
			this.connect(this.focusNode, "onkeypress", "_onKey");
			this.connect(this.focusNode, "onkeyup", "_onKeyUp");
		},

		destroy: function(){
			if(this.dropDown){
				// Destroy the drop down, unless it's already been destroyed.  This can happen because
				// the drop down is a direct child of <body> even though it's logically my child.
				if(!this.dropDown._destroyed){
					this.dropDown.destroyRecursive();
				}
				delete this.dropDown;
			}
			this.inherited(arguments);
		},

		_onKey: function(/*Event*/ e){
			// summary:
			//		Callback when the user presses a key while focused on the button node

			if(this.disabled || this.readOnly){ return; }

			var d = this.dropDown, target = e.target;
			if(d && this._opened && d.handleKey){
				if(d.handleKey(e) === false){
					/* false return code means that the drop down handled the key */
					event.stop(e);
					return;
				}
			}
			if(d && this._opened && e.charOrCode == keys.ESCAPE){
				this.closeDropDown();
				event.stop(e);
			}else if(!this._opened &&
					(e.charOrCode == keys.DOWN_ARROW ||
						( (e.charOrCode == keys.ENTER || e.charOrCode == " ") &&
						  //ignore enter and space if the event is for a text input
						  ((target.tagName || "").toLowerCase() !== 'input' ||
						     (target.type && target.type.toLowerCase() !== 'text'))))){
				// Toggle the drop down, but wait until keyup so that the drop down doesn't
				// get a stray keyup event, or in the case of key-repeat (because user held
				// down key for too long), stray keydown events
				this._toggleOnKeyUp = true;
				event.stop(e);
			}
		},

		_onKeyUp: function(){
			if(this._toggleOnKeyUp){
				delete this._toggleOnKeyUp;
				this.toggleDropDown();
				var d = this.dropDown;	// drop down may not exist until toggleDropDown() call
				if(d && d.focus){
					setTimeout(lang.hitch(d, "focus"), 1);
				}
			}
		},

		_onBlur: function(){
			// summary:
			//		Called magically when focus has shifted away from this widget and it's dropdown

			// Don't focus on button if the user has explicitly focused on something else (happens
			// when user clicks another control causing the current popup to close)..
			// But if focus is inside of the drop down then reset focus to me, because IE doesn't like
			// it when you display:none a node with focus.
			var focusMe = focus.curNode && this.dropDown && dom.isDescendant(focus.curNode, this.dropDown.domNode);

			this.closeDropDown(focusMe);

			this.inherited(arguments);
		},

		isLoaded: function(){
			// summary:
			//		Returns true if the dropdown exists and it's data is loaded.  This can
			//		be overridden in order to force a call to loadDropDown().
			// tags:
			//		protected

			return true;
		},

		loadDropDown: function(/*Function*/ loadCallback){
			// summary:
			//		Creates the drop down if it doesn't exist, loads the data
			//		if there's an href and it hasn't been loaded yet, and then calls
			//		the given callback.
			// tags:
			//		protected

			// TODO: for 2.0, change API to return a Deferred, instead of calling loadCallback?
			loadCallback();
		},

		loadAndOpenDropDown: function(){
			// summary:
			//		Creates the drop down if it doesn't exist, loads the data
			//		if there's an href and it hasn't been loaded yet, and
			//		then opens the drop down.  This is basically a callback when the
			//		user presses the down arrow button to open the drop down.
			// returns: Deferred
			//		Deferred for the drop down widget that
			//		fires when drop down is created and loaded
			// tags:
			//		protected
			var d = new Deferred(),
				afterLoad = lang.hitch(this, function(){
					this.openDropDown();
					d.resolve(this.dropDown);
				});
			if(!this.isLoaded()){
				this.loadDropDown(afterLoad);
			}else{
				afterLoad();
			}
			return d;
		},

		toggleDropDown: function(){
			// summary:
			//		Callback when the user presses the down arrow button or presses
			//		the down arrow key to open/close the drop down.
			//		Toggle the drop-down widget; if it is up, close it, if not, open it
			// tags:
			//		protected

			if(this.disabled || this.readOnly){ return; }
			if(!this._opened){
				this.loadAndOpenDropDown();
			}else{
				this.closeDropDown();
			}
		},

		openDropDown: function(){
			// summary:
			//		Opens the dropdown for this widget.   To be called only when this.dropDown
			//		has been created and is ready to display (ie, it's data is loaded).
			// returns:
			//		return value of dijit.popup.open()
			// tags:
			//		protected

			var dropDown = this.dropDown,
				ddNode = dropDown.domNode,
				aroundNode = this._aroundNode || this.domNode,
				self = this;

			// Prepare our popup's height and honor maxHeight if it exists.

			// TODO: isn't maxHeight dependent on the return value from dijit.popup.open(),
			// ie, dependent on how much space is available (BK)

			if(!this._preparedNode){
				this._preparedNode = true;
				// Check if we have explicitly set width and height on the dropdown widget dom node
				if(ddNode.style.width){
					this._explicitDDWidth = true;
				}
				if(ddNode.style.height){
					this._explicitDDHeight = true;
				}
			}

			// Code for resizing dropdown (height limitation, or increasing width to match my width)
			if(this.maxHeight || this.forceWidth || this.autoWidth){
				var myStyle = {
					display: "",
					visibility: "hidden"
				};
				if(!this._explicitDDWidth){
					myStyle.width = "";
				}
				if(!this._explicitDDHeight){
					myStyle.height = "";
				}
				domStyle.set(ddNode, myStyle);

				// Figure out maximum height allowed (if there is a height restriction)
				var maxHeight = this.maxHeight;
				if(maxHeight == -1){
					// limit height to space available in viewport either above or below my domNode
					// (whichever side has more room)
					var viewport = winUtils.getBox(),
						position = domGeometry.position(aroundNode, false);
					maxHeight = Math.floor(Math.max(position.y, viewport.h - (position.y + position.h)));
				}

				// Attach dropDown to DOM and make make visibility:hidden rather than display:none
				// so we call startup() and also get the size
				popup.moveOffScreen(dropDown);

				if(dropDown.startup && !dropDown._started){
					dropDown.startup(); // this has to be done after being added to the DOM
				}
				// Get size of drop down, and determine if vertical scroll bar needed
				var mb = domGeometry.getMarginSize(ddNode);
				var overHeight = (maxHeight && mb.h > maxHeight);
				domStyle.set(ddNode, {
					overflowX: "hidden",
					overflowY: overHeight ? "auto" : "hidden"
				});
				if(overHeight){
					mb.h = maxHeight;
					if("w" in mb){
						mb.w += 16;	// room for vertical scrollbar
					}
				}else{
					delete mb.h;
				}

				// Adjust dropdown width to match or be larger than my width
				if(this.forceWidth){
					mb.w = aroundNode.offsetWidth;
				}else if(this.autoWidth){
					mb.w = Math.max(mb.w, aroundNode.offsetWidth);
				}else{
					delete mb.w;
				}

				// And finally, resize the dropdown to calculated height and width
				if(lang.isFunction(dropDown.resize)){
					dropDown.resize(mb);
				}else{
					domGeometry.setMarginBox(ddNode, mb);
				}
			}

			var retVal = popup.open({
				parent: this,
				popup: dropDown,
				around: aroundNode,
				orient: this.dropDownPosition,
				onExecute: function(){
					self.closeDropDown(true);
				},
				onCancel: function(){
					self.closeDropDown(true);
				},
				onClose: function(){
					domAttr.set(self._popupStateNode, "popupActive", false);
					domClass.remove(self._popupStateNode, "dijitHasDropDownOpen");
					self._opened = false;
				}
			});
			domAttr.set(this._popupStateNode, "popupActive", "true");
			domClass.add(self._popupStateNode, "dijitHasDropDownOpen");
			this._opened=true;

			// TODO: set this.checked and call setStateClass(), to affect button look while drop down is shown
			return retVal;
		},

		closeDropDown: function(/*Boolean*/ focus){
			// summary:
			//		Closes the drop down on this widget
			// focus:
			//		If true, refocuses the button widget
			// tags:
			//		protected

			if(this._opened){
				if(focus){ this.focus(); }
				popup.close(this.dropDown);
				this._opened = false;
			}
		}

	});
});

},
'curam/util/Request':function(){
/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
 * Modification History
 * --------------------
 * 04-Mar-2014  MV  [CR00421036] Use new LocalConfig API to read options, make
 *      login page detector configurable, add documentation.
 * 27-Feb-2014  MV  [CR00419961] Initial version.
 */

define("curam/util/Request", ['dojo/_base/xhr',
        'curam/debug',
        'curam/util/ResourceBundle',
        'curam/util/LocalConfig'
        ], function(xhr, debug, ResourceBundle, localConfig) {
  
  dojo.requireLocalization("curam.application", "Request");

  var bundle = new ResourceBundle("Request"),

      // holds custom login page detector function, if one was provided
      // by the API client
      _isLoginPage = null,
        
      /**
       * Check for a login page based on the presence of this HTML tag:
       * <form action="j_security_check" ...>
       * 
       * @param request The XHR request object.
       * @return True if the response is a login page, otherwise False.
       */
      isLoginPage = function(request) {
        // if custom login page detector was provided use it
        if (_isLoginPage) {
          return _isLoginPage(request);

        // or fall back to default detection method
        } else {
          return request.responseText.indexOf(
              "action=\"j_security_check\"") > 0;
        }
      },

      errorDisplayHookpoint = function(err, ioargs) {
        if (isLoginPage(ioargs.xhr)) {
          // session timeout scenario
          debug.log(bundle.getProperty('sessionExpired'));
          alert(bundle.getProperty('sessionExpired'));

        } else {
          // display generic error message
          debug.log(bundle.getProperty('ajaxError'));
          alert(bundle.getProperty('ajaxError'));
        }

        // log the error
        debug.log(err);
        debug.log('HTTP status was: ' + ioargs.xhr.status);
      },
      
      _xhr = function(method, args) {
        var ajaxDebugMode =
                localConfig.readOption('ajaxDebugMode', 'false') == 'true';

        var error = args.error;
        
        // only enable common error handling if debug mode is on
        if (ajaxDebugMode) {
          args.error = function(err, ioargs) {
            if (args.errorHandlerOverrideDefault !== true) {
              errorDisplayHookpoint(err, ioargs);
            }

            // make sure custom error handler gets called, if there is one
            if (error) {
              error(err, ioargs);
            }
          };
        }

        var deferred = method(args);
        return deferred;
      };

  /**
   * @name curam.util.Request
   * @namespace AJAX request API with common error handling and login page
   * detection. It is designed as a near drop-in replacement for the dojo.xhr*
   * group of functions.
   * <p/>
   * By default this API will behave exactly like it's dojo.xhr* counterpart.
   * <p/>
   * But if the "curam.trace.javascript.ajax.report" application property is set
   * to true then common error reporting is used, causing every AJAX request
   * failure to be reported to the user in a friendly dialog with details
   * written to the JavaScript trace log (if it is enabled).<br/>
   * Session timeouts will be reported differently, asking the user to log
   * in again.
   * <p/>
   * Note that by default the common reporting will work alongside any custom
   * error handlers specified by the API client. However if
   * the "errorHandlerOverrideDefault" property is present on the args
   * object and is set to true, then a provided custom error handler will
   * override the default handling provided by this API.
   */
  var Request = 
    /**
     * @lends curam.util.Request.prototype
     */
    {
      /**
       * This function works exactly like
       * <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrPost.html">dojo.xhrPost</a>
       * only it additionally provides common error handling for AJAX requests.
       *
       * @param args This object defines how the post() should operate.
       *  For detailed information see
       *  <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrPost.html#dojo-xhrpost-supported-object-properties">dojo.xhrPost documentation</a>
       * @returns {dojo.Deferred} Same return type as get(). See
       *  <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrGet.html#return-type-dojo-deferred">dojo.xhrGet return type</a>
       *  for details.
       */
      post: function(args) {
        return _xhr(xhr.post, args);
      },
      
      /**
       * This function works exactly like
       * <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrGet.html">dojo.xhrGet</a>
       * only it additionally provides common error handling for AJAX requests.
       *
       * @param args This object defines how the get() should operate.
       *  For detailed information see
       *  <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrGet.html#dojo-xhrget-supported-object-properties">dojo.xhrGet documentation</a>
       * @returns {dojo.Deferred} See
       *  <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrGet.html#return-type-dojo-deferred">dojo.xhrGet return type</a>
       *  for details.
       */
      get: function(args) {
        return _xhr(xhr.get, args);
      },
      
      /**
       * Allows to optionally customize the way to detect that a response
       * from an AJAX request is a login page.
       * 
       * This is optional and if custom detector function is not provided
       * the API will by default recognize login pages that contain a HTML form
       * that submits into the standard "j_security_check" mechanism.
       * 
       * If null is passed the default detection method will be used.
       * 
       * @param {function(dojoXhrRequestObject)::boolean} detectorFunction
       *        The function to be used for detecting login page based on the
       *        <a href="http://dojotoolkit.org/reference-guide/1.9/dojo/xhrGet.html#handling-status-codes">Dojo XHR
       *        request object.</a>
       */
      setLoginPageDetector: function(detectorFunction) {
        _isLoginPage = detectorFunction;
      }
    };

  return Request;
});

},
'dijit/_MenuBase':function(){
define("dijit/_MenuBase", [
	"./popup",
	"dojo/window",
	"./_Widget",
	"./_KeyNavContainer",
	"./_TemplatedMixin",
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.isDescendant domClass.replace
	"dojo/dom-attr",
	"dojo/dom-class", // domClass.replace
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/array"	// array.indexOf
], function(pm, winUtils, _Widget, _KeyNavContainer, _TemplatedMixin,
	declare, dom, domAttr, domClass, lang, array){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _KeyNavContainer = dijit._KeyNavContainer;
=====*/

// module:
//		dijit/_MenuBase
// summary:
//		Base class for Menu and MenuBar

return declare("dijit._MenuBase",
	[_Widget, _TemplatedMixin, _KeyNavContainer],
{
	// summary:
	//		Base class for Menu and MenuBar

	// parentMenu: [readonly] Widget
	//		pointer to menu that displayed me
	parentMenu: null,

	// popupDelay: Integer
	//		number of milliseconds before hovering (without clicking) causes the popup to automatically open.
	popupDelay: 500,

	onExecute: function(){
		// summary:
		//		Attach point for notification about when a menu item has been executed.
		//		This is an internal mechanism used for Menus to signal to their parent to
		//		close them, because they are about to execute the onClick handler.  In
		//		general developers should not attach to or override this method.
		// tags:
		//		protected
	},

	onCancel: function(/*Boolean*/ /*===== closeAll =====*/){
		// summary:
		//		Attach point for notification about when the user cancels the current menu
		//		This is an internal mechanism used for Menus to signal to their parent to
		//		close them.  In general developers should not attach to or override this method.
		// tags:
		//		protected
	},

	_moveToPopup: function(/*Event*/ evt){
		// summary:
		//		This handles the right arrow key (left arrow key on RTL systems),
		//		which will either open a submenu, or move to the next item in the
		//		ancestor MenuBar
		// tags:
		//		private

		if(this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled){
			this.focusedChild._onClick(evt);
		}else{
			var topMenu = this._getTopMenu();
			if(topMenu && topMenu._isMenuBar){
				topMenu.focusNext();
			}
		}
	},

	_onPopupHover: function(/*Event*/ /*===== evt =====*/){
		// summary:
		//		This handler is called when the mouse moves over the popup.
		// tags:
		//		private

		// if the mouse hovers over a menu popup that is in pending-close state,
		// then stop the close operation.
		// This can't be done in onItemHover since some popup targets don't have MenuItems (e.g. ColorPicker)
		if(this.currentPopup && this.currentPopup._pendingClose_timer){
			var parentMenu = this.currentPopup.parentMenu;
			// highlight the parent menu item pointing to this popup
			if(parentMenu.focusedChild){
				parentMenu.focusedChild._setSelected(false);
			}
			parentMenu.focusedChild = this.currentPopup.from_item;
			parentMenu.focusedChild._setSelected(true);
			// cancel the pending close
			this._stopPendingCloseTimer(this.currentPopup);
		}
	},

	onItemHover: function(/*MenuItem*/ item){
		// summary:
		//		Called when cursor is over a MenuItem.
		// tags:
		//		protected

		// Don't do anything unless user has "activated" the menu by:
		//		1) clicking it
		//		2) opening it from a parent menu (which automatically focuses it)
		if(this.isActive){
			this.focusChild(item);
			if(this.focusedChild.popup && !this.focusedChild.disabled && !this.hover_timer){
				this.hover_timer = setTimeout(lang.hitch(this, "_openPopup"), this.popupDelay);
			}
		}
		// if the user is mixing mouse and keyboard navigation,
		// then the menu may not be active but a menu item has focus,
		// but it's not the item that the mouse just hovered over.
		// To avoid both keyboard and mouse selections, use the latest.
		if(this.focusedChild){
			this.focusChild(item);
		}
		this._hoveredChild = item;
	},

	_onChildBlur: function(item){
		// summary:
		//		Called when a child MenuItem becomes inactive because focus
		//		has been removed from the MenuItem *and* it's descendant menus.
		// tags:
		//		private
		this._stopPopupTimer();
		item._setSelected(false);
		// Close all popups that are open and descendants of this menu
		var itemPopup = item.popup;
		if(itemPopup){
			this._stopPendingCloseTimer(itemPopup);
			itemPopup._pendingClose_timer = setTimeout(function(){
				itemPopup._pendingClose_timer = null;
				if(itemPopup.parentMenu){
					itemPopup.parentMenu.currentPopup = null;
				}
				pm.close(itemPopup); // this calls onClose
			}, this.popupDelay);
		}
	},

	onItemUnhover: function(/*MenuItem*/ item){
		// summary:
		//		Callback fires when mouse exits a MenuItem
		// tags:
		//		protected

		if(this.isActive){
			this._stopPopupTimer();
		}
		if(this._hoveredChild == item){ this._hoveredChild = null; }
	},

	_stopPopupTimer: function(){
		// summary:
		//		Cancels the popup timer because the user has stop hovering
		//		on the MenuItem, etc.
		// tags:
		//		private
		if(this.hover_timer){
			clearTimeout(this.hover_timer);
			this.hover_timer = null;
		}
	},

	_stopPendingCloseTimer: function(/*dijit._Widget*/ popup){
		// summary:
		//		Cancels the pending-close timer because the close has been preempted
		// tags:
		//		private
		if(popup._pendingClose_timer){
			clearTimeout(popup._pendingClose_timer);
			popup._pendingClose_timer = null;
		}
	},

	_stopFocusTimer: function(){
		// summary:
		//		Cancels the pending-focus timer because the menu was closed before focus occured
		// tags:
		//		private
		if(this._focus_timer){
			clearTimeout(this._focus_timer);
			this._focus_timer = null;
		}
	},

	_getTopMenu: function(){
		// summary:
		//		Returns the top menu in this chain of Menus
		// tags:
		//		private
		for(var top=this; top.parentMenu; top=top.parentMenu);
		return top;
	},

	onItemClick: function(/*dijit._Widget*/ item, /*Event*/ evt){
		// summary:
		//		Handle clicks on an item.
		// tags:
		//		private

		// this can't be done in _onFocus since the _onFocus events occurs asynchronously
		if(typeof this.isShowingNow == 'undefined'){ // non-popup menu
			this._markActive();
		}

		this.focusChild(item);

		if(item.disabled){ return false; }

		if(item.popup){
			this._openPopup();
		}else{
			// before calling user defined handler, close hierarchy of menus
			// and restore focus to place it was when menu was opened
			this.onExecute();

			// user defined handler for click
			item.onClick(evt);
		}
	},

	_openPopup: function(){
		// summary:
		//		Open the popup to the side of/underneath the current menu item
		// tags:
		//		protected

		this._stopPopupTimer();
		var from_item = this.focusedChild;
		if(!from_item){ return; } // the focused child lost focus since the timer was started
		var popup = from_item.popup;
		if(popup.isShowingNow){ return; }
		if(this.currentPopup){
			this._stopPendingCloseTimer(this.currentPopup);
			pm.close(this.currentPopup);
		}
		popup.parentMenu = this;
		popup.from_item = from_item; // helps finding the parent item that should be focused for this popup
		var self = this;
		pm.open({
			parent: this,
			popup: popup,
			around: from_item.domNode,
			orient: this._orient || ["after", "before"],
			onCancel: function(){ // called when the child menu is canceled
				// set isActive=false (_closeChild vs _cleanUp) so that subsequent hovering will NOT open child menus
				// which seems aligned with the UX of most applications (e.g. notepad, wordpad, paint shop pro)
				self.focusChild(from_item);	// put focus back on my node
				self._cleanUp();			// close the submenu (be sure this is done _after_ focus is moved)
				from_item._setSelected(true); // oops, _cleanUp() deselected the item
				self.focusedChild = from_item;	// and unset focusedChild
			},
			onExecute: lang.hitch(this, "_cleanUp")
		});

		this.currentPopup = popup;

		// detect mouseovers to handle lazy mouse movements that temporarily focus other menu items
		if(this.popupHoverHandle){
			this.disconnect(this.popupHoverHandle);
		}
		this.popupHoverHandle = this.connect(popup.domNode, "onmouseenter", "_onPopupHover");

		if(popup.focus){
			// If user is opening the popup via keyboard (right arrow, or down arrow for MenuBar),
			// if the cursor happens to collide with the popup, it will generate an onmouseover event
			// even though the mouse wasn't moved.  Use a setTimeout() to call popup.focus so that
			// our focus() call overrides the onmouseover event, rather than vice-versa.  (#8742)
			popup._focus_timer = setTimeout(lang.hitch(popup, function(){
				this._focus_timer = null;
				this.focus();
			}), 0);
		}
	},

	_markActive: function(){
		// summary:
		//		Mark this menu's state as active.
		//		Called when this Menu gets focus from:
		//			1) clicking it (mouse or via space/arrow key)
		//			2) being opened by a parent menu.
		//		This is not called just from mouse hover.
		//		Focusing a menu via TAB does NOT automatically set isActive
		//		since TAB is a navigation operation and not a selection one.
		//		For Windows apps, pressing the ALT key focuses the menubar
		//		menus (similar to TAB navigation) but the menu is not active
		//		(ie no dropdown) until an item is clicked.
		this.isActive = true;
		domClass.replace(this.domNode, "dijitMenuActive", "dijitMenuPassive");
	},

	onOpen: function(/*Event*/ /*===== e =====*/){
		// summary:
		//		Callback when this menu is opened.
		//		This is called by the popup manager as notification that the menu
		//		was opened.
		// tags:
		//		private

		this.isShowingNow = true;
		this._markActive();
	},

	_markInactive: function(){
		// summary:
		//		Mark this menu's state as inactive.
		this.isActive = false; // don't do this in _onBlur since the state is pending-close until we get here
		domClass.replace(this.domNode, "dijitMenuPassive", "dijitMenuActive");
	},

	onClose: function(){
		// summary:
		//		Callback when this menu is closed.
		//		This is called by the popup manager as notification that the menu
		//		was closed.
		// tags:
		//		private

		this._stopFocusTimer();
		this._markInactive();
		this.isShowingNow = false;
		this.parentMenu = null;
	},

	_closeChild: function(){
		// summary:
		//		Called when submenu is clicked or focus is lost.  Close hierarchy of menus.
		// tags:
		//		private
		this._stopPopupTimer();

		if(this.currentPopup){
			// If focus is on a descendant MenuItem then move focus to me,
			// because IE doesn't like it when you display:none a node with focus,
			// and also so keyboard users don't lose control.
			// Likely, immediately after a user defined onClick handler will move focus somewhere
			// else, like a Dialog.
			if(array.indexOf(this._focusManager.activeStack, this.id) >= 0){
				domAttr.set(this.focusedChild.focusNode, "tabIndex", this.tabIndex);
				this.focusedChild.focusNode.focus();
			}
			// Close all popups that are open and descendants of this menu
			pm.close(this.currentPopup);
			this.currentPopup = null;
		}

		if(this.focusedChild){ // unhighlight the focused item
			this.focusedChild._setSelected(false);
			this.focusedChild._onUnhover();
			this.focusedChild = null;
		}
	},

	_onItemFocus: function(/*MenuItem*/ item){
		// summary:
		//		Called when child of this Menu gets focus from:
		//			1) clicking it
		//			2) tabbing into it
		//			3) being opened by a parent menu.
		//		This is not called just from mouse hover.
		if(this._hoveredChild && this._hoveredChild != item){
			this._hoveredChild._onUnhover(); // any previous mouse movement is trumped by focus selection
		}
	},

	_onBlur: function(){
		// summary:
		//		Called when focus is moved away from this Menu and it's submenus.
		// tags:
		//		protected
		this._cleanUp();
		this.inherited(arguments);
	},

	_cleanUp: function(){
		// summary:
		//		Called when the user is done with this menu.  Closes hierarchy of menus.
		// tags:
		//		private

		this._closeChild(); // don't call this.onClose since that's incorrect for MenuBar's that never close
		if(typeof this.isShowingNow == 'undefined'){ // non-popup menu doesn't call onClose
			this._markInactive();
		}
	}
});

});

},
'curam/dialog':function(){
/*
 * Copyright 2012-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
define("curam/dialog", ["curam/util",
        "curam/debug",
        "curam/util/external",
        "curam/util/Refresh",
        "curam/tab",
        "curam/util/RuntimeContext",
        "curam/define",
        "curam/util/onLoad",
        "cm/_base/_dom",
        "curam/util/ResourceBundle"
        ], function(util, trace, external) {

/*
 * Modification History
 * --------------------
 * 25-Mar-2014  MV  [CR00423311] Handle usage from an external application.
 * 10-Jul-2013  KW  [CR00391894] Remove reference o3_artificial_post parameter.
 * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
 *                include required bundle.
 * 11-Mar-2013  MV  [CR00373738] Remove change to close dialog when page
 *    is loaded. We'll do it differently in curam/ModalDialog.
 * 23-Oct-2012  MV  [CR00347543] Refer to top level UIController.
 * 24-Sep-2012  MV  [CR00345119] Revert the change to the function used for
 *      detecting when page unloads in a modal.
 * 24-Jul-2012  MK  [CR00336401] Wrapped contents of the closeModalDialog
 *    method in dojo.ready to prevent it closing the model before the page has
 *    finished loading.
 * 07-Feb-2012  MV  [CR00301458] Code cleanup.
 * 15-Sept-2011 MK  [CR00287680] Change the function that is used to detect a 
 *      page unloading in a modal. Changing from addOnUnload to addOnWindowUnload
 * 02-Aug-2011  MV  [CR00283023] Refactored modalEventHandler to allow
 *      unit testing. Avoid unwanted refresh when parent is an Action.do page.
 * 29-Jul-2011  MV [CR00269970] Add support for refreshing based on submit with
 *      inline page as parent. 
 * 11-Feb-2011  PK  [CR00251730] Added support for refreshing main content
 *                    panel on submit.
 * 28-Jan-2011  MV  [CR00245381] Catch Access denied error when accessing
 *    external sites.
 * 21-Jan-2011  DG  [CR00243540] Changed "console.log" to "curam.debug.log".
 * 13-Jan-2011  MV  [CR00241667] Fire event when the dialog infrastructure
 *    is ready.
 * 05-Jan-2011  SK  [CR00239843] Previous page id parameter is not added any
 *                  longer to the form submits from Agenda Player.
 * 12-Jan-2011  SK  [CR00241719] Added the option to close modal without
 *                               the parent redirect.
 * 29-Nov-2010  MV  [CR00232623] Add in a hack to properly unregister a handler
 *    on page unload when using agenda player.
 * 23-Nov-2010  MV  [CR00232063] Remove page loading mask.
 * 19-Nov-2010 MV [CR00231655] Store the display status and dialog size
 *     in the runtime context.
 * 18-Nov-2010 MV [CR00231387] Connect to DOM events with a function that will
 *    automatically disconnect on page unload.
 * 27-Oct-2010  MV  [CR00224488] Refactor for the dialog closing to work well
 *    with new HTML structure.
 * 26-Oct-2010  SK  [CR00224193] The situation where the dialog is opened from
 *                               non-page parent is now handled correctly.
   * 14-Oct-2010  MV  [CR00223441] Move functions to util namespace. Remove
 *    double invoking of a function.
 * 07-Oct-2010  MV  [CR00221605] Refactor for dialogs to work with the generic
 *    key handler that submits the page when Enter is pressed.
 * 17-Sep-2010  MV  [CR00220607] Removed a dead branch of code.
 * 27-Aug-2010  MV  [CR00217499] Refactored to remove hacks previously needed
 *                    to support the agenda player. Documentation comments
 *                    switched to jsdoc.
 * 21-Jul-2010  MV  [CR00211225] Indicate in the `onLoad` context that modal
 *                    is closing.
 * 24-Jun-2010  AF  [CR00202526] Removing reference to content-panel class name
 *                               in the calculateHeightByContents method.
 * 24-Jun-2010  MV  [CR00203864] Add debug output to autoheight calculation.
 * 09-Jun-2010  MV  [CR00202971] Remove the curam.iframeLoaded event,
 *                               add the height calculation function.
 * 04-Jun-2010  MV  [CR00202412] Simplify getting event identifier.
 * 23-Apr-2010  MV  [CR00194352] Fix screen context handling for HTML forms.
 * 11-Feb-2010  MV  [CR00188844] Add event identifier to the iframeLoaded event.
 * 11-Dec-2009  MV  [CR00173949] Remove the "SrPopUp" window name.
 * 24-Nov-2009  MV  [CR00175899] Only call the closeModal function if there
 *                                are no informational messages.
 * 20-Nov-2009  MV  [CR00175581] Replace curam.tab.refreshCurrentTab() call
   *                               with the correct util.redirectWindow().
   * 20-Nov-2009  MV  [CR00175615] Use the util.firePageSubmittedEvent
 *                                function.
 * 03-Sep-2009  MLB [CR00164883] Updated to refresh the current tab for user
 *                  preferences.
 * 07-Aug-2009  MV  [CR00164029] Notify the tabbed UI refresh mechanism
                                on submit. Reverted the previous change as now
                                the refresh is working as expected.
 * 23-Jul-2009  MV  [CR00162771] Updated to not refresh parent window when
 *                  in Tabbed UI.
 */

/**
 * Creating Resource Bundle Object to access localized resources.
 */
dojo.requireLocalization("curam.application", "Debug");
var bundle = new curam.util.ResourceBundle("Debug");
  
/**
 * @namespace Functions related to the Curam dialog support for UIMs.
 */
curam.define.singleton("curam.dialog", {
  MODAL_PREV_FLAG: "o3modalprev",
  MODAL_PREV_FLAG_INPUT: "curam_dialog_prev_marker",
  FORCE_CLOSE: false,
  ERROR_MESSAGES_HEADER: "error-messages-header",

  /**
   * Keeps track of the hierarchy of window objects for the open dialogs.
   * @private
   */
  _hierarchy: [],

  /**
   * ID of the dialog for the current context.
   * @private
   */
  _id: null,

  /**
   * @private
   */
  _displayedHandlerUnsToken: null,

  /**
   * True if the dialog has been displayed, false otherwise.
   * @private
   */
  _displayed: false,

  /**
   * Holds the current size of the dialog or null if it was not yet published.
   * @private
   */
  _size: null,

  /**
   * Indicates if the dialog should close without the parent redirection. 
   * @private
   */
  _justClose: false,

  validTargets: {
    "_top":true,"_self":true
  },

  initModal: function(pageId, messagesExist) {
    curam.dialog.pageId = pageId;
    curam.dialog.messagesExist = messagesExist;

      var topWin = util.getTopmostWindow();
    // receive the ID of the dialog
    var isIdSet = false;
    var unsToken = topWin.dojo.subscribe(
        "/curam/dialog/SetId", this, function(dialogId) {
            trace.log("curam.dialog: " 
              + bundle.getProperty("curam.dialog.id"), dialogId);
          curam.dialog._id = dialogId;
          isIdSet = true;

          topWin.dojo.unsubscribe(unsToken);
        });

    // trigger the dialog infrastructure init
    // also sets the dialog ID - see above
    topWin.dojo.publish("/curam/dialog/init");
    if (!isIdSet) {
      // unsubscribe, the modal infrastructure already initialized
      // or nobody listening for this particular event
        trace.log("curam.dialog: " + bundle.getProperty("curam.dialog.no.id"));
      topWin.dojo.unsubscribe(unsToken);
    }

    if(curam.dialog.closeDialog(false)) {
      // Do not do any more modal processing. Either the body is hidden off to
      // the left of the screen and messages are being displayed, or the window
      // has been closed.
      return;
    }

    // let us know when we are displayed
    curam.dialog._displayedHandlerUnsToken =
          util.getTopmostWindow().dojo.subscribe(
        "/curam/dialog/displayed", null, function(dialogID, size) {
          if (dialogID == curam.dialog._id) {
            curam.dialog._displayed = true;
            curam.dialog._size = size;

              util.getTopmostWindow().dojo.unsubscribe(
                curam.dialog._displayedHandlerUnsToken);
            curam.dialog._displayedHandlerUnsToken = null;
          }
        });
    // a hack to unsubscribe for agenda pages
    if (jsScreenContext.hasContextBits("AGENDA")
        || jsScreenContext.hasContextBits("TREE")) {

      dojo.addOnUnload(function() {
          util.getTopmostWindow().dojo.unsubscribe(
            curam.dialog._displayedHandlerUnsToken);
        curam.dialog._displayedHandlerUnsToken = null;
      });
    }

    //Wait for the page to load, then add onClick and onKey listeners to the
    //body element
    dojo.addOnLoad(function() {
      // Handle clicks in the dialog window
        util.connect(dojo.body(), "onclick", curam.dialog.modalEventHandler);

      // setup the forms in the page
      for (var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];
        curam.dialog.addFormInput(form, 'hidden', 'o3frame', 'modal');

        var ctxField = dojo.byId('o3ctx');
        var sc = new curam.util.ScreenContext(jsScreenContext.getValue());
        sc.addContextBits("ACTION|ERROR");
        ctxField.value = sc.getValue();

          util.connect(form, "onsubmit", curam.dialog.formSubmitHandler);
      }

      // mark as modal window - for later detection
        // by util.isModalWindow()
      window.curamModal = true;
    });

    dojo.addOnUnload(function() {
        util.getTopmostWindow().dojo.publish(
          "/curam/dialog/iframeUnloaded", [ curam.dialog._id, window ]);
    });

    if (isIdSet) {
      dojo.publish("/curam/dialog/ready");
    }
  },

  closeDialog: function(force) {
    if(force) {
      curam.dialog.forceClose();
    }
    var closeFunction = curam.dialog.checkClose(curam.dialog.pageId);
    if(closeFunction) {
        util.onLoad.addPublisher(function(context) {
        context.modalClosing = true;
      });

      //If the dialog window should close, but informational messages exist,
      //delay the closing of the window. Add a class to the messages to make
      //them visible, and place a button under them to close the window.action
      //If no messages exist, then just close the window, and optionally
      //redirect the parent page.
      if(curam.dialog.messagesExist) {
        dojo.addOnLoad(function(){
            var errMsgContainer = dojo.byId(util.ERROR_MESSAGES_CONTAINER);
            var errMsgNode = dojo.byId(util.ERROR_MESSAGES_LIST);
          var errMsgHeaderNode = dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);

          if(errMsgNode && errMsgHeaderNode) {
            //Save the messages locally, to be loaded by the next page that loads
            //which should be the parent page. The closeFunction is called
            //once the messages have been saved.
              util.saveInformationalMsgs(closeFunction);

            //Disable loading of informational messages in the popup,
            //so it doesn't run. This prevents a race condition which would wipe
            //out the messages before the parent page loads.
              util.disableInformationalLoad();

          } else {
            closeFunction();
          }
        });

      } else {
        //If no error messages exist, just run the close function.
        closeFunction();
      }
      //Return true, stating that the dialog is closing.
      return true;
    }
    //Return false, that the dialog is not closing.
    return false;
  },

  addFormInput: function(form, type, name, value) {
    return dojo.create("input", {
      "type": type,
      "name": name,
      "value": value
    }, form);
  },

  /**
   * Checks if the window should be closed. If the window should close, this
   * function returns another function which, when executed, closes the dialog,
   * and optionally redirects the parent page. If the window should not close,
   * it returns false.
   */
  checkClose: function(pageId) {
    if (curam.dialog._justClose) {
      return function() {
        curam.dialog.closeModalDialog();
      };
    }
	
    var parentWindow = curam.dialog.getParentWindow(window);
    if (!parentWindow) {
      return false;
    }

    //Check if the page is in a modal dialog, and if it is, whether or not
    //it should be closed.
    var href = window.location.href;
    var prevFlag = curam.dialog.MODAL_PREV_FLAG;

      var oldPageId = util.getUrlParamValue(href, prevFlag);
    var doClose = true;
    if (oldPageId) {
      if (parentWindow) {
        // If the URL parameter MODAL_PREV_FLAG is set, and is not the same
        // as the current page id, then shut down the dialog and redirect
        // the parent page the current URL. Remove the MODAL_PREV_FLAG
        if(oldPageId == pageId) {
          doClose=false;
        }
      }
    
    } else {
      doClose = false;
    }

      var scReq = util.getUrlParamValue(href, "o3ctx");
    if (scReq) {
      var sc = new curam.util.ScreenContext();
      sc.setContext(scReq);
      if (sc.hasContextBits('TREE|ACTION')) {
        doClose=false;
      }
    }

    if (doClose || curam.dialog.FORCE_CLOSE) {
      if (!curam.dialog.FORCE_CLOSE) {
        if (oldPageId=="user-prefs-editor") {
          return function() {
            if (parentWindow && parentWindow.location
                               !== util.getTopmostWindow().location) {
              curam.dialog.doRedirect(parentWindow);
            }
            curam.dialog.closeModalDialog();
          };
        }
        return function() {
            var rp = util.removeUrlParam;
          // Remove the modal and prevent cache flags from the url
          // before telling the parent to change it's location.
            href = rp(rp(rp(href, prevFlag), "o3frame"),util.PREVENT_CACHE_FLAG);
            href = util.adjustTargetContext(parentWindow, href);
          if (parentWindow && parentWindow.location
                                 !== util.getTopmostWindow().location) {
            curam.dialog.doRedirect(parentWindow, href, true);

          } else {
            curam.tab.getTabController().handleLinkClick(href);
          }
          curam.dialog.closeModalDialog();
        };

      } else {
        return function() {
          // In case there are some informational messages on the modal dialog,
          // make sure they are loaded in to the parent page, even if it
          // isn't refreshed.
            if (parentWindow !== util.getTopmostWindow()) {
            parentWindow.curam.util.loadInformationalMsgs();
          } //otherwise nowhere to show them
          
          curam.dialog.closeModalDialog();
        };
      }
    }
    return false;
  },

  /**
   * Returns the parent window of either the current window or of the specified
   * window.
   *
   * @param {window} [child] If specified, the dialog hierarchy will be used
   *      to look up the parent window.
   */
  getParentWindow: function(/*optional*/child) {
    if (!child) {
        trace.log("curam.dialog.getParentWindow(): " 
          + bundle.getProperty("curam.dialog.no.child"), window);
        trace.log("returning as parent = ", window.parent.location.href);
      return window.parent;
    }
      trace.log("curam.dialog.getParentWindow(): " 
        + bundle.getProperty("curam.dialog.child"), child.location.href);
    var hierarchy = curam.dialog._getDialogHierarchy();
    for (var i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i] == child) {
        // the child found in the stack, parent is at the previous index
        var realParent = (i > 0) ? hierarchy[i - 1] : hierarchy[0];
          trace.log("curam.dialog.getParentWindow(): " 
            + bundle.getProperty("curam.dialog.parent.window"), realParent);
        return realParent;
      }
    }
    // the child NOT found in the stack
      trace.log("curam.dialog.getParentWindow(): " 
        + bundle.getProperty("curam.dialog.child.not.found"), 
        child.location.href);
      trace.log("curam.dialog.getParentWindow(): " 
        + bundle.getProperty("curam.dialog.hierarchy"), hierarchy);
    var ret = hierarchy.length > 0 ? hierarchy[hierarchy.length - 1] : undefined;
      trace.log("curam.dialog.getParentWindow(): " 
        + bundle.getProperty("curam.dialog.returning.parent"), 
          ret ? ret.location.href : "undefined");
    return ret;
  },

  /**
   * Dialog hierarchy is a way for the code to keep track of parent/opener
   * windows for the open modal dialogs. The window.parent property
   * cannot be used for this purpose, because for dojo dialogs it is always
   * pointing at the same parent window, so it does not reflect the real
   * dialog hierarchy.
   *
   * The hierarchy is implemented as a simple stack of consecutive window
   * objects.
   *
   * @returns Array The hierarchy of window objects.
   * @private
   */
  _getDialogHierarchy: function() {
    // the hierarchy is stored in the topmost window - the truly global context
      var topmostWindow = util.getTopmostWindow();
      topmostWindow.require(["curam/dialog"]);
    return topmostWindow.curam.dialog._hierarchy;
  },

  /**
   * Pushes the specified window onto the dialog hierarchy stack,
   * unless the window is already part of the stack.
   */
  pushOntoDialogHierarchy: function(newParent) {
    var hierarchy = curam.dialog._getDialogHierarchy();
    if (dojo.indexOf(hierarchy, newParent) < 0) {
      hierarchy.push(newParent);
        trace.log(bundle.getProperty("curam.dialog.add.hierarchy"), 
          newParent.location.href);
        trace.log(bundle.getProperty("curam.dialog.full.hierarchy"), hierarchy);
    }
  },

  /**
   * Removes the specified window from the dialog hierarchy stack.
   *
   * @param child The window object to remove from the dialog hierarchy.
   */
  removeFromDialogHierarchy: function(child) {
    var hierarchy = curam.dialog._getDialogHierarchy();
    if(!child || hierarchy[hierarchy.length - 1] == child) {
      hierarchy.pop();

    } else {
        trace.log("curam.dialog.removeFromDialogHierarchy(): " 
          + bundle.getProperty("curam.dialog.ignore.request"));
      try {
          trace.log(child.location.href);
      
      } catch(e) {
        // in scenarios where we open external site in a dialog, this call
        // causes Access denied exception - we just  catch it and continue
          trace.log(e.message);
      }
    }
  },

  stripPageOrActionFromUrl: function(url) {
    var idx = url.lastIndexOf("Page.do");
    var len = 7;
    if(idx < 0) {
      idx = url.lastIndexOf("Action.do");
      len = 9;
    }
    if(idx < 0) {
      idx = url.lastIndexOf("Frame.do");
      len = 8;
    }
    if(idx > -1 && idx == url.length - len){
      return url.substring(0, idx);
    }
    return url;
  },

  /**
   * @private
   * 
   * @param href
   * @param rtc
   * @param stripPageOrAction
   * @returns {Boolean}
   */
  _isSameBaseUrl: function(href, rtc, stripPageOrAction) {
    if(href && href.indexOf('#') == 0){return true;}
    var hrefSplit = href.split("?");
    var hereSplit = rtc.getHref().split("?");

    //If one url is relative, and the other is absolute, compensate by removing
    //everything except what's after the last "/"
    if(hrefSplit[0].indexOf("/") < 0) {
      var parts = hereSplit[0].split("/");
      hereSplit[0] = parts[parts.length -1];
    }
    if(hereSplit[0].indexOf("/") < 0) {
      var parts = hrefSplit[0].split("/");
      hrefSplit[0] = parts[parts.length -1];
    }

    if (stripPageOrAction && stripPageOrAction == true) {
      hrefSplit[0] = curam.dialog.stripPageOrActionFromUrl(hrefSplit[0]);
      hereSplit[0] = curam.dialog.stripPageOrActionFromUrl(hereSplit[0]);
    }

    if(hrefSplit[0] == hereSplit[0]){
      return true;
    }

    return false;
  },

  modalEventHandler: function(event) {
    curam.dialog._doHandleModalEvent(event,
        new curam.util.RuntimeContext(window),
        curam.dialog.closeModalDialog,
        curam.dialog.doRedirect);
  },
  
  /**
   * Hanldes the specified event.
   * 
   * @param e The event to handle.
   * @param rtc Runtime context.
   * @param closeDialog The function to be called to close the dialog.
   * @param doRedirect The function to be called to redirect the parent window
   *    to a new location.
   * @returns {Boolean} True if the event should continue, false if it should
   *    be stopped.
   */
  _doHandleModalEvent: function(e, rtc, closeDialog, doRedirect) {
    var target = e.target;
      var u = util;

    switch(target.tagName) {
      case 'INPUT':
        // If the user clicks a submit control, copy its "keepModal" attribute
        // on to the form it is in so that can be read by the onSubmit handler
        if(dojo.attr(target, "type") == "submit"
            && typeof target.form != "undefined") {

          target.form.setAttribute("keepModal", target.getAttribute("keepModal"));
        }
        return true;

      case 'IMG': case 'SPAN': case 'DIV':
        target = cm.getParentByType(target, 'A');
        if (target == null) {
          return;
        }
        //If the IMG, SPAN or DIV node has an anchor tag parent, leave it run
        //into the 'A' case after changing the target to the parent anchor tag.
      case 'A':
      //If the target is an anchor tag, just get out of the switch statement
        //and keep going in the function, unless the anchor tag is a
        //dynamically generated tag used to replace a submit button.
          //This replacement is done in util.replaceSubmitButton function.
        if(target._submitButton) {
          target._submitButton.form.setAttribute("keepModal",
                                target._submitButton.getAttribute("keepModal"));
          return;
        }
        break;
      default:
        //If we're not interested in this tag, ignore the event
        return true;
    }
    var stopEvent = dojo.stopEvent;

    var href = target.getAttribute("href");

    // handling the case of a cancel link where there is no o3rpu
    if (href == '') {
      closeDialog();
      return false;
    }

    if (href.indexOf("javascript") == 0) {
      return false;
    }
    var ctx = jsScreenContext;
    ctx.addContextBits('MODAL');

    // If the anchor tag does not have a href, we simply cancel the event.
    // Any onlick handlers attached directly to the anchor element will have
    // completed by the time this handler is called.
    if (!href) {
      return false;
    }

    //If the anchor tag is trying to open a new window, open it separately,
    //and do not change this page, or redirect the parent
    var targetWindow = target.getAttribute("target");
    if(targetWindow && !curam.dialog.validTargets[targetWindow]) {
      return true;
    }
    //Make sure that file download links do not close the modal dialog.
    //Instead, create an iframe on the fly, and set it's source to the file
    //that is to be downloaded.
    if(href && href.indexOf("/servlet/FileDownload?") > -1) {
      var iframe = dojo.create("iframe", {
        src: href
      }, dojo.body());
      iframe.style.display = 'none';
      stopEvent(e);
      return false;
    }

    //If the link is to a URL outside the Curam application, open the link in
    //a new window.
    if(dojo.hasClass(target, "external-link")) {
      return true;
    }

    // If the link is not going to result in the page changing,
    // then do nothing
      if(util.isSameUrl(href, null, rtc)) {
      // If the link is not simply linking in this page, then redirect the page.
      // otherwise just let the page jump to the local anchor tag.
      if(href.indexOf("#") < 0) {
         href = u.replaceUrlParam(href, "o3frame", "modal");
         href = u.replaceUrlParam(href, "o3ctx", ctx.getValue());
         doRedirect(window, href);
         return false;
      }
      return true;
    }
    if(href && curam.dialog._isSameBaseUrl(href, rtc, true)
        && !target.getAttribute("keepModal")){

      target.setAttribute("keepModal", "true");
    }

    var parentWindow = curam.dialog.getParentWindow(rtc.contextObject());
    
    if(target && target.getAttribute) {
      stopEvent(e);

      //If the link has the 'keepModal' attribute set to true, then
      // the new page should be opened in the same modal dialog.
      if(target.getAttribute("keepModal") == "true") {
        href = u.replaceUrlParam(href, "o3frame", "modal");
        href = u.replaceUrlParam(href, "o3ctx", ctx.getValue());
        doRedirect(window, href);

      // Otherwise the dialog will close and target will be opened in the parent
      // page
      } else if(parentWindow) {
        href = u.removeUrlParam(href, "o3frame");
        href = u.removeUrlParam(href, curam.dialog.MODAL_PREV_FLAG);
        
        if (parentWindow.location !== util.getTopmostWindow().location) {
          var parentRtc = new curam.util.RuntimeContext(parentWindow);
          var phref = parentRtc.getHref(); 
          phref = u.removeUrlParam(phref, "o3frame");
          
          // only redirect if the parent window is not already on the target
          // page 

          // for submitted action pages in the parent window only comapare
          // the base URL, ignoring any page parameters, because they are not
          // included in the Action.do type URL anyway
          if (util.isActionPage(phref)) {
            if (!curam.dialog._isSameBaseUrl(href, parentRtc, true)) {
              href = u.adjustTargetContext(parentWindow, href);
              doRedirect(parentWindow, href);
            }
            
          // for all other pages compare full URLS and only redirect if
          // the same page is not already loaded
          } else {
            if (!util.isSameUrl(href, phref)) {
              href = u.adjustTargetContext(parentWindow, href);
              curam.dialog.doRedirect(parentWindow, href);
            }
          }
        
        } else {
          //no tab opened
          var tabContext = new curam.util.ScreenContext('TAB');
          href = u.replaceUrlParam(href, "o3ctx", tabContext.getValue());
          curam.tab.getTabController().handleLinkClick(href);
        }

        closeDialog();
      }

      return false;
    }

    if (parentWindow && typeof(target) == "undefined" || target == null
      || target == "_self" || target == "") {
      stopEvent(e);
      href = href.replace(/[&?]o3frame=modal/g, "")
        .replace("%3Fo3frame%3Dmodal", "")
        .replace("?o3frame%3Dmodal", "");
      //modal closes, so the context should be replaced by the previous.
        href = util.updateCtx(href);
        if (parentWindow.location !== util.getTopmostWindow().location) {
        doRedirect(parentWindow, href);
      
      } else {
        //no tab opened
        var tabContext = new curam.util.ScreenContext('TAB');
        href = u.replaceUrlParam(href, "o3ctx", tabContext.getValue());
        curam.tab.getTabController().handleLinkClick(href);
      }
      
      closeDialog();
      return false;
    }

    //In this case, the page wants to open a popup window
    return true;
  },

  /**
   * This listener handles the onSubmit event of all forms on the page.
   * It adds the current page ID to the URL as the 'oldPageId' parameter
   * and if the window should be closed, it adds the 'MODAL_PREV_FLAG=true'
   * parameter to the URL.
   */
  formSubmitHandler: function(e) {
    var parentWindow = curam.dialog.getParentWindow(window);
    if(typeof parentWindow == "undefined") {
      return true;
    }

    e.target.method="post";
    e.target.setAttribute("target", window.name);
    var action = e.target.action;

    var prevFlag = curam.dialog.MODAL_PREV_FLAG;
    var flagInputId = curam.dialog.MODAL_PREV_FLAG_INPUT;
      var u = util;

    // If the input has previously been written to the form, delete it.
    // This is to handle multiple submissions, which can happen if an exception
    // is thrown during submission.
    var input = dojo.byId(flagInputId);
    if(input) {
      input.parentNode.removeChild(input);
    }

    // Set the page id in the url if the following page should close the modal
    // dialog if the id has changed. Add a hidden input to the form too, which
    // will be used if the form is a multi-part post containing a file.
    if(e.target.getAttribute("keepModal") != "true"
         && !jsScreenContext.hasContextBits('AGENDA')) {
      var multipart = 'multipart/form-data';
      if(e.target.enctype == multipart || e.target.encoding==multipart) {
        e.target.action = u.removeUrlParam(action, prevFlag);
        input = curam.dialog.addFormInput(e.target, "hidden", prevFlag,
                                          curam.dialog.pageId);
        input.setAttribute("id", flagInputId);
        input.id = flagInputId;

      } else {
        e.target.action = u.replaceUrlParam(action, prevFlag, curam.dialog.pageId);
      }

    } else {
      e.target.action = u.removeUrlParam(action, prevFlag);
    }

    //Tell the parent page that the modal it opened has submitted a form, so
    //that if the user clicks a 'Cancel' link later, the parent page will
    //refresh itself.
    parentWindow.curam.util.invalidatePage();

    // Hook into the overall tabbed UI refresh mechanism (except for external
    // application).
    if (!jsScreenContext.hasContextBits("EXTAPP")) {
      util.firePageSubmittedEvent("dialog");
    }
    return true;
  },

  /**
   * If this is called in the document head, then initModal will shut down
   * no matter what the conditions. This is like a window.close call,
   * except it will refresh the parent if necessary.
   */
  forceClose: function() {
    curam.dialog.FORCE_CLOSE = true;
  },

  /**
   * If this is called in the document head, then any call to
     * util.redirectWindow in the parent window will only refresh it,
   * instead of redirecting it to another URL.  This is primarily used
   * in the user preferences dialog.
   */
  forceParentRefresh: function() {
    var parentWindow = curam.dialog.getParentWindow(window);
    if(!parentWindow){return;}
    parentWindow.curam.util.FORCE_REFRESH = true;
  },

  closeModalDialog: function() {
    var topmostWindow = util.getTopmostWindow();
    if (curam.dialog._displayedHandlerUnsToken != null) {
      topmostWindow.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
      curam.dialog._displayedHandlerUnsToken = null;
    }

    if (typeof(curam.dialog._id) == "undefined" || curam.dialog._id == null) {
      var frameID = window.frameElement.id;
      var modalID = frameID.substring(7);  // remove "iframe-" prefix
      curam.dialog._id=modalID;
      trace.log("curam.dialog.closeModalDialog() " 
          + bundle.getProperty("curam.dialog.modal.id") + modalID);
    }
  
    trace.log("publishing /curam/dialog/close for ", curam.dialog._id);
    util.getTopmostWindow().dojo.publish(
        "/curam/dialog/close", [ curam.dialog._id ]);
    trace.log("publishing /curam/dialog/close for ", curam.dialog._id);
  },

  /**
   * Parses the window options string.
   *
   * @returns An object with window option properties. In case no windowOptions
   *          were passed if, empty object (with no properties) is returned.
   */
  parseWindowOptions: function(windowOptions) {
    var opts = {};

    if(windowOptions) {
        trace.log("curam.dialog.parseWindowOptions " 
          + bundle.getProperty("curam.dialog.parsing"), windowOptions);
      var tokens = windowOptions.split(',');
      var splitToken;
      for(var i = 0; i < tokens.length; i++) {
        splitToken = tokens[i].split('=');
        opts[splitToken[0]] = splitToken[1];
      }
        trace.log("done:", dojo.toJson(opts));

    } else {
        trace.log("curam.dialog.parseWindowOptions " 
          + bundle.getProperty("curam.dialog.no.options"));
    }

    return opts;
  },

  /**
   * Redirects to a new URL in the specified context.
   * 
   * @param context The runtime context in which the redirect will take place.
   * @param [href] URL of the target page or null.
   * @param [force] Indicates if the refresh should take place even
   *    if the href is the same as the current href.
   * @param [ignoreFrames] If true, then any other frames on the page are
   *    not refreshed.
   */
  doRedirect: function(context, href, force, ignoreFrames) {
    window.curamDialogRedirecting = true;

    context.curam.util.redirectWindow(href, force, ignoreFrames);
  },
  
  closeGracefully: function() {
    curam.dialog._justClose = true;
  }
  });
  
  return curam.dialog;
});

},
'idx/oneui/_CssStateMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/_CssStateMixin", ["dojo", "dijit/dijit", "dijit/_WidgetBase"], function(dojo, dijit, widgetBase){

return dojo.declare("idx.oneui._CssStateMixin", [], {
	
	cssStateNodes: {},
	hovering: false,
	active: false,

	// stateNode
	//		The original dijit domNode (inner field widget)
	
	// oneuiBaseClass
	//		The original dijit baseClass (inner field widget)

	_applyAttributes: function(){
		widgetBase.prototype._applyAttributes.apply(this, arguments);
		dojo.forEach(["onmouseenter", "onmouseleave", "onmousedown"], function(e){
			this.connect(this.stateNode, e, "_cssMouseEvent");
		}, this);

		// Monitoring changes to disabled, readonly, etc. state, and update CSS class of root node
		dojo.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active", "required"], function(attr){
			this.watch(attr, dojo.hitch(this, "_setStateClass"));
		}, this);

		// Events on sub nodes within the widget
		for(var ap in this.cssStateNodes){
			this._trackMouseState(this[ap], this.cssStateNodes[ap]);
		}
		// Set state initially; there's probably no hover/active/focus state but widget might be
		// disabled/readonly/checked/selected so we want to set CSS classes for those conditions.
		this._setStateClass();
	},

	_cssMouseEvent: function(/*Event*/ event){
		// summary:
		//	Sets hovering and active properties depending on mouse state,
		//	which triggers _setStateClass() to set appropriate CSS classes for this.domNode.

		if(!this.disabled){
			switch(event.type){
				case "mouseenter":
				case "mouseover":	// generated on non-IE browsers even though we connected to mouseenter
					this._set("hovering", true);
					this._set("active", this._mouseDown);
					break;

				case "mouseleave":
				case "mouseout":	// generated on non-IE browsers even though we connected to mouseleave
					this._set("hovering", false);
					this._set("active", false);
					break;

				case "mousedown" :
					this._set("active", true);
					this._mouseDown = true;
					// Set a global event to handle mouseup, so it fires properly
					// even if the cursor leaves this.domNode before the mouse up event.
					// Alternately could set active=false on mouseout.
					var mouseUpConnector = this.connect(dojo.body(), "onmouseup", function(){
						this._mouseDown = false;
						this._set("active", false);
						this.disconnect(mouseUpConnector);
					});
					break;
			}
		}
	},
	
	_setStateClass: function(){
		// Compute new set of classes
		var newStateClasses = this._getModifiedClasses(this.oneuiBaseClass);
		this._applyStateClass(this.stateNode, newStateClasses);
		newStateClasses = this._getModifiedClasses(this.baseClass);
		this._applyStateClass(this.domNode, newStateClasses);
	},
	
	_getModifiedClasses: function(/*String*/className){
		var clazz = className.split(" ");
		function multiply(modifier){
			clazz = clazz.concat(dojo.map(clazz, function(c){ return c+modifier; }), "dijit"+modifier);
		}

		if(!this.isLeftToRight()){
			// For RTL mode we need to set an addition class like dijitTextBoxRtl.
			multiply("Rtl");
		}

		var checkedState = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
		if(this.checked){
			multiply(checkedState);
		}
		if(this.state){
			multiply(this.state);
		}
		if(this.selected){
			multiply("Selected");
		}
		if(this.required){
			multiply("Required");
		}
		if(this.disabled){
			multiply("Disabled");
		}else if(this.readOnly){
			multiply("ReadOnly");
		}else{
			if(this.active){
				multiply("Active");
			}else if(this.hovering){
				multiply("Hover");
			}
		}

		if(this.focused){
			multiply("Focused");
		}
		return clazz;
	},
	
	_applyStateClass: function(/*DomNode*/ node, /*Array*/classes){
		// Compute new set of classes
		// Remove old state classes and add new ones.
		// For performance concerns we only write into stateNode.className and domNode.className once.
		var classHash = {};	// set of all classes (state and otherwise) for node
		
		dojo.forEach(node.className.split(" "), function(c){ classHash[c] = true; });

		if("_stateClasses" in node){
			dojo.forEach(node._stateClasses, function(c){ delete classHash[c]; });
		}

		dojo.forEach(classes, function(c){ classHash[c] = true; });

		var newClasses = [];
		for(var c in classHash){
			newClasses.push(c);
		}
		node.className = newClasses.join(" ");
		node._stateClasses = classes;
	},
	
	_trackMouseState: function(/*DomNode*/ node, /*String*/ clazz){
		// summary:
		//		Track mouse/focus events on specified node and set CSS class on that node to indicate
		//		current state.   Usually not called directly, but via cssStateNodes attribute.
		// description:
		//		Given class=foo, will set the following CSS class on the node
		//			- fooActive: if the user is currently pressing down the mouse button while over the node
		//			- fooHover: if the user is hovering the mouse over the node, but not pressing down a button
		//			- fooFocus: if the node is focused
		//
		//		Note that it won't set any classes if the widget is disabled.
		// node: DomNode
		//		Should be a sub-node of the widget, not the top node (this.domNode), since the top node
		//		is handled specially and automatically just by mixing in this class.
		// clazz: String
		//		CSS class name (ex: dijitSliderUpArrow).

		// Current state of node (initially false)
		// NB: setting specifically to false because dojo.toggleClass() needs true boolean as third arg
		var hovering=false, active=false, focused=false;

		var self = this,
			cn = dojo.hitch(this, "connect", node);

		function setClass(){
			var disabled = ("disabled" in self && self.disabled) || ("readonly" in self && self.readonly);
			dojo.toggleClass(node, clazz+"Hover", hovering && !active && !disabled);
			dojo.toggleClass(node, clazz+"Active", active && !disabled);
			dojo.toggleClass(node, clazz+"Focused", focused && !disabled);
		}

		// Mouse
		cn("onmouseenter", function(){
			hovering = true;
			setClass();
		});
		cn("onmouseleave", function(){
			hovering = false;
			active = false;
			setClass();
		});
		cn("onmousedown", function(){
			active = true;
			setClass();
		});
		cn("onmouseup", function(){
			active = false;
			setClass();
		});

		// Focus
		cn("onfocus", function(){
			focused = true;
			setClass();
		});
		cn("onblur", function(){
			focused = false;
			setClass();
		});

		// Just in case widget is enabled/disabled while it has focus/hover/active state.
		// Maybe this is overkill.
		this.watch("disabled", setClass);
		this.watch("readOnly", setClass);
	}
});
});
},
'dijit/focus':function(){
define("dijit/focus", [
	"dojo/aspect",
	"dojo/_base/declare", // declare
	"dojo/dom", // domAttr.get dom.isDescendant
	"dojo/dom-attr", // domAttr.get dom.isDescendant
	"dojo/dom-construct", // connect to domConstruct.empty, domConstruct.destroy
	"dojo/Evented",
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/ready",
	"dojo/_base/sniff", // has("ie")
	"dojo/Stateful",
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.get
	"./a11y",	// a11y.isTabNavigable
	"./registry",	// registry.byId
	"."		// to set dijit.focus
], function(aspect, declare, dom, domAttr, domConstruct, Evented, lang, on, ready, has, Stateful, unload, win, winUtils,
			a11y, registry, dijit){

	// module:
	//		dijit/focus
	// summary:
	//		Returns a singleton that tracks the currently focused node, and which widgets are currently "active".

/*=====
	dijit.focus = {
		// summary:
		//		Tracks the currently focused node, and which widgets are currently "active".
		//		Access via require(["dijit/focus"], function(focus){ ... }).
		//
		//		A widget is considered active if it or a descendant widget has focus,
		//		or if a non-focusable node of this widget or a descendant was recently clicked.
		//
		//		Call focus.watch("curNode", callback) to track the current focused DOMNode,
		//		or focus.watch("activeStack", callback) to track the currently focused stack of widgets.
		//
		//		Call focus.on("widget-blur", func) or focus.on("widget-focus", ...) to monitor when
		//		when widgets become active/inactive
		//
		//		Finally, focus(node) will focus a node, suppressing errors if the node doesn't exist.

		// curNode: DomNode
		//		Currently focused item on screen
		curNode: null,

		// activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		activeStack: [],

		registerIframe: function(iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle with remove() method to deregister.
		},

		registerWin: function(targetWindow, effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow: Window?
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode: DOMNode?
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle with remove() method to deregister.
		}
	};
=====*/

	var FocusManager = declare([Stateful, Evented], {
		// curNode: DomNode
		//		Currently focused item on screen
		curNode: null,

		// activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		activeStack: [],

		constructor: function(){
			// Don't leave curNode/prevNode pointing to bogus elements
			var check = lang.hitch(this, function(node){
				if(dom.isDescendant(this.curNode, node)){
					this.set("curNode", null);
				}
				if(dom.isDescendant(this.prevNode, node)){
					this.set("prevNode", null);
				}
			});
			aspect.before(domConstruct, "empty", check);
			aspect.before(domConstruct, "destroy", check);
		},

		registerIframe: function(/*DomNode*/ iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle with remove() method to deregister.
			return this.registerWin(iframe.contentWindow, iframe);
		},

		registerWin: function(/*Window?*/targetWindow, /*DomNode?*/ effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow:
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode:
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle with remove() method to deregister.

			// TODO: make this function private in 2.0; Editor/users should call registerIframe(),

			var _this = this;
			var mousedownListener = function(evt){
				_this._justMouseDowned = true;
				setTimeout(function(){ _this._justMouseDowned = false; }, 0);

				// workaround weird IE bug where the click is on an orphaned node
				// (first time clicking a Select/DropDownButton inside a TooltipDialog)
				if(has("ie") && evt && evt.srcElement && evt.srcElement.parentNode == null){
					return;
				}

				_this._onTouchNode(effectiveNode || evt.target || evt.srcElement, "mouse");
			};

			// Listen for blur and focus events on targetWindow's document.
			// IIRC, I'm using attachEvent() rather than dojo.connect() because focus/blur events don't bubble
			// through dojo.connect(), and also maybe to catch the focus events early, before onfocus handlers
			// fire.
			// Connect to <html> (rather than document) on IE to avoid memory leaks, but document on other browsers because
			// (at least for FF) the focus event doesn't fire on <html> or <body>.
			var doc = has("ie") ? targetWindow.document.documentElement : targetWindow.document;
			if(doc){
				if(has("ie")){
					targetWindow.document.body.attachEvent('onmousedown', mousedownListener);
					var activateListener = function(evt){
						// IE reports that nodes like <body> have gotten focus, even though they have tabIndex=-1,
						// ignore those events
						var tag = evt.srcElement.tagName.toLowerCase();
						if(tag == "#document" || tag == "body"){ return; }

						// Previous code called _onTouchNode() for any activate event on a non-focusable node.   Can
						// probably just ignore such an event as it will be handled by onmousedown handler above, but
						// leaving the code for now.
						if(a11y.isTabNavigable(evt.srcElement)){
							_this._onFocusNode(effectiveNode || evt.srcElement);
						}else{
							_this._onTouchNode(effectiveNode || evt.srcElement);
						}
					};
					doc.attachEvent('onactivate', activateListener);
					var deactivateListener =  function(evt){
						_this._onBlurNode(effectiveNode || evt.srcElement);
					};
					doc.attachEvent('ondeactivate', deactivateListener);

					return {
						remove: function(){
							targetWindow.document.detachEvent('onmousedown', mousedownListener);
							doc.detachEvent('onactivate', activateListener);
							doc.detachEvent('ondeactivate', deactivateListener);
							doc = null;	// prevent memory leak (apparent circular reference via closure)
						}
					};
				}else{
					doc.body.addEventListener('mousedown', mousedownListener, true);
					doc.body.addEventListener('touchstart', mousedownListener, true);
					var focusListener = function(evt){
						_this._onFocusNode(effectiveNode || evt.target);
					};
					doc.addEventListener('focus', focusListener, true);
					var blurListener = function(evt){
						_this._onBlurNode(effectiveNode || evt.target);
					};
					doc.addEventListener('blur', blurListener, true);

					return {
						remove: function(){
							doc.body.removeEventListener('mousedown', mousedownListener, true);
							doc.body.removeEventListener('touchstart', mousedownListener, true);
							doc.removeEventListener('focus', focusListener, true);
							doc.removeEventListener('blur', blurListener, true);
							doc = null;	// prevent memory leak (apparent circular reference via closure)
						}
					};
				}
			}
		},

		_onBlurNode: function(/*DomNode*/ /*===== node =====*/){
			// summary:
			// 		Called when focus leaves a node.
			//		Usually ignored, _unless_ it *isn't* followed by touching another node,
			//		which indicates that we tabbed off the last field on the page,
			//		in which case every widget is marked inactive
			this.set("prevNode", this.curNode);
			this.set("curNode", null);

			if(this._justMouseDowned){
				// the mouse down caused a new widget to be marked as active; this blur event
				// is coming late, so ignore it.
				return;
			}

			// if the blur event isn't followed by a focus event then mark all widgets as inactive.
			if(this._clearActiveWidgetsTimer){
				clearTimeout(this._clearActiveWidgetsTimer);
			}
			this._clearActiveWidgetsTimer = setTimeout(lang.hitch(this, function(){
				delete this._clearActiveWidgetsTimer;
				this._setStack([]);
				this.prevNode = null;
			}), 100);
		},

		_onTouchNode: function(/*DomNode*/ node, /*String*/ by){
			// summary:
			//		Callback when node is focused or mouse-downed
			// node:
			//		The node that was touched.
			// by:
			//		"mouse" if the focus/touch was caused by a mouse down event

			// ignore the recent blurNode event
			if(this._clearActiveWidgetsTimer){
				clearTimeout(this._clearActiveWidgetsTimer);
				delete this._clearActiveWidgetsTimer;
			}

			// compute stack of active widgets (ex: ComboButton --> Menu --> MenuItem)
			var newStack=[];
			try{
				while(node){
					var popupParent = domAttr.get(node, "dijitPopupParent");
					if(popupParent){
						node=registry.byId(popupParent).domNode;
					}else if(node.tagName && node.tagName.toLowerCase() == "body"){
						// is this the root of the document or just the root of an iframe?
						if(node === win.body()){
							// node is the root of the main document
							break;
						}
						// otherwise, find the iframe this node refers to (can't access it via parentNode,
						// need to do this trick instead). window.frameElement is supported in IE/FF/Webkit
						node=winUtils.get(node.ownerDocument).frameElement;
					}else{
						// if this node is the root node of a widget, then add widget id to stack,
						// except ignore clicks on disabled widgets (actually focusing a disabled widget still works,
						// to support MenuItem)
						var id = node.getAttribute && node.getAttribute("widgetId"),
							widget = id && registry.byId(id);
						if(widget && !(by == "mouse" && widget.get("disabled"))){
							newStack.unshift(id);
						}
						node=node.parentNode;
					}
				}
			}catch(e){ /* squelch */ }

			this._setStack(newStack, by);
		},

		_onFocusNode: function(/*DomNode*/ node){
			// summary:
			//		Callback when node is focused

			if(!node){
				return;
			}

			if(node.nodeType == 9){
				// Ignore focus events on the document itself.  This is here so that
				// (for example) clicking the up/down arrows of a spinner
				// (which don't get focus) won't cause that widget to blur. (FF issue)
				return;
			}

			this._onTouchNode(node);

			if(node == this.curNode){ return; }
			this.set("curNode", node);
		},

		_setStack: function(/*String[]*/ newStack, /*String*/ by){
			// summary:
			//		The stack of active widgets has changed.  Send out appropriate events and records new stack.
			// newStack:
			//		array of widget id's, starting from the top (outermost) widget
			// by:
			//		"mouse" if the focus/touch was caused by a mouse down event

			var oldStack = this.activeStack;
			this.set("activeStack", newStack);

			// compare old stack to new stack to see how many elements they have in common
			for(var nCommon=0; nCommon<Math.min(oldStack.length, newStack.length); nCommon++){
				if(oldStack[nCommon] != newStack[nCommon]){
					break;
				}
			}

			var widget;
			// for all elements that have gone out of focus, set focused=false
			for(var i=oldStack.length-1; i>=nCommon; i--){
				widget = registry.byId(oldStack[i]);
				if(widget){
					widget._hasBeenBlurred = true;		// TODO: used by form widgets, should be moved there
					widget.set("focused", false);
					if(widget._focusManager == this){
						widget._onBlur(by);
					}
					this.emit("widget-blur", widget, by);
				}
			}

			// for all element that have come into focus, set focused=true
			for(i=nCommon; i<newStack.length; i++){
				widget = registry.byId(newStack[i]);
				if(widget){
					widget.set("focused", true);
					if(widget._focusManager == this){
						widget._onFocus(by);
					}
					this.emit("widget-focus", widget, by);
				}
			}
		},

		focus: function(node){
			// summary:
			//		Focus the specified node, suppressing errors if they occur
			if(node){
				try{ node.focus(); }catch(e){/*quiet*/}
			}
		}
	});

	var singleton = new FocusManager();

	// register top window and all the iframes it contains
	ready(function(){
		var handle = singleton.registerWin(win.doc.parentWindow || win.doc.defaultView);
		if(has("ie")){
			unload.addOnWindowUnload(function(){
				handle.remove();
				handle = null;
			})
		}
	});

	// Setup dijit.focus as a pointer to the singleton but also (for backwards compatibility)
	// as a function to set focus.
	dijit.focus = function(node){
		singleton.focus(node);	// indirection here allows dijit/_base/focus.js to override behavior
	};
	for(var attr in singleton){
		if(!/^_/.test(attr)){
			dijit.focus[attr] = typeof singleton[attr] == "function" ? lang.hitch(singleton, attr) : singleton[attr];
		}
	}
	singleton.watch(function(attr, oldVal, newVal){
		dijit.focus[attr] = newVal;
	});

	return singleton;
});

},
'dojo/i18n':function(){
define("dojo/i18n", ["./_base/kernel", "require", "./has", "./_base/array", "./_base/config", "./_base/lang", "./_base/xhr", "./json"],
	function(dojo, require, has, array, config, lang, xhr, json) {
	// module:
	//		dojo/i18n
	// summary:
	//		This module implements the !dojo/i18n plugin and the v1.6- i18n API
	// description:
	//		We choose to include our own plugin to leverage functionality already contained in dojo
	//		and thereby reduce the size of the plugin compared to various loader implementations. Also, this
	//		allows foreign AMD loaders to be used without their plugins.


	true || has.add("dojo-preload-i18n-Api",
		// if true, define the preload localizations machinery
		1
	);

	true || has.add("dojo-v1x-i18n-Api",
		// if true, define the v1.x i18n functions
		1
	);

	var
		thisModule= dojo.i18n=
			// the dojo.i18n module
			{},

		nlsRe=
			// regexp for reconstructing the master bundle name from parts of the regexp match
			// nlsRe.exec("foo/bar/baz/nls/en-ca/foo") gives:
			// ["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
			// nlsRe.exec("foo/bar/baz/nls/foo") gives:
			// ["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
			// so, if match[5] is blank, it means this is the top bundle definition.
			// courtesy of http://requirejs.org
			/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,

		getAvailableLocales= function(
			root,
			locale,
			bundlePath,
			bundleName
		){
			// return a vector of module ids containing all available locales with respect to the target locale
			// For example, assuming:
			//	 * the root bundle indicates specific bundles for "fr" and "fr-ca",
			//	 * bundlePath is "myPackage/nls"
			//	 * bundleName is "myBundle"
			// Then a locale argument of "fr-ca" would return
			//	 ["myPackage/nls/myBundle", "myPackage/nls/fr/myBundle", "myPackage/nls/fr-ca/myBundle"]
			// Notice that bundles are returned least-specific to most-specific, starting with the root.
			//
			// If root===false indicates we're working with a pre-AMD i18n bundle that doesn't tell about the available locales;
			// therefore, assume everything is available and get 404 errors that indicate a particular localization is not available
			//

			for(var result= [bundlePath + bundleName], localeParts= locale.split("-"), current= "", i= 0; i<localeParts.length; i++){
				current+= (current ? "-" : "") + localeParts[i];
				if(!root || root[current]){
					result.push(bundlePath + current + "/" + bundleName);
				}
			}
			return result;
		},

		cache= {},

		getL10nName= dojo.getL10nName = function(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = "dojo/i18n!" + moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		},

		doLoad = function(require, bundlePathAndName, bundlePath, bundleName, locale, load){
			// get the root bundle which instructs which other bundles are required to construct the localized bundle
			require([bundlePathAndName], function(root){
				var current= lang.clone(root.root),
					availableLocales= getAvailableLocales(!root._v1x && root, locale, bundlePath, bundleName);
				require(availableLocales, function(){
					for (var i= 1; i<availableLocales.length; i++){
						current= lang.mixin(lang.clone(current), arguments[i]);
					}
					// target may not have been resolve (e.g., maybe only "fr" exists when "fr-ca" was requested)
					var target= bundlePathAndName + "/" + locale;
					cache[target]= current;
					load();
				});
			});
		},

		normalize = function(id, toAbsMid){
			// id may be relative
			// preload has form *preload*<path>/nls/<module>*<flattened locales> and
			// therefore never looks like a relative
			return /^\./.test(id) ? toAbsMid(id) : id;
		},

		getLocalesToLoad = function(targetLocale){
			var list = config.extraLocale || [];
			list = lang.isArray(list) ? list : [list];
			list.push(targetLocale);
			return list;
		},

		load = function(id, require, load){
			//
			// id is in one of the following formats
			//
			//	1. <path>/nls/<bundle>
			//		=> load the bundle, localized to config.locale; load all bundles localized to
			//      config.extraLocale (if any); return the loaded bundle localized to config.locale.
			//
			//  2. <path>/nls/<locale>/<bundle>
			//		=> load then return the bundle localized to <locale>
			//
			//  3. *preload*<path>/nls/<module>*<JSON array of available locales>
			//		=> for config.locale and all config.extraLocale, load all bundles found
			//		   in the best-matching bundle rollup. A value of 1 is returned, which
			//         is meaningless other than to say the plugin is executing the requested
			//         preloads
			//
			// In cases 1 and 2, <path> is always normalized to an absolute module id upon entry; see
			// normalize. In case 3, it <path> is assumed to be absolue; this is arranged by the builder.
			//
			// To load a bundle means to insert the bundle into the plugin's cache and publish the bundle
			// value to the loader. Given <path>, <bundle>, and a particular <locale>, the cache key
			//
			//   <path>/nls/<bundle>/<locale>
			//
			// will hold the value. Similarly, then plugin will publish this value to the loader by
			//
			//   define("<path>/nls/<bundle>/<locale>", <bundle-value>);
			//
			// Given this algorithm, other machinery can provide fast load paths be preplacing
			// values in the plugin's cache, which is public. When a load is demanded the
			// cache is inspected before starting any loading. Explicitly placing values in the plugin
			// cache is an advanced/experimental feature that should not be needed; use at your own risk.
			//
			// For the normal AMD algorithm, the root bundle is loaded first, which instructs the
			// plugin what additional localized bundles are required for a particular locale. These
			// additional locales are loaded and a mix of the root and each progressively-specific
			// locale is returned. For example:
			//
			// 1. The client demands "dojo/i18n!some/path/nls/someBundle
			//
			// 2. The loader demands load(some/path/nls/someBundle)
			//
			// 3. This plugin require's "some/path/nls/someBundle", which is the root bundle.
			//
			// 4. Assuming config.locale is "ab-cd-ef" and the root bundle indicates that localizations
			//    are available for "ab" and "ab-cd-ef" (note the missing "ab-cd", then the plugin
			//    requires "some/path/nls/ab/someBundle" and "some/path/nls/ab-cd-ef/someBundle"
			//
			// 5. Upon receiving all required bundles, the plugin constructs the value of the bundle
			//    ab-cd-ef as...
			//
			//      mixin(mixin(mixin({}, require("some/path/nls/someBundle"),
			//        require("some/path/nls/ab/someBundle")),
			//          require("some/path/nls/ab-cd-ef/someBundle"));
			//
			//    This value is inserted into the cache and published to the loader at the
			//    key/module-id some/path/nls/someBundle/ab-cd-ef.
			//
			// The special preload signature (case 3) instructs the plugin to stop servicing all normal requests
			// (further preload requests will be serviced) until all ongoing preloading has completed.
			//
			// The preload signature instructs the plugin that a special rollup module is available that contains
			// one or more flattened, localized bundles. The JSON array of available locales indicates which locales
			// are available. Here is an example:
			//
			//   *preload*some/path/nls/someModule*["root", "ab", "ab-cd-ef"]
			//
			// This indicates the following rollup modules are available:
			//
			//   some/path/nls/someModule_ROOT
			//   some/path/nls/someModule_ab
			//   some/path/nls/someModule_ab-cd-ef
			//
			// Each of these modules is a normal AMD module that contains one or more flattened bundles in a hash.
			// For example, assume someModule contained the bundles some/bundle/path/someBundle and
			// some/bundle/path/someOtherBundle, then some/path/nls/someModule_ab would be expressed as folllows:
			//
			// define({
			//   some/bundle/path/someBundle:<value of someBundle, flattened with respect to locale ab>,
			//   some/bundle/path/someOtherBundle:<value of someOtherBundle, flattened with respect to locale ab>,
			// });
			//
			// E.g., given this design, preloading for locale=="ab" can execute the following algorithm:
			//
			// require(["some/path/nls/someModule_ab"], function(rollup){
			//   for(var p in rollup){
			//     var id = p + "/ab",
			//     cache[id] = rollup[p];
			//     define(id, rollup[p]);
			//   }
			// });
			//
			// Similarly, if "ab-cd" is requested, the algorithm can determine that "ab" is the best available and
			// load accordingly.
			//
			// The builder will write such rollups for every layer if a non-empty localeList  profile property is
			// provided. Further, the builder will include the following cache entry in the cache associated with
			// any layer.
			//
			//   "*now":function(r){r(['dojo/i18n!*preload*<path>/nls/<module>*<JSON array of available locales>']);}
			//
			// The *now special cache module instructs the loader to apply the provided function to context-require
			// with respect to the particular layer being defined. This causes the plugin to hold all normal service
			// requests until all preloading is complete.
			//
			// Notice that this algorithm is rarely better than the standard AMD load algorithm. Consider the normal case
			// where the target locale has a single segment and a layer depends on a single bundle:
			//
			// Without Preloads:
			//
			//   1. Layer loads root bundle.
			//   2. bundle is demanded; plugin loads single localized bundle.
			//
			// With Preloads:
			//
			//   1. Layer causes preloading of target bundle.
			//   2. bundle is demanded; service is delayed until preloading complete; bundle is returned.
			//
			// In each case a single transaction is required to load the target bundle. In cases where multiple bundles
			// are required and/or the locale has multiple segments, preloads still requires a single transaction whereas
			// the normal path requires an additional transaction for each additional bundle/locale-segment. However all
			// of these additional transactions can be done concurrently. Owing to this analysis, the entire preloading
			// algorithm can be discard during a build by setting the has feature dojo-preload-i18n-Api to false.
			//
			if(1){
				var split = id.split("*"),
					preloadDemand = split[1]=="preload";
				if(preloadDemand){
					if(!cache[id]){
						// use cache[id] to prevent multiple preloads of the same preload; this shouldn't happen, but
						// who knows what over-aggressive human optimizers may attempt
						cache[id] = 1;
						preloadL10n(split[2], json.parse(split[3]), 1);
					}
					// don't stall the loader!
					load(1);
				}
				if(preloadDemand || waitForPreloads(id, require, load)){
					return;
				}
			}

			var match= nlsRe.exec(id),
				bundlePath= match[1] + "/",
				bundleName= match[5] || match[4],
				bundlePathAndName= bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale=  localeSpecified || dojo.locale,
				loadTarget= bundlePathAndName + "/" + targetLocale,
				loadList = localeSpecified ? [targetLocale] : getLocalesToLoad(targetLocale),
				remaining = loadList.length,
				finish = function(){
					if(!--remaining){
						load(lang.delegate(cache[loadTarget]));
					}
				};
			array.forEach(loadList, function(locale){
				var target = bundlePathAndName + "/" + locale;
				if(1){
					checkForLegacyModules(target);
				}
				if(!cache[target]){
					doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, finish);
				}else{
					finish();
				}
			});
		};

	if(has("dojo-unit-tests")){
		var unitTests = thisModule.unitTests = [];
	}

	if(1 || 1){
		var normalizeLocale = thisModule.normalizeLocale= function(locale){
				var result = locale ? locale.toLowerCase() : dojo.locale;
				return result == "root" ? "ROOT" : result;
			},

			isXd = function(mid){
				return (1 && 1) ?
					require.isXdUrl(require.toUrl(mid + ".js")) :
					true;
			},

			preloading = 0,

			preloadWaitQueue = [],

			preloadL10n = thisModule._preloadLocalizations = function(/*String*/bundlePrefix, /*Array*/localesGenerated, /*boolean*/ guaranteedAmdFormat){
				//	summary:
				//		Load available flattened resource bundles associated with a particular module for dojo.locale and all dojo.config.extraLocale (if any)
				//
				//  descirption:
				//		Only called by built layer files. The entire locale hierarchy is loaded. For example,
				//		if locale=="ab-cd", then ROOT, "ab", and "ab-cd" are loaded. This is different than v1.6-
				//		in that the v1.6- would lonly load ab-cd...which was *always* flattened.
				//
				//		If guaranteedAmdFormat is true, then the module can be loaded with require thereby circumventing the detection algorithm
				//		and the extra possible extra transaction.
				//

				function forEachLocale(locale, func){
					// given locale= "ab-cd-ef", calls func on "ab-cd-ef", "ab-cd", "ab", "ROOT"; stops calling the first time func returns truthy
					var parts = locale.split("-");
					while(parts.length){
						if(func(parts.join("-"))){
							return true;
						}
						parts.pop();
					}
					return func("ROOT");
				}

				function preload(locale){
					locale = normalizeLocale(locale);
					forEachLocale(locale, function(loc){
						if(array.indexOf(localesGenerated, loc)>=0){
							var mid = bundlePrefix.replace(/\./g, "/")+"_"+loc;
							preloading++;
							(isXd(mid) || guaranteedAmdFormat ? require : syncRequire)([mid], function(rollup){
								for(var p in rollup){
									cache[p + "/" + loc] = rollup[p];
								}
								--preloading;
								while(!preloading && preloadWaitQueue.length){
									load.apply(null, preloadWaitQueue.shift());
								}
							});
							return true;
						}
						return false;
					});
				}

				preload();
				array.forEach(dojo.config.extraLocale, preload);
			},

			waitForPreloads = function(id, require, load){
				if(preloading){
					preloadWaitQueue.push([id, require, load]);
				}
				return preloading;
			};
	}

	if(1){
		// this code path assumes the dojo loader and won't work with a standard AMD loader
		var evalBundle=
				// use the function ctor to keep the minifiers away (also come close to global scope, but this is secondary)
				new Function(
					"__bundle",                // the bundle to evalutate
					"__checkForLegacyModules", // a function that checks if __bundle defined __mid in the global space
					"__mid",                   // the mid that __bundle is intended to define

					// returns one of:
					//		1 => the bundle was an AMD bundle
					//		a legacy bundle object that is the value of __mid
					//		instance of Error => could not figure out how to evaluate bundle

					  // used to detect when __bundle calls define
					  "var define = function(){define.called = 1;},"
					+ "    require = function(){define.called = 1;};"

					+ "try{"
					+		"define.called = 0;"
					+		"eval(__bundle);"
					+		"if(define.called==1)"
								// bundle called define; therefore signal it's an AMD bundle
					+			"return 1;"

					+		"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"
								// bundle was probably a v1.6- built NLS flattened NLS bundle that defined __mid in the global space
					+			"return __checkForLegacyModules;"

					+ "}catch(e){}"
					// evaulating the bundle was *neither* an AMD *nor* a legacy flattened bundle
					// either way, re-eval *after* surrounding with parentheses

					+ "try{"
					+ 		"return eval('('+__bundle+')');"
					+ "}catch(e){"
					+ 		"return e;"
					+ "}"
				),

			syncRequire= function(deps, callback){
				var results= [];
				array.forEach(deps, function(mid){
					var url= require.toUrl(mid + ".js");

					function load(text){
						var result = evalBundle(text, checkForLegacyModules, mid);
						if(result===1){
							// the bundle was an AMD module; re-inject it through the normal AMD path
							// we gotta do this since it could be an anonymous module and simply evaluating
							// the text here won't provide the loader with the context to know what
							// module is being defined()'d. With browser caching, this should be free; further
							// this entire code path can be circumvented by using the AMD format to begin with
							require([mid], function(bundle){
								results.push(cache[url]= bundle);
							});
						}else{
							if(result instanceof Error){
								console.error("failed to evaluate i18n bundle; url=" + url, result);
								result = {};
							}
							// nls/<locale>/<bundle-name> indicates not the root.
							results.push(cache[url] = (/nls\/[^\/]+\/[^\/]+$/.test(url) ? result : {root:result, _v1x:1}));
						}
					}

					if(cache[url]){
						results.push(cache[url]);
					}else{
						var bundle= require.syncLoadNls(mid);
						// don't need to check for legacy since syncLoadNls returns a module if the module
						// (1) was already loaded, or (2) was in the cache. In case 1, if syncRequire is called
						// from getLocalization --> load, then load will have called checkForLegacyModules() before
						// calling syncRequire; if syncRequire is called from preloadLocalizations, then we
						// don't care about checkForLegacyModules() because that will be done when a particular
						// bundle is actually demanded. In case 2, checkForLegacyModules() is never relevant
						// because cached modules are always v1.7+ built modules.
						if(bundle){
							results.push(bundle);
						}else{
							if(!xhr){
								try{
									require.getText(url, true, load);
								}catch(e){
									results.push(cache[url]= {});
								}
							}else{
								xhr.get({
									url:url,
									sync:true,
									load:load,
									error:function(){
										results.push(cache[url]= {});
									}
								});
							}
						}
					}
				});
				callback && callback.apply(null, results);
			},

			checkForLegacyModules = function(target){
				// legacy code may have already loaded [e.g] the raw bundle x/y/z at x.y.z; when true, push into the cache
				for(var result, names = target.split("/"), object = dojo.global[names[0]], i = 1; object && i<names.length-1; object = object[names[i++]]){}
				if(object){
					result = object[names[i]];
					if(!result){
						// fallback for incorrect bundle build of 1.6
						result = object[names[i].replace(/-/g,"_")];
					}
					if(result){
						cache[target] = result;
					}
				}
				return result;
			};

		thisModule.getLocalization= function(moduleName, bundleName, locale){
			var result,
				l10nName= getL10nName(moduleName, bundleName, locale).substring(10);
			load(l10nName, (!isXd(l10nName) ? syncRequire : require), function(result_){ result= result_; });
			return result;
		};

		if(has("dojo-unit-tests")){
			unitTests.push(function(doh){
				doh.register("tests.i18n.unit", function(t){
					var check;

					check = evalBundle("{prop:1}");
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("({prop:1})");
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("{'prop-x':1}");
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("({'prop-x':1})");
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("define({'prop-x':1})");
					t.is(1, check);

					check = evalBundle("this is total nonsense and should throw an error");
					t.is(check instanceof Error, true);
				});
			});
		}
	}

	return lang.mixin(thisModule, {
		dynamic:true,
		normalize:normalize,
		load:load,
		cache:cache
	});
});

},
'dijit/hccss':function(){
define("dijit/hccss", [
	"require",			// require.toUrl
	"dojo/_base/config", // config.blankGif
	"dojo/dom-class", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/dom-construct", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/dom-style", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/ready", // ready
	"dojo/_base/sniff", // has("ie") has("mozilla")
	"dojo/_base/window" // win.body
], function(require, config, domClass, domConstruct, domStyle, ready, has, win){

	// module:
	//		dijit/hccss
	// summary:
	//		Test if computer is in high contrast mode, and sets dijit_a11y flag on <body> if it is.

	if(has("ie") || has("mozilla")){	// NOTE: checking in Safari messes things up
		// priority is 90 to run ahead of parser priority of 100
		ready(90, function(){
			// summary:
			//		Detects if we are in high-contrast mode or not

			// create div for testing if high contrast mode is on or images are turned off
			var div = domConstruct.create("div",{
				id: "a11yTestNode",
				style:{
					cssText:'border: 1px solid;'
						+ 'border-color:red green;'
						+ 'position: absolute;'
						+ 'height: 5px;'
						+ 'top: -999px;'
						+ 'background-image: url("' + (config.blankGif || require.toUrl("dojo/resources/blank.gif")) + '");'
				}
			}, win.body());

			// test it
			var cs = domStyle.getComputedStyle(div);
			if(cs){
				var bkImg = cs.backgroundImage;
				var needsA11y = (cs.borderTopColor == cs.borderRightColor) || (bkImg != null && (bkImg == "none" || bkImg == "url(invalid-url:)" ));
				if(needsA11y){
					domClass.add(win.body(), "dijit_a11y");
				}
				if(has("ie")){
					div.outerHTML = "";		// prevent mixed-content warning, see http://support.microsoft.com/kb/925014
				}else{
					win.body().removeChild(div);
				}
			}
		});
	}
});

},
'curam/util/LocalConfig':function(){
/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
 * Modification History
 * --------------------
 * 04-Mar-2014  MV  [CR00421036] Added implementation.
 * 27-Feb-2014  MV  [CR00419961] Initial version.
 */

/**
 * @name curam.util.LocalConfig
 * @namespace Provides support for accessing application properties
 *    from JavaScript and overriding their values locally.
 *      <p/>
 *    The basic idea is that desired options are determined at application
 *    init time (in the main app page) and they are "seeded" using this API.
 *    From then on JavaScript code can access the values of these options.
 *      <p/>
 *    It is then possible to override individual option values and the API
 *    will persist the overrides in local Web storage. This allows
 *    for individual users to control the behaviour of the application
 *    without the need to set options globally for all users in admin pages.
 *      <p/>
 *    Please note the option values and overrides are stored in the "top"
 *    browser window, even if the API is used from nested iframes.
 */
define("curam/util/LocalConfig", [
        ], function() {
  
  // the code below ensures we store the values globally
  var globalName = function(name) {
        return 'curam_util_LocalConfig_' + name;
      },
      initGlobal = function(name, value) {
        var gName = globalName(name);
        
        // only initialize if it doesn't already exist!
        if (typeof top[gName] === 'undefined') {
          top[gName] = value;
        }
        
        return top[gName];
      },
      getGlobal = function(name) {
        return top[globalName(name)];
      };
  
  initGlobal('seedValues', {}),
  initGlobal('overrides', {});
  
  var _checkIsString = function(value, valName) {
    if (typeof value !== 'undefined' && typeof value !== 'string') {
      throw new Error('Invalid ' + valName + ' type: ' + typeof value
          + '; expected string');
    }
  };
  
  var LocalConfig =
  /**
   * @lends curam.util.LocalConfig.prototype
   */
  {
    /**
     * Sets the "global" value for the option.
     * This can be later overriden to provide a local value. 
     *
     * @param name Name of the option to set.
     * @param value Value of the option to set. If this is undefined
     *  then default value will be used instead.
     * @param defaultValue Default value to be used if value is not specified.
     */
    seedOption: function(name, value, defaultValue) {
      _checkIsString(value, 'value');
      _checkIsString(defaultValue, 'defaultValue');
      
      // code below treats null as a valid value to be used
      getGlobal('seedValues')[name] =
          (typeof value !== 'undefined') ? value : defaultValue;
    },
    
    /**
     * Sets local override for the value of given option.
     * The override is persisted to local Web storage, if available.
     * 
     * @param name Name of the option to override.
     * @param value The local value to be used.
     */
    overrideOption: function(name, value) {
      _checkIsString(value, 'value');

      // persist the value, if possible
      if(typeof(Storage) !== "undefined") {
        localStorage[name] = value;

      // otherwise just store in memory - override will not be permanent
      } else {
        getGlobal('overrides')[name] = value;
      }
    },
    
    /**
     * Reads the value of the given option. It takes the values in the following
     * precedence order. The first that is found is returned.
     * <ul>
     * <li>override from local persistent Web storage</li>
     * <li>override from session memory</li>
     * <li>the global value</li>
     * <li>return the provided default value</li>
     * </ul>
     * 
     * @param name Name of the option to read.
     * @param defaultValue Default value to return if value is not set.
     * @returns Value of the option or provided default value.
     */
    readOption: function(name, defaultValue) {
      _checkIsString(defaultValue, 'defaultValue');

      var finalValue = null;

      // use local persistent value, if possible and if available
      if (typeof(Storage) !== "undefined"
          && typeof localStorage[name] !== 'undefined') {
        finalValue = localStorage[name];
    
      // otherwise fall back to local non-persistent override
      } else if (typeof getGlobal('overrides')[name] !== 'undefined') {
        finalValue = getGlobal('overrides')[name];
  
      // otherwise fall back to the seed value
      } else if (typeof getGlobal('seedValues')[name] !== 'undefined') {
        finalValue = getGlobal('seedValues')[name];
  
      // otherwise fall back to the specified default value
      } else {
        finalValue = defaultValue;
      }

      return finalValue;
    },
    
    /**
     * Completely removes the option from configuration.
     * After using this method the readOption() will return the provided
     * default value.
     *
     * @param name Name of the option to clear.
     */
    clearOption: function(name) {
      if(typeof(Storage) !== "undefined") {
        localStorage.removeItem(name);
      }
      delete getGlobal('overrides')[name];
      delete getGlobal('seedValues')[name];
    }
  };
  
  return LocalConfig;
  
});

},
'dijit/form/_ComboBoxMenuMixin':function(){
define("dijit/form/_ComboBoxMenuMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/i18n", // i18n.getLocalization
	"dojo/_base/window", // win.doc.createTextNode
	"dojo/i18n!./nls/ComboBox"
], function(array, declare, domAttr, i18n, win){

// module:
//		dijit/form/_ComboBoxMenuMixin
// summary:
//		Focus-less menu for internal use in `dijit.form.ComboBox`

return declare( "dijit.form._ComboBoxMenuMixin", null, {
	// summary:
	//		Focus-less menu for internal use in `dijit.form.ComboBox`
	// tags:
	//		private

	// _messages: Object
	//		Holds "next" and "previous" text for paging buttons on drop down
	_messages: null,

	postMixInProperties: function(){
		this.inherited(arguments);
		this._messages = i18n.getLocalization("dijit.form", "ComboBox", this.lang);
	},

	buildRendering: function(){
		this.inherited(arguments);

		// fill in template with i18n messages
		this.previousButton.innerHTML = this._messages["previousMessage"];
		this.nextButton.innerHTML = this._messages["nextMessage"];
	},

	_setValueAttr: function(/*Object*/ value){
		this.value = value;
		this.onChange(value);
	},

	onClick: function(/*DomNode*/ node){
		if(node == this.previousButton){
			this._setSelectedAttr(null);
			this.onPage(-1);
		}else if(node == this.nextButton){
			this._setSelectedAttr(null);
			this.onPage(1);
		}else{
			this.onChange(node);
		}
	},

	// stubs
	onChange: function(/*Number*/ /*===== direction =====*/){
		// summary:
		//		Notifies ComboBox/FilteringSelect that user selected an option.
		// tags:
		//		callback
	},

	onPage: function(/*Number*/ /*===== direction =====*/){
		// summary:
		//		Notifies ComboBox/FilteringSelect that user clicked to advance to next/previous page.
		// tags:
		//		callback
	},

	onClose: function(){
		// summary:
		//		Callback from dijit.popup code to this widget, notifying it that it closed
		// tags:
		//		private
		this._setSelectedAttr(null);
	},

	_createOption: function(/*Object*/ item, labelFunc){
		// summary:
		//		Creates an option to appear on the popup menu subclassed by
		//		`dijit.form.FilteringSelect`.

		var menuitem = this._createMenuItem();
		var labelObject = labelFunc(item);
		if(labelObject.html){
			menuitem.innerHTML = labelObject.label;
		}else{
			menuitem.appendChild(
				win.doc.createTextNode(labelObject.label)
			);
		}
		// #3250: in blank options, assign a normal height
		if(menuitem.innerHTML == ""){
			menuitem.innerHTML = "&#160;";	// &nbsp;
		}

		// update menuitem.dir if BidiSupport was required
		this.applyTextDir(menuitem, (menuitem.innerText || menuitem.textContent || ""));

		menuitem.item=item;
		return menuitem;
	},

	createOptions: function(results, options, labelFunc){
		// summary:
		//		Fills in the items in the drop down list
		// results:
		//		Array of items
		// options:
		//		The options to the query function of the store
		//
		// labelFunc:
		//		Function to produce a label in the drop down list from a dojo.data item

		this.items = results;

		// display "Previous . . ." button
		this.previousButton.style.display = (options.start == 0) ? "none" : "";
		domAttr.set(this.previousButton, "id", this.id + "_prev");
		// create options using _createOption function defined by parent
		// ComboBox (or FilteringSelect) class
		// #2309:
		//		iterate over cache nondestructively
		array.forEach(results, function(item, i){
			var menuitem = this._createOption(item, labelFunc);
			menuitem.setAttribute("item", i);	// index to this.items; use indirection to avoid mem leak
			domAttr.set(menuitem, "id", this.id + i);
			this.nextButton.parentNode.insertBefore(menuitem, this.nextButton);
		}, this);
		// display "Next . . ." button
		var displayMore = false;
		// Try to determine if we should show 'more'...
		if(results.total && !results.total.then && results.total != -1){
			if((options.start + options.count) < results.total){
				displayMore = true;
			}else if((options.start + options.count) > results.total && options.count == results.length){
				// Weird return from a data store, where a start + count > maxOptions
				// implies maxOptions isn't really valid and we have to go into faking it.
				// And more or less assume more if count == results.length
				displayMore = true;
			}
		}else if(options.count == results.length){
			//Don't know the size, so we do the best we can based off count alone.
			//So, if we have an exact match to count, assume more.
			displayMore = true;
		}

		this.nextButton.style.display = displayMore ? "" : "none";
		domAttr.set(this.nextButton,"id", this.id + "_next");
	},

	clearResultList: function(){
		// summary:
		//		Clears the entries in the drop down list, but of course keeps the previous and next buttons.
		var container = this.containerNode;
		while(container.childNodes.length > 2){
			container.removeChild(container.childNodes[container.childNodes.length-2]);
		}
		this._setSelectedAttr(null);
	},

	highlightFirstOption: function(){
		// summary:
		//		Highlight the first real item in the list (not Previous Choices).
		this.selectFirstNode();
	},

	highlightLastOption: function(){
		// summary:
		//		Highlight the last real item in the list (not More Choices).
		this.selectLastNode();
	},

	selectFirstNode: function(){
		this.inherited(arguments);
		if(this.getHighlightedOption() == this.previousButton){
			this.selectNextNode();
		}
	},

	selectLastNode: function(){
		this.inherited(arguments);
		if(this.getHighlightedOption() == this.nextButton){
			this.selectPreviousNode();
		}
	},

	getHighlightedOption: function(){
		return this._getSelectedAttr();
	}
});

});

},
'dojo/parser':function(){
define(
	"dojo/parser", ["./_base/kernel", "./_base/lang", "./_base/array", "./_base/config", "./_base/html", "./_base/window", "./_base/url",
	 	"./_base/json", "./aspect", "./date/stamp", "./has", "./query", "./on", "./ready"],
	function(dojo, dlang, darray, config, dhtml, dwindow, _Url, djson, aspect, dates, has, query, don, ready){

// module:
//		dojo/parser
// summary:
//		The Dom/Widget parsing package

new Date("X"); // workaround for #11279, new Date("") == NaN

if (1) {
	var form = document.createElement("form");
	// Test if DOMNode.attributes only lists the attributes the user specified, not attributes w/default values.
	has.add("dom-attributes-explicit", form.attributes.length == 0);

	// IE8 will erroneously list a few attributes that weren't specified,
	// but we know to skip them because they have a specified flag which is false
	has.add("dom-attributes-specified-flag", form.attributes.length < 40);

	// Otherwise, it's IE6-7 form.attributes will list hundreds of values, need to do outerHTML instead.
}

dojo.parser = new function(){
	// summary:
	//		The Dom/Widget parsing package

	var _nameMap = {
		// Map from widget name (ex: "dijit.form.Button") to structure mapping
		// lowercase version of attribute names to the version in the widget ex:
		//	{
		//		label: "label",
		//		onclick: "onClick"
		//	}
	};
	function getNameMap(proto){
		// summary:
		//		Returns map from lowercase name to attribute name in class, ex: {onclick: "onClick"}
		var map = {};
		for(var name in proto){
			if(name.charAt(0)=="_"){ continue; }	// skip internal properties
			map[name.toLowerCase()] = name;
		}
		return map;
	}
	// Widgets like BorderContainer add properties to _Widget via dojo.extend().
	// If BorderContainer is loaded after _Widget's parameter list has been cached,
	// we need to refresh that parameter list (for _Widget and all widgets that extend _Widget).
	aspect.after(dlang, "extend", function(){
		_nameMap = {};
	}, true);

	// Map from widget name (ex: "dijit.form.Button") to a map of { "list-of-mixins": ctor }
	// if "list-of-mixins" is "__type" this is the raw type without mixins
	var _ctorMap = {};


	function getCtor(type){
		var map = _ctorMap[type] || (_ctorMap[type] = {});
		return map["__type"] || (map["__type"] = (dlang.getObject(type) || require(type)));
	}

	this._functionFromScript = function(script, attrData){
		// summary:
		//		Convert a <script type="dojo/method" args="a, b, c"> ... </script>
		//		into a function
		// script: DOMNode
		//		The <script> DOMNode
		// attrData: String
		//		For HTML5 compliance, searches for attrData + "args" (typically
		//		"data-dojo-args") instead of "args"
		var preamble = "";
		var suffix = "";
		var argsStr = (script.getAttribute(attrData + "args") || script.getAttribute("args"));
		if(argsStr){
			darray.forEach(argsStr.split(/\s*,\s*/), function(part, idx){
				preamble += "var "+part+" = arguments["+idx+"]; ";
			});
		}
		var withStr = script.getAttribute("with");
		if(withStr && withStr.length){
			darray.forEach(withStr.split(/\s*,\s*/), function(part){
				preamble += "with("+part+"){";
				suffix += "}";
			});
		}
		return new Function(preamble+script.innerHTML+suffix);
	};

	this.instantiate = /*====== dojo.parser.instantiate= ======*/ function(nodes, mixin, options) {
		// summary:
		//		Takes array of nodes, and turns them into class instances and
		//		potentially calls a startup method to allow them to connect with
		//		any children.
		// nodes: Array
		//		Array of DOM nodes
		// mixin: Object?
		//		An object that will be mixed in with each node in the array.
		//		Values in the mixin will override values in the node, if they
		//		exist.
		// options: Object?
		//		An object used to hold kwArgs for instantiation.
		//		See parse.options argument for details.

		mixin = mixin || {};
		options = options || {};

		var dojoType = (options.scope || dojo._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (options.scope || dojo._scopeName) + "-",// typically "data-dojo-"
			dataDojoType = attrData + "type";						// typically "data-dojo-type"

		var list = [];
		darray.forEach(nodes, function(node){
			var type = dojoType in mixin ? mixin[dojoType] : node.getAttribute(dataDojoType) || node.getAttribute(dojoType);
			if(type){
				list.push({
					node: node,
					"type": type
				});
			}
		});

		// Instantiate the nodes and return the objects
		return this._instantiate(list, mixin, options);
	};

	this._instantiate = /*====== dojo.parser.instantiate= ======*/ function(nodes, mixin, options){
		// summary:
		//		Takes array of objects representing nodes, and turns them into class instances and
		//		potentially calls a startup method to allow them to connect with
		//		any children.
		// nodes: Array
		//		Array of objects like
		//	|		{
		//	|			type: "dijit.form.Button",
		//	|			node: DOMNode,
		//	|			scripts: [ ... ],	// array of <script type="dojo/..."> children of node
		//	|			inherited: { ... }	// settings inherited from ancestors like dir, theme, etc.
		//	|		}
		// mixin: Object
		//		An object that will be mixed in with each node in the array.
		//		Values in the mixin will override values in the node, if they
		//		exist.
		// options: Object
		//		An options object used to hold kwArgs for instantiation.
		//		See parse.options argument for details.

		var thelist = [];

		// Precompute names of special attributes we are looking for
		// TODO: for 2.0 default to data-dojo- regardless of scopeName (or maybe scopeName won't exist in 2.0)
		var dojoType = (options.scope || dojo._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (options.scope || dojo._scopeName) + "-",// typically "data-dojo-"
			dataDojoType = attrData + "type",						// typically "data-dojo-type"
			dataDojoProps = attrData + "props",						// typically "data-dojo-props"
			dataDojoAttachPoint = attrData + "attach-point",
			dataDojoAttachEvent = attrData + "attach-event",
			dataDojoId = attrData + "id",
			dataDojoMixins = attrData + "mixins";

		// And make hash to quickly check if a given attribute is special, and to map the name to something friendly
		var specialAttrs = {};
		darray.forEach([dataDojoProps, dataDojoType, dojoType, dataDojoId, "jsId", dataDojoAttachPoint,
				dataDojoAttachEvent, "dojoAttachPoint", "dojoAttachEvent", "class", "style", dataDojoMixins], function(name){
			specialAttrs[name.toLowerCase()] = name.replace(options.scope, "dojo");
		});

		function extend(type, mixins){
			return type.createSubclass && type.createSubclass(mixins) || type.extend.apply(type, mixins);
		}

		darray.forEach(nodes, function(obj){
			if(!obj){ return; }

			var node = obj.node,
				type = obj.type,
				mixins = node.getAttribute(dataDojoMixins), ctor;

			if(mixins){
				var map = _ctorMap[type];
				// remove whitespaces
				mixins = mixins.replace(/ /g, "");
				ctor = map && map[mixins];
				if(!ctor){
					// first get ctor for raw type (& create _ctorMap[type] if needed (should not be))
					ctor = getCtor(type);
					// then do the mixin
					ctor = _ctorMap[type][mixins] = extend(ctor, darray.map(mixins.split(","), getCtor));
				}
			}else{
				ctor = getCtor(type);
			}

			var proto = ctor && ctor.prototype;

			// Setup hash to hold parameter settings for this widget.	Start with the parameter
			// settings inherited from ancestors ("dir" and "lang").
			// Inherited setting may later be overridden by explicit settings on node itself.
			var params = {};

			if(options.defaults){
				// settings for the document itself (or whatever subtree is being parsed)
				dlang.mixin(params, options.defaults);
			}
			if(obj.inherited){
				// settings from dir=rtl or lang=... on a node above this node
				dlang.mixin(params, obj.inherited);
			}

			// Get list of attributes explicitly listed in the markup
			var attributes;
			if(has("dom-attributes-explicit")){
				// Standard path to get list of user specified attributes
				attributes = node.attributes;
			}else if(has("dom-attributes-specified-flag")){
				// Special processing needed for IE8, to skip a few faux values in attributes[]
				attributes = darray.filter(node.attributes, function(a){ return a.specified;});
			}else{
				// Special path for IE6-7, avoid (sometimes >100) bogus entries in node.attributes
				var clone = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false),
					attrs = clone.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g, "").replace(/^\s*<[a-zA-Z0-9]*\s*/, "").replace(/\s*>.*$/, "");

				attributes = darray.map(attrs.split(/\s+/), function(name){
					var lcName = name.toLowerCase();
					return {
						name: name,
						// getAttribute() doesn't work for button.value, returns innerHTML of button.
						// but getAttributeNode().value doesn't work for the form.encType or li.value
						value: (node.nodeName == "LI" && name == "value") || lcName == "enctype" ?
								node.getAttribute(lcName) : node.getAttributeNode(lcName).value
					};
				});
			}

			// Read in attributes and process them, including data-dojo-props, data-dojo-type,
			// dojoAttachPoint, etc., as well as normal foo=bar attributes.
			var i=0, item;
			while(item = attributes[i++]){
				var name = item.name,
					lcName = name.toLowerCase(),
					value = item.value;

				if(lcName in specialAttrs){
					switch(specialAttrs[lcName]){

					// Data-dojo-props.   Save for later to make sure it overrides direct foo=bar settings
					case "data-dojo-props":
						var extra = value;
						break;

					// data-dojo-id or jsId. TODO: drop jsId in 2.0
					case "data-dojo-id":
					case "jsId":
						var jsname = value;
						break;

					// For the benefit of _Templated
					case "data-dojo-attach-point":
					case "dojoAttachPoint":
						params.dojoAttachPoint = value;
						break;
					case "data-dojo-attach-event":
					case "dojoAttachEvent":
						params.dojoAttachEvent = value;
						break;

					// Special parameter handling needed for IE
					case "class":
						params["class"] = node.className;
						break;
					case "style":
						params["style"] = node.style && node.style.cssText;
						break;
					}
				}else{
					// Normal attribute, ex: value="123"

					// Find attribute in widget corresponding to specified name.
					// May involve case conversion, ex: onclick --> onClick
					if(!(name in proto)){
						var map = (_nameMap[type] || (_nameMap[type] = getNameMap(proto)));
						name = map[lcName] || name;
					}

					// Set params[name] to value, doing type conversion
					if(name in proto){
						switch(typeof proto[name]){
						case "string":
							params[name] = value;
							break;
						case "number":
							params[name] = value.length ? Number(value) : NaN;
							break;
						case "boolean":
							// for checked/disabled value might be "" or "checked".	 interpret as true.
							params[name] = value.toLowerCase() != "false";
							break;
						case "function":
							if(value === "" || value.search(/[^\w\.]+/i) != -1){
								// The user has specified some text for a function like "return x+5"
								params[name] = new Function(value);
							}else{
								// The user has specified the name of a function like "myOnClick"
								// or a single word function "return"
								params[name] = dlang.getObject(value, false) || new Function(value);
							}
							break;
						default:
							var pVal = proto[name];
							params[name] =
								(pVal && "length" in pVal) ? (value ? value.split(/\s*,\s*/) : []) :	// array
									(pVal instanceof Date) ?
										(value == "" ? new Date("") :	// the NaN of dates
										value == "now" ? new Date() :	// current date
										dates.fromISOString(value)) :
								(pVal instanceof dojo._Url) ? (dojo.baseUrl + value) :
								djson.fromJson(value);
						}
					}else{
						params[name] = value;
					}
				}
			}

			// Mix things found in data-dojo-props into the params, overriding any direct settings
			if(extra){
				try{
					extra = djson.fromJson.call(options.propsThis, "{" + extra + "}");
					dlang.mixin(params, extra);
				}catch(e){
					// give the user a pointer to their invalid parameters. FIXME: can we kill this in production?
					throw new Error(e.toString() + " in data-dojo-props='" + extra + "'");
				}
			}

			// Any parameters specified in "mixin" override everything else.
			dlang.mixin(params, mixin);

			var scripts = obj.scripts || (ctor && (ctor._noScript || proto._noScript) ? [] :
						query("> script[type^='dojo/']", node));

			// Process <script type="dojo/*"> script tags
			// <script type="dojo/method" event="foo"> tags are added to params, and passed to
			// the widget on instantiation.
			// <script type="dojo/method"> tags (with no event) are executed after instantiation
			// <script type="dojo/connect" data-dojo-event="foo"> tags are dojo.connected after instantiation
			// <script type="dojo/watch" data-dojo-prop="foo"> tags are dojo.watch after instantiation
			// <script type="dojo/on" data-dojo-event="foo"> tags are dojo.on after instantiation
			// note: dojo/* script tags cannot exist in self closing widgets, like <input />
			var connects = [],	// functions to connect after instantiation
				calls = [],		// functions to call after instantiation
				watch = [],  //functions to watch after instantiation
				on = []; //functions to on after instantiation

			if(scripts){
				for(i=0; i<scripts.length; i++){
					var script = scripts[i];
					node.removeChild(script);
					// FIXME: drop event="" support in 2.0. use data-dojo-event="" instead
					var event = (script.getAttribute(attrData + "event") || script.getAttribute("event")),
						prop = script.getAttribute(attrData + "prop"),
						scriptType = script.getAttribute("type"),
						nf = this._functionFromScript(script, attrData);
					if(event){
						if(scriptType == "dojo/connect"){
							connects.push({event: event, func: nf});
						}else if(scriptType == "dojo/on"){
							on.push({event: event, func: nf});
						}else{
							params[event] = nf;
						}
					}else if(scriptType == "dojo/watch"){
						watch.push({prop: prop, func: nf});
					}else{
						calls.push(nf);
					}
				}
			}

			// create the instance
			var markupFactory = ctor.markupFactory || proto.markupFactory;
			var instance = markupFactory ? markupFactory(params, node, ctor) : new ctor(params, node);
			thelist.push(instance);

			// map it to the JS namespace if that makes sense
			if(jsname){
				dlang.setObject(jsname, instance);
			}

			// process connections and startup functions
			for(i=0; i<connects.length; i++){
				aspect.after(instance, connects[i].event, dojo.hitch(instance, connects[i].func), true);
			}
			for(i=0; i<calls.length; i++){
				calls[i].call(instance);
			}
			for(i=0; i<watch.length; i++){
				instance.watch(watch[i].prop, watch[i].func);
			}
			for(i=0; i<on.length; i++){
				don(instance, on[i].event, on[i].func);
			}
		}, this);

		// Call startup on each top level instance if it makes sense (as for
		// widgets).  Parent widgets will recursively call startup on their
		// (non-top level) children
		if(!mixin._started){
			darray.forEach(thelist, function(instance){
				if( !options.noStart && instance  &&
					dlang.isFunction(instance.startup) &&
					!instance._started
				){
					instance.startup();
				}
			});
		}
		return thelist;
	};

	this.scan = /*====== dojo.parser.scan= ======*/ function(root, options){
		// summary:
		//		Scan a DOM tree and return an array of objects representing the DOMNodes
		//		that need to be turned into widgets.
		// description:
		//		Search specified node (or document root node) recursively for class instances
		//		and return an array of objects that represent potential widgets to be
		//		instantiated. Searches for either data-dojo-type="MID" or dojoType="MID" where
		//		"MID" is a module ID like "dijit/form/Button" or a fully qualified Class name
		//		like "dijit.form.Button".
		//
		//		See parser.parse() for details of markup.
		// root: DomNode?
		//		A default starting root node from which to start the parsing. Can be
		//		omitted, defaulting to the entire document. If omitted, the `options`
		//		object can be passed in this place. If the `options` object has a
		//		`rootNode` member, that is used.
		// options: Object
		//		a kwArgs options object, see parse() for details

		// Output list
		var list = [];

		var dojoType = (options.scope || dojo._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (options.scope || dojo._scopeName) + "-",	// typically "data-dojo-"
			dataDojoType = attrData + "type",						// typically "data-dojo-type"
			dataDojoTextDir = attrData + "textdir";					// typically "data-dojo-textdir"

		// Info on DOMNode currently being processed
		var node = root.firstChild;

		// Info on parent of DOMNode currently being processed
		//	- inherited: dir, lang, and textDir setting of parent, or inherited by parent
		//	- parent: pointer to identical structure for my parent (or null if no parent)
		//	- scripts: if specified, collects <script type="dojo/..."> type nodes from children
		var inherited = options.inherited;
		if(!inherited){
			function findAncestorAttr(node, attr){
				return (node.getAttribute && node.getAttribute(attr)) ||
					(node !== dwindow.doc && node !== dwindow.doc.documentElement && node.parentNode ? findAncestorAttr(node.parentNode, attr) : null);
			}
			inherited = {
				dir: findAncestorAttr(root, "dir"),
				lang: findAncestorAttr(root, "lang"),
				textDir: findAncestorAttr(root, dataDojoTextDir)
			};
			for(var key in inherited){
				if(!inherited[key]){ delete inherited[key]; }
			}
		}
		var parent = {
			inherited: inherited
		};

		// For collecting <script type="dojo/..."> type nodes (when null, we don't need to collect)
		var scripts;

		// when true, only look for <script type="dojo/..."> tags, and don't recurse to children
		var scriptsOnly;

		function getEffective(parent){
			// summary:
			//		Get effective dir, lang, textDir settings for specified obj
			//		(matching "parent" object structure above), and do caching.
			//		Take care not to return null entries.
			if(!parent.inherited){
				parent.inherited = {};
				var node = parent.node,
					grandparent = getEffective(parent.parent);
				var inherited  = {
					dir: node.getAttribute("dir") || grandparent.dir,
					lang: node.getAttribute("lang") || grandparent.lang,
					textDir: node.getAttribute(dataDojoTextDir) || grandparent.textDir
				};
				for(var key in inherited){
					if(inherited[key]){
						parent.inherited[key] = inherited[key];
					}
				}
			}
			return parent.inherited;
		}

		// DFS on DOM tree, collecting nodes with data-dojo-type specified.
		while(true){
			if(!node){
				// Finished this level, continue to parent's next sibling
				if(!parent || !parent.node){
					break;
				}
				node = parent.node.nextSibling;
				scripts = parent.scripts;
				scriptsOnly = false;
				parent = parent.parent;
				continue;
			}

			if(node.nodeType != 1){
				// Text or comment node, skip to next sibling
				node = node.nextSibling;
				continue;
			}

			if(scripts && node.nodeName.toLowerCase() == "script"){
				// Save <script type="dojo/..."> for parent, then continue to next sibling
				type = node.getAttribute("type");
				if(type && /^dojo\/\w/i.test(type)){
					scripts.push(node);
				}
				node = node.nextSibling;
				continue;
			}
			if(scriptsOnly){
				node = node.nextSibling;
				continue;
			}

			// Check for data-dojo-type attribute, fallback to backward compatible dojoType
			var type = node.getAttribute(dataDojoType) || node.getAttribute(dojoType);

			// Short circuit for leaf nodes containing nothing [but text]
			var firstChild = node.firstChild;
			if(!type && (!firstChild || (firstChild.nodeType == 3 && !firstChild.nextSibling))){
				node = node.nextSibling;
				continue;
			}

			// Setup data structure to save info on current node for when we return from processing descendant nodes
			var current = {
				node: node,
				scripts: scripts,
				parent: parent
			};

			// If dojoType/data-dojo-type specified, add to output array of nodes to instantiate
			// Note: won't find classes declared via dojo.Declaration, so use try/catch to avoid throw from require()
			// We don't care yet about mixins ctors, we check script stop only on main class
			var ctor;
			try{
				ctor = type && getCtor(type);
			}catch(e){
			}
			var childScripts = ctor && !ctor.prototype._noScript ? [] : null; // <script> nodes that are parent's children
			if(type){
				list.push({
					"type": type,
					node: node,
					scripts: childScripts,
					inherited: getEffective(current) // dir & lang settings for current node, explicit or inherited
				});
			}

			// Recurse, collecting <script type="dojo/..."> children, and also looking for
			// descendant nodes with dojoType specified (unless the widget has the stopParser flag).
			// When finished with children, go to my next sibling.
			node = firstChild;
			scripts = childScripts;
			scriptsOnly = ctor && ctor.prototype.stopParser && !(options.template);
			parent = current;
		}

		return list;
	};

	this.parse = /*====== dojo.parser.parse= ======*/ function(rootNode, options){
		// summary:
		//		Scan the DOM for class instances, and instantiate them.
		//
		// description:
		//		Search specified node (or root node) recursively for class instances,
		//		and instantiate them. Searches for either data-dojo-type="Class" or
		//		dojoType="Class" where "Class" is a a fully qualified class name,
		//		like `dijit.form.Button`
		//
		//		Using `data-dojo-type`:
		//		Attributes using can be mixed into the parameters used to instantiate the
		//		Class by using a `data-dojo-props` attribute on the node being converted.
		//		`data-dojo-props` should be a string attribute to be converted from JSON.
		//
		//		Using `dojoType`:
		//		Attributes are read from the original domNode and converted to appropriate
		//		types by looking up the Class prototype values. This is the default behavior
		//		from Dojo 1.0 to Dojo 1.5. `dojoType` support is deprecated, and will
		//		go away in Dojo 2.0.
		//
		// rootNode: DomNode?
		//		A default starting root node from which to start the parsing. Can be
		//		omitted, defaulting to the entire document. If omitted, the `options`
		//		object can be passed in this place. If the `options` object has a
		//		`rootNode` member, that is used.
		//
		// options: Object?
		//		A hash of options.
		//
		//			* noStart: Boolean?
		//				when set will prevent the parser from calling .startup()
		//				when locating the nodes.
		//			* rootNode: DomNode?
		//				identical to the function's `rootNode` argument, though
		//				allowed to be passed in via this `options object.
		//			* template: Boolean
		//				If true, ignores ContentPane's stopParser flag and parses contents inside of
		//				a ContentPane inside of a template.   This allows dojoAttachPoint on widgets/nodes
		//				nested inside the ContentPane to work.
		//			* inherited: Object
		//				Hash possibly containing dir and lang settings to be applied to
		//				parsed widgets, unless there's another setting on a sub-node that overrides
		//			* scope: String
		//				Root for attribute names to search for.   If scopeName is dojo,
		//				will search for data-dojo-type (or dojoType).   For backwards compatibility
		//				reasons defaults to dojo._scopeName (which is "dojo" except when
		//				multi-version support is used, when it will be something like dojo16, dojo20, etc.)
		//			* propsThis: Object
		//				If specified, "this" referenced from data-dojo-props will refer to propsThis.
		//				Intended for use from the widgets-in-template feature of `dijit._WidgetsInTemplateMixin`
		//
		// example:
		//		Parse all widgets on a page:
		//	|		dojo.parser.parse();
		//
		// example:
		//		Parse all classes within the node with id="foo"
		//	|		dojo.parser.parse(dojo.byId('foo'));
		//
		// example:
		//		Parse all classes in a page, but do not call .startup() on any
		//		child
		//	|		dojo.parser.parse({ noStart: true })
		//
		// example:
		//		Parse all classes in a node, but do not call .startup()
		//	|		dojo.parser.parse(someNode, { noStart:true });
		//	|		// or
		//	|		dojo.parser.parse({ noStart:true, rootNode: someNode });

		// determine the root node and options based on the passed arguments.
		var root;
		if(!options && rootNode && rootNode.rootNode){
			options = rootNode;
			root = options.rootNode;
		}else if(rootNode && dlang.isObject(rootNode) && !("nodeType" in rootNode)){
			options = rootNode;
		}else{
			root = rootNode;
		}
		root = root ? dhtml.byId(root) : dwindow.body();

		options = options || {};

		// List of all nodes on page w/dojoType specified
		var list = this.scan(root, options);

		// go build the object instances
		var mixin = options.template ? {template: true} : {};
		return this._instantiate(list, mixin, options); // Array
	};
}();


//Register the parser callback. It should be the first callback
//after the a11y test.
if(config.parseOnLoad){
	ready(100, dojo.parser, "parse");
}

return dojo.parser;
});

},
'idx/oneui/form/_CompositeMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/form/_CompositeMixin", [
	"dojo/_base/declare", 
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom",
	"dojo/i18n", 
	"dojo/query", 
	"dojo/dom-class", 
	"dojo/dom-style", 
	"dijit/_base/wai", 
	"../HoverHelpTooltip",
	"../common",
	"./_FocusManager"
], function(declare, lang, domAttr, dom, i18n, query, domClass, domStyle, wai, HoverHelpTooltip, common, _focusManager) {
	/**
	 * @public
	 * @name idx.oneui.form._CompositeMixin
	 * @class Mix-in class to provide customized label, hint, unit, and field layout, implemented according to 
	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y29&vsub=*&hsub=*&openpanes=0000010000">Text Areas & Fields</a></b>.
	 * It takes the assumption that a composite widget will follow the dom structure below
	 * <br>
	 &lt;div class="idxComposite"&gt;
		&lt;div class="idxLabel"&gt;
			&lt;span&gt;*&lt;/span&gt;
				&lt;label dojotAttachPoint="compLabelNode"&gt;Label Text&lt;/label&gt;
		&lt;/div&gt;
		&lt;div&gt;other dom structure...&lt;/div&gt;&lt;div dojoAttachPoint="compUnitNode"&gt;unit text&lt;/div&gt;
		&lt;div dojoAttachPoint="compHintNode" class="idxHint dijitHidden"&gt;hint text&lt;/div&gt;
	 &lt;/div>
	 * <br>
	 * @aguments idx.oneui.form._FocusManager
	 */

	lang.extend(HoverHelpTooltip._MasterHoverHelpTooltip, {hoverFocus: false});

	return declare("idx.oneui.form._CompositeMixin", null, 
	/**@lends idx.oneui.form._CompositeMixin#*/
	{
		/**
		 * Layout of the label and the field, "horizontal" or "vertical", implemented according to 
		 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y16&vsub=*&hsub=*&openpanes=0000011100">Field & Label Alignment</a></b>
		 * @type String
		 * @default "horizontal"
		 */
		labelAlignment: "horizontal",
		
		/**
		 * Label text
		 * @type String
		 */
		label: "",
		
		/**
		 * Width from the left of label to the left of corresponding field, this parameter works in the composite widget layout of "horizontal".
		 * @type String | Number
		 */
		labelWidth: "",
		
		/**
		 * Width of the field with a hidden validation icon
		 * @type String | Number
		 */
		fieldWidth: "",
		
		/**
		 * For input widgets only. The position of the hint text: "inside" / "outside", inner the field input or not.
		 * @type String
		 * @default "inside"
		 */
		hintPosition: "inside",
		
		/**
		 * For input widgets only. The hint text.
		 * @type String
		 */
		hint: "",
		
		/**
		 * Indicates that it's a required field or not. A required field will have a red asterisk.
		 * implemented according to 
	 	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y17&vsub=*&hsub=*&openpanes=0000011100">Required Fields</a></b>.
		 * @type boolean
		 * @default false
		 */
		required: false,
		
		/**
		 * The text of unit for the numerical value input widget.
		 * @type String
		 */
		unit: "",
		
		/**
		 * Focus manager for all composite widget
		 * @type idx.oneui.form.FocusManager
		 * @private
		 */
		_focusManager: _focusManager,
		
		/**
		 * Set the alignment for the label and field,  update the style of the label node to make 
		 * it be at the right place.
		 * @public
		 * @param {string} alignment
		 * The alignment of the label and field. Can be "vertical" or "horizontal".
		 * If "vertical" is used, the label is put above the TextBox.
		 * If "horizontal" is used, the label is put on the left of the TextBox (on
		 * the right of the TextBox if RTL language is used).
		 */
		_setLabelAlignmentAttr: function(/*String*/ alignment){
			var h = alignment == "horizontal";
			query(".idxLabel", this.domNode).toggleClass("dijitInline", h);
			query(".idxCompContainer", this.domNode).toggleClass("dijitInline", h);
			this._set("labelAlignment", alignment);
		},
		
		/**
		 * Set the label text. Update the content of the label node.
		 * @public
		 * @param {string} label
		 * The text will be displayed as the content of the label. If text is null or
		 * empty string, nothing would be displayed.
		 */
		_setLabelAttr: function(/*String*/ label){
			this.compLabelNode.innerHTML = label;
			query(".idxLabel", this.domNode).toggleClass("dijitHidden", /^\s*$/.test(label));
			this._set("label", label);
		},
		
		/**
		 * Set this field as a required field or not. If this field is required,
		 * a red asterisk will be shown at the start of label.
		 * @public
		 * @param {boolean} required
		 */
		_setRequiredAttr: function(/*Boolean*/ required){
			wai.setWaiState(this.focusNode, "required", required + "");
			this._set("required", required);
			if(required){
				this._set("state", "Incomplete");
			}
		},
		
		/**
		 * Set position of the hint text. If position is "outside", update the content
		 * of the hint node. If position is "inside" and the value of the TextBox is
		 * null, set the value of the TextBox to the hintText
		 * @protected
		 * @param {string} position
		 * The position of the label. Can be "outside" or "inside".
		 * If "outside" is used, the hint text is put below the TextBox.
		 * If "inside" is used and the TextBox has a value, display the value in the TextBox. Once
		 * the value of the TextBox is null, display the hint text inside the TextBox in a specified
		 * color (e.g: gray).
		 */
		_setHintPositionAttr: function(/*String*/ position){
			if(!this.compHintNode){ return; }
			domClass.toggle(this.compHintNode, "dijitVisible", position != "inside");
			this._set("hintPosition", position);
			this.set("hint", this.hint);
		},
		
		/**
		 * Set the hint text
		 * @public
		 * @param {string} hint
		 * The text will be displayed inside or below the TextBox per the "position" attribute.
		 */
		_setHintAttr: function(/*String*/ hint){
			if(!this.compHintNode){ return; }
			this.set("placeHolder", this.hintPosition == "inside" ? hint : "");
			this.compHintNode.innerHTML = this.hintPosition == "inside" ? "" : hint;
			
			if(this.hintPosition == "outside"){
				domAttr.set(this.compHintNode, "id", this.id + "_hint_outside");
			}
			dijit.setWaiState(this.focusNode, "describedby", this.id + "_hint_" + this.hintPosition);
			this._set("hint", hint);
		},
		
		_setPlaceHolderAttr: function(v){
			this._set("placeHolder", v);
			if(!this._phspan){
				this._attachPoints.push('_phspan');
				this._phspan = dojo.create('span',{
					className:'dijitPlaceHolder dijitInputField',
					id: this.id + "_hint_inside"
				},this.focusNode,'after');
			}
			this._phspan.innerHTML = "";
			this._phspan.appendChild(document.createTextNode(v));
			this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
		},
		
		/**
		 * Set the text of unit
		 * @public
		 * @param {string} unit
		 * The unit will be displayed on the right of the input box(on the left of the input
		 * box if RTL language is used).
		 */
		_setUnitAttr: function(/*String*/ unit){
			if(!this.compUnitNode){ return; }
			this.compUnitNode.innerHTML = unit;
			domClass.toggle(this.compUnitNode, "dijitHidden", /^\s*$/.test(unit));
			this._set("unit", unit);
		},
		
		/**
		 * Set the width of label, the width is from the start of label to the start of the field.
		 * @public
		 * @param {string | number} width 
		 * Unit of "pt","em","px" will be normalized to "px", and "px" by default for numeral value.
		 */
		_setLabelWidthAttr: function(/*String | Integer*/width){
			if(!width){ return; }
			var widthInPx = common.normalizedLength(width);
			query(".idxLabel", this.domNode).style("width", widthInPx + "px");
		},
		
		/**
		 * Set the width of field with a hidden validation icon.
		 * @public
		 * @param {string | number} width 
		 * Unit of "pt","em","px" will be normalized to "px", and "px" by default for numeral value.
		 */
		_setFieldWidthAttr: function(/*String | Integer*/width){
			if(!width){ return; }
			var widthInPx = common.normalizedLength(width);
			domStyle.set(this.oneuiBaseNode, "width", widthInPx + "px");
		},
		
		_isValidFocusNode: function(mousedownNode){
			return dom.isDescendant(mousedownNode, this.oneuiBaseNode) ||
				!dom.isDescendant(mousedownNode, this.domNode);
		},
		
		/**
		 * Reset the value and state of the composite widget.
		 * @public
		 */
		reset: function(){
			this.set("state", "");
			this.message = "";
			this.inherited(arguments);
		}
	});
});

},
'dijit/form/ToggleButton':function(){
define("dijit/form/ToggleButton", [
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"./Button",
	"./_ToggleButtonMixin"
], function(declare, kernel, Button, _ToggleButtonMixin){

/*=====
	var Button = dijit.form.Button;
	var _ToggleButtonMixin = dijit.form._ToggleButtonMixin;
=====*/

	// module:
	//		dijit/form/ToggleButton
	// summary:
	//		A templated button widget that can be in two states (checked or not).


	return declare("dijit.form.ToggleButton", [Button, _ToggleButtonMixin], {
		// summary:
		//		A templated button widget that can be in two states (checked or not).
		//		Can be base class for things like tabs or checkbox or radio buttons

		baseClass: "dijitToggleButton",

		setChecked: function(/*Boolean*/ checked){
			// summary:
			//		Deprecated.  Use set('checked', true/false) instead.
			kernel.deprecated("setChecked("+checked+") is deprecated. Use set('checked',"+checked+") instead.", "", "2.0");
			this.set('checked', checked);
		}
	});
});

},
'dojo/date/stamp':function(){
define("dojo/date/stamp", ["../_base/kernel", "../_base/lang", "../_base/array"], function(dojo, lang, array) {
	// module:
	//		dojo/date/stamp
	// summary:
	//		TODOC

lang.getObject("date.stamp", true, dojo);

// Methods to convert dates to or from a wire (string) format using well-known conventions

dojo.date.stamp.fromISOString = function(/*String*/formattedString, /*Number?*/defaultTime){
	//	summary:
	//		Returns a Date object given a string formatted according to a subset of the ISO-8601 standard.
	//
	//	description:
	//		Accepts a string formatted according to a profile of ISO8601 as defined by
	//		[RFC3339](http://www.ietf.org/rfc/rfc3339.txt), except that partial input is allowed.
	//		Can also process dates as specified [by the W3C](http://www.w3.org/TR/NOTE-datetime)
	//		The following combinations are valid:
	//
	//			* dates only
	//			|	* yyyy
	//			|	* yyyy-MM
	//			|	* yyyy-MM-dd
	// 			* times only, with an optional time zone appended
	//			|	* THH:mm
	//			|	* THH:mm:ss
	//			|	* THH:mm:ss.SSS
	// 			* and "datetimes" which could be any combination of the above
	//
	//		timezones may be specified as Z (for UTC) or +/- followed by a time expression HH:mm
	//		Assumes the local time zone if not specified.  Does not validate.  Improperly formatted
	//		input may return null.  Arguments which are out of bounds will be handled
	// 		by the Date constructor (e.g. January 32nd typically gets resolved to February 1st)
	//		Only years between 100 and 9999 are supported.
	//
  	//	formattedString:
	//		A string such as 2005-06-30T08:05:00-07:00 or 2005-06-30 or T08:05:00
	//
	//	defaultTime:
	//		Used for defaults for fields omitted in the formattedString.
	//		Uses 1970-01-01T00:00:00.0Z by default.

	if(!dojo.date.stamp._isoRegExp){
		dojo.date.stamp._isoRegExp =
//TODO: could be more restrictive and check for 00-59, etc.
			/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
	}

	var match = dojo.date.stamp._isoRegExp.exec(formattedString),
		result = null;

	if(match){
		match.shift();
		if(match[1]){match[1]--;} // Javascript Date months are 0-based
		if(match[6]){match[6] *= 1000;} // Javascript Date expects fractional seconds as milliseconds

		if(defaultTime){
			// mix in defaultTime.  Relatively expensive, so use || operators for the fast path of defaultTime === 0
			defaultTime = new Date(defaultTime);
			array.forEach(array.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop){
				return defaultTime["get" + prop]();
			}), function(value, index){
				match[index] = match[index] || value;
			});
		}
		result = new Date(match[0]||1970, match[1]||0, match[2]||1, match[3]||0, match[4]||0, match[5]||0, match[6]||0); //TODO: UTC defaults
		if(match[0] < 100){
			result.setFullYear(match[0] || 1970);
		}

		var offset = 0,
			zoneSign = match[7] && match[7].charAt(0);
		if(zoneSign != 'Z'){
			offset = ((match[8] || 0) * 60) + (Number(match[9]) || 0);
			if(zoneSign != '-'){ offset *= -1; }
		}
		if(zoneSign){
			offset -= result.getTimezoneOffset();
		}
		if(offset){
			result.setTime(result.getTime() + offset * 60000);
		}
	}

	return result; // Date or null
};

/*=====
	dojo.date.stamp.__Options = function(){
		//	selector: String
		//		"date" or "time" for partial formatting of the Date object.
		//		Both date and time will be formatted by default.
		//	zulu: Boolean
		//		if true, UTC/GMT is used for a timezone
		//	milliseconds: Boolean
		//		if true, output milliseconds
		this.selector = selector;
		this.zulu = zulu;
		this.milliseconds = milliseconds;
	}
=====*/

dojo.date.stamp.toISOString = function(/*Date*/dateObject, /*dojo.date.stamp.__Options?*/options){
	//	summary:
	//		Format a Date object as a string according a subset of the ISO-8601 standard
	//
	//	description:
	//		When options.selector is omitted, output follows [RFC3339](http://www.ietf.org/rfc/rfc3339.txt)
	//		The local time zone is included as an offset from GMT, except when selector=='time' (time without a date)
	//		Does not check bounds.  Only years between 100 and 9999 are supported.
	//
	//	dateObject:
	//		A Date object

	var _ = function(n){ return (n < 10) ? "0" + n : n; };
	options = options || {};
	var formattedDate = [],
		getter = options.zulu ? "getUTC" : "get",
		date = "";
	if(options.selector != "time"){
		var year = dateObject[getter+"FullYear"]();
		date = ["0000".substr((year+"").length)+year, _(dateObject[getter+"Month"]()+1), _(dateObject[getter+"Date"]())].join('-');
	}
	formattedDate.push(date);
	if(options.selector != "date"){
		var time = [_(dateObject[getter+"Hours"]()), _(dateObject[getter+"Minutes"]()), _(dateObject[getter+"Seconds"]())].join(':');
		var millis = dateObject[getter+"Milliseconds"]();
		if(options.milliseconds){
			time += "."+ (millis < 100 ? "0" : "") + _(millis);
		}
		if(options.zulu){
			time += "Z";
		}else if(options.selector != "time"){
			var timezoneOffset = dateObject.getTimezoneOffset();
			var absOffset = Math.abs(timezoneOffset);
			time += (timezoneOffset > 0 ? "-" : "+") +
				_(Math.floor(absOffset/60)) + ":" + _(absOffset%60);
		}
		formattedDate.push(time);
	}
	return formattedDate.join('T'); // String
};

return dojo.date.stamp;
});

},
'dojo/Stateful':function(){
define("dojo/Stateful", ["./_base/declare", "./_base/lang", "./_base/array"], function(declare, lang, array) {
	// module:
	//		dojo/Stateful
	// summary:
	//		TODOC

return declare("dojo.Stateful", null, {
	// summary:
	//		Base class for objects that provide named properties with optional getter/setter
	//		control and the ability to watch for property changes
	// example:
	//	|	var obj = new dojo.Stateful();
	//	|	obj.watch("foo", function(){
	//	|		console.log("foo changed to " + this.get("foo"));
	//	|	});
	//	|	obj.set("foo","bar");
	postscript: function(mixin){
		if(mixin){
			lang.mixin(this, mixin);
		}
	},

	get: function(/*String*/name){
		// summary:
		//		Get a property on a Stateful instance.
		//	name:
		//		The property to get.
		//	returns:
		//		The property value on this Stateful instance.
		// description:
		//		Get a named property on a Stateful object. The property may
		//		potentially be retrieved via a getter method in subclasses. In the base class
		// 		this just retrieves the object's property.
		// 		For example:
		//	|	stateful = new dojo.Stateful({foo: 3});
		//	|	stateful.get("foo") // returns 3
		//	|	stateful.foo // returns 3

		return this[name]; //Any
	},
	set: function(/*String*/name, /*Object*/value){
		// summary:
		//		Set a property on a Stateful instance
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		//	returns:
		//		The function returns this dojo.Stateful instance.
		// description:
		//		Sets named properties on a stateful object and notifies any watchers of
		// 		the property. A programmatic setter may be defined in subclasses.
		// 		For example:
		//	|	stateful = new dojo.Stateful();
		//	|	stateful.watch(function(name, oldValue, value){
		//	|		// this will be called on the set below
		//	|	}
		//	|	stateful.set(foo, 5);
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myObj.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)
		if(typeof name === "object"){
			for(var x in name){
				if(name.hasOwnProperty(x) && x !="_watchCallbacks"){
					this.set(x, name[x]);
				}
			}
			return this;
		}
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks){
			this._watchCallbacks(name, oldValue, value);
		}
		return this; //dojo.Stateful
	},
	watch: function(/*String?*/name, /*Function*/callback){
		// summary:
		//		Watches a property for changes
		//	name:
		//		Indicates the property to watch. This is optional (the callback may be the
		// 		only parameter), and if omitted, all the properties will be watched
		// returns:
		//		An object handle for the watch. The unwatch method of this object
		// 		can be used to discontinue watching this property:
		//		|	var watchHandle = obj.watch("foo", callback);
		//		|	watchHandle.unwatch(); // callback won't be called now
		//	callback:
		//		The function to execute when the property changes. This will be called after
		//		the property has been changed. The callback will be called with the |this|
		//		set to the instance, the first argument as the name of the property, the
		// 		second argument as the old value and the third argument as the new value.

		var callbacks = this._watchCallbacks;
		if(!callbacks){
			var self = this;
			callbacks = this._watchCallbacks = function(name, oldValue, value, ignoreCatchall){
				var notify = function(propertyCallbacks){
					if(propertyCallbacks){
						propertyCallbacks = propertyCallbacks.slice();
						for(var i = 0, l = propertyCallbacks.length; i < l; i++){
							propertyCallbacks[i].call(self, name, oldValue, value);
						}
					}
				};
				notify(callbacks['_' + name]);
				if(!ignoreCatchall){
					notify(callbacks["*"]); // the catch-all
				}
			}; // we use a function instead of an object so it will be ignored by JSON conversion
		}
		if(!callback && typeof name === "function"){
			callback = name;
			name = "*";
		}else{
			// prepend with dash to prevent name conflicts with function (like "name" property)
			name = '_' + name;
		}
		var propertyCallbacks = callbacks[name];
		if(typeof propertyCallbacks !== "object"){
			propertyCallbacks = callbacks[name] = [];
		}
		propertyCallbacks.push(callback);
		return {
			unwatch: function(){
				propertyCallbacks.splice(array.indexOf(propertyCallbacks, callback), 1);
			}
		}; //Object
	}

});

});

},
'dijit/form/_AutoCompleterMixin':function(){
define("dijit/form/_AutoCompleterMixin", [
	"dojo/_base/connect", // keys keys.SHIFT
	"dojo/data/util/filter", // patternToRegExp
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred", // Deferred.when
	"dojo/dom-attr", // domAttr.get
	"dojo/_base/event", // event.stop
	"dojo/keys",
	"dojo/_base/lang", // lang.clone lang.hitch
	"dojo/query", // query
	"dojo/regexp", // regexp.escapeString
	"dojo/_base/sniff", // has("ie")
	"dojo/string", // string.substitute
	"dojo/_base/window", // win.doc.selection.createRange
	"./DataList",
	"../registry",	// registry.byId
	"./_TextBoxMixin"	// defines _TextBoxMixin.selectInputText
], function(connect, filter, declare, Deferred, domAttr, event, keys, lang, query, regexp, has, string, win,
			DataList, registry, _TextBoxMixin){

	// module:
	//		dijit/form/_AutoCompleterMixin
	// summary:
	//		A mixin that implements the base functionality for `dijit.form.ComboBox`/`dijit.form.FilteringSelect`


	return declare("dijit.form._AutoCompleterMixin", null, {
		// summary:
		//		A mixin that implements the base functionality for `dijit.form.ComboBox`/`dijit.form.FilteringSelect`
		// description:
		//		All widgets that mix in dijit.form._AutoCompleterMixin must extend `dijit.form._FormValueWidget`.
		// tags:
		//		protected

		// item: Object
		//		This is the item returned by the dojo.data.store implementation that
		//		provides the data for this ComboBox, it's the currently selected item.
		item: null,

		// pageSize: Integer
		//		Argument to data provider.
		//		Specifies number of search results per page (before hitting "next" button)
		pageSize: Infinity,

		// store: [const] dojo.store.api.Store
		//		Reference to data provider object used by this ComboBox
		store: null,

		// fetchProperties: Object
		//		Mixin to the store's fetch.
		//		For example, to set the sort order of the ComboBox menu, pass:
		//	|	{ sort: [{attribute:"name",descending: true}] }
		//		To override the default queryOptions so that deep=false, do:
		//	|	{ queryOptions: {ignoreCase: true, deep: false} }
		fetchProperties:{},

		// query: Object
		//		A query that can be passed to 'store' to initially filter the items,
		//		before doing further filtering based on `searchAttr` and the key.
		//		Any reference to the `searchAttr` is ignored.
		query: {},

		// autoComplete: Boolean
		//		If user types in a partial string, and then tab out of the `<input>` box,
		//		automatically copy the first entry displayed in the drop down list to
		//		the `<input>` field
		autoComplete: true,

		// highlightMatch: String
		// 		One of: "first", "all" or "none".
		//
		//		If the ComboBox/FilteringSelect opens with the search results and the searched
		//		string can be found, it will be highlighted.  If set to "all"
		//		then will probably want to change `queryExpr` parameter to '*${0}*'
		//
		//		Highlighting is only performed when `labelType` is "text", so as to not
		//		interfere with any HTML markup an HTML label might contain.
		highlightMatch: "first",

		// searchDelay: Integer
		//		Delay in milliseconds between when user types something and we start
		//		searching based on that value
		searchDelay: 100,

		// searchAttr: String
		//		Search for items in the data store where this attribute (in the item)
		//		matches what the user typed
		searchAttr: "name",

		// labelAttr: String?
		//		The entries in the drop down list come from this attribute in the
		//		dojo.data items.
		//		If not specified, the searchAttr attribute is used instead.
		labelAttr: "",

		// labelType: String
		//		Specifies how to interpret the labelAttr in the data store items.
		//		Can be "html" or "text".
		labelType: "text",

		// queryExpr: String
		//		This specifies what query ComboBox/FilteringSelect sends to the data store,
		//		based on what the user has typed.  Changing this expression will modify
		//		whether the drop down shows only exact matches, a "starting with" match,
		//		etc.  Use it in conjunction with highlightMatch.
		//		dojo.data query expression pattern.
		//		`${0}` will be substituted for the user text.
		//		`*` is used for wildcards.
		//		`${0}*` means "starts with", `*${0}*` means "contains", `${0}` means "is"
		queryExpr: "${0}*",

		// ignoreCase: Boolean
		//		Set true if the ComboBox/FilteringSelect should ignore case when matching possible items
		ignoreCase: true,

		// Flags to _HasDropDown to limit height of drop down to make it fit in viewport
		maxHeight: -1,

		// For backwards compatibility let onClick events propagate, even clicks on the down arrow button
		_stopClickEvents: false,

		_getCaretPos: function(/*DomNode*/ element){
			// khtml 3.5.2 has selection* methods as does webkit nightlies from 2005-06-22
			var pos = 0;
			if(typeof(element.selectionStart) == "number"){
				// FIXME: this is totally borked on Moz < 1.3. Any recourse?
				pos = element.selectionStart;
			}else if(has("ie")){
				// in the case of a mouse click in a popup being handled,
				// then the win.doc.selection is not the textarea, but the popup
				// var r = win.doc.selection.createRange();
				// hack to get IE 6 to play nice. What a POS browser.
				var tr = win.doc.selection.createRange().duplicate();
				var ntr = element.createTextRange();
				tr.move("character",0);
				ntr.move("character",0);
				try{
					// If control doesn't have focus, you get an exception.
					// Seems to happen on reverse-tab, but can also happen on tab (seems to be a race condition - only happens sometimes).
					// There appears to be no workaround for this - googled for quite a while.
					ntr.setEndPoint("EndToEnd", tr);
					pos = String(ntr.text).replace(/\r/g,"").length;
				}catch(e){
					// If focus has shifted, 0 is fine for caret pos.
				}
			}
			return pos;
		},

		_setCaretPos: function(/*DomNode*/ element, /*Number*/ location){
			location = parseInt(location);
			_TextBoxMixin.selectInputText(element, location, location);
		},

		_setDisabledAttr: function(/*Boolean*/ value){
			// Additional code to set disabled state of ComboBox node.
			// Overrides _FormValueWidget._setDisabledAttr() or ValidationTextBox._setDisabledAttr().
			this.inherited(arguments);
			this.domNode.setAttribute("aria-disabled", value);
		},

		_abortQuery: function(){
			// stop in-progress query
			if(this.searchTimer){
				clearTimeout(this.searchTimer);
				this.searchTimer = null;
			}
			if(this._fetchHandle){
				if(this._fetchHandle.cancel){
					this._cancelingQuery = true;
					this._fetchHandle.cancel();
					this._cancelingQuery = false;
				}
				this._fetchHandle = null;
			}
		},

		_onInput: function(/*Event*/ evt){
			// summary:
			//		Handles paste events
			this.inherited(arguments);
			if(evt.charOrCode == 229){ // IME or cut/paste event
				this._onKey(evt);
			}
		},

		_onKey: function(/*Event*/ evt){
			// summary:
			//		Handles keyboard events

			if(this.disabled || this.readOnly){ return; }
			var key = evt.charOrCode;

			// except for cutting/pasting case - ctrl + x/v
			if(evt.altKey || ((evt.ctrlKey || evt.metaKey) && (key != 'x' && key != 'v')) || key == keys.SHIFT){
				return; // throw out weird key combinations and spurious events
			}

			var doSearch = false;
			var pw = this.dropDown;
			var highlighted = null;
			this._prev_key_backspace = false;
			this._abortQuery();

			// _HasDropDown will do some of the work:
			//		1. when drop down is not yet shown:
			//			- if user presses the down arrow key, call loadDropDown()
			//		2. when drop down is already displayed:
			//			- on ESC key, call closeDropDown()
			//			- otherwise, call dropDown.handleKey() to process the keystroke
			this.inherited(arguments);

			if(this._opened){
				highlighted = pw.getHighlightedOption();
			}
			switch(key){
				case keys.PAGE_DOWN:
				case keys.DOWN_ARROW:
				case keys.PAGE_UP:
				case keys.UP_ARROW:
					// Keystroke caused ComboBox_menu to move to a different item.
					// Copy new item to <input> box.
					if(this._opened){
						this._announceOption(highlighted);
					}
					event.stop(evt);
					break;

				case keys.ENTER:
					// prevent submitting form if user presses enter. Also
					// prevent accepting the value if either Next or Previous
					// are selected
					if(highlighted){
						// only stop event on prev/next
						if(highlighted == pw.nextButton){
							this._nextSearch(1);
							event.stop(evt);
							break;
						}else if(highlighted == pw.previousButton){
							this._nextSearch(-1);
							event.stop(evt);
							break;
						}
					}else{
						// Update 'value' (ex: KY) according to currently displayed text
						this._setBlurValue(); // set value if needed
						this._setCaretPos(this.focusNode, this.focusNode.value.length); // move cursor to end and cancel highlighting
					}
					// default case:
					// if enter pressed while drop down is open, or for FilteringSelect,
					// if we are in the middle of a query to convert a directly typed in value to an item,
					// prevent submit
					if(this._opened || this._fetchHandle){
						event.stop(evt);
					}
					// fall through

				case keys.TAB:
					var newvalue = this.get('displayedValue');
					//	if the user had More Choices selected fall into the
					//	_onBlur handler
					if(pw && (
						newvalue == pw._messages["previousMessage"] ||
						newvalue == pw._messages["nextMessage"])
					){
						break;
					}
					if(highlighted){
						this._selectOption(highlighted);
					}
					// fall through

				case keys.ESCAPE:
					if(this._opened){
						this._lastQuery = null; // in case results come back later
						this.closeDropDown();
					}
					break;

				case ' ':
					if(highlighted){
						// user is effectively clicking a choice in the drop down menu
						event.stop(evt);
						this._selectOption(highlighted);
						this.closeDropDown();
					}else{
						// user typed a space into the input box, treat as normal character
						doSearch = true;
					}
					break;

				case keys.DELETE:
				case keys.BACKSPACE:
					this._prev_key_backspace = true;
					doSearch = true;
					break;

				default:
					// Non char keys (F1-F12 etc..)  shouldn't open list.
					// Ascii characters and IME input (Chinese, Japanese etc.) should.
					//IME input produces keycode == 229.
					doSearch = typeof key == 'string' || key == 229;
			}
			if(doSearch){
				// need to wait a tad before start search so that the event
				// bubbles through DOM and we have value visible
				this.item = undefined; // undefined means item needs to be set
				this.searchTimer = setTimeout(lang.hitch(this, "_startSearchFromInput"),1);
			}
		},

		_autoCompleteText: function(/*String*/ text){
			// summary:
			// 		Fill in the textbox with the first item from the drop down
			// 		list, and highlight the characters that were
			// 		auto-completed. For example, if user typed "CA" and the
			// 		drop down list appeared, the textbox would be changed to
			// 		"California" and "ifornia" would be highlighted.

			var fn = this.focusNode;

			// IE7: clear selection so next highlight works all the time
			_TextBoxMixin.selectInputText(fn, fn.value.length);
			// does text autoComplete the value in the textbox?
			var caseFilter = this.ignoreCase? 'toLowerCase' : 'substr';
			if(text[caseFilter](0).indexOf(this.focusNode.value[caseFilter](0)) == 0){
				var cpos = this.autoComplete ? this._getCaretPos(fn) : fn.value.length;
				// only try to extend if we added the last character at the end of the input
				if((cpos+1) > fn.value.length){
					// only add to input node as we would overwrite Capitalisation of chars
					// actually, that is ok
					fn.value = text;//.substr(cpos);
					// visually highlight the autocompleted characters
					_TextBoxMixin.selectInputText(fn, cpos);
				}
			}else{
				// text does not autoComplete; replace the whole value and highlight
				fn.value = text;
				_TextBoxMixin.selectInputText(fn);
			}
		},

		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			// summary:
			//		Callback when a search completes.
			// description:
			//		1. generates drop-down list and calls _showResultList() to display it
			//		2. if this result list is from user pressing "more choices"/"previous choices"
			//			then tell screen reader to announce new option
			this._fetchHandle = null;
			if(	this.disabled ||
				this.readOnly ||
				(query[this.searchAttr] !== this._lastQuery)	// TODO: better way to avoid getting unwanted notify
			){
				return;
			}
			var wasSelected = this.dropDown.getHighlightedOption();
			this.dropDown.clearResultList();
			if(!results.length && options.start == 0){ // if no results and not just the previous choices button
				this.closeDropDown();
				return;
			}

			// Fill in the textbox with the first item from the drop down list,
			// and highlight the characters that were auto-completed. For
			// example, if user typed "CA" and the drop down list appeared, the
			// textbox would be changed to "California" and "ifornia" would be
			// highlighted.

			this.dropDown.createOptions(
				results,
				options,
				lang.hitch(this, "_getMenuLabelFromItem")
			);

			// show our list (only if we have content, else nothing)
			this._showResultList();

			// #4091:
			//		tell the screen reader that the paging callback finished by
			//		shouting the next choice
			if(options.direction){
				if(1 == options.direction){
					this.dropDown.highlightFirstOption();
				}else if(-1 == options.direction){
					this.dropDown.highlightLastOption();
				}
				if(wasSelected){
					this._announceOption(this.dropDown.getHighlightedOption());
				}
			}else if(this.autoComplete && !this._prev_key_backspace
				// when the user clicks the arrow button to show the full list,
				// startSearch looks for "*".
				// it does not make sense to autocomplete
				// if they are just previewing the options available.
				&& !/^[*]+$/.test(query[this.searchAttr].toString())){
				this._announceOption(this.dropDown.containerNode.firstChild.nextSibling); // 1st real item
			}
		},

		_showResultList: function(){
			// summary:
			//		Display the drop down if not already displayed, or if it is displayed, then
			//		reposition it if necessary (reposition may be necessary if drop down's height changed).
			this.closeDropDown(true);
			this.openDropDown();
			this.domNode.setAttribute("aria-expanded", "true");
		},

		loadDropDown: function(/*Function*/ /*===== callback =====*/){
			// Overrides _HasDropDown.loadDropDown().
			// This is called when user has pressed button icon or pressed the down arrow key
			// to open the drop down.

			this._startSearchAll();
		},

		isLoaded: function(){
			// signal to _HasDropDown that it needs to call loadDropDown() to load the
			// drop down asynchronously before displaying it
			return false;
		},

		closeDropDown: function(){
			// Overrides _HasDropDown.closeDropDown().  Closes the drop down (assuming that it's open).
			// This method is the callback when the user types ESC or clicking
			// the button icon while the drop down is open.  It's also called by other code.
			this._abortQuery();
			if(this._opened){
				this.inherited(arguments);
				this.domNode.setAttribute("aria-expanded", "false");
				this.focusNode.removeAttribute("aria-activedescendant");
			}
		},

		_setBlurValue: function(){
			// if the user clicks away from the textbox OR tabs away, set the
			// value to the textbox value
			// #4617:
			//		if value is now more choices or previous choices, revert
			//		the value
			var newvalue = this.get('displayedValue');
			var pw = this.dropDown;
			if(pw && (
				newvalue == pw._messages["previousMessage"] ||
				newvalue == pw._messages["nextMessage"]
				)
			){
				this._setValueAttr(this._lastValueReported, true);
			}else if(typeof this.item == "undefined"){
				// Update 'value' (ex: KY) according to currently displayed text
				this.item = null;
				this.set('displayedValue', newvalue);
			}else{
				if(this.value != this._lastValueReported){
					this._handleOnChange(this.value, true);
				}
				this._refreshState();
			}
		},

		_setItemAttr: function(/*item*/ item, /*Boolean?*/ priorityChange, /*String?*/ displayedValue){
			// summary:
			//		Set the displayed valued in the input box, and the hidden value
			//		that gets submitted, based on a dojo.data store item.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('item', value)
			// tags:
			//		private
			var value = '';
			if(item){
				if(!displayedValue){
					displayedValue = this.store._oldAPI ?	// remove getValue() for 2.0 (old dojo.data API)
						this.store.getValue(item, this.searchAttr) : item[this.searchAttr];
				}
				value = this._getValueField() != this.searchAttr ? this.store.getIdentity(item) : displayedValue;
			}
			this.set('value', value, priorityChange, displayedValue, item);
		},

		_announceOption: function(/*Node*/ node){
			// summary:
			//		a11y code that puts the highlighted option in the textbox.
			//		This way screen readers will know what is happening in the
			//		menu.

			if(!node){
				return;
			}
			// pull the text value from the item attached to the DOM node
			var newValue;
			if(node == this.dropDown.nextButton ||
				node == this.dropDown.previousButton){
				newValue = node.innerHTML;
				this.item = undefined;
				this.value = '';
			}else{
				var item = this.dropDown.items[node.getAttribute("item")];
				newValue = (this.store._oldAPI ? 	// remove getValue() for 2.0 (old dojo.data API)
					this.store.getValue(item, this.searchAttr) : item[this.searchAttr]).toString();
				this.set('item', item, false, newValue);
			}
			// get the text that the user manually entered (cut off autocompleted text)
			this.focusNode.value = this.focusNode.value.substring(0, this._lastInput.length);
			// set up ARIA activedescendant
			this.focusNode.setAttribute("aria-activedescendant", domAttr.get(node, "id"));
			// autocomplete the rest of the option to announce change
			this._autoCompleteText(newValue);
		},

		_selectOption: function(/*DomNode*/ target){
			// summary:
			//		Menu callback function, called when an item in the menu is selected.
			this.closeDropDown();
			if(target){
				this._announceOption(target);
			}
			this._setCaretPos(this.focusNode, this.focusNode.value.length);
			this._handleOnChange(this.value, true);
		},

		_startSearchAll: function(){
			this._startSearch('');
		},

		_startSearchFromInput: function(){
			this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g, "\\$1"));
		},

		_getQueryString: function(/*String*/ text){
			return string.substitute(this.queryExpr, [text]);
		},

		_startSearch: function(/*String*/ key){
			// summary:
			//		Starts a search for elements matching key (key=="" means to return all items),
			//		and calls _openResultList() when the search completes, to display the results.
			if(!this.dropDown){
				var popupId = this.id + "_popup",
					dropDownConstructor = lang.isString(this.dropDownClass) ?
						lang.getObject(this.dropDownClass, false) : this.dropDownClass;
				this.dropDown = new dropDownConstructor({
					onChange: lang.hitch(this, this._selectOption),
					id: popupId,
					dir: this.dir,
					textDir: this.textDir
				});
				this.focusNode.removeAttribute("aria-activedescendant");
				this.textbox.setAttribute("aria-owns",popupId); // associate popup with textbox
			}
			this._lastInput = key; // Store exactly what was entered by the user.

			// Setup parameters to be passed to store.query().
			// Create a new query to prevent accidentally querying for a hidden
			// value from FilteringSelect's keyField
			var query = lang.clone(this.query); // #5970
			var options = {
				start: 0,
				count: this.pageSize,
				queryOptions: {		// remove for 2.0
					ignoreCase: this.ignoreCase,
					deep: true
				}
			};
			lang.mixin(options, this.fetchProperties);

			// Generate query
			var qs = this._getQueryString(key), q;
			if(this.store._oldAPI){
				// remove this branch for 2.0
				q = qs;
			}else{
				// Query on searchAttr is a regex for benefit of dojo.store.Memory,
				// but with a toString() method to help dojo.store.JsonRest.
				// Search string like "Co*" converted to regex like /^Co.*$/i.
				q = filter.patternToRegExp(qs, this.ignoreCase);
				q.toString = function(){ return qs; };
			}
			this._lastQuery = query[this.searchAttr] = q;

			// Function to run the query, wait for the results, and then call _openResultList()
			var _this = this,
				startQuery = function(){
					var resPromise = _this._fetchHandle = _this.store.query(query, options);
					Deferred.when(resPromise, function(res){
						_this._fetchHandle = null;
						res.total = resPromise.total;
						_this._openResultList(res, query, options);
					}, function(err){
						_this._fetchHandle = null;
						if(!_this._cancelingQuery){	// don't treat canceled query as an error
							console.error(_this.declaredClass + ' ' + err.toString());
							_this.closeDropDown();
						}
					});
				};

			// #5970: set _lastQuery, *then* start the timeout
			// otherwise, if the user types and the last query returns before the timeout,
			// _lastQuery won't be set and their input gets rewritten

			this.searchTimer = setTimeout(lang.hitch(this, function(query, _this){
				this.searchTimer = null;

				startQuery();

				// Setup method to handle clicking next/previous buttons to page through results
				this._nextSearch = this.dropDown.onPage = function(direction){
					options.start += options.count * direction;
					//	tell callback the direction of the paging so the screen
					//	reader knows which menu option to shout
					options.direction = direction;
					startQuery();
					_this.focus();
				};
			}, query, this), this.searchDelay);
		},

		_getValueField: function(){
			// summary:
			//		Helper for postMixInProperties() to set this.value based on data inlined into the markup.
			//		Returns the attribute name in the item (in dijit.form._ComboBoxDataStore) to use as the value.
			return this.searchAttr;
		},

		//////////// INITIALIZATION METHODS ///////////////////////////////////////

		constructor: function(){
			this.query={};
			this.fetchProperties={};
		},

		postMixInProperties: function(){
			if(!this.store){
				var srcNodeRef = this.srcNodeRef;
				var list = this.list;
				if(list){
					this.store = registry.byId(list);
				}else{
					// if user didn't specify store, then assume there are option tags
					this.store = new DataList({}, srcNodeRef);
				}

				// if there is no value set and there is an option list, set
				// the value to the first value to be consistent with native Select
				// Firefox and Safari set value
				// IE6 and Opera set selectedIndex, which is automatically set
				// by the selected attribute of an option tag
				// IE6 does not set value, Opera sets value = selectedIndex
				if(!("value" in this.params)){
					var item = (this.item = this.store.fetchSelectedItem());
					if(item){
						var valueField = this._getValueField();
						// remove getValue() for 2.0 (old dojo.data API)
						this.value = this.store._oldAPI ? this.store.getValue(item, valueField) : item[valueField];
					}
				}
			}

			this.inherited(arguments);
		},

		postCreate: function(){
			// summary:
			//		Subclasses must call this method from their postCreate() methods
			// tags:
			//		protected

			// find any associated label element and add to ComboBox node.
			var label=query('label[for="'+this.id+'"]');
			if(label.length){
				label[0].id = (this.id+"_label");
				this.domNode.setAttribute("aria-labelledby", label[0].id);

			}
			this.inherited(arguments);
		},

		_getMenuLabelFromItem: function(/*Item*/ item){
			var label = this.labelFunc(item, this.store),
				labelType = this.labelType;
			// If labelType is not "text" we don't want to screw any markup ot whatever.
			if(this.highlightMatch != "none" && this.labelType == "text" && this._lastInput){
				label = this.doHighlight(label, this._escapeHtml(this._lastInput));
				labelType = "html";
			}
			return {html: labelType == "html", label: label};
		},

		doHighlight: function(/*String*/ label, /*String*/ find){
			// summary:
			//		Highlights the string entered by the user in the menu.  By default this
			//		highlights the first occurrence found. Override this method
			//		to implement your custom highlighting.
			// tags:
			//		protected

			var
				// Add (g)lobal modifier when this.highlightMatch == "all" and (i)gnorecase when this.ignoreCase == true
				modifiers = (this.ignoreCase ? "i" : "") + (this.highlightMatch == "all" ? "g" : ""),
				i = this.queryExpr.indexOf("${0}");
			find = regexp.escapeString(find); // escape regexp special chars
			return this._escapeHtml(label).replace(
				// prepend ^ when this.queryExpr == "${0}*" and append $ when this.queryExpr == "*${0}"
				new RegExp((i == 0 ? "^" : "") + "("+ find +")" + (i == (this.queryExpr.length - 4) ? "$" : ""), modifiers),
				'<span class="dijitComboBoxHighlightMatch">$1</span>'
			); // returns String, (almost) valid HTML (entities encoded)
		},

		_escapeHtml: function(/*String*/ str){
			// TODO Should become dojo.html.entities(), when exists use instead
			// summary:
			//		Adds escape sequences for special characters in XML: &<>"'
			str = String(str).replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
				.replace(/>/gm, "&gt;").replace(/"/gm, "&quot;"); //balance"
			return str; // string
		},

		reset: function(){
			// Overrides the _FormWidget.reset().
			// Additionally reset the .item (to clean up).
			this.item = null;
			this.inherited(arguments);
		},

		labelFunc: function(/*item*/ item, /*dojo.store.api.Store*/ store){
			// summary:
			//		Computes the label to display based on the dojo.data store item.
			// returns:
			//		The label that the ComboBox should display
			// tags:
			//		private

			// Use toString() because XMLStore returns an XMLItem whereas this
			// method is expected to return a String (#9354).
			// Remove getValue() for 2.0 (old dojo.data API)
			return (store._oldAPI ? store.getValue(item, this.labelAttr || this.searchAttr) :
				item[this.labelAttr || this.searchAttr]).toString(); // String
		},

		_setValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the select.
			this._set("item", item||null); // value not looked up in store
			if(!value){ value = ''; } // null translates to blank
			this.inherited(arguments);
		},
		_setTextDirAttr: function(/*String*/ textDir){
			// summary:
			//		Setter for textDir, needed for the dropDown's textDir update.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('textDir', value)
			// tags:
			//		private
			this.inherited(arguments);
			// update the drop down also (_ComboBoxMenuMixin)
			if(this.dropDown){
				this.dropDown._set("textDir", textDir);
			}
		}
	});
});

},
'url:dijit/layout/templates/_ScrollingTabControllerButton.html':"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>",
'dijit/form/MappedTextBox':function(){
define("dijit/form/MappedTextBox", [
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.place
	"./ValidationTextBox"
], function(declare, domConstruct, ValidationTextBox){

/*=====
	var ValidationTextBox = dijit.form.ValidationTextBox;
=====*/

	// module:
	//		dijit/form/MappedTextBox
	// summary:
	//		A dijit.form.ValidationTextBox subclass which provides a base class for widgets that have
	//		a visible formatted display value, and a serializable
	//		value in a hidden input field which is actually sent to the server.

	return declare("dijit.form.MappedTextBox", ValidationTextBox, {
		// summary:
		//		A dijit.form.ValidationTextBox subclass which provides a base class for widgets that have
		//		a visible formatted display value, and a serializable
		//		value in a hidden input field which is actually sent to the server.
		// description:
		//		The visible display may
		//		be locale-dependent and interactive.  The value sent to the server is stored in a hidden
		//		input field which uses the `name` attribute declared by the original widget.  That value sent
		//		to the server is defined by the dijit.form.MappedTextBox.serialize method and is typically
		//		locale-neutral.
		// tags:
		//		protected

		postMixInProperties: function(){
			this.inherited(arguments);

			// we want the name attribute to go to the hidden <input>, not the displayed <input>,
			// so override _FormWidget.postMixInProperties() setting of nameAttrSetting
			this.nameAttrSetting = "";
		},

		// Override default behavior to assign name to focusNode
		_setNameAttr: null,

		serialize: function(val /*=====, options =====*/){
			// summary:
			//		Overridable function used to convert the get('value') result to a canonical
			//		(non-localized) string.  For example, will print dates in ISO format, and
			//		numbers the same way as they are represented in javascript.
			// val: anything
			// options: Object?
			// tags:
			//		protected extension
			return val.toString ? val.toString() : ""; // String
		},

		toString: function(){
			// summary:
			//		Returns widget as a printable string using the widget's value
			// tags:
			//		protected
			var val = this.filter(this.get('value')); // call filter in case value is nonstring and filter has been customized
			return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; // String
		},

		validate: function(){
			// Overrides `dijit.form.TextBox.validate`
			this.valueNode.value = this.toString();
			return this.inherited(arguments);
		},

		buildRendering: function(){
			// Overrides `dijit._TemplatedMixin.buildRendering`

			this.inherited(arguments);

			// Create a hidden <input> node with the serialized value used for submit
			// (as opposed to the displayed value).
			// Passing in name as markup rather than calling domConstruct.create() with an attrs argument
			// to make query(input[name=...]) work on IE. (see #8660)
			this.valueNode = domConstruct.place("<input type='hidden'" + (this.name ? " name='" + this.name.replace(/'/g, "&quot;") + "'" : "") + "/>", this.textbox, "after");
		},

		reset: function(){
			// Overrides `dijit.form.ValidationTextBox.reset` to
			// reset the hidden textbox value to ''
			this.valueNode.value = '';
			this.inherited(arguments);
		}
	});
});

},
'dijit/form/ComboBoxMixin':function(){
require({cache:{
'url:dijit/form/templates/DropDownBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/ComboBoxMixin", [
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred",
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.mixin
	"dojo/store/util/QueryResults",	// dojo.store.util.QueryResults
	"./_AutoCompleterMixin",
	"./_ComboBoxMenu",
	"../_HasDropDown",
	"dojo/text!./templates/DropDownBox.html"
], function(declare, Deferred, kernel, lang, QueryResults, _AutoCompleterMixin, _ComboBoxMenu, _HasDropDown, template){

/*=====
	var _AutoCompleterMixin = dijit.form._AutoCompleterMixin;
	var _ComboBoxMenu = dijit.form._ComboBoxMenu;
	var _HasDropDown = dijit._HasDropDown;
=====*/

	// module:
	//		dijit/form/ComboBoxMixin
	// summary:
	//		Provides main functionality of ComboBox widget

	return declare("dijit.form.ComboBoxMixin", [_HasDropDown, _AutoCompleterMixin], {
		// summary:
		//		Provides main functionality of ComboBox widget

		// dropDownClass: [protected extension] Function String
		//		Dropdown widget class used to select a date/time.
		//		Subclasses should specify this.
		dropDownClass: _ComboBoxMenu,

		// hasDownArrow: Boolean
		//		Set this textbox to have a down arrow button, to display the drop down list.
		//		Defaults to true.
		hasDownArrow: true,

		templateString: template,

		baseClass: "dijitTextBox dijitComboBox",

		/*=====
		// store: [const] dojo.store.api.Store || dojo.data.api.Read
		//		Reference to data provider object used by this ComboBox.
		//
		//		Should be dojo.store.api.Store, but dojo.data.api.Read supported
		//		for backwards compatibility.
		store: null,
		=====*/

		// Set classes like dijitDownArrowButtonHover depending on
		// mouse action over button node
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},

		_setHasDownArrowAttr: function(/*Boolean*/ val){
			this._set("hasDownArrow", val);
			this._buttonNode.style.display = val ? "" : "none";
		},

		_showResultList: function(){
			// hide the tooltip
			this.displayMessage("");
			this.inherited(arguments);
		},

		_setStoreAttr: function(store){
			// For backwards-compatibility, accept dojo.data store in addition to dojo.store.store.  Remove in 2.0.
			if(!store.get){
				lang.mixin(store, {
					_oldAPI: true,
					get: function(id){
						// summary:
						//		Retrieves an object by it's identity. This will trigger a fetchItemByIdentity.
						//		Like dojo.store.DataStore.get() except returns native item.
						var deferred = new Deferred();
						this.fetchItemByIdentity({
							identity: id,
							onItem: function(object){
								deferred.resolve(object);
							},
							onError: function(error){
								deferred.reject(error);
							}
						});
						return deferred.promise;
					},
					query: function(query, options){
						// summary:
						//		Queries the store for objects.   Like dojo.store.DataStore.query()
						//		except returned Deferred contains array of native items.
						var deferred = new Deferred(function(){ fetchHandle.abort && fetchHandle.abort(); });
						var fetchHandle = this.fetch(lang.mixin({
							query: query,
							onBegin: function(count){
								deferred.total = count;
							},
							onComplete: function(results){
								deferred.resolve(results);
							},
							onError: function(error){
								deferred.reject(error);
							}
						}, options));
						return QueryResults(deferred);
					}
				});
			}
			this._set("store", store);
		},

		postMixInProperties: function(){
			// Since _setValueAttr() depends on this.store, _setStoreAttr() needs to execute first.
			// Unfortunately, without special code, it ends up executing second.
			if(this.params.store){
				this._setStoreAttr(this.params.store);
			}

			this.inherited(arguments);

			// User may try to access this.store.getValue() etc.  in a custom labelFunc() function.
			// It's not available with the new data store for handling inline <option> tags, so add it.
			if(!this.params.store){
				var clazz = this.declaredClass;
				lang.mixin(this.store, {
					getValue: function(item, attr){
						kernel.deprecated(clazz + ".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly", "", "2.0");
						return item[attr];
					},
					getLabel: function(item){
						kernel.deprecated(clazz + ".store.getLabel(item) is deprecated for builtin store.  Use item.label directly", "", "2.0");
						return item.name;
					},
					fetch: function(args){
						kernel.deprecated(clazz + ".store.fetch() is deprecated for builtin store.", "Use store.query()", "2.0");
						var shim = ["dojo/data/ObjectStore"];	// indirection so it doesn't get rolled into a build
						require(shim, lang.hitch(this, function(ObjectStore){
							new ObjectStore({objectStore: this}).fetch(args);
						}));
					}
				});
			}
		}
	});
});

},
'dijit/form/_TextBoxMixin':function(){
define("dijit/form/_TextBoxMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.byId
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys.ALT keys.CAPS_LOCK keys.CTRL keys.META keys.SHIFT
	"dojo/_base/lang", // lang.mixin
	".."	// for exporting dijit._setSelectionRange, dijit.selectInputText
], function(array, declare, dom, event, keys, lang, dijit){

// module:
//		dijit/form/_TextBoxMixin
// summary:
//		A mixin for textbox form input widgets

var _TextBoxMixin = declare("dijit.form._TextBoxMixin", null, {
	// summary:
	//		A mixin for textbox form input widgets

	// trim: Boolean
	//		Removes leading and trailing whitespace if true.  Default is false.
	trim: false,

	// uppercase: Boolean
	//		Converts all characters to uppercase if true.  Default is false.
	uppercase: false,

	// lowercase: Boolean
	//		Converts all characters to lowercase if true.  Default is false.
	lowercase: false,

	// propercase: Boolean
	//		Converts the first character of each word to uppercase if true.
	propercase: false,

	// maxLength: String
	//		HTML INPUT tag maxLength declaration.
	maxLength: "",

	// selectOnClick: [const] Boolean
	//		If true, all text will be selected when focused with mouse
	selectOnClick: false,

	// placeHolder: String
	//		Defines a hint to help users fill out the input field (as defined in HTML 5).
	//		This should only contain plain text (no html markup).
	placeHolder: "",

	_getValueAttr: function(){
		// summary:
		//		Hook so get('value') works as we like.
		// description:
		//		For `dijit.form.TextBox` this basically returns the value of the <input>.
		//
		//		For `dijit.form.MappedTextBox` subclasses, which have both
		//		a "displayed value" and a separate "submit value",
		//		This treats the "displayed value" as the master value, computing the
		//		submit value from it via this.parse().
		return this.parse(this.get('displayedValue'), this.constraints);
	},

	_setValueAttr: function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
		// summary:
		//		Hook so set('value', ...) works.
		//
		// description:
		//		Sets the value of the widget to "value" which can be of
		//		any type as determined by the widget.
		//
		// value:
		//		The visual element value is also set to a corresponding,
		//		but not necessarily the same, value.
		//
		// formattedValue:
		//		If specified, used to set the visual element value,
		//		otherwise a computed visual value is used.
		//
		// priorityChange:
		//		If true, an onChange event is fired immediately instead of
		//		waiting for the next blur event.

		var filteredValue;
		if(value !== undefined){
			// TODO: this is calling filter() on both the display value and the actual value.
			// I added a comment to the filter() definition about this, but it should be changed.
			filteredValue = this.filter(value);
			if(typeof formattedValue != "string"){
				if(filteredValue !== null && ((typeof filteredValue != "number") || !isNaN(filteredValue))){
					formattedValue = this.filter(this.format(filteredValue, this.constraints));
				}else{ formattedValue = ''; }
			}
		}
		if(formattedValue != null && formattedValue != undefined && ((typeof formattedValue) != "number" || !isNaN(formattedValue)) && this.textbox.value != formattedValue){
			this.textbox.value = formattedValue;
			this._set("displayedValue", this.get("displayedValue"));
		}

		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, formattedValue);
		}

		this.inherited(arguments, [filteredValue, priorityChange]);
	},

	// displayedValue: String
	//		For subclasses like ComboBox where the displayed value
	//		(ex: Kentucky) and the serialized value (ex: KY) are different,
	//		this represents the displayed value.
	//
	//		Setting 'displayedValue' through set('displayedValue', ...)
	//		updates 'value', and vice-versa.  Otherwise 'value' is updated
	//		from 'displayedValue' periodically, like onBlur etc.
	//
	//		TODO: move declaration to MappedTextBox?
	//		Problem is that ComboBox references displayedValue,
	//		for benefit of FilteringSelect.
	displayedValue: "",

	_getDisplayedValueAttr: function(){
		// summary:
		//		Hook so get('displayedValue') works.
		// description:
		//		Returns the displayed value (what the user sees on the screen),
		// 		after filtering (ie, trimming spaces etc.).
		//
		//		For some subclasses of TextBox (like ComboBox), the displayed value
		//		is different from the serialized value that's actually
		//		sent to the server (see dijit.form.ValidationTextBox.serialize)

		// TODO: maybe we should update this.displayedValue on every keystroke so that we don't need
		// this method
		// TODO: this isn't really the displayed value when the user is typing
		return this.filter(this.textbox.value);
	},

	_setDisplayedValueAttr: function(/*String*/ value){
		// summary:
		//		Hook so set('displayedValue', ...) works.
		// description:
		//		Sets the value of the visual element to the string "value".
		//		The widget value is also set to a corresponding,
		//		but not necessarily the same, value.

		if(value === null || value === undefined){ value = '' }
		else if(typeof value != "string"){ value = String(value) }

		this.textbox.value = value;

		// sets the serialized value to something corresponding to specified displayedValue
		// (if possible), and also updates the textbox.value, for example converting "123"
		// to "123.00"
		this._setValueAttr(this.get('value'), undefined);

		this._set("displayedValue", this.get('displayedValue'));

		// textDir support
		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, value);
		}
	},

	format: function(value /*=====, constraints =====*/){
		// summary:
		//		Replaceable function to convert a value to a properly formatted string.
		// value: String
		// constraints: Object
		// tags:
		//		protected extension
		return ((value == null || value == undefined) ? "" : (value.toString ? value.toString() : value));
	},

	parse: function(value /*=====, constraints =====*/){
		// summary:
		//		Replaceable function to convert a formatted string to a value
		// value: String
		// constraints: Object
		// tags:
		//		protected extension

		return value;	// String
	},

	_refreshState: function(){
		// summary:
		//		After the user types some characters, etc., this method is
		//		called to check the field for validity etc.  The base method
		//		in `dijit.form.TextBox` does nothing, but subclasses override.
		// tags:
		//		protected
	},

	/*=====
	onInput: function(event){
		// summary:
		//		Connect to this function to receive notifications of various user data-input events.
		//		Return false to cancel the event and prevent it from being processed.
		// event:
		//		keydown | keypress | cut | paste | input
		// tags:
		//		callback
	},
	=====*/
	onInput: function(){},

	__skipInputEvent: false,
	_onInput: function(){
		// summary:
		//		Called AFTER the input event has happened
		// set text direction according to textDir that was defined in creation
		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, this.focusNode.value);
		}

		this._refreshState();

		// In case someone is watch()'ing for changes to displayedValue
		this._set("displayedValue", this.get("displayedValue"));
	},

	postCreate: function(){
		// setting the value here is needed since value="" in the template causes "undefined"
		// and setting in the DOM (instead of the JS object) helps with form reset actions
		this.textbox.setAttribute("value", this.textbox.value); // DOM and JS values should be the same

		this.inherited(arguments);

		// normalize input events to reduce spurious event processing
		//	onkeydown: do not forward modifier keys
		//	           set charOrCode to numeric keycode
		//	onkeypress: do not forward numeric charOrCode keys (already sent through onkeydown)
		//	onpaste & oncut: set charOrCode to 229 (IME)
		//	oninput: if primary event not already processed, set charOrCode to 229 (IME), else do not forward
		var handleEvent = function(e){
			var charCode = e.charOrCode || e.keyCode || 229;
			if(e.type == "keydown"){
				switch(charCode){ // ignore "state" keys
					case keys.SHIFT:
					case keys.ALT:
					case keys.CTRL:
					case keys.META:
					case keys.CAPS_LOCK:
						return;
					default:
						if(charCode >= 65 && charCode <= 90){ return; } // keydown for A-Z can be processed with keypress
				}
			}
			if(e.type == "keypress" && typeof charCode != "string"){ return; }
			if(e.type == "input"){
				if(this.__skipInputEvent){ // duplicate event
					this.__skipInputEvent = false;
					return;
				}
			}else{
				this.__skipInputEvent = true;
			}
			// create fake event to set charOrCode and to know if preventDefault() was called
			var faux = lang.mixin({}, e, {
				charOrCode: charCode,
				wasConsumed: false,
				preventDefault: function(){
					faux.wasConsumed = true;
					e.preventDefault();
				},
				stopPropagation: function(){ e.stopPropagation(); }
			});
			// give web page author a chance to consume the event
			if(this.onInput(faux) === false){
				event.stop(faux); // return false means stop
			}
			if(faux.wasConsumed){ return; } // if preventDefault was called
			setTimeout(lang.hitch(this, "_onInput", faux), 0); // widget notification after key has posted
		};
		array.forEach([ "onkeydown", "onkeypress", "onpaste", "oncut", "oninput", "oncompositionend" ], function(event){
			this.connect(this.textbox, event, handleEvent);
		}, this);
	},

	_blankValue: '', // if the textbox is blank, what value should be reported
	filter: function(val){
		// summary:
		//		Auto-corrections (such as trimming) that are applied to textbox
		//		value on blur or form submit.
		// description:
		//		For MappedTextBox subclasses, this is called twice
		// 			- once with the display value
		//			- once the value as set/returned by set('value', ...)
		//		and get('value'), ex: a Number for NumberTextBox.
		//
		//		In the latter case it does corrections like converting null to NaN.  In
		//		the former case the NumberTextBox.filter() method calls this.inherited()
		//		to execute standard trimming code in TextBox.filter().
		//
		//		TODO: break this into two methods in 2.0
		//
		// tags:
		//		protected extension
		if(val === null){ return this._blankValue; }
		if(typeof val != "string"){ return val; }
		if(this.trim){
			val = lang.trim(val);
		}
		if(this.uppercase){
			val = val.toUpperCase();
		}
		if(this.lowercase){
			val = val.toLowerCase();
		}
		if(this.propercase){
			val = val.replace(/[^\s]+/g, function(word){
				return word.substring(0,1).toUpperCase() + word.substring(1);
			});
		}
		return val;
	},

	_setBlurValue: function(){
		this._setValueAttr(this.get('value'), true);
	},

	_onBlur: function(e){
		if(this.disabled){ return; }
		this._setBlurValue();
		this.inherited(arguments);

		if(this._selectOnClickHandle){
			this.disconnect(this._selectOnClickHandle);
		}
	},

	_isTextSelected: function(){
		return this.textbox.selectionStart == this.textbox.selectionEnd;
	},

	_onFocus: function(/*String*/ by){
		if(this.disabled || this.readOnly){ return; }

		// Select all text on focus via click if nothing already selected.
		// Since mouse-up will clear the selection need to defer selection until after mouse-up.
		// Don't do anything on focus by tabbing into the widget since there's no associated mouse-up event.
		if(this.selectOnClick && by == "mouse"){
			this._selectOnClickHandle = this.connect(this.domNode, "onmouseup", function(){
				// Only select all text on first click; otherwise users would have no way to clear
				// the selection.
				this.disconnect(this._selectOnClickHandle);

				// Check if the user selected some text manually (mouse-down, mouse-move, mouse-up)
				// and if not, then select all the text
				if(this._isTextSelected()){
					_TextBoxMixin.selectInputText(this.textbox);
				}
			});
		}
		// call this.inherited() before refreshState(), since this.inherited() will possibly scroll the viewport
		// (to scroll the TextBox into view), which will affect how _refreshState() positions the tooltip
		this.inherited(arguments);

		this._refreshState();
	},

	reset: function(){
		// Overrides dijit._FormWidget.reset().
		// Additionally resets the displayed textbox value to ''
		this.textbox.value = '';
		this.inherited(arguments);
	},
	_setTextDirAttr: function(/*String*/ textDir){
		// summary:
		//		Setter for textDir.
		// description:
		//		Users shouldn't call this function; they should be calling
		//		set('textDir', value)
		// tags:
		//		private

		// only if new textDir is different from the old one
		// and on widgets creation.
		if(!this._created
			|| this.textDir != textDir){
				this._set("textDir", textDir);
				// so the change of the textDir will take place immediately.
				this.applyTextDir(this.focusNode, this.focusNode.value);
		}
	}
});


_TextBoxMixin._setSelectionRange = dijit._setSelectionRange = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
	if(element.setSelectionRange){
		element.setSelectionRange(start, stop);
	}
};

_TextBoxMixin.selectInputText = dijit.selectInputText = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
	// summary:
	//		Select text in the input element argument, from start (default 0), to stop (default end).

	// TODO: use functions in _editor/selection.js?
	element = dom.byId(element);
	if(isNaN(start)){ start = 0; }
	if(isNaN(stop)){ stop = element.value ? element.value.length : 0; }
	try{
		element.focus();
		_TextBoxMixin._setSelectionRange(element, start, stop);
	}catch(e){ /* squelch random errors (esp. on IE) from unexpected focus changes or DOM nodes being hidden */ }
};

return _TextBoxMixin;
});

},
'url:dijit/layout/templates/_TabButton.html':"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n",
'curam/util/Dialog':function(){
/*
 * Copyright 2010-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/**
 * @name curam.util.Dialog
 * @namespace Provides the ability to open arbitrary (non-UIM) content
 * in a Curam dialog.
 * 
 * It is required that the non-UIM page you are opening in a dialog resides
 * on the same Internet domain as the Curam application you are integrating
 * with.
 * <p/>
 * To open a custom page in a dialog you have to <ul>
 * <li> in the Curam application make the API call to load the custom page
 *      in a dialog </li>
 * <li> hook the custom page into the dialog API </li> </ul>
 * 
 * To hook the custom page into the dialog API, you first need to load the code,
 * preferably using <code>dojo.require("curam.util.Dialog");</code>
 * This assumes that you are using Dojo and you have access to the Curam
 * infrastructure JavaScript libraries.
 * <p/>
 * If this is not true for your pages, you will need to load the code
 * in the page header with standard <code>script</code> HTML elements.
 * The necesary script files are
 * <code>/CDEJ/jscript/curam/util/Dialog.js</code>,
 * <code>/CDEJ/jscript/curam/dialog.js</code>
 * and <code>/CDEJ/jscript/cdej.js</code>.
 * <p/>
 * The important API functions that must be called from your page are:<ul>
 * <li><code>{@link curam.util.Dialog.init}</code> in the page header.</li>
 * <li><code>{@link curam.util.Dialog.pageLoadFinished} when the page has been
 * fully loaded.</code></li></ul>
 * <p/>
 * To control the dialog size and title text you must register custom
 * functions by calling the following API in the page header:<ul>
 * <li><code>{@link curam.util.Dialog.registerGetSizeFunc}</code></li>
 * <li><code>{@link curam.util.Dialog.registerGetTitleFunc}</code></li></ul>
 * <p/>
 * Optionally you can also register custom handlers for the following events:<ul>
 * <li>AfterDisplay</li>
 * <li>BeforeClose</li></ul>
 * 
 * If linking from a dialog back into the Curam application is required,
 * this is done using the {@link curam.util.Dialog.close} function.
 */
define("curam/util/Dialog", ["curam/util",
        "curam/define",
        "curam/dialog",
        "curam/util/onLoad",
        "curam/debug",
        "curam/util/ResourceBundle"
        ], function() {

/*
 * Modification History
 * --------------------
 * 03-Jul-2013  MV  [CR00390548] Remove IEG2 specific processing.
 * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
 *                include required bundle.
 * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
 * 02-May-2012  MK  [CR00323691] Use new Dojo AMD format.
 * 03-Feb-2011  MV  [CR00253193] Add special processing in case IEG2
 *    is the client of the API - will be removed later on.
 * 03-Feb-2011  MV  [CR00250687] Notify the parent of the page unload.
 * 18-Jan-2011  MV  [CR00243263] Ensure handlers are released properly. Remove
 *    the use of alias for the window object.
 * 12-Jan-2011  PK  [CR00231655] Fixed issue with registerGetSizeFunc() not
 *                    correctly registering the specified sizing function.
 * 18-Nov-2010  MV  [CR00231655] Take dialog size into account properly.
 * 29-Sep-2010  MV  [CR00221605] Refactor to enable easy change of the context
 *      the API works on.
 */
  
/**
 * Creating Resource Bundle Object to access localized resources.
 */ 
dojo.requireLocalization("curam.application", "Debug");
var bundle = new curam.util.ResourceBundle("Debug");
  
curam.define.singleton("curam.util.Dialog",
/**
 * @lends curam.util.Dialog.prototype
 */
{  
  /**
   * Holds ID of the dialog in the current context.
   * @private
   */
  _id: null,
  
  /**
   * Holds the tokens for unsubscribing handlers on dialog close.
   * @private
   */
  _unsubscribes: [],
    
  /**
   * Opens the specified non-UIM page in a Curam dialog.
   * 
   * @param {String} path URL path to the page to display in the dialog, without
   *              the query string.
   * @param {Object} pageParameters An object containing the required page
   *      parameters, or null if no page parameters are required.
   *      The following format is expected:
   *                        <code>{ param1Name:"value", param2Name:248 }</code>
   *      The infrastructure handles URL-encoding the values so do NOT encode
   *      them yourself.
   * @param {Object} [dialogSize] An object representing the required size
   *    of the dialog in pixels. The following form is required:
   *        <code>{ width:500, height:300 }</code> If size is not specified
   *      the default size will be used instead.
   */
  open: function(path, pageParameters, dialogSize) {
    var url = path + curam.util.makeQueryString(pageParameters);
    var anchor = { href: url };
    var windowOptions = null;
    if (dialogSize) {
      windowOptions = "width=" + dialogSize.width
          + ",height=" + dialogSize.height;
    }
    window.jsModals = true;
    curam.util.openModalDialog(anchor, windowOptions);
  },
    
  /**
   * Initializes the dialog infrastructure.
   *
   * Must be called in the header of the page loaded in the dialog.
   */
  init: function() {
    // receive the dialogId for the current context
    var topWin = curam.util.getTopmostWindow();
    var unsToken = topWin.dojo.subscribe("/curam/dialog/SetId", null,
        function(dialogId) {
          curam.util.Dialog._id = dialogId;
          
          curam.debug.log(bundle.getProperty("curam.util.Dialog.id.success"), 
            curam.util.Dialog._id);

          topWin.dojo.unsubscribe(unsToken);
        });
    curam.util.Dialog._unsubscribes.push(unsToken);
    
    // publish the init event
    // this also triggers the /curam/dialog/SetId event
    // to get the ID - see above
    topWin.dojo.publish("/curam/dialog/init");
    if (!curam.util.Dialog._id) {
      curam.debug.log(bundle.getProperty("curam.util.Dialog.id.fail"));
    }
    
    dojo.addOnUnload(function() {
      // ensure any event handlers are released on page unload
      curam.util.Dialog._releaseHandlers();

      // notify interested parties of the iframe unload
      window.parent.dojo.publish(
          "/curam/dialog/iframeUnloaded", [ curam.util.Dialog._id, window ]);
    });
  },
  
  /**
   * Registers a custom function to get the dialog title text.
   *
   * Must be called in the header of the page loaded in the dialog.
   * 
   * @param {Function} getTitle A function that returns the text to be displayed
   *                  in the dialog title bar.
   */
  registerGetTitleFunc: function(getTitle) {
    curam.util.onLoad.addPublisher(function(context) {
      context.title = getTitle();
    });
  },
  
  /**
   * Registers a custom function to get the dialog size.
   *
   * Can be optioanally called in the header of the page loaded in the dialog.
   * 
   * @param {Function} getSize A function that returns an object
   *      in the following form: <code>{ width:500, height:300 }</code>
   */
  registerGetSizeFunc: function(getSize) {
    curam.util.onLoad.addPublisher(function(context) {
      context.windowOptions = getSize();
    });
  },
  
  /**
   * Registers a custom function that will be called after the dialog appears
   * on the screen.
   * 
   * Must be called in the header of the page loaded in the dialog.
   * 
   * @param {Function} handler The handler function for the AfterDisplay event.
   */
  registerAfterDisplayHandler: function(handler) {
    var topWin = curam.util.getTopmostWindow();
    curam.util.Dialog._unsubscribes.push(topWin.dojo.subscribe(
        "/curam/dialog/AfterDisplay", null, function(dialogId) {
          if (dialogId == curam.util.Dialog._id) {
            handler();
          }
        }));
  },
  
  /**
   * Registers a custom function that will be called before the dialog
   * is closed.
   *
   * Must be called in the header of the page loaded in the dialog.
   * 
   * @param {Function} handler The handler function for the BeforeClose event.
   */
  registerBeforeCloseHandler: function(handler) {
    var topWin = curam.util.getTopmostWindow();
    curam.util.Dialog._unsubscribes.push(topWin.dojo.subscribe(
        "/curam/dialog/BeforeClose", null, function(dialogId) {
          if (dialogId === curam.util.Dialog._id) {
            handler();
          }
        }));
  },
  
  /**
   * Notifies the dialog infrastructure that the page has been fully loaded.
   *
   * Must be called by the page after it finishes loading in the dialog.
   * (E.g. dojo.addOnLoad(curam.Dialog.pageLoadFinished))
   */
  pageLoadFinished: function() {
    // ensure the handlers are unregistered on dialog close
    var topWin = curam.util.getTopmostWindow();
    curam.util.Dialog._unsTokenReleaseHandlers = topWin.dojo.subscribe(
        "/curam/dialog/BeforeClose", null, function(dialogId) {
          if (dialogId == curam.util.Dialog._id) {
            curam.util.Dialog._releaseHandlers();
          }
        });
     
    // invoke the onLoad API 
    curam.util.onLoad.execute();
  },
  
  /**
   * Releases any registered handlers.
   *
   * @private
   */
  _releaseHandlers: function() {
    var topWin = curam.util.getTopmostWindow();
    dojo.forEach(curam.util.Dialog._unsubscribes, topWin.dojo.unsubscribe);
    curam.util.Dialog._unsubscribes = [];
    
    topWin.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
    curam.util.Dialog._unsTokenReleaseHandlers = null;
  },
  
  /**
   * Closes the dialog, optionally refreshing or redirecting the parent window.
   * 
   * Must be called in the context of the page loaded in the dialog. I.e.
   * you cannot close a dialog from an "outside" context.
   * 
   * @param {Boolean} [refreshParent=false] Should the parent be refreshed
   *              when this dialog closes?
   * @param {String} [newPageIdOrFullUrl] ID of the page the parent window
   *      should be redirected to when this dialog closes. Alternatively
   *      a full URL including the page parameters can be passed.
   * @param {Object} [pageParameters] Page parameters to be used when
   *        redirecting the parent to the new page. The following format
   *        is expected: <code>{ param1Name:"value", param2Name:248 }</code>
   *        The infrastructure handles URL-encoding the values so do NOT encode
   *        them yourself.
   *        If full URL is specified then the pageParameters are ignored.
   */
  close: function(/*optional*/ refreshParent, /*optional*/ newPageIdOrFullUrl,
      /*optional*/ pageParameters) {
    
    var parentWindow = curam.dialog.getParentWindow(window);
    if (refreshParent && !newPageIdOrFullUrl) {
      curam.dialog.forceParentRefresh();
      parentWindow.curam.util.redirectWindow(null);
      
    } else if (newPageIdOrFullUrl) {
      var newParentUrl = newPageIdOrFullUrl;
      // distinguish between pageId and full URL
      if (newPageIdOrFullUrl.indexOf("Page.do") == -1 && newPageIdOrFullUrl.indexOf("Action.do") == -1) {
        newParentUrl = newPageIdOrFullUrl + "Page.do"
            + curam.util.makeQueryString(pageParameters);
      }

      parentWindow.curam.util.redirectWindow(newParentUrl);
    }

    var topWin = curam.util.getTopmostWindow();
    topWin.dojo.publish("/curam/dialog/close", [ curam.util.Dialog._id ]);
  },
  
  /**
   * Closes the dialog and submit the parent page, where the form parameters
   * will be optionally passed to. This method is design for the senario where
   * the parent page has an <code>ACTION</code> phase.
   * 
   * Must be called in the context of the page loaded in the dialog. I.e.
   * you cannot close a dialog from an "outside" context.
   * 
   * @param {Object} [formParameters] Form parameters to be used in the form of
   *        the parent page when it is being submitted. The following format
   *        is expected: <code>{ param1Name:"value", param2Name:248 }</code>
   *        Those parameters should not be encoded. The parameter name should be
   *        the order of the input fields in the form, e.g. '1' means the first
   *        input field in the form.
   */
  closeAndSubmitParent: function(/*optional*/ formParameters) {
    var parentWindow = curam.dialog.getParentWindow(window);
    // Get the form of the parent page.
    var parentWindowForm = parentWindow.document.forms["mainForm"];
    var topWin = curam.util.getTopmostWindow();
    
    // Check if the from in the parent window exists or not. If not, simply 
    // close the modal and return. The parent page will not be submitted.
    if (parentWindowForm == null || parentWindowForm == undefined) {
      //Close the modal
      topWin.dojo.publish("/curam/dialog/close", [ curam.util.Dialog._id ]);
      return;
    }
        
    // Define the function used to check if the "formParameters" object is
    // empty or not.
    var isEmpty = function (object) {
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          return false;
        }
      }
      return true;
    };

    
    // Set the from parameters to the corresponding input fields 
    // in the form of the parent page that will be submitted.
    if (formParameters && !isEmpty(formParameters)) {
      // Reset and assign new form parameters to the input fields
      var inputFieldListUnfiltered = dojo.query(
          "input[type=text])", parentWindowForm);
	 
      var inputFieldList = dojo.filter(inputFieldListUnfiltered, function(node){
        return node.readOnly == false;
      });
	  
      dojo.forEach(inputFieldList, function(node) {
          node.value = "";
      });
    
      for (var fieldName in formParameters) {
        var inputField = inputFieldList[parseInt(fieldName)];
        
        if (inputField) {
          var hiddenInputForDropDown = dojo.query(
                   "input[name=" + inputField.id + "]", parentWindowForm)[0];
            if (hiddenInputForDropDown) {
              hiddenInputForDropDown.value = formParameters[fieldName];
            } else {
              inputField.value = formParameters[fieldName];
            }
        
        }
      }
    } else {
      // Do nothing. No form paramters are passed down. Keep the existing string
      // in the from input fields.
    }
	
    //Submit the parent page.
    parentWindow.dojo.publish("/curam/page/refresh");
    parentWindowForm.submit();
    
    //Close the modal
    topWin.dojo.publish("/curam/dialog/close", [ curam.util.Dialog._id ]);
  }

  });
  
});


},
'curam/ajax':function(){
/*
 * Copyright 2009-2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/*
 * Modification History
 * --------------------
 * 11-Apr-2014 MV [CR00424825] Move to common AJAX request API.
 * 31-Jan-2012 MV [CR00302081] Move away from global context. 
 */

define("curam/ajax", ['curam/util/Request'
        ], function(curamRequest) {

var AJAXCall = function(dataTarget, inputProviderName) {
  this.target=dataTarget;
  this.inputProvider = inputProviderName || 'null';
};

var theAJAXCall = {
  doRequest: function (opAlias, params, isPopup, synchronous) {
    var theServlet = "../servlet/JSONServlet";

    var filler = this;

      if (isPopup) theServlet= "../" + theServlet;

      var oData = {
          caller: this.target.id,
          operation: opAlias,
          inputProvider: this.inputProvider,
          args: params
      };

      function processResult(oResult, opAlias){
        oResult = dojo.fromJson(oResult);
          if (oResult instanceof Array) {
            if (oResult.length > 1) {
              if (opAlias == "getCodeTableSubset") {
                filler.fillCTWithBlank(oResult); 
              } else { 
                filler.fillCT(oResult);
              }
            } else {
              if (opAlias == "getCodeTableSubset") {
                // have to handle code tables with one item
                filler.fillCTWithBlank(oResult);            
              } else {
                filler.fillSingle(oResult, true);
              }
            }
          } else {
            filler.fillSingle(oResult);
          }
      };

      curamRequest.post({
        url:theServlet,
        handleAs:   "text",
        load: function(data, evt){
          processResult(data, opAlias);
        },
        error: function(){
          alert("error");
        },
        content: {"content": dojo.toJson(oData)},
        preventCache: true,
        sync: synchronous
      });
  },

  fillCT: function (theResult) {
    this.target.options.length = 0;
    for (var i = 0; i < theResult.length; i++) {
      this.target.options[i] = new Option(theResult[i]["descr"], theResult[i]["code"], theResult[i]["default"]);
    }
  },

  fillCTWithBlank: function (theResult) {
    this.target.options.length = 0;
    this.target.options[0] = new Option("");
    for (var i = 0; i < theResult.length; i++) {
      this.target.options[i+1] = new Option(theResult[i]["descr"], theResult[i]["code"]);
    }
  },

  fillSingle: function (theResult, arrayed) {
    if (arrayed) {
      this.target.value = theResult[0]["value"];
    } else {
      this.target.value = theResult["value"];
    }
  }
};

dojo.mixin(AJAXCall.prototype, theAJAXCall);

// Keep the functions in the global scope for backwards compatibility.
// TODO: remove when code calling these functions is updated
dojo.global.AJAXCall = AJAXCall;

return AJAXCall;
});

},
'dijit/_base/window':function(){
define("dijit/_base/window", [
	"dojo/window", // windowUtils.get
	".."	// export symbol to dijit
], function(windowUtils, dijit){
	// module:
	//		dijit/_base/window
	// summary:
	//		Back compatibility module, new code should use windowUtils directly instead of using this module.

	dijit.getDocumentWindow = function(doc){
		return windowUtils.get(doc);
	};
});

},
'idx/oneui/common':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/common", ["exports", "dojo/_base/sniff", "dojo/_base/window", "dojo/dom-construct"], function(exports, has, win, domConstruct){
	
	function _getFontMeasurements(){
		var heights = {
			'1em': 0, '1ex': 0, '100%': 0, '12pt': 0, '16px': 0, 'xx-small': 0,
			'x-small': 0, 'small': 0, 'medium': 0, 'large': 0, 'x-large': 0,
			'xx-large': 0
		};
		var p;
		if(has("ie")){
			win.doc.documentElement.style.fontSize="100%";
		}
		var div = domConstruct.create("div", {style: {
				position: "absolute",
				left: "0",
				top: "-100px",
				width: "30px",
				height: "1000em",
				borderWidth: "0",
				margin: "0",
				padding: "0",
				outline: "none",
				lineHeight: "1",
				overflow: "hidden"
			}}, win.body());
		for(p in heights){
			div.style.fontSize = p;
			heights[p] = Math.round(div.offsetHeight * 12/16) * 16/12 / 1000;
		}

		win.body().removeChild(div);
		return heights; //object
	};
	var fontMeasurements = null;
	function _getCachedFontMeasurements(recalculate){
		if(recalculate || !fontMeasurements){
			fontMeasurements = _getFontMeasurements();
		}
		return fontMeasurements;
	};
	
	
	
	exports.normalizedLength = function(len) {
		if(len.length === 0){ return 0; }
		if(len.length > 2){
			var px_in_pt = _getCachedFontMeasurements()["12pt"] / 12;
			var val = parseFloat(len);
			switch(len.slice(-2)){
				case "px": return val;
				case "pt": return val * px_in_pt;
				case "in": return val * 72 * px_in_pt;
				case "pc": return val * 12 * px_in_pt;
				case "mm": return val * g.mm_in_pt * px_in_pt;
				case "cm": return val * g.cm_in_pt * px_in_pt;
			}
		}
		return parseFloat(len);	// Number
	}
	
});
},
'dijit/main':function(){
define("dijit/main", [
	"dojo/_base/kernel"
], function(dojo){
	// module:
	//		dijit
	// summary:
	//		The dijit package main module

	return dojo.dijit;
});

},
'curam/define':function(){
/*
 * Copyright 2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/define", [], function() {
  
  /*
   * Modification History
   * --------------------
   * 29-Jul-2011  MV [CR00269970] Initial version.
   */

  /**
   * This package contains function for working with classes in our code.
   */

  if(typeof(dojo.global.curam) == "undefined") {
    dojo.global.curam = {};
  }

  if (typeof(dojo.global.curam.define) == "undefined") {
    dojo.mixin(dojo.global.curam, {define: {}});
  }

  dojo.mixin(dojo.global.curam.define, {
    /**
     * Defines a singleton class ensuring any packages are created and no
     * existing packages are overwritten in the process.
     * 
     * @param {String} singletonName Name of the singleton class to be defined.cdej
     * @param {Object} [content] Optional content of the singleton class.
     */
    singleton: function(singletonName, content) {
      var parts = singletonName.split(".");
      
      // we assume we are runnning within a browser environment so the window
      // object is available.
      var currentContext = window;
      
      // now check for existence and create any missing packages
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (typeof currentContext[part] == "undefined") {
          currentContext[part] = {};
        }
        currentContext = currentContext[part];
      }
      
      // now set the content
      if (content) {
        dojo.mixin(currentContext, content);
      }
    }
  });
  
  return dojo.global.curam.define;
});

},
'curam/util/external':function(){
/*
 * Copyright 2014 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

  /*
   * Modification History
   * --------------------
   * 25-Mar-2014 MV  [CR00423311] Initial version.  
   */
define("curam/util/external", ['curam/util'
        ], function(util) {
  
  /**
   * @name curam.util.external
   * @namespace Contains functions of general use for the external application
   *    container.
   */
  curam.define.singleton("curam.util.external",
  /**
   * @lends curam.util.external.prototype
   */
  {
    /**
     * Determines whether we are running within an external application
     * container or not.
     * 
     * @return True if we are in external app container, otherwise false.
     */
    inExternalApp: function() {
      return jsScreenContext.hasContextBits("EXTAPP");
    },
    
    /**
     * Determines the iframe to be used as parent for a UIM modal dialog.
     * 
     * @returns iframe or null.
     */
    getUimParentWindow: function() {
      if (util.getTopmostWindow() === dojo.global) {
        return null;

      } else {
        return dojo.global;
      }
    }
  });

  return curam.util.external;
});

},
'idx/oneui/form/TextBox':function(){
require({cache:{
'url:idx/oneui/form/templates/TextBox.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'/\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n"}});
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/form/TextBox", [
	"dojo/_base/declare",
	"dojo/dom-style",
	"dijit/form/TextBox",
	"dijit/form/ValidationTextBox",
	"../HoverHelpTooltip",
	"../_CssStateMixin",
	"./_CompositeMixin",
	"dojo/text!./templates/TextBox.html"
], function(declare, domStyle, TextBox, ValidationTextBox, HoverHelpTooltip, _CssStateMixin, _CompositeMixin, template){
/**
	 * @name idx.oneui.form.TextBox
	 * @class One UI version.
	 * @augments dijit.form.TextBox
	 */
	 
	return declare("idx.oneui.form.TextBox", [ValidationTextBox, _CssStateMixin, _CompositeMixin], {
		/**@lends idx.oneui.form.TextBox*/
		
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.
		// tags:
		//		protected

		// instantValidate: Boolean
		//		Fire validation when widget get input by set true, 
		//		fire validation when widget get blur by set false
		instantValidate: false,
		templateString: template,
		baseClass: "idxTextBoxWrap",
		oneuiBaseClass: "dijitTextBox dijitValidationTextBox",
		
		postCreate: function(){
			this.inherited(arguments);
			if(this.instantValidate){
				this.connect(this, "_onInput", function(){
					this.validate(this.focused);
				});
			}else{
				this.connect(this, "_onBlur", function(){
					this.validate(this.focused);
				});
				this.connect(this, "_onFocus", function(){
					this._set("state", "");
					if(this.message == ""){return;}
					this.displayMessage(this.message);
					this.message = "";
				});
				this.connect(this, "_onInput", function(){
					this.displayMessage();
				});
			}
			this.connect(this.iconNode, "onmouseenter", function(){
				if(this.message && domStyle.get(this.iconNode, "visibility") == "visible"){
					HoverHelpTooltip.show(this.message, this.iconNode, this.tooltipPosition, !this.isLeftToRight());
				}
			});
			
		},
		/**
		* Overridable method to display validation errors/hints
		*/
		displayMessage: function(/*String*/ message){
			// summary:
			//		Overridable method to display validation errors/hints.
			//		By default uses a oneui.HoverHelpTooltip.
			// tags:
			//		extension
			HoverHelpTooltip.hide(this.oneuiBaseNode);
			HoverHelpTooltip.hide(this.iconNode);
			if(message && this.focused){
				var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
				HoverHelpTooltip.show(message, node, this.tooltipPosition, !this.isLeftToRight());
			}
		},
		/**
		* use set("value", val) to set the value of the Textbox
		*/
		_setValueAttr: function(){
			TextBox.prototype._setValueAttr.apply(this, arguments);
		},
		_refreshState: function(){
			TextBox.prototype._refreshState.apply(this, arguments);
		}
	});
});

},
'dijit/_OnDijitClickMixin':function(){
define("dijit/_OnDijitClickMixin", [
	"dojo/on",
	"dojo/_base/array", // array.forEach
	"dojo/keys", // keys.ENTER keys.SPACE
	"dojo/_base/declare", // declare
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window" // win.doc.addEventListener win.doc.attachEvent win.doc.detachEvent
], function(on, array, keys, declare, has, unload, win){

	// module:
	//		dijit/_OnDijitClickMixin
	// summary:
	//		Mixin so you can pass "ondijitclick" to this.connect() method,
	//		as a way to handle clicks by mouse, or by keyboard (SPACE/ENTER key)


	// Keep track of where the last keydown event was, to help avoid generating
	// spurious ondijitclick events when:
	// 1. focus is on a <button> or <a>
	// 2. user presses then releases the ENTER key
	// 3. onclick handler fires and shifts focus to another node, with an ondijitclick handler
	// 4. onkeyup event fires, causing the ondijitclick handler to fire
	var lastKeyDownNode = null;
	if(has("ie")){
		(function(){
			var keydownCallback = function(evt){
				lastKeyDownNode = evt.srcElement;
			};
			win.doc.attachEvent('onkeydown', keydownCallback);
			unload.addOnWindowUnload(function(){
				win.doc.detachEvent('onkeydown', keydownCallback);
			});
		})();
	}else{
		win.doc.addEventListener('keydown', function(evt){
			lastKeyDownNode = evt.target;
		}, true);
	}

	// Custom a11yclick (a.k.a. ondijitclick) event
	var a11yclick = function(node, listener){
		if(/input|button/i.test(node.nodeName)){
			// pass through, the browser already generates click event on SPACE/ENTER key
			return on(node, "click", listener);
		}else{
			// Don't fire the click event unless both the keydown and keyup occur on this node.
			// Avoids problems where focus shifted to this node or away from the node on keydown,
			// either causing this node to process a stray keyup event, or causing another node
			// to get a stray keyup event.

			function clickKey(/*Event*/ e){
				return (e.keyCode == keys.ENTER || e.keyCode == keys.SPACE) &&
						!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
			}
			var handles = [
				on(node, "keypress", function(e){
					//console.log(this.id + ": onkeydown, e.target = ", e.target, ", lastKeyDownNode was ", lastKeyDownNode, ", equality is ", (e.target === lastKeyDownNode));
					if(clickKey(e)){
						// needed on IE for when focus changes between keydown and keyup - otherwise dropdown menus do not work
						lastKeyDownNode = e.target;

						// Prevent viewport scrolling on space key in IE<9.
						// (Reproducible on test_Button.html on any of the first dijit.form.Button examples)
						// Do this onkeypress rather than onkeydown because onkeydown.preventDefault() will
						// suppress the onkeypress event, breaking _HasDropDown
						e.preventDefault();
					}
				}),

				on(node, "keyup", function(e){
					//console.log(this.id + ": onkeyup, e.target = ", e.target, ", lastKeyDownNode was ", lastKeyDownNode, ", equality is ", (e.target === lastKeyDownNode));
					if(clickKey(e) && e.target == lastKeyDownNode){	// === breaks greasemonkey
						//need reset here or have problems in FF when focus returns to trigger element after closing popup/alert
						lastKeyDownNode = null;
						listener.call(this, e);
					}
				}),

				on(node, "click", function(e){
					// and connect for mouse clicks too (or touch-clicks on mobile)
					listener.call(this, e);
				})
			];

			return {
				remove: function(){
					array.forEach(handles, function(h){ h.remove(); });
				}
			};
		}
	};

	return declare("dijit._OnDijitClickMixin", null, {
		connect: function(
				/*Object|null*/ obj,
				/*String|Function*/ event,
				/*String|Function*/ method){
			// summary:
			//		Connects specified obj/event to specified method of this object
			//		and registers for disconnect() on widget destroy.
			// description:
			//		Provide widget-specific analog to connect.connect, except with the
			//		implicit use of this widget as the target object.
			//		This version of connect also provides a special "ondijitclick"
			//		event which triggers on a click or space or enter keyup.
			//		Events connected with `this.connect` are disconnected upon
			//		destruction.
			// returns:
			//		A handle that can be passed to `disconnect` in order to disconnect before
			//		the widget is destroyed.
			// example:
			//	|	var btn = new dijit.form.Button();
			//	|	// when foo.bar() is called, call the listener we're going to
			//	|	// provide in the scope of btn
			//	|	btn.connect(foo, "bar", function(){
			//	|		console.debug(this.toString());
			//	|	});
			// tags:
			//		protected

			return this.inherited(arguments, [obj, event == "ondijitclick" ? a11yclick : event, method]);
		}
	});
});

},
'dijit/_BidiSupport':function(){
define("dijit/_BidiSupport", ["./_WidgetBase"], function(_WidgetBase){

/*=====
	var _WidgetBase = dijit._WidgetBase;
====*/

	// module:
	//		dijit/_BidiSupport
	// summary:
	//		Module that deals with BIDI, special with the auto
	//		direction if needed without changing the GUI direction.
	//		Including this module will extend _WidgetBase with BIDI related methods.
	// description:
	//		There's a special need for displaying BIDI text in rtl direction
	//		in ltr GUI, sometimes needed auto support.
	//		In creation of widget, if it's want to activate this class,
	//		the widget should define the "textDir".

	_WidgetBase.extend({

		getTextDir: function(/*String*/ text){
			// summary:
			//		Gets the right direction of text.
			// description:
			// 		If textDir is ltr or rtl returns the value.
			//		If it's auto, calls to another function that responsible
			//		for checking the value, and defining the direction.
			//	tags:
			//		protected.
			return this.textDir == "auto" ? this._checkContextual(text) : this.textDir;
		},

		_checkContextual: function(text){
			// summary:
			//		Finds the first strong (directional) character, return ltr if isLatin
			//		or rtl if isBidiChar.
			//	tags:
			//		private.

			// look for strong (directional) characters
			var fdc = /[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
			// if found return the direction that defined by the character, else return widgets dir as defult.
			return fdc ? ( fdc[0] <= 'z' ? "ltr" : "rtl" ) : this.dir ? this.dir : this.isLeftToRight() ? "ltr" : "rtl";
		},

		applyTextDir: function(/*Object*/ element, /*String*/ text){
			// summary:
			//		Set element.dir according to this.textDir
			// element:
			//		The text element to be set. Should have dir property.
			// text:
			//		Used in case this.textDir is "auto", for calculating the right transformation
			// description:
			// 		If textDir is ltr or rtl returns the value.
			//		If it's auto, calls to another function that responsible
			//		for checking the value, and defining the direction.
			//	tags:
			//		protected.

			var textDir = this.textDir == "auto" ? this._checkContextual(text) : this.textDir;
			// update only when there's a difference
			if(element.dir != textDir){
				element.dir = textDir;
			}
		}
	});

	return _WidgetBase;
});

},
'dijit/form/_ListMouseMixin':function(){
define("dijit/form/_ListMouseMixin", [
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/touch",
	"./_ListBase"
], function(declare, event, touch, _ListBase){

/*=====
var _ListBase = dijit.form._ListBase;
=====*/

// module:
//		dijit/form/_ListMouseMixin
// summary:
//		a mixin to handle mouse or touch events for a focus-less menu

return declare( "dijit.form._ListMouseMixin", _ListBase, {
	// summary:
	//		a Mixin to handle mouse or touch events for a focus-less menu
	//		Abstract methods that must be defined externally:
	//			onClick: item was chosen (mousedown somewhere on the menu and mouseup somewhere on the menu)
	// tags:
	//		private

	postCreate: function(){
		this.inherited(arguments);
		this.connect(this.domNode, touch.press, "_onMouseDown");
		this.connect(this.domNode, touch.release, "_onMouseUp");
		this.connect(this.domNode, "onmouseover", "_onMouseOver");
		this.connect(this.domNode, "onmouseout", "_onMouseOut");
	},

	_onMouseDown: function(/*Event*/ evt){
		event.stop(evt);
		if(this._hoveredNode){
			this.onUnhover(this._hoveredNode);
			this._hoveredNode = null;
		}
		this._isDragging = true;
		this._setSelectedAttr(this._getTarget(evt));
	},

	_onMouseUp: function(/*Event*/ evt){
		event.stop(evt);
		this._isDragging = false;
		var selectedNode = this._getSelectedAttr();
		var target = this._getTarget(evt);
		var hoveredNode = this._hoveredNode;
		if(selectedNode && target == selectedNode){
			this.onClick(selectedNode);
		}else if(hoveredNode && target == hoveredNode){ // drag to select
			this._setSelectedAttr(hoveredNode);
			this.onClick(hoveredNode);
		}
	},

	_onMouseOut: function(/*Event*/ /*===== evt ====*/){
		if(this._hoveredNode){
			this.onUnhover(this._hoveredNode);
			if(this._getSelectedAttr() == this._hoveredNode){
				this.onSelect(this._hoveredNode);
			}
			this._hoveredNode = null;
		}
		if(this._isDragging){
			this._cancelDrag = (new Date()).getTime() + 1000; // cancel in 1 second if no _onMouseOver fires
		}
	},

	_onMouseOver: function(/*Event*/ evt){
		if(this._cancelDrag){
			var time = (new Date()).getTime();
			if(time > this._cancelDrag){
				this._isDragging = false;
			}
			this._cancelDrag = null;
		}
		var node = this._getTarget(evt);
		if(!node){ return; }
		if(this._hoveredNode != node){
			if(this._hoveredNode){
				this._onMouseOut({ target: this._hoveredNode });
			}
			if(node && node.parentNode == this.containerNode){
				if(this._isDragging){
					this._setSelectedAttr(node);
				}else{
					this._hoveredNode = node;
					this.onHover(node);
				}
			}
		}
	}
});

});

},
'dojo/cookie':function(){
define("dojo/cookie", ["./_base/kernel", "./regexp"], function(dojo, regexp) {
	// module:
	//		dojo/cookie
	// summary:
	//		TODOC


/*=====
dojo.__cookieProps = function(){
	//	expires: Date|String|Number?
	//		If a number, the number of days from today at which the cookie
	//		will expire. If a date, the date past which the cookie will expire.
	//		If expires is in the past, the cookie will be deleted.
	//		If expires is omitted or is 0, the cookie will expire when the browser closes.
	//	path: String?
	//		The path to use for the cookie.
	//	domain: String?
	//		The domain to use for the cookie.
	//	secure: Boolean?
	//		Whether to only send the cookie on secure connections
	this.expires = expires;
	this.path = path;
	this.domain = domain;
	this.secure = secure;
}
=====*/


dojo.cookie = function(/*String*/name, /*String?*/value, /*dojo.__cookieProps?*/props){
	//	summary:
	//		Get or set a cookie.
	//	description:
	// 		If one argument is passed, returns the value of the cookie
	// 		For two or more arguments, acts as a setter.
	//	name:
	//		Name of the cookie
	//	value:
	//		Value for the cookie
	//	props:
	//		Properties for the cookie
	//	example:
	//		set a cookie with the JSON-serialized contents of an object which
	//		will expire 5 days from now:
	//	|	dojo.cookie("configObj", dojo.toJson(config), { expires: 5 });
	//
	//	example:
	//		de-serialize a cookie back into a JavaScript object:
	//	|	var config = dojo.fromJson(dojo.cookie("configObj"));
	//
	//	example:
	//		delete a cookie:
	//	|	dojo.cookie("configObj", null, {expires: -1});
	var c = document.cookie, ret;
	if(arguments.length == 1){
		var matches = c.match(new RegExp("(?:^|; )" + regexp.escapeString(name) + "=([^;]*)"));
		ret = matches ? decodeURIComponent(matches[1]) : undefined; 
	}else{
		props = props || {};
// FIXME: expires=0 seems to disappear right away, not on close? (FF3)  Change docs?
		var exp = props.expires;
		if(typeof exp == "number"){
			var d = new Date();
			d.setTime(d.getTime() + exp*24*60*60*1000);
			exp = props.expires = d;
		}
		if(exp && exp.toUTCString){ props.expires = exp.toUTCString(); }

		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value, propName;
		for(propName in props){
			updatedCookie += "; " + propName;
			var propValue = props[propName];
			if(propValue !== true){ updatedCookie += "=" + propValue; }
		}
		document.cookie = updatedCookie;
	}
	return ret; // String|undefined
};

dojo.cookie.isSupported = function(){
	//	summary:
	//		Use to determine if the current browser supports cookies or not.
	//
	//		Returns true if user allows cookies.
	//		Returns false if user doesn't allow cookies.

	if(!("cookieEnabled" in navigator)){
		this("__djCookieTest__", "CookiesAllowed");
		navigator.cookieEnabled = this("__djCookieTest__") == "CookiesAllowed";
		if(navigator.cookieEnabled){
			this("__djCookieTest__", "", {expires: -1});
		}
	}
	return navigator.cookieEnabled;
};

return dojo.cookie;
});

},
'dojo/cache':function(){
define("dojo/cache", ["./_base/kernel", "./text"], function(dojo, text){
	// module:
	//		dojo/cache
	// summary:
	//		The module defines dojo.cache by loading dojo/text.

	//dojo.cache is defined in dojo/text
	return dojo.cache;
});

},
'url:dijit/form/templates/DropDownBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n",
'curam/util/ui/refresh/TabRefreshController':function(){
/*
 * Copyright 2011-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/util/ui/refresh/TabRefreshController", ["curam/debug",
        "curam/util/ui/refresh/RefreshEvent",
        "curam/util/ResourceBundle"
        ], function() {

  /*
   * Modification History
   * --------------------
   * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
   *                include required bundle.
   * 07-May-2013  MV  [CR00383012] Fix destroy function to properly
   *    re-initialize members. 
   * 07-Mar-2013  MV  [CR00373496] Fix member variable values handling.
   * 22-Oct-2012  SK  [CR00346419] Now destroys the configuration references
   *                  to avoid memory leak.
   * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
   * 04-Jul-2011  MV  [CR00269970] Initial version.
   */

  /**
   * Creating Resource Bundle Object to access localized resources.
   */
  dojo.requireLocalization("curam.application", "Debug");
  var bundle = new curam.util.ResourceBundle("Debug");

  /**
   * @name curam.util.ui.refresh.TabRefreshController
   * @namespace Manages refreshing of the the tab UI components.
   *
   */
  var TabRefreshController = dojo.declare("curam.util.ui.refresh.TabRefreshController", null,
  /**
   * @lends curam.util.ui.refresh.TabRefreshController.prototype
   */
  {
    /** Event name for menu refresh. */
    EVENT_REFRESH_MENU: "/curam/refresh/menu",

    /** Event name for navigation refresh. */
    EVENT_REFRESH_NAVIGATION: "/curam/refresh/navigation",

    /** Event name for context panel refresh. */
    EVENT_REFRESH_CONTEXT: "/curam/refresh/context",

    /** Event name for the main content panel refresh. */
    EVENT_REFRESH_MAIN: "/curam/refresh/main-content",

    /** ID of the related tab widget. */
    _tabWidgetId: null,

    /** The configuration for onsubmit handling. */
    _configOnSubmit: null,

    /** The configuration for onload handling. */
    _configOnLoad: null,

    /** The handler function that performs the actual refresh based on the
     * generated events. */
    _handler: null,

    /**
     * Holds the last submit event to be processed. This is needed because page
     * submits are processed only when the next page loads. It is done for two
     * reasons: a) to make sure any server updates caused by the submit are
     * reflected when the UI is refreshed and b) to avoid double refreshes
     * when they are configured on both one page submit and the next page load.
     * If this is the case the refresh list is optimized and only done once.
     */
    _lastSubmitted: null,

    /**
     * Holds the current refresh event sent to the main content panel. This is
     * used to break potential infinite recursion when we are notified of page
     * events caused by our own refresh event.
     */
    _currentlyRefreshing: null,

    /**
     * Creates an instance of the refresh controller.
     *
     * @param {String} tabWidgetId Id of the tab widget this controller
     *            belongs to.
     * @param {Object} [config] The tab refresh configuration object.
     *            The expected structure is the one output
     *            by curam.util.client.render.component.TabRenderer.
     *            Configuration is optional as some tabs have no associated
     *            refresh configuration. If not provided, the controller will not
     *            be active, i.e. will not send out any refresh events ever.
     */
    constructor: function(tabWidgetId, config) {
      this._configOnSubmit = {};
      this._configOnLoad = {};

      if (!config) {
        // is null controller
        return;
      }

      this._tabWidgetId = tabWidgetId;

      // Expand the configuration data structure so that it is easily
      // used in the controller.
      dojo.forEach(config.config, dojo.hitch(this, function(item) {
        this._configOnSubmit[item.page] = item.onsubmit;
        this._configOnLoad[item.page] = item.onload;
      }));
    },

    /**
     * Notifies the controller of a page submit in the specified context.
     *
     * @param pageId ID of the page that has been submitted.
     * @param context Context in which the page has been submitted. The expected
     *            values for this parameter are defined as constants
     *            in the curam.util.ui.refresh.RefreshEvent class.
     */
    pageSubmitted: function(pageId, context) {
      // create event object - validates the parameters
      new curam.util.ui.refresh.RefreshEvent(
          curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT, context);
      curam.debug.log("curam.util.ui.refresh.TabRefreshController: " +
          bundle.getProperty("curam.util.ui.refresh.TabRefreshController.submit",
                             [pageId, context]));
      if (this._configOnSubmit[pageId]) {
        // if we are interested in this submit, record the event
        // it will be processed when a next page loads
        this._lastSubmitted = pageId;
        curam.debug.log("curam.util.ui.refresh.TabRefreshController: "
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + "submit.notify"));
      }
    },

    /**
     * Notifies the controller of a page load in the specified context.
     *
     * @param pageId ID of the page that has been loaded.
     * @param context Context in which the page has been loaded. The expected
     *            values for this parameter are defined as constants
     *            in the curam.util.ui.refresh.RefreshEvent class.
     */
    pageLoaded: function(pageId, context) {
      // create event object - also validates the parameters
      var event = new curam.util.ui.refresh.RefreshEvent(
          curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD, context);

      curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
        + bundle.getProperty("curam.util.ui.refresh.TabRefreshController.load",
          [pageId, context]));

      // do not react to onload event if it was caused by our refresh event
      // this avoids possible infinite recursion
      if (this._currentlyRefreshing && this._currentlyRefreshing.equals(event)) {
        this._currentlyRefreshing = null;
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + "refresh"));
        return;
      }

      // if a refresh is configured for both previous page submit and next page
      // load we merge the configurations and only refresh once
      var mergedRefreshConfig = {};

      // only support onload event for the main content panel
      if(context == event.SOURCE_CONTEXT_MAIN && this._configOnLoad[pageId]) {
        mergedRefreshConfig = this._configOnLoad[pageId];
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
            + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
              + ".load.config"));
      }
      // else ->
      // load in other contexts will be only used to dispatch
      // any previous onsubmit event
      if (this._lastSubmitted) {
        // merge the configs if we have both onsubmit and onload
        var cfg = this._configOnSubmit[this._lastSubmitted];
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
            + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
              + ".submit.config", [this._lastSubmitted]));

        mergedRefreshConfig.details = mergedRefreshConfig.details || cfg.details;
        mergedRefreshConfig.menubar = mergedRefreshConfig.menubar || cfg.menubar;
        mergedRefreshConfig.navigation =
            mergedRefreshConfig.navigation || cfg.navigation;
        mergedRefreshConfig.mainContent =
            mergedRefreshConfig.mainContent || cfg.mainContent;

        this._lastSubmitted = null;
      }

      this._fireRefreshEvents(mergedRefreshConfig);
    },

    /**
     * Invokes the refresh handler with events based on the received
     * page load/submit events and refresh configuration.
     *
     * @private
     *
     * @param cfg The relevant configuration fragment.
     */
    _fireRefreshEvents: function(cfg) {
      var events = [];
      if (cfg.details) {
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + ".refresh.context"));
        events.push(this.EVENT_REFRESH_CONTEXT + "/" + this._tabWidgetId);
      }
      if (cfg.menubar) {
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + ".refresh.menu"));
        events.push(this.EVENT_REFRESH_MENU + "/" + this._tabWidgetId);
      }
      if (cfg.navigation) {
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + ".refresh.nav"));
        events.push(this.EVENT_REFRESH_NAVIGATION + "/" + this._tabWidgetId);
      }
      if (cfg.mainContent) {
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
          + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
            + ".refresh.main"));
        // store the refresh event for later use in the infinite recursion
        // breaking code above
        this._currentlyRefreshing = new curam.util.ui.refresh.RefreshEvent(
            curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,
            curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,
            null);
        events.push(this.EVENT_REFRESH_MAIN + "/" + this._tabWidgetId);
      }
      if (events.length > 0) {
        curam.debug.log("curam.util.ui.refresh.TabRefreshController:"
            + bundle.getProperty("curam.util.ui.refresh.TabRefreshController"
              + ".refresh.log", [events.length, events]));
        this._handler(events);
      }
    },

    /**
     * Specifies the refresh handler function to be invoked when some tab UI
     * parts should be refreshed.
     *
     * @param {Function} handler A function to be invoked in response to tab UI
     *    refresh events. The function will be passed one parameter
     *    which is an array of refresh event names. The format of the refresh
     *    event names is the following: event_name/tab_widget_id, where
     *    the supported event_names are defined as constants in this class
     *    and tab_widget_id is ID of the tab the events are related to. Please
     *    note that all the events in the array will always refer to the same tab.
     */
    setRefreshHandler: function(handler) {
      this._handler = handler;
    },

    /**
     * Releases any resources related to this controller instance.
     * It is the responsibility of this class' clients to call this function when
     * the tab that owns the controller instance is closed.
     */
    destroy: function() {
      for (prop in this._configOnSubmit) {
        if (this._configOnSubmit.hasOwnProperty(prop)) {
        delete this._configOnSubmit[prop];
      }
      }
      for (prop in this._configOnLoad) {
        if (this._configOnLoad.hasOwnProperty(prop)) {
        delete this._configOnLoad[prop];
      }
      }
      this._configOnSubmit = {};
      this._configOnLoad = {};
      this._handler = null;
      this._lastSubmitted = null;
      this._currentlyRefreshing = null;
    }
  });

  return TabRefreshController;
});

},
'dijit/_base/popup':function(){
define("dijit/_base/popup", [
	"dojo/dom-class", // domClass.contains
	"../popup",
	"../BackgroundIframe"	// just loading for back-compat, in case client code is referencing it
], function(domClass, popup){

// module:
//		dijit/_base/popup
// summary:
//		Old module for popups, new code should use dijit/popup directly


// Hack support for old API passing in node instead of a widget (to various methods)
var origCreateWrapper = popup._createWrapper;
popup._createWrapper = function(widget){
	if(!widget.declaredClass){
		// make fake widget to pass to new API
		widget = {
			_popupWrapper: (widget.parentNode && domClass.contains(widget.parentNode, "dijitPopup")) ?
				widget.parentNode : null,
			domNode: widget,
			destroy: function(){}
		};
	}
	return origCreateWrapper.call(this, widget);
};

// Support old format of orient parameter
var origOpen = popup.open;
popup.open = function(/*dijit.popup.__OpenArgs*/ args){
	// Convert old hash structure (ex: {"BL": "TL", ...}) of orient to format compatible w/new popup.open() API.
	// Don't do conversion for:
	//		- null parameter (that means to use the default positioning)
	//		- "R" or "L" strings used to indicate positioning for context menus (when there is no around node)
	//		- new format, ex: ["below", "above"]
	//		- return value from deprecated dijit.getPopupAroundAlignment() method,
	//			ex: ["below", "above"]
	if(args.orient && typeof args.orient != "string" && !("length" in args.orient)){
		var ary = [];
		for(var key in args.orient){
			ary.push({aroundCorner: key, corner: args.orient[key]});
		}
		args.orient = ary;
	}

	return origOpen.call(this, args);
};

return popup;
});

},
'url:curam/layout/resources/TabContainer.html':"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n",
'url:dijit/form/templates/Button.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n",
'dojo/_base/url':function(){
define("dojo/_base/url", ["./kernel"], function(dojo) {
	// module:
	//		dojo/url
	// summary:
	//		This module contains dojo._Url

	var
		ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
		ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),
		_Url = function(){
			var n = null,
				_a = arguments,
				uri = [_a[0]];
			// resolve uri components relative to each other
			for(var i = 1; i<_a.length; i++){
				if(!_a[i]){ continue; }

				// Safari doesn't support this.constructor so we have to be explicit
				// FIXME: Tracked (and fixed) in Webkit bug 3537.
				//		http://bugs.webkit.org/show_bug.cgi?id=3537
				var relobj = new _Url(_a[i]+""),
					uriobj = new _Url(uri[0]+"");

				if(
					relobj.path == "" &&
					!relobj.scheme &&
					!relobj.authority &&
					!relobj.query
				){
					if(relobj.fragment != n){
						uriobj.fragment = relobj.fragment;
					}
					relobj = uriobj;
				}else if(!relobj.scheme){
					relobj.scheme = uriobj.scheme;

					if(!relobj.authority){
						relobj.authority = uriobj.authority;

						if(relobj.path.charAt(0) != "/"){
							var path = uriobj.path.substring(0,
								uriobj.path.lastIndexOf("/") + 1) + relobj.path;

							var segs = path.split("/");
							for(var j = 0; j < segs.length; j++){
								if(segs[j] == "."){
									// flatten "./" references
									if(j == segs.length - 1){
										segs[j] = "";
									}else{
										segs.splice(j, 1);
										j--;
									}
								}else if(j > 0 && !(j == 1 && segs[0] == "") &&
									segs[j] == ".." && segs[j-1] != ".."){
									// flatten "../" references
									if(j == (segs.length - 1)){
										segs.splice(j, 1);
										segs[j - 1] = "";
									}else{
										segs.splice(j - 1, 2);
										j -= 2;
									}
								}
							}
							relobj.path = segs.join("/");
						}
					}
				}

				uri = [];
				if(relobj.scheme){
					uri.push(relobj.scheme, ":");
				}
				if(relobj.authority){
					uri.push("//", relobj.authority);
				}
				uri.push(relobj.path);
				if(relobj.query){
					uri.push("?", relobj.query);
				}
				if(relobj.fragment){
					uri.push("#", relobj.fragment);
				}
			}

			this.uri = uri.join("");

			// break the uri into its main components
			var r = this.uri.match(ore);

			this.scheme = r[2] || (r[1] ? "" : n);
			this.authority = r[4] || (r[3] ? "" : n);
			this.path = r[5]; // can never be undefined
			this.query = r[7] || (r[6] ? "" : n);
			this.fragment	 = r[9] || (r[8] ? "" : n);

			if(this.authority != n){
				// server based naming authority
				r = this.authority.match(ire);

				this.user = r[3] || n;
				this.password = r[4] || n;
				this.host = r[6] || r[7]; // ipv6 || ipv4
				this.port = r[9] || n;
			}
		};
	_Url.prototype.toString = function(){ return this.uri; };

	return dojo._Url = _Url;
});

},
'curam/widget/FilteringSelect':function(){
/*
 * Copyright 2009-2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/**
 * Override of the Dojo FilteringSelect in order to get it to display
 * items in the drop down when the associated value is the empty string.
 * 
 */
define("curam/widget/FilteringSelect", ["dijit/registry", "dojo/on", "dijit/form/FilteringSelect"
        ], function(registry, on) {
  
  /*
   * Modification History
   * --------------------
   * 10-Mar-2014  AS  [CR00415345] Modified the role of widget 
   *                    to listbox from combobox. Also handled the
   *                  enter key on open dropdown.
   * 15-Nov-2011  PK  [CR00297778] Ported to Dojo 1.7.
   * 03-Nov-2011  JY  [CR00296248] Added a blank option to the <select> element 
   *                  where there is no option
   * 31-Oct-2011  MV  [CR00289694] Fixed the superclass' method call.
   * 25-Oct-2011  JY  [CR00295925] Updated postMixInProperties() function to
   *                  ignore handling the blank option that contains a comment.
   * 19-Oct-2011  JY  [CR00295026] Overwrite _callbackSetLabel() function to set
   *                  an particular code "__o3_INVALID" for the invalid inputs.
   * 22-Oct-2010  MK  [CR00222181] Initial version.
   */
  /**
   * @name curam.widget.FilteringSelect
   * @namespace Get it to display items in the drop down when the associated
   *              value is the empty string.
   */
  var FilteringSelect = dojo.declare("curam.widget.FilteringSelect", dijit.form.FilteringSelect,
  /**
   * @lends curam.widget.FilteringSelect.prototype
   */
  {
      // Flag which indicates if the enter key is used on open dropdown
      enterKeyOnOpenDropDown: false,
    
      postMixInProperties: function(){
          /*
           * Add a blank option to the <select> element where there is no option,
           * to enable users to open a empty dropdown list in this widget.
           * 
           */
          if (!this.store) {
            if (dojo.query("> option", this.srcNodeRef)[0] == undefined) {
              dojo.create("option", {innerHTML:"<!--__o3_BLANK-->"}, this.srcNodeRef);
            }
          }
          
          
            if(!this.get("store") && this.srcNodeRef.value == '') {
              var srcNodeRef = this.srcNodeRef,
                  nodes = dojo.query("> option[value='']", srcNodeRef);
            
      
            if (nodes.length && nodes[0].innerHTML != "<!--__o3_BLANK-->") {
              this.displayedValue = dojo.trim(nodes[0].innerHTML);
            }
          }   
    
          this.inherited(arguments);
      },
  
      postCreate : function() {
        // Attached a keyboard event listener so that we can set a flag
        // indicating enter is pressed in open state of dropdown
        on(this.focusNode, "keydown",function(e){
          var widget = registry.byNode(dojo.byId("widget_" + e.target.id)); 
          if(e.keyCode == dojo.keys.ENTER && widget._opened) {
            widget.enterKeyOnOpenDropDown = true;
           }
         });
        
        this.inherited(arguments);
      },
      
      startup : function(){
        // We have to change role to listbox as Jaws do not work correctly
        // in IE when role is combobox.
        this.domNode.setAttribute("role", "listbox");
        this.inherited(arguments);
      },
  
      /**
       * Overwrite _callbackSetLabel() function to make the FilteringSelect widget
       * set a particular code "__o3_INVALID" for the invalid inputs, instead
       * of setting an empty string.
       * 
         */
        _callbackSetLabel: function(
          /*Array*/ result,
          /*Object*/ query,
          /*Object*/ options,
          /*Boolean?*/ priorityChange){
        //  summary:
          //              Callback from dojo.store after lookup of user entered value finishes
    
        //  setValue does a synchronous lookup,
        //  so it calls _callbackSetLabel directly,
        //  and so does not pass dataObject
        //  still need to test against _lastQuery in case it came too late
          if((query && query[this.searchAttr] !== this._lastQuery)
              || (!query && result.length && this.get("store").getIdentity(result[0]) != this._lastQuery)){
          return;
        }
        if(!result.length){
            //#3268: don't modify display value on bad input
          //    #3285: change CSS to indicate error
            
            // CURAM CUSTOMIZATION START - This is the only customization made to
            // the ootb _callbackSetLabel method in Dojo's FilteringSelect. The
            // specific change is:
            // The second parameter below has been changed from "" to "__o3_INVALID".
            this.set("value", "__o3_INVALID", priorityChange || (priorityChange === undefined && !this.focused), this.textbox.value, null);
            // CURAM CUSTOMIZATION END
        }else{
            this.set('item', result[0], priorityChange);
        }
      }
  });
  
  return FilteringSelect;
});

},
'url:dijit/templates/MenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n",
'dojo/text':function(){
define("dojo/text", ["./_base/kernel", "require", "./has", "./_base/xhr"], function(dojo, require, has, xhr){
	// module:
	//		dojo/text
	// summary:
	//		This module implements the !dojo/text plugin and the dojo.cache API.
	// description:
	//		We choose to include our own plugin to leverage functionality already contained in dojo
	//		and thereby reduce the size of the plugin compared to various foreign loader implementations.
	//		Also, this allows foreign AMD loaders to be used without their plugins.
	//
	//		CAUTION: this module is designed to optionally function synchronously to support the dojo v1.x synchronous
	//		loader. This feature is outside the scope of the CommonJS plugins specification.

	var getText;
	if(1){
		getText= function(url, sync, load){
			xhr("GET", {url:url, sync:!!sync, load:load});
		};
	}else{
		// TODOC: only works for dojo AMD loader
		if(require.getText){
			getText= require.getText;
		}else{
			console.error("dojo/text plugin failed to load because loader does not support getText");
		}
	}

	var
		theCache= {},

		strip= function(text){
			//Strips <?xml ...?> declarations so that external SVG and XML
			//documents can be added to a document without worry. Also, if the string
			//is an HTML document, only the part inside the body tag is returned.
			if(text){
				text= text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
				var matches= text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
				if(matches){
					text= matches[1];
				}
			}else{
				text = "";
			}
			return text;
		},

		notFound = {},

		pending = {},

		result= {
			dynamic:
				// the dojo/text caches it's own resources because of dojo.cache
				true,

			normalize:function(id, toAbsMid){
				// id is something like (path may be relative):
				//
				//	 "path/to/text.html"
				//	 "path/to/text.html!strip"
				var parts= id.split("!"),
					url= parts[0];
				return (/^\./.test(url) ? toAbsMid(url) : url) + (parts[1] ? "!" + parts[1] : "");
			},

			load:function(id, require, load){
				// id is something like (path is always absolute):
				//
				//	 "path/to/text.html"
				//	 "path/to/text.html!strip"
				var
					parts= id.split("!"),
					stripFlag= parts.length>1,
					absMid= parts[0],
					url = require.toUrl(parts[0]),
					text = notFound,
					finish = function(text){
						load(stripFlag ? strip(text) : text);
					};
				if(absMid in theCache){
					text = theCache[absMid];
				}else if(url in require.cache){
					text = require.cache[url];
				}else if(url in theCache){
					text = theCache[url];
				}
				if(text===notFound){
					if(pending[url]){
						pending[url].push(finish);
					}else{
						var pendingList = pending[url] = [finish];
						getText(url, !require.async, function(text){
							theCache[absMid]= theCache[url]= text;
							for(var i = 0; i<pendingList.length;){
								pendingList[i++](text);
							}
							delete pending[url];
						});
					}
				}else{
					finish(text);
				}
			}
		};

	dojo.cache= function(/*String||Object*/module, /*String*/url, /*String||Object?*/value){
		//	 * (string string [value]) => (module, url, value)
		//	 * (object [value])        => (module, value), url defaults to ""
		//
		//	 * if module is an object, then it must be convertable to a string
		//	 * (module, url) module + (url ? ("/" + url) : "") must be a legal argument to require.toUrl
		//	 * value may be a string or an object; if an object then may have the properties "value" and/or "sanitize"
		var key;
		if(typeof module=="string"){
			if(/\//.test(module)){
				// module is a version 1.7+ resolved path
				key = module;
				value = url;
			}else{
				// module is a version 1.6- argument to dojo.moduleUrl
				key = require.toUrl(module.replace(/\./g, "/") + (url ? ("/" + url) : ""));
			}
		}else{
			key = module + "";
			value = url;
		}
		var
			val = (value != undefined && typeof value != "string") ? value.value : value,
			sanitize = value && value.sanitize;

		if(typeof val == "string"){
			//We have a string, set cache value
			theCache[key] = val;
			return sanitize ? strip(val) : val;
		}else if(val === null){
			//Remove cached value
			delete theCache[key];
			return null;
		}else{
			//Allow cache values to be empty strings. If key property does
			//not exist, fetch it.
			if(!(key in theCache)){
				getText(key, true, function(text){
					theCache[key]= text;
				});
			}
			return sanitize ? strip(theCache[key]) : theCache[key];
		}
	};

	return result;

/*=====
dojo.cache = function(module, url, value){
	// summary:
	//		A getter and setter for storing the string content associated with the
	//		module and url arguments.
	// description:
	//		If module is a string that contains slashes, then it is interpretted as a fully
	//		resolved path (typically a result returned by require.toUrl), and url should not be
	//		provided. This is the preferred signature. If module is a string that does not
	//		contain slashes, then url must also be provided and module and url are used to
	//		call `dojo.moduleUrl()` to generate a module URL. This signature is deprecated.
	//		If value is specified, the cache value for the moduleUrl will be set to
	//		that value. Otherwise, dojo.cache will fetch the moduleUrl and store it
	//		in its internal cache and return that cached value for the URL. To clear
	//		a cache value pass null for value. Since XMLHttpRequest (XHR) is used to fetch the
	//		the URL contents, only modules on the same domain of the page can use this capability.
	//		The build system can inline the cache values though, to allow for xdomain hosting.
	// module: String||Object
	//		If a String with slashes, a fully resolved path; if a String without slashes, the
	//		module name to use for the base part of the URL, similar to module argument
	//		to `dojo.moduleUrl`. If an Object, something that has a .toString() method that
	//		generates a valid path for the cache item. For example, a dojo._Url object.
	// url: String
	//		The rest of the path to append to the path derived from the module argument. If
	//		module is an object, then this second argument should be the "value" argument instead.
	// value: String||Object?
	//		If a String, the value to use in the cache for the module/url combination.
	//		If an Object, it can have two properties: value and sanitize. The value property
	//		should be the value to use in the cache, and sanitize can be set to true or false,
	//		to indicate if XML declarations should be removed from the value and if the HTML
	//		inside a body tag in the value should be extracted as the real value. The value argument
	//		or the value property on the value argument are usually only used by the build system
	//		as it inlines cache content.
	//	example:
	//		To ask dojo.cache to fetch content and store it in the cache (the dojo["cache"] style
	//		of call is used to avoid an issue with the build system erroneously trying to intern
	//		this example. To get the build system to intern your dojo.cache calls, use the
	//		"dojo.cache" style of call):
	//		| //If template.html contains "<h1>Hello</h1>" that will be
	//		| //the value for the text variable.
	//		| var text = dojo["cache"]("my.module", "template.html");
	//	example:
	//		To ask dojo.cache to fetch content and store it in the cache, and sanitize the input
	//		 (the dojo["cache"] style of call is used to avoid an issue with the build system
	//		erroneously trying to intern this example. To get the build system to intern your
	//		dojo.cache calls, use the "dojo.cache" style of call):
	//		| //If template.html contains "<html><body><h1>Hello</h1></body></html>", the
	//		| //text variable will contain just "<h1>Hello</h1>".
	//		| var text = dojo["cache"]("my.module", "template.html", {sanitize: true});
	//	example:
	//		Same example as previous, but demostrates how an object can be passed in as
	//		the first argument, then the value argument can then be the second argument.
	//		| //If template.html contains "<html><body><h1>Hello</h1></body></html>", the
	//		| //text variable will contain just "<h1>Hello</h1>".
	//		| var text = dojo["cache"](new dojo._Url("my/module/template.html"), {sanitize: true});
	return val; //String
};
=====*/
});


},
'dojo/uacss':function(){
define("dojo/uacss", ["./dom-geometry", "./_base/lang", "./ready", "./_base/sniff", "./_base/window"],
	function(geometry, lang, ready, has, baseWindow){
	// module:
	//		dojo/uacss
	// summary:
	//		Applies pre-set CSS classes to the top-level HTML node, based on:
	//			- browser (ex: dj_ie)
	//			- browser version (ex: dj_ie6)
	//			- box model (ex: dj_contentBox)
	//			- text direction (ex: dijitRtl)
	//
	//		In addition, browser, browser version, and box model are
	//		combined with an RTL flag when browser text is RTL. ex: dj_ie-rtl.

	var
		html = baseWindow.doc.documentElement,
		ie = has("ie"),
		opera = has("opera"),
		maj = Math.floor,
		ff = has("ff"),
		boxModel = geometry.boxModel.replace(/-/,''),

		classes = {
			"dj_quirks": has("quirks"),

			// NOTE: Opera not supported by dijit
			"dj_opera": opera,

			"dj_khtml": has("khtml"),

			"dj_webkit": has("webkit"),
			"dj_safari": has("safari"),
			"dj_chrome": has("chrome"),

			"dj_gecko": has("mozilla")
		}; // no dojo unsupported browsers

	if(ie){
		classes["dj_ie"] = true;
		classes["dj_ie" + maj(ie)] = true;
		classes["dj_iequirks"] = has("quirks");
	}
	if(ff){
		classes["dj_ff" + maj(ff)] = true;
	}

	classes["dj_" + boxModel] = true;

	// apply browser, browser version, and box model class names
	var classStr = "";
	for(var clz in classes){
		if(classes[clz]){
			classStr += clz + " ";
		}
	}
	html.className = lang.trim(html.className + " " + classStr);

	// If RTL mode, then add dj_rtl flag plus repeat existing classes with -rtl extension.
	// We can't run the code below until the <body> tag has loaded (so we can check for dir=rtl).
	// priority is 90 to run ahead of parser priority of 100
	ready(90, function(){
		if(!geometry.isBodyLtr()){
			var rtlClassStr = "dj_rtl dijitRtl " + classStr.replace(/ /g, "-rtl ");
			html.className = lang.trim(html.className + " " + rtlClassStr + "dj_rtl dijitRtl " + classStr.replace(/ /g, "-rtl "));
		}
	});
	return has;
});

},
'dijit/Tooltip':function(){
require({cache:{
'url:dijit/templates/Tooltip.html':"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip", [
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/declare", // declare
	"dojo/_base/fx", // fx.fadeIn fx.fadeOut
	"dojo/dom", // dom.byId
	"dojo/dom-class", // domClass.add
	"dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
	"dojo/dom-style", // domStyle.set, domStyle.get
	"dojo/_base/lang", // lang.hitch lang.isArrayLike
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/window", // win.body
	"./_base/manager",	// manager.defaultDuration
	"./place",
	"./_Widget",
	"./_TemplatedMixin",
	"./BackgroundIframe",
	"dojo/text!./templates/Tooltip.html",
	"."		// sets dijit.showTooltip etc. for back-compat
], function(array, declare, fx, dom, domClass, domGeometry, domStyle, lang, has, win,
			manager, place, _Widget, _TemplatedMixin, BackgroundIframe, template, dijit){

/*=====
	var _Widget = dijit._Widget;
	var BackgroundIframe = dijit.BackgroundIframe;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/Tooltip
	// summary:
	//		Defines dijit.Tooltip widget (to display a tooltip), showTooltip()/hideTooltip(), and _MasterTooltip


	var MasterTooltip = declare("dijit._MasterTooltip", [_Widget, _TemplatedMixin], {
		// summary:
		//		Internal widget that holds the actual tooltip markup,
		//		which occurs once per page.
		//		Called by Tooltip widgets which are just containers to hold
		//		the markup
		// tags:
		//		protected

		// duration: Integer
		//		Milliseconds to fade in/fade out
		duration: manager.defaultDuration,

		templateString: template,

		postCreate: function(){
			win.body().appendChild(this.domNode);

			this.bgIframe = new BackgroundIframe(this.domNode);

			// Setup fade-in and fade-out functions.
			this.fadeIn = fx.fadeIn({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onShow") });
			this.fadeOut = fx.fadeOut({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onHide") });
		},

		show: function(innerHTML, aroundNode, position, rtl, textDir){
			// summary:
			//		Display tooltip w/specified contents to right of specified node
			//		(To left if there's no space on the right, or if rtl == true)
			// innerHTML: String
			//		Contents of the tooltip
			// aroundNode: DomNode || dijit.__Rectangle
			//		Specifies that tooltip should be next to this node / area
			// position: String[]?
			//		List of positions to try to position tooltip (ex: ["right", "above"])
			// rtl: Boolean?
			//		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
			//		means "rtl"; specifies GUI direction, not text direction.
			// textDir: String?
			//		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.


			if(this.aroundNode && this.aroundNode === aroundNode && this.containerNode.innerHTML == innerHTML){
				return;
			}

			// reset width; it may have been set by orient() on a previous tooltip show()
			this.domNode.width = "auto";

			if(this.fadeOut.status() == "playing"){
				// previous tooltip is being hidden; wait until the hide completes then show new one
				this._onDeck=arguments;
				return;
			}
			this.containerNode.innerHTML=innerHTML;

			if(textDir){
				this.set("textDir", textDir);
			}
			this.containerNode.align = rtl? "right" : "left"; //fix the text alignment

			var pos = place.around(this.domNode, aroundNode,
				position && position.length ? position : Tooltip.defaultPosition, !rtl, lang.hitch(this, "orient"));

			// Position the tooltip connector for middle alignment.
			// This could not have been done in orient() since the tooltip wasn't positioned at that time.
			var aroundNodeCoords = pos.aroundNodePos;
			if(pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M'){
				this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
				this.connectorNode.style.left = "";
			}else if(pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M'){
				this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
			}

			// show it
			domStyle.set(this.domNode, "opacity", 0);
			this.fadeIn.play();
			this.isShowingNow = true;
			this.aroundNode = aroundNode;
		},

		orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ tooltipCorner, /*Object*/ spaceAvailable, /*Object*/ aroundNodeCoords){
			// summary:
			//		Private function to set CSS for tooltip node based on which position it's in.
			//		This is called by the dijit popup code.   It will also reduce the tooltip's
			//		width to whatever width is available
			// tags:
			//		protected
			this.connectorNode.style.top = ""; //reset to default

			//Adjust the spaceAvailable width, without changing the spaceAvailable object
			var tooltipSpaceAvaliableWidth = spaceAvailable.w - this.connectorNode.offsetWidth;

			node.className = "dijitTooltip " +
				{
					"MR-ML": "dijitTooltipRight",
					"ML-MR": "dijitTooltipLeft",
					"TM-BM": "dijitTooltipAbove",
					"BM-TM": "dijitTooltipBelow",
					"BL-TL": "dijitTooltipBelow dijitTooltipABLeft",
					"TL-BL": "dijitTooltipAbove dijitTooltipABLeft",
					"BR-TR": "dijitTooltipBelow dijitTooltipABRight",
					"TR-BR": "dijitTooltipAbove dijitTooltipABRight",
					"BR-BL": "dijitTooltipRight",
					"BL-BR": "dijitTooltipLeft"
				}[aroundCorner + "-" + tooltipCorner];

			// reduce tooltip's width to the amount of width available, so that it doesn't overflow screen
			this.domNode.style.width = "auto";
			var size = domGeometry.getContentBox(this.domNode);

			var width = Math.min((Math.max(tooltipSpaceAvaliableWidth,1)), size.w);
			var widthWasReduced = width < size.w;

			this.domNode.style.width = width+"px";

			//Adjust width for tooltips that have a really long word or a nowrap setting
			if(widthWasReduced){
				this.containerNode.style.overflow = "auto"; //temp change to overflow to detect if our tooltip needs to be wider to support the content
				var scrollWidth = this.containerNode.scrollWidth;
				this.containerNode.style.overflow = "visible"; //change it back
				if(scrollWidth > width){
					scrollWidth = scrollWidth + domStyle.get(this.domNode,"paddingLeft") + domStyle.get(this.domNode,"paddingRight");
					this.domNode.style.width = scrollWidth + "px";
				}
			}

			// Reposition the tooltip connector.
			if(tooltipCorner.charAt(0) == 'B' && aroundCorner.charAt(0) == 'B'){
				var mb = domGeometry.getMarginBox(node);
				var tooltipConnectorHeight = this.connectorNode.offsetHeight;
				if(mb.h > spaceAvailable.h){
					// The tooltip starts at the top of the page and will extend past the aroundNode
					var aroundNodePlacement = spaceAvailable.h - ((aroundNodeCoords.h + tooltipConnectorHeight) >> 1);
					this.connectorNode.style.top = aroundNodePlacement + "px";
					this.connectorNode.style.bottom = "";
				}else{
					// Align center of connector with center of aroundNode, except don't let bottom
					// of connector extend below bottom of tooltip content, or top of connector
					// extend past top of tooltip content
					this.connectorNode.style.bottom = Math.min(
						Math.max(aroundNodeCoords.h/2 - tooltipConnectorHeight/2, 0),
						mb.h - tooltipConnectorHeight) + "px";
					this.connectorNode.style.top = "";
				}
			}else{
				// reset the tooltip back to the defaults
				this.connectorNode.style.top = "";
				this.connectorNode.style.bottom = "";
			}

			return Math.max(0, size.w - tooltipSpaceAvaliableWidth);
		},

		_onShow: function(){
			// summary:
			//		Called at end of fade-in operation
			// tags:
			//		protected
			if(has("ie")){
				// the arrow won't show up on a node w/an opacity filter
				this.domNode.style.filter="";
			}
		},

		hide: function(aroundNode){
			// summary:
			//		Hide the tooltip

			if(this._onDeck && this._onDeck[1] == aroundNode){
				// this hide request is for a show() that hasn't even started yet;
				// just cancel the pending show()
				this._onDeck=null;
			}else if(this.aroundNode === aroundNode){
				// this hide request is for the currently displayed tooltip
				this.fadeIn.stop();
				this.isShowingNow = false;
				this.aroundNode = null;
				this.fadeOut.play();
			}else{
				// just ignore the call, it's for a tooltip that has already been erased
			}
		},

		_onHide: function(){
			// summary:
			//		Called at end of fade-out operation
			// tags:
			//		protected

			this.domNode.style.cssText="";	// to position offscreen again
			this.containerNode.innerHTML="";
			if(this._onDeck){
				// a show request has been queued up; do it now
				this.show.apply(this, this._onDeck);
				this._onDeck=null;
			}
		},

		_setAutoTextDir: function(/*Object*/node){
			// summary:
			//	    Resolve "auto" text direction for children nodes
			// tags:
			//		private

			this.applyTextDir(node, has("ie") ? node.outerText : node.textContent);
			array.forEach(node.children, function(child){this._setAutoTextDir(child); }, this);
		},

		_setTextDirAttr: function(/*String*/ textDir){
			// summary:
			//		Setter for textDir.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('textDir', value)
			// tags:
			//		private

			this._set("textDir", textDir);

			if (textDir == "auto"){
				this._setAutoTextDir(this.containerNode);
			}else{
				this.containerNode.dir = this.textDir;
			}
		}
	});

	dijit.showTooltip = function(innerHTML, aroundNode, position, rtl, textDir){
		// summary:
		//		Static method to display tooltip w/specified contents in specified position.
		//		See description of dijit.Tooltip.defaultPosition for details on position parameter.
		//		If position is not specified then dijit.Tooltip.defaultPosition is used.
		// innerHTML: String
		//		Contents of the tooltip
		// aroundNode: dijit.__Rectangle
		//		Specifies that tooltip should be next to this node / area
		// position: String[]?
		//		List of positions to try to position tooltip (ex: ["right", "above"])
		// rtl: Boolean?
		//		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
		//		means "rtl"; specifies GUI direction, not text direction.
		// textDir: String?
		//		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.

		// after/before don't work, but they used to, so for back-compat convert them to after-centered, before-centered
		if(position){
			position = array.map(position, function(val){
				return {after: "after-centered", before: "before-centered"}[val] || val;
			});
		}

		if(!Tooltip._masterTT){ dijit._masterTT = Tooltip._masterTT = new MasterTooltip(); }
		return Tooltip._masterTT.show(innerHTML, aroundNode, position, rtl, textDir);
	};

	dijit.hideTooltip = function(aroundNode){
		// summary:
		//		Static method to hide the tooltip displayed via showTooltip()
		return Tooltip._masterTT && Tooltip._masterTT.hide(aroundNode);
	};

	var Tooltip = declare("dijit.Tooltip", _Widget, {
		// summary:
		//		Pops up a tooltip (a help message) when you hover over a node.

		// label: String
		//		Text to display in the tooltip.
		//		Specified as innerHTML when creating the widget from markup.
		label: "",

		// showDelay: Integer
		//		Number of milliseconds to wait after hovering over/focusing on the object, before
		//		the tooltip is displayed.
		showDelay: 400,

		// connectId: String|String[]
		//		Id of domNode(s) to attach the tooltip to.
		//		When user hovers over specified dom node, the tooltip will appear.
		connectId: [],

		// position: String[]
		//		See description of `dijit.Tooltip.defaultPosition` for details on position parameter.
		position: [],

		_setConnectIdAttr: function(/*String|String[]*/ newId){
			// summary:
			//		Connect to specified node(s)

			// Remove connections to old nodes (if there are any)
			array.forEach(this._connections || [], function(nested){
				array.forEach(nested, lang.hitch(this, "disconnect"));
			}, this);

			// Make array of id's to connect to, excluding entries for nodes that don't exist yet, see startup()
			this._connectIds = array.filter(lang.isArrayLike(newId) ? newId : (newId ? [newId] : []),
					function(id){ return dom.byId(id); });

			// Make connections
			this._connections = array.map(this._connectIds, function(id){
				var node = dom.byId(id);
				return [
					this.connect(node, "onmouseenter", "_onHover"),
					this.connect(node, "onmouseleave", "_onUnHover"),
					this.connect(node, "onfocus", "_onHover"),
					this.connect(node, "onblur", "_onUnHover")
				];
			}, this);

			this._set("connectId", newId);
		},

		addTarget: function(/*DOMNODE || String*/ node){
			// summary:
			//		Attach tooltip to specified node if it's not already connected

			// TODO: remove in 2.0 and just use set("connectId", ...) interface

			var id = node.id || node;
			if(array.indexOf(this._connectIds, id) == -1){
				this.set("connectId", this._connectIds.concat(id));
			}
		},

		removeTarget: function(/*DomNode || String*/ node){
			// summary:
			//		Detach tooltip from specified node

			// TODO: remove in 2.0 and just use set("connectId", ...) interface

			var id = node.id || node,	// map from DOMNode back to plain id string
				idx = array.indexOf(this._connectIds, id);
			if(idx >= 0){
				// remove id (modifies original this._connectIds but that's OK in this case)
				this._connectIds.splice(idx, 1);
				this.set("connectId", this._connectIds);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);
			domClass.add(this.domNode,"dijitTooltipData");
		},

		startup: function(){
			this.inherited(arguments);

			// If this tooltip was created in a template, or for some other reason the specified connectId[s]
			// didn't exist during the widget's initialization, then connect now.
			var ids = this.connectId;
			array.forEach(lang.isArrayLike(ids) ? ids : [ids], this.addTarget, this);
		},

		_onHover: function(/*Event*/ e){
			// summary:
			//		Despite the name of this method, it actually handles both hover and focus
			//		events on the target node, setting a timer to show the tooltip.
			// tags:
			//		private
			if(!this._showTimer){
				var target = e.target;
				this._showTimer = setTimeout(lang.hitch(this, function(){this.open(target)}), this.showDelay);
			}
		},

		_onUnHover: function(/*Event*/ /*===== e =====*/){
			// summary:
			//		Despite the name of this method, it actually handles both mouseleave and blur
			//		events on the target node, hiding the tooltip.
			// tags:
			//		private

			// keep a tooltip open if the associated element still has focus (even though the
			// mouse moved away)
			if(this._focus){ return; }

			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			this.close();
		},

		open: function(/*DomNode*/ target){
 			// summary:
			//		Display the tooltip; usually not called directly.
			// tags:
			//		private

			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			Tooltip.show(this.label || this.domNode.innerHTML, target, this.position, !this.isLeftToRight(), this.textDir);

			this._connectNode = target;
			this.onShow(target, this.position);
		},

		close: function(){
			// summary:
			//		Hide the tooltip or cancel timer for show of tooltip
			// tags:
			//		private

			if(this._connectNode){
				// if tooltip is currently shown
				Tooltip.hide(this._connectNode);
				delete this._connectNode;
				this.onHide();
			}
			if(this._showTimer){
				// if tooltip is scheduled to be shown (after a brief delay)
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
		},

		onShow: function(/*===== target, position =====*/){
			// summary:
			//		Called when the tooltip is shown
			// tags:
			//		callback
		},

		onHide: function(){
			// summary:
			//		Called when the tooltip is hidden
			// tags:
			//		callback
		},

		uninitialize: function(){
			this.close();
			this.inherited(arguments);
		}
	});

	Tooltip._MasterTooltip = MasterTooltip;		// for monkey patching
	Tooltip.show = dijit.showTooltip;		// export function through module return value
	Tooltip.hide = dijit.hideTooltip;		// export function through module return value

	// dijit.Tooltip.defaultPosition: String[]
	//		This variable controls the position of tooltips, if the position is not specified to
	//		the Tooltip widget or *TextBox widget itself.  It's an array of strings with the values
	//		possible for `dijit/place::around()`.   The recommended values are:
	//
	//			* before-centered: centers tooltip to the left of the anchor node/widget, or to the right
	//				 in the case of RTL scripts like Hebrew and Arabic
	//			* after-centered: centers tooltip to the right of the anchor node/widget, or to the left
	//				 in the case of RTL scripts like Hebrew and Arabic
	//			* above-centered: tooltip is centered above anchor node
	//			* below-centered: tooltip is centered above anchor node
	//
	//		The list is positions is tried, in order, until a position is found where the tooltip fits
	//		within the viewport.
	//
	//		Be careful setting this parameter.  A value of "above-centered" may work fine until the user scrolls
	//		the screen so that there's no room above the target node.   Nodes with drop downs, like
	//		DropDownButton or FilteringSelect, are especially problematic, in that you need to be sure
	//		that the drop down and tooltip don't overlap, even when the viewport is scrolled so that there
	//		is only room below (or above) the target node, but not both.
	Tooltip.defaultPosition = ["after-centered", "before-centered"];


	return Tooltip;
});

},
'dojo/string':function(){
define("dojo/string", ["./_base/kernel", "./_base/lang"], function(dojo, lang) {
	// module:
	//		dojo/string
	// summary:
	//		TODOC

lang.getObject("string", true, dojo);

/*=====
dojo.string = {
	// summary: String utilities for Dojo
};
=====*/

dojo.string.rep = function(/*String*/str, /*Integer*/num){
	// summary:
	//		Efficiently replicate a string `n` times.
	// str:
	//		the string to replicate
	// num:
	//		number of times to replicate the string

	if(num <= 0 || !str){ return ""; }

	var buf = [];
	for(;;){
		if(num & 1){
			buf.push(str);
		}
		if(!(num >>= 1)){ break; }
		str += str;
	}
	return buf.join("");	// String
};

dojo.string.pad = function(/*String*/text, /*Integer*/size, /*String?*/ch, /*Boolean?*/end){
	// summary:
	//		Pad a string to guarantee that it is at least `size` length by
	//		filling with the character `ch` at either the start or end of the
	//		string. Pads at the start, by default.
	// text:
	//		the string to pad
	// size:
	//		length to provide padding
	// ch:
	//		character to pad, defaults to '0'
	// end:
	//		adds padding at the end if true, otherwise pads at start
	// example:
	//	|	// Fill the string to length 10 with "+" characters on the right.  Yields "Dojo++++++".
	//	|	dojo.string.pad("Dojo", 10, "+", true);

	if(!ch){
		ch = '0';
	}
	var out = String(text),
		pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
	return end ? out + pad : pad + out;	// String
};

dojo.string.substitute = function(	/*String*/		template,
									/*Object|Array*/map,
									/*Function?*/	transform,
									/*Object?*/		thisObject){
	// summary:
	//		Performs parameterized substitutions on a string. Throws an
	//		exception if any parameter is unmatched.
	// template:
	//		a string with expressions in the form `${key}` to be replaced or
	//		`${key:format}` which specifies a format function. keys are case-sensitive.
	// map:
	//		hash to search for substitutions
	// transform:
	//		a function to process all parameters before substitution takes
	//		place, e.g. mylib.encodeXML
	// thisObject:
	//		where to look for optional format function; default to the global
	//		namespace
	// example:
	//		Substitutes two expressions in a string from an Array or Object
	//	|	// returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// by providing substitution data in an Array
	//	|	dojo.string.substitute(
	//	|		"File '${0}' is not found in directory '${1}'.",
	//	|		["foo.html","/temp"]
	//	|	);
	//	|
	//	|	// also returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// but provides substitution data in an Object structure.  Dotted
	//	|	// notation may be used to traverse the structure.
	//	|	dojo.string.substitute(
	//	|		"File '${name}' is not found in directory '${info.dir}'.",
	//	|		{ name: "foo.html", info: { dir: "/temp" } }
	//	|	);
	// example:
	//		Use a transform function to modify the values:
	//	|	// returns "file 'foo.html' is not found in directory '/temp'."
	//	|	dojo.string.substitute(
	//	|		"${0} is not found in ${1}.",
	//	|		["foo.html","/temp"],
	//	|		function(str){
	//	|			// try to figure out the type
	//	|			var prefix = (str.charAt(0) == "/") ? "directory": "file";
	//	|			return prefix + " '" + str + "'";
	//	|		}
	//	|	);
	// example:
	//		Use a formatter
	//	|	// returns "thinger -- howdy"
	//	|	dojo.string.substitute(
	//	|		"${0:postfix}", ["thinger"], null, {
	//	|			postfix: function(value, key){
	//	|				return value + " -- howdy";
	//	|			}
	//	|		}
	//	|	);

	thisObject = thisObject || dojo.global;
	transform = transform ?
		lang.hitch(thisObject, transform) : function(v){ return v; };

	return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
		function(match, key, format){
			var value = lang.getObject(key, false, map);
			if(format){
				value = lang.getObject(format, false, thisObject).call(thisObject, value, key);
			}
			return transform(value, key).toString();
		}); // String
};

/*=====
dojo.string.trim = function(str){
	// summary:
	//		Trims whitespace from both sides of the string
	// str: String
	//		String to be trimmed
	// returns: String
	//		Returns the trimmed string
	// description:
	//		This version of trim() was taken from [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript).
	//		The short yet performant version of this function is dojo.trim(),
	//		which is part of Dojo base.  Uses String.prototype.trim instead, if available.
	return "";	// String
}
=====*/

dojo.string.trim = String.prototype.trim ?
	lang.trim : // aliasing to the native function
	function(str){
		str = str.replace(/^\s+/, '');
		for(var i = str.length - 1; i >= 0; i--){
			if(/\S/.test(str.charAt(i))){
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	};

return dojo.string;
});

},
'curam/util/ui/refresh/RefreshEvent':function(){
/*
 * Copyright 2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/util/ui/refresh/RefreshEvent", [], function() {
  
  /*
   * Modification History
   * --------------------
   * 04-Jul-2011  MV  [CR00269970] Initial version.
   */

  /**
   * @name curam.util.ui.refresh.RefreshEvent
   * @namespace Represents a UI element refresh event.
   * 
   */
  var RefreshEvent = dojo.declare("curam.util.ui.refresh.RefreshEvent", null,
  /**
   * @lends curam.util.ui.refresh.RefreshEvent.prototype
   */
  {
    /** Event type constant. */
    TYPE_ONLOAD: "onload",
    
    /** Event type constant. */
    TYPE_ONSUBMIT: "onsubmit",
    
    /** Event context constant. */
    SOURCE_CONTEXT_MAIN: "main-content",
    
    /** Event context constant. */
    SOURCE_CONTEXT_DIALOG: "dialog",
    
    /** Event context constant. */
    SOURCE_CONTEXT_INLINE: "inline",

    /** Holds the type of the event. */
    _type: null,
    
    /** Holds the context of the event. */
    _context: null,
    
    /**
     * Creates an instance of the refresh event.
     * 
     * @param {String}
     *                type The event type. Only accepted values will be the ones
     *                provided as constants in this class.
     * @param {String}
     *                context The event context. Only accepted values will be the
     *                ones provided as constants in this class.
     */
    constructor: function(type, context) {
      if (!type || !context) {
        throw "Required parameters missing.";
      }
      if (!(type == this.TYPE_ONLOAD || type == this.TYPE_ONSUBMIT)) {
        throw "Unknown type: " + type;
      }
      if (!(context == this.SOURCE_CONTEXT_DIALOG
          || context == this.SOURCE_CONTEXT_INLINE
          || context == this.SOURCE_CONTEXT_MAIN)) {
        throw "Unknown context: " + context;
      }

      this._type = type;
      this._context = context;
    },
    
    /**
     * Determines if the specified event is the same as this one.
     * 
     * @param other
     *                The event to check.
     * @returns {Boolean} True if the other event is the same, otherwise false.
     */
    equals: function(other) {
      // check for undefined, null and variable types other than object
      if (typeof other != "object") {
        return false;
      }
      
      // check for Dojo class name
      if (other.declaredClass != this.declaredClass) {
        return false;
      }
      
      return this._type === other._type
          && this._context === other._context;
    }
  });
  
  return RefreshEvent;
});

},
'dijit/dijit':function(){
define("dijit/dijit", [
	".",
	"./_base",
	"dojo/parser",
	"./_Widget",
	"./_TemplatedMixin",
	"./_Container",
	"./layout/_LayoutWidget",
	"./form/_FormWidget",
	"./form/_FormValueWidget"
], function(dijit){

	// module:
	//		dijit/dijit
	// summary:
	//		A roll-up for common dijit methods
	//		All the stuff in _base (these are the function that are guaranteed available without an explicit dojo.require)
	//		And some other stuff that we tend to pull in all the time anyway

	return dijit;
});

},
'dijit/form/_FormValueMixin':function(){
define("dijit/form/_FormValueMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/keys", // keys.ESCAPE
	"dojo/_base/sniff", // has("ie"), has("quirks")
	"./_FormWidgetMixin"
], function(declare, domAttr, keys, has, _FormWidgetMixin){

/*=====
	var _FormWidgetMixin = dijit.form._FormWidgetMixin;
=====*/

	// module:
	//		dijit/form/_FormValueMixin
	// summary:
	//		Mixin for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.

	return declare("dijit.form._FormValueMixin", _FormWidgetMixin, {
		// summary:
		//		Mixin for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.
		// description:
		//		Each _FormValueMixin represents a single input value, and has a (possibly hidden) <input> element,
		//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
		//		works as expected.

		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,

		_setReadOnlyAttr: function(/*Boolean*/ value){
			domAttr.set(this.focusNode, 'readOnly', value);
			this._set("readOnly", value);
		},

		postCreate: function(){
			this.inherited(arguments);

			if(has("ie")){ // IE won't stop the event with keypress
				this.connect(this.focusNode || this.domNode, "onkeydown", this._onKeyDown);
			}
			// Update our reset value if it hasn't yet been set (because this.set()
			// is only called when there *is* a value)
			if(this._resetValue === undefined){
				this._lastValueReported = this._resetValue = this.value;
			}
		},

		_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the widget.
			//		If the value has changed, then fire onChange event, unless priorityChange
			//		is specified as null (or false?)
			this._handleOnChange(newValue, priorityChange);
		},

		_handleOnChange: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Called when the value of the widget has changed.  Saves the new value in this.value,
			//		and calls onChange() if appropriate.   See _FormWidget._handleOnChange() for details.
			this._set("value", newValue);
			this.inherited(arguments);
		},

		undo: function(){
			// summary:
			//		Restore the value to the last value passed to onChange
			this._setValueAttr(this._lastValueReported, false);
		},

		reset: function(){
			// summary:
			//		Reset the widget's value to what it was at initialization time
			this._hasBeenBlurred = false;
			this._setValueAttr(this._resetValue, true);
		},

		_onKeyDown: function(e){
			if(e.keyCode == keys.ESCAPE && !(e.ctrlKey || e.altKey || e.metaKey)){
				var te;
				if(has("ie") < 9 || (has("ie") && has("quirks"))){
					e.preventDefault(); // default behavior needs to be stopped here since keypress is too late
					te = document.createEventObject();
					te.keyCode = keys.ESCAPE;
					te.shiftKey = e.shiftKey;
					e.srcElement.fireEvent('onkeypress', te);
				}
			}
		}
	});
});

},
'dijit/form/_FormWidgetMixin':function(){
define("dijit/form/_FormWidgetMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-style", // domStyle.get
	"dojo/_base/lang", // lang.hitch lang.isArray
	"dojo/mouse", // mouse.isLeft
	"dojo/_base/sniff", // has("webkit")
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.scrollIntoView
	"../a11y"	// a11y.hasDefaultTabStop
], function(array, declare, domAttr, domStyle, lang, mouse, has, win, winUtils, a11y){

// module:
//		dijit/form/_FormWidgetMixin
// summary:
//		Mixin for widgets corresponding to native HTML elements such as <checkbox> or <button>,
//		which can be children of a <form> node or a `dijit.form.Form` widget.

return declare("dijit.form._FormWidgetMixin", null, {
	// summary:
	//		Mixin for widgets corresponding to native HTML elements such as <checkbox> or <button>,
	//		which can be children of a <form> node or a `dijit.form.Form` widget.
	//
	// description:
	//		Represents a single HTML element.
	//		All these widgets should have these attributes just like native HTML input elements.
	//		You can set them during widget construction or afterwards, via `dijit._Widget.attr`.
	//
	//		They also share some common methods.

	// name: [const] String
	//		Name used when submitting form; same as "name" attribute or plain HTML elements
	name: "",

	// alt: String
	//		Corresponds to the native HTML <input> element's attribute.
	alt: "",

	// value: String
	//		Corresponds to the native HTML <input> element's attribute.
	value: "",

	// type: [const] String
	//		Corresponds to the native HTML <input> element's attribute.
	type: "text",

	// tabIndex: Integer
	//		Order fields are traversed when user hits the tab key
	tabIndex: "0",
	_setTabIndexAttr: "focusNode",	// force copy even when tabIndex default value, needed since Button is <span>

	// disabled: Boolean
	//		Should this widget respond to user input?
	//		In markup, this is specified as "disabled='disabled'", or just "disabled".
	disabled: false,

	// intermediateChanges: Boolean
	//		Fires onChange for each value change or only on demand
	intermediateChanges: false,

	// scrollOnFocus: Boolean
	//		On focus, should this widget scroll into view?
	scrollOnFocus: true,

	// Override _WidgetBase mapping id to this.domNode, needs to be on focusNode so <label> etc.
	// works with screen reader
	_setIdAttr: "focusNode",

	_setDisabledAttr: function(/*Boolean*/ value){
		this._set("disabled", value);
		domAttr.set(this.focusNode, 'disabled', value);
		if(this.valueNode){
			domAttr.set(this.valueNode, 'disabled', value);
		}
		this.focusNode.setAttribute("aria-disabled", value ? "true" : "false");

		if(value){
			// reset these, because after the domNode is disabled, we can no longer receive
			// mouse related events, see #4200
			this._set("hovering", false);
			this._set("active", false);

			// clear tab stop(s) on this widget's focusable node(s)  (ComboBox has two focusable nodes)
			var attachPointNames = "tabIndex" in this.attributeMap ? this.attributeMap.tabIndex :
				("_setTabIndexAttr" in this) ? this._setTabIndexAttr : "focusNode";
			array.forEach(lang.isArray(attachPointNames) ? attachPointNames : [attachPointNames], function(attachPointName){
				var node = this[attachPointName];
				// complex code because tabIndex=-1 on a <div> doesn't work on FF
				if(has("webkit") || a11y.hasDefaultTabStop(node)){	// see #11064 about webkit bug
					node.setAttribute('tabIndex', "-1");
				}else{
					node.removeAttribute('tabIndex');
				}
			}, this);
		}else{
			if(this.tabIndex != ""){
				this.set('tabIndex', this.tabIndex);
			}
		}
	},

	_onFocus: function(/*String*/ by){
		// If user clicks on the widget, even if the mouse is released outside of it,
		// this widget's focusNode should get focus (to mimic native browser hehavior).
		// Browsers often need help to make sure the focus via mouse actually gets to the focusNode.
		if(by == "mouse" && this.isFocusable()){
			// IE exhibits strange scrolling behavior when refocusing a node so only do it when !focused.
			var focusConnector = this.connect(this.focusNode, "onfocus", function(){
				this.disconnect(mouseUpConnector);
				this.disconnect(focusConnector);
			});
			// Set a global event to handle mouseup, so it fires properly
			// even if the cursor leaves this.domNode before the mouse up event.
			var mouseUpConnector = this.connect(win.body(), "onmouseup", function(){
				this.disconnect(mouseUpConnector);
				this.disconnect(focusConnector);
				// if here, then the mousedown did not focus the focusNode as the default action
				if(this.focused){
					this.focus();
				}
			});
		}
		if(this.scrollOnFocus){
			this.defer(function(){ winUtils.scrollIntoView(this.domNode); }); // without defer, the input caret position can change on mouse click
		}
		this.inherited(arguments);
	},

	isFocusable: function(){
		// summary:
		//		Tells if this widget is focusable or not.  Used internally by dijit.
		// tags:
		//		protected
		return !this.disabled && this.focusNode && (domStyle.get(this.domNode, "display") != "none");
	},

	focus: function(){
		// summary:
		//		Put focus on this widget
		if(!this.disabled && this.focusNode.focus){
			try{ this.focusNode.focus(); }catch(e){}/*squelch errors from hidden nodes*/
		}
	},

	compare: function(/*anything*/ val1, /*anything*/ val2){
		// summary:
		//		Compare 2 values (as returned by get('value') for this widget).
		// tags:
		//		protected
		if(typeof val1 == "number" && typeof val2 == "number"){
			return (isNaN(val1) && isNaN(val2)) ? 0 : val1 - val2;
		}else if(val1 > val2){
			return 1;
		}else if(val1 < val2){
			return -1;
		}else{
			return 0;
		}
	},

	onChange: function(/*===== newValue =====*/){
		// summary:
		//		Callback when this widget's value is changed.
		// tags:
		//		callback
	},

	// _onChangeActive: [private] Boolean
	//		Indicates that changes to the value should call onChange() callback.
	//		This is false during widget initialization, to avoid calling onChange()
	//		when the initial value is set.
	_onChangeActive: false,

	_handleOnChange: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
		// summary:
		//		Called when the value of the widget is set.  Calls onChange() if appropriate
		// newValue:
		//		the new value
		// priorityChange:
		//		For a slider, for example, dragging the slider is priorityChange==false,
		//		but on mouse up, it's priorityChange==true.  If intermediateChanges==false,
		//		onChange is only called form priorityChange=true events.
		// tags:
		//		private
		if(this._lastValueReported == undefined && (priorityChange === null || !this._onChangeActive)){
			// this block executes not for a change, but during initialization,
			// and is used to store away the original value (or for ToggleButton, the original checked state)
			this._resetValue = this._lastValueReported = newValue;
		}
		this._pendingOnChange = this._pendingOnChange
			|| (typeof newValue != typeof this._lastValueReported)
			|| (this.compare(newValue, this._lastValueReported) != 0);
		if((this.intermediateChanges || priorityChange || priorityChange === undefined) && this._pendingOnChange){
			this._lastValueReported = newValue;
			this._pendingOnChange = false;
			if(this._onChangeActive){
				if(this._onChangeHandle){
					this._onChangeHandle.remove();
				}
				// defer allows hidden value processing to run and
				// also the onChange handler can safely adjust focus, etc
				this._onChangeHandle = this.defer(
					function(){
						this._onChangeHandle = null;
						this.onChange(newValue);
					}); // try to collapse multiple onChange's fired faster than can be processed
			}
		}
	},

	create: function(){
		// Overrides _Widget.create()
		this.inherited(arguments);
		this._onChangeActive = true;
	},

	destroy: function(){
		if(this._onChangeHandle){ // destroy called before last onChange has fired
			this._onChangeHandle.remove();
			this.onChange(this._lastValueReported);
		}
		this.inherited(arguments);
	}
});

});

},
'dijit/WidgetSet':function(){
define("dijit/WidgetSet", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/declare", // declare
	"dojo/_base/window", // win.global
	"./registry"	// to add functions to dijit.registry
], function(array, declare, win, registry){

	// module:
	//		dijit/WidgetSet
	// summary:
	//		Legacy registry code.   New modules should just use registry.
	//		Will be removed in 2.0.

	var WidgetSet = declare("dijit.WidgetSet", null, {
		// summary:
		//		A set of widgets indexed by id. A default instance of this class is
		//		available as `dijit.registry`
		//
		// example:
		//		Create a small list of widgets:
		//		|	var ws = new dijit.WidgetSet();
		//		|	ws.add(dijit.byId("one"));
		//		| 	ws.add(dijit.byId("two"));
		//		|	// destroy both:
		//		|	ws.forEach(function(w){ w.destroy(); });
		//
		// example:
		//		Using dijit.registry:
		//		|	dijit.registry.forEach(function(w){ /* do something */ });

		constructor: function(){
			this._hash = {};
			this.length = 0;
		},

		add: function(/*dijit._Widget*/ widget){
			// summary:
			//		Add a widget to this list. If a duplicate ID is detected, a error is thrown.
			//
			// widget: dijit._Widget
			//		Any dijit._Widget subclass.
			if(this._hash[widget.id]){
				throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
			}
			this._hash[widget.id] = widget;
			this.length++;
		},

		remove: function(/*String*/ id){
			// summary:
			//		Remove a widget from this WidgetSet. Does not destroy the widget; simply
			//		removes the reference.
			if(this._hash[id]){
				delete this._hash[id];
				this.length--;
			}
		},

		forEach: function(/*Function*/ func, /* Object? */thisObj){
			// summary:
			//		Call specified function for each widget in this set.
			//
			// func:
			//		A callback function to run for each item. Is passed the widget, the index
			//		in the iteration, and the full hash, similar to `array.forEach`.
			//
			// thisObj:
			//		An optional scope parameter
			//
			// example:
			//		Using the default `dijit.registry` instance:
			//		|	dijit.registry.forEach(function(widget){
			//		|		console.log(widget.declaredClass);
			//		|	});
			//
			// returns:
			//		Returns self, in order to allow for further chaining.

			thisObj = thisObj || win.global;
			var i = 0, id;
			for(id in this._hash){
				func.call(thisObj, this._hash[id], i++, this._hash);
			}
			return this;	// dijit.WidgetSet
		},

		filter: function(/*Function*/ filter, /* Object? */thisObj){
			// summary:
			//		Filter down this WidgetSet to a smaller new WidgetSet
			//		Works the same as `array.filter` and `NodeList.filter`
			//
			// filter:
			//		Callback function to test truthiness. Is passed the widget
			//		reference and the pseudo-index in the object.
			//
			// thisObj: Object?
			//		Option scope to use for the filter function.
			//
			// example:
			//		Arbitrary: select the odd widgets in this list
			//		|	dijit.registry.filter(function(w, i){
			//		|		return i % 2 == 0;
			//		|	}).forEach(function(w){ /* odd ones */ });

			thisObj = thisObj || win.global;
			var res = new WidgetSet(), i = 0, id;
			for(id in this._hash){
				var w = this._hash[id];
				if(filter.call(thisObj, w, i++, this._hash)){
					res.add(w);
				}
			}
			return res; // dijit.WidgetSet
		},

		byId: function(/*String*/ id){
			// summary:
			//		Find a widget in this list by it's id.
			// example:
			//		Test if an id is in a particular WidgetSet
			//		| var ws = new dijit.WidgetSet();
			//		| ws.add(dijit.byId("bar"));
			//		| var t = ws.byId("bar") // returns a widget
			//		| var x = ws.byId("foo"); // returns undefined

			return this._hash[id];	// dijit._Widget
		},

		byClass: function(/*String*/ cls){
			// summary:
			//		Reduce this widgetset to a new WidgetSet of a particular `declaredClass`
			//
			// cls: String
			//		The Class to scan for. Full dot-notated string.
			//
			// example:
			//		Find all `dijit.TitlePane`s in a page:
			//		|	dijit.registry.byClass("dijit.TitlePane").forEach(function(tp){ tp.close(); });

			var res = new WidgetSet(), id, widget;
			for(id in this._hash){
				widget = this._hash[id];
				if(widget.declaredClass == cls){
					res.add(widget);
				}
			 }
			 return res; // dijit.WidgetSet
		},

		toArray: function(){
			// summary:
			//		Convert this WidgetSet into a true Array
			//
			// example:
			//		Work with the widget .domNodes in a real Array
			//		|	array.map(dijit.registry.toArray(), function(w){ return w.domNode; });

			var ar = [];
			for(var id in this._hash){
				ar.push(this._hash[id]);
			}
			return ar;	// dijit._Widget[]
		},

		map: function(/* Function */func, /* Object? */thisObj){
			// summary:
			//		Create a new Array from this WidgetSet, following the same rules as `array.map`
			// example:
			//		|	var nodes = dijit.registry.map(function(w){ return w.domNode; });
			//
			// returns:
			//		A new array of the returned values.
			return array.map(this.toArray(), func, thisObj); // Array
		},

		every: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `array.every` acting explicitly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first false return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || win.global;
			var x = 0, i;
			for(i in this._hash){
				if(!func.call(thisObj, this._hash[i], x++, this._hash)){
					return false; // Boolean
				}
			}
			return true; // Boolean
		},

		some: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `array.some` acting explicitly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first true return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || win.global;
			var x = 0, i;
			for(i in this._hash){
				if(func.call(thisObj, this._hash[i], x++, this._hash)){
					return true; // Boolean
				}
			}
			return false; // Boolean
		}

	});

	// Add in 1.x compatibility methods to dijit.registry.
	// These functions won't show up in the API doc but since they are deprecated anyway,
	// that's probably for the best.
	array.forEach(["forEach", "filter", "byClass", "map", "every", "some"], function(func){
		registry[func] = WidgetSet.prototype[func];
	});


	return WidgetSet;
});

},
'dojo/store/util/SimpleQueryEngine':function(){
define("dojo/store/util/SimpleQueryEngine", ["../../_base/array"], function(arrayUtil) {
  //  module:
  //    dojo/store/util/SimpleQueryEngine
  //  summary:
  //    The module defines a simple filtering query engine for object stores. 

return function(query, options){
	// summary:
	//		Simple query engine that matches using filter functions, named filter
	//		functions or objects by name-value on a query object hash
	//
	// description:
	//		The SimpleQueryEngine provides a way of getting a QueryResults through
	//		the use of a simple object hash as a filter.  The hash will be used to
	//		match properties on data objects with the corresponding value given. In
	//		other words, only exact matches will be returned.
	//
	//		This function can be used as a template for more complex query engines;
	//		for example, an engine can be created that accepts an object hash that
	//		contains filtering functions, or a string that gets evaluated, etc.
	//
	//		When creating a new dojo.store, simply set the store's queryEngine
	//		field as a reference to this function.
	//
	// query: Object
	//		An object hash with fields that may match fields of items in the store.
	//		Values in the hash will be compared by normal == operator, but regular expressions
	//		or any object that provides a test() method are also supported and can be
	// 		used to match strings by more complex expressions
	// 		(and then the regex's or object's test() method will be used to match values).
	//
	// options: dojo.store.util.SimpleQueryEngine.__queryOptions?
	//		An object that contains optional information such as sort, start, and count.
	//
	// returns: Function
	//		A function that caches the passed query under the field "matches".  See any
	//		of the "query" methods on dojo.stores.
	//
	// example:
	//		Define a store with a reference to this engine, and set up a query method.
	//
	//	|	var myStore = function(options){
	//	|		//	...more properties here
	//	|		this.queryEngine = dojo.store.util.SimpleQueryEngine;
	//	|		//	define our query method
	//	|		this.query = function(query, options){
	//	|			return dojo.store.util.QueryResults(this.queryEngine(query, options)(this.data));
	//	|		};
	//	|	};

	// create our matching query function
	switch(typeof query){
		default:
			throw new Error("Can not query with a " + typeof query);
		case "object": case "undefined":
			var queryObject = query;
			query = function(object){
				for(var key in queryObject){
					var required = queryObject[key];
					if(required && required.test){
						if(!required.test(object[key])){
							return false;
						}
					}else if(required != object[key]){
						return false;
					}
				}
				return true;
			};
			break;
		case "string":
			// named query
			if(!this[query]){
				throw new Error("No filter function " + query + " was found in store");
			}
			query = this[query];
			// fall through
		case "function":
			// fall through
	}
	function execute(array){
		// execute the whole query, first we filter
		var results = arrayUtil.filter(array, query);
		// next we sort
		if(options && options.sort){
			results.sort(function(a, b){
				for(var sort, i=0; sort = options.sort[i]; i++){
					var aValue = a[sort.attribute];
					var bValue = b[sort.attribute];
					if (aValue != bValue) {
						return !!sort.descending == aValue > bValue ? -1 : 1;
					}
				}
				return 0;
			});
		}
		// now we paginate
		if(options && (options.start || options.count)){
			var total = results.length;
			results = results.slice(options.start || 0, (options.start || 0) + (options.count || Infinity));
			results.total = total;
		}
		return results;
	}
	execute.matches = query;
	return execute;
};
});

},
'dijit/typematic':function(){
define("dijit/typematic", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/connect", // connect.connect
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.mixin, lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie")
	"."		// setting dijit.typematic global
], function(array, connect, event, kernel, lang, on, has, dijit){

// module:
//		dijit/typematic
// summary:
//		These functions are used to repetitively call a user specified callback
//		method when a specific key or mouse click over a specific DOM node is
//		held down for a specific amount of time.
//		Only 1 such event is allowed to occur on the browser page at 1 time.

var typematic = (dijit.typematic = {
	// summary:
	//		These functions are used to repetitively call a user specified callback
	//		method when a specific key or mouse click over a specific DOM node is
	//		held down for a specific amount of time.
	//		Only 1 such event is allowed to occur on the browser page at 1 time.

	_fireEventAndReload: function(){
		this._timer = null;
		this._callback(++this._count, this._node, this._evt);

		// Schedule next event, timer is at most minDelay (default 10ms) to avoid
		// browser overload (particularly avoiding starving DOH robot so it never gets to send a mouseup)
		this._currentTimeout = Math.max(
			this._currentTimeout < 0 ? this._initialDelay :
				(this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay)),
			this._minDelay);
		this._timer = setTimeout(lang.hitch(this, "_fireEventAndReload"), this._currentTimeout);
	},

	trigger: function(/*Event*/ evt, /*Object*/ _this, /*DOMNode*/ node, /*Function*/ callback, /*Object*/ obj, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start a timed, repeating callback sequence.
		//		If already started, the function call is ignored.
		//		This method is not normally called by the user but can be
		//		when the normal listener code is insufficient.
		// evt:
		//		key or mouse event object to pass to the user callback
		// _this:
		//		pointer to the user's widget space.
		// node:
		//		the DOM node object to pass the the callback function
		// callback:
		//		function to call until the sequence is stopped called with 3 parameters:
		// count:
		//		integer representing number of repeated calls (0..n) with -1 indicating the iteration has stopped
		// node:
		//		the DOM node object passed in
		// evt:
		//		key or mouse event object
		// obj:
		//		user space object used to uniquely identify each typematic sequence
		// subsequentDelay (optional):
		//		if > 1, the number of milliseconds until the 3->n events occur
		//		or else the fractional time multiplier for the next event's delay, default=0.9
		// initialDelay (optional):
		//		the number of milliseconds until the 2nd event occurs, default=500ms
		// minDelay (optional):
		//		the maximum delay in milliseconds for event to fire, default=10ms
		if(obj != this._obj){
			this.stop();
			this._initialDelay = initialDelay || 500;
			this._subsequentDelay = subsequentDelay || 0.90;
			this._minDelay = minDelay || 10;
			this._obj = obj;
			this._evt = evt;
			this._node = node;
			this._currentTimeout = -1;
			this._count = -1;
			this._callback = lang.hitch(_this, callback);
			this._fireEventAndReload();
			this._evt = lang.mixin({faux: true}, evt);
		}
	},

	stop: function(){
		// summary:
		//		Stop an ongoing timed, repeating callback sequence.
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		if(this._obj){
			this._callback(-1, this._node, this._evt);
			this._obj = null;
		}
	},

	addKeyListener: function(/*DOMNode*/ node, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key.
		//		See also the trigger method for other parameters.
		// keyObject:
		//		an object defining the key to listen for:
		// 		charOrCode:
		//			the printable character (string) or keyCode (number) to listen for.
		// 		keyCode:
		//			(deprecated - use charOrCode) the keyCode (number) to listen for (implies charCode = 0).
		// 		charCode:
		//			(deprecated - use charOrCode) the charCode (number) to listen for.
		// 		ctrlKey:
		//			desired ctrl key state to initiate the callback sequence:
		//			- pressed (true)
		//			- released (false)
		//			- either (unspecified)
		// 		altKey:
		//			same as ctrlKey but for the alt key
		// 		shiftKey:
		//			same as ctrlKey but for the shift key
		// returns:
		//		a connection handle
		if(keyObject.keyCode){
			keyObject.charOrCode = keyObject.keyCode;
			kernel.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}else if(keyObject.charCode){
			keyObject.charOrCode = String.fromCharCode(keyObject.charCode);
			kernel.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}
		var handles = [
			on(node, connect._keypress, lang.hitch(this, function(evt){
				if(evt.charOrCode == keyObject.charOrCode &&
				(keyObject.ctrlKey === undefined || keyObject.ctrlKey == evt.ctrlKey) &&
				(keyObject.altKey === undefined || keyObject.altKey == evt.altKey) &&
				(keyObject.metaKey === undefined || keyObject.metaKey == (evt.metaKey || false)) && // IE doesn't even set metaKey
				(keyObject.shiftKey === undefined || keyObject.shiftKey == evt.shiftKey)){
					event.stop(evt);
					typematic.trigger(evt, _this, node, callback, keyObject, subsequentDelay, initialDelay, minDelay);
				}else if(typematic._obj == keyObject){
					typematic.stop();
				}
			})),
			on(node, "keyup", lang.hitch(this, function(){
				if(typematic._obj == keyObject){
					typematic.stop();
				}
			}))
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	},

	addMouseListener: function(/*DOMNode*/ node, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a typematic mouse click.
		//		See the trigger method for other parameters.
		// returns:
		//		a connection handle
		var handles =  [
			on(node, "mousedown", lang.hitch(this, function(evt){
				event.stop(evt);
				typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
			})),
			on(node, "mouseup", lang.hitch(this, function(evt){
				if(this._obj){
					event.stop(evt);
				}
				typematic.stop();
			})),
			on(node, "mouseout", lang.hitch(this, function(evt){
				event.stop(evt);
				typematic.stop();
			})),
			on(node, "mousemove", lang.hitch(this, function(evt){
				evt.preventDefault();
			})),
			on(node, "dblclick", lang.hitch(this, function(evt){
				event.stop(evt);
				if(has("ie") < 9){
					typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
					setTimeout(lang.hitch(this, typematic.stop), 50);
				}
			}))
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	},

	addListener: function(/*Node*/ mouseNode, /*Node*/ keyNode, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key and mouseclick.
		//		This is a thin wrapper to addKeyListener and addMouseListener.
		//		See the addMouseListener and addKeyListener methods for other parameters.
		// mouseNode:
		//		the DOM node object to listen on for mouse events.
		// keyNode:
		//		the DOM node object to listen on for key events.
		// returns:
		//		a connection handle
		var handles = [
			this.addKeyListener(keyNode, keyObject, _this, callback, subsequentDelay, initialDelay, minDelay),
			this.addMouseListener(mouseNode, _this, callback, subsequentDelay, initialDelay, minDelay)
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	}
});

return typematic;

});

},
'dijit/MenuItem':function(){
require({cache:{
'url:dijit/templates/MenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/sniff", // has("ie")
	"./_Widget",
	"./_TemplatedMixin",
	"./_Contained",
	"./_CssStateMixin",
	"dojo/text!./templates/MenuItem.html"
], function(declare, dom, domAttr, domClass, event, kernel, has,
			_Widget, _TemplatedMixin, _Contained, _CssStateMixin, template){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _Contained = dijit._Contained;
	var _CssStateMixin = dijit._CssStateMixin;
=====*/

	// module:
	//		dijit/MenuItem
	// summary:
	//		A line item in a Menu Widget


	return declare("dijit.MenuItem",
		[_Widget, _TemplatedMixin, _Contained, _CssStateMixin],
		{
		// summary:
		//		A line item in a Menu Widget

		// Make 3 columns
		// icon, label, and expand arrow (BiDi-dependent) indicating sub-menu
		templateString: template,

		baseClass: "dijitMenuItem",

		// label: String
		//		Menu text
		label: '',
		_setLabelAttr: { node: "containerNode", type: "innerHTML" },

		// iconClass: String
		//		Class to apply to DOMNode to make it display an icon.
		iconClass: "dijitNoIcon",
		_setIconClassAttr: { node: "iconNode", type: "class" },

		// accelKey: String
		//		Text for the accelerator (shortcut) key combination.
		//		Note that although Menu can display accelerator keys there
		//		is no infrastructure to actually catch and execute these
		//		accelerators.
		accelKey: "",

		// disabled: Boolean
		//		If true, the menu item is disabled.
		//		If false, the menu item is enabled.
		disabled: false,

		_fillContent: function(/*DomNode*/ source){
			// If button label is specified as srcNodeRef.innerHTML rather than
			// this.params.label, handle it here.
			if(source && !("label" in this.params)){
				this.set('label', source.innerHTML);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);
			var label = this.id+"_text";
			domAttr.set(this.containerNode, "id", label);
			if(this.accelKeyNode){
				domAttr.set(this.accelKeyNode, "id", this.id + "_accel");
				label += " " + this.id + "_accel";
			}
			this.domNode.setAttribute("aria-labelledby", label);
			dom.setSelectable(this.domNode, false);
		},

		_onHover: function(){
			// summary:
			//		Handler when mouse is moved onto menu item
			// tags:
			//		protected
			this.getParent().onItemHover(this);
		},

		_onUnhover: function(){
			// summary:
			//		Handler when mouse is moved off of menu item,
			//		possibly to a child menu, or maybe to a sibling
			//		menuitem or somewhere else entirely.
			// tags:
			//		protected

			// if we are unhovering the currently selected item
			// then unselect it
			this.getParent().onItemUnhover(this);

			// When menu is hidden (collapsed) due to clicking a MenuItem and having it execute,
			// FF and IE don't generate an onmouseout event for the MenuItem.
			// So, help out _CssStateMixin in this case.
			this._set("hovering", false);
		},

		_onClick: function(evt){
			// summary:
			//		Internal handler for click events on MenuItem.
			// tags:
			//		private
			this.getParent().onItemClick(this, evt);
			event.stop(evt);
		},

		onClick: function(/*Event*/){
			// summary:
			//		User defined function to handle clicks
			// tags:
			//		callback
		},

		focus: function(){
			// summary:
			//		Focus on this MenuItem
			try{
				if(has("ie") == 8){
					// needed for IE8 which won't scroll TR tags into view on focus yet calling scrollIntoView creates flicker (#10275)
					this.containerNode.focus();
				}
				this.focusNode.focus();
			}catch(e){
				// this throws on IE (at least) in some scenarios
			}
		},

		_onFocus: function(){
			// summary:
			//		This is called by the focus manager when focus
			//		goes to this MenuItem or a child menu.
			// tags:
			//		protected
			this._setSelected(true);
			this.getParent()._onItemFocus(this);

			this.inherited(arguments);
		},

		_setSelected: function(selected){
			// summary:
			//		Indicate that this node is the currently selected one
			// tags:
			//		private

			/***
			 * TODO: remove this method and calls to it, when _onBlur() is working for MenuItem.
			 * Currently _onBlur() gets called when focus is moved from the MenuItem to a child menu.
			 * That's not supposed to happen, but the problem is:
			 * In order to allow dijit.popup's getTopPopup() to work,a sub menu's popupParent
			 * points to the parent Menu, bypassing the parent MenuItem... thus the
			 * MenuItem is not in the chain of active widgets and gets a premature call to
			 * _onBlur()
			 */

			domClass.toggle(this.domNode, "dijitMenuItemSelected", selected);
		},

		setLabel: function(/*String*/ content){
			// summary:
			//		Deprecated.   Use set('label', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
			this.set("label", content);
		},

		setDisabled: function(/*Boolean*/ disabled){
			// summary:
			//		Deprecated.   Use set('disabled', bool) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
			this.set('disabled', disabled);
		},
		_setDisabledAttr: function(/*Boolean*/ value){
			// summary:
			//		Hook for attr('disabled', ...) to work.
			//		Enable or disable this menu item.

			this.focusNode.setAttribute('aria-disabled', value ? 'true' : 'false');
			this._set("disabled", value);
		},
		_setAccelKeyAttr: function(/*String*/ value){
			// summary:
			//		Hook for attr('accelKey', ...) to work.
			//		Set accelKey on this menu item.

			this.accelKeyNode.style.display=value?"":"none";
			this.accelKeyNode.innerHTML=value;
			//have to use colSpan to make it work in IE
			domAttr.set(this.containerNode,'colSpan',value?"1":"2");

			this._set("accelKey", value);
		}
	});
});

},
'dijit/layout/TabController':function(){
require({cache:{
'url:dijit/layout/templates/_TabButton.html':"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-attr", // domAttr.attr
	"dojo/dom-class", // domClass.toggle
	"dojo/i18n", // i18n.getLocalization
	"dojo/_base/lang", // lang.hitch lang.trim
	"./StackController",
	"../Menu",
	"../MenuItem",
	"dojo/text!./templates/_TabButton.html",
	"dojo/i18n!../nls/common"
], function(declare, dom, domAttr, domClass, i18n, lang, StackController, Menu, MenuItem, template){

/*=====
	var StackController = dijit.layout.StackController;
	var Menu = dijit.Menu;
	var MenuItem = dijit.MenuItem;
=====*/

	// module:
	//		dijit/layout/TabController
	// summary:
	// 		Set of tabs (the things with titles and a close button, that you click to show a tab panel).
	//		Used internally by `dijit.layout.TabContainer`.
        /* CURAM-FIX: Extend TabController to allow proper disabling of tab buttons. */
	var TabButton = declare("dijit.layout._TabButton", StackController.StackButton, {
		// summary:
		//		A tab (the thing you click to select a pane).
		// description:
		//		Contains the title of the pane, and optionally a close-button to destroy the pane.
		//		This is an internal widget and should not be instantiated directly.
		// tags:
		//		private

		// baseClass: String
		//		The CSS class applied to the domNode.
		baseClass: "dijitTab",

		// Apply dijitTabCloseButtonHover when close button is hovered
		cssStateNodes: {
			closeNode: "dijitTabCloseButton"
		},

		templateString: template,

		// Override _FormWidget.scrollOnFocus.
		// Don't scroll the whole tab container into view when the button is focused.
		scrollOnFocus: false,

		buildRendering: function(){
			this.inherited(arguments);

			dom.setSelectable(this.containerNode, false);
		},

		startup: function(){
			this.inherited(arguments);
			var n = this.domNode;

			// Required to give IE6 a kick, as it initially hides the
			// tabs until they are focused on.
			setTimeout(function(){
				n.className = n.className;
			}, 1);
		},
		
		_setCloseButtonAttr: function(/*Boolean*/ disp){
			// summary:
			//		Hide/show close button
			this._set("closeButton", disp);
			domClass.toggle(this.innerDiv, "dijitClosable", disp);
			this.closeNode.style.display = disp ? "" : "none";
			if(disp){
				var _nlsResources = i18n.getLocalization("dijit", "common");
				if(this.closeNode){
					domAttr.set(this.closeNode,"title", _nlsResources.itemClose);
				}
				// add context menu onto title button
				this._closeMenu = new Menu({
					id: this.id+"_Menu",
					dir: this.dir,
					lang: this.lang,
					textDir: this.textDir,
					targetNodeIds: [this.domNode]
				});

				this._closeMenu.addChild(new MenuItem({
					label: _nlsResources.itemClose,
					dir: this.dir,
					lang: this.lang,
					textDir: this.textDir,
					onClick: lang.hitch(this, "onClickCloseButton")
				}));
			}else{
				if(this._closeMenu){
					this._closeMenu.destroyRecursive();
					delete this._closeMenu;
				}
			}
		},
		_setLabelAttr: function(/*String*/ content){
			// summary:
			//		Hook for set('label', ...) to work.
			// description:
			//		takes an HTML string.
			//		Inherited ToggleButton implementation will Set the label (text) of the button;
			//		Need to set the alt attribute of icon on tab buttons if no label displayed
			this.inherited(arguments);
			if(!this.showLabel && !this.params.title){
				this.iconNode.alt = lang.trim(this.containerNode.innerText || this.containerNode.textContent || '');
			}
		},

		destroy: function(){
			if(this._closeMenu){
				this._closeMenu.destroyRecursive();
				delete this._closeMenu;
			}
			this.inherited(arguments);
		}
	});

	var TabController = declare("dijit.layout.TabController", StackController, {
		// summary:
		// 		Set of tabs (the things with titles and a close button, that you click to show a tab panel).
		//		Used internally by `dijit.layout.TabContainer`.
		// description:
		//		Lets the user select the currently shown pane in a TabContainer or StackContainer.
		//		TabController also monitors the TabContainer, and whenever a pane is
		//		added or deleted updates itself accordingly.
		// tags:
		//		private

		baseClass: "dijitTabController",

		templateString: "<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",

		// tabPosition: String
		//		Defines where tabs go relative to the content.
		//		"top", "bottom", "left-h", "right-h"
		tabPosition: "top",

		// buttonWidget: Constructor
		//		The tab widget to create to correspond to each page
		/* CURAM-FIX: use the Curam version of the button */
		// buttonWidget: TabButton,
		buttonWidget: "curam.widget._TabButton",
		
		/* CURAM-FIX: added function */
		startup: function() {
		  this.inherited(arguments);

                  /* CURAM-FIX: When child page is added, connect the function that will remove
                   * the tab control button when page is made invisible. */
                  this.connect(this, "onAddChild", function(page, insertIndex) {
                    var controller = this;
                    // store the page id for later use when positioning control buttons
                    page.controlButton._curamPageId = page.id;
                    // remove control button when the page is hiden,
                    // add it back when redisplayed
                    page.controlButton.connect(page.controlButton, "_setCuramVisibleAttr",
                        function() {
                          if (page.controlButton.curamVisible) {
                            // show button
                            // find the position at which to insert it
                            var actualChildIds = dojo.map(controller.getChildren(),
                                function(btn) { return btn._curamPageId; });
                            var tabWidgetId = curam.tab.getTabWidgetId(
                                curam.tab.getContainerTab(page.domNode));
                            var index = curam.util.TabNavigation.getInsertIndex(
                                tabWidgetId, actualChildIds, page.id);

                            // and display it
                            controller.addChild(page.controlButton, index);

                          } else {
                            // hide the button
                            var button = page.controlButton;
                            // only remove if not already removed
                            if (dojo.indexOf(controller.getChildren(), button) != -1) {
                              controller.removeChild(button);
                            }
                          }
                        });
                  });
                  /* END CURAM-FIX */
		},

		_rectifyRtlTabList: function(){
			// summary:
			//		For left/right TabContainer when page is RTL mode, rectify the width of all tabs to be equal, otherwise the tab widths are different in IE

			if(0 >= this.tabPosition.indexOf('-h')){ return; }
			if(!this.pane2button){ return; }

			var maxWidth = 0;
			for(var pane in this.pane2button){
				var ow = this.pane2button[pane].innerDiv.scrollWidth;
				maxWidth = Math.max(maxWidth, ow);
			}
			//unify the length of all the tabs
			for(pane in this.pane2button){
				this.pane2button[pane].innerDiv.style.width = maxWidth + 'px';
			}
		},

                /* CURAM-FIX: addition */
                /**
                 * Called whenever one of my child buttons is pressed in an attempt to select a page.
                 * @private
                 */
                onButtonClick: function(/*dijit._Widget*/ page) {
                  if (!page.controlButton.get("curamDisabled")) {
                    var container = dijit.byId(this.containerId);
                    container.selectChild(page);
                  }
                }
                /* END CURAM-FIX */

		
	});

	TabController.TabButton = TabButton;	// for monkey patching

	return TabController;
});

},
'dijit/layout/_LayoutWidget':function(){
define("dijit/layout/_LayoutWidget", [
	"dojo/_base/lang", // lang.mixin
	"../_Widget",
	"../_Container",
	"../_Contained",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/window" // win.global
], function(lang, _Widget, _Container, _Contained,
	declare, domClass, domGeometry, domStyle, has, win){

/*=====
	var _Widget = dijit._Widget;
	var _Container = dijit._Container;
	var _Contained = dijit._Contained;
=====*/

	// module:
	//		dijit/layout/_LayoutWidget
	// summary:
	//		_LayoutWidget Base class for a _Container widget which is responsible for laying out its children.
	//		Widgets which mixin this code must define layout() to manage placement and sizing of the children.


	return declare("dijit.layout._LayoutWidget", [_Widget, _Container, _Contained], {
		// summary:
		//		Base class for a _Container widget which is responsible for laying out its children.
		//		Widgets which mixin this code must define layout() to manage placement and sizing of the children.

		// baseClass: [protected extension] String
		//		This class name is applied to the widget's domNode
		//		and also may be used to generate names for sub nodes,
		//		for example dijitTabContainer-content.
		baseClass: "dijitLayoutContainer",

		// isLayoutContainer: [protected] Boolean
		//		Indicates that this widget is going to call resize() on its
		//		children widgets, setting their size, when they become visible.
		isLayoutContainer: true,

		buildRendering: function(){
			this.inherited(arguments);
			domClass.add(this.domNode, "dijitContainer");
		},

		startup: function(){
			// summary:
			//		Called after all the widgets have been instantiated and their
			//		dom nodes have been inserted somewhere under win.doc.body.
			//
			//		Widgets should override this method to do any initialization
			//		dependent on other widgets existing, and then call
			//		this superclass method to finish things off.
			//
			//		startup() in subclasses shouldn't do anything
			//		size related because the size of the widget hasn't been set yet.

			if(this._started){ return; }

			// Need to call inherited first - so that child widgets get started
			// up correctly
			this.inherited(arguments);

			// If I am a not being controlled by a parent layout widget...
			var parent = this.getParent && this.getParent();
			if(!(parent && parent.isLayoutContainer)){
				// Do recursive sizing and layout of all my descendants
				// (passing in no argument to resize means that it has to glean the size itself)
				this.resize();

				// Since my parent isn't a layout container, and my style *may be* width=height=100%
				// or something similar (either set directly or via a CSS class),
				// monitor when viewport size changes so that I can re-layout.
				this.connect(win.global, 'onresize', function(){
					// Using function(){} closure to ensure no arguments passed to resize().
					this.resize();
				});
			}
		},

		resize: function(changeSize, resultSize){
			// summary:
			//		Call this to resize a widget, or after its size has changed.
			// description:
			//		Change size mode:
			//			When changeSize is specified, changes the marginBox of this widget
			//			and forces it to relayout its contents accordingly.
			//			changeSize may specify height, width, or both.
			//
			//			If resultSize is specified it indicates the size the widget will
			//			become after changeSize has been applied.
			//
			//		Notification mode:
			//			When changeSize is null, indicates that the caller has already changed
			//			the size of the widget, or perhaps it changed because the browser
			//			window was resized.  Tells widget to relayout its contents accordingly.
			//
			//			If resultSize is also specified it indicates the size the widget has
			//			become.
			//
			//		In either mode, this method also:
			//			1. Sets this._borderBox and this._contentBox to the new size of
			//				the widget.  Queries the current domNode size if necessary.
			//			2. Calls layout() to resize contents (and maybe adjust child widgets).
			//
			// changeSize: Object?
			//		Sets the widget to this margin-box size and position.
			//		May include any/all of the following properties:
			//	|	{w: int, h: int, l: int, t: int}
			//
			// resultSize: Object?
			//		The margin-box size of this widget after applying changeSize (if
			//		changeSize is specified).  If caller knows this size and
			//		passes it in, we don't need to query the browser to get the size.
			//	|	{w: int, h: int}

			var node = this.domNode;

			// set margin box size, unless it wasn't specified, in which case use current size
			if(changeSize){
				domGeometry.setMarginBox(node, changeSize);
			}

			// If either height or width wasn't specified by the user, then query node for it.
			// But note that setting the margin box and then immediately querying dimensions may return
			// inaccurate results, so try not to depend on it.
			var mb = resultSize || {};
			lang.mixin(mb, changeSize || {});	// changeSize overrides resultSize
			if( !("h" in mb) || !("w" in mb) ){
				mb = lang.mixin(domGeometry.getMarginBox(node), mb);	// just use domGeometry.marginBox() to fill in missing values
			}

			// Compute and save the size of my border box and content box
			// (w/out calling domGeometry.getContentBox() since that may fail if size was recently set)
			var cs = domStyle.getComputedStyle(node);
			var me = domGeometry.getMarginExtents(node, cs);
			var be = domGeometry.getBorderExtents(node, cs);
			var bb = (this._borderBox = {
				w: mb.w - (me.w + be.w),
				h: mb.h - (me.h + be.h)
			});
			var pe = domGeometry.getPadExtents(node, cs);
			this._contentBox = {
				l: domStyle.toPixelValue(node, cs.paddingLeft),
				t: domStyle.toPixelValue(node, cs.paddingTop),
				w: bb.w - pe.w,
				h: bb.h - pe.h
			};

			// Callback for widget to adjust size of its children
			this.layout();
		},

		layout: function(){
			// summary:
			//		Widgets override this method to size and position their contents/children.
			//		When this is called this._contentBox is guaranteed to be set (see resize()).
			//
			//		This is called after startup(), and also when the widget's size has been
			//		changed.
			// tags:
			//		protected extension
		},

		_setupChild: function(/*dijit._Widget*/child){
			// summary:
			//		Common setup for initial children and children which are added after startup
			// tags:
			//		protected extension

			var cls = this.baseClass + "-child "
				+ (child.baseClass ? this.baseClass + "-" + child.baseClass : "");
			domClass.add(child.domNode, cls);
		},

		addChild: function(/*dijit._Widget*/ child, /*Integer?*/ insertIndex){
			// Overrides _Container.addChild() to call _setupChild()
			this.inherited(arguments);
			if(this._started){
				this._setupChild(child);
			}
		},

		removeChild: function(/*dijit._Widget*/ child){
			// Overrides _Container.removeChild() to remove class added by _setupChild()
			var cls = this.baseClass + "-child"
					+ (child.baseClass ?
						" " + this.baseClass + "-" + child.baseClass : "");
			domClass.remove(child.domNode, cls);

			this.inherited(arguments);
		}
	});
});

},
'dijit/popup':function(){
define("dijit/popup", [
	"dojo/_base/array", // array.forEach array.some
	"dojo/aspect",
	"dojo/_base/connect",	// connect._keypress
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-construct", // domConstruct.create domConstruct.destroy
	"dojo/dom-geometry", // domGeometry.isBodyLtr
	"dojo/dom-style", // domStyle.set
	"dojo/_base/event", // event.stop
	"dojo/has",
	"dojo/keys",
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/_base/window", // win.body
	"./place",
	"./BackgroundIframe",
	"."	// dijit (defining dijit.popup to match API doc)
], function(array, aspect, connect, declare, dom, domAttr, domConstruct, domGeometry, domStyle, event, has, keys, lang, on, win,
			place, BackgroundIframe, dijit){

	// module:
	//		dijit/popup
	// summary:
	//		Used to show drop downs (ex: the select list of a ComboBox)
	//		or popups (ex: right-click context menus)


	/*=====
	dijit.popup.__OpenArgs = function(){
		// popup: Widget
		//		widget to display
		// parent: Widget
		//		the button etc. that is displaying this popup
		// around: DomNode
		//		DOM node (typically a button); place popup relative to this node.  (Specify this *or* "x" and "y" parameters.)
		// x: Integer
		//		Absolute horizontal position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		// y: Integer
		//		Absolute vertical position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		// orient: Object|String
		//		When the around parameter is specified, orient should be a list of positions to try, ex:
		//	|	[ "below", "above" ]
		//		For backwards compatibility it can also be an (ordered) hash of tuples of the form
		//		(around-node-corner, popup-node-corner), ex:
		//	|	{ "BL": "TL", "TL": "BL" }
		//		where BL means "bottom left" and "TL" means "top left", etc.
		//
		//		dijit.popup.open() tries to position the popup according to each specified position, in order,
		//		until the popup appears fully within the viewport.
		//
		//		The default value is ["below", "above"]
		//
		//		When an (x,y) position is specified rather than an around node, orient is either
		//		"R" or "L".  R (for right) means that it tries to put the popup to the right of the mouse,
		//		specifically positioning the popup's top-right corner at the mouse position, and if that doesn't
		//		fit in the viewport, then it tries, in order, the bottom-right corner, the top left corner,
		//		and the top-right corner.
		// onCancel: Function
		//		callback when user has canceled the popup by
		//			1. hitting ESC or
		//			2. by using the popup widget's proprietary cancel mechanism (like a cancel button in a dialog);
		//			   i.e. whenever popupWidget.onCancel() is called, args.onCancel is called
		// onClose: Function
		//		callback whenever this popup is closed
		// onExecute: Function
		//		callback when user "executed" on the popup/sub-popup by selecting a menu choice, etc. (top menu only)
		// padding: dijit.__Position
		//		adding a buffer around the opening position. This is only useful when around is not set.
		this.popup = popup;
		this.parent = parent;
		this.around = around;
		this.x = x;
		this.y = y;
		this.orient = orient;
		this.onCancel = onCancel;
		this.onClose = onClose;
		this.onExecute = onExecute;
		this.padding = padding;
	}
	=====*/

	/*=====
	dijit.popup = {
		// summary:
		//		Used to show drop downs (ex: the select list of a ComboBox)
		//		or popups (ex: right-click context menus).
		//
		//		Access via require(["dijit/popup"], function(popup){ ... }).

		moveOffScreen: function(widget){
			// summary:
			//		Moves the popup widget off-screen.
			//		Do not use this method to hide popups when not in use, because
			//		that will create an accessibility issue: the offscreen popup is
			//		still in the tabbing order.
			// widget: dijit._WidgetBase
			//		The widget
		},

		hide: function(widget){
			// summary:
			//		Hide this popup widget (until it is ready to be shown).
			//		Initialization for widgets that will be used as popups
			//
			// 		Also puts widget inside a wrapper DIV (if not already in one)
			//
			//		If popup widget needs to layout it should
			//		do so when it is made visible, and popup._onShow() is called.
			// widget: dijit._WidgetBase
			//		The widget
		},

		open: function(args){
			// summary:
			//		Popup the widget at the specified position
			// example:
			//		opening at the mouse position
			//		|		popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
			// example:
			//		opening the widget as a dropdown
			//		|		popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}});
			//
			//		Note that whatever widget called dijit.popup.open() should also listen to its own _onBlur callback
			//		(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.
			// args: dijit.popup.__OpenArgs
			//		Parameters
			return {};	// Object specifying which position was chosen
		},

		close: function(popup){
			// summary:
			//		Close specified popup and any popups that it parented.
			//		If no popup is specified, closes all popups.
			// widget: dijit._WidgetBase?
			//		The widget, optional
		}
	};
	=====*/

	function destroyWrapper(){
		// summary:
		//		Function to destroy wrapper when popup widget is destroyed.
		//		Left in this scope to avoid memory leak on IE8 on refresh page, see #15206.
		if(this._popupWrapper){
			domConstruct.destroy(this._popupWrapper);
			delete this._popupWrapper;
		}
	}

	var PopupManager = declare(null, {
		// _stack: dijit._Widget[]
		//		Stack of currently popped up widgets.
		//		(someone opened _stack[0], and then it opened _stack[1], etc.)
		_stack: [],

		// _beginZIndex: Number
		//		Z-index of the first popup.   (If first popup opens other
		//		popups they get a higher z-index.)
		_beginZIndex: 1000,

		_idGen: 1,

		_createWrapper: function(/*Widget*/ widget){
			// summary:
			//		Initialization for widgets that will be used as popups.
			//		Puts widget inside a wrapper DIV (if not already in one),
			//		and returns pointer to that wrapper DIV.

			var wrapper = widget._popupWrapper,
				node = widget.domNode;

			if(!wrapper){
				// Create wrapper <div> for when this widget [in the future] will be used as a popup.
				// This is done early because of IE bugs where creating/moving DOM nodes causes focus
				// to go wonky, see tests/robot/Toolbar.html to reproduce
				wrapper = domConstruct.create("div", {
					"class":"dijitPopup",
					style:{ display: "none"},
					role: "presentation"
				}, win.body());
				wrapper.appendChild(node);

				var s = node.style;
				s.display = "";
				s.visibility = "";
				s.position = "";
				s.top = "0px";

				widget._popupWrapper = wrapper;
				aspect.after(widget, "destroy", destroyWrapper, true);
			}

			return wrapper;
		},

		moveOffScreen: function(/*Widget*/ widget){
			// summary:
			//		Moves the popup widget off-screen.
			//		Do not use this method to hide popups when not in use, because
			//		that will create an accessibility issue: the offscreen popup is
			//		still in the tabbing order.

			// Create wrapper if not already there
			var wrapper = this._createWrapper(widget);

			domStyle.set(wrapper, {
				visibility: "hidden",
				top: "-9999px",		// prevent transient scrollbar causing misalign (#5776), and initial flash in upper left (#10111)
				display: ""
			});
		},

		hide: function(/*Widget*/ widget){
			// summary:
			//		Hide this popup widget (until it is ready to be shown).
			//		Initialization for widgets that will be used as popups
			//
			// 		Also puts widget inside a wrapper DIV (if not already in one)
			//
			//		If popup widget needs to layout it should
			//		do so when it is made visible, and popup._onShow() is called.

			// Create wrapper if not already there
			var wrapper = this._createWrapper(widget);

			domStyle.set(wrapper, "display", "none");
		},

		getTopPopup: function(){
			// summary:
			//		Compute the closest ancestor popup that's *not* a child of another popup.
			//		Ex: For a TooltipDialog with a button that spawns a tree of menus, find the popup of the button.
			var stack = this._stack;
			for(var pi=stack.length-1; pi > 0 && stack[pi].parent === stack[pi-1].widget; pi--){
				/* do nothing, just trying to get right value for pi */
			}
			return stack[pi];
		},

		open: function(/*dijit.popup.__OpenArgs*/ args){
			// summary:
			//		Popup the widget at the specified position
			//
			// example:
			//		opening at the mouse position
			//		|		popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
			//
			// example:
			//		opening the widget as a dropdown
			//		|		popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}});
			//
			//		Note that whatever widget called dijit.popup.open() should also listen to its own _onBlur callback
			//		(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.

			var stack = this._stack,
				widget = args.popup,
				orient = args.orient || ["below", "below-alt", "above", "above-alt"],
				ltr = args.parent ? args.parent.isLeftToRight() : domGeometry.isBodyLtr(),
				around = args.around,
				id = (args.around && args.around.id) ? (args.around.id+"_dropdown") : ("popup_"+this._idGen++);

			// If we are opening a new popup that isn't a child of a currently opened popup, then
			// close currently opened popup(s).   This should happen automatically when the old popups
			// gets the _onBlur() event, except that the _onBlur() event isn't reliable on IE, see [22198].
			while(stack.length && (!args.parent || !dom.isDescendant(args.parent.domNode, stack[stack.length-1].widget.domNode))){
				this.close(stack[stack.length-1].widget);
			}

			// Get pointer to popup wrapper, and create wrapper if it doesn't exist
			var wrapper = this._createWrapper(widget);


			domAttr.set(wrapper, {
				id: id,
				style: {
					zIndex: this._beginZIndex + stack.length
				},
				"class": "dijitPopup " + (widget.baseClass || widget["class"] || "").split(" ")[0] +"Popup",
				dijitPopupParent: args.parent ? args.parent.id : ""
			});

			if(has("bgIframe") && !widget.bgIframe){
				// setting widget.bgIframe triggers cleanup in _Widget.destroy()
				widget.bgIframe = new BackgroundIframe(wrapper);
			}

			// position the wrapper node and make it visible
			var best = around ?
				place.around(wrapper, around, orient, ltr, widget.orient ? lang.hitch(widget, "orient") : null) :
				place.at(wrapper, args, orient == 'R' ? ['TR','BR','TL','BL'] : ['TL','BL','TR','BR'], args.padding);

			wrapper.style.display = "";
			wrapper.style.visibility = "visible";
			widget.domNode.style.visibility = "visible";	// counteract effects from _HasDropDown

			var handlers = [];

			// provide default escape and tab key handling
			// (this will work for any widget, not just menu)
			handlers.push(on(wrapper, connect._keypress, lang.hitch(this, function(evt){
				if(evt.charOrCode == keys.ESCAPE && args.onCancel){
					event.stop(evt);
					args.onCancel();
				}else if(evt.charOrCode === keys.TAB){
					event.stop(evt);
					var topPopup = this.getTopPopup();
					if(topPopup && topPopup.onCancel){
						topPopup.onCancel();
					}
				}
			})));

			// watch for cancel/execute events on the popup and notify the caller
			// (for a menu, "execute" means clicking an item)
			if(widget.onCancel && args.onCancel){
				handlers.push(widget.on("cancel", args.onCancel));
			}

			handlers.push(widget.on(widget.onExecute ? "execute" : "change", lang.hitch(this, function(){
				var topPopup = this.getTopPopup();
				if(topPopup && topPopup.onExecute){
					topPopup.onExecute();
				}
			})));

			stack.push({
				widget: widget,
				parent: args.parent,
				onExecute: args.onExecute,
				onCancel: args.onCancel,
				onClose: args.onClose,
				handlers: handlers
			});

			if(widget.onOpen){
				// TODO: in 2.0 standardize onShow() (used by StackContainer) and onOpen() (used here)
				widget.onOpen(best);
			}

			return best;
		},

		close: function(/*Widget?*/ popup){
			// summary:
			//		Close specified popup and any popups that it parented.
			//		If no popup is specified, closes all popups.

			var stack = this._stack;

			// Basically work backwards from the top of the stack closing popups
			// until we hit the specified popup, but IIRC there was some issue where closing
			// a popup would cause others to close too.  Thus if we are trying to close B in [A,B,C]
			// closing C might close B indirectly and then the while() condition will run where stack==[A]...
			// so the while condition is constructed defensively.
			while((popup && array.some(stack, function(elem){return elem.widget == popup;})) ||
				(!popup && stack.length)){
				var top = stack.pop(),
					widget = top.widget,
					onClose = top.onClose;

				if(widget.onClose){
					// TODO: in 2.0 standardize onHide() (used by StackContainer) and onClose() (used here)
					widget.onClose();
				}

				var h;
				while(h = top.handlers.pop()){ h.remove(); }

				// Hide the widget and it's wrapper unless it has already been destroyed in above onClose() etc.
				if(widget && widget.domNode){
					this.hide(widget);
				}

				if(onClose){
					onClose();
				}
			}
		}
	});

	return (dijit.popup = new PopupManager());
});

},
'dijit/_base/manager':function(){
define("dijit/_base/manager", [
	"dojo/_base/array",
	"dojo/_base/config", // defaultDuration
	"../registry",
	".."	// for setting exports to dijit namespace
], function(array, config, registry, dijit){

	// module:
	//		dijit/_base/manager
	// summary:
	//		Shim to methods on registry, plus a few other declarations.
	//		New code should access dijit/registry directly when possible.

	/*=====
	dijit.byId = function(id){
		// summary:
		//		Returns a widget by it's id, or if passed a widget, no-op (like dom.byId())
		// id: String|dijit._Widget
		return registry.byId(id); // dijit._Widget
	};

	dijit.getUniqueId = function(widgetType){
		// summary:
		//		Generates a unique id for a given widgetType
		// widgetType: String
		return registry.getUniqueId(widgetType); // String
	};

	dijit.findWidgets = function(root){
		// summary:
		//		Search subtree under root returning widgets found.
		//		Doesn't search for nested widgets (ie, widgets inside other widgets).
		// root: DOMNode
		return registry.findWidgets(root);
	};

	dijit._destroyAll = function(){
		// summary:
		//		Code to destroy all widgets and do other cleanup on page unload

		return registry._destroyAll();
	};

	dijit.byNode = function(node){
		// summary:
		//		Returns the widget corresponding to the given DOMNode
		// node: DOMNode
		return registry.byNode(node); // dijit._Widget
	};

	dijit.getEnclosingWidget = function(node){
		// summary:
		//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
		//		the node is not contained within the DOM tree of any widget
		// node: DOMNode
		return registry.getEnclosingWidget(node);
	};
	=====*/
	array.forEach(["byId", "getUniqueId", "findWidgets", "_destroyAll", "byNode", "getEnclosingWidget"], function(name){
		dijit[name] = registry[name];
	});

	/*=====
	dojo.mixin(dijit, {
		// defaultDuration: Integer
		//		The default fx.animation speed (in ms) to use for all Dijit
		//		transitional fx.animations, unless otherwise specified
		//		on a per-instance basis. Defaults to 200, overrided by
		//		`djConfig.defaultDuration`
		defaultDuration: 200
	});
	=====*/
	dijit.defaultDuration = config["defaultDuration"] || 200;

	return dijit;
});

},
'dijit/layout/StackController':function(){
define("dijit/layout/StackController", [
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys
	"dojo/_base/lang", // lang.getObject
	"dojo/_base/sniff", // has("ie")
	"../focus",		// focus.focus()
	"../registry",	// registry.byId
	"../_Widget",
	"../_TemplatedMixin",
	"../_Container",
	"../form/ToggleButton",
	"dojo/i18n!../nls/common"
], function(array, declare, event, keys, lang, has,
			focus, registry, _Widget, _TemplatedMixin, _Container, ToggleButton){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _Container = dijit._Container;
	var ToggleButton = dijit.form.ToggleButton;
=====*/

	// module:
	//		dijit/layout/StackController
	// summary:
	//		Set of buttons to select a page in a `dijit.layout.StackContainer`

	var StackButton = declare("dijit.layout._StackButton", ToggleButton, {
		// summary:
		//		Internal widget used by StackContainer.
		// description:
		//		The button-like or tab-like object you click to select or delete a page
		// tags:
		//		private

		// Override _FormWidget.tabIndex.
		// StackContainer buttons are not in the tab order by default.
		// Probably we should be calling this.startupKeyNavChildren() instead.
		tabIndex: "-1",

		// closeButton: Boolean
		//		When true, display close button for this tab
		closeButton: false,
		
		_setCheckedAttr: function(/*Boolean*/ value, /*Boolean?*/ priorityChange){
			this.inherited(arguments);
			this.focusNode.removeAttribute("aria-pressed");
		},

		buildRendering: function(/*Event*/ evt){
			this.inherited(arguments);
			(this.focusNode || this.domNode).setAttribute("role", "tab");
		},

		onClick: function(/*Event*/ /*===== evt =====*/){
			// summary:
			//		This is for TabContainer where the tabs are <span> rather than button,
			//		so need to set focus explicitly (on some browsers)
			//		Note that you shouldn't override this method, but you can connect to it.
			focus.focus(this.focusNode);

			// ... now let StackController catch the event and tell me what to do
		},

		onClickCloseButton: function(/*Event*/ evt){
			// summary:
			//		StackContainer connects to this function; if your widget contains a close button
			//		then clicking it should call this function.
			//		Note that you shouldn't override this method, but you can connect to it.
			evt.stopPropagation();
		}
	});


	var StackController = declare("dijit.layout.StackController", [_Widget, _TemplatedMixin, _Container], {
		// summary:
		//		Set of buttons to select a page in a `dijit.layout.StackContainer`
		// description:
		//		Monitors the specified StackContainer, and whenever a page is
		//		added, deleted, or selected, updates itself accordingly.

		baseClass: "dijitStackController",

		templateString: "<span role='tablist' data-dojo-attach-event='onkeypress'></span>",

		// containerId: [const] String
		//		The id of the page container that I point to
		containerId: "",

		// buttonWidget: [const] Constructor
		//		The button widget to create to correspond to each page
		buttonWidget: StackButton,

		constructor: function(){
			this.pane2button = {};		// mapping from pane id to buttons
			this.pane2connects = {};	// mapping from pane id to this.connect() handles
			this.pane2watches = {};		// mapping from pane id to watch() handles
		},

		postCreate: function(){
			this.inherited(arguments);

			// Listen to notifications from StackContainer
			this.subscribe(this.containerId+"-startup", "onStartup");
			this.subscribe(this.containerId+"-addChild", "onAddChild");
			this.subscribe(this.containerId+"-removeChild", "onRemoveChild");
			this.subscribe(this.containerId+"-selectChild", "onSelectChild");
			this.subscribe(this.containerId+"-containerKeyPress", "onContainerKeyPress");
		},

		onStartup: function(/*Object*/ info){
			// summary:
			//		Called after StackContainer has finished initializing
			// tags:
			//		private
			array.forEach(info.children, this.onAddChild, this);
			if(info.selected){
				// Show button corresponding to selected pane (unless selected
				// is null because there are no panes)
				this.onSelectChild(info.selected);
			}
		},

		destroy: function(){
			for(var pane in this.pane2button){
				this.onRemoveChild(registry.byId(pane));
			}
			this.inherited(arguments);
		},

		onAddChild: function(/*dijit._Widget*/ page, /*Integer?*/ insertIndex){
			// summary:
			//		Called whenever a page is added to the container.
			//		Create button corresponding to the page.
			// tags:
			//		private

			// create an instance of the button widget
			// (remove typeof buttonWidget == string support in 2.0)
			var cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
			var button = new cls({
				id: this.id + "_" + page.id,
				label: page.title,
				dir: page.dir,
				lang: page.lang,
				textDir: page.textDir,
				showLabel: page.showTitle,
				iconClass: page.iconClass,
				closeButton: page.closable,
				title: page.tooltip
			});
			button.focusNode.setAttribute("aria-selected", "false");


			// map from page attribute to corresponding tab button attribute
			var pageAttrList = ["title", "showTitle", "iconClass", "closable", "tooltip"],
				buttonAttrList = ["label", "showLabel", "iconClass", "closeButton", "title"];

			// watch() so events like page title changes are reflected in tab button
			this.pane2watches[page.id] = array.map(pageAttrList, function(pageAttr, idx){
				return page.watch(pageAttr, function(name, oldVal, newVal){
					button.set(buttonAttrList[idx], newVal);
				});
			});

			// connections so that clicking a tab button selects the corresponding page
			this.pane2connects[page.id] = [
				this.connect(button, 'onClick', lang.hitch(this,"onButtonClick", page)),
				this.connect(button, 'onClickCloseButton', lang.hitch(this,"onCloseButtonClick", page))
			];

			this.addChild(button, insertIndex);
			this.pane2button[page.id] = button;
			page.controlButton = button;	// this value might be overwritten if two tabs point to same container
			if(!this._currentChild){ // put the first child into the tab order
				button.focusNode.setAttribute("tabIndex", "0");
				button.focusNode.setAttribute("aria-selected", "true");
				this._currentChild = page;
			}
			// make sure all tabs have the same length
			if(!this.isLeftToRight() && has("ie") && this._rectifyRtlTabList){
				this._rectifyRtlTabList();
			}
		},

		onRemoveChild: function(/*dijit._Widget*/ page){
			// summary:
			//		Called whenever a page is removed from the container.
			//		Remove the button corresponding to the page.
			// tags:
			//		private

			if(this._currentChild === page){ this._currentChild = null; }

			// disconnect/unwatch connections/watches related to page being removed
			array.forEach(this.pane2connects[page.id], lang.hitch(this, "disconnect"));
			delete this.pane2connects[page.id];
			array.forEach(this.pane2watches[page.id], function(w){ w.unwatch(); });
			delete this.pane2watches[page.id];

			var button = this.pane2button[page.id];
			if(button){
				this.removeChild(button);
				delete this.pane2button[page.id];
				button.destroy();
			}
			delete page.controlButton;
		},

		onSelectChild: function(/*dijit._Widget*/ page){
			// summary:
			//		Called when a page has been selected in the StackContainer, either by me or by another StackController
			// tags:
			//		private

			if(!page){ return; }

			if(this._currentChild){
				var oldButton=this.pane2button[this._currentChild.id];
				oldButton.set('checked', false);
				oldButton.focusNode.setAttribute("aria-selected", "false");
				oldButton.focusNode.setAttribute("tabIndex", "-1");
			}

			var newButton=this.pane2button[page.id];
			newButton.set('checked', true);
			newButton.focusNode.setAttribute("aria-selected", "true");
			this._currentChild = page;
			newButton.focusNode.setAttribute("tabIndex", "0");
			var container = registry.byId(this.containerId);
			container.containerNode.setAttribute("aria-labelledby", newButton.id);
		},

		onButtonClick: function(/*dijit._Widget*/ page){
			// summary:
			//		Called whenever one of my child buttons is pressed in an attempt to select a page
			// tags:
			//		private

			if(this._currentChild.id === page.id) {
				//In case the user clicked the checked button, keep it in the checked state because it remains to be the selected stack page.
				var button=this.pane2button[page.id];
				button.set('checked', true);
			}
			var container = registry.byId(this.containerId);
			container.selectChild(page);
		},

		onCloseButtonClick: function(/*dijit._Widget*/ page){
			// summary:
			//		Called whenever one of my child buttons [X] is pressed in an attempt to close a page
			// tags:
			//		private

			var container = registry.byId(this.containerId);
			container.closeChild(page);
			if(this._currentChild){
				var b = this.pane2button[this._currentChild.id];
				if(b){
					focus.focus(b.focusNode || b.domNode);
				}
			}
		},

		// TODO: this is a bit redundant with forward, back api in StackContainer
		adjacent: function(/*Boolean*/ forward){
			// summary:
			//		Helper for onkeypress to find next/previous button
			// tags:
			//		private

			if(!this.isLeftToRight() && (!this.tabPosition || /top|bottom/.test(this.tabPosition))){ forward = !forward; }
			// find currently focused button in children array
			var children = this.getChildren();
			var current = array.indexOf(children, this.pane2button[this._currentChild.id]);
			// pick next button to focus on
			var offset = forward ? 1 : children.length - 1;
			return children[ (current + offset) % children.length ]; // dijit._Widget
		},

		onkeypress: function(/*Event*/ e){
			// summary:
			//		Handle keystrokes on the page list, for advancing to next/previous button
			//		and closing the current page if the page is closable.
			// tags:
			//		private

			if(this.disabled || e.altKey ){ return; }
			var forward = null;
			if(e.ctrlKey || !e._djpage){
				switch(e.charOrCode){
					case keys.LEFT_ARROW:
					case keys.UP_ARROW:
						if(!e._djpage){ forward = false; }
						break;
					case keys.PAGE_UP:
						if(e.ctrlKey){ forward = false; }
						break;
					case keys.RIGHT_ARROW:
					case keys.DOWN_ARROW:
						if(!e._djpage){ forward = true; }
						break;
					case keys.PAGE_DOWN:
						if(e.ctrlKey){ forward = true; }
						break;
					case keys.HOME:
					case keys.END:
						var children = this.getChildren();
						if(children && children.length){
							children[e.charOrCode == keys.HOME ? 0 : children.length-1].onClick();
						}
						event.stop(e);
						break;
					case keys.DELETE:
						if(this._currentChild.closable){
							this.onCloseButtonClick(this._currentChild);
						}
						event.stop(e);
						break;
					default:
						if(e.ctrlKey){
							if(e.charOrCode === keys.TAB){
								this.adjacent(!e.shiftKey).onClick();
								event.stop(e);
							}else if(e.charOrCode == "w"){
								if(this._currentChild.closable){
									this.onCloseButtonClick(this._currentChild);
								}
								event.stop(e); // avoid browser tab closing.
							}
						}
				}
				// handle next/previous page navigation (left/right arrow, etc.)
				if(forward !== null){
					this.adjacent(forward).onClick();
					event.stop(e);
				}
			}
		},

		onContainerKeyPress: function(/*Object*/ info){
			// summary:
			//		Called when there was a keypress on the container
			// tags:
			//		private
			info.e._djpage = info.page;
			this.onkeypress(info.e);
		}
	});

	StackController.StackButton = StackButton;	// for monkey patching

	return StackController;
});

},
'curam/util/onLoad':function(){
/* Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2013. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

  /*
   * Modification History
   * --------------------
   * 06-May-2014 AB   [Cr00430639]Adding title to Iframe-RPT project
   * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
   *                include required bundle.
   * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
   * 21-Jan-2011  DG  [CR00243540] Changed "console.log" to "curam.debug.log".
   * 14-Dec-2010  MV  [CR00238518] Ensure the hidden iframe is not picked up by
   *    WordIntegration control.
   * 06-Dec-2010  MV  [CR00233442] Avoid never ending progress bar in IE.
   * 19-Nov-2010  MV  [CR00231655] Subscribe/connect to events with
   *    a function that will automatically unsubscribe/disconnect on page unload.
   * 30-Jun-2010 MV [CR00161271] Update documentation.
   * 11-Jun-2010 MV [CR00202971] Fixed function for removing subscribers.
   * 02-Jun-2010 MV [CR00202412] Initial version.
   */

define("curam/util/onLoad", ["curam/util",
        "curam/define",
        "curam/util/ResourceBundle"
        ], function() {

  /**
   * Creating Resource Bundle Object to access localized resources.
   */
  dojo.requireLocalization("curam.application", "Debug");
  var bundle = new curam.util.ResourceBundle("Debug");
  
  curam.define.singleton("curam.util.onLoad", {
    EVENT: "/curam/frame/load",

    // Used in the context of the iframe.
    publishers: [],

    /* Used in the context of the parent window and contains subscribers
     * for all the iframes that exist in this window context.
     */
    subscribers: [],

    defaultGetIdFunction: function(iframeNode) {
      // summary:
      // This is the default function for getting a unique ID of an iframe.
      // If the iframe has a CSS class that starts with "iframe-" then this class
      // is returned as the unique ID of the iframe.
      var classes = dojo.attr(iframeNode, "class").split(" ");
      return dojo.filter(classes, function(className) {
        return className.indexOf("iframe-") == 0;
      })[0];
    },

    addPublisher: function(callback) {
      // summary:
      //   Public function, is called in the context of the iframe window.
      curam.util.onLoad.publishers.push(callback);
    },

    addSubscriber: function(iframeId, callback, /*optional*/getId) {
      // summary:
      //   This is called in the context of the parent window.
      //   Multiple subscribers per iframe can be registered, provided each
      //   has a different handler function.
      // parameter: getId
      //   optional, if not specified the default getId function will be used

      curam.util.onLoad.subscribers.push({
        "getId": getId ? getId : curam.util.onLoad.defaultGetIdFunction,
        "callback": callback,
        "iframeId": iframeId
      });
    },

    removeSubscriber: function(iframeId, callback, /*optional*/getId) {
      // summary:
      //  Must be called in the context of the parent window.

      curam.util.onLoad.subscribers =
        dojo.filter(curam.util.onLoad.subscribers, function(subscriberData) {
          return !(subscriberData.iframeId == iframeId
              && subscriberData.callback == callback);
        });
    },

    execute: function() {
      // summary:
      //   Public function, is called in the context of the iframe window.

      if(window.parent == window) {
        curam.debug.log("curam.util.onLoad.execute(): " 
          + bundle.getProperty("curam.util.onLoad.exit"));
        return;
      }

      var context = {};

      dojo.forEach(curam.util.onLoad.publishers, function(callback) {
        // Allow each of the publishers to add to the context object
        callback(context);
      });

      // Free up references to functions
      curam.util.onLoad.publishers = [];

      // A hack to avoid never ending progress bar in IE when multiple iframes
      // exist in the application.
      //Adding title - RPT project 
      require(["dojo/io/iframe"]);
      var iframe = dojo.io.iframe.create(null, null, "about:blank");
      dojo.attr(iframe, "id", "ie-progress-indicator-helper");
      dojo.attr(iframe, "title", "ie-progress-indicator-helper");

      // publish the event into the parent context
      window.parent.dojo.publish(curam.util.onLoad.EVENT, [window.frameElement, context]);
    }
  });

  /* Subscribe to events in the context this file is being loaded in.
   * This is meant for parent window contexts.
   */
  curam.util.subscribe(curam.util.onLoad.EVENT, function(iframeNode, context) {
    dojo.forEach(curam.util.onLoad.subscribers, function(subscriberData) {
      var currentId = subscriberData.getId(iframeNode);
      if (subscriberData.iframeId == currentId) {
        subscriberData.callback(currentId, context);
      }
    });
  });
  
  return curam.util.onLoad;
});

},
'dijit/layout/TabContainer':function(){
define("dijit/layout/TabContainer", [
	"dojo/_base/lang", // lang.getObject
	"dojo/_base/declare", // declare
	"./_TabContainerBase",
	"./TabController",
	"./ScrollingTabController"
], function(lang, declare, _TabContainerBase, TabController, ScrollingTabController){

/*=====
	var _TabContainerBase = dijit.layout._TabContainerBase;
	var TabController = dijit.layout.TabController;
	var ScrollingTabController = dijit.layout.ScrollingTabController;
=====*/

	// module:
	//		dijit/layout/TabContainer
	// summary:
	//		A Container with tabs to select each child (only one of which is displayed at a time).


	return declare("dijit.layout.TabContainer", _TabContainerBase, {
		// summary:
		//		A Container with tabs to select each child (only one of which is displayed at a time).
		// description:
		//		A TabContainer is a container that has multiple panes, but shows only
		//		one pane at a time.  There are a set of tabs corresponding to each pane,
		//		where each tab has the name (aka title) of the pane, and optionally a close button.

		// useMenu: [const] Boolean
		//		True if a menu should be used to select tabs when they are too
		//		wide to fit the TabContainer, false otherwise.
		useMenu: true,

		// useSlider: [const] Boolean
		//		True if a slider should be used to select tabs when they are too
		//		wide to fit the TabContainer, false otherwise.
		useSlider: true,

		// controllerWidget: String
		//		An optional parameter to override the widget used to display the tab labels
		controllerWidget: "",

		_makeController: function(/*DomNode*/ srcNode){
			// summary:
			//		Instantiate tablist controller widget and return reference to it.
			//		Callback from _TabContainerBase.postCreate().
			// tags:
			//		protected extension

			var cls = this.baseClass + "-tabs" + (this.doLayout ? "" : " dijitTabNoLayout"),
				TabController = lang.getObject(this.controllerWidget);

			return new TabController({
				id: this.id + "_tablist",
				dir: this.dir,
				lang: this.lang,
				textDir: this.textDir,
				tabPosition: this.tabPosition,
				doLayout: this.doLayout,
				containerId: this.id,
				"class": cls,
				nested: this.nested,
				useMenu: this.useMenu,
				useSlider: this.useSlider,
				tabStripClass: this.tabStrip ? this.baseClass + (this.tabStrip ? "":"No") + "Strip": null
			}, srcNode);
		},

		postMixInProperties: function(){
			this.inherited(arguments);

			// Scrolling controller only works for horizontal non-nested tabs
			if(!this.controllerWidget){
				this.controllerWidget = (this.tabPosition == "top" || this.tabPosition == "bottom") && !this.nested ?
							"dijit.layout.ScrollingTabController" : "dijit.layout.TabController";
			}
		}
	});
});

},
'dijit/BackgroundIframe':function(){
define("dijit/BackgroundIframe", [
	"require",			// require.toUrl
	".",	// to export dijit.BackgroundIframe
	"dojo/_base/config",
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-style", // domStyle.set
	"dojo/_base/lang", // lang.extend lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie"), has("mozilla"), has("quirks")
	"dojo/_base/window" // win.doc.createElement
], function(require, dijit, config, domConstruct, domStyle, lang, on, has, win){

	// module:
	//		dijit/BackgroundIFrame

	// Flag for whether to create background iframe behind popups like Menus and Dialog.
	// A background iframe is useful to prevent problems with popups appearing behind applets/pdf files,
	// and is also useful on older versions of IE (IE6 and IE7) to prevent the "bleed through select" problem.
	// TODO: For 2.0, make this false by default.  Also, possibly move definition to has.js so that this module can be
	// conditionally required via  dojo/has!bgIfame?dijit/BackgroundIframe
	has.add("bgIframe", has("ie") || has("mozilla"));
	// summary:
	//		new dijit.BackgroundIframe(node)
	//		Makes a background iframe as a child of node, that fills
	//		area (and position) of node

	// TODO: remove _frames, it isn't being used much, since popups never release their
	// iframes (see [22236])
	var _frames = new function(){
		// summary:
		//		cache of iframes

		var queue = [];

		this.pop = function(){
			var iframe;
			if(queue.length){
				iframe = queue.pop();
				iframe.style.display="";
			}else{
				if(has("ie") < 9){
					var burl = config["dojoBlankHtmlUrl"] || require.toUrl("dojo/resources/blank.html") || "javascript:\"\"";
					var html="<iframe src='" + burl + "' role='presentation'"
						+ " style='position: absolute; left: 0px; top: 0px;"
						+ "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
					iframe = win.doc.createElement(html);
				}else{
					iframe = domConstruct.create("iframe");
					iframe.src = 'javascript:""';
					iframe.className = "dijitBackgroundIframe";
					iframe.setAttribute("role", "presentation");
					domStyle.set(iframe, "opacity", 0.1);
				}
				iframe.tabIndex = -1; // Magic to prevent iframe from getting focus on tab keypress - as style didn't work.
			}
			return iframe;
		};

		this.push = function(iframe){
			iframe.style.display="none";
			queue.push(iframe);
		}
	}();


	dijit.BackgroundIframe = function(/*DomNode*/ node){
		// summary:
		//		For IE/FF z-index schenanigans. id attribute is required.
		//
		// description:
		//		new dijit.BackgroundIframe(node)
		//			Makes a background iframe as a child of node, that fills
		//			area (and position) of node

		if(!node.id){ throw new Error("no id"); }
		if(has("bgIframe")){
			var iframe = (this.iframe = _frames.pop());
			node.appendChild(iframe);
			if(has("ie")<7 || has("quirks")){
				this.resize(node);
				this._conn = on(node, 'resize', lang.hitch(this, function(){
					this.resize(node);
				}));
			}else{
				domStyle.set(iframe, {
					width: '100%',
					height: '100%'
				});
			}
		}
	};

	lang.extend(dijit.BackgroundIframe, {
		resize: function(node){
			// summary:
			// 		Resize the iframe so it's the same size as node.
			//		Needed on IE6 and IE/quirks because height:100% doesn't work right.
			if(this.iframe){
				domStyle.set(this.iframe, {
					width: node.offsetWidth + 'px',
					height: node.offsetHeight + 'px'
				});
			}
		},
		destroy: function(){
			// summary:
			//		destroy the iframe
			if(this._conn){
				this._conn.remove();
				this._conn = null;
			}
			if(this.iframe){
				_frames.push(this.iframe);
				delete this.iframe;
			}
		}
	});

	return dijit.BackgroundIframe;
});

},
'curam/util/Constants':function(){
/*
 * Copyright 2009-2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/util/Constants", ["curam/define"
        ], function() {
  
  /*
   * Modification History
   * --------------------
   * 05-Jul-2011  KW  [CR00275353] Initial version
   */

  /**
   * Maintains a list of parameter name constants. 
   */
  curam.define.singleton("curam.util.Constants", {
    RETURN_PAGE_PARAM: "__o3rpu"
  });
  
  return curam.util.Constants;
});

},
'url:dijit/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n",
'dijit/form/Button':function(){
require({cache:{
'url:dijit/form/templates/Button.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button", [
	"require",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.trim
	"dojo/ready",
	"./_FormWidget",
	"./_ButtonMixin",
	"dojo/text!./templates/Button.html"
], function(require, declare, domClass, kernel, lang, ready, _FormWidget, _ButtonMixin, template){

/*=====
	var _FormWidget = dijit.form._FormWidget;
	var _ButtonMixin = dijit.form._ButtonMixin;
=====*/

// module:
//		dijit/form/Button
// summary:
//		Button widget

// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/form/DropDownButton", "dijit/form/ComboButton", "dijit/form/ToggleButton"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.form.Button", [_FormWidget, _ButtonMixin], {
	// summary:
	//		Basically the same thing as a normal HTML button, but with special styling.
	// description:
	//		Buttons can display a label, an icon, or both.
	//		A label should always be specified (through innerHTML) or the label
	//		attribute.  It can be hidden via showLabel=false.
	// example:
	// |	<button data-dojo-type="dijit.form.Button" onClick="...">Hello world</button>
	//
	// example:
	// |	var button1 = new dijit.form.Button({label: "hello world", onClick: foo});
	// |	dojo.body().appendChild(button1.domNode);

	// showLabel: Boolean
	//		Set this to true to hide the label text and display only the icon.
	//		(If showLabel=false then iconClass must be specified.)
	//		Especially useful for toolbars.
	//		If showLabel=true, the label will become the title (a.k.a. tooltip/hint) of the icon.
	//
	//		The exception case is for computers in high-contrast mode, where the label
	//		will still be displayed, since the icon doesn't appear.
	showLabel: true,

	// iconClass: String
	//		Class to apply to DOMNode in button to make it display an icon
	iconClass: "dijitNoIcon",
	_setIconClassAttr: { node: "iconNode", type: "class" },

	baseClass: "dijitButton",

	templateString: template,

	// Map widget attributes to DOMNode attributes.
	_setValueAttr: "valueNode",

	_onClick: function(/*Event*/ e){
		// summary:
		//		Internal function to handle click actions
		var ok = this.inherited(arguments);
		if(ok){
			if(this.valueNode){
				this.valueNode.click();
				e.preventDefault(); // cancel BUTTON click and continue with hidden INPUT click
				// leave ok = true so that subclasses can do what they need to do
			}
		}
		return ok;
	},

	_fillContent: function(/*DomNode*/ source){
		// Overrides _Templated._fillContent().
		// If button label is specified as srcNodeRef.innerHTML rather than
		// this.params.label, handle it here.
		// TODO: remove the method in 2.0, parser will do it all for me
		if(source && (!this.params || !("label" in this.params))){
			var sourceLabel = lang.trim(source.innerHTML);
			if(sourceLabel){
				this.label = sourceLabel; // _applyAttributes will be called after buildRendering completes to update the DOM
			}
		}
	},

	_setShowLabelAttr: function(val){
		if(this.containerNode){
			domClass.toggle(this.containerNode, "dijitDisplayNone", !val);
		}
		this._set("showLabel", val);
	},

	setLabel: function(/*String*/ content){
		// summary:
		//		Deprecated.  Use set('label', ...) instead.
		kernel.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
		this.set("label", content);
	},

	_setLabelAttr: function(/*String*/ content){
		// summary:
		//		Hook for set('label', ...) to work.
		// description:
		//		Set the label (text) of the button; takes an HTML string.
		//		If the label is hidden (showLabel=false) then and no title has
		//		been specified, then label is also set as title attribute of icon.
		this.inherited(arguments);
		if(!this.showLabel && !("title" in this.params)){
			this.titleNode.title = lang.trim(this.containerNode.innerText || this.containerNode.textContent || '');
		}
	}
});


});


},
'url:dijit/layout/templates/TabContainer.html':"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n",
'dijit/_WidgetBase':function(){
define("dijit/_WidgetBase", [
	"require",			// require.toUrl
	"dojo/_base/array", // array.forEach array.map
	"dojo/aspect",
	"dojo/_base/config", // config.blankGif
	"dojo/_base/connect", // connect.connect
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.byId
	"dojo/dom-attr", // domAttr.set domAttr.remove
	"dojo/dom-class", // domClass.add domClass.replace
	"dojo/dom-construct", // domConstruct.create domConstruct.destroy domConstruct.place
	"dojo/dom-geometry",	// isBodyLtr
	"dojo/dom-style", // domStyle.set, domStyle.get
	"dojo/_base/kernel",
	"dojo/_base/lang", // mixin(), isArray(), etc.
	"dojo/on",
	"dojo/ready",
	"dojo/Stateful", // Stateful
	"dojo/topic",
	"dojo/_base/window", // win.doc.createTextNode
	"./registry"	// registry.getUniqueId(), registry.findWidgets()
], function(require, array, aspect, config, connect, declare,
			dom, domAttr, domClass, domConstruct, domGeometry, domStyle, kernel,
			lang, on, ready, Stateful, topic, win, registry){

/*=====
var Stateful = dojo.Stateful;
=====*/

/* CURAM-FIX: Extend ContentPane to allow P&S instrumentation. */
var curamPerfTrackingEnabled = typeof(dojo.global.perf) != "undefined";

// module:
//		dijit/_WidgetBase
// summary:
//		Future base class for all Dijit widgets.

// For back-compat, remove in 2.0.
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/_base/manager"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

// Nested hash listing attributes for each tag, all strings in lowercase.
// ex: {"div": {"style": true, "tabindex" true}, "form": { ...
var tagAttrs = {};
function getAttrs(obj){
	var ret = {};
	for(var attr in obj){
		ret[attr.toLowerCase()] = true;
	}
	return ret;
}

function nonEmptyAttrToDom(attr){
	// summary:
	//		Returns a setter function that copies the attribute to this.domNode,
	//		or removes the attribute from this.domNode, depending on whether the
	//		value is defined or not.
	return function(val){
		domAttr[val ? "set" : "remove"](this.domNode, attr, val);
		this._set(attr, val);
	};
}

return declare("dijit._WidgetBase", Stateful, {
	// summary:
	//		Future base class for all Dijit widgets.
	// description:
	//		Future base class for all Dijit widgets.
	//		_Widget extends this class adding support for various features needed by desktop.
	//
	//		Provides stubs for widget lifecycle methods for subclasses to extend, like postMixInProperties(), buildRendering(),
	//		postCreate(), startup(), and destroy(), and also public API methods like set(), get(), and watch().
	//
	//		Widgets can provide custom setters/getters for widget attributes, which are called automatically by set(name, value).
	//		For an attribute XXX, define methods _setXXXAttr() and/or _getXXXAttr().
	//
	//		_setXXXAttr can also be a string/hash/array mapping from a widget attribute XXX to the widget's DOMNodes:
	//
	//		- DOM node attribute
	// |		_setFocusAttr: {node: "focusNode", type: "attribute"}
	// |		_setFocusAttr: "focusNode"	(shorthand)
	// |		_setFocusAttr: ""		(shorthand, maps to this.domNode)
	// 		Maps this.focus to this.focusNode.focus, or (last example) this.domNode.focus
	//
	//		- DOM node innerHTML
	//	|		_setTitleAttr: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		_setTitleAttr: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		_setMyClassAttr: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value of _setXXXAttr is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		If the custom setter is null, no action is performed other than saving the new value
	//		in the widget (in this).
	//
	//		If no custom setter is defined for an attribute, then it will be copied
	//		to this.focusNode (if the widget defines a focusNode), or this.domNode otherwise.
	//		That's only done though for attributes that match DOMNode attributes (title,
	//		alt, aria-labelledby, etc.)

	// id: [const] String
	//		A unique, opaque ID string that can be assigned by users or by the
	//		system. If the developer passes an ID which is known not to be
	//		unique, the specified ID is ignored and the system-generated ID is
	//		used instead.
	id: "",
	_setIdAttr: "domNode",	// to copy to this.domNode even for auto-generated id's

	// lang: [const] String
	//		Rarely used.  Overrides the default Dojo locale used to render this widget,
	//		as defined by the [HTML LANG](http://www.w3.org/TR/html401/struct/dirlang.html#adef-lang) attribute.
	//		Value must be among the list of locales specified during by the Dojo bootstrap,
	//		formatted according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt) (like en-us).
	lang: "",
	// set on domNode even when there's a focus node.   but don't set lang="", since that's invalid.
	_setLangAttr: nonEmptyAttrToDom("lang"),

	// dir: [const] String
	//		Bi-directional support, as defined by the [HTML DIR](http://www.w3.org/TR/html401/struct/dirlang.html#adef-dir)
	//		attribute. Either left-to-right "ltr" or right-to-left "rtl".  If undefined, widgets renders in page's
	//		default direction.
	dir: "",
	// set on domNode even when there's a focus node.   but don't set dir="", since that's invalid.
	_setDirAttr: nonEmptyAttrToDom("dir"),	// to set on domNode even when there's a focus node

	// textDir: String
	//		Bi-directional support,	the main variable which is responsible for the direction of the text.
	//		The text direction can be different than the GUI direction by using this parameter in creation
	//		of a widget.
	// 		Allowed values:
	//			1. "ltr"
	//			2. "rtl"
	//			3. "auto" - contextual the direction of a text defined by first strong letter.
	//		By default is as the page direction.
	textDir: "",

	// class: String
	//		HTML class attribute
	"class": "",
	_setClassAttr: { node: "domNode", type: "class" },

	// style: String||Object
	//		HTML style attributes as cssText string or name/value hash
	style: "",

	// title: String
	//		HTML title attribute.
	//
	//		For form widgets this specifies a tooltip to display when hovering over
	//		the widget (just like the native HTML title attribute).
	//
	//		For TitlePane or for when this widget is a child of a TabContainer, AccordionContainer,
	//		etc., it's used to specify the tab label, accordion pane title, etc.
	title: "",

	// tooltip: String
	//		When this widget's title attribute is used to for a tab label, accordion pane title, etc.,
	//		this specifies the tooltip to appear when the mouse is hovered over that text.
	tooltip: "",

	// baseClass: [protected] String
	//		Root CSS class of the widget (ex: dijitTextBox), used to construct CSS classes to indicate
	//		widget state.
	baseClass: "",

	// srcNodeRef: [readonly] DomNode
	//		pointer to original DOM node
	srcNodeRef: null,

	// domNode: [readonly] DomNode
	//		This is our visible representation of the widget! Other DOM
	//		Nodes may by assigned to other properties, usually through the
	//		template system's data-dojo-attach-point syntax, but the domNode
	//		property is the canonical "top level" node in widget UI.
	domNode: null,

	// containerNode: [readonly] DomNode
	//		Designates where children of the source DOM node will be placed.
	//		"Children" in this case refers to both DOM nodes and widgets.
	//		For example, for myWidget:
	//
	//		|	<div data-dojo-type=myWidget>
	//		|		<b> here's a plain DOM node
	//		|		<span data-dojo-type=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//		|	</div>
	//
	//		containerNode would point to:
	//
	//		|		<b> here's a plain DOM node
	//		|		<span data-dojo-type=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//
	//		In templated widgets, "containerNode" is set via a
	//		data-dojo-attach-point assignment.
	//
	//		containerNode must be defined for any widget that accepts innerHTML
	//		(like ContentPane or BorderContainer or even Button), and conversely
	//		is null for widgets that don't, like TextBox.
	containerNode: null,

/*=====
	// _started: Boolean
	//		startup() has completed.
	_started: false,
=====*/

	// attributeMap: [protected] Object
	//		Deprecated.   Instead of attributeMap, widget should have a _setXXXAttr attribute
	//		for each XXX attribute to be mapped to the DOM.
	//
	//		attributeMap sets up a "binding" between attributes (aka properties)
	//		of the widget and the widget's DOM.
	//		Changes to widget attributes listed in attributeMap will be
	//		reflected into the DOM.
	//
	//		For example, calling set('title', 'hello')
	//		on a TitlePane will automatically cause the TitlePane's DOM to update
	//		with the new title.
	//
	//		attributeMap is a hash where the key is an attribute of the widget,
	//		and the value reflects a binding to a:
	//
	//		- DOM node attribute
	// |		focus: {node: "focusNode", type: "attribute"}
	// 		Maps this.focus to this.focusNode.focus
	//
	//		- DOM node innerHTML
	//	|		title: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		title: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		myClass: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		There are also some shorthands for backwards compatibility:
	//		- string --> { node: string, type: "attribute" }, for example:
	//	|	"focusNode" ---> { node: "focusNode", type: "attribute" }
	//		- "" --> { node: "domNode", type: "attribute" }
	attributeMap: {},

	// _blankGif: [protected] String
	//		Path to a blank 1x1 image.
	//		Used by <img> nodes in templates that really get their image via CSS background-image.
	_blankGif: config.blankGif || require.toUrl("dojo/resources/blank.gif"),

	//////////// INITIALIZATION METHODS ///////////////////////////////////////

	postscript: function(/*Object?*/params, /*DomNode|String*/srcNodeRef){
		// summary:
		//		Kicks off widget instantiation.  See create() for details.
		// tags:
		//		private
		this.create(params, srcNodeRef);
	},

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		// summary:
		//		Kick off the life-cycle of a widget
		// params:
		//		Hash of initialization parameters for widget, including
		//		scalar values (like title, duration etc.) and functions,
		//		typically callbacks like onClick.
		// srcNodeRef:
		//		If a srcNodeRef (DOM node) is specified:
		//			- use srcNodeRef.innerHTML as my contents
		//			- if this is a behavioral widget then apply behavior
		//			  to that srcNodeRef
		//			- otherwise, replace srcNodeRef with my generated DOM
		//			  tree
		// description:
		//		Create calls a number of widget methods (postMixInProperties, buildRendering, postCreate,
		//		etc.), some of which of you'll want to override. See http://dojotoolkit.org/reference-guide/dijit/_WidgetBase.html
		//		for a discussion of the widget creation lifecycle.
		//
		//		Of course, adventurous developers could override create entirely, but this should
		//		only be done as a last resort.
		// tags:
		//		private

                /* CURAM-FIX: P&S */
                if(curamPerfTrackingEnabled) {
                        perf.widgetStartedLoadingCallback();
                }
                /* END CURAM-FIX */

		// store pointer to original DOM tree
		this.srcNodeRef = dom.byId(srcNodeRef);

		// For garbage collection.  An array of listener handles returned by this.connect() / this.subscribe()
		this._connects = [];

		// For widgets internal to this widget, invisible to calling code
		this._supportingWidgets = [];

		// this is here for back-compat, remove in 2.0 (but check NodeList-instantiate.html test)
		if(this.srcNodeRef && (typeof this.srcNodeRef.id == "string")){ this.id = this.srcNodeRef.id; }

		// mix in our passed parameters
		if(params){
			this.params = params;
			lang.mixin(this, params);
		}
		this.postMixInProperties();

		// generate an id for the widget if one wasn't specified
		// (be sure to do this before buildRendering() because that function might
		// expect the id to be there.)
		if(!this.id){
			this.id = registry.getUniqueId(this.declaredClass.replace(/\./g,"_"));
		}
		registry.add(this);

		this.buildRendering();

		if(this.domNode){
			// Copy attributes listed in attributeMap into the [newly created] DOM for the widget.
			// Also calls custom setters for all attributes with custom setters.
			this._applyAttributes();

			// If srcNodeRef was specified, then swap out original srcNode for this widget's DOM tree.
			// For 2.0, move this after postCreate().  postCreate() shouldn't depend on the
			// widget being attached to the DOM since it isn't when a widget is created programmatically like
			// new MyWidget({}).   See #11635.
			var source = this.srcNodeRef;
			if(source && source.parentNode && this.domNode !== source){
				source.parentNode.replaceChild(this.domNode, source);
			}
		}

		if(this.domNode){
			// Note: for 2.0 may want to rename widgetId to dojo._scopeName + "_widgetId",
			// assuming that dojo._scopeName even exists in 2.0
			this.domNode.setAttribute("widgetId", this.id);
		}
		this.postCreate();

		// If srcNodeRef has been processed and removed from the DOM (e.g. TemplatedWidget) then delete it to allow GC.
		if(this.srcNodeRef && !this.srcNodeRef.parentNode){
			delete this.srcNodeRef;
		}

		this._created = true;

                /* CURAM-FIX: P&S */
                if(curamPerfTrackingEnabled) {
                        perf.widgetLoadedCallback(this);
                }
                /* END CURAM-FIX */
	},

	_applyAttributes: function(){
		// summary:
		//		Step during widget creation to copy  widget attributes to the
		//		DOM according to attributeMap and _setXXXAttr objects, and also to call
		//		custom _setXXXAttr() methods.
		//
		//		Skips over blank/false attribute values, unless they were explicitly specified
		//		as parameters to the widget, since those are the default anyway,
		//		and setting tabIndex="" is different than not setting tabIndex at all.
		//
		//		For backwards-compatibility reasons attributeMap overrides _setXXXAttr when
		//		_setXXXAttr is a hash/string/array, but _setXXXAttr as a functions override attributeMap.
		// tags:
		//		private

		// Get list of attributes where this.set(name, value) will do something beyond
		// setting this[name] = value.  Specifically, attributes that have:
		//		- associated _setXXXAttr() method/hash/string/array
		//		- entries in attributeMap.
		var ctor = this.constructor,
			list = ctor._setterAttrs;
		if(!list){
			list = (ctor._setterAttrs = []);
			for(var attr in this.attributeMap){
				list.push(attr);
			}

			var proto = ctor.prototype;
			for(var fxName in proto){
				if(fxName in this.attributeMap){ continue; }
				var setterName = "_set" + fxName.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); }) + "Attr";
				if(setterName in proto){
					list.push(fxName);
				}
			}
		}

		// Call this.set() for each attribute that was either specified as parameter to constructor,
		// or was found above and has a default non-null value.   For correlated attributes like value and displayedValue, the one
		// specified as a parameter should take precedence, so apply attributes in this.params last.
		// Particularly important for new DateTextBox({displayedValue: ...}) since DateTextBox's default value is
		// NaN and thus is not ignored like a default value of "".
		array.forEach(list, function(attr){
			if(this.params && attr in this.params){
				// skip this one, do it below
			}else if(this[attr]){
				this.set(attr, this[attr]);
			}
		}, this);
		for(var param in this.params){
			this.set(param, this[param]);
		}
	},

	postMixInProperties: function(){
		// summary:
		//		Called after the parameters to the widget have been read-in,
		//		but before the widget template is instantiated. Especially
		//		useful to set properties that are referenced in the widget
		//		template.
		// tags:
		//		protected
	},

	buildRendering: function(){
		// summary:
		//		Construct the UI for this widget, setting this.domNode.
		//		Most widgets will mixin `dijit._TemplatedMixin`, which implements this method.
		// tags:
		//		protected

		if(!this.domNode){
			// Create root node if it wasn't created by _Templated
			this.domNode = this.srcNodeRef || domConstruct.create('div');
		}

		// baseClass is a single class name or occasionally a space-separated list of names.
		// Add those classes to the DOMNode.  If RTL mode then also add with Rtl suffix.
		// TODO: make baseClass custom setter
		if(this.baseClass){
			var classes = this.baseClass.split(" ");
			if(!this.isLeftToRight()){
				classes = classes.concat( array.map(classes, function(name){ return name+"Rtl"; }));
			}
			domClass.add(this.domNode, classes);
		}
	},

	postCreate: function(){
		// summary:
		//		Processing after the DOM fragment is created
		// description:
		//		Called after the DOM fragment has been created, but not necessarily
		//		added to the document.  Do not include any operations which rely on
		//		node dimensions or placement.
		// tags:
		//		protected
	},

	startup: function(){
		// summary:
		//		Processing after the DOM fragment is added to the document
		// description:
		//		Called after a widget and its children have been created and added to the page,
		//		and all related widgets have finished their create() cycle, up through postCreate().
		//		This is useful for composite widgets that need to control or layout sub-widgets.
		//		Many layout widgets can use this as a wiring phase.
		if(this._started){ return; }
		this._started = true;
		array.forEach(this.getChildren(), function(obj){
			if(!obj._started && !obj._destroyed && lang.isFunction(obj.startup)){
				obj.startup();
				obj._started = true;
			}
		});
	},

	//////////// DESTROY FUNCTIONS ////////////////////////////////

	destroyRecursive: function(/*Boolean?*/ preserveDom){
		// summary:
		// 		Destroy this widget and its descendants
		// description:
		//		This is the generic "destructor" function that all widget users
		// 		should call to cleanly discard with a widget. Once a widget is
		// 		destroyed, it is removed from the manager object.
		// preserveDom:
		//		If true, this method will leave the original DOM structure
		//		alone of descendant Widgets. Note: This will NOT work with
		//		dijit._Templated widgets.

		this._beingDestroyed = true;
		this.destroyDescendants(preserveDom);
		this.destroy(preserveDom);
	},

	destroy: function(/*Boolean*/ preserveDom){
		// summary:
		// 		Destroy this widget, but not its descendants.
		//		This method will, however, destroy internal widgets such as those used within a template.
		// preserveDom: Boolean
		//		If true, this method will leave the original DOM structure alone.
		//		Note: This will not yet work with _Templated widgets

		this._beingDestroyed = true;
		this.uninitialize();

		// remove this.connect() and this.subscribe() listeners
		var c;
		while((c = this._connects.pop())){
			c.remove();
		}

		// destroy widgets created as part of template, etc.
		var w;
		while((w = this._supportingWidgets.pop())){
			if(w.destroyRecursive){
				w.destroyRecursive();
			}else if(w.destroy){
				w.destroy();
			}
		}

		this.destroyRendering(preserveDom);
		registry.remove(this.id);
		this._destroyed = true;
	},

	destroyRendering: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Destroys the DOM nodes associated with this widget
		// preserveDom:
		//		If true, this method will leave the original DOM structure alone
		//		during tear-down. Note: this will not work with _Templated
		//		widgets yet.
		// tags:
		//		protected

		if(this.bgIframe){
			this.bgIframe.destroy(preserveDom);
			delete this.bgIframe;
		}

		if(this.domNode){
			if(preserveDom){
				domAttr.remove(this.domNode, "widgetId");
			}else{
				domConstruct.destroy(this.domNode);
			}
			delete this.domNode;
		}

		if(this.srcNodeRef){
			if(!preserveDom){
				domConstruct.destroy(this.srcNodeRef);
			}
			delete this.srcNodeRef;
		}
	},

	destroyDescendants: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Recursively destroy the children of this widget and their
		//		descendants.
		// preserveDom:
		//		If true, the preserveDom attribute is passed to all descendant
		//		widget's .destroy() method. Not for use with _Templated
		//		widgets.

		// get all direct descendants and destroy them recursively
		array.forEach(this.getChildren(), function(widget){
			if(widget.destroyRecursive){
				widget.destroyRecursive(preserveDom);
			}
		});
	},

	uninitialize: function(){
		// summary:
		//		Stub function. Override to implement custom widget tear-down
		//		behavior.
		// tags:
		//		protected
		return false;
	},

	////////////////// GET/SET, CUSTOM SETTERS, ETC. ///////////////////

	_setStyleAttr: function(/*String||Object*/ value){
		// summary:
		//		Sets the style attribute of the widget according to value,
		//		which is either a hash like {height: "5px", width: "3px"}
		//		or a plain string
		// description:
		//		Determines which node to set the style on based on style setting
		//		in attributeMap.
		// tags:
		//		protected

		var mapNode = this.domNode;

		// Note: technically we should revert any style setting made in a previous call
		// to his method, but that's difficult to keep track of.

		if(lang.isObject(value)){
			domStyle.set(mapNode, value);
		}else{
			if(mapNode.style.cssText){
				mapNode.style.cssText += "; " + value;
			}else{
				mapNode.style.cssText = value;
			}
		}

		this._set("style", value);
	},

	_attrToDom: function(/*String*/ attr, /*String*/ value, /*Object?*/ commands){
		// summary:
		//		Reflect a widget attribute (title, tabIndex, duration etc.) to
		//		the widget DOM, as specified by commands parameter.
		//		If commands isn't specified then it's looked up from attributeMap.
		//		Note some attributes like "type"
		//		cannot be processed this way as they are not mutable.
		//
		// tags:
		//		private

		commands = arguments.length >= 3 ? commands : this.attributeMap[attr];

		array.forEach(lang.isArray(commands) ? commands : [commands], function(command){

			// Get target node and what we are doing to that node
			var mapNode = this[command.node || command || "domNode"];	// DOM node
			var type = command.type || "attribute";	// class, innerHTML, innerText, or attribute

			switch(type){
				case "attribute":
					if(lang.isFunction(value)){ // functions execute in the context of the widget
						value = lang.hitch(this, value);
					}

					// Get the name of the DOM node attribute; usually it's the same
					// as the name of the attribute in the widget (attr), but can be overridden.
					// Also maps handler names to lowercase, like onSubmit --> onsubmit
					var attrName = command.attribute ? command.attribute :
						(/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);

					domAttr.set(mapNode, attrName, value);
					break;
				case "innerText":
					mapNode.innerHTML = "";
					mapNode.appendChild(win.doc.createTextNode(value));
					break;
				case "innerHTML":
					mapNode.innerHTML = value;
					break;
				case "class":
					domClass.replace(mapNode, value, this[attr]);
					break;
			}
		}, this);
	},

	get: function(name){
		// summary:
		//		Get a property from a widget.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property from a widget. The property may
		//		potentially be retrieved via a getter method. If no getter is defined, this
		// 		just retrieves the object's property.
		//
		// 		For example, if the widget has properties `foo` and `bar`
		//		and a method named `_getFooAttr()`, calling:
		//		`myWidget.get("foo")` would be equivalent to calling
		//		`widget._getFooAttr()` and `myWidget.get("bar")`
		//		would be equivalent to the expression
		//		`widget.bar2`
		var names = this._getAttrNames(name);
		return this[names.g] ? this[names.g]() : this[name];
	},

	set: function(name, value){
		// summary:
		//		Set a property on a widget
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a widget which may potentially be handled by a
		// 		setter in the widget.
		//
		// 		For example, if the widget has properties `foo` and `bar`
		//		and a method named `_setFooAttr()`, calling
		//		`myWidget.set("foo", "Howdy!")` would be equivalent to calling
		//		`widget._setFooAttr("Howdy!")` and `myWidget.set("bar", 3)`
		//		would be equivalent to the statement `widget.bar = 3;`
		//
		//		set() may also be called with a hash of name/value pairs, ex:
		//
		//	|	myWidget.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	});
		//
		//	This is equivalent to calling `set(foo, "Howdy")` and `set(bar, 3)`

		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var names = this._getAttrNames(name),
			setter = this[names.s];
		if(lang.isFunction(setter)){
			// use the explicit setter
			var result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// Mapping from widget attribute to DOMNode attribute/value/etc.
			// Map according to:
			//		1. attributeMap setting, if one exists (TODO: attributeMap deprecated, remove in 2.0)
			//		2. _setFooAttr: {...} type attribute in the widget (if one exists)
			//		3. apply to focusNode or domNode if standard attribute name, excluding funcs like onClick.
			// Checks if an attribute is a "standard attribute" by whether the DOMNode JS object has a similar
			// attribute name (ex: accept-charset attribute matches jsObject.acceptCharset).
			// Note also that Tree.focusNode() is a function not a DOMNode, so test for that.
			var defaultNode = this.focusNode && !lang.isFunction(this.focusNode) ? "focusNode" : "domNode",
				tag = this[defaultNode].tagName,
				attrsForTag = tagAttrs[tag] || (tagAttrs[tag] = getAttrs(this[defaultNode])),
				map =	name in this.attributeMap ? this.attributeMap[name] :
						names.s in this ? this[names.s] :
						((names.l in attrsForTag && typeof value != "function") ||
							/^aria-|^data-|^role$/.test(name)) ? defaultNode : null;
			if(map != null){
				this._attrToDom(name, value, map);
			}
			this._set(name, value);
		}
		return result || this;
	},

	_attrPairNames: {},		// shared between all widgets
	_getAttrNames: function(name){
		// summary:
		//		Helper function for get() and set().
		//		Caches attribute name values so we don't do the string ops every time.
		// tags:
		//		private

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		var uc = name.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); });
		return (apn[name] = {
			n: name+"Node",
			s: "_set"+uc+"Attr",	// converts dashes to camel case, ex: accept-charset --> _setAcceptCharsetAttr
			g: "_get"+uc+"Attr",
			l: uc.toLowerCase()		// lowercase name w/out dashes, ex: acceptcharset
		});
	},

	_set: function(/*String*/ name, /*anything*/ value){
		// summary:
		//		Helper function to set new value for specified attribute, and call handlers
		//		registered with watch() if the value has changed.
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks && this._created && value !== oldValue){
			this._watchCallbacks(name, oldValue, value);
		}
	},

	on: function(/*String*/ type, /*Function*/ func){
		// summary:
		//		Call specified function when event occurs, ex: myWidget.on("click", function(){ ... }).
		// description:
		//		Call specified function when event `type` occurs, ex: `myWidget.on("click", function(){ ... })`.
		//		Note that the function is not run in any particular scope, so if (for example) you want it to run in the
		//		widget's scope you must do `myWidget.on("click", lang.hitch(myWidget, func))`.

		return aspect.after(this, this._onMap(type), func, true);
	},

	_onMap: function(/*String*/ type){
		// summary:
		//		Maps on() type parameter (ex: "mousemove") to method name (ex: "onMouseMove")
		var ctor = this.constructor, map = ctor._onMap;
		if(!map){
			map = (ctor._onMap = {});
			for(var attr in ctor.prototype){
				if(/^on/.test(attr)){
					map[attr.replace(/^on/, "").toLowerCase()] = attr;
				}
			}
		}
		return map[type.toLowerCase()];	// String
	},

	toString: function(){
		// summary:
		//		Returns a string that represents the widget
		// description:
		//		When a widget is cast to a string, this method will be used to generate the
		//		output. Currently, it does not implement any sort of reversible
		//		serialization.
		return '[Widget ' + this.declaredClass + ', ' + (this.id || 'NO ID') + ']'; // String
	},

	getChildren: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		Does not return nested widgets, nor widgets that are part of this widget's template.
		return this.containerNode ? registry.findWidgets(this.containerNode) : []; // dijit._Widget[]
	},

	getParent: function(){
		// summary:
		//		Returns the parent widget of this widget
		return registry.getEnclosingWidget(this.domNode.parentNode);
	},

	connect: function(
			/*Object|null*/ obj,
			/*String|Function*/ event,
			/*String|Function*/ method){
		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.connect, except with the
		//		implicit use of this widget as the target object.
		//		Events connected with `this.connect` are disconnected upon
		//		destruction.
		// returns:
		//		A handle that can be passed to `disconnect` in order to disconnect before
		//		the widget is destroyed.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when foo.bar() is called, call the listener we're going to
		//	|	// provide in the scope of btn
		//	|	btn.connect(foo, "bar", function(){
		//	|		console.debug(this.toString());
		//	|	});
		// tags:
		//		protected

		var handle = connect.connect(obj, event, this, method);
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	disconnect: function(handle){
		// summary:
		//		Disconnects handle created by `connect`.
		//		Also removes handle from this widget's list of connects.
		// tags:
		//		protected
		var i = array.indexOf(this._connects, handle);
		if(i != -1){
			handle.remove();
			this._connects.splice(i, 1);
		}
	},

	subscribe: function(t, method){
		// summary:
		//		Subscribes to the specified topic and calls the specified method
		//		of this object and registers for unsubscribe() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.subscribe, except with the
		//		implicit use of this widget as the target object.
		// t: String
		//		The topic
		// method: Function
		//		The callback
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when /my/topic is published, this button changes its label to
		//	|   // be the parameter of the topic.
		//	|	btn.subscribe("/my/topic", function(v){
		//	|		this.set("label", v);
		//	|	});
		// tags:
		//		protected
		var handle = topic.subscribe(t, lang.hitch(this, method));
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	unsubscribe: function(/*Object*/ handle){
		// summary:
		//		Unsubscribes handle created by this.subscribe.
		//		Also removes handle from this widget's list of subscriptions
		// tags:
		//		protected
		this.disconnect(handle);
	},

	isLeftToRight: function(){
		// summary:
		//		Return this widget's explicit or implicit orientation (true for LTR, false for RTL)
		// tags:
		//		protected
		return this.dir ? (this.dir == "ltr") : domGeometry.isBodyLtr(); //Boolean
	},

	isFocusable: function(){
		// summary:
		//		Return true if this widget can currently be focused
		//		and false if not
		return this.focus && (domStyle.get(this.domNode, "display") != "none");
	},

	placeAt: function(/* String|DomNode|_Widget */reference, /* String?|Int? */position){
		// summary:
		//		Place this widget's domNode reference somewhere in the DOM based
		//		on standard domConstruct.place conventions, or passing a Widget reference that
		//		contains and addChild member.
		//
		// description:
		//		A convenience function provided in all _Widgets, providing a simple
		//		shorthand mechanism to put an existing (or newly created) Widget
		//		somewhere in the dom, and allow chaining.
		//
		// reference:
		//		The String id of a domNode, a domNode reference, or a reference to a Widget possessing
		//		an addChild method.
		//
		// position:
		//		If passed a string or domNode reference, the position argument
		//		accepts a string just as domConstruct.place does, one of: "first", "last",
		//		"before", or "after".
		//
		//		If passed a _Widget reference, and that widget reference has an ".addChild" method,
		//		it will be called passing this widget instance into that method, supplying the optional
		//		position index passed.
		//
		// returns:
		//		dijit._Widget
		//		Provides a useful return of the newly created dijit._Widget instance so you
		//		can "chain" this function by instantiating, placing, then saving the return value
		//		to a variable.
		//
		// example:
		// | 	// create a Button with no srcNodeRef, and place it in the body:
		// | 	var button = new dijit.form.Button({ label:"click" }).placeAt(win.body());
		// | 	// now, 'button' is still the widget reference to the newly created button
		// | 	button.on("click", function(e){ console.log('click'); }));
		//
		// example:
		// |	// create a button out of a node with id="src" and append it to id="wrapper":
		// | 	var button = new dijit.form.Button({},"src").placeAt("wrapper");
		//
		// example:
		// |	// place a new button as the first element of some div
		// |	var button = new dijit.form.Button({ label:"click" }).placeAt("wrapper","first");
		//
		// example:
		// |	// create a contentpane and add it to a TabContainer
		// |	var tc = dijit.byId("myTabs");
		// |	new dijit.layout.ContentPane({ href:"foo.html", title:"Wow!" }).placeAt(tc)

		if(reference.declaredClass && reference.addChild){
			reference.addChild(this, position);
		}else{
			domConstruct.place(this.domNode, reference, position);
		}
		return this;
	},

	getTextDir: function(/*String*/ text,/*String*/ originalDir){
		// summary:
		//		Return direction of the text.
		//		The function overridden in the _BidiSupport module,
		//		its main purpose is to calculate the direction of the
		//		text, if was defined by the programmer through textDir.
		//	tags:
		//		protected.
		return originalDir;
	},

	applyTextDir: function(/*===== element, text =====*/){
		// summary:
		//		The function overridden in the _BidiSupport module,
		//		originally used for setting element.dir according to this.textDir.
		//		In this case does nothing.
		// element: DOMNode
		// text: String
		// tags:
		//		protected.
	},

	defer: function(fcn, delay){ 
		// summary:
		//		Wrapper to setTimeout to avoid deferred functions executing
		//		after the originating widget has been destroyed.
		//		Returns an object handle with a remove method (that returns null) (replaces clearTimeout).
		// fcn: function reference
		// delay: Optional number (defaults to 0)
		// tags:
		//		protected.
		var timer = setTimeout(lang.hitch(this, 
			function(){ 
				timer = null;
				if(!this._destroyed){ 
					lang.hitch(this, fcn)(); 
				} 
			}),
			delay || 0
		);
		return {
			remove:	function(){
					if(timer){
						clearTimeout(timer);
						timer = null;
					}
					return null; // so this works well: handle = handle.remove();
				}
		};
	}
});

});

},
'dijit/layout/_TabContainerBase':function(){
require({cache:{
'url:dijit/layout/templates/TabContainer.html':"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase", [
	"dojo/text!./templates/TabContainer.html",
	"./StackContainer",
	"./utils",	// marginBox2contextBox, layoutChildren
	"../_TemplatedMixin",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add
	"dojo/dom-geometry", // domGeometry.contentBox
	"dojo/dom-style" // domStyle.style
], function(template, StackContainer, layoutUtils, _TemplatedMixin, declare, domClass, domGeometry, domStyle){


/*=====
	var StackContainer = dijit.layout.StackContainer;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

// module:
//		dijit/layout/_TabContainerBase
// summary:
//		Abstract base class for TabContainer.   Must define _makeController() to instantiate
//		and return the widget that displays the tab labels


return declare("dijit.layout._TabContainerBase", [StackContainer, _TemplatedMixin], {
	// summary:
	//		Abstract base class for TabContainer.   Must define _makeController() to instantiate
	//		and return the widget that displays the tab labels
	// description:
	//		A TabContainer is a container that has multiple panes, but shows only
	//		one pane at a time.  There are a set of tabs corresponding to each pane,
	//		where each tab has the name (aka title) of the pane, and optionally a close button.

	// tabPosition: String
	//		Defines where tabs go relative to tab content.
	//		"top", "bottom", "left-h", "right-h"
	tabPosition: "top",

	baseClass: "dijitTabContainer",

	// tabStrip: [const] Boolean
	//		Defines whether the tablist gets an extra class for layouting, putting a border/shading
	//		around the set of tabs.   Not supported by claro theme.
	tabStrip: false,

	// nested: [const] Boolean
	//		If true, use styling for a TabContainer nested inside another TabContainer.
	//		For tundra etc., makes tabs look like links, and hides the outer
	//		border since the outer TabContainer already has a border.
	nested: false,

	templateString: template,

	postMixInProperties: function(){
		// set class name according to tab position, ex: dijitTabContainerTop
		this.baseClass += this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "");

		this.srcNodeRef && domStyle.set(this.srcNodeRef, "visibility", "hidden");

		this.inherited(arguments);
	},

	buildRendering: function(){
		this.inherited(arguments);

		// Create the tab list that will have a tab (a.k.a. tab button) for each tab panel
		this.tablist = this._makeController(this.tablistNode);

		if(!this.doLayout){ domClass.add(this.domNode, "dijitTabContainerNoLayout"); }

		if(this.nested){
			/* workaround IE's lack of support for "a > b" selectors by
			 * tagging each node in the template.
			 */
			domClass.add(this.domNode, "dijitTabContainerNested");
			domClass.add(this.tablist.containerNode, "dijitTabContainerTabListNested");
			domClass.add(this.tablistSpacer, "dijitTabContainerSpacerNested");
			domClass.add(this.containerNode, "dijitTabPaneWrapperNested");
		}else{
			domClass.add(this.domNode, "tabStrip-" + (this.tabStrip ? "enabled" : "disabled"));
		}
	},

	_setupChild: function(/*dijit._Widget*/ tab){
		// Overrides StackContainer._setupChild().
		domClass.add(tab.domNode, "dijitTabPane");
		this.inherited(arguments);
	},

	startup: function(){
		if(this._started){ return; }

		// wire up the tablist and its tabs
		this.tablist.startup();

		this.inherited(arguments);
	},

	layout: function(){
		// Overrides StackContainer.layout().
		// Configure the content pane to take up all the space except for where the tabs are

		if(!this._contentBox || typeof(this._contentBox.l) == "undefined"){return;}

		var sc = this.selectedChildWidget;

		if(this.doLayout){
			// position and size the titles and the container node
			var titleAlign = this.tabPosition.replace(/-h/, "");
			this.tablist.layoutAlign = titleAlign;
			var children = [this.tablist, {
				domNode: this.tablistSpacer,
				layoutAlign: titleAlign
			}, {
				domNode: this.containerNode,
				layoutAlign: "client"
			}];
			layoutUtils.layoutChildren(this.domNode, this._contentBox, children);

			// Compute size to make each of my children.
			// children[2] is the margin-box size of this.containerNode, set by layoutChildren() call above
			this._containerContentBox = layoutUtils.marginBox2contentBox(this.containerNode, children[2]);

			if(sc && sc.resize){
				sc.resize(this._containerContentBox);
			}
		}else{
			// just layout the tab controller, so it can position left/right buttons etc.
			if(this.tablist.resize){
				//make the tabs zero width so that they don't interfere with width calc, then reset
				var s = this.tablist.domNode.style;
				s.width="0";
				var width = domGeometry.getContentBox(this.domNode).w;
				s.width="";
				this.tablist.resize({w: width});
			}

			// and call resize() on the selected pane just to tell it that it's been made visible
			if(sc && sc.resize){
				sc.resize();
			}
		}
	},

	destroy: function(){
		if(this.tablist){
			this.tablist.destroy();
		}
		this.inherited(arguments);
	}
});

});

},
'curam/util/Refresh':function(){
/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

  /*
   * Modification History
   * -------------------- 
   * 07-Oct-2013  BOS [CR00396277] Refactored to take account that the selected
   *                    tab may be undefined.
   */

define("curam/util/Refresh", ["curam/util/Request",
        "curam/define",
        "curam/util",
        "curam/tab",
        "curam/debug",
        "curam/util/ContextPanel",
        "curam/util/ui/refresh/TabRefreshController",
        "curam/util/ResourceBundle"
        ], function(curamRequest) {
  
  /*
   * Modification History
   * --------------------
   * 11-Apr-2014  MV  [CR00424825] Move to common AJAX request API.
   * 07-Oct-2013  BOS [CR00396277] Refactoring to take account of the fact that
   *                    the selected tab may not be defined. 
   * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
   * 05-Aug-2011  MV  [CR00283589] Stop the click event in refreshPage() function.
   * 29-Jul-2011  MV  [CR00269970] Make use of the new refresh controller.
   * 24-May-2011  MV  [CR00267843] Disallow auto refresh on submitted action pages.
   * 29-Apr-2011  SC  [CR00264826] Removed incorrect usage of getselectedtab.
   * 11-Feb-2011  PK  [CR00251730] Added support for refreshing main content
   *                    panel on submit.
   * 22-Dec-2010  MV  [CR00239864] Only call menu/nav loaders if there is request
   *                    for menu/nav update.
   * 14-Dec-2010  DG  [CR00217921] Updated for "tabDescriptor" on a tab panel.
   *                    Added copyright.
   * 30-Nov-2010  FG  [CR00232780] Add a new function that may be used to refresh
   *                    the page content and smart panel of a page.
   * 13-Jul-2010  MV  [CR00210064] Ensure tab menu and navigation is not updated
   *                   twice on tab load.
   * 07-Jul-2010  MV  [CR00180694] Refactor to unify dynamic updates of actions
   *                  menu and tab navigation. Move JavaScript code from renderer
   *                  to here.
   * 29-Apr-2010  MV  [CR00195109] Uncomment menu bar refresh code.
   * 26-Apr-2010  JS  [CR00197709] Removed refresh navigation bar code.
   * 27-Nov-2009  MV  [CR00180297] Pass the tab widget ID to the handlers.
   * 18-Nov-2009  MV  [CR00172452] Only call handlers for the corresponding tab.
   * 03-Aug-2009  MLB [CR00163869] Full refresh implementation.
   * 16-Jul-2009  MLB [CR00162701] Initial version.
   */
  
  /**
   * Creating Resource Bundle Object to access localized resources.
   */ 
  dojo.requireLocalization("curam.application", "Debug");
  var bundle = new curam.util.ResourceBundle("Debug");

  /**
   * Contains functions for refreshing the various panels.
   */
  curam.define.singleton("curam.util.Refresh", {
    // flag if the content panel has been submitted
    submitted : false,
    // the id of the page that was submitted
    pageSubmitted : "",
    // array of refresh configuration for all tabs
    refreshConfig : [],

    menuBarCallback: null,
    navigationCallback: null,
    refreshedOnTabOpen: {},
    
    /** Holds references to refresh controllers for individual tabs. */
    _controllers: {},
    
    /** Holds reference to the page level refresh button anchor. */
    _pageRefreshButton: undefined,

    /**
     * Called by the MenuBarRenderer to register functions to be used
     * for dynamically updating the menu items.
     * 
     * The function is called once for each opened tab that has dynamic menu
     * items. The assumption is that all such tabs are using the same callbacks
     * so only the first call to this function is used to set the callbacks.
     * Subsequent calls are ignored.
     * 
     * @param updateMenuItemStates
     * @param getRefreshParams
     */
    setMenuBarCallbacks: function(updateMenuItemStates, getRefreshParams) {
      if (!curam.util.Refresh.menuBarCallback) {
        curam.util.Refresh.menuBarCallback = {
          updateMenuItemStates: updateMenuItemStates,
          getRefreshParams: getRefreshParams
        };
      }
    },

    /**
     * Called by the NavigationTabRenderer to register functions to be used
     * for dynamically updating the navigation items.
     * 
     * The function is called once for each opened tab that has dynamic
     * navigation items. The assumption is that all such tabs are using the same
     * callbacks so only the first call to this function is used to set
     * the callbacks. Subsequent calls are ignored.
     * 
     * @param updateNavItemStates
     * @param getRefreshParams
     */
    setNavigationCallbacks: function(updateNavItemStates, getRefreshParams) {
      if (!curam.util.Refresh.navigationCallback) {
        curam.util.Refresh.navigationCallback = {
          updateNavItemStates: updateNavItemStates,
          getRefreshParams: getRefreshParams
        };
      }
    },

    refreshMenuAndNavigation: function(tabWidgetId, refreshMenuBar,
        refreshNavigation, onTabOpen) {
      // Summary:
      //    Sends an AJAX request to get dynamic menu and navigation data
      //    and calls the functions for updating these components.
      curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "
          + "tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",
          tabWidgetId, refreshMenuBar, refreshNavigation);

      if (onTabOpen && curam.util.Refresh.refreshedOnTabOpen[tabWidgetId]) {
        // guard against situations where both menu and navigation onTabOpen
        // is called simultaneously
        curam.debug.log(bundle.getProperty("curam.util.Refresh.stop"));
        return;

      } else if(onTabOpen
            && !curam.util.Refresh.refreshedOnTabOpen[tabWidgetId]) {

        curam.debug.log(bundle.getProperty("curam.util.Refresh.tab.open"));
        // flag the fact onTabOpen was called and proceed with refreshing
        curam.util.Refresh.refreshedOnTabOpen[tabWidgetId] = true;

      } else {
        curam.debug.log(bundle
          .getProperty("curam.util.Refresh.detect.refresh"));
        // otherwise refresh as requested
        curam.debug.log(bundle.getProperty("curam.util.Refresh.refresh"));
      }

      if (!refreshMenuBar && !refreshNavigation) {
        // do nothing
        curam.debug.log(bundle.getProperty("curam.util.Refresh.no.refresh"));
        // reset the onTabOpen flag
        curam.util.Refresh.refreshedOnTabOpen[tabWidgetId] = false;
        return;
      }

      var callbacks = {
        /**
         * Handles the successful return of the AJAX call.
         */
        update: function(tabWidgetId, result, ioargs) {
          curam.debug.log(bundle
            .getProperty("curam.util.Refresh.dynamic.refresh"), result);
          var ncb = curam.util.Refresh.navigationCallback;
          curam.debug.log("refreshNavigation? ", refreshNavigation);
          if (refreshNavigation && result.navData && ncb) {
            ncb.updateNavItemStates(tabWidgetId, result);
          };
          var mcb = curam.util.Refresh.menuBarCallback;
          curam.debug.log("refreshMenuBar? ", refreshMenuBar);
          if (refreshMenuBar && result.menuData && mcb) {
            mcb.updateMenuItemStates(tabWidgetId, result);
          }
        },

        /**
         * Handles the failure case of the AJAX call made to get data
         * for the dynamic items.
         */
        error: function(error, ioargs) {
          curam.debug.log("========= " + bundle
            .getProperty("curam.util.Refresh.dynamic.failure") 
              + " ===========");
          curam.debug.log(bundle
            .getProperty("curam.util.Refresh.dynamic.error"), error);
          curam.debug.log(bundle
            .getProperty("curam.util.Refresh.dynamic.args"), ioargs);
          curam.debug.log("==================================================");
        }
      };

      // send the AJAX request
      var fullUrl = "servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
      var mcb = curam.util.Refresh.menuBarCallback;
      if (refreshMenuBar && mcb) {
        var menuParams = mcb.getRefreshParams( tabWidgetId);
        if (menuParams) {
          fullUrl += "&" + menuParams;
        }
      }
      var ncb = curam.util.Refresh.navigationCallback;
      if (refreshNavigation && ncb) {
        var navParams = ncb.getRefreshParams(tabWidgetId);
        if (navParams) {
          fullUrl += "&" + navParams;
        }
      }
      curam.debug.log(bundle
          .getProperty("curam.util.Refresh.dynamic.refresh.req"));
      curamRequest.post({
         url: fullUrl,
         handleAs: "json",
         preventCache: true,
         load: dojo.hitch(callbacks, "update", tabWidgetId),
         error: dojo.hitch(callbacks, "error")
      });
    },
    
    /**
     * Called by the tab renderer this function ensures that if config is added
     * repeatedly, it overrides any existing config for the same tab.
     * 
     * This caters for closing and reopening tabs.
     * 
     * @param {Object} config The tab refresh configuration to add.
     */
    addConfig: function(config) {
      var updated = false;
      
      // if the config for the tab is already added, replace it with the new one
      dojo.forEach(curam.util.Refresh.refreshConfig, function(existingConfig) {
        if (existingConfig.tab == config.tab) {
          existingConfig.config = config.config;
          
          updated = true;
        }
      });
      
      // otherwise just add as a new config
      if (!updated) {
        curam.util.Refresh.refreshConfig.push(config);
      }
    },

    /**
     * Called by the tab renderer this function instantiates the refresh
     * controller for the specified tab.
     * 
     * @param {String} tabWidgetId Widget ID of the tab to create refresh
     *    controller for.
     */
    setupRefreshController: function(tabWidgetId) {
      curam.debug.log("curam.util.Refresh.setupRefreshController " 
         + bundle.getProperty("curam.util.ExpandableLists.load.for"), 
           tabWidgetId);
      
      var selectedTab = dijit.byId(tabWidgetId);
      var tabId = selectedTab.tabDescriptor.tabID;
      
      var filteredConfigs = dojo.filter(curam.util.Refresh.refreshConfig,
          function(item) { return item.tab == tabId; });

      if (filteredConfigs.length == 1) {
        var refreshConfigTab = filteredConfigs[0];
        var ctl = new curam.util.ui.refresh.TabRefreshController(tabWidgetId, refreshConfigTab);
        curam.util.Refresh._controllers[tabWidgetId] = ctl;
        ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
      
      } else {
        if (filteredConfigs.length == 0) {
          curam.debug.log(bundle
            .getProperty("curam.util.Refresh.no.dynamic.refresh"), tabWidgetId);
          var ctl = new curam.util.ui.refresh.TabRefreshController(tabWidgetId, null);
          curam.util.Refresh._controllers[tabWidgetId] = ctl;
        
        } else {
          throw "curam.util.Refresh: multiple dynamic refresh "
              + "configurations found for tab " + tabWidgetId;

        }
      }
      
      // destroy controller reference on tab close
      curam.tab.executeOnTabClose(function() {
        curam.util.Refresh._controllers[tabWidgetId].destroy();
        curam.util.Refresh._controllers[tabWidgetId] = undefined;
      }, tabWidgetId);
    },
    
    /**
     * Returns the refresh controller for the specified tab, throwing exception
     * in case controller doesn't exist for the tab.
     * 
     * @param tabWidgetId Widget ID of the tab.
     * 
     * @returns The refresh controller.
     */
    getController: function(tabWidgetId) {
      var ctl = curam.util.Refresh._controllers[tabWidgetId];
      if (!ctl) {
        throw "Refresh controller for tab '" + tabWidgetId + "' not found!";
      }
      return ctl;
    },
    
    /**
     * This is called by nested frames to notify the refresh controller of a page
     * load.
     * 
     * @param iframeId ID of the source iframe.
     * @param context The context in which the load happened.
     */
    handleOnloadNestedInlinePage: function(iframeId, context) {
      curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage " 
        + bundle.getProperty("curam.util.Refresh.iframe", [iframeId, context]));
       var topmostWin = curam.util.getTopmostWindow();
       var tabWidgetId = undefined;

      // get the source tab of the nested page
      var sourceTab = curam.tab.getSelectedTab();
      if (sourceTab) {
        tabWidgetId = curam.tab.getTabWidgetId(sourceTab);  
      }

      if (tabWidgetId) {
        curam.debug.log(bundle.getProperty("curam.util.Refresh.parent"), 
                      tabWidgetId);
        topmostWin.curam.util.Refresh.getController(tabWidgetId).pageLoaded(
          context.pageID,
          curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
        topmostWin.dojo.publish("/curam/main-content/page/loaded",
          [context.pageID, tabWidgetId]);
        return true;
      }
      return false;
    },

    /**
     * Handles refresh events emitted by refresh controllers for tabs in the UI.
     * 
     * @param {Array} eventIds A list of refresh events to be processed.
     */
    handleRefreshEvent: function(eventIds) {
      var contextPanelRefreshHandler = function(tabWidgetId) {
        curam.util.ContextPanel.refresh(dijit.byId(tabWidgetId));
      };
      var mainContentRefreshHandler = function(tabWidgetId) {
        curam.tab.refreshMainContentPanel(dijit.byId(tabWidgetId));
      };
      var menuAndNavigationRefreshHandler =
      function(tabWidgetId, refreshMenuBar, refreshNavigation) {
        curam.util.Refresh.refreshMenuAndNavigation(
            tabWidgetId, refreshMenuBar, refreshNavigation);
      };
      curam.util.Refresh._doRefresh(eventIds, contextPanelRefreshHandler,
        mainContentRefreshHandler, menuAndNavigationRefreshHandler);
    },
    
    /**
     * Performs the actual refresh using the specified handlers.
     * THis is factored out to a separate function so that it can be unit tested.
     * 
     * @param {Array} eventIds A list of refresh events to be processed.
     * @param {Function} refreshContextPanel A handler to be called when context
     *            panel refresh is required.
     * @param refreshMainContent A handler to be called when main content panel
     *            refresh is required.
     * @param refreshMenuAndNavigation A handler to be called when menu
     *            and navigation refresh is required.
     */
    _doRefresh: function(eventIds, refreshContextPanel, refreshMainContent,
        refreshMenuAndNavigation) {

      var tabWidgetId = null;
      var refreshMenuBar = false;
      var refreshNavigation = false;
      var refreshContext = false;
      var refreshMain = false;
      var trc = curam.util.ui.refresh.TabRefreshController.prototype;
      dojo.forEach(eventIds, function(eventId) {
        var lastSlashIndex = eventId.lastIndexOf("/");
        var target = eventId.slice(0, lastSlashIndex);
        // all events are for the same tabWidgetId so just read the first one
        if (!tabWidgetId) {
          tabWidgetId = eventId.slice(lastSlashIndex + 1, eventId.length);
        }
        // now read the target part
        if (target == trc.EVENT_REFRESH_MENU) {
          refreshMenuBar = true;
        }
        if (target == trc.EVENT_REFRESH_NAVIGATION) {
          refreshNavigation = true;
        }
        if (target == trc.EVENT_REFRESH_CONTEXT) {
          refreshContext = true;
        }
        if (target == trc.EVENT_REFRESH_MAIN) {
          refreshMain = true;
        }
      });
      
      // perform the refreshes
      if (refreshContext) {
        // refreshes the context panel
        refreshContextPanel(tabWidgetId);
      }
      if (refreshMain) {
        refreshMainContent(tabWidgetId);
      }
      refreshMenuAndNavigation(tabWidgetId, refreshMenuBar, refreshNavigation);
    },
    
    setupRefreshButton:function(buttonClass) {
      dojo.ready(function() {
        var button = dojo.query("." + buttonClass)[0];
        if (!button) {
          throw "Refresh button not found: " + buttonClass;
        }
        curam.util.Refresh._pageRefreshButton = button;
        var href = window.location.href;
        if (curam.util.isActionPage(href)) {
          // disable the button
          dojo.addClass(button, "disabled");
          curam.util.Refresh._pageRefreshButton._curamDisable = true;

        } else {
          dojo.addClass(button, "enabled");
          curam.util.Refresh._pageRefreshButton["_curamDisable"] = undefined;
        }
        
        curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
      });
    },
    
    /**
     * Sets the force refresh flag to true and then invokes the function
     * that refreshes the main content area of a page. An event is also fired
     * that ensures that the associated smart panel is also refreshed.
     */
    refreshPage: function(event){
      dojo.stopEvent(event);

      var href = window.location.href;
      var buttonDisabled = curam.util.Refresh._pageRefreshButton._curamDisable;
      if(buttonDisabled) {
        // do nothing
        return;
      }

      // Ensure that the force refresh flag is set to true and make a call to
      // the function that will carry out the refresh operation.
      curam.util.FORCE_REFRESH = true;
      curam.util.redirectWindow(href, true);
    }
  });
  
  return curam.util.Refresh;
});

},
'curam/util/ContextPanel':function(){
/*
 * Copyright 2010-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Curam Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/util/ContextPanel", ["curam/util",
        "curam/tab",
        "curam/debug",
        "curam/define",
        "curam/util/ResourceBundle"
        ], function() {

/*
 * Modification History
 * --------------------
 * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
 *                include required bundle.
 * 21-Oct-2012  SK  [CR00346419] Correctly unsubscribes from the onload registry
 *                               when a tab is closed.
 * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
 * 10-Sep-2012  MV  [CR00344216] Only subscribe one listener to tab ready event.
 * 31-Jul-2012  MV  [CR00336202] Refactor to also work in IE7.
 * 17-Jul-2012  MV  [CR00329547] Load context panel only after tab is ready.
 * 15-Dec-2011  MV [CR00299726] Synchronize initial load of panel with
 *                              subsequent refreshes. 
 * 26-Aug-2011  JK [TEC-7914]   Added title to context panel.
 * 29-Jul-2011  MV [CR00269970] Added refresh() function.
 * 20-Jan-2011  MV [CR00244126] Initial version.
 */

/**
 * Creating Resource Bundle Object to access localized resources.
 */
dojo.requireLocalization("curam.application", "Debug");  
var bundle = new curam.util.ResourceBundle("Debug");
  
/**
 * @namespace Functions specific to the context panel.
 */
  curam.define.singleton("curam.util.ContextPanel", {
    
    /** Name of the attribute on content iframe that holds the URL of the frame
     * content. */
    CONTENT_URL_ATTRIB: "data-content-url",
  
    /**
     * Setup the page load handler to drive further actions after context panel
     * loads.
     *
     * @param eventName Name of the page event to listen to.
     * @param tabWidgetId Id of the tab widget.
     * @param iframeId Id of the context panel iframe.
     */
    setupLoadEventPublisher: function(eventName, tabWidgetId, iframeId) {
      curam.util.ContextPanel._doSetup(eventName, tabWidgetId, iframeId,
          function(tabWidgetId) { return dijit.byId(tabWidgetId); });
    },
  
    /**
     * Setup the page load handler to drive further actions after context panel
     * loads.
     *
     * @param eventName Name of the page event to listen to.
     * @param tabWidgetId Id of the tab widget.
     * @param iframeId Id of the context panel iframe.
     * @param getTab A function to get tab widget based on ID.
     */
    _doSetup: function(eventName, tabWidgetId, iframeId, getTab) {
    var unsToken = curam.util.getTopmostWindow().dojo.subscribe(
          eventName, function() {
            var tab = getTab(tabWidgetId);
            var iframe = curam.util.ContextPanel._getIframe(tab);
  
          //publish when the detailsPanel is fully loaded
            curam.debug
              .log(bundle.getProperty("curam.util.ContextPanel.loaded"));
            curam.util.getTopmostWindow().dojo.publish(
                '/curam/frame/detailsPanelLoaded', [{ loaded: true }, tabWidgetId]);
  
            // mark the frame as loaded
            iframe._finishedLoading = true;
  
            // effect a scheduled refresh if there is one
            if (iframe._scheduledRefresh) {
              curam.util.ContextPanel.refresh(tab);
              // scheduled refresh done - reset the indicator
              iframe._scheduledRefresh = false;
            }
        });

    curam.util.onLoad.addSubscriber(iframeId, curam.util.ContextPanel.addTitle);
    
    curam.tab.unsubscribeOnTabClose(unsToken, tabWidgetId);
    curam.tab.executeOnTabClose(function() {
      curam.util.onLoad.removeSubscriber(iframeId, curam.util.ContextPanel.addTitle);
    }, tabWidgetId);
  },
  
  /**
   * Refreshes the content panel of the specified tab.
   * This function is expected to be called in the top window runtime context. 
   */
  refresh: function(tab) {
      var iframe = curam.util.ContextPanel._getIframe(tab);
      if (iframe) {
        curam.debug.log(bundle
          .getProperty("curam.util.ContextPanel.refresh.prep"));
        if (iframe._finishedLoading) {
          curam.debug.log(bundle
            .getProperty("curam.util.ContextPanel.refresh"));
          // we will be reloading so reset the flag to guard against in-flight
          // refreshes interrupting
          iframe._finishedLoading = false;
          var doc =  iframe.contentDocument // W3C
                  || iframe.contentWindow.document; //IE
          // force reload of the context panel
      doc.location.reload(true);
  
        } else {
          // frame not yet loaded, delay the refresh after it has loaded fully
          curam.debug.log(bundle
            .getProperty("curam.util.ContextPanel.refresh.delay"));
          iframe._scheduledRefresh = true;
        }
      }
    },
    
    /**
     * 
     * @param tab The tab to look for context panel in.
     * @returns A context panel iframe or undefined if it was not found. 
     */
    _getIframe: function(tab) {
      var frames = dojo.query("iframe.detailsPanelFrame", tab.domNode);
      return frames[0];
  },
  
  addTitle: function(iframeId) {
    var iframe = dojo.query("." + iframeId)[0];
    var pageTitle = iframe.contentWindow.document.title;
    iframe.setAttribute("title", CONTEXT_PANEL_TITLE + " - " + pageTitle);
    },
    
    /**
     * Loads the context panel content in its iframe.
     * The function gracefully handles situations where there is no context
     * panel on the tab or it has been loaded already.
     * 
     * Initially context panel iframe has no src attribute so that we can
     * control at which point in time the content is loaded.
     * 
     * @param tab The tab object to load context panel content for.
     */
    load: function(tab) {
      var iframe = curam.util.ContextPanel._getIframe(tab);
      if (iframe) {
        var source = dojo.attr(iframe,
            curam.util.ContextPanel.CONTENT_URL_ATTRIB);
        if (source && source != "undefined") {
          iframe[curam.util.ContextPanel.CONTENT_URL_ATTRIB] = undefined;
          dojo.attr(iframe, "src", source);
        }
      }
    }
  });
  
  /* Only load the context panel when the tab is setup completely.
   * This is to work around the issue in IE9 that was causing the iframe to be
   * garbage collected inadvertently.
   */
  var topWin = curam.util.getTopmostWindow();
  if (typeof topWin._curamContextPanelTabReadyListenerRegistered != "boolean") {
    topWin.dojo.subscribe(
        "/curam/application/tab/ready", null, function(newTab) {
          curam.util.ContextPanel.load(newTab);
        });
    topWin._curamContextPanelTabReadyListenerRegistered = true;
  }
  
  return curam.util.ContextPanel;
});

},
'curam/util':function(){
/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2012,2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
 * Modification History
 * --------------------
 * 06-Jun-2014  AS [CR00428142] TEC-17091. Skiplink should become visible when focused
 * 03-Jun-2014 BOS [CR00434187] Added the getCookie() function and updated 
 *                    replaceSubmitButton() to support timeout warning dialog.
 * 15-Apr-2014  JY [CR00425261] Refactored the print function to allow printing
 *                              the context panel.
 * 20-Feb-2014  AS [CR00414442] Skipped arrow and validation div of filtering 
 *                              select in doSetFocus and added a new method to 
 *                              focus the help icon on tab navigation after end 
 *                              of modal dialog. 
 * 28-Sep-2013  BOS [CR00396277] Added tests for undefined selected tab.
 * 07-Jun-2013 NLH  [CR00385557] Added highContrastModeType() funtion.
 * 11-Mar-2013  SB  [CR00372052] Added iframeTitleFallBack() function.
 * 21-Feb-2013  SB  [CR00369658] Updated setupGenericKeyHandler() to
					handle year field in Date Selector correctly.
 * 20-Feb-2013  MV  [CR00367727] Prevent opening multiple dialogs at once
 *      by clicking on link in quick succession.
 * 14-Dec-2012  SB  [CR00352283] Added removeRoleRegion() function to remove
 * 					aria role from multiselect.
 * 14-Dec-2012  JY  [CR00360602] Remove the hardcoded height for the actions 
 *                               panel.
 * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
 * 08-Nov-2012  SB  [CR00350381] Added focus setting code for error and
 *                  informational messages.
 * 23-Oct-2012  MV  [CR00347543] Refer to top level UIController.
 * 03-Oct-2012  SB  [CR00344085] Updated openGenericErrorModalDialog() function
 *      to include boolean check for error or warning modal.
 * 01-Oct-2012  MV  [CR00345339] Improve a way to determine topmost window.
 * 24-Sep-2012  MV  [CR00345119] Handle mailto: links properly across browsers.
 * 17-Sep-2012  MK  [CR00344397] Updated incorrect calls to method called 
 *              hasClass to reference correct method called contains instead.
 * 17-Sep-2012  SB  [CR00341890] Added title attribute for page level action
 * 				    menu of the type submit.
 * 11-Sep-2012  MV  [CR00339639] Use local storage API from topmost window to
 *      avoid loading storage for every page. Move a function to this module. 
 * 06-Sep-2012  AF  [CR00330559] Added skip link focus method.
 * 31-Aug-2012  MK  [CR00339638] Reverted connect and disconnect functions back
 *              to previous versions. Added in searchButtonStatus that was 
 *              missed in the merge from TI_60.
 * 23-Aug-2012  BOS [CR00338361] Added the openGenericErrorModalDialog fucntion. 
 * 23-Jul-2012  MV  [CR00336202] Handle gracefully when no tab is open on dialog
 *              submit. Migrate to take on Dojo 1.7.3
 * 26-Jun-2012  SB  [CR00332545] Added searchButtonStatus() function.
 * 28-May-2012  MV  [CR00326704] Fix click event handling for row action menus.
 * 30-Apr-2012  MK  [CR00319243] Updated condition in isSameUrl function to
 *      check if the base string is the same. 
 * 24-Apr-2012  AF  [CR00317721] Updated online help URL in openHelpPage method. 
 * 14-Mar-2012  SB  [CR00312247] Added openAbout() function
 * 07-Feb-2012  MV  [CR00301458] Code cleanup - added comments,
 *      removed unused code.
 * 13-Dec-2011  BOS [CR00299497] Updating the getTopmostWindow() function
 *                    to check that the Screen Context is defined.
 * 02-Dec-2011  BOS [CR00298234] Updating the getTopmostWindow() function
 *                 in order to support portlets.
 * 05-Oct-2011  PK  [CR00289859] Dojo 1.6.1 upgrade and IE9+ support. 
 * 06-Sep-2011  MV  [CR00286500] Don't fail when Preferences anchor not found. 
 * 05-Aug-2011  MV  [CR00283589] Remove incorrect code from connect().
 * 02-Aug-2011  MV  [CR00283023] Some refactoring to allow unit testing.
 * 01-Aug-2011  MV  [CR00283020] Refactored redirectWindow() to allow unit
 *      testing.
 * 29-Jul-2011  MV  [CR00269970] Define curam.util using dojo.mixin to avoid
 *      overwriting other class definitions in the same package. Add support
 *      for new UI refresh handling implementation.
 * 28-Jul-2011  MV  [] Handle the FORCE_REFRESH case fully
 *      in redirectWindow()
 * 05-Jul-2011  KW  [CR00275353] Added setRpu() function and refactored
 *                                openLocaleSelector().
 * 18-Jul-2011  KW  [CR00277581] Connect() now strips '#' from end of event URL
 * 13-Jun-2011  MV  [CR00269902] Avoid 404 error coming from bad RPU.
 * 25-May-2011  MV  [CR00267843] Add function for setting up the Preferences
 *    link.
 * 29-Apr-2011  SC  [CR00264826] Modified page load event to include context.
 * 27-Apr-2011  MV [CR00265188] Added support for opening pages in new tab from
 *    dialog opened in the INLINE_PAGE context.
 * 11-Apr-2011  AF [CR00262956] Modified setupGenericKeyHandler method to
 *                              support device independence.  
 * 01-Apr-2011  KW [CR00262936] Altered 'alterScrollableListBottomBorder' to
 *                              run after page has loaded
 * 25-Mar-2011  SK [TEC-6335] Removed jsModals indicator as modals are always
 *     on for v6 
 * 25-Feb-2011  MV [CR00254937] Honour the RPU set by LinkTag when redirecting
 *     content panel.
 * 25-Feb-2011  MV [CR00254380] Prepare for fix: Honour the RPU set by LinkTag
 *    when redirecting content panel.
 * 18-Feb-2011  MV [CR00247527] Do not block submit when text field has focus.
 * 16-Feb-2011  MV [CR00252701] Fix the isSameUrl() function to work for action
 *    pages that take no parameters.
 * 07-Feb-2011  SJ [CR00247527]  Fixed dropdown submit issue.
 * 07-Jan-2011  MV  [CR00251284] Add support for button load mask.
 * 31-Jan-2011  MK [CR00250297]  Update the clickButton function to handle both
 *    an object and an id as an argument.
 * 28-Jan-2011  MV [CR00245381]  Remove obsolete help settings for dialogs.
 * 26-Jan-2011  MV  [CR00244801] Added another type of refresh behaviour. Strip
 *    o3rpu from RPU value.
 * 25-Jan-2011  MV  [CR00244623] Refactored the function for firing onsubmit
 *    events to work with the latest tab infrastructure changes.
 * 25-Jan-2011  PK  [CR00244773] Filtered all CDEJ parameters from comparison
 *                    in isSameURL. Previously only __o3rpu was filtered.
 * 21-Jan-2011  DG  [CR00243540] Changed "console.log" to "curam.debug.log".
 * 21-Jan-2011  MV  [CR00243263] Add 1px to page height when in list row.
 *    Implement "force refresh" behaviour.
 * 20-Jan-2010  AF  [CR00243728] Added page toolbar button mouse effects.
 * 20-Jan-2010  MK  [CR00243648] Update getPageHeight function to take into
 *                    account the wizard progress bar.
 * 18-Jan-2010  AF  [CR00243204] Modified replaceSubmitButton function for the
 *                               agenda player.
 * 17-Jan-2010 MV [CR00242255] Remove the use of dijit.focus()
 * 16-Jan-2010  PK  [CR00242698] Changed file down load method for list row
 *                    menus so errors will be correctly reported.
 * 14-Jan-2011  MK  [CR00240138] Updated showModalDialog function to remove
 *                    contexts that were not needed in a modal.
 * 06-Jan-2011 KW [CR00240549] Added function to prevent overlapping of Action
 *                             set buttons of modals
 * 04-Jan-2011 MV [CR00240081] Fixes to the getPageHeight() function.
 * 15-Dec-2010 KW [CR00238785] Stopped the refresh event when submit button
 *                             clicked
 * 10-Dec-2010  AF  [CR00233054] Added button mouse event functions that will
 *                               add specific CSS class names when modal and
 *                               cluster buttons are clicked or rolled over.
 * 07-Dec-2010  MV  [CR00233442] Adjustments to the getPageHeight() function
 *    to bring the expandable list detail row more in line with
 *    the specification.
 * 08-Dec-2010  SJ  [CR00229344] Added the print functionality.
 * 03-Dec-2010  MV  [CR00232963] Optimize swapState() function.
 * 30-Nov-2010  MV  [CR00232623] Remove extra height when in-page navigation
 *    is present.
 * 24-Nov-2010  PK  [TEC-XXXX] Added NESTED_UIM context.
 * 23-Nov-2010  MV  [CR00232063] Remove page loading mask.
 * 18-Nov-2010 MV [CR00231387] Connect to DOM events with a function that will
 *    automatically disconnect on page unload.
 * 18-Nov-2010  SJ [CR00228391]Fixed the issue with OPEN_NEW attribute on
 *                   List Row Actions Menu links.
 * 01-Nov-2010  SD  [CR00225331] An extra parameter has been added to both
 *                     openModalDialog and showModalDialog functions for
 *                     UIMDialog API.
 * 27-Oct-2010  SK   [CR00224193] Changed the redirection of the window so that
       the absence of the content panel not caused failure.
 * 14-Oct-2010  MV [CR00223441] Move functions to different namespaces.
 *    Add getSuffixFromClass function.
 * 29-Sep-2010  MV  [CR00221605] Enable submitting by pressing Enter. Check
 *    for existence of dijit before accesing it.
 * 18-Sep-2010  PK  [CR00204622] Ensure when a page loads for the first time
 *                    in an expandable list, only the "expandedList.toggle"
 *                    event is processed.
 * 17-Sep-2010  MV  [CR00220607] Set page focus only when the whole page
 *                    is loaded. Use dijit.focus() instead of plain element
 *                    focus().
 * 14-Sep-2010  MV  [CR00220152] Add the getLastPathSegmentWithQueryString
 *                    function and also use it where appropriate in this file.
 * 10-Sep-2010  MV  [CR00219824] The focus setting function now indicates
 *                    the result via its return value.
 * 14-Sep-2010  PK  [CR00219843] Fixed expandable list sizing.
 * 08-Sep-2010  MV  [CR00219540] Add support for loading pages in the same
 *                    dialog from the list actions menu.
 * 27-Aug-2010  MV  [CR00217499] Added the makeQueryString() function. Replaced
 *                  the use of escape() with the correct function.
 * 05-Jul-2010 BD [CR00204119]  Introduced use of UIMController in place of
 *                              iframe for expandable lists to cater for
 *                              In Page Navigation tabs.
 * 28-Jul-2010  PK  [CR00211736] Updated due to re-factoring of
 *                    tab-app-controller.js.
 * 27-Jul-2010  MK  [CR00211743] Optional display the help icon on a modal
 *                    dialog.
 * 22-Jul-2010  MV  [CR00211225] Fix page height calculation for inline row
 *                    pages.
 * 22-Jul-2010  JY  [CR00210937] add 10px spacing at the top of the actions
 *                    panel.
 * 20-Jul-2010  MV  [CR00211031] doSetFocus(): handle pages with no HTML form.
 * 15-Jul-2010  MV  [CR00210541] Moved focus handling for modals to
 *                    ModalDialog.js
 * 12-Jul-2010  MV  [CR00210064] Added swapState() function.
 * 10-Jul-2010  OK  [CR00209714] Added setupRemovePageMask function.
 * 06-Jul-2010  MV  [CR00180694] Added toCommaSeparatedList() function.
 * 05-Jul-2010  SOS [CR00209386] Added try/catch to getPageHeight() for when
 *                    it's called in a hidden iframe.
 * 02-Jul-2010  PK  [CR00203531] Extra null check added to listRowFrameLoaded
 *                    method.
 * 26-Jun-2010  MV  [CR00204069] Added getPageHeight() function. Used Curam
 *                    debug logger throughout the file.
 * 18-Jun-2010  MV  [CR00203864] Remove the code for automatically resizing the
 *                    details panel.
 * 17-Jun-2010  MV  [CR00202490] Create the iframe for expandable lists on
 *                    demand only.
 * 15-Jun-2010  FG  [CR00202535] Added in some further functions required by the
 *                    application search functionality.
 * 01-Jun-2010  FG  [CR00200968] Added in some functions required by the
 *                    application search functionality.
 * 11-May-2010  SJ  [CR00198617] Implemented caching on expandable list row
 *                    level actions. As a fix CACHE_BUSTER,
 *                    CACHE_BUSTER_PARAM_NAME parameters are added and the same
 *                    are appended to the iframe source.
 * 11-May-2010  MV  [CR00196066] Added stripeTable() function.
 * 22-Apr-2010  AF  [CR00194043] Added 3 pixels to autoSizeDetailsPane's frame
 *                    height which removes an unwanted vertical scroll bar from
 *                    appearing on the details panel.
 * 23-Apr-2010  MV  [CR00194352] Avoid adding extra ampersand in
 *                    addUrlParameter() if there are no more parameters to add.
 * 07-Apr-2010  BD  [CR00191597] Renamed resizeDetailsPanel() function to
 *                    autoSizeDetailsPanel() to better reflect its function.
 *                    Refactored to handle new html structure.
 * 18-Mar-2010  PK  [CR00191211] Added toggleListDetailsRow.
 * 24-Feb-2010  MV  [CR00189738] Re-enable focus on the first editable field in
 *                    modals.
 * 23-Feb-2010  AF  [CR00189289] Added iframe title as a parameter in the iframe
 *                    upload publish event.
 * 16-Feb-2010  BD  [CR00183006] Add try/catch block to addContentWidthListener
 *                    function. Swallows an exception that does not effect the
 *                    application.
 * 08-Jan-2010  MV  [CR00182272] Added a localizable error message for the
 *                    language selector.
 * 11-Dec-2009  MV  [CR00173949] Remove the SrPopUp target from the modal
 *                    handler form.
 * 25-Nov-2009  MV  [CR00175955] Set focus to the first control when the
 *                    curam.modalDisplayed event happens.
 * 24-Nov-2009  MV  [CR00175837] Add new fireTabOpenedEvent function and a
 *                    missing require for curam.tab.
 * 20-Nov-2009  MV  [CR00175615] Fix the firePageSubmittedEvent function.
 * 20-Nov-2009  MV  [CR00175581] Fix the curam.tab.redirectContentPanel call.
 */
  
define("curam/util", ["dojo/dom", "dijit/registry",
        "dojo/dom-construct",
        "dojo/ready",
        "dojo/_base/window",
        "dojo/dom-style",
        "dojo/_base/array",
        "dojo/dom-class",
        "dojo/topic",
        "dojo/_base/event",
        "dojo/query",
        "dojo/has",
        "dojo/_base/unload",
        "dojo/dom-geometry",
        "dojo/_base/json",
        "dojo/dom-attr",
        "dojo/_base/lang",
        "dojo/on",
		"dijit/_BidiSupport",		
        
        "curam/define",
        /* "dojox/storage", */
        "curam/debug",
        "curam/util/RuntimeContext",
        "curam/util/Constants",
        "dojo/_base/sniff",
        "cm/_base/_dom",
        "curam/util/ResourceBundle"
        
        ], function(dom, registry, domConstruct, ready, windowBase, style,
            array, domClass, topic, dojoEvent, query, has, unload,
            geom, json, attr, lang, on, bidi) {

/**
 * Creating Resource Bundle Object to access localized resources.
 */
dojo.requireLocalization("curam.application", "Debug");
var bundle = new curam.util.ResourceBundle("Debug");
  
/**
 * @name      curam.util
 * @namespace Functions for generic utiltities across CDEJ.
 */
curam.define.singleton("curam.util",
/**
 * @lends curam.util.prototype
 */
{
  PREVENT_CACHE_FLAG: "o3pc",
  INFORMATIONAL_MSGS_STORAGE_ID: "__informationals__",
  ERROR_MESSAGES_CONTAINER: "error-messages-container",
  ERROR_MESSAGES_LIST: "error-messages",
  CACHE_BUSTER: 0,
  CACHE_BUSTER_PARAM_NAME: "o3nocache",
  msgLocaleSelectorActionPage: "$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",

  insertCssText: function(cssString, styleNodeId) {
    var id = styleNodeId ? styleNodeId : "_runtime_stylesheet_";
      var styleSheetNode = dom.byId(id);
    var rmNode;

    if(styleSheetNode) {
      if(styleSheetNode.styleSheet) {
        cssString = styleSheetNode.styleSheet.cssText + cssString;
        rmNode = styleSheetNode;
        rmNode.setAttribute("id", "_nodeToRm");
      } else {
        styleSheetNode.appendChild(document.createTextNode(cssString));
        return;
      }
    }

    var pa = document.getElementsByTagName('head')[0];
      styleSheetNode = domConstruct.create("style", {
      type: "text/css",
      id: id
    });

    if(styleSheetNode.styleSheet) {
      styleSheetNode.styleSheet.cssText = cssString;
    }
    else{
      styleSheetNode.appendChild(document.createTextNode(cssString));
    }
    pa.appendChild(styleSheetNode);
    if(rmNode) {
      rmNode.parentNode.removeChild(rmNode);
    }
  },

  fireRefreshTreeEvent: function() {
      if (dojo.global.parent && dojo.global.parent.amIFrame) {
        var wpl = dojo.global.parent.loader;
    }
    if(wpl && wpl.dojo) {
      wpl.dojo.publish("refreshTree");
    }
  },

  /**
   * Invoked when a form is submitted on a page in any context.
   *
   * This event tracks submitting of pages anywhere in the application
   * to enable proper UI refresh handling.
   * 
   * @param {String} context Specifies the context in which the submit
   *     happenned. The expected values are [main-content|dialog].
   */
  firePageSubmittedEvent: function(context) {
    require(["curam/tab"], function() {
      /*
       * This function is executed at onsubmit event and the call to
       * curam.tab.getContainerTab() below was failing in this scenario.
       * Using curam.tab.getSelectedTab() instead works fine.
       * Note that before refactoring to remove the use of getSelectedTab()
       * further changes will have to be made to make it work.
       */
      var sourceTab = curam.tab.getSelectedTab();
      if (sourceTab) {
        var tabWidgetId = curam.tab.getTabWidgetId(sourceTab);
  
        var topWin = curam.util.getTopmostWindow();
        var ctx = (context == "dialog")
            ? curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG
            : curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
        topWin.curam.util.Refresh.getController(tabWidgetId).pageSubmitted(
                dojo.global.jsPageID, ctx);
        topWin.dojo.publish("/curam/main-content/page/submitted",
                [dojo.global.jsPageID, tabWidgetId]);

      } else {
        curam.debug.log("/curam/main-content/page/submitted: " // don't localize
            + bundle.getProperty("curam.util.no.open")); // FIXME: localize
      }
    });
  },

  fireTabOpenedEvent: function(tabWidgetId) {
    // Publish the tab opened event
    curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",
          [dojo.global.jsPageID, tabWidgetId]);
  },

  /**
   * Setup the submit event publisher for the main content panel.
   */
  setupSubmitEventPublisher: function() {
      ready(function() {
        var form = dom.byId('mainForm');
      if (form) {
        curam.util.connect(form, 'onsubmit', function() {
          curam.util.firePageSubmittedEvent("main-content");
        });
      }
    });
  },

  getScrollbar: function(){
    //  summary
    //  returns the width of a scrollbar.

    //  set up the test nodes.
      var scroll = domConstruct.create("div", {}, windowBase.body());

      style.set(scroll, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-300px",
      left: "0px"
    });

      var test = domConstruct.create("div", {}, scroll);

      style.set(test, {
      width: "400px",
      height: "400px"
    });

    var width = scroll.offsetWidth - scroll.clientWidth;
      domConstruct.destroy(scroll);

    //  we return an object because we may add additional info in the future.
    return { width: width };  //  object
  },

  // Returns true if the page is in a modal dialog, false otherwise.
  isModalWindow: function() {
    // the window.curamModal flag is set in curam.dialog.initModal()
      return (dojo.global.curamModal === undefined) ? false : true;
  },

  /**
   * Gets the top most window. If the screen context is set and contains the 
   * portlet context then the inner most window is returned, otherwise the 
   * topmost window window is returned starting with the current window object.
   */
  getTopmostWindow: function() {
    // check topmost window cache and cache it if it is not yet cached 
    if (typeof (dojo.global._curamTopmostWindow) == "undefined") {
      var parentWin = dojo.global;
      // if the screen context contains portlet context then
      // return parent window
      if (typeof(dojo.global.jsScreenContext) != "undefined" 
            && dojo.global.jsScreenContext.hasContextBits('CONTEXT_PORTLET')) {
          dojo.global._curamTopmostWindow = parentWin;
      } else if (parentWin.__extAppTopWin) {
        dojo.global._curamTopmostWindow = parentWin;
      } else {
        while (parentWin.parent != parentWin) {
          parentWin = parentWin.parent;
          if (parentWin.__extAppTopWin) {
            // found the top window of a public facing app
            break;
          }
        }
        dojo.global._curamTopmostWindow = parentWin;
      }
    }
    
    // report cases of incorrect topmost window
    if (dojo.global._curamTopmostWindow.location.href.indexOf(
        "AppController.do") < 0
        && typeof(dojo.global._curamTopmostWindow.__extAppTopWin) 
           == "undefined") {
      curam.debug.log(bundle.getProperty("curam.util.wrong.window")
          + dojo.global._curamTopmostWindow.location.href);
    }

    return dojo.global._curamTopmostWindow;
  },

  getUrlParamValue: function(url, paramName) {
    var qPos = url.indexOf("?");
    if(qPos < 0) {return null;}
    var paramStr = url.substring(qPos + 1, url.length);

    function getVal(delim) {
      var params = paramStr.split(delim);

      paramName += "=";
      for(var i = 0; i < params.length; i++) {
        if(params[i].indexOf(paramName) == 0){
          return params[i].split("=")[1];
        }
      }
    }

    return getVal("&") || getVal("");
  },

  addUrlParam: function(href, paramName, paramValue, prepend) {
    var hasQ = href.indexOf("?") > -1;
    var doPrepend = prepend ? prepend : 'undefined';

    if (!hasQ || (doPrepend == false)) {
      return href + (hasQ ? "&" : "?") + paramName + "=" + paramValue;

    } else {
      var parts = href.split("?");
      href = parts[0] + "?" + paramName + "=" + paramValue + (parts[1] != "" ? ("&" + parts[1]) : "");
      return href;
    }
  },

  replaceUrlParam: function(href, paramName, newValue) {
    href = curam.util.removeUrlParam(href, paramName);
    return curam.util.addUrlParam(href, paramName, newValue);
  },

  removeUrlParam: function(url, paramName, /*optional*/paramValue) {
    var qPos = url.indexOf("?");
    if(qPos < 0) {return url;}
    if(url.indexOf(paramName + "=") < 0){return url;}//shortcut

    var paramStr = url.substring(qPos + 1, url.length);
    var params = paramStr.split("&");
    var value;
    var paramParts, doRemove;

    for(var i = 0; i < params.length; i++) {
      if (params[i].indexOf(paramName+"=") == 0) {
        doRemove = false;
        if(paramValue) {
          paramParts = params[i].split("=");
          if (paramParts.length > 1) {
            if (paramParts[1] == paramValue){
              doRemove = true;
            }

          } else if ( paramValue == "") {
            doRemove = true;
          }

        } else {
          doRemove = true;
        }

        if(doRemove) {
          //remove the parameter from the array
          params.splice(i, 1);
          //in case the param is in the url more than once, keep checking
          i--;
        }
      }
    }
    return url.substring(0, qPos + 1) + params.join("&");
  },

  //Remove the hash symbol, and everything that follows it, from a url.
  stripHash: function(url) {
    var idx = url.indexOf("#");
    if(idx < 0){return url;}
    return url.substring(0, url);
  },

  /**
   * Compares the specified URLs.
   * 
   * This ignores the order of parameters - identical parameters in different
   * orders will still return true.
   * 
   * If the second href is omitted, it defaults to the location
   * of the specified runtime context.
   * 
   * @param href1 First HREF.
   * @param href2 Second HREF.
   * @param rtc current runtime context.
   * 
   * @return True if the two urls are the same, false otherwise.
   */
  isSameUrl: function(href1, href2, rtc) {
    if (!href2) {
      href2 = rtc.getHref();
    }
    if (href1.indexOf("#") == 0) {
      return true;
    }

    // Remove the # symbols from the comparison.
    var hashIdx = href1.indexOf('#');
    if (hashIdx > -1) {
      //If the first URL starts with a #, then it is automatically equal to the
      //second URL
      if (hashIdx == 0) {
        return true;
      }

      var urlParts1 = href1.split("#");
      var hashIdx2 = href2.indexOf("#");

      //If the second URL has a hash symbol, remove it and everything after it,
      //then do the comparison
      if (hashIdx2 > -1) {
        if (hashIdx2 == 0) {
          return true;
        }
        href2 = href2.split("#")[0];
      }
      return urlParts1[0] == href2;
    }

    var stripPageOrActionFromUrl = function(url) {
      var idx = url.lastIndexOf("Page.do");
      var len = 7;
      if (idx < 0) {
        idx = url.lastIndexOf("Action.do");
        len = 9;
      }
      if (idx < 0) {
        idx = url.lastIndexOf("Frame.do");
        len = 8;
      }
      if (idx > -1 && idx == url.length - len) {
        return url.substring(0, idx);
      }
      return url;
    };

    var rp = curam.util.removeUrlParam;

    var here = curam.util.stripHash(rp(href2,
                    curam.util.Constants.RETURN_PAGE_PARAM));
    var there = curam.util.stripHash(rp(href1,
                    curam.util.Constants.RETURN_PAGE_PARAM));
    var partsThere = there.split("?");
    var partsHere = here.split("?");

    //Remove the Action.do or Page.do from the url
    partsHere[0] = stripPageOrActionFromUrl(partsHere[0]);
    partsThere[0] = stripPageOrActionFromUrl(partsThere[0]);

      // This check to see if the page names are the same assumes that the
      // functions above to strip parameters and page or actions from the url
      // have been run first. So the end of each string is only the name of
      // the page.
    var baseEqual = (partsHere[0] == partsThere[0]
          || partsHere[0].match(partsThere[0]+"$")==partsThere[0]);
      
    if (!baseEqual) {
      return false;
    }

    if (partsHere.length == 1 && partsThere.length == 1 && baseEqual) {
      //If the base URL is equal, and the parameter string is exactly equal,
      //then don't bother checking the unordered parameters. Just return true,
      //because they're equal
      return true;

    } else {
      //Check the values of all of the parameters, ignoring order of url
      //parameters
      var paramsHere;
      var paramsThere;
      if (typeof partsHere[1] != "undefined" && partsHere[1] != "") {
        paramsHere = partsHere[1].split("&");

      } else {
        // if there aren't any parameters create an empty array
        paramsHere = new Array();
      }

      if (typeof partsThere[1] != "undefined" && partsThere[1] != "") {
        paramsThere = partsThere[1].split("&");

      } else {
        // if there aren't any parameters create an empty array
        paramsThere = new Array();
      }

      // don't include CDEJ parameters in the comparison
      curam.debug.log(
          "curam.util.isSameUrl: paramsHere " 
          + bundle.getProperty("curam.util.before")
          + paramsHere.length);
        paramsHere = array.filter(paramsHere, curam.util.isNotCDEJParam);
      curam.debug.log(
          "curam.util.isSameUrl: paramsHere "
          + bundle.getProperty("curam.util.after")
          + paramsHere.length);

      curam.debug.log(
          "curam.util.isSameUrl: paramsHere " 
          + bundle.getProperty("curam.util.before")
          + paramsThere.length);
        paramsThere = array.filter(paramsThere, curam.util.isNotCDEJParam);
        curam.debug.log(
            "curam.util.isSameUrl: paramsHere "
            + bundle.getProperty("curam.util.after")
          + paramsThere.length);

      if (paramsHere.length != paramsThere.length) {
        return false;
      }

      var paramMap = {};
      var param;
      for (var i = 0; i < paramsHere.length; i++) {
        param = paramsHere[i].split("=");
        paramMap[param[0]] = param[1];
      }
      for (var i = 0; i < paramsThere.length; i++) {
        param = paramsThere[i].split("=");
        if (paramMap[param[0]] != param[1]) {
          curam.debug.log(bundle.getProperty("curam.util.no.match",
              [param[0], param[1], paramMap[param[0]]]));
          return false;
        }
      }
    }

    //If the base url is the same, and all the parameters match, then
    //the urls are equal
    return true;
  },

  /**
   * Tests if the specified parameter name isn't a CDEJ parameter. It is used by
     * the array.filter used in the isSameUrl method.
   *
   * TODO: There is a similar method in PageRequest.js. Attempted to re-factor
   * but led to JavaScript errors in PageRequest.js when it was executed. Need
   * more time to work out dependency problem, for now duplicating the method.
   *
   * @return true if the specified parameter name is a CDEJ parameter, false
   *         otherwise.
   */
  isNotCDEJParam: function(paramName) {
    return !((paramName.charAt(0) == 'o' && paramName.charAt(1) == '3')
           || (paramName.charAt(0) == '_' && paramName.charAt(1) == '_'
               && paramName.charAt(2) == 'o' && paramName.charAt(3) == '3'));
  },

  //Sets one or more attributes on a DOM node. The map looks like:
  //{ type:'text', value:'This is text', style:'width:100px'}
  setAttributes: function(node, map) {
    for(var x in map) {
      node.setAttribute(x, map[x]);
    }
  },

  //This should be called if a pop up page has submitted a form, stating that
  //if this page is redirected to itself, rather than ignoring it, it should
  //refresh the browser.
  invalidatePage: function() {
    curam.PAGE_INVALIDATED = true;

      var parentWin = dojo.global.dialogArguments
          ? dojo.global.dialogArguments[0]:opener;

    if(parentWin && parentWin != dojo.global) {
      try {
        parentWin.curam.util.invalidatePage();

      } catch(e) {
        curam.debug.log(bundle.getProperty("curam.util.error"), e);
      }
    }
  },
  
  /**
   * Sends the window to a new URL. This needs to be done differently depending
   * on whether or not the window is modal (IE only).
   * @param force
   *    If set to true, it does not matter if the href is the same as
   *    the current href or not, it will be refreshed.
   * @param ignoreFrame
   *    If true, then any other frames on the page are not refreshed.
   */
  redirectWindow: function(href, force, ignoreFrames) {
    var rtc = new curam.util.RuntimeContext(dojo.global);
    var redirectContentPanelInDifferentFrameRootContext =
      function(context, rootObject, href, forceLoad, justRefresh) {
        curam.util.getFrameRoot(context, rootObject)
            .curam.util.redirectContentPanel(href, forceLoad, justRefresh);
      };
      curam.util._doRedirectWindow(href, force, ignoreFrames,
          dojo.global.jsScreenContext, rtc, curam.util.publishRefreshEvent,
        redirectContentPanelInDifferentFrameRootContext);
  },
  
  _doRedirectWindow: function(href, force, ignoreFrames, screenContext, rtc,
      publishRefreshEvent, redirectContentPanelInDifferentFrameRootContext) {
    if (href && curam.util.isActionPage(href)) {
      // Avoid 404 error coming from bad RPU. This is temporary,
      // will be properly fixed by TEC-7123.
      curam.debug.log(bundle.getProperty("curam.util.stopping"), href);
      return;
    }

    var rpl = curam.util.replaceUrlParam;
    //check if we are in the frameset context
    var inFrame = screenContext.hasContextBits('TREE')
                 || screenContext.hasContextBits('AGENDA')
                   || screenContext.hasContextBits('ORG_TREE');

    if(curam.util.FORCE_REFRESH) {
      //If the FORCE_REFRESH parameter is set, in dialog.js, then ignore the
      //href parameter and just reload the page. This is done for the user
      //preferences dialog, so that it doesn't lose the __o3rpu parameter,
      //but can be used in other places too.
      href = rpl(rtc.getHref(), curam.util.PREVENT_CACHE_FLAG,
                 (new Date()).getTime());
      if(curam.util.isModalWindow() || inFrame) {
        publishRefreshEvent();
          dojo.global.location.href = href;

      } else {
        if (screenContext.hasContextBits('LIST_ROW_INLINE_PAGE')
            || screenContext.hasContextBits('NESTED_UIM')) {
          
          curam.util._handleInlinePageRefresh(href);

        } else {
          publishRefreshEvent();
          if (dojo.global.location !== curam.util.getTopmostWindow().location) {
            require(["curam/tab"], function() {
              redirectContentPanelInDifferentFrameRootContext(dojo.global,
                  curam.tab.getTabController().ROOT_OBJ, href, true, true);
            });
          }
        }
      }
      return;
    }

    var u = curam.util;
    //if the URL is identical, it's not a real redirect, so do nothing.
    //This solves the case of a Cancel button being clicked in a modal window.
    var rtc = new curam.util.RuntimeContext(dojo.global);
    if(!inFrame && !force && !curam.PAGE_INVALIDATED
        && u.isSameUrl(href, null, rtc)) {
      return;
    }

    //If in a modal dialog, then submit a form via a 'POST', as doing a normal
    //redirect
    if(curam.util.isModalWindow() || inFrame) {

      //make sure that the modal parameter is set, and that a timestamp is added
      //to prevent the resulting page from being cached.
      href = rpl(rpl(href, "o3frame", "modal"),
        curam.util.PREVENT_CACHE_FLAG, (new Date()).getTime());
        var form = domConstruct.create("form", {
        action:href,
        method:"POST"
      });

      //modals launched from Agenda Player in modal do not need artificial post
      if (!inFrame) {

          if(!dom.byId("o3ctx")) {
          // The o3ctx may exist on the url passed into this method already.
          // So, remove it and reset the form action.
          // This is a last-minute fix for an issue found during JDE 009
          // testing.
          form.action =
            curam.util.removeUrlParam(form.action, "o3ctx");
            var input1 = domConstruct.create("input", {
            type: "hidden", id: "o3ctx", name:"o3ctx",
            value: screenContext.getValue()
          }, form);
        }
          windowBase.body().appendChild(form);
        publishRefreshEvent();
        form.submit();
      }
      if(!ignoreFrames) {
        if (inFrame) {
          curam.util.redirectFrame(href);
        }
      }

    } else {
      //The base context case; no frameset, these are not supported in the tab
      //content panel. Just change the href
      if (screenContext.hasContextBits("LIST_ROW_INLINE_PAGE")
          || screenContext.hasContextBits("NESTED_UIM")) {
        
        curam.util._handleInlinePageRefresh(href);

      } else {
        publishRefreshEvent();
        if (dojo.global.location !== curam.util.getTopmostWindow().location) {
          if (screenContext.hasContextBits("EXTAPP")) {
            var topWindow = window.top;
            topWindow.dijit.byId("curam-app").updateMainContentIframe(href);
          } else {
            require(["curam/tab"], function() {
              curam.util.getFrameRoot(dojo.global,
                  curam.tab.getTabController().ROOT_OBJ)
                     .curam.util.redirectContentPanel(href, force);
            });            
          }
        }
      }
    }
  },
  
  /**
   * Closing modal dialog opened from expanded list row or nested UIM.
   * Either Redirect expanded row iframe or open the url in a new tab,
   * depending on whether the target page is mapped to some tab or not.
   */
  _handleInlinePageRefresh: function(href) {
    curam.debug.log(bundle.getProperty("curam.util.closing.modal"), href);

    /*
     * The following code is based on assumption that inline pages are not
     * mapped to any tabs. If this is the case then the inline frame will
     * be refreshed. If the page is mapped to a tab then it will open in that
     * tab rather than in the inline frame.
     */
    var pageRequest = new curam.ui.PageRequest(href);
    require(["curam/tab"], function() {
      curam.tab.getTabController().checkPage(pageRequest, function(request) {
        // refresh the inline frame
        curam.util.publishRefreshEvent();
        dojo.global.location.reload(true);
      });
    });
  },

  /**
   * @param url
   *    The URL to redirect to.
   * @param forceLoad
   *    Load the page even if the existing URL is the same.
   * @param justRefresh
   *    Do not change to a different URL, only refresh the existing page.
   */
  redirectContentPanel: function(url, forceLoad, justRefresh) {
    require(["curam/tab"], function() {
      // add the return page parameter
      var iframe = curam.tab.getContentPanelIframe();
      var newUrl = url;
      if (iframe != null) {
        var rpu = curam.util.Constants.RETURN_PAGE_PARAM;
        var o3rpuValue = null;
        if (url.indexOf(rpu + "=") >= 0) { // if the url has RPU param
          curam.debug.log("curam.util.redirectContentPanel: " 
            + bundle.getProperty("curam.util.rpu"));
          o3rpuValue = decodeURIComponent(curam.util.getUrlParamValue(url, rpu));
        }
        // or the specified URL has no __o3rpu parameter - just pass through
        
        if (o3rpuValue) {
          // strip the __o3rpu parameter form the RPU value
          o3rpuValue = curam.util.removeUrlParam(o3rpuValue, rpu);

          newUrl = curam.util.replaceUrlParam(url, rpu,
              encodeURIComponent(o3rpuValue));
        }
      }
      var uimPageRequest = new curam.ui.PageRequest(newUrl);
      if (forceLoad) {
        uimPageRequest.forceLoad = true;
      }
      if (justRefresh) {
        uimPageRequest.justRefresh = true;
      }
      curam.tab.getTabController().handlePageRequest(uimPageRequest);
    });
  },

  //Redirects a page in a frame, and refreshes all other frames.
  //If 'href' is not set, then the current window is not refreshed,
  //just the other frames.
  redirectFrame: function(href) {
      if (dojo.global.jsScreenContext.hasContextBits('AGENDA')) {
      var target = curam.util.getFrameRoot(dojo.global, "wizard").targetframe;
      target.curam.util.publishRefreshEvent();
      target.location.href = href;

      } else if (dojo.global.jsScreenContext.hasContextBits('ORG_TREE')) {//lazy tree
      var target = curam.util.getFrameRoot(dojo.global, "orgTreeRoot");
        /* FIXME: this code expects that curam.util and dojo are loaded
         * and avaialble in the target context. Instead it should call require()
         * to load the required module. 
         */
      target.curam.util.publishRefreshEvent();
      target.dojo.publish("orgTree.refreshContent", [ href ]);

    } else { //tree frameset
      var treeRef = curam.util.getFrameRoot(dojo.global, "iegtree");
      var navigator = treeRef.navframe || treeRef.frames[0];
      var contents = treeRef.contentframe || treeRef.frames['contentframe'];
      contents.curam.util.publishRefreshEvent();
      if (curam.PAGE_INVALIDATED || navigator.curam.PAGE_INVALIDATED) {
        var newHref = curam.util.modifyUrlContext(href, 'ACTION');
        contents.location.href = newHref;

      } else {
        contents.location.href = href;
      }
    }

    //Return true, indicating that a redirect did take place.
    return true;
  },

  publishRefreshEvent: function() {
      topic.publish("/curam/page/refresh");
  },

  /**
   * Opens a basic error modal dialog using the href 
   * <code>generic-modal-error.jspx</code>. The paramters are used to contruct
   * the full URL to the dialog.
   * 
   * @param windowOptions       The windows options to specifiy the width and 
   *                              height of the dialog.
   * @param titleProp           The property key to be used when localizing
   *                              the text of the title on the dialog.
   * @param messageProp         The property key to be used when localizing
   *                              the message on the dialog.
   * @param messagePlaceholder1 The first placeholder to be within the message
   *                              on the dialog. THis will not be set if it is 
   *                              undefined.
   * @param isErrorModal        The boolean value to indicate whether it is an
   *                            error modal or a warning modal.            
   */
  openGenericErrorModalDialog: function(windowOptions, titleProp, 
      messageProp, messagePlaceholder1, isErrorModal) {
    var url;
    var msgPlaceholder1;
    var sc = new curam.util.ScreenContext('MODAL');
    var titlePropertyName = "titlePropertyName=" + titleProp + "&";
    var messagePropertyName = "messagePropertyName=" + messageProp + "&";
    var isErrormodal = "errorModal=" + isErrorModal + "&";
    
    if (messagePlaceholder1) {
      msgPlaceholder1 = "messagePlaceholder1=" + messagePlaceholder1 +"&";
      url ="generic-modal-error.jspx?" + titlePropertyName + messagePropertyName 
        + msgPlaceholder1 + isErrormodal + sc.toRequestString();
    } else {
      url ="generic-modal-error.jspx?" + titlePropertyName + messagePropertyName 
      + sc.toRequestString();
    }
    // TODO: May also want to take into account whether window options are set
    // or not -- BOS
    curam.util.openModalDialog({href:url}, windowOptions);
  },

  // Opens a modal dialog.
  // This is the public API function.
  // The function can take an anchor tag or an event as its first parameter
  // The uimToken parameter is only used in conjunction with the UIMDialog API.
  openModalDialog: function(
    eventOrAnchorTag, windowOptions, left, top, uimToken) {

    var href;
    if(!eventOrAnchorTag || !eventOrAnchorTag.href) {
      // it is an event
        eventOrAnchorTag = dojoEvent.fix(eventOrAnchorTag);

      var target = eventOrAnchorTag.target;
        while(target.tagName != "A" && target != windowBase.body()){
        target = target.parentNode;
      }

      href = target.href;

      //Mark the anchor tag as a modal dialog opener, so that other listeners on
      //it, e.g. the List Context Menus in /jscript/curam/listMenu.js, ignore
      //clicks on it.
      target._isModal = true;

        dojoEvent.stop(eventOrAnchorTag);

    } else {
      // it is an anchorTag
      href = eventOrAnchorTag.href;
      eventOrAnchorTag._isModal = true;
    }

        require(["curam/dialog"]);
    var opts = curam.dialog.parseWindowOptions(windowOptions);
    curam.util.showModalDialog(href, eventOrAnchorTag,
          opts['width'], opts['height'], left, top,  false, null, null, uimToken);
    return false;
  },

  // Shows a modal dialog.
  // Internal function, used from the public openModalDialog() function above
  // and also from pop-up-related code (omega3-util.js).

  // The uimToken parameter is only used in conjunction with the UIMDialog API.

  // @param realParent
  //            The parent window the request to open modal originated from.
  showModalDialog: function(url, eventOrAnchorTag,
      width, height, left, top, resizable, status, realParent, uimToken) {

    // handling nested modals ->
    // if called from within modal, redirect call to the parent window.
    var topmostWindow = curam.util.getTopmostWindow();
    if (dojo.global != topmostWindow) {
      curam.debug.log(
          "curam.util.showModalDialog: " 
            + bundle.getProperty("curam.util.redirecting.modal"));
      topmostWindow.curam.util.showModalDialog(url, eventOrAnchorTag,
          width, height, left, top, resizable, status, dojo.global, uimToken);
      return;
    }

    var rup = curam.util.replaceUrlParam;
    url = rup(url, "o3frame","modal");
    url = curam.util.modifyUrlContext(url, 'MODAL', 'TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM');
    url = rup(url, curam.util.PREVENT_CACHE_FLAG, (new Date()).getTime());
    curam.debug.log(bundle.getProperty("curam.util.modal.url"), url);

    if (width) {
      width = typeof(width) == 'number' ? width : parseInt(width);
    }
    if (height) {
      height = typeof(height) == 'number' ? height : parseInt(height);
    }
    
    // Prevent multiple further requests for modal until this one is processed
    if (!curam.util._isModalCurrentlyOpening()) {
      curam.util._setModalCurrentlyOpening(true);

      require(["curam/ModalDialog"]);
      new curam.ModalDialog({href: url,
                             width: width,
                             height: height,
                             openNode: (eventOrAnchorTag && eventOrAnchorTag.target) ? eventOrAnchorTag.target : null,
                             parentWindow: realParent,
                             uimToken: uimToken});
    }
  },
  
  /**
   * Determine if a modal is being opened at this time.
   *
   * @returns True if modal open operation is in progress, otherwise false.
   */
  _isModalCurrentlyOpening: function() {
    return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
  },
  
  /**
   * Set the flag indicating if a modal is being opened at this time.
   *
   * @param isOpening {Boolean} Value for the flag, either true or false.
   */
  _setModalCurrentlyOpening: function(isOpening) {
    curam.util.getTopmostWindow().curam.util._modalOpenInProgress = isOpening;
  },
  
  setupPreferencesLink: function(href) {
      ready(function() {
        var prefsAnchor = query(".user-preferences")[0];
      if (prefsAnchor) {
        if (typeof(prefsAnchor._disconnectToken) == "undefined") {
          prefsAnchor._disconnectToken = curam.util.connect(prefsAnchor,
              "onclick", curam.util.openPreferences);
        }
        
        if (!href) {
            href = dojo.global.location.href;
        }
        if (curam.util.isActionPage(href)) {
          // disable the link
            domClass.replace(prefsAnchor, "disabled", "enabled");
          prefsAnchor._curamDisable = true;

        } else {
            domClass.replace(prefsAnchor, "enabled", "disabled");
          prefsAnchor._curamDisable = false;
        }

      } else {
        curam.debug.log(bundle.getProperty("curam.util.no.setup"));
      }
    });
  },
  
  openPreferences: function(event) {
      dojoEvent.stop(event);
    
    if (event.target._curamDisable) {
      // link disabled, do nothing
      return;
    }
    
    require(["curam/tab"], function() {
      curam.tab.getTabController().handleLinkClick(
          "user-prefs-editor.jspx", {dialogOptions:"width=450"});
    });
  },
  
  openAbout: function(event) {
      dojoEvent.stop(event);
      require(["curam/tab"], function() {
        curam.tab.getTabController().handleLinkClick(
            "about.jsp", {dialogOptions:"width=645,height=480"});
      });
  },
  

  addMinWidthCalendarCluster: function(id){

      var contentNode = dom.byId(id);
    var i = 0;

    function addWidth(evt){
        array.forEach(contentNode.childNodes, function(node){
          if(domClass.contains(node, "cluster")){
            style.set(node, "width", "97%");
          if(node.clientWidth < 700){
              style.set(node, "width", "700px");
          }
        }
      });
    }//end function addWidth

      if(has("ie") > 6){
        array.forEach(contentNode.childNodes, function(node){
          if(domClass.contains(node, "cluster")){
            style.set(node, "minWidth", "700px");
        }
      });
    } else {
        on(dojo.global, 'resize', addWidth);
        ready(addWidth);
    }
  },

  addPopupFieldListener: function(id){
      if(!has("ie") || has("ie") > 6){
      return;
    }
    if(!curam.util._popupFields) {
      function doResize(evt){
        var actionWidth=0;
        var j = 0;
        var x = 0;
        var arr = curam.util._popupFields;
          array.forEach(curam.util._popupFields, function(id){
            var fieldNode = dom.byId(id);
            query("> .popup-actions", fieldNode).forEach(function(node){
            actionWidth = node.clientWidth + 30;
          });

            query("> .desc", fieldNode).forEach(function(node){
              style.set(node, "width",
              Math.max(0, fieldNode.clientWidth - actionWidth) + "px");
          });
        });
      }// end doResize function
      curam.util._popupFields = [id];
        on(dojo.global, 'resize', doResize);
        ready(doResize);
    } else {
     curam.util._popupFields.push(id);
    }
  },

  /**
   * Sets the width and height (on IE6) of the main content area and sidebar
   * when the window is resized. The sidebar is not always included on a page.
   */
  addContentWidthListener: function(id) {
      if (has("ie") > 6) {
      // don't do if IE is 7 and higher
      return;
    }
      var setStyle = style.set;
      var hasClass = domClass.contains;

    function doResize(evt) {
      var i = 0;
        var contentNode = dom.byId("content");
      if (contentNode) {
        var width = contentNode.clientWidth;

        // Only set the height of the content if the footer is present,
        // and if the browser is Internet Explorer 6
          if (has("ie") == 6 && dom.byId("footer")) {
            var contentHeight = windowBase.body().clientHeight - 100;
          setStyle(contentNode, "height", contentHeight + "px");
            var sideNode = dom.byId("sidebar");
          if (sideNode) {
            setStyle(sideNode, "height", contentHeight + "px");
          }
        }

        try{
            query("> .page-title-bar", contentNode).forEach(function(node){
              var marginW = geom.getMarginSize(node).w
                  - geom.getContentBox(node).w;
              if (!has("ie")) {
              marginW +=1;
            }
            width =  contentNode.clientWidth - marginW;
              style.set(node, "width", width + "px");
          });
        }catch(e){
        // Do nothing. If the page-title-bar does not exist it won't need to be resized.
        }

          query("> .page-description", contentNode).style("width", width + "px");
          query("> .in-page-navigation", contentNode).style("width", width + "px");
      }
    }

    curam.util.subscribe("/clusterToggle", doResize);
    curam.util.connect(dojo.global, 'onresize', doResize);
      ready(doResize);
  },

  //depending on the final row and height of the visible scrollable area
  //we will have to add/remove the bottom border on the final row
  alterScrollableListBottomBorder: function(id, maxHeight){

    var visibleAreaHeight = maxHeight;
    var queryText = "#" + id + " table"; //to find the table contained in the div

    function alterBorder() {
        var scrollTable = query(queryText)[0];
      if (scrollTable.offsetHeight >= visibleAreaHeight) { //scrollbar visible & active
        //dont want a border on final row, if an odd row
          var lastRow = query(".odd-last-row", scrollTable)[0];
        if (typeof lastRow != "undefined") {
            domClass.add(lastRow, "no-bottom-border");
        }
      }
      else if (scrollTable.offsetHeight < visibleAreaHeight) { //scrollbar visible & inactive
        //we want a border on final row, if an even row
          var lastRow = query(".even-last-row", scrollTable)[0];
        if (typeof lastRow != "undefined") {
            domClass.add(lastRow, "add-bottom-border");
        }
      }
      else {
        curam.debug.log("curam.util.alterScrollableListBottomBorder: " 
          + bundle.getProperty("curam.util.code"));
      }
    }
    //added onLoad event to stop IE7 reading table heght before it is fully loaded
      ready(alterBorder);

  },

  //Set the width (on IE6) of the file upload button and its associated textfield,
  // and it will be auto resized when the window is resized.
  addFileUploadResizeListener:function(code){

    function fileUploadResize(evt){

        if(query(".widget")){

                query(".widget").forEach(function(widgetNode){
                var width = widgetNode.clientWidth;
                    if(query(".fileUpload", widgetNode)){

                        query(".fileUpload", widgetNode).forEach(function(fileUploadNode){
                        fileUploadWidth = width/30;
                        if(fileUploadWidth < 4){
                          fileUploadNode.size= 1;
                        }
                        else{
                          fileUploadNode.size= fileUploadWidth;
                        }
                      });
                  }
              });
          }
    }
      on(dojo.global, 'resize', fileUploadResize);
      ready(fileUploadResize);
  },


  //Opens a pop up dialog, non-modal, in the centre of the screen.
  openCenteredNonModalWindow: function(url, width, height, name) {
    // Fudge factors for window decoration space.
    width = Number(width);
    height = Number(height);
    var offsetLeft = (screen.width - width) / 2;
    var offsetTop = (screen.height - height) / 2;

    height = offsetTop < 0 ? screen.height : height;
    offsetTop = Math.max(0, offsetTop);

    width = offsetLeft < 0 ? screen.width : width;
    offsetLeft = Math.max(0, offsetLeft);

    var left = "left", top = "top";
      if(has("ff")) {
       left = "screenX", top = "screenY";
    }
    var defaultOptions = "location=no, menubar=no, status=no, toolbar=no, "
                         + "scrollbars=yes, resizable=no";

      var newWin = dojo.global.open(url, name || "name",
      'width=' + width + ', height=' + height + ', ' +
      left + '=' + offsetLeft + ',' + top + '=' + offsetTop + ',' +
            defaultOptions );
    // Enforce the size of the window.
    newWin.resizeTo(width, height);

    // Enforce the position of the window
    newWin.moveTo(offsetLeft, offsetTop);
    newWin.focus();
  },

  adjustTargetContext: function(win, href) {
      if (win && win.dojo.global.jsScreenContext) {
        var oldContext = win.dojo.global.jsScreenContext;
        oldContext.updateStates(dojo.global.jsScreenContext);
      return curam.util.replaceUrlParam(href, "o3ctx", oldContext.getValue());
    }
    return href;
    // TO DO: what context is needed to return here if the conditional
    // returns false?
    // Will be looked at in TEC-7946
  },

  modifyUrlContext: function(url, addBits, clearBits) {
    var newUrl = url;
    var ctx = new curam.util.ScreenContext();
    var valueInUrl = curam.util.getUrlParamValue(url, "o3ctx");
    if (valueInUrl) {
      ctx.setContext(valueInUrl);
    } else {
      ctx.clear();
    }
    if (addBits) {
      ctx.addContextBits(addBits);
    }
    if (clearBits) {
      ctx.clear(clearBits);
    }
    newUrl = curam.util.replaceUrlParam(url, "o3ctx", ctx.getValue());
    return newUrl;
  },

  updateCtx: function(initialValue) {
  var valueInUrl = curam.util.getUrlParamValue(initialValue, "o3ctx");
  if (!valueInUrl) {
    return initialValue;
  }
    return curam.util.modifyUrlContext(initialValue, null, 'MODAL');
  },

  getFrameRoot: function(thisWindow, rootObjectName) {
    var found = false;
    var topRef = thisWindow;
    if (topRef) {
      while (topRef != top && !topRef.rootObject) {
        topRef = topRef.parent;
      }
      if (topRef.rootObject) {
        found = (topRef.rootObject == rootObjectName);
      }
    }

    return found ? topRef : null;
  },

  //Saves HTML for informational messages locally on the clients machine.
  //This is used by modal windows to store informational messages before they
  //shut down. The parent page then loads these messages using
  //curam.util.loadInformationalMsgs, and clears the local
  //stored versions, so they are only loaded once.
  saveInformationalMsgs: function(callback) {
    curam.util.runStorageFn(function() {
      try {
          var context = curam.util.getTopmostWindow().dojox;
          context.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,
              json.toJson({
              //Store the page ID, so these messages are only loaded back onto
              //the same page as the one on which they were saved.
                pageID: windowBase.body().id,

              //Store the entire set of messages, including the header, the
              //<ul> element and it's contents. This will be used in most cases.
                total: dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,

              //Save just the <li> elements. If the parent page already has
              //informational messages, these are appended to the existing list.
              //This should not happen really, but is possible. I think...
              //Either way, this doesn't hurt.
                listItems: dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML
          }));

      } catch (e) {
        curam.debug.log(bundle.getProperty("curam.util.exception"), e);
      }
    },
    callback);
  },

  //Runs a function that uses dojox.storage. This makes it wait for the manager
  //to be initialized.  If the storage manager is ready, this function is run
  //immediately.
  runStorageFn: function(fn, callback) {
    var runAction = function() {
      fn();
      if(callback) {
        setTimeout(callback, 10);
      }
    };
    var context = curam.util.getTopmostWindow().dojox;
    require(["dojox/storage"], function() {
      var mgr = context.storage.manager;
      if (mgr.isInitialized()) {
        //If the storage manager is ready, just run the function
        runAction();
      } else {
        //Run the function when the manager is ready. If an addOnLoad method is
        //available use it, otherwise use the on function.
        if (mgr.addOnLoad) {
          mgr.addOnLoad(runAction);
        } else{
          var wrapper = {exp: runAction};
          on(mgr, "loaded", wrapper, "exp");
        }
      }
    });
  },

  //Disables the loading of informational messages on the current page.
  //This prevents the messages being cleared for a modal dialog's parent page
  //if the loadInformationalMsgs function runs on the page after the messages
  //are saved using the saveInformationalMsgs function.
  disableInformationalLoad: function() {
    curam.util._informationalsDisabled = true;
  },

  redirectDirectUrl: function() {
      ready(function(){
        if (dojo.global.parent == dojo.global) {
        var url = document.location.href;
        var idx=url.lastIndexOf("/");
        if (idx > -1) {
          if (idx <= url.length) {  
           url = url.substring(idx + 1);
         }
        } 
        
          dojo.global.location = jsBaseURL + "/AppController.do?o3gtu=" + encodeURIComponent(url);
      }
    });
  },
  
  //Loads any informational messages from local storage, and puts them
  //on the page. If they exist, they are wiped out, so that they only show once.
  loadInformationalMsgs: function() {
      ready(function(){
      // no informational messages are to be displayed within the context panel
        if(dojo.global.jsScreenContext.hasContextBits('CONTEXT_PANEL')) {
          return;
        }

      if(curam.util._informationalsDisabled) { return;}
      //run this function when the storage is ready.
      curam.util.runStorageFn(function() {
          var context = curam.util.getTopmostWindow().dojox;
          var msgs = context.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);

        // If informational messages are stored locally, insert them into the
        // page
        if(msgs && msgs != "") {
          //Deserialize the messages from text to a JSON object
            msgs = json.fromJson(msgs);

          //Wipe out the messages so they are only loaded once
          //We could use the dojox.storage.remove method here, but it is not
          //supported by all storage implementations, so just make it an empty
          //string.
            context.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID, "");
            var div = dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
            var list = dom.byId(curam.util.ERROR_MESSAGES_LIST);

          //Only load the messages on the same page as they were saved.
          //The body of each page has it's ID set, which is the name of the
          //UIM file, more or less, and is therefore unique.
            if(msgs.pageID != windowBase.body().id) {
            return;
          }

          // If there are somehow messages already on the page, do not override
          // them, just append to them.
          if(list) {
            //Don't append duplicate informational messages.
              var tempUL = domConstruct.create("ul", {
              innerHTML: msgs.listItems
            });

            //Create an array of the LI elements already in the list.
            var currentLIs = [];
            for(var i = 0; i < list.childNodes.length; i++) {
              if(list.childNodes[i].tagName == "LI"){
                currentLIs.push(list.childNodes[i]);
              }
            }

            //Go through the existing messages to check for duplicates
            //If no duplicate informational message exists, then append the
            //message to the existing list of messages.
            var skip = false;
            var nodes = tempUL.childNodes;
            for(var i = 0; i < nodes.length; i++) {
              skip = false;
              for(var j = 0; j < currentLIs.length; j++) {
                if(nodes[i].innerHTML == currentLIs[j].innerHTML) {
                  skip = true;
                  break;
                }
              }
              if(!skip) {
                list.appendChild(nodes[i]);
                i--;
              }
            }
          } else if(div){
            div.innerHTML = msgs.total;
          } 
        }
        var informationalMessage = dojo.byId('error-messages');
          if (informationalMessage && !dojo.global.jsScreenContext.hasContextBits("MODAL")) {
            informationalMessage.focus();
          }
      });
    });
  },

  /**
   * sets focus to the input field with the biggest value
   * of tabindex property.
   */
   setFocus: function() {
    var isModal = curam.util.getUrlParamValue(
          dojo.global.location.href, "o3frame") == "modal";
    if (!isModal) {
      // for pages in main content call setFocus here, modals will
      // do it differently in ModalDialog.js
        ready(curam.util.doSetFocus);
    }
  },

  /**
   * Set focus on the first editable field in the page. If there are no editable
   * fields, the function does not do anything. In case the first editable field
   * is a FilteringSelect widget than it skipd the arrow and validation container
   * and sets the focus on the input container of FilteringSelect widget.
   *
   * @returns {Boolean} True if focus has been set to the first editable field.
   *                    False if there are no editable fields in the page.
   */
  doSetFocus: function() {
    var firstIdx = -1;  // marks the first element to set focus to
    var customIdx = -1; // marks any override of the first element
    var form = document.forms[0];
    if (!form) {
      // no editable fields - nothing to do
      return false;
    }
    var elements = form.elements;
    var l = elements.length;
    var elem;
    
    for (var i = 0; i < l; i++) {
      elem = elements[i];
      // we check firstIdx to prevent having to iterate over the
      // elements twice to find the first and custom fields for focus
      if (firstIdx == -1 && (
          elem.type == 'select-one'
          || elem.type == 'text'
          || elem.tagName == "TEXTAREA") 
          && !domClass.contains(elem, "dijitArrowButtonInner")
          && !domClass.contains(elem, "dijitValidationInner")) {
        firstIdx = i;
      }
      if (elem.tabIndex == '1') {
        // reset the tab index to prevent it having an effect on
        // screen tabbing.
        elem.tabIndex = 0;
        customIdx = i;
        break; // once we've found an override, no need to keep looping.
      }
    }

    var elem;
    if (customIdx != -1) {
      elem = elements[customIdx];

    } else if (firstIdx != -1) {
      elem = elements[firstIdx];
    }

    try {
      var errorMessage = dojo.byId('error-messages');
      if (errorMessage) {
        errorMessage.focus();
      } else {
      elem.focus();
      }
    } catch(e) {
      curam.debug.log(bundle.getProperty("curam.util.error.focus"), e.message);
      return false;
    }

    return true;
  },

  openLocaleSelector: function(event) {
      event = dojoEvent.fix(event);
    var target = event.target;
    while(target && target.tagName != "A") {
      target = target.parentNode;
    }
    var loc = target.href;
    var rpu = curam.util.getUrlParamValue(loc, "__o3rpu");
    // strip the __o3rpu parameter form the RPU value
    rpu = curam.util.removeUrlParam(rpu, "__o3rpu");
    var href="user-locale-selector.jspx" + "?__o3rpu=" + rpu;

      if (!curam.util.isActionPage(dojo.global.location.href)) {
      openModalDialog({href:href},"width=500,height=300",200,150); 

    } else {
      alert(curam.util.msgLocaleSelectorActionPage);
    }

    return false;
  },

  isActionPage: function(url) {
    var pageAndQuery = curam.util.getLastPathSegmentWithQueryString(url);
    var pageName = pageAndQuery.split("?")[0];
    return pageName.indexOf("Action.do") > -1;
  },

  closeLocaleSelector: function(event) {
      event = dojoEvent.fix(event);
      dojoEvent.stop(event);

      dojo.global.close();
    return false;
  },

  /**
   * Retrieves the remaining part of a class name which has the specified prefix.
   * E.g. for <theNode class="class1 class2 thePrefix-remaining-part-of-name" />
   * the call to curam.util.getSuffixFromClass(theNode, "thePrefix-")
   * will return "remaining-part-of-name".
   *
   * @param node
   *          The note to get the class from.
   * @param prefix
   *          The prefix to find the class by.
   * @returns
   *    If the class with the prefix is found it returns the remaining
   *    part of the class name. If the class is not found, returns null.
   *    If more than one class is found, it returns the first occurrence.
   */
  getSuffixFromClass: function(node, prefix) {
      var classes = attr.get(node, "class").split(" ");
      var namesFound = array.filter(classes, function(className) {
      return className.indexOf(prefix) == 0;
    });
    if (namesFound.length > 0) {
      return namesFound[0].split(prefix)[1];

    } else {
      return null;
    }
  },

  getCacheBusterParameter : function() {
    return this.CACHE_BUSTER_PARAM_NAME + "=" + new Date().getTime() + "_"
        + this.CACHE_BUSTER++;
  },

  /**
   * Add classes to table rows to allow striping in appearance.
   * Handles expandable and paginated lists in a specific way.
   */
  stripeTable: function(table, isExpandableList, lastVisibleRowIndex) {
    var tbody = table.tBodies[0];
    var mainRowStep = (isExpandableList ? 2 : 1);

    // for a list with one row do nothing
    if (tbody.rows.length < mainRowStep) {
      return;
    }

    var rows = tbody.rows;

    for (var i = 0; i < rows.length; i += mainRowStep) {
      curam.debug.log(
          "curam.util.stripeTable(%s, %s): i = %s", table, isExpandableList, i);

      // collect rows to change (to include details row in expandable lists)
      var rowsToChange = [ rows[i] ];
      // checking for existence of details row - if list is empty, there might
      // be just one empty row
      if (isExpandableList && rows[i + 1]) {
        rowsToChange.push(rows[i + 1]);
      }

      // remove classes before adding the right ones
        array.forEach(rowsToChange, function(row) {
          domClass.remove(row, "odd-last-row");
          domClass.remove(row, "even-last-row");
      });

      if (i % (2 * mainRowStep) == 0) {
          array.forEach(rowsToChange, function(row) {
          cm.replaceClass(row, 'odd', 'even');
        });

        if (i == lastVisibleRowIndex) {
            array.forEach(rowsToChange, function(row) {
              domClass.add(row, "odd-last-row");
          });
        }

      } else {
          array.forEach(rowsToChange, function(row) {
          cm.replaceClass(row, 'even', 'odd');
        });

        if (i == lastVisibleRowIndex) {
            array.forEach(rowsToChange, function(row) {
              domClass.add(row, "even-last-row");
          });
        }
      }
    }
  },

  fillString: function(fillChar, count) {
    // summary:
    //  Creates a string of 'x' repeating characters
    var string = "";
    while (count > 0) {
      string += fillChar;
      count-=1;
    }
    return string;
 },

  updateHeader: function(qId, newHeader, answer, source) {
      var header = dom.byId('header_' + qId);
    header.firstChild.nextSibling.innerHTML = newHeader;
      answerCell = dom.byId('chosenAnswer_' + qId);
    answerCell.innerHTML = answer;
      sourceCell = dom.byId('chosenSource_' + qId);
    sourceCell.innerHTML = source;
  },
 
  search: function(textWidgetID, typeWidgetID){
     // summary:
     //              Invokes the required search page for an application search as
     //              specified by the associated configuration data. How this
     //              is done is described below:
     //
     // description:
     //              <ol>
     //                <li>
     //                  Retrieving the value of the business object select drop
     //                  down. This value includes a business object code and
     //                  also a page identifier.
     //                </li>
     //                <li>
     //                  Retrieving the value of the input text control which
     //                  specifies the search text to be used.
     //                </li>
     //                <li>
     //                  If the drop list of business objects has been
     //                  specified in the associated configuration data, the
     //                  page identifier specified by the selected option will
     //                  be used to construct a URL using the
     //                  <code>searchText</code> and <code>searchType</code>
     //                  page parameters and that page is invoked.
     //                </li>
     //                <li>
     //                  If the drop list of business objects has not been
     //                  specified in the associated configuration data, the
     //                  default search page specified will be used to construct
     //                  a URL using the <code>searchText</code> page parameter
     //                  only and then that page is invoked.
     //                </li>
     //              </ol>
     //              <P>
     //              The data used here is generated by a renderer so therefore
     //              no validations are performed and it is assumed that the
     //              data is in the correct format for parsing.
     // textWidgetID:
     //              The identifier of the text input control for the application
     //              search which is used to retrieve the text to be used in the
     //              application search. The value taken from this field is
     //              associated with the <code>searchText</code> page parameter
     //              of the search page being invoked.
     // typeWidgetID:
     //              The identifier of the drop down control for the application
     //              search which is used to retrieve the business object type
     //              to be used in the application search. The value taken from
     //              this field is associated with the <code>searchType</code>
     //              page parameter of the search page being invoked. Note that
     //              this is optional as the list of business objects to search
     //              for is an optional element of an application search.
 
    // TODO: Move this function into the application view JavaScript file when
    // it becomes available -- FG.
 
    // Retrieve the search text from the input control.
      var searchText = registry.byId(textWidgetID).get("value");
    // The search type, if specified, from the drop down list of business
    // objects. This is a combination of the type and the page identifier
    // so split these out here.
      var searchTypeWidget = registry.byId(typeWidgetID);
    var currentlySelectedItem
          = searchTypeWidget ? searchTypeWidget.get("value"): null;
    var searchType = "";
    var pageIDFromSearchOptions;
    var tokens;
 
    if(currentlySelectedItem){
      // The currently selected item consists of the search type and the page
      // identifier to use in the search.
      tokens = currentlySelectedItem.split("|");
      searchType = tokens[0];
      pageIDFromSearchOptions = tokens[1];
    }
 
    var defaultSearchPageID = curam.util.defaultSearchPageID;
 
    // If the select box has not been specified, then the page identifier is
    // the default page identifier. Construct the page to be invoked.
    var searchPageURL = "";
    if (searchType==="") {
      searchPageURL = defaultSearchPageID + "Page.do?searchText="
                                              + encodeURIComponent(searchText);
    } else {
      searchPageURL = pageIDFromSearchOptions + "Page.do?searchText="
                          + encodeURIComponent(searchText) + "&searchType="
                            + encodeURIComponent(searchType);
    }
    // Call the function that will load the search page.
    var searchPageRequest = new curam.ui.PageRequest(searchPageURL);
    require(["curam/tab"], function() {
      curam.tab.getTabController().handlePageRequest(searchPageRequest);
    });
  },
 
  updateDefaultSearchText: function(typeWidgetID, textWidgetID){
    // summary:
    //              Updates the search text input control in the application
    //              search widget with some initial text from the item selected
    //              in the associated list of search business objects.
    //
    // description:
    //              Retrieves the initial text from the item selected in the list
    //              of business objects drop down and sets the place holder
    //              attribute of the application search text input control with
    //              this initial text. This is called from the
    //              <code>onChange()</code> event of the application search drop
    //              down list.
    // typeWidgetID:
    //              The identifier of the drop down control for the application
    //              search which is used to retrieve the initial text that is
    //              set in the place holder attribute of the associated text
    //              input control each time the value of the drop down list
    //              is changed. This initial text acts as an aid to the user
    //              when performing the search as it offers them a hint as to
    //              what should be entered into the text area for the type of
    //              search being performed.
    // textWidgetID:
    //              The identifier of the text input control whose place
    //              holder attribute will be set with initial text to aid the
    //              user perform the search.
 
    // TODO: Move this function into the application view JavaScript file when
    // it becomes available -- FG.
 
      var searchTypeWidget = registry.byId(typeWidgetID);
      var textWidget = registry.byId(textWidgetID);
    var currentlySelectedItem
      = searchTypeWidget ? searchTypeWidget.get("value"): null;
    // The initial text is the third token in the string.
    var str = currentlySelectedItem.split("|")[2];
 
      textWidget.set("placeHolder", str);
  },
 
  updateSearchBtnState: function(textWidgetID, btnID){
    // summary:
    //              Enables or disables the search anchor for an application
    //              search depending on whether this is text specified for the
    //              search.
    //
    // description:
    //              The search anchor specified for an application search is
    //              disabled if no text has been specified in the text input
    //              control. This function is called on the
    //              <code>onKeyPress</code> of the text input control so that when
    //              a user enters some text, the search anchor is enabled to allow
    //              that user perform the search.
    // textWidgetID:
    //              The identifier of the text input control for the application
    //              search which is used to determine if that text box contains
    //              any text. If it does, then the search anchor is enabled,
    //              otherwise it is disabled.
    // btnID:
    //              The identifier of the search anchor for the application search
    //              and this is used to retrieve the control to enable or disable
    //              depending on whether there is text in the associated search
    //              text input control.
 
    // TODO: Move this function into the application view JavaScript file when
    // it becomes available -- FG.
      var widget = registry.byId(textWidgetID);
      var btn = dom.byId(btnID);
      var value = widget.get("value");
 
      if(!value || lang.trim(value).length < 1){
        domClass.add(btn, "dijitDisabled");
      } else {
        domClass.remove(btn, "dijitDisabled");
    }
  },
 
  furtherOptionsSearch: function() {
 
    // summary:
    //              Invokes the page specified for the further options link
    //              in an application search.
    //
    // description:
    //               The further options search page is invoked by retrieving
    //               the page identifier specified in the configuration
    //               data, constructing a page request for that URL and
    //               calling the function to handle that request.
    //               <P>
    //               Validations performed elsewhere should ensure that the
    //               data is specified in the correct fashion and hence there
    //               are no validations invoked here.
 
    // TODO: Move this function into the application view JavaScript file when
    // it becomes available -- FG.
 
    // Retrieve the page identifier for the further options link.
    var furtherOptionsPageURL = curam.util.furtherOptionsPageID + "Page.do";
 
    // Call the function that will load the search page.
    var furtherSearchOptionsPageRequest
        = new curam.ui.PageRequest(furtherOptionsPageURL);
    require(["curam/tab"], function() {
      curam.tab.getTabController().handlePageRequest(
          furtherSearchOptionsPageRequest);
    });
  },
  
  searchButtonStatus: function(btnID){
    // summary:
	//              Returns true if the button is not disabled 
	//
	// description:
	//              The search anchor specified for an application search is
	//              disabled if no text has been specified in the text input
	//              control. This function is called on the
	//              <code>onKeyPress</code> of the text input control if this function returns true.
	// btnID:
	//              The identifier of the search anchor for the application search
	//              and this is used to retrieve the control to enable or disabled
	var btn = dojo.byId(btnID);
	if(!dojo.hasClass(btn,"dijitDisabled")){
	  return true;
	}
  }, 
 
  /**
  * Return the height of the page contents for the current width.
  * Note that if the width changes, the contents height might change as well.
  *
  * Note: this algorithm is dependent on the structure of the
  * DOM. Changes to the page layout will probably break this.
  *
  * @return page height.
  */
  getPageHeight: function() {
    var defaultHeight = 400;
    var resultingHeight = 0;
 
      if (query("frameset").length > 0) {
      /* Detect framesets and use default height for them.
      * Normally frameset windows should have fixed height specified
      * by the developer, but this is for the cases in which the developer
      * forgets to specify the height.
      */
      curam.debug.log(
        "curam.util.getPageHeight() " 
          + bundle.getProperty("curam.util.default.height"),
      defaultHeight);
      resultingHeight = defaultHeight;
 
    } else {
      // create function for determinning bottom coordinate of an element
      var bottom = function(node) {
        if (!node) {
          curam.debug.log(bundle.getProperty("curam.util.node"));
          return 0;
        }
 
        // Use getMarginBoxSimple if it's available
          var mb = geom.getMarginSize(node);
          var pos = geom.position(node);
 
        return pos.y + mb.h;
      };
 
        if (dojo.global.jsScreenContext.hasContextBits('LIST_ROW_INLINE_PAGE')) {
        // in case we are in list details row, just use the bottom spacer div
          var bottomSpacerDiv = query("div.bottom")[0];
        var divBottom = bottom(bottomSpacerDiv);
 
        curam.debug.log(
          bundle.getProperty("curam.util.page.height"), divBottom);
        curam.debug.log(bundle.getProperty("curam.util.ie7.issue"));
        resultingHeight = divBottom + 1;
 
      } else {
          var contentObj = dom.byId("content") || dom.byId("wizard-content");
 
        // find the bottom-most node
          var nodes = query("> *", contentObj).filter(function(n) {
          // leave out script and hidden nodes
          return n.tagName.indexOf("SCRIPT") < 0
            && style.get(n, "visibility") != "hidden"
            && style.get(n, "display") != "none";
        });
        var bottomNode = nodes[0];
        for (var i = 1; i < nodes.length; i++) {
          if(bottom(nodes[i]) >= bottom(bottomNode)) {
            bottomNode = nodes[i];
          }
        }
 
        // first count in the main contents height
        resultingHeight = bottom(bottomNode);
        curam.debug.log("curam.util.getPageHeight() " 
            + bundle.getProperty("curam.util.base.height"), resultingHeight);
 
        // count in modal dialog action set, if present
        var doesActionSetExist = query(".actions-panel", windowBase.body());
        
        if (doesActionSetExist.length > 0) {
          // Only one actions panel exists in one modal, we can get the height
          // of this panel dynamically.
          var actionsPanelHeight = geom.getMarginBox(doesActionSetExist[0]).h;

          curam.debug.log("curam.util.getPageHeight() " 
              + bundle.getProperty("curam.util.panel.height"));
            
          // Add the actions panel height to the total page height, here we
          // presume the actions panel is always positioned at the bottom of
          // the page.
          resultingHeight += actionsPanelHeight;
            
          // Then add additional 10px spacing at the top of the actions panel.
          resultingHeight += 10;
        }
 
        // in case we are in the details panel, count in the title bar height
          var detailsPanel = query("body.details");
        if (detailsPanel.length > 0) {
          curam.debug.log("curam.util.getPageHeight() " 
              + bundle.getProperty("curam.util.bar.height"));
            resultingHeight += 20;
        }
      }
    }
 
      curam.debug.log("curam.util.getPageHeight() " 
          + bundle.getProperty("curam.util.returning"), resultingHeight);
    return resultingHeight;
  },
 
  /**
  * Takes an array and from its elements it creates a comma separated
  * string of values, which is then returned.
  */
  toCommaSeparatedList: function(inputArray) {
    var result = "";
    for (var i = 0; i < inputArray.length; i++) {
      result += inputArray[i];
      if (i < inputArray.length -1) {
        result += ",";
      }
    }
    return result;
  },
 
  /**
   * Bring focus to skip link destination placeholder.
   */
  skipLinkFocus: function() {
    var dest = dojo.byId('skip-dest');
    if (dest) {
      dest.focus();
    }
  },
  
  /**
   * TEC-17091. Skiplink should become visible when focused (i.e. a user tabs on it)
   * and it should be visible only when it has focus, so it should hide again when 
   * the user tabs off it.
   */
  showHideSkipLink: function(e) {
    var skipLink = dojo.byId("skipLink");
    if (skipLink) {
      var skipLinkDiv = skipLink.parentNode;
      if (e.type == "focus" && domClass.contains(skipLinkDiv, "hidden")) {
        domClass.remove(skipLinkDiv, "hidden");
      } else if (e.type == "blur" && !domClass.contains(skipLinkDiv, "hidden")) {
        domClass.add(skipLinkDiv, "hidden");
      }
    }
  },
  
  /**
  * Registers a handler for submitting a form when Enter key is pressed.
  *
  * Called from the PageTag - will be called on every page in any context,
  * main content, dialog, etc.
  */
  setupGenericKeyHandler: function() {
      ready(function() {
      // The handler is never explicitly deregistered - disappears when
      // the runtime context is destroyed (new page loaded)
      var f = function(event) {
        
        // On ESC key handling: When ESC key is pressed and in a modal, 
        // the modal will close automatically.
        if (dojo.global.jsScreenContext.hasContextBits('MODAL')
            && event.keyCode == 27) {
          var ev = dojoEvent.fix(event);
          var dropdown = registry.byId(ev.target.id);
          var isDropdown =
            typeof dropdown != "undefined" && dropdown.baseClass == "dijitTextBox dijitComboBox";
          if (!isDropdown) {
            curam.dialog.closeModalDialog();
          }      
        }
        
        // On ENTER key handle the event
        if (event.keyCode == 13) {
            var ev = dojoEvent.fix(event);

        // only submit form when certain input fields have focus. This allows
        // for normal keyboard selection (example: pressing enter on date
        // selector icon) to happen without the form submitting.
 
    var isText = ev.target.type == "text";
    var isRadio = ev.target.type == "radio";
    var isCheckbox = ev.target.type == "checkbox";
    var isMultiSelect = ev.target.type == "select-multiple";
    var isPassword = ev.target.type == "password";
 
    var combo = registry.byId(ev.target.id);
    // Added a check so that form is not submitted when "Enter" key
    // is pressend in open state of dropdown.
    if (typeof combo != "undefined") {
      var comboWidget = registry.byNode(dojo.byId("widget_" + ev.target.id));
      if(comboWidget && comboWidget.enterKeyOnOpenDropDown) {
        comboWidget.enterKeyOnOpenDropDown = false;
        return false;
      }
    }
    
    var isCombo =
    typeof combo != "undefined" && combo.baseClass == "dijitComboBox";
    if ((!isText && !isRadio && !isCheckbox && !isMultiSelect
    && !isPassword) || isCombo ) {
      return true;
    }
    var defaultSubmitButton = null;
      var explicitDefaultBtnArray = query(".curam-default-action");
    // take the default button if set
    if (explicitDefaultBtnArray.length > 0) {
      defaultSubmitButton = explicitDefaultBtnArray[0];
 
    } else {
      // otherwise take the first found submit button
        var submitButtonsArr = query("input[type='submit']");
      if (submitButtonsArr.length > 0) {
        defaultSubmitButton = submitButtonsArr[0];
      }
    }
    // now click the button found
    if (defaultSubmitButton != null) {
        dojoEvent.stop(dojoEvent.fix(event));
      curam.util.clickButton(defaultSubmitButton);
      return false;
    }
	//Focus remains in the date selector on ENTER
    dojo.require("curam.dateSelectorUtil");
    var isInputyear = dojo.byId("year");
    if (isInputyear) {
      dojo.stopEvent(dojo.fixEvent(event));
      
      //Enter key updates the calendar
      curam.dateSelectorUtil.updateCalendar();
     }
        }
 
        // otherwise let the event continue
        return true;
      };
 
        // event must be onKeyUp, as the ESC key event is not fired during an
        // onKeyPress event.
        curam.util.connect(windowBase.body(), "onkeyup", f);
    });
  },
 
  /**
  * Returns true is key press event is triggered by the enter key.
  * Used by context panel toggle icon and list/cluster toggle icons.
  */  
  enterKeyPress: function(event) { 
    if(event.keyCode == 13) {
      return true;
    }
  },
  
  /**
   * Catches SHIFT + TAB keyboard event on modal help and close icon.
   * When tabbing backward, once visible button is encountered in the 
   * modal title bar the focus is looped back to the last button in 
   * the modal button bar.
   */  
   isShiftTab: function(e) { 
     if(e.shiftKey && e.keyCode == 9) {
       var elem, evt = e ? e:event;
       if (evt.srcElement) {
         elem = evt.srcElement;
       } else if (evt.target){
         elem = evt.target;
       }
       
       if (elem.previousSibling.className == "dijitDialogHelpIcon") {
         return false;
       } else {
         var modalId = elem.parentElement.parentElement.id;
         var endModal = dojo.byId("end-" + modalId);
         if (endModal) {
           endModal.focus();
         }
       }
     }
   },
 
   /**
    * When using tab navigation focus should come of help icon of title bar after the end of modal.
    * This is called from a keydown event on end of modal and sets the focus on help icon of title bar.
    */
   focusHelpIconOnTab: function(e) { 
     if(!e.shiftKey && e.keyCode == 9) {
       var helpIcon = dojo.query(".dijitDialogHelpIcon")[0];
       if (helpIcon) {
         setTimeout(function() { helpIcon.focus(); }, 5);
       }
     }
   },
   
  /**
  * Given a DOM node, boolean state and class names for true and false
  * alternatives, the function sets the appropriate classes on the node.
  */
  swapState: function(node, state, classTrue, classFalse) {
    if (state) {
        domClass.replace(node, classTrue, classFalse);
 
    } else {
        domClass.replace(node, classFalse, classTrue);
    }
  },
 
  /**
  * Creates a URL query string including the leading question mark
  * from the specified page parameters.
  * The function handles URL-encoding of the values so do NOT encode them.
  *
  * @param params Object in the following format:
  *                { param1Name:"value", param2Name:248 }
  */
  makeQueryString: function(params) {
    if (!params || params.length == 0) {
      return "";
    }
 
    var result = [];
    for (var paramName in params) {
      result.push(paramName + "=" + encodeURIComponent(params[paramName]));
    }
 
    return "?" + result.join("&");
  },
 
  /**
  * Handles the onClick event for the list action menu items.
  *
  * @param url
  *          The URL of the required page.
  * @param sameDialog
  *          True if we re in a dialog and the page flow should stay
  *          in the same dialog.
  */
    clickHandlerForListActionMenu: function(url, sameDialog, newWindow, event) {
    // TODO: This handler was intended only for the list row actions menu but
    // is now being used for page level actions menus also, so re-name
    // appropriately. Also, *some* of the code in this method is duplicated
    // in the "clickHandler" method of UIMPageAdaptor.js. AS LONG AS THESE
    // METHODS ARE SEPARATE, ANY UPDATES TO THE LOGIC BELOW MUST BE ANALYZED
    // TO SEE IF THEY NEED TO BE APPLIED IN THE "UIMPageAdaptor" CLASS.
    if (sameDialog) {
      var href = curam.util.replaceUrlParam(url, "o3frame", "modal");
        var ctx = dojo.global.jsScreenContext;
      ctx.addContextBits('MODAL');
      href = curam.util.replaceUrlParam(href, "o3ctx", ctx.getValue());
      curam.util.redirectWindow(href);
      return;
    }
 
    // create a dummy anchor object
    var anchor = { href: url };
 
        require(["curam/ui/UIMPageAdaptor"]);
    if (curam.ui.UIMPageAdaptor.allowLinkToContinue(anchor)) {
      // In the case of a list action menu the click event is no longer coming
      // from an anchor element, instead it's a Diji MenuItem. Explicitly
      // setting window.location fakes the same behaviour as clicking the anchor
      // element. This will handle the sceanrios tested by allowLinkToContinue,
      // which are file downloads and the mailto link.
      // TODO: Can this method just return and let the event continue without
      // setting window.location....??? Seems to be other event handers
      // supressing this, so going with this approach for now.
        dojo.global.location = url;
      return;
    }
 
    // if we have an anchor, stop the click event and perform standard tab
    // processing (i.e. should it open in a new tab etc.)
    if (anchor != null) {
        if (event) {
          dojoEvent.fix(event);
          dojoEvent.stop(event);
      }
 
      if (!anchor.href || anchor.href.length == 0) {
        // the event has been stopped, just return if it has no href.
        // any onclick handlers attached to the link will have executed by now.
        return;
      }
      if (newWindow && !curam.util.isInternal(url)) {
          dojo.global.open(url);
 
      } else if (curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(anchor)) {
        var uimPageRequest = new curam.ui.PageRequest(anchor.href);
        if (dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")
          || dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")) {
          uimPageRequest.pageHolder = dojo.global;
        }
        require(["curam/tab"], function() {
          curam.tab.getTabController().handlePageRequest(uimPageRequest);
        });
      }
    }
    // Otherwise we let the event continue uninterrupted.
  },
 
  /**
     * Gets browser to action a mailto: link in a separate iframe.
     * This is to avoid issues with page unloading when mailto link is clicked
     * on some browsers.
     * 
     * @param event The onclick DOM event.
     * @param url The URL of the link, including the mailto: protocol.
     */
    clickHandlerForMailtoLinks: function(event, url) {
      // stop anchor click from propagating and changing page
      dojo.stopEvent(event);

      // is there existing iframe to reuse?
      var iframe = dojo.query("#mailto_frame")[0];
      if (!iframe) {
        // no frame to reuse - create a new one
        iframe = dojo.io.iframe.create("mailto_frame", "");
      }
      
      // get browser to action the mailto: link in separate frame
      iframe.src = url;
      
      // return false as per convention for DOM click handlers
      return false;
    },
   
    /**
  * Decides whether or not the URL is internal.
  *
  * @param {String} url
  *            URL to extract data from.
  *
  * @returns true if the URL is internal false it it is external.
  */
  isInternal: function(url) {
    var path = url.split("?")[0];
    // Occurrence of Page.do determines whether or not it is internal URL.
    // It is assumed that, the external URL's would not have Page.do as it
    // fixed internal action call for curam.
    // TODO : Determining the URL is internal based on Page.do is a
    // brittle solution.Implement the improved solution.
    var occurrence = path.match("Page.do");
    if (occurrence!= null) {
      return true;
    }
    return false;
  },
 
  /**
  * Takes a URL and extracts its last path segment with the query string.
  *
  * @param {String} url
  *            URL to extract data from.
  *
  * @returns The last path segment of the URL with the query string,
  *      if it is part of the URL.
  */
  getLastPathSegmentWithQueryString: function(url) {
    var pathAndParams = url.split("?");
    var pathComponents = pathAndParams[0].split("/");
    return pathComponents[pathComponents.length - 1]
    + (pathAndParams[1] ? "?" + pathAndParams[1] : "");
  },
 
  /**
  * Replaces standard submit buttons with anchor tags when no images are used.
  * @param {String} buttonText
  *            The text to be displayed on submit button.
  */
  replaceSubmitButton: function(name, buttonText) {
    if(curam.replacedButtons[name] == "true") {
      return;
    }
 
    /*
    * In the agenda player search for input elements where the name attribute
    * ends with SUM. This is required because an extra string of SUM is
    * appended onto the end of the name attribute value in the agenda player.
    * For all other submit buttons in the application we'll search for the
    * input fields the normal way to ensure we're not breaking any older
    * functionality.
    */
    var buttonId = '__o3btn.' + name;
    var inputList;
      if (dojo.global.jsScreenContext.hasContextBits('AGENDA')) {
        inputList = query("input[id='" + buttonId + "']");
 
    } else {
        inputList = query("input[name='" + buttonId + "']");
    }
 
    /*
    * You can supply 3 parameters to the forEach method of the dojo node list.
    * The current node, the index, and the node list itself.
    */
    inputList.forEach(function(replacedButton, index, theButtons) {
    	// if there is a paramter passed in for button text then set the 'value'
        // of the second button (the button dipalyed to user) node to the button
        // text specified.
        // Note: This will replace any value set in the value attribute already!
        if (buttonText) {
          var buttonDisplayed = theButtons[1];
          buttonDisplayed.setAttribute("value",buttonText);
        }
      replacedButton.tabIndex = -1;
      var parentSpan = replacedButton.parentNode;
 
      var buttonId = "btn-id-" + index;
      curam.util.setupWidgetLoadMask("a." + buttonId);
      
      var cssClass = 'ac initially-hidden-widget ' + buttonId;
      if(domClass.contains(replacedButton, "first-action-control")) {
        cssClass += ' first-action-control';
      }
      
      var newLink = domConstruct.create("a", {
        "class": cssClass,
        href: "#"
      }, replacedButton, "before");
 
      var pageLevelMenu = dojo.query(".page-level-menu")[0];
      if(pageLevelMenu) {
    	  dojo.attr(newLink,"title",replacedButton.value);
      }
      
      /*
      * Adding filler span to create spacing between buttons. This is needed
      * because if spacing is added to anchor element using CSS, the spacing is
      * still clickable in IE.
      */
        domConstruct.create("span", {
        "class": "filler"
      }, newLink, "before");
 
      // Adding span elements inside anchor tag to display rounded corners.
        var left = domConstruct.create("span", {
        "class": "left-corner"
      }, newLink);
 
        var right = domConstruct.create("span", {
        "class": "right-corner"
      }, left);
 
      // Changed from using inner HTML.
        var middle = domConstruct.create("span", {
        "class": "middle"}, right );
 
        middle.appendChild(document.createTextNode(replacedButton.value));
 
        curam.util.addActionControlClass(newLink);
 
          on(newLink, "click", function(event) {
          curam.util.clickButton(this._submitButton);
            dojoEvent.stop(event);
        });
 
        /*
        * Record the submit button on the link. This is for modal dialogs, so it
        * can distinguish a submit anchor tag from a normal anchor tag.
        *
        * NB: We have a temporary situation where we have 3 page-level-action
        * sets. 2 actions sets are the existing top and bottom ones, but they are
        * currently hidden. The third is the new button bar at the bottom of the
        * page. This is outside of the HTML form which means the "_submitButton"
        * variable was being set to a button that didn't have an associated form.
        * This caused errors in our modal dialog code. The temporary solution is
            * to set all _submitButtons to the first button found (theButtons[0])
            * which is guaranteed to be inside the form. The real solution
            * is to re-do the new button bar work so it is within the form.
        */
        newLink._submitButton = theButtons[0];
 
          domClass.add(replacedButton, 'hidden-button');
    });
 
    curam.replacedButtons[name] = "true";
  },
 
  /**
  * Adds a listener that will display the widget specified by query.
  *
  *  @param query
  *      Query of the widget to setup load mask for.
  */
    setupWidgetLoadMask: function(queryString) {
    curam.util.subscribe('/curam/page/loaded', function() {
        var widget = query(queryString)[0];
      if (widget) {
          style.set(widget, 'visibility', 'visible');
 
      } else {
        curam.debug.log("setupButtonLoadMask: " 
          + bundle.getProperty("curam.util.not.found") + "'" + queryString
         + "'" + bundle.getProperty("curam.util.ignore.mask"));
      }
    });
  },
 
  /**
  * Optionaly replaces standard submit buttons within agenda player.
  */
  optReplaceSubmitButton: function(name) {
    if (curam.util.getFrameRoot(dojo.global,"wizard") == null) {
      curam.util.replaceSubmitButton(name);
      return;
    }
    var navigator = curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
    if (navigator.delegatesSubmit[jsPageID] != 'assumed') {
      curam.util.replaceSubmitButton(name);
    }
  },
 
  /**
  * Clicks a HTML button.
  *
  * @param buttonObj the button object or the id of the button object.
  */
  clickButton: function(buttonObj) {
      var theForm = dom.byId("mainForm");
    var hiddenButton;
 
    // if we have no argument, then return
    if (!buttonObj) {
      curam.debug.log("curam.util.clickButton: " 
        + bundle.getProperty("curam.util..no.arg"));
      return;
    }
 
    // if the argument is a string, then we assume it is the id of the
    // input element and search for it.
    if (typeof(buttonObj) == "string") {
      var buttonObjID = buttonObj;
      curam.debug.log("curam.util.clickButton: " 
        + bundle.getProperty("curam.util.searching")
        + bundle.getProperty("curam.util.id.of") + "'" + buttonObjID + "'.");
        buttonObj = query("input[id='"  + buttonObjID + "']")[0];
 
      // if we still have not found the input element, the return
      if (!buttonObj.form && !buttonObj.id) {
        curam.debug.log("curam.util.clickButton: " 
            + bundle.getProperty("curam.util.searched")
            + bundle.getProperty("curam.util.id.of") + "'" + buttonObjID 
            + bundle.getProperty("curam.util.exiting"));
        return;
      }
    }
 
    // In the agenda player search for input elements where the name attribute
    // ends with SUM. This is required because an extra string of SUM is
    // appended onto the end of the name attribute value in the agenda player.
    // For all other submit buttons in the application we'll search for the
    // hidden buttons the normal way to ensure we're not breaking any older
    // functionality.
      if (dojo.global.jsScreenContext.hasContextBits('AGENDA')) {
      hiddenButton = buttonObj;
  
      } else {
        hiddenButton = query("input[name='" + buttonObj.id + "']", theForm)[0];
    }
    try {
      // if the page is being submitted to self, publish event to enable
      // code to be run before refresh - used for example for saving list state
      // data to be restored on the page reload
        if (attr.get(theForm, "action").indexOf(jsPageID) == 0) {
        curam.util.publishRefreshEvent();
      }
      hiddenButton.click();
  
    } catch(e) {
      curam.debug.log(bundle.getProperty("curam.util.exception.clicking"));
    }
  },
 
  /**
  * Handles click event on the page level print button.
  * Invokes the windows print function to print the context panel
  * and main content area.
  *
  * @param event the click event object.
  *
  */
  printPage:function(event) {
    
    dojoEvent.stop(event);
    
    var mainAreaWindow = dojo.window.get(event.currentTarget.ownerDocument);
    var mainAreaIframeNode = mainAreaWindow.frameElement;
    
    var searchNode = mainAreaIframeNode;
    
    // find the tab conent holder div which holds each tab.
    while(searchNode 
                    && !dojo.hasClass(searchNode, "tab-content-holder")){
            searchNode = searchNode.parentNode;
    }
    
    var tabContentHolderNode = searchNode;
    
    var contextPanel = dojo.query(".detailsPanelFrame", tabContentHolderNode)[0];
    
    if (contextPanel != undefined && contextPanel != null) {
      contextPanel.contentWindow.focus();
      contextPanel.contentWindow.print();
    }
    
    mainAreaWindow.focus();
    mainAreaWindow.print();
    
    return false;

  },
 
  /**
  * Handles onmousedown event on the page toolbar buttons.
  * Adds a class name of selected to allow for CSS selected effect.
  *
  * @param event the click event object.
  *
  */
  addSelectedClass:function(event) {
      domClass.add(event.target,"selected");
  },
 
  /**
  * Handles onmouseup event on the page toolbar buttons.
  * Removes class name of selected..
  *
  * @param event the click event object.
  *
  */
  removeSelectedClass:function(event) {
      domClass.remove(event.target,"selected");
  },
 
  /**
  * Opens up the page level help page in new window.
  *
  * @param event the mouse click event.
  * @param event the help tag.
  *
  */
  openHelpPage: function(event, helpUrl){
      dojoEvent.stop(event);
    //opens up the constructed URL in new window.
      dojo.global.open(helpUrl);
  },
 
  /**
  * Connects the handler to the specified event on the specified object
  * and ensures it is disconnected when the page is unloaded.
  *
  * @param object
  *    The object to connect to.
  * @param eventName
  *    Name of the event to connect to.
  * @param handler
  *    The handler for the event.
  *
  * @return The disconnect token to be used with curam.util.disconnect()
  *    function.
  */
  connect: function(object, eventName, handler) {
    // wrap in another function to allow fixing event before passsing
    // to the handler
    var h = function(event) {
        handler(dojoEvent.fix(event));
    };

      if (has("ie") && has("ie") < 9) {
      object.attachEvent(eventName, h);
 
        unload.addOnWindowUnload(function() {
        object.detachEvent(eventName, h);
      });
 
      return { object: object, eventName: eventName, handler: h };
 
    } else {
        // The dojo/on API takes event names without the "on" prefix.
        var eventNameWithoutOn = eventName;
        if (eventName.indexOf("on") == 0) {
          eventNameWithoutOn = eventName.slice(2);
        }
        var dt = on(object, eventNameWithoutOn, h);
   
        unload.addOnWindowUnload(function() {
          dt.remove();
      });
 
      return dt;
    }
  },
 
  disconnect: function(token) {
      if (has("ie") && has("ie") < 9) {
      token.object.detachEvent(token.eventName, token.handler);
      } else {
        token.remove();
    }
  },
 
  /**
  * Subscribes the handler to the specified topic in the current runtime
  * context and ensures it is unsubscribed when the page is unloaded.
  *
  * @param topicName
  *    Name of the topic to subscribe to.
  * @param handler
  *    The handler for the topic.
  */
  subscribe: function(topicName, handler) {
      var st = topic.subscribe(topicName, handler);
      unload.addOnWindowUnload(function() {
        st.remove();
    });
 
    return st;
  },
 
  unsubscribe: function(token) {
      token.remove();
  },
 
  /**
  * Retrieves all action controls in action set.
  *
  * @param panelId
  *   ID of action set element.
  */
  addActionControlClickListener:function(panelId){
      var actionsPanel = dom.byId(panelId);
      var actionControlList = query(".ac", actionsPanel);
    if (actionControlList.length > 0) {
      for(var i = 0; i < actionControlList.length; i++) {
        var acNode = actionControlList[i];
        curam.util.addActionControlClass(acNode);
      }
    }
  },
 
  /**
  * Adds a CSS class names to modal buttons that have been clicked.
  * This allows specific styling to be applied when buttons in a selected
  * state.
  *
  * @param acNode
  *    Modal action button node
  */
  addActionControlClass:function(acNode){
    curam.util.connect(acNode, "onmousedown",function(){
        domClass.add(acNode, "selected-button");
      curam.util.connect(acNode, "onmouseout",function(){
          domClass.remove(acNode, "selected-button");
      });
    });
  },
 
  /**
  * Gets all cluster level action sets contained in the content panel.
  *
  */
  getClusterActionSet:function(){
      var contentNode = dom.byId("content");
      var clusterActionSets = query(".blue-action-set", contentNode);
    if (clusterActionSets.length > 0){
      for (var i=0; i<clusterActionSets.length; i++) {
        curam.util.addActionControlClickListener(clusterActionSets[i]);
      }
    }
  },
 
  /**
  * Adjust Button spacing, if needed, to prevent them overlapping
  */
  adjustActionButtonWidth:function() {
      if (has("ie") == 8) {
        ready(function() {
          if (dojo.global.jsScreenContext.hasContextBits('MODAL')) {
            query(".action-set > a").forEach(function(node) {
            if(node.childNodes[0].offsetWidth > node.offsetWidth) {
                style.set(node, "width", node.childNodes[0].offsetWidth + "px");
                style.set(node, "display", "block");
                style.set(node, "display", "inline-block");
            }
          });
        }
      });
    }
  },
 
  /**
  * Sets the '__o3rpu' parameter for the URL. This parameter is an enocoded
  * value and holds the requesting URL and its parameters. This function may add
  * additonal parameters to the requesting URL prior to encoding it.
  *
  * @param {String} url
  *     The requested URL
  * @param {curam.util.RuntimeContext} rtc
  *     RunTimeContext Object - provides access to Window object.
  * @param {Array} [extraParaArray]
  *     An optional array of extra parametes to be added to the requesting URL.
  *     The expected array structure is
  *     [{key:"x1",value:"y1"},{key:"x2",value:"y2"},...]
  * @return The requested URL with the '__o3rpu' parameter appended.
  */
  setRpu:function(url, rtc, /*optional*/ extraParaArray){
    //Throw exception if null/blank values passed in
    if(!url||!rtc||!rtc.getHref()){
      throw {
        name:"Unexpected values",
        message:"This value not allowed for url or rtc"
      };
    }
 
    var o3rpuValue = curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
 
    // strip the __o3rpu parameter from the RPU value
    o3rpuValue = curam.util.removeUrlParam(o3rpuValue, curam.util.Constants.RETURN_PAGE_PARAM);
 
    //Check for extra parameters passed in as {key:"",value:""} format
    if(extraParaArray){
      var i;
      for(i = 0; i < extraParaArray.length; i++) {
        if(!extraParaArray[i].key||!extraParaArray[i].value){
          throw {
            name:"undefined value error",
            message:"The object did not contain a valid key/value pair"
          };
        }
        o3rpuValue = curam.util.replaceUrlParam(o3rpuValue,
        extraParaArray[i].key, extraParaArray[i].value);
      }
    }
    var returnUrl = curam.util.replaceUrlParam(url, curam.util.Constants.RETURN_PAGE_PARAM, encodeURIComponent(o3rpuValue));
    curam.debug.log("curam.util.setRpu " 
      + bundle.getProperty("curam.util.added.rpu") + returnUrl);
    return returnUrl;
    },

    /**
     * Retrieves the base URL from the location.href property associated with 
     * the current DOM Window object.
     * <p>
     * The base URL is the contents of the URL up as far, and including, the
     * application name.
     * <p>
     * For example, if the value of location.href was 
     * "http://philippa:9080/TabTest/AppController.do" then the value returned
     * would be "http://philippa:9080/TabTest"
     * 
     * @return the base URL or null if the URL cannot be retrieved.
     *
     */
    retrieveBaseURL: function() {
      //The regular expression will match a path of the form 
      //[protocol]://[domain]/[name]. Where [protocol] can be any character
      //e.g. http. Where [domain] can be any character except for 
      //the forward slash character e.g. www.curamsoftware.com. Where [name] can 
      //be any character except for the forward slash character e.g. Curam.
      return dojo.global.location.href.match(".*://[^/]*/[^/]*");
    },
    
    removeRoleRegion:function(){
      var body = dojo.query("body")[0];
      dojo.removeAttr(body, "role");
    },
    
    /*
     * Function for iframe title fall back.
     * If PAGE_TITLE isn't specified in the UIM, this function takes care
     * of falling back to the navigation tab title or the application tab.
     */
    iframeTitleFallBack: function(){
      var currentiframe = curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
      
      var iframe = dojo.byId(curam.tab.getContentPanelIframe());       
      var pageTitle = iframe.contentWindow.document.title;
      
      var currentAppTab = dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
      var currentAppTabName = dojo.query("span.tabLabel", currentAppTab)[0];
      
      var currentNavTab = dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked", currentiframe.domNode)[0];
      var currentNavTabName = dojo.query("span.tabLabel", currentNavTab)[0];
      
      if(pageTitle && pageTitle!=null){
        return pageTitle;
      } else if (currentNavTab){
          return currentNavTabName.innerHTML;
      } else {
          return currentAppTabName.innerHTML;
      }
    },
    
    /**
     * Function to add a specific class to the last visible node (cluster, list
     * or action set) in the page content area. It only works specifically in
     * the external application.
     * 
     * @return There's no return value of this function.
     */
    addClassToLastNodeInContentArea: function() {
      var divNodes = query("> div", "content");
      var divNodesCount = divNodes.length;
      
      if (divNodesCount == 0) {
        return "No need to add";
      }
      
      var lastNode = divNodes[--divNodesCount];
      
      while (domClass.contains(lastNode, "hidden-action-set") && lastNode) {
        lastNode = divNodes[--divNodesCount];
      }
      
      domClass.add(lastNode, "last-node");
      
    },
    
    /*
     * Function to check Highcontrast mode
     * If High contrast mode is turned on the method checks the class name 
     * high-contrast on body element.
     */
    highContrastModeType: function(){      
      var highContrastMode = dojo.query("body.high-contrast")[0];
      return highContrastMode;
    },	
		  
	processBidiContextual: function (target){
		target.dir = bidi.prototype._checkContextual(target.value);			
	},
	
	getCookie: function(name) {
	    var dc=document.cookie;
	    var prefix=name+"=";
	    var begin=dc.indexOf("; "+prefix);
	    if(begin==-1) {
	      begin=dc.indexOf(prefix);
	      if(begin!=0)
	        return null;
	    } else {
	      begin+=2;
	    }
	    var end=document.cookie.indexOf(";",begin);
	    if(end==-1) {
	      end=dc.length;
	    }
	    return unescape(dc.substring(begin+prefix.length,end));
    }
  });

  return curam.util;
});

},
'dojo/store/Memory':function(){
define("dojo/store/Memory", ["../_base/declare", "./util/QueryResults", "./util/SimpleQueryEngine"], function(declare, QueryResults, SimpleQueryEngine) {
  //  module:
  //    dojo/store/Memory
  //  summary:
  //    The module defines an in-memory object store.


return declare("dojo.store.Memory", null, {
	// summary:
	//		This is a basic in-memory object store. It implements dojo.store.api.Store.
	constructor: function(/*dojo.store.Memory*/ options){
		// summary:
		//		Creates a memory object store.
		// options:
		//		This provides any configuration information that will be mixed into the store.
		// 		This should generally include the data property to provide the starting set of data.
		for(var i in options){
			this[i] = options[i];
		}
		this.setData(this.data || []);
	},
	// data: Array
	//		The array of all the objects in the memory store
	data:null,

	// idProperty: String
	//		Indicates the property to use as the identity property. The values of this
	//		property should be unique.
	idProperty: "id",

	// index: Object
	//		An index of data indices into the data array by id
	index:null,

	// queryEngine: Function
	//		Defines the query engine to use for querying the data store
	queryEngine: SimpleQueryEngine,
	get: function(id){
		//	summary:
		//		Retrieves an object by its identity
		//	id: Number
		//		The identity to use to lookup the object
		//	returns: Object
		//		The object in the store that matches the given id.
		return this.data[this.index[id]];
	},
	getIdentity: function(object){
		// 	summary:
		//		Returns an object's identity
		// 	object: Object
		//		The object to get the identity from
		//	returns: Number
		return object[this.idProperty];
	},
	put: function(object, options){
		// 	summary:
		//		Stores an object
		// 	object: Object
		//		The object to store.
		// 	options: dojo.store.api.Store.PutDirectives??
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		//	returns: Number
		var data = this.data,
			index = this.index,
			idProperty = this.idProperty;
		var id = (options && "id" in options) ? options.id : idProperty in object ? object[idProperty] : Math.random();
		if(id in index){
			// object exists
			if(options && options.overwrite === false){
				throw new Error("Object already exists");
			}
			// replace the entry in data
			data[index[id]] = object;
		}else{
			// add the new object
			index[id] = data.push(object) - 1;
		}
		return id;
	},
	add: function(object, options){
		// 	summary:
		//		Creates an object, throws an error if the object already exists
		// 	object: Object
		//		The object to store.
		// 	options: dojo.store.api.Store.PutDirectives??
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		//	returns: Number
		(options = options || {}).overwrite = false;
		// call put with overwrite being false
		return this.put(object, options);
	},
	remove: function(id){
		// 	summary:
		//		Deletes an object by its identity
		// 	id: Number
		//		The identity to use to delete the object
		// returns: Boolean
		// 		Returns true if an object was removed, falsy (undefined) if no object matched the id
		var index = this.index;
		var data = this.data;
		if(id in index){
			data.splice(index[id], 1);
			// now we have to reindex
			this.setData(data);
			return true;
		}
	},
	query: function(query, options){
		// 	summary:
		//		Queries the store for objects.
		// 	query: Object
		//		The query to use for retrieving objects from the store.
		//	options: dojo.store.api.Store.QueryOptions?
		//		The optional arguments to apply to the resultset.
		//	returns: dojo.store.api.Store.QueryResults
		//		The results of the query, extended with iterative methods.
		//
		// 	example:
		// 		Given the following store:
		//
		// 	|	var store = new dojo.store.Memory({
		// 	|		data: [
		// 	|			{id: 1, name: "one", prime: false },
		//	|			{id: 2, name: "two", even: true, prime: true},
		//	|			{id: 3, name: "three", prime: true},
		//	|			{id: 4, name: "four", even: true, prime: false},
		//	|			{id: 5, name: "five", prime: true}
		//	|		]
		//	|	});
		//
		//	...find all items where "prime" is true:
		//
		//	|	var results = store.query({ prime: true });
		//
		//	...or find all items where "even" is true:
		//
		//	|	var results = store.query({ even: true });
		return QueryResults(this.queryEngine(query, options)(this.data));
	},
	setData: function(data){
		// 	summary:
		//		Sets the given data as the source for this store, and indexes it
		//	data: Object[]
		//		An array of objects to use as the source of data.
		if(data.items){
			// just for convenience with the data format IFRS expects
			this.idProperty = data.identifier;
			data = this.data = data.items;
		}else{
			this.data = data;
		}
		this.index = {};
		for(var i = 0, l = data.length; i < l; i++){
			this.index[data[i][this.idProperty]] = i;
		}
	}
});

});

},
'idx/oneui/form/_FocusManager':function(){
define("idx/oneui/form/_FocusManager", [
	"dijit/focus",
	"dojo/_base/window",
	"dojo/window",
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.extend	
	"dijit/registry"
], function(focus, win, winUtils, dom, domAttr, domClass, declare, lang, registry){
	focus._onTouchNode = function(/*DomNode*/ node, /*String*/ by){
		var srcNode = node;
		if(this._clearActiveWidgetsTimer){
			clearTimeout(this._clearActiveWidgetsTimer);
			delete this._clearActiveWidgetsTimer;
		}
		var newStack=[];
		try{
			while(node){
				var popupParent = domAttr.get(node, "dijitPopupParent");
				if(popupParent){
					node=registry.byId(popupParent).domNode;
				}else if(node.tagName && node.tagName.toLowerCase() == "body"){
					if(node === win.body()){
						break;
					}
					node=winUtils.get(node.ownerDocument).frameElement;
				}else{
					var id = node.getAttribute && node.getAttribute("widgetId"),
						widget = id && registry.byId(id);
					if(widget && !(by == "mouse" && widget.get("disabled"))){
						if(!widget._isValidFocusNode || widget._isValidFocusNode(srcNode)){
							newStack.unshift(id);
						}
					}
					node=node.parentNode;
				}
			}
		}catch(e){}
		this._setStack(newStack, by);
	}
	return focus;
});

},
'url:dijit/templates/Tooltip.html':"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n",
'dijit/_base/sniff':function(){
define("dijit/_base/sniff", [ "dojo/uacss" ], function(){
	// module:
	//		dijit/_base/sniff
	// summary:
	//		Back compatibility module, new code should require dojo/uacss directly instead of this module.
});

},
'dijit/layout/StackContainer':function(){
define("dijit/layout/StackContainer", [
	"dojo/_base/array", // array.forEach array.indexOf array.some
	"dojo/cookie", // cookie
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.replace
	"dojo/_base/kernel",	// kernel.isAsync
	"dojo/_base/lang",	// lang.extend
	"dojo/ready",
	"dojo/topic", // publish
	"../registry",	// registry.byId
	"../_WidgetBase",
	"./_LayoutWidget",
	"dojo/i18n!../nls/common"
], function(array, cookie, declare, domClass, kernel, lang, ready, topic,
			registry, _WidgetBase, _LayoutWidget){

/*=====
var _WidgetBase = dijit._WidgetBase;
var _LayoutWidget = dijit.layout._LayoutWidget;
var StackController = dijit.layout.StackController;
=====*/

// module:
//		dijit/layout/StackContainer
// summary:
//		A container that has multiple children, but shows only one child at a time.

// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/layout/StackController"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

// These arguments can be specified for the children of a StackContainer.
// Since any widget can be specified as a StackContainer child, mix them
// into the base widget class.  (This is a hack, but it's effective.)
lang.extend(_WidgetBase, {
	// selected: Boolean
	//		Parameter for children of `dijit.layout.StackContainer` or subclasses.
	//		Specifies that this widget should be the initially displayed pane.
	//		Note: to change the selected child use `dijit.layout.StackContainer.selectChild`
	selected: false,

	// closable: Boolean
	//		Parameter for children of `dijit.layout.StackContainer` or subclasses.
	//		True if user can close (destroy) this child, such as (for example) clicking the X on the tab.
	closable: false,

	// iconClass: String
	//		Parameter for children of `dijit.layout.StackContainer` or subclasses.
	//		CSS Class specifying icon to use in label associated with this pane.
	iconClass: "dijitNoIcon",

	// showTitle: Boolean
	//		Parameter for children of `dijit.layout.StackContainer` or subclasses.
	//		When true, display title of this widget as tab label etc., rather than just using
	//		icon specified in iconClass
	showTitle: true
});

return declare("dijit.layout.StackContainer", _LayoutWidget, {
	// summary:
	//		A container that has multiple children, but shows only
	//		one child at a time
	//
	// description:
	//		A container for widgets (ContentPanes, for example) That displays
	//		only one Widget at a time.
	//
	//		Publishes topics [widgetId]-addChild, [widgetId]-removeChild, and [widgetId]-selectChild
	//
	//		Can be base class for container, Wizard, Show, etc.

	// doLayout: Boolean
	//		If true, change the size of my currently displayed child to match my size
	doLayout: true,

	// persist: Boolean
	//		Remembers the selected child across sessions
	persist: false,

	baseClass: "dijitStackContainer",

/*=====
	// selectedChildWidget: [readonly] dijit._Widget
	//		References the currently selected child widget, if any.
	//		Adjust selected child with selectChild() method.
	selectedChildWidget: null,
=====*/

	buildRendering: function(){
		this.inherited(arguments);
		domClass.add(this.domNode, "dijitLayoutContainer");
    /* CURAM-FIX: Extend StackContainer to remove role attribute causing JAWS to announce
     * the navigation tabs and side Navigation incorrectly. This needs to be removed
     * once we update to DOJO 1.8. (http://bugs.dojotoolkit.org/changeset/29885/dojo)
     */
    // this.containerNode.setAttribute("role", "tabpanel");
    /* END CURAM-FIX */
	},

	postCreate: function(){
		this.inherited(arguments);
		this.connect(this.domNode, "onkeypress", this._onKeyPress);
	},

	startup: function(){
		if(this._started){ return; }

		var children = this.getChildren();

		// Setup each page panel to be initially hidden
		array.forEach(children, this._setupChild, this);

		// Figure out which child to initially display, defaulting to first one
		if(this.persist){
			this.selectedChildWidget = registry.byId(cookie(this.id + "_selectedChild"));
		}else{
			array.some(children, function(child){
				if(child.selected){
					this.selectedChildWidget = child;
				}
				return child.selected;
			}, this);
		}
		var selected = this.selectedChildWidget;
		if(!selected && children[0]){
			selected = this.selectedChildWidget = children[0];
			selected.selected = true;
		}

		// Publish information about myself so any StackControllers can initialize.
		// This needs to happen before this.inherited(arguments) so that for
		// TabContainer, this._contentBox doesn't include the space for the tab labels.
		topic.publish(this.id+"-startup", {children: children, selected: selected});

		// Startup each child widget, and do initial layout like setting this._contentBox,
		// then calls this.resize() which does the initial sizing on the selected child.
		this.inherited(arguments);
	},

	resize: function(){
		// Resize is called when we are first made visible (it's called from startup()
		// if we are initially visible). If this is the first time we've been made
		// visible then show our first child.
		if(!this._hasBeenShown){
			this._hasBeenShown = true;
			var selected = this.selectedChildWidget;
			if(selected){
				this._showChild(selected);
			}
		}
		this.inherited(arguments);
	},

	_setupChild: function(/*dijit._Widget*/ child){
		// Overrides _LayoutWidget._setupChild()

		this.inherited(arguments);

		domClass.replace(child.domNode, "dijitHidden", "dijitVisible");

		// remove the title attribute so it doesn't show up when i hover
		// over a node
		child.domNode.title = "";
	},

	addChild: function(/*dijit._Widget*/ child, /*Integer?*/ insertIndex){
		// Overrides _Container.addChild() to do layout and publish events

		this.inherited(arguments);

		if(this._started){
			topic.publish(this.id+"-addChild", child, insertIndex);	// publish

			// in case the tab titles have overflowed from one line to two lines
			// (or, if this if first child, from zero lines to one line)
			// TODO: w/ScrollingTabController this is no longer necessary, although
			// ScrollTabController.resize() does need to get called to show/hide
			// the navigation buttons as appropriate, but that's handled in ScrollingTabController.onAddChild().
			// If this is updated to not layout [except for initial child added / last child removed], update
			// "childless startup" test in StackContainer.html to check for no resize event after second addChild()
			this.layout();

			// if this is the first child, then select it
			if(!this.selectedChildWidget){
				this.selectChild(child);
			}
		}
	},

	removeChild: function(/*dijit._Widget*/ page){
		// Overrides _Container.removeChild() to do layout and publish events

		this.inherited(arguments);

		if(this._started){
			// this will notify any tablists to remove a button; do this first because it may affect sizing
			topic.publish(this.id + "-removeChild", page);	// publish
		}

		// If all our children are being destroyed than don't run the code below (to select another page),
		//  because we are deleting every page one by one
		if(this._descendantsBeingDestroyed){ return; }

		// Select new page to display, also updating TabController to show the respective tab.
		// Do this before layout call because it can affect the height of the TabController.
		if(this.selectedChildWidget === page){
			this.selectedChildWidget = undefined;
			if(this._started){
				var children = this.getChildren();
				if(children.length){
					this.selectChild(children[0]);
				}
			}
		}

		if(this._started){
			// In case the tab titles now take up one line instead of two lines
			// (note though that ScrollingTabController never overflows to multiple lines),
			// or the height has changed slightly because of addition/removal of tab which close icon
			this.layout();
		}
	},

	selectChild: function(/*dijit._Widget|String*/ page, /*Boolean*/ animate){
		// summary:
		//		Show the given widget (which must be one of my children)
		// page:
		//		Reference to child widget or id of child widget

		page = registry.byId(page);

		if(this.selectedChildWidget != page){
			// Deselect old page and select new one
			var d = this._transition(page, this.selectedChildWidget, animate);
			if (d) {
			  this._set("selectedChildWidget", page);
                 topic.publish(this.id+"-selectChild", page);    // publish
                 if(this.persist){
                   cookie(this.id + "_selectedChild", this.selectedChildWidget.id);
                 }
	        }
		}

		return d;		// If child has an href, promise that fires when the child's href finishes loading
	},

	_transition: function(newWidget, oldWidget /*===== ,  animate =====*/){
		// summary:
		//		Hide the old widget and display the new widget.
		//		Subclasses should override this.
		// newWidget: dijit._Widget
		//		The newly selected widget.
		// oldWidget: dijit._Widget
		//		The previously selected widget.
		// animate: Boolean
		//		Used by AccordionContainer to turn on/off slide effect.
		// tags:
		//		protected extension
		if(oldWidget){
			this._hideChild(oldWidget);
		}
		var d = this._showChild(newWidget);

		// Size the new widget, in case this is the first time it's being shown,
		// or I have been resized since the last time it was shown.
		// Note that page must be visible for resizing to work.
		if(d && newWidget.resize){
			if(this.doLayout){
				newWidget.resize(this._containerContentBox || this._contentBox);
			}else{
				// the child should pick it's own size but we still need to call resize()
				// (with no arguments) to let the widget lay itself out
				newWidget.resize();
			}
		}

		return d;	// If child has an href, promise that fires when the child's href finishes loading
	},

	_adjacent: function(/*Boolean*/ forward){
		// summary:
		//		Gets the next/previous child widget in this container from the current selection.
		var children = this.getChildren();
		var index = array.indexOf(children, this.selectedChildWidget);
		index += forward ? 1 : children.length - 1;
		return children[ index % children.length ]; // dijit._Widget
	},

	forward: function(){
		// summary:
		//		Advance to next page.
		return this.selectChild(this._adjacent(true), true);
	},

	back: function(){
		// summary:
		//		Go back to previous page.
		return this.selectChild(this._adjacent(false), true);
	},

	_onKeyPress: function(e){
		topic.publish(this.id+"-containerKeyPress", { e: e, page: this});	// publish
	},

	layout: function(){
		// Implement _LayoutWidget.layout() virtual method.
		var child = this.selectedChildWidget;
		if(child && child.resize){
			if(this.doLayout){
				child.resize(this._containerContentBox || this._contentBox);
			}else{
				child.resize();
			}
		}
	},

	_showChild: function(/*dijit._Widget*/ page){
		  // summary:
	          // Show the specified child by changing it's CSS, and call _onShow()/onShow() so
		  // it can do any updates it needs regarding loading href's etc.
		  // returns:
		  // Promise that fires when page has finished showing, or true if there's no href
		  if (page) {
		    var children = this.getChildren();
		    page.isFirstChild = (page == children[0]);
		    page.isLastChild = (page == children[children.length-1]);
		    page._set("selected", true);

		    domClass.replace(page.domNode, "dijitVisible", "dijitHidden");

		    return (page._onShow && page._onShow()) || true;
		  }		
	 },

	_hideChild: function(/*dijit._Widget*/ page){
		// summary:
		//		Hide the specified child by changing it's CSS, and call _onHide() so
		//		it's notified.
		page._set("selected", false);
		domClass.replace(page.domNode, "dijitHidden", "dijitVisible");

		page.onHide && page.onHide();
	},

	closeChild: function(/*dijit._Widget*/ page){
		// summary:
		//		Callback when user clicks the [X] to remove a page.
		//		If onClose() returns true then remove and destroy the child.
		// tags:
		//		private
		var remove = page.onClose(this, page);
		if(remove){
			this.removeChild(page);
			// makes sure we can clean up executeScripts in ContentPane onUnLoad
			page.destroyRecursive();
		}
	},

	destroyDescendants: function(/*Boolean*/ preserveDom){
		this._descendantsBeingDestroyed = true;
		this.selectedChildWidget = undefined;
		array.forEach(this.getChildren(), function(child){
			if(!preserveDom){
				this.removeChild(child);
			}
			child.destroyRecursive(preserveDom);
		}, this);
		this._descendantsBeingDestroyed = false;
	}
});

});

},
'dojo/regexp':function(){
define("dojo/regexp", ["./_base/kernel", "./_base/lang"], function(dojo, lang) {
	// module:
	//		dojo/regexp
	// summary:
	//		TODOC

lang.getObject("regexp", true, dojo);

/*=====
dojo.regexp = {
	// summary: Regular expressions and Builder resources
};
=====*/

dojo.regexp.escapeString = function(/*String*/str, /*String?*/except){
	//	summary:
	//		Adds escape sequences for special characters in regular expressions
	// except:
	//		a String with special characters to be left unescaped

	return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch){
		if(except && except.indexOf(ch) != -1){
			return ch;
		}
		return "\\" + ch;
	}); // String
};

dojo.regexp.buildGroupRE = function(/*Object|Array*/arr, /*Function*/re, /*Boolean?*/nonCapture){
	//	summary:
	//		Builds a regular expression that groups subexpressions
	//	description:
	//		A utility function used by some of the RE generators. The
	//		subexpressions are constructed by the function, re, in the second
	//		parameter.  re builds one subexpression for each elem in the array
	//		a, in the first parameter. Returns a string for a regular
	//		expression that groups all the subexpressions.
	// arr:
	//		A single value or an array of values.
	// re:
	//		A function. Takes one parameter and converts it to a regular
	//		expression.
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression. Defaults to false

	// case 1: a is a single value.
	if(!(arr instanceof Array)){
		return re(arr); // String
	}

	// case 2: a is an array
	var b = [];
	for(var i = 0; i < arr.length; i++){
		// convert each elem to a RE
		b.push(re(arr[i]));
	}

	 // join the REs as alternatives in a RE group.
	return dojo.regexp.group(b.join("|"), nonCapture); // String
};

dojo.regexp.group = function(/*String*/expression, /*Boolean?*/nonCapture){
	// summary:
	//		adds group match to expression
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression.
	return "(" + (nonCapture ? "?:":"") + expression + ")"; // String
};

return dojo.regexp;
});

},
'curam/debug':function(){
/*
 * Copyright 2009-2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Curam Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/debug", ["curam/define",
        "curam/util/LocalConfig"
        ], function(define, localConfig) {
  
  /*
   * Modification History
   * --------------------
   * 11-Apr-2014  MV  [CR00424825] Add support for JavaScript debug
   *    configuration and LocalConfig.
   * 12-Sep-2011  MV  [CR00286500] Fix stack overflow when logging window objects
   *     in IE.
   * 11-May-2011  MV  [CR00265902] Fixed log function invocation.
   * 26-Jan-2011  MV  [CR00244801] Fixed check for DEBUG flag.
   * 21-Jan-2011  DG  [CR00243540] Added note on new way to set DEBUG variable.
   *                    Added copyright. Tidied up formatting.
   * 26-Jun-2010  MV  [CR00204069] Improve to enable passing many number
   *                    of parameters. Enable easier usage by removing class
   *                    declaration and shortening the name.
   * 06-Nov-2009  SC  [CR00172239] Initial Version
   */
  /**
   * Provides a simple logging facility for debug tracing to the JavaScript
   * console.
   */
  define.singleton("curam.debug", {
    /**
     * A logging facility that can be turned on or off using the
     * "curam.trace.javascript" application property. Debug tracing is disabled
     * by default; use your application admin screens to enable it.
     * Any number of parameters can be passed. These are forwarded
     * to the <code>console.log.apply</code> function.
     */
    log: function() {
      if (curam.debug.enabled()) {
        try {
          var a = arguments;
          if (!dojo.isIE) {
            console.log.apply(console, a);
          
          // the above generic call doesn't work in IE  so the following ugly
          // specific handling must be provided
          } else {
            var numArgs = a.length;
            var sa = curam.debug._serializeArgument;
            switch(numArgs) {
              case 1: console.log(arguments[0]);
              break;
              
              case 2: console.log(a[0], sa(a[1]));
              break;
              
              case 3: console.log(a[0], sa(a[1]), sa(a[2]));
              break;
              
              case 4: console.log(a[0], sa(a[1]), sa(a[2]), sa(a[3]));
              break;
              
              case 5: console.log(a[0], sa(a[1]), sa(a[2]), sa(a[3]), sa(a[4]));
              break;
              
              case 6: console.log(a[0], sa(a[1]), sa(a[2]), sa(a[3]), sa(a[4]),
                  sa(a[5]));
              break;
              
              default: console.log("[Incomplete message - " + (numArgs - 5)
                  + " message a truncated] " + a[0],
                  sa(a[1]), sa(a[2]), sa(a[3]), sa(a[4]), sa(a[5]));
            }
          }

        } catch (e) {
          console.log(e);
          // Some problem with the console. Do nothing.
        }
      }
    },
    
    /**
     * Make a human readable version of the object to be logged.
     *
     * @param arg The object to be serialized.
     * @returns The human readable version of the object.
     */
    _serializeArgument: function(arg) {
      if (typeof arg != "undefined"
          && typeof arg.nodeType != "undefined"
          && typeof arg.cloneNode != "undefined") { // isNode 
        // DOM nodes can't be serialized using dojo.toJson(), so just return
        // default toString version
        return "" + arg;

      } else if (curam.debug._isWindow(arg)) {
        // window object causes stack overflow for dojo.toJson() so handling 
        // specifically here
        return arg.location.href;

      } else if (curam.debug._isArray(arg)
            && curam.debug._isWindow(arg[0])) { // is array of window objects
        // array of window objects causes stack overflow for dojo.toJson()
        // so handling specifically here
        return "[array of window objects, length " + arg.length + "]";

      } else {
        return dojo.toJson(arg);
      }
    },
    
    /**
     * Recognizes array objects.
     * 
     * @param arg The object to be checked.
     * @returns {Boolean} True if the argument is array, otherwise false.
     */
    _isArray: function(arg) {
      return typeof arg != "undefined"
          && (dojo.isArray(arg) || typeof arg.length != "undefined");
    },

    /**
     * Recognizes window object.
     *
     * @param arg The object to be checked.
     * @returns {Boolean} True if the argument is a window object,
     *    otherwise false.
     */
    _isWindow: function(arg) {
      // some of the significant properties might be undefined fo closed window
      // so handle this case separately
      var isClosed = typeof arg != "undefined"
        && typeof arg.closed != "undefined" && arg.closed;
      if (isClosed) {
        // it is a closed window
        return true;
      
      } else {
        return typeof arg != "undefined"
            && typeof arg.location != "undefined"
            && typeof arg.navigator != "undefined"
            && typeof arg.document != "undefined"
            && typeof arg.closed != "undefined";
      }
    },
    
    enabled: function() {
      return localConfig.readOption('jsTraceLog', 'false') == 'true';
    },
    
    /**
     * Performs setup of the debug/tracing infrastructure.
     * This is called from the application main page to setup debug.
     *
     * @param {Object} config Configuration data.
     */
    _setup: function(config) {
      localConfig.seedOption('jsTraceLog', config.trace, 'false');
      localConfig.seedOption('ajaxDebugMode', config.ajaxDebug, 'false');
      localConfig.seedOption('asyncProgressMonitor',
          config.asyncProgressMonitor, 'false');
    }
  });
  
  return curam.debug;
});

},
'dijit/DropDownMenu':function(){
require({cache:{
'url:dijit/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu", [
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys
	"dojo/text!./templates/Menu.html",
	"./_OnDijitClickMixin",
	"./_MenuBase"
], function(declare, event, keys, template, _OnDijitClickMixin, _MenuBase){

/*=====
	var _MenuBase = dijit._MenuBase;
	var _OnDijitClickMixin = dijit._OnDijitClickMixin;
=====*/

	// module:
	//		dijit/DropDownMenu
	// summary:
	//		dijit.DropDownMenu widget

	return declare("dijit.DropDownMenu", [_MenuBase, _OnDijitClickMixin], {
		// summary:
		//		A menu, without features for context menu (Meaning, drop down menu)

		templateString: template,

		baseClass: "dijitMenu",

		postCreate: function(){
			var l = this.isLeftToRight();
			this._openSubMenuKey = l ? keys.RIGHT_ARROW : keys.LEFT_ARROW;
			this._closeSubMenuKey = l ? keys.LEFT_ARROW : keys.RIGHT_ARROW;
			this.connectKeyNavHandlers([keys.UP_ARROW], [keys.DOWN_ARROW]);
		},

		_onKeyPress: function(/*Event*/ evt){
			// summary:
			//		Handle keyboard based menu navigation.
			// tags:
			//		protected

			if(evt.ctrlKey || evt.altKey){ return; }

			switch(evt.charOrCode){
				case this._openSubMenuKey:
					this._moveToPopup(evt);
					event.stop(evt);
					break;
				case this._closeSubMenuKey:
					if(this.parentMenu){
						if(this.parentMenu._isMenuBar){
							this.parentMenu.focusPrev();
						}else{
							this.onCancel(false);
						}
					}else{
						event.stop(evt);
					}
					break;
			}
		}
	});
});

},
'dijit/Menu':function(){
define("dijit/Menu", [
	"require",
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/dom", // dom.byId dom.isDescendant
	"dojo/dom-attr", // domAttr.get domAttr.set domAttr.has domAttr.remove
	"dojo/dom-geometry", // domStyle.getComputedStyle domGeometry.position
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel",
	"dojo/keys",	// keys.F10
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie"), has("quirks")
	"dojo/_base/window", // win.body win.doc.documentElement win.doc.frames win.withGlobal
	"dojo/window", // winUtils.get
	"./popup",
	"./DropDownMenu",
	"dojo/ready"
], function(require, array, declare, event, dom, domAttr, domGeometry, domStyle, kernel, keys, lang, on,
			has, win, winUtils, pm, DropDownMenu, ready){

/*=====
	var DropDownMenu = dijit.DropDownMenu;
=====*/

// module:
//		dijit/Menu
// summary:
//		Includes dijit.Menu widget and base class dijit._MenuBase

// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.Menu", DropDownMenu, {
	// summary:
	//		A context menu you can assign to multiple elements

	constructor: function(){
		this._bindings = [];
	},

	// targetNodeIds: [const] String[]
	//		Array of dom node ids of nodes to attach to.
	//		Fill this with nodeIds upon widget creation and it becomes context menu for those nodes.
	targetNodeIds: [],

	// contextMenuForWindow: [const] Boolean
	//		If true, right clicking anywhere on the window will cause this context menu to open.
	//		If false, must specify targetNodeIds.
	contextMenuForWindow: false,

	// leftClickToOpen: [const] Boolean
	//		If true, menu will open on left click instead of right click, similar to a file menu.
	leftClickToOpen: false,

	// refocus: Boolean
	// 		When this menu closes, re-focus the element which had focus before it was opened.
	refocus: true,

	postCreate: function(){
		if(this.contextMenuForWindow){
			this.bindDomNode(win.body());
		}else{
			// TODO: should have _setTargetNodeIds() method to handle initialization and a possible
			// later set('targetNodeIds', ...) call.  There's also a problem that targetNodeIds[]
			// gets stale after calls to bindDomNode()/unBindDomNode() as it still is just the original list (see #9610)
			array.forEach(this.targetNodeIds, this.bindDomNode, this);
		}
		this.inherited(arguments);
	},

	// thanks burstlib!
	_iframeContentWindow: function(/* HTMLIFrameElement */iframe_el){
		// summary:
		//		Returns the window reference of the passed iframe
		// tags:
		//		private
		return winUtils.get(this._iframeContentDocument(iframe_el)) ||
			// Moz. TODO: is this available when defaultView isn't?
			this._iframeContentDocument(iframe_el)['__parent__'] ||
			(iframe_el.name && win.doc.frames[iframe_el.name]) || null;	//	Window
	},

	_iframeContentDocument: function(/* HTMLIFrameElement */iframe_el){
		// summary:
		//		Returns a reference to the document object inside iframe_el
		// tags:
		//		protected
		return iframe_el.contentDocument // W3
			|| (iframe_el.contentWindow && iframe_el.contentWindow.document) // IE
			|| (iframe_el.name && win.doc.frames[iframe_el.name] && win.doc.frames[iframe_el.name].document)
			|| null;	//	HTMLDocument
	},

	bindDomNode: function(/*String|DomNode*/ node){
		// summary:
		//		Attach menu to given node
		node = dom.byId(node);

		var cn;	// Connect node

		// Support context menus on iframes.  Rather than binding to the iframe itself we need
		// to bind to the <body> node inside the iframe.
		if(node.tagName.toLowerCase() == "iframe"){
			var iframe = node,
				window = this._iframeContentWindow(iframe);
			cn = win.withGlobal(window, win.body);
		}else{

			// To capture these events at the top level, attach to <html>, not <body>.
			// Otherwise right-click context menu just doesn't work.
			cn = (node == win.body() ? win.doc.documentElement : node);
		}


		// "binding" is the object to track our connection to the node (ie, the parameter to bindDomNode())
		var binding = {
			node: node,
			iframe: iframe
		};

		// Save info about binding in _bindings[], and make node itself record index(+1) into
		// _bindings[] array.  Prefix w/_dijitMenu to avoid setting an attribute that may
		// start with a number, which fails on FF/safari.
		domAttr.set(node, "_dijitMenu" + this.id, this._bindings.push(binding));

		// Setup the connections to monitor click etc., unless we are connecting to an iframe which hasn't finished
		// loading yet, in which case we need to wait for the onload event first, and then connect
		// On linux Shift-F10 produces the oncontextmenu event, but on Windows it doesn't, so
		// we need to monitor keyboard events in addition to the oncontextmenu event.
		var doConnects = lang.hitch(this, function(cn){
			return [
				// TODO: when leftClickToOpen is true then shouldn't space/enter key trigger the menu,
				// rather than shift-F10?
				on(cn, this.leftClickToOpen ? "click" : "contextmenu", lang.hitch(this, function(evt){
					// Schedule context menu to be opened unless it's already been scheduled from onkeydown handler
					event.stop(evt);
					this._scheduleOpen(evt.target, iframe, {x: evt.pageX, y: evt.pageY});
				})),
				on(cn, "keydown", lang.hitch(this, function(evt){
					if(evt.shiftKey && evt.keyCode == keys.F10){
						event.stop(evt);
						this._scheduleOpen(evt.target, iframe);	// no coords - open near target node
					}
				}))
			];
		});
		binding.connects = cn ? doConnects(cn) : [];

		if(iframe){
			// Setup handler to [re]bind to the iframe when the contents are initially loaded,
			// and every time the contents change.
			// Need to do this b/c we are actually binding to the iframe's <body> node.
			// Note: can't use connect.connect(), see #9609.

			binding.onloadHandler = lang.hitch(this, function(){
				// want to remove old connections, but IE throws exceptions when trying to
				// access the <body> node because it's already gone, or at least in a state of limbo

				var window = this._iframeContentWindow(iframe);
					cn = win.withGlobal(window, win.body);
				binding.connects = doConnects(cn);
			});
			if(iframe.addEventListener){
				iframe.addEventListener("load", binding.onloadHandler, false);
			}else{
				iframe.attachEvent("onload", binding.onloadHandler);
			}
		}
	},

	unBindDomNode: function(/*String|DomNode*/ nodeName){
		// summary:
		//		Detach menu from given node

		var node;
		try{
			node = dom.byId(nodeName);
		}catch(e){
			// On IE the dom.byId() call will get an exception if the attach point was
			// the <body> node of an <iframe> that has since been reloaded (and thus the
			// <body> node is in a limbo state of destruction.
			return;
		}

		// node["_dijitMenu" + this.id] contains index(+1) into my _bindings[] array
		var attrName = "_dijitMenu" + this.id;
		if(node && domAttr.has(node, attrName)){
			var bid = domAttr.get(node, attrName)-1, b = this._bindings[bid], h;
			while(h = b.connects.pop()){
				h.remove();
			}

			// Remove listener for iframe onload events
			var iframe = b.iframe;
			if(iframe){
				if(iframe.removeEventListener){
					iframe.removeEventListener("load", b.onloadHandler, false);
				}else{
					iframe.detachEvent("onload", b.onloadHandler);
				}
			}

			domAttr.remove(node, attrName);
			delete this._bindings[bid];
		}
	},

	_scheduleOpen: function(/*DomNode?*/ target, /*DomNode?*/ iframe, /*Object?*/ coords){
		// summary:
		//		Set timer to display myself.  Using a timer rather than displaying immediately solves
		//		two problems:
		//
		//		1. IE: without the delay, focus work in "open" causes the system
		//		context menu to appear in spite of stopEvent.
		//
		//		2. Avoid double-shows on linux, where shift-F10 generates an oncontextmenu event
		//		even after a event.stop(e).  (Shift-F10 on windows doesn't generate the
		//		oncontextmenu event.)

		if(!this._openTimer){
			this._openTimer = setTimeout(lang.hitch(this, function(){
				delete this._openTimer;
				this._openMyself({
					target: target,
					iframe: iframe,
					coords: coords
				});
			}), 1);
		}
	},

	_openMyself: function(args){
		// summary:
		//		Internal function for opening myself when the user does a right-click or something similar.
		// args:
		//		This is an Object containing:
		//		* target:
		//			The node that is being clicked
		//		* iframe:
		//			If an <iframe> is being clicked, iframe points to that iframe
		//		* coords:
		//			Put menu at specified x/y position in viewport, or if iframe is
		//			specified, then relative to iframe.
		//
		//		_openMyself() formerly took the event object, and since various code references
		//		evt.target (after connecting to _openMyself()), using an Object for parameters
		//		(so that old code still works).

		var target = args.target,
			iframe = args.iframe,
			coords = args.coords;

		// Get coordinates to open menu, either at specified (mouse) position or (if triggered via keyboard)
		// then near the node the menu is assigned to.
		if(coords){
			if(iframe){
				// Specified coordinates are on <body> node of an <iframe>, convert to match main document
				var ifc = domGeometry.position(iframe, true),
					window = this._iframeContentWindow(iframe),
					scroll = win.withGlobal(window, "_docScroll", dojo);

				var cs = domStyle.getComputedStyle(iframe),
					tp = domStyle.toPixelValue,
					left = (has("ie") && has("quirks") ? 0 : tp(iframe, cs.paddingLeft)) + (has("ie") && has("quirks") ? tp(iframe, cs.borderLeftWidth) : 0),
					top = (has("ie") && has("quirks") ? 0 : tp(iframe, cs.paddingTop)) + (has("ie") && has("quirks") ? tp(iframe, cs.borderTopWidth) : 0);

				coords.x += ifc.x + left - scroll.x;
				coords.y += ifc.y + top - scroll.y;
			}
		}else{
			coords = domGeometry.position(target, true);
			coords.x += 10;
			coords.y += 10;
		}

		var self=this;
		var prevFocusNode = this._focusManager.get("prevNode");
		var curFocusNode = this._focusManager.get("curNode");
		var savedFocusNode = !curFocusNode || (dom.isDescendant(curFocusNode, this.domNode)) ? prevFocusNode : curFocusNode;

		function closeAndRestoreFocus(){
			// user has clicked on a menu or popup
			if(self.refocus && savedFocusNode){
				savedFocusNode.focus();
			}
			pm.close(self);
		}
		pm.open({
			popup: this,
			x: coords.x,
			y: coords.y,
			onExecute: closeAndRestoreFocus,
			onCancel: closeAndRestoreFocus,
			orient: this.isLeftToRight() ? 'L' : 'R'
		});
		this.focus();

		this._onBlur = function(){
			this.inherited('_onBlur', arguments);
			// Usually the parent closes the child widget but if this is a context
			// menu then there is no parent
			pm.close(this);
			// don't try to restore focus; user has clicked another part of the screen
			// and set focus there
		};
	},

	uninitialize: function(){
 		array.forEach(this._bindings, function(b){ if(b){ this.unBindDomNode(b.node); } }, this);
 		this.inherited(arguments);
	}
});

});

},
'curam/util/RuntimeContext':function(){
/*
 * Copyright 2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/util/RuntimeContext", [
        ], function() {

/*
 * Modification History
 * --------------------
 * 02-Aug-2011  MV  [CR00283023] Added the contextObject() function.
 * 21-Jun-2011  KW  [CR00275353] Initial version.
 */

/**
 * @name curam.util.RuntimeContext
 * @namespace Provides access to the browser Window object.
 * 
   */
  var RuntimeContext = dojo.declare("curam.util.RuntimeContext", null, {

  /**
   * @private
   */
  _window: null,

  /**
   * comments to follow
   *
   * @constructor
   * @private
   */
  constructor: function(window) {
    this._window = window;
  },
  
  /**
   * Comments to follow
   * 
   */
  getHref: function(){
    return this._window.location.href;
  },
  
  /**
   * Returns the path name of the url from the window's location object.
   * @Returns {String} Url path name.
   */
  getPathName: function() {
    return this._window.location.pathName;
  },

  /**
   * Returns the underlying context object of this runtime context.
   * @returns The underlying context object of this runtime context.
   */
  contextObject: function() {
    return this._window;
  }
  });
  
  return RuntimeContext;
});

},
'url:dijit/form/templates/ValidationTextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
'url:dijit/form/templates/TextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
'dijit/_KeyNavContainer':function(){
define("dijit/_KeyNavContainer", [
	"dojo/_base/kernel", // kernel.deprecated
	"./_Container",
	"./_FocusMixin",
	"dojo/_base/array", // array.forEach
	"dojo/keys", // keys.END keys.HOME
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/lang" // lang.hitch
], function(kernel, _Container, _FocusMixin, array, keys, declare, event, domAttr, lang){

/*=====
	var _FocusMixin = dijit._FocusMixin;
	var _Container = dijit._Container;
=====*/

	// module:
	//		dijit/_KeyNavContainer
	// summary:
	//		A _Container with keyboard navigation of its children.

	return declare("dijit._KeyNavContainer", [_FocusMixin, _Container], {

		// summary:
		//		A _Container with keyboard navigation of its children.
		// description:
		//		To use this mixin, call connectKeyNavHandlers() in
		//		postCreate().
		//		It provides normalized keyboard and focusing code for Container
		//		widgets.

/*=====
		// focusedChild: [protected] Widget
		//		The currently focused child widget, or null if there isn't one
		focusedChild: null,
=====*/

		// tabIndex: Integer
		//		Tab index of the container; same as HTML tabIndex attribute.
		//		Note then when user tabs into the container, focus is immediately
		//		moved to the first item in the container.
		tabIndex: "0",

		connectKeyNavHandlers: function(/*keys[]*/ prevKeyCodes, /*keys[]*/ nextKeyCodes){
			// summary:
			//		Call in postCreate() to attach the keyboard handlers
			//		to the container.
			// preKeyCodes: keys[]
			//		Key codes for navigating to the previous child.
			// nextKeyCodes: keys[]
			//		Key codes for navigating to the next child.
			// tags:
			//		protected

			// TODO: call this automatically from my own postCreate()

			var keyCodes = (this._keyNavCodes = {});
			var prev = lang.hitch(this, "focusPrev");
			var next = lang.hitch(this, "focusNext");
			array.forEach(prevKeyCodes, function(code){ keyCodes[code] = prev; });
			array.forEach(nextKeyCodes, function(code){ keyCodes[code] = next; });
			keyCodes[keys.HOME] = lang.hitch(this, "focusFirstChild");
			keyCodes[keys.END] = lang.hitch(this, "focusLastChild");
			this.connect(this.domNode, "onkeypress", "_onContainerKeypress");
			this.connect(this.domNode, "onfocus", "_onContainerFocus");
		},

		startupKeyNavChildren: function(){
			kernel.deprecated("startupKeyNavChildren() call no longer needed", "", "2.0");
		},

		startup: function(){
			this.inherited(arguments);
			array.forEach(this.getChildren(), lang.hitch(this, "_startupChild"));
		},

		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			this.inherited(arguments);
			this._startupChild(widget);
		},

		focus: function(){
			// summary:
			//		Default focus() implementation: focus the first child.
			this.focusFirstChild();
		},

		focusFirstChild: function(){
			// summary:
			//		Focus the first focusable child in the container.
			// tags:
			//		protected
			this.focusChild(this._getFirstFocusableChild());
		},

		focusLastChild: function(){
			// summary:
			//		Focus the last focusable child in the container.
			// tags:
			//		protected
			this.focusChild(this._getLastFocusableChild());
		},

		focusNext: function(){
			// summary:
			//		Focus the next widget
			// tags:
			//		protected
			this.focusChild(this._getNextFocusableChild(this.focusedChild, 1));
		},

		focusPrev: function(){
			// summary:
			//		Focus the last focusable node in the previous widget
			//		(ex: go to the ComboButton icon section rather than button section)
			// tags:
			//		protected
			this.focusChild(this._getNextFocusableChild(this.focusedChild, -1), true);
		},

		focusChild: function(/*dijit._Widget*/ widget, /*Boolean*/ last){
			// summary:
			//		Focus specified child widget.
			// widget:
			//		Reference to container's child widget
			// last:
			//		If true and if widget has multiple focusable nodes, focus the
			//		last one instead of the first one
			// tags:
			//		protected

			if(!widget){ return; }

			if(this.focusedChild && widget !== this.focusedChild){
				this._onChildBlur(this.focusedChild);	// used by _MenuBase
			}
			widget.set("tabIndex", this.tabIndex);	// for IE focus outline to appear, must set tabIndex before focs
			widget.focus(last ? "end" : "start");
			this._set("focusedChild", widget);
		},

		_startupChild: function(/*dijit._Widget*/ widget){
			// summary:
			//		Setup for each child widget
			// description:
			//		Sets tabIndex=-1 on each child, so that the tab key will
			//		leave the container rather than visiting each child.
			// tags:
			//		private

			widget.set("tabIndex", "-1");

			this.connect(widget, "_onFocus", function(){
				// Set valid tabIndex so tabbing away from widget goes to right place, see #10272
				widget.set("tabIndex", this.tabIndex);
			});
			this.connect(widget, "_onBlur", function(){
				widget.set("tabIndex", "-1");
			});
		},

		_onContainerFocus: function(evt){
			// summary:
			//		Handler for when the container gets focus
			// description:
			//		Initially the container itself has a tabIndex, but when it gets
			//		focus, switch focus to first child...
			// tags:
			//		private

			// Note that we can't use _onFocus() because switching focus from the
			// _onFocus() handler confuses the focus.js code
			// (because it causes _onFocusNode() to be called recursively)
			// Also, _onFocus() would fire when focus went directly to a child widget due to mouse click.

			// Ignore spurious focus events:
			//	1. focus on a child widget bubbles on FF
			//	2. on IE, clicking the scrollbar of a select dropdown moves focus from the focused child item to me
			if(evt.target !== this.domNode || this.focusedChild){ return; }

			this.focusFirstChild();

			// and then set the container's tabIndex to -1,
			// (don't remove as that breaks Safari 4)
			// so that tab or shift-tab will go to the fields after/before
			// the container, rather than the container itself
			domAttr.set(this.domNode, "tabIndex", "-1");
		},

		_onBlur: function(evt){
			// When focus is moved away the container, and its descendant (popup) widgets,
			// then restore the container's tabIndex so that user can tab to it again.
			// Note that using _onBlur() so that this doesn't happen when focus is shifted
			// to one of my child widgets (typically a popup)
			if(this.tabIndex){
				domAttr.set(this.domNode, "tabIndex", this.tabIndex);
			}
			this.focusedChild = null;
			this.inherited(arguments);
		},

		_onContainerKeypress: function(evt){
			// summary:
			//		When a key is pressed, if it's an arrow key etc. then
			//		it's handled here.
			// tags:
			//		private
			if(evt.ctrlKey || evt.altKey){ return; }
			var func = this._keyNavCodes[evt.charOrCode];
			if(func){
				func();
				event.stop(evt);
			}
		},

		_onChildBlur: function(/*dijit._Widget*/ /*===== widget =====*/){
			// summary:
			//		Called when focus leaves a child widget to go
			//		to a sibling widget.
			//		Used by MenuBase.js (TODO: move code there)
			// tags:
			//		protected
		},

		_getFirstFocusableChild: function(){
			// summary:
			//		Returns first child that can be focused
			return this._getNextFocusableChild(null, 1);	// dijit._Widget
		},

		_getLastFocusableChild: function(){
			// summary:
			//		Returns last child that can be focused
			return this._getNextFocusableChild(null, -1);	// dijit._Widget
		},

		_getNextFocusableChild: function(child, dir){
			// summary:
			//		Returns the next or previous focusable child, compared
			//		to "child"
			// child: Widget
			//		The current widget
			// dir: Integer
			//		* 1 = after
			//		* -1 = before
			if(child){
				child = this._getSiblingOfChild(child, dir);
			}
			var children = this.getChildren();
			for(var i=0; i < children.length; i++){
				if(!child){
					child = children[(dir>0) ? 0 : (children.length-1)];
				}
				if(child.isFocusable()){
					return child;	// dijit._Widget
				}
				child = this._getSiblingOfChild(child, dir);
			}
			// no focusable child found
			return null;	// dijit._Widget
		}
	});
});

},
'dijit/layout/utils':function(){
define("dijit/layout/utils", [
	"dojo/_base/array", // array.filter array.forEach
	"dojo/dom-class", // domClass.add domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/lang", // lang.mixin
	".."	// for exporting symbols to dijit, remove in 2.0
], function(array, domClass, domGeometry, domStyle, lang, dijit){

	// module:
	//		dijit/layout/utils
	// summary:
	//		marginBox2contentBox() and layoutChildren()

	var layout = lang.getObject("layout", true, dijit);
	/*===== layout = dijit.layout =====*/

	layout.marginBox2contentBox = function(/*DomNode*/ node, /*Object*/ mb){
		// summary:
		//		Given the margin-box size of a node, return its content box size.
		//		Functions like domGeometry.contentBox() but is more reliable since it doesn't have
		//		to wait for the browser to compute sizes.
		var cs = domStyle.getComputedStyle(node);
		var me = domGeometry.getMarginExtents(node, cs);
		var pb = domGeometry.getPadBorderExtents(node, cs);
		return {
			l: domStyle.toPixelValue(node, cs.paddingLeft),
			t: domStyle.toPixelValue(node, cs.paddingTop),
			w: mb.w - (me.w + pb.w),
			h: mb.h - (me.h + pb.h)
		};
	};

	function capitalize(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}

	function size(widget, dim){
		// size the child
		var newSize = widget.resize ? widget.resize(dim) : domGeometry.setMarginBox(widget.domNode, dim);

    /* CURAM-FIX: addition */
    if (widget.fakeWidget) {
      return;
    }
    /* END CURAM-FIX */

    // record child's size
		if(newSize){
			// if the child returned it's new size then use that
			lang.mixin(widget, newSize);
		}else{
			// otherwise, call getMarginBox(), but favor our own numbers when we have them.
			// the browser lies sometimes
      /* CURAM-FIX: replace following line */
//			lang.mixin(widget, domGeometry.getMarginBox(widget.domNode));
			lang.mixin(widget, domGeometry.getMarginBoxSimple(widget.domNode));
      /* END CURAM-FIX */
			lang.mixin(widget, dim);
		}
	}

	layout.layoutChildren = function(/*DomNode*/ container, /*Object*/ dim, /*Widget[]*/ children,
			/*String?*/ changedRegionId, /*Number?*/ changedRegionSize){
		// summary:
		//		Layout a bunch of child dom nodes within a parent dom node
		// container:
		//		parent node
		// dim:
		//		{l, t, w, h} object specifying dimensions of container into which to place children
		// children:
		//		an array of Widgets or at least objects containing:
		//			* domNode: pointer to DOM node to position
		//			* region or layoutAlign: position to place DOM node
		//			* resize(): (optional) method to set size of node
		//			* id: (optional) Id of widgets, referenced from resize object, below.
		// changedRegionId:
		//		If specified, the slider for the region with the specified id has been dragged, and thus
		//		the region's height or width should be adjusted according to changedRegionSize
		// changedRegionSize:
		//		See changedRegionId.

		// copy dim because we are going to modify it
		dim = lang.mixin({}, dim);

		domClass.add(container, "dijitLayoutContainer");

		// Move "client" elements to the end of the array for layout.  a11y dictates that the author
		// needs to be able to put them in the document in tab-order, but this algorithm requires that
		// client be last.    TODO: move these lines to LayoutContainer?   Unneeded other places I think.
		children = array.filter(children, function(item){ return item.region != "center" && item.layoutAlign != "client"; })
			.concat(array.filter(children, function(item){ return item.region == "center" || item.layoutAlign == "client"; }));

    /* CURAM-FIX: added next line */
    var retDim = {};

    // set positions/sizes
		array.forEach(children, function(child){
			var elm = child.domNode,
				pos = (child.region || child.layoutAlign);
			if(!pos){
				throw new Error("No region setting for " + child.id)
			}

			// set elem to upper left corner of unused space; may move it later
			var elmStyle = elm.style;
			elmStyle.left = dim.l+"px";
			elmStyle.top = dim.t+"px";
			elmStyle.position = "absolute";

			domClass.add(elm, "dijitAlign" + capitalize(pos));

			// Size adjustments to make to this child widget
			var sizeSetting = {};

			// Check for optional size adjustment due to splitter drag (height adjustment for top/bottom align
			// panes and width adjustment for left/right align panes.
			if(changedRegionId && changedRegionId == child.id){
				sizeSetting[child.region == "top" || child.region == "bottom" ? "h" : "w"] = changedRegionSize;
			}

			// set size && adjust record of remaining space.
			// note that setting the width of a <div> may affect its height.
			if(pos == "top" || pos == "bottom"){
				sizeSetting.w = dim.w;
				size(child, sizeSetting);
				dim.h -= child.h;
				if(pos == "top"){
					dim.t += child.h;
				}else{
					elmStyle.top = dim.t + dim.h + "px";
				}
			}else if(pos == "left" || pos == "right"){
				sizeSetting.h = dim.h;
				size(child, sizeSetting);
				dim.w -= child.w;
				if(pos == "left"){
					dim.l += child.w;
				}else{
					elmStyle.left = dim.l + dim.w + "px";
				}
			}else if(pos == "client" || pos == "center"){
				size(child, dim);
			}

      /* CURAM-FIX: addition */
      retDim[pos] = {
          w: dim.w,
          h: dim.h
      };
      /* END CURAM-FIX */
		});
	
    /* CURAM-FIX: addition next line */
    return retDim;
  };


	return {
		marginBox2contentBox: layout.marginBox2contentBox,
		layoutChildren: layout.layoutChildren
	};
});

},
'dijit/_Contained':function(){
define("dijit/_Contained", [
	"dojo/_base/declare", // declare
	"./registry"	// registry.getEnclosingWidget(), registry.byNode()
], function(declare, registry){

	// module:
	//		dijit/_Contained
	// summary:
	//		Mixin for widgets that are children of a container widget

	return declare("dijit._Contained", null, {
		// summary:
		//		Mixin for widgets that are children of a container widget
		//
		// example:
		// | 	// make a basic custom widget that knows about it's parents
		// |	declare("my.customClass",[dijit._Widget,dijit._Contained],{});

		_getSibling: function(/*String*/ which){
			// summary:
			//      Returns next or previous sibling
			// which:
			//      Either "next" or "previous"
			// tags:
			//      private
			var node = this.domNode;
			do{
				node = node[which+"Sibling"];
			}while(node && node.nodeType != 1);
			return node && registry.byNode(node);	// dijit._Widget
		},

		getPreviousSibling: function(){
			// summary:
			//		Returns null if this is the first child of the parent,
			//		otherwise returns the next element sibling to the "left".

			return this._getSibling("previous"); // dijit._Widget
		},

		getNextSibling: function(){
			// summary:
			//		Returns null if this is the last child of the parent,
			//		otherwise returns the next element sibling to the "right".

			return this._getSibling("next"); // dijit._Widget
		},

		getIndexInParent: function(){
			// summary:
			//		Returns the index of this widget within its container parent.
			//		It returns -1 if the parent does not exist, or if the parent
			//		is not a dijit._Container

			var p = this.getParent();
			if(!p || !p.getIndexOfChild){
				return -1; // int
			}
			return p.getIndexOfChild(this); // int
		}
	});
});

},
'dijit/form/DataList':function(){
define("dijit/form/DataList", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.byId
	"dojo/_base/lang", // lang.trim
	"dojo/query", // query
	"dojo/store/Memory", // dojo.store.Memory
	"../registry"	// registry.add registry.remove
], function(declare, dom, lang, query, MemoryStore, registry){

	// module:
	//		dijit/form/DataList
	// summary:
	//		Inefficient but small data store specialized for inlined data via OPTION tags

	function toItem(/*DOMNode*/ option){
		// summary:
		//		Convert <option> node to hash
		return {
			id: option.value,
			value: option.value,
			name: lang.trim(option.innerText || option.textContent || '')
		};
	}

	return declare("dijit.form.DataList", MemoryStore, {
		// summary:
		//		Inefficient but small data store specialized for inlined data via OPTION tags
		//
		// description:
		//		Provides a store for inlined data like:
		//
		//	|	<datalist>
		//	|		<option value="AL">Alabama</option>
		//	|		...

		constructor: function(/*Object?*/ params, /*DomNode|String*/ srcNodeRef){
			// store pointer to original DOM tree
			this.domNode = dom.byId(srcNodeRef);

			lang.mixin(this, params);
			if(this.id){
				registry.add(this); // add to registry so it can be easily found by id
			}
			this.domNode.style.display = "none";

			this.inherited(arguments, [{
				data: query("option", this.domNode).map(toItem)
			}]);
		},

		destroy: function(){
			registry.remove(this.id);
		},

		fetchSelectedItem: function(){
			// summary:
			//		Get the option marked as selected, like `<option selected>`.
			//		Not part of dojo.data API.
			var option = query("> option[selected]", this.domNode)[0] || query("> option", this.domNode)[0];
			return option && toItem(option);
		}
	});
});

},
'dijit/_Container':function(){
define("dijit/_Container", [
	"dojo/_base/array", // array.forEach array.indexOf
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.place
	"./registry"	// registry.byNode()
], function(array, declare, domConstruct, registry){

	// module:
	//		dijit/_Container
	// summary:
	//		Mixin for widgets that contain a set of widget children.

	return declare("dijit._Container", null, {
		// summary:
		//		Mixin for widgets that contain a set of widget children.
		// description:
		//		Use this mixin for widgets that needs to know about and
		//		keep track of their widget children. Suitable for widgets like BorderContainer
		//		and TabContainer which contain (only) a set of child widgets.
		//
		//		It's not suitable for widgets like ContentPane
		//		which contains mixed HTML (plain DOM nodes in addition to widgets),
		//		and where contained widgets are not necessarily directly below
		//		this.containerNode.   In that case calls like addChild(node, position)
		//		wouldn't make sense.

		buildRendering: function(){
			this.inherited(arguments);
			if(!this.containerNode){
				// all widgets with descendants must set containerNode
	 			this.containerNode = this.domNode;
			}
		},

		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			// summary:
			//		Makes the given widget a child of this widget.
			// description:
			//		Inserts specified child widget's dom node as a child of this widget's
			//		container node, and possibly does other processing (such as layout).

			var refNode = this.containerNode;
			if(insertIndex && typeof insertIndex == "number"){
				var children = this.getChildren();
				if(children && children.length >= insertIndex){
					refNode = children[insertIndex-1].domNode;
					insertIndex = "after";
				}
			}
			domConstruct.place(widget.domNode, refNode, insertIndex);

			// If I've been started but the child widget hasn't been started,
			// start it now.  Make sure to do this after widget has been
			// inserted into the DOM tree, so it can see that it's being controlled by me,
			// so it doesn't try to size itself.
			if(this._started && !widget._started){
				widget.startup();
			}
		},

		removeChild: function(/*Widget|int*/ widget){
			// summary:
			//		Removes the passed widget instance from this widget but does
			//		not destroy it.  You can also pass in an integer indicating
			//		the index within the container to remove

			if(typeof widget == "number"){
				widget = this.getChildren()[widget];
			}

			if(widget){
				var node = widget.domNode;
				if(node && node.parentNode){
					node.parentNode.removeChild(node); // detach but don't destroy
				}
			}
		},

		hasChildren: function(){
			// summary:
			//		Returns true if widget has children, i.e. if this.containerNode contains something.
			return this.getChildren().length > 0;	// Boolean
		},

		_getSiblingOfChild: function(/*dijit._Widget*/ child, /*int*/ dir){
			// summary:
			//		Get the next or previous widget sibling of child
			// dir:
			//		if 1, get the next sibling
			//		if -1, get the previous sibling
			// tags:
			//      private
			var node = child.domNode,
				which = (dir>0 ? "nextSibling" : "previousSibling");
			do{
				node = node[which];
			}while(node && (node.nodeType != 1 || !registry.byNode(node)));
			return node && registry.byNode(node);	// dijit._Widget
		},

		getIndexOfChild: function(/*dijit._Widget*/ child){
			// summary:
			//		Gets the index of the child in this container or -1 if not found
			return array.indexOf(this.getChildren(), child);	// int
		}
	});
});

},
'dijit/form/ValidationTextBox':function(){
require({cache:{
'url:dijit/form/templates/ValidationTextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox", [
	"dojo/_base/declare", // declare
	"dojo/i18n", // i18n.getLocalization
	"./TextBox",
	"../Tooltip",
	"dojo/text!./templates/ValidationTextBox.html",
	"dojo/i18n!./nls/validate"
], function(declare, i18n, TextBox, Tooltip, template){

/*=====
	var Tooltip = dijit.Tooltip;
	var TextBox = dijit.form.TextBox;
=====*/

	// module:
	//		dijit/form/ValidationTextBox
	// summary:
	//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.


	/*=====
		dijit.form.ValidationTextBox.__Constraints = function(){
			// locale: String
			//		locale used for validation, picks up value from this widget's lang attribute
			// _flags_: anything
			//		various flags passed to regExpGen function
			this.locale = "";
			this._flags_ = "";
		}
	=====*/

	return declare("dijit.form.ValidationTextBox", TextBox, {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.
		// tags:
		//		protected

		templateString: template,
		baseClass: "dijitTextBox dijitValidationTextBox",

		// required: Boolean
		//		User is required to enter data into this field.
		required: false,

		// promptMessage: String
		//		If defined, display this hint string immediately on focus to the textbox, if empty.
		//		Also displays if the textbox value is Incomplete (not yet valid but will be with additional input).
		//		Think of this like a tooltip that tells the user what to do, not an error message
		//		that tells the user what they've done wrong.
		//
		//		Message disappears when user starts typing.
		promptMessage: "",

		// invalidMessage: String
		// 		The message to display if value is invalid.
		//		The translated string value is read from the message file by default.
		// 		Set to "" to use the promptMessage instead.
		invalidMessage: "$_unset_$",

		// missingMessage: String
		// 		The message to display if value is empty and the field is required.
		//		The translated string value is read from the message file by default.
		// 		Set to "" to use the invalidMessage instead.
		missingMessage: "$_unset_$",

		// message: String
		//		Currently error/prompt message.
		//		When using the default tooltip implementation, this will only be
		//		displayed when the field is focused.
		message: "",

		// constraints: dijit.form.ValidationTextBox.__Constraints
		//		user-defined object needed to pass parameters to the validator functions
		constraints: {},

		// regExp: [extension protected] String
		//		regular expression string used to validate the input
		//		Do not specify both regExp and regExpGen
		regExp: ".*",

		regExpGen: function(/*dijit.form.ValidationTextBox.__Constraints*/ /*===== constraints =====*/){
			// summary:
			//		Overridable function used to generate regExp when dependent on constraints.
			//		Do not specify both regExp and regExpGen.
			// tags:
			//		extension protected
			return this.regExp; // String
		},

		// state: [readonly] String
		//		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
		state: "",

		// tooltipPosition: String[]
		//		See description of `dijit.Tooltip.defaultPosition` for details on this parameter.
		tooltipPosition: [],

		_setValueAttr: function(){
			// summary:
			//		Hook so set('value', ...) works.
			this.inherited(arguments);
			this.validate(this.focused);
		},

		validator: function(/*anything*/ value, /*dijit.form.ValidationTextBox.__Constraints*/ constraints){
			// summary:
			//		Overridable function used to validate the text input against the regular expression.
			// tags:
			//		protected
			return (new RegExp("^(?:" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value) &&
				(!this.required || !this._isEmpty(value)) &&
				(this._isEmpty(value) || this.parse(value, constraints) !== undefined); // Boolean
		},

		_isValidSubset: function(){
			// summary:
			//		Returns true if the value is either already valid or could be made valid by appending characters.
			//		This is used for validation while the user [may be] still typing.
			return this.textbox.value.search(this._partialre) == 0;
		},

		isValid: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Tests if value is valid.
			//		Can override with your own routine in a subclass.
			// tags:
			//		protected
			return this.validator(this.textbox.value, this.constraints);
		},

		_isEmpty: function(value){
			// summary:
			//		Checks for whitespace
			return (this.trim ? /^\s*$/ : /^$/).test(value); // Boolean
		},

		getErrorMessage: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Return an error message to show if appropriate
			// tags:
			//		protected
			return (this.required && this._isEmpty(this.textbox.value)) ? this.missingMessage : this.invalidMessage; // String
		},

		getPromptMessage: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Return a hint message to show when widget is first focused
			// tags:
			//		protected
			return this.promptMessage; // String
		},

		_maskValidSubsetError: true,
		validate: function(/*Boolean*/ isFocused){
			// summary:
			//		Called by oninit, onblur, and onkeypress.
			// description:
			//		Show missing or invalid messages if appropriate, and highlight textbox field.
			// tags:
			//		protected
			var message = "";
			var isValid = this.disabled || this.isValid(isFocused);
			if(isValid){ this._maskValidSubsetError = true; }
			var isEmpty = this._isEmpty(this.textbox.value);
			var isValidSubset = !isValid && isFocused && this._isValidSubset();
			this._set("state", isValid ? "" : (((((!this._hasBeenBlurred || isFocused) && isEmpty) || isValidSubset) && this._maskValidSubsetError) ? "Incomplete" : "Error"));
			this.focusNode.setAttribute("aria-invalid", isValid ? "false" : "true");

			if(this.state == "Error"){
				this._maskValidSubsetError = isFocused && isValidSubset; // we want the error to show up after a blur and refocus
				message = this.getErrorMessage(isFocused);
			}else if(this.state == "Incomplete"){
				message = this.getPromptMessage(isFocused); // show the prompt whenever the value is not yet complete
				this._maskValidSubsetError = !this._hasBeenBlurred || isFocused; // no Incomplete warnings while focused
			}else if(isEmpty){
				message = this.getPromptMessage(isFocused); // show the prompt whenever there's no error and no text
			}
			this.set("message", message);

			return isValid;
		},

		displayMessage: function(/*String*/ message){
			// summary:
			//		Overridable method to display validation errors/hints.
			//		By default uses a tooltip.
			// tags:
			//		extension
			if(message && this.focused){
				Tooltip.show(message, this.domNode, this.tooltipPosition, !this.isLeftToRight());
			}else{
				Tooltip.hide(this.domNode);
			}
		},

		_refreshState: function(){
			// Overrides TextBox._refreshState()
			this.validate(this.focused);
			this.inherited(arguments);
		},

		//////////// INITIALIZATION METHODS ///////////////////////////////////////

		constructor: function(){
			this.constraints = {};
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			if(!constraints.locale && this.lang){
				constraints.locale = this.lang;
			}
			this._set("constraints", constraints);
			this._computePartialRE();
		},

		_computePartialRE: function(){
			var p = this.regExpGen(this.constraints);
			this.regExp = p;
			var partialre = "";
			// parse the regexp and produce a new regexp that matches valid subsets
			// if the regexp is .* then there's no use in matching subsets since everything is valid
			if(p != ".*"){ this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,
				function(re){
					switch(re.charAt(0)){
						case '{':
						case '+':
						case '?':
						case '*':
						case '^':
						case '$':
						case '|':
						case '(':
							partialre += re;
							break;
						case ")":
							partialre += "|$)";
							break;
						 default:
							partialre += "(?:"+re+"|$)";
							break;
					}
				}
			);}
			try{ // this is needed for now since the above regexp parsing needs more test verification
				"".search(partialre);
			}catch(e){ // should never be here unless the original RE is bad or the parsing is bad
				partialre = this.regExp;
				console.warn('RegExp error in ' + this.declaredClass + ': ' + this.regExp);
			} // should never be here unless the original RE is bad or the parsing is bad
			this._partialre = "^(?:" + partialre + ")$";
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
			if(this.invalidMessage == "$_unset_$"){ this.invalidMessage = this.messages.invalidMessage; }
			if(!this.invalidMessage){ this.invalidMessage = this.promptMessage; }
			if(this.missingMessage == "$_unset_$"){ this.missingMessage = this.messages.missingMessage; }
			if(!this.missingMessage){ this.missingMessage = this.invalidMessage; }
			this._setConstraintsAttr(this.constraints); // this needs to happen now (and later) due to codependency on _set*Attr calls attachPoints
		},

		_setDisabledAttr: function(/*Boolean*/ value){
			this.inherited(arguments);	// call FormValueWidget._setDisabledAttr()
			this._refreshState();
		},

		_setRequiredAttr: function(/*Boolean*/ value){
			this._set("required", value);
			this.focusNode.setAttribute("aria-required", value);
			this._refreshState();
		},

		_setMessageAttr: function(/*String*/ message){
			this._set("message", message);
			this.displayMessage(message);
		},

		reset:function(){
			// Overrides dijit.form.TextBox.reset() by also
			// hiding errors about partial matches
			this._maskValidSubsetError = true;
			this.inherited(arguments);
		},

		_onBlur: function(){
			// the message still exists but for back-compat, and to erase the tooltip
			// (if the message is being displayed as a tooltip), call displayMessage('')
			this.displayMessage('');

			this.inherited(arguments);
		}
	});
});

},
'dijit/_base':function(){
define("dijit/_base", [
	".",
	"./a11y",	// used to be in dijit/_base/manager
	"./WidgetSet",	// used to be in dijit/_base/manager
	"./_base/focus",
	"./_base/manager",
	"./_base/place",
	"./_base/popup",
	"./_base/scroll",
	"./_base/sniff",
	"./_base/typematic",
	"./_base/wai",
	"./_base/window"
], function(dijit){

	// module:
	//		dijit/_base
	// summary:
	//		Includes all the modules in dijit/_base

	return dijit._base;
});

},
'dijit/_base/typematic':function(){
define("dijit/_base/typematic", ["../typematic"], function(){
	// for back-compat, just loads top level module
});

},
'dojo/window':function(){
define("dojo/window", ["./_base/lang", "./_base/sniff", "./_base/window", "./dom", "./dom-geometry", "./dom-style"],
	function(lang, has, baseWindow, dom, geom, style) {

// module:
//		dojo/window
// summary:
//		TODOC

var window = lang.getObject("dojo.window", true);

/*=====
dojo.window = {
	// summary:
	//		TODO
};
window = dojo.window;
=====*/

window.getBox = function(){
	// summary:
	//		Returns the dimensions and scroll position of the viewable area of a browser window

	var
		scrollRoot = (baseWindow.doc.compatMode == 'BackCompat') ? baseWindow.body() : baseWindow.doc.documentElement,
		// get scroll position
		scroll = geom.docScroll(), // scrollRoot.scrollTop/Left should work
		w, h;

	if(has("touch")){ // if(scrollbars not supported)
		var uiWindow = baseWindow.doc.parentWindow || baseWindow.doc.defaultView;   // use UI window, not dojo.global window. baseWindow.doc.parentWindow probably not needed since it's not defined for webkit
		// on mobile, scrollRoot.clientHeight <= uiWindow.innerHeight <= scrollRoot.offsetHeight, return uiWindow.innerHeight
		w = uiWindow.innerWidth || scrollRoot.clientWidth; // || scrollRoot.clientXXX probably never evaluated
		h = uiWindow.innerHeight || scrollRoot.clientHeight;
	}else{
		// on desktops, scrollRoot.clientHeight <= scrollRoot.offsetHeight <= uiWindow.innerHeight, return scrollRoot.clientHeight
		// uiWindow.innerWidth/Height includes the scrollbar and cannot be used
		w = scrollRoot.clientWidth;
		h = scrollRoot.clientHeight;
	}
	return {
		l: scroll.x,
		t: scroll.y,
		w: w,
		h: h
	};
};

window.get = function(doc){
	// summary:
	// 		Get window object associated with document doc

	// In some IE versions (at least 6.0), document.parentWindow does not return a
	// reference to the real window object (maybe a copy), so we must fix it as well
	// We use IE specific execScript to attach the real window reference to
	// document._parentWindow for later use
	if(has("ie") && window !== document.parentWindow){
		/*
		In IE 6, only the variable "window" can be used to connect events (others
		may be only copies).
		*/
		doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
		//to prevent memory leak, unset it after use
		//another possibility is to add an onUnload handler which seems overkill to me (liucougar)
		var win = doc._parentWindow;
		doc._parentWindow = null;
		return win;	//	Window
	}

	return doc.parentWindow || doc.defaultView;	//	Window
};

window.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
	// summary:
	//		Scroll the passed node into view, if it is not already.

	// don't rely on node.scrollIntoView working just because the function is there

	try{ // catch unexpected/unrecreatable errors (#7808) since we can recover using a semi-acceptable native method
		node = dom.byId(node);
		var doc = node.ownerDocument || baseWindow.doc,
			body = doc.body || baseWindow.body(),
			html = doc.documentElement || body.parentNode,
			isIE = has("ie"), isWK = has("webkit");
		// if an untested browser, then use the native method
		if((!(has("mozilla") || isIE || isWK || has("opera")) || node == body || node == html) && (typeof node.scrollIntoView != "undefined")){
			node.scrollIntoView(false); // short-circuit to native if possible
			return;
		}
		var backCompat = doc.compatMode == 'BackCompat',
			clientAreaRoot = (isIE >= 9 && node.ownerDocument.parentWindow.frameElement)
				? ((html.clientHeight > 0 && html.clientWidth > 0 && (body.clientHeight == 0 || body.clientWidth == 0 || body.clientHeight > html.clientHeight || body.clientWidth > html.clientWidth)) ? html : body)
				: (backCompat ? body : html),
			scrollRoot = isWK ? body : clientAreaRoot,
			rootWidth = clientAreaRoot.clientWidth,
			rootHeight = clientAreaRoot.clientHeight,
			rtl = !geom.isBodyLtr(),
			nodePos = pos || geom.position(node),
			el = node.parentNode,
			isFixed = function(el){
				return ((isIE <= 6 || (isIE && backCompat))? false : (style.get(el, 'position').toLowerCase() == "fixed"));
			};
		if(isFixed(node)){ return; } // nothing to do

		while(el){
			if(el == body){ el = scrollRoot; }
			var elPos = geom.position(el),
				fixedPos = isFixed(el);

			if(el == scrollRoot){
				elPos.w = rootWidth; elPos.h = rootHeight;
				if(scrollRoot == html && isIE && rtl){ elPos.x += scrollRoot.offsetWidth-elPos.w; } // IE workaround where scrollbar causes negative x
				if(elPos.x < 0 || !isIE){ elPos.x = 0; } // IE can have values > 0
				if(elPos.y < 0 || !isIE){ elPos.y = 0; }
			}else{
				var pb = geom.getPadBorderExtents(el);
				elPos.w -= pb.w; elPos.h -= pb.h; elPos.x += pb.l; elPos.y += pb.t;
				var clientSize = el.clientWidth,
					scrollBarSize = elPos.w - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.w = clientSize;
					elPos.x += (rtl && (isIE || el.clientLeft > pb.l/*Chrome*/)) ? scrollBarSize : 0;
				}
				clientSize = el.clientHeight;
				scrollBarSize = elPos.h - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.h = clientSize;
				}
			}
			if(fixedPos){ // bounded by viewport, not parents
				if(elPos.y < 0){
					elPos.h += elPos.y; elPos.y = 0;
				}
				if(elPos.x < 0){
					elPos.w += elPos.x; elPos.x = 0;
				}
				if(elPos.y + elPos.h > rootHeight){
					elPos.h = rootHeight - elPos.y;
				}
				if(elPos.x + elPos.w > rootWidth){
					elPos.w = rootWidth - elPos.x;
				}
			}
			// calculate overflow in all 4 directions
			var l = nodePos.x - elPos.x, // beyond left: < 0
				t = nodePos.y - Math.max(elPos.y, 0), // beyond top: < 0
				r = l + nodePos.w - elPos.w, // beyond right: > 0
				bot = t + nodePos.h - elPos.h; // beyond bottom: > 0
			if(r * l > 0){
				var s = Math[l < 0? "max" : "min"](l, r);
				if(rtl && ((isIE == 8 && !backCompat) || isIE >= 9)){ s = -s; }
				nodePos.x += el.scrollLeft;
				el.scrollLeft += s;
				nodePos.x -= el.scrollLeft;
			}
			if(bot * t > 0){
				nodePos.y += el.scrollTop;
				el.scrollTop += Math[t < 0? "max" : "min"](t, bot);
				nodePos.y -= el.scrollTop;
			}
			el = (el != scrollRoot) && !fixedPos && el.parentNode;
		}
	}catch(error){
		console.error('scrollIntoView: ' + error);
		node.scrollIntoView(false);
	}
};

/* CURAM-FIX Code for catching zoom-in / zoom-out events and resizing in IE8
 * This is fixed in Dojo 1.8, but until we upgrade we need this hack.
 * See https://csnext.ibm.com:8002/jazz/resource/itemName/com.ibm.team.workitem.WorkItem/7318
 */
require(["dojo/_base/sniff", "dojo/on"], function(has, on){
    if(has("ie") == 8){
        var deviceXDPI = screen.deviceXDPI;
        setInterval(function(){
            if(screen.deviceXDPI != deviceXDPI){
                deviceXDPI = screen.deviceXDPI;
                on.emit(baseWindow.global, "resize");
            }
        }, 250);
    }
});
/* END CURAM-FIX */

return window;
});

},
'dijit/_FocusMixin':function(){
define("dijit/_FocusMixin", [
	"./focus",
	"./_WidgetBase",
	"dojo/_base/declare", // declare
	"dojo/_base/lang" // lang.extend
], function(focus, _WidgetBase, declare, lang){

/*=====
	var _WidgetBase = dijit._WidgetBase;
=====*/

	// module:
	//		dijit/_FocusMixin
	// summary:
	//		Mixin to widget to provide _onFocus() and _onBlur() methods that
	//		fire when a widget or it's descendants get/lose focus

	// We don't know where _FocusMixin will occur in the inheritance chain, but we need the _onFocus()/_onBlur() below
	// to be last in the inheritance chain, so mixin to _WidgetBase.
	lang.extend(_WidgetBase, {
		// focused: [readonly] Boolean
		//		This widget or a widget it contains has focus, or is "active" because
		//		it was recently clicked.
		focused: false,

		onFocus: function(){
			// summary:
			//		Called when the widget becomes "active" because
			//		it or a widget inside of it either has focus, or has recently
			//		been clicked.
			// tags:
			//		callback
		},

		onBlur: function(){
			// summary:
			//		Called when the widget stops being "active" because
			//		focus moved to something outside of it, or the user
			//		clicked somewhere outside of it, or the widget was
			//		hidden.
			// tags:
			//		callback
		},

		_onFocus: function(){
			// summary:
			//		This is where widgets do processing for when they are active,
			//		such as changing CSS classes.  See onFocus() for more details.
			// tags:
			//		protected
			this.onFocus();
		},

		_onBlur: function(){
			// summary:
			//		This is where widgets do processing for when they stop being active,
			//		such as changing CSS classes.  See onBlur() for more details.
			// tags:
			//		protected
			this.onBlur();
		}
	});

	return declare("dijit._FocusMixin", null, {
		// summary:
		//		Mixin to widget to provide _onFocus() and _onBlur() methods that
		//		fire when a widget or it's descendants get/lose focus

		// flag that I want _onFocus()/_onBlur() notifications from focus manager
		_focusManager: focus
	});

});

},
'dojo/data/util/filter':function(){
define("dojo/data/util/filter", ["dojo/_base/lang"], function(lang) {
	// module:
	//		dojo/data/util/filter
	// summary:
	//		TODOC

var filter = lang.getObject("dojo.data.util.filter", true);

filter.patternToRegExp = function(/*String*/pattern, /*boolean?*/ ignoreCase){
	//	summary:
	//		Helper function to convert a simple pattern to a regular expression for matching.
	//	description:
	//		Returns a regular expression object that conforms to the defined conversion rules.
	//		For example:
	//			ca*   -> /^ca.*$/
	//			*ca*  -> /^.*ca.*$/
	//			*c\*a*  -> /^.*c\*a.*$/
	//			*c\*a?*  -> /^.*c\*a..*$/
	//			and so on.
	//
	//	pattern: string
	//		A simple matching pattern to convert that follows basic rules:
	//			* Means match anything, so ca* means match anything starting with ca
	//			? Means match single character.  So, b?b will match to bob and bab, and so on.
	//      	\ is an escape character.  So for example, \* means do not treat * as a match, but literal character *.
	//				To use a \ as a character in the string, it must be escaped.  So in the pattern it should be
	//				represented by \\ to be treated as an ordinary \ character instead of an escape.
	//
	//	ignoreCase:
	//		An optional flag to indicate if the pattern matching should be treated as case-sensitive or not when comparing
	//		By default, it is assumed case sensitive.

	var rxp = "^";
	var c = null;
	for(var i = 0; i < pattern.length; i++){
		c = pattern.charAt(i);
		switch(c){
			case '\\':
				rxp += c;
				i++;
				rxp += pattern.charAt(i);
				break;
			case '*':
				rxp += ".*"; break;
			case '?':
				rxp += "."; break;
			case '$':
			case '^':
			case '/':
			case '+':
			case '.':
			case '|':
			case '(':
			case ')':
			case '{':
			case '}':
			case '[':
			case ']':
				rxp += "\\"; //fallthrough
			default:
				rxp += c;
		}
	}
	rxp += "$";
	if(ignoreCase){
		return new RegExp(rxp,"mi"); //RegExp
	}else{
		return new RegExp(rxp,"m"); //RegExp
	}

};

return filter;
});

},
'dijit/_WidgetsInTemplateMixin':function(){
define("dijit/_WidgetsInTemplateMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/parser", // parser.parse
	"dijit/registry"	// registry.findWidgets
], function(array, declare, parser, registry){

	// module:
	//		dijit/_WidgetsInTemplateMixin
	// summary:
	//		Mixin to supplement _TemplatedMixin when template contains widgets

	return declare("dijit._WidgetsInTemplateMixin", null, {
		// summary:
		//		Mixin to supplement _TemplatedMixin when template contains widgets

		// _earlyTemplatedStartup: Boolean
		//		A fallback to preserve the 1.0 - 1.3 behavior of children in
		//		templates having their startup called before the parent widget
		//		fires postCreate. Defaults to 'false', causing child widgets to
		//		have their .startup() called immediately before a parent widget
		//		.startup(), but always after the parent .postCreate(). Set to
		//		'true' to re-enable to previous, arguably broken, behavior.
		_earlyTemplatedStartup: false,

		// widgetsInTemplate: [protected] Boolean
		//		Should we parse the template to find widgets that might be
		//		declared in markup inside it?  (Remove for 2.0 and assume true)
		widgetsInTemplate: true,

		_beforeFillContent: function(){
			if(this.widgetsInTemplate){
				// Before copying over content, instantiate widgets in template
				var node = this.domNode;

				var cw = (this._startupWidgets = parser.parse(node, {
					noStart: !this._earlyTemplatedStartup,
					template: true,
					inherited: {dir: this.dir, lang: this.lang, textDir: this.textDir},
					propsThis: this,	// so data-dojo-props of widgets in the template can reference "this" to refer to me
					scope: "dojo"	// even in multi-version mode templates use dojoType/data-dojo-type
				}));

				this._supportingWidgets = registry.findWidgets(node);

				this._attachTemplateNodes(cw, function(n,p){
					return n[p];
				});
			}
		},

		startup: function(){
			array.forEach(this._startupWidgets, function(w){
				if(w && !w._started && w.startup){
					w.startup();
				}
			});
			this.inherited(arguments);
		}
	});
});

},
'url:idx/oneui/form/templates/TextBox.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'/\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n",
'idx/oneui/HoverHelpTooltip':function(){
require({cache:{
'url:idx/oneui/templates/HoverHelpTooltip.html':"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>"}});
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define("idx/oneui/HoverHelpTooltip", ["dojo/_base/declare", "dojo/_base/fx", // fx.fadeIn fx.fadeOut
 "dojo/keys", // keys
 "dojo/_base/array", // array.forEach array.indexOf array.map
 "dojo/dom", // dom.byId
 "dojo/_base/lang", // lang.hitch lang.isArrayLike
 "dojo/_base/sniff", // has("ie")
 "dijit/focus", "dojo/_base/event", // event.stop
 "dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
 "dijit/place", "dijit/a11y", // _getTabNavigable
 "dijit/BackgroundIframe", "dojo/dom-style", // domStyle.set, domStyle.get
 "dojo/_base/window", // win.body
 "dijit/_base/manager", // manager.defaultDuration
 "dijit/_Widget", "dijit/_TemplatedMixin", "dijit/Tooltip", "dojo/text!./templates/HoverHelpTooltip.html", "dijit/dijit", "dojo/i18n", "dojo/i18n!./nls/HoverHelpTooltip"], function(declare, fx, keys, array, dom, lang, has, dijitfocus, event, domGeometry, place, a11y, BackgroundIframe, domStyle, win, manager, _Widget, _TemplatedMixin, Tooltip, template, dijit, i18n){
    /**
     * @name idx.oneui.HoverHelpTooltip
     * @class HoverHelpTooltip provides pop-up information that displays when users hover the mouse pointer over an help indicator.
     * HoverHelpTooltip is implemented following the standard and specified IBM One UI(tm)
     * <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y20&vsub=*&hsub=*&openpanes=1111111111">Hover Help</a></b>
     * @augments dijit.Tooltip
     * @example
     &lt;span data-dojo-type="idx.oneui.HoverHelpTooltip" data-dojo-props='
     connectId:["anchor"],
     forceFocus: true,
     showLearnMore:true,
     learnMoreLinkValue:"http://www.ibm.com"'
     style="width: 300px"&gt;
     Passwords must be between 5 and 20 characters. There must be a combination of alphanumeric characters, starting with a letter and at least one number.&lt;br /&gt;&lt;br /&gt;
     &lt;/span&gt;
     * @see dijit.Tooltip
     **/
    var HoverHelpTooltip = declare("idx.oneui.HoverHelpTooltip", Tooltip, {
        /** @lends idx.oneui.HoverHelpTooltip.prototype */
         showDelay: 500,
        hideDelay: 800,
        /**
         * Whether to show Learn more link
         * @type Boolean
         */
        showLearnMore: false,
        /**
         * Learn more link value
         * @type String
         */
        learnMoreLinkValue: "#updateme",
        
        showCloseIcon: true,
        /**
         * Focus HoverHelpTooltip once it shown.
         * @type Boolean
         */
        forceFocus: true,
        
        _onHover: function(/*Event*/e){
            // summary:
            //		Despite the name of this method, it actually handles both hover and focus
            //		events on the target node, setting a timer to show the HoverHelpTooltip.
            // tags:
            //		private
            if (!HoverHelpTooltip._showTimer) {
                var target = e.target;
                HoverHelpTooltip._showTimer = setTimeout(lang.hitch(this, function(){
                    this.open(target)
                }), this.showDelay);
            }
            if (HoverHelpTooltip._hideTimer) {
                clearTimeout(HoverHelpTooltip._hideTimer);
                delete HoverHelpTooltip._hideTimer;
            }
        },
        
        _onUnHover: function(/*Event*/ /*===== e =====*/){
            // summary:
            //		Despite the name of this method, it actually handles both mouseleave and blur
            //		events on the target node, hiding the HoverHelpTooltip.
            // tags:
            //		private
            
            // keep a HoverHelpTooltip open if the associated element still has focus (even though the
            // mouse moved away)
            if (HoverHelpTooltip._showTimer) {
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
            if (!HoverHelpTooltip._hideTimer) {
                HoverHelpTooltip._hideTimer = setTimeout(lang.hitch(this, function(){
                    this.close()
                }), this.hideDelay);
            }
        },
        
        /**
         * Display the HoverHelpTooltip
         * @private
         */
        open: function(/*DomNode*/target){
            // summary:
            //		
            // tags:
            //		private
            if (HoverHelpTooltip._showTimer) {
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
            HoverHelpTooltip.show(
				this.label || this.domNode.innerHTML, 
				target, this.position, !this.isLeftToRight(), 
				this.textDir, this.showLearnMore, this.learnMoreLinkValue, 
				this.showCloseIcon, this.forceFocus);
            this._connectNode = target;
            this.onShow(target, this.position);
        },
		
        close: function(){
            // summary:
            //		Hide the tooltip or cancel timer for show of tooltip
            // tags:
            //		private
            if (this._connectNode) {
                // if tooltip is currently shown
                HoverHelpTooltip.hide(this._connectNode);
                delete this._connectNode;
                this.onHide();
            }
            if (HoverHelpTooltip._showTimer) {
                // if tooltip is scheduled to be shown (after a brief delay)
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
        },
        _setConnectIdAttr: function(/*String|String[]*/newId){
            // summary:
            //		Connect to specified node(s)
            
            // Remove connections to old nodes (if there are any)
            array.forEach(this._connections || [], function(nested){
                array.forEach(nested, lang.hitch(this, "disconnect"));
            }, this);
            
            // Make array of id's to connect to, excluding entries for nodes that don't exist yet, see startup()
            this._connectIds = array.filter(lang.isArrayLike(newId) ? newId : (newId ? [newId] : []), function(id){
                return dom.byId(id);
            });
            
            // Make connections
            this._connections = array.map(this._connectIds, function(id){
                var node = dom.byId(id);
                return [
					this.connect(node, "onmouseenter", "_onHover"),
					this.connect(node, "onmouseleave", "_onUnHover"), 
					this.connect(node, "onclick", "_onHover"),
					this.connect(node, "onkeypress", "_onConnectIdKey")
				];
            }, this);
            
            this._set("connectId", newId);
        },
        _onConnectIdKey: function(/*Event*/evt){
            // summary:
            //		Handler for keyboard events
            // description:
            // tags:
            //		private
            var node = evt.target;
            
            if (evt.charOrCode == keys.ENTER || evt.charOrCode == keys.SPACE || evt.charOrCode == " " || evt.charOrCode == keys.F1) {
                // Use setTimeout to avoid crash on IE, see #10396.
                HoverHelpTooltip._showTimer = setTimeout(lang.hitch(this, function(){
                    this.open(node)
                }), this.showDelay);
                
                event.stop(evt);
            }
        }
        
    });
    
    var MasterHoverHelpTooltip = declare("idx.oneui._MasterHoverHelpTooltip", [_Widget, _TemplatedMixin], {
		/**
		 * Milliseconds to fade in/fade out
		 * @type Integer
		 */
        duration: manager.defaultDuration,
        
        templateString: template,
		
        learnMoreLabel: "",
        
        /**
         * draggable: Boolean
         *		Toggles the moveable aspect of the HoverHelpTooltip. If true, HoverHelpTooltip
         *		can be dragged by it's grippy bar. If false it will remain positioned
         *		relative to the attached node
         *		@type boolean
         **/
        draggable: true,
        
        _firstFocusItem: null,
		
        _lastFocusItem: null,
        
        postMixInProperties: function(){
            this.learnMoreLabel = i18n.getLocalization("idx.oneui", "HoverHelpTooltip", this.lang).learnMoreLabel;
        },
        postCreate: function(){
            win.body().appendChild(this.domNode);
            
            this.bgIframe = new BackgroundIframe(this.domNode);
            
            // Setup fade-in and fade-out functions.
            this.fadeIn = fx.fadeIn({
                node: this.domNode,
                duration: this.duration,
                onEnd: lang.hitch(this, "_onShow")
            });
            this.fadeOut = fx.fadeOut({
                node: this.domNode,
                duration: this.duration,
                onEnd: lang.hitch(this, "_onHide")
            });
            this.connect(this.domNode, "onkeypress", "_onKey");
            this.connect(this.domNode, "onmouseenter", lang.hitch(this, function(e){
				if(HoverHelpTooltip._hideTimer) {
	                clearTimeout(HoverHelpTooltip._hideTimer);
	                delete HoverHelpTooltip._hideTimer;
	            }
				this.focus();
                this._keepShowing = true;
				this.fadeOut.stop();
				this.fadeIn.play();
            }));
			this.connect(this.domNode, "onmouseleave", lang.hitch(this, function(e){
				this._keepShowing = false;
				HoverHelpTooltip._hideTimer = setTimeout(lang.hitch(this, function(){this.hide(this.aroundNode)}), 800);
			}));
        },
        show: function(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, learnMoreLinkValue, showCloseIcon, forceFocus){
			this._lastFocusNode = dijitfocus.curNode;
            if (showLearnMore) {
                this.learnMoreNode.style.display = "inline";
                this.learnMoreNode.href = learnMoreLinkValue;
            }
            else {
                this.learnMoreNode.style.display = "none";
            }
            if (showCloseIcon || showCloseIcon == null) 
                this.closeButtonNode.style.display = "inline";
            else {
                this.closeButtonNode.style.display = "none";
            }
            //in case connectorNode was hidden on a previous call to hide
            this.connectorNode.hidden = false;
            
            if (this.aroundNode && this.aroundNode === aroundNode && this.containerNode.innerHTML == innerHTML) {
                return;
            }
            
            
            // reset width; it may have been set by orient() on a previous HoverHelpTooltip show()
            this.domNode.width = "auto";
            
            if (this.fadeOut.status() == "playing") {
                // previous HoverHelpTooltip is being hidden; wait until the hide completes then show new one
                this._onDeck = arguments;
                return;
            }
            
            this.containerNode.innerHTML = innerHTML;
            
            this.set("textDir", textDir);
            this.containerNode.align = rtl ? "right" : "left"; //fix the text alignment
            var pos = place.around(this.domNode, aroundNode, position && position.length ? position : HoverHelpTooltip.defaultPosition, !rtl, lang.hitch(this, "orient"));
            
            // Position the HoverHelpTooltip connector for middle alignment.
            // This could not have been done in orient() since the HoverHelpTooltip wasn't positioned at that time.
            var aroundNodeCoords = pos.aroundNodePos;
            if (pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M') {
                this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
                this.connectorNode.style.left = "";
            }
            else 
                if (pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M') {
                    this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
                }
            // show it
            domStyle.set(this.domNode, "opacity", 0);
            this.fadeIn.play();
            this.isShowingNow = true;
            this.aroundNode = aroundNode;
			if (forceFocus) {
                this.focus();
            }
        },
        
        
        orient: function(/*DomNode*/node, /*String*/ aroundCorner, /*String*/ HoverHelpTooltipCorner, /*Object*/ spaceAvailable, /*Object*/ aroundNodeCoords){
            // summary:
            //		Private function to set CSS for HoverHelpTooltip node based on which position it's in.
            //		This is called by the dijit popup code.   It will also reduce the HoverHelpTooltip's
            //		width to whatever width is available
            // tags:
            //		protected
            this.connectorNode.style.top = ""; //reset to default
            //Adjust the spaceAvailable width, without changing the spaceAvailable object
            var HoverHelpTooltipSpaceAvaliableWidth = spaceAvailable.w - this.connectorNode.offsetWidth;
            
            node.className = "idxOneuiHoverHelpTooltip " +
            {
                "MR-ML": "idxOneuiHoverHelpTooltipRight",
                "ML-MR": "idxOneuiHoverHelpTooltipLeft",
                "TM-BM": "idxOneuiHoverHelpTooltipAbove",
                "BM-TM": "idxOneuiHoverHelpTooltipBelow",
                "BL-TL": "idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft",
                "TL-BL": "idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft",
                "BR-TR": "idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight",
                "TR-BR": "idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight",
                "BR-BL": "idxOneuiHoverHelpTooltipRight",
                "BL-BR": "idxOneuiHoverHelpTooltipLeft",
                "TR-TL": "idxOneuiHoverHelpTooltipRight"
            }[aroundCorner + "-" + HoverHelpTooltipCorner];
            
            // reduce HoverHelpTooltip's width to the amount of width available, so that it doesn't overflow screen
            this.domNode.style.width = "auto";
            var size = domGeometry.getContentBox(this.domNode);
            
            var width = Math.min((Math.max(HoverHelpTooltipSpaceAvaliableWidth, 1)), size.w);
            var widthWasReduced = width < size.w;
            
            this.domNode.style.width = width + "px";
            
            //Adjust width for HoverHelpTooltips that have a really long word or a nowrap setting
            if (widthWasReduced) {
                this.containerNode.style.overflow = "auto"; //temp change to overflow to detect if our HoverHelpTooltip needs to be wider to support the content
                var scrollWidth = this.containerNode.scrollWidth;
                this.containerNode.style.overflow = "visible"; //change it back
                if (scrollWidth > width) {
                    scrollWidth = scrollWidth + domStyle.get(this.domNode, "paddingLeft") + domStyle.get(this.domNode, "paddingRight");
                    this.domNode.style.width = scrollWidth + "px";
                }
            }
            
            // Reposition the HoverHelpTooltip connector.
            if (HoverHelpTooltipCorner.charAt(0) == 'B' && aroundCorner.charAt(0) == 'B') {
                var mb = domGeometry.getMarginBox(node);
                var HoverHelpTooltipConnectorHeight = this.connectorNode.offsetHeight;
                if (mb.h > spaceAvailable.h) {
                    // The HoverHelpTooltip starts at the top of the page and will extend past the aroundNode
                    var aroundNodePlacement = spaceAvailable.h - ((aroundNodeCoords.h + HoverHelpTooltipConnectorHeight) >> 1);
                    this.connectorNode.style.top = aroundNodePlacement + "px";
                    this.connectorNode.style.bottom = "";
                }
                else {
                    // Align center of connector with center of aroundNode, except don't let bottom
                    // of connector extend below bottom of HoverHelpTooltip content, or top of connector
                    // extend past top of HoverHelpTooltip content
                    this.connectorNode.style.bottom = Math.min(Math.max(aroundNodeCoords.h / 2 - HoverHelpTooltipConnectorHeight / 2, 0), mb.h - HoverHelpTooltipConnectorHeight) +
                    "px";
                    this.connectorNode.style.top = "";
                }
            }
            else {
                // reset the HoverHelpTooltip back to the defaults
                this.connectorNode.style.top = "";
                this.connectorNode.style.bottom = "";
            }
            
            return Math.max(0, size.w - HoverHelpTooltipSpaceAvaliableWidth);
        },
        
        focus: function(){
			if(this._focus){return;}
            this._getFocusItems(this.outerContainerNode);
            this._focus = true;
            dijitfocus.focus(this._firstFocusItem);
        },
        
        _onShow: function(){
            // summary:
            //		Called at end of fade-in operation
            // tags:
            //		protected
            if (has("ie")) {
                // the arrow won't show up on a node w/an opacity filter
                this.domNode.style.filter = "";
            }
        },
        
        hide: function(aroundNode){
            // summary:
            //		Hide the HoverHelpTooltip
            if(this._keepShowing){this._keepShowing = false; return;}
            if (this._onDeck && this._onDeck[1] == aroundNode) {
            
                // this hide request is for a show() that hasn't even started yet;
                // just cancel the pending show()
                this._onDeck = null;
            }
            else if(this.aroundNode === aroundNode || this.isShowingNow){
                    // this hide request is for the currently displayed HoverHelpTooltip
                    this._forceHide();
                }
        },
        hideOnClickClose: function(){
            // summary:
            //		Hide the HoverHelpTooltip
            // this hide request is for the currently displayed HoverHelpTooltip            
            this._forceHide();
        },
        _forceHide: function(){
            dijitfocus.focus(this._lastFocusNode);
			this._lastFocusNode = null;
			this._firstFocusItem = null;
			this._lastFocusItem = null;
            this._focus = false;
            this.fadeIn.stop();
            this.isShowingNow = false;
            this.fadeOut.play();
        },
        _getFocusItems: function(){
            // summary:
            //		Finds focusable items in dialog,
            //		and sets this._firstFocusItem and this._lastFocusItem
            // tags:
            //		protected
			if(this._firstFocusItem){
				this._firstFocusItem = this.closeButtonNode;
				return;
			}
			this._firstFocusItem = this.containerNode;
			if(domStyle.get(this.learnMoreNode, "display") == "none"){
				var elems = a11y._getTabNavigable(this.containerNode);
				this._lastFocusItem = elems.last || elems.highest || this.containerNode;
			}else{
				this._lastFocusItem = this.learnMoreNode;
			}
        },
        _onKey: function(/*Event*/evt){
            // summary:
            //		Handler for keyboard events
            // description:
            // tags:
            //		private
            
            var node = evt.target;
            if (evt.charOrCode === keys.TAB) {
                this._getFocusItems(this.outerContainerNode);
            }
            var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
            if (evt.charOrCode == keys.ESCAPE) {
                // Use setTimeout to avoid crash on IE, see #10396.
                setTimeout(lang.hitch(this, "hideOnClickClose"), 0);
                event.stop(evt);
            }
            else 
                if (node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === keys.TAB) {
                    if (!singleFocusItem) {
                        dijitfocus.focus(this._lastFocusItem); // send focus to last item in dialog
                    }
                    event.stop(evt);
                }
                else 
                    if (node == this._lastFocusItem && evt.charOrCode === keys.TAB && !evt.shiftKey) {
                        if (!singleFocusItem) {
                            dijitfocus.focus(this._firstFocusItem); // send focus to first item in dialog
                        }
                        event.stop(evt);
                    }
                    else 
                        if (evt.charOrCode === keys.TAB) {
                            // we want the browser's default tab handling to move focus
                            // but we don't want the tab to propagate upwards
                            evt.stopPropagation();
                        }
        },
        _onHide: function(){
            // summary:
            //		Called at end of fade-out operation
            // tags:
            //		protected
            
            this.domNode.style.cssText = ""; // to position offscreen again
            this.containerNode.innerHTML = "";
            if (this._onDeck) {
                // a show request has been queued up; do it now
                this.show.apply(this, this._onDeck);
                this._onDeck = null;
            }
			this.aroundNode = null;
        },
        onBlur: function(){
            this._forceHide();
        },
        _setAutoTextDir: function(/*Object*/node){
            // summary:
            //	    Resolve "auto" text direction for children nodes
            // tags:
            //		private
            
            this.applyTextDir(node, has("ie") ? node.outerText : node.textContent);
            array.forEach(node.children, function(child){
                this._setAutoTextDir(child);
            }, this);
        },
        
        _setTextDirAttr: function(/*String*/textDir){
            // summary:
            //		Setter for textDir.
            // description:
            //		Users shouldn't call this function; they should be calling
            //		set('textDir', value)
            // tags:
            //		private
            
            this._set("textDir", typeof textDir != 'undefined' ? textDir : "");
            if (textDir == "auto") {
                this._setAutoTextDir(this.containerNode);
            }
            else {
                this.containerNode.dir = this.textDir;
            }
        }
    }); //end declare
    //    var MasterHoverHelpTooltip = Tooltip._MasterTooltip;
    
    HoverHelpTooltip._MasterHoverHelpTooltip = MasterHoverHelpTooltip; // for monkey patching
    // summary:
    //		Static method to display HoverHelpTooltip w/specified contents in specified position.
    //		See description of idx.oneui.HoverHelpTooltip.defaultPosition for details on position parameter.
    //		If position is not specified then idx.oneui.HoverHelpTooltip.defaultPosition is used.
    // innerHTML: String
    //		Contents of the HoverHelpTooltip
    // aroundNode: dijit.__Rectangle
    //		Specifies that HoverHelpTooltip should be next to this node / area
    // position: String[]?
    //		List of positions to try to position HoverHelpTooltip (ex: ["right", "above"])
    // rtl: Boolean?
    //		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
    //		means "rtl"; specifies GUI direction, not text direction.
    // textDir: String?
    //		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.	
    HoverHelpTooltip.show = idx.oneui.showHoverHelpTooltip = function(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, learnMoreLinkValue, showCloseIcon, forceFocus){
    
        if (!HoverHelpTooltip._masterTT) {
            idx.oneui._masterTT = HoverHelpTooltip._masterTT = new MasterHoverHelpTooltip();
        }
        return HoverHelpTooltip._masterTT.show(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, learnMoreLinkValue, showCloseIcon, forceFocus);
    };
    
    // summary:
    //		Static method to hide the HoverHelpTooltip displayed via showHoverHelpTooltip()
    HoverHelpTooltip.hide = idx.oneui.hideHoverHelpTooltip = function(aroundNode){
    
        return HoverHelpTooltip._masterTT && HoverHelpTooltip._masterTT.hide(aroundNode);
    };
    
    HoverHelpTooltip.defaultPosition = ["after-centered", "before-centered", "below", "above"];
    
    
    return HoverHelpTooltip;
});

},
'dijit/form/FilteringSelect':function(){
define("dijit/form/FilteringSelect", [
	"dojo/data/util/filter", // filter.patternToRegExp
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred", // Deferred.when
	"dojo/_base/lang", // lang.mixin
	"./MappedTextBox",
	"./ComboBoxMixin"
], function(filter, declare, Deferred, lang, MappedTextBox, ComboBoxMixin){

/*=====
	var MappedTextBox = dijit.form.MappedTextBox;
	var ComboBoxMixin = dijit.form.ComboBoxMixin;
=====*/

	// module:
	//		dijit/form/FilteringSelect
	// summary:
	//		An enhanced version of the HTML SELECT tag, populated dynamically


	return declare("dijit.form.FilteringSelect", [MappedTextBox, ComboBoxMixin], {
		// summary:
		//		An enhanced version of the HTML SELECT tag, populated dynamically
		//
		// description:
		//		An enhanced version of the HTML SELECT tag, populated dynamically. It works
		//		very nicely with very large data sets because it can load and page data as needed.
		//		It also resembles ComboBox, but does not allow values outside of the provided ones.
		//		If OPTION tags are used as the data provider via markup, then the
		//		OPTION tag's child text node is used as the displayed value when selected
		//		while the OPTION tag's value attribute is used as the widget value on form submit.
		//		To set the default value when using OPTION tags, specify the selected
		//		attribute on 1 of the child OPTION tags.
		//
		//		Similar features:
		//			- There is a drop down list of possible values.
		//			- You can only enter a value from the drop down list.  (You can't
		//				enter an arbitrary value.)
		//			- The value submitted with the form is the hidden value (ex: CA),
		//				not the displayed value a.k.a. label (ex: California)
		//
		//		Enhancements over plain HTML version:
		//			- If you type in some text then it will filter down the list of
		//				possible values in the drop down list.
		//			- List can be specified either as a static list or via a javascript
		//				function (that can get the list from a server)

		// required: Boolean
		//		True (default) if user is required to enter a value into this field.
		required: true,

		_lastDisplayedValue: "",

		_isValidSubset: function(){
			return this._opened;
		},

		isValid: function(){
			// Overrides ValidationTextBox.isValid()
			return !!this.item || (!this.required && this.get('displayedValue') == ""); // #5974
		},

		_refreshState: function(){
			if(!this.searchTimer){ // state will be refreshed after results are returned
				this.inherited(arguments);
			}
		},

		_callbackSetLabel: function(
						/*Array*/ result,
						/*Object*/ query,
						/*Object*/ options,
						/*Boolean?*/ priorityChange){
			// summary:
			//		Callback from dojo.store after lookup of user entered value finishes

			// setValue does a synchronous lookup,
			// so it calls _callbackSetLabel directly,
			// and so does not pass dataObject
			// still need to test against _lastQuery in case it came too late
			if((query && query[this.searchAttr] !== this._lastQuery) || (!query && result.length && this.store.getIdentity(result[0]) != this._lastQuery)){
				return;
			}
			if(!result.length){
				//#3268: don't modify display value on bad input
				//#3285: change CSS to indicate error
				this.set("value", '', priorityChange || (priorityChange === undefined && !this.focused), this.textbox.value, null);
			}else{
				this.set('item', result[0], priorityChange);
			}
		},

		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			// Callback when a data store query completes.
			// Overrides ComboBox._openResultList()

			// #3285: tap into search callback to see if user's query resembles a match
			if(query[this.searchAttr] !== this._lastQuery){
				return;
			}
			this.inherited(arguments);

			if(this.item === undefined){ // item == undefined for keyboard search
				// If the search returned no items that means that the user typed
				// in something invalid (and they can't make it valid by typing more characters),
				// so flag the FilteringSelect as being in an invalid state
				this.validate(true);
			}
		},

		_getValueAttr: function(){
			// summary:
			//		Hook for get('value') to work.

			// don't get the textbox value but rather the previously set hidden value.
			// Use this.valueNode.value which isn't always set for other MappedTextBox widgets until blur
			return this.valueNode.value;
		},

		_getValueField: function(){
			// Overrides ComboBox._getValueField()
			return "value";
		},

		_setValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the select.
			//		Also sets the label to the corresponding value by reverse lookup.
			if(!this._onChangeActive){ priorityChange = null; }

			if(item === undefined){
				if(value === null || value === ''){
					value = '';
					if(!lang.isString(displayedValue)){
						this._setDisplayedValueAttr(displayedValue||'', priorityChange);
						return;
					}
				}

				var self = this;
				this._lastQuery = value;
				Deferred.when(this.store.get(value), function(item){
					self._callbackSetLabel(item? [item] : [], undefined, undefined, priorityChange);
				});
			}else{
				this.valueNode.value = value;
				this.inherited(arguments);
			}
		},

		_setItemAttr: function(/*item*/ item, /*Boolean?*/ priorityChange, /*String?*/ displayedValue){
			// summary:
			//		Set the displayed valued in the input box, and the hidden value
			//		that gets submitted, based on a dojo.data store item.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('item', value)
			// tags:
			//		private
			this.inherited(arguments);
			this._lastDisplayedValue = this.textbox.value;
		},

		_getDisplayQueryString: function(/*String*/ text){
			return text.replace(/([\\\*\?])/g, "\\$1");
		},

		_setDisplayedValueAttr: function(/*String*/ label, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('displayedValue', label) works.
			// description:
			//		Sets textbox to display label. Also performs reverse lookup
			//		to set the hidden value.  label should corresponding to item.searchAttr.

			if(label == null){ label = ''; }

			// This is called at initialization along with every custom setter.
			// Usually (or always?) the call can be ignored.   If it needs to be
			// processed then at least make sure that the XHR request doesn't trigger an onChange()
			// event, even if it returns after creation has finished
			if(!this._created){
				if(!("displayedValue" in this.params)){
					return;
				}
				priorityChange = false;
			}

			// Do a reverse lookup to map the specified displayedValue to the hidden value.
			// Note that if there's a custom labelFunc() this code
			if(this.store){
				this.closeDropDown();
				var query = lang.clone(this.query); // #6196: populate query with user-specifics

				// Generate query
				var qs = this._getDisplayQueryString(label), q;
				if(this.store._oldAPI){
					// remove this branch for 2.0
					q = qs;
				}else{
					// Query on searchAttr is a regex for benefit of dojo.store.Memory,
					// but with a toString() method to help dojo.store.JsonRest.
					// Search string like "Co*" converted to regex like /^Co.*$/i.
					q = filter.patternToRegExp(qs, this.ignoreCase);
					q.toString = function(){ return qs; };
				}
				this._lastQuery = query[this.searchAttr] = q;

				// If the label is not valid, the callback will never set it,
				// so the last valid value will get the warning textbox.   Set the
				// textbox value now so that the impending warning will make
				// sense to the user
				this.textbox.value = label;
				this._lastDisplayedValue = label;
				this._set("displayedValue", label);	// for watch("displayedValue") notification
				var _this = this;
				var options = {
					ignoreCase: this.ignoreCase,
					deep: true
				};
				lang.mixin(options, this.fetchProperties);
				this._fetchHandle = this.store.query(query, options);
				Deferred.when(this._fetchHandle, function(result){
					_this._fetchHandle = null;
					_this._callbackSetLabel(result || [], query, options, priorityChange);
				}, function(err){
					_this._fetchHandle = null;
					if(!_this._cancelingQuery){	// don't treat canceled query as an error
						console.error('dijit.form.FilteringSelect: ' + err.toString());
					}
				});
			}
		},

		undo: function(){
			this.set('displayedValue', this._lastDisplayedValue);
		}
	});
});

},
'dijit/form/_ButtonMixin':function(){
define("dijit/form/_ButtonMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/_base/event", // event.stop
	"../registry"		// registry.byNode
], function(declare, dom, event, registry){

// module:
//		dijit/form/_ButtonMixin
// summary:
//		A mixin to add a thin standard API wrapper to a normal HTML button

return declare("dijit.form._ButtonMixin", null, {
	// summary:
	//		A mixin to add a thin standard API wrapper to a normal HTML button
	// description:
	//		A label should always be specified (through innerHTML) or the label attribute.
	//		Attach points:
	//			focusNode (required): this node receives focus
	//			valueNode (optional): this node's value gets submitted with FORM elements
	//			containerNode (optional): this node gets the innerHTML assignment for label
	// example:
	// |	<button data-dojo-type="dijit.form.Button" onClick="...">Hello world</button>
	//
	// example:
	// |	var button1 = new dijit.form.Button({label: "hello world", onClick: foo});
	// |	dojo.body().appendChild(button1.domNode);

	// label: HTML String
	//		Content to display in button.
	label: "",

	// type: [const] String
	//		Type of button (submit, reset, button, checkbox, radio)
	type: "button",

	_onClick: function(/*Event*/ e){
		// summary:
		//		Internal function to handle click actions
		if(this.disabled){
			event.stop(e);
			return false;
		}
		var preventDefault = this.onClick(e) === false; // user click actions
		if(!preventDefault && this.type == "submit" && !(this.valueNode||this.focusNode).form){ // see if a non-form widget needs to be signalled
			for(var node=this.domNode; node.parentNode; node=node.parentNode){
				var widget=registry.byNode(node);
				if(widget && typeof widget._onSubmit == "function"){
					widget._onSubmit(e);
					preventDefault = true;
					break;
				}
			}
		}
		if(preventDefault){
			e.preventDefault();
		}
		return !preventDefault;
	},

	postCreate: function(){
		this.inherited(arguments);
		dom.setSelectable(this.focusNode, false);
	},

	onClick: function(/*Event*/ /*===== e =====*/){
		// summary:
		//		Callback for when button is clicked.
		//		If type="submit", return true to perform submit, or false to cancel it.
		// type:
		//		callback
		return true;		// Boolean
	},

	_setLabelAttr: function(/*String*/ content){
		// summary:
		//		Hook for set('label', ...) to work.
		// description:
		//		Set the label (text) of the button; takes an HTML string.
		this._set("label", content);
		(this.containerNode||this.focusNode).innerHTML = content;
	}
});

});

},
'dijit/registry':function(){
define("dijit/registry", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window", // win.body
	"."	// dijit._scopeName
], function(array, has, unload, win, dijit){

	// module:
	//		dijit/registry
	// summary:
	//		Registry of existing widget on page, plus some utility methods.
	//		Must be accessed through AMD api, ex:
	//		require(["dijit/registry"], function(registry){ registry.byId("foo"); })

	var _widgetTypeCtr = {}, hash = {};

	var registry =  {
		// summary:
		//		A set of widgets indexed by id

		length: 0,

		add: function(/*dijit._Widget*/ widget){
			// summary:
			//		Add a widget to the registry. If a duplicate ID is detected, a error is thrown.
			//
			// widget: dijit._Widget
			//		Any dijit._Widget subclass.
			if(hash[widget.id]){
				throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
			}
			hash[widget.id] = widget;
			this.length++;
		},

		remove: function(/*String*/ id){
			// summary:
			//		Remove a widget from the registry. Does not destroy the widget; simply
			//		removes the reference.
			if(hash[id]){
				delete hash[id];
				this.length--;
			}
		},

		byId: function(/*String|Widget*/ id){
			// summary:
			//		Find a widget by it's id.
			//		If passed a widget then just returns the widget.
			return typeof id == "string" ? hash[id] : id;	// dijit._Widget
		},

		byNode: function(/*DOMNode*/ node){
			// summary:
			//		Returns the widget corresponding to the given DOMNode
			return hash[node.getAttribute("widgetId")]; // dijit._Widget
		},

		toArray: function(){
			// summary:
			//		Convert registry into a true Array
			//
			// example:
			//		Work with the widget .domNodes in a real Array
			//		|	array.map(dijit.registry.toArray(), function(w){ return w.domNode; });

			var ar = [];
			for(var id in hash){
				ar.push(hash[id]);
			}
			return ar;	// dijit._Widget[]
		},

		getUniqueId: function(/*String*/widgetType){
			// summary:
			//		Generates a unique id for a given widgetType

			var id;
			do{
				id = widgetType + "_" +
					(widgetType in _widgetTypeCtr ?
						++_widgetTypeCtr[widgetType] : _widgetTypeCtr[widgetType] = 0);
			}while(hash[id]);
			return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id; // String
		},

		findWidgets: function(/*DomNode*/ root){
			// summary:
			//		Search subtree under root returning widgets found.
			//		Doesn't search for nested widgets (ie, widgets inside other widgets).

			var outAry = [];

			function getChildrenHelper(root){
				for(var node = root.firstChild; node; node = node.nextSibling){
					if(node.nodeType == 1){
						var widgetId = node.getAttribute("widgetId");
						if(widgetId){
							var widget = hash[widgetId];
							if(widget){	// may be null on page w/multiple dojo's loaded
								outAry.push(widget);
							}
						}else{
							getChildrenHelper(node);
						}
					}
				}
			}

			getChildrenHelper(root);
			return outAry;
		},

		_destroyAll: function(){
			// summary:
			//		Code to destroy all widgets and do other cleanup on page unload

			// Clean up focus manager lingering references to widgets and nodes
			dijit._curFocus = null;
			dijit._prevFocus = null;
			dijit._activeStack = [];

			// Destroy all the widgets, top down
			array.forEach(registry.findWidgets(win.body()), function(widget){
				// Avoid double destroy of widgets like Menu that are attached to <body>
				// even though they are logically children of other widgets.
				if(!widget._destroyed){
					if(widget.destroyRecursive){
						widget.destroyRecursive();
					}else if(widget.destroy){
						widget.destroy();
					}
				}
			});
		},

		getEnclosingWidget: function(/*DOMNode*/ node){
			// summary:
			//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
			//		the node is not contained within the DOM tree of any widget
			while(node){
				var id = node.getAttribute && node.getAttribute("widgetId");
				if(id){
					return hash[id];
				}
				node = node.parentNode;
			}
			return null;
		},

		// In case someone needs to access hash.
		// Actually, this is accessed from WidgetSet back-compatibility code
		_hash: hash
	};

	/*=====
	dijit.registry = {
		// summary:
		//		A list of widgets on a page.
	};
	=====*/
	dijit.registry = registry;

	return registry;
});

},
'curam/layout/TabContainer':function(){
require({cache:{
'url:curam/layout/resources/TabContainer.html':"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
/*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Curam Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/**
 * @name curam.layout.TabContainer
 * @namespace Customized dijit.layout.TabContainer class in order to change the
 * behavior when a tab is closed.
 */
define("curam/layout/TabContainer", ["dijit/layout/TabContainer",
        "dojo/text!curam/layout/resources/TabContainer.html"
        ], function(TabContainer, template) {
        
/*
 * Modification History
 * --------------------
 * 24-Oct-2012  SK  [CR00346419] Now destroys the unnecessary references to avoid
 *                    holding memory.
 * 09-Aug-2012  MV  [CR00337714] Load HTML template using the new mechanism. 
 * 31-Jul-2012  MV  [CR00336202] Migrate to take on Dojo 1.7.3
 * 02-May-2012  MK  [CR00323691] Use new Dojo AMD format. 
 * 17-Dec-2010  DG  [CR00239200] Do not select tabs when destroying container.
 * 29-Sep-2010  MK  [CR00221781] Revised to change tab by responding to
 *                    the onRemoveChild event.
 * 03-Aug-2010  MK  [CR00211743] Initial Version.
 */
 
var CuramTabContainer = dojo.declare("curam.layout.TabContainer", TabContainer,
  /**
   * @lends curam.layout.TabContainer
   */
{
  // The "dijitAlingTop" CSS class has been added to the "tablistSpacer" div in the template string.
  // The template string is actually defined in _TabContainerBase.js. No information on why this is needed
  // but it is obviously it was an alignment issue with the ootb Dojo widget. However, it "looks wrong".
  // If there was a bug with the ootb alignment (e.g. it didn't align to the center), then we should have fixed that
  // instaead of using "dijitAlignTop" to "push up" the contents to the center. It sounds to me like we are using
  // "align top" to make something "align center" !! Needs more investigation.  
  templateString: template,
  
  /**
   * The index of the currently selected tab.
   * @private
   */
  _theSelectedTabIndex: 0,

  /**
   * The page associated with the currently selected tab.
   * @private
   */
  _thePage: null,

  /**
   * The list of tabs.
   * @private
   */
  _theChildren: null,

  /**
   * Override of the superclass method in order to connect
   * the _changeTab function to the onRemoveChild event.
   */
  postCreate: function() {
    this.inherited(arguments);
    var tl = this.tablist;
    this.connect(tl, 'onRemoveChild', '_changeTab');
  },

  /**
    * This method implements the Curam specific behavior to
    * be executed when a tab is closed.
    *
    * @private
    */
  _changeTab: function(){
    // Do not do anything if the tab container is being destroyed. The tabs
    // will be removed one-by-one and we do not want to accidentally trigger
    // any unwanted selection events that might break tab session management.
    if (this._beingDestroyed) {
      this._thePage = null;
      this._theChildren = null;
      return;
    }
    if (this._theChildren == null) {
      return;
    }
    // if the tab currently being closed is not the one in display
    // then we don't want to change focus
    if (this._theChildren[this._theSelectedTabIndex] != this._thePage) {
      this.selectChild(this._theChildren[this._theSelectedTabIndex]);
      this._thePage = null;
      this._theChildren = null;
      return;
    }

    // display correct tab.
    if (this._theChildren.length < 1 ) { // no tabs open
      this._thePage = null;
      return;
    } else if (this._theChildren.length == 1 ) { // only one tab open
      this.selectChild(this._theChildren[this._theChildren.length-1]);
      this._thePage = null;
      this._theChildren = null;
    } else { // more than one tab open

      if (this._theSelectedTabIndex == (this._theChildren.length - 1)){
        // closing the right most tab
        this.selectChild(this._theChildren[this._theChildren.length-2]);

      } else if (this._theSelectedTabIndex == 0) {
        // closing the left most tab
       this.selectChild(this._theChildren[1]);

      } else {
        // closing a tab that is neither the left or right most tab
        // we can be guaranteed there is at least three tabs
        if (this._theChildren.length > 2) {
          this.selectChild(this._theChildren[this._theSelectedTabIndex + 1]);
        }
      }
      this._thePage = null;
      this._theChildren = null;
    }
  },

  /**
   * Override of the parent method.
   */
  removeChild: function(/*dijit._Widget*/ page){
    // Overrides dijit.layout.TabContainer.removeChild()

    // Do not do anything if the tab container is being destroyed. The tabs
    // will be removed one-by-one and we do not want to accidentally trigger
    // any unwanted selection events that might break tab session management.
    if (this._started && !this._beingDestroyed) {
      // find the index of the selected tab
      // need to find this before the call to inherited as the call to
      // inherited reset the selected tab.
      var children = this.getChildren();
      var i = 0;
      var selectedTabIndex = 0;
      for (i = 0; i < children.length; i++){
        if (children[i].get('selected')) {
          selectedTabIndex = i;
          break;
        }
      }

      // store the values so that they will be accessible by
      // _changeTab method when it responds to the firing.
      // of the onRemoveChild event
      this._theSelectedTabIndex = selectedTabIndex;
      this._thePage = page;
      this._theChildren = children;
    }

    // Call the superclass. It can handle destruction cleanly on its own.
    this.inherited(arguments);
  }
});

return CuramTabContainer;
});
},
'dijit/_base/wai':function(){
define("dijit/_base/wai", [
	"dojo/dom-attr", // domAttr.attr
	"dojo/_base/lang", // lang.mixin
	"..",	// export symbols to dijit
	"../hccss"			// not using this module directly, but loading it sets CSS flag on <html>
], function(domAttr, lang, dijit){

	// module:
	//		dijit/_base/wai
	// summary:
	//		Deprecated methods for setting/getting wai roles and states.
	//		New code should call setAttribute()/getAttribute() directly.
	//
	//		Also loads hccss to apply dijit_a11y class to root node if machine is in high-contrast mode.

	lang.mixin(dijit, {
		hasWaiRole: function(/*Element*/ elem, /*String?*/ role){
			// summary:
			//		Determines if an element has a particular role.
			// returns:
			//		True if elem has the specific role attribute and false if not.
			// 		For backwards compatibility if role parameter not provided,
			// 		returns true if has a role
			var waiRole = this.getWaiRole(elem);
			return role ? (waiRole.indexOf(role) > -1) : (waiRole.length > 0);
		},

		getWaiRole: function(/*Element*/ elem){
			// summary:
			//		Gets the role for an element (which should be a wai role).
			// returns:
			//		The role of elem or an empty string if elem
			//		does not have a role.
			 return lang.trim((domAttr.get(elem, "role") || "").replace("wairole:",""));
		},

		setWaiRole: function(/*Element*/ elem, /*String*/ role){
			// summary:
			//		Sets the role on an element.
			// description:
			//		Replace existing role attribute with new role.

			domAttr.set(elem, "role", role);
		},

		removeWaiRole: function(/*Element*/ elem, /*String*/ role){
			// summary:
			//		Removes the specified role from an element.
			// 		Removes role attribute if no specific role provided (for backwards compat.)

			var roleValue = domAttr.get(elem, "role");
			if(!roleValue){ return; }
			if(role){
				var t = lang.trim((" " + roleValue + " ").replace(" " + role + " ", " "));
				domAttr.set(elem, "role", t);
			}else{
				elem.removeAttribute("role");
			}
		},

		hasWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Determines if an element has a given state.
			// description:
			//		Checks for an attribute called "aria-"+state.
			// returns:
			//		true if elem has a value for the given state and
			//		false if it does not.

			return elem.hasAttribute ? elem.hasAttribute("aria-"+state) : !!elem.getAttribute("aria-"+state);
		},

		getWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Gets the value of a state on an element.
			// description:
			//		Checks for an attribute called "aria-"+state.
			// returns:
			//		The value of the requested state on elem
			//		or an empty string if elem has no value for state.

			return elem.getAttribute("aria-"+state) || "";
		},

		setWaiState: function(/*Element*/ elem, /*String*/ state, /*String*/ value){
			// summary:
			//		Sets a state on an element.
			// description:
			//		Sets an attribute called "aria-"+state.

			elem.setAttribute("aria-"+state, value);
		},

		removeWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Removes a state from an element.
			// description:
			//		Sets an attribute called "aria-"+state.

			elem.removeAttribute("aria-"+state);
		}
	});

	return dijit;
});

},
'curam/util/ResourceBundle':function(){
/*
 * Copyright 2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
define("curam/util/ResourceBundle", ["dojo/i18n",
        "dojo/string"
        ], function(i18n, string) {

/*
 * Modification History
 * --------------------
 * 20-May-2013  MV  [CR00383012] Fail if there are no properties loaded.
 * 19-May-2012  BOS [CR00346368] Use new Dojo AMD format.
 * 15-Jun-2012  MV  [CR00329034] Added proper documentation.
 * 11-Jun-2012  MV  [CR00328689] Initial version.
 */

/**
 * @name curam.util.ResourceBundle
 * @namespace Provides access to localizable resources.
 * <p/>
 * The process for getting localized messaged from a resource bundle consists
 * of two steps: <ol>
 * <li>Load the resources using <code>dojo.requireLocalization()</code></li>
 * <li>Create an instance of <code>curam.util.ResourceBunlde</code> class
 *      to access the localized resources.</li>
 * </ol>
 *
 * <h2>Loading Resources</h2>
 * In most cases the call to load resources should look like this:
 * <code><pre>dojo.requireLocalization("curam.application", "MyResources")</pre></code>
 * <p/>
 * "curam.application" is the default package into which all localizable
 * resources are placed by Curam infrastructure.
 * <p/>
 * "MyResources" is an example of a resource bundle name. Resource bundle name
 * will be specific to your own JavaScript code and it is derived from the name
 * of the related resource bundle *.properties file.
 *
 * <h2>Accessing Localized Resources</h2>
 * Previously loaded localized resources can be accessed in the following way:
 * <code><pre>dojo.require("curam.util.ResourceBundle");
 * var bundle = new curam.util.ResourceBundle("MyResources");
 * var localizedMessage = bundle.getProperty("myPropertyKey");
 * </pre></code>
 * Note in the above example there is no need to specify the default package
 * name "curam.appliciation" - the infrastructure will use the default
 * if no package is specified. This should be the case in most normal
 * situations.
 *
 * <h2>Resource File Naming and Content</h2>
 * The localizable resources for your JavaScript are expected in the standard
 * Java Properties format.
 * <p/>
 * By convention the name of the resource file for your JavaScript should be
 * derived from name of the JavaScript file itself. For example if your
 * JavaScript file is called "MyJavaScript.js" then related localizable
 * resources should be placed in <code>MyJavaScript.js.properties</code> file.
 * This .properties file can be placed anywhere in the component directory, but
 * by convention it should be in the same directory as the related *.js file.
 * The only exception to this, is that a *.js file within a WebContent directory
 * cannot have it's associated .properties file within the same directory - the
 * associated .properties file must be placed within a directory outside of the
 * WebContent directory.
 * <p/>
 * The tranlations of the resource bundle should then be placed in files named
 * in the following way (again following the Java standard naming):
 * <code>MyJavaScript.js_fr_CA.properties</code>,
 * <code>MyJavaScript.js_fr.properties</code>,
 * <code>MyJavaScript.js_cs_CZ.properties</code>, etc.
 * <p/>
 * Sample content of a resource file is as follows:
 * <code><pre>myPropertyKey=A localizable message.
 * another.property.key=Another localizable message.
 * propertyKey3=A message with %s value placeholders %s.
 * </pre></code>
 * Please note property keys with dots are allowed and string value
 * substitution into mesages is supported.
 */
 var ResourceBundle = dojo.declare("curam.util.ResourceBundle", null,
/**
 * @lends curam.util.ResourceBundle.prototype
 */
{
  _bundle: undefined,

  /**
   * Constructor takes bundle name and optionally locale.
   *
   * @param {String} possiblyQualifiedBundleName Bundle name. Optionally
   *           qualified with package name. E.g. "my.package.MyResourceBundle".
   * @param {String} [locale] Locale string in the following format:
   *            <code> en-US</code> where "en" is language code and "US"
   *            is variant as per IETF specification.
   */
  constructor: function(possiblyQualifiedBundleName, locale) {
    var parts = possiblyQualifiedBundleName.split(".");
    var bundleName = parts[parts.length - 1];
    var packageName = parts.length == 1 ? "curam.application"
        : possiblyQualifiedBundleName.slice(0,
            possiblyQualifiedBundleName.length - bundleName.length - 1);
    try {
      var b = i18n.getLocalization(packageName, bundleName, locale);
      if (this._isEmpty(b)) {
        throw new Error("Empty resource bundle.");

      } else {
        this._bundle = b;
      }

    } catch (e) {
      throw new Error("Unable to access resource bundle: " + packageName + "."
          + bundleName + ": " + e.message);
    }
  },
  
  /**
   * Checks if the passed bundle is empty or has some properties.
   * @param bundle The bundle object to check.
   * @returns {Boolean} True if the bundle if empty, false if it contains
   *            properties.
   */
  _isEmpty: function(bundle) {
    for (var prop in bundle) {
      // if it has at least one property, return false - it is not empty
      return false;
    }
    // no properties - return true as it is empty
    return true;
  },

  /**
   * Gets the localized value of a specified property, optionally replacing any
   * placeholders with appropriate values from specified array.
   *
   * @param {String} key The property key of the required message.
   * @param {Array} [values] An array of values to be used for replacing
   *            placeholders within the specified message.
   * @returns {String} Value of the requested localized property from
   *            the bundle.
   */
  getProperty: function(key, values) {
    var msg = this._bundle[key];

    var result = msg;
    if (values) {
      result = string.substitute(msg, values);
    }

    return result;
  }
  });
 return ResourceBundle;
});
},
'dojo/store/util/QueryResults':function(){
define("dojo/store/util/QueryResults", ["../../_base/array", "../../_base/lang", "../../_base/Deferred"
], function(array, lang, Deferred) {
  //  module:
  //    dojo/store/util/QueryResults
  //  summary:
  //    The module defines a query results wrapper

var util = lang.getObject("dojo.store.util", true);

util.QueryResults = function(results){
	// summary:
	//		A function that wraps the results of a store query with additional
	//		methods.
	//
	// description:
	//		QueryResults is a basic wrapper that allows for array-like iteration
	//		over any kind of returned data from a query.  While the simplest store
	//		will return a plain array of data, other stores may return deferreds or
	//		promises; this wrapper makes sure that *all* results can be treated
	//		the same.
	//
	//		Additional methods include `forEach`, `filter` and `map`.
	//
	// returns: Object
	//		An array-like object that can be used for iterating over.
	//
	// example:
	//		Query a store and iterate over the results.
	//
	//	|	store.query({ prime: true }).forEach(function(item){
	//	|		//	do something
	//	|	});

	if(!results){
		return results;
	}
	// if it is a promise it may be frozen
	if(results.then){
		results = lang.delegate(results);
	}
	function addIterativeMethod(method){
		if(!results[method]){
			results[method] = function(){
				var args = arguments;
				return Deferred.when(results, function(results){
					Array.prototype.unshift.call(args, results);
					return util.QueryResults(array[method].apply(array, args));
				});
			};
		}
	}
	addIterativeMethod("forEach");
	addIterativeMethod("filter");
	addIterativeMethod("map");
	if(!results.total){
		results.total = Deferred.when(results, function(results){
			return results.length;
		});
	}
	return results;
};

return util.QueryResults;
});

},
'dijit/form/_ListBase':function(){
define("dijit/form/_ListBase", [
	"dojo/_base/declare",	// declare
	"dojo/window" // winUtils.scrollIntoView
], function(declare, winUtils){

// module:
//		dijit/form/_ListBase
// summary:
//		Focus-less menu to handle UI events consistently

return declare( "dijit.form._ListBase", null, {
	// summary:
	//		Focus-less menu to handle UI events consistently
	//		Abstract methods that must be defined externally:
	//			onSelect: item is active (mousedown but not yet mouseup, or keyboard arrow selected but no Enter)
	//			onDeselect:  cancels onSelect
	// tags:
	//		private

	// selected: DOMnode
	//		currently selected node
	selected: null,

	_getTarget: function(/*Event*/ evt){
		var tgt = evt.target;
		var container = this.containerNode;
		if(tgt == container || tgt == this.domNode){ return null; }
		while(tgt && tgt.parentNode != container){
			// recurse to the top
			tgt = tgt.parentNode;
		}
		return tgt;
	},

	selectFirstNode: function(){
		// summary:
		// 		Select the first displayed item in the list.
		var first = this.containerNode.firstChild;
		while(first && first.style.display == "none"){
			first = first.nextSibling;
		}
		this._setSelectedAttr(first);
	},

	selectLastNode: function(){
		// summary:
		// 		Select the last displayed item in the list
		var last = this.containerNode.lastChild;
		while(last && last.style.display == "none"){
			last = last.previousSibling;
		}
		this._setSelectedAttr(last);
	},

	selectNextNode: function(){
		// summary:
		// 		Select the item just below the current selection.
		// 		If nothing selected, select first node.
		var selectedNode = this._getSelectedAttr();
		if(!selectedNode){
			this.selectFirstNode();
		}else{
			var next = selectedNode.nextSibling;
			while(next && next.style.display == "none"){
				next = next.nextSibling;
			}
			if(!next){
				this.selectFirstNode();
			}else{
				this._setSelectedAttr(next);
			}
		}
	},

	selectPreviousNode: function(){
		// summary:
		// 		Select the item just above the current selection.
		// 		If nothing selected, select last node (if
		// 		you select Previous and try to keep scrolling up the list).
		var selectedNode = this._getSelectedAttr();
		if(!selectedNode){
			this.selectLastNode();
		}else{
			var prev = selectedNode.previousSibling;
			while(prev && prev.style.display == "none"){
				prev = prev.previousSibling;
			}
			if(!prev){
				this.selectLastNode();
			}else{
				this._setSelectedAttr(prev);
			}
		}
	},

	_setSelectedAttr: function(/*DomNode*/ node){
		// summary:
		//		Does the actual select.
		if(this.selected != node){
			var selectedNode = this._getSelectedAttr();
			if(selectedNode){
				this.onDeselect(selectedNode);
				this.selected = null;
			}
			if(node && node.parentNode == this.containerNode){
				this.selected = node;
				winUtils.scrollIntoView(node);
				this.onSelect(node);
			}
		}else if(node){
			this.onSelect(node);
		}
	},

	_getSelectedAttr: function(){
		// summary:
		//		Returns the selected node.
		var v = this.selected;
		return (v && v.parentNode == this.containerNode) ? v : (this.selected = null);
	}
});

});

},
'dijit/form/_FormWidget':function(){
define("dijit/form/_FormWidget", [
	"dojo/_base/declare",	// declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/ready",
	"../_Widget",
	"../_CssStateMixin",
	"../_TemplatedMixin",
	"./_FormWidgetMixin"
], function(declare, kernel, ready, _Widget, _CssStateMixin, _TemplatedMixin, _FormWidgetMixin){

/*=====
var _Widget = dijit._Widget;
var _TemplatedMixin = dijit._TemplatedMixin;
var _CssStateMixin = dijit._CssStateMixin;
var _FormWidgetMixin = dijit.form._FormWidgetMixin;
=====*/

// module:
//		dijit/form/_FormWidget
// summary:
//		FormWidget


// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/form/_FormValueWidget"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.form._FormWidget", [_Widget, _TemplatedMixin, _CssStateMixin, _FormWidgetMixin], {
	// summary:
	//		Base class for widgets corresponding to native HTML elements such as <checkbox> or <button>,
	//		which can be children of a <form> node or a `dijit.form.Form` widget.
	//
	// description:
	//		Represents a single HTML element.
	//		All these widgets should have these attributes just like native HTML input elements.
	//		You can set them during widget construction or afterwards, via `dijit._Widget.attr`.
	//
	//		They also share some common methods.

	setDisabled: function(/*Boolean*/ disabled){
		// summary:
		//		Deprecated.  Use set('disabled', ...) instead.
		kernel.deprecated("setDisabled("+disabled+") is deprecated. Use set('disabled',"+disabled+") instead.", "", "2.0");
		this.set('disabled', disabled);
	},

	setValue: function(/*String*/ value){
		// summary:
		//		Deprecated.  Use set('value', ...) instead.
		kernel.deprecated("dijit.form._FormWidget:setValue("+value+") is deprecated.  Use set('value',"+value+") instead.", "", "2.0");
		this.set('value', value);
	},

	getValue: function(){
		// summary:
		//		Deprecated.  Use get('value') instead.
		kernel.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.", "", "2.0");
		return this.get('value');
	},

	postMixInProperties: function(){
		// Setup name=foo string to be referenced from the template (but only if a name has been specified)
		// Unfortunately we can't use _setNameAttr to set the name due to IE limitations, see #8484, #8660.
		// Regarding escaping, see heading "Attribute values" in
		// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
		this.nameAttrSetting = this.name ? ('name="' + this.name.replace(/'/g, "&quot;") + '"') : '';
		this.inherited(arguments);
	},

	// Override automatic assigning type --> focusNode, it causes exception on IE.
	// Instead, type must be specified as ${type} in the template, as part of the original DOM
	_setTypeAttr: null
});

});

},
'curam/tab':function(){
/*
 * Copyright 2009-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

define("curam/tab", ["curam/define",
        "curam/util",
        "curam/util/ScreenContext"
        ], function() {
  
  /*
   * Modification History
   * --------------------
   * 25-Mar-2014  MV  [CR00423311] Add function to detect internal application.  
   * 28-Sep-2013  BOS [CR00396277] Modified getSelectedTab() and 
   *                    onSectionSelected() functions to ensure an undefined. 
   *                    tab container handled correctly.
   * 28-Sep-2011  MV  [CR00288956] Refactored code to get separate
   *      getCurrentSectionId function.
   * 29-Jul-2011  MV  [CR00269970] Added missing semicolons.
   * 14-Feb-2011  PK  [CR00251730] Added "refreshMainContentPanel" method.
   * 14-Jan-2011  DG  [CR00242400] Changed "getContainerTab" to do a bottom-up
   *                    search. This is much, much simpler.
   * 12-Jan-2011  DG  [CR00238642] Fixed "getContainerTab" to find the tab for an
   *                    node even if the tab is not in the currently selected
   *                    section. Added copyright notice.
   * 17-Nov-2010  DG  [CR00217921] Clean-up of selected tab retrieval.
   * 27-Oct-2010  SK  [CR00224193] the situation where the content panel frame
   *                    is not present is now allowed.
   * 28-Jul-2010  PK  [CR00211736] Updated due to re-factoring of
   *                    tab-app-controller.js.
   * 21-Jul-2010  PK  [CR00211095] Added methods for handling default pages in a
   *                    section.
   * 16-Jul-2010  MV  [CR00210541] Fixed the getTabContainer() function to also
   *                    work in contexts other than the main window.
   * 28-Jun-2010  SD  [CR00204622] Smart Panel additions.
   * 02-Jul-2010  PK  [CR00203531] Updated to support section tab container.
   * 04-Jun-2010  MV  [CR00202412] Generalize the code that executes functions
   *                    on tab close.
   * 11-Feb-2010  MV  [CR00188844] Code format cleanup.
   * 27-Nov-2009  MV  [CR00180297] Pass the tab widget ID to the handlers.
   * 24-Nov-2009  MV  [CR00175837] Remove debug output from getTabCOntainer.
   * 20-Nov-2009  MV  [CR00175581] Fix getSelectedTab function, remove
   *                    refreshCurrentTab function, add getTabController function.
   * 18-Nov-2009  MV  [CR00172452] Add more tab related functions.
   * 03-Sep-2009  MLB [CR00164883] Added function to refresh the current tab.
   * 06-Aug-2009  MV  [CR00164029] Initial version.
   * 24-Jun-2010 BD  [CR00204119] Updated how the content panel iframe is returned
   */
  /**
   * Contains functions of general use for the tabbed UI.
   */
  curam.define.singleton("curam.tab", {
    SECTION_TAB_CONTAINER_ID: "app-sections-container-dc",
    SMART_PANEL_IFRAME_ID: "curam_tab_SmartPanelIframe",
    toBeExecutedOnTabClose: [],
    
    /**
     * @private
     *
     * Used for testing: when this is set by the test code the value
     * will be returned from the getSelectedTab() function instead of the real
     * selected tab.
     */
    _mockSelectedTab: null,

    // Returns the currently selected tab widget.
    getSelectedTab: function(sectionID) {
      // supports testing code that uses curam.tab API
      if (curam.tab._mockSelectedTab) {
        return curam.tab._mockSelectedTab;
      }

      if (curam.tab.getTabContainer(sectionID)) {
        return curam.tab.getTabContainer(sectionID).selectedChildWidget;
      }    
    },

    getTabContainer: function(sectionID) {
      return curam.tab.getTabContainerFromSectionID(sectionID
          || curam.tab.getCurrentSectionId());
    },
    
    /**
     * Determines ID of the currently selected section.
     * By default throws an error when no current section is found.
     * 
     * @param {boolean} [suppressNotFoundError] If this option is set to true
     *          the function will not throw err when no current section
     *          is found.
     * 
     * @return ID of the currently selected section or null
     *          if "suppressNotFoundError" parameter is true.
     */
    getCurrentSectionId: function(suppressNotFoundError) {
      var sectionTabContainer = curam.util.getTopmostWindow().dijit.byId(
          curam.tab.SECTION_TAB_CONTAINER_ID);
      if (sectionTabContainer) {
        // children of the curam.tab.SECTION_TAB_CONTAINER_ID have id's that
        // start with the section ID and have a 4 character suffix. See
        // the ApplicationSectionRenderer.
        var childID = sectionTabContainer.selectedChildWidget.domNode.id;
        return childID.substring(0, childID.length - 4);

      } else {
        if (!suppressNotFoundError) {
          throw new Error(
              "curam.tab.getCurrentSectionId() - application section"
                + " tab container not found");
        }
      }

      return null;
    },
    
    /**
     * Determines whether we are running within a tabbed UI (internal
     * application) or not.
     * 
     * @return True if we are in tabbed UI, otherwise false.
     */
    inTabbedUI: function() {
      return curam.tab.getCurrentSectionId(true) != null;
    },

    getTabContainerFromSectionID: function(sectionID) {
      var tabContainer = dijit.byId(sectionID + "-stc");
      // TODO: not sure what this should do now that sections have been
      // introduced
      if (!tabContainer && window.parent && window.parent != window) {
        tabContainer =
          curam.util.getTopmostWindow().dijit.byId(sectionID + "-stc");
      }
      return tabContainer;
    },

    // Returns the unique widget ID for the specified tab.
    getTabWidgetId: function(tab) {
      return tab.id;
    },

    // Returns the unique widget ID for the currently selected tab.
    getSelectedTabWidgetId: function() {
      return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
    },

    /**
     * Gets the tab that contains the given node. The node is typically the
     * "iframe" element (or its parent element) within the tab, but it can be
     * any other descendant node of the tab widget.
     *
     * @param {Node} node The node within the tab to be identified.
     * @return The tab content pane containing the given node.
     */
    getContainerTab: function(node) {
      var widget = dijit.getEnclosingWidget(node);

      if (widget && !widget.tabDescriptor) {
        // A valid tab has a "curam.tab.TabDescriptor" object. This is probably
        // a different widget nested within the tab. Look further up the tree.
        widget = curam.tab.getContainerTab(widget.domNode.parentNode);
      }

      if (!widget || !widget.tabDescriptor) {
        throw "Containing tab widget could not be found for node: " + node;
      }
      return widget;
    },

    // Returns the iframe corresponding to the main content panel
    // of the specified tab.
    // If the tab parameter is not provided the selected tab will be used instead.
    getContentPanelIframe: function(tab) {
      var targetTab = tab ? tab : curam.tab.getSelectedTab(),
          iframe = null;
      
      if (targetTab) {
        iframe = dojo.query("iframe", targetTab.domNode).filter(
            function(item) {
              // is-cp-iframe output by "ContentPanelRenderer".
              return dojo.attr(item,"iscpiframe") == "true";
            })[0];
      }
      return iframe ? iframe : null;
    },
    
    /**
     * Refreshes the main content panel for the specified tab. If the tab is not
     * specified, the currently selected one will be used.
     * @tab The tab to reload the main content panel for. 
     */
    refreshMainContentPanel: function(tab) {
      var iframe = curam.tab.getContentPanelIframe(tab);
      iframe.contentWindow.curam.util.publishRefreshEvent();
      iframe.contentWindow.location.reload(true);
    },

    // Returns the iframe corresponding to the main content panel
    // of the specified tab.
    // If the tab parameter is not provided the selected tab will be used instead.
    getSmartPanelIframe: function(tab) {
      var targetTab = tab ? tab : curam.tab.getSelectedTab();
      var iframe =
        dojo.query("iframe", targetTab.domNode).filter(
            function(item) {
              return item.id == curam.tab.SMART_PANEL_IFRAME_ID;
            })[0];

      return iframe;
    },

    unsubscribeOnTabClose: function(unsubscribeToken, tabWidgetId) {
      curam.tab.toBeExecutedOnTabClose.push(function(actualTabWidgetId) {
        if (tabWidgetId == actualTabWidgetId) {
          dojo.unsubscribe(unsubscribeToken);
          return true;
        }

        return false;
      });
    },

    executeOnTabClose: function(func, tabWidgetId) {
      curam.tab.toBeExecutedOnTabClose.push(function(actualTabWidgetId) {
        if (tabWidgetId == actualTabWidgetId) {
          func();
          return true;
        }

        return false;
      });
    },

    doExecuteOnTabClose: function(tabWidgetId) {
      var remainingFuncs = new Array();
      for (var i = 0; i < curam.tab.toBeExecutedOnTabClose.length; i ++) {
        var func = curam.tab.toBeExecutedOnTabClose[i];
        if (!func(tabWidgetId)) {
          remainingFuncs.push(func);
        }
      }

      curam.tab.toBeExecutedOnTabClose = remainingFuncs;
    },

    // Returns a handler function that handles the /curam/main-content/page/loaded events,
    // but only for the specified tab.
    getHandlerForTab: function(handler, tabWidgetId) {
      return function(pageId, actualTabWidgetId) {
        if (actualTabWidgetId == tabWidgetId) {
          handler(pageId, tabWidgetId);
        } else {
          // no action - event was for a different tab
        }
      };
    },

    getTabController: function() {
      return curam.util.getTopmostWindow().curam.ui.UIController;
    },

    initTabLinks: function(tabWindow) {
      if (typeof(window.pageContainsClassicIEG) != "undefined"
          && window.pageContainsClassicIEG == true) {
        return;      
      }
      dojo.query("a").forEach(
        function(link) {
          if (link.href.indexOf('#') != 0
              && link.href.indexOf('javascript:') != 0
              && (link.href.indexOf('Page.do') > -1
                        || link.href.indexOf('Frame.do') > -1)) {
            if (link.href.indexOf('&o3ctx') < 0
              && link.href.indexOf('?o3ctx') < 0) {
              var separator = (link.href.indexOf('?') > -1) ? "&" : "?";
          link.href += separator + jsScreenContext.toRequestString();
            }
          }
       });
      elements = document.forms;
      for (var i = 0; i < elements.length; ++i) {
        elem = elements[i];
        var ctxField = dojo.byId('o3ctx');
        if (!ctxField) {
          var ctx = new curam.util.ScreenContext();
          ctx.setContextBits('ACTION');
          dojo.create("input", {"type": "hidden", "name": "o3ctx",
                                 "value": ctx.getValue()
                               }, elem);
        }
        dojo.create("input", {"type": "hidden", "name": "o3prv",
              "value": jsPageID}, elem);
      }

      if (elements.length > 0) {
        curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest", []);
      }
    },

    initContent: function(window, pageId) {
      var contentDiv = dojo.byId('content');
      dojo.removeClass(contentDiv, "hidden-panel");
      return;
    },

    /**
     * This setups a listener on the SECTION_TAB_CONTAINER_ID tab container to
     * handle when a section tab is selected. This method is invoked from
     * JavaScript output from the ApplicationsSectionsRenderer Java class.
     */
    setupSectionSelectionListener: function() {
      dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID + "-selectChild",
          curam.tab.onSectionSelected) ;
    },

    /**
     * Checks if a section has a default page specified and if the section is
     * currently "empty" (i.e. nothing displayed in it). If so, it loads the
     * default default in the section.
     *
     * This function responds to the standard "selectChild" event provided by the
     * Dijit TabContainer and is setup by the setupSectionSelectionListener method
     * above.
     */
    onSectionSelected: function(section) {
      // The curamDefaultPageID attribute is added by the setSectionDefaultPage
      // method below. The Dijit TabContainer selectChild event passes the
       // selected child to the listener.
      if (section.curamDefaultPageID) {
        // The section has a default page. Check if anything has been opened up
        // in this section already. If not, then we trigger a request for that
        // page.

        // The tab container containing the "object" tabs will either be a direct
        // child of the sections tab container, or it will be nested within
        // a border container.
        var objectTabContainer;
        if (section.id.substring(
              section.id.length - 4, section.id.length) == "-sbc") {
          // This means it's a border container so extract the section ID and
          // find the nested tab container.
          var sectionID = section.id.substring(0, section.id.length - 4);
          objectTabContainer = curam.tab.getTabContainer(sectionID);
        } else {
          // This means the object tab container is a direct child of the section
          // tab container, so it's passed in by the "selectChild" event of the
          // section tab container.
          objectTabContainer = section;
        }

        // If the tab container does not have any children, then load the
        // default page.
        if (objectTabContainer 
          && objectTabContainer.getChildren().length == 0) {
            curam.tab.getTabController().handleUIMPageID(
              section.curamDefaultPageID, true);
         // TODO: now that the page has been loaded, can we set a flag on the
         // section so the code *before* the getChildren().length == 0 above
         // is not executed again. Just a minor optimization.
        }
        return true;
      }
      return false;
    },

    /**
     * Sets the section's default pageID as a custom attribute on the Dijit
     * container. The container can be either a border container or a tab
     * container which has a specific naming convention which is the section ID
     * plus a suffix of "-sbc" for a border container and "-stc" for a tab
     * container. The ApplicationSectionsRenderer generates the call to this
     * function and will set the containers ID appropriately.
     */
    setSectionDefaultPage: function(sectionDijitContainerID, defaultPageID) {
      var dijitContainer = dijit.byId(sectionDijitContainerID);
      if (dijitContainer) {
        // The "curamDefaultPageID" custom attribute is used by the
        // onSectionSelected method above.
        dijitContainer.curamDefaultPageID = defaultPageID;
      } else {
        throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"
              + sectionDijitContainerID;
      }
    },
    
    /**
     * Notifies the Smart Panel that its content page is loaded and ready to
     * receive updates from the tab's content page. This is done by publishing
     * an event, or, if the listeners are not set up yet, an attribute set on
     * the Smart Panel frame is used.
     */
    publishSmartPanelContentReady: function() {
            var rendererLoadedEvent = "smartpanel.content.loaded";
            //use the window object as cannot assume the currently selected tab is
            //the tab containing the Smart Panel of interest.
            var smartPanel = window.frameElement; 
            smartPanel.setAttribute("_SPContentLoaded", "true");
            curam.util.getTopmostWindow().dojo.publish(rendererLoadedEvent, [smartPanel]);
    }
    
  });

  return curam.tab;
});

},
'dijit/_base/place':function(){
define("dijit/_base/place", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/lang", // lang.isArray
	"dojo/window", // windowUtils.getBox
	"../place",
	".."	// export to dijit namespace
], function(array, lang, windowUtils, place, dijit){

	// module:
	//		dijit/_base/place
	// summary:
	//		Back compatibility module, new code should use dijit/place directly instead of using this module.

	dijit.getViewport = function(){
		// summary:
		//		Deprecated method to return the dimensions and scroll position of the viewable area of a browser window.
		//		New code should use windowUtils.getBox()

		return windowUtils.getBox();
	};

	/*=====
	dijit.placeOnScreen = function(node, pos, corners, padding){
		// summary:
		//		Positions one of the node's corners at specified position
		//		such that node is fully visible in viewport.
		//		Deprecated, new code should use dijit.place.at() instead.
	};
	=====*/
	dijit.placeOnScreen = place.at;

	/*=====
	dijit.placeOnScreenAroundElement = function(node, aroundElement, aroundCorners, layoutNode){
		// summary:
		//		Like dijit.placeOnScreenAroundNode(), except it accepts an arbitrary object
		//		for the "around" argument and finds a proper processor to place a node.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	====*/
	dijit.placeOnScreenAroundElement = function(node, aroundNode, aroundCorners, layoutNode){
		// Convert old style {"BL": "TL", "BR": "TR"} type argument
		// to style needed by dijit.place code:
		//		[
		// 			{aroundCorner: "BL", corner: "TL" },
		//			{aroundCorner: "BR", corner: "TR" }
		//		]
		var positions;
		if(lang.isArray(aroundCorners)){
			positions = aroundCorners;
		}else{
			positions = [];
			for(var key in aroundCorners){
				positions.push({aroundCorner: key, corner: aroundCorners[key]});
			}
		}

		return place.around(node, aroundNode, positions, true, layoutNode);
	};

	/*=====
	dijit.placeOnScreenAroundNode = function(node, aroundNode, aroundCorners, layoutNode){
		// summary:
		//		Position node adjacent or kitty-corner to aroundNode
		//		such that it's fully visible in viewport.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	=====*/
	dijit.placeOnScreenAroundNode = dijit.placeOnScreenAroundElement;

	/*=====
	dijit.placeOnScreenAroundRectangle = function(node, aroundRect, aroundCorners, layoutNode){
		// summary:
		//		Like dijit.placeOnScreenAroundNode(), except that the "around"
		//		parameter is an arbitrary rectangle on the screen (x, y, width, height)
		//		instead of a dom node.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	=====*/
	dijit.placeOnScreenAroundRectangle = dijit.placeOnScreenAroundElement;

	dijit.getPopupAroundAlignment = function(/*Array*/ position, /*Boolean*/ leftToRight){
		// summary:
		//		Deprecated method, unneeded when using dijit/place directly.
		//		Transforms the passed array of preferred positions into a format suitable for
		//		passing as the aroundCorners argument to dijit.placeOnScreenAroundElement.
		//
		// position: String[]
		//		This variable controls the position of the drop down.
		//		It's an array of strings with the following values:
		//
		//			* before: places drop down to the left of the target node/widget, or to the right in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* after: places drop down to the right of the target node/widget, or to the left in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* above: drop down goes above target node
		//			* below: drop down goes below target node
		//
		//		The list is positions is tried, in order, until a position is found where the drop down fits
		//		within the viewport.
		//
		// leftToRight: Boolean
		//		Whether the popup will be displaying in leftToRight mode.
		//
		var align = {};
		array.forEach(position, function(pos){
			var ltr = leftToRight;
			switch(pos){
				case "after":
					align[leftToRight ? "BR" : "BL"] = leftToRight ? "BL" : "BR";
					break;
				case "before":
					align[leftToRight ? "BL" : "BR"] = leftToRight ? "BR" : "BL";
					break;
				case "below-alt":
					ltr = !ltr;
					// fall through
				case "below":
					// first try to align left borders, next try to align right borders (or reverse for RTL mode)
					align[ltr ? "BL" : "BR"] = ltr ? "TL" : "TR";
					align[ltr ? "BR" : "BL"] = ltr ? "TR" : "TL";
					break;
				case "above-alt":
					ltr = !ltr;
					// fall through
				case "above":
				default:
					// first try to align left borders, next try to align right borders (or reverse for RTL mode)
					align[ltr ? "TL" : "TR"] = ltr ? "BL" : "BR";
					align[ltr ? "TR" : "TL"] = ltr ? "BR" : "BL";
					break;
			}
		});
		return align;
	};

	return dijit;
});

},
'dijit/form/_ComboBoxMenu':function(){
define("dijit/form/_ComboBoxMenu", [
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.remove
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-style", // domStyle.get
	"dojo/keys", // keys.DOWN_ARROW keys.PAGE_DOWN keys.PAGE_UP keys.UP_ARROW
	"../_WidgetBase",
	"../_TemplatedMixin",
	"./_ComboBoxMenuMixin",
	"./_ListMouseMixin"
], function(declare, domClass, domConstruct, domStyle, keys,
			_WidgetBase, _TemplatedMixin, _ComboBoxMenuMixin, _ListMouseMixin){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _ComboBoxMenuMixin = dijit.form._ComboBoxMenuMixin;
	var _ListMouseMixin = dijit.form._ListMouseMixin;
=====*/

	// module:
	//		dijit/form/_ComboBoxMenu
	// summary:
	//		Focus-less menu for internal use in `dijit.form.ComboBox`

	return declare("dijit.form._ComboBoxMenu",[_WidgetBase, _TemplatedMixin, _ListMouseMixin, _ComboBoxMenuMixin], {
		// summary:
		//		Focus-less menu for internal use in `dijit.form.ComboBox`
		//              Abstract methods that must be defined externally:
		//                      onChange: item was explicitly chosen (mousedown somewhere on the menu and mouseup somewhere on the menu)
		//                      onPage: next(1) or previous(-1) button pressed
		// tags:
		//		private

		templateString: "<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"
				+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"
				+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"
				+"</div>",

		baseClass: "dijitComboBoxMenu",

		postCreate: function(){
			this.inherited(arguments);
			if(!this.isLeftToRight()){
				domClass.add(this.previousButton, "dijitMenuItemRtl");
				domClass.add(this.nextButton, "dijitMenuItemRtl");
			}
		},

		_createMenuItem: function(){
			return domConstruct.create("div", {
				"class": "dijitReset dijitMenuItem" +(this.isLeftToRight() ? "" : " dijitMenuItemRtl"),
				role: "option"
			});
		},

		onHover: function(/*DomNode*/ node){
			// summary:
			//		Add hover CSS
			domClass.add(node, "dijitMenuItemHover");
		},

		onUnhover: function(/*DomNode*/ node){
			// summary:
			//		Remove hover CSS
			domClass.remove(node, "dijitMenuItemHover");
		},

		onSelect: function(/*DomNode*/ node){
			// summary:
			//		Add selected CSS
			domClass.add(node, "dijitMenuItemSelected");
		},

		onDeselect: function(/*DomNode*/ node){
			// summary:
			//		Remove selected CSS
			domClass.remove(node, "dijitMenuItemSelected");
		},

		_page: function(/*Boolean*/ up){
			// summary:
			//		Handles page-up and page-down keypresses

			var scrollamount = 0;
			var oldscroll = this.domNode.scrollTop;
			var height = domStyle.get(this.domNode, "height");
			// if no item is highlighted, highlight the first option
			if(!this.getHighlightedOption()){
				this.selectNextNode();
			}
			while(scrollamount<height){
				var highlighted_option = this.getHighlightedOption();
				if(up){
					// stop at option 1
					if(!highlighted_option.previousSibling ||
						highlighted_option.previousSibling.style.display == "none"){
						break;
					}
					this.selectPreviousNode();
				}else{
					// stop at last option
					if(!highlighted_option.nextSibling ||
						highlighted_option.nextSibling.style.display == "none"){
						break;
					}
					this.selectNextNode();
				}
				// going backwards
				var newscroll = this.domNode.scrollTop;
				scrollamount += (newscroll-oldscroll)*(up ? -1:1);
				oldscroll = newscroll;
			}
		},

		handleKey: function(evt){
			// summary:
			//		Handle keystroke event forwarded from ComboBox, returning false if it's
			//		a keystroke I recognize and process, true otherwise.
			switch(evt.charOrCode){
				case keys.DOWN_ARROW:
					this.selectNextNode();
					return false;
				case keys.PAGE_DOWN:
					this._page(false);
					return false;
				case keys.UP_ARROW:
					this.selectPreviousNode();
					return false;
				case keys.PAGE_UP:
					this._page(true);
					return false;
				default:
					return true;
			}
		}
	});
});

},
'cm/_base/_dom':function(){
define("cm/_base/_dom", [], function() {
  
/*
  This file includes generic functions for use with the DOM.
*/

/*
 * Modification History
 * --------------------
 * 24-Mar-2010 BD  [CR00191575] Added exit function to getParentByType() when 
 *                              the document root is reached. Handles the 
 *                              iframe scenario.
 */

  var cm = dojo.global.cm || {};
  dojo.global.cm = cm;

  dojo.mixin(cm, {
    nextSibling: function(node, tagName) {
      //  summary:
            //            Returns the next sibling element matching tagName
      return cm._findSibling(node, tagName, true);
    },
    
    prevSibling: function(node, tagName) {
      //  summary:
            //            Returns the previous sibling element matching tagName
      return cm._findSibling(node, tagName, false);
    },
    
    getInput: function(name, multiple) {
      if(!dojo.isString(name)){
        return name;
      }
      var inputs = dojo.query("input[name='" + name + "'],select[name='" + name + "']");
      return multiple ? (inputs.length > 0 ? inputs : null) 
                                                                                  : (inputs.length > 0 ? inputs[0]:null);
    },
    
    getParentByClass: function(node, classStr) {
      // summary:
      //   Returns the first parent of the node that has the require class
      node = node.parentNode;
      while (node) {
        if(dojo.hasClass(node, classStr)){
          return node;
        }
        node = node.parentNode;
      }
      return null;
    },
    
    getParentByType: function(node, type) {
      // summary:
      //   Returns the first parent of the node that has the require class
      node = node.parentNode;
      type = type.toLowerCase();
      var docRoot = "html";
      while (node) {
        // Give up when you reach the root of the doc,
        // applies to iframes
        if(node.tagName.toLowerCase() == docRoot){
          break;
        }
        if(node.tagName.toLowerCase() == type){
          return node;
        }
        node = node.parentNode;
      }
      return null;
    },
  
    replaceClass: function(node, newCls, oldCls) {
      // summary:
      //   Replaces a single css class with another.
      //   node:   The node to operate on.
      //   newCls: The class to be added
      //   oldCls: The class to be removed
      dojo.removeClass(node, oldCls);
      dojo.addClass(node, newCls);
    },
    
    setClass: function(/* HTMLElement */node, /* string */classStr){
                  //      summary
                  //      Clobbers the existing list of classes for the node, replacing it with
                  //      the list given in the 2nd argument. Returns true or false
                  //      indicating success or failure.
                  node = dojo.byId(node);
                  var cs = new String(classStr);
                  try{
                          if(typeof node.className == "string"){
                                  node.className = cs;
                          }else if(node.setAttribute){
                                  node.setAttribute("class", classStr);
                                  node.className = cs;
                          }else{
                                  return false;
                          }
                  }catch(e){
                          dojo.debug("dojo.html.setClass() failed", e);
                  }
                  return true;
          },
  
    _findSibling: function(node, tagName, forward) {
      
      if(!node) { return null; }
      if(tagName) { tagName = tagName.toLowerCase(); }
      var param = forward ? "nextSibling":"previousSibling";
            do {
                    node = node[param];
            } while(node && node.nodeType != 1);
  
            if(node && tagName && tagName != node.tagName.toLowerCase()) {
                    return cm[forward ? "nextSibling":"prevSibling"](node, tagName);
            }
            return node;  //      Element
    },
    
    getViewport: function(){
                  // summary: returns a viewport size (visible part of the window)
          
                  // FIXME: need more docs!!
                  var d = dojo.doc, dd = d.documentElement, w = window, b = dojo.body();
                  if(dojo.isMozilla){
                          return {w: dd.clientWidth, h: w.innerHeight};   // Object
                  }else if(!dojo.isOpera && w.innerWidth){
                          return {w: w.innerWidth, h: w.innerHeight};             // Object
                  }else if (!dojo.isOpera && dd && dd.clientWidth){
                          return {w: dd.clientWidth, h: dd.clientHeight}; // Object
                  }else if (b.clientWidth){
                          return {w: b.clientWidth, h: b.clientHeight};   // Object
                  }
                  return null;    // Object
          },
          
          toggleDisplay: function(node) {
            dojo.style(node, "display", dojo.style(node, "display") == "none" ? "": "none");
          },
          
          
          
          endsWith: function(/*string*/str, /*string*/end, /*boolean*/ignoreCase){
                  // summary:
                  //      Returns true if 'str' ends with 'end'
          
                  if(ignoreCase){
                          str = str.toLowerCase();
                          end = end.toLowerCase();
                  }
                  if((str.length - end.length) < 0){
                          return false; // boolean
                  }
                  return str.lastIndexOf(end) == str.length - end.length; // boolean
          },
          
          hide: function(n){
                  dojo.style(n, "display", "none");
          },
          
          show: function(n){
                  dojo.style(n, "display", "");
          }
  });
  
  return cm;
});

},
'url:dijit/layout/templates/ScrollingTabController.html':"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n",
'dijit/_base/focus':function(){
define("dijit/_base/focus", [
	"dojo/_base/array", // array.forEach
	"dojo/dom", // dom.isDescendant
	"dojo/_base/lang", // lang.isArray
	"dojo/topic", // publish
	"dojo/_base/window", // win.doc win.doc.selection win.global win.global.getSelection win.withGlobal
	"../focus",
	".."	// for exporting symbols to dijit
], function(array, dom, lang, topic, win, focus, dijit){

	// module:
	//		dijit/_base/focus
	// summary:
	//		Deprecated module to monitor currently focused node and stack of currently focused widgets.
	//		New code should access dijit/focus directly.

	lang.mixin(dijit, {
		// _curFocus: DomNode
		//		Currently focused item on screen
		_curFocus: null,

		// _prevFocus: DomNode
		//		Previously focused item on screen
		_prevFocus: null,

		isCollapsed: function(){
			// summary:
			//		Returns true if there is no text selected
			return dijit.getBookmark().isCollapsed;
		},

		getBookmark: function(){
			// summary:
			//		Retrieves a bookmark that can be used with moveToBookmark to return to the same range
			var bm, rg, tg, sel = win.doc.selection, cf = focus.curNode;

			if(win.global.getSelection){
				//W3C Range API for selections.
				sel = win.global.getSelection();
				if(sel){
					if(sel.isCollapsed){
						tg = cf? cf.tagName : "";
						if(tg){
							//Create a fake rangelike item to restore selections.
							tg = tg.toLowerCase();
							if(tg == "textarea" ||
									(tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))){
								sel = {
									start: cf.selectionStart,
									end: cf.selectionEnd,
									node: cf,
									pRange: true
								};
								return {isCollapsed: (sel.end <= sel.start), mark: sel}; //Object.
							}
						}
						bm = {isCollapsed:true};
						if(sel.rangeCount){
							bm.mark = sel.getRangeAt(0).cloneRange();
						}
					}else{
						rg = sel.getRangeAt(0);
						bm = {isCollapsed: false, mark: rg.cloneRange()};
					}
				}
			}else if(sel){
				// If the current focus was a input of some sort and no selection, don't bother saving
				// a native bookmark.  This is because it causes issues with dialog/page selection restore.
				// So, we need to create psuedo bookmarks to work with.
				tg = cf ? cf.tagName : "";
				tg = tg.toLowerCase();
				if(cf && tg && (tg == "button" || tg == "textarea" || tg == "input")){
					if(sel.type && sel.type.toLowerCase() == "none"){
						return {
							isCollapsed: true,
							mark: null
						}
					}else{
						rg = sel.createRange();
						return {
							isCollapsed: rg.text && rg.text.length?false:true,
							mark: {
								range: rg,
								pRange: true
							}
						};
					}
				}
				bm = {};

				//'IE' way for selections.
				try{
					// createRange() throws exception when dojo in iframe
					//and nothing selected, see #9632
					rg = sel.createRange();
					bm.isCollapsed = !(sel.type == 'Text' ? rg.htmlText.length : rg.length);
				}catch(e){
					bm.isCollapsed = true;
					return bm;
				}
				if(sel.type.toUpperCase() == 'CONTROL'){
					if(rg.length){
						bm.mark=[];
						var i=0,len=rg.length;
						while(i<len){
							bm.mark.push(rg.item(i++));
						}
					}else{
						bm.isCollapsed = true;
						bm.mark = null;
					}
				}else{
					bm.mark = rg.getBookmark();
				}
			}else{
				console.warn("No idea how to store the current selection for this browser!");
			}
			return bm; // Object
		},

		moveToBookmark: function(/*Object*/ bookmark){
			// summary:
			//		Moves current selection to a bookmark
			// bookmark:
			//		This should be a returned object from dijit.getBookmark()

			var _doc = win.doc,
				mark = bookmark.mark;
			if(mark){
				if(win.global.getSelection){
					//W3C Rangi API (FF, WebKit, Opera, etc)
					var sel = win.global.getSelection();
					if(sel && sel.removeAllRanges){
						if(mark.pRange){
							var n = mark.node;
							n.selectionStart = mark.start;
							n.selectionEnd = mark.end;
						}else{
							sel.removeAllRanges();
							sel.addRange(mark);
						}
					}else{
						console.warn("No idea how to restore selection for this browser!");
					}
				}else if(_doc.selection && mark){
					//'IE' way.
					var rg;
					if(mark.pRange){
						rg = mark.range;
					}else if(lang.isArray(mark)){
						rg = _doc.body.createControlRange();
						//rg.addElement does not have call/apply method, so can not call it directly
						//rg is not available in "range.addElement(item)", so can't use that either
						array.forEach(mark, function(n){
							rg.addElement(n);
						});
					}else{
						rg = _doc.body.createTextRange();
						rg.moveToBookmark(mark);
					}
					rg.select();
				}
			}
		},

		getFocus: function(/*Widget?*/ menu, /*Window?*/ openedForWindow){
			// summary:
			//		Called as getFocus(), this returns an Object showing the current focus
			//		and selected text.
			//
			//		Called as getFocus(widget), where widget is a (widget representing) a button
			//		that was just pressed, it returns where focus was before that button
			//		was pressed.   (Pressing the button may have either shifted focus to the button,
			//		or removed focus altogether.)   In this case the selected text is not returned,
			//		since it can't be accurately determined.
			//
			// menu: dijit._Widget or {domNode: DomNode} structure
			//		The button that was just pressed.  If focus has disappeared or moved
			//		to this button, returns the previous focus.  In this case the bookmark
			//		information is already lost, and null is returned.
			//
			// openedForWindow:
			//		iframe in which menu was opened
			//
			// returns:
			//		A handle to restore focus/selection, to be passed to `dijit.focus`
			var node = !focus.curNode || (menu && dom.isDescendant(focus.curNode, menu.domNode)) ? dijit._prevFocus : focus.curNode;
			return {
				node: node,
				bookmark: node && (node == focus.curNode) && win.withGlobal(openedForWindow || win.global, dijit.getBookmark),
				openedForWindow: openedForWindow
			}; // Object
		},

		// _activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		_activeStack: [],

		registerIframe: function(/*DomNode*/ iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle to pass to unregisterIframe()
			return focus.registerIframe(iframe);
		},

		unregisterIframe: function(/*Object*/ handle){
			// summary:
			//		Unregisters listeners on the specified iframe created by registerIframe.
			//		After calling be sure to delete or null out the handle itself.
			// handle:
			//		Handle returned by registerIframe()

			handle && handle.remove();
		},

		registerWin: function(/*Window?*/targetWindow, /*DomNode?*/ effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow:
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode:
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle to pass to unregisterWin()

			return focus.registerWin(targetWindow, effectiveNode);
		},

		unregisterWin: function(/*Handle*/ handle){
			// summary:
			//		Unregisters listeners on the specified window (either the main
			//		window or an iframe's window) according to handle returned from registerWin().
			//		After calling be sure to delete or null out the handle itself.

			handle && handle.remove();
		}
	});

	// Override focus singleton's focus function so that dijit.focus()
	// has backwards compatible behavior of restoring selection (although
	// probably no one is using that).
	focus.focus = function(/*Object || DomNode */ handle){
		// summary:
		//		Sets the focused node and the selection according to argument.
		//		To set focus to an iframe's content, pass in the iframe itself.
		// handle:
		//		object returned by get(), or a DomNode

		if(!handle){ return; }

		var node = "node" in handle ? handle.node : handle,		// because handle is either DomNode or a composite object
			bookmark = handle.bookmark,
			openedForWindow = handle.openedForWindow,
			collapsed = bookmark ? bookmark.isCollapsed : false;

		// Set the focus
		// Note that for iframe's we need to use the <iframe> to follow the parentNode chain,
		// but we need to set focus to iframe.contentWindow
		if(node){
			var focusNode = (node.tagName.toLowerCase() == "iframe") ? node.contentWindow : node;
			if(focusNode && focusNode.focus){
				try{
					// Gecko throws sometimes if setting focus is impossible,
					// node not displayed or something like that
					focusNode.focus();
				}catch(e){/*quiet*/}
			}
			focus._onFocusNode(node);
		}

		// set the selection
		// do not need to restore if current selection is not empty
		// (use keyboard to select a menu item) or if previous selection was collapsed
		// as it may cause focus shift (Esp in IE).
		if(bookmark && win.withGlobal(openedForWindow || win.global, dijit.isCollapsed) && !collapsed){
			if(openedForWindow){
				openedForWindow.focus();
			}
			try{
				win.withGlobal(openedForWindow || win.global, dijit.moveToBookmark, null, [bookmark]);
			}catch(e2){
				/*squelch IE internal error, see http://trac.dojotoolkit.org/ticket/1984 */
			}
		}
	};

	// For back compatibility, monitor changes to focused node and active widget stack,
	// publishing events and copying changes from focus manager variables into dijit (top level) variables
	focus.watch("curNode", function(name, oldVal, newVal){
		dijit._curFocus = newVal;
		dijit._prevFocus = oldVal;
		if(newVal){
			topic.publish("focusNode", newVal);	// publish
		}
	});
	focus.watch("activeStack", function(name, oldVal, newVal){
		dijit._activeStack = newVal;
	});

	focus.on("widget-blur", function(widget, by){
		topic.publish("widgetBlur", widget, by);	// publish
	});
	focus.on("widget-focus", function(widget, by){
		topic.publish("widgetFocus", widget, by);	// publish
	});

	return dijit;
});

},
'curam/util/ScreenContext':function(){
define("curam/util/ScreenContext", [], function() {
  
  var CONTEXT_KEYS = {
      DEFAULT_CONTEXT: 112,
      SAMPLE22: 2,
      SAMPLE21: 1,
      SAMPLE13: 4,
      SAMPLE12: 2,
      SAMPLE11: 1,
      EXTAPP: 1048576,
      CONTEXT_PORTLET: 524288,
      SMART_PANEL: 262144,
      NESTED_UIM: 131072,
      ORG_TREE: 65536,
      CONTEXT_PANEL: 32768,
      LIST_ROW_INLINE_PAGE: 8192,
      LIST_EVEN_ROW: 16384,
      TAB: 4096,
      TREE: 2048,
      AGENDA: 1024,
      POPUP: 512,
      MODAL: 256,
      HOME: 128,
      HEADER: 64,
      NAVIGATOR: 32,
      FOOTER: 16,
      OVAL: 8,
      RESOLVE: 4,
      ACTION: 2,
      ERROR: 1,
      EMPTY: 0
  };
  
  var CTX_NAMES = [['ERROR', 'ACTION', 'RESOLVE', 'OPT_VALIDATION',
                       'FOOTER', 'NAVIGATOR', 'HEADER',
                       'HOME_PAGE', 'MODAL', 'POPUP', 'AGENDA','TREE', 'TAB', 
                       'LIST_EVEN_ROW', 'LIST_ROW_INLINE_PAGE', 'CONTEXT_PANEL', 
                       'ORG_TREE','NESTED_UIM','SMART_PANEL',
                       'CONTEXT_PORTLET','EXTAPP'],
                   ['SAMPLE11', 'SAMPLE12','SAMPLE13'],
                   ['SAMPLE21','SAMPLE22']];
  
  var ScreenContext = dojo.declare("curam.util.ScreenContext", null, {
    constructor: function(initialContext){
      // summary:
      //    Sets up the ScreenContext with either the initialContext parameter
      //    or a default context
      
      if (initialContext) {
        
        this.setContext(initialContext);
      } else {
        // What's the point of the OR here? Aren't they the same?
        this.currentContext = [
              CONTEXT_KEYS["DEFAULT_CONTEXT"] | CONTEXT_KEYS["DEFAULT_CONTEXT"]];
      }
    },
    
    setContext: function(newContext) {
      // summary:
      //    Sets the context. If null, a default context is used.
      var tmp = this.setup(newContext);
      
      this.currentContext =  
        ((tmp == null) ? 
         ([CONTEXT_KEYS["DEFAULT_CONTEXT"] | CONTEXT_KEYS["DEFAULT_CONTEXT"]]) : (tmp));
    },
  
    addContextBits: function(contextBits, idx) {
      // summary:
      //    Adds context bits to the existing context
      if (!contextBits) {
        return;
      }
      var navig = (idx) ? idx : 0;
      var pContext = this.parseContext(contextBits);
      if (pContext != null) {
        this.currentContext[navig] |= pContext;
      }
      return this.currentContext[navig];
    },
  
    addAll: function(idx) {
      // summary:
      //    all in all ranges! if idx == null, all ranges, otherwise - selected
      var navig = (idx)? idx : 0;
      this.currentContext[navig] = 4294967295;
      return this.currentContext[navig];
    },
  
    clear: function(contextBits, idx) {
      // summary:
      //    Clears the given named context bits
      if (!contextBits) {
        this.clearAll();
        return;
      }
      var navig = (idx)? idx : 0;
      if (contextBits == 0) {
        return this.currentContext[navig];
      }
      var pContext = this.parseContext(contextBits);
      if (pContext != null) {
        var clearedBits = this.currentContext[navig] & pContext;
        this.currentContext[navig] ^= clearedBits;
      }
      return this.currentContext[navig];
    },
  
    clearAll: function(idx) {
      // summary:
      //    all in all ranges! if idx == null, all ranges, otherwise - selected
      if (idx) {
        this.currentContext[idx] = 0;
      } else {
        for (var i = 0; i <this.currentContext.length; i++) {
          this.currentContext[i] = 0;
        }
      }
    },
  
    updateStates: function(newContext) {
      this.clear('ERROR|ACTION|RESOLVE');
      this.currentContext[0] = this.currentContext[0] | (newContext & 7);
    },
  
    hasContextBits: function(contextBits, idx) {
      if (!contextBits) {
        return false;
      }
      var navig = (idx) ? idx : 0;
      var pContext = this.parseContext(contextBits);
      if (pContext != null) {
        var merge = this.currentContext[navig] & pContext;
        
        return (merge == pContext);
      }
      return false;
    },
  
    getValue: function() {
      // summary:
      //    Gets the value of the context.
      var outputVal = "";
      for (var i = 0; i < this.currentContext.length; i++) {
        outputVal += this.currentContext[i] + "|";
      }
      return outputVal.substring(0,outputVal.length-1);
    },
  
    toRequestString: function() {
      return "o3ctx=" + this.getValue();
    },
  
    toBinary: function() {
      var binaryStr = "";
      for (var i = 0; i < this.currentContext.length; i++) {
        binaryStr += this.currentContext[i].toString(2) + "|";
      }
      return binaryStr.substring(0,binaryStr.length-1);
    },
  
    toString: function() {
      var accumulatedContext = "";
      for (var i = 0; i < this.currentContext.length; i++) {
        var ctxList = "";
        var j = 0;
        while (j < CTX_NAMES[i].length) {
          if (((this.currentContext[i] >> j) & 1) != 0) {
            ctxList +="," + CTX_NAMES[i][j];
          }
          j++;
        }
        if (ctxList == '') {
          return "{}";
        }
        accumulatedContext += 
          "|" + ctxList.replace(",", "{") + ((ctxList.length == 0)?"" : "}");
      }
      return accumulatedContext.substring(1);
    },
  
    parseContext: function(contextString) {
      var tmpString = contextString.replace(/,/g, "|");
      
      var parts = tmpString.split("|");
      var tmp = isNaN(parts[0]) ? parseInt(CONTEXT_KEYS[parts[0]]) : parts[0];
      
      for(var i = 1; i < parts.length; i++){
        tmp = tmp | (isNaN(parts[i]) ? parseInt(CONTEXT_KEYS[parts[i]]) : parts[i]);
      }

      return (isNaN(tmp) ? null : tmp);
    },
  
    setup: function(stringWithBars) {
      // summary:
      //    Sets up the context using a string delimited by '|'
      if (!stringWithBars) {
        return null;
      }
      var initialArray = ("" + stringWithBars).split("|");
      var resultArray = new Array(initialArray.length);
      
      for (var i = 0; i < initialArray.length; i++) {
        resultArray[i] = 
            this.parseContext(initialArray[initialArray.length - i - 1]);
        resultArray[i] = resultArray[i] | resultArray[i];
        if (!resultArray[i] 
              || isNaN(resultArray[i]) 
              || resultArray[i] > 4294967295) {
          return null;
        }
      }
      return resultArray;
    }
  });
  
  return ScreenContext;
});

},
'dijit/a11y':function(){
define("dijit/a11y", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/config", // defaultDuration
	"dojo/_base/declare", // declare
	"dojo/dom",			// dom.byId
	"dojo/dom-attr", // domAttr.attr domAttr.has
	"dojo/dom-style", // style.style
	"dojo/_base/sniff", // has("ie")
	"./_base/manager",	// manager._isElementShown
	"."	// for exporting methods to dijit namespace
], function(array, config, declare, dom, domAttr, domStyle, has, manager, dijit){

	// module:
	//		dijit/a11y
	// summary:
	//		Accessibility utility functions (keyboard, tab stops, etc.)

	var shown = (dijit._isElementShown = function(/*Element*/ elem){
		var s = domStyle.get(elem);
		return (s.visibility != "hidden")
			&& (s.visibility != "collapsed")
			&& (s.display != "none")
			&& (domAttr.get(elem, "type") != "hidden");
	});

	dijit.hasDefaultTabStop = function(/*Element*/ elem){
		// summary:
		//		Tests if element is tab-navigable even without an explicit tabIndex setting

		// No explicit tabIndex setting, need to investigate node type
		switch(elem.nodeName.toLowerCase()){
			case "a":
				// An <a> w/out a tabindex is only navigable if it has an href
				return domAttr.has(elem, "href");
			case "area":
			case "button":
			case "input":
			case "object":
			case "select":
			case "textarea":
				// These are navigable by default
				return true;
			case "iframe":
				// If it's an editor <iframe> then it's tab navigable.
				var body;
				try{
					// non-IE
					var contentDocument = elem.contentDocument;
					if("designMode" in contentDocument && contentDocument.designMode == "on"){
						return true;
					}
					body = contentDocument.body;
				}catch(e1){
					// contentWindow.document isn't accessible within IE7/8
					// if the iframe.src points to a foreign url and this
					// page contains an element, that could get focus
					try{
						body = elem.contentWindow.document.body;
					}catch(e2){
						return false;
					}
				}
				return body && (body.contentEditable == 'true' ||
					(body.firstChild && body.firstChild.contentEditable == 'true'));
			default:
				return elem.contentEditable == 'true';
		}
	};

	var isTabNavigable = (dijit.isTabNavigable = function(/*Element*/ elem){
		// summary:
		//		Tests if an element is tab-navigable

		// TODO: convert (and rename method) to return effective tabIndex; will save time in _getTabNavigable()
		if(domAttr.get(elem, "disabled")){
			return false;
		}else if(domAttr.has(elem, "tabIndex")){
			// Explicit tab index setting
			return domAttr.get(elem, "tabIndex") >= 0; // boolean
		}else{
			// No explicit tabIndex setting, so depends on node type
			return dijit.hasDefaultTabStop(elem);
		}
	});

	dijit._getTabNavigable = function(/*DOMNode*/ root){
		// summary:
		//		Finds descendants of the specified root node.
		//
		// description:
		//		Finds the following descendants of the specified root node:
		//		* the first tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the last tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the first element in document order with the lowest
		//		  positive tabIndex value
		//		* the last element in document order with the highest
		//		  positive tabIndex value
		var first, last, lowest, lowestTabindex, highest, highestTabindex, radioSelected = {};

		function radioName(node){
			// If this element is part of a radio button group, return the name for that group.
			return node && node.tagName.toLowerCase() == "input" &&
				node.type && node.type.toLowerCase() == "radio" &&
				node.name && node.name.toLowerCase();
		}

		var walkTree = function(/*DOMNode*/parent){
			for(var child = parent.firstChild; child; child = child.nextSibling){
				// Skip text elements, hidden elements, and also non-HTML elements (those in custom namespaces) in IE,
				// since show() invokes getAttribute("type"), which crash on VML nodes in IE.
				if(child.nodeType != 1 || (has("ie") <= 9 && child.scopeName !== "HTML") || !shown(child)){
					continue;
				}

				if(isTabNavigable(child)){
					var tabindex = domAttr.get(child, "tabIndex");
					if(!domAttr.has(child, "tabIndex") || tabindex == 0){
						if(!first){
							first = child;
						}
						last = child;
					}else if(tabindex > 0){
						if(!lowest || tabindex < lowestTabindex){
							lowestTabindex = tabindex;
							lowest = child;
						}
						if(!highest || tabindex >= highestTabindex){
							highestTabindex = tabindex;
							highest = child;
						}
					}
					var rn = radioName(child);
					if(domAttr.get(child, "checked") && rn){
						radioSelected[rn] = child;
					}
				}
				if(child.nodeName.toUpperCase() != 'SELECT'){
					walkTree(child);
				}
			}
		};
		if(shown(root)){
			walkTree(root);
		}
		function rs(node){
			// substitute checked radio button for unchecked one, if there is a checked one with the same name.
			return radioSelected[radioName(node)] || node;
		}

		return { first: rs(first), last: rs(last), lowest: rs(lowest), highest: rs(highest) };
	};
	dijit.getFirstInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is first in the tabbing order
		var elems = dijit._getTabNavigable(dom.byId(root));
		return elems.lowest ? elems.lowest : elems.first; // DomNode
	};

	dijit.getLastInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is last in the tabbing order
		var elems = dijit._getTabNavigable(dom.byId(root));
		return elems.last ? elems.last : elems.highest; // DomNode
	};

	return {
		hasDefaultTabStop: dijit.hasDefaultTabStop,
		isTabNavigable: dijit.isTabNavigable,
		_getTabNavigable: dijit._getTabNavigable,
		getFirstInTabbingOrder: dijit.getFirstInTabbingOrder,
		getLastInTabbingOrder: dijit.getLastInTabbingOrder
	};
});

},
'idx/oneui/form/_ValidationMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/form/_ValidationMixin", [
	"dojo/_base/declare", 
	"dojo/dom-style", 
	"dojo/i18n", 
	"dijit/_base/wai", 
	"../HoverHelpTooltip", 
	"dojo/i18n!dijit/form/nls/validate"
], function(declare, domStyle, i18n, wai, HoverHelpTooltip, nls){
	/**
	 * @public
	 * @name idx.oneui.form._ValidationMixin
	 * @class Mix-in class to enable form widget perform validation, implemented according to 
	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y14&vsub=*&hsub=*&openpanes=0000011100">Validation</a></b>.
	 */
	return declare("idx.oneui.form._ValidationMixin", null, 
	/**@lends idx.oneui.form._ValidationMixin#*/
	{
		/**
		 * Configurable flag of the validation timing, the widget fires validation when widget get input by setting true, 
		 * fire validation when widget get blur by setting false.
		 * @type boolean
		 * @default false
		 */
		instantValidate: false,
		
		// required: Boolean
		//		Indicate whether this widget must have a value
		/**
		 * Indicate whether this widget must have a value
		 * @type boolean
		 * @default false
		 */
		required: false,
		
		/**
		 * The message to display if value is invalid
		 * @type String
		 */
		invalidMessage: "$_unset_$",
		
		/**
		 * The message to display if value is empty and the field is required
		 * @type String
		 */
		missingMessage: null,
		
		/**
		 * The position of the hoverhelpTooltip
		 * @type String[]
		 */
		tooltipPosition: [],
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this.missingMessage || (this.missingMessage = nls.missingMessage);
		},
		
		postCreate: function(){
			this.inherited(arguments);
			
			if(this.instantValidate){
				this.connect(this, this.extension["input"], function(){
					this.validate(this.focused);
				});
			}else{
				this.connect(this, this.extension["blur"], function(){
					this.validate(this.focused);
				});
				this.connect(this, this.extension["focus"], function(){
					this._set("state", "");
					if(this.message == ""){return;}
					this.displayMessage(this.message);
					this.message = "";
				});
				this.connect(this, this.extension["input"], function(){
					this.displayMessage();
				});
			}
			
			
			this.connect(this.iconNode, "onmouseenter", function(){
				if(this.message && domStyle.get(this.iconNode, "visibility") == "visible"){
					HoverHelpTooltip.show(this.message, this.iconNode, this.tooltipPosition, !this.isLeftToRight());
				}
			});
		},
		
		/**
		 * Tests if value is valid.
		 * Can override with the routine in a subclass.
		 * @public
		 * @param {boolean} isFocused
		 * If the widget focused
		 */
		_isValid: function(/*Boolean*/ isFocused){
			return this.isValid(isFocused) && !(this.required && this._isEmpty());
		},
		
		/**
		 * Checks if value is empty.
		 * Should be override with the routine in a subclass
		 * @public
		 */
		_isEmpty: function(){
			// summary:
			// 		Checks for whitespace. Should be overridden.
			return false;
		},
		
		/**
		 * Extension point for user customizing validation rules.
		 * @param {boolean} isFocused
		 */
		isValid: function(isFocused){
			return true;
		},
		
		/**
		 * Return proper error message according to the error type
		 * @param {boolean} isFocused
		 */
		getErrorMessage: function(/*Boolean*/ isFocused){
			return (this.required && this._isEmpty()) ? this.missingMessage : this.invalidMessage;
		},
		
		/**
		 * Perform validation for the widget, called by "input" event if "instantValidate" setting to true,
		 * called by "blur" event if "instantValidate" setting to false.
		 * @param {boolean} isFocused
		 */
		validate: function(/*Boolean*/ isFocused){
			var message, isValid = this.disabled || this._isValid(isFocused);
			
			this.set("state", isValid ? "" : "Error");
			wai.setWaiState(this.focusNode, "invalid", !isValid);
			if(this.state == "Error"){
				message = this.getErrorMessage(isFocused);
			}
			this._set("message", message);
			this.displayMessage(message);
			return isValid;
		},
		
		/**
		 * Show error message using a hoverHelpTooltip, hide the tooltip if message is empty.
		 * Overridable method to display validation errors/hints.
		 * By default uses a hoverHelpTooltip.
		 * @protected
		 * @param {string} message
		 * Error message
		 * @param {boolean} force
		 * Force displaying message if the value is true, no matter if the widget got focus or not.
		 */
		displayMessage: function(/*String*/ message, /*Boolean*/ force){
			HoverHelpTooltip.hide(this.oneuiBaseNode);
			HoverHelpTooltip.hide(this.iconNode);
			if(message && this.focused || force){
				var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
				HoverHelpTooltip.show(message, node, this.tooltipPosition, !this.isLeftToRight());
			}
		},
		
		_onBlur: function(){
			this.inherited(arguments);
			this.displayMessage("");
		}
	});
});


},
'dijit/form/_ToggleButtonMixin':function(){
define("dijit/form/_ToggleButtonMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr" // domAttr.set
], function(declare, domAttr){

// module:
//		dijit/form/_ToggleButtonMixin
// summary:
//		A mixin to provide functionality to allow a button that can be in two states (checked or not).

return declare("dijit.form._ToggleButtonMixin", null, {
	// summary:
	//		A mixin to provide functionality to allow a button that can be in two states (checked or not).

	// checked: Boolean
	//		Corresponds to the native HTML <input> element's attribute.
	//		In markup, specified as "checked='checked'" or just "checked".
	//		True if the button is depressed, or the checkbox is checked,
	//		or the radio button is selected, etc.
	checked: false,

	// aria-pressed for toggle buttons, and aria-checked for checkboxes
	_aria_attr: "aria-pressed",

	_onClick: function(/*Event*/ evt){
		var original = this.checked;
		this._set('checked', !original); // partially set the toggled value, assuming the toggle will work, so it can be overridden in the onclick handler
		var ret = this.inherited(arguments); // the user could reset the value here
		this.set('checked', ret ? this.checked : original); // officially set the toggled or user value, or reset it back
		return ret;
	},

	_setCheckedAttr: function(/*Boolean*/ value, /*Boolean?*/ priorityChange){
		this._set("checked", value);
		domAttr.set(this.focusNode || this.domNode, "checked", value);
		(this.focusNode || this.domNode).setAttribute(this._aria_attr, value ? "true" : "false"); // aria values should be strings
		this._handleOnChange(value, priorityChange);
	},

	reset: function(){
		// summary:
		//		Reset the widget's value to what it was at initialization time

		this._hasBeenBlurred = false;

		// set checked state to original setting
		this.set('checked', this.params.checked || false);
	}
});

});

},
'dijit/_Widget':function(){
define("dijit/_Widget", [
	"dojo/aspect",	// aspect.around
	"dojo/_base/config",	// config.isDebug
	"dojo/_base/connect",	// connect.connect
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.hitch
	"dojo/query",
	"dojo/ready",
	"./registry",	// registry.byNode
	"./_WidgetBase",
	"./_OnDijitClickMixin",
	"./_FocusMixin",
	"dojo/uacss",		// browser sniffing (included for back-compat; subclasses may be using)
	"./hccss"		// high contrast mode sniffing (included to set CSS classes on <body>, module ret value unused)
], function(aspect, config, connect, declare, kernel, lang, query, ready,
			registry, _WidgetBase, _OnDijitClickMixin, _FocusMixin){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _OnDijitClickMixin = dijit._OnDijitClickMixin;
	var _FocusMixin = dijit._FocusMixin;
=====*/


// module:
//		dijit/_Widget
// summary:
//		Old base for widgets.   New widgets should extend _WidgetBase instead


function connectToDomNode(){
	// summary:
	//		If user connects to a widget method === this function, then they will
	//		instead actually be connecting the equivalent event on this.domNode
}

// Trap dojo.connect() calls to connectToDomNode methods, and redirect to _Widget.on()
function aroundAdvice(originalConnect){
	return function(obj, event, scope, method){
		if(obj && typeof event == "string" && obj[event] == connectToDomNode){
			return obj.on(event.substring(2).toLowerCase(), lang.hitch(scope, method));
		}
		return originalConnect.apply(connect, arguments);
	};
}
aspect.around(connect, "connect", aroundAdvice);
if(kernel.connect){
	aspect.around(kernel, "connect", aroundAdvice);
}

var _Widget = declare("dijit._Widget", [_WidgetBase, _OnDijitClickMixin, _FocusMixin], {
	// summary:
	//		Base class for all Dijit widgets.
	//
	//		Extends _WidgetBase, adding support for:
	//			- declaratively/programatically specifying widget initialization parameters like
	//				onMouseMove="foo" that call foo when this.domNode gets a mousemove event
	//			- ondijitclick
	//				Support new data-dojo-attach-event="ondijitclick: ..." that is triggered by a mouse click or a SPACE/ENTER keypress
	//			- focus related functions
	//				In particular, the onFocus()/onBlur() callbacks.   Driven internally by
	//				dijit/_base/focus.js.
	//			- deprecated methods
	//			- onShow(), onHide(), onClose()
	//
	//		Also, by loading code in dijit/_base, turns on:
	//			- browser sniffing (putting browser id like .dj_ie on <html> node)
	//			- high contrast mode sniffing (add .dijit_a11y class to <body> if machine is in high contrast mode)


	////////////////// DEFERRED CONNECTS ///////////////////

	onClick: connectToDomNode,
	/*=====
	onClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onDblClick: connectToDomNode,
	/*=====
	onDblClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse double click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onKeyDown: connectToDomNode,
	/*=====
	onKeyDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being pressed down.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyPress: connectToDomNode,
	/*=====
	onKeyPress: function(event){
		// summary:
		//		Connect to this function to receive notifications of printable keys being typed.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyUp: connectToDomNode,
	/*=====
	onKeyUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being released.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onMouseDown: connectToDomNode,
	/*=====
	onMouseDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is pressed down.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseMove: connectToDomNode,
	/*=====
	onMouseMove: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves over nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOut: connectToDomNode,
	/*=====
	onMouseOut: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOver: connectToDomNode,
	/*=====
	onMouseOver: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseLeave: connectToDomNode,
	/*=====
	onMouseLeave: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseEnter: connectToDomNode,
	/*=====
	onMouseEnter: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseUp: connectToDomNode,
	/*=====
	onMouseUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is released.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/

	constructor: function(params){
		// extract parameters like onMouseMove that should connect directly to this.domNode
		this._toConnect = {};
		for(var name in params){
			if(this[name] === connectToDomNode){
				this._toConnect[name.replace(/^on/, "").toLowerCase()] = params[name];
				delete params[name];
			}
		}
	},

	postCreate: function(){
		this.inherited(arguments);

		// perform connection from this.domNode to user specified handlers (ex: onMouseMove)
		for(var name in this._toConnect){
			this.on(name, this._toConnect[name]);
		}
		delete this._toConnect;
	},

	on: function(/*String*/ type, /*Function*/ func){
		if(this[this._onMap(type)] === connectToDomNode){
			// Use connect.connect() rather than on() to get handling for "onmouseenter" on non-IE, etc.
			// Also, need to specify context as "this" rather than the default context of the DOMNode
			return connect.connect(this.domNode, type.toLowerCase(), this, func);
		}
		return this.inherited(arguments);
	},

	_setFocusedAttr: function(val){
		// Remove this method in 2.0 (or sooner), just here to set _focused == focused, for back compat
		// (but since it's a private variable we aren't required to keep supporting it).
		this._focused = val;
		this._set("focused", val);
	},

	////////////////// DEPRECATED METHODS ///////////////////

	setAttribute: function(/*String*/ attr, /*anything*/ value){
		// summary:
		//		Deprecated.  Use set() instead.
		// tags:
		//		deprecated
		kernel.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
		this.set(attr, value);
	},

	attr: function(/*String|Object*/name, /*Object?*/value){
		// summary:
		//		Set or get properties on a widget instance.
		//	name:
		//		The property to get or set. If an object is passed here and not
		//		a string, its keys are used as names of attributes to be set
		//		and the value of the object as values to set in the widget.
		//	value:
		//		Optional. If provided, attr() operates as a setter. If omitted,
		//		the current value of the named property is returned.
		// description:
		//		This method is deprecated, use get() or set() directly.

		// Print deprecation warning but only once per calling function
		if(config.isDebug){
			var alreadyCalledHash = arguments.callee._ach || (arguments.callee._ach = {}),
				caller = (arguments.callee.caller || "unknown caller").toString();
			if(!alreadyCalledHash[caller]){
				kernel.deprecated(this.declaredClass + "::attr() is deprecated. Use get() or set() instead, called from " +
				caller, "", "2.0");
				alreadyCalledHash[caller] = true;
			}
		}

		var args = arguments.length;
		if(args >= 2 || typeof name === "object"){ // setter
			return this.set.apply(this, arguments);
		}else{ // getter
			return this.get(name);
		}
	},

	getDescendants: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		This method should generally be avoided as it returns widgets declared in templates, which are
		//		supposed to be internal/hidden, but it's left here for back-compat reasons.

		kernel.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.", "", "2.0");
		return this.containerNode ? query('[widgetId]', this.containerNode).map(registry.byNode) : []; // dijit._Widget[]
	},

	////////////////// MISCELLANEOUS METHODS ///////////////////

	_onShow: function(){
		// summary:
		//		Internal method called when this widget is made visible.
		//		See `onShow` for details.
		this.onShow();
	},

	onShow: function(){
		// summary:
		//		Called when this widget becomes the selected pane in a
		//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
		//		`dijit.layout.AccordionContainer`, etc.
		//
		//		Also called to indicate display of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
		// tags:
		//		callback
	},

	onHide: function(){
		// summary:
			//		Called when another widget becomes the selected pane in a
			//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
			//		`dijit.layout.AccordionContainer`, etc.
			//
			//		Also called to indicate hide of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
			// tags:
			//		callback
	},

	onClose: function(){
		// summary:
		//		Called when this widget is being displayed as a popup (ex: a Calendar popped
		//		up from a DateTextBox), and it is hidden.
		//		This is called from the dijit.popup code, and should not be called directly.
		//
		//		Also used as a parameter for children of `dijit.layout.StackContainer` or subclasses.
		//		Callback if a user tries to close the child.   Child will be closed if this function returns true.
		// tags:
		//		extension

		return true;		// Boolean
	}
});

// For back-compat, remove in 2.0.
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/_base"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}
return _Widget;
});

},
'dojo/touch':function(){
define("dojo/touch", ["./_base/kernel", "./on", "./has", "./mouse"], function(dojo, on, has, mouse){
// module:
//		dojo/touch

/*=====
	dojo.touch = {
		// summary:
		//		This module provides unified touch event handlers by exporting
		//		press, move, release and cancel which can also run well on desktop.
		//		Based on http://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html
		//
		// example:
		//		1. Used with dojo.connect()
		//		|	dojo.connect(node, dojo.touch.press, function(e){});
		//		|	dojo.connect(node, dojo.touch.move, function(e){});
		//		|	dojo.connect(node, dojo.touch.release, function(e){});
		//		|	dojo.connect(node, dojo.touch.cancel, function(e){});
		//
		//		2. Used with dojo.on
		//		|	define(["dojo/on", "dojo/touch"], function(on, touch){
		//		|		on(node, touch.press, function(e){});
		//		|		on(node, touch.move, function(e){});
		//		|		on(node, touch.release, function(e){});
		//		|		on(node, touch.cancel, function(e){});
		//
		//		3. Used with dojo.touch.* directly
		//		|	dojo.touch.press(node, function(e){});
		//		|	dojo.touch.move(node, function(e){});
		//		|	dojo.touch.release(node, function(e){});
		//		|	dojo.touch.cancel(node, function(e){});
		
		press: function(node, listener){
			// summary:
			//		Register a listener to 'touchstart'|'mousedown' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		move: function(node, listener){
			// summary:
			//		Register a listener to 'touchmove'|'mousemove' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		release: function(node, listener){
			// summary:
			//		Register a listener to 'touchend'|'mouseup' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		cancel: function(node, listener){
			// summary:
			//		Register a listener to 'touchcancel'|'mouseleave' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		}
	};
=====*/

	function _handle(/*String - press | move | release | cancel*/type){
		return function(node, listener){//called by on(), see dojo.on
			return on(node, type, listener);
		};
	}
	var touch = has("touch");
	//device neutral events - dojo.touch.press|move|release|cancel
	dojo.touch = {
		press: _handle(touch ? "touchstart": "mousedown"),
		move: _handle(touch ? "touchmove": "mousemove"),
		release: _handle(touch ? "touchend": "mouseup"),
		cancel: touch ? _handle("touchcancel") : mouse.leave
	};
	return dojo.touch;
});
},
'idx/oneui/form/FilteringSelect':function(){
require({cache:{
'url:idx/oneui/form/templates/ComboBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>"}});
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define("idx/oneui/form/FilteringSelect", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/window",
	"dijit/form/FilteringSelect",
	"./_CompositeMixin",
	"./_ValidationMixin",
	"../_CssStateMixin",
	"../HoverHelpTooltip",
	"./TextBox",
	"dojo/text!./templates/ComboBox.html"
], function(declare, lang, domClass, domStyle, winUtils, FilteringSelect, _CompositeMixin, _ValidationMixin, _CssStateMixin, HoverHelpTooltip, TextBox, template) {
	/**
	 * @name idx.oneui.form.FilteringSelect
	 * @class idx.oneui.form.FilteringSelect is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y27&vsub=*&hsub=*&openpanes=0000010000">Combo Boxes Standard</a></b>.
	 * It is a composite widget which enhanced dijit.form.FilteringSelect with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in label positioning</li>
	 * <li>Built-in hint</li>
	 * <li>Built-in hint positioning</li>
	 * <li>Built-in required attribute</li>
	 * <li>One UI theme support</li>
	 * </ul>
	 * @augments dijit.form.FilteringSelect
	 * @augments idx.oneui.form._CompositeMixin
	 * @augments idx.oneui._CssStateMixin
	 * @augments idx.oneui.form._ValidationMixin
	 */
	return declare("idx.oneui.form.FilteringSelect", [FilteringSelect, _CompositeMixin, _CssStateMixin],
	/**@lends idx.oneui.form.FilteringSelect.prototype*/
	{
		
		baseClass: "idxFilteringSelectWrap",
		
		oneuiBaseClass: "dijitTextBox dijitComboBox",
		
		templateString: template,
		
		selectOnClick: true,
		
		missingMessage: "$_unset_$",
		
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},
		
		postCreate: function(){
			this.inherited(arguments);
			this.messageTooltip = new HoverHelpTooltip({
				connectId: [this.iconNode],
				label: this.message,
				position: this.tooltipPosition,
				forceFocus: false
			});
		},
		
		isValid: function(){
			// Overrides ValidationTextBox.isValid()
			return this.item || (!this.required && this.get("displayedValue") == "");
		},
			
		_isEmpty: function(){
			return (/^\s*$/.test(this.textbox.value || ""));
		},
		
		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			//	Overwrite dijit.form.FilteringSelect._openResultList to focus the selected
			//	item when open the menu.

			// #3285: tap into search callback to see if user's query resembles a match
			if(query[this.searchAttr] !== this._lastQuery){
				return;
			}

			this._fetchHandle = null;
			if(	this.disabled ||
				this.readOnly ||
				(query[this.searchAttr] !== this._lastQuery)	// TODO: better way to avoid getting unwanted notify
			){
				return;
			}
			var wasSelected = this.dropDown.getHighlightedOption();
			this.dropDown.clearResultList();
			if(!results.length && options.start == 0){ // if no results and not just the previous choices button
				this.closeDropDown();
				return;
			}
	
			// Fill in the textbox with the first item from the drop down list,
			// and highlight the characters that were auto-completed. For
			// example, if user typed "CA" and the drop down list appeared, the
			// textbox would be changed to "California" and "ifornia" would be
			// highlighted.
	
			var nodes = this.dropDown.createOptions(
				results,
				options,
				lang.hitch(this, "_getMenuLabelFromItem")
			);
	
			// show our list (only if we have content, else nothing)
			this._showResultList();
			
			// Focus the selected item
			if(!this._lastInput){
				for(var i = 0; i < nodes.length; i++){
					if(nodes[i].item){
						var value = this.store.getValue(nodes[i].item, this.searchAttr).toString();
						if(value == this.displayedValue){
							this.dropDown._setSelectedAttr(nodes[i]);
							winUtils.scrollIntoView(this.dropDown.selected);
							break;
						}
					}
				}
			}
			
			// #4091:
			//		tell the screen reader that the paging callback finished by
			//		shouting the next choice
			if(options.direction){
				if(1 == options.direction){
					this.dropDown.highlightFirstOption();
				}else if(-1 == options.direction){
					this.dropDown.highlightLastOption();
				}
				if(wasSelected){
					this._announceOption(this.dropDown.getHighlightedOption());
				}
			}else if(this.autoComplete && !this._prev_key_backspace
				// when the user clicks the arrow button to show the full list,
				// startSearch looks for "*".
				// it does not make sense to autocomplete
				// if they are just previewing the options available.
				&& !/^[*]+$/.test(query[this.searchAttr].toString())){
					this._announceOption(nodes[1]); // 1st real item
			}

			if(this.item === undefined){ // item == undefined for keyboard search
				// If the search returned no items that means that the user typed
				// in something invalid (and they can't make it valid by typing more characters),
				// so flag the FilteringSelect as being in an invalid state
				this.validate(true);
			}
		},
		
		_onInputContainerEnter: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", true);
		},
		
		_onInputContainerLeave: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", false);
		},
		
		displayMessage: function(/*String*/ message, /*Boolean*/ force){
			if(this.messageTooltip){
				this.messageTooltip.set("label", message);
				if(message && this.focused || force ){
					var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
					this.messageTooltip.open(node);
				}else{
					this.messageTooltip.close();
				}
			}
		}
	});

});

},
'curam/widget/IDXFilteringSelect':function(){
require({cache:{
'url:curam/widget/templates/IDXComboBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>"}});
/*
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * Copyright IBM Corporation 2012.
 *
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the US
 * Copyright Office.
 */

define("curam/widget/IDXFilteringSelect", ["dijit/registry", "dojo/on", "dojo/text!curam/widget/templates/IDXComboBox.html",
        "idx/oneui/form/FilteringSelect"
        ], function(registry, on, template) {
  /*
   * Modification History
   * --------------------
     * 27-Mar-2014  AS  [CR00426939] Rollback changes done in CR00416476.
     * 27-Mar-2014  AS  [CR00416476] Removed the hint text causing problem 
     *                               with Jaws.
     * 10-Mar-2014  AS  [CR00415345] Handled the enter key on open dropdown.
     * 29-Oct-2013 NLH [CR00405850]   Initial version.
     */

    /**
     * @name curam.widget.IDXFilteringSelect
     * @namespace Override of the Dojo oneui ComboBox in order to make the oneui Combobox
     *              accessible using screen reader.
     * 
     * 
     */
    var IDXFilteringSelect = dojo.declare("curam.widget.IDXFilteringSelect", idx.oneui.form.FilteringSelect,
    /**
     * @lends curam.widget.IDXFilteringSelect.prototype
     */
    {
      templateString: template,
      // Flag which indicates if the enter key is used on open dropdown
      enterKeyOnOpenDropDown: false,
      
      postCreate : function() {
        // Attached a keyboard event listener so that we can set a flag
        // indicating enter is pressed in open state of dropdown
        on(this.focusNode, "keydown",function(e){
          var widget = registry.byNode(dojo.byId("widget_" + e.target.id)); 
          if(e.keyCode == dojo.keys.ENTER && widget._opened) {
            widget.enterKeyOnOpenDropDown = true;
           }
         });
         
        this.inherited(arguments);
      }
    });
    
    return IDXFilteringSelect;
  });
},
'dijit/form/_FormValueWidget':function(){
define("dijit/form/_FormValueWidget", [
	"dojo/_base/declare", // declare
	"dojo/_base/sniff", // has("ie")
	"./_FormWidget",
	"./_FormValueMixin"
], function(declare, has, _FormWidget, _FormValueMixin){

/*=====
var _FormWidget = dijit.form._FormWidget;
var _FormValueMixin = dijit.form._FormValueMixin;
=====*/

// module:
//		dijit/form/_FormValueWidget
// summary:
//		FormValueWidget


return declare("dijit.form._FormValueWidget", [_FormWidget, _FormValueMixin],
{
	// summary:
	//		Base class for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.
	// description:
	//		Each _FormValueWidget represents a single input value, and has a (possibly hidden) <input> element,
	//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
	//		works as expected.

	// Don't attempt to mixin the 'type', 'name' attributes here programatically -- they must be declared
	// directly in the template as read by the parser in order to function. IE is known to specifically
	// require the 'name' attribute at element creation time.  See #8484, #8660.

	_layoutHackIE7: function(){
		// summary:
		//		Work around table sizing bugs on IE7 by forcing redraw

		if(has("ie") == 7){ // fix IE7 layout bug when the widget is scrolled out of sight
			var domNode = this.domNode;
			var parent = domNode.parentNode;
			var pingNode = domNode.firstChild || domNode; // target node most unlikely to have a custom filter
			var origFilter = pingNode.style.filter; // save custom filter, most likely nothing
			var _this = this;
			while(parent && parent.clientHeight == 0){ // search for parents that haven't rendered yet
				(function ping(){
					var disconnectHandle = _this.connect(parent, "onscroll",
						function(){
							_this.disconnect(disconnectHandle); // only call once
							pingNode.style.filter = (new Date()).getMilliseconds(); // set to anything that's unique
							setTimeout(function(){ pingNode.style.filter = origFilter }, 0); // restore custom filter, if any
						}
					);
				})();
				parent = parent.parentNode;
			}
		}
	}
});

});

},
'url:idx/oneui/form/templates/ComboBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>",
'*now':function(r){r(['dojo/i18n!*preload*dojo/nls/cdej-ua-ieg*["ar","ca","cs","da","de","el","en-gb","en-us","es-es","fi-fi","fr-fr","he-il","hu","it-it","ja-jp","ko-kr","nl-nl","nb","pl","pt-br","pt-pt","ru","sk","sl","sv","th","tr","zh-tw","zh-cn","ROOT"]']);}
}});
define("dojo/cdej-ua-ieg", [], 1);
