package curam.molsa.ip.sl.impl;

import com.google.inject.Inject;

import curam.application.impl.ApplicationDAO;
import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.intf.IntegratedCase;
import curam.core.facade.struct.ListMemberDetails;
import curam.core.facade.struct.ListMemberDetailsKey;
import curam.core.facade.struct.MemberDetails;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.CaseSearchKey;
import curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH;
import curam.molsa.codetable.MOLSAINFORMATIONPROVIDER;
import curam.molsa.codetable.MOLSAINFORMATIONTYPE;
import curam.molsa.codetable.MOLSAREQUESTSTATUS;
import curam.molsa.ip.entity.fact.MOLSAInformationRequestFactory;
import curam.molsa.ip.entity.fact.MOLSAInformationResponseFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationRequest;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKey;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKeyStruct1;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKeyStruct1;
import curam.molsa.ip.entity.struct.MOLSARequestIDAndStatus;
import curam.molsa.ip.facade.struct.MOLSARequestDetails;
import curam.molsa.ip.facade.struct.MOLSARequestDetailsList;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;


/**
 * This class will maintain request and response of Information Provider.
 * 
 */
public abstract class MOLSAMaintainInformationProvider extends curam.molsa.ip.sl.base.MOLSAMaintainInformationProvider {

 
  /* The Application DAO. */
  @Inject
  private ApplicationDAO applicationDAO;
  
  /**
   * Constructor.
   */
  public MOLSAMaintainInformationProvider() {
    super();
    GuiceWrapper.getInjector().injectMembers(this);
  }

  
  /**
   * This Method retrieves list of Information Request.
   * 
   * @param caseID
   *          CaseSearchKey
   * @return list of request
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public MOLSARequestDetailsList listInformationRequest(CaseSearchKey caseID) throws AppException, InformationalException {

    try{
      caseID.caseID =  applicationDAO.get(caseID.caseID).getCase().getID();
    }
    catch(Exception e){
     e.printStackTrace();
    }
    // get all the case participants record associated with this case ID.
    IntegratedCase integratedCase = IntegratedCaseFactory.newInstance();
    ListMemberDetailsKey detailsKey = new ListMemberDetailsKey();
    detailsKey.caseID =  caseID.caseID;
    ListMemberDetails memberDetails = integratedCase.listCaseParticipantsDetails(detailsKey);

    // loop through the participants record to get list of requests for each participant
    MOLSARequestDetailsList requestDetailsList = new MOLSARequestDetailsList();
    for (MemberDetails details : memberDetails.memberDetailsList.dtls.items()) {
      MOLSAInformationRequestKeyStruct1 key = new MOLSAInformationRequestKeyStruct1();
      key.caseParticipantRoleID = details.caseParticipantRoleID;
      MOLSAInformationRequestDtlsList requestDtlsList = MOLSAInformationRequestFactory.newInstance().listResquestByCaseParticipantRoleID(key);

      // loop through the request to add case member name and request details

      for (MOLSAInformationRequestDtls requestDtls : requestDtlsList.dtls.items()) {
        MOLSARequestDetails requestDetails = new MOLSARequestDetails();
        requestDetails.caseMemberName = details.name;
        requestDetails.dtls.assign(requestDtls);
        requestDetailsList.dtls.add(requestDetails);
      }
    }
    return requestDetailsList;
  }

  /**
   * This Method creates new information request.
   * 
   * @param requestDetails
   *          MOLSAInformationRequestDtls
   * @return MOLSAInformationRequestKey
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public MOLSAInformationRequestKey createInformationRequest(MOLSAInformationRequestDtls requestDetails) throws AppException, InformationalException {

    // inset the record into request entity and return back the requestID
    requestDetails.requestStatus = MOLSAREQUESTSTATUS.REQUESTED;
    requestDetails.informationProvider = CodeTable.getParentCode(MOLSAINFORMATIONTYPE.TABLENAME, requestDetails.informationType);
    if ((!requestDetails.startDate.equals(Date.kZeroDate) || !requestDetails.endDate.equals(Date.kZeroDate)) && !requestDetails.informationProvider.equals(MOLSAINFORMATIONPROVIDER.MOI)) {
      AppException e = new AppException(BPOMOLSAINFORMATIONPROVIDERBATCH.START_DATE_END_DATE_NOT_APPLICABLE);
      throw e;
    }
    if (requestDetails.informationProvider.equals(MOLSAINFORMATIONPROVIDER.MOI)){
      if (requestDetails.startDate.equals(Date.kZeroDate)){
        requestDetails.startDate = Date.getCurrentDate();
      }
      if (requestDetails.endDate.equals(Date.kZeroDate)){
        requestDetails.endDate = Date.getCurrentDate();
      }
      if(requestDetails.endDate.before(requestDetails.startDate)){
        AppException e = new AppException(BPOMOLSAINFORMATIONPROVIDERBATCH.END_DATE_BEFORE_START_DATE);
        throw e;
      }   
    }
	
    requestDetails.requestDate = Date.getCurrentDate();
    //code to set the QID value
    CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
        .newInstance();
    CaseParticipantRoleKey paramCaseParticipantRoleKey = new CaseParticipantRoleKey();
    paramCaseParticipantRoleKey.caseParticipantRoleID = requestDetails.caseParticipantRoleID;
    ParticipantRoleIDAndNameDetails idAndNameDetails = caseParticipantRole
        .readParticipantRoleIDAndParticpantName(paramCaseParticipantRoleKey);
    MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
    AlternateIDRMDtls alternateIDRMDtls = molsaParticipantHelper
        .returnPreferredConcernRoleAlternateID(idAndNameDetails.participantRoleID);
    requestDetails.qid = alternateIDRMDtls.alternateID;
    requestDetails.createdBy=TransactionInfo.getProgramUser();
    MOLSAInformationRequestFactory.newInstance().insert(requestDetails);
    MOLSAInformationRequestKey requestKey = new MOLSAInformationRequestKey();
    requestKey.informationRequestID = requestDetails.informationRequestID;
    return requestKey;
  }

  /**
   * This Method creates new information response.
   * 
   * @param responseDtls
   *          MOLSAInformationResponseDtls
   * @return MOLSAInformationResponseKey
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public MOLSAInformationResponseKey createInformationResponse(MOLSAInformationResponseDtls responseDetails) throws AppException, InformationalException {

    // insert the record into response entity and return the resposeID
    MOLSAInformationRequest informationRequest = MOLSAInformationRequestFactory.newInstance();
    MOLSAInformationRequestKey requestKey = new MOLSAInformationRequestKey();
    requestKey.informationRequestID = responseDetails.informationRequestID;
    MOLSAInformationRequestDtls requestDtls = informationRequest.read(requestKey);

    if (requestDtls.requestStatus.equalsIgnoreCase(MOLSAREQUESTSTATUS.COMPLETED)) {
      AppException e = new AppException(BPOMOLSAINFORMATIONPROVIDERBATCH.REQUEST_STATUS_ALREADY_COMPPLETED);
      throw e;
    }
    responseDetails.createdBy = TransactionInfo.getProgramUser();
    MOLSAInformationResponseFactory.newInstance().insert(responseDetails);
    // modify the request status to completed
    MOLSARequestIDAndStatus requestIDAndStatus = new MOLSARequestIDAndStatus();
    requestIDAndStatus.informationRequestID = responseDetails.informationRequestID;
    requestIDAndStatus.requestStatus = MOLSAREQUESTSTATUS.COMPLETED;
    MOLSAInformationRequestFactory.newInstance().modifyRequestStatus(requestIDAndStatus);
    MOLSAInformationResponseKey responseKey = new MOLSAInformationResponseKey();
    responseKey.informationResponseID = responseDetails.informationResponseID;
    return responseKey;

  }

  /**
   * This Method retrieves list of Information Response.
   * 
   * @param requestID
   *          MOLSAInformationRequestKey
   * @return list of response
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public MOLSAInformationResponseDtlsList listInformationResponse(MOLSAInformationRequestKey requestID) throws AppException, InformationalException {

    // get list of response records based on requestID.
    MOLSAInformationResponseKeyStruct1 requestKey = new MOLSAInformationResponseKeyStruct1();
    requestKey.informationRequestID = requestID.informationRequestID;
    MOLSAInformationResponseDtlsList responseDtlsList = MOLSAInformationResponseFactory.newInstance().listResponseByRequestID(requestKey);
    return responseDtlsList;
  }

}
