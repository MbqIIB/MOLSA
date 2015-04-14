package curam.molsa.test.eligibility.familyofmissing;

import java.util.ArrayList;
import java.util.List;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole_Factory;
import curam.creole.ruleclass.ExpenseDataRuleSet.impl.Expense;
import curam.creole.ruleclass.ExpenseDataRuleSet.impl.Expense_Factory;
import curam.creole.ruleclass.FamilyOfMissingEligibilityAndEntitlementRuleSet.impl.FamilyOfMissingCPRCalculator;
import curam.creole.ruleclass.FamilyOfMissingEligibilityAndEntitlementRuleSet.impl.FamilyOfMissingCPRCalculator_Factory;
import curam.creole.ruleclass.FamilyOfMissingEligibilityAndEntitlementRuleSet.impl.FamilyOfMissingEligibilityUnitCalculator;
import curam.creole.ruleclass.FamilyOfMissingEligibilityAndEntitlementRuleSet.impl.FamilyOfMissingEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income;
import curam.creole.ruleclass.IncomeDataRuleSet.impl.Income_Factory;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus;
import curam.creole.ruleclass.MaritalStatusDataRuleSet.impl.MaritalStatus_Factory;
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
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SANonFinancialCPRCalculator_Factory;
import curam.creole.value.CodeTableItem;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

/**
 * Junit class for MOLSA Family of Missing
 * 
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAFamilyOfMissingEligibilityCalculatorTest extends
		MOLSACreoleBaseTest {
	public static final String MOLSA_RULESET = "FamilyInNeedEligibilityUnitCalculator";

	/**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSAFamilyOfMissingEligibilityCalculatorTest(String arg0) {
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
	 * Test case for 'hasHouseholdPassedIncomeTestTimeline' attribute. Test
	 * Data: Primary beneficiary amount and total countable income Test Class :
	 * FamilyOfMissingEligibilityUnitCalculator
	 */

	public void testhasHouseholdPassedIncomeTestTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 1000));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Boolean>> result = new ArrayList<Interval<Boolean>>();
		result.add(new Interval<Boolean>(null, false));
		result.add(new Interval<Boolean>(Date.fromISO8601("20040601"), true));
		final Timeline<Boolean> resultTimeline = new Timeline<Boolean>(result);

		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		familyOfMissingObj.primaryBeneficiaryAmount().specifyValue(
				amount2Timeline);
		CREOLETestHelper.assertEquals(resultTimeline, familyOfMissingObj
				.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

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

		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		familyOfMissingObj.primaryBeneficiaryAmount().specifyValue(
				amount2Timeline);
		CREOLETestHelper.assertEquals(resultTimeline, familyOfMissingObj
				.hasHouseholdPassedIncomeTestTimeline().getValue());
	}

	/**
	 * Test case for 'totalCountableIncomeTimeline' attribute. Test Data:
	 * unearnedIncomeAmount and total expense amount Test Class :
	 * FamilyOfMissingEligibilityUnitCalculator
	 */

	public void testtotalCountableIncomeTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 6000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 3000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Number>> amount3 = new ArrayList<Interval<Number>>();
		amount3.add(new Interval<Number>(null, 0));
		amount3.add(new Interval<Number>(Date.fromISO8601("20040601"), 3000));
		final Timeline<Number> amount3Timeline = new Timeline<Number>(amount3);

		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.unearnedIncomeAmount().specifyValue(amountTimeline);
		familyOfMissingObj.totalExpenseAmountTimeline().specifyValue(
				amount2Timeline);
		CREOLETestHelper.assertEquals(amount3Timeline, familyOfMissingObj
				.totalCountableIncomeTimeline().getValue());
	}

	public void testtotalCountableIncomeTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 3000));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 4000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		final List<Interval<Number>> amount3 = new ArrayList<Interval<Number>>();
		amount3.add(new Interval<Number>(null, 0));
		amount3.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amount3Timeline = new Timeline<Number>(amount3);

		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);
		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.unearnedIncomeAmount().specifyValue(amountTimeline);
		familyOfMissingObj.totalExpenseAmountTimeline().specifyValue(
				amount2Timeline);
		CREOLETestHelper.assertEquals(amount3Timeline, familyOfMissingObj
				.totalCountableIncomeTimeline().getValue());
	}

	/**
	 * Test case for 'totalExpenseAmountTimeline' attribute. Test Data: Expense
	 * records Test Class : FamilyOfMissingEligibilityUnitCalculator
	 */

	public void testTotalExpenseAmountTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
				.getFactory().newInstance(getSession(), caseID,
						saHouseholdUnitCalculator);

		final List<Interval<Number>> amount = new ArrayList<Interval<Number>>();
		amount.add(new Interval<Number>(null, 0));
		amount.add(new Interval<Number>(Date.fromISO8601("20040601"), 0));
		final Timeline<Number> amountTimeline = new Timeline<Number>(amount);

		final List<Interval<Number>> amount2 = new ArrayList<Interval<Number>>();
		amount2.add(new Interval<Number>(null, 0));
		amount2.add(new Interval<Number>(Date.fromISO8601("20040601"), 1000));
		final Timeline<Number> amount2Timeline = new Timeline<Number>(amount2);

		// When income type is not COMMERCIAL

		Expense expenseObj = Expense_Factory.getFactory().newInstance(
				getSession());
		expenseObj.rentAmount().specifyValue(amount2Timeline);
		expenseObj.rentType().specifyValue(
				new CodeTableItem(EXPENSE.TABLENAME, EXPENSE.COMMERCIAL));
		expenseObj.frequency().specifyValue(
				new CodeTableItem(FREQUENCYCODE.TABLENAME,
						FREQUENCYCODE.MONTHLY));
		expenseObj.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());
		expenseObj.caseID().specifyValue(caseID);

		final List<Expense> expenseList = new ArrayList<Expense>();
		expenseList.add(expenseObj);

		MemberCPRCalculator memberCPRCalculatorobj = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.expenseRecords().specifyValue(expenseList);

		familyOfMissingObj.caseID().specifyValue(
				caseParticipantRoleList.get(0).caseID().getValue());

		CREOLETestHelper.assertEquals(amountTimeline, familyOfMissingObj
				.totalExpenseAmountTimeline().getValue());
	}

	/**
	 * Test case for 'MonthlyAmountTimeline' attribute. Test
	 * Data:primaryBeneficiaryAmount a constant of 6000 and
	 * totalCountableIncomeTimeline Test Class :
	 * FamilyOfMissingEligibilityUnitCalculator
	 */

	public void testMonthlyAmountTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
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

		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		familyOfMissingObj.primaryBeneficiaryAmount().specifyValue(
				amount2Timeline);

		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline, familyOfMissingObj
				.monthlyAmountTimeline().getValue());
	}

	public void testMonthlyAmountTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		final FamilyOfMissingEligibilityUnitCalculator familyOfMissingObj = FamilyOfMissingEligibilityUnitCalculator_Factory
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

		familyOfMissingObj.caseID().specifyValue(caseID);
		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		familyOfMissingObj.primaryBeneficiaryAmount().specifyValue(
				amount2Timeline);

		familyOfMissingObj.totalCountableIncomeTimeline().specifyValue(
				amountTimeline);
		CREOLETestHelper.assertEquals(outputTimeline, familyOfMissingObj
				.monthlyAmountTimeline().getValue());
	}

	/**
	 * Test case for 'isMarriedTimeline' attribute. Test Data: Marital status as
	 * married Test Class : FamilyOfMissingCPRCalculator
	 */

	public void testisMarriedTimeline() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Pavan";
		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.MARRIED);

		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
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

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				familyOfMissingCPRCalculatorObj.isMarriedTimeline().getValue());
	}

	public void testisMarriedTimeline1() {
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

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
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

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				familyOfMissingCPRCalculatorObj.isMarriedTimeline().getValue());
	}

	/**
	 * Test case for 'isFemaleTimeline' attribute. Test Data:Gender specified as
	 * female/male and tested Test Class : FamilyOfMissingCPRCalculator
	 */

	public void testisFemaleTimeline() {
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

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
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
				familyOfMissingCPRCalculatorObj.isFemaleTimeline().getValue());
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

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
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
				familyOfMissingCPRCalculatorObj.isFemaleTimeline().getValue());
	}

	/**
	 * Test case for 'isFemaleTimeline' attribute. Test Data:Gender specified as
	 * female/male and tested Test Class : FamilyOfMissingCPRCalculator
	 */

	public void testisEligibleWifeTimeline() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		MemberCPRCalculator memberCPRCalculatorobj = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.hasEarnedIncomeTimeline().specifyValue(
				Timeline.FALSE_FOREVER);

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));

		familyOfMissingCPRCalculatorObj.caseParticipantRoleRecord()
				.specifyValue(caseParticipantRoleList.get(0));
		familyOfMissingCPRCalculatorObj.isFemaleTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		familyOfMissingCPRCalculatorObj.isMarriedTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		familyOfMissingCPRCalculatorObj.isAgeBelowSixtyTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		familyOfMissingCPRCalculatorObj.memberCPRCalculator().specifyValue(
				memberCPRCalculatorobj);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.QATARI)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<CodeTableItem>> test11 = new ArrayList<Interval<CodeTableItem>>();
		test11.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				RESIDENCY.TABLENAME, RESIDENCY.YES)));
		final Timeline<CodeTableItem> first1Timeline = new Timeline<CodeTableItem>(
				test11);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.caseID().specifyValue(caseID);
		hh.citizenship().specifyValue(firstTimeline);
		hh.residency().specifyValue(first1Timeline);
		hh.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		final SANonFinancialCPRCalculator testObj = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		testObj.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));
		testObj.hasPassedNonFinancialTestTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		testObj.householdMemberRecord().specifyValue(hh);

		CREOLETestHelper.assertEquals(Timeline.TRUE_FOREVER,
				familyOfMissingCPRCalculatorObj.isEligibleWifeTimeline()
						.getValue());
	}

	public void testisEligibleWifeTimeline1() {
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);

		MemberCPRCalculator memberCPRCalculatorobj = MemberCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));
		memberCPRCalculatorobj.hasEarnedIncomeTimeline().specifyValue(
				Timeline.FALSE_FOREVER);

		final FamilyOfMissingCPRCalculator familyOfMissingCPRCalculatorObj = FamilyOfMissingCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));

		familyOfMissingCPRCalculatorObj.caseParticipantRoleRecord()
				.specifyValue(caseParticipantRoleList.get(0));
		familyOfMissingCPRCalculatorObj.isFemaleTimeline().specifyValue(
				Timeline.FALSE_FOREVER);
		familyOfMissingCPRCalculatorObj.isMarriedTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		familyOfMissingCPRCalculatorObj.memberCPRCalculator().specifyValue(
				memberCPRCalculatorobj);

		final List<Interval<CodeTableItem>> test1 = new ArrayList<Interval<CodeTableItem>>();
		test1.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				CITIZENSHIPCODE.TABLENAME, CITIZENSHIPCODE.QATARI)));
		final Timeline<CodeTableItem> firstTimeline = new Timeline<CodeTableItem>(
				test1);

		final List<Interval<CodeTableItem>> test11 = new ArrayList<Interval<CodeTableItem>>();
		test11.add(new Interval<CodeTableItem>(null, new CodeTableItem(
				RESIDENCY.TABLENAME, RESIDENCY.YES)));
		final Timeline<CodeTableItem> first1Timeline = new Timeline<CodeTableItem>(
				test11);

		HouseholdMember hh = HouseholdMember_Factory.getFactory().newInstance(
				getSession());
		hh.exists().specifyValue(Timeline.TRUE_FOREVER);
		hh.caseID().specifyValue(caseID);
		hh.citizenship().specifyValue(firstTimeline);
		hh.residency().specifyValue(first1Timeline);
		hh.participant().specifyValue(
				caseParticipantRoleList.get(0).caseParticipantRoleID()
						.getValue());

		final SANonFinancialCPRCalculator testObj = SANonFinancialCPRCalculator_Factory
				.getFactory().newInstance(getSession(),
						caseParticipantRoleList.get(0));
		testObj.caseParticipantRoleRecord().specifyValue(
				caseParticipantRoleList.get(0));
		testObj.hasPassedNonFinancialTestTimeline().specifyValue(
				Timeline.TRUE_FOREVER);
		testObj.householdMemberRecord().specifyValue(hh);

		CREOLETestHelper.assertEquals(Timeline.FALSE_FOREVER,
				familyOfMissingCPRCalculatorObj.isEligibleWifeTimeline()
						.getValue());
	}

	/**
	 * Test case for 'HouseholdUnits' attribute. Test Class:
	 * FamilyOfMissingHouseholdCalculator
	 */
	public void testHouseholdUnit() {
		final long caseParticipantRoleID = 11L;
		final long participantRoleID = 111L;
		final long caseID = 111L;
		final String Name = "Client_Name";

		createPersonRecord(participantRoleID, Name,
				Date.fromISO8601("20110615"), Date.kZeroDate, GENDER.FEMALE,
				MARITALSTATUS.SINGLE);
		final CaseParticipantRole caseParticipantRole = createCaseParticipantRoleRecord(
				caseID, caseParticipantRoleID, participantRoleID,
				CASEPARTICIPANTROLETYPE.PRIMARY);
		createConcernRoleRecord(participantRoleID, Name);
		SAHouseholdUnitMember householdUnitMember = createASAHouseholdUnitMember(caseParticipantRole);
		List<SAHouseholdUnitMember> saHouseholdUnitMembers = new ArrayList<SAHouseholdUnitMember>();
		saHouseholdUnitMembers.add(householdUnitMember);

		SAHouseholdUnitCalculator saHouseholdUnit = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnit.mandatoryMembers().specifyValue(saHouseholdUnitMembers);
	}

}
