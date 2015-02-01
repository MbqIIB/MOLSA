package curam.molsa.sl.event.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKPRIORITY;
import curam.codetable.impl.CASETYPECODEEntry;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.core.sl.entity.struct.MilestoneDeliveryKey;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.fact.TaskManagementUtilityFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.intf.TaskManagementUtility;
import curam.core.sl.struct.DateTimeInSecondsKey;
import curam.core.sl.struct.DeadlineDuration;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.sl.struct.ReadMilestoneDeliveryDetails;
import curam.core.sl.struct.TaskCreateDetails;
import curam.events.MOLSACoCEvent;
import curam.message.MOLSABPOCHANGEOFCIRCUMSTANCE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DateTime;

/**
 * This event handler listens for events that are of interest to the Milestone
 * completion. When the completion event is raised, the handler creates tasks
 * according to the event type and assigns to corresponding workqueue.
 */
public class MOLSACoCEventHandler implements EventHandler {
	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	private ProductDAO productDAO;

	public MOLSACoCEventHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event paramEvent) throws AppException,
			InformationalException {

		MilestoneDelivery deliveryObj = MilestoneDeliveryFactory.newInstance();

		MilestoneDeliveryKey key = new MilestoneDeliveryKey();
		key.milestoneDeliveryID = paramEvent.primaryEventData;
		ReadMilestoneDeliveryDetails readMilestoneDeliveryDetails = deliveryObj
				.read(key);

		if (!readMilestoneDeliveryDetails.readDetails.status
				.equals(MILESTONESTATUSCODEEntry.COMPLETED.getCode())) {
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
			if (CASETYPECODEEntry.PRODUCTDELIVERY.getCode().equals(
					caseHeader.getCaseType())) {
				description.arg(productDAO.get(paramEvent.secondaryEventData)
						.getProductType().getCode());
			} else {
				description.arg(caseHeader.getCaseReference());
			}
			taskCreateDetails.subject = description.getMessage(TransactionInfo
					.getProgramLocale());

			if (MOLSACoCEvent.AGING_HANDICAP_CHILDREN.eventType
					.equals(paramEvent.eventKey.eventType)) {
				taskCreateDetails.assignedTo = String.valueOf(45004);

			} else if (MOLSACoCEvent.AGING_ANONYMOUS_PARENT.eventType
					.equals(paramEvent.eventKey.eventType)) {
				taskCreateDetails.assignedTo = String.valueOf(45006);

			} else if (MOLSACoCEvent.POTENTIAL_SENIOR_BENEFIT.eventType
					.equals(paramEvent.eventKey.eventType)) {
				taskCreateDetails.assignedTo = String.valueOf(45005);
			}

			final DeadlineDuration deadlineDuration = new DeadlineDuration();
			final DateTimeInSecondsKey dateTimeInSecondsKey = new DateTimeInSecondsKey();
			final TaskManagementUtility taskManagementUtilityObj = TaskManagementUtilityFactory
					.newInstance();

			dateTimeInSecondsKey.dateTime = DateTime.kZeroDateTime;
			deadlineDuration.deadlineDuration = taskManagementUtilityObj
					.convertDateTimeToSeconds(dateTimeInSecondsKey).seconds;
			final List<Object> enactmentStructs = new ArrayList<Object>();
			enactmentStructs.add(taskCreateDetails);
			enactmentStructs.add(deadlineDuration);
			curam.util.workflow.impl.EnactmentService
					.startProcessInV3CompatibilityMode(
							MOLSAConstants.kmanualCase, enactmentStructs);
			completeMilestone(readMilestoneDeliveryDetails, paramEvent);

		}

	}

	private void completeMilestone(
			ReadMilestoneDeliveryDetails readMilestoneDeliveryDetails,
			Event paramEvent) throws AppException, InformationalException {
		MilestoneDelivery milestoneDeliveryObj = MilestoneDeliveryFactory
				.newInstance();
		MilestoneDeliveryDtls modifyMilestoneDeliveryDtls = new MilestoneDeliveryDtls();
		modifyMilestoneDeliveryDtls.dtls.milestoneDeliveryID = paramEvent.primaryEventData;
		modifyMilestoneDeliveryDtls.dtls.actualStartDate = readMilestoneDeliveryDetails.readDetails.actualStartDate;
		modifyMilestoneDeliveryDtls.dtls.actualEndDate = Date.getCurrentDate();
		modifyMilestoneDeliveryDtls.dtls.caseID = readMilestoneDeliveryDetails.readDetails.caseID;
		modifyMilestoneDeliveryDtls.dtls.comments = readMilestoneDeliveryDetails.readDetails.comments;
		modifyMilestoneDeliveryDtls.dtls.expectedEndDate = readMilestoneDeliveryDetails.readDetails.expectedEndDate;
		modifyMilestoneDeliveryDtls.dtls.expectedStartDate = readMilestoneDeliveryDetails.readDetails.expectedStartDate;
		modifyMilestoneDeliveryDtls.dtls.milestoneConfigurationID = readMilestoneDeliveryDetails.readDetails.milestoneConfigurationID;
		modifyMilestoneDeliveryDtls.dtls.ownerUserName = readMilestoneDeliveryDetails.readDetails.ownerUserName;
		modifyMilestoneDeliveryDtls.dtls.status = MILESTONESTATUSCODEEntry.COMPLETED
				.toString();
		modifyMilestoneDeliveryDtls.dtls.versionNo = readMilestoneDeliveryDetails.readDetails.versionNo;

		milestoneDeliveryObj.modify(modifyMilestoneDeliveryDtls);
	}
}
