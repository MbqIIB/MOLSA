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
import curam.codetable.TASKPRIORITY;
import curam.codetable.TASKTYPE;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.CaseHeader;
import curam.core.facade.intf.Person;
import curam.core.facade.struct.CaseIDDetails;
import curam.core.facade.struct.CaseOwnerAndTypeDetails;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.facade.struct.PersonDetails;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.facade.struct.TaskCreateDetails;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.sl.entity.fact.OrgObjectLinkFactory;
import curam.core.sl.entity.struct.CaseIDAndParticipantRoleIDDetails;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.OrgObjectLinkKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.entity.struct.WorkQueueIDAndAdministratorUserNameKey;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.fact.TaskManagementUtilityFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
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
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
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
import curam.molsa.codetable.MOLSAREQUESTSTATUS;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.codetable.MOLSASMSMessageType;
import curam.molsa.codetable.RESPONSETYPE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.ip.entity.fact.MOLSAInformationRequestFactory;
import curam.molsa.ip.entity.fact.MOLSAInformationResponseFactory;
import curam.molsa.ip.entity.intf.MOLSAInformationRequest;
import curam.molsa.ip.entity.intf.MOLSAInformationResponse;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationRequestKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtls;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseDtlsList;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKey;
import curam.molsa.ip.entity.struct.MOLSAInformationResponseKeyStruct1;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.participant.impl.ConcernRoleDAO;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.struct.ConcernRoleIDKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.exception.RecordNotFoundException;
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
public class MOLSATrackResponseBatchStream extends
		curam.molsa.ip.batch.base.MOLSATrackResponseBatchStream {

	 @Inject
	  private CaseParticipantRoleDAO caseParticipantRoleDAO;
	  
	  @Inject
	  private ConcernRoleDAO concernRoleDAO;
	  
	  

  
  /**
   * Constructor.
   */
  public MOLSATrackResponseBatchStream() {
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
		MOLSATrackResponseBatchStreamWrapper molsaTrackResponseBatchStream = new MOLSATrackResponseBatchStreamWrapper(
				this);
		SecurityImplementationFactory.register();
		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_TRACKRESPONSE;
			batchStreamHelper.runStream(batchProcessStreamKey,
					molsaTrackResponseBatchStream);
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
			BatchProcessingID batchProcessingID)
			throws AppException, InformationalException {

		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();
		MOLSAInformationRequest molsaInformationRequest = MOLSAInformationRequestFactory
				.newInstance();
		MOLSAInformationRequestDtls informationRequestDtls = new MOLSAInformationRequestDtls();
		MOLSAInformationRequestKey informationRequestKey = new MOLSAInformationRequestKey();
		informationRequestKey.informationRequestID = batchProcessingID.recordID;
		Date sysDate = TransactionInfo.getSystemDate();
		
		try {
			informationRequestDtls = molsaInformationRequest.read(informationRequestKey);
			CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();
			caseParticipantRoleKey.caseParticipantRoleID = informationRequestDtls.caseParticipantRoleID;
			CaseIDAndParticipantRoleIDDetails caseIDAndParticipantRoleIDDetails = CaseParticipantRoleFactory.newInstance().readCaseIDandParticipantID(caseParticipantRoleKey);
			ConcernRoleKey concernRoleKey = new ConcernRoleKey();
			concernRoleKey.concernRoleID = caseIDAndParticipantRoleIDDetails.participantRoleID;
			ConcernRoleDtls concernRoleDtls = ConcernRoleFactory.newInstance().read(concernRoleKey);
						
			int noOfDaysPassedAfterRequest = informationRequestDtls.requestDate.subtract(sysDate);
			if(informationRequestDtls.requestStatus.equals(MOLSAREQUESTSTATUS.COMPLETED)){
				sendTask(caseIDAndParticipantRoleIDDetails.caseID, 45009, concernRoleDtls.concernRoleID, informationRequestDtls.createdBy);
			}else{		
				curam.core.facade.struct.ConcernRoleIDKey key = new curam.core.facade.struct.ConcernRoleIDKey();
				key.concernRoleID = concernRoleDtls.concernRoleID;
				PersonDetails personDetails = PersonFactory.newInstance().readPersonDetails(key);
					
				if (personDetails.dtls != null) {
					//String trDate = readEvidenceDetails.dtls.getAttribute("dateOfBirth").getValue().toString();					
					Date birthDate = personDetails.dtls.dateOfBirth;					
					CaseIDAndEvidenceTypeKey caseIDAndEvidenceTypeKey = new CaseIDAndEvidenceTypeKey();
					boolean disabled = false;
			        caseIDAndEvidenceTypeKey.caseID = caseIDAndParticipantRoleIDDetails.caseID;
			        caseIDAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.HANDICAPPED;

			        EvidenceDescriptorDtlsList evidenceDescriptorDtlsList = EvidenceDescriptorFactory.newInstance().readByCaseIDAndEvidenceType(caseIDAndEvidenceTypeKey);
			        for (EvidenceDescriptorDtls dtls : evidenceDescriptorDtlsList.dtls){
			        	if(dtls.statusCode == "EDS1"){
			        		disabled = true;
			        	}
			        }

					if(sysDate.subtract(birthDate)/365 > 60 || disabled){
					if(noOfDaysPassedAfterRequest == 76){
						sendTask(caseIDAndParticipantRoleIDDetails.caseID, 45013, concernRoleDtls.concernRoleID, informationRequestDtls.createdBy);
					}else if (noOfDaysPassedAfterRequest == 90){
						sendSMS(concernRoleDtls.concernRoleID);
					}								
					
					}else if(noOfDaysPassedAfterRequest == 31){
						sendTask(caseIDAndParticipantRoleIDDetails.caseID, 45013, concernRoleDtls.concernRoleID, informationRequestDtls.createdBy);
					}else if (noOfDaysPassedAfterRequest == 45){
						sendSMS(concernRoleDtls.concernRoleID);
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
	 * This method sends task to respective workqueue
	 * 
	 * @param long caseID
	 * @param long workQueueID
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void sendTask(long caseID, long workQueueID, long concernRoleID, String comments)
			throws AppException, InformationalException {

		// Code to send task if evidence is modified
		final CaseIDDetails caseKey = new CaseIDDetails();
		caseKey.caseID = caseID;
		
		// Assign the case id and assigned to values to the task created to the
		// case owner
		final TaskCreateDetails taskCreateDetail = new TaskCreateDetails();
		taskCreateDetail.taskDetails.caseID = caseID;
		taskCreateDetail.taskDetails.assignedTo = String.valueOf(workQueueID);
		taskCreateDetail.taskDetails.assigneeType = TARGETITEMTYPE.WORKQUEUE;
		taskCreateDetail.taskDetails.participantRoleID = concernRoleID;
		taskCreateDetail.taskDetails.comments = comments;
		
		
		AppException message1 = null;
		if(workQueueID == 45009){
			message1 = new AppException(MOLSANOTIFICATION.TASK_RESPONSE_RECEIVED);
		}else if (workQueueID == 45013){
			message1 = new AppException(MOLSANOTIFICATION.TASK_RESPONSE_NOT_RECEIVED);
		}
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
				.startProcessInV3CompatibilityMode("MOLSAINFORMATIONREQUESTRESPONSETASK",
						enactmentStructs);
	}
	
	
	/**
	 * This method sends SMS
	 * 
	 * @param long concernRoleID
	 * 
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void sendSMS(long concernRoleID)
			throws AppException, InformationalException {

		curam.molsa.sms.sl.intf.MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory
				.newInstance();
		curam.molsa.sms.sl.struct.MOLSAMessageTextKey molsaMessageTextKey = new curam.molsa.sms.sl.struct.MOLSAMessageTextKey();
		molsaMessageTextKey.dtls.category = MOLSASMSMessageType.NOTIFICATION;
		molsaMessageTextKey.dtls.template = MOLSASMSMESSAGETEMPLATE.MISSINGRESPONSE;
		curam.molsa.sms.sl.struct.MOLSAMessageText messageText = molsasmsUtilObj
				.getSMSMessageText(molsaMessageTextKey);
		MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
		// Set the message details.
		concernRoleListAndMessageTextDetails.dtls.smsMessageText = messageText.dtls.smsMessageText;
		concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
				.valueOf(concernRoleID);
		// Pointing to the message template.
		concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.MISSINGRESPONSE;
		molsasmsUtilObj
				.sendSMS(concernRoleListAndMessageTextDetails);
	}


}
