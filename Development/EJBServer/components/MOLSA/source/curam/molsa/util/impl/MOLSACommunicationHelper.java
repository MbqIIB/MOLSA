package curam.molsa.util.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASENOMINEESTATUS;
import curam.codetable.CASESTATUS;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.FINCOMPONENTSTATUS;
import curam.codetable.FINCOMPONENTTYPE;
import curam.codetable.MOLSAEXCEPTIONALPROGRAMTYPE;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.PROGRAMTYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.infrastructure.assessment.fact.CaseDeterminationFactory;
import curam.core.facade.infrastructure.assessment.intf.CaseDetermination;
import curam.core.facade.infrastructure.assessment.struct.CaseIDDeterminationIDKey;
import curam.core.facade.infrastructure.fact.EvidenceFactory;
import curam.core.facade.infrastructure.intf.Evidence;
import curam.core.facade.infrastructure.struct.ListAllActiveEVDInstanceWorkspaceDtls;
import curam.core.fact.AlternateNameFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.FinancialComponentFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.MaintainConcernRoleBankAcFactory;
import curam.core.fact.PhoneNumberFactory;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.UsersFactory;
import curam.core.impl.EnvVars;
import curam.core.intf.AlternateName;
import curam.core.intf.CaseHeader;
import curam.core.intf.FinancialComponent;
import curam.core.intf.MaintainCertification;
import curam.core.intf.MaintainConcernRoleBankAc;
import curam.core.intf.PhoneNumber;
import curam.core.intf.ProductDelivery;
import curam.core.intf.Users;

import curam.core.sl.entity.fact.CaseNomineeFactory;
import curam.core.sl.entity.intf.CaseNominee;
import curam.core.sl.entity.struct.CaseNomineeAndStatusForCaseDetails;
import curam.core.sl.entity.struct.CaseNomineeAndStatusForCaseDetailsList;
import curam.core.sl.entity.struct.CaseNomineeCaseIDAndStatusKey;
import curam.core.sl.entity.struct.CaseNomineeCaseIDKey;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.infrastructure.entity.struct.SuccessionID;
import curam.core.sl.infrastructure.struct.BusinessObjectEvidenceTypeKey;
import curam.core.sl.infrastructure.struct.BusinessObjectSummary;
import curam.core.sl.infrastructure.struct.BusinessObjectSummaryList;
import curam.core.sl.struct.CaseIDParticipantIDEvidenceTypeKey;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.AlternateNameDtls;
import curam.core.struct.AlternateNameKey;
import curam.core.struct.AlternateNameReadMultiKey;
import curam.core.struct.AlternateNameReadMultiStatusStruct;
import curam.core.struct.AlternateNameStruct;
import curam.core.struct.AlternateNameStructList;
import curam.core.struct.BankAccountRMDtls;
import curam.core.struct.BankAccountReadMultiDtlsList;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.FCstatusCodeCaseID;
import curam.core.struct.FinancialComponentDtls;
import curam.core.struct.FinancialComponentDtlsList;
import curam.core.struct.MaintainBankAccountKey;
import curam.core.struct.MaintainCertificationCaseIDKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.MaintainCertificationList;
import curam.core.struct.PhoneNumberDtls;
import curam.core.struct.PhoneNumberKey;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ReadMultiByConcernRoleIDBankAcResult;
import curam.core.struct.UserFullname;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.molsa.communication.entity.fact.MOLSAConcernRoleCommunicationFactory;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.DateRange;
import curam.util.type.Money;
import curam.util.type.NotFoundIndicator;


public class MOLSACommunicationHelper {
	public static String kMain = "MAIN";
	public static String kMaid = "MAID";
	public static String kProgramType = "programType";
	public static String kAmount = "amount";
	public static String kStartDate = "startDate";
	public static String kEndDate = "endDate";
	
	static ArrayList<String> molsaProduct = new ArrayList<String>(){{
	add(PRODUCTTYPE.ANONYMOUSPARENTS);
	add(PRODUCTTYPE.DESERTEDWIFE);
	add(PRODUCTTYPE.DIVORCEDLADY);
	add(PRODUCTTYPE.FAMILYINNEED);
	add(PRODUCTTYPE.FAMILYOFMISSING);
	add(PRODUCTTYPE.FAMILYOFPRISONER);
	add(PRODUCTTYPE.HANDICAP);
	add(PRODUCTTYPE.INCAPABLEOFWORKING);
	add(PRODUCTTYPE.SENIORCITIZEN);
	add(PRODUCTTYPE.ORPHAN);
	add(PRODUCTTYPE.WIDOW);}};
	
	
	public static void insertAdditionalCommParams(
			MOLSAConcernRoleCommunicationDtls molsaCommDtls) throws AppException,
			InformationalException {
		//Insert additional parameters into customized entity

		curam.molsa.communication.entity.intf.MOLSAConcernRoleCommunication molsaCommObj=MOLSAConcernRoleCommunicationFactory.newInstance();
		molsaCommObj.insert(molsaCommDtls);
	}
	public static MOLSAConcernRoleCommunicationDtls readAdditionalCommParams(
			MOLSAConcernRoleCommunicationKey molsaproFormaDocumentDataKey) throws AppException,
			InformationalException {

		curam.molsa.communication.entity.intf.MOLSAConcernRoleCommunication molsaCommObj=MOLSAConcernRoleCommunicationFactory.newInstance();
		NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
		MOLSAConcernRoleCommunicationDtls molsaCommDtls=molsaCommObj.read(notFoundIndicator, molsaproFormaDocumentDataKey);
		//		if(!notFoundIndicator.isNotFound()){
		//			molsaCommDtls.programNames="";
		//		}
		return molsaCommDtls;
	}

	//This method is called while saving Proforma Document 
	public static String getProgramName() throws AppException,
	InformationalException {
		String programName =CodeTable.getOneItem(PROGRAMTYPE.TABLENAME, PROGRAMTYPE.SOCIALASSISTANCE, TransactionInfo.getProgramLocale());
		return programName;
	}

	public static String getCaseReferenceID(long caseID) throws AppException,
	InformationalException {
		String caseReference="";
		if(caseID!=0){
			curam.core.intf.CaseHeader caseHeaderObj = curam.core.fact.CaseHeaderFactory.newInstance();    
			CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
			caseHeaderKey.caseID = caseID;
			caseReference=caseHeaderObj.read(caseHeaderKey).caseReference;  
			return caseReference;
		}else{
			return caseReference;
		}
	}
	public static String getCardExpiry(long caseID) throws AppException,
	InformationalException {

		//	curam.core.facade.intf.CaseHeader caseHeaderObj= CaseHeaderFactory.newInstance();
		//caseHeader

		Date certEndDate = Date.kZeroDate;
		String certEndDateToString="";
		
		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
		.newInstance();
		MaintainCertificationCaseIDKey certificationCaseIDKey = new MaintainCertificationCaseIDKey();	
		certificationCaseIDKey.caseID = caseID; 
		MaintainCertificationList certificationList = maintainCertificationObj
		.getCertifications(certificationCaseIDKey);
		for(MaintainCertificationDetails certDtls : certificationList.dtls.items()) {
			if(certDtls.statusCode.equals(RECORDSTATUS.NORMAL)) {
				certEndDate =  certDtls.periodToDate;
				break;
			}
		}
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		certEndDateToString = dateFormat.format(certEndDate.getCalendar().getTime());
		
		return certEndDateToString;

	}
	
	public static String getNomineeName(long caseID) throws AppException,
	InformationalException {
		String nonimeeName="";
	    CaseNominee caseNomineeObj= CaseNomineeFactory.newInstance();
	    CaseNomineeCaseIDAndStatusKey caseNomineeCaseIDAndStatusKey = new CaseNomineeCaseIDAndStatusKey();
	    caseNomineeCaseIDAndStatusKey.caseID = caseID;
	    caseNomineeCaseIDAndStatusKey.nomineeStatus=CASENOMINEESTATUS.OPERATIONAL;
	    CaseNomineeAndStatusForCaseDetailsList caseNomineeAndStatusForCaseDetailsList = 
	    	caseNomineeObj.searchByCaseIDAndCaseNomineeStatus(caseNomineeCaseIDAndStatusKey);
	    
	    for(CaseNomineeAndStatusForCaseDetails caseNomineeAndStatusForCaseDetails : caseNomineeAndStatusForCaseDetailsList.dtls.items()) {
	    	nonimeeName = MOLSAParticipantHelper
			.returnAlternateName(caseNomineeAndStatusForCaseDetails.concernRoleID, ALTERNATENAMETYPE.REGISTERED);
	    }
		return nonimeeName;
	}
	
	public static String getCaseWorkerMobileNo() throws AppException,
	InformationalException {
		String phoneNumber="";
		Users usersObj=UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();
		usersKey.userName= TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		PhoneNumber phoneNumberObj = PhoneNumberFactory.newInstance();
		PhoneNumberKey  phoneNumberKey = new  PhoneNumberKey();
		phoneNumberKey.phoneNumberID = usersDtls.businessPhoneID;
		NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
		PhoneNumberDtls  phoneNumberDtls = phoneNumberObj.read(notFoundIndicator, phoneNumberKey);
		if(!notFoundIndicator.isNotFound()) {
			phoneNumber = phoneNumberDtls.phoneNumber +"  "+ phoneNumberDtls.phoneExtension;
		} 
		return phoneNumber;
	}
	public static String getNomineeAlternateID(long caseID) throws AppException,
	InformationalException {
		String alternateID="";
	    CaseNominee caseNomineeObj= CaseNomineeFactory.newInstance();
	    CaseNomineeCaseIDAndStatusKey caseNomineeCaseIDAndStatusKey = new CaseNomineeCaseIDAndStatusKey();
	    caseNomineeCaseIDAndStatusKey.caseID = caseID;
	    caseNomineeCaseIDAndStatusKey.nomineeStatus=CASENOMINEESTATUS.OPERATIONAL;
	    CaseNomineeAndStatusForCaseDetailsList caseNomineeAndStatusForCaseDetailsList = 
	    	caseNomineeObj.searchByCaseIDAndCaseNomineeStatus(caseNomineeCaseIDAndStatusKey);
	    
	    for(CaseNomineeAndStatusForCaseDetails caseNomineeAndStatusForCaseDetails : caseNomineeAndStatusForCaseDetailsList.dtls.items()) {
	    	alternateID = MOLSAParticipantHelper
			.returnConcernRoleAlternateID(
					caseNomineeAndStatusForCaseDetails.concernRoleID,
					CONCERNROLEALTERNATEID.INSURANCENUMBER);
	    }
		return alternateID;
	}
	public static long molsaLocation() throws AppException,
	InformationalException {
		Users usersObj = UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();
		usersKey.userName = TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		long molsaLocationID = usersDtls.locationID;
		return molsaLocationID;
	}
	public static String getIBAN(long concernroleid) throws AppException,
	InformationalException {
		String iBAN = "";
		
		  BankAccountReadMultiDtlsList bankAccRMList = new BankAccountReadMultiDtlsList();
		    MaintainBankAccountKey maintainBankAccountKey = new MaintainBankAccountKey();
		    maintainBankAccountKey.concernRoleID = concernroleid;
		    MaintainConcernRoleBankAc maintainConcernRoleBankAcObj = MaintainConcernRoleBankAcFactory.newInstance();
		    ReadMultiByConcernRoleIDBankAcResult readMultiByConcernRoleIDBankAcResult = 
		    	maintainConcernRoleBankAcObj.readmultiByConcernRole(maintainBankAccountKey);
		    
		   
		for(BankAccountRMDtls bankAccountRMDtls: readMultiByConcernRoleIDBankAcResult.details.dtls.items()){
			
			if(bankAccountRMDtls.primaryInd){
			iBAN=bankAccountRMDtls.ibanOpt;
		//	bankAccountRMDtls.bankBranchName;
			}
		}

		return iBAN;
	}
	public static long getBankID(long concernroleid) throws AppException,
	InformationalException {
		long bankBranchId = 0;
		
		  BankAccountReadMultiDtlsList bankAccRMList = new BankAccountReadMultiDtlsList();
		    MaintainBankAccountKey maintainBankAccountKey = new MaintainBankAccountKey();
		    maintainBankAccountKey.concernRoleID = concernroleid;
		    MaintainConcernRoleBankAc maintainConcernRoleBankAcObj = MaintainConcernRoleBankAcFactory.newInstance();
		    ReadMultiByConcernRoleIDBankAcResult readMultiByConcernRoleIDBankAcResult = 
		    	maintainConcernRoleBankAcObj.readmultiByConcernRole(maintainBankAccountKey);
		    
		   
		for(BankAccountRMDtls bankAccountRMDtls: readMultiByConcernRoleIDBankAcResult.details.dtls.items()){
			
			if(bankAccountRMDtls.primaryInd){
			
				bankBranchId=bankAccountRMDtls.bankBranchID;
			}
		}

		return bankBranchId;
	}
	public static String getFullName(long concernroleid) throws AppException,
	InformationalException {
		//Making Correspondent name same as alternate name with five level of communication
		

		AlternateNameReadMultiStatusStruct alternateNameReadMultiStatusStruct= new AlternateNameReadMultiStatusStruct();

		alternateNameReadMultiStatusStruct.concernRoleID=concernroleid;
		alternateNameReadMultiStatusStruct.nameStatus=RECORDSTATUS.NORMAL;

		AlternateName alternateNameobj= AlternateNameFactory.newInstance();

		AlternateNameReadMultiKey alternateNameReadMultiKey = new AlternateNameReadMultiKey();

		alternateNameReadMultiKey.concernRoleID=concernroleid;

		AlternateNameStructList alternateNameDtlsList=alternateNameobj.searchActiveNameByConcernRole(alternateNameReadMultiStatusStruct);
		AlternateNameDtls alternateNameDtls = new AlternateNameDtls();
		String fullname="";
		for(AlternateNameStruct dtls : alternateNameDtlsList.dtls ){

			AlternateNameKey alternateNameKey= new AlternateNameKey();
			alternateNameKey.alternateNameID=dtls.alternateNameID;
			alternateNameDtls=alternateNameobj.read(alternateNameKey);
			if(alternateNameDtls.nameType.equals(ALTERNATENAMETYPE.REGISTERED)){
				fullname=dtls.fullName;
				break;
			}

		}

		return fullname;
	}
	public static String getCaseWorkerName() throws AppException,
	InformationalException {
		String userfullname="";
		Users userObj=UsersFactory.newInstance();
		UsersKey key= new UsersKey();
		key.userName=TransactionInfo.getProgramUser();
		UserFullname userFullname= userObj.getFullName(key);
		userfullname=userFullname.fullname;
		return userfullname;
	}
	
	
	/**
	 * This method will return the a Map.
	 * The Map contains the details of main and maid product in the Map format.
	 * <"MAIN", HASHMAP<ProductName, Money>>
	 * <"MAID", HASHMAP<ProductName, Money>>
	 * Each Map will contain the Product Description and amount as mentioned above.
	 * @param caseID
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	public static HashMap<String, HashMap<String, Money>> getProductMap(long caseID) throws AppException,
	InformationalException {
	
		
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderReadmultiKey1 caseHeaderReadmultiKey1 = new CaseHeaderReadmultiKey1();
		caseHeaderReadmultiKey1.integratedCaseID = caseID;
		CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List =
			caseHeaderObj.searchByIntegratedCaseID(caseHeaderReadmultiKey1);
		ProductDelivery productDeliveryObj = ProductDeliveryFactory
		.newInstance();
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		ProductDeliveryDtls productDeliveryDtls;
		boolean isExceptionProduct = false;
		boolean isMolsaProduct = false;
		for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails: caseHeaderReadmultiDetails1List.dtls.items() ) {
			if (caseHeaderReadmultiDetails.statusCode.equals(CASESTATUS.ACTIVE)) {
				productDeliveryKey.caseID = caseHeaderReadmultiDetails.caseID;
				productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);
				if (productDeliveryDtls.productType
						.equals(PRODUCTTYPE.MOLSADETERMINEPRODUCT)) {
					isExceptionProduct = true;
					break;
				} else if(molsaProduct.contains(productDeliveryDtls.productType)) {
					isMolsaProduct= true;
					break;
				}
			}
			
		}
		HashMap<String, Long> productMolsaMap = new HashMap<String, Long>();
		HashMap<String, Money> productExceptionMap = new HashMap<String, Money>();
		if(isMolsaProduct) {
			productMolsaMap = getProductDetailsForMolsaProducts(caseHeaderReadmultiDetails1List);
		} else if(isExceptionProduct) {
			productExceptionMap = getProductDetailsForException(caseID);
		}
		
		//The Map to convert Exception Evidence to Molsa Product
		HashMap<String,String> productTypeExceptionalMap = new HashMap<String,String>();
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.ANONYMOUSPARENTS, PRODUCTTYPE.ANONYMOUSPARENTS);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.DESERTEDWIFE, PRODUCTTYPE.DESERTEDWIFE);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.DIVORCEDLADY, PRODUCTTYPE.DIVORCEDLADY);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.FAMILYINNEED, PRODUCTTYPE.FAMILYINNEED);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.FAMILYOFMISSING, PRODUCTTYPE.FAMILYOFMISSING);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.FAMILYOFPRISONER, PRODUCTTYPE.FAMILYOFPRISONER);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.HANDICAPPED, PRODUCTTYPE.HANDICAP);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.INCAPABLEOFWORKING, PRODUCTTYPE.INCAPABLEOFWORKING);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.SENIORCITIZEN, PRODUCTTYPE.SENIORCITIZEN);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.WIDOW, PRODUCTTYPE.WIDOW);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.ORPHAN, PRODUCTTYPE.ORPHAN);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.MAIDASSISTANCE, PRODUCTTYPE.MAIDALLOWANCE);
		productTypeExceptionalMap.put(MOLSAEXCEPTIONALPROGRAMTYPE.EXCEPTIONAL, PRODUCTTYPE.MOLSADETERMINEPRODUCT);
		
		HashMap<String, HashMap<String, Money>> returnMap = new HashMap<String, HashMap<String, Money>>();
		String programDesc="";
		if(isMolsaProduct) {			
			Iterator it = productMolsaMap.entrySet().iterator();
		    while (it.hasNext()) {
		    	programDesc="";
		        Map.Entry pair = (Map.Entry)it.next();
		        if(pair.getKey().equals(PRODUCTTYPE.MAIDALLOWANCE)) {
		        	HashMap<String, Money> mainProductMap = new HashMap<String, Money>();
		        	programDesc = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, pair.getKey().toString(), TransactionInfo.getProgramLocale());
		        	mainProductMap.put(programDesc, getMainProductAmount((Long) pair.getValue()));
		        	returnMap.put(kMaid, mainProductMap);
		        	
		        } else {
		        	HashMap<String, Money> mainProductMap = new HashMap<String, Money>();
		        	programDesc = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, pair.getKey().toString(), TransactionInfo.getProgramLocale());
		        	mainProductMap.put(programDesc, getMainProductAmount((Long) pair.getValue()));
		        	returnMap.put(kMain, mainProductMap);
		        }
		        		        
		    }
		}  else if(isExceptionProduct) {
			Iterator it = productExceptionMap.entrySet().iterator();
		    while (it.hasNext()) {
		    	programDesc="";
		    	 Map.Entry pair = (Map.Entry)it.next();
			        if(pair.getKey().equals(MOLSAEXCEPTIONALPROGRAMTYPE.MAIDASSISTANCE)) {
			        	HashMap<String, Money> mainProductMap = new HashMap<String, Money>();
			        	String productType = productTypeExceptionalMap.get(pair.getKey());
			        	programDesc = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, productType, TransactionInfo.getProgramLocale());
			        	mainProductMap.put(programDesc, (Money) pair.getValue());
			        	returnMap.put(kMaid, mainProductMap);
			        	
			        } else {
			        	HashMap<String, Money> mainProductMap = new HashMap<String, Money>();
			        	String productType = productTypeExceptionalMap.get(pair.getKey());
			        	programDesc = CodeTable.getOneItem(PRODUCTTYPE.TABLENAME, productType, TransactionInfo.getProgramLocale());
			        	mainProductMap.put(programDesc, (Money) pair.getValue());
			        	returnMap.put(kMain, mainProductMap);
			        }
		    }
		}
		
		return returnMap;
	}
	
	
	/**
	 * This method will return the Active Exception evidence details with Amount in the Map format.
	 * @param icCaseID
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	public static HashMap<String, Money> getProductDetailsForException(long icCaseID) throws AppException,
	InformationalException {
		
		HashMap<String, Money> productMap = new HashMap<String, Money>();
		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = icCaseID;
		caseIDStatusAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.EXCEPTIONAL;
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();

		// get all the evidence details for the caseID
		final RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.EXCEPTIONAL;

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (final RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey.caseIDKey.caseID = icCaseID;
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;
			curam.creole.value.CodeTableItem programType= (curam.creole.value.CodeTableItem) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataDetails
						.getAttribute(kProgramType));
			Money amount= (Money) DynamicEvidenceTypeConverter
			.convert(dynamicEvidenceDataDetails
					.getAttribute(kAmount));
			
			Date startDate= (Date) DynamicEvidenceTypeConverter
			.convert(dynamicEvidenceDataDetails
					.getAttribute(kStartDate));
			Date endDate= (Date) DynamicEvidenceTypeConverter
			.convert(dynamicEvidenceDataDetails
					.getAttribute(kEndDate));
			
			DateRange dateRange = new DateRange(startDate,endDate);
			if(dateRange.contains(Date.getCurrentDate())) {			
				productMap.put(programType.code(), amount);
			}
		}
		
		return productMap;
	}
	/**
	 * This method will return a Map with Product Type and CaseID (PDC) from the list of Active PDCs
	 * @param caseHeaderReadmultiDetails1List
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	public static HashMap<String, Long> getProductDetailsForMolsaProducts(CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List)
	throws AppException,	InformationalException {
		HashMap<String, Long> productMap = new HashMap<String, Long>();
		ProductDelivery productDeliveryObj = ProductDeliveryFactory
		.newInstance();
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		ProductDeliveryDtls productDeliveryDtls;
		for(CaseHeaderReadmultiDetails1 caseHeaderReadmultiDetails: caseHeaderReadmultiDetails1List.dtls.items() ) {
			if (caseHeaderReadmultiDetails.statusCode.equals(CASESTATUS.ACTIVE)) {
				productDeliveryKey.caseID = caseHeaderReadmultiDetails.caseID;
				productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);
				 if(molsaProduct.contains(productDeliveryDtls.productType)) {
					 productMap.put(productDeliveryDtls.productType,caseHeaderReadmultiDetails.caseID);
				} else {
					if(productDeliveryDtls.productType.endsWith(PRODUCTTYPE.MAIDALLOWANCE)) {
						productMap.put(productDeliveryDtls.productType,caseHeaderReadmultiDetails.caseID);
					}
				}
			}
			
		}
		
		return productMap;
	}
	/** The method will return the LIV Financial COmponent of this product
	 * 
	 * @param productID
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	public static Money getMainProductAmount(long productID) throws AppException,
	InformationalException {
		Money money =new Money(0);
		FinancialComponent financialComponentObj = FinancialComponentFactory
		.newInstance();
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		fcstatusCodeCaseID.caseID = productID;
		fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.LIVE;
		FinancialComponentDtlsList financialComponentDtlsList = financialComponentObj
		.searchByStatusCaseID(fcstatusCodeCaseID);
		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if (financialComponentDtls.typeCode
					.equals(FINCOMPONENTTYPE.MOLSA_COMP)) {
				money = financialComponentDtls.amount;
			}
		}
		
		return money;
	}


}
