package curam.rules.functions;

import curam.codetable.impl.GENDEREntry;
import curam.codetable.impl.MARITALSTATUSEntry;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEG2Context;
import curam.molsa.codetable.impl.EDUCATIONLEVELEntry;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.datastore.impl.MOLSADatastoreUtility;
import curam.molsa.util.impl.MOLSADateUtil;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.Date;

/**
 * 
 * this is to give the person information
 * 
 */
@SuppressWarnings("restriction")
public class CustomFunctionPersonInfo extends CustomFunctor {
	@Override
	public Adaptor getAdaptorValue(RulesParameters rulesParameters)
			throws AppException, InformationalException {
		final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
		updateChildrenInfo(ieg2Context);
		return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);
	}

	/**
	 * 
	 * @param ieg2Context
	 *            an arguement storing ieg context value
	 * @throws AppException
	 *             general exception
	 * @throws InformationalException
	 *             general exception
	 */
	private void updateChildrenInfo(final IEG2Context ieg2Context)
			throws AppException, InformationalException {
		Datastore datastore = null;
		try {
			datastore = MOLSADatastoreUtility.getDatastoreInstance();

			final Entity application = datastore.readEntity(ieg2Context
					.getRootEntityID());

			final Entity[] personEntities = application
					.getChildEntities(datastore
							.getEntityType(MOLSADatastoreConst.kPerson));

			for (Entity personEntity : personEntities) {
				// Update Age
				personEntity
						.setAttribute(
								MOLSADatastoreConst.kCalculatedAge,
								String.valueOf(MOLSADateUtil.calculateAge(Date.getDate(personEntity
										.getAttribute(MOLSADatastoreConst.kDateOfBirth)))));

				if ((Integer.valueOf(personEntity
						.getAttribute(MOLSADatastoreConst.kCalculatedAge))
						.intValue()) > 60) {
					personEntity.setTypedAttribute(
							MOLSADatastoreConst.kIsSeniorCitizen, Boolean.TRUE);
				}
				if (!(personEntity
						.getTypedAttribute(MOLSADatastoreConst.kMaritalStatus)
						.equals(MARITALSTATUSEntry.MARRIED.getCode()))) {

					if ((personEntity
							.getTypedAttribute(MOLSADatastoreConst.kGender)
							.equals(GENDEREntry.MALE.getCode()))) {
						if ((Boolean) (personEntity
								.getTypedAttribute(MOLSADatastoreConst.kIsMemberEnrolledInSchool))) {
							personEntity.setTypedAttribute(
									MOLSADatastoreConst.kIsChild, Boolean.TRUE);
						} else if (!(Boolean) (personEntity
								.getTypedAttribute(MOLSADatastoreConst.kIsMemberEnrolledInSchool))) {
							if (null != personEntity
									.getTypedAttribute(MOLSADatastoreConst.kEducationLevel)) {
								if ((Boolean) (personEntity
										.getTypedAttribute(MOLSADatastoreConst.kEducationLevel)
										.equals(EDUCATIONLEVELEntry.NOTOFSCHOOLINGAGE
												.getCode()))) {
									personEntity.setTypedAttribute(
											MOLSADatastoreConst.kIsChild,
											Boolean.TRUE);
								}
							}

						}
						personEntity.update();
					} else if ((personEntity
							.getTypedAttribute(MOLSADatastoreConst.kGender)
							.equals(GENDEREntry.FEMALE.getCode()))) {
						personEntity.setTypedAttribute(
								MOLSADatastoreConst.kIsChild, Boolean.TRUE);
						personEntity.update();
					}
				} else {
					personEntity.setTypedAttribute(
							MOLSADatastoreConst.kIsChild, Boolean.FALSE);
					personEntity.update();
				}
			}
			return;

		} catch (NoSuchSchemaException e) {
			throw new AppRuntimeException(e);
		}
	}
}
