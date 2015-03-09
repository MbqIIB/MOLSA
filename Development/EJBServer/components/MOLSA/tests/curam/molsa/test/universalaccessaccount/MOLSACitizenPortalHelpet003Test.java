package curam.molsa.test.universalaccessaccount;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.citizenworkspace.security.impl.CWPasswordGenerationStrategy;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.PHONETYPE;
import curam.codetable.SCHOOLTYPE;
import curam.codetable.impl.APPLICATION_CODEEntry;
import curam.codetable.impl.EXTERNALUSERTYPEEntry;
import curam.codetable.impl.LOCALEEntry;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.sl.entity.fact.ExternalUserFactory;
import curam.core.sl.entity.intf.ExternalUser;
import curam.core.sl.entity.struct.ExternalUserDtls;
import curam.core.sl.entity.struct.ExternalUserKey;
import curam.core.sl.entity.struct.ExternalUserSearchCriteria;
import curam.core.sl.entity.struct.ExternalUserSearchDetails;
import curam.core.sl.entity.struct.ExternalUserSearchDetailsList;
import curam.core.sl.struct.UserPasswordDetails;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.PersonSearchDetails;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.message.BPOADMINUSER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.persistence.GuiceWrapper;
import curam.util.security.EncryptionAdmin;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;

public class MOLSACitizenPortalHelpet003Test extends CERScenarioTestBase {

	@Inject
	private CWPasswordGenerationStrategy cwPasswordGenerator;

	private static final long userID = 12345678901L;

	public MOLSACitizenPortalHelpet003Test(String arg0) {
		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@SuppressWarnings("restriction")
	@Override
	public void testScenario() throws AppException, InformationalException {
		getTestHelper().simulateLogin("molsamanager");

		MOLSACitizenPortalHelper citizenPortalHelperObj = new MOLSACitizenPortalHelper();
		PersonRegistrationDetails customerRegistrationDetails = new PersonRegistrationDetails();
		setClaimantRegistrationDetails(customerRegistrationDetails);

		Person personObj = PersonFactory.newInstance();
		PersonSearchKey1 paramPersonSearchKey1 = new PersonSearchKey1();
		long userID = 12345678914l;
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
			break;
		}
		try {
			citizenPortalHelperObj.createNewAccount(concernRoleID);
		} catch (AppException ae) {
			// doNothing as account already exists.
		}

		try {
			citizenPortalHelperObj.forgotPassword(userID);
		} catch (Exception e) {
			fail("Forgot password operation failed!!!");
		}

	}

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
		customerRegistrationDetails.socialSecurityNumber = String
				.valueOf(this.userID);
		super.setClaimantRegistrationDetails(customerRegistrationDetails);
	}

	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub

	}

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub

	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
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

		HouseholdUnit householdUnit = new HouseholdUnit(mandatoryMembers,
				new ArrayList<Long>(), (long) 45010, new Timeline<Boolean>(
						eligibilityIntervals));
		householdUnitList.add(householdUnit);
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

	/**
	 * This method is used to encrypt a string value to set as password.
	 * 
	 * @param password
	 *            String
	 * @return String
	 * @throws AppException
	 */

	private String getEncryptedPasswordValue(String password)
			throws AppException {
		String encryptedEnteredPassword;
		try {
			encryptedEnteredPassword = EncryptionAdmin
					.encryptPassword(password);
		} catch (Throwable exception) {
			throw new AppException(BPOADMINUSER.ERR_ENCRYPTION_FAILED,
					exception);
		}
		return encryptedEnteredPassword;
	}

}
