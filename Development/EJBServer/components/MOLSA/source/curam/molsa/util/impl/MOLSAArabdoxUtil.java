package curam.molsa.util.impl;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;

import javax.activation.DataHandler;

import org.apache.commons.io.IOUtils;
import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxConatinerGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.ArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfArabdoxContainer;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfDocumentFile;
import org.tempuri.ArabdoxRemoteServiceStub.ArrayOfIndexField;
import org.tempuri.ArabdoxRemoteServiceStub.ContainerType;
import org.tempuri.ArabdoxRemoteServiceStub.CreateDocumentExResponse;
import org.tempuri.ArabdoxRemoteServiceStub.CreateFolderResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DateFormat;
import org.tempuri.ArabdoxRemoteServiceStub.DeleteDocumentFileResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFile;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileLoadResponse;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFilesGetResponse;
import org.tempuri.ArabdoxRemoteServiceStub.FileType;
import org.tempuri.ArabdoxRemoteServiceStub.FolderCreateResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetDocumentFilesResponse;
import org.tempuri.ArabdoxRemoteServiceStub.GetFoldersResponse;
import org.tempuri.ArabdoxRemoteServiceStub.IndexField;
import org.tempuri.ArabdoxRemoteServiceStub.IndexFieldType;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutResponse;
import org.tempuri.ArabdoxRemoteServiceStub.StreamBody;

import curam.codetable.GENDER;
import curam.core.fact.AttachmentFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.PersonFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.Attachment;
import curam.core.intf.CaseHeader;
import curam.core.intf.ConcernRole;
import curam.core.intf.Person;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseReference;
import curam.core.struct.CaseSearchKey;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.PersonDtls;
import curam.core.struct.PersonKey;
import curam.molsa.arabdox.entity.fact.MOLSAArabDoxAttachFactory;
import curam.molsa.arabdox.entity.fact.MOLSAArabDoxCaseLinkFactory;
import curam.molsa.arabdox.entity.intf.MOLSAArabDoxAttach;
import curam.molsa.arabdox.entity.intf.MOLSAArabDoxCaseLink;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxAttachDtls;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxAttachKey;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxCaseLinkDtls;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxCaseLinkKey;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxContainerExists;
import curam.molsa.message.MOLSABPOARABDOX;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Blob;
import curam.util.type.CodeTable;
import curam.util.type.DateTime;
import curam.util.type.NotFoundIndicator;

/**
 * 
 * The helper class for Arabdox integration.
 * 
 */
public class MOLSAArabdoxUtil {

  private int baseFolderID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_BASE_FOLDERID));
  private String baseFolderName = Configuration.getProperty(EnvVars.ARABDOX_BASE_FOLDERNAME);
  private String processFolderName = Configuration.getProperty(EnvVars.ARABDOX_PROCESS_FOLDERNAME);
  private String verificatonFolderName = Configuration.getProperty(EnvVars.ARABDOX_VERIFICATION_FOLDERNAME);

  private int fileNoIndexID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_FOR_FILENO));
  private int genderIndexID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_FOR_GENDER));
  private int nameIndexID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_FOR_NAME));
  private int qidIndexID = Integer.parseInt(Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_FOR_QID));

 
  private String documentIndexNotUsedTextIDs = Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_DEFAULTED_TEXT_IDS);
  private String documentIndexNotUsedDateIDs = Configuration.getProperty(EnvVars.ARABDOX_DOCUMENT_INDEX_DEFAULTED_DATE_IDS);

  private static MOLSAArabdoxUtil instance = null;

  /**
   * Private Constructor
   */
  private MOLSAArabdoxUtil() {

  }

  /**
   * Returns the new instance
   * 
   * @return this
   */
  public static MOLSAArabdoxUtil newInstance() {
    if (instance == null) {
      instance = new MOLSAArabdoxUtil();
    }
    return instance;
  }

  /**
   * Method will verify whether a folder exists in the container and if
   * exists will return the container ID.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param arabdoxHelper MOLSAArabdoxHelper
   * @param loginResponse LoginResponse
   * @param parentContainerID int
   * @param containerType ContainerType
   * @param folderName String
   * @return MOLSAArabDoxContainerExists
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */ 
  public MOLSAArabDoxContainerExists isFolderExists(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      MOLSAArabdoxHelper arabdoxHelper, LoginResponse loginResponse,
      int parentContainerID, ContainerType containerType, String folderName) throws AppException, InformationalException {
    MOLSAArabDoxContainerExists arabDoxContainerExists = new MOLSAArabDoxContainerExists();
    GetFoldersResponse getFoldersResponse = arabdoxHelper.getFolders(arabdoxRemoteServiceStub, loginResponse, parentContainerID, containerType);
    ArabdoxConatinerGetResponse arabdoxConatinerGetResponse = getFoldersResponse.getGetFoldersResult();
    ArrayOfArabdoxContainer arrayOfArabdoxContainer = arabdoxConatinerGetResponse.getArabdoxContainers();

    if (arrayOfArabdoxContainer.getArabdoxContainer() != null) {
      for (ArabdoxContainer arabdoxContainer : arrayOfArabdoxContainer.getArabdoxContainer()) {
        if (arabdoxContainer.getName().equals(folderName)) {
          arabDoxContainerExists.isExists = true;
          arabDoxContainerExists.containerID = arabdoxContainer.getContainerId();
          break;
        }
      }
    }
    return arabDoxContainerExists;
  }

  /**
   * Return the Document File from the list of Document Files filtered by name.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param arabdoxHelper MOLSAArabdoxHelper
   * @param loginResponse LoginResponse
   * @param documentID int
   * @param fileType FileType
   * @param fileName String
   * @return DocumentFile
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public DocumentFile getDocumentFile(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      MOLSAArabdoxHelper arabdoxHelper, LoginResponse loginResponse, int documentID,
      FileType fileType, String fileName) throws AppException, InformationalException {
    DocumentFile documentFile = null;
    GetDocumentFilesResponse getDocumentFilesResponse = arabdoxHelper.getDocumentFiles(arabdoxRemoteServiceStub, loginResponse, documentID, fileType);

    DocumentFilesGetResponse documentFilesGetResponse = getDocumentFilesResponse.getGetDocumentFilesResult();
    ArrayOfDocumentFile arrayOfDocumentFile = documentFilesGetResponse.getFiles();

    if (arrayOfDocumentFile.getDocumentFile() != null) {
      for (DocumentFile eachDocumentFile : arrayOfDocumentFile.getDocumentFile()) {
        if (eachDocumentFile.getFileName().equals(fileName)) {
          documentFile = eachDocumentFile;
          break;
        }
      }
    }
    return documentFile;
  }

  /**
   * Returns the Array of Index Fields.
   * 
   * @param caseID long
   * @return ArrayOfIndexField
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public ArrayOfIndexField returnIndexFields(long caseID) throws AppException, InformationalException {
    ArrayOfIndexField arrayOfIndexField = new ArrayOfIndexField();
    CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
    CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
    caseHeaderKey.caseID = caseID;
    CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

    ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
    ConcernRoleKey concernRoleKey = new ConcernRoleKey();
    concernRoleKey.concernRoleID = caseHeaderDtls.concernRoleID;
    ConcernRoleDtls concernRoleDtls = concernRoleObj.read(concernRoleKey);

    Person personObj = PersonFactory.newInstance();
    PersonKey personKey = new PersonKey();
    personKey.concernRoleID = caseHeaderDtls.concernRoleID;
    PersonDtls personDtls = personObj.read(personKey);

    String locale = TransactionInfo.getProgramLocale();

    // Adding the Case Reference Number as File Number

    IndexField indexField = new IndexField();

    indexField.setId(fileNoIndexID);
    indexField.setFieldValue(caseHeaderDtls.caseReference);
    indexField.setFieldType(IndexFieldType.Text);
    indexField.setName(MOLSABPOARABDOX.LABEL_CASE_REFERENCE_NUMBER.getMessageText(locale));
    indexField.setWidth(255);
    indexField.setDateFormat(DateFormat.NONE);
    arrayOfIndexField.addIndexField(indexField);

    // Adding the QID as Id
    AlternateIDRMDtls alternateIDRMDtls = MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(caseHeaderDtls.concernRoleID);

    indexField = new IndexField();
    indexField.setFieldValue(alternateIDRMDtls.alternateID);
    indexField.setId(qidIndexID);
    indexField.setFieldType(IndexFieldType.Text);
    indexField.setName(MOLSABPOARABDOX.LABEL_QID.getMessageText(locale));
    indexField.setDateFormat(DateFormat.NONE);
    indexField.setWidth(255);

    arrayOfIndexField.addIndexField(indexField);

    // Adding the Name as Id
    indexField = new IndexField();
    indexField.setId(nameIndexID);
    indexField.setFieldValue(concernRoleDtls.concernRoleName);
    indexField.setFieldType(IndexFieldType.Text);
    indexField.setName(MOLSABPOARABDOX.LABEL_NAME.getMessageText(locale));
    indexField.setWidth(255);
    indexField.setDateFormat(DateFormat.NONE);
    arrayOfIndexField.addIndexField(indexField);

    // Adding the Gender as Id
    indexField = new IndexField();
    indexField.setId(genderIndexID);
    indexField.setFieldValue(CodeTable.getOneItem(GENDER.TABLENAME, personDtls.gender, locale));
    indexField.setFieldType(IndexFieldType.Text);
    indexField.setName(MOLSABPOARABDOX.LABEL_NAME.getMessageText(locale));
    indexField.setDateFormat(DateFormat.NONE);
    indexField.setWidth(255);
    arrayOfIndexField.addIndexField(indexField);
    
    
    // Adding Default IDs
    String notUsedTextIDs[] = documentIndexNotUsedTextIDs.split(CuramConst.gkCommaDelimiter);

    for (String notUsedTextID : notUsedTextIDs) {
      indexField = new IndexField();
      indexField.setId(Integer.parseInt(notUsedTextID));
      indexField.setFieldValue(CuramConst.gkEmpty);
      indexField.setFieldType(IndexFieldType.Text);
      indexField.setName(CuramConst.gkEmpty);
      indexField.setDateFormat(DateFormat.dd_MM_yyyy);
      indexField.setWidth(255);
      arrayOfIndexField.addIndexField(indexField);
    }

    String notUsedDateIDs[] = documentIndexNotUsedDateIDs.split(CuramConst.gkCommaDelimiter);
    SimpleDateFormat ddMMMyyyyFormat = new SimpleDateFormat("dd-MM-yyyy");
    String caseStartDate = ddMMMyyyyFormat.format(caseHeaderDtls.startDate.getCalendar().getTime());
    for (String notUsedDateID : notUsedDateIDs) {
      indexField = new IndexField();
      indexField.setId(Integer.parseInt(notUsedDateID));
      indexField.setFieldValue(caseStartDate);
      indexField.setFieldType(IndexFieldType.Date);
      indexField.setName(CuramConst.gkEmpty);
      indexField.setDateFormat(DateFormat.dd_MM_yyyy);
      indexField.setWidth(255);
      arrayOfIndexField.addIndexField(indexField);
    }
    
    
        
   
    
    return arrayOfIndexField;

  }

  /**
   * Retrieves the file from ArabDox.
   * 
   * @param attachmentID long
   * @return Blob
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public Blob retreiveFileContentFromArabDox(long attachmentID) throws AppException, InformationalException {

    Blob attachmentContent = Blob.kEmptyBlob;
    MOLSAArabDoxAttach arabDoxAttachObj = MOLSAArabDoxAttachFactory.newInstance();
    MOLSAArabDoxAttachKey molsaArabDoxAttachKey = new MOLSAArabDoxAttachKey();
    molsaArabDoxAttachKey.attachmentID = attachmentID;
    MOLSAArabDoxAttachDtls molsaArabDoxAttachDtls = arabDoxAttachObj.read(molsaArabDoxAttachKey);

    MOLSAArabDoxCaseLink arabDoxCaseLinkObj = MOLSAArabDoxCaseLinkFactory.newInstance();
    MOLSAArabDoxCaseLinkKey molsaArabDoxCaseLinkKey = new MOLSAArabDoxCaseLinkKey();
    molsaArabDoxCaseLinkKey.caseID = molsaArabDoxAttachDtls.caseID;
    MOLSAArabDoxCaseLinkDtls molsaArabDoxCaseLinkDtls = arabDoxCaseLinkObj.read(molsaArabDoxCaseLinkKey);

    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    FileType fileType;
    if (molsaArabDoxAttachDtls.isAttachment) {
      fileType = FileType.Attachment;
    } else {
      fileType = FileType.Image;
    }
    DocumentFileLoadResponse documentFileLoadResponse = arabdoxHelper.loadDocumentFile(arabdoxRemoteServiceStub, loginResponse, 
        (int) molsaArabDoxAttachDtls.arabDoxDocumentID,
        (int) molsaArabDoxAttachDtls.arabDoxFileID, fileType);

    StreamBody streamBody = documentFileLoadResponse.getFileStream();
    DataHandler dataHandler = streamBody.getStreamBody();

    try {
      InputStream in = dataHandler.getInputStream();
      byte[] byteArray = IOUtils.toByteArray(in);
      attachmentContent = new Blob(byteArray);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    try {
      LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
    } catch (AppException appException) {
      //Do Nothing, Even through log out failed. Just leave it.
    }
    return attachmentContent;
  }

  /**
   * Deletes the existing file from Arabdox and add the new content to the ArabDox.
   * 
   * @param attachmentID attachmentID
   * @param attachmentName attachmentName
   * @param attachmentContent Blob
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public void modifyFileContentToArabDox(long attachmentID, String attachmentName, Blob attachmentContent) 
  throws AppException, InformationalException {

    // Erase the Data from Curam
    Attachment attachmentObj = AttachmentFactory.newInstance();
    AttachmentKey attachmentKey = new AttachmentKey();
    attachmentKey.attachmentID = attachmentID;
    AttachmentDtls attachmentDtls = attachmentObj.read(attachmentKey);
    attachmentDtls.attachmentContents = Blob.kEmptyBlob;
    attachmentObj.modify(attachmentKey, attachmentDtls);

    
    String fileName = attachmentID + attachmentName;

    MOLSAArabDoxAttach arabDoxAttachObj = MOLSAArabDoxAttachFactory.newInstance();
    MOLSAArabDoxAttachKey molsaArabDoxAttachKey = new MOLSAArabDoxAttachKey();
    molsaArabDoxAttachKey.attachmentID = attachmentID;
    MOLSAArabDoxAttachDtls molsaArabDoxAttachDtls = arabDoxAttachObj.read(molsaArabDoxAttachKey);

    MOLSAArabDoxCaseLink arabDoxCaseLinkObj = MOLSAArabDoxCaseLinkFactory.newInstance();
    MOLSAArabDoxCaseLinkKey molsaArabDoxCaseLinkKey = new MOLSAArabDoxCaseLinkKey();
    molsaArabDoxCaseLinkKey.caseID = molsaArabDoxAttachDtls.caseID;
    MOLSAArabDoxCaseLinkDtls molsaArabDoxCaseLinkDtls = arabDoxCaseLinkObj.read(molsaArabDoxCaseLinkKey);

    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);

    FileType fileType;
    long documentID = 0;
    if (molsaArabDoxAttachDtls.isAttachment) {
      fileType = FileType.Attachment;
    } else {
      fileType = FileType.Image;
    }
    DeleteDocumentFileResponse deleteDocumentFileResponse = arabdoxHelper.deleteDocumentFile(arabdoxRemoteServiceStub, loginResponse,
        (int) molsaArabDoxAttachDtls.arabDoxDocumentID, (int) molsaArabDoxAttachDtls.arabDoxFileID, fileType);

    DocumentFileAddResponse documentFileAddResponse = 
      arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse, molsaArabDoxAttachDtls.arabDoxDocumentID,
        attachmentContent, fileName, true);
    
    MOLSAArabdoxUtil arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
    DocumentFile documentFile = 
      arabdoxUtilObj.getDocumentFile(arabdoxRemoteServiceStub, arabdoxHelper, loginResponse, 
          (int) molsaArabDoxAttachDtls.arabDoxDocumentID,
        FileType.Attachment, fileName);

    molsaArabDoxAttachDtls.arabDoxFileID = documentFile.getSerial();
    arabDoxAttachObj.modify(molsaArabDoxAttachKey, molsaArabDoxAttachDtls);

    try {
      LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
    } catch (AppException appException) {
      //Do Nothing, Even through log out failed. Just leave it.
    }

  }

  /**
   * Upload a new file to the ArabDox.
   * As a part of this process, this will login to the ArabDox System, 
   * Create Folder and Documents (If not created previously) and
   * logout from the system.
   * 
   * @param attachmentID long
   * @param caseID long
   * @param attachmentName String
   * @param attachmentContent Blob
   * @param isProcess boolean
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public void insertFileContentToArabDox(long attachmentID, long caseID, String attachmentName, 
      Blob attachmentContent, boolean isProcess) throws AppException,
      InformationalException {
    // Erase the Data from Curam
    Attachment attachmentObj = AttachmentFactory.newInstance();
    AttachmentKey attachmentKey = new AttachmentKey();
    attachmentKey.attachmentID = attachmentID;
    AttachmentDtls attachmentDtls = attachmentObj.read(attachmentKey);
    attachmentDtls.attachmentContents = Blob.kEmptyBlob;
    attachmentObj.modify(attachmentKey, attachmentDtls);

    CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
    CaseSearchKey caseSearchKey = new CaseSearchKey();
    caseSearchKey.caseID = caseID;
    CaseReference caseReference = caseHeaderObj.readCaseReferenceByCaseID(caseSearchKey);

    String folderName = caseReference.caseReference;
    String fileName = attachmentID + attachmentName;

    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);

    MOLSAArabDoxCaseLinkDtls arabDoxCaseLinkDtls = 
      createInitialFolderAndDocuments(arabdoxRemoteServiceStub, arabdoxHelper, loginResponse, caseID, folderName);

    DocumentFile documentFile = null;
    long documentID = 0;
    if (isProcess) {
      documentID = arabDoxCaseLinkDtls.arabDoxProDocID;
    } else {
      documentID= arabDoxCaseLinkDtls.arabDoxVerDocID;
    }

    try {
      DocumentFileAddResponse documentFileAddResponse = 
        arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse, documentID,
          attachmentContent, fileName, true);

      documentFile = getDocumentFile(arabdoxRemoteServiceStub, arabdoxHelper, 
          loginResponse, (int) documentID, FileType.Attachment, fileName);
    } catch (AppException appException) {
      TransactionInfo.getInfo().rollback();
      TransactionInfo.getInfo().begin();
      MOLSAArabDoxCaseLink arabDoxCaseLinkObj = MOLSAArabDoxCaseLinkFactory.newInstance();
      MOLSAArabDoxCaseLinkKey molsaArabDoxCaseLinkKey = new MOLSAArabDoxCaseLinkKey();
      molsaArabDoxCaseLinkKey.caseID = caseID;
      NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
      MOLSAArabDoxCaseLinkDtls tmpArabDoxCaseLinkDtls = arabDoxCaseLinkObj.read(notFoundIndicator, molsaArabDoxCaseLinkKey);
      if (notFoundIndicator.isNotFound()) {
        arabDoxCaseLinkObj.insert(arabDoxCaseLinkDtls);
      } else {
        arabDoxCaseLinkObj.modify(molsaArabDoxCaseLinkKey, arabDoxCaseLinkDtls);
      }
      TransactionInfo.getInfo().commit();
      throw (appException);
    }

    MOLSAArabDoxAttach arabDoxAttachObj = MOLSAArabDoxAttachFactory.newInstance();
    MOLSAArabDoxAttachDtls arabDoxAttachDtls = new MOLSAArabDoxAttachDtls();
    arabDoxAttachDtls.attachmentID = attachmentID;
    arabDoxAttachDtls.arabDoxFileID = documentFile.getSerial();
    arabDoxAttachDtls.arabDoxFolderID = arabDoxCaseLinkDtls.arabDoxFolderID;
    arabDoxAttachDtls.arabDoxDocumentID = documentID;

    // Always be Attachment.
    if (documentFile.getFileType().getValue().equals(FileType._Attachment)) {
      arabDoxAttachDtls.isAttachment = true;
    }
    arabDoxAttachDtls.caseID = caseID;
    arabDoxAttachObj.insert(arabDoxAttachDtls);

    try {
      LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
    } catch (AppException appException) {
      //Do Nothing, Even through log out failed. Just leave it.
    }

  }

  /**
   * Method create a new folder and Documents (If not created).
   * Since it is not possible to revert back the ArabDox invocation,
   * The details of the folder and document are committed in separate transaction,
   * in case if AppException.
   * 
   * @param arabdoxRemoteServiceStub ArabdoxRemoteServiceStub
   * @param arabdoxHelper MOLSAArabdoxHelper
   * @param loginResponse LoginResponse
   * @param caseID long
   * @param folderName String
   * @return MOLSAArabDoxCaseLinkDtls
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
   */
  public MOLSAArabDoxCaseLinkDtls createInitialFolderAndDocuments(ArabdoxRemoteServiceStub arabdoxRemoteServiceStub, 
      MOLSAArabdoxHelper arabdoxHelper, 
      LoginResponse loginResponse,
      long caseID, String folderName) throws AppException, InformationalException {

    int caseFolderID = 0;

    MOLSAArabDoxCaseLink arabDoxCaseLinkObj = MOLSAArabDoxCaseLinkFactory.newInstance();
    MOLSAArabDoxCaseLinkKey molsaArabDoxCaseLinkKey = new MOLSAArabDoxCaseLinkKey();
    molsaArabDoxCaseLinkKey.caseID = caseID;
    NotFoundIndicator firstTimeNotFoundIndicator = new NotFoundIndicator();
    MOLSAArabDoxCaseLinkDtls arabDoxCaseLinkDtls = arabDoxCaseLinkObj.read(firstTimeNotFoundIndicator, molsaArabDoxCaseLinkKey);

    MOLSAArabDoxContainerExists arabDoxContainerExists = 
      isFolderExists(arabdoxRemoteServiceStub, arabdoxHelper, loginResponse, baseFolderID, ContainerType.Folder, folderName);

    MOLSAArabDoxCaseLinkKey arabDoxCaseLinkKey = new MOLSAArabDoxCaseLinkKey();
    arabDoxCaseLinkKey.caseID = caseID;
    DocumentCreateResponse processDocumentCreateResponse = null;
    DocumentCreateResponse verificationDocumentCreateResponse = null;

    /**
     * Start: Complex Logic. Reason- The Arabdox cannot revert back, any creation process.
     * So Intermediate Commit ie required
     */
    if (firstTimeNotFoundIndicator.isNotFound()) {

      CreateFolderResponse createFolderResponse = null;
      if (!arabDoxContainerExists.isExists) {
        createFolderResponse = arabdoxHelper.createFolder(arabdoxRemoteServiceStub, loginResponse, 
            folderName, baseFolderID, ContainerType.Folder, baseFolderName);
        FolderCreateResponse folderCreateResponse = createFolderResponse.getCreateFolderResult();
        ArabdoxContainer arabdoxContainer = folderCreateResponse.getCreatedFolder();
        caseFolderID = arabdoxContainer.getContainerId();
      } else {
        caseFolderID = (int) arabDoxContainerExists.containerID;
      }

      CreateDocumentExResponse processCreateDocumentResponse = arabdoxHelper.createDocumentEx(arabdoxRemoteServiceStub, 
          loginResponse, processFolderName, caseFolderID, caseID);
      processDocumentCreateResponse = processCreateDocumentResponse.getCreateDocumentExResult();

      // Till this we do care about throwing the error from ArabDox.We can check whether the folder exists or not.
      // But cannot check whether the Document is created or not. Once Created, we cannot revert back from ArabDox.
      // So if any failure occur in creation of second document, we need to write the details to the table.

      try {
        CreateDocumentExResponse verificationCreateDocumentResponse = 
          arabdoxHelper.createDocumentEx(arabdoxRemoteServiceStub, loginResponse, verificatonFolderName, caseFolderID,
            caseID);
        verificationDocumentCreateResponse = verificationCreateDocumentResponse.getCreateDocumentExResult();
      } catch (AppException appException) {
        TransactionInfo.getInfo().rollback();
        TransactionInfo.getInfo().begin();
        arabDoxCaseLinkDtls = new MOLSAArabDoxCaseLinkDtls();
        arabDoxCaseLinkDtls.caseID = caseID;
        arabDoxCaseLinkDtls.arabDoxFolderID = caseFolderID;
        arabDoxCaseLinkDtls.arabDoxProDocID = processDocumentCreateResponse.getCreatedDocumentId();
        arabDoxCaseLinkObj.insert(arabDoxCaseLinkDtls);
        TransactionInfo.getInfo().commit();
        throw (appException);
      }

    }

    NotFoundIndicator secondTimeNotFoundIndicator = new NotFoundIndicator();
    arabDoxCaseLinkDtls = arabDoxCaseLinkObj.read(secondTimeNotFoundIndicator, molsaArabDoxCaseLinkKey);
    if (secondTimeNotFoundIndicator.isNotFound()) {
      arabDoxCaseLinkDtls = new MOLSAArabDoxCaseLinkDtls();
      arabDoxCaseLinkDtls.caseID = caseID;
      arabDoxCaseLinkDtls.arabDoxFolderID = caseFolderID;
      arabDoxCaseLinkDtls.arabDoxProDocID = processDocumentCreateResponse.getCreatedDocumentId();
      arabDoxCaseLinkDtls.arabDoxVerDocID = verificationDocumentCreateResponse.getCreatedDocumentId();
      arabDoxCaseLinkObj.insert(arabDoxCaseLinkDtls);
    }
    // If Verification is not created
    if (arabDoxCaseLinkDtls.arabDoxVerDocID == 0) {
      CreateDocumentExResponse verificationCreateDocumentResponse = 
        arabdoxHelper.createDocumentEx(arabdoxRemoteServiceStub, loginResponse, verificatonFolderName, caseFolderID,
          caseID);
      verificationDocumentCreateResponse = verificationCreateDocumentResponse.getCreateDocumentExResult();
      arabDoxCaseLinkDtls.arabDoxVerDocID = verificationDocumentCreateResponse.getCreatedDocumentId();
      arabDoxCaseLinkObj.modify(arabDoxCaseLinkKey, arabDoxCaseLinkDtls);
    }

    /** End: Complex Logic. */

    return arabDoxCaseLinkDtls;
  }

}
