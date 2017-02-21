package curam.molsa.pd.batch.impl;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.facade.fact.ProductDeliveryFactory;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.ProductDeliverySuspensionKey;
import curam.core.impl.BatchStreamHelper;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;

public class MOLSAExpCertSuspendCaseBatchStream extends
		curam.molsa.pd.batch.base.MOLSAExpCertSuspendCaseBatchStream {

	protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

	public MOLSAExpCertSuspendCaseBatchStream() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		StringBuffer result = new StringBuffer();
		creoleBulkCaseChunkReassessmentResult.casesSkippedCount += skippedCasesCount;
		result.append(creoleBulkCaseChunkReassessmentResult.casesSkippedCount);
		result.append('\t');
		result.append(creoleBulkCaseChunkReassessmentResult.casesProcessedCount);
		result.append('\t');
		result.append(creoleBulkCaseChunkReassessmentResult.casesChangedCount);

		creoleBulkCaseChunkReassessmentResult.casesProcessedCount = 0;
		creoleBulkCaseChunkReassessmentResult.casesSkippedCount = 0;
		creoleBulkCaseChunkReassessmentResult.casesChangedCount = 0;
		return result.toString();
	}

	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSAExpCertSuspendCaseBatchStreamWrapper molsaExpCertSuspendCaseBatchStreamWrapper = new MOLSAExpCertSuspendCaseBatchStreamWrapper(
				this);

		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_EXPCERTSUSPCASE;

		}
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaExpCertSuspendCaseBatchStreamWrapper);

	}

	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID) throws AppException,
			InformationalException {
		
		ProductDeliverySuspensionKey key = new ProductDeliverySuspensionKey();
		
		ProductDelivery productDeliveryObj = ProductDeliveryFactory.newInstance();
		
		key.caseID = batchProcessingID.recordID;
		key.reasonCode = curam.codetable.CASESUSPENDREASON.CERTIFICATIONEXPIRED;
		//key.comments = 
		//key.priorityCode =
		//key.sensitivityCode = 
		
		productDeliveryObj.suspend(key);
		
		creoleBulkCaseChunkReassessmentResult.casesProcessedCount += 1;
				    
		return null;
	}

	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		for (BatchProcessingSkippedRecord batchProcessingSkippedRecord : batchProcessingSkippedRecordList.dtls)

		{

			Trace.kTopLevelLogger
					.info("********************* Inside processSkippedCases. SkippedCase ID ==> "
							+ batchProcessingSkippedRecord.recordID
							+ " ********** ");
			Trace.kTopLevelLogger.info("***************** Error Message "
					+ batchProcessingSkippedRecord.errorMessage);
		}

	}

}
