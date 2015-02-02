package curam.molsa.util.impl;

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
		if(molsaCommDtls.programNames==null){
			molsaCommDtls.programNames="";
		}
		return molsaCommDtls;
	}

	public static String getProgramName() throws AppException,
	InformationalException {

		
		return "Program Name";
	}

}
