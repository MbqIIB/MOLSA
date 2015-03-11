package curam.molsa.test.informationProvider;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.RELATIONSHIPTYPECODE;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.core.facade.infrastructure.fact.EvidenceFactory;
import curam.core.facade.infrastructure.intf.Evidence;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.intf.CachedCaseHeader;
import curam.core.sl.infrastructure.assessment.impl.DeterminationInterval;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseSearchKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EDUCATIONLEVEL;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.MOLSAINFORMATIONPROVIDER;
import curam.molsa.codetable.MOLSAINFORMATIONTYPE;
import curam.molsa.codetable.MOLSAREQUESTSTATUS;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.codetable.RESPONSETYPE;
import curam.molsa.ip.batch.fact.MOLSAInformationProviderBatchStreamFactory;
import curam.molsa.ip.entity.fact.MOLSAInformationProviderTmpFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationProviderTmp;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKey;
import curam.molsa.ip.facade.fact.MOLSAInformationProviderFactory;
import curam.molsa.ip.facade.struct.MOLSAApplicationCaseID;
import curam.molsa.ip.facade.struct.MOLSARequestDetailsList;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * 
 * Tests information provider batch for marital status evidence update.
 * 
 */
public class MOLSAInformationProviderTest extends CERScenarioTestBase {

	/**
	 * 
	 * Constructor of the class.
	 * 
	 * @param arg0
	 *            String
	 */
	public MOLSAInformationProviderTest(String arg0) {
		super(arg0);
	}

	@Inject
	private TestHelper testHelper;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	/**
	 * Test Case used to test the scenario from person registration to product
	 * delivery case activation.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public void testScenario() throws AppException, InformationalException {
		testHelper.simulateLogin("molsamanager");
		testScenario(Date.getCurrentDate());

	}

	/**
	 * Adds the new applicant to the application.
	 * 
	 * @param application
	 *            Contains a application details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		createIntakeApplicant(application.getID(), MAHEENA_UNIQUE_NAME,
				APPLICANTROLEEntry.PRIMARY_APPLICANT);

	}

	/**
	 * Adds the required evidences to make the client eligible for Widow product
	 * delivery benefit.
	 * 
	 * * @param caseKey Contains a case identifier.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	@Override
	protected void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException {
		long participantid = getParticipantRoleID(MAHEENA_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(MAHEENA_UNIQUE_NAME).caseParticipantRoleID;
		long sisterwifeparticipantid = getParticipantRoleID(TASNEEM_UNIQUE_NAME).participantRoleID;
		long sisterwifecaseParticipantRoleID = getCaseParticipantRoleID(TASNEEM_UNIQUE_NAME).caseParticipantRoleID;

		int amount = 7000;
		int amount1 = 500;
		Date currentDate = Date.getCurrentDate();
		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, sisterwifeparticipantid,
				sisterwifecaseParticipantRoleID, currentDate,
				CITIZENSHIPCODE.QATARI, RESIDENCY.YES);

		createBirthAndDeathEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, getDate(1, 1, 1970));
		createBirthAndDeathEvidence(caseKey, sisterwifeparticipantid,
				sisterwifecaseParticipantRoleID, currentDate,
				getDate(1, 1, 1980));

		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, MARITALSTATUS.DESERTED);
		createMaritalStatusEvidence(caseKey, sisterwifeparticipantid,
				sisterwifecaseParticipantRoleID, currentDate,
				MARITALSTATUS.DESERTED);

		createEducationEvidence(caseKey, participantid, caseParticipantRoleID,
				Date.fromISO8601("20000101"), EDUCATION.ENROLLED,
				EDUCATIONLEVEL.PRIMARY);

		createGenderEvidence(caseKey, participantid, caseParticipantRoleID,
				currentDate, GENDER.FEMALE);
		createGenderEvidence(caseKey, sisterwifeparticipantid,
				sisterwifecaseParticipantRoleID, currentDate, GENDER.FEMALE);

		createHeadOfHouseholdEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate);

		createIncomeEvidence(caseKey, participantid, caseParticipantRoleID,
				getDate(10, 1, 2014), INCOMETYPECODE.INHERITANCE,
				FREQUENCYCODE.MONTHLY, amount);

		createExpenseEvidence(caseKey, participantid, caseParticipantRoleID,
				getDate(1, 1, 2014), EXPENSE.COMMERCIAL, FREQUENCYCODE.MONTHLY,
				amount1);

		createHouseholdRelationshipEvidence(caseKey,

		participantid, caseParticipantRoleID, sisterwifecaseParticipantRoleID,
				getDate(1, 1, 2000), RELATIONSHIPTYPECODE.SIBLING);

	}

	/**
	 * Set the details of the claimant to be registered.
	 * 
	 * @param customerRegistrationDetails
	 *            The registration details of the claimant.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	protected void setClaimantRegistrationDetails(
			final PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException {
		final Date claimDate = getClaimDate();

		customerRegistrationDetails.firstForename = MAHEENA_UNIQUE_NAME;
		customerRegistrationDetails.surname = SULTANA_SURNAME;
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1970);
		customerRegistrationDetails.registrationDate = claimDate;
		customerRegistrationDetails.socialSecurityNumber = "12345678901";
		customerRegistrationDetails.sex = GENDER.FEMALE;
		customerRegistrationDetails.nationality = NATIONALITY.QATARI;
		customerRegistrationDetails.birthCountry = COUNTRY.QATAR;
		customerRegistrationDetails.currentMaritalStatus = MARITALSTATUS.DESERTED;
		customerRegistrationDetails.addressData = ADDRESS_DATA;
		customerRegistrationDetails.addressType = ADDRESSLAYOUTTYPE.US;

	}

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
		Date currentDate = Date.getCurrentDate();
		PersonRegistrationDetails registrationIDDetails = new PersonRegistrationDetails();
		registrationIDDetails.currentMaritalStatus = MARITALSTATUS.DESERTED;
		registrationIDDetails.dateOfBirth = getDate(1, 1, 1980);
		registrationIDDetails.addressData = ADDRESS_DATA;
		registrationIDDetails.nationality = NATIONALITY.QATARI;
		registrationIDDetails.firstForename = TASNEEM_UNIQUE_NAME;
		registrationIDDetails.surname = SULTANA_SURNAME;
		registrationIDDetails.sex = GENDER.FEMALE;
		registrationIDDetails.registrationDate = currentDate;

		registerPersonAndAddToCase(application.getCaseID(),
				registrationIDDetails, TASNEEM_UNIQUE_NAME);

	}

	@Override
	protected void checkPDEligibilityResult(
			Timeline<? extends DeterminationInterval> determination) {
		super.checkPDEligibilityResult(determination);
	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
		List<HouseholdUnit> householdUnitList = new ArrayList<HouseholdUnit>();
	
		return householdUnitList;
	}

	/**
	 * Checks whether the COC is applicable or not.
	 * 
	 * @return boolean
	 */
	public boolean isCOCApplicable() {
		return false;
	}

	/**
	 * Perform COC changes.
	 * 
	 * @param caseKey
	 *            case identifier.
	 * @throws InformationalException
	 *             Generic Exception Signature
	 * @throws AppException
	 *             Generic Exception Signature
	 */
	protected void performCOC(final CaseKey caseKey) throws AppException,
			InformationalException {

		
	}

	@Override
	protected void postAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {

	}

	/**
	 * Asserts and checks the evidence modification after running batch.
	 * 
	 * @param caseKey
	 *            CaseKey
	 */
	@Override
	protected void preAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {

	  curam.core.facade.infrastructure.struct.CaseKey caseKey1 = new curam.core.facade.infrastructure.struct.CaseKey();
    caseKey1.caseID = caseKey.caseID;

    long participantid = getParticipantRoleID(ASIFA_UNIQUE_NAME).participantRoleID;
    long casePartcipantRoleID = getCaseParticipantRoleID(MAHEENA_UNIQUE_NAME).caseParticipantRoleID;

    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoReqObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationRequestDtls requestDetails = new MOLSAInformationRequestDtls();
    requestDetails.caseParticipantRoleID=casePartcipantRoleID;
  
    requestDetails.informationRequestID=1000l;
    requestDetails.informationType=MOLSAINFORMATIONTYPE.CITIZENSHIP;
    requestDetails.requestDate=Date.fromISO8601("20112014");
    requestDetails.requestStatus=MOLSAREQUESTSTATUS.REQUESTED;
    MOLSAInformationRequestKey requestKey = molsaInfoReqObj.createInformationRequest(requestDetails );
    
    try{
      requestDetails.informationType=MOLSAINFORMATIONTYPE.REALESTATE;
      requestDetails.startDate=Date.fromISO8601("20122014");
      requestDetails.endDate=Date.fromISO8601("20122015");
      molsaInfoReqObj.createInformationRequest(requestDetails );
    }
    catch(Exception e){
      assertEquals(BPOMOLSAINFORMATIONPROVIDERBATCH.START_DATE_END_DATE_NOT_APPLICABLE.toString(), e.getMessage().toString());
    }
    try{
      requestDetails.informationType=MOLSAINFORMATIONTYPE.CITIZENSHIP;
      requestDetails.startDate=Date.fromISO8601("20122014");
      requestDetails.endDate=Date.fromISO8601("20122013");
      molsaInfoReqObj.createInformationRequest(requestDetails );
    }
    catch(Exception e){
      assertEquals(BPOMOLSAINFORMATIONPROVIDERBATCH.END_DATE_BEFORE_START_DATE.toString(), e.getMessage().toString());
    }
    
    try{
   
      MOLSAApplicationCaseID applicationID = new MOLSAApplicationCaseID();
      applicationID.applicationCaseID = participantid;
      molsaInfoReqObj.getCaseIDFromApplicationID(applicationID );
    }
    catch(Exception e){
     assertTrue(Boolean.TRUE);
    }
    
    CaseSearchKey caseID=new CaseSearchKey();
    caseID.caseID =  caseKey.caseID;;
    MOLSARequestDetailsList dtlsList= molsaInfoReqObj.listInformationRequest(caseID);
    assertEquals(1, dtlsList.dtls.size());
    
    curam.molsa.ip.facade.intf.MOLSAInformationProvider molsaInfoResponseObj=MOLSAInformationProviderFactory.newInstance();
    MOLSAInformationResponseDtls responseDtls=new MOLSAInformationResponseDtls();
    responseDtls.informationRequestID=requestKey.informationRequestID;
    responseDtls.receivedDate=Date.fromISO8601("12122014");
    responseDtls.response="completed";
    MOLSAInformationResponseKey responseKey= molsaInfoResponseObj.createInformationResponse(responseDtls);
   
   try{
   responseDtls.informationRequestID=requestKey.informationRequestID;
   responseDtls.receivedDate=Date.fromISO8601("12122014");
   responseDtls.response="completed";
   responseDtls.createdBy = TransactionInfo.getProgramUser();
   MOLSAInformationResponseKey responseKey1= molsaInfoResponseObj.createInformationResponse(responseDtls);
   }
   catch(Exception e){
     assertEquals(BPOMOLSAINFORMATIONPROVIDERBATCH.REQUEST_STATUS_ALREADY_COMPPLETED.toString(), e.getMessage().toString());
   }
   
   MOLSAInformationRequestKey requestID=new MOLSAInformationRequestKey();
   requestID.informationRequestID=requestKey.informationRequestID;
  
    MOLSAInformationResponseDtlsList responseDtlsList = molsaInfoResponseObj.listInformationResponse(requestID);
    assertEquals(1, responseDtlsList.dtls.size());
  }

}
