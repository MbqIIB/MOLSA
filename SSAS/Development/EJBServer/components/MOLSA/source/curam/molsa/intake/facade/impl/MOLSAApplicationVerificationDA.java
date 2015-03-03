package curam.molsa.intake.facade.impl;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.core.sl.infrastructure.cmis.impl.CMSMetadataInterface;
import curam.intake.facade.struct.CreateApplicationVerificationAttachmentDetails;
import curam.intake.facade.struct.ModifyApplicationVerificationAttachmentDetails;
import curam.intake.facade.struct.NewUserProvidedApplicationVerificationItemDetails;
import curam.molsa.verification.facade.fact.MOLSAVerificationApplicationDAFactory;
import curam.molsa.verification.facade.intf.MOLSAVerificationApplicationDA;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.verification.facade.infrastructure.struct.CreateVerificationAttachmentDetails;
import curam.verification.facade.infrastructure.struct.ModifyVerificationAttachmentDetails;
import curam.verification.facade.infrastructure.struct.NewUserProvidedVerificationItemDetails;
import curam.verification.facade.infrastructure.struct.UserProvidedVerificationItemKey;
import curam.verification.facade.infrastructure.struct.VerificationAttachmentLinkKey;

public class MOLSAApplicationVerificationDA extends curam.molsa.intake.facade.base.MOLSAApplicationVerificationDA{
  @Inject
  private ApplicationDAO applicationDAO;
  
  @Inject
  private Provider cmsMetadataProvider;

  @Override
  public VerificationAttachmentLinkKey createVerificationAttachment(CreateApplicationVerificationAttachmentDetails details) throws AppException, InformationalException {
    Application application = (Application)applicationDAO.get(Long.valueOf(details.applicationID));
    CMSMetadataInterface cmsMetadata = (CMSMetadataInterface)cmsMetadataProvider.get();
    cmsMetadata.add("applicationReference", application.getReference());
    MOLSAVerificationApplicationDA verificationApplicationObj =  MOLSAVerificationApplicationDAFactory.newInstance();
    CreateVerificationAttachmentDetails standardDetails = new CreateVerificationAttachmentDetails();
    standardDetails.details = details.details;
    return verificationApplicationObj.createVerificationAttachment(standardDetails);
  }

  @Override
  public void modifyVerificationAttachment(ModifyApplicationVerificationAttachmentDetails details) throws AppException, InformationalException {
    Application application = (Application)applicationDAO.get(Long.valueOf(details.applicationID));
    CMSMetadataInterface cmsMetadata = (CMSMetadataInterface)cmsMetadataProvider.get();
    cmsMetadata.add("applicationReference", application.getReference());
    MOLSAVerificationApplicationDA verificationApplicationObj =  MOLSAVerificationApplicationDAFactory.newInstance();
    ModifyVerificationAttachmentDetails standardDetails = new ModifyVerificationAttachmentDetails();
    standardDetails.details = details.details;
    standardDetails.pageContextDescription = details.pageContextDescription;
    verificationApplicationObj.modifyVerificationAttachment(standardDetails);
  }

  @Override
  public UserProvidedVerificationItemKey newUserProvidedVerificationItem(NewUserProvidedApplicationVerificationItemDetails details) throws AppException, InformationalException {
    Application application = (Application)applicationDAO.get(Long.valueOf(details.applicationID));
    CMSMetadataInterface cmsMetadata = (CMSMetadataInterface)cmsMetadataProvider.get();
    cmsMetadata.add("applicationReference", application.getReference());
    MOLSAVerificationApplicationDA verificationApplicationObj =  MOLSAVerificationApplicationDAFactory.newInstance();
    NewUserProvidedVerificationItemDetails standardDetails = new NewUserProvidedVerificationItemDetails();
    standardDetails.verificationPageContextDetails = details.verificationPageContextDetails;
    standardDetails.newUserProvidedVerificationItemDetails = details.newUserProvidedVerificationItemDetails;
    return verificationApplicationObj.newUserProvidedVerificationItem(standardDetails);
  }

}
