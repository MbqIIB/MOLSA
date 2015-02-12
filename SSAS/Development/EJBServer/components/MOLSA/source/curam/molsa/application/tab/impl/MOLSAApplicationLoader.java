package curam.molsa.application.tab.impl;

import java.util.List;
import java.util.Map;

import com.google.inject.Inject;

import curam.application.codetable.APPLICATIONSTATUS;
import curam.application.codetable.impl.APPLICATIONSTATUSEntry;
import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.application.impl.IntakeApplicant;
import curam.application.impl.IntakeApplicantDAO;
import curam.codetable.CONCERNROLETYPE;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.intake.navigation.impl.NavigationConst;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.participant.impl.ConcernRole;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.tab.impl.DynamicMenuStateLoader;
import curam.util.tab.impl.MenuState;
import curam.util.transaction.TransactionInfo;

public class MOLSAApplicationLoader implements DynamicMenuStateLoader {

	@Inject
	protected CaseHeaderDAO caseHeaderDAO;

	@Inject
	private IntakeApplicantDAO intakeApplicantDAO;

	/**
	 * The CREOLEProgramRecommendation DAO.
	 */
	@Inject
	private CREOLEProgramRecommendationDAO creoleProgramRecommendationDAO;

	@Inject
	private UserDAO userDAO;

	/* The Application DAO. */
	@Inject
	private ApplicationDAO applicationDAO;

	/**
	 * Constructor.
	 */
	public MOLSAApplicationLoader() {
		super();
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @throws InformationalException
	 * @throws AppException
	 */
	public MenuState loadMenuState(final MenuState menuState,
			final Map<String, String> pageParameters, final String[] menuItems)
			throws AppException, InformationalException {

		final String applicationIDParam = pageParameters
				.get(NavigationConst.kApplicationID);

		final Application application = applicationDAO.get(Long
				.parseLong(applicationIDParam));

		final APPLICATIONSTATUSEntry applicationStatus = application
				.getStatus();

		final List<IntakeApplicant> intakeApplicants = intakeApplicantDAO
				.searchBy(application);

		boolean isProspectPersonInApplication = false;

		for (final IntakeApplicant intakeApplicant : intakeApplicants) {

			final ConcernRole concernRole = intakeApplicant.getConcernRole();

			if (concernRole.getConcernRoleType().getCode()
					.equals(CONCERNROLETYPE.PROSPECTPERSON)
					&& intakeApplicant.isActive()) {
				isProspectPersonInApplication = true;
				break;
			}
		}

		final User user = userDAO.get(TransactionInfo.getProgramUser());


		if (user.getRole().equals(MOLSAConstants.kMolsaCaseWorkerRole)) {

			if (applicationStatus.getCode().equals(APPLICATIONSTATUS.SUBMITTED)) {
				if (isProspectPersonInApplication) {
					menuState.setEnabled(false,
							NavigationConst.kCheckEligibility);
					menuState.setEnabled(false,
							NavigationConst.kReadyForDetermination);
					menuState.setEnabled(false,
							NavigationConst.kReviewEligibilityResult);
				} else {
					menuState.setEnabled(true,
							NavigationConst.kCheckEligibility);
					menuState.setEnabled(true,
							NavigationConst.kReadyForDetermination);
					menuState.setEnabled(false,
							NavigationConst.kReviewEligibilityResult);
					
				}

			} else if (applicationStatus.getCode().equals(
					APPLICATIONSTATUS.READY_FOR_DETERMINATION)) {

				if (isProspectPersonInApplication) {
					menuState.setEnabled(false,
							NavigationConst.kCheckEligibility);
					menuState.setEnabled(false,
							NavigationConst.kReadyForDetermination);
				} else {
					menuState.setEnabled(true,
							NavigationConst.kCheckEligibility);
					menuState.setEnabled(true,
							NavigationConst.kReadyForDetermination);

					if (creoleProgramRecommendationDAO
							.getLatestIfExistsForApplication(application) == null) {
						menuState.setEnabled(false,
								NavigationConst.kReviewEligibilityResult);
					}
				}
				menuState.setEnabled(true,
						NavigationConst.kReviewEligibilityResult);
				menuState.setEnabled(false,
						NavigationConst.kReadyForDetermination);
			} else if (applicationStatus.getCode().equals(
					APPLICATIONSTATUS.DISPOSED)) {
				menuState.setEnabled(false, NavigationConst.kCheckEligibility);
				menuState.setEnabled(false,
						NavigationConst.kReviewEligibilityResult);
				menuState.setEnabled(false,
						NavigationConst.kReadyForDetermination);
				menuState.setEnabled(false, NavigationConst.kAddClient);
				menuState.setEnabled(false, NavigationConst.kAddProgram);
				menuState.setEnabled(false, NavigationConst.kNewInterview);
				menuState.setEnabled(false,
						NavigationConst.kViewEvidenceInNewTab);
				menuState.setEnabled(false, NavigationConst.kEditDetails);
				menuState.setEnabled(false, NavigationConst.kChangeOwnerToMe);
				

				// BEGIN, CR00286692, BF
			} else if ((applicationStatus.getCode().equals(
					APPLICATIONSTATUS.IN_PROGRESS) || (applicationStatus
					.getCode().equals(APPLICATIONSTATUS.SUBMIT_FAILED) || (applicationStatus
					.getCode().equals(APPLICATIONSTATUS.SUBMITTING))))) {

				// Should never reach this situation where you can edit an
				// application
				// with the above states but double validating here that the
				// addProgram
				// option should not be available.
				menuState.setEnabled(false, NavigationConst.kAddProgram);
			}
			// END, CR00286692
		}

		return menuState;
	}

}
