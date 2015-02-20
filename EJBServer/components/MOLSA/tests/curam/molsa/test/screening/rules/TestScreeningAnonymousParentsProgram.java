package curam.molsa.test.screening.rules;

import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.codetable.impl.RELATIONSHIPTYPECOREDESCEntry;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.AnonymousParentsProgram;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.AnonymousParentsProgram_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.base.MOLSAScreeningRulesTestData;
import curam.util.type.Date;

public class TestScreeningAnonymousParentsProgram extends
    MOLSAScreeningRulesTestData {

  public TestScreeningAnonymousParentsProgram(String name) {
    super(name);
  }

  public void testAnonymousParentsProgram() {
    createFamilyOfAnonymousParents(ABSENTFATHEREntry.ANONYMOUS.getCode());
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.TRUE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());

  }

  public void testAnonymousParentsProgram1() {
    int husbandID = 101;
    int wifeID = 102;
    int kidWithAbsentFatherID = 103;
    int absentFatherPersonID = 201;

    final Person husband = createPersonRecord("Abdul", husbandID,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.NOT_A_QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    husband.hasAnonymousParents().specifyValue(Boolean.FALSE);
    husband.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    husband.isUnfitToWork().specifyValue(Boolean.TRUE);
    husband.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Firdous", "Khan", absentFatherPersonID,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.ANONYMOUS.getCode());

    final Person wife = createPersonRecord("Wife", wifeID,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wife.hasAnonymousParents().specifyValue(Boolean.FALSE);
    wife.isMemberEnrolledInSchool().specifyValue(Boolean.FALSE);
    wife.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person kidWithAbsentFather = createPersonRecord("Child",
        kidWithAbsentFatherID, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    kidWithAbsentFather.hasAnonymousParents().specifyValue(Boolean.TRUE);
    kidWithAbsentFather.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    kidWithAbsentFather.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);
    // Husband Relationships
    createRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.UNCLE.getCode(), kidWithAbsentFatherID);
    createRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeID);
    
    createRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.AUNT.getCode(), kidWithAbsentFatherID);
    createRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.NEPHEW.getCode(), wifeID);
    
    createOneWayRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wife);
    createOneWayRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), husband);
    

    createOneWayRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.UNCLE.getCode(), kidWithAbsentFather);
    createOneWayRelationshipRecord(kidWithAbsentFather,
        RELATIONSHIPTYPECOREDESCEntry.NEPHEW.getCode(), husband);

  
    createIncomeItemRecord(husband, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wife, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(husband, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.TRUE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());

  }
  public void testAnonymousParentsProgram2() {
    int husbandID = 101;
    int wifeID = 102;
    int kidWithAbsentFatherID = 103;
    int absentFatherPersonID = 201;

    final Person husband = createPersonRecord("Abdul", husbandID,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.NO.getCode());
    husband.hasAnonymousParents().specifyValue(Boolean.FALSE);
    husband.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    husband.isUnfitToWork().specifyValue(Boolean.TRUE);
    husband.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Firdous", "Khan", absentFatherPersonID,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.ANONYMOUS.getCode());

    final Person wife = createPersonRecord("Wife", wifeID,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.NO.getCode());
    wife.hasAnonymousParents().specifyValue(Boolean.FALSE);
    wife.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person kidWithAbsentFather = createPersonRecord("Child",
        kidWithAbsentFatherID, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.NO.getCode());
    kidWithAbsentFather.hasAnonymousParents().specifyValue(Boolean.TRUE);
    kidWithAbsentFather.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);
    // Husband Relationships
    createRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.UNCLE.getCode(), kidWithAbsentFatherID);
    createRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeID);
    
    createRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.AUNT.getCode(), kidWithAbsentFatherID);
    createRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.NEPHEW.getCode(), wifeID);
    
    createOneWayRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wife);
    createOneWayRelationshipRecord(wife,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), husband);
    

    createOneWayRelationshipRecord(husband,
        RELATIONSHIPTYPECOREDESCEntry.UNCLE.getCode(), kidWithAbsentFather);
    createOneWayRelationshipRecord(kidWithAbsentFather,
        RELATIONSHIPTYPECOREDESCEntry.NEPHEW.getCode(), husband);

  
    createIncomeItemRecord(husband, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wife, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(husband, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.FALSE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());

  }
  public void testAnonymousParentsProgramWithIncomeUnderLimits() {
    createFamilyOfAnonymousParentsWithVaryingIncome(100, 100);
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.TRUE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());
  }

  public void testAnonymousParentsProgramWithIncomeExpenseUnderLimits() {
    createFamilyOfAnonymousParentsWithVaryingIncome(1000, 200);
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.TRUE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());
  }

  public void testAnonymousParentsProgramWithExpenseIncomeAboveLimits() {
    createFamilyOfAnonymousParentsWithVaryingIncome(10000, 100);
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.FALSE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());
  }

  public void testAnonymousParentsProgramNegative() {
    createFamilyOfAnonymousParents(ABSENTFATHEREntry.MISSING.getCode());
    AnonymousParentsProgram anonymousParentsProgram = AnonymousParentsProgram_Factory
        .getFactory().newInstance(getSession());
    anonymousParentsProgram.eligible().getValue();
    assertEquals(Boolean.TRUE,
        anonymousParentsProgram.getAttributeValue(isEligible).getValue());
  }

}
