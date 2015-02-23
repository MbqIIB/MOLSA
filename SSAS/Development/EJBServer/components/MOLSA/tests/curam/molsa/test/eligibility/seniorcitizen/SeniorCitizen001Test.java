package curam.molsa.test.eligibility.seniorcitizen;

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
import curam.codetable.SCHOOLTYPE;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.intf.CachedCaseHeader;
import curam.core.sl.infrastructure.assessment.impl.DeterminationInterval;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EDUCATIONLEVEL;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
/**
 * Test class used to test the end to end flow of widow product delivery case.
 */

public class SeniorCitizen001Test extends CERScenarioTestBase {

	@Inject
	private TestHelper testHelper;
	
	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	
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
	
	
	

}
