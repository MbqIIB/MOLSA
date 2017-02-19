package curam.molsa.creoleprogramrecommendation.facade.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.google.inject.Inject;

import curam.application.entity.struct.ApplicationKey;
import curam.codetable.CASESTATUS;
import curam.codetable.DESTINATIONTYPECODE;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.RECORDSTATUS;
import curam.codetable.TARGETITEMTYPE;
import curam.codetable.TASKPRIORITY;
import curam.core.base.Users;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.intf.ProductDelivery;
import curam.core.facade.struct.TaskCreateDetails;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.UsersFactory;
import curam.core.sl.entity.fact.CaseNomineeDestinationFactory;
import curam.core.sl.entity.intf.CaseNomineeDestination;
import curam.core.sl.entity.struct.CaseNomineeCaseIDKey;
import curam.core.sl.entity.struct.CaseNomineeDestinationDtls;
import curam.core.sl.entity.struct.CaseNomineeDestinationDtlsList;
import curam.core.sl.entity.struct.CaseNomineeForCaseDetails;
import curam.core.sl.entity.struct.CaseNomineeForCaseDetailsList;
import curam.core.sl.entity.struct.CaseNomineeKey;
import curam.core.sl.intf.CaseNominee;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDtls;
import curam.core.struct.ProductKey;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.creoleprogramrecommendation.codetable.impl.SIMULATEDDETERMINATIONSTATEEntry;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.message.CREOLEPROGRAMRECOMMENDATIONFACADE;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationKey;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationDAO;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationManager;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetails;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetailsList;
import curam.molsa.message.MOLSABPOPRODUCTDELIVERY;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * Facade class used to perform the operations related to eligible programs.
 */

public class MOLSACREOLEProgramRecommendation
extends curam.molsa.creoleprogramrecommendation.facade.base.MOLSACREOLEProgramRecommendation {
	@Inject
	private SimulatedDeterminationManager simulatedDeterminationManager;
	@Inject
	private CREOLEProgramRecommendationDAO creoleProgramRecommendationDAO;


	/**
	 * This method sets the details of eligible programs listed on IC home page
	 * under check eligibility tab
	 * 
	 * @param CREOLEProgramRecommendationKey
	 *            Contains Program Recommendation identifier
	 * 
	 * @return MolsaSimulatedDeterminationDetailsList Contains eligible program
	 *         details
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public MolsaSimulatedDeterminationDetailsList listEligibleSimulatedDeterminations(
			CREOLEProgramRecommendationKey key) throws AppException,
			InformationalException {

		CREOLEProgramRecommendation CreoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
		.newInstance();
		SimulatedDeterminationDetailsList SimulatedDeterminationDtlsList = new SimulatedDeterminationDetailsList();
		MolsaSimulatedDeterminationDetailsList molsaSimulatedDeterminationDtlsList = new MolsaSimulatedDeterminationDetailsList();

		SimulatedDeterminationDtlsList = CreoleProgramRecommendationObj
		.listEligibleSimulatedDeterminations(key);

		curam.core.intf.Users usersObj=UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();
		usersKey.userName= TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		for (SimulatedDeterminationDetails dtls : SimulatedDeterminationDtlsList.list) {
			MolsaSimulatedDeterminationDetails molsaSimulatedDeterminationDtls = new MolsaSimulatedDeterminationDetails();
			molsaSimulatedDeterminationDtls.dtls.assign(dtls);
			String date = molsaSimulatedDeterminationDtls.dtls.period
			.substring(134, 144);
			//DateFormat finald= new SimpleDateFormat("yyyy-MM-dd");
			String dates[] = date.split("-");
			String one = dates[1];
			String two = dates[2];
			String finalDate = dates[0].concat(one);
			finalDate = finalDate.concat(two);
			Date fromDate = Date.getDate(finalDate);
			if ((fromDate.after(Date.getCurrentDate()))
					|| (molsaSimulatedDeterminationDtls.dtls.isAuthorized)) {
				molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			//Disable the Case Authorize button for Case Workers MOLSA-2017-CR4.3
			if(usersDtls.roleName.equals(MOLSAConstants.kMolsaCaseWorkerRole)){
				molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			molsaSimulatedDeterminationDtlsList.dtls
			.addRef(molsaSimulatedDeterminationDtls);

		}
		return molsaSimulatedDeterminationDtlsList;
	}
	public MOLSACREOLEProgramRecommendation()
	{

		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * This method sets the details of eligible programs listed on Application
	 * home page under review eligibility page
	 * 
	 * @param ApplicationKey
	 *            Contains Program Recommendation identifier
	 * 
	 * @return MolsaSimulatedDeterminationDetailsList Contains eligible program
	 *         details
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public MolsaSimulatedDeterminationDetailsList listLatestAppliedForEligibleSimulatedDeterminations(
			ApplicationKey key) throws AppException, InformationalException {
		CREOLEProgramRecommendation CreoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
		.newInstance();
		SimulatedDeterminationDetailsList SimulatedDeterminationDtlsList = new SimulatedDeterminationDetailsList();
		MolsaSimulatedDeterminationDetailsList molsaSimulatedDeterminationDtlsList = new MolsaSimulatedDeterminationDetailsList();

		SimulatedDeterminationDtlsList = CreoleProgramRecommendationObj
		.listLatestAppliedForEligibleSimulatedDeterminations(key);
		for (SimulatedDeterminationDetails dtls : SimulatedDeterminationDtlsList.list) {
			MolsaSimulatedDeterminationDetails molsaSimulatedDeterminationDtls = new MolsaSimulatedDeterminationDetails();
			molsaSimulatedDeterminationDtls.dtls.assign(dtls);
			String date = molsaSimulatedDeterminationDtls.dtls.period
			.substring(134, 144);
			String dates[] = date.split("-");
			String one = dates[1];
			String two = dates[2];
			String finalDate = dates[0].concat(one);
			finalDate = finalDate.concat(two);
			Date fromDate = Date.getDate(finalDate);
			if (molsaSimulatedDeterminationDtls.dtls.isActionPending) {
				if ((fromDate.after(Date.getCurrentDate()))) {
					molsaSimulatedDeterminationDtls.isPDAuthorized = false;
				} else
					molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			molsaSimulatedDeterminationDtlsList.dtls
			.addRef(molsaSimulatedDeterminationDtls);

		}
		return molsaSimulatedDeterminationDtlsList;

	}

	@Override
	public ProductDeliveryKey authorize(SimulatedDeterminationKey key)
	throws AppException, InformationalException {
		
	/*  CR 5.3
	 *   Check whether the same program exist which is not in closed state
	 *   Get the details about the new product going to authorize 1)Productid 2)Integrated case
	 */


		CREOLEProgramRecommendation CreoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
		.newInstance();

		CREOLEProgramRecommendationKey creoleKey=new CREOLEProgramRecommendationKey();
		creoleKey.creoleProgramRecommendationID=key.creoleProgramRecommendationID;
		SimulatedDeterminationDetailsList SimulatedDeterminationDtlsList = new SimulatedDeterminationDetailsList();
		SimulatedDeterminationDtlsList = CreoleProgramRecommendationObj.listEligibleSimulatedDeterminations(creoleKey);
		String productName="";
		for (SimulatedDeterminationDetails dtls : SimulatedDeterminationDtlsList.list) {
			productName=dtls.productName;
			System.out.println("Product ID:"+dtls.productName);
			break;
		}

		//Get the products from integrated caseid and check the same product exist which is not in closed status

		Long caseID=creoleProgramRecommendationDAO.get(key.creoleProgramRecommendationID).getIntegratedCase().getID();		
		//CREOLEProgramRecSummaryDAO CREOLEProgramRecSummaryDAO;
		boolean productExists=checkProductExists(productName,caseID);
		if(productExists){
			AppException appException = new AppException(MOLSABPOPRODUCTDELIVERY.ERR_AUTHORIZE_SAME_PRODUCT_EXISTS);
			throw appException;
		}
		validateSimulatedDeterminationState(key);
		curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = (curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation)creoleProgramRecommendationDAO.get(Long.valueOf(key.creoleProgramRecommendationID));
		SimulatedDetermination simulatedDetermination = creoleProgramRecommendation.getSimulatedDetermination(key.simulatedDeterminationID);
		CaseHeader delivery = simulatedDeterminationManager.authorize(creoleProgramRecommendation, simulatedDetermination);
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		productDeliveryKey.caseID = ((Long)delivery.getID()).longValue();
		checkForBankAccount(productDeliveryKey.caseID);
		return productDeliveryKey;
	}

	private void validateSimulatedDeterminationState(SimulatedDeterminationKey key)
	throws InformationalException
	{
		curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation creoleProgramRecommendation = (curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation)creoleProgramRecommendationDAO.get(Long.valueOf(key.creoleProgramRecommendationID));
		SimulatedDetermination simulatedDetermination = creoleProgramRecommendation.getSimulatedDetermination(key.simulatedDeterminationID);
		SIMULATEDDETERMINATIONSTATEEntry simulatedDeterminationState = simulatedDeterminationManager.getSimulatedDeterminationState(creoleProgramRecommendation, simulatedDetermination);
		if(simulatedDeterminationState.equals(SIMULATEDDETERMINATIONSTATEEntry.AUTHORIZED))
		{
			InformationalManager informationalManager = TransactionInfo.getInformationalManager();
			informationalManager.addInformationalMsg(new AppException(CREOLEPROGRAMRECOMMENDATIONFACADE.ERR_XRV_SIMULATED_DETERMINATION_AUTHORIZED), "", curam.util.exception.InformationalElement.InformationalType.kError);
			informationalManager.failOperation();
		}
		if(simulatedDeterminationState.equals(SIMULATEDDETERMINATIONSTATEEntry.DECLINED))
		{
			InformationalManager informationalManager = TransactionInfo.getInformationalManager();
			informationalManager.addInformationalMsg(new AppException(CREOLEPROGRAMRECOMMENDATIONFACADE.ERR_XRV_SIMULATED_DETERMINATION_DECLINED), "", curam.util.exception.InformationalElement.InformationalType.kError);
			informationalManager.failOperation();
		}
	}
	/**
	 * Check For Beneficiary Bank account while Authorize
	 * @param caseID
	 * @throws AppException
	 * @throws InformationalException
	 */

	private void checkForBankAccount(Long caseID) throws AppException, InformationalException{

		CaseNomineeKey caseNomineeKey = new CaseNomineeKey();
		curam.core.sl.entity.intf.CaseNominee caseNominee = curam.core.sl.entity.fact.CaseNomineeFactory.newInstance();
		CaseNomineeCaseIDKey caseidKey=new CaseNomineeCaseIDKey();
		caseidKey.caseID=caseID;
		CaseNomineeForCaseDetailsList casedetailList=caseNominee.searchByCaseID(caseidKey);
		boolean checkbank=false;
		for(CaseNomineeForCaseDetails caseHeaderReadmultiDetails: casedetailList.dtls.items() ) {
			CaseNomineeDestination nomineeDest=CaseNomineeDestinationFactory.newInstance();
			caseNomineeKey.caseNomineeID=caseHeaderReadmultiDetails.caseNomineeID;
			CaseNomineeDestinationDtlsList destDTLSList=nomineeDest.searchByCaseNominee(caseNomineeKey);
			for(CaseNomineeDestinationDtls caseNomineeDestinationDtls: destDTLSList.dtls.items() ){
				if(caseNomineeDestinationDtls.destinationType.equals(DESTINATIONTYPECODE.BANKACCOUNT) && caseNomineeDestinationDtls.statusCode.equals(RECORDSTATUS.NORMAL)){
					checkbank=true;
					break;
				}
			}
			if(checkbank){
				break;
			}

		}
		if(!checkbank){
			TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
			taskCreateDetails.taskDetails.caseID=caseID;
			final LocalisableString subject = new LocalisableString(MOLSANOTIFICATION.TASK_SUBJECT_ADD_BENEFICIARY_BANK_ACCOUNT);
			subject.arg(caseID +" ");		
			taskCreateDetails.taskDetails.assignedTo=String.valueOf(45001);
			taskCreateDetails.taskDetails.priority=TASKPRIORITY.HIGH;
			taskCreateDetails.taskDetails.assigneeType=TARGETITEMTYPE.WORKQUEUE;
			taskCreateDetails.taskDetails.subject = subject.getMessage(TransactionInfo
					.getProgramLocale());
			final LocalisableString comments = new LocalisableString(MOLSANOTIFICATION.TASK_COMMENT_BENEFICIARY_BANK_ACCOUNT);
			taskCreateDetails.taskDetails.comments=comments.getMessage(TransactionInfo
					.getProgramLocale());
			
			
			curam.core.sl.intf.TaskManagement taskManagementObj = curam.core.sl.fact.TaskManagementFactory.newInstance();
			taskManagementObj.create(taskCreateDetails.taskDetails);
		}


	}
	
	public boolean checkProductExists(String productName,Long caseID){
		boolean productexists = false;
		curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();
		CaseHeaderReadmultiKey1 caseHeaderReadmultiKey1 = new CaseHeaderReadmultiKey1();
		caseHeaderReadmultiKey1.integratedCaseID = caseID;
		CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List;
		try {
			caseHeaderReadmultiDetails1List = caseHeaderObj.searchByIntegratedCaseID(caseHeaderReadmultiKey1);

			curam.core.intf.ProductDelivery productDeliveryObj = ProductDeliveryFactory
			.newInstance();
			ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
			ProductDeliveryDtls productDeliveryDtls;


			for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails: caseHeaderReadmultiDetails1List.dtls.items() ) {
				if (!(caseHeaderReadmultiDetails.statusCode.equals(CASESTATUS.CLOSED))) {
					productDeliveryKey.caseID = caseHeaderReadmultiDetails.caseID;
					productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);
					curam.core.intf.Product productObj = curam.core.fact.ProductFactory.newInstance();
					ProductKey productKey = new ProductKey();
					productKey.productID = productDeliveryDtls.productID;
					ProductDtls productDtls = productObj.read(productKey);


					//	Product product=ProductFactory.newInstance();
					//	product
					if(productDtls.typeCode.equals(PRODUCTTYPE.HANDICAP)||productDtls.typeCode.equals(PRODUCTTYPE.DIVORCEDLADY)||
							productDtls.typeCode.equals(PRODUCTTYPE.FAMILYOFPRISONER)||productDtls.typeCode.equals(PRODUCTTYPE.MAIDALLOWANCE)||
							productDtls.typeCode.equals(PRODUCTTYPE.DESERTEDWIFE)||productDtls.typeCode.equals(PRODUCTTYPE.FAMILYINNEED)||
							productDtls.typeCode.equals(PRODUCTTYPE.FAMILYOFMISSING)||productDtls.typeCode.equals(PRODUCTTYPE.WIDOW)||
							productDtls.typeCode.equals(PRODUCTTYPE.SENIORCITIZEN)||productDtls.typeCode.equals(PRODUCTTYPE.ORPHAN)||
							productDtls.typeCode.equals(PRODUCTTYPE.ANONYMOUSPARENTS)||productDtls.typeCode.equals(PRODUCTTYPE.MOLSADETERMINEPRODUCT)||
							productDtls.typeCode.equals(PRODUCTTYPE.INCAPABLEOFWORKING)){
							if (productDtls.name
									.equals(productName)) {
								productexists = true;
								break;
							}
					}
				}

			}

		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return productexists;

	}
}
