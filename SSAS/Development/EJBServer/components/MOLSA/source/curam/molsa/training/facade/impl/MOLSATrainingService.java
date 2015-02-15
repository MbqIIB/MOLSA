package curam.molsa.training.facade.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.google.inject.Inject;
import curam.codetable.impl.CASEPARTICIPANTROLETYPEEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.fact.CaseHeaderFactory;
import curam.core.impl.CuramConst;
import curam.core.sl.fact.CaseUserRoleFactory;
import curam.core.sl.intf.CaseUserRole;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.UserNameAndFullName;
import curam.core.struct.CaseHeaderByConcernRoleIDKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.cpm.facade.struct.ServiceDeliveryVersionKey;
import curam.cpm.sl.entity.fact.ProviderFactory;
import curam.cpm.sl.entity.intf.Provider;
import curam.cpm.sl.entity.struct.ProviderDtls;
import curam.cpm.sl.entity.struct.ProviderDtlsList;
import curam.cpm.sl.entity.struct.ProviderKey;
import curam.cpm.sl.entity.struct.ServiceOfferingKey;
import curam.federalallowablecomponent.impl.FederalAllowableComponent;
import curam.federalallowablecomponent.impl.FederalAllowableComponentDAO;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceDtls;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceKey;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.training.entity.base.MOLSATraining;
import curam.molsa.training.entity.fact.MOLSASerDelTraininingMappingFactory;
import curam.molsa.training.entity.fact.MOLSATrainingFactory;
import curam.molsa.training.entity.intf.MOLSASerDelTraininingMapping;
import curam.molsa.training.entity.struct.MOLSASerDelTraininingMappingDtls;
import curam.molsa.training.entity.struct.MOLSATrainingDtls;
import curam.molsa.training.entity.struct.MOLSATrainingDtlsList;
import curam.molsa.training.entity.struct.MOLSATrainingKey;
import curam.molsa.training.entity.struct.MOLSATrainingKeyStruct1;
import curam.molsa.training.struct.MOLSATrainingDetails;
import curam.participant.impl.ConcernRole;
import curam.participant.impl.ConcernRoleDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.provider.impl.ProviderDAO;
import curam.servicedelivery.impl.ServiceDelivery;
import curam.servicedelivery.impl.ServiceDeliveryDAO;
import curam.serviceoffering.impl.SODELIVERYTYPEEntry;
import curam.serviceoffering.impl.ServiceDeliveryConfigurationAccessor;
import curam.serviceoffering.impl.ServiceOffering;
import curam.serviceoffering.impl.ServiceOfferingDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.Money;
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
	protected ServiceOfferingDAO serviceOfferingDAO;

	@Inject
	protected ConcernRoleDAO concernRoleDAO;
	@Inject
	protected FederalAllowableComponentDAO federalAllowableComponentDAO;
	@Inject
	protected ProviderDAO providerDAO;


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
	public void createBeneficiaryService(
			MOLSATrainingDetails trainingDetails) throws AppException,
			InformationalException {

		//-------------------------Inserting into MOLSATrainingDetails-----------------------------------------------------------------------------------------------------

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
		trainingKey=insertMOLSATraining(trainingDtls);


		//-------------------------Adding Service Details to each Integrated Case of Beneficiaries ---------------------------------------------

		StringList concernRoleIDStringArr = StringUtil.delimitedText2StringList(trainingDetails.concernRoleList, CuramConst.gkTabDelimiterChar);
		ArrayList<Long> concernRoleIDList = new ArrayList<Long>();
		for(String concernRoleID :concernRoleIDStringArr) {
			concernRoleIDList.add(Long.valueOf(concernRoleID));
		}
		System.out.println("Tabbed ConcernRoleIds:"+trainingDetails.concernRoleList);

		for(long concernRoleIDListValue:concernRoleIDList){

			List<curam.piwrapper.casemanager.impl.CaseParticipantRole> recipients = new ArrayList();

			//Getting  the integrated case id from the concernroleid

			long integratedCaseID=getCaseIDFromConcernRole(concernRoleIDListValue);
			CaseHeader caseHeader = caseHeaderDAO.get(integratedCaseID);
			List<CaseParticipantRole> primaryList = 
				caseParticipantRoleDAO.listActiveByCaseAndType(caseHeader, CASEPARTICIPANTROLETYPEEntry.PRIMARY);
			List<CaseParticipantRole> memberList = 
				caseParticipantRoleDAO.listActiveByCaseAndType(caseHeader, CASEPARTICIPANTROLETYPEEntry.MEMBER);
			for(CaseParticipantRole caseParticipantRole :primaryList) {
				if(concernRoleIDList.contains(caseParticipantRole.getID())) {
					recipients.add(caseParticipantRole);
				}
			}
			for(CaseParticipantRole caseParticipantRole :memberList) {
				if(concernRoleIDList.contains(caseParticipantRole.getID())) {
					recipients.add(caseParticipantRole);
				}
			}

			//Getting the service offering id from the MOLSATrainingSMS Page

			long soID=trainingDetails.serviceOfferingID;
			ServiceOffering serviceOffering = (ServiceOffering)this.serviceOfferingDAO.get(Long.valueOf(soID));
			ServiceDeliveryConfigurationAccessor serviceDeliveryConfiguration = serviceOffering.getServiceDeliveryConfiguration();
			ServiceDelivery serviceDelivery = this.serviceDeliveryDAO.newInstance(SODELIVERYTYPEEntry.SERVICEDELIVERY);
			Money money=new Money(0);
			serviceDelivery.setAuthorizedRate(money);
			serviceDelivery.setDuration(0,0);
			SENSITIVITYEntry sensitivity = SENSITIVITYEntry.get("1");
			serviceDelivery.setSensitivity(sensitivity);
			serviceDelivery.setUnitsAuthorized(1);
			serviceDelivery.setServiceOffering(serviceOffering);	
			serviceDelivery.setCoverPeriodStartDate(trainingDetails.trainingStartDate);
			serviceDelivery.setCoverPeriodEndDate(trainingDetails.trainingEndDate);
			serviceDelivery.setCaseHeader(caseHeader);
			String ownerUserName=TransactionInfo.getProgramUser();
			System.out.println("ownerUserName:"+ownerUserName);
			serviceDelivery.setOwner(ownerUserName);
			serviceDelivery.setReason("Training For The Benefit Of Beneficiary");
			CaseUserRole caseUserRoleObj = CaseUserRoleFactory.newInstance();
			CaseHeaderKey relatedCaseKey = new CaseHeaderKey();
			//Same case id we got above
			relatedCaseKey.caseID = integratedCaseID;
			System.out.println("relatedCaseKey.caseID :"+relatedCaseKey.caseID );
			UserNameAndFullName supervisor = caseUserRoleObj.readSupervisor(relatedCaseKey);
			if (!StringHelper.isEmpty(supervisor.userName)) {
				serviceDelivery.setSupervisor(supervisor.userName);
			}
			serviceDelivery.insert(recipients);

			//-------------------------Adding Provider to The Beneficiary Service---------------------------------------------


			//Get the provider ID and pass it to the OOTB function

			ProviderKey proKey=new ProviderKey();
			proKey.providerConcernRoleID=trainingDetails.providerID;
			ServiceDeliveryVersionKey serviceKey=new ServiceDeliveryVersionKey();			
			serviceKey.key.serviceDeliveryID = serviceDelivery.getID();
			addProvider(proKey,serviceKey);

			//Inserting ServiceDelivery ID ,Training ID to the new Mapping Table

			MOLSASerDelTraininingMappingDtls detailsObj= new MOLSASerDelTraininingMappingDtls();
			detailsObj.serviceDeliveryID=serviceDelivery.getID();
			detailsObj.trainingID=trainingKey.trainingID;		
			MOLSASerDelTraininingMapping mappingObj=MOLSASerDelTraininingMappingFactory.newInstance();
			mappingObj.insert(detailsObj);


		}
		//-------------------------Sending SMS To the Beneficiaries---------------------------------------------


		MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails(); 
		MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
		key.dtls.concernRoleTabbedList=trainingDetails.concernRoleList;
		key.dtls.smsMessageText=trainingDetails.trainingSMSMessage+"Training Name:"+trainingDetails.serviceOfferingID +" "+ "Start Date:"+trainingDetails.trainingStartDate
		+" "+"End Date:"+trainingDetails.trainingEndDate+" "+"Training Location:"+trainingDetails.trainingLocation;
		key.dtls.smsMessageType=curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE.TRAININGMESSAGETEXT;
		//	key.dtls.caseID=instanceDtls.caseID;
		//molsasmsUtilObj.sendSMSDPMode(key);



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

	public long getCaseIDFromConcernRole(long concernRoleIDListValue) throws AppException, InformationalException{

		long caseid=0L;
		System.out.println("concernRoleIDListValue:"+concernRoleIDListValue);
		CaseHeaderByConcernRoleIDKey key=new CaseHeaderByConcernRoleIDKey();
		key.concernRoleID=concernRoleIDListValue;
		key.statusCode="CS4";
		curam.core.intf.CaseHeader caseObj=CaseHeaderFactory.newInstance();
		curam.core.struct.CaseHeaderDtlsList caseheaderDtlsList=caseObj.searchByConcernRoleID(key);
		Iterator itr=caseheaderDtlsList.dtls.listIterator();
		int i=0;

		while (itr.hasNext()){
			System.out.println("CaseType:"+caseheaderDtlsList.dtls.get(i).caseTypeCode);
			if(caseheaderDtlsList.dtls.get(i).caseTypeCode.equals("CT5")){
				caseid=caseheaderDtlsList.dtls.get(i).caseID;
				System.out.println("CaseID:"+caseid);
				break;
			}else{
				i++;
			}
		}
		return caseid;

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



}
