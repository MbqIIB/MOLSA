package curam.molsa.core.facade.impl;

import curam.codetable.CASETYPECODE;
import curam.codetable.COMMUNICATIONFORMAT;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.facade.struct.CreateProFormaCommDetails1;
import curam.core.facade.struct.FileNameAndDataDtls;
import curam.core.facade.struct.ListProFormaTemplateByTypeAndParticipantKey;
import curam.core.facade.struct.ListProFormaTemplateByTypeAndParticpant;
import curam.core.facade.struct.ReadAttachmentKey;
import curam.core.facade.struct.ReadCommunicationAttachmentDetails;
import curam.core.fact.CommAttachmentLinkFactory;
import curam.core.fact.ConcernRoleCommunicationFactory;
import curam.core.intf.CommAttachmentLink;
import curam.core.intf.ConcernRoleCommunication;
import curam.core.sl.fact.CommunicationFactory;
import curam.core.sl.struct.CommunicationIDKey;
import curam.core.sl.struct.PreviewProFormaKey;
import curam.core.sl.struct.ProFormaCommKey;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseKey;
import curam.core.struct.CaseTypeCode;
import curam.core.struct.CommunicationAttachmentLinkReadmultiKey;
import curam.core.struct.ConcernRoleCommunicationDtls;
import curam.core.struct.ConcernRoleCommunicationKey;
import curam.core.struct.SearchTemplatesKey;
import curam.core.struct.XSLTemplateDetails;
import curam.molsa.core.sl.fact.MOLSACommunicationDAFactory;
import curam.serviceplans.facade.struct.ServicePlanSecurityKey;
import curam.serviceplans.sl.impl.ServicePlanSecurity;
import curam.serviceplans.sl.impl.ServicePlanSecurityImplementationFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;



public class MOLSACommunicationDA extends
curam.molsa.core.facade.base.MOLSACommunicationDA{

	@Override
	public void createProForma1(CreateProFormaCommDetails1 dtls)
	throws AppException, InformationalException {
		// TODO Auto-generated method stub
		curam.molsa.core.sl.intf.MOLSACommunicationDA communicationObj= MOLSACommunicationDAFactory.newInstance();
		communicationObj.createProForma1(dtls.dtls);
	}
	// END, CR00262895

	// BEGIN, CR00246099, AK
	/**
	 * Returns the file content and the file name of the communication that has 
	 * to be opened or previewed.
	 *
	 * @param CommunicationIDKey Contains the Communication ID.
	 *
	 * @return FileNameAndDataDtls the name and the content of the file.
	 *
	 * @throws InformationalException Generic Exception Signature.
	 * @throws AppException Generic Exception Signature.
	 */
	public FileNameAndDataDtls printCommunication(
			final CommunicationIDKey communicationIDKey)
	throws AppException, InformationalException {
		final FileNameAndDataDtls fileNameAndDataDtls = new FileNameAndDataDtls();
		//	final curam.core.sl.intf.Communication communicationObj = CommunicationFactory.newInstance();
		final curam.molsa.core.sl.intf.MOLSACommunicationDA communicationObj=MOLSACommunicationDAFactory.newInstance();
		final ConcernRoleCommunication concernRoleCommunicationObj = ConcernRoleCommunicationFactory.newInstance();
		final ConcernRoleCommunicationKey key = new ConcernRoleCommunicationKey();

		key.communicationID = communicationIDKey.communicationID;
		final ConcernRoleCommunicationDtls communicationDetails = concernRoleCommunicationObj.read(
				key);

		if (COMMUNICATIONFORMAT.PROFORMA.equals(
				communicationDetails.communicationFormat)) {

			final PreviewProFormaKey previewProFormaKey = new PreviewProFormaKey();

			previewProFormaKey.communicationID = communicationIDKey.communicationID;
			final ProFormaReturnDocDetails proformaDetails = communicationObj.previewProForma(
					previewProFormaKey);

			fileNameAndDataDtls.fileContent = proformaDetails.fileDate;
			fileNameAndDataDtls.fileName = proformaDetails.fileName;

		} else if (COMMUNICATIONFORMAT.MSWORD.equals(
				communicationDetails.communicationFormat)) {

			final CommAttachmentLink commAttachmentLinkObj = CommAttachmentLinkFactory.newInstance();
			final CommunicationAttachmentLinkReadmultiKey rmkey = new CommunicationAttachmentLinkReadmultiKey();

			rmkey.communicationID = communicationIDKey.communicationID;
			final ReadAttachmentKey readAttachmentKey = new ReadAttachmentKey();

			readAttachmentKey.readAttachmentIn.attachmentID = commAttachmentLinkObj.searchByCommunication(rmkey).dtls.item(0).attachmentID;
			final ReadCommunicationAttachmentDetails attachmentDetails = ParticipantFactory.newInstance().readCommunicationAttachment(
					readAttachmentKey);

			fileNameAndDataDtls.fileContent = attachmentDetails.readCommunicationAttachmentDtls.attachmentContents;
			fileNameAndDataDtls.fileName = attachmentDetails.readCommunicationAttachmentDtls.attachmentName;     
		}
		return fileNameAndDataDtls;
	}


	public ProFormaReturnDocDetails previewProForma(
			final PreviewProFormaKey previewProFormaKey)
	throws AppException, InformationalException {

		//    final curam.core.sl.intf.Communication communicationObj = curam.core.sl.fact.CommunicationFactory.newInstance();

		curam.molsa.core.sl.intf.MOLSACommunicationDA communicationObj= MOLSACommunicationDAFactory.newInstance();

		ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();
		// BEGIN, CR00164728, JMA
		final ProFormaCommKey proFormaCommKey = new ProFormaCommKey();

		final curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
		final CaseKey caseKey = new CaseKey();

		proFormaCommKey.communicationID = previewProFormaKey.communicationID;

		// BEGIN, CR00236672, NS
		final curam.core.sl.struct.ProFormaCommDetails1 proFormaCommDetails = communicationObj.readProForma1(
				proFormaCommKey);

		// END, CR00236672

		caseKey.caseID = proFormaCommDetails.caseID;
		previewProFormaKey.localeIdentifier = proFormaCommDetails.localeIdentifier;
		// END, CR00164728,
		if (caseKey.caseID != 0) {
			// read case type code
			final CaseTypeCode caseTypeCode = caseHeaderObj.readCaseTypeCode(caseKey);

			// if case type is service plan, check service plan security
			if (caseTypeCode.caseTypeCode.equals(CASETYPECODE.SERVICEPLAN)) {

				// ServicePlanDelivery facade
				final curam.serviceplans.facade.intf.ServicePlanDelivery servicePlanDeliveryObj = curam.serviceplans.facade.fact.ServicePlanDeliveryFactory.newInstance();
				final ServicePlanSecurityKey servicePlanSecurityKey = new ServicePlanSecurityKey();

				// register the service plan security implementation
				ServicePlanSecurityImplementationFactory.register();

				// set the key
				servicePlanSecurityKey.caseID = caseKey.caseID;
				servicePlanSecurityKey.securityCheckType = ServicePlanSecurity.kMaintainSecurityCheck;

				// check security
				servicePlanDeliveryObj.checkSecurity(servicePlanSecurityKey);
			}

		}

		// Call service layer method to print a pro forma communication
		proFormaReturnDocDetails = communicationObj.previewProForma(
				previewProFormaKey);

		return proFormaReturnDocDetails;
	}

	@Override
	public void createProFormaCommunication1(
			final CreateProFormaCommDetails1 createProFormaCommDetails)
	throws AppException, InformationalException {

		//    final curam.core.sl.intf.Communication communicationObj = CommunicationFactory.newInstance();
		final curam.molsa.core.sl.intf.MOLSACommunicationDA molsaCommunicationObj=MOLSACommunicationDAFactory.newInstance();
		molsaCommunicationObj.createProFormaCommunication1(
				createProFormaCommDetails.dtls);
	}

	@Override
	public ListProFormaTemplateByTypeAndParticpant listTemplateByTypeAndParticipant(
			ListProFormaTemplateByTypeAndParticipantKey listProFormaTemplateByTypeAndParticipantKey)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		 // create return object
	    final ListProFormaTemplateByTypeAndParticpant listProFormaTemplateByTypeAndParticpant = new ListProFormaTemplateByTypeAndParticpant();

	    // MaintainXSLTemplate manipulation variables
	    final curam.core.intf.MaintainXSLTemplate maintainXSLTemplateObj = curam.core.fact.MaintainXSLTemplateFactory.newInstance();
	    final SearchTemplatesKey searchTemplatesKey = new SearchTemplatesKey();

	    if ((listProFormaTemplateByTypeAndParticipantKey.participantRoleID == 0)
	      && (listProFormaTemplateByTypeAndParticipantKey.caseID != 0)) {

	      final curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
	      final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

	      // Set key to read caseHeader to retrieve the concernRoleID
	      caseHeaderKey.caseID = listProFormaTemplateByTypeAndParticipantKey.caseID;
	      // BEGIN, CR00108061, GSP
	      // Read caseHeader
	      listProFormaTemplateByTypeAndParticipantKey.participantRoleID = caseHeaderObj.read(caseHeaderKey).concernRoleID;
	      // END, CR00108061
	    }

	    // Set key details to retrieve the list of templates
	    searchTemplatesKey.concernRoleID = listProFormaTemplateByTypeAndParticipantKey.participantRoleID;
	    searchTemplatesKey.templateType = listProFormaTemplateByTypeAndParticipantKey.templateType;
	    searchTemplatesKey.caseID = listProFormaTemplateByTypeAndParticipantKey.caseID;

	    // Call MaintainXSLTemplate BPO to retrieve the list of templates
	    listProFormaTemplateByTypeAndParticpant.searchTemplatesByConcernAndTypeResult = maintainXSLTemplateObj.searchTemplatesByConcernAndType(
	      searchTemplatesKey);
	
	    for(XSLTemplateDetails xsltemplate:listProFormaTemplateByTypeAndParticpant.searchTemplatesByConcernAndTypeResult.xslTemplateDetailsListOut.dtls.items()){
	    	
	    	if((xsltemplate.templateID==45001)||(xsltemplate.templateID==45002)||(xsltemplate.templateID==45003)||(xsltemplate.templateID==45004)||(xsltemplate.templateID==45005)||
					(xsltemplate.templateID==45006)||(xsltemplate.templateID==45008)||(xsltemplate.templateID==45009)||(xsltemplate.templateID==45010)||
					(xsltemplate.templateID==45011)||(xsltemplate.templateID==45012)||(xsltemplate.templateID==45013)||(xsltemplate.templateID==45014)||(xsltemplate.templateID==45015)){
	    		 listProFormaTemplateByTypeAndParticpant.searchTemplatesByConcernAndTypeResult.xslTemplateDetailsListOut.dtls.remove(xsltemplate);
	    		 }
	    	
	    }

	    return listProFormaTemplateByTypeAndParticpant;
	}

	@Override
	public ListProFormaTemplateByTypeAndParticpant listTemplateByTypeAndParticipantAutoDisplay(
			ListProFormaTemplateByTypeAndParticipantKey listProFormaTemplateByTypeAndParticipantKey)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		 // create return object
	    final ListProFormaTemplateByTypeAndParticpant listProFormaTemplateByTypeAndParticpant = new ListProFormaTemplateByTypeAndParticpant();

	    // MaintainXSLTemplate manipulation variables
	    final curam.core.intf.MaintainXSLTemplate maintainXSLTemplateObj = curam.core.fact.MaintainXSLTemplateFactory.newInstance();
	    final SearchTemplatesKey searchTemplatesKey = new SearchTemplatesKey();

	    if ((listProFormaTemplateByTypeAndParticipantKey.participantRoleID == 0)
	      && (listProFormaTemplateByTypeAndParticipantKey.caseID != 0)) {

	      final curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
	      final CaseHeaderKey caseHeaderKey = new CaseHeaderKey();

	      // Set key to read caseHeader to retrieve the concernRoleID
	      caseHeaderKey.caseID = listProFormaTemplateByTypeAndParticipantKey.caseID;
	      // BEGIN, CR00108061, GSP
	      // Read caseHeader
	      listProFormaTemplateByTypeAndParticipantKey.participantRoleID = caseHeaderObj.read(caseHeaderKey).concernRoleID;
	      // END, CR00108061
	    }

	    // Set key details to retrieve the list of templates
	    searchTemplatesKey.concernRoleID = listProFormaTemplateByTypeAndParticipantKey.participantRoleID;
	    searchTemplatesKey.templateType = "CT1";
	    searchTemplatesKey.caseID = listProFormaTemplateByTypeAndParticipantKey.caseID;

	    // Call MaintainXSLTemplate BPO to retrieve the list of templates
	    listProFormaTemplateByTypeAndParticpant.searchTemplatesByConcernAndTypeResult = maintainXSLTemplateObj.searchTemplatesByConcernAndType(
	      searchTemplatesKey);
	   return listProFormaTemplateByTypeAndParticpant;
	}
}


