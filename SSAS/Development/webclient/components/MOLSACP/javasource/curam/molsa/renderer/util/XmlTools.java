package curam.molsa.renderer.util;

import curam.util.client.model.Binding;
import curam.util.client.model.Field;
import curam.util.client.view.RendererContext;
import curam.util.common.path.DataAccessException;
import curam.util.common.path.DataAccessor;
import curam.util.common.path.Path;
import curam.util.resources.XMLParserCache;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public final class XmlTools
{
  private static final ThreadLocal<XPathFactory> xPathFactoryContainer = new ThreadLocal()
  {
    protected XPathFactory initialValue()
    {
      return XPathFactory.newInstance();
    }
  };

  public static Document createNewDocument()
    throws DataAccessException
  {
    DocumentBuilder docBuilder = XMLParserCache.getDocumentBuilder();

    Document doc = docBuilder.newDocument();

    return doc;
  }

  public static Document createNewDocumentImportNode(Node importNode)
    throws DataAccessException
  {
    DocumentBuilder docBuilder = XMLParserCache.getDocumentBuilder();

    Document doc = docBuilder.newDocument();
    Element rootElement = doc.createElement("root");
    doc.appendChild(rootElement);

    rootElement.appendChild(doc.importNode(importNode, true));

    return doc;
  }

  public static Document createNewDocumentImportNode(Node importNode, String id)
    throws DataAccessException
  {
    DocumentBuilder docBuilder = XMLParserCache.getDocumentBuilder();

    Document doc = docBuilder.newDocument();
    Element rootElement = doc.createElement("root");
    doc.appendChild(rootElement);

    rootElement.appendChild(doc.importNode(importNode, true));
    rootElement.setAttribute("id", id);

    return doc;
  }

  public static Document importNodeAppendToRoot(Node node, Document document)
  {
    Element rootElement = document.getDocumentElement();
    rootElement.appendChild(document.importNode(node, true));
    return document;
  }

  public static String convertDocumentToText(Document doc)
    throws DataAccessException
  {
    TransformerFactory transfac = TransformerFactory.newInstance();
    Transformer trans;
    try
    {
      trans = transfac.newTransformer();
    } catch (TransformerConfigurationException e) {
      throw new DataAccessException(-132000, e);
    }

    trans.setOutputProperty("omit-xml-declaration", "yes");

    StringWriter sw = new StringWriter();
    StreamResult result = new StreamResult(sw);
    DOMSource source = new DOMSource(doc);
    try
    {
      trans.transform(source, result);
    } catch (TransformerException e) {
      throw new DataAccessException(-132000, e);
    }

    String xmlString = sw.toString();

    return xmlString;
  }

  public static Document parseXmlText(String value)
    throws DataAccessException
  {
    Document xmlDoc = null;
    try
    {
      DocumentBuilder documentBuilder = XMLParserCache.getDocumentBuilder();

      InputSource source = new InputSource();

      source.setCharacterStream(new StringReader(value));

      xmlDoc = documentBuilder.parse(source);
    }
    catch (SAXException e) {
      throw new DataAccessException(-132000, e);
    } catch (IOException e) {
      throw new DataAccessException(-132000, e);
    }
    return xmlDoc;
  }

  public static Document parseXml(InputStream inputStream)
    throws DataAccessException
  {
    Document xmlDoc = null;
    try
    {
      DocumentBuilder documentBuilder = XMLParserCache.getDocumentBuilder();

      xmlDoc = documentBuilder.parse(inputStream);
    }
    catch (SAXException e) {
      throw new DataAccessException(-132000, e);
    } catch (IOException e) {
      throw new DataAccessException(-132000, e);
    }
    return xmlDoc;
  }

  public static Document getRendererFieldDocument(Field field, RendererContext rendererContext)
    throws DataAccessException
  {
    Path sourcePath = field.getBinding().getSourcePath();
    String value = (String)rendererContext.getDataAccessor().getRaw(sourcePath);

    return parseXmlText(value);
  }

  public static String getAttributeValue(Node node, String attributeName)
  {
    if ((node.getAttributes().getLength() > 0) && (node.getAttributes().getNamedItem(attributeName) != null))
    {
      return node.getAttributes().getNamedItem(attributeName).getNodeValue();
    }

    return null;
  }

  public static Node getXMLNode(String xPathExpression, Document document)
    throws XPathExpressionException
  {
    NodeList nodeList = null;

    XPath path = ((XPathFactory)xPathFactoryContainer.get()).newXPath();
    XPathExpression expr = path.compile(xPathExpression);

    Object result = expr.evaluate(document, XPathConstants.NODESET);
    nodeList = (NodeList)result;

    if ((nodeList != null) && (nodeList.getLength() >= 1)) {
      return nodeList.item(0);
    }

    return null;
  }

  public static NodeList getXMLNodeList(String xPathExpression, Document document)
    throws XPathExpressionException
  {
    XPath path = ((XPathFactory)xPathFactoryContainer.get()).newXPath();
    XPathExpression expr = path.compile(xPathExpression);

    Object result = expr.evaluate(document, XPathConstants.NODESET);
    NodeList nodeList = (NodeList)result;
    return nodeList;
  }
}