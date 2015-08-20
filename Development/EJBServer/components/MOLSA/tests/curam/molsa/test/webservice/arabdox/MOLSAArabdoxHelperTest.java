package curam.molsa.test.webservice.arabdox;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

import javax.activation.DataHandler;

import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxConatinerGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ContainerType;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentExResponse;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentResponse;
import org.tempuri.ArabdoxRemoteServiceStub.CreateFolderResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadResponse;
import org.tempuri.ArabdoxRemoteServiceStub.FileType;
import org.tempuri.ArabdoxRemoteServiceStub.FolderCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinets;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinetsResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFilesResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetFoldersResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutResponse;
import org.tempuri.ArabdoxRemoteServiceStub.StreamBody;

import curam.core.impl.EnvVars;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.util.impl.MOLSAArabdoxHelper;
import curam.molsa.util.impl.MOLSAArabdoxSessionHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.type.Blob;


public class MOLSAArabdoxHelperTest  extends CuramServerTest{

	private int baseFolderID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_BASE_FOLDERID));
	private String baseFolderName = Configuration.getProperty(EnvVars.ARABDOX_BASE_FOLDERNAME);
	

  public MOLSAArabdoxHelperTest(String arg0) {
    super(arg0);
  }
  
  /*  JUNIT cannot be written for ArabDox. But the helps the developer to fix the issues.
   * 
  public void testGetCabinets() throws AppException, InformationalException {
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    GetCabinetsResponse getCabinetsResponse = arabdoxHelper.getCabinets(arabdoxRemoteServiceStub, loginResponse);
    ArabdoxConatinerGetResponse arabdoxConatinerGetResponse = getCabinetsResponse.getGetCabinetsResult();
    ArrayOfArabdoxContainer arrayOfArabdoxContainer = arabdoxConatinerGetResponse.getArabdoxContainers();
    for(ArabdoxContainer arabdoxContainer : arrayOfArabdoxContainer.getArabdoxContainer()) {
      System.out.println(arabdoxContainer.getContainerId()+" " +arabdoxContainer.getName() + " " + arabdoxContainer.getContainerType());
    }
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testGetFolders() throws AppException, InformationalException {
	    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
	    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
	    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
	    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
	    GetFoldersResponse getFoldersResponse = arabdoxHelper.getFolders(arabdoxRemoteServiceStub, loginResponse, baseFolderID, ContainerType.Folder);
	    ArabdoxConatinerGetResponse arabdoxConatinerGetResponse = getFoldersResponse.getGetFoldersResult();
	    ArrayOfArabdoxContainer arrayOfArabdoxContainer = arabdoxConatinerGetResponse.getArabdoxContainers();
	    if( arrayOfArabdoxContainer.getArabdoxContainer() !=null) {
  	    for(ArabdoxContainer arabdoxContainer : arrayOfArabdoxContainer.getArabdoxContainer()) {
  	      System.out.println(arabdoxContainer.getContainerId()+" " +arabdoxContainer.getName() + " " + arabdoxContainer.getContainerType());
  	    }
	    }
	    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
	  }
  
 
  public void testCreateFolderForCabinet() throws AppException, InformationalException {
	    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
	    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
	    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
	    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
	    CreateFolderResponse createFolderResponse = arabdoxHelper.createFolder(arabdoxRemoteServiceStub, loginResponse, "CURAM", baseFolderID, ContainerType.Cabinet,"Test");
	    FolderCreateResponse folderCreateResponse = createFolderResponse.getCreateFolderResult();
	    ArabdoxContainer arabdoxContainer =folderCreateResponse.getCreatedFolder();
	    System.out.println(arabdoxContainer.getContainerId()+" " +arabdoxContainer.getName() + " " + arabdoxContainer.getContainerType());
	    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
	  }
	
  public void testCreateFolder() throws AppException, InformationalException {
	    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
	    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
	    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
	    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
	    CreateFolderResponse createFolderResponse = arabdoxHelper.createFolder(arabdoxRemoteServiceStub, loginResponse, "Case_254", baseFolderID, ContainerType.Folder,baseFolderName);
	    FolderCreateResponse folderCreateResponse = createFolderResponse.getCreateFolderResult();
	    ArabdoxContainer arabdoxContainer =folderCreateResponse.getCreatedFolder();
	    System.out.println(arabdoxContainer.getContainerId()+" " +arabdoxContainer.getName() + " " + arabdoxContainer.getContainerType());
	    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
	  }
  
  public void testCreateDocument() throws AppException, InformationalException {
    long caseID=-5577145188544937984L;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    CreateDocumentExResponse createDocumentResponse = arabdoxHelper.createDocumentEx(arabdoxRemoteServiceStub, loginResponse,"Process1", 505, caseID);
    DocumentCreateResponse documentCreateResponse = createDocumentResponse.getCreateDocumentExResult();
    System.out.println(documentCreateResponse.getCreatedDocumentId());
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testAddDocumentFilesEx() throws AppException, InformationalException, IOException {
    int docID=-2147050473;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    FileInputStream fileInputStream = null;
    byte fileContent[];
    try {        
	    File file = new File("D:/Qatar/Sample.txt");
	    fileInputStream = new FileInputStream (file);
	    fileContent = new byte[(int)file.length()];
	    fileInputStream.read(fileContent);
    } finally {
    	fileInputStream.close();
    }
    DocumentFileAddResponse documentFileAddResponse = 
      arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse,docID, new Blob(fileContent) ,"D:/Qatar/Sample.txt", true);
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testGetDocumentFiles() throws AppException, InformationalException {
    int docID=-2147050467;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    GetDocumentFilesResponse getDocumentFilesResponse = 
      arabdoxHelper.getDocumentFiles(arabdoxRemoteServiceStub, loginResponse,docID, FileType.Attachment);
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
  
  public void testLoadDocumentFile() throws AppException, InformationalException, IOException {
    int docID=-2147050467;
    int fileID = 1;
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    DocumentFileLoadResponse documentFileLoadResponse = 
      arabdoxHelper.loadDocumentFile(arabdoxRemoteServiceStub, loginResponse,docID, fileID, FileType.Attachment);
    StreamBody streamBody = documentFileLoadResponse.getFileStream();
    DataHandler dataHandler = streamBody.getStreamBody();
    
  
    File file = new File("C:\\Sample1.txt");
    FileOutputStream outputStream = new FileOutputStream(file);
    dataHandler.writeTo(outputStream);
    //Writer out = new OutputStreamWriter(outputStream, "UTF-8");
    //out.write();
    //out.close();
    
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
  }
*/
}
