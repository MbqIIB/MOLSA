package curam.molsa.test.eligibility.orphan;

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
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income_Factory;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus_Factory;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation;
import curam.creole.ruleclass.MolsaEducationDataRuleSet.impl.MolsaEducation_Factory;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanCPRCalculator;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanCPRCalculator_Factory;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanEligibilityUnitCalculator;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanHouseholdComposition;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanHouseholdComposition_Factory;
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
import curam.creole.value.CodeTableItem;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

/**
 * Junit class for MOLSA Orphan rule
 * 
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAOrphanEligibilityUnitCalculatorTest extends
		MOLSACreoleBaseTest {

	public static final String MOLSA_RULESET = "OrphanRuleSet";

	/**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSAOrphanEligibilityUnitCalculatorTest(String arg0) {
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
	public SAHouseholdUnitMember createSigleSAHouseholdUnitMember(
			final CaseParticipantRole caseParticipantRoleRecord) {
		final Number participantRoleID1 = caseParticipantRoleRecord
				.participantRoleID().getValue();
		final Number caseID = caseParticipantRoleRecord.caseID().getValue();
		final curam.util.type.Date relationshipStartDate = curam.util.type.Date
				.fromISO8601("20000101");
		final SAHouseholdUnitMember saHouseholdUnitMember1 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(this.getSession(), caseID,
						caseParticipantRoleRecord);

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

	/* *//**
	 * Test case for 'UnearnedIncomeAmount' attribute. 
	 * Test Data:Income type and Income amount
	 * Test class : OrphanEligibilityUnitCalculator
	 */

	public void testUnearnedIncomeAmount() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		
		
		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 10));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);


		orphanEligibilityUnitCalculatorObj.orphanHouseholdMember().specifyValue(saHouseholdUnitCalculator);
		MemberCPRCalculator memberCPR = MemberCPRCalculator_Factory.getFactory().newInstance(getSession(), caseParticipantRoleList.get(0));
		memberCPR.totalIncomeAmounntTimeline().specifyValue(amountTimeline);
		

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 10));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		// When income type is not Commercial

		Income incomeObj = Income_Factory.getFactory()
				.newInstance(getSession());
		incomeObj.caseID().specifyValue(caseID);
		incomeObj.amount().specifyValue(amount2Timeline);
		incomeObj.incomeType().specifyValue(
				new CodeTableItem(INCOMETYPECODE.TABLENAME,
						INCOMETYPECODE.INHERITANCE));
		incomeObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		incomeObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		CREOLETestHelper.assertEquals(amountTimeline,
				orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount()
						.getValue());
	}

	public void testUnearnedIncomeAmount1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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

		// When income type is commercial

		Income incomeObj = Income_Factory.getFactory()
				.newInstance(getSession());
		incomeObj.caseID().specifyValue(caseID);
		incomeObj.amount().specifyValue(amount2Timeline);
		incomeObj.incomeType().specifyValue(
				new CodeTableItem(INCOMETYPECODE.TABLENAME,
						INCOMETYPECODE.COMMERCIAL));
		incomeObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		incomeObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		CREOLETestHelper.assertEquals(amountTimeline,
				orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount()
						.getValue());
	}

	/* *//**
	 * Test case for 'totalExpenseAmountTimeline' attribute. Test
	 * Data:Income type and Income amount
	 */

	public void testTotalExpenseAmountTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 10));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 10));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		// When rent type is Residential (Not Commercial)

		Expense ExpenseObj = Expense_Factory.getFactory().newInstance(
				getSession());
		ExpenseObj.caseID().specifyValue(caseID);
		ExpenseObj.rentAmount().specifyValue(amount2Timeline);
		ExpenseObj.rentType().specifyValue(
				new CodeTableItem(EXPENSE.TABLENAME, EXPENSE.RESIDENTIAL));
		ExpenseObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		ExpenseObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		CREOLETestHelper.assertEquals(amountTimeline,
				orphanEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
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
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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
				orphanEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
						.getValue());
	}

	/* *//**
	 * Test case for 'TotalCountableIncomeTimeline' attribute. Test
	 * Data:Total expense amount and unearned income amount
	 */

	public void testTotalCountableIncomeTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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

		orphanEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				orphanEligibilityUnitCalculatorObj
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
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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

		orphanEligibilityUnitCalculatorObj.totalExpenseAmountTimeline()
				.specifyValue(amount2Timeline);

		orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				orphanEligibilityUnitCalculatorObj
						.totalCountableIncomeTimeline().getValue());
	}

	/* *//**
	 * Test case for 'HasHouseholdPassedIncomeTestTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant value of 6000 and unearned
	 * income amount
	 */

	public void testHasHouseholdPassedIncomeTestTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When unearned income amount is greater than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 7000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20040601"), false));

		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);
		orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(timeline,
				orphanEligibilityUnitCalculatorObj
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
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		// When unearned income amount is lesser than 6000

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 3000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20040601"), true));

		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);
		orphanEligibilityUnitCalculatorObj.unearnedIncomeAmount().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(timeline,
				orphanEligibilityUnitCalculatorObj
						.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

	/* *//**
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
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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

		orphanEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				orphanEligibilityUnitCalculatorObj.monthlyAmountTimeline()
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
		final OrphanEligibilityUnitCalculator orphanEligibilityUnitCalculatorObj = OrphanEligibilityUnitCalculator_Factory
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

		orphanEligibilityUnitCalculatorObj.totalCountableIncomeTimeline()
				.specifyValue(amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline,
				orphanEligibilityUnitCalculatorObj.monthlyAmountTimeline()
						.getValue());
	}

	/* *//**
	 * Test case for 'IsAgeBelowSixtyTimeline' attribute. Test Data:DOB to
	 * the OOTB PDCbirth and death evidence
	 */

	public void testIsAgeBelowSixtyTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("19950615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20550615"), false));
		final Timeline<Boolean> expectedTimeline = new Timeline<Boolean>(
				intervals);

		PDCBirthAndDeath pdcBirthAndDeathObj = PDCBirthAndDeath_Factory
				.getFactory().newInstance(getSession());
		pdcBirthAndDeathObj.dateOfBirth().specifyValue(
				Date.fromISO8601("19950615"));
		pdcBirthAndDeathObj.caseID().specifyValue(caseID);
		pdcBirthAndDeathObj.person().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());
		final OrphanCPRCalculator orphanCPRCalculatorObj = OrphanCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		CREOLETestHelper.assertEquals(expectedTimeline, orphanCPRCalculatorObj
				.isAgeBelowSixtyTimeline().getValue());
	}

	/* *//**
	 * Test case for 'isSingleTimeline' attribute. Test Data:gender as
	 * single
	 */

	public void testisSingleTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final OrphanCPRCalculator orphanCPRCalculatorObj = OrphanCPRCalculator_Factory
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
				orphanCPRCalculatorObj.isSingleTimeline().getValue());
	}

	public void testisSingleTimeline1() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final OrphanCPRCalculator orphanCPRCalculatorObj = OrphanCPRCalculator_Factory
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
				orphanCPRCalculatorObj.isSingleTimeline().getValue());
	}

	/* *//**
	 * Test case for 'isAgeAboveSixAndEnrolledInSchoolTimeline' attribute.
	 * Test Data:DOB to the OOTB PDCbirth and death evidence
	 */

	public void testisAgeAboveSixAndEnrolledInSchoolTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals
				.add(new Interval<Boolean>(Date.fromISO8601("20550615"), false));
		final Timeline<Boolean> expectedTimeline = new Timeline<Boolean>(
				intervals);

		PDCBirthAndDeath pdcBirthAndDeathObj = PDCBirthAndDeath_Factory
				.getFactory().newInstance(getSession());
		pdcBirthAndDeathObj.dateOfBirth().specifyValue(
				Date.fromISO8601("20010615"));
		pdcBirthAndDeathObj.caseID().specifyValue(caseID);
		pdcBirthAndDeathObj.person().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());
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
		final OrphanCPRCalculator orphanCPRCalculatorObj = OrphanCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		CREOLETestHelper.assertEquals(expectedTimeline, orphanCPRCalculatorObj
				.isAgeAboveSixAndEnrolledInSchoolTimeline().getValue());

	}

	/* *//**
	 * Test case for 'IsOrphanTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant of 6000 and
	 * totalCountableIncomeTimeline
	 */

	public void testIsOrphanTimeline() {

		final CaseParticipantRole caseParticipantRole = createACaseParticipantRole();

		final OrphanCPRCalculator orphanCPRCalculatorCalculatorObj = OrphanCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		final MemberCPRCalculator memberCPRCalculatorCalculatorObj = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole);

		final List<Interval<Boolean>> test1 = new ArrayList<Interval<Boolean>>();
		test1.add(new Interval<Boolean>(null, true));
		test1.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> firstTimeline = new Timeline<Boolean>(test1);

		final List<Interval<Boolean>> test2 = new ArrayList<Interval<Boolean>>();
		test2.add(new Interval<Boolean>(null, true));
		test2.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> secondTimeline = new Timeline<Boolean>(test2);

		final List<Interval<Boolean>> test3 = new ArrayList<Interval<Boolean>>();
		test3.add(new Interval<Boolean>(null, true));
		test3.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> thirdTimeline = new Timeline<Boolean>(test3);

		final List<Interval<Boolean>> test4 = new ArrayList<Interval<Boolean>>();
		test4.add(new Interval<Boolean>(null, true));
		test4.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> fourthTimeline = new Timeline<Boolean>(test4);

		final List<Interval<Boolean>> result = new ArrayList<Interval<Boolean>>();
		result.add(new Interval<Boolean>(null, false));
		result.add(new Interval<Boolean>(Date.fromISO8601("20141201"), false));
		final Timeline<Boolean> resultTimeline = new Timeline<Boolean>(result);

		orphanCPRCalculatorCalculatorObj.isHavingDeceasedAbsentFather()
				.specifyValue(secondTimeline);
		memberCPRCalculatorCalculatorObj.householdMemberRecordsExists()
				.specifyValue(firstTimeline);
		orphanCPRCalculatorCalculatorObj.isAgeBelowSixtyTimeline()
				.specifyValue(thirdTimeline);
		orphanCPRCalculatorCalculatorObj.isSingleTimeline().specifyValue(
				fourthTimeline);

		CREOLETestHelper.assertEquals(resultTimeline,
				orphanCPRCalculatorCalculatorObj.isOrphanTimeline().getValue());

	}

	/* *//**
	 * Test case for 'isSingleTimeline' attribute. Test Data:gender as
	 * single
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
		SAHouseholdUnitMember householdUnitMember = createSigleSAHouseholdUnitMember(caseParticipantRole);
		List<SAHouseholdUnitMember> saHouseholdUnitMembers = new ArrayList<SAHouseholdUnitMember>();
		saHouseholdUnitMembers.add(householdUnitMember);
		
		//  Person Birth and Death Record
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
		


		// Marital status Record as Single
		final List<Interval<CodeTableItem>> maritalStatus = new ArrayList<Interval<CodeTableItem>>();
		maritalStatus.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				MARITALSTATUS.TABLENAME, MARITALSTATUS.SINGLE)));
		final Timeline<CodeTableItem> maritalStatusTimeline = new Timeline<CodeTableItem>(
				maritalStatus);
		MaritalStatus maritalStatusObj = MaritalStatus_Factory.getFactory()
				.newInstance(getSession());
		maritalStatusObj.caseID().specifyValue(caseID);
		maritalStatusObj.participant().specifyValue(
				caseParticipantRole.caseParticipantRoleID().getValue());
		maritalStatusObj.maritalStatus().specifyValue(maritalStatusTimeline);

 		// Citizenship code as Qatari
		final List<Interval<CodeTableItem>> citizenShip = new ArrayList<Interval<CodeTableItem>>();
		citizenShip.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.QATARI)));
		final Timeline<CodeTableItem> citizenShipTimeline = new Timeline<CodeTableItem>(
				citizenShip); 
		
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
		OrphanHouseholdComposition householdComposition = OrphanHouseholdComposition_Factory
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