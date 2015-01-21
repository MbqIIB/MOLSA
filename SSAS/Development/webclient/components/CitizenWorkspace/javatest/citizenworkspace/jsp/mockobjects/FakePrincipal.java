package citizenworkspace.jsp.mockobjects;

import java.security.Principal;

/**
 * Contains simple implementations of a few {@link Principal} methods for test purposes.
 */
public class FakePrincipal implements Principal {
  
  private String username;
  
  public FakePrincipal(String username) {
    this.username = username;  
  }
  
  public boolean equals(Object other) { return other.toString().equals(this.toString()); }
  public String getName() { return username; }
  public int hashCode() { return -1; }
  public String toString() { return username; }
}
