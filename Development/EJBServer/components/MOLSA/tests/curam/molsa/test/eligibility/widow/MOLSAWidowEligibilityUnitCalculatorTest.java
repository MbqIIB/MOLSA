package curam.molsa.test.eligibility.widow;

import java.util.ArrayList;
import java.util.List;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.ruleclass.AbsentFatherDataRuleSet.impl.AbsentFather;
import curam.creole.ruleclass.AbsentFatherDataRuleSet.impl.AbsentFather_Factory;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole_Factory;
import curam.creole.ruleclass.ExpenseDataRuleSet.impl.Expense;
import curam.creole.ruleclass.ExpenseDataRuleSet.impl.Expense_Factory;
import curam.creole.ruleclass.HandicapEligibilityAndEntitlementRuleSet.impl.HandicapEligibilityUnitCalculator;
import curam.creole.ruleclass.HandicapEligibilityAndEntitlementRuleSet.impl.HandicapEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income_Factory;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus_Factory;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation_Factory;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath;
import curam.creole.ruleclass.PDCBirthAndDeathDataRuleSet.impl.PDCBirthAndDeath_Factory;
import curam.creole.ruleclass.PDCGenderDataRuleSet.impl.PDCGender;
import curam.creole.ruleclass.PDCGenderDataRuleSet.impl.PDCGender_Factory;
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
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowCPRCalculator;
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowCPRCalculator_Factory;
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowEligibilityUnitCalculator;
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowHouseholdComposition;
import curam.creole.ruleclass.WidowEligibilityAndEntitlementRuleSet.impl.WidowHouseholdComposition_Factory;
import curam.creole.value.CodeTableItem;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

@SuppressWarnings("restriction")
public class MOLSAWidowEligibilityUnitCalculatorTest extends
		MOLSACreoleBaseTest {

	public static final String MOLSA_RULESET = "WidowEligibilityAndEntitlementRuleSetRuleSet";

	/**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSAWidowEligibilityUnitCalculatorTest(String arg0) {
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
	 * Test case for 'isFemaleTimeline' attribute. Test Data:Gender specified as
	 * female/male and tested Test Class : WidowCPRCalculator
	 */

	public void testisFemaleTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Test";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final WidowCPRCalculator widowCPRCalculatorObj = WidowCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// When gender is specified as Female

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				GENDER.TABLENAME, GENDER.FEMALE)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		PDCGender pdcGender = PDCGender_Factory.getFactory().newInstance(
				getSession());
		pdcGender.caseID().specifyValue(caseID);
		pdcGender.gender().specifyValue(firstTimeline);
		pdcGender.person().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				widowCPRCalculatorObj.isFemaleTimeline().getValue());
	}

	public void testisFemaleTimeline1() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.MALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final WidowCPRCalculator widowCPRCalculatorObj = WidowCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// When gender is specified as Male

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				GENDER.TABLENAME, GENDER.MALE)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		PDCGender pdcGender = PDCGender_Factory.getFactory().newInstance(
				getSession());
		pdcGender.caseID().specifyValue(caseID);
		pdcGender.gender().specifyValue(firstTimeline);
		pdcGender.person().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				widowCPRCalculatorObj.isFemaleTimeline().getValue());
	}

	public void testIsWidowTimeline1() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.WIDOWED);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final WidowCPRCalculator widowCPRCalculatorObj = WidowCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// Specifying both isWidow as TRUE and isFemale as FALSE

		widowCPRCalculatorObj.isWidow().specifyValue(Timeline.TRUE_FOREVER);
		widowCPRCalculatorObj.isFemaleTimeline().specifyValue(
				Timeline.FALSE_FOREVER);
		widowCPRCalculatorObj.isAgeBelowSixtyTimeline().specifyValue(
				Timeline.TRUE_FOREVER);

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				widowCPRCalculatorObj.isWidowTimeline().getValue());
	}

	/**
	 * Test case for 'IsWidow' attribute. Test Data:Marital status specified as
	 * Widowed and tested Test Class : WidowCPRCalculator
	 */

	public void testIsWidow() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.WIDOWED);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final WidowCPRCalculator widowCPRCalculatorObj = WidowCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// When Marital Status is specified as Widowed

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.WIDOWED)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				test1);

		MaritalStatus maritalStatus = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatus.caseID().specifyValue(caseID);
		maritalStatus.maritalStatus().specifyValue(maritalStatusTimeline);
		maritalStatus.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				widowCPRCalculatorObj.isWidow().getValue());
	}

	public void testIsWidow1() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.WIDOWED);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final WidowCPRCalculator widowCPRCalculatorObj = WidowCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		// When Marital Status is specified as Widowed

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.DIVORCED)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				test1);

		MaritalStatus maritalStatus = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatus.caseID().specifyValue(caseID);
		maritalStatus.maritalStatus().specifyValue(maritalStatusTimeline);
		maritalStatus.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				widowCPRCalculatorObj.isWidow().getValue());
	}

	/**
	 * Test case for 'IsEligible' attribute. Test Data:
	 */

	public void testIsEligible() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

	}

	public void testUnearnedIncomeAmount1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 100));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		// When income type is not SALARY (unearned)

		Income incomeObj = Income_Factory.getFactory()
				.newInstance(getSession());
		incomeObj.caseID().specifyValue(caseID);
		incomeObj.amount().specifyValue(amount2Timeline);
		incomeObj.incomeType().specifyValue(
				new CodeTableItem(INCOMETYPECODE.TABLENAME,
						INCOMETYPECODE.SALARY));
		incomeObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		incomeObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		CREOLETestHelper.assertEquals(amountTimeline,
				widowedEligibilityUnitCalculatorObj.unearnedIncomeAmount()
						.getValue());
	}

	public void testTotalExpenseAmountTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 100));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		// When rent type is Commercial

		Expense ExpenseObj = Expense_Factory.getFactory().newInstance(
				getSession());
		ExpenseObj.caseID().specifyValue(caseID);
		ExpenseObj.rentAmount().specifyValue(amount2Timeline);
		ExpenseObj.rentType().specifyValue(
				new CodeTableItem(EXPENSE.TABLENAME, EXPENSE.COMMERCIAL));
		ExpenseObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		ExpenseObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		CREOLETestHelper.assertEquals(amountTimeline,
				widowedEligibilityUnitCalculatorObj
						.totalExpenseAmountTimeline().getValue());
	}

	/**
	 * Test case for 'TotalCountableIncomeTimeline' attribute. Test Data:Total
	 * expense amount and unearned income amount
	 */

	public void testTotalCountableIncomeTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
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

		widowedEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		widowedEligibilityUnitCalculatorObj.unearnedIncomeAmount()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				widowedEligibilityUnitCalculatorObj
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
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
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

		widowedEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		widowedEligibilityUnitCalculatorObj.unearnedIncomeAmount()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				widowedEligibilityUnitCalculatorObj
						.totalCountableIncomeTimeline().getValue());
	}

	/**
	 * Test case for 'HasHouseholdPassedIncomeTestTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant value of 6000 and unearned
	 * income amount
	 */

	public void testhasHouseholdPassedIncomeTestTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 1000));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Boolean>> result = new ArrayList<Interval<Boolean>>();
		result.add(new Interval<Boolean>(null, false));
		result.add(new Interval<Boolean>(Date.fromISO8601("20040601"), false));
		final Timeline<Boolean> resultTimeline = new Timeline<Boolean>(result);
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		widowedEligibilityUnitCalculatorObj.caseID().specifyValue(caseID);
		widowedEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		widowedEligibilityUnitCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amount2Timeline);
		CREOLETestHelper.assertEquals(resultTimeline,
				widowedEligibilityUnitCalculatorObj
						.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

	/**
	 * Test case for 'MonthlyAmountTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant of 6000 and
	 * totalCountableIncomeTimeline
	 */

	public void testMonthlyAmountTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When totalCountableIncomeTimeline is greater than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 6000));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 6000));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		widowedEligibilityUnitCalculatorObj.caseID().specifyValue(caseID);
		widowedEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		widowedEligibilityUnitCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amount2Timeline);

		widowedEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				widowedEligibilityUnitCalculatorObj.monthlyAmountTimeline()
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
		final WidowEligibilityUnitCalculator widowedEligibilityUnitCalculatorObj = WidowEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When totalCountableIncomeTimeline is lesser than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 5000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> output = new ArrayList<Interval<Number>>();
		output.add(new Interval<Number>(null, 6000));
		output.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> outputTimeline = new Timeline<Number>(output);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 6000));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		widowedEligibilityUnitCalculatorObj.caseID().specifyValue(caseID);
		widowedEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		widowedEligibilityUnitCalculatorObj.primaryBeneficiaryAmount()
				.specifyValue(amount2Timeline);

		widowedEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				widowedEligibilityUnitCalculatorObj.monthlyAmountTimeline()
						.getValue());
	}

}
