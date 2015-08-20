package curam.molsa.sl.event.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKPRIORITY;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.core.fact.CaseHeaderFactory;
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
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseStatusCode;
import curam.message.MOLSABPORECERTIFICATION;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.DateTime;

/**
 * This event handler listens for events that are of interest to the
 * Certification End date Prior Notice. When the event is raised, the handler
 * creates tasks according to the event type and assigns to corresponding
 * workqueue and sends SMS to the client.
 */
public class MOLSACertEndEventHandler implements EventHandler {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	public MOLSACertEndEventHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event event) throws AppException,
			InformationalException {

		MilestoneDelivery deliveryObj = MilestoneDeliveryFactory.newInstance();
		MilestoneDeliveryKey key = new MilestoneDeliveryKey();
		key.milestoneDeliveryID = event.primaryEventData;
		ReadMilestoneDeliveryDetails readMilestoneDeliveryDetails = deliveryObj
				.read(key);
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		caseHeaderKey.caseID = readMilestoneDeliveryDetails.readDetails.caseID;
		 CaseStatusCode caseStatusCode = CaseHeaderFactory.newInstance().readStatus(
				 caseHeaderKey);
		if (!caseStatusCode.statusCode.equals(CASESTATUS.CLOSED)) {
			if (!readMilestoneDeliveryDetails.readDetails.status
					.equals(MILESTONESTATUSCODEEntry.COMPLETED.getCode())) {
				CaseHeader caseHeader = caseHeaderDAO.get(event.secondaryEventData);
				TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
				taskCreateDetails.caseID = event.secondaryEventData;
				taskCreateDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;
				taskCreateDetails.priority = TASKPRIORITY.HIGH;
				taskCreateDetails.participantRoleID = caseHeader.getConcernRole()
						.getID();
	
				final LocalisableString description = new LocalisableString(
						MOLSABPORECERTIFICATION.INF_RECERTIFY_TASK_SUBJECT);
				description.arg(caseHeader.getCaseReference());
				description.arg(CodeTable.getOneItem(CASETYPECODE.TABLENAME,
						caseHeader.getCaseType().getCode(),
						TransactionInfo.getProgramLocale()));
				description.arg(caseHeader.getConcernRole().getName());
	
				taskCreateDetails.subject = description.getMessage(TransactionInfo
						.getProgramLocale());
	
				taskCreateDetails.assignedTo = String.valueOf(45007);
	
				final TaskManagementUtility taskManagementUtilityObj = TaskManagementUtilityFactory
						.newInstance();
				final DeadlineDuration deadlineDuration = new DeadlineDuration();
				final DateTimeInSecondsKey dateTimeInSecondsKey = new DateTimeInSecondsKey();
				dateTimeInSecondsKey.dateTime = DateTime.kZeroDateTime;
	
				deadlineDuration.deadlineDuration = taskManagementUtilityObj
						.convertDateTimeToSeconds(dateTimeInSecondsKey).seconds;
	
				final List<Object> enactmentStructs = new ArrayList<Object>();
				enactmentStructs.add(taskCreateDetails);
				enactmentStructs.add(deadlineDuration);
	
				curam.util.workflow.impl.EnactmentService
						.startProcessInV3CompatibilityMode(
								MOLSAConstants.kmanualCase, enactmentStructs);
	
				curam.molsa.sms.sl.intf.MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory
						.newInstance();
				curam.molsa.sms.sl.struct.MOLSAMessageTextKey molsaMessageTextKey = new curam.molsa.sms.sl.struct.MOLSAMessageTextKey();
				molsaMessageTextKey.dtls.category = MOLSASMSMessageType.FOLLOWUP;
				molsaMessageTextKey.dtls.template = MOLSASMSMESSAGETEMPLATE.RENEWALOFMOLSABENEFIT;
				curam.molsa.sms.sl.struct.MOLSAMessageText messageText = molsasmsUtilObj
						.getSMSMessageText(molsaMessageTextKey);
				MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
				// Set the message details.
				concernRoleListAndMessageTextDetails.dtls.smsMessageText = messageText.dtls.smsMessageText;
				concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
						.valueOf(caseHeader.getConcernRole().getID());
				// Pointing to the message template.
				concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.RENEWALOFMOLSABENEFIT;
				molsasmsUtilObj.sendSMSDPMode(concernRoleListAndMessageTextDetails);
				completeMilestone(readMilestoneDeliveryDetails, event);
	
			}
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
