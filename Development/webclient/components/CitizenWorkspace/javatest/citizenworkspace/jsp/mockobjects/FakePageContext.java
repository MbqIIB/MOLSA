package citizenworkspace.jsp.mockobjects;

import java.util.Enumeration;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.el.*;
import javax.servlet.*;
import javax.el.ELContext;

/**
 * Contains simple implementations of a few {@link PageContext} methods for test purposes.
 */
public class FakePageContext extends PageContext {

  public FakePageContext() {
    super();
  }

  public void forward(String relativeUrlPath) { }
  public Exception getException() { return null; }
  public Object getPage() { return null; }
  public ServletRequest getRequest() { return null; }
  public ServletResponse getResponse() { return null; }
  public ServletConfig getServletConfig() { return null; }
  public ServletContext getServletContext() { return null; }
  public HttpSession getSession() { return null; }
  public void handlePageException(Exception e) { }
  public void handlePageException(Throwable t) { }
  public void include(String relativeUrlPath) { }
  public void include(String relativeUrlPath, boolean flush) { }
  public void initialize(Servlet servlet, ServletRequest request, ServletResponse response, String errorPageURL, boolean needsSession, int bufferSize, boolean autoFlush) { }
  public void release() { }
  
  // Methods from JspContext class
  public Object findAttribute(String name) { return null; }
  public Object getAttribute(String name) { return null; }
  public Object getAttribute(String name, int scope) { return null; }
  public Enumeration<String> getAttributeNamesInScope(int scope) { return null; }
  public int getAttributesScope(String name) { return -1; }
  public ELContext getELContext() { return null; }
  public ExpressionEvaluator getExpressionEvaluator() { return null; }
  public JspWriter getOut() { return null; }
  public VariableResolver getVariableResolver() { return null; }
  public void removeAttribute(String name) { }
  public void removeAttribute(String name, int scope) { }
  public void setAttribute(String name, Object value) { }
  public void setAttribute(String name, Object value, int scope) { }
}
