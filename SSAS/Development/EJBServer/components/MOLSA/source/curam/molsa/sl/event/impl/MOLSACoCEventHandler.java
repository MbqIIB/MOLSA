package curam.molsa.sl.event.impl;

import java.util.ArrayList;
import java.util.List;

import curam.codetable.TARGETITEMTYPE;
import curam.core.sl.fact.TaskManagementFactory;
import curam.core.sl.intf.TaskManagement;
import curam.core.sl.struct.TaskCreateDetails;
import curam.events.MOLSACoCEvent;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * This event handler listens for events that are of interest to the Milestone
 * completion. When the completion event is raised, the handler delegates to the
 * appropriate class to populate the creation details and then creates the
 * milestone.
 */
public class MOLSACoCEventHandler implements EventHandler {

	private String kAGING_HANDICAP_CHILDREN = "Aging Handicap Children";

	private String kAnonymous_Parent = "Anonymous Parent";

	private String kSenior_Benefit = "Senior Benefit";

	@Override
	public void eventRaised(Event paramEvent) throws AppException,
			InformationalException {

		TaskManagement taskManagementObj = TaskManagementFactory.newInstance();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		taskCreateDetails.caseID = paramEvent.primaryEventData;
		taskCreateDetails.comments = "comments";
		taskCreateDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;

		if (MOLSACoCEvent.AGING_HANDICAP_CHILDREN
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.subject = "Handicap";
			taskCreateDetails.assignedTo = kAGING_HANDICAP_CHILDREN;

		} else if (MOLSACoCEvent.AGING_ANONYMOUS_PARENT
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.subject = "Anonymous Parent";
			taskCreateDetails.assignedTo = kAnonymous_Parent;

		} else if (MOLSACoCEvent.POTENTIAL_SENIOR_BENEFIT
				.equals(paramEvent.eventKey.eventType)) {
			taskCreateDetails.subject = "Senior Benefit";
			taskCreateDetails.assignedTo = kSenior_Benefit;

		}

		taskManagementObj.create(taskCreateDetails);

	}

}
