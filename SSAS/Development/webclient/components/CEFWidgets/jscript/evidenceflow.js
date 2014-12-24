/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 /*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
 
/* Modifications
 * -------------
 * 05-Oct-2012 BD [CR00346180] Dojo 1.7 Upgrade 
 */
require(["dojox/storage", "curam/util/UimDialog", "curam/tab"]);

var EvidenceFlow = {

  /**
   *  Saves the Cover currently in focus in the flex widget on page unload.
   *  The storage of this information in on a per case basis and leverages
   *  dojox storage functionality.
   */
  saveInFocusCover : function() {

    var flexApp = EvidenceFlow.getFlexApp('EvidenceFlow');
    var caseID = flexApp.getCaseID();

    var accordEvType = flexApp.getInFocusCover();

    if(accordEvType.length != 0){
      // Need to escape the minus sign on any case id because the minus sign
      // causes the key to be invalid.
      var escapedCaseID = caseID.replace("-", "_");

      var key = "ef_" + escapedCaseID;

      dojox.storage.put(key, accordEvType);
    }


  },

  /**
   *  Retrieves the Cover that was in focus in the Flex widget the last time
   *  this page was unloaded.
   *
   * @param caseID
   *          The case id related to the evidence being displayed in the
   *          evidence flow widget. This is the unique identifier used
   *          for the storage and retrieval of the cover in focus information.
   *
   * @return The cover that was in focus the last time the page was unloaded.
   *         This information is in the form 'AccordionName|CoverID'.
   */
  retrievePreviousInFocusCover : function(caseID) {

    // Need to escape the minus sign on any case id because the minus sign
    // causes the key to be invalid.
    var escapedCaseID = caseID.replace("-", "_");

    var key = "ef_" + escapedCaseID;

    try{
      dojox.storage.manager.addOnLoad(
        function(){EvidenceFlow.setPreviousView(key)});

     }catch(e){
       EvidenceFlow.sendPreviousVewToWidget(null);
     }

  },

  /**
   * Retrieves the cover that was previously in view from the local storage,
   * and forwards this information onto the Flex widget.
   *
   * @param key The key for the cover information in the local storage.
   */
  setPreviousView : function(key) {

    var coverInFocus = dojox.storage.get(key);

    EvidenceFlow.sendPreviousVewToWidget(coverInFocus);

  },

  /**
   * Sends the Flex widget the cover to be displayed on loading.
   *
   * @param coverInFocus The ocver to be displayed when the widget is loaded.
   */
  sendPreviousVewToWidget : function (coverInFocus) {

    var flexApp = EvidenceFlow.getFlexApp('EvidenceFlow');
    flexApp.restoreView(coverInFocus);
  },

  /**
   * Retrieves the element containing the Flex application embedded in the
   * current page.
   *
   * @param flexApp
   *          The name of the element conatining the Flex Application.
   *
   * @param The element containing the Flex Application.
   */
  getFlexApp : function (flexApp) {

    if (window.document[flexApp])
    {
      return window.document[flexApp];
    }

    if (navigator.appName.indexOf("Microsoft Internet")==-1)
    {
      if (document.embeds && document.embeds[flexApp])
        return document.embeds[flexApp];
    }
    else
    {
      return document.getElementById(flexApp);
    }
  },

  /**
   * Launches a UIM in a modal, and displays the error message provided.
   *
   * @param errorMsg
   *          The localized error message to be displayed to the user.
   *
   */
  reportError : function(errorMsg) {

    var url = "EvidenceFlow_errorPage.do?o3frame=modal&errorMsg=" + encodeURIComponent(errorMsg);

        curam.util.UimDialog.openUrl(url);
  },

  /* Constructs a modal url with a return parameter of the
      current page in the content frame and then opens the url in a modal. */
  constructAndOpenModalURL:function(url) {

    /*
     * Get a handle to the iframe that is in the content pane
     */
    var iframe = curam.tab.getContentPanelIframe();

    /*
     * Get the page targeted in the href of the iframe
     */
    var rpuValue = EvidenceFlow.getLastPathSegmentWithQueryString(
      iframe.contentWindow.location.href);

    /*
     * Construct the target URL from the URL passed in (the
     * target page) with a return value of the page in the frame
     */
    var targetURL = url + "&__o3rpu="
      + encodeURIComponent(rpuValue);

    /*
     * Open the page in the modal dialog
     */
    curam.util.UimDialog.openUrl(targetURL);
  },

  getLastPathSegmentWithQueryString:function(url) {
    var pathAndParams = url.split("?");
    var pathComponents = pathAndParams[0].split("/");
    return pathComponents[pathComponents.length - 1]
      + (pathAndParams[1] ? "?" + pathAndParams[1] : "");
  },



  /**
   * Calls the path resolver responsible for handling EvidenceFlow requests and
   * sends it the add stack path. The syntax of the path used is:
   *
   *     '/smartpanel/data/evidenceflow/addstack/[stackXML]'
   *
   * @param stackXML
   *          The XML representation of the stack to be added.
   *
   * @return the id of the newly created stack or the error code if an error
   *         occurred.
   */
  addStack : function(stackXML) {

   // Escape the XML string, the '/' character causes the path resolver some
   // issues, this will need to be unescaped in the resolver itself.
   var escStackXML = stackXML.replace(new RegExp(/\//g), "|");
   
   escStackXML = encodeURIComponent(escStackXML);

   var returnVal = "";

   // Set the servel url including the path for the add stack functionality.
   var servletURL =
        '/Curam/servlet/PathResolver' +
        "?r=j&p=" + "/smartpanel/data/evidenceflow/addstack["
        + escStackXML + "]";

   // Initiate the Post request, setting the IOArgs so the data is handled as
   // JSON, and the request is synchronous.
   dojo.xhrPost({
        url: servletURL,
        headers: { "Content-Type": "text/json; charset=UTF-8"},
        handleAs: 'json',
        sync: true,
        load: function(response, ioargs){
           // assign the newly created stack's id for returning.
           returnVal = response.stackID;
        },
        error: function(error, ioargs) {

          // Add the error to the log.
          log("Error invoking the PathResolverServlet : " + error + " ioargs: "
            + ioargs);

           // Assign the error code to be returned
           returnVal = "ERROR_CODE_101";
        }
      });

     // Return the result of the xhrPost request.
     return returnVal;
  },

  /**
   * Calls the path resolver responsible for handling EvidenceFlow requests and
   * sends it the modify stack path. The syntax of the path used is:
   *
   *     '/smartpanel/data/evidenceflow/modifystack/[stackXML]'
   *
   * @param stackXML
   *          The XML representation of the stack to be modified.
   *
   * @return the version number of the modified stack or the error code if an
   *         error occurred.
   */
  modifyStack : function(stackXML) {

   // Escape the XML string, the '/' character causes the path resolver some
   // issues, this will need to be unescaped in the resolver itself.
   var escStackXML = stackXML.replace(new RegExp(/\//g), "|");
   
   escStackXML = encodeURIComponent(escStackXML);

   var returnVal = "";

   // Set the servel url including the path for the modify stack functionality.
   var servletURL =
        '/Curam/servlet/PathResolver' +
        "?r=j&p=" + "/smartpanel/data/evidenceflow/modifystack["
        + escStackXML + "]";

   // Initiate the Post request, setting the IOArgs so the data is handled as
   // JSON, and the request is synchronous.
   dojo.xhrPost({
        url: servletURL,
        headers: { "Content-Type": "text/json; charset=UTF-8" },
        handleAs: 'json',
        sync: true,
        load: function(response, ioargs){

          // Return the modified stacks version number.
          returnVal = response.versionNo;
        },
        error: function(error, ioargs) {

          // Add the error to the log.
          log("Error invoking the PathResolverServlet : " + error + " ioargs: "
            + ioargs);

           // Assign the error code to be returned
           returnVal = "ERROR_CODE_102";
        }
      });

     // Return the result of the xhrPost request.
     return returnVal;
  },

  /**
   * Calls the path resolver responsible for handling EvidenceFlow requests and
   * sends it the remove stack path. The syntax of the path used is:
   *
   *     '/smartpanel/data/evidenceflow/removestack/[stackXML]'
   *
   * @param stackXML
   *          The XML representation of the stack to be removed.
   *
   * @return the removal successful message or the error code if an error
   *         occurred.
   */
  removeStack : function(stackXML) {

   // Escape the XML string, the '/' character causes the path resolver some
   // issues, this will need to be unescaped in the resolver itself.
   var escStackXML = stackXML.replace(new RegExp(/\//g), "|");
   
   escStackXML = encodeURIComponent(escStackXML);
   
   var returnVal = "";

   // Set the servel url including the path for the remove stack functionality.
   var servletURL =
        '/Curam/servlet/PathResolver' +
        "?r=j&p=" + "/smartpanel/data/evidenceflow/removestack["
        + escStackXML + "]";

   // Initiate the Post request, setting the IOArgs so the data is handled as
   // JSON, and the request is synchronous.
   dojo.xhrPost({
        url: servletURL,
        headers: { "Content-Type": "text/json; charset=UTF-8" },
        handleAs: 'json',
        sync: true,
        load: function(response, ioargs){

          // Assign the removal successful message.
           returnVal="REMOVAL_SUCCESSFUL";
        },
        error: function(error, ioargs) {

          // Add the error to the log.
          log("Error invoking the PathResolverServlet : " + error + " ioargs: "
            + ioargs);

           // Assign the error code to be returned
           returnVal = "ERROR_CODE_103";
        }
      });

     // Return the result of the xhrPost request.
     return returnVal;
  },

  /**
   * Calls the path resolver responsible for handling EvidenceFlow requests and
   * sends it the ping path. The syntax of the path used is:
   *
   *     '/smartpanel/data/evidenceflow/ping/[caseID][timeStamp]'
   *
   * @param caseID
   *          The id of the case being displayed in the EvidenceFlow widget.
   *
   * @param timeStamp
   *          The time stamp for the data currently being displayed in the
   *          EvidenceFlow widget.
   *
   * @return an error mesasage if an error occurred during the ping process, no
   *         update required message if no update is required or the latest data
   *         in the form of an XML string if an update is required.
   *
   */
 ping : function(caseID, timeStamp) {

   // Set the servel url including the path for the remove stack functionality.
   var servletURL =
        '/Curam/servlet/PathResolver' +
        "?r=j&p=" + "/smartpanel/data/evidenceflow/ping[" + caseID + "]["
        + timeStamp +"]";

   var returnVal = "";

   // Initiate the Post request, setting the IOArgs so the data is handled as
   // JSON, and the request is synchronous.
   dojo.xhrPost({
        url: servletURL,
        headers: { "Content-Type": "text/json" },
        handleAs: 'json',
        sync: true,
        load: function(response, ioargs){

          // Assign the removal successful message.
           returnVal = response.updateRequired;
        },
        error: function(error, ioargs) {

          // Add the error to the log.
          log("Error invoking the PathResolverServlet : " + error + " ioargs: "
            + ioargs);

           // Assign the error code to be returned
           returnVal = "ERROR_CODE_104";
        }
      });

    // If the ping result has returned stating that an data in the EvidenceFlow
    // widget needs to be updated, then attempt to retrieve the information.
    if(returnVal == "true")
    {
      servletURL =
        '/Curam/servlet/PathResolver' +
        "?r=j&p=" + "/smartpanel/data/evidenceflow/retrievedataxml["
        + caseID + "]";

      dojo.xhrPost({
        url: servletURL,
        headers: { "Content-Type": "text/json" },
        handleAs: 'json',
        sync: true,
        load: function(response, ioargs){

          // Assign the removal successful message.
           returnVal = response.dataXML;
        },
        error: function(error, ioargs) {

          // Add the error to the log.
          log("Error invoking the PathResolverServlet : " + error + " ioargs: "
            + ioargs);

           // Assign the error code to be returned
           returnVal = "ERROR_CODE_105";
        }
      });

    }

     // Return the result of the xhrPost request.
     return returnVal;
  }

}