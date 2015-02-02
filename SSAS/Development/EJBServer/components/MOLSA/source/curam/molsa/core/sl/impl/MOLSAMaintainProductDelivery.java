package curam.molsa.core.sl.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETRANSACTIONEVENTS;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.EVIDENCESTATUS;
import curam.codetable.PRODUCTNAME;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.intf.IntegratedCase;
import curam.core.facade.struct.CertificationCaseIDKey;
import curam.core.facade.struct.ListICProductDeliveryCertDetailsAndVersionNo;
import curam.core.facade.struct.ProductDeliveryApprovalKey;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.fact.CaseEvidenceFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.CaseStatusFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.MaintainCaseFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.ProductFactory;
import curam.core.fact.SystemUserFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.DataBasedSecurity;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.CachedCaseHeader;
import curam.core.intf.CaseEvidence;
import curam.core.intf.CaseHeader;
import curam.core.intf.CaseStatus;
import curam.core.intf.ConcernRole;
import curam.core.intf.MaintainCase;
import curam.core.intf.MaintainCertification;
import curam.core.intf.Product;
import curam.core.intf.ProductDelivery;
import curam.core.intf.SystemUser;
import curam.core.intf.UniqueID;
import curam.core.sl.entity.fact.MilestoneConfigurationFactory;
import curam.core.sl.entity.struct.EarliestStartDay;
import curam.core.sl.entity.struct.MilestoneConfigurationKey;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.impl.CaseTransactionLogIntf;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDEvidenceTypeStatusesKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKeyList;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.CaseIDKey;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.struct.CaseEvidenceDtls;
import curam.core.struct.CaseEvidenceReadNearestEvidenceKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseReference;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.core.struct.CaseSearchKey;
import curam.core.struct.CaseSecurityCheckKey;
import curam.core.struct.CaseStartDate;
import curam.core.struct.CaseStatusDtls;
import curam.core.struct.CaseStatusKey;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.CurrentCaseStatusKey;
import curam.core.struct.DataBasedSecurityResult;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.ProductDeliveryApprovalKey1;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDeliveryTypeDetails;
import curam.core.struct.ProductDtls;
import curam.core.struct.ProductKey;
import curam.core.struct.SubmitForApprovalKey;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.events.MOLSAAPPROVALTASK;
import curam.message.BPOCASEEVENTS;
import curam.message.BPOPRODUCTDELIVERYAPPROVAL;
import curam.message.BPOROUTEPRODUCTDELIVERYAPPROVAL;
import curam.message.GENERALCASE;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.events.impl.EventService;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.exception.RecordNotFoundException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.workflow.impl.EnactmentService;

/**
 * Process class used to perform the operations related to MOLSA Product
 * delivery approval process.
 */
@SuppressWarnings("restriction")
public abstract class MOLSAMaintainProductDelivery extends
		curam.molsa.core.sl.base.MOLSAMaintainProductDelivery {

	protected static final String kendDate = "endDate";

	protected static final String kdeductionEndDate = "deductionEndDate";

	@Inject
	protected Provider<CaseTransactionLogIntf> caseTransactionLogProvider;

	@Inject
	protected ProductDeliveryDAO productDeliveryDAO;

	@Inject
	protected ApplicationDAO applicationDAO;

	@Inject
	private Map<PRODUCTTYPEEntry, MOLSAMilestoneDeliveryCreator> milestoneDeliveryCreator;

	private EvidenceDescriptor evidenceDescriptorObj;

	private static Map<PRODUCTTYPEEntry, Long> certEndMSConfig = new HashMap<PRODUCTTYPEEntry, Long>();
	static {
		certEndMSConfig.put(PRODUCTTYPEEntry.ANONYMOUSPARENTS, 45019L);
		certEndMSConfig.put(PRODUCTTYPEEntry.DESERTEDWIFE, 45013L);
		certEndMSConfig.put(PRODUCTTYPEEntry.DIVORCEDLADY, 45010L);
		certEndMSConfig.put(PRODUCTTYPEEntry.FAMILYINNEED, 45014L);
		certEndMSConfig.put(PRODUCTTYPEEntry.FAMILYOFMISSING, 45015L);
		certEndMSConfig.put(PRODUCTTYPEEntry.FAMILYOFPRISONER, 45011L);
		certEndMSConfig.put(PRODUCTTYPEEntry.HANDICAP, 45009L);
		certEndMSConfig.put(PRODUCTTYPEEntry.INCAPABLEOFWORKING, 45005L);
		certEndMSConfig.put(PRODUCTTYPEEntry.MAIDALLOWANCE, 45012L);
		certEndMSConfig.put(PRODUCTTYPEEntry.ORPHAN, 45018L);
		certEndMSConfig.put(PRODUCTTYPEEntry.SENIORCITIZEN, 45017l);
		certEndMSConfig.put(PRODUCTTYPEEntry.WIDOW, 45016L);
		certEndMSConfig.put(PRODUCTTYPEEntry.MOLSADETERMINEPRODUCT, 45020l);

	}

	/**
	 * Default constructor for the class.
	 */
	public MOLSAMaintainProductDelivery() {
		GuiceWrapper.getInjector().injectMembers(this);

		evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();
	}

	@Override
	/**
	 * Submits the product delivery case for approval.
	 * 
	 * @param submitForApprovalKey
	 *            Contains a case identifier.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	public void submitPDCForApproval(SubmitForApprovalKey submitForApprovalKey)
			throws AppException, InformationalException {

		CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();
		CaseEvidenceReadNearestEvidenceKey caseEvidenceReadNearestEvidenceKey = new CaseEvidenceReadNearestEvidenceKey();
		CaseEvidence caseEvidenceObj = CaseEvidenceFactory.newInstance();
		CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
		UniqueID uniqueIDObj = UniqueIDFactory.newInstance();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		ProductDelivery productDeliveryObj = ProductDeliveryFactory
				.newInstance();
		CaseStatusKey caseStatusKey = new CaseStatusKey();
		ProductKey productKey = new ProductKey();
		Product productObj = ProductFactory.newInstance();
		CaseSearchKey caseSearchKey = new CaseSearchKey();
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();
		ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
		CachedCaseHeader cachedCaseHeader = CachedCaseHeaderFactory
				.newInstance();
		final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
		SystemUser systemUserObj = SystemUserFactory.newInstance();
		CaseEvidenceDtls caseEvidenceDtls;

		// Check the database access security.
		DataBasedSecurity dataBasedSecurity = SecurityImplementationFactory
				.get();
		CaseSecurityCheckKey caseSecurityCheckKey = new CaseSecurityCheckKey();
		caseSecurityCheckKey.caseID = submitForApprovalKey.caseID;
		caseSecurityCheckKey.type = CuramConst.gkOne;
		DataBasedSecurityResult dataBasedSecurityResult = dataBasedSecurity
				.checkCaseSecurity1(caseSecurityCheckKey);
		if (!dataBasedSecurityResult.result) {
			if (dataBasedSecurityResult.readOnly) {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_READONLY_RIGHTS);
			}
			if (dataBasedSecurityResult.restricted) {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_RIGHTS);
			} else {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_ACCESS_RIGHTS);
			}
		}

		currentCaseStatusKey.assign(submitForApprovalKey);
		currentCaseStatusKey.nullDate = Date.kZeroDate;
		caseEvidenceReadNearestEvidenceKey.caseID = submitForApprovalKey.caseID;
		caseEvidenceReadNearestEvidenceKey.effectiveFrom = Date
				.getCurrentDate();

		try {
			caseEvidenceDtls = caseEvidenceObj
					.readNearestEvidence(caseEvidenceReadNearestEvidenceKey);

			if (caseEvidenceDtls.statusCode.equals(EVIDENCESTATUS.UNAPPROVED)) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.throwWithLookup(
								new AppException(
										BPOPRODUCTDELIVERYAPPROVAL.ERR_APPROVALELIGIBILITY_XRV_UNAPPROVEDEVIDENCE),
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}
		} catch (final RecordNotFoundException e) {
		}

		CaseStatusDtls caseStatusDtls = caseStatusObj
				.readCurrentStatusByCaseID1(currentCaseStatusKey);
		if (caseStatusDtls.statusCode.equals(CASESTATUS.APPROVED)) {
			ValidationManagerFactory
					.getManager()
					.throwWithLookup(
							new AppException(
									BPOPRODUCTDELIVERYAPPROVAL.ERR_APPROVE_CASE_FV_APPROVED),
							"a", 0);
		}
		if (!caseStatusDtls.statusCode.equals(CASESTATUS.OPEN)) {
			ValidationManagerFactory
					.getManager()
					.throwWithLookup(
							new AppException(
									BPOPRODUCTDELIVERYAPPROVAL.ERR_APPROVE_CASE_FV_ACTIVE));
		}

		caseStatusKey.caseStatusID = caseStatusDtls.caseStatusID;
		caseStatusDtls.endDate = TransactionInfo.getSystemDate();
		caseStatusDtls.endDateTime = TransactionInfo.getSystemDateTime();
		caseStatusObj.modify(caseStatusKey, caseStatusDtls);

		caseStatusDtls.comments = CuramConst.gkEmpty;
		caseStatusDtls.assign(submitForApprovalKey);
		caseStatusDtls.statusCode = CASESTATUS.COMPLETED;
		caseStatusDtls.startDate = TransactionInfo.getSystemDate();
		caseStatusDtls.endDate = Date.kZeroDate;
		caseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
		caseStatusDtls.userName = systemUserObj.getUserDetails().userName;
		caseStatusObj.insert(caseStatusDtls);

		caseHeaderKey.caseID = submitForApprovalKey.caseID;
		CaseHeaderDtls caseHeaderDtls = cachedCaseHeader.read(caseHeaderKey);
		caseHeaderDtls.statusCode = CASESTATUS.COMPLETED;
		cachedCaseHeader.modify(caseHeaderKey, caseHeaderDtls);

		// Invoke the work flow
		concernRoleKey.concernRoleID = caseHeaderDtls.concernRoleID;
		ConcernRoleDtls concernRoleDtls = concernRoleObj.read(concernRoleKey);
		productDeliveryKey.caseID = submitForApprovalKey.caseID;
		ProductDeliveryDtls productDeliveryDtls = productDeliveryObj
				.read(productDeliveryKey);
		productKey.productID = productDeliveryDtls.productID;
		ProductDtls productDtls = productObj.read(productKey);
		AppException subjectMsg = new AppException(
				BPOROUTEPRODUCTDELIVERYAPPROVAL.INF_CASE_SUBMITTED_TICKET);
		caseSearchKey.caseID = submitForApprovalKey.caseID;
		CaseReference caseReference = caseHeaderObj.readCaseReferenceByCaseID(
				caseSearchKey, false);
		String productName = CodeTable.getOneItem(PRODUCTNAME.TABLENAME,
				productDtls.name, TransactionInfo.getProgramLocale());
		subjectMsg.arg(caseReference.caseReference);
		subjectMsg.arg(productName);
		subjectMsg.arg(concernRoleDtls.concernRoleName);

		AppException rejectMessage = new AppException(
				BPOPRODUCTDELIVERYAPPROVAL.INF_CASE_APPROVAL_REJECTED_TICKET);
		rejectMessage.arg(caseReference.caseReference);
		rejectMessage.arg(productName);
		rejectMessage.arg(concernRoleDtls.concernRoleName);

		taskCreateDetails.caseID = submitForApprovalKey.caseID;
		taskCreateDetails.subject = subjectMsg.getMessage(TransactionInfo
				.getProgramLocale());
		taskCreateDetails.comments = rejectMessage.getMessage(TransactionInfo
				.getProgramLocale());
		enactmentStructs.add(taskCreateDetails);
		EnactmentService.startProcessInV3CompatibilityMode(
				MOLSAConstants.kPDCApprovalWorkFlow, enactmentStructs);

		if (submitForApprovalKey != null && submitForApprovalKey.caseID != 0L) {
			MaintainCase maintainCaseObj = MaintainCaseFactory.newInstance();
			CaseIDKey caseIDKey = new CaseIDKey();
			caseIDKey.caseID = submitForApprovalKey.caseID;
			CaseReferenceProductNameConcernRoleName caseReferenceProductNameConcernRoleName = maintainCaseObj
					.readCaseReferenceConcernRoleNameProductNameByCaseID(caseIDKey);
			LocalisableString txndescription = (new LocalisableString(
					BPOCASEEVENTS.PRODUCTDELIVERY_SUBMITTED))
					.arg(caseReferenceProductNameConcernRoleName.productName)
					.arg(caseReferenceProductNameConcernRoleName.caseReference)
					.arg(caseReferenceProductNameConcernRoleName.concernRoleName);
			((CaseTransactionLogIntf) caseTransactionLogProvider.get())
					.recordCaseTransaction(
							CASETRANSACTIONEVENTS.PRODUCTDELIVERY_SUBMIT,
							txndescription, submitForApprovalKey.caseID, 0L);
		}
	}

	/**
	 * Rejects the task which was generated as part of the product delivery case
	 * for approval.
	 * 
	 * @param submitForApprovalKey
	 *            Contains a case identifier.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public void rejectPDCApprovalTask(SubmitForApprovalKey submitForApprovalKey)
			throws AppException, InformationalException {

		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		SystemUser systemUserObj = SystemUserFactory.newInstance();
		DataBasedSecurity dataBasedSecurity = SecurityImplementationFactory
				.get();
		CaseSecurityCheckKey caseSecurityCheckKey = new CaseSecurityCheckKey();
		caseSecurityCheckKey.caseID = submitForApprovalKey.caseID;
		caseSecurityCheckKey.type = 2;
		DataBasedSecurityResult dataBasedSecurityResult = dataBasedSecurity
				.checkCaseSecurity1(caseSecurityCheckKey);
		if (!dataBasedSecurityResult.result) {
			if (dataBasedSecurityResult.readOnly) {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_READONLY_RIGHTS);
			}
			if (dataBasedSecurityResult.restricted) {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_RIGHTS);
			} else {
				throw new AppException(
						GENERALCASE.ERR_CASESECURITY_CHECK_ACCESS_RIGHTS);
			}
		}
		caseHeaderKey.caseID = submitForApprovalKey.caseID;
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();
		concernRoleKey.concernRoleID = caseHeaderDtls.concernRoleID;
		if (!caseHeaderDtls.statusCode.equals(CASESTATUS.COMPLETED)) {
			ValidationManagerFactory
					.getManager()
					.throwWithLookup(
							new AppException(
									BPOPRODUCTDELIVERYAPPROVAL.ERR_CASEREJECT_FV_CASESTATUS));
		}
		CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

		CaseStatusDtls mdfCaseStatusDtls = new CaseStatusDtls();
		CaseStatusDtls insCaseStatusDtls = new CaseStatusDtls();
		CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
		CaseStatusKey mdfCaseStatusKey = new CaseStatusKey();
		UniqueID uniqueIDObj = UniqueIDFactory.newInstance();

		caseHeaderDtls.statusCode = CASESTATUS.OPEN;
		caseHeaderObj.modify(caseHeaderKey, caseHeaderDtls);
		currentCaseStatusKey.caseID = submitForApprovalKey.caseID;
		currentCaseStatusKey.nullDate = Date.kZeroDate;
		CaseStatusDtls caseStatusDtls = caseStatusObj
				.readCurrentStatusByCaseID1(currentCaseStatusKey);
		mdfCaseStatusDtls.assign(caseStatusDtls);
		mdfCaseStatusDtls.endDate = TransactionInfo.getSystemDate();
		mdfCaseStatusDtls.endDateTime = TransactionInfo.getSystemDateTime();
		mdfCaseStatusKey.caseStatusID = caseStatusDtls.caseStatusID;
		caseStatusObj.modify(mdfCaseStatusKey, mdfCaseStatusDtls);
		insCaseStatusDtls.caseID = submitForApprovalKey.caseID;
		insCaseStatusDtls.statusCode = CASESTATUS.OPEN;
		insCaseStatusDtls.startDate = TransactionInfo.getSystemDate();
		insCaseStatusDtls.endDate = Date.kZeroDate;
		insCaseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
		insCaseStatusDtls.userName = systemUserObj.getUserDetails().userName;
		insCaseStatusDtls.comments = "";
		caseStatusObj.insert(insCaseStatusDtls);

		// Update the transaction log.
		if (submitForApprovalKey != null && submitForApprovalKey.caseID != 0L) {
			MaintainCase maintainCaseObj = MaintainCaseFactory.newInstance();
			CaseIDKey caseIDKey = new CaseIDKey();
			caseIDKey.caseID = submitForApprovalKey.caseID;
			CaseReferenceProductNameConcernRoleName caseReferenceProductNameConcernRoleName = maintainCaseObj
					.readCaseReferenceConcernRoleNameProductNameByCaseID(caseIDKey);
			LocalisableString txndescription = (new LocalisableString(
					BPOCASEEVENTS.PRODUCTDELIVERY_REJECTED))
					.arg(caseReferenceProductNameConcernRoleName.productName)
					.arg(caseReferenceProductNameConcernRoleName.caseReference)
					.arg(caseReferenceProductNameConcernRoleName.concernRoleName);
			((CaseTransactionLogIntf) caseTransactionLogProvider.get())
					.recordCaseTransaction(
							CASETRANSACTIONEVENTS.PRODUCTDELIVERY_REJECT,
							txndescription, submitForApprovalKey.caseID, 0L);
		}

		Event eventKey = new Event();
		eventKey.eventKey.eventClass = MOLSAAPPROVALTASK.PDCAPPROVALREJECTED.eventClass;
		eventKey.eventKey.eventType = MOLSAAPPROVALTASK.PDCAPPROVALREJECTED.eventType;
		eventKey.primaryEventData = submitForApprovalKey.caseID;
		EventService.raiseEvent(eventKey);

	}

	/**
	 * Approve the product delivery case which was submitted for approval and
	 * creates Milestone delivery if configured for the Product.
	 * 
	 * @param key
	 *            Contains a case identifier.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public void approve(ProductDeliveryApprovalKey1 key) throws AppException,
			InformationalException {

		ArrayList<Date> datelist = new ArrayList<Date>();

		curam.core.facade.intf.ProductDelivery productDelivery = curam.core.facade.fact.ProductDeliveryFactory
				.newInstance();
		ProductDeliveryApprovalKey productdeliveryapprovalkey = new ProductDeliveryApprovalKey();
		productdeliveryapprovalkey.caseID = key.caseID;
		productDelivery.approve(productdeliveryapprovalkey);

		// Update the certification period.

		// Update the certification period Only for Molsa Cases.
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		productDeliveryKey.caseID = key.caseID;
		ProductDeliveryTypeDetails productDeliveryTypeDetails = productDelivery
				.readProductType(productDeliveryKey);

		if (productDeliveryTypeDetails.productType
				.equals(PRODUCTTYPE.INCAPABLEOFWORKING)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.HANDICAP)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.DIVORCEDLADY)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.FAMILYOFPRISONER)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.MAIDALLOWANCE)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.DESERTEDWIFE)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.FAMILYINNEED)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.FAMILYOFMISSING)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.WIDOW)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.SENIORCITIZEN)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.ORPHAN)
				|| productDeliveryTypeDetails.productType
						.equals(PRODUCTTYPE.ANONYMOUSPARENTS)) {

			IntegratedCase integratedCaseObj = IntegratedCaseFactory
					.newInstance();
			CertificationCaseIDKey caseIDKey = new CertificationCaseIDKey();
			caseIDKey.caseID = key.caseID;
			ListICProductDeliveryCertDetailsAndVersionNo certificationsList = integratedCaseObj
					.listProductDeliveryCertificationAndVersionNo(caseIDKey);

			if (CuramConst.gkZero == certificationsList.dtls.size()) {

				MaintainCertification maintainCertificationObj = MaintainCertificationFactory
						.newInstance();
				Calendar calendar = Calendar.getInstance();
				Date certificationStartDate = new Date();
				Date certificationEndDate = new Date();
				int currentDayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
				String paymentDateString = Configuration
						.getProperty(EnvVars.ENV_MOLSA_PAYMENT_DATE);
				int paymentDate = Integer.parseInt(paymentDateString);

				MaintainCertificationDetails maintainCertificationDetails = new MaintainCertificationDetails();

				if (currentDayOfMonth > paymentDate) {
					int nextMonth = calendar.get(Calendar.MONTH) + 1;
					int year = calendar.get(Calendar.YEAR);
					Calendar cal = Calendar.getInstance();
					cal.clear();
					cal.set(Calendar.YEAR, year);
					cal.set(Calendar.MONTH, nextMonth);
					cal.set(Calendar.DAY_OF_MONTH, 1);
					certificationStartDate = new Date(cal.getTimeInMillis());

					// Update the certification end date.
					Calendar cal1 = Calendar.getInstance();
					cal1.add(Calendar.YEAR, 1);
					cal1.add(Calendar.MONTH, 1);
					cal1.set(Calendar.DAY_OF_MONTH, 1);
					cal1.add(Calendar.DATE, -1);
					certificationEndDate = new Date(cal1.getTimeInMillis());

				} else {
					calendar.set(Calendar.DAY_OF_MONTH, 1);
					certificationStartDate = new Date(
							calendar.getTimeInMillis());

					// Update the certification end date.
					Calendar cal1 = Calendar.getInstance();
					cal1.add(Calendar.YEAR, 1);
					cal1.set(Calendar.DAY_OF_MONTH, 1);
					cal1.add(Calendar.DATE, -1);
					certificationEndDate = new Date(cal1.getTimeInMillis());

				}

				maintainCertificationDetails.periodFromDate = certificationStartDate;
				maintainCertificationDetails.caseID = key.caseID;
				maintainCertificationDetails.certificationReceivedDate = Date
						.getCurrentDate();
				maintainCertificationDetails.periodToDate = certificationEndDate;
				maintainCertificationObj
						.createCertification(maintainCertificationDetails);
				curam.piwrapper.caseheader.impl.ProductDelivery productDelivery1 = productDeliveryDAO
						.get(key.caseID);
				MOLSAMilestoneDeliveryCreator deliveryCreator = milestoneDeliveryCreator
						.get(productDelivery1.getProductType());
				if (null != deliveryCreator) {
					deliveryCreator.createMilestoneDelivery(key.caseID);
				}

				createCertificationEndPriorMilestone(certificationStartDate,
						certificationEndDate, key.caseID);

			}
			Event event = new Event();
			event.eventKey.eventClass = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventClass;
			event.eventKey.eventType = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventType;
			event.primaryEventData = key.caseID;
			EventService.raiseEvent(event);

			MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
			MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();

			Long caseID = productDeliveryDAO.get(key.caseID).getParentCase()
					.getID();
			List<Application> applications = applicationDAO
					.searchByCaseID(caseID);
			Application application = applications.get(0);
			String applicationID = application.getReference();
			AppException msg = new AppException(
					MOLSASMSSERVICE.APPLICATIONAPPROVED);
			msg.arg(applicationID);
			String message = msg.getLocalizedMessage();

			// Construct the input details
			concernRoleListAndMessageTextDetails.dtls.smsMessageText = message;
			Long concernRoleID = productDeliveryDAO.get(key.caseID)
					.getConcernRole().getID();
			concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
					.valueOf(concernRoleID);
			// Need to point to the right template
			concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.APPLICATIONAPPROVED;
			molsasmsUtilObj.sendSMS(concernRoleListAndMessageTextDetails);

		} else if(productDeliveryTypeDetails.productType
				.equals(PRODUCTTYPE.MOLSADETERMINEPRODUCT)){
			//TODO code duplication, refactor to remove duplication.
			Long caseID = productDeliveryDAO.get(key.caseID).getParentCase()
					.getID();
			final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
			evidenceTypeKey.evidenceType = CASEEVIDENCE.EXCEPTIONAL;

			final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
					.instance(evidenceTypeKey, Date.getCurrentDate());
			CaseKey caseKey = new CaseKey();
			caseKey.caseID = productDeliveryDAO.get(key.caseID).getParentCase()
					.getID();
			CaseIDEvidenceTypeStatusesKey statusesKey = new CaseIDEvidenceTypeStatusesKey();
			statusesKey.caseID = productDeliveryDAO.get(key.caseID)
					.getParentCase().getID();
			statusesKey.evidenceType = CASEEVIDENCE.EXCEPTIONAL;
			statusesKey.statusCode1 = EVIDENCEDESCRIPTORSTATUS.ACTIVE;
			statusesKey.statusCode2 = EVIDENCEDESCRIPTORSTATUS.INEDIT;
			EvidenceDescriptorKeyList keyList = evidenceDescriptorObj
					.searchActiveInEditByCaseIDAndType(statusesKey);

			EvidenceCaseKey evidenceCaseKey = null;

			for (final EvidenceDescriptorKey descriptorKey : keyList.dtls) {
				evidenceCaseKey = new EvidenceCaseKey();
				evidenceCaseKey.evidenceKey.evType = evidenceTypeKey.evidenceType;
				evidenceCaseKey.caseIDKey.caseID = caseKey.caseID;
				evidenceCaseKey.evidenceKey.evidenceID = evidenceDescriptorObj
						.read(descriptorKey).relatedID;

				final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
						.readEvidence(evidenceCaseKey);

				final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;

				if (null != dynamicEvidenceDataDetails.getAttribute(kendDate)
						.getValue()
						&& !dynamicEvidenceDataDetails.getAttribute(kendDate)
								.getValue().equals("")) {
					final Date enddate1 = Date
							.fromISO8601(dynamicEvidenceDataDetails
									.getAttribute(kendDate).getValue());

					datelist.add(enddate1);

				}

			}

			Collections.sort(datelist);
			Date endDate = Date.kZeroDate;
			for (Date date : datelist) {
				if (Date.getCurrentDate().before(date)) {
					endDate = date;
					break;
				}
			}

			IntegratedCase integratedCaseObj = IntegratedCaseFactory
					.newInstance();
			CertificationCaseIDKey caseIDKey = new CertificationCaseIDKey();
			caseIDKey.caseID = key.caseID;
			ListICProductDeliveryCertDetailsAndVersionNo certificationsList = integratedCaseObj
					.listProductDeliveryCertificationAndVersionNo(caseIDKey);

			if (CuramConst.gkZero == certificationsList.dtls.size()) {

				MaintainCertification maintainCertificationObj = MaintainCertificationFactory
						.newInstance();
				Calendar calendar = Calendar.getInstance();
				Date certificationStartDate = new Date();
				Date certificationEndDate = new Date();
				int currentDayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
				String paymentDateString = Configuration
						.getProperty(EnvVars.ENV_MOLSA_PAYMENT_DATE);
				int paymentDate = Integer.parseInt(paymentDateString);

				MaintainCertificationDetails maintainCertificationDetails = new MaintainCertificationDetails();

				if (currentDayOfMonth > paymentDate) {
					int nextMonth = calendar.get(Calendar.MONTH) + 1;
					int year = calendar.get(Calendar.YEAR);
					Calendar cal = Calendar.getInstance();
					cal.clear();
					cal.set(Calendar.YEAR, year);
					cal.set(Calendar.MONTH, nextMonth);
					cal.set(Calendar.DAY_OF_MONTH, 1);
					certificationStartDate = new Date(cal.getTimeInMillis());

					if (endDate.isZero()) {
						Calendar cal1 = certificationStartDate.getCalendar();
						cal1.add(Calendar.YEAR, 1);
						cal1.set(Calendar.DAY_OF_MONTH, 1);
						cal1.add(Calendar.DATE, -1);
						certificationEndDate = new Date(cal1.getTimeInMillis());
					} else {
						// Update the certification end date.
						certificationEndDate = new Date(endDate.getCalendar()
								.getTimeInMillis());
					}

				} else {
					calendar.set(Calendar.DAY_OF_MONTH, 1);
					certificationStartDate = new Date(
							calendar.getTimeInMillis());

					// Update the certification end date.
					Calendar cal1 = Calendar.getInstance();
					cal1.add(Calendar.YEAR, 1);
					cal1.set(Calendar.DAY_OF_MONTH, 1);
					cal1.add(Calendar.DATE, -1);
					certificationEndDate = new Date(cal1.getTimeInMillis());

				}

				maintainCertificationDetails.periodFromDate = certificationStartDate;
				maintainCertificationDetails.caseID = key.caseID;
				maintainCertificationDetails.certificationReceivedDate = Date
						.getCurrentDate();
				maintainCertificationDetails.periodToDate = certificationEndDate;
				maintainCertificationObj
						.createCertification(maintainCertificationDetails);
				curam.piwrapper.caseheader.impl.ProductDelivery productDelivery1 = productDeliveryDAO
						.get(key.caseID);
				MOLSAMilestoneDeliveryCreator deliveryCreator = milestoneDeliveryCreator
						.get(productDelivery1.getProductType());
				if (null != deliveryCreator) {
					deliveryCreator.createMilestoneDelivery(key.caseID);
				}

				createCertificationEndPriorMilestone(certificationStartDate,
						certificationEndDate, key.caseID);

			}
			Event event = new Event();
			event.eventKey.eventClass = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventClass;
			event.eventKey.eventType = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventType;
			event.primaryEventData = key.caseID;
			EventService.raiseEvent(event);

			MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
			MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();

			Long caseID1 = productDeliveryDAO.get(key.caseID).getParentCase()
					.getID();
			List<Application> applications = applicationDAO
					.searchByCaseID(caseID1);
			Application application = applications.get(0);
			String applicationID = application.getReference();
			AppException msg = new AppException(
					MOLSASMSSERVICE.APPLICATIONAPPROVED);
			msg.arg(applicationID);
			String message = msg.getLocalizedMessage();

			// Construct the input details
			concernRoleListAndMessageTextDetails.dtls.smsMessageText = message;
			Long concernRoleID = productDeliveryDAO.get(key.caseID)
					.getConcernRole().getID();
			concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
					.valueOf(concernRoleID);
			// Need to point to the right template
			concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.APPLICATIONAPPROVED;
			molsasmsUtilObj.sendSMS(concernRoleListAndMessageTextDetails);

		}

	}

	/**
	 * Creates Milestone till 1 month prior to Certification end date for the
	 * specified Product delivery case.
	 * 
	 * @param certEndDate
	 *            Certification End Date
	 * @param caseID
	 *            Case ID
	 * @throws AppException
	 * @throws InformationalException
	 */
	private void createCertificationEndPriorMilestone(Date certStartDate,
			Date certEndDate, long caseID) throws AppException,
			InformationalException {
		// Create milestone for Certification End date prior
		// notification
		Calendar cal2 = certEndDate.getCalendar();
		cal2.add(Calendar.MONTH, -1);
		Date certPriorEndDate = new Date(cal2);
		final MilestoneDelivery milestoneDeliveryObj = MilestoneDeliveryFactory
				.newInstance();
		MilestoneDeliveryDtls milestoneDeliveryDtls = new MilestoneDeliveryDtls();
		milestoneDeliveryDtls.dtls.caseID = caseID;
		milestoneDeliveryDtls.dtls.milestoneConfigurationID = certEndMSConfig
				.get(productDeliveryDAO.get(caseID).getProductType());

		milestoneDeliveryDtls.dtls.expectedEndDate = certPriorEndDate;
		milestoneDeliveryDtls.dtls.ownerUserName = TransactionInfo
				.getProgramUser();
		milestoneDeliveryDtls.dtls.createdBySystem = true;
		milestoneDeliveryDtls.dtls.status = MILESTONESTATUSCODEEntry.INPROGRESS
				.getCode();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

		caseHeaderKey.caseID = caseID;

		CaseStartDate caseStartDate = CaseHeaderFactory.newInstance()
				.readStartDate(caseHeaderKey);
		MilestoneConfigurationKey milestoneConfigurationKey = new MilestoneConfigurationKey();

		milestoneConfigurationKey.milestoneConfigurationID = milestoneDeliveryDtls.dtls.milestoneConfigurationID;
		EarliestStartDay earliestStartDay = MilestoneConfigurationFactory
				.newInstance().readEarliestStartDay(milestoneConfigurationKey);
		Date earliestStartDate = caseStartDate.startDate
				.addDays(earliestStartDay.earliestStartDay);
		if (certStartDate.after(earliestStartDate)) {
			earliestStartDate = certStartDate;
		}
		milestoneDeliveryDtls.dtls.expectedStartDate = earliestStartDate;
		milestoneDeliveryDtls.dtls.actualStartDate = earliestStartDate;

		milestoneDeliveryObj.create(milestoneDeliveryDtls);
	}

}
