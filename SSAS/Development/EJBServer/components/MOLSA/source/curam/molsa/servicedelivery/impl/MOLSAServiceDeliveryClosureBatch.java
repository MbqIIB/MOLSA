package curam.molsa.servicedelivery.impl;

import java.util.List;
import java.util.StringTokenizer;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.impl.SERVICEDELIVERYSTATUSEntry;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.EnvVars;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.servicedelivery.fact.MOLSAServiceDeliveryClosureStreamFactory;
import curam.servicedelivery.impl.ServiceDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;

/**
 * 
 * One of the Batch used for Service Delivery Closure.
 *
 */
public class MOLSAServiceDeliveryClosureBatch extends curam.molsa.servicedelivery.base.MOLSAServiceDeliveryClosureBatch {

  @Inject
  protected ServiceDeliveryDAO serviceDeliveryDAO;
  
  protected static final int kFirstKeyValue = 1;
  protected final int kChunkSize;
  protected final boolean kDontRunStream;
  protected final int kChunkKeyReadWait;
  protected final int kUnProcessedChunkReadWait;
  protected final boolean kProcessUnProcessedChunks;

  public MOLSAServiceDeliveryClosureBatch() {
    GuiceWrapper.getInjector().injectMembers(this);
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

  @Override
  public CREOLEBulkCaseChunkReassessmentResult decodeProcessChunkResult(String resultString) throws AppException, InformationalException {

    CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();
    StringTokenizer st = new StringTokenizer(resultString);
    int elementNumber = 0;
    while (st.hasMoreTokens()) {
      ++elementNumber;
      switch (elementNumber) {
      case 1:
        creoleBulkCaseChunkReassessmentResult.casesSkippedCount = Integer.parseInt(st.nextToken());
        break;

      case 2:
        creoleBulkCaseChunkReassessmentResult.casesProcessedCount = Integer.parseInt(st.nextToken());
        break;

      case 3:
        creoleBulkCaseChunkReassessmentResult.casesChangedCount = Integer.parseInt(st.nextToken());
        break;
      }
      

    }

    return creoleBulkCaseChunkReassessmentResult;

  }
   
  @Override
  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
    long totalNumberOfCasesProcessed = 0L;
    long totalNumberOfCasesSkipped = 0L;
    long totalNumberOfCasesChanged = 0L;
    
    for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); ++i) {
      CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = decodeProcessChunkResult(((curam.core.struct.BatchProcessChunkDtls) processedBatchProcessChunkDtlsList.dtls
          .item(i)).resultSummary);
      totalNumberOfCasesProcessed += creoleBulkCaseChunkReassessmentResult.casesProcessedCount;
      totalNumberOfCasesSkipped += creoleBulkCaseChunkReassessmentResult.casesSkippedCount;
      totalNumberOfCasesChanged += creoleBulkCaseChunkReassessmentResult.casesChangedCount;

    }
    
    System.out.println("TOTAL NUMBER OF CASES PROCESSESED "+totalNumberOfCasesProcessed);
    System.out.println("TOTAL NUMBER OF CASES SKIPPED "+totalNumberOfCasesSkipped);
  }

  @Override
  public void process() throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
    MOLSAServiceDeliveryClosureBatchWrapper molsaServiceDeliveryClosureBatchWrapper = new MOLSAServiceDeliveryClosureBatchWrapper(this);
    curam.molsa.servicedelivery.intf.MOLSAServiceDeliveryClosureStream mmServiceDeliveryClosureStreamer = MOLSAServiceDeliveryClosureStreamFactory.newInstance();
    MOLSAServiceDeliveryClosureStreamWrapper molsaServiceDeliveryClosureStreamWrapper = new MOLSAServiceDeliveryClosureStreamWrapper(mmServiceDeliveryClosureStreamer);

    List<curam.servicedelivery.impl.ServiceDelivery> serviceDeliveriesToComplete = serviceDeliveryDAO.searchByStatus(
        SERVICEDELIVERYSTATUSEntry.INPROGRESS);
    BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
    BatchProcessingID batchProcessingID;

    for (curam.servicedelivery.impl.ServiceDelivery serviceDelivery : serviceDeliveriesToComplete) {

      batchProcessingID = new BatchProcessingID();
      batchProcessingID.recordID = serviceDelivery.getID();
      batchProcessingIDList.dtls.add(batchProcessingID);
    }

    
    chunkMainParameters.chunkSize = kChunkSize;
    chunkMainParameters.dontRunStream = kDontRunStream;
    chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
    chunkMainParameters.startChunkKey = 1L;
    chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;
    batchStreamHelper.runChunkMain(BATCHPROCESSNAME.MOLSA_BULK_CHECKELIGIBILITY, null, 
        molsaServiceDeliveryClosureBatchWrapper, batchProcessingIDList, chunkMainParameters,
        molsaServiceDeliveryClosureStreamWrapper);
    
    

  }

  

}
