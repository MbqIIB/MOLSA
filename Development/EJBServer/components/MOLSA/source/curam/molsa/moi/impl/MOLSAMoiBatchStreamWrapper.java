package curam.molsa.moi.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.intf.MOLSAMoiBatchStream;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA MOI batch streams.
 * 
 */
public class MOLSAMoiBatchStreamWrapper implements BatchStream {

	private MOLSAMoiBatchStream molsaMoiBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaMoiBatchStream2
	 *            MOLSAMoiBatchStream
	 */
	public MOLSAMoiBatchStreamWrapper(MOLSAMoiBatchStream molsaMoiBatchStream2) {
		this.molsaMoiBatchStream = molsaMoiBatchStream2;
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
			BatchProcessingID paramBatchProcessingID, Object paramObject)
			throws AppException, InformationalException {
		return this.molsaMoiBatchStream.processRecord(paramBatchProcessingID,
				(MOLSAMoiDtls) paramObject);
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
			BatchProcessingSkippedRecordList paramBatchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		this.molsaMoiBatchStream
				.processSkippedCases(paramBatchProcessingSkippedRecordList);
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
	public String getChunkResult(int paramInt) throws AppException,
			InformationalException {
		return this.molsaMoiBatchStream.getChunkResult(paramInt);
	}

}
