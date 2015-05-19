package curam.molsa.eft.eftletter.facade.impl;

import curam.codetable.RECORDSTATUS;
import curam.molsa.eft.eftletter.facade.struct.MOLSAEFTUserAllDetails;
import curam.molsa.eft.eftletter.facade.struct.MOLSAEFTUserAllDetailsList;
import curam.molsa.eft.eftletter.facade.struct.MOLSAEFTUserDetails;
import curam.molsa.eft.eftletter.facade.struct.MOLSAEFTUserDetailsList;
import curam.molsa.eft.eftletter.sl.fact.MOLSAMaintainEFTUserConfigurationFactory;
import curam.molsa.eft.eftletter.sl.intf.MOLSAMaintainEFTUserConfiguration;
import curam.molsa.eftusers.entity.fact.MOLSAEFTUserConfigurationFactory;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationDtls;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationDtlsList;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationKeyStruct1;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAEFTUserConfiguration extends curam.molsa.eft.eftletter.facade.base.MOLSAEFTUserConfiguration {

	@Override
	public MOLSAEFTUserDetailsList listAllUsersByPosition()
			throws AppException, InformationalException {
		MOLSAEFTUserDetailsList userDetailsList=new MOLSAEFTUserDetailsList();
		
		MOLSAMaintainEFTUserConfiguration configurationObj=MOLSAMaintainEFTUserConfigurationFactory.newInstance();
		curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserDetailsList list = configurationObj.listAllUsersByPosition();
		for(MOLSAEFTUserDetails details:list.dtls.dtls){
			userDetailsList.dtls.add(details);
		}
		
		return userDetailsList;
	}

	@Override
	public void configureUsersForEFTLetterConfiguration(MOLSAEFTUserDetails key)
			throws AppException, InformationalException {
		MOLSAMaintainEFTUserConfiguration configurationObj=MOLSAMaintainEFTUserConfigurationFactory.newInstance();
		curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserDetails arg1=new curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserDetails();
		arg1.dtls.userName1=key.userName1;
		arg1.dtls.userName2=key.userName2;
		configurationObj.configureUsersForEFTLetterConfiguration(arg1);
	}

	@Override
	public MOLSAEFTUserAllDetailsList listUsersConfiguredForEFTLetter()
			throws AppException, InformationalException {
		MOLSAEFTUserAllDetailsList allDetailsList=new MOLSAEFTUserAllDetailsList();
		
		MOLSAMaintainEFTUserConfiguration configurationObj=MOLSAMaintainEFTUserConfigurationFactory.newInstance();
		curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserAllDetailsList detailsList = configurationObj.listUsersConfiguredForEFTLetter();
		for(MOLSAEFTUserAllDetails allDetails : detailsList.dtls.dtls){
			allDetailsList.dtls.add(allDetails);
		}
		
		return allDetailsList;
	}

	
}
