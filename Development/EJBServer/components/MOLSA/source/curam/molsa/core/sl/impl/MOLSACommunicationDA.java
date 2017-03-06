package curam.molsa.core.sl.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.google.inject.Inject;
import com.google.inject.Provider;

import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESENSITIVITYEXCEPTIONS;
import curam.codetable.CASETRANSACTIONEVENTS;
import curam.codetable.COMMUNICATIONFORMAT;
import curam.codetable.COMMUNICATIONMETHOD;
import curam.codetable.COMMUNICATIONSTATUS;
import curam.codetable.CONCERNROLEADDRESSTYPE;
import curam.codetable.CONCERNROLETYPE;
import curam.codetable.CORRESPONDENT;
import curam.codetable.INTERACTIONTYPE;
import curam.codetable.LOCATIONACCESSTYPE;
import curam.codetable.RECORDSTATUS;
import curam.codetable.impl.CMISNAMINGTYPEEntry;
import curam.codetable.impl.CMSLINKRELATEDTYPEEntry;
import curam.core.facade.struct.FileNameAndDataDtls;
import curam.core.fact.AddressFactory;
import curam.core.fact.AlternateNameFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleAddressFactory;
import curam.core.fact.ConcernRoleCommunicationFactory;
import curam.core.fact.ConcernRoleDocumentsFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.LocationFactory;
import curam.core.fact.MaintainConcernRoleAddressFactory;
import curam.core.fact.MaintainXSLTemplateFactory;
import curam.core.fact.ProspectPersonFactory;
import curam.core.fact.SystemUserFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.DataBasedSecurity;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.Address;
import curam.core.intf.AlternateName;
import curam.core.intf.CaseHeader;
import curam.core.intf.ConcernRole;
import curam.core.intf.ConcernRoleAddress;
import curam.core.intf.ConcernRoleCommunication;
import curam.core.intf.ConcernRoleDocuments;
import curam.core.intf.Location;
import curam.core.intf.MaintainConcernRoleAddress;
import curam.core.intf.MaintainXSLTemplate;
import curam.core.intf.ProspectPerson;
import curam.core.intf.SystemUser;
import curam.core.sl.entity.struct.CaseIDParticipantRoleKey;
import curam.core.sl.fact.ClientInteractionFactory;
import curam.core.sl.fact.ClientMergeFactory;
import curam.core.sl.impl.CaseTransactionLogIntf;
import curam.core.sl.infrastructure.cmis.impl.CMISAccessInterface;
import curam.core.sl.intf.ClientMerge;
import curam.core.sl.struct.CaseParticipantRoleDetails;
import curam.core.sl.struct.CheckCommExceptionKey;
import curam.core.sl.struct.CheckSecurityCaseIDKey;
import curam.core.sl.struct.ClientInteractionSupplementaryDetails;
import curam.core.sl.struct.ParticipantSecurityCheckKey;
import curam.core.sl.struct.PreviewProFormaKey;
import curam.core.sl.struct.ProFormaCommDetails;
import curam.core.sl.struct.ProFormaCommDetails1;
import curam.core.sl.struct.ProFormaCommKey;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.sl.struct.ValidatePrimaryCaseParticipantDetails;
import curam.core.struct.AddressDetails;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressKey;
import curam.core.struct.AlternateNameDtls;
import curam.core.struct.AlternateNameKey;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseIDConcernRoleID;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseSecurityCheckKey;
import curam.core.struct.CaseTypeCode;
import curam.core.struct.CommunicationContactKey;
import curam.core.struct.CommunicationDetails;
import curam.core.struct.ConcernRoleAddressKey;
import curam.core.struct.ConcernRoleCommKeyOut;
import curam.core.struct.ConcernRoleCommunicationDtls;
import curam.core.struct.ConcernRoleCommunicationKey;
import curam.core.struct.ConcernRoleDocumentDetails;
import curam.core.struct.ConcernRoleDocumentKey;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRoleNameDetails;
import curam.core.struct.CuramInd;
import curam.core.struct.DataBasedSecurityResult;
import curam.core.struct.LocationKey;
import curam.core.struct.LoggedInUser;
import curam.core.struct.MaintainAddressKey;
import curam.core.struct.MaintainCommunicationKey;
import curam.core.struct.OtherAddressData;
import curam.core.struct.ProspectPersonHomeDetails;
import curam.core.struct.ProspectPersonKey;
import curam.core.struct.ReadParticipantRoleIDDetails;
import curam.core.struct.SecurityResult;
import curam.core.struct.SystemUserDtls;
import curam.core.struct.XSLTemplateIn;
import curam.core.struct.XSLTemplateReadDetails;
import curam.message.BPOADDRESS;
import curam.message.BPOCASEEVENTS;
import curam.message.BPOCOMMUNICATION;
import curam.message.GENERAL;
import curam.message.GENERALCASE;
import curam.message.GENERALCOMMUNICATION;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.core.fact.MOLSAConcernRoleDocumentsDAFactory;
import curam.molsa.core.intf.MOLSAConcernRoleDocumentsDA;
import curam.molsa.message.MOLSABPOTRAINING;
import curam.molsa.util.impl.MOLSACommunicationHelper;
import curam.util.events.impl.EventService;
import curam.util.events.struct.Event;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.exception.LocalisableString;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.Money;
import curam.util.type.StringList;

public class MOLSACommunicationDA extends curam.molsa.core.sl.base.MOLSACommunicationDA{

	@Inject
	protected Provider<CaseTransactionLogIntf> caseTransactionLogProvider;


	@Inject
	private CMISAccessInterface cmisAccess;

	@Override
	public void createProForma1(ProFormaCommDetails1 proFormaCommDetails)
	throws AppException, InformationalException {

		createProFormaReturningID(proFormaCommDetails);
	}

	@Override
	public ProFormaReturnDocDetails previewProForma(
			PreviewProFormaKey previewProFormaKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();

		// ConcernRoleDocuments manipulation variables
		// final curam.core.intf.ConcernRoleDocuments concernRoleDocumentsObj = curam.core.fact.ConcernRoleDocumentsFactory.newInstance();
		final MOLSAConcernRoleDocumentsDA concernRoleDocumentsObj= MOLSAConcernRoleDocumentsDAFactory.newInstance();
		final curam.core.struct.ConcernRoleDocumentKey concernRoleDocumentKey = new curam.core.struct.ConcernRoleDocumentKey();
		final curam.core.struct.ConcernRoleDocumentDetails concernRoleDocumentDetails = new curam.core.struct.ConcernRoleDocumentDetails();

		// ConcernRoleCommunication manipulation variables
		final curam.core.intf.ConcernRoleCommunication concernRoleCommunicationObj = curam.core.fact.ConcernRoleCommunicationFactory.newInstance();
		final curam.core.struct.ConcernRoleCommunicationKey concernRoleCommunicationKey = new curam.core.struct.ConcernRoleCommunicationKey();
		ConcernRoleCommunicationDtls concernRoleCommunicationDtls;

		// Set key to read ConcernRoleCommunication
		concernRoleCommunicationKey.communicationID = previewProFormaKey.communicationID;

		// Read ConcernRoleCommunication
		concernRoleCommunicationDtls = concernRoleCommunicationObj.read(
				concernRoleCommunicationKey);

		// Assign key to print document
		concernRoleDocumentKey.caseID = concernRoleCommunicationDtls.caseID;
		// BEGIN, CR00265336, JAF
		concernRoleDocumentKey.concernRoleID = concernRoleCommunicationDtls.correspondentConcernRoleID;
		// END, JAF
		concernRoleDocumentKey.documentID = concernRoleCommunicationDtls.proFormaID;

		// Assign details to print document
		concernRoleDocumentDetails.comments = concernRoleCommunicationDtls.comments;
		concernRoleDocumentDetails.documentID = concernRoleCommunicationDtls.proFormaID;
		concernRoleDocumentDetails.subject = concernRoleCommunicationDtls.subjectText;
		concernRoleDocumentDetails.versionNo = concernRoleCommunicationDtls.proFormaVersionNo;
		concernRoleDocumentDetails.communicationID = concernRoleCommunicationDtls.communicationID;

		if ((previewProFormaKey.localeIdentifier == null)
				|| (previewProFormaKey.localeIdentifier.length() == 0)) {
			concernRoleDocumentDetails.localeIdentifier = TransactionInfo.getProgramLocale();
			//		  concernRoleDocumentDetails.localeIdentifier = "en";
		} else {
			concernRoleDocumentDetails.localeIdentifier = previewProFormaKey.localeIdentifier;
		}

		// BEGIN, CR00289910, CD
		// BEGIN, CR00295922, CD
		if (concernRoleCommunicationDtls.communicationStatus.equals(
				COMMUNICATIONSTATUS.DRAFT)
				== false
				&& cmisAccess.isCMISEnabledFor(
						CMSLINKRELATEDTYPEEntry.PROFORMA_CONCERNROLECOMMUNICATION)
						&& cmisAccess.contentExists(previewProFormaKey.communicationID,
								CMSLINKRELATEDTYPEEntry.PROFORMA_CONCERNROLECOMMUNICATION)) {
			// END, CR00295922
			FileNameAndDataDtls fileDetails = cmisAccess.read(
					previewProFormaKey.communicationID,
					CMSLINKRELATEDTYPEEntry.PROFORMA_CONCERNROLECOMMUNICATION);

			proFormaReturnDocDetails.fileName = fileDetails.fileName;
			proFormaReturnDocDetails.fileDate = fileDetails.fileContent;
		} else {
			// Call ConcernRoleDocuments BPO to print the document
			proFormaReturnDocDetails = concernRoleDocumentsObj.previewDocument(
					concernRoleDocumentKey, concernRoleDocumentDetails);
		}
		// END, CR00289910

		return proFormaReturnDocDetails;
	}

	@Override
	public ConcernRoleCommKeyOut createProFormaReturningID(
			ProFormaCommDetails1 proFormaCommDetails) throws AppException,
			InformationalException {
		final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		// Client merge manipulation variables
		final ClientMerge clientMergeObj = ClientMergeFactory.newInstance();

		CuramInd curamInd;

		// Validations
		validateProForma1(proFormaCommDetails);

		// BEGIN CR00162375, ZV
		final CommunicationContactKey communicationContactKey = new CommunicationContactKey();

		// Register new address if entered
		final Address addressObj = AddressFactory.newInstance();
		final OtherAddressData otherAddressData = new OtherAddressData();

		otherAddressData.addressData = proFormaCommDetails.addressData;

		final boolean addressEmpty = addressObj.isEmpty(otherAddressData).emptyInd;

		// If new address is entered.
		if (!addressEmpty) {

			final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
			final ConcernRoleKey concernRoleDtlsKey = new ConcernRoleKey();

			concernRoleDtlsKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;

			final ConcernRoleDtls concernRoleDtls = concernRoleObj.read(
					concernRoleDtlsKey);

			final MaintainConcernRoleAddress maintainConcernRoleAddressObj = MaintainConcernRoleAddressFactory.newInstance();
			final MaintainAddressKey maintainAddressKey = new MaintainAddressKey();
			final AddressDetails addressDetails = new AddressDetails();

			maintainAddressKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			addressDetails.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			addressDetails.addressData = proFormaCommDetails.addressData;
			addressDetails.startDate = Date.getCurrentDate();
			addressDetails.typeCode = CONCERNROLEADDRESSTYPE.PRIVATE;

			if (concernRoleDtls.primaryAddressID == 0) {
				addressDetails.primaryAddressInd = true;
			}

			final ConcernRoleAddressKey concernRoleAddressKey = new ConcernRoleAddressKey();

			concernRoleAddressKey.concernRoleAddressID = maintainConcernRoleAddressObj.createConcernRoleAddress(maintainAddressKey, addressDetails).key.concernRoleAddressID;

			final ConcernRoleAddress concernRoleAddressObj = ConcernRoleAddressFactory.newInstance();

			communicationContactKey.addressID = concernRoleAddressObj.read(concernRoleAddressKey).addressID;

		} else {
			communicationContactKey.addressID = proFormaCommDetails.addressID;
		}
		// END, CR00162375

		// BEGIN, CR00152391, AK
		// Security Checks.
		final ConcernRoleCommunicationDtls concernRoleCommunicationDtls = new ConcernRoleCommunicationDtls();

		concernRoleCommunicationDtls.concernRoleID = proFormaCommDetails.clientParticipantRoleID;

		if (concernRoleCommunicationDtls.concernRoleID == 0) {
			concernRoleCommunicationDtls.concernRoleID = proFormaCommDetails.correspondentConcernRoleID;
		}
		if (concernRoleCommunicationDtls.concernRoleID == 0) {
			concernRoleCommunicationDtls.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
		}

		// BEGIN, CR00227859, PM
		concernRoleCommunicationDtls.caseID = proFormaCommDetails.caseID;
		// END, CR00227859

		performSecurityChecks(concernRoleCommunicationDtls);
		// END, CR00152391

		// BEGIN, CR00099710, PMD
		// Only apply validations for participant communications.
		if (proFormaCommDetails.caseID == 0) {

			concernRoleKey.concernRoleID = proFormaCommDetails.clientParticipantRoleID;

			// Check if the concern role has been marked as a duplicate.
			curamInd = clientMergeObj.isConcernRoleDuplicate(concernRoleKey);

			// If the concern role is a duplicate, throw an exception.
			if (curamInd.statusInd) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().throwWithLookup(
						new AppException(
								BPOCOMMUNICATION.ERR_COMM_XRV_DUPLICATE_CLIENT_CREATE),
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								2);
			}
		}
		// END, CR00099710

		// BEGIN, CR00100922, CM
		if (proFormaCommDetails.caseID != 0) {

			// BEGIN, CR00100552, CM
			final CaseIDConcernRoleID caseIDConcernRoleID = new CaseIDConcernRoleID();
			final CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
			final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

			caseHeaderKey.caseID = proFormaCommDetails.caseID;

			ReadParticipantRoleIDDetails readParticipantRoleIDDetails = new ReadParticipantRoleIDDetails();

			readParticipantRoleIDDetails = caseHeaderObj.readParticipantRoleID(
					caseHeaderKey);

			caseIDConcernRoleID.caseID = proFormaCommDetails.caseID;
			caseIDConcernRoleID.concernRoleID = readParticipantRoleIDDetails.concernRoleID;
			concernRoleKey.concernRoleID = readParticipantRoleIDDetails.concernRoleID;

			// Check if the concern role has been marked as a duplicate.
			curamInd = clientMergeObj.isConcernRoleDuplicate(concernRoleKey);

			// If the concern role has been marked as a duplicate, a notification will
			// be sent to the case owners.
			if (curamInd.statusInd) {
				sendNotification(caseIDConcernRoleID);
			}
			// END, CR00100552
		}
		// END, CR00100922

		final CommunicationDetails communicationDetails = new CommunicationDetails();

		final MaintainCommunicationKey commKey = new MaintainCommunicationKey();

		final ProFormaCommDetails commDetails = new ProFormaCommDetails();

		commDetails.assign(proFormaCommDetails);
		communicationDetails.assign(commDetails);

		// BEGIN, CR00223331, MC
		if (proFormaCommDetails.printInd) {
			communicationDetails.communicationStatus = COMMUNICATIONSTATUS.SENT;
			communicationDetails.communicationDate = TransactionInfo.getSystemDate();
		} else {
			communicationDetails.communicationStatus = COMMUNICATIONSTATUS.DRAFT;
			communicationDetails.communicationDate = TransactionInfo.getSystemDate();
		}
		// END, CR00223331

		communicationDetails.methodTypeCode = COMMUNICATIONMETHOD.HARDCOPY;
		communicationDetails.communicationFormat = COMMUNICATIONFORMAT.PROFORMA;

		final LoggedInUser loggedInUser = new LoggedInUser();

		// Get current user to populate the user name.
		loggedInUser.userName = TransactionInfo.getProgramUser();

		// BEGIN, CR00049218, GM
		if (!CuramConst.gkEmpty.equals(loggedInUser.userName)) {
			communicationDetails.userName = loggedInUser.userName;
			// END, CR00049218

		} else {

			final SystemUser systemUserObj = SystemUserFactory.newInstance();
			final SystemUserDtls systemUserDtls = systemUserObj.getSystemUserDetails();

			communicationDetails.userName = systemUserDtls.userName;
		}

		// MaintainXSLTemplate server object and key.
		final MaintainXSLTemplate maintainXSLTemplateOBJ = MaintainXSLTemplateFactory.newInstance();
		final XSLTemplateIn xslTemplateIn = new XSLTemplateIn();

		xslTemplateIn.templateID = proFormaCommDetails.proFormaID;

		// BEGIN, CR00145315, SK
		xslTemplateIn.localeIdentifier = proFormaCommDetails.localeIdentifier;
		// END, CR00145315

		// Read the template details number.
		// BEGIN, CR00279987, KRK
		XSLTemplateReadDetails xslTemplateReadDetails = maintainXSLTemplateOBJ.readXSLTemplateDetails(
				xslTemplateIn);

		communicationDetails.proFormaVersionNo = xslTemplateReadDetails.latestVersion;
		// END, CR00279987


		commKey.caseID = proFormaCommDetails.caseID;
		commKey.concernRoleID = proFormaCommDetails.clientParticipantRoleID;

		// Insert new communication entry.
		final ConcernRoleCommKeyOut concernRoleCommKeyOut = insertCommDetails(
				commKey, communicationDetails, communicationContactKey);

		// BEGIN, CR00051627, AK
		if (proFormaCommDetails != null && proFormaCommDetails.caseID != 0) {

			// Log Transaction Details.
			// BEGIN, CR00090982, JG
			final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();

			concernRoleKey.concernRoleID = communicationDetails.correspondentConcernRoleID;
			final ConcernRoleNameDetails correspondentConcernRoleName = concernRoleObj.readConcernRoleName(
					concernRoleKey);

			final LocalisableString description = new LocalisableString(BPOCASEEVENTS.PRO_FORMA_COMMUNICATION_INSERTED).arg(proFormaCommDetails.subject).arg(
					correspondentConcernRoleName.concernRoleName);

			caseTransactionLogProvider.get().recordCaseTransaction(
					CASETRANSACTIONEVENTS.PROFORMA_COMMUNICATION_INSERT, description,
					proFormaCommDetails.caseID, communicationDetails.communicationID);
			// END, CR00090982
		}
		// END, CR00051627

		if (proFormaCommDetails.printInd) {

			// Concern Role Documents server object and key.
			final ConcernRoleDocuments concernRoleDocumentsObj = ConcernRoleDocumentsFactory.newInstance();
			final ConcernRoleDocumentKey concernRoleDocumentKey = new ConcernRoleDocumentKey();
			final ConcernRoleDocumentDetails concernRoleDocumentDetails = new ConcernRoleDocumentDetails();

			// Print the communication.
			concernRoleDocumentKey.documentID = proFormaCommDetails.proFormaID;
			concernRoleDocumentDetails.documentID = proFormaCommDetails.proFormaID;
			concernRoleDocumentDetails.versionNo = proFormaCommDetails.proFormaVersionNo;

			concernRoleDocumentKey.caseID = proFormaCommDetails.caseID;
			concernRoleDocumentKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			concernRoleDocumentDetails.communicationID = concernRoleCommKeyOut.communicationID;

			// BEGIN, CR00146374, SK
			if ((proFormaCommDetails.localeIdentifier == null)
					|| (proFormaCommDetails.localeIdentifier.length() == 0)) {
				concernRoleDocumentDetails.localeIdentifier = TransactionInfo.getProgramLocale();
			} else {
				// BEGIN, CR00145315, SK
				concernRoleDocumentDetails.localeIdentifier = proFormaCommDetails.localeIdentifier;
				// END, CR00145315
			}
			// END, CR00146374

			// Print out the communication.
			ProFormaReturnDocDetails proFormaDtls = concernRoleDocumentsObj.printAndPreviewDocument(
					concernRoleDocumentKey, concernRoleDocumentDetails);

			// BEGIN, CR00289910, CD
			if (communicationDetails.communicationStatus.equals(
					COMMUNICATIONSTATUS.SENT)
					&& cmisAccess.isCMISEnabledFor(
							CMSLINKRELATEDTYPEEntry.PROFORMA_CONCERNROLECOMMUNICATION)) {

				// save the contents to the content management system
				cmisAccess.create(concernRoleDocumentDetails.communicationID,
						CMSLINKRELATEDTYPEEntry.PROFORMA_CONCERNROLECOMMUNICATION,
						proFormaDtls.fileDate.copyBytes(), proFormaDtls.fileName,
						CMISNAMINGTYPEEntry.PROFORMA_GENERIC, null);

			}
			// END, CR00289910

			// Call into sample interaction center
			// and record the client interaction for this communication.
			final ClientInteractionSupplementaryDetails clientInteractionSupplementaryDetails = new ClientInteractionSupplementaryDetails();

			clientInteractionSupplementaryDetails.clientDtls.dtls.concernRoleID = proFormaCommDetails.clientParticipantRoleID;
			clientInteractionSupplementaryDetails.clientDtls.dtls.relatedID = concernRoleCommKeyOut.communicationID;

			// BEGIN, CR00222190, ELG
			clientInteractionSupplementaryDetails.clientDtls.dtls.description = GENERALCOMMUNICATION.INF_COMMUNICATION.getMessageText(
					TransactionInfo.getProgramLocale());
			// END, CR00222190

			clientInteractionSupplementaryDetails.clientDtls.dtls.interactionTypeCode = INTERACTIONTYPE.HARDCOPY;
			clientInteractionSupplementaryDetails.correspondentConcernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			clientInteractionSupplementaryDetails.communicationDirectionInd = false;

			ClientInteractionFactory.newInstance().recordClientAndCorrespondentInteraction(
					clientInteractionSupplementaryDetails);
		}

		return concernRoleCommKeyOut;
	}

	@Override
	public void sendNotification(CaseIDConcernRoleID key) throws AppException,
	InformationalException {

		// Event struct
		final Event event = new Event();

		// Set event details
		event.eventKey.eventClass = curam.events.PARTICIPANTCOMMUNICATION.CREATECOMMUNICATION.eventClass;
		event.eventKey.eventType = curam.events.PARTICIPANTCOMMUNICATION.CREATECOMMUNICATION.eventType;
		event.primaryEventData = key.caseID;
		event.secondaryEventData = key.concernRoleID;

		EventService.raiseEvent(event);
	}

	@Override
	public void validateProForma1(ProFormaCommDetails1 proFormaCommDetails)
	throws AppException, InformationalException {

		final InformationalManager informationalManager = TransactionInfo.getInformationalManager();

		// BEGIN CR00096012, PN
		final ProspectPersonKey prospectPersonKey = new ProspectPersonKey();
		ProspectPersonHomeDetails prospectPersonEntityHomeDetails;
		final ProspectPerson prospectPersonObj = ProspectPersonFactory.newInstance();

		prospectPersonKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
		final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
		final ConcernRoleKey concernRoleKey = new ConcernRoleKey();
		ConcernRoleDtls concernRoleDtls;
		String concernRoleType = null;

		if (proFormaCommDetails.correspondentParticipantRoleID != 0) {

			concernRoleKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			concernRoleDtls = concernRoleObj.read(concernRoleKey);
			if (concernRoleDtls != null) {
				concernRoleType = concernRoleDtls.concernRoleType;
			}

			if (concernRoleType != null
					&& concernRoleType.equals(CONCERNROLETYPE.PROSPECTPERSON)) {

				prospectPersonEntityHomeDetails = prospectPersonObj.readHomePageDetails(
						prospectPersonKey);

				if (prospectPersonEntityHomeDetails.surname.length() == 0) {

					curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
							new AppException(
									BPOCOMMUNICATION.ERR_COMM_XRV_PROSPECT_PERSON_LASTNAME_NOT_AVL),
									CuramConst.gkEmpty,
									InformationalElement.InformationalType.kError,
									curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
									4);
				}
			}
			// END CR00096012
		}
		// Ensure that the communication is not already canceled.
		if (proFormaCommDetails.statusCode.equals(RECORDSTATUS.CANCELLED)) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
					new AppException(GENERAL.ERR_GENERAL_FV_NO_MODIFY_RECORD_CANCELLED),
					CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
					curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 12);
		}

		// BEGIN CR00097179, AK
		final CheckCommExceptionKey checkCommExceptionKey = new CheckCommExceptionKey();

		checkCommExceptionKey.correspondentParticipantRoleID = proFormaCommDetails.clientParticipantRoleID;
		checkCommExceptionKey.currentDate = Date.getCurrentDate();
		checkCommExceptionKey.status = RECORDSTATUS.NORMAL;
		checkCommExceptionKey.typeCode = COMMUNICATIONMETHOD.HARDCOPY;

		checkCommException(checkCommExceptionKey);
		// END CR00097179

		if (proFormaCommDetails.communicationStatus.equals(COMMUNICATIONSTATUS.SENT)
				&& proFormaCommDetails.communicationDate.isZero()) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
					new AppException(BPOCOMMUNICATION.ERR_GENERAL_FV_NO_MODIFY_RECORD_SENT),
					CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
					curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 1);
		}

		// Correspondent is mandatory.
		if (proFormaCommDetails.correspondentParticipantRoleID == 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
					new AppException(BPOCOMMUNICATION.ERR_COMM_NAME_NOT_SUPPLIED),
					CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
					curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 3);
		}

		if (proFormaCommDetails.caseID == 0) {

			concernRoleKey.concernRoleID = proFormaCommDetails.correspondentParticipantRoleID;

			if (concernRoleObj.readConcernRoleType(concernRoleKey).concernRoleType.equals(
					CONCERNROLETYPE.PERSON)) {

				// If correspondent is the client the correspondent type must be client.
				if ((proFormaCommDetails.correspondentParticipantRoleID
						== proFormaCommDetails.clientParticipantRoleID)
						&& !proFormaCommDetails.correspondentType.equals(
								CORRESPONDENT.CLIENT)) {

					curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
							new AppException(BPOCOMMUNICATION.ERR_COMM_CORRESPONDENT__IS_CLIENT),
							CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 2);
				}
			} else {

				// If correspondent is not a client the correspondent type must not be
				// client.
				if ((proFormaCommDetails.correspondentParticipantRoleID
						!= proFormaCommDetails.clientParticipantRoleID)
						&& proFormaCommDetails.correspondentType.equals(
								CORRESPONDENT.CLIENT)) {

					curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
							new AppException(
									BPOCOMMUNICATION.ERR_COMM_CORRESPONDENT__NOT_CLIENT),
									CuramConst.gkEmpty,
									InformationalElement.InformationalType.kError,
									curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
									2);
				}
			}
		} else {

			final ValidatePrimaryCaseParticipantDetails validatePrimaryCaseParticipantDetails = new ValidatePrimaryCaseParticipantDetails();

			validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.caseID = proFormaCommDetails.caseID;
			validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.participantRoleID = proFormaCommDetails.correspondentParticipantRoleID;
			validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.typeCode = CASEPARTICIPANTROLETYPE.PRIMARY;
			validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.recordStatus = RECORDSTATUS.NORMAL;
			validatePrimaryCaseParticipantDetails.correspondentType = proFormaCommDetails.correspondentType;

			// BEGIN, CR00291461, PS
			final curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
			final curam.core.struct.CaseHeaderKey caseHeaderKey = new curam.core.struct.CaseHeaderKey();
			curam.core.struct.CaseHeaderDtls caseHeaderDtls;

			// Set key for case status read
			caseHeaderKey.caseID = validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.caseID;

			// Read case status
			caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);

			if (caseHeaderDtls.caseTypeCode
					== curam.codetable.CASETYPECODE.APPEAL.toString()) {
				validatePrimaryParticipantRole(validatePrimaryCaseParticipantDetails);
			}
			// END, CR00291461

		}

		// Address is mandatory.
		// BEGIN, CR00163445, JMA
		final Address addressObj = AddressFactory.newInstance();
		final OtherAddressData otherAddressData = new OtherAddressData();

		otherAddressData.addressData = proFormaCommDetails.addressData;

		final boolean addressEmpty = addressObj.isEmpty(otherAddressData).emptyInd;

		if (!addressEmpty && proFormaCommDetails.addressID != 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
					new AppException(BPOCOMMUNICATION.ERR_COMM_XFV_MULTIPLE_ADDRESS),
					CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
					curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 1);
		}

		// Address is mandatory.
		if (proFormaCommDetails.addressID == 0 && addressEmpty) {

			final AppException e = new AppException(
					BPOCOMMUNICATION.ERR_COMM_ADDRESS_NOT_SUPPLIED);

			// Read the participant name and add to the exception message.
			e.arg(proFormaCommDetails.correspondentName);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
					e.arg(true), CuramConst.gkEmpty,
					InformationalElement.InformationalType.kError,
					curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 2);
		}

		informationalManager.failOperation();
		// END, CR00163445

	}

	@Override
	public void validatePrimaryParticipantRole(
			ValidatePrimaryCaseParticipantDetails validatePrimaryCaseParticipantDetails)
	throws AppException, InformationalException {

		// BEGIN, CR00148209, JMA
		final InformationalManager informationalManager = TransactionInfo.getInformationalManager();

		try {
			// read the case participant role to see if the correspondent is the
			// primary participant
			final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

			caseHeaderKey.caseID = validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.caseID;

			final ReadParticipantRoleIDDetails readParticipantRoleIDDetails = CaseHeaderFactory.newInstance().readParticipantRoleID(
					caseHeaderKey);

			// if correspondent is the primary client the correspondent type must be
			// client
			if (validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.participantRoleID
					== readParticipantRoleIDDetails.concernRoleID
					&& !validatePrimaryCaseParticipantDetails.correspondentType.equals(
							curam.codetable.CORRESPONDENT.CLIENT)) {

				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
						new AppException(
								curam.message.BPOCOMMUNICATION.ERR_COMM_CORRESPONDENT__IS_PRIMARY_CLIENT),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								1);
			}

			// if correspondent is not a the primary client the correspondent type
			// must not be
			// client
			if ((validatePrimaryCaseParticipantDetails.caseIDParticipantIDAndTypeDetails.participantRoleID
					!= readParticipantRoleIDDetails.concernRoleID)
					&& validatePrimaryCaseParticipantDetails.correspondentType.equals(
							curam.codetable.CORRESPONDENT.CLIENT)) {

				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
						new AppException(
								curam.message.BPOCOMMUNICATION.ERR_COMM_CORRESPONDENT__NOT_PRIMARY_CLIENT),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}

		} catch (final curam.util.exception.RecordNotFoundException e) {// Do nothing
		}
		informationalManager.failOperation();
		// END, CR00148209
	}

	@Override
	public void checkCommException(CheckCommExceptionKey checkCommExceptionKey)
	throws AppException, InformationalException {

		final curam.core.struct.SearchByTypeRMKey searchByTypeRMKey = new curam.core.struct.SearchByTypeRMKey();

		// populate search by type key
		searchByTypeRMKey.assign(checkCommExceptionKey);

		// Concern role communication exception object and structures
		final curam.core.intf.ConcernRoleCommException concernRoleCommExceptionObj = curam.core.fact.ConcernRoleCommExceptionFactory.newInstance();
		curam.core.struct.ConcernRoleCommExcRMDtlsList concernRoleCommExcRMDtlsList;

		// Communication type must not be a communication exception
		concernRoleCommExcRMDtlsList = concernRoleCommExceptionObj.searchExceptionsByType(
				searchByTypeRMKey);

		// throw an exception if communications of exception type are found
		if (!concernRoleCommExcRMDtlsList.dtls.isEmpty()) {

			final curam.util.type.CodeTableItemIdentifier communicationMethodType = new curam.util.type.CodeTableItemIdentifier(
					curam.codetable.COMMUNICATIONMETHOD.TABLENAME,
					checkCommExceptionKey.typeCode);

			final AppException e = new AppException(
					curam.message.BPOMAINTAINCONCERNROLECOMM.ERR_COMM_METHOD_IS_EXCEPTION);

			e.arg(communicationMethodType);

			// create Concern Role Communication object
			final curam.core.intf.ConcernRole concernRoleObj = curam.core.fact.ConcernRoleFactory.newInstance();

			final curam.core.struct.ConcernRoleKey concernRoleKey = new curam.core.struct.ConcernRoleKey();

			concernRoleKey.concernRoleID = checkCommExceptionKey.correspondentParticipantRoleID;

			// read the participant name and add to the exception message
			e.arg(concernRoleObj.readConcernRoleName(concernRoleKey).concernRoleName);
			curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().throwWithLookup(
					e, curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 4);

		}
	}

	@Override
	protected SecurityResult checkSensitivityExceptions(CaseKey caseKey)
	throws AppException, InformationalException {

		final SecurityResult isSensitivityExceptionType = new SecurityResult();

		// read the case details to determine what the case type is
		final CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();

		final CaseTypeCode caseTypeCode = caseHeaderObj.readCaseTypeCode(caseKey);

		final StringList sensitivityExceptions = CodeTable.getAllCodesStringList(
				CASESENSITIVITYEXCEPTIONS.TABLENAME, TransactionInfo.getProgramLocale());

		// Ignore security checks if the case type is in the
		// CaseSensitivityExceptions codetable as these have their own sensitivity
		// checking
		if (sensitivityExceptions.contains(caseTypeCode.caseTypeCode)) {
			isSensitivityExceptionType.result = true;
		} else {
			isSensitivityExceptionType.result = false;
		}
		// Case Client Security Variables

		return isSensitivityExceptionType;
	}
	protected void performSecurityChecks(
			final ConcernRoleCommunicationDtls concernRoleCommunicationDtls)
	throws AppException, InformationalException {

		if (concernRoleCommunicationDtls.caseID != 0) {
			// Set key to check case security
			final CheckSecurityCaseIDKey checkSecurityCaseIDKey = new CheckSecurityCaseIDKey();

			checkSecurityCaseIDKey.caseID = concernRoleCommunicationDtls.caseID;
			// check case security
			checkCaseSecurity(checkSecurityCaseIDKey);

		} else {

			// BEGIN, CR00227042, PM
			final DataBasedSecurity dataBasedSecurity = SecurityImplementationFactory.get();
			final ParticipantSecurityCheckKey participantSecurityCheckKey = new ParticipantSecurityCheckKey();

			participantSecurityCheckKey.participantID = concernRoleCommunicationDtls.concernRoleID;
			participantSecurityCheckKey.type = LOCATIONACCESSTYPE.MAINTAIN;
			final DataBasedSecurityResult dataBasedSecurityResult = dataBasedSecurity.checkParticipantSecurity(
					participantSecurityCheckKey);

			if (!dataBasedSecurityResult.result) {

				throw new AppException(
						curam.message.GENERALCONCERN.ERR_CONCERNROLE_FV_SENSITIVE);
			}
			// END, CR00227042
		}
	}
	public ConcernRoleCommKeyOut insertCommDetails(
			final MaintainCommunicationKey commKey,
			final CommunicationDetails commDetails,
			final CommunicationContactKey contactKey) throws AppException,
			InformationalException {

		final ConcernRoleCommKeyOut concernRoleCommKeyOut = new ConcernRoleCommKeyOut();

		final curam.core.intf.UniqueID uniqueIDObj = curam.core.fact.UniqueIDFactory.newInstance();

		// ConcernRoleComm manipulation variables
		final curam.core.intf.ConcernRoleCommunication concernRoleCommunicationObj = curam.core.fact.ConcernRoleCommunicationFactory.newInstance();
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

		concernRoleCommunicationDtls.attachmentInd = commDetails.attachmentInd;

		concernRoleCommunicationDtls.communicationFormat = commDetails.communicationFormat;
		concernRoleCommunicationDtls.emailAddressID = contactKey.emailAddressID;
		concernRoleCommunicationDtls.addressID = contactKey.addressID;
		concernRoleCommunicationDtls.phoneNumberID = contactKey.phoneNumberID;




		// if attachment for a communication is present,
		// set the attachment indicator
		if (commDetails.newAttachmentName.length() != 0) {
			concernRoleCommunicationDtls.attachmentInd = true;
		}

		// Insert new communication entry
		concernRoleCommunicationObj.insert(concernRoleCommunicationDtls);

		concernRoleCommKeyOut.communicationID = commDetails.communicationID;
		//Getting extra parameters from the specified table
		MOLSAConcernRoleCommunicationDtls molsaCommDtls=new MOLSAConcernRoleCommunicationDtls();
		if(commDetails.caseID!=0){

			molsaCommDtls.caseReferenceID=MOLSACommunicationHelper.getCaseReferenceID(commKey.caseID);
		}


		molsaCommDtls.communicationID=commDetails.communicationID;

		//param:Program Name

		molsaCommDtls.programNames=MOLSACommunicationHelper.getProgramName();

		molsaCommDtls.molsaLocationID=MOLSACommunicationHelper.molsaLocation();
		molsaCommDtls.IBAN=MOLSACommunicationHelper.getIBAN(commDetails.correspondentConcernRoleID);

		if(commDetails.proFormaID==45010){
			//As per the new MOLSA requirement card expiry date should be 3 years from the date of printing
			//if(MOLSACommunicationHelper.getCardExpiry(commDetails.caseID)!=null){
				java.util.Date javaDate=new java.util.Date();
				String certEndDateToString="";
				SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
				Calendar cal = Calendar.getInstance();
				cal.add(Calendar.YEAR, 3);
				javaDate=cal.getTime();
				Date curamDate= new Date();
				curamDate.getFromJavaUtilDate(javaDate);
				certEndDateToString = dateFormat.format(cal.getTime());
				molsaCommDtls.cardExpiryDate=certEndDateToString;
				//molsaCommDtls.cardExpiryDate=MOLSACommunicationHelper.getCardExpiry(commDetails.caseID);

			//}	
			if(molsaCommDtls.cardExpiryDate.equals(Date.kZeroDate)){
				throw new AppException(MOLSABPOTRAINING.ERR_COMMUNICATION_CARDEXPIRY_FOR_MOLSA_CARD_EMPTY);	
			}
			molsaCommDtls.bankBranchID=MOLSACommunicationHelper.getBankID(commDetails.correspondentConcernRoleID);
			if(molsaCommDtls.IBAN.equals("")||molsaCommDtls.bankBranchID==0){
				throw new AppException(MOLSABPOTRAINING.ERR_COMMUNICATION_BANK_DETAILS_FOR_MOLSA_CARD_EMPTY);
			}
		}
		//get the casewoker name

		molsaCommDtls.caseWorkerName=MOLSACommunicationHelper.getCaseWorkerName();
		HashMap<String, HashMap<String, Money>>  productMap = MOLSACommunicationHelper.getProductMap(commDetails.caseID);
		HashMap<String, Money> mainProductMap= productMap.get(MOLSACommunicationHelper.kMain);
		HashMap<String, Money> maidProductMap= productMap.get(MOLSACommunicationHelper.kMaid);

		if(mainProductMap != null && mainProductMap.size()>0) {
			Map.Entry<String,Money> entry=mainProductMap.entrySet().iterator().next();
			molsaCommDtls.mainProductName=entry.getKey();
			molsaCommDtls.mainProductAmount=entry.getValue();
		}

		if(maidProductMap != null && maidProductMap.size()>0) {
			Map.Entry<String,Money> entry=maidProductMap.entrySet().iterator().next();
			molsaCommDtls.maidAssistanceAmount=entry.getValue();
		}
		molsaCommDtls.nomineeAlternateID=MOLSACommunicationHelper.getNomineeAlternateID(commDetails.caseID);
		molsaCommDtls.caseWorkerMobile=MOLSACommunicationHelper.getCaseWorkerMobileNo();
		molsaCommDtls.benefNomineeName=MOLSACommunicationHelper.getNomineeName(commDetails.caseID);
		molsaCommDtls.inquiryReviewDate=Date.getCurrentDate().addDays(30).toString();
		//Calling method to save additional parameters to the new entity dtls struct as per the requirement	
		MOLSACommunicationHelper.insertAdditionalCommParams(molsaCommDtls);

		return concernRoleCommKeyOut;
	}
	public void checkCaseSecurity(final CheckSecurityCaseIDKey key)
	throws AppException, InformationalException {

		if (key.caseID != 0) {

			// BEGIN CR00100436
			final curam.core.struct.CaseKey caseKey = new curam.core.struct.CaseKey();

			caseKey.caseID = key.caseID;
			final SecurityResult isSensitivityException = checkSensitivityExceptions(
					caseKey);

			if (!isSensitivityException.result) {

				// BEGIN, CR00227042, PM
				final DataBasedSecurity dataBasedSecurity = SecurityImplementationFactory.get();
				final CaseSecurityCheckKey caseSecurityCheckKey = new CaseSecurityCheckKey();

				caseSecurityCheckKey.caseID = key.caseID;
				caseSecurityCheckKey.type = DataBasedSecurity.kMaintainSecurityCheck;

				final DataBasedSecurityResult dataBasedSecurityResult = dataBasedSecurity.checkCaseSecurity1(
						caseSecurityCheckKey);

				if (!dataBasedSecurityResult.result) {
					if (dataBasedSecurityResult.readOnly) {
						throw new AppException(
								GENERALCASE.ERR_CASESECURITY_CHECK_READONLY_RIGHTS);
					} else if (dataBasedSecurityResult.restricted) {
						throw new AppException(GENERALCASE.ERR_CASESECURITY_CHECK_RIGHTS);
					} else {
						throw new AppException(
								GENERALCASE.ERR_CASESECURITY_CHECK_ACCESS_RIGHTS);
					}
				}
				// END, CR00227042
			}
		}
		// END, CR00100436
	}


	public ProFormaCommDetails1 readProForma1(
			final ProFormaCommKey proFormaCommKey) throws AppException,
			InformationalException {

		final ProFormaCommDetails1 proFormaCommDetails = new ProFormaCommDetails1();

		final ConcernRoleCommunication concernRoleCommunicationObj = ConcernRoleCommunicationFactory.newInstance();
		ConcernRoleCommunicationDtls concernRoleCommunicationDtls;
		final ConcernRoleCommunicationKey concernRoleCommunicationKey = new ConcernRoleCommunicationKey();

		concernRoleCommunicationKey.communicationID = proFormaCommKey.communicationID;

		concernRoleCommunicationDtls = concernRoleCommunicationObj.read(
				concernRoleCommunicationKey);

		// BEGIN, CR00227859, PM
		performSecurityChecksForRead(concernRoleCommunicationDtls);
		// END, CR00227859

		final ProFormaCommDetails commDetails = new ProFormaCommDetails();

		commDetails.assign(concernRoleCommunicationDtls);

		proFormaCommDetails.assign(commDetails);

		final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();

		final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		concernRoleKey.concernRoleID = concernRoleCommunicationDtls.correspondentConcernRoleID;

		proFormaCommDetails.correspondentConcernRoleType = concernRoleObj.readConcernRoleType(concernRoleKey).concernRoleType;

		if (concernRoleCommunicationDtls.caseID != 0) {

			final CaseIDParticipantRoleKey caseIDParticipantRoleKey = new CaseIDParticipantRoleKey();

			final curam.core.sl.entity.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.entity.fact.CaseParticipantRoleFactory.newInstance();

			caseIDParticipantRoleKey.caseID = concernRoleCommunicationDtls.caseID;
			caseIDParticipantRoleKey.participantRoleID = concernRoleCommunicationDtls.correspondentConcernRoleID;

			proFormaCommDetails.caseParticipantRoleID = caseParticipantRoleObj.readCaseParticipantRoleID(caseIDParticipantRoleKey).caseParticipantRoleID;
		}

		// If an address record for concern role exists, read its details.
		if (concernRoleCommunicationDtls.addressID != 0) {

			final Address addressObj = AddressFactory.newInstance();
			final AddressKey addressKey = new AddressKey();
			AddressDtls addressDtls;
			final OtherAddressData otherAddressData = new OtherAddressData();

			addressKey.addressID = concernRoleCommunicationDtls.addressID;
			addressDtls = addressObj.read(addressKey);

			final OtherAddressData addressDataStr = new OtherAddressData();

			addressDataStr.addressData = addressDtls.addressData;

			// BEGIN, CR00219204, SW
			addressObj.getLongFormat(addressDataStr);

			// BEGIN, CR00340652, KRK
			if (addressDataStr.addressData.contains(
					BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(
							TransactionInfo.getProgramLocale()))) {
				// END, CR00340652

				proFormaCommDetails.formattedAddressData = BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(
						TransactionInfo.getProgramLocale());
				proFormaCommDetails.addressLine1 = BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(
						TransactionInfo.getProgramLocale());

			} else {

				proFormaCommDetails.formattedAddressData = addressDataStr.addressData;

				// BEGIN, CR00219204, SW
				otherAddressData.addressData = addressDtls.addressData;
				// END, CR00219204

				// BEGIN, CR00296699, ZV
				proFormaCommDetails.addressLine1 = addressObj.getShortFormat(otherAddressData).addressData;
				// END CR00296699

			}
			// END, CR00219204
		}
		return proFormaCommDetails;
	}
	public void createProFormaCommunication1(
			final ProFormaCommDetails1 proFormaCommDetails) throws AppException,
			InformationalException {

		createProFormaCommReturningID(proFormaCommDetails);
	}
	public ConcernRoleCommKeyOut createProFormaCommReturningID(
			ProFormaCommDetails1 proFormaCommDetails) throws AppException,
			InformationalException {
		final ConcernRoleCommKeyOut concernRoleCommKeyOut = createProFormaReturningID(
				proFormaCommDetails);
		final CaseParticipantRoleDetails caseParticipantRoleDetails = new CaseParticipantRoleDetails();

		caseParticipantRoleDetails.dtls.caseID = proFormaCommDetails.caseID;
		caseParticipantRoleDetails.dtls.fromDate = Date.getCurrentDate();
		caseParticipantRoleDetails.dtls.typeCode = CASEPARTICIPANTROLETYPE.CORRESPONDENT;
		caseParticipantRoleDetails.dtls.caseParticipantRoleID = proFormaCommDetails.caseParticipantRoleID;
		caseParticipantRoleDetails.dtls.participantRoleID = proFormaCommDetails.correspondentParticipantRoleID;

		addCaseParticipant(caseParticipantRoleDetails);
		return concernRoleCommKeyOut;
	}
}
