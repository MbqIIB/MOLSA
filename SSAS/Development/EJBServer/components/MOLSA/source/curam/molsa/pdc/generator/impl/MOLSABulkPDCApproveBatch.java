package curam.molsa.pdc.generator.impl;

import java.util.StringTokenizer;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.EnvVars;
import curam.core.sl.entity.fact.PositionHolderLinkFactory;
import curam.core.sl.entity.intf.PositionHolderLink;
import curam.core.sl.entity.struct.PositionHolderLinkDtls;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.struct.BatchProcessChunkDtlsList;
import curam.core.struct.BatchProcessDtls;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingIDList;
import curam.core.struct.ChunkMainParameters;
import curam.molsa.pdc.generator.fact.MOLSABulkPDCApproveStreamFactory;
import curam.molsa.pdc.generator.fact.MOLSABulkPDCApproveStreamFactory;
import curam.struct.CaseIDKey;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;

/**
 * 
 * One of the Batch used for Bulk Generation of PDC till the Approval for the migrated Data.
 * This batch does the Bulk Approval for Migrated PDCs.
 *
 */
public class MOLSABulkPDCApproveBatch extends curam.molsa.pdc.generator.base.MOLSABulkPDCApproveBatch {

  protected static final int kFirstKeyValue = 1;
  protected final int kChunkSize;
  protected final boolean kDontRunStream;
  protected final int kChunkKeyReadWait;
  protected final int kUnProcessedChunkReadWait;
  protected final boolean kProcessUnProcessedChunks;

  public MOLSABulkPDCApproveBatch() {
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

  @Override
  public CREOLEBulkCaseChunkReassessmentResult decodeProcessChunkResult(String resultString) throws AppException, InformationalException {

    CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();
    StringTokenizer st = new StringTokenizer(resultString);
    int elementNumber = 0;
    while (st.hasMoreTokens()) {
      ++elementNumber;
      switch (elementNumber) {
      case 1:
        creoleBulkCaseChunkReassessmentResult.casesSkippedCount = Integer.parseInt(st.nextToken());
        break;

      case 2:
        creoleBulkCaseChunkReassessmentResult.casesProcessedCount = Integer.parseInt(st.nextToken());
        break;

      case 3:
        creoleBulkCaseChunkReassessmentResult.casesChangedCount = Integer.parseInt(st.nextToken());
        break;
      }
      // st.nextToken();

    }

    return creoleBulkCaseChunkReassessmentResult;

  }
   
  @Override
  public void sendBatchReport(String instanceID, BatchProcessDtls batchProcessDtls, BatchProcessChunkDtlsList processedBatchProcessChunkDtlsList,
      BatchProcessChunkDtlsList unprocessedBatchProcessChunkDtlsList) throws AppException, InformationalException {
    long totalNumberOfCasesProcessed = 0L;
    long totalNumberOfCasesSkipped = 0L;
    long totalNumberOfCasesChanged = 0L;
    
    for (int i = 0; i < processedBatchProcessChunkDtlsList.dtls.size(); ++i) {
      CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = decodeProcessChunkResult(((curam.core.struct.BatchProcessChunkDtls) processedBatchProcessChunkDtlsList.dtls
          .item(i)).resultSummary);
      totalNumberOfCasesProcessed += creoleBulkCaseChunkReassessmentResult.casesProcessedCount;
      totalNumberOfCasesSkipped += creoleBulkCaseChunkReassessmentResult.casesSkippedCount;
      totalNumberOfCasesChanged += creoleBulkCaseChunkReassessmentResult.casesChangedCount;

    }
    
    System.out.println("TOTAL NUMBER OF CASES PROCESSESED "+totalNumberOfCasesProcessed);
    System.out.println("TOTAL NUMBER OF CASES SKIPPED "+totalNumberOfCasesSkipped);
  }

  @Override
  public void process() throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    ChunkMainParameters chunkMainParameters = new ChunkMainParameters();
    MOLSABulkPDCApproveBatchWrapper molsaBulkPDCApproveBatchWrapper = new MOLSABulkPDCApproveBatchWrapper(this);
    curam.molsa.pdc.generator.intf.MOLSABulkPDCApproveStream mmBulkPDCApproveStreamer = MOLSABulkPDCApproveStreamFactory.newInstance();
    MOLSABulkPDCApproveStreamWrapper molsaBulkPDCApproveStreamWrapper = new MOLSABulkPDCApproveStreamWrapper(mmBulkPDCApproveStreamer);

    // Querying only those IC cases which have at least one active Legacy
    // Benefit Evidence or active Benefit evidence of type 'Exception'. 
    CuramValueList<CaseIDKey> curamValueList = null;
   

    String sql = " SELECT DISTINCT ch.caseID INTO :caseID " + "FROM caseheader ch " + "WHERE ch.caseTypeCode = 'CT2' ";

    try {
      curamValueList = DynamicDataAccess.executeNsMulti(CaseIDKey.class, null, false, false, sql);
      Trace.kTopLevelLogger.info("********   Bulk PDC Approve Chunker. Total PDC Cases  ==> "
          + curamValueList.size());
    } catch (Exception e) {
      Trace.kTopLevelLogger.info("********  Bulk PDC Approve Chunker. Couldn't read the PDC cases to be procesed. See error below ******");
      e.printStackTrace();
    }

    BatchProcessingIDList batchProcessingIDList = new BatchProcessingIDList();
    BatchProcessingID batchProcessingID;

    for (CaseIDKey caseID : curamValueList) {

      batchProcessingID = new BatchProcessingID();
      batchProcessingID.recordID = caseID.caseID;
      batchProcessingIDList.dtls.add(batchProcessingID);
    }

    
    PositionHolderLink positionHolderLinkObj = PositionHolderLinkFactory.newInstance();
    PositionHolderLinkDtls positionHolderLinkDtls = new PositionHolderLinkDtls();
    positionHolderLinkDtls.fromDate=Date.getCurrentDate();
    positionHolderLinkDtls.positionID=45288;
    positionHolderLinkDtls.organisationStructureID=45000;
    positionHolderLinkDtls.recordStatus="RST1";
    positionHolderLinkDtls.userName="unauthenticated";
    positionHolderLinkObj.insert(positionHolderLinkDtls);
    
    PositionHolderLinkDtls positionHolderLinkDtls1 = new PositionHolderLinkDtls();
    positionHolderLinkDtls1.fromDate=Date.getCurrentDate();
    positionHolderLinkDtls1.positionID=45288;
    positionHolderLinkDtls1.organisationStructureID=45000;
    positionHolderLinkDtls1.recordStatus="RST1";
    positionHolderLinkDtls1.userName="SYSTEM";
    positionHolderLinkObj.insert(positionHolderLinkDtls1);
   
    
    Trace.kTopLevelLogger.info("********  Bulk PDC Generation Chunker. Total no of PDC cases being processed ****** " + curamValueList.size());

    chunkMainParameters.chunkSize = kChunkSize;
    chunkMainParameters.dontRunStream = kDontRunStream;
    chunkMainParameters.processUnProcessedChunks = kProcessUnProcessedChunks;
    chunkMainParameters.startChunkKey = 1L;
    chunkMainParameters.unProcessedChunkReadWait = kUnProcessedChunkReadWait;
    batchStreamHelper.runChunkMain(BATCHPROCESSNAME.MOLSA_BULKPDC_APPROVE, null, molsaBulkPDCApproveBatchWrapper, batchProcessingIDList, chunkMainParameters,
        molsaBulkPDCApproveStreamWrapper);
    
    String removePosHollink$SQLString = "Delete from PositionHolderLink where PositionHolderLinkID in ("+positionHolderLinkDtls.positionHolderLinkID+","+positionHolderLinkDtls1.positionHolderLinkID+")";
    System.out.println(removePosHollink$SQLString);
    final curam.util.dataaccess.DataAccess removePosHollink = 
      curam.util.dataaccess.DataAccessFactory.newInstance(new curam.util.dataaccess.DatabaseMetaData(
        curam.util.dataaccess.DataAccess.kNoResultClass, curam.util.dataaccess.DataAccess.kNoArg1Class, 
        curam.util.dataaccess.DataAccess.kNoArg2Class, 
        curam.util.dataaccess.DataAccess.kNs, "PositionHolderLink", "removePosHollink", false , removePosHollink$SQLString
      ));
    NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
    removePosHollink.execute(notFoundIndicator);
    
    

  }

  

}
