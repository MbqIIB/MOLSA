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
define(["curam/util",
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

