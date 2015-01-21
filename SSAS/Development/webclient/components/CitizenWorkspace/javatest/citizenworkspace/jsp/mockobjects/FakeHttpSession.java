package citizenworkspace.jsp.mockobjects;

import citizenworkspace.jsp.mockobjects.DummyHttpSession;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.collections.IteratorUtils;

/**
 * Contains simple implementations of a few {@link javax.servlet.http.HttpSession HttpSession} methods for test purposes.
 */
public class FakeHttpSession extends DummyHttpSession {

  private final Map<String, Object> attributes;

  public FakeHttpSession() {
    super();
    attributes = new HashMap<String, Object>();
  }

  @Override
  public Object getAttribute(final String name) {
    return attributes.get(name);
  }

  @Override
  public void setAttribute(final String name, final Object value) {
    attributes.put(name, value);
  }

  @Override
  public Enumeration<String> getAttributeNames() {
    return IteratorUtils.asEnumeration(attributes.keySet().iterator());
  }

  @Override
  public void invalidate() {
    // Do nothing
  }
}
