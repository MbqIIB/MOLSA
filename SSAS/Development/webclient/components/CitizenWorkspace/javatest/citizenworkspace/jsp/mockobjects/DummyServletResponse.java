package citizenworkspace.jsp.mockobjects;

import java.io.PrintWriter;
import javax.servlet.*;
import java.util.Locale;

/**
 * Contains dummy implementations of all ServletResponse methods. This class does nothing.
 */
public abstract class DummyServletResponse implements ServletResponse {

  public void flushBuffer() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); };
  public int getBufferSize() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getCharacterEncoding() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public String getContentType() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public Locale getLocale() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public ServletOutputStream getOutputStream() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public PrintWriter getWriter() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public boolean isCommitted() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void reset() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void resetBuffer() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setBufferSize(int size) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setCharacterEncoding(String charset) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setContentLength(int len) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setContentType(String type) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void setLocale(Locale loc) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
