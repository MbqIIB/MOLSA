package curam.molsacp.maintainaccount.facade.impl;

import curam.core.sl.struct.UserPasswordDetails;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAResetUserPassword extends
		curam.molsacp.maintainaccount.facade.base.MOLSAResetUserPassword {

	@Override
	public void resetUserPassword(UserPasswordDetails key) throws AppException,
			InformationalException {
		MOLSACitizenPortalHelper accountHelperObj = new MOLSACitizenPortalHelper();
		accountHelperObj.resetPassword(key);
	}

}
