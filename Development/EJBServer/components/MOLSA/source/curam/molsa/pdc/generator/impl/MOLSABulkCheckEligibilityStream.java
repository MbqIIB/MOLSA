package curam.molsa.pdc.generator.impl;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.MaintainCaseFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.intf.CaseHeader;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.CaseIDKey;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.struct.CREOLEProgramRecommendationDetailsList1;
import curam.creoleprogramrecommendation.facade.struct.ProgramRecommendationDetails;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationCalculator;
import curam.creoleprogramrecommendation.impl.RequestedProduct;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProduct;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProductDAO;
import curam.creoleprogramrecommendation.product.impl.RecommendationPeriodUtils;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.StringUtil;
import curam.util.resources.Trace;
import curam.util.type.Date;
import curam.util.type.DateRange;
import curam.util.type.StringList;

/**
 * 
 * The Streamer class for MOLSABulkCheckEligibilityBatch.
 */
public class MOLSABulkCheckEligibilityStream extends curam.molsa.pdc.generator.base.MOLSABulkCheckEligibilityStream {

  protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

  long previousCaseID =0L;
  @Inject
  private CREOLEProgramRecommendationCalculator creoleProgramRecommendationCalculator;
  @Inject
  private IntegratedCaseDAO integratedCaseDAO;
  
  @Inject
  private CREOLEProgramRecommendationProductDAO creoleProgramRecommendationProductDAO;
  public MOLSABulkCheckEligibilityStream() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  @Override
  public void process(BatchProcessStreamKey batchProcessStreamKey) throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    MOLSABulkCheckEligibilityStreamWrapper molsaBulkCheckEligibilityStreamWrapper = new MOLSABulkCheckEligibilityStreamWrapper(this);

    if (batchProcessStreamKey.instanceID.length() == 0) {
      batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_BULK_CHECKELIGIBILITY;

    }
    batchStreamHelper.runStream(batchProcessStreamKey, molsaBulkCheckEligibilityStreamWrapper);

  }

  @Override
  public String getChunkResult(int skippedCasesCount) throws AppException, InformationalException {
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
  public void processSkippedCases(BatchProcessingSkippedRecordList batchProcessingSkippedRecordList) throws AppException, InformationalException {
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

  @Override
  public BatchProcessingSkippedRecord processRecord(BatchProcessingID batchProcessingID) throws AppException, InformationalException {
    
   
    //Trace.kTopLevelLogger.info("STARTING Processing caseID ==> " + batchProcessingID.recordID);
   
    try {

      curam.core.struct.CaseKey key = new curam.core.struct.CaseKey();
      key.caseID = batchProcessingID.recordID;

      CaseIDKey caseIDKey = new CaseIDKey();
      caseIDKey.caseID = batchProcessingID.recordID;
      
    
      
      CaseReferenceProductNameConcernRoleName caseRefProductNameConcernRoleName = 
        MaintainCaseFactory.newInstance().readCaseReferenceConcernRoleNameProductNameByCaseID(caseIDKey);
      CaseHeader  caseHeaderObj =  CaseHeaderFactory.newInstance();
      CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
      caseHeaderKey.caseID = batchProcessingID.recordID;
      //CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
      
      CREOLEProgramRecommendation creoleProgramRecommendationObj = CREOLEProgramRecommendationFactory.newInstance();

  
      
      ProgramRecommendationDetails programRecommendationDetails = new ProgramRecommendationDetails();
      programRecommendationDetails.caseID=batchProcessingID.recordID;
      programRecommendationDetails.numberOfMonths=12;
      programRecommendationDetails.selectedPrograms="4500";
      programRecommendationDetails.startDate=Date.getCurrentDate();
      //creoleProgramRecommendationObj.runProgramRecommendation(programRecommendationDetails);
      
      StringList productIDList = StringUtil.delimitedText2StringList(programRecommendationDetails.selectedPrograms, '\t');
      Collection requestedProducts = new ArrayList(productIDList.size());
      RequestedProduct requestedProduct;
      DateRange recommendationPeriod = RecommendationPeriodUtils.getRecommendationPeriod(programRecommendationDetails.startDate, programRecommendationDetails.numberOfMonths);
      for(Iterator i$ = productIDList.iterator(); i$.hasNext(); requestedProducts.add(requestedProduct))
      {
          String productID = (String)i$.next();
          CREOLEProgramRecommendationProduct creoleProgramRecommendationProduct = (CREOLEProgramRecommendationProduct)creoleProgramRecommendationProductDAO.get(Long.valueOf(productID));
          requestedProduct = new RequestedProduct(creoleProgramRecommendationProduct, recommendationPeriod);
      }
      
      CREOLEProgramRecommendationDetailsList1 creoleProgramRecommendationDetailsList2 = creoleProgramRecommendationObj.listProgramRecommendationsForCase1(caseHeaderKey);
      
      
      
      // Checking whether the Check Eligibility Already Ran
      if(creoleProgramRecommendationDetailsList2.list.size() < 1) {
        
        
        IntegratedCase integratedCase = (IntegratedCase)integratedCaseDAO.get(Long.valueOf(batchProcessingID.recordID));
        creoleProgramRecommendationCalculator.runProgramRecommendationInline(true, integratedCase, requestedProducts);
        
      }
      
      
      //Trace.kTopLevelLogger.info("********  Processing caseID Successful ==> " +  
          //batchProcessingID.recordID );
      /*
      
      AlternateIDRMDtls alternateIDRMDtls = MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(caseHeaderDtls.concernRoleID);
      
      Trace.kTopLevelLogger.info("********  Processing caseID Successful ==> " +  
          batchProcessingID.recordID + ": "+caseRefProductNameConcernRoleName.caseReference+" "+
          caseRefProductNameConcernRoleName.concernRoleName +": "+
          alternateIDRMDtls.alternateID);
          */
      
      
    } catch (AppException appException) {
      Trace.kTopLevelLogger.info("********  Processing caseID Failed ==> " + batchProcessingID.recordID);

     
      BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();
      batchProcessingSkippedRecord.applicationErrorInd = true;
      batchProcessingSkippedRecord.errorMessage = appException.getLocalizedMessage();
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
