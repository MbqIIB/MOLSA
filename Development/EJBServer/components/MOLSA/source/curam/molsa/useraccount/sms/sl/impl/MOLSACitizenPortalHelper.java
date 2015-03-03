package curam.molsa.useraccount.sms.sl.impl;

import java.rmi.RemoteException;

import org.apache.axis2.transport.http.HTTPConstants;

import com.google.inject.Inject;
import com.pmmsoapmessenger.MessengerStub;
import com.pmmsoapmessenger.MessengerStub.Authenticate;
import com.pmmsoapmessenger.MessengerStub.AuthenticateResponse;
import com.pmmsoapmessenger.MessengerStub.GetSmsStatus;
import com.pmmsoapmessenger.MessengerStub.MessageType;
import com.pmmsoapmessenger.MessengerStub.SendSms;
import com.pmmsoapmessenger.MessengerStub.SendSmsResponse;
import com.pmmsoapmessenger.MessengerStub.SoapUser;

import curam.citizenworkspace.codetable.impl.IntakeClientTypeEntry;
import curam.citizenworkspace.entity.fact.CWExternalPartyLinkFactory;
import curam.citizenworkspace.entity.intf.CWExternalPartyLink;
import curam.citizenworkspace.entity.struct.CWExternalPartyLinkDtls;
import curam.citizenworkspace.security.fact.IntakeClientFactory;
import curam.citizenworkspace.security.impl.CWPasswordGenerationStrategy;
import curam.citizenworkspace.security.intf.IntakeClient;
import curam.citizenworkspace.security.struct.IntakeClientDtls;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.impl.APPLICATION_CODEEntry;
import curam.codetable.impl.EXTERNALUSERTYPEEntry;
import curam.codetable.impl.LOCALEEntry;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.codetable.impl.SENSITIVITYEntry;
import curam.core.fact.AlternateNameFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.AlternateName;
import curam.core.sl.entity.fact.ExternalUserFactory;
import curam.core.sl.entity.intf.ExternalUser;
import curam.core.sl.entity.struct.ExternalUserDtls;
import curam.core.sl.entity.struct.ExternalUserKey;
import curam.core.sl.struct.UserPasswordDetails;
import curam.core.struct.AlternateNameReadMultiStatusStruct;
import curam.core.struct.AlternateNameStruct;
import curam.core.struct.AlternateNameStructList;
import curam.message.BPOADMINUSER;
import curam.message.MOLSANOTIFICATION;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.sms.sl.impl.MOLSASMSConstants;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.DatabaseException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.security.EncryptionAdmin;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;

@SuppressWarnings("restriction")
public class MOLSACitizenPortalHelper {

	@Inject
	private CWPasswordGenerationStrategy cwPasswordGenerator;

	/**
	 * Constructor for the class.
	 */
	public MOLSACitizenPortalHelper() {
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * This method creates new citizen portal account. It takes the applicants
	 * concernRoleID as parameter and creates account if it doesn't exist and
	 * sends the password as SMS to the registered mobile number.
	 * 
	 * @param concernRoleID
	 *            long
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("static-access")
	public void createNewAccount(long concernRoleID) throws AppException,
			InformationalException {

		curam.molsa.sms.sl.impl.MOLSASMSUtil smsUtilObj = new curam.molsa.sms.sl.impl.MOLSASMSUtil();
		String phoneNumber = new String();
		if (concernRoleID != 0L) {
			// read the registered preferred mobile phone number
			phoneNumber = smsUtilObj.getPersonPreferredPhoneNumber(String
					.valueOf(concernRoleID));
			if (!(phoneNumber.isEmpty())) {
				AlternateNameStruct nameDtls = getAlternateNameDetails(concernRoleID);
				MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
				// get QID from concernRoleID
				String qid = participantHelper.returnConcernRoleAlternateID(
						concernRoleID, CONCERNROLEALTERNATEID.INSURANCENUMBER);
				ExternalUser externalUser = ExternalUserFactory.newInstance();
				NotFoundIndicator notFoundIndicatorObj = new NotFoundIndicator();
				ExternalUserKey externalUserSearch = new ExternalUserKey();
				externalUserSearch.userName = qid;
				externalUser.read(notFoundIndicatorObj, externalUserSearch);

				// Check if the user is already registered
				if (notFoundIndicatorObj.isNotFound()) {
					ExternalUserDtls userDetails = getExternalUserDetails(
							nameDtls, concernRoleID);
					String password = userDetails.password;
					userDetails.password = getEncryptedPasswordValue(password);
					// set user name as applicants QID
					userDetails.userName = qid;
					// populate external user table
					externalUser.insert(userDetails);

					// populate intake client table with the user details
					IntakeClient intakeClient = IntakeClientFactory
							.newInstance();
					IntakeClientDtls clientDtls = getIntakeClientDetails(userDetails);
					intakeClient.insert(clientDtls);

					// populate external party link table
					CWExternalPartyLink externalPartyLink = CWExternalPartyLinkFactory
							.newInstance();
					CWExternalPartyLinkDtls linkDtls = getExternalPartyLinkDetails(
							concernRoleID, clientDtls);
					externalPartyLink.insert(linkDtls);

					// call send SMS functionality
					sendSMS(password, phoneNumber);

					// TODO Remove this sysout statement
					System.out.println(password);
				} else {
					// the user is already registered
					throw new AppException(
							MOLSANOTIFICATION.UNIVERSALACCESS_ACCOUNT_EXISTS);
				}
			} else {
				// There is no registered phone number for the applicant
				throw new AppException(MOLSANOTIFICATION.PHONE_NUMBER_EMPTY);
			}
		}
	}

	/**
	 * This method is used to reset password of an existing user account by
	 * authenticating existing password of the user.
	 * 
	 * @param passwordDtls
	 *            UserPasswordDetails
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void resetPassword(UserPasswordDetails passwordDtls)
			throws AppException {
		// get encrypted value of current password
		String existingPassword = getEncryptedPasswordValue(passwordDtls.currentPassword);
		ExternalUser externalUser = ExternalUserFactory.newInstance();
		ExternalUserKey externalUserKey = new ExternalUserKey();
		externalUserKey.userName = passwordDtls.userName;
		try {
			// Read the existing user details using the user name
			ExternalUserDtls externalUserDtls = externalUser
					.read(externalUserKey);
			// Check if the existing password is correct
			if (existingPassword.equals(externalUserDtls.password)) {
				// Check if entered new password and confirm password matches
				if (passwordDtls.confirmPassword
						.equals(passwordDtls.newPassword)) {
					String newPassword = new String();
					// Encrypt the new password
					newPassword = getEncryptedPasswordValue(passwordDtls.confirmPassword);
					externalUserDtls.password = newPassword;
					externalUserDtls.passwordChanged = Date.getCurrentDate();
					// Modify the record in external user table
					externalUser.modify(externalUserKey, externalUserDtls);

					// TODO remove this sysout statement
					System.out.println(newPassword);
				} else {
					// New password and confirm password doesnot match
					throw new AppException(
							MOLSANOTIFICATION.PASSWORD_NOT_MATCHING);
				}
			} else {
				// Entered password authentication failed
				throw new AppException(MOLSANOTIFICATION.WRONG_PASSWORD);
			}
		} catch (InformationalException e) {
			e.printStackTrace();
		}

	}

	/**
	 * This method reads the name details for the concernRoleID.
	 * 
	 * @param concernRoleID
	 *            long
	 * @return AlternateNameStruct
	 * @throws AppException
	 * @throws InformationalException
	 */
	private AlternateNameStruct getAlternateNameDetails(long concernRoleID)
			throws AppException, InformationalException {
		AlternateName alternateName = AlternateNameFactory.newInstance();
		AlternateNameReadMultiStatusStruct readMultiKey = new AlternateNameReadMultiStatusStruct();
		readMultiKey.concernRoleID = concernRoleID;
		readMultiKey.nameStatus = RECORDSTATUSEntry.NORMAL.getCode();
		AlternateNameStructList dtlsList = alternateName
				.searchActiveNameByConcernRole(readMultiKey);
		return ((AlternateNameStruct) dtlsList.dtls.get(0));
	}

	/**
	 * This method populates the values required for the external user table for
	 * an account.
	 * 
	 * @param roleDtls
	 *            AlternateNameStruct
	 * @param concernRoleID
	 *            long
	 * @return ExternalUserDtls
	 * @throws AppException
	 * @throws InformationalException
	 */

	private ExternalUserDtls getExternalUserDetails(
			AlternateNameStruct roleDtls, long concernRoleID)
			throws AppException, InformationalException {
		ExternalUserDtls dtls = new ExternalUserDtls();
		dtls.accountEnabled = true;
		dtls.applicationCode = APPLICATION_CODEEntry.CITIZEN_WORKSPACE
				.getCode();
		dtls.creationDate = Date.getCurrentDate();
		dtls.defaultLocale = LOCALEEntry.DEFAULT().getCode();
		dtls.firstname = roleDtls.firstForename;
		dtls.password = cwPasswordGenerator.generatePasswordForCitizen();
		dtls.roleName = "LINKEDCITIZENROLE";
		dtls.sensitivity = SENSITIVITYEntry.MINIMUM.getCode();
		dtls.statusCode = RECORDSTATUSEntry.NORMAL.getCode();
		dtls.surname = roleDtls.surname;
		dtls.title = null;
		dtls.type = EXTERNALUSERTYPEEntry.PUBLIC.getCode();
		dtls.versionNo = 1;
		return dtls;
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

	/**
	 * This method is used to populate the intake client table details taking
	 * external user details strut as parameter
	 * 
	 * @param userDtls
	 *            ExternalUserDtls
	 * @return IntakeClientDtls
	 * @throws AppException
	 * @throws InformationalException
	 */
	private IntakeClientDtls getIntakeClientDetails(ExternalUserDtls userDtls)
			throws AppException, InformationalException {
		IntakeClientDtls dtls = new IntakeClientDtls();
		dtls.type = IntakeClientTypeEntry.LINKED.getCode();
		dtls.userName = userDtls.userName;
		dtls.versionNo = 1;
		return dtls;
	}

	/**
	 * This method is used populate CWExternalPartyLink table details.
	 * 
	 * @param concernRoleID
	 *            long
	 * @param clientDtls
	 *            IntakeClientDtls
	 * @return CWExternalPartyLinkDtls
	 * @throws AppException
	 * @throws InformationalException
	 */
	private CWExternalPartyLinkDtls getExternalPartyLinkDetails(
			long concernRoleID, IntakeClientDtls clientDtls)
			throws AppException, InformationalException {
		CWExternalPartyLinkDtls dtls = new CWExternalPartyLinkDtls();
		dtls.createdByUserName = null;
		dtls.cwUserName = clientDtls.userName;
		dtls.externalPartyID = String.valueOf(concernRoleID);
		dtls.externalSystemID = "CORE_CURAM";
		dtls.recordStatus = RECORDSTATUSEntry.NORMAL.getCode();
		dtls.versionNo = 1;
		return dtls;
	}

	/**
	 * This method would send password as an SMS to the phone number.
	 * 
	 * @param password
	 *            String
	 * @param phoneNumber
	 *            String
	 * @throws AppException
	 * @throws InformationalException
	 */
	private void sendSMS(String password, String phoneNumber)
			throws AppException, InformationalException {
		SoapUser soapUser = getUserDetails();
		Authenticate authenticate = new Authenticate();
		authenticate.setUser(soapUser);
		try {
			if (authenticateSoapUser(soapUser)) {
				try {
					MessengerStub messenger = new MessengerStub();
					messenger._getServiceClient().getOptions()
							.setProperty(HTTPConstants.CHUNKED, false);
					SendSms sendSms = null;
					if (!phoneNumber.equals("")) {
						sendSms = new SendSms();
						sendSms.setUser(soapUser);
						sendSms.setBlink(false);
						sendSms.setDefDate(CuramConst.gkEmpty);
						sendSms.setFlash(false);
						sendSms.setOriginator(MOLSASMSConstants.kOriginator);
						sendSms.setPrivate(false);
						sendSms.setMessageType(MessageType.ArabicWithArabicNumbers);
						sendSms.setSmsText(password);
						sendSms.setRecipientPhone(phoneNumber);
						SendSmsResponse sendResult = new SendSmsResponse();
						sendResult = messenger.sendSms(sendSms);
						GetSmsStatus smsStatus = new GetSmsStatus();
						smsStatus.setUser(soapUser);
						smsStatus.setTransactionID(sendResult
								.getSendSmsResult().getTransactionID());
						smsStatus.setDetailed(true);
					}
				} catch (RemoteException e1) {
					e1.printStackTrace();
				}
			} else {
				final AppException appException = new AppException(
						MOLSASMSSERVICE.ERR_AUTH_FAILED);
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								appException,
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
								0);
				return;
			}
		} catch (NumberFormatException e) {
		} catch (DatabaseException e) {
		} catch (RemoteException e) {
		} catch (AppRuntimeException e) {
		}

	}

	/**
	 * This method is used to get the soap user details of MOLSA
	 * 
	 * @return SoapUser
	 */
	private SoapUser getUserDetails() {
		SoapUser soapUser = new SoapUser();
		soapUser.setCustomerID(1880);
		soapUser.setName(Configuration.getProperty(EnvVars.SMS_LOGIN_USERNAME));
		soapUser.setPassword(Configuration
				.getProperty(EnvVars.SMS_LOGIN_PASSWORD));
		return soapUser;

	}

	/**
	 * Authenticates the soap user.
	 * 
	 * @param user
	 *            Contains a key details.
	 * 
	 * @return Boolean
	 * 
	 * @throws RemoteException
	 *             Generic Exception Signature.
	 */

	private Boolean authenticateSoapUser(SoapUser user) throws RemoteException {
		SoapUser soapUser = getUserDetails();
		Authenticate authenticate = new Authenticate();
		authenticate.setUser(soapUser);
		MessengerStub messenger = new MessengerStub();
		messenger._getServiceClient().getOptions()
				.setProperty(HTTPConstants.CHUNKED, false);
		try {

			AuthenticateResponse authResult = new AuthenticateResponse();
			authResult = messenger.authenticate(authenticate);
			if (authResult.getAuthenticateResult().getResult().equals("OK")) {
				return true;
			}
		} catch (RemoteException exception) {
			exception.printStackTrace();
		}
		return false;
	}

}
