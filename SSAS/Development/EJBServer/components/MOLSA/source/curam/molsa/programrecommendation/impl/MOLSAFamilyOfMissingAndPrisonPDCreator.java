package curam.molsa.programrecommendation.impl;

import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CURRENCY;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.struct.ReadPersonDetails;
import curam.core.facade.struct.ReadPersonKey;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.CreateProductDeliveryFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.ProductDeliveryApprovalFactory;
import curam.core.intf.MaintainCertification;
import curam.core.sl.entity.fact.CaseParticipantRoleFactory;
import curam.core.sl.entity.intf.CaseParticipantRole;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.ProductProviderDetails;
import curam.core.struct.RegisterProductDeliveryDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.core.struct.SubmitForApprovalKey;
import curam.creoleprogramrecommendation.impl.DeliveryCreator;
import curam.creoleprogramrecommendation.impl.Member;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.verification.sl.infrastructure.fact.VerificationFactory;

/**
 * Contains processing to create {@link ProductDelivery} are part of
 * {@link SimulatedDetermination}.
 * 
 * 
 */
public class MOLSAFamilyOfMissingAndPrisonPDCreator implements DeliveryCreator {

	@Inject
	private ProductDeliveryDAO productDeliveryDAO;

	/**
	 * Creates {@link ProductDelivery} and submits the Product for approval if
	 * not outstanding verification.
	 */
	public CaseHeader create(SimulatedDetermination simulatedDetermination)
			throws AppException, InformationalException {
		RegisterProductDeliveryKey registerProductDeliveryKey = registerProductDeliveryKey(simulatedDetermination);

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
		SubmitForApprovalKey submitForApprovalKey = new SubmitForApprovalKey();
		submitForApprovalKey.caseID = ((Long) productDelivery.getID())
				.longValue();
		ProductDeliveryApprovalFactory.newInstance().submitForApproval(
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
		List<Member> members = simulatedDetermination.getMembers();
		long elderCPRID = 0l;
		int elderage = 0;
		int age = 0;
		for (Member member : members) {
			age = getAge(member.caseParticipantRoleID());
			if (age > elderage) {
				elderage = age;
				elderCPRID = member.caseParticipantRoleID();
			}
		}
		CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
				.newInstance();
		curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();
		caseParticipantRoleKey.caseParticipantRoleID = elderCPRID;
		CaseParticipantRoleDtls caseParticipantRoleDetails = caseParticipantRole
				.read(caseParticipantRoleKey);

		registerProductDeliveryKey.clientID = caseParticipantRoleDetails.participantRoleID;

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
	 * Registers a product delivery case and adds certification for the period
	 * of 12 months.
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

		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
				.newInstance();

		MaintainCertificationDetails maintainCertificationDetails = new MaintainCertificationDetails();

		maintainCertificationDetails.caseID = registerProductDeliveryDetails.caseID;
		maintainCertificationDetails.periodFromDate = registerProductDeliveryKey.caseStartDate;

		Calendar calendarToDate = registerProductDeliveryKey.caseStartDate
				.getCalendar();

		calendarToDate.add(2, (int) 11l);

		calendarToDate.set(5, calendarToDate.getActualMaximum(5));

		maintainCertificationDetails.periodToDate = new Date(calendarToDate);

		if (registerProductDeliveryKey.caseStartDate.after(Date
				.getCurrentDate())) {
			maintainCertificationDetails.certificationReceivedDate = Date
					.getCurrentDate();
		} else {
			maintainCertificationDetails.certificationReceivedDate = registerProductDeliveryKey.caseStartDate;
		}

		maintainCertificationObj
				.createCertification(maintainCertificationDetails);

		return productDelivery;
	}

	/**
	 * Determines the age of the case participant as per current date.
	 * 
	 * @param caseParticipantRoleID
	 *            Participant whose age need to be determined.
	 * @return Age
	 * @throws AppException
	 * @throws InformationalException
	 */
	private int getAge(long caseParticipantRoleID) throws AppException,
			InformationalException {
		int ageInDays = 0;

		CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
				.newInstance();
		curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();
		caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;
		CaseParticipantRoleDtls caseParticipantRoleDetails = caseParticipantRole
				.read(caseParticipantRoleKey);
		ReadPersonKey personKey = new ReadPersonKey();
		personKey.maintainConcernRoleKey.concernRoleID = caseParticipantRoleDetails.participantRoleID;
		ReadPersonDetails person = PersonFactory.newInstance().readPerson(
				personKey);
		Date dob = person.personFurtherDetails.dateOfBirth;
		ageInDays = Date.getCurrentDate().subtract(dob);
		return ageInDays;
	}
}