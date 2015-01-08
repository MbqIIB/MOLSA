package curam.rules.functions;

import java.util.List;

import curam.core.struct.PersonRegistrationDetails;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.molsa.util.impl.MOLSAParticipantHelper;
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
public class CustomFunctionUpdateAbsentPersonInfo extends CustomFunctor {

  /**
  * 
  */
  public CustomFunctionUpdateAbsentPersonInfo() {

    GuiceWrapper.getInjector().injectMembers(this);
  }

 /**
  *  Updates the Application entity submit date
  *  @param rulesParameters
  *  rules parameters
  *  @throws AppException
  *  GeneralException
  *  @throws InformationalException
  *  GeneralException
  *  @return Boolean value adapter (true\false) after a successful update.
  */
  @SuppressWarnings({ "static-access", "unused" })
  @Override
  @AccessLevel(AccessLevelType.EXTERNAL)
  public Adaptor getAdaptorValue(final RulesParameters rulesParameters)
      throws AppException, InformationalException {

    final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
    final List<Adaptor> parameters = getParameters();
    final String qid =((StringAdaptor) parameters.get(0)).getStringValue(rulesParameters);
    Datastore datastore = null;
    try {
      datastore = MOLSADatastoreUtility.getDatastoreInstance();

      final Entity application = datastore.readEntity(ieg2Context
          .getRootEntityID());

      final Entity[] personEntities = application.getChildEntities(datastore
          .getEntityType(MOLSADatastoreConst.kPerson));
      
          final Entity[] absentFatherEntites = application
              .getChildEntities(datastore
                  .getEntityType(MOLSADatastoreConst.kAbsentFather));
                  
          MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
          PersonRegistrationDetails personRegistrationDetails = molsaParticipantHelper.getMOIDetailsByQID(qid);
          if (null != absentFatherEntites) {
            // Considering only one absent father in household
            final Entity absentFather = absentFatherEntites[0];
           
            absentFather.setTypedAttribute(
                MOLSADatastoreConst.kFirstName,
                personRegistrationDetails.firstForename);
            absentFather.setTypedAttribute(
                MOLSADatastoreConst.kMiddleInitial,
                personRegistrationDetails.otherForename);
            absentFather.setTypedAttribute(
                MOLSADatastoreConst.kLastName,
                personRegistrationDetails.surname);
            absentFather.setTypedAttribute(
                MOLSADatastoreConst.kDateOfBirth,
                personRegistrationDetails.dateOfBirth);
            absentFather.setTypedAttribute(
                MOLSADatastoreConst.qidNumber,
                qid);
            absentFather.update();
            absentFather.getParentEntity().update();           
          }
        
      
    } catch (NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }

    return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);

  }
}
