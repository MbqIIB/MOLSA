package curam.rules.functions;

import com.google.inject.Inject;

import curam.creole.storage.database.RuleSetManager;
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
public class CustomFunctionInitializeEntities extends CustomFunctor {

	@Inject
	private RuleSetManager ruleSetManager;

	/**
  * 
  */
	public CustomFunctionInitializeEntities() {

		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * Updates the Application entity start of month date
	 * 
	 * @param rulesParameters
	 *            rules parameters
	 * @throws AppException
	 *             GeneralException
	 * @throws InformationalException
	 *             GeneralException
	 * @return Boolean value adapter (true\false) after a successful update.
	 */
	@Override
	@AccessLevel(AccessLevelType.EXTERNAL)
	public Adaptor getAdaptorValue(final RulesParameters rulesParameters)
			throws AppException, InformationalException {

		final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
		Datastore datastore;
	    Date applicationDate = null;
		try {
			datastore = MOLSADatastoreUtility
					.openDatastore(MOLSADatastoreConst.kDataStoreSchemaName);
			final Entity application = datastore.readEntity(ieg2Context
					.getRootEntityID());
			 final Entity[] personEntities = application.getChildEntities(datastore
			          .getEntityType(MOLSADatastoreConst.kPerson));
		    for (Entity personEntity : personEntities) {
		        if ((Boolean) personEntity
		            .getTypedAttribute(MOLSADatastoreConst.kIsPrimaryParticipant)) {
		          applicationDate = (Date) personEntity
		              .getTypedAttribute(MOLSADatastoreConst.kCtrlQApplicationDate);
		        }
		      }
		    application.setTypedAttribute(MOLSADatastoreConst.kSubmitDate,
		            applicationDate);
			application.setTypedAttribute(
					MOLSADatastoreConst.kApplicationMonthStartDate,
					MOLSADateUtil.shiftToStartOfMonth(applicationDate));

		} catch (NoSuchSchemaException e) {

			throw new AppRuntimeException(e);
		}

		return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);

	}
}
