package curam.molsa.test.eligibility.framework;

import java.io.File;

import curam.creole.calculator.CREOLETestHelper;
import curam.creole.execution.RuleObject;
import curam.creole.execution.session.InterpretedRuleObjectFactory;
import curam.creole.execution.session.RecalculationsProhibited;
import curam.creole.execution.session.Session;
import curam.creole.execution.session.SessionDoc;
import curam.creole.execution.session.Session_Factory;
import curam.creole.execution.session.StronglyTypedRuleObjectFactory;
import curam.creole.parser.RuleSetXmlReader;
import curam.creole.ruleitem.RuleSet;
import curam.creole.storage.inmemory.InMemoryDataStorage;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.test.framework.CuramServerTest;
import curam.util.type.Date;

/**
 * Base class for testing Creole rules. All test classes should extend
 * this class.
 * 
 * 
 */
public abstract class MOLSACreoleBaseTest extends CuramServerTest implements MOLSACreoleTestConstants {

  // -------------------------------------------------------------------------------------
  //
  // variables
  //
  // -------------------------------------------------------------------------------------
  /**
   * Set to true when debuging tests
   */
  private boolean outputSessionDoc = true;

  /**
   * The CERT session object
   */
  private Session session = null;

  /**
   * Useful for debugging
   */
  private SessionDoc sessionDoc = null;

  /**
   * The rule set object
   */
  private RuleSet ruleSet = null;

  /**
   * relative location of the rule set class
   */
  private static final String RULESET_LOCATION = "/build/svr/creole.gen/Rules/components/MOLSA/";

  /**
   * The rule set name
   */
  private String RULESET_NAME = null;

  /**
   * Sets the mode for the tests to run
   */
  public MOLSACreoleBaseTest(String arg0) {
    super(arg0);

    if (getSessionType() != null) {
      if (getSessionType().equals(STRONGLY_TYPED)) {
        setSession(Session_Factory.getFactory().newInstance(new RecalculationsProhibited(), new InMemoryDataStorage(new StronglyTypedRuleObjectFactory())));
      } else {
        setSession(Session_Factory.getFactory().newInstance(new RecalculationsProhibited(), new InMemoryDataStorage(new InterpretedRuleObjectFactory())));
      }
      setSessionDoc(new SessionDoc(getSession()));
    }

  }

  // -------------------------------------------------------------------------------------
  //
  // Indicators
  //
  // -------------------------------------------------------------------------------------

  protected boolean isOutputSessionDoc() {
    return outputSessionDoc;
  }

  /**
   * Provide additional functionality for the CuramServerTest teardown method.
   */
  @Override
  protected void tearDownCuramServerTest() {
    /*
     * Write out SessionDoc, to a directory named after the test method.
     */
    if (getSessionDoc() != null) {
      if (isOutputSessionDoc()) {
    	  final File sessionDocRoot = new File("C:/Junits_sessiondoc");        
    	  getSessionDoc().write(sessionDocRoot);
      }
    }
  }

  // -------------------------------------------------------------------------------------
  //
  // CER assertion methods
  //
  // -------------------------------------------------------------------------------------
  protected void checkValue(String fieldName, String value, RuleObject ruleObject) {
    CREOLETestHelper.assertEquals(value, ruleObject.getAttributeValue(fieldName).getValue().toString());
  }

  protected void checkValue(String fieldName, boolean value, RuleObject ruleObject) {
    CREOLETestHelper.assertEquals(value, ruleObject.getAttributeValue(fieldName).getValue());
  }

  protected void checkValue(String fieldName, int value, RuleObject ruleObject) {
    CREOLETestHelper.assertEquals(value, ruleObject.getAttributeValue(fieldName).getValue());
  }

  protected void checkValue(String fieldName, long value, RuleObject ruleObject) {
    CREOLETestHelper.assertEquals(value, ruleObject.getAttributeValue(fieldName).getValue());
  }

  protected void checkTimelineValue(String fieldName, @SuppressWarnings("rawtypes") Timeline value, RuleObject ruleObject) {
    CREOLETestHelper.assertEquals(value, ruleObject.getAttributeValue(fieldName).getValue());
  }

  // -------------------------------------------------------------------------------------
  //
  // abstract methods
  //
  // -------------------------------------------------------------------------------------

  /**
   * Enforcer to ensure the child class provides a rule set name
   */
  protected abstract void setRuleSetName();

  // -------------------------------------------------------------------------------------
  //
  // getter methods
  //
  // -------------------------------------------------------------------------------------
  /**
   * Returns the rule set to be tested.
   */
  @SuppressWarnings("unused")
  private RuleSet getRuleset() {
    if (ruleSet == null) {
      final RuleSetXmlReader ruleSetXmlReader = new RuleSetXmlReader(System.getProperty("user.dir") + getRuleSetLocation() + getRuleSetName() + XML_EXT);
      ruleSet = ruleSetXmlReader.ruleSet();
    }
    return ruleSet;
  }

  protected Session getSession() {
    return session;
  }

  protected SessionDoc getSessionDoc() {
    return sessionDoc;
  }

  protected String getRuleSetLocation() {
    return RULESET_LOCATION;
  }

  protected String getSessionType() {
    return STRONGLY_TYPED;
  }

  protected String getSessionDocOutoutDir() {
    return "./gen/sessiondoc/";
  }

  // -------------------------------------------------------------------------------------
  //
  // setter methods
  //
  // -------------------------------------------------------------------------------------
  protected void setSessionDoc(SessionDoc sessionDoc) {
    this.sessionDoc = sessionDoc;
  }

  protected void setSession(Session session) {
    this.session = session;
  }

  protected void setOutputSessionDoc(boolean outputSessionDoc) {
    this.outputSessionDoc = outputSessionDoc;
  }

  protected String getRuleSetName() {
    return RULESET_NAME;
  }

  protected void setFileName(String ruleSetName) {
    this.RULESET_NAME = ruleSetName;
  }

  /**
   * Create a time line for a Boolean.
   */
  @SuppressWarnings({ "unchecked" })
  protected Timeline<Boolean> getBooleanTimeline(boolean value) {
    return new Timeline<Boolean>(
    // "start of time", 0
        new Interval<Boolean>(null, false),
        // from 2001
        new Interval<Boolean>(Date.fromISO8601("20010101"), value));
  }

  /**
   * Create a time line for a monetary amount.
   */
  @SuppressWarnings({ "unchecked" })
  protected Timeline<Number> getAmountTimeline(Number amount) {
    return new Timeline<Number>(
    // "start of time", 0
        new Interval<Number>(null, 0),
        // from 2001
        new Interval<Number>(Date.fromISO8601("20010101"), amount));
  }

}