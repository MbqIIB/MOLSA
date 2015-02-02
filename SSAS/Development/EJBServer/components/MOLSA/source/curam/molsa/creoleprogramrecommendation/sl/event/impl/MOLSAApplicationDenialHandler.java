package curam.molsa.creoleprogramrecommendation.sl.event.impl;

import java.util.Iterator;
import java.util.List;

import com.google.inject.Inject;

import curam.application.codetable.impl.APPLICATIONSTATUSEntry;
import curam.application.entity.struct.ApplicationKey;
import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.application.impl.ProgramApplication;
import curam.application.impl.ProgramApplicationStatusDAO;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.core.sl.entity.struct.MilestoneDeliveryKey;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.sl.struct.ReadMilestoneDeliveryDetails;
import curam.creoleprogramrecommendation.codetable.impl.SIMULATEDDETERMINATIONDECLINEDREASONEntry;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationManager;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.events.impl.EventHandler;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;

public class MOLSAApplicationDenialHandler implements EventHandler {

	@Inject
	private CREOLEProgramRecommendationDAO creoleProgramRecommendationDAO;

	@Inject
	private SimulatedDeterminationManager simulatedDeterminationManager;

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
				if (!(APPLICATIONSTATUSEntry.DISPOSED.getCode().equals(
						application.getStatus().getCode()))) {
				  
					CREOLEProgramRecommendation creoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
							.newInstance();
					SimulatedDeterminationDetailsList simulatedDeterminationDtlsList = creoleProgramRecommendationObj
							.listLatestAppliedForEligibleSimulatedDeterminations(key);
					for (Iterator<SimulatedDeterminationDetails> iterator1 = simulatedDeterminationDtlsList.list
							.iterator(); iterator1.hasNext();) {
						SimulatedDeterminationDetails details = iterator1
								.next();

						if (details.isActionPending) {
							final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = creoleProgramRecommendationDAO
									.get(details.creoleProgramRecommendationID);
							final SimulatedDetermination simulatedDetermination = creoleProgramRecommendation
									.getSimulatedDetermination(details.simulatedDeterminationID);
							simulatedDeterminationManager
									.decline(
											creoleProgramRecommendation,
											simulatedDetermination,
											SIMULATEDDETERMINATIONDECLINEDREASONEntry.APPLICATION_DENIED,
											"");
						} else {
							actionTaken = true;
						}

					}
					List<ProgramApplication> programApplications = application
							.getProgramApplications();
					for (Iterator<ProgramApplication> iterator2 = programApplications
							.iterator(); iterator2.hasNext();) {
						ProgramApplication programApplication = iterator2
								.next();
						if (actionTaken) {
							programApplication.approve();
						} else {
						  //The call of application denial has been changes to dispose because the application denial expects the status of the application to be 'Ready For Determination' 
						  application.dispose();
						}

					}

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

}
