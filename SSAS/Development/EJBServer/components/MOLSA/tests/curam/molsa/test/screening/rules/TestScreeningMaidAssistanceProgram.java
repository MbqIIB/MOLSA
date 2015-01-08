package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.MaidAssistanceProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.MaidAssistanceProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningMaidAssistanceProgram extends
    MOLSAScreeningRulesTestData {
  public TestScreeningMaidAssistanceProgram(String name) {
    super(name);
  }

  public void testMaidAssistanceProgram() {
    final Person personRecord = createPersonRecord("Mary Lewis", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE, "MS17000",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    MaidAssistanceProgramCalculator maidAssistanceProgramCalculator = MaidAssistanceProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    maidAssistanceProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.TRUE, maidAssistanceProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

  public void testMaidAssistanceProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Mary Lewis", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE, "MS17000",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    MaidAssistanceProgramCalculator maidAssistanceProgramCalculator = MaidAssistanceProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    maidAssistanceProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE, maidAssistanceProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

  public void testMaidAssistanceProgramWithIncomeAndExpenseUnderLimits() {
    final Person personRecord = createPersonRecord("Mary Lewis", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE, "MS17000",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    MaidAssistanceProgramCalculator maidAssistanceProgramCalculator = MaidAssistanceProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    maidAssistanceProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE, maidAssistanceProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

  public void testMaidAssistanceProgramWithIncomeAndExpenseAboveLimit() {
    final Person personRecord = createPersonRecord("Mary Lewis", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE, "MS17000",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    personRecord.isUnfitToWork().specifyValue(Boolean.FALSE);
    createIncomeItemRecord(personRecord, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    MaidAssistanceProgramCalculator maidAssistanceProgramCalculator = MaidAssistanceProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    maidAssistanceProgramCalculator.person().specifyValue(personRecord);
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    assertEquals(Boolean.FALSE, maidAssistanceProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

  public void testMaidAssistanceProgramNegative() {
    final Person personRecord = createPersonRecord("Mary Lewis", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE, "MS17002",
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);
    personRecord.isPhysicallyChallenged().specifyValue(Boolean.FALSE);
    personRecord.isUnfitToWork().specifyValue(Boolean.FALSE);
    MaidAssistanceProgramCalculator maidAssistanceProgramCalculator = MaidAssistanceProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    maidAssistanceProgramCalculator.person().specifyValue(personRecord);
    createIncomeItemRecord(personRecord, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    assertEquals(Boolean.FALSE, maidAssistanceProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

}
