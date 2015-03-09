package curam.molsa.test.universalaccessaccount;

import com.google.inject.Inject;

import curam.citizenworkspace.security.impl.CWPasswordGenerationStrategy;
import curam.codetable.impl.APPLICATION_CODEEntry;
import curam.codetable.impl.EXTERNALUSERTYPEEntry;
import curam.codetable.impl.LOCALEEntry;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.sl.entity.struct.ExternalUserKey;
import curam.core.fact.AlternateNameFactory;
import curam.core.intf.AlternateName;
import curam.core.sl.entity.fact.ExternalUserFactory;
import curam.core.sl.entity.intf.ExternalUser;
import curam.core.sl.entity.struct.ExternalUserDtls;
import curam.core.sl.struct.UserPasswordDetails;
import curam.message.BPOADMINUSER;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.useraccount.sms.sl.impl.MOLSACitizenPortalHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.security.EncryptionAdmin;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;

public class MOLSACitizenPortalResetPasswordTest extends CuramServerTest {

	@Inject
	private CWPasswordGenerationStrategy cwPasswordGenerator;

	public MOLSACitizenPortalResetPasswordTest(String arg0) {
		super(arg0);
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * This method populates the values required for the external user table for
	 * an account.
	 * 
	 * @return ExternalUserDtls
	 * @throws AppException
	 * @throws InformationalException
	 */

	private ExternalUserDtls getExternalUserDetails() throws AppException,
			InformationalException {
		ExternalUserDtls dtls = new ExternalUserDtls();
		dtls.accountEnabled = true;
		dtls.applicationCode = APPLICATION_CODEEntry.CITIZEN_WORKSPACE
				.getCode();
		dtls.creationDate = Date.getCurrentDate();
		dtls.defaultLocale = LOCALEEntry.DEFAULT().getCode();
		dtls.firstname = "Mohamad";
		dtls.password = cwPasswordGenerator.generatePasswordForCitizen();
		dtls.roleName = "LINKEDCITIZENROLE";
		dtls.sensitivity = SENSITIVITYEntry.MINIMUM.getCode();
		dtls.statusCode = RECORDSTATUSEntry.NORMAL.getCode();
		dtls.surname = "Khan";
		dtls.title = null;
		dtls.type = EXTERNALUSERTYPEEntry.PUBLIC.getCode();
		dtls.versionNo = 1;
		return dtls;
	}

	public void testResetPasswordScenario() throws AppException,
			InformationalException {
		MOLSACitizenPortalHelper citizenPortalHelperObj = new MOLSACitizenPortalHelper();
		ExternalUser externalUser = ExternalUserFactory.newInstance();
		ExternalUserDtls userDetails = getExternalUserDetails();

		String password = userDetails.password;
		userDetails.password = getEncryptedPasswordValue(password);
		// set user name as applicants QID
		userDetails.userName = "12345678901";
		// populate external user table
		externalUser.insert(userDetails);
		NotFoundIndicator notFoundIndicatorObj = new NotFoundIndicator();
		ExternalUserKey externalUserSearch = new ExternalUserKey();
		externalUserSearch.userName = "12345678901";
		ExternalUserDtls externaldetails = externalUser.read(
				notFoundIndicatorObj, externalUserSearch);
		UserPasswordDetails passwordDtls = new UserPasswordDetails();
		passwordDtls.confirmPassword = "Test";
		passwordDtls.newPassword = "Test";
		passwordDtls.currentPassword = password;
		passwordDtls.userName = "12345678901";
		String expectedValue = getEncryptedPasswordValue(passwordDtls.confirmPassword);
		citizenPortalHelperObj.resetPassword(passwordDtls);
		NotFoundIndicator notFoundIndicatorObj2 = new NotFoundIndicator();
		ExternalUserKey externalUserSearch2 = new ExternalUserKey();
		externalUserSearch2.userName = "12345678901";
		ExternalUserDtls externaldetails2 = externalUser.read(
				notFoundIndicatorObj2, externalUserSearch2);
		String actualValue = externaldetails2.password;
		assertEquals(actualValue, expectedValue);
	}

	/**
	 * This method is used to encrypt a string value to set as password.
	 * 
	 * @param password
	 *            String
	 * @return String
	 * @throws AppException
	 */
	private String getEncryptedPasswordValue(String password)
			throws AppException {
		String encryptedEnteredPassword;
		try {
			encryptedEnteredPassword = EncryptionAdmin
					.encryptPassword(password);
		} catch (Throwable exception) {
			throw new AppException(BPOADMINUSER.ERR_ENCRYPTION_FAILED,
					exception);
		}
		return encryptedEnteredPassword;
	}

}
