package curam.rules.functions;

import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * This class provides operations related to household.
 */
@SuppressWarnings("restriction")
public class CustomFunctionPopulateHouseholdInfo extends CustomFunctor {
  @Override
  public Adaptor getAdaptorValue(RulesParameters rulesParameters)
      throws AppException, InformationalException {
    final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
    updateAbsentParentInfo(ieg2Context);
    return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);
  }

  /**
   * Update any household Member attribute on the household entity..
   * 
   * @param ieg2Context
   *          stores IEG2Context value
   * @throws AppException
   *           Generic Exception
   * @throws InformationalException
   *           Generic exception
   */
  private void updateAbsentParentInfo(final IEG2Context ieg2Context)
      throws AppException, InformationalException {
    Datastore datastore = null;
    try {
      datastore = MOLSADatastoreUtility.getDatastoreInstance();

      final Entity application = datastore.readEntity(ieg2Context
          .getRootEntityID());

      final Entity[] personEntities = application.getChildEntities(datastore
          .getEntityType(MOLSADatastoreConst.kPerson));

      Entity household = MOLSADatastoreUtility.getEntity(
          application.getUniqueID(), MOLSADatastoreConst.kHouseholdInformation);
      if (household == null) {
        household = MOLSADatastoreUtility
            .createEntity(MOLSADatastoreConst.kHouseholdInformation);
        application.addChildEntity(household);
      }

      for (Entity personEntity : personEntities) {

        if ((Boolean) personEntity
            .getTypedAttribute(MOLSADatastoreConst.kHasAbsentFather)
            || (Boolean) personEntity
                .getTypedAttribute(MOLSADatastoreConst.kHasAbsentHusband)) {
          household
              .setTypedAttribute(
                  MOLSADatastoreConst.kAnyOneHasAbsentFatherOrHusband,
                  Boolean.TRUE);
          household.update();
          return;
        }

      }
      household.setTypedAttribute(
          MOLSADatastoreConst.kAnyOneHasAbsentFatherOrHusband, Boolean.FALSE);
      household.update();
    } catch (NoSuchSchemaException e) {
      e.printStackTrace();
    }
  }
}