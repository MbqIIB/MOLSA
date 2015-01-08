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

import com.google.inject.Singleton;

import curam.citizen.lifeeventbroker.impl.LifeEvent;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.datastore.impl.NoSuchAttributeException;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.ieg.impl.IEGScriptExecutionFactory;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;

/**
 * DatastoreEntityUtility implementation.
 */
@Singleton
@AccessLevel(AccessLevelType.RESTRICTED)
public final class MOLSADatastoreEntityUtilityImpl implements MOLSADatastoreEntityUtility {

  /** Default constructor. */
  public MOLSADatastoreEntityUtilityImpl() {

    // Default constructor.
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Entity createEntity(final String entityName, final Datastore datastore) {

    final Entity entity = datastore.newEntity(datastore.getEntityType(entityName));

    return entity;

  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Entity[] getEntities(final long rootEntityID, final String entityName, final Datastore datastore) {

    final Entity rootEntity = datastore.readEntity(rootEntityID);
    final Entity[] entities = rootEntity.getChildEntities(datastore.getEntityType(entityName));

    return entities;

  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Entity getEntity(final long rootEntityID, final String entityName, final Datastore datastore) {

    final Entity rootEntity = datastore.readEntity(rootEntityID);
    final Entity[] entities = rootEntity.getChildEntities(datastore.getEntityType(entityName));
    Entity entity = null;

    if (entities.length > 0) {
      entity = entities[0];
    }

    return entity;

  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Entity createChildEntity(final Entity parentEntity, final String childEntityName) {

    final Datastore datastore = parentEntity.getDatastore();

    final EntityType entityType = datastore.getEntityType(childEntityName);

    final Entity childEntity = datastore.newEntity(entityType);
    parentEntity.addChildEntity(childEntity);

    return childEntity;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isAttributeAvailable(final Entity entity, final String attributeName) {

    boolean isAttributeDefined = true;

    if (entity == null || attributeName == null || attributeName.equals("")) {
      isAttributeDefined = false;
    } else {
      try {
        entity.getAttribute(attributeName);
      } catch (final NoSuchAttributeException e) {
        isAttributeDefined = false;
      }
    }

    return isAttributeDefined;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Datastore openDatastore(final LifeEvent lifeEvent) throws AppException {

    final String schemaName = lifeEvent.getRelatedLifeEventContext().getRelatedLifeEventType().getSchema();

    final Datastore datastore = openDatastore(schemaName);

    return datastore;

  }

  /**
   * {@inheritDoc}
   */
  @SuppressWarnings("restriction")
  @Override
  public Datastore openDatastore(final IEG2Context ieg2Context) throws AppException, InformationalException {

    final DatastoreFactory datastoreFactory = DatastoreFactory.newInstance();

    final Long executionID = ieg2Context.getExecutionID();

    String schemaName;
    // AccountTransfer doesn't have an executionID populated
    if (executionID != 0) {
      schemaName = IEGScriptExecutionFactory.getInstance().getScriptExecutionObject(executionID).getSchemaName();
    } else {
      schemaName = "MOLSADataStoreSchema";
    }

    Datastore datastore = null;
    try {

      datastore = datastoreFactory.openDatastore(schemaName);

    } catch (final NoSuchSchemaException e) {

      throw new AppRuntimeException(e);

    }

    return datastore;

  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Datastore openDatastore(final String schemaName) throws AppException {

    final DatastoreFactory datastoreFactory = DatastoreFactory.newInstance();

    Datastore datastore = null;

    try {

      datastore = datastoreFactory.openDatastore(schemaName);

    } catch (final NoSuchSchemaException e) {

      throw new AppRuntimeException(e);

    }

    return datastore;

  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void deleteEntityType(final Entity parentEntity, final String childEntityName) {

    final Datastore datastore = parentEntity.getDatastore();
    final Entity[] childEntities = parentEntity.getChildEntities(datastore.getEntityType(childEntityName));

    for (final Entity childEntity : childEntities) {
      childEntity.delete();
    }

    parentEntity.update();

  }

}
