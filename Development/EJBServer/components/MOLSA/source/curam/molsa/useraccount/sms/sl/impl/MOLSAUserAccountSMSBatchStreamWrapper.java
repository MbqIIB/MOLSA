package curam.molsa.useraccount.sms.sl.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA SMS batch streams.
 * 
 */
public class MOLSAUserAccountSMSBatchStreamWrapper implements BatchStream {

	private curam.molsa.useraccount.sms.sl.intf.MOLSAUserAccountSMSBatchStream molsaSMSBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaSMSBatchStreamObj
	 *            MOLSASMSBatchStream
	 */
	public MOLSAUserAccountSMSBatchStreamWrapper(curam.molsa.useraccount.sms.sl.intf.MOLSAUserAccountSMSBatchStream molsaSMSBatchStreamObj) {
		this.molsaSMSBatchStream = molsaSMSBatchStreamObj;
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
		return this.molsaSMSBatchStream.processRecord(paramBatchProcessingID);
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
		this.molsaSMSBatchStream
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
		return this.molsaSMSBatchStream.getChunkResult(paramInt);
	}

}
