package curam.molsa.pdc.generator.impl;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.google.inject.Inject;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASESTATUS;
import curam.codetable.PRODUCTTYPE;
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
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.ProductFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.intf.CaseHeader;
import curam.core.intf.Product;
import curam.core.intf.ProductDelivery;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.infrastructure.assessment.struct.CREOLEBulkCaseChunkReassessmentResult;
import curam.core.sl.struct.CaseIDKey;
import curam.core.sl.struct.CaseUserRoleDetails;
import curam.core.sl.struct.ParticipantKeyStruct;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDtls;
import curam.core.struct.ProductKey;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.struct.CREOLEProgramRecommendationDetails;
import curam.creoleprogramrecommendation.facade.struct.CREOLEProgramRecommendationDetailsList1;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationKey;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationCalculator;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProductDAO;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.molsa.core.facade.intf.MOLSAProductDelivery;
import curam.molsa.creoleprogramrecommendation.facade.fact.MOLSACREOLEProgramRecommendationFactory;
import curam.molsa.creoleprogramrecommendation.facade.intf.MOLSACREOLEProgramRecommendation;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetails;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetailsList;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
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

public class MOLSABulkPDCGeneratorStream extends curam.molsa.pdc.generator.base.MOLSABulkPDCGeneratorStream {

  protected static final CREOLEBulkCaseChunkReassessmentResult creoleBulkCaseChunkReassessmentResult = new CREOLEBulkCaseChunkReassessmentResult();

  long previousCaseID =0L;
  @Inject
  private CREOLEProgramRecommendationCalculator creoleProgramRecommendationCalculator;
  @Inject
  private IntegratedCaseDAO integratedCaseDAO;
  
  @Inject
  private CREOLEProgramRecommendationProductDAO creoleProgramRecommendationProductDAO;
  public MOLSABulkPDCGeneratorStream() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  @Override
  public void process(BatchProcessStreamKey batchProcessStreamKey) throws AppException, InformationalException {
    BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
    MOLSABulkPDCGeneratorStreamWrapper molsaBulkPDCGeneratorStreamWrapper = new MOLSABulkPDCGeneratorStreamWrapper(this);

    if (batchProcessStreamKey.instanceID.length() == 0) {
      batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_BULKPDC_GENERATOR;

    }
    batchStreamHelper.runStream(batchProcessStreamKey, molsaBulkPDCGeneratorStreamWrapper);

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
  public BatchProcessingSkippedRecord processRecord(BatchProcessingID batchProcessingID, MOLSAMoiDtls MOLSAMoiDtls) throws AppException, InformationalException {
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
      
     
      CREOLEProgramRecommendation creoleProgramRecommendationObj = CREOLEProgramRecommendationFactory.newInstance();

  
      /*
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
      */
      removeICVerifications(batchProcessingID.recordID);
      CREOLEProgramRecommendationDetailsList1 creoleProgramRecommendationDetailsList1 = creoleProgramRecommendationObj.listProgramRecommendationsForCase1(caseHeaderKey);

      MOLSACREOLEProgramRecommendation molsaCREOLEProgramRecommendationObj = MOLSACREOLEProgramRecommendationFactory.newInstance();

      SimulatedDeterminationKey simulatedDeterminationKey = new SimulatedDeterminationKey();
      CaseHeaderReadmultiKey1 caseHeaderReadmultiKey12 = new CaseHeaderReadmultiKey1();
      caseHeaderReadmultiKey12.integratedCaseID=batchProcessingID.recordID;
     
      ProductDeliveryKey productDeliveryKey2 = new ProductDeliveryKey();
      ProductDeliveryDtls productDeliveryDtls2;
      ProductDelivery productDeliveryObj = ProductDeliveryFactory.newInstance();
      Product productObj = ProductFactory.newInstance();
      ProductKey productKey2 = new ProductKey();
      ProductDtls productDtls;
      CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List2 = caseHeaderObj.searchByIntegratedCaseID(caseHeaderReadmultiKey12);
      
      SubmitForApprovalKey submitForApprovalKey = new SubmitForApprovalKey();
      
      
      for (CREOLEProgramRecommendationDetails creoleProgramRecommendationDetails : creoleProgramRecommendationDetailsList1.list.items()) {

        CREOLEProgramRecommendationKey creoleProgramRecommendationKey = new CREOLEProgramRecommendationKey();
        creoleProgramRecommendationKey.creoleProgramRecommendationID = creoleProgramRecommendationDetails.creoleProgramRecommendationID;
        MolsaSimulatedDeterminationDetailsList molsaSimulatedDeterminationDetailsList = molsaCREOLEProgramRecommendationObj
            .listEligibleSimulatedDeterminations(creoleProgramRecommendationKey);

        
        
        for (MolsaSimulatedDeterminationDetails simulatedDeterminationDetails : molsaSimulatedDeterminationDetailsList.dtls.items()) {
          if (!simulatedDeterminationDetails.dtls.isAuthorized) {
            
            boolean isAlreadyExists = false;
            
            simulatedDeterminationKey.creoleProgramRecommendationID = simulatedDeterminationDetails.dtls.creoleProgramRecommendationID;
            simulatedDeterminationKey.simulatedDeterminationID = simulatedDeterminationDetails.dtls.simulatedDeterminationID;
            
            
            for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails1 : caseHeaderReadmultiDetails1List2.dtls.items()){
              productDeliveryKey2.caseID = caseHeaderReadmultiDetails1.caseID;
              productDeliveryDtls2 = productDeliveryObj.read(productDeliveryKey2);
              productKey2.productID = productDeliveryDtls2.productID;
              productDtls = productObj.read(productKey2);
              if(simulatedDeterminationDetails.dtls.productName.equals(productDtls.name)) {
                isAlreadyExists = true;
              }
            }
            
            if(!isAlreadyExists) {
              ProductDeliveryKey productDeliveryKey = creoleProgramRecommendationObj.authorize(simulatedDeterminationKey);
              
              
            }
          }
        }

      }
      
      
   
           
      CaseHeaderReadmultiKey1 caseHeaderReadmultiKey1 = new CaseHeaderReadmultiKey1();
      caseHeaderReadmultiKey1.integratedCaseID = batchProcessingID.recordID;
      CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List = caseHeaderObj.searchByIntegratedCaseID(caseHeaderReadmultiKey1);
      
      
      for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails1 : caseHeaderReadmultiDetails1List.dtls.items()){
        submitForApprovalKey.caseID = caseHeaderReadmultiDetails1.caseID;        
       
        if(caseHeaderReadmultiDetails1.statusCode.equals(CASESTATUS.OPEN)) {
            molsaProductDeliveryObj.submitPDCForApproval(submitForApprovalKey);
        }
        removePDCVerifications(caseHeaderReadmultiDetails1.caseID);
        removePDVerifications(caseHeaderReadmultiDetails1.concernRoleID);
        
        
      }

      /*
       * Application applicationObj = ApplicationFactory.newInstance();
       * SearchByCaseIDKey searchByCaseIDKey = new SearchByCaseIDKey();
       * searchByCaseIDKey.caseID = batchProcessingID.recordID;
       * ApplicationDtlsList applicationDtlsList =
       * applicationObj.searchByCaseID(searchByCaseIDKey);
       * 
       * for(ApplicationDtls applicationDtls :
       * applicationDtlsList.dtls.items()) {
       * 
       * 
       * 
       * CREOLEProgramRecommendation creoleProgramRecommendationObj =
       * CREOLEProgramRecommendationFactory.newInstance();
       * 
       * ApplicationProgramRecommendationDetails
       * applicationProgramRecommendationDetails = new
       * ApplicationProgramRecommendationDetails();
       * applicationProgramRecommendationDetails
       * .applicationID=applicationDtls.applicationID;
       * applicationProgramRecommendationDetails.selectedPrograms="4500";
       * creoleProgramRecommendationObj
       * .runProgramRecommendationForApplication
       * (applicationProgramRecommendationDetails);
       * 
       * 
       * 
       * MOLSACREOLEProgramRecommendation
       * molsaCREOLEProgramRecommendationObj =
       * MOLSACREOLEProgramRecommendationFactory.newInstance();
       * ApplicationKey applicationKey = new ApplicationKey();
       * applicationKey.applicationID = applicationDtls.applicationID;
       * MolsaSimulatedDeterminationDetailsList
       * simulatedDeterminationDetailsList =
       * molsaCREOLEProgramRecommendationObj
       * .listLatestAppliedForEligibleSimulatedDeterminations
       * (applicationKey); SimulatedDeterminationKey
       * simulatedDeterminationKey = new SimulatedDeterminationKey(); for
       * (MolsaSimulatedDeterminationDetails simulatedDeterminationDetails
       * : simulatedDeterminationDetailsList.dtls.items() ) {
       * if(!simulatedDeterminationDetails.dtls.isAuthorized){
       * simulatedDeterminationKey.creoleProgramRecommendationID =
       * simulatedDeterminationDetails.dtls.creoleProgramRecommendationID;
       * simulatedDeterminationKey.simulatedDeterminationID =
       * simulatedDeterminationDetails.dtls.simulatedDeterminationID;
       * creoleProgramRecommendationObj
       * .authorize(simulatedDeterminationKey); } }
       * 
       * 
       * }
       */
     
     
      AlternateIDRMDtls alternateIDRMDtls = MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(caseHeaderDtls.concernRoleID);
      
      
      
      ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
      ProductDeliveryDtls productDeliveryDtls = null;
      StringBuffer stringBuffer = new StringBuffer();
      for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails1 : caseHeaderReadmultiDetails1List.dtls.items()){
        productDeliveryKey.caseID = caseHeaderReadmultiDetails1.caseID;
        productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);
        stringBuffer.append("********  Created PDC's "+ productDeliveryKey.caseID+ " "+
            CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, productDeliveryDtls.productType, TransactionInfo.getProgramLocale()));
        Trace.kTopLevelLogger.info("********  Created PDC's "+ productDeliveryKey.caseID+ " "+
            CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, productDeliveryDtls.productType, TransactionInfo.getProgramLocale()));
      }
      if(caseHeaderReadmultiDetails1List.dtls.size() == 0) {
        Trace.kTopLevelLogger.info("********  NO PDC Exists for "+ batchProcessingID.recordID + ": "+caseRefProductNameConcernRoleName.caseReference);
        creoleBulkCaseChunkReassessmentResult.casesSkippedCount += 1;
      } else {
        Trace.kTopLevelLogger.info("********  Number of PDC created for "+ batchProcessingID.recordID 
            + ": "+caseRefProductNameConcernRoleName.caseReference+ ": "+ caseHeaderReadmultiDetails1List.dtls.size());
        creoleBulkCaseChunkReassessmentResult.casesChangedCount += caseHeaderReadmultiDetails1List.dtls.size() ;
        System.out.println("Total PDC Created at this stage:"+creoleBulkCaseChunkReassessmentResult.casesChangedCount) ;
      }
      
      Trace.kTopLevelLogger.info("********  Processing caseID Successful ==> " +  
          batchProcessingID.recordID + ": "+caseRefProductNameConcernRoleName.caseReference+" "+
          caseRefProductNameConcernRoleName.concernRoleName +": "+
          alternateIDRMDtls.alternateID);
      
      
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
    Trace.kTopLevelLogger.info("ENDING Processing caseID ==> " + batchProcessingID.recordID);
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
    System.out.println("Creating Supervisor"+TransactionInfo.getCustomUserID()+" " +TransactionInfo.getProgramUser());
    Case caseObj = CaseFactory.newInstance();
    CreateCaseSupervisorDetails createCaseSupervisorDetails = new CreateCaseSupervisorDetails();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.userName=TransactionInfo.getCustomUserID();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.startDate= Date.getCurrentDate();
    createCaseSupervisorDetails.newAdminCaseRoleDtls.comments="Added By the Batch Program";
    createCaseSupervisorDetails.newAdminCaseRoleDtls.caseID = caseID;
    caseObj.createCaseSupervisor(createCaseSupervisorDetails);
    
  }
  
  private boolean isSupervisorExists(long caseID) throws AppException, InformationalException{
    System.out.println("Checking Supervisor"+TransactionInfo.getCustomUserID()+" " +TransactionInfo.getProgramUser());
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
