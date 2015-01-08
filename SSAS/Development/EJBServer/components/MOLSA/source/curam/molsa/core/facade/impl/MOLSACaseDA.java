package curam.molsa.core.facade.impl;

import curam.codetable.CASETYPECODE;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.intf.Case;
import curam.core.facade.struct.CreateCaseAttachmentDetails;
import curam.core.facade.struct.ModifyCaseAttachmentDetails;
import curam.core.facade.struct.ReadAttachmentDetails;
import curam.core.facade.struct.ReadAttachmentKey;
import curam.core.facade.struct.ReadCaseAttachmentDetails;
import curam.core.facade.struct.ReadCaseAttachmentKey;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.MaintainAttachmentFactory;
import curam.core.intf.MaintainAttachment;
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
 * Overridden from OOTB class - Case.
 * 
 */
public class MOLSACaseDA extends curam.molsa.core.facade.base.MOLSACaseDA{



  @Override
  public ReadAttachmentDetails readAttachment(ReadAttachmentKey key) throws AppException, InformationalException {
    ReadAttachmentDetails readAttachmentDetails = new ReadAttachmentDetails();
    MOLSAMaintainAttachmentDA maintainAttachmentObj = MOLSAMaintainAttachmentDAFactory.newInstance();
    readAttachmentDetails.readAttachmentOut = maintainAttachmentObj.readAttachment(key.readAttachmentIn);
    return readAttachmentDetails;
  }

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
