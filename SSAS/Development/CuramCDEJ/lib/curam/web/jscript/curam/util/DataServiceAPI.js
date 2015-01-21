/*
 * Copyright 2012-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/**
 * @name curam.util.DataServiceAPI
 * @namespace API for using the Data Service within Curam.
 *
 * Public API for using the Curam Data Service to interact with the web tier to
 * send and|or receive data.
 */
define(["curam/util/Request",
        "curam/define",
        "curam/debug",
        "curam/util/ResourceBundle"
        ], function(curamRequest) {
 
/*
 * Modification History
 * --------------------
 * 11-Apr-2014  MV  [CR00424825] Move to common AJAX request API.
 * 26-Jun-2013  BOS [CR00390466] Adding requireLocalization to specifically
 *                include required bundle.
 * 09-Oct-2012  BOS [CR00346368] Localized debug messages to console.
 * 02-May-2012  MK  [CR00323691] Use new Dojo AMD format.
 * 14-Mar-2012  KW  [CR00310069] Dojo test framework works in quirks mode on IE,
 *                  so removed use of native json code.
 * 10-Nov-2011  KW  [TEC-8166] Initial Version
 */

/**
 * Creating Resource Bundle Object to access localized resources.
 */ 
dojo.requireLocalization("curam.application", "Debug");
var bundle = new curam.util.ResourceBundle("Debug");
  
curam.define.singleton("curam.util.DataServiceAPI", 
/**
 * @lends curam.util.DataServiceAPI.prototype
 */
{   
    /** 
     * Construct an ajax Get request. The params will be encoded and appended to
     * the Path, constructed from the page id.
     *
     * @param {String} page
     *        UIM page ID, used to construct the request path.
     * @param {Object} params
     *        Parameters values to be sent with request. Expected format is,
     *        { name:"value", ... }.
     * @param {Function} success
     *        Callback function to run if the request returns successfully.
     * @param {Function} error
     *        Callback function to run if the request fails.
     * @param {Function} load
     *        Callback called regardless of request success or failure.
     */
    getDataService: function(pageId, params, successCallback, errorCallback,
                                                      loadCallback, handleAs) {
  
      var requestPath = curam.util.DataServiceAPI._constructPath(pageId)
                          + curam.util.DataServiceAPI._encodeParameters(params);
      curam.debug
        .log(bundle.getProperty("curam.util.DataServiceAPI.get"));
  
      curam.util.DataServiceAPI._doDataService("GET", requestPath, undefined,
                          successCallback, errorCallback, loadCallback, handleAs);
    },
  
    /** 
     * Construct an ajax Post request. Parameters passed in will be included with
     * the post request.
     *
     * @param {String} page
     *        UIM page ID, used to construct the request path.
     * @param {Object} params
     *        Parameters values to be sent with request. Expected format is,
     *        { name:"value", ... }.
     * @param {Function} success
     *        Callback function to run if the request returns successfully.
     * @param {Function} error
     *        Callback function to run if the request fails.
     * @param {Function} load
     *        Callback called regardless of request success or failure.
     */
    postDataService: function(pageId, params, successCallback, errorCallback,
                                                        loadCallback, handleAs) {
  
      var requestPath = curam.util.DataServiceAPI._constructPath(pageId);
      curam.debug
        .log(bundle.getProperty("curam.util.DataServiceAPI.post"));
  
      curam.util.DataServiceAPI._doDataService("POST", requestPath, params,
                          successCallback, errorCallback, loadCallback, handleAs);
    },
  
  
    /** 
     * Construct the Url Path. If the function is called from the top most
     * window, we need to prefix the locale to the pathname.
     * 
     * @param {String} pageId
     *        The UIM page ID.
     * @Returns {String}
     *        Pathname used to create ajax request.
     */
    _constructPath: function(pageId) {
      var currentWindow = window;
      var topWindow = curam.util.getTopmostWindow();
      return curam.util.DataServiceAPI._constructPathValue(pageId,
                                                        currentWindow, topWindow);
    },
  
    _constructPathValue: function(pageId, currentWindow, topWindow) {
      if (pageId === "" || typeof pageId === "undefined") {
        throw "Data Service: pageId must be set.";
      }
      var pathPrefix = "";
      if (currentWindow.location.pathname === topWindow.location.pathname) {
        // it's the "top level" window so we need to add the locale to the Path.
        var locale = topWindow.curam && topWindow.curam.config
                                                && topWindow.curam.config.locale;
        // should always be set, but have included default case just to be safe.
        pathPrefix = (locale || "en") + "/";
      }
      return pathPrefix + pageId + "Page.do";
    },
  
    /** 
     * Encode the parameters and appened them to the request Path.
     * 
     * @param {Object} params
     *        Parameters to append to path,
     *        expected format: { name:"value", ... }.
     * @Returns {String}
     *        Encoded request parameters prefixed with question mark.
     */
    _encodeParameters: function(params) {
  
      if (typeof params === "undefined" || dojo.toJson(params) === "{}") {
        curam.debug
          .log(bundle.getProperty("curam.util.DataServiceAPI.no.params"));
        return "";
      }
   
      var result = [];
      for (var paramName in params) {
        result.push(paramName + "=" + encodeURIComponent(params[paramName]));
      }
   
      return "?" + result.join("&");
    },
  
    /**
     * Creates a Ajax post request using the dojo api. Any parameters to be sent
     * with the request are included as per a normal get|post request.
     *
     * @param {String} method
     *        The method of the request, either "GET" or "POST".
     * @param {String} path
     *        The path to invoke on the web-tier.
     * @param {Object} params
     *        The parameters to be included with the post.
     * @param {Function} successCallback
     *        The function to invoke for handling the returned data.
     * @param {Function} errorCallback
     *        The function to invoke on failure of resolving the path.
     * @param {Function} loadCallback
     *        The function that will be invoked in all circumstances.
     * @param {String} handleAs
     *        Dictates what format the response will be in, e.g. Text or JSON.
     */
    _doDataService: function(method, path, params, successCallback, errorCallback,
                                                    loadCallback, handleAs) {
      // Set defaults if not defined
      if (typeof errorCallback === "undefined") {
        errorCallback = dojo.hitch(this, this._handleDataServiceError);
      }
      if (typeof loadCallback === "undefined") {
        loadCallback = dojo.hitch(this, this._handleDataServiceCallback);
      }
      if (typeof successCallback === "undefined" || successCallback == null) {
        successCallback = dojo.hitch(this, this._handleDataServiceSuccess);
      }
  
      if (method === "GET") {
        curamRequest.get({
          url: path,
          headers: { "Content-Encoding": "UTF-8" },
          handleAs: (handleAs || "json"),
          load: successCallback,
          error:  errorCallback,
          handle: loadCallback
        });
  
      } else {
        curamRequest.post({
          url: path,
          headers: { "Content-Encoding": "UTF-8" },
          handleAs: (handleAs || "json"),
          preventCache: true,
          load: successCallback,
          error:  errorCallback,
          handle: loadCallback,
          content: (params || "")
        });
  
      }
    },
  
    /**
     * Generic handler for when the Data Service fails.
     *
     * @param {Object} error
     *        Containing all information on the error
     * @param {Object} ioargs
     *        Contains all arguments passed to the web tier in the call, for
     *        debugging purposes.
     */
    _handleDataServiceError: function(error, ioargs) {
      var errorPart1 = bundle.getProperty("curam.util.DataServiceAPI.error.1");
      var errorPart2 = bundle.getProperty("curam.util.DataServiceAPI.error.2");
      
      curam.debug.log(errorPart1 + error + errorPart2 + ioargs);  
      return "Data Service: Generic Error Handler";
    },
  
    /**
     * Generic handler for successful invocation when invoking the
     * ClientDataAccessor 
     *
     * @param {String} response
     *        Response data received.
     * @param {Object} ioargs
     *        Contains all arguments passed to the web tier in the call, for
     *        debugging purposes.
     */
    _handleDataServiceSuccess: function(response, ioargs) {
      curam.debug.log("curam.util.DataServiceAPI._handleDataServiceSuccess : " 
        + response);  
      return "Data Service: Generic Success Handler";
    },
  
    /**
     * Generic handler for errors when invoking the ClientDataAccessor path
     *
     * @param {String} response
     *        Response data received.
     * @param {Object} ioargs
     *        Contains all arguments passed to the web tier in the call, for
     *        debugging purposes.
     */
    _handleDataServiceCallback: function(response, ioargs) {
      curam.debug.log("curam.util.DataServiceAPI._handleDataServiceCallback : " 
        + response);
      return "Data Service: Generic Handler";
    }
  });
  
  return curam.util.DataServiceAPI;  
});
