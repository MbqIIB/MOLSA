package curam.molsa.pd.batch.impl;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.RECORDSTATUS;
import curam.codetable.TASKPRIORITY;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.fact.ConcernRoleAlternateIDFactory;
import curam.core.facade.intf.ConcernRoleAlternateID;
import curam.core.facade.struct.AlternateIDDetailsList;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.fact.UsersFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.Users;
import curam.core.sl.entity.struct.OrgObjectLinkKey;
import curam.core.sl.fact.OrgObjectLinkFactory;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.sl.struct.UserNameAndFullName;
import curam.core.struct.AlternateIDReadmultiDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.DateTime;
import curam.util.type.NotFoundIndicator;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.message.MOLSACERTIFICATIONEXPIRYBATCH;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.intf.MOLSAMoi;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;

public class MOLSACertificationExpiryBatchStream extends
		curam.molsa.pd.batch.base.MOLSACertificationExpiryBatchStream {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

	/**
	 * Constructor.
	 */
	public MOLSACertificationExpiryBatchStream() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * This method keeps the count of the number of records processed and not
	 * processed.
	 * 
	 * @param skippedCasesCount
	 *            The number of cases skipped in this chunk
	 */
	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {

		StringBuffer result = new StringBuffer();
		creoleBulkCaseChunkReassessmentResult.casesSkippedCount += skippedCasesCount;
		result.append(creoleBulkCaseChunkReassessmentResult.casesSkippedCount);
		result.append('\t');
		result.append(creoleBulkCaseChunkReassessmentResult.casesProcessedCount);
		result.append('\t');
		result.append(creoleBulkCaseChunkReassessmentResult.casesChangedCount);

		creoleBulkCaseChunkReassessmentResult.casesProcessedCount = 0;
		creoleBulkCaseChunkReassessmentResult.casesSkippedCount = 0;
		creoleBulkCaseChunkReassessmentResult.casesChangedCount = 0;
		return result.toString();
	}

	/**
	 * This method would call the stream helper class and takes Batch process
	 * stream key as input parameter.
	 * 
	 * @param batchProcessStreamKey
	 * 
	 */
	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {

		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSACertificationExpiryBatchStreamWrapper molsaCertificationExpiryBatchStreamWrapper = new MOLSACertificationExpiryBatchStreamWrapper(
				this);

		SecurityImplementationFactory.register();

		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_CERTIFICATIONEXPIRY;

		}
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaCertificationExpiryBatchStreamWrapper);

	}

	/**
	 * This method implements the Task creation for PD certification due in 45
	 * days functionality.
	 * 
	 * @param batchProcessingID
	 *            The details of the case to be processed
	 * @param informationProviderTmpDtls
	 *            The details of the temp table record
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID) throws AppException,
			InformationalException {

		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();

		final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();

		final CaseHeader caseHeader = caseHeaderDAO
				.get(batchProcessingID.recordID);

		try {
			// Last user manage the Case
			curam.core.sl.intf.OrgObjectLink orgObjectLinkObj = OrgObjectLinkFactory
					.newInstance();
			OrgObjectLinkKey orgObjectLinkKey = new OrgObjectLinkKey();
			orgObjectLinkKey.orgObjectLinkID = caseHeader
					.getOwnerOrgObjectLink().getID();
			UserNameAndFullName userNameAndFullName = orgObjectLinkObj
					.getUserNameFullName(orgObjectLinkKey);

			// QID of Primary
			ConcernRoleAlternateID concernRoleAlternateIDObj = ConcernRoleAlternateIDFactory
					.newInstance();
			ConcernRoleIDStatusCodeKey concernRoleIDStatusCodeKey = new ConcernRoleIDStatusCodeKey();
			concernRoleIDStatusCodeKey.dtls.concernRoleID = caseHeader
					.getConcernRole().getID();
			concernRoleIDStatusCodeKey.dtls.statusCode = RECORDSTATUS.NORMAL;

			String qID = "0";

			AlternateIDDetailsList alternateIDDetailsList = concernRoleAlternateIDObj
					.searchByConcernRoleIDAndStatus(concernRoleIDStatusCodeKey);
			for (int i = 0; i <= alternateIDDetailsList.dtls.dtls.size(); i++) {
				AlternateIDReadmultiDtls dtls = alternateIDDetailsList.dtls.dtls
						.get(i);
				if (dtls.typeCode
						.equals(CONCERNROLEALTERNATEID.INSURANCENUMBER)) {
					qID = dtls.alternateID;
					break;
				}
			}

			// Primary Beneficiary Name
			String beneficiaryName = "";
			MOLSAMoi molsaMoiObj = MOLSAMoiFactory.newInstance();
			MOLSAMoiKey molsaMoiKey = new MOLSAMoiKey();
			NotFoundIndicator nfIndicator = new NotFoundIndicator();
			molsaMoiKey.qid = qID;
			MOLSAMoiDtls molsaMoiDtls = molsaMoiObj.read(nfIndicator,
					molsaMoiKey);

			Users usersObj = UsersFactory.newInstance();
			UsersKey usersKey = new UsersKey();

			usersKey.userName = TransactionInfo.getProgramUser();
			UsersDtls usersDtls = usersObj.read(usersKey);

			if (!nfIndicator.isNotFound()) {

				if (usersDtls.defaultLocale.equalsIgnoreCase("AR")) {
					beneficiaryName = molsaMoiDtls.fullName_ar;
				} else {
					beneficiaryName = molsaMoiDtls.fullName_en;
				}
			}

			// Product Type Description
			ProductDelivery productDelivery = productDeliveryDAO.get(caseHeader
					.getID());

			String productDesc = CodeTable.getOneItem(
					PRODUCTTYPEEntry.TABLENAME, productDelivery
							.getProductType().getCode(),
					usersDtls.defaultLocale);

			// Populating Task Create Details
			TaskCreateDetails taskCreateDetails = new TaskCreateDetails();

			taskCreateDetails.priority = TASKPRIORITY.HIGH;
			taskCreateDetails.caseID = batchProcessingID.recordID;
			taskCreateDetails.deadlineDateTime = DateTime.kZeroDateTime;

			AppException msg = new AppException(
					MOLSACERTIFICATIONEXPIRYBATCH.TASK_SUBJECT);
			msg.arg(caseHeader.getCaseReference());
			msg.arg(productDesc);
			msg.arg(qID);
			msg.arg(beneficiaryName);
			String subject = msg.getLocalizedMessage();
			taskCreateDetails.subject = subject;

			AppException commentMsg = new AppException(
					MOLSACERTIFICATIONEXPIRYBATCH.TASK_COMMENT);
			commentMsg.arg(userNameAndFullName.userName);

			String comment = commentMsg.getLocalizedMessage();
			taskCreateDetails.comments = comment;

			enactmentStructs.add(taskCreateDetails);

			curam.util.workflow.impl.EnactmentService
					.startProcessInV3CompatibilityMode(
							MOLSAConstants.kMOLSACertificationExpiryTask,
							enactmentStructs);

			creoleBulkCaseChunkReassessmentResult.casesProcessedCount += 1;

		} catch (Exception e) {
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			batchProcessingSkippedRecord.errorMessage = e.getMessage();
			Trace.kTopLevelLogger.info("********  Processing  Failed ==> "
					+ batchProcessingID.recordID + " " + e.getMessage());
		}

		return null;
	}

	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		for (BatchProcessingSkippedRecord batchProcessingSkippedRecord : batchProcessingSkippedRecordList.dtls)

		{
			Trace.kTopLevelLogger
					.info("********************* Inside processSkippedCases. SkippedCase ID ==> "
							+ batchProcessingSkippedRecord.recordID
							+ " ********** ");
			Trace.kTopLevelLogger.info("***************** Error Message "
					+ batchProcessingSkippedRecord.errorMessage);
		}
	}

}
