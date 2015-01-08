package curam.molsa.moi.impl;

import java.text.ParsePosition;

import com.ibm.icu.text.SimpleDateFormat;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.GENDER;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.CaseHeader;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.facade.struct.ReadPersonDetails;
import curam.core.facade.struct.ReadPersonKey;
import curam.core.facade.struct.StandardManualTaskDtls;
import curam.core.fact.NotificationFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.Notification;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.CaseIDTypeCodeKey;
import curam.core.sl.struct.CaseParticipantRoleFullDetails1;
import curam.core.sl.struct.CreateStandardManualTaskDetails;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.PersonSearchDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.ip.batch.impl.MOLSAInformationProviderProcessChunkResult;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.intf.MOLSAMoi;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public class MOLSAMoiBatchStream extends
		curam.molsa.moi.base.MOLSAMoiBatchStream {

	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSAMoiBatchStreamWrapper molsaMoiBatchStream = new MOLSAMoiBatchStreamWrapper(
				this);
		SecurityImplementationFactory.register();
		if (batchProcessStreamKey.instanceID.length() == 0)
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_MOI;
		batchStreamHelper.runStream(batchProcessStreamKey, molsaMoiBatchStream);

	}

	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		StringBuffer result = new StringBuffer();

		int skippedRecordsCount = 0;
		MOLSAInformationProviderProcessChunkResult.recordsSkippedCount += skippedRecordsCount;
		result.append(MOLSAInformationProviderProcessChunkResult.recordsSkippedCount);
		MOLSAInformationProviderProcessChunkResult.recordsSkippedCount = 0;
		return result.toString();

	}

	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub

	}

	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID, MOLSAMoiDtls MOLSAMoiDtls)
			throws AppException, InformationalException {

		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();

		MOLSAMoiKey moiKey = new MOLSAMoiKey();
		moiKey.qid = String.valueOf(batchProcessingID.recordID);
		try {
			Person person = PersonFactory.newInstance();
			PersonSearchKey1 paramPersonSearchKey1 = new PersonSearchKey1();
			paramPersonSearchKey1.personSearchKey.referenceNumber = moiKey.qid;

			MOLSAMoi molsaMoi = MOLSAMoiFactory.newInstance();
			MOLSAMoiDtls molsaMoiDtls = molsaMoi.read(moiKey);

			PersonSearchDetailsResult personDetailsList = person
					.searchPerson(paramPersonSearchKey1);

			long concernRoleID = 0;
			for (PersonSearchDetails personDetails : personDetailsList.personSearchResult.dtlsList
					.items()) {
				concernRoleID = personDetails.concernRoleID;
			}

			// get the case details based on concernroleID and status
			CaseHeader caseHeader = CaseHeaderFactory.newInstance();
			ConcernRoleIDStatusCodeKey paramConcernRoleIDStatusCodeKey = new ConcernRoleIDStatusCodeKey();
			paramConcernRoleIDStatusCodeKey.dtls.concernRoleID = concernRoleID;
			paramConcernRoleIDStatusCodeKey.dtls.statusCode = CASESTATUS.OPEN;
			CaseHeaderDtlsList caseDtlsList = caseHeader
					.searchByConcernRoleID(paramConcernRoleIDStatusCodeKey);
			long integratedCaseID = 0;

			boolean result = false;
			String middleName = new String();

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

					ReadPersonKey paramReadPersonKey = new ReadPersonKey();
					paramReadPersonKey.maintainConcernRoleKey.concernRoleID = concernRoleID;
					ReadPersonDetails readPersonDetails = person
							.readPerson(paramReadPersonKey);

					// To change the gender code to SX1 and SX2 from 1 and 2
					String genderCode = new String();
					if ((molsaMoiDtls.sexCode == 1)) {
						genderCode = GENDER.MALE;
					} else if ((molsaMoiDtls.sexCode == 2)) {
						genderCode = GENDER.FEMALE;
					}

					// To concat the names given by the moi to check with
					// registration details
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

					ReadEvidenceDetails readEvidenceDetails = new ReadEvidenceDetails();
					ReadEvidenceDetails readEvidenceDetails2 = new ReadEvidenceDetails();
					// To read dob from birth and death evidence
					readEvidenceDetails = readCaseEvidenceDetails(
							integratedCaseID,
							CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
							caseParticipantRoleDetails.dtls.caseParticipantRoleID,
							idAndNameDetails.name);
					// To read gender details from gender evidence
					readEvidenceDetails2 = readCaseEvidenceDetails(
							integratedCaseID,
							CASEEVIDENCEEntry.GENDER,
							caseParticipantRoleDetails.dtls.caseParticipantRoleID,
							idAndNameDetails.name);

					// Compare the person dob details with moi dob details
					if (!readEvidenceDetails.dtls.equals(null)) {

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

						if (!dateStringInOriginalFormat
								.equals(readEvidenceDetails.dtls
										.getAttribute("dateOfBirth").getValue()
										.toString())) {
							result = true;
						}

					}

					// Compare the gender details with moi gender details
					if (!readEvidenceDetails2.dtls.equals(null)) {
						if (!genderCode.equals(readEvidenceDetails2.dtls
								.getAttribute("gender").getValue().toString()) ){
							result = true;
						}
					}

					// Compare the person name details with moi name details
					if (!readPersonDetails.personFurtherDetails.equals(null)) {

						if (!readPersonDetails.personFurtherDetails.otherForename
								.equals(middleName)) {
							result = true;
						}

						if (!readPersonDetails.personFurtherDetails.firstForename
								.equals(molsaMoiDtls.firstName_ar)) {
							result = true;
						}

						if (!readPersonDetails.personFurtherDetails.surname
								.equals(molsaMoiDtls.fifthName_ar)) {
							result = true;
						}
					}

					if ((!readPersonDetails.personFurtherDetails.equals(null))
							&& (!readEvidenceDetails.dtls.equals(null))
							&& (!readEvidenceDetails2.dtls.equals(null))) {

						// Update the batch run date on the MOI table if the
						// record
						MOLSAMoi molsaMoiData = MOLSAMoiFactory.newInstance();
						MOLSAMoiDtls molsaMoiDataDtls = molsaMoiData
								.read(moiKey);
						molsaMoiDataDtls.batchRunDate = Date.getCurrentDate();
						molsaMoiData.modify(moiKey, molsaMoiDataDtls);

						if (result == true) {
							String Name = idAndNameDetails.name;

							Notification notificationObj = NotificationFactory
									.newInstance();
							CreateStandardManualTaskDetails notificationStruct = new CreateStandardManualTaskDetails();

							StandardManualTaskDtls struct = new StandardManualTaskDtls();

							notificationStruct.concerningDtls.caseID = caseDtls.caseID;
							notificationStruct.concerningDtls.participantRoleID = caseParticipantRoleDetails.dtls.participantRoleID;
							notificationStruct.concerningDtls.caseParticipantRoleID = caseParticipantRoleDetails.dtls.caseParticipantRoleID;
							notificationStruct.concerningDtls.participantType = caseParticipantRoleDetails.dtls.participantRoleType;

							AppException message1 = new AppException(
									MOLSANOTIFICATION.MOI_UPDATED);
							message1.arg(caseDtls.caseReference);
							message1.arg(Name);

							notificationStruct.taskDtls.subject = message1
									.getMessage(TransactionInfo
											.getProgramLocale());
							struct.dtls = notificationStruct;
							notificationObj.sendCaseOwnerNotification(struct);
						}
					}

				}
			}
		} catch (Exception e) {
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			batchProcessingSkippedRecord.errorMessage = e.getMessage();
		}

		return batchProcessingSkippedRecord;

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
}