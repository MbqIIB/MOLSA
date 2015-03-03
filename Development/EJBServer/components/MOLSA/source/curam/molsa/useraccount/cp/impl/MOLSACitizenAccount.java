package curam.molsa.useraccount.cp.impl;

import curam.citizenaccount.facade.struct.ConcernRoleKey;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSACitizenAccount extends
		curam.molsa.useraccount.cp.base.MOLSACitizenAccount {

	@Override
	public void createAccount(ConcernRoleKey key) throws AppException,
			InformationalException {
		MOLSACitizenPortalHelper citizenPortalHelper = new MOLSACitizenPortalHelper();
		citizenPortalHelper.createNewAccount(key.concernRoleID);
	}

}
