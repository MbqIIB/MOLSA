package curam.molsa.test.informationProvider;

import curam.core.struct.CaseSearchKey;
import curam.molsa.codetable.MOLSAINFORMATIONPROVIDER;
import curam.molsa.codetable.MOLSAINFORMATIONTYPE;
import curam.molsa.codetable.MOLSAREQUESTSTATUS;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKey;
import curam.molsa.ip.facade.fact.MOLSAInformationProviderFactory;
import curam.molsa.ip.facade.struct.MOLSARequestDetailsList;
import curam.molsa.test.framework.CuramServerTest;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public class MOLSAInformationProviderTest extends CuramServerTest{

  public MOLSAInformationProviderTest(String arg0) {
    super(arg0);
    // TODO Auto-generated constructor stub
  }
  
  public void testCreateInformationRequest() throws AppException, InformationalException {
    
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoReqObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationRequestDtls requestDetails = new MOLSAInformationRequestDtls();
    requestDetails.caseParticipantRoleID=45001;
    requestDetails.endDate=Date.fromISO8601("20122014");
    requestDetails.informationProvider = MOLSAINFORMATIONPROVIDER.MOF;
    requestDetails.informationRequestID=1000l;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.COMRECORD;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.REQUESTED;
    requestDetails.startDate=Date.fromISO8601("20112013");
    MOLSAInformationRequestKey requestKey = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    curam.molsa.ip.entity.intf.MOLSAInformationRequest molsaInformationRequest= curam.molsa.ip.entity.fact.MOLSAInformationRequestFactory.newInstance();
    MOLSAInformationRequestDtls requestDtls = molsaInformationRequest.read(requestKey);
    assertEquals(requestDetails.caseParticipantRoleID, requestDtls.caseParticipantRoleID);
    
   
  }     
  
 
  public void testListInformationRequest() throws AppException, InformationalException {
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoReqObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationRequestDtls requestDetails = new MOLSAInformationRequestDtls();
    requestDetails.caseParticipantRoleID=45001;
    requestDetails.endDate=Date.fromISO8601("20122014");
    requestDetails.informationProvider = MOLSAINFORMATIONPROVIDER.MOF;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.COMRECORD;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.REQUESTED;
    requestDetails.startDate=Date.fromISO8601("20112013");
    MOLSAInformationRequestKey requestKey = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    requestDetails.caseParticipantRoleID=45001;
    requestDetails.endDate=Date.fromISO8601("20122014");
    requestDetails.informationProvider = MOLSAINFORMATIONPROVIDER.MOI;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.DEATHRECORDS;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.COMPLETED;
    requestDetails.startDate=Date.fromISO8601("20112013");
    MOLSAInformationRequestKey requestKey1 = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    
    CaseSearchKey caseID=new CaseSearchKey();
    caseID.caseID = 20023;
    MOLSARequestDetailsList dtlsList= molsaInfoReqObj.listInformationRequest(caseID);
    assertEquals(2, dtlsList.dtls.size());
    
  }
public void testCreateInformationResponse() throws AppException, InformationalException {
    
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoReqObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationRequestDtls requestDetails = new MOLSAInformationRequestDtls();
    requestDetails.caseParticipantRoleID=45001;
    requestDetails.endDate=Date.fromISO8601("20122014");
    requestDetails.informationProvider = MOLSAINFORMATIONPROVIDER.MOF;
    requestDetails.informationRequestID=1000l;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.COMRECORD;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.REQUESTED;
    requestDetails.startDate=Date.fromISO8601("20112013");
    MOLSAInformationRequestKey requestKey = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoResponseObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationResponseDtls responseDtls=new MOLSAInformationResponseDtls();
    responseDtls.informationRequestID=requestKey.informationRequestID;
    responseDtls.receivedDate=Date.fromISO8601("12122014");
    responseDtls.response="completed";
	 responseDtls.createdBy = TransactionInfo.getProgramUser();
    MOLSAInformationResponseKey responseKey= molsaInfoResponseObj.createInformationResponse(responseDtls);
   curam.molsa.ip.entity.intf.MOLSAInformationResponse molsaInformationResponseObj=curam.molsa.ip.entity.fact.MOLSAInformationResponseFactory.newInstance();
   MOLSAInformationResponseDtls responseDtls1=molsaInformationResponseObj.read(responseKey);
   
   assertEquals(responseDtls.informationRequestID, responseDtls1.informationRequestID);
    
  }
  
  public void testListInformationResponse() throws AppException, InformationalException {
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoReqObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationRequestDtls requestDetails = new MOLSAInformationRequestDtls();
    requestDetails.caseParticipantRoleID=45001;
    requestDetails.endDate=Date.fromISO8601("20122014");
    requestDetails.informationProvider = MOLSAINFORMATIONPROVIDER.MOF;
    requestDetails.informationRequestID=1000l;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.COMRECORD;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.REQUESTED;
    requestDetails.startDate=Date.fromISO8601("20112013");
    MOLSAInformationRequestKey requestKey = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoResponseObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationResponseDtls responseDtls=new MOLSAInformationResponseDtls();
    responseDtls.informationRequestID=requestKey.informationRequestID;
    responseDtls.receivedDate=Date.fromISO8601("12122014");
    responseDtls.response="completed";
    MOLSAInformationResponseKey responseKey= molsaInfoResponseObj.createInformationResponse(responseDtls);
   
   
   responseDtls.informationRequestID=requestKey.informationRequestID;
   responseDtls.receivedDate=Date.fromISO8601("12122014");
   responseDtls.response="completed";
    responseDtls.createdBy = TransactionInfo.getProgramUser();
   MOLSAInformationResponseKey responseKey1= molsaInfoResponseObj.createInformationResponse(responseDtls);
   
   MOLSAInformationRequestKey requestID=new MOLSAInformationRequestKey();
   requestID.informationRequestID=requestKey.informationRequestID;
  
    MOLSAInformationResponseDtlsList responseDtlsList = molsaInfoResponseObj.listInformationResponse(requestID);
    assertEquals(2, responseDtlsList.dtls.size());
    
   
  }
 
 
}
