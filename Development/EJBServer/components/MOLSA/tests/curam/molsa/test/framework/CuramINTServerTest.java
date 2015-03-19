package curam.molsa.test.framework;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import junit.framework.TestCase;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * add test data load functionality
 * 
 */
public class CuramINTServerTest extends TestCase {
  /**
   * keys in Bootstrap.properties.
   */
  protected static final String kDBTypeKey = "curam.db.type";

  /**
   * keys in Bootstrap.properties.
   */
  protected static final String kDataFileLocation = "datafile.location.";

  /**
   * keys in Bootstrap.properties.
   */
  protected static final String kServerDirKey = "user.dir";

  /**
   * name for CLOB file location. use path relative to EJBServer.
   */
  protected static final String kClobFileLocationLoc = "CLOBFILE(";

  /**
   * name for BLOB file location. use path relative to EJBServer.
   */
  protected static final String kBlobFileLocationLoc = "BLOBFILE(";

  /**
   * Should we display the SQL?
   */
  private boolean showSQL = true;

  /**
   * Date format
   */

  private static final String DATE_FORMAT_YYYY_MM_DD = "'9999-99-99'";

  private static final String DATE_FORMAT_YYYY_MM_D = "'9999-9-99'";

  private static final String DATE_FORMAT_YYYY_M_DD = "'9999-99-9'";

  private static final String DATE_FORMAT_YYYY_M_D = "'9999-9-9'";

  private static final String DATE_FORMAT_MM_DD_YYYY = "'99-99-9999'";

  private static final String DATE_FORMAT_D_MM_YYYY = "'99-9-9999'";

  private static final String DATE_FORMAT_DD_M_YYYY = "'9-99-9999'";

  private static final String DATE_FORMAT_D_M_YYYY = "'9-9-9999'";

  private static final String DATES[] = { DATE_FORMAT_YYYY_MM_DD, DATE_FORMAT_YYYY_MM_D, DATE_FORMAT_YYYY_M_DD, DATE_FORMAT_YYYY_M_D, DATE_FORMAT_MM_DD_YYYY,
      DATE_FORMAT_D_MM_YYYY, DATE_FORMAT_DD_M_YYYY, DATE_FORMAT_D_M_YYYY };

  private static final String ORACLE_DATE_FORMAT = "'YYYY-MM-DD HH24.MI.SS'";

  private static final String TIMESTAMP_FORMAT_1 = "'9999-99-99";

  private static final String TIMESTAMP_FORMAT_2 = "'9999-9-99";

  private static final String TIMESTAMP_FORMAT_3 = "'9999-99-9";

  private static final String TIMESTAMP_FORMAT_4 = "'9999-9-9";

  private static final String TIMESTAMP_FORMAT_5 = "'99-99-9999";

  private static final String TIMESTAMP_FORMAT_6 = "'9-99-9999";

  private static final String TIMESTAMP_FORMAT_7 = "'99-9-9999";

  private static final String TIMESTAMP_FORMAT_8 = "'9-9-9999";

  private static final String TIMESTAMPS[] = { TIMESTAMP_FORMAT_1, TIMESTAMP_FORMAT_2, TIMESTAMP_FORMAT_3, TIMESTAMP_FORMAT_4, TIMESTAMP_FORMAT_5, TIMESTAMP_FORMAT_6,
      TIMESTAMP_FORMAT_7, TIMESTAMP_FORMAT_8 };

  private static final String REPLACE_WITH_EMPTY_STRING = "''";

  private static final String CURRENT_DATE = "CURRENT DATE";

  private static final String CURRENT_TIMESTAMP = "CURRENT TIMESTAMP";

  private static final String CHAR_TIMESTAMP = "CHAR(CURRENT TIMESTAMP)";

  static int pos = 0;

  /**
   * The locale that is associated with the user whose access is being simulated
   * by this test class.
   */
  private static final String kLocaleForTransaction = "en";

  /**
   * Constructor for CuramINTServerTest
   */
  public CuramINTServerTest(String arg0) {
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

    Configuration.setProperty(EnvVars.ENV_ENACT_WORKFLOW_PROCESS_DISABLED, CuramConst.kYES);

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

  public void loadTestData(String methodName) {
    String classname = this.getClass().getName();
    ResourceBundle bundle = null;

    try {
      bundle = ResourceBundle.getBundle(classname);
    } catch (MissingResourceException ex) {
      // no need to load data if resource file does not exist
    }
    if (bundle == null) {
      return; // no data file for the test case
    }

    String fileloc = null;
    try {
      fileloc = bundle.getString(kDataFileLocation + methodName + '.' + Configuration.getProperty(kDBTypeKey));
    } catch (MissingResourceException ex) {
      try {
        fileloc = bundle.getString(kDataFileLocation + methodName);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    String absFileLoc = Configuration.getProperty(kServerDirKey) + '/' + fileloc;
    if (isShowSQL()) {
      System.out.println("SQL file: " + absFileLoc);
    }

    try {
      FileReader fr = new FileReader(absFileLoc);
      BufferedReader br = new BufferedReader(fr);
      String line = "";
      String sqlString = "";
      while (line != null) {
        line = br.readLine();
        if (line != null) {
          line = line.trim();
          if (line.length() == 0 || line.length() > 1 && line.charAt(0) == '-' && line.charAt(1) == '-') {
            continue;
          }
          if (line.charAt(line.length() - 1) == ';') {
            if (line.length() > 1) {
              if (sqlString.length() > 0) {
                sqlString = sqlString + ' ' + line.substring(0, line.length() - 1);
              } else {
                sqlString = line.substring(0, line.length() - 1);
              }
            }
            if (sqlString.length() > 0) {
              // execute the sql command
              if (isShowSQL()) {
                System.out.println(sqlString);
              }
              executeSQL(sqlString);
              sqlString = "";
            }
          } else {
            // just accumulate the string, anticipating ';' to end
            // it
            if (sqlString.length() > 0) {
              sqlString = sqlString + ' ' + line.substring(0, line.length());
            } else {
              sqlString = line.substring(0, line.length());
            }
          }
        }
      }
    } catch (IOException ex) {
      // if file not found, make the test case fail, since succeeding test
      // method
      // might rely on it.
      fail("Failed to open the sql file " + absFileLoc);
    }
  }

  private String convertTimeStamp(String theTimestamp, String theFormat) {
    StringBuffer retData = new StringBuffer();
    StringBuffer buffer = new StringBuffer();
    int lengths[] = { 2, 2, 2, 6 };

    String parts[] = { "", "", "", "" };
    int pos = 0;

    retData.append(convertDate(theTimestamp.substring(0, theFormat.length() - 1)));
    ;
    retData.append(" ");

    // get the bits out
    for (int i = theFormat.length(); i < theTimestamp.length(); i++) {
      if ((theTimestamp.charAt(i) != '.') && (theTimestamp.charAt(i) != ':')) {
        buffer.append(theTimestamp.charAt(i));
      } else {
        parts[pos] = buffer.toString();
        pos++;
        buffer = new StringBuffer();
      }
    }
    parts[pos] = buffer.toString();

    // pad things if needed
    for (int i = 0; i < 3; i++) {
      while (parts[i].length() < lengths[i]) {
        if (lengths[i] == 2) {
          parts[i] = "0" + parts[i];
        } else {
          parts[i] = parts[i] + "0";
        }
      }
      retData.append(parts[i]);
      retData.append(".");
    }

    // remove the last "."
    return retData.toString().substring(0, retData.toString().length() - 1);
  }

  private String convertDate(String theDate) {
    String parts[] = new String[3];
    int pos = 0;

    StringBuffer buffer = new StringBuffer();
    for (int i = 0; i < theDate.length(); i++) {
      if ((theDate.charAt(i) != '-') && (theDate.charAt(i) != '/')) {
        buffer.append(theDate.charAt(i));
      } else {
        if (buffer.length() == 1) {
          buffer.append("0");
          buffer.reverse();
        }
        parts[pos] = buffer.toString();

        buffer = new StringBuffer();
        pos++;
      }
    }
    if (buffer.length() == 1) {
      buffer.append("0");
      buffer.reverse();
    }
    parts[2] = buffer.toString();
    buffer = new StringBuffer();

    // question, is year first?
    if (parts[0].length() == 4) {
      buffer.append(parts[0]).append("-").append(parts[1]).append("-").append(parts[2]);
    } else {
      buffer.append(parts[2]).append("-").append(parts[0]).append("-").append(parts[1]);
    }

    return buffer.toString();
  }

  private String convertSQLForOracle(String sqlCommand) {
    StringBuffer sqlFormat = new StringBuffer();
    pos++;

    for (int i = 0; i < sqlCommand.length(); i++) {
      if (sqlCommand.toUpperCase().charAt(i) >= 'A' && sqlCommand.toUpperCase().charAt(i) <= 'Z') {
        sqlFormat.append('X');
      } else {
        if (sqlCommand.toUpperCase().charAt(i) >= '0' && sqlCommand.toUpperCase().charAt(i) <= '9') {
          sqlFormat.append('9');
        } else {
          if (sqlCommand.charAt(i) == '/') {
            sqlFormat.append('-');
          } else {
            if (sqlCommand.charAt(i) == ':') {
              sqlFormat.append('.');
            } else {
              sqlFormat.append(sqlCommand.charAt(i));
            }
          }
        }
      }
    }
    if (isShowSQL()) {
      System.out.println("pos=" + pos);
      System.out.println(sqlCommand);
      System.out.println(sqlFormat.toString());

    }

    StringBuffer retString = new StringBuffer();

    for (int i = 0; i < sqlCommand.length(); i++) {

      boolean charProcessed = false;

      for (int j = 0; j < DATES.length; j++) {
        String theDateFormat = DATES[j];
        if (i + theDateFormat.length() < sqlCommand.length()) {
          String subString = sqlFormat.substring(i, i + theDateFormat.length());
          if (subString.equalsIgnoreCase(theDateFormat)) {
            subString = sqlCommand.substring(i + 1, i + theDateFormat.length() - 1);
            charProcessed = true;
            retString.append("TO_DATE ('");
            retString.append(convertDate(subString));
            retString.append("', ");
            retString.append(ORACLE_DATE_FORMAT);
            retString.append(")");
            i += theDateFormat.length() - 1;
            break;
          }
        }
      }

      if (!charProcessed) {
        for (int j = 0; j < TIMESTAMPS.length; j++) {
          String theTimestampFormat = TIMESTAMPS[j];
          if (i + theTimestampFormat.length() < sqlCommand.length()) {
            String subString = sqlFormat.substring(i, i + theTimestampFormat.length());
            if (subString.equalsIgnoreCase(theTimestampFormat)) {
              // right, need to count to the next '
              int pos = i + theTimestampFormat.length() - 1;
              while (sqlFormat.charAt(pos) != '\'') {
                pos++;
              }
              subString = sqlCommand.substring(i + 1, pos);

              charProcessed = true;
              retString.append("TO_DATE ('");

              retString.append(convertTimeStamp(subString, theTimestampFormat));
              retString.append("', ");
              retString.append(ORACLE_DATE_FORMAT);
              retString.append(")");
              i = pos;
              break;
            }
          }
        }
      }

      if (!charProcessed) {
        if (i + REPLACE_WITH_EMPTY_STRING.length() < sqlCommand.length()) {
          if ((sqlFormat.substring(i, i + REPLACE_WITH_EMPTY_STRING.length()).equals(REPLACE_WITH_EMPTY_STRING))) {
            retString.append("' '");
            i += 2;
          }
        }
      }

      if (!charProcessed) {
        if (i + CHAR_TIMESTAMP.length() < sqlCommand.length()) {
          if ((sqlCommand.substring(i, i + CHAR_TIMESTAMP.length()).equalsIgnoreCase(CHAR_TIMESTAMP))) {
            retString.append("'");
            retString.append(Calendar.getInstance().get(Calendar.YEAR));
            retString.append("-");
            String temp = "" + (1 + Calendar.getInstance().get(Calendar.MONTH));
            if (temp.length() == 1) {
              retString.append("0");
            }
            retString.append(temp);
            retString.append("-");
            temp = "" + Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
            if (temp.length() == 1) {
              retString.append("0");
            }
            retString.append(temp);
            retString.append("-");
            temp = "" + Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
            if (temp.length() == 1) {
              retString.append("0");
            }
            retString.append(temp);
            retString.append(".");
            temp = "" + Calendar.getInstance().get(Calendar.MINUTE);
            if (temp.length() == 1) {
              retString.append("0");
            }
            retString.append(temp);
            retString.append(".");
            temp = "" + Calendar.getInstance().get(Calendar.SECOND);
            if (temp.length() == 1) {
              retString.append("0");
            }
            retString.append(temp);
            retString.append(".");
            retString.append("000000");
            retString.append("'");

            i += CHAR_TIMESTAMP.length();
          }
        }
      }

      if (!charProcessed) {
        if (i + CURRENT_TIMESTAMP.length() < sqlCommand.length()) {
          if ((sqlCommand.substring(i, i + CURRENT_TIMESTAMP.length()).equalsIgnoreCase(CURRENT_TIMESTAMP))) {

            Date date = null;

            i += CURRENT_TIMESTAMP.length();

            while (sqlCommand.substring(i, i + 1).equals(" ")) {
              i++;
            }

            if (sqlCommand.charAt(i) == ',' || sqlCommand.charAt(i) == ')') {
              date = new Date().getCurrentDate();
            } else {
              String sign = sqlCommand.substring(i, i + 1);
              String amount = "";
              String units = "";
              i++;

              while (((sqlCommand.charAt(i) >= '0') && (sqlCommand.charAt(i) <= '9')) || (sqlCommand.charAt(i) == ' ')) {
                amount += sqlCommand.charAt(i);
                i++;
              }
              while (sqlCommand.charAt(i) != ',') {
                units += sqlCommand.charAt(i);
                i++;
              }

              if (units.trim().equalsIgnoreCase("days") || units.trim().equalsIgnoreCase("day")) {
                if (sign.trim().equals("+")) {
                  date = new Date().getCurrentDate().addDays(Integer.parseInt(amount.trim()));
                }
                if (sign.trim().equals("-")) {
                  date = new Date().getCurrentDate().addDays(Integer.parseInt("-" + amount.trim()));
                }
              }
            }
            if (date == null) {
              System.out.println(" ERROR converting current date");
              int x = 1 / 0;
            }

            retString.append("TO_DATE ('");
            retString.append(date.getCalendar().get(Calendar.YEAR));
            retString.append("-");
            retString.append(date.getCalendar().get(Calendar.MONTH) + 1);
            retString.append("-");
            retString.append(date.getCalendar().get(Calendar.DATE));
            retString.append("', ");
            retString.append(ORACLE_DATE_FORMAT);
            retString.append(")");
          }

        }
      }

      if (!charProcessed) {
        if (i + CURRENT_DATE.length() < sqlCommand.length()) {
          if ((sqlCommand.substring(i, i + CURRENT_DATE.length()).equalsIgnoreCase(CURRENT_DATE))) {

            Date date = null;

            i += CURRENT_DATE.length();

            while (sqlCommand.substring(i, i + 1).equals(" ")) {
              i++;
            }

            if ((sqlCommand.charAt(i) == ',') || (sqlCommand.charAt(i) == ')')) {
              date = new Date().getCurrentDate();
            } else {
              String sign = sqlCommand.substring(i, i + 1);
              String amount = "";
              String units = "";
              i++;

              while (((sqlCommand.charAt(i) >= '0') && (sqlCommand.charAt(i) <= '9')) || (sqlCommand.charAt(i) == ' ') || (sqlCommand.charAt(i) == ')')) {
                amount += sqlCommand.charAt(i);
                i++;
              }
              while ((sqlCommand.charAt(i) != ',') && (sqlCommand.charAt(i) != ')')) {
                units += sqlCommand.charAt(i);
                i++;
              }

              int days = Integer.parseInt(amount.trim());
              if (sign.trim().equals("-")) {
                days *= -1;
              }
              if (units.trim().equalsIgnoreCase("month") || units.trim().equalsIgnoreCase("months")) {
                days *= 365;
              }
              if (units.trim().equalsIgnoreCase("year") || units.trim().equalsIgnoreCase("years")) {
                days *= 365;
              }
              date = new Date().getCurrentDate().addDays(days);
            }
            if (date == null) {
              System.out.println(" ERROR converting current date");
              int x = 1 / 0;
            }

            retString.append("TO_DATE ('");
            retString.append(date.getCalendar().get(Calendar.YEAR));
            retString.append("-");
            retString.append(date.getCalendar().get(Calendar.MONTH) + 1);
            retString.append("-");
            retString.append(date.getCalendar().get(Calendar.DATE));
            retString.append("', ");
            retString.append(ORACLE_DATE_FORMAT);
            retString.append(")");
          }
        }
      }

      if (!charProcessed) {
        retString.append(sqlCommand.charAt(i));
      }
    }
    if (isShowSQL()) {
      System.out.println(retString.toString());
    }
    return retString.toString();
  }

  /**
   * execute sql command.
   * 
   * @param sqlCommand
   *          the sql command to be executed
   */

  protected void executeSQL(String sqlCommand) {
    try {

      if (Configuration.getProperty("curam.db.type").equals("ORA")) {
        sqlCommand = convertSQLForOracle(sqlCommand);
      }
      TransactionInfo info = TransactionInfo.getInfo();
      Connection conn = info.getInfoConnection();
      boolean isClobUpdate = isClOBUpdate(sqlCommand);
      boolean isBlobUpdate = isBlOBUpdate(sqlCommand);
      if (isClobUpdate || isBlobUpdate) {
        int pos = (isClobUpdate ? sqlCommand.indexOf(kClobFileLocationLoc) : sqlCommand.indexOf(kBlobFileLocationLoc));
        String updatedSqlCommand = sqlCommand.substring(0, pos) + " ? ";
        String remainingSqlCommand = sqlCommand.substring(pos + kClobFileLocationLoc.length());
        pos = remainingSqlCommand.indexOf(')');
        String fileloc = Configuration.getProperty(kServerDirKey) + '/' + remainingSqlCommand.substring(0, pos);
        updatedSqlCommand = updatedSqlCommand + remainingSqlCommand.substring(pos + 1);
        PreparedStatement preparedstatement = conn.prepareStatement(updatedSqlCommand);
        File file = new File(fileloc);
        if (isClobUpdate) {
          preparedstatement.setCharacterStream(1, new FileReader(file), (int) file.length());
        } else { // Blob
          preparedstatement.setBinaryStream(1, new FileInputStream(file), (int) file.length());
        }
        preparedstatement.execute();
        preparedstatement.close();
      } else {
        Statement stmt = conn.createStatement();
        stmt.execute(sqlCommand);
        stmt.close();
      }
    } catch (SQLException ex) {

      System.out.println(" error executing SQL statement : " + sqlCommand);
      ex.printStackTrace();
      fail("Exception in executing the sql command, " + ex.getMessage());
    } catch (IOException ex) {
      ex.printStackTrace();
      fail("Exception in openning lob file" + ex.getMessage());
    } catch (Exception e) {
      System.out.println(" error executing SQL statement : " + sqlCommand);
      e.printStackTrace();
      fail("Exception in executing the sql command, " + e.getMessage());
    }

  }

  /**
   * return true if sql command has CLOBFILE keyword.
   * 
   * @param sqlCommand
   *          SQL command.
   */
  protected boolean isClOBUpdate(String sqlCommand) {
    if (sqlCommand.indexOf(kClobFileLocationLoc) != -1) {
      return true;
    }
    return false;
  }

  /**
   * return true if sql command has BLOBFILE keyword.
   * 
   * @param sqlCommand
   *          SQL command.
   */
  protected boolean isBlOBUpdate(String sqlCommand) {
    if (sqlCommand.indexOf(kBlobFileLocationLoc) != -1) {
      return true;
    }
    return false;
  }

  /**
   * override the core metohd. Reset the TransactionInfo InformationalManager,
   * so it doesn't remember previous messages.
   * 
   */

  /**
   * A method to convert a date string formatted in the current default
   * format, into a date string formatted in the default SQL format
   * yyyy-mm-dd. This method is complicated by the fact that the Curam Date
   * allows you to print to its default format, but does not allow you to load
   * from its default format. Therefore we need to use date formats, etc, to
   * remedy this shortcoming.
   */
  protected static String formatDateStringForSQL(String str) throws AppException {
    // load the current default format IF there is a format string available
    // in Curam Date
    if (null != curam.util.type.Date.kDateFormatFromProps && (!"".equals(curam.util.type.Date.kDateFormatFromProps))) {
      try {
        java.text.DateFormat formatter = new java.text.SimpleDateFormat(curam.util.type.Date.kDateFormatFromProps);
        // parse into a java Date object
        java.util.Date utilDate = formatter.parse(str);
        // copy into a java SQL Date object
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        // and print it out as an SQL escaped Date
        return sqlDate.toString();
      } catch (java.text.ParseException e) {
        // if a parse excpetion happens then the input string is not
        // suited to the
        // current Curam runtime's default format
        throw new AppRuntimeException(e);
      }
    } else {
      // if there is no format string available then just use the date
      // string as is..
      return str;
    }
  }

  /**
   * @return Returns the showSQL.
   */
  public boolean isShowSQL() {
    return showSQL;
  }

  /**
   * @param showSQL
   *          The showSQL to set.
   */
  public void setShowSQL(boolean showSQL) {
    this.showSQL = showSQL;
  }

  /**
   * Implementation of the JUnit 3.8.x assertNotSame method.
   * Provided to allow 3.8.x style JUnits to run with JUnit 3.7
   * 
   * @param arg0
   * @param arg1
   */
  public static void assertNotSame(Object arg0, Object arg1) {
    assertFalse(arg0 == arg1);
  }

  /**
   * Implementation of the JUnit 3.8.x assertNotSame method.
   * Provided to allow 3.8.x style JUnits to run with JUnit 3.7
   * 
   * @param message
   * @param arg0
   * @param arg1
   */
  public static void assertNotSame(String message, Object arg0, Object arg1) {
    assertFalse(message, (arg0 == arg1));
  }

  /**
   * Implementation of the JUnit 3.8.x assertNotSame method.
   * Provided to allow 3.8.x style JUnits to run with JUnit 3.7
   * 
   * @param condition
   */
  public static void assertFalse(boolean condition) {
    assertEquals(condition, false);
  }

  /**
   * Implementation of the JUnit 3.8.x assertNotSame method.
   * Provided to allow 3.8.x style JUnits to run with JUnit 3.7
   * 
   * @param message
   * @param condition
   */
  public static void assertFalse(String message, boolean condition) {
    assertEquals(message, condition, false);
  }

}
