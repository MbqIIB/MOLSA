package curam.molsa.useraccount.cp.impl;

import curam.citizenaccount.facade.struct.ConcernRoleKey;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSACitizenAccount extends
		curam.molsa.useraccount.cp.base.MOLSACitizenAccount {
	/**
	 * This method is used to call the helper method which creates new account
	 * for the applicant
	 * 
	 * @param key
	 *            ConcernRoleKey
	 * @return void
	 * @throws AppException
	 *             General Exception
	 */
	@Override
	public void createAccount(ConcernRoleKey key) throws AppException,
			InformationalException {
		// Call the helper method to create new account
		MOLSACitizenPortalHelper citizenPortalHelper = new MOLSACitizenPortalHelper();
		citizenPortalHelper.createNewAccount(key.concernRoleID);
	}
}
