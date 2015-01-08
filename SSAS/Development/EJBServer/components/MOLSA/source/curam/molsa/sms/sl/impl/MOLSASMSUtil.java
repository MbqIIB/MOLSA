package curam.molsa.sms.sl.impl;

import java.rmi.RemoteException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.axis2.transport.http.HTTPConstants;

import com.pmmsoapmessenger.MessengerStub;
import com.pmmsoapmessenger.MessengerStub.Authenticate;
import com.pmmsoapmessenger.MessengerStub.AuthenticateResponse;
import com.pmmsoapmessenger.MessengerStub.MessageType;
import com.pmmsoapmessenger.MessengerStub.SendResult;
import com.pmmsoapmessenger.MessengerStub.SendSms;
import com.pmmsoapmessenger.MessengerStub.SendSmsResponse;
import com.pmmsoapmessenger.MessengerStub.SoapUser;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.fact.AddressFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.Address;
import curam.core.intf.ConcernRole;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EDPartIDEvTypeIdx;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.SQLStatement;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressKey;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.OtherAddressData;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.message.GENERAL;
import curam.message.GENERALSEARCH;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.sms.entity.fact.MOLSASMSErrorCodeFactory;
import curam.molsa.sms.entity.fact.MOLSASMSLogFactory;
import curam.molsa.sms.entity.struct.MOLSASMSErrorCodeDtls;
import curam.molsa.sms.entity.struct.MOLSASMSLogDtls;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetails;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetails;
import curam.molsa.sms.sl.struct.MOLSAAdditionalBenefitDetailsList;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.sl.struct.SMSCommDetails;
import curam.molsa.util.impl.MOLSASMSExportParticipantToExcel;
import curam.pdc.fact.PDCUtilFactory;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.DatabaseException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.exception.ReadmultiMaxException;
import curam.util.resources.Configuration;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.StringList;

public class MOLSASMSUtil extends curam.molsa.sms.sl.base.MOLSASMSUtil {

  @Override
  public void logSMSException() throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }

  @Override
  public void validateParticipantMobile() throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }

  @Override
  public void sendSMS(MOLSAConcernRoleListAndMessageTextDetails key)
      throws AppException, InformationalException {

    SoapUser soapUser = getUserDetails();
    Authenticate authenticate = new Authenticate();
    authenticate.setUser(soapUser);
    String phNumber = "";
    MOLSASMSErrorCodeDtls errorCodeDtls = new MOLSASMSErrorCodeDtls();
    MOLSASMSLogDtls molsasmsLogDtls = new MOLSASMSLogDtls();
    try {
      if(authenticateSoapUser(soapUser)){
        StringList concernRoleIDList = StringUtil.delimitedText2StringList(
            key.dtls.concernRoleTabbedList, CuramConst.gkTabDelimiterChar);
        try {
          MessengerStub messenger = new MessengerStub();
          messenger._getServiceClient().getOptions()
              .setProperty(HTTPConstants.CHUNKED, false);
          SendSms sendSms = null;
          SendResult sendResult1 = null;
          for (String concernRoleID : concernRoleIDList) {
                phNumber = getPersonPreferredPhoneNumber(concernRoleID);
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
                sendResult1 = new SendResult();
                //messenger.sendSms(sendSms);
              sendResult1.setResult("OK");
              SendSmsResponse sendResult = new SendSmsResponse();
              sendResult.setSendSmsResult(sendResult1);
              // sendResult.set
              if (!sendResult.getSendSmsResult().getResult().equals("OK")) {
                errorCodeDtls.errorCodeID = 1123456;
                errorCodeDtls.errorCode = 1l;
                errorCodeDtls.description = "Failure";
                MOLSASMSErrorCodeFactory.newInstance().insert(
                    errorCodeDtls);
              }
              molsasmsLogDtls.concernRoleID = Long
                  .parseLong(concernRoleID);
              molsasmsLogDtls.createdBy = TransactionInfo
                  .getProgramUser();
              molsasmsLogDtls.failureCount = 1;
              molsasmsLogDtls.messsageText = key.dtls.smsMessageText;
              molsasmsLogDtls.relatedID = 1l;

              molsasmsLogDtls.errorCode = 12345;
              molsasmsLogDtls.createdDateTime = Date.getCurrentDate()
                  .getDateTime();
              molsasmsLogDtls.deliveryStatus = "OK";
              molsasmsLogDtls.versionNo = 1;
              MOLSASMSLogFactory.newInstance().insert(molsasmsLogDtls);
              // Insert Communication
              SMSCommDetails smsDetails = new SMSCommDetails();
              smsDetails.clientParticipantRoleID = Long
                  .parseLong(concernRoleID);
              smsDetails.phoneNumber = phNumber;
              smsDetails.smsText = key.dtls.smsMessageText;
              smsDetails.correspondentParticipantRoleID = Long
              .parseLong(concernRoleID);
              
              // TODO Harisha to uncomment the below line
              //smsDetails.caseID = key.dtls.caseID;
              smsDetails.subject = CodeTable.getOneItem(
                  MOLSASMSMessageType.TABLENAME, CodeTable
                      .getParentCode(
                          MOLSASMSMESSAGETEMPLATE.TABLENAME,
                          key.dtls.smsMessageType));
              new MOLSACommunication().createSMSReturningID(smsDetails);

          }
        } catch (RemoteException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
        }
      }
      else{
        final AppException appException = new AppException(
            MOLSASMSSERVICE.ERR_AUTH_FAILED);
        curam.core.sl.infrastructure.impl.ValidationManagerFactory
            .getManager()
            .addInfoMgrExceptionWithLookup(
                appException,
                CuramConst.gkEmpty,
                InformationalElement.InformationalType.kError,
                curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
                0);
        return;
      }
    } catch (NumberFormatException e) {
    } catch (DatabaseException e) {
    } catch (RemoteException e) {
    } catch (AppRuntimeException e) {
    }
    

  }

  public String getPersonPreferredPhoneNumber(String concernRoleID)
      throws AppException, InformationalException {
    String phNumber = "";
    ConcernRoleKey concernRoleKey = new ConcernRoleKey();
    concernRoleKey.concernRoleID = Long.parseLong(concernRoleID);
    long caseID = PDCUtilFactory.newInstance()
        .getPDCCaseIDCaseParticipantRoleID(concernRoleKey).caseID;

    final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

    caseIDStatusAndEvidenceTypeKey.caseID = caseID;
    caseIDStatusAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;
    caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

    final curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
        .newInstance();

    ReadEvidenceDetails evidenceDetails = new ReadEvidenceDetails();
    RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
        .searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

    final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
    curam.core.sl.struct.EvidenceTypeKey evidenceTypeKey = new curam.core.sl.struct.EvidenceTypeKey();
    evidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;

    EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
        .instance(evidenceTypeKey, Date.getCurrentDate());
    DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
    String countryCode = "";
    for (RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

      evidenceCaseKey.caseIDKey.caseID = caseID;
      evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
      evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
      evidenceDetails = evidenceServiceInterface
          .readEvidence(evidenceCaseKey);
      dynamicEvidenceDataDetails = evidenceDetails.dtls;
      countryCode = dynamicEvidenceDataDetails.getAttribute(
          "phoneCountryCode").getValue();
      phNumber = dynamicEvidenceDataDetails.getAttribute("phoneNumber")
          .getValue();
      if (Boolean.parseBoolean(dynamicEvidenceDataDetails.getAttribute(
          "preferredInd").getValue())) {
        return countryCode + phNumber;
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
    soapUser.setName(MOLSASMSConstants.kUserName);
    soapUser.setPassword(MOLSASMSConstants.kPassword);
    return soapUser;

  }

  public void validateMobile(String recipientPhone)
      throws InformationalException {

    if (recipientPhone.trim().length() != 10) {
      final AppException appException = new AppException(
          MOLSASMSSERVICE.ERR_AUTH_FAILED);
      curam.core.sl.infrastructure.impl.ValidationManagerFactory
          .getManager()
          .addInfoMgrExceptionWithLookup(
              appException,
              CuramConst.gkEmpty,
              InformationalElement.InformationalType.kError,
              curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
              0);
      return;
    }

  }

  private Boolean authenticateSoapUser(SoapUser user) throws RemoteException {
    SoapUser soapUser = getUserDetails();
    Authenticate authenticate = new Authenticate();
    authenticate.setUser(soapUser);
    String phNumber = "";
    MessengerStub messenger = new MessengerStub();
    messenger._getServiceClient().getOptions()
        .setProperty(HTTPConstants.CHUNKED, false);
    try {

      AuthenticateResponse authResult = new AuthenticateResponse();
      authResult = messenger.authenticate(authenticate);
      if (authResult.getAuthenticateResult().getResult().equals("OK")) {
        return true;
      }
    } catch (RemoteException exception) {
    }
    return false;
  }

  @Override
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

  protected void validateSearchCriteria(MOLSAParticipantFilterCriteriaDetails key) throws AppException {

    if (!(key.dtls.hasIncome) && !(key.dtls.isIncludeHouseHoldMembers) && (key.dtls.age == CuramConst.gkZero) && (key.dtls.caseStatus.length() == CuramConst.gkZero)
        && (key.dtls.caseType.length() == CuramConst.gkZero) && (key.dtls.educationLevel.length() == CuramConst.gkZero) && (key.dtls.gender.length() == CuramConst.gkZero)
        && (key.dtls.muncipality.length() == CuramConst.gkZero) && (key.dtls.incomeFromDate.isZero()) && (key.dtls.incomeToDate.isZero())) {

      ValidationManagerFactory.getManager().throwWithLookup(new AppException(GENERALSEARCH.ERR_FV_SEARCH_CRITERIA_MISSING), "a", 0);

    }

  }

  protected SQLStatement formatSQL(curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails dtls) throws AppException, InformationalException {
    SQLStatement sqlStatement = new SQLStatement();
    StringBuffer selectStrBuf = new StringBuffer();
    StringBuffer intoStrBuf = new StringBuffer();
    StringBuffer fromStrBuf = new StringBuffer();
    StringBuffer whereStrBuf = new StringBuffer();

    selectStrBuf.append("SELECT Distinct concernrole.primaryalternateid,concernrole.concernroleID,concernrole.concernRoleName, ");
    selectStrBuf.append("concernrole.primaryAddressID, person.dateofBirth ");

    intoStrBuf.append("INTO :qid ");
    intoStrBuf.append(":concernroleID ");
    intoStrBuf.append(":participantName ");
    intoStrBuf.append(":addressString ");
    intoStrBuf.append(":dateOfBirth ");

    fromStrBuf.append("FROM concernrole, person, caseheader, caseparticipantrole, productdelivery ");

    whereStrBuf.append("WHERE ");

    if (dtls.caseType.length() > CuramConst.gkZero) {
      whereStrBuf.append("productdelivery.producttype= :caseType AND ");
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

      whereStrBuf.append("person.dateofbirth <= :caluclatedDateFromAge AND ");
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
      fromStrBuf.append(", evidencetypedef as evddef, evidencedescriptor as evddes, dynamicevidencedataattribute, dynamicevidencedata ");
      whereStrBuf.append("evddef.evidencetypecode='DET0000517' AND ");
      whereStrBuf.append("dynamicevidencedataattribute.value= :educationLevel AND ");
      whereStrBuf.append("evddef.evidencetypecode=evddes.evidencetype AND ");
      whereStrBuf.append("evddes.participantid=concernrole.concernroleID AND ");
      whereStrBuf.append("evddes.statuscode in ('EDS1','EDS2','EDS3','EDS2001','EDS2007') AND ");
    }

    if (dtls.isIncludeHouseHoldMembers) {
      fromStrBuf.append(", evidencetypedef as edef, evidencedescriptor as edesc ");
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
      fromStrBuf.append(", instructionlineitem as ilitem ");
      whereStrBuf.append("ilitem.coverperiodfrom <= :incomeToDate AND ");
      whereStrBuf.append("ilitem.concernroleid=concernrole.concernroleid AND ");
      whereStrBuf.append("ilitem.statuscode in ('ALL', 'REC', 'PRO', 'REV', 'TRF') AND ");
      whereStrBuf.append("ilitem.creditdebittype in ('CDT') AND ");
    }

    whereStrBuf.append("person.concernroleID=concernrole.concernroleID AND ");
    whereStrBuf.append("caseparticipantrole.participantroleID=concernrole.concernroleID ");
    whereStrBuf.append("Group By concernrole.concernroleID");

    sqlStatement.sqlStatement = selectStrBuf.toString() + intoStrBuf.toString() + fromStrBuf.toString() + whereStrBuf.toString();
    return sqlStatement;

  }

  @Override
  public MOLSAAdditionalBenefitDetailsList listParticipantAdditionalBenefits(curam.citizenaccount.facade.struct.ConcernRoleKey key) throws AppException, InformationalException {

    final String KAmount = "amount";
    final String KDate = "date";

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

      additionalBenefitDetails.amount = amount + " " + Configuration.getProperty("curam.financial.basecurrency");

      SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
      java.util.Date receivedDate1 = new java.util.Date();
      try {
        receivedDate1 = formatter.parse(receivedDate);
      } catch (ParseException e) {
        //e.printStackTrace();
      }
      additionalBenefitDetails.receivedDate = curam.util.type.Date.getFromJavaUtilDate(receivedDate1);

      additionalBenefitDetailsList.dtls.dtls.addRef(additionalBenefitDetails);

    }

    return additionalBenefitDetailsList;
  }

  @Override
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
      curamValueList = DynamicDataAccess.executeNsMulti(MOLSAParticipantDetails.class, concernRoleKey, false, true, 
          getParticipantDetailsQuery(concernRoleKey).sqlStatement);

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

}
