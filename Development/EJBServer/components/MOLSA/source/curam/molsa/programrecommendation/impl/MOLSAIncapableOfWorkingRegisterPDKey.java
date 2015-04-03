package curam.molsa.programrecommendation.impl;

import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.CURRENCY;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.struct.ReadPersonDetails;
import curam.core.facade.struct.ReadPersonKey;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.CreateProductDeliveryFactory;
import curam.core.sl.entity.fact.CaseParticipantRoleFactory;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.sl.infrastructure.base.EvidenceController;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDEvidenceTypeStatusesKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKeyList;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtls;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtlsList;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.CaseKey;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.ProductProviderDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.creoleprogramrecommendation.impl.Member;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.util.type.DateRange;

/**
 * Contains processing to Register a product delivery key for a Incapable Of Working
 *  Program if eligible member are more than one we calculate age and
 * create a product delivery for senior citizen
 * 
 */
public class MOLSAIncapableOfWorkingRegisterPDKey implements
		MOLSARegisterProductDeliveryKey {

	protected static final String kparticipant = "participant";

	protected static final String kstartDate = "startDate";

	protected static final String kendDate = "endDate";

	@Inject
	private CaseParticipantRoleDAO caseParticipantRoleDAO;

	private EvidenceController evidenceControllerObj;
	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	
	private EvidenceDescriptor evidenceDescriptorObj;

	
	/**
	 * Constructor.
	 */
	public MOLSAIncapableOfWorkingRegisterPDKey() {
		GuiceWrapper.getInjector().injectMembers(this);
		//evidenceControllerObj = (EvidenceController) EvidenceControllerFactory.newInstance();
		evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
		.newInstance();
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
	@Override
	public RegisterProductDeliveryKey registerProductDeliveryKey(
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


		registerProductDeliveryKey.clientID = caseParticipantRoleDAO
				.get(elderCPRID).getConcernRole().getID();

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

		curam.core.sl.entity.intf.CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
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

}
