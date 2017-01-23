package curam.molsa.ip.batch.impl;

import curam.core.impl.BatchMain;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingResult;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

/**
 * This class is a wrapper class for MOLSA Information provider batch process.
 * 
 */
public class MOLSAInformationProviderBatchWrapper implements BatchMain {

	private curam.molsa.ip.batch.intf.MOLSAInformationProviderBatch molsaInformationProviderBatch;

	/**
	 * This is a constructor for the wrapper class
	 * 
	 * @param molsaInformationProviderBatch
	 *            MOLSAInformationProviderBatch
	 */
	public MOLSAInformationProviderBatchWrapper(
			MOLSAInformationProviderBatch molsaInformationProviderBatch) {
		this.molsaInformationProviderBatch = molsaInformationProviderBatch;
	}

	/**
	 * This method is used for additional processing
	 * 
	 * @param batchProcessStreamKey
	 *            BatchProcessStreamKey
	 * @param batchProcessParameters
	 *            Blob
	 * @return BatchProcessingResult
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public BatchProcessingResult doExtraProcessing(
			BatchProcessStreamKey batchProcessStreamKey,
			Blob batchProcessParameters) throws AppException,
			InformationalException {
		return null;
	}

	/**
	 * This method sends the batch report.
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
	 */
	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {
		this.molsaInformationProviderBatch.sendBatchReport(instanceID,
				batchProcessDtls, processedBatchProcessChunkDtlsList,
				unprocessedBatchProcessChunkDtlsList);

	}

}
