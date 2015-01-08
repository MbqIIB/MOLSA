package curam.molsa.moi.impl;

import curam.core.impl.BatchMain;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingResult;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

public class MOLSAMoiBatchWrapper implements BatchMain {

	  private curam.molsa.moi.intf.MOLSAMoiBatch molsaMoiBatch;

	  public MOLSAMoiBatchWrapper(MOLSAMoiBatch molsaMoiBatch) {
	    this.molsaMoiBatch = molsaMoiBatch;
	  }

	  @Override
	  public BatchProcessingResult doExtraProcessing(BatchProcessStreamKey batchProcessStreamKey, Blob batchProcessParameters) throws AppException, InformationalException {
	    // TODO Auto-generated method stub
	    return null;
	  }

	  @Override
	  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
	      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
	    this.molsaMoiBatch.sendBatchReport(instanceID, batchProcessDtls, processedBatchProcessChunkDtlsList, unprocessedBatchProcessChunkDtlsList);

	  }

}
