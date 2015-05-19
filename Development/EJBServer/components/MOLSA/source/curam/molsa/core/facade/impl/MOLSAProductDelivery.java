package curam.molsa.core.facade.impl;

import java.util.Calendar;
import java.util.Map;

import com.google.inject.Inject;

import curam.codetable.CASECLOSEREASON;
import curam.codetable.CASESTATUS;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.impl.CASECLOSEREASONEntry;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.fact.ProductDeliveryFactory;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.CloseCaseDetails;
import curam.core.facade.struct.CreateCertificationDetails;
import curam.core.facade.struct.InformationMsgDtlsList;
import curam.core.facade.struct.MaintainCertificationDetails;
import curam.core.facade.struct.ReactivationDetails;
import curam.core.facade.struct.RejectCaseKey_fo1;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.CaseStatusFactory;
import curam.core.fact.SystemUserFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.CaseStatus;
import curam.core.intf.SystemUser;
import curam.core.intf.UniqueID;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseStatusDtls;
import curam.core.struct.CaseStatusKey;
import curam.core.struct.CurrentCaseStatusKey;
import curam.core.struct.InformationalMsgDtls;
import curam.core.struct.ProductDeliveryApprovalKey1;
import curam.core.struct.ReactivationDtls;
import curam.events.MOLSAAPPROVALTASK;
import curam.message.BPOPRODUCTDELIVERYAPPROVAL;
import curam.message.MOLSANOTIFICATION;
import curam.message.MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.core.sl.fact.MOLSAMaintainProductDeliveryFactory;
import curam.molsa.core.sl.impl.MOLSAMilestoneDeliveryCreator;
import curam.molsa.core.sl.intf.MOLSAMaintainProductDelivery;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAMessageText;
import curam.molsa.sms.sl.struct.MOLSAMessageTextKey;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.events.impl.EventService;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.workflow.impl.EnactmentService;
import curam.verification.sl.infrastructure.fact.VerificationFactory;

/**
 * Facade class used to perform the operations related to MOLSA Product delivery
 * approval process.
 */
public abstract class MOLSAProductDelivery extends
		curam.molsa.core.facade.base.MOLSAProductDelivery {

	@Inject
	protected ProductDeliveryDAO productDeliveryDAO;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	private IntegratedCaseDAO integratedCaseDAO;

	@Inject
	private Map<PRODUCTTYPEEntry, MOLSAMilestoneDeliveryCreator> milestoneDeliveryCreator;

	public MOLSAProductDelivery() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

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

		curam.core.struct.SubmitForApprovalKey submitForApprovalKeyStruct = new curam.core.struct.SubmitForApprovalKey();
		submitForApprovalKeyStruct.caseID = submitForApprovalKey.caseID;
		MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory
				.newInstance();
		productDeliveryFactoryObj
				.submitPDCForApproval(submitForApprovalKeyStruct);
	}

	@Override
	public InformationMsgDtlsList createCertification(
			CreateCertificationDetails details) throws AppException,
			InformationalException {
		
		curam.core.intf.CaseHeader caseHeaderObj = CaseHeaderFactory
				.newInstance();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		caseHeaderKey.caseID = details.caseID;

		CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

		if (CASESTATUS.ACTIVE.equals(caseHeaderDtls.statusCode)) {
			CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

			CaseStatusDtls mdfCaseStatusDtls = new CaseStatusDtls();
			CaseStatusDtls insCaseStatusDtls = new CaseStatusDtls();
			CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
			CaseStatusKey mdfCaseStatusKey = new CaseStatusKey();
			UniqueID uniqueIDObj = UniqueIDFactory.newInstance();

			caseHeaderDtls.statusCode = CASESTATUS.OPEN;
			caseHeaderObj.modify(caseHeaderKey, caseHeaderDtls);
			currentCaseStatusKey.caseID = details.caseID;
			currentCaseStatusKey.nullDate = Date.kZeroDate;
			CaseStatusDtls caseStatusDtls = caseStatusObj
					.readCurrentStatusByCaseID1(currentCaseStatusKey);
			mdfCaseStatusDtls.assign(caseStatusDtls);
			mdfCaseStatusDtls.endDate = TransactionInfo.getSystemDate();
			mdfCaseStatusDtls.endDateTime = TransactionInfo.getSystemDateTime();
			mdfCaseStatusKey.caseStatusID = caseStatusDtls.caseStatusID;
			caseStatusObj.modify(mdfCaseStatusKey, mdfCaseStatusDtls);
			insCaseStatusDtls.caseID = details.caseID;
			insCaseStatusDtls.statusCode = CASESTATUS.OPEN;
			insCaseStatusDtls.startDate = TransactionInfo.getSystemDate();
			insCaseStatusDtls.endDate = Date.kZeroDate;
			insCaseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
			SystemUser systemUserObj = SystemUserFactory.newInstance();
			insCaseStatusDtls.userName = systemUserObj.getUserDetails().userName;
			insCaseStatusDtls.comments = "";
			caseStatusObj.insert(insCaseStatusDtls);
			
			//Invoke the workflow which generates the task to financial auditor.
			final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
			TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
			taskCreateDetails.caseID = details.caseID;
			IntegratedCase integratedCase = integratedCaseDAO
					.get(taskCreateDetails.caseID);

			LocalisableString subject = null;

			subject = new LocalisableString(
					MOLSANOTIFICATION.INF_READY_FOR_FINAUDITOR_REVIEW);
			subject.arg(integratedCase.getCaseReference());

			String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
					productDeliveryDAO.get(taskCreateDetails.caseID)
							.getProductType().getCode(),
					TransactionInfo.getProgramLocale());
			subject.arg(productName);
			subject.arg(integratedCase.getConcernRole().getName());

			taskCreateDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());

			enactmentStructs.add(taskCreateDetails);
			EnactmentService.startProcessInV3CompatibilityMode(
					MOLSAConstants.kMOLSAProductDeliveryOpenTask, enactmentStructs);
			
		}
		// create return object.
		final InformationMsgDtlsList informationMsgDtlsList = new InformationMsgDtlsList();

		// MaintainCertification manipulation variables
		final curam.core.intf.MaintainCertification maintainCertificationObj = curam.core.fact.MaintainCertificationFactory
				.newInstance();
		final curam.core.struct.MaintainCertificationDetails maintainCertificationDetails = new curam.core.struct.MaintainCertificationDetails();

		// Assign certification details
		maintainCertificationDetails.assign(details);

		// Call MaintainCertification BPO to create the certification
		maintainCertificationObj
				.createCertification(maintainCertificationDetails);

		curam.piwrapper.caseheader.impl.ProductDelivery productDelivery = productDeliveryDAO
				.get(details.caseID);
		MOLSAMilestoneDeliveryCreator deliveryCreator = milestoneDeliveryCreator
				.get(productDelivery.getProductType());
		if (null != deliveryCreator) {
			deliveryCreator.createMilestoneDelivery(details.caseID);
		}

		createCertificationEndPriorMilestone(details.periodToDate,
				details.caseID);

		
		final curam.util.exception.InformationalManager informationalManager = curam.util.transaction.TransactionInfo
				.getInformationalManager();

		final String[] warnings = informationalManager
				.obtainInformationalAsString();

		for (int i = 0; i < warnings.length; i++) {

			final InformationalMsgDtls informationalMsgDtls = new InformationalMsgDtls();

			informationalMsgDtls.informationMsgTxt = warnings[i];
			informationMsgDtlsList.informationalMsgDtlsList.dtls
					.addRef(informationalMsgDtls);
		}

		// return all informational messages
		return informationMsgDtlsList;
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
	private void createCertificationEndPriorMilestone(Date certEndDate,
			long caseID) throws AppException, InformationalException {
		// Create milestone for Certification End date prior
		// notification
		Calendar cal2 = certEndDate.getCalendar();
		cal2.add(Calendar.MONTH, -1);
		Date certPriorEndDate = new Date(cal2);
		final MilestoneDelivery milestoneDeliveryObj = MilestoneDeliveryFactory
				.newInstance();
		MilestoneDeliveryDtls milestoneDeliveryDtls = new MilestoneDeliveryDtls();
		milestoneDeliveryDtls.dtls.caseID = caseID;
		milestoneDeliveryDtls.dtls.milestoneConfigurationID = 45005L;
		milestoneDeliveryDtls.dtls.expectedStartDate = Date.getCurrentDate();
		milestoneDeliveryDtls.dtls.actualStartDate = Date.getCurrentDate();
		milestoneDeliveryDtls.dtls.expectedEndDate = certPriorEndDate;
		milestoneDeliveryDtls.dtls.ownerUserName = TransactionInfo
				.getProgramUser();
		milestoneDeliveryDtls.dtls.createdBySystem = true;
		milestoneDeliveryDtls.dtls.status = MILESTONESTATUSCODEEntry.INPROGRESS
				.getCode();
		milestoneDeliveryObj.create(milestoneDeliveryDtls);
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

	public void rejectPDCApprovalTask(SubmitForApprovalKey submitForApprovalKey)
			throws AppException, InformationalException {
		curam.core.struct.SubmitForApprovalKey submitForApprovalKeyStruct = new curam.core.struct.SubmitForApprovalKey();
		submitForApprovalKeyStruct.caseID = submitForApprovalKey.caseID;
		MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory
				.newInstance();
		productDeliveryFactoryObj
				.rejectPDCApprovalTask(submitForApprovalKeyStruct);

	}

	/**
	 * Approve the product delivery case which was submitted for approval.
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

	public void approve(SubmitForApprovalKey submitForApprovalKey)
			throws AppException, InformationalException {

		MOLSAMaintainProductDelivery productDeliveryFactoryObj = MOLSAMaintainProductDeliveryFactory
				.newInstance();
		ProductDeliveryApprovalKey1 key = new ProductDeliveryApprovalKey1();
		key.caseID = submitForApprovalKey.caseID;
		CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
		caseKeyStruct.caseID = submitForApprovalKey.caseID;
		if (VerificationFactory.newInstance()
				.listPDOutstandingCaseVerificationDetails(caseKeyStruct).dtls
				.size() > 0) {
			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_CLEAR_OUTSTANDING_VERIFICATION);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}

		productDeliveryFactoryObj.approve(key);
	}

	@Override
	public void close(CloseCaseDetails details) throws AppException,
			InformationalException {
		ProductDelivery PDObj = ProductDeliveryFactory.newInstance();
		CaseHeader caseHeader = caseHeaderDAO.get(details.caseID);
		PDObj.close(details);
		// SMS Integration
		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		MOLSAMessageTextKey molsaMessageTextKey = new MOLSAMessageTextKey();
		molsaMessageTextKey.dtls.category = MOLSASMSMessageType.NOTIFICATION;
		molsaMessageTextKey.dtls.template = MOLSASMSMESSAGETEMPLATE.APPLICATIONREJECTION;
		MOLSAMessageText messageText = molsasmsUtilObj
				.getSMSMessageText(molsaMessageTextKey);
		MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
		// Construct the input details
		concernRoleListAndMessageTextDetails.dtls.smsMessageText = messageText.dtls.smsMessageText;
		concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
				.valueOf(caseHeader.getConcernRole().getID());
		// Need to point to the right template
		concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.APPLICATIONREJECTION;
		if (details.reasonCode.equals(CASECLOSEREASON.MANAGERREJECTION))
			molsasmsUtilObj.sendSMS(concernRoleListAndMessageTextDetails);

	}

	public void rejectPDCApproval(RejectCaseKey_fo1 key) throws AppException,
			InformationalException {

		final curam.core.intf.ProductDeliveryApproval productDeliveryApprovalObj = curam.core.fact.ProductDeliveryApprovalFactory
				.newInstance();
		final curam.core.struct.ProductDeliveryApprovalKey1 productDeliveryApprovalKey = new curam.core.struct.ProductDeliveryApprovalKey1();

		// Set key to reject product delivery
		productDeliveryApprovalKey.assign(key);

		// Call ProductDeliveryApproval BPO to reject the case
		productDeliveryApprovalObj.reject1(productDeliveryApprovalKey);

		final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		taskCreateDetails.caseID = key.caseID;

		final LocalisableString subject = new LocalisableString(
				BPOPRODUCTDELIVERYAPPROVAL.INF_CASE_APPROVAL_REJECTED_TICKET);
		curam.piwrapper.caseheader.impl.CaseHeader caseHeader = caseHeaderDAO
				.get(key.caseID);

		subject.arg(caseHeader.getCaseReference());

		String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
				productDeliveryDAO.get(key.caseID).getProductType().getCode(),
				TransactionInfo.getProgramLocale());
		subject.arg(productName);
		subject.arg(caseHeader.getConcernRole().getName());

		taskCreateDetails.subject = subject.getMessage(TransactionInfo
				.getProgramLocale());

		enactmentStructs.add(taskCreateDetails);
		EnactmentService.startProcessInV3CompatibilityMode(
				MOLSAConstants.kMOLSAProductDeliveryRejectTask,
				enactmentStructs);
		Event eventKey = new Event();
		eventKey.eventKey.eventClass = MOLSAAPPROVALTASK.PDCAPPROVALREJECTED.eventClass;
		eventKey.eventKey.eventType = MOLSAAPPROVALTASK.PDCAPPROVALREJECTED.eventType;
		eventKey.primaryEventData = key.caseID;
		EventService.raiseEvent(eventKey);

	}

	public void approveCOCPDC(SubmitForApprovalKey submitForApprovalKey)
			throws AppException, InformationalException {
		final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		taskCreateDetails.caseID = submitForApprovalKey.caseID;
		IntegratedCase integratedCase = integratedCaseDAO
				.get(taskCreateDetails.caseID);

		LocalisableString subject = null;

		subject = new LocalisableString(
				MOLSANOTIFICATION.INF_READY_FOR_FINAUDITOR_REVIEW);
		subject.arg(integratedCase.getCaseReference());

		String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
				productDeliveryDAO.get(taskCreateDetails.caseID)
						.getProductType().getCode(),
				TransactionInfo.getProgramLocale());
		subject.arg(productName);
		subject.arg(integratedCase.getConcernRole().getName());

		taskCreateDetails.subject = subject.getMessage(TransactionInfo
				.getProgramLocale());

		enactmentStructs.add(taskCreateDetails);
		EnactmentService.startProcessInV3CompatibilityMode(
				MOLSAConstants.kMOLSAProductDeliveryOpenTask, enactmentStructs);

		Event eventKey = new Event();
		eventKey.eventKey.eventClass = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventClass;
		eventKey.eventKey.eventType = MOLSAAPPROVALTASK.PDCAPPROVALAPPROVED.eventType;
		eventKey.primaryEventData = submitForApprovalKey.caseID;
		EventService.raiseEvent(eventKey);

	}

	@Override
	public void reactivate(ReactivationDetails details) throws AppException,
			InformationalException {
		// MaintainCaseClosure manipulation variables
		final curam.core.intf.MaintainCaseClosure maintainCaseClosureObj = curam.core.fact.MaintainCaseClosureFactory
				.newInstance();
		final ReactivationDtls reactivationDtls = new ReactivationDtls();

		// Assign reactivation details
		reactivationDtls.assign(details);

		// Call MaintainCaseClosure BPO to reactivate the case
		maintainCaseClosureObj.reactivateCase(reactivationDtls);

		Event eventKey = new Event();
		eventKey.eventKey.eventClass = curam.events.MOLSAProductDelivery.REACTIVATE.eventClass;
		eventKey.eventKey.eventType = curam.events.MOLSAProductDelivery.REACTIVATE.eventType;
		eventKey.primaryEventData = details.caseID;
		EventService.raiseEvent(eventKey);
	}

	@Override
	public InformationMsgDtlsList modifyCertification(
			MaintainCertificationDetails details) throws AppException,
			InformationalException {
		
		curam.core.intf.CaseHeader caseHeaderObj = CaseHeaderFactory
				.newInstance();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		caseHeaderKey.caseID = details.caseID;

		CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

		if (CASESTATUS.ACTIVE.equals(caseHeaderDtls.statusCode)) {
			CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

			CaseStatusDtls mdfCaseStatusDtls = new CaseStatusDtls();
			CaseStatusDtls insCaseStatusDtls = new CaseStatusDtls();
			CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
			CaseStatusKey mdfCaseStatusKey = new CaseStatusKey();
			UniqueID uniqueIDObj = UniqueIDFactory.newInstance();

			caseHeaderDtls.statusCode = CASESTATUS.OPEN;
			caseHeaderObj.modify(caseHeaderKey, caseHeaderDtls);
			currentCaseStatusKey.caseID = details.caseID;
			currentCaseStatusKey.nullDate = Date.kZeroDate;
			CaseStatusDtls caseStatusDtls = caseStatusObj
					.readCurrentStatusByCaseID1(currentCaseStatusKey);
			mdfCaseStatusDtls.assign(caseStatusDtls);
			mdfCaseStatusDtls.endDate = TransactionInfo.getSystemDate();
			mdfCaseStatusDtls.endDateTime = TransactionInfo.getSystemDateTime();
			mdfCaseStatusKey.caseStatusID = caseStatusDtls.caseStatusID;
			caseStatusObj.modify(mdfCaseStatusKey, mdfCaseStatusDtls);
			insCaseStatusDtls.caseID = details.caseID;
			insCaseStatusDtls.statusCode = CASESTATUS.OPEN;
			insCaseStatusDtls.startDate = TransactionInfo.getSystemDate();
			insCaseStatusDtls.endDate = Date.kZeroDate;
			insCaseStatusDtls.caseStatusID = uniqueIDObj.getNextID();
			SystemUser systemUserObj = SystemUserFactory.newInstance();
			insCaseStatusDtls.userName = systemUserObj.getUserDetails().userName;
			insCaseStatusDtls.comments = "";
			caseStatusObj.insert(insCaseStatusDtls);
			
			//Invoke the workflow which generates the task to financial auditor.
			final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
			TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
			taskCreateDetails.caseID = details.caseID;
			IntegratedCase integratedCase = integratedCaseDAO
					.get(taskCreateDetails.caseID);

			LocalisableString subject = null;

			subject = new LocalisableString(
					MOLSANOTIFICATION.INF_READY_FOR_FINAUDITOR_REVIEW);
			subject.arg(integratedCase.getCaseReference());

			String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
					productDeliveryDAO.get(taskCreateDetails.caseID)
							.getProductType().getCode(),
					TransactionInfo.getProgramLocale());
			subject.arg(productName);
			subject.arg(integratedCase.getConcernRole().getName());

			taskCreateDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());

			enactmentStructs.add(taskCreateDetails);
			EnactmentService.startProcessInV3CompatibilityMode(
					MOLSAConstants.kMOLSAProductDeliveryOpenTask, enactmentStructs);
			
			
		}
		// Return object
		final InformationMsgDtlsList informationMsgDtlsList = new InformationMsgDtlsList();

		// MaintainCertification manipulation variables
		final curam.core.intf.MaintainCertification maintainCertificationObj = curam.core.fact.MaintainCertificationFactory
				.newInstance();
		final curam.core.struct.MaintainCertificationDetails maintainCertificationDetails = new curam.core.struct.MaintainCertificationDetails();

		// Assign certification details
		maintainCertificationDetails.assign(details);

		// Call MaintainCertification BPO to modify the certification
		maintainCertificationObj
				.modifyCertification(maintainCertificationDetails);
		
		final curam.util.exception.InformationalManager informationalManager = curam.util.transaction.TransactionInfo
				.getInformationalManager();

		final String[] warnings = informationalManager
				.obtainInformationalAsString();

		for (int i = 0; i < warnings.length; i++) {

			final InformationalMsgDtls informationalMsgDtls = new InformationalMsgDtls();

			informationalMsgDtls.informationMsgTxt = warnings[i];
			informationMsgDtlsList.informationalMsgDtlsList.dtls
					.addRef(informationalMsgDtls);

		}

		return informationMsgDtlsList;
	}

}
