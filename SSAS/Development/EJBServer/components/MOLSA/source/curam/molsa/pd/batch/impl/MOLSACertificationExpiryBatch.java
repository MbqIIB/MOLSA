package curam.molsa.pd.batch.impl;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.BIZOBJASSOCIATION;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.sl.entity.fact.TaskAssignmentFactory;
import curam.core.sl.entity.struct.TaskAssignmentDtls;
import curam.core.sl.entity.struct.TaskAssignmentDtlsList;
import curam.core.sl.entity.struct.TaskKey;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.CaseIDKey;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.ip.batch.impl.MOLSAInformationProviderProcessChunkResult;
import curam.molsa.pd.batch.fact.MOLSACertificationExpiryBatchStreamFactory;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.ProgramLocale;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DateTime;
import curam.util.type.NotFoundIndicator;
import curam.util.workflow.fact.BizObjAssociationFactory;
import curam.util.workflow.fact.TaskAdminFactory;
import curam.util.workflow.intf.BizObjAssociation;
import curam.util.workflow.intf.TaskAdmin;
import curam.util.workflow.struct.BizObjAssocSearchDetails;
import curam.util.workflow.struct.BizObjAssocSearchDetailsList;
import curam.util.workflow.struct.BizObjectTypeKey;
import curam.util.workflow.struct.TaskDetailsWithoutSnapshot;

public class MOLSACertificationExpiryBatch extends
		curam.molsa.pd.batch.base.MOLSACertificationExpiryBatch {

	protected static final int kFirstKeyValue = 1;
	protected final int kChunkSize;
	protected final boolean kDontRunStream;
	protected final int kChunkKeyReadWait;
	protected final int kUnProcessedChunkReadWait;
	protected final boolean kProcessUnProcessedChunks;

	/**
	 * Constructor for the class
	 */
	public MOLSACertificationExpiryBatch() {

		String chunkSize = Configuration
				.getProperty(EnvVars.ENV_MOLSACERTEXPIRY_CHUNK_SIZE);

		if (chunkSize == null) {
			this.kChunkSize = 500;

		} else {
			this.kChunkSize = Integer.parseInt(chunkSize);

		}

		this.kDontRunStream = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSACERTEXPIRY_DONT_RUN_STREAM);

		String chunkKeyReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSACERTEXPIRY_CHUNK_KEY_WAIT_INTERVAL);

		if (chunkKeyReadWait == null) {
			this.kChunkKeyReadWait = 1000;

		} else {
			this.kChunkKeyReadWait = Integer.parseInt(chunkKeyReadWait);

		}

		String unProcessedChunkReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSACERTEXPIRY_UNPROCESSED_CHUNK_WAIT_INTERVAL);

		if (unProcessedChunkReadWait == null) {
			this.kUnProcessedChunkReadWait = 1000;

		} else {
			this.kUnProcessedChunkReadWait = Integer
					.parseInt(unProcessedChunkReadWait);

		}

		this.kProcessUnProcessedChunks = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSACERTEXPIRY_PROCESS_UNPROCESSED_CHUNKS);
	}

	/**
	 * 
	 * This method would send the the details of the number of records processed
	 * and skipped.
	 * 
	 * @param instanceID
	 *            String
	 * @param batchProcessDtls
	 *            BatchProcessDtls
	 * @param processedBatchProcessChunkDtlsList
	 *            BatchProcessChunkDtlsList
	 * @param unprocessedBatchProcessChunkDtlsList
	 *            BatchProcessChunkDtlsList
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * 
	 */
	@Override
	public void process() throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		
		ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
		
		MOLSACertificationExpiryBatchWrapper molsaCertificationExpiryBatchWrapper = new MOLSACertificationExpiryBatchWrapper(
				this);
		curam.molsa.pd.batch.intf.MOLSACertificationExpiryBatchStream molsaCertificationExpiryBatchStream = MOLSACertificationExpiryBatchStreamFactory
				.newInstance();

		MOLSACertificationExpiryBatchStreamWrapper molsaCertificationExpiryBatchStreamWrapper = new MOLSACertificationExpiryBatchStreamWrapper(
				molsaCertificationExpiryBatchStream);

	    SecurityImplementationFactory.register();

	    batchStreamHelper.setStartTime();

	    String instanceID = BATCHPROCESSNAME.MOLSA_CERTIFICATIONEXPIRY;
	    
		// Cases to be renewed should create a task to the case worker 45 days
		// before the end of certification date.
		Calendar currCalendar = TransactionInfo.getSystemDate().getCalendar();
		String currentDate = currCalendar.get(Calendar.YEAR) + "-"
				+ (currCalendar.get(Calendar.MONTH) + 1) + "-"
				+ currCalendar.get(Calendar.DAY_OF_MONTH);

		StringBuffer query = new StringBuffer();
		query.append("SELECT ch.caseID, ch.expectedEndDate ");
		query.append("INTO :caseID, :expectedEndDate ");
		query.append("FROM CaseHeader ch ");
		query.append("WHERE ch.caseTypeCode = '");
		query.append(CASETYPECODE.PRODUCTDELIVERY);
		query.append("' ");
		query.append("AND ch.statusCode = '");
		query.append(CASESTATUS.ACTIVE);
		query.append("' ");
		query.append("AND ch.expectedEndDate - 45 <= '");
		query.append(currentDate);
		query.append("' ");

		CuramValueList<CaseHeaderDtls> caseHeaderDtlsList = curam.util.dataaccess.DynamicDataAccess
				.executeNsMulti(curam.core.struct.CaseHeaderDtls.class, null,
						false, true, query.toString());

		BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
		BatchProcessingID batchProcessingID;

		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsList) {
			batchProcessingID = new BatchProcessingID();
			// Check for Task is already created
			if (!findTask(caseHeaderDtls.caseID, caseHeaderDtls.expectedEndDate)) {
				batchProcessingID.recordID = caseHeaderDtls.caseID;
				batchProcessingIDList.dtls.add(batchProcessingID);
			}
		}

		chunkMainParameters.chunkSize = kChunkSize;
		chunkMainParameters.dontRunStream = kDontRunStream;
		chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
		chunkMainParameters.startChunkKey = 1L;
		chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;
		batchStreamHelper
				.runChunkMain(instanceID, null,
						molsaCertificationExpiryBatchWrapper,
						batchProcessingIDList, chunkMainParameters,
						molsaCertificationExpiryBatchStreamWrapper);
	}

	@Override
	public CREOLEBulkCaseChunkReassessmentResult decodeProcessChunkResult(
			String resultString) throws AppException, InformationalException {

		CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();
		StringTokenizer st = new StringTokenizer(resultString);
		int elementNumber = 0;
		while (st.hasMoreTokens()) {
			++elementNumber;
			switch (elementNumber) {
			case 1:
				creoleBulkCaseChunkReassessmentResult.casesSkippedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 2:
				creoleBulkCaseChunkReassessmentResult.casesProcessedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 3:
				creoleBulkCaseChunkReassessmentResult.casesChangedCount = Integer
						.parseInt(st.nextToken());
				break;
			}

		}

		return creoleBulkCaseChunkReassessmentResult;

	}

	/**
	 * 
	 * This method would send the the details of the number of records processed
	 * and skipped.
	 * 
	 * @param instanceID
	 *            String
	 * @param batchProcessDtls
	 *            BatchProcessDtls
	 * @param processedBatchProcessChunkDtlsList
	 *            BatchProcessChunkDtlsList
	 * @param unprocessedBatchProcessChunkDtlsList
	 *            BatchProcessChunkDtlsList
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * 
	 */
	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {

		long totalNumberOfCasesProcessed = 0L;
		long totalNumberOfCasesSkipped = 0L;

		final long totalNumberOfUnprocessedChunks = unprocessedBatchProcessChunkDtlsList.dtls
				.size();
		MOLSAInformationProviderProcessChunkResult molsaInfoProviderProcessChunkResult;

		final curam.core.impl.CuramBatch curamBatchObj = new curam.core.impl.CuramBatch();
		final int kEmailMessageBufSize = 512;
		final StringBuffer emailMessage = new StringBuffer(kEmailMessageBufSize);

		for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); ++i) {
			CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = decodeProcessChunkResult(((curam.core.struct.BatchProcessChunkDtls) processedBatchProcessChunkDtlsList.dtls
					.item(i)).resultSummary);
			totalNumberOfCasesProcessed += creoleBulkCaseChunkReassessmentResult.casesProcessedCount;
			totalNumberOfCasesSkipped += creoleBulkCaseChunkReassessmentResult.casesSkippedCount;

		}

		/*
		System.out.println("TOTAL NUMBER OF CASES PROCESSESED "
				+ totalNumberOfCasesProcessed);
		System.out.println("TOTAL NUMBER OF CASES SKIPPED "
				+ totalNumberOfCasesSkipped);
		*/

		if (totalNumberOfUnprocessedChunks > 0) {

			final AppException errChunksSkippedText = new AppException(
					curam.message.BPOMOLSATRACKRESPONSEBATCH.ERR_CHUNKS_SKIPPED);

			errChunksSkippedText.arg(totalNumberOfUnprocessedChunks);
			errChunksSkippedText.arg(totalNumberOfUnprocessedChunks
					* kChunkSize);

			emailMessage
					.append(CuramConst.gkNewLine)
					.append(errChunksSkippedText.getMessage(ProgramLocale
							.getDefaultServerLocale()))
					.append(CuramConst.gkNewLine);

		}

		final AppException infTotalCasesText = new AppException(
				curam.message.BPOMOLSATRACKRESPONSEBATCH.INF_CASE_RECORDS_PROCESSED);

		infTotalCasesText.arg(totalNumberOfCasesProcessed);

		emailMessage
				.append(CuramConst.gkNewLine)
				.append(infTotalCasesText.getMessage(ProgramLocale
						.getDefaultServerLocale()))
				.append(CuramConst.gkNewLine);

		if (totalNumberOfCasesSkipped > 0) {

			final AppException infTotalSkippedCasesText = new AppException(
					curam.message.BPOMOLSATRACKRESPONSEBATCH.INF_CASE_RECORDS_SKIPPED);

			infTotalSkippedCasesText.arg(totalNumberOfCasesSkipped);

			emailMessage
					.append(CuramConst.gkNewLine)
					.append(infTotalSkippedCasesText.getMessage(ProgramLocale
							.getDefaultServerLocale()))
					.append(CuramConst.gkNewLine);

		}

		curamBatchObj.emailMessage = emailMessage.toString();

		curamBatchObj
				.setEmailSubject(curam.message.BPOMOLSATRACKRESPONSEBATCH.INF_CASE_RECORDS_PROCESSED);

		curamBatchObj.setStartTime(batchProcessDtls.startDateTime);
		curamBatchObj.setEndTime();
		curamBatchObj.sendEmail();
		
		System.out.println("email message: \n"
				+ emailMessage.toString());
	}

	/**
	 * This method finds if task exist for the App Case
	 * 
	 * @param applicationCaseID
	 * @param workQueueID
	 * @param close
	 * @throws AppException
	 * @throws InformationalException
	 */

	protected Boolean xxfindTask(long caseID, Date certEndDate)
			throws AppException, InformationalException {

		DateTime certEndDateTime = certEndDate.getDateTime();
		DateTime certWarnDateTime = certEndDate.addDays(-45).getDateTime();

		BizObjectTypeKey paramBizObjectTypeKey = new BizObjectTypeKey();
		BizObjAssociation bizObjAssociationObj = BizObjAssociationFactory
				.newInstance();
		BizObjAssocSearchDetailsList bizObjAssocSearchDetailsList = new BizObjAssocSearchDetailsList();

		TaskAdmin taskObj = TaskAdminFactory.newInstance();
		Set<Long> workQueueIDs = new HashSet<Long>();
		workQueueIDs.add(45014L); // MOLSACERTEXPIRY

		Boolean found = false;
		paramBizObjectTypeKey.bizObjectID = caseID;
		paramBizObjectTypeKey.bizObjectType = BIZOBJASSOCIATION.CASE;

		// Identifies any task associate with case.
		bizObjAssocSearchDetailsList = bizObjAssociationObj
				.searchByBizObjectTypeAndID(paramBizObjectTypeKey);

		if (null != bizObjAssocSearchDetailsList
				&& !bizObjAssocSearchDetailsList.dtls.isEmpty()) {

			// Close all task associated with case.
			for (BizObjAssocSearchDetails bizObjAssocSearchDtls : bizObjAssocSearchDetailsList.dtls) {
				// check if task associated to particular queue
				if (isTaskAssociatedWithAnticipatedWorkQueue(
						bizObjAssocSearchDtls.taskID, workQueueIDs)) {

					TaskDetailsWithoutSnapshot taskDtls = taskObj
							.readDetails(bizObjAssocSearchDtls.taskID);
					// Check whether a task is created in time.
					if (taskDtls.creationTime.after(certWarnDateTime)
							&& taskDtls.creationTime.before(certEndDateTime)) {
						found = true;
					}
				}
			}
		}
		return found;
	}

	/**
	 * returns true if task associated with the passed WorkQueues
	 * 
	 * @param taskID
	 * @return boolean
	 * 
	 */
	private static boolean isTaskAssociatedWithAnticipatedWorkQueue(
			Long taskID, Set<Long> workQueueIDs) {

		boolean taskAssociatedWithAnticipatedWorkQueueInd = false;

		TaskKey taskKey = new TaskKey();
		taskKey.taskID = taskID;
		try {
			TaskAssignmentDtlsList taskAssignmentDtlsList = TaskAssignmentFactory
					.newInstance().searchAssignmentsByTaskID(taskKey);
			for (TaskAssignmentDtls taskAssignmentDtls : taskAssignmentDtlsList.dtls) {
				if (workQueueIDs.contains(taskAssignmentDtls.relatedID)) {
					taskAssociatedWithAnticipatedWorkQueueInd = true;
				}
			}
		} catch (Exception ex) {
			// EEFTrace.error(String.format("Error reading task from TaskAssginment table of taskID %d",
			// taskID));
			taskAssociatedWithAnticipatedWorkQueueInd = false;
		}

		return taskAssociatedWithAnticipatedWorkQueueInd;
	}

	private boolean findTask(Long caseID, Date certEndDate)
			throws AppException, InformationalException {

		Boolean taskFound = false;

		Calendar endCalendar = certEndDate.getCalendar();
		String endDateMax = endCalendar.get(Calendar.YEAR) + "-"
				+ (endCalendar.get(Calendar.MONTH) + 1) + "-"
				+ endCalendar.get(Calendar.DAY_OF_MONTH);

		endCalendar = certEndDate.addDays(-45).getCalendar();
		String endDateMin = endCalendar.get(Calendar.YEAR) + "-"
				+ (endCalendar.get(Calendar.MONTH) + 1) + "-"
				+ endCalendar.get(Calendar.DAY_OF_MONTH);

		String query = "SELECT DISTINCT BizObjAssociation.bizObjectID "
				+ "FROM Task, "
				+ "BizObjAssociation, "
				+ "ActivityInstance, "
				+ "ProcessInstance, "
				+ "ProcessDefinition "
				+ "WHERE BizObjAssociation.taskID = Task.taskID "
				+ "AND ActivityInstance.processInstanceID = ProcessInstance.processInstanceID "
				+ "AND ActivityInstance.taskID = Task.taskID "
				+ "AND ProcessInstance.processID = ProcessDefinition.processID "
				+ "AND BizObjAssociation.bizObjectType = '"
				+ BIZOBJASSOCIATION.CASE + "' "
				+ "AND BizObjAssociation.bizObjectID = " + caseID + " "
				+ "AND ProcessDefinition.processName = '"
				+ MOLSAConstants.kMOLSACertificationExpiryTask + "' "
				+ "AND Task.creationTime >= '" + endDateMin + "' "
				+ "AND Task.creationTime <= '" + endDateMax + "' ";

		// System.out.println("SQL is: " + query);

		CuramValueList<CaseIDKey> curamValueList = null;

		try {
			curamValueList = DynamicDataAccess.executeNsMulti(CaseIDKey.class,
					null, false, false, query);

			if (curamValueList.size() > 0) {
				taskFound = true;
			}

		} catch (Exception e) {
			Trace.kTopLevelLogger.info("****** Task searching Error in ******");
			e.printStackTrace();
		}

		return taskFound;
	}
}
