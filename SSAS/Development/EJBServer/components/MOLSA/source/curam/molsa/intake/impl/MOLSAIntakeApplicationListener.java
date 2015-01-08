package curam.molsa.intake.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.google.inject.Inject;

import curam.application.impl.AbstractApplicationEvents;
import curam.application.impl.Application;
import curam.application.impl.ApplicationRoleObject;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.impl.ALTERNATENAMETYPEEntry;
import curam.codetable.impl.CONCERNROLETYPEEntry;
import curam.codetable.impl.COUNTRYEntry;
import curam.core.facade.fact.RepresentativeFactory;
import curam.core.facade.intf.Representative;
import curam.core.facade.struct.RepresentativeID;
import curam.core.facade.struct.RepresentativeRegistrationDetails;
import curam.core.fact.AddressFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseIDKey;
import curam.core.sl.struct.CaseParticipantRoleDetails;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceDescriptorDetails;
import curam.core.sl.struct.EvidenceKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.ReturnEvidenceDetails;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressFieldDetails;
import curam.core.struct.MaintainConcernRoleRelationshipDetails;
import curam.core.struct.OtherAddressData;
import curam.core.struct.PersonKey;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchAttributeException;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.sl.impl.CpDetailsAdaptor;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.GenericSLDataDetails;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.message.BPOADDRESS;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.core.fact.MOLSAAddressDataDAFactory;
import curam.molsa.core.intf.MOLSAAddressDataDA;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.pdc.facade.fact.PDCPersonFactory;
import curam.pdc.facade.intf.PDCPerson;
import curam.pdc.facade.struct.PDCEvidenceDetails;
import curam.pdc.facade.struct.PDCEvidenceDetailsList;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.workspaceservices.mappingbeans.impl.IntakeRelationshipMappingBean;
import curam.workspaceservices.message.WORKSPACESERVICESDATAMAPPING;
import curam.workspaceservices.util.impl.DatastoreHelper;

/**
 * 
 * a class listening Abstract application events to raise the action
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAIntakeApplicationListener extends AbstractApplicationEvents {

  @Inject
  private CaseHeaderDAO caseHeaderDAO;

  @Override
  public void startMappingApplication(Application intakeApplication) {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.startMappingApplication()");
  }

  @Override
  public void finishMappingApplication(Application application) {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.finishMappingApplication()");

  }

  @Override
  public void preSubmitting(Application intakeApplication) throws InformationalException, AppException {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.preSubmitting()");
    // Get the data store root entity id
    final long rootEntityID = intakeApplication.getRootEntityID();

    updateAddressStructureForMappings(rootEntityID);

    final Entity[] personEntities = MOLSADatastoreUtility.getEntities(rootEntityID, MOLSADatastoreConst.kPerson);

    final Map<String, String> completedAddresses = new HashMap<String, String>();
    final Map<String, String> completedMailAddresses = new HashMap<String, String>();

    for (final Entity personEntity : personEntities) {

      final Entity[] personAddress = MOLSADatastoreUtility.getEntities(personEntity.getUniqueID(), MOLSADatastoreConst.kAddress);

      final Entity[] mailingAddress = MOLSADatastoreUtility.getEntities(personEntity.getUniqueID(), MOLSADatastoreConst.kMailingAddress);

      for (final Entity addressEntity : personAddress) {

        final String addressID = addressEntity.getAttribute(MOLSADatastoreConst.kAddressID);
        final AddressDtls addressDtls = new AddressDtls();
        if (completedAddresses.get(addressID) == null) {
          try {
            addressDtls.addressID = Long.valueOf(addressID);
            addressDtls.addressData = getAddressData(addressEntity);
            addressDtls.countryCode = COUNTRYEntry.QATAR.getCode();
            addressDtls.addressData = addressDtls.addressData.replace("addressID", String.valueOf(addressDtls.addressID));

            TransactionInfo.getInformationalManager().acceptWarning(MOLSADatastoreConst.gkEmpty, new AppException(BPOADDRESS.INF_ADDRESS_GEOCODE_NOT_FOUND));
            AddressFactory.newInstance().insert(addressDtls);

            // Update address ID on Address Entity
            addressEntity.setAttribute(MOLSADatastoreConst.kAddressID, String.valueOf(addressDtls.addressID));

          } catch (final AppException e) {
            Trace.kTopLevelLogger.error("Error Occurred in Address mapping" + e, e.getCause());
          } catch (final InformationalException e) {
            Trace.kTopLevelLogger.error("Error Occurred in Mailing Address mapping" + e, e.getCause());
          } catch (final NoClassDefFoundError e) {
            // skip error if there is no GEO location API present
            final boolean enabled = Configuration.getBooleanProperty(EnvVars.ENV_GEOCODE_ENABLED);

            if (enabled && StringUtils.isEmpty(addressDtls.geoCode)) {
              if (Trace.atLeast(Trace.kTraceVerbose)) {
                Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener: " + "No API found for " + e.getMessage());
              }
            } else {
              throw e;
            }
          }

          addressEntity.update();

        }
      }

      for (final Entity mailAddressEntity : mailingAddress) {
        final String mailAddressID = mailAddressEntity.getAttribute(MOLSADatastoreConst.kMailingAddressID);
        final AddressDtls addressDtls = new AddressDtls();
        if (completedMailAddresses.get(mailAddressID) == null) {
          try {
            addressDtls.addressID = Long.valueOf(mailAddressID);
            addressDtls.addressData = getMailingAddressData(mailAddressEntity);
            addressDtls.countryCode = COUNTRYEntry.QATAR.getCode();
            TransactionInfo.getInformationalManager().acceptWarning(MOLSADatastoreConst.gkEmpty, new AppException(BPOADDRESS.INF_ADDRESS_GEOCODE_NOT_FOUND));
            AddressFactory.newInstance().insert(addressDtls);

            // Update address ID on Address Entity
            mailAddressEntity.setAttribute(MOLSADatastoreConst.kMailingAddressID, String.valueOf(addressDtls.addressID));
            // Map Mailing Address

          } catch (final AppException e) {
            Trace.kTopLevelLogger.error("Error Occurred in Mailing Address mapping" + e, e.getCause());
          } catch (final InformationalException e) {
            Trace.kTopLevelLogger.error("Error Occurred in Mailing Address mapping" + e, e.getCause());
          } catch (final NoClassDefFoundError e) {
            // skip error if there is no GEO location API present
            final boolean enabled = Configuration.getBooleanProperty(EnvVars.ENV_GEOCODE_ENABLED);

            if (enabled && StringUtils.isEmpty(addressDtls.geoCode)) {
              if (Trace.atLeast(Trace.kTraceVerbose)) {
                Trace.kTopLevelLogger.info("AddressDataIntakeApplicationListener: " + "No API found for " + e.getMessage());
              }
            } else {
              throw e;
            }
          }

          mailAddressEntity.update();

        }

      }
    }

  }

  @Override
  public void postSubmitting(Application intakeApplication) throws InformationalException, AppException {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.postSubmitting()");
    try {
      final Datastore datastore = DatastoreHelper.openDatastore(intakeApplication.getSchemaName());

      final Entity rootEntity = datastore.readEntity(intakeApplication.getRootEntityID());

      final Entity[] personEntites = rootEntity.getChildEntities(datastore.getEntityType(MOLSADatastoreConst.kPerson));

      final Entity[] absentFatherEntities = rootEntity.getChildEntities(datastore.getEntityType(MOLSADatastoreConst.kAbsentFather));

      if (null != absentFatherEntities && absentFatherEntities.length > 0) {
        registerRepresentative(personEntites, absentFatherEntities[0], intakeApplication);
      }

    } catch (final NoSuchAttributeException e) {
      throw new AppException(WORKSPACESERVICESDATAMAPPING.ERR_READING_FROM_DATASTORE, e);
    }

  }

  @Override
  public void startDeferredSubmission(Application application) throws InformationalException, AppException {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.startDeferredSubmission()");
  }

  @Override
  public void finishDeferredSubmission(Application application) throws InformationalException, AppException {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.finishDeferredSubmission()");
  }

  @Override
  public void cancelApplication(Application application) throws InformationalException, AppException {

  }

  @Override
  public void deferredSubmissionErrorHandler(Application application) throws InformationalException, AppException {
    Trace.kTopLevelLogger.info("MOLSAIntakeApplicationListener.deferredSubmissionErrorHandler()");
  }

  @Override
  public void relationshipCreated(MaintainConcernRoleRelationshipDetails details, IntakeRelationshipMappingBean relationshipBean) {

  }

  @Override
  public void preModifyOwner(Application application, ApplicationRoleObject currentOwner, ApplicationRoleObject newOwner) {

  }

  @Override
  public void postModifyOwner(Application application, ApplicationRoleObject newOwner, ApplicationRoleObject previousOwner) {

  }

  /**
   * Gives address data from data store entity Address.
   * 
   * @param address
   *          contains address entity
   * @return otherAddressData
   * @throws AppException
   *           Generic exception
   * @throws InformationalException
   *           Generic exception
   */
  private String getAddressData(final Entity address) throws AppException, InformationalException {

    final MOLSAAddressDataDA addressDataObj = MOLSAAddressDataDAFactory.newInstance();
    final AddressFieldDetails addressFieldDetails = new AddressFieldDetails();
    // To be changed to Qatar Layout
    addressFieldDetails.addressLayoutType = ADDRESSLAYOUTTYPE.US;
    addressFieldDetails.city = address.getAttribute(MOLSADatastoreConst.kMunicipality);
    addressFieldDetails.addressLine1 = address.getAttribute(MOLSADatastoreConst.kZone);
    addressFieldDetails.addressLine2 = address.getAttribute(MOLSADatastoreConst.kStreet);
    addressFieldDetails.addressLine4 = address.getAttribute(MOLSADatastoreConst.kBuildingType);
    addressFieldDetails.addressLine5 = address.getAttribute(MOLSADatastoreConst.kElectricityNumber);
    addressFieldDetails.zipCode = address.getAttribute(MOLSADatastoreConst.kPostCode);
    addressFieldDetails.countryCode = COUNTRYEntry.QATAR.getCode();
    final OtherAddressData otherAddressData = addressDataObj.parseFieldsToData(addressFieldDetails);
    return otherAddressData.addressData;

  }

  /**
   * 
   * @param address
   *          contains Address entity
   * @return otherAddressData
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic Exception
   */
  private String getMailingAddressData(final Entity address) throws AppException, InformationalException {

    final MOLSAAddressDataDA addressDataObj = MOLSAAddressDataDAFactory.newInstance();
    final AddressFieldDetails addressFieldDetails = new AddressFieldDetails();
    // To be changed to Qatar Layout
    addressFieldDetails.addressLayoutType = ADDRESSLAYOUTTYPE.US;
    addressFieldDetails.city = address.getAttribute(MOLSADatastoreConst.kMailingMunicipality);
    addressFieldDetails.addressLine1 = address.getAttribute(MOLSADatastoreConst.kMailingZone);
    addressFieldDetails.addressLine2 = address.getAttribute(MOLSADatastoreConst.kMailingStreet);
    addressFieldDetails.addressLine4 = address.getAttribute(MOLSADatastoreConst.kMailingBuildingType);
    addressFieldDetails.addressLine5 = address.getAttribute(MOLSADatastoreConst.kMailingElectricityNumber);
    addressFieldDetails.zipCode = address.getAttribute(MOLSADatastoreConst.kMailingPostCode);
    addressFieldDetails.countryCode = COUNTRYEntry.QATAR.getCode();
    final OtherAddressData otherAddressData = addressDataObj.parseFieldsToData(addressFieldDetails);
    return otherAddressData.addressData;

  }

  /**
   * 
   * @param rootEntityID
   *          an ID of root entity
   */
  @SuppressWarnings("unused")
  private void updateAddressStructureForMappings(final Long rootEntityID) {

    final Map<Long, Entity> personMap = createPersonMap(rootEntityID);
  }

  /**
   * Creates a map for all of the persons stored on the datastore.
   * 
   * @param rootEntityID
   *          The ID of the root entity of the datastore.
   * 
   * @return A map for all of the persons stored on the datastore.
   */
  private Map<Long, Entity> createPersonMap(final long rootEntityID) {

    final Map<Long, Entity> personMap = new HashMap<Long, Entity>();
    final Entity[] personEntities = MOLSADatastoreUtility.getEntities(rootEntityID, MOLSADatastoreConst.kPerson);
    for (final Entity personEntity : personEntities) {
      personMap.put(Long.valueOf(personEntity.getAttribute(MOLSADatastoreConst.kPersonID)), personEntity);
    }

    return personMap;
  }

  /**
   * 
   * @param registrationDtls
   *          an arguement storing registration details
   * @param absentParent
   *          an entity
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic Exception
   */
  private void assignRegistrationDetails(final RepresentativeRegistrationDetails registrationDtls, final Entity absentParent) throws AppException, InformationalException {

    registrationDtls.representativeRegistrationDetails.representativeRegistrationDetails.addressData = getBlankAddress();
    registrationDtls.representativeRegistrationDetails.representativeRegistrationDetails.registrationDate = Date.getCurrentDate();

    registrationDtls.representativeRegistrationDetails.representativeDtls.representativeName = getFullName(absentParent);
    registrationDtls.representativeRegistrationDetails.representativeDtls.alternateID = absentParent.getAttribute(MOLSADatastoreConst.kQIDNumber);
  }

  /**
   * Register the Absent Parent as a representative and add case participant
   * role as a application file and application filer evidence.
   * 
   * @param personEntites
   *          an arguement storing array of entity
   * @param absentPerson
   *          Application filer details.
   * @param intakeApplication
   *          an intake application
   */

  @SuppressWarnings("unused")
  private void registerRepresentative(Entity[] personEntites, final Entity absentPerson, final Application intakeApplication) {

    try {

      final Representative representative = RepresentativeFactory.newInstance();

      final RepresentativeRegistrationDetails representativeRegistrationDetails = new RepresentativeRegistrationDetails();

      assignRegistrationDetails(representativeRegistrationDetails, absentPerson);

      representative.registerRepresentative(representativeRegistrationDetails);

      final RepresentativeID representativeID = new RepresentativeID();

      representativeID.representativeID = representativeRegistrationDetails.representativeRegistrationDetails.representativeDtls.concernRoleID;

      final CaseHeader caseHeader = caseHeaderDAO.get(intakeApplication.getCase().getID());
      final CaseParticipantRole caseParticipantRoleObject = CaseParticipantRoleFactory.newInstance();
      final CaseParticipantRoleDetails absentCaseParticipantRoleDetails = new CaseParticipantRoleDetails();
      // Assign details to create a Concern Case Role
      absentCaseParticipantRoleDetails.dtls.caseID = caseHeader.getID();
      absentCaseParticipantRoleDetails.dtls.participantRoleID = representativeID.representativeID;
      absentCaseParticipantRoleDetails.dtls.fromDate = Date.getCurrentDate();
      absentCaseParticipantRoleDetails.dtls.typeCode = CASEPARTICIPANTROLETYPE.MEMBER;

      caseParticipantRoleObject.insertCaseParticipantRole(absentCaseParticipantRoleDetails);

      List<curam.piwrapper.casemanager.impl.CaseParticipantRole> allCaseParticipants = intakeApplication.getCase().listActiveCaseParticipantRoles();
      for (Entity relatedPerson : personEntites) {
        if (relatedPerson.getAttribute(MOLSADatastoreConst.kHasAbsentFather).equals(MOLSADatastoreConst.kTrue)) {
          for (curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole : allCaseParticipants) {
            if (relatedPerson.getAttribute(MOLSADatastoreConst.kQIDNumber).equals(caseParticipantRole.getConcernRole().getPrimaryAlternateID())) {

              final ReturnEvidenceDetails absentPeronEvidence = createAbsentParentEvidence(absentPerson, caseHeader, absentCaseParticipantRoleDetails, caseParticipantRole);
            }
          }

        }
      }

    } catch (final AppException e) {

      throw new AppRuntimeException(e);
    } catch (final InformationalException e) {

      throw new AppRuntimeException(e);
    }

  }

  /**
   * Create participant records for a list of case members.
   * 
   * @param caseParticipantRole
   *          role of case participant
   * @return participant list
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic Exception
   */
  @SuppressWarnings({ "unused" })
  private Participant getParticipantFromCaseParticipantRole(curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole) throws AppException, InformationalException {
    final Participant participant = new Participant();
    if (caseParticipantRole.getConcernRole().getConcernRoleType().equals(CONCERNROLETYPEEntry.PERSON)
        || caseParticipantRole.getConcernRole().getConcernRoleType().equals(CONCERNROLETYPEEntry.PROSPECTPERSON)) {

      final PDCPerson pdcPerson = PDCPersonFactory.newInstance();
      final PersonKey personKey = new PersonKey();

      personKey.concernRoleID = caseParticipantRole.getConcernRole().getID();
      final PDCEvidenceDetailsList pdcEvidenceList = pdcPerson.listEvidenceForParticipant(personKey);

      participant.setConcernRoleID(personKey.concernRoleID);

      /*
       * Build up a picture of the participant from the evidence on the
       * Participant Data Case.
       */
      for (final PDCEvidenceDetails pdcEvidenceDetails : pdcEvidenceList.list) {
        final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = getDynamicEvidenceDataDetails(pdcEvidenceDetails);

        if (pdcEvidenceDetails.evidenceType.equals(MOLSADatastoreConst.kPDCNamesEvidence)) {

          final String nameType = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCNamesNameType).getValue();
          if (nameType.equals(ALTERNATENAMETYPEEntry.REGISTERED.getCode())) {
            final String firstName = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCNamesFirstName).getValue();
            final String lastName = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCNamesLastName).getValue();

            participant.setFirstName(firstName);
            participant.setLastName(lastName);
          }

        } else if (pdcEvidenceDetails.evidenceType.equals(MOLSADatastoreConst.kPDCBirthAndDeathEvidence)) {
          // check date of birth matches
          final String dateOfBirth = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCBirthAndDeathDateOfBirth).getValue();

          participant.setDateOfBirth(Date.fromISO8601(dateOfBirth));
        } else if (pdcEvidenceDetails.evidenceType.equals(MOLSADatastoreConst.kPDCIdentificationEvidence)) {
          // check ssn matches
          final String altIDType = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCIdentificationsAlternateIDType).getValue();

          final String mappingAlternateIDType = Configuration.getProperty(EnvVars.ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE);

          if (altIDType.equals(mappingAlternateIDType)) {
            final String alternateID = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCIdentificationsAlternateID).getValue();
            participant.setQid(alternateID);
          }

        } else if (pdcEvidenceDetails.evidenceType.equals(MOLSADatastoreConst.kPDCGenderEvidence)) {
          // check gender matches

          final String gender = dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kPDCGenderGender).getValue();
          participant.setGender(gender);
        }
      }
    }

    return participant;
  }

  /**
   * Concatenate firstName and lastName of application filer.
   * 
   * @param absentParent
   *          - application filer datastore entity
   * @return full name of application filer
   * @throws AppException
   *           - Generic Exception
   * @throws InformationalException
   *           - Generic Exception
   */
  private String getFullName(final Entity absentParent) throws AppException, InformationalException {

    final String firstName = absentParent.getAttribute(MOLSADatastoreConst.kFirstName);
    final String lastName = absentParent.getAttribute(MOLSADatastoreConst.kLastName);
    final StringBuilder builder = new StringBuilder();
    return builder.append(firstName).append(CuramConst.gkEmpty).append(lastName).toString();
  }

  /**
   * 
   * @param absentPerson
   *          Application filer details.
   * @param applicationCase
   *          The application case id.
   * @param absentCaseParticipantRoleDetails
   *          an arguement storing absent Case Participant Role Details
   * @param caseParticipantRole
   *          an arguement storing Role of caseParticipant
   * @return evidenceDetails
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic Exception
   */
  public ReturnEvidenceDetails createAbsentParentEvidence(final Entity absentPerson, final CaseHeader applicationCase,
      final CaseParticipantRoleDetails absentCaseParticipantRoleDetails, curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole) throws AppException,
      InformationalException {

    final EvidenceTypeKey eType = new EvidenceTypeKey();
    eType.evidenceType = CASEEVIDENCE.ABSENTFATHERHUSBAND;

    final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory.instance(eType, Date.getCurrentDate());

    final GenericSLDataDetails genericDtls = new GenericSLDataDetails();

    final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory.newInstance(eType.evidenceType, Date.getCurrentDate());

    dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kStartDate).setValue(absentPerson.getAttribute(MOLSADatastoreConst.kStartDate));

    dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kAbsenceReason).setValue(absentPerson.getAttribute(MOLSADatastoreConst.kAbsentPersonReason));

    final Long absentCaseParticipantRoleID = absentCaseParticipantRoleDetails.dtls.caseParticipantRoleID;

    dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kabsentPerson).setValue(absentCaseParticipantRoleID.toString());
    dynamicEvidenceDataDetails.getAttribute(MOLSADatastoreConst.kParticipant).setValue(caseParticipantRole.getID().toString());

    final EvidenceDescriptorDetails descriptor = new EvidenceDescriptorDetails();
    descriptor.evidenceType = eType.evidenceType;
    descriptor.participantID = caseParticipantRole.getConcernRole().getID();
    descriptor.caseID = applicationCase.getID();
    descriptor.receivedDate = Date.getCurrentDate();
    genericDtls.setData(dynamicEvidenceDataDetails);
    genericDtls.setDescriptor(descriptor);
    genericDtls.setCaseIdKey(descriptor.caseID);
    CpDetailsAdaptor cpDetails = new CpDetailsAdaptor();
    cpDetails.setCaseParticipantRoleID(caseParticipantRole.getID());
    cpDetails.setParticipantRoleID(caseParticipantRole.getConcernRole().getID());
    genericDtls.addRelCp(MOLSADatastoreConst.kParticipant, cpDetails);
    final ReturnEvidenceDetails evidenceDetails = evidenceServiceInterface.createEvidence(genericDtls);
    return evidenceDetails;
  }

  /**
   * Returns a blank address. Format can differ depending on whether the address
   * is required to include a US County code.
   * 
   * @return A blank address.
   */
  private String getBlankAddress() {

    final String retval = "1\n" + "0\n" + "US\n" + "US\n" + "1\n" + "0\n" + "ADD1=1153\n" + "ADD2=Mole Street\n" + "CITY=MM17005\n" + "UNITNO=123\n" 
    + "ADD4=test\n" + "ADD5=test\n" + "ZIP=99999\n" + "POBOXNO=123\n" + "COUNTRY=QATAR";

    return retval;

  }

  /**
   * 
   * @param pdcEvidenceDetails
   *          The PDC evidence details.
   * @return dynamicEvidenceDataDetails
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic Exception
   */
  private DynamicEvidenceDataDetails getDynamicEvidenceDataDetails(final PDCEvidenceDetails pdcEvidenceDetails) throws AppException, InformationalException {

    final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
    evidenceTypeKey.evidenceType = pdcEvidenceDetails.evidenceType;

    final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory.instance(evidenceTypeKey, Date.getCurrentDate());

    final EvidenceKey evidenceKey = new EvidenceKey();
    evidenceKey.evidenceID = pdcEvidenceDetails.evidenceID;
    evidenceKey.evType = pdcEvidenceDetails.evidenceType;

    final CaseIDKey caseIDKey = new CaseIDKey();
    caseIDKey.caseID = pdcEvidenceDetails.caseID;

    final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
    evidenceCaseKey.caseIDKey = caseIDKey;
    evidenceCaseKey.evidenceKey = evidenceKey;

    final ReadEvidenceDetails readEvidenceDetails = evidenceServiceInterface.readEvidence(evidenceCaseKey);

    final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;

    return dynamicEvidenceDataDetails;
  }

  /**
   * Representation of a participant.
   * 
   */
  static class Participant {

    private String firstName = "";

    private String lastName = "";

    private String gender = "";

    private String qid = "";

    private Date dateOfBirth;

    private long concernRoleID;

    /**
     * 
     * @param firstName
     *          indicates first name
     */
    public void setFirstName(final String firstName) {

      this.firstName = firstName;
    }
/**
 * 
 * @param lastName
 * indicates last name
 */
    public void setLastName(final String lastName) {

      this.lastName = lastName;
    }
/**
 * 
 * @param dateOfBirth
 * stores DOB
 */
    public void setDateOfBirth(final Date dateOfBirth) {

      this.dateOfBirth = dateOfBirth;
    }
/**
 * 
 * @param gender
 * stores gender value
 */
    public void setGender(final String gender) {

      this.gender = gender;
    }
/**
 * 
 * @param concernRoleID
 * stores concern role id
 */
    public void setConcernRoleID(final long concernRoleID) {

      this.concernRoleID = concernRoleID;
    }
/**
 * 
 * @return firstName
 */
    public String getFirstName() {

      return firstName;
    }
/**
 * 
 * @return lastName
 */
    public String getLastName() {

      return lastName;
    }
/**
 * 
 * @return dateOfBirth
 */
    public Date getDateOfBirth() {

      return dateOfBirth;
    }
/**
 * 
 * @return gender
 */
    public String getGender() {

      return gender;
    }
/**
 * 
 * @return concernRoleID
 */
    public long getConcernRoleID() {

      return concernRoleID;
    }
/**
 * 
 * @return qid
 */
    public String getQid() {
      return qid;
    }
/**
 * 
 * @param qid
 * a qid
 */
    public void setQid(String qid) {
      this.qid = qid;
    }

  }

}
