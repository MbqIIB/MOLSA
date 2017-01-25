package curam.molsa.application.tab.impl;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.inject.Inject;

import curam.application.codetable.APPLICATIONSTATUS;
import curam.application.codetable.impl.APPLICATIONSTATUSEntry;
import curam.application.entity.struct.ApplicationKey;
import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.application.impl.IntakeApplicant;
import curam.application.impl.IntakeApplicantDAO;
import curam.codetable.CONCERNROLETYPE;
import curam.core.facade.infrastructure.fact.EvidenceFactory;
import curam.core.facade.infrastructure.intf.Evidence;
import curam.core.facade.infrastructure.struct.ListAllInEditDtls;
import curam.core.impl.CuramConst;
import curam.core.sl.infrastructure.struct.ECWIPChangeDetails;
import curam.core.sl.infrastructure.struct.ECWarningsDtlsList;
import curam.core.sl.struct.CaseIDParticipantIDEvidenceTypeKey;
import curam.core.struct.CaseKey;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.fact.CREOLEProgramRecSummaryFactory;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecSummaryDAO;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.creoleprogramrecommendation.intf.CREOLEProgramRecSummary;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecSummaryDtls;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecSummaryKey;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.intake.navigation.impl.NavigationConst;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.creoleprogramrecommendation.facade.fact.MOLSACREOLEProgramRecommendationFactory;
import curam.molsa.creoleprogramrecommendation.facade.impl.MOLSACREOLEProgramRecommendation;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetails;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetailsList;
import curam.participant.impl.ConcernRole;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.tab.impl.DynamicMenuStateLoader;
import curam.util.tab.impl.MenuState;
import curam.util.transaction.TransactionInfo;
import curam.util.type.NotFoundIndicator;
import curam.verification.facade.infrastructure.fact.VerificationApplicationFactory;
import curam.verification.facade.infrastructure.impl.VerificationApplication;
import curam.verification.facade.infrastructure.struct.CaseEvidenceVerificationDisplayDetailsList;

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
					menuState.setEnabled(false,
							NavigationConst.kReviewEligibilityResult);
					/*
					 * MOLSACR 1.5
					 * 
					 * Ready For Determination Link should be enabled only if
					 * No In Edit Evidence Pending
					 * No Evidence to be validated
					 * Beneficiary should be eligible (last Check Eligibility Result) for any Social Program
					 * 
					 * 
					 */

					//Check For Any In Edit Evidence 	

					boolean checkForDetermination=false;
					Evidence evidence=EvidenceFactory.newInstance();
					CaseIDParticipantIDEvidenceTypeKey key= new CaseIDParticipantIDEvidenceTypeKey();
					key.caseIDKey.caseID=application.getCase().getID();
					ListAllInEditDtls listDtls=evidence.listAllInEdit(key);
					if(listDtls.evidenceParticipantDtlsList.dtls.size()>CuramConst.gkZero){
						checkForDetermination=false;
					}else{
						checkForDetermination=true;
					}

					//Check For Any Pending Validations
					
					if(checkForDetermination){
						CaseKey keycase1= new CaseKey();
						keycase1.caseID=application.getCase().getID();
						curam.verification.facade.infrastructure.intf.VerificationApplication verAppl=VerificationApplicationFactory.newInstance();
						CaseEvidenceVerificationDisplayDetailsList dtlList=verAppl.listOutstandingVerificationDetailsForCaseEvidence(keycase1);
						if(dtlList.dtls.size()>CuramConst.gkZero){
							checkForDetermination=false;
						}else{
							checkForDetermination=true;
						}
					}

					//Check the Beneficiary is Eligible for Social Program according to the latest check.

					if(checkForDetermination){
						curam.molsa.creoleprogramrecommendation.facade.intf.MOLSACREOLEProgramRecommendation progRecomm= MOLSACREOLEProgramRecommendationFactory.newInstance();
						ApplicationKey appKey= new ApplicationKey();
						appKey.applicationID=application.getID();
						MolsaSimulatedDeterminationDetailsList  simulatedList=progRecomm.listLatestAppliedForEligibleSimulatedDeterminations(appKey);
						if(simulatedList.dtls.size()>CuramConst.gkZero){
							MolsaSimulatedDeterminationDetails details=simulatedList.dtls.item(CuramConst.gkZero);
							checkForDetermination=true;
						}else{
							checkForDetermination=false;
						}
					}
					
					//Ready For Determination link is enabled only the 'checkForDetermination' value is true.
					
					if(checkForDetermination){
						menuState.setEnabled(true,
								NavigationConst.kReadyForDetermination);
					}else{
						menuState.setEnabled(false,
								NavigationConst.kReadyForDetermination);
					}

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

					// if (creoleProgramRecommendationDAO
					// .getLatestIfExistsForApplication(application) == null) {
					// menuState.setEnabled(false,
					// NavigationConst.kReviewEligibilityResult);
					// }
				}
				menuState.setEnabled(false,
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
		} else if (user.getRole().equals(MOLSAConstants.kMolsaCaseAuditorRole)) {

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
					menuState.setEnabled(false,
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
					menuState.setEnabled(false,
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
				// application with the above states but double validating here
				// that the
				// addProgram option should not be available.
				menuState.setEnabled(false, NavigationConst.kAddProgram);
			}

		}

		return menuState;
	}

}
