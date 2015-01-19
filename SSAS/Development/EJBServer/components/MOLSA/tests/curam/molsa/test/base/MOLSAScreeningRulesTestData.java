package curam.molsa.test.base;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.codetable.RELATIONSHIPTYPECOREDESC;
import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.codetable.impl.FREQUENCYCODEEntry;
import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.INCOMETYPECODEEntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.codetable.impl.RELATIONSHIPTYPECOREDESCEntry;
import curam.creole.execution.session.RecalculationsProhibited;
import curam.creole.execution.session.Session;
import curam.creole.execution.session.SessionDoc;
import curam.creole.execution.session.Session_Factory;
import curam.creole.execution.session.StronglyTypedRuleObjectFactory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.AbsentFather;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.AbsentFather_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.ApplicationDetails;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.ApplicationDetails_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Expense;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Expense_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.HouseHoldInformation;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.HouseHoldInformation_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Income;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Income_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.OneWayRelationship;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.OneWayRelationship_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Person_Factory;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Relationship;
import curam.creole.ruleclass.MOLSAScreeningRuleSet.impl.Relationship_Factory;
import curam.creole.storage.inmemory.InMemoryDataStorage;
import curam.creole.value.CodeTableItem;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.codetable.impl.ABSENTFATHEREntry;
import curam.molsa.codetable.impl.EXPENSEEntry;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsa.test.framework.CuramServerTest;
import curam.util.type.Date;

/**
 * Base test data class for common rule test classes.
 */
public abstract class MOLSAScreeningRulesTestData extends CuramServerTest {

  protected Session session;

  protected static final String isEligible = "eligible";

  private SessionDoc sessionDoc;

  /**
   * Constructor.
   * 
   * @param name
   */
  public MOLSAScreeningRulesTestData(final String name) {

    super(name);
  }

  @Override
  protected void setUpCuramServerTest() {
    super.setUpCuramServerTest();
    session = Session_Factory.getFactory().newInstance(
        new RecalculationsProhibited(),
        new InMemoryDataStorage(new StronglyTypedRuleObjectFactory()));
    sessionDoc = new SessionDoc(session);
    final ApplicationDetails application = ApplicationDetails_Factory
        .getFactory().newInstance(getSession());
    application.applicationDate().specifyValue(Date.getCurrentDate());
  }

  @Override
  protected void tearDownCuramServerTest() {
    // TODO Auto-generated method stub
    super.tearDownCuramServerTest();
    final File sessionDocOutputDirectory = new File(
        "D:/temp/sessiondoc/ScreeningHelperTest/" + getName());
    sessionDoc.write(sessionDocOutputDirectory);
  }

  /**
   * Create a rule object of type Person.
   * 
   */
  @SuppressWarnings("restriction")
  public Person createPersonRecord(final String fullName,
      final Number personID, final Date dateOfBirth, final Boolean isPrimary,
      final String maritalStatus, final String gender,
      final String citizenshipStatus, final String residencyStatus) {
    final Person personRecord = Person_Factory.getFactory().newInstance(
        this.getSession());

    personRecord.personID().specifyValue(personID);
    personRecord.firstName().specifyValue(fullName);
    personRecord.dateOfBirth().specifyValue(dateOfBirth);
    personRecord.isPrimaryParticipant().specifyValue(isPrimary);
    personRecord.maritalStatus().specifyValue(
        new CodeTableItem(MARITALSTATUS.TABLENAME, maritalStatus));
    personRecord.gender().specifyValue(
        new CodeTableItem(GENDER.TABLENAME, gender));
    personRecord.citizenshipStatus().specifyValue(
        new CodeTableItem(CITIZENSHIPCODE.TABLENAME, citizenshipStatus));
    personRecord.residencyStatus().specifyValue(
        new CodeTableItem(RESIDENCY.TABLENAME, residencyStatus));
    personRecord.isEmployed().specifyValue(Boolean.FALSE);

    return personRecord;

  }

  /**
   * Create a rule object of type Person.
   * 
   */
  @SuppressWarnings("restriction")
  public AbsentFather createAbsentFatherRecord(final String firstName,
      final String lastName, final Number personID, final Date dateOfBirth,
      final String absentPersonReason) {
    final AbsentFather absentFather = AbsentFather_Factory.getFactory()
        .newInstance(this.getSession());
    absentFather.personID().specifyValue(personID);
    absentFather.dateOfBirth().specifyValue(dateOfBirth);
    absentFather.firstName().specifyValue(firstName);
    absentFather.lastName().specifyValue(lastName);
    absentFather.absentPersonReason().specifyValue(
        new CodeTableItem(ABSENTFATHER.TABLENAME, absentPersonReason));
    return absentFather;

  }

  public Session getSession() {
    // TODO Auto-generated method stub
    return session;
  }

  /**
   * Create a rule object of type Relationship.
   * 
   */
  @SuppressWarnings("restriction")
  public Relationship createRelationshipRecord(final Person parentEntity,
      final String relationshipType, final Number relatedPersonID) {

    final Relationship relationshipRecord = Relationship_Factory.getFactory()
        .newInstance(this.getSession());
    relationshipRecord.from().specifyValue(parentEntity);
    relationshipRecord.relationshipType()
        .specifyValue(
            new CodeTableItem(RELATIONSHIPTYPECOREDESC.TABLENAME,
                relationshipType));
    relationshipRecord.personID().specifyValue(relatedPersonID);
    return relationshipRecord;
  }

  @SuppressWarnings("restriction")
  public OneWayRelationship createOneWayRelationshipRecord(
      final Person firstPerson, final String relationshipType,
      final Person relatedPerson) {

    final OneWayRelationship oneWayRelationshipRecord = OneWayRelationship_Factory
        .getFactory().newInstance(
            this.getSession(),
            firstPerson,
            new CodeTableItem(RELATIONSHIPTYPECOREDESC.TABLENAME,
                relationshipType), relatedPerson);
    return oneWayRelationshipRecord;
  }

  private HouseHoldInformation createHousehold() {

    final HouseHoldInformation household = HouseHoldInformation_Factory
        .getFactory().newInstance(getSession());
    return household;
  }

  /**
   * Create a rule object of type Income Item.
   * 
   */
  @SuppressWarnings("restriction")
  public Income createIncomeItemRecord(final Person parentEntity,
      final Number incomeAmount, final String incomeType,
      final String frequency, final Date startDate) {

    final Income incomeItem = Income_Factory.getFactory().newInstance(
        getSession());
    incomeItem.amount().specifyValue(incomeAmount);
    incomeItem.parentEntity().specifyValue(parentEntity);

    incomeItem.startDate().specifyValue(startDate);
    incomeItem.frequency().specifyValue(
        new CodeTableItem(FREQUENCYCODE.TABLENAME, frequency));
    incomeItem.incomeType().specifyValue(
        new CodeTableItem(INCOMETYPECODE.TABLENAME, incomeType));
    return incomeItem;
  }

  @SuppressWarnings("restriction")
  public Expense createExpenseRecord(final Person parentEntity,
      final Number expenseAmount, final String incomeType,
      final String frequency, final Date startDate) {

    final Expense expense = Expense_Factory.getFactory().newInstance(
        getSession());
    expense.amount().specifyValue(expenseAmount);
    expense.parentEntity().specifyValue(parentEntity);
    expense.frequency().specifyValue(
        new CodeTableItem(FREQUENCYCODE.TABLENAME, frequency));
    expense.expenseType().specifyValue(
        new CodeTableItem(EXPENSE.TABLENAME, frequency));
    return expense;

  }

  /**
   * Create a rule object of type Person.
   * 
   */
  @SuppressWarnings("restriction")
  public List<Person> createFamilyOfMissingBaseScenario(
      String absentFatherReason) {
    List<Person> personList = new ArrayList<Person>();
    final Person firdoz = createPersonRecord("Firdoz Mohammad", 101,
        Date.fromISO8601("19800101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    firdoz.hasAbsentFather().specifyValue(Boolean.FALSE);
    firdoz.hasAbsentHusband().specifyValue(Boolean.TRUE);

    final Person asifa = createPersonRecord("Asifa Mohammed", 102,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    asifa.hasAbsentFather().specifyValue(Boolean.FALSE);
    asifa.hasAbsentHusband().specifyValue(Boolean.FALSE);
    
    final Person fathima = createPersonRecord("Fathima Mohammed", 103,
        Date.fromISO8601("19840101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    fathima.hasAbsentFather().specifyValue(Boolean.FALSE);
    fathima.hasAbsentHusband().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Mohammad", "Hameed", 201,
        Date.fromISO8601("19740101"), absentFatherReason);

    personList.add(firdoz);
    personList.add(fathima);
    personList.add(asifa);

    createRelationshipRecord(firdoz,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), asifa.personID()
            .getValue());
    createRelationshipRecord(firdoz,
        RELATIONSHIPTYPECOREDESCEntry.SISTERWIFE.getCode(), fathima.personID()
            .getValue());

    createRelationshipRecord(fathima,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), asifa.personID()
            .getValue());

    createOneWayRelationshipRecord(firdoz,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), asifa);
    createOneWayRelationshipRecord(asifa,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), firdoz);

    createOneWayRelationshipRecord(firdoz,
        RELATIONSHIPTYPECOREDESCEntry.SISTERWIFE.getCode(), fathima);
    createOneWayRelationshipRecord(fathima,
        RELATIONSHIPTYPECOREDESCEntry.SISTERWIFE.getCode(), firdoz);

    createOneWayRelationshipRecord(fathima,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), asifa);
    createOneWayRelationshipRecord(asifa,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), fathima);

    createIncomeItemRecord(firdoz, 2000,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(firdoz, 500, EXPENSEEntry.RESIDENTIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  public List<Person> createFamilyOfPrisoner(String absentFatherReason) {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Grandpa", 101,
        Date.fromISO8601("19620101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.hasAbsentHusband().specifyValue(Boolean.FALSE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeOne.hasAbsentHusband().specifyValue(Boolean.TRUE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.TRUE);
    dependentChildOfWifeOne.hasAbsentHusband().specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.TRUE);
    dependentChild2OfWifeOne.hasAbsentHusband().specifyValue(Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeTwo.hasAbsentHusband().specifyValue(Boolean.TRUE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
    dependentChildOfWifeTwo.hasAbsentHusband().specifyValue(Boolean.FALSE);

    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), absentFatherReason);

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  public List<Person> createFamilyInNeed() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Abdul", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Abeed", "Khan", 201,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.INPRISON.getCode());

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  public List<Person> createFamilyInNeedScenario2() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Almelu", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);

    final Person otherPerson = createPersonRecord("Margaret", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    otherPerson.hasAbsentFather().specifyValue(Boolean.FALSE);

    personList.add(personRecord);
    personList.add(otherPerson);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.OTHER.getCode(), 102);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.OTHER.getCode(), otherPerson);
    createOneWayRelationshipRecord(otherPerson,
        RELATIONSHIPTYPECOREDESCEntry.OTHER.getCode(), personRecord);

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(otherPerson, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  /**
   * Positive Family Of Incapable Scenario
   * 
   * @return
   */
  public List<Person> createFamilyOfIncapable() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Abdul", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isUnfitToWork().specifyValue(Boolean.TRUE);
    personRecord.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeOne.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.TRUE);
    dependentChildOfWifeOne.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeTwo.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.TRUE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  /**
   * Negative
   * 
   * @return
   */

  public List<Person> createFamilyOfIncapableNegative() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Abdul", 101,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isUnfitToWork().specifyValue(Boolean.TRUE);
    personRecord.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeOne.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChildOfWifeOne.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeTwo.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 6500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  /**
   * Create Senior Citizen Scenario
   * 
   * @return
   */
  public List<Person> createFamilySeniorCitizen() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Abdul", 101,
        Date.fromISO8601("19450101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isUnfitToWork().specifyValue(Boolean.TRUE);
    personRecord.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeOne.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChildOfWifeOne.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeTwo.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  public List<Person> createFamilyOfSeniorCitizenNegative() {
    List<Person> personList = new ArrayList<Person>();
    final Person personRecord = createPersonRecord("Abdul", 101,
        Date.fromISO8601("19450101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    personRecord.hasAbsentFather().specifyValue(Boolean.FALSE);
    personRecord.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    personRecord.isUnfitToWork().specifyValue(Boolean.TRUE);
    personRecord.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person wifeOne = createPersonRecord("Wife1", 102,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeOne.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeOne = createPersonRecord("Wife1Child1",
        103, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChildOfWifeOne.requiresMaidAssistance()
        .specifyValue(Boolean.FALSE);

    final Person dependentChild2OfWifeOne = createPersonRecord("Wife1Child2",
        104, Date.fromISO8601("20121010"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChild2OfWifeOne.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    final Person wifeTwo = createPersonRecord("Wife2", 105,
        Date.fromISO8601("19950101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    wifeTwo.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person dependentChildOfWifeTwo = createPersonRecord("Wife2Child1",
        106, Date.fromISO8601("20100101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    dependentChildOfWifeTwo.hasAbsentFather().specifyValue(Boolean.FALSE);
    dependentChild2OfWifeOne.requiresMaidAssistance().specifyValue(
        Boolean.FALSE);

    personList.add(personRecord);
    personList.add(wifeOne);
    personList.add(wifeTwo);
    personList.add(dependentChildOfWifeOne);
    personList.add(dependentChild2OfWifeOne);
    personList.add(dependentChildOfWifeTwo);

    // Husband Relationships
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 102);
    createRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), 105);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeOne);
    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);
    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SPOUSE.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createOneWayRelationshipRecord(personRecord,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), personRecord);

    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 103);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 105);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 104);
    createRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 106);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);
    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.CHILD.getCode(), wifeOne);

    createOneWayRelationshipRecord(wifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeOne);

    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 103);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), 104);
    createRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), 106);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createOneWayRelationshipRecord(wifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.PARENT.getCode(), dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.UNRELATED.getCode(), wifeTwo);

    createRelationshipRecord(dependentChildOfWifeOne, "RT10011", 103);
    createRelationshipRecord(dependentChild2OfWifeOne, "RT3", 104);
    createRelationshipRecord(dependentChildOfWifeTwo, "RT10011", 106);

    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChild2OfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLING.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChildOfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeOne);
    createOneWayRelationshipRecord(dependentChild2OfWifeOne,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChildOfWifeTwo);
    createOneWayRelationshipRecord(dependentChildOfWifeTwo,
        RELATIONSHIPTYPECOREDESCEntry.SIBLINGINLAW.getCode(),
        dependentChild2OfWifeOne);

    createIncomeItemRecord(personRecord, 15500,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeOne, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(wifeTwo, 500,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(personRecord, 100, EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }

  /**
   * Positive Family Of Anonmoyous Scenario
   * 
   * @return
   */
  public List<Person> createFamilyOfAnonymousParents(String absentFatherReason) {
    List<Person> personList = new ArrayList<Person>();
    int husbandID = 101;
    int wifeID = 102;
    int kidWithAbsentFatherID = 103;
    int absentFatherPersonID = 201;

    final Person husband = createPersonRecord("Abdul", husbandID,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    husband.hasAbsentFather().specifyValue(Boolean.FALSE);
    husband.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    husband.isUnfitToWork().specifyValue(Boolean.TRUE);
    husband.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Firdous", "Khan", absentFatherPersonID,
        Date.fromISO8601("19620101"), absentFatherReason);

    final Person wife = createPersonRecord("Wife", wifeID,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wife.hasAbsentFather().specifyValue(Boolean.FALSE);
    wife.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person kidWithAbsentFather = createPersonRecord("Child",
        kidWithAbsentFatherID, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    kidWithAbsentFather.hasAbsentFather().specifyValue(Boolean.TRUE);
    kidWithAbsentFather.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    personList.add(husband);
    personList.add(wife);
    personList.add(kidWithAbsentFather);

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

    return personList;

  }

  /**
   * Positive Family Of Anonmoyous Scenario
   * 
   * @return
   */
  public List<Person> createFamilyOfAnonymousParentsWithVaryingIncome(
      int incomeAmount, int expenseAmount) {
    List<Person> personList = new ArrayList<Person>();
    int husbandID = 101;
    int wifeID = 102;
    int kidWithAbsentFatherID = 103;
    int absentFatherPersonID = 201;

    final Person husband = createPersonRecord("Abdul", husbandID,
        Date.fromISO8601("20000101"), Boolean.TRUE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    husband.hasAbsentFather().specifyValue(Boolean.FALSE);
    husband.isMemberEnrolledInSchool().specifyValue(Boolean.TRUE);
    husband.isUnfitToWork().specifyValue(Boolean.TRUE);
    husband.requiresMaidAssistance().specifyValue(Boolean.TRUE);

    createAbsentFatherRecord("Firdous", "Khan", absentFatherPersonID,
        Date.fromISO8601("19620101"), ABSENTFATHEREntry.ANONYMOUS.getCode());

    final Person wife = createPersonRecord("Wife", wifeID,
        Date.fromISO8601("19820101"), Boolean.FALSE,
        MARITALSTATUSEntry.MARRIED.getCode(), GENDEREntry.FEMALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    wife.hasAbsentFather().specifyValue(Boolean.FALSE);
    wife.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    final Person kidWithAbsentFather = createPersonRecord("Child",
        kidWithAbsentFatherID, Date.fromISO8601("20020101"), Boolean.FALSE,
        MARITALSTATUSEntry.SINGLE.getCode(), GENDEREntry.MALE.getCode(),
        CITIZENSHIPCODEEntry.QATARI.getCode(), RESIDENCYEntry.YES.getCode());
    kidWithAbsentFather.hasAbsentFather().specifyValue(Boolean.TRUE);
    kidWithAbsentFather.requiresMaidAssistance().specifyValue(Boolean.FALSE);

    personList.add(husband);
    personList.add(wife);
    personList.add(kidWithAbsentFather);

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

    createIncomeItemRecord(husband, incomeAmount,
        INCOMETYPECODEEntry.CAPITALGAINS.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createIncomeItemRecord(kidWithAbsentFather, incomeAmount,
        INCOMETYPECODEEntry.INHERITANCE.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-30));

    createExpenseRecord(husband, expenseAmount,
        EXPENSEEntry.COMMERCIAL.getCode(),
        FREQUENCYCODEEntry.MONTHLY.getCode(), Date.getCurrentDate()
            .addDays(-50));

    return personList;

  }
}
