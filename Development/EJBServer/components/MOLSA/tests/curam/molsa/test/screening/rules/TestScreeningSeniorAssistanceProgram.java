package curam.molsa.test.screening.rules;

import java.util.List;

import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.SeniorCitizenProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.SeniorCitizenProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.SeniorCitizenProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.SeniorCitizenProgram_Factory;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;

public class TestScreeningSeniorAssistanceProgram extends
		MOLSAScreeningRulesTestData {
	public TestScreeningSeniorAssistanceProgram(String name) {
		super(name);
	}

	public void testSeniorCitizenBaseScenarioProgram() {
		final List<Person> personList = createSeniorCitizenBaseScenario();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Fahran Khan,Rafi Fathima,Zohra Firdoz,Fathima",
				unitMembers.replaceAll(", ", ","));

	}

	public void testSeniorCitizenBaseScenarioProgram01() {
		final List<Person> personList = createSeniorCitizenBaseScenarioVariationOne();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Fahran Khan,Firdoz,Aamira Mohammed",
				unitMembers.replaceAll(", ", ","));

	}

	public void testSeniorCitizenBaseScenarioProgram02() {
		final List<Person> personList = createSeniorCitizenBaseScenarioVariationTwo();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Yasmin Umran", unitMembers.replaceAll(", ", ","));

	}

	public void testSeniorCitizenBaseScenarioProgram03() {
		final List<Person> personList = createSeniorCitizenBaseScenarioVariationThree();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
		assertEquals("Fahran Khan", unitMembers.replaceAll(", ", ","));

	}
	
	public void testSeniorCitizenBaseScenarioProgram04() {
		final List<Person> personList = createSeniorCitizenBaseScenarioVariationFour();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.FALSE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("ineligibleNames")
				.getValue().toString();
		assertEquals("Yasmin Umran", unitMembers.replaceAll(", ", ","));

	}

	public void testSeniorCitizenProgram() {
		final List<Person> personList = createFamilySeniorCitizen();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());

	}

	public void testSeniorCitizenProgramWithIncomeUnderLimits() {
		final List<Person> personList = createFamilySeniorCitizen();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
	}

	public void testSeniorCitizenProgramWithIncomeAndExpenseUnderLimits() {
		final List<Person> personList = createFamilySeniorCitizen();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.TRUE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());
		String unitMembers = seniorCitizenProgram.getAttributeValue("name")
				.getValue().toString();
	}

	public void testSeniorCitizenProgramWithIncomeAndExpenseAboveLimit() {
		final List<Person> personList = createFamilyOfSeniorCitizenNegative();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);
		assertEquals(Boolean.FALSE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());

	}

	public void testSeniorCitizenProgramNegative() {
		final List<Person> personList = createFamilyOfSeniorCitizenNegative();
		SeniorCitizenProgramCalculator seniorCitizenProgramCalculator = SeniorCitizenProgramCalculator_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgramCalculator.personList().specifyValue(personList);
		seniorCitizenProgramCalculator.person().specifyValue(personList.get(0));

		SeniorCitizenProgram seniorCitizenProgram = SeniorCitizenProgram_Factory
				.getFactory().newInstance(getSession());
		seniorCitizenProgram.allPersonRecords().specifyValue(personList);

		assertEquals(Boolean.FALSE, seniorCitizenProgramCalculator
				.getAttributeValue(isEligible).getValue());

	}

}
