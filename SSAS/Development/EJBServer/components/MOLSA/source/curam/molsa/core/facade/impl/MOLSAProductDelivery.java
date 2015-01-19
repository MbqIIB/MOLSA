package curam.molsa.core.facade.impl;

import java.util.Calendar;

import java.util.Map;
import com.google.inject.Inject;

import curam.codetable.CASECLOSEREASON;
import curam.codetable.impl.CASECLOSEREASONEntry;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.fact.ProductDeliveryFactory;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.CloseCaseDetails;
import curam.core.facade.struct.CreateCertificationDetails;
import curam.core.facade.struct.InformationMsgDtlsList;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.impl.CuramConst;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.struct.InformationalMsgDtls;
import curam.core.struct.ProductDeliveryApprovalKey1;
import curam.message.MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
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
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
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
		}
		TransactionInfo.getInformationalManager().failOperation();
		productDeliveryFactoryObj.approve(key);
	}

	@Override
	public void close(CloseCaseDetails details) throws AppException,
			InformationalException {
		ProductDelivery PDObj= ProductDeliveryFactory.newInstance();
		CaseHeader caseHeader = caseHeaderDAO.get(details.caseID);
		PDObj.close(details);
		//SMS Integration 
	      MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
	      MOLSAMessageTextKey molsaMessageTextKey = new MOLSAMessageTextKey();
	      molsaMessageTextKey.dtls.category=MOLSASMSMessageType.NOTIFICATION;
	      molsaMessageTextKey.dtls.template=MOLSASMSMESSAGETEMPLATE.MOIMESSAGETEXT;
	      MOLSAMessageText messageText = molsasmsUtilObj.getSMSMessageText(molsaMessageTextKey );
	      MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails=
	          new MOLSAConcernRoleListAndMessageTextDetails();
	      //Construct the input details
	      concernRoleListAndMessageTextDetails.dtls.smsMessageText=messageText.dtls.smsMessageText;
	      concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList=String.valueOf(caseHeader.getConcernRole().getID());
	      //Need to point to the right template
	      concernRoleListAndMessageTextDetails.dtls.smsMessageType=MOLSASMSMESSAGETEMPLATE.PDCAPPROVED;
	      if(details.reasonCode.equals(CASECLOSEREASON.MANAGERREJECTION))
	    	  molsasmsUtilObj.sendSMS(concernRoleListAndMessageTextDetails);
	    	  
	}

}
