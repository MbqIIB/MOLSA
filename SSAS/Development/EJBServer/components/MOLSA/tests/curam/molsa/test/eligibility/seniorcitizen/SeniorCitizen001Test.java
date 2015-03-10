package curam.molsa.test.eligibility.seniorcitizen;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.compass.core.converter.basic.StringConverter;

import com.google.inject.Inject;
import com.ibm.icu.impl.Assert;
import com.pmmsoapmessenger.MessengerStub.Authenticate;
import com.pmmsoapmessenger.MessengerStub.SoapUser;

import curam.application.impl.Application;
import curam.citizenaccount.facade.struct.ConcernRoleKey;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.RELATIONSHIPTYPECODE;
import curam.codetable.SCHOOLTYPE;
import curam.codetable.VERIFICATIONSTATUS;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.codetable.impl.CASETYPECODEEntry;
import curam.codetable.impl.COMMUNICATIONSTATUSEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.fact.UniqueIDFactory;
import curam.core.facade.intf.UniqueID;
import curam.core.facade.struct.CommunicationFilterKey;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.CachedCaseHeader;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.infrastructure.assessment.impl.DeterminationInterval;
import curam.core.struct.Amount;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.dynamicevidence.type.impl.MoneyConverter;
import curam.message.GENERALSEARCH;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EDUCATIONLEVEL;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.MOLSABENEFITTYPE;
import curam.molsa.codetable.MOLSAMUNICIPALITY;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.codetable.impl.EDUCATIONLEVELEntry;
import curam.molsa.codetable.impl.MOLSAMUNICIPALITYEntry;
import curam.molsa.sms.entity.struct.MOLSASMSErrorCodeDtls;
import curam.molsa.sms.entity.struct.MOLSASMSLogDtls;
import curam.molsa.sms.entity.struct.MOLSASMSLogDtlsList;
import curam.molsa.sms.entity.struct.MOLSASMSLogKeyStruct1;
import curam.molsa.sms.entity.struct.MOLSASMSLogKeyStruct3;
import curam.molsa.sms.facade.fact.MOLSAMessageServiceFactory;
import curam.molsa.sms.facade.intf.MOLSAMessageService;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetails;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetailsList;
import curam.molsa.sms.facade.struct.MOLSACommunicationDetailList;
import curam.molsa.sms.facade.struct.MOLSAConcernRoleListAndMessageText;
import curam.molsa.sms.facade.struct.MOLSAFailedSMSDetails;
import curam.molsa.sms.facade.struct.MOLSAInitialCaseSearchCriteria;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetails;
import curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.sl.fact.MOLSASMSLogFactory;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSLog;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAFailedSMSDetailsList;
import curam.molsa.sms.facade.struct.MOLSAMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageTextKey;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.facade.struct.MOLSASMSLogKey;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.base.ParticipantTestDetails;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.type.Date;
import curam.verification.facade.infrastructure.fact.VerificationApplicationFactory;
import curam.verification.facade.infrastructure.intf.VerificationApplication;
import curam.verification.facade.infrastructure.struct.CreateVerificaitonItemProvidedDetails;
import curam.verification.facade.infrastructure.struct.ListVerificationItemNameAndLevelDetails;
import curam.verification.facade.infrastructure.struct.VDIEDLinkKey;
import curam.verification.sl.infrastructure.fact.VerificationFactory;
import curam.verification.sl.infrastructure.fact.VerificationItemProvidedFactory;
import curam.verification.sl.infrastructure.intf.Verification;
import curam.verification.sl.infrastructure.intf.VerificationItemProvided;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDetails;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDetailsList;
import curam.verification.sl.infrastructure.struct.OutstandingIndicator;
/**
 * Test class used to test the end to end flow of widow product delivery case.
 */

public class SeniorCitizen001Test extends CERScenarioTestBase {

	@Inject
	private TestHelper testHelper;
	
	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	
	
	curam.molsa.sms.facade.intf.MOLSAMessageService molsasmsObj = MOLSAMessageServiceFactory.newInstance();
	
	/**
	   * Default constructor for the class.
	   *  @param arg0
	   *  constructor
	   */
	
	public SeniorCitizen001Test(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}
	/**
	   * Test Case used to test the scenario from person registration to product delivery case activation.
	   * 
	   * @throws AppException
	   *           Generic Exception Signature.
	   * 
	   * @throws InformationalException
	   *           Generic Exception Signature.
	   */

	
	public void testScenario() throws AppException, InformationalException {
		  testHelper.simulateLogin("molsamanager");
			testScenario(Date.getCurrentDate());
		}

	  /**
	  * Adds the new applicant to the application.
	  * 
	  *  @param application
	  *     Contains a application details.
	  * 
	  * @throws AppException
	  *           Generic Exception Signature.
	  * 
	  * @throws InformationalException
	  *           Generic Exception Signature.
	  */
	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		createIntakeApplicant(application.getID(), MOHAMMED_UNIQUE_NAME,
				APPLICANTROLEEntry.PRIMARY_APPLICANT);
		
		
	}
	 /**
	  * Adds the required evidences to make the client eligible for Widow product delivery benefit.
	  *
	  *    * @param caseKey
	  *      Contains a case identifier.
	  * @throws AppException
	  *           Generic Exception Signature.
	  * 
	  * @throws InformationalException
	  *           Generic Exception Signature.
	  */

	@Override
	protected void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		long participantid = getParticipantRoleID(MOHAMMED_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID;
		
		long child1participantid = getParticipantRoleID(RAFI_UNIQUE_NAME).participantRoleID;
		long child1caseParticipantRoleID = getCaseParticipantRoleID(RAFI_UNIQUE_NAME).caseParticipantRoleID;
		
		long child2participantid = getParticipantRoleID(ZOHRA_UNIQUE_NAME).participantRoleID;
		long child2caseParticipantRoleID = getCaseParticipantRoleID(ZOHRA_UNIQUE_NAME).caseParticipantRoleID;
		
		long wife1participantid = getParticipantRoleID(FATHIMA_UNIQUE_NAME).participantRoleID;
		long wife1caseParticipantRoleID = getCaseParticipantRoleID(FATHIMA_UNIQUE_NAME).caseParticipantRoleID;
		
		long wife2participantid = getParticipantRoleID(FIRDOZ_UNIQUE_NAME).participantRoleID;
		long wife2caseParticipantRoleID = getCaseParticipantRoleID(FIRDOZ_UNIQUE_NAME).caseParticipantRoleID;
		
		int incomeamount=2000;
		int rentamount=500;
		Date currentDate = Date.getCurrentDate();
		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, child1participantid,
				child1caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, child2participantid,
				child2caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, wife1participantid,
				wife1caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, wife2participantid,
				wife2caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		
		createBirthAndDeathEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, getDate(1, 1, 1950));
		createBirthAndDeathEvidence(caseKey,child1participantid,
				child1caseParticipantRoleID, currentDate, getDate(1, 1, 2000));
		createBirthAndDeathEvidence(caseKey, child2participantid,
				child2caseParticipantRoleID, currentDate, getDate(1, 1, 1995));
		createBirthAndDeathEvidence(caseKey,  wife1participantid,
				wife1caseParticipantRoleID, currentDate, getDate(1, 1, 1984));
		createBirthAndDeathEvidence(caseKey, wife2participantid,
				wife2caseParticipantRoleID, currentDate, getDate(1, 1, 1980));
	
		
		
		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, MARITALSTATUS.MARRIED);
		createMaritalStatusEvidence(caseKey,child1participantid,
				child1caseParticipantRoleID, currentDate, MARITALSTATUS.SINGLE);
		createMaritalStatusEvidence(caseKey, child2participantid,
				child2caseParticipantRoleID, currentDate, MARITALSTATUS.SINGLE);
		createMaritalStatusEvidence(caseKey,  wife1participantid,
				wife1caseParticipantRoleID, currentDate, MARITALSTATUS.MARRIED);
		createMaritalStatusEvidence(caseKey, wife2participantid,
				wife2caseParticipantRoleID, currentDate, MARITALSTATUS.MARRIED);
		
		
		createGenderEvidence(caseKey,
				participantid,caseParticipantRoleID,
				currentDate,GENDER.MALE);
		createGenderEvidence(caseKey,
				child1participantid,
				child1caseParticipantRoleID,
				currentDate,GENDER.MALE);
		createGenderEvidence(caseKey,
				 child2participantid,
					child2caseParticipantRoleID,
				currentDate,GENDER.FEMALE);
		createGenderEvidence(caseKey,
				  wife1participantid,
					wife1caseParticipantRoleID,
				currentDate,GENDER.FEMALE);
		createGenderEvidence(caseKey,
				  wife2participantid,
					wife2caseParticipantRoleID,
				currentDate,GENDER.FEMALE);
		
		
		createHeadOfHouseholdEvidence(caseKey,
				participantid,caseParticipantRoleID,
				currentDate);
		
		
		
		createEducationEvidence(caseKey,
				child1participantid,child1caseParticipantRoleID,
				currentDate,EDUCATION.ENROLLED,
				EDUCATIONLEVEL.SECONDARY);
		
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,
				wife2caseParticipantRoleID,getDate(1,1,1995),
				RELATIONSHIPTYPECODE.SPOUSE);
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,
				wife1caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.SPOUSE);
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,
				child2caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,
				child1caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				wife2participantid,wife2caseParticipantRoleID,
				wife1caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.SISTERWIFE);
		createHouseholdRelationshipEvidence(caseKey,
				wife2participantid,wife2caseParticipantRoleID,
				child2caseParticipantRoleID,getDate(1,1,1998),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				wife2participantid,wife2caseParticipantRoleID,
				child1caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				wife1participantid,wife1caseParticipantRoleID,
				child2caseParticipantRoleID,getDate(1,1,1998),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				wife1participantid,wife1caseParticipantRoleID,
				child1caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.PARENT);
		createHouseholdRelationshipEvidence(caseKey,
				child1participantid,child1caseParticipantRoleID,
				child2caseParticipantRoleID,getDate(1,1,2000),
				RELATIONSHIPTYPECODE.SIBLING);
		
		createIncomeEvidence(caseKey,wife2participantid,
				wife2caseParticipantRoleID,getDate(1, 1, 2013),
				FREQUENCYCODE.MONTHLY,INCOMETYPECODE.OtherHouseholdPaidEmployment,incomeamount);
		
		createExpenseEvidence(caseKey,
				participantid,caseParticipantRoleID,
				getDate(1, 1, 2014),EXPENSE.RESIDENTIAL,FREQUENCYCODE.MONTHLY,rentamount);
		
		
	}

	/**
	 * Set the details of the claimant to be registered.
	 * 
	 * @param customerRegistrationDetails
	 *            The registration details of the claimant.
	 * 
	 * @throws AppException
	 * Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 * Generic Exception Signature.
	 */
	
	protected void setClaimantRegistrationDetails(
			final PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException {
		final Date claimDate = getClaimDate();

		customerRegistrationDetails.firstForename = MOHAMMED_UNIQUE_NAME;
		customerRegistrationDetails.surname = HAMEED_SURNAME;
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1950);
		customerRegistrationDetails.registrationDate = claimDate;

		customerRegistrationDetails.sex = GENDER.MALE; 
		customerRegistrationDetails.nationality = NATIONALITY.QATARI;
		customerRegistrationDetails.birthCountry = COUNTRY.QATAR;
		customerRegistrationDetails.currentMaritalStatus = MARITALSTATUS.MARRIED;
		customerRegistrationDetails.addressData = ADDRESS_DATA;
		customerRegistrationDetails.addressType = ADDRESSLAYOUTTYPE.US;

	}
	

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		Date currentDate = Date.getCurrentDate();
		//member1
		PersonRegistrationDetails registrationIDDetails = new  PersonRegistrationDetails();
        registrationIDDetails.currentMaritalStatus = MARITALSTATUS.SINGLE;
        registrationIDDetails.dateOfBirth = getDate(1, 1,2000);
        registrationIDDetails.addressData = ADDRESS_DATA;
        registrationIDDetails.nationality = NATIONALITY.QATARI;
        registrationIDDetails.firstForename = RAFI_UNIQUE_NAME;
        registrationIDDetails.surname = KHAN_SURNAME;
        registrationIDDetails.sex=GENDER.MALE;
        registrationIDDetails.registrationDate=currentDate;
       
        registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails,RAFI_UNIQUE_NAME);
        
      //member2
        PersonRegistrationDetails registrationIDDetails1 = new  PersonRegistrationDetails();
        registrationIDDetails1.currentMaritalStatus = MARITALSTATUS.SINGLE;
        registrationIDDetails1.dateOfBirth = getDate(1, 1,1995);
        registrationIDDetails1.addressData = ADDRESS_DATA;
        registrationIDDetails1.nationality = NATIONALITY.QATARI;
        registrationIDDetails1.firstForename = ZOHRA_UNIQUE_NAME;
        registrationIDDetails1.surname = KHAN_SURNAME;
        registrationIDDetails1.sex=GENDER.FEMALE;
        registrationIDDetails1.registrationDate=currentDate;
       
        registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails1,ZOHRA_UNIQUE_NAME);
        
      //member3
        PersonRegistrationDetails registrationIDDetails2 = new  PersonRegistrationDetails();
        registrationIDDetails2.currentMaritalStatus = MARITALSTATUS.MARRIED;
        registrationIDDetails2.dateOfBirth = getDate(1, 1,1984);
        registrationIDDetails2.addressData = ADDRESS_DATA;
        registrationIDDetails2.nationality = NATIONALITY.QATARI;
        registrationIDDetails2.firstForename = FATHIMA_UNIQUE_NAME;
        registrationIDDetails2.surname = MOHAMMED_SURNAME;
        registrationIDDetails2.sex=GENDER.FEMALE;
        registrationIDDetails2.registrationDate=currentDate;
       
        registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails2,FATHIMA_UNIQUE_NAME);
        
      //member4
        PersonRegistrationDetails registrationIDDetails3 = new  PersonRegistrationDetails();
        registrationIDDetails3.currentMaritalStatus = MARITALSTATUS.MARRIED;
        registrationIDDetails3.dateOfBirth = getDate(1, 1,1980);
        registrationIDDetails3.addressData = ADDRESS_DATA;
        registrationIDDetails3.nationality = NATIONALITY.QATARI;
        registrationIDDetails3.firstForename = FIRDOZ_UNIQUE_NAME;
        registrationIDDetails3.surname = MOHAMMED_SURNAME;
        registrationIDDetails3.sex=GENDER.FEMALE;
        registrationIDDetails3.registrationDate=currentDate;
       
        registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails3,FIRDOZ_UNIQUE_NAME);
        
        
		
	}
	
	@Override
	protected void checkPDEligibilityResult(
			Timeline<? extends DeterminationInterval> determination) {
		super.checkPDEligibilityResult(determination);
	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		List<HouseholdUnit> householdUnitList = new ArrayList<HouseholdUnit>();
		List<Long> mandatoryMembers = new ArrayList<Long>();

		
	
		mandatoryMembers
				.add(getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID);
		mandatoryMembers
		.add(getCaseParticipantRoleID(RAFI_UNIQUE_NAME).caseParticipantRoleID);
		mandatoryMembers
		.add(getCaseParticipantRoleID(ZOHRA_UNIQUE_NAME).caseParticipantRoleID);
		mandatoryMembers
		.add(getCaseParticipantRoleID(FATHIMA_UNIQUE_NAME).caseParticipantRoleID);
		
		Calendar calendar = Date.getCurrentDate().getCalendar();
		calendar.add(Calendar.MONTH, 13);
		calendar.set(Calendar.DATE, 1);
		List<Interval<Boolean>> eligibilityIntervals = new ArrayList<Interval<Boolean>>();
		eligibilityIntervals.add(new Interval<Boolean>(null, false));

		eligibilityIntervals.add(new Interval<Boolean>(Date.getCurrentDate(),
				true));
		eligibilityIntervals.add(new Interval<Boolean>(new Date(calendar),
				false));

		HouseholdUnit householdUnit = new HouseholdUnit(mandatoryMembers,  new ArrayList<Long>(),
				(long) 45009, new Timeline<Boolean>(eligibilityIntervals));
		householdUnitList.add(householdUnit);

	
		return householdUnitList;
	}
	/**
	   * Checks whether the COC  is applicable or not.
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
	   *        case identifier.
	   * @throws InformationalException
	   *        Generic Exception Signature
	   * @throws AppException
	   *        Generic Exception Signature
	   */
	  protected void performCOC(final CaseKey caseKey) throws AppException, InformationalException {

	    final String citizenship = CITIZENSHIPCODE.QATARI;
	    final String residency = RESIDENCY.YES;
	    Date currentDate = Date.getCurrentDate();

	    long participantid = getParticipantRoleID(MOHAMMED_UNIQUE_NAME).participantRoleID;
	    long casePartcipantRoleID = getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID;

	    addVerifications(caseKey);
	    createHouseholdMemberEvidence(caseKey, participantid, casePartcipantRoleID, currentDate, CITIZENSHIPCODE.QATARI, RESIDENCY.YES);

	    addVerifications(caseKey);

	    CachedCaseHeader cachedCaseHeaderObj = CachedCaseHeaderFactory.newInstance();
	    CaseHeaderReadmultiKey1 paramCaseHeaderReadmultiKey = new CaseHeaderReadmultiKey1();

	    paramCaseHeaderReadmultiKey.integratedCaseID = caseKey.caseID;
	    CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List = ((curam.core.impl.CachedCaseHeader) cachedCaseHeaderObj)
	        .searchByIntegratedCaseID(paramCaseHeaderReadmultiKey);
	    CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails1 = caseHeaderReadmultiDetails1List.dtls.get(0);

	    evidenceControllerObj.applyAllChanges(caseKey);

	    // Check the status of the PDC Case after apply changes it should be "OPEN".
	    assertEquals(CASESTATUSEntry.OPEN.getCode(), caseHeaderDAO.get(caseHeaderReadmultiDetails1.caseID).getStatus().getCode());
	  }
	@Override
	protected void preAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		
	}
	@Override
	protected void postAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		
	}
	

	protected void addPDCVerification(final SubmitForApprovalKey approvalKey)
			throws AppException, InformationalException {

		CreateVerificaitonItemProvidedDetails details = new CreateVerificaitonItemProvidedDetails();

		final VerificationApplication verificationApplicationObj = VerificationApplicationFactory
				.newInstance();

		VerificationItemProvided verificationItemProvidedObj = VerificationItemProvidedFactory
				.newInstance();
		final Verification verificationObj = VerificationFactory.newInstance();
		
		final OutstandingIndicator outstandingIndicator = new OutstandingIndicator();

	    outstandingIndicator.verificationStatus = VERIFICATIONSTATUS.NOTVERIFIED;

	    final CaseKeyStruct caseKeyStruct = new CaseKeyStruct();

	    caseKeyStruct.caseID = approvalKey.caseID;

		for (int i = 0; i < participantTestDetailsList.size(); i++) {

			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);


			final CaseEvidenceVerificationDetailsList participantList = verificationObj
					.listCaseVerificationDetails(
						      caseKeyStruct, outstandingIndicator);
			for (final CaseEvidenceVerificationDetails verificationDetails : participantList.dtls) {
				details = new CreateVerificaitonItemProvidedDetails();

				details.dtls.itemDtls.caseID = approvalKey.caseID;
				details.dtls.itemDtls.caseParticipantConcernRoleID = participantTestDetails.participantRoleID;

				details.dtls.createDtls.dateReceived = Date.getCurrentDate();
				details.dtls.createDtls.VDIEDLinkID = verificationDetails.vDIEDLinkID;

				final VDIEDLinkKey vDIEDLinkKey = new VDIEDLinkKey();
				vDIEDLinkKey.dtls.VDIEDLinkID = verificationDetails.vDIEDLinkID;

				final ListVerificationItemNameAndLevelDetails listVerificationItemNameAndLevelDetails = verificationApplicationObj
						.readAllActiveVerificationItemNameAndLevel(vDIEDLinkKey);

				details.dtls.createDtls.verificationItemUtilizationID = listVerificationItemNameAndLevelDetails.listDtls.dtls
						.get(0).code;
				verificationItemProvidedObj
						.createVerificationItemProvided(details.dtls);

			}

		}

	}
	
	protected void testSendSMS(CaseKey caseKey) throws AppException, InformationalException {
		
		MOLSAConcernRoleListAndMessageText details = new MOLSAConcernRoleListAndMessageText();
		long id = 0;
		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);
		curam.molsa.sms.entity.intf.MOLSASMSLog molsasmsLog = curam.molsa.sms.entity.fact.MOLSASMSLogFactory.newInstance();
		details.caseID = caseKey.caseID;
		details.smsMessageText = "Message Send";
		details.smsMessageType = MOLSASMSMESSAGETEMPLATE.CONTACTMOLSA;
		
		details.concernRoleTabbedList = String.valueOf(caseHeader.getConcernRole().getID());
		
		molsasmsObj.sendSMS(details);
		
		
		curam.molsa.sms.facade.struct.MOLSAFailedSMSDetailsList molsaFailedSMSDetailsList = molsasmsObj.listAllFailedMessages();
		for(MOLSAFailedSMSDetails molsaFailedSMSDetails:molsaFailedSMSDetailsList.dtls)
		{
			if(molsaFailedSMSDetails.message.equals("Message Send"))
			{
				assertEquals(molsaFailedSMSDetails.message,details.smsMessageText);
				id=molsaFailedSMSDetails.smsMessageID;
			}
		}
		
		
		CommunicationFilterKey communicationFilterkey=new CommunicationFilterKey();
		communicationFilterkey.caseID=caseKey.caseID;
		communicationFilterkey.concernRoleID=caseHeader.getConcernRole().getID();
		communicationFilterkey.concernRoleName=caseHeader.getConcernRole().getName();
		MOLSACommunicationDetailList molsaCommunicationDetailList = molsasmsObj.listFilteredCommunication(communicationFilterkey);
		
		assertEquals(2, molsaCommunicationDetailList.dtls.size());
		
		MOLSASMSLogKey key=new MOLSASMSLogKey();
		key.smsLogIDTabbedList=String.valueOf(id);
		
		curam.molsa.sms.entity.struct.MOLSASMSLogKey key1=new curam.molsa.sms.entity.struct.MOLSASMSLogKey();
		key1.messageID=id;
		MOLSASMSLogDtls molsaSMSLogDtls = molsasmsLog.read(key1);
		MOLSASMSLogDtls details1=new MOLSASMSLogDtls();
		details1.assign(molsaSMSLogDtls);
		details1.messsageText="Message Resend";
		details1.versionNo=molsaSMSLogDtls.versionNo;
		molsasmsLog.modify(key1, details1);
		
		molsasmsObj.resendSMS(key);		
		
		MOLSASMSLogDtls molsaSMSLogDtls1 = molsasmsLog.read(key1);
		
		assertEquals(molsaSMSLogDtls1.messsageText,details1.messsageText);
		
		MOLSAMessageTextKey molsaMessageTextKey = new MOLSAMessageTextKey();
		molsaMessageTextKey.category = MOLSASMSMessageType.FOLLOWUP;
		molsaMessageTextKey.template = MOLSASMSMESSAGETEMPLATE.SUSPENDEDCASE;
		MOLSAMessageText actualmessageText = molsasmsObj.getSMSMessageText(molsaMessageTextKey);
		
		MOLSAMessageText expectedmessageText = new MOLSAMessageText();
		expectedmessageText.smsMessageText="Social assistance has been suspended for this month For inquiries, please consult the nearest branch of the Social Security Administration";
		
		assertEquals(expectedmessageText.smsMessageText,actualmessageText.smsMessageText);
		
		MOLSAInitialCaseSearchCriteria molsaInitialCaseSearchCriteria = molsasmsObj.getSMSInitialSearchCriteria();
		
		assertEquals(13, molsaInitialCaseSearchCriteria.caseTypeList.dtlsList.size());	

		molsasmsObj.exportParticipantsToExcel(details);
	}
	
	
	protected void testlistParticipantByCriteria(CaseKey caseKey) throws AppException, InformationalException{
		
		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);
		long id = 0;
		MOLSAConcernRoleListAndMessageText messageTextDetails = new MOLSAConcernRoleListAndMessageText();
		curam.molsa.sms.entity.intf.MOLSASMSLog molsasmsLog = curam.molsa.sms.entity.fact.MOLSASMSLogFactory.newInstance();
		messageTextDetails.concernRoleTabbedList = String.valueOf(caseHeader.listActiveCaseMembers().get(0).getID()).concat(" \t ").concat(String.valueOf(caseHeader.listActiveCaseMembers().get(1).getID()));
		messageTextDetails.smsMessageText = "Deffered Message Send";
		messageTextDetails.caseID = caseKey.caseID;
		messageTextDetails.smsMessageType=MOLSASMSMESSAGETEMPLATE.CONTACTMOLSA;
		
		molsasmsObj.sendSMS(messageTextDetails);
		
		curam.molsa.sms.facade.struct.MOLSAFailedSMSDetailsList molsaFailedSMSDetailsList1 = molsasmsObj.listAllFailedMessages();
		
		ArrayList<String> ar = new ArrayList<String>();
		for(MOLSAFailedSMSDetails molsaFailedSMSDetails:molsaFailedSMSDetailsList1.dtls)
		{
				id=molsaFailedSMSDetails.smsMessageID;
				String idList=String.valueOf(id);
				ar.add(idList);
		}
		assertEquals(2, ar.size());
		
		MOLSASMSLogKey logKey=new MOLSASMSLogKey();
		logKey.smsLogIDTabbedList=ar.get(0).concat(" \t ").concat(ar.get(1));
		
		for(String msgID:ar)
		{
			curam.molsa.sms.entity.struct.MOLSASMSLogKey key1=new curam.molsa.sms.entity.struct.MOLSASMSLogKey();
			key1.messageID=Long.parseLong(msgID);
			MOLSASMSLogDtls molsaSMSLogDtls = molsasmsLog.read(key1);
			MOLSASMSLogDtls details1=new MOLSASMSLogDtls();
			details1.assign(molsaSMSLogDtls);
			details1.messsageText="Deffered Message Resend";
			details1.versionNo=molsaSMSLogDtls.versionNo;
			molsasmsLog.modify(key1, details1);
			molsasmsObj.resendSMS(logKey);
			MOLSASMSLogDtls molsaSMSLogDtls1 = molsasmsLog.read(key1);			
			assertEquals(molsaSMSLogDtls1.messsageText,details1.messsageText);
		}
		
		long participantid =getParticipantRoleID(MOHAMMED_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID;
		createAdditionalBenefitEvidence(caseKey, participantid, caseParticipantRoleID, getDate(1, 1, 2014), 100, MOLSABENEFITTYPE.EID);	
		createEducationEvidence(caseKey, participantid,caseParticipantRoleID, getDate(1, 1, 2014),EDUCATION.ENROLLED,
				EDUCATIONLEVEL.SECONDARY);
		int incomeamount=10;
		MOLSAParticipantDetails actualDtls=new MOLSAParticipantDetails();
			actualDtls.addressString=caseHeader.getConcernRole().getPrimaryAddress().toString();
			actualDtls.caseID=caseKey.caseID;
			actualDtls.concernroleID=caseHeader.getConcernRole().getID();
			//actualDtls.dateOfBirth=caseHeader.getConcernRole().;
			actualDtls.participantName=caseHeader.getConcernRole().getName();
			actualDtls.participantName=actualDtls.participantName.concat(" - ").concat(caseHeader.getConcernRole().getPrimaryAlternateID());
			actualDtls.qid=caseHeader.getConcernRole().getPrimaryAlternateID();
		
	
		createIncomeEvidence(caseKey,participantid, caseParticipantRoleID,getDate(1, 1, 2013),
					FREQUENCYCODE.MONTHLY,INCOMETYPECODE.OtherHouseholdPaidEmployment,incomeamount);
		MOLSAParticipantFilterCriteriaDetails key = new MOLSAParticipantFilterCriteriaDetails();
		key.caseType=PRODUCTTYPEEntry.SENIORCITIZEN.getCode();
		key.fromAge="1";
		key.gender=GENDEREntry.MALE.getCode();
		key.hasIncome=Boolean.TRUE;
		key.isIncludeHouseHoldMembers=Boolean.TRUE;	
		key.concernRoleTabbedList= String.valueOf(caseHeader.getConcernRole().getID());
		key.toAge="100";
		key.muncipality="MM17005";
		key.educationLevel=EDUCATIONLEVELEntry.SECONDARY.getCode();
		Date fromDate=Date.getDate("20000101");
		
		MOLSAParticipantDetailsList expectedMolsaParticipantDetailsList = molsasmsObj.listParticipantByCriteria(key);
		
		MOLSAParticipantDetails expectedDtls=expectedMolsaParticipantDetailsList.dtls.get(0);
		
		assertEquals(expectedDtls.concernroleID,actualDtls.concernroleID);
		assertEquals(expectedDtls.participantName,actualDtls.participantName);
		assertEquals(expectedDtls.qid,actualDtls.qid);
		
		String expectedName=caseHeader.getConcernRole().getName();
		
		ConcernRoleKey key1 =new ConcernRoleKey();
		key1.concernRoleID=caseHeader.getConcernRole().getID();
		MOLSAAdditionalBenefitDetailsList actualMOLSAAdditionalBenefitDetailsList = molsasmsObj.listParticipantAdditionalBenefits(key1);
		MOLSAAdditionalBenefitDetails actualMOLSAAdditionalBenefitDetails = actualMOLSAAdditionalBenefitDetailsList.dtls.get(0);
		
		assertEquals(expectedName,actualMOLSAAdditionalBenefitDetails.participantName);	
		
		MOLSAParticipantFilterCriteriaDetails detailsKey = new MOLSAParticipantFilterCriteriaDetails();
		detailsKey.caseType=PRODUCTTYPEEntry.SENIORCITIZEN.getCode().concat("\t").concat(PRODUCTTYPEEntry.DESERTEDWIFE.getCode()).concat("\t").concat(PRODUCTTYPEEntry.FAMILYINNEED.getCode());
		detailsKey.fromAge="1";
		detailsKey.gender=GENDEREntry.MALE.getCode();
		detailsKey.hasIncome=Boolean.FALSE;
		detailsKey.isIncludeHouseHoldMembers=Boolean.TRUE;	
		detailsKey.concernRoleTabbedList= String.valueOf(caseHeader.getConcernRole().getID());
		detailsKey.toAge="100";
		detailsKey.muncipality="MM17005";
		detailsKey.educationLevel=EDUCATIONLEVELEntry.SECONDARY.getCode();
		Date fromDate1=Date.getDate("20000101");
		
		MOLSAParticipantDetailsList expectedMolsaParticipantDetailsList1 = molsasmsObj.listParticipantByCriteria(detailsKey);
		MOLSAParticipantDetails expectedDtls1=expectedMolsaParticipantDetailsList1.dtls.get(1);
		
		assertEquals(expectedDtls1.concernroleID,actualDtls.concernroleID);
		
		
	}

	
	protected void testValidation(CaseKey caseKey) throws AppException, InformationalException {

		//validate auhentication
	    Configuration.setProperty(EnvVars.SMS_LOGIN_USERNAME,"molsa");
	    Configuration.setProperty(EnvVars.SMS_LOGIN_PASSWORD,"qatar");
	    MOLSAConcernRoleListAndMessageText details = new MOLSAConcernRoleListAndMessageText();
		details.caseID = caseKey.caseID;
		details.smsMessageText = "Message Send";
		details.smsMessageType = MOLSASMSMESSAGETEMPLATE.CONTACTMOLSA;

		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);		
		details.concernRoleTabbedList = String.valueOf(caseHeader.listActiveCaseMembers().get(0).getID()).concat(" , ").concat(String.valueOf(caseHeader.listActiveCaseMembers().get(1).getID()));
		try{
		    molsasmsObj.sendSMS(details);
		    //junit.framework.Assert.fail("Authentication failed");
			}catch(AppException appException){
				final AppException exception=new AppException(MOLSASMSSERVICE.ERR_AUTH_FAILED); 
				assertEquals(exception.getCatEntry().getMessageText(), appException.getCatEntry().getMessageText());
			}
		
		//validating sending sms without passing concernroleid
	    MOLSAConcernRoleListAndMessageText details1 = new MOLSAConcernRoleListAndMessageText();
		details1.caseID = caseKey.caseID;
		details1.smsMessageText = "Message Send";
		details1.smsMessageType = "";
		details1.concernRoleTabbedList="";
		try{
		    molsasmsObj.sendSMS(details1);
		    //junit.framework.Assert.fail("null ConcernRoleID");
			}catch(AppException appException){
				final AppException exception=new AppException(MOLSASMSSERVICE.NO_CONCERNROLE_SELECTED); 
				assertEquals(exception.getCatEntry().getMessageText(), appException.getCatEntry().getMessageText());
			}

		
		//validating sending sms without passing message type
		MOLSAConcernRoleListAndMessageText textDetails = new MOLSAConcernRoleListAndMessageText();
		textDetails.caseID = caseKey.caseID;
		textDetails.smsMessageText = "Message Send";
		CaseHeader caseHeader1 = caseHeaderDAO.get(caseKey.caseID);		
		textDetails.concernRoleTabbedList = String.valueOf(caseHeader1.getConcernRole().getID());
		try{
		    molsasmsObj.sendSMS(textDetails);
		    //junit.framework.Assert.fail("null sms message type");
			}catch(AppException appException){
				final AppException exception=new AppException(MOLSASMSSERVICE.SMS_CATEGOEY_AND_TEMPLATE_MUST_BE_ENTERED); 
				assertEquals(exception.getCatEntry().getMessageText(), appException.getCatEntry().getMessageText());
			}

		
		MOLSAParticipantFilterCriteriaDetails detailsKey1 = new MOLSAParticipantFilterCriteriaDetails();
		try{
			molsasmsObj.listParticipantByCriteria(detailsKey1);
		}catch(AppException appException){
			final AppException exception=new AppException(GENERALSEARCH.ERR_FV_SEARCH_CRITERIA_MISSING); 
			assertEquals(exception.getCatEntry().getMessageText(), appException.getCatEntry().getMessageText());
		}
		
		MOLSAParticipantFilterCriteriaDetails detailsKey = new MOLSAParticipantFilterCriteriaDetails();
		detailsKey.caseType=PRODUCTTYPEEntry.SENIORCITIZEN.getCode().concat("\t").concat(PRODUCTTYPEEntry.DESERTEDWIFE.getCode()).concat("\t").concat(PRODUCTTYPEEntry.FAMILYINNEED.getCode());
		detailsKey.fromAge="1";
		detailsKey.gender=GENDEREntry.MALE.getCode();
		detailsKey.hasIncome=Boolean.FALSE;
		detailsKey.isIncludeHouseHoldMembers=Boolean.TRUE;	
		detailsKey.concernRoleTabbedList= String.valueOf(caseHeader.getConcernRole().getID());
		//detailsKey.toAge="100";
		detailsKey.muncipality="MM17005";
		detailsKey.educationLevel=EDUCATIONLEVELEntry.SECONDARY.getCode();
		Date fromDate1=Date.getDate("20000101");
		try{
			MOLSAParticipantDetailsList expectedMolsaParticipantDetailsList1 = molsasmsObj.listParticipantByCriteria(detailsKey);
		}catch(AppException appException){
			final AppException exception=new AppException(MOLSASMSSERVICE.SMS_AGE_FROM_AND_TO_MUST_BE_ENTERED); 
			assertEquals(exception.getCatEntry().getMessageText(), appException.getCatEntry().getMessageText());
		}
	}

}
