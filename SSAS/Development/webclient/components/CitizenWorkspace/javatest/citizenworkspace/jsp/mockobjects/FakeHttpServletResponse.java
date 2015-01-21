package citizenworkspace.jsp.mockobjects;

import citizenworkspace.jsp.mockobjects.DummyHttpServletResponse;

/**
 * Contains simple implementations of a few {@link javax.servlet.http.HttpServletResponse HttpServletResponse} methods for test purposes.
 */
public class FakeHttpServletResponse extends DummyHttpServletResponse {

  private String redirect;
  private String url;

  public FakeHttpServletResponse() {
  }

  @Override
  public void sendRedirect(final String location) {
    this.redirect = location;
  }

  public String getRedirect() {
    return this.redirect;
  }

  @Override
  public String encodeRedirectURL(final String url) {
    return url;
  }
}
