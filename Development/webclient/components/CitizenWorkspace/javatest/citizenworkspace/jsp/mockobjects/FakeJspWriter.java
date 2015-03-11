package citizenworkspace.jsp.mockobjects;

import citizenworkspace.jsp.mockobjects.DummyJspWriter;

/**
 * Contains simple implementations of a few {@link javax.servlet.jsp.JspWriter JspWriter} methods for test purposes.
 */
public class FakeJspWriter extends DummyJspWriter {

  private StringBuffer dataWritten;

  public FakeJspWriter() {
    super();
    dataWritten = new StringBuffer(1024);
  }

  @Override
  public void print(final String s) {
    dataWritten.append(s);
  }

  public String getOutput() {
    return dataWritten.toString();
  }

}
