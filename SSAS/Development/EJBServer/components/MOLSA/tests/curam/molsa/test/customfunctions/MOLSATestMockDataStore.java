package curam.molsa.test.customfunctions;

import com.google.inject.Inject;

import curam.codetable.impl.RELATIONSHIPTYPECODEEntry;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEGConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.test.framework.CuramServerTest;
import curam.participant.impl.ConcernRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;

public class MOLSATestMockDataStore extends CuramServerTest {
	public MOLSATestMockDataStore(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	/**
	 * Data access object for the concern role entity.
	 */
	@Inject
	private ConcernRoleDAO concernRoleDAO;
	private static String kDatastoreRootEntityName = "Application";
	final Entity dataStoreRootEntity = null;

	/**
	 * this is to initialise the schema name
	 * 
	 * @param schemaName
	 * @return rootEntity
	 * @throws AppException
	 */
	public long initialize(final String schemaName) throws AppException {
		final Entity rootEntity = createMockDataStore(getDatastoreInstance(schemaName));
		return rootEntity.getUniqueID();
	}

	/**
	 * this is to get the datastore instance
	 * 
	 * @param schemaName
	 * @return datastore
	 * @throws AppException
	 */
	private Datastore getDatastoreInstance(final String schemaName)
			throws AppException {

		Datastore datastore = null;
		try {
			datastore = DatastoreFactory.newInstance()
					.openDatastore(schemaName);
		} catch (final NoSuchSchemaException e) {
			throw new AppRuntimeException(e);
		}

		return datastore;
	}

	/**
	 * this is to create and add root entity
	 * 
	 * @param datastore
	 * @return rootEntity
	 * @throws InformationalException
	 * @throws AppException
	 */
	public Entity createMockDataStore(final Datastore datastore) {

		// Create Concern Role
		final Entity rootEntity = datastore.newEntity(datastore
				.getEntityType(kDatastoreRootEntityName));
		rootEntity.setTypedAttribute("submitDate", Date.getCurrentDate());
		datastore.addRootEntity(rootEntity);

		// Add IntakeApplicationType entity
		final EntityType intakeApplicatonType = datastore
				.getEntityType(MOLSADatastoreConst.kIntakeApplicationType);
		final Entity intakeApplicaton = datastore
				.newEntity(intakeApplicatonType);
		intakeApplicaton.setTypedAttribute("dateOfApplication",
				Date.getCurrentDate());
		intakeApplicaton
				.setTypedAttribute("intakeApplicationTypeID", "AT17001");
		rootEntity.addChildEntity(intakeApplicaton);

		// Add IntakeProgram
		// final EntityType intakeProgramType = datastore
		// .getEntityType(MOLSADatastoreConst.kIntakeProgramType);
		// final Entity intakeProgram = datastore.newEntity(intakeProgramType);
		// intakeProgram.setTypedAttribute("programTypeID", "MPT17001");
		// intakeProgram.setTypedAttribute("programTypeReference",
		// "Social Assistance");
		// rootEntity.addChildEntity(intakeProgram);

		// Create Person
		final EntityType personEntityType = datastore
				.getEntityType(IEGConstants.kPersonEntityName);
		final Entity personEntity = datastore.newEntity(personEntityType);

		personEntity.setTypedAttribute("aliasFirstName", "");
		personEntity.setTypedAttribute("aliasLastName", "");
		personEntity.setTypedAttribute("aliasMiddleName", "");
		personEntity.setTypedAttribute("citizenshipStatus", "CC17000");
		personEntity.setTypedAttribute("dateOfBirth", "20001216");
		personEntity.setTypedAttribute("educationLevel", "MEL17005");
		personEntity.setTypedAttribute("email", "");
		personEntity.setTypedAttribute("firstName", "Asma");
		personEntity.setTypedAttribute("gender", "SX2");
		personEntity.setTypedAttribute("hasHomeRental", Boolean.TRUE);
		personEntity.setTypedAttribute("hasIncome", Boolean.TRUE);
		personEntity.setTypedAttribute("isChild", Boolean.FALSE);
		personEntity.setTypedAttribute("isMailingAddressSame", Boolean.TRUE);
		personEntity
				.setTypedAttribute("isMemberEnrolledInSchool", Boolean.TRUE);
		personEntity.setTypedAttribute("isPhysicallyChallenged", Boolean.FALSE);
		personEntity.setTypedAttribute("isPrimaryParticipant", Boolean.FALSE);
		personEntity.setTypedAttribute("isUnfitToWork", Boolean.FALSE);
		personEntity.setTypedAttribute("lastName", "Pai");
		personEntity.setTypedAttribute("maritalStatus", "MS1");
		personEntity.setTypedAttribute("middleInitial", "");
		personEntity.setTypedAttribute("personID", "261");

		personEntity.setTypedAttribute("qidNumber", "12345678901");
		personEntity.setTypedAttribute("requiresMaidAssistance", "261");
		personEntity.setTypedAttribute("residencyStatus", Boolean.FALSE);

		rootEntity.addChildEntity(personEntity);

		final EntityType incomeEntityType = datastore
				.getEntityType(MOLSADatastoreConst.kIncome);
		final Entity income = datastore.newEntity(incomeEntityType);
		income.setTypedAttribute("amount", "10000");
		income.setTypedAttribute("frequency", "FC3");
		income.setTypedAttribute("incomeType", "IT17002");
		income.setTypedAttribute("startDate",
				Date.getCurrentDate().addDays(-100));
		personEntity.addChildEntity(income);

		final EntityType expenseIncomeType = datastore.getEntityType("Expense");
		final Entity expense = datastore.newEntity(expenseIncomeType);
		expense.setTypedAttribute("amount", "10000");
		expense.setTypedAttribute("frequency", "FC3");
		expense.setTypedAttribute("expenseType", "MEX17000");
		expense.setTypedAttribute("startDate",
				Date.getCurrentDate().addDays(-100));
		personEntity.addChildEntity(expense);

		final EntityType personAddressEntityType = datastore
				.getEntityType(MOLSADatastoreConst.kAddress);
		final Entity address = datastore.newEntity(personAddressEntityType);
		address.setTypedAttribute("addressID", "263");
		address.setTypedAttribute("buildingNumber", "123456");
		address.setTypedAttribute("buildingType", "MBT17000");
		address.setTypedAttribute("country", "QA");
		address.setTypedAttribute("electricityNumber", "1234");
		address.setTypedAttribute("municipality", "MM17003");
		address.setTypedAttribute("poBox", "1234567");
		address.setTypedAttribute("postOfficeCode", "12345");
		address.setTypedAttribute("street", "MS17001");
		address.setTypedAttribute("zone", "MZ17078");
		personEntity.addChildEntity(address);

		final EntityType personMailingAddressEntityType = datastore
				.getEntityType(MOLSADatastoreConst.kMailingAddress);
		final Entity mailingAddress = datastore.newEntity(personMailingAddressEntityType);
		mailingAddress.setTypedAttribute("mailingAddressID", "264");
		mailingAddress.setTypedAttribute("mailingBuildingNumber", "123456");
		mailingAddress.setTypedAttribute("mailingBuildingType", "MBT17001");
		mailingAddress.setTypedAttribute("mailingCountry", "QA");
		mailingAddress.setTypedAttribute("mailingElectricityNumber", "1234");
		mailingAddress.setTypedAttribute("mailingMunicipality", "MM17004");
		mailingAddress.setTypedAttribute("mailingPOBox", "1234567");
		mailingAddress.setTypedAttribute("mailingPostOfficeCode", "12335");
		mailingAddress.setTypedAttribute("mailingStreet", "MS17002");
		mailingAddress.setTypedAttribute("mailingZone", "MZ17077");
		personEntity.addChildEntity(mailingAddress);

		final EntityType intakeAppType = datastore
				.getEntityType(MOLSADatastoreConst.kIntakeApplication);

		final Entity intakeApp = datastore.newEntity(intakeAppType);
		intakeApp.setTypedAttribute("dateOfApplication", Date.getCurrentDate());
		intakeApp.setTypedAttribute("interpreterRequired", Boolean.FALSE);
		intakeApp.setTypedAttribute("receivedMethod", "AM19004");
		rootEntity.addChildEntity(intakeApp);

		// Create Person
		final EntityType secondPersonEntityType = datastore
				.getEntityType(IEGConstants.kPersonEntityName);
		final Entity secondPersonEntity = datastore
				.newEntity(secondPersonEntityType);

		secondPersonEntity.setTypedAttribute("aliasFirstName", "");
		secondPersonEntity.setTypedAttribute("aliasLastName", "");
		secondPersonEntity.setTypedAttribute("aliasMiddleName", "");
		secondPersonEntity.setTypedAttribute("citizenshipStatus", "CC17000");
		secondPersonEntity.setTypedAttribute("dateOfBirth", "20001216");
		secondPersonEntity.setTypedAttribute("educationLevel", "MEL17005");
		secondPersonEntity.setTypedAttribute("email", "");
		secondPersonEntity.setTypedAttribute("firstName", "Asma");
		secondPersonEntity.setTypedAttribute("gender", "SX2");
		secondPersonEntity.setTypedAttribute("hasHomeRental", Boolean.TRUE);
		secondPersonEntity.setTypedAttribute("hasIncome", Boolean.TRUE);
		secondPersonEntity.setTypedAttribute("isChild", Boolean.FALSE);
		secondPersonEntity.setTypedAttribute("isMailingAddressSame",
				Boolean.TRUE);
		secondPersonEntity.setTypedAttribute("isMemberEnrolledInSchool",
				Boolean.TRUE);
		secondPersonEntity.setTypedAttribute("isPhysicallyChallenged",
				Boolean.FALSE);
		secondPersonEntity.setTypedAttribute("isPrimaryParticipant",
				Boolean.FALSE);
		secondPersonEntity.setTypedAttribute("isUnfitToWork", Boolean.FALSE);
		secondPersonEntity.setTypedAttribute("lastName", "Pai");
		secondPersonEntity.setTypedAttribute("maritalStatus", "MS1");
		secondPersonEntity.setTypedAttribute("middleInitial", "");
		secondPersonEntity.setTypedAttribute("personID", "261");

		secondPersonEntity.setTypedAttribute("qidNumber", "12345678901");
		secondPersonEntity.setTypedAttribute("requiresMaidAssistance", "261");
		secondPersonEntity.setTypedAttribute("residencyStatus", Boolean.FALSE);

		rootEntity.addChildEntity(secondPersonEntity);

		final EntityType secondPersonIncomeEntityType = datastore
				.getEntityType(MOLSADatastoreConst.kIncome);
		final Entity secondPersonIncome = datastore
				.newEntity(secondPersonIncomeEntityType);
		secondPersonIncome.setTypedAttribute("amount", "10000");
		secondPersonIncome.setTypedAttribute("frequency", "FC3");
		secondPersonIncome.setTypedAttribute("incomeType", "IT17002");
		secondPersonIncome.setTypedAttribute("startDate", Date.getCurrentDate()
				.addDays(-100));
		secondPersonEntity.addChildEntity(secondPersonIncome);

		final EntityType expenseSecondPersonExpenseType = datastore
				.getEntityType("Expense");
		final Entity expenseSecondPerson = datastore
				.newEntity(expenseSecondPersonExpenseType);
		expenseSecondPerson.setTypedAttribute("amount", "10000");
		expenseSecondPerson.setTypedAttribute("frequency", "FC3");
		expenseSecondPerson.setTypedAttribute("expenseType", "MEX17000");
		expenseSecondPerson.setTypedAttribute("startDate", Date
				.getCurrentDate().addDays(-100));
		secondPersonEntity.addChildEntity(expenseSecondPerson);

		final EntityType relationShipType = datastore
				.getEntityType(MOLSADatastoreConst.kRelationshipEntity);
		final Entity relationShip = datastore.newEntity(relationShipType);
		relationShip.setTypedAttribute("personID", "261");
		relationShip.setTypedAttribute("relationshipType",
				RELATIONSHIPTYPECODEEntry.PARENT.getCode());
		relationShip.setTypedAttribute("startDate", Date.getCurrentDate());
		personEntity.addChildEntity(relationShip);

		return rootEntity;
	}

	/**
	 * Check if any there any of the specified datastore entities in the
	 * datastore.
	 * 
	 * @param datastoreID
	 * @param entityName
	 * @return entity
	 * @throws AppException
	 */
	private boolean datastoreEntityExists(final long datastoreID,
			final String entityName, final String schemaName)
			throws AppException {

		final Datastore datastore = getDatastoreInstance(schemaName);
		final Entity entity = datastore.readEntity(datastoreID);

		return entity.getChildEntities(datastore.getEntityType(entityName)).length > 0;

	}

	/**
	 * Delete an entity from the datastore.
	 * 
	 * @param datastoreID
	 *            The entity datastore ID.
	 * 
	 * @throws AppException
	 */
	public void delete(final long datastoreID, final String schemaName)
			throws AppException {

		final Datastore datastore = getDatastoreInstance(schemaName);
		final Entity entity = datastore.readEntity(datastoreID);
		entity.delete();
	}

	/**
	 * Read an entity given its datastore ID.
	 * 
	 * @param datastoreID
	 *            The datastore ID.
	 * 
	 * @return The entity.
	 * 
	 * @throws AppException
	 */
	public Entity read(final long datastoreID, final String schemaName)
			throws AppException {

		final Datastore datastore = getDatastoreInstance(schemaName);
		final Entity entity = datastore.readEntity(datastoreID);

		return entity;
	}

}
