require({cache:{
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
'url:curam/widget/resources/DivButton.html':"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n",
'curam/matrix/validation/ContradictionValidator':function(){
// wrapped by build app
define("curam/matrix/validation/ContradictionValidator", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultCombinationValidator,curam/util/ResourceBundle"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.ContradictionValidator");

dojo.require("curam.matrix.Constants");
dojo.require("curam.matrix.validation.DefaultCombinationValidator");
dojo.require("curam.util.ResourceBundle");

//*******************************************************************
// CONTRADICTION COMBINATION VALIDATOR
//*******************************************************************

/**
 * Creating Resource Bundle Object to access localized resources.
 */
var bundle = new curam.util.ResourceBundle("Debug");

dojo.declare("curam.matrix.validation.ContradictionValidator",
  curam.matrix.validation.DefaultCombinationValidator,
  {
    warningSingleMsg: "",
    warningMsg: "",
    errorMsg: "",

    constructor: function(container, opts) {
      this.container = container;

      this.bitsets = [];

      this.validatingCombCells = false;
      this.matchingCombCells = false;
      this.state.duplicateWarningActive = false;
      this.state.singleWarningActive = false;
      this.state.questionWarningActive = false;
      this.setErrorActive(false);

      this.isInitialized = false;

      if(opts) {
       dojo.mixin(this, opts);
      }

      this._registerValidator(this);
      this.state = curam.matrix.validation.DefaultCombinationValidator.prototype.state;
    },

    //Scan the Matrix object for all the Contradictions, and initialize the
    //Bitsets.  This is only run once.
    initialize: function() {
      this.isInitialized = true;

      this.bitsets = [];

      //Get the number of contradiction columns
      var contr = this.container.matrix.bottomRight.questions
                             .getObjectByIndex(0).contradiction;

      //Contradictions may not have been initialized, so check for it.
      this.numCols = contr ? contr.rows.getObjectByIndex(0).cells.count : 0;
    },

    //This refreshes every column.  Should be called when a question, answer,
    // or contradiction column is is added or removed.
    refreshValidation: function() {
      if(!this.requiresRefresh) {
        return;
      }
      this.inRefresh = true;
      //clear the bitset ids on the inputs
      for(var count = 0; count < this.bitsets.length; count++) {
        if(this.bitsets[count]) {
          for(var iCount = 0; iCount < this.bitsets[count].inputs.length; iCount++) {
            this.bitsets[count].inputs[iCount].bitsetId = null;
          }
        }
      }

      //Remove the bitsets from the singleton array that stores all BitSets
      //belonging to both the ContradictionValidator and the OutcomeValidator
      var bitsetIds = {};
      for(var count = 0; count < this.bitsets.length; count++) {
        if(this.bitsets[count]) {
          bitsetIds[this.bitsets[count].id] = true;
        }
      }
      this._deleteBitsets(bitsetIds);

      this.isInitialized = false;
      this.initialize();

      for(var count = 0; count < this.numCols; count++) {
        this._initColumn(count);
      }
      //validate all columns
      var bitset;

      var qIds = curam.matrix.Constants.container.existingQuestionIds.split('|');
      if(qIds.length > 0 && qIds[qIds.length -1].length == 0) {
        qIds.splice(qIds.length -1,1);
      }

      for(var count = 0; count < this.numCols ; count++) {
        bitset = this.bitsets[count];

        //If a column doesn't validate, stop validating and return to allow the
        //user to fix the problem.
        if(bitset && !this._validate(bitset, bitset.inputs[0], qIds) ) {
          break;
        }
      }

      if(this.isWarningActive() || this.isErrorActive()) {
        this.refocus();
      }
      this.inRefresh = this.requiresRefresh = false;
    },

    //Initializes a single column of Contradictions, reading in the input values
    //into a BitSet.
    _initColumn: function(colNum) {
      if(!this.isInitialized) {
        this.initialize();
      }

      var questions = this.container.matrix.bottomRight.questions;
      var errorPart1 
        = bundle.getProperty("curam.matrix.validation.ContradictionValidator" 
          + ".err.1");
      var errorPart2 
        = bundle.getProperty("curam.matrix.validation.ContradictionValidator" 
          + ".err.2");
      var errorPart3 
        = bundle.getProperty("curam.matrix.validation.ContradictionValidator" 
          + ".err.3");

      //Find out the column index.  This is necessary because columns can
      //be deleted, so while they might be, e.g. the second column, in the
      //past they may have been the 4th column, and all their inputs would be
      //set to update the fourth bitset, not the second
      var testId = questions.getObjectByIndex(0).contradiction.rows
                              .getObjectByIndex(0).cells
                              .getObjectByIndex(colNum).input.id;
      var colIndex = Number(testId.split(".")[4]) - 1;

      if(this.bitsets[colIndex]) {
        return;
      }
      var bitset = this._createBitset(colIndex, this.bitsets);

      var rows, input;

      if(colNum > this.numCols) {
        curam.debug.log(errorPart1 + "(_initColumn) colNum = " + colNum 
          + errorPart2 + this.numCols + errorPart3);
        return;
      }
      var question;
      for(var qCount = 0; qCount < questions.count; qCount++) {
        question = questions.getObjectByIndex(qCount);
        rows = question.contradiction.rows;

        for(var rCount = 0; rCount < rows.count; rCount++) {
          input = rows.getObjectByIndex(rCount).cells
                                         .getObjectByIndex(colNum).input;
          input.qId = question.qId;

          //set the bitset value, but skip validation
          this.setContradictionValue(colIndex, input, null, question.qId, true);
        }
      }
    },

    _createBitset: function(colNum, arr) {
      var bitset = curam.matrix.validation.DefaultCombinationValidator.prototype.
                     _createBitset.apply(this, arguments);

      //we need to keep count of how many checkboxes are selected in each
      //column, for each question, as only one is allowed.
      bitset.qCount = {};
      return bitset;
    },

    //Mark a contradiction value as having been set or unset
    setContradictionValue: function(column, checkBox, event, qId,
                                     skipValidation) {
      if(event !== null) {
        event = dojo.fixEvent(event);
      }

      //Check if a full refresh is required, and if so, return, as _checkRefresh
      //does this refresh for you.
      if(this._checkRefresh()){
        return;
      }

      if(event && this.container.matrix.isValidationActive()
          &&
          (
            (this.state.questionWarningActive && checkBox.checked) ||
            !this.container.matrix.isInputPartOfValidation(checkBox)
          )
        ) {
        dojo.stopEvent(event);
        this.container.matrix.refocusValidatingInput();
        return;
      }

      //Lazily initialize the validator, since it has to do a scan of all the
      //contradiction elements on the page.
      if(!this.bitsets[column]) {
        this.refreshValidation();
      }

      var bitset = this.bitsets[column];

      //lazily assign a unique identifier to this checkbox
      this._initCheckbox(checkBox, bitset);

      var number = checkBox.bitsetId;

      if(checkBox.checked) {
        //If the checkbox was not already checked, increment the count of
        //contradictions chosen for this question.
        if(bitset.set(number)) {
          bitset.qCount[qId] = typeof(bitset.qCount[qId]) == "undefined" ?
                                          1 : bitset.qCount[qId] + 1;
        }
      } else {
        if(bitset.unSet(number) && bitset.qCount[qId]) {
          bitset.qCount[qId]--;
        }
      }
      if(!skipValidation) {
        this._validate(bitset, checkBox);
      }
    },

    _validateQuestionCount: function(bitset, qIds) {
      var totalQsSelected = 0;
      for(var count = 0; count < qIds.length && totalQsSelected < 2; count++) {
        if(bitset.qCount[qIds[count]] > 0) {
          totalQsSelected++;
        }
      }

      if(totalQsSelected < 2) {
        this.state.singleWarningActive = true;
        //store the bitset so the validation can be drawn on the column.
        this._setErrorBitsets(bitset, null);
        this.currentMsg = this.singleWarningMsg;
        return false;
      }

      return true;
    },

    //Returns true if the bitset passed as a parameter is valid.
    _validateOne: function(bitset) {
      this.state.singleWarningActive = (this.inSave && bitset.isClear())
                                          || bitset.isSingleSet();

      if(this.state.singleWarningActive) {
        //store the bitset so the validation can be drawn on the column.
        this._setErrorBitsets(bitset, null);
        this.currentMsg = this.singleWarningMsg;
      }
      return !this.state.singleWarningActive;
    },

    deleteContradiction: function() {
      var idMap = {};
      for(var count = 0; count < this.bitsets.length; count++) {
        if(this.bitsets[count]) {
          idMap[this.bitsets[count].id] = true;
        }
      }
      this._deleteBitsets(idMap);
      this.bitsets = [];
    }
  }
);

});

},
'curam/matrix/validation/DefaultValidator':function(){
// wrapped by build app
define("curam/matrix/validation/DefaultValidator", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.DefaultValidator");

dojo.declare("curam.matrix.validation.DefaultValidator", null, {
    keys: dojo.keys,

    constructor: function(){
      this.allowableCharsForNumeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "."];

      //define the keys that, if pressed, do not trigger validation.
      var sk = {};
      var k = this.keys;
      sk[k.TAB] = true;
      sk[k.SHIFT] = true;
      sk[k.LEFT_ARROW] = true;
      sk[k.RIGHT_ARROW] = true;
      sk[k.CAPS_LOCK] = true;

      this.skipKeys = sk;
    },

    state: {
      allowableFields: null,
      errorActive: false,
      warningActive: false
    },

    // TODO: there may be a better way to do this validation. There may
    // be an existing library to do this stuff. Put in check for the
    // number entered not to be larger than javascript can handle.
    // There is parsing done on the number so can only be of certain size.

    // Allowable characters include 0987654321.-
    // There can not be more than one . or - in a value.
    // The '-' char can only appear at the start of the value.
    checkNumericCharacter: function (e) {
      if (e.key == "-" && e.target.value.length != 0) {
        e.preventDefault();
        return;
      } else if (e.key == "." && e.target.value.indexOf(".") != -1) {
        e.preventDefault();
        return;
      }
      for (var i = 0; i < this.allowableCharsForNumeric.length; i++) {
        if (e.key != " " && e.key == this.allowableCharsForNumeric[i]) {
          return;
        }
      }
      e.preventDefault();
      return;
    },

    isErrorActive: function() {
      return this.state.errorActive;
    },

    isWarningActive: function() {
      return this.state.warningActive;
    },

    setErrorActive: function(val) {
      this.state.errorActive = val;
    },

    setWarningActive: function(val) {
      this.state.warningActive = val;
    },

    isValidationActive: function() {
      return this.isWarningActive() || this.isErrorActive();
    },

    //When there is a validation error on the page, then make sure that if the
    //user presses the tab key that focus is sent to the next allowable input
    //that is part of the validation.
    checkFocusInError: function(evt) {
      //if the key is not a tab key, do nothing.
      if(!this.isErrorActive() || evt.keyCode != 9) {
        return false;
      }

      if(evt.keyCode != 9) {
        return true;
      }
      var idx = 0;
      for(var count = 0; count < this.state.allowableFields.length; count++) {
        if(evt.target.id == this.state.allowableFields[count]) {
          idx = count +1;
          if(idx >= this.state.allowableFields.length) {
            idx = 0;
          }
          break;
        }
      }
      dojo.byId(this.state.allowableFields[idx]).focus();
      return true;
    },

    //Add a listener to an Input node that causes the 'checkFocus' method to
    //be called
    addFocusListener: function(inputs) {
      var thisVal = this;
      var listener = function(e) {
        return thisVal.checkFocus(e);
      };
      for(var count = 0; count < inputs.length; count++) {
        if(!inputs[count]['_hasFocusListener_']) {
          dojo.connect(inputs[count], "onfocus", listener);
          inputs[count]['_hasFocusListener_'] = true;
        }
      }
    },

    //Check if the input that has just received the focus is one of the inputs
    //taking part in the validation.  If it is, then there's no need to
    //activate the Error stage, so clear the timeout that was previously set
    //from the 'onblur' listener on the other input taking part in the
    //validation.
    checkFocus: function (e) {
      if (!this.isWarningActive() && !this.isErrorActive() ) {
        return;
      }
      e = e ? e : dojo.fixEvent(null);
      for (var i = 0; i < this.state.allowableFields.length; i++) {
        if (this.state.allowableFields[i] == e.target.id) {
          clearTimeout(this.timeout);
          return;
        }
      }
      dojo.stopEvent(e);
    },

    //Puts the focus back on the inputs being validated.
    refocus: function() {
      if(this.focusElement) {
        this.focusElement.focus();
      } else if(this.state.allowableFields && this.state.allowableFields.length > 0) {
        dojo.byId(this.state.allowableFields[0]).focus();
      }
    },

    //This method is called when an Error validation is activated.
    //It places a key listener on the inputs taking part in the validation,
    //and intercepts any Tab key presses.  The focus is redirected to the next
    //input in the list of validating inputs.
    cancelInputTabs: function() {
      if(!this.state.allowableFields || this.state.allowableFields.length == 0) {
        return;
      }

      var thisVal = this;
      this._tabFns = [];
      for (var i = 0; i < this.state.allowableFields.length; i++) {

        //Add a keydown event to the fields being validated to cancel any
        //presses of the tab key. The checkFocusInError function is used
        //instead to ensure that the focus is sent to the next field
        //being validated, rather than the next field in the page.
        this._tabFns[this._tabFns.length] = dojo.connect(
          dojo.byId(this.state.allowableFields[i]),
          "key",
          function(evt){
            if(thisVal.isErrorActive()){
              if(evt.keyCode == 9) {
                thisVal.checkFocusInError(evt);
                dojo.stopEvent(evt);
                return false;
              }
            } else {
              thisVal.clearInputTabListeners();
            }
            return true;
          }
        );
      }
    },

    //Removes listeners on input fields that shift the focus to other
    //input fields taking part in the validation instead of the
    //next input in the form
    clearInputTabListeners: function() {
      if(this._tabFns) {

        for(var count = 0; count < this.state.allowableFields.length; count++) {
          dojo.disconnect(this._tabFns[count]);
        }
        this._tabFns = null;
      }
    },
    // TODO: make these constants.
    // 9 represents the TAB and 16 represents shift key in IE and Firefox.
    checkForTabShiftKey: function (evt) {
      if (this.skipKeys[evt.keyCode]) {
        return true;
      }
      return false;
    },

    //Determines if the form input element passed as a parameter is part of
    //an active validation.  Returns true if it is, false if it is not.
    isInputPartOfValidation: function(input) {
      if(!this.isErrorActive() && !this.isWarningActive() || !this.state.allowableFields) {
        return false;
      }
      for(var count = 0; count < this.state.allowableFields.length; count++) {
        if(input.id == this.state.allowableFields[count]) {
          return true;
        }
      }
      return false;
    }
  }
);

});

},
'curam/matrix/Constants':function(){
define("curam/matrix/Constants", ["curam/define"
        ], function() {
  
  curam.define.singleton("curam.matrix.Constants", {
    /**
     * Represents the answer type, codetable.
     */
     ANSWER_TYPE_CODETABLE: 'codetable',

     /**
     * Represents the answer type, numeric.
     */
     ANSWER_TYPE_NUMERIC: 'numeric',

     /**
     * Represents the answer type, boolean.
     */
     ANSWER_TYPE_BOOLEAN: 'boolean',

     /**
     * Represents the answer type, string.
     */
     ANSWER_TYPE_STRING: 'string',

     /**
     * Represents the numeric answer type, specifc value.
     */
     SPECIFIC_VALUE: 'specificvalue',

     /**
     * Represents the numeric answer type, min max.
     */
     MIN_MAX: 'minmax',

     /**
     * Represents the height and width of all borders in all elements
     * in the matrix.
     */
     MATRIX_BORDER_SIZE: 1,

     /**
     * Represents the default cell width (i.e. the width of a checkbox div).
     * This is set as a property of classes .cell, .cell-first-row, .cell-last-col and .cell-no-border
     * which all represent combination cells.
     */
     COMBINATION_CELL_WIDTH: 22,

     /**
     * Used for column headings.
     */
     columnLetters: new Array("C", "D", "E", "F", "G", "H", "I",
                                   "J", "K", "L", "M", "N", "O",
                                   "P", "Q", "R", "S", "T", "U",
                                   "V", "W", "X", "Y", "Z"),

     /**
      * This is not really constant, but rather a "matrix-global" static variable.
      */
     container: null
  });
  
  return curam.matrix.Constants;
});

},
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
'curam/matrix/validation/AnswerValidator':function(){
// wrapped by build app
define("curam/matrix/validation/AnswerValidator", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultValidator"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.AnswerValidator");

dojo.require("curam.matrix.Constants");
dojo.require("curam.matrix.validation.DefaultValidator");

dojo.declare("curam.matrix.validation.AnswerValidator",
  curam.matrix.validation.DefaultValidator,
{
  constructor: function(container) {
    this.activeChangedInput = null;
    this.activeExistingInput = null;
    this.setWarningActive(false);
    this.setErrorActive(false);
    this.validationList = null;
    this.focusElement = null;
    this.currentMsg = null;
    this.blurEvent = null;
    this.state.allowableFields = null;
    this.timeout = null;
    this.container = container;
    this.emptyMsgDelete = container.i18nMsgs.emptyMsgDelete;
    this.emptyMsg = container.i18nMsgs.emptyMsg;
    this.overlapMsg = container.i18nMsgs.overlapMsg;
    this.duplicateMsg = container.i18nMsgs.duplicateMsg;
    this.onePopulate = container.i18nMsgs.onePopulate;
    this.maxMin = container.i18nMsgs.maxMin;
  },

  //Validates a numeric answer. Takes an Event object as a parameter
  validateNumericAnswer: function (e, modifiedAnswer, answers) {
    if (e && this.checkForTabShiftKey(e)) {return;}
    var overlapMsg = this.overlapMsg;
    var doLoop = false;
    if(!modifiedAnswer && !answers) {
      var questionId = curam.matrix.util
                                     .getQuestionIdFromAnswerInputId(e.target.id);
      var answerId = curam.matrix.util
                                   .getAnswerIdFromAnswerInputId(e.target.id);

      var emptyMsg = this.getEmptyMsg(questionId, answerId);
      var answerType = null;

      answers = this.container.matrix.bottomLeft.bottomLeftMain
                          .getQuestion(questionId).ansGroup.answers;
      modifiedAnswer = answers.getObjectByKey("ans-" + questionId + "-" +  answerId);
      doLoop = true;
    }

    var curMinValue, curMaxValue, curSpecVal, specVal, minVal, maxVal;
    var validationsToSet = [];

    if (modifiedAnswer.specificValue) {
      specVal = modifiedAnswer.specificValue.value == "" ||
                  modifiedAnswer.specificValue.value == "-" ? "noVal"
                   : parseFloat(modifiedAnswer.specificValue.value);

      if (specVal == "noVal") {
        this.focusElement = modifiedAnswer.specificValue;
        this.validateAnswers(modifiedAnswer, null, emptyMsg, true);
        return;
      }

      for (var i = 0; i < answers.count; i++) {
        var curAns = answers.getObjectByIndex(i);
        if (curAns.node.id == modifiedAnswer.node.id) {
          continue;
        }
        if (curAns.specificValue) {
          if (parseFloat(curAns.specificValue.value) == specVal) {
            this.validateAnswers(modifiedAnswer, curAns, overlapMsg, false);
            return;
          }
        } else {
          curMinValue = curAns.min.value == "" ? "min" :
                                                 parseFloat(curAns.min.value);
          curMaxValue = curAns.max.value == "" ? "max" :
                                                 parseFloat(curAns.max.value);
          //The numeric answer is invalid if either:
          //1. The specific value is equal to the minimum value
          //2. The specific value is equal to the maximum value
          //3. The specific value is less than the maximum value and there is
          //   no minimum value.
          //4. The specific value is greater than the minimum value and there is
          //   no maximum value.
          if (curMinValue == specVal || curMaxValue == specVal
               || (curMinValue < specVal &&
                     (curMaxValue > specVal || curMaxValue == "max"))
               || (curMaxValue > specVal &&
                     (curMinValue < specVal || curMinValue == "min"))) {
            if(this.activeExistingInput && this.isValidationActive()) {
              validationsToSet.push([modifiedAnswer, curAns, overlapMsg, false]);
            } else {
              this.validateAnswers(modifiedAnswer, curAns, overlapMsg, false);
              return;
            }
          }
        }
      }
    } else {
      minVal = modifiedAnswer.min.value == "" ? "min"
                  : parseFloat(modifiedAnswer.min.value);
      maxVal = modifiedAnswer.max.value == "" ? "max"
                  : parseFloat(modifiedAnswer.max.value);

      if (modifiedAnswer.min.value == "-"
                 || modifiedAnswer.min.value == "-") {
        this.validateAnswers(modifiedAnswer, null, emptyMsg, false);
        return;
      } else if (minVal == "min" && maxVal == "max") {
        this.focusElement = modifiedAnswer.min;
        this.validateAnswers(modifiedAnswer, null, this.onePopulate, true);
        return;
      } else if (parseFloat(minVal) >= parseFloat(maxVal)) {
        var valMsg = this.maxMin;
        if(this.activeExistingInput && this.isValidationActive()) {
          validationsToSet.push([modifiedAnswer, null,valMsg, false]);
        } else {
          this.validateAnswers(modifiedAnswer, null,valMsg, false);
          return;
        }
      }

      for (var i = 0; i < answers.count; i++) {
        var curAns = answers.getObjectByIndex(i);
        if (curAns.node.id == modifiedAnswer.node.id) {
          continue;
        }
        if (curAns.specificValue) {
          curSpecVal = Number(curAns.specificValue.value);
          if (minVal == curSpecVal || maxVal == curSpecVal) {
          } else if (minVal < curSpecVal &&
            (maxVal > curSpecVal || maxVal == "max")) {
          } else if (maxVal > curSpecVal &&
            (minVal < curSpecVal || minVal == "min")) {
          } else {
            continue;
          }
          if(this.activeExistingInput && this.isValidationActive()) {
            validationsToSet.push([modifiedAnswer, curAns, overlapMsg, false]);
          } else {
            this.validateAnswers(modifiedAnswer, curAns, overlapMsg, false);
            return;
          }
        } else {
          curMinValue = curAns.min.value == "" ? "min" : parseFloat(curAns.min.value);
          curMaxValue = curAns.max.value == "" ? "max" : parseFloat(curAns.max.value);
          if (curMinValue == minVal || curMaxValue == maxVal) {
          } else if ((maxVal >= curMinValue ||
            maxVal == "max" || curMinValue == "min") &&
            maxVal <= curMaxValue) {
          } else if (maxVal >= curMinValue &&
            (maxVal <= curMaxValue || curMaxValue == "max")) {
          } else if ((curMaxValue >= minVal ||
            curMaxValue == "max" || minVal == "min") &&
            curMaxValue <= maxVal) {
          } else if (curMaxValue >= minVal &&
            (curMaxValue <= maxVal || maxVal == "max")) {
          } else {
            continue;
          }
          if(this.activeExistingInput && this.isValidationActive()) {
            validationsToSet.push([modifiedAnswer, curAns, overlapMsg, false]);
          } else {
            this.validateAnswers(modifiedAnswer, curAns, overlapMsg, false);
            return;
          }
        }
      }
    }

    //If multiple errors exist, and validation is currently active, check if
    //the previous error still exists, and if so, do nothing.  If only new
    //errors exist, then choose the first one.
    if(validationsToSet.length > 0) {
      for(var count = 0; count < validationsToSet.length; count++) {
        if((this.activeExistingInput == validationsToSet[count][0]
           && this.activeChangedInput == validationsToSet[count][1])
           || (this.activeExistingInput == validationsToSet[count][1]
           && this.activeChangedInput == validationsToSet[count][0])){
          return;
        }
      }
      this.validateAnswers(validationsToSet[0][0],validationsToSet[0][1],
                            validationsToSet[0][2],validationsToSet[0][3]);
      return;
    }

    if(this.isValidationActive()) {
      var existingInput = this.activeExistingInput;
      if(existingInput && existingInput.answerType != curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
        return;
      }
      this.unvalidateAnswers();
      if(existingInput && doLoop){
        //If two answers were incorrect, make sure to check the second one.
        this.validateNumericAnswer(null, existingInput, answers);
        return;
      }

    }
  },

  validateCodetableAnswer: function (e) {
    if (this.checkForTabShiftKey(e)) {
        return true;//No validation error
    }
    var questionId = curam.matrix.util.getQuestionIdFromAnswerInputId(e.target.id);
    var answerIndex = curam.matrix.util.getAnswerIdFromAnswerInputId(e.target.id);

    var select = e.target;

    if(select.selectedIndex < 0 || select.options.length < 1) {
      return true; //No validation error
    }

    var newOption = select.options[select.selectedIndex].value;

    var question = this.container.matrix.getQuestion(questionId);

    if(!question) {
      return true;//The page is still being instantiated, don't do anything
    }

    var answer = question.getAnswer(answerIndex);

    var answers = question.ansGroup.answers;
    var answerValue = answer.select.options[answer.select.selectedIndex].value;
    var answerId = answer.node.id;
    var curAns, curAnsValue, sel;
    this.unvalidateAnswers();
    var count;

    //Perform a single pass over all the code table answers.
    //Add each one to the valueToSelectMap hash map object.  Before adding,
    //check that there isn't already an entry in the map for the selected value.
    //If there is an entry there already, it is an error, so activate the
    //validation warning for the current answer and the one in the hash map
    //with the same value.
    var valueToSelectMap = {};

    for (count = 0; count < answers.count; count++) {
      curAns = answers.getObjectByIndex(count);
      sel = curAns.select;
      curAnsValue = sel.options[sel.selectedIndex].value;

      if (valueToSelectMap[curAnsValue]) {
        this.validateAnswers(valueToSelectMap[curAnsValue], curAns,
                             this.duplicateMsg, false);
        return false;
      }
      valueToSelectMap[curAnsValue] = curAns;
    }
    return true;
  },

  validateStringAnswer: function (e) {
    if (this.checkForTabShiftKey(e)) {
        return;
    }
    var question = e.target.question;

    //If the matrix is still initializing, do not validate.
    if(!question.ansGroup) {
      return;
    }
    var newValue = e.target.value;

    var answers = question.ansGroup.answers;
    var modifiedAnswer = e.target.answer;

    modifiedAnswer.answerValue = newValue;

    this.unvalidateAnswers();

    if (newValue == "" || newValue == null) {
      this.focusElement = modifiedAnswer.input;
      this.validateAnswers(modifiedAnswer, null,
                           this.getEmptyMsg(modifiedAnswer.id), true);
      return;
    }
    for (var count = 0; count < answers.count; count++) {
      if (modifiedAnswer.node.id == answers.getObjectByIndex(count).node.id) {
        continue;
      }
      if (newValue == answers.getObjectByIndex(count).input.value) {
        this.focusElement = modifiedAnswer.input;
        this.validateAnswers(modifiedAnswer, answers.getObjectByIndex(count),
                          this.duplicateMsg, true);
        return;
      }
    }
  },

  refreshValidation: function() {
    // Performs all validation checks on all questions and all answers.
    // This is used as a last resort when submitting in case the runtime
    // validations missed something.
    var questions = this.container.matrix.bottomLeft.bottomLeftMain.questions;

    var value, value2, answer,answers, answerValues, specificNums;

    for(var qCount = 0; qCount < questions.count; qCount++) {
      var question = questions.getObjectByIndex(qCount);
      var answerType = question.ansGroup.answerType;

      answers = question.ansGroup.answers;

      if (answerType == curam.matrix.Constants.ANSWER_TYPE_STRING) {
        answerValues = {};
        for(var aCount = 0; aCount < answers.count; aCount++) {
          answer = answers.getObjectByIndex(aCount);
          value = answer.input.value;
          if(!value || value == "") {
            this.focusElement = answer.input;
            this.validateAnswers(answer, null, this.getEmptyMsg(answer.id)
                                   , true);
            return false;
          }
          //If the value is duplicated in this question, it is invalid.
          if(answerValues[value] || answerValues[value] == 0) {
            this.focusElement = answer.input;
            this.validateAnswers(answer,
                 answers.getObjectByIndex(answerValues[value]),
                 this.duplicateMsg
                 , true);
            return false;
          }
          answerValues[value] = aCount;
        }
      } else if (answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
        specificNums = {};
        for(var aCount = 0; aCount < answers.count; aCount++) {
          answer = answers.getObjectByIndex(aCount);

          if(answer.specificValue) {
            value = answer.specificValue.value;

            if(!value || value == "") {
              this.focusElement = answer.specificValue;
              this.validateAnswers(answer, null, this.getEmptyMsg(answer.id)
                                   , true);
              return false;
            }
            //If there is a duplicate specific value, it is an error
            if(specificNums[value] || specificNums[value] == 0) {
              this.focusElement = answer.specificValue;
              this.validateAnswers(answer,
                answers.getObjectByIndex(specificNums[value]),
                this.duplicateMsg, true);
              return false;
            }
            specificNums[value] = aCount;
          } else {
            value = answer.min.value;
            value2 = answer.max.value;
            if((!value || value == "") && (!value2 || value2 == "")) {
              this.focusElement = answer.min;
              this.validateAnswers(answer, null, this.getEmptyMsg(answer.id)
                                    , true);
              return false;
            }
          }

        }
      } else if(answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
        //It is only necessary to call the validation once per question, as a single
        //pass is done on all code table answers to validate them.
        if(!this.validateCodetableAnswer({target: answers.getObjectByIndex(0).select})) {
          return false;
        }
      }
    }
    return true;
  },

  checkForError: function (e) {
    if (!this.isWarningActive()) {
        return;
    }
    var _this = this;
    this.blurEvent = e;

    var split = curam.matrix.util.safeSplit(e.target.parentNode.id, "-");
    var qId = split[2];
    var ansId = split[3];

    //If the node that has received the focus is not part of the
    //validation, then add an error.
    this.timeout = setTimeout(function(){
        _this.addError(qId, ansId);
      }, 10);
  },

  addError: function (questionId, answerId) {
    var elementId = "ans-val-" + questionId + "-" + answerId;
    if (this.isWarningActive()) {
      if (elementId == this.activeChangedInput.validation.id ||
          (this.activeExistingInput &&
          elementId == this.activeExistingInput.validation.id
          && !this.isErrorActive())) {

        this.focusElement = this.blurEvent.target;
        var thisVal = this;
        setTimeout(function(){
            thisVal.focusElement.focus();
          }, 10);

        var ac = dojo.addClass;

        var questionId = curam.matrix.util.
               getQuestionIdFromAnswerInputId(this.blurEvent.target.id);
        var answerId = curam.matrix.util.
           getAnswerIdFromAnswerInputId(this.blurEvent.target.id);
        var inputs = [this.activeChangedInput.input];
        var val1 = this.activeChangedInput.validation;
        var val2 = this.activeExistingInput ?
                     this.activeExistingInput.validation : null;
        ac(val1, "validateError");

        //There could be an error with just one answer, not two.
        if(val2) {
          ac(val2, "validateError");
          inputs[inputs.length] = this.activeExistingInput.input;
        }
        this.container.activateError(this.currentMsg);

        this.container.matrix.disableInputs(val1, val2);

        dojo.publish("/disableInput",[inputs]);


        this.cancelInputTabs();

        this.setWarningActive(false);
        this.setErrorActive(true);
      }
    }
  },

  //Highlights the answers that are conflicting and displays a message
  validateAnswers: function (changedAnswer, existingAnswer, message, focus) {
    this.unvalidateAnswers();
    var ids = [];

    if (changedAnswer.min && changedAnswer.max) {
        ids.push(changedAnswer.min.id);
        ids.push(changedAnswer.max.id);
    } else if (changedAnswer.specificValue) {
        ids.push(changedAnswer.specificValue.id);
    } else if (changedAnswer.input.nodeName == "SELECT") {
        ids.push(changedAnswer.input.id);
    } else {
        ids.push(changedAnswer.input.id);
    }
    if(existingAnswer) {
      if (existingAnswer.min && existingAnswer.max) {
        ids.push(existingAnswer.min.id);
        ids.push(existingAnswer.max.id);
      } else if (existingAnswer.specificValue) {
        ids.push(existingAnswer.specificValue.id);
      } else if (existingAnswer.input.nodeName == "SELECT") {
        ids.push(existingAnswer.input.id);
      } else {
        ids.push(existingAnswer.input.id);
      }
    }

    dojo.addClass(changedAnswer.validation, "validateWarn");

    this.activeChangedInput = changedAnswer;
    this.setWarningActive(true);
    this.currentMsg = message;
    this.state.allowableFields = ids;

    if (existingAnswer != null) {
      dojo.addClass(existingAnswer.validation, "validateWarn");
      this.activeExistingInput = existingAnswer;
    }
    this.container.activateWarning(message);

    if (focus) {
      var thisObj = this;
      setTimeout(function(){thisObj.focusElement.focus();}, 10);
    }
  },

  //Remove any validation that is on one or more answers.
  unvalidateAnswers: function () {
    if(!this.isValidationActive()) {
      return;
    }

    var rc = dojo.removeClass;
    if(this.activeChangedInput)
    {
      rc(this.activeChangedInput.validation, "validateWarn");
      rc(this.activeChangedInput.validation, "validateError");
    }
    if(this.activeExistingInput)
    {
      rc(this.activeExistingInput.validation, "validateWarn");
      rc(this.activeExistingInput.validation, "validateError");
    }

    this.clearInputTabListeners();

    this.activeChangedInput = null;
    this.activeExistingInput = null;
    this.state.allowableFields = null;
    this.setWarningActive(false);
    this.container.deactivateValidation();
    if (this.isErrorActive() == true) {
      this.setErrorActive(false);
    }
  },

  // Delete the currently validating answer.
  unvalidateAndDeleteAnswer: function(ansId) {
    this.unvalidateAnswers();
    curam.matrix.Constants.container.matrix.deleteAnswer(ansId);
  },

  //Dynamically generate a message that appends a link to the "emptyMsg"
  //that, when clicked, will delete the answer currently being validated.
  getEmptyMsg: function(qId, aId) {
    if(arguments.length == 1) {
      var split = curam.matrix.util.safeSplit(qId, "-");
      qId = split[1];
      aId = split[2];
    }

    if (curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(qId)
                .ansGroup.answerCount < 2) {
      return this.emptyMsg;
    }

    return this.emptyMsgDelete + "<a href='#' onclick='_c.m.answerValidator."
                         + "unvalidateAndDeleteAnswer"
                         + "(\"ans-" + qId +"-" + aId
                         + "\"); return true;'>"
                         + curam.matrix.Constants.container.i18nMsgs.controlDelete + "</a>";
  }

});

});

},
'curam/matrix/BottomLeft':function(){
// wrapped by build app
define("curam/matrix/BottomLeft", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.BottomLeft");

dojo.require("curam.matrix.Constants");

//************************************************
//1 Bottom Left
//************************************************
dojo.declare("curam.matrix.BottomLeft", null, {
  constructor: function()
  {
  this.node = dojo.byId('bottom-left');
  this.bottomLeftMain = new curam.matrix.BottomLeftMain();
  this.bottomLeftFiller = new curam.matrix.BottomLeftFiller();
  },
  // Classes Set:           .bottom-eval{height}
//                          .bottom-left-eval{width}
  //
  // We have to set the content dimensions before we set the
  // bottom left dimensions as the questions height will determine
  // the bottom left height. NOTE: Its possible to set the width
  // now but we should wait until we can set both together.
  setDimensions: function() {
  this.bottomLeftFiller.setDimensions();
  this.bottomLeftMain.setDimensions();
  this.setHeight();
  curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-eval{width:")
  .append(curam.matrix.Constants.container.leftMatrixWidth).append("px;}");
  },

  setHeight: function() {
  var c = curam.matrix.Constants.container;
  this.heightIncBorder = this.bottomLeftMain.height + c.matrix.bottomLeft.bottomLeftFiller.height + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  c.cssText.append(".matrix-container .bottom-eval{height:").append(this.bottomLeftMain.height
           + c.matrix.bottomLeft.bottomLeftFiller.height).append("px;}");
  }
});

});

},
'curam/matrix/ContradictionCell':function(){
// wrapped by build app
define("curam/matrix/ContradictionCell", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.ContradictionCell");

dojo.require("curam.matrix.Constants");

//************************************************
//1ContradictionCell
//************************************************
dojo.declare("curam.matrix.ContradictionCell", null, {
  constructor: function(node) {
  this.node = node;
  this.input = dojo.query("> :first-child", this.node)[0];
  this.button = cm.nextSibling(this.input);
  
  this.initListener();
  this.widgetCreated = false;
  },
  initListener: function(){
  if(this.button && !dojo.hasClass(this.button, "hidden-image")) {
  var _this = this;
  curam.matrix.Constants.container.matrix.addLazyWidget(this, "cells");
  this.lazyListener = function(event){
  if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")) {
  dojo.disconnect(this.button._conn);
  return;
  }
  if(!_this.widget){return;}
  _this.widget._toggleMenu('CombinationOptions', event);
  window.activeMenuID = _this.node.id;
  dijit.byId('CombinationOptions')._openMyself(curam.matrix.Constants.container.getFakeEvent(_this.widget.domNode));
  };
  
  this.button._conn = dojo.connect(this.button, "onclick", this, "lazyListener");
  }
  },
  createWidget: function(event) {
  var c = curam.matrix.Constants.container;
  if (this.widgetCreated){ return;}
  if(!this.button.cellId) {
  this.button.cellId = this.node.id;
  }
  this.widget = new curam.widget.CombinationButton(
  { menuId:'CombinationOptions' }, this.button);
  var parts = this.input.id.split('.');
  this.widget.colId = parts[parts.length - 1];
  this.widgetCreated = true;
  window.activeMenuID = this.node.id;
  dojo.disconnect(this.button._conn);
  },
  setButtonClass: function(classStr) {
  if(!this.button) {
  this.button = dojo.create("div");
  this.node.appendChild(this.button);
  }
  cm.setClass(this.button, classStr);
  if(!this.widgetCreated && classStr == "image"){
  this.initListener();
  }
  },
  adjustFirstRowClass: function(initialClass) {
  var clName = dojo.attr(this.node, "class");
  if (clName.indexOf('ans-eval-with-menu') == -1) {
  clName = clName.replace('ans-eval', 'ans-eval-with-menu');
  cm.setClass(this.node, clName);
  }
  clName = dojo.attr(this.input, "class");
  if (clName.indexOf('cbox-eval-with-menu') == -1) {
  clName = clName.replace('cbox-eval', 'cbox-eval-with-menu');
  cm.setClass(this.input, clName);
  }
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
'curam/matrix/TopRightBottom':function(){
// wrapped by build app
define("curam/matrix/TopRightBottom", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TopRightBottom");

dojo.require("curam.matrix.Constants");

//************************************************
//1TopRightBottom
//************************************************
dojo.declare("curam.matrix.TopRightBottom", null, {
  constructor: function()
  {
  this.node = dojo.byId('top-right-bottom');
  this.priorityHeading = null;
  this.priorityHeadingText = null;
  this.scoreHeading = null;
  this.scoreHeadingText = null;
  this.contradictionHeadingWidth = null;
  this.contradictionHeading = null;
  this.matrix = curam.matrix.Constants.container.matrix;
  //this.contradictionHeadingText = null;
  //TODO: not sure if i need 2 ListMaps here or what format exactly they should be.
  this.outcomeHeadings = new curam.ListMap();
  //this.outcomeHeadingsTexts = new ListMap();

  //NOTE: this.columnTextsWidths = new ListMap(); exists in the previous version.
  //if something similar is need functions getWidth() and setWidth() might be better.
  //maybe not set with actually.
  //If every div dimension is set, which is the aim, theses would not be needed at all.

  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {

  if (childNodes[i].id == 'heading-pri') {
  this.priorityHeading = childNodes[i];
  this.priorityHeadingText = dojo.query("> :first-child", this.priorityHeading)[0];
  } else if (childNodes[i].id == 'heading-scr') {
  this.scoreHeading = childNodes[i];
  this.scoreHeadingText = dojo.query("> :first-child",this.scoreHeading)[0];
  } else if (childNodes[i].id == 'heading-contr') {
  this.contradictionHeadingWidth = childNodes[i].offsetWidth;
  this.contradictionHeading = childNodes[i];
  //this.contradictionHeadingText = dojo.dom.getFirstChildElement(this.contradictionHeading);
  } else {
  //TODO: see TODO above
  this.outcomeHeadings.add(childNodes[i].id, childNodes[i]);
  //text = dojo.dom.getFirstChildElement(childNodes[i]);
  //this.outcomeHeadingsTexts.add(text.id, text);
  }
  }
  }
  },

  addPriority: function() {
  var heading = dojo.create('div', {
  id: 'heading-pri',
  "class": 'column-heading column-eval pri-col-eval',
  innerHTML:'<div title="' + curam.matrix.Constants.container.i18nMsgs.headerPriority + '">' + curam.matrix.Constants.container.i18nMsgs.headerPriority + '</div>'
  }, this.node, 'first');
  this.priorityHeading = heading;
  this.priorityHeadingText = dojo.query("> :first-child", this.priorityHeading)[0];
  },

  addScore: function() {
  // <div id="heading-scr" class="column-heading column-eval pri-col-eval"><div>Score</div></div>
  var pos = this.matrix.priorityExists ? 1 : 0;
  var heading = dojo.create('div', {
  id: 'heading-scr',
  "class": 'column-heading column-eval pri-col-eval',
  innerHTML:'<div title="' + curam.matrix.Constants.container.i18nMsgs.headerScore + '">' + curam.matrix.Constants.container.i18nMsgs.headerScore + '</div>'
  }, this.node, pos);
  this.scoreHeading = heading;
  this.scoreHeadingText = dojo.query("> :first-child",this.scoreHeading)[0];
  },

  addContradiction: function() {
  // <div id="heading-contr" class="column-heading column-eval contr-col-eval">
//     <a title="Contradictions">Contradictions</a>
  // </div>
  var pos = 0, after;
  if (this.matrix.scoreExists){after = dojo.byId('heading-scr');}
  else if (this.matrix.priorityExists){after = dojo.byId('heading-pri');}

  var heading = dojo.create('div', {
  id: 'heading-contr',
  "class": 'column-heading column-eval contr-col-eval',
  innerHTML: '<div title="' + curam.matrix.Constants.container.i18nMsgs.headerContradictions + '">' + curam.matrix.Constants.container.i18nMsgs.headerContradictions + '</div>'
  });
  if(after){dojo.place(heading, after, "after");}
  else {dojo.place(heading, this.node, 0);}

  this.contradictionHeading = heading;
  this.contradictionHeadingWidth = dojo.query("> :first-child", heading)[0].offsetWidth;
  },

  addOutcomeColumn: function(outcomeDetails) {
  //<div id="heading-O1" class="column-heading column-eval out-O1-col-eval"><div>Out1</div></div>
  var heading = dojo.create('div', {
  id: 'heading-'+outcomeDetails[0],
  "class": 'column-heading column-eval out-'+outcomeDetails[0]+'-col-eval',
  innerHTML: '<a title="'+outcomeDetails[1]+'">'
          + outcomeDetails[1] + '</a>'
  }, this.node, 'last');
  this.outcomeHeadings.add(heading.id, heading);
  },

  deletePriorityColumn: function() {
  dojo.destroy(this.priorityHeading);
  this.priorityHeading = null;
  this.priorityHeadingText = null;
  },

  deleteScoreColumn: function() {
  dojo.destroy(this.scoreHeading);
  this.scoreHeading = null;
  this.scoreHeadingText = null;
  },

  deleteContradictionColumn: function() {
  dojo.destroy(this.contradictionHeading);
  this.contradictionHeading = null;
  this.contradictionHeadingWidth = 0;
  },

  deleteOutcomeColumn: function(id) {
  var headingId = id.replace('column-id', 'heading');
  dojo.destroy(this.outcomeHeadings.getObjectByKey(headingId));
  this.outcomeHeadings.removeByKey(headingId);
  }
});

});

},
'curam/matrix/Number':function(){
// wrapped by build app
define("curam/matrix/Number", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.Number");

dojo.require("curam.matrix.Constants");

//************************************************
//1Number
//************************************************
dojo.declare("curam.matrix.Number", null, {
  constructor: function(node, qId)
  {
  //TODO: check that this object if definetly needed.
  // If it is which is probably is check that all properties are needed.
  this.node = node;
  this.text = dojo.query("> :first-child", node)[0];
  this.qId = qId;
  this.widgetCreated = false;

  var thisObj = this;
  curam.matrix.Constants.container.matrix.addLazyWidget(this, "numbers");
  this.lazyListener = function(event){
  if(!curam.matrix.Constants.container.matrix.createLazyWidgets("numbers")) {
  dojo.disconnect(thisObj.node._conn);
  return;
  }
  if(!thisObj.widget){return;}
  thisObj.widget._toggleMenu('QuestionOptions', event);
  window.activeMenuID = 'ql-' + thisObj.qId;
  dijit.byId('QuestionOptions')._openMyself(event);
  };

  this.node._conn = dojo.connect(this.node, "onclick", this, "lazyListener");
  },
  // Classes set:  .number-text-id-eval{padding-top}
  verticallyCenterText: function(height, questionId) {
  var className = "number-text-" + questionId + "-eval";
  var paddingTop = (height/2) - (curam.matrix.Constants.container.numTextHeight/2);
  curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .")
    .append(className).append("{padding-top:")
    .append(paddingTop).append("px;}");
  },

  createWidget: function() {
  var c = curam.matrix.Constants.container;

  if (this.widgetCreated) return;
  var previousAvailable = dijit.byId(this.node.id);
  if (previousAvailable) { previousAvailable.destroy(); }
  //Might not need to set id:this.node.id
  var widget = this.widget = new curam.widget.QuestionButton(
  { menuId:'QuestionOptions',
  id:this.node.id,
  qId:this.qId
  }, this.node);
  this.widgetCreated = true;
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
'curam/widget/MatrixMenuItem':function(){
// wrapped by build app
define("curam/widget/MatrixMenuItem", ["dijit","dojo","dojox","dojo/require!dijit/MenuItem"], function(dijit,dojo,dojox){
dojo.provide("curam.widget.MatrixMenuItem");

dojo.require("dijit.MenuItem");

/*
 * Modification History
 * --------------------
 * 31-Jul-2012  MV  [CR00336202] Migrate to take on Dojo 1.7.3
 */

dojo.declare(
  "curam.widget.MatrixMenuItem", dijit.MenuItem, {

  id: "",

  postCreate: function() {
    dojo.subscribe("/disableMenuItems", this, "disableItem");
    dojo.subscribe("/enableMenuItems", this, "enableItem");
  },

  disableItem: function() {
    this.set("disabled", true);
  },

  enableItem: function() {
    this.set("disabled", false);
  }
});

});

},
'curam/matrix/QuestionLeft':function(){
// wrapped by build app
define("curam/matrix/QuestionLeft", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.QuestionLeft");

dojo.require("curam.matrix.Constants");

//************************************************
//1QuestionLeft
//************************************************
dojo.declare("curam.matrix.QuestionLeft", null, {
  constructor: function(node)
  {
  this.node = node;
  this.qId = this.node.id.replace("ql-","");

  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  if (childNodes[i].id == "num-"+this.qId) {
  this.number = new curam.matrix.Number(childNodes[i], this.qId);
  } else if (childNodes[i].id == "ques-"+this.qId) {
  this.question = new curam.matrix.QuestionText(childNodes[i]);
  } else { // It has to be ans-group
  this.ansGroup = new curam.matrix.AnswerGroup(childNodes[i], this);
  }
  }
  }
  curam.matrix.Constants.container.addQuestionId(this.qId);
  },
  // Classes set: .q-ct-eval-id {height}
//                .id-eval {height}

  // There are two ways a questions height can be set. It is set to the higher of the answers
  // group div and the question text div. The answers group div height is defined by the
  // total height of all answers in the questions. The question text div height is defined
  // by natural height the div takes as a result of the amount of text. We need to compare
  // the two heights and set the smaller to the higher.
  // It is preferable for the answer group div to be higher because if it is not we need to
  // re-vertically center the input fields/text in the answer div.
  // NOTE: All answers have the same default height and border height so we can easily calculate
  // the total height.
  setDimensions: function() {

  // To calculate the total border height we use num ans - 1 because the first ans in every
  // group does not have a border. The border is on the top of every ans.
  var answerGroupHeight = (this.ansGroup.answers.count * curam.matrix.Constants.container.reducedAnswHeight) +
           ((this.ansGroup.answers.count-1) * curam.matrix.Constants.MATRIX_BORDER_SIZE);
  var q1Delta = (curam.matrix.Constants.container.existingQuestionIds.indexOf(this.qId) > 0)
     ? 0 : curam.matrix.Constants.container.fullAnswerHeight - curam.matrix.Constants.container.reducedAnswHeight;
  answerGroupHeight += q1Delta;
  // Set the question content height to questionTextHeight and set the
  // question height to questionTextHeight + curam.matrix.Constants.MATRIX_BORDER_SIZE because the
  // content contains a border.
  this.setHeight(answerGroupHeight + curam.matrix.Constants.MATRIX_BORDER_SIZE);

  curam.matrix.Constants.container.cssText.append(".matrix-container .").append("q-ct-eval-")
    .append(this.qId).append("{height:")
    .append(answerGroupHeight).append("px;}.matrix-container .")
    .append(this.qId)
    .append("-eval{height:").append(this.height).append("px;}")
    .append(".matrix-container .").append("q-ct-eval-")
    .append(this.qId).append(" .default-q-height-eval{height:")
    .append(answerGroupHeight).append("px;}");


  this.number.verticallyCenterText(answerGroupHeight, this.qId);
  this.question.verticallyCenterText(answerGroupHeight, this.qId);

  return this.height;
  },

  setHeight: function(height) {
  this.height = height;
  },

  addAnswer: function() {
  var ansGroup = this.ansGroup;

  var lastId = ansGroup.getLastAddedAnswerId();
  var newIdIndex = lastId.split("_");
  newIdIndex = Number(newIdIndex[newIdIndex.length - 1]) + 1;

  ansGroup.answerCount ++;
  var node = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.createAnswer(
  this.qId, ansGroup.answerType, newIdIndex,
  ansGroup.getOptions());
  var answer = new curam.matrix.Answer(node, ansGroup.answerType, this);
  ansGroup.answers.add(node.id, answer);

  ansGroup.node.appendChild(node);

  answer.init();

  this.setDimensions();
  return node.offsetHeight;
  },

  getAnswer: function(index) {
  return this.getAnswerById("ans-" + this.qId + "-" + index);
  },

  getAnswerById: function(id) {
  return this.ansGroup.answers.getObjectByKey(id);
  },

  deleteAnswer: function(firstAns, id) {
  this.ansGroup.answers.removeByKey(id);
  if (firstAns) {
  dojo.removeClass(this.ansGroup.answers.getObjectByIndex(0).node, 'ans');
  }
  dojo.destroy(dojo.byId(id));
  this.setDimensions();
  this.ansGroup.answerCount = this.ansGroup.answers.count;
  }
});

});

},
'curam/matrix/TempDivs':function(){
// wrapped by build app
define("curam/matrix/TempDivs", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TempDivs");

//*************************************************
// TempDivs
//*************************************************

//Create properties to represent the tempDivs created as part of the xsl transformation.
//Use these properties to determine dimensions of the standard elements in the matrix.
dojo.declare("curam.matrix.TempDivs", null, {
  constructor: function(container) {
    this.node = dojo.byId('temp-elements');
    this.scroll = dojo.byId('scroll');
    this.num = dojo.byId('num-width');
    this.numHeight = this.num.offsetHeight;
    this.numWidth = this.num.offsetWidth;
    container.questionColWidth = dojo.byId('ques-text-width').offsetWidth;
    container.answersColWidth = dojo.byId('ans-values-width').offsetWidth;
    this.ctAnsVal = dojo.byId('ct-ans-val');
    this.ctAnsSelect = dojo.byId('select');
    this.image = dojo.byId('image');
    this.numAns = dojo.byId('num-ans');
    this.strAns = dojo.byId('str-ans');
    this.textAns = dojo.byId('bool-ans');
    this.priorityHeading = dojo.byId('priority-heading');
    this.priVal = dojo.byId('pri-val');
    this.cell = dojo.byId('cell');
    this.cellInput = dojo.byId('cell-input');
  }
});

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
'curam/widget/DivButton':function(){
require({cache:{
'url:curam/widget/resources/DivButton.html':"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
/*
 * Copyright 2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
define("curam/widget/DivButton", ["curam/util",
        "curam/matrix/Constants",
        "dojo/text!curam/widget/resources/DivButton.html",
        "dijit/_Widget",
		"dijit/_Templated"
          ], function(util, constants, template) {

var CuramDivButton = dojo.declare("curam.widget.DivButtonBase", dijit._Widget,
{
      isContainer: true,

      // Constructor arguments
      disabled: false,
      menuId: "",
      id: "",
      className: "",

      postCreate: function(args, frag) {
        this.sizeMyself();
        dijit.byId(this.menuId).bindDomNode(this.domNode);
        util.connect(this.domNode,
            "onclick", dojo.hitch(this, this.onClick));

        if (this.className) {
          dojo.addClass(this.domNode, this.className);
        }
        if(!this.containerNode) {this.containerNode = this.domNode;}
      },

      setActiveMenuId: function() {
        if(this.domNode.id && this.domNode.id.length > 0
                  && !dojo.hasClass(this.domNode, "image")) {
          window.activeMenuID = this.domNode.id;
        } else {
          window.activeMenuID = this.domNode.parentNode.id;
        }
      },

      sizeMyself: function() {
        // we cannot size correctly if any of our ancestors are hidden
        // (display:none), so temporarily attach to document.body
        if(this.domNode.parentNode){
          var placeHolder = dojo.create("span", {}, this.domNode, "before");
        }
        dojo.body().appendChild(this.domNode);
        if(placeHolder){
          dojo.place(this.domNode, placeHolder, "before");
          dojo.destroy(placeHolder);
        }
      },

      sizeMyselfHelper: function(){
          var mb = dojo.marginBox(this.containerNode);
        this.height = mb.h;
        this.containerWidth = mb.w;
        dojo.style(this.domNode, "width", this.containerWidth + 'px');
      },

      onClick: function(e) {
        if( !this.disabled ) {
          this._toggleMenu(this.menuId, e);
        }
      },

      _checkValidation: function(menu) {
        if(constants.container.matrix.isValidationActive()) {
          if(menu.isShowingNow) {
            menu.close();
          }
          return false;
        }
        return true;
      },

      _setActiveMenu: function(menuId){
                  var menu = dijit.byId(menuId);
        if ( !menu ) { return; }

        if (menu.isShowingNow) {
          this.setActiveMenuId();
        }
      },

      _toggleMenu: function(menuId, event) {

          this._setActiveMenu(menuId);
          dijit.byId(menuId).setButton(this);
      }
    });

  var DivButton = dojo.declare(
    "curam.widget.DivButton",
    [curam.widget.DivButtonBase, dijit._Templated],
    {
       templateString: template
    }
  );


  /**** Used for Questions *****/
  dojo.declare(
    "curam.widget.QuestionButton",
    curam.widget.DivButtonBase,
    {
      postCreate: function(){
        this.className += "number number-col-eval q-ct-eval-" + this.qId;
        util.connect(this.domNode,
            "onmouseover", dojo.hitch(this, this.onMouseOver));
        this.inherited(arguments);
      },

      onMouseOver: function(event) {
        curam.matrix.util.buttonMouseOver(event);
      },

      _toggleMenu: function(menuId, event){

          this._setActiveMenu(menuId);
          dijit.byId(menuId).setButton(this);
      },

      setActiveMenuId: function() {
          window.activeMenuID = this.domNode.parentNode.id;
      }
   });


  /**** Used for Answers *****/
  dojo.declare(
    "curam.widget.AnswerButton",
    curam.widget.DivButtonBase,
    {

      className: "image",

      _toggleMenu: function(menuId, event){

          this._setActiveMenu(menuId);
        var menu = dijit.byId(menuId);
        var node = event.target ? event.target : event;
        if ( !menu ) { return; }
        if(!this._checkValidation(menu)){return;}
          menu.setButton(this);
        if(node) {
          if((!node.id || !node.id.indexOf("ans-") == 0)
                && node.parentNode && node.parentNode.id) {
                    menu.answerId = node.parentNode.id;
          } else {
            menu.answerId = node.id;
          }
          } else {
                  menu.answerId = null;
          }
      },

      setActiveMenuId: function() {
          window.activeMenuID = this.domNode.parentNode.id;
      }
   });


  /**** Used for Combinations *****/
  dojo.declare(
    "curam.widget.CombinationButton",
    curam.widget.DivButtonBase,
    {

      className: "image",

      _toggleMenu: function(menuId, event){
          this._setActiveMenu(menuId);
          dijit.byId(menuId).setButton(this);
        var node = event.target ? event.target : event;
        var menu = dijit.byId(menuId);

        if ( !menu ) { return; }
        if(!this._checkValidation(menu)){return;}
        if (node) {
          if(node.cellId && node.cellId.length > 0) {
            menu.combinationId = node.cellId;
          } else if(node.id && node.id.length > 0 && !dojo.hasClass(node, "image")) {
            menu.combinationId = node.id;
          } else if(node.parentNode) {
            menu.combinationId = node.parentNode.id;
          } else {
            menu.combinationId = node.cellId;
          }
        } else {
          menu.combinationId = null;
        }
      }
   });


   /**** Used for the Priority Column *****/
  dojo.declare(
    "curam.widget.PriorityButton",
    curam.widget.DivButtonBase,
    {
      //<div id="column-id-pri" class="column-id column-eval pri-col-eval"><div>C</div></div>

      className: "column-id column-eval pri-col-eval",

      postCreate: function(){
        dojo.attr(this.domNode, "id", this.id);
        this.inherited(arguments);
      },

      _toggleMenu: function(menuId, event){

          this._setActiveMenu(menuId);
          dijit.byId(menuId).setButton(this);
      }
   });


  /**** Used for the Score Column *****/
  dojo.declare("curam.widget.ScoreButton", curam.widget.PriorityButton, {
    // empty
  });

  return CuramDivButton;
});

},
'curam/Container':function(){
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
 * 22-Apr-2013  MV [CR00381705] Moved getMarginBoxSimple().
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */

define("curam/Container", ["dojo/dom-geometry", "curam/util",
        "curam/matrix/TempDivs",
        "curam/StringBuffer",
        "curam/Matrix",
        "curam/matrix/Constants"
        ], function(domGeom) {

  //************************************************
  // Buttons
  //************************************************
  curam.matrix.Buttons = function() {
  this.node = dojo.byId('buttons');
  };

  // ************************************************
//                     Container
  // ************************************************

  // TODO: put the below in order of when set
  // Properties set on Container: curam.matrix.Constants.container.scrollBarWidth
//                                curam.matrix.Constants.container.leftMatrixWidth
//                                curam.matrix.Constants.container.defaultAnsHeight
//                                curam.matrix.Constants.container.inputBorderWidth
//                                curam.matrix.Constants.container.marginTopStringAns
//                                curam.matrix.Constants.container.ansValWidth
//                                curam.matrix.Constants.container.ansValTextHeight
//                                curam.matrix.Constants.container.ansValInputHeight
//                                curam.matrix.Constants.container.ansValSelectHeight
//                                curam.matrix.Constants.container.maxHeight
//                                curam.matrix.Constants.container.maxWidth
//                                curam.matrix.Constants.container.maxMatrixHeight
//                                curam.matrix.Constants.container.maxTopRightWidth
//                                curam.matrix.Constants.container.questionColWidth
//                                curam.matrix.Constants.container.existingQuestionIds
//                                curam.matrix.Constants.container.existingOutcomeIds
//                                curam.matrix.Constants.container.height
//                                curam.matrix.Constants.container.width

  dojo.declare("curam.Container", null, {
    constructor: function(node, matrixNode, options, i18nMsgs) {
        this.node = dojo.byId(node);
        this.i18nMsgs = i18nMsgs;
        this.validation = {
                            "node":dojo.byId("validation"),
                            "text":dojo.byId("validation-text")
                          };
        this.matrixNode = dojo.byId(matrixNode);
        this.options = options;


        curam.util.connect(this.node, "onclick", function(evt) {
            if(evt.target.tagName == "A" && !evt.target._submitButton) {
              dojo.stopEvent(evt);
              return false;
            }
          });
    },

    // Create a new StringBuffer to hold all css details. Add all child
    // objects and then determine the dimensions of these child objects.
    // Build up dimensions detail in terms off css classses and properties
    // and then add this css to the stylesheet element in the document.
    layout: function() {
      //Make sure that the cluster that contains this decision matrix
      //cannot be collapsed.
      //This method comes from omega3-utils.js
      if(typeof(disableClusterToggle) == "function") {
        disableClusterToggle(this.node.parentNode);
      }
      this.cssText = new curam.StringBuffer();
      this.addChildren();

      this.setScrollBarWidth();
      this.matrix.topLeft.setDimensions();
      this.matrix.topRightFiller.setDimensions();

      // Sets the min and max width and height for the container and the matrix.
      this.setDimensionLimits();
      this.matrix.setDimensionLimits();

      this.matrix.bottomLeft.setDimensions();
      this.matrix.topRight.setDimensions();
      this.matrix.bottomRight.setDimensions();
      this.matrix.scrollSync();

      // Remove the temp divs used to determine widths and heights of various
      // elements in the matrix.
      this.tempDivs.node.parentNode.removeChild(this.tempDivs.node);

      this.matrix.setDimensions();
      this.setDimensions();
      this.setLocales();

      curam.matrix.Constants.container.addCSS();

      this.matrix.updateQuestionOrder();
      this.matrix.checkEmpty();
    },


    // Add all the children objects of the container. Basically, all the elements
    // as described in HTMLAndCSSDescription.txt
    addChildren: function() {

      // | delimeted string of the existing Questions and Outcomes
      // in the matrix. ids are added as Question and Outcome objects
      // are created.
      // They are used for the addOutcomes and addQuestions popup pages
      // to filter out Questions and Outcomes that have already been added.
      this.existingQuestionIds = "";
      this.existingQuestionIdsMap = {};
      this.existingOutcomeIds = "";

      // see How the widgets are created: in introduction above
      this.menuOptionsCreated = false;

      this.tempDivs = new curam.matrix.TempDivs(this);

      //Create the matrix, and create a shortcut for it
      this.matrix = this.m = new curam.Matrix(this.matrixNode, this, this.options);
      this.buttons = new curam.matrix.Buttons();
    },

    addQuestionId: function(id) {
      //There is a special case where the initial question added to the matrix
      //has the ID "SampleQuestion".  This should not be recorded.
      if(id == "SampleQuestion") {
        return;
      }
      this.existingQuestionIds = this.existingQuestionIds + (id)+'|';
      this.existingQuestionIdsMap[id] = true;
    },

    removeQuestionId: function(id) {
      // remove the question from the existingQuestionIds string. 
          this.existingQuestionIds =
                                curam.matrix.Constants.container.existingQuestionIds.replace(id+'|', '');
      this.existingQuestionIdsMap[id] = false;
    },

    // Create an empty div with a scroll bar. Calculate the width of
    // the scroll bar by taking the clientWidth from the offsetWidth;
    setScrollBarWidth: function() {
      this.scrollBarWidth = curam.util.getScrollbar().width;
    },

    // Set dimension limits on the curam.matrix.Constants.container.
    // The max width is set based on the available width of the div surrounding the Container.
    // The minimum width is set based on the width of the left hand side of the Matrix i.e.
    // the number, question text and answer values columns. (The non scrollable side of the matix).
    // plus a random min width for the RHS minWidthRHSMatrix = 100.
    // The min height is set to a random number   var minContainerHeight = 200;
    // The max height is set based on the available height of the div surrounding the Container
    // minus some random number (-100). -100 Is needed because a submit button is required for the
    // page (but not needed, as the save link does the same thing). TODO: tidy this up a bit.
    setDimensionLimits: function() {
      var minContainerWidth = curam.matrix.Constants.container.leftMatrixWidth + 100;
      var minContainerHeight = 200;

      var parentNode = this.node.parentNode;
      var pageContent = dojo.byId("content");

      this.maxHeight = dojo.contentBox(pageContent).h - 100;
      this.maxWidth = dojo.contentBox(parentNode).w;
    },

    setDimensions: function() {
      this.setWidth();
      this.setHeight();
      this.setVisible();
    },

    // Set the height of the curam.matrix.Constants.container to be the height of the Matrix plus validation
    // divs under the matrix.
    // Classes set:                         .matrix-container-eval{height}
    // Object properties set:               container.height
    setHeight: function() {
      var valHeight = domGeom.getMarginBoxSimple(this.validation.node).h;
      if(valHeight < 1) {
        cm.toggleDisplay(this.validation.node);
        valHeight = domGeom.getMarginBoxSimple(this.validation.node).h;
        cm.toggleDisplay(this.validation.node);
      }
      valHeight = Math.max(valHeight, 0);
      var btnHeight = dojo.query("> span", this.buttons.node)[0].offsetHeight;
      this.height = this.matrix.height
                  + valHeight
                  + Math.min(btnHeight, 20)
                  + 5;
      this.cssText.append(".matrix-container-eval {height:").append(this.height).append("px;}");

      this.matrix.refreshScrollSync();
    },

    // Set the width of the Container to the width of the Matrix.
    // Classes set:               .matrix-container-eval{width}
    setWidth: function() {
      this.cssText.append(".matrix-container-eval{width:").append(this.matrix.width).append("px;}");
    },

    // Classes set:               .matrix-container-eval{visibility:visible}
    setVisible : function() {
      this.cssText.append(".matrix-container-eval{visibility:visible;}");
    },

    // Add the css classes and properties built up using container.cssText StringBuffer
    // to the stylesheet element in the document.
    addCSS: function() {
      var cssString = this.cssText.toString();
      if(!cssString){return;}

      //Maintain the scroll position. Inserting the css affects it.
      var curScroll = this.matrix.bottomRight.node.scrollTop;

      curam.util.insertCssText(cssString, "_container_stylesheet_");
      this.matrix.bottomRight.node.scrollTop = curScroll;

      this.cssText = new curam.StringBuffer();
    },

    // localeList is set in the xslt and is in the format e.g. 'en,fr,fr_cs,'
    setLocales : function() {
      this.locales = localeList.split(',');
    },

    activateWarning: function (message, timeout) {
      dojo.style(this.validation.node, "display", "block");
      cm.setClass(this.validation.text, "active-validation");
      this.validation.text.innerHTML = message;
      var textHeight = Math.max(this.validation.text.clientHeight, 20);
      dojo.style(this.validation.node,"height",(textHeight + 10) + "px");

      dojo.style(this.buttons.node, "display", "none");

      if (timeout) {
        var _this = this;
        setTimeout(function(){_this.deactivateValidation();}, 3000);
      }
      this.matrix.setValidationActive();
    },

    activateError: function (message, timeout) {
      dojo.style(this.validation.node, "display", "block");
      var node = this.validation.text;
      cm.setClass(node, "active-error");
      node.innerHTML = message;
      var textHeight = node.clientHeight;
      dojo.style(this.validation.node, "height", textHeight + 10 +"px");

      dojo.style(this.buttons.node, "display", "none");

      if (timeout) {
          setTimeout("curam.matrix.Constants.container.deactivateValidation()", 3000);
      }
    },

    deactivateValidation: function () {
      dojo.style(this.validation.node, "display", "none");
      cm.setClass(this.validation.text, "hidden-validation");
      this.validation.text.innerHTML = "";
      cm.setClass(curam.matrix.Constants.container.validation.node, "validation");
      cm.setClass(this.validation.node, "hidden-validation");
      var textHeight = Math.max(this.validation.text.clientHeight, 20);
      dojo.style(this.validation.node, "height", textHeight + 10 +"px");

      dojo.style(this.buttons.node, "display", "");
      this.matrix.setValidationInactive();
    },

    hideValidation: function() {
      dojo.style(this.validation.node, "display", "none");
    },

    getFakeEvent: function(node) {
      var coords = dojo.coords(node, true);

      return {
        target: node,
        pageX: coords.x,
        pageY: coords.y,
        isFake: true,
        stopPropagation: function(){},
        preventDefault: function(){}
      };
    }
  });
});

},
'curam/matrix/ContradictionColumn':function(){
// wrapped by build app
define("curam/matrix/ContradictionColumn", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.ContradictionColumn");

dojo.require("curam.matrix.Constants");

//************************************************
//1ContradictionColumn
//************************************************
//TODO: Might not need the messages ListMap, leave out for now.
dojo.declare("curam.matrix.ContradictionColumn", null, {
  constructor: function(node, addListeners){
  this.node = node;
  this.text = dojo.query("> :first-child", this.node)[0];
  this.columns = new curam.ListMap();
  this.columnMessages = new curam.ListMap();
  this.widgetCreated = false;
  this.combinationCount = 0;
  var nextElement = cm.nextSibling(this.text);
  this.matrix = curam.matrix.Constants.container.matrix;

  if(addListeners) {
  curam.matrix.util.initButtonListeners(node);
  }

  while (nextElement != null)  {
  if (nextElement.nodeName == "INPUT") {
  if (isColumn(nextElement.id))  {
  this.columns.add(nextElement.id, nextElement);
  this.combinationCount++;
  }
  }
  nextElement = cm.nextSibling(nextElement);
  }
  function isColumn(id) {
  var regExp = /.contrcombid./;
  if (id.match(regExp) != null) {
  return true;
  } return false;
  }

  var thisObj = this;
  this.matrix.addLazyWidget(this, "columns");
  this.lazyListener = function(event){
  if(!thisObj.matrix.createLazyWidgets("columns")) {
  dojo.disconnect(thisObj.node._conn);
  return;
  }
  if(!thisObj.widget){return;}
  thisObj.widget._toggleMenu('OutcomeOptions', event);
  window.activeMenuID = thisObj.node.id;
  dijit.byId('OutcomeOptions')._openMyself(event);
  };

  this.node._conn = dojo.connect(this.node, "onclick", this, "lazyListener");
  },
  createWidget: function() {
  var c = curam.matrix.Constants.container;

  if (this.widgetCreated) return;
  var width = this.widthWithoutBorder;
  var previousAvailable = dijit.byId(this.node.id);
  if (previousAvailable) { previousAvailable.destroy(); }
  //Might not need to set id:this.node.id
  var widget = this.widget =
  new curam.widget.DivButton({ menuId:'OutcomeOptions',
                  id: this.node.id,
                  className: 'column-id column-eval contr-col-eval'
                 }, this.node);
  var newContrCol = new curam.matrix.ContradictionColumn(widget.domNode, true);
  c.matrix.topRight.topRightTop.contradictionCol = newContrCol;
  newContrCol.widgetCreated = true;
  newContrCol.setWidth(width);
  },
  // e.g. from __o3dmx.MODIFY.dtls$matrixResult.contrcombid.1 to 1
  getCombColumnIds: function() {
  var key;
  var arr = new Array();
  var regExp = /^.*\.contrcombid\./;
  for (var i=0; i<this.columns.count; i++) {
  key = this.columns.getKeyByIndex(i);
  key = new String(key);
  arr.push(key.replace(regExp, ''));
  }
  return arr;
  },

  setWidth: function(width) {
  curam.matrix.Constants.container.cssText.append(".matrix-container .contr-col-eval{width:").append(width).append("px;}");
  this.widthWithoutBorder = width;
  this.widthWithBorder = width + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  },


  deleteCombIdAndMsgInputFields: function(id) {
  // e.g. __o3dmx.MODIFY.dtls$matrixResult.contrcombid.1
//        __o3dmx.MODIFY.dtls$matrixResult.contrmsg.1.en

  var combColId = this.matrix.inputPrefix+'contrcombid.'+id;
  var msgId;
  var c = curam.matrix.Constants.container;

  dojo.destroy(this.columns.getObjectByKey(combColId));
  this.columns.removeByKey(combColId);

  for (var i = 0; i < c.locales.length; i++) {
  if (c.locales[i] == "") { continue; }
  msgId = this.matrix.inputPrefix+'contrmsg.'+c.locales[i]+'.'+id;
  //TODO: remove the below and replace with commented out lines after populating msgArray.
  dojo.destroy(dojo.byId(msgId));
  //dojo.destroy(this.columnMessages.getObjectByKey(msgId));
  // this.columnMessages.removeByKey(combColId);
  }
  }
});

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
'curam/matrix/validation/OutcomeValidator':function(){
// wrapped by build app
define("curam/matrix/validation/OutcomeValidator", ["dijit","dojo","dojox","dojo/require!curam/util/ResourceBundle"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.OutcomeValidator");
dojo.require("curam.util.ResourceBundle");

//*******************************************************************
// OUTCOME COMBINATION VALIDATOR
//*******************************************************************

/**
 * Creating Resource Bundle Object to access localized resources.
 */
var bundle = new curam.util.ResourceBundle("Debug");

dojo.declare("curam.matrix.validation.OutcomeValidator",
  curam.matrix.validation.DefaultCombinationValidator, {
    warningSingleMsg: null,
    warningMsg: "",
    errorMsg: "",

    constructor: function OutcomeCombValidator(container, opts) {
      this.validatingCombCells = null;
      this.matchingCombCells = null;
      this.setWarningActive(false);
      this.setErrorActive(false);
      this.outcomeId = null;
      this.combinationNum = null;
      this.container = container;
      this.isInitialized = false;

      this.bitsets = [];
      this.state = curam.matrix.validation.DefaultCombinationValidator.prototype.state;

      if(opts) {
       dojo.mixin(this, opts);
      }
      this._registerValidator(this);
    },
    setOutcomeValue: function(outcomeID, colNum, checkBox, event, skipValidation) {
      if(event !== null) {event = dojo.fixEvent(event);};
      
      var errorPart1 
        = bundle.getProperty("curam.matrix.validation.OutcomeValidator.err.1"); 
      var errorPart2 
        = bundle.getProperty("curam.matrix.validation.OutcomeValidator.err.2"); 
      var errorPart3 
        = bundle.getProperty("curam.matrix.validation.OutcomeValidator.err.3"); 

      //Check if a full refresh is required, and if so, return, as _checkRefresh
      //does this refresh for you.
      if(this._checkRefresh()){
        var valActive = this.container.matrix.isValidationActive();
        if(event && valActive
            && !this.container.matrix.isInputPartOfValidation(checkBox)) {
          dojo.stopEvent(event);
          this.container.matrix.refocusValidatingInput();
          return;
        }
        return;
      }

      if(!this.bitsets[outcomeID]
          || typeof(this.bitsets[outcomeID][colNum]) == "undefined") {
        this._initOutcome(outcomeID);
      }
      var valActive = this.container.matrix.isValidationActive();
      if(event && valActive
          && !this.container.matrix.isInputPartOfValidation(checkBox)) {
        dojo.stopEvent(event);
        this.container.matrix.refocusValidatingInput();
        return;
      }
      if(typeof(this.bitsets[outcomeID][colNum]) == "undefined") {
        curam.debug.log(errorPart1 + outcomeID + errorPart2 + colNum 
          + errorPart3);
        return;
      }
      var bitset = this.bitsets[outcomeID][colNum];

      //lazily assign a unique identifier to this checkbox
      this._initCheckbox(checkBox, bitset);

      var number = checkBox.bitsetId;

      if(checkBox.checked) {
        bitset.set(number);
      } else {
        bitset.unSet(number);
      }

      if(!skipValidation) {
        this._validate(bitset, checkBox);
      }
    },

    refreshOutcome: function(outcomeID) {
      //If the validator has never been refreshed with all outcomes, then
      //refresh it.  This initializes the validator.
      if(!this.bitsets[outcomeID]) {
        this.requiresRefresh = true;
        this.refreshValidation();
        return;
      }

      this.deleteOutcome(outcomeID);
      this._initOutcome(outcomeID);

      var bitset = this.bitsets[outcomeID];
      for(var count = 0; count < bitset.length; count++) {
        if(bitset[count]){
          this._validate(bitset[count], bitset[count].inputs[0]);
          break;
        }
      }
    },

    //Perform validation on all outcomes in the matrix.  This should be called
    //whenever a question or answer is deleted, or when another outcome
    //combination is added.
    refreshValidation: function() {
      if(!this.requiresRefresh) {
        return;
      }
      this.inRefresh = true;

      if(this.bitsets && this.bitsets.length > 0) {
        //Remove the bitsets from the singleton array that stores all BitSets
        //belonging to both the ContradictionValidator and the OutcomeValidator
        var bitsetIds = {};
        for(var count1 = 0; count1 < this.bitsets.length; count1++) {
          if(!this.bitsets[count1]) {//if the outcome was deleted, ignore it
            continue;
          }
          for(var count2 = 0; count2 < this.bitsets[count1].length; count2++) {
            if(!this.bitsets[count1][count2]){continue;}
            bitsetIds[this.bitsets[count1][count2].id] = true;
          }
        }
        this._deleteBitsets(bitsetIds);
      }

      this.bitsets = [];

      //Get the list of outcome IDs
      var outcomeIDs = [];
      var questions = this.container.matrix.bottomRight.questions;

      if(questions.count < 1) {
        return;
      }

      var origOutcomeIDs = questions.getObjectByIndex(0).outcomeGroup.keys;

      var safeSplit = curam.matrix.util.safeSplit;
      var arr;
      for(var count = 0; count < origOutcomeIDs.length; count++) {
        arr = safeSplit(origOutcomeIDs[count], "-");
        outcomeIDs[count] = arr[1];
        this._initOutcome(outcomeIDs[count]);
      }

      var bitsets, invalid = false;
      for(var count = 0; count < outcomeIDs.length && !invalid; count++) {
        bitsets = this.bitsets[outcomeIDs[count]];
        for(var bCount = 0; bCount < bitsets.length; bCount++){
          if(bitsets[bCount] && !this._validate(null, bitsets[bCount].inputs[0])) {
            invalid = true;
            break;
          }
        }
      }

      if(this.isWarningActive() || this.isErrorActive()) {
        this.refocus();
      }
      this.inRefresh = this.requiresRefresh = false;
    },

    deleteCombination: function(outcomeID, cellID) {
      if(!this.bitsets[outcomeID] || !this.bitsets[outcomeID][Number(cellID)]) {
        return;
      }
      this._deleteBitset(this.bitsets[outcomeID][Number(cellID)]);
      this.bitsets[outcomeID][Number(cellID)] = null;
    },

    deleteOutcome: function(outcomeID) {
      if(!this.bitsets[outcomeID]) {
        return;
      }
      var idMap = {};
      for(var count = 0; count < this.bitsets[outcomeID].length; count++) {
        if(this.bitsets[outcomeID][count]) {
          idMap[this.bitsets[outcomeID][count].id] = true;
        }
      }
      this._deleteBitsets(idMap);

      //remove the array of bitsets for this outcome from the 'bitsets' array
      for(var count = 0; count < this.bitsets.length; count++) {
        if(this.bitsets[count] == this.bitsets[outcomeID]) {
          this.bitsets[count] = null;
          break;
        }
      }

      this.bitsets[outcomeID] = null;
    },

    _initOutcome: function(outcomeID) {

      if(!this.bitsets[outcomeID]) {
        this.bitsets[outcomeID] = this.bitsets[this.bitsets.length] =[];
      }
      var bitsetsArr = this.bitsets[outcomeID];

      var questions = this.container.matrix.bottomRight.questions;
      var rows, cells;
      var outcomeGroup,outcomes, outKey, keys, key, qId, question;

      var getOutCellId = function(id) {
        return Number(id.substr(id.lastIndexOf('-') + 1, id.length)) - 1;
      };

      var firstCells = questions.getObjectByIndex(0).getOutcome(outcomeID).rows
                            .getObjectByIndex(0).cells;
      var colNumMap = {};
      for(var count = 0; count < firstCells.count; count++) {
        colNumMap[count] = getOutCellId(firstCells.keys[count]);
        if(bitsetsArr.length < count -1 || !bitsetsArr[colNumMap[count]]) {
          this._createBitset(colNumMap[count], bitsetsArr);
        }
      }

      //Initialize all the columns in a single outcome.
      for(var qCount = 0; qCount < questions.count; qCount++) {
        question = questions.getObjectByIndex(qCount);
        rows = question.getOutcome(outcomeID).rows;

        for(var rCount = 0; rCount < rows.count; rCount++) {
          cells = rows.getObjectByIndex(rCount).cells;

          for(var cCount = 0; cCount < cells.count; cCount ++) {
            var input = cells.getObjectByIndex(cCount).input;
            input.bitsetId = null;
            //set the bitset value, but skip validation
            this.setOutcomeValue(outcomeID, colNumMap[cCount], input, null, true);
          }
        }
      }
    }
  }
);

});

},
'curam/matrix/Priority':function(){
// wrapped by build app
define("curam/matrix/Priority", ["dijit","dojo","dojox","dojo/require!curam/util,curam/matrix/util"], function(dijit,dojo,dojox){
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
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */

dojo.provide("curam.matrix.Priority");

dojo.require("curam.util");
dojo.require("curam.matrix.util");

//************************************************
//1Priority
//************************************************
dojo.declare("curam.matrix.Priority", null, {
  constructor: function(node, matrix, priorityGroup) {
    this.node = node;
    this.validation = dojo.query("> :first-child", node)[0];
    this.input = dojo.query("> :first-child", this.validation)[0];
    this.input.priorityGroup = priorityGroup;
    this.input.priority = this;
    
    curam.util.connect(this.input, "onkeyup", function(e) {
      matrix.priorityValidator.validatePriority(arguments[0]);
      return false;
    });

    curam.util.connect(this.input, "onblur", function(e) {
      matrix.priorityValidator.checkPriorityValidation(e);
      return false;
    });

    curam.matrix.util.makeNumericInput(this.input, true);
  },
  
  adjustFirstRowClass: function(initialClass) {
    var clName = dojo.attr(this.node, "class");
    if (clName.indexOf('ans-eval-with-menu') == -1) {
    clName = clName.replace('ans-eval', 'ans-eval-with-menu');
      cm.setClass(this.node, clName);
    }
    clName = dojo.attr(this.validation, "class");
    if (clName.indexOf('ans-str-val-eval-with-menu') == -1) {
      clName = clName.replace('ans-str-val-eval', 'ans-str-val-eval-with-menu');
      cm.setClass(this.validation, clName);
    }
  }
});

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
'curam/matrix/OutcomeColumn':function(){
// wrapped by build app
define("curam/matrix/OutcomeColumn", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.OutcomeColumn");

dojo.require("curam.matrix.Constants");

//************************************************
//1OutcomeColumn
//************************************************
dojo.declare("curam.matrix.OutcomeColumn", null, {
  constructor: function(node, addListeners)
  {
  this.node = node;
  this.text = dojo.query("> :first-child", this.node)[0];
  this.outId = this.node.id.replace("column-id-", "");
  this.columns = new curam.ListMap();
  this.combinationCount = 0;
  this.matrix = curam.matrix.Constants.container.matrix;

  if(addListeners) {
  curam.matrix.util.initButtonListeners(node);
  }

  var nextElement = cm.nextSibling(this.text);
  while (nextElement != null)  {
  if (nextElement.nodeName == "INPUT") {
  this.columns.add(nextElement.id, nextElement);
  this.combinationCount++;
  }
  nextElement = cm.nextSibling(nextElement);
  }
  curam.matrix.Constants.container.existingOutcomeIds = curam.matrix.Constants.container.existingOutcomeIds.concat((this.outId)+'|');

  var thisObj = this;
  this.matrix.addLazyWidget(this, "columns");
  this.lazyListener = function(event){
  if(!thisObj.matrix.createLazyWidgets("columns")) {
  dojo.disconnect(this.node._conn);
  return;
  }
  if(!thisObj.widget){return;}
  thisObj.widget._toggleMenu('OutcomeOptions', event);
  window.activeMenuID = thisObj.node.id;
  dijit.byId('OutcomeOptions')._openMyself(event);
  };

  this.node._conn = dojo.connect(this.node, "onclick", this, "lazyListener");
  },

  createWidget: function() {
  var c = curam.matrix.Constants.container;

  if (this.widgetCreated) return;

  var className = 'column-id column-eval out-'+this.outId+'-col-eval';
  var width = this.widthWithoutBorder;
  var previousAvailable = dijit.byId(this.node.id);
  if (previousAvailable) { previousAvailable.destroy(); }
  //Might not need to set id:this.node.id
  var widget = this.widget = new curam.widget.DivButton(
  { menuId:'OutcomeOptions',
  id:this.node.id,
  className:className
  }, this.node);

  var newOutCol = new curam.matrix.OutcomeColumn(widget.domNode, true);
  c.matrix.topRight.topRightTop.outcomeCols.add(newOutCol.node.id, newOutCol);
  newOutCol.widgetCreated = true;
  newOutCol.setWidth(this.outId, width);

  // We need to remove the outId here because when we re-create the object the outcome id is
  // added to c.existingOutcomeIds for the second time.
  c.existingOutcomeIds = c.existingOutcomeIds.replace(this.outId+'|','');
  },



  // e.g. from __o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.5 to 5
  getCombColumnIds: function() {
  var key;
  var arr = new Array();
  var regExp = /.*\.outcombid\..*\./;
  for (var i=0; i<this.columns.count; i++) {
  key = this.columns.getKeyByIndex(i);
  key = new String(key);
  arr.push(key.replace(regExp, ''));
  }
  return arr;
  },

  //NOTE: If we want the heading to be the deciding width dimension
  setDimensions: function(outId) {
  var numCombCols = this.combinationCount;
  var headingWidth = (numCombCols * curam.matrix.Constants.COMBINATION_CELL_WIDTH) + ((numCombCols-1) * curam.matrix.Constants.MATRIX_BORDER_SIZE);

  var cellWidth = curam.matrix.Constants.COMBINATION_CELL_WIDTH;

  this.setWidth(outId, headingWidth);
  return headingWidth + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  },

  setWidth: function(outId, width) {
  curam.matrix.Constants.container.cssText.append(".matrix-container .out-").append(outId).append("-col-eval{width:").append(width).append("px;}");
  this.widthWithoutBorder = width;
  this.widthWithBorder = width + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  },

  deleteCombIdInputFields: function(id) {
  // e.g. __o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.1
//        __o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.2
  var combColId = this.matrix.inputPrefix+'outcombid.'+this.outId+'.'+id;

  dojo.destroy(this.columns.getObjectByKey(combColId));
  this.columns.removeByKey(combColId);
  }
});

});

},
'curam/ListMap':function(){
define("curam/ListMap", [], function() {
  
  var ListMap = dojo.declare("curam.ListMap", null, {
    constructor: function() {
      this.keys = new Array();
      this.objects = new Array();
      this.count = this.keys.length;
    },
    
    add: function(key, object) {
      if (this.getIndexByKey(key) >= 0) {
        this.set(key, object);
      } else {
        this.keys.push(key); this.count++;
        this.objects[key] = object;
      }
    },
    
    set: function(key, object) {
      var pos = this.getIndexByKey(key);
      this.keys[pos] = key;
      this.objects[key] = object;
    },
    
    getObjectByIndex: function(index) {
      return this.objects[this.keys[index]];
    },
    
    getKeyByIndex: function(index) {
      return this.keys[index];
    },
    
    getObjectByKey: function(key) {
      if (this.getIndexByKey(key) != -1) {
        return this.objects[key];
      }
    },
    
    getIndexByKey: function(key) {
      return this.indexOf(key);
    },
    
    removeByKey: function(key) {
      var index = this.getIndexByKey(key);
      if (index>=0 && index<this.count) {
        this.count--;
        this.keys.splice(index,1);
        //delete this.objects[key];
        this.objects[key] = null;
      }
    },
    
    removeAtIndex: function(index) {
      if (index>=0 && index<this.count) {
        this.count--;
        this.keys.splice(index,1);
      }
    },
    
    indexOf: function(obj) {
      for(var i=0; i<this.count; i++){
        if(this.keys[i]==obj){  return i;  }
      }
    }
  });

  return ListMap;
});

},
'curam/Matrix':function(){
/*
 * Copyright 2009-2013 Curam Software Ltd.
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
 * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
 *                include required bundle.
 * 11-Oct-2012  BOS [CR00346368] Localized debug messages to console.
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */

define("curam/Matrix", ["curam/matrix/validation/AnswerValidator",
        "curam/matrix/Constants",
        "curam/matrix/validation/PriorityValidator",
        "curam/matrix/validation/ContradictionValidator",
        "curam/matrix/validation/OutcomeValidator",
        "curam/matrix/TopLeft",
        "curam/matrix/TopRight",
        "curam/matrix/TopRightFiller",
        "curam/matrix/BottomLeft",
        "curam/matrix/BottomRight",
        "curam/util",
        "curam/matrix/util",
        "curam/debug",
        "curam/util/ScreenContext",
        "curam/StringBuffer",
        "curam/util/ResourceBundle"
        ], function() {
  /**
   * Creating Resource Bundle Object to access localized resources.
   */ 
  dojo.requireLocalization("curam.application", "Debug");
  var bundle = new curam.util.ResourceBundle("Debug");
  
  /**
  Check out CEMS case TEC-112 for the functional spec on the decision matrix inc.
  DISPLAY and ACTION PHASE XML formats.

  Program flow:

    On page load a Container object is created.
    This in turn creates objects/properties to represent
    all the elements as decsribed in HTMLAndCSSdescription.txt

    After all the objects are created Container.layout() is called.
    This sets the dimensions for all the elements on the matrix.

    Each element has several classes associated with itself.
    The properties for these classes are determined based on
    temporary elements on the page used to represent standard
    elements e.g. heading texts, answers, priorities, combination
    cells etc. The temporary Divs are created in the xslt and are
    removed after the dimensions are calculated.

  Dynamic matrix:

    There are several dojo button types created for the matrix:
      DivButton (Created for every Outcome on the Outcome Heading Div - badly named - should be renamed)
      QuestionButton (Created for every Question on the number Div)
      AnswerButton (Created for answer on the amswer button div)
      CombinationButton (Created for every combination on the combination cell button div)
      PriorityButton (Created for the priority heading div)
      ScoreButton (Created for the score heading div)

    There are several menu option dojo widgets for the buttons created also.
      QuestionOptions:
      AnswerOptions:
      OutcomeOptions:
      CombinationOptions:
      PriorityOptions:
      ScoreOptions:

    These widgets are only created once and re-used for all buttons.<b>

    How the widgets are created:
      An onclick event handler is register for all Divs that represent buttons in
      the Matrix. When a Div is clicked the button widget is created for that div.
      Also, all the Menu options are created. The menu options are only created
      once. An indicator is used to indicate if they have been created,
      container.menuOptionsCreated. On each button Div (or parent Div) an
      indicator is used to indicate if the button widget was created for this
      particular div.   'object'.widgetCreated.
  */

  /** TODO: General TODO list for Javascript.

   * When clicking on a button the main background colour on the content should
     change colour, a darker shade of blue.

   * Rename DivButton.js to MatrixButton.js , rename curam.widget.DivButton to
     curam.widget.OutcomeButton

   * To avoid all the mouse click event registers, add 1 onclick to the container
     itself, check the target using regExp and if it should be a button create the
     widgets for it.

   * Rewrite other javascript file esp. codetable-hierarchy.js to be more efficient.

   * Change popup addQuestions addOutcomes addMessage to dojo floating divs.

   * Look into display:none rather than visibility:hidden this should stop the
     browser from rendering the page until after the jscript runs.

  */
  var Matrix = dojo.declare("curam.Matrix", null, {
    HORIZ_VALIDATION: 1,
    VERT_VALIDATION:2,

    constructor:  function(node, parentContainer, options) {

     parentContainer.matrix = this;

     curam.matrix.Constants.container = parentContainer;

    this.messages = {
      contradiction: {
        singleWarningMsg: curam.matrix.Constants.container.i18nMsgs.contradictionsSingleWarningMsg,
        questionMsg: curam.matrix.Constants.container.i18nMsgs.contradictionsQuestionMsg,
        warningMsg: curam.matrix.Constants.container.i18nMsgs.contradictionsWarningMsg,
        errorMsg: curam.matrix.Constants.container.i18nMsgs.contradictionsErrorMsg,
        tooFewQuestions: curam.matrix.Constants.container.i18nMsgs.contradictionsTooFewQuestions
      },
      outcome: {
        warningMsg: curam.matrix.Constants.container.i18nMsgs.outcomeWarningMsg,
        errorMsg: curam.matrix.Constants.container.i18nMsgs.outcomeErrorMsg,
        copyErrorMsg: curam.matrix.Constants.container.i18nMsgs.outcomeCopyErrorMsg
      },
      emptyMatrix: curam.matrix.Constants.container.i18nMsgs.questionEmptyMatrix

      };
      var optParams = ['priorityExists','scoreExists','contradictionsExist',
                         'outcomesExist','inputPrefix'];
      for(var count = 0; count < optParams.length; count++) {
        if(options[optParams[count]]) {
          this[optParams[count]] = options[optParams[count]];
        }
      }

      //Get the form that will be submitted.
      this.form = dojo.byId(this.inputPrefix + "deletedQuestions").form;

      this.answerValidator = new curam.matrix.validation.AnswerValidator(curam.matrix.Constants.container);
      this.priorityValidator = new curam.matrix.validation.PriorityValidator(curam.matrix.Constants.container);
      this.contradictionValidator =
            new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,
            this.messages.contradiction);
      this.outcomeValidator =
               new curam.matrix.validation.OutcomeValidator(curam.matrix.Constants.container,
            this.messages.outcome);

      this.validators = [this.answerValidator,
                         this.priorityValidator,
                         this.contradictionValidator,
                         this.outcomeValidator
                         ];
      var thisMatrix = this;
      var refreshOutcomeValidation = function() {
        if(thisMatrix.refreshOutcomeValidations) {
          thisMatrix.refreshOutcomeValidations = false;
          thisMatrix.outcomeValidator.refreshValidation();
        }
      };

      dojo.connect(this.contradictionValidator, "onValid",
                           refreshOutcomeValidation);

      this.node = node;
      this.topLeftFiller = dojo.byId('top-left-filler');
      this.topLeft = new curam.matrix.TopLeft();
      this.topRight = new curam.matrix.TopRight();
      this.topRightFiller = new curam.matrix.TopRightFiller();
      this.bottomLeft = new curam.matrix.BottomLeft(this);
      this.bottomRight = new curam.matrix.BottomRight(this);

      var thisMatrix = this;

      this._refocusListener = function(e){
        if(thisMatrix.isValidationActive()) {
          thisMatrix.refocusValidatingInput();
        }
        dojo.stopEvent(e);
      };

      curam.util.connect(this.node, "key", function(e) {
        var keys = curam.matrix.util.keys;
        if((e.keyCode == curam.matrix.util.keys.KEY_LEFT_ARROW
            || e.keyCode == curam.matrix.util.keys.KEY_RIGHT_ARROW )
            && e.target.tagName != "INPUT") {
          thisMatrix._refocusListener(e);
        }
      });

      this._initForm();

      //create shortcuts for functions
      this.sov = this.setOutcomeValue;
      this.scv = this.setContradictionValue;
      this.cf = curam.matrix.util.checkFocus;

      //TODO: not sure about these?? Might be a better way to do it.
      //this.addStartingQuestionsHiddenField();
      //this.addStartingOutcomesHiddenField();
    },

    // Set the max matrix height to be the container height minus the validation divs.
    // Set the max top right width to be max container width minus the left hand side of
    // the matrix width and top right filler. This is the width before the top right
    // starts scrolling.
    //
    // Object properties set                container.maxMatrixHeight
    //                                      container.maxTopRightWidth
    setDimensionLimits: function() {
      var c = curam.matrix.Constants.container;

      var valVertBorder = dojo.style(c.validation.node, "borderTop")
                            + dojo.style(c.validation.node, "borderBottom");
      var firstChild = dojo.query("> span:first-child", c.buttons.node)[0];
      var childBorder = dojo.style(firstChild, "borderTop")
                            + dojo.style(firstChild, "borderBottom");

      c.maxMatrixHeight = c.maxHeight
          - (valVertBorder + Math.min(20,childBorder));

      c.maxTopRightWidth = c.maxWidth - c.leftMatrixWidth
                        - c.matrix.topRightFiller.widthIncBorder;
    },

    setDimensions: function() {
      this.setHeight();
      this.setWidth();
    },


    // Set the width of the Matrix.
    // Object Properties Set:              matrix.width
    // Classes set:                       .matrix-eval{width}
    setWidth: function() {
      this.width = curam.matrix.Constants.container.leftMatrixWidth + this.topRight.width
                    + this.topRightFiller.widthIncBorder;
      curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{width:")
                       .append(this.width).append("px;}");
    },

    // Object Properties Set:              matrix.height
    // Classes set:                       .matrix-eval{height}
    setHeight: function() {
      this.height = this.topLeft.height + this.bottomLeft.heightIncBorder;
      curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{height:")
                       .append(this.height).append("px;}");
    },

    // Add scroll synchronization to the bottom left and bottom right divs and to the top right
    // and bottom right divs
    scrollSync: function() {
      var topRight = this.topRight.node;
      var bottomRight = this.bottomRight.node;
      var bottomLeftMain = this.bottomLeft.bottomLeftMain.node;
      this.addScrollSynchronization(bottomRight, topRight, bottomLeftMain);
    },

    refreshScrollSync: function() {
      if(this._syncScroll) {
        this._syncScroll();
      }
    },

    // This function adds scroll syncronization for the fromElement to the toElement
    // this means that the fromElement will be updated when the toElement is scrolled
    addScrollSynchronization: function(fromElement, horizScrollElement, vertScrollElement) {
      this.removeScrollSynchronization(horizScrollElement);
      this.removeScrollSynchronization(vertScrollElement);

      this._syncScroll = this.getOnScrollFunction(
          horizScrollElement,vertScrollElement,fromElement);
      this._reverseVertSyncScroll =
          this.getOnScrollFunction(null, fromElement, vertScrollElement);
      this._syncScroll();
      curam.util.connect(vertScrollElement,
          "onscroll", this._reverseVertSyncScroll);
      curam.util.connect(fromElement, "onscroll", this._syncScroll);
    },

    // removes the scroll synchronization for an element
    removeScrollSynchronization: function(toElement) {
      if (toElement._syncTo != null) {
        toElement.onscroll = null;
      }
      toElement._syncScroll = null;
    },

    // This is a function that returns a function that is used
    // in the event listener
    getOnScrollFunction: function(hElement,vElement,fElement) {
      var thisMatrix = this;
      if(vElement && hElement){
        return function (e) {
          thisMatrix.checkRedraw(fElement.scrollTop);
          hElement.scrollLeft = fElement.scrollLeft;
          vElement.scrollTop = fElement.scrollTop;
        };
      } else {
        return function (e) {
          thisMatrix.checkRedraw(fElement.scrollTop);
          vElement.scrollTop = fElement.scrollTop;
        };
      }
    },

    //Add a listener to the form element that will prevent it from being
    //submitted if there is an error in the form.
    _initForm: function() {
      var thisMatrix = this;

      curam.util.connect(this.form, "onsubmit", function(e) {
        try {
          thisMatrix.contradictionValidator.inSave = true;
          if(thisMatrix.isValidationActive() ||
             !thisMatrix.answerValidator.refreshValidation() ||
            (thisMatrix.refreshCombinationValidators(true) ||
              thisMatrix.isValidationActive())) {
            dojo.stopEvent(e);
            thisMatrix.contradictionValidator.inSave = false;
            return false;
          }

          thisMatrix.updateQuestionOrder();
          thisMatrix.updateOutcomeOrder();
          thisMatrix.deleteSyncToken();
          thisMatrix._setFormNames();
        } catch (ex) {
          curam.debug.log(bundle.getProperty("curam.matrix.msg"), ex);
          dojo.stopEvent(e);
          return false;
        }
        e.target.submit();
        return false;
      });
    },


    _setFormNames: function() {
      var inputs = curam.matrix.Constants.container.node.parentNode.getElementsByTagName("input");

      if(!inputs || inputs.length == 0) {
        return;
      }

      for(var count = 0; count < inputs.length; count++) {
        inputs[count].setAttribute('name', inputs[count].getAttribute('id'));
      }
    },

    //This method will be taken out when issues with the Synchronizer token
    //are resolved in Internet Explorer
    deleteSyncToken: function() {
      var syncToken = dojo.byId('__o3synch');
      if(syncToken) {
        syncToken.parentNode.removeChild(syncToken);
      }
    },

    addLazyWidget: function(widget, subset) {
      if(!subset){subset="default";}
      if(!this.lazyWidgets) {this.lazyWidgets = {};}
      if(!this.lazyWidgets[subset]){this.lazyWidgets[subset] = [];}
      var arr = this.lazyWidgets[subset];
      arr[arr.length] = widget;
    },

    createLazyWidgets: function(subset) {
      if(!subset){subset="default";}
      if(!this.lazyWidgets[subset] || this.lazyWidgets[subset].length < 1) {
        return false;
      }
      var arr = this.lazyWidgets[subset];

      for(var count = 0; count < arr.length; count ++) {
        arr[count].createWidget();
      }
      this.lazyWidgets[subset] = [];
      this.initHighlighters();
      return true;
    },

    //Initializes listeners that, when triggered, cause rows and columns to
    //be highlighted
    initHighlighters: function(initPriority, initScore) {
      var _this = this;
      var combMenu = dijit.byId("CombinationOptions");
      var outMenu = dijit.byId("OutcomeOptions");

      //Only highlight rows or columns if validation is not active.
      var chk = function(callback) {
        return function(e){
          if(_this.isValidationActive()){return;}
          setTimeout(callback, 50);
        };
      };

      var listeners = {
        combOpen: chk(function(){_this.highlightCombination(combMenu.combinationId, true);}),
        combClose: function(){_this.highlightCombination(combMenu.combinationId, false);},
        outOpen: chk(function(){_this.highlightOutcome(activeMenuID, true);}),
        outClose: function(){_this.highlightOutcome(activeMenuID, false);},
        quesOpen: chk(function(){_this.highlightQuestion(activeMenuID, true);}),
        quesClose: function(){_this.highlightQuestion(activeMenuID, false);},
        ansOpen: chk(function(){_this.highlightAnswer(activeMenuID, true);}),
        ansClose: function(){_this.highlightAnswer(activeMenuID, false);},
        priOpen: chk(function(){_this.highlightPriority(true);}),
        priClose: function(){_this.highlightPriority(false);},
        scrOpen: chk(function(){_this.highlightScore(true);}),
        scrClose: function(){_this.highlightScore(false);}
      };

      var openFn = "onOpen";
      var closeFn = "onClose";
      if(!this._highlightersCreated){

        //Set up the combination listeners
        dojo.connect(combMenu, openFn, listeners, "combOpen");
        dojo.connect(combMenu, closeFn,listeners, "combClose");

        //Set up the outcome and contradiction listeners
        dojo.connect(outMenu, openFn, listeners, "outOpen");
        dojo.connect(outMenu, closeFn,listeners, "outClose");

        //Set up the question listeners
        var qMenu = dijit.byId("QuestionOptions");
        dojo.connect(qMenu, openFn, listeners, "quesOpen");
        dojo.connect(qMenu, closeFn, listeners, "quesClose");

        //Set up the answer listeners
        var aMenu = dijit.byId("AnswerOptions");
        dojo.connect(aMenu, openFn, listeners, "ansOpen");
        dojo.connect(aMenu, closeFn, listeners, "ansClose");
        this._highlightersCreated = true;
      }
      if(!this._highlighterScoreCreated && initScore) {
        //Set up the score listeners
        var sMenu = dijit.byId("ScoreOptions");
        dojo.connect(sMenu, openFn, listeners, "scrOpen");
        dojo.connect(sMenu, closeFn, listeners, "scrClose");
        this._highlighterScoreCreated = true;
      }
      if(!this._highlighterPriCreated && initPriority) {
        //Set up the priority listeners
        var pMenu = dijit.byId("PriorityOptions");
        dojo.connect(pMenu, openFn, listeners, "priOpen");
        dojo.connect(pMenu, closeFn, listeners, "priClose");
        this._highlighterPriCreated = true;
      }
    },

    highlightPriority: function(addClass) {
      this.highlightSingleColumn(addClass, "priorityGroup");
    },
    highlightScore: function(addClass) {
      this.highlightSingleColumn(addClass, "scoreGroup");
    },
    highlightCombination: function(combId, addClass) {
      var inputs;
      if (combId == 'column-id-contr' || combId.indexOf('contr-cell') == 0) {
        inputs = this._highlightedComb && !addClass ?
                 this._highlightedComb : this.getContradictionColInputs(combId);
      } else {
        var parts = curam.matrix.util.safeSplit(combId, "-");
        var outId = parts[1], colId = parts[5];
        inputs = this._highlightedComb && !addClass ?
                 this._highlightedComb : this.getOutcomeColInputs(outId, colId);
      }
      this.highlightNodes(inputs, addClass,function(node){return node.parentNode;});
      this._highlightedComb = addClass ? inputs : null;
    },

    highlightSingleColumn: function(addClass, elementName) {
      var qs = this.bottomRight.questions;
      var nodes = [];
      for (var count = 0; count < qs.count; count++) {
        if (qs.getObjectByIndex(count)[elementName]) {
          nodes.push(qs.getObjectByIndex(count)[elementName].node);
        }
      }
      this.highlightNodes(nodes, addClass);
    },

    highlightOutcome: function(outColId, addClass) {
      var qs = this.bottomRight.questions;
      var outId = outColId.replace("column-id-",""), qId;
      var nodes = [];

      if (outColId == 'column-id-contr' || outColId.indexOf('contr-cell') == 0) {
        this.highlightSingleColumn(addClass, "contradiction");
        return;
      }
      var transform = function(qId, outId) {
        return "out-" + outId + "-" + qId;
      };

      for(var count = 0; count < qs.count; count++) {
        qId = qs.getObjectByIndex(count).qId;
        nodes.push(transform(qId, outId));
      }
      this.highlightNodes(nodes, addClass);
    },

    highlightQuestion: function(activeMenuId, addClass) {
      var fn = addClass ? "addClass" : "removeClass";
      var qId = activeMenuId.replace("ql-", "");
      var nodes = [dojo.byId("qr-" + qId), dojo.byId("ques-"+qId), dojo.byId("ans-group-" + qId)];
      this.highlightNodes(nodes, addClass);
    },

    highlightAnswer: function(activeMenuId, addClass) {
      var nodes;

      if(!addClass && this._highlightedAnswer) {
        nodes = this._highlightedAnswer;
        this._highlightedAnswer = null;
      } else {

        var parts = curam.matrix.util.safeSplit(activeMenuId, "-");
        var qId = parts[1];
        var aId = parts[2];

        this._highlightedAnswer = nodes = [dojo.byId(activeMenuId),
              dojo.byId("pri-"+qId+"-"+aId),dojo.byId("scr-"+qId+"-"+aId)];

        var question = this.bottomRight.questions.getObjectByKey("qr-" + qId);

        var contr = question.contradiction;
        if(contr) {
          var kids = contr.rows.getObjectByKey("contr-row-"+qId+"-"+aId).node.childNodes;
          for(var count = 0; count < kids.length; count++){
            nodes.push(kids.item(count));
          }
        }
        var outGrp = question.outcomeGroup;
        var endsWith = cm.endsWith;
        var safeSplit = curam.matrix.util.safeSplit;
        if(outGrp) {
          var rows, key, grpKey, outId, inputCell;
          for(var gCount = 0; gCount < outGrp.count; gCount++) {
            grpKey = outGrp.getKeyByIndex(gCount);
            outId = safeSplit(grpKey, "-")[1];
            inputCell = outGrp.getObjectByKey(grpKey).rows
                .getObjectByKey("out-"+outId+"-row-"+qId+"-"+aId);
            nodes.push(inputCell.node);
          }
        }
      }
      this.highlightNodes(nodes, addClass);
    },

    highlightNodes: function(inputs, addClass, transformer) {
      var fn = addClass ? "addClass" : "removeClass";
      if(!transformer){transformer = function(node){return node;};}

      for(var count = 0; count < inputs.length; count++) {
        if(!inputs[count]){continue;}
        dojo[fn](transformer(inputs[count]), "highlighted");
      }
      if(!addClass){
        var _this = this;
        setTimeout(function(){_this.refreshScrollSync();}, 10);
      }
    },

    disableInputs: function(input1, input2, type) {
      var ac = dojo.addClass;
      ac(curam.matrix.Constants.container.node, "matrix-container-validating");

      if(!type) {
        type = "string";
      }

      var nodes;

      switch(type) {
        case "string":
        case "numeric":
        case "codetable":
          nodes = [dojo.byId(input1).parentNode];
          if(input2) {
            nodes[1] = dojo.byId(input2).parentNode;
          }
          break;
        case "combination":
          var val = this.getActiveValidator();
          if(!val) {
            break;
          }
          nodes = [];
          for(var count = 0; count < val.state.allowableFields.length; count++) {
            nodes.push(val.state.allowableFields[count]);
          }
          break;
      }

      if(nodes) {
        for(var count = 0; count < nodes.length; count ++ ) {
          ac(nodes[count], "inputValidating");
        }
        this.validatingNodes = nodes;
      }
      dojo.publish("/disableMenuItems");
    },

    enableInputs: function() {
      dojo.removeClass(curam.matrix.Constants.container.node, "matrix-container-validating");

      if(this.validatingNodes) {
        for(var count = 0; count < this.validatingNodes.length; count++) {
          dojo.removeClass(this.validatingNodes[count], "inputValidating");
        }
      }
      dojo.publish("/enableInput");
      dojo.publish("/enableMenuItems");
    },

    //Returns the number represented by "num", making sure that it is between
    //the minimum and maximum ranges set.
    trunc: function(lower, upper, num) {
      return Math.min(upper, Math.max(lower, num));
    },

    trapMatrixFocus: function() {
      //add an onfocus listener to the first answer in the first question,
      //in case the user tries to tab into the matrix from outside the form.
      var questions = this.bottomLeft.bottomLeftMain.questions;
      var question = questions.getObjectByIndex(0);

      var firstInput;
      var qCount = 1;

      while(question && !firstInput) {
        for(var count = 1;
            !firstInput && count <= question.ansGroup.answers.count; count ++) {
          var answer = question.getAnswer(count);
          if(answer.input && answer.input.getAttribute("type") != "hidden") {
            firstInput = answer.input;
          }
        }
        question = this.bottomLeft.bottomLeftMain.questions
                          .getObjectByIndex(qCount++);
      }

      if(!firstInput) {
        //If we couldn't find a question with a valid question input, then all
        //questions are Booleans. The first input is therefore the first
        //Priority, Score, Contradiction or Outcome, in that order.
        question = curam.matrix.Constants.container.matrix.bottomRight.questions.getObjectByIndex(0);
        firstInput = question.node.firstChild.getElementsByTagName("input")[0];
      }

      if(firstInput && !firstInput['focusListenerAdded']) {

        curam.util.connect(firstInput, 'onfocus', this._refocusListener);
        //Mark the input as already having had the focus listener added.
        firstInput['focusListenerAdded'] = true;
      }
    },

    isValidationActive: function() {
      if(this.answerValidator.isWarningActive()
              || this.answerValidator.isErrorActive()
              || this.priorityValidator.isWarningActive()
              || this.priorityValidator.isErrorActive()) {
        return this.HORIZ_VALIDATION;
      } else if(this.contradictionValidator.isWarningActive()
              || this.contradictionValidator.isErrorActive()
              || this.outcomeValidator.isWarningActive()
              || this.outcomeValidator.isErrorActive()){
        return this.VERT_VALIDATION;
      }
      return false;
    },

    setValidationActive: function() {
      dojo.publish("/disableMenuItems");
    },

    setValidationInactive: function() {
      dojo.publish("/enableMenuItems");
      this.enableInputs();
    },

    isInputPartOfValidation: function(input) {
      for(var count = 0; count < this.validators.length; count++) {
        if(this.validators[count].isInputPartOfValidation(input)) {
          return true;
        }
      }
      return false;
    },

    refocusValidatingInput: function() {
      var val = this.getActiveValidator();
      if(val) {
        val.refocus();
      }
    },

    getActiveValidator: function() {
      for(var count = 0; count < this.validators.length; count++) {
        if(this.validators[count].isErrorActive()) {
          return this.validators[count];
        }
      }
      return null;
    },

    //checks when an input receives focus whether validation is active, and if
    //so, send the focus back to the validating inputs.
    checkFocus: function(args) {
      var e = dojo.fixEvent(args.length > 0 ? args[0] : null);
      if(this.isValidationActive() && !this.isInputPartOfValidation(e.target)) {
        dojo.stopEvent(e);
        this.refocusValidatingInput();
      }
    },

    //
    // Dynamic Matrix operations *********************
    //

    // Open add questions popup window passing in the existing question ids in order to
    // filter out questions that have already been added to the Matrix.
    // TODO: Only open the window if there is not an active validation.
    openAddQuestionsPopupWindow: function(page, id, width, height) {
      if(!this.emptyWarningActive && this.isValidationActive()) {
        return;
      }
      //Open in a modal dialog, if possible. This function is in
      //omega3-utils.js
      var sc = new curam.util.ScreenContext('MODAL');
      var url = page + 'Page.do?matrixID=' + id + '&existingQuestionIds='
                       + curam.matrix.Constants.container.existingQuestionIds
                       + "&" + sc.toRequestString();
      curam.util.openModalDialog({href:url},"width=" + width + ",height=" + height);
    },

    // Open add outcomes popup window passing in the existing outcome ids in order to
    // filter out outcomes that have already been added to the Matrix.
    // Only open the window if there is not an active validation.
    openAddOutomesPopupWindow: function(page, id, width, height) {
      if(this.isValidationActive()) {
        return;
      }
      var sc = new curam.util.ScreenContext('MODAL');
      var url = page + 'Page.do?matrixID=' + id
                + '&existingOutcomeIds=' + curam.matrix.Constants.container.existingOutcomeIds
                + "&" + sc.toRequestString();
      curam.util.openModalDialog({href:url},"width=" + width + ",height=" + height);
    },

    // window.setTimeout() was used as there was a slight bug with calling the method directly.
    addQuestionsFromPopup: function() {
      if(this.isValidationActive()) {
        return;
      }
      window.setTimeout("curam.matrix.Constants.container.matrix.addNewQuestions()", 0);
    },


    // Loop through all the questions and add them one by one. The addQuestion method
    // returns the height of the new question added. When all questions are added
    // reset the height of the divs.
    // Again create a new string buffer to hold all the css details and add it to the
    // document after adding all the elements
    addNewQuestions: function() {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();

      var totalHeightNewQuestions = 0;
      var questions = dojo.fromJson(newQuestions);
      for (var i=0; i<questions.length; i++) {
        totalHeightNewQuestions += c.matrix.addQuestion(questions[i]);
      }

      // reset dimensions.
      var newHeight = this.bottomLeft.bottomLeftMain.setDimensions();
      this.bottomLeft.setHeight(newHeight);
      c.matrix.setHeight();
      c.setHeight();
      this.bottomLeft.bottomLeftMain.resyncNumbers();

      //Mark the column validators as being in an invalid state, so that the
      //next time the user clicks on a checkbox they will completely refresh
      //themselves.  This is essentially a lazy way of refreshing their bitsets
      //so the user can add multiple answers without having the performance
      //hit of a full refresh after each one.
      this.outcomeValidator.requiresRefresh = true;
      this.contradictionValidator.requiresRefresh = true;

      c.addCSS();
      this.clearCopiedColumn();
      this.checkEmpty();
      this.setRequiresRedraw();
    },

    //This marks that the screen must be forced to redraw. This fixes a rendering
    //bug in Internet Explorer versions 6 and 7, so only do it if one of those
    //browsers is being used.
    setRequiresRedraw: function() {
      if(!dojo.isIE){return;}
      this._minScroll = this._maxScroll = this.bottomLeft.bottomLeftMain.node.scrollTop;
    },

    //This forces Internet Explorer to redraw it's window. It is necessary
    //because if nodes are added and are not immediately visible, sometimes
    //IE does not apply the dynamic CSS styles to them.
    //A timeout is used to force the redraw so that it is only done when the
    //user has stopped scrolling.
    checkRedraw: function(pos) {
      if(this._minScroll == null || typeof(this._minScroll) == "undefined"){return;}

      if(pos >= this._minScroll && pos <= this._maxScroll){return;}

      this._minScroll = Math.min(this._minScroll, pos);
      this._maxScroll = Math.max(this._maxScroll, pos);

      if(this.redrawTimeout){
        clearTimeout(this.redrawTimeout);
      }
      var _this = this;
      this.redrawTimeout = setTimeout(function(){
        _this.redrawTimeout = null;
        curam.util.insertCssText(" ", "_container_stylesheet_");
      }, 200);
    },

    // Add a new question and return the height.
    addQuestion: function(questionDetails) {
      // QuestionID|Type|Label
      var question = questionDetails.split('|', [3]);

      //TODO: make this faster, shouldn't have to split and loop everything.
      // very slow where there would be a lot of questions.
      // Check that we are not adding an id that already exists.
      // This should never happen as the popup page to add
      // new questions should only contain questions that do not
      // currently exist in the matrix.
      if(curam.matrix.Constants.container.existingQuestionIdsMap[question[0]]) {
        return;
      }

      var newQuestionHeight = this.bottomLeft.bottomLeftMain.addQuestion(question);
      this.bottomRight.addQuestion(question);
      this.updateQuestionOrder();

      var qCount = this.bottomLeft.bottomLeftMain.questions.count;
      if(qCount == 1) {
         this.bottomRight.addButtonClassToFirstRow();
      } else {
        this.fixIEBorder();
      }

      return newQuestionHeight;
    },
    
    // Add a new answer to a question.
    addAnswer: function(id) {
      curam.matrix.Constants.container.cssText = new curam.StringBuffer();
    
      // Add the answer to the question on the left.
      var ansHeight = this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id)
                       .addAnswer();
      // Add the required div on the right, priority, score, contradiction row,
      // outcome rows where they exist.
      this.bottomRight.questions.getObjectByKey(id.replace('ql-', 'qr-')).addAnswer();
    
      // re-set dimensions.
      this.bottomLeft.bottomLeftMain.setHeight(
                                         this.bottomLeft.bottomLeftMain.height
                                         + ansHeight);
      this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height + ansHeight);
      this.setHeight();
    
      //Mark the column validators as being in an invalid state, so that the
      //next time the user clicks on a checkbox they will completely refresh
      //themselves.  This is essentially a lazy way of refreshing their bitsets
      //so the user can add multiple answers without having the performance
      //hit of a full refresh after each one.
      this.outcomeValidator.requiresRefresh = true;
      this.contradictionValidator.requiresRefresh = true;
    
      curam.matrix.Constants.container.setHeight();
    
      this.clearCopiedColumn();
      curam.matrix.Constants.container.addCSS();
    },
    
    //Returns the index of a cell in a contradiction from an ID like
    // "contr-cell-Q2-1-3", where '3' is the cell index
    getCellIndexFromContradictionCellId: function(id) {
      return Number(curam.matrix.util.safeSplit(id, "-")[4]);
    },
    
    //translate an answer ID into a question ID.
    getQuestionIdFromAnswerId: function(ansId) {
      var qId = curam.matrix.util.safeSplit(ansId, "-")[1];
    
      return qId;
    },
    
    // Return x from __o3dmx.MODIFY.dtls$matrixResult.z.s.s.x.y
    // where x is a questionId, y is anumeric value and z has the value
    // 'value' 'min' or 'max'.
    getQuestionIdFromAnswerInputId: function(id) {
      var ids = id.split(".");
      return ids[ids.length -2];
    },
    
    // Return y from __o3dmx.MODIFY.dtls$matrixResult.z.s.s.x.y
    // where x is a questionId, y is anumeric value and z has the value
    // 'value' 'min' or 'max'.
    getAnswerIdFromAnswerInputId: function (id) {
      var ids = id.split(".");
      return ids[ids.length -1];
    },
    
    //return a Question given its answer ID.
    getQuestionFromAnswerId: function(ansId) {
      return this.getQuestion(this.getQuestionIdFromAnswerId(ansId));
    },
    
    //return a question given its ID.
    getQuestion: function(id) {
      if(!this.bottomLeft){
        return null;
      }
      return this.bottomLeft.bottomLeftMain.getQuestion(id);
    },
    
    changeNumericAnswer: function(id, answerType) {
      var answer = this.getQuestionFromAnswerId(id).getAnswerById(id);
      if(answerType == "minmax")
      {
        answer.createMinMax();
      } else
      {
        answer.createSpecificValue();
      }
    },
    
    // Add a new priority column if one does not exist.
    addPriorityColumn: function() {
      if(this.isValidationActive()) {
         return;
       }
      if (!this.priorityExists) {
        var c = curam.matrix.Constants.container;
        c.cssText = new curam.StringBuffer();
    
        // create elements.
        this.topRight.addPriorityColumn();
        this.bottomRight.addPriorityColumn();
        this.priorityExists = true;
    
        //reset dimensions
        c.matrix.setWidth();
        c.setWidth();
        c.addCSS();
      }
    },
    
    
    // Add a new score column if one does not exist.
    addScoreColumn: function() {
      if(this.isValidationActive()) {
        return;
      }
      if (!this.scoreExists) {
        var c = curam.matrix.Constants.container;
        c.cssText = new curam.StringBuffer();
    
        // create elements.
        this.topRight.addScoreColumn();
        this.bottomRight.addScoreColumn();
        this.scoreExists = true;
    
        // reset the dimensions.
        c.matrix.setWidth();
        c.setWidth();
        c.addCSS();
      }
    },
    
    
    // Add a contradiction column if one does not exist
    addContradictionColumn: function() {
      if (!this.contradictionsExist) {
        var c = curam.matrix.Constants.container;
        if(this.bottomLeft.bottomLeftMain.questions.count < 2) {
          alert(this.messages.contradiction.tooFewQuestions);
          return;
        }
        c.cssText = new curam.StringBuffer();
    
        // Add elements and re-set the indicator to true.
        this.topRight.addContradictionColumn();
        this.bottomRight.addContradictionColumn();
        this.contradictionsExist = true;
    
        // re set dimensions
        this.topRight.topRightTop.contradictionCol.setWidth(curam.matrix.Constants.COMBINATION_CELL_WIDTH);
        this.topRight.setWidths(curam.matrix.Constants.container.matrix.topRight.topRightTop
                                 .contradictionCol.widthWithBorder);
        this.bottomRight.setWidth();
        c.matrix.setWidth();
        c.setWidth();
    
        c.addCSS();
    
        this.validators[2] = this.contradictionValidator =
            new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,
            this.messages.contradiction);
    
        this.refreshContradictionValidator(false, 1);
    
        this.setRequiresRedraw();
      }
    },
    
    refreshContradictionValidator: function(force, expectedDiff) {
      if(arguments.length < 2) {
        expectedDiff = this.contradictionValidator.bitsets.length;
      }
    
      if(force) {
        this.contradictionValidator.requiresRefresh = true;
      }
    
      this.contradictionValidator.refreshValidation();
    },
    
    //returns an Outcome. Expects an ID of the form "out-O1-cell-Q1-2-5"
    //where 'Q1' is the ID of the question, the first '2' is the index of the
    //Answer and '5' is the outcome ID
    getOutcome: function(id) {
      var ids = curam.matrix.util.safeSplit(id, "-");
    
      //The outcomeId is "out-O" + outcomeIndex + "-" + questionId
      var outcomeId = "out-" + ids[1] + "-"+ids[3];
      var group = this.bottomRight.questions.getObjectByIndex(0).outcomeGroup;
      var outcome = group.getObjectByKey(outcomeId);
    
      return outcome;
    },
    
    // Add oucomes returned from the popup window.
    addOutcomesFromPopup: function(outcomes) {
      if(!outcomes || outcomes.length < 1) {
        return;
      }
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
    
      // Add outcome columns one by one and get the total width of the columns added.
      var totalNewOutcomesWidth = 0;
      for (var i=0; i<outcomes.length; i++) {
        totalNewOutcomesWidth += this.addOutcomeColumn(outcomes[i]);
      }
    
      // reset dimensions
      this.topRight.setWidths(totalNewOutcomesWidth);
      this.bottomRight.setWidth();
      this.setWidth();
      c.setWidth();
      c.addCSS();
      this.setRequiresRedraw();
    },
    
    // Add an outcome column. First add the column heading then the
    // cells underneath.
    // param outcomeDetails: The outcome id and outcome label delimited
    //                       by |.
    addOutcomeColumn: function(outcomeDetails) {
      var outcomeDetails = outcomeDetails.split('|', [2]);
    
      //TODO: make this faster, shouldn't have to split and loop everything.
      // very slow where there would be a lot of questions. use regExp
      // or String.search();
      // Check that we are not adding an id that already exists.
      // This should never happen as the popup page to add
      // new questions should only contain outcomes that do not
      // currently exist in the matrix.
      var outcomeIDs = curam.matrix.Constants.container.existingOutcomeIds.split('|');
      for (var i=0; i<outcomeIDs.length; i++) {
        if (outcomeIDs[i] == outcomeDetails[0]) {
          return;
        }
      }
    
      // reset dimensions and return the outcome column width.
      var outcomeWidth = this.topRight.addOutcomeColumn(outcomeDetails);
      this.bottomRight.addOutcomeColumn(outcomeDetails);
    
      this.outcomesExist = true;
      this.setRequiresRedraw();
    
      return outcomeWidth;
    },
    
    
    // Add a combination column to an outcome or the contradictions.
    // Use the id passed in to determine if it is a contradiction or
    // outcome (and which outcome).
    // param id: refers to the cell id of the first cell in the combination column.
    addCombination: function(id, pasteCombination) {
      if (id == 'column-id-contr' || id.indexOf('contr-cell') == 0) {
        this.addContradictionCombination(pasteCombination);
      } else {
        if(id.indexOf('column-id-') < 0) {
          var idParts = curam.matrix.util.safeSplit(id, '-');
          id = 'column-id-' + idParts[1];
        }
        this.addOutcomeCombination(id, pasteCombination);
      }
      var _this = this;
      //Refresh the scroll synchronization between the top right
      //and bottom right divs, as the top one could resize when the number of
      //combinations change.  A timeout is required as IE resets the scroll
      //of the top div if this change is made immediately.
      setTimeout(function(){
        _this.refreshScrollSync();
        _this.setRequiresRedraw();
      }, 10);
    
    },
    
    //Mark a contradiction value as having been set or unset
    setContradictionValue: function(column, checkBox, event, qId) {
    
      this.contradictionValidator.setContradictionValue
                          (column - 1, checkBox, event, qId);
    },
    
    setOutcomeValue: function(outcomeID, column, checkBox, event) {
      this.outcomeValidator.setOutcomeValue(outcomeID, column - 1, checkBox, event);
    },
    
    getContradictionColInputs: function(parentId, colId) {
      var inputs = [];
      var questions = this.bottomRight.questions;
    
      //Either the parentId or the colId parameters are specified.
      var srcColumn = colId ? colId : Number(curam.matrix.util.safeSplit(parentId, '-')[4]);
      var srcCell, curRow, curQ, cellId;
    
      for (var qCount=0; qCount<questions.count; qCount++) {
        curQ = questions.getObjectByIndex(qCount);
        // loop all rows in each question.
        for (var rowCount=0; rowCount<curQ.contradiction.rows.count; rowCount++) {
          curRow = curQ.contradiction.rows.getObjectByIndex(rowCount);
          cellId = curRow.node.id.replace('-row-', '-cell-') + '-' + srcColumn;
    
          inputs.push(curRow.cells.getObjectByKey(cellId).input);
        }
      }
      return inputs;
    },
    
    getOutcomeColInputs: function(outId, colId) {
      var questions = this.bottomRight.questions;
      var curRow, curQ, cellId;
      var inputs = [];
    
      var curQ, outGroupId, outcome;
      for (var qCount=0; qCount<questions.count; qCount++) {
        curQ = questions.getObjectByIndex(qCount);
        outGroupId = 'out-'+outId+'-'+curQ.qId;
        outcome = curQ.outcomeGroup.getObjectByKey(outGroupId);
    
        for (var rowCount=0; rowCount<outcome.rows.count; rowCount++) {
          curRow = outcome.rows.getObjectByIndex(rowCount);
          cellId = curRow.node.id.replace('-row-', '-cell-') + '-' + colId;
          inputs.push(curRow.cells.getObjectByKey(cellId).input);
        }
      }
      return inputs;
    },
    
    copyCombination: function(id) {
      if (id == 'column-id-contr' || id.indexOf('contr-cell') == 0) {
        this.copyContradictionColumn();
        this._copySrc = "contradiction";
      } else {
        this.copyOutcomeColumn();
      }
    },
    
    copyContradictionColumn: function() {
      this.clearCopiedColumn();
      var parentCellId = dijit.byId("CombinationOptions")
                                  .explodeSrc.parentNode.id;
      var inputs = this.getContradictionColInputs(parentCellId);
      if(!inputs || inputs.length < 1){return;}
      this.copyFromInputs(inputs);
    },
    
    copyOutcomeColumn: function() {
      this.clearCopiedColumn();
      var parentCellId = dijit.byId("CombinationOptions")
                                  .explodeSrc.parentNode.id;
      var idParts = curam.matrix.util.safeSplit(parentCellId, '-');
      var outId = idParts[1];
      var colId = idParts[5];
    
      this._copySrc = outId;
      this.copyFromInputs(this.getOutcomeColInputs(idParts[1], idParts[5]));
    },
    
    clearCopiedColumn: function(){
      this._outcomeCopy = null;
    },
    
    hasCopiedCombination: function() {
      return (this._outcomeCopy != null && this._outcomeCopy.length > 0);
    },
    
    copyFromInputs: function(inputs) {
      var arr = this._outcomeCopy = [];
      for(var count = 0; count < inputs.length; count++){
        arr.push(inputs[count].checked);
      }
    },
    
    copyToInputs: function(inputs) {
      //If the number of copied inputs is not equal to the number of
      //destination inputs, alert the user, and finish
      if(!inputs || (inputs.length != this._outcomeCopy.length)) {
        alert(this.messages.outcome.copyErrorMsg);
        return;
      }
    
      for(var count = 0; count < inputs.length; count++) {
        inputs[count].checked = this._outcomeCopy[count];
      }
    },
    
    // Add a contradiction combination to the contradiction column.
    addContradictionCombination: function(doPaste) {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
      var msg, colId;
    
      // Add elements
      colId = this.bottomRight.addContradictionCombination(doPaste);
      var topRightTop = this.topRight.topRightTop;
      // Get the ContradictionColumn. This is an object that represents the
      // Contradiction Column.
      var contrCol = topRightTop.contradictionCol;
    
      // Create hidden input fields to represent the combination column id and messages.
      var input = topRightTop.addContrCombIdInput(contrCol.combinationCount);
      contrCol.columns.add(input.id, input);
      contrCol.node.appendChild(input);
      for (var i = 0; i < c.locales.length; i++) {
        if (c.locales[i] == "") { continue; }
        msg = topRightTop.addContrCombMessageInput(contrCol.combinationCount,
                                                    c.locales[i], '');
        contrCol.node.appendChild(msg);
      }
    
      // Re-set dimensions
      contrCol.setWidth(contrCol.widthWithoutBorder + curam.matrix.Constants.COMBINATION_CELL_WIDTH
                          + curam.matrix.Constants.MATRIX_BORDER_SIZE);
      this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH + curam.matrix.Constants.MATRIX_BORDER_SIZE);
      this.bottomRight.setWidth();
      this.setWidth();
      c.setWidth();
    
      c.addCSS();
    
      if(doPaste && this._outcomeCopy) {
        this.copyToInputs(this.getContradictionColInputs(null, colId));
      }
      if(this._copySrc != "contradiction") {
        this.outcomeValidator.refreshOutcome(this._copySrc);
      }
      this.refreshContradictionValidator(true, 1);
    },
    
    // Add an outcome combination to an outcome column.
    // param: id refers to the column id of the outcome
    //        for example: column-id-O1 where O1 is the Outcome Id in the xml sent from the server.
    addOutcomeCombination: function(id, doPaste) {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
    
      var outId = id.replace('column-id-', '');
      // Get the OutcomeColumn object that represents the outcome column.
      var outCol = c.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id);
    
      // Add the elements including the input field to represent the outcome combination column id.
      var colId = this.bottomRight.addOutcomeCombination(outCol, id);
      var input = this.topRight.topRightTop.addOutCombIdInput(outId,
                                                      outCol.combinationCount);
      outCol.columns.add(input.id, input);
      outCol.node.appendChild(input);
    
      // reset dimensions.
      outCol.setWidth(outId, outCol.widthWithoutBorder + curam.matrix.Constants.COMBINATION_CELL_WIDTH
                       + curam.matrix.Constants.MATRIX_BORDER_SIZE);
      this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH + curam.matrix.Constants.MATRIX_BORDER_SIZE);
      this.bottomRight.setWidth();
      this.setWidth();
      c.setWidth();
      c.addCSS();
    
      if(doPaste) {
        this.copyToInputs(this.getOutcomeColInputs(outId, colId));
      }
      if(this._copySrc == "contradiction") {
        this.refreshContradictionValidator(true, 1);
      }
    
      this.outcomeValidator.refreshOutcome(outId);
    },
    
    updateQuestionOrder: function() {
      var input = dojo.byId(this.inputPrefix + "questionOrder");
      input.value = curam.matrix.Constants.container.existingQuestionIds;
    },
    
    updateOutcomeOrder: function() {
      var input = dojo.byId(this.inputPrefix + "outcomeOrder");
      input.value = curam.matrix.Constants.container.existingOutcomeIds;
    },
    
    // Delete a question.
    deleteQuestion: function(id) {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
    
      var firstQ = false;
      var qRightId = id.replace('ql-', 'qr-');
      var qLeft = this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id);
    
      if(!qLeft) {
        return false;
      }
    
      var qHeight = qLeft.height;
      var qId = qLeft.qId;
    
      //Store the list of deleted questions in a hidden input field.
      var delQuestionsInput = dojo.byId(this.inputPrefix + "deletedQuestions");
    
      delQuestionsInput.value = delQuestionsInput. value +
                               (delQuestionsInput.value.length > 0 ?"|" : "") + qId;
    
      // Determine if the question we are deleting is the first question in the matrix.
      // If it is the buttons on the combination cells will be removed. We need to
      // add in the buttons to the new first question in the matrix.
      if (this.bottomRight.questions.getIndexByKey(qRightId) == 0){ firstQ = true;}
    
      // Remove the nodes from the dom
      dojo.destroy(id);
      dojo.destroy(qRightId);
    
      // Remove the question left and questions right from the bottomLeftMain and
      // bottomRight Lists of questions.
      this.bottomLeft.bottomLeftMain.questions.removeByKey(id);
      this.bottomRight.questions.removeByKey(qRightId);
    
      // As mentioned, if we've deleted the first question add buttons to the
      // new first question first row cells.
      if (firstQ) {
        this.bottomRight.addButtonClassToFirstRow();
      }
    
      // remove the question from the existingQuestionIds string.
      c.removeQuestionId(qId);
    
      this.bottomLeft.bottomLeftMain.resyncNumbers();
    
      this.fixIEBorder();
    
      // reset dimensions.
      var newHeight = this.bottomLeft.bottomLeftMain.setDimensions();
      this.bottomLeft.setHeight(newHeight);
    
      this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height-qHeight);
      c.matrix.setHeight();
      c.setHeight();
    
      this.clearCopiedColumn();
      c.addCSS();
    
      this.updateQuestionOrder();
    
      if(this.bottomLeft.bottomLeftMain.questions.count < 2) {
        this.deleteContradictionColumn();
      }
    
      this.refreshCombinationValidators(true);
      this.checkEmpty();
    },
    
    checkEmpty: function() {
      if(this.bottomLeft.bottomLeftMain.questions.count > 0) {
        if(this.emptyWarningActive) {
          this.emptyWarningActive = false;
          curam.matrix.Constants.container.deactivateValidation();
        } else if(!this.isValidationActive()){
          curam.matrix.Constants.container.hideValidation();
        }
        return;
      }
    
      var id = "newQs_btn_" + (new Date()).getTime();
      var html = this.messages.emptyMatrix + '<a href="#" id="' + id
                        + '">' + curam.matrix.Constants.container.i18nMsgs.addQuestions + '</a>';
    
      curam.matrix.Constants.container.activateWarning(html);
    
      curam.util.connect(dojo.byId(id), "onclick", function(e) {
        var onclick = dojo.byId('addQuestions').getAttribute("onclick");
    
        if(dojo.isString(onclick)) {
          dojo.eval(onclick);
        } else {
          onclick();
        }
      });
    
      this.emptyWarningActive = true;
    },
    
    //Refresh the Contradiction and Outcome validators, since their bitsets
    //are now invalid (this is called when a question or answer is deleted or
    //added.
    refreshCombinationValidators: function(force) {
      if(this.contradictionsExist) {
        this.refreshContradictionValidator(force, 0);
      }
    
      if(force) {
        this.outcomeValidator.requiresRefresh = true;
      }
    
      if(!this.contradictionsExist ||
           ( !this.contradictionValidator.isWarningActive() &&
             !this.contradictionValidator.isErrorActive())) {
        this.outcomeValidator.refreshValidation();
        this.refreshOutcomeValidations = false;
      } else {
        this.refreshOutcomeValidations = true;
      }
    },
    
    // Delete an answer from a question.
    deleteAnswer: function(id) {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
    
      var firstQ = false;
      var firstAns = false;
    
      var reqExp = /-.*/;
      var parts = curam.matrix.util.safeSplit(id, "-");
      var qId = parts[1];
      var ansId = parts[2];
      var qLeft = this.bottomLeft.bottomLeftMain.questions.getObjectByKey('ql-'+qId);
      var qRight = this.bottomRight.questions.getObjectByKey('qr-'+qId);
    
      if (this.bottomRight.questions.getIndexByKey('qr-'+qId) == 0){ firstQ = true;}
      if (qLeft.ansGroup.answers.getIndexByKey(id) == 0){ firstAns = true;}
    
      qLeft.deleteAnswer(firstAns, id);
      qRight.deleteAnswer(firstAns, ansId);
    
      if (firstQ && firstAns) { this.bottomRight.addButtonClassToFirstRow();}
    
      this.bottomLeft.bottomLeftMain.resyncNumbers();
    
      var newHeight = this.bottomLeft.bottomLeftMain.setDimensions();
      this.bottomLeft.setHeight(newHeight);
      c.matrix.setHeight();
      c.setHeight();
      this.clearCopiedColumn();
      c.addCSS();
    
      this.refreshCombinationValidators(true);
    },
    
    
    deletePriorityColumn: function() {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
      this.bottomRight.deletePriorityColumn();
      this.topRight.deletePriorityColumn();
      this.priorityExists = false;
      this.topRight.topRightTop.priorityWidgetCreated = false;
    
      this.topRight.setWidths(-c.priorityWidth);
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
      c.addCSS();
    },
    
    
    deleteScoreColumn: function() {
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
      this.bottomRight.deleteScoreColumn();
      this.topRight.deleteScoreColumn();
      this.scoreExists = false;
      this.topRight.topRightTop.scoreWidgetCreated = false;
    
      this.topRight.setWidths(-c.priorityWidth);
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
      c.addCSS();
    },
    
    
    deleteOutcome: function(id) {
      if (id == 'column-id-contr') {
        this.deleteContradictionColumn();
      } else {
        this.deleteOutcomeColumn(id);
      }
      this.setRequiresRedraw();
    },
    
    
    deleteContradictionColumn: function() {
      if(!this.topRight.topRightTop.contradictionCol) {
        return;
      }
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
      var width = this.topRight.topRightTop.contradictionCol.widthWithBorder;
    
      this.bottomRight.deleteContradictionColumn();
      this.topRight.deleteContradictionColumn();
      this.contradictionsExist = false;
    
      this.topRight.setWidths(-width);
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
    
      c.addCSS();
    
      this.contradictionValidator.deleteContradiction();
    },
    
    
    deleteOutcomeColumn: function(id) {
      var outId = id.replace('column-id-', '');
      var col = this.topRight.topRightTop.outcomeCols.
                                                getObjectByKey(id);
      if(!col) {
        return;
      }
      var c = curam.matrix.Constants.container;
      var width = col.widthWithBorder;
    
      //Store the list of deleted outcomes in a hidden input field.
      var delOutcomesInput = dojo.byId(this.inputPrefix + "deletedOutcomes");
      delOutcomesInput.value = delOutcomesInput. value +
                                  (delOutcomesInput.value.length > 0 ?
                                   "|" : "") + outId;
    
      //Remove the outcome from the list of starting outcomes, to ensure that
      //if it is added back in, it is marked as new.  This was requested by the
      //server team.
      var startOutcomesInput = dojo.byId(this.inputPrefix + "deletedOutcomes");
      if(startOutcomesInput.value.indexOf(outId) > -1) {
        var arr = startOutcomesInput.value.split('|');
        for(var count = 0; count < arr.length; count++) {
          if(arr[count] == outId) {
            arr.splice(count, 1);
            startOutcomesInput.value = arr.join('|');
            break;
          }
        }
      }
    
      c.cssText = new curam.StringBuffer();
      this.bottomRight.deleteOutcomeColumn(outId);
      this.topRight.deleteOutcomeColumn(id);
      if (this.topRight.topRightTop.outcomeCols.count == 0) {
        this.outcomesExist = false;
      }
      //TODO: add hiden field for deleted outcomes.
      c.existingOutcomeIds = c.existingOutcomeIds.replace(outId +
                                                                            '|','');
    
      this.topRight.setWidths(-width);
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
      c.addCSS();
    
      this.outcomeValidator.deleteOutcome(outId);
    
      var questions = this.bottomRight.questions;
      if(questions.count != 0) {
        if(questions.getObjectByIndex(0).outcomeGroup.count < 1) {
          this.outcomesExist = false;
        } else {
          this.outcomesExist = true;
        }
      }
    },
    
    deleteCombination: function(id) {
      if (id.indexOf('contr-cell-') != -1) {
        this.deleteContradictionCombination(id);
      } else {
        this.deleteOutcomeCombination(id);
      }
      var _this = this;
      //Refresh the scroll synchronization between the top right
      //and bottom right divs, as the top one could resize when the number of
      //combinations change.  A timeout is required as IE resets the scroll
      //of the top div if this change is made immediately.
      setTimeout(function(){_this.refreshScrollSync();}, 10);
    },
    
    
    deleteContradictionCombination: function(id) {
      // id e.g. = contr-cell-Q2-1-3
      var c = curam.matrix.Constants.container;
      c.cssText = new curam.StringBuffer();
    
      var contrCol = this.topRight.topRightTop.contradictionCol;
      var reqExp = /contr-cell-.*-.*-/;
      var cellId = id.replace(reqExp, '');
    
      var isLastCombColumn = this.bottomRight.checkIfLastContrCombColumn(id);
      this.bottomRight.deleteContradictionCombination(cellId, isLastCombColumn);
      contrCol.deleteCombIdAndMsgInputFields(cellId);
    
      contrCol.setWidth(contrCol.widthWithoutBorder -
                                      (curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
      this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
    
      c.addCSS();
      this.refreshContradictionValidator(true, -1);
    },
    
    deleteOutcomeCombination: function(id) {
      // e.g. id = out-O1-cell-Q2-1-1
      var c = curam.matrix.Constants.container;
    
      c.cssText = new curam.StringBuffer();
      var regExp = /-cell-.*-.*-.*/;
      var outId = id.replace('out-', '').replace(regExp, '');
      regExp = /out-.*-cell-.*-.*-/;
      var cellId = id.replace(regExp, '');
    
      //column-id-01
      var outCol = this.topRight.topRightTop.outcomeCols
                       .getObjectByKey('column-id-'+outId);
    
      var isLastCombColumn = this.bottomRight.checkIfLastOutCombColumn(outId, id);
      this.bottomRight.deleteOutcomeCombination(outId, cellId, isLastCombColumn);
      outCol.deleteCombIdInputFields(cellId);
      outCol.setWidth(outId, outCol.widthWithoutBorder
                                - (curam.matrix.Constants.COMBINATION_CELL_WIDTH + curam.matrix.Constants.MATRIX_BORDER_SIZE));
    
      this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
      this.bottomRight.setWidth();
      c.matrix.setWidth();
      c.setWidth();
    
      c.addCSS();
    
      this.outcomeValidator.deleteCombination(outId, Number(cellId) -1);
    },
    
    fixIEBorder: function() {
      if(!dojo.isIE){return;}
      /*
      Internet Explorer hides the bottom border on the first question
      The solution is to add a single cell of margin to the first row's bottom
      */
      var rpc = cm.replaceClass;
      var question = this.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
      if(!question){return;}
      var qId = question.qId;
    
      var leftNode = dojo.byId("ql-" + qId);
      rpc(leftNode, "ieMarginPlus", "ieMarginMinus");
      var rightNode = dojo.byId("qr-" + qId);
      if(rightNode) {
        rpc(rightNode, "ieMarginPlus", "ieMarginMinus");
      }
      leftNode = cm.nextSibling(leftNode, "div");
      if(leftNode){
        rpc(leftNode, "ieMarginMinus","ieMarginPlus");
      }
      rightNode = cm.nextSibling(rightNode, "div");
      if(rightNode){
        rpc(rightNode, "ieMarginMinus", "ieMarginPlus");
      }
    },
    
    addMessagesFromPopup: function (messages, combinationId) {
      var id = "";
      var input = null;
      for (var i = 0; i < messages.count; i++) {
        id = this.inputPrefix + "contrmsg." + combinationId + "."
                 + messages.getKeyByIndex(i);
        input = dojo.byId(id);
        if (input == null) {
          input = dojo.create("input", {
            id: id,
            name: id,
            type: "hidden"
          }, this.node);
        }
        input.value = messages.getObjectByIndex(i);
      }
    },
    
    //Returns the localised message for the given contradiction column,
    //if it exists.
    getContradictionMsg: function(combinationId, locale) {
      var input = dojo.byId(this.inputPrefix + "contrmsg." + combinationId
                             + "." + locale);
      if(input) {
        return input.value;
      }
      return null;
    },
    
    //Pops up a separate window where users can enter localised messages for
    //combination columns.
    addMessages: function (id) {
      var messages = new Array;
      var columnNum = curam.matrix.util.getCellIndexFromContradictionCellId(id);
      localeList = localeList.replace(" ", "");
      var locales = localeList.split(",");
      var currentFieldId = "";
      var inputElement = null;
      for (var i = 0; i < locales.length; i++) {
          if (locales[i] == "") {
              continue;
          }
          currentFieldId = this.inputPrefix + "contrmsg." + columnNum
                             + "." + locales[i];
          inputElement = dojo.byId(currentFieldId);
          if (inputElement != null) {
              messages[locales[i]] = inputElement.value;
          }
      }
      var sc = new curam.util.ScreenContext('MODAL');
      var url = "../CDEJ/popups/decision-assist/add-messages.jsp?messages=combinationMessages"
              + "&combinationID=" + columnNum
                + "&" + sc.toRequestString();
    
      function myFn(url) {
        curam.util.openModalDialog({href:url}, "width=250,height=200");
      }
    
      myFn.url = url;
      dojo.global.openThis = myFn;
      combinationMessages = messages;
      setTimeout("dojo.global[\"openThis\"]('" + url + "');", 50);
    }
  });
  
  return Matrix;
});

},
'dojox/main':function(){
define("dojox/main", ["dojo/_base/kernel"], function(dojo) {
	// module:
	//		dojox/main
	// summary:
	//		The dojox package main module; dojox package is somewhat unusual in that the main module currently just provides an empty object.

	return dojo.dojox;
});
},
'url:dijit/templates/MenuSeparator.html':"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>",
'curam/matrix/Answer':function(){
// wrapped by build app
define("curam/matrix/Answer", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.Answer");

dojo.require("curam.matrix.Constants");

//************************************************
//1Answer
//************************************************
dojo.declare("curam.matrix.Answer", null, {
  constructor: function(node, ansType, question) {
  this.node = node;
  this.id = node.getAttribute("id");
  this.validation = dojo.query("> :first-child", this.node)[0];
  this.input = dojo.query("> :first-child",this.validation)[0];
  this.button = cm.nextSibling(this.validation);
  this.widgetCreated = false;
  this.question = question;
  this.answerType = ansType;
  },
  init: function() {
  if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE
  || this.answerType == curam.matrix.Constants.ANSWER_TYPE_STRING) {
  var selects = this.validation.getElementsByTagName("select");
  var events = ["onblur", "onfocus", "onkeypress"];
  if(selects && selects.length > 0) {
  this.select = selects[0];
  events[events.length] = "onchange";
  }
  events[events.length] = "onkeyup";

  this.input.answer = this;
  this.input.question = this.question;
  this._addListeners(events);
  this._runInitialValidations([this.input]);
  } else if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
  var inputs = dojo.query("> input", this.validation);
  if (inputs.length == 1) {
  this.specificValue = inputs[0];
  this.min = null;
  this.max = null;
  this.specificValue.answer = this;
  this.specificValue.question = this.question;
  } else {
  // SK: check if the assumption here is right!
  this.min = inputs[0];
  this.max = inputs[1];

  this.min.answer = this.max.answer = this;
  this.min.question = this.max.question = this.question;

  this.specificValue = null;
  }
  this._addListeners();
  } else if(this.answerType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) {

  //For Boolean answers, nothing can be altered, so do not show the button
  //for launching the menu
  dojo.style(this.button, "display", "none");
  return;
  }

  var thisObj = this;
  curam.matrix.Constants.container.matrix.addLazyWidget(this, "answers");
  this.lazyListener = function(event){
  if(!curam.matrix.Constants.container.matrix.createLazyWidgets("answers")) {
  dojo.disconnect(thisObj.button._conn);
  return;
  }
  if(!thisObj.widget){return;}

  thisObj.widget._toggleMenu('AnswerOptions',
  cm.nextSibling(
  dojo.query("div", thisObj.node)[0],"div"));
  window.activeMenuID = thisObj.node.id;
  dijit.byId('AnswerOptions')._openMyself(curam.matrix.Constants.container.getFakeEvent(thisObj.widget.domNode));
  };
  this.button._conn = dojo.connect(this.button, "onclick", this, "lazyListener");
  },
  createWidget: function() {
  var c = curam.matrix.Constants.container;

  if (this.widgetCreated) {return;}
  var widget = this.widget = new curam.widget.AnswerButton(
  { menuId:'AnswerOptions'}, this.button);
  this.widgetCreated = true;
  },

  getQuestion: function() {
  if(!this.question){
  var qId = this.id.replace("ans-","");
  dId = qId.substring(0,qId.indexOf("-"));
  }
  return this.question;
  },

  getOptions: function() {
  if(!this.input['options']) {
  return null;
  }
  var opts = [];
  for(var count = 0; count < this.input.options.length; count ++) {
  opts[count] = {
  value: this.input.options[count].value,
  text: this.input.options[count].text
  };
  }
  return opts;
  },

  createSpecificValue: function () {
  //if this is already a specific value, do nothing
  if(this.specificValue) {
  return;
  }

  var specificInputId = this.min.id.replace(".min.", ".value.");

  var answerNode = dojo.query("div", this.node)[0];
  answerNode.innerHTML = "<div class=\"label-specific-value\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelSpecificValue + "\">"
  + curam.matrix.Constants.container.i18nMsgs.labelSpecificValue + ":</div>"
  + "<input type=\"text\" size=\"4\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelSpecificValue + "\"/>";

  this.specificValue = dojo.query("input", answerNode)[0];
  this.specificValue.setAttribute("id", specificInputId);

  curam.util.connect(this.specificValue, "onfocus", function(){
  curam.matrix.Constants.container.matrix.cf(arguments);
  });

  this.specificValue.answer = this;
  this.specificValue.question = this.question;

  cm.setClass(this.specificValue, "numeric-input-eval");
  this.min = this.max = null;

  this._addListeners();

  this._runInitialValidations([this.specificValue]);
  },

  //Run the validations.  They expect an Event object which contains
  //a "target" and "keyCode", so fake it. Point the target to the new
  //node we've created, and a non-tab keyCode.
  _runInitialValidations: function(inputs) {
  var av = curam.matrix.Constants.container.matrix.answerValidator;
  for(var i = 0; i< inputs.length; i++) {
  var fakeEvent = {target: inputs[i], keyCode: 55};
  if(this.answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
  av.validateNumericAnswer(fakeEvent);
  } else if(this.answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
  av.validateCodetableAnswer(fakeEvent);
  } else if(this.answerType == curam.matrix.Constants.ANSWER_TYPE_STRING) {
  av.validateStringAnswer(fakeEvent);
  }
  av.checkForError(fakeEvent);
  av.checkFocus(fakeEvent);
  }
  },

  _addListeners: function(events) {
  var av = curam.matrix.Constants.container.matrix.answerValidator;
  var validateNumeric = function(e){
  av.validateNumericAnswer(e);
  };
  var validateCodetable = function(e) {
  av.validateCodetableAnswer(e);
  };
  var validateString = function(e) {
  av.validateStringAnswer(e);
  };
  var checkForError = function(e){
  av.checkForError(e);
  };
  var checkFocus = function(e){
  av.checkFocus(e);
  };

  if(arguments.length == 0)
  {
  events = ["onkeyup","onblur", "onfocus", "onkeypress"];
  }

  var fns = {"onblur": checkForError,
  "onfocus": checkFocus,
  "onkeypress": curam.matrix.util.numericInputChecker};
  //Add validation listeners to the Answers
  var inputs;

  if(this.specificValue) {
  inputs = [this.specificValue];
  } else if(this.min && this.max){
  inputs = [this.min, this.max];
  } else if(this.select) {
  inputs = [this.select];
  } else if(this.input) {
  inputs = [this.input];

  //When a key is pressed, make sure that validations are not active.
  //If they are, stop the event, and send the focus back to the
  //input with the error in it.
  fns.onkeypress = curam.matrix.util.validationChecker;
  }


  fns.onchange = this.select ? validateCodetable : validateString;
  fns.onkeyup = this.answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC ?
   validateNumeric : validateString;

  for(var i = 0; i < inputs.length; i++) {
  for (var j = 0; j < events.length; j++) {
  curam.util.connect(inputs[i], events[j], fns[events[j]]);
  }
  }

  //While placing a transparent div over most controls is sufficient
  //to disable them, Internet Explorer has a CSS bug that does not allow
  //another HTML element to be placed over a SELECT node using the
  //'zindex' style object.  Therefore, the SELECT controls must be disabled.
  if(this.answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
  var thisAns = this;
  if(dojo.isIE7) {

  curam.util.subscribe("/disableInput",
  dojo.hitch(this.select, function (validInputs) {

  //If this "select" node is taking part in the validation, do
  //no disable it.  Otherwise, disable it.
  if(!validInputs ||
  ( validInputs && this != validInputs[0]
  && this != validInputs[1])) {
  this.setAttribute("disabled", "true");
  dojo._setOpacity(this, 0.3);
  }
  }));

  curam.util.subscribe("/enableInput",
  dojo.hitch(this.select , function (e) {
  this.setAttribute("disabled", false);
  dojo._setOpacity(this, 1);
  }));
  }

  //Add a focus listener to the select node.  This is only necessary
  //for <select> nodes, and not <input> nodes, as the <input> nodes
  //have this listener added through HTML
  curam.util.connect(this.select, "onfocus", function(){
  curam.matrix.Constants.container.matrix.cf(arguments);
  });
  }
  },

  createMinMax: function () {
  //If this is already a min/max answer, do nothing.
  if((this.min && this.max) || !this.specificValue ) {
  return;
  }

  var minId = this.specificValue.id.replace(".value.", ".min.");
  var maxId = this.specificValue.id.replace(".value.", ".max.");

  this.specificValue = null;

  var answerNode = dojo.query("div", this.node)[0];
  answerNode.innerHTML = "<div class=\"label-min-max\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelMin + "\">"
  + curam.matrix.Constants.container.i18nMsgs.labelMin + ":</div>"
  + "<input type=\"text\" size=\"4\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelMin + "\"/> "
  + "<div class=\"label-min-max\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelMax + "\">"
  + curam.matrix.Constants.container.i18nMsgs.labelMax + ":</div>"
  + "<input type=\"text\" size=\"4\" title=\""
  + curam.matrix.Constants.container.i18nMsgs.labelMax + "\"/>";

  this.min = dojo.query("input", answerNode)[0];
  this.max = cm.nextSibling(this.min, "INPUT");

  cm.setClass(this.min, "numeric-input-eval");
  cm.setClass(this.max, "numeric-input-eval");

  this.min.setAttribute("id", minId);
  this.min.setAttribute("name", minId);
  this.max.setAttribute("id", maxId);
  this.max.setAttribute("name", maxId);

  //Add the listener that prevents focus on the input if validation is active
  var focusFn = function(){
  curam.matrix.Constants.container.matrix.cf(arguments);
  };

  curam.util.connect(this.min, "onfocus", focusFn);
  curam.util.connect(this.max, "onfocus", focusFn);

  this.min.answer = this.max.answer = this;
  this.min.question = this.max.question = this.question;

  this._addListeners();

  this._runInitialValidations([this.min, this.max]);
  },
  adjustFirstRowStyle: function() {
  var clName = dojo.attr(this.node, "class");
  if (clName.indexOf('ans-eval-with-menu') == -1) {
  clName = clName.replace('ans-eval', 'ans-eval-with-menu');
  cm.setClass(this.node, clName);
  }
  var initialClass = 'ans-str-val-eval'; 
  if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
  initialClass = 'ans-ct-val';
  } else if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
  initialClass = 'ans-num-val-eval';
  } else if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) {
  initialClass = 'ans-bool-val-eval';
  }
  var wrapperClass = dojo.attr(this.validation, "class");
  if (clName.indexOf(initialClass + '-with-menu') == -1) {
  wrapperClass = wrapperClass.replace(initialClass, initialClass + '-with-menu');
  cm.setClass(this.validation, wrapperClass);
  }
  }
});

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
'curam/matrix/ContradictionRow':function(){
// wrapped by build app
define("curam/matrix/ContradictionRow", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.ContradictionRow");

//************************************************
//1ContradictionRow
//************************************************
dojo.declare("curam.matrix.ContradictionRow", null, {
  constructor: function(node) {
  this.node = node;
  this.cells = new curam.ListMap();
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {
  this.cells.add(childNodes[i].id, new curam.matrix.ContradictionCell(childNodes[i]));
  }
  }
  }
  }
);

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
'curam/matrix/AnswerGroup':function(){
// wrapped by build app
define("curam/matrix/AnswerGroup", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.AnswerGroup");

dojo.require("curam.matrix.Constants");

//************************************************
//1AnswerGroup
//************************************************
dojo.declare("curam.matrix.AnswerGroup", null, {
  constructor: function(node, question)
  {
  this.node = node;
  this.answers = new curam.ListMap();
  this.ansHeightGreaterThanDefault = false;
  this.answerType = this.setAnswerType(dojo.query("> :first-child", this.node)[0]);
  this.answerCount = 0;

  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  var answer = new curam.matrix.Answer(childNodes[i], this.answerType,
                             question);
  this.answers.add(childNodes[i].id, answer);
  answer.init();

  this.answerCount++;
  }
  }
  },
  // Check which answer type the group is by checking the specific
  // class that is assigned to the answer. Use the first answer in the group
  // as a reference.
  setAnswerType: function(firstAns) {
  var validation = dojo.query("> :first-child", firstAns)[0];

  // TODO: make classNames constants.
  if(dojo.hasClass(validation, 'ans-ct-val')
  || dojo.hasClass(validation, 'ans-ct-val-with-menu')) {
  return curam.matrix.Constants.ANSWER_TYPE_CODETABLE;
  } else if (dojo.hasClass(validation, 'ans-str-val-eval')
    || dojo.hasClass(validation, 'ans-str-val-eval-with-menu')) {
  return curam.matrix.Constants.ANSWER_TYPE_STRING;
  } else if (dojo.hasClass(validation, 'ans-bool-val-eval')
    || dojo.hasClass(validation, 'ans-bool-val-eval-with-menu')) {
  return curam.matrix.Constants.ANSWER_TYPE_BOOLEAN;
  } else {
  return curam.matrix.Constants.ANSWER_TYPE_NUMERIC;
  }
  },

  getOptions: function() {
  if (this.answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
  return this.answers.getObjectByIndex(0).getOptions();
  }
  },

  getAnswerIds: function() {
  var arr = new Array();
  var regExp = /^ans-.*-/;
  for (var i=0; i<this.answers.count; i++) {
  arr.push(this.answers.getKeyByIndex(i).replace(regExp, ''));
  }
  return arr;
  },

  getLastAddedAnswerId: function() {
  var regExp = /^ans-.*-/;
  return this.answers.getKeyByIndex(this.answers.count-1).replace(regExp, '');
  }
});


});

},
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
'curam/matrix/TopRight':function(){
// wrapped by build app
define("curam/matrix/TopRight", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TopRight");

dojo.require("curam.matrix.Constants");

  //************************************************
//1TopRight
//************************************************
dojo.declare("curam.matrix.TopRight", null, {
  constructor: function() {
  this.node = dojo.byId('top-right');
  this.topRightTop = new curam.matrix.TopRightTop();
  this.topRightBottom = new curam.matrix.TopRightBottom();
  this.container = curam.matrix.Constants.container;
  },


  // Classes Set:       .right-eval{width}
//                      .top-right-eval{width}
  setDimensions: function() {
  var c = this.container;
  this.totalHeadingWidth = 0;
  this.setDefaultPriorityDimensions();
  this.setDefaultCombinationDimensions();
  c.initialContradictionDimensionsSet = false;
  this.setInitialContradictionDimensions();
  outcomesWidth = this.setInitialOutcomeDimensions();

  if (c.matrix.priorityExists) {
  this.totalHeadingWidth += c.priorityWidth;
  }
  if (c.matrix.scoreExists) {
  this.totalHeadingWidth += c.priorityWidth;
  }
  if (c.matrix.contradictionsExist) {
  this.totalHeadingWidth += this.topRightTop.contradictionCol.widthWithBorder;
  }
  if (c.matrix.outcomesExist) {
  this.totalHeadingWidth += outcomesWidth;
  }

  this.setWidths(0);
  },

  setWidths: function(addedColumnWidth) {
  var c = curam.matrix.Constants.container;
  this.totalHeadingWidth =
  Math.max(1, this.totalHeadingWidth + addedColumnWidth);

  //Make sure that the width is at least 1 pixel, otherwise the scrollbar
  //does not work in IE if the bottom right div is empty.
  this.width = Math.max(1, this.totalHeadingWidth > c.maxTopRightWidth ?
    c.maxTopRightWidth : this.totalHeadingWidth);

  c.cssText.append(".matrix-container .right-eval{width:")
    .append(this.totalHeadingWidth)
    .append("px;}.matrix-container .top-right-eval{width:")
    .append(this.width).append("px;}");
  },


  // Classes Set: .pri-col-eval{width}
//                .pri-val-eval{width}
//                .pri-input-eval{width}
  setDefaultPriorityDimensions: function() {
  var c = curam.matrix.Constants.container;
  c.priorityWidth = c.tempDivs.priorityHeading.offsetWidth;
  var width = c.priorityWidth - curam.matrix.Constants.MATRIX_BORDER_SIZE;
  var priVal = c.tempDivs.priVal;
  var valWidth = width - dojo.style(priVal, "marginLeft")
        - dojo.style(priVal, "marginRight")
        - dojo.style(priVal, "borderLeft")
        - dojo.style(priVal, "borderRight")
        - dojo.style(priVal, "paddingLeft")
        - dojo.style(priVal, "paddingRight");

  var inputWidth = valWidth - c.inputBorderWidth - 4;

  c.cssText.append(".matrix-container .pri-col-eval{width:")
    .append(width).append("px;}")
    .append(".matrix-container .pri-val-eval{width:")
    .append(valWidth).append("px;}")
    .append(".matrix-container .pri-input-eval{width:")
    .append(inputWidth)
    .append("px;}");
  },


  // Classes set:                 .val-cells-eval{padding-left:padding-top:}
  // Object Variables Set:        curam.matrix.Constants.container.checkboxHeight
//                                curam.matrix.Constants.container.checkboxWidth
//                                curam.matrix.Constants.container.checkboxPosWidth
//                                curam.matrix.Constants.container.checkboxPosHeight
  setDefaultCombinationDimensions: function() {
  var c = curam.matrix.Constants.container;
  var cell = c.tempDivs.cell;
  var cellInput = c.tempDivs.cellInput;
  c.cellHeight = c.reducedAnswHeight;
  c.cellWidth = curam.matrix.Constants.COMBINATION_CELL_WIDTH;
  c.cboxWidth = cellInput.offsetWidth;
  c.cboxHeight = cellInput.clientHeight;
  c.cboxOffsetDiff = cellInput.offsetWidth - cellInput.clientWidth;

  var top = (c.cellHeight - c.cboxHeight - c.cboxOffsetDiff) / 2;
  var topWithMenu = (c.fullAnswerHeight + 3 - c.cboxHeight - c.cboxOffsetDiff) / 2;
  var left = (c.cellWidth - c.cboxWidth - c.cboxOffsetDiff) / 2;

  //Firefox requires two extra pixels offset to make the checkbox be
  //centered.
  if(dojo.isFF) {
  left += 2;
  }
  // NOTE: setting these seems to take a huge amount of time.
  c.cssText.append(".matrix-container .cbox-eval{left:").append(left)
    .append("px;top:").append(top).append("px;}");
  c.cssText.append(".matrix-container .cbox-eval-with-menu{left:").append(left)
  .append("px;top:").append(topWithMenu).append("px;}");
  c.cssText.append(".matrix-container .cell-first-row .cbox-eval{")
    .append("top:").append(top).append("px;}");
  },

  // Classes set:  .contr-val-cells-eval {padding-left}
//                 .contr-col-eval{width}
  setInitialContradictionDimensions : function() {
  if (this.container.matrix.contradictionsExist) {
  var numCombCols = this.topRightTop.contradictionCol.combinationCount;
  var headingWidth = (numCombCols * curam.matrix.Constants.COMBINATION_CELL_WIDTH) + ((numCombCols-1) * curam.matrix.Constants.MATRIX_BORDER_SIZE);
  this.topRightTop.contradictionCol.setWidth(headingWidth);
  }
  },

  // Classes set:               .out-id-cell-eval{width}
//                              .out-id-val-cells-eval{padding-left}
//                              .out-id-col-eval{width}
  setInitialOutcomeDimensions : function() {
  var totalOutcomesWidth = 0, curOutcome, headingWidth, numCombCols, totalCellWidth, cellWidth, left;

  if (this.container.matrix.outcomesExist) {
  var outcomes = this.topRightTop.outcomeCols;
  for (var i=0; i<outcomes.count; i++) {
  curOutcome = outcomes.getObjectByIndex(i);
  numCombCols = curOutcome.columns.count;
  totalCellWidth = (numCombCols * curam.matrix.Constants.COMBINATION_CELL_WIDTH) + ((numCombCols-1) * curam.matrix.Constants.MATRIX_BORDER_SIZE);

  headingWidth = totalCellWidth;
  cellWidth = curam.matrix.Constants.COMBINATION_CELL_WIDTH;

  totalOutcomesWidth += headingWidth + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  curOutcome.setWidth(curOutcome.outId, headingWidth);
  }
  }
  return totalOutcomesWidth;
  },

  addPriorityColumn : function() {
  // <div id="column-id-pri" class="column-id column-eval pri-col-eval"><div>C</div></div>
  // <div id="heading-pri" class="column-heading column-eval pri-col-eval"><div>Priority</div></div>
  this.topRightTop.addPriority();
  this.topRightBottom.addPriority();
  this.setWidths(curam.matrix.Constants.container.priorityWidth);
  },


  addScoreColumn : function() {
  // <div id="column-id-scr" class="column-id column-eval pri-col-eval"><div>D</div></div>
  // <div id="heading-scr" class="column-heading column-eval pri-col-eval"><div>Score</div></div>
  this.topRightTop.addScore();
  this.topRightBottom.addScore();
  this.setWidths(curam.matrix.Constants.container.priorityWidth);
  },

  addContradictionColumn: function() {
  this.topRightTop.addContradiction();
  this.topRightBottom.addContradiction();
  },

  addOutcomeColumn: function(outcomeDetails) {
  this.topRightBottom.addOutcomeColumn(outcomeDetails);
  return this.topRightTop.addOutcomeColumn(outcomeDetails);
  },


  deletePriorityColumn: function() {
  this.topRightTop.deletePriorityColumn();
  this.topRightBottom.deletePriorityColumn();
  },

  deleteScoreColumn: function() {
  this.topRightTop.deleteScoreColumn();
  this.topRightBottom.deleteScoreColumn();
  },


  deleteContradictionColumn: function() {
  this.topRightTop.deleteContradictionColumn();
  this.topRightBottom.deleteContradictionColumn();
  },

  deleteOutcomeColumn: function(id) {
  this.topRightTop.deleteOutcomeColumn(id);
  this.topRightBottom.deleteOutcomeColumn(id);
  }
});

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
'curam/matrix/Outcome':function(){
// wrapped by build app
define("curam/matrix/Outcome", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.Outcome");

//************************************************
//1Outcome
//************************************************
dojo.declare("curam.matrix.Outcome", null, {
  constructor: function(node) {
  this.node = node;
  this.rows = new curam.ListMap();
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {
  this.rows.add(childNodes[i].id, new curam.matrix.OutcomeRow(childNodes[i]));
  }
  }
  }
  }
);
});

},
'curam/matrix/validation/DefaultCombinationValidator':function(){
// wrapped by build app
define("curam/matrix/validation/DefaultCombinationValidator", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.DefaultCombinationValidator");

dojo.declare("curam.matrix.validation.DefaultCombinationValidator",
  curam.matrix.validation.DefaultValidator, {
    requiresRefresh: true,

    //Singleton instance which holds an array of all combination validators.
    allValidators: [],
    allBitsets: [],

    state: {
      singleWarningActive: false,
      duplicateWarningActive: false,
      questionWarningActive: false,
      errorBitset1: null,
      errorBitset2: null,
      errorActive: false,
      warningActive: false
    },

    constructor: function(container, opts) {
      this.container = container;
      if(opts) {
       dojo.mixin(this, opts);
      }
    },

    _registerValidator: function(validator) {
      //There can only be one instance of any given validator, so check for
      //an existing one and delete it
      for(var count = 0; count < this.allValidators.length; count++) {
        if(this.allValidators[count].declaredClass == validator.declaredClass) {
          //Replace the old instance with the new one
          this.allValidators[count] = validator;
          return;
        }
      }
      this.allValidators.push(validator);
    },

    _checkRefresh: function() {
      if(!this.inRefresh && this.requiresRefresh) {
        this.container.matrix.refreshCombinationValidators();
        this.requiresRefresh = false;
        return true;
      }
      return false;
    },

    _createBitset: function(colNum, arr) {
      var bitset = arr[colNum] = new curam.util.BitSet();
      bitset.colNum = colNum;

      //Mark the validator that created this bitset
      bitset.owner = this;

      //add an array to the bitset to store the inputs that it represents.
      bitset.inputs = [];
      this.allBitsets.push(bitset);
      return bitset;
    },

    _deleteBitset: function(bitset) {
      for(var count = 0; count < this.allBitsets.length; count++) {
        if(this.allBitsets[count] == bitset) {
          this.allBitsets.splice(count,1);
          break;
        }
      }
    },

    _deleteBitsets: function(idMap) {
      for(var count = 0; count < this.allBitsets.length; count++) {
        if(this.allBitsets[count] && idMap[this.allBitsets[count].id]) {
          this.allBitsets.splice(count, 1);
          count--;
        }
      }
    },

    _initCheckbox: function(checkBox, bitset) {
      //lazily assign a unique identifier to this checkbox
      if(typeof(checkBox.bitsetId) == "undefined" || checkBox.bitsetId == null) {
        checkBox.bitsetId = bitset.max + 1;
        checkBox.bitsetOwner = bitset.id;

        //store the checkbox in the bitset.  This makes drawing the validation
        //column easier.
        bitset.inputs[bitset.max + 1] = checkBox;

        //store the column id in the checkbox, for quick validation later.
        checkBox.colNum = bitset.colNum;
      }
    },

    //Returns true if the bitset passed as a parameter is valid.
    _validateOne: function(bitset) {
      return true;
    },

    _validateQuestionCount: function(bitset, qId) {
      return true;
    },

    _validateAll: function() {
      var allBitsets = this.allBitsets;

      this.state.duplicateWarningActive = false;
      for(var count = 0; count < allBitsets.length -1; count ++) {
        for(var target = count + 1; target < allBitsets.length; target ++) {
          if(allBitsets[count]
            && !allBitsets[count].isClear()
            && allBitsets[count].equals(allBitsets[target])) {
            this.state.duplicateWarningActive = true;

           //store the bitset so the validation can be drawn on the column.
           this._setErrorBitsets(allBitsets[count], allBitsets[target]);
           this.currentMsg = this.warningMsg;

           return false;
          }
        }
       }
       return true;
    },

    _validate: function(bitset, checkBox, qIds) {
      var oldBitset1 = this.state.errorBitset1;
      var oldBitset2 = this.state.errorBitset2;

      this.state.singleWarningActive = this.state.duplicateWarningActive =
               this.state.questionWarningActive =false;
      var valid = true;

      if(qIds) {
        valid = this._validateQuestionCount(bitset, qIds);
      }

      valid = valid &&(!bitset || this._validateOne(bitset))
                               && this._validateAll();

      if(!valid) {
        var columns;
        if(this.state.singleWarningActive || this.state.questionWarningActive) {
          columns = [this.state.errorBitset1];
        } else if(this.state.duplicateWarningActive) {
          columns = [this.state.errorBitset1, this.state.errorBitset2];
        }

        //This if statement is executed if there is invalid content.
        if(columns) {
          //If the checkbox that caused this validation is not part of one of
          //the combinations in error, then change the checkbox to one that
          //is in one of the combinations.
          if(checkBox.bitsetOwner != columns[0].id ||
            (columns.length > 1 && checkBox.bitsetOwner != columns[1].id)) {
            checkBox = columns[0].inputs[0];
          }
          this.addWarning(columns, checkBox);
        }
      } else {
        this.focusElement = null;

        if(this.isWarningActive()) {
          this.removeWarning();
        } else if(this.isErrorActive()) {
          this.removeError(this.state.errorBitset1,this.state.errorBitset2);
        }
        this.onValid();
      }
      return valid;
    },

    //Stub function that can be listened to for when a combination is valid
    onValid: function() {
    },

    _setErrorBitsets: function(bitset1, bitset2) {
      var bitset1Equal = (this.state.errorBitset1
                           && this.state.errorBitset1.id == bitset1.id)
                           || (this.state.errorBitset2
                                && this.state.errorBitset2.id == bitset1.id);

      var bitset2Equal = bitset2 ?
            ((this.state.errorBitset1 && this.state.errorBitset1.id == bitset2.id)
           || (this.state.errorBitset2 && this.state.errorBitset2.id == bitset2.id))
           : false;

      //If the same bitsets are invalid as before, do nothing.
      if(bitset1Equal && bitset2Equal) {
        return false;
      }

      if(this.isErrorActive()) {
        this.removeError(this.state.errorBitset1,this.state.errorBitset2);
      } else if(this.isWarningActive()) {
        this.removeWarning();
      }

      this.state.errorBitset1 = bitset1;
      this.state.errorBitset2 = bitset2;
      return true;
    },

    addWarning: function(columns, checkBox) {
      if(this.isErrorActive()
         && (this.state.errorBitset1.colNum != columns[0].colNum
           || (!this.state.errorBitset2
             || this.state.errorBitset2.colNum != columns[1].colNum)
         )) {
        this.removeError(this.state.errorBitset1, this.state.errorBitset2);
      }

      var ac = dojo.addClass;
      var thisValidator = this;

      var activateError = function(e) {
        if(thisValidator.isWarningActive()) {
          thisValidator.state.timeout = setTimeout(function(){
            thisValidator.addError();
          }, 10);
        }
      };

      var deactivateError = function(e) {
        if(!thisValidator.state.timeout
           || (typeof(e.target.colNum) == "undefined"
               ||!thisValidator.isWarningActive())){
          return true;
        }

        if(thisValidator.isInputPartOfValidation(e.target)) {
          clearTimeout(thisValidator.state.timeout);
          thisValidator.state.timeout = null;
        } else {
          dojo.stopEvent(e);
          return false;
        }
      };

      this.state.allowableFields = [];

      var firstInput = -1, lastInput = -1;

      var filter;

      if(this.state.questionWarningActive) {
        var inputs = columns[0].inputs;
        for(var count = 0; count < inputs.length; count ++) {
          if(inputs[count].checked && inputs[count].qId == this.state.questionWarningActive) {
            if(firstInput == -1) {
              firstInput = count;
            } else if(count > lastInput) {
              lastInput = count;
              break;
            }
          } else if(lastInput != -1) {
            break;
          }
        }
        lastInput = Math.min(lastInput, inputs.length);

        filter = function(checkBox, pos) {
          if(checkBox.checked && pos >= firstInput && pos <= lastInput) {
            return true;
          }
          return false;
        };
      } else {
        firstInput = 0;
        lastInput = columns[0].inputs.length - 1;

        filter = function() {
          return true;
        };
      }

      this.state.firstInput = firstInput;
      this.state.lastInput = lastInput;

      for(var colCount = 0; colCount < columns.length; colCount ++) {
        //Highlight a single column
        var inputs = columns[colCount].inputs;

        ac(inputs[firstInput].parentNode, "combination-validation-top");
        if(filter(inputs[firstInput], firstInput)) {
          this.state.allowableFields.push(inputs[firstInput].id);
        }
        for(var count = firstInput + 1; count < lastInput; count++) {
          if(filter(inputs[count], count) && inputs[count] && inputs[count].id) {
            this.state.allowableFields.push(inputs[count].id);
          }
          ac(inputs[count].parentNode, "combination-validation");
        }
        ac(inputs[lastInput].parentNode, "combination-validation-bottom");
        if(filter(inputs[lastInput], lastInput)) {
          this.state.allowableFields.push(inputs[lastInput].id);
        }

        //Lazily initialize the onblur and onfocus listeners on the
        //checkboxes.
        for(var count = 0; count < inputs.length; count++) {
          if(!inputs[count]['validationListenersAdded']) {
            inputs[count]['validationListenersAdded'] = true;

            dojo.connect(inputs[count], "onblur", activateError);
            dojo.connect(inputs[count], "onfocus", deactivateError);
          }
        }
      }
      this.setWarningActive(true);

      this.focusElement = this.state.activeChangedInput = checkBox ? checkBox :
                                           this.state.allowableFields[0];

      this.container.activateWarning(this.currentMsg);
    },

    addError: function() {
      if(!this.isWarningActive()) {
        return;
      }

      var columns;
      if(this.state.singleWarningActive || this.state.questionWarningActive) {
        columns = [this.state.errorBitset1];
      } else if(this.state.duplicateWarningActive) {
        columns = [this.state.errorBitset1, this.state.errorBitset2];
      }
      if(columns) {
        this.cancelInputTabs();

        var topLeftInput = columns[0].inputs[0];

        var colpos = columns.length > 1 ? 1 : 0;
        var bottomRightInput = columns[colpos]
                                    .inputs[columns[colpos].inputs.length -1];

        this.setErrorActive(true);
        this.setWarningActive(false);

        //Disable the matrix, except for our one or two columns.
        this.container.matrix.disableInputs(topLeftInput, bottomRightInput,
                                              "combination");
        dojo.publish("/disableInput",null);

        var repc = cm.replaceClass;
        var thisValidator = this;
        this.state.activeChangedInput.focus();
        this.container.activateError(this.currentMsg);
      }
    },

    removeError: function(bitset1, bitset2) {
      if(!bitset1 && !bitset2) {
        return;
      }
      var bitsets = this.state.errorBitset2 ? [bitset1, bitset2] :[bitset1];

      this._changeClassesFromColumn(bitsets, true);
      if(bitset1.colNum == this.state.errorBitset1.colNum) {
        this.state.errorBitset1 = null;
      }
      if(bitset2 && this.state.errorBitset2
         && bitset2.colNum == this.state.errorBitset2.colNum) {
        this.state.errorBitset2 = null;
      }
      this.setErrorActive(false);

      for(var count = 0; count < bitsets.length; count++) {
        if(bitsets[count].owner != this) {
          bitsets[count].owner.setErrorActive(false);
        }
      }

      this.state.activeChangedInput = null;

      this.clearInputTabListeners();
     // this.container.matrix.enableInputs();
      this.container.deactivateValidation();
    },

    removeWarning: function() {
      if(!this.state.errorBitset1 && !this.state.errorBitset2) {
        return;
      }
      var bitsets = [this.state.errorBitset1];
      if(this.state.errorBitset2) {
        bitsets[1] =  this.state.errorBitset2;
      }
      this._changeClassesFromColumn(bitsets, true);
      this.state.errorBitset1 = this.state.errorBitset2 = null;
      this.setWarningActive(false);
      this.state.activeChangedInput = null;
      this.container.deactivateValidation();
    },

    _changeClassesFromColumn: function(bitsets, remove) {
      var fn;
      if(remove) {
        fn = dojo.removeClass;
      } else {
        fn = dojo.addClass;
      }
      var firstInput = this.state.firstInput;
      var lastInput = this.state.lastInput;

      for(var colCount = 0; colCount < bitsets.length; colCount ++) {
        if(!this.bitsets) {
          continue;
        }
        //Change highlight on a single column
        var inputs = bitsets[colCount].inputs;
        fn(inputs[firstInput].parentNode, "combination-validation-top");

        for(var count = firstInput + 1; count < lastInput; count++) {
          fn(inputs[count].parentNode, "combination-validation");
        }
        fn(inputs[lastInput].parentNode, "combination-validation-bottom");
      }
    },

    //Determines if the form input element passed as a parameter is part of
    //an active validation.  Returns true if it is, false if it is not.
    isInputPartOfValidation: function(input) {
      if(!input.bitsetOwner || !this.isErrorActive() && !this.isWarningActive()
          || !this.state.allowableFields) {
        return false;
      }
      if((this.state.errorBitset1 && this.state.errorBitset1.id == input.bitsetOwner)
         || (this.state.errorBitset2 && this.state.errorBitset2.id == input.bitsetOwner)) {
        return true;
      }
      return false;
    }
  }
);

});

},
'curam/matrix/validation/PriorityValidator':function(){
// wrapped by build app
define("curam/matrix/validation/PriorityValidator", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.validation.PriorityValidator");

dojo.declare("curam.matrix.validation.PriorityValidator",
  curam.matrix.validation.DefaultValidator,
  {
    constructor: function(container) {
      this.setErrorActive(false);
      this.activeChangedInput = null;
      this.activeExistingInput = null;
      this.focusElement = null;
      this.container = container;
      this.duplicateMsg = container.i18nMsgs.duplicateMsg;
    },

    validatePriority: function (e) {
      if (this.checkForTabShiftKey(e)) {
        return;
      }
      var id = e.target.id;
      var newValue = dojo.byId(id).value;

      this.unvalidatePriorities();
      if (newValue == "") {
          return;
      }

      var priorities = e.target.priorityGroup.priorities;
      var modifiedPriority = e.target.priority;
      for (var i = 0; i < priorities.count; i++) {
        if (modifiedPriority.node.id == priorities.getObjectByIndex(i).node.id) {
          continue;
        }
        var existingPriority = priorities.getObjectByIndex(i);
        if (newValue == existingPriority.input.value) {
          this.validatePriorities(modifiedPriority, //.priorityValidation,
                          existingPriority,//.priorityValidation,
                          this.duplicateMsg);
          this.focusElement = modifiedPriority.input;
          this.state.allowableFields = [modifiedPriority.input.id,
                                  existingPriority.input.id];

          this.addFocusListener([modifiedPriority.input,
                                 existingPriority.input
                                ]);
          var thisValidator = this;

          setTimeout(function(){
            thisValidator.focusElement.focus();
          }, 10);
          return;
        }
      }
    },

    validatePriorities: function (changedPriority, existingPriority, message) {
      dojo.addClass(changedPriority.validation, "validateWarn");
      dojo.addClass(existingPriority.validation, "validateWarn");
      this.activeChangedInput = changedPriority;
      this.activeExistingInput = existingPriority;
      this.setWarningActive(true);
      this.container.activateWarning(message);
    },

    unvalidatePriorities: function () {
      if(!this.isValidationActive()) {
        return;
      }
      var rc = dojo.removeClass;
      if(this.activeChangedInput) {
        rc(this.activeChangedInput.validation, "validateError");
        rc(this.activeChangedInput.validation, "validateWarn");
      }
      if(this.activeExistingInput) {
        rc(this.activeExistingInput.validation, "validateWarn");
        rc(this.activeExistingInput.validation, "validateError");
      }
      this.clearInputTabListeners();

      this.activeChangedInput = null;
      this.activeExistingInput = null;
      this.setWarningActive(false);
      if (this.isErrorActive() == true) {
        this.setErrorActive(false);
      }
      this.container.deactivateValidation();
    },

    checkPriorityValidation: function (e) {
      if (this.isWarningActive()) {
        var elementId = e.target.parentNode.id;
        if (elementId == this.activeChangedInput.validation.id
            || elementId == this.activeExistingInput.validation.id) {

          var thisVal = this;
          this.timeout = setTimeout(function() {
            thisVal.addError(e);
          }, 10);
        }
      }
    },

    addError: function(e) {
      dojo.addClass(this.activeChangedInput.validation, "validateError");
      dojo.addClass(this.activeExistingInput.validation, "validateError");
      this.container.activateError(
                          this.duplicateMsg);

      this.container.matrix.disableInputs(this.activeChangedInput.validation,
                                         this.activeExistingInput.validation);

      dojo.publish("/disableInput",[
        this.activeChangedInput.input, this.activeExistingInput.input
      ]);

      this.focusElement = e.target;

      this.cancelInputTabs();

      var thisValidator = this;

      //setTimeout("priorityValidator.focusElement.focus()", 100);
      setTimeout(function(){
        thisValidator.focusElement.focus();
      }, 10);

      this.setWarningActive(false);
      this.setErrorActive(true);
    }
  }
);

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
'curam/StringBuffer':function(){
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
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */

define("curam/StringBuffer", [], function() {

  var StringBuffer = dojo.declare("curam.StringBuffer", null, {
    constructor: function() {
      this.buffer = [];
    },

    append: function append(string) {
      this.buffer.push(string);
      return this;
    },

    toString: function toString() {
      return this.buffer.join("");
    }
  });
  
  return StringBuffer;
});

},
'dijit/MenuSeparator':function(){
require({cache:{
'url:dijit/templates/MenuSeparator.html':"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"./_WidgetBase",
	"./_TemplatedMixin",
	"./_Contained",
	"dojo/text!./templates/MenuSeparator.html"
], function(declare, dom, _WidgetBase, _TemplatedMixin, _Contained, template){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _Contained = dijit._Contained;
=====*/

	// module:
	//		dijit/MenuSeparator
	// summary:
	//		A line between two menu items

	return declare("dijit.MenuSeparator", [_WidgetBase, _TemplatedMixin, _Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});
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
      if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")
          && curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm == true) {
        if( (corner.charAt(0) == 'T' || corner.charAt(1) == 'L')
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
'curam/matrix/Contradiction':function(){
// wrapped by build app
define("curam/matrix/Contradiction", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.Contradiction");

//************************************************
//1Contradiction
//************************************************
dojo.declare("curam.matrix.Contradiction", null, {
  constructor: function(node) {
  this.node = node;
  this.rows = new curam.ListMap();
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {
  this.rows.add(childNodes[i].id, new curam.matrix.ContradictionRow(childNodes[i]));
  }
  }
  }
});

});

},
'curam/matrix/OutcomeRow':function(){
// wrapped by build app
define("curam/matrix/OutcomeRow", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.OutcomeRow");

//************************************************
//1OutcomeRow
//************************************************
dojo.declare("curam.matrix.OutcomeRow", null, {
  constructor: function(node) {
  this.node = node;
  this.cells = new curam.ListMap();
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {
  this.cells.add(childNodes[i].id, new curam.matrix.OutcomeCell(childNodes[i]));
  }
  }
  }
  }
);

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
'curam/matrix/OutcomeCell':function(){
// wrapped by build app
define("curam/matrix/OutcomeCell", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.OutcomeCell");

dojo.require("curam.matrix.Constants");

//************************************************
//1OutcomeCell
//************************************************
dojo.declare("curam.matrix.OutcomeCell", null, {
  constructor: function(node) {
  this.node = node;
  this.input = dojo.query("> :first-child", this.node)[0];
  this.button = cm.nextSibling(this.input);
  this.initListener();
  this.widgetCreated = false;
  },
  initListener: function() {
  if(this.button && !dojo.hasClass(this.button, "hidden-image")) {
  var _this = this;
  curam.matrix.Constants.container.matrix.addLazyWidget(this, "cells");
  this.lazyListener = function(event){
  if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")) {
  dojo.disconnect(_this.button._conn);
  return;
  }
  if(!_this.widget){return;}
  _this.widget._toggleMenu('CombinationOptions', event);
  window.activeMenuID = _this.node.id;
  dijit.byId('CombinationOptions')._openMyself(curam.matrix.Constants.container.getFakeEvent(_this.widget.domNode));
  };
  this.button._conn = dojo.connect(this.button, "onclick", this, "lazyListener");
  }
  },
  
  createWidget: function(event) {
  var c = curam.matrix.Constants.container;
  if (this.widgetCreated) {
  return;
  }
  if(!this.button.cellId) {
  this.button.cellId = this.node.id;
  }
  this.widget = new curam.widget.CombinationButton(
  { menuId:'CombinationOptions' }, this.button);
  this.widgetCreated = true;
  window.activeMenuID = this.node.id;
  dojo.disconnect(this.button._conn);
  },
  
  setButtonClass: function(classStr) {
  if(!this.button) {
  this.button = dojo.create("div");
  this.node.appendChild(this.button);
  this.button._conn = dojo.connect(this.button, "onclick", this, "createWidget");
  }
  cm.setClass(this.button, classStr);
  if(!this.widgetCreated && classStr == "image"){this.initListener();}
  },
  
  adjustFirstRowClass: function(initialClass) {
  var clName = dojo.attr(this.node, "class");
  if (clName.indexOf('ans-eval-with-menu') == -1) {
  clName = clName.replace('ans-eval', 'ans-eval-with-menu');
  cm.setClass(this.node, clName);
  }
  clName = dojo.attr(this.input, "class");
  if (clName.indexOf('cbox-eval-with-menu') == -1) {
  clName = clName.replace('cbox-eval', 'cbox-eval-with-menu');
  cm.setClass(this.input, clName);
  }
  }
});

});

},
'curam/widget/MatrixPopupMenu':function(){
// wrapped by build app
define("curam/widget/MatrixPopupMenu", ["dijit","dojo","dojox","dojo/require!dijit/Menu,dijit/MenuSeparator,curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.widget.MatrixPopupMenu");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuSeparator");
dojo.require("curam.matrix.Constants");

/*
 * Modification History
 * --------------------
 * 31-Jul-2012  MV  [CR00336202] Migrate to take on Dojo 1.7.3
 */

//
//User defined menu widget
//that extends dojo's menu widget by setting custom styles
//

dojo.declare("curam.widget.MatrixPopupMenu", dijit.Menu, {
    id: "",
    allMenuItemsDisabled: false,
    mcontainer: null,

    leftClickToOpen: true,

    postCreate: function() {
      this.inherited(arguments);
      dojo.place(this.domNode, dojo.body());
      dojo.style(this.domNode, "display", "none");

      dojo.addOnLoad(dojo.hitch(this, function(){
        if (!this.mcontainer) {
          this.mcontainer = curam.matrix.Constants.container;
        }
        dojo.subscribe("/disableMenuItems", this, "setDisableAllItems");
        dojo.subscribe("/enableMenuItems", this, "setEnableAllItems");


        if(this.mcontainer.matrix && this.mcontainer.matrix.isValidationActive()) {
          this.setDisableAllItems();
        }
      }));
    },

    setButton: function(btn){
      this.myParent = btn;
    },

    setDisableAllItems: function() {
      this.allMenuItemsDisabled = true;
    },

    setEnableAllItems: function() {
      this.allMenuItemsDisabled = false;
    },

    enableAllItems: function() {
      var menuItems = this.getMenuItems();
      for (var i=0; i<menuItems.length; i++) {
        menuItems[i].enableItem();
      }
    },

    // This overrides open() in PopupContainerBase
    _openMyself: function(event) {
      if(curam.matrix.Constants.container.matrix.isValidationActive()) {
        return;
      }

      if (!this.allMenuItemsDisabled) {
        dijit.Menu.prototype._openMyself.call(this, event);
        var target = event.target;
        setTimeout(dojo.hitch(this, function(){
          this.enableAllItems();
          this.checkValidations(this.myParent);

          this.explodeSrc = target;
        }), 2);
      }
    },

    checkValidations: function(myParent) {
      var menuItems = this.getMenuItems();
      if (this.id == "OutcomeOptions") {
        this.checkOutcomeGroupOptions(menuItems, myParent);
      }
      else if (this.id == "AnswerOptions") {
        this.checkAnswerOptions(menuItems, myParent);
      }
      else if (this.id == "QuestionOptions") {
        this.checkQuestionOptions(menuItems, myParent);
      }
      else if (this.id == "CombinationOptions") {
        this.checkSingleOutcomeOptions(menuItems, myParent);
      }
    },

    getMenuItems: function() {
      if(!this.menuItems) {
        this.menuItems = dojo.query("> .dijitMenuItem", this.containerNode).map(dijit.byNode);
        dojo.forEach(this.menuItems, dojo.hitch(this, function(item){
          this.menuItems[item.id] = item;
        }));
      }
      return this.menuItems;
    },

    //If the menu item ID is "pasteCombination" and there is nothing to paste,
    //disable it.
    checkOutcomeGroupOptions: function(menuItems, myParent) {
      var hasCopied = this.mcontainer.matrix.hasCopiedCombination();
      dojo.forEach(menuItems, dojo.hitch(this, function(item){
        if (item.id == "pasteCombination" && !hasCopied) {
          item.set("disabled", true);
        }
      }));
    },

    // If there is only one answer left in the question
    // disable the option to delete the answer. If the answer type
    // of the question is not numeric disable the useValue and minMax options.
    checkAnswerOptions: function(menuItems, myParent) {

      var question = this.mcontainer.matrix.getQuestionFromAnswerId(this.answerId);
      var ansGroup = question.ansGroup;
      var answer = ansGroup.answers.getObjectByKey(this.answerId);

      //There must be at least one answer, so disable the "Delete Answer"
      //menu item if there is only one answer. Also, cannot delete answers on
      //the Boolean answer type, as it is either true or false.
      if((ansGroup.answerCount == 1
          || ansGroup.answerType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN)
          && menuItems["deleteAnswer"]) {
        menuItems["deleteAnswer"].set("disabled", true);
      }

      //If the answer is already a Numeric min/max value, disable the option to
      //change it to a min/max answer
      if((ansGroup.answerType != curam.matrix.Constants.ANSWER_TYPE_NUMERIC || !answer.specificValue)
           && menuItems[curam.matrix.Constants.MIN_MAX]) {
        menuItems[curam.matrix.Constants.MIN_MAX].set("disabled", true);
      }

      //If the answer is already a Numeric specific value, disable the option to
      //change it to a specific value answer
      if((ansGroup.answerType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC && answer.specificValue
          && menuItems["useValue"]) || ansGroup.answerType != curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
        menuItems["useValue"].set("disabled", true);
      }
    },

    // If there is only one question left in the matrix disable
    // the delete question menu item. Is the question answer type is boolean disable
    // the add answer menu item.
    checkQuestionOptions: function(menuItems, myParent) {

      //bg changed from -number-text to -number
      var questionId = myParent.id.replace('num-', '');
      var question = this.mcontainer.matrix.bottomLeft.bottomLeftMain
                        .getQuestion(questionId);
      if (question == null) {
        //the question has just been deleted
        return;
      }
      var answerType = (typeof(question['answerType'] == 'undefined')) ?
                            question.ansGroup.answerType : question.answerType;

      //Disable the 'addAnswer' command if the answer type is boolean, or if
      //it is a code table response and we have as many answers as there are
      //items in the code table.
      if(menuItems["addAnswer"] ) {
        if(answerType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) {
          menuItems["addAnswer"].set("disabled", true);
        } else if(answerType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE
         && question.ansGroup.answerCount == question.getAnswer(1).select.length) {
          menuItems["addAnswer"].set("disabled", true);
        }
      }
    },

    // If there is only one combination left in the column disable the
    // delete combination menu item. If the column is an outcome rather
    // than a contradiction disable the add message menu item.
    checkSingleOutcomeOptions: function(menuItems, myParent) {
      var numCombinations;
      var contradiction = this.determineIfContradiction(this.combinationId);
      if (contradiction) {
        numCombinations = this.determineNumCombsInContradictions();
      }
      else {
        numCombinations = this.determineNumCombsInOutcome(myParent.id);
      }
      for (var i=0; i<menuItems.length; i++) {
        if (menuItems[i].id == "deleteCombination" && numCombinations == 1) {
          menuItems[i].set("disabled", true);
        }
        if (menuItems[i].id == "addMessage" && !contradiction) {
          menuItems[i].set("disabled", true);
        }
      }
    },

    // TODO: make the determination more conclusive.
    determineIfContradiction: function(id) {
      return (id.indexOf("contr") == 0);
    },

    determineNumCombsInContradictions: function() {
      return this.mcontainer.matrix.bottomRight.questions
             .getObjectByIndex(0).getContradictionCount();
    },

    determineNumCombsInOutcome: function(id) {
      return this.mcontainer.matrix.getOutcome(this.combinationId).rows
                 .getObjectByIndex(0).cells.count;
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
'dijit/_Templated':function(){
define("dijit/_Templated", [
	"./_WidgetBase",
	"./_TemplatedMixin",
	"./_WidgetsInTemplateMixin",
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.extend lang.isArray
	"dojo/_base/kernel" // kernel.deprecated
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, array, declare, lang, kernel){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _WidgetsInTemplateMixin = dijit._WidgetsInTemplateMixin;
=====*/

	// module:
	//		dijit/_Templated
	// summary:
	//		Deprecated mixin for widgets that are instantiated from a template.

	// These arguments can be specified for widgets which are used in templates.
	// Since any widget can be specified as sub widgets in template, mix it
	// into the base widget class.  (This is a hack, but it's effective.)
	lang.extend(_WidgetBase, {
		waiRole: "",
		waiState:""
	});

	return declare("dijit._Templated", [_TemplatedMixin, _WidgetsInTemplateMixin], {
		// summary:
		//		Deprecated mixin for widgets that are instantiated from a template.
		//		Widgets should use _TemplatedMixin plus if necessary _WidgetsInTemplateMixin instead.

		// widgetsInTemplate: [protected] Boolean
		//		Should we parse the template to find widgets that might be
		//		declared in markup inside it?  False by default.
		widgetsInTemplate: false,

		constructor: function(){
			kernel.deprecated(this.declaredClass + ": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin", "", "2.0");
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){

			this.inherited(arguments);

			// Do deprecated waiRole and waiState
			var nodes = lang.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x = lang.isArray(rootNode) ? 0 : -1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];

				// waiRole, waiState
				var role = getAttrFunc(baseNode, "waiRole");
				if(role){
					baseNode.setAttribute("role", role);
				}
				var values = getAttrFunc(baseNode, "waiState");
				if(values){
					array.forEach(values.split(/\s*,\s*/), function(stateValue){
						if(stateValue.indexOf('-') != -1){
							var pair = stateValue.split('-');
							baseNode.setAttribute("aria-"+pair[0], pair[1]);
						}
					});
				}
			}
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
'curam/matrix/TopRightFiller':function(){
// wrapped by build app
define("curam/matrix/TopRightFiller", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TopRightFiller");

dojo.require("curam.matrix.Constants");

//************************************************
//1TopRightFiller
//************************************************
dojo.declare("curam.matrix.TopRightFiller", null, {
  constructor: function()
  {
  this.node = dojo.byId('top-right-filler');
  this.topRightTopFiller = dojo.byId('top-right-filler-top');
  this.topRightBottomFiller = dojo.byId('top-right-filler-bottom');
  },
  // Classes Set:         .top-right-filler-contents-eval{width}
//                        .top-right-filler-eval{width}
  setDimensions: function() {
  var c = curam.matrix.Constants.container;
  this.widthIncBorder = c.scrollBarWidth + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  c.cssText.append(".matrix-container .top-right-filler-contents-eval{width:").append(c.scrollBarWidth)
    .append("px;}.matrix-container .top-right-filler-eval{width:").append(this.widthIncBorder).append("px;}");
  }
});

});

},
'curam/matrix/util':function(){
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
 * 02-May-2012  MK  [CR00323691] Use new Dojo AMD format.
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */


/**
 * @name curam.matrix.util
 * 
 * @namespace This is a set of utility functions that are used by the Matrix.
 * 
 */
define("curam/matrix/util", ["curam/define",
        "curam/util",
        "curam/matrix/Constants"
        ], function() {
  
var matrixUtil = curam.define.singleton("curam.matrix.util", 
/**
 * @lends curam.matrix.util.prototype
 */    
{

  keys: dojo.keys,

  allowableCharsForNumeric: [
    "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "0", "-", ".",
    dojo.keys.LEFT_ARROW,
    dojo.keys.RIGHT_ARROW,
    dojo.keys.DELETE,
    dojo.keys.BACKSPACE,
    dojo.keys.END,
    dojo.keys.HOME,
    dojo.keys.TAB,
    dojo.keys.F5
  ],

  // return Qx from __o3dmx.MODIFY.dtls$matrixResult.priority.s.s.Qx.y
  // where Qx represents the question id and y represents the priority id.
  getQuestionIdFromPriorityInputId: function(id) {
    var temp = id.replace(curam.matrix.Constants.container.matrix.inputPrefix + "priority.s.s.", "");
    var regExp = /\..*/;
    return temp.replace(regExp, "");
  },

  //Returns the index of a cell in a contradiction from an ID like
  // "contr-cell-Q2-1-3", where '3' is the cell index
  getCellIndexFromContradictionCellId: function(id) {
    return Number(curam.matrix.util.safeSplit(id, "-")[4]);
  },

  //translate an answer ID into a question ID.
  getQuestionIdFromAnswerId: function(ansId) {
    var qId = ansId.substring(ansId.indexOf("-Q") + 1);
    qId = qId.substring(0, qId.indexOf("-") > 0 ? qId.indexOf("-") : qId.length);
    return qId;
  },

  // Return x from __o3dmx.MODIFY.dtls$matrixResult.z.s.s.x.y
  // where x is a questionId, y is anumeric value and z has the value
  // 'value' 'min' or 'max'.
  getQuestionIdFromAnswerInputId: function(id) {
    var ids = id.split(".");
    return ids[ids.length -2];
  },

  // Return y from __o3dmx.MODIFY.dtls$matrixResult.z.s.s.x.y
  // where x is a questionId, y is anumeric value and z has the value
  // 'value' 'min' or 'max'.
  getAnswerIdFromAnswerInputId: function (id) {
    var ids = id.split(".");
    return ids[ids.length -1];
  },

  // return y from __o3dmx.MODIFY.dtls$matrixResult.priority.s.s.Qx.y
  // where Qx represents the question id and y represents the priority id.
  getPriorityIdFromPriorityInputId: function(id) {
    var temp = id.replace(curam.matrix.Constants.container.matrix.inputPrefix + "priority.s.s.", "");
    var regExp = /^.*\./;
    return temp.replace(regExp, "");
  },

  makeNumericInput: function(input, mustBePos) {
    curam.util.connect(input, "key",
            curam.matrix.util[
              mustBePos ? "posNumericInputChecker" : "numericInputChecker"]);
  },

  checkFocus: function() {
    curam.matrix.Constants.container.matrix.checkFocus(arguments[0]);
  },

  createInput: function(type) {
    var input = dojo.create("input", {
      onfocus: function(){curam.matrix.Constants.container.matrix.cf(arguments);}
    });
    if(type) {
      input.setAttribute("type", type);
    }
    return input;
  },

  //Splits a string into an array, but checks first for double occurences of the
  //character.  This is used where a negative number is in an ID separated by
  //the '-' character
  safeSplit: function(str, c) {
    if(str.indexOf(c + c) > -1) {
      var arr = str.split(c + c);

      var subarr;
      var totalArr = [];
      for(var count = 0; count < arr.length; count++) {
        subarr = arr[count].split(c);
        if(count > 0) {
          subarr[0] = c + subarr[0];
        }
        totalArr = totalArr.concat(subarr);
      }
      return totalArr;
    } else {
      return str.split(c);
    }
  },

  validationChecker: function(e) {
    var mat = curam.matrix.Constants.container.matrix;
    if(mat.isValidationActive() && !mat.isInputPartOfValidation(e.target)) {
      dojo.stopEvent(e);
      mat.refocusValidatingInput();
      return false;
    }
    return true;
  },

  numericInputChecker: function(e) {
    if(!curam.matrix.util.validationChecker(e)){return false;}
    if(typeof(e.key) != "undefined") {
      if (e.key == "-" && e.target.value.length != 0) {
        dojo.stopEvent(e);
        return;
      } else if (e.key == "." && e.target.value.indexOf(".") != -1) {
          dojo.stopEvent(e);
          return;
      }
      var chars = curam.matrix.util.allowableCharsForNumeric;
      for (var i = 0; i < chars.length; i++) {
          if (e.key != " " && e.key === chars[i]) {
              return;
          }
      }
      dojo.stopEvent(e);
      return;
    }
  },
  posNumericInputChecker: function(e) {
    if(!curam.matrix.util.validationChecker(e)){return false;}
    if(typeof(e.key) != "undefined") {
      if(e.key == "-" || (e.key == "." && e.target.value.indexOf(".") != -1)){
        dojo.stopEvent(e);
        return;
      }
      var chars = curam.matrix.util.allowableCharsForNumeric;
      for (var i = 0; i < chars.length; i++) {
          if (e.key != " " && e.key === chars[i]) {
              return;
          }
      }
      dojo.stopEvent(e);
      return;
    }
  },

  initButtonListeners: function(node) {
    if(node._btnMouseOverAdded) {
      return;
    }
    curam.util.connect(node, "onmouseover",
             curam.matrix.util.buttonMouseOver);
    node._btnMouseOverAdded = true;
  },

  buttonMouseOver: function(event) {
    event = dojo.fixEvent(event);
    var node = event.target;
    if(!node.id || node.id == "") {
      node = node.parentNode;
    }

    dojo.addClass(node, "mouseover");

    if(!node._btnMouseOutAdded) {
      curam.util.connect(node, "onmouseout",
         curam.matrix.util.buttonMouseOut);
      node._btnMouseOutAdded = true;
    }
  },

  buttonMouseOut: function(event) {
    event = dojo.fixEvent(event);
    var node = event.target;
    if(!node.id || node.id == "") {
      node = node.parentNode;
    }
    dojo.removeClass(node, "mouseover");
  },

  toggleHeight: function(node) {
    /*
      IE sometimes forgets to repaint some DOM nodes, making them appear to be
      invisible. Toggling the size of the DOM nodes containing node makes them
      reappear.
    */
    if(!dojo.isIE){return;}
    var height = dojo.contentBox(node).h;
    dojo.contentBox(node, {height: height + 2});
    dojo.contentBox(node, {height: height});
  }
});
return matrixUtil;
});

},
'curam/matrix/BottomLeftMain':function(){
// wrapped by build app
define("curam/matrix/BottomLeftMain", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.BottomLeftMain");

dojo.require("curam.matrix.Constants");
var domGeom = dojo.require("dojo.dom-geometry");

//************************************************
//1BottomLeftMain
//************************************************
dojo.declare("curam.matrix.BottomLeftMain", null, {
  constructor: function()
  {
  this.node = dojo.byId('bottom-left-main');
  this.questions = new curam.ListMap();
  this.matrix = curam.matrix.Constants.container.matrix;

  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  this.questions.add(childNodes[i].id,
           new curam.matrix.QuestionLeft(childNodes[i]));
  }
  }
  },

  // Classes Set:   .bottom-left-main-eval{width;height}
  setDimensions: function() {
  this.setDefaultNumberDimensions();
  this.setDefaultAnswerDimensions();
  var totalQuestionHeight = 0;
  for (var i=0; i<this.questions.count; i++) {
  totalQuestionHeight += this.questions.getObjectByIndex(i).setDimensions();
  }
  return this.setHeight(totalQuestionHeight);
  },


  setHeight: function(totalQuestionHeight) {
  var c = curam.matrix.Constants.container;
  var potentialMatrixHeight = totalQuestionHeight
  + c.matrix.bottomLeft.bottomLeftFiller.height
  + c.matrix.topLeft.height;

  // Check the total height of all questions is less than or equal to
  // the maximum available height.
  this.height = (potentialMatrixHeight > c.maxMatrixHeight)
  ? curam.matrix.Constants.container.maxMatrixHeight - c.matrix.topLeft.height
   - c.matrix.bottomLeft.bottomLeftFiller.height
   - curam.matrix.Constants.MATRIX_BORDER_SIZE
  : totalQuestionHeight;

  c.cssText.append(".matrix-container .bottom-left-main-eval{height:")
  .append(this.height).append("px;}");
  return this.height;
  },

  // Classes Set:             .ans-eval{height}
//                            .ans-val-eval{width}
//                            .ans-str-val-eval{margin-top}
//                            .ans-num-val-eval{margin-top}
//                            .ans-bool-val-eval{margin-top}
//                            .ans-str-val-eval-with-menu{margin-top}
//                            .ans-num-val-eval-with-menu{margin-top}
//                            .ans-bool-val-eval-with-menu{margin-top}
//                            .answer-input-eval{width}
//                            .numeric-input-eval{width}
//                            .ans-eval-with-menu{height}
  // Object Variables Set:    curam.matrix.Constants.container.defaultAnsHeight
//                            curam.matrix.Constants.container.ansValSelectHeight
//                            curam.matrix.Constants.container.ansValInputHeight
//                            curam.matrix.Constants.container.ansValTextHeight
//                            curam.matrix.Constants.container.ansValWidth


  // Create a dropdown answer field. Based on this we can figure out the default answer height and the validation
  // width for all answers. In order to vertically center the input fields/text in answer divs we use the marginTop
  // property. For Dropdown fields this is predefined in css class ans-ct-val. Using this as a relative value we
  // find the marginTop values for text input fields and text. For example, we get the difference in height between
  // the height of a drop down field and an input field (the drop down will always be bigger) and add the difference
  // to the margin. (We actually add half the difference because half should go to MarginTop and half to MarginBottom
  // to center it properly). We don't need to set MarginBottom as the containing div is at a fixed height so setting
  // MarginTop is enough to vertically center it. MarginBottom is implicitly set.

  //TODO: I think the calculations on the margins are slightly out.
  setDefaultAnswerDimensions: function() {
  if(this.defaultDimensionsSet) {
  return;
  }
  var c = curam.matrix.Constants.container;
  var ctAnsMargin = domGeom.getMarginBoxSimple(c.tempDivs.ctAnsVal);
  var ctAnsContent = dojo.contentBox(c.tempDivs.ctAnsVal);
  c.fullAnswerHeight = ctAnsContent.h + c.tempDivs.image.offsetHeight;
  c.ansValSelectHeight = c.tempDivs.ctAnsVal.offsetHeight;
  c.defaultAnsHeight = ctAnsMargin.h - 2;
  c.reducedAnswHeight = c.defaultAnsHeight - 4;
  c.inputBorderWidth = Math.max(
  dojo.position(c.tempDivs.ctAnsSelect).w -
  dojo.contentBox(c.tempDivs.ctAnsSelect).w,4);

  c.ansValWidth = c.answersColWidth - c.tempDivs.image.offsetWidth
  - (dojo.style(c.tempDivs.ctAnsVal, "paddingLeft") +
  dojo.style(c.tempDivs.ctAnsVal, "paddingRight"))
  - (dojo.style(c.tempDivs.ctAnsVal, "borderLeft") +
  dojo.style(c.tempDivs.ctAnsVal, "borderRight"))
  - Math.ceil((ctAnsMargin.w - ctAnsContent.w)/2);


  var answerInputWidth = c.ansValWidth - c.inputBorderWidth;
  var marginHeight = Math.ceil((ctAnsMargin.h - ctAnsContent.h)/2);

  var numericInputWidth = (answerInputWidth - c.tempDivs.numAns.offsetWidth - c.inputBorderWidth) / 2;

  c.ansValInputHeight = c.tempDivs.strAns.offsetHeight;
  c.marginTopStringAns = ((c.ansValSelectHeight
           - c.ansValInputHeight + marginHeight) / 2);

  c.ansValTextHeight = c.tempDivs.textAns.offsetHeight;
  var marginTopBoolAns = (c.ansValSelectHeight - c.ansValTextHeight + marginHeight) / 2;

  var cssStart = "px;}.matrix-container ";
  // NOTE: both ans-str-val-eval and ans-num-val-eval are given the same value as
  // they both contain input fields (as opposed to drop down and text)
  c.cssText.append(".matrix-container .ans-eval{height:")
                                  .append(c.reducedAnswHeight)
    .append(cssStart + ".ans-eval-with-menu{height:")
                       .append(c.fullAnswerHeight - 1)
    .append(cssStart + ".ans-val-eval{width:")
                                  .append(c.ansValWidth)
    .append(cssStart + ".ans-str-val-eval{border-top:1px solid #F4F5F9;margin-top:")
                                .append(c.marginTopStringAns)
    .append(cssStart + ".ans-num-val-eval{margin-top:")
                                .append(c.marginTopStringAns)
    .append(cssStart + ".ans-bool-val-eval{margin-top:")
                                .append(marginTopBoolAns - 4)
    .append(cssStart + ".ans-str-val-eval-with-menu{margin-top:")
                                .append(c.marginTopStringAns + 5)
    .append(cssStart + ".ans-num-val-eval-with-menu{margin-top:")
                                .append(c.marginTopStringAns + 5)
    .append(cssStart + ".ans-bool-val-eval-with-menu{margin-top:")
                                .append(marginTopBoolAns)
    .append(cssStart + ".answer-input-eval{width:")
                                .append(answerInputWidth)
    .append(cssStart + ".numeric-input-eval{width:")
                                .append(numericInputWidth)
    .append(cssStart + ".default-q-height-eval{height:")
                                .append(c.reducedAnswHeight)
    .append(cssStart + ".default-q-height-eval div.qt-text{padding-top:8.5")
                                .append(c.reducedAnswHeight)
    .append(cssStart + "..default-q-height-eval .number-text{padding-top:9.5")
                                .append(c.reducedAnswHeight)
    .append(cssStart + ".default-q-height-boolean-eval{height:")
                                .append((c.reducedAnswHeight*2) +1)
    .append(cssStart + ".default-q-height-boolean-eval div.qt-text{padding-top:25")
    .append(cssStart + ".default-q-height-boolean-eval .number-text{padding-top:26")
    .append("px;}");
  this.defaultDimensionsSet = true;
  },

  // Resync the numbers in the number column after a question has been added or deleted.
  resyncNumbers : function() {
  var count = 0;
  var num;
  for ( var i = 0; i < this.questions.count; i++) {
  num = this.questions.getObjectByIndex(i).number;
  curam.matrix.util.initButtonListeners(num.node);
  num.text.innerHTML = ++count;
  }
  },

  setDefaultNumberDimensions: function() {
  curam.matrix.Constants.container.numTextHeight = curam.matrix.Constants.container.tempDivs.numHeight;
  },

  addQuestion: function(qDetails) {
  //<div id="ql-Q1" class="bottom-left-eval id-eval">
  var qLeft = dojo.create('div', {
  id: 'ql-'+qDetails[0],
  "class": 'bottom-left-eval '+qDetails[0]+'-eval'
  });

  qLeft.appendChild(this.createNumber(qDetails));
  qLeft.appendChild(this.createQuestionText(qDetails));
  qLeft.appendChild(this.createAnsGroup(qDetails));

  var newQuestion = new curam.matrix.QuestionLeft(qLeft);
  this.node.appendChild(newQuestion.node);
  this.questions.add('ql-'+qDetails[0], newQuestion);
  return newQuestion.setDimensions();
  },

  getQuestion: function(id) {
  if(id.indexOf("ql-") < 0) {
  id = "ql-" + id;
  }
  return this.questions.getObjectByKey(id);
  },

  createNumber: function(qDetails) {
  //<div id="num-Q1" class="number number-col-eval q-ct-eval-id" >
//      <div class="number-text number-text-id-eval">1</div>
  //</div>
  var firstClass = qDetails[1] == 'boolean' ?
  'default-q-height-boolean-eval ' : 'default-q-height-eval ';
  var num = dojo.create('div', {
  id: 'num-'+qDetails[0],
  "class": firstClass + 'number number-col-eval q-ct-eval-' + qDetails[0]
  });
  var numText = dojo.create('div', {
  innerHTML: "1",
  "class": 'number-text number-text-' + qDetails[0]+'-eval'
  }, num);

  return num;
  },

  createQuestionText: function(qDetails) {
  //<div id="ques-Q1" class="q-ct q-ct-eval-id qt-col-eval">
//    <div class="default-q-height-eval qt-text qt-text-id-eval">
//      <a title="Question text">
//        Question text
//      </a>
//    </div>
  //</div>
  var firstClass = qDetails[1] == 'boolean' ?
           "default-q-height-boolean-eval" : "default-q-height-eval";
  var ques = dojo.create('div', {
  id: 'ques-'+qDetails[0],
  "class": firstClass+' q-ct q-ct-eval-'+qDetails[0]+' qt-col-eval'
  });
  var quesText = dojo.create('div', {
  "class": 'qt-text qt-text-'+qDetails[0]+'-eval'
  }, ques);
  var quesAnchor = dojo.create('a', {
  title: qDetails[2],
  innerHTML: qDetails[2]
  }, quesText);
  return ques;
  },

  createAnsGroup: function(qDetails) {
  // <div id="ans-group-Q1" class="q-ct q-ct-eval-id ans-col-eval">
  var ansGroup = dojo.create('div', {
  id: 'ans-group-'+qDetails[0],
  "class": 'q-ct q-ct-eval-'+qDetails[0]+' ans-col-eval'
  });
  ansGroup.appendChild(this.createAnswer(qDetails[0], qDetails[1], 1));
  if (qDetails[1] == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) {
  ansGroup.appendChild(this.createAnswer(qDetails[0], qDetails[1], 2));
  }
  return ansGroup;
  },

  createAnswer: function(qId, ansType, ansId, options) {
  //<div id="ans-Q1-1" class="ans-col-eval ans-eval ans-id-eval">
//    <div id="ans-val-Q1-1" class="ans-val ans-val-eval ans-ct-val ans-id-val-eval">
  var ansTypeClass;

  var borderClass = ansId == 1 ? '' : 'ans';
  var optMenu = '';
  if (ansId == 1 && curam.matrix.Constants.container.existingQuestionIds.indexOf(qId) == 0) {
  optMenu = '-with-menu';
  }
  if (ansType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) { ansTypeClass = 'ans-bool-val-eval' + optMenu; }
  else if (ansType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) { ansTypeClass = 'ans-num-val-eval' + optMenu; }
  else if (ansType == curam.matrix.Constants.ANSWER_TYPE_STRING) { ansTypeClass = 'ans-str-val-eval' + optMenu; }
  else { ansTypeClass = 'ans-ct-val' + optMenu; }

  var ans = dojo.create('div', {
  id: 'ans-'+qId+'-'+ansId,
  "class": borderClass+' ans-col-eval ans-eval' + optMenu + ' ans-'+qId+'-eval'
  });
  var ansVal = dojo.create('div', {
  id: 'ans-val-'+qId+'-'+ansId,
  "class":'ans-val ans-val-eval '+ansTypeClass+' ans-'+qId+'-val-eval'
  }, ans);
  var input;
  var id = this.matrix.inputPrefix+'value.s.s.'+qId+'.'+ansId;

  if (ansType == curam.matrix.Constants.ANSWER_TYPE_BOOLEAN) {
  var text = ansId == 1 ? curam.matrix.Constants.container.i18nMsgs.booleanTrue : curam.matrix.Constants.container.i18nMsgs.booleanFalse;
  ansVal.appendChild(document.createTextNode(text));
  input = dojo.create('input', {
  type: "hidden",
  id: id,
  name: id,
  value: text
  }, ansVal);
  } else if (ansType == curam.matrix.Constants.ANSWER_TYPE_NUMERIC) {
  var specValDiv = dojo.create('div', {
  title: curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,
  "class":' label-specific-value'
  });

  specValDiv.appendChild(document.createTextNode( curam.matrix.Constants.container.i18nMsgs.labelSpecificValue + ': '));
  ansVal.appendChild(specValDiv);
  input = curam.matrix.util.createInput('text');
  dojo.attr(input, {
  id: id,
  name: id,
  title: curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,
  value: '',
  "class": 'numeric-input-eval'
  });
  dojo.place(input, ansVal);
  } else if (ansType == curam.matrix.Constants.ANSWER_TYPE_STRING) {
  input = curam.matrix.util.createInput('text');
  dojo.attr(input, {
  id: id,
  name: id,
  value: '',
  "class": 'answer-input-eval'
  });
  dojo.place(input, ansVal);
  } else {
  var select = input = dojo.create('select', {
  id: id,
  name: id,
  "class": 'answer-input-eval'
  });

  if (ansType == curam.matrix.Constants.ANSWER_TYPE_CODETABLE) {
  if(options != null) {
  var opt;
  for(var count = 0; count < options.length; count++) {
  opt = new Option(options[count]['text'], options[count]['value']);
  try {
  select.add(opt, null); //standards compliant, doesn't work in IE7
  } catch(e) {
  select.add(opt); //IE7 only
  }
  }
  }
  } else {
  // if ansType is not boolean, string or numeric it represents a codetable and its actual value is the codetable name.
  var holder = new AJAXCall(select).doRequest('getCodeTable', [ansType], false, true);
  }
  dojo.place(select, ansVal);
  }
  curam.util.connect(input, "onfocus", function(){
  curam.matrix.Constants.container.matrix.cf(arguments);
  });
  var button = dojo.create('div', {
  "class": "image"
  }, ans);

  return ans;
  }

});

});

},
'url:dijit/templates/MenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n",
'curam/matrix/ScoreGroup':function(){
// wrapped by build app
define("curam/matrix/ScoreGroup", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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
 * 20-Feb-2012  MV [CR00302081] Modularize code.
 */

dojo.provide("curam.matrix.ScoreGroup");

//************************************************
// ScoreGroup
//************************************************
dojo.declare("curam.matrix.ScoreGroup", null, {
  constructor: function(node) {
    this.node = node;
    this.scores = new curam.ListMap();

    var childNodes = this.node.childNodes;
    for (var i=0; i<childNodes.length; i++) {
      if (childNodes[i].nodeType == 1 ) {
        this.scores.add(childNodes[i].id, new curam.matrix.Score(childNodes[i]));
      }
    }
  }
});

//************************************************
// Score
//************************************************
dojo.declare("curam.matrix.Score", null, {
  constructor: function(node) {
    this.node = node;
    this.scoreValidation = dojo.query("> :first-child", node)[0];
    this.input = dojo.query("> :first-child", this.scoreValidation)[0];
    curam.matrix.util.makeNumericInput(this.input);
  },

  adjustFirstRowClass: function(initialClass) {
    var clName = dojo.attr(this.node, "class");
    if (clName.indexOf('ans-eval-with-menu') == -1) {
      clName = clName.replace('ans-eval', 'ans-eval-with-menu');
      cm.setClass(this.node, clName);
    }
    clName = dojo.attr(this.scoreValidation, "class");
    if (clName.indexOf('ans-str-val-eval-with-menu') == -1) {
      clName = clName.replace('ans-str-val-eval', 'ans-str-val-eval-with-menu');
      cm.setClass(this.scoreValidation, clName);
    }
  }
});

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
'curam/matrix/PriorityGroup':function(){
// wrapped by build app
define("curam/matrix/PriorityGroup", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.PriorityGroup");

//************************************************
//1PriorityGroup
//************************************************
dojo.declare("curam.matrix.PriorityGroup", null,
{
  constructor: function(node, matrix) {
  this.node = node;
  this.priorities = new curam.ListMap();
  this.matrix = matrix;
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  this.priorities.add(childNodes[i].id,
          new curam.matrix.Priority(childNodes[i], matrix,
          this));
  }
  }
  },
  addPriority: function(node) {
  if(node.nodeType == 1) {
  this.priorities.add(node.id,
  new curam.matrix.Priority(node, this.matrix, this));
  this.node.appendChild(node);
  }
  }
});
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
'curam/util/BitSet':function(){
define("curam/util/BitSet", [], function() {
  
  //The curam.util.BitSet object wraps a set of bits that can be set, 
  //unset, and checked. 
  var BitSet = dojo.declare("curam.util.BitSet", null, {
      _idCounter: 0,
      
      constructor: function() {
                    this.value = [];
                    
                    //this.max is used to track the max position that has been set or unset in
                    //the BitSet.  Other code can use this to assign unique identifiers to 
                    //individual controls.
                    this.max = -1;
                    this.log2 = Math.log(2);
                    this.id = ++curam.util.BitSet.prototype._idCounter;
                  },
      
      //Sets one bit in the bitset.  Returns true if the bitset has been changed,
      //and false if it already had that bit set
      set: function(position) {
        this.max = Math.max(this.max, position);
        //perform a bitwise AND operation
        var pos = this._getPos(position, true);
        var oldVal = this.value[pos];
        this.value[pos] = this.value[pos] | this._pow(position);
        
        return oldVal != this.value[pos];
      }, 
      
      //Unets one bit in the bitset.  Returns true if the bitset has been changed,
      //and false if it already had that bit cleared.
      unSet: function(position) {
        this.max = Math.max(this.max, position);
        //perform a bitwise XOR operation
        var pos = this._getPos(position, false);
        if(pos < 0) {
          return;
        }
        var oldVal = this.value[pos];
        this.value[pos] = this.value[pos] & (~this._pow(position));
        
        if(this.value[pos] == 0 && pos == this.value.length -1) {
          this.value.splice(pos, 1);
          return true;
        }
        return oldVal != this.value[pos]; 
      },
      
      isSet: function(position) {
        var pos = this._getPos(position, false);
        return pos > -1 && ((this._pow(position) & this.value[pos]) > 0);
      },
      
      isClear: function() {
        for(var count = 0; count < this.value.length; count++) {
          if(this.value[count] > 0) {
            return false;
          }
        }
        return true;
      },
      
      //Returns true if exactly one bit is set. False otherwise.
      isSingleSet: function() {
        var log;
        var prevSet = false;
        for(var count = 0; count < this.value.length; count++) {
          if(this.value[count] == 0) {
            continue;
          }
          log = Math.log(this.value[count])/this.log2;
          if(log == Math.floor(log) && !prevSet) {
            prevSet = true;
          } else {
            return false;
          }
        }
        return prevSet;
      },
      
      equals: function(bitset) {
        if(!bitset || this.value.length != bitset.value.length) {
          return false;
        }
        var maxLength = Math.max(this.value.length, bitset.value.length);
        
        for(var count = 0; count < maxLength; count++) {
          if(bitset.value[count] != this.value[count]) {
            return false;
          }        
        }
        return true;
      },
      
      _getPos: function(position, init) {
        var pos = Math.floor(Number(position) / 31);
        while(init && this.value.length <= pos) {
          this.value[this.value.length] = 0;
        }
        return (this.value.length <= pos ? -1 : pos);
      },
      
      _pow: function(position) {
        return Math.pow(2, Number(position) % 31);
      }
  });
  
  return BitSet;
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
'url:dijit/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n",
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
'curam/matrix/TopLeft':function(){
// wrapped by build app
define("curam/matrix/TopLeft", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TopLeft");

dojo.require("curam.matrix.Constants");
var domGeom = dojo.require("dojo.dom-geometry");


//************************************************
//1TopLeft
//************************************************
dojo.declare("curam.matrix.TopLeft", null,
//TODO: a lot of the properties might never be used.
{
  // Classes set:             .top-eval{height}
//                            .top-top-eval{height}
//                            .top-bottom-eval{height}
//                            .column-eval{height}
//                            .top-left-eval{width}
//                            .top-left-filler-eval{height}
//                            .number-col-eval{width}
//                            .qt-col-eval{width}
//                            .ans-col-eval{width}
  // Object Variables Set:    curam.matrix.Constants.container.leftMatrixWidth
//                            curam.matrix.Constants.container.questionColWidth


  constructor: function() {
  this.node = dojo.byId('top-left');

  this.topLeftTop = dojo.byId('top-left-top');
  this.columnIDA = dojo.byId('column-id-a');
  this.columnIDAText = dojo.query("> :first-child", this.columnIDA)[0];
  this.columnIDB = dojo.byId('column-id-b');
  this.columnIDBText = dojo.query("> :first-child", this.columnIDB)[0];

  this.topLeftBottom = dojo.byId('top-left-bottom');
  this.headingQuestion = dojo.byId('heading-questions');
  this.headingQuestionText = dojo.query("> :first-child", this.headingQuestion)[0];
  this.headingAnswerValues = dojo.byId('heading-answers');
  this.headingAnswerValuesText =
     dojo.query("> :first-child", this.headingAnswerValues)[0];

  },

  // Determine the width of the columns, Number, Question and Answer
  // Values which make up the left side of the Matrix i.e. the non
  // horizontal scrollable section of the Matrix. The widths are based
  // on text size.
  // Use temp Divs to check width.
  setDimensions: function() {
  var columnHeight = this.columnIDA.clientHeight;
  var topTopHeight = columnHeight + (curam.matrix.Constants.MATRIX_BORDER_SIZE * 2);
  var topBottomHeight = columnHeight + curam.matrix.Constants.MATRIX_BORDER_SIZE;
  this.height = topTopHeight + topBottomHeight;
  var c = curam.matrix.Constants.container;

  this.width = c.questionColWidth + c.answersColWidth +
                                     (curam.matrix.Constants.MATRIX_BORDER_SIZE * 2);
  // curam.matrix.Constants.MATRIX_BORDER_SIZE * 2 represents the left and right border on the
  // number column
  c.leftMatrixWidth = this.width + c.tempDivs.numWidth +
                                      (curam.matrix.Constants.MATRIX_BORDER_SIZE * 2);

  // TODO: Add a comment for this.
  this.topLeftFillerHeight = columnHeight
  + domGeom.getMarginBoxSimple(this.headingQuestion).h + 2;
  // TODO: add a comment for this.

  c.cssText
  .append(".matrix-container .qt-col-eval{width:" +
                            c.questionColWidth+"px;}")
  .append(".matrix-container .top-eval{height:")
  .append(this.height)
  .append("px;}.matrix-container .top-top-eval{height:")
  .append(topTopHeight)
  .append("px;}.matrix-container .top-bottom-eval{height:")
  .append(topBottomHeight)
  .append("px;}.matrix-container .column-eval{height:")
  .append(columnHeight)
  .append("px;}.matrix-container .top-left-eval{width:")
  .append(this.width)
  .append("px;}.matrix-container .top-left-filler-eval{height:")
  .append(this.topLeftFillerHeight)
  .append("px;}.matrix-container .number-col-eval{width:")
  .append(c.tempDivs.numWidth)
  .append("px;}.matrix-container .ans-col-eval{width:")
  .append(c.answersColWidth)
  .append("px;}");
  }
});

});

},
'curam/matrix/TopRightTop':function(){
// wrapped by build app
define("curam/matrix/TopRightTop", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.TopRightTop");

dojo.require("curam.matrix.Constants");

//************************************************
//1TopRightTop
//************************************************

dojo.declare("curam.matrix.TopRightTop", null, {
  constructor: function ()
  {
  this.node = dojo.byId('top-right-top');
  this.priorityCol = null;
  this.priorityColText = null;
  this.scoreCol = null;
  this.scoreColText = null;
  this.contradictionCol = null;
  this.outcomeCols = new curam.ListMap();
  this.priorityWidgetCreated = false;
  this.scoreWidgetCreated = false;

  this.matrix = curam.matrix.Constants.container.matrix;

  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1) {
  if (childNodes[i].id == 'column-id-pri') {
  this.priorityCol = childNodes[i];
  this.priorityColText = dojo.query("> :first-child", this.priorityCol)[0];
  this.priorityCol._conn = dojo.connect(this.priorityCol, "onclick", this, "createPriorityButtonWidget");
  } else if (childNodes[i].id == 'column-id-scr') {
  this.scoreCol = childNodes[i];
  this.scoreColText = dojo.query("> :first-child", this.scoreCol)[0];
  this.scoreCol._conn = dojo.connect(this.scoreCol, "onclick", this, "createScoreButtonWidget");
  } else if (childNodes[i].id == 'column-id-contr') {
  this.contradictionCol = new curam.matrix.ContradictionColumn(childNodes[i], false);
  } else {
  this.outcomeCols.add(childNodes[i].id,
  new curam.matrix.OutcomeColumn(childNodes[i], false));
  }
  }
  }
  },

  createPriorityButtonWidget: function(event) {
  var c = curam.matrix.Constants.container;
  if (this.priorityWidgetCreated){
  return;
  }
  dojo.disconnect(this.priorityCol._conn);
  var widget = new curam.widget.PriorityButton(
  { menuId:'PriorityOptions',
  id:this.priorityCol.id
  }, this.priorityCol);
  curam.util.connect(widget.domNode, "onmouseover", function(evt){
  _mov(evt);
  });
  this.matrix.initHighlighters(true, false);
  widget._toggleMenu('PriorityOptions', event);
  this.priorityCol = widget.domNode;
  this.priorityColText = dojo.query("> :first-child", this.priorityCol)[0];
  this.priorityWidgetCreated = true;
  dijit.byId("PriorityOptions")._openMyself(event);
  },

  createScoreButtonWidget: function(event) {
  var c = curam.matrix.Constants.container;
  if (this.scoreWidgetCreated){
  return;
  }
  var widget = new curam.widget.ScoreButton(
  { menuId:'ScoreOptions',
  id:this.scoreCol.id
  }, this.scoreCol);
  curam.util.connect(widget.domNode, "onmouseover", function(evt){
  _mov(evt);
  });
  this.matrix.initHighlighters(false, true);
  widget._toggleMenu('ScoreOptions', event);
  this.scoreCol = widget.domNode;
  this.scoreColText = dojo.query("> :first-child", this.scoreCol)[0];
  this.scoreWidgetCreated = true;
  dojo.disconnect(this.scoreCol._conn);
  dijit.byId("ScoreOptions")._openMyself(event);
  },

  // e.g. from column-id-O1 to O1
  getOutcomeColIds: function() {
  var key;
  var arr = new Array();
  var regExp = /^column-id-/;
  for (var i=0; i<this.outcomeCols.count; i++) {
  key = this.outcomeCols.getKeyByIndex(i);
  key = new String(key);
  arr.push(key.replace(regExp, ''));
  }
  return arr;
  },

  resyncLetters: function() {
  var count = 0;
  var childNodes = this.node.childNodes;

  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  if (count <= 23) {
  dojo.query("div", childNodes[i])[0].innerHTML = curam.matrix.Constants.columnLetters[count];
  } else {
  dojo.query("div", childNodes[i])[0].innerHTML = curam.matrix.Constants.columnLetters[count % 23] + Math.floor(count/23);
  }
  count++;
  }
  }
  },

  addPriority: function() {
  var previousAvailable = dijit.byId('column-id-pri');
  if (previousAvailable) { previousAvailable.destroy(); }
  var column = dojo.create('div', {
  id: 'column-id-pri',
  "class": 'column-id column-eval pri-col-eval',
  innerHTML: '<div>C</div>'
  }, this.node, 'first');
  this.priorityCol = column;
  this.priorityColText = dojo.query("> :first-child", this.priorityCol)[0];
  this.priorityCol._conn = dojo.connect(this.priorityCol, "onclick", this, "createPriorityButtonWidget");

  curam.matrix.util.initButtonListeners(column);
  this.resyncLetters();
  },


  addScore: function() {
  // <div id="column-id-scr" class="column-id column-eval pri-col-eval"><div>D</div></div>
  var pos = this.matrix.priorityExists ? 1 : 0;
  var previousAvailable = dijit.byId('column-id-scr');
  if (previousAvailable) { previousAvailable.destroy(); }
  var column = dojo.create('div', {
  id: 'column-id-scr',
  "class": 'column-id column-eval pri-col-eval',
  innerHTML: '<div>D</div>'
  }, this.node, pos);
  this.scoreCol = column;
  this.scoreColText = dojo.query("> :first-child", this.scoreCol)[0];
  this.scoreCol._conn = dojo.connect(this.scoreCol, "onclick", this, "createScoreButtonWidget");

  curam.matrix.util.initButtonListeners(column);

  this.resyncLetters();
  },


  addContradiction: function() {
  // <div id="column-id-contr" class="column-id column-eval contr-col-eval">
//     <div>E</div>
//     <input type="hidden" name="__o3dmx.MODIFY.dtls$matrixResult.contrcombid." id="__o3dmx.MODIFY.dtls$matrixResult.contrcombid." value=""/>
  // </div>
  var pos = 0;
  var c = curam.matrix.Constants.container;
  if (this.matrix.priorityExists) pos++;
  if (this.matrix.scoreExists) pos++;

  var column = dojo.create('div', {
  id: 'column-id-contr',
  "class": 'column-id column-eval contr-col-eval'
  }, this.node, pos);
  var letter = dojo.create('div', {}, column);
  column.appendChild(this.addContrCombIdInput(1));
  for (var i = 0; i < c.locales.length; i++) {
  if (c.locales[i] == "") { continue; }
  column.appendChild(this.addContrCombMessageInput(1, c.locales[i], ''));
  }
  this.contradictionCol = new curam.matrix.ContradictionColumn(column, true);

  curam.matrix.util.initButtonListeners(column);

  this.resyncLetters();
  },

  addContrCombIdInput: function(combId) {
  // <input type="hidden" name="__o3dmx.MODIFY.dtls$matrixResult.contrcombid.1" id="__o3dmx.MODIFY.dtls$matrixResult.contrcombid.1" value=""/>
  var id = this.matrix.inputPrefix + 'contrcombid.' + combId;
  return dojo.create('input', {
  id: id,
  name: id,
  type: "hidden"
  });
  },


  addContrCombMessageInput: function(combId, locale, msg) {
  // <input type="hidden" name="__o3dmx.MODIFY.dtls$matrixResult.contrmsg.en.1" id="__o3dmx.MODIFY.dtls$matrixResult.contrmsg.en.1" value=""/>
  var id = this.matrix.inputPrefix+'contrmsg.'+locale+'.'+combId;
  return dojo.create('input', {
  id: id,
  name: id,
  type: "hidden"
  });
  },


  addOutcomeColumn: function(outcomeDetails) {
  // <div id="column-id-O1" class="column-id column-eval out-O1-col-eval">
//     <div>F</div>
//     <input type="hidden" name="__o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.C1" id="__o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.C1" value=""/>
  // </div>
  var column = dojo.create('div', {
  id: 'column-id-'+outcomeDetails[0],
  "class": 'column-id column-eval out-'+outcomeDetails[0]+'-col-eval'
  }, this.node, 'last');
  var letter = dojo.create('div', {}, column);
  column.appendChild(this.addOutCombIdInput(outcomeDetails[0], 1));
  var newOutCol = new curam.matrix.OutcomeColumn(column, true);
  this.outcomeCols.add(newOutCol.node.id, newOutCol);
  this.resyncLetters();
  return newOutCol.setDimensions(outcomeDetails[0]);
  },

  addOutCombIdInput: function(outId, combId) {
  // <input type="hidden" name="__o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.C1" id="__o3dmx.MODIFY.dtls$matrixResult.outcombid.O1.C1" value=""/>
  var id = this.matrix.inputPrefix+'outcombid.'+outId+'.'+combId;
  return dojo.create('input', {
  id: id,
  name: id,
  type: "hidden",
  value: "1" + (new Date()).getTime()
  });
  },

  deletePriorityColumn: function() {
  dojo.destroy(this.priorityCol);
  this.priorityCol = null;
  this.priorityColText = null;
  },

  deleteScoreColumn: function() {
  dojo.destroy(this.scoreCol);
  this.scoreCol = null;
  this.scoreColText = null;
  },

  deleteContradictionColumn: function() {
  dojo.destroy(this.contradictionCol.node);
  this.contradictionCol = null;
  },

  deleteOutcomeColumn: function(id) {
  dojo.destroy(this.outcomeCols.getObjectByKey(id).node);
  this.outcomeCols.removeByKey(id);
  }

});

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
'curam/matrix/QuestionText':function(){
// wrapped by build app
define("curam/matrix/QuestionText", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.QuestionText");

dojo.require("curam.matrix.Constants");

//************************************************
//1QuestionText
//************************************************
dojo.declare("curam.matrix.QuestionText", null, {
  constructor: function(node)
  {
  this.node = node;
  this.text = dojo.query("> :first-child", node)[0];
  this.originalTextHeight = null;
  //TODO: not sure if the below is needed.
  //this.minimumHeight = 0;
  },

  // Classes set:  .qt-text-id-eval{padding-top}
  //
  verticallyCenterText: function(height, questionId) {
  if (this.originalTextHeight == null) {
  this.originalTextHeight = dojo.contentBox(this.text).h;
  }
  var paddingTop = (height/2) - (this.originalTextHeight/2);
  curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .")
    .append("q-ct .qt-text-")
    .append(questionId).append("-eval")
    .append("{padding-top:").append(paddingTop).append("px;}");
  }
});


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
'curam/matrix/BottomLeftFiller':function(){
// wrapped by build app
define("curam/matrix/BottomLeftFiller", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.BottomLeftFiller");

//************************************************
//BottomLeftFiller
//************************************************
dojo.declare("curam.matrix.BottomLeftFiller", null, {
  constructor: function()
  {
  this.node = dojo.byId('bottom-left-filler');
  this.bottomLeftFillerMain = dojo.byId('bottom-left-filler-main');
  this.bottomLeftNumberFiller = dojo.byId('bottom-left-filler-number');
  },
  // Classes Set:    .bottom-left-filler-eval{height}
//                   .bottom-left-number-filler-eval{height}

  setDimensions: function() {
  this.height = curam.matrix.Constants.container.scrollBarWidth;

  curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-filler-eval{height:").append(this.height)
    .append("px;}.matrix-container .bottom-left-number-filler-eval{height:")
    .append(this.height).append("px;}");
  }
});

});

},
'curam/matrix/QuestionRight':function(){
// wrapped by build app
define("curam/matrix/QuestionRight", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.QuestionRight");

dojo.require("curam.matrix.Constants");

//************************************************
//1QuestionRight
//************************************************

//The order of nodes in QuestionRight is Priority,
//Score, Contradiction, outcomes. The number of
//outcomes is variable, hence the while loop.
dojo.declare("curam.matrix.QuestionRight", null, {
  constructor: function(node, matrix) {
  this.node = node;
  this.matrix = matrix;
  this.qId = this.node.id.replace("qr-","");
  this.priorityGroup = null;
  this.scoreGroup = null;
  this.contradiction = null;
  this.outcomeGroup = new curam.ListMap();
  
  var currentElement = dojo.query("> :first-child", node)[0];
  if (this.matrix.priorityExists) {
  this.priorityGroup = new curam.matrix.PriorityGroup(currentElement,
                                         this.matrix);
  currentElement = cm.nextSibling(currentElement);
  }
  if (this.matrix.scoreExists) {
  this.scoreGroup = new curam.matrix.ScoreGroup(currentElement);
  currentElement = cm.nextSibling(currentElement);
  }
  if (this.matrix.contradictionsExist) {
  this.contradiction = new curam.matrix.Contradiction(currentElement);
  currentElement = cm.nextSibling(currentElement);
  }
  if (this.matrix.outcomesExist) {
  while (currentElement != null) {
  //TODO: im not sure if the id of the node is the best thing to store
  //the node against. Maybe just the outcome id itself would be better.
  this.outcomeGroup.add(currentElement.id,
             new curam.matrix.Outcome(currentElement));
  currentElement = cm.nextSibling(currentElement);
  }
  }
  },
  refreshContradictions: function() {
  if(!this.contradiction) {
  return;
  }
  
  this.contradiction = new curam.matrix.Contradiction(this.contradiction.node);
  },
  
  refreshOutcomes: function() {
  if(!this.outcomeGroup) {
  return;
  }
  
  var oldOutcomes = this.outcomeGroup;
  this.outcomeGroup = new curam.ListMap();
  
  for(var count = 0; count < oldOutcomes.keys.length; count ++) {
  var key = oldOutcomes.keys[count];
  this.outcomeGroup.add(key, new curam.matrix.Outcome(
                    oldOutcomes.getObjectByKey(key).node));
  }
  },
  
  // Classes Set:         .pri-eval-id{margin-top}
  //
  positionPriority: function(ansGroup) {
  if (ansGroup.ansHeightGreaterThanDefault) {
  var marginTop = (ansGroup.ansHeight / 2) -
       (curam.matrix.Constants.container.ansValInputHeight / 2);
  curam.matrix.Constants.container.cssText.append(".matrix-container .pri-eval-")
      .append(this.qId).append("{margin-top:")
      .append(marginTop).append("px;}");
  }
  },
  
  // Classes Set:         .cbox-eval-id{top}
  positionCombinationCells: function(ansGroup) {
  var c = curam.matrix.Constants.container;
  if (ansGroup.ansHeightGreaterThanDefault) {
  var top = (ansGroup.ansHeight - c.cboxHeight -
  c.cboxOffsetDiff) / 2;
  c.cssText.append(".matrix-container .cbox-eval-")
      .append(this.qId).append("{top:")
      .append(top).append("px;}");
  }
  },
  
  addAnswer: function() {
  var c = curam.matrix.Constants.container;
  var bottomRight = c.matrix.bottomRight;
  var ql = c.matrix.getQuestion(this.qId);
  var firstQl = c.matrix.bottomLeft.bottomLeftMain
  .questions.getObjectByIndex(0);
  var lastAddedAnswerId = ql.ansGroup.getLastAddedAnswerId();
  var firstQuestion = ql.node.id == firstQl.node.id ? true : false;
  var outId;
  
  if (this.matrix.priorityExists) {
  this.priorityGroup.addPriority(
  bottomRight.addPriority(this.qId, lastAddedAnswerId, false));
  }
  if (this.matrix.scoreExists) {
  this.scoreGroup.node.appendChild(
  bottomRight.addScore(this.qId, lastAddedAnswerId, false));
  }
  if (this.matrix.contradictionsExist) {
  // NOTE: firstRow, i.e. the last parameter has to be false because the user can never add the first answer to a question.
  this.contradiction.node.appendChild(bottomRight.addContradictionRow(
         this.qId, lastAddedAnswerId, firstQuestion, false));
  this.refreshContradictions();
  }
  if (this.matrix.outcomesExist) {
  for (var i=0; i<this.outcomeGroup.count; i++) {
  outId = c.matrix.topRight.topRightTop.outcomeCols.getObjectByIndex(i).outId;
  this.outcomeGroup.getObjectByIndex(i).node.appendChild(bottomRight
             .addOutcomeRow(outId, this.qId,
                   lastAddedAnswerId, firstQuestion, false));
  }
  this.refreshOutcomes();
  }
  },
  
  deleteAnswer: function(firstAns, ansId) {
  var cell;
  if (this.matrix.priorityExists) {
  var priId = 'pri-'+this.qId+'-'+ansId;
  this.priorityGroup.priorities.removeByKey(priId);
  if (firstAns) {
  dojo.removeClass(this.priorityGroup.priorities
   .getObjectByIndex(0).node, 'ans');
  }
  dojo.destroy(dojo.byId(priId));
  }
  if (this.matrix.scoreExists) {
  var scrId = 'scr-'+this.qId+'-'+ansId;
  this.scoreGroup.scores.removeByKey(priId);
  if (firstAns) {
  dojo.removeClass(this.scoreGroup.scores
  .getObjectByIndex(0).node, 'ans');
  }
  dojo.destroy(dojo.byId(scrId));
  }
  if (this.matrix.contradictionsExist) {
  var contrRowId = 'contr-row-'+this.qId+'-'+ansId;
  this.contradiction.rows.removeByKey(contrRowId);
  if (firstAns) {
  var cells = this.contradiction.rows.getObjectByIndex(0).cells;
  for (var i=0; i<cells.count; i++) {
  cell = cells.getObjectByIndex(i).node;
  dojo.addClass(cell, 'cell-first-row');
  if (i == cells.count-1) {
  dojo.removeClass(cell, 'cell-last-col');
  dojo.addClass(cell, 'cell-no-border');
  } else {
  dojo.removeClass(cell, 'cell');
  }
  }
  }
  dojo.destroy(dojo.byId(contrRowId));
  }
  if (this.matrix.outcomesExist) {
  var outRowId, curOutGrp, outId, regExp = /.*-/;
  
  var safeSplit = curam.matrix.util.safeSplit;
  
  for (var count=0; count<this.outcomeGroup.count; count++) {
  curOutGrp = this.outcomeGroup.getObjectByIndex(count);
  outId = safeSplit(curOutGrp.node.id,"-")[1];
  outRowId = 'out-'+outId+'-row-'+this.qId+'-'+ansId;
  curOutGrp.rows.removeByKey(outRowId);
  for (var j=0; j<curOutGrp.rows.getObjectByIndex(0).cells.count; j++) {
  cell = curOutGrp.rows.getObjectByIndex(0).cells.getObjectByIndex(j).node;
  dojo.addClass(cell, 'cell-first-row');
  if (j == curOutGrp.rows.getObjectByIndex(0).cells.count-1) {
  dojo.removeClass(cell, 'cell-last-col');
  dojo.addClass(cell, 'cell-no-border');
  } else {
  dojo.removeClass(cell, 'cell');
  }
  }
  dojo.destroy(dojo.byId(outRowId));
  }
  }
  },
  
  //returns the number of contradictions in this question
  getContradictionCount: function() {
  var firstRow = this.contradiction.rows.getObjectByIndex(0);
  if(firstRow) {
  return firstRow.cells.count;
  }
  return 0;
  },
  
  getOutcome: function(outcomeID) {
  return this.outcomeGroup.getObjectByKey("out-" + outcomeID + "-"
                            + this.qId);
  }
});

});

},
'curam/util':function(){
/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2012,2013. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
 * Modification History
 * --------------------
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
            geom, json, attr, lang, on) {

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
  */
  replaceSubmitButton: function(name) {
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
    }
  });

  return curam.util;
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
'curam/matrix/BottomRight':function(){
// wrapped by build app
define("curam/matrix/BottomRight", ["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"], function(dijit,dojo,dojox){
dojo.provide("curam.matrix.BottomRight");

dojo.require("curam.matrix.Constants");

//************************************************
//1BottomRight
//************************************************
dojo.declare("curam.matrix.BottomRight", null,
{
  constructor: function(matrix) {
  this.node = dojo.byId('bottom-right');
  this.matrix = matrix;
  this.questions = new curam.ListMap();
  
  var childNodes = this.node.childNodes;
  for (var i=0; i<childNodes.length; i++) {
  if (childNodes[i].nodeType == 1 ) {
  this.questions.add(childNodes[i].id,
   new curam.matrix.QuestionRight(childNodes[i], this.matrix));
  }
  }
  },
  // Classses set:    .bottom-right-eval{width}
  //
  setDimensions: function() {
  var currentQuestion, qLeftAnsGroup;
  var ansGroup;
  
  for (var i=0; i<this.questions.count; i++) {
  currentQuestion = this.questions.getObjectByIndex(i);
  ansGroup = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(currentQuestion.qId).ansGroup;
  currentQuestion.positionPriority(ansGroup);
  currentQuestion.positionCombinationCells(ansGroup);
  }
  this.setWidth();
  },
  
  setWidth: function() {
  var c = curam.matrix.Constants.container;
  c.cssText.append(".matrix-container .bottom-right-eval{width:")
    .append(c.matrix.topRight.width + c.scrollBarWidth).append("px;}");
  },
  
  addQuestion: function(qDetails) {
  //<div id="qr-Q1" class="id-eval right-eval">
  var question = dojo.create('div', {
  id: 'qr-'+qDetails[0],
  "class": 'right-eval '+qDetails[0]+'-eval '
  });
  
  var firstQuestion = this.questions.count == 0 ? true : false;
  
  if (this.matrix.priorityExists) {
  question.appendChild(this.addPriorityGroup(qDetails[0], qDetails[1]));
  }
  if (this.matrix.scoreExists) {
  question.appendChild(this.addScoreGroup(qDetails[0], qDetails[1]));
  }
  if (this.matrix.contradictionsExist) {
  question.appendChild(this.addContradiction(qDetails[0], qDetails[1], null, firstQuestion));
  }
  if (this.matrix.outcomesExist) {
  var outcomeIds = curam.matrix.Constants.container.matrix.topRight.topRightTop.getOutcomeColIds();
  for (var i=0; i<outcomeIds.length; i++) {
  question.appendChild(this.addOutcome(outcomeIds[i], qDetails[0], qDetails[1], null, firstQuestion));
  }
  }
  
  var newQuestion = new curam.matrix.QuestionRight(question, this.matrix);
  this.node.appendChild(newQuestion.node);
  this.questions.add('qr-'+qDetails[0], newQuestion);
  },
  
  addPriorityGroup: function(qId, qType, ansIds) {
  // <div id="pri-group-Q1" class="q-ct pri-col-eval q-ct-eval-id">
  var previousAvailable = dijit.byId('pri-group-'+qId);
  if (previousAvailable) { previousAvailable.destroy(); }
  var priGroup = dojo.create('div', {
  id: 'pri-group-'+qId,
  "class": 'q-ct pri-col-eval q-ct-eval-'+qId
  });
  
  if (ansIds == null) {
  priGroup.appendChild(this.addPriority(qId, 1, true));
  if (qType == ANSWER_TYPE_BOOLEAN) {
  priGroup.appendChild(this.addPriority(qId, 2, false));
  }
  } else {
  var firstPriority;
  for (var i=0; i<ansIds.length; i++) {
  firstPriority = i == 0 ? true : false;
  priGroup.appendChild(this.addPriority(qId, ansIds[i], firstPriority));
  }
  }
  return priGroup;
  },
  
  addPriority: function(qId, ansId, firstPriority) {
  //<div id="pri-Q1-1" class="ans-eval ans-id-eval pri-col-eval">
  //  <div id="pri-val-Q1-1" class="pri-val pri-val-eval ans-str-val-eval pri-eval-id">
  //    <input id="inputPrefix.priority.s.s.1044835113549955072.2" name="" type="text" value="priority" class="pri-input-eval" />
  //  </div>
  //</div>
  var className = !firstPriority ? 'ans' : '';
  var optionalMenu = (firstPriority
  && (curam.matrix.Constants.container.existingQuestionIds.indexOf(qId) == 0)) ? '-with-menu' : '';
  var priority = dojo.create('div', {
                      id: 'pri-'+qId+'-'+ansId,
                      "class": className+' ans-eval' + optionalMenu + ' ans-'+qId+'-eval pri-col-eval'
  });
  var priVal = dojo.create('div', {
                    id: 'pri-val-'+qId+'-'+ansId,
                    "class": 'pri-val pri-val-eval ans-str-val-eval' + optionalMenu + ' pri-eval-'+qId
                   }, priority);
  var input = curam.matrix.util.createInput('text');
  var id = this.matrix.inputPrefix+'priority.s.s.'+qId+'.'+ansId;
  dojo.attr(input, {
     id: id,
     name: id,
     "class": 'pri-input-eval'
  });
  priVal.appendChild(input);
  
  return priority;
  },
  
  addScoreGroup: function(qId, qType, ansIds) {
  //<div id="scr-group-Q1" class="q-ct pri-col-eval q-ct-eval-id">
  var previousAvailable = dijit.byId('scr-group-' + qId);
  if (previousAvailable) { previousAvailable.destroy(); }
  var scrGroup = dojo.create('div', {
  id: 'scr-group-' + qId,
  "class": 'q-ct pri-col-eval q-ct-eval-'+qId
  });
  
  if (ansIds == null) {
  scrGroup.appendChild(this.addScore(qId, 1, true));
  if (qType == ANSWER_TYPE_BOOLEAN) {
  scrGroup.appendChild(this.addScore(qId, 2, false));
  }
  } else {
  var firstScore;
  for (var i=0; i<ansIds.length; i++) {
  firstScore = i == 0 ? true : false;
  scrGroup.appendChild(this.addScore(qId, ansIds[i], firstScore));
  }
  }
  return scrGroup;
  },
  
  addScore: function(qId, ansId, firstScore) {
  //<div id="scr-Q1-1" class="ans-eval ans-id-eval pri-col-eval">
  //<div id="scr-val-Q1-1" class="pri-val pri-val-eval ans-str-val-eval pri-eval-id">
  //  <input id="inputPrefix.score.s.s.1044835113549955072.2" name="" type="text" value="" class="pri-input-eval" />
  //</div>
  //</div>
  var className = !firstScore ? 'ans' : '';
  var optionalMenu = (firstScore
  && (curam.matrix.Constants.container.existingQuestionIds.indexOf(qId) == 0)) ? '-with-menu' : '';
  var score = dojo.create('div', {
  id: 'scr-'+qId+'-'+ansId,
  "class": className+' ans-eval' + optionalMenu + ' ans-'+qId+'-eval pri-col-eval'
  });
  var scrVal = dojo.create('div', {
  id: 'scr-val-'+qId+'-'+ansId,
  "class": 'pri-val pri-val-eval ans-str-val-eval' + optionalMenu + ' pri-eval-'+qId
  }, score);
  var input = curam.matrix.util.createInput('text');
  var id = this.matrix.inputPrefix+'score.s.s.'+qId+'.'+ansId;
  dojo.attr(input, {
  id: id,
  name: id,
  "class": 'pri-input-eval'
  });
  dojo.place(input, scrVal);
  
  curam.matrix.util.makeNumericInput(input);
  return score;
  },
  
  addContradiction: function(qId, qType, ansIds, firstQuestion) {
  // <div id="contr-group-id" class="q-ct q-ct-eval-id contr-col-eval">
  
  var contrGrp = dojo.create('div', {
  id: 'contr-group-'+qId,
  "class": 'q-ct q-ct-eval-'+qId+' contr-col-eval'
  });
  
  if (ansIds == null) {
  contrGrp.appendChild(this.addContradictionRow(qId, 1, firstQuestion, true));
  if (qType == ANSWER_TYPE_BOOLEAN) {
  contrGrp.appendChild(this.addContradictionRow(qId, 2, firstQuestion, false));
  }
  } else {
  var firstRow;
  for (var i=0; i<ansIds.length; i++) {
  firstRow = i == 0 ? true : false;
  contrGrp.appendChild(this.addContradictionRow(qId, ansIds[i], firstQuestion, firstRow));
  }
  }
  return contrGrp;
  },
  
  addContradictionRow: function(qId, ansId, firstQuestion, firstRow) {
  //<div id="contr-row-Q1-1" class="contr-col-eval">
  
  var contrRow = dojo.create('div', {
  id: 'contr-row-'+qId+'-'+ansId,
  "class": 'contr-col-eval'
  });
  var combIds = curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.getCombColumnIds();
  var lastCell;
  
  for (var i=0; i<combIds.length; i++) {
  lastCell = i == combIds.length-1 ? true : false;
  contrRow.appendChild(this.addContradictionCell(qId, ansId, combIds[i], firstQuestion, firstRow, lastCell));
  }
  return contrRow;
  },
  
  addContradictionCell: function(qId, ansId, cellId, firstQuestion, firstRow, lastCell) {
  // <div id="contr-cell-Q1-1-1" class="cell-first-row ans-eval ans-id-eval">
  //   <input id="" name="" type="checkbox" class="cbox-eval contr-cbox-eval cbox-eval-id"/>
  //   <div class="image"/>
  //   <!-- NOTE: for the div element the class can be "image" or "hidden-image" -->
  // </div>
  var className;
  var optMenu = '';
  if (curam.matrix.Constants.container.existingQuestionIds.indexOf(qId) == 0 && firstRow) {
  optMenu = '-with-menu';
  }
  if (firstRow && lastCell) {
  className = 'cell-first-row cell-no-border';
  } else if (firstRow) {
  className = 'cell-first-row';
  }
  else if (lastCell) { className = 'cell-last-col'; }
  else { className = 'cell'; }
  
  var contrCell = dojo.create('div', {
  id: 'contr-cell-'+qId+'-'+ansId+'-'+cellId,
  "class": className + ' ans-eval' + optMenu
  });
  
  var id = this.matrix.inputPrefix + 'contrCell.'
  + cellId + '.s.'
  + qId + '.' + ansId;
  var input = dojo.create('input', {
  id: id,
  type: "checkbox",
  name: id,
  "class": 'cbox-eval' + optMenu + ' contr-cbox-eval',
  onclick: function(evt) {
  curam.matrix.Constants.container.matrix.setContradictionValue(cellId, evt.target, evt, qId);
  return true;
  }
  }, contrCell);
  
  className = firstQuestion && firstRow ? 'image' : 'hidden-image';
  var image = dojo.create('div', {
  "class": className
  }, contrCell);
  
  return contrCell;
  },
  
  addOutcome: function(outId, qId, qType, ansIds, firstQuestion) {
  //<div id="out-O1-Q1" class="q-ct q-ct-eval-id out-id-col-eval">
  
  var outGrp = dojo.create('div', {
  id: 'out-'+outId+'-'+qId,
  "class": 'q-ct q-ct-eval-'+qId+' out-'+outId+'-col-eval'
  });
  
  if (ansIds == null) {
  outGrp.appendChild(this.addOutcomeRow(outId, qId, 1, firstQuestion, true));
  if (qType == ANSWER_TYPE_BOOLEAN) {
  outGrp.appendChild(this.addOutcomeRow(outId, qId, 2, firstQuestion, false));
  }
  } else {
  var firstRow;
  for (var i=0; i<ansIds.length; i++) {
  firstRow = i == 0 ? true : false;
  outGrp.appendChild(this.addOutcomeRow(outId, qId, ansIds[i],
                firstQuestion, firstRow));
  }
  }
  return outGrp;
  },
  
  addOutcomeRow: function(outId, qId, ansId, firstQuestion, firstRow) {
  //<div id="out-O2-row-Q1-2" class="out-O2-col-eval">
  
  var outRow = dojo.create('div', {
  id: 'out-'+outId+'-row-'+qId+'-'+ansId,
  "class": 'out-'+outId+'col-eval'
  });
  
  var columnId = 'column-id-'+outId;
  var combIds = curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols
  .getObjectByKey(columnId).getCombColumnIds();
  
  var lastCell;
  for (var i=0; i<combIds.length; i++) {
  lastCell = i == combIds.length-1 ? true : false;
  outRow.appendChild(this.addOutcomeCell(outId, qId, ansId, combIds[i],
                        firstQuestion, firstRow, lastCell));
  }
  return outRow;
  },
  
  addOutcomeCell: function(outId, qId, ansId, cellId, firstQuestion, firstRow, lastCell) {
  // <div id="out-O1-cell-Q1-3-1" class="cell ans-eval ans-Q1-eval out-O1-cell-eval">
  //   <input type="checkbox" id="__o3dmx.MODIFY.dtls$matrixResult.out.O1.Q1.3.1" name="" class="cbox-eval out-O1-cbox-eval cbox-eval-Q1"/>
  //   <div class="image"></div>
  // </div>
  
  var className;
  var optMenu = '';
  if (curam.matrix.Constants.container.existingQuestionIds.indexOf(qId) == 0 && firstRow) {
  optMenu = '-with-menu';
  }
  if (firstRow && lastCell) {
  className = 'cell-first-row cell-no-border';
  } else if (firstRow) {
  className = 'cell-first-row';
  }
  else if (lastCell) { className = 'cell-last-col'; }
  else { className = 'cell'; }
  
  var outCell = dojo.create('div', {
  id: 'out-'+outId+'-cell-'+qId+'-'+ansId+'-'+cellId,
  "class": className+' ans-eval' + optMenu + ' ans-' + qId
              + '-eval out-' + outId + '-cell-eval'
  });
  
  var inputId = this.matrix.inputPrefix + 'outCell.' + outId + '.' + qId
                + '.' + ansId + '.' + cellId;
  var input = dojo.create('input', {
  type: "checkbox",
  id: inputId,
  name: inputId,
  "class": 'cbox-eval'+ optMenu + ' out-' + outId + '-cbox-eval cbox-eval-'+qId,
  onclick: function(e) {
  thisWidget.matrix.setOutcomeValue(outId, Number(cellId), e.target, e);
  return true;
  }
  }, outCell);
  
  var thisWidget = this;
  
  className = firstQuestion && firstRow ? 'image' : 'hidden-image';
  var image = dojo.create('div', {
  "class": className
  }, outCell);
  
  return outCell;
  },
  
  addPriorityColumn: function() {
  var qLeft, curQ;
  for (var i=0; i<this.questions.count; i++) {
  qLeft = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(
                   this.questions.getObjectByIndex(i).qId);
  curQ = this.questions.getObjectByIndex(i);
  curQ.priorityGroup = new curam.matrix.PriorityGroup(
  this.addPriorityGroup(curQ.qId, qLeft.ansGroup.answerType,
                        qLeft.ansGroup.getAnswerIds()),
                        this.matrix);
  dojo.place(curQ.priorityGroup.node,
         this.questions.getObjectByIndex(i).node, 'first');
  }
  this.setWidth();
  },
  
  addScoreColumn: function() {
  var qLeft;
  var pos = this.matrix.priorityExists ? 1 : 0;
  for (var i=0; i<this.questions.count; i++) {
  qLeft = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(
                    this.questions.getObjectByIndex(i).qId);
  curQ = this.questions.getObjectByIndex(i);
  curQ.scoreGroup = new curam.matrix.ScoreGroup(this.addScoreGroup(
                 curQ.qId, qLeft.ansGroup.answerType,
                 qLeft.ansGroup.getAnswerIds()));
  dojo.place(curQ.scoreGroup.node,
            this.questions.getObjectByIndex(i).node, pos);
  }
  this.setWidth();
  },
  
  addContradictionColumn: function() {
  var qLeft, firstQ, newContr, curQ;
  var pos = 0;
  if (this.matrix.priorityExists) pos++;
  if (this.matrix.scoreExists) pos++;
  
  var questions = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions;
  var parentNode;
  
  for (var i=0; i<this.questions.count; i++) {
  firstQ = i == 0 ? true : false;
  qLeft = questions
  .getObjectByKey('ql-'+this.questions.getObjectByIndex(i).qId);
  curQ = this.questions.getObjectByIndex(i);
  newContr = this.addContradiction(curQ.qId, qLeft.ansGroup.answerType,
                      qLeft.ansGroup.getAnswerIds(), firstQ);
  curQ.contradiction = new curam.matrix.Contradiction(newContr);
  parentNode = this.questions.getObjectByIndex(i).node;
  dojo.place(newContr, parentNode,
  pos + (parentNode.firstChild && parentNode.firstChild.nodeName=="#comment" ? 1 : 0));
  }
  },
  
  addOutcomeColumn: function(outcomeDetails) {
  var qLeft, firstQ, newOut, curQ;
  for (var i=0; i<this.questions.count; i++) {
  firstQ = i == 0 ? true : false;
  qLeft = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions
  .getObjectByKey('ql-'+this.questions.getObjectByIndex(i).qId);
  curQ = this.questions.getObjectByIndex(i);
  newOut = this.addOutcome(outcomeDetails[0], curQ.qId,
  qLeft.ansGroup.answerType,
  qLeft.ansGroup.getAnswerIds(), firstQ);
  curQ.outcomeGroup.add(newOut.id, new curam.matrix.Outcome(newOut));
  dojo.place(newOut, this.questions.getObjectByIndex(i).node, 'last');
  }
  },
  
  //Add a new contradiction column, and returns the column Id.
  addContradictionCombination: function() {
  var qLeft, firstQ, rows, firstRow, ansIds, row, cell, newCell;
  var combinationCount = ++curam.matrix.Constants.container.matrix.topRight.topRightTop
                         .contradictionCol.combinationCount;
  
  for (var i=0; i<this.questions.count; i++) {
  qLeft = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions
  .getObjectByKey('ql-'+this.questions.getObjectByIndex(i).qId);
  ansIds = qLeft.ansGroup.getAnswerIds();
  firstQ = i == 0 ? true : false;
  rows = this.questions.getObjectByIndex(i).contradiction.rows;
  for (var j=0; j<rows.count; j++) {
  row = rows.getObjectByIndex(j);
  cell = row.cells.getObjectByIndex(row.cells.count-1).node;
  firstRow = j == 0 ? true : false;
  this.resetCellClassForSecondLastColumn(cell, firstRow);
  newCell = this.addContradictionCell(qLeft.qId, ansIds[j],
                   combinationCount, firstQ, firstRow, true);
  row.cells.add(newCell.id, new curam.matrix.ContradictionCell(newCell));
  row.node.appendChild(newCell);
  }
  }
  return combinationCount;
  },
  
  resetCellClassForSecondLastColumn: function(cell, firstRow) {
  var className = firstRow ? 'cell-first-row' : 'cell';
  if (firstRow) {
  dojo.removeClass(cell, "cell-no-border");
  } else {
  dojo.removeClass(cell, "cell-last-col");
  }
  dojo.addClass(cell, className);
  },
  
  resetCellClassForLastColumn: function(cell, firstRow) {
  if (firstRow) {
  dojo.addClass(cell, "cell-no-border");
  } else {
  dojo.removeClass(cell, "cell");
  dojo.addClass(cell, "cell-last-col");
  }
  },
  
  addOutcomeCombination: function(outCol, id) {
  var outId = id.replace('column-id-', '');
  var qLeft, firstQ, rows, firstRow, ansIds, row, cell, newCell;
  var combinationCount = ++curam.matrix.Constants.container.matrix.topRight.topRightTop
           .outcomeCols.getObjectByKey(id).combinationCount;
  for (var i=0; i<this.questions.count; i++) {
  qLeft = curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions
  .getObjectByKey('ql-'+this.questions.getObjectByIndex(i).qId);
  ansIds = qLeft.ansGroup.getAnswerIds();
  firstQ = i == 0 ? true : false;
  rows = this.questions.getObjectByIndex(i).outcomeGroup
          .getObjectByKey('out-'+outId+'-'+qLeft.qId).rows;
  
  for (var j=0; j<rows.count; j++) {
  row = rows.getObjectByIndex(j);
  cell = row.cells.getObjectByIndex(row.cells.count-1).node;
  firstRow = j == 0 ? true : false;
  this.resetCellClassForSecondLastColumn(cell, firstRow);
  newCell = this.addOutcomeCell(outId, qLeft.qId, ansIds[j],
                  combinationCount, firstQ, firstRow, true);
  row.cells.add(newCell.id, new curam.matrix.OutcomeCell(newCell));
  row.node.appendChild(newCell);
  }
  }
  return combinationCount;
  },
  
  addButtonClassToFirstRow: function() {
  var cells, cell, outcome;
  var question = this.questions.getObjectByIndex(0);
  if(!question) {return;}
  var firstAnswer = 
  this.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0).getAnswer(1);
  if (firstAnswer) {
  firstAnswer.adjustFirstRowStyle();
  }
  if (this.matrix.contradictionsExist) {
  cells = question.contradiction.rows.getObjectByIndex(0).cells;
  for (var j=0; j<cells.count; j++) {
  cells.getObjectByIndex(j).adjustFirstRowClass();
  cells.getObjectByIndex(j).setButtonClass("image");
  }
  }
  if (this.matrix.outcomesExist) {
  for (var i=0; i<question.outcomeGroup.count; i++) {
  outcome = question.outcomeGroup.getObjectByIndex(i);
  cells = outcome.rows.getObjectByIndex(0).cells;
  for (var j=0; j<cells.count; j++) {
  cells.getObjectByIndex(j).adjustFirstRowClass();
  cells.getObjectByIndex(j).setButtonClass("image");
  }
  }
  }
  if (this.matrix.priorityExists) {
  var firstPriority = question.priorityGroup.priorities.getObjectByIndex(0);
  firstPriority.adjustFirstRowClass();
  }
  if (this.matrix.scoreExists) {
  var firstScore = question.scoreGroup.scores.getObjectByIndex(0);
  firstScore.adjustFirstRowClass();
  }
  },
  
  deletePriorityColumn: function() {
  var question;
  for (var j=0; j<this.questions.count; j++) {
  question = this.questions.getObjectByIndex(j);
  dojo.destroy(question.priorityGroup.node);
  question.priorityGroup = null;
  }
  },
  
  deleteScoreColumn: function() {
  var question;
  for (var j=0; j<this.questions.count; j++) {
  question = this.questions.getObjectByIndex(j);
  dojo.destroy(question.scoreGroup.node);
  question.scoreGroup = null;
  }
  },
  
  deleteContradictionColumn: function() {
  var question;
  for (var j=0; j<this.questions.count; j++) {
  question = this.questions.getObjectByIndex(j);
  dojo.destroy(question.contradiction.node);
  question.contradiction = null;
  }
  },
  
  deleteOutcomeColumn: function(id) {
  var question, outGroup, outGroupId;
  for (var j=0; j<this.questions.count; j++) {
  question = this.questions.getObjectByIndex(j);
  outGroupId = 'out-'+id+'-'+question.qId;
  outGroup = question.outcomeGroup.getObjectByKey(outGroupId);
  dojo.destroy(outGroup.node);
  question.outcomeGroup.removeByKey(outGroupId);
  }
  },
  
  checkIfLastContrCombColumn: function(id) {
  var firstQfirstRowCells = this.questions.getObjectByIndex(0).contradiction
                   .rows.getObjectByIndex(0).cells;
  var numCols = firstQfirstRowCells.count;
  
  if (firstQfirstRowCells.getIndexByKey(id) == numCols-1)
  return true;
  return false;
  },
  
  checkIfLastOutCombColumn: function(outId, cellId) {
  var firstQ = this.questions.getObjectByIndex(0);
  var outGrpId = 'out-'+outId+'-'+firstQ.qId;
  var firstQfirstRowCells = firstQ.outcomeGroup.getObjectByKey(outGrpId)
                 .rows.getObjectByIndex(0).cells;
  var numCols = firstQfirstRowCells.count;
  
  if (firstQfirstRowCells.getIndexByKey(cellId) == numCols-1)
  return true;
  return false;
  },
  
  deleteContradictionCombination: function(combId, isLastCombColumn) {
  var cellId, curQ, curRow, rowId, firstRow, curCell;
  
  for (var j=0; j<this.questions.count; j++) {
  curQ = this.questions.getObjectByIndex(j);
  // loop all rows in each question.
  for (var i=0; i<curQ.contradiction.rows.count; i++) {
  firstRow = i == 0 ? true : false;
  curRow = curQ.contradiction.rows.getObjectByIndex(i);
  cellId = curRow.node.id.replace('-row-', '-cell-');
  cellId += '-'+combId;
  curCell = curRow.cells.getObjectByKey(cellId);
  
  if(!curCell) {
  continue;
  }
  
  dojo.destroy(curCell.node);
  curRow.cells.removeByKey(cellId);
  
  if (isLastCombColumn) {
  this.resetCellClassForLastColumn(curRow.cells.getObjectByIndex(
                      curRow.cells.count-1).node, firstRow);
  }
  }
  }
  },
  
  deleteOutcomeCombination: function(outId, combId, isLastCombColumn) {
    var cellId, curQ, outGrp, curRow, rowId, firstRow;
    
    for (var j=0; j<this.questions.count; j++) {
      curQ = this.questions.getObjectByIndex(j);
      outGrp = curQ.outcomeGroup.getObjectByKey('out-'+outId+'-'+curQ.qId);
      
      // loop all rows in each question.
      for (var i=0; i<outGrp.rows.count; i++) {
        firstRow = i == 0 ? true : false;
        curRow = outGrp.rows.getObjectByIndex(i);
        cellId = curRow.node.id.replace('-row-', '-cell-')+'-'+combId;
        
        dojo.destroy(curRow.cells.getObjectByKey(cellId).node);
        curRow.cells.removeByKey(cellId);
        
        if (isLastCombColumn) {
          this.resetCellClassForLastColumn(curRow.cells.getObjectByIndex(
                curRow.cells.count-1).node, firstRow);
        }
      }
    }
  }
});

});

},
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

}}});
define("dojo/decisionMatrix_all", [], 1);
