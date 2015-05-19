package curam.molsa.useraccount.sms.sl.impl;

import java.util.Calendar;
import java.util.StringTokenizer;

import org.apache.axis.types.Year;

import com.ibm.icu.impl.duration.Period;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.ConcernRoleIDKey;
import curam.core.facade.struct.PersonDetails;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.impl.CalenderConst;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseIDTypeCodeKey;
import curam.core.sl.struct.CaseParticipantRoleFullDetails1;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryDtlsList;
import curam.creole.execution.session.Session;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person_Factory;
import curam.creole.ruleclass.MOLSAScreeningRulesUtilityCalculator.impl.AgeCalculator;
import curam.creole.ruleclass.MOLSAScreeningRulesUtilityCalculator.impl.AgeCalculator_Factory;
import curam.molsa.useraccount.sms.sl.fact.MOLSAUserAccountSMSBatchStreamFactory;
import curam.molsa.useraccount.sms.sl.intf.MOLSAUserAccountSMSBatchStream;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.ProgramLocale;
import curam.util.type.Date;

@SuppressWarnings("restriction")
public class MOLSAUserAccountSMSBatchJob extends
		curam.molsa.useraccount.sms.sl.base.MOLSAUserAccountSMSBatchJob {

	protected static final int kFirstKeyValue = 1;
	protected final int kChunkSize;
	protected final boolean kDontRunStream;
	protected final int kChunkKeyReadWait;
	protected final int kUnProcessedChunkReadWait;
	protected final boolean kProcessUnProcessedChunks;

	/**
	 * Constructor for the class
	 */
	public MOLSAUserAccountSMSBatchJob() {

		String chunkSize = Configuration
				.getProperty(EnvVars.ENV_MOLSASMS_CHUNK_SIZE);

		if (chunkSize == null) {
			this.kChunkSize = EnvVars.ENV_MOLSASMS_CHUNK_SIZE_DEFAULT;

		} else {
			this.kChunkSize = Integer.parseInt(chunkSize);

		}

		this.kDontRunStream = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSASMS_DONT_RUN_STREAM);

		String chunkKeyReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSASMS_CHUNK_KEY_WAIT_INTERVAL);

		if (chunkKeyReadWait == null) {
			this.kChunkKeyReadWait = EnvVars.ENV_MOLSASMS_CHUNK_KEY_WAIT_INTERVAL_DEFAULT;

		} else {
			this.kChunkKeyReadWait = Integer.parseInt(chunkKeyReadWait);

		}

		String unProcessedChunkReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSASMS_UNPROCESSED_CHUNK_WAIT_INTERVAL);

		if (unProcessedChunkReadWait == null) {
			this.kUnProcessedChunkReadWait = EnvVars.ENV_MOLSASMS_UNPROCESSED_CHUNK_WAIT_INTERVAL_DEFAULT;

		} else {
			this.kUnProcessedChunkReadWait = Integer
					.parseInt(unProcessedChunkReadWait);

		}

		this.kProcessUnProcessedChunks = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSASMS_PROCESS_UNPROCESSED_CHUNKS);
	}

	@Override
	public void sendBatchReport(BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {
		long totalNumberOfCasesProcessed = 0;
		long totalNumberOfCasesSkipped = 0;

		final long totalNumberOfUnprocessedChunks = unprocessedBatchProcessChunkDtlsList.dtls
				.size();
		MOLSAUserAccountSMSChunkResult molsaSMSChunkResult;

		final curam.core.impl.CuramBatch curamBatchObj = new curam.core.impl.CuramBatch();
		final int kEmailMessageBufSize = 512;
		final StringBuffer emailMessage = new StringBuffer(kEmailMessageBufSize);

		for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); i++) {
			molsaSMSChunkResult = decodeProcessChunkResult(processedBatchProcessChunkDtlsList.dtls
					.item(i).resultSummary);
			totalNumberOfCasesProcessed += molsaSMSChunkResult.caseProcessCount;
			totalNumberOfCasesSkipped += molsaSMSChunkResult.casesSkippedCount;

		}

		if (totalNumberOfUnprocessedChunks > 0) {

			final AppException errChunksSkippedText = new AppException(
					curam.message.BPOMOLSASMSBATCH.ERR_CHUNKS_SKIPPED);

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
				curam.message.BPOMOLSASMSBATCH.INF_CASE_RECORDS_PROCESSED);

		infTotalCasesText.arg(totalNumberOfCasesProcessed);

		emailMessage
				.append(CuramConst.gkNewLine)
				.append(infTotalCasesText.getMessage(ProgramLocale
						.getDefaultServerLocale()))
				.append(CuramConst.gkNewLine);

		if (totalNumberOfCasesSkipped > 0) {

			final AppException infTotalSkippedCasesText = new AppException(
					curam.message.BPOMOLSASMSBATCH.INF_CASE_RECORDS_SKIPPED);

			infTotalSkippedCasesText.arg(totalNumberOfCasesSkipped);

			emailMessage
					.append(CuramConst.gkNewLine)
					.append(infTotalSkippedCasesText.getMessage(ProgramLocale
							.getDefaultServerLocale()))
					.append(CuramConst.gkNewLine);

		}

		curamBatchObj.emailMessage = emailMessage.toString();

		curamBatchObj
				.setEmailSubject(curam.message.BPOMOLSASMSBATCH.INF_CASE_RECORDS_PROCESSED);

		curamBatchObj.setStartTime(batchProcessDtls.startDateTime);
		curamBatchObj.setEndTime();
		curamBatchObj.sendEmail();

	}

	@Override
	public void process() throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();

		ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
		MOLSAUserAccountSMSBatchStream molsaSMSStreamObj = MOLSAUserAccountSMSBatchStreamFactory
				.newInstance();
		MOLSAUserAccountSMSBatchStreamWrapper molsaSMSBatchStreamWrapper = new MOLSAUserAccountSMSBatchStreamWrapper(
				molsaSMSStreamObj);
		MOLSASMSBatchJobWrapper molsaSMSBatchJobWrapper = new MOLSASMSBatchJobWrapper(
				this);
		SecurityImplementationFactory.register();
		batchStreamHelper.setStartTime();
		String instanceID = BATCHPROCESSNAME.MOLSA_UASMS;
		int age = 0;
		curam.core.intf.ProductDelivery productDeliveryObj = curam.core.fact.ProductDeliveryFactory
				.newInstance();
		ProductDeliveryDtlsList productDeliveryDtlsList = productDeliveryObj
				.readAll();
		CaseParticipantRoleFullDetails1 caseDetailsStruct = new CaseParticipantRoleFullDetails1();
		CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory
				.newInstance();
		CaseIDTypeCodeKey caseIDTypeCodeKeyParam = new CaseIDTypeCodeKey();

		BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
		Person personObj = PersonFactory.newInstance();
		ConcernRoleIDKey paramConcernRoleIDKey = new ConcernRoleIDKey();
		for (ProductDeliveryDtls productDeliveryList : productDeliveryDtlsList.dtls
				.items()) {
			caseIDTypeCodeKeyParam.caseID = productDeliveryList.caseID;
			caseIDTypeCodeKeyParam.typeCode = CASEPARTICIPANTROLETYPE.PRIMARY;
			caseDetailsStruct = null;
			caseDetailsStruct = caseParticipantRoleObj
					.readByCaseIDAndTypeCode(caseIDTypeCodeKeyParam);
			BatchProcessingID batchProcessingID = new BatchProcessingID();

			if (caseDetailsStruct.dtls.participantRoleID != 0L) {
				paramConcernRoleIDKey.concernRoleID = caseDetailsStruct.dtls.participantRoleID;
				PersonDetails personDtls = personObj
						.readPersonDetails(paramConcernRoleIDKey);
				age = getAge(personDtls.dtls.dateOfBirth);
				if (age >= 18) {
					batchProcessingID.recordID = caseDetailsStruct.dtls.participantRoleID;
					batchProcessingIDList.dtls.add(batchProcessingID);
				}
			}
		}

		// set the chuncking parameters
		chunkMainParameters.chunkSize = kChunkSize;
		chunkMainParameters.dontRunStream = kDontRunStream;
		chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
		chunkMainParameters.startChunkKey = 1L;
		chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;

		batchStreamHelper.runChunkMain(instanceID, null,
				molsaSMSBatchJobWrapper, batchProcessingIDList,
				chunkMainParameters, molsaSMSBatchStreamWrapper);
	}

	/**
	 * This method composes and sends the batch report for this batch program.
	 * 
	 * @param resultSummary
	 *            String
	 * @return MOLSAInformationProviderProcessChunkResult
	 */
	public MOLSAUserAccountSMSChunkResult decodeProcessChunkResult(
			final String resultSummary) {
		MOLSAUserAccountSMSChunkResult chunkResult = new MOLSAUserAccountSMSChunkResult();
		final StringTokenizer st = new StringTokenizer(resultSummary);
		int elementNumber = 0;

		while (st.hasMoreTokens()) {

			elementNumber++;
			switch (elementNumber) {
			case 1:
				chunkResult.caseProcessCount = Integer.parseInt(st.nextToken());
				break;

			case 2:
				chunkResult.casesSkippedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 3:
				chunkResult.fcProcessCount = Integer.parseInt(st.nextToken());
				break;

			case 4:
				chunkResult.iliCreatedCount = Integer.parseInt(st.nextToken());
				break;

			default:
				st.nextToken();
				break;
			}

		}

		return chunkResult;

	}

	public int getAge(Date dob) {
		int diff = 0;
		if (null != dob) {
			Calendar today = Calendar.getInstance();
			Calendar birthDate = Calendar.getInstance();
			birthDate.setTime(dob.getCalendar().getTime());
			diff = today.get(Calendar.YEAR) - birthDate.get(Calendar.YEAR);
		}
		return diff;
	}
}
