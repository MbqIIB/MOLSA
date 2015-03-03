package curam.molsacp.maintainaccount.facade.impl;

import curam.core.sl.struct.UserPasswordDetails;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAResetUserPassword extends
		curam.molsacp.maintainaccount.facade.base.MOLSAResetUserPassword {
	/**
	 * This method calls the reset function of the citizen portal helper class.
	 * 
	 * @param key
	 *            UserPasswordDetails
	 * @return void
	 * @throws AppException
	 *             General Exception
	 */
	@Override
	public void resetUserPassword(UserPasswordDetails key) throws AppException,
			InformationalException {
		//Call the helper method to reset password
		MOLSACitizenPortalHelper accountHelperObj = new MOLSACitizenPortalHelper();
		accountHelperObj.resetPassword(key);
	}

}
