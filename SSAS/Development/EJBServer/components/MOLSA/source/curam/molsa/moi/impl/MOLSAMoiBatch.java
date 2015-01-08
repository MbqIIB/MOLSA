package curam.molsa.moi.impl;

import java.util.StringTokenizer;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.ip.batch.impl.MOLSAInformationProviderProcessChunkResult;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.intf.MOLSAMoi;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiDtlsList;
import curam.molsa.moi.fact.MOLSAMoiBatchStreamFactory;
import curam.molsa.moi.intf.MOLSAMoiBatchStream;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.ProgramLocale;
import curam.util.type.Date;

public class MOLSAMoiBatch extends curam.molsa.moi.base.MOLSAMoiBatch {
	protected static final int kFirstKeyValue = 1;
	protected final int kChunkSize;
	protected final boolean kDontRunStream;
	protected final int kChunkKeyReadWait;
	protected final int kUnProcessedChunkReadWait;
	protected final boolean kProcessUnProcessedChunks;

	public MOLSAMoiBatch() {

		String chunkSize = Configuration
				.getProperty(EnvVars.ENV_MOLSAMOI_CHUNK_SIZE);

		if (chunkSize == null) {
			this.kChunkSize = 500;

		} else {
			this.kChunkSize = Integer.parseInt(chunkSize);

		}

		this.kDontRunStream = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSAMOI_DONT_RUN_STREAM);

		String chunkKeyReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSAMOI_CHUNK_KEY_WAIT_INTERVAL);

		if (chunkKeyReadWait == null) {
			this.kChunkKeyReadWait = 1000;

		} else {
			this.kChunkKeyReadWait = Integer.parseInt(chunkKeyReadWait);

		}

		String unProcessedChunkReadWait = Configuration
				.getProperty(EnvVars.ENV_MOLSAMOI_UNPROCESSED_CHUNK_WAIT_INTERVAL);

		if (unProcessedChunkReadWait == null) {
			this.kUnProcessedChunkReadWait = 1000;

		} else {
			this.kUnProcessedChunkReadWait = Integer
					.parseInt(unProcessedChunkReadWait);

		}

		this.kProcessUnProcessedChunks = Configuration
				.getBooleanProperty(EnvVars.ENV_MOLSAMOI_PROCESS_UNPROCESSED_CHUNKS);
	}

	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		
		long totalNumberOfCasesProcessed = 0;
		long totalNumberOfCasesSkipped = 0;

		final long totalNumberOfUnprocessedChunks = unprocessedBatchProcessChunkDtlsList.dtls
				.size();
		MOLSAInformationProviderProcessChunkResult molsaInfoProviderProcessChunkResult;

		final curam.core.impl.CuramBatch curamBatchObj = new curam.core.impl.CuramBatch();
		final int kEmailMessageBufSize = 512;
		final StringBuffer emailMessage = new StringBuffer(kEmailMessageBufSize);

		for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); i++) {
			molsaInfoProviderProcessChunkResult = decodeProcessChunkResult(processedBatchProcessChunkDtlsList.dtls
					.item(i).resultSummary);
			totalNumberOfCasesProcessed += molsaInfoProviderProcessChunkResult.caseProcessCount;
			totalNumberOfCasesSkipped += molsaInfoProviderProcessChunkResult.casesSkippedCount;

		}
		
		

		if (totalNumberOfUnprocessedChunks > 0) {

			final AppException errChunksSkippedText = new AppException(
					curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.ERR_CHUNKS_SKIPPED);

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
				curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_PROCESSED);

		infTotalCasesText.arg(totalNumberOfCasesProcessed);

		emailMessage
				.append(CuramConst.gkNewLine)
				.append(infTotalCasesText.getMessage(ProgramLocale
						.getDefaultServerLocale()))
				.append(CuramConst.gkNewLine);

		if (totalNumberOfCasesSkipped > 0) {

			final AppException infTotalSkippedCasesText = new AppException(
					curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_SKIPPED);

			infTotalSkippedCasesText.arg(totalNumberOfCasesSkipped);

			emailMessage
					.append(CuramConst.gkNewLine)
					.append(infTotalSkippedCasesText.getMessage(ProgramLocale
							.getDefaultServerLocale()))
					.append(CuramConst.gkNewLine);

		}

		curamBatchObj.emailMessage = emailMessage.toString();

		curamBatchObj
				.setEmailSubject(curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_PROCESSED);

		curamBatchObj.setStartTime(batchProcessDtls.startDateTime);
		curamBatchObj.setEndTime();
		curamBatchObj.sendEmail();

	}

	/**
	 * This method composes and sends the batch report for this batch program.
	 * 
	 * @param resultSummary
	 * @return MOLSAInformationProviderProcessChunkResult
	 */
	public MOLSAInformationProviderProcessChunkResult decodeProcessChunkResult(
			final String resultSummary) {
		// TODO Auto-generated method stub

		final MOLSAInformationProviderProcessChunkResult molsaInfoProviderProcessChunkResult = new MOLSAInformationProviderProcessChunkResult();
		final StringTokenizer st = new StringTokenizer(resultSummary);
		int elementNumber = 0;

		while (st.hasMoreTokens()) {

			elementNumber++;
			switch (elementNumber) {
			case 1:
				molsaInfoProviderProcessChunkResult.caseProcessCount = Integer
						.parseInt(st.nextToken());
				break;

			case 2:
				molsaInfoProviderProcessChunkResult.casesSkippedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 3:
				molsaInfoProviderProcessChunkResult.fcProcessCount = Integer
						.parseInt(st.nextToken());
				break;

			case 4:
				molsaInfoProviderProcessChunkResult.iliCreatedCount = Integer
						.parseInt(st.nextToken());
				break;

			default:
				st.nextToken();
				break;
			}

		}

		return molsaInfoProviderProcessChunkResult;

	}

	@Override
	public void process() throws AppException, InformationalException {
		// TODO Auto-generated method stub
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();

		ChunkMainParameters chunkMainParameters = new ChunkMainParameters();

		MOLSAMoiBatchStream moiBatchStream = MOLSAMoiBatchStreamFactory
				.newInstance();

		MOLSAMoiBatchStreamWrapper molsaMoiBatchStreamWrapper = new MOLSAMoiBatchStreamWrapper(
				moiBatchStream);

		MOLSAMoiBatchWrapper molsaMoiBatchWrapper = new MOLSAMoiBatchWrapper(
				this);

		SecurityImplementationFactory.register();

		batchStreamHelper.setStartTime();

		String instanceID = BATCHPROCESSNAME.MOLSA_MOI;

		MOLSAMoi molsaMoi = MOLSAMoiFactory.newInstance();
		MOLSAMoiDtlsList molsaMoiDtlsList = molsaMoi.readAllMOIDetails();

		BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
		// loop through to set the batch processing details
		for (MOLSAMoiDtls molsaMoiDtls : molsaMoiDtlsList.dtls.items()) {

			if (molsaMoiDtls.batchRunDate.before(molsaMoiDtls.lastUpdated)) {

				BatchProcessingID batchProcessingID = new BatchProcessingID();
				batchProcessingID.recordID = Long.parseLong(molsaMoiDtls.qid);
				batchProcessingIDList.dtls.add(batchProcessingID);
			}
		}

		// set the chuncking parameters
		chunkMainParameters.chunkSize = kChunkSize;
		chunkMainParameters.dontRunStream = kDontRunStream;
		chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
		chunkMainParameters.startChunkKey = 1L;
		chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;

		batchStreamHelper.runChunkMain(instanceID, null, molsaMoiBatchWrapper,
				batchProcessingIDList, chunkMainParameters,
				molsaMoiBatchStreamWrapper);
	}

}
