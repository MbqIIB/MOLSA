package curam.molsa.sms.sl.impl;


import curam.core.fact.WMInstanceDataFactory;
import curam.core.struct.WMInstanceDataDtls;
import curam.core.struct.WMInstanceDataKey;
import curam.molsa.sms.entity.fact.MOLSASMSWMInstanceFactory;
import curam.molsa.sms.entity.intf.MOLSASMSWMInstance;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceDtls;
import curam.molsa.sms.entity.struct.MOLSASMSWMInstanceKey;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSASMSDeferredProcessing extends curam.molsa.sms.sl.base.MOLSASMSDeferredProcessing{

  @Override
  public void processSMS(long ticketID, long instDataID, boolean flag) throws AppException, InformationalException {
  
    MOLSAConcernRoleListAndMessageTextDetails key=new MOLSAConcernRoleListAndMessageTextDetails();
    MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
    MOLSASMSWMInstance molsasmswmInstanceObj=MOLSASMSWMInstanceFactory.newInstance();
    MOLSASMSWMInstanceKey instanceKey=new MOLSASMSWMInstanceKey();
    instanceKey.instDataID=instDataID;
    final MOLSASMSWMInstanceDtls instanceDtls =molsasmswmInstanceObj.read(instanceKey);
    key.dtls.concernRoleTabbedList=instanceDtls.idTabbedList;
    key.dtls.smsMessageText=instanceDtls.messageText;
    key.dtls.smsMessageType=instanceDtls.smsTemplate;
    key.dtls.caseID=instanceDtls.caseID;
    molsasmsUtilObj.sendSMS(key);
    
  }

  
}
