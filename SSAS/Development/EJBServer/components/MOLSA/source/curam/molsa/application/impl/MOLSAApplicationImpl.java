package curam.molsa.application.impl;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathException;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.application.facade.impl.Application;
import curam.application.facade.struct.IEGExecutionApplicationDetails;
import curam.application.impl.ApplicationConfiguration;
import curam.application.impl.ApplicationConst;
import curam.application.impl.ApplicationImpl;
import curam.application.impl.ApplicationStatus;
import curam.application.impl.ApplicationStatusDAO;
import curam.application.impl.IntakeApplicant;
import curam.application.impl.IntakeApplicantDAO;
import curam.application.impl.ProgramApplication;
import curam.application.impl.ProgramApplicationDAO;
import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.impl.ALTERNATENAMETYPEEntry;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.APPLICATIONMETHODEntry;
import curam.codetable.impl.APPLICATIONTYPEEntry;
import curam.codetable.impl.ATTACHMENTSTATUSEntry;
import curam.codetable.impl.DOCUMENTTYPEEntry;
import curam.codetable.impl.IEGYESNOEntry;
import curam.codetable.impl.PHONETYPEEntry;
import curam.codetable.impl.PROGRAMSTATUSEntry;
import curam.codetable.impl.PROGRAMTYPEEntry;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.codetable.impl.TEMPLATEIDCODEEntry;
import curam.core.fact.AttachmentFactory;
import curam.core.fact.MaintainConcernRolePhoneFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.MaintainConcernRolePhone;
import curam.core.sl.infrastructure.cmis.impl.CMSMetadataConst;
import curam.core.sl.infrastructure.cmis.impl.CMSMetadataInterface;
import curam.core.sl.struct.ConcernRoleIDKey;
import curam.core.struct.AddressKey;
import curam.core.struct.AddressMapList;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.core.struct.MaintainConcernRoleAltIDKey;
import curam.core.struct.MaintainPhoneNumberKey;
import curam.core.struct.OtherAddressData;
import curam.core.struct.PersonKey;
import curam.core.struct.PhoneRMDtls;
import curam.core.struct.ReadMultiByConcernRoleIDPhoneResult;
import curam.core.struct.ReadmultiByConcernRoleIDAltIDResult;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.datastore.impl.NoSuchSchemaException;
import curam.datastore.util.impl.DocumentFormatter;
import curam.datastore.util.impl.EntityXMLNVFormatter;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.ieg.facade.fact.IEGRuntimeFactory;
import curam.ieg.facade.intf.IEGRuntime;
import curam.ieg.facade.struct.IEGRootEntityID;
import curam.ieg.facade.struct.IEGSchemaName;
import curam.ieg.facade.struct.IEGScriptExecutionIdentifier;
import curam.ieg.facade.struct.IEGScriptID;
import curam.ieg.impl.IEGConstants;
import curam.impl.IntakeConst;
import curam.intakecase.impl.IntakeScriptConst;
import curam.message.application.GENAPPLICATION;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.util.impl.MOLSADateUtil;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.participant.impl.ConcernRole;
import curam.participant.impl.ConcernRoleDAO;
import curam.participant.prospect.impl.ProspectPersonDAO;
import curam.pdc.facade.fact.PDCPersonFactory;
import curam.pdc.facade.intf.PDCPerson;
import curam.pdc.facade.struct.PDCEvidenceDetails;
import curam.pdc.facade.struct.PDCEvidenceDetailsList;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.impl.Address;
import curam.piwrapper.impl.AddressDAO;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.exception.RecordNotFoundException;
import curam.util.resources.Configuration;
import curam.util.resources.ProgramLocale;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Blob;
import curam.util.type.Date;
import curam.util.type.StringHelper;
import curam.workspaceservices.pdfgeneration.impl.PDFGenerationHelper;
import curam.workspaceservices.util.impl.DatastoreConsts;
import curam.workspaceservices.util.impl.DatastoreHelper;

/**
 * @see Application
 */
@SuppressWarnings("restriction")
public class MOLSAApplicationImpl extends ApplicationImpl {

	/**
	 * The Application Configuration.
	 **/
	@Inject
	private ApplicationConfiguration applicationConfiguration;

	/**
	 * The PDF Generator Provider.
	 **/
	@Inject
	private Provider<PDFGenerationHelper> pdfGeneratorProvider;

	/**
	 * Instance of programApplication Type DAO.
	 */
	@Inject
	private ProgramApplicationDAO programApplicationDAO;

	/**
	 * The Intake Applicant DAO.
	 */
	@Inject
	private IntakeApplicantDAO intakeApplicantDAO;

	/**
	 * The Concern Role DAO.
	 **/
	@Inject
	private ConcernRoleDAO concernRoleDAO;

	/**
	 * The Address DAO.
	 **/
	@Inject
	private AddressDAO addressDAO;

	/**
	 * The data access object for a prospect person.
	 */
	@Inject
	private ProspectPersonDAO prospectPersonDAO;

	/**
	 * The User DAO.
	 **/
	@Inject
	private UserDAO userDAO;

	/**
	 * The ApplicationStatus DAO.
	 */
	@Inject
	private ApplicationStatusDAO applicationStatusDAO;

	/**
	 * CMIS meta data provider.
	 */
	@Inject
	private Provider<CMSMetadataInterface> cmsMetadataProvider;

	/**
	 * Default Constructor.
	 */
	protected MOLSAApplicationImpl() {
	}

	/**
	 * Creates and populates the person entity on the data store for a prospect
	 * or registered person on the Intake.
	 * 
	 * @param dataStore
	 *            The data store instance.
	 * 
	 * @param rootEntity
	 *            The data store root entity.
	 * 
	 * @param concernRoleKey
	 *            The concern role id.
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings({ "static-access", "unused" })
	protected final void createMOLSADatastorePersonEntity(
			final Datastore dataStore, final Entity rootEntity,
			final ConcernRoleIDKey concernRoleKey) throws AppException,
			InformationalException {
		
		final EntityType personEntityType = dataStore
				.getEntityType(IEGConstants.kPersonEntityName);
		final EntityType intakeApplicatonType = dataStore
				.getEntityType(MOLSADatastoreConst.kIntakeApplication);
		final EntityType personAddressEntityType = dataStore
				.getEntityType(MOLSADatastoreConst.kAddress);
		final EntityType personMailAddressEntityType = dataStore
				.getEntityType(MOLSADatastoreConst.kMailingAddress);
		// Entity person mail AddressEntity
		final Entity personMailingAddressEntity = dataStore
				.newEntity(personMailAddressEntityType);
		// Create the person entity
		final Entity personEntity = dataStore.newEntity(personEntityType);
		// Create Intake Application
		final Entity intakeApplicaton = dataStore
				.newEntity(intakeApplicatonType);

		// Entity personAddressEntity
		final Entity personAddressEntity = dataStore
				.newEntity(personAddressEntityType);
		//Update application start of month
		rootEntity.setTypedAttribute(MOLSADatastoreConst.kApplicationMonthStartDate, MOLSADateUtil.shiftToStartOfMonth(Date.getCurrentDate()));
		AddressMapList addressMapList;
		AddressMapList mailingAddressMapList;
		long primaryAlternateNameID = 0;

		final ConcernRole concernRole = concernRoleDAO
				.get(concernRoleKey.concernRoleID);

		final PDCPerson pdcPerson = PDCPersonFactory.newInstance();
		final PersonKey pdcPersonKey = new PersonKey();

		pdcPersonKey.concernRoleID = concernRole.getID();
		final PDCEvidenceDetailsList pdcEvidenceList = pdcPerson
				.listEvidenceForParticipant(pdcPersonKey);

		final AddressKey addressKey = new AddressKey();

		addressKey.addressID = concernRole.getPrimaryAddressID();
		final Address address = addressDAO.get(addressKey.addressID);
		final OtherAddressData addressDataString = new OtherAddressData();
		final OtherAddressData mailAddressDataString = new OtherAddressData();

		List<Address> addressList = new ArrayList<Address>();
		addressList = addressDAO.listActiveAddressesByConcernRole(concernRole);

		addressDataString.addressData = address.getAddressData();

		final curam.core.intf.AddressData addressDataObj = curam.core.fact.AddressDataFactory
				.newInstance();

		String emailAddress = CuramConst.gkEmpty;
		long primaryPhoneNumberID = 0;
		String preferredLanguage = CuramConst.gkEmpty;
		String preferredCommunicationMethod = CuramConst.gkEmpty;

		// convert address data string into <name><value> pairs vector
		addressMapList = addressDataObj.parseDataToMap(addressDataString);
		for (int j = 0; j < addressMapList.dtls.size(); j++) {

			if (!(addressMapList.dtls.item(j).value.length() == 0)) {

				if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.CITY)) {
					String municipality = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kMunicipality, municipality);
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE1)) {
					String zone = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kZone, zone);
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE2)) {
					String street = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kStreet, street);
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.UNIT_NUMBER)) {
					String buildingNumber = addressMapList.dtls.item(j).value;
					personAddressEntity
							.setTypedAttribute(
									MOLSADatastoreConst.kBuildingNumber,
									buildingNumber);
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE4)) {
					String buildingType = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kBuildingType, buildingType);

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.ZIP)) {
					String postCode = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kPostCode, postCode);

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE5)) {
					String electricityNumber = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kElectricityNumber,
							electricityNumber);

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.POBOXNO)) {
					String poBox = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kpoBox, poBox);

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.COUNTRY)) {
					String country = addressMapList.dtls.item(j).value;
					personAddressEntity.setTypedAttribute(
							MOLSADatastoreConst.kCountry, country);
				}
			}
		}

		// convert address data string into <name><value> pairs vector
		if (null != addressList && addressList.size() > 1) {
			for (Address mailAddress : addressList) {

				if (mailAddress.getAddressType(concernRole).toString()
						.equals(CONCERNROLEADDRESSTYPE.MAILING)) {
					mailAddressDataString.addressData = mailAddress
							.getAddressData();

					String privateAddress = formatExistingAddressForComparsion(addressDataString.addressData);
					String mailingAddress = formatExistingAddressForComparsion(mailAddressDataString.addressData);
					if (!privateAddress.equals(mailingAddress)) {

						final curam.core.intf.AddressData mailAddressDataObj = curam.core.fact.AddressDataFactory
								.newInstance();
						mailingAddressMapList = mailAddressDataObj
								.parseDataToMap(mailAddressDataString);
						for (int j = 0; j < mailingAddressMapList.dtls.size(); j++) {
							if (!(mailingAddressMapList.dtls.item(j).value
									.length() == 0)) {

								if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.CITY)) {
									String municipality = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingMunicipality,
													municipality);
								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE1)) {
									String zone = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingZone,
													zone);

								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE2)) {
									String street = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingStreet,
													street);
								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.UNIT_NUMBER)) {
									String buildingNumber = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingBuildingNumber,
													buildingNumber);
								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE4)) {
									String buildingType = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingBuildingType,
													buildingType);

								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.ZIP)) {
									String postCode = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingPostCode,
													postCode);

								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE5)) {
									String electricityNumber = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingElectricityNumber,
													electricityNumber);

								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.POBOXNO)) {
									String poBox = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingPOBox,
													poBox);

								} else if (mailingAddressMapList.dtls.item(j).name
										.equals(curam.codetable.ADDRESSELEMENTTYPE.COUNTRY)) {
									String country = mailingAddressMapList.dtls
											.item(j).value;
									personMailingAddressEntity
											.setTypedAttribute(
													MOLSADatastoreConst.kMailingCountry,
													country);

								}
							}
						}
					}
				}
			}

		}
		try {
			// Try reading record from Participant Data case.
			/*
			 * Build up a picture of the participant from the evidence on the
			 * Participant Data Case.
			 */
			for (final PDCEvidenceDetails pdcEvidenceDetails : pdcEvidenceList.list) {

				final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = MOLSAParticipantHelper
						.getDynamicEvidenceDataDetails(pdcEvidenceDetails);

				if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCNamesEvidence)) {

					final String nameType = dynamicEvidenceDataDetails
							.getAttribute(MOLSADatastoreConst.kPDCNamesNameType)
							.getValue();
					if (nameType.equals(ALTERNATENAMETYPEEntry.REGISTERED
							.getCode())) {
						final String firstName = dynamicEvidenceDataDetails
								.getAttribute(
										MOLSADatastoreConst.kPDCNamesFirstName)
								.getValue();
						final String middleInitial = dynamicEvidenceDataDetails
								.getAttribute(
										MOLSADatastoreConst.kPDCNamesMiddleName)
								.getValue();
						final String lastName = dynamicEvidenceDataDetails
								.getAttribute(
										MOLSADatastoreConst.kPDCNamesLastName)
								.getValue();
						personEntity.setTypedAttribute(
								MOLSADatastoreConst.kFirstName, firstName);
						personEntity.setTypedAttribute(
								MOLSADatastoreConst.kMiddleInitial,
								middleInitial);
						personEntity.setTypedAttribute(
								MOLSADatastoreConst.kLastName, lastName);
					}

				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCBirthAndDeathEvidence)) {
					// check date of birth matches
					final String dateOfBirth = dynamicEvidenceDataDetails
							.getAttribute(
									MOLSADatastoreConst.kPDCBirthAndDeathDateOfBirth)
							.getValue();
					// Set the data store attributes by Prospect Person.
					personEntity.setTypedAttribute(
							MOLSADatastoreConst.kDateOfBirth,
							Date.fromISO8601(dateOfBirth));
				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCIdentificationEvidence)) {
					// check ssn matches
					final String altIDType = dynamicEvidenceDataDetails
							.getAttribute(
									MOLSADatastoreConst.kPDCIdentificationsAlternateIDType)
							.getValue();

					final String mappingAlternateIDType = Configuration
							.getProperty(EnvVars.ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE);

					if (altIDType.equals(mappingAlternateIDType)) {
						final String alternateID = dynamicEvidenceDataDetails
								.getAttribute(
										MOLSADatastoreConst.kPDCIdentificationsAlternateID)
								.getValue();
						personEntity.setTypedAttribute(
								MOLSADatastoreConst.qidNumber, alternateID);
						primaryAlternateNameID = Long.valueOf(alternateID);
					}

				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCGenderEvidence)) {
					// check gender matches

					final String gender = dynamicEvidenceDataDetails
							.getAttribute(MOLSADatastoreConst.kPDCGenderGender)
							.getValue();
					personEntity.setTypedAttribute(MOLSADatastoreConst.kGender,
							gender);
				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCEmailAddress)) {
					emailAddress = dynamicEvidenceDataDetails.getAttribute(
							MOLSADatastoreConst.kEmailAddress).getValue();
					personEntity.setTypedAttribute(
							MOLSADatastoreConst.kEmailAddress, emailAddress);
				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCContactPreferences)) {
					preferredLanguage = dynamicEvidenceDataDetails
							.getAttribute(
									MOLSADatastoreConst.kPreferredLanguage)
							.getValue();
					preferredCommunicationMethod = dynamicEvidenceDataDetails
							.getAttribute(
									MOLSADatastoreConst.kPreferredCommunication)
							.getValue();
				} else if (pdcEvidenceDetails.evidenceType
						.equals(MOLSADatastoreConst.kPDCPhoneNumber)) {
					primaryPhoneNumberID = Long
							.valueOf(dynamicEvidenceDataDetails.getAttribute(
									MOLSADatastoreConst.kPhoneNumber)
									.getValue());
				}

			}
			MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
			AlternateIDRMDtls alternateIDRMDtls = molsaParticipantHelper
					.returnPreferredConcernRoleAlternateID(pdcPersonKey.concernRoleID);

		} catch (final RecordNotFoundException e) {
			Trace.kTopLevelLogger.error("Record not found");
		}
		// Read the first name from AlternateName
		intakeApplicaton.setTypedAttribute(
				MOLSADatastoreConst.kDateOfApplication, Date.getCurrentDate());
		personEntity.setTypedAttribute(IntakeScriptConst.kIsPrimaryParticipant,
				IntakeConst.kTrue);
		personEntity.setTypedAttribute(ApplicationConst.kEmail, emailAddress);
		/**
		 * Populate Contact Details
		 */
		Entity contactDetails = populateContactDetails(dataStore, personEntity,
				concernRoleKey, primaryPhoneNumberID);
		Entity contactPreferences = null;

		populateDatastoreWithAlternateID(personEntity, concernRoleKey);

		if (!StringHelper.isEmpty(preferredLanguage)) {
			personEntity.setTypedAttribute(ApplicationConst.kPreferredLanguage,
					preferredLanguage);
			contactPreferences = dataStore
					.newEntity(MOLSADatastoreConst.kContactPreferences);
			contactPreferences.setAttribute(
					ApplicationConst.kPreferredLanguage, preferredLanguage);
		}

		if (!StringHelper.isEmpty(preferredCommunicationMethod)) {
			if (null == contactPreferences) {
				contactPreferences = dataStore
						.newEntity(MOLSADatastoreConst.kContactPreferences);
			}
			contactPreferences.setAttribute(
					MOLSADatastoreConst.kPreferredCommunication,
					preferredCommunicationMethod);
		}

		rootEntity.addChildEntity(personEntity);
		personEntity.addChildEntity(personAddressEntity);

		if (!StringHelper.isEmpty(personMailingAddressEntity
				.getAttribute(MOLSADatastoreConst.kMailingMunicipality))) {
			personEntity.addChildEntity(personMailingAddressEntity);
			personEntity
					.setTypedAttribute(
							MOLSADatastoreConst.kIsMailingAddressSame,
							IEGYESNOEntry.NO);
		} else {
			personEntity.setTypedAttribute(
					MOLSADatastoreConst.kIsMailingAddressSame,
					IEGYESNOEntry.YES);
		}
		if (null != contactDetails) {
			personEntity.addChildEntity(contactDetails);
		}

		if (null != contactPreferences) {
			personEntity.addChildEntity(contactPreferences);
		}
		personEntity.update();
		rootEntity.addChildEntity(intakeApplicaton);
		rootEntity.update();
	}

	/**
	 * 
	 * @param personEntity
	 * @param concernRoleKey
	 * @throws AppException
	 * @throws InformationalException
	 */
	@SuppressWarnings("unused")
	private void populateDatastoreWithAlternateID(Entity personEntity,
			final ConcernRoleIDKey concernRoleKey) throws AppException,
			InformationalException {

		final String alternateIDType = Configuration
				.getProperty(EnvVars.ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE);

		final curam.core.intf.MaintainConcernRoleAltID maintainConcernRoleAltIDObj = curam.core.fact.MaintainConcernRoleAltIDFactory
				.newInstance();

		final MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();

		maintainConcernRoleAltIDKey.concernRoleID = concernRoleKey.concernRoleID;

		final ReadmultiByConcernRoleIDAltIDResult result = maintainConcernRoleAltIDObj
				.readmultiByConcernRoleID(maintainConcernRoleAltIDKey);

		String alternateID = CuramConst.gkEmpty;

		for (final AlternateIDRMDtls details : result.details.dtls) {

			if (details.typeCode.equals(alternateIDType)
					&& details.statusCode
							.equals(curam.codetable.RECORDSTATUS.NORMAL)
					&& (details.endDate.isZero() || !details.endDate
							.before(Date.getCurrentDate()))
					&& !details.startDate.after(Date.getCurrentDate())) {

				alternateID = details.alternateID;

				break;
			}
		}

	}

	/**
	 * Populates the datastore with the persons phone numbers. The population of
	 * the person's phone number is done based on the following:
	 * 
	 * <ul>
	 * <li>The primary contact number is populated as a precedence.</li>
	 * <li>For all other phone number types, the one with latest start date
	 * (ignoring end dates) is used. If there are phone numbers of the same type
	 * and start date, whatever one the system supplies first is used.</li>
	 * </ul>
	 * 
	 * @param personEntity
	 *            The person {@link Entity} to add the phone numbers to.
	 * @param concernRoleKey
	 *            The concern role for whom the phone numbers belong to.
	 * @param primaryPhoneNumberID
	 *            The unique identifier for the person's primary phone number.
	 * 
	 */
	private Entity populateContactDetails(final Datastore datastore,
			final Entity personEntity, final ConcernRoleIDKey concernRoleKey,
			final long primaryPhoneNumberID) throws AppException,
			InformationalException {

		Entity contactDetails = null;

		final MaintainConcernRolePhone maintainConcernRolePhoneObj = MaintainConcernRolePhoneFactory
				.newInstance();

		final MaintainPhoneNumberKey maintainPhoneNumberKey = new MaintainPhoneNumberKey();
		maintainPhoneNumberKey.concernRoleID = concernRoleKey.concernRoleID;

		final ReadMultiByConcernRoleIDPhoneResult result = maintainConcernRolePhoneObj
				.readmultiByConcernRole(maintainPhoneNumberKey);
		for (final PhoneRMDtls phoneRMDtls : result.details.dtls) {
			contactDetails = populateDataStorePhoneNumber(datastore,
					phoneRMDtls.typeCode, phoneRMDtls.phoneAreaCode,
					phoneRMDtls.phoneNumber);
		}
		return contactDetails;
	}

	/**
	 * Populates the Contact Details with the persons phone numbers.
	 * 
	 * @param datastore
	 * @param typeCode
	 * @param phoneAreaCode
	 * @param phoneNumber
	 * @return
	 */
	@SuppressWarnings("unused")
	private Entity populateDataStorePhoneNumber(final Datastore datastore,
			final String typeCode, final String phoneAreaCode,
			final String phoneNumber) {

		// Defaulting to a no mapped value.
		PHONETYPEEntry entry = PHONETYPEEntry.NOT_SPECIFIED;

		Entity contactDetails = datastore.newEntity("ContactDetails");
		if (typeCode.equals(PHONETYPEEntry.PERSONAL.getCode())) {
			contactDetails.setTypedAttribute(
					MOLSADatastoreConst.kHomePhoneNumber, phoneNumber);
			entry = PHONETYPEEntry.PERSONAL;

		} else if (typeCode.equals(PHONETYPEEntry.BUSINESS.getCode())) {
			contactDetails.setTypedAttribute(
					MOLSADatastoreConst.kWorkPhoneNumber, phoneNumber);
			entry = PHONETYPEEntry.BUSINESS;

		} else if (typeCode.equals(PHONETYPEEntry.MOBILE.getCode())) {
			contactDetails.setTypedAttribute(MOLSADatastoreConst.kMobileNumber,
					phoneNumber);
			entry = PHONETYPEEntry.MOBILE;

		} else if (typeCode.equals(PHONETYPEEntry.OTHER.getCode())) {
			contactDetails.setTypedAttribute(
					MOLSADatastoreConst.kOtherPhoneNumber, phoneNumber);
			entry = PHONETYPEEntry.OTHER;
		}
		return contactDetails;
	}

	/**
	 * {@inheritDoc}
	 */
	public void createAndStoreApplicationPDF() throws AppException,
			InformationalException {

		final String locale = ProgramLocale.getDefaultServerLocale();
		final String xmlString = getReportXMLFromDatastore();

		final TEMPLATEIDCODEEntry templateID = applicationConfiguration.getPDFTemplateID(getApplicationType());
		//final TEMPLATEIDCODEEntry templateID = 45007
		

		final ByteArrayOutputStream outputStream = pdfGeneratorProvider.get()
				.generatePDF(xmlString, templateID);

		final int versionNo = getVersionNo();

		// set some CMS meta data
		CMSMetadataInterface cmsMetadata = cmsMetadataProvider.get();

		cmsMetadata.add(ApplicationConst.kApplicationReference, getReference());
		cmsMetadata.add(CMSMetadataConst.kCaseID,
				Long.toString(getCase().getID()));

		setPdfID(createReportAttachment(outputStream, locale));

		modify(versionNo);

	}

	/**
	 * Creates an attachment for the PDF report generated from the Application.
	 * 
	 * @param outputStream
	 *            The generated report data
	 * @param locale
	 *            The locale to use for the report file name
	 * @return attachmentKey
	 * @throws AppException
	 *             InformationalException
	 */
	private long createReportAttachment(
			final ByteArrayOutputStream outputStream, final String locale)
			throws AppException, InformationalException {

		final curam.core.intf.UniqueID uniqueIDObj = UniqueIDFactory
				.newInstance();
		final curam.core.intf.Attachment attachmentObj = AttachmentFactory
				.newInstance();
		final AttachmentDtls attachmentDtls = new AttachmentDtls();
		final AttachmentKey attachmentKey = new AttachmentKey();
		final LocalisableString pdfName = new LocalisableString(
				GENAPPLICATION.APPLICATION_PDF_NAME);

		attachmentKey.attachmentID = uniqueIDObj.getNextID();

		attachmentDtls.attachmentID = attachmentKey.attachmentID;
		attachmentDtls.attachmentStatus = ATTACHMENTSTATUSEntry.ACTIVE
				.getCode();
		attachmentDtls.attachmentName = String.valueOf(Date.getCurrentDate())
				.concat(pdfName.getMessage());
		attachmentDtls.statusCode = RECORDSTATUSEntry.NORMAL.getCode();
		attachmentDtls.attachmentContents = new Blob(outputStream.toByteArray());
		attachmentDtls.documentType = DOCUMENTTYPEEntry.NOT_SPECIFIED.getCode();
		attachmentDtls.receiptDate = Date.getCurrentDate();

		attachmentObj.insert(attachmentDtls);

		return attachmentKey.attachmentID;
	}

	/**
	 * Reads the report data from the data store and converts it to XML. The
	 * data is returned based on the given locale. An exception is thrown if the
	 * schema cannot be read.
	 * 
	 * @return The report data in XML form.
	 */
	@SuppressWarnings("unused")
	private String getReportXMLFromDatastore() throws AppException {

		final DatastoreFactory datastoreFactory = DatastoreFactory
				.newInstance();
		Datastore datastore = null;

		try {
			datastore = datastoreFactory
					.openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
		} catch (final NoSuchSchemaException e) {
			Trace.kTopLevelLogger.error("No Such Schema");
		}

		final Entity root = datastore.readEntity(getRootEntityID());
		final DocumentFormatter docFormatter = new DocumentFormatter(false,
				true);
		final Locale locale = new Locale(TransactionInfo.getProgramLocale());

		final EntityXMLNVFormatter formatter = new EntityXMLNVFormatter(
				new Locale(ProgramLocale.getDefaultServerLocale()), 
				TransactionInfo.getServerTimeZone());
		final Document doc = formatter.getDocument(root);
		deleteDummyAttributes(doc);
		addOtherAttributes(doc);
		final String xmlString = docFormatter.serializeDoc(doc);
		return xmlString;

	}

	/*
	 * TODO This has been added temporarily to remove the unwanted fields from
	 * the generated PDF. Deleting the attributes added to the schema to fix the
	 * OOTB errors. This must be deleted after the OOTB fix.
	 */
	public void deleteDummyAttributes(Document doc){
		
	  deletePersonAttributes(doc);
	  deleteApplicationAttributes(doc);
	  deleteMailingAddressAttributes(doc);
	  deleteIntakeApplicationTypeAttributes(doc);
	  deleteIntakeApplicationAttributes(doc);
	  deleteIntakeProgramAttributes(doc);
	  deleteRelationshipAttributes(doc);
		
	}

  public void addOtherAttributes(Document doc) {
    addNewAttributes(doc);

  }
  
  private void deleteRelationshipAttributes(Document doc) {
	    String[] attributeNames = new String[] { "startDate"};

	    XPathFactory xpathFactory = XPathFactory.newInstance();
	    XPath xpath = xpathFactory.newXPath();

	    try {
	      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"Relationship\"]/attributes/attribute");

	      // get the person entity from the document
	      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);

	      for (int i = 0; i < attributeNodes.getLength(); i++) {

	        Element attributeElement = (Element) attributeNodes.item(i);
	        for (String attribute : attributeNames) {

	          if (attributeElement.getAttribute("name").equalsIgnoreCase(attribute)) {
	            // remove the attribute
	            attributeElement.getParentNode().removeChild(attributeElement);
	            break;
	          }
	        }
	      }

	    } catch (XPathExpressionException e) {
	      // Ignore the exception should not break the existing flow.
	    }
	  }

  private void deletePersonAttributes(Document doc) {
    String[] attributeNames = new String[] { "ssn", "hispanicOrLatino", 
        "blackOrAfricanAmerican", "nativeAlaskanOrAmericanIndian", 
        "asian", "nativeHawaiianOrPacificIslander",
        "whiteOrCaucasian", "isPrimaryParticipant", "middleInitial",
        "aliasFirstName", "aliasMiddleName", "aliasLastName",
        "middleInitial","dateOfBirth","maritalStatusCaptured",
        "maritalStatus","citizenshipStatus","residencyStatus","isMemberEnrolledInSchool",
        "hasAnonymousParents","requiresMaidAssistance","isPhysicallyChallenged",
        "isUnfitToWork","householdMemberStartDate","isMailingAddressSame",
        "isResidingWithPrimaryParticipant","isChild","calculatedAge",
        "isSeniorCitizen","hasIncome","hasHomeRental","applicationDate",
        "applicationMethod","email" };

    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();

    try {
      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"Person\"]/attributes/attribute");

      // get the person entity from the document
      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);

      for (int i = 0; i < attributeNodes.getLength(); i++) {

        Element attributeElement = (Element) attributeNodes.item(i);
        for (String attribute : attributeNames) {

          if (attributeElement.getAttribute("name").equalsIgnoreCase(attribute)) {
            // remove the attribute
            attributeElement.getParentNode().removeChild(attributeElement);
            break;
          }
        }
      }

    } catch (XPathExpressionException e) {
      // Ignore the exception should not break the existing flow.
    }
  }

  
  private void deleteApplicationAttributes(Document doc) {
	  XPathFactory xpathFactory = XPathFactory.newInstance();
	    XPath xpath = xpathFactory.newXPath();
	    try {
	      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"Application\"]/attributes/attribute");
	      // get the Application entity from the document
	      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);
	      for (int i = 0; i < attributeNodes.getLength(); i++) {
	        Element attributeElement = (Element) attributeNodes.item(i);
	        attributeElement.getParentNode().removeChild(attributeElement);
	      }
	    } catch (XPathExpressionException e) {
	      // Ignore the exception should not break the existing flow.
	    }
	  }

	  
  
  private void deleteMailingAddressAttributes(Document doc) {
    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();
    try {
      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"MailingAddress\"]/attributes/attribute");
      // get the person entity from the document
      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);
      for (int i = 0; i < attributeNodes.getLength(); i++) {
        Element attributeElement = (Element) attributeNodes.item(i);
        attributeElement.getParentNode().removeChild(attributeElement);
      }
    } catch (XPathExpressionException e) {
      // Ignore the exception should not break the existing flow.
    }
  }

  private void deleteIntakeApplicationTypeAttributes(Document doc) {
    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();
    try {
      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"IntakeApplicationType\"]/attributes/attribute");
      // get the person entity from the document
      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);
      for (int i = 0; i < attributeNodes.getLength(); i++) {
        Element attributeElement = (Element) attributeNodes.item(i);
        attributeElement.getParentNode().removeChild(attributeElement);
      }
    } catch (XPathExpressionException e) {
      // Ignore the exception should not break the existing flow.
    }
  }

  private void deleteIntakeApplicationAttributes(Document doc) {
    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();
    try {
      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"IntakeApplication\"]/attributes/attribute");
      // get the person entity from the document
      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);
      for (int i = 0; i < attributeNodes.getLength(); i++) {
        Element attributeElement = (Element) attributeNodes.item(i);
        attributeElement.getParentNode().removeChild(attributeElement);
      }
    } catch (XPathExpressionException e) {
      // Ignore the exception should not break the existing flow.
    }
  }

  private void deleteIntakeProgramAttributes(Document doc) {
    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();
    try {
      XPathExpression xpathExpression = xpath.compile("//entity[@name=\"IntakeProgram\"]/attributes/attribute");
      // get the person entity from the document
      NodeList attributeNodes = (NodeList) xpathExpression.evaluate(doc, XPathConstants.NODESET);
      for (int i = 0; i < attributeNodes.getLength(); i++) {
        Element attributeElement = (Element) attributeNodes.item(i);
        attributeElement.getParentNode().removeChild(attributeElement);
      }
    } catch (XPathExpressionException e) {
      // Ignore the exception should not break the existing flow.
    }
  }

  private void addNewAttributes(Document doc) {

	  /*
   
    XPathFactory xpathFactory = XPathFactory.newInstance();
    XPath xpath = xpathFactory.newXPath();

    Node entities = doc.getElementsByTagName("entities").item(0);
    Element entity = doc.createElement("entity");
    entity.setAttribute("description", "Other Details");
    entity.setAttribute("hidden", "false");
    entity.setAttribute("key", "otherID");
    entity.setAttribute("name", "otherDetails");
    entities.appendChild(entity);
    Element attributes = doc.createElement("attributes");
    entity.appendChild(attributes);
    Element attribute = doc.createElement("attribute");
    attribute.setAttribute("description", "Number of Children");
    attribute.setAttribute("hidden", "false");
    attribute.setAttribute("value", "0");
    attribute.setAttribute("name", "noOfChildren");
    attributes.appendChild(attribute);
    */
    
  }
	 
	 
	 
	
	
	/**
	 * Creates an IntakeProgram record in the data store for each program passed
	 * in. The programs should be passed in as a comma separated string.
	 * 
	 * @param data
	 *            store The schema name that relates to the data store record.
	 * 
	 * @param programs
	 *            A comma separated string of programs.
	 * 
	 * @param datastoreID
	 *            The id of the root data store entity.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	private void addIntakePrograms(final List<PROGRAMTYPEEntry> programs,
			final long datastoreID, final Datastore datastore)
			throws InformationalException {

		final Entity rootEntity = datastore.readEntity(datastoreID);
		final EntityType intakeProgramEntityType = datastore
				.getEntityType(DatastoreConsts.INTAKE_PROGRAM_ENTITY_NAME);

		/*
		 * Only insert the programs if the entity exists and program types have
		 * been selected
		 */
		if (intakeProgramEntityType != null && !programs.isEmpty()) {
			// Remove any previous intake programs
			for (final Entity intakeProgram : rootEntity
					.getChildEntities(intakeProgramEntityType)) {
				intakeProgram.delete();
			}

			for (PROGRAMTYPEEntry programTypeEntry : programs) {

				final Entity intakeProgramEntity = datastore
						.newEntity(intakeProgramEntityType);

				if (programTypeEntry != null) {
					intakeProgramEntity.setAttribute(
							DatastoreConsts.PROGRAM_TYPE_ID_ATTRIBUTE_NAME,
							programTypeEntry.getCode());
				}

				intakeProgramEntity.setAttribute(
						DatastoreConsts.PROGRAM_TYPE_REFERENCE_ATTRIBUTE_NAME,
						programTypeEntry.toUserLocaleString());
				rootEntity.addChildEntity(intakeProgramEntity);
			}
		}
	}

	/**
	 * Adds the requested application type details to the data store entity.
	 * 
	 * @param applicationType
	 *            The type of application requested.
	 * 
	 * @param datastoreID
	 *            The id of the root data store entity.
	 * 
	 * @param datastore
	 *            The DataStore which the application will be added to.
	 * 
	 */
	private void addIntakeApplicationType(
			final APPLICATIONTYPEEntry applicationType, final long datastoreID,
			final Datastore datastore) throws InformationalException {

		final Entity rootEntity = datastore.readEntity(datastoreID);

		final EntityType intakeApplicationTypeEntityType = datastore
				.getEntityType(DatastoreConsts.INTAKE_APPLICATION_TYPE_ENTITY_NAME);

		if (intakeApplicationTypeEntityType != null) {
			// Remove any previous intake applications
			for (final Entity intakeApplication : rootEntity
					.getChildEntities(intakeApplicationTypeEntityType)) {

				intakeApplication.delete();
			}

			// Add the new intake application type record
			final Entity intakeApplicationTypeEntity = datastore
					.newEntity(intakeApplicationTypeEntityType);

			intakeApplicationTypeEntity.setTypedAttribute(
					DatastoreConsts.INTAKE_APPLICATION_TYPE_ID_ATTRIBUTE_NAME,
					applicationType.getCode());
			intakeApplicationTypeEntity.setTypedAttribute(
					MOLSADatastoreConst.kDateOfApplication,
					Date.getCurrentDate());

			rootEntity.addChildEntity(intakeApplicationTypeEntity);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public long start(final APPLICATIONTYPEEntry applicationType,
			final List<PROGRAMTYPEEntry> programs, final ConcernRole concernRole)
			throws InformationalException, AppException {

		IEGScriptExecutionIdentifier iegScriptexecutionIdentifier = new IEGScriptExecutionIdentifier();

		final IEGScriptID iegScriptID = applicationConfiguration
				.getIEGScriptID(applicationType);

		final Datastore datastore = applicationConfiguration
				.getDataStore(applicationType);

		final long datastoreID = DatastoreHelper.createRootEntity(datastore);

		// Add the applicationType details to the data store
		if (applicationType != null) {
			addIntakeApplicationType(applicationType, datastoreID, datastore);
		}

		// Add the programType details to the data store
		if (!programs.isEmpty()) {
			addIntakePrograms(programs, datastoreID, datastore);
		}

		final IEGSchemaName iegSchemaname = new IEGSchemaName();

		iegSchemaname.schemaName = datastore.getSchemaName();

		final IEGRootEntityID iegRootEntityID = new IEGRootEntityID();

		iegRootEntityID.entityID = datastoreID;

		final IEGRuntime iegRuntime = IEGRuntimeFactory.newInstance();

		iegScriptexecutionIdentifier = iegRuntime
				.createScriptExecutionExistingRootEntity(iegScriptID,
						iegSchemaname, iegRootEntityID);

		final long executionID = iegScriptexecutionIdentifier.executionID;

		setSchemaName(datastore.getSchemaName());

		setApplicationType(applicationType);
		setIEGExecutionID(iegScriptexecutionIdentifier.executionID);
		setRootEntityID(datastoreID);
		setApplicationMethod(APPLICATIONMETHODEntry.INPERSON);
		insert();

		// set the user for ApplicationStatus
		final ApplicationStatus applicationStatus = applicationStatusDAO
				.get(getDtls().currentApplicationStatusID);

		applicationStatus.setUserName(userDAO.get(
				TransactionInfo.getProgramUser()).getUsername());
		applicationStatus.modify(applicationStatus.getVersionNo());

		// insert IntakeApplicant
		final IntakeApplicant intakeApplicant = intakeApplicantDAO
				.newInstance();

		intakeApplicant.setDateTime(getFilingDate().getDateTime());

		intakeApplicant.setConcernRole(concernRole);
		intakeApplicant.setApplication(this);
		intakeApplicant.setApplicantRole(APPLICANTROLEEntry.PRIMARY_APPLICANT);
		intakeApplicant.insert();

		for (PROGRAMTYPEEntry programType : programs) {

			final ProgramApplication programApplication = programApplicationDAO
					.newInstance();

			programApplication.setProgramType(programType);
			programApplication.setApplication(this);

			programApplication.setProgramRequestDate(getFilingDate()
					.getDateTime());

			programApplication.insert();
		}
		final Entity rootEntity = datastore.readEntity(datastoreID);

		// Create and populate the person data store entities
		final ConcernRoleIDKey concernRoleKey = new ConcernRoleIDKey();

		concernRoleKey.concernRoleID = concernRole.getID();

		createMOLSADatastorePersonEntity(datastore, rootEntity, concernRoleKey);

		return executionID;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public long startForCase(APPLICATIONTYPEEntry applicationType,
			List<PROGRAMTYPEEntry> programTypes, ConcernRole concernRole,
			CaseHeader caseHeader) throws AppException, InformationalException {

		final IEGExecutionApplicationDetails iegExecutionDetails = new IEGExecutionApplicationDetails();
		IEGScriptExecutionIdentifier iegScriptexecutionIdentifier = new IEGScriptExecutionIdentifier();

		final IEGScriptID iegScriptID = applicationConfiguration
				.getIEGScriptIDForCase(applicationType);

		final Datastore datastore = applicationConfiguration
				.getDataStore(applicationType);

		final long datastoreID = DatastoreHelper.createRootEntity(datastore);

		// Add the applicationType details to the data store
		if (applicationType != null) {
			addIntakeApplicationType(applicationType, datastoreID, datastore);
		}

		if (!programTypes.isEmpty()) {
			addIntakePrograms(programTypes, datastoreID, datastore);
		}

		final IEGSchemaName iegSchemaname = new IEGSchemaName();

		iegSchemaname.schemaName = datastore.getSchemaName();

		final IEGRootEntityID iegRootEntityID = new IEGRootEntityID();

		iegRootEntityID.entityID = datastoreID;
		iegScriptexecutionIdentifier = IEGRuntimeFactory.newInstance()
				.createScriptExecutionExistingRootEntity(iegScriptID,
						iegSchemaname, iegRootEntityID);
		iegExecutionDetails.executionID = iegScriptexecutionIdentifier.executionID;

		setSchemaName(datastore.getSchemaName());
		setApplicationType(applicationType);
		setIEGExecutionID(iegScriptexecutionIdentifier.executionID);
		setRootEntityID(datastoreID);
		setApplicationMethod(APPLICATIONMETHODEntry.INPERSON);

		// Set the caseID of the application to the IC caseID
		setCase(caseHeader);
		insert();

		// set the user for ApplicationStatus
		final ApplicationStatus applicationStatus = applicationStatusDAO
				.get(getDtls().currentApplicationStatusID);

		applicationStatus.setUserName(userDAO.get(
				TransactionInfo.getProgramUser()).getUsername());
		applicationStatus.modify(applicationStatus.getVersionNo());

		// insert IntakeApplicant
		final IntakeApplicant intakeApplicant = intakeApplicantDAO
				.newInstance();

		intakeApplicant.setConcernRole(concernRole);
		intakeApplicant.setApplication(this);
		intakeApplicant.setApplicantRole(APPLICANTROLEEntry.PRIMARY_APPLICANT);

		intakeApplicant.setDateTime(getFilingDate().getDateTime());

		intakeApplicant.insert();

		for (final PROGRAMTYPEEntry programType : programTypes) {

			final ProgramApplication programApplication = programApplicationDAO
					.newInstance();

			programApplication.setProgramType(programType);
			programApplication.setApplication(this);

			programApplication.setProgramRequestDate(getFilingDate()
					.getDateTime());

			programApplication.insert();

		}

		final ConcernRoleIDKey concernRoleKey = new ConcernRoleIDKey();

		concernRoleKey.concernRoleID = concernRole.getID();
		final Entity rootEntity = datastore.readEntity(datastoreID);

		// Create and populate the person data store entities
		createMOLSADatastorePersonEntity(datastore, rootEntity, concernRoleKey);

		createMOLSACOCEntity(datastore, rootEntity);
		return iegExecutionDetails.executionID;
	}

	/**
	 * {@inheritDoc}
	 */
	public ProgramApplication getProgramApplication(
			final PROGRAMTYPEEntry programType, PROGRAMSTATUSEntry programStatus) {

		Set<ProgramApplication> programApplicationList = programApplicationDAO
				.search(this, programStatus, programType);

		if (programApplicationList.size() > 0) {
			return (ProgramApplication) programApplicationDAO.search(this,
					programStatus, programType).toArray()[0];
		}

		return null;

	}

	// NB: This method is used as part of a comparison strategy between the
	// person's existing address and the address returned from the script. It is
	// far from ideal and is only used to prevent the creation of addresses when
	// a
	// user actually hasn't changed it via the script. A proper solution needs
	// to
	// be implemented, i.e. proper address format in the script.
	/**
	 * Formats the specified address data into the same format it is
	 * pre-populated into datastore, i.e. no apt number.
	 * 
	 * @param addressData
	 *            The address data to be formatted.
	 * 
	 * @return a concatenated string of the address data.
	 * 
	 * @throws AppException
	 *             Generic exception signature.
	 * @throws InformationalException
	 *             Generic exception signature.
	 */
	private String formatExistingAddressForComparsion(final String addressData)
			throws AppException, InformationalException {

		String municipality = CuramConst.gkEmpty;
		String street = CuramConst.gkEmpty;
		String zone = CuramConst.gkEmpty;
		String buildingNumber = CuramConst.gkEmpty;
		String buildingType = CuramConst.gkEmpty;
		String postCode = CuramConst.gkEmpty;
		String electricityNumber = CuramConst.gkEmpty;
		String poBox = CuramConst.gkEmpty;
		String zipcode = CuramConst.gkEmpty;
		String country = CuramConst.gkEmpty;

		// declare list of <name><value> pairs

		final OtherAddressData addressDataString = new OtherAddressData();

		addressDataString.addressData = addressData;

		final curam.core.intf.AddressData addressDataObj = curam.core.fact.AddressDataFactory
				.newInstance();

		// convert address data string into <name><value> pairs vector
		final AddressMapList addressMapList = addressDataObj
				.parseDataToMap(addressDataString);

		for (int j = 0; j < addressMapList.dtls.size(); j++) {

			if (!(addressMapList.dtls.item(j).value.length() == 0)) {

				if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.CITY)) {
					municipality = addressMapList.dtls.item(j).value;
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE1)) {
					zone = addressMapList.dtls.item(j).value;
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE2)) {
					street = addressMapList.dtls.item(j).value;

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.UNIT_NUMBER)) {
					buildingNumber = addressMapList.dtls.item(j).value;
				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE4)) {
					buildingType = addressMapList.dtls.item(j).value;

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.ZIP)) {
					postCode = addressMapList.dtls.item(j).value;

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.LINE5)) {
					electricityNumber = addressMapList.dtls.item(j).value;

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.POBOXNO)) {
					poBox = addressMapList.dtls.item(j).value;

				} else if (addressMapList.dtls.item(j).name
						.equals(curam.codetable.ADDRESSELEMENTTYPE.COUNTRY)) {
					country = addressMapList.dtls.item(j).value;
				}
			}
		}

		return zone + street + buildingType + municipality + country + postCode
				+ zipcode;
	}

	/**
	 * Updates the isCOC attribute in Application Details entity
	 * @param dataStore
	 * @param rootEntity
	 * @throws AppException
	 * @throws InformationalException
	 */
	private final void createMOLSACOCEntity(final Datastore dataStore,
			final Entity rootEntity)
			throws AppException, InformationalException {

		final EntityType applicationDetailsEntityType = dataStore
				.getEntityType(MOLSADatastoreConst.kApplicationDetails);
		final Entity applicationDetails = dataStore.readEntity(rootEntity.getUniqueID());
		  applicationDetails.setTypedAttribute(MOLSADatastoreConst.KIsCOC,
                  true);
		  rootEntity.update();

	}
}
