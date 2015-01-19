package curam.molsa.sl.event.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASETYPECODE;
import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKPRIORITY;
import curam.core.sl.struct.TaskCreateDetails;
import curam.message.MOLSABPORECERTIFICATION;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.sms.facade.fact.MOLSAMessageServiceFactory;
import curam.molsa.sms.facade.intf.MOLSAMessageService;
import curam.molsa.sms.facade.struct.MOLSAConcernRoleListAndMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageTextKey;
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
		description.arg(CodeTable.getOneItem(CASETYPECODE.TABLENAME, caseHeader
				.getCaseType().getCode(), TransactionInfo.getProgramLocale()));
		description.arg(caseHeader.getConcernRole().getName());

		taskCreateDetails.subject = description.getMessage(TransactionInfo
				.getProgramLocale());

		taskCreateDetails.assignedTo = String.valueOf(45007);
		final List<Object> enactmentStructs = new ArrayList<Object>();
		enactmentStructs.add(taskCreateDetails);
		curam.util.workflow.impl.EnactmentService
				.startProcessInV3CompatibilityMode(MOLSAConstants.kmanualCase,
						enactmentStructs);

		MOLSAMessageService messageServiceObj = MOLSAMessageServiceFactory
				.newInstance();
		MOLSAMessageTextKey messageTextKey = new MOLSAMessageTextKey();
		messageTextKey.category = MOLSASMSMessageType.FOLLOWUP;
		messageTextKey.template = MOLSASMSMESSAGETEMPLATE.BIRTHCERTIFICATE;

		MOLSAMessageText messageText = messageServiceObj
				.getSMSMessageText(messageTextKey);
		MOLSAConcernRoleListAndMessageText roleListAndMessageText = new MOLSAConcernRoleListAndMessageText();
		roleListAndMessageText.smsMessageType = MOLSASMSMESSAGETEMPLATE.BIRTHCERTIFICATE;
		roleListAndMessageText.smsMessageText = messageText.smsMessageText;
		roleListAndMessageText.concernRoleTabbedList = String
				.valueOf(caseHeader.getConcernRole().getID());
		messageServiceObj.sendSMS(roleListAndMessageText);

	}

}
