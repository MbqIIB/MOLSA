package curam.molsa.test.core.facade;

import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.GENDER;
import curam.codetable.PHONETYPE;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.ActionIDProperty;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.facade.struct.RegisterPersonState;
import curam.core.sl.struct.WizardStateID;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.PersonSearchDetails;
import curam.molsa.core.facade.fact.MOLSAParticipantRegistrationDAFactory;
import curam.molsa.core.facade.fact.MOLSAPersonDAFactory;
import curam.molsa.core.facade.intf.MOLSAParticipantRegistrationDA;
import curam.molsa.core.facade.intf.MOLSAPersonDA;
import curam.molsa.core.facade.struct.MOLSAPersonRegistrationDetails;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.test.util.MOLSAUnauthenticatedUserHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.wizardpersistence.impl.WizardPersistentState;

/**
 * Junit class to test the Person Registration
 * 
 * 
 */
public class MOLSAPersonDATest extends CuramServerTest {

  public static final String KFIRSTNAME = "FirstName";
  public static final String KSURNAME = "SurName";
  public static final String KFULLNAME = KFIRSTNAME + " " + KSURNAME;
  public static final String KPHONENUMBER = "3333344444";
  public static final String KQID = "12345678911";
  public static final String KADDRESSDATA = "1\n0\nUS\nQA\n0\n0\nCITY=MM17005\nZIP=\nADD2=MS17003\n" 
    + "ADD1=MZ17083\nADD4=\nADD5=\nUNITNO=\nCOUNTRY=QA\nPOBOXNO=\n";
  public static final Date KDATEOFBIRTH = Date.getCurrentDate().addDays(-365 * 35);
  public static final Date KCURRENTDATE = Date.getCurrentDate();
  
  public static final String KFIRSTNAME1 = "FirstName Wife";
  public static final String KSURNAME1 = "SurName Wife";
  public static final String KFULLNAME1 = KFIRSTNAME + " " + KSURNAME;
  public static final String KQID1 = "1234567911";
  public static final Date KDATEOFBIRTH1 = Date.getCurrentDate().addDays(-365 * 33);


  /**
   * Constructor.
   * 
   * @param arg0
   *          String
   */
  public MOLSAPersonDATest(String arg0) {
    super(arg0);
  }

  /**
   * Method to test the Person Registration.
   * This method will also test whether the person search works on the Phone Number as Reference Number
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public void testSearchPerson() throws AppException, InformationalException {

    MOLSAUnauthenticatedUserHelper.insertUnauthenticatedUserDetails();
    MOLSAParticipantRegistrationDA participantRegistrationObj = MOLSAParticipantRegistrationDAFactory.newInstance();

    //** START:- Register First Person
    MOLSAPersonRegistrationDetails personRegistrationDetails = new MOLSAPersonRegistrationDetails();
    personRegistrationDetails.dtls.firstForename = KFIRSTNAME;
    personRegistrationDetails.dtls.surname = KSURNAME;
    personRegistrationDetails.dtls.sex = GENDER.MALE;
    personRegistrationDetails.dtls.dateOfBirth = KDATEOFBIRTH;
    personRegistrationDetails.dtls.phoneType = PHONETYPE.MOBILE;
    personRegistrationDetails.dtls.phoneNumber = KPHONENUMBER;
    personRegistrationDetails.dtls.registrationDate = KCURRENTDATE;
    personRegistrationDetails.dtls.addressType = CONCERNROLEADDRESSTYPE.PRIVATE;
    personRegistrationDetails.dtls.addressData = KADDRESSDATA;
    personRegistrationDetails.qid=KQID;
    RegisterPersonState registerPersonState = new RegisterPersonState();
    registerPersonState.registrationDtls = personRegistrationDetails.dtls;

    WizardStateID wizardStateID = new WizardStateID();
    WizardPersistentState wizardPersistentState = new WizardPersistentState();
    wizardStateID.wizardStateID = wizardPersistentState.create(registerPersonState);

    ActionIDProperty actionIDProperty = new ActionIDProperty();
    actionIDProperty.actionIDProperty = "Save";
    participantRegistrationObj.setRegisterPersonForPDCDetails(personRegistrationDetails, wizardStateID, actionIDProperty);
    //** END :- Register First Person
   
    
    
    MOLSAPersonDA personObj = MOLSAPersonDAFactory.newInstance();
    PersonSearchKey1 personSearchKey1 = new PersonSearchKey1();
    personSearchKey1.personSearchKey.referenceNumber = KPHONENUMBER;
    PersonSearchDetailsResult personSearchDetailsResult = personObj.searchPerson(personSearchKey1);
    assertEquals(1, personSearchDetailsResult.personSearchResult.dtlsList.size());
    PersonSearchDetails personSearchDetails = personSearchDetailsResult.personSearchResult.dtlsList.item(0);
    assertEquals(personSearchDetails.concernRoleName, KFULLNAME);
  }
  
  /**
   * Method to test the Person Registration.
   * This method will also test whether the person search works on the Phone Number as Reference Number
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public void testSearchPersonForMultipleWithSamePhoneNumber() throws AppException, InformationalException {

    MOLSAUnauthenticatedUserHelper.insertUnauthenticatedUserDetails();
    MOLSAParticipantRegistrationDA participantRegistrationObj = MOLSAParticipantRegistrationDAFactory.newInstance();

    //** START:- Register First Person
    MOLSAPersonRegistrationDetails personRegistrationDetails = new MOLSAPersonRegistrationDetails();
    personRegistrationDetails.dtls.firstForename = KFIRSTNAME;
    personRegistrationDetails.dtls.surname = KSURNAME;
    personRegistrationDetails.dtls.sex = GENDER.MALE;
    personRegistrationDetails.dtls.dateOfBirth = KDATEOFBIRTH;
    personRegistrationDetails.dtls.phoneType = PHONETYPE.MOBILE;
    personRegistrationDetails.dtls.phoneNumber = KPHONENUMBER;
    personRegistrationDetails.dtls.registrationDate = KCURRENTDATE;
    personRegistrationDetails.dtls.addressType = CONCERNROLEADDRESSTYPE.PRIVATE;
    personRegistrationDetails.dtls.addressData = KADDRESSDATA;
    personRegistrationDetails.qid=KQID;
    RegisterPersonState registerPersonState = new RegisterPersonState();
    registerPersonState.registrationDtls = personRegistrationDetails.dtls;

    WizardStateID wizardStateID = new WizardStateID();
    WizardPersistentState wizardPersistentState = new WizardPersistentState();
    wizardStateID.wizardStateID = wizardPersistentState.create(registerPersonState);

    ActionIDProperty actionIDProperty = new ActionIDProperty();
    actionIDProperty.actionIDProperty = "Save";
    participantRegistrationObj.setRegisterPersonForPDCDetails(personRegistrationDetails, wizardStateID, actionIDProperty);
    //** END :- Register First Person
    //** START:- Register Second Person
    personRegistrationDetails = new MOLSAPersonRegistrationDetails();
    personRegistrationDetails.dtls.firstForename = KFIRSTNAME1;
    personRegistrationDetails.dtls.surname = KSURNAME1;
    personRegistrationDetails.dtls.sex = GENDER.FEMALE;
    personRegistrationDetails.dtls.dateOfBirth = KDATEOFBIRTH1;
    personRegistrationDetails.dtls.phoneType = PHONETYPE.MOBILE;
    personRegistrationDetails.dtls.phoneNumber = KPHONENUMBER;
    personRegistrationDetails.dtls.registrationDate = KCURRENTDATE;
    personRegistrationDetails.dtls.addressType = CONCERNROLEADDRESSTYPE.PRIVATE;
    personRegistrationDetails.dtls.addressData = KADDRESSDATA;
    personRegistrationDetails.qid=KQID1;
    registerPersonState = new RegisterPersonState();
    registerPersonState.registrationDtls = personRegistrationDetails.dtls;

    wizardStateID = new WizardStateID();
    wizardPersistentState = new WizardPersistentState();
    wizardStateID.wizardStateID = wizardPersistentState.create(registerPersonState);

    actionIDProperty = new ActionIDProperty();
    actionIDProperty.actionIDProperty = "Save";
    participantRegistrationObj.setRegisterPersonForPDCDetails(personRegistrationDetails, wizardStateID, actionIDProperty);
  //** END:- Register Second Person
    
    
    MOLSAPersonDA personObj = MOLSAPersonDAFactory.newInstance();
    PersonSearchKey1 personSearchKey1 = new PersonSearchKey1();
    personSearchKey1.personSearchKey.referenceNumber = KPHONENUMBER;
    PersonSearchDetailsResult personSearchDetailsResult = personObj.searchPerson(personSearchKey1);
    assertEquals(2, personSearchDetailsResult.personSearchResult.dtlsList.size());
  }

}
