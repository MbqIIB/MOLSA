package curam.molsa.test.framework;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import junit.framework.TestCase;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;

/**
 * The abstract base class from which all Curam Server Process Tests inherit.
 */
public abstract class CuramServerTest extends TestCase {

  /**
   * The locale that is associated with the user whose access is being simulated
   * by this test class.
   */
  private static final String kLocaleForTransaction = "en";

  /**
   * Constructor for CuramServerTest
   */
  public CuramServerTest(String arg0) {
    super(arg0);
    checkConfiguration();
  }

  protected curam.util.transaction.TransactionInfo ti = null;

  protected boolean mQuietMode = false;

  protected final void setUp() {

    if (!mQuietMode) {
      System.out.println(this.getName());
    }

    begin();

    try {
      curam.core.impl.SecurityImplementationFactory.register();
    } catch (curam.util.exception.AppException e) {
      rollback();
      throw new curam.util.exception.AppRuntimeException(e);
    } catch (curam.util.exception.InformationalException e) {
      rollback();
      throw new curam.util.exception.AppRuntimeException(e);
    }

    try {
      setUpCuramServerTest();
    } catch (Error e) {
      // covers errors such as assertion failures
      rollback();
      throw e;
    } catch (RuntimeException e) {
      // covers errors such as database exceptions
      rollback();
      throw e;
    }

  }

  protected void setUpCuramServerTest() {// empty - may be overridden by
    // subclasses
  }

  protected final void tearDown() throws Exception {
    try {
      tearDownCuramServerTest();
    } catch (Error e) {
      // covers errors such as assertion failures
      rollback();
      throw e;
    } catch (Exception e) {
      // covers errors such as database exceptions
      rollback();
      throw e;
    }

    // always rollback - no database modifications may endure beyond this test

    if (shouldCommit()) {
      commit();
    } else {

      rollback();

    }

  }

  protected void rollback() {

    clearCaches();

    if (ti != null) {
      ti.rollback();

      ti.closeConnection();

      if (!mQuietMode) {
        System.out.println("  Transaction rolled back");
      }

      ti = null;
    }
  }

  protected void tearDownCuramServerTest() {// empty - may be overridden by
    // subclasses
  }

  // convenience functions to retrieve and manipulate test dates
  protected static curam.util.type.Date getToday() {
    return curam.util.type.Date.getCurrentDate();
  }

  protected static curam.util.type.Date getTomorrow() {
    return getToday().addDays(1);
  }

  protected static curam.util.type.Date getYesterday() {
    return getToday().addDays(-1);
  }

  /**
   * Checks that the system is configured correctly prior to initializing the
   * test
   */
  private void checkConfiguration() {

    // If the database is DB2, we recommend that a single connection be used to
    // improve performance.
    // Check that this is the case and if it is not then inform the user
    if (curam.util.resources.Configuration.getProperty("curam.db.type").compareToIgnoreCase("DB2") == 0) {

      // Even if this property is set, we need to verify DB2 connection
      // pooling is not enabled or the tests will all fail
      BufferedReader file = null;
      String currentLine = null;
      String bindingsURL = null;

      bindingsURL = curam.util.resources.Configuration.getProperty("curam.environment.bindings.location");

      try {
        file = new BufferedReader(new FileReader(bindingsURL + "/.bindings"));
      } catch (FileNotFoundException e) {
        // failed to open .bindings file
        System.err.println("A .bindings file can not be found in the location specified in the 'curam.environment.bindings.location' property. The location was '"
            + curam.util.resources.Configuration.getProperty("curam.environment.bindings.location") + "'.");
        System.exit(-1);
      }

      try {
        currentLine = file.readLine();
      } catch (IOException e) {
        // failed reading from .bindings file
        System.err.println("An error occurred reading from the .bindings file, '" + curam.util.resources.Configuration.getProperty("curam.environment.bindings.location")
            + "/.bindings'.");
        System.exit(-1);
      }

      while (currentLine != null) {

        if (currentLine.indexOf("DB2ConnectionPoolData") != -1) {

          // check that the line has not been commented out
          // if the first non whitespace character is "#" the line has been
          // commented out and this is not an error
          if (currentLine.trim().charAt(0) != '#') {
            System.err.println("A single DB2 connection can not be used with connection pooling. Update the .bindings file.");
            System.exit(-1);
          }
        }

        try {
          currentLine = file.readLine();
        } catch (IOException e) {
          // failed reading from .bindings file
          System.err.println("An error occurred reading from the .bindings file, '" + curam.util.resources.Configuration.getProperty("curam.environment.bindings.location")
              + "/.bindings'.");
          System.exit(-1);
        }

      }

    } else {

      // If this is Oracle, then the cache size should be set
      String cacheSize = curam.util.resources.Configuration.getProperty("curam.db.oracle.cachesize");

      if (cacheSize == null) {

        curam.util.resources.Configuration.setProperty("curam.db.oracle.cachesize", "100");

      }

    }

    // The key repository must be switched on in order for tests to work -
    // Check that this is the case and if it is not then inform the user and
    // exit
    if (!curam.util.resources.Configuration.getBooleanProperty("curam.test.store.entitykeys")) {

      curam.util.resources.Configuration.setProperty("curam.test.store.entitykeys", "true");

    }

    // In order for testing of security to succeed the value of the variable
    // curam.databasedsecurity.caching.disabled needs to be set to true
    if (!curam.util.resources.Configuration.getBooleanProperty("curam.databasedsecurity.caching.disabled")) {

      curam.util.resources.Configuration.setProperty("curam.databasedsecurity.caching.disabled", "true");

    }

    // In order for tests that access application functionality that 'creates'
    // tasks
    // to complete successfully workflow process enactment needs to be disabled.

    Configuration.setProperty(EnvVars.ENV_ENACT_WORKFLOW_PROCESS_DISABLED, CuramConst.kNO);

  }

  public void setQuietFlag(boolean quietFlag) {
    mQuietMode = quietFlag;
  }

  /**
   * Hook point for subclasses to decide whether database updates should be
   * committed. Default behavior is to rollback.
   * 
   * @return whether databases should be updated
   */
  protected boolean shouldCommit() {
    // rollback by default
    return false;
  }

  /**
   * Hook point for subclasses to commit the database updates.
   * 
   * @return
   */
  protected final void commit() {
    clearCaches();

    if (ti != null) {
      ti.commit();

      ti.closeConnection();

      if (!mQuietMode) {
        System.out.println("  Transaction committed");
      }
    }
  }

  /**
   * To be used when clear caches is not sufficient to clear dynamically
   * published codes.
   * 
   * @throws InformationalException
   * @throws AppException
   */
  protected void resetCodeTableCacheVersion() throws AppException, InformationalException {

    curam.util.administration.intf.CacheAdmin cacheAdminObj = curam.util.administration.fact.CacheAdminFactory.newInstance();

    cacheAdminObj.resetCodeTableCacheVersion();

  }

  /**
   * Hook point for subclasses to clearCaches after the database commit.
   * 
   * @return
   */
  protected void clearCaches() {

    // Clearing unique id and code table caches so they do not affect the
    // next
    // test run

    curam.util.administration.intf.CacheAdmin reloadCacheObj = curam.util.administration.fact.CacheAdminFactory.newInstance();

    try {
      reloadCacheObj.reloadCodetableCache();
    } catch (curam.util.exception.AppException e) {

      fail("CodeTables failed to reload" + e.toString());

    } catch (curam.util.exception.InformationalException e) {

      fail("CodeTables failed to reload" + e.toString());

    }
  }

  /**
   * Hook point for subclasses to begin the database transaction.
   * 
   * @return
   */
  protected final void begin() {
    // clear out cache of entity keys
    curam.util.dataaccess.KeyRepository.reset();

    curam.util.type.Date.undoOverrideDate();
    curam.util.type.DateTime.undoOverrideDateTime();

    curam.util.transaction.TransactionInfo.setInformationalManager();

    if (!curam.util.resources.Configuration.getBooleanProperty("curam.test.stubdeferredprocessing")
        || !curam.util.resources.Configuration.getBooleanProperty("curam.test.stubdeferredprocessinsametransaction")) {

      curam.util.resources.Configuration.setProperty("curam.test.stubdeferredprocessing", "true");

      curam.util.resources.Configuration.setProperty("curam.test.stubdeferredprocessinsametransaction", "true");

    }

    // so create the transaction information and start the transaction
    class MyBizTransaction implements curam.util.internal.BizTransaction {
      public boolean transactional() {
        return true;
      }

      public java.lang.String getName() {
        return "CuramServerTest transaction";
      }
    }

    ti = curam.util.transaction.TransactionInfo.setTransactionInfo(curam.util.transaction.TransactionInfo.TransactionType.kOnline, new MyBizTransaction(), null,
        kLocaleForTransaction);

    ti.begin();

    if (!mQuietMode) {
      System.out.println("  Transaction started");
    }

  }

  // ___________________________________________________________________________
  /**
   * This method returns the component in which the test is running (e.g. core,
   * ServicePlans, EvidenceBroker etc.). The default component is "core", which
   * means that any test class that is not running in the "core" component
   * should override this method and return the correct value.
   * 
   * @return The component where the test class is located. The default is
   *         "core".
   */
  protected String getTestComponent() {
    return "core";
  }

  /**
   * This method should be used to determine if the test is being run against a
   * database with limited lock semantics (in particular H2). Which means that
   * certain tests would fail or deadlock due to database locking issues.
   */
  public boolean databaseWithLimitedLockingSemantics() {
    // Check the system configuration, for H2
    if (curam.util.resources.Configuration.getProperty("curam.db.type").compareToIgnoreCase("H2") == 0) {

      // Check to make sure this setting hasn't been bypassed.
      if (!curam.util.resources.Configuration.getBooleanProperty("curam.test.bypassdatabaselimitedlocksemanticscheck")) {
        // Return true
        return true;
      }

    }

    return false;

  }

}
