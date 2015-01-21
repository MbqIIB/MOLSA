package citizenworkspace.jsp;

import citizenworkspace.jsp.mockobjects.FakeHttpServletRequest;
import citizenworkspace.jsp.mockobjects.FakeHttpServletResponse;
import citizenworkspace.jsp.mockobjects.FakeHttpSession;
import citizenworkspace.jsp.mockobjects.FakeJspWriter;
import curam.util.common.JDEException;
import java.io.IOException;
import java.util.Enumeration;

import junit.framework.TestCase;

/**
 * Contains test cases for UserHome.
 */
public class TestForwardExternalLogin extends TestCase {
	
  private final static String kExpectedURL = 
	"https://fakehost:9999/CitizenPortal/application.do?directLink%3DCitizenAccount_startProcessPage.do%3Flang%3Den%26token%3D56456";

  /**
   * Default constructor.
   * 
   * @param name
   *          FIXME
   */
  public TestForwardExternalLogin(final String name) {
    super(name);
  }

  /**
   * Test the expected URL.
   * 
   * @throws JDEException
   *           Generic exception signature
   * @throws IOException
   *           Generic exception signature
   */
  public final void testUIMPage() throws JDEException, IOException {

	  // Setup
	    FakeHttpServletRequest fakeRequest = new FakeHttpServletRequest();
	    FakeHttpSession fakeHttpSession = new FakeHttpSession();
	    
	    fakeRequest.setSession(fakeHttpSession);
	    
	    FakeJspWriter out = new FakeJspWriter();
	    
	    FakeHttpServletResponse response = new FakeHttpServletResponse();
	    
	    // Call the method under test
	    String url = citizenworkspace.jsp.ProcessForwardExternalLogin
	        .redirectToUserHome(fakeRequest, response, out, "56456");

	    assertNotNull(url);
	    
	    assertEquals(kExpectedURL, url);
	    
  }
}
