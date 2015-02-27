package curam.molsa.core.impl;

import java.io.ByteArrayOutputStream;

import curam.codetable.ORGOBJECTTYPE;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.sl.intf.CaseUserRole;
import curam.core.sl.struct.CaseOwnerDetails;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressKey;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.ConcernRoleDocumentDetails;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.GetResourcesDetails;
import curam.core.struct.LocationDtls;
import curam.core.struct.LocationKey;
import curam.core.struct.OrganisationID;
import curam.core.struct.OrganisationKey;
import curam.core.struct.OrganisationNameAndAddressDetails;
import curam.core.struct.OtherAddressData;
import curam.core.struct.ProFormaDocumentData;
import curam.core.struct.SystemUserDtls;
import curam.core.struct.UserKeyStruct;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.core.struct.WMInstanceDataDtls;
import curam.core.struct.WMInstanceDataDtlsList;
import curam.core.struct.WMInstanceDataSearchByCaseIDIn;
import curam.molsa.core.struct.MOLSAProFormaDocumentData;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.internal.xml.impl.XMLPrintStreamConstants;
import curam.util.resources.Configuration;
import curam.util.resources.Locale;
import curam.util.type.Blob;
import curam.util.type.DateTime;
import curam.util.xml.impl.XMLDocument;
import curam.util.xml.impl.XMLEncodingConstants;
import curam.util.xml.impl.XMLPrintStream;

public class MOLSAConcernRoleDocumentGenerationDA extends curam.molsa.core.base.MOLSAConcernRoleDocumentGenerationDA{

	@Override
	public void getUserData(ProFormaDocumentData documentData)
			throws AppException, InformationalException {

		// Address object and access structures
		final curam.core.intf.Address addressObj = curam.core.fact.AddressFactory.newInstance();
		final AddressKey addressKey = new AddressKey();
		AddressDtls addressDtls;
		final OtherAddressData otherAddressData = new OtherAddressData();

		// Users object and access structures
		final curam.core.intf.Users usersObj = curam.core.fact.UsersFactory.newInstance();
		final UsersKey usersKey = new UsersKey();
		UsersDtls usersDtls;

		// Location object and access structures
		final curam.core.intf.Location locationObj = curam.core.fact.LocationFactory.newInstance();
		final LocationKey locationKey = new LocationKey();
		LocationDtls locationDtls;

		OrganisationID organisationID = new OrganisationID();
		OrganisationNameAndAddressDetails organisationNameAndAddressDetails;

		// Organization object and access structures
		final curam.core.intf.Organisation organisationObj = curam.core.fact.OrganisationFactory.newInstance();
		final OrganisationKey organisationKey = new OrganisationKey();

		// AdminUser object and access structures
		final curam.core.intf.AdminUserAssistant adminUserAssistantObj = curam.core.fact.AdminUserAssistantFactory.newInstance();
		final UserKeyStruct userKeyStruct = new UserKeyStruct();
		GetResourcesDetails getResourcesDetails;

		// BEGIN, CR00060051, PMD
		// CaseUserRole manipulation variables
		final CaseUserRole caseUserRoleObj = curam.core.sl.fact.CaseUserRoleFactory.newInstance();
		// Case Header Key
		final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
		// END, CR00060051

		final curam.core.intf.SystemUser systemUserObj = curam.core.fact.SystemUserFactory.newInstance();
		SystemUserDtls systemUserDtls;

		// Set current date
		documentData.currentDate = curam.util.type.Date.getCurrentDate();

		// Set event date
		documentData.eventDate = curam.util.type.Date.getCurrentDate();

		// if the system is in deferred processing or in batch mode assume the
		// case
		// owner to be the user.
		// BEGIN , CR00003578, RV
		if ((curam.util.transaction.TransactionInfo.getTransactionType().equals(
				curam.util.transaction.TransactionInfo.TransactionType.kDeferred))
				&& ((documentData.caseID != 0)
						&& (documentData.caseClosureDate == null))) {
			// END, CR00003578

			// BEGIN, CR00060051, PMD
			// Set the case header key
			caseHeaderKey.caseID = documentData.caseID;

			// Read the case owner
			final CaseOwnerDetails caseOwnerDetails = caseUserRoleObj.readOwner(
					caseHeaderKey);

			// BEGIN, CR00075368, SPD
			// If the owner is a user, get the users details
			if (caseOwnerDetails.orgObjectType.equals(ORGOBJECTTYPE.USER)) {

				// set userName
				usersKey.userName = caseOwnerDetails.userName;
			} else if (caseOwnerDetails.orgObjectType.equals(ORGOBJECTTYPE.POSITION)) {

				// Position manipulation variables
				final curam.core.sl.entity.intf.Position positionObj = curam.core.sl.entity.fact.PositionFactory.newInstance();
				final curam.core.sl.entity.struct.PositionKey positionKey = new curam.core.sl.entity.struct.PositionKey();
				curam.core.sl.entity.struct.PositionName positionName = new curam.core.sl.entity.struct.PositionName();

				// populate key for read
				positionKey.positionID = caseOwnerDetails.orgObjectReference;

				// read back Position name
				positionName = positionObj.readPositionName(positionKey);

				// set name to be Position name
				documentData.userFullName = positionName.name;
			} else if (caseOwnerDetails.orgObjectType.equals(ORGOBJECTTYPE.ORGUNIT)) {

				// OrgUnit manipulation variables
				final curam.core.sl.entity.intf.OrganisationUnit organisationUnitObj = curam.core.sl.entity.fact.OrganisationUnitFactory.newInstance();
				final curam.core.sl.entity.struct.OrganisationUnitKey organisationUnitKey = new curam.core.sl.entity.struct.OrganisationUnitKey();
				curam.core.sl.entity.struct.OrganisationUnitName organisationUnitName = new curam.core.sl.entity.struct.OrganisationUnitName();

				// populate key for read
				organisationUnitKey.organisationUnitID = caseOwnerDetails.orgObjectReference;

				// read back OrgUnit name
				organisationUnitName = organisationUnitObj.readOrgUnitName(
						organisationUnitKey);

				// set name to be OrgUnit name
				documentData.userFullName = organisationUnitName.name;
			} else if (caseOwnerDetails.orgObjectType.equals(ORGOBJECTTYPE.WORKQUEUE)) {

				// OrgUnit manipulation variables
				final curam.core.sl.entity.intf.WorkQueue workQueueObj = curam.core.sl.entity.fact.WorkQueueFactory.newInstance();
				final curam.core.sl.entity.struct.WorkQueueKey workQueueKey = new curam.core.sl.entity.struct.WorkQueueKey();
				curam.core.sl.entity.struct.WorkQueueNameDetails workQueueNameDetails = new curam.core.sl.entity.struct.WorkQueueNameDetails();

				// populate key for read
				workQueueKey.workQueueID = caseOwnerDetails.orgObjectReference;

				// read back OrgUnit name
				workQueueNameDetails = workQueueObj.readWorkQueueName(workQueueKey);

				// set name to be OrgUnit name
				documentData.userFullName = workQueueNameDetails.name;
			}
			// END, CR00075368
			// BEGIN , CR00003578, RV
		} else if ((curam.util.transaction.TransactionInfo.getTransactionType().equals(
				curam.util.transaction.TransactionInfo.TransactionType.kDeferred))
				&& (((documentData.caseID != 0))
						&& (documentData.caseClosureDate != null))) {
			systemUserDtls = getLoggedInUser(documentData);
			usersKey.userName = systemUserDtls.userName;
			// END, CR00003578
		} else {

			// Set user key from audit information
			systemUserDtls = systemUserObj.getUserDetails();

			usersKey.userName = systemUserDtls.userName;
		}

		// Read user information
		usersDtls = usersObj.read(usersKey);

		documentData.userFullName = usersDtls.fullName;

		// Ensure that the user's default printer is available
		userKeyStruct.userName = usersKey.userName;

		// Get the default printer information
		getResourcesDetails = adminUserAssistantObj.getUserDefaultPrinter(
				userKeyStruct);

		if (getResourcesDetails.resourceID != 0) {
			documentData.printerName = getResourcesDetails.name;
		}

		// Set location key from user information
		locationKey.locationID = usersDtls.locationID;

		// Read location information
		locationDtls = locationObj.read(locationKey);

		// Set address key from location information
		addressKey.addressID = locationDtls.addressID;

		// Read address information for current user
		addressDtls = addressObj.read(addressKey);

		// Copy user address information to document data
		otherAddressData.addressData = addressDtls.addressData;

		addressObj.getLongFormat(otherAddressData);

		documentData.userAddress = otherAddressData.addressData;

		organisationID = organisationObj.readOrganisationID();

		organisationKey.organisationID = organisationID.organisationID;

		organisationNameAndAddressDetails = organisationObj.readNameAndAddress(
				organisationKey);

		// Copy organization information to document data
		documentData.organisationName = organisationNameAndAddressDetails.name;

	}

	@Override
	public void getConcernRoleData(ConcernRoleKey key,
			ProFormaDocumentData documentData) throws AppException,
			InformationalException {

		// Concern role object and access structures
		final curam.core.intf.ConcernRole concernRoleObj = curam.core.fact.ConcernRoleFactory.newInstance();
		ConcernRoleDtls concernRoleDtls;

		// Address object and access structures
		final curam.core.intf.Address addressObj = curam.core.fact.AddressFactory.newInstance();
		final AddressKey addressKey = new AddressKey();
		AddressDtls addressDtls;
		final OtherAddressData otherAddressData = new OtherAddressData();

		// Read the concern role information
		concernRoleDtls = concernRoleObj.read(key);

		// Copy concern role information to document data
		documentData.assign(concernRoleDtls);

		// Copy the concern role type description to document data
		documentData.concernRoleTypeDesc = curam.util.type.CodeTable.getOneItem(
				curam.codetable.CONCERNROLETYPE.TABLENAME,
				concernRoleDtls.concernRoleType);

		// Set address key from concern role
		addressKey.addressID = concernRoleDtls.primaryAddressID;

		// Read address information for concern role
		addressDtls = addressObj.read(addressKey);

		// Copy concern role address information to document data
		otherAddressData.addressData = addressDtls.addressData;
		addressObj.getLongFormat(otherAddressData);
		documentData.concernRoleAddress = otherAddressData.addressData;

		// is the concern role type service supplier
		if (concernRoleDtls.concernRoleType.equals(
				curam.codetable.CONCERNROLETYPE.SERVICESUPPLIER)) {

			documentData.supplierConcernRoleAddress = documentData.concernRoleAddress;
			documentData.supplierConcernRoleName = documentData.concernRoleName;
		}

	}

	



	@Override
	public ProFormaReturnDocDetails generateAndPreviewXMLDocument(
			ConcernRoleDocumentDetails details, MOLSAProFormaDocumentData molsadata)
			throws AppException, InformationalException {

		final curam.core.intf.SystemUser systemUserObj = curam.core.fact.SystemUserFactory.newInstance();
		SystemUserDtls systemUserDtls;   

		// Return type
		final ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();

		// Create Preview Stream
		final ByteArrayOutputStream previewStream = new java.io.ByteArrayOutputStream();

		// Create XMLPrintStream object
		// BEGIN, CR00306943, KRK
		final XMLPrintStream printStreamObj = new XMLPrintStream();
		// END, CR00306943
		final curam.util.administration.struct.XSLTemplateInstanceKey xslTemplateInstanceKey = new curam.util.administration.struct.XSLTemplateInstanceKey();

		// Set up XSL template instance
		xslTemplateInstanceKey.templateID = details.documentID;
		xslTemplateInstanceKey.templateVersion = details.versionNo;

		xslTemplateInstanceKey.locale = details.localeIdentifier;

		// BEGIN, CR00408760, KRK
		if (!Configuration.getBooleanProperty(
				EnvVars.ENV_XMLSERVER_DISABLE_METHOD_CALLS, 
				Configuration.getBooleanProperty(
						EnvVars.ENV_XMLSERVER_DISABLE_METHOD_CALLS_DEFAULT))) {

			if (molsadata.dtls.printerName.length() > 0) {

				final String printerName = molsadata.dtls.printerName;

				printStreamObj.setPrinterName(printerName);
			}

			printStreamObj.setPreviewStream(previewStream);
			printStreamObj.setJobType(XMLPrintStreamConstants.kJobTypePDF);

			try {
				// BEGIN, CR00306943, KRK
				printStreamObj.open(xslTemplateInstanceKey);
				// END, CR00306943

			} catch (final AppException ex) {

				// an error occurred - was the document not in valid XML format?
				if (ex.getCatEntry().equals(
						curam.util.message.CURAMXML.ERR_PRINT_STREAM_BAD_RESPONSE)) {

					// the pro-forma form is not a valid XML document -
					// convert this to a more meaningful message for the user
					throw new AppException(
							curam.message.BPOCONCERNROLEDOCUMENTGENERATION.ERR_INVALID_FORMAT_NOT_PRINTABLE,
							ex);

				} else {

					// we can't do anything with it -
					// just pass it on up to the calling method
					throw ex;
				}
			}

			// BGIN, CR00335810, MV
			final XMLDocument documentObj = new XMLDocument(
					printStreamObj.getStream(), XMLEncodingConstants.kEncodeUTF8);
			// END, CR00335810

			// Set data to print the document
			String userName = CuramConst.gkEmpty;

			if (molsadata.dtls.caseClosureDate != null) {
				systemUserDtls = getLoggedInUser(molsadata.dtls);
				userName = systemUserDtls.userName;
			} else {
				systemUserDtls = systemUserObj.getUserDetails();
				userName = systemUserDtls.userName;
			}

			final String generatedDate = Locale.getFormattedTime(
					DateTime.getCurrentDateTime());

			final String versionNo = String.valueOf(details.versionNo);
			final String comments = details.comments;

			// Open document
			documentObj.open(userName, generatedDate, versionNo, comments);

			// Add data to document
			documentObj.add(molsadata);

			// Close document and print stream objects
			documentObj.close();
			printStreamObj.close();      
		}
		// END, CR00408760

		proFormaReturnDocDetails.fileName = CuramConst.kProFormaDocumentPreview;
		proFormaReturnDocDetails.fileDate = new Blob(previewStream.toByteArray());

		return proFormaReturnDocDetails;
	}

	@Override
	public SystemUserDtls getLoggedInUser(ProFormaDocumentData documentData)
			throws AppException, InformationalException {

		final SystemUserDtls systemUserDtls = new SystemUserDtls();
		final curam.core.intf.WMInstanceData wmInstanceDataObj = curam.core.fact.WMInstanceDataFactory.newInstance();
		WMInstanceDataDtls wmInstanceDataDtls;
		WMInstanceDataDtlsList wmInstanceDataDtlsList;
		final WMInstanceDataSearchByCaseIDIn wmInstanceDataSearchByCaseIDIn = new WMInstanceDataSearchByCaseIDIn();

		wmInstanceDataSearchByCaseIDIn.caseID = documentData.caseID;
		wmInstanceDataDtlsList = wmInstanceDataObj.searchByCaseID(
				wmInstanceDataSearchByCaseIDIn);
		for (int i = 0; i < wmInstanceDataDtlsList.dtls.size(); i++) {
			wmInstanceDataDtls = wmInstanceDataDtlsList.dtls.item(i);
			if (wmInstanceDataDtls.closureDate != null) {
				systemUserDtls.userName = wmInstanceDataDtls.enteredByID;
				break;
			} else {
				continue;
			}
		}
		return systemUserDtls;
	}

	

}
