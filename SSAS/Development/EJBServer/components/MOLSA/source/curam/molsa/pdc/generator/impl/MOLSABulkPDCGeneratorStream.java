package curam.molsa.pdc.generator.impl;

import java.io.PrintWriter;
import java.io.StringWriter;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.fact.MaintainCaseFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.CaseIDKey;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.struct.ApplicationProgramRecommendationDetails;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;

public class MOLSABulkPDCGeneratorStream extends curam.molsa.pdc.generator.base.MOLSABulkPDCGeneratorStream {



	protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();
	public MOLSABulkPDCGeneratorStream() {
		GuiceWrapper.getInjector().injectMembers(this);
	}
	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSABulkPDCGeneratorStreamWrapper molsaBulkPDCGeneratorStreamWrapper = new MOLSABulkPDCGeneratorStreamWrapper(
				this);

		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_BULKPDC;

		}
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaBulkPDCGeneratorStreamWrapper);
		
	}

	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID, MOLSAMoiDtls MOLSAMoiDtls)
			throws AppException, InformationalException {
		Trace.kTopLevelLogger.info("Processing caseID ==> "
				+ batchProcessingID.recordID);

		try {

			

			curam.core.struct.CaseKey key = new curam.core.struct.CaseKey();
			key.caseID = batchProcessingID.recordID;

			

			CaseIDKey caseIDKey = new CaseIDKey();
			caseIDKey.caseID = batchProcessingID.recordID;
			CREOLEProgramRecommendation creoleProgramRecommendationObj = CREOLEProgramRecommendationFactory.newInstance();
			ApplicationProgramRecommendationDetails applicationProgramRecommendationDetails = new ApplicationProgramRecommendationDetails();
			creoleProgramRecommendationObj.runProgramRecommendationForApplication(applicationProgramRecommendationDetails);
			
			
			
			CaseReferenceProductNameConcernRoleName caseRefProductNameConcernRoleName = MaintainCaseFactory
					.newInstance()
					.readCaseReferenceConcernRoleNameProductNameByCaseID(
							caseIDKey);

			System.out.println("caseRefProductNameConcernRoleName -->"
					+ caseRefProductNameConcernRoleName.concernRoleName);
			Trace.kTopLevelLogger
					.info("********  Processing caseID Successful ==> "
							+ batchProcessingID.recordID);
		} catch (AppException appException) {
			Trace.kTopLevelLogger
					.info("********  Processing caseID Failed ==> "
							+ batchProcessingID.recordID);
			
			// Insert a row in to the MMBatchProcessFailure table. Next
			// processing should exclude this record.
			/*
			try {
				MMBatchProcessFailureDtls mmBatchProcessFailureDtls = new MMBatchProcessFailureDtls();
				mmBatchProcessFailureDtls.mmBatchProcessFailureID = curam.util.type.UniqueID.nextUniqueID("MMBATFAIL");
				mmBatchProcessFailureDtls.batchProcessName = BATCHPROCESSNAME.BULK_PDC_GENERATION;
				mmBatchProcessFailureDtls.mmFailedRecordID = batchProcessingID.recordID;
				MMBatchProcessFailureFactory.newInstance().insert(
						mmBatchProcessFailureDtls);
			} catch (Exception e) {
				Trace.kTopLevelLogger
						.info("********  Insertion of failed record"
								+ batchProcessingID.recordID
								+ " Failed. Ignore the error and continue processing the next record.");
				e.printStackTrace();
			}
			*/
			
			BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();
			batchProcessingSkippedRecord.applicationErrorInd = true;
			batchProcessingSkippedRecord.errorMessage = appException
					.getLocalizedMessage();
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			StringWriter stringWriter = new StringWriter();
			PrintWriter printWriter = new PrintWriter(stringWriter);
			appException.printStackTrace(printWriter);
			batchProcessingSkippedRecord.stackTrace = stringWriter.toString();
			return batchProcessingSkippedRecord;
		}
		creoleBulkCaseChunkReassessmentResult.casesProcessedCount += 1;

		return null;
	}

}
