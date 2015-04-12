package curam.molsa.training.sl.impl;

import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.core.struct.InformationalMsgDtlsList;
import curam.core.struct.ProviderLocationKey;
import curam.cpm.sl.entity.struct.ProviderDtlsList;
import curam.cpm.sl.entity.struct.ServiceOfferingKey;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityDtls;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityDtlsStruct1List;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityKey;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkDtls;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkKey;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateDtls;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateDtlsStruct1;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateKeyStruct1;
import curam.molsa.training.entity.struct.MOLSATrainingDtls;
import curam.molsa.training.entity.struct.MOLSATrainingDtlsList;
import curam.molsa.training.entity.struct.MOLSATrainingKey;
import curam.molsa.training.facade.struct.MOLSAAttachmentDetailsList;
import curam.molsa.training.facade.struct.MOLSATrainingAttachmentDetails;
import curam.molsa.training.struct.MOLSATrainingDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAMaintainTrainingService extends  curam.molsa.training.sl.base.MOLSAMaintainTrainingService {

	//For future changes - Training Management
  @Override
  public InformationalMsgDtlsList createBeneficiaryService(MOLSATrainingDetails trainingDetails) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    return null;
  }

@Override
public void cancelTraining(MOLSATrainingDetails trainingDetails)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public MOLSATrainingKey insertMOLSATraining(MOLSATrainingDtls trainingDetails)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public ProviderDtlsList readProviders() throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public MOLSATrainingDtlsList searchByServiceOfferingID(ServiceOfferingKey soID)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public MOLSATrainingDtls readByTrainingID(MOLSATrainingKey arg1)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void modifyTrainingDetails(MOLSATrainingDtls trainingDetails)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public void rescheduleTrainingDetails(MOLSATrainingDetails trainingDetails)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public void reminderSMS(MOLSATrainingKey trainingID) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public MOLSATrainingAtttachmentLinkDtls createTrainingAttachment(
		MOLSATrainingAttachmentDetails materialDetails) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public MOLSAAttachmentDetailsList serachAttachmentByTrainingID(
		MOLSATrainingKey arg1) throws AppException, InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void cancelTrainingAttachment(MOLSATrainingAtttachmentLinkKey key)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public AttachmentDtls readTrainingAttachment(AttachmentKey key)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void insertCertificateIssuedStatus(
		MOLSATrainingCertificateDtls certificatedtls) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public MOLSATrainingCertificateDtlsStruct1 readCertificateStatus(
		MOLSATrainingCertificateKeyStruct1 key) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void insertProviderFacilities(MOLSAProviderFacilityDtls facilityDtls)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public MOLSAProviderFacilityDtls readProviderFacility(
		MOLSAProviderFacilityKey key) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void modifyProviderFacility(MOLSAProviderFacilityDtls facilityDtls)
		throws AppException, InformationalException {
	// TODO Auto-generated method stub
	
}

@Override
public MOLSAProviderFacilityDtlsStruct1List readProviderFacilityByLocation(
		ProviderLocationKey locationID) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

@Override
public MOLSAParticipantDetailsList listParticipantByCriteria(
		MOLSAParticipantFilterCriteriaDetails key) throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	return null;
}

}
