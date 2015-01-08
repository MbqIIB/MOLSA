package curam.molsa.util.impl;

import java.rmi.RemoteException;

import org.apache.axis2.AxisFault;
import org.apache.axis2.client.Options;
import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.ErrorCode;
import org.tempuri.ArabdoxRemoteServiceStub.LoginRequest;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginToArabdox;
import org.tempuri.ArabdoxRemoteServiceStub.LoginToArabdoxResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutFromArabdox;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutFromArabdoxResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutRequest;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutResponse;

import curam.core.impl.EnvVars;
import curam.molsa.message.MOLSABPOARABDOX;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;

/**
 * 
 * The helper class for Arabdox integration.
 * 
 */
public class MOLSAArabdoxSessionHelper {
  private String userName = Configuration.getProperty(EnvVars.ARABDOX_LOGIN_USERNAME);
  private String password = Configuration.getProperty(EnvVars.ARABDOX_LOGIN_PASSWORD);
  private String targetEndpoint = Configuration.getProperty(EnvVars.ARABDOX_TARGET_ENDPOINT);

  private static MOLSAArabdoxSessionHelper instance = null;

  /**
   * Private Constructor
   */
  private MOLSAArabdoxSessionHelper() {

  }

  /**
   * This method will return the new instance
   * 
   * @return this
   */
  public static MOLSAArabdoxSessionHelper newInstance() {
    if (instance == null) {
      instance = new MOLSAArabdoxSessionHelper();
    }
    return instance;
  }

  /**
   * Return the instance of Stub.
   * @return ArabdoxRemoteServiceStub
   * @throws InformationalException
   *           General Exception
   * @throws AppException
   *           General Exception
   */
  public ArabdoxRemoteServiceStub getRemoteServiceStub() throws AppException, InformationalException {
    try {
      ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = new ArabdoxRemoteServiceStub(targetEndpoint);
      Options options = arabdoxRemoteServiceStub._getServiceClient().getOptions();
      options.setSoapVersionURI(org.apache.axiom.soap.SOAP11Constants.SOAP_ENVELOPE_NAMESPACE_URI);
      return arabdoxRemoteServiceStub;
    } catch (AxisFault e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_INITIALIZING_STUB);
      appException.arg(e.getMessage());
      throw appException;
    }

  }

  /**
   * Return the Login Response.
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @return LoginResponse
   * @throws InformationalException
   *           General Exception
   * @throws AppException
   *           General Exception
   */
  public LoginResponse loginToArabdox(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub) throws AppException, InformationalException {

    LoginToArabdox loginToArabdox = new LoginToArabdox();
    LoginRequest loginRequest = new LoginRequest();
    loginRequest.setLoginName(userName);
    loginRequest.setPassword(password);
    loginToArabdox.setLoginRequest(loginRequest);
    LoginToArabdoxResponse loginToArabdoxResponse = null;
    LoginResponse loginResponse = null;
    try {
      loginToArabdoxResponse = arabdoxRemoteServiceStub.loginToArabdox(loginToArabdox);

    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("loginToArabdox");
      appException.arg(e.getMessage());
      throw appException;
    }
    loginResponse = loginToArabdoxResponse.getLoginToArabdoxResult();
    ErrorCode errorCode = loginResponse.getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_WHILE_LOGIN);
      appException.arg(errorCode.getValue());
      throw appException;
    }

    if (loginResponse == null || loginToArabdoxResponse == null) {
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_NO_RESPONSE);
      throw appException;
    }
    return loginResponse;

  }
  
  /**
   * Return the Logout Response.
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @return LogoutResponse
   * @throws InformationalException
   *           General Exception
   * @throws AppException
   *           General Exception
   */
  public LogoutResponse logoutFromArabdox(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, LoginResponse loginResponse) 
  throws AppException, InformationalException {

    LogoutFromArabdox logoutFromArabdox = new LogoutFromArabdox();
    LogoutRequest logoutRequest = new LogoutRequest();
    logoutRequest.setSessionKey(loginResponse.getSessionKey());
    logoutFromArabdox.setLogoutRequest(logoutRequest);
    LogoutFromArabdoxResponse logoutFromArabdoxResponse = null;
    try {
      logoutFromArabdoxResponse = arabdoxRemoteServiceStub.logoutFromArabdox(logoutFromArabdox);

    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("logoutFromArabdox");
      appException.arg(e.getMessage());
      throw appException;
    }
    LogoutResponse logoutResponse = logoutFromArabdoxResponse.getLogoutFromArabdoxResult();
    ErrorCode errorCode = logoutResponse.getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_WHILE_LOGOUT);
      appException.arg(errorCode.getValue());
      throw appException;
    }

    if (logoutResponse == null || logoutFromArabdoxResponse == null) {
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_NO_RESPONSE);
      throw appException;
    }
    return logoutResponse;

  }

}
