package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.HandicappedProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.HandicappedProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.HandicappedProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.HandicappedProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningHandicappedProgram extends
    MOLSAScreeningRulesTestData {
  public TestScreeningHandicappedProgram(String name) {
    super(name);
  }

  public void testHandicappedProgram() {
    final Person personRecord = createPersonRecord("Asma", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    final Person personRecord2 = createPersonRecord("Mohammed", 102,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord2.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord2.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    
    HandicappedProgram handicappedProgram = HandicappedProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, handicappedProgram.getAttributeValue(isEligible)
        .getValue());

  }
  
  public void testHandicappedProgramFailingNonFinancials1() {
    final Person personRecord = createPersonRecord("Asma", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    final Person personRecord2 = createPersonRecord("Mohammed", 102,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord2.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord2.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord2.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    
    HandicappedProgram handicappedProgram = HandicappedProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE, handicappedProgram.getAttributeValue(isEligible)
        .getValue());

  }
  
  public void testHandicappedProgramFailingNonFinancials2() {
    final Person personRecord = createPersonRecord("Asma", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.NO.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    final Person personRecord2 = createPersonRecord("Mohammed", 102,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord2.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord2.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord2.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    
    HandicappedProgram handicappedProgram = HandicappedProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE, handicappedProgram.getAttributeValue(isEligible)
        .getValue());

  }
  
  public void testHandicappedProgramFailingNon2() {
    final Person personRecord = createPersonRecord("Asma", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.FALSE);

    final Person personRecord2 = createPersonRecord("Mohammed", 102,
        Date.fromISO8601("20000101"), Boolean.TRUE, "MS1",
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord2.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord2.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord2.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    
    HandicappedProgram handicappedProgram = HandicappedProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE, handicappedProgram.getAttributeValue(isEligible)
        .getValue());

  }
  
  public void testHandicappedProgram3() {
    final Person personRecord = createPersonRecord("Asma", 101,
        Date.fromISO8601("20000101"), Boolean.FALSE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    final Person personRecord2 = createPersonRecord("Mohammed", 102,
        Date.fromISO8601("20000101"), Boolean.FALSE, "MS1",
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.NO.getCode());
    personRecord2.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord2.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord2.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    
    HandicappedProgram handicappedProgram = HandicappedProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, handicappedProgram.getAttributeValue(isEligible)
        .getValue());

  }

  public void testHandicappedProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    HandicappedProgramCalculator handicappedProgramCalculator = HandicappedProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    handicappedProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE,
        handicappedProgramCalculator.getAttributeValue(isEligible).getValue());

  }

  public void testHandicappedProgramWithIncomeAndExpenseUnderLimits() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    HandicappedProgramCalculator handicappedProgramCalculator = HandicappedProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    handicappedProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE,
        handicappedProgramCalculator.getAttributeValue(isEligible).getValue());

  }

  public void testHandicappedProgramWithIncomeAndExpenseAboveLimit() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    createIncomeItemRecord(personRecord, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    HandicappedProgramCalculator handicappedProgramCalculator = HandicappedProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    handicappedProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.FALSE,
        handicappedProgramCalculator.getAttributeValue(isEligible).getValue());

  }

  public void testHandicappedProgramNegative() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS17002",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.TRUE);

    HandicappedProgramCalculator handicappedProgramCalculator = HandicappedProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    handicappedProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.FALSE,
        handicappedProgramCalculator.getAttributeValue(isEligible).getValue());

  }

}
