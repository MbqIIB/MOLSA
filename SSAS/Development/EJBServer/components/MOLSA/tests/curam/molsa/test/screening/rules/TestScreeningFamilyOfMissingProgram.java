package curam.molsa.test.screening.rules;

import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyOfMissingProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.FamilyOfMissingProgram_Factory;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;

public class TestScreeningFamilyOfMissingProgram extends
    MOLSAScreeningRulesTestData {

  public TestScreeningFamilyOfMissingProgram(String name) {
    super(name);
  }

  public void testFamilyOfMissingProgram() {
    createFamilyOfMissing(ABSENTFATHEREntry.MISSING.getCode());
    FamilyOfMissingProgram familyOfMissingProgram = FamilyOfMissingProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE,
        familyOfMissingProgram.getAttributeValue(isEligible).getValue());

  }

  public void testFamilyOfMissingNegative() {
    createFamilyOfMissing(ABSENTFATHEREntry.ANONYMOUS.getCode());
    FamilyOfMissingProgram familyOfMissingProgram = FamilyOfMissingProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        familyOfMissingProgram.getAttributeValue(isEligible).getValue());

  }

}
