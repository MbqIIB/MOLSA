package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.DesertedWifeProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.DesertedWifeProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.DesertedWifeProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.DesertedWifeProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningDesertedProgram extends MOLSAScreeningRulesTestData {

  public TestScreeningDesertedProgram(String name) {
    super(name);
  }

  public void testDesertedWifeProgram() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, desertedWifeProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDesertedWifeProgramFailingNonFinancials() {
    final Person personRecord =  createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        desertedWifeProgram.getAttributeValue(isEligible).getValue());

  }

  public void testDesertedWifeProgramDiffMaritialStatus() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());
    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.NO.getCode());
    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        desertedWifeProgram.getAttributeValue(isEligible).getValue());

  }

  public void testDesertedWifeProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DESERTED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createIncomeItemRecord(personRecord, 100,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, desertedWifeProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDesertedWifeProgramWithIncomeAndExpenseUnderLimits() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DESERTED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    final Person thirdPerson = createPersonRecord("Ziya Khan", 103,
        Date.fromISO8601("19820101"), Boolean.TRUE,
        MARITALSTATUSEntry.DESERTED.getCode(), GENDEREntry.FEMALE.getCode(),
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

    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, desertedWifeProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testDesertedWifeProgramWithIncomeAndExpenseAboveLimits() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.DESERTED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
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

    DesertedWifeProgram desertedWifeProgram = DesertedWifeProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE, desertedWifeProgram
        .getAttributeValue(isEligible).getValue());
  }

  public void testDesertedWifeProgramNegative() {
    final Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.COMMONLAW.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DESERTED.getCode());

    DesertedWifeProgramCalculator desertedWifeProgramCalculator = DesertedWifeProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    desertedWifeProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.FALSE, desertedWifeProgramCalculator
        .getAttributeValue(isEligible).getValue());

  }

}
