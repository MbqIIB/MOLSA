package curam.molsa.datastore.impl;

import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.datastore.impl.NoSuchAttributeException;
import curam.datastore.impl.NoSuchSchemaException;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;

/**
 * Utility class for MOLSADataStoreSchema data store related operations. Such as
 * create\read\Delete operations Specifically used for MOLSA Datastore Schema.
 */
public final class MOLSADatastoreUtility {

 
  /** Default constructor. */
  private MOLSADatastoreUtility() {

  }

  /**
   * Gets MOLSA Datastore Instance
   * 
   * @throws NoSuchSchemaException
   * General exception
   * @return datastore
   */
  public static Datastore getDatastoreInstance() throws NoSuchSchemaException {
    final Datastore datastore = DatastoreFactory.newInstance().openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);

    return datastore;
  }

  /**
   * Creates an entity from MOLSA Datastore Schema
   * 
   * @param entityName
   * name of an entity
   * @return entity
   */
  public static Entity createEntity(final String entityName) {
    Entity entity;
    try {
      final Datastore datastore = getDatastoreInstance();
      entity = datastore.newEntity(datastore.getEntityType(entityName));
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }

    return entity;
  }

  /**
   * Gets Entity Type.
   * 
   * @param entityName
   * name of an entity
   * @return entityType
   */
  public static EntityType getEntityType(final String entityName) {

    EntityType entityType = null;
    try {
      final Datastore datastore = getDatastoreInstance();
      entityType = datastore.getEntityType(entityName);
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }
    return entityType;
  }

  /**
   * Read the entity by its entity ID.
   * 
   * @param entityID
   *          Root entity ID.
   * @return The entity, or null if the entity does not exist
   */
  public static Entity readEntity(final long entityID) {

    Entity rootEntity = null;

    try {
      rootEntity = getDatastoreInstance().readEntity(entityID);
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }
    return rootEntity;
  }

  /**
   * Get the entities of a given root entity ID and entity name.
   * 
   * @param rootEntityID
   *          root entity ID.
   * @param entityName
   *          the name of the entity as defined in the schema
   * @return an array of entities, which may be empty.
   */
  @AccessLevel(AccessLevelType.INTERNAL)
  public static Entity[] getEntities(final long rootEntityID, final String entityName) {
    Entity[] entities;
    try {
      final Datastore datastore = getDatastoreInstance();
      final Entity rootEntity = datastore.readEntity(rootEntityID);
      entities = rootEntity.getChildEntities(datastore.getEntityType(entityName));
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }

    return entities;
  }

  /**
   * Get the entity of a given root entity ID and entity name.
   * 
   * @param rootEntityID
   *          root entity ID.
   * @param entityName
   *          the name of the entity as defined in the schema
   * @return the entity with the specified id, or null if the entity does not
   *         exist.
   */
  public static Entity getEntity(final long rootEntityID, final String entityName) {

    Entity entity = null;

    try {
      final Datastore datastore = getDatastoreInstance();
      final Entity rootEntity = datastore.readEntity(rootEntityID);
      final Entity[] entities = rootEntity.getChildEntities(datastore.getEntityType(entityName));

      if (entities.length > 0) {
        entity = entities[0];
      }
    } catch (final Exception e) {
      throw new AppRuntimeException(e);
    }

    return entity;
  }

  /**
   * Creates the given child entity for the given parent entity.
   * 
   * @param parentEntity
   *  Parent Entity.     
   * @param childEntityName
   * name of child entity
   * @return The Child Entity.
   */
  public static Entity createChildEntity(final Entity parentEntity, final String childEntityName) {

    Datastore datastore;
    try {
      datastore = getDatastoreInstance();
    } catch (final NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }
    final EntityType entityType = datastore.getEntityType(childEntityName);

    final Entity childEntity = datastore.newEntity(entityType);
    parentEntity.addChildEntity(childEntity);

    return childEntity;
  }

  /**
   * Identifies whether an attribute is defined on an entity.
   * 
   * @param entity
   *          Entity to be checked for.
   * @param attributeName
   *          An attribute name to be checked for.
   * 
   * @return true - when an attribute cannot be found on a specified entity..
   *         false - If the mentioned attribute is not available on the
   *         mentioned entity.
   */
  @AccessLevel(AccessLevelType.INTERNAL)
  public static boolean isAttributeAvailable(final Entity entity, final String attributeName) {

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
   * Opens the datastore instance associated with the specified schema name.
   * 
   * @param schemaName
   *          The name of the schema whose datastore instance will be opened.
   * 
   * @return The datastore instance associated with the specified schema name.
   * 
   * @throws AppException
   *           Exceptions that may occur when opening a datastore instance
   *           associated with a specified schema name.
   * @throws    NoSuchSchemaException       
   */
  public static Datastore openDatastore(final String schemaName) throws AppException, NoSuchSchemaException {

    final DatastoreFactory datastoreFactory = DatastoreFactory.newInstance();

    Datastore datastore = null;

    try {
      datastore = datastoreFactory.openDatastore(schemaName);
    } catch (final NoSuchSchemaException e) {
      throw e;
    }
    return datastore;
  }

  /**
   * Deletes child entities of a given entity type for a given parent entity.
   * 
   * @param parentEntity
   *          Parent entity from which child entities are to deleted.
   * @param childEntityType
   *          The name of the entity as defined in the schema.
   */
  @AccessLevel(AccessLevelType.INTERNAL)
  public static void deleteEntityType(final Entity parentEntity, final String childEntityType) {

    final Entity[] childEntities = parentEntity.getChildEntities(getEntityType(childEntityType));

    for (final Entity childEntity : childEntities) {
      childEntity.delete();
    }
    parentEntity.update();
  }
}
