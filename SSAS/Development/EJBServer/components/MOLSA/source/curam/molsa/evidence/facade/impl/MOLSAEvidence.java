package curam.molsa.evidence.facade.impl;

import com.google.inject.Inject;

import curam.application.facade.struct.ApplicationKey;
import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.core.facade.infrastructure.fact.EvidenceFactory;
import curam.core.facade.infrastructure.intf.Evidence;
import curam.core.facade.infrastructure.struct.ActiveEvdInstanceDtls;
import curam.core.facade.infrastructure.struct.ListAllActiveEVDInstanceWorkspaceDtls;
import curam.core.sl.struct.CaseIDParticipantIDEvidenceTypeKey;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSACaseKey;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoDtls;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoDtlsList;
import curam.molsa.evidence.auditinfo.facade.fact.MOLSAEVDAuditInfoFactory;
import curam.molsa.evidence.auditinfo.facade.intf.MOLSAEVDAuditInfo;
import curam.molsa.evidence.facade.struct.MOLSAActiveEvdInstanceDtls;
import curam.molsa.evidence.facade.struct.MOLSAActiveEvdInstanceDtlsList;
import curam.molsa.evidence.facade.struct.MOLSAApplicationListAllActiveEVDInstanceWorkspaceDtls;
import curam.molsa.evidence.facade.struct.MOLSAListAllActiveEVDInstanceWorkspaceDtls;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;


public class MOLSAEvidence extends curam.molsa.evidence.facade.base.MOLSAEvidence {

	@Inject
	private ApplicationDAO applicationDAO;
	
	public MOLSAEvidence() {
		GuiceWrapper.getInjector().injectMembers(this);
	}
	
	@Override
	public MOLSAListAllActiveEVDInstanceWorkspaceDtls listAllActiveEVDInstanceWorkspaceDtls(
			CaseIDParticipantIDEvidenceTypeKey key) throws AppException,
			InformationalException {

		Evidence evidenceObj = EvidenceFactory.newInstance();
		
		ListAllActiveEVDInstanceWorkspaceDtls list = evidenceObj.listAllActiveEVDInstanceWorkspaceDtls(key);
		
		MOLSAListAllActiveEVDInstanceWorkspaceDtls molsaList = new MOLSAListAllActiveEVDInstanceWorkspaceDtls();
		
		molsaList.filteredEvidenceType = list.filteredEvidenceType;
		molsaList.filteredParticipantID = list.filteredParticipantID;
		molsaList.hasVerificationsOrIssues = list.hasVerificationsOrIssues;
		
		molsaList.contextDescription.assign(list.contextDescription);
		molsaList.evidenceTypeList.assign(list.evidenceTypeList);
		molsaList.participantIDNameDetailsList.assign(list.participantIDNameDetailsList);
		
		// Populate 
		MOLSAActiveEvdInstanceDtlsList molsaActiveEvdInstanceDtlsList = new MOLSAActiveEvdInstanceDtlsList();
		
		MOLSAEVDAuditInfo molsaEVDAuditInfoObj = MOLSAEVDAuditInfoFactory.newInstance();
		MOLSACaseKey molsaCaseKey = new MOLSACaseKey();
		molsaCaseKey.caseID = key.caseIDKey.caseID;
		
		 MOLSAEVDAuditInfoDtlsList  auditList = molsaEVDAuditInfoObj.listAllEVDAuditInfoBycaseID(molsaCaseKey);
		
		for (ActiveEvdInstanceDtls activeDtls : list.activeEvdInstanceDtlsList.dtls) {
			
			MOLSAActiveEvdInstanceDtls molsaActiveEvdInstanceDtls = new MOLSAActiveEvdInstanceDtls();
			
			Boolean auditedInd = false;
			
			for (MOLSAEVDAuditInfoDtls dtls: auditList.dtls) {
				
				if (activeDtls.evidenceID == dtls.evidenceID) {
					auditedInd = dtls.auditedInd;
					break;
				}
			}
			
			molsaActiveEvdInstanceDtls.auditedInd = auditedInd;
			molsaActiveEvdInstanceDtls.evdInstDtls.assign(activeDtls);
			
			molsaActiveEvdInstanceDtlsList.dtls.add(molsaActiveEvdInstanceDtls);
			
		}
		
		molsaList.activeEvdInstanceDtlsList.assign(molsaActiveEvdInstanceDtlsList);
		
		return molsaList;
	}

	@Override
	public MOLSAApplicationListAllActiveEVDInstanceWorkspaceDtls listApplicationAllActiveEVDInstanceWorkspaceDtls(
			ApplicationKey key) throws AppException,
			InformationalException {
	
		MOLSAApplicationListAllActiveEVDInstanceWorkspaceDtls result = new MOLSAApplicationListAllActiveEVDInstanceWorkspaceDtls();
		
		curam.intake.facade.struct.CaseKey caseKey = transposeApplicationToCase(key);

		CaseIDParticipantIDEvidenceTypeKey caseIDEvidenceTypeKey = new CaseIDParticipantIDEvidenceTypeKey();

		caseIDEvidenceTypeKey.caseIDKey.caseID = caseKey.caseID;

		result.dtls = listAllActiveEVDInstanceWorkspaceDtls(caseIDEvidenceTypeKey);

		result.caseID = caseKey.caseID;

		return result;
		
	}

	protected curam.intake.facade.struct.CaseKey transposeApplicationToCase(
			ApplicationKey key) throws AppException, InformationalException {
		curam.intake.facade.struct.CaseKey caseKey = new curam.intake.facade.struct.CaseKey();
		Application application = (Application) this.applicationDAO.get(Long
				.valueOf(key.applicationID));

		CaseHeader caseHeader = application.getCase();

		if (null != caseHeader) {
			caseKey.caseID = ((Long) caseHeader.getID()).longValue();
		}

		return caseKey;
	}
}
