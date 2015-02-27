package curam.molsa.test.base;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.application.impl.ApplicationDAO;
import curam.application.impl.IntakeApplicant;
import curam.application.impl.IntakeApplicantDAO;
import curam.application.impl.IntakeApplicantStatus;
import curam.application.impl.IntakeApplicantStatusDAO;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.codetable.impl.APPLICANTSTATUSEntry;
import curam.codetable.impl.APPLICATIONMETHODEntry;
import curam.codetable.impl.APPLICATIONTYPEEntry;
import curam.codetable.impl.CASESTATUSEntry;
import curam.codetable.impl.LANGUAGEEntry;
import curam.core.facade.fact.IntegratedCaseFactory;
import curam.core.facade.infrastructure.assessment.struct.CaseDeterminationDecisionDetailsList;
import curam.core.facade.infrastructure.assessment.struct.CaseDeterminationDecisionListDetails;
import curam.core.facade.intf.IntegratedCase;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.ActivateCaseKey_fo;
import curam.core.facade.struct.CertificationCaseIDKey;
import curam.core.facade.struct.ListICProductDeliveryCertDetailsAndVersionNo;
import curam.core.facade.struct.SubmitForApprovalKey;
import curam.core.fact.CachedCaseHeaderFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.CachedCaseHeader;
import curam.core.sl.fact.CaseUserRoleFactory;
import curam.core.sl.infrastructure.assessment.codetable.CASEDETERMINATIONINTERVALRESULT;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseDeterminationAccessorDAO;
import curam.core.sl.infrastructure.assessment.impl.DeterminationInterval;
import curam.core.sl.infrastructure.propagator.impl.ImmediateRecalculationStrategy;
import curam.core.sl.infrastructure.propagator.impl.PropagatorSession;
import curam.core.sl.infrastructure.propagator.impl.SwitchableRecalculationStrategy;
import curam.core.sl.intf.CaseUserRole;
import curam.core.struct.CaseDecisionSummaryList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.UserNameKey;
import curam.creole.calculator.CREOLETestHelper;
import curam.creole.execution.session.SessionDoc;
import curam.creole.value.BoundedInterval;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.struct.ApplicationProgramRecommendationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationKey;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationAuthorizationDAO;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationDecisionDisplayCategory;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProduct;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProductDAO;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.molsa.core.facade.intf.MOLSAProductDelivery;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.transaction.TransactionInfo.TransactionType;
import curam.util.type.Date;
import curam.util.type.StringList;

/**
 * This class run the orphan product benefit scenario and determine the
 * eligibility in CER. This is used to get the sanction recommendations for a
 * case.
 */
public abstract class CERScenarioTestBase extends MolsaRuleTestData {

	/**
	 * Creole Session
	 */
	@Inject
	private PropagatorSession propagatorSession;

	/**
	 * The Application DAO.
	 */
	@Inject
	private ApplicationDAO applicationDAO;

	/**
	 * The Intake Application DAO.
	 */
	@Inject
	private IntakeApplicantDAO intakeApplicantDAO;

	/**
	 * The Intake Application Status DAO.
	 */
	@Inject
	private IntakeApplicantStatusDAO intakeApplicantStatusDAO;

	@Inject
	private CREOLEProgramRecommendationProductDAO creoleProgramRecommendationProductDAO;

	@Inject
	private CREOLEProgramRecommendationDAO creoleProgramRecommendationDAO;

	private SessionDoc sessionDoc;

	@Inject
	private CREOLECaseDeterminationAccessorDAO creoleCaseDeterminationAccessorDAO;

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	@Inject
	private SimulatedDeterminationAuthorizationDAO simulatedDeterminationAuthorizationDAO;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	private CaseParticipantRoleDAO caseParticipantRoleDAO;
	@Inject
	private TestHelper testHelper;

	/**
	 * Constructor for the scenario test.
	 * 
	 * @param arg0
	 */
	public CERScenarioTestBase(final String arg0) {
		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);

	}

	@Inject
	private SwitchableRecalculationStrategy switchableRecalculationStrategy;

	@Inject
	private ImmediateRecalculationStrategy immediateRecalculationStrategy;

	@Override
	public void testScenario() throws AppException, InformationalException {
		// return null;

	}

	/**
	 * Method to create a case and evidences for the scenario and determine the
	 * eligibility for the scenario.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature
	 * @throws InformationalException
	 *             Generic Exception Signature
	 */
	public void testScenario(final Date claimDate) throws AppException,
			InformationalException {

		switchableRecalculationStrategy
				.suspendRecalculationStrategy(immediateRecalculationStrategy);

		super.setClaimDate(claimDate);

		setCurrentDate(claimDate);

		setClaimDate(claimDate);

		setCreateProductDeliveryIndicator(false);

		setCreateLiabilityIndicator(false);

		final CaseKey caseKey = createStandardCase();

		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		caseHeaderKey.caseID = caseKey.caseID;
		CaseUserRole caseUserRole = CaseUserRoleFactory.newInstance();

		UserNameKey userNameKey = new UserNameKey();
		userNameKey.userName = "molsamanager";

		caseUserRole.createSupervisor(caseHeaderKey, userNameKey);

		// Adding primary participant Caseparticipant role id
		PersonRegistrationDetails claimantRegistrationDetails = new PersonRegistrationDetails();
		setClaimantRegistrationDetails(claimantRegistrationDetails);
		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);
		final Application application = createApplication(caseKey.caseID);
		List<CaseParticipantRole> caseParticipantDetails = caseParticipantRoleDAO
				.listActiveMembersByCase(caseHeader);
		for (Iterator iterator = caseParticipantDetails.iterator(); iterator
				.hasNext();) {
			CaseParticipantRole caseParticipantRole = (CaseParticipantRole) iterator
					.next();
			if (caseParticipantRole.getConcernRole().getID() == caseHeader
					.getConcernRole().getID()) {
				setCaseParticipantRoleID(
						claimantRegistrationDetails.firstForename,
						caseParticipantRole.getID());

			}

		}

		// Adding other case members
		addCaseMember(application);

		addEvidence(caseKey);

		addIntakeApplicant(application);

		addVerifications(caseKey);

		activateAllInEditEvidence();

		preAssertionOnCase(caseKey);
		final curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation programRecommendation = CREOLEProgramRecommendationFactory
				.newInstance();

		ApplicationProgramRecommendationDetails recommendationDetails = new ApplicationProgramRecommendationDetails();
		recommendationDetails.applicationID = application.getID();
		recommendationDetails.selectedPrograms = "4500";
		programRecommendation
				.runProgramRecommendationForApplication(recommendationDetails);

		TransactionInfo.enactStubbedDeferredProcessCalls();
		TransactionInfo.setTransactionType(TransactionType.kOnline);

		final curam.creoleprogramrecommendation.facade.struct.CREOLEProgramRecommendationDetailsList1 detailsList = programRecommendation
				.listProgramRecommendationsForCase1(caseHeaderKey);

		CREOLETestHelper.assertEquals(1, detailsList.list.size());

		if (detailsList.list.size() > 0) {

			final CREOLEProgramRecommendationKey programRecommendationKey = new CREOLEProgramRecommendationKey();
			programRecommendationKey.creoleProgramRecommendationID = detailsList.list
					.get(0).creoleProgramRecommendationID;

			final curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList simList = programRecommendation
					.listEligibleSimulatedDeterminations(programRecommendationKey);

			compareUnits(getExpectedHouseholdUnits(),
					getActualHouseholdUnits(simList, claimDate));

			if (simList.list.size() > 0) {
				application.setReadyForDetermination();

				CaseKey pdCaseKey = null;
				SubmitForApprovalKey approvalKey = null;
				SubmitForApprovalKey deliveryApprovalKey = null;
				CertificationCaseIDKey caseIDKey = null;
				SimulatedDeterminationKey simulatedDeterminationKey = null;
				ActivateCaseKey_fo activateCaseKey_fo = null;
				CaseHeaderDtls caseHeaderDtls = null;
				CaseHeaderKey pdCaseHeaderKey = null;

				ProductDelivery productDeliveryObj = curam.core.facade.fact.ProductDeliveryFactory
						.newInstance();
				MOLSAProductDelivery molsaProductDeliveryObj = MOLSAProductDeliveryFactory
						.newInstance();
				IntegratedCase integratedCaseObj = IntegratedCaseFactory
						.newInstance();
				CachedCaseHeader cachedCaseHeaderObj = CachedCaseHeaderFactory
						.newInstance();

				for (Iterator<SimulatedDeterminationDetails> iterator = simList.list
						.iterator(); iterator.hasNext();) {
					SimulatedDeterminationDetails determinationDetails = iterator
							.next();
					simulatedDeterminationKey = new SimulatedDeterminationKey();
					simulatedDeterminationKey.simulatedDeterminationID = determinationDetails.simulatedDeterminationID;
					simulatedDeterminationKey.creoleProgramRecommendationID = determinationDetails.creoleProgramRecommendationID;
					ProductDeliveryKey productDeliveryKey = programRecommendation
							.authorize(simulatedDeterminationKey);
					InformationalManager manager = TransactionInfo
							.getInformationalManager();
					TransactionInfo.enactStubbedDeferredProcessCalls();
					TransactionInfo.setTransactionType(TransactionType.kOnline);

					approvalKey = new SubmitForApprovalKey();
					approvalKey.caseID = productDeliveryKey.caseID;

					pdCaseKey = new CaseKey();
					pdCaseKey.caseID = productDeliveryKey.caseID;
					addVerifications(pdCaseKey);
					// Check whether the case status is submitted already during
					// IC case authorisation. If not, then only submit the
					// -- PDC for approval.

					if (!CASESTATUSEntry.COMPLETED.getCode().equals(
							caseHeaderDAO.get(productDeliveryKey.caseID)
									.getStatus().getCode())) {
						molsaProductDeliveryObj
								.submitPDCForApproval(approvalKey);
						manager = TransactionInfo.getInformationalManager();
					}

					// Assert the condition.
					assertEquals(CASESTATUSEntry.COMPLETED.getCode(),
							caseHeaderDAO.get(productDeliveryKey.caseID)
									.getStatus().getCode());

					TransactionInfo.enactStubbedDeferredProcessCalls();
					TransactionInfo.setTransactionType(TransactionType.kOnline);

					deliveryApprovalKey = new SubmitForApprovalKey();
					deliveryApprovalKey.caseID = productDeliveryKey.caseID;

					// addPDCVerification(approvalKey);
					molsaProductDeliveryObj.approve(deliveryApprovalKey);

					TransactionInfo.enactStubbedDeferredProcessCalls();
					TransactionInfo.setTransactionType(TransactionType.kOnline);

					// Check the functionality regarding the creation of
					// certification period for the product delivery case once
					// we approve it.
					caseIDKey = new CertificationCaseIDKey();
					caseIDKey.caseID = productDeliveryKey.caseID;
					ListICProductDeliveryCertDetailsAndVersionNo certificationsList = integratedCaseObj
							.listProductDeliveryCertificationAndVersionNo(caseIDKey);
					assertEquals(1, certificationsList.dtls.size());

					activateCaseKey_fo = new ActivateCaseKey_fo();
					activateCaseKey_fo.caseID = productDeliveryKey.caseID;

					productDeliveryObj.activate(activateCaseKey_fo);
					TransactionInfo.enactStubbedDeferredProcessCalls();
					TransactionInfo.setTransactionType(TransactionType.kOnline);

					caseHeaderDtls = new CaseHeaderDtls();
					pdCaseHeaderKey = new CaseHeaderKey();
					pdCaseHeaderKey.caseID = productDeliveryKey.caseID;
					caseHeaderDtls = cachedCaseHeaderObj.read(pdCaseHeaderKey);

					CREOLETestHelper.assertEquals(
							curam.codetable.CASESTATUS.ACTIVE,
							caseHeaderDtls.statusCode);

					final Timeline<? extends DeterminationInterval> determination = creoleCaseDeterminationAccessorDAO
							.searchBy(
									productDeliveryDAO
											.get(productDeliveryKey.caseID))
							.get(0).getDeterminationResult()
							.eligibilityEntitlementTimeline();

					if (isCOCApplicable()) {
						performCOC(caseKey);
					}

				}

			}
		}
		postAssertionOnCase(caseKey);
		// return caseKey;
	}

	/**
	 * Verifies PD results.
	 * 
	 * @param determination
	 */
	protected void checkPDEligibilityResult(
			final Timeline<? extends DeterminationInterval> determination) {
	}

	/**
	 * Perform COC changes.
	 * 
	 * @param caseKey
	 * @throws InformationalException
	 * @throws AppException
	 */
	protected void performCOC(final CaseKey caseKey) throws AppException,
			InformationalException {
		// Default Implementation for Scenarios without COC
	}

	/**
	 * Create an Application and link to integrated case.
	 * 
	 * @param caseID
	 *            The case identifier.
	 * 
	 * @return The application
	 * 
	 * @throws AppException
	 *             Generic Exception Signature
	 * @throws InformationalException
	 *             Generic Exception Signature
	 */
	protected final Application createApplication(final long caseID)
			throws AppException, InformationalException {

		final Application application = applicationDAO.newInstance();
		application.setSubmittedDateTime(getClaimDate().getDateTime());
		application.setFilingDate(getClaimDate());
		application.setReference("256");
		application.setSchemaName("MOLSADataStoreSchema");
		application.setInterpreterRequestInd(false);
		application.setInterpreterLanguageCode(LANGUAGEEntry.ENGLISH);
		application.setSpecialAssistanceInd(false);
		application.setSpecialAssistanceRequirements("Application Special"
				+ " Assistance Requirements");
		application.setReferenceAddendum("1");
		application.setApplicationMethod(APPLICATIONMETHODEntry.INPERSON);
		application.setApplicationType(APPLICATIONTYPEEntry.SOCIALASSISTANCE);
		application.setPdfID(new Long("4444"));

		/*
		 * Set the case
		 */
		application.setCaseID(caseID);

		application.insert();

		return application;
	}

	/**
	 * Adds the new applicant to the application.
	 * 
	 * @param applicationID
	 *            Contains a application ID.
	 * @param uniqueName
	 *            Contains a unique name.
	 * @param applicantRole
	 *            Contains a application role.
	 * 
	 * @return intakeApplicant applicant.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	protected final IntakeApplicant createIntakeApplicant(
			final long applicationID, final String uniqueName,
			final APPLICANTROLEEntry applicantRole) throws AppException,
			InformationalException {

		final IntakeApplicant intakeApplicant = intakeApplicantDAO
				.newInstance();

		intakeApplicant.setApplicationID(applicationID);
		intakeApplicant
				.setConcernRoleID(getParticipantRoleID(uniqueName).participantRoleID);
		intakeApplicant.setApplicantRole(applicantRole);
		intakeApplicant.setDateTime(getClaimDate().getDateTime());
		intakeApplicant.insert();

		final IntakeApplicantStatus intakeApplicantStatus = intakeApplicantStatusDAO
				.newInstance();
		intakeApplicantStatus.setIntakeApplicantID(intakeApplicant.getID());
		intakeApplicantStatus.setStatus(APPLICANTSTATUSEntry.ACTIVE);
		intakeApplicantStatus.setDateTime(getClaimDate().getDateTime());
		intakeApplicantStatus.insert();

		intakeApplicant.setCurrentIntakeApplicantStatusID(intakeApplicantStatus
				.getID());
		intakeApplicant.modify(intakeApplicant.getVersionNo());
		return intakeApplicant;
	}

	protected Set<CREOLEProgramRecommendationProduct> formatProgramList(
			String selectedPrograms) {

		final Set<CREOLEProgramRecommendationProduct> creoleProgramRecommendationProducts = new HashSet<CREOLEProgramRecommendationProduct>();

		final StringList productIDList = StringUtil.delimitedText2StringList(
				selectedPrograms, CuramConst.gkTabDelimiterChar);

		for (final String productID : productIDList.items()) {

			creoleProgramRecommendationProducts
					.add(creoleProgramRecommendationProductDAO.get(Long
							.valueOf(productID)));

		}

		return creoleProgramRecommendationProducts;

	}

	@Override
	protected void checkClaimDateDecisions(
			CaseDecisionSummaryList caseDecisionSummaryList)
			throws AppException, InformationalException {

	}

	@Override
	protected void setClaimantRegistrationDetails(
			PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException {

	}

	@Override
	public void addMembersToProductDelivery() throws AppException,
			InformationalException {

	}

	protected abstract void addIntakeApplicant(final Application application)
			throws AppException, InformationalException;

	protected abstract void addCaseMember(final Application application)
			throws AppException, InformationalException;

	protected void setUpCuramServerTest() {

		sessionDoc = new SessionDoc(propagatorSession.getSession());
		super.setUpCuramServerTest();

	}

	protected void tearDownCuramServerTest() {
		final String sessionDocProperty = System.getProperty("sessiondoc");
		if (Boolean.TRUE.toString().equalsIgnoreCase(sessionDocProperty)) {
			final File sessionDocRoot = new File(
					"build/svr/creole.gen/junit_sessiondoc");

			final File sessionDocDir = new File(sessionDocRoot, getClass()
					.getSimpleName() + "_" + "TestCase");

			sessionDoc.write(sessionDocDir);
			testHelper.rollbackTransaction();
			super.tearDownCuramServerTest();
		}

	}

	protected Timeline<Boolean> getActualPDResultTimeline(
			final CaseDeterminationDecisionDetailsList caseDeterminationDecisionDetailsList) {

		List<Interval<Boolean>> eligibilityIntervals = new ArrayList<Interval<Boolean>>();
		final Map<Date, Boolean> eligibilityDate = new TreeMap<Date, Boolean>();
		eligibilityIntervals.add(new Interval<Boolean>(null, false));

		for (final CaseDeterminationDecisionListDetails decisionDetails : caseDeterminationDecisionDetailsList.dtls
				.items()) {
			if (decisionDetails.resultCode
					.equals(CASEDETERMINATIONINTERVALRESULT.ELIGIBLE)) {
				eligibilityIntervals.add(new Interval<Boolean>(
						decisionDetails.decisionFromDate, true));
				eligibilityIntervals.add(new Interval<Boolean>(
						decisionDetails.decisionToDate, false));
			}
		}

		final Timeline<Boolean> eligibilityTimeline = new Timeline<Boolean>(
				eligibilityIntervals);

		for (BoundedInterval<Boolean> boundedInterval : eligibilityTimeline
				.intervals()) {

			if (boundedInterval.startDate() != null) {
				eligibilityDate.put(boundedInterval.startDate(), true);

			}
			if (boundedInterval.endDate() != null) {
				eligibilityDate
						.put(boundedInterval.endDate().addDays(1), false);
			}
		}

		eligibilityIntervals = new ArrayList<Interval<Boolean>>();
		eligibilityIntervals.add(new Interval<Boolean>(null, false));
		for (final Date date : eligibilityDate.keySet()) {
			eligibilityIntervals.add(new Interval<Boolean>(date,
					eligibilityDate.get(date)));
		}

		return new Timeline<Boolean>(eligibilityIntervals);
	}

	/**
	 * Checks whether the COC is applicable or not.
	 * 
	 * @return boolean
	 */
	public boolean isCOCApplicable() {
		return false;
	}

	protected abstract List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException;

	protected List<HouseholdUnit> getActualHouseholdUnits(
			final SimulatedDeterminationDetailsList simList,
			final Date claimDate) throws AppException, InformationalException {

		final List<HouseholdUnit> householdUnits = new ArrayList<HouseholdUnit>();

		for (final SimulatedDeterminationDetails simDetails : simList.list) {
			householdUnits.add(formatUnitMembers(simDetails, claimDate));
		}

		return householdUnits;
	}

	protected HouseholdUnit formatUnitMembers(
			final SimulatedDeterminationDetails simulatedDeterminationDetails,
			final Date claimDate) throws AppException, InformationalException {

		final List<Long> mandatoryMembers = new ArrayList<Long>();
		final List<Long> optionalMembers = new ArrayList<Long>();

		final curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = creoleProgramRecommendationDAO
				.get(simulatedDeterminationDetails.creoleProgramRecommendationID);

		final SimulatedDetermination simulatedDetermination = creoleProgramRecommendation
				.getSimulatedDetermination(simulatedDeterminationDetails.simulatedDeterminationID);

		final Long productID = simulatedDetermination.productID();

		for (Iterator<Entry<CREOLEProgramRecommendationDecisionDisplayCategory, Timeline<String>>> iterator = simulatedDetermination
				.decisionDetailsTimelines().entrySet().iterator(); iterator
				.hasNext();) {
			Entry<CREOLEProgramRecommendationDecisionDisplayCategory, Timeline<String>> entry = iterator
					.next();
			String key = entry.getKey().getCategoryRef();

			if (key.contains("SummaryCategory")) {

				mandatoryMembers.addAll(returnMembers(entry.getValue().valueOn(
						claimDate)));
				break;
			}
		}

		final HouseholdUnit householdUnit = new HouseholdUnit(mandatoryMembers,
				optionalMembers, productID,
				simulatedDetermination.eligibilityTimeline());

		return householdUnit;
	}

	protected void compareUnits(List<HouseholdUnit> expectedUnits,
			List<HouseholdUnit> actualUnits) {

		CREOLETestHelper.assertEquals(expectedUnits.size(), actualUnits.size());
		CREOLETestHelper.assertEquals(true,
				expectedUnits.containsAll(actualUnits));
	}

	protected List<Long> returnMembers(String xml) throws AppException,
			InformationalException {
		List<Long> caseparticipantRoleIDs = new ArrayList<Long>();
		try {
			final Document document = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder()
					.parse(new InputSource(new StringReader(xml.trim())));
			final NodeList unitCompositionList = document
					.getElementsByTagName("eligibilityUnitMemberDetails");
			for (int i = 0; i < unitCompositionList.getLength(); i++) {
				Node node = unitCompositionList.item(i);
				Element element = (Element) node;
				NodeList nodelist = element.getElementsByTagName("Item");

				for (int j = 0; j < nodelist.getLength(); j++) {
					Element element1 = (Element) nodelist.item(j);
					String fullName = element1.getTextContent().toString();
					String name[] = fullName.split(CuramConst.gkSpace);
					caseparticipantRoleIDs
							.add(getCaseParticipantRoleID(name[0]).caseParticipantRoleID);
				}
			}

		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
		return caseparticipantRoleIDs;
	}

}
