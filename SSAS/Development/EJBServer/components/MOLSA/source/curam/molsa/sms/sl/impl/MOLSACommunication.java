package curam.molsa.sms.sl.impl;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASETRANSACTIONEVENTS;
import curam.codetable.COMMUNICATIONFORMAT;
import curam.codetable.COMMUNICATIONSTATUS;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.LOCATIONACCESSTYPE;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.ConcernRolePhoneNumberFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.DataBasedSecurity;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.CaseHeader;
import curam.core.intf.ConcernRole;
import curam.core.sl.fact.ClientMergeFactory;
import curam.core.sl.fact.CommunicationFactory;
import curam.core.sl.impl.CaseTransactionLogIntf;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.ClientMerge;
import curam.core.sl.struct.CheckSecurityCaseIDKey;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.ParticipantSecurityCheckKey;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseIDConcernRoleID;
import curam.core.struct.CommunicationContactKey;
import curam.core.struct.CommunicationDetails;
import curam.core.struct.ConcernRoleCommKeyOut;
import curam.core.struct.ConcernRoleCommunicationDtls;
import curam.core.struct.ConcernRoleDtlsList;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRoleNameDetails;
import curam.core.struct.ConcernRolePhoneNumberDtls;
import curam.core.struct.ConcernRolePhoneNumberDtlsList;
import curam.core.struct.CuramInd;
import curam.core.struct.DataBasedSecurityResult;
import curam.core.struct.MaintainCommunicationKey;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.sms.sl.struct.SMSCommDetails;
import curam.participant.impl.PhoneNumber;
import curam.participant.impl.PhoneNumberDAO;
import curam.pdc.fact.PDCUtilFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.CodeTableItemIdentifier;
import curam.util.type.Date;

public class MOLSACommunication {

	public MOLSACommunication() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	@Inject
	protected Provider<CaseTransactionLogIntf> caseTransactionLogProvider;
	@Inject
	protected PhoneNumberDAO phoneNumberDAO;

	public ConcernRoleCommKeyOut createSMSReturningID(SMSCommDetails smsDetails)
			throws AppException, InformationalException {
		final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		// Client merge manipulation variables
		final ClientMerge clientMergeObj = ClientMergeFactory.newInstance();
		CuramInd curamInd;

		// Validations
		// Security Checks
		final ConcernRoleCommunicationDtls concernRoleCommunicationDtls = new ConcernRoleCommunicationDtls();

		concernRoleCommunicationDtls.concernRoleID = smsDetails.correspondentParticipantRoleID;
		// END, CR00183398

		if (CuramConst.gkZero != smsDetails.caseID) {
			concernRoleCommunicationDtls.caseID = smsDetails.caseID;
		}

		performSecurityChecks(concernRoleCommunicationDtls);

		// Only apply validation for participant communications
		if (0 == smsDetails.caseID) {
			// Set the concern role key
			concernRoleKey.concernRoleID = smsDetails.correspondentParticipantRoleID;

			// Check if the concern role has been marked as a duplicate
			curamInd = clientMergeObj.isConcernRoleDuplicate(concernRoleKey);

			// If the concern role is a duplicate, throw an exception
			if (curamInd.statusInd) {

				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.throwWithLookup(
								new AppException(
										curam.message.BPOCOMMUNICATION.ERR_COMM_XRV_DUPLICATE_CLIENT_CREATE),
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								6);
			}
		}

		if (smsDetails.caseID != 0) {

			final CaseIDConcernRoleID caseIDConcernRoleID = new CaseIDConcernRoleID();

			// CaseHeader object and struct
			final CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
			final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

			// ReadParticipantRoleIDDetails struct

			caseHeaderKey.caseID = smsDetails.caseID;

			caseIDConcernRoleID.caseID = smsDetails.caseID;
			caseIDConcernRoleID.concernRoleID = smsDetails.clientParticipantRoleID;

			concernRoleKey.concernRoleID = smsDetails.clientParticipantRoleID;

			// Check if the concern role has been marked as a duplicate
			curamInd = clientMergeObj.isConcernRoleDuplicate(concernRoleKey);

		}

		final CommunicationDetails communicationDetails = new CommunicationDetails();
		final CommunicationContactKey communicationContactKey = new CommunicationContactKey();

		communicationDetails.assign(smsDetails);

		communicationDetails.phoneNumber = smsDetails.phoneNumber;
		final curam.core.struct.MaintainCommunicationKey commKey = new curam.core.struct.MaintainCommunicationKey();

		// Set up communication details struct
		communicationDetails.methodTypeCode = curam.codetable.COMMUNICATIONMETHOD.PHONE;
		communicationDetails.communicationFormat = COMMUNICATIONFORMAT.SMS;
		communicationDetails.concernRoleID = smsDetails.clientParticipantRoleID;
		communicationDetails.subjectText = smsDetails.subject;
		communicationDetails.communicationText = smsDetails.smsText;
		communicationDetails.correspondentTypeCode = smsDetails.correspondentType;
		communicationDetails.communicationStatus = smsDetails.communicationStatus;
		communicationDetails.caseID = smsDetails.caseID;
		communicationDetails.phoneNumber = smsDetails.phoneNumber;
		// populate the user name
		communicationDetails.userName = curam.util.transaction.TransactionInfo
				.getProgramUser();

		// populate the communication key and the communication contact key
		commKey.caseID = smsDetails.caseID;
		commKey.concernRoleID = smsDetails.clientParticipantRoleID;
		ConcernRoleKey roleKey = new ConcernRoleKey();
		roleKey.concernRoleID = smsDetails.clientParticipantRoleID;
		long phNumberID = 0l;
		String phNumber = smsDetails.phoneNumber;
		PhoneNumber retrievedPhNumber = null;
		ConcernRolePhoneNumberDtlsList concernRolePhoneNumberDtlsList = ConcernRolePhoneNumberFactory
				.newInstance().searchByConcernRole(roleKey);

		for (ConcernRolePhoneNumberDtls concernRolePhoneNumberDtls : concernRolePhoneNumberDtlsList.dtls) {
			retrievedPhNumber = phoneNumberDAO
					.get(concernRolePhoneNumberDtls.phoneNumberID);
			if(!phNumber.equals("")){
			if (Long.parseLong(phNumber) == Long.parseLong(retrievedPhNumber
					.getNumber())) {
				phNumberID = concernRolePhoneNumberDtls.phoneNumberID;
			}
			}
		}
		communicationContactKey.phoneNumberID = phNumberID;
		// Insert new communication entry
		final ConcernRoleCommKeyOut concernRoleCommKeyOut = insertCommDetails(
				commKey, communicationDetails, communicationContactKey);

		if (smsDetails.caseID != 0) {
			// Log Transaction Details

			final CodeTableItemIdentifier codeTableItemIdentifier = new CodeTableItemIdentifier(
					COMMUNICATIONFORMAT.TABLENAME, COMMUNICATIONFORMAT.SMS);

			final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();

			concernRoleKey.concernRoleID = smsDetails.clientParticipantRoleID;

			final ConcernRoleNameDetails correspondentConcernRoleName = concernRoleObj
					.readConcernRoleName(concernRoleKey);

			final LocalisableString description = new LocalisableString(
					MOLSASMSSERVICE.SMS_COMMUNICATION_INSERTED).arg(
					codeTableItemIdentifier).arg(
					correspondentConcernRoleName.concernRoleName);

			caseTransactionLogProvider.get().recordCaseTransaction(
					CASETRANSACTIONEVENTS.COMMUNICATION_SENT, description,
					smsDetails.caseID, concernRoleCommKeyOut.communicationID);

		}

		return concernRoleCommKeyOut;
	}

	/**
	 * Checks if the user has security rights over the case or the participant
	 * for which the communication has been created.
	 * 
	 * @curam .util.type.AccessLevel(curam.util.type.AccessLevelType.INTERNAL)
	 * @param concernRoleCommunicationDtls
	 *            A Struct containing the details of the communication.
	 * 
	 *            #DOC_END#
	 */
	protected void performSecurityChecks(
			final ConcernRoleCommunicationDtls concernRoleCommunicationDtls)
			throws AppException, InformationalException {

		if (concernRoleCommunicationDtls.caseID != 0) {
			// Set key to check case security
			final CheckSecurityCaseIDKey checkSecurityCaseIDKey = new CheckSecurityCaseIDKey();

			checkSecurityCaseIDKey.caseID = concernRoleCommunicationDtls.caseID;
			// check case security
			CommunicationFactory.newInstance().checkCaseSecurity(
					checkSecurityCaseIDKey);

		} else {

			final DataBasedSecurity dataBasedSecurity = SecurityImplementationFactory
					.get();
			final ParticipantSecurityCheckKey participantSecurityCheckKey = new ParticipantSecurityCheckKey();

			participantSecurityCheckKey.participantID = concernRoleCommunicationDtls.concernRoleID;
			participantSecurityCheckKey.type = LOCATIONACCESSTYPE.MAINTAIN;
			final DataBasedSecurityResult dataBasedSecurityResult = dataBasedSecurity
					.checkParticipantSecurity(participantSecurityCheckKey);

			if (!dataBasedSecurityResult.result) {

				throw new AppException(
						curam.message.GENERALCONCERN.ERR_CONCERNROLE_FV_SENSITIVE);
			}
		}
	}

	/**
	 * Inserts the communication details for a new communication.
	 * 
	 * @curam .util.type.AccessLevel(curam.util.type.AccessLevelType.INTERNAL)
	 * @param commKey
	 *            Contains concern Role ID
	 * @param commDetails
	 *            Communication details to be inserted
	 * @param contactKey
	 *            Contains address ID
	 * 
	 * @return Contains communicationID
	 * 
	 *         #DOC_END#
	 */
	public ConcernRoleCommKeyOut insertCommDetails(
			final MaintainCommunicationKey commKey,
			final CommunicationDetails commDetails,
			final CommunicationContactKey contactKey) throws AppException,
			InformationalException {

		final ConcernRoleCommKeyOut concernRoleCommKeyOut = new ConcernRoleCommKeyOut();

		final curam.core.intf.UniqueID uniqueIDObj = curam.core.fact.UniqueIDFactory
				.newInstance();

		// ConcernRoleComm manipulation variables
		final curam.core.intf.ConcernRoleCommunication concernRoleCommunicationObj = curam.core.fact.ConcernRoleCommunicationFactory
				.newInstance();
		final ConcernRoleCommunicationDtls concernRoleCommunicationDtls = new ConcernRoleCommunicationDtls();

		// Generate unique id for ConcernRoleCommunication
		commDetails.communicationID = uniqueIDObj.getNextID();

		// Set up communication details struct
		concernRoleCommunicationDtls.assign(commDetails);
		concernRoleCommunicationDtls.assign(commKey);

		concernRoleCommunicationDtls.communicationID = commDetails.communicationID;
		concernRoleCommunicationDtls.statusCode = curam.codetable.RECORDSTATUS.NORMAL;
		concernRoleCommunicationDtls.subjectText = commDetails.subjectText;
		concernRoleCommunicationDtls.caseID = commKey.caseID;
		concernRoleCommunicationDtls.concernRoleID = commDetails.concernRoleID;
		concernRoleCommunicationDtls.correspondentConcernRoleID = commDetails.concernRoleID;
		concernRoleCommunicationDtls.correspondentTypeCode = commDetails.correspondentTypeCode;
		concernRoleCommunicationDtls.attachmentInd = commDetails.attachmentInd;
		concernRoleCommunicationDtls.communicationFormat = commDetails.communicationFormat;
		concernRoleCommunicationDtls.addressID = contactKey.addressID;
		concernRoleCommunicationDtls.phoneNumberID = contactKey.phoneNumberID;
		concernRoleCommunicationDtls.communicationStatus = commDetails.communicationStatus;
		concernRoleCommunicationDtls.communicationDate = Date.getCurrentDate();
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();
		concernRoleKey.concernRoleID = commDetails.concernRoleID;
		concernRoleCommunicationDtls.correspondentName = ConcernRoleFactory
				.newInstance().readParticipantRoleNameAndType(concernRoleKey).concernRoleName;
		// Insert new communication entry
		concernRoleCommunicationObj.insert(concernRoleCommunicationDtls);

		concernRoleCommKeyOut.communicationID = commDetails.communicationID;

		return concernRoleCommKeyOut;
	}

	public String getPersonPreferredPhoneNumber(String concernRoleID)
			throws AppException, InformationalException {
		String phNumber = "";
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();
		concernRoleKey.concernRoleID = Long.parseLong(concernRoleID);
		long caseID = PDCUtilFactory.newInstance()
				.getPDCCaseIDCaseParticipantRoleID(concernRoleKey).caseID;

		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = caseID;
		caseIDStatusAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

		final curam.core.sl.infrastructure.entity.intf.EvidenceDescriptor evidenceDescriptorObj = EvidenceDescriptorFactory
				.newInstance();

		ReadEvidenceDetails evidenceDetails = new ReadEvidenceDetails();
		RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		curam.core.sl.struct.EvidenceTypeKey evidenceTypeKey = new curam.core.sl.struct.EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.PHONENUMBER;

		EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey.caseIDKey.caseID = caseID;
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
			evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);

			dynamicEvidenceDataDetails = evidenceDetails.dtls;
			if (dynamicEvidenceDataDetails.getAttribute("phoneType").getValue()
					.equals("PH3")) {
				phNumber = dynamicEvidenceDataDetails.getAttribute(
						"phoneNumber").getValue();
				if (Boolean.parseBoolean(dynamicEvidenceDataDetails
						.getAttribute("preferredInd").getValue())) {
					return dynamicEvidenceDataDetails.getAttribute(
							"phoneNumber").getValue();
				}
			}
		}
		return phNumber;
	}

}
