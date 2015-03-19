package curam.molsa.screening.facade.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.citizenworkspace.pageplayer.impl.PagePlayerStateDAO;
import curam.citizenworkspace.pageplayer.internal.impl.PagePlayerStateInternal;
import curam.codetable.TARGETITEMTYPE;
import curam.core.facade.struct.TaskCreateDetails;
import curam.core.sl.fact.TaskManagementUtilityFactory;
import curam.core.sl.infrastructure.impl.WorkAllocationConst;
import curam.core.sl.intf.TaskManagementUtility;
import curam.core.sl.struct.DateTimeInSecondsKey;
import curam.core.sl.struct.DeadlineDuration;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEGScriptExecution;
import curam.ieg.impl.IEGScriptExecutionFactory;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.screening.facade.struct.NotificationResult;
import curam.molsa.screening.facade.struct.PlayerIDAndExecutionID;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.DateTime;

public class MolsaScreeningNotification extends
		curam.molsa.screening.facade.base.MolsaScreeningNotification {

	@SuppressWarnings("restriction")
	/**
	 * PagePlayerState DAO.
	 */
	@Inject
	private PagePlayerStateDAO pagePlayerStateDAO;

	public MolsaScreeningNotification() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@SuppressWarnings("restriction")
	@Override
	public NotificationResult sendNotificationToCaseWorker(
			PlayerIDAndExecutionID playerAndExecutionID) throws AppException,
			InformationalException {
		PagePlayerStateInternal pagePlayerState = (PagePlayerStateInternal) pagePlayerStateDAO
				.get(playerAndExecutionID.executionID);

		final IEGScriptExecution iegScriptExecution = IEGScriptExecutionFactory
				.getInstance().getScriptExecutionObject(
						pagePlayerState.getScreeningScriptInfoID());
		final String schemaName = iegScriptExecution.getSchemaName();

		Datastore datastore = null;
		try {
			datastore = DatastoreFactory.newInstance()
					.openDatastore(schemaName);
		} catch (NoSuchSchemaException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		final Entity application = datastore.readEntity(iegScriptExecution
				.getRootEntityID());
		final Entity[] personEntities = application.getChildEntities(datastore
				.getEntityType(MOLSADatastoreConst.kPerson));
		String qid = null;
		String name = null;
		String phoneNumber = null;

		for (Entity personEntity : personEntities) {
			if ((Boolean) personEntity
					.getTypedAttribute(MOLSADatastoreConst.kIsPrimaryParticipant)) {
				qid = personEntity.getAttribute(MOLSADatastoreConst.kQIDNumber);
				name = personEntity
						.getAttribute(MOLSADatastoreConst.kFirstName);
				phoneNumber = personEntity.getAttribute(MOLSADatastoreConst.KCellPhoneNumber);

			}

		}

		// Assign the case id and assigned to values to the task created to the
		// case owner
		final TaskCreateDetails taskCreateDetail = new TaskCreateDetails();

		taskCreateDetail.taskDetails.assignedTo = MOLSAConstants.kCaseWorkerWorkQueue;
		taskCreateDetail.taskDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;

		AppException message = new AppException(
				MOLSANOTIFICATION.SCREENING_PERSON);
		message.arg(name);
		message.arg(phoneNumber);
		message.arg(qid);
		taskCreateDetail.taskDetails.subject = message.getMessage();

		final DeadlineDuration deadlineDuration = new DeadlineDuration();
		final DateTimeInSecondsKey dateTimeInSecondsKey = new DateTimeInSecondsKey();
		final TaskManagementUtility taskManagementUtilityObj = TaskManagementUtilityFactory
				.newInstance();
		dateTimeInSecondsKey.dateTime = DateTime.kZeroDateTime;
		deadlineDuration.deadlineDuration = taskManagementUtilityObj
				.convertDateTimeToSeconds(dateTimeInSecondsKey).seconds;

		// Create the list we will pass to the enactment service.
		final List<Object> enactmentStructs = new ArrayList<Object>();
		enactmentStructs.add(taskCreateDetail.taskDetails);
		enactmentStructs.add(deadlineDuration);
		curam.util.workflow.impl.EnactmentService
				.startProcessInV3CompatibilityMode(WorkAllocationConst.kManual,
						enactmentStructs);
		NotificationResult notificationResult = new NotificationResult();
		notificationResult.notificationInd = Boolean.TRUE;
		return notificationResult;
	}

}
