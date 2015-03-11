package curam.molsa.core.facade.impl;

import curam.codetable.CASETYPECODE;
import curam.core.facade.struct.CreateCaseAttachmentDetails;
import curam.core.facade.struct.ModifyCaseAttachmentDetails;
import curam.core.facade.struct.ReadAttachmentDetails;
import curam.core.facade.struct.ReadAttachmentKey;
import curam.core.fact.CaseHeaderFactory;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseTypeCode;
import curam.molsa.core.fact.MOLSAMaintainAttachmentDAFactory;
import curam.molsa.core.intf.MOLSAMaintainAttachmentDA;
import curam.serviceplans.facade.fact.ServicePlanDeliveryFactory;
import curam.serviceplans.facade.intf.ServicePlanDelivery;
import curam.serviceplans.facade.struct.ServicePlanSecurityKey;
import curam.serviceplans.sl.impl.ServicePlanSecurityImplementationFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * Overridden from OOTB class - Case.
 * Overridden for integration with ArabDox.
 *
 */
public class MOLSACaseDA extends curam.molsa.core.facade.base.MOLSACaseDA{



  /**
   * Overridden to Calls the new Service layer.
   *
   * 
   * @param key ReadAttachmentKey
   * @return ReadAttachmentDetails.
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public ReadAttachmentDetails readAttachment(ReadAttachmentKey key) throws AppException, InformationalException {
    ReadAttachmentDetails readAttachmentDetails = new ReadAttachmentDetails();
    MOLSAMaintainAttachmentDA maintainAttachmentObj = MOLSAMaintainAttachmentDAFactory.newInstance();
    readAttachmentDetails.readAttachmentOut = maintainAttachmentObj.readAttachment(key.readAttachmentIn);
    return readAttachmentDetails;
  }

  /**
   * Overridden to Calls the new Service layer.
   *
   * 
   * @param details ModifyCaseAttachmentDetails
   * @return void.
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public void modifyCaseAttachment(ModifyCaseAttachmentDetails details) throws AppException, InformationalException {
    MOLSAMaintainAttachmentDA maintainAttachmentObj = MOLSAMaintainAttachmentDAFactory.newInstance();
    curam.core.intf.CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
    CaseKey caseKey = new CaseKey();
    caseKey.caseID = details.modifyAttachmentDetails.caseID;
    CaseTypeCode caseTypeCode = caseHeaderObj.readCaseTypeCode(caseKey);
    if(caseTypeCode.caseTypeCode.equals(CASETYPECODE.SERVICEPLAN))
    {
        ServicePlanDelivery servicePlanDeliveryObj = ServicePlanDeliveryFactory.newInstance();
        ServicePlanSecurityKey servicePlanSecurityKey = new ServicePlanSecurityKey();
        ServicePlanSecurityImplementationFactory.register();
        servicePlanSecurityKey.caseID = caseKey.caseID;
        servicePlanSecurityKey.securityCheckType = 4;
        servicePlanDeliveryObj.checkSecurity(servicePlanSecurityKey);
    }
    maintainAttachmentObj.modifyCaseAttachment(details.modifyAttachmentDetails);
  }

  /**
   * Overridden to Calls the new Service layer.
   *
   * 
   * @param details CreateCaseAttachmentDetails
   * @return void.
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public void createCaseAttachment(CreateCaseAttachmentDetails details) throws AppException, InformationalException {
    MOLSAMaintainAttachmentDA maintainAttachmentObj = MOLSAMaintainAttachmentDAFactory.newInstance();
    curam.core.intf.CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
    CaseKey caseKey = new CaseKey();
    caseKey.caseID = details.createCaseAttachmentDetails.caseID;
    CaseTypeCode caseTypeCode = caseHeaderObj.readCaseTypeCode(caseKey);
    if(caseTypeCode.caseTypeCode.equals(CASETYPECODE.SERVICEPLAN))
    {
        ServicePlanDelivery servicePlanDeliveryObj = ServicePlanDeliveryFactory.newInstance();
        ServicePlanSecurityKey servicePlanSecurityKey = new ServicePlanSecurityKey();
        ServicePlanSecurityImplementationFactory.register();
        servicePlanSecurityKey.caseID = caseKey.caseID;
        servicePlanSecurityKey.securityCheckType = 3;
        servicePlanDeliveryObj.checkSecurity(servicePlanSecurityKey);
    }
    maintainAttachmentObj.insertCaseAttachmentDetails(details.createCaseAttachmentDetails);
    
  }

}
