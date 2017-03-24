package curam.molsa.evidence.impl;

import com.google.inject.Inject;

import curam.codetable.CASEEVIDENCETYPECODE;
import curam.codetable.CASETYPECODE;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.sl.infrastructure.struct.EIEvidenceKeyList;
import curam.core.struct.CaseKey;
import curam.molsa.evidence.auditinfo.facade.fact.MOLSAEVDAuditInfoFactory;
import curam.molsa.evidence.auditinfo.facade.intf.MOLSAEVDAuditInfo;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseAndEvidenceKey;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;

public class MOLSAEvidenceActivationEvents implements curam.core.sl.infrastructure.impl.EvidenceControllerInterface.EvidenceActivationEvents{

	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	
	public MOLSAEvidenceActivationEvents() {
		super();
		GuiceWrapper.getInjector().injectMembers(this);
	}
	
	@Override
	public void postActivation(
			EvidenceControllerInterface paramEvidenceControllerInterface,
			CaseKey caseKey, EIEvidenceKeyList eiEvidenceKeyList)
			throws AppException, InformationalException {
		
		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);
		
		if (caseHeader.getCaseType().getCode().equals(CASETYPECODE.INTEGRATEDCASE) ) {
			// Add MOLSAEVDAuditInfo
			MOLSAEVDAuditInfo MOLSAEVDAuditInfoObj = MOLSAEVDAuditInfoFactory.newInstance();
			
			MOLSACaseAndEvidenceKey molsaCaseAndEvidenceKey = new MOLSACaseAndEvidenceKey();
			
			molsaCaseAndEvidenceKey.caseID = caseKey.caseID;
			
			for (EIEvidenceKey  eiEvidenceKey : eiEvidenceKeyList.dtls) {
				molsaCaseAndEvidenceKey.evidenceID = eiEvidenceKey.evidenceID;
				MOLSAEVDAuditInfoObj.createNewEVDAuditInfo(molsaCaseAndEvidenceKey);
			}
		}
		
	}

}
