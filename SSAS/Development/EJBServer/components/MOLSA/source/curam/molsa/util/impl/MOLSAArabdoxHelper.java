package curam.molsa.util.impl;

import java.rmi.RemoteException;

import javax.activation.DataHandler;
import javax.activation.MimetypesFileTypeMap;

import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.CabinetsGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.ContainerType;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentEx;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentExResponse;
import org.tempuri.ArabdoxRemoteServiceStub.CreateFolder;
import org.tempuri.ArabdoxRemoteServiceStub.CreateFolderResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DeleteDocumentFile;
import org.tempuri.ArabdoxRemoteServiceStub.DeleteDocumentFileResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateFullRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddRequestEx;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileDeleteRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFilesGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentInfo;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentInformation;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentLoadInformation;
import org.tempuri.ArabdoxRemoteServiceStub.ErrorCode;
import org.tempuri.ArabdoxRemoteServiceStub.FileType;
import org.tempuri.ArabdoxRemoteServiceStub.FolderCreateRequest;
import org.tempuri.ArabdoxRemoteServiceStub.FoldersGetRequest;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinets;
import org.tempuri.ArabdoxRemoteServiceStub.GetCabinetsResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocument;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFiles;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFilesResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetFolders;
import org.tempuri.ArabdoxRemoteServiceStub.GetFoldersResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.StreamBody;

import curam.core.impl.EnvVars;
import curam.molsa.message.MOLSABPOARABDOX;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.ByteArrayDataSource;
import curam.util.resources.Configuration;
import curam.util.type.Blob;

/**
 * 
 * The helper class for Arabdox integration.
 * 
 */
public class MOLSAArabdoxHelper {

  MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
  MOLSAArabdoxUtil arabdoxUtil = MOLSAArabdoxUtil.newInstance();
  private int documentClassID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_CLASSID));
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
    if (instance == null) {
      instance = new MOLSAArabdoxHelper();
    }
    return instance;
  }

  /**
   * Return the Cabinets from ArabDox.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @return GetCabinetsResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public GetCabinetsResponse getCabinets(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, LoginResponse loginResponse) 
  throws AppException, InformationalException {

    GetCabinets getCabinets = new GetCabinets();
    CabinetsGetRequest cabinetsGetRequest = new CabinetsGetRequest();
    cabinetsGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    getCabinets.setRequest(cabinetsGetRequest);
    GetCabinetsResponse getCabinetsResponse = null;
    try {
      getCabinetsResponse = arabdoxRemoteServiceStub.getCabinets(getCabinets);
    } catch (RemoteException remoteExcep) {      
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "getCabinets");
    }

    ErrorCode errorCode = getCabinetsResponse.getGetCabinetsResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "getCabinets");
    }

    return getCabinetsResponse;
  }

 /**
  * Creates Documents with Index fields.
  * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
  * @param loginResponse LoginResponse
  * @param docName String
  * @param folderID int
  * @param caseID long
  * @return CreateDocumentExResponse
  * @throws AppException  General Exception
  * @throws InformationalException  General ExceptionList
  */
  public CreateDocumentExResponse createDocumentEx(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, String docName, int folderID, long caseID)
      throws AppException, InformationalException {

    CreateDocumentExResponse createDocumentExResponse = null;

    CreateDocumentEx createDocumentEx = new CreateDocumentEx();
    DocumentCreateFullRequest documentCreateFullRequest = new DocumentCreateFullRequest();
    documentCreateFullRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentCreateFullRequest.setDocumentClassId(documentClassID);
    documentCreateFullRequest.setDocumentName(docName);
    documentCreateFullRequest.setDescription(docName);
    documentCreateFullRequest.setFolderId(folderID);

    documentCreateFullRequest.setIndexFields(arabdoxUtil.returnIndexFields(caseID));
    createDocumentEx.setRequest(documentCreateFullRequest);

    try {

      createDocumentExResponse = arabdoxRemoteServiceStub.createDocumentEx(createDocumentEx);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "createDocumentEx");
    }
   
    ErrorCode errorCode = createDocumentExResponse.getCreateDocumentExResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "createDocumentEx");
    }
    return createDocumentExResponse;

  }

  /**
   * Adds file to the Document.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param documentID long
   * @param fileContent Blob
   * @param fileName String
   * @param isAttachment boolean
   * @return DocumentFileAddResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public DocumentFileAddResponse addDocumentFilesEx(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, long documentID, Blob fileContent,
      String fileName, boolean isAttachment) throws AppException, InformationalException {

    DocumentFileAddResponse documentFileAddResponse = null;

    MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();
    // only by file name
    String mimeType = mimeTypesMap.getContentType(fileName);

    ByteArrayDataSource ds = new ByteArrayDataSource(fileContent.copyBytes(), mimeType);
    DataHandler dataHandler = new DataHandler(ds);

    DocumentFileAddRequestEx documentFileAddRequestEx = new DocumentFileAddRequestEx();
    StreamBody streamBody = new StreamBody();
    streamBody.setStreamBody(dataHandler);
    documentFileAddRequestEx.setInputFile(streamBody);

    DocumentInformation documentInformation = new DocumentInformation();
    DocumentInfo documentInfo = new DocumentInfo();
    documentInfo.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentInfo.setDocumentId((int) documentID);
    documentInfo.setFileName(fileName);
    //documentInfo.setStoreIntoAttachments(isAttachment);

    documentInformation.setDocumentInformation(documentInfo);

    try {
      documentFileAddResponse = arabdoxRemoteServiceStub.addDocumentFilesEx(documentFileAddRequestEx, documentInformation);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "addDocumentFilesEx");
    }
    ErrorCode errorCode = documentFileAddResponse.getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "addDocumentFilesEx");
    }

    return documentFileAddResponse;

  }

  /**
   * Return the files in a Document.
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param documentID int
   * @param fileType FileType
   * @return GetDocumentFilesResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public GetDocumentFilesResponse getDocumentFiles(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID, FileType fileType)
      throws AppException, InformationalException {
    GetDocumentFilesResponse getDocumentFilesResponse = null;
    GetDocumentFiles getDocumentFiles = new GetDocumentFiles();
    DocumentFilesGetRequest documentFilesGetRequest = new DocumentFilesGetRequest();
    documentFilesGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentFilesGetRequest.setDocumentId(documentID);
    documentFilesGetRequest.setFileType(fileType);
    getDocumentFiles.setRequest(documentFilesGetRequest);

    try {
      getDocumentFilesResponse = arabdoxRemoteServiceStub.getDocumentFiles(getDocumentFiles);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "getDocumentFiles");
    }
    
    ErrorCode errorCode = getDocumentFilesResponse.getGetDocumentFilesResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "getDocumentFiles");
    }

    return getDocumentFilesResponse;

  }

  /**
   * Download the Document from ArabDox.
   * @param arabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param documentID int
   * @param fileID int
   * @param fileType FileType
   * @return DocumentFileLoadResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public DocumentFileLoadResponse loadDocumentFile(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID, int fileID, FileType fileType)
      throws AppException, InformationalException {

    DocumentFileLoadResponse documentFileLoadResponse = null;

    DocumentFileLoadRequest documentFileLoadRequest = new DocumentFileLoadRequest();
    DocumentLoadInformation documentLoadInformation = new DocumentLoadInformation();
    documentFileLoadRequest.setDocumentLoadInformation(documentLoadInformation);

    documentLoadInformation.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentLoadInformation.setDocumentId(documentID);
    documentLoadInformation.setFileId(fileID);
    documentLoadInformation.setFileType(fileType);

    try {
      documentFileLoadResponse = arabdoxRemoteServiceStub.loadDocumentFile(documentFileLoadRequest);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "loadDocumentFile");
    }

    return documentFileLoadResponse;

  }

  /**
   * Deletes the file from a Document.
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param documentID int
   * @param fileID int
   * @param fileType FileType
   * @return DeleteDocumentFileResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public DeleteDocumentFileResponse deleteDocumentFile(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID, int fileID, FileType fileType)
      throws AppException, InformationalException {

    DeleteDocumentFileResponse deleteDocumentFileResponse = null;

    DeleteDocumentFile deleteDocumentFile = new DeleteDocumentFile();
    DocumentFileDeleteRequest documentFileDeleteRequest = new DocumentFileDeleteRequest();
    documentFileDeleteRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentFileDeleteRequest.setDocumentId(documentID);
    documentFileDeleteRequest.setFileId(fileID);
    documentFileDeleteRequest.setFileType(fileType);
    deleteDocumentFile.setRequest(documentFileDeleteRequest);

    try {
      deleteDocumentFileResponse = arabdoxRemoteServiceStub.deleteDocumentFile(deleteDocumentFile);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "deleteDocumentFile");
    }

    ErrorCode errorCode = deleteDocumentFileResponse.getDeleteDocumentFileResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "deleteDocumentFile");
    }
    return deleteDocumentFileResponse;

  }

  /**
   * Creates a folder in ArabDox.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param folderName  folderName
   * @param containerID int
   * @param parentContainerType ContainerType
   * @param parentContainerName String
   * @return CreateFolderResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public CreateFolderResponse createFolder(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, String folderName, int containerID,
      ContainerType parentContainerType, String parentContainerName) throws AppException, InformationalException {

    CreateFolderResponse createFolderResponse = null;
    CreateFolder createFolder = new CreateFolder();
    FolderCreateRequest folderCreateRequest = new FolderCreateRequest();

    ArabdoxContainer parentArabdoxContainer = new ArabdoxContainer();
    parentArabdoxContainer.setContainerId(containerID);
    parentArabdoxContainer.setContainerType(parentContainerType);
    parentArabdoxContainer.setName(parentContainerName);

    folderCreateRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    folderCreateRequest.setFolderName(folderName);
    folderCreateRequest.setParentContainer(parentArabdoxContainer);
    createFolder.setRequest(folderCreateRequest);

    try {
      createFolderResponse = arabdoxRemoteServiceStub.createFolder(createFolder);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "createFolder");
    }

    ErrorCode errorCode = createFolderResponse.getCreateFolderResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "createFolder");
    }

    return createFolderResponse;

  }

  /**
   * Lists the folders from ArabDox for a Container.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param ContainerID int
   * @param containerType ContainerType
   * @return GetFoldersResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public GetFoldersResponse getFolders(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int ContainerID, ContainerType containerType)
      throws AppException, InformationalException {

    GetFoldersResponse getFoldersResponse = null;
    GetFolders getFolders = new GetFolders();
    FoldersGetRequest foldersGetRequest = new FoldersGetRequest();
    foldersGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    foldersGetRequest.setParentContainerId(ContainerID);
    foldersGetRequest.setParentContainerType(containerType);
    getFolders.setRequest(foldersGetRequest);

    try {
      getFoldersResponse = arabdoxRemoteServiceStub.getFolders(getFolders);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "getFolders");      
    }

    ErrorCode errorCode = getFoldersResponse.getGetFoldersResult().getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "getFolders");
    }
    return getFoldersResponse;
  }

  /**
   * Returns the Document details from ArabDox.
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param loginResponse LoginResponse
   * @param documentID int
   * @return GetDocumentResponse
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public GetDocumentResponse getDocument(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      LoginResponse loginResponse, int documentID) throws AppException,
      InformationalException {
    GetDocumentResponse getDocumentResponse = null;
    GetDocument getDocument = new GetDocument();
    DocumentGetRequest documentGetRequest = new DocumentGetRequest();
    documentGetRequest.setArabdoxSessionKey(loginResponse.getSessionKey());
    documentGetRequest.setDocumentId(documentID);
    getDocument.setRequest(documentGetRequest);

    try {
      getDocumentResponse = arabdoxRemoteServiceStub.getDocument(getDocument);
    } catch (RemoteException remoteExcep) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwRemoteException(remoteExcep, "getDocument");
    }

    DocumentGetResponse documentGetResponse = getDocumentResponse.getGetDocumentResult();
    ErrorCode errorCode = documentGetResponse.getErrorCode();
    if (!errorCode.getValue().isEmpty() && !errorCode.getValue().equals(ErrorCode._None)) {
      arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      throwErrorCode(errorCode, "getDocumentFiles");
    }

    return getDocumentResponse;

  }

  /**
   * Throws the AppException.
   * @param errorCode ErrorCode
   * @param methodName String
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  private void throwErrorCode(ErrorCode errorCode, String methodName) 
  throws AppException, InformationalException {
    AppException appException = new AppException(MOLSABPOARABDOX.ERR_WHILE_EXECUTING_METHOD);
    appException.arg(methodName);
    appException.arg(errorCode.getValue());
    throw appException;
  }
  
  /**
   * Throws the AppException.
   * @param errorCode ErrorCode
   * @param methodName String
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  private void throwRemoteException(RemoteException remoteExcep, String methodName) 
  throws AppException, InformationalException {
    AppException appException = new AppException(MOLSABPOARABDOX.ERR_REMOTE_EXCEPTION);
    appException.arg(methodName);
    appException.arg(remoteExcep.getMessage());
    throw appException;
  }

}
