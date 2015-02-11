package curam.molsa.sms.sl.impl;

import java.io.Serializable;
import java.rmi.RemoteException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.axis2.transport.http.HTTPConstants;

import com.google.inject.Inject;
import com.pmmsoapmessenger.MessengerStub;
import com.pmmsoapmessenger.MessengerStub.Authenticate;
import com.pmmsoapmessenger.MessengerStub.AuthenticateResponse;
import com.pmmsoapmessenger.MessengerStub.GetSmsStatus;
import com.pmmsoapmessenger.MessengerStub.GetSmsStatusResponse;
import com.pmmsoapmessenger.MessengerStub.MessageType;
import com.pmmsoapmessenger.MessengerStub.SendResult;
import com.pmmsoapmessenger.MessengerStub.SendSms;
import com.pmmsoapmessenger.MessengerStub.SendSmsResponse;
import com.pmmsoapmessenger.MessengerStub.SoapUser;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.COMMUNICATIONSTATUS;
import curam.codetable.CONCERNROLETYPE;
import curam.codetable.CORRESPONDENT;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.LOCALE;
import curam.codetable.PHONETYPE;
import curam.codetable.PRODUCTCATEGORY;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.fact.AddressFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.ConcernRolePhoneNumberFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.Address;
import curam.core.intf.ConcernRole;
import curam.core.sl.fact.CommunicationFactory;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EDPartIDEvTypeIdx;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.sl.intf.Communication;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.RecordedCommDetails1;
import curam.core.sl.struct.RecordedCommKey;
import curam.core.sl.struct.SQLStatement;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressKey;
import curam.core.struct.CaseStatusConcernRoleIDICType;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRolePhoneNumberDtls;
import curam.core.struct.ConcernRolePhoneNumberDtlsList;
import curam.core.struct.OtherAddressData;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.message.GENERAL;
import curam.message.GENERALSEARCH;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.codetable.MOLSASMSERRORCODEDESC;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.sms.entity.fact.MOLSASMSErrorCodeFactory;
import curam.molsa.sms.entity.fact.MOLSASMSLogFactory;
import curam.molsa.sms.entity.intf.MOLSASMSErrorCode;
import curam.molsa.sms.entity.intf.MOLSASMSLog;
import curam.molsa.sms.entity.struct.MOLSASMSErrorCodeDtls;
import curam.molsa.sms.entity.struct.MOLSASMSErrorCodeDtlsList;
import curam.molsa.sms.entity.struct.MOLSASMSErrorCodeKeyStruct1;
import curam.molsa.sms.entity.struct.MOLSASMSLogDtls;
import curam.molsa.sms.entity.struct.MOLSASMSLogDtlsList;
import curam.molsa.sms.entity.struct.MOLSASMSLogKeyStruct3;
import curam.molsa.sms.entity.struct.MOLSASMSLogKeyStruct4;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetails;
import curam.molsa.sms.facade.struct.MOLSAFailedSMSDetails;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetails;
import curam.molsa.sms.sl.struct.MOLSAAdditionalBenefitDetailsList;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAFailedSMSDetailsList;
import curam.molsa.sms.sl.struct.MOLSAMessageText;
import curam.molsa.sms.sl.struct.MOLSAMessageTextKey;
import curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.sl.struct.MOLSASMSLogKey;
import curam.molsa.sms.sl.struct.SMSCommDetails;
import curam.molsa.util.impl.MOLSASMSExportParticipantToExcel;
import curam.participant.impl.ConcernRoleDAO;
import curam.participant.impl.PhoneNumber;
import curam.participant.impl.PhoneNumberDAO;
import curam.pdc.fact.PDCUtilFactory;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.DatabaseException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.exception.ReadmultiMaxException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.resources.StringUtil;
import curam.util.resources.impl.PropertiesResourceCache;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.StringList;

/**
 * Service layer class is used to send SMS messages, export the 
 * participant list to excel, list SMS exceptions, Re send the failed SMS.
 */

public class MOLSASMSUtil extends curam.molsa.sms.sl.base.MOLSASMSUtil {
  
  @Inject
  public CaseHeaderDAO caseHeaderDAO;
  @Inject
  public ProductDeliveryDAO productDeliveryDAO;
  @Inject
  public ConcernRoleDAO concernRoleDAO;
  @Inject
  protected PhoneNumberDAO phoneNumberDAO;
  
  /**
   * Default constructor for the class.
   */
  public MOLSASMSUtil() {
    GuiceWrapper.getInjector().injectMembers(this);
  }


  /**
   * Sends the message to the list of participants received in the input parameter. 
   * 
   * @param key
   *            Contains a key details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public void sendSMS(MOLSAConcernRoleListAndMessageTextDetails key) throws AppException, InformationalException {

    if(key.dtls.concernRoleTabbedList.length()==0){
      curam.core.sl.infrastructure.impl.ValidationManagerFactory
      .getManager()
      .throwWithLookup(
          new AppException(
              MOLSASMSSERVICE.NO_CONCERNROLE_SELECTED),
          curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
          0);
    }
    
    if(key.dtls.smsMessageType.length()==0){
        curam.core.sl.infrastructure.impl.ValidationManagerFactory
        .getManager()
        .throwWithLookup(
            new AppException(
                MOLSASMSSERVICE.SMS_CATEGOEY_AND_TEMPLATE_MUST_BE_ENTERED),
            curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
            0);
      }
    SoapUser soapUser = getUserDetails();
    Authenticate authenticate = new Authenticate();
    authenticate.setUser(soapUser);
    String phNumber = "";
    MOLSASMSErrorCodeDtls errorCodeDtls = new MOLSASMSErrorCodeDtls();
    MOLSASMSLogDtls molsasmsLogDtls = new MOLSASMSLogDtls();
    try {
      if (authenticateSoapUser(soapUser)) {
        StringList concernRoleIDList = StringUtil.delimitedText2StringList(key.dtls.concernRoleTabbedList, CuramConst.gkTabDelimiterChar);
        try {
          MessengerStub messenger = new MessengerStub();
          messenger._getServiceClient().getOptions().setProperty(HTTPConstants.CHUNKED, false);
          SendSms sendSms = null;
          for (String concernRoleID : concernRoleIDList) {
            phNumber = getPersonPreferredPhoneNumber(concernRoleID);
            molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.FAILED;
            if(!phNumber.equals("")){
              sendSms = new SendSms();
              sendSms.setUser(soapUser);
              sendSms.setBlink(false);
              sendSms.setDefDate(CuramConst.gkEmpty);
              sendSms.setFlash(false);
              sendSms.setOriginator(MOLSASMSConstants.kOriginator);
              sendSms.setPrivate(false);
              sendSms.setMessageType(MessageType.ArabicWithArabicNumbers);
              sendSms.setSmsText(key.dtls.smsMessageText);
              sendSms.setRecipientPhone(phNumber);
              SendSmsResponse sendResult = new SendSmsResponse();
              sendResult = messenger.sendSms(sendSms);
              GetSmsStatus smsStatus = new GetSmsStatus();
              smsStatus.setUser(soapUser);
              smsStatus.setTransactionID(sendResult.getSendSmsResult().getTransactionID());
              smsStatus.setDetailed(true);
              GetSmsStatusResponse statusresponse = messenger.getSmsStatus(smsStatus);
              if (!sendResult.getSendSmsResult().getResult().equals("OK")) {
              //Read the proper error code and update the same in the MOLSASMSLog Entity
                String errorCode=sendResult.getSendSmsResult().getResult();
                molsasmsLogDtls.errorCode = errorCode.substring(0, 5);
              } else {
                if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("SUCCESS")) {
                  molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.SUCCESS;
                }

                if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("InProcessNow")) {
                  molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.InProcessNow;
                }
                if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("SMSC_DELIVERED")) {
                  molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.SMSDELIVERED;
                }

                if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("REJECTED_INVALID_NUMBER")) {
                  molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.REJECTED_INVALID_NUMBER;
                }
                if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("FAILED")) {
                  molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.FAILED;
                }

              }
            } else{
            	//If phone number is not present,update the MOLSASMSLog entity with the correct error code.
            	 molsasmsLogDtls.errorCode=MOLSAConstants.kSMSPhoneNumerErrorCode;
            }
            molsasmsLogDtls.concernRoleID = Long.parseLong(concernRoleID);
            molsasmsLogDtls.createdBy = TransactionInfo.getProgramUser();
            molsasmsLogDtls.messageLoggedID = UniqueIDFactory.newInstance().getNextID();
            molsasmsLogDtls.messsageText = key.dtls.smsMessageText;

            molsasmsLogDtls.smsTemplate = key.dtls.smsMessageType;
            molsasmsLogDtls.smsCategory = CodeTable.getParentCode(MOLSASMSMESSAGETEMPLATE.TABLENAME, key.dtls.smsMessageType);
            molsasmsLogDtls.createdDateTime = TransactionInfo.getSystemDateTime();

            SMSCommDetails smsDetails = new SMSCommDetails();
            smsDetails.clientParticipantRoleID = Long.parseLong(concernRoleID);
            smsDetails.phoneNumber = phNumber;
            smsDetails.smsText = key.dtls.smsMessageText;
            smsDetails.correspondentConcernRoleID = Long.parseLong(concernRoleID);
            smsDetails.correspondentConcernRoleType = CONCERNROLETYPE.PERSON;
            smsDetails.correspondentType = CORRESPONDENT.CLIENT;
            smsDetails.communicationStatus = molsasmsLogDtls.deliveryStatus;
            // To get caseID from concernrole
            if(key.dtls.caseID!=0){
              CaseHeader caseHeader = caseHeaderDAO.get(key.dtls.caseID);
              if(caseHeader.getCaseType().equals(CASETYPECODE.PRODUCTDELIVERY)){
                smsDetails.caseID = productDeliveryDAO.get(key.dtls.caseID).getParentCase().getID();
              }
              smsDetails.caseID = key.dtls.caseID;
            }
            else{
              CaseStatusConcernRoleIDICType caseStatusConcernRoleIDICType = new CaseStatusConcernRoleIDICType();
              caseStatusConcernRoleIDICType.concernRoleID = Long.parseLong(concernRoleID);
              caseStatusConcernRoleIDICType.integratedCaseType = PRODUCTCATEGORY.SOCIAL_ASSITANCE;
              caseStatusConcernRoleIDICType.statusCode = CASESTATUS.OPEN;
              long caseID = CaseHeaderFactory.newInstance().searchICByStatusParticipantIDICType(caseStatusConcernRoleIDICType).dtls.get(0).caseID;
              smsDetails.caseID = caseID;
            }
            

            smsDetails.subject = CodeTable.getOneItem(MOLSASMSMessageType.TABLENAME, CodeTable.getParentCode(MOLSASMSMESSAGETEMPLATE.TABLENAME, key.dtls.smsMessageType));

            // inserting communication and saving the communcationID
            molsasmsLogDtls.relatedID = new MOLSACommunication().createSMSReturningID(smsDetails).communicationID;

            MOLSASMSLogFactory.newInstance().insert(molsasmsLogDtls);

          }
        } catch (RemoteException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
        }
      } else {
        final AppException appException = new AppException(MOLSASMSSERVICE.ERR_AUTH_FAILED);
        curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(appException, CuramConst.gkEmpty,
            InformationalElement.InformationalType.kError, curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree, 0);
        return;
      }
    } catch (NumberFormatException e) {
    } catch (DatabaseException e) {
    } catch (RemoteException e) {
    } catch (AppRuntimeException e) {
    }

  }

  /**
   *  Gets the person phone number. 
   * 
   * @param concernRoleID
   *            Contains a key details.
   *  
   * @return String phoneNuber
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public String getPersonPreferredPhoneNumber(String concernRoleID) throws AppException, InformationalException {
    String phNumber = "";
    ConcernRoleKey concernRoleKey = new ConcernRoleKey();
    concernRoleKey.concernRoleID = Long.parseLong(concernRoleID);
    long caseID = PDCUtilFactory.newInstance().getPDCCaseIDCaseParticipantRoleID(concernRoleKey).caseID;

    final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

    caseIDStatusAndEvidenceTypeKey.caseID = caseID;
    caseIDStatusAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;
    caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

    final curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory.newInstance();

    ReadEvidenceDetails evidenceDetails = new ReadEvidenceDetails();
    RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

    final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
    curam.core.sl.struct.EvidenceTypeKey evidenceTypeKey = new curam.core.sl.struct.EvidenceTypeKey();
    evidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;

    EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory.instance(evidenceTypeKey, Date.getCurrentDate());
    DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
    String countryCode = "";
    for (RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

      evidenceCaseKey.caseIDKey.caseID = caseID;
      evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
      evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
      evidenceDetails = evidenceServiceInterface.readEvidence(evidenceCaseKey);
      dynamicEvidenceDataDetails = evidenceDetails.dtls;
      if(dynamicEvidenceDataDetails.getAttribute("phoneType").getValue().equals(PHONETYPE.MOBILE)){
          countryCode = dynamicEvidenceDataDetails.getAttribute("phoneCountryCode").getValue();
          phNumber = dynamicEvidenceDataDetails.getAttribute("phoneNumber").getValue();
          if (Boolean.parseBoolean(dynamicEvidenceDataDetails.getAttribute("preferredInd").getValue())) {
            return countryCode + phNumber;
          }
        }
        }
    return countryCode + phNumber;
  }

  /**
   * @return returns the SoapUser Details of MOLSA
   */
  private SoapUser getUserDetails() {
    SoapUser soapUser = new SoapUser();
    soapUser.setCustomerID(1880);
    soapUser.setName(Configuration.getProperty(EnvVars.SMS_LOGIN_USERNAME));
    soapUser.setPassword(Configuration.getProperty(EnvVars.SMS_LOGIN_PASSWORD));
    return soapUser;

  }

  /**
   *  Validates the person phone number. 
   * 
   * @param recipientPhone
   *            Contains a key details.

   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public void validateMobile(String recipientPhone) throws InformationalException {

    if (recipientPhone.trim().length() != 10) {
      final AppException appException = new AppException(MOLSASMSSERVICE.ERR_AUTH_FAILED);
      curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(appException, CuramConst.gkEmpty,
          InformationalElement.InformationalType.kError, curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree, 0);
      return;
    }

  }

  /**
   *  Authenticates the user.
   * 
   * @param user
   *            Contains a key details.
   *            
   * @return Boolean

   * @throws RemoteException
   *             Generic Exception Signature.
   */
  
  private Boolean authenticateSoapUser(SoapUser user) throws RemoteException {
    SoapUser soapUser = getUserDetails();
    Authenticate authenticate = new Authenticate();
    authenticate.setUser(soapUser);
    String phNumber = "";
    MessengerStub messenger = new MessengerStub();
    messenger._getServiceClient().getOptions().setProperty(HTTPConstants.CHUNKED, false);
    try {

      AuthenticateResponse authResult = new AuthenticateResponse();
      authResult = messenger.authenticate(authenticate);
      if (authResult.getAuthenticateResult().getResult().equals("OK")) {
        return true;
      }
    } catch (RemoteException exception) {
      exception.printStackTrace();
    }
    return false;
  }


  /**
   * Return the list of participants based on the user search criteria to send the SMS.
   * 
   * @param key
   *          Contains a key details.
   *            
   * @return MOLSAFailedSMSDetailsList
   *          List of Participant details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public MOLSAParticipantDetailsList listParticipantByCriteria(MOLSAParticipantFilterCriteriaDetails key) throws AppException, InformationalException {

    MOLSAParticipantDetailsList molsaParticipantDetailsList = new MOLSAParticipantDetailsList();

    validateSearchCriteria(key);
    // search the participants by case type.
    InformationalManager informationalManager = TransactionInfo.getInformationalManager();
    CuramValueList curamValueList = new CuramValueList(MOLSAParticipantDetails.class);
    try {
      curamValueList = DynamicDataAccess.executeNsMulti(MOLSAParticipantDetails.class, key.dtls, false, true, formatSQL(key.dtls).sqlStatement);
    } catch (ReadmultiMaxException e) {
      ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(new AppException(GENERAL.INF_GENERAL_SEARCH_TOO_MANY_RECORDS), "",
          InformationalElement.InformationalType.kError, "a", 3);
      informationalManager.failOperation();
    }
    for (int i = 0; i < curamValueList.size(); i++) {

      MOLSAParticipantDetails details = (MOLSAParticipantDetails) curamValueList.item(i);
      Address addressObj = AddressFactory.newInstance();
      AddressKey paramAddressKey = new AddressKey();
      paramAddressKey.addressID = Long.parseLong(details.addressString);
      AddressDtls addressDtls = addressObj.read(paramAddressKey);
      OtherAddressData otherAddressData = new OtherAddressData();
      otherAddressData.addressData = addressDtls.addressData;
      details.addressString = ParticipantFactory.newInstance().displaySingleLineAddress(otherAddressData).addressString;
      details.participantName = details.participantName.concat(" - ").concat(details.qid);

      molsaParticipantDetailsList.dtls.dtls.addRef((MOLSAParticipantDetails) details);
    }

    return molsaParticipantDetailsList;
  }

  /**
   * Validates the user entered search criteria.
   * 
   * @param key
   *          Contains a key details.
   *            
   * @throws AppException
   *             Generic Exception Signature.
   *             
   * 
   */
  
  protected void validateSearchCriteria(MOLSAParticipantFilterCriteriaDetails key) throws AppException {

    if (!(key.dtls.hasIncome) && !(key.dtls.isIncludeHouseHoldMembers) && (key.dtls.age == CuramConst.gkZero) && (key.dtls.caseStatus.length() == CuramConst.gkZero)
        && (key.dtls.caseType.length() == CuramConst.gkZero) && (key.dtls.educationLevel.length() == CuramConst.gkZero) && (key.dtls.gender.length() == CuramConst.gkZero)
        && (key.dtls.muncipality.length() == CuramConst.gkZero) && (key.dtls.incomeFromDate.isZero()) && (key.dtls.incomeToDate.isZero())) {

      ValidationManagerFactory.getManager().throwWithLookup(new AppException(GENERALSEARCH.ERR_FV_SEARCH_CRITERIA_MISSING), "a", 0);

    }

  }

  /**
   * Sql query to retrieve the records based on the search criteria.
   * 
   * @param dtls
   *          Contains a key details.
   *          
   * @return SQLStatement
   * 
   * @throws AppException
   *             Generic Exception Signature.
   *             
   * @throws InformationalException
   *             Generic Exception Signature.
   * 
   */
  
  protected SQLStatement formatSQL(curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails dtls) throws AppException, InformationalException {
    SQLStatement sqlStatement = new SQLStatement();
    StringBuffer selectStrBuf = new StringBuffer();
    StringBuffer intoStrBuf = new StringBuffer();
    StringBuffer fromStrBuf = new StringBuffer();
    StringBuffer whereStrBuf = new StringBuffer();

    selectStrBuf.append("SELECT Distinct concernrole.primaryalternateid,caseheader.concernroleID,concernrole.concernRoleName, ");
    selectStrBuf.append("concernrole.primaryAddressID, person.dateofBirth ");

    intoStrBuf.append("INTO :qid ");
    intoStrBuf.append(":concernroleID ");
    intoStrBuf.append(":participantName ");
    intoStrBuf.append(":addressString ");
    intoStrBuf.append(":dateOfBirth ");

    fromStrBuf.append("FROM concernrole, person, caseheader, caseparticipantrole, productdelivery ");

    whereStrBuf.append("WHERE ");

    if (dtls.caseType.length() > CuramConst.gkZero) {
    	whereStrBuf.append(getCaseTypeCodesClause(dtls.caseType));
    	whereStrBuf.append(" AND ");
    }

    if (dtls.caseStatus.length() > CuramConst.gkZero) {
      whereStrBuf.append("caseHeader.statuscode = :caseStatus AND ");
    }

    if (dtls.age > CuramConst.gkZero) {
      Date currentDate = TransactionInfo.getSystemDate();
      Calendar calender = currentDate.getCalendar();
      calender.add(Calendar.YEAR, -(dtls.age));
      Date date = new Date(calender.getTimeInMillis());
      dtls.caluclatedDateFromAge = date;

      whereStrBuf.append("person.dateofbirth >= :caluclatedDateFromAge AND ");
    }

    if (dtls.gender.length() > CuramConst.gkZero) {
      whereStrBuf.append("person.gender = :gender AND ");
    }

    if (dtls.muncipality.length() > CuramConst.gkZero) {
      fromStrBuf.append(", addresselement, address, concernroleaddress ");
      whereStrBuf.append("addresselement.elementvalue = :muncipality AND ");
      whereStrBuf.append("addresselement.addressID = address.addressID AND ");
      whereStrBuf.append("address.addressID = concernroleaddress.addressID AND ");
    }

    if (dtls.educationLevel.length() > CuramConst.gkZero) {
      fromStrBuf.append(", evidencetypedef evddef, evidencedescriptor evddes, dynamicevidencedataattribute, dynamicevidencedata ");
      whereStrBuf.append("evddef.evidencetypecode='DET0000517' AND ");
      whereStrBuf.append("dynamicevidencedataattribute.value= :educationLevel AND ");
      whereStrBuf.append("evddef.evidencetypecode=evddes.evidencetype AND ");
      whereStrBuf.append("evddes.participantid=concernrole.concernroleID AND ");
      whereStrBuf.append("evddes.statuscode in ('EDS1','EDS2','EDS3','EDS2001','EDS2007') AND ");
    }

    if (dtls.isIncludeHouseHoldMembers) {
      fromStrBuf.append(", evidencetypedef edef, evidencedescriptor edesc ");
      whereStrBuf.append("edef.evidencetypecode='DET0000256' AND ");
      whereStrBuf.append("edef.evidencetypecode=edesc.evidencetype AND ");
      whereStrBuf.append("edesc.participantid=concernrole.concernroleID AND ");
      whereStrBuf.append("edesc.statuscode in ('EDS1','EDS2','EDS3','EDS2001','EDS2007') AND ");
    } else {
      whereStrBuf.append("caseHeader.concernroleID=concernrole.concernroleID AND ");
    }

    if (dtls.hasIncome) {
      fromStrBuf.append(", evidencetypedef, evidencedescriptor ");
      whereStrBuf.append("evidencetypedef.evidencetypecode='DET0000514' AND ");
      whereStrBuf.append("evidencetypedef.evidencetypecode=evidencedescriptor.evidencetype AND ");
      whereStrBuf.append("evidencedescriptor.participantid=concernrole.concernroleID AND ");
      whereStrBuf.append("evidencedescriptor.statuscode in ('EDS1','EDS2','EDS3','EDS2001','EDS2007') AND ");
    }

    if (!(dtls.incomeFromDate.isZero())) {
      fromStrBuf.append(", instructionlineitem ");
      whereStrBuf.append("instructionlineitem.coverperiodfrom >= :incomeFromDate AND ");
      whereStrBuf.append("instructionlineitem.concernroleid=concernrole.concernroleid AND ");
      whereStrBuf.append("instructionlineitem.statuscode in ('ALL', 'REC', 'PRO', 'REV', 'TRF') AND ");
      whereStrBuf.append("instructionlineitem.creditdebittype in ('CDT') AND ");

    }

    if (!(dtls.incomeToDate.isZero())) {
      fromStrBuf.append(", instructionlineitem ilitem ");
      whereStrBuf.append("ilitem.coverperiodfrom <= :incomeToDate AND ");
      whereStrBuf.append("ilitem.concernroleid=concernrole.concernroleid AND ");
      whereStrBuf.append("ilitem.statuscode in ('ALL', 'REC', 'PRO', 'REV', 'TRF') AND ");
      whereStrBuf.append("ilitem.creditdebittype in ('CDT') AND ");
    }

    whereStrBuf.append("person.concernroleID=concernrole.concernroleID AND ");
    whereStrBuf.append("productdelivery.caseid=caseheader.caseid AND ");
    whereStrBuf.append("caseheader.casetypecode='CT2' ");
    

    sqlStatement.sqlStatement = selectStrBuf.toString() + intoStrBuf.toString() + fromStrBuf.toString() + whereStrBuf.toString();
    return sqlStatement;

  }

  /**
   * Lists the additional benefits received by the participant.
   * 
   * @param key
   *          Contains a key details.
   *            
   * @return MOLSAAdditionalBenefitDetailsList
   *          List of participants who receives the additional benefit.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  public MOLSAAdditionalBenefitDetailsList listParticipantAdditionalBenefits(curam.citizenaccount.facade.struct.ConcernRoleKey key) throws AppException, InformationalException {

    final String KAmount = "amount";
    final String KDate = "date";
    final String kBenefitProvider="benefitProvider";

    MOLSAAdditionalBenefitDetailsList additionalBenefitDetailsList = new MOLSAAdditionalBenefitDetailsList();
    EvidenceDescriptor descriptor = EvidenceDescriptorFactory.newInstance();

    EDPartIDEvTypeIdx paramKey = new EDPartIDEvTypeIdx();
    paramKey.evidenceType = CASEEVIDENCE.ADDITIONALBENEFIT;
    paramKey.participantID = key.concernRoleID;

    EvidenceDescriptorDtlsList descriptorDtlsList = descriptor.searchByParticipantIDEvidenceType(paramKey);

    final curam.core.sl.struct.EvidenceTypeKey evidenceTypeKey = new curam.core.sl.struct.EvidenceTypeKey();
    evidenceTypeKey.evidenceType = CASEEVIDENCE.ADDITIONALBENEFIT;
    final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory.instance(evidenceTypeKey, Date.getCurrentDate());

    for (EvidenceDescriptorDtls descriptorDtls : descriptorDtlsList.dtls) {

      ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
      ConcernRoleKey concernRoleKey = new ConcernRoleKey();
      MOLSAAdditionalBenefitDetails additionalBenefitDetails = new MOLSAAdditionalBenefitDetails();
      EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
      evidenceCaseKey.evidenceKey.evType = descriptorDtls.evidenceType;
      evidenceCaseKey.caseIDKey.caseID = descriptorDtls.caseID;
      evidenceCaseKey.evidenceKey.evidenceID = descriptorDtls.relatedID;
      final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface.readEvidence(evidenceCaseKey);
      final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;

      concernRoleKey.concernRoleID = key.concernRoleID;
      additionalBenefitDetails.participantName = concernRoleObj.readConcernRoleName(concernRoleKey).concernRoleName;

      String receivedDate = dynamicEvidenceDataDetails.getAttribute(KDate).getValue();

      String amount = dynamicEvidenceDataDetails.getAttribute(KAmount).getValue();
      
      additionalBenefitDetails.benefitProvider=dynamicEvidenceDataDetails.getAttribute(kBenefitProvider).getValue();

      additionalBenefitDetails.amount = amount + " " + Configuration.getProperty("curam.financial.basecurrency");

      SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
      java.util.Date receivedDate1 = new java.util.Date();
      try {
        receivedDate1 = formatter.parse(receivedDate);
      } catch (ParseException e) {
        // do nothing.
      }
      additionalBenefitDetails.receivedDate = curam.util.type.Date.getFromJavaUtilDate(receivedDate1);

      additionalBenefitDetailsList.dtls.dtls.addRef(additionalBenefitDetails);

    }

    return additionalBenefitDetailsList;
  }


  /**
   * Export the selected participant list returned from the search criteria to excel.
   * 
   * @param key
   *          Contains a key details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public void exportParticipantsToExcel(MOLSAConcernRoleListAndMessageTextDetails key) throws AppException, InformationalException {

    MOLSAParticipantDetailsList molsaParticipantDetailsList = new MOLSAParticipantDetailsList();

    if (key.dtls.concernRoleTabbedList.length() == 0) {

      ValidationManagerFactory.getManager().throwWithLookup(new AppException(MOLSASMSSERVICE.NO_PARTICIPANTS_SELECTED), "a", 0);

    }

    String concernRoleTabbedList = key.dtls.concernRoleTabbedList;
    String[] concernRoleID = concernRoleTabbedList.split("\t");
    for (int i = 0; i < concernRoleID.length; i++) {

      ConcernRoleKey concernRoleKey = new ConcernRoleKey();
      concernRoleKey.concernRoleID = Long.parseLong(concernRoleID[i]);
      InformationalManager informationalManager = TransactionInfo.getInformationalManager();
      CuramValueList curamValueList = new CuramValueList(MOLSAParticipantDetails.class);
      curamValueList = DynamicDataAccess.executeNsMulti(MOLSAParticipantDetails.class, concernRoleKey, false, true, getParticipantDetailsQuery(concernRoleKey).sqlStatement);

      for (int x = 0; x < curamValueList.size(); x++) {

        MOLSAParticipantDetails details = (MOLSAParticipantDetails) curamValueList.item(x);
        Address addressObj = AddressFactory.newInstance();
        AddressKey paramAddressKey = new AddressKey();
        paramAddressKey.addressID = Long.parseLong(details.addressString);
        AddressDtls addressDtls = addressObj.read(paramAddressKey);
        OtherAddressData otherAddressData = new OtherAddressData();
        otherAddressData.addressData = addressDtls.addressData;
        details.addressString = ParticipantFactory.newInstance().displaySingleLineAddress(otherAddressData).addressString;
        details.participantName = details.participantName.concat(" - ").concat(details.qid);

        molsaParticipantDetailsList.dtls.dtls.addRef((MOLSAParticipantDetails) details);

      }
    }

    // export the participant list to excel.
    MOLSASMSExportParticipantToExcel excel = new MOLSASMSExportParticipantToExcel();
    excel.generateExel(molsaParticipantDetailsList, excel.getExelName());

  }

  /**
   * Gets the participant details.
   * 
   * @param concernRoleKey
   * 
   * @return SQLStatement
   */
  
  protected SQLStatement getParticipantDetailsQuery(ConcernRoleKey concernRoleKey) {
    SQLStatement sqlStatement = new SQLStatement();
    StringBuffer selectStrBuf = new StringBuffer();
    StringBuffer intoStrBuf = new StringBuffer();
    StringBuffer fromStrBuf = new StringBuffer();
    StringBuffer whereStrBuf = new StringBuffer();

    selectStrBuf.append("SELECT Distinct concernrole.primaryalternateid, concernrole.concernRoleName, ");
    selectStrBuf.append("concernrole.primaryAddressID, person.dateofBirth ");

    intoStrBuf.append("INTO :qid ");
    intoStrBuf.append(":participantName ");
    intoStrBuf.append(":addressString ");
    intoStrBuf.append(":dateOfBirth ");

    fromStrBuf.append("FROM concernrole, person ");

    whereStrBuf.append("WHERE ");

    whereStrBuf.append("person.concernroleID=concernrole.concernroleID AND ");
    whereStrBuf.append("concernrole.concernroleid= :concernroleID");

    sqlStatement.sqlStatement = selectStrBuf.toString() + intoStrBuf.toString() + fromStrBuf.toString() + whereStrBuf.toString();

    return sqlStatement;
  }

  /**
   * List the failed messages with exceptions details logged while 
   * sending the message to the participants.
   *            
   * @return MOLSAFailedSMSDetailsList
   *          List of failed SMS details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public MOLSAFailedSMSDetailsList listAllFailedMessages() throws AppException, InformationalException {
    MOLSASMSLog molsasmsLogObj = MOLSASMSLogFactory.newInstance();

    MOLSAFailedSMSDetailsList molsaFailedSMSDetailsList = new MOLSAFailedSMSDetailsList();

    MOLSASMSLogKeyStruct3 key = new MOLSASMSLogKeyStruct3();
    // Will change once we get the failure status code table
    key.deliveryStatus = COMMUNICATIONSTATUS.FAILED;
    MOLSASMSLogDtlsList logDtlsList = molsasmsLogObj.listByMessageStatus(key);
    List<Long> messageIDList = new ArrayList<Long>();

    for (MOLSASMSLogDtls dtls : logDtlsList.dtls) {
      if (!messageIDList.contains(dtls.messageLoggedID)) {
        messageIDList.add(dtls.messageLoggedID);
        MOLSASMSLogKeyStruct4 molsasmsLogKeyStruct = new MOLSASMSLogKeyStruct4();
        molsasmsLogKeyStruct.messageLoggedID = dtls.messageLoggedID;
        MOLSASMSLogDtlsList failesSMSDtlsList = molsasmsLogObj.listByMessageLoggedID(molsasmsLogKeyStruct);
        MOLSASMSErrorCode errorCodeObj=MOLSASMSErrorCodeFactory.newInstance();
        MOLSASMSErrorCodeKeyStruct1 codeKeyStruct1=new MOLSASMSErrorCodeKeyStruct1();
        if (failesSMSDtlsList.dtls.size() == 1) {
          MOLSAFailedSMSDetails details = new MOLSAFailedSMSDetails();
          ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
          ConcernRoleKey concernRoleKey = new ConcernRoleKey();
          concernRoleKey.concernRoleID = dtls.concernRoleID;
          String concernRoleID = String.valueOf(dtls.concernRoleID);
          
          //Read the Failed Reason from the MOLSASMSErrorCode entity
          codeKeyStruct1.errorCodeID=dtls.errorCode;
		  MOLSASMSErrorCodeDtlsList errorCodeDtlsList = errorCodeObj.listByErrorCodeID(codeKeyStruct1);
		
		if(errorCodeDtlsList.dtls.size()>0){
			MOLSASMSErrorCodeDtls errorCodeDtls = errorCodeDtlsList.dtls.item(0);
			 details.failedReason = CodeTable.getOneItem(MOLSASMSERRORCODEDESC.TABLENAME,errorCodeDtls.errorCode);
		}else{
			 details.failedReason = MOLSASMSSERVICE.SMS_GENERIC_FAILED_REASON.toString();
		}
         
          details.message = dtls.messsageText;
          details.failureDate = dtls.createdDateTime;
          details.smsMessageID = dtls.messageID;
          details.phoneNumber = getPersonPreferredPhoneNumber(concernRoleID);
          details.participantName = concernRoleObj.readConcernRoleName(concernRoleKey).concernRoleName;
          molsaFailedSMSDetailsList.dtls.dtls.addRef(details);

        } else {
          final List<MOLSASMSLogDtls> listDtls = new ArrayList<MOLSASMSLogDtls>();
          for (MOLSASMSLogDtls logDtls : failesSMSDtlsList.dtls) {
            listDtls.add(logDtls);
          }
          Collections.sort(listDtls, new LatestFailedSMSDetailsComparator());

          MOLSASMSLogDtls latestFailedSMSLogDetails = listDtls.get(0);
          if(latestFailedSMSLogDetails.deliveryStatus.equals(COMMUNICATIONSTATUS.FAILED)){
          MOLSAFailedSMSDetails details = new MOLSAFailedSMSDetails();
          ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
          ConcernRoleKey concernRoleKey = new ConcernRoleKey();
          concernRoleKey.concernRoleID = latestFailedSMSLogDetails.concernRoleID;
          String concernRoleID = String.valueOf(latestFailedSMSLogDetails.concernRoleID);
          //Read the Failed Reason from the MOLSASMSErrorCode entity
          codeKeyStruct1.errorCodeID=dtls.errorCode;
		  MOLSASMSErrorCodeDtlsList errorCodeDtlsList = errorCodeObj.listByErrorCodeID(codeKeyStruct1);
		
		if(errorCodeDtlsList.dtls.size()>0){
			MOLSASMSErrorCodeDtls errorCodeDtls = errorCodeDtlsList.dtls.item(0);
			 details.failedReason = CodeTable.getOneItem(MOLSASMSERRORCODEDESC.TABLENAME,errorCodeDtls.errorCode);
		}else{
			 details.failedReason = MOLSASMSSERVICE.SMS_GENERIC_FAILED_REASON.toString();
		}
          details.message = latestFailedSMSLogDetails.messsageText;
          details.smsMessageID = latestFailedSMSLogDetails.messageID;
          details.failureDate = latestFailedSMSLogDetails.createdDateTime;
          details.phoneNumber = getPersonPreferredPhoneNumber(concernRoleID);
          details.participantName = concernRoleObj.readConcernRoleName(concernRoleKey).concernRoleName;
          molsaFailedSMSDetailsList.dtls.dtls.addRef(details);
          }
        }
      }
    }
    return molsaFailedSMSDetailsList;
  }

  /**
   * Resends the message to the list of participants received in the input parameter. 
   * 
   * @param key
   *            Contains a key details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
  public void resendSMS(MOLSASMSLogKey key) throws AppException, InformationalException {
    
    if(key.dtls.smsLogIDTabbedList.length()==0){
      curam.core.sl.infrastructure.impl.ValidationManagerFactory
      .getManager()
      .throwWithLookup(
          new AppException(
              MOLSASMSSERVICE.NO_CONCERNROLE_SELECTED),
          curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
          0);
    }

    SoapUser soapUser = getUserDetails();
    Authenticate authenticate = new Authenticate();
    authenticate.setUser(soapUser);
    String phNumber = "";
    MOLSASMSErrorCodeDtls errorCodeDtls = new MOLSASMSErrorCodeDtls();
    MOLSASMSLogDtls molsasmsLogDtls = new MOLSASMSLogDtls();
    try {
      if (authenticateSoapUser(soapUser)) {
        StringList smsLogIDTabbedList = StringUtil.delimitedText2StringList(key.dtls.smsLogIDTabbedList, CuramConst.gkTabDelimiterChar);
        try {
          MessengerStub messenger = new MessengerStub();
          messenger._getServiceClient().getOptions().setProperty(HTTPConstants.CHUNKED, false);
          SendSms sendSms = null;
          SendResult sendResult1 = null;
          for (String smsLogID : smsLogIDTabbedList) {

            MOLSASMSLog molsasmsLogObj = MOLSASMSLogFactory.newInstance();
            curam.molsa.sms.entity.struct.MOLSASMSLogKey keyLogKey = new curam.molsa.sms.entity.struct.MOLSASMSLogKey();
            keyLogKey.messageID = Long.valueOf(smsLogID);
            MOLSASMSLogDtls logDtls = molsasmsLogObj.read(keyLogKey);

            String concernRoleID = String.valueOf(logDtls.concernRoleID);
            phNumber = getPersonPreferredPhoneNumber(concernRoleID);
            molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.FAILED;
            if (!phNumber.equals("")) {
              sendSms = new SendSms();
              sendSms.setUser(soapUser);
              sendSms.setBlink(false);
              sendSms.setDefDate(CuramConst.gkEmpty);
              sendSms.setFlash(false);
              sendSms.setOriginator(MOLSASMSConstants.kOriginator);
              sendSms.setPrivate(false);
              sendSms.setMessageType(MessageType.ArabicWithArabicNumbers);
              sendSms.setSmsText(logDtls.messsageText);
              sendSms.setRecipientPhone(phNumber);
              SendSmsResponse sendResult = new SendSmsResponse();
              sendResult = messenger.sendSms(sendSms);

              GetSmsStatus smsStatus = new GetSmsStatus();
              smsStatus.setUser(soapUser);
              smsStatus.setTransactionID(sendResult.getSendSmsResult().getTransactionID());
              smsStatus.setDetailed(true);
              GetSmsStatusResponse statusresponse = messenger.getSmsStatus(smsStatus);
              if (!sendResult.getSendSmsResult().getResult().equals("OK")) {
                  //Read the proper error code and update the same in the MOLSASMSLog Entity
                  String errorCode=sendResult.getSendSmsResult().getResult();
                  molsasmsLogDtls.errorCode = errorCode.substring(0, 5);
              }

              if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("SUCCESS")) {
                molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.SUCCESS;
              }

              if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("InProcessNow")) {
                molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.InProcessNow;
              }
              if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("SMSC_DELIVERED")) {
                molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.SMSDELIVERED;
              }

              if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("REJECTED_INVALID_NUMBER")) {
                molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.REJECTED_INVALID_NUMBER;
              }
              if (statusresponse.getGetSmsStatusResult().getDetails().getExtraElement().getFirstElement().getLocalName().equals("FAILED")) {
                molsasmsLogDtls.deliveryStatus = COMMUNICATIONSTATUS.FAILED;
              }

            }else{
                	//If phone number is not present,update the MOLSASMSLog entity with the correct error code.
                	 molsasmsLogDtls.errorCode=MOLSAConstants.kSMSPhoneNumerErrorCode;
            }
            molsasmsLogDtls.concernRoleID = Long.parseLong(concernRoleID);
            molsasmsLogDtls.createdBy = TransactionInfo.getProgramUser();
            molsasmsLogDtls.messageLoggedID = logDtls.messageLoggedID;
            molsasmsLogDtls.messsageText = logDtls.messsageText;
            molsasmsLogDtls.relatedID = logDtls.relatedID;
            //molsasmsLogDtls.errorCode = 12345;
            molsasmsLogDtls.smsCategory=logDtls.smsCategory;
            molsasmsLogDtls.smsTemplate=logDtls.smsTemplate;
            molsasmsLogDtls.createdDateTime = TransactionInfo.getSystemDateTime();
            MOLSASMSLogFactory.newInstance().insert(molsasmsLogDtls);

            RecordedCommKey recordedCommKey = new RecordedCommKey();
            recordedCommKey.communicationID = logDtls.relatedID;
            Communication communication = CommunicationFactory.newInstance();
            RecordedCommDetails1 recordedCommDetails = communication.readRecordedCommunication1(recordedCommKey);
            // Update the communication status.
            if (!recordedCommDetails.communicationStatus.equals(molsasmsLogDtls.deliveryStatus) && !phNumber.equals("")) {
              RecordedCommDetails1 recordedCommDetails1 = recordedCommDetails;
              recordedCommDetails1.communicationStatus = molsasmsLogDtls.deliveryStatus;
              //recordedCommDetails1.phoneNumber = phNumber;
              ConcernRoleKey roleKey = new ConcernRoleKey();
              roleKey.concernRoleID = Long.parseLong(concernRoleID);
              long phNumberID = 0l;
              PhoneNumber retrievedPhNumber = null;
              ConcernRolePhoneNumberDtlsList concernRolePhoneNumberDtlsList = ConcernRolePhoneNumberFactory
                  .newInstance().searchByConcernRole(roleKey);

              for (ConcernRolePhoneNumberDtls concernRolePhoneNumberDtls : concernRolePhoneNumberDtlsList.dtls) {
                retrievedPhNumber = phoneNumberDAO
                    .get(concernRolePhoneNumberDtls.phoneNumberID);
                if(!phNumber.equals("")){
                if (Long.parseLong(phNumber) == Long.parseLong(retrievedPhNumber
                    .getNumber())) {
                  phNumberID = retrievedPhNumber.getID();
                }
                }
              }
              
              
              if(recordedCommDetails1.phoneNumberID != phNumberID){
                SMSCommDetails smsDetails = new SMSCommDetails();
                smsDetails.clientParticipantRoleID = Long.parseLong(concernRoleID);
                smsDetails.phoneNumber = phNumber;
                smsDetails.smsText = logDtls.messsageText;
                smsDetails.correspondentConcernRoleID = Long.parseLong(concernRoleID);
                smsDetails.correspondentConcernRoleType = CONCERNROLETYPE.PERSON;
                smsDetails.correspondentType = CORRESPONDENT.CLIENT;
                smsDetails.communicationStatus = molsasmsLogDtls.deliveryStatus;
                molsasmsLogDtls.relatedID = new MOLSACommunication().createSMSReturningID(smsDetails).communicationID;
              }
              communication.modifyRecordedCommunication1(recordedCommKey, recordedCommDetails1);
            }

          }
        } catch (RemoteException e1) {
          e1.printStackTrace();
        }
      } else {
        final AppException appException = new AppException(MOLSASMSSERVICE.ERR_AUTH_FAILED);
        curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(appException, CuramConst.gkEmpty,
            InformationalElement.InformationalType.kError, curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree, 0);
        return;
      }
    } catch (NumberFormatException e) {
    } catch (DatabaseException e) {
    } catch (RemoteException e) {
    } catch (AppRuntimeException e) {
    }

  }

  /**
   * 
   * Compares the SMS log details based on the date.
   *
   */
  
  static class LatestFailedSMSDetailsComparator implements Comparator<MOLSASMSLogDtls>, Serializable {

    private static final long serialVersionUID = 1L;

    @Override
    public int compare(MOLSASMSLogDtls o1, MOLSASMSLogDtls o2) {
      // TODO Auto-generated method stub
      return o2.createdDateTime.compareTo(o1.createdDateTime);
    }
  }

  /**
  * Gets the message text based on the SMS Template and SMS category. 
  * 
  * @param key
  *            Contains a key details.
  *            
  * @return MOLSAMessageText
  *          Description of the SMS Message Text.
  * 
  * @throws AppException
  *             Generic Exception Signature.
  * 
  * @throws InformationalException
  *             Generic Exception Signature.
  */
  public MOLSAMessageText getSMSMessageText(MOLSAMessageTextKey key) throws AppException, InformationalException {
    MOLSAMessageText messageText = new MOLSAMessageText();
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append(key.dtls.category);
    stringBuffer.append(".");
    stringBuffer.append(key.dtls.template);
    if(TransactionInfo.getProgramLocale().equals(MOLSAConstants.kAR))
    	messageText.dtls.smsMessageText = PropertiesResourceCache.getInstance().getProperty(MOLSAConstants.kCategoryandTemplatePropertyFileArabic, stringBuffer.toString());
    else
    	messageText.dtls.smsMessageText = PropertiesResourceCache.getInstance().getProperty(MOLSAConstants.kCategoryandTemplatePropertyFile, stringBuffer.toString());
    return messageText;
  }

  /**
   * Sends the message to the list of participants received in the input parameter in deferred process mode. 
   * 
   * @param key
   *            Contains a key details.
   * 
   * @throws AppException
   *             Generic Exception Signature.
   * 
   * @throws InformationalException
   *             Generic Exception Signature.
   */
  
public void sendSMSDPMode(MOLSAConcernRoleListAndMessageTextDetails key)
		throws AppException, InformationalException {
	sendSMS(key);
}

/**
 * Resends the message to the list of participants received in the input parameter in the deferred process mode. 
 * 
 * @param key
 *            Contains a key details.
 * 
 * @throws AppException
 *             Generic Exception Signature.
 * 
 * @throws InformationalException
 *             Generic Exception Signature.
 */
public void resendSMSDPMode(MOLSASMSLogKey key) throws AppException,
		InformationalException {
	resendSMS(key);
}

/**
 * Generates part of a where clause which combines a number of product type codes.
 *
 * @param statusCodesString A tab delimited list of product type codes.
 *
 * @return Part of a WHERE clause specifying one or more product type codes.
 */
private String getCaseTypeCodesClause(final String caseTypeCodesString) {

  final StringList statusList = StringUtil.tabText2StringListWithTrim(
		  caseTypeCodesString);

  final String result;

  if (statusList.size() == 0) {
    result = "";
  } else if (statusList.size() < 2) {
    result = " productdelivery.producttype = :caseType ";
  } else {
    final StringBuffer resultBuf = new StringBuffer(
      " (productdelivery.producttype = :caseType");

    for (int i = 1; i < statusList.size(); i++) {
      resultBuf.append(" OR productdelivery.producttype = '");
      resultBuf.append(statusList.item(i));
      resultBuf.append("'");
    }
    resultBuf.append(" ) ");
    result = resultBuf.toString();
  }

  return result;
}
}