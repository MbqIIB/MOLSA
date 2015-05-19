package curam.molsa.core.impl;

import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
import curam.molsa.core.struct.MOLSAProFormaDocumentData;
import curam.molsa.message.MOLSABPOTRAINING;
import curam.molsa.util.impl.MOLSACommunicationHelper;
import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASEUNSUSPENDREASON;
import curam.codetable.RECORDSTATUS;
import curam.core.fact.AlternateNameFactory;
import curam.core.fact.BankBranchFactory;
import curam.core.fact.LocationFactory;
import curam.core.intf.AlternateName;
import curam.core.intf.BankBranch;
import curam.core.intf.Location;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.AddressKey;
import curam.core.struct.AlternateNameDtls;
import curam.core.struct.AlternateNameDtlsList;
import curam.core.struct.AlternateNameKey;
import curam.core.struct.AlternateNameReadMultiKey;
import curam.core.struct.AlternateNameReadMultiStatusStruct;
import curam.core.struct.AlternateNameStruct;
import curam.core.struct.AlternateNameStructList;
import curam.core.struct.BankBranchKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseReferenceProductNameConcernRoleName;
import curam.core.struct.CaseStatusDtls;
import curam.core.struct.CaseStatusDtlsList;
import curam.core.struct.CaseStatusSearchByCaseIDKey;
import curam.core.struct.ClosureDtls;
import curam.core.struct.ConcernRoleCommunicationKey;
import curam.core.struct.ConcernRoleDocumentDetails;
import curam.core.struct.ConcernRoleDocumentKey;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRoleNameAndAlternateID;
import curam.core.struct.CurrentCaseStatusKey;
import curam.core.struct.GetCaseClosureSupplierKey;
import curam.core.struct.LocationDtls;
import curam.core.struct.LocationKey;
import curam.core.struct.LocationKeyRef;
import curam.core.struct.LocationNameStructRef;
import curam.core.struct.NameReadMultiDtls;
import curam.core.struct.NameReadMultiDtlsList;
import curam.core.struct.OtherAddressData;
import curam.core.struct.ProFormaDocumentData;
import curam.core.struct.ReadCaseClosureKey;
import curam.core.struct.ReadParticipantRoleIDDetails;
import curam.message.BPOCOMMUNICATION;
import curam.message.GENERALCASE;
import curam.supervisor.facade.struct.caseID;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public class MOLSAConcernRoleDocumentsDA extends
curam.molsa.core.base.MOLSAConcernRoleDocumentsDA {

	@Override
	/**
	 * This method previews a specified document for the specified concern role.
	 *
	 * @param key
	 * contains concernRoleID, caseID, documentID (in)
	 * @param details
	 * ConcerRoleDocumentDetails (in)
	 *
	 * @return The document name and contents.
	 */
	public ProFormaReturnDocDetails previewDocument(ConcernRoleDocumentKey key, ConcernRoleDocumentDetails details) throws AppException, InformationalException {

		// pro forma document data to be populated
		ProFormaDocumentData proFormaDocumentData = new ProFormaDocumentData();


		// Return type
		ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();    

		// populate the user data
		curam.molsa.core.intf.MOLSAConcernRoleDocumentGenerationDA concernRoleDocumentGenerationObj=curam.molsa.core.fact.MOLSAConcernRoleDocumentGenerationDAFactory.newInstance();
		curam.core.intf.ConcernRoleDocumentGeneration concernRoleDocumentGenerationObjOOTB = curam.core.fact.ConcernRoleDocumentGenerationFactory.newInstance();

		// get the closure details
		curam.core.intf.MaintainCaseClosure maintainCaseClosureObj = curam.core.fact.MaintainCaseClosureFactory.newInstance();
		ReadCaseClosureKey readCaseClosureKey = new ReadCaseClosureKey();

		curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

		if (key.caseID != 0) {

			CaseHeaderDtls caseHeaderDtls;

			caseHeaderKey.caseID = key.caseID;
			caseHeaderDtls = caseHeaderObj.read(caseHeaderKey);
			readCaseClosureKey.caseID = key.caseID;
			ClosureDtls closureDtls = new ClosureDtls();

			if (caseHeaderDtls.statusCode.equals(curam.codetable.CASESTATUS.CLOSED)
					|| caseHeaderDtls.statusCode.equals(
							curam.codetable.CASESTATUS.PENDINGCLOSURE)) {
				closureDtls = maintainCaseClosureObj.readCaseClosure(readCaseClosureKey);
			} else {
				closureDtls.closureDate = null;
			}

			if (closureDtls.closureDate != null) {
				proFormaDocumentData.caseClosureDate = closureDtls.closureDate;
				proFormaDocumentData.caseID = key.caseID;
			}

		}

		concernRoleDocumentGenerationObj.getUserData(proFormaDocumentData);

		// populate the concern role data (if it exists)
		if (key.concernRoleID != 0) {

			ConcernRoleKey concernRoleKey = new ConcernRoleKey();

			// if this it a service supplier communication for a case closure the
			// details returned are for the service supplier.
			concernRoleKey.concernRoleID = key.concernRoleID;
			concernRoleDocumentGenerationObj.getConcernRoleData(concernRoleKey,
					proFormaDocumentData);
		}

		// Read the communication an obtain required address.
		if (details.communicationID != 0) {

			// Concern role communication object and access structures
			curam.core.intf.ConcernRoleCommunication concernRoleCommObj = curam.core.fact.ConcernRoleCommunicationFactory.newInstance();
			ConcernRoleCommunicationKey concernRoleCommunicationKey = new ConcernRoleCommunicationKey();
			AddressKey addressKey = new AddressKey();

			concernRoleCommunicationKey.communicationID = details.communicationID;
			addressKey.addressID = concernRoleCommObj.read(concernRoleCommunicationKey).addressID;

			// Address object and access structures
			curam.core.intf.Address addressObj = curam.core.fact.AddressFactory.newInstance();
			OtherAddressData otherAddressData = new OtherAddressData();

			// Copy concern role address information to document data
			otherAddressData.addressData = addressObj.read(addressKey).addressData;
			addressObj.getLongFormat(otherAddressData);
			proFormaDocumentData.concernRoleAddress = otherAddressData.addressData;
		}

		// populate the case data (if it exists - could be a direct
		// communication with a person, employer etc, i.e. not part of a case).
		if (key.caseID != 0) {
			proFormaDocumentData = populateCaseDetails(key, details,proFormaDocumentData);
		}

		//Using the Customized struct for MOLSA.
		MOLSAProFormaDocumentData molsaproFormaDocumentData =new MOLSAProFormaDocumentData();
		//Assigning the OOTB struct to the new struct
		molsaproFormaDocumentData.dtls=proFormaDocumentData;

		MOLSAConcernRoleCommunicationKey concernRoleCommunicationKey = new MOLSAConcernRoleCommunicationKey();

		//Getting the additional parameters added other than the OOTB parameters by reading the new table

		concernRoleCommunicationKey.communicationID = details.communicationID;
		MOLSAConcernRoleCommunicationDtls concernRoleCommunicationDtls = MOLSACommunicationHelper.readAdditionalCommParams(concernRoleCommunicationKey);
		//Reading program Names, Bank Name ,Manager Name already saved in the  new table
		if (concernRoleCommunicationDtls.programNames!=null){
			molsaproFormaDocumentData.programNames=concernRoleCommunicationDtls.programNames;
		}
		//Getting the bank name from BranchID
		if((concernRoleCommunicationDtls.bankBranchID)!=0){
			BankBranch bankBranch= BankBranchFactory.newInstance();
			BankBranchKey bankKey= new BankBranchKey();
			bankKey.bankBranchID=concernRoleCommunicationDtls.bankBranchID;
			molsaproFormaDocumentData.bankName=bankBranch.read(bankKey).name;
		}
		molsaproFormaDocumentData.molsaManagerName=concernRoleCommunicationDtls.molsaManager;
		molsaproFormaDocumentData.caseReferenceID=concernRoleCommunicationDtls.caseReferenceID;
		molsaproFormaDocumentData.cardExpiryDate=concernRoleCommunicationDtls.cardExpiryDate;
		molsaproFormaDocumentData.iban=concernRoleCommunicationDtls.IBAN;
		molsaproFormaDocumentData.caseWorkerName=concernRoleCommunicationDtls.caseWorkerName;
		molsaproFormaDocumentData.mainProductName=concernRoleCommunicationDtls.mainProductName;
		molsaproFormaDocumentData.mainProductAmount=concernRoleCommunicationDtls.mainProductAmount;
		molsaproFormaDocumentData.maidAssistanceAmount=concernRoleCommunicationDtls.maidAssistanceAmount;
		molsaproFormaDocumentData.benefNomineeName=concernRoleCommunicationDtls.benefNomineeName;
		molsaproFormaDocumentData.caseWorkerMobile=concernRoleCommunicationDtls.caseWorkerMobile;
		molsaproFormaDocumentData.nomineeAlternateID=concernRoleCommunicationDtls.nomineeAlternateID;
		molsaproFormaDocumentData.inquiryReviewDate=concernRoleCommunicationDtls.inquiryReviewDate;

		//Getting the location name from location id 

		if(concernRoleCommunicationDtls.molsaLocationID!=0){
			Location locationObj= LocationFactory.newInstance();
			LocationKey locationKey = new LocationKey();
			locationKey.locationID=MOLSACommunicationHelper.molsaLocation();
			LocationNameStructRef locDtls= new LocationNameStructRef();
			locDtls=locationObj.readLocationName(locationKey);
			molsaproFormaDocumentData.locationName=locDtls.name;	
		}
		if(details.documentID==45002){
			if(molsaproFormaDocumentData.molsaManagerName.equals("")||molsaproFormaDocumentData.bankName.equals("")){
				throw new AppException(MOLSABPOTRAINING.ERR_COMMUNICATION_MANAGER_BANKACCOUNT_EMPTY);
			}
		}
		
		if((details.documentID==45001)||(details.documentID==45003)||(details.documentID==45004)||(details.documentID==45005)||
				(details.documentID==45006)||(details.documentID==45008)||(details.documentID==45009)||
				(details.documentID==45011)||(details.documentID==45012)||(details.documentID==45013)||(details.documentID==45014)||(details.documentID==45015)){
			if(molsaproFormaDocumentData.molsaManagerName.equals("")||molsaproFormaDocumentData.molsaManagerName==null){
				throw new AppException(MOLSABPOTRAINING.ERR_COMMUNICATION_MANAGER_EMPTY);
			}
			
		}

		//New Xsl validation by document ID

		if((details.documentID==45001)||(details.documentID==45002)||(details.documentID==45003)||(details.documentID==45004)||(details.documentID==45005)||
				(details.documentID==45006)||(details.documentID==45008)||(details.documentID==45009)||(details.documentID==45010)||
				(details.documentID==45011)||(details.documentID==45012)||(details.documentID==45013)||(details.documentID==45014)||(details.documentID==45015)){
			if(!(MOLSACommunicationHelper.getFullName(key.concernRoleID).equals(""))){
				proFormaDocumentData.concernRoleName=MOLSACommunicationHelper.getFullName(key.concernRoleID);
			}
			
			if(details.documentID==45009){
				if(molsaproFormaDocumentData.benefNomineeName.equals("")||molsaproFormaDocumentData.benefNomineeName==null){
					molsaproFormaDocumentData.benefNomineeName=proFormaDocumentData.concernRoleName;
					molsaproFormaDocumentData.nomineeAlternateID=proFormaDocumentData.alternateID;
				}	
			}
			//call generateAndPreviewXMLDocument method with new struct for the new documents with below ids
			proFormaReturnDocDetails = concernRoleDocumentGenerationObj.generateAndPreviewXMLDocument(details,molsaproFormaDocumentData); 
		}else{
			//else call with OOTB struct
			proFormaReturnDocDetails = concernRoleDocumentGenerationObjOOTB.generateAndPreviewXMLDocument(details,proFormaDocumentData);
		}

		return proFormaReturnDocDetails;

	}
	// ___________________________________________________________________________
	/**
	 * This method helps populate case details for case communications.
	 *
	 * @param key
	 * contains concernRoleID, caseID, documentID (in)
	 * @param details
	 * ConcerRoleDocumentDetails (in)
	 *
	 * @return ProFormaDocumentData
	 */
	protected ProFormaDocumentData populateCaseDetails(ConcernRoleDocumentKey key, ConcernRoleDocumentDetails details, ProFormaDocumentData proFormaDocumentData) 
	throws AppException, InformationalException {

		curam.core.intf.ConcernRoleDocumentGeneration concernRoleDocumentGenerationObj = curam.core.fact.ConcernRoleDocumentGenerationFactory.newInstance();  
		curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();    
		CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

		// populate the case ID
		proFormaDocumentData.caseID = key.caseID;

		// maintainCase manipulation variables to retrieve case reference and
		// product name.
		curam.core.intf.MaintainCase maintainCaseObj = curam.core.fact.MaintainCaseFactory.newInstance();

		curam.core.sl.struct.CaseIDKey caseIDKey = new curam.core.sl.struct.CaseIDKey();

		// get the case reference and product name.
		caseIDKey.caseID = key.caseID;
		CaseReferenceProductNameConcernRoleName caseReferenceProductNameConcernRoleName = maintainCaseObj.readCaseReferenceConcernRoleNameProductNameByCaseID(
				caseIDKey);

		proFormaDocumentData.caseReference = caseReferenceProductNameConcernRoleName.caseReference;

		proFormaDocumentData.productType = caseReferenceProductNameConcernRoleName.productName;

		// XSLTemplate Obj, XSLTemplateKey and XSLTemplateInstDtls structs
		curam.util.internal.xml.intf.XSLTemplate xslTemplateObj = curam.util.internal.xml.fact.XSLTemplateFactory.newInstance();
		curam.util.internal.xml.struct.XSLTemplateDtls xslTemplateDtls;
		curam.util.internal.xml.struct.XSLTemplateKey xslTemplateKey = new curam.util.internal.xml.struct.XSLTemplateKey();

		xslTemplateKey.templateID = key.documentID;

		if ((details.localeIdentifier == null)
				|| (details.localeIdentifier.length() == 0)) {
			xslTemplateKey.localeIdentifier = TransactionInfo.getProgramLocale();
		} else {
			xslTemplateKey.localeIdentifier = details.localeIdentifier;
		}

		// read the template details
		try {

			xslTemplateDtls = xslTemplateObj.read(xslTemplateKey);

		} catch (curam.util.exception.RecordNotFoundException e) {

			AppException ae = new AppException(
					curam.message.GENERALCONCERN.ERR_PROFORMATEMPLATE_RNFE);

			ae.arg(xslTemplateKey.templateID);
			throw ae;

		}

		// is it a client communication for a case closure?
		if (xslTemplateDtls.templateIDCode.equals(
				curam.codetable.TEMPLATEIDCODE.CASECLOSURECLIENTNOTIFICATION)
				|| xslTemplateDtls.templateIDCode.equals(
						curam.codetable.TEMPLATEIDCODE.CASEREACTIVATIONCLIENTCOMMUNICATION)) {

			// populate the case closure data
			GetCaseClosureSupplierKey getCaseClosureSupplierKey = new GetCaseClosureSupplierKey();

			getCaseClosureSupplierKey.caseID = key.caseID;

			try {

				concernRoleDocumentGenerationObj.getCaseClosureClientData(
						getCaseClosureSupplierKey, proFormaDocumentData);          

			} catch (AppException ae) {
				if (ae.getCatEntry().equals(GENERALCASE.ERR_CASEEVENT_RNFE_CASE)) {
					throw new AppException(
							BPOCOMMUNICATION.ERR_COMM_XRV_CASE_NEVER_CLOSED);
				}           
			} catch (InformationalException ae) { 
				if (ae.getMessage().equals(GENERALCASE.ERR_CASEEVENT_RNFE_CASE)) {
					throw new AppException(
							BPOCOMMUNICATION.ERR_COMM_XRV_CASE_NEVER_CLOSED);
				}         
			}

			// or is it a supplier communication for a case closure
		} else if (xslTemplateDtls.templateIDCode.equals(
				curam.codetable.TEMPLATEIDCODE.CASECLOSURESUPPLIERNOTIFICATION)) {

			curam.core.intf.CaseStatus caseStatusObj = curam.core.fact.CaseStatusFactory.newInstance();
			CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();
			CaseStatusDtls caseStatusDtls;

			// BEGIN, CR00166384, JMA
			currentCaseStatusKey.caseID = key.caseID;
			// END, CR00166384

			try {
				// BEGIN, CR00224271, ZV
				caseStatusDtls = caseStatusObj.readCurrentStatusByCaseID1(
						currentCaseStatusKey);
				// END, CR00224271

			} catch (curam.util.exception.RecordNotFoundException e) {

				AppException ae = new AppException(
						curam.message.GENERALCASE.ERR_CASESTATUS_RNFE_CASE);

				ae.arg(caseReferenceProductNameConcernRoleName.caseReference);

				throw ae;
			}

			// BEGIN, CR00166384, JMA
			// is the case closed or pending closure?
			if (!caseStatusDtls.statusCode.equals(
					curam.codetable.CASESTATUS.PENDINGCLOSURE)
					&& !caseStatusDtls.statusCode.equals(
							curam.codetable.CASESTATUS.CLOSED)) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().throwWithLookup(
						new AppException(BPOCOMMUNICATION.ERR_COMM_XRV_CASE_NOT_CLOSED),
						curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 0);

			}                

			if (key.concernRoleID != 0) {

				// CaseHeader manipulation variables to retrieve participant role id.
				caseHeaderKey.caseID = key.caseID;

				// ConcernRole manipulation variables to retrieve participant name and
				// alternate id.
				curam.core.intf.ConcernRole concernObj = curam.core.fact.ConcernRoleFactory.newInstance();
				ConcernRoleKey concernRoleKey = new ConcernRoleKey();

				// as the concern role details returned above are for the service
				// supplier we need to get the participant details.

				ReadParticipantRoleIDDetails readParticipantRoleIDDetails = caseHeaderObj.readParticipantRoleID(
						caseHeaderKey);

				concernRoleKey.concernRoleID = readParticipantRoleIDDetails.concernRoleID;

				ConcernRoleNameAndAlternateID concernRoleNameAndAlternateID = concernObj.readConcernRoleNameAndAlternateID(
						concernRoleKey);

				// assign the case participant details.
				proFormaDocumentData.concernRoleName = concernRoleNameAndAlternateID.concernRoleName;
				proFormaDocumentData.alternateID = concernRoleNameAndAlternateID.primaryAlternateID;

			}

		} // if the case has been suspended find the reason
		else if (xslTemplateDtls.templateIDCode.equals(
				curam.codetable.TEMPLATEIDCODE.CASESUSPENDEDCLIENTCOMMUNICATION)) {

			CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

			currentCaseStatusKey.caseID = key.caseID;

			curam.core.intf.CaseStatus caseStatusObj = curam.core.fact.CaseStatusFactory.newInstance();

			// populate the reason code
			// BEGIN, CR00224271, ZV
			proFormaDocumentData.reason = caseStatusObj.readCurrentStatusByCaseID1(currentCaseStatusKey).reasonCode;
			// END, CR00224271

			proFormaDocumentData.caseSuspendReason = curam.util.type.CodeTable.getOneItem(
					curam.codetable.CASESUSPENDREASON.TABLENAME,
					proFormaDocumentData.reason);

			if (proFormaDocumentData.caseSuspendReason.equals("")) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().throwWithLookup(
						new AppException(BPOCOMMUNICATION.ERR_COMM_XRV_CASE_NOT_SUSPENDED),
						curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 0);          
			}

		} // if the case has been unsuspended find the reason.
		else if (xslTemplateDtls.templateIDCode.equals(
				curam.codetable.TEMPLATEIDCODE.CASEUNSUSPENDEDCLIENTCOMMUNICATION)) {

			CurrentCaseStatusKey currentCaseStatusKey = new CurrentCaseStatusKey();

			currentCaseStatusKey.caseID = key.caseID;

			curam.core.intf.CaseStatus caseStatusObj = curam.core.fact.CaseStatusFactory.newInstance();

			CaseStatusSearchByCaseIDKey caseStatusSearchByCaseIDKey = new CaseStatusSearchByCaseIDKey();

			caseStatusSearchByCaseIDKey.caseID = key.caseID;

			CaseStatusDtlsList caseStatusDtlsList = caseStatusObj.searchByCaseID(
					caseStatusSearchByCaseIDKey);

			for (int i = 0; i < caseStatusDtlsList.dtls.size(); i++) {

				// if the case status is Open, has an unsuspended reason code and a blank end date
				// then it is the most current Unsuspended reason to use
				if (caseStatusDtlsList.dtls.item(i).statusCode.equals(CASESTATUS.OPEN)
						&& caseStatusDtlsList.dtls.item(i).endDate.isZero()
						&& (caseStatusDtlsList.dtls.item(i).reasonCode.equals(
								CASEUNSUSPENDREASON.NEWEVIDENCE)
								|| caseStatusDtlsList.dtls.item(i).reasonCode.equals(
										CASEUNSUSPENDREASON.SUSPENDEDINERROR))) {

					proFormaDocumentData.caseUnsuspendReason = curam.util.type.CodeTable.getOneItem(
							curam.codetable.CASEUNSUSPENDREASON.TABLENAME,
							caseStatusDtlsList.dtls.item(i).reasonCode);           

				}         
			}
			// BEGIN, CR00164917, JMA
			if (proFormaDocumentData.caseUnsuspendReason.equals("")) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().throwWithLookup(
						new AppException(BPOCOMMUNICATION.ERR_COMM_XRV_CASE_NOT_UNSUSPENDED),
						curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 0);          
			}
			// END, CR00164917
		}

		return proFormaDocumentData;

	}  
}