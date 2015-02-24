package curam.molsa.formatter.impl;

import curam.core.fact.PhoneNumberFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.PhoneNumber;
import curam.core.sl.struct.PhoneNumberString;
import curam.core.struct.PhoneNumberDtls;
import curam.core.struct.PhoneNumberKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAPhoneNumberFormatter extends
		curam.molsa.formatter.base.MOLSAPhoneNumberFormatter {

	/**
	 * Display of phone number is 974 –XXXXXXXX
	 */
	@Override
	public PhoneNumberString formatPhoneNumber(PhoneNumberKey key)
			throws AppException, InformationalException {

	    PhoneNumberString phoneNumberString = new PhoneNumberString();

	    PhoneNumber phoneNumberObj = PhoneNumberFactory.newInstance();
	    PhoneNumberDtls phoneNumberDtls = phoneNumberObj.read(key);

	    // Check for phone number
	    if (phoneNumberDtls.phoneNumber.length() != 0) {

	      if (phoneNumberDtls.phoneCountryCode.length() != 0) {

	        phoneNumberString.phoneNumberString = phoneNumberString.phoneNumberString
	          + phoneNumberDtls.phoneCountryCode + CuramConst.gkDash;
	      }

	      if (phoneNumberDtls.phoneAreaCode.length() != 0) {

	        phoneNumberString.phoneNumberString = phoneNumberString.phoneNumberString
	          + phoneNumberDtls.phoneAreaCode + CuramConst.gkSpace;
	      }

	      phoneNumberString.phoneNumberString = phoneNumberString.phoneNumberString
	        + phoneNumberDtls.phoneNumber;

	      if (phoneNumberDtls.phoneExtension.length() != 0) {

	        phoneNumberString.phoneNumberString = phoneNumberString.phoneNumberString
	          + CuramConst.gkSpace + CuramConst.gkExtension + CuramConst.gkSpace
	          + phoneNumberDtls.phoneExtension;
	      }
	    }

	    return phoneNumberString;
	  }

}
