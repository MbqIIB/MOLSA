package curam.molsa.casemanagement.facade.impl;

import java.util.List;

import com.google.inject.Inject;

import curam.application.codetable.impl.APPLICATIONSTATUSEntry;
import curam.application.facade.struct.ApplicationDisplayDtls;
import curam.application.facade.struct.ApplicationDisplayDtlsList;
import curam.application.impl.Application;
import curam.application.impl.ApplicationConfiguration;
import curam.application.impl.ApplicationDAO;
import curam.application.impl.ApplicationStatus;
import curam.application.impl.ApplicationStatusDAO;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.core.impl.CuramConst;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.struct.ClientPageURL;
import curam.core.sl.struct.ViewCaseParticipantRoleDetailsList;
import curam.core.sl.struct.ViewCaseParticipantRole_boKey;
import curam.core.struct.CaseKey;
import curam.core.struct.ConcernRoleKey;
import curam.intake.impl.IntakeURIHelper;
import curam.message.MOLSANOTIFICATION;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.persistence.ValidationHelper;
import curam.util.transaction.TransactionInfo;

public class MOLSACase extends curam.molsa.casemanagement.facade.base.MOLSACase {

	@Inject
	private ApplicationDAO applicationDAO;

	@Inject
	private UserDAO userDAO;

	/** The Application Configuration. **/
	@Inject
	private ApplicationConfiguration applicationConfiguration;

	/** The ApplicationStatus DAO. */
	@Inject
	private ApplicationStatusDAO applicationStatusDAO;

	public MOLSACase() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * returns the list of applications associated for a case
	 *
	 * @param caseKey
	 *            this contains the caseID of the case.
	 *
	 * @return applicationDisplayDtlsList the list of applications.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public ApplicationDisplayDtlsList listApplicationsByCase(CaseKey key)
			throws AppException, InformationalException {

		final ApplicationDisplayDtlsList applicationDisplayDtlsList = new ApplicationDisplayDtlsList();
		// get all the Applications based on the caseID for display.
		final List<curam.application.impl.Application> applicationList = applicationDAO
				.searchByCaseID(key.caseID);

		final User user = userDAO.get(TransactionInfo.getProgramUser());

		for (final Application application : applicationList) {
			// Filter cancelled applications
			if (application.getLifecycleState().equals(
					RECORDSTATUSEntry.CANCELLED)) {
				continue;
			}

			final ApplicationDisplayDtls applicationDisplayDtls = new ApplicationDisplayDtls();

			final curam.application.impl.Application applicationDetails = applicationDAO
					.get(application.getID());
			applicationDisplayDtls.versionNo = applicationDetails
					.getVersionNo();
			applicationDisplayDtls.applicationPreviewFilter = determineApplicationPreviewFilter(
					user, application);

			// Checks to filter out any Application based on the Application
			// type and status. For example, All the Unemployment Insurance
			// Application Types
			// and all the Applications which are deleted (cancelled status) are
			// filtered out.
			if (applicationDisplayDtls.applicationPreviewFilter) {

				// get the application Status for display
				final ApplicationStatus applicationStatus = applicationStatusDAO
						.get(applicationDetails.getCurrentApplicationStatusID());

				applicationDisplayDtls.applicationStatus = applicationStatus
						.getStatus().toString();

				// User details
				final User applicationUser = userDAO.get(applicationStatus
						.getUserName());

				if (applicationStatus.getStatus().getCode()
						.equals(APPLICATIONSTATUSEntry.IN_PROGRESS.getCode())) {
					applicationDisplayDtls.displayMenuPrimary = determineDisplayMenuPrimaryItem(
							user, application);
				}

				if (applicationStatus.getStatus().getCode()
						.equals(APPLICATIONSTATUSEntry.SUBMITTED.getCode())
						|| applicationStatus
								.getStatus()
								.getCode()
								.equals(APPLICATIONSTATUSEntry.READY_FOR_DETERMINATION
										.getCode())) {
					applicationDisplayDtls.displayMenuSecondary = determineDisplayMenuSecondaryItem(
							user, application);
				}

				applicationDisplayDtls.displayDtls.entityDtls.iegExecutionID = applicationDetails
						.getIEGExecutionID();
				applicationDisplayDtls.displayDtls.entityDtls.applicationType = applicationDetails
						.getApplicationType().toUserLocaleString();
				applicationDisplayDtls.displayDtls.entityDtls.applicationMethod = applicationDetails
						.getApplicationMethod().getCode();
				applicationDisplayDtls.displayDtls.entityDtls.applicationType = applicationDetails
						.getApplicationType().getCode();
				applicationDisplayDtls.displayDtls.entityDtls.reference = applicationDetails
						.getReference();
				applicationDisplayDtls.displayDtls.entityDtls.pdfID = applicationDetails
						.getPdfID();

				if (!applicationStatus.getStatus().getCode()
						.equals(APPLICATIONSTATUSEntry.IN_PROGRESS.getCode())) {
					applicationDisplayDtls.displayDtls.entityDtls.filingDate = applicationDetails
							.getFilingDate();
				}

				applicationDisplayDtls.displayDtls.entityDtls.applicationID = applicationDetails
						.getID();

				// retrieves the programs selected for display as comma
				// separated
				applicationDisplayDtls.programName = applicationDetails
						.getProgramApplicationsAsString();
				applicationDisplayDtls.showPreviewPanel = determineShowOrHidePreviewPanel(
						user, application);
				applicationDisplayDtls.previewPanelURL = determinePreviewPanel(
						user, application).pageURL;
				applicationDisplayDtls.userName = applicationUser.getUsername();

				if ((applicationUser.getUsername() != null)
						&& !applicationUser.getUsername().equals(
								CuramConst.gkEmpty)) {
					applicationDisplayDtls.worker = applicationUser
							.getFullName();
				}

				// Dynamic page link
				final IntakeURIHelper intakURIHelperObj = new IntakeURIHelper();
				applicationDisplayDtls.pageURL = intakURIHelperObj
						.getApplicationCaseURI(application).pageURL;

				applicationDisplayDtlsList.list.addRef(applicationDisplayDtls);
			}
		}
		return applicationDisplayDtlsList;
	}

	/**
	 * Determine the application preview filter items based on the application
	 * type and status.
	 *
	 * @param user
	 *            this contains the current user details.
	 *
	 * @param application
	 *            this contains application details
	 *
	 * @return clientPageURL The preview panel URL page.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected Boolean determineApplicationPreviewFilter(final User user,
			final curam.application.impl.Application application)
			throws AppException, InformationalException {

		return applicationConfiguration.getApplicationPreviewFilter(
				application.getApplicationType(), application.getStatus());
	}

	/**
	 * Determine the display menu items based on the application type and
	 * status.
	 *
	 * @param user
	 *            this contains the current user details.
	 *
	 * @param application
	 *            this contains application details
	 *
	 * @return clientPageURL The preview panel URL page.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected Boolean determineDisplayMenuPrimaryItem(final User user,
			final curam.application.impl.Application application)
			throws AppException, InformationalException {

		return applicationConfiguration.getDisplayPrimaryMenuItem(
				application.getApplicationType(), application.getStatus());
	}

	/**
	 * Determine the display menu items based on the application type and
	 * status.
	 *
	 * @param user
	 *            this contains the current user details.
	 *
	 * @param application
	 *            this contains application details
	 *
	 * @return clientPageURL The preview panel URL page.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected Boolean determineDisplayMenuSecondaryItem(final User user,
			final curam.application.impl.Application application)
			throws AppException, InformationalException {

		return applicationConfiguration.getDisplaySecondaryMenuItem(
				application.getApplicationType(), application.getStatus());

	}

	/**
	 * Determine the show or hide preview panel details based on the application
	 * type and status.
	 *
	 * @param user
	 *            this contains the current user details.
	 *
	 * @param application
	 *            this contains application details
	 *
	 * @return Boolean show or hide preview panel details.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected Boolean determineShowOrHidePreviewPanel(final User user,
			final curam.application.impl.Application application)
			throws AppException, InformationalException {

		return applicationConfiguration.getShowOrHidePreviewPanel(application);

	}

	/**
	 * Determine preview panel page details based on the application type and
	 * status.
	 *
	 * @param user
	 *            this contains the current user details.
	 *
	 * @param application
	 *            this contains application details
	 *
	 * @return clientPageURL The preview panel URL page.
	 *
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected ClientPageURL determinePreviewPanel(final User user,
			final curam.application.impl.Application application)
			throws AppException, InformationalException {

		final ClientPageURL clientPageURL = new ClientPageURL();

		clientPageURL.pageURL = applicationConfiguration.getPreviewPanel(
				application.getApplicationType(), application.getStatus());

		return clientPageURL;
	}

	@Override
	public ViewCaseParticipantRoleDetailsList listActiveMembersByCase(
			CaseKey key) throws AppException, InformationalException {

	    final ViewCaseParticipantRole_boKey viewCaseParticipantRoleKey =
	      new ViewCaseParticipantRole_boKey();
	    viewCaseParticipantRoleKey.dtls.caseID = key.caseID;
	    viewCaseParticipantRoleKey.showOnlyActive = true;

	    final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj =
	      CaseParticipantRoleFactory.newInstance();

	    final ViewCaseParticipantRoleDetailsList
	    viewCaseParticipantRoleDetailsList =
	      caseParticipantRoleObj.viewCaseMemberList(viewCaseParticipantRoleKey);

	    return viewCaseParticipantRoleDetailsList;
	}

	@Override
	public void validateSelectPrimaryClient(ConcernRoleKey key)
			throws AppException, InformationalException {

	}

}
