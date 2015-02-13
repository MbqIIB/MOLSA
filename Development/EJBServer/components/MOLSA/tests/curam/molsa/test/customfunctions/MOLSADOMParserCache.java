/*
 * Licensed Materials - Property of IBM
 * 
 * PID 5725-H26
 * 
 * Copyright IBM Corporation 2014. All rights reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package curam.molsa.test.customfunctions;

import curam.util.resources.XMLParserCache;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

/**
 * 
 * Reading utility which uses XPath and DocumentBuilders.
 * 
 */
public class MOLSADOMParserCache {

  /**
   * XPath Object (Thread Local).
   */
  private static final ThreadLocal<XPath> kLocalXPath =
    new ThreadLocal<XPath>() {

      @Override
      protected XPath initialValue() {

        return XPathFactory.newInstance().newXPath();
      }
    };

  /**
   * Get DocumentBuilder object.
   * 
   * @param file
   * @return XMLParserCache
   */
  public static DocumentBuilder getDocumentBuilder() {

    return XMLParserCache.getDocumentBuilder();
  }

  /**
   * Get XPath object.
   * 
   * @param file
   * @return xPath
   */
  public static XPath getXPath() {

    try {
      final XPath xPath = kLocalXPath.get();
      xPath.reset();
      return xPath;
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

}
