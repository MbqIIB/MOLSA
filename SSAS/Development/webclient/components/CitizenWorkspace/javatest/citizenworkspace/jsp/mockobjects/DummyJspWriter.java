package citizenworkspace.jsp.mockobjects;

import javax.servlet.jsp.JspWriter;

/**
 * Contains dummy implementations of all JspWriter methods. This class does nothing.
 * It has a subclass {@link FakeJspWriter} that implements some of the methods for test purposes.
 */
public class DummyJspWriter extends JspWriter {

  public DummyJspWriter() {
    super(1024, true);
  }

  public void clear() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void clearBuffer() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void close() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void flush() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public int getRemaining() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void newLine() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(boolean b) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(char c) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(char[] s) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(double d) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(float f) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(int i) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(long l) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(Object obj) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void print(String s) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println() { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(boolean x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(char x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(char[] x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(double x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(float x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(int x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(long x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(Object x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void println(String x) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
  public void write(char[] cbuf, int off, int len) { throw new UnsupportedOperationException("Method not implemented in " + getClass().getName()); }
}
