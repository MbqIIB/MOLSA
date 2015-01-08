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
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang.math.NumberUtils;
import org.w3c.dom.Attr;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.google.inject.Inject;

import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.type.StringHelper;

/**
 * 
 * This class is responsible for interacting with the datastore
 * 
 */
public final class MOLSATestDatastore {

  /**
   *
   */
  private static String kDatastoreRootEntityName = "Application";

  /**
   *
   */
  @Inject
  private MOLSADatastoreSchemaParser mOLSADatastoreSchemaParser;

  private final Map<String, Entity> referenceEntities = new HashMap<String, Entity>();

  /**
   * this is to initialise the schema name
   * @param schemaName
   * @return rootEntity
   * @throws AppException
   */
  public long initialize(final String schemaName) throws AppException {

    final Entity rootEntity = createAndAddRootEntity(getDatastoreInstance(schemaName));
    return rootEntity.getUniqueID();
  }

  /**
   * this is to get the datastore instance
   * @param  schemaName
   * @return datastore
   * @throws AppException
   */
  private Datastore getDatastoreInstance(final String schemaName)
      throws AppException {

    Datastore datastore = null;
    try {
      datastore = DatastoreFactory.newInstance().openDatastore(schemaName);
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }

    return datastore;
  }

  /**
   * this is to create and add root entity
   * @param datastore
   * @return rootEntity
   */
  private Entity createAndAddRootEntity(final Datastore datastore) {

    final Entity rootEntity = datastore.newEntity(datastore
        .getEntityType(kDatastoreRootEntityName));

    datastore.addRootEntity(rootEntity);

    return rootEntity;
  }

  /**
   * Take some XML, convert it to datastore entities and store.
   * 
   * NB The XML must adhere to the datastore schema. Otherwise, it will not be
   * stored.
   * 
   * @param mOLSADatastoreStruct
   * @throws AppException
   */
  public void save(final MOLSADatastoreStruct mOLSADatastoreStruct,
      final String schemaName) throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);

    // Add child entities to this top level entity.
    final Entity rootEntity = datastore.readEntity(mOLSADatastoreStruct
        .getDatastoreID());

    try {
      final Map<String, MOLSADatastoreEntity> mOLSADatastoreEntities = mOLSADatastoreSchemaParser
          .getEntityDefinitions(datastore);

      final Element rootElement = getRootElement(mOLSADatastoreStruct.getXml());

      save(datastore, mOLSADatastoreEntities, rootElement, rootEntity);

    } catch (final ParserConfigurationException e) {
      throw new AppRuntimeException(e);
    } catch (final SAXException e) {
      throw new AppRuntimeException(e);
    } catch (final IOException e) {
      throw new AppRuntimeException(e);
    } catch (final DOMException e) {
      throw new AppRuntimeException(e);
    }

  }

  /**
   * Recursively save datastore entities and child entities.
   * 
   * @param datastore
   * @param rootElement
   * @param rootEntity
   * 
   * @throws SAXException
   * @throws IOException
   * @throws ParserConfigurationException
   */
  private void save(final Datastore datastore,
      final Map<String, MOLSADatastoreEntity> MOLSADatastoreEntities,
      final Element rootElement, final Entity rootEntity) throws SAXException,
      IOException, ParserConfigurationException {
    System.out.println("MOLSATestDatastore.save()");
    /*
     * Iterate through the known datastore entities - search for each one inside
     * the xml passed in and map the attributes and their values.
     */
    for (final MOLSADatastoreEntity mOLSADatastoreEntity : MOLSADatastoreEntities.values()) {
      
      final String entityName = mOLSADatastoreEntity.getName();
      System.out.println("Entity Name" +entityName);
      final NodeList entities = rootElement.getChildNodes();

      for (int i = 0; i < entities.getLength(); i++) {

        if (entities.item(i).getNodeType() == Node.ELEMENT_NODE
            && entities.item(i).getNodeName().equals(entityName)) {

          final Element entity = (Element) entities.item(i);

          final Entity dsEntity = mapFromXMLToDatastoreEntity(entity,
              datastore, mOLSADatastoreEntity);
          Boolean isModify = false;

          if (dsEntity.getEntityType().getKeyAttribute() != null) {
            final String id = entity.getAttribute(dsEntity.getEntityType()
                .getKeyAttribute().getName());

            if (id.length() != 0) {
              isModify = true;
            }
          }

          if (!isModify) {

            rootEntity.addChildEntity(dsEntity);
          }

          /*
           * Are there any child elements? If so, save these also. NB Recursive.
           */
          if (entity.hasChildNodes()) {
            save(datastore, MOLSADatastoreEntities, entity, dsEntity);
          }
        }

      }
    }
  }

  /**
   * Save a singleton datastore entity. If one does not exist, create a new one,
   * else modify the existing entity.
   * 
   * @param mOLSADatastoreStruct
   * @param entityName
   * @throws AppException
   */
  public void saveSingleton(final MOLSADatastoreStruct mOLSADatastoreStruct,
      final String entityName, final String schemaName) throws AppException {

    /*
     * If there are no instances yet, save as normal and return.
     */
    if (!datastoreEntityExists(mOLSADatastoreStruct.getDatastoreID(), entityName,
        schemaName)) {
      save(mOLSADatastoreStruct, schemaName);
    } else {
      modifySingleton(mOLSADatastoreStruct, entityName, schemaName);
    }

  }

  /**
   * Modify a singleton datastore entity.
   * 
   * @param mOLSADatastoreStruct
   * @param entityName
   * @throws AppException
   */
  private void modifySingleton(final MOLSADatastoreStruct mOLSADatastoreStruct,
      final String entityName, final String schemaName) throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);

    // Top level entity.
    final Entity rootEntity = datastore.readEntity(mOLSADatastoreStruct
        .getDatastoreID());

    try {

      final Element rootElement = getRootElement(mOLSADatastoreStruct.getXml());

      /*
       * Retrieve the datastore entity definition.
       */
      final MOLSADatastoreEntity mOLSADatastoreEntity = mOLSADatastoreSchemaParser
          .getEntityDefinitions(datastore).get(entityName);

      final Element singletonElement = (Element) rootElement
          .getElementsByTagName(entityName).item(0);

      final Entity dsEntity = getSingleton(datastore, rootEntity,
          mOLSADatastoreEntity);

      // Map the known attributes
      for (final String knownAttributeName : mOLSADatastoreEntity.getAttributes()) {

        mapAttribute(singletonElement, dsEntity, knownAttributeName);

      }

      /*
       * Update the datastore entity.
       */
      dsEntity.update();

    } catch (final ParserConfigurationException e) {
      throw new AppRuntimeException(e);
    } catch (final SAXException e) {
      throw new AppRuntimeException(e);
    } catch (final IOException e) {
      throw new AppRuntimeException(e);
    } catch (final DOMException e) {
      throw new AppRuntimeException(e);
    }

  }

  /**
   * 
   * @param datastore
   * @param rootEntity
   * @param mOLSADatastoreEntity
   * @return
   */
  private Entity getSingleton(final Datastore datastore,
      final Entity rootEntity, final MOLSADatastoreEntity mOLSADatastoreEntity) {

    final Entity[] entities = rootEntity.getChildEntities(datastore
        .getEntityType(mOLSADatastoreEntity.getName()));

    return entities[0];
  }

  /**
   * 
   * @param xml
   * @return rootElement
   * @throws SAXException
   * @throws IOException
   * @throws ParserConfigurationException
   */
  private Element getRootElement(final String xml) {

    final Document document = MOLSADOMReader.document(xml);
    final Element rootElement = (Element) document.getElementsByTagName(
        kDatastoreRootEntityName).item(0);

    return rootElement;
  }

  /**
   * 
   * @param entityXMLElement
   * @param datastore
   * @param mOLSADatastoreEntity
   * @return dsEntity
   */
  private Entity mapFromXMLToDatastoreEntity(final Element entityXMLElement,
      final Datastore datastore, final MOLSADatastoreEntity mOLSADatastoreEntity) {

    Boolean isModify = false;

    final Entity dsEntity = getDatastoreEntityInstance(entityXMLElement,
        datastore, mOLSADatastoreEntity);
    final String id = entityXMLElement.getAttribute(mOLSADatastoreEntity.getKey());
    if (id.length() != 0) {
      isModify = true;
    }
    // Iterate through the known attributes
    for (final String knownAttributeName : mOLSADatastoreEntity.getAttributes()) {

      mapAttribute(entityXMLElement, dsEntity, knownAttributeName);

    }

    if (isModify) {
      dsEntity.update();
    }

    return dsEntity;
  }

  /**
   * this is to get the datastore entity instance
   * @param entityXMLElement
   * @param datastore
   * @param mOLSADatastoreEntity
   * @return dsEntity
   */
  private Entity getDatastoreEntityInstance(final Element entityXMLElement,
      final Datastore datastore, final MOLSADatastoreEntity mOLSADatastoreEntity) {

    Entity dsEntity = null;
    final String id = entityXMLElement.getAttribute(mOLSADatastoreEntity.getKey());
    boolean storeReference = false;

    if (id.length() != 0) {
      Entity existingEntity = null;
      if (!NumberUtils.isNumber(id)
          || datastore.readEntity(Long.parseLong(id)) == null) {
        storeReference = true;
        entityXMLElement.setAttribute(mOLSADatastoreEntity.getKey(),
            StringHelper.EMPTY_STRING);
      } else {

        final long entityID = Long.parseLong(entityXMLElement
            .getAttribute(mOLSADatastoreEntity.getKey()));

        existingEntity = datastore.readEntity(entityID);
      }

      if (existingEntity == null) {
        dsEntity = datastore.newEntity(datastore.getEntityType(mOLSADatastoreEntity
            .getName()));
        if (storeReference) {
          referenceEntities.put(id, dsEntity);
        }
      } else {
        dsEntity = existingEntity;
      }

    } else {

      dsEntity = datastore.newEntity(datastore.getEntityType(mOLSADatastoreEntity
          .getName()));
    }

    return dsEntity;

  }

  /**
   * this is to map the attribute
   * @param entityXMLElement
   * @param dsEntity
   * @param knownAttributeName
   */
  private void mapAttribute(final Element entityXMLElement,
      final Entity dsEntity, final String knownAttributeName) {

    final Attr attributeNode = entityXMLElement
        .getAttributeNode(knownAttributeName);

    if (attributeNode != null) {
      final String attributeValue = attributeNode.getValue();
      dsEntity.setAttribute(knownAttributeName, attributeValue);

    }

  }

  /**
   * this is to read details
   * @param  schemaName
   * @param mOLSADatastoreKey
   * @return mOLSADatastoreStruct
   * @throws AppException
   */
  public MOLSADatastoreStruct read(final MOLSADatastoreKey mOLSADatastoreKey,
      final String schemaName) throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);
    final Entity entity = datastore.readEntity(mOLSADatastoreKey.getDatastoreID());

    final MOLSADatastoreStruct mOLSADatastoreStruct = new MOLSADatastoreStruct();
    mOLSADatastoreStruct.setXml(entity.getAllXMLString());
    mOLSADatastoreStruct.setDatastoreID(mOLSADatastoreKey.getDatastoreID());

    return mOLSADatastoreStruct;
  }

  /**
   * Check if any there any of the specified datastore entities in the
   * datastore.
   * 
   * @param datastoreID
   * @param entityName
   * @return entity
   * @throws AppException
   */
  private boolean datastoreEntityExists(final long datastoreID,
      final String entityName, final String schemaName) throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);
    final Entity entity = datastore.readEntity(datastoreID);

    return entity.getChildEntities(datastore.getEntityType(entityName)).length > 0;

  }

  /**
   * Delete an entity from the datastore.
   * 
   * @param datastoreID
   *          The entity datastore ID.
   * 
   * @throws AppException
   */
  public void delete(final long datastoreID, final String schemaName)
      throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);
    final Entity entity = datastore.readEntity(datastoreID);
    entity.delete();
  }

  /**
   * Read an entity given its datastore ID.
   * 
   * @param datastoreID
   *          The datastore ID.
   * 
   * @return The entity.
   * 
   * @throws AppException
   */
  public Entity read(final long datastoreID, final String schemaName)
      throws AppException {

    final Datastore datastore = getDatastoreInstance(schemaName);
    final Entity entity = datastore.readEntity(datastoreID);

    return entity;
  }

  /**
   * If the xml being saved contains references a Map of the references will be
   * created with the name of the original reference and the entity that was
   * created in the data store.
   * 
   * @return Map containing the name of the original reference attribute and the
   *         Entity that was created for the reference.
   */
  public Map<String, Entity> getReferenceEntities() {

    return referenceEntities;
  }

}
