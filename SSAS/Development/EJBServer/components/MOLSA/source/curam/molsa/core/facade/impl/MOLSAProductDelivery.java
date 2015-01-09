package curam.molsa.core.facade.impl;

import curam.core.facade.struct.CreateCertificationDetails;
import curam.core.facade.struct.InformationMsgDtlsList;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.impl.CuramConst;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.struct.InformationalMsgDtls;
import curam.core.struct.ProductDeliveryApprovalKey1;
import curam.message.MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY;
import curam.molsa.core.sl.fact.MOLSAMaintainProductDeliveryFactory;
import curam.molsa.core.sl.intf.MOLSAMaintainProductDelivery;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.verification.sl.infrastructure.fact.VerificationFactory;

/**
 * Facade class used to perform the operations related to MOLSA Product delivery approval
 * process.
 */
public abstract class MOLSAProductDelivery extends curam.molsa.core.facade.base.MOLSAProductDelivery {

  /**
   * Submits the product delivery case for approval.
   * 
   * @param submitForApprovalKey
   *          Contains a case identifier.
   * 
   * @throws AppException
   *           Generic Exception Signature.
   * 
   * @throws InformationalException
   *           Generic Exception Signature.
   */

  public void submitPDCForApproval(SubmitForApprovalKey submitForApprovalKey) throws AppException, InformationalException {

    curam.core.struct.SubmitForApprovalKey submitForApprovalKeyStruct = new curam.core.struct.SubmitForApprovalKey();
    submitForApprovalKeyStruct.caseID = submitForApprovalKey.caseID;
    MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory.newInstance();
    productDeliveryFactoryObj.submitPDCForApproval(submitForApprovalKeyStruct);
  }

  @Override
public InformationMsgDtlsList createCertification(
		CreateCertificationDetails details) throws AppException,
		InformationalException {
	    // create return object.
	    final InformationMsgDtlsList informationMsgDtlsList = new InformationMsgDtlsList();

	    // MaintainCertification manipulation variables
	    final curam.core.intf.MaintainCertification maintainCertificationObj = curam.core.fact.MaintainCertificationFactory.newInstance();
	    final curam.core.struct.MaintainCertificationDetails maintainCertificationDetails = new curam.core.struct.MaintainCertificationDetails();

	    // Assign certification details
	    maintainCertificationDetails.assign(details);

	    // Call MaintainCertification BPO to create the certification
	    maintainCertificationObj.createCertification(maintainCertificationDetails);

	    final curam.util.exception.InformationalManager informationalManager = curam.util.transaction.TransactionInfo.getInformationalManager();

	    final String[] warnings = informationalManager.obtainInformationalAsString();

	    for (int i = 0; i < warnings.length; i++) {

	      final InformationalMsgDtls informationalMsgDtls = new InformationalMsgDtls();

	      informationalMsgDtls.informationMsgTxt = warnings[i];
	      informationMsgDtlsList.informationalMsgDtlsList.dtls.addRef(
	        informationalMsgDtls);
	    }

	    // return all informational messages
	    return informationMsgDtlsList;
}

/**
   * Rejects the task which was generated as part of the product delivery case
   * for approval.
   * 
   * @param submitForApprovalKey
   *          Contains a case identifier.
   * 
   * @throws AppException
   *           Generic Exception Signature.
   * 
   * @throws InformationalException
   *           Generic Exception Signature.
   */

  public void rejectPDCApprovalTask(SubmitForApprovalKey submitForApprovalKey) throws AppException, InformationalException {
    curam.core.struct.SubmitForApprovalKey submitForApprovalKeyStruct = new curam.core.struct.SubmitForApprovalKey();
    submitForApprovalKeyStruct.caseID = submitForApprovalKey.caseID;
    MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory.newInstance();
    productDeliveryFactoryObj.rejectPDCApprovalTask(submitForApprovalKeyStruct);

  }

  /**
   * Approve the product delivery case which was submitted for approval.
   * 
   * @param submitForApprovalKey
   *          Contains a case identifier.
   * 
   * @throws AppException
   *           Generic Exception Signature.
   * 
   * @throws InformationalException
   *           Generic Exception Signature.
   */

  public void approve(SubmitForApprovalKey submitForApprovalKey) throws AppException, InformationalException {
    
    
    MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory.newInstance();
    ProductDeliveryApprovalKey1 key=new ProductDeliveryApprovalKey1();
    key.caseID=submitForApprovalKey.caseID;
    CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
    caseKeyStruct.caseID = submitForApprovalKey.caseID;
    if(VerificationFactory.newInstance()
        .listPDOutstandingCaseVerificationDetails(caseKeyStruct).dtls.size() > 0){
    	final AppException appException = new AppException(
				MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_PROGRAM_RECOMMENDATION_XRV_NO_HEAD_OF_HOUSEHOLD);
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
    productDeliveryFactoryObj.approve(key);
  }

}
