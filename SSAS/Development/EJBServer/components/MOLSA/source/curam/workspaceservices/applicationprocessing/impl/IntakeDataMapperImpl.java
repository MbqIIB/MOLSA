/*
 * IBM Confidential 
 *
 * OCO Source Materials 
 *
 * Copyright IBM Corporation 2012 
 *
 * The source code for this program is not published or otherwise divested 
 * of its trade secrets, irrespective of what has been deposited with the US 
 * Copyright Office 
 */ 

/*
 * Copyright 2010-2013 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
package curam.workspaceservices.applicationprocessing.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.application.impl.Application;
import curam.application.impl.ApplicationConst;
import curam.application.impl.ApplicationEvents;
import curam.application.impl.DuplicateAlternateIDFoundOnSubmissionStrategy;
import curam.application.impl.IntakeApplicant;
import curam.application.impl.IntakeApplicantDAO;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.COMMUNICATIONMETHOD;
import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.CONCERNROLESTATUS;
import curam.codetable.EMAILTYPE;
import curam.codetable.EVIDENCECHANGEREASON;
import curam.codetable.GENDER;
import curam.codetable.LANGUAGE;
import curam.codetable.RECORDSTATUS;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.APPLICATIONMETHODEntry;
import curam.codetable.impl.CASEPARTICIPANTROLETYPEEntry;
import curam.codetable.impl.CONCERNROLETYPEEntry;
import curam.codetable.impl.LANGUAGEEntry;
import curam.codetable.impl.PHONETYPEEntry;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.events.CONCERNROLEADDRESS;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.struct.PersonRegistrationResult;
import curam.core.facade.struct.ReadProspectPersonKey;
import curam.core.fact.AddressDataFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleAddressFactory;
import curam.core.fact.ConcernRoleAlternateIDFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.MaintainConcernRoleAltIDFactory;
import curam.core.fact.MaintainConcernRoleRelationshipsFactory;
import curam.core.fact.MaintainPersonFactory;
import curam.core.fact.ProspectPersonFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.CaseHeader;
import curam.core.intf.ConcernRoleAlternateID;
import curam.core.intf.ConcernRoleEmailAddress;
import curam.core.intf.MaintainConcernRoleAltID;
import curam.core.intf.MaintainConcernRoleRelationships;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.sl.entity.struct.ReadByParticipantRoleTypeAndCaseKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorInsertDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorModifyDtls;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EIEvidenceInsertDtls;
import curam.core.sl.infrastructure.impl.EIEvidenceModifyDtls;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtls;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtlsList;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.ProspectPersonRegistrationDtls;
import curam.core.struct.AddressDetails;
import curam.core.struct.AddressForConcernRoleKey;
import curam.core.struct.AddressMapList;
import curam.core.struct.AddressReadMultiDtls;
import curam.core.struct.AddressReadMultiDtlsList;
import curam.core.struct.AddressReadMultiKey;
import curam.core.struct.AlternateIDAndTypeCodeDtls;
import curam.core.struct.AlternateIDAndTypeCodeDtlsList;
import curam.core.struct.AlternateIDDetails;
import curam.core.struct.AlternateIDReadmultiDtls;
import curam.core.struct.AlternateIDReadmultiDtlsList;
import curam.core.struct.AlternateIDTypeCodeKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.ConcernRoleAddressDtls;
import curam.core.struct.ConcernRoleAlternateIDDtls;
import curam.core.struct.ConcernRoleAlternateIDKey;
import curam.core.struct.ConcernRoleAlternateIDRMKey;
import curam.core.struct.ConcernRoleAlternateReadKey;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleEmailAddressDtls;
import curam.core.struct.ConcernRoleIDStatusCodeKey;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRolePhoneNumberDtls;
import curam.core.struct.MaintainAddressKey;
import curam.core.struct.MaintainConcernRoleAltIDKey;
import curam.core.struct.MaintainConcernRoleKey;
import curam.core.struct.MaintainConcernRoleRelationshipDetails;
import curam.core.struct.MaintainEmailAddressDetails;
import curam.core.struct.MaintainPhoneNumberKey;
import curam.core.struct.OtherAddressData;
import curam.core.struct.PersonFurtherDetails;
import curam.core.struct.PersonModifyDtls;
import curam.core.struct.PhoneNumberDetails;
import curam.core.struct.PhoneRMDtls;
import curam.core.struct.ProspectPersonDtls;
import curam.core.struct.ProspectPersonKey;
import curam.core.struct.ProspectPersonModifyDetails;
import curam.core.struct.ReadConcernRoleAltIDKey;
import curam.core.struct.ReadMultiByConcernRoleIDPhoneResult;
import curam.core.struct.RegistrationIDDetails;
import curam.creole.value.CodeTableItem;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.datastore.impl.NoSuchAttributeException;
import curam.dynamicevidence.definition.impl.EvidenceTypeDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.dynamicevidence.impl.DynamicEvidenceDataAttributeDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.impl.IntakeConst;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.participant.impl.ConcernRole;
import curam.participant.impl.ConcernRoleDAO;
import curam.pdc.fact.PDCAlternateIDFactory;
import curam.pdc.fact.PDCEmailAddressFactory;
import curam.pdc.fact.PDCPhoneNumberFactory;
import curam.pdc.fact.PDCProspectPersonFactory;
import curam.pdc.fact.PDCRelationshipsFactory;
import curam.pdc.fact.PDCUtilFactory;
import curam.pdc.impl.PDCConst;
import curam.pdc.intf.PDCAlternateID;
import curam.pdc.intf.PDCEmailAddress;
import curam.pdc.intf.PDCPhoneNumber;
import curam.pdc.intf.PDCProspectPerson;
import curam.pdc.intf.PDCRelationships;
import curam.pdc.intf.PDCUtil;
import curam.pdc.struct.PDCCaseIDCaseParticipantRoleID;
import curam.pdc.struct.PDCProspectPersonDetails;
import curam.pdc.struct.ParticipantAlternateIDDetails;
import curam.pdc.struct.ParticipantEmailAddressDetails;
import curam.pdc.struct.ParticipantPhoneDetails;
import curam.pdc.struct.ParticipantRelationshipDetails;
import curam.piwrapper.participantmanager.impl.ConcernRoleAddress;
import curam.piwrapper.participantmanager.impl.ConcernRoleAddressDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.internal.codetable.fact.CodeTableFactory;
import curam.util.internal.codetable.intf.CodeTable;
import curam.util.internal.codetable.struct.CTItem;
import curam.util.internal.codetable.struct.CTItemKey;
import curam.util.persistence.helper.EventDispatcherFactory;
import curam.util.resources.Configuration;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.StringHelper;
import curam.workspaceservices.codetable.impl.IntakeApplicationMethodEntry;
import curam.workspaceservices.mappingbeans.impl.ApplicationMappingBean;
import curam.workspaceservices.mappingbeans.impl.IntakeProspectPersonMappingBean;
import curam.workspaceservices.mappingbeans.impl.IntakeRelationshipMappingBean;
import curam.workspaceservices.mappingbeans.impl.PhoneNumberMappingBean;
import curam.workspaceservices.message.WORKSPACESERVICESDATAMAPPING;
import curam.workspaceservices.message.impl.MAPPINGExceptionCreator;
import curam.workspaceservices.util.impl.DatastoreHelper;


/**
 * This class maps application data from a datastore to Curam database tables,
 * both to CEF and to Curam solutions, based on mapping configurations that have
 * been configured for the programs applied for.
 */
class IntakeDataMapperImpl implements IntakeDataMapper {

  @Inject
  private EvidenceTypeDefDAO etDefDAO;
  
  @Inject
  private EvidenceTypeVersionDefDAO etVerDefDAO;

  private static String globalAlternateIDType = new String();
  
  @Inject
  private DuplicateAlternateIDFoundOnSubmissionStrategy duplicateAlternateIDFoundOnSubmissionStrategy;

  // BEGIN, CR00261409, GBA
  /**
   * Map to store the data store entity id and the Mapped Prospect Person.
   */
  private final Map<Long, MappedProspectPersonInternal> dataStoreProspectMap = new HashMap<Long, MappedProspectPersonInternal>();

  /**
   * Map to store the relationships between Mapped Prospect Persons.
   */
  private final Map<Long, List<IntakeRelationshipMappingBean>> relationshipMap = new HashMap<Long, List<IntakeRelationshipMappingBean>>();

  @Inject
  private Provider<DatastoreCEFMappingsInternal> dataStoreCEFMappingsProvider;

  /**
   * This is the mapping object that stores the relationship between the records
   * in the datastore and those created in CEF.
   */
  private DatastoreCEFMappingsInternal dataStoreCEFMappings;

  @Inject
  private Provider<MappedProspectPersonInternal> mappedPersonProvider;

  @Inject
  private IntakeEvidenceMapper intakeEvidenceMapper;

  @Inject
  private IntakeApplicantDAO intakeApplicantDAO;

  /**
   * The EventDispatcherFactory.
   */
  @Inject
  private EventDispatcherFactory<ApplicationEvents> applicationEventsDispatcher;

  /**
   * Data access object for the concern role entity.
   */
  @Inject
  private ConcernRoleDAO concernRoleDAO;

  /**
   * Data access object for the concern role address entity.
   */
  @Inject
  private ConcernRoleAddressDAO concernRoleAddressDAO;

  /**
   * {@inheritDoc}
   */
  public DataStoreCEFMappings mapFromDataStoreToCuram(
    final Application application, final long caseID) throws AppException,
      InformationalException {

    // map to CEF, populate mappings object
    mapFromDataStoreToCEF(application, caseID);
    intakeEvidenceMapper.performMappings(application, dataStoreCEFMappings,
      caseID);

    return dataStoreCEFMappings;
  }

  private void mapFromDataStoreToCEF(final Application application,
    final long caseID) throws AppException, InformationalException {

    // initialize object
    dataStoreCEFMappings = dataStoreCEFMappingsProvider.get();

    ApplicationMappingBean applicationData = null;

    try {
      final Datastore ds = DatastoreHelper.openDatastore(
        application.getSchemaName());

      applicationData = ApplicationMappingBean.getIntakeApplicationMappingBean(
        ds, application.getRootEntityID());

      final Entity applicationEntity = ds.readEntity(
        application.getRootEntityID());

      final EntityType intakeApplicationEntityType = ds.getEntityType(
        ApplicationConst.kIntakeApplication);

      final Entity[] entities = applicationEntity.getChildEntities(
        intakeApplicationEntityType);

      Date dateOfApplication = null;
      String receivedMethod = null;

      String interpreterLanguageCode = CuramConst.gkEmpty;
      String assistanceExplanation = CuramConst.gkEmpty;

      // For all intake applications the data should be the same as it's only
      // captured once, so break after first iteration.
      for (final Entity intakeApplicationTypeEntity : entities) {
        dateOfApplication = Date.getDate(
          intakeApplicationTypeEntity.getAttribute(
            ApplicationConst.kDateOfApplication));
        receivedMethod = intakeApplicationTypeEntity.getAttribute(
          ApplicationConst.kReceivedMethod);

        interpreterLanguageCode = intakeApplicationTypeEntity.getAttribute(
          ApplicationConst.kInterpreterLanguage);

        assistanceExplanation = intakeApplicationTypeEntity.getAttribute(
          ApplicationConst.kAssistanceExplanation);

        break;
      }

      if (interpreterLanguageCode != null) {

        application.setInterpreterLanguageCode(
          LANGUAGEEntry.get(interpreterLanguageCode));

      }

      if (!StringHelper.isEmpty(assistanceExplanation)) {
        application.setSpecialAssistanceInd(true);
        application.setSpecialAssistanceRequirements(assistanceExplanation);
      }

      application.setFilingDate(dateOfApplication);
      if (IntakeApplicationMethodEntry.INPERSON.getCode().equals(receivedMethod)) {
        application.setApplicationMethod(APPLICATIONMETHODEntry.INPERSON);
      } else if (IntakeApplicationMethodEntry.ONLINE.getCode().equals(
        receivedMethod)) {
        application.setApplicationMethod(APPLICATIONMETHODEntry.ONLINE);
      } else if (IntakeApplicationMethodEntry.PAPER.getCode().equals(
        receivedMethod)) {
        application.setApplicationMethod(APPLICATIONMETHODEntry.PAPER);
      } else if (IntakeApplicationMethodEntry.PHONE.getCode().equals(
        receivedMethod)) {
        application.setApplicationMethod(APPLICATIONMETHODEntry.PHONE);
      }

      application.modify(application.getVersionNo());

    } catch (final NoSuchAttributeException e) {

      throw new AppException(
        WORKSPACESERVICESDATAMAPPING.ERR_READING_FROM_DATASTORE, e);
    }

    if (applicationData == null) {
      throw new AppException(
        WORKSPACESERVICESDATAMAPPING.ERR_READING_FROM_DATASTORE);
    }

    // create ProspectPerson record for each household member.
    // store values in the dataStoreCEFMappings
    createProspectPersons(applicationData.getFamilyMembers(), caseID,
      application);

    // create the relationships between these prospects
    createRelationships(applicationData.getRelationships1());

    createIntegratedCaseAndCaseParticipantRoles(caseID);
    
    // add case notes to the case for each prospect person with a duplicate
    // SSN
    for (final MappedProspectPerson mappedProspectPerson : dataStoreCEFMappings.getAllMappedProspectPersons()) {

      if (mappedProspectPerson.hasDuplicateSSN()) {
        // add a case note for this prospect person
        duplicateAlternateIDFoundOnSubmissionStrategy.reportDuplicateAlternateID(
          application, mappedProspectPerson.getSSN());
      }
    }

  }

  private void createProspectPersons(
    final List<IntakeProspectPersonMappingBean> householdMembers,
    final long caseID, final Application application) throws AppException,
      InformationalException {

    final Iterator<IntakeProspectPersonMappingBean> householdIterator = householdMembers.iterator();

    boolean primaryClientIdentifiedInd = false;

    while (householdIterator.hasNext()) {

      // create ProspectPerson record
      final IntakeProspectPersonMappingBean prospectPersonVO = householdIterator.next();

      // BEGIN, CR00261409, GBA
      final MappedProspectPersonInternal mappedProspectPerson;
      final Long dataStoreEntityId = new Long(prospectPersonVO.getUniqueID());

      if (dataStoreProspectMap.containsKey(dataStoreEntityId)) {

        mappedProspectPerson = dataStoreProspectMap.get(dataStoreEntityId);
        // BEGIN, CR00272095, GBA
        if (!isPrimaryClient(prospectPersonVO)) {

          createIntakeApplicant(application,
            concernRoleDAO.get(mappedProspectPerson.getConcernRoleID()));

        }
        // END, CR00272095

      } else {
        mappedProspectPerson = createProspectPerson(prospectPersonVO, caseID,
          application);

        // create phone number records for the primary client
        createPhoneNumbers(prospectPersonVO,
          mappedProspectPerson.getConcernRoleID());
        if (!StringUtil.isNullOrEmpty(prospectPersonVO.getEmailAddress())) {
          createEmailAddress(prospectPersonVO,
            mappedProspectPerson.getConcernRoleID());
        }
        dataStoreProspectMap.put(dataStoreEntityId, mappedProspectPerson);
      }
      // END, CR00261409

      if (isPrimaryClient(prospectPersonVO)) {
        primaryClientIdentifiedInd = true;
      }
      dataStoreCEFMappings.addMappedPerson(mappedProspectPerson);
    }

    if (!primaryClientIdentifiedInd) {
      throw new AppException(
        WORKSPACESERVICESDATAMAPPING.ERR_NO_PRIMARY_PARTICIPANT);
    }
  }

  /**
   * Create an email address for a prospect person.
   *
   * @param prospectPersonVO
   * The value object representing data from the prospect person, taken
   * from the data store.
   * @param concernRoleID
   * The concern role id of the newly created prospect person.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void createEmailAddress(
    final IntakeProspectPersonMappingBean prospectPersonVO,
    final long concernRoleID) throws AppException, InformationalException {

    final ConcernRole concernRole = concernRoleDAO.get(concernRoleID);

    // Only create a new email address if the email address entered is different
    // than the existing one, or if one doesn't exist!
    if (concernRole.getEmailAddress() == null
      || (!concernRole.getEmailAddress().getEmail().equals(
        prospectPersonVO.getEmailAddress()))) {

      final curam.core.intf.MaintainEmailAddress maintainEmailAddressObj = curam.core.fact.MaintainEmailAddressFactory.newInstance();

      final MaintainEmailAddressDetails emailAddressDetails = new MaintainEmailAddressDetails();

      emailAddressDetails.emailAddress = prospectPersonVO.getEmailAddress();
      emailAddressDetails.comments = CuramConst.gkEmpty;

      maintainEmailAddressObj.createEmailAddress(emailAddressDetails);

      final long emailAddressID = emailAddressDetails.emailAddressID;

      final ConcernRoleEmailAddress concernRoleEmailAddressObj = curam.core.fact.ConcernRoleEmailAddressFactory.newInstance();

      final ConcernRoleEmailAddressDtls concernRoleEmailAddressDtls = new ConcernRoleEmailAddressDtls();

      // unique id generator class
      final curam.core.intf.UniqueID uniqueIDObj = curam.core.fact.UniqueIDFactory.newInstance();

      concernRoleEmailAddressDtls.concernRoleEmailAddressID = uniqueIDObj.getNextID();
      concernRoleEmailAddressDtls.concernRoleID = concernRoleID;
      concernRoleEmailAddressDtls.emailAddressID = emailAddressID;
      concernRoleEmailAddressDtls.startDate = Date.getCurrentDate();
      concernRoleEmailAddressDtls.endDate = curam.util.type.Date.kZeroDate;
      concernRoleEmailAddressDtls.typeCode = EMAILTYPE.PERSONAL;

      // BEGIN, CR00369959, KR
      final ParticipantEmailAddressDetails participantEmailAddressDetails = new ParticipantEmailAddressDetails();

      participantEmailAddressDetails.assign(concernRoleEmailAddressDtls);
      participantEmailAddressDetails.emailAddress = prospectPersonVO.getEmailAddress();
      final PDCEmailAddress pdcEmailAddress = PDCEmailAddressFactory.newInstance();

      pdcEmailAddress.insert(participantEmailAddressDetails);
      // END, CR00369959, KR

      if (updatePersonPrimaryContactDetails()) {
        updateConcernRolePriEmail(emailAddressID, concernRoleID);
      }
    }
    
  }

  /**
   * Reads the environment variable
   * <code>ENV_APPLICATION_PERSON_CONTACT_DETAILS_SET_TO_PRIMARY_FROM_SCRIPT_ENABLED</code>
   * to determine if a person's primary contact details should updated.
   *
   * @return true a person's primary contact details should be updated,
   * otherwise false.
   */
  private boolean updatePersonPrimaryContactDetails() {

    final Boolean updateEnabled = new Boolean(
      curam.util.resources.Configuration.getBooleanProperty(
        curam.core.impl.EnvVars.ENV_APPLICATION_PERSON_CONTACT_DETAILS_SET_TO_PRIMARY_FROM_SCRIPT_ENABLED));

    return updateEnabled;
  }

  /**
   * Updates a concern roles primary email address to the supplied email
   * address.
   *
   * @param emailAddressID
   * The identifier for the email address to be set as primary.
   * @param concernRoleID
   * The concern role associated to the email address.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void updateConcernRolePriEmail(final long emailAddressID,
    final long concernRoleID) throws AppException, InformationalException {

    // amend concern role record to set primary phone number ID
    final curam.core.intf.ConcernRole concernRoleObj = curam.core.fact.ConcernRoleFactory.newInstance();

    final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = concernRoleID;

    final ConcernRoleDtls concernRoleDtls = concernRoleObj.read(concernRoleKey,
      true);

    concernRoleDtls.primaryEmailAddressID = emailAddressID;

    updateConcernRoleEvidence(concernRoleKey, concernRoleDtls);
  }

  private void updateConcernRoleEvidence(final ConcernRoleKey concernRoleKey,
    final ConcernRoleDtls concernRoleDtls) throws AppException,
      InformationalException {
    final EIEvidenceKey eiEvidenceKey = new EIEvidenceKey();

    eiEvidenceKey.evidenceID = concernRoleKey.concernRoleID;
    eiEvidenceKey.evidenceType = CASEEVIDENCE.CONCERNROLE;

    // Evidence descriptor object
    final EvidenceDescriptorModifyDtls evidenceDescriptorModifyDtls = new EvidenceDescriptorModifyDtls();

    evidenceDescriptorModifyDtls.receivedDate = Date.getCurrentDate();

    // Modify details object
    final EIEvidenceModifyDtls eiEvidenceModifyDtls = new EIEvidenceModifyDtls();

    eiEvidenceModifyDtls.descriptor.assign(evidenceDescriptorModifyDtls);
    eiEvidenceModifyDtls.parentKey.evidenceID = 0;
    eiEvidenceModifyDtls.evidenceObject = concernRoleDtls;

    // call evidence controller modify evidence method
    final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory.newInstance();

    evidenceControllerObj.modifyEvidence(eiEvidenceKey, eiEvidenceModifyDtls);
  }

  /**
   * Processes the phone numbers provided and determines if new phone number
   * records need to be created or if existing ones need to be modified.
   *
   * @param prospectPersonVO
   * The prospect persons {@link IntakeProspectPersonMappingBean}
   * containing the persons phone numbers.
   * @param concernRoleID
   * The concern role identifier for whom the phone numbers should be
   * created.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void createPhoneNumbers(
    final IntakeProspectPersonMappingBean prospectPersonVO,
    final long concernRoleID) throws AppException, InformationalException {

    PHONETYPEEntry primaryType = PHONETYPEEntry.NOT_SPECIFIED;

    final curam.core.intf.MaintainConcernRolePhone maintainConcernRolePhoneObj = curam.core.fact.MaintainConcernRolePhoneFactory.newInstance();

    final MaintainPhoneNumberKey maintainPhoneNumberKey = new MaintainPhoneNumberKey();

    maintainPhoneNumberKey.concernRoleID = concernRoleID;

    // Get a list of all phone numbers for the concern.
    final ReadMultiByConcernRoleIDPhoneResult result = maintainConcernRolePhoneObj.readmultiByConcernRole(
      maintainPhoneNumberKey);

    final Map<String, PhoneRMDtls> personalNumbers = new HashMap<String, PhoneRMDtls>();
    final Map<String, PhoneRMDtls> mobileNumbers = new HashMap<String, PhoneRMDtls>();
    final Map<String, PhoneRMDtls> buisnessNumbers = new HashMap<String, PhoneRMDtls>();
    final Map<String, PhoneRMDtls> otherNumbers = new HashMap<String, PhoneRMDtls>();

    // Group the phone numbers by type. Only grouping types of interest, i.e.
    // types that where entered in the script.
    for (final PhoneRMDtls phoneRMDtls : result.details.dtls) {

      if (PHONETYPEEntry.get(phoneRMDtls.typeCode).equals(
        PHONETYPEEntry.PERSONAL)) {

        personalNumbers.put(phoneRMDtls.phoneAreaCode + phoneRMDtls.phoneNumber,
          phoneRMDtls);

      } else if (PHONETYPEEntry.get(phoneRMDtls.typeCode).equals(
        PHONETYPEEntry.MOBILE)) {

        mobileNumbers.put(phoneRMDtls.phoneAreaCode + phoneRMDtls.phoneNumber,
          phoneRMDtls);

      } else if (PHONETYPEEntry.get(phoneRMDtls.typeCode).equals(
        PHONETYPEEntry.BUSINESS)) {

        buisnessNumbers.put(phoneRMDtls.phoneAreaCode + phoneRMDtls.phoneNumber,
          phoneRMDtls);

      } else if (PHONETYPEEntry.get(phoneRMDtls.typeCode).equals(
        PHONETYPEEntry.OTHER)) {

        otherNumbers.put(phoneRMDtls.phoneAreaCode + phoneRMDtls.phoneNumber,
          phoneRMDtls);
      }

      // Record the primary phone number type
      if (phoneRMDtls.primaryInd) {
        primaryType = PHONETYPEEntry.get(phoneRMDtls.typeCode);
      }

    }

    // Process the home phone number.
    processPhoneNumber(prospectPersonVO.getHomePhone(), concernRoleID,
      PHONETYPEEntry.PERSONAL, personalNumbers, primaryType);

    // Process the cell phone number.
    processPhoneNumber(prospectPersonVO.getCellPhone(), concernRoleID,
      PHONETYPEEntry.MOBILE, mobileNumbers, primaryType);

    // Process the work phone number.
    processPhoneNumber(prospectPersonVO.getWorkPhone(), concernRoleID,
      PHONETYPEEntry.BUSINESS, buisnessNumbers, primaryType);

    // Process the other phone number.
    processPhoneNumber(prospectPersonVO.getOtherPhone(), concernRoleID,
      PHONETYPEEntry.OTHER, otherNumbers, primaryType);

  }

  /**
   * Processes the current phone number to see if it needs to be recorded
   * against the person, and if so does it need to be marked as primary.
   *
   * @param phoneNumberMappingBean
   * The bean containing the phone number details.
   * @param concernRoleID
   * The concern associated with the phone number.
   * @param type
   * The {@link PHONETYPEEntry} of the phone number.
   * @param existingNumbers
   * A <code>Map</code> of all phone numbers record against the concern
   * which are of the same type to be processed.
   * @param primaryType
   * The {@link PHONETYPEEntry} of the existing primary phone number.
   *
   * @throws AppException
   * Generic Exception Signature.
   * @throws InformationalException
   * Generic Exception Signature.
   */
  private void processPhoneNumber(
    final PhoneNumberMappingBean phoneNumberMappingBean,
    final long concernRoleID, final PHONETYPEEntry type,
    final Map<String, PhoneRMDtls> existingNumbers,
    final PHONETYPEEntry primaryType) throws AppException,
      InformationalException {

    boolean processingPrimaryNumberType = false;

    if (type.equals(primaryType)) {
      processingPrimaryNumberType = true;
    }

    if (phoneNumberMappingBean != null) {

      // If a number matching this area code, phone number and type already
      // exists, no need to process it further
      final String phoneNumber = phoneNumberMappingBean.getAreaCode()
        + phoneNumberMappingBean.getPhoneNumber();

      if (!existingNumbers.containsKey(phoneNumber)) {

        // If the phone number does not exist, create it.
        final long phoneNumberID = createPhoneNumber(phoneNumberMappingBean,
          concernRoleID, type);

        // Only attempt to make this phone number the person's primary
        // number if configured to do so, and if it is of the same type as the
        // existing primary number.
        if (updatePersonPrimaryContactDetails() && processingPrimaryNumberType) {
          updateConcernRolePriPhone(phoneNumberID, concernRoleID);
        }

      }
    }
  }

  /**
   * Updates a concern roles phone number to the phone number supplied.
   *
   * @param phoneNumberID
   * The identifier for the phone number to be set as primary.
   * @param concernRoleID
   * The concern role associated to the phone number.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void updateConcernRolePriPhone(final long phoneNumberID,
    final long concernRoleID) throws AppException, InformationalException {

    // amend concern role record to set primary phone number ID
    final curam.core.intf.ConcernRole concernRoleObj = curam.core.fact.ConcernRoleFactory.newInstance();

    final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = concernRoleID;

    final ConcernRoleDtls concernRoleDtls = concernRoleObj.read(concernRoleKey,
      true);

    concernRoleDtls.primaryPhoneNumberID = phoneNumberID;

    updateConcernRoleEvidence(concernRoleKey, concernRoleDtls);
  }

  /**
   * Creates a phone number for the specified concern.
   *
   * @param phoneNumberVO
   * The {@link PhoneNumberMappingBean}containing the phone number
   * details.
   * @param concernRoleID
   * The concern role identifier for whom the phone number should be
   * created.
   * @param phoneType
   * The {@link PHONETYPEEntry} that should be created.
   *
   * @return the unique identifier for the phone number just created.
   *
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private long createPhoneNumber(final PhoneNumberMappingBean phoneNumberVO,
    final long concernRoleID, final PHONETYPEEntry phoneType)
    throws AppException, InformationalException {

    final curam.core.intf.MaintainPhoneNumber maintainPhoneNumberObj = curam.core.fact.MaintainPhoneNumberFactory.newInstance();

    final PhoneNumberDetails phoneNumberDetails = new PhoneNumberDetails();

    phoneNumberDetails.phoneAreaCode = phoneNumberVO.getAreaCode();
    phoneNumberDetails.phoneNumber = phoneNumberVO.getPhoneNumber();
    phoneNumberDetails.comments = CuramConst.gkEmpty;

    maintainPhoneNumberObj.createPhoneNumber(phoneNumberDetails);

    final long phoneNumberID = phoneNumberDetails.phoneNumberID;

    final curam.core.intf.ConcernRolePhoneNumber concernRolePhoneNumberObj = curam.core.fact.ConcernRolePhoneNumberFactory.newInstance();

    final ConcernRolePhoneNumberDtls concernRolePhoneNumberDtls = new ConcernRolePhoneNumberDtls();

    concernRolePhoneNumberDtls.concernRoleID = concernRoleID;
    concernRolePhoneNumberDtls.phoneNumberID = phoneNumberID;
    concernRolePhoneNumberDtls.startDate = Date.getCurrentDate();
    concernRolePhoneNumberDtls.endDate = curam.util.type.Date.kZeroDate;
    concernRolePhoneNumberDtls.typeCode = phoneType.getCode();

    // BEGIN, CR00369959, KR
    final ParticipantPhoneDetails participantPhoneDetails = new ParticipantPhoneDetails();

    participantPhoneDetails.assign(concernRolePhoneNumberDtls);
    participantPhoneDetails.phoneAreaCode = phoneNumberVO.getAreaCode();
    participantPhoneDetails.phoneCountryCode = phoneNumberVO.getAreaCode();
    participantPhoneDetails.phoneNumber = phoneNumberVO.getAreaCode();
    
    final PDCPhoneNumber pdcPhoneNumber = PDCPhoneNumberFactory.newInstance();

    pdcPhoneNumber.insert(participantPhoneDetails);
    // END, CR00369959, KR
    
    return phoneNumberID;
  }

  private void createRelationships(
    final List<IntakeRelationshipMappingBean> relationships)
    throws AppException, InformationalException {

    final Iterator<IntakeRelationshipMappingBean> relationshipIter = relationships.iterator();

    final MaintainConcernRoleRelationships relationshipObj = MaintainConcernRoleRelationshipsFactory.newInstance();

    final MaintainConcernRoleRelationshipDetails details = new MaintainConcernRoleRelationshipDetails();

    while (relationshipIter.hasNext()) {

      final IntakeRelationshipMappingBean relationshipVO = relationshipIter.next();

      final long personID = relationshipVO.getPersonID();
      final long relatedPersonID = relationshipVO.getRelatedPersonID();

      if (hasRelationshipBeenCreated(relationshipVO)) {
        continue;
      }

      // Mapping of concerns appear to be the wrong way around, however they
      // do map correctly.
      details.relConcernRoleID = dataStoreCEFMappings.getMappedProspectPerson(personID).getConcernRoleID();

      details.concernRoleID = dataStoreCEFMappings.getMappedProspectPerson(relatedPersonID).getConcernRoleID();

      details.relationshipType = relationshipVO.getRelationshipType().getCode();

      details.startDate = getRelationshipStartDate(relationshipVO);

      // BEGIN, CR00369959, KR
      
      final ParticipantRelationshipDetails participantRelationshipDetails = new ParticipantRelationshipDetails();

      participantRelationshipDetails.assign(details);
      
      final PDCRelationships pdcRelationships = PDCRelationshipsFactory.newInstance();

      pdcRelationships.insert(participantRelationshipDetails);
      // END, CR00369959, KR
      applicationEventsDispatcher.get(ApplicationEvents.class).relationshipCreated(
        details, relationshipVO);

      addRelationshipToMap(relationshipVO);

    }
  }

  /**
   * Adds the relationship bean to a persons list of relations in order to track
   * existing ones.
   *
   * @param relationshipBean
   * The {@link IntakeRelationshipMappingBean} containing the
   * relationship information.
   */
  private void addRelationshipToMap(
    final IntakeRelationshipMappingBean relationshipBean) {

    final Long personIDObj = relationshipBean.getPersonID();

    if (relationshipMap.containsKey(personIDObj)) {

      // The person is already in the map so update their list of relationships.
      final List<IntakeRelationshipMappingBean> relationships = relationshipMap.get(
        personIDObj);

      relationships.add(relationshipBean);

      relationshipMap.put(personIDObj, relationships);

    } else {
      // The person is not in the map, so add them and this relationship
      final List<IntakeRelationshipMappingBean> relationships = new ArrayList<IntakeRelationshipMappingBean>();

      relationships.add(relationshipBean);

      relationshipMap.put(personIDObj, relationships);

    }

  }

  /**
   * Checks to see if a relationship matching the details of the specified
   * {@link IntakeRelationshipMappingBean} has already been created.
   *
   * @param relationshipBean
   * The {@link IntakeRelationshipMappingBean} containing the
   * relationship information.
   *
   * @return true, if the relationship has already been created, otherwise
   * false.
   */
  private boolean hasRelationshipBeenCreated(
    final IntakeRelationshipMappingBean relationshipBean) {

    final Long personIDObj = relationshipBean.getPersonID();

    if (relationshipMap.containsKey(personIDObj)) {

      final List<IntakeRelationshipMappingBean> relationships = relationshipMap.get(
        personIDObj);

      if (relationships.contains(relationshipBean)) {
        return true;
      } else {
        return false;
      }

    }

    return false;
  }

  /**
   * Retrieves the relationship start date from the relationship datastore
   * entity via its {@link IntakeRelationshipMappingBean}. If the start date is
   * null, i.e. not entered, the current date is returned.
   *
   * @param intakeRelationshipMappingBean
   * The {@link IntakeRelationshipMappingBean} containing the
   * relationship information.
   *
   * @return the relationship start date, if this date is null in the datastore
   * the current date is returned.
   */
  private Date getRelationshipStartDate(
    final IntakeRelationshipMappingBean intakeRelationshipMappingBean) {

    if (intakeRelationshipMappingBean.getStartDate() == null) {
      return Date.getCurrentDate();
    }
    return intakeRelationshipMappingBean.getStartDate();
  }

  /**
   * This will check to see if this person is the primary client. (Used when
   * setting up integrated case)
   */
  private boolean isPrimaryClient(
    final IntakeProspectPersonMappingBean prospectPerson) {
    return prospectPerson.primaryClientInd;
  }

  private long createIntegratedCaseAndCaseParticipantRoles(final long caseID)
    throws AppException, InformationalException {

    // modify the status to be 'Application'
    final CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
    final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

    caseHeaderKey.caseID = caseID;

    final CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

    final curam.core.sl.entity.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.entity.fact.CaseParticipantRoleFactory.newInstance();

    // Key to read the case participant role ID of the primary client
    final ReadByParticipantRoleTypeAndCaseKey key = new ReadByParticipantRoleTypeAndCaseKey();

    key.caseID = caseID;
    key.recordStatus = RECORDSTATUSEntry.NORMAL.getCode();
    key.typeCode = CASEPARTICIPANTROLETYPEEntry.PRIMARY.getCode();
    key.participantRoleID = caseHeaderDtls.concernRoleID;

    final long caseParticipantRoleID = caseParticipantRoleObj.readByParticipantRoleTypeAndCase(key).caseParticipantRoleID;

    dataStoreCEFMappings.getPrimaryClient().addCaseParticipantRoleID(caseID,
      caseParticipantRoleID);

    // add other case participants (if any)
    if (dataStoreCEFMappings.getNonPrimaryProspectPersons().size() > 0) {

      final CaseParticipantRoleDtls caseParticipantRoleDtls = new CaseParticipantRoleDtls();

      caseParticipantRoleDtls.caseID = caseHeaderDtls.caseID;
      caseParticipantRoleDtls.fromDate = caseHeaderDtls.startDate;
      caseParticipantRoleDtls.toDate = caseHeaderDtls.endDate;
      caseParticipantRoleDtls.typeCode = CASEPARTICIPANTROLETYPEEntry.MEMBER.getCode();

      for (final MappedProspectPersonInternal mappedProspectPerson : dataStoreCEFMappings.getNonPrimaryProspectPersonsInternal()) {

        caseParticipantRoleDtls.participantRoleID = mappedProspectPerson.getConcernRoleID();
        caseParticipantRoleObj.insert(caseParticipantRoleDtls);

        // populate mapping object with caseParticipantRole
        mappedProspectPerson.addCaseParticipantRoleID(caseHeaderDtls.caseID,
          caseParticipantRoleDtls.caseParticipantRoleID);
      }
    }

    return caseHeaderDtls.caseID;
  }

  private MappedProspectPersonInternal createProspectPerson(
    final IntakeProspectPersonMappingBean prospectPerson, final long caseID,
    final Application application) throws AppException,
      InformationalException {

    final MappedProspectPersonInternal mappedProspectPerson = mappedPersonProvider.get();

    final ProspectPersonRegistrationDtls prospectPersonRegistrationDtls = prospectPerson.getProspectPersonDetails();

    final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

    caseHeaderKey.caseID = caseID;
    final CaseHeaderDtls caseHeaderDtls = CaseHeaderFactory.newInstance().read(
      caseHeaderKey);

    final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = caseHeaderDtls.concernRoleID;

    final ConcernRoleDtls concernRoleDtls = ConcernRoleFactory.newInstance().read(
      concernRoleKey);

    final boolean isPrimaryClientAProspect = concernRoleDtls.concernRoleType.equals(
      CONCERNROLETYPEEntry.PROSPECTPERSON.getCode());

    boolean ssnEntered = false;

    // if a social security number has not been entered for this person do
    // nothing.
    if (!StringHelper.isEmpty(
      prospectPersonRegistrationDtls.socialSecurityNumber)) {

      ssnEntered = true;
    }

    // if the surname, other fore name and first fore name
    // is null, a null pointer exception will be raised
    // in the AlternateName class. Therefore, if it is null, set it
    // to an empty string instead.

    if (prospectPersonRegistrationDtls.otherForename == null) {
      prospectPersonRegistrationDtls.otherForename = CuramConst.gkEmpty;
    }
    if (prospectPersonRegistrationDtls.firstForename == null) {
      prospectPersonRegistrationDtls.firstForename = CuramConst.gkEmpty;
    }
    if (prospectPersonRegistrationDtls.surname == null) {
      prospectPersonRegistrationDtls.surname = CuramConst.gkEmpty;
    }

    if (!isPrimaryClient(prospectPerson)) {
      if (!duplicateSSNExists(
          prospectPersonRegistrationDtls.socialSecurityNumber)) {
      curam.core.facade.struct.PersonRegistrationDetails details = new curam.core.facade.struct.PersonRegistrationDetails();

      details.personRegistrationDetails.addressData = prospectPersonRegistrationDtls.addressData;
      details.personRegistrationDetails.firstForename = prospectPersonRegistrationDtls.firstForename;
      details.personRegistrationDetails.sex = prospectPersonRegistrationDtls.gender;
      details.personRegistrationDetails.surname = prospectPersonRegistrationDtls.surname;
      details.personRegistrationDetails.addressType = prospectPersonRegistrationDtls.addressType;
      details.personRegistrationDetails.dateOfBirth = prospectPersonRegistrationDtls.dateOfBirth;
      details.personRegistrationDetails.mailingAddressData = prospectPersonRegistrationDtls.mailingAddressData;
      details.personRegistrationDetails.otherForename = prospectPersonRegistrationDtls.otherForename;
      details.personRegistrationDetails.registrationDate = Date.getCurrentDate();

      PersonRegistrationResult registrationResult = PersonFactory.newInstance().register(
        details);
      AlternateIDDetails alternateIDDetails = null;
      MaintainConcernRoleAltID maintainConcernRoleAltIDObj = MaintainConcernRoleAltIDFactory.newInstance();
      MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();
      maintainConcernRoleAltIDKey.concernRoleID = registrationResult.registrationIDDetails.concernRoleID;
        alternateIDDetails = new AlternateIDDetails();
        alternateIDDetails.concernRoleID = registrationResult.registrationIDDetails.concernRoleID;
        alternateIDDetails.typeCode = CONCERNROLEALTERNATEID.INSURANCENUMBER;
        alternateIDDetails.startDate = Date.getCurrentDate();
        alternateIDDetails.statusCode = RECORDSTATUS.NORMAL;
        alternateIDDetails.primaryAlternateInd = true;
        alternateIDDetails.alternateID =  prospectPersonRegistrationDtls.socialSecurityNumber;
        maintainConcernRoleAltIDObj.createAlternateID(maintainConcernRoleAltIDKey, alternateIDDetails);
      
      
      mappedProspectPerson.setConcernRoleID(registrationResult.registrationIDDetails.concernRoleID);
      mappedProspectPerson.setDataStoreID(prospectPerson.getUniqueID());
      mappedProspectPerson.setReference(registrationResult.registrationIDDetails.alternateID);
      }

      else{
      // Prospect Person Registration object
      final curam.core.sl.intf.RegisterProspectPerson registerProspectPersonObj = curam.core.sl.fact.RegisterProspectPersonFactory.newInstance();
      // Register Prospect Person
      final RegistrationIDDetails registrationIDDetails = registerProspectPersonObj.registerProspectPerson(
        prospectPersonRegistrationDtls);
      mappedProspectPerson.setConcernRoleID(registrationIDDetails.concernRoleID);
      mappedProspectPerson.setDataStoreID(prospectPerson.getUniqueID());
      mappedProspectPerson.setReference(registrationIDDetails.alternateID);
      
      createIntakeApplicant(application,
        concernRoleDAO.get(mappedProspectPerson.getConcernRoleID()));

      if (ssnEntered) {
        updateAlternateIDType(registrationIDDetails.concernRoleID);
      }
      }
    } else {

      final MaintainConcernRoleKey maintainConcernRoleKey = new MaintainConcernRoleKey();

      maintainConcernRoleKey.concernRoleID = concernRoleDtls.concernRoleID;

      if (isPrimaryClientAProspect) {

        final ProspectPersonModifyDetails prospectPersonModifyDetails = new ProspectPersonModifyDetails();

        final ProspectPersonKey prospectPersonKey = new ProspectPersonKey();

        prospectPersonKey.concernRoleID = concernRoleDtls.concernRoleID;
        final ProspectPersonDtls prospectPersonDtls = ProspectPersonFactory.newInstance().read(
          prospectPersonKey);

        prospectPersonModifyDetails.concernRoleID = concernRoleDtls.concernRoleID;
        prospectPersonModifyDetails.versionNo = prospectPersonDtls.versionNo;
        prospectPersonModifyDetails.sensitivity = SENSITIVITYEntry.DEFAULT().getCode();
        
        mapData(prospectPersonRegistrationDtls, prospectPersonModifyDetails);
        
        // BEGIN, CR00369959, KR
        final PDCProspectPersonDetails pdcProspectPersonDetails = new PDCProspectPersonDetails();

        pdcProspectPersonDetails.assign(prospectPersonModifyDetails);
        
        // BEGIN, CGISS5809, KR
        if (PDCUtilFactory.newInstance().getPDCEnabledFlag().enabled) {

          if (!getEvidenceRequired(concernRoleKey, PDCConst.PDCBIRTHANDDEATH)) {
            createBirthAndDeathEvidence(pdcProspectPersonDetails);  
          }

          if (!getEvidenceRequired(concernRoleKey, PDCConst.PDCGENDER)) {

            if (pdcProspectPersonDetails.gender.equals("")) {
              pdcProspectPersonDetails.gender = GENDER.DEFAULTCODE;
            }

            createGenderEvidence(pdcProspectPersonDetails);
          }

          if (!getEvidenceRequired(concernRoleKey,
            PDCConst.PDCCONTACTPREFERENCES)) {
            createContactPreferencesEvidence(pdcProspectPersonDetails);
          }
        }
        
        final PDCProspectPerson pdcProspectPerson = PDCProspectPersonFactory.newInstance();

        pdcProspectPerson.modify(pdcProspectPersonDetails);
        
        // END, CGISS5809, KR
        // END, CR00369959, KR

      } else {

        if (personDetailsUpdateEnabled()) {

          final PersonModifyDtls personModifyDtls = mapPersonsExistingDetailsToModifyStruct(
            concernRoleKey.concernRoleID);

          mapData(prospectPersonRegistrationDtls, personModifyDtls);

          MaintainPersonFactory.newInstance().modifyPerson(
            maintainConcernRoleKey, personModifyDtls);
        }
      }

     processAddress(prospectPersonRegistrationDtls, concernRoleDtls);

      mappedProspectPerson.setConcernRoleID(concernRoleDtls.concernRoleID);
      mappedProspectPerson.setDataStoreID(prospectPerson.getUniqueID());
      mappedProspectPerson.setReference(concernRoleDtls.primaryAlternateID);

      if (ssnEntered) {
        updatePrimaryClientAlternateID(caseHeaderDtls.concernRoleID,
          prospectPersonRegistrationDtls.socialSecurityNumber,
          isPrimaryClientAProspect);
      }

      if (isPrimaryClient(prospectPerson)) {
        mappedProspectPerson.setPrimaryClientInd(true);
      }

    }

    // only update the alternate ID type if an SSN has been set
    return mappedProspectPerson;
  }

  // BEGIN, CGISS5809, KR
  /**
   * Determines the evidence is available for the concern role.
   *
   * @param concernRoleKey Unique identifier of the concern role
   * @param evidenceType Type of the evidence.
   *
   * @return weather evidence is available or not
   *
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private boolean getEvidenceRequired(final ConcernRoleKey concernRoleKey, String evidenceType) throws AppException, InformationalException {

    boolean isEvidenceRequired = false;

    PDCUtil pdcUtil = PDCUtilFactory.newInstance();    
    PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil.getPDCCaseIDCaseParticipantRoleID(
      concernRoleKey);
      
    curam.core.struct.CaseKey caseKey = new curam.core.struct.CaseKey();

    caseKey.caseID = pdcCaseIDCaseParticipantRoleID.caseID;
      
    EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory.newInstance();
    ECActiveEvidenceDtlsList ecActiveEvidenceDtlsList = evidenceControllerObj.listActive(
      caseKey);

    for (ECActiveEvidenceDtls ecActiveEvidenceDtls : ecActiveEvidenceDtlsList.dtls) {

      if (ecActiveEvidenceDtls.evidenceType.equals(evidenceType)) {
        isEvidenceRequired = true;
      }
    }
    return isEvidenceRequired;
  }

  /**
   * Inserts the Participant Birth and Death evidence on the PDC case.
   *
   * @param details Participant Birth and Death evidence details to be 
   * inserted.
   */  
  private void createBirthAndDeathEvidence(PDCProspectPersonDetails details) 
    throws AppException, InformationalException {

    ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = details.concernRoleID;
    
    // Get the PDC case id and primary case participant role for that case.
    PDCUtil pdcUtil = PDCUtilFactory.newInstance();    
    PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil.getPDCCaseIDCaseParticipantRoleID(
      concernRoleKey);
    
    final EvidenceTypeKey eType = new EvidenceTypeKey();

    eType.evidenceType = PDCConst.PDCBIRTHANDDEATH;

    final EvidenceTypeDef evidenceType = etDefDAO.readActiveEvidenceTypeDefByTypeCode(
      eType.evidenceType);        

    EvidenceTypeVersionDef evTypeVersion = etVerDefDAO.getActiveEvidenceTypeVersionAtDate(
      evidenceType, curam.util.type.Date.getCurrentDate());

    DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory.newInstance(
      evTypeVersion);
    
    DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kPersonAttrName);

    DynamicEvidenceTypeConverter.setAttribute(participant,
      pdcCaseIDCaseParticipantRoleID.caseParticipantRoleID);  
    
    assignBirthAndDeathEvidenceDetails(details, dynamicEvidenceDataDetails);

    EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory.newInstance();
      
    // Call the EvidenceController object and insert evidence    
    EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

    evidenceDescriptorInsertDtls.participantID = details.concernRoleID;
    evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
    evidenceDescriptorInsertDtls.receivedDate = Date.getCurrentDate();
    evidenceDescriptorInsertDtls.caseID = pdcCaseIDCaseParticipantRoleID.caseID;                           
    
    // Evidence Interface details
    EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

    eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
    eiEvidenceInsertDtls.descriptor.participantID = details.concernRoleID;
    eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
    eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

    evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);
  }  
  
  /**
   * Assigns participant's birth and death details to the dynamic evidence data 
   * struct.
   *
   * @param details Participant birth and death details.
   * @param dynamicEvidenceDataDetails Dynamic evidence details.
   */ 
  private void assignBirthAndDeathEvidenceDetails(PDCProspectPersonDetails details,
    DynamicEvidenceDataDetails dynamicEvidenceDataDetails)
    throws AppException {
    DynamicEvidenceDataAttributeDetails birthLastName = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kBirthLastNameAttrName);

    DynamicEvidenceTypeConverter.setAttribute(birthLastName,
      details.personBirthName);

    DynamicEvidenceDataAttributeDetails mothersBirthLastName = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kMothersBirthLastNameAttrName);

    DynamicEvidenceTypeConverter.setAttribute(mothersBirthLastName,
      details.motherBirthSurname);
    
    DynamicEvidenceDataAttributeDetails dateOfBirth = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kDateOfBirthAttrName);

    if (!details.dateOfBirth.isZero()) {
      DynamicEvidenceTypeConverter.setAttribute(dateOfBirth,
        details.dateOfBirth);
    } else {
      dateOfBirth.setValue(StringHelper.EMPTY_STRING);
    }
    
    DynamicEvidenceDataAttributeDetails dateOfDeath = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kDateOfDeathAttrName);
    
    if (!details.dateOfDeath.isZero()) {
      DynamicEvidenceTypeConverter.setAttribute(dateOfDeath,
        details.dateOfDeath);    
    } else {
      dateOfDeath.setValue(StringHelper.EMPTY_STRING);
    }

  }
  
  /**
   * Inserts the Participant Gender evidence on the PDC case.
   *
   * @param details Participant Gender evidence details to be inserted.
   */  
  private void createGenderEvidence(PDCProspectPersonDetails details) 
    throws AppException, InformationalException {

    ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = details.concernRoleID;
    
    // Get the PDC case id and primary case participant role for that case.
    PDCUtil pdcUtil = PDCUtilFactory.newInstance();    
    PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil.getPDCCaseIDCaseParticipantRoleID(
      concernRoleKey);
    
    final EvidenceTypeKey eType = new EvidenceTypeKey();

    eType.evidenceType = PDCConst.PDCGENDER;

    final EvidenceTypeDef evidenceType = etDefDAO.readActiveEvidenceTypeDefByTypeCode(
      eType.evidenceType);        

    EvidenceTypeVersionDef evTypeVersion = etVerDefDAO.getActiveEvidenceTypeVersionAtDate(
      evidenceType, curam.util.type.Date.getCurrentDate());

    DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory.newInstance(
      evTypeVersion);
    
    DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kPersonAttrName);

    DynamicEvidenceTypeConverter.setAttribute(participant,
      pdcCaseIDCaseParticipantRoleID.caseParticipantRoleID);  
    
    assignGenderEvidenceDetails(details, dynamicEvidenceDataDetails);

    EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory.newInstance();
      
    // Call the EvidenceController object and insert evidence    
    EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

    evidenceDescriptorInsertDtls.participantID = details.concernRoleID;
    evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
    evidenceDescriptorInsertDtls.receivedDate = Date.getCurrentDate();
    evidenceDescriptorInsertDtls.caseID = pdcCaseIDCaseParticipantRoleID.caseID;                           
    
    // Evidence Interface details
    EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

    eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
    eiEvidenceInsertDtls.descriptor.participantID = details.concernRoleID;
    eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
    eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

    evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);
  }
  
  /**
   * Assigns participant's gender details to the dynamic evidence data struct.
   *
   * @param details Participant gender details.
   * @param dynamicEvidenceDataDetails Dynamic evidence details.
   */ 
  private void assignGenderEvidenceDetails(PDCProspectPersonDetails details,
    DynamicEvidenceDataDetails dynamicEvidenceDataDetails)
    throws AppException {
    
    DynamicEvidenceDataAttributeDetails gender = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kGenderAttrName);

    DynamicEvidenceTypeConverter.setAttribute(gender,
      new CodeTableItem(GENDER.TABLENAME, details.gender));
    
  }
  
  /**
   * Inserts the Participant Contact Preferences evidence on the PDC case.
   *
   * @param details Participant Contact Preferences evidence details to be 
   * inserted.
   */  
  private void createContactPreferencesEvidence(PDCProspectPersonDetails details) 
    throws AppException, InformationalException {

    ConcernRoleKey concernRoleKey = new ConcernRoleKey();

    concernRoleKey.concernRoleID = details.concernRoleID;
    
    // Get the PDC case id and primary case participant role for that case.
    PDCUtil pdcUtil = PDCUtilFactory.newInstance();    
    PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil.getPDCCaseIDCaseParticipantRoleID(
      concernRoleKey);
    
    final EvidenceTypeKey eType = new EvidenceTypeKey();

    eType.evidenceType = PDCConst.PDCCONTACTPREFERENCES;

    final EvidenceTypeDef evidenceType = etDefDAO.readActiveEvidenceTypeDefByTypeCode(
      eType.evidenceType);        

    EvidenceTypeVersionDef evTypeVersion = etVerDefDAO.getActiveEvidenceTypeVersionAtDate(
      evidenceType, curam.util.type.Date.getCurrentDate());

    DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory.newInstance(
      evTypeVersion);
    
    DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kParticipantAttrName);

    DynamicEvidenceTypeConverter.setAttribute(participant,
      pdcCaseIDCaseParticipantRoleID.caseParticipantRoleID);  
    
    assignContactPreferencesEvidenceDetails(details, dynamicEvidenceDataDetails);

    EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory.newInstance();
      
    // Call the EvidenceController object and insert evidence    
    EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

    evidenceDescriptorInsertDtls.participantID = details.concernRoleID;
    evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
    evidenceDescriptorInsertDtls.receivedDate = Date.getCurrentDate();
    evidenceDescriptorInsertDtls.caseID = pdcCaseIDCaseParticipantRoleID.caseID;                           
    
    // Evidence Interface details
    EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

    eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
    eiEvidenceInsertDtls.descriptor.participantID = details.concernRoleID;
    eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
    eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

    evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);
  }
  
  // ___________________________________________________________________________
  /**
   * Assigns participant's contact preferences to the dynamic evidence data 
   * struct.
   *
   * @param details Participant contact preferences details.
   * @param dynamicEvidenceDataDetails Dynamic evidence details.
   */ 
  private void assignContactPreferencesEvidenceDetails(PDCProspectPersonDetails details,
    DynamicEvidenceDataDetails dynamicEvidenceDataDetails)
    throws AppException {
    
    DynamicEvidenceDataAttributeDetails preferedLanguage = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kPreferredLanguageAttrName);

    DynamicEvidenceTypeConverter.setAttribute(preferedLanguage,
      new CodeTableItem(LANGUAGE.TABLENAME, details.preferredLanguage));
    
    DynamicEvidenceDataAttributeDetails preferedCommunication = dynamicEvidenceDataDetails.getAttribute(
      IntakeConst.kPreferredCommunicationAttrName);

    DynamicEvidenceTypeConverter.setAttribute(preferedCommunication,
      new CodeTableItem(COMMUNICATIONMETHOD.TABLENAME, details.prefCommMethod));
    
  }

  // END, CGISS5809, KR
  
  /**
   * Determines if the person is the primary applicant and if the specified 
   * duplicate alternate ID belongs to them. If both conditions are true then
   * true is returned other false.   
   *
   * @param prospectPerson The person being assessed. 
   * @param concern role The concern role ID of the person being assessed.
   * @param alternateID The duplicate alternate ID..
   *
   * @return <code>True</code> if the person is the primary applicant and the
   * owner of the duplicate alternate ID, otherwise <code>false</code>.
   *
   * @throws AppException
   * @throws InformationalException
   */
  private boolean isPersonPrimaryAndOwnerOfDuplicateID(
    final IntakeProspectPersonMappingBean prospectPerson, final long concernrole,
    final String alternateID) throws AppException, InformationalException {
 
    boolean returnVal = false;

    if (isPrimaryClient(prospectPerson)) {
      
      final curam.core.intf.ConcernRoleAlternateID concernRoleAlternateIDObj = curam.core.fact.ConcernRoleAlternateIDFactory.newInstance();
      
      final ConcernRoleIDStatusCodeKey key = new ConcernRoleIDStatusCodeKey();

      key.concernRoleID = concernrole;
      key.statusCode = RECORDSTATUS.NORMAL;

      final AlternateIDReadmultiDtlsList list = concernRoleAlternateIDObj.searchByConcernRoleIDAndStatus(
        key);
      
      for (final AlternateIDReadmultiDtls dtls : list.dtls) {
        
        if (dtls.alternateID.equals(alternateID)) {
          returnVal = true;
          break;
        }
      }

    }
    
    return returnVal;
  }

  /**
   * Process the address data, if person's current primary address is the same
   * as the specified address data(i.e. supplied in the script), no new address
   * is created, otherwise a new address is created.
   *
   * @param prospectPersonRegistrationDtls
   * The person details provided in the script.
   * @param concernRoleDtls
   * The concern for whom the address data belongs.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void processAddress(
    final ProspectPersonRegistrationDtls prospectPersonRegistrationDtls,
    final ConcernRoleDtls concernRoleDtls) throws AppException,
      InformationalException {

    final curam.core.intf.MaintainConcernRoleAddress maintainConcernRoleAddressObj = curam.core.fact.MaintainConcernRoleAddressFactory.newInstance();

    final MaintainAddressKey maintainAddressKey = new MaintainAddressKey();

    // Get concern role ID from key
    maintainAddressKey.concernRoleID = concernRoleDtls.concernRoleID;

    final AddressForConcernRoleKey addressForConcernRoleKey = new AddressForConcernRoleKey();

   
    addressForConcernRoleKey.concernRoleID = concernRoleDtls.concernRoleID;

  
   
    AddressReadMultiKey paramAddressReadMultiKey = new AddressReadMultiKey();
    paramAddressReadMultiKey.concernRoleID =  concernRoleDtls.concernRoleID;
    final AddressReadMultiDtlsList addressDtlsList = ConcernRoleAddressFactory.newInstance().searchAddressesByConcernRole(paramAddressReadMultiKey);
    for (AddressReadMultiDtls addressDtls :addressDtlsList.dtls.items()){
      
    final ConcernRoleAddress concernRoleAddress = concernRoleAddressDAO.get(
      addressDtls.concernRoleAddressID);

    AddressDataFactory.newInstance();

  
    final String existingAddress = formatExistingAddressForComparsion(
      concernRoleAddress.getAddress().getAddressData());

    // If the address from the script is not the same as the current primary
    // address add a new one, otherwise ignore.
    if(addressDtls.typeCode.equals(CONCERNROLEADDRESSTYPE.PRIVATE)){
      final String privateScriptAddress = formatExistingAddressForComparsion(
          prospectPersonRegistrationDtls.addressData);
    if (!privateScriptAddress.equals(existingAddress)) {

      final AddressDetails addressDetails = new AddressDetails();
      //Remove ADD3
      prospectPersonRegistrationDtls.addressData = prospectPersonRegistrationDtls.addressData.replace("ADD3=","");
      addressDetails.concernRoleID = concernRoleDtls.concernRoleID;
      addressDetails.addressData = prospectPersonRegistrationDtls.addressData;
      addressDetails.typeCode = prospectPersonRegistrationDtls.addressType;
      addressDetails.startDate = Date.getCurrentDate();

      if (updatePersonPrimaryContactDetails()) {
        addressDetails.primaryAddressInd = true;
      }

      maintainConcernRoleAddressObj.createAddress(maintainAddressKey,
        addressDetails);

    }
    }
    else if(addressDtls.typeCode.equals(CONCERNROLEADDRESSTYPE.MAILING)){
    final String privateScriptAddress = formatExistingAddressForComparsion(
        prospectPersonRegistrationDtls.mailingAddressData);
  if (!privateScriptAddress.equals(existingAddress)) {
     
    final AddressDetails mailingAddressDetails = new AddressDetails();
    prospectPersonRegistrationDtls.mailingAddressData = prospectPersonRegistrationDtls.mailingAddressData.replace("ADD3=","");
    mailingAddressDetails.addressData = prospectPersonRegistrationDtls.mailingAddressData;
    mailingAddressDetails.typeCode = CONCERNROLEADDRESSTYPE.MAILING;
    mailingAddressDetails.startDate = Date.getCurrentDate();
    maintainConcernRoleAddressObj.createAddress(maintainAddressKey,
        mailingAddressDetails);
    
  }
  }
    }
    

  }

  // NB: This method is used as part of a comparison strategy between the
  // person's existing address and the address returned from the script. It is
  // far from ideal and is only used to prevent the creation of addresses when a
  // user actually hasn't changed it via the script. A proper solution needs to
  // be implemented, i.e. proper address format in the script.
  /**
   * Formats the specified address data into the same format it is pre-populated
   * into datastore, i.e. no apt number.
   *
   * @param addressData
   * The address data to be formatted.
   *
   * @return a concatenated string of the address data.
   *
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private String formatExistingAddressForComparsion(final String addressData)
    throws AppException, InformationalException {

    String municipality=CuramConst.gkEmpty;
    String street=CuramConst.gkEmpty;
    String zone=CuramConst.gkEmpty;
    String buildingNumber=CuramConst.gkEmpty;
    String buildingType=CuramConst.gkEmpty;
    String postCode=CuramConst.gkEmpty;
    String electricityNumber=CuramConst.gkEmpty;
    String poBox = CuramConst.gkEmpty;
    String zipcode = CuramConst.gkEmpty;
    String country=CuramConst.gkEmpty;

    // declare list of <name><value> pairs

    final OtherAddressData addressDataString = new OtherAddressData();

    addressDataString.addressData = addressData;

    final curam.core.intf.AddressData addressDataObj = curam.core.fact.AddressDataFactory.newInstance();

    // convert address data string into <name><value> pairs vector
    final AddressMapList addressMapList = addressDataObj.parseDataToMap(
      addressDataString);
    
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

    /*for (int j = 0; j < addressMapList.dtls.size(); j++) {

      if (!(addressMapList.dtls.item(j).value.length() == 0)) {

        if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.CITY)) {
          city = addressMapList.dtls.item(j).value;
        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.STATE)) {
          state = addressMapList.dtls.item(j).value;
          
        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.USCOUNTY)) {
          if (addressMapList.dtls.item(j).value != CuramConst.gkEmpty) {
            county = addressMapList.dtls.item(j).value;  
          }
          
        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.ZIP)) {
          zipcode = addressMapList.dtls.item(j).value;

        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.LINE1)) {
          address1 = addressMapList.dtls.item(j).value;

        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.LINE2)) {
          address2 = addressMapList.dtls.item(j).value;

          if (address1 != CuramConst.gkEmpty) {
            address2 = address1 + CuramConst.gkComma + address2;
            // Blanking address line one (normally "App No", as per the
            // pre-population logic).
            address1 = CuramConst.gkEmpty;
          }

        } else if (addressMapList.dtls.item(j).name.equals(
          curam.codetable.ADDRESSELEMENTTYPE.LINE3)) {
          address3 = addressMapList.dtls.item(j).value;

        }
      }
    }*/

    return zone + street + buildingType + municipality + country + postCode + zipcode;

  }

  /**
   * Reads the environment variable
   * <code>ENV_APPLICATION_UPDATE_PERSON_DETAILS_FROM_SCRIPT_ENABLED</code> to
   * see if a person's details should be updated.
   *
   * @return true a person's details should be updated, otherwise false.
   */
  private boolean personDetailsUpdateEnabled() {

    final Boolean updateEnabled = new Boolean(
      curam.util.resources.Configuration.getBooleanProperty(
        curam.core.impl.EnvVars.ENV_APPLICATION_UPDATE_PERSON_DETAILS_FROM_SCRIPT_ENABLED));

    return updateEnabled;
  }

  /**
   * Maps an existing persons details to the modify person struct. This is
   * important because the person modify is not a narrow modify.
   *
   * @param concernRoleID
   * The concern role identifier for which the details need to be
   * mapped.
   * @return a populated person modify struct.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private PersonModifyDtls mapPersonsExistingDetailsToModifyStruct(
    final long concernRoleID) throws AppException, InformationalException {

    final MaintainConcernRoleKey maintainConcernRoleKey = new MaintainConcernRoleKey();

    maintainConcernRoleKey.concernRoleID = concernRoleID;

    final PersonFurtherDetails details = MaintainPersonFactory.newInstance().readFurtherDetails(
      maintainConcernRoleKey);

    final PersonModifyDtls personModifyDtls = new PersonModifyDtls();

    personModifyDtls.comments = details.comments;
    personModifyDtls.concernRoleID = details.concernRoleID;
    personModifyDtls.countryOfBirth = details.birthCountry;
    personModifyDtls.currencyType = details.currencyType;
    personModifyDtls.dateOfBirth = details.dateOfBirth;
    personModifyDtls.dateOfBirthVerInd = details.dateOfBirthVerified;
    personModifyDtls.dateOfDeath = details.dateOfDeath;
    personModifyDtls.dateOfDeathVerInd = details.dateOfDeathVerified;
    personModifyDtls.ethnicOriginCode = details.ethnicOriginCode;
    personModifyDtls.firstForename = details.firstForename;
    personModifyDtls.gender = details.sex;
    personModifyDtls.indigenousGroupCode = details.indigenousGroupCode;
    personModifyDtls.indigenousGroupName = details.indigenousGroupName;
    personModifyDtls.indigenousPersonInd = details.indigenousPersonInd;
    personModifyDtls.initials = details.initials;
    personModifyDtls.maritalStatusCode = details.statusCode;
    personModifyDtls.methodOfPmtCode = details.methodOfPmtCode;
    personModifyDtls.motherBirthSurname = details.motherBirthSurname;
    personModifyDtls.nameSuffix = details.nameSuffix;
    personModifyDtls.nationalityCode = details.nationality;
    personModifyDtls.nextPaymentDate = details.nextPaymentDate;
    personModifyDtls.otherForename = details.otherForename;
    personModifyDtls.paymentFrequency = details.paymentFrequency;
    personModifyDtls.personBirthName = details.birthName;
    personModifyDtls.placeOfBirth = details.birthPlace;
    personModifyDtls.prefCommFromDate = details.prefCommFromDate;
    personModifyDtls.prefCommMethod = details.prefCommMethod;
    personModifyDtls.prefCommToDate = details.prefCommToDate;
    personModifyDtls.preferredLanguage = details.preferredLanguage;
    personModifyDtls.prefPublicOfficeID = details.preferredPublicOfficeID;
    personModifyDtls.publicOfficeID = details.publicOfficeID;
    personModifyDtls.race = details.race;
    personModifyDtls.registrationDate = details.registrationDate;
    personModifyDtls.sensitivity = details.sensitivity;
    personModifyDtls.specialInterestCode = details.specialInterest;
    personModifyDtls.surname = details.surname;
    personModifyDtls.title = details.title;
    personModifyDtls.versionNo = details.versionNo;

    return personModifyDtls;
  }

  private void createIntakeApplicant(final Application application,
    final ConcernRole concernRole) throws InformationalException {

    // insert a new recored for the intakeApplicant for cloned
    // Application.
    final IntakeApplicant intakeApplicant = intakeApplicantDAO.newInstance();

    intakeApplicant.setConcernRole(concernRole);
    intakeApplicant.setApplication(application);
    intakeApplicant.setApplicantRole(APPLICANTROLEEntry.NON_PRIMARY_APPLICANT);
    // BEGIN,CR00264222,ZT
    intakeApplicant.setDateTime(application.getFilingDate().getDateTime());
    // END,CR00264222
    intakeApplicant.insert();

  }

  private void mapData(
    final ProspectPersonRegistrationDtls prospectPersonRegistrationDtls,
    final PersonModifyDtls personModifyDtls) {

    personModifyDtls.firstForename = prospectPersonRegistrationDtls.firstForename;
    personModifyDtls.otherForename = prospectPersonRegistrationDtls.otherForename;
    personModifyDtls.surname = prospectPersonRegistrationDtls.surname;
    personModifyDtls.dateOfBirth = prospectPersonRegistrationDtls.dateOfBirth;
    personModifyDtls.gender = prospectPersonRegistrationDtls.gender;
    personModifyDtls.maritalStatusCode = prospectPersonRegistrationDtls.maritalStatusCode;
    personModifyDtls.preferredLanguage = prospectPersonRegistrationDtls.preferredLanguage;

    // Not mapping currently because its domain is of type boolean and will
    // default to a value even if not selected. The question in the script
    // should be changed to a provide a drop down of options.

    // personModifyDtls.ethnicOriginCode =
    // prospectPersonRegistrationDtls.ethnicOriginCode;
    // personModifyDtls.race = prospectPersonRegistrationDtls.race;

  }

  private void mapData(
    final ProspectPersonRegistrationDtls prospectPersonRegistrationDtls,
    final ProspectPersonModifyDetails prospectPersonModifyDetails) {

    prospectPersonModifyDetails.firstForename = prospectPersonRegistrationDtls.firstForename;
    prospectPersonModifyDetails.otherForename = prospectPersonRegistrationDtls.otherForename;
    prospectPersonModifyDetails.surname = prospectPersonRegistrationDtls.surname;
    prospectPersonModifyDetails.dateOfBirth = prospectPersonRegistrationDtls.dateOfBirth;
    prospectPersonModifyDetails.gender = prospectPersonRegistrationDtls.gender;
    prospectPersonModifyDetails.maritalStatusCode = prospectPersonRegistrationDtls.maritalStatusCode;
    prospectPersonModifyDetails.ethnicOriginCode = prospectPersonRegistrationDtls.ethnicOriginCode;
    prospectPersonModifyDetails.preferredLanguage = prospectPersonRegistrationDtls.preferredLanguage;
    // BEGIN, CR00369959, KR
    prospectPersonModifyDetails.registrationDate = prospectPersonRegistrationDtls.registrationDate;
    // END, CR00369959, KR
  }

  /**
   * Updates the primary clients alternate ID under the follow conditions:
   *
   * <ol>
   * <li>For a Primary client of type Prospect:
   * <ul>
   * <li>If an alternate ID of type
   * {@link EnvVars#ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE} exists for
   * the prospect, update that record with the correct value.</li>
   * <li>If no alternate ID of type
   * {@link EnvVars#ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE} exists for
   * that prospect create one and mark it as primary.</li>
   * </ul>
   * </li>
   * <li>For a Primary client of type Person:
   * <ul>
   * <li>If the person has no alternate ID of type
   * {@link EnvVars#ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE}, create one
   * and mark it as primary.</li>
   * <li>If the person has an alternate ID of type
   * {@link EnvVars#ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE}, update the
   * record with the new alternate if
   * {@link EnvVars#ENV_APPLICATION_UPDATE_PERSON_DETAILS_FROM_SCRIPT_ENABLED}.
   * However if the alternate ID has ended, create a new alternate ID for the
   * person.</li>
   * </ul>
   * </li> </ul>
   *
   * @param concernRoleID
   * The identifier for the newly created Prospect Person whose id is
   * to be altered.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void updatePrimaryClientAlternateID(final long concernRoleID,
    final String alternateID, final boolean personIsProspect)
    throws AppException, InformationalException {

    // If the alternate id is empty do nothing!
    if (!StringHelper.isEmpty(alternateID)) {
      final String alternateIDType = getConfigurationAlternateIDType();

      if (alternateIDType == null) {
        return;
      }

      final curam.core.intf.MaintainConcernRoleAltID maintainConcernRoleAltIDObj = curam.core.fact.MaintainConcernRoleAltIDFactory.newInstance();

      // Get concern role alternate id
      final ReadProspectPersonKey key = new ReadProspectPersonKey();

      key.maintainConcernRoleKey.concernRoleID = concernRoleID;

      final ConcernRoleAlternateID concernRoleAlternateIDObj = ConcernRoleAlternateIDFactory.newInstance();

      final ConcernRoleIDStatusCodeKey concernRoleIDStatusCodeKey = new ConcernRoleIDStatusCodeKey();

      concernRoleIDStatusCodeKey.concernRoleID = concernRoleID;

      concernRoleIDStatusCodeKey.statusCode = curam.codetable.RECORDSTATUS.NORMAL;

      final AlternateIDAndTypeCodeDtlsList alternateIDAndTypeCodeDtlsList = concernRoleAlternateIDObj.searchActiveAlternateIDAndType(
        concernRoleIDStatusCodeKey);

      boolean createNewAlternateID = true;

      // Iterate over all alternate ids and match the correct type.
      for (final AlternateIDAndTypeCodeDtls details : alternateIDAndTypeCodeDtlsList.dtls) {

        if (details.typeCode.equals(alternateIDType)) {

          // Process the alternate id!
          final AlternateIDTypeCodeKey alternateIDTypeCodeKey = new AlternateIDTypeCodeKey();

          alternateIDTypeCodeKey.alternateID = details.alternateID;
          alternateIDTypeCodeKey.statusCode = curam.codetable.RECORDSTATUS.NORMAL;
          alternateIDTypeCodeKey.typeCode = details.typeCode;

          final ConcernRoleAlternateIDDtls concernRoleAlternateIDDtls = concernRoleAlternateIDObj.readByAltIDTypeCode(
            alternateIDTypeCodeKey);

          // If the alternate IDs are not the same, see if then needs to be
          // updated.

          // No need to update if they are already the same.
          if (!concernRoleAlternateIDDtls.alternateID.equals(alternateID)) {

            // If its a prospect person update their alternate id or if its a
            // person and the system is configured to update person data.
            if (personIsProspect
              || (personDetailsUpdateEnabled() && !personIsProspect)) {

              // If the current alternate id has ended, we should create a new
              // one.
              if (concernRoleAlternateIDDtls.endDate.isZero()
                || !concernRoleAlternateIDDtls.endDate.before(
                  Date.getCurrentDate())) {

                final ReadConcernRoleAltIDKey readConcernRoleAltIDKey = new ReadConcernRoleAltIDKey();

                readConcernRoleAltIDKey.concernRoleAlternateID = concernRoleAlternateIDDtls.concernRoleAlternateID;

                final AlternateIDDetails alternateIDDetails = maintainConcernRoleAltIDObj.readAlternateID(
                  readConcernRoleAltIDKey);

                // Update the alternate id.
                alternateIDDetails.alternateID = alternateID;

                final MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();

                maintainConcernRoleAltIDKey.concernRoleID = concernRoleID;

                maintainConcernRoleAltIDObj.modifyAlternateID(
                  maintainConcernRoleAltIDKey, alternateIDDetails);

                // TODO, register change to participant evidence
              } else {
                // The current alternate id has ended break out and create a new
                // one.
                break;
              }

            }

          }

          createNewAlternateID = false;
          // There should only ever be one active record per alternate id type
          // therefore no need to continue processing.
          break;
        }

      }

      if (createNewAlternateID) {

        // Create an alternate id.

        final MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();

        // Get concern role ID from key
        maintainConcernRoleAltIDKey.concernRoleID = concernRoleID;

        final AlternateIDDetails alternateIDDetails = new AlternateIDDetails();

        alternateIDDetails.alternateID = alternateID;
        alternateIDDetails.concernRoleID = concernRoleID;
        alternateIDDetails.primaryAlternateInd = true;
        alternateIDDetails.startDate = Date.getCurrentDate();
        alternateIDDetails.typeCode = alternateIDType;

        // alternateIDDetails.
        maintainConcernRoleAltIDObj.createAlternateID(
          maintainConcernRoleAltIDKey, alternateIDDetails);

        // TODO, register change to participant evidence
      }

    }
  }

  /**
   * Update the type of the alternate id type for the newly created Prospect
   * Person. By default it gets created with an alternate id type of Prospect
   * Person Reference. The customer can change this by setting a configuration
   * variable to indicate the type of alternate id to be used.
   *
   * @param concernRoleID
   * The identifier for the newly created Prospect Person whose id is
   * to be altered.
   * @throws AppException
   * Generic exception signature.
   * @throws InformationalException
   * Generic exception signature.
   */
  private void updateAlternateIDType(final long concernRoleID)
    throws AppException, InformationalException {

    final String alternateIDType = getConfigurationAlternateIDType();

    if (alternateIDType == null) {
      return;
    }

    // Get concern role alternate id
    final ReadProspectPersonKey key = new ReadProspectPersonKey();

    key.maintainConcernRoleKey.concernRoleID = concernRoleID;

    final ConcernRoleAlternateID concernRoleAlternateID = ConcernRoleAlternateIDFactory.newInstance();

    final ConcernRoleAlternateIDRMKey ConcernRoleAlternateIDRMKey = new ConcernRoleAlternateIDRMKey();

    ConcernRoleAlternateIDRMKey.concernRoleID = concernRoleID;

    final AlternateIDReadmultiDtlsList alternateIDs = concernRoleAlternateID.searchByConcernRole(
      ConcernRoleAlternateIDRMKey);

    // Assume there is exactly one alternate id since have just
    // created it.
    final AlternateIDReadmultiDtls alternateIDDetails = alternateIDs.dtls.get(0);
    final ConcernRoleAlternateIDKey concernRoleAlternateIDKey = new ConcernRoleAlternateIDKey();

    concernRoleAlternateIDKey.concernRoleAlternateID = alternateIDDetails.concernRoleAlternateID;

    final ConcernRoleAlternateIDDtls concernRoleAlternateIDDtls = concernRoleAlternateID.read(
      concernRoleAlternateIDKey);

    // Update the type code from configuration
    concernRoleAlternateIDDtls.typeCode = alternateIDType;

    // BEGIN, CR00369959, KR

    final ParticipantAlternateIDDetails participantAlternateIDDetails = new ParticipantAlternateIDDetails();

    participantAlternateIDDetails.assign(concernRoleAlternateIDDtls);
    
    final PDCAlternateID pdcAlternateID = PDCAlternateIDFactory.newInstance();

    pdcAlternateID.modify(participantAlternateIDDetails);
    // END, CR00369959, KR
    // TODO, register change to participant evidence
  }

  /**
   * Get the value of the configuration variable which indicates what type to
   * set the alternate id to for newly created Prospect Persons.
   *
   * @return A code name from the ConcernRoleAlternateID code table.
   * @throws AppException
   * @throws InformationalException
   */
  synchronized private static String getConfigurationAlternateIDType()
    throws AppException, InformationalException {
    final String alternateIDType = Configuration.getProperty(
      EnvVars.ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE);

    if (alternateIDType == null) {
      return null;
    }

    // If the configured value has not changed
    // then return it as is
    if (globalAlternateIDType.equals(alternateIDType)) {
      return alternateIDType;
    }

    // Otherwise check the configuration value
    // equates to a valid code table entry
    final CodeTable ct = CodeTableFactory.newInstance();

    final CTItemKey ck = new CTItemKey();

    ck.tableName = CONCERNROLEALTERNATEID.TABLENAME;

    ck.locale = TransactionInfo.getProgramLocale();

    ck.code = alternateIDType;

    final CTItem result = ct.getOneItem(ck);

    if (!result.isEnabled) {
      throw MAPPINGExceptionCreator.ERR_MAPPING_SETTING_ALTERNATE_ID_TYPE(
        EnvVars.ENV_WORKSPACESERVICES_MAPPING_ALTERNATEID_TYPE
          + alternateIDType);
    }

    globalAlternateIDType = alternateIDType;

    return alternateIDType;
  }

  /**
   * This method duplicates validations performed in the RegisterProspectPerson
   * class around duplicate SSNs. If the validations fail, the method returns
   * true, indicating that this socialSecurityNumber is already entered in the
   * system.
   *
   * @param socialSecurityNumber
   * social security number
   * @return true if the SSN in question is already registered to a Person or
   * ProspectPerson in the system.
   * @throws AppException
   * Generic Exception Signature
   * @throws InformationalException
   * Generic Exception Signature
   */
  private boolean duplicateSSNExists(final String socialSecurityNumber)
    throws AppException, InformationalException {

    ConcernRoleAlternateIDDtls concernRoleAlternateIDDtls = new ConcernRoleAlternateIDDtls();

    final curam.core.intf.ConcernRoleAlternateID concernRoleAlternateIDObj = curam.core.fact.ConcernRoleAlternateIDFactory.newInstance();

    final ConcernRoleAlternateReadKey concernRoleAlternateReadKey = new ConcernRoleAlternateReadKey();

    final AlternateIDTypeCodeKey alternateIDTypeCodeKey = new AlternateIDTypeCodeKey();

    // CEF register prospect checks for a type of prospect person reference number
    // before adding a type of reference number, so since this functionality is
    // called to create the prospect here, but need to be validated against to
    // prevent a validation being thrown.
    alternateIDTypeCodeKey.typeCode = CONCERNROLEALTERNATEID.PROSPECT_PERSON_REFERENCE_NUMBER;
    alternateIDTypeCodeKey.alternateID = socialSecurityNumber;
    alternateIDTypeCodeKey.statusCode = curam.codetable.RECORDSTATUS.NORMAL;
    
    try {
      concernRoleAlternateIDDtls = concernRoleAlternateIDObj.readByAltIDTypeCode(
        alternateIDTypeCodeKey);

      if (socialSecurityNumber.equals(concernRoleAlternateIDDtls.alternateID)) {

        return true;
      }
    } catch (final curam.util.exception.MultipleRecordException e) {
      return true;

    } catch (final curam.util.exception.RecordNotFoundException e) {// do
      // nothing:
      // none
      // found
    }
   
    // Now see if the the alternate ID exists already of type reference.
    alternateIDTypeCodeKey.typeCode = CONCERNROLEALTERNATEID.INSURANCENUMBER;
    
    try {
      concernRoleAlternateIDDtls = concernRoleAlternateIDObj.readByAltIDTypeCode(
        alternateIDTypeCodeKey);

      if (socialSecurityNumber.equals(concernRoleAlternateIDDtls.alternateID)) {

        return true;
      }
    } catch (final curam.util.exception.MultipleRecordException e) {
      return true;

    } catch (final curam.util.exception.RecordNotFoundException e) {// do
      // nothing:
      // none
      // found
    }
    
    // Now see if the the alternate ID exists already for the configured 
    // creation type.
    alternateIDTypeCodeKey.typeCode = getConfigurationAlternateIDType();
    try {
      concernRoleAlternateIDDtls = concernRoleAlternateIDObj.readByAltIDTypeCode(
        alternateIDTypeCodeKey);

      if (socialSecurityNumber.equals(concernRoleAlternateIDDtls.alternateID)) {

        return true;
      }
    } catch (final curam.util.exception.MultipleRecordException e) {
      return true;

    } catch (final curam.util.exception.RecordNotFoundException e) {// do
      // nothing:
      // none
      // found
    }    

    concernRoleAlternateReadKey.primaryAlternateID = socialSecurityNumber;

    concernRoleAlternateReadKey.statusCode = curam.codetable.CONCERNROLESTATUS.DEFAULTCODE;

    try {
      final curam.core.intf.ConcernRole concernRoleObj = curam.core.fact.ConcernRoleFactory.newInstance();

      final ConcernRoleDtls concernRoleDtls = concernRoleObj.readByAlternateID(
        concernRoleAlternateReadKey);

      if (concernRoleAlternateReadKey.primaryAlternateID.equals(
        concernRoleDtls.primaryAlternateID)) {

        return true;
      }
    } catch (final curam.util.exception.RecordNotFoundException e) {// do
      // nothing
    }
    return false;
  }

  /**
   * {@inheritDoc}
   */
  public Date getApplicationDate(final Application application)
    throws AppException, InformationalException {
    
    // initialize object
    dataStoreCEFMappings = dataStoreCEFMappingsProvider.get();

    Date dateOfApplication = null;
    
    try {
      final Datastore ds = DatastoreHelper.openDatastore(
        application.getSchemaName());

      final Entity applicationEntity = ds.readEntity(
        application.getRootEntityID());

      final EntityType intakeApplicationEntityType = ds.getEntityType(
        ApplicationConst.kIntakeApplication);

      final Entity[] entities = applicationEntity.getChildEntities(
        intakeApplicationEntityType);

      // For all intake applications the data should be the same as it's only
      // captured once, so break after first iteration.
      for (final Entity intakeApplicationTypeEntity : entities) {

        dateOfApplication = Date.getDate(
          intakeApplicationTypeEntity.getAttribute(
            ApplicationConst.kDateOfApplication));
        break;
      }
    } catch (final curam.util.exception.RecordNotFoundException e) {// do
      // nothing none found
    }
    return dateOfApplication;
  }
}
