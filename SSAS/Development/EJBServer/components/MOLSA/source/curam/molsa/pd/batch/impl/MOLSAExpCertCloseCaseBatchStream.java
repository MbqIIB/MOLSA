package curam.molsa.pd.batch.impl;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.facade.struct.CloseCaseDetails;
import curam.core.impl.BatchStreamHelper;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.molsa.core.facade.intf.MOLSAProductDelivery;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;

public class MOLSAExpCertCloseCaseBatchStream extends
		curam.molsa.pd.batch.base.MOLSAExpCertCloseCaseBatchStream {

	protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

	public MOLSAExpCertCloseCaseBatchStream() {
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
		MOLSAExpCertCloseCaseBatchStreamWrapper molsaExpCertCloseCaseBatchStreamWrapper = new MOLSAExpCertCloseCaseBatchStreamWrapper(
				this);

		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_EXPCERTCLOSECASE;

		}
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaExpCertCloseCaseBatchStreamWrapper);

	}

	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID) throws AppException,
			InformationalException {

		MOLSAProductDelivery molsaProductDeliveryObj = MOLSAProductDeliveryFactory
				.newInstance();
		CloseCaseDetails details = new CloseCaseDetails();

		details.caseID = batchProcessingID.recordID;
		details.closureDate = curam.util.type.Date.getCurrentDate();
		details.reasonCode = curam.codetable.CASECLOSEREASON.CERTIFICATIONEXPIRED;

		details.actualOutcome = curam.codetable.OUTCOMEACHIEVED.ATTAINED;

		molsaProductDeliveryObj.close(details);
		
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
