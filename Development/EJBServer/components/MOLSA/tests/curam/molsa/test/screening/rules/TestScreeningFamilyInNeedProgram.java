package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.codetable.impl.RELATIONSHIPTYPECOREDESCEntry;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyInNeedProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyInNeedProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningFamilyInNeedProgram extends
		MOLSAScreeningRulesTestData {

	public TestScreeningFamilyInNeedProgram(String name) {
		super(name);
	}

	public void testFamilyInNeedBaseScenario() {
		createFamilyInNeedBaseScenario();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());
		String unitMembers = familyInNeedProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Mohammad Hameed,Asma Mohammad,Firdoz Mohammad",
				unitMembers.replaceAll(", ", ","));
	}

	public void testFamilyInNeedBaseScenarioVariationOne() {
		createFamilyInNeedBaseScenarioVariationOne();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());
		String unitMembers = familyInNeedProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Asma Mohammad,Firdoz Mohammad,Fathima Mohammad",
				unitMembers.replaceAll(", ", ","));

	}

	/**
	 * 
	 */

	public void testFamilyInNeedBaseScenarioVariationTwo() {
		createFamilyInNeedBaseScenarioVariationTwo();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());
		String unitMembers = familyInNeedProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Asma Mohammad,Aafreen Abbas",
				unitMembers.replaceAll(", ", ","));

	}

	public void testFamilyInNeedBaseScenarioVariationFour() {
		createFamilyInNeedBaseScenarioVariationFour();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.FALSE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());
		String unitMembers = familyInNeedProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Mohammad Hameed,Asma Mohammad,Firdoz Mohammad",
				unitMembers.replaceAll(", ", ","));

	}

	public void testFamilyInNeedProgram() {
		createFamilyInNeed();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram1() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeOne.isMemberEnrolledInSchool().specifyValue(Boolean.FALSE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChildOfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.FALSE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChild2OfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.FALSE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeTwo.isMemberEnrolledInSchool().specifyValue(Boolean.FALSE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
		dependentChildOfWifeTwo.isMemberEnrolledInSchool().specifyValue(
				Boolean.FALSE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));

		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram2() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeOne.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChildOfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChild2OfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeTwo.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
		dependentChildOfWifeTwo.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram3() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram4() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeOne.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChildOfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChild2OfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeTwo.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
		dependentChildOfWifeTwo.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram5() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeOne.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChildOfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChild2OfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeTwo.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
		dependentChildOfWifeTwo.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram6() {
		final Person personRecord = createPersonRecord("Farooq", 101,
				Date.fromISO8601("20000101"), Boolean.TRUE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
		personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person wifeOne = createPersonRecord("Wife1", 102,
				Date.fromISO8601("19820101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeOne.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeOne = createPersonRecord(
				"Wife1Child1", 103, Date.fromISO8601("20020101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChildOfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person dependentChild2OfWifeOne = createPersonRecord(
				"Wife1Child2", 104, Date.fromISO8601("20121010"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.MALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
		dependentChild2OfWifeOne.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		final Person wifeTwo = createPersonRecord("Wife2", 105,
				Date.fromISO8601("19950101"), Boolean.FALSE,
				MARITALSTATUSEntry.MARRIED.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
		wifeTwo.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

		final Person dependentChildOfWifeTwo = createPersonRecord(
				"Wife2Child1", 106, Date.fromISO8601("20100101"),
				Boolean.FALSE, MARITALSTATUSEntry.SINGLE.getCode(),
				GENDEREntry.FEMALE.getCode(),
				CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
				RESIDENCYEntry.YES.getCode());
		dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
		dependentChildOfWifeTwo.isMemberEnrolledInSchool().specifyValue(
				Boolean.TRUE);

		createAbsentFatherRecord("Abeed", "Khan", 201,
				Date.fromISO8601("19620101"),
				ABSENTFATHEREntry.INPRISON.getCode());

		// Husband Relationships
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
		createRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createOneWayRelationshipRecord(personRecord,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
		createRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

		createOneWayRelationshipRecord(wifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
		createRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createOneWayRelationshipRecord(wifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

		createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
		createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
		createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChild2OfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChildOfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeOne);
		createOneWayRelationshipRecord(dependentChild2OfWifeOne,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChildOfWifeTwo);
		createOneWayRelationshipRecord(dependentChildOfWifeTwo,
				RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
				dependentChild2OfWifeOne);

		createIncomeItemRecord(personRecord, 500,
				INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeOne, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createIncomeItemRecord(wifeTwo, 500,
				INCOMETYPECODEEntry.INHERITANCE.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-30));

		createExpenseRecord(personRecord, 100,
				EXPENSEEntry.COMMERCIAL.getCode(),
				FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
						.addDays(-50));
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

	public void testFamilyInNeedProgram7() {
		createFamilyInNeedScenario2();
		FamilyInNeedProgram familyInNeedProgram = FamilyInNeedProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.FALSE,
				familyInNeedProgram.getAttributeValue(isEligible).getValue());

	}

}
