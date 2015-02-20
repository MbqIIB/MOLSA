package curam.molsa.test.eligibility.socialAssistance;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.codetable.RELATIONSHIPTYPECODE;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole_Factory;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus_Factory;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation_Factory;
import curam.creole.ruleclass.MolsaRelationshipDataRuleSet.impl.MolsaRelationship;
import curam.creole.ruleclass.MolsaRelationshipDataRuleSet.impl.MolsaRelationship_Factory;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath_Factory;
import curam.creole.ruleclass.PDCGenderDataRuleSet.impl.PDCGender;
import curam.creole.ruleclass.PDCGenderDataRuleSet.impl.PDCGender_Factory;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.ConcernRole;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.ConcernRole_Factory;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.Person;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.Person_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.DependentChildCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.DependentChildCalculator_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.MemberCPRCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.MemberCPRCalculator_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.RelationshipAmount;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.RelationshipAmount_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitCalculator_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitMember;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitMember_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator_Factory;
import curam.creole.value.CodeTableItem;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;

import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

/**
 * Junit class for MOLSA SocialAssistanceRuleSet
 * 
 * 
 */
@SuppressWarnings("restriction")
public class MOLSASocialAssistanceCalculatorTest extends MOLSACreoleBaseTest {

	public static final String MOLSA_RULESET = "SocialAssistanceRuleSet";

	/**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSASocialAssistanceCalculatorTest(String arg0) {
		super(arg0);
		setRuleSetName();
	}

	/**
	 * Creates the CaseParticipantRole record.
	 * 
	 * @param caseID
	 *            CaseId of case to which the case participant belongs
	 * @param caseParticipantRoleID
	 *            Case participant Role ID
	 * @param participantRoleID
	 *            Participant Role ID
	 * @param caseParticipantRoleType
	 *            Case Participant Role Type
	 * 
	 * @return CaseParticipantRole
	 */

	public CaseParticipantRole createCaseParticipantRoleRecord(
			final Number caseID, final Number caseParticipantRoleID,
			final Number participantRoleID, final String caseParticipantRoleType) {

		final CaseParticipantRole caseParticipantRoleRecord = CaseParticipantRole_Factory
				.getFactory().newInstance(this.getSession());

		caseParticipantRoleRecord.caseID().specifyValue(caseID);
		caseParticipantRoleRecord.caseParticipantRoleID().specifyValue(
				caseParticipantRoleID);
		caseParticipantRoleRecord.participantRoleID().specifyValue(
				participantRoleID);
		caseParticipantRoleRecord.typeCode().specifyValue(
				new CodeTableItem(CASEPARTICIPANTROLETYPE.TABLENAME,
						caseParticipantRoleType));

		return caseParticipantRoleRecord;
	}

	/**
	 * Creates an Person.
	 */
	public Person createPersonRecord(final Number concernRoleID,
			final String personBirthName, final Date dateOfBirth,
			final Date dateOfDeath, final String gender,
			final String maritalStatusCode) {
		final Person personRecord = Person_Factory.getFactory().newInstance(
				this.getSession());
		personRecord.concernRoleID().specifyValue(concernRoleID);
		personRecord.personBirthName().specifyValue(personBirthName);
		personRecord.dateOfBirth().specifyValue(dateOfBirth);
		personRecord.dateOfDeath().specifyValue(dateOfDeath);
		personRecord.gender().specifyValue(
				new CodeTableItem(GENDER.TABLENAME, gender));
		personRecord.maritalStatusCode().specifyValue(
				new CodeTableItem(MARITALSTATUS.TABLENAME, maritalStatusCode));
		return personRecord;
	}

	/**
	 * Creates an object of SAHouseholdUnitMember.
	 */
	public List<SAHouseholdUnitMember> createSAHouseholdUnitMember(
			final List<CaseParticipantRole> caseParticipantRoleList) {
		final Number participantRoleID1 = caseParticipantRoleList.get(0)
				.participantRoleID().getValue();
		final Number participantRoleID2 = caseParticipantRoleList.get(1)
				.participantRoleID().getValue();
		final Number participantRoleID3 = caseParticipantRoleList.get(2)
				.participantRoleID().getValue();
		final Number caseID = caseParticipantRoleList.get(0).caseID()
				.getValue();

		final curam.util.type.Date relationshipStartDate = curam.util.type.Date
				.fromISO8601("20000101");
		final SAHouseholdUnitMember saHouseholdUnitMember1 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(this.getSession(), caseID,
						caseParticipantRoleList.get(0));
		final SAHouseholdUnitMember saHouseholdUnitMember2 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(this.getSession(), caseID,
						caseParticipantRoleList.get(1));
		final SAHouseholdUnitMember saHouseholdUnitMember3 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(this.getSession(), caseID,
						caseParticipantRoleList.get(2));

		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = new ArrayList<SAHouseholdUnitMember>();
		saHouseholdUnitMemberList.add(saHouseholdUnitMember1);
		saHouseholdUnitMemberList.add(saHouseholdUnitMember2);
		saHouseholdUnitMemberList.add(saHouseholdUnitMember3);
		return saHouseholdUnitMemberList;
	}

	/**
	 * Creates an object of SAHouseholdUnitMember.
	 */

	/**
	 * Creates ConcernRole record.
	 * 
	 * @param concernRoleID
	 *            The concern Role ID.
	 * @param concernRoleName
	 *            The name of the concern role.
	 * @return ConcernRole record
	 */
	public ConcernRole createConcernRoleRecord(final Number concernRoleID,
			final String concernRoleName) {

		final ConcernRole concernRoleRecord = ConcernRole_Factory.getFactory()
				.newInstance(this.getSession());
		concernRoleRecord.concernRoleID().specifyValue(concernRoleID);
		concernRoleRecord.concernRoleName().specifyValue(concernRoleName);

		return concernRoleRecord;
	}

	/**
	 * creates an object of SAHouseholdUnitMember.
	 */
	public List<CaseParticipantRole> createCaseParticipantRole() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleID1 = 1L;
		final Number participantRoleID1 = 1L;
		final Number concernRoleID1 = 1L;
		final String concernRoleName1 = "John Smith";
		final Number caseParticipantRoleID2 = 2L;
		final Number participantRoleID2 = 2L;
		final Number concernRoleID2 = 2L;
		final String concernRoleName2 = "Linda Smith";
		final Number caseParticipantRoleID3 = 3L;
		final Number participantRoleID3 = 3L;
		final Number concernRoleID3 = 3L;
		final String concernRoleName3 = "Keli Smitha";

		final CaseParticipantRole caseParticipantRoleRecord1 = this
				.createCaseParticipantRoleRecord(caseID,
						caseParticipantRoleID1, participantRoleID1,
						CASEPARTICIPANTROLETYPE.PRIMARY);
		final CaseParticipantRole caseParticipantRoleRecord2 = this
				.createCaseParticipantRoleRecord(caseID,
						caseParticipantRoleID2, participantRoleID2,
						CASEPARTICIPANTROLETYPE.MEMBER);
		final CaseParticipantRole caseParticipantRoleRecord3 = this
				.createCaseParticipantRoleRecord(caseID,
						caseParticipantRoleID3, participantRoleID3,
						CASEPARTICIPANTROLETYPE.SERVICESUPPLIER);

		this.createConcernRoleRecord(concernRoleID1, concernRoleName1);
		this.createConcernRoleRecord(concernRoleID2, concernRoleName2);
		this.createConcernRoleRecord(concernRoleID3, concernRoleName3);
		final List<CaseParticipantRole> caseParticipantRoleList = new ArrayList<CaseParticipantRole>();
		caseParticipantRoleList.add(caseParticipantRoleRecord1);
		caseParticipantRoleList.add(caseParticipantRoleRecord2);
		caseParticipantRoleList.add(caseParticipantRoleRecord3);
		return caseParticipantRoleList;
	}

	/**
	 * creates an object of one SAHouseholdUnitMember.
	 */
	public CaseParticipantRole createACaseParticipantRole() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleID1 = 1L;
		final Number participantRoleID1 = 1L;
		final Number concernRoleID1 = 1L;
		final String concernRoleName1 = "John Smith";

		final CaseParticipantRole caseParticipantRoleRecord1 = this
				.createCaseParticipantRoleRecord(caseID,
						caseParticipantRoleID1, participantRoleID1,
						CASEPARTICIPANTROLETYPE.PRIMARY);
		this.createConcernRoleRecord(concernRoleID1, concernRoleName1);
		return caseParticipantRoleRecord1;
	}

	@Override
	protected void setRuleSetName() {
		super.setFileName(MOLSA_RULESET);
	}

	/**
	 * Test case for 'HouseholdMemberRecordsExists' attribute. Test Data:Set
	 * exists attribute of household member to true/false in timeline Test
	 * Class: MemberCPRCalculator
	 */

	public void testHouseholdMemberRecordsExists() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole person1 = createCaseParticipantRoleRecord(caseID,
				caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Initially setting true later changing the value to false

		final List<Interval<Boolean>> exists = new ArrayList<Interval<Boolean>>();
		exists.add(new Interval<Boolean>(null, true));
		exists.add(new Interval<Boolean>(Date.fromISO8601("20040601"), false));
		final Timeline<Boolean> existsTimeline = new Timeline<Boolean>(exists);

		HouseholdMember householdMemberObj = HouseholdMember_Factory
				.getFactory().newInstance(getSession());
		householdMemberObj.caseID().specifyValue(caseID);
		householdMemberObj.participant().specifyValue(
				person1.caseParticipantRoleID().getValue());
		householdMemberObj.exists().specifyValue(existsTimeline);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20040601"), false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		MemberCPRCalculator memberCPR = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(), person1);

		CREOLETestHelper.assertEquals(timeline, memberCPR
				.householdMemberRecordsExists().getValue());
	}

	/**
	 * Test case for 'AgeTimeline' attribute. Test Data:Set date of birth and
	 * check the age
	 */

	public void testAgeTimeline() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole person1 = createCaseParticipantRoleRecord(caseID,
				caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting age as 13
		PDCBirthAndDeath pdcBirthAndDeathObj = PDCBirthAndDeath_Factory
				.getFactory().newInstance(getSession());
		Calendar calendar = Date.getCurrentDate().getCalendar();
		calendar.add(Calendar.YEAR, -13);
		Date dob1 = new Date(calendar);
		pdcBirthAndDeathObj.dateOfBirth().specifyValue(dob1);
		pdcBirthAndDeathObj.caseID().specifyValue(caseID);
		pdcBirthAndDeathObj.person().specifyValue(
				person1.caseParticipantRoleID().getValue());

		final List<Interval<Number>> intervals = new ArrayList<Interval<Number>>();
		intervals.add(new Interval<Number>(null, 0));
		intervals.add(new Interval<Number>(Date.getCurrentDate(), 13));
		final Timeline<Number> timeline = new Timeline<Number>(intervals);

		MemberCPRCalculator memberCPR = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(), person1);

		final Number value1 = memberCPR.ageTimeline().getValue()
				.valueOn(getToday());
		final Number value2 = memberCPR.ageTimeline().getValue().valueOn(null);

		final List<Interval<Number>> intervals2 = new ArrayList<Interval<Number>>();
		intervals2.add(new Interval<Number>(null, value2));
		intervals2.add(new Interval<Number>(Date.getCurrentDate(), value1));
		final Timeline<Number> timeline2 = new Timeline<Number>(intervals2);

		CREOLETestHelper.assertEquals(timeline, timeline2);
	}

	/* *//**
	 * Test case for 'hasPassedCitizenshipTimeline' attribute. Test
	 * Data:Set exists and citizenship of household member rule set Test Class:
	 * SANonFinancialCPRCalculator
	 */

	public void testHasPassedCitizenshipTimeline() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting citizenship as Qatari

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), true));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.QATARI)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.citizenship().specifyValue(firstTimeline);
		hh.caseID().specifyValue(caseID);
		hh.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedCitizenshipTimeline().getValue());
	}

	public void testHasPassedCitizenshipTimeline1() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting citizenship as Qatari

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.NOT_A_QATARI)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.citizenship().specifyValue(firstTimeline);
		hh.caseID().specifyValue(caseID);
		hh.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedCitizenshipTimeline().getValue());
	}

	/* *//**
	 * Test case for 'hasPassedResiencyTimeline' attribute. Test Data:Set
	 * date of birth and check the age
	 */

	public void testHasPassedResiencyTimeline() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting residency to Yes

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), true));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				RESIDENCY.TABLENAME, RESIDENCY.YES)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.residency().specifyValue(firstTimeline);
		hh.caseID().specifyValue(caseID);
		hh.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedResiencyTimeline().getValue());
	}

	public void testHasPassedResiencyTimeline1() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting residency to No

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				RESIDENCY.TABLENAME, RESIDENCY.NO)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.residency().specifyValue(firstTimeline);
		hh.caseID().specifyValue(caseID);
		hh.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedResiencyTimeline().getValue());
	}

	/* *//**
	 * Test case for 'hasPassedNonFinancialTestTimeline' attribute. Test
	 * Data:Set hasPassedCitizenshipTimeline and hasPassedResiencyTimeline
	 */

	public void testhasPassedNonFinancialTestTimeline() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting Set hasPassedCitizenshipTimeline and
		// hasPassedResiencyTimeline to True

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), true));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		test.hasPassedCitizenshipTimeline().specifyValue(Timeline.TRUE_FOREVER);
		test.hasPassedResiencyTimeline().specifyValue(Timeline.TRUE_FOREVER);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedNonFinancialTestTimeline().getValue());
	}

	public void testhasPassedNonFinancialTestTimeline1() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		// Setting Set hasPassedCitizenshipTimeline and
		// hasPassedResiencyTimeline to True and False

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		test.hasPassedCitizenshipTimeline().specifyValue(Timeline.TRUE_FOREVER);
		test.hasPassedResiencyTimeline().specifyValue(Timeline.FALSE_FOREVER);

		CREOLETestHelper.assertEquals(timeline, test
				.hasPassedNonFinancialTestTimeline().getValue());
	}

	/* *//**
	 * Test case for 'isRelationshipExistsTimeline' attribute. Test
	 * Data:Set exists attribute Class : AmountCalculator
	 */

	public void testisRelationshipExistsTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<Boolean>> intervals1 = new ArrayList<Interval<Boolean>>();
		intervals1.add(new Interval<Boolean>(null, false));
		intervals1.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline1 = new Timeline<Boolean>(intervals1);

		MolsaRelationship test = MolsaRelationship_Factory.getFactory()
				.newInstance(getSession());
		test.exists().specifyValue(Timeline.TRUE_FOREVER);

		RelationshipAmount test1 = RelationshipAmount_Factory.getFactory()
				.newInstance(getSession(), caseParticipantRoleList.get(0),
						caseParticipantRoleList.get(0));
		CREOLETestHelper.assertEquals(timeline1, test1
				.isRelationshipExistsTimeline().getValue());
	}

	/* *//**
	 * Test case for 'hasPassedNonFinancialTestTimeline' attribute. Test
	 * Data:Set hasEarnedIncomeTimeline, hasEnrolledForEducation, Gender,
	 * Marital Status
	 */

	public void testisUnmarriedMaleStudentChild() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		final List<Interval<Boolean>> intervals1 = new ArrayList<Interval<Boolean>>();
		intervals1.add(new Interval<Boolean>(null, true));
		intervals1.add(new Interval<Boolean>(Date.getCurrentDate(), true));
		final Timeline<Boolean> timeline1 = new Timeline<Boolean>(intervals1);

		MemberCPRCalculator memberCPR = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		memberCPR.hasEarnedIncomeTimeline()
				.specifyValue(Timeline.FALSE_FOREVER);
		memberCPR.hasEnrolledForEducation().specifyValue(Timeline.TRUE_FOREVER);
		memberCPR.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleRecord1);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				GENDER.TABLENAME, GENDER.MALE)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<CodeTableItem>> test2 = new ArrayList<Interval<CodeTableItem>>();
		test2.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.SINGLE)));
		final Timeline<CodeTableItem> secondTimeline = new Timeline<CodeTableItem>(
				test2);

		PDCGender pdcGenderObj = PDCGender_Factory.getFactory().newInstance(
				getSession());
		pdcGenderObj.gender().specifyValue(firstTimeline);
		pdcGenderObj.caseID().specifyValue(caseID);
		pdcGenderObj.person().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		MaritalStatus status = MaritalStatus_Factory.getFactory().newInstance(
				getSession());
		status.caseID().specifyValue(caseID);
		status.maritalStatus().specifyValue(secondTimeline);
		status.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());
		memberCPR.maritalStatusRecord().specifyValue(status);

		DependentChildCalculator test = DependentChildCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		test.isAgeUnderSixTimeline().specifyValue(Timeline.FALSE_FOREVER);
		test.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleRecord1);
		test.memberCPRCalculator().specifyValue(memberCPR);

		CREOLETestHelper.assertEquals(timeline1, test
				.isUnmarriedMaleStudentChild().getValue());
	}

	public void testisUnmarriedMaleStudentChild1() {
		final Number caseID = 1111L;
		final Number caseParticipantRoleIDOne = 1234L;
		final Number participantRoleIDOne = 101L;
		final Number caseParticipantRoleIDTwo = 12345L;
		final Number participantRoleIDTwo = 102L;
		final Number caseParticipantRoleIDThree = 123456L;
		final Number participantRoleIDThree = 103L;
		final Number caseParticipantRoleIDFour = 1234567L;
		final Number participantRoleIDFour = 104L;

		CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleIDOne, participantRoleIDOne,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
				participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
				participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
		createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
				participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

		final List<Interval<Boolean>> intervals1 = new ArrayList<Interval<Boolean>>();
		intervals1.add(new Interval<Boolean>(null, false));
		intervals1.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline1 = new Timeline<Boolean>(intervals1);

		MemberCPRCalculator memberCPR = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		memberCPR.hasEarnedIncomeTimeline()
				.specifyValue(Timeline.FALSE_FOREVER);
		memberCPR.hasEnrolledForEducation().specifyValue(Timeline.TRUE_FOREVER);
		memberCPR.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleRecord1);

		// Make gender as Female to check for false condition

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				GENDER.TABLENAME, GENDER.FEMALE)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<CodeTableItem>> test2 = new ArrayList<Interval<CodeTableItem>>();
		test2.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.SINGLE)));
		final Timeline<CodeTableItem> secondTimeline = new Timeline<CodeTableItem>(
				test2);

		PDCGender pdcGenderObj = PDCGender_Factory.getFactory().newInstance(
				getSession());
		pdcGenderObj.gender().specifyValue(firstTimeline);
		pdcGenderObj.caseID().specifyValue(caseID);
		pdcGenderObj.person().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());

		MaritalStatus status = MaritalStatus_Factory.getFactory().newInstance(
				getSession());
		status.caseID().specifyValue(caseID);
		status.maritalStatus().specifyValue(secondTimeline);
		status.participant().specifyValue(
				caseParticipantRoleRecord1.caseParticipantRoleID().getValue());
		memberCPR.maritalStatusRecord().specifyValue(status);

		DependentChildCalculator test = DependentChildCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleRecord1);
		test.isAgeUnderSixTimeline().specifyValue(Timeline.FALSE_FOREVER);
		test.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleRecord1);
		test.memberCPRCalculator().specifyValue(memberCPR);

		CREOLETestHelper.assertEquals(timeline1, test
				.isUnmarriedMaleStudentChild().getValue());
	}

}