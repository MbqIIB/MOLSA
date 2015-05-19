package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.WidowProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.WidowProgram_Factory;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningWidowProgram extends MOLSAScreeningRulesTestData {
  public TestScreeningWidowProgram(String name) {
    super(name);
  }

  public void testWidowProgram() {
   final Person person =  createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

   person.hasAbsentHusband().specifyValue(Boolean.TRUE);
   createAbsentFatherRecord("Abeed", "Khan", 201,
       Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());
    
    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, widowProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testWidowProgramFailingNonFinancials() {
    final Person person = createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    person.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        widowProgram.getAttributeValue(isEligible).getValue());

  }

  public void testWidowProgramDiffMaritialStatus() {
    final Person person =   createPersonRecord("Asma Mohammed", 101, Date.fromISO8601("19620101"),
        Boolean.TRUE, MARITALSTATUSEntry.DESERTED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());
    person.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());
    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Ziya Khan", 103, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.NO.getCode());
    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        widowProgram.getAttributeValue(isEligible).getValue());

  }

  public void testWidowProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Ummbarta Khan", 1001,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.WIDOWED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());

    createPersonRecord("Reza Mohammed", 1002, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createPersonRecord("Farah Khan", 1003, Date.fromISO8601("19820101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    createIncomeItemRecord(personRecord, 100,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, widowProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testWidowProgramWithIncomeAndExpenseUnderLimits() {
    Person personRecord = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.WIDOWED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
        GENDEREntry.MALE.getCode(), CITIZENSHIPCODEEntry.QATARI.getCode(),
        RESIDENCYEntry.YES.getCode());

    final Person thirdPerson = createPersonRecord("Ziya Khan", 103,
        Date.fromISO8601("19820101"), Boolean.TRUE,
        MARITALSTATUSEntry.WIDOWED.getCode(), GENDEREntry.FEMALE.getCode(),
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

    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.TRUE, widowProgram
        .getAttributeValue(isEligible).getValue());

  }

  public void testWidowProgramWithIncomeAndExpenseAboveLimits() {
    final Person personRecord= createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.WIDOWED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());

    createPersonRecord("Mohammed Hamed", 102, Date.fromISO8601("19720101"),
        Boolean.TRUE, MARITALSTATUSEntry.WIDOWED.getCode(),
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

    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        widowProgram.getAttributeValue(isEligible).getValue());
  }

  public void testWidowProgramNegative() {
    final Person person = createPersonRecord("Asma Mohammed", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.COMMONLAW.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    person.hasAbsentHusband().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.DECEASED.getCode());

    WidowProgram widowProgram = WidowProgram_Factory
        .getFactory().newInstance(getSession());
    assertEquals(Boolean.FALSE,
        widowProgram.getAttributeValue(isEligible).getValue());

  }

}
