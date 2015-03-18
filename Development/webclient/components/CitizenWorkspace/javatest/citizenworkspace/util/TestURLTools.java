/*
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * Copyright IBM Corporation 2014
 *
 * The source code for this program is not published or otherwise divested
 * of its trade secrets, irrespective of what has been deposited with the US
 * Copyright Office
 */
package citizenworkspace.util;

import junit.framework.TestCase;

/**
 * Test cases for the {@linkplain URLTools} class.
 */
public class TestURLTools extends TestCase {

  /**
   * Default constructor
   * 
   * @param name
   */
  public TestURLTools(final String name) {
    super(name);
  }

  public void testEncodePageParams_validInput() {
    String result = URLTools
        .encodePageParams("&screeningID=2001&programIDs=2001,2002,2003&test=../");
    assertEquals("&screeningID=2001&programIDs=2001%2C2002%2C2003&test=..%2F",
        result);
  }

  public void testEncodePageParams_nullString() {
    String result = URLTools.encodePageParams(null);
    assertEquals(null, result);
  }

  public void testEncodePageParams_blankString() {
    String result = URLTools.encodePageParams("");
    assertEquals("", result);
  }

  public void testEncodePageParams_emptyValue() {
    String result = URLTools.encodePageParams("&a=&b=");
    assertEquals("&a=&b=", result);
  }

  public void testEncodePageParams_multipleAmpersands() {
    String result = URLTools.encodePageParams("&&test1=A&&test2=B");
    assertEquals("&test1=A&test2=B", result);
  }

}
