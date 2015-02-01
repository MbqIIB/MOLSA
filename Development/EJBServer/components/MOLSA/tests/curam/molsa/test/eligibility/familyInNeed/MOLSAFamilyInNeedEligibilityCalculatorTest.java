package curam.molsa.test.eligibility.familyInNeed;

import java.util.ArrayList;
import java.util.List;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole;
import curam.creole.ruleclass.CaseEntitiesRuleSet.impl.CaseParticipantRole_Factory;
import curam.creole.ruleclass.FamilyInNeedEligibilityAndEntitlementRuleSet.impl.FamilyInNeedEligibilityUnitCalculator;
import curam.creole.ruleclass.FamilyInNeedEligibilityAndEntitlementRuleSet.impl.FamilyInNeedEligibilityUnitCalculator_Factory;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember;
import curam.creole.ruleclass.HouseholdMemberDataRuleSet.impl.HouseholdMember_Factory;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanEligibilityUnitCalculator;
import curam.creole.ruleclass.OrphanRuleSet.impl.OrphanEligibilityUnitCalculator_Factory;
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
import curam.molsa.test.eligibility.framework.MOLSACreoleBaseTest;
import curam.util.type.Date;

/**
 * Junit class for MOLSA Family in Need
 * 
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAFamilyInNeedEligibilityCalculatorTest extends
MOLSACreoleBaseTest {
	public static final String MOLSA_RULESET = "FamilyInNeedEligibilityUnitCalculator";

	   /**
	 * Default constructor
	 * 
	 * @param arg0
	 *            default argument
	 */
	public MOLSAFamilyInNeedEligibilityCalculatorTest(String arg0) {
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
		final Person personRecord = Person_Factory.getFactory().newInstance(this.getSession());
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
	public SAHouseholdUnitMember createASAHouseholdUnitMember( final CaseParticipantRole
			caseParticipantRole) {
		final Number participantRoleID1 = caseParticipantRole
				.participantRoleID().getValue();


		final curam.util.type.Date relationshipStartDate = curam.util.type.Date
				.fromISO8601("20000101");
		final SAHouseholdUnitMember saHouseholdUnitMember1 = SAHouseholdUnitMember_Factory
				.getFactory().newInstance(getSession(), caseParticipantRole.caseID().getValue(),
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
	   * Test case for 'isEligibleTimeline' attribute. 
	   * Test Data:hasPassedNonFinancialTestTimeline, hasHouseholdPassedIncomeTestTimeline, hasEarnedIncomeTimeline
	   * Test Class : FamilyInNeedEligibilityAndEntitlementRuleSet
	   */

/*	public void testisEligibleTimeline() {
		
		final Number caseID = 1111L;
		final List<CaseParticipantRole> caseParticipantRoleList = createCaseParticipantRole();
		final List<SAHouseholdUnitMember> saHouseholdUnitMemberList = createSAHouseholdUnitMember(caseParticipantRoleList);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
				.getFactory().newInstance(getSession());
		saHouseholdUnitCalculator.mandatoryMembers().specifyValue(
				saHouseholdUnitMemberList);
		
		final List<Interval<Boolean>> test1 = new ArrayList<Interval<Boolean>>();
		test1.add(new Interval<Boolean>(null, true));
		test1.add(new Interval<Boolean>(Date.fromISO8601("20141201"), true));
		final Timeline<Boolean> firstTimeline = new Timeline<Boolean>(test1);
	
		
		SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory.getFactory().newInstance(getSession(), caseParticipantRoleList.get(0));
		test.hasPassedNonFinancialTestTimeline().specifyValue(Timeline.TRUE_FOREVER);
		test.caseParticipantRoleRecord().specifyValue(caseParticipantRoleList.get(0));

		
		final FamilyInNeedEligibilityUnitCalculator familyCPRCalculatorCalculatorObj = FamilyInNeedEligibilityUnitCalculator_Factory
		.getFactory().newInstance(getSession(), caseID, saHouseholdUnitCalculator);
		familyCPRCalculatorCalculatorObj.hasHouseholdPassedIncomeTestTimeline().specifyValue(Timeline.TRUE_FOREVER);
		
		
		CREOLETestHelper.assertEquals(firstTimeline,
				familyCPRCalculatorCalculatorObj.isEligibleTimeline().getValue());
	}
	*/
	
	 /**
	   * Test case for 'hasHouseholdPassedNonFinancialTestTimeline' attribute. 
	   * Test Data:
	   * Test Class : FamilyInNeedEligibilityAndEntitlementRuleSet
	   */
	public void testhasHouseholdPassedNonFinancialTestTimeline(){
	    final Number caseID = 1111L;
	    final Number caseParticipantRoleIDOne = 1234L;
	    final Number participantRoleIDOne = 101L;
	    final Number caseParticipantRoleIDTwo = 12345L;
	    final Number participantRoleIDTwo = 102L;
	    final Number caseParticipantRoleIDThree = 123456L;
	    final Number participantRoleIDThree = 103L;
	    final Number caseParticipantRoleIDFour = 1234567L;
	    final Number participantRoleIDFour = 104L;

	    CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDOne,
	        participantRoleIDOne, CASEPARTICIPANTROLETYPE.PRIMARY);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
	        participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
	        participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
	        participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

      // Setting Set hasPassedCitizenshipTimeline and hasPassedResiencyTimeline to True
	    
		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, true));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), true));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
		.getFactory().newInstance(getSession());
		
		final FamilyInNeedEligibilityUnitCalculator familyCPRCalculatorCalculatorObj = FamilyInNeedEligibilityUnitCalculator_Factory
		.getFactory().newInstance(getSession(), caseID, saHouseholdUnitCalculator);
		
        SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory.getFactory().newInstance(getSession(), caseParticipantRoleRecord1);
        test.hasPassedNonFinancialTestTimeline().specifyValue(Timeline.TRUE_FOREVER);
        
        CREOLETestHelper.assertEquals(timeline,
        		familyCPRCalculatorCalculatorObj.hasHouseholdPassedNonFinancialTestTimeline().getValue());
      }
	
	public void testhasHouseholdPassedNonFinancialTestTimeline1(){
	    final Number caseID = 1111L;
	    final Number caseParticipantRoleIDOne = 1234L;
	    final Number participantRoleIDOne = 101L;
	    final Number caseParticipantRoleIDTwo = 12345L;
	    final Number participantRoleIDTwo = 102L;
	    final Number caseParticipantRoleIDThree = 123456L;
	    final Number participantRoleIDThree = 103L;
	    final Number caseParticipantRoleIDFour = 1234567L;
	    final Number participantRoleIDFour = 104L;

	    CaseParticipantRole caseParticipantRoleRecord1 = createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDOne,
	        participantRoleIDOne, CASEPARTICIPANTROLETYPE.PRIMARY);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDTwo,
	        participantRoleIDTwo, CASEPARTICIPANTROLETYPE.MEMBER);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDThree,
	        participantRoleIDThree, CASEPARTICIPANTROLETYPE.MEMBER);
	    createCaseParticipantRoleRecord(caseID, caseParticipantRoleIDFour,
	        participantRoleIDFour, CASEPARTICIPANTROLETYPE.MEMBER);

      // Setting Set hasPassedCitizenshipTimeline and hasPassedResiencyTimeline to True
	    
		final List<Interval<Boolean>> intervals = new ArrayList<Interval<Boolean>>();
		intervals.add(new Interval<Boolean>(null, false));
		intervals.add(new Interval<Boolean>(Date.getCurrentDate(), false));
		final Timeline<Boolean> timeline = new Timeline<Boolean>(intervals);

		final SAHouseholdUnitCalculator saHouseholdUnitCalculator = SAHouseholdUnitCalculator_Factory
		.getFactory().newInstance(getSession());
		
		final FamilyInNeedEligibilityUnitCalculator familyCPRCalculatorCalculatorObj = FamilyInNeedEligibilityUnitCalculator_Factory
		.getFactory().newInstance(getSession(), caseID, saHouseholdUnitCalculator);
		
        SANonFinancialCPRCalculator test = SANonFinancialCPRCalculator_Factory.getFactory().newInstance(getSession(), caseParticipantRoleRecord1);
        test.hasPassedNonFinancialTestTimeline().specifyValue(Timeline.FALSE_FOREVER);
        
        CREOLETestHelper.assertEquals(timeline,
        		familyCPRCalculatorCalculatorObj.hasHouseholdPassedNonFinancialTestTimeline().getValue());
      }
	
	
}

