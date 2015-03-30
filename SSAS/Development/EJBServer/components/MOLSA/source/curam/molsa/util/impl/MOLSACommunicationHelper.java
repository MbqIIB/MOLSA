package curam.molsa.util.impl;

import java.util.Iterator;

import oracle.sql.DATE;
import curam.codetable.CASETYPECODE;
import curam.codetable.PROGRAMTYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.base.Person;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.struct.ReadActiveBankAccountList;
import curam.core.facade.struct.ReadParticipantBankAccountListKey;
import curam.core.facade.struct.ReadPersonKey;
import curam.core.fact.BankAccountFactory;
import curam.core.fact.BankBranchFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.fact.UsersFactory;
import curam.core.impl.CaseHeader;
import curam.core.intf.BankAccount;
import curam.core.intf.BankBranch;
import curam.core.intf.MaintainCertification;
import curam.core.intf.ProductDelivery;
import curam.core.intf.Users;
import curam.core.struct.BankAccountRMDtls;
import curam.core.struct.BankBranchKey;
import curam.core.struct.CaseHeaderByConcernRoleIDKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderDtlsList;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CaseHeaderReadmultiDetails1;
import curam.core.struct.CaseHeaderReadmultiDetails1List;
import curam.core.struct.CaseHeaderReadmultiKey1;
import curam.core.struct.MaintainCertificationCaseIDKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.MaintainCertificationList;
import curam.core.struct.PersonDtlsList;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDeliveryTypeDetails;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.molsa.communication.entity.base.MOLSAConcernRoleCommunication;
import curam.molsa.communication.entity.fact.MOLSAConcernRoleCommunicationFactory;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;


public class MOLSACommunicationHelper {
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
	public static Date getCardExpiry(long caseID) throws AppException,
	InformationalException {

		//	curam.core.facade.intf.CaseHeader caseHeaderObj= CaseHeaderFactory.newInstance();
		//caseHeader

		Date cardExpiry =Date.getCurrentDate();
		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
		.newInstance();
		MaintainCertificationCaseIDKey certificationCaseIDKey = new MaintainCertificationCaseIDKey();	
		curam.core.intf.CaseHeader caseheaderObj= curam.core.fact.CaseHeaderFactory.newInstance();
		CaseHeaderByConcernRoleIDKey key  = new CaseHeaderByConcernRoleIDKey();
		ProductDelivery  productDeliveryObj = ProductDeliveryFactory.newInstance();
		ProductDeliveryKey  productDeliveryKey = new ProductDeliveryKey();
		CaseHeaderReadmultiKey1 caseHeaderReadmultiKey1= new CaseHeaderReadmultiKey1();
		caseHeaderReadmultiKey1.integratedCaseID=caseID;
		CaseHeaderReadmultiDetails1List caseHeaderReadmultiDetails1List=caseheaderObj.searchByIntegratedCaseID(caseHeaderReadmultiKey1);
		for(CaseHeaderReadmultiDetails1  caseHeaderReadmultiDetails1 : caseHeaderReadmultiDetails1List.dtls.items()){
			if(caseHeaderReadmultiDetails1.caseTypeCode.equals(CASETYPECODE.PRODUCTDELIVERY)) {
				productDeliveryKey.caseID = caseHeaderReadmultiDetails1.caseID; 
				ProductDeliveryTypeDetails productDeliveryTypeDetails = productDeliveryObj.readProductType(productDeliveryKey);
				if(productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.DESERTEDWIFE)||productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.ANONYMOUSPARENTS)||
						productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.ORPHAN)|| productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.HANDICAPPED)||
						productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.FAMILYOFMISSING) || productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.FAMILYOFPRISONER)||
						productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.FAMILYINNEED)||productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.INCAPABLEOFWORKING)||
						productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.SENIORCITIZEN)||productDeliveryTypeDetails.productType.equals(PROGRAMTYPE.WIDOW)){
					certificationCaseIDKey.caseID = caseHeaderReadmultiDetails1.caseID; 
					MaintainCertificationList certificationList = maintainCertificationObj
					.getCertifications(certificationCaseIDKey);
					for(MaintainCertificationDetails certDtls : certificationList.dtls.items()) {
						if(certDtls.statusCode.equals(RECORDSTATUS.NORMAL)) {
							return certDtls.periodToDate;
						}
					}
				}
			}		
		}	
		return null;

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
		curam.core.facade.intf.Participant participantObj= ParticipantFactory.newInstance();
		ReadParticipantBankAccountListKey readPersonKey= new ReadParticipantBankAccountListKey();

		readPersonKey.maintainBankAccountKey.concernRoleID=concernroleid;
		ReadActiveBankAccountList readActiveBankAccountList=participantObj.listActiveBankAccount(readPersonKey);

		for(BankAccountRMDtls bankAccountRMDtls : readActiveBankAccountList.dtls.nomineeBankAccountList.dtls.items()) {
			if(bankAccountRMDtls.primaryInd) {
				iBAN=bankAccountRMDtls.ibanOpt;
				return iBAN;
			}
		}

		return iBAN;
	}

}
