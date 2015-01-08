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
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * this is to get a person details from moi table based on QID
 */
@SuppressWarnings("restriction")
public class CustomFunctionGetPersonDetailsFromMOI extends CustomFunctor {
  @Override
  public Adaptor getAdaptorValue(RulesParameters rulesParameters) throws AppException, InformationalException {

    final List<Adaptor> parameters = getParameters();
    final String qid = ((StringAdaptor) parameters.get(0)).getStringValue(rulesParameters);
    final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
    updatePersonDetials(ieg2Context, qid);
    return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);
  }
/**
 * this is to update the person details
 * @param qid
 * a qid 
 * @param ieg2Context
 * an IEGContext arguement
 * @throws AppException
 * general exception
 * @throws InformationalException
 * general exception
 
 */
  @SuppressWarnings("static-access")
  private void updatePersonDetials(final IEG2Context ieg2Context, String qid) 
  throws AppException, InformationalException {
  

    MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
    PersonRegistrationDetails personRegistrationDetails = molsaParticipantHelper.getMOIDetailsByQID(qid);

    Datastore datastore = null;
    try {
      datastore = MOLSADatastoreUtility.getDatastoreInstance();

      final Entity application = datastore.readEntity(ieg2Context.getRootEntityID());

      final Entity[] personEntities = application.getChildEntities(datastore.getEntityType(MOLSADatastoreConst.kPerson));

      for (Entity personEntity : personEntities) {
        if (personEntity.getAttribute(MOLSADatastoreConst.qidNumber).equalsIgnoreCase(qid)) {
          personEntity.setTypedAttribute(MOLSADatastoreConst.kFirstName, personRegistrationDetails.firstForename);
          personEntity.setTypedAttribute(MOLSADatastoreConst.kMiddleInitial, personRegistrationDetails.otherForename);
          personEntity.setTypedAttribute(MOLSADatastoreConst.kLastName, personRegistrationDetails.surname);
          personEntity.setTypedAttribute(MOLSADatastoreConst.kDateOfBirth, personRegistrationDetails.dateOfBirth);
          personEntity.setTypedAttribute(MOLSADatastoreConst.kGender, personRegistrationDetails.sex);
          personEntity.update();
        }
      }
      return;

    } catch (NoSuchSchemaException e) {
      throw new AppRuntimeException(e);
    }
  }

}
