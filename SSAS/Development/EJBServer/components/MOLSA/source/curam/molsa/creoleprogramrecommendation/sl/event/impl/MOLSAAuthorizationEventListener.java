package curam.molsa.creoleprogramrecommendation.sl.event.impl;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.application.impl.ProgramApplication;
import curam.codetable.CASETYPECODE;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.impl.PROGRAMSTATUSEntry;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.sl.tab.impl.TabLoaderConst;
import curam.core.struct.CaseHeaderKey;
import curam.creole.value.Timeline;
import curam.creoleprogramrecommendation.codetable.impl.SIMULATEDDETERMINATIONSTATEEntry;
import curam.creoleprogramrecommendation.facade.message.CREOLEPROGRAMRECOMMENDATIONFACADE;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList;
import curam.creoleprogramrecommendation.impl.AuthorizationEvent;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.creoleprogramrecommendation.impl.Member;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationAuthorization;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationAuthorizationDAO;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationManager;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProduct;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.message.BPOPRODUCTDELIVERYAPPROVAL;
import curam.message.BPOROUTEPRODUCTDELIVERYAPPROVAL;
import curam.message.MOLSABPORECERTIFICATION;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.DateRange;
import curam.util.workflow.impl.EnactmentService;

public class MOLSAAuthorizationEventListener extends AuthorizationEvent {

	@Inject
	private ProductDAO productDAO;

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	@Inject
	private IntegratedCaseDAO integratedCaseDAO;

	@Inject
	private SimulatedDeterminationManager simulatedDeterminationManager;

	@Inject
	private SimulatedDeterminationAuthorizationDAO simulatedDeterminationAuthorizationDAO;

	@Inject
	private CREOLEProgramRecommendationDAO creoleProgramRecommendationDAO;

	@Inject
	private UserDAO userDAO;

	public MOLSAAuthorizationEventListener() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Override
	public void postAuthorization(
			SimulatedDeterminationAuthorization simulatedDeterminationAuthorization)
			throws InformationalException, AppException {

		final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
		TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
		taskCreateDetails.caseID = simulatedDeterminationAuthorization
				.getDelivery().getID();
		IntegratedCase integratedCase = integratedCaseDAO
				.get(taskCreateDetails.caseID);

		LocalisableString subject = null;
		final User user = userDAO.get(TransactionInfo.getProgramUser());
		if (user.getRole().equals(MOLSAConstants.kMolsaCaseWorkerRole)) {
			subject = new LocalisableString(
					MOLSANOTIFICATION.INF_READY_FOR_APPROVAL_REVIEW);
			subject.arg(integratedCase.getCaseReference());

			String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
					productDeliveryDAO.get(taskCreateDetails.caseID)
							.getProductType().getCode(),
					TransactionInfo.getProgramLocale());
			subject.arg(productName);
			subject.arg(integratedCase.getConcernRole().getName());

			taskCreateDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());

			enactmentStructs.add(taskCreateDetails);
			EnactmentService.startProcessInV3CompatibilityMode(
					MOLSAConstants.kMOLSAProductDeliveryAuthorizationTask,
					enactmentStructs);

		} else {

			subject = new LocalisableString(
					MOLSANOTIFICATION.INF_READY_FOR_FINAUDITOR_REVIEW);
			subject.arg(integratedCase.getCaseReference());

			String productName = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME,
					productDeliveryDAO.get(taskCreateDetails.caseID)
							.getProductType().getCode(),
					TransactionInfo.getProgramLocale());
			subject.arg(productName);
			subject.arg(integratedCase.getConcernRole().getName());

			taskCreateDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());

			enactmentStructs.add(taskCreateDetails);
			EnactmentService.startProcessInV3CompatibilityMode(
					MOLSAConstants.kMOLSAProductDeliveryOpenTask,
					enactmentStructs);

		}

		boolean isEligibleForApprove = true;

		final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		caseHeaderKey.caseID = simulatedDeterminationAuthorization
				.getCREOLEProgramRecommendation().getIntegratedCase().getID();

		final SimulatedDeterminationDetailsList simulatedDeterminationDetailsList = listLatestEligibleSimulatedDeterminations(caseHeaderKey);

		final Set<Long> authorizeMembers = new HashSet<Long>();
		final Set<Long> pendingMembers = new HashSet<Long>();
		final Iterator<Member> authorizeMembersIterator = simulatedDeterminationAuthorization
				.getSimulatedDetermination().getMembers().iterator();

		while (authorizeMembersIterator.hasNext()) {
			authorizeMembers.add(authorizeMembersIterator.next()
					.caseParticipantRoleID());
		}

		for (final SimulatedDeterminationDetails simulatedDeterminationDetails : simulatedDeterminationDetailsList.list) {

			final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = creoleProgramRecommendationDAO
					.get(simulatedDeterminationDetails.creoleProgramRecommendationID);

			// Check any simulated determination of same program is not
			// authorized then set the indicator to false
			if (simulatedDeterminationAuthorization
					.getSimulatedDetermination()
					.getCREOLEProgramRecommendationProduct()
					.getProgramType()
					.equals(creoleProgramRecommendation
							.getSimulatedDetermination(
									simulatedDeterminationDetails.simulatedDeterminationID)
							.getCREOLEProgramRecommendationProduct()
							.getProgramType())
					&& simulatedDeterminationDetails.isActionPending) {

				final Iterator<Member> pendingMembersIterator = creoleProgramRecommendation
						.getSimulatedDetermination(
								simulatedDeterminationDetails.simulatedDeterminationID)
						.getMembers().iterator();

				while (pendingMembersIterator.hasNext()) {
					pendingMembers.add(pendingMembersIterator.next()
							.caseParticipantRoleID());
				}

				isEligibleForApprove = false;

			}
		}

		boolean isPendingMemberForAuthorization = false;

		final Iterator<Long> pendingMembersIterator = pendingMembers.iterator();

		while (pendingMembersIterator.hasNext()) {
			if (!authorizeMembers.contains(pendingMembersIterator.next())) {
				isPendingMemberForAuthorization = true;
				break;
			}
		}

		if (isEligibleForApprove || !isPendingMemberForAuthorization) {
			approveProgramApplication(simulatedDeterminationAuthorization);
		}

	}

	/**
	 * Approve the program application.
	 * 
	 * @param simulatedDeterminationAuthorization
	 *            The simulated determination authorization
	 * 
	 * @throws InformationalException
	 * @throws AppException
	 */
	private void approveProgramApplication(
			final SimulatedDeterminationAuthorization simulatedDeterminationAuthorization)
			throws InformationalException, AppException {
		final Application application = simulatedDeterminationAuthorization
				.getCREOLEProgramRecommendation().getApplicationIfExists();

		if (application != null) {

			final ProgramApplication programApplication = application
					.getProgramApplication(simulatedDeterminationAuthorization
							.getSimulatedDetermination()
							.getCREOLEProgramRecommendationProduct()
							.getProgramType());

			if (programApplication != null
					&& programApplication.getStatus().equals(
							PROGRAMSTATUSEntry.PENDING)) {

				// BEGIN, CR00286387, JS
				programApplication.approve();
				// END, CR00286387
			}

		}

	}

	private SimulatedDeterminationDetailsList listLatestEligibleSimulatedDeterminations(
			final CaseHeaderKey key) throws AppException,
			InformationalException {

		final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation latestCREOLEProgramRecommendation = creoleProgramRecommendationDAO
				.getLatestIfExists(integratedCaseDAO.get(key.caseID));

		/*
		 * If there's no latest program recommendation, return an empty list.
		 */
		if (latestCREOLEProgramRecommendation == null) {
			return new SimulatedDeterminationDetailsList();
		}

		final CREOLEProgramRecommendationKey creoleProgramRecommendationKey = new CREOLEProgramRecommendationKey();

		creoleProgramRecommendationKey.creoleProgramRecommendationID = latestCREOLEProgramRecommendation
				.getID();

		final SimulatedDeterminationDetailsList simulatedDeterminationDetailsList = this
				.listEligibleSimulatedDeterminations(creoleProgramRecommendationKey);

		return simulatedDeterminationDetailsList;
	}

	private SimulatedDeterminationDetailsList listEligibleSimulatedDeterminations(
			final CREOLEProgramRecommendationKey key) throws AppException,
			InformationalException {

		final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = creoleProgramRecommendationDAO
				.get(key.creoleProgramRecommendationID);

		final SortedMap<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>> simulatedDeterminationsMap = sortSimulatedDeterminations(creoleProgramRecommendation
				.simulatedDeterminations());

		return processEligibleSimulatedDeterminations(key,
				simulatedDeterminationsMap);
	}

	/**
	 * Process eligible simulated determination results.
	 * 
	 * @param key
	 *            The CREOLE Program Recommendation key
	 * 
	 * @param simulatedDeterminationsMap
	 *            The simulated determinations.
	 * 
	 * @return The processed eligible simulated determinations.
	 */
	private SimulatedDeterminationDetailsList processEligibleSimulatedDeterminations(
			final CREOLEProgramRecommendationKey key,
			final SortedMap<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>> simulatedDeterminationsMap) {

		final SimulatedDeterminationDetailsList simulatedDeterminationDetailsList = new SimulatedDeterminationDetailsList();

		for (final List<SimulatedDetermination> simulatedDeterminations : simulatedDeterminationsMap
				.values()) {

			for (final SimulatedDetermination simulatedDetermination : simulatedDeterminations) {

				if (!simulatedDetermination.eligibilityTimeline().equals(
						Timeline.FALSE_FOREVER)) {

					final SimulatedDeterminationDetails simulatedDeterminationDetails = this
							.populateSimulatedDeterminationDetails(key,
									simulatedDetermination);

					simulatedDeterminationDetailsList.list
							.addRef(simulatedDeterminationDetails);
				}
			}
		}

		return simulatedDeterminationDetailsList;
	}

	/**
	 * For a {@linkplain SimulatedDetermination}, pluck out the values of
	 * interest and populate a {@linkplain SimulatedDeterminationDetails}.
	 * 
	 * @param key
	 *            The CREOLE Program Recommendation Key
	 * @param simulatedDetermination
	 *            The simulated determination
	 * 
	 * @return Simulated Determination Details
	 */
	private SimulatedDeterminationDetails populateSimulatedDeterminationDetails(
			final CREOLEProgramRecommendationKey key,
			final SimulatedDetermination simulatedDetermination) {

		final SimulatedDeterminationDetails simulatedDeterminationDetails = new SimulatedDeterminationDetails();

		/*
		 * Populate for client side processing
		 */
		simulatedDeterminationDetails.creoleProgramRecommendationID = key.creoleProgramRecommendationID;

		simulatedDeterminationDetails.simulatedDeterminationID = simulatedDetermination
				.getID();

		// Set the product name
		simulatedDeterminationDetails.productName = productDAO
				.get(simulatedDetermination.productID()).getName().getCode();

		// Set the description for this simulated determination

		simulatedDeterminationDetails.description = simulatedDetermination
				.description()
				.toLocale(new Locale(TransactionInfo.getProgramLocale()))
				.trim();

		final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = creoleProgramRecommendationDAO
				.get(key.creoleProgramRecommendationID);

		final SIMULATEDDETERMINATIONSTATEEntry simuatedDeterminationState = simulatedDeterminationManager
				.getSimulatedDeterminationState(creoleProgramRecommendation,
						simulatedDetermination);

		simulatedDeterminationDetails.status = simuatedDeterminationState
				.getCode();

		if (simuatedDeterminationState
				.equals(SIMULATEDDETERMINATIONSTATEEntry.ACTION_PENDING)) {

			simulatedDeterminationDetails.isActionPending = true;

		} else if (simuatedDeterminationState
				.equals(SIMULATEDDETERMINATIONSTATEEntry.DECLINED)) {

			simulatedDeterminationDetails.isDeclined = true;
			simulatedDeterminationDetails.isAuthorizedOrDeclined = true;

		} else if (simuatedDeterminationState
				.equals(SIMULATEDDETERMINATIONSTATEEntry.AUTHORIZED)) {

			simulatedDeterminationDetails.isAuthorized = true;
			simulatedDeterminationDetails.isAuthorizedOrDeclined = true;

			final SimulatedDeterminationAuthorization simulatedDeterminationAuthorization = simulatedDeterminationAuthorizationDAO
					.read(creoleProgramRecommendation, simulatedDetermination);

			simulatedDeterminationDetails.caseID = simulatedDeterminationAuthorization
					.getDelivery().getID();
		}
		// initial eligible period
		final DateRange initialEligiblePeriod = simulatedDetermination
				.getInitialEligiblePeriod();

		if (initialEligiblePeriod != null) {

			final LocalisableString msg = new LocalisableString(
					CREOLEPROGRAMRECOMMENDATIONFACADE.INF_SIMULATED_DETERMINATION_ELIGIBILITY_PERIOD);

			msg.arg(initialEligiblePeriod.start());
			msg.arg(initialEligiblePeriod.end());

			simulatedDeterminationDetails.period = msg.toClientFormattedText();

		}

		simulatedDeterminationDetails.summary = simulatedDetermination
				.getInitialEligibleAmount().toString();

		simulatedDeterminationDetails.isEmergencyCase = simulatedDetermination
				.isEmergencyCase();

		return simulatedDeterminationDetails;
	}

	/**
	 * Sort the simulated determinations for consistency at the front-end.
	 * 
	 * @param simulatedDeterminationsMap
	 *            The simulated determinations
	 * 
	 * @return The sorted map of simulated determinations
	 */
	private SortedMap<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>> sortSimulatedDeterminations(
			final Map<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>> simulatedDeterminationsMap) {

		// Sort by the name of the program
		final SortedMap<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>> sortedProgramRecommendationsForCase = new TreeMap<CREOLEProgramRecommendationProduct, List<SimulatedDetermination>>(
				new Comparator<CREOLEProgramRecommendationProduct>() {

					@Override
					public int compare(
							final CREOLEProgramRecommendationProduct lhs,
							final CREOLEProgramRecommendationProduct rhs) {
						return lhs
								.getProgramType()
								.toUserLocaleString()
								.compareTo(
										rhs.getProgramType()
												.toUserLocaleString());
					}
				});

		sortedProgramRecommendationsForCase.putAll(simulatedDeterminationsMap);

		return sortedProgramRecommendationsForCase;
	}

	@Override
	public void preAuthorization(
			CREOLEProgramRecommendation creoleProgramRecommendation,
			SimulatedDetermination simulatedDetermination)
			throws InformationalException, AppException {
		super.preAuthorization(creoleProgramRecommendation,
				simulatedDetermination);
	}

}
