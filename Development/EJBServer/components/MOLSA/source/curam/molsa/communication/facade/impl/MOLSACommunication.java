package curam.molsa.communication.facade.impl;

import curam.core.fact.BankBranchFactory;
import curam.core.fact.UsersFactory;
import curam.core.intf.BankBranch;
import curam.core.intf.Users;
import curam.core.struct.BankBranchDtlsList;
import curam.core.struct.UserLocationDetails;
import curam.core.struct.UserRoleAccountStatusKey;
import curam.core.struct.UserRoleLocationDetailsList;


import curam.molsa.bankbranch.entity.fact.MOLSABankBranchDAFactory;
import curam.molsa.bankbranch.entity.intf.MOLSABankBranchDA;
import curam.molsa.communication.entity.fact.MOLSAConcernRoleCommunicationFactory;
import curam.molsa.communication.entity.intf.MOLSAConcernRoleCommunication;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
import curam.molsa.message.MOLSABPOTRAINING;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSACommunication extends curam.molsa.communication.facade.base.MOLSACommunication{

  @Override
  public BankBranchDtlsList readAllBankBranch() throws AppException, InformationalException {
    // TODO Auto-generated method stub   
   MOLSABankBranchDA branchobj=MOLSABankBranchDAFactory.newInstance();
   BankBranchDtlsList listBranch=new BankBranchDtlsList();
   listBranch = branchobj.nkreadmulti();
   return listBranch;
  }

  @Override
  public void saveCommunicationDetails(MOLSAConcernRoleCommunicationDtls arg1) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    MOLSAConcernRoleCommunication commObj= MOLSAConcernRoleCommunicationFactory.newInstance();
    MOLSAConcernRoleCommunication readObj= MOLSAConcernRoleCommunicationFactory.newInstance();
    MOLSAConcernRoleCommunicationKey key= new MOLSAConcernRoleCommunicationKey();
    key.communicationID=arg1.communicationID; 
    MOLSAConcernRoleCommunicationDtls dtls = readObj.read(key);
    if((dtls.bankBranchID==0) && (dtls.molsaManager.equals(""))){
    dtls.bankBranchID=arg1.bankBranchID;
    dtls.molsaManager=arg1.molsaManager;
    commObj.modify(key, dtls);  
    }else{
    	throw new AppException(MOLSABPOTRAINING.ERR_COMMUNICATION_DATA_ALREADY_EXIST);
    }
  }

  @Override
  public MOLSAConcernRoleCommunicationDtls readCommunicationDetails(MOLSAConcernRoleCommunicationKey arg1) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    MOLSAConcernRoleCommunication readObj= MOLSAConcernRoleCommunicationFactory.newInstance();
    MOLSAConcernRoleCommunicationKey key= new MOLSAConcernRoleCommunicationKey();
    key.communicationID=arg1.communicationID; 
    MOLSAConcernRoleCommunicationDtls dtls = readObj.read(key);
    return dtls;
  }

@Override
public UserRoleLocationDetailsList readAllMolsaManagers() throws AppException,
		InformationalException {
	// TODO Auto-generated method stub
	 // TODO Auto-generated method stub
    Users userObj = UsersFactory.newInstance();
    UserRoleAccountStatusKey key = new UserRoleAccountStatusKey();
    key.accountEnabled = true;
    key.roleName = "MOLSAMANAGERROLE";
    UserRoleLocationDetailsList usersList = new UserRoleLocationDetailsList();
    usersList = userObj.searchUsersByRoleAndAccountStatus(key);
    return usersList;
}

}
