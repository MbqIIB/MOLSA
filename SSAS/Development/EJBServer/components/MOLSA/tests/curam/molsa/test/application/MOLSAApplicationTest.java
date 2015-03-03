package curam.molsa.test.application;

import com.google.inject.Inject;

import curam.application.impl.ApplicationImpl;
import curam.core.sl.struct.ConcernRoleIDKey;
import curam.core.struct.AddressFieldDetails;
import curam.core.struct.OtherAddressData;
import curam.core.struct.PersonRegistrationDetails;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.test.customfunctions.MOLSADatastoreEntityUtilityImpl;
import curam.molsa.test.customfunctions.MOLSAMockDataStore;
import curam.molsa.test.customfunctions.MOLSATestDatastore;
import curam.molsa.test.customfunctions.MOLSATestMockDataStore;
import curam.participant.impl.ConcernRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.workspaceservices.util.impl.DatastoreHelper;

public class MOLSAApplicationTest extends MOLSAMockDataStore {

	@Inject
	private ConcernRoleDAO concernRoleDAO;

	public MOLSAApplicationTest(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	public void testCreateAndStoreApplicationPDF() {
		TestMOLSAApplicationImpl testMOLSAApplicationImpl = new TestMOLSAApplicationImpl();

		try {
			MOLSATestMockDataStore molsaTestMockDataStore = new MOLSATestMockDataStore(
					MOLSADatastoreConst.kDataStoreSchemaName);
			molsaTestMockDataStore
					.initialize(MOLSADatastoreConst.kDataStoreSchemaName);

			final Datastore datastore = new MOLSADatastoreEntityUtilityImpl()
					.openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
			final Entity rootDatastoreEntity = molsaTestMockDataStore
			.createMockDataStore(datastore);
			testMOLSAApplicationImpl.setRootEntityID(rootDatastoreEntity.getUniqueID());
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

	public void testCreateMOLSADatastorePersonEntity() throws Exception {
		TestMOLSAApplicationImpl testMOLSAApplicationImpl = new TestMOLSAApplicationImpl();
		try {
			PersonRegistrationDetails personRegistrationDetails = getPersonRegistrationDetails();
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
		concernRoleKey.concernRoleID = Long.valueOf("256");
		testMOLSAApplicationImpl.testCreateDatastorePersonEntity(datastore,
				rootDatastoreEntity, concernRoleKey);

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
	public PersonRegistrationDetails getPersonRegistrationDetails()
			throws AppException, InformationalException {

		java.util.Calendar cal = new java.util.GregorianCalendar(1970,
				java.util.Calendar.FEBRUARY, 1, 0, 0, 0);
		curam.util.type.Date birthday = new curam.util.type.Date(cal);

		PersonRegistrationDetails personRegistrationDetails = new PersonRegistrationDetails();

		personRegistrationDetails.firstForename = "Test";
		personRegistrationDetails.surname = "Person";
		personRegistrationDetails.sex = curam.codetable.GENDER.DEFAULTCODE;
		personRegistrationDetails.dateOfBirth = birthday;
		personRegistrationDetails.registrationDate = curam.util.type.Date
				.getCurrentDate();
		personRegistrationDetails.currentMaritalStatus = curam.codetable.MARITALSTATUS.MARRIED;
		personRegistrationDetails.nationality = curam.codetable.NATIONALITY.DEFAULTCODE;
		personRegistrationDetails.birthCountry = curam.codetable.COUNTRY.US;

		// parseFieldsToData always make US address type - it is irrelevant what
		// is defined here.
		personRegistrationDetails.addressType = curam.codetable.ADDRESSLAYOUTTYPE.US;

		AddressFieldDetails addressFieldDetails = new AddressFieldDetails();
		curam.core.intf.AddressData addressDataObj = curam.core.fact.AddressDataFactory
				.newInstance();

		addressFieldDetails.addressLayoutType = curam.codetable.ADDRESSLAYOUTTYPE.US;

		// BEGIN, CR00272990 , KRK
		addressFieldDetails.addressLine1 = "Apartment";
		addressFieldDetails.addressLine2 = "Street1";
		addressFieldDetails.addressLine3 = "Street2";
		addressFieldDetails.city = "New city";
		addressFieldDetails.stateCode = "UT";
		// BEGIN, CR00380472, MV
		addressFieldDetails.zipCode = "11111";
		// END, CR00380472
		addressFieldDetails.countryCode = curam.codetable.COUNTRY.US;
		// END, CR00272990
		OtherAddressData otherAddressData = null;

		otherAddressData = addressDataObj
				.parseFieldsToData(addressFieldDetails);

		personRegistrationDetails.addressData = otherAddressData.addressData;

		// BEGIN, CR00141773, CW
		personRegistrationDetails.paymentFrequency = "100100100";
		personRegistrationDetails.methodOfPmtCode = curam.codetable.METHODOFDELIVERY.EFT;
		personRegistrationDetails.currencyType = curam.codetable.CURRENCY.DEFAULTCODE;
		// END, CR00141773

		return personRegistrationDetails;
	}

}
