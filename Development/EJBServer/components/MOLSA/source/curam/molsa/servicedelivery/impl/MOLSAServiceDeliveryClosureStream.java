package curam.molsa.servicedelivery.impl;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.SERVICEDELIVERYSTATUS;
import curam.core.impl.BatchStreamHelper;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.cpm.facade.struct.ServiceDeliveryCompleteDetails;
import curam.cpm.facade.struct.ServiceDeliveryVersionKey;
import curam.cpm.facade.struct.VersionNoKey;
import curam.cpm.facade.struct.ViewServiceDeliveryDetails;
import curam.cpm.sl.struct.ServiceDeliveryKey;
import curam.piwrapper.outcomeplan.codetable.ACTIVITYOUTCOMEACHIEVED;
import curam.servicedelivery.impl.ServiceDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;
import curam.util.type.Date;

/**
 * 
 * The Streamer class for MOLSAServiceDeliveryClosureBatch.
 */
public class MOLSAServiceDeliveryClosureStream extends curam.molsa.servicedelivery.base.MOLSAServiceDeliveryClosureStream {

  protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

  long previousCaseID =0L;
  @Inject
  protected ServiceDeliveryDAO serviceDeliveryDAO;
  
 
  public MOLSAServiceDeliveryClosureStream() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  @Override
  public void process(BatchProcessStreamKey batchProcessStreamKey) throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    MOLSAServiceDeliveryClosureStreamWrapper molsaServiceDeliveryClosureStreamWrapper = new MOLSAServiceDeliveryClosureStreamWrapper(this);

    if (batchProcessStreamKey.instanceID.length() == 0) {
      batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_BULK_CHECKELIGIBILITY;

    }
    batchStreamHelper.runStream(batchProcessStreamKey, molsaServiceDeliveryClosureStreamWrapper);

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
    
   
    curam.cpm.facade.intf.ServiceDelivery serviceDeliveryObj =  curam.cpm.facade.fact.ServiceDeliveryFactory.newInstance();
    ServiceDeliveryKey serviceDeliveryKey = new ServiceDeliveryKey();
    serviceDeliveryKey.serviceDeliveryID = batchProcessingID.recordID;
    ViewServiceDeliveryDetails viewServiceDeliveryDetails = serviceDeliveryObj.viewServiceDelivery(serviceDeliveryKey);
    
   
    try {


      ServiceDeliveryCompleteDetails serviceDeliveryCompleteDetails = new ServiceDeliveryCompleteDetails();
      serviceDeliveryCompleteDetails.key= serviceDeliveryKey;
      serviceDeliveryCompleteDetails.outcome=ACTIVITYOUTCOMEACHIEVED.SUCCESSFUL;
      serviceDeliveryCompleteDetails.versionNoKey.versionNo=viewServiceDeliveryDetails.serviceDeliveryDtls.versionNo;
      VersionNoKey versionNoKey = new VersionNoKey();
      versionNoKey.versionNo=viewServiceDeliveryDetails.serviceDeliveryDtls.versionNo;
      
      ServiceDeliveryVersionKey serviceDeliveryVersionKey = new ServiceDeliveryVersionKey();
      serviceDeliveryVersionKey.key=serviceDeliveryKey;
      serviceDeliveryVersionKey.versionNoKey=versionNoKey;
      if(!viewServiceDeliveryDetails.serviceDeliveryDtls.coverPeriodEndDate.equals(Date.kZeroDate) 
          && viewServiceDeliveryDetails.serviceDeliveryDtls.coverPeriodEndDate.before(Date.getCurrentDate()) ) {
      
    //    if(viewServiceDeliveryDetails.serviceDeliveryDtls.status.equals(SERVICEDELIVERYSTATUS.OPEN)) {
         // serviceDeliveryObj.cancelServiceDelivery(serviceDeliveryVersionKey);
      //  }
        
        if(viewServiceDeliveryDetails.serviceDeliveryDtls.status.equals(SERVICEDELIVERYSTATUS.INPROGRESS)) {
          serviceDeliveryObj.complete(serviceDeliveryCompleteDetails);
          creoleBulkCaseChunkReassessmentResult.casesProcessedCount += 1;
        }
        
      }
      
      
    } catch (AppException appException) {
      Trace.kTopLevelLogger.info("********  Service Delivery Failed ==> " + batchProcessingID.recordID);
 
     
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
    
    
    

    return null;
  }
  
  
  

}
