package curam.molsa.core.sl.impl;

import com.google.inject.Inject;

import curam.codetable.CASESTATUS;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.CaseStatusFactory;
import curam.core.fact.SystemUserFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.CachedCaseHeader;
import curam.core.intf.CaseHeader;
import curam.core.intf.CaseStatus;
import curam.core.intf.SystemUser;
import curam.core.intf.UniqueID;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.intf.EvidenceController;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.sl.infrastructure.struct.EIEvidenceKeyList;
import curam.core.sl.infrastructure.struct.EvidenceTypeAndDescList;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseStatusDtls;
import curam.core.struct.CaseStatusKey;
import curam.core.struct.CurrentCaseStatusKey;
import curam.message.BPOPRODUCTDELIVERYAPPROVAL;
import curam.message.BPOROUTEPRODUCTDELIVERYAPPROVAL;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.workflow.impl.EnactmentService;

/**
 * Class implements OOTB hook point to temporary stop the cases when the user
 * apply the evidence changes to the integrated cases.
 */
public class MOLSAEvidenceControllerInterfaceImpl implements
		EvidenceControllerInterface.EvidenceActivationEvents {

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	public MOLSAEvidenceControllerInterfaceImpl() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	/**
	 * Handle the business logic to temporary stop the product delivery cases when the user apply the evidence changes to the integrated cases.
	 * 
	 * @param casekey
	 *            Contains a case identifier.
	 *            
	 * @param eievidencekeylist
	 *            Contains a list of evidences.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	public void postActivation(
			EvidenceControllerInterface evidencecontrollerinterface,
			CaseKey casekey, EIEvidenceKeyList eievidencekeylist)
			throws AppException, InformationalException {

		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderReadmultiKey1 paramCaseHeaderReadmultiKey = new CaseHeaderReadmultiKey1();

		paramCaseHeaderReadmultiKey.integratedCaseID = casekey.caseID;
		CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List = caseHeaderObj
				.searchByIntegratedCaseID(paramCaseHeaderReadmultiKey);
		boolean additionalBenefitEvidenceType = false;

		if (eievidencekeylist.dtls.size() == CuramConst.gkOne) {
			EIEvidenceKey evidenceKey = eievidencekeylist.dtls.item(0);
			if (evidenceKey.evidenceType
					.equals(CASEEVIDENCEEntry.ADDITIONALBENEFIT.getCode())) {
				additionalBenefitEvidenceType = true;
			}
		}
		for (CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails1 : caseHeaderReadmultiDetails1List.dtls) {

			if (CASESTATUSEntry.ACTIVE.getCode().equals(
					caseHeaderReadmultiDetails1.statusCode)
					&& !additionalBenefitEvidenceType) {

				CachedCaseHeader cachedCaseHeaderObj = CachedCaseHeaderFactory
						.newInstance();
				CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
				CaseHeaderKey paramCaseHeaderKey = new CaseHeaderKey();
				CaseHeaderDtls paramCaseHeaderDtls = new CaseHeaderDtls();
				CaseStatusKey paramCaseStatusKey = new CaseStatusKey();
				CaseStatusDtls paramCaseStatusDtls = new CaseStatusDtls();
				UniqueID uniqueIDObj = UniqueIDFactory.newInstance();
				SystemUser systemUserObj = SystemUserFactory.newInstance();
				CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

				// First change the status of the case to Suspended from Active.
				paramCaseHeaderKey.caseID = caseHeaderReadmultiDetails1.caseID;
				paramCaseHeaderDtls = cachedCaseHeaderObj
						.read(paramCaseHeaderKey);
				paramCaseHeaderDtls.statusCode = CASESTATUSEntry.SUSPENDED
						.getCode();
				cachedCaseHeaderObj.modify(paramCaseHeaderKey,
						paramCaseHeaderDtls);

				currentCaseStatusKey.caseID = caseHeaderReadmultiDetails1.caseID;
				currentCaseStatusKey.nullDate = Date.kZeroDate;
				CaseStatusDtls caseStatusDtls = caseStatusObj
						.readCurrentStatusByCaseID1(currentCaseStatusKey);
				paramCaseStatusKey.caseStatusID = caseStatusDtls.caseStatusID;
				caseStatusDtls.statusCode = CASESTATUSEntry.SUSPENDED.getCode();
				caseStatusDtls.endDate = TransactionInfo.getSystemDate();
				caseStatusDtls.endDateTime = TransactionInfo
						.getSystemDateTime();
				caseStatusObj.modify(paramCaseStatusKey, caseStatusDtls);

				paramCaseStatusDtls.comments = CuramConst.gkEmpty;
				paramCaseStatusDtls.caseID = caseHeaderReadmultiDetails1.caseID;
				paramCaseStatusDtls.statusCode = CASESTATUS.SUSPENDED;
				paramCaseStatusDtls.startDate = TransactionInfo.getSystemDate();
				paramCaseStatusDtls.endDate = Date.kZeroDate;
				paramCaseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
				paramCaseStatusDtls.userName = systemUserObj.getUserDetails().userName;
				caseStatusObj.insert(paramCaseStatusDtls);

				// Change the status of the case from suspended to open.
				paramCaseHeaderDtls.statusCode = CASESTATUSEntry.OPEN.getCode();
				cachedCaseHeaderObj.modify(paramCaseHeaderKey,
						paramCaseHeaderDtls);

				currentCaseStatusKey.caseID = caseHeaderReadmultiDetails1.caseID;
				currentCaseStatusKey.nullDate = Date.kZeroDate;

				CaseStatusDtls caseStatusDtls1 = caseStatusObj
						.readCurrentStatusByCaseID1(currentCaseStatusKey);
				paramCaseStatusKey.caseStatusID = caseStatusDtls1.caseStatusID;
				caseStatusDtls1.statusCode = CASESTATUSEntry.OPEN.getCode();
				caseStatusDtls1.endDate = TransactionInfo.getSystemDate();
				caseStatusDtls1.endDateTime = TransactionInfo
						.getSystemDateTime();
				caseStatusObj.modify(paramCaseStatusKey, caseStatusDtls1);

				paramCaseStatusDtls.comments = CuramConst.gkEmpty;
				paramCaseStatusDtls.caseID = caseHeaderReadmultiDetails1.caseID;
				paramCaseStatusDtls.statusCode = CASESTATUSEntry.OPEN.getCode();
				paramCaseStatusDtls.startDate = TransactionInfo.getSystemDate();
				paramCaseStatusDtls.endDate = Date.kZeroDate;
				paramCaseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
				paramCaseStatusDtls.userName = systemUserObj.getUserDetails().userName;
				caseStatusObj.insert(paramCaseStatusDtls);
				
				final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
				TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
				taskCreateDetails.caseID = caseHeaderReadmultiDetails1.caseID;

				final LocalisableString subject = new LocalisableString(
						BPOROUTEPRODUCTDELIVERYAPPROVAL.INF_CASE_SUBMITTED_TICKET);

				curam.piwrapper.caseheader.impl.CaseHeader caseHeader = caseHeaderDAO
						.get(caseHeaderReadmultiDetails1.caseID);

				subject.arg(caseHeader.getCaseReference());

				String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
						productDeliveryDAO.get(taskCreateDetails.caseID)
								.getProductType().getCode(),
						TransactionInfo.getProgramLocale());
				subject.arg(productName);
				subject.arg(caseHeader.getConcernRole().getName());

				taskCreateDetails.subject = subject.getMessage(TransactionInfo
						.getProgramLocale());

				enactmentStructs.add(taskCreateDetails);
				EnactmentService.startProcessInV3CompatibilityMode(
						MOLSAConstants.kMOLSAProductDeliveryOpenTask, enactmentStructs);

			}
		}

		

	}
}
