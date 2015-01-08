package curam.molsa.eft.batch.impl;

import curam.core.impl.BatchMain;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingResult;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

/**
 * Wrapper class for MOLSAGenerateEFTBatch.
 * The class to follow the batch framework
 *
 */
public class MOLSAGenerateEFTBatchWrapper implements BatchMain {

	private curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatch molsaGenerateEFTBatch;
	
	/**
	 * Constructor.
	 * @param molsaGenerateEFTBatch  MOLSAGenerateEFTBatch
	 */
	public MOLSAGenerateEFTBatchWrapper(
			MOLSAGenerateEFTBatch molsaGenerateEFTBatch) {
		this.molsaGenerateEFTBatch = molsaGenerateEFTBatch;
	}
	
	/**
   * Note:- Not used in MOLSA. So empty implementation
   * @param batchProcessStreamKey
   *          BatchProcessStreamKey
   * @param batchProcessParameters
   *          Blob
   * @return BatchProcessingResult.
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
   */
	@Override
	public BatchProcessingResult doExtraProcessing(
			BatchProcessStreamKey batchProcessStreamKey,
			Blob batchProcessParameters) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		return null;
	}

	/**
   * Calls the sendBatchReport method of the Batch class.
   * @param instanceID
   *          String
   * @param batchProcessDtls
   *          BatchProcessDtls
   * @param processedBatchProcessChunkDtlsList
   *          BatchProcessChunkDtlsList
   * @param unprocessedBatchProcessChunkDtlsList
   *          BatchProcessChunkDtlsList
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
   */
	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {
		this.molsaGenerateEFTBatch.sendBatchReport(instanceID,
				batchProcessDtls, processedBatchProcessChunkDtlsList,
				unprocessedBatchProcessChunkDtlsList);
		
	}

}
