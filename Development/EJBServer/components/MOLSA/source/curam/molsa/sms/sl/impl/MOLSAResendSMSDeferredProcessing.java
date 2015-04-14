package curam.molsa.sms.sl.impl;

import curam.molsa.sms.entity.fact.MOLSASMSWMInstanceFactory;
import curam.molsa.sms.entity.intf.MOLSASMSWMInstance;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceDtls;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceKey;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.sms.sl.struct.MOLSASMSLogKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAResendSMSDeferredProcessing extends curam.molsa.sms.sl.base.MOLSAResendSMSDeferredProcessing{

  @Override
  public void processSMS(long ticketID, long instDataID, boolean flag) throws AppException, InformationalException {
    
    MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails();
    MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
    MOLSASMSWMInstance molsasmswmInstanceObj=MOLSASMSWMInstanceFactory.newInstance();
    MOLSASMSWMInstanceKey instanceKey=new MOLSASMSWMInstanceKey();
    MOLSASMSLogKey molsasmsLogKey=new MOLSASMSLogKey();
    instanceKey.instDataID=instDataID;
    final MOLSASMSWMInstanceDtls instanceDtls =molsasmswmInstanceObj.read(instanceKey); 
    molsasmsLogKey.dtls.smsLogIDTabbedList=instanceDtls.idTabbedList;
    molsasmsUtilObj.resendSMSDPMode(molsasmsLogKey);
  }
}
