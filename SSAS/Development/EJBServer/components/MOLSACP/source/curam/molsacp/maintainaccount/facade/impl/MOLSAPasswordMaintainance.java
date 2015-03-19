package curam.molsacp.maintainaccount.facade.impl;

import curam.core.sl.struct.UserPasswordDetails;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.molsacp.maintainaccount.facade.struct.inputDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAPasswordMaintainance extends
		curam.molsacp.maintainaccount.facade.base.MOLSAPasswordMaintainance {

	@Override
	public void resetUserPassword(UserPasswordDetails key) throws AppException,
			InformationalException {
		MOLSACitizenPortalHelper accountHelperObj = new MOLSACitizenPortalHelper();
		accountHelperObj.resetPassword(key);
	}

	@Override
	public void forgotPassword(inputDetails key) throws AppException,
			InformationalException {

		MOLSACitizenPortalHelper accountHelperObj = new MOLSACitizenPortalHelper();
		try {
			accountHelperObj.forgotPassword(Long.valueOf(key.userID));
		} catch (NumberFormatException e) {
			throw new AppException(MOLSANOTIFICATION.INVALID_USERNAME);
		}
	}
}
