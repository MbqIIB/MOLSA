package curam.molsa.moi.facade.impl;

import java.text.ParsePosition;




import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.GENDER;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.intf.CaseHeader;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.impl.EnvVars;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
import curam.core.sl.infrastructure.entity.struct.EvidenceTypeAndStatus;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.CaseIDTypeCodeKey;
import curam.core.sl.struct.CaseParticipantRoleFullDetails1;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.ConcernRoleID;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.GenericSLDataDetails;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.molsa.moi.sl.fact.MOLSAMaintainMoiFactory;
import curam.molsa.moi.sl.intf.MOLSAMaintainMoi;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.type.Date;

/**
 * The class contains implementation of MOI update and MOI read functionality.
 */
@SuppressWarnings("restriction")
public abstract class MOLSAMoi extends curam.molsa.moi.facade.base.MOLSAMoi {

	/**
	 * This method returns details from MOLSA MOI table by reading MOLSAMoiKey
	 * parameter.
	 * 
	 * @param arg1
	 *            MOLSAMoiKey
	 * @return MOI Details
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public MOLSAMoiDtls getMoiDetails(MOLSAMoiKey arg1) throws AppException,
			InformationalException {
		MOLSAMaintainMoi maintainMoiObj = MOLSAMaintainMoiFactory.newInstance();
		return maintainMoiObj.getMoiDetails(arg1);
	}

	/**
	 * This method updates the evidences based on the MOI details. It takes
	 * ConcernRoleID as input parameter parameter and modifies Name, Date of
	 * birth and Gender evidence
	 * 
	 * @param arg1
	 *            ConcernRoleID
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("static-access")
	@Override
	public void updateMoiDetails(ConcernRoleID arg1) throws AppException,
			InformationalException {

		// get the case details based on concernroleID and status
		CaseHeader caseHeader = CaseHeaderFactory.newInstance();
		ConcernRoleIDStatusCodeKey paramConcernRoleIDStatusCodeKey = new ConcernRoleIDStatusCodeKey();
		paramConcernRoleIDStatusCodeKey.dtls.concernRoleID = arg1.concernRoleID;
		paramConcernRoleIDStatusCodeKey.dtls.statusCode = CASESTATUS.OPEN;
		CaseHeaderDtlsList caseDtlsList = caseHeader
				.searchByConcernRoleID(paramConcernRoleIDStatusCodeKey);
		long integratedCaseID = 0;

		MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
		// Getting QID from the concern role ID.
		String qid = participantHelper.returnConcernRoleAlternateID(
				arg1.concernRoleID, CONCERNROLEALTERNATEID.INSURANCENUMBER);
		MOLSAMoiKey moiKey = new MOLSAMoiKey();
		moiKey.qid = qid;
		curam.molsa.moi.entity.intf.MOLSAMoi molsaMoi = MOLSAMoiFactory
				.newInstance();
		MOLSAMoiDtls molsaMoiDtls = molsaMoi.read(moiKey);

		LocalisableString updatedComments = new LocalisableString(
				MOLSANOTIFICATION.MOI_COMMENTS);

		// loop through the cases and iterate through integrated case and
		// update the evidence
		for (CaseHeaderDtls caseDtls : caseDtlsList.dtlsList.dtls.items()) {
			if (caseDtls.caseTypeCode
					.equalsIgnoreCase(CASETYPECODE.INTEGRATEDCASE)) {
				integratedCaseID = caseDtls.caseID;
				CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
						.newInstance();
				CaseIDTypeCodeKey caseIDTypeCode = new CaseIDTypeCodeKey();
				caseIDTypeCode.caseID = caseDtls.caseID;
				caseIDTypeCode.typeCode = CASEPARTICIPANTROLETYPE.PRIMARY;
				CaseParticipantRoleFullDetails1 caseParticipantRoleDetails = caseParticipantRole
						.readByCaseIDAndTypeCode(caseIDTypeCode);

				CaseParticipantRoleKey paramCaseParticipantRoleKey = new CaseParticipantRoleKey();
				paramCaseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleDetails.dtls.caseParticipantRoleID;
				ParticipantRoleIDAndNameDetails idAndNameDetails = caseParticipantRole
						.readParticipantRoleIDAndParticpantName(paramCaseParticipantRoleKey);

				ReadEvidenceDetails readBirthDeathDetails = new ReadEvidenceDetails();
				ReadEvidenceDetails readGenderEvidence = new ReadEvidenceDetails();
				ReadEvidenceDetails readNameEvidence = new ReadEvidenceDetails();

				// Read date of birth from birth and death evidence
				readBirthDeathDetails = readCaseEvidenceDetails(
						integratedCaseID, CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
						caseParticipantRoleDetails.dtls.caseParticipantRoleID,
						idAndNameDetails.name);
				// Read the gender details from gender evidence
				readGenderEvidence = readCaseEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.GENDER,
						caseParticipantRoleDetails.dtls.caseParticipantRoleID,
						idAndNameDetails.name);
				// Read the name details from names evidence
				readNameEvidence = readNameEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.NAME, arg1.concernRoleID,
						idAndNameDetails.name);

				// Compare the person DOB details with MOI date of birth details
				if (!(readBirthDeathDetails.dtls == null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

					String dateStringInNewFormat = molsaMoiDtls.dateOfBirth
							.toString();
  
					java.text.SimpleDateFormat originalFormatter = new java.text.SimpleDateFormat(
							MOLSAConstants.kdateRequired);
					
					String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
					
					java.text.SimpleDateFormat newFormatter = new java.text.SimpleDateFormat(
							propertyDateFormat);

					// parsing date string using new format
					ParsePosition pos = new ParsePosition(0);
					java.util.Date dateFromString = newFormatter.parse(
							dateStringInNewFormat, pos);

					String dateStringInOriginalFormat = originalFormatter
							.format(dateFromString);

					if (!(readBirthDeathDetails.dtls
							.getAttribute(MOLSAConstants.dateOfBirth)
							.getValue().toString()
							.equals(dateStringInOriginalFormat))) {

						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readBirthDeathDetails.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();
						dynamicEvidenceDataDetails.getAttribute(
								MOLSAConstants.dateOfBirth).setValue(
								dateStringInOriginalFormat);
						dynamicEvidenceDataDetails.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails
								.setDescriptor(readBirthDeathDetails.descriptor);
						dynamicEvidenceDetails
								.setData(dynamicEvidenceDataDetails);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails);
					}
				}
				// Check if the gender evidence details is same as details in
				// the MOI.
				if (!(readGenderEvidence.dtls == null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.GENDER;
					// Convert the gender code in MOI to the standard curam
					// format like SX1, SX2 ..
					String genderCode = new String();
					if ((molsaMoiDtls.sexCode == MOLSAConstants.kOne)) {
						genderCode = GENDER.MALE;
					} else if ((molsaMoiDtls.sexCode == MOLSAConstants.kTwo)) {
						genderCode = GENDER.FEMALE;
					}
					// Set the value from the data in the MOI.
					if ((!readGenderEvidence.dtls
							.getAttribute(MOLSAConstants.gender).getValue()
							.toString().equals(genderCode))) {
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails2 = readGenderEvidence.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails2 = new GenericSLDataDetails();
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.gender).setValue(genderCode);
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails2.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails2
								.setDescriptor(readGenderEvidence.descriptor);
						dynamicEvidenceDetails2
								.setData(dynamicEvidenceDataDetails2);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails2);
					}
				}
				// Check if the name evidence details is same as name details in
				// MOI else update the same.
				if (!(readNameEvidence.dtls == null)) {
					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.NAME;
					String middleName = new String();
					if (!molsaMoiDtls.secondName_ar.isEmpty()) {
						middleName = molsaMoiDtls.secondName_ar + " ";
					}
					if (!molsaMoiDtls.thirdName_ar.isEmpty()) {
						middleName = middleName + molsaMoiDtls.thirdName_ar
								+ " ";
					}
					if (!molsaMoiDtls.fourthName_ar.isEmpty()) {
						middleName = middleName + molsaMoiDtls.fourthName_ar;
					}
					// Compare first name, last name and middle name with the
					// MOI name details.
					if (!(readNameEvidence.dtls
							.getAttribute(MOLSAConstants.firstName).getValue()
							.toString().equals(molsaMoiDtls.firstName_ar))
							|| (!(readNameEvidence.dtls
									.getAttribute(MOLSAConstants.lastName)
									.getValue().toString()
									.equals(molsaMoiDtls.fifthName_ar)))
							|| (!(readNameEvidence.dtls
									.getAttribute(MOLSAConstants.middleName)
									.getValue().toString().equals(middleName)))) {
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails3 = readNameEvidence.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails3 = new GenericSLDataDetails();
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.firstName).setValue(
								molsaMoiDtls.firstName_ar);
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.middleName).setValue(middleName);
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.lastName).setValue(
								molsaMoiDtls.fifthName_ar);
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails3.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails3
								.setDescriptor(readNameEvidence.descriptor);
						dynamicEvidenceDetails3
								.setData(dynamicEvidenceDataDetails3);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails3);
					}
				}

			}
		}
	}

	/**
	 * This method reads the active evidences. case Evidence is used to select
	 * the type of evidence.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param caseParticipantRoleID
	 *            Long
	 * @param participant
	 *            String
	 * @return ReadEvidenceDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private ReadEvidenceDetails readCaseEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence,
			final Long caseParticipantRoleID, final String participant)
			throws AppException, InformationalException {

		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = caseID;
		caseIDStatusAndEvidenceTypeKey.evidenceType = caseEvidence.getCode();
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();

		// get all the evidence details for the caseID
		final RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (final RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey.caseIDKey.caseID = caseID;
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;

			// get the caseparticipantroleID and compare to get the matching
			// evidence
			if (null != dynamicEvidenceDataDetails) {
				final Long caseparticipantRoleID;
				if (caseEvidence.equals(CASEEVIDENCEEntry.BIRTHDEATHDETAILS)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else if (caseEvidence.equals(CASEEVIDENCEEntry.GENDER)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.participant));
				}
				// Compare the evidence details with the required case
				// participant role ID.
				if (caseParticipantRoleID.equals(caseparticipantRoleID)) {
					return evidenceDetails;
				}
			}
		}
		return new ReadEvidenceDetails();
	}

	/**
	 * This method is used to read details of active name evidence from a Name
	 * evidence of a required concern role ID.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param concernRole
	 *            Long
	 * @param participant
	 *            String
	 * @return ReadEvidenceDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("static-access")
	private ReadEvidenceDetails readNameEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence, final Long concernRole,
			final String participant) throws AppException,
			InformationalException {

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();
		// Set the evidence type codes to name evidence
		EvidenceTypeAndStatus key = new EvidenceTypeAndStatus();
		key.evidenceType = caseEvidence.getCode();
		key.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;
		final EvidenceDescriptorDtlsList evidenceDescriptorDtlsList = evidenceDescriptorObj
				.searchByEvidenceTypeAndStatusCode(key);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();
		// Read the evidence data
		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (final EvidenceDescriptorDtls evidenceDescriptorDtlsKey : evidenceDescriptorDtlsList.dtls) {
			evidenceCaseKey.caseIDKey.caseID = caseID;
			evidenceCaseKey.evidenceKey.evidenceID = evidenceDescriptorDtlsKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = evidenceDescriptorDtlsKey.evidenceType;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;
			// Check if the evidence details returned in not null
			if (null != dynamicEvidenceDataDetails) {
				final Long caseparticipantRoleID;
				caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
						.convert(dynamicEvidenceDataDetails
								.getAttribute(MOLSAConstants.participant));

				MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
				long concernRoleId = participantHelper
						.returnConcernRoleIDFromCaseParticipantRoleID(caseparticipantRoleID);
				// Check for the details matching to the required concernRoleID
				if (concernRole.equals(concernRoleId)) {
					return evidenceDetails;
				}
			}

		}
		return new ReadEvidenceDetails();
	}

}
