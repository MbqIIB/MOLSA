package curam.molsa.ip.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Information provider batch streams.
 * 
 */
public class MOLSAInformationProviderBatchStreamWrapper implements BatchStream {

	private curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream molsaInformationProviderBatchStream;

	/**
	 * This method is a constructor for the class.
	 * 
	 * @param molsaInformationProviderBatchStream2
	 *            MOLSAInformationProviderBatchStream
	 */
	public MOLSAInformationProviderBatchStreamWrapper(
			curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream molsaInformationProviderBatchStream2) {
		this.molsaInformationProviderBatchStream = molsaInformationProviderBatchStream2;
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
		return this.molsaInformationProviderBatchStream.processRecord(
				paramBatchProcessingID,
				(MOLSAInformationProviderTmpDtls) paramObject);
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
		this.molsaInformationProviderBatchStream
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
		return this.molsaInformationProviderBatchStream
				.getChunkResult(paramInt);
	}

}
