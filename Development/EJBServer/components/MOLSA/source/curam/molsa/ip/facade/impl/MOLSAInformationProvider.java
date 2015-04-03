package curam.molsa.ip.facade.impl;

import com.google.inject.Inject;

import curam.application.impl.ApplicationDAO;
import curam.core.struct.CaseSearchKey;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKey;
import curam.molsa.ip.facade.struct.MOLSAApplicationCaseID;
import curam.molsa.ip.facade.struct.MOLSARequestDetailsList;
import curam.molsa.ip.sl.fact.MOLSAMaintainInformationProviderFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;

/**
 * This class will maintain request and response of Information Provider.
 * 
 */

public abstract class MOLSAInformationProvider extends curam.molsa.ip.facade.base.MOLSAInformationProvider {

  /* The Application DAO. */
  @Inject
  private ApplicationDAO applicationDAO;
  
  /**
   * Constructor.
   */
  public MOLSAInformationProvider() {
    super();
    GuiceWrapper.getInjector().injectMembers(this);
  }

  /**
   * This Method gets case ID from application ID.
   * 
   * @param applicationID
   *          MOLSAApplicationCaseID
   * @return MOLSAApplicationCaseID
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public MOLSAApplicationCaseID getCaseIDFromApplicationID(MOLSAApplicationCaseID applicationID) throws AppException, InformationalException {
    MOLSAApplicationCaseID caseID = new MOLSAApplicationCaseID();
    caseID.applicationCaseID =  applicationDAO.get(applicationID.applicationCaseID).getCase().getID();
    return caseID;
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

    MOLSARequestDetailsList requestDetailsList = new MOLSARequestDetailsList();

    // call the service layer method to get list of information request from InformationRequest entity
    requestDetailsList = MOLSAMaintainInformationProviderFactory.newInstance().listInformationRequest(caseID);
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

    // call the service layer method to insert new request record into InformationRequest entity
    MOLSAInformationRequestKey requestKey = MOLSAMaintainInformationProviderFactory.newInstance().createInformationRequest(requestDetails);
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
  public MOLSAInformationResponseKey createInformationResponse(MOLSAInformationResponseDtls responseDtls) throws AppException, InformationalException {

    // call the service layer method to create information response
    MOLSAInformationResponseKey responseKey = MOLSAMaintainInformationProviderFactory.newInstance().createInformationResponse(responseDtls);
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

    // call the service layer method to get list of information responses.
    MOLSAInformationResponseDtlsList responseDtlsList = MOLSAMaintainInformationProviderFactory.newInstance().listInformationResponse(requestID);
    return responseDtlsList;

  }

}
