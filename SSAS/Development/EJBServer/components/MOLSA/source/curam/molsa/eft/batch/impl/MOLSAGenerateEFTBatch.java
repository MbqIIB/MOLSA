package curam.molsa.eft.batch.impl;

import curam.core.impl.BatchStreamHelper;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.eft.batch.fact.MOLSAGenerateEFTBatchStreamFactory;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.type.DateTime;

/**
 * The batch file to generate the EFT Exel.
 */
public class MOLSAGenerateEFTBatch extends curam.molsa.eft.batch.base.MOLSAGenerateEFTBatch {
  protected static final int kFirstKeyValue = 1;
  protected final int kChunkSize;
  protected final boolean kDontRunStream;
  protected final int kChunkKeyReadWait;
  protected final int kUnProcessedChunkReadWait;
  protected final boolean kProcessUnProcessedChunks;

  /**
   * Constructor.
   */
  public MOLSAGenerateEFTBatch() {
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
  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }

  /**
   * This method is the start point of the batch.
   *  
   * Note: There is no Chunking for this batch, 
   * since there is no individual processing and exel is generated for all the records in the end.
   * So the Batch Parameter passed a hard coded value.
   * 
   * @param generateEFTParam MOLSAGenerateEFTParam
   * @throws AppException General Exception
   * @throws InformationalException General Exception
   */
  public void process(MOLSAGenerateEFTParam generateEFTParam) throws AppException, InformationalException {
    
    
    
    curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatchStream generateEFTBatchStreamObj = MOLSAGenerateEFTBatchStreamFactory.newInstance();
    MOLSAGenerateEFTBatchStreamWrapper generateEFTBatchStreamWrapper = new MOLSAGenerateEFTBatchStreamWrapper(generateEFTBatchStreamObj);
    MOLSAGenerateEFTBatchWrapper generateEFTBatchWrapper = new MOLSAGenerateEFTBatchWrapper(this);
   
    // There is no Chunking required , since everything is written to a file.
    // So only one value and hard coded to one
    BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
    BatchProcessingID  batchProcessingID = new  BatchProcessingID();
    batchProcessingID.recordID=CuramConst.gkOne;
    batchProcessingIDList.dtls.add(batchProcessingID);
     
    ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
    chunkMainParameters.chunkSize = kChunkSize;
    chunkMainParameters.dontRunStream = kDontRunStream;
    chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
    chunkMainParameters.startChunkKey = 1L;
    chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;

    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    batchStreamHelper.setStartTime();
    batchStreamHelper.runChunkMain(DateTime.getCurrentDateTime().toString(), 
        generateEFTParam, generateEFTBatchWrapper, batchProcessingIDList,
        chunkMainParameters, generateEFTBatchStreamWrapper);
    
  }

 

}
