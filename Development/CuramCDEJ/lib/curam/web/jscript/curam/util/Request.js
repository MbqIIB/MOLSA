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

define(['dojo/_base/xhr',
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
