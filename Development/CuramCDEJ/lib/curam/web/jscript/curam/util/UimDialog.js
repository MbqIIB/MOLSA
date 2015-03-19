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

define(["curam/util/RuntimeContext",
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
