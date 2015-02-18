package curam.molsa.pdc.generator.impl;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.EnvVars;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.pdc.generator.fact.MOLSABulkPDCGeneratorStreamFactory;
import curam.struct.CaseIDKey;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;

public class MOLSABulkPDCGeneratorBatch extends  curam.molsa.pdc.generator.base.MOLSABulkPDCGeneratorBatch{
	
	  protected static final int kFirstKeyValue = 1;
	  protected final int kChunkSize;
	  protected final boolean kDontRunStream;
	  protected final int kChunkKeyReadWait;
	  protected final int kUnProcessedChunkReadWait;
	  protected final boolean kProcessUnProcessedChunks;

	
	 public MOLSABulkPDCGeneratorBatch() {
		    String chunkSize = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_CHUNK_SIZE);
		    if (chunkSize == null) {
		      this.kChunkSize = 500;
		    } else {
		      this.kChunkSize = Integer.parseInt(chunkSize);
		    }
		    this.kDontRunStream = Configuration.getBooleanProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_DONT_RUN_STREAM);
		    String chunkKeyReadWait = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_CHUNK_KEY_WAIT_INTERVAL);
		    if (chunkKeyReadWait == null) {
		      this.kChunkKeyReadWait = 1000;
		    } else {
		      this.kChunkKeyReadWait = Integer.parseInt(chunkKeyReadWait);
		    }
		    String unProcessedChunkReadWait = Configuration.getProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_UNPROCESSED_CHUNK_WAIT_INTERVAL);

		    if (unProcessedChunkReadWait == null) {
		      this.kUnProcessedChunkReadWait = 1000;
		    } else {
		      this.kUnProcessedChunkReadWait = Integer.parseInt(unProcessedChunkReadWait);
		    }
		    this.kProcessUnProcessedChunks = Configuration.getBooleanProperty(EnvVars.ENV_MOLSAINFORMATIONPROVIDER_PROCESS_UNPROCESSED_CHUNKS);
		  }
	
	/*
	@Override
	public CREOLEBulkCaseChunkReassessmentResult decodeProcessChunkResult(
			String resultString) throws AppException, InformationalException {

		CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();
		StringTokenizer st = new StringTokenizer(resultString);
		int elementNumber = 0;
		while (st.hasMoreTokens()) {
			++elementNumber;
			switch (elementNumber) {
			case 1:
				creoleBulkCaseChunkReassessmentResult.casesSkippedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 2:
				creoleBulkCaseChunkReassessmentResult.casesProcessedCount = Integer
						.parseInt(st.nextToken());
				break;

			case 3:
				creoleBulkCaseChunkReassessmentResult.casesChangedCount = Integer
						.parseInt(st.nextToken());
				break;
			}
			// st.nextToken();

		}

		return creoleBulkCaseChunkReassessmentResult;
		
	}
	*/
	@Override
	public void sendBatchReport(String instanceID,
			BatchProcessDtls batchProcessDtls,
			BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
			BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList)
			throws AppException, InformationalException {
		
	}

	@Override
	public void process() throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
		MOLSABulkPDCGeneratorBatchWrapper molsaBulkPDCGeneratorBatchWrapper = new MOLSABulkPDCGeneratorBatchWrapper(
				this);
		curam.molsa.pdc.generator.intf.MOLSABulkPDCGeneratorStream mmBulkPDCGenerationStreamer = MOLSABulkPDCGeneratorStreamFactory
				.newInstance();
		MOLSABulkPDCGeneratorStreamWrapper molsaBulkPDCGeneratorStreamWrapper = new MOLSABulkPDCGeneratorStreamWrapper(
				mmBulkPDCGenerationStreamer);

		// Querying only those IC cases which have at least one active Legacy
		// Benefit Evidence or active Benefit evidence of type 'ELE'. Skip cases
		// which already have PDC cases and that are failed in previous batch
		// run.
		CuramValueList<CaseIDKey> curamValueList = null;
		/*
		String sql = " SELECT caseID into :caseID FROM " +
				" (SELECT UNIQUE ch.caseID as caseID " +
				" FROM evidencedescriptor ed, caseheader ch left join caserelationship cr on ch.caseid = cr.relatedcaseid left join MMBatchProcessFailure mbpf on ch.caseid = mbpf.mmFailedRecordID and mbpf.batchProcessName = 'MMBPN2' " + 
				" WHERE ch.caseTypeCode = 'CT5' AND ed.caseid = ch.caseid AND ed.evidencetype = 'DET0045100' AND ed.statusCode = 'EDS1' and cr.relatedcaseid is null and mbpf.mmFailedRecordID is null " +
				" UNION " +
				" SELECT UNIQUE ch.caseid as caseID " +
				" FROM evidencedescriptor ed, dynamicevidencedataattribute deda , caseheader ch left join caserelationship cr on ch.caseid = cr.relatedcaseid left join MMBatchProcessFailure mbpf on ch.caseid = mbpf.mmFailedRecordID and mbpf.batchProcessName = 'MMBPN2' " +
				" WHERE ch.caseTypeCode = 'CT5' AND ed.caseid = ch.caseid AND ed.evidencetype = 'DET0026014'  AND ed.statusCode = 'EDS1' " + 
				" AND deda.evidenceid = ed.relatedid AND deda.name = 'benefitType' AND deda.value = 'HCBT45000'  and cr.relatedcaseid is null and mbpf.mmFailedRecordID is null) ";
				
		 */
		
		String sql = " SELECT DISTINCT ch.caseID INTO :caseID "+
		             "FROM evidencedescriptor ed, caseheader ch "+
		             "WHERE ch.caseTypeCode = 'CT5' AND ed.caseid = ch.caseid "+
		             " AND ed.evidencetype = 'DET0001281' AND ed.statusCode = 'EDS1'";
		
		
		try {
			curamValueList = DynamicDataAccess.executeNsMulti(CaseIDKey.class,
					null, false, false, sql);
			Trace.kTopLevelLogger
					.info("********  MM Bulk PDC Generation Chunker. Total Cases with Legacy Benefit evidences and Benefit Evidence of type ELE is ==> "
							+ curamValueList.size());
		} catch (Exception e) {
			Trace.kTopLevelLogger
					.info("********  MM Bulk PDC Generation Chunker. Couldn't read the IC cases to be procesed. See error below ******");
			e.printStackTrace();
		}

		BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
		BatchProcessingID batchProcessingID;

		for (CaseIDKey caseID : curamValueList) {

			batchProcessingID = new BatchProcessingID();
			batchProcessingID.recordID = caseID.caseID;
			batchProcessingIDList.dtls.add(batchProcessingID);
		}

		Trace.kTopLevelLogger
				.info("********  MM Bulk PDC Generation Chunker. Total no of IC cases being processed ****** "
						+ curamValueList.size() );

		chunkMainParameters.chunkSize = kChunkSize;
		chunkMainParameters.dontRunStream = kDontRunStream;
		chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
		chunkMainParameters.startChunkKey = 1L;
		chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;
		batchStreamHelper.runChunkMain(BATCHPROCESSNAME.MOLSA_BULKPDC, null,
				molsaBulkPDCGeneratorBatchWrapper, batchProcessingIDList,
				chunkMainParameters, molsaBulkPDCGeneratorStreamWrapper);
		
	}
	
	/**
	 * Method generates a jRecord file for the ineligible clients medicaid ids.
	 */
	private void generateIneligibleReport() {

		
	}


}
