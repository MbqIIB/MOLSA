package curam.molsa.test.framework;

public class CuramServerTestSuite extends junit.framework.TestSuite {

  public CuramServerTestSuite(String s) {
    super(s);
  }

  protected void addCuramServerTestClass(Class c) {
    addTest(new junit.framework.TestSuite(c));
  }

  /**
   * Adds the specified suite to create a sub-suite.
   * This method exists for readability and to
   * enforce type safety (i.e. encourage developers to
   * use the CuramServer... classes
   */
  protected void addCuramServerSuite(CuramServerTestSuite ts) {
    addTest(ts);
  }
}
