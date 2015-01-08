package curam.molsa.core.facade.impl;

import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.struct.ProductDeliveryApprovalKey1;
import curam.molsa.core.sl.fact.MOLSAMaintainProductDeliveryFactory;
import curam.molsa.core.sl.intf.MOLSAMaintainProductDelivery;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

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
    productDeliveryFactoryObj.approve(key);
  }

}
