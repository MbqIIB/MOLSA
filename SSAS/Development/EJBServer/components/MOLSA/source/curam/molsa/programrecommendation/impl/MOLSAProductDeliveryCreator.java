package curam.molsa.programrecommendation.impl;

import java.util.List;
import java.util.Map;

import com.google.inject.Inject;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CURRENCY;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.VERIFICATIONSTATUS;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.facade.struct.ListClientRoleKey;
import curam.core.facade.struct.ListPDClientRoleDetails;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.CreateProductDeliveryFactory;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.entity.struct.CaseParticipantRole_eoFullDetails;
import curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.struct.CaseIDAndStatuses;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorIDRelatedIDAndEvidenceType;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKey;
import curam.core.sl.infrastructure.entity.struct.ReadEvidenceTypeParticipantDetailsList;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.impl.EvidenceVerificationImpl;
import curam.core.sl.struct.CaseParticipantRoleDetails;
import curam.core.sl.struct.RedetermineTranslatorStruct;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.ConcernRoleID;
import curam.core.struct.ConcernRoleIDList;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.IntegratedCaseKey;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.ProductDeliveryTypeDetails;
import curam.core.struct.ProductProviderDetails;
import curam.core.struct.RegisterProductDeliveryDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.creoleprogramrecommendation.impl.DeliveryCreator;
import curam.creoleprogramrecommendation.impl.Member;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.message.ENTVERIFICATIONCONTROLLER;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.verification.impl.VerificationUtilities;
import curam.verification.sl.entity.fact.VerifiableDataItemFactory;
import curam.verification.sl.entity.fact.VerificationRequirementFactory;
import curam.verification.sl.entity.intf.VerifiableDataItem;
import curam.verification.sl.entity.struct.ReadReqUsageRelatedItemType;
import curam.verification.sl.entity.struct.VerifiableDataItemDetails;
import curam.verification.sl.entity.struct.VerifiableDataItemDtls;
import curam.verification.sl.entity.struct.VerifiableDataItemKey;
import curam.verification.sl.entity.struct.VerificationRequirementKey;
import curam.verification.sl.entity.struct.VerificationRequirementKeyList;
import curam.verification.sl.infrastructure.entity.fact.VDIEDLinkFactory;
import curam.verification.sl.infrastructure.entity.intf.VDIEDLink;
import curam.verification.sl.infrastructure.entity.intf.Verification;
import curam.verification.sl.infrastructure.entity.struct.ReadByVDIEDLinkAndVerLinkedIDTypeKey;
import curam.verification.sl.infrastructure.entity.struct.VDIEDLinkDtls;
import curam.verification.sl.infrastructure.entity.struct.VDIEDLinkIDAndDataItemIDDetailsList;
import curam.verification.sl.infrastructure.entity.struct.VDIEDLinkKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationKey;
import curam.verification.sl.infrastructure.entity.struct.VerificationRequirementIDStatusDetailsList;
import curam.verification.sl.infrastructure.fact.VerificationFactory;
import curam.verification.sl.infrastructure.impl.ConditionalVerificationRulesInvoker;
import curam.verification.sl.infrastructure.impl.VerificationController;
import curam.verification.sl.infrastructure.struct.ContainsInd;
import curam.verification.sl.infrastructure.struct.ErrorMessageDetails;
import curam.verification.sl.infrastructure.struct.ParticipantIDVerifiableDataItemIDKey;
import curam.verification.sl.infrastructure.struct.RequirementUsageDetails;
import curam.verification.sl.infrastructure.struct.RequirementUsageDetailsList;
import curam.verification.sl.infrastructure.struct.VerifiableDataItemAndRequirementIDDetails;
import curam.verification.sl.infrastructure.struct.VerificationICTypeAndRelatedItemDetails;

/**
 * Contains processing to create {@link ProductDelivery} are part of
 * {@link SimulatedDetermination}.
 * 
 * 
 */
public class MOLSAProductDeliveryCreator implements DeliveryCreator {

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	@Inject
	private Map<PRODUCTTYPEEntry, MOLSARegisterProductDeliveryKey> registerProductDelivery;
	@Inject
	private ProductDAO productDAO;

	@Inject
	private CaseParticipantRoleDAO caseParticipantRoleDAO;

	@Inject
	private EvidenceVerificationImpl evidenceVerificationImpl;

	@Inject
	private VerificationController verificationController;

	VerificationUtilities verificationUtilities = new VerificationUtilities();

	/**
	 * Default
	 */
	public MOLSAProductDeliveryCreator() {

		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * Creates {@link ProductDelivery} and submits the Product for approval if
	 * not outstanding verification.
	 */
	public CaseHeader create(SimulatedDetermination simulatedDetermination)
			throws AppException, InformationalException {

		MOLSARegisterProductDeliveryKey productDeliveryKey;

		productDeliveryKey = registerProductDelivery.get(productDAO.get(
				simulatedDetermination.productID()).getProductType());

		RegisterProductDeliveryKey registerProductDeliveryKey = productDeliveryKey
				.registerProductDeliveryKey(simulatedDetermination);

		registerProductDeliveryKey.caseStartDate = simulatedDetermination
				.getDateRange().start();

		RegisterProductDeliveryDetails registerProductDeliveryDetails = registerProductDeliveryDetails(simulatedDetermination
				.getIntegratedCase());

		ProductDelivery productDelivery = createSocialAssistanceProductDelivery(
				registerProductDeliveryKey, registerProductDeliveryDetails);

		createCaseMembers(simulatedDetermination.getMembers(),
				registerProductDeliveryDetails.caseID,
				registerProductDeliveryKey.clientID, simulatedDetermination
						.getIntegratedCase().getID());

		return productDelivery;
	}

	/**
	 * Submits the ProductDelivery for approval.
	 * 
	 * @param productDelivery
	 *            The product delivery case submitted for approval
	 * @throws AppException
	 * @throws InformationalException
	 */
	private void submitForApproval(ProductDelivery productDelivery)
			throws AppException, InformationalException {
		curam.core.facade.struct.SubmitForApprovalKey submitForApprovalKey = new curam.core.facade.struct.SubmitForApprovalKey();
		submitForApprovalKey.caseID = ((Long) productDelivery.getID())
				.longValue();
		MOLSAProductDeliveryFactory.newInstance().submitPDCForApproval(
				submitForApprovalKey);
	}

	/**
	 * Checks if outstanding verification exists for the Product Delivery.
	 * 
	 * @param productDelivery
	 *            The Product Delivery Case.
	 * 
	 * @return Boolean based on whether outstanding verification exists.
	 * @throws AppException
	 * @throws InformationalException
	 */
	private boolean outstandingVerificationsExist(
			ProductDelivery productDelivery) throws AppException,
			InformationalException {
		CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
		caseKeyStruct.caseID = ((Long) productDelivery.getID()).longValue();
		return (VerificationFactory.newInstance()
				.listPDOutstandingCaseVerificationDetails(caseKeyStruct).dtls
				.size() > 0);
	}

	/**
	 * Returns the Product Delivery Key required for product delivery creation.
	 * Based on the age, the senior member would be selected as primary
	 * applicant of the case.
	 * 
	 * @param simulatedDetermination
	 *            Simulated Determination
	 * 
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	private RegisterProductDeliveryKey registerProductDeliveryKey(
			SimulatedDetermination simulatedDetermination) throws AppException,
			InformationalException {

		RegisterProductDeliveryKey registerProductDeliveryKey = new RegisterProductDeliveryKey();
		registerProductDeliveryKey.clientID = simulatedDetermination
				.getIntegratedCase().getConcernRole().getID();

		registerProductDeliveryKey.productID = simulatedDetermination
				.productID();
		registerProductDeliveryKey.receivedDate = Date.getCurrentDate();
		registerProductDeliveryKey.currencyType = CURRENCY.DEFAULTCODE;
		registerProductDeliveryKey.integratedCaseID = ((Long) simulatedDetermination
				.getIntegratedCase().getID()).longValue();

		GetProductProviderDetailsResult getProductProviderDetailsResult = productProviderDetailsResult(simulatedDetermination);

		registerProductDeliveryKey.productProviderID = ((ProductProviderDetails) getProductProviderDetailsResult.productProvidersDetailsList.dtls
				.get(0)).productProviderID;

		registerProductDeliveryKey.providerLocationID = ((ProductProviderDetails) getProductProviderDetailsResult.productProvidersDetailsList.dtls
				.get(0)).providerLocationID;

		registerProductDeliveryKey.productDeliveryPatternID = productDeliveryPatternInfoDetails(simulatedDetermination).productDeliveryPatternID;

		return registerProductDeliveryKey;
	}

	/**
	 * Returns the Product provider details based on the simulated
	 * determination.
	 * 
	 * @param simulatedDetermination
	 *            Simulated Determination
	 * @return The Product Provider details.
	 * @throws AppException
	 * @throws InformationalException
	 */
	private GetProductProviderDetailsResult productProviderDetailsResult(
			SimulatedDetermination simulatedDetermination) throws AppException,
			InformationalException {
		GetProductProviderKey getProductProviderKey = new GetProductProviderKey();
		getProductProviderKey.productID = simulatedDetermination.productID();
		GetProductProviderDetailsResult getProductProviderDetailsResult = CreateProductDeliveryFactory
				.newInstance().getProductProviderDetails(getProductProviderKey);

		return getProductProviderDetailsResult;
	}

	/**
	 * Returns the Product Delivery pattern information based on the simulated
	 * determination.
	 * 
	 * @param simulatedDetermination
	 *            Simulated Determination
	 * @return The product delivery pattern info.
	 * @throws AppException
	 * @throws InformationalException
	 */
	private ProductDeliveryPatternInfoDetails productDeliveryPatternInfoDetails(
			SimulatedDetermination simulatedDetermination) throws AppException,
			InformationalException {
		AdminPDPIByProdIDAndDateKey adminPDPIByProdIDAndDateKey = new AdminPDPIByProdIDAndDateKey();
		adminPDPIByProdIDAndDateKey.productID = simulatedDetermination
				.productID();
		adminPDPIByProdIDAndDateKey.effectiveDate = Date.getCurrentDate();
		ProductDeliveryPatternInfoDetails productDeliveryPatternInfoDetails = AdminProductDeliveryPatternInfoFactory
				.newInstance().getDefaultByProductIDAndDate(
						adminPDPIByProdIDAndDateKey);

		return productDeliveryPatternInfoDetails;
	}

	/**
	 * Returns the Product Delivery details struct with the details required for
	 * registration.
	 * 
	 * @param integratedCase
	 *            The integrated case
	 * @return The Poduct delivery details struct.
	 */
	private RegisterProductDeliveryDetails registerProductDeliveryDetails(
			IntegratedCase integratedCase) {
		RegisterProductDeliveryDetails registerProductDeliveryDetails = new RegisterProductDeliveryDetails();
		registerProductDeliveryDetails.integratedCaseInd = true;
		registerProductDeliveryDetails.integratedCaseID = ((Long) integratedCase
				.getID()).longValue();

		return registerProductDeliveryDetails;
	}

	/**
	 * Registers a product delivery case.
	 * 
	 * @param registerProductDeliveryKey
	 *            Product delivery key
	 * @param registerProductDeliveryDetails
	 *            Product delivery details
	 * @return The Product Delivery
	 * @throws AppException
	 * @throws InformationalException
	 */
	private ProductDelivery createSocialAssistanceProductDelivery(
			RegisterProductDeliveryKey registerProductDeliveryKey,
			RegisterProductDeliveryDetails registerProductDeliveryDetails)
			throws AppException, InformationalException {
		RegisterProductDeliveryDetails productDeliveryDetails = CreateProductDeliveryFactory
				.newInstance().registerProductDelivery(
						registerProductDeliveryKey,
						registerProductDeliveryDetails);

		ProductDelivery productDelivery = (ProductDelivery) this.productDeliveryDAO
				.get(Long.valueOf(productDeliveryDetails.caseID));

		return productDelivery;
	}

	private void createCaseMembers(List<Member> members, long caseID,
			long primaryConcernRoleID, long iCCaseId) throws AppException,
			InformationalException {
		curam.core.sl.intf.CaseParticipantRole caseParticipantRole_boObj = curam.core.sl.fact.CaseParticipantRoleFactory
				.newInstance();
		CaseParticipantRoleDetails caseParticipantRoleDetails = new CaseParticipantRoleDetails();

		RedetermineTranslatorStruct redetermineTranslatorStruct = new RedetermineTranslatorStruct();
		curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.fact.CaseParticipantRoleFactory
				.newInstance();
		caseParticipantRoleDetails.dtls.caseID = caseID;
		long concernRoleID = 0l;
		for (Member member : members) {
			concernRoleID = caseParticipantRoleDAO
					.get(member.caseParticipantRoleID()).getConcernRole()
					.getID();
			if (concernRoleID != primaryConcernRoleID) {
				caseParticipantRoleDetails.dtls.participantRoleID = caseParticipantRoleDAO
						.get(member.caseParticipantRoleID()).getConcernRole()
						.getID();
				caseParticipantRoleDetails.dtls.fromDate = Date
						.getCurrentDate();
				if (member.startDate() != null) {
					caseParticipantRoleDetails.dtls.fromDate = member
							.startDate();
				}
				if (caseParticipantRoleDetails.dtls.typeCode != CASEPARTICIPANTROLETYPE.MEMBER) {
					caseParticipantRoleDetails.dtls.typeCode = CASEPARTICIPANTROLETYPE.MEMBER;
				}

				caseParticipantRole_boObj
						.insertCaseParticipantRole(caseParticipantRoleDetails);

			}
		}
		IntegratedCaseKey iCCaseKey = new IntegratedCaseKey();
		iCCaseKey.integratedCaseID = iCCaseId;
		ProductDeliveryKey pdKey = new ProductDeliveryKey();
		pdKey.caseID = caseParticipantRoleDetails.dtls.caseID;

		createVerifications(iCCaseKey, pdKey, primaryConcernRoleID);
	}

	@SuppressWarnings("restriction")
	public void createVerifications(final IntegratedCaseKey ICCaseKey,
			final ProductDeliveryKey pdKey, long primaryConcernRoleID)
			throws AppException, InformationalException {

		// EvidenceDescriptor variables
		ReadEvidenceTypeParticipantDetailsList evidTypeParticipantDetailsList = new ReadEvidenceTypeParticipantDetailsList();
		final ReadEvidenceTypeParticipantDetailsList filteredList = new ReadEvidenceTypeParticipantDetailsList();
		final EvidenceDescriptorKey evidenceDescriptorKey = new EvidenceDescriptorKey();
		final EvidenceDescriptor evidenceDescriptor = curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory
				.newInstance();

		// VDIEDLink variables
		final VDIEDLink vDIEDLink = VDIEDLinkFactory.newInstance();
		VDIEDLinkIDAndDataItemIDDetailsList vDIEDLinkIDAndDataItemIDDetailsList = new VDIEDLinkIDAndDataItemIDDetailsList();
		final Verification verification = curam.verification.sl.infrastructure.entity.fact.VerificationFactory
				.newInstance();
		VerificationRequirementIDStatusDetailsList verificationRequirementIDStatusDetailsList = new VerificationRequirementIDStatusDetailsList();

		// Verification Requirement variables
		VerificationRequirementKey verificationRequirementKey = new VerificationRequirementKey();

		ContainsInd containsInd;

		VerificationRequirementKeyList verificationRequirementKeyList = new VerificationRequirementKeyList();
		final curam.verification.sl.entity.intf.VerificationRequirement verificationRequirement = VerificationRequirementFactory
				.newInstance();

		// VerifiableDataItem variables
		final VerifiableDataItem verifiableDataItem = VerifiableDataItemFactory
				.newInstance();
		final VerifiableDataItemKey verifiableDataItemKey = new VerifiableDataItemKey();
		VerifiableDataItemDetails verifiableDataItemDetails = new VerifiableDataItemDetails();
		final VDIEDLinkKey vDIEDLinkKey = new VDIEDLinkKey();
		final RequirementUsageDetailsList requirementUsageDetailsList = new RequirementUsageDetailsList();

		final CaseIDAndStatuses caseIDAndStatus = new CaseIDAndStatuses();

		caseIDAndStatus.statusCode1 = EVIDENCEDESCRIPTORSTATUS.SUPERSEDED;
		caseIDAndStatus.statusCode2 = EVIDENCEDESCRIPTORSTATUS.CANCELED;
		caseIDAndStatus.caseID = ICCaseKey.integratedCaseID;
		evidTypeParticipantDetailsList = evidenceDescriptor
				.searchEvidenceDetailsByCaseIDAndStatuses(caseIDAndStatus);

		final ListPDClientRoleDetails listPDClientRoleDetails = listCaseMembers(pdKey.caseID);

		// loop through evidence list - if participant evidence continue to next
		// item in list - do not continue further processing
		// if temporal evidence continue processing and create verification
		// details
		for (int m = 0; m < evidTypeParticipantDetailsList.dtls.size(); m++) {

			final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
					.newInstance();

			// populate EvidenceDescriptorIDRelatedIDAndEvidenceType
			final EvidenceDescriptorIDRelatedIDAndEvidenceType evidenceDescriptorIDRelatedIDAndEvidenceType = new EvidenceDescriptorIDRelatedIDAndEvidenceType();

			evidenceDescriptorIDRelatedIDAndEvidenceType.evidenceType = evidTypeParticipantDetailsList.dtls
					.item(m).evidenceType;
			evidenceDescriptorIDRelatedIDAndEvidenceType.evidenceDescriptorID = evidTypeParticipantDetailsList.dtls
					.item(m).evidenceDescriptorID;

			final boolean isEvidenceParticpantDataParticipantEDOnly = evidenceControllerObj
					.isNonCaseEDForParticipantEvidence(evidenceDescriptorIDRelatedIDAndEvidenceType);

			if (isEvidenceParticpantDataParticipantEDOnly) {
				continue;
			}

			// Verification Requirement Usage details
			final curam.verification.sl.entity.intf.VerificationRequirementUsage verificationRequirementUsage = curam.verification.sl.entity.fact.VerificationRequirementUsageFactory
					.newInstance();
			final ReadReqUsageRelatedItemType readReqUsageRelatedItemType = new ReadReqUsageRelatedItemType();

			final curam.core.intf.ProductDelivery productDelivery = curam.core.fact.ProductDeliveryFactory
					.newInstance();
			final curam.core.struct.ProductDeliveryTypeDetails productDeliveryTypeDetails = new ProductDeliveryTypeDetails();

			productDeliveryTypeDetails.productType = productDelivery
					.readProductType(pdKey).productType;

			curam.core.struct.CaseKey caseKey = new curam.core.struct.CaseKey();

			caseKey.caseID = pdKey.caseID;
			readReqUsageRelatedItemType.relatedItemType = verificationUtilities
					.getRelatedItemTypeCode(caseKey);

			verificationRequirementKeyList = verificationRequirementUsage
					.readRequirementDetailsByRelatedItemType(readReqUsageRelatedItemType);

			for (int i = 0; i < verificationRequirementKeyList.dtls.size(); i++) {

				final RequirementUsageDetails requirementUsageDetails = new RequirementUsageDetails();

				verificationRequirementKey = verificationRequirementKeyList.dtls
						.item(i);

				requirementUsageDetails.verificationRequirementID = verificationRequirementKeyList.dtls
						.item(i).verificationRequirementID;
				verifiableDataItemDetails = verificationRequirement
						.readVerifiableDataItemDetails(verificationRequirementKey);

				requirementUsageDetails.verifiableDataItemID = verifiableDataItemDetails.verifiableDataItemID;
				requirementUsageDetails.verifiableDataItemName = verifiableDataItemDetails.verifiableDataItemName;
				requirementUsageDetails.evidenceType = verifiableDataItemDetails.evidenceType;

				requirementUsageDetailsList.dtls
						.addRef(requirementUsageDetails);
			}

			// filter the evidence descriptor list

			boolean evidenceTypeFound = false;

			for (int i = 0; i < evidTypeParticipantDetailsList.dtls.size(); i++) {
				evidenceTypeFound = false;
				for (int j = 0; j < requirementUsageDetailsList.dtls.size(); j++) {
					if (evidTypeParticipantDetailsList.dtls.item(i).evidenceType
							.equals(requirementUsageDetailsList.dtls.item(j).evidenceType)) {
						evidenceTypeFound = true;
						break;
					}
				}
				if (evidenceTypeFound
						// BEGIN, CR00414065, RD
						&& isEvidenceDescriptorRelatedToCaseMember(
								listPDClientRoleDetails,
								evidTypeParticipantDetailsList.dtls.item(i).participantID)) {
					// END, CR00414065
					filteredList.dtls
							.addRef(evidTypeParticipantDetailsList.dtls.item(i));
				}
			}

			// Participant ID and VerifiableDataItem Key to buildErrorMessage
			final ParticipantIDVerifiableDataItemIDKey participantIDVerifiableDataItemIDKey = new ParticipantIDVerifiableDataItemIDKey();

			final VerificationICTypeAndRelatedItemDetails verificationICTypeAndRelatedItemDetails = new VerificationICTypeAndRelatedItemDetails();

			// Read based on vdiedLinkID, verificationLinkedID &
			// verificaitonLinkedType
			final ReadByVDIEDLinkAndVerLinkedIDTypeKey readByVDIEDLinkAndVerLinkedIDTypeKey = new ReadByVDIEDLinkAndVerLinkedIDTypeKey();

			for (int i = 0; i < filteredList.dtls.size(); i++) {

				evidenceDescriptorKey.evidenceDescriptorID = filteredList.dtls
						.item(i).evidenceDescriptorID;
				vDIEDLinkIDAndDataItemIDDetailsList = vDIEDLink
						.readByEvidenceDescriptorID(evidenceDescriptorKey);

				if (vDIEDLinkIDAndDataItemIDDetailsList.dtls.size() == 0) {
					// insert Verification details
					if (filteredList.dtls.item(i).participantID != primaryConcernRoleID) {
						verificationController
								.insertVerification(evidenceDescriptorKey);
					}

				}

				for (int j = 0; j < vDIEDLinkIDAndDataItemIDDetailsList.dtls
						.size(); j++) {

					vDIEDLinkKey.VDIEDLinkID = vDIEDLinkIDAndDataItemIDDetailsList.dtls
							.item(j).vDIEDLinkID;
					readByVDIEDLinkAndVerLinkedIDTypeKey.VDIEDLinkID = vDIEDLinkIDAndDataItemIDDetailsList.dtls
							.item(j).vDIEDLinkID;
					readByVDIEDLinkAndVerLinkedIDTypeKey.verificationLinkedID = pdKey.caseID;
					// Searching based on Product delivery key so set the
					// verificationLinkedType to product delivery
					readByVDIEDLinkAndVerLinkedIDTypeKey.verificationLinkedType = verificationUtilities
							.getRelatedItemTypeCode(caseKey);

					verificationRequirementIDStatusDetailsList = verification
							.searchReqIDAndVerStatusByVDIEDLinkIDVerLinkedIDAndType(readByVDIEDLinkAndVerLinkedIDTypeKey);

					for (int k = 0; k < requirementUsageDetailsList.dtls.size(); k++) {

						if (filteredList.dtls.item(i).evidenceType
								.equals(requirementUsageDetailsList.dtls
										.item(k).evidenceType)
								&& vDIEDLinkIDAndDataItemIDDetailsList.dtls
										.item(j).verifiableDataItemID == requirementUsageDetailsList.dtls
										.item(k).verifiableDataItemID) {

							verificationRequirementKey.verificationRequirementID = requirementUsageDetailsList.dtls
									.item(k).verificationRequirementID;

							boolean buildMessage = false;

							containsInd = verificationController
									.containsRequirement(
											verificationRequirementIDStatusDetailsList,
											verificationRequirementKey);

							if (!containsInd.contains) {

								// insert verification to Verification table
								final EvidenceDescriptorDtls evidenceDescriptorDtls = evidenceDescriptor
										.read(evidenceDescriptorKey);
								final VDIEDLinkDtls vdIEDLinkDtls = vDIEDLink
										.read(vDIEDLinkKey);

								verifiableDataItemKey.verifiableDataItemID = vdIEDLinkDtls.verifiableDataItemID;

								final VerifiableDataItemDtls verifiableDataItemDtls = verifiableDataItem
										.read(verifiableDataItemKey);

								verificationICTypeAndRelatedItemDetails.relatedItemID = verificationUtilities
										.getRelatedItemID(caseKey).getCode();

								verificationICTypeAndRelatedItemDetails.relatedItemType = verificationUtilities
										.getRelatedItemTypeCode(caseKey);

								evidenceDescriptorDtls.caseID = pdKey.caseID;

								final VerifiableDataItemAndRequirementIDDetails verifiableDataItemAndRequirementIDDetails = new VerifiableDataItemAndRequirementIDDetails();

								verifiableDataItemAndRequirementIDDetails.verifiableDataItemID = verifiableDataItemDtls.verifiableDataItemID;
								verifiableDataItemAndRequirementIDDetails.verificationRequirementID = requirementUsageDetailsList.dtls
										.item(k).verificationRequirementID;

								final boolean conditionalVerificationApplicable = isConditionalVerificationApplicable(
										verifiableDataItemAndRequirementIDDetails.verificationRequirementID,
										verifiableDataItemDtls.verifiableDataItemID,
										evidenceDescriptorDtls);

								if (!conditionalVerificationApplicable) {
									continue;
								}

								VerificationKey verificationKey = new VerificationKey();
								if (evidenceDescriptorDtls.participantID != primaryConcernRoleID) {

									verificationKey = verificationController
											.insertVerification(
													evidenceDescriptorDtls,
													verifiableDataItemAndRequirementIDDetails,
													vdIEDLinkDtls,
													verificationICTypeAndRelatedItemDetails);

									final curam.verification.sl.infrastructure.intf.Verification verificationObj = curam.verification.sl.infrastructure.fact.VerificationFactory
											.newInstance();

									verificationObj
											.determineVerificationStatus(vDIEDLinkKey);

									if (verification
											.readVerificationStatus(verificationKey).verificationStatus
											.equals(VERIFICATIONSTATUS.NOTVERIFIED)) {
										buildMessage = true;
									}

									buildMessage = true;
								}

							}

							if (containsInd.verificationStatus
									.equals(VERIFICATIONSTATUS.NOTVERIFIED)
									|| buildMessage) {

								participantIDVerifiableDataItemIDKey.participantID = filteredList.dtls
										.item(i).participantID;
								participantIDVerifiableDataItemIDKey.verifiableDataItemID = vDIEDLinkIDAndDataItemIDDetailsList.dtls
										.item(j).verifiableDataItemID;
								final ErrorMessageDetails errorMessageDetails = verificationController
										.buildMessage(participantIDVerifiableDataItemIDKey);
								final StringBuffer errMessage = new StringBuffer(
										errorMessageDetails.errorMessage);

								final curam.util.message.CatEntry catEntry = ENTVERIFICATIONCONTROLLER.ERR_VERIFICATIONCONTROLLER_DATA_ITEMS_REQUIRE_VERIFICATION_INFORMATIONAL;

								verificationController.createInformational(
										catEntry, errMessage);

							}
						}
					} // for loop k
				} // for loop j
			} // for loop i

			// insert verification details for evidence records
			// that did not have verification records

			caseIDAndStatus.caseID = pdKey.caseID;
			evidTypeParticipantDetailsList = evidenceDescriptor
					.searchEvidenceDetailsByCaseIDAndStatuses(caseIDAndStatus);

			for (int i = 0; i < evidTypeParticipantDetailsList.dtls.size(); i++) {

				evidenceTypeFound = false;
				for (int j = 0; j < requirementUsageDetailsList.dtls.size(); j++) {

					if (evidTypeParticipantDetailsList.dtls.item(i).evidenceType
							.equals(requirementUsageDetailsList.dtls.item(j).evidenceType)) {
						evidenceTypeFound = true;
						break;
					}
				}

				if (!evidenceTypeFound) { // insert verification details
					evidenceDescriptorKey.evidenceDescriptorID = // BEGIN,

					evidTypeParticipantDetailsList.dtls.item(i).evidenceDescriptorID;

					if (evidTypeParticipantDetailsList.dtls.item(i).participantID != primaryConcernRoleID) {
						verificationController
								.insertVerification(evidenceDescriptorKey);
					}

				}
			}
		}
	}

	/**
	 * Retrieves the list of case members for a case.
	 * 
	 * @param caseID
	 *            The unique identifier of a case.
	 * @return The case members of the case.
	 * @throws AppException
	 *             Generic Exception Signature
	 * @throws InformationalException
	 *             Generic Exception Signature
	 */
	@SuppressWarnings("restriction")
	protected ListPDClientRoleDetails listCaseMembers(final long caseID)
			throws AppException, InformationalException {
		final ListClientRoleKey listClientRoleKey = new ListClientRoleKey();

		listClientRoleKey.caseID = caseID;

		final ListPDClientRoleDetails listPDClientRoleDetails = filterOnlyCaseMembers(curam.core.facade.fact.ProductDeliveryFactory
				.newInstance().listClientRole(listClientRoleKey));

		// Get all the other members in the case who are not members and who is
		// not primary client.
		curam.core.struct.CaseKey caseKey = new curam.core.struct.CaseKey();

		caseKey.caseID = caseID;
		ConcernRoleIDList concernRoleIDList = verificationUtilities
				.getAdditionalCaseParticipants(caseKey);

		for (ConcernRoleID concernRoleID : concernRoleIDList.dtls.items()) {
			CaseParticipantRole_eoFullDetails caseParticipantRole_eoFullDetails = new CaseParticipantRole_eoFullDetails();

			caseParticipantRole_eoFullDetails.participantRoleID = concernRoleID.concernRoleID;
			listPDClientRoleDetails.caseParticipantRoleList
					.addRef(caseParticipantRole_eoFullDetails);
		}

		return listPDClientRoleDetails;
	}

	/**
	 * Checks whether the participant who is part of the evidence belongs to
	 * case.
	 * 
	 * @param listICClientRoleDetails1
	 *            The list of case members.
	 * @param evidenceDescriptorParticipantRoleID
	 *            The participant role ID for whom the evidence is added.
	 * @return True or False corresponding on whether the participant is a case
	 *         member or not.
	 */
	protected boolean isEvidenceDescriptorRelatedToCaseMember(
			ListPDClientRoleDetails listPDClientRoleDetails,
			long evidenceDescriptorParticipantRoleID) {

		boolean isEvidenceDescriptorRelatedToCaseMember = false;

		for (CaseParticipantRole_eoFullDetails caseParticipantRole_eoFullDetails : listPDClientRoleDetails.caseParticipantRoleList
				.items()) {
			if (caseParticipantRole_eoFullDetails.participantRoleID == evidenceDescriptorParticipantRoleID) {
				isEvidenceDescriptorRelatedToCaseMember = true;
				break;
			}

		}
		return isEvidenceDescriptorRelatedToCaseMember;
	}

	/**
	 * Returns <CODE>TRUE</CODE> if conditional verification is applicable for
	 * the given verification requirement. Else, <CODE>FALSE</CODE> is returned.
	 * 
	 * @param evidenceDescriptorDtls
	 */
	private boolean isConditionalVerificationApplicable(
			final long verificationRequirementID,
			final Long verifiableDataItemID,
			final EvidenceDescriptorDtls evidenceDescriptorDtls)
			throws AppException, InformationalException {

		final VerificationRequirementKey verificationRequirementKey = new VerificationRequirementKey();

		verificationRequirementKey.verificationRequirementID = verificationRequirementID;

		final ConditionalVerificationRulesInvoker invoker = GuiceWrapper
				.getInjector().getInstance(
						ConditionalVerificationRulesInvoker.class);

		invoker.setVerificationRequirementKey(verificationRequirementKey);
		final ConditionalVerificationRulesInvoker.Result result = invoker
				.invoke(verifiableDataItemID, evidenceDescriptorDtls);

		if (result
				.equals(ConditionalVerificationRulesInvoker.Result.NOT_APPLICABLE)
				|| result
						.equals(ConditionalVerificationRulesInvoker.Result.TRUE)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Filter the list only for primary and case members only.
	 * 
	 * @param listClientRole
	 *            The not filtered list which contains all the case participants
	 *            in a product delivery case.
	 * @return The filtered list with only members of type primary and member.
	 */

	protected ListPDClientRoleDetails filterOnlyCaseMembers(
			ListPDClientRoleDetails listClientRole) {
		ListPDClientRoleDetails listPDClientRoleDetails = new ListPDClientRoleDetails();

		for (CaseParticipantRole_eoFullDetails casePartiRole_eoFullDetails : listClientRole.caseParticipantRoleList
				.items()) {
			if (CASEPARTICIPANTROLETYPE.PRIMARY
					.equals(casePartiRole_eoFullDetails.typeCode)
					|| CASEPARTICIPANTROLETYPE.MEMBER
							.equals(casePartiRole_eoFullDetails.typeCode)) {
				listPDClientRoleDetails.caseParticipantRoleList
						.addRef(casePartiRole_eoFullDetails);
			}
		}
		return listPDClientRoleDetails;
	}
}
