package curam.molsa.test.eligibility.anonymousparents;

import java.util.ArrayList;
import java.util.List;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.ruleclass.AbsentFatherDataRuleSet.impl.AbsentFather;
import curam.creole.ruleclass.AbsentFatherDataRuleSet.impl.AbsentFather_Factory;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsCPRCalculator;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsCPRCalculator_Factory;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsEligibilityUnitCalculator;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsHouseholdComposition;
import curam.creole.ruleclass.AnonymousParentsEligibilityAndEntitlementRuleSet.impl.AnonymousParentsHouseholdComposition_Factory;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole_Factory;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus_Factory;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation_Factory;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath_Factory;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.ConcernRole;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.ConcernRole_Factory;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.Person;
import curam.creole.ruleclass.ParticipantEntitiesRuleSet.impl.Person_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.MemberCPRCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.MemberCPRCalculator_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitCalculator_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitMember;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitMember_Factory;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator_Factory;
import curam.creole.value.CodeTableItem;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

/**
 * Junit class for AnonymousParentsEligibilityAndEntitlementRuleSet
 * 
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAAnonymousParentsEligibilityUnitCalculator extends
		MOLSACreoleBaseTest {

	public static final String MOLSA_RULESET = "AnonymousParentsEligibilityAndEntitlementRuleSet";

	/**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSAAnonymousParentsEligibilityUnitCalculator(String arg0) {
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
	 * Creates an object of a SAHouseholdUnitMember.
	 */
	public SAHouseholdUnitMember createASAHouseholdUnitMember(
			final CaseParticipantRole caseParticipantRole) {
		final Number participantRoleID1 = caseParticipantRole
				.participantRoleID().getValue();

		final curam.util.type.Date relationshipStartDate = curam.util.type.Date
				.fromISO8601("20000101");
		final SAHouseholdUnitMember saHouseholdUnitMember1 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRole.caseID().getValue(),
						caseParticipantRole);

		return saHouseholdUnitMember1;
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
	 * Test case for 'isSingleTimeline' attribute. Test Data:gender as single
	 * Test Class : AnonymousParentsCPRCalculator
	 */

	public void testisSingleTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Test_Person";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// Specifying marital status as Single

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.SINGLE)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				test1);

		MaritalStatus maritalStatus = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatus.caseID().specifyValue(caseID);
		maritalStatus.maritalStatus().specifyValue(maritalStatusTimeline);
		maritalStatus.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				anonymousParentsCPRCalculatorObj.isSingleTimeline().getValue());
	}

	public void testisSingleTimeline1() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Test_Person";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// Specifying marital status as Single

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.MARRIED)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				test1);

		MaritalStatus maritalStatus = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatus.caseID().specifyValue(caseID);
		maritalStatus.maritalStatus().specifyValue(maritalStatusTimeline);
		maritalStatus.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				anonymousParentsCPRCalculatorObj.isSingleTimeline().getValue());
	}

	/**
	 * Test case for 'isHavingAnonymousFather' attribute. Test Data:absent
	 * father as Anonymous Test Class : AnonymousParentsCPRCalculator
	 */

	public void testisHavingAnonymousFather() {

		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				ABSENTFATHER.TABLENAME, ABSENTFATHER.ANONYMOUS)));
		final Timeline<CodeTableItem> absenceTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<Boolean>> test3 = new ArrayList<Interval<Boolean>>();
		test3.add(new Interval<Boolean>(null, true));
		test3.add(new Interval<Boolean>(Date.fromISO8601("20141201"), true));
		final Timeline<Boolean> firstTimeline = new Timeline<Boolean>(test3);

		AbsentFather test = AbsentFather_Factory.getFactory().newInstance(
				getSession());
		test.absenceReason().specifyValue(absenceTimeline);
		test.caseID().specifyValue(caseID);
		test.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());
		final List<AbsentFather> absentList = new ArrayList<AbsentFather>();
		absentList.add(test);

		MemberCPRCalculator memberCPRCalculator = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculator.absentFatherRecords().specifyValue(absentList);
		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));

		CREOLETestHelper.assertEquals(firstTimeline,
				anonymousParentsCPRCalculatorObj.isHavingAnonymousFather()
						.getValue());
	}

	public void testisHavingAnonymousFather1() {

		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				ABSENTFATHER.TABLENAME, ABSENTFATHER.DECEASED)));
		final Timeline<CodeTableItem> absenceTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<Boolean>> test3 = new ArrayList<Interval<Boolean>>();
		test3.add(new Interval<Boolean>(null, false));
		test3.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> firstTimeline = new Timeline<Boolean>(test3);

		AbsentFather test = AbsentFather_Factory.getFactory().newInstance(
				getSession());
		test.absenceReason().specifyValue(absenceTimeline);
		test.caseID().specifyValue(caseID);
		test.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());
		final List<AbsentFather> absentList = new ArrayList<AbsentFather>();
		absentList.add(test);

		MemberCPRCalculator memberCPRCalculator = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculator.absentFatherRecords().specifyValue(absentList);
		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));

		CREOLETestHelper.assertEquals(firstTimeline,
				anonymousParentsCPRCalculatorObj.isHavingAnonymousFather()
						.getValue());
	}

	/**
	 * Test case for 'isAnonymousParentsTimeline' attribute. Test Data: Three
	 * conditions Test Class : AnonymousParentsCPRCalculator
	 */

	public void testisAnonymousParentsTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		anonymousParentsCPRCalculatorObj.isHavingAnonymousFather()
				.specifyValue(Timeline.TRUE_FOREVER);
		anonymousParentsCPRCalculatorObj.isSingleTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		anonymousParentsCPRCalculatorObj.isAgeBelowSixtyTimeline()
				.specifyValue(Timeline.TRUE_FOREVER);

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				anonymousParentsCPRCalculatorObj.isAnonymousParentsTimeline()
						.getValue());
	}

	/**
	 * Test case for 'isEligibleTimeline' attribute. Test
	 * Data:hasPassedNonFinancialTestTimeline,
	 * hasHouseholdPassedIncomeTestTimeline, hasEarnedIncomeTimeline Test Class
	 * : AnonymousParentsEligibilityUnitCalculator
	 */

	public void testisEligibleTimeline() {

		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<Boolean>> test1 = new ArrayList<Interval<Boolean>>();
		test1.add(new Interval<Boolean>(null, false));
		test1.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> firstTimeline = new Timeline<Boolean>(test1);

		final List<Interval<Boolean>> test2 = new ArrayList<Interval<Boolean>>();
		test2.add(new Interval<Boolean>(null, true));
		test2.add(new Interval<Boolean>(Date.fromISO8601("20141201"), true));
		final Timeline<Boolean> secondTimeline = new Timeline<Boolean>(test2);

		final List<Interval<Boolean>> test3 = new ArrayList<Interval<Boolean>>();
		test3.add(new Interval<Boolean>(null, false));
		test3.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> thirdTimeline = new Timeline<Boolean>(test3);

		final List<Interval<Boolean>> test4 = new ArrayList<Interval<Boolean>>();
		test4.add(new Interval<Boolean>(null, true));
		test4.add(new Interval<Boolean>(Date.fromISO8601("20141201"), true));
		final Timeline<Boolean> fourthTimeline = new Timeline<Boolean>(test4);

		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		test.hasPassedNonFinancialTestTimeline().specifyValue(secondTimeline);
		test.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));

		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		anonymousParentsCalculatorCalculatorObj
				.hasHouseholdPassedIncomeTestTimeline().specifyValue(
						fourthTimeline);

		final MemberCPRCalculator memberCPRCalculatorCalculatorObj = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculatorCalculatorObj.hasEarnedIncomeTimeline()
				.specifyValue(thirdTimeline);

		CREOLETestHelper.assertEquals(firstTimeline,
				anonymousParentsCalculatorCalculatorObj.isEligibleTimeline()
						.getValue());
	}

	/**
	 * Test case for 'TotalCountableIncomeTimeline' attribute. Test Data:Total
	 * expense amount and unearned income amount Test Class :
	 * AnonymousParentsEligibilityUnitCalculator
	 */

	public void testTotalCountableIncomeTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When unearned income is greater than total expense amount

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 8000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 0));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		anonymousParentsCalculatorCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		anonymousParentsCalculatorCalculatorObj.unearnedIncomeAmount()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				anonymousParentsCalculatorCalculatorObj
						.totalCountableIncomeTimeline().getValue());
	}

	public void testTotalCountableIncomeTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When unearned income is lesser than total expense amount

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 4000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 0));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		anonymousParentsCalculatorCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		anonymousParentsCalculatorCalculatorObj.unearnedIncomeAmount()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				anonymousParentsCalculatorCalculatorObj
						.totalCountableIncomeTimeline().getValue());
	}

	/**
	 * Test case for 'HasHouseholdPassedIncomeTestTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant value of 6000 and unearned
	 * income amount Test Class : AnonymousParentsEligibilityUnitCalculator
	 */

	public void testHasHouseholdPassedIncomeTestTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<Number>> amount1 = new ArrayList<Interval<Number>>();
		amount1.add(new Interval<Number>(null, 0));
		amount1.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amountTimeline2 = new Timeline<Number>(amount1);

		anonymousParentsCalculatorCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		anonymousParentsCalculatorCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amountTimeline2);

		CREOLETestHelper.assertEquals(timeline,
				anonymousParentsCalculatorCalculatorObj
						.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

	public void testHasHouseholdPassedIncomeTestTimeline2() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20040601"), true));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final List<Interval<Number>> amount1 = new ArrayList<Interval<Number>>();
		amount1.add(new Interval<Number>(null, 0));
		amount1.add(new Interval<Number>(Date.fromISO8601("20040601"), 8000));
		final Timeline<Number> amountTimeline2 = new Timeline<Number>(amount1);

		anonymousParentsCalculatorCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		anonymousParentsCalculatorCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amountTimeline2);

		CREOLETestHelper.assertEquals(timeline,
				anonymousParentsCalculatorCalculatorObj
						.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

	/**
	 * Test case for 'MonthlyAmountTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant of 6000 and
	 * totalCountableIncomeTimeline Test Class :
	 * AnonymousParentsEligibilityUnitCalculator
	 */

	public void testMonthlyAmountTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When totalCountableIncomeTimeline is greater than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 4000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount1 = new ArrayList<Interval<Number>>();
		amount1.add(new Interval<Number>(null, 0));
		amount1.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amountTimeline2 = new Timeline<Number>(amount1);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 0));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 2000));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		anonymousParentsCalculatorCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		anonymousParentsCalculatorCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amountTimeline2);
		CREOLETestHelper.assertEquals(outputTimeline,
				anonymousParentsCalculatorCalculatorObj.monthlyAmountTimeline()
						.getValue());
	}

	public void testMonthlyAmountTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final AnonymousParentsEligibilityUnitCalculator anonymousParentsCalculatorCalculatorObj = AnonymousParentsEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When totalCountableIncomeTimeline is greater than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 4000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount1 = new ArrayList<Interval<Number>>();
		amount1.add(new Interval<Number>(null, 0));
		amount1.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amountTimeline2 = new Timeline<Number>(amount1);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 0));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		anonymousParentsCalculatorCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		anonymousParentsCalculatorCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amountTimeline2);
		CREOLETestHelper.assertEquals(outputTimeline,
				anonymousParentsCalculatorCalculatorObj.monthlyAmountTimeline()
						.getValue());
	}

	/**
	 * Test case for 'HouseholdUnits' attribute. Test Class:
	 * WidowHouseholdComposition
	 */
	public void testHouseholdUnit() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Client_Name";
		final long caseParticipantRoleID2 = 11L;
		final long participantRoleID2 = 111L;

		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);
		final CaseParticipantRole caseParticipantRole2 = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID2, participantRoleID2,
				CASEPARTICIPANTROLETYPE.MEMBER);
		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createConcernRoleRecord(participantRoleID, Name);
		SAHouseholdUnitMember householdUnitMember = createASAHouseholdUnitMember(caseParticipantRole);
		List<SAHouseholdUnitMember> saHouseholdUnitMembers = new ArrayList<SAHouseholdUnitMember>();
		saHouseholdUnitMembers.add(householdUnitMember);

		// Person Birth and Death Record
		PDCBirthAndDeath pdcBirthAndDeathObj = PDCBirthAndDeath_Factory
				.getFactory().newInstance(getSession());
		pdcBirthAndDeathObj.dateOfBirth().specifyValue(
				Date.fromISO8601("20010615"));
		pdcBirthAndDeathObj.caseID().specifyValue(caseID);
		pdcBirthAndDeathObj.person().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		// Education Record
		MolsaEducation molsaEducation = MolsaEducation_Factory.getFactory()
				.newInstance(getSession());
		molsaEducation.caseID().specifyValue(caseID);
		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				EDUCATION.TABLENAME, EDUCATION.ENROLLED)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);
		molsaEducation.studentStatus().specifyValue(firstTimeline);
		molsaEducation.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		// Absent Father Record
		AbsentFather absentFather = AbsentFather_Factory.getFactory()
				.newInstance(getSession());
		absentFather.caseID().specifyValue(caseID);
		absentFather.absenceReason().specifyValue(
				new Timeline<CodeTableItem>(new CodeTableItem(
						ABSENTFATHER.TABLENAME, ABSENTFATHER.DECEASED)));
		absentFather.participant().specifyValue(
				caseParticipantRole2.caseParticipantRoleID().getValue());

		final List<Interval<CodeTableItem>> timeline1 = new ArrayList<Interval<CodeTableItem>>();
		timeline1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.WIDOWED)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				timeline1);

		MaritalStatus maritalStatus = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatus.caseID().specifyValue(caseID);
		maritalStatus.maritalStatus().specifyValue(maritalStatusTimeline);
		maritalStatus.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		// Citizenship code as Qatari
		final List<Interval<CodeTableItem>> citizenShip = new ArrayList<Interval<CodeTableItem>>();
		citizenShip.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.QATARI)));
		final Timeline<CodeTableItem> citizenShipTimeline = new Timeline<CodeTableItem>(
				citizenShip);

		final AnonymousParentsCPRCalculator anonymousParentsCPRCalculatorObj = AnonymousParentsCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);
		anonymousParentsCPRCalculatorObj.isHavingAnonymousFather()
				.specifyValue(Timeline.TRUE_FOREVER);
		anonymousParentsCPRCalculatorObj.isSingleTimeline().specifyValue(
				Timeline.TRUE_FOREVER);

		// Residency as Yes
		final List<Interval<CodeTableItem>> residency = new ArrayList<Interval<CodeTableItem>>();
		residency.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				RESIDENCY.TABLENAME, RESIDENCY.YES)));
		final Timeline<CodeTableItem> residencyTimeline = new Timeline<CodeTableItem>(
				residency);
		// Specifying exists Timeline of ActivesuccessionSet
		final List<Interval<Boolean>> exists = new ArrayList<Interval<Boolean>>();
		exists.add(new Interval<Boolean>(null, false));
		exists.add(new Interval<Boolean>(Date.fromISO8601("20111201"), true));
		final Timeline<Boolean> existsTimeline = new Timeline<Boolean>(exists);

		// HouseholdMember Record
		HouseholdMember householdMember = HouseholdMember_Factory.getFactory()
				.newInstance(getSession());
		householdMember.caseID().specifyValue(caseID);
		householdMember.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());
		householdMember.citizenship().specifyValue(citizenShipTimeline);
		householdMember.residency().specifyValue(residencyTimeline);
		householdMember.startDate().specifyValue(Date.fromISO8601("20110615"));
		householdMember.endDate().specifyValue(Date.kZeroDate);
		householdMember.exists().specifyValue(existsTimeline);
		AnonymousParentsHouseholdComposition householdComposition = AnonymousParentsHouseholdComposition_Factory
				.getFactory().newInstance(getSession());

		final java.util.List<Interval<List<SAHouseholdUnitMember>>> saHouseholdUnitMemberInt = new ArrayList<Interval<List<SAHouseholdUnitMember>>>();
		saHouseholdUnitMemberInt.add(new Interval<List<SAHouseholdUnitMember>>(
				null, saHouseholdUnitMembers));
		saHouseholdUnitMemberInt.add(new Interval<List<SAHouseholdUnitMember>>(
				Date.fromISO8601("20110615"), saHouseholdUnitMembers));
		householdComposition.membersForHouseholdComposition().specifyValue(
				new Timeline<List<SAHouseholdUnitMember>>(
						saHouseholdUnitMemberInt));

		CREOLETestHelper.assertEquals(1, householdComposition.householdUnits()
				.getValue().valueOn(Date.fromISO8601("20160101")).size());
	}

}