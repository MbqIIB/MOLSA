package citizenworkspace.jsp.mockobjects;

import javax.servlet.http.*;
import java.util.Collection;

/**
 * Contains dummy implementations of all HttpServletResponse methods. This class does nothing.
 * It has a subclass {@link FakeHttpServletResponse} that implements some of the methods for test purposes.
 */
public abstract class DummyHttpServletResponse extends DummyServletResponse implements HttpServletResponse {

  public void addCookie(Cookie cookie) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void addDateHeader(String name, long date) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); } 
  public void addHeader(String name, String value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void addIntHeader(String name, int value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean containsHeader(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String encodeRedirectUrl(String url) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String encodeRedirectURL(String url) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String encodeUrl(String url) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String encodeURL(String url) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getHeader(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Collection<String> getHeaderNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Collection<String> getHeaders(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getStatus() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void sendError(int sc) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void sendError(int sc, String msg) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void sendRedirect(String location) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setDateHeader(String name, long date) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setHeader(String name, String value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setIntHeader(String name, int value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setStatus(int sc) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setStatus(int sc, String sm) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
