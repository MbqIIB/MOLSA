package curam.molsa.pd.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSACertificationExpiryBatchStreamWrapper implements
		BatchStream {

	private curam.molsa.pd.batch.intf.MOLSACertificationExpiryBatchStream molsaCertificationExpiryBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaCertificationExpiryBatchStream2
	 *            MOLSACertificationExpiryBatchStream
	 */
	public MOLSACertificationExpiryBatchStreamWrapper(
			curam.molsa.pd.batch.intf.MOLSACertificationExpiryBatchStream molsaCertificationExpiryBatchStream2) {
		this.molsaCertificationExpiryBatchStream = molsaCertificationExpiryBatchStream2;
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
		return this.molsaCertificationExpiryBatchStream
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
		this.molsaCertificationExpiryBatchStream
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
		return this.molsaCertificationExpiryBatchStream
				.getChunkResult(skippedCasesCount);
	}


}
