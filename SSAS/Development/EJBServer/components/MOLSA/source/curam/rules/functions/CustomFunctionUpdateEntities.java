package curam.rules.functions;

import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.molsa.util.impl.MOLSADateUtil;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;
import curam.util.type.Date;

/**
 * This class provides the operations to interact with data store.
 * <p>
 * Entities
 * </p>
 * <ol>
 * Application
 * </ol>
 */
@SuppressWarnings("restriction")
public class CustomFunctionUpdateEntities extends CustomFunctor {

  /**
  * 
  */
  public CustomFunctionUpdateEntities() {

    GuiceWrapper.getInjector().injectMembers(this);
  }

  /**
   * Updates the Application entity submit date
   * @param rulesParameters
   * rules parameters
   * @throws AppException
   *           GeneralException
   * @throws InformationalException
   *           GeneralException
   * @return Boolean value adapter (true\false) after a successful update.
   */
  @Override
  @AccessLevel(AccessLevelType.EXTERNAL)
  public Adaptor getAdaptorValue(final RulesParameters rulesParameters)
      throws AppException, InformationalException {

    final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
    Date applicationDate = null;
    String applicationMethod = null;
    Datastore datastore;
    try {

      datastore = MOLSADatastoreUtility
          .openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
      final Entity application = datastore.readEntity(ieg2Context
          .getRootEntityID());
      final Entity[] personEntities = application.getChildEntities(datastore
          .getEntityType(MOLSADatastoreConst.kPerson));

      final Entity[] intakeApplicationTypeEntities = application
          .getChildEntities(datastore
              .getEntityType(MOLSADatastoreConst.kIntakeApplicationType));
      
      final Entity[] intakeApplicationEntities = application
      .getChildEntities(datastore
          .getEntityType(MOLSADatastoreConst.kIntakeApplication));

      // Update Person QID Values on SSN
      for (Entity personEntity : personEntities) {
        if ((Boolean) personEntity
            .getTypedAttribute(MOLSADatastoreConst.kIsPrimaryParticipant)) {
          applicationDate = (Date) personEntity
              .getTypedAttribute(MOLSADatastoreConst.kCtrlQApplicationDate);
          applicationMethod = (String) personEntity
              .getTypedAttribute(MOLSADatastoreConst.kApplicationMethod);
        }

        personEntity.setAttribute(MOLSADatastoreConst.kSSN,
            personEntity.getAttribute(MOLSADatastoreConst.kQIDNumber));

        if (personEntity
            .getAttribute(MOLSADatastoreConst.kIsMailingAddressSame).equals(
                MOLSADatastoreConst.kIsMailingAddressSameValue)) {
          final Entity[] personAddress = MOLSADatastoreUtility.getEntities(
              personEntity.getUniqueID(), MOLSADatastoreConst.kAddress);

          final Entity mailingAddress = datastore
              .newEntity(MOLSADatastoreConst.kMailingAddress);

          for (final Entity addressEntity : personAddress) {

            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingMunicipality, addressEntity
                    .getTypedAttribute(MOLSADatastoreConst.kMunicipality));
            mailingAddress.setTypedAttribute(MOLSADatastoreConst.kMailingZone,
                addressEntity.getTypedAttribute(MOLSADatastoreConst.kZone));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingStreet,
                addressEntity.getTypedAttribute(MOLSADatastoreConst.kStreet));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingBuildingNumber, addressEntity
                    .getTypedAttribute(MOLSADatastoreConst.kBuildingNumber));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingBuildingType, addressEntity
                    .getTypedAttribute(MOLSADatastoreConst.kBuildingType));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingPostCode,
                addressEntity.getTypedAttribute(MOLSADatastoreConst.kPostCode));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingElectricityNumber, addressEntity
                    .getTypedAttribute(MOLSADatastoreConst.kElectricityNumber));
            mailingAddress.setTypedAttribute(MOLSADatastoreConst.kMailingPOBox,
                addressEntity.getTypedAttribute(MOLSADatastoreConst.kpoBox));
            mailingAddress.setTypedAttribute(
                MOLSADatastoreConst.kMailingCountry,
                addressEntity.getTypedAttribute(MOLSADatastoreConst.kCountry));

          }

          personEntity.addChildEntity(mailingAddress);

        }
      }
      application.setTypedAttribute(MOLSADatastoreConst.kSubmitDate,
          applicationDate);
      application.setTypedAttribute(MOLSADatastoreConst.kApplicationMonthStartDate,
          MOLSADateUtil.shiftToStartOfMonth(applicationDate));
      
      // Also Update IntakeApplication Date of Application with user entered
      // value
      for (Entity intakeApplicationEntity : intakeApplicationTypeEntities) {
        intakeApplicationEntity.setTypedAttribute(
            MOLSADatastoreConst.kDateOfApplication, applicationDate);
        intakeApplicationEntity.update();
      }
      
      for (Entity intakeApplication : intakeApplicationEntities) {
        intakeApplication.setTypedAttribute(
            MOLSADatastoreConst.kDateOfApplication, applicationDate);
        intakeApplication.update();
      }
      // Application Date Entity

      final Entity applicationDetailsEntity = datastore
          .newEntity(MOLSADatastoreConst.kApplicationDetails);
      applicationDetailsEntity.setTypedAttribute(
          MOLSADatastoreConst.kCtrlQApplicationDate, applicationDate);
      applicationDetailsEntity.setTypedAttribute(
          MOLSADatastoreConst.kApplicationMethod, applicationMethod);
      application.addChildEntity(applicationDetailsEntity);
      application.update();
    } catch (NoSuchSchemaException e) {

      throw new AppRuntimeException(e);
    }
    return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);

  }
}
