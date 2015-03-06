package curam.molsa.test.base;

import java.util.Iterator;

import com.google.inject.Inject;

import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.EVIDENCECHANGEREASON;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.MARITALSTATUS;
import curam.codetable.PHONETYPE;
import curam.codetable.RELATIONSHIPTYPECODE;
import curam.core.sl.infrastructure.entity.struct.CaseIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorInsertDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKey;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EIEvidenceInsertDtls;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtls;
import curam.core.sl.infrastructure.struct.ECActiveEvidenceDtlsList;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.sl.infrastructure.struct.EvidenceVerificationDisplayDetails;
import curam.core.sl.infrastructure.struct.EvidenceVerificationDisplayDetailsList;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.CaseKey;
import curam.core.struct.ConcernRoleKey;
import curam.creole.value.CodeTableItem;
import curam.dynamicevidence.definition.impl.EvidenceTypeDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.dynamicevidence.impl.DynamicEvidenceDataAttributeDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.molsa.codetable.ABSENTFATHER;
import curam.molsa.codetable.EDUCATION;
import curam.molsa.codetable.EDUCATIONLEVEL;
import curam.molsa.codetable.EXPENSE;
import curam.molsa.codetable.HANDICAPPEDUNABLETOWORK;
import curam.molsa.codetable.MOLSABENEFITTYPE;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.verification.sl.fact.MOLSAVerificationApplicationDAFactory;
import curam.molsa.verification.sl.intf.MOLSAVerificationApplicationDA;
import curam.pdc.fact.PDCUtilFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.verification.facade.infrastructure.fact.VerificationApplicationFactory;
import curam.verification.facade.infrastructure.intf.VerificationApplication;
import curam.verification.facade.infrastructure.struct.CreateVerificaitonItemProvidedDetails;
import curam.verification.facade.infrastructure.struct.ListVerificationItemNameAndLevelDetails;
import curam.verification.facade.infrastructure.struct.VDIEDLinkKey;
import curam.verification.sl.infrastructure.fact.VerificationControllerFactory;
import curam.verification.sl.infrastructure.fact.VerificationItemProvidedFactory;
import curam.verification.sl.infrastructure.intf.VerificationController;
import curam.verification.sl.infrastructure.intf.VerificationItemProvided;
import curam.verification.sl.infrastructure.struct.NewUserProvidedVerificationItemDetails;

/**
 * 
 * Populates the required evidences to create the product delivery case.
 * 
 */
public abstract class MolsaRuleTestData extends AbstractMolsaTestBase {

	protected static final String kParticipant = "participant";

	@Inject
	protected EvidenceTypeDefDAO etDefDAO;

	@Inject
	protected EvidenceTypeVersionDefDAO etVerDefDAO;

	protected EvidenceControllerInterface evidenceControllerObj;

	/**
	 * 
	 * Constructor of the class.
	 * 
	 * 
	 */
	public MolsaRuleTestData(String arg0) {
		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);
		evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
	}

	/**
	 * 
	 * Create the birth and death evidence.
	 * 
	 */

	public void createBirthAndDeathEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final Date dob) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "PDC0000264";

		final EvidenceTypeDef evidenceType = etDefDAO
				.readActiveEvidenceTypeDefByTypeCode(eType.evidenceType);

		final EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
				.getActiveEvidenceTypeVersionAtDate(evidenceType,
						Date.getCurrentDate());

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory
				.newInstance(evTypeVersion);

		final DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails
				.getAttribute("person");
		DynamicEvidenceTypeConverter.setAttribute(participant,
				caseParticipantRoleID);

		final DynamicEvidenceDataAttributeDetails dateOfBirth = dynamicEvidenceDataDetails
				.getAttribute("dateOfBirth");
		DynamicEvidenceTypeConverter.setAttribute(dateOfBirth, dob);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * Create the household member evidence.
	 * 
	 */
	public void createHouseholdMemberEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String citizenship,
			final String residency) throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000256";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails citizenshipType = dynamicEvidenceDataDetails
				.getAttribute("citizenship");
		DynamicEvidenceTypeConverter.setAttribute(citizenshipType,
				new CodeTableItem(CITIZENSHIPCODE.TABLENAME, citizenship));

		final DynamicEvidenceDataAttributeDetails residencyType = dynamicEvidenceDataDetails
				.getAttribute("residency");
		DynamicEvidenceTypeConverter.setAttribute(residencyType,
				new CodeTableItem(RESIDENCY.TABLENAME, residency));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * Create the marital status evidence.
	 * 
	 */
	public void createMaritalStatusEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String maritalStatus)
			throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000516";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails maritalStatusType = dynamicEvidenceDataDetails
				.getAttribute("maritalStatus");
		DynamicEvidenceTypeConverter.setAttribute(maritalStatusType,
				new CodeTableItem(MARITALSTATUS.TABLENAME, maritalStatus));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * Create the education evidence.
	 * 
	 */
	public void createEducationEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String studentStatus,
			final String educationLevel) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000517";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails studentStatusType = dynamicEvidenceDataDetails
				.getAttribute("studentStatus");
		DynamicEvidenceTypeConverter.setAttribute(studentStatusType,
				new CodeTableItem(EDUCATION.TABLENAME, studentStatus));

		final DynamicEvidenceDataAttributeDetails educationLevelType = dynamicEvidenceDataDetails
				.getAttribute("educationLevel");
		DynamicEvidenceTypeConverter.setAttribute(educationLevelType,
				new CodeTableItem(EDUCATIONLEVEL.TABLENAME, educationLevel));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * Create the absent father evidence.
	 * 
	 */
	public EIEvidenceKey createAbsentFatherEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final long concernRoleID1, final long caseParticipantRoleID2,
			final Date receivedDate, final String absenceReason)
			throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000259";

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

		final DynamicEvidenceDataAttributeDetails absentPerson = dynamicEvidenceDataDetails
				.getAttribute("absentPerson");
		DynamicEvidenceTypeConverter.setAttribute(absentPerson,
				caseParticipantRoleID2);

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails absenceReasonType = dynamicEvidenceDataDetails
				.getAttribute("absenceReason");
		DynamicEvidenceTypeConverter.setAttribute(absenceReasonType,
				new CodeTableItem(ABSENTFATHER.TABLENAME, absenceReason));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		EIEvidenceKey eiEvidenceKey = evidenceControllerObj
				.insertEvidence(eiEvidenceInsertDtls);
		return eiEvidenceKey;

	}

	/**
	 * 
	 * Create the absent father children evidence.
	 * 
	 */
	public void createAbsentParentChildrenEvidence(final CaseKey caseKey,
	/**
	 * 
	 * Create the additional benefit type evidence.
	 * 
	 */
	final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final EIEvidenceKey evidenceKey)
			throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000512";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;
		eiEvidenceInsertDtls.parentKey = evidenceKey;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	public void createAdditionalBenefitEvidence(CaseKey caseKey,
			long concernRoleID, long caseParticipantRoleID, Date receivedDate,
			int amount, String benefitType) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0001536";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("date");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails amount1 = dynamicEvidenceDataDetails
				.getAttribute("amount");
		DynamicEvidenceTypeConverter.setAttribute(amount1, amount);

		final DynamicEvidenceDataAttributeDetails benefitType1 = dynamicEvidenceDataDetails
				.getAttribute("benefitType");
		DynamicEvidenceTypeConverter.setAttribute(benefitType1,
				new CodeTableItem(MOLSABENEFITTYPE.TABLENAME, benefitType));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	public void createIncomeEvidence(CaseKey caseKey, long concernRoleID,
			long caseParticipantRoleID, Date receivedDate, String frequency,
			String incomeType, int amount) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000514";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails amount1 = dynamicEvidenceDataDetails
				.getAttribute("amount");
		DynamicEvidenceTypeConverter.setAttribute(amount1, amount);

		final DynamicEvidenceDataAttributeDetails frequency1 = dynamicEvidenceDataDetails
				.getAttribute("frequency");
		DynamicEvidenceTypeConverter.setAttribute(frequency1,
				new CodeTableItem(FREQUENCYCODE.TABLENAME, frequency));

		final DynamicEvidenceDataAttributeDetails incomeType1 = dynamicEvidenceDataDetails
				.getAttribute("incomeType");
		DynamicEvidenceTypeConverter.setAttribute(incomeType1,
				new CodeTableItem(INCOMETYPECODE.TABLENAME, incomeType));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	public void createGenderEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String gender) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "PDC0000262";

		final EvidenceTypeDef evidenceType = etDefDAO
				.readActiveEvidenceTypeDefByTypeCode(eType.evidenceType);

		final EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
				.getActiveEvidenceTypeVersionAtDate(evidenceType,
						Date.getCurrentDate());

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory
				.newInstance(evTypeVersion);

		final DynamicEvidenceDataAttributeDetails participant = dynamicEvidenceDataDetails
				.getAttribute("person");
		DynamicEvidenceTypeConverter.setAttribute(participant,
				caseParticipantRoleID);

		final DynamicEvidenceDataAttributeDetails genderType = dynamicEvidenceDataDetails
				.getAttribute("gender");
		DynamicEvidenceTypeConverter.setAttribute(genderType,
				new CodeTableItem(GENDER.TABLENAME, gender));

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	public void createHeadOfHouseholdEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000258";

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

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);
		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	public void createUnableToWorkEvidnece(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String unabletowork)
			throws AppException, InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000769";

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

		final DynamicEvidenceDataAttributeDetails permanentcondition = dynamicEvidenceDataDetails
				.getAttribute("permanentCondition");
		DynamicEvidenceTypeConverter.setAttribute(permanentcondition, true);

		final DynamicEvidenceDataAttributeDetails unableToWorkEvd = dynamicEvidenceDataDetails
				.getAttribute("reason");

		DynamicEvidenceTypeConverter.setAttribute(unableToWorkEvd,
				new CodeTableItem(HANDICAPPEDUNABLETOWORK.TABLENAME,
						unabletowork.toString()));

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");

		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * Create the household relationship evidence.
	 * 
	 */
	public void createHouseholdRelationshipEvidence(final CaseKey caseKey,

	final long concernRoleID, final long caseParticipantRoleID,
			final long relatedcaseParticipantRoleID, final Date receivedDate,
			final String relationship) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0001280";
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
		final DynamicEvidenceDataAttributeDetails relatedParticipant = dynamicEvidenceDataDetails
				.getAttribute("relatedParticipant");
		DynamicEvidenceTypeConverter.setAttribute(relatedParticipant,
				relatedcaseParticipantRoleID);
		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("fromDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);
		/*
		 * final DynamicEvidenceDataAttributeDetails endReasonType =
		 * dynamicEvidenceDataDetails .getAttribute("endReason");
		 * DynamicEvidenceTypeConverter.setAttribute(endReasonType, new
		 * CodeTableItem(RELATIONSHIPENDREASON.TABLENAME, endReason));
		 */
		final DynamicEvidenceDataAttributeDetails relationshipTypeEvd = dynamicEvidenceDataDetails
				.getAttribute("relationshipType");
		DynamicEvidenceTypeConverter
				.setAttribute(relationshipTypeEvd, new CodeTableItem(
						RELATIONSHIPTYPECODE.TABLENAME, relationship));
		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;

		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);
	}

	public void createExpenseEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final Date receivedDate, final String rentType,
			final String frequency, int rentamount) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000515";

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

		final DynamicEvidenceDataAttributeDetails frequencyType = dynamicEvidenceDataDetails
				.getAttribute("frequency");
		DynamicEvidenceTypeConverter.setAttribute(frequencyType,
				new CodeTableItem(FREQUENCYCODE.TABLENAME, frequency));

		final DynamicEvidenceDataAttributeDetails rentTypeEvd = dynamicEvidenceDataDetails
				.getAttribute("rentType");
		DynamicEvidenceTypeConverter.setAttribute(rentTypeEvd,
				new CodeTableItem(EXPENSE.TABLENAME, rentType));

		final DynamicEvidenceDataAttributeDetails rentAmountEvd = dynamicEvidenceDataDetails
				.getAttribute("rentAmount");
		DynamicEvidenceTypeConverter.setAttribute(rentAmountEvd, rentamount);
		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}

	/**
	 * 
	 * @param caseKey
	 * @param concernRoleID
	 * @param caseParticipantRoleID
	 * @param evidenceType
	 * @throws AppException
	 * @throws InformationalException
	 */
	public void deleteEvidence(CaseKey caseKey, long caseParticipantRoleID,
			String evidenceType) throws AppException, InformationalException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = evidenceType;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());

		final ECActiveEvidenceDtlsList activeEvidenceDtlsList = evidenceControllerObj
				.listActive(caseKey);
		EvidenceCaseKey evidenceCaseKey = null;

		for (final ECActiveEvidenceDtls activeEvidenceDtls : activeEvidenceDtlsList.dtls) {

			if (evidenceTypeKey.evidenceType
					.equals(activeEvidenceDtls.evidenceType)) {
				evidenceCaseKey = new EvidenceCaseKey();
				evidenceCaseKey.evidenceKey.evType = evidenceTypeKey.evidenceType;
				evidenceCaseKey.caseIDKey.caseID = caseKey.caseID;
				evidenceCaseKey.evidenceKey.evidenceID = activeEvidenceDtls.evidenceID;
				final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
						.readEvidence(evidenceCaseKey);
				final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;
				final String cprID = dynamicEvidenceDataDetails.getAttribute(
						kParticipant).getValue();
				if (caseParticipantRoleID == Long.parseLong(cprID)) {
					EvidenceDescriptorKey key = new EvidenceDescriptorKey();
					key.evidenceDescriptorID = activeEvidenceDtls.evidenceDescriptorID;
					evidenceControllerObj.removeEvidence(key);
				}

			}
		}

	}

	/**
	 * 
	 * Create the absent person evidence.
	 * 
	 */
	public EIEvidenceKey createAbsentPersonEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,
			final long afCPRID, final Date receivedDate,
			final String absenceReason, final String apQID) throws AppException,
			InformationalException {

		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0000259";

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

		final DynamicEvidenceDataAttributeDetails absentPerson = dynamicEvidenceDataDetails
				.getAttribute("absentPerson");
		DynamicEvidenceTypeConverter.setAttribute(absentPerson, afCPRID);

		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
				.getAttribute("startDate");
		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final DynamicEvidenceDataAttributeDetails absenceReasonType = dynamicEvidenceDataDetails
				.getAttribute("absenceReason");
		DynamicEvidenceTypeConverter.setAttribute(absenceReasonType,
				new CodeTableItem(ABSENTFATHER.TABLENAME, absenceReason));
		final DynamicEvidenceDataAttributeDetails qid = dynamicEvidenceDataDetails
				.getAttribute("qid");
		DynamicEvidenceTypeConverter.setAttribute(qid,
				apQID);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		EIEvidenceKey eiEvidenceKey = evidenceControllerObj
				.insertEvidence(eiEvidenceInsertDtls);
		return eiEvidenceKey;

	}

	public void createAnonymousParentsEvidence(final CaseKey caseKey,
			final long concernRoleID, final long caseParticipantRoleID,final Date receivedDate,final Boolean anonymousInd)throws AppException,InformationalException {
		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = "DET0001792";

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
		final DynamicEvidenceDataAttributeDetails AnonymousParentInd = dynamicEvidenceDataDetails
				.getAttribute("anonymousParents");
		DynamicEvidenceTypeConverter.setAttribute(AnonymousParentInd,anonymousInd );
//		final DynamicEvidenceDataAttributeDetails startDate = dynamicEvidenceDataDetails
//				.getAttribute("startDate");
//		DynamicEvidenceTypeConverter.setAttribute(startDate, receivedDate);

		final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

		evidenceDescriptorInsertDtls.participantID = concernRoleID;
		evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
		evidenceDescriptorInsertDtls.receivedDate = receivedDate;
		evidenceDescriptorInsertDtls.caseID = caseKey.caseID;

		final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

		eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
		eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
		eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
		eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

		evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);

	}
	
	public void createPhoneNumberEvidence(final CaseKey caseKey,
            final long concernRoleID, final long caseParticipantRoleID,final Date receivedDate,final String phnCountryCode,final String phoneNum,final String phoneType,final Boolean preferredInd)throws AppException,InformationalException {
     
     final EvidenceTypeKey eType = new EvidenceTypeKey();

     eType.evidenceType = "PDC0000256";

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
     final DynamicEvidenceDataAttributeDetails phoneCountryCode = dynamicEvidenceDataDetails
                  .getAttribute("phoneCountryCode");
     DynamicEvidenceTypeConverter.setAttribute(phoneCountryCode, phnCountryCode);
     final DynamicEvidenceDataAttributeDetails phoneNumber = dynamicEvidenceDataDetails
                  .getAttribute("phoneNumber");
     DynamicEvidenceTypeConverter.setAttribute(phoneNumber, phoneNum);          
     final DynamicEvidenceDataAttributeDetails frmDate = dynamicEvidenceDataDetails
                  .getAttribute("fromDate");
     DynamicEvidenceTypeConverter.setAttribute(frmDate, receivedDate);
     final DynamicEvidenceDataAttributeDetails frequencyType = dynamicEvidenceDataDetails
                  .getAttribute("phoneType");
     DynamicEvidenceTypeConverter.setAttribute(frequencyType,
                  new CodeTableItem(PHONETYPE.TABLENAME, phoneType));
     final DynamicEvidenceDataAttributeDetails PreferredInd = dynamicEvidenceDataDetails
                  .getAttribute("preferredInd");
     DynamicEvidenceTypeConverter.setAttribute(PreferredInd,preferredInd);
     
     final EvidenceDescriptorInsertDtls evidenceDescriptorInsertDtls = new EvidenceDescriptorInsertDtls();

     evidenceDescriptorInsertDtls.participantID = concernRoleID;
     evidenceDescriptorInsertDtls.evidenceType = eType.evidenceType;
     evidenceDescriptorInsertDtls.receivedDate = receivedDate;
     ConcernRoleKey concernRoleKey=new ConcernRoleKey();
     concernRoleKey.concernRoleID=concernRoleID;
     long caseID = PDCUtilFactory.newInstance().getPDCCaseIDCaseParticipantRoleID(concernRoleKey).caseID;
     evidenceDescriptorInsertDtls.caseID = caseID;

     final EIEvidenceInsertDtls eiEvidenceInsertDtls = new EIEvidenceInsertDtls();

     eiEvidenceInsertDtls.descriptor.assign(evidenceDescriptorInsertDtls);
     eiEvidenceInsertDtls.descriptor.participantID = evidenceDescriptorInsertDtls.participantID;
     eiEvidenceInsertDtls.descriptor.changeReason = EVIDENCECHANGEREASON.REPORTEDBYCLIENT;
     eiEvidenceInsertDtls.evidenceObject = dynamicEvidenceDataDetails;

     evidenceControllerObj.insertEvidence(eiEvidenceInsertDtls);
}


	
}
