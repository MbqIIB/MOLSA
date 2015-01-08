package curam.molsa.test.webservice.arabdox;

import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFilesResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutResponse;

import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.util.impl.MOLSAArabdoxHelper;
import curam.molsa.util.impl.MOLSAArabdoxSessionHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;


public class MOLSAArabdoxHelperTest  extends CuramServerTest{

  public MOLSAArabdoxHelperTest(String arg0) {
    super(arg0);
  }
  
  
  public void testGetCabinets() throws AppException, InformationalException {
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    arabdoxHelper.getCabinets(arabdoxRemoteServiceStub, loginResponse);
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testCreateDocument() throws AppException, InformationalException {
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    CreateDocumentResponse createDocumentResponse = arabdoxHelper.createDocument(arabdoxRemoteServiceStub, loginResponse,"Sample Doc Test ", 467);
    DocumentCreateResponse documentCreateResponse = createDocumentResponse.getCreateDocumentResult();
    System.out.println(documentCreateResponse.getCreatedDocumentId());
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  public void testAddDocumentFilesEx() throws AppException, InformationalException {
    int docID=-2147050473;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    DocumentFileAddResponse documentFileAddResponse = 
      arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse,docID, "D:/Qatar/Sample.txt");
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testGetDocumentFiles() throws AppException, InformationalException {
    int docID=-2147050473;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    GetDocumentFilesResponse getDocumentFilesResponse = 
      arabdoxHelper.getDocumentFiles(arabdoxRemoteServiceStub, loginResponse,docID);
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }

}
