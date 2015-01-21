package citizenworkspace.jsp.mockobjects;

import java.security.Principal;
import javax.servlet.http.*;
import java.util.Collection;
import java.util.Enumeration;

/**
 * Contains dummy implementations of all HttpServletRequest methods. This class does nothing.
 * It has a subclass {@link FakeHttpServletRequest} that implements some of the methods for test purposes.
 */
public abstract class DummyHttpServletRequest extends DummyServletRequest implements HttpServletRequest {

  public boolean authenticate(HttpServletResponse response) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getAuthType() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getContextPath() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Cookie[] getCookies() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public long getDateHeader(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getHeader(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<String> getHeaderNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<String> getHeaders(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getIntHeader(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getMethod() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public javax.servlet.http.Part getPart(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Collection<javax.servlet.http.Part> getParts() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getPathInfo() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getPathTranslated() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getQueryString() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRemoteUser() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRequestedSessionId() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRequestURI() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public StringBuffer getRequestURL() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getServletPath() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public HttpSession getSession() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public HttpSession getSession(boolean create) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Principal getUserPrincipal() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isRequestedSessionIdFromCookie() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isRequestedSessionIdFromUrl() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); } // Deprecated
  public boolean isRequestedSessionIdFromURL() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isRequestedSessionIdValid() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isUserInRole(String role) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void login(String username, String password) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void logout() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
