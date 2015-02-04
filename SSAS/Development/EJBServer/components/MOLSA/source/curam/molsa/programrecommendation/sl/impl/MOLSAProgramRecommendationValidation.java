package curam.molsa.programrecommendation.sl.impl;

import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASEEVIDENCE;
import curam.core.impl.CuramConst;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.struct.CaseIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.fact.EvidenceControllerFactory;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.struct.EIEvidenceKey;
import curam.core.sl.infrastructure.struct.EIEvidenceKeyList;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.dynamicevidence.impl.DynamicEvidenceDataAttributeDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.message.MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.programrecommendation.sl.struct.ValidateProgramRecommendationDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * Validating the evidences and data entered for the household before triggering
 * the program recommendation process.
 */
public class MOLSAProgramRecommendationValidation
		extends
		curam.molsa.programrecommendation.sl.base.MOLSAProgramRecommendationValidation {

	@Inject
	private EvidenceTypeDefDAO etDefDAO;

	@Inject
	private EvidenceTypeVersionDefDAO etVerDefDAO;
	protected static final String kPerson = "person";
	/**
	 * Constructor. Guice Set-up.
	 */
	public MOLSAProgramRecommendationValidation() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * Initiates the process which validates that minimum and valid evidences
	 * are entered for the household before running program recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public void validate(ValidateProgramRecommendationDetails details)
			throws AppException, InformationalException {
		//validateHeadOfHouseholdEvidence(details);
		validateHouseholdMemberEvidence(details);

		TransactionInfo.getInformationalManager().failOperation();

	}

	/**
	 * Validates that the Head of Household evidences are entered before running
	 * running program recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected void validateHeadOfHouseholdEvidence(
			final ValidateProgramRecommendationDetails details)
			throws AppException, InformationalException {
		final CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
		EIEvidenceKeyList eiEvidenceKeyList = new EIEvidenceKeyList();
		final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
		final EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		final InformationalManager informationalManager = TransactionInfo
				.getInformationalManager();

		caseIDAndEvidenceTypeKey.caseID = details.caseID;
		caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.HEADOFHOUSE;

		eiEvidenceKeyList.assign(evidenceDescriptorObj
				.searchAllByTypeForCase(caseIDAndEvidenceTypeKey));

		eiEvidenceKeyList = evidenceControllerObj
				.filterActiveAndPendingChanges(eiEvidenceKeyList);

		if (eiEvidenceKeyList.dtls.size() < 1) {

			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_PROGRAM_RECOMMENDATION_XRV_NO_HEAD_OF_HOUSEHOLD);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			return;
		}
	}

	/**
	 * Validates that the Household Member, Birth and Death, Marital status and
	 * Gender evidences are entered before running running program
	 * recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected void validateHouseholdMemberEvidence(
			final ValidateProgramRecommendationDetails details)
			throws AppException, InformationalException {

		final CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
		EIEvidenceKeyList eiEvidenceKeyList = new EIEvidenceKeyList();
		final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
		final EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();

		final InformationalManager informationalManager = TransactionInfo
				.getInformationalManager();

		caseIDAndEvidenceTypeKey.caseID = details.caseID;
		caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.HOUSEHOLDMEMBER;

		EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.HOUSEHOLDMEMBER;
		EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());

		eiEvidenceKeyList.assign(evidenceDescriptorObj
				.searchAllByTypeForCase(caseIDAndEvidenceTypeKey));

		eiEvidenceKeyList = evidenceControllerObj
				.filterActiveAndPendingChanges(eiEvidenceKeyList);

		List<Long> hhMemberParticipantIdList = new ArrayList<Long>();

		if (eiEvidenceKeyList.dtls.size() < 1) {

			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_HHOLDMEMBER_XRV_HOUSEHOLD_MEMBER_EVIDENCE_DOES_NOT_EXIST);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			return;
		}
		for (int i = 0; i < eiEvidenceKeyList.dtls.size(); i++) {
			evidenceCaseKey.evidenceKey.evType = CASEEVIDENCE.HOUSEHOLDMEMBER;
			evidenceCaseKey.caseIDKey.caseID = details.caseID;
			evidenceCaseKey.evidenceKey.evidenceID = eiEvidenceKeyList.dtls
					.get(i).evidenceID;
			ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);

			DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;

			final curam.dynamicevidence.definition.impl.EvidenceTypeDef evidenceType = etDefDAO
					.readActiveEvidenceTypeDefByTypeCode(evidenceTypeKey.evidenceType);

			curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
					.getActiveEvidenceTypeVersionAtDate(evidenceType,
							Date.getCurrentDate());

			if (null != evTypeVersion) {
				DynamicEvidenceDataAttributeDetails caseParticipantRoleIDAttribute = dynamicEvidenceDataDetails
						.getAttribute(MOLSAConstants.kDynEvdAttr_CaseParticipantRoleID);

				validateBirthAndDeathEvidence(details,
						Long.parseLong(caseParticipantRoleIDAttribute
								.getValue()));

				/*validateMaritalStatusEvidence(details,
						Long.parseLong(caseParticipantRoleIDAttribute
								.getValue()));*/
				validateGenderEvidence(details,
						Long.parseLong(caseParticipantRoleIDAttribute
								.getValue()));

			}
		}
	}

	/**
	 * Validates that the Marital Status evidences are entered before running
	 * running program recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected void validateMaritalStatusEvidence(
			ValidateProgramRecommendationDetails details,
			long caseParticipantRoleID) throws AppException,
			InformationalException {

		final CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
		EIEvidenceKeyList eiEvidenceKeyList = new EIEvidenceKeyList();
		final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
		final EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		caseIDAndEvidenceTypeKey.caseID = details.caseID;
		caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.MARITALSTATUS;

		eiEvidenceKeyList.assign(evidenceDescriptorObj
				.searchAllByTypeForCase(caseIDAndEvidenceTypeKey));

		eiEvidenceKeyList = evidenceControllerObj
				.filterActiveAndPendingChanges(eiEvidenceKeyList);
		// CaseParticipantRole objects
		final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory
				.newInstance();

		final curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();

		// get the caseID and participantID
		caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

		if (eiEvidenceKeyList.dtls.size() < 1) {

			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_HHOLDMEMBER_XRV_MARITAL_STATUS_EVIDENCE_DOES_NOT_EXIST);
			// get the caseID and participantID
			caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

			appException
					.arg(caseParticipantRoleObj
							.readParticipantRoleIDAndParticpantName(caseParticipantRoleKey).name);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			return;
		}
	}

	/**
	 * Validates that the Gender evidences are entered before running running
	 * program recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected void validateGenderEvidence(
			ValidateProgramRecommendationDetails details,
			long caseParticipantRoleID) throws AppException,
			InformationalException {

		final CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
		EIEvidenceKeyList eiEvidenceKeyList = new EIEvidenceKeyList();
		final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
		final EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		caseIDAndEvidenceTypeKey.caseID = details.caseID;
		caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.GENDER;

		eiEvidenceKeyList.assign(evidenceDescriptorObj
				.searchAllByTypeForCase(caseIDAndEvidenceTypeKey));

		eiEvidenceKeyList = evidenceControllerObj
				.filterActiveAndPendingChanges(eiEvidenceKeyList);
		// CaseParticipantRole objects
		final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory
				.newInstance();

		final curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();

		// get the caseID and participantID
		caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

		if (eiEvidenceKeyList.dtls.size() < 1) {

			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_HHOLDMEMBER_XRV_GENDER_RECORD_EVIDENCE_DOES_NOT_EXIST);
			// get the caseID and participantID
			caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

			appException
					.arg(caseParticipantRoleObj
							.readParticipantRoleIDAndParticpantName(caseParticipantRoleKey).name);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			return;
		}
	}

	/**
	 * Validates that the Birth and Death Status evidences are entered before
	 * running running program recommendation.
	 * 
	 * @param details
	 *            Contains details of the program selected.
	 * @throws AppException
	 *             Generic Exception Signature.
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	protected void validateBirthAndDeathEvidence(
			ValidateProgramRecommendationDetails details,
			long caseParticipantRoleID) throws AppException,
			InformationalException {

		Boolean flag = false;
		final CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
		EIEvidenceKeyList eiEvidenceKeyList = new EIEvidenceKeyList();
		final EvidenceControllerInterface evidenceControllerObj = (EvidenceControllerInterface) EvidenceControllerFactory
				.newInstance();
		final EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		caseIDAndEvidenceTypeKey.caseID = details.caseID;
		caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

		eiEvidenceKeyList.assign(evidenceDescriptorObj
				.searchAllByTypeForCase(caseIDAndEvidenceTypeKey));

		eiEvidenceKeyList = evidenceControllerObj
				.filterActiveAndPendingChanges(eiEvidenceKeyList);
		// CaseParticipantRole objects
		final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory
				.newInstance();

		final curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();

		// get the caseID and participantID
		caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;
		EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType =  CASEEVIDENCE.BIRTHDEATHDETAILS;
		EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		

		if (eiEvidenceKeyList.dtls.size() >= 1) {
			
			for(EIEvidenceKey evidence : eiEvidenceKeyList.dtls){
				evidenceCaseKey.evidenceKey.evType = CASEEVIDENCE.BIRTHDEATHDETAILS;
				evidenceCaseKey.caseIDKey.caseID = details.caseID;
				evidenceCaseKey.evidenceKey.evidenceID = evidence.evidenceID;
				ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
						.readEvidence(evidenceCaseKey);

				DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;

				final curam.dynamicevidence.definition.impl.EvidenceTypeDef evidenceType = etDefDAO
						.readActiveEvidenceTypeDefByTypeCode(evidenceTypeKey.evidenceType);

				curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
						.getActiveEvidenceTypeVersionAtDate(evidenceType,
								Date.getCurrentDate());

				if (null != evTypeVersion) {
					DynamicEvidenceDataAttributeDetails caseParticipantRoleIDAttribute = dynamicEvidenceDataDetails
							.getAttribute(kPerson);

					if(Long.parseLong(caseParticipantRoleIDAttribute.getValue())==caseParticipantRoleID){
						flag = true;
					}
					

				}
				
			}

		}

		if(!flag){
			final AppException appException = new AppException(
					MOLSAPROGRAMRECOMMENDATIONCHECKELIGIBILITY.ERR_HHOLDMEMBER_XRV_BIRTH_AND_DEATH_EVIDENCE_DOES_NOT_EXIST);
			// get the caseID and participantID
			caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

			appException
					.arg(caseParticipantRoleObj
							.readParticipantRoleIDAndParticpantName(caseParticipantRoleKey).name);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			return;
		}
		
	}
}