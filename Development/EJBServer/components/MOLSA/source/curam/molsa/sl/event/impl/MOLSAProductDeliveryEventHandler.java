package curam.molsa.sl.event.impl;

import com.google.inject.Inject;

import curam.events.PRODUCTDELIVERY;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSAMessageText;
import curam.molsa.sms.sl.struct.MOLSAMessageTextKey;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventFilter;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;

public class MOLSAProductDeliveryEventHandler implements EventHandler,
		EventFilter {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	public MOLSAProductDeliveryEventHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event paramEvent) throws AppException,
			InformationalException {
		CaseHeader caseHeader = caseHeaderDAO.get(paramEvent.primaryEventData);
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
	}

	@Override
	public boolean accept(Event paramEvent) throws AppException,
			InformationalException {
		if (PRODUCTDELIVERY.SUSPEND.eventType.equals(paramEvent.eventKey.eventType)) {
			return true;
		}
		return false;
	}

}
