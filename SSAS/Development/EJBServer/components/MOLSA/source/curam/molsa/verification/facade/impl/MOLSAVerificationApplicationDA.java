package curam.molsa.verification.facade.impl;

import curam.molsa.verification.sl.fact.MOLSAVerificationApplicationDAFactory;
import curam.molsa.verification.sl.fact.MOLSAVerificationAttachmentLinkDAFactory;
import curam.molsa.verification.sl.intf.MOLSAVerificationAttachmentLinkDA;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.verification.facade.infrastructure.struct.ModifyVerificationAttachmentDetails;
import curam.verification.facade.infrastructure.struct.NewUserProvidedVerificationItemDetails;
import curam.verification.facade.infrastructure.struct.ReadVerificationAttachmentDetails;
import curam.verification.facade.infrastructure.struct.ReadVerificationAttachmentLinkKey;
import curam.verification.facade.infrastructure.struct.UserProvidedVerificationItemKey;
import curam.verification.sl.struct.VerificationMessage;
/**
 * 
 * Overridden from OOTB class - VerificationApplication.
 *
 */
public class MOLSAVerificationApplicationDA extends curam.molsa.verification.facade.base.MOLSAVerificationApplicationDA{

  @Override
  public ReadVerificationAttachmentDetails readVerificationAttachment(ReadVerificationAttachmentLinkKey key) throws AppException, InformationalException {
    final MOLSAVerificationAttachmentLinkDA verificationAttachmentLink = MOLSAVerificationAttachmentLinkDAFactory.newInstance();

    final ReadVerificationAttachmentDetails viewVerificationAttachmentDetails = new ReadVerificationAttachmentDetails();

    viewVerificationAttachmentDetails.pageContextDescription = verificationAttachmentLink.readPageContextDescAttachmentByAttachID(
      key);

    viewVerificationAttachmentDetails.details = verificationAttachmentLink.readVerificationAttachmentLink(
      key.key);

    return viewVerificationAttachmentDetails;
  }

  @Override
  public void modifyVerificationAttachment(ModifyVerificationAttachmentDetails details) throws AppException, InformationalException {
    MOLSAVerificationAttachmentLinkDA verificationAttachmentLinkDA = 
      MOLSAVerificationAttachmentLinkDAFactory.newInstance();
    verificationAttachmentLinkDA.modifyVerificationAttachmentLink(details.details);
  }

  @Override
  public UserProvidedVerificationItemKey newUserProvidedVerificationItem(NewUserProvidedVerificationItemDetails details) 
  throws AppException, InformationalException {
    final curam.verification.sl.infrastructure.struct.UserProvidedVerificationItemKey userProvidedVerificationItemKey = 
      MOLSAVerificationApplicationDAFactory.newInstance().newUserProvidedVerificationItem(
        details.newUserProvidedVerificationItemDetails);
      
      final UserProvidedVerificationItemKey returnKey = new UserProvidedVerificationItemKey();

      returnKey.userProvidedVerificationItemKey = userProvidedVerificationItemKey;
      String[] messages = TransactionInfo.getInformationalManager().obtainInformationalAsString();

      for (int i = 0; i != messages.length; i++) {
        VerificationMessage warning = new VerificationMessage();

        warning.message = messages[i];
        returnKey.infoMsgListOpt.addRef(warning);
      }

      
      return returnKey;
  }

}
