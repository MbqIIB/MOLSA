package curam.molsa.ip.sl.impl;

import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.intf.IntegratedCase;
import curam.core.facade.struct.ListICClientKey;
import curam.core.facade.struct.ListICClientRoleDetails1;
import curam.core.sl.entity.struct.CaseParticipantRole_eoFullDetails;
import curam.core.struct.CaseSearchKey;
import curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH;
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
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.CodeTable;
import curam.util.type.Date;

/**
 * This class will maintain request and response of Information Provider.
 * 
 */
public abstract class MOLSAMaintainInformationProvider extends curam.molsa.ip.sl.base.MOLSAMaintainInformationProvider {

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

    // get all the case participants record associated with this case ID.
    IntegratedCase integratedCase = IntegratedCaseFactory.newInstance();
    ListICClientKey paramListICClientKey = new ListICClientKey();
    paramListICClientKey.caseID = caseID.caseID;
    ListICClientRoleDetails1 listICDetails = integratedCase.listCaseMembers1(paramListICClientKey);

    // loop through the participants record to get list of requests for each participant
    MOLSARequestDetailsList requestDetailsList = new MOLSARequestDetailsList();
    for (CaseParticipantRole_eoFullDetails caseParticipantRole : listICDetails.participantList.items()) {
      MOLSAInformationRequestKeyStruct1 key = new MOLSAInformationRequestKeyStruct1();
      key.caseParticipantRoleID = caseParticipantRole.caseParticipantRoleID;
      MOLSAInformationRequestDtlsList requestDtlsList = MOLSAInformationRequestFactory.newInstance().listResquestByCaseParticipantRoleID(key);

      // loop through the request to add case member name and request details

      for (MOLSAInformationRequestDtls requestDtls : requestDtlsList.dtls.items()) {
        MOLSARequestDetails requestDetails = new MOLSARequestDetails();
        requestDetails.caseMemberName = caseParticipantRole.name;
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
    if ((!requestDetails.startDate.equals(Date.kZeroDate) || !requestDetails.endDate.equals(Date.kZeroDate)) && !requestDetails.informationType.equals(MOLSAINFORMATIONTYPE.INOUT)) {
      AppException e = new AppException(BPOMOLSAINFORMATIONPROVIDERBATCH.START_DATE_END_DATE_NOT_APPLICABLE);
      throw e;
    }

    requestDetails.informationProvider = CodeTable.getParentCode(MOLSAINFORMATIONTYPE.TABLENAME, requestDetails.informationType);

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
