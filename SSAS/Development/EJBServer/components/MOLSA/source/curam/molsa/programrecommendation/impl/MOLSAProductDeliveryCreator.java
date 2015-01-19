package curam.molsa.programrecommendation.impl;

import java.util.Map;

import com.google.inject.Inject;

import curam.codetable.CURRENCY;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.CreateProductDeliveryFactory;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.ProductProviderDetails;
import curam.core.struct.RegisterProductDeliveryDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.creoleprogramrecommendation.impl.DeliveryCreator;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.molsa.core.facade.fact.MOLSAProductDeliveryFactory;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.verification.sl.infrastructure.fact.VerificationFactory;

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

		if (!(outstandingVerificationsExist(productDelivery))) {
			submitForApproval(productDelivery);
		}

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

}