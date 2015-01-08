package curam.molsa.eft.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.PaymentInstrumentDtls;
import curam.core.struct.PaymentInstrumentDtlsList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;

/**
 * Wrapper class for MOLSAGenerateEFTBatchStream.
 * The class to follow the batch framework
 *
 */
public class MOLSAGenerateEFTBatchStreamWrapper implements BatchStream{

	
private curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatchStream molsaGenerateEFTBatchStream;
	
/**
 * Constructor.
 * @param molsaGenerateEFTBatchStream2
 *          MOLSAGenerateEFTBatchStream
 */
	public MOLSAGenerateEFTBatchStreamWrapper(
			curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatchStream molsaGenerateEFTBatchStream2) {
		this.molsaGenerateEFTBatchStream = molsaGenerateEFTBatchStream2;
	}

	/**
   * Calls the processRecord method of the stream class.
   * @param paramBatchProcessingID
   *          BatchProcessingID
   * @param paramObject
   *          Object
   * @return BatchProcessingSkippedRecord
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
   */
	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID paramBatchProcessingID, Object paramObject)
			throws AppException, InformationalException {
		return this.molsaGenerateEFTBatchStream.processRecord(paramBatchProcessingID, (MOLSAGenerateEFTParam)paramObject);
	}

	/**
   * Calls the processSkippedCases method of the stream class.
   * @param paramBatchProcessingSkippedRecordList
   *          BatchProcessingSkippedRecordList
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
   */
	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList paramBatchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		this.molsaGenerateEFTBatchStream.processSkippedCases(paramBatchProcessingSkippedRecordList);
		
	}

	/**
	 * Calls the getChunkResult method of the stream class.
   * @param paramInt
   *          int
   * @return String
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
	 */
	@Override
	public String getChunkResult(int paramInt) throws AppException,
			InformationalException {
		return this.molsaGenerateEFTBatchStream.getChunkResult(paramInt);
	}

	
	}
	


