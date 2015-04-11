package curam.molsa.training.facade.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.inject.Inject;

import curam.attachmentlink.struct.AttachmentLinkKey;
import curam.attendance.impl.ProviderRosterLineItem;
import curam.attendance.impl.ProviderRosterLineItemDAO;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.LOCATIONACCESSTYPE;
import curam.codetable.PRODUCTCATEGORY;
import curam.codetable.RECORDSTATUS;
import curam.codetable.impl.CASEPARTICIPANTROLETYPEEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.intf.Attachment;
import curam.core.facade.intf.Person;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.ConcernRoleAttachmentDetails;
import curam.core.facade.struct.ConcernRoleIDKey;
import curam.core.facade.struct.PersonDetails;
import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey;
import curam.core.facade.struct.PersonSearchKey1;
import curam.core.fact.CaseGroupsFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.ConcernRoleAttachmentLinkFactory;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.InstructionLineItemFactory;
import curam.core.fact.MaintainAttachmentAssistantFactory;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.DataBasedSecurity;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.CaseGroups;
import curam.core.intf.ConcernRoleAttachmentLink;
import curam.core.intf.DatabasePersonSearch;
import curam.core.intf.InstructionLineItem;
import curam.core.intf.MaintainAttachmentAssistant;
import curam.core.sl.fact.AttachmentFactory;
import curam.core.sl.fact.CaseUserRoleFactory;
import curam.core.sl.infrastructure.cmis.impl.CMSMetadataConst;
import curam.core.sl.infrastructure.cmis.impl.CMSMetadataInterface;
import curam.core.sl.intf.CaseUserRole;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.ParticipantSecurityCheckKey;
import curam.core.sl.struct.UserNameAndFullName;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.AttachmentDtls;
import curam.core.struct.AttachmentKey;
import curam.core.struct.AttachmentNameStruct;
import curam.core.struct.CaseGroupEligibleMembersDetails;
import curam.core.struct.CaseGroupEligibleMembersDetailsList;
import curam.core.struct.CaseGroupsDtls;
import curam.core.struct.CaseGroupsDtlsList;
import curam.core.struct.CaseGroupsReadmultiKey;
import curam.core.struct.CaseHeaderByConcernRoleIDKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.CaseID;
import curam.core.struct.CaseIDList;
import curam.core.struct.CaseStatusConcernRoleIDICType;
import curam.core.struct.ConcernRoleAttachmentLinkDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.ConcernRoleNameAndAlternateID;
import curam.core.struct.DataBasedSecurityResult;
import curam.core.struct.ICCaseAndStatusKey;
import curam.core.struct.ILICaseID;
import curam.core.struct.ILITabDetailList;
import curam.core.struct.InformationalMsgDtls;
import curam.core.struct.InformationalMsgDtlsList;
import curam.core.struct.PersonDtls;
import curam.core.struct.PersonKey;
import curam.core.struct.PersonSearchDetails;
import curam.core.struct.PersonSearchResult1;
import curam.core.struct.ProductDeliveryForCaseDetails;
import curam.core.struct.ProductDeliveryForCaseDetailsList;
import curam.core.struct.ProviderLocationKey;
import curam.core.struct.ProvisionLocationKey;
import curam.cpm.facade.fact.ProviderOfferingFactory;
import curam.cpm.facade.fact.ServiceDeliveryFactory;
import curam.cpm.facade.intf.ProviderOffering;
import curam.cpm.facade.struct.ProviderOfferingSummaryDetails;
import curam.cpm.facade.struct.ProviderOfferingSummaryDetailsList;
import curam.cpm.facade.struct.ServiceDeliveryVersionKey;
import curam.cpm.sl.entity.fact.ProviderFactory;
import curam.cpm.sl.entity.intf.Provider;
import curam.cpm.sl.entity.struct.ProviderDtls;
import curam.cpm.sl.entity.struct.ProviderDtlsList;
import curam.cpm.sl.entity.struct.ProviderKey;
import curam.cpm.sl.entity.struct.ServiceOfferingKey;
import curam.cpm.sl.struct.ServiceDeliveryDtls;
import curam.cpm.sl.struct.ServiceDeliveryKey;
import curam.federalallowablecomponent.impl.FederalAllowableComponent;
import curam.federalallowablecomponent.impl.FederalAllowableComponentDAO;
import curam.message.GENERALCONCERN;
import curam.molsa.core.fact.MOLSAPersonSearchRouterDAFactory;
import curam.molsa.core.intf.MOLSAPersonSearchRouterDA;
import curam.molsa.message.MOLSABPOTRAINING;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceDtls;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceKey;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetails;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.training.entity.base.MOLSATraining;
import curam.molsa.training.entity.fact.MOLSAProviderFacilityFactory;
import curam.molsa.training.entity.fact.MOLSASerDelTraininingMappingFactory;
import curam.molsa.training.entity.fact.MOLSATrainingAtttachmentLinkFactory;
import curam.molsa.training.entity.fact.MOLSATrainingCertificateFactory;
import curam.molsa.training.entity.fact.MOLSATrainingFactory;
import curam.molsa.training.entity.intf.MOLSAProviderFacility;
import curam.molsa.training.entity.intf.MOLSASerDelTraininingMapping;
import curam.molsa.training.entity.intf.MOLSATrainingAtttachmentLink;
import curam.molsa.training.entity.intf.MOLSATrainingCertificate;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityDtls;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityDtlsStruct1List;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityKey;
import curam.molsa.training.entity.struct.MOLSAProviderFacilityKeyStruct1;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingDtls;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingDtlsStruct1;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingDtlsStruct1List;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingDtlsStruct2;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingKey;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingKeyStruct1;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingKeyStruct2;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkDtls;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkDtlsStruct1;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkDtlsStruct1List;
import curam.molsa.training.entity.struct.MOLSATrainingAtttachmentLinkKey;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateDtls;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateDtlsStruct1;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateKey;
import curam.molsa.training.entity.struct.MOLSATrainingCertificateKeyStruct1;
import curam.molsa.training.entity.struct.MOLSATrainingDtls;
import curam.molsa.training.entity.struct.MOLSATrainingDtlsList;
import curam.molsa.training.entity.struct.MOLSATrainingKey;
import curam.molsa.training.entity.struct.MOLSATrainingKeyStruct1;
import curam.molsa.training.facade.struct.MOLSAAttachmentDetailsList;
import curam.molsa.training.facade.struct.MOLSATrainingAttachmentDetails;
import curam.molsa.training.struct.MOLSATrainingDetails;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.participant.impl.ConcernRole;
import curam.participant.impl.ConcernRoleDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.provider.impl.ProviderDAO;
import curam.serviceauthorization.impl.ServiceAuthorizationDAO;
import curam.servicedelivery.impl.ServiceDelivery;
import curam.servicedelivery.impl.ServiceDeliveryDAO;
import curam.serviceoffering.impl.SODELIVERYTYPEEntry;
import curam.serviceoffering.impl.ServiceDeliveryConfigurationAccessor;
import curam.serviceoffering.impl.ServiceOffering;
import curam.serviceoffering.impl.ServiceOfferingDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.GeneralConstants;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.DateRange;
import curam.util.type.DateTime;
import curam.util.type.Money;
import curam.util.type.NotFoundIndicator;
import curam.util.type.StringHelper;
import curam.util.type.StringList;

public class MOLSATrainingService extends
curam.molsa.training.facade.base.MOLSATrainingService {

	@Inject
	protected CaseHeaderDAO caseHeaderDAO;

	@Inject
	protected CaseParticipantRoleDAO caseParticipantRoleDAO;

	@Inject
	protected ServiceDeliveryDAO serviceDeliveryDAO;

	@Inject
	protected ServiceAuthorizationDAO serviceAuthorizationDAO;

	@Inject
	protected ServiceOfferingDAO serviceOfferingDAO;

	@Inject
	protected ConcernRoleDAO concernRoleDAO;
	@Inject
	protected FederalAllowableComponentDAO federalAllowableComponentDAO;
	@Inject
	protected ProviderDAO providerDAO;

	@Inject
	protected ProviderRosterLineItemDAO providerRosterLineItemDAO;

	@Inject
	private com.google.inject.Provider<CMSMetadataInterface> cmsMetadataProvider;

	public MOLSATrainingService() {
		GuiceWrapper.getInjector().injectMembers(this);

	}

	@Override
	public MOLSATrainingKey insertMOLSATraining(
			MOLSATrainingDtls trainingDetails) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		System.out.println("tabbed:"+trainingDetails.tableOfContents);
		System.out.println("Case:"+trainingDetails.trainingID);
		curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
		MOLSATrainingKey key =  new MOLSATrainingKey();
		trainingObj.insert(trainingDetails);
		key.trainingID=trainingDetails.trainingID;
		return key;
	}

	@Override
	public ProviderDtlsList readProviders() throws AppException,
	InformationalException {
		// TODO Auto-generated method stub
		ProviderDtlsList list= new ProviderDtlsList();
		Provider providerObj=ProviderFactory.newInstance();
		list=providerObj.readAll();
		return list;

	}



	@Override
	public InformationalMsgDtlsList createBeneficiaryService(
			MOLSATrainingDetails trainingDetails) throws AppException,
			InformationalException {


		InformationalManager informationalManager = TransactionInfo.setInformationalManager();
		InformationalMsgDtlsList informationalMsgDtlsList = new InformationalMsgDtlsList();
		ArrayList<AppException> exceptionList = new ArrayList<AppException>();

		// skip inserting the not started and in progress + SOID and display information message to case worker with skipped list "An active service already exists for the below  recepients for this training.



		//-------------------------Inserting into MOLSATrainingDetails-----------------------------------------------------------------------------------------------------
		
	

		long soID=trainingDetails.serviceOfferingID;
		ServiceOffering serviceOffering = (ServiceOffering)this.serviceOfferingDAO.get(Long.valueOf(soID));
		trainingDetails.serviceOfferingName=serviceOffering.getName();
		
		MOLSATrainingKey trainingKey= new MOLSATrainingKey();

		MOLSATrainingDtls trainingDtls= new MOLSATrainingDtls();

		trainingDtls.providerName=trainingDetails.providerName;
		trainingDtls.serviceOfferingID=trainingDetails.serviceOfferingID;
		trainingDtls.tableOfContents=trainingDetails.tableOfContents;
		trainingDtls.targetAudience=trainingDetails.targetAudience;
		trainingDtls.trainingEndDate=trainingDetails.trainingEndDate;
		trainingDtls.trainingGoal=trainingDetails.trainingGoal;
		trainingDtls.trainingStartDate=trainingDetails.trainingStartDate;
		trainingDtls.trainingSubject=trainingDetails.trainingSubject;
		trainingDtls.trainingTopic=trainingDetails.trainingTopic;
		trainingDtls.trainingType=trainingDetails.trainingType;
		trainingDtls.trainingLocation=trainingDetails.trainingLocation;
		trainingDtls.providerID=trainingDetails.providerID;
		trainingDtls.serviceName=trainingDetails.serviceOfferingName;

		//Get Provider Name from Provider ID
		curam.provider.impl.Provider providerObj=providerDAO.get(trainingDetails.providerID);
		trainingDtls.providerName=providerObj.getName();

		//Validation for Training Name and Provider Associations
		if(trainingDtls.serviceOfferingID!=0 && trainingDetails.providerID!=0 ){

			ProviderOffering providerOffering = ProviderOfferingFactory.newInstance();
			ProviderKey providerKey = new ProviderKey();
			providerKey.providerConcernRoleID=trainingDetails.providerID;
			ProviderOfferingSummaryDetailsList detailList= new ProviderOfferingSummaryDetailsList();
			detailList=providerOffering.listApprovedServiceOfferingsByProvider(providerKey);
			boolean check=false;
			for(ProviderOfferingSummaryDetails providerOfferingSummaryDetail : detailList.providerOfferingSummaryDetails ){
				if (providerOfferingSummaryDetail.serviceOfferingID==trainingDetails.serviceOfferingID){
					check= true;
					break;
				}
			}
			if(!check){

				throw new AppException(MOLSABPOTRAINING.ERR_TRAINING_PROVIDER_SERVICE_NOT_MATCHING);
			}

		}
		



		//Validation for Start Date with Current Date
		if(!(trainingDtls.trainingStartDate.equals(Date.getCurrentDate()))){
			if(!(trainingDtls.trainingStartDate.after(Date.getCurrentDate()))){
				throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_START_DATE);
			}
		}
		//Validation for Start Date with Registered Start Date
		if(trainingDtls.trainingStartDate.before(serviceOffering.getDateRange().start())){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_START_DATE_AND_REGISTERD_DATE);
		}
		//Validation for End Date with Current Date
		if(trainingDtls.trainingEndDate.before(Date.getCurrentDate())){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE);
		}
		//Validation for End Date with Registered End Date
		if(trainingDtls.trainingEndDate.after(serviceOffering.getDateRange().end())){
			if(!(serviceOffering.getDateRange().end().equals(Date.kZeroDate))){
				throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE_AND_REGISTERED_DATE);
			}
		}
		//Validation for End Date with entered Start Date
		if(trainingDtls.trainingEndDate.before(trainingDtls.trainingStartDate)){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE_AND_THE_ENTERED_START_DATE);
		}
		//Insert new training only if it doesn't exist

		String enteredTrainingDetails=(trainingDetails.serviceOfferingID+ Long.toString(trainingDetails.providerID)+trainingDetails.trainingStartDate+trainingDetails.trainingEndDate).trim();
		ServiceOfferingKey serviceOfferingKey = new ServiceOfferingKey();
		serviceOfferingKey.serviceOfferingID=trainingDetails.serviceOfferingID;
		MOLSATrainingDtlsList molsaTrainingDtlsList=searchByServiceOfferingID(serviceOfferingKey);
		boolean trainingExists=false;
		for(MOLSATrainingDtls molsaTrainingDtls : molsaTrainingDtlsList.dtls ){

			//Uniquely identifying existing training by SOID+ProviderID+trainingStratDate+TrainingEndDate

			String uniqueTrainingExisting=(molsaTrainingDtls.serviceOfferingID+ Long.toString(molsaTrainingDtls.providerID)+molsaTrainingDtls.trainingStartDate+molsaTrainingDtls.trainingEndDate).trim();
			if(enteredTrainingDetails.equals(uniqueTrainingExisting)){
				trainingExists=true;
				trainingKey.trainingID=molsaTrainingDtls.trainingID;
				break;
			}

		}
		if(!trainingExists){
			trainingKey=insertMOLSATraining(trainingDtls);	
		}



		//-------------------------Adding Service Details to each Integrated Case of Beneficiaries ---------------------------------------------

		StringList concernRoleIDStringArr = StringUtil.delimitedText2StringList(trainingDetails.concernRoleList, CuramConst.gkTabDelimiterChar);
		ArrayList<Long> concernRoleIDList = new ArrayList<Long>();
		for(String concernRoleID :concernRoleIDStringArr) {
			if(!(concernRoleIDList.contains(Long.valueOf(concernRoleID)))){
			concernRoleIDList.add(Long.valueOf(concernRoleID));
			}
		}
		ArrayList<Long> concernRoleIDList1 = new ArrayList<Long>();

		concernRoleIDList1.addAll(concernRoleIDList) ;



		for(long concernRoleIDListValue:concernRoleIDList){

			List<curam.piwrapper.casemanager.impl.CaseParticipantRole> recipients = new ArrayList();

			//Getting  the integrated case id from the concernroleid

			ArrayList<Long> integratedCaseIDList =getCaseIDFromConcernRole(concernRoleIDListValue);
			boolean checkForIntegratedCase= false;
			for(Long integratedCaseID : integratedCaseIDList){


				CaseHeader caseHeader = caseHeaderDAO.get(integratedCaseID);
				List<CaseParticipantRole> primaryList = 
					caseParticipantRoleDAO.listActiveByCaseAndType(caseHeader, CASEPARTICIPANTROLETYPEEntry.PRIMARY);
				List<CaseParticipantRole> memberList = 
					caseParticipantRoleDAO.listActiveByCaseAndType(caseHeader, CASEPARTICIPANTROLETYPEEntry.MEMBER);


				for(CaseParticipantRole caseParticipantRole :primaryList) {
					if(concernRoleIDList.contains(caseParticipantRole.getConcernRole().getID())
							&& caseParticipantRole.getConcernRole().getID() == concernRoleIDListValue ) {
						checkForIntegratedCase=true;
						recipients.add(caseParticipantRole);
					}
				}

				for(CaseParticipantRole caseParticipantRole :memberList) {
					if(concernRoleIDList.contains(caseParticipantRole.getConcernRole().getID())
							&& caseParticipantRole.getConcernRole().getID() == concernRoleIDListValue ) {
						checkForIntegratedCase=true;
						recipients.add(caseParticipantRole);
					}
				}

				//Getting the service offering id from the MOLSATrainingSMS Page


				ServiceDeliveryConfigurationAccessor serviceDeliveryConfiguration = serviceOffering.getServiceDeliveryConfiguration();
				ServiceDelivery serviceDelivery = this.serviceDeliveryDAO.newInstance(SODELIVERYTYPEEntry.SERVICEDELIVERY);

				Money money=new Money(CuramConst.gkZero);
				serviceDelivery.setAuthorizedRate(money);
				serviceDelivery.setDuration(CuramConst.gkZero,CuramConst.gkZero);
				serviceDelivery.setSensitivity(SENSITIVITYEntry.MINIMUM);
				serviceDelivery.setUnitsAuthorized(CuramConst.gkOne);
				serviceDelivery.setServiceOffering(serviceOffering);	
				serviceDelivery.setCoverPeriodStartDate(trainingDetails.trainingStartDate);
				serviceDelivery.setCoverPeriodEndDate(trainingDetails.trainingEndDate);
				serviceDelivery.setCaseHeader(caseHeader);
				String ownerUserName=TransactionInfo.getProgramUser();
				serviceDelivery.setOwner(ownerUserName);
				serviceDelivery.setReason(MOLSABPOTRAINING.SERVICE_DELIVERY_CREATION_REASON.getMessageText(TransactionInfo.getProgramLocale()));
				CaseUserRole caseUserRoleObj = CaseUserRoleFactory.newInstance();
				CaseHeaderKey relatedCaseKey = new CaseHeaderKey();
				//Same case id we got above
				relatedCaseKey.caseID = integratedCaseID;
				UserNameAndFullName supervisor = caseUserRoleObj.readSupervisor(relatedCaseKey);
				if (!StringHelper.isEmpty(supervisor.userName)) {
					serviceDelivery.setSupervisor(supervisor.userName);
				}

				try{

					serviceDelivery.insert(recipients);

				}catch(AppException appException){
					
					AppException app = new AppException(MOLSABPOTRAINING.ERR_SERVICE_DELIVERY_CREATION);
					concernRoleIDList1.remove(Long.valueOf(concernRoleIDListValue));
					AlternateIDRMDtls alternateIDRMDtls=MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(concernRoleIDListValue);
					app.arg(alternateIDRMDtls.alternateID);
					app.arg(appException.getMessage(TransactionInfo.getProgramLocale()));
					exceptionList.add(app);
					
					continue;
				}catch(InformationalException inf){	
					
					AppException app = new AppException(MOLSABPOTRAINING.ERR_SERVICE_DELIVERY_CREATION);
					concernRoleIDList1.remove(Long.valueOf(concernRoleIDListValue));
					AlternateIDRMDtls alternateIDRMDtls=MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(concernRoleIDListValue);
					app.arg(alternateIDRMDtls.alternateID);
					app.arg(inf.getLocalizedMessage());
					exceptionList.add(app);
					
					continue;
				}


				//-------------------------Adding Provider to The Beneficiary Service---------------------------------------------


				//Get the provider ID and pass it to the OOTB function

				ProviderKey proKey=new ProviderKey();
				proKey.providerConcernRoleID=trainingDetails.providerID;
				ServiceDeliveryVersionKey serviceKey=new ServiceDeliveryVersionKey();			
				serviceKey.key.serviceDeliveryID = serviceDelivery.getID();
				addProvider(proKey,serviceKey);

				//Inserting ServiceDelivery ID ,Training ID and concernRoleID to the new Mapping Table

				MOLSASerDelTraininingMappingDtls detailsObj= new MOLSASerDelTraininingMappingDtls();
				detailsObj.serviceDeliveryID=serviceDelivery.getID();
				detailsObj.trainingID=trainingKey.trainingID;		
				detailsObj.concernRoleID=concernRoleIDListValue;   
				MOLSASerDelTraininingMapping mappingObj=MOLSASerDelTraininingMappingFactory.newInstance();
				mappingObj.insert(detailsObj);
				
				

			}
			if(checkForIntegratedCase==false){
				AppException app = new AppException(MOLSABPOTRAINING.ERR_SERVICE_DELIVERY_CREATION_NO_INTEGRATED_CASE);
				concernRoleIDList1.remove(Long.valueOf(concernRoleIDListValue));
				AlternateIDRMDtls alternateIDRMDtls=MOLSAParticipantHelper.returnPreferredConcernRoleAlternateID(concernRoleIDListValue);
				app.arg(alternateIDRMDtls.alternateID);
				exceptionList.add(app);
			}
			checkForIntegratedCase=false;

		}
		//-------------------------Sending SMS To the Beneficiaries---------------------------------------------


		if(concernRoleIDList1.size()>0){
			MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails(); 
			MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();

			//Removing the Alternate ID's which are skipped before sending SMS
			String concernRoleListAfterSkipping="";
			for (long concernroleid :concernRoleIDList1){
				concernRoleListAfterSkipping=concernRoleListAfterSkipping+concernroleid+CuramConst.gkTabDelimiter;
			}
			key.dtls.concernRoleTabbedList=concernRoleListAfterSkipping;

			//key.dtls.smsMessageText=trainingDetails.trainingSMSMessage+"Training Name:"+trainingDetails.serviceOfferingID +" "+ "Start Date:"+trainingDetails.trainingStartDate
			//+" "+"End Date:"+trainingDetails.trainingEndDate+" "+"Training Location:"+trainingDetails.trainingLocation;

			key.dtls.smsMessageText=trainingDetails.trainingSMSMessage+MOLSABPOTRAINING.TRAINING_NAME+trainingDetails.serviceOfferingName +" "+ MOLSABPOTRAINING.TRAINING_START_DATE+trainingDetails.trainingStartDate
			+" "+MOLSABPOTRAINING.TRAINING_END_DATE+trainingDetails.trainingEndDate+" "+MOLSABPOTRAINING.TRAINING_LOCATION+trainingDetails.trainingLocation;
			key.dtls.smsMessageType=curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE.TRAININGMESSAGETEXT;

			//	key.dtls.caseID=instanceDtls.caseID;
			molsasmsUtilObj.sendSMSDPMode(key);
		}else if(!trainingExists){
			curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
			MOLSATrainingKey key =  new MOLSATrainingKey();
			key.trainingID=trainingKey.trainingID;
			trainingObj.remove(key);
		}

		//-------------------------Information message to the case worker--------------------------------------------



		informationalManager = TransactionInfo.setInformationalManager();
		for (AppException  appException : exceptionList) {
			informationalManager.addInformationalMsg(appException,
					GeneralConstants.kEmpty,
					InformationalElement.InformationalType.kWarning);
		}
		//
		String[] infos = informationalManager.obtainInformationalAsString();

		infos = informationalManager.obtainInformationalAsString();
		for (String message : infos) {

			final InformationalMsgDtls informationalMsgDtls = new InformationalMsgDtls();

			informationalMsgDtls.informationMsgTxt = message;

			informationalMsgDtlsList.dtls.addRef(
					informationalMsgDtls);
		}

		return informationalMsgDtlsList;
	}


	public void addProvider(final ProviderKey providerKey,
			final ServiceDeliveryVersionKey serviceDeliveryVersionNoKey)
	throws AppException, InformationalException {

		curam.servicedelivery.impl.ServiceDelivery serviceDelivery = serviceDeliveryDAO.get(
				serviceDeliveryVersionNoKey.key.serviceDeliveryID);

		serviceDelivery.updateProvider(
				providerDAO.get(providerKey.providerConcernRoleID),
				serviceDelivery.getVersionNo());
	}

	public ArrayList<Long> getCaseIDFromConcernRole(long concernRoleID) throws AppException, InformationalException{
		ArrayList<Long> icCaseIDs = new ArrayList<Long>();
		long caseid=0L;  
		System.out.println("concernRoleIDListValue:"+concernRoleID);

		curam.core.intf.CaseHeader caseObj=CaseHeaderFactory.newInstance();
		CaseStatusConcernRoleIDICType caseStatusConcernRoleIDICType = new CaseStatusConcernRoleIDICType();
		caseStatusConcernRoleIDICType.concernRoleID = concernRoleID;
		caseStatusConcernRoleIDICType.integratedCaseType = PRODUCTCATEGORY.SOCIAL_ASSITANCE;
		caseStatusConcernRoleIDICType.statusCode = CASESTATUS.OPEN;
		CaseIDList caseheaderDtlsList=caseObj.searchICByStatusParticipantIDICType(caseStatusConcernRoleIDICType);

		CaseHeaderReadmultiKey1 caseHeaderReadmultiKey1 = new CaseHeaderReadmultiKey1();

		CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List;
		InstructionLineItem instructionLineItemObj = InstructionLineItemFactory.newInstance();
		ILICaseID iliCaseID = new ILICaseID();
		ILITabDetailList iliTabDetailList;

		for(CaseID caseHeader : caseheaderDtlsList.dtls){
			caseHeaderReadmultiKey1.integratedCaseID = caseHeader.caseID;		  
			caseHeaderReadmultiDetails1List = caseObj.searchByIntegratedCaseID(caseHeaderReadmultiKey1);

			for(CaseHeaderReadmultiDetails1 caseHeaderReadmultidtls : caseHeaderReadmultiDetails1List.dtls){
				if(caseHeaderReadmultidtls.caseTypeCode.equals(CASETYPECODE.PRODUCTDELIVERY)){
					iliCaseID.caseID = caseHeaderReadmultidtls.caseID;
					iliTabDetailList = instructionLineItemObj.searchByCaseID(iliCaseID);
					if(isPartofIntegratedCase(concernRoleID, caseHeaderReadmultidtls.caseID) 
							&& !icCaseIDs.contains(caseHeader.caseID)
							&& iliTabDetailList.dtls.size() > 0){
						icCaseIDs.add(caseHeader.caseID);
					}
				}
			}



		}

		return icCaseIDs;

	}

	@Override
	public MOLSATrainingDtlsList searchByServiceOfferingID(
			ServiceOfferingKey soID) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub

		MOLSATrainingKey key =new MOLSATrainingKey() ;
		curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
		MOLSATrainingKeyStruct1 soidKey=new MOLSATrainingKeyStruct1();
		MOLSATrainingDtlsList dtlList= new MOLSATrainingDtlsList();
		soidKey.serviceOfferingID=soID.serviceOfferingID;
		dtlList=trainingObj.searchbyServiceOfferingID(soidKey);
		return dtlList;
	}

	@Override
	public MOLSATrainingDtls readByTrainingID(MOLSATrainingKey arg1) throws AppException, InformationalException {
		// TODO Auto-generated method stub
		MOLSATrainingDtls trainingDtls=new MOLSATrainingDtls();
		curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
		trainingObj.read(arg1);
		trainingDtls=trainingObj.read(arg1);
		return trainingDtls;
	}

	@Override
	public void modifyTrainingDetails(MOLSATrainingDtls trainingDetails) throws AppException, InformationalException {
		// TODO Auto-generated method stub
		curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
		MOLSATrainingKey readKey =new MOLSATrainingKey();
		readKey.trainingID=trainingDetails.trainingID;

		MOLSATrainingDtls readDetails=readByTrainingID(readKey);

		readDetails.providerName=trainingDetails.providerName;
		readDetails.serviceOfferingID=trainingDetails.serviceOfferingID;   
		readDetails.tableOfContents=trainingDetails.tableOfContents;
		readDetails.targetAudience=trainingDetails.targetAudience;
		readDetails.trainingGoal=trainingDetails.trainingGoal;
		readDetails.trainingSubject=trainingDetails.trainingSubject;
		readDetails.trainingTopic=trainingDetails.trainingTopic;
		readDetails.trainingType=trainingDetails.trainingType;

		trainingObj.modify(readKey, readDetails);
	}

	@Override
	public void rescheduleTrainingDetails(MOLSATrainingDetails trainingDetails) throws AppException, InformationalException {
		// TODO Auto-generated method stub

		//--------------------------Inserting into MOLSA Training----------
		InformationalManager informationalManager = TransactionInfo.setInformationalManager();
		InformationalMsgDtlsList informationalMsgDtlsList = new InformationalMsgDtlsList();
		ArrayList<AppException> exceptionList = new ArrayList<AppException>();
		curam.molsa.training.entity.intf.MOLSATraining trainingObj=MOLSATrainingFactory.newInstance();
		MOLSATrainingKey readKey =new MOLSATrainingKey();
		readKey.trainingID=trainingDetails.trainingID;

		MOLSATrainingDtls readDetails=readByTrainingID(readKey);
		long soID=readDetails.serviceOfferingID;
		ServiceOffering serviceOffering = (ServiceOffering)this.serviceOfferingDAO.get(Long.valueOf(soID));
		
		
		
		//Validation for Start Date with Current Date
		if(!(trainingDetails.trainingStartDate.equals(Date.getCurrentDate()))){
			if(!(trainingDetails.trainingStartDate.after(Date.getCurrentDate()))){
				throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_START_DATE);
			}
		}
		//Validation for Start Date with Registered Start Date
		if(trainingDetails.trainingStartDate.before(serviceOffering.getDateRange().start())){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_START_DATE_AND_REGISTERD_DATE);
		}
		//Validation for End Date with Current Date
		if(trainingDetails.trainingEndDate.before(Date.getCurrentDate())){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE);
		}
		//Validation for End Date with Registered End Date
		if(trainingDetails.trainingEndDate.after(serviceOffering.getDateRange().end())){
			if(!(serviceOffering.getDateRange().end().equals(Date.kZeroDate))){
				throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE_AND_REGISTERED_DATE);
			}
		}
		//Validation for End Date with entered Start Date
		if(trainingDetails.trainingEndDate.before(trainingDetails.trainingStartDate)){
			throw new AppException(MOLSABPOTRAINING.ERR_WRONG_TRAINING_END_DATE_AND_THE_ENTERED_START_DATE);
		}
		//No Change in the entered value
		
		String recheduledValue=trainingDetails.trainingStartDate.toString()+trainingDetails.trainingEndDate.toString()+trainingDetails.trainingLocation;
		String existingValue=readDetails.trainingStartDate.toString()+readDetails.trainingEndDate.toString()+readDetails.trainingLocation;
		if(recheduledValue.equals(existingValue)){
			throw new AppException(MOLSABPOTRAINING.TRAINING_RESCHECHEDULE_NO_CHANGE);
		}

		//Call reschedule and pass three attributes/all others are set to be same
		readDetails.trainingStartDate=trainingDetails.trainingStartDate;
		readDetails.trainingEndDate=trainingDetails.trainingEndDate;   
		readDetails.trainingLocation=trainingDetails.trainingLocation;

		trainingObj.modify(readKey, readDetails);


		//Changing the Training Start Date/End Date in each Service Delivery Row based on the training ID /Service Delivery ID retrieved from mapping table

		//Note:Give Validations before inserting for existing data -- >


		//Get the list of concern role id to send in a tabbed format from mapping table
		
		MOLSASerDelTraininingMapping mapObj=MOLSASerDelTraininingMappingFactory.newInstance();
		MOLSASerDelTraininingMappingKeyStruct1 mapKey= new MOLSASerDelTraininingMappingKeyStruct1();
		mapKey.trainingID=readKey.trainingID;
		MOLSASerDelTraininingMappingDtlsStruct1List dtlList= mapObj.readBytrainingID(mapKey);
		String concernRoleTabbedValue="";
		for(MOLSASerDelTraininingMappingDtlsStruct1 dtls: dtlList.dtls.items()) {
			long concernRole=dtls.concernRoleID;
			long serviceDeliveryID=dtls.serviceDeliveryID;
			concernRoleTabbedValue=concernRoleTabbedValue+concernRole+CuramConst.gkTabDelimiter;
			
			ServiceDelivery serviceDelivery=serviceDeliveryDAO.get(serviceDeliveryID);

			String status=serviceDelivery.getLifecycleState().toString();
			
			//Only Open and Not Started are allowed to modify 
			
			if(status.equals(curam.codetable.SERVICEDELIVERYSTATUS.OPEN)||status.equals(curam.codetable.SERVICEDELIVERYSTATUS.NOTSTARTED)){
				serviceDelivery.setCoverPeriodStartDate(trainingDetails.trainingStartDate);
				serviceDelivery.setCoverPeriodEndDate(trainingDetails.trainingEndDate);				
				serviceDelivery.modify(serviceDelivery.getVersionNo());					
			}
		}   


		//Send SMS to the concerned people with open and Not Started 


		MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails(); 
		MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
		key.dtls.concernRoleTabbedList=concernRoleTabbedValue;
		key.dtls.smsMessageText=trainingDetails.trainingSMSMessage+MOLSABPOTRAINING.TRAINING_NAME+trainingDetails.serviceOfferingID +" "+ MOLSABPOTRAINING.TRAINING_START_DATE+readDetails.trainingStartDate
		+" "+MOLSABPOTRAINING.TRAINING_END_DATE+readDetails.trainingEndDate+" "+MOLSABPOTRAINING.TRAINING_LOCATION+trainingDetails.trainingLocation;
		key.dtls.smsMessageType=curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE.TRAININGMESSAGETEXT;
		//  key.dtls.caseID=instanceDtls.caseID;
		molsasmsUtilObj.sendSMSDPMode(key);
	}

	@Override
	public void reminderSMS(MOLSATrainingKey trainingID) throws AppException, InformationalException {
		// TODO Auto-generated method stub

		//Get all the Training Details based on trainingID

		MOLSATrainingKey readKey =new MOLSATrainingKey();
		readKey.trainingID=trainingID.trainingID;
		MOLSATrainingDtls readDetails=readByTrainingID(readKey);

		//Get all the concernroleIDs and serviceDeliveryID based on the trainingID from mapping table

		MOLSASerDelTraininingMapping mapObj=MOLSASerDelTraininingMappingFactory.newInstance();
		MOLSASerDelTraininingMappingKeyStruct1 mapKey= new MOLSASerDelTraininingMappingKeyStruct1();
		mapKey.trainingID=trainingID.trainingID;
		MOLSASerDelTraininingMappingDtlsStruct1List dtlList= mapObj.readBytrainingID(mapKey);
		Map<Long, Long> mapDetails = new HashMap<Long, Long>(); 
		String concernRoletabbedList="";
		for(MOLSASerDelTraininingMappingDtlsStruct1 dtls: dtlList.dtls.items()) {
			long concernRole=dtls.concernRoleID;
			long serviceDeliveryID=dtls.serviceDeliveryID;

			//Add concernRoleID from the map whose ServiceDelivery status is  "NOT STARTED"(Reminder has to be send to the Acknowledged concern RoleId only)

			ServiceDelivery serviceDelivery=serviceDeliveryDAO.get(serviceDeliveryID);
			String status=serviceDelivery.getLifecycleState().toString();
			if(status.equals(curam.codetable.SERVICEDELIVERYSTATUS.NOTSTARTED)){
				mapDetails.put(concernRole,serviceDeliveryID);
				concernRoletabbedList=concernRoletabbedList+concernRole+CuramConst.gkTabDelimiter;
			}
		//	System.out.println("The ReminderSMS is send to "+mapDetails.size()+" Beneficiaries");

			//Send SMS to the concerned people with  Not Started status
			
			MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails(); 
			MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
			key.dtls.concernRoleTabbedList=concernRoletabbedList;
			key.dtls.smsMessageText=MOLSABPOTRAINING.TRAINING_NAME+readDetails.serviceName +" "+ MOLSABPOTRAINING.TRAINING_START_DATE+readDetails.trainingStartDate
			+" "+MOLSABPOTRAINING.TRAINING_END_DATE+readDetails.trainingEndDate+" "+MOLSABPOTRAINING.TRAINING_LOCATION+readDetails.trainingLocation;
			key.dtls.smsMessageType=curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE.TRAININGMESSAGETEXT;
			//  key.dtls.caseID=instanceDtls.caseID;
			molsasmsUtilObj.sendSMSDPMode(key);

		}


	}

	@Override
	public MOLSATrainingAtttachmentLinkDtls createTrainingAttachment(MOLSATrainingAttachmentDetails materialDetails) throws AppException, InformationalException {

		curam.core.sl.intf.Attachment attachmentObj = AttachmentFactory.newInstance();
		AttachmentKey attachmentKey = new AttachmentKey();
		AttachmentNameStruct attachmentName = new AttachmentNameStruct();
		MOLSATrainingAtttachmentLink  molsaTrainingAttachmentLinkObj= MOLSATrainingAtttachmentLinkFactory.newInstance();
		attachmentName.attachmentName = materialDetails.attDtls.attachmentName;
		materialDetails.attDtls.attachmentName = attachmentName.attachmentName;
		Date dateReceived = new Date(DateTime.getCurrentDateTime());
		GuiceWrapper.getInjector().injectMembers(this); 
		attachmentKey = attachmentObj.createAttachment(materialDetails.attDtls);
		materialDetails.linkDtls.attachmentID = attachmentKey.attachmentID;
		materialDetails.linkDtls.statusCode = RECORDSTATUS.NORMAL;
		materialDetails.linkDtls.dateReceived = dateReceived;
		materialDetails.linkDtls.attachmentLinkID = UniqueIDFactory.newInstance().getNextID();
		molsaTrainingAttachmentLinkObj.insert(materialDetails.linkDtls);
		return materialDetails.linkDtls;
	}

	@Override
	public MOLSAAttachmentDetailsList serachAttachmentByTrainingID(MOLSATrainingKey arg1) throws AppException, InformationalException {


		// TODO Auto-generated method stub

		//Based on the trainingID , attachmentlinktable details are retrieving  and based on the retrieved attachementid all the attachments are retrieved
		curam.core.sl.intf.Attachment attachmentObj = AttachmentFactory.newInstance();
		MOLSATrainingAtttachmentLink trainingAttachmentLinkObj=MOLSATrainingAtttachmentLinkFactory.newInstance();
		MOLSAAttachmentDetailsList attDetailsList= new MOLSAAttachmentDetailsList();
		MOLSASerDelTraininingMappingKeyStruct1 key=new MOLSASerDelTraininingMappingKeyStruct1();
		key.trainingID=arg1.trainingID;
		MOLSATrainingAtttachmentLinkDtlsStruct1List linkDtlsList = trainingAttachmentLinkObj.searchByTrainingID(key);
		//Iterate through each link from the list of linkitems

		for(MOLSATrainingAtttachmentLinkDtlsStruct1 dtls: linkDtlsList.dtls.items()) {

			MOLSATrainingAttachmentDetails attchDetails= new MOLSATrainingAttachmentDetails();

			//Assigning the retrieved attachment details into the MOLSATrainingAttachmentDetails struct

			attchDetails.linkDtls.assign(dtls);

			//Get the attachmentids from this linkDtls which we got by trainingIDs

			AttachmentKey attachmentKey = new AttachmentKey();
			AttachmentDtls attachdtls=new AttachmentDtls();
			attachmentKey.attachmentID=dtls.attachmentID;

			//Retrieving attachmentDtls from Attachment table based on the attachment id retrieved above

			attachdtls=attachmentObj.readAttachment(attachmentKey);

			//Assigning the retrieved attachment details into the MOLSATrainingAttachmentDetails struct
			attchDetails.attDtls =(attachdtls);

			//Adding the MOLSATrainingAttachmentDetails struct to the List
			attDetailsList.dtls.add(attchDetails);

		}
		return attDetailsList;
	}

	@Override
	public void cancelTrainingAttachment(MOLSATrainingAtttachmentLinkKey key) throws AppException, InformationalException {
		// TODO Auto-generated method stub


		MOLSATrainingAtttachmentLink trainingAttachmentLink= MOLSATrainingAtttachmentLinkFactory.newInstance();
		MOLSATrainingAtttachmentLinkDtls linkDtls = trainingAttachmentLink.read(key);

		linkDtls.statusCode = RECORDSTATUS.CANCELLED;
		trainingAttachmentLink.modify(key, linkDtls);

		// Read and modify the status of the Attachment
		curam.core.sl.intf.Attachment attachmentObj = AttachmentFactory.newInstance();
		AttachmentKey attachmentKey = new AttachmentKey();

		attachmentKey.attachmentID = linkDtls.attachmentID;

		attachmentObj.cancelAttachment(attachmentKey);
	}


	public Boolean isPartofIntegratedCase(final long concernRoleID, final long caseID) throws AppException, InformationalException{
		Boolean isPartOfPd = false;
		CaseGroupsReadmultiKey key = new CaseGroupsReadmultiKey();
		key.caseID = caseID;
		CaseGroupsDtlsList  dtlsList =  CaseGroupsFactory.newInstance().searchByCase(key);

		for(CaseGroupsDtls caseGroup : dtlsList.dtls){
			DateRange dateRange = new DateRange(caseGroup.startDate,caseGroup.endDate );
			if(caseGroup.concernRoleID == concernRoleID && dateRange.contains(Date.getCurrentDate())){
				isPartOfPd = true;
				break;
			}

		}
		return isPartOfPd;
	}

	@Override
	public AttachmentDtls readTrainingAttachment(AttachmentKey key)
	throws AppException, InformationalException {
		// TODO Auto-generated method stub
		curam.core.sl.intf.Attachment attachmentObj = AttachmentFactory.newInstance();
		AttachmentKey attachmentKey = new AttachmentKey();
		AttachmentDtls attachdtls=new AttachmentDtls();
		attachmentKey.attachmentID=key.attachmentID;
		//Retrieving attachmentDtls from Attachment table based on the attachment id retrieved above
		attachdtls=attachmentObj.readAttachment(attachmentKey);
		return attachdtls;
	}

	@Override
	public void insertCertificateIssuedStatus(
			MOLSATrainingCertificateDtls certificatedtls) throws AppException,
			InformationalException {

		//Check whether the Certificate already exist for the ProviderRoster line item .If exists update else insert

		//Get Service Authorization ID using ProviderRosterLineItemID ID
		MOLSATrainingCertificate certObj= MOLSATrainingCertificateFactory.newInstance();
		ProviderRosterLineItem providerRosterLineItem=providerRosterLineItemDAO.get(certificatedtls.serviceAuthorizationID);		
		certificatedtls.serviceAuthorizationID=providerRosterLineItem.getServiceAuthorization().getID();
		//Reading using above serviceAuthorizationID from Certificate table to check whether this value already exists
		MOLSATrainingCertificateKeyStruct1 keySAuthorize = new MOLSATrainingCertificateKeyStruct1();
		keySAuthorize.serviceAuthorizationID=certificatedtls.serviceAuthorizationID;
		MOLSATrainingCertificateDtlsStruct1 certdtls = new MOLSATrainingCertificateDtlsStruct1();	
		final NotFoundIndicator notFoundInd = new curam.util.type.NotFoundIndicator();
		certdtls=certObj.readByAuthorzID(notFoundInd, keySAuthorize);
		if(!(notFoundInd.isNotFound())){

			MOLSATrainingCertificateKey certKey = new MOLSATrainingCertificateKey();
			MOLSATrainingCertificateDtls dtls= new MOLSATrainingCertificateDtls();
			certKey.certificationID=certdtls.certificationID;
			dtls=certObj.read(certKey);
			dtls.certificateIssuedStatus=certificatedtls.certificateIssuedStatus;
			certObj.modify(certKey,dtls);	

		}else{

			//Get TrainingID from ServiceDelivery Table based on Service Authorization ID


			curam.servicedelivery.impl.ServiceDelivery serviceDelivery=serviceDeliveryDAO.readByServiceAuthorization(serviceAuthorizationDAO.get(certificatedtls.serviceAuthorizationID));
			ServiceDeliveryKey sdkey = new ServiceDeliveryKey();	
			MOLSASerDelTraininingMapping serDelMap=MOLSASerDelTraininingMappingFactory.newInstance();
			MOLSASerDelTraininingMappingKeyStruct2 key= new MOLSASerDelTraininingMappingKeyStruct2();
			key.serviceDeliveryID=serviceDelivery.getID();
			MOLSASerDelTraininingMappingDtlsStruct2 sermapDtls=new MOLSASerDelTraininingMappingDtlsStruct2();		
			sermapDtls=serDelMap.readByServiceDeliveryID(key);

			//GetServiceOfferingID

			ServiceOffering serviceOffering= serviceDelivery.getServiceOffering();

			certificatedtls.trainingID=sermapDtls.trainingID;
			certificatedtls.concernRoleID=sermapDtls.concernRoleID;
			certificatedtls.serviceOfferingID=serviceOffering.getID();

			// TODO Auto-generated method stub


			//read whether data exists before inserting based on key
			//	readDetails=certObj.read(key);		
			certObj.insert(certificatedtls);	
		}
	}

	@Override
	public MOLSATrainingDtls readCertificateIssuedStatus(
			MOLSATrainingCertificateKey key) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub

		MOLSATrainingCertificateDtls molsatrainingDtls = new MOLSATrainingCertificateDtls();
		molsatrainingDtls = MOLSATrainingCertificateFactory.newInstance().read(key);
		return null;
	}

	@Override
	public void insertProviderFacilities(MOLSAProviderFacilityDtls facilityDtls)
	throws AppException, InformationalException {
		// TODO Auto-generated method stub
		MOLSAProviderFacility providerObj=MOLSAProviderFacilityFactory.newInstance();
		providerObj.insert(facilityDtls);

	}

	@Override
	public MOLSAProviderFacilityDtls readProviderFacility(
			MOLSAProviderFacilityKey key) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		MOLSAProviderFacility providerObj=MOLSAProviderFacilityFactory.newInstance();
		MOLSAProviderFacilityDtls molsaproviderFacilityDtls= new MOLSAProviderFacilityDtls();
		molsaproviderFacilityDtls=providerObj.read(key);
		return molsaproviderFacilityDtls;
	}

	@Override
	public void modifyProviderFacility(MOLSAProviderFacilityDtls facilityDtls)
	throws AppException, InformationalException {
		// TODO Auto-generated method stub
		MOLSAProviderFacilityKey key= new MOLSAProviderFacilityKey();
		key.facilityID=facilityDtls.facilityID;
		MOLSAProviderFacility providerObj=MOLSAProviderFacilityFactory.newInstance();
		providerObj.modify(key, facilityDtls);

	}

	@Override
	public MOLSAProviderFacilityDtlsStruct1List readProviderFacilityByLocation(
			ProviderLocationKey locationID) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		MOLSAProviderFacility providerObj=MOLSAProviderFacilityFactory.newInstance();
		MOLSAProviderFacilityKeyStruct1 key = new MOLSAProviderFacilityKeyStruct1();
		key.providerserviceCenterID=locationID.providerLocationID;
		MOLSAProviderFacilityDtlsStruct1List listFacilities=providerObj.readByLocationID(key);
		return listFacilities;
	}

	@Override
	public MOLSAParticipantDetailsList listParticipantByCriteria(
			MOLSAParticipantFilterCriteriaDetails key) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		if (key.actionIDProperty.equals("TRAINING_SUBMIT")){
			if(key.concernRoleTabbedList.length()==0){
				throw new AppException(MOLSABPOTRAINING.ERR_EMPTY_CONCERNROLE);
			}
		}
		MOLSAParticipantDetailsList molsaParticipantDetailsList = new MOLSAParticipantDetailsList();
		if(key.qidList.length()!=0){

			StringList concernRoleIDStringArr = StringUtil.delimitedText2StringListWithTrim(key.qidList, CuramConst.gkCommaDelimiterChar);
			//System.out.println(concernRoleIDStringArr);
			MOLSAParticipantDetails details= new MOLSAParticipantDetails();

			HashSet set= new HashSet();
			for(String alternateID : concernRoleIDStringArr.items()){
				if(!(alternateID.equals(""))&& alternateID!=null){

					MOLSAPersonSearchRouterDA personSearchRouterObj = MOLSAPersonSearchRouterDAFactory.newInstance();
					//PersonSearchDetailsResult personSearchResult = new PersonSearchDetailsResult();
					PersonSearchKey1 personSearchKey1= new PersonSearchKey1();
					personSearchKey1.personSearchKey.referenceNumber=alternateID;
					//personSearchResult.personSearchResult = personSearchRouterObj.search1(personSearchKey1.personSearchKey);
					DatabasePersonSearch personSearchObj = curam.core.fact.DatabasePersonSearchFactory.newInstance();
					PersonSearchResult1 personSearchResult = personSearchObj.search1(personSearchKey1.personSearchKey);

					if(personSearchResult.dtlsList.size()>0) {
						details= new MOLSAParticipantDetails();
						PersonSearchDetails personDetails = personSearchResult.dtlsList.item(0);					
						details.concernroleID=personDetails.concernRoleID;
						details.dateOfBirth=personDetails.dateOfBirth;
						details.addressString=personDetails.formattedAddress;
						details.participantName=personDetails.concernRoleName + "-"+ alternateID;
						if(!(set.contains(details.concernroleID))){
							set.add(details.concernroleID);	
							molsaParticipantDetailsList.dtls.add(details);
						}
					}

				}
			}

		}	

		else	

		{

			MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
			curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails filterCriteriaDetails = new curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails();
			filterCriteriaDetails.dtls = key;
			curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList detailsList = molsasmsUtilObj
			.listParticipantByCriteria(filterCriteriaDetails);
			molsaParticipantDetailsList.dtls.addAll(detailsList.dtls.dtls);
		}

		return molsaParticipantDetailsList;
	}

}
