package curam.molsa.test.base;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.transaction.Transaction;

import com.google.inject.Inject;

import curam.codetable.BANKACCOUNTSTATUS;
import curam.codetable.BANKACCOUNTTYPE;
import curam.codetable.CASEOBJECTIVE;
import curam.codetable.CASETYPECODE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.CURRENCY;
import curam.codetable.EVIDENCECHANGEREASON;
import curam.codetable.RECORDSTATUS;
import curam.codetable.impl.CASECATTYPECODEEntry;
import curam.codetable.impl.CASEPARTICIPANTROLETYPEEntry;
import curam.codetable.impl.CASETYPECODEEntry;
import curam.codetable.impl.PRODUCTCATEGORYEntry;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.intf.Case;
import curam.core.facade.struct.ActiveCaseParticipantRoleList;
import curam.core.facade.struct.AddClientRoleDetails;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.ClearCachedRecordsFactory;
import curam.core.fact.IntegratedCaseFactory;
import curam.core.fact.InteractiveCaseEligibilityFactory;
import curam.core.fact.MaintainCaseDecisionFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.MaintainConcernRoleAltIDFactory;
import curam.core.fact.PersonRegistrationFactory;
import curam.core.fact.PreReleaseEligibilityFactory;
import curam.core.fact.ProductDeliveryActivationEligibilityFactory;
import curam.core.fact.ProductDeliveryApprovalFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.fact.UniquePersonIDFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.InteractiveCaseEligibility;
import curam.core.intf.MaintainCertification;
import curam.core.intf.MaintainConcernRoleAltID;
import curam.core.intf.ProductDeliveryApproval;
import curam.core.intf.ProductDeliveryCertDiary;
import curam.core.intf.UniquePersonID;
import curam.core.sl.entity.struct.CaseParticipantRoleID;
import curam.core.sl.infrastructure.entity.fact.TemporalEvidenceApprovalCheckFactory;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorInsertDtls;
import curam.core.sl.infrastructure.entity.struct.TemporalEvidenceApprovalCheckDtls;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EIEvidenceInsertDtls;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.intf.EvidenceController;
import curam.core.sl.infrastructure.struct.ApplyChangesDetails;
import curam.core.sl.infrastructure.struct.ECWIPDtls;
import curam.core.sl.struct.CaseParticipantDetails;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.SearchCaseParticipantDetailsKey;
import curam.core.sl.struct.SearchCaseParticipantDetailsList;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.AlternateIDDetails;
import curam.core.struct.CaseDecisionIDStruct;
import curam.core.struct.CaseDecisionSummaryList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseIDAndRecordStatus;
import curam.core.struct.CaseIDDetails;
import curam.core.struct.CaseIdentifier;
import curam.core.struct.CaseKey;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.EvaluateCaseForGivenDateResult;
import curam.core.struct.EvidenceStruct;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.IntegratedCaseRegistrationDetails1;
import curam.core.struct.MaintainCaseDecisionCaseIDKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.MaintainConcernRoleAltIDKey;
import curam.core.struct.PDCertDiaryCaseIDAndStatusCodeRMKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.PreReleaseForGivenDateKey;
import curam.core.struct.ProductDeliveryApprovalKey;
import curam.core.struct.ProductDeliveryCertDiaryDtls;
import curam.core.struct.ProductDeliveryCertDiaryDtlsList;
import curam.core.struct.ProductDeliveryCertDiaryKey;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.RegisterProductDeliveryDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.core.struct.RegistrationIDDetails;
import curam.core.struct.SubmitForApprovalKey;
import curam.creole.value.CodeTableItem;
import curam.dynamicevidence.definition.impl.EvidenceTypeDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.dynamicevidence.impl.DynamicEvidenceDataAttributeDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.intake.facade.struct.ParticipantRoleIDKey;
import curam.message.BPOEVIDENCECONTROLLER;
import curam.message.ENTTEMPEVAPPROVALCHECK;
import curam.molsa.codetable.MOLSABICCODE;
import curam.molsa.test.framework.CuramServerTest;
import curam.pdc.fact.PDCUtilFactory;
import curam.pdc.intf.PDCUtil;
import curam.pdc.struct.PDCCaseIDCaseParticipantRoleID;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.IntegratedCaseDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.message.CatEntry;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.UniqueID;
import curam.verification.facade.fact.VerificationAdministrationFactory;
import curam.verification.facade.infrastructure.fact.VerificationApplicationFactory;
import curam.verification.facade.infrastructure.intf.VerificationApplication;
import curam.verification.facade.infrastructure.struct.CreateVerificaitonItemProvidedDetails;
import curam.verification.facade.infrastructure.struct.ListVerificationItemNameAndLevelDetails;
import curam.verification.facade.infrastructure.struct.VDIEDLinkKey;
import curam.verification.facade.intf.VerificationAdministration;
import curam.verification.facade.struct.CancelVerificationRequirementUsageDetails;
import curam.verification.sl.entity.base.VerificationRequirementUsage;
import curam.verification.sl.entity.fact.VerificationRequirementFactory;
import curam.verification.sl.entity.fact.VerificationRequirementUsageFactory;
import curam.verification.sl.entity.intf.VerificationRequirement;
import curam.verification.sl.entity.struct.VerificationRequirementCancelDetails;
import curam.verification.sl.entity.struct.VerificationRequirementDtls;
import curam.verification.sl.entity.struct.VerificationRequirementKey;
import curam.verification.sl.entity.struct.VerificationRequirementUsageCancelDetails;
import curam.verification.sl.entity.struct.VerificationRequirementUsageDtls;
import curam.verification.sl.entity.struct.VerificationRequirementUsageKey;
import curam.verification.sl.infrastructure.entity.fact.VerificationFactory;
import curam.verification.sl.infrastructure.entity.intf.Verification;
import curam.verification.sl.infrastructure.entity.struct.VerificationKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationRequirementIDDetails;
import curam.verification.sl.infrastructure.entity.struct.VerificationRequirementIDDetailsList;
import curam.verification.sl.infrastructure.entity.struct.VerificationStatusDetails;
import curam.verification.sl.infrastructure.fact.VerificationItemProvidedFactory;
import curam.verification.sl.infrastructure.intf.VerificationItemProvided;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDisplayDetails;
import curam.verification.sl.infrastructure.struct.CaseEvidenceVerificationDisplayDetailsList;

/**
 * Base framework class for all ISU Scenario tests.
 * 
 * Tests inheriting from this class support the following parameters:
 * <UL>
 * 
 * <LI>-Disproduct.showgui=true - shows a start-up dialog allowing the developer
 * to set any of the options below;</LI>
 * 
 * <LI>-Disproduct.commitdata=true - commits any database updates made during
 * the test; default is to rollback any database updates;</LI>
 * 
 * <LI>-Disproduct.testmode=quick - runs the test in "quick" mode (using online
 * eligibility); default is "strict" mode (using full product eligibility);</LI>
 * 
 * <LI>-Disproduct.displayevidence=true - pretty-prints all evidence created for
 * TAM and Change-of-Circumstance dates; and</LI>
 * 
 * <LI>-Disproduct.displaydecisions=true - outputs the XML for the decision
 * tree. This output can be very long and so to avoid truncation in Eclipse you
 * may want to un-check
 * 
 * <UL>
 * <LI>Window...</LI>
 * <LI>Preferences...</LI>
 * <LI>Run/Debug...</LI>
 * <LI>Console...</LI>
 * <LI>Limit console output.</LI>
 * </UL>
 * 
 * </LI>
 * 
 * </UL>
 * 
 * If running from the command line, the parameters above can be passed in the
 * command text.
 * 
 * If running in Eclipse, then you can either:
 * <UL>
 * <LI>Configure an individual test launcher:
 * 
 * <UL>
 * <LI>Run...</LI>
 * <LI>Run...</LI>
 * <LI>[Choose the launch configuration for your test - you may need to run the
 * test first to create one]...</LI>
 * <LI>Arguments...</LI>
 * <LI>VM Arguments...</LI>
 * </UL>
 * or
 * 
 * <LI>Configure the default VM arguments for all test executions:
 * 
 * <UL>
 * <LI>Window...</LI>
 * <LI>Preferences...</LI>
 * <LI>Java...</LI>
 * <LI>Installed JREs...</LI>
 * <LI>[Choose 'Curam VM']...</LI>
 * <LI>Edit...</LI>
 * <LI>Default VM Arguments.</LI>
 * </UL>
 * 
 * </UL>
 */

public abstract class AbstractMolsaTestBase extends CuramServerTest {

	protected static final String ASIFA_UNIQUE_NAME = "Asifa";

	protected static final String MOHAMMED_UNIQUE_NAME = "Mohammad";

	protected static final String HAMEED_SURNAME = "Hameed";

	protected static final String MOHAMMED_SURNAME = "Mohammed";

	protected static final String MAHEENA_UNIQUE_NAME = "Maheena";

	protected static final String FATHIMA_UNIQUE_NAME = "Fathima";

	protected static final String RAFI_UNIQUE_NAME = "Rafi";

	protected static final String KHAN_SURNAME = "Khan";

	protected static final String ZOHRA_UNIQUE_NAME = "Zohra";

	protected static final String FIRDOZ_UNIQUE_NAME = "Firdoz";

	protected static final String ASMA_UNIQUE_NAME = "Asma";

	protected static final String TASNEEM_UNIQUE_NAME = "Tasneem";

	protected static final String SULTANA_SURNAME = "Sultana";

	private static final String kMessageAmt = "' and amount: '";

	private static final String kMessageEnd = "'.  ";

	private static final String kMessageResult = "' with result: '";

	// Constants used to create the message when an expected decision cannot be
	// found
	private static final String kMessageStart = "A decision could not be found from: '";

	private static final String kMessageTo = "' to: '";

	public static final String ADDRESS_DATA = "1\n0\nUS\nQA\n0\n0\nCITY=MM17005\nZIP=\nADD2=MS17003\n"
			+ "ADD1=MZ17083\nADD4=\nADD5=\nUNITNO=\nCOUNTRY=QA\nPOBOXNO=\n";

	// The partner's unique name
	protected static final String PARTNER_UNIQUE_NAME = "Partner";

	// The spouse's unique name
	protected static final String SPOUSE_UNIQUE_NAME = "Spouse";

	protected static final String ANNUITY_INSTITUTION_NAME = "Annuity Institution";

	@Inject
	private CaseParticipantRoleDAO caseParticipantRoleDAO;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	@Inject
	protected EvidenceTypeDefDAO etDefDAO;

	@Inject
	protected EvidenceTypeVersionDefDAO etVerDefDAO;

	protected EvidenceControllerInterface evidenceControllerObj;

	// ___________________________________________________________________________
	/**
	 * Formats the date into a dd/MM/yyyy String
	 * 
	 * @param date
	 *            the date to format
	 * @return the date formatted as a dd/MM/yyyy String
	 */
	public static String formatDate(Date date) {
		if (date == null || date.isZero()) {
			return "<blank>";
		}

		java.util.Date javaDate = date.getCalendar().getTime();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");

		return simpleDateFormat.format(javaDate);
	}

	// ___________________________________________________________________________
	/**
	 * Pads the String specified to be 32 characters wide plus a tab
	 */
	private static String padName(String text) {
		final String NAME_PAD = "                                ";

		return (text + NAME_PAD).substring(0, NAME_PAD.length()) + "\t";

	}

	/**
	 * The date that the claim was made
	 */
	private Date claimDate;

	/**
	 * The requested run mode for the test
	 */
	private boolean inStrictTestMode;

	// The integrated case id
	private long integratedCaseID;

	// An array list of all the participants in the household
	protected ArrayList participantTestDetailsList = new ArrayList();

	// The product delivery case id
	private long productDeliveryCaseID;

	private long productID;

	private long liabilityProductID;
	private long liabilityCaseID;

	// create product delivery indicator. True if product delivery
	// must be created
	private boolean createProductDeliveryInd = true;
	private boolean createLiabilityInd = false;

	// public office test data
	protected long publicOfficeID = 3501;

	// ___________________________________________________________________________
	/**
	 * Class constructor
	 * 
	 * @param arg0
	 *            Constructor argument
	 */
	public AbstractMolsaTestBase(String arg0) {

		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);
		evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
	}

	public void setIntegratedCaseID(final long caseID) {
		integratedCaseID = caseID;
	}

	public long getIntegratedCaseID() {
		return integratedCaseID;
	}

	public void setParticipantTestDetailsList() {
		participantTestDetailsList = new ArrayList();
	}

	public List<ParticipantTestDetails> getParticipantTestDetailsList() {
		return participantTestDetailsList;
	}

	// ___________________________________________________________________________
	/**
	 * Activate the Product Delivery case.
	 */
	protected void activateCase(CaseKey key) throws AppException,
			InformationalException {

		InteractiveCaseEligibility interactiveCaseEligibilityObj = InteractiveCaseEligibilityFactory
				.newInstance();
		CaseIdentifier caseIdentifier = new CaseIdentifier();

		caseIdentifier.caseID = key.caseID;

		// Activate the benefit case
		interactiveCaseEligibilityObj.activateBenefitCase(caseIdentifier);

		// Prepare key for assessing the eligibility of the case
		CaseIDDetails caseIDDetails = new CaseIDDetails();

		caseIDDetails.caseID = key.caseID;
		caseIDDetails.caseType = CASETYPECODE.PRODUCTDELIVERY;

		//
		// Clear the cache from any previous transactions
		//
		curam.core.intf.ClearCachedRecords clearCachedRecords = ClearCachedRecordsFactory
				.newInstance();

		clearCachedRecords.clearAllCaches();

		// Access the eligibility of the case
		ProductDeliveryActivationEligibilityFactory.newInstance()
				.assessEligibilityForCase(caseIDDetails);

	}

	/**
	 * Add and activate evidence that lives on the product delivery rather than
	 * the integrated case. It is not abstract because there should be no
	 * obligation on sub classes to implement this method.
	 * 
	 * @param pdCaseKey
	 *            The product delivery case id
	 */
	protected void addAndActivateProductDeliveryEvidence(CaseKey pdCaseKey)
			throws AppException, InformationalException {
	}

	// ___________________________________________________________________________
	/**
	 * Modifies the certification period on a product delivery
	 * 
	 * 
	 * @param periodFromDate
	 *            - the start date of the certification period
	 * 
	 * @param periodToDate
	 *            - the end date of the certification period
	 * 
	 */
	protected void modifyCertificationPeriod(Date periodFromDate,
			Date periodToDate) throws AppException, InformationalException {

		// Product Delivery Certification Object
		ProductDeliveryCertDiary productDeliveryCertDiaryObj = curam.core.fact.ProductDeliveryCertDiaryFactory
				.newInstance();

		// Product Delivery Certification manipulation variables
		ProductDeliveryCertDiaryDtlsList productDeliveryCertDiaryDtlsList = new ProductDeliveryCertDiaryDtlsList();
		PDCertDiaryCaseIDAndStatusCodeRMKey pdCertDiaryCaseIDAndStatusCodeRMKey = new PDCertDiaryCaseIDAndStatusCodeRMKey();
		ProductDeliveryCertDiaryDtls productDeliveryCertDiaryDtls = new ProductDeliveryCertDiaryDtls();
		ProductDeliveryCertDiaryKey productDeliveryCertDiaryKey = new ProductDeliveryCertDiaryKey();

		// set key
		pdCertDiaryCaseIDAndStatusCodeRMKey.caseID = productDeliveryCaseID;
		pdCertDiaryCaseIDAndStatusCodeRMKey.statusCode = RECORDSTATUS.NORMAL;

		// Case Header Object
		curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory
				.newInstance();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

		caseHeaderKey.caseID = productDeliveryCaseID;

		CaseHeaderDtls caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

		caseHeaderDtls.expectedEndDate = periodToDate;

		// modify expected end date on caseHeader
		caseHeaderObj.modify(caseHeaderKey, caseHeaderDtls);

		// read product delivery certification details
		productDeliveryCertDiaryDtlsList = productDeliveryCertDiaryObj
				.searchActiveByCaseID(pdCertDiaryCaseIDAndStatusCodeRMKey);

		// loop though return list (should only be one) and update the
		// certification
		// with the new dates
		for (int i = 0; i < productDeliveryCertDiaryDtlsList.dtls.size(); i++) {

			productDeliveryCertDiaryDtls = productDeliveryCertDiaryDtlsList.dtls
					.item(i);

			productDeliveryCertDiaryDtls.periodFromDate = periodFromDate;
			productDeliveryCertDiaryDtls.periodToDate = periodToDate;

			productDeliveryCertDiaryKey.certificationDiaryID = productDeliveryCertDiaryDtls.certificationDiaryID;

			productDeliveryCertDiaryObj.modify(productDeliveryCertDiaryKey,
					productDeliveryCertDiaryDtls);
		}

	}

	// ___________________________________________________________________________
	/**
	 * Add the TAM date evidence for the scenario.
	 * 
	 * @param caseKey
	 *            Contains caseID.
	 * 
	 */
	
		
	protected abstract void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException;
	
	protected void testSendSMS(CaseKey caseKey) throws AppException,
	InformationalException{
		
	}

	protected void testValidation(CaseKey caseKey) throws AppException,
	InformationalException{
		
	}
	
	protected void testlistParticipantByCriteria(CaseKey caseKey) throws AppException,
	InformationalException{
		
	}
	
	// ___________________________________________________________________________
	/**
	 * Add the TAM date evidence for the additional product delivery scenario.
	 * 
	 * @param caseKey
	 *            Contains caseID.
	 * 
	 */
	protected void addEvidenceForAdditionalProductDelivery(CaseKey caseKey)
			throws AppException, InformationalException {
	}

	// ___________________________________________________________________________
	/**
	 * Add the TAM date evidence for the liability case.
	 * 
	 * @param caseKey
	 *            Contains caseID.
	 */
	protected void addEvidenceForLiability(CaseKey caseKey)
			throws AppException, InformationalException {
	}

	// ___________________________________________________________________________
	/**
	 * Approve the Product Delivery case.
	 */
	protected void approveCase(CaseKey key) throws AppException,
			InformationalException {

		// Product delivery maintenance object
		ProductDeliveryApproval productDeliveryApprovalObj = ProductDeliveryApprovalFactory
				.newInstance();

		// Submit the case for approval
		SubmitForApprovalKey submitForApprovalKey = new SubmitForApprovalKey();

		submitForApprovalKey.caseID = key.caseID;
		productDeliveryApprovalObj.submitForApproval(submitForApprovalKey);

		// Approve the case
		ProductDeliveryApprovalKey productDeliveryApprovalKey = new ProductDeliveryApprovalKey();

		productDeliveryApprovalKey.caseID = key.caseID;
		productDeliveryApprovalObj.approve(productDeliveryApprovalKey);

	}

	// ___________________________________________________________________________
	/**
	 * Retrieves the participant role id for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * 
	 * @return Structure containing the participant role id
	 */
	protected ParticipantRoleIDKey getParticipantRoleID(String uniqueName)
			throws AppException, InformationalException {

		ParticipantRoleIDKey participantRoleIDKey = new ParticipantRoleIDKey();

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {

			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.uniqueName.equals(uniqueName)) {

				// Set the participant role id
				participantRoleIDKey.participantRoleID = participantTestDetails.participantRoleID;
				break;
			}
		}
		return participantRoleIDKey;
	}

	protected long getProductDeliveryCaseID() {
		return productDeliveryCaseID;
	}

	// ___________________________________________________________________________
	/**
	 * Checks the claim date for eligibility and entitlement
	 * 
	 * @return Struct containing case ID.
	 */
	public CaseKey checkClaimDate() throws AppException, InformationalException {

		// Create the case and add the evidence before the change of
		// circumstance
		CaseKey caseKey = createStandardCase();

		TransactionInfo.setInformationalManager();

		try {
			addEvidence(caseKey);
		} catch (final InformationalException e) {
			final String[] exceptions = e.getExceptionDetails();

			for (int i = 0; i < exceptions.length; i++) {
				System.err.println(exceptions[i]);
			}

			throw e;
		}

		if (liabilityCaseID != 0) {

			CaseKey liabCaseKey = new CaseKey();

			liabCaseKey.caseID = liabilityCaseID;

			addEvidenceForLiability(liabCaseKey);

		}

		if (productDeliveryCaseID != 0) {
			addMembersToProductDelivery();
		}

		//
		// Activate new evidence
		//
		activateAllInEditEvidence();

		TransactionInfo.setInformationalManager();

		activateAllProductDeliveryInEditEvidence();
		CaseDecisionSummaryList caseDecisionSummaryList = null;
		CaseDecisionSummaryList caseDecisionSummaryListLiab = null;

		if (inStrictTestMode()) {
			// create a product delivery

			// Check the decisions on the claim date
			MaintainCaseDecisionCaseIDKey maintainCaseDecisionCaseIDKey = new MaintainCaseDecisionCaseIDKey();

			// Setting informational as InformationalManager
			// does not see to get 'flushed' between tests and therefore
			// causing tests to fail
			TransactionInfo.setInformationalManager();

			if (productDeliveryCaseID != 0) {

				CaseKey pdCaseKey = new CaseKey();

				pdCaseKey.caseID = productDeliveryCaseID;
				// determine list of decisions

				approveCase(pdCaseKey);

				// Call the method to add product delivery specific evidence.
				addAndActivateProductDeliveryEvidence(pdCaseKey);
				activateCase(pdCaseKey);

				maintainCaseDecisionCaseIDKey.caseID = productDeliveryCaseID;
				caseDecisionSummaryList = MaintainCaseDecisionFactory
						.newInstance().getActiveCaseDecisions(
								maintainCaseDecisionCaseIDKey);

			}

			if (liabilityCaseID != 0) {

				maintainCaseDecisionCaseIDKey.caseID = liabilityCaseID;

				caseDecisionSummaryListLiab = MaintainCaseDecisionFactory
						.newInstance().getActiveCaseDecisions(
								maintainCaseDecisionCaseIDKey);

			}

		} else {
			// not really sure, what we can do here... may be able to just run
			// the
			// rules, no need for product delivery. This may entail
			// pre-populating the
			// assistance unit though

			// no list of decisions
			caseDecisionSummaryList = null;
			caseDecisionSummaryListLiab = null;
		}

		if (productDeliveryCaseID != 0) {
			// call the test-specific checks for the TAM date
			checkClaimDateDecisions(caseDecisionSummaryList);

		}
		if (liabilityCaseID != 0) {

			checkClaimDateDecisionsForLiability(caseDecisionSummaryListLiab);

		}

		return caseKey;

	}

	// ___________________________________________________________________________
	/**
	 * Activate all changes which have been made to evidence.
	 */
	protected void activateAllInEditEvidence() throws AppException,
			InformationalException {

		EvidenceController evidenceControllerObj = EvidenceControllerFactory
				.newInstance();

		CaseKey caseKey = new CaseKey();

		caseKey.caseID = integratedCaseID;

		try {
			// Insert
			curam.core.sl.infrastructure.entity.intf.TemporalEvidenceApprovalCheck temporalEvidenceApprovalCheckObj = TemporalEvidenceApprovalCheckFactory
					.newInstance();
			TemporalEvidenceApprovalCheckDtls tempDtls = new TemporalEvidenceApprovalCheckDtls();

			tempDtls.percentage = 0;
			tempDtls.userName = "molsacaseworker";

			tempDtls.recordStatus = "RST1";
			tempDtls.approvalType = "TEA3";

			temporalEvidenceApprovalCheckObj.insert(tempDtls);

		} catch (AppException e) {
			// Ignore temp evidence approval check
			CatEntry catEntry = ENTTEMPEVAPPROVALCHECK.ERR_TEMPEVAPPROVALCHECK_XRV_RECORD_ALREADY_EXISTS;

			if (!e.getMessage().equals(catEntry.getMessageText())) {
				e.printStackTrace();
			}
		}

		evidenceControllerObj.applyAllChanges(caseKey);
	}

	// ___________________________________________________________________________
	/**
	 * Activate all changes which have been made to product delivery evidence.
	 */
	protected void activateAllProductDeliveryInEditEvidence()
			throws AppException, InformationalException {

		// Ignore any informational messages when the evidence is successfully
		// activated.
		InformationalManager informationalManager = curam.util.transaction.TransactionInfo
				.getInformationalManager();

		informationalManager
				.acceptWarning(
						CuramConst.gkEmpty,
						new AppException(
								BPOEVIDENCECONTROLLER.ERR_CONTROLLER_EVIDENCE_ATTRIBUTION_SUCCEEDED));

		informationalManager
				.acceptWarning(
						CuramConst.gkEmpty,
						new AppException(
								BPOEVIDENCECONTROLLER.ERR_CONTROLLER_APPLY_ALL_CHANGES_SUCCEEDED));
		EvidenceController evidenceControllerObj = EvidenceControllerFactory
				.newInstance();

		CaseKey caseKey = new CaseKey();

		caseKey.caseID = productDeliveryCaseID;

		try {
			// Insert
			curam.core.sl.infrastructure.entity.intf.TemporalEvidenceApprovalCheck temporalEvidenceApprovalCheckObj = TemporalEvidenceApprovalCheckFactory
					.newInstance();
			TemporalEvidenceApprovalCheckDtls tempDtls = new TemporalEvidenceApprovalCheckDtls();

			tempDtls.percentage = 0;
			tempDtls.userName = "molsacaseworker";
			tempDtls.recordStatus = "RST1";
			tempDtls.approvalType = "TEA3";

			temporalEvidenceApprovalCheckObj.insert(tempDtls);

		} catch (AppException e) {
			if (!mQuietMode) {
				e.printStackTrace();
			}
		}

		evidenceControllerObj.applyAllChanges(caseKey);
		evidenceControllerObj.applyAllChanges(caseKey);

	}

	// ___________________________________________________________________________
	/**
	 * Checks the decisions at the claim date.
	 * 
	 * @param caseDecisionSummaryList
	 *            The Case Decision Summary List
	 */
	protected abstract void checkClaimDateDecisions(
			CaseDecisionSummaryList caseDecisionSummaryList)
			throws AppException, InformationalException;

	// ___________________________________________________________________________
	/**
	 * Checks the decisions at the claim date for the additional product
	 * delivery.
	 * 
	 * @param caseDecisionSummaryList
	 *            The Case Decision Summary List
	 */
	protected void checkClaimDateDecisionsForAdditionalProductDelivery(
			CaseDecisionSummaryList caseDecisionSummaryList)
			throws AppException, InformationalException {
	}

	// ___________________________________________________________________________
	/**
	 * Checks the decisions at the claim date for the liability case.
	 * 
	 * @param caseDecisionSummaryList
	 *            The Case Decision Summary List
	 */
	protected void checkClaimDateDecisionsForLiability(
			CaseDecisionSummaryList caseDecisionSummaryList)
			throws AppException, InformationalException {
	}

	// ___________________________________________________________________________
	/**
	 * Checks eligibility for a given date.
	 * 
	 * @param date
	 *            the date for which to check eligibility for the case.
	 */
	protected EvaluateCaseForGivenDateResult checkEligibilityOnDate(Date date)
			throws AppException, InformationalException {
		// check eligibility for a particular date

		// EvaluateCaseForGivenDate manipulation variables
		PreReleaseForGivenDateKey preReleaseForGivenDateKey = new PreReleaseForGivenDateKey();
		EvidenceStruct evidenceStruct = new EvidenceStruct();

		// Set key to determine eligibility on the given date
		preReleaseForGivenDateKey.caseID = productDeliveryCaseID;
		preReleaseForGivenDateKey.evaluationDate = date;
		preReleaseForGivenDateKey.forActiveEvidenceInd = true;

		EvaluateCaseForGivenDateResult evaluateCaseForGivenDateResult = PreReleaseEligibilityFactory
				.newInstance().evaluateCaseForGivenDate(
						preReleaseForGivenDateKey, evidenceStruct);

		return evaluateCaseForGivenDateResult;

	}

	// ___________________________________________________________________________
	/**
	 * Create a product delivery. Unfortunately the application is factored to
	 * allow reuse of methods. This code pretty much duplicates
	 * ISPProductDelivery
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected CaseKey createProductDelivery(long newProductID)
			throws AppException, InformationalException {
		// Product delivery objects

		curam.core.intf.CreateProductDelivery createProductDeliveryObj = curam.core.fact.CreateProductDeliveryFactory
				.newInstance();

		// get the product delivery pattern details
		AdminPDPIByProdIDAndDateKey adminPDPIByProdIDAndDateKey = new AdminPDPIByProdIDAndDateKey();

		adminPDPIByProdIDAndDateKey.effectiveDate = claimDate;
		adminPDPIByProdIDAndDateKey.productID = newProductID;
		ProductDeliveryPatternInfoDetails productDeliveryPatternInfoDetails = AdminProductDeliveryPatternInfoFactory
				.newInstance().getDefaultByProductIDAndDate(
						adminPDPIByProdIDAndDateKey);

		GetProductProviderKey getProductProviderKey = new GetProductProviderKey();

		getProductProviderKey.productID = newProductID;

		GetProductProviderDetailsResult getProductProviderDetailsResult = createProductDeliveryObj
				.getProductProviderDetails(getProductProviderKey);

		RegisterProductDeliveryKey registerProductDeliveryKey = new RegisterProductDeliveryKey();

		registerProductDeliveryKey.currencyType = CURRENCY.DEFAULTCODE;
		registerProductDeliveryKey.integratedCaseID = integratedCaseID;

		registerProductDeliveryKey.productDeliveryPatternID = productDeliveryPatternInfoDetails.productDeliveryPatternID;
		registerProductDeliveryKey.productProviderID = getProductProviderDetailsResult.productProvidersDetailsList.dtls
				.item(0).productProviderID;
		registerProductDeliveryKey.providerLocationID = getProductProviderDetailsResult.productProvidersDetailsList.dtls
				.item(0).providerLocationID;
		registerProductDeliveryKey.receivedDate = registerProductDeliveryKey.caseStartDate;
		registerProductDeliveryKey.objectiveCode = CASEOBJECTIVE.DEFAULTCODE;
		registerProductDeliveryKey.receivedDate = claimDate;
		registerProductDeliveryKey.caseStartDate = claimDate;
		registerProductDeliveryKey.expectedStartDate = claimDate;

		registerProductDeliveryKey.productID = newProductID;

		ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
				.get(0);

		registerProductDeliveryKey.clientID = participantTestDetails.participantRoleID;

		RegisterProductDeliveryDetails registerProductDeliveryDetails = new RegisterProductDeliveryDetails();

		registerProductDeliveryDetails.integratedCaseInd = true;

		createProductDeliveryObj.registerProductDelivery(
				registerProductDeliveryKey, registerProductDeliveryDetails);

		// return struct
		CaseKey prodCaseKey = new CaseKey();

		prodCaseKey.caseID = registerProductDeliveryDetails.caseID;

		createCertification(prodCaseKey);

		productID = newProductID;

		return prodCaseKey;

	}

	protected void createCertification(CaseKey key) throws AppException,
			InformationalException {

		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
				.newInstance();

		MaintainCertificationDetails maintainCertificationDetails = new MaintainCertificationDetails();
		// caseheader retrival
		maintainCertificationDetails.caseID = key.caseID;
		maintainCertificationDetails.periodFromDate = Date.getCurrentDate();

		Calendar calendarToDate = Date.getCurrentDate().getCalendar();

		calendarToDate.add(2, (int) 11l);

		calendarToDate.set(5, calendarToDate.getActualMaximum(5));

		maintainCertificationDetails.periodToDate = new Date(calendarToDate);

		if (Date.getCurrentDate().after(Date.getCurrentDate())) {
			maintainCertificationDetails.certificationReceivedDate = Date
					.getCurrentDate();
		} else {
			maintainCertificationDetails.certificationReceivedDate = Date
					.getCurrentDate();
		}

		maintainCertificationObj
				.createCertification(maintainCertificationDetails);

	}

	// ___________________________________________________________________________
	/**
	 * Create a standard Integrated case, register the customer and create any
	 * additional household members required for the scenario
	 * 
	 * @return Struct containing case ID.
	 */
	protected CaseKey createStandardCase() throws AppException,
			InformationalException {

		// Register a security implementation for the transaction
		SecurityImplementationFactory.register();
		TransactionInfo.setInformationalManager();

		// Ignore any warnings about certification frequency.
		InformationalManager informationalManager = curam.util.transaction.TransactionInfo
				.getInformationalManager();

		informationalManager
				.acceptWarning(
						CuramConst.gkEmpty,
						new AppException(
								curam.message.BPOMAINTAINCERTIFICATIONASSISTANT.INF_CERTIFICATION_FREQUENCY));

		// Register the customer for the scenario
		RegistrationIDDetails registrationIDDetails = new RegistrationIDDetails();
		registrationIDDetails = registerClaimant();

		// Create an ISP integrated case
		CaseKey caseKey = registerCase(registrationIDDetails);

		return caseKey;

	}

	// ___________________________________________________________________________
	/**
	 * Retrieves the case participant role details for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * 
	 * @return Structure containing the case participant role id
	 */
	protected ParticipantTestDetails getCaseParticipantRoleDetails(
			long caseParticipantRoleID) {

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {

			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.caseParticipantRoleID == caseParticipantRoleID) {
				return participantTestDetails;
			}

		}

		// not found
		return null;

	}

	// ___________________________________________________________________________
	/**
	 * Gets the date that the claim was "Treated as Made" (TAM)
	 * 
	 * @return The Claim Date
	 */
	protected Date getClaimDate() {
		return claimDate;
	}

	// ___________________________________________________________________________
	/**
	 * Retrieves the case participant role id for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * 
	 * @return Structure containing the case participant role id
	 */
	protected CaseParticipantRoleID getCaseParticipantRoleID(String uniqueName)
			throws AppException, InformationalException {

		CaseParticipantRoleID caseParticipantRoleID = new CaseParticipantRoleID();

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {

			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.uniqueName.equals(uniqueName)) {

				// Set the participant role id
				caseParticipantRoleID.caseParticipantRoleID = participantTestDetails.caseParticipantRoleID;

				break;
			}

		}

		return caseParticipantRoleID;

	}

	// ___________________________________________________________________________
	/**
	 * Return a curam date object given integer values for day, month and year.
	 * 
	 * @param day
	 *            The day of the month. Starts at 1.
	 * @param month
	 *            The month of the year. Starts at 1.
	 * @param year
	 *            The year
	 */
	protected Date getDate(int day, int month, int year) {
		// guard against passing in a two-digit year by mistake!
		assertTrue(year > 100);
		return new Date(new GregorianCalendar(year, month - 1, day));
	}

	// ___________________________________________________________________________
	/**
	 * @return the mode in which the test will run:
	 *         <UL>
	 *         <LI>'strict' mode: ProductDelivery normalReassessment will be
	 *         used (the "gray box")and a full set of decisions will be
	 *         generated; or</LI>
	 *         <LI>'quick' mode: checkEligibility will be used ("online
	 *         eligibility"); only the start/end dates of known decision ranges
	 *         will be checked.</LI>
	 *         </UL>
	 */
	protected boolean inStrictTestMode() {
		return inStrictTestMode;
	}

	// ___________________________________________________________________________
	/**
	 * Outputs the exception details so that the developer can fathom what
	 * failed
	 */
	protected void printException(AppException e) throws AppException {
		System.err.println(e.getMessage());
		throw e;
	}

	// ___________________________________________________________________________
	/**
	 * Outputs the exception details so that the developer can fathom what
	 * failed
	 */
	protected void printException(InformationalException e)
			throws InformationalException {
		String[] exceptionDetails = e.getExceptionDetails();

		for (int i = 0; i < exceptionDetails.length; i++) {
			String exceptionDetail = exceptionDetails[i];

			System.err.println(exceptionDetail);

		}
		throw e;

	}

	// ___________________________________________________________________________
	/**
	 * Create an ISP Integrated case
	 * 
	 * @return Structure containing case ID.
	 */
	protected CaseKey registerCase(RegistrationIDDetails details)
			throws AppException, InformationalException {

		// Set up the integrated case registration details
		final IntegratedCaseRegistrationDetails1 icRegistrationDetails = new IntegratedCaseRegistrationDetails1();
		icRegistrationDetails.primaryClientID = details.concernRoleID;
		icRegistrationDetails.integratedCaseType = PRODUCTCATEGORYEntry.SOCIAL_ASSITANCE
				.getCode();
		icRegistrationDetails.startDate = Date.getCurrentDate().addDays(-10);
		// Assign primaryClientID to caseClientList. This list is used to create
		// the Case Participant Roles.
		icRegistrationDetails.caseClientList = String
				.valueOf(icRegistrationDetails.primaryClientID);

		// Create the integrated case
		final curam.core.struct.IntegratedCaseIDKey integratedCaseIDKey = IntegratedCaseFactory
				.newInstance().createIntegratedCase1(icRegistrationDetails);

		integratedCaseID = integratedCaseIDKey.caseID;

		// Assert that there is only one person in the participant list
		// i.e. the claimant
		/*
		 * assertEquals(participantTestDetailsList.size(), 1);
		 * 
		 * ParticipantTestDetails participantTestDetails =
		 * (ParticipantTestDetails) participantTestDetailsList.get(0);
		 * 
		 * participantTestDetails.caseParticipantRoleID =
		 * ispCaseRegistrationDetails
		 * .iSPCaseRegistrationDetails.createHholdMember
		 * .dtls.caseParticipantRoleID;
		 * 
		 * // Set the case participant role id participantTestDetailsList.set(0,
		 * participantTestDetails);
		 * 
		 * // Assert that the size is still 1
		 * assertEquals(participantTestDetailsList.size(), 1);
		 */

		// create return structure
		CaseKey caseKey = new CaseKey();

		caseKey.caseID = integratedCaseIDKey.caseID;

		if (createProductDeliveryInd) {

			productDeliveryCaseID = createProductDelivery(productID).caseID;

		}

		return caseKey;

	}

	// ___________________________________________________________________________
	/**
	 * Register the claimant for the scenario.
	 */
	protected RegistrationIDDetails registerClaimant() throws AppException,
			InformationalException {

		PersonRegistrationDetails claimantRegistrationDetails = new PersonRegistrationDetails();

		RegistrationIDDetails registrationIDDetails = new RegistrationIDDetails();
		setClaimantRegistrationDetails(claimantRegistrationDetails);

		registrationIDDetails = registerPerson(claimantRegistrationDetails);

		ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		concernRoleKey.concernRoleID = registrationIDDetails.concernRoleID;

		// Get the PDC case id and primary case participant role for that case.
		PDCUtil pdcUtil = PDCUtilFactory.newInstance();
		PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil
				.getPDCCaseIDCaseParticipantRoleID(concernRoleKey);

		createBankAccountEvidence(pdcCaseIDCaseParticipantRoleID.caseID,
				registrationIDDetails.concernRoleID,
				pdcCaseIDCaseParticipantRoleID.caseParticipantRoleID);
		final CaseKey caseKey = new CaseKey();
		caseKey.caseID = pdcCaseIDCaseParticipantRoleID.caseID;
		return registrationIDDetails;
	}

	// ___________________________________________________________________________
	/**
	 * Register a new person
	 * 
	 * @param personRegistrationDetails
	 *            Details of the person to be registered
	 * 
	 * @return The identifiers for the new person
	 */
	protected RegistrationIDDetails registerPerson(
			PersonRegistrationDetails personRegistrationDetails)
			throws AppException, InformationalException {

		// Register the person
		RegistrationIDDetails registrationIDDetails = PersonRegistrationFactory
				.newInstance().registerPerson(personRegistrationDetails);

		// Get the PDC case id and primary case participant role for that case.
		PDCUtil pdcUtil = PDCUtilFactory.newInstance();
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		concernRoleKey.concernRoleID = registrationIDDetails.concernRoleID;
		PDCCaseIDCaseParticipantRoleID pdcCaseIDCaseParticipantRoleID = pdcUtil
				.getPDCCaseIDCaseParticipantRoleID(concernRoleKey);

		final CaseKey caseKey = new CaseKey();
		caseKey.caseID = pdcCaseIDCaseParticipantRoleID.caseID;
		addVerifications(caseKey);

		// Set the unique name of the participant in question
		setUniqueName(personRegistrationDetails.firstForename);

		// Set the date of birth of the participant
		setDateOfBirth(personRegistrationDetails.firstForename,
				personRegistrationDetails.dateOfBirth);

		// Set the participant Role ID
		setParticipantRoleID(personRegistrationDetails.firstForename,
				registrationIDDetails.concernRoleID);

		long concernRoleID = registrationIDDetails.concernRoleID;

		// Create an SSN alternate ID for this participant
		// createSSNAlternateID(concernRoleID,
		// personRegistrationDetails.registrationDate);

		// Return the unique name
		return registrationIDDetails;

	}

	public void createBankAccountEvidence(final long caseID,
			final long concernRoleID, final long caseParticipantRoleID)
			throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "PDC0000257";

		final EvidenceTypeDef evidenceType = etDefDAO
				.readActiveEvidenceTypeDefByTypeCode(eType.evidenceType);

		final EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
				.getActiveEvidenceTypeVersionAtDate(evidenceType,
						Date.getCurrentDate());

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory
				.newInstance(evTypeVersion);

		final DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails
				.getAttribute("participant");
		DynamicEvidenceTypeConverter.setAttribute(participant,
				caseParticipantRoleID);

		final DynamicEvidenceDataAttributeDetails dateOfBirth = dynamicEvidenceDataDetails
				.getAttribute("fromDate");
		DynamicEvidenceTypeConverter.setAttribute(dateOfBirth,
				Date.getCurrentDate());

//		final DynamicEvidenceDataAttributeDetails accountnumber = dynamicEvidenceDataDetails
//				.getAttribute("accountNumber");
//		DynamicEvidenceTypeConverter.setAttribute(accountnumber, "12345");

		final DynamicEvidenceDataAttributeDetails accountName = dynamicEvidenceDataDetails
				.getAttribute("accountName");
		DynamicEvidenceTypeConverter.setAttribute(accountName, "Test");

		final DynamicEvidenceDataAttributeDetails bic = dynamicEvidenceDataDetails
				.getAttribute("bic");
		DynamicEvidenceTypeConverter.setAttribute(bic,
				new CodeTableItem(MOLSABICCODE.TABLENAME,
						MOLSABICCODE.ABQQQAQAXXX));

		final DynamicEvidenceDataAttributeDetails iban = dynamicEvidenceDataDetails
				.getAttribute("iban");
		DynamicEvidenceTypeConverter.setAttribute(iban, "1234ABQQQAQA");

//		final DynamicEvidenceDataAttributeDetails sortCode = dynamicEvidenceDataDetails
//				.getAttribute("sortCode");
//		DynamicEvidenceTypeConverter.setAttribute(sortCode, "90-14-87");

		final DynamicEvidenceDataAttributeDetails accountStatus = dynamicEvidenceDataDetails
				.getAttribute("accountStatus");
		DynamicEvidenceTypeConverter.setAttribute(accountStatus,
				new CodeTableItem(BANKACCOUNTSTATUS.TABLENAME,
						BANKACCOUNTSTATUS.OPEN));

		final DynamicEvidenceDataAttributeDetails accountType = dynamicEvidenceDataDetails
				.getAttribute("accountType");
		DynamicEvidenceTypeConverter.setAttribute(accountType,
				new CodeTableItem(BANKACCOUNTTYPE.TABLENAME,
						BANKACCOUNTTYPE.PERSONALCURR));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = Date.getCurrentDate();
		evidenceDescriptorInsertDtls.caseID = caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * Set the unique name for a given participant. This also creates a new
	 * entry in the participant array list
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 */
	protected void setUniqueName(String uniqueName) throws AppException,
			InformationalException {

		//
		// Assert that the name is unique
		//
		ParticipantTestDetails participantDtls;
		Iterator iterator = participantTestDetailsList.iterator();

		while (iterator.hasNext()) {

			participantDtls = (ParticipantTestDetails) iterator.next();
			assertTrue(!participantDtls.uniqueName.equals(uniqueName));
		}

		//
		// Create a new record on the list and add a unique name
		//
		ParticipantTestDetails participantTestDetails = new ParticipantTestDetails();

		// Assign the unique name
		participantTestDetails.uniqueName = uniqueName;

		// Add the participant details to the list
		participantTestDetailsList.add(participantTestDetails);

	}

	// ___________________________________________________________________________
	/**
	 * Retrieves the details of a case decision
	 * 
	 * @param caseDecisionID
	 *            Identifier for a case decision
	 * 
	 * @return The details of a case decision
	 */
	protected curam.core.struct.GetCaseDecisionDetailsResult retrieveDecisionDetails(
			long caseDecisionID) throws AppException, InformationalException {

		// MaintainCaseDecision manipulation variables
		curam.core.intf.MaintainCaseDecision maintainCaseDecisionObj = curam.core.fact.MaintainCaseDecisionFactory
				.newInstance();
		CaseDecisionIDStruct caseDecisionIDStruct = new CaseDecisionIDStruct();

		// Set key to get decision details
		caseDecisionIDStruct.caseDecisionID = caseDecisionID;

		// Retrieve decision details
		curam.core.struct.GetCaseDecisionDetailsResult getCaseDecisionDetailsResult = maintainCaseDecisionObj
				.getCaseDecisionDetails(caseDecisionIDStruct);

		return getCaseDecisionDetailsResult;

	}

	// ___________________________________________________________________________
	/**
	 * Set the details of the customer to be registered. This must be
	 * implemented by the scenario test class.
	 * 
	 * @param customerRegistrationDetails
	 *            The Person details of the customer.
	 */
	protected abstract void setClaimantRegistrationDetails(
			PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException;

	// ___________________________________________________________________________
	/**
	 * Set the TAM date
	 * 
	 * @param date
	 *            The TAM Date
	 */
	protected void setClaimDate(Date date) {
		claimDate = date;
	}

	// ___________________________________________________________________________

	// ___________________________________________________________________________
	/**
	 * Overrides the current date to be used for the scenario.
	 * 
	 * @param date
	 *            The date that the current date is to be set to.
	 */
	protected void setCurrentDate(Date date) {
		Date.overrideCurrentDate(date);
	}

	// ___________________________________________________________________________
	/**
	 * Overrides the current date to be used for the scenario.
	 * 
	 * @param day
	 *            The day of the month. Starts at 1.
	 * @param month
	 *            The month of the year. Starts at 1.
	 * @param year
	 *            The year
	 */
	protected void setCurrentDate(int day, int month, int year) {
		setCurrentDate(getDate(day, month, year));
	}

	// ___________________________________________________________________________
	/**
	 * Sets the date of birth for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * @param dateOfBirth
	 *            The date of birth of the participant
	 */
	protected void setDateOfBirth(String uniqueName, Date dateOfBirth)
			throws AppException, InformationalException {

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {
			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.uniqueName.equals(uniqueName)) {
				// Create an new instance
				ParticipantTestDetails newParticipantTestDetails = new ParticipantTestDetails();

				// Copy the old details
				newParticipantTestDetails = participantTestDetails;

				// Update the new details with the participant Role ID
				newParticipantTestDetails.dateOfBirth = dateOfBirth;

				// Replace the old object with new one
				participantTestDetailsList.set(i, newParticipantTestDetails);

				break;
			}
		}
	}

	// ___________________________________________________________________________
	/**
	 * Sets the participant role id for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * @param participantRoleID
	 *            The participant Role ID to be associated with the unique name
	 */
	protected void setParticipantRoleID(String uniqueName,
			long participantRoleID) throws AppException, InformationalException {

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {
			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.uniqueName.equals(uniqueName)) {
				// Create an new instance
				ParticipantTestDetails newParticipantTestDetails = new ParticipantTestDetails();

				// Copy the old details
				newParticipantTestDetails = participantTestDetails;

				// Update the new details with the participant Role ID
				newParticipantTestDetails.participantRoleID = participantRoleID;

				// Replace the old object with new one
				participantTestDetailsList.set(i, newParticipantTestDetails);

				break;
			}
		}
	}

	/**
	 * Sets the participant role id for a given participant
	 * 
	 * @param uniqueName
	 *            A unique name to identify the participant
	 * @param participantRoleID
	 *            The participant Role ID to be associated with the unique name
	 */
	protected void setCaseParticipantRoleID(String uniqueName,
			long caseParticipantRoleID) throws AppException,
			InformationalException {

		// Loop through all the participants in the list
		for (int i = 0; i < participantTestDetailsList.size(); i++) {
			ParticipantTestDetails participantTestDetails = (ParticipantTestDetails) participantTestDetailsList
					.get(i);

			// If we find the participant in question
			if (participantTestDetails.uniqueName.equals(uniqueName)) {
				// Create an new instance
				ParticipantTestDetails newParticipantTestDetails = new ParticipantTestDetails();

				// Copy the old details
				newParticipantTestDetails = participantTestDetails;

				// Update the new details with the participant Role ID
				newParticipantTestDetails.caseParticipantRoleID = caseParticipantRoleID;

				// Replace the old object with new one
				participantTestDetailsList.set(i, newParticipantTestDetails);

				break;
			}
		}
	}

	protected void setProductID(long productID) {
		this.productID = productID;
	}

	protected long getProductID() {
		return productID;
	}

	protected void setLiabilityID(long productID) {
		this.liabilityProductID = productID;
	}

	/**
	 * Runs initialization at the start of the test.
	 */
	protected void setUpCuramServerTest() {

		// if (Boolean.valueOf(System.getProperty("isproduct.showgui"))
		// .booleanValue()) {
		// showStartupGui();
		// }

		// determine in which mode to run the test
		if ("quick".equalsIgnoreCase(System.getProperty("isproduct.testmode"))) {
			inStrictTestMode = false;
		} else {
			inStrictTestMode = true;
		}

		// use the getter rather than the variable in case the concrete subclass
		// chooses to override
		boolean overrideStrictTestMode = inStrictTestMode();

		if (!mQuietMode) {
			if (overrideStrictTestMode != inStrictTestMode) {
				System.out.println("  Overriding specified test mode");
			}

			if (overrideStrictTestMode) {
				System.out.println("  Running ISP test in 'strict' mode");
			} else {
				System.out.println("  Running ISP test in 'quick' mode");
			}
		}

	}

	// ___________________________________________________________________________
	/**
	 * Decides whether to commit database updates. Data committed from tests may
	 * be inspected using the online application.
	 * 
	 * @return whether to commit database updates
	 */

	protected boolean shouldCommit() {
		return Boolean.valueOf(System.getProperty("isproduct.commitdata"))
				.booleanValue();

	}

	/**
	 * Shows a GUI enabling the developer to choose options for the test.
	 */
	private void showStartupGui() {
		System.out.println("Displaying startup dialog");

		Properties properties = new Properties();

		final String propertiesPath = System.getProperty("user.home")
				+ "/ISPTestDialog.properties";

		try {
			FileInputStream fis = new FileInputStream(propertiesPath);

			properties.load(fis);
		} catch (FileNotFoundException e) {// ignore - properties file may not
			// exist
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		TestStartupDialog testStartupDialog = new TestStartupDialog(properties);

		String shortClassName = this.getClass().getName();
		final String CURAM_TEST_ISPRODUCT = "curam.test.isproduct.";

		if (shortClassName.startsWith(CURAM_TEST_ISPRODUCT)) {
			shortClassName = shortClassName.substring(CURAM_TEST_ISPRODUCT
					.length());
		}
		testStartupDialog.setTitle(shortClassName);
		testStartupDialog.setModal(true);
		testStartupDialog.show();

		if (testStartupDialog.okPressed()) {
			try {
				FileOutputStream fos = new FileOutputStream(propertiesPath);

				properties
						.store(fos,
								"Stores the settings made by the user in the ISProduct Test Start-up dialog");
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		} else {
			System.out.println("Cancelling test execution");
			fail("Test execution cancelled.");
		}

		System.setProperty("isproduct.commitdata",
				String.valueOf(testStartupDialog.commitData()));
		System.setProperty("isproduct.displayevidence",
				String.valueOf(testStartupDialog.displayEvidence()));
		System.setProperty("isproduct.displaydecisions",
				String.valueOf(testStartupDialog.displayDecisions()));
		System.setProperty("isproduct.testmode",
				testStartupDialog.quickMode() ? "quick" : "strict");

		Configuration.setProperty("curam.trace.rules",
				String.valueOf(testStartupDialog.traceRules()));
		Configuration
				.setProperty("curam.trace", testStartupDialog.traceLevel());

	}

	/**
	 * Runs the test for the specified claim date.
	 * 
	 * @param claimDate
	 *            the date the claim is made on
	 * @param productID
	 *            The internal ID of the product for the program
	 * @return the key to the evidence tree created for claim date evidence
	 */
	protected CaseKey testEligibility(Date claimDate, long productID)
			throws AppException, InformationalException {

		setClaimDate(claimDate);

		setCurrentDate(claimDate);

		setProductID(productID);

		createProductDeliveryInd = true;

		CaseKey caseKey = null;

		// Check the claim date for eligibility and entitlement
		caseKey = checkClaimDate();

		return caseKey;

	}

	/**
	 * Runs the test for the specified claim date.
	 * 
	 * @param claimDate
	 *            the date the claim is made on
	 * @param productID
	 *            The internal ID of the product for the program
	 * @param liabilityID
	 *            The internal ID of the liability product for the program
	 * @return Struct containing case ID of the integrated case created.
	 */
	protected CaseKey testEligibility(Date claimDate, long productID,
			long liabilityID) throws AppException, InformationalException {

		createLiabilityInd = true;
		createProductDeliveryInd = true;

		setClaimDate(claimDate);
		setCurrentDate(claimDate);
		setProductID(productID);
		setLiabilityID(liabilityID);

		CaseKey caseKey = null;

		// Check the claim date for eligibility and entitlement
		caseKey = checkClaimDate();

		return caseKey;

	}

	/**
	 * Runs the test for the specified claim date.
	 * 
	 * @param claimDate
	 *            the date the claim is made on
	 * @return Struct containing case ID of the integrated case created.
	 */
	protected CaseKey testEligibility(Date claimDate) throws AppException,
			InformationalException {

		createLiabilityInd = false;
		createProductDeliveryInd = false;

		setClaimDate(claimDate);
		setCurrentDate(claimDate);
		CaseKey caseKey = null;

		// Check the claim date for eligibility and entitlement
		caseKey = checkClaimDate();

		return caseKey;

	}

	/**
	 * Add all persons to the member group of the additional product delivery.
	 * Members can be add using the addMemberToProductDelivery(String) method
	 * 
	 * @see AbstractMolsaTestBase#addMemberToProductDelivery(String)
	 * @throws AppException
	 * @throws InformationalException
	 */
	public abstract void addMembersToProductDelivery() throws AppException,
			InformationalException;

	/**
	 * Add all persons to the member group of the additional product delivery.
	 * Members can be add using the addMemberToProductDelivery(String) method
	 * 
	 * @see AbstractMolsaTestBase#addMemberToProductDelivery(String)
	 * @throws AppException
	 * @throws InformationalException
	 */
	public void addMembersToAdditionalProductDelivery() throws AppException,
			InformationalException {
	}

	/**
	 * Tests the Scenario. This is overridden by each test subclass.
	 * 
	 */
	public abstract void testScenario() throws AppException,
			InformationalException;

	/**
	 * Sets the participantTestDetails to be the first item in the
	 * participantTestDetailsList.
	 * 
	 */
	public void setCaseParticipantOnList(
			ParticipantTestDetails participantTestDetails) {
		participantTestDetailsList.add(0, participantTestDetails);
	}

	/**
	 * updates the participantTestDetails with the array list list.
	 * 
	 */
	public void updateCaseParticipantList(ArrayList list) {
		participantTestDetailsList = list;
	}

	/**
	 * Perform final steps for this test
	 */
	protected void tearDownCuramServerTest() {
		if (shouldCommit()) {
			commit();
		}
	}

	/**
	 * Create a Integrated Case, add the case evidence and apply changes to the
	 * evidence.
	 * 
	 * @param date
	 * @return Struct containing case ID.
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected CaseKey createIntegratedCase(Date date) throws AppException,
			InformationalException {

		SecurityImplementationFactory.register();
		TransactionInfo.setInformationalManager();

		InformationalManager informationalManager = curam.util.transaction.TransactionInfo
				.getInformationalManager();

		CaseKey caseKey = new CaseKey();

		setClaimDate(date);
		setCurrentDate(date);

		informationalManager
				.acceptWarning(
						CuramConst.gkEmpty,
						new AppException(
								curam.message.BPOMAINTAINCERTIFICATIONASSISTANT.INF_CERTIFICATION_FREQUENCY));

		// Register the customer for the scenario
		RegistrationIDDetails details = new RegistrationIDDetails();
		details = registerClaimant();

		// Set up the integrated case registration details
		final IntegratedCaseRegistrationDetails1 icRegistrationDetails = new IntegratedCaseRegistrationDetails1();
		icRegistrationDetails.primaryClientID = details.concernRoleID;
		icRegistrationDetails.integratedCaseType = PRODUCTCATEGORYEntry.SOCIAL_ASSITANCE
				.getCode();
		icRegistrationDetails.startDate = Date.getCurrentDate().addDays(-10);
		// Assign primaryClientID to caseClientList. This list is used to create
		// the Case Participant Roles.
		icRegistrationDetails.caseClientList = String
				.valueOf(icRegistrationDetails.primaryClientID);

		// Create the integrated case
		final curam.core.struct.IntegratedCaseIDKey integratedCaseIDKey = IntegratedCaseFactory
				.newInstance().createIntegratedCase1(icRegistrationDetails);

		// save integrated case Id for use.
		integratedCaseID = integratedCaseIDKey.caseID;

		// Add case evidence
		caseKey.caseID = integratedCaseIDKey.caseID;
		addEvidence(caseKey);

		// Activate all in edit evidence
		SecurityImplementationFactory.register();
		activateAllChanges();

		return caseKey;
	}

	// ___________________________________________________________________________
	/**
	 * Activate all evidence changes on the integrated case.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected void activateAllChanges() throws AppException,
			InformationalException {

		EvidenceController evidenceControllerObj = EvidenceControllerFactory
				.newInstance();

		CaseKey caseKey = new CaseKey();

		caseKey.caseID = integratedCaseID;

		try {
			// Insert
			curam.core.sl.infrastructure.entity.intf.TemporalEvidenceApprovalCheck temporalEvidenceApprovalCheckObj = TemporalEvidenceApprovalCheckFactory
					.newInstance();
			TemporalEvidenceApprovalCheckDtls tempDtls = new TemporalEvidenceApprovalCheckDtls();

			tempDtls.percentage = 0;
			tempDtls.userName = "molsacaseworker";
			tempDtls.recordStatus = "RST1";
			tempDtls.approvalType = "TEA3";

			temporalEvidenceApprovalCheckObj.insert(tempDtls);

		} catch (AppException e) {
			if (!mQuietMode) {
				e.printStackTrace();
			}
		}

		// Retrieve a list of evidence for apply changes to be parsed
		ECWIPDtls eCWIPDtls = new ECWIPDtls();
		ApplyChangesDetails applyChangesDetails = new ApplyChangesDetails();

		eCWIPDtls = evidenceControllerObj.listWorkInProgress(caseKey);

		// Tab the list of returned work in progress. This is required to apply
		// changes
		// This method takes a string list of evidence details.
		char separator = '|';
		char tabSeparator = '\t';
		StringBuffer strBuf = new StringBuffer();

		for (int i = 0; i < eCWIPDtls.newAndUpdateList.dtls.size(); i++) {

			strBuf.append(
					eCWIPDtls.newAndUpdateList.dtls.item(i).evidenceDescriptorID)
					.append(separator)
					.append(eCWIPDtls.newAndUpdateList.dtls.item(i).evidenceID)
					.append(separator)
					.append(eCWIPDtls.newAndUpdateList.dtls.item(i).evidenceType)
					.append(separator)
					.append(eCWIPDtls.newAndUpdateList.dtls.item(i).correctionSetID)
					.append(separator)
					.append(eCWIPDtls.newAndUpdateList.dtls.item(i).evidenceDescriptorID)
					.append(tabSeparator);

		}
		applyChangesDetails.newAndUpdateList = strBuf.toString();

		evidenceControllerObj.applyChanges(caseKey, applyChangesDetails);
	}

	// ___________________________________________________________________________
	/**
	 * Set the indicator which controls whether a product delivery case should
	 * be created as part of the test case creation functionality.
	 */
	public void setCreateProductDeliveryIndicator(boolean indicator) {
		createProductDeliveryInd = indicator;
	}

	// ___________________________________________________________________________
	/**
	 * Set the indicator which controls whether a liability case should be
	 * created as part of the test case creation functionality.
	 */
	public void setCreateLiabilityIndicator(boolean indicator) {
		createLiabilityInd = indicator;
	}

	// ___________________________________________________________________________
	/**
	 * Creates an alternate ID for a participant of type SSN.
	 * 
	 * @param The
	 *            concernRoleID for the participant.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected void createSSNAlternateID(long concernRoleID,
			Date registrationDate) throws AppException, InformationalException {

		MaintainConcernRoleAltID maintainConcernRoleAltIDObj = MaintainConcernRoleAltIDFactory
				.newInstance();

		MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();
		AlternateIDDetails alternateIDDetails = new AlternateIDDetails();

		UniquePersonID uniquePersonIDObj = UniquePersonIDFactory.newInstance();

		maintainConcernRoleAltIDKey.concernRoleID = concernRoleID;
		alternateIDDetails.concernRoleID = concernRoleID;
		alternateIDDetails.alternateID = uniquePersonIDObj.getNextPersonID()
				+ "1";
		alternateIDDetails.startDate = registrationDate;
		alternateIDDetails.typeCode = curam.codetable.CONCERNROLEALTERNATEID.INSURANCENUMBER;

		maintainConcernRoleAltIDObj.createAlternateID(
				maintainConcernRoleAltIDKey, alternateIDDetails);

	}

	/***
	 * Adds the case members into application.
	 * 
	 * @param applicationCaseID
	 * @param members
	 * @return Map<ConcernRoleID, CaseParticipantID>
	 * @throws AppException
	 * @throws InformationalException
	 */
	public void registerPersonAndAddToCase(final long caseID,
			PersonRegistrationDetails personRegistrationDetails,
			final String uniqueName) throws AppException,
			InformationalException {

		CaseKey caseKey = new CaseKey();
		caseKey.caseID = caseID;
		addVerifications(caseKey);
		RegistrationIDDetails registrationIDDetails = this
				.registerPerson(personRegistrationDetails);

		final AddClientRoleDetails caseMemberDetails = new AddClientRoleDetails();
		caseMemberDetails.caseID = caseID;
		caseMemberDetails.concernRoleID = registrationIDDetails.concernRoleID;
		caseMemberDetails.startDate = Date.getCurrentDate();
		Case caseObj = CaseFactory.newInstance();
		caseObj.createCaseMember(caseMemberDetails);
		CaseHeader caseHeader = caseHeaderDAO.get(caseID);

		List<CaseParticipantRole> caseParticipantDetails = caseParticipantRoleDAO
				.listActiveMembersByCase(caseHeader);
		for (Iterator iterator = caseParticipantDetails.iterator(); iterator
				.hasNext();) {
			CaseParticipantRole caseParticipantRole = (CaseParticipantRole) iterator
					.next();
			if (caseParticipantRole.getConcernRole().getID() == registrationIDDetails.concernRoleID) {
				setCaseParticipantRoleID(uniqueName,
						caseParticipantRole.getID());

			}

		}

	}

	/**
	 * Add verifications for the case.
	 * 
	 * @param caseKey
	 * @throws AppException
	 * @throws InformationalException
	 */
	public void addVerifications(final CaseKey caseKey) throws AppException,
			InformationalException {

		final VerificationApplication verificationApplicationObj = VerificationApplicationFactory
				.newInstance();

		CaseEvidenceVerificationDisplayDetailsList caseEvidenceVerificationDisplayDetailsList = verificationApplicationObj
				.listCaseEvidenceOutstandingVerificationDetails(caseKey);

		for (CaseEvidenceVerificationDisplayDetails caseEvidenceVerificationDisplayDetails : caseEvidenceVerificationDisplayDetailsList.list) {

			CreateVerificaitonItemProvidedDetails details = new CreateVerificaitonItemProvidedDetails();

			details.dtls.itemDtls.caseID = caseKey.caseID;
			details.dtls.itemDtls.caseParticipantConcernRoleID = caseEvidenceVerificationDisplayDetails.concernRoleID;

			details.dtls.createDtls.dateReceived = Date.getCurrentDate();
			details.dtls.createDtls.VDIEDLinkID = caseEvidenceVerificationDisplayDetails.vDIEDLinkID;

			final VDIEDLinkKey vDIEDLinkKey = new VDIEDLinkKey();
			vDIEDLinkKey.dtls.VDIEDLinkID = caseEvidenceVerificationDisplayDetails.vDIEDLinkID;

			final ListVerificationItemNameAndLevelDetails listVerificationItemNameAndLevelDetails = verificationApplicationObj
					.readAllActiveVerificationItemNameAndLevel(vDIEDLinkKey);

			details.dtls.createDtls.verificationItemUtilizationID = listVerificationItemNameAndLevelDetails.listDtls.dtls
					.get(0).code;

			VerificationItemProvided verificationItemProvided = VerificationItemProvidedFactory
					.newInstance();

			verificationItemProvided
					.createVerificationItemProvided(details.dtls);

		}

		TransactionInfo.setInformationalManager();

	}

	/**
	 * Will be called before the creation of Product Delivery cases.Can be used
	 * for generic Assertion.
	 * 
	 * @param caseKey
	 *            Contains caseID.
	 * 
	 */
	protected abstract void preAssertionOnCase(CaseKey caseKey)
			throws AppException, InformationalException;

	/**
	 * Called after the creation of Product Delivery cases. Can be used for
	 * generic Assertion.
	 * 
	 * @param caseKey
	 *            Contains caseID.
	 * 
	 */
	protected abstract void postAssertionOnCase(CaseKey caseKey)
			throws AppException, InformationalException;

}
