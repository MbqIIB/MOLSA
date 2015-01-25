package curam.molsa.verification.sl.impl;

import curam.codetable.CASETYPECODE;
import curam.core.fact.CaseHeaderFactory;
import curam.core.intf.CaseHeader;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.molsa.util.impl.MOLSAArabdoxUtil;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.verification.sl.infrastructure.entity.fact.VerificationFactory;
import curam.verification.sl.infrastructure.entity.fact.VerificationItemProvidedFactory;
import curam.verification.sl.infrastructure.entity.intf.Verification;
import curam.verification.sl.infrastructure.entity.intf.VerificationItemProvided;
import curam.verification.sl.infrastructure.entity.struct.VDIEDLinkKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationAttachmentLinkKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationDtls;
import curam.verification.sl.infrastructure.entity.struct.VerificationDtlsList;
import curam.verification.sl.infrastructure.entity.struct.VerificationItemProvidedDtls;
import curam.verification.sl.infrastructure.entity.struct.VerificationItemProvidedKey;
import curam.verification.sl.infrastructure.struct.CreateVerificationAttachmentLinkDetails;
import curam.verification.sl.infrastructure.struct.ModifyVerificationAttachmentLinkDetails;
import curam.verification.sl.infrastructure.struct.ReadVerificationAttachmentLinkDetails;
import curam.verification.sl.infrastructure.struct.ReadVerificationAttachmentLinkKey;
/**
 * 
 * Overridden from OOTB class - VerificationAttachmentLink.
 *
 */
public class MOLSAVerificationAttachmentLinkDA extends curam.molsa.verification.sl.base.MOLSAVerificationAttachmentLinkDA {

 /**
  * Overridden from OOTB to down load the Attachment from ArabDox.
  * 
  * @param key ReadVerificationAttachmentLinkKey
   * @return ReadVerificationAttachmentLinkDetails
   * @throws AppException General Exception
   * @throws InformationalException General ExceptionList
  */
  @Override
  public ReadVerificationAttachmentLinkDetails readVerificationAttachmentLink(ReadVerificationAttachmentLinkKey key) 
  throws AppException, InformationalException {
    ReadVerificationAttachmentLinkDetails readVerificationAttachmentLinkDetails =  super.readVerificationAttachmentLink(key);
    
    MOLSAArabdoxUtil  arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
    readVerificationAttachmentLinkDetails.readAttachmentDtls.attachmentContents = 
      arabdoxUtilObj.retreiveFileContentFromArabDox(readVerificationAttachmentLinkDetails.readAttachmentDtls.attachmentID); 
    
    
    return readVerificationAttachmentLinkDetails;
  }

  /**
   * Overridden from OOTB to modify the Attachment from ArabDox.
   * This will delete the existing one and Add a new one in the ArabDox.
   * 
   * @param details ModifyVerificationAttachmentLinkDetails
    * @return void
    * @throws AppException General Exception
    * @throws InformationalException General ExceptionList
   */
  @Override
  public void modifyVerificationAttachmentLink(ModifyVerificationAttachmentLinkDetails details) 
  throws AppException, InformationalException {
    
    super.modifyVerificationAttachmentLink(details);
    
     //If Selected any Attachment
    if(details.modifyAttachmentDtls.attachmentID != 0 ) {
      MOLSAArabdoxUtil  arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
      arabdoxUtilObj.modifyFileContentToArabDox(details.modifyAttachmentDtls.attachmentID, 
          details.modifyAttachmentDtls.attachmentName, details.modifyAttachmentDtls.attachmentContents);
    }
    
  }

  /**
   * Overridden from OOTB to add the Attachment to ArabDox.
   * 
   * 
   * @param details CreateVerificationAttachmentLinkDetails
    * @return VerificationAttachmentLinkKey
    * @throws AppException General Exception
    * @throws InformationalException General ExceptionList
   */
  @Override
  public VerificationAttachmentLinkKey createVerificationAttachmentLink(CreateVerificationAttachmentLinkDetails details) 
  throws AppException, InformationalException {
    // TODO Auto-generated method stub
    VerificationAttachmentLinkKey verificationAttachmentLinkKey =  super.createVerificationAttachmentLink(details);
   
    
    VerificationItemProvided  verificationItemProvidedObj = VerificationItemProvidedFactory.newInstance();
    VerificationItemProvidedKey  verificationItemProvidedKey = new VerificationItemProvidedKey();
    verificationItemProvidedKey.verificationItemProvidedID = details.createLinkDtls.verificationItemProvidedID;
    VerificationItemProvidedDtls verificationItemProvidedDtls = verificationItemProvidedObj.read(verificationItemProvidedKey);
   
  
    Verification verificationObj = VerificationFactory.newInstance();
    VDIEDLinkKey  vdiedLinkKey = new  VDIEDLinkKey();
    vdiedLinkKey.VDIEDLinkID = verificationItemProvidedDtls.VDIEDLinkID;
    VerificationDtlsList verificationDtlsList = verificationObj.readByVDIEDLinkID(vdiedLinkKey);
    VerificationDtls verificationDtls = verificationDtlsList.dtls.item(0);
    
   // The attachment is stored in the IC level. So IC Case ID should be passed for ArabDox
    CaseHeader  caseHeaderObj = CaseHeaderFactory.newInstance();
    CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
    caseHeaderKey.caseID = verificationDtls.verificationLinkedID;
    CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
    long caseID = 0;
    if(caseHeaderDtls.caseTypeCode.equals(CASETYPECODE.PRODUCTDELIVERY)) {
      caseID = caseHeaderDtls.integratedCaseID;
    } else {
      caseID=caseHeaderDtls.caseID;
    }
   
   /*
    EvidenceDescriptorDetails evidenceDescriptorDetails = verificationItemProvidedObj.readEvidenceDescriptorIDByItemProvidedKey(
        verificationItemProvidedKey);
    
    EvidenceDescriptor evDescObj = EvidenceDescriptorFactory.newInstance();
    EvidenceDescriptorKey evidenceDescriptorKey = new EvidenceDescriptorKey();

    evidenceDescriptorKey.evidenceDescriptorID = evidenceDescriptorDetails.evidenceDescriptorID;
    EvidenceDescriptorDtls evidenceDescriptorDtls = evDescObj.read(
      evidenceDescriptorKey);
     */
    // If Selected any Attachment
    if (details.createAttachmentDtls.attachmentID != 0) {

      MOLSAArabdoxUtil arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
      arabdoxUtilObj.insertFileContentToArabDox(details.createAttachmentDtls.attachmentID, 
          caseID, details.createAttachmentDtls.attachmentName,
          details.createAttachmentDtls.attachmentContents, false);

    }

    return verificationAttachmentLinkKey;
  }

}
