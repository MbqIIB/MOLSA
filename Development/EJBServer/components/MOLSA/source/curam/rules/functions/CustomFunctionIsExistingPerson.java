package curam.rules.functions;

import java.util.List;

import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
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
public class CustomFunctionIsExistingPerson extends CustomFunctor {

  /**
  * 
  */
  public CustomFunctionIsExistingPerson() {

    GuiceWrapper.getInjector().injectMembers(this);
  }

  /**
   * Updates the Application entity submit date
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   * @param rulesParameters
   * rules parameters
   * @return Boolean value adapter (true\false) after a successful update.
   */
  @Override
  @AccessLevel(AccessLevelType.EXTERNAL)
  public Adaptor getAdaptorValue(final RulesParameters rulesParameters) 
  throws AppException, InformationalException {

    final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
    Datastore datastore = null;
    final List<Adaptor> parameters = getParameters();
    final String qidNumber = ((StringAdaptor) parameters.get(0)).getStringValue(rulesParameters);
    try {
      datastore = MOLSADatastoreUtility.getDatastoreInstance();
      final Entity application = datastore.readEntity(ieg2Context.getRootEntityID());
      final Entity[] personEntities = application.getChildEntities(datastore.getEntityType(MOLSADatastoreConst.kPerson));
      for (Entity personEntity : personEntities) {
        if (personEntity.getAttribute(MOLSADatastoreConst.qidNumber).equalsIgnoreCase(qidNumber)) {
          return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(Boolean.FALSE));
        }
      }

    } catch (NoSuchSchemaException e) {
      throw new AppRuntimeException(e);

    }
    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(Boolean.TRUE));
  }
}
