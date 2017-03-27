package curam.molsa.ip.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Information provider batch streams.
 * 
 */
public class MOLSATrackResponseBatchStreamWrapper implements BatchStream {

	private curam.molsa.ip.batch.intf.MOLSATrackResponseBatchStream molsaTrackResponseBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaTrackResponseBatchStream2
	 *            MOLSATrackResponseBatchStream
	 */
	public MOLSATrackResponseBatchStreamWrapper(
			curam.molsa.ip.batch.intf.MOLSATrackResponseBatchStream molsaTrackResponseBatchStream2) {
		this.molsaTrackResponseBatchStream = molsaTrackResponseBatchStream2;
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
		return this.molsaTrackResponseBatchStream.processRecord(
				paramBatchProcessingID);
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
		this.molsaTrackResponseBatchStream
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
		return this.molsaTrackResponseBatchStream
				.getChunkResult(paramInt);
	}

}
