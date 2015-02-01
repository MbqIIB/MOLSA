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
