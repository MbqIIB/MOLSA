package curam.molsa.pdc.generator.impl;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASESTATUS;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.intf.Case;
import curam.core.facade.struct.CreateCaseSupervisorDetails;
import curam.core.facade.struct.ListICAdminCaseRoleDetails;
import curam.core.facade.struct.ListICAdminCaseRoleKey;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.MaintainCaseFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.intf.CaseHeader;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.CaseIDKey;
import curam.core.sl.struct.CaseUserRoleDetails;
import curam.core.sl.struct.ParticipantKeyStruct;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationCalculator;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProductDAO;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.molsa.core.facade.intf.MOLSAProductDelivery;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.verification.facade.infrastructure.fact.VerificationApplicationFactory;
import curam.verification.facade.infrastructure.intf.VerificationApplication;
import curam.verification.facade.infrastructure.struct.CaseEvidenceVerificationDisplayDetails;
import curam.verification.facade.infrastructure.struct.CaseEvidenceVerificationDisplayDetailsList;
import curam.verification.sl.infrastructure.entity.fact.VDIEDLinkFactory;
import curam.verification.sl.infrastructure.entity.fact.VerificationFactory;
import curam.verification.sl.infrastructure.entity.intf.VDIEDLink;
import curam.verification.sl.infrastructure.entity.intf.Verification;
import curam.verification.sl.infrastructure.entity.struct.VDIEDLinkKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationKey;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDetails;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDetailsList;

/**
 * 
 * The Streamer class for MOLSABulkPDCApproveBatch.
 */
public class MOLSABulkPDCApproveStream extends curam.molsa.pdc.generator.base.MOLSABulkPDCApproveStream {

  protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

 
  @Inject
  private CREOLEProgramRecommendationCalculator creoleProgramRecommendationCalculator;
  @Inject
  private IntegratedCaseDAO integratedCaseDAO;
  
  @Inject
  private CREOLEProgramRecommendationProductDAO creoleProgramRecommendationProductDAO;
  public MOLSABulkPDCApproveStream() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  @Override
  public void process(BatchProcessStreamKey batchProcessStreamKey) throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    MOLSABulkPDCApproveStreamWrapper molsaBulkPDCApproveStreamWrapper = new MOLSABulkPDCApproveStreamWrapper(this);

    if (batchProcessStreamKey.instanceID.length() == 0) {
      batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_BULKPDC_APPROVE;

    }
    batchStreamHelper.runStream(batchProcessStreamKey, molsaBulkPDCApproveStreamWrapper);

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
    Trace.kTopLevelLogger.info("STARTING Processing caseID ==> " + batchProcessingID.recordID);
    TransactionInfo.setCustomUserID("SYSTEM");
    try {

      curam.core.struct.CaseKey key = new curam.core.struct.CaseKey();
      key.caseID = batchProcessingID.recordID;

      CaseIDKey caseIDKey = new CaseIDKey();
      caseIDKey.caseID = batchProcessingID.recordID;
      
      MOLSAProductDelivery molsaProductDeliveryObj = MOLSAProductDeliveryFactory.newInstance();
      
      CaseReferenceProductNameConcernRoleName caseRefProductNameConcernRoleName = 
        MaintainCaseFactory.newInstance().readCaseReferenceConcernRoleNameProductNameByCaseID(caseIDKey);
      CaseHeader  caseHeaderObj =  CaseHeaderFactory.newInstance();
      CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
      caseHeaderKey.caseID = batchProcessingID.recordID;
      CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
      
      //removePDCVerifications(caseHeaderDtls.caseID);
      //removePDVerifications(caseHeaderDtls.concernRoleID);
      
      boolean isApproved = false;
      SubmitForApprovalKey submitForApprovalKey = new SubmitForApprovalKey();
      submitForApprovalKey.caseID = caseHeaderDtls.caseID;
      if(caseHeaderDtls.statusCode.equals(CASESTATUS.COMPLETED)) {                   
        if(!isSupervisorExists(batchProcessingID.recordID)) {
         createSupervisor(batchProcessingID.recordID);
        }
        molsaProductDeliveryObj.approve(submitForApprovalKey); 
        isApproved = true;

      }   
      
   
     /*
      AlternateIDRMDtls alternateIDRMDtls = MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(caseHeaderDtls.concernRoleID);
      
    
      
      ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
      ProductDeliveryDtls productDeliveryDtls = null;

      ProductDelivery productDeliveryObj = ProductDeliveryFactory.newInstance();
        productDeliveryKey.caseID = caseHeaderDtls.caseID;
        productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);

        if(isApproved) {
        Trace.kTopLevelLogger.info("********  Approved PDC Successful ==> " +  
            batchProcessingID.recordID + ": "+caseRefProductNameConcernRoleName.caseReference+" "+
            caseRefProductNameConcernRoleName.concernRoleName +": "+
            alternateIDRMDtls.alternateID);
      
        } else {
          Trace.kTopLevelLogger.info("******** Skipped ==> " +  
              batchProcessingID.recordID + ": "+caseRefProductNameConcernRoleName.caseReference+" "+
              caseRefProductNameConcernRoleName.concernRoleName +": "+
              alternateIDRMDtls.alternateID);
        }
        */
      
        Trace.kTopLevelLogger.info("********  Processing caseID Successful ==> " +  
            batchProcessingID.recordID );
      
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
  
  private void removePDCVerifications(long caseID) throws AppException, InformationalException{
    CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
    caseKeyStruct.caseID = caseID;
    CaseEvidenceVerificationDetailsList caseEvidenceVerificationDetailsList = 
      curam.verification.sl.infrastructure.fact.VerificationFactory.newInstance()
    .listPDOutstandingCaseVerificationDetails(caseKeyStruct);

    VDIEDLink vdiedLinkObj = VDIEDLinkFactory.newInstance();
    VDIEDLinkKey vdiedLinkKey = new VDIEDLinkKey();
    Verification verficationObj = VerificationFactory.newInstance();
    VerificationKey verificationKey = new VerificationKey();
    for(CaseEvidenceVerificationDetails caseEvidenceVerificationDetails : caseEvidenceVerificationDetailsList.dtls.items()) {
      verificationKey.verificationID = caseEvidenceVerificationDetails.verificationID;
      vdiedLinkKey.VDIEDLinkID = caseEvidenceVerificationDetails.vDIEDLinkID;
      verficationObj.remove(verificationKey);
      vdiedLinkObj.remove(vdiedLinkKey);
    }
    
  }
  
  private void removeICVerifications(long caseID) throws AppException, InformationalException{
    CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
    caseKeyStruct.caseID = caseID;
    CaseEvidenceVerificationDetailsList caseEvidenceVerificationDetailsList = 
      curam.verification.sl.infrastructure.fact.VerificationFactory.newInstance()
    .listOutstandingIntegratedCaseVerificationDetails(caseKeyStruct);

    VDIEDLink vdiedLinkObj = VDIEDLinkFactory.newInstance();
    VDIEDLinkKey vdiedLinkKey = new VDIEDLinkKey();
    Verification verficationObj = VerificationFactory.newInstance();
    VerificationKey verificationKey = new VerificationKey();
    for(CaseEvidenceVerificationDetails caseEvidenceVerificationDetails : caseEvidenceVerificationDetailsList.dtls.items()) {
      verificationKey.verificationID = caseEvidenceVerificationDetails.verificationID;
      vdiedLinkKey.VDIEDLinkID = caseEvidenceVerificationDetails.vDIEDLinkID;
      verficationObj.remove(verificationKey);
      vdiedLinkObj.remove(vdiedLinkKey);
    }
    
  }
  
  private void removePDVerifications(long participantID) throws AppException, InformationalException{
    
    
    ParticipantKeyStruct participantKeyStruct = new ParticipantKeyStruct();
    participantKeyStruct.participantID = participantID;
    CaseEvidenceVerificationDetailsList caseEvidenceVerificationDetailsList = 
      curam.verification.sl.infrastructure.fact.VerificationFactory.newInstance()
    .listPOutstandingVerificationDetails(participantKeyStruct);

    VDIEDLink vdiedLinkObj = VDIEDLinkFactory.newInstance();
    VDIEDLinkKey vdiedLinkKey = new VDIEDLinkKey();
    Verification verficationObj = VerificationFactory.newInstance();
    VerificationKey verificationKey = new VerificationKey();
    for(CaseEvidenceVerificationDetails caseEvidenceVerificationDetails : caseEvidenceVerificationDetailsList.dtls.items()) {
      verificationKey.verificationID = caseEvidenceVerificationDetails.verificationID;
      vdiedLinkKey.VDIEDLinkID = caseEvidenceVerificationDetails.vDIEDLinkID;
      verficationObj.remove(verificationKey);
      vdiedLinkObj.remove(vdiedLinkKey);
    }
    
  }
  
  
  private void removeVerifications(long caseID) throws AppException, InformationalException{
    CaseKey caseKey = new CaseKey();
    caseKey.caseID = caseID;
    VerificationApplication verificationApplicationObj = VerificationApplicationFactory.newInstance();
    CaseEvidenceVerificationDisplayDetailsList caseEvidenceVerificationDisplayDetailsList = 
      verificationApplicationObj.listVerificationDetailsforCaseEvidence(caseKey);
    VDIEDLink vdiedLinkObj = VDIEDLinkFactory.newInstance();
    VDIEDLinkKey vdiedLinkKey = new VDIEDLinkKey();
    Verification verficationObj = VerificationFactory.newInstance();
    VerificationKey verificationKey = new VerificationKey();
    for(CaseEvidenceVerificationDisplayDetails caseEvidenceVerificationDisplayDetails : caseEvidenceVerificationDisplayDetailsList.dtls.items()) {
      verificationKey.verificationID = caseEvidenceVerificationDisplayDetails.verificationID;
      vdiedLinkKey.VDIEDLinkID = caseEvidenceVerificationDisplayDetails.vDIEDLinkID;
      verficationObj.remove(verificationKey);
      vdiedLinkObj.remove(vdiedLinkKey);

    }
    /*
    String verSql$SQLString = "delete from VERIFICATION";
    String vdiedSql$SQLString = "delete from VDIEDLINK";
    NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
    final curam.util.dataaccess.DataAccess removeAllVer = 
      curam.util.dataaccess.DataAccessFactory.newInstance(new curam.util.dataaccess.DatabaseMetaData(
        curam.util.dataaccess.DataAccess.kNoResultClass, curam.util.dataaccess.DataAccess.kNoArg1Class, 
        curam.util.dataaccess.DataAccess.kNoArg2Class, 
        curam.util.dataaccess.DataAccess.kNs, "VERIFICATION", "verSql", false , verSql$SQLString
      ));
    final curam.util.dataaccess.DataAccess removeAllVdied = 
      curam.util.dataaccess.DataAccessFactory.newInstance(new curam.util.dataaccess.DatabaseMetaData(
        curam.util.dataaccess.DataAccess.kNoResultClass, curam.util.dataaccess.DataAccess.kNoArg1Class, 
        curam.util.dataaccess.DataAccess.kNoArg2Class, 
        curam.util.dataaccess.DataAccess.kNs, "VDIEDLINK", "vdiedSql", false , vdiedSql$SQLString
      ));
    
    try {
      removeAllVer.execute(notFoundIndicator);
    } catch (RecordNotFoundException e ) {
      
    }
    try {
            removeAllVdied.execute(notFoundIndicator);
    } catch (RecordNotFoundException e ) {
      
    }
    */
  }
  
  private void createSupervisor(long caseID) throws AppException, InformationalException{
    //System.out.println("Creating Supervisor"+TransactionInfo.getCustomUserID()+" " +TransactionInfo.getProgramUser());
    Case caseObj = CaseFactory.newInstance();
    CreateCaseSupervisorDetails createCaseSupervisorDetails = new CreateCaseSupervisorDetails();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.userName=TransactionInfo.getCustomUserID();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.startDate= Date.getCurrentDate();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.comments="Added By the Batch Program";
    createCaseSupervisorDetails.newAdminCaseRoleDtls.caseID = caseID;
    caseObj.createCaseSupervisor(createCaseSupervisorDetails);
    
  }
  
  private boolean isSupervisorExists(long caseID) throws AppException, InformationalException{
    //System.out.println("Checking Supervisor"+TransactionInfo.getCustomUserID()+" " +TransactionInfo.getProgramUser());
    boolean isAlreadyExists = false;
    curam.core.facade.intf.IntegratedCase integratedCaseObj = IntegratedCaseFactory.newInstance();
    ListICAdminCaseRoleKey listICAdminCaseRoleKey = new ListICAdminCaseRoleKey();
    listICAdminCaseRoleKey.caseID = caseID;
    ListICAdminCaseRoleDetails listICAdminCaseRoleDetails = integratedCaseObj.listAdminCaseRole(listICAdminCaseRoleKey);
    for(CaseUserRoleDetails caseUserRoleDetails : listICAdminCaseRoleDetails.caseUserRoleDetailsList.items()) {
      if(caseUserRoleDetails.dtls.userName.equals(TransactionInfo.getCustomUserID()) 
          && caseUserRoleDetails.dtls.recordStatus.equals(RECORDSTATUS.NORMAL)) {
        isAlreadyExists = true;
      }
    }
    return isAlreadyExists;
  }

}
