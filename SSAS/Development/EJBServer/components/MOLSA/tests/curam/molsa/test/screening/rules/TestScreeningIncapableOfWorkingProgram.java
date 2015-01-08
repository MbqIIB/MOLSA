package curam.molsa.test.screening.rules;

import java.util.List;

import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.IncapableOfWorkingProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.IncapableOfWorkingProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;

public class TestScreeningIncapableOfWorkingProgram extends MOLSAScreeningRulesTestData {

  public TestScreeningIncapableOfWorkingProgram(String name) {
    super(name);
  }

  public void testIncapableOfWorkingProgram() {
    final List<Person> personList = createFamilyOfIncapable();
    IncapableOfWorkingProgramCalculator incapableOfWorkingProgramCalculator = IncapableOfWorkingProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    incapableOfWorkingProgramCalculator.personList().specifyValue(personList);
    
    assertEquals(Boolean.TRUE,
        incapableOfWorkingProgramCalculator.getAttributeValue(isEligible).getValue());

  }
  
  public void testIncapableOfWorkingProgramWithIncomeUnderLimits() {
    final List<Person> personList = createFamilyOfIncapable();
    IncapableOfWorkingProgramCalculator incapableOfWorkingProgramCalculator = IncapableOfWorkingProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    incapableOfWorkingProgramCalculator.personList().specifyValue(personList);
    
    assertEquals(Boolean.TRUE,
        incapableOfWorkingProgramCalculator.getAttributeValue(isEligible).getValue());
  }
  
  public void testIncapableOfWorkingProgramWithIncomeAndExpenseUnderLimits() {
    final List<Person> personList = createFamilyOfIncapable();
    IncapableOfWorkingProgramCalculator incapableOfWorkingProgramCalculator = IncapableOfWorkingProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    incapableOfWorkingProgramCalculator.personList().specifyValue(personList);
    assertEquals(Boolean.TRUE,
        incapableOfWorkingProgramCalculator.getAttributeValue(isEligible).getValue());
  }
  
  public void testIncapableOfWorkingProgramWithIncomeAndExpenseAboveLimit() {
    final List<Person> personList = createFamilyOfIncapableNegative();
    IncapableOfWorkingProgramCalculator incapableOfWorkingProgramCalculator = IncapableOfWorkingProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    incapableOfWorkingProgramCalculator.personList().specifyValue(personList);
    assertEquals(Boolean.FALSE,
        incapableOfWorkingProgramCalculator.getAttributeValue(isEligible).getValue());

  }

  public void testIncapableOfWorkingProgramNegative() {
    final List<Person> personList = createFamilyOfIncapableNegative();
    IncapableOfWorkingProgramCalculator incapableOfWorkingProgramCalculator = IncapableOfWorkingProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    incapableOfWorkingProgramCalculator.personList().specifyValue(personList);
    assertEquals(Boolean.FALSE,
        incapableOfWorkingProgramCalculator.getAttributeValue(isEligible).getValue());

  }

}
