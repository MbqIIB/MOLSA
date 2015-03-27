package curam.molsa.useraccount.sms.sl.impl;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.PersonSearchDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;

public class MOLSAUserAccountSMSBatchStream extends
		curam.molsa.useraccount.sms.sl.base.MOLSAUserAccountSMSBatchStream {

	static final MOLSAUserAccountSMSChunkResult chunkResult = new MOLSAUserAccountSMSChunkResult();

	/**
	 * This method checks calls the runStream method to initiate streaming of
	 * the batch process.
	 * 
	 * @param batchProcessStreamKey
	 *            BatchProcessStreamKey
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSAUserAccountSMSBatchStreamWrapper molsaSMSBatchStream = new MOLSAUserAccountSMSBatchStreamWrapper(
				this);
		SecurityImplementationFactory.register();
		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_UASMS;
		}
		batchStreamHelper.runStream(batchProcessStreamKey, molsaSMSBatchStream);
	}

	/**
	 * 
	 * This method collects the skipped record details and updated the skipped
	 * record count and returns the count.
	 * 
	 * @param skippedCasesCount
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
		StringBuffer result = new StringBuffer();
		chunkResult.recordsSkippedCount += skippedCasesCount;
		result.append(chunkResult.recordsSkippedCount);
		chunkResult.recordsSkippedCount = 0;
		return result.toString();
	}

	/**
	 * This method checks if there is a universal access account created for the
	 * batchProcessingID and adds a new account if it is not there.
	 * 
	 * @param batchProcessingID
	 *            BatchProcessingID
	 * @return BatchProcessingSkippedRecord
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */

	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID) throws AppException,
			InformationalException {
		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();
		try {
			MOLSACitizenPortalHelper citizenPortalHelper = new MOLSACitizenPortalHelper();
			citizenPortalHelper.createNewAccount(batchProcessingID.recordID);
		} catch (Exception e) {
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			batchProcessingSkippedRecord.errorMessage = e.getMessage();
			return batchProcessingSkippedRecord;
		}
		return null;
	}

	/**
	 * 
	 * This method is not used in this batch process.
	 * 
	 * @param batchProcessingSkippedRecordList
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

	}

}
