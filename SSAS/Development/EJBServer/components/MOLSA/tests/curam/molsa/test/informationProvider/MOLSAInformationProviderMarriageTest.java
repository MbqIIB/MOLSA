package curam.molsa.test.informationProvider;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.core.facade.infrastructure.fact.EvidenceFactory;
import curam.core.facade.infrastructure.intf.Evidence;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.intf.CachedCaseHeader;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.codetable.RESPONSETYPE;
import curam.molsa.ip.batch.fact.MOLSAInformationProviderBatchStreamFactory;
import curam.molsa.ip.entity.fact.MOLSAInformationProviderTmpFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationProviderTmp;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtlsList;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;

public class MOLSAInformationProviderMarriageTest extends CERScenarioTestBase {
	
	  public MOLSAInformationProviderMarriageTest(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	@Inject
	  private TestHelper testHelper;

	  @Inject
	  private CaseHeaderDAO caseHeaderDAO;

	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		createIntakeApplicant(application.getID(), ASIFA_UNIQUE_NAME,
				APPLICANTROLEEntry.PRIMARY_APPLICANT);
		
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

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		List<HouseholdUnit> householdUnitList = new ArrayList<HouseholdUnit>();
		List<Long> mandatoryMembers = new ArrayList<Long>();
		mandatoryMembers
				.add(getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID);
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
				45010l, new Timeline<Boolean>(eligibilityIntervals));
		householdUnitList.add(householdUnit);
		return householdUnitList;
	}


	@Override
	protected void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException {
		long participantid = getParticipantRoleID(ASIFA_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID;

		long absentFatherParticipantid = getParticipantRoleID(MOHAMMED_UNIQUE_NAME).participantRoleID;
		long absentFatherCPRID = getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID;
		
		int amount=1000;

		Date currentDate = Date.getCurrentDate();
		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, Date.fromISO8601("20000101"), MARITALSTATUS.SINGLE);
		createBirthAndDeathEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, getDate(1, 1, 1998));
		
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

		customerRegistrationDetails.firstForename = ASIFA_UNIQUE_NAME;
		customerRegistrationDetails.surname = MOHAMMED_SURNAME;
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1998);
		customerRegistrationDetails.registrationDate = claimDate;
		customerRegistrationDetails.socialSecurityNumber = "12345678901";
		customerRegistrationDetails.sex = GENDER.FEMALE;
		customerRegistrationDetails.nationality = NATIONALITY.QATARI;
		customerRegistrationDetails.birthCountry = COUNTRY.QATAR;
		customerRegistrationDetails.currentMaritalStatus = MARITALSTATUS.SINGLE;
		customerRegistrationDetails.addressData = ADDRESS_DATA;
		customerRegistrationDetails.addressType = ADDRESSLAYOUTTYPE.US;

	}

	@Override
	protected void preAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {
		
		curam.core.facade.infrastructure.struct.CaseKey caseKey1 = new curam.core.facade.infrastructure.struct.CaseKey();
		caseKey1.caseID = caseKey.caseID;
		
		long participantid = getParticipantRoleID(ASIFA_UNIQUE_NAME).participantRoleID;
		long casePartcipantRoleID = getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID;

		Evidence test = EvidenceFactory.newInstance();
		curam.core.facade.infrastructure.struct.ListAllEvidenceDtls list = test.listAllEvidence(caseKey1);
		
		
		
		MOLSAInformationProviderTmpDtls details = new MOLSAInformationProviderTmpDtls();
		details.eventDate = Date.getCurrentDate();
		details.informationProviderTmpID = 12345;
		details.maritalStatus = MARITALSTATUS.MARRIED;
		details.receivedDate = Date.getCurrentDate();
		details.type = RESPONSETYPE.MARRIAGE;
		details.spouseQid = "12345678902";
		details.qid = "12345678901";		
		
		MOLSAInformationProviderTmp molsaTmp = MOLSAInformationProviderTmpFactory.newInstance();
		molsaTmp.insert(details);
		
		curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream obj = MOLSAInformationProviderBatchStreamFactory
				.newInstance();
		BatchProcessingID bid = new BatchProcessingID();
		bid.recordID = details.informationProviderTmpID;
		
		BatchProcessingSkippedRecord batchProcessSkipped = obj.processRecord(bid, details);
		
		Evidence test2 = EvidenceFactory.newInstance();
		curam.core.facade.infrastructure.struct.ListAllEvidenceDtls list2 = test2.listAllEvidence(caseKey1);
		 assertEquals(4, list2.evidenceParticipantDtlsList.dtls.size());
	}

	@Override
	protected void postAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		
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


}
