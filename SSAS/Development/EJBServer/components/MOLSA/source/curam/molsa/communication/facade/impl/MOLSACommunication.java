package curam.molsa.communication.facade.impl;

import curam.core.fact.BankBranchFactory;
import curam.core.intf.BankBranch;
import curam.core.struct.BankBranchDtlsList;


import curam.molsa.bankbranch.entity.fact.MOLSABankBranchDAFactory;
import curam.molsa.bankbranch.entity.intf.MOLSABankBranchDA;
import curam.molsa.communication.entity.fact.MOLSAConcernRoleCommunicationFactory;
import curam.molsa.communication.entity.intf.MOLSAConcernRoleCommunication;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationDtls;
import curam.molsa.communication.entity.struct.MOLSAConcernRoleCommunicationKey;
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
    dtls.bankBranchID=arg1.bankBranchID;
    dtls.molsaManager=arg1.molsaManager;
    commObj.modify(key, dtls);        
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

}
