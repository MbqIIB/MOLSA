package curam.molsa.core.impl;

import curam.core.fact.MaintainAttachmentFactory;
import curam.core.intf.MaintainAttachment;
import curam.core.struct.AttachmentIDAndAttachmentLinkIDStruct;
import curam.core.struct.CreateCaseAttachmentDetails;
import curam.core.struct.ModifyAttachmentDetails;
import curam.core.struct.ReadAttachmentIn;
import curam.core.struct.ReadAttachmentOut;
import curam.molsa.util.impl.MOLSAArabdoxUtil;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * Overridden from OOTB class - MaintainAttachment.
 * Overridden for integration with ArabDox.
 *
 */
public class MOLSAMaintainAttachmentDA extends curam.molsa.core.base.MOLSAMaintainAttachmentDA{

	 /**
	 * Overridden from OOTB to download the  file from ArabDox System.
   * 
   * @param details ModifyAttachmentDetails
   * @return void.
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
	@Override
  public ReadAttachmentOut readAttachment(ReadAttachmentIn key) throws AppException, InformationalException {
   
    ReadAttachmentOut readAttachmentOut = super.readAttachment(key);
    
    MOLSAArabdoxUtil  arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
    readAttachmentOut.attachmentContents = arabdoxUtilObj.retreiveFileContentFromArabDox(key.attachmentID); 
    
    return readAttachmentOut;
  }

 

  /**
   * Overridden from OOTB to deletes the old file and upload the new file into ArabDox System 
   * and erases the attachment data from Curam System.
   *
   * 
   * @param details ModifyAttachmentDetails
   * @return void.
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public void modifyCaseAttachment(ModifyAttachmentDetails details) throws AppException, InformationalException {
   
    super.modifyCaseAttachment(details);
  //If Selected any Attachment
    if(details.attachmentID != 0 ) {
      MOLSAArabdoxUtil  arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
      arabdoxUtilObj.modifyFileContentToArabDox(details.attachmentID, details.attachmentName, details.attachmentContents);
    }
  }

  /**
   * Overridden from OOTB to upload the document into ArabDox System and erases the attachment data from Curam System.
   * If created for case for the first time, it creates a new Folder and Documents in the ArabDox.
   * All the files are uploaded as Attachment into the Process Document.
   * 
   * @param details CreateCaseAttachmentDetails
   * @return AttachmentIDAndAttachmentLinkIDStruct
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  @Override
  public AttachmentIDAndAttachmentLinkIDStruct insertCaseAttachmentDetails(CreateCaseAttachmentDetails details) throws AppException, InformationalException {
    MaintainAttachment MaintainAttachmentObj = MaintainAttachmentFactory.newInstance();
    AttachmentIDAndAttachmentLinkIDStruct attachmentIDAndAttachmentLinkIDStruct = MaintainAttachmentObj.insertCaseAttachmentDetails(details);

    //If Selected any Attachment
    if(attachmentIDAndAttachmentLinkIDStruct.attachmentID != 0 ) {
      
      MOLSAArabdoxUtil  arabdoxUtilObj = MOLSAArabdoxUtil.newInstance();
      arabdoxUtilObj.insertFileContentToArabDox(attachmentIDAndAttachmentLinkIDStruct.attachmentID, details.caseID, 
          details.newCaseAttachmentName, details.newCaseAttachmentContents, true);

      
    }
   
    return attachmentIDAndAttachmentLinkIDStruct;
  }

}
