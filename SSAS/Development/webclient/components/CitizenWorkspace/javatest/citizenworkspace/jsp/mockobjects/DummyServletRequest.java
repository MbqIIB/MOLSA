package citizenworkspace.jsp.mockobjects;

import java.io.BufferedReader;
import java.security.Principal;
import javax.servlet.*;
import java.util.*;

/**
 * Contains dummy implementations of all ServletRequest methods. This class does nothing.
 */
public abstract class DummyServletRequest implements ServletRequest {

  public AsyncContext getAsyncContext() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Object getAttribute(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<String> getAttributeNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getCharacterEncoding() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getContentLength() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getContentType() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public DispatcherType getDispatcherType() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public ServletInputStream getInputStream() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getLocalAddr() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Locale getLocale() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<Locale> getLocales() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getLocalName() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getLocalPort() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getParameter(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Map<String, String[]> getParameterMap() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Enumeration<String> getParameterNames() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String[] getParameterValues(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getProtocol() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public BufferedReader getReader() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRealPath(String path) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRemoteAddr() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getRemoteHost() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getRemotePort() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public RequestDispatcher getRequestDispatcher(String path) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getScheme() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getServerName() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getServerPort() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public ServletContext getServletContext() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isAsyncStarted() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isAsyncSupported() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isSecure() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void removeAttribute(String name) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setAttribute(String name, Object o) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setCharacterEncoding(String env) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public AsyncContext startAsync() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public AsyncContext startAsync(ServletRequest request, ServletResponse response) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
