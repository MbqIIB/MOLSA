package citizenworkspace.jsp.mockobjects;

import javax.servlet.http.*;
import javax.servlet.ServletContext;
import java.util.Enumeration;

/**
 * Contains dummy implementations of all HttpSession methods. This class does nothing.
 * It has a subclass {@link FakeHttpSession} that implements some of the methods for test purposes.
 */
public abstract class DummyHttpSession implements HttpSession {

  public Object getAttribute(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<String> getAttributeNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public long getCreationTime() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getId() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public long getLastAccessedTime() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getMaxInactiveInterval() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public ServletContext getServletContext() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public HttpSessionContext getSessionContext() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Object getValue(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String[] getValueNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void invalidate() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isNew() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void putValue(String name, Object value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void removeAttribute(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void removeValue(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setAttribute(String name, Object value) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setMaxInactiveInterval(int internal) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
