package curam.molsa.application.impl;

import curam.application.facade.fact.ApplicationFactory;
import curam.application.facade.struct.ApplicationID;
import curam.application.facade.struct.SubmitApplicationDetails;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.facade.fact.IEGRuntimeFactory;
import curam.ieg.facade.intf.IEGRuntime;
import curam.ieg.facade.struct.IEGRootEntityID;
import curam.ieg.facade.struct.IEGScriptExecutionID;
import curam.ieg.impl.IEGScriptExecutionFactory;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;

public class MOLSAApplication extends
		curam.molsa.application.base.MOLSAApplication {

	@Override
	public ApplicationID submitApplication(SubmitApplicationDetails appDetails)
			throws AppException, InformationalException {

		Datastore datastore = openDatastore(appDetails.executionID);

		IEGScriptExecutionID paramIEGScriptExecutionID = new IEGScriptExecutionID();
		paramIEGScriptExecutionID.executionID = appDetails.executionID;
		final IEGRuntime iegRuntime = IEGRuntimeFactory.newInstance();

		IEGRootEntityID rootEntityID = iegRuntime
				.getScriptExecutionRootEntityID(paramIEGScriptExecutionID);
		final Entity application = datastore.readEntity(rootEntityID.entityID);
		final Entity[] applicationDetailsList = application
				.getChildEntities(datastore
						.getEntityType(MOLSADatastoreConst.kApplicationDetails));
		for (Entity entity : applicationDetailsList) {
			if (Boolean.parseBoolean(entity
					.getAttribute(MOLSADatastoreConst.KIsCOC))) {
				return ApplicationFactory.newInstance()
						.submitApplicationForCase1(appDetails);
			}
		}
		return ApplicationFactory.newInstance().submitApplication1(appDetails);

	}

	public Datastore openDatastore(final long executionID) throws AppException,
			InformationalException {

		final DatastoreFactory datastoreFactory = DatastoreFactory
				.newInstance();

		Datastore datastore = null;
		try {

			datastore = datastoreFactory
					.openDatastore(IEGScriptExecutionFactory.getInstance()
							.getScriptExecutionObject(executionID)
							.getSchemaName());

		} catch (final NoSuchSchemaException e) {

			throw new AppRuntimeException(e);

		}
		return datastore;

	}

}
