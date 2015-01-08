package curam.molsa.verification.sl.impl;

import curam.core.fact.AttachmentFactory;
import curam.core.intf.Attachment;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.molsa.arabdox.entity.fact.MOLSAArabDoxAttachFactory;
import curam.molsa.arabdox.entity.intf.MOLSAArabDoxAttach;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxAttachDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;
import curam.verification.sl.infrastructure.entity.fact.VerificationAttachmentLinkFactory;
import curam.verification.sl.infrastructure.entity.intf.VerificationAttachmentLink;
import curam.verification.sl.infrastructure.entity.struct.VerificationAttachmentLinkDtls;
import curam.verification.sl.infrastructure.entity.struct.VerificationAttachmentLinkKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationAttachmentSummaryDetails;
import curam.verification.sl.infrastructure.entity.struct.VerificationAttachmentSummaryDetailsList;
import curam.verification.sl.infrastructure.entity.struct.VerificationItemProvidedKey;
import curam.verification.sl.infrastructure.struct.NewUserProvidedVerificationItemDetails;
import curam.verification.sl.infrastructure.struct.UserProvidedVerificationItemKey;

public class MOLSAVerificationApplicationDA extends curam.molsa.verification.sl.base.MOLSAVerificationApplicationDA{

  @Override
  public UserProvidedVerificationItemKey newUserProvidedVerificationItem(NewUserProvidedVerificationItemDetails details) 
  throws AppException, InformationalException {
    
    UserProvidedVerificationItemKey userProvidedVerificationItemKey = super.newUserProvidedVerificationItem(details);
    
    
    
    VerificationAttachmentLink verificationAttachmentLinkObj = VerificationAttachmentLinkFactory.newInstance();
    VerificationAttachmentLinkKey verificationAttachmentLinkKey = new VerificationAttachmentLinkKey();
    VerificationItemProvidedKey verificationItemProvidedKey = new VerificationItemProvidedKey();
    verificationItemProvidedKey.verificationItemProvidedID = userProvidedVerificationItemKey.verificationItemProvidedID;
    VerificationAttachmentSummaryDetailsList verificationAttachmentSummaryDetailsList = 
      verificationAttachmentLinkObj.searchAttachmentByVerificationItemProvided(verificationItemProvidedKey);
    //There will be only one at this stage
    long attachmentID = 0;
    for (VerificationAttachmentSummaryDetails verificationAttachmentSummaryDetails : verificationAttachmentSummaryDetailsList.dtls.items()){
      verificationAttachmentLinkKey.verificationAttachmentLinkID= verificationAttachmentSummaryDetails.verificationAttachmentLinkID;
      VerificationAttachmentLinkDtls verificationAttachmentLinkDtls= verificationAttachmentLinkObj.read(verificationAttachmentLinkKey);
      attachmentID = verificationAttachmentLinkDtls.attachmentID;
      
    }
    
    
    /*
    MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
    MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
    ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
    LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
    DocumentFileAddResponse documentFileAddResponse = 
      arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse,-2147050473, "D:/Qatar/Sample.txt");
    LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
    */
    if(attachmentID!=0) {
      MOLSAArabDoxAttach arabDoxAttachObj = MOLSAArabDoxAttachFactory.newInstance(); 
      MOLSAArabDoxAttachDtls arabDoxAttachDtls = new MOLSAArabDoxAttachDtls();
      arabDoxAttachDtls.attachmentID=attachmentID;
      arabDoxAttachDtls.arabDoxFileID=1;
      arabDoxAttachObj.insert(arabDoxAttachDtls);
    }
    
  //Erase the Data from Curam
    if(attachmentID!=0) {
      Attachment attachmentObj = AttachmentFactory.newInstance();
      AttachmentKey attachmentKey = new AttachmentKey();
      attachmentKey.attachmentID=attachmentID;
      AttachmentDtls attachmentDtls =  attachmentObj.read(attachmentKey);
      attachmentDtls.attachmentContents=Blob.kEmptyBlob;
      attachmentObj.modify(attachmentKey, attachmentDtls);
    }
    
    return userProvidedVerificationItemKey;
    
    
  }

}
