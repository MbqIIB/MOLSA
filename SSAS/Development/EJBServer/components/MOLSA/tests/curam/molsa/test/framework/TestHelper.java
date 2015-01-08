/*
 * Licensed Materials - Property of IBM
 * 
 * PID 5725-H26
 * 
 * Copyright IBM Corporation 2014. All rights reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package curam.molsa.test.framework;

import java.rmi.RemoteException;

import com.google.inject.Inject;

import curam.util.internal.BizTransaction;
import curam.util.security.CuramPrincipal;
import curam.util.security.RMIAuthentication;
import curam.util.transaction.TransactionInfo;

public class TestHelper {


  @Inject
  private TestRMIAuthentication auth;

  private TransactionInfo localTransaction;

  /**
   * Invoked to simulate user login for tests. This method starts a new
   * transaction. To rollback this transaction the user of this method should
   * call {@link #rollbackTransaction()} at the end of the tests
   * 
   * @param username
   * The username to set as logged in user.
   */
  public void simulateLogin(final String username) {

    auth.setUserName(username);

    TransactionInfo.backUpTransactionInfo();
    localTransaction =
      TransactionInfo.setTransactionInfo(
        TransactionInfo.TransactionType.kOnline, new TestBizTransaction(),
        null, "en");

    localTransaction.begin();
  }

  /**
   * Extended implementation of RMIAuthentication for testing purposes.
   */
  private static class TestRMIAuthentication extends RMIAuthentication {

    /**
     * Default constructor.
     * 
     * @throws RemoteException
     */
    @SuppressWarnings("unused")
    public TestRMIAuthentication() throws RemoteException {

      super();
    }

    /**
     * Sets the username for RMIAuthentication.
     * 
     * @param userName name of the user
     */
    public void setUserName(final String userName) {

      super.setPrincipal(new CuramPrincipal(userName));
    }
  }

  /**
   * Internal BizTranaction class.
   */
  static class TestBizTransaction implements BizTransaction {

    /**
     * Get name.
     * 
     * @return The name of the transaction.
     */
    @Override
    public String getName() {

      return "dummy";
    }

    /**
     * Return if transactional.
     * 
     * @return if transactional.
     */
    @Override
    public boolean transactional() {

      return true;
    }
  }

  /**
   * Invoked to rollback the transaction started by
   * {@link #simulateLogin(String)}. This method should be called in
   * tearDownCuramServerTest() method in the test class.
   * 
   * @throws RemoteException
   */
  public void rollbackTransaction() {

    if (localTransaction != null) {
      localTransaction.rollback();
      localTransaction.closeConnection();
      TransactionInfo.restoreTransactionInfo();
      auth.logout();
    }
  }

}
