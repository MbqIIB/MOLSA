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

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import curam.datastore.impl.Datastore;

/**
 * 
 * This class knows how to parse a datastore schema.
 * 
 */
final class MOLSADatastoreSchemaParser {

  /**
   *
   */
  private static final String kEntities = "entities";

  /**
   *
   */
  private static final String kEntity = "entity";

  /**
   *
   */
  private static final String kEntityName = "name";

  /**
   *
   */
  private static final String kAttribute = "attribute";

  /**
   *
   */
  private static final String kAttributeName = "name";

  /**
   *
   */
  private static final String kAttributeKeyName = "key";

  /**
   * 
   * @param datastore
   * @return mOLSADatastoreEntities
   * @throws SAXException
   * @throws IOException
   * @throws ParserConfigurationException
   */
  public Map<String, MOLSADatastoreEntity> getEntityDefinitions(
    final Datastore datastore) throws SAXException, IOException,
    ParserConfigurationException {

    final Document schema = getDatastoreSchemaDocument(datastore);

    final Element entities =
      (Element) schema.getElementsByTagName(kEntities).item(0);

    final Map<String, MOLSADatastoreEntity> mOLSADatastoreEntities =
      processEntities(entities.getElementsByTagName(kEntity));

    return mOLSADatastoreEntities;
  }

  /**
   * this is to get the DatastoreSchema element
   * @param datastore
   * @return schema
   * @throws SAXException
   * @throws IOException
   * @throws ParserConfigurationException
   */
  private Document getDatastoreSchemaDocument(final Datastore datastore)
    throws SAXException, IOException, ParserConfigurationException {

    final Document schema = MOLSADOMReader.document(datastore.getSchemaXML());

    return schema;
  }

  /**
   * 
   * @param entityList
   * @return mOLSADatastoreEntities
   */
  private Map<String, MOLSADatastoreEntity> processEntities(
    final NodeList entityList) {

    final Map<String, MOLSADatastoreEntity> mOLSADatastoreEntities =
      new HashMap<String, MOLSADatastoreEntity>();
    for (int i = 0; i < entityList.getLength(); i++) {

      final MOLSADatastoreEntity mOLSADatastoreEntity =
        processEntity((Element) entityList.item(i));

      mOLSADatastoreEntities.put(mOLSADatastoreEntity.getName(), mOLSADatastoreEntity);

    }
    return mOLSADatastoreEntities;
  }

  /**
   * 
   * @param entity
   * @return mOLSADatastoreEntity
   */
  private MOLSADatastoreEntity processEntity(final Element entity) {

    final MOLSADatastoreEntity mOLSADatastoreEntity =
      new MOLSADatastoreEntity(entity.getAttribute(kEntityName));

    final Set<String> attributes =
      processAttributes(entity.getElementsByTagName(kAttribute));

    mOLSADatastoreEntity.addAttributes(attributes);
    mOLSADatastoreEntity.setKey(entity.getAttribute(kAttributeKeyName));

    return mOLSADatastoreEntity;
  }

  /**
   * 
   * @param attributeList
   * @return attributes
   */
  private Set<String> processAttributes(final NodeList attributeList) {

    final Set<String> attributes = new HashSet<String>();

    for (int i = 0; i < attributeList.getLength(); i++) {

      final String attributeValue =
        processAttribute((Element) attributeList.item(i));
      attributes.add(attributeValue);
    }
    return attributes;
  }

  /**
   * 
   * @param attribute
   * @return attribute
   */
  public String processAttribute(final Element attribute) {

    return attribute.getAttribute(kAttributeName);
  }
}
