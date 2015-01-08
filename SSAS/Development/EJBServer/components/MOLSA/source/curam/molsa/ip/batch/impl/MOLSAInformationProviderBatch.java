package curam.molsa.ip.batch.impl;

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
import curam.molsa.ip.batch.fact.MOLSAInformationProviderBatchStreamFactory;
import curam.molsa.ip.entity.fact.MOLSAInformationProviderTmpFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationProviderTmp;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtlsList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.ProgramLocale;

/**
 * This class will maintain Information Provider Batch.
 * 
 */
public class MOLSAInformationProviderBatch extends curam.molsa.ip.batch.base.MOLSAInformationProviderBatch {

  protected static final int kFirstKeyValue = 1;
  protected final int kChunkSize;
  protected final boolean kDontRunStream;
  protected final int kChunkKeyReadWait;
  protected final int kUnProcessedChunkReadWait;
  protected final boolean kProcessUnProcessedChunks;

  public MOLSAInformationProviderBatch() {
   
    String chunkSize = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_CHUNK_SIZE);

    if (chunkSize == null) {
      this.kChunkSize = 500;

    } else {
      this.kChunkSize = Integer.parseInt(chunkSize);

    }

    this.kDontRunStream = Configuration.getBooleanProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_DONT_RUN_STREAM);

    String chunkKeyReadWait = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_CHUNK_KEY_WAIT_INTERVAL);

    if (chunkKeyReadWait == null) {
      this.kChunkKeyReadWait = 1000;

    } else {
      this.kChunkKeyReadWait = Integer.parseInt(chunkKeyReadWait);

    }

    String unProcessedChunkReadWait = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_UNPROCESSED_CHUNK_WAIT_INTERVAL);

    if (unProcessedChunkReadWait == null) {
      this.kUnProcessedChunkReadWait = 1000;

    } else {
      this.kUnProcessedChunkReadWait = Integer.parseInt(unProcessedChunkReadWait);

    }

    this.kProcessUnProcessedChunks = Configuration.getBooleanProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_PROCESS_UNPROCESSED_CHUNKS);
  }

  /**
   * This method composes and sends the batch report for this batch program.
   * 
   * @param instanceID
   * @param batchProcessDtls
   * @param processedBatchProcessChunkDtlsList
   * @param unprocessedBatchProcessChunkDtlsList
   */
  @Override
  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
    //MOLSA does not need this method implementation
    long totalNumberOfCasesProcessed = 0;
    long totalNumberOfCasesSkipped = 0;

    final long totalNumberOfUnprocessedChunks = unprocessedBatchProcessChunkDtlsList.dtls.size();
    MOLSAInformationProviderProcessChunkResult molsaInfoProviderProcessChunkResult;

    final curam.core.impl.CuramBatch curamBatchObj = new curam.core.impl.CuramBatch();
    final int kEmailMessageBufSize = 512;
    final StringBuffer emailMessage = new StringBuffer(kEmailMessageBufSize);

    for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); i++) {
      molsaInfoProviderProcessChunkResult = decodeProcessChunkResult(processedBatchProcessChunkDtlsList.dtls.item(i).resultSummary);
      totalNumberOfCasesProcessed += molsaInfoProviderProcessChunkResult.caseProcessCount;
      totalNumberOfCasesSkipped += molsaInfoProviderProcessChunkResult.casesSkippedCount;

    }

    if (totalNumberOfUnprocessedChunks > 0) {

      final AppException errChunksSkippedText = new AppException(curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.ERR_CHUNKS_SKIPPED);

      errChunksSkippedText.arg(totalNumberOfUnprocessedChunks);
      errChunksSkippedText.arg(totalNumberOfUnprocessedChunks * kChunkSize);

      emailMessage.append(CuramConst.gkNewLine).append(errChunksSkippedText.getMessage(ProgramLocale.getDefaultServerLocale())).append(CuramConst.gkNewLine);

    }

    final AppException infTotalCasesText = new AppException(curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_PROCESSED);

    infTotalCasesText.arg(totalNumberOfCasesProcessed);

    emailMessage.append(CuramConst.gkNewLine).append(infTotalCasesText.getMessage(ProgramLocale.getDefaultServerLocale())).append(CuramConst.gkNewLine);

    if (totalNumberOfCasesSkipped > 0) {

      final AppException infTotalSkippedCasesText = new AppException(curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_SKIPPED);

      infTotalSkippedCasesText.arg(totalNumberOfCasesSkipped);

      emailMessage.append(CuramConst.gkNewLine).append(infTotalSkippedCasesText.getMessage(ProgramLocale.getDefaultServerLocale())).append(CuramConst.gkNewLine);

    }

    curamBatchObj.emailMessage = emailMessage.toString();

    curamBatchObj.setEmailSubject(curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH.INF_CASE_RECORDS_PROCESSED);

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
  public MOLSAInformationProviderProcessChunkResult decodeProcessChunkResult(final String resultSummary) {
    

    final MOLSAInformationProviderProcessChunkResult molsaInfoProviderProcessChunkResult = new MOLSAInformationProviderProcessChunkResult();
    final StringTokenizer st = new StringTokenizer(resultSummary);
    int elementNumber = 0;

    while (st.hasMoreTokens()) {

      elementNumber++;
      switch (elementNumber) {
      case 1:
        molsaInfoProviderProcessChunkResult.caseProcessCount = Integer.parseInt(st.nextToken());
        break;

      case 2:
        molsaInfoProviderProcessChunkResult.casesSkippedCount = Integer.parseInt(st.nextToken());
        break;

      case 3:
        molsaInfoProviderProcessChunkResult.fcProcessCount = Integer.parseInt(st.nextToken());
        break;

      case 4:
        molsaInfoProviderProcessChunkResult.iliCreatedCount = Integer.parseInt(st.nextToken());
        break;

      default:
        st.nextToken();
        break;
      }

    }

    return molsaInfoProviderProcessChunkResult;

  }

  /**
   * This Method reads list of records from MOLSAInfromationProviderTmp table and calls the runChunckMain with the chunck parameters.
   * 
   * @param
   * @return
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public void process() throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();

    ChunkMainParameters chunkMainParameters = new ChunkMainParameters();

    curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream molsaInformationProviderBatchStream = MOLSAInformationProviderBatchStreamFactory.newInstance();

    MOLSAInformationProviderBatchStreamWrapper molsaInformationProviderBatchStreamWrapper = new MOLSAInformationProviderBatchStreamWrapper(molsaInformationProviderBatchStream);

    MOLSAInformationProviderBatchWrapper molsaInformationProviderBatchWrapper = new MOLSAInformationProviderBatchWrapper(this);

    SecurityImplementationFactory.register();

    batchStreamHelper.setStartTime();

    String instanceID = BATCHPROCESSNAME.MOLSA_INFORMATION_PROVIDER;

    MOLSAInformationProviderTmp molsaInformationProviderTmp = MOLSAInformationProviderTmpFactory.newInstance();
    MOLSAInformationProviderTmpDtlsList molsaInformationProviderTmpDtlsList = molsaInformationProviderTmp.nkreadmulti();

    BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
    // loop through to set the batch processing details
    for (MOLSAInformationProviderTmpDtls molsaInformationProviderTmpDtls : molsaInformationProviderTmpDtlsList.dtls.items()) {
      BatchProcessingID batchProcessingID = new BatchProcessingID();
      batchProcessingID.recordID = molsaInformationProviderTmpDtls.informationProviderTmpID;
      batchProcessingIDList.dtls.add(batchProcessingID);
    }
    // set the chuncking parameters
    chunkMainParameters.chunkSize = kChunkSize;
    chunkMainParameters.dontRunStream = kDontRunStream;
    chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
    chunkMainParameters.startChunkKey = 1L;
    chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;

    batchStreamHelper.runChunkMain(instanceID, null, molsaInformationProviderBatchWrapper, batchProcessingIDList, chunkMainParameters, molsaInformationProviderBatchStreamWrapper);
  }
}
