package curam.molsa.util.impl;

import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.fact.BankBranchFactory;
import curam.core.impl.CaseHeader;
import curam.core.intf.BankBranch;
import curam.core.struct.BankBranchKey;
import curam.core.struct.CaseHeaderKey;
import curam.molsa.communication.entity.base.MOLSAConcernRoleCommunication;
import curam.molsa.communication.entity.fact.MOLSAConcernRoleCommunicationFactory;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
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
		return "Social Assistance";
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

}
