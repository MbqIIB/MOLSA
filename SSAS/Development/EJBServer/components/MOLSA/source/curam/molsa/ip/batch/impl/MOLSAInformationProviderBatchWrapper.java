package curam.molsa.ip.batch.impl;

import curam.core.impl.BatchMain;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingResult;
import curam.molsa.ip.batch.impl.MOLSAInformationProviderBatch;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

public class MOLSAInformationProviderBatchWrapper implements BatchMain {

  private curam.molsa.ip.batch.intf.MOLSAInformationProviderBatch molsaInformationProviderBatch;

  public MOLSAInformationProviderBatchWrapper(MOLSAInformationProviderBatch molsaInformationProviderBatch) {
    this.molsaInformationProviderBatch = molsaInformationProviderBatch;
  }

  @Override
  public BatchProcessingResult doExtraProcessing(BatchProcessStreamKey batchProcessStreamKey, Blob batchProcessParameters) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
    this.molsaInformationProviderBatch.sendBatchReport(instanceID, batchProcessDtls, processedBatchProcessChunkDtlsList, unprocessedBatchProcessChunkDtlsList);

  }

}
