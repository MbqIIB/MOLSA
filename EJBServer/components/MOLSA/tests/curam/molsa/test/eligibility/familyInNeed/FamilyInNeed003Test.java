
package curam.molsa.test.eligibility.familyInNeed;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.application.facade.fact.ApplicationClientFactory;
import curam.application.facade.struct.RegisterPersonWithApplicantDetails;
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
import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.intf.IntegratedCase;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.ActivateCaseKey_fo;
import curam.core.facade.struct.CertificationCaseIDKey;
import curam.core.facade.struct.ICProductDeliveryDetails;
import curam.core.facade.struct.ICProductDetails;
import curam.core.facade.struct.IntegratedCaseIDKey;
import curam.core.facade.struct.ListICAllCasesDetails;
import curam.core.facade.struct.ListICProductDeliveryCertDetailsAndVersionNo;
import curam.core.facade.struct.ListICProductDeliveryDetails;
import curam.core.facade.struct.ReadIntegratedCaseDetails1;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.intf.CachedCaseHeader;
import curam.core.sl.infrastructure.assessment.impl.DeterminationInterval;
import curam.core.sl.infrastructure.impl.CalenderConst;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.struct.CaseAndConcernSummaryDetails;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.HANDICAPPEDUNABLETOWORK;
import curam.molsa.codetable.MOLSABENEFITTYPE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.molsa.core.facade.intf.MOLSAProductDelivery;
import curam.molsa.test.util.MOLSAUnauthenticatedUserHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.transaction.TransactionInfo.TransactionType;
import curam.util.type.Date;
import curam.verification.facade.fact.VerificationAdministrationFactory;
import curam.verification.facade.intf.VerificationAdministration;
import curam.verification.facade.struct.CancelVerificationRequirementUsageDetails;
import curam.molsa.test.base.AbstractMolsaTestBase;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
/**
 * Test class used to test the end to end flow of widow product delivery case.
 */

public class FamilyInNeed003Test extends CERScenarioTestBase {

	@Inject
	private TestHelper testHelper;
	
	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	
	/**
	   * Default constructor for the class.
	   *  @param arg0
	   *  constructor
	   */
	
	public FamilyInNeed003Test(String arg0) {
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
		long wife1participantid= getParticipantRoleID(FIRDOZ_UNIQUE_NAME).participantRoleID;
		long wife1caseParticipantRoleID=getCaseParticipantRoleID(FIRDOZ_UNIQUE_NAME).caseParticipantRoleID;
		long childparticipantid= getParticipantRoleID(ASMA_UNIQUE_NAME).participantRoleID;
		long childcaseParticipantRoleID=getCaseParticipantRoleID(ASMA_UNIQUE_NAME).caseParticipantRoleID;
		
		int incomeamount=1000;
		
	
		Date currentDate = Date.getCurrentDate();
		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createHouseholdMemberEvidence(caseKey, wife1participantid,
				wife1caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
	
		createHouseholdMemberEvidence(caseKey, childparticipantid,
				childcaseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		
		createBirthAndDeathEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, getDate(1, 1, 1998));
		createBirthAndDeathEvidence(caseKey, wife1participantid,
				wife1caseParticipantRoleID, currentDate, getDate(1, 1, 1998));
		
		createBirthAndDeathEvidence(caseKey, childparticipantid,
				childcaseParticipantRoleID, currentDate, getDate(1, 1, 2013));
		
		
		
		
		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, MARITALSTATUS.MARRIED);
		createMaritalStatusEvidence(caseKey, wife1participantid,
				wife1caseParticipantRoleID, currentDate, MARITALSTATUS.MARRIED);
		createMaritalStatusEvidence(caseKey, childparticipantid,
				childcaseParticipantRoleID, currentDate, MARITALSTATUS.SINGLE);
		
		createGenderEvidence(caseKey,
				participantid,caseParticipantRoleID,
				currentDate,GENDER.MALE);
		createGenderEvidence(caseKey,
				wife1participantid,wife1caseParticipantRoleID,
				currentDate,GENDER.FEMALE);
		createGenderEvidence(caseKey,
				childparticipantid,childcaseParticipantRoleID,
				currentDate,GENDER.FEMALE);
		
		
		createHeadOfHouseholdEvidence(caseKey,
				participantid,caseParticipantRoleID,
				currentDate);
		
		
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,wife1caseParticipantRoleID, getDate(1, 1, 2010)
				,RELATIONSHIPTYPECODE.SPOUSE);
		
		createHouseholdRelationshipEvidence(caseKey,
				participantid,caseParticipantRoleID,childcaseParticipantRoleID,
				 getDate(1, 1, 2013),RELATIONSHIPTYPECODE.CHILD);
		createHouseholdRelationshipEvidence(caseKey,
				wife1participantid,wife1caseParticipantRoleID,childcaseParticipantRoleID,
				 getDate(1, 1, 2013),RELATIONSHIPTYPECODE.CHILD);
		
		
		
		createIncomeEvidence(caseKey, participantid,
				caseParticipantRoleID,getDate(1, 1, 2013),
				INCOMETYPECODE.FatherORHusbandPaidEmployment,FREQUENCYCODE.MONTHLY,incomeamount);
		
		
		
		
		
		
		
		
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
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1998);
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
	
		
		
		PersonRegistrationDetails registrationIDDetails = new  PersonRegistrationDetails();
          registrationIDDetails.currentMaritalStatus = MARITALSTATUS.MARRIED;
          registrationIDDetails.dateOfBirth = getDate(1, 1, 1998);
          registrationIDDetails.addressData = ADDRESS_DATA;
          registrationIDDetails.nationality = NATIONALITY.QATARI;
          registrationIDDetails.firstForename = FIRDOZ_UNIQUE_NAME;
          registrationIDDetails.surname = MOHAMMED_SURNAME;
          registrationIDDetails.sex=GENDER.FEMALE;
          registrationIDDetails.registrationDate=currentDate;
         
          registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails,FIRDOZ_UNIQUE_NAME);
          

         
          PersonRegistrationDetails registrationIDDetails2 = new  PersonRegistrationDetails();
          registrationIDDetails2.currentMaritalStatus = MARITALSTATUS.SINGLE;
          registrationIDDetails2.dateOfBirth = getDate(1, 1, 2013);
          registrationIDDetails2.addressData = ADDRESS_DATA;
          registrationIDDetails2.nationality = NATIONALITY.QATARI;
          registrationIDDetails2.firstForename = ASMA_UNIQUE_NAME;
          registrationIDDetails2.surname = MOHAMMED_SURNAME;
          registrationIDDetails2.sex=GENDER.FEMALE;
          registrationIDDetails2.registrationDate=currentDate;
          
          registerPersonAndAddToCase(application.getCaseID(),registrationIDDetails2,ASMA_UNIQUE_NAME);

		
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
		.add(getCaseParticipantRoleID(FIRDOZ_UNIQUE_NAME).caseParticipantRoleID);
		mandatoryMembers
		.add(getCaseParticipantRoleID(ASMA_UNIQUE_NAME).caseParticipantRoleID);
		
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
				(long) 45006, new Timeline<Boolean>(eligibilityIntervals));
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
