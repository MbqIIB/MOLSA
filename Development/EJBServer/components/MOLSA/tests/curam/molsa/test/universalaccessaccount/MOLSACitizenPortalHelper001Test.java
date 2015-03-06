package curam.molsa.test.universalaccessaccount;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;
import curam.application.impl.Application;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.PHONETYPE;
import curam.codetable.SCHOOLTYPE;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.core.sl.entity.fact.ExternalUserFactory;
import curam.core.sl.entity.intf.ExternalUser;
import curam.core.sl.entity.struct.ExternalUserDtls;
import curam.core.sl.entity.struct.ExternalUserKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.PersonSearchDetails;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.struct.CaseKey;

public class MOLSACitizenPortalHelper001Test extends CERScenarioTestBase {

	@Override
	protected void setClaimantRegistrationDetails(
			PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException {
		final Date claimDate = getClaimDate();
		customerRegistrationDetails.firstForename = ASIFA_UNIQUE_NAME;
		customerRegistrationDetails.surname = MOHAMMED_SURNAME;
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1998);
		customerRegistrationDetails.registrationDate = claimDate;
		customerRegistrationDetails.sex = GENDER.FEMALE;
		customerRegistrationDetails.nationality = NATIONALITY.QATARI;
		customerRegistrationDetails.birthCountry = COUNTRY.QATAR;
		customerRegistrationDetails.currentMaritalStatus = MARITALSTATUS.SINGLE;
		customerRegistrationDetails.addressData = ADDRESS_DATA;
		customerRegistrationDetails.addressType = ADDRESSLAYOUTTYPE.US;
		customerRegistrationDetails.socialSecurityNumber = "12345678901";
		super.setClaimantRegistrationDetails(customerRegistrationDetails);
	}

	public MOLSACitizenPortalHelper001Test(String arg0) {
		super(arg0);
	}

	@SuppressWarnings("restriction")
	public void testScenario() throws AppException, InformationalException {
		getTestHelper().simulateLogin("molsamanager");
		testScenario(Date.getCurrentDate());

		MOLSACitizenPortalHelper citizenPortalHelperObj = new MOLSACitizenPortalHelper();

		PersonRegistrationDetails customerRegistrationDetails = new PersonRegistrationDetails();
		setClaimantRegistrationDetails(customerRegistrationDetails);
		Person personObj = PersonFactory.newInstance();
		PersonSearchKey1 paramPersonSearchKey1 = new PersonSearchKey1();
		long userID = 12345678901l;
		paramPersonSearchKey1.personSearchKey.referenceNumber = String
				.valueOf(userID);
		InformationalManager informationalManager = new InformationalManager();
		TransactionInfo.setInformationalManager();
		PersonSearchDetailsResult personDetailsList = personObj
				.searchPerson(paramPersonSearchKey1);

		// Get the concern role id from personDetailsList
		long concernRoleID = 0L;
		for (PersonSearchDetails personDetails : personDetailsList.personSearchResult.dtlsList
				.items()) {
			concernRoleID = personDetails.concernRoleID;
		}
		citizenPortalHelperObj.createNewAccount(concernRoleID);
		ExternalUser externalUser = ExternalUserFactory.newInstance();
		NotFoundIndicator notFoundIndicatorObj = new NotFoundIndicator();
		ExternalUserKey externalUserSearch = new ExternalUserKey();
		externalUserSearch.userName = String.valueOf(userID);
		ExternalUserDtls userDetails = externalUser.read(notFoundIndicatorObj,
				externalUserSearch);

		assertEquals(userDetails.userName, userID);

	}

	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		createIntakeApplicant(application.getID(), ASIFA_UNIQUE_NAME,
				APPLICANTROLEEntry.PRIMARY_APPLICANT);

	}

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
		List<HouseholdUnit> householdUnitList = new ArrayList<HouseholdUnit>();
		return householdUnitList;
	}

	@Override
	protected void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException {
		long participantid = getParticipantRoleID(ASIFA_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID;
		Date currentDate = Date.getCurrentDate();

		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);

		createBirthAndDeathEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, getDate(1, 1, 1998));
		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, MARITALSTATUS.SINGLE);
		createEducationEvidence(caseKey, participantid, caseParticipantRoleID,
				currentDate, EDUCATION.ENROLLED, SCHOOLTYPE.JUNIORSCHOOL);
		createGenderEvidence(caseKey, participantid, caseParticipantRoleID,
				currentDate, GENDER.FEMALE);

		createPhoneNumberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, "91", "8197469472",
				PHONETYPE.MOBILE, true);

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
