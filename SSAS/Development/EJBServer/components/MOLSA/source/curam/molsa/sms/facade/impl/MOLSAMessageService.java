package curam.molsa.sms.facade.impl;

import java.util.Iterator;
import java.util.Set;

import curam.attachmentlink.struct.AttachmentLinkDetails;
import curam.attachmentlink.struct.AttachmentLinkKey;
import curam.citizenaccount.facade.struct.ConcernRoleKey;
import curam.codetable.CASESEARCHSTATUS;
import curam.codetable.COMMUNICATIONFORMAT;
import curam.codetable.COMMUNICATIONSTATUS;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.AttachmentFactory;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.fact.CommunicationFactory;
import curam.core.facade.struct.CommunicationAndListRowActionDetails;
import curam.core.facade.struct.CommunicationDetailList;
import curam.core.facade.struct.CommunicationFilterKey;
import curam.core.facade.struct.ListCommunicationsKey;
import curam.core.facade.struct.ReadProFormaCommKey;
import curam.core.fact.WMInstanceDataFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.WMInstanceData;
import curam.core.sl.struct.CaseMemberCommDetailsList;
import curam.core.sl.struct.CaseMemberCommunicationDetails;
import curam.core.sl.struct.CommunicationKey;
import curam.core.struct.CaseCategoryTypeDetails;
import curam.core.struct.WMInstanceDataDtls;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.sms.entity.fact.MOLSASMSLogFactory;
import curam.molsa.sms.entity.fact.MOLSASMSWMInstanceFactory;
import curam.molsa.sms.entity.intf.MOLSASMSLog;
import curam.molsa.sms.entity.intf.MOLSASMSWMInstance;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceDtls;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetailsList;
import curam.molsa.sms.facade.struct.MOLSACommunicationAndListRowActionDetails;
import curam.molsa.sms.facade.struct.MOLSACommunicationDetailList;
import curam.molsa.sms.facade.struct.MOLSAConcernRoleListAndMessageText;
import curam.molsa.sms.facade.struct.MOLSAFailedSMSDetailsList;
import curam.molsa.sms.facade.struct.MOLSAInitialCaseSearchCriteria;
import curam.molsa.sms.facade.struct.MOLSAMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageTextKey;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.facade.struct.MOLSASMSLogKey;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.RecordNotFoundException;
import curam.util.fact.DeferredProcessingFactory;
import curam.util.intf.DeferredProcessing;
import curam.util.resources.KeySet;
import curam.util.resources.StringUtil;
import curam.util.resources.impl.PropertiesResourceCache;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.StringList;
import curam.util.type.UniqueID;

/**
 * The message service façade is used to send SMS messages, export the
 * participant list to excel, list SMS exceptions, Re send the failed SMS.
 */
public abstract class MOLSAMessageService extends
		curam.molsa.sms.facade.base.MOLSAMessageService {

	/**
	 * Sends the message to the list of participants received in the input
	 * parameter.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public void sendSMS(MOLSAConcernRoleListAndMessageText key)
			throws AppException, InformationalException {

		MOLSAConcernRoleListAndMessageTextDetails details = new MOLSAConcernRoleListAndMessageTextDetails();
		StringList concernRoleIDList = StringUtil.delimitedText2StringList(
				key.concernRoleTabbedList, CuramConst.gkTabDelimiterChar);
		if (concernRoleIDList.size() <= 1) {
			details.dtls.concernRoleTabbedList = key.concernRoleTabbedList;
			details.dtls.smsMessageText = key.smsMessageText;
			details.dtls.smsMessageType = key.smsMessageType;
			details.dtls.caseID = key.caseID;
			MOLSASMSUtilFactory.newInstance().sendSMS(details);
		} else {
			// Invoke the deferred process to send the bulk SMS
			final DeferredProcessing deferredProcessingObj = DeferredProcessingFactory
					.newInstance();
			MOLSASMSWMInstance molsasmswmInstanceObj = MOLSASMSWMInstanceFactory
					.newInstance();
			MOLSASMSWMInstanceDtls instanceDtls = new MOLSASMSWMInstanceDtls();
			instanceDtls.idTabbedList = key.concernRoleTabbedList;
			instanceDtls.instDataID = UniqueID
					.nextUniqueID(KeySet.kKeySetDefault);
			instanceDtls.messageText = key.smsMessageText;
			instanceDtls.smsTemplate = key.smsMessageType;
			instanceDtls.caseID = key.caseID;
			molsasmswmInstanceObj.insert(instanceDtls);

			deferredProcessingObj.startProcess("DEFERREDSMSPROCESSING",
					instanceDtls.instDataID);
		}
	}

	/**
	 * Gets the message text based on the SMS Template and SMS category.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @return MOLSAMessageText Description of the SMS Message Text.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public MOLSAMessageText getSMSMessageText(MOLSAMessageTextKey key)
			throws AppException, InformationalException {

		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		curam.molsa.sms.sl.struct.MOLSAMessageTextKey messageTextKey = new curam.molsa.sms.sl.struct.MOLSAMessageTextKey();
		MOLSAMessageText messageText = new MOLSAMessageText();
		messageTextKey.dtls.category = key.category;
		messageTextKey.dtls.template = key.template;
		curam.molsa.sms.sl.struct.MOLSAMessageText text = molsasmsUtilObj
				.getSMSMessageText(messageTextKey);
		messageText.smsMessageText = text.dtls.smsMessageText;
		return messageText;
	}


	/**
	 * List the failed messages with exceptions details logged while sending the
	 * message to the participants.
	 * 
	 * @return MOLSAFailedSMSDetailsList List of failed SMS details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public MOLSAFailedSMSDetailsList listAllFailedMessages()
			throws AppException, InformationalException {

		MOLSAFailedSMSDetailsList smsDetailsList = new MOLSAFailedSMSDetailsList();
		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		curam.molsa.sms.sl.struct.MOLSAFailedSMSDetailsList failedSMSDetailsList = molsasmsUtilObj
				.listAllFailedMessages();

		smsDetailsList.dtls.addAll(failedSMSDetailsList.dtls.dtls);

		return smsDetailsList;
	}

	/**
	 * Return the list of participants based on the user search criteria to send
	 * the SMS.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @return MOLSAFailedSMSDetailsList List of Participant details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public MOLSAParticipantDetailsList listParticipantByCriteria(
			MOLSAParticipantFilterCriteriaDetails key) throws AppException,
			InformationalException {
		MOLSAParticipantDetailsList molsaParticipantDetailsList = new MOLSAParticipantDetailsList();

		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails filterCriteriaDetails = new curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails();
		filterCriteriaDetails.dtls = key;
		curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList detailsList = molsasmsUtilObj
				.listParticipantByCriteria(filterCriteriaDetails);
		molsaParticipantDetailsList.dtls.addAll(detailsList.dtls.dtls);

		return molsaParticipantDetailsList;
	}

	/**
	 * Lists the additional benefits received by the participant.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @return MOLSAAdditionalBenefitDetailsList List of participants who
	 *         receives the additional benefit.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public MOLSAAdditionalBenefitDetailsList listParticipantAdditionalBenefits(
			ConcernRoleKey key) throws AppException, InformationalException {
		MOLSAAdditionalBenefitDetailsList additionalBenefitDetailsList = new MOLSAAdditionalBenefitDetailsList();
		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		curam.molsa.sms.sl.struct.MOLSAAdditionalBenefitDetailsList benefitDetailsList = molsasmsUtilObj
				.listParticipantAdditionalBenefits(key);
		if (benefitDetailsList.dtls.dtls.size() > 0) {
			additionalBenefitDetailsList.dtls
					.addAll(benefitDetailsList.dtls.dtls);
		}
		return additionalBenefitDetailsList;
	}

	/**
	 * Export the selected participant list returned from the search criteria to
	 * excel.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public void exportParticipantsToExcel(MOLSAConcernRoleListAndMessageText key)
			throws AppException, InformationalException {

		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
		concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = key.concernRoleTabbedList;
		molsasmsUtilObj
				.exportParticipantsToExcel(concernRoleListAndMessageTextDetails);

	}

	/**
	 * List the Communications.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @return MOLSACommunicationDetailList List of communication details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public MOLSACommunicationDetailList listFilteredCommunication(
			CommunicationFilterKey key) throws AppException,
			InformationalException {

		MOLSACommunicationDetailList molsaCommunicationDetailList = new MOLSACommunicationDetailList();
		CommunicationDetailList communicationDetailList = new CommunicationDetailList();

		final ReadProFormaCommKey readProFormaCommKey = new ReadProFormaCommKey();

		// If the value for name is 'All' and the concernRoleID is 0 return all
		// of the communications for the case
		if (key.concernRoleID == 0) {

			ListCommunicationsKey listCommunicationsKey = new ListCommunicationsKey();

			listCommunicationsKey.caseID = key.caseID;

			communicationDetailList = CaseFactory.newInstance()
					.listCaseCommunication(listCommunicationsKey);

		} // A case member has been selected display the communications for them
		else {
			CommunicationKey communicationKey = new CommunicationKey();

			communicationKey.caseID = key.caseID;
			communicationKey.concernRoleID = key.concernRoleID;

			CaseMemberCommDetailsList caseMemberCommDetailsList = curam.core.sl.fact.CommunicationFactory
					.newInstance().listRegardingCaseMemberCommunication(
							communicationKey);

			// Assign the details returned to a new struct that also contains
			// the
			// display indicators and fields required for the actions
			String communicationFormat = "";
			MOLSACommunicationAndListRowActionDetails communicationDtls;

			for (final CaseMemberCommunicationDetails caseMemberCommunicationDetails : caseMemberCommDetailsList.dtls
					.items()) {

				communicationDtls = new MOLSACommunicationAndListRowActionDetails();

				communicationDtls.dtls.assign(caseMemberCommunicationDetails);

				if (RECORDSTATUS.CANCELLED
						.equals(communicationDtls.dtls.statusCode)) {

					communicationDtls.dtls.canceledInd = true;

					if (COMMUNICATIONFORMAT.MSWORD
							.equals(communicationDtls.dtls.communicationFormat)) {
						communicationDtls.dtls.msWordInd = true;
					} else if (COMMUNICATIONFORMAT.PROFORMA
							.equals(communicationDtls.dtls.communicationFormat)) {
						readProFormaCommKey.proFormaCommKey.communicationID = communicationDtls.dtls.communicationID;
						communicationDtls.dtls.localeIdentifier = CommunicationFactory
								.newInstance().readProForma1(
										readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
					}
				} else {
					communicationFormat = communicationDtls.dtls.communicationFormat;

					if (COMMUNICATIONFORMAT.EMAIL.equals(communicationFormat)
							&& COMMUNICATIONSTATUS.DRAFT
									.equals(communicationDtls.dtls.communicationStatus)) {

						communicationDtls.dtls.draftEmailInd = true;

					} else if (COMMUNICATIONFORMAT.MSWORD
							.equals(communicationFormat)) {

						communicationDtls.dtls.msWordInd = true;

						final AttachmentLinkKey attachmentLinkKey = new AttachmentLinkKey();

						attachmentLinkKey.attachmentLinkID = communicationDtls.dtls.communicationID;

						AttachmentLinkDetails attachmentLinkDetails;

						try {
							attachmentLinkDetails = AttachmentFactory
									.newInstance().readAttachment(
											attachmentLinkKey);

							communicationDtls.dtls.attachmentDtls.attachmentName = attachmentLinkDetails.attachmentDtls.attachmentName;
							communicationDtls.dtls.attachmentDtls.attachmentContents = attachmentLinkDetails.attachmentDtls.attachmentContents;

						} catch (final RecordNotFoundException rnfe) {// Do
							// nothing
							// there
							// are
							// no
							// attachments
							// associated
							// with
							// this communication
						}

					} else if (COMMUNICATIONFORMAT.PROFORMA
							.equals(communicationFormat)) {

						communicationDtls.dtls.proFormaInd = true;

						readProFormaCommKey.proFormaCommKey.communicationID = communicationDtls.dtls.communicationID;
						communicationDtls.dtls.localeIdentifier = CommunicationFactory
								.newInstance().readProForma1(
										readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
					} else if (COMMUNICATIONFORMAT.SMS
							.equals(communicationFormat)) {

						communicationDtls.smsInd = true;

						readProFormaCommKey.proFormaCommKey.communicationID = communicationDtls.dtls.communicationID;
						communicationDtls.dtls.localeIdentifier = CommunicationFactory
								.newInstance().readProForma1(
										readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
					}
				}
				// Get the delete page link
				CommunicationAndListRowActionDetails communicationDetails = new CommunicationAndListRowActionDetails();
				communicationDetails.assign(communicationDtls);
				communicationDtls.dtls.deletePage.deletePageName = CommunicationFactory
						.newInstance().getDeletePageName(communicationDetails).deletePageName;

				molsaCommunicationDetailList.dtls.addRef(communicationDtls);
				// Add this list item to the return struct
				// -communicationDetailList.communicationDtls.addRef(communicationDtls);
			}

		}

		return molsaCommunicationDetailList;
	}

	/**
	 * Resends the message to the list of participants received in the input
	 * parameter.
	 * 
	 * @param key
	 *            Contains a key details.
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */

	public void resendSMS(MOLSASMSLogKey key) throws AppException,
			InformationalException {

		if (key.smsLogIDTabbedList.length() == 0) {
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.throwWithLookup(
							new AppException(
									MOLSASMSSERVICE.NO_CONCERNROLE_SELECTED),
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							0);
		}

		MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
		curam.molsa.sms.sl.struct.MOLSASMSLogKey logKey = new curam.molsa.sms.sl.struct.MOLSASMSLogKey();
		StringList concernRoleIDList = StringUtil.delimitedText2StringList(
				key.smsLogIDTabbedList, CuramConst.gkTabDelimiterChar);
		if (CuramConst.gkOne == concernRoleIDList.size()) {
			logKey.dtls.smsLogIDTabbedList = key.smsLogIDTabbedList;
			molsasmsUtilObj.resendSMS(logKey);
		} else {
			// Invoke the deferred process to send the bulk SMS
			final DeferredProcessing deferredProcessingObj = DeferredProcessingFactory
					.newInstance();
			MOLSASMSWMInstance molsasmswmInstanceObj = MOLSASMSWMInstanceFactory
					.newInstance();
			MOLSASMSWMInstanceDtls instanceDtls = new MOLSASMSWMInstanceDtls();
			instanceDtls.idTabbedList = key.smsLogIDTabbedList;
			instanceDtls.instDataID = UniqueID
					.nextUniqueID(KeySet.kKeySetDefault);
			molsasmswmInstanceObj.insert(instanceDtls);

			deferredProcessingObj.startProcess("DEFERREDRESENDSMSPROCESSING",
					instanceDtls.instDataID);
		}
	}

	@Override
	public MOLSAInitialCaseSearchCriteria getSMSInitialSearchCriteria()
			throws AppException, InformationalException {

		MOLSAInitialCaseSearchCriteria caseSearchCriteria  = new MOLSAInitialCaseSearchCriteria();
		
		java.util.LinkedHashMap<String, String> productTypeList = CodeTable.getAllEnabledItems(
				PRODUCTTYPE.TABLENAME, TransactionInfo.getProgramLocale());
		CaseCategoryTypeDetails caseCategoryTypeDetails;
		
		  if (!productTypeList.isEmpty()) {
			  Set<String> keys = productTypeList.keySet();
		      Iterator<String> itr = keys.iterator();
		      while (itr.hasNext()) {
		    	  caseCategoryTypeDetails=new CaseCategoryTypeDetails();
		    	  caseCategoryTypeDetails.categoryType=itr.next();
		    	  caseCategoryTypeDetails.typeDescription=productTypeList.get(
		    			  caseCategoryTypeDetails.categoryType);
		    	  
		    	  caseSearchCriteria.caseTypeList.dtlsList.addRef(caseCategoryTypeDetails);
		      }
			  
		  }
		
		return caseSearchCriteria;
	}
}
