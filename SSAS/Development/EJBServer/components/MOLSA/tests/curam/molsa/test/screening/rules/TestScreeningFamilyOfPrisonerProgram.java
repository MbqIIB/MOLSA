package curam.molsa.test.screening.rules;

import java.util.List;

import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyOfPrisonerProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyOfPrisonerProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;

public class TestScreeningFamilyOfPrisonerProgram extends
		MOLSAScreeningRulesTestData {

	public TestScreeningFamilyOfPrisonerProgram(String name) {
		super(name);
	}

	public void testFamilyOfPrisonerBaseScenario() {
		List<Person> personsList = createFamilyOfPrisonerBaseScenario(ABSENTFATHEREntry.INPRISON
				.getCode());
		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());
		String unitMembers = familyOfPrisonerProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Firdoz,Asifa,Fathima",
				unitMembers.replaceAll(", ", ","));

	}
	
	public void testFamilyOfPrisonerBaseScenarioVariationOne() {
		createFamilyOfPrisonerBaseScenarioVariationOne(ABSENTFATHEREntry.INPRISON
				.getCode());
		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());
		String unitMembers = familyOfPrisonerProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Asifa",
				unitMembers.replaceAll(", ", ","));

	}
	

	public void testFamilyOfPrisonerProgram() {
		createFamilyOfPrisoner(ABSENTFATHEREntry.INPRISON.getCode());
		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.TRUE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());

	}

	public void testFamilyOfPrisonerProgramNegative() {
		createFamilyOfPrisoner(ABSENTFATHEREntry.DECEASED.getCode());

		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.FALSE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());

	}

	public void testFamilyOfPrisonerProgramNegative1() {
		createFamilyOfPrisoner(ABSENTFATHEREntry.MISSING.getCode());

		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.FALSE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());

	}

	public void testFamilyOfPrisonerProgramNegative2() {
		createFamilyOfPrisoner(ABSENTFATHEREntry.NOT_SPECIFIED.getCode());

		FamilyOfPrisonerProgram familyOfPrisonerProgram = FamilyOfPrisonerProgram_Factory
				.getFactory().newInstance(getSession());
		assertEquals(Boolean.FALSE,
				familyOfPrisonerProgram.getAttributeValue(isEligible)
						.getValue());

	}

}
