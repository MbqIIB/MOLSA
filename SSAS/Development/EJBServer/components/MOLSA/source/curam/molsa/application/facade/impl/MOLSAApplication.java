package curam.molsa.application.facade.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.application.facade.fact.ApplicationFactory;
import curam.application.facade.fact.MatchClientFactory;
import curam.application.facade.struct.ApplicationID;
import curam.application.facade.struct.ClientWizardDisplayDetails;
import curam.application.facade.struct.RegisteredOrProspectPersonMergeDetails;
import curam.application.facade.struct.SubmitApplicationDetails;
import curam.application.impl.Application;
import curam.application.impl.ApplicationConfiguration;
import curam.application.impl.ApplicationDAO;
import curam.application.workflow.struct.ApplicationWorkflowDetails;
import curam.codetable.PRODUCTTYPE;
import curam.core.impl.CuramConst;
import curam.core.sl.struct.TaskCreateDetails;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.events.MOLSAAPPROVALTASK;
import curam.events.MOLSAApplicationNotification;
import curam.ieg.facade.fact.IEGRuntimeFactory;
import curam.ieg.facade.intf.IEGRuntime;
import curam.ieg.facade.struct.IEGRootEntityID;
import curam.ieg.facade.struct.IEGScriptExecutionID;
import curam.ieg.impl.IEGScriptExecutionFactory;
import curam.message.BPOPRODUCTDELIVERYAPPROVAL;
import curam.message.GENERALSEARCH;
import curam.message.MOLSANOTIFICATION;
import curam.message.MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY;
import curam.message.application.GENAPPLICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.struct.ConcernRoleIDKey;
import curam.util.events.impl.EventService;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.DeepCloneable;
import curam.util.workflow.impl.EnactmentService;

public class MOLSAApplication extends
		curam.molsa.application.facade.base.MOLSAApplication {

	@Inject
	protected ApplicationDAO applicationDAO;

	@Inject
	private ApplicationConfiguration applicationConfiguration;

	public MOLSAApplication() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

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
		if (Boolean.parseBoolean(application
				.getAttribute(MOLSADatastoreConst.KIsCOC))) {
			return ApplicationFactory.newInstance().submitApplicationForCase1(
					appDetails);
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

	@Override
	public void rejectApplication(ApplicationID applicationID)
			throws AppException, InformationalException {
		final List<DeepCloneable> enactmentStructs = new ArrayList<DeepCloneable>();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();

		Application application = applicationDAO
				.get(applicationID.applicationID);
		application.resetToSubmitted();
		taskCreateDetails.caseID = application.getCase().getID();
		final LocalisableString subject = new LocalisableString(
				MOLSANOTIFICATION.INF_REJECT_OF_APPLICATION_REVIEW);

		subject.arg(application.getReference());
		subject.arg(application.getPrimaryIntakeApplicant().getConcernRole()
				.getName());

		taskCreateDetails.subject = subject.getMessage(TransactionInfo
				.getProgramLocale());

		ApplicationWorkflowDetails workflowDetails = applicationConfiguration
				.getReadyForDeterminationWorkflowDetails(application);

		enactmentStructs.add(taskCreateDetails);
		enactmentStructs.add(workflowDetails);
		EnactmentService.startProcessInV3CompatibilityMode(
				MOLSAConstants.kMOLSAApplicationRejectTask, enactmentStructs);
		Event eventKey = new Event();
		eventKey.eventKey.eventClass = MOLSAApplicationNotification.APPLICATION_REJECTED.eventClass;
		eventKey.eventKey.eventType = MOLSAApplicationNotification.APPLICATION_REJECTED.eventType;
		eventKey.primaryEventData = applicationID.applicationID;
		EventService.raiseEvent(eventKey);
	}

	@Override
	public RegisteredOrProspectPersonMergeDetails readParticipantDetailsForMerge(
			ConcernRoleIDKey key) throws AppException, InformationalException {

		if (key.concernRoleID == 0) {

			final AppException appException = new AppException(
					GENERALSEARCH.INF_SEARCH_NORECORDSFOUND);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}
		return MatchClientFactory.newInstance().readParticipantDetailsForMerge(
				key);

		
	}

	public void validateSelectedParticipant(ConcernRoleIDKey key)
			throws InformationalException {

		if (key.concernRoleID == 0) {

			final AppException appException = new AppException(
					MOLSANOTIFICATION.ERR_NO_MEMBERS_SELECTED);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}

	}

}
