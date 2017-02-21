package curam.molsa.pd.batch.impl;

import curam.core.impl.BatchMain;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingResult;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;

public class MOLSAExpCertSuspendCaseBatchWrapper implements BatchMain {

	private curam.molsa.pd.batch.intf.MOLSAExpCertSuspendCaseBatch molsaExpCertSuspendCaseBatch;

	/**
	 * This is a constructor for the wrapper class
	 * 
	 * @param molsaExpCertSuspendCaseBatch2
	 *            MOLSAExpCertSuspendCaseBatch
	 */
	public MOLSAExpCertSuspendCaseBatchWrapper(
			MOLSAExpCertSuspendCaseBatch molsaExpCertSuspendCaseBatch2) {
		this.molsaExpCertSuspendCaseBatch = molsaExpCertSuspendCaseBatch2;
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

	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {

		this.molsaExpCertSuspendCaseBatch.sendBatchReport(instanceID,
				batchProcessDtls, processedBatchProcessChunkDtlsList,
				unprocessedBatchProcessChunkDtlsList);
	}

}
