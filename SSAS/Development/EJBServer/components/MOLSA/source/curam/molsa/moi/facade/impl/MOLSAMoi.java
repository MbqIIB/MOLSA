package curam.molsa.moi.facade.impl;

import java.text.ParsePosition;

import com.ibm.icu.text.SimpleDateFormat;

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
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorKey;
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
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.molsa.moi.sl.fact.MOLSAMaintainMoiFactory;
import curam.molsa.moi.sl.intf.MOLSAMaintainMoi;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;

/**
 * The class to maintain the MOI
 * 
 * 
 */
public abstract class MOLSAMoi extends curam.molsa.moi.facade.base.MOLSAMoi {

	/**
	 * This Method retrieves the MOI Details.
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

	@SuppressWarnings("restriction")
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
		String qid = participantHelper.returnConcernRoleAlternateID(
				arg1.concernRoleID, CONCERNROLEALTERNATEID.INSURANCENUMBER);
		MOLSAMoiKey moiKey = new MOLSAMoiKey();
		moiKey.qid = qid;
		curam.molsa.moi.entity.intf.MOLSAMoi molsaMoi = MOLSAMoiFactory
				.newInstance();
		MOLSAMoiDtls molsaMoiDtls = molsaMoi.read(moiKey);

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

				// To read dob from birth and death evidence
				readBirthDeathDetails = readCaseEvidenceDetails(
						integratedCaseID, CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
						caseParticipantRoleDetails.dtls.caseParticipantRoleID,
						idAndNameDetails.name);
				// To read gender details from gender evidence
				readGenderEvidence = readCaseEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.GENDER,
						caseParticipantRoleDetails.dtls.caseParticipantRoleID,
						idAndNameDetails.name);
				// To read name details from names evidence
				readNameEvidence = readNameEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.NAME,
						caseParticipantRoleDetails.dtls.caseParticipantRoleID,
						idAndNameDetails.name);

				// Compare the person dob details with moi dob details
				if (!readBirthDeathDetails.dtls.equals(null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

					String dateStringInNewFormat = molsaMoiDtls.dateOfBirth
							.toString();

					SimpleDateFormat originalFormatter = new SimpleDateFormat(
							"yyyyMMdd");
					SimpleDateFormat newFormatter = new SimpleDateFormat(
							"MM/dd/yyyy");

					// parsing date string using new format
					ParsePosition pos = new ParsePosition(0);
					java.util.Date dateFromString = newFormatter.parse(
							dateStringInNewFormat, pos);

					String dateStringInOriginalFormat = originalFormatter
							.format(dateFromString);

					if (!(readBirthDeathDetails.dtls
							.getAttribute("dateOfBirth").getValue().toString()
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
								"Moi Data Change");
						dynamicEvidenceDetails.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails
								.setDescriptor(readBirthDeathDetails.descriptor);
						dynamicEvidenceDetails
								.setData(dynamicEvidenceDataDetails);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails);
					}
				}
				if (!readGenderEvidence.dtls.equals(null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.GENDER;

					String genderCode = new String();
					if ((molsaMoiDtls.sexCode == 1)) {
						genderCode = GENDER.MALE;
					} else if ((molsaMoiDtls.sexCode == 2)) {
						genderCode = GENDER.FEMALE;
					}

					if ((!readGenderEvidence.dtls.getAttribute("gender")
							.getValue().toString().equals(genderCode))) {
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails2 = readGenderEvidence.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails2 = new GenericSLDataDetails();
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.gender).setValue(genderCode);
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.comments).setValue(
								"Moi Data Change");
						dynamicEvidenceDetails2.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails2
								.setDescriptor(readGenderEvidence.descriptor);
						dynamicEvidenceDetails2
								.setData(dynamicEvidenceDataDetails2);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails2);
					}
				}

				if (!(readNameEvidence.dtls.equals(null))) {
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
					if (!(readNameEvidence.dtls.getAttribute("firstName")
							.getValue().toString()
							.equals(molsaMoiDtls.firstName_ar))
							|| (!(readNameEvidence.dtls
									.getAttribute("lastName").getValue()
									.toString()
									.equals(molsaMoiDtls.fifthName_ar)))
							|| (!(readNameEvidence.dtls
									.getAttribute("middleName").getValue()
									.toString().equals(middleName)))) {
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
								"Moi Data Change");
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

				if (caseParticipantRoleID.equals(caseparticipantRoleID)) {
					return evidenceDetails;
				}
			}
		}
		return new ReadEvidenceDetails();
	}

	private ReadEvidenceDetails readNameEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence,
			final Long caseParticipantRoleID, final String participant)
			throws AppException, InformationalException {

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();

		// get all the evidence details for the caseID

		EvidenceTypeAndStatus key = new EvidenceTypeAndStatus();
		key.evidenceType = caseEvidence.getCode();
		key.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;
		final EvidenceDescriptorDtlsList evidenceDescriptorDtlsList = evidenceDescriptorObj
				.searchByEvidenceTypeAndStatusCode(key);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();

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

			// get the caseparticipantroleID and compare to get the matching
			// evidence
			if (null != dynamicEvidenceDataDetails) {
				return evidenceDetails;
			}

		}
		return new ReadEvidenceDetails();
	}

}
