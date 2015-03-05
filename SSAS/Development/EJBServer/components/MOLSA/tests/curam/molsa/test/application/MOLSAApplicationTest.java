package curam.molsa.test.application;

import com.google.inject.Inject;

import curam.application.facade.fact.ApplicationFactory;
import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.GENDER;
import curam.codetable.PHONETYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.OrganizationFactory;
import curam.core.facade.intf.Organization;
import curam.core.facade.struct.ActionIDProperty;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.facade.struct.RegisterPersonState;
import curam.core.facade.struct.UserForPositionDetails;
import curam.core.fact.UsersFactory;
import curam.core.intf.Users;
import curam.core.sl.entity.fact.OrgUnitParentLinkFactory;
import curam.core.sl.entity.intf.OrgUnitParentLink;
import curam.core.sl.entity.struct.OrgUnitParentLinkDtls;
import curam.core.sl.struct.ConcernRoleIDKey;
import curam.core.sl.struct.PositionHolderLinkDetails;
import curam.core.sl.struct.WizardStateID;
import curam.core.struct.PersonSearchDetails;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.core.facade.fact.MOLSAParticipantRegistrationDAFactory;
import curam.molsa.core.facade.fact.MOLSAPersonDAFactory;
import curam.molsa.core.facade.intf.MOLSAParticipantRegistrationDA;
import curam.molsa.core.facade.intf.MOLSAPersonDA;
import curam.molsa.core.facade.struct.MOLSAPersonRegistrationDetails;
import curam.molsa.test.customfunctions.MOLSADatastoreEntityUtilityImpl;
import curam.molsa.test.customfunctions.MOLSAMockDataStore;
import curam.molsa.test.customfunctions.MOLSATestMockDataStore;
import curam.molsa.test.framework.TestHelper;
import curam.participant.impl.ConcernRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.wizardpersistence.impl.WizardPersistentState;
import curam.workspaceservices.util.impl.DatastoreHelper;

public class MOLSAApplicationTest extends MOLSAMockDataStore {
	public static final String KFIRSTNAME = "FirstName";
	public static final String KSURNAME = "SurName";
	public static final String KFULLNAME = KFIRSTNAME + " " + KSURNAME;
	public static final String KPHONENUMBER = "33344444";
	public static final String KQID = "12345678911";
	public static final String KADDRESSDATA = "1\n0\nUS\nQA\n0\n0\nCITY=MM17005\nZIP=\nADD2=MS17003\n"
			+ "ADD1=MZ17083\nADD4=\nADD5=\nUNITNO=\nCOUNTRY=QA\nPOBOXNO=\n";

	public static final Date KDATEOFBIRTH = Date.getCurrentDate().addDays(
			-365 * 17);
	public static final Date KCURRENTDATE = Date.getCurrentDate();
	public static final long KORGSTRUCTID = 45000;
	public static final long KPOSITIONID = 45001;
	public static final long KORGUNITID = 45013;
	public static final long KDEFPRINTERID = 1;
	public static final String KUSERNAME = "molsacaseworker";
	@Inject
	private TestHelper testHelper;

	@Inject
	private ConcernRoleDAO concernRoleDAO;

	public MOLSAApplicationTest(String arg0) {
		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);
	}

	public void testCreateMOLSADatastorePersonEntity() throws Exception {

		TestMOLSAApplicationImpl testMOLSAApplicationImpl = new TestMOLSAApplicationImpl();
		PersonSearchDetails personDetails = null;
		try {
			personDetails = getPersonRegistrationDetails();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		MOLSATestMockDataStore molsaTestMockDataStore = new MOLSATestMockDataStore(
				MOLSADatastoreConst.kDataStoreSchemaName);

		molsaTestMockDataStore
				.initialize(MOLSADatastoreConst.kDataStoreSchemaName);

		final Datastore datastore = new MOLSADatastoreEntityUtilityImpl()
				.openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
		final ConcernRoleIDKey concernRoleKey = new ConcernRoleIDKey();
		final long datastoreID = DatastoreHelper.createRootEntity(datastore);
		final Entity rootDatastoreEntity = molsaTestMockDataStore
				.createMockDataStore(datastore);
		concernRoleKey.concernRoleID = Long
				.valueOf(personDetails.concernRoleID);
		testMOLSAApplicationImpl.testCreateDatastorePersonEntity(datastore,
				rootDatastoreEntity, concernRoleKey);

	}

	public void testCreateAndStoreApplicationPDF() {
		TestMOLSAApplicationImpl testMOLSAApplicationImpl = new TestMOLSAApplicationImpl();
		ApplicationFactory.newInstance();

		try {
			MOLSATestMockDataStore molsaTestMockDataStore = new MOLSATestMockDataStore(
					MOLSADatastoreConst.kDataStoreSchemaName);

			molsaTestMockDataStore
					.initialize(MOLSADatastoreConst.kDataStoreSchemaName);

			final Datastore datastore = new MOLSADatastoreEntityUtilityImpl()
					.openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
			final ConcernRoleIDKey concernRoleKey = new ConcernRoleIDKey();
			final long datastoreID = DatastoreHelper.createRootEntity(datastore);
			final Entity rootDatastoreEntity = molsaTestMockDataStore
					.createMockDataStore(datastore);
			testMOLSAApplicationImpl.testCreateAndStoreApplicationPDF();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}
	}

	public void testGetProgramApplication() {
		TestMOLSAApplicationImpl testMOLSAApplicationImpl = new TestMOLSAApplicationImpl();
		try {
			testMOLSAApplicationImpl.testGetProgramApplication(null);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}
	}

	/**
	 * This method places the setup data (located in a XML file called
	 * testModifyConcernRoleName_setup.xml which is placed in directory called
	 * ConcernRoleEntityTest).
	 * 
	 */
	/**
	 * Returns set of input data sufficient for default flow
	 * 
	 * @return Returns registration details for default registration
	 */
	public PersonSearchDetails getPersonRegistrationDetails()
			throws AppException, InformationalException {
		testHelper.simulateLogin("molsamanager");
		MOLSAParticipantRegistrationDA participantRegistrationObj = MOLSAParticipantRegistrationDAFactory
				.newInstance();

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
		personRegistrationDetails.qid = KQID;
		RegisterPersonState registerPersonState = new RegisterPersonState();
		registerPersonState.registrationDtls = personRegistrationDetails.dtls;

		WizardStateID wizardStateID = new WizardStateID();
		WizardPersistentState wizardPersistentState = new WizardPersistentState();
		wizardStateID.wizardStateID = wizardPersistentState
				.create(registerPersonState);

		ActionIDProperty actionIDProperty = new ActionIDProperty();
		actionIDProperty.actionIDProperty = "Save";
		participantRegistrationObj.setRegisterPersonForPDCDetails(
				personRegistrationDetails, wizardStateID, actionIDProperty);

		MOLSAPersonDA personObj = MOLSAPersonDAFactory.newInstance();
		PersonSearchKey1 personSearchKey1 = new PersonSearchKey1();
		personSearchKey1.personSearchKey.referenceNumber = KPHONENUMBER;
		PersonSearchDetailsResult personSearchDetailsResult = personObj
				.searchPerson(personSearchKey1);
		assertEquals(1,
				personSearchDetailsResult.personSearchResult.dtlsList.size());
		PersonSearchDetails personSearchDetails = personSearchDetailsResult.personSearchResult.dtlsList
				.item(0);

		return personSearchDetails;
	}

}
