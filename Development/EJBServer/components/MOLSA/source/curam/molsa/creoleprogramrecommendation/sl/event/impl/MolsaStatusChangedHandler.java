package curam.molsa.creoleprogramrecommendation.sl.event.impl;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.application.impl.ApplicationConfiguration;
import curam.application.impl.ApplicationLinkDAO;
import curam.application.impl.ProgramApplication;
import curam.application.impl.ProgramApplicationDAO;
import curam.events.ApplicationDisposed;
import curam.events.ProgramApplicationStatusChanged;
import curam.util.events.impl.EventFilter;
import curam.util.events.impl.EventHandler;
import curam.util.events.impl.EventService;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.workspaceservices.intake.impl.IntakeApplication;
import curam.workspaceservices.intake.impl.IntakeProgramApplication;
import curam.workspaceservices.intake.impl.ProgramType;

public class MolsaStatusChangedHandler implements EventFilter, EventHandler {
	@Inject
	private ProgramApplicationDAO programApplicationDAO;

	@Inject
	private ApplicationLinkDAO applicationLinkDAO;

	@Inject
	private ApplicationConfiguration applicationConfiguration;

	public MolsaStatusChangedHandler() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void eventRaised(Event event) throws AppException,
			InformationalException {

		ProgramApplication programApplicationObj = (ProgramApplication) this.programApplicationDAO
				.get(Long.valueOf(event.primaryEventData));

		Application application = programApplicationObj.getApplication();
		Event applicationDisposedEvent = new Event();

		applicationDisposedEvent.eventKey.eventClass = ApplicationDisposed.APPLICATION_DISPOSED.eventClass;

		applicationDisposedEvent.eventKey.eventType = ApplicationDisposed.APPLICATION_DISPOSED.eventType;

		applicationDisposedEvent.primaryEventData = application.getID();

		EventService.raiseEvent(applicationDisposedEvent);

	}

	@Override
	public boolean accept(Event event) throws AppException,
			InformationalException {
		boolean useApplicationCase = doesProgramUseApplicationCase(
				Long.valueOf(event.primaryEventData)).booleanValue();

		return ((!(useApplicationCase))
				&& (event.eventKey.eventClass
						.equals(ProgramApplicationStatusChanged.STATUS_CHANGE.eventClass)) && (event.eventKey.eventType
					.equals(ProgramApplicationStatusChanged.STATUS_CHANGE.eventType)));
	}

	private Boolean doesProgramUseApplicationCase(Long programApplicationID)
			throws AppException, InformationalException {
		ProgramApplication programApplication = (ProgramApplication) this.programApplicationDAO
				.get(programApplicationID);

		Application application = programApplication.getApplication();

		IntakeApplication intakeApplication = this.applicationLinkDAO
				.getIntakeApplication(application);
		ProgramType programType;
		if (null != intakeApplication) {
			programType = this.applicationConfiguration
					.getMappedProgramApplicationType(programApplication);

			if (null != programType) {
				for (IntakeProgramApplication intakeProgramApplication : intakeApplication
						.listIntakeProgramApplications()) {
					if (intakeProgramApplication.getProgramType().getID() == programType
							.getID()) {
						return Boolean.valueOf(intakeProgramApplication
								.getProgramType()
								.useNewIntakeApplicationCaseConfigurationInd());
					}
				}

			}

		}

		return Boolean.valueOf(false);
	}
}
