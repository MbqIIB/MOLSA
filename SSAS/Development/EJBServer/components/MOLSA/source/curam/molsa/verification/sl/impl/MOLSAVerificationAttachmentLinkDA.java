package curam.molsa.verification.sl.impl;

import curam.core.fact.AttachmentFactory;
import curam.core.intf.Attachment;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;
import curam.verification.sl.infrastructure.struct.ModifyVerificationAttachmentLinkDetails;
import curam.verification.sl.infrastructure.struct.ReadVerificationAttachmentLinkDetails;
import curam.verification.sl.infrastructure.struct.ReadVerificationAttachmentLinkKey;
/**
 * 
 * Overridden from OOTB class - VerificationAttachmentLink.
 *
 */
public class MOLSAVerificationAttachmentLinkDA extends curam.molsa.verification.sl.base.MOLSAVerificationAttachmentLinkDA {

  @Override
  public ReadVerificationAttachmentLinkDetails readVerificationAttachmentLink(ReadVerificationAttachmentLinkKey key) throws AppException, InformationalException {
    ReadVerificationAttachmentLinkDetails readVerificationAttachmentLinkDetails =  super.readVerificationAttachmentLink(key);
    return readVerificationAttachmentLinkDetails;
  }

  @Override
  public void modifyVerificationAttachmentLink(ModifyVerificationAttachmentLinkDetails details) throws AppException, InformationalException {
    
    super.modifyVerificationAttachmentLink(details);
    //If Selected any Attachment
    if(details.modifyAttachmentDtls.attachmentID != 0 ) {
      
      /*
      MOLSAArabdoxSessionHelper arabdoxSessionHelper = MOLSAArabdoxSessionHelper.newInstance();
      MOLSAArabdoxHelper arabdoxHelper = MOLSAArabdoxHelper.newInstance();
      ArabdoxRemoteServiceStub arabdoxRemoteServiceStub = arabdoxSessionHelper.getRemoteServiceStub();
      LoginResponse loginResponse = arabdoxSessionHelper.loginToArabdox(arabdoxRemoteServiceStub);
      DocumentFileAddResponse documentFileAddResponse = 
        arabdoxHelper.addDocumentFilesEx(arabdoxRemoteServiceStub, loginResponse,-2147050473, "D:/Qatar/Sample.txt");
      LogoutResponse logoutResponse = arabdoxSessionHelper.logoutFromArabdox(arabdoxRemoteServiceStub, loginResponse);
      */
      
      
      //Erase the Data from Curam
      Attachment attachmentObj = AttachmentFactory.newInstance();
      AttachmentKey attachmentKey = new AttachmentKey();
      attachmentKey.attachmentID=details.modifyAttachmentDtls.attachmentID;
      AttachmentDtls attachmentDtls =  attachmentObj.read(attachmentKey);
      attachmentDtls.attachmentContents=Blob.kEmptyBlob;
      attachmentObj.modify(attachmentKey, attachmentDtls);
    }
  }

}
