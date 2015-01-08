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
 * Copyright 2010, 2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
package curam.workspaceservices.mappingbeans.impl;


import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import curam.application.impl.ApplicationConst;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.COUNTRY;
import curam.codetable.PHONETYPE;
import curam.codetable.impl.ADDRESSLAYOUTTYPEEntry;
import curam.codetable.impl.COUNTRYEntry;
import curam.codetable.impl.ETHNICORIGINEntry;
import curam.codetable.impl.INTAKEYESNOEntry;
import curam.codetable.impl.PHONETYPEEntry;
import curam.core.fact.AddressDataFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.AddressData;
import curam.core.sl.struct.ProspectPersonRegistrationDtls;
import curam.core.struct.AddressFieldDetails;
import curam.core.struct.OtherAddressData;
import curam.datastore.impl.AttributeType;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.intake.impl.AddressUtility;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.core.fact.MOLSAAddressDataDAFactory;
import curam.molsa.core.intf.MOLSAAddressDataDA;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.molsa.intake.impl.MOLSAAddressUtility;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.StringUtil;
import curam.util.type.Date;


/**
 * This object is a link between the Person representation in the datastore and
 * how a prospect person is represented in CEF.
 *
 * @curam.exclude
 */
public class IntakeProspectPersonMappingBean {

  /**
   * Indicates if the Prospect Person is the primary client on the case.
   */
  public boolean primaryClientInd;

  private Datastore ds;

  private PhoneNumberMappingBean homePhone;

  private PhoneNumberMappingBean workPhone;

  private PhoneNumberMappingBean cellPhone;

  private PhoneNumberMappingBean otherPhone;

  private String email;

  // the uniqueID used to reference this person over the course of the IEG
  // script
  private long uniqueID;

  // TODO Get rid of all reliance on this class. ProspectPersonVO should not
  // depend on any CEF structs.
  private ProspectPersonRegistrationDtls dtls;

  /**
   * Default constructor.
   */
  public IntakeProspectPersonMappingBean() {
    dtls = new ProspectPersonRegistrationDtls();
  }

  /**
   * Function to populate the Prospect Person bean.
   *
   * @param datastore
   * Datastore The Datastore object used to store the data.
   * @param personEntity
   * Entity containing the Prospect Person details.
   * @throws AppException
   * @throws InformationalException
   */
  public IntakeProspectPersonMappingBean(final Datastore datastore,
    final Entity personEntity) throws AppException, InformationalException {

    ds = datastore;

    uniqueID = personEntity.getUniqueID();

    dtls = new ProspectPersonRegistrationDtls();

    dtls.firstForename = (String) personEntity.getTypedAttribute(
      ApplicationConst.kFirstName);

    dtls.otherForename = (String) personEntity.getTypedAttribute(
      ApplicationConst.kMiddleInitial);

    dtls.surname = (String) personEntity.getTypedAttribute(
      ApplicationConst.kLastName);

    final Object dateOfBirthObj = personEntity.getTypedAttribute(
      ApplicationConst.kDateOfBirth);

    // BEGIN,CR00264222,ZT
    if (dateOfBirthObj != null) {
      dtls.dateOfBirth = Date.getDate(
        personEntity.getAttribute(ApplicationConst.kDateOfBirth));
    }
    // END,CR00264222,ZT
    dtls.gender = (String) personEntity.getTypedAttribute(
      ApplicationConst.kGender);

    final String maritalStatus = personEntity.getAttribute(
      ApplicationConst.kMaritalStatus);

    if (maritalStatus != null) {
      dtls.maritalStatusCode = maritalStatus;
    }

    final String emailAddress = personEntity.getAttribute(
      ApplicationConst.kEmail);

    if (emailAddress != null) {
      dtls.contactEmailAddress = emailAddress;

      email = emailAddress;
    }

    final String socialSecurityNumber = personEntity.getAttribute(
     MOLSADatastoreConst.kQIDNumber);

    if (socialSecurityNumber != null) {
      dtls.socialSecurityNumber = socialSecurityNumber;
    }

    final String preferredLanguage = personEntity.getAttribute(
      ApplicationConst.kPreferredLanguage);

    if (preferredLanguage != null) {
      dtls.preferredLanguage = preferredLanguage;
    }

    setEthnicOriginCode(dtls, personEntity);

    setRace(dtls, personEntity);
    
    final Entity[] personAddress = MOLSADatastoreUtility.getEntities(
        personEntity.getUniqueID(), MOLSADatastoreConst.kAddress);

    final Entity[] mailingPersonAddress = MOLSADatastoreUtility.getEntities(
        personEntity.getUniqueID(), MOLSADatastoreConst.kMailingAddress);

    for (final Entity addressEntity : personAddress) {

    dtls.addressData = getAddressData(addressEntity);

    if (dtls.addressData != null) {
      dtls.addressType = CONCERNROLEADDRESSTYPE.PRIVATE;
    }
    }
    for (final Entity mailAddressEntity : mailingPersonAddress) {

    String mailingAddress = CuramConst.gkEmpty;

    
      mailingAddress = getMailingAddressData(mailAddressEntity);
      dtls.addressIndicator = true;
      dtls.mailingAddressData = mailingAddress;
      dtls.mailingAddressID = Long.parseLong(mailAddressEntity.getTypedAttribute(MOLSADatastoreConst.kMailingAddressID).toString());
  
    }
    setPhoneNumbers(personEntity);

    primaryClientInd = (Boolean) personEntity.getTypedAttribute(
      ApplicationConst.kIsPrimaryParticipant);

    dtls.registrationDate = Date.getCurrentDate();

  }

  /**
   * Returns a phone number or null if no number exists.
   *
   * @return Home phone number.
   */
  public PhoneNumberMappingBean getHomePhone() {
    return homePhone;
  }

  /**
   * Returns a phone number or null if no number exists.
   *
   * @return Work phone number.
   */
  public PhoneNumberMappingBean getWorkPhone() {
    return workPhone;
  }

  /**
   * Returns a phone number or null if no number exists.
   *
   * @return Cell phone number.
   */
  public PhoneNumberMappingBean getCellPhone() {
    return cellPhone;
  }

  /**
   * Returns a phone number or null if no number exists.
   *
   * @return Other phone number.
   */
  public PhoneNumberMappingBean getOtherPhone() {
    return otherPhone;
  }

  /**
   * Returns an email address if there is one or null otherwise.
   *
   * @return email address.
   */
  public String getEmailAddress() {
    return email;
  }

  private boolean isSameMailingAddress(final Entity personEntity) {

   if(personEntity.getAttribute(MOLSADatastoreConst.kIsMailingAddressSame).equals(MOLSADatastoreConst.kIsMailingAddressSameValue))
   {
     return true;
   }
   return false;
  }

  /**
   * Set up phone number VOs from the data store.
   *
   * @param personEntity
   */
  private void setPhoneNumbers(final Entity personEntity) {

    homePhone = recordPhoneNumber(personEntity,
      ApplicationConst.kHomePhoneNumber, ApplicationConst.kHomePhoneCode,
      PHONETYPE.PERSONAL);

    workPhone = recordPhoneNumber(personEntity,
      ApplicationConst.kWorkPhoneNumber, ApplicationConst.kWorkPhoneCode,
      PHONETYPE.BUSINESS);

    cellPhone = recordPhoneNumber(personEntity,
      ApplicationConst.kCellPhoneNumber, ApplicationConst.kCellPhoneCode,
      PHONETYPE.MOBILE);

    otherPhone = recordPhoneNumber(personEntity,
      ApplicationConst.kOtherPhoneNumber, ApplicationConst.kOtherPhoneCode,
      PHONETYPE.OTHER);

  }

  /**
   * Records a phone number from the data store and creates the corresponding
   * PhoneNumberVO.
   *
   * @param personEntity
   * @param phoneNumberAttributeName
   * @param phoneCodeAttributeName
   * @param phoneType
   * @return A phone number value object.
   */
  private PhoneNumberMappingBean recordPhoneNumber(final Entity personEntity,
    final String phoneNumberAttributeName,
    final String phoneCodeAttributeName, final String phoneType) {

    final String phoneNumber = personEntity.getAttribute(
      phoneNumberAttributeName);

    if ((phoneNumber == null) || (phoneNumber.length() == 0)) {
      return null;
    }

    final String phoneCode = personEntity.getAttribute(phoneCodeAttributeName);

    return new PhoneNumberMappingBean(phoneNumber, phoneCode,
      PHONETYPEEntry.get(phoneType));

  }

  private void setEthnicOriginCode(final ProspectPersonRegistrationDtls dtls2,
    final Entity personEntity) {
    final Object isHispanicOrLatino = personEntity.getTypedAttribute(
      ApplicationConst.kHispanicLatino);

    if (isHispanicOrLatino != null) {
      if ((Boolean) isHispanicOrLatino) {
        dtls.ethnicOriginCode = ApplicationConst.kHispanicOrLatino;

      } else {
        dtls.ethnicOriginCode = ETHNICORIGINEntry.NOTHISPANICORLATINO.getCode();
      }
    }
  }

  /**
   * Set the ethnicity(race) for the prospect person. TODO, Curam Prospect
   * Person allows an Ethnicity to be one of Black, Asian, Native American etc.
   * In CSSP the client can choose multiple of these so there's a mismatch
   * between the UI and the storage of this information. e.g. A person may have
   * indicated that they are both black and Asian.
   *
   * @param dtls
   * @param personEntity
   */
  private void setRace(final ProspectPersonRegistrationDtls dtls,
    final Entity personEntity) {

    // NOTE, CitizenPortal schema doesn't have the
    // race attributes, for backward compatibility reasons
    // don't fail.

    if (!checkRaceAttributesExistOnSchema(personEntity)) {
      return;
    }

    final Object isBlackOrAfricanAmerican = personEntity.getTypedAttribute(
      ApplicationConst.kBlackOrAfricanAmerican);

    if ((isBlackOrAfricanAmerican != null)
      && (Boolean) isBlackOrAfricanAmerican) {
      dtls.race = ApplicationConst.kEthnicityBlackNonLatino;
      return;
    }

    final Object isNativeAlaskanOrAmericanIndian = personEntity.getTypedAttribute(
      ApplicationConst.kNativeAlaskanOrAmericanIndian);

    if ((isNativeAlaskanOrAmericanIndian != null)
      && (Boolean) isNativeAlaskanOrAmericanIndian) {
      dtls.race = ApplicationConst.kEthnicityNativeAmerican;
      return;
    }

    final Object isAsian = personEntity.getTypedAttribute(
      ApplicationConst.kAsian);

    if ((isAsian != null) && (Boolean) isAsian) {
      dtls.race = ApplicationConst.kEthnicityAsianOrPacific;
      return;
    }

    final Object isNativeHawaiinOrPacificIslander = personEntity.getTypedAttribute(
      ApplicationConst.kNativeHawaiianOrPacificIslander);

    if ((isNativeHawaiinOrPacificIslander != null)
      && (Boolean) isNativeHawaiinOrPacificIslander) {
      dtls.race = ApplicationConst.kEthnicityAsianOrPacific;
      return;
    }

    final Object isWhiteOrCaucasian = personEntity.getTypedAttribute(
      ApplicationConst.kWhiteOrCaucasian);

    if ((isWhiteOrCaucasian != null) && (Boolean) isWhiteOrCaucasian) {
      dtls.race = ApplicationConst.kEthnicityWhiteOrCaucasian;
      return;
    }

  }

  private boolean checkRaceAttributesExistOnSchema(final Entity personEntity) {

    final Set<String> raceAttributes = new HashSet<String>();

    raceAttributes.add(ApplicationConst.kBlackOrAfricanAmerican);
    raceAttributes.add(ApplicationConst.kAsian);
    raceAttributes.add(ApplicationConst.kNativeAlaskanOrAmericanIndian);
    raceAttributes.add(ApplicationConst.kWhiteOrCaucasian);

    final AttributeType[] attributeTypes = personEntity.getEntityType().getAttributeTypes();

    for (final AttributeType attrType : attributeTypes) {
      if (raceAttributes.contains(attrType.getName())) {
        raceAttributes.remove(attrType.getName());
      }
    }

    return raceAttributes.isEmpty();
  }

  /*private String getAddressData(final Entity personEntity,
    final String entityType) throws AppException, InformationalException {

    final EntityType addressType = ds.getEntityType(entityType);

    if (addressType == null) {
      return getBlankAddress();
    }

    final Entity[] addresses = personEntity.getChildEntities(addressType);

    if (addresses.length == 0) {
      return getBlankAddress();
    }

    final Entity address = addresses[0];

    final AddressFieldDetails fieldDetails = new AddressFieldDetails();

    fieldDetails.addressLayoutType = ADDRESSLAYOUTTYPEEntry.US.getCode();

    // BEGIN, CR00307228, JD
    if (address.hasAttribute(ApplicationConst.kApt)) {
      fieldDetails.addressLine1 = address.getAttribute(ApplicationConst.kApt);
    } else {
      fieldDetails.addressLine1 = CuramConst.gkEmpty;
    }
    // END, CR00307228
    fieldDetails.addressLine2 = address.getAttribute(ApplicationConst.kStreet1);

    if ((fieldDetails.addressLine2 == null)
      || (fieldDetails.addressLine2.length() == 0)) {
      return getBlankAddress();
    }

    fieldDetails.addressLine3 = address.getAttribute(ApplicationConst.kStreet2);

    fieldDetails.city = address.getAttribute(ApplicationConst.kCity);

    fieldDetails.stateCode = address.getAttribute(ApplicationConst.kState);

    fieldDetails.zipCode = address.getAttribute(ApplicationConst.kZipCode);

    fieldDetails.countryCode = COUNTRY.US;

    // BEGIN, CR00309504, JD
    // US County
    final String usCounty = curam.util.resources.Configuration.getProperty(
      EnvVars.ENV_USADDRESSWITHCOUNTY);

    if ((usCounty != null) && usCounty.equalsIgnoreCase(CuramConst.kYES)) {
      if (!address.hasAttribute(ApplicationConst.kUsCounty)) {
        fieldDetails.usCountyCode = CuramConst.gkEmpty;
      } else {
        fieldDetails.usCountyCode = address.getAttribute(
          ApplicationConst.kUsCounty);  
      }
      
    }
    // END, CR00309504
    
    final AddressData addressData = AddressDataFactory.newInstance();

    final OtherAddressData data = addressData.parseFieldsToData(fieldDetails);

    return data.addressData;
  }*/

  
  /**
   * Gives address data from data store entity Address.
   * 
   * @param address
   *          contains Address entity.
   * 
   * @return String contains address data.
   */
  @SuppressWarnings("restriction")
  private String getAddressData(final Entity address) throws AppException,
      InformationalException {

    final MOLSAAddressDataDA addressDataObj = MOLSAAddressDataDAFactory
        .newInstance();
    final AddressFieldDetails addressFieldDetails = new AddressFieldDetails();
    // To be changed to Qatar Layout
    addressFieldDetails.addressLayoutType = ADDRESSLAYOUTTYPE.US;
    addressFieldDetails.city = address
        .getAttribute(MOLSADatastoreConst.kMunicipality);
    addressFieldDetails.addressLine1 = address
        .getAttribute(MOLSADatastoreConst.kZone);
    addressFieldDetails.addressLine2 = address
        .getAttribute(MOLSADatastoreConst.kStreet);
    addressFieldDetails.addressLine4 = address
        .getAttribute(MOLSADatastoreConst.kBuildingType);
    addressFieldDetails.addressLine5 = address
        .getAttribute(MOLSADatastoreConst.kElectricityNumber);
    addressFieldDetails.zipCode = address
        .getAttribute(MOLSADatastoreConst.kPostCode);
    addressFieldDetails.countryCode = COUNTRYEntry.QATAR.getCode();
    final OtherAddressData otherAddressData = addressDataObj
        .parseFieldsToData(addressFieldDetails);
    return otherAddressData.addressData;

  }
  
  /**
   * Gives address data from data store entity Address.
   * 
   * @param address
   *          contains Address entity.
   * 
   * @return String contains address data.
   */
  @SuppressWarnings("restriction")
  private String getMailingAddressData(final Entity address) throws AppException,
      InformationalException {

    final MOLSAAddressDataDA addressDataObj = MOLSAAddressDataDAFactory
        .newInstance();
    final AddressFieldDetails addressFieldDetails = new AddressFieldDetails();
    // To be changed to Qatar Layout
    addressFieldDetails.addressLayoutType = ADDRESSLAYOUTTYPE.US;
    addressFieldDetails.city = address
        .getAttribute(MOLSADatastoreConst.kMailingMunicipality);
    addressFieldDetails.addressLine1 = address
        .getAttribute(MOLSADatastoreConst.kMailingZone);
    addressFieldDetails.addressLine2 = address
        .getAttribute(MOLSADatastoreConst.kMailingStreet);
    addressFieldDetails.addressLine4 = address
        .getAttribute(MOLSADatastoreConst.kMailingBuildingType);
    addressFieldDetails.addressLine5 = address
        .getAttribute(MOLSADatastoreConst.kMailingElectricityNumber);
    addressFieldDetails.zipCode = address
        .getAttribute(MOLSADatastoreConst.kMailingPostCode);
    addressFieldDetails.countryCode = COUNTRYEntry.QATAR.getCode();
    final OtherAddressData otherAddressData = addressDataObj
        .parseFieldsToData(addressFieldDetails);
    return otherAddressData.addressData;

  }

  
  /**
   * Function to map each person passed into the function via the persons
   * object.
   *
   * @param datastore
   * Data store object in use.
   * @param persons
   * Array of each person entity.
   * @return List List containing a mapping bean for each person
   * @throws AppException
   * @throws InformationalException
   */
  public static List<IntakeProspectPersonMappingBean> getProspectPersonMappingBeans(
    final Datastore ds, final Entity[] persons) throws AppException,
      InformationalException {

    final List<IntakeProspectPersonMappingBean> retval = new LinkedList<IntakeProspectPersonMappingBean>();

    for (final Entity entity : persons) {

      retval.add(new IntakeProspectPersonMappingBean(ds, entity));

    }

    return retval;
  }

  /**
   * Returns a blank address. Format can differ depending on whether the address
   * is required to include a US County code.
   *
   * @return A blank address.
   */
  private static String getBlankAddress() throws AppException,
      InformationalException {

    String retval;

    final MOLSAAddressUtility molsaAddressUtilityObj = new MOLSAAddressUtility();
    final AddressUtility addressUtilityObj = new AddressUtility();

    final String usCounty = curam.util.resources.Configuration.getProperty(
      EnvVars.ENV_USADDRESSWITHCOUNTY);

    if ((usCounty != null) && usCounty.equalsIgnoreCase(CuramConst.kYES)) {
      retval = addressUtilityObj.getBlankUSAddressDataWithCountyDBInsert();
    } else {
      retval = molsaAddressUtilityObj.getBlankUSAddressDataWithoutCountyDBInsert();
    }

    return retval;
  }

  /**
   * Returns the ProspectPersonRegistrationDtls for this
   * ProspectPersonMappingBean.
   *
   * @return the ProspectPersonRegistrationDtls for this
   * ProspectPersonMappingBean.
   */
  public ProspectPersonRegistrationDtls getProspectPersonDetails() {
    return dtls;
  }

  /**
   * Sets the ProspectPersonRegistrationDtls for this ProspectPersonMappingBean.
   *
   * @param dtls
   * ProspectPersonRegistrationDtls details to be set.
   */
  public void setProspectPersonDetails(final ProspectPersonRegistrationDtls dtls) {
    this.dtls = dtls;
  }

  /**
   * Returns the unique identifier for the data store entity related to this
   * person.
   *
   * @return the unique identifier for the data store entity related to this
   * person.
   */
  public long getUniqueID() {
    return uniqueID;
  }

  /**
   * Sets the unique identifier for the data store entity related to this
   * person.
   *
   * @param uniqueID
   * the unique identifier for the data store entity related to this
   * person.
   */
  public void setUniqueID(final long uniqueID) {
    this.uniqueID = uniqueID;
  }
}
