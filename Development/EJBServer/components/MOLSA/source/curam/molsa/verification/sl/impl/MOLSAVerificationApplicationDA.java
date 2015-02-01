package curam.molsa.verification.sl.impl;

import curam.codetable.CASETYPECODE;
import curam.core.fact.CaseHeaderFactory;
import curam.core.intf.CaseHeader;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.molsa.util.impl.MOLSAArabdoxUtil;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.verification.sl.infrastructure.struct.NewUserProvidedVerificationItemDetails;
import curam.verification.sl.infrastructure.struct.UserProvidedVerificationItemKey;

public class MOLSAVerificationApplicationDA extends curam.molsa.verification.sl.base.MOLSAVerificationApplicationDA {

  /**
   * Upload the document into ArabDox System and erases the attachment data from Curam System.
   * If created for case for the first time, it creates a new Folder and 2 Documents in the ArabDox.
   * All the files are uploaded as Attachment into the Verification Document.
   * 
   * @param details NewUserProvidedVerificationItemDetails
   * @return UserProvidedVerificationItemKey
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public UserProvidedVerificationItemKey newUserProvidedVerificationItem(NewUserProvidedVerificationItemDetails details) 
  throws AppException, InformationalException {

    UserProvidedVerificationItemKey userProvidedVerificationItemKey = super.newUserProvidedVerificationItem(details);

    // If Selected any Attachment
    if (details.createVerificationAttachmentLinkDetails.createAttachmentDtls.attachmentID != 0) {
      
   // The attachment is stored in the IC level. So IC Case ID should be passed for ArabDox
     CaseHeader  caseHeaderObj = CaseHeaderFactory.newInstance();
     CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
     caseHeaderKey.caseID = details.itemProvidedDetailsdtls.caseID;
     CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
     long caseID = 0;
     if(caseHeaderDtls.caseTypeCode.equals(CASETYPECODE.PRODUCTDELIVERY)) {
       caseID = caseHeaderDtls.integratedCaseID;
     } else {
       caseID=caseHeaderDtls.caseID;
     }

      MOLSAArabdoxUtil arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
      arabdoxUtilObj.insertFileContentToArabDox(details.createVerificationAttachmentLinkDetails.createAttachmentDtls.attachmentID, 
          caseID,
          details.itemProvidedDetailsdtls.fileName, 
          details.createVerificationAttachmentLinkDetails.createAttachmentDtls.attachmentContents,
          false);

    }

    return userProvidedVerificationItemKey;

  }

}
