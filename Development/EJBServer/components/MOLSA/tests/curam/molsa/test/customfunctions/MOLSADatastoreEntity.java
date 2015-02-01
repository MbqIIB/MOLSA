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

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * 
 * This class represents the definition of a datastore entity.
 * 
 */
final public class MOLSADatastoreEntity {

  /**
   * The set of entity attributes.
   */
  private final Set<String> attributes;

  /**
   * The name of the datastore entity.
   */
  private final String name;

  /**
   * The datastore entity key name.
   */
  private String key;

  /**
   * 
   * @param name
   */
  MOLSADatastoreEntity(final String name) {

    attributes = new HashSet<String>();
    key = "";
    this.name = name;
  }

  /**
   * The set of entity attributes.
   * 
   * @return The set of entity attributes
   */
  Set<String> getAttributes() {

    return attributes;
  }

  /**
   * Adds a set of entity attributes.
   * 
   * @param attributes
   *          The set of entity attributes to be added.
   */
  void addAttributes(final Collection<String> attributes) {

    this.attributes.addAll(attributes);
  }

  /**
   * Set the key of the entity.
   * 
   * @param key
   *          The name of the entity key.
   */
  void setKey(final String key) {

    this.key = key;
  }

  /**
   * Reads the entity key for this datastore entity.
   * 
   * @return The entity key.
   */
  String getKey() {

    return key;
  }

  /**
   * Reads the name of the datastore entity.
   * 
   * @return The name of the datastore entity.
   */
  String getName() {

    return name;
  }
}
