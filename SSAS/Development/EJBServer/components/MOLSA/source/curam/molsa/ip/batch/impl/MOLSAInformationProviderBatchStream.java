package curam.molsa.ip.batch.impl;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.CaseHeader;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.CaseIDDetails;
import curam.core.facade.struct.CaseOwnerAndTypeDetails;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.facade.struct.TaskCreateDetails;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.sl.entity.fact.OrgObjectLinkFactory;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.OrgObjectLinkKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.fact.TaskManagementUtilityFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.intf.TaskManagementUtility;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.CaseIDTypeCodeKey;
import curam.core.sl.struct.CaseParticipantRoleFullDetails1;
import curam.core.sl.struct.DateTimeInSecondsKey;
import curam.core.sl.struct.DeadlineDuration;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.ReturnEvidenceDetails;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.PersonSearchDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.GenericSLDataDetails;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.codetable.RESPONSETYPE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.ip.entity.fact.MOLSAInformationProviderTmpFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationProviderTmp;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DateTime;

/**
 * This class will maintain Information Provider Batch Stream.
 * 
 */
public class MOLSAInformationProviderBatchStream extends
		curam.molsa.ip.batch.base.MOLSAInformationProviderBatchStream {

	/**
	 * This method calls the runStream to process the record
	 * 
	 * @param batchProcessStreamKey
	 * 
	 */
	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {

		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSAInformationProviderBatchStreamWrapper molsaInformationProviderBatchStream = new MOLSAInformationProviderBatchStreamWrapper(
				this);
		SecurityImplementationFactory.register();
		if (batchProcessStreamKey.instanceID.length() == 0)
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_INFORMATION_PROVIDER;
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaInformationProviderBatchStream);

	}

	/**
	 * This method returns the result of processing this chunk as a string
	 * 
	 * @param skippedCasesCount
	 *            The number of cases skipped in this chunk
	 */
	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
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
		// MOLSA does not need this implementation

	}

	/**
	 * This method updates the evidence based on the temp table record.
	 * 
	 * @param batchProcessingID
	 *            The details of the case to be processed
	 * @param informationProviderTmpDtls
	 *            The details of the temp table record
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException {

		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();
		MOLSAInformationProviderTmp molsaInformationProviderTmp = MOLSAInformationProviderTmpFactory
				.newInstance();
		MOLSAInformationProviderTmpKey informationProviderTmpKey = new MOLSAInformationProviderTmpKey();
		informationProviderTmpKey.informationProviderTmpID = batchProcessingID.recordID;

		try {
			informationProviderTmpDtls = molsaInformationProviderTmp
					.read(informationProviderTmpKey);
			// get the concernroleID based on QID
			Person person = PersonFactory.newInstance();
			PersonSearchKey1 paramPersonSearchKey1 = new PersonSearchKey1();
			paramPersonSearchKey1.personSearchKey.referenceNumber = informationProviderTmpDtls.qid;
			InformationalManager informationalManager = new InformationalManager();
			TransactionInfo.setInformationalManager();

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
			ReadEvidenceDetails readEvidenceDetails = new ReadEvidenceDetails();

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

					// Read the evidence and update the evidence based on the
					// response type
					if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.MARRIAGE)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.DIVORSE)) {
						readEvidenceDetails = readCaseEvidenceDetails(
								integratedCaseID,
								CASEEVIDENCEEntry.MARITALSTATUS,
								caseParticipantRoleDetails.dtls.caseParticipantRoleID,
								idAndNameDetails.name);
						if (readEvidenceDetails.dtls != null)

							modifyMaritalStatusEvidence(readEvidenceDetails,
									integratedCaseID,
									informationProviderTmpDtls);
						// Code to send task if evidence is modified
						sendTaskToCaseOwner(caseDtls,
								CASEEVIDENCEEntry.MARITALSTATUS,
								idAndNameDetails.name);

					} else if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.BIRTH)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.DEATH)) {
						readEvidenceDetails = readCaseEvidenceDetails(
								integratedCaseID,
								CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
								caseParticipantRoleDetails.dtls.caseParticipantRoleID,
								idAndNameDetails.name);
						if (readEvidenceDetails.dtls != null)
							modifyBirthDeathDetailsEvidence(
									readEvidenceDetails, integratedCaseID,
									informationProviderTmpDtls);

						// Code to send task if evidence is modified
						sendTaskToCaseOwner(caseDtls,
								CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
								idAndNameDetails.name);

					} else if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.SCHOOL)) {
						readEvidenceDetails = readCaseEvidenceDetails(
								integratedCaseID,
								CASEEVIDENCEEntry.MOLSAEDUCATION,
								caseParticipantRoleDetails.dtls.caseParticipantRoleID,
								idAndNameDetails.name);
						if (readEvidenceDetails.dtls != null)
							modifyEducationEvidence(readEvidenceDetails,
									integratedCaseID,
									informationProviderTmpDtls);

						// Code to send task if evidence is modified
						sendTaskToCaseOwner(caseDtls,
								CASEEVIDENCEEntry.MOLSAEDUCATION,
								idAndNameDetails.name);

					} else if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.COMMERCALRECORDS)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.EMPLOYMENT)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.GOVERNMENTEMPLOYMENT)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.PRIVATESECTOREMPLOYMENT)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.REALESTATE)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.RETIREMENT)) {
						readEvidenceDetails = readCaseEvidenceDetails(
								integratedCaseID,
								CASEEVIDENCEEntry.INCOME,
								caseParticipantRoleDetails.dtls.caseParticipantRoleID,
								idAndNameDetails.name);
						if (readEvidenceDetails.dtls != null)
							modifyIncomeEvidence(readEvidenceDetails,
									integratedCaseID,
									informationProviderTmpDtls);

						// Code to send task if evidence is modified
						sendTaskToCaseOwner(caseDtls,
								CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
								idAndNameDetails.name);
					}
					molsaInformationProviderTmp
							.remove(informationProviderTmpKey);
				}
			}
		} catch (Exception e) {
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			batchProcessingSkippedRecord.errorMessage = e.getMessage();
		}
		return batchProcessingSkippedRecord;
	}

	/**
	 * This Method updates Evidenc End Date.
	 * 
	 * @param readEvidenceDetails
	 * @param caseID
	 * @param informationProviderTmpDtls
	 * @return list of request
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * @throws ParseException
	 */
	public void modifyMaritalStatusEvidence(
			ReadEvidenceDetails readEvidenceDetails, long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException, ParseException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();

		evidenceTypeKey.evidenceType = CASEEVIDENCE.MARITALSTATUS;
		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MM/dd/yyyy");

		// parsing date string using new format
		ParsePosition pos = new ParsePosition(0);
		java.util.Date dateFromString = newFormatter.parse(
				dateStringInNewFormat, pos);

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(dateStringInOriginalFormat);
		dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
		dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
		evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

		String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
				.toString();

		// parsing date string using new format
		ParsePosition posNew = new ParsePosition(0);
		java.util.Date dateFromStringNew = newFormatter.parse(
				dateStringInNewFormatNew, posNew);

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormatNew = originalFormatter
				.format(dateFromStringNew);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.maritalStatus)
				.setValue(informationProviderTmpDtls.maritalStatus);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.startDate)
				.setValue(dateStringInOriginalFormatNew);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(MOLSAConstants.kZeroDate);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
				.setValue(
						"CD Response" + "\n" + "Event Date - "
								+ informationProviderTmpDtls.eventDate + "\n"
								+ "Spouse QID - "
								+ informationProviderTmpDtls.spouseQid);
		dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;
		final ReturnEvidenceDetails returnEvidenceDetails = evidenceServiceInterface
				.createEvidence(dynamicEvidenceDetails);
	}

	/**
	 * This Method update education evidence.
	 * 
	 * @param readEvidenceDetails
	 * @param caseID
	 * @param informationProviderTmpDtls
	 * @return list of request
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private void modifyEducationEvidence(
			ReadEvidenceDetails readEvidenceDetails, long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.MOLSAEDUCATION;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MM/dd/yyyy");

		// parsing date string using new format
		ParsePosition pos = new ParsePosition(0);
		java.util.Date dateFromString = newFormatter.parse(
				dateStringInNewFormat, pos);
		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		// dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate).setValue(informationProviderTmpDtls.receivedDate.toString());
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(dateStringInOriginalFormat);
		dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
		dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
		evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

		String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
				.toString();

		// parsing date string using new format
		ParsePosition posNew = new ParsePosition(0);
		java.util.Date dateFromStringNew = newFormatter.parse(
				dateStringInNewFormatNew, posNew);

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormatNew = originalFormatter
				.format(dateFromStringNew);
		// set the details to create new evidence
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.startDate)
				.setValue(dateStringInOriginalFormatNew);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(MOLSAConstants.kZeroDate);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
				.setValue(
						"CD Response" + "\n" + "School Name is - "
								+ informationProviderTmpDtls.schoolName);
		dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;

		final ReturnEvidenceDetails returnEvidenceDetails = evidenceServiceInterface
				.createEvidence(dynamicEvidenceDetails);
	}

	/**
	 * This Method update income evidence.
	 * 
	 * @param readEvidenceDetails
	 * @param caseID
	 * @param informationProviderTmpDtls
	 * @return list of request
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private void modifyIncomeEvidence(ReadEvidenceDetails readEvidenceDetails,
			long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.INCOME;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MM/dd/yyyy");

		// parsing date string using new format
		ParsePosition pos = new ParsePosition(0);
		java.util.Date dateFromString = newFormatter.parse(
				dateStringInNewFormat, pos);
		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		// dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate).setValue(informationProviderTmpDtls.receivedDate.toString());
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(dateStringInOriginalFormat);
		dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
		dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
		evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

		String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
				.toString();

		// parsing date string using new format
		ParsePosition posNew = new ParsePosition(0);
		java.util.Date dateFromStringNew = newFormatter.parse(
				dateStringInNewFormatNew, posNew);

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormatNew = originalFormatter
				.format(dateFromStringNew);
		// set the details to create new evidence
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.startDate)
				.setValue(dateStringInOriginalFormatNew);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
				.setValue(MOLSAConstants.kZeroDate);
		dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
				.setValue(
						"CD Response" + "\n" + "Income amount is - "
								+ informationProviderTmpDtls.amount);
		dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;

		final ReturnEvidenceDetails returnEvidenceDetails = evidenceServiceInterface
				.createEvidence(dynamicEvidenceDetails);
	}

	/**
	 * This Method update birthanddeathdetails evidence.
	 * 
	 * @param readEvidenceDetails
	 * @param caseID
	 * @param informationProviderTmpDtls
	 * @return list of request
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private void modifyBirthDeathDetailsEvidence(
			ReadEvidenceDetails readEvidenceDetails, long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.eventDate
				.toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MM/dd/yyyy");

		// parsing date string using new format
		ParsePosition pos = new ParsePosition(0);
		java.util.Date dateFromString = newFormatter.parse(
				dateStringInNewFormat, pos);

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		// set the attribute value that needs to be changed and update the
		// evidence
		if (informationProviderTmpDtls.type
				.equalsIgnoreCase(RESPONSETYPE.BIRTH)) {
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.dateOfBirth)
					.setValue(dateStringInOriginalFormat);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
					.setValue(
							"CD Response" + "\n" + "Date of birth is - "
									+ informationProviderTmpDtls.eventDate);
			dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;

		} else if (informationProviderTmpDtls.type
				.equalsIgnoreCase(RESPONSETYPE.DEATH)) {
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.dateOfDeath)
					.setValue(dateStringInOriginalFormat);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
					.setValue(
							"CD Response" + "\n" + "Date of death is - "
									+ informationProviderTmpDtls.eventDate);
			dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;
		}
		dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
		dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
		evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

	}

	/**
	 * This Method update education evidence.
	 * 
	 * @param caseID
	 * @param caseEvidence
	 * @param caseParticipantRoleID
	 * @param participant
	 * @return list of request
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

	/**
	 * This Method to send task to case owner.
	 * 
	 * @param caseDtls
	 * @param caseEvidence
	 * @param participant
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void sendTaskToCaseOwner(CaseHeaderDtls caseDtls,
			final CASEEVIDENCEEntry caseEvidence, String name)
			throws AppException, InformationalException {
		// Code to send task if evidence is modified

		final CaseIDDetails caseKey = new CaseIDDetails();
		caseKey.caseID = caseDtls.caseID;
		final CaseHeader caseHeader = CaseHeaderFactory.newInstance();
		final CaseOwnerAndTypeDetails ownerID = caseHeader
				.readOwnerAndType(caseKey);

		final OrgObjectLinkKey orgObjectLinkKey = new OrgObjectLinkKey();
		orgObjectLinkKey.orgObjectLinkID = ownerID.dtls.ownerOrgObjectLinkID;

		curam.core.sl.entity.intf.OrgObjectLink orgObjectLink = OrgObjectLinkFactory
				.newInstance();

		final TaskCreateDetails taskCreateDetail = new TaskCreateDetails();
		taskCreateDetail.taskDetails.caseID = caseDtls.caseID;
		taskCreateDetail.taskDetails.assignedTo = orgObjectLink
				.read(orgObjectLinkKey).userName;
		taskCreateDetail.taskDetails.assigneeType = curam.codetable.ASSIGNEETYPE.USER;
		String Name = name;
		AppException message1 = null;
		if (caseEvidence.equals(CASEEVIDENCEEntry.MARITALSTATUS)) {
			message1 = new AppException(
					MOLSANOTIFICATION.EVIDENCE_MARITALSTATUS_UPDATED);

		} else if (caseEvidence.equals(CASEEVIDENCEEntry.BIRTHDEATHDETAILS)) {
			message1 = new AppException(MOLSANOTIFICATION.BIRTHANDDEATH_UPDATED);

		} else if (caseEvidence.equals(CASEEVIDENCEEntry.MOLSAEDUCATION)) {
			message1 = new AppException(
					MOLSANOTIFICATION.EVIDENCE_EDUCATION_UPDATED);
		} else if (caseEvidence.equals(CASEEVIDENCEEntry.INCOME)) {
			message1 = new AppException(MOLSANOTIFICATION.INCOME_UPDATED);
		}
		message1.arg(caseDtls.caseReference);
		message1.arg(Name);

		final SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		message1.arg(sdf.format(Date.getCurrentDate().getCalendar().getTime()));
		taskCreateDetail.taskDetails.subject = message1.getMessage();

		final DeadlineDuration deadlineDuration = new DeadlineDuration();
		final DateTimeInSecondsKey dateTimeInSecondsKey = new DateTimeInSecondsKey();
		final TaskManagementUtility taskManagementUtilityObj = TaskManagementUtilityFactory
				.newInstance();
		dateTimeInSecondsKey.dateTime = DateTime.kZeroDateTime;
		deadlineDuration.deadlineDuration = taskManagementUtilityObj
				.convertDateTimeToSeconds(dateTimeInSecondsKey).seconds;
		// Create the list we will pass to the enactment service.
		final List<Object> enactmentStructs = new ArrayList<Object>();
		enactmentStructs.add(taskCreateDetail.taskDetails);
		enactmentStructs.add(deadlineDuration);
		curam.util.workflow.impl.EnactmentService
				.startProcessInV3CompatibilityMode("MANUALCASE",
						enactmentStructs);
	}

}
