package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.DivorcedLadyProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.DivorcedLadyProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningDivorcedProgram extends MOLSAScreeningRulesTestData {

  public TestScreeningDivorcedProgram(String name) {
    super(name);
  }

  public void testDivorcedLadyProgram() {
    createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, divorcedLadyProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDivorcedLadyProgramFailingNonFinancials() {
    createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        divorcedLadyProgram.getAttributeValue(isEligible).getValue());

  }

  public void testDivorcedLadyProgramDiffMaritialStatus() {
    createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.NO.getCode());
    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        divorcedLadyProgram.getAttributeValue(isEligible).getValue());

  }

  public void testDivorcedLadyProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Ummbarta Khan", 1001,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DIVORCED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());

    createPersonRecord("Reza Mohammed", 1002, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Farah Khan", 1003, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createIncomeItemRecord(personRecord, 100,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, divorcedLadyProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDivorcedLadyProgramWithIncomeAndExpenseUnderLimits() {
    Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DIVORCED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    final Person thirdPerson = createPersonRecord("Ziya Khan", 103,
        Date.fromISO8601("19820101"), Boolean.TRUE,
        MARITALSTATUSEntry.DIVORCED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createIncomeItemRecord(thirdPerson, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    createExpenseRecord(thirdPerson, 1000, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, divorcedLadyProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDivorcedLadyProgramWithIncomeAndExpenseAboveLimits() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DIVORCED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DIVORCED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.SINGLE.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createIncomeItemRecord(personRecord, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        divorcedLadyProgram.getAttributeValue(isEligible).getValue());
  }

  public void testDivorcedLadyProgramNegative() {
    createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.COMMONLAW.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());

    DivorcedLadyProgram divorcedLadyProgram = DivorcedLadyProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        divorcedLadyProgram.getAttributeValue(isEligible).getValue());

  }
}
