package curam.molsa.core.impl;

import org.tempuri.ArabdoxRemoteServiceStub;
import org.tempuri.ArabdoxRemoteServiceStub.DocumentFileAddResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LoginResponse;
import org.tempuri.ArabdoxRemoteServiceStub.LogoutResponse;

import curam.core.fact.AttachmentFactory;
import curam.core.fact.MaintainAttachmentFactory;
import curam.core.intf.Attachment;
import curam.core.intf.MaintainAttachment;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentIDAndAttachmentLinkIDStruct;
import curam.core.struct.AttachmentKey;
import curam.core.struct.CreateCaseAttachmentDetails;
import curam.core.struct.ModifyAttachmentDetails;
import curam.core.struct.ReadAttachmentIn;
import curam.core.struct.ReadAttachmentOut;
import curam.core.struct.ReadCaseAttachmentIn;
import curam.core.struct.ReadCaseAttachmentOut;

import curam.molsa.arabdox.entity.fact.MOLSAArabDoxAttachFactory;
import curam.molsa.arabdox.entity.intf.MOLSAArabDoxAttach;
import curam.molsa.arabdox.entity.struct.MOLSAArabDoxAttachDtls;
import curam.molsa.util.impl.MOLSAArabdoxHelper;
import curam.molsa.util.impl.MOLSAArabdoxSessionHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

/**
 * 
 * Overridden from OOTB class - MaintainAttachment.
 *
 */
public class MOLSAMaintainAttachmentDA extends curam.molsa.core.base.MOLSAMaintainAttachmentDA{

  @Override
  public ReadAttachmentOut readAttachment(ReadAttachmentIn key) throws AppException, InformationalException {
   
    ReadAttachmentOut readAttachmentOut = super.readAttachment(key);
    return readAttachmentOut;
  }

 

  @Override
  public void modifyCaseAttachment(ModifyAttachmentDetails details) throws AppException, InformationalException {
   
    super.modifyCaseAttachment(details);
  //If Selected any Attachment
    if(details.attachmentID != 0 ) {
      
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
      attachmentKey.attachmentID=details.attachmentID;
      AttachmentDtls attachmentDtls =  attachmentObj.read(attachmentKey);
      attachmentDtls.attachmentContents=Blob.kEmptyBlob;
      attachmentObj.modify(attachmentKey, attachmentDtls);
      
    }
  }

  @Override
  public AttachmentIDAndAttachmentLinkIDStruct insertCaseAttachmentDetails(CreateCaseAttachmentDetails details) throws AppException, InformationalException {
    MaintainAttachment MaintainAttachmentObj = MaintainAttachmentFactory.newInstance();
    AttachmentIDAndAttachmentLinkIDStruct attachmentIDAndAttachmentLinkIDStruct = MaintainAttachmentObj.insertCaseAttachmentDetails(details);
    
    
   
    
    //If Selected any Attachment
    if(attachmentIDAndAttachmentLinkIDStruct.attachmentID != 0 ) {
      
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
      attachmentKey.attachmentID=attachmentIDAndAttachmentLinkIDStruct.attachmentID;
      AttachmentDtls attachmentDtls =  attachmentObj.read(attachmentKey);
      attachmentDtls.attachmentContents=Blob.kEmptyBlob;
      attachmentObj.modify(attachmentKey, attachmentDtls);
      
      
      MOLSAArabDoxAttach arabDoxAttachObj = MOLSAArabDoxAttachFactory.newInstance(); 
      MOLSAArabDoxAttachDtls arabDoxAttachDtls = new MOLSAArabDoxAttachDtls();
      arabDoxAttachDtls.attachmentID=attachmentIDAndAttachmentLinkIDStruct.attachmentID;
      arabDoxAttachDtls.arabDoxFileID="1";
      arabDoxAttachObj.insert(arabDoxAttachDtls);
    }
   
    return attachmentIDAndAttachmentLinkIDStruct;
  }

}
