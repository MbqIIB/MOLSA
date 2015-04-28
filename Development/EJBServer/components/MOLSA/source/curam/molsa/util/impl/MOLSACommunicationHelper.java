package curam.molsa.util.impl;

import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.PROGRAMTYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.fact.AlternateNameFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.MaintainConcernRoleBankAcFactory;
import curam.core.fact.UsersFactory;
import curam.core.intf.AlternateName;
import curam.core.intf.MaintainCertification;
import curam.core.intf.MaintainConcernRoleBankAc;
import curam.core.intf.Users;
import curam.core.struct.AlternateNameDtls;
import curam.core.struct.AlternateNameKey;
import curam.core.struct.AlternateNameReadMultiKey;
import curam.core.struct.AlternateNameReadMultiStatusStruct;
import curam.core.struct.AlternateNameStruct;
import curam.core.struct.AlternateNameStructList;
import curam.core.struct.BankAccountRMDtls;
import curam.core.struct.BankAccountReadMultiDtlsList;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.MaintainBankAccountKey;
import curam.core.struct.MaintainCertificationCaseIDKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.MaintainCertificationList;
import curam.core.struct.ReadMultiByConcernRoleIDBankAcResult;
import curam.core.struct.UserFullname;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
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

		
		
		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
		.newInstance();
		MaintainCertificationCaseIDKey certificationCaseIDKey = new MaintainCertificationCaseIDKey();	
		certificationCaseIDKey.caseID = caseID; 
		MaintainCertificationList certificationList = maintainCertificationObj
		.getCertifications(certificationCaseIDKey);
		for(MaintainCertificationDetails certDtls : certificationList.dtls.items()) {
			if(certDtls.statusCode.equals(RECORDSTATUS.NORMAL)) {
				return certDtls.periodToDate;
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

}
