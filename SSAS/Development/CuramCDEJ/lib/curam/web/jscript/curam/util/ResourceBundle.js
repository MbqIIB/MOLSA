/*
 * Copyright 2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
define(["dojo/i18n",
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