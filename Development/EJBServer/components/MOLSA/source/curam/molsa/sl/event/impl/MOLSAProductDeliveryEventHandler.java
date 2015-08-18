package curam.molsa.sl.event.impl;

import com.google.inject.Inject;

import curam.codetable.PRODUCTTYPE;
import curam.core.sl.struct.TaskCreateDetails;
import curam.events.MOLSAProductDelivery;
import curam.events.PRODUCTDELIVERY;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAMessageText;
import curam.molsa.sms.sl.struct.MOLSAMessageTextKey;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.events.impl.EventFilter;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.workflow.impl.EnactmentService;

public class MOLSAProductDeliveryEventHandler implements EventHandler,
		EventFilter {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	public MOLSAProductDeliveryEventHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event paramEvent) throws AppException,
			InformationalException {

		if (PRODUCTDELIVERY.SUSPEND.eventType
				.equals(paramEvent.eventKey.eventType)) {
			CaseHeader caseHeader = caseHeaderDAO
					.get(paramEvent.primaryEventData);
			// SMS Integration
			MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
			MOLSAMessageTextKey molsaMessageTextKey = new MOLSAMessageTextKey();
			molsaMessageTextKey.dtls.category = MOLSASMSMessageType.FOLLOWUP;
			molsaMessageTextKey.dtls.template = MOLSASMSMESSAGETEMPLATE.SUSPENDEDCASE;
			MOLSAMessageText messageText = molsasmsUtilObj
					.getSMSMessageText(molsaMessageTextKey);
			MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
			// Construct the input details
			concernRoleListAndMessageTextDetails.dtls.smsMessageText = messageText.dtls.smsMessageText;
			concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
					.valueOf(caseHeader.getConcernRole().getID());
			// Need to point to the right template
			concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.SUSPENDEDCASE;
			molsasmsUtilObj.sendSMS(concernRoleListAndMessageTextDetails);
		} else {
			final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
			TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
			taskCreateDetails.caseID = paramEvent.primaryEventData;
			CaseHeader caseHeader = caseHeaderDAO
					.get(paramEvent.primaryEventData);

			LocalisableString subject = null;

			subject = new LocalisableString(
					MOLSANOTIFICATION.INF_READY_FOR_FINAUDITOR_REVIEW);
			subject.arg(caseHeader.getCaseReference());

			String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
					productDeliveryDAO.get(taskCreateDetails.caseID)
							.getProductType().getCode(),
					TransactionInfo.getProgramLocale());
			subject.arg(productName);
			subject.arg(caseHeader.getConcernRole().getName());

			taskCreateDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());

			enactmentStructs.add(taskCreateDetails);
			EnactmentService.startProcessInV3CompatibilityMode(
					MOLSAConstants.kMOLSAProductDeliveryOpenTask,
					enactmentStructs);
		}

	}

	@Override
	public boolean accept(Event paramEvent) throws AppException,
			InformationalException {
		if (PRODUCTDELIVERY.SUSPEND.eventType
				.equals(paramEvent.eventKey.eventType)
				|| PRODUCTDELIVERY.UNSUSPEND.eventType
						.equals(paramEvent.eventKey.eventType)
				|| MOLSAProductDelivery.REACTIVATE.eventType
						.equals(paramEvent.eventKey.eventType)) {
			return true;
		}
		return false;
	}

}
