package citizenworkspace.jsp.mockobjects;

import citizenworkspace.jsp.mockobjects.DummyHttpServletRequest;
import java.security.Principal;
import java.util.Enumeration;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

/**
 * Contains simple implementations of a few {@link javax.servlet.http.HttpServletRequest HttpServletRequest} methods for test purposes.
 */
public class FakeHttpServletRequest extends DummyHttpServletRequest {

  private Principal principal;
  private String page;
  private HttpSession session;

  public FakeHttpServletRequest() {
  }

  public void setPrincipal(final Principal principal) {
    this.principal = principal;
  }

  @Override
  public Principal getUserPrincipal() {
    return principal;
  }

  public void setPage(final String page) {
    this.page = page;
  }

  @Override
  public HttpSession getSession() {
    return this.session;
  }

  @Override
  public HttpSession getSession(final boolean create) {
    return this.session;
  }

  public void setSession(final HttpSession session) {
    this.session = session;
  }

  @Override
  public String getContextPath() {
    return "https://fakehost:9999/CitizenPortal";
  }

  @Override
  public String getParameter(final String name) {
    return null;
  }
  
  @Override
  public Enumeration<String> getAttributeNames() {
	return super.getAttributeNames();
  }

  @Override
  public Cookie[] getCookies() {
	return new Cookie[0];
  }
  
}
