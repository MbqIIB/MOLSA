package curam.molsa.util.impl;

import java.rmi.RemoteException;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;

import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxConatinerGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfDocumentFile;
import org.tempuri.ArabdoxRemoteServiceStub.CabinetsGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocument;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFile;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddRequestEx;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFilesGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFilesGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentInfo;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentInformation;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentLoadInformation;
import org.tempuri.ArabdoxRemoteServiceStub.ErrorCode;
import org.tempuri.ArabdoxRemoteServiceStub.FileType;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinets;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinetsResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFiles;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFilesResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.StreamBody;

import curam.molsa.message.MOLSABPOARABDOX;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * The helper class for Arabdox integration.
 * 
 */
public class MOLSAArabdoxHelper {

  private static MOLSAArabdoxHelper instance = null;
  /**
   * Private Constructor
   */
  private MOLSAArabdoxHelper() {

  }

  /**
   * Returns the new instance
   * 
   * @return this
   */
  public static MOLSAArabdoxHelper newInstance() {
    if(instance == null) {
      instance = new MOLSAArabdoxHelper();
   }
   return instance;
  }

 
  public void getCabinets(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, LoginResponse loginResponse) 
  throws AppException, InformationalException {

    GetCabinets getCabinets = new GetCabinets();
    CabinetsGetRequest cabinetsGetRequest = new CabinetsGetRequest();
    cabinetsGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    getCabinets.setRequest(cabinetsGetRequest);
    GetCabinetsResponse getCabinetsResponse = null;
    try {
      getCabinetsResponse = arabdoxRemoteServiceStub.getCabinets(getCabinets);
    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("getCabinets");
      appException.arg(e.getMessage());
      throw appException;
    }  
    ArabdoxConatinerGetResponse arabdoxConatinerGetResponse = getCabinetsResponse.getGetCabinetsResult();
    ArrayOfArabdoxContainer arrayOfArabdoxContainer = arabdoxConatinerGetResponse.getArabdoxContainers();
    for(ArabdoxContainer arabdoxContainer : arrayOfArabdoxContainer.getArabdoxContainer()) {
      System.out.println(arabdoxContainer.getContainerId()+arabdoxContainer.getName());
    }
  

  }
  
  public CreateDocumentResponse createDocument(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, String docName, int folderID) throws AppException, InformationalException {

    CreateDocumentResponse createDocumentResponse = null;
    CreateDocument createDocument = new CreateDocument();
    DocumentCreateRequest documentCreateRequest = new DocumentCreateRequest();
    documentCreateRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentCreateRequest.setDocumentClassId(2);
    documentCreateRequest.setDocumentName(docName);
    documentCreateRequest.setFolderId(folderID);
    createDocument.setRequest(documentCreateRequest);
    try {
      createDocumentResponse = arabdoxRemoteServiceStub.createDocument(createDocument);
    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("createDocument");
      appException.arg(e.getMessage());
      throw appException;
    }  
    DocumentCreateResponse documentCreateResponse = createDocumentResponse.getCreateDocumentResult();
    System.out.println("Document ID "+ documentCreateResponse.getCreatedDocumentId());
   return createDocumentResponse;
  

  }
  
  public DocumentFileAddResponse addDocumentFilesEx(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID , String filePath) throws AppException, InformationalException {

    DocumentFileAddResponse documentFileAddResponse = null;
    
    //File file = new File (filePath);
    FileDataSource fileDataSource = new FileDataSource(filePath);
    DataHandler dataHandler = new DataHandler(fileDataSource);
   
    DocumentFileAddRequestEx documentFileAddRequestEx = new DocumentFileAddRequestEx();
    StreamBody streamBody = new StreamBody();  
    streamBody.setStreamBody(dataHandler);
    documentFileAddRequestEx.setInputFile(streamBody);
        
    
    DocumentInformation documentInformation = new DocumentInformation();
    DocumentInfo documentInfo = new DocumentInfo();
    documentInfo.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentInfo.setDocumentId(documentID);
    documentInfo.setFileName("Sample.txt");
    documentInformation.setDocumentInformation(documentInfo);
    try {
      documentFileAddResponse = arabdoxRemoteServiceStub.addDocumentFilesEx(documentFileAddRequestEx, documentInformation);
    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("addDocumentFilesEx");
      appException.arg(e.getMessage());
      throw appException;
    }  
    ErrorCode errorCode = documentFileAddResponse.getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_WHILE_LOGIN);
      appException.arg(errorCode.getValue());
      throw appException;
    }
    
   return documentFileAddResponse;

  }
  
  public GetDocumentFilesResponse getDocumentFiles(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID) throws AppException, InformationalException {    
    GetDocumentFilesResponse getDocumentFilesResponse = null;
    GetDocumentFiles getDocumentFiles = new GetDocumentFiles();
    DocumentFilesGetRequest documentFilesGetRequest = new DocumentFilesGetRequest();
    documentFilesGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentFilesGetRequest.setDocumentId(documentID);
    getDocumentFiles.setRequest(documentFilesGetRequest);
    try {
      getDocumentFilesResponse = arabdoxRemoteServiceStub.getDocumentFiles(getDocumentFiles);
    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("getDocumentFiles");
      appException.arg(e.getMessage());
      throw appException;
    }  
    
   DocumentFilesGetResponse documentFilesGetResponse = getDocumentFilesResponse.getGetDocumentFilesResult();
   ArrayOfDocumentFile arrayOfDocumentFile = documentFilesGetResponse.getFiles();
   DocumentFile[] documentFiles = arrayOfDocumentFile.getDocumentFile();
   if(documentFiles != null ) {
     for(DocumentFile documentFile : documentFiles) {
       System.out.println("File Details "+ documentFile.getFileName() + " " +documentFile.getFileType());
     }
   }
   return getDocumentFilesResponse;

  }
  
  public DocumentFileLoadResponse loadDocumentFile(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID , String filePath) throws AppException, InformationalException {

    DocumentFileLoadResponse documentFileLoadResponse = null;
    
    //File file = new File (filePath);
    FileDataSource fileDataSource = new FileDataSource(filePath);
    DataHandler dataHandler = new DataHandler(fileDataSource);
   
    DocumentFileLoadRequest documentFileLoadRequest = new DocumentFileLoadRequest();
    DocumentLoadInformation documentLoadInformation = new DocumentLoadInformation();
    documentFileLoadRequest.setDocumentLoadInformation(documentLoadInformation);
    
    documentLoadInformation.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentLoadInformation.setDocumentId(documentID);
    documentLoadInformation.setFileId(123);
    
    FileType fileType = new FileType.Factory().fromValue(filePath);
    documentLoadInformation.setFileType(fileType);
    
  
    try {
      documentFileLoadResponse = arabdoxRemoteServiceStub.loadDocumentFile(documentFileLoadRequest);
    } catch (RemoteException e) {
      e.printStackTrace();
      AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
      appException.arg("loadDocumentFile");
      appException.arg(e.getMessage());
      throw appException;
    }  
   
    
   return documentFileLoadResponse;

  }



}
