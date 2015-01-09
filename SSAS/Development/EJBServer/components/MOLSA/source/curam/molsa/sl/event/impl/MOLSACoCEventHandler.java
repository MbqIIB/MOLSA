package curam.molsa.sl.event.impl;

import com.google.inject.Inject;

import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKPRIORITY;
import curam.core.sl.fact.TaskManagementFactory;
import curam.core.sl.intf.TaskManagement;
import curam.core.sl.struct.TaskCreateDetails;
import curam.events.MOLSACoCEvent;
import curam.message.MOLSABPOCHANGEOFCIRCUMSTANCE;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;

/**
 * This event handler listens for events that are of interest to the Milestone
 * completion. When the completion event is raised, the handler creates tasks
 * according to the event type and assigns to corresponding workqueue.
 */
public class MOLSACoCEventHandler implements EventHandler {
	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	public MOLSACoCEventHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event paramEvent) throws AppException,
			InformationalException {

		TaskManagement taskManagementObj = TaskManagementFactory.newInstance();
		CaseHeader caseHeader = caseHeaderDAO
				.get(paramEvent.secondaryEventData);
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		taskCreateDetails.caseID = paramEvent.secondaryEventData;
		taskCreateDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;
		taskCreateDetails.priority = TASKPRIORITY.HIGH;
		taskCreateDetails.participantRoleID = caseHeader.getConcernRole()
				.getID();

		final LocalisableString description = new LocalisableString(
				MOLSABPOCHANGEOFCIRCUMSTANCE.INF_COC_TASK_SUBJECT);
		description.arg(caseHeader.getConcernRole().getName());
		description.arg(caseHeader.getCaseReference());
		taskCreateDetails.subject = description.getMessage(TransactionInfo
				.getProgramLocale());

		if (MOLSACoCEvent.AGING_HANDICAP_CHILDREN.eventType
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.assignedTo = String.valueOf(45004);

		} else if (MOLSACoCEvent.AGING_ANONYMOUS_PARENT
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.assignedTo = String.valueOf(45006);

		} else if (MOLSACoCEvent.POTENTIAL_SENIOR_BENEFIT
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.assignedTo = String.valueOf(45005);

		}

		taskManagementObj.create(taskCreateDetails);

	}
}
