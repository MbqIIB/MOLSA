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

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.xpath.XPathConstants;
import org.apache.commons.collections.CollectionUtils;
import org.jdom.input.DOMBuilder;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * 
 * Reading utility which uses XPath and DocumentBuilders.
 * 
 */
public class MOLSADOMReader {

  /**
   * Create new DOM Document.
   * @param file
   * @return MOLSADOMParserCache
   */
  
  public static Document document() {

    try {
      return MOLSADOMParserCache.getDocumentBuilder().newDocument();
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Get DOM Document from XML string.
   * 
   * @param xml
   * @return MOLSADOMParserCache
   */
  public static Document document(final String xml) {

    try {
      return MOLSADOMParserCache.getDocumentBuilder().parse(
        new InputSource(new StringReader(xml)));
    } catch (final Exception e) {
      
      throw new RuntimeException(e);
    }
  }

  /**
   * Get DOM Document from input stream.
   * 
   * @param is
   * @return MOLSADOMParserCache
   */
  public static Document document(final InputStream is) {

    try {
      return MOLSADOMParserCache.getDocumentBuilder().parse(is);
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Get attribute value from node, when node is not Element.
   * 
   * @param node
   * @param name
   * @return 
   * @return null
   */
  public static String attributeValue(final Node node, final String name) {

    final Node att = node.getAttributes().getNamedItem(name);
    if (att != null) {
      return att.getNodeValue();
    } else {
      return null;
    }
  }

  /**
   * Get list of DOM Node from query.
   * 
   * @param startElement
   * @param query
   * 
   * @return
   */
  public static List<Node>
    nodes(final Object startElement, final String query) {

    try {
      final NodeList nodeList =
        (NodeList) MOLSADOMParserCache.getXPath().compile(query)
          .evaluate(startElement, XPathConstants.NODESET);
      final List<Node> list = new ArrayList<Node>();

      if (nodeList != null) {
        for (int i = 0; i < nodeList.getLength(); i++) {
          list.add(nodeList.item(i));
        }
      }

      return list;
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Get DOM Node from query.
   * 
   * @param startElement
   * @param query
   * @return CollectionUtils
   */
  public static Node node(final Object startElement, final String query) {

    final List<Node> nodeList = nodes(startElement, query);

    if (nodeList.isEmpty()) {
      return null;
    }

    return (Node) CollectionUtils.get(nodeList, 0);
  }

  /**
   * Get list of DOM Node from query.
   * 
   * @param startElement
   * @param query
   * @return list
   */
  public static List<Element> elements(final Object startElement,
    final String query) {

    final List<Element> list = new ArrayList<Element>();
    final List<Node> nodes = nodes(startElement, query);

    for (final Node node : nodes) {
      if (node instanceof Element) {
        list.add((Element) node);
      }
    }
    return list;
  }

  /**
   * Get DOM Node from query.
   * 
   * @param startElement
   * @param query
   * @return node
   */
  public static Element
    element(final Object startElement, final String query) {

    return (Element) node(startElement, query);
  }

  /**
   * Get list of Strings from query.
   * 
   * @param startElement
   * @param query
   * @return result
   */
  public static List<String> strings(final Object startElement,
    final String query) {

    final List<String> result = new ArrayList<String>();

    final List<Node> nodes = nodes(startElement, query);

    for (final Node node : nodes) {
      result.add(node.getNodeValue());
    }

    return result;
  }

  /**
   * Get String from query.
   * 
   * @param startElement
   * @param query
   * @return CollectionUtils
   */
  public static String string(final Object startElement, final String query) {

    final List<String> values = strings(startElement, query);

    if (values.isEmpty()) {
      return null;
    }

    return (String) CollectionUtils.get(values, 0);
  }

  /**
   * Get unique child from parent node. If not exists, creates child.
   * 
   * @param parent
   * @param name
   * @return nodes
   */
  public static Element child(final Node parent, final String name) {

    final List<Node> nodes = nodes(parent, name);

    if (nodes.isEmpty()) {
      final Element element = parent.getOwnerDocument().createElement(name);
      parent.appendChild(element);
      return element;
    } else {
      if (nodes.size() > 1) {
        throw new RuntimeException(
          "There are more than one element with name=" + name);
      }
      return (Element) nodes.get(0);
    }
  }

  /**
   * This method is to transform the XML node to a string.
   * 
   * @param node
   * @return buffer
   */
  public static String toString(final Node node) {

    try {
      final TransformerFactory transFactory =
        TransformerFactory.newInstance();
      final Transformer transformer = transFactory.newTransformer();
      final StringWriter buffer = new StringWriter();
      transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
      transformer.setOutputProperty(OutputKeys.INDENT, "yes");
      transformer.transform(new DOMSource(node), new StreamResult(buffer));
      return buffer.toString();
    } catch (final TransformerException e) {
      e.printStackTrace();
    }
    return "";
  }

  /**
   * This method is to transform the XML document to a formatted string.
   * 
   * @param node
   * The document/element that contains the XML information
   * @return The String of the XML
   */
  public static String toStringFormatted(final Node node) {

    final XMLOutputter xmlOutputter = new XMLOutputter();
    xmlOutputter.setFormat(Format.getPrettyFormat());

    final DOMBuilder domBuilder = new DOMBuilder();

    if (node instanceof Document) {

      final org.jdom.Document doc = domBuilder.build((Document) node);
      return xmlOutputter.outputString(doc);

    } else if (node instanceof Element) {

      final org.jdom.Element el = domBuilder.build((Element) node);
      return xmlOutputter.outputString(el);
    } else {

      return "";
    }
  }

  /**
   * Transforms an inbound DOM document according to a specific stylesheet.
   * 
   * @param document
   * Contains the Inbound DOM document.
   * @param stylesheet
   * The file location of the stylesheet use to transform the document
   * @param rootElement
   * The expected root element of the transformed document
   * @return The transformed document
   */
  public Document transformDocumentBasedOnXSL(final Document document,
    final String stylesheet, final String responseRootElement)
    throws ParserConfigurationException, SAXException, IOException {

    String xmlString = "";
    Document transformedDocument = null;
    final DocumentBuilderFactory dbfac = DocumentBuilderFactory.newInstance();
    dbfac.setNamespaceAware(true);
    final DocumentBuilder builder = dbfac.newDocumentBuilder();

    try {
      final InputStream inputStream =
        this.getClass().getClassLoader().getResourceAsStream(stylesheet);

      final Transformer transformer =
        TransformerFactory.newInstance().newTransformer(
          new StreamSource(inputStream));
      transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
      transformer.setOutputProperty(OutputKeys.INDENT, "yes");

      final StringWriter stringWriter = new StringWriter();
      final StreamResult streamResult = new StreamResult(stringWriter);
      final DOMSource source = new DOMSource(document);
      transformer.transform(source, streamResult);
      xmlString = stringWriter.toString();

      if (xmlString.contains(responseRootElement)) {
        transformedDocument =
          builder.parse(new InputSource(new StringReader(xmlString)));
      } else {
        transformedDocument = builder.newDocument();
      }

    } catch (final TransformerConfigurationException tcExp) {
      tcExp.printStackTrace();
    } catch (final TransformerException tExp) {
      tExp.printStackTrace();
    }
    return transformedDocument;
  }

  /**
   * Reads a JDOM Document from an XML string.
   * 
   * @param xml The xml string.
   * @return document
   */
  public static org.jdom.Document toJDOMDocument(final String xml) {

    final SAXBuilder saxBuilder = new SAXBuilder();

    try {
      final InputStream inputStream =
        new ByteArrayInputStream(xml.getBytes("UTF-8"));
      final org.jdom.Document document = saxBuilder.build(inputStream);
      return document;
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }
}
