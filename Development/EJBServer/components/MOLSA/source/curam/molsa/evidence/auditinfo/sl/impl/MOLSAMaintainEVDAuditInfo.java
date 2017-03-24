package curam.molsa.evidence.auditinfo.sl.impl;

import curam.molsa.codetable.MOLSEVDAUDITINFOSTATUS;
import curam.molsa.evidence.auditinfo.entity.fact.MOLSAEVDAuditInfoFactory;
import curam.molsa.evidence.auditinfo.entity.intf.MOLSAEVDAuditInfo;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSACaseKey;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoDtls;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoDtlsList;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoKey;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEvidenceKey;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseAndEvidenceKey;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseEvidenceAndAuditedIndKey;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseEvidenceAndStatusKey;
import curam.molsa.evidence.auditinfo.struct.MOLSAEVDAuditInfoDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.NotFoundIndicator;

public class MOLSAMaintainEVDAuditInfo extends
		curam.molsa.evidence.auditinfo.sl.base.MOLSAMaintainEVDAuditInfo {

	@Override
	public void createNewEVDAuditInfo(MOLSAEVDAuditInfoDetails details)
			throws AppException, InformationalException {

		MOLSAEVDAuditInfo molsaEVDAuditInfoObj = MOLSAEVDAuditInfoFactory
				.newInstance();

		// Check for record exist for CaseID and EvidenceID
		MOLSACaseAndEvidenceKey molsaCaseAndEvidenceKey = new MOLSACaseAndEvidenceKey();
		molsaCaseAndEvidenceKey.caseID = details.caseID;
		molsaCaseAndEvidenceKey.evidenceID = details.evidenceID;

		NotFoundIndicator nfIndicator = new NotFoundIndicator();

		molsaEVDAuditInfoObj.readEVDAuditInfoByCaseIDAndEvidenceID(nfIndicator,
				molsaCaseAndEvidenceKey);

		if (nfIndicator.isNotFound()) {
			MOLSAEVDAuditInfoDtls molsaEVDAuditInfoDtls = new MOLSAEVDAuditInfoDtls();

			molsaEVDAuditInfoDtls.caseID = details.caseID;
			molsaEVDAuditInfoDtls.evidenceID = details.evidenceID;
			molsaEVDAuditInfoDtls.auditedInd = details.auditedInd;
			molsaEVDAuditInfoDtls.auditStatus = details.auditStatus;

			molsaEVDAuditInfoObj.insert(molsaEVDAuditInfoDtls);
		}

	}

	@Override
	public MOLSAEVDAuditInfoDtlsList listAllEVDAuditInfoBycaseID(
			MOLSACaseKey key) throws AppException, InformationalException {

		MOLSAEVDAuditInfo molsaEVDAuditInfoObj = MOLSAEVDAuditInfoFactory
				.newInstance();

		MOLSAEVDAuditInfoDtlsList list = molsaEVDAuditInfoObj
				.searchEVDAuditInfoByCaseID(key);

		return list;
	}

	@Override
	public void updateEVDAuditInfoInd(MOLSACaseEvidenceAndAuditedIndKey key)
			throws AppException, InformationalException {

		MOLSAEVDAuditInfo molsaEVDAuditInfoObj = MOLSAEVDAuditInfoFactory
				.newInstance();

		MOLSAEVDAuditInfoDtls modifyDtls = new MOLSAEVDAuditInfoDtls();

		MOLSAEVDAuditInfoKey molsaEVDAuditInfoKey = new MOLSAEVDAuditInfoKey();

		MOLSAEvidenceKey evidenceIDKey = new MOLSAEvidenceKey();

		evidenceIDKey.evidenceID = key.evidenceID;

		NotFoundIndicator nfIndicator = new NotFoundIndicator();

		modifyDtls = molsaEVDAuditInfoObj.readEVDAuditInfoByEvidenceID(
				nfIndicator, evidenceIDKey);

		if (!nfIndicator.isNotFound()) {
			modifyDtls.auditedInd = key.auditedInd;
			modifyDtls.auditStatus = MOLSEVDAUDITINFOSTATUS.EVDAUDITINFO_OPEN;

			molsaEVDAuditInfoKey.molsaEVDAuditInfoID = modifyDtls.molsaEVDAuditInfoID;

			molsaEVDAuditInfoObj.modify(molsaEVDAuditInfoKey, modifyDtls);
		}
	}

	@Override
	public void updateEVDAuditInfoStatusBycaseIDAndEvidenceID(
			MOLSACaseEvidenceAndStatusKey key) throws AppException,
			InformationalException {

		MOLSAEVDAuditInfo molsaEVDAuditInfoObj = MOLSAEVDAuditInfoFactory
				.newInstance();

		MOLSACaseAndEvidenceKey caseAndEvidenceKey = new MOLSACaseAndEvidenceKey();

		NotFoundIndicator nfIndicator = new NotFoundIndicator();

		caseAndEvidenceKey.caseID = key.caseID;
		caseAndEvidenceKey.evidenceID = key.evidenceID;

		MOLSAEVDAuditInfoDtls modifyDtls = molsaEVDAuditInfoObj
				.readEVDAuditInfoByCaseIDAndEvidenceID(nfIndicator,
						caseAndEvidenceKey);

		if (!nfIndicator.isNotFound()) {
			MOLSAEVDAuditInfoKey molsaEVDAuditInfoKey = new MOLSAEVDAuditInfoKey();

			modifyDtls.auditStatus = key.auditStatus;

			molsaEVDAuditInfoKey.molsaEVDAuditInfoID = modifyDtls.molsaEVDAuditInfoID;

			molsaEVDAuditInfoObj.modify(molsaEVDAuditInfoKey, modifyDtls);
		}

	}

}
