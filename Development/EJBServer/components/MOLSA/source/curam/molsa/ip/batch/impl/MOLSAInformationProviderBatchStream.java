package curam.molsa.ip.batch.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.ASSIGNEETYPE;
import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.FREQUENCYCODE;
import curam.codetable.GENDER;
import curam.codetable.INCOMETYPECODE;
import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKTYPE;
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
import curam.core.impl.EnvVars;
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
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.PersonSearchDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.sl.impl.CpDetailsAdaptor;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.GenericSLDataDetails;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.codetable.RESPONSETYPE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.ip.entity.fact.MOLSAInformationProviderTmpFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationProviderTmp;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpKey;
import curam.participant.impl.ConcernRoleDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DateTime;

/**
 * This class has the implementation for Information Provider Batch Stream which
 * would check evidence details with information provider table.
 * 
 */
@SuppressWarnings("restriction")
public class MOLSAInformationProviderBatchStream extends
		curam.molsa.ip.batch.base.MOLSAInformationProviderBatchStream {

  

  @Inject
  private CaseParticipantRoleDAO caseParticipantRoleDAO;
  
  @Inject
  private ConcernRoleDAO concernRoleDAO;
  
  /**
   * Constructor.
   */
  public MOLSAInformationProviderBatchStream() {
    super();
    GuiceWrapper.getInjector().injectMembers(this);
  }
	/**
	 * This method would call the stream helper class and takes Batch process
	 * stream key as input parameter.
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
		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_INFORMATION_PROVIDER;
			batchStreamHelper.runStream(batchProcessStreamKey,
					molsaInformationProviderBatchStream);
		}
	}

	/**
	 * This method keeps the count of the number of records processed and not
	 * processed.
	 * 
	 * @param skippedCasesCount
	 *            The number of cases skipped in this chunk
	 */
	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {

		StringBuffer result = new StringBuffer();
		// Initialise the skip count to 0
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
	 * This method implements the information provider batch functionality.
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
			@SuppressWarnings("unused")
			InformationalManager informationalManager = new InformationalManager();
			TransactionInfo.setInformationalManager();

			PersonSearchDetailsResult personDetailsList = person
					.searchPerson(paramPersonSearchKey1);
			long concernRoleID = 0;
			for (PersonSearchDetails personDetails : personDetailsList.personSearchResult.dtlsList
					.items()) {
				concernRoleID = personDetails.concernRoleID;
			}
			ReadEvidenceDetails readEvidenceDetails = new ReadEvidenceDetails();
		  // get the case details based on concernroleID and status
      List<curam.piwrapper.casemanager.impl.CaseParticipantRole>  caseParticipantRoleList = caseParticipantRoleDAO.listActiveByParticipant(concernRoleDAO.get(concernRoleID));
      
      boolean result = false;
      String middleName = new String();
      
      // loop through the cases and iterate through integrated case and
      // update the evidence
      for (final curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole : caseParticipantRoleList){
       if( caseParticipantRole.getCase().getCaseType().getCode().equalsIgnoreCase(CASETYPECODE.INTEGRATEDCASE)){
         if(caseParticipantRole.getType().getCode().equalsIgnoreCase(CASEPARTICIPANTROLETYPE.MEMBER) || caseParticipantRole.getType().getCode().equalsIgnoreCase(CASEPARTICIPANTROLETYPE.PRIMARY)){
		
					// Read the evidence and update the evidence based on the
					// response type
					if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.MARRIAGE)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.DIVORSE)) {
						readEvidenceDetails = readCaseEvidenceDetails(
						    caseParticipantRole.getCase().getID(),
								CASEEVIDENCEEntry.MARITALSTATUS,
								caseParticipantRole.getID(),
								caseParticipantRole.getConcernRole().getName());
						if (readEvidenceDetails.dtls != null) {
							result = modifyMaritalStatusEvidence(
									readEvidenceDetails,  caseParticipantRole.getCase().getID(),
									informationProviderTmpDtls);
							// Code to send task if evidence is modified
							if (result == true) {
								sendTaskToCaseOwner(caseParticipantRole.getCase().getID(),caseParticipantRole.getCase().getCaseReference(),
										CASEEVIDENCEEntry.MARITALSTATUS,
										caseParticipantRole.getConcernRole().getName());
								molsaInformationProviderTmp
										.remove(informationProviderTmpKey);
							}
						}

					} else if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.BIRTH)
							|| informationProviderTmpDtls.type
									.equalsIgnoreCase(RESPONSETYPE.DEATH)) {
						readEvidenceDetails = readCaseEvidenceDetails(
						    caseParticipantRole.getCase().getID(),
								CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
								caseParticipantRole.getID(),
								caseParticipantRole.getConcernRole().getName());
						if (readEvidenceDetails.dtls != null) {
							boolean result3 = modifyBirthDeathDetailsEvidence(
									readEvidenceDetails, caseParticipantRole.getCase().getID(),
									informationProviderTmpDtls);
							if (result3 == true) {
								// Code to send task if evidence is modified
								sendTaskToCaseOwner(caseParticipantRole.getCase().getID(),caseParticipantRole.getCase().getCaseReference(),
										CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
										caseParticipantRole.getConcernRole().getName());
								molsaInformationProviderTmp
										.remove(informationProviderTmpKey);
							}
						}

					} else if (informationProviderTmpDtls.type
							.equalsIgnoreCase(RESPONSETYPE.SCHOOL)) {
						readEvidenceDetails = readCaseEvidenceDetails(
						    caseParticipantRole.getCase().getID(),
								CASEEVIDENCEEntry.MOLSAEDUCATION,
								caseParticipantRole.getID(),
								caseParticipantRole.getConcernRole().getName());
						if (readEvidenceDetails.dtls != null) {
							boolean result1 = modifyEducationEvidence(
									readEvidenceDetails, caseParticipantRole.getCase().getID(),
									informationProviderTmpDtls);
							if (result1 == true) {
								// Code to send task if evidence is modified
								sendTaskToCaseOwner(caseParticipantRole.getCase().getID(),caseParticipantRole.getCase().getCaseReference(),
										CASEEVIDENCEEntry.MOLSAEDUCATION,
										caseParticipantRole.getConcernRole().getName());
								molsaInformationProviderTmp
										.remove(informationProviderTmpKey);
							}
						}

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
						    caseParticipantRole.getCase().getID(),
								CASEEVIDENCEEntry.INCOME,
								caseParticipantRole.getID(),
								caseParticipantRole.getConcernRole().getName());
						ReadEvidenceDetails readHHEvidenceDetails = new ReadEvidenceDetails();
						readHHEvidenceDetails = readCaseEvidenceDetails(
                caseParticipantRole.getCase().getID(),
                CASEEVIDENCEEntry.HEADOFHOUSE,
                caseParticipantRole.getID(),
                caseParticipantRole.getConcernRole().getName());
					  ReadEvidenceDetails readGenderEvidenceDetails = new ReadEvidenceDetails();
					  readGenderEvidenceDetails = readCaseEvidenceDetails(
                caseParticipantRole.getCase().getID(),
                CASEEVIDENCEEntry.GENDER,
                caseParticipantRole.getID(),
                caseParticipantRole.getConcernRole().getName());
							boolean result2 = modifyIncomeEvidence(readGenderEvidenceDetails,readHHEvidenceDetails,
									readEvidenceDetails, caseParticipantRole,
									informationProviderTmpDtls);
							// Code to send task if evidence is modified
							if (result2 == true) {
								sendTaskToCaseOwner(caseParticipantRole.getCase().getID(),caseParticipantRole.getCase().getCaseReference(),
										CASEEVIDENCEEntry.INCOME,
									  caseParticipantRole.getConcernRole().getName());
								molsaInformationProviderTmp
										.remove(informationProviderTmpKey);
							}
					}
				}
       }
			}
		} catch (Exception e) {
			batchProcessingSkippedRecord.recordID = batchProcessingID.recordID;
			batchProcessingSkippedRecord.errorMessage = e.getMessage();
			Trace.kTopLevelLogger.info("********  Processing  Failed ==> " + batchProcessingID.recordID + " " + e.getMessage());
		}
		return null;
	}

	/**
	 * This method updates Marital Status evidence based on the input from
	 * information provider table.
	 * 
	 * @param readEvidenceDetails
	 *            ReadEvidenceDetails
	 * @param caseID
	 *            long
	 * @param informationProviderTmpDtls
	 *            MOLSAInformationProviderTmpDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * @throws ParseException
	 * @return boolean
	 */

	public boolean modifyMaritalStatusEvidence(
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

		SimpleDateFormat originalFormatter = new SimpleDateFormat(
				MOLSAConstants.kdateRequired);
		
		String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
		
		//SimpleDateFormat newFormatter = new SimpleDateFormat(propertyDateFormat);

		// parsing date string using new format
		// pos = new ParsePosition(0);
		//java.util.Date dateFromString = newFormatter.parse(
				//dateStringInNewFormat, pos);
		java.util.Date dateFromString= informationProviderTmpDtls.receivedDate
		.addDays(-1).getCalendar().getTime();

		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		String dateCompare = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();
		java.util.Date ipDate = new SimpleDateFormat(propertyDateFormat)
				.parse(dateCompare);
		String providerDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(ipDate);

		String trDate = dynamicEvidenceDataDetails.getAttribute("startDate")
				.getValue().toString();
		java.util.Date tradeDate = new SimpleDateFormat(
				MOLSAConstants.kdateRequired).parse(trDate);
		String evidenceDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(tradeDate);
		// Compare the evidence date with the information provider date
		if (providerDate.compareTo(evidenceDate) > 0) {
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
					.setValue(dateStringInOriginalFormat);
			dynamicEvidenceDetails
					.setDescriptor(readEvidenceDetails.descriptor);
			dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
			evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

			//String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
			//		.toString();

			// parsing date string using new format
			//ParsePosition posNew = new ParsePosition(0);
			//java.util.Date dateFromStringNew = newFormatter.parse(
					//dateStringInNewFormatNew, posNew);
			java.util.Date dateFromStringNew =informationProviderTmpDtls.receivedDate.getCalendar().getTime();
			AppException message1 = new AppException(
					MOLSANOTIFICATION.MARITAL_COMMENTS);
			message1.arg(informationProviderTmpDtls.eventDate.toString());
			message1.arg(informationProviderTmpDtls.spouseQid);

			// Now you have a date object and you can convert it to the original
			// format
			String dateStringInOriginalFormatNew = originalFormatter
					.format(dateFromStringNew);
			dynamicEvidenceDataDetails.getAttribute(
					MOLSAConstants.maritalStatus).setValue(
					informationProviderTmpDtls.maritalStatus);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.startDate)
					.setValue(dateStringInOriginalFormatNew);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
					.setValue(MOLSAConstants.kZeroDate);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
					.setValue(message1.getLocalizedMessage());
			dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;
			evidenceServiceInterface.createEvidence(dynamicEvidenceDetails);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * This method updates Education evidence based on the input from
	 * information provider table.
	 * 
	 * @param readEvidenceDetails
	 *            ReadEvidenceDetails
	 * @param caseID
	 *            long
	 * @param informationProviderTmpDtls
	 *            MOLSAInformationProviderTmpDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * @return boolean
	 */
	private boolean modifyEducationEvidence(
			ReadEvidenceDetails readEvidenceDetails, long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException, ParseException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.MOLSAEDUCATION;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat(
				MOLSAConstants.kdateRequired);
		String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
		//SimpleDateFormat newFormatter = new SimpleDateFormat(
				//propertyDateFormat);

		// parsing date string using new format
		//ParsePosition pos = new ParsePosition(0);
		//java.util.Date dateFromString = newFormatter.parse(
				//dateStringInNewFormat, pos);
		java.util.Date dateFromString = informationProviderTmpDtls.receivedDate
		.addDays(-1).getCalendar().getTime();
		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		String dateCompare = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();
		java.util.Date ipDate = new SimpleDateFormat(propertyDateFormat)
				.parse(dateCompare);
		String providerDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(ipDate);

		String trDate = dynamicEvidenceDataDetails
				.getAttribute(MOLSAConstants.startDate).getValue().toString();
		java.util.Date tradeDate = new SimpleDateFormat(
				MOLSAConstants.kdateRequired).parse(trDate);
		String evidenceDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(tradeDate);
		// Check the evidence date with the information provider date.
		if (providerDate.compareTo(evidenceDate) > 0) {

			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
					.setValue(dateStringInOriginalFormat);
			dynamicEvidenceDetails
					.setDescriptor(readEvidenceDetails.descriptor);
			dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
			evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

			//String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
			//		.toString();

			// parsing date string using new format
			//ParsePosition posNew = new ParsePosition(0);
			//java.util.Date dateFromStringNew = newFormatter.parse(
					//dateStringInNewFormatNew, posNew);
			java.util.Date dateFromStringNew = informationProviderTmpDtls.receivedDate.getCalendar().getTime();
			AppException message1 = new AppException(
					MOLSANOTIFICATION.EDUCATION_COMMENTS);

			message1.arg(informationProviderTmpDtls.schoolName);

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
					.setValue(message1.getLocalizedMessage());

			dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;

			evidenceServiceInterface.createEvidence(dynamicEvidenceDetails);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * This method updates Income evidence based on the input from information
	 * provider table.
	 * 
	 * @param readEvidenceDetails
	 *            ReadEvidenceDetails
	 * @param caseID
	 *            long
	 * @param informationProviderTmpDtls
	 *            MOLSAInformationProviderTmpDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * @return boolean
	 */
	private boolean modifyIncomeEvidence(ReadEvidenceDetails readGenderEvidenceDetails,ReadEvidenceDetails readHHEvidenceDetails,
			ReadEvidenceDetails readEvidenceDetails, final curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException, ParseException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.INCOME;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat(
				MOLSAConstants.kdateRequired);
		String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
		//SimpleDateFormat newFormatter = new SimpleDateFormat(propertyDateFormat);

		// parsing date string using new format
		//ParsePosition pos = new ParsePosition(0);
		//java.util.Date dateFromString = newFormatter.parse(
			//	dateStringInNewFormat, pos);
		
		java.util.Date dateFromString = informationProviderTmpDtls.receivedDate
		.addDays(-1).getCalendar().getTime();
		
		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		String dateCompare = informationProviderTmpDtls.receivedDate
				.addDays(-1).toString();
		java.util.Date ipDate = new SimpleDateFormat(propertyDateFormat)
				.parse(dateCompare);
		String providerDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(ipDate);
		
		if (readEvidenceDetails.dtls != null) {
		String trDate = dynamicEvidenceDataDetails
				.getAttribute(MOLSAConstants.startDate).getValue().toString();
		java.util.Date tradeDate = new SimpleDateFormat(
				MOLSAConstants.kdateRequired).parse(trDate);
		String evidenceDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(tradeDate);
		// Check the evidence date with the information provider date.
		if (providerDate.compareTo(evidenceDate) > 0) {
			

			if ((dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.COMMERCIAL) && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.COMMERCALRECORDS))
			    || (dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.REAL_ESTATE) && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.REALESTATE))
			    || ((dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.FatherORHusbandPaidEmployment) || dynamicEvidenceDataDetails.getAttribute("incomeType").getValue().equals(INCOMETYPECODE.OtherHouseholdPaidEmployment)) && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.EMPLOYMENT))
			    || ((dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.FatherORHusbandPaidEmployment) || dynamicEvidenceDataDetails.getAttribute("incomeType").getValue().equals(INCOMETYPECODE.OtherHouseholdPaidEmployment))  && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.PRIVATESECTOREMPLOYMENT))
			    || ((dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.FatherORHusbandPaidEmployment) || dynamicEvidenceDataDetails.getAttribute("incomeType").getValue().equals(INCOMETYPECODE.OtherHouseholdPaidEmployment)) && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.GOVERNMENTEMPLOYMENT))
			    || ((dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kIncomeType).getValue().equals(INCOMETYPECODE.FatherORHusbandPaidEmployment) || dynamicEvidenceDataDetails.getAttribute("incomeType").getValue().equals(INCOMETYPECODE.OtherHouseholdPaidEmployment))  && informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.RETIREMENT)))
			{		
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
					.setValue(dateStringInOriginalFormat);
			dynamicEvidenceDetails
					.setDescriptor(readEvidenceDetails.descriptor);
			dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
			evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);

			}
		}
	}
		if(dynamicEvidenceDataDetails ==null){
		  dynamicEvidenceDataDetails = DynamicEvidenceDataDetailsFactory.newInstance(CASEEVIDENCE.INCOME, Date.getCurrentDate());
		}
		AppException message1 = new AppException(
        MOLSANOTIFICATION.INCOME_COMMENTS );
    message1.arg(informationProviderTmpDtls.amount);
			//String dateStringInNewFormatNew = informationProviderTmpDtls.receivedDate
					//.toString();

			// parsing date string using new format
			//ParsePosition posNew = new ParsePosition(0);
			
			//java.util.Date dateFromStringNew = newFormatter.parse(
					//dateStringInNewFormatNew, posNew);
			
			java.util.Date dateFromStringNew = informationProviderTmpDtls.receivedDate.getCalendar().getTime();

			// Now you have a date object and you can convert it to the original
			// format
			String dateStringInOriginalFormatNew = originalFormatter
					.format(dateFromStringNew);
			// set the details to create new evidence
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.startDate)
					.setValue(dateStringInOriginalFormatNew);
			dynamicEvidenceDataDetails
					.getAttribute(MOLSAConstants.amount)
					.setValue(String.valueOf(informationProviderTmpDtls.amount));
		if(informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.COMMERCALRECORDS))	{
			dynamicEvidenceDataDetails	
			 .getAttribute(MOLSAConstants.kIncomeType)
      .setValue(String.valueOf(INCOMETYPECODE.COMMERCIAL));
		}
		if(informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.REALESTATE)) {
      dynamicEvidenceDataDetails  
       .getAttribute(MOLSAConstants.kIncomeType)
      .setValue(String.valueOf(INCOMETYPECODE.REAL_ESTATE));
    }
		if(informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.RETIREMENT) 
		  ||  informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.EMPLOYMENT) 
		  ||  informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.PRIVATESECTOREMPLOYMENT)
		  ||  informationProviderTmpDtls.type.equalsIgnoreCase(RESPONSETYPE.GOVERNMENTEMPLOYMENT)) {
		  if (readHHEvidenceDetails.dtls != null && readGenderEvidenceDetails.dtls.getAttribute(MOLSAConstants.gender).getValue().equalsIgnoreCase(String.valueOf(GENDER.MALE))) {
      dynamicEvidenceDataDetails  
       .getAttribute(MOLSAConstants.kIncomeType)
      .setValue(String.valueOf(INCOMETYPECODE.FatherORHusbandPaidEmployment));
		  }
		  else{
		    dynamicEvidenceDataDetails  
	       .getAttribute(MOLSAConstants.kIncomeType)
	      .setValue(String.valueOf(INCOMETYPECODE.OtherHouseholdPaidEmployment));
		  }
    }
		
	  dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.kfrequency)
    .setValue(String.valueOf(FREQUENCYCODE.MONTHLY));
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.endDate)
					.setValue(MOLSAConstants.kZeroDate);
			dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
					.setValue(message1.getLocalizedMessage());
			dynamicEvidenceDetails.getCaseIdKey().caseID = caseParticipantRole.getCase().getID();
		  dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
		  dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
		  dynamicEvidenceDetails.getDescriptor().receivedDate = Date.getCurrentDate();
		  
		  CpDetailsAdaptor cpDetails = new CpDetailsAdaptor();
	    cpDetails.setCaseParticipantRoleID(caseParticipantRole.getID());
	    cpDetails.setParticipantRoleID(caseParticipantRole.getConcernRole().getID());
	    dynamicEvidenceDetails.addRelCp(MOLSADatastoreConst.kParticipant, cpDetails);
	   
			evidenceServiceInterface.createEvidence(dynamicEvidenceDetails);
			return true;
			
	}

	/**
	 * This method updates Birth and Death evidence based on the input from
	 * information provider table.
	 * 
	 * @param readEvidenceDetails
	 *            ReadEvidenceDetails
	 * @param caseID
	 *            long
	 * @param informationProviderTmpDtls
	 *            MOLSAInformationProviderTmpDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 * @return boolean
	 */

	private boolean modifyBirthDeathDetailsEvidence(
			ReadEvidenceDetails readEvidenceDetails, long caseID,
			MOLSAInformationProviderTmpDtls informationProviderTmpDtls)
			throws AppException, InformationalException, ParseException {

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;
		final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();

		String dateStringInNewFormat = informationProviderTmpDtls.eventDate
				.toString();

		SimpleDateFormat originalFormatter = new SimpleDateFormat(
				MOLSAConstants.kdateRequired);
		String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
		//SimpleDateFormat newFormatter = new SimpleDateFormat(propertyDateFormat);

		// parsing date string using new format
		//ParsePosition pos = new ParsePosition(0);
		//java.util.Date dateFromString = newFormatter.parse(
			//	dateStringInNewFormat, pos);
		java.util.Date dateFromString = informationProviderTmpDtls.eventDate.getCalendar().getTime();
		String dateCompare = informationProviderTmpDtls.eventDate.addDays(-1)
				.toString();
		java.util.Date ipDate = new SimpleDateFormat(propertyDateFormat)
				.parse(dateCompare);
		String providerDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(ipDate);

		String trDate = Date.getCurrentDate().toString();
		java.util.Date tradeDate = new SimpleDateFormat(propertyDateFormat)
				.parse(trDate);
		String evidenceDate = new SimpleDateFormat(MOLSAConstants.kdateIPbatch)
				.format(tradeDate);
		// Now you have a date object and you can convert it to the original
		// format
		String dateStringInOriginalFormat = originalFormatter
				.format(dateFromString);

		if (providerDate.compareTo(evidenceDate) < 0) {
			AppException message1 = new AppException(
					MOLSANOTIFICATION.BIRTH_COMMENTS);

			message1.arg(informationProviderTmpDtls.eventDate);

			AppException message2 = new AppException(
					MOLSANOTIFICATION.DEATH_COMMENTS);

			message2.arg(informationProviderTmpDtls.eventDate);

			// set the attribute value that needs to be changed and update the
			// evidence
			if (informationProviderTmpDtls.type
					.equalsIgnoreCase(RESPONSETYPE.BIRTH)) {
				dynamicEvidenceDataDetails.getAttribute(
						MOLSAConstants.dateOfBirth).setValue(
						dateStringInOriginalFormat);
				dynamicEvidenceDataDetails
						.getAttribute(MOLSAConstants.comments).setValue(
								message1.getLocalizedMessage());
				dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;

			} else if (informationProviderTmpDtls.type
					.equalsIgnoreCase(RESPONSETYPE.DEATH)) {
				dynamicEvidenceDataDetails.getAttribute(
						MOLSAConstants.dateOfDeath).setValue(
						dateStringInOriginalFormat);
				dynamicEvidenceDataDetails
						.getAttribute(MOLSAConstants.comments).setValue(
								message2.getLocalizedMessage());
				dynamicEvidenceDetails.getCaseIdKey().caseID = caseID;
			}
			dynamicEvidenceDetails
					.setDescriptor(readEvidenceDetails.descriptor);
			dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
			evidenceServiceInterface.modifyEvidence(dynamicEvidenceDetails);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * This method updates Education evidence based on the input from
	 * information provider table.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param caseParticipantRoleID
	 *            Long
	 * @param participant
	 *            String
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
				if (caseEvidence.equals(CASEEVIDENCEEntry.BIRTHDEATHDETAILS) || caseEvidence.equals(CASEEVIDENCEEntry.GENDER)) {
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
	 * This method sends notification to the case owner after update of evidence
	 * based on the input from information provider table.
	 * 
	 * @param caseDtls
	 *            CaseHeaderDtls
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param argName
	 *            String
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void sendTaskToCaseOwner(long caseID, String caseReference,
			final CASEEVIDENCEEntry caseEvidence, String argName)
			throws AppException, InformationalException {

		// Code to send task if evidence is modified
		final CaseIDDetails caseKey = new CaseIDDetails();
		caseKey.caseID = caseID;
		final CaseHeader caseHeader = CaseHeaderFactory.newInstance();
		final CaseOwnerAndTypeDetails ownerID = caseHeader
				.readOwnerAndType(caseKey);

		final OrgObjectLinkKey orgObjectLinkKey = new OrgObjectLinkKey();
		orgObjectLinkKey.orgObjectLinkID = ownerID.dtls.ownerOrgObjectLinkID;

		curam.core.sl.entity.intf.OrgObjectLink orgObjectLink = OrgObjectLinkFactory
				.newInstance();
		// Assign the case id and assigned to values to the task created to the
		// case owner
		final TaskCreateDetails taskCreateDetail = new TaskCreateDetails();
		taskCreateDetail.taskDetails.caseID = caseID;
		taskCreateDetail.taskDetails.assignedTo = String.valueOf(45010);
		taskCreateDetail.taskDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;
		String name = argName;
		AppException message1 = null;
		// To send notification if evidence is updated.
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
		message1.arg(caseReference);
		message1.arg(name);

		String propertyDateFormat =Configuration.getProperty(EnvVars.ENV_IPMOI_DATE_FORMAT);
		final SimpleDateFormat sdf = new SimpleDateFormat(propertyDateFormat);
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
				.startProcessInV3CompatibilityMode(MOLSAConstants.kmanualCase,
						enactmentStructs);
	}

}
