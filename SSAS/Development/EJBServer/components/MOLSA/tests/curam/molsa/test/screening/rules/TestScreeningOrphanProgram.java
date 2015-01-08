package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.OrphanProgramCalculator;
import curam.creole.ruleclass.MOLSAScreeningProgramsEligibiltyCalculator.impl.OrphanProgramCalculator_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningOrphanProgram extends MOLSAScreeningRulesTestData {
  public TestScreeningOrphanProgram(String name) {
    super(name);
  }

  public void testOrphanProgram() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1", GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(),RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed",
        "Khan", 201, Date.fromISO8601("19620101"),
        ABSENTFATHEREntry.DECEASED.getCode());
    OrphanProgramCalculator orphanProgramCalculator = OrphanProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    orphanProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE,
        orphanProgramCalculator.getAttributeValue(isEligible).getValue());

    
  

  }
  
  public void testOrphanProgramWithIncomeUnderLimits() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1", GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(),RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed",
        "Khan", 201, Date.fromISO8601("19620101"),
        ABSENTFATHEREntry.DECEASED.getCode());
    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    OrphanProgramCalculator orphanProgramCalculator = OrphanProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    orphanProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE,
        orphanProgramCalculator.getAttributeValue(isEligible).getValue());

    

   

  }
  
  public void testOrphanProgramWithIncomeAndExpenseUnderLimits() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1", GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(),RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed",
        "Khan", 201, Date.fromISO8601("19620101"),
        ABSENTFATHEREntry.DECEASED.getCode());

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    
    OrphanProgramCalculator orphanProgramCalculator = OrphanProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    orphanProgramCalculator.person().specifyValue(personRecord);
    assertEquals(Boolean.TRUE,
        orphanProgramCalculator.getAttributeValue(isEligible).getValue());



  }
  
  public void testOrphanProgramWithIncomeAndExpenseAboveLimit() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS1", GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(),RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed",
        "Khan", 201, Date.fromISO8601("19620101"),
        ABSENTFATHEREntry.DECEASED.getCode());
    
    createIncomeItemRecord(personRecord, 50000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));
    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    OrphanProgramCalculator orphanProgramCalculator = OrphanProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    orphanProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.FALSE,
        orphanProgramCalculator.getAttributeValue(isEligible).getValue());

  }

  public void testOrphanProgramNegative() {
    final Person personRecord = createPersonRecord("Mohammed", 101,
        Date.fromISO8601("20020101"), Boolean.TRUE, "MS17002", GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(),RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.TRUE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    createAbsentFatherRecord("Abeed",
        "Khan", 201, Date.fromISO8601("19620101"),
        ABSENTFATHEREntry.DECEASED.getCode());

    OrphanProgramCalculator orphanProgramCalculator = OrphanProgramCalculator_Factory
        .getFactory().newInstance(getSession());
    orphanProgramCalculator.person().specifyValue(personRecord);

    assertEquals(Boolean.FALSE,
        orphanProgramCalculator.getAttributeValue(isEligible).getValue());

  }

}
