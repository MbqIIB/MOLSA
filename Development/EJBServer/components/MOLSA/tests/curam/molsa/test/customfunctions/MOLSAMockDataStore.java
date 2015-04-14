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

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.commons.io.IOUtils;

import com.google.inject.Inject;

import curam.datastore.impl.Entity;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.test.framework.CuramServerTest;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;

/**
 * class to create MockDatastore
 */
public class MOLSAMockDataStore extends CuramServerTest {

  protected String schemaName = MOLSADatastoreConst.kDataStoreSchemaName;

  @Inject
  private MOLSATestDatastore datastore;
  /**
   * Constructor.
   * 
   * @param name
   *          String
   */
  public MOLSAMockDataStore(final String name) {

    super(name);
    GuiceWrapper.getInjector().injectMembers(this);
  }
/**
 * 
 * @return rootDatastoreEntity
 */
  public Entity getMOLSAMockDataStore() {

    Entity rootDatastoreEntity = null;
    try {

      String currentDir;
      currentDir = new File(".").getCanonicalPath() + File.separator + "components" + File.separator +
      "MOLSA" + File.separator + "tests" + File.separator + "curam"
          + File.separator + "molsa" + File.separator + "test" + File.separator + "customfunctions";

      rootDatastoreEntity = createTestDataStore(new File(currentDir + File.separator + "MOLSAMockApplication.xml"));
      TransactionInfo.getInformationalManager().failOperation();

    } catch (final IOException e) {

      fail(e.getMessage());
    } catch (final InformationalException e) {

      fail(e.getMessage());
    } catch (final AppException e) {

      fail(e.getMessage());
    }
    return rootDatastoreEntity;
  }
/**
 * this is to get the mock datastore
 * @param mockXML
 * @return rootDatastoreEntity
 */
  public Entity getMockDataStore(final String mockXML) {

    Entity rootDatastoreEntity = null;
    try {

      String currentDir;
      currentDir = new File(".").getCanonicalPath() + File.separator + "components" +
      File.separator + "MOLSA" + File.separator + "tests" + File.separator + "curam"
          + File.separator + "molsa" + File.separator + "test" + File.separator + "customfunctions";

      rootDatastoreEntity = createTestDataStore(new File(currentDir + File.separator + mockXML));
      TransactionInfo.getInformationalManager().failOperation();

      // Test that PDC Address is created correctly

    } catch (final IOException e) {

      fail(e.getMessage());
    } catch (final InformationalException e) {

      fail(e.getMessage());
    } catch (final AppException e) {

      fail(e.getMessage());
    }
    return rootDatastoreEntity;
  }

  /**
   * this is to Creates a Mock Datastore.
  * @param datastoreFile
   * @return root
   * @throws AppException
   */
  private Entity createTestDataStore(final File datastoreFile) throws AppException {

    final MOLSADatastoreStruct mOLSADatastoreStruct = new MOLSADatastoreStruct();
    try {
      mOLSADatastoreStruct.setDatastoreID(datastore.initialize(schemaName));
    } catch (final AppException e) {

      fail(e.getMessage());
    }

    FileInputStream fileInputStream = null;
    try {
      fileInputStream = new FileInputStream(datastoreFile);
    } catch (final FileNotFoundException e1) {
      e1.printStackTrace();
      fail(e1.getMessage());
    }
    try {
      // read the xml
      mOLSADatastoreStruct.setXml(IOUtils.toString(fileInputStream));
    } catch (final IOException e) {

      fail(e.getMessage());
    }
    datastore.save(mOLSADatastoreStruct, schemaName);
    final Entity root = datastore.read(mOLSADatastoreStruct.getDatastoreID(), schemaName);
    root.setAttribute("submitDate", "20130321");
    root.update();
    return root;
  }
}
