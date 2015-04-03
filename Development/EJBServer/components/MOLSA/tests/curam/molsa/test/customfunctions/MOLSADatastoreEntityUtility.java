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

import com.google.inject.ImplementedBy;

import curam.citizen.lifeeventbroker.impl.LifeEvent;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.ieg.impl.IEG2Context;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;

/**
 * Utility interface for data-store entity related operations.
 */
@ImplementedBy(MOLSADatastoreEntityUtilityImpl.class)
@AccessLevel(AccessLevelType.RESTRICTED)
public interface MOLSADatastoreEntityUtility {

  /**
   * Creates entity on data-store by entity name.
   * 
   * @param entityName Entity name.
   * @param datastore Data-store for which entity must be created.
   * @return Entity instance.
   */
  Entity createEntity(final String entityName, final Datastore datastore);

  /**
   * Get the entities of a given root entity ID and entity name.
   * 
   * @param rootEntityID
   * root entity ID.
   * @param entityName
   * the name of the entity as defined in the schema
   * @param datastore Data-store for which entities must be retrieved.
   * @return
   * an array of entities, which may be empty.
   */
  Entity[] getEntities(final long rootEntityID, final String entityName,
    final Datastore datastore);

  /**
   * Get the entity of a given root entity ID and entity name.
   * 
   * @param rootEntityID
   * root entity ID.
   * @param entityName
   * the name of the entity as defined in the schema
   * @param datastore Data-store from which entity must be retrieved.
   * @return
   * the entity with the specified id, or null if the entity does not exist.
   */
  Entity getEntity(final long rootEntityID, final String entityName,
    final Datastore datastore);

  /**
   * Creates the given child entity for the given parent entity.
   * 
   * @param parentEntity
   * Parent Entity.
   
   * Data-store.
   * Child Entity
    * @return Entity
    * @param childEntityName
   * The Child Entity.
   */
  Entity createChildEntity(final Entity parentEntity,
    final String childEntityName);
  

  /**
   * Identifies whether an attribute is defined on an entity.
   * 
   * @param entity
   * Entity to be checked for.
   * @param attributeName
   * An attribute name to be checked for.
   * 
   * @return
   * true - when an attribute cannot be found on a specified entity..
   * false - If the mentioned attribute is not available on the mentioned
   * entity.
   */
  boolean
    isAttributeAvailable(final Entity entity, final String attributeName);

  /**
   * Opens the data-store instance associated with the specified life event.
   * 
   * @param lifeEvent The life event whose data-store will be opened.
   * 
   * @return The data-store instance associated with the specified life event.
   * 
   * @throws AppException Exceptions that may occur when opening a data-store
   * instance associated with a specified life event.
   */
  Datastore openDatastore(final LifeEvent lifeEvent) throws AppException;

  /**
   * Opens the data-store instance associated with the specified ieg2Context.
   * 
   * @param ieg2Context ieg2Context for which data-store will be opened.
   * 
   * @return The data-store instance associated with the specified ieg2Context;
   * 
   * @throws AppException Exceptions that may occur when opening a data-store
   * instance associated with a specified life event.
   * @throws InformationalException Exceptions that may occur when opening a
   * data-store
   * instance associated with a specified life event.
   */
  Datastore openDatastore(final IEG2Context ieg2Context) throws AppException,
    InformationalException;

  /**
   * Opens the data-store instance associated with the specified schema name.
   * 
   * @param schemaName The name of the schema whose data-store instance will
   * be opened.
   * 
   * @return The data-store instance associated with the specified schema name.
   * 
   * @throws AppException Exceptions that may occur when opening a data-store
   * instance associated with a specified schema name.
   */
  Datastore openDatastore(final String schemaName) throws AppException;

  /**
   * Deletes child entities of a given entity type for a given parent entity.
   * 
   * @param parentEntity
   * Parent entity from which child entities are to deleted.
   * @param childEntityType
   * The name of the entity as defined in the schema.
   */
  void deleteEntityType(final Entity parentEntity,
    final String childEntityType);

}
