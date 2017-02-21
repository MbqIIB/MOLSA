package curam.molsa.pd.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAExpCertCloseCaseBatchStreamWrapper implements BatchStream {

	private curam.molsa.pd.batch.intf.MOLSAExpCertCloseCaseBatchStream molsaExpCertCloseCaseBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaExpCertCloseCaseBatchStream2
	 *            MOLSAExpCertCloseCaseBatchStream
	 */
	public MOLSAExpCertCloseCaseBatchStreamWrapper(
			curam.molsa.pd.batch.intf.MOLSAExpCertCloseCaseBatchStream molsaExpCertCloseCaseBatchStream2) {
		this.molsaExpCertCloseCaseBatchStream = molsaExpCertCloseCaseBatchStream2;
	}

	/**
	 * @param paramBatchProcessingID
	 *            BatchProcessingID
	 * @param paramObject
	 *            Object
	 * @return BatchProcessingSkippedRecord
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID, Object parameters)
			throws AppException, InformationalException {
		return this.molsaExpCertCloseCaseBatchStream
				.processRecord(batchProcessingID);
	}

	/**
	 * @param paramBatchProcessingSkippedRecordList
	 *            BatchProcessingSkippedRecordList
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		this.molsaExpCertCloseCaseBatchStream
				.processSkippedCases(batchProcessingSkippedRecordList);

	}

	/**
	 * @param paramInt
	 *            int
	 * @return String
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		return this.molsaExpCertCloseCaseBatchStream
				.getChunkResult(skippedCasesCount);
	}

}
