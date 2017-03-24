package curam.molsa.evidence.auditinfo.facade.impl;

import curam.core.fact.UsersFactory;
import curam.core.intf.Users;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.molsa.codetable.MOLSEVDAUDITINFOSTATUS;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSACaseKey;
import curam.molsa.evidence.auditinfo.entity.struct.MOLSAEVDAuditInfoDtlsList;
import curam.molsa.evidence.auditinfo.sl.fact.MOLSAMaintainEVDAuditInfoFactory;
import curam.molsa.evidence.auditinfo.sl.intf.MOLSAMaintainEVDAuditInfo;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseAndEvidenceKey;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseEvidenceAndAuditedIndKey;
import curam.molsa.evidence.auditinfo.struct.MOLSACaseEvidenceAndStatusKey;
import curam.molsa.evidence.auditinfo.struct.MOLSAEVDAuditInfoDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;

public class MOLSAEVDAuditInfo extends
		curam.molsa.evidence.auditinfo.facade.base.MOLSAEVDAuditInfo {

	@Override
	public void createNewEVDAuditInfo(MOLSACaseAndEvidenceKey key)
			throws AppException, InformationalException {

		MOLSAMaintainEVDAuditInfo molsaMaintainEVDAuditInfoObj = MOLSAMaintainEVDAuditInfoFactory
				.newInstance();

		MOLSAEVDAuditInfoDetails details = new MOLSAEVDAuditInfoDetails();

		details.caseID = key.caseID;
		details.evidenceID = key.evidenceID;
		details.auditStatus = MOLSEVDAUDITINFOSTATUS.EVDAUDITINFO_OPEN;
		details.auditedInd = false;

		molsaMaintainEVDAuditInfoObj.createNewEVDAuditInfo(details);
	}

	@Override
	public MOLSAEVDAuditInfoDtlsList listAllEVDAuditInfoBycaseID(
			MOLSACaseKey key) throws AppException,
			InformationalException {

		MOLSAMaintainEVDAuditInfo molsaMaintainEVDAuditInfoObj = MOLSAMaintainEVDAuditInfoFactory
				.newInstance();

		MOLSAEVDAuditInfoDtlsList list = molsaMaintainEVDAuditInfoObj
				.listAllEVDAuditInfoBycaseID(key);

		return list;
	}

	@Override
	public void updateEVDAuditInfoInd(MOLSACaseEvidenceAndAuditedIndKey key)
			throws AppException, InformationalException {

		Users usersObj = UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();

		usersKey.userName = TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);

		if (usersDtls.roleName
				.equalsIgnoreCase(MOLSAConstants.kMolsaCaseAuditorRole)) {
			
			MOLSAMaintainEVDAuditInfo molsaMaintainEVDAuditInfoObj = MOLSAMaintainEVDAuditInfoFactory
					.newInstance();
			molsaMaintainEVDAuditInfoObj.updateEVDAuditInfoInd(key);
		}

	}

	@Override
	public void updateEVDAuditInfoStatusCompleteBycaseIDAndEvidenceID(
			MOLSACaseAndEvidenceKey key) throws AppException,
			InformationalException {

		MOLSAMaintainEVDAuditInfo molsaMaintainEVDAuditInfoObj = MOLSAMaintainEVDAuditInfoFactory
				.newInstance();

		MOLSACaseEvidenceAndStatusKey caseEvidenceAndStatusKey = new MOLSACaseEvidenceAndStatusKey();
		caseEvidenceAndStatusKey.caseID = key.caseID;
		caseEvidenceAndStatusKey.evidenceID = key.evidenceID;
		
		caseEvidenceAndStatusKey.auditStatus = MOLSEVDAUDITINFOSTATUS.EVDAUDITINFO_COMPLETE;

		molsaMaintainEVDAuditInfoObj.updateEVDAuditInfoStatusBycaseIDAndEvidenceID(caseEvidenceAndStatusKey);

	}

}
