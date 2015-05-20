package curam.molsa.creoleprogramrecommendation.sl.event.impl;

import java.util.Iterator;
import java.util.List;

import com.google.inject.Inject;

import curam.application.codetable.impl.APPLICATIONSTATUSEntry;
import curam.application.entity.struct.ApplicationKey;
import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.application.workflow.struct.ApplicationWorkflowDetails;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.core.sl.entity.struct.MilestoneDeliveryKey;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.sl.struct.ReadMilestoneDeliveryDetails;
import curam.core.sl.struct.TaskCreateDetails;
import curam.events.MOLSAApplicationNotification;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventFilter;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DeepCloneable;
import curam.util.workflow.impl.EnactmentService;

public class MOLSAApplicationDenialHandler implements EventHandler, EventFilter {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	/**
	 * The ApplicationDAO .
	 **/
	@Inject
	private ApplicationDAO applicationDAO;

	public MOLSAApplicationDenialHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event event) throws AppException,
			InformationalException {

		MilestoneDelivery deliveryObj = MilestoneDeliveryFactory.newInstance();

		MilestoneDeliveryKey deliveryKey = new MilestoneDeliveryKey();
		deliveryKey.milestoneDeliveryID = event.primaryEventData;
		ReadMilestoneDeliveryDetails readMilestoneDeliveryDetails = deliveryObj
				.read(deliveryKey);
		if (!readMilestoneDeliveryDetails.readDetails.status
				.equals(MILESTONESTATUSCODEEntry.COMPLETED.getCode())) {

			CaseHeader caseHeader = caseHeaderDAO.get(event.secondaryEventData);
			ApplicationKey key = new ApplicationKey();
			boolean actionTaken = false;

			final List<Application> applications = applicationDAO
					.searchByCase(caseHeader);
			for (Iterator<Application> iterator = applications.iterator(); iterator
					.hasNext();) {
				Application application = iterator.next();
				key.applicationID = application.getID();
				if (!(APPLICATIONSTATUSEntry.DISPOSED.getCode()
						.equals(application.getStatus().getCode()))) {

					final java.util.List<DeepCloneable> enactmentStructs = new java.util.ArrayList<DeepCloneable>();
					
					ApplicationWorkflowDetails workflowDetails =new ApplicationWorkflowDetails();
					workflowDetails.applicationID = application.getID();
					
					TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
					taskCreateDetails.caseID = application.getCase().getID();

					final LocalisableString subject = new LocalisableString(
							MOLSANOTIFICATION.INF_APPLICATION_WITHDRAW);

					subject.arg(application.getReference());
					subject.arg(application.getPrimaryIntakeApplicant()
							.getConcernRole().getName());

					taskCreateDetails.subject = subject
							.getMessage(TransactionInfo.getProgramLocale());

					enactmentStructs.add(taskCreateDetails);
					enactmentStructs.add(workflowDetails);
					EnactmentService.startProcessInV3CompatibilityMode(
							MOLSAConstants.kMOLSAApplicationWithdrawTask,
							enactmentStructs);
				}
			}

			completeMilestone(readMilestoneDeliveryDetails, event);

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

	@Override
	public boolean accept(Event event) throws AppException,
			InformationalException {
		return (event.eventKey.eventClass
		.equals(MOLSAApplicationNotification.APPLICATION_AUTO_DENIAL.eventClass) && (event.eventKey.eventType
	.equals(MOLSAApplicationNotification.APPLICATION_AUTO_DENIAL.eventType)));
	}

}
