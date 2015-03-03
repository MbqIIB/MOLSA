package curam.molsa.useraccount.sms.sl.impl;

import java.rmi.RemoteException;

import org.apache.axis2.transport.http.HTTPConstants;

import com.google.inject.Inject;
import com.pmmsoapmessenger.MessengerStub;
import com.pmmsoapmessenger.MessengerStub.Authenticate;
import com.pmmsoapmessenger.MessengerStub.AuthenticateResponse;
import com.pmmsoapmessenger.MessengerStub.GetSmsStatus;
import com.pmmsoapmessenger.MessengerStub.GetSmsStatusResponse;
import com.pmmsoapmessenger.MessengerStub.MessageType;
import com.pmmsoapmessenger.MessengerStub.SendSms;
import com.pmmsoapmessenger.MessengerStub.SendSmsResponse;
import com.pmmsoapmessenger.MessengerStub.SoapUser;

import curam.citizen.socialrecord.impl.SocialRecordCase;
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
import curam.core.sl.entity.struct.ExtUserPasswordDetails;
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
import curam.participant.impl.ConcernRoleDAO;
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
	 * This method creates new citizen portal account for the concernRoleID.
	 * 
	 * @param concernRoleID
	 *            long
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void createNewAccount(long concernRoleID) throws AppException,
			InformationalException {

		curam.molsa.sms.sl.impl.MOLSASMSUtil smsUtilObj = new curam.molsa.sms.sl.impl.MOLSASMSUtil();
		String phoneNumber = new String();

		if (concernRoleID != 0L) {
			phoneNumber = smsUtilObj.getPersonPreferredPhoneNumber(String
					.valueOf(concernRoleID));
			if (!(phoneNumber.isEmpty())) {
				AlternateNameStruct nameDtls = getAlternateNameDetails(concernRoleID);
				MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
				String qid = participantHelper.returnConcernRoleAlternateID(
						concernRoleID, CONCERNROLEALTERNATEID.INSURANCENUMBER);
				ExternalUser externalUser = ExternalUserFactory.newInstance();

				NotFoundIndicator notFoundIndicatorObj = new NotFoundIndicator();
				ExternalUserKey externalUserSearch = new ExternalUserKey();
				externalUserSearch.userName = qid;
				ExternalUserDtls externalUserDetails = externalUser.read(
						notFoundIndicatorObj, externalUserSearch);
				if (notFoundIndicatorObj.isNotFound()) {
					ExternalUserDtls userDetails = getExternalUserDetails(
							nameDtls, concernRoleID);
					String password = userDetails.password;
					userDetails.password = getEncryptedPasswordValue(password);
					userDetails.userName = qid;
					externalUser.insert(userDetails);

					IntakeClient intakeClient = IntakeClientFactory
							.newInstance();
					IntakeClientDtls clientDtls = getIntakeClientDetails(userDetails);

					intakeClient.insert(clientDtls);

					CWExternalPartyLink externalPartyLink = CWExternalPartyLinkFactory
							.newInstance();

					CWExternalPartyLinkDtls linkDtls = getExternalPartyLinkDetails(
							concernRoleID, clientDtls);

					externalPartyLink.insert(linkDtls);

					System.out.println(password);
					sendSMS(password, phoneNumber);
				} else {
					throw new AppException(
							MOLSANOTIFICATION.UNIVERSALACCESS_ACCOUNT_EXISTS);
				}
			} else {
				throw new AppException(MOLSANOTIFICATION.PHONE_NUMBER_EMPTY);
			}
		}
	}

	/**
	 * This method is used to reset password.
	 * 
	 * @param passwordDtls
	 *            UserPasswordDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	public void resetPassword(UserPasswordDetails passwordDtls)
			throws AppException {
		String existingPassword = getEncryptedPasswordValue(passwordDtls.currentPassword);
		ExternalUser externalUser = ExternalUserFactory.newInstance();
		ExternalUserKey externalUserKey = new ExternalUserKey();
		String newPassword = new String();
		externalUserKey.userName = passwordDtls.userName;
		try {
			ExternalUserDtls externalUserDtls = externalUser
					.read(externalUserKey);
			if (existingPassword.equals(externalUserDtls.password)) {
				if (passwordDtls.confirmPassword
						.equals(passwordDtls.newPassword)) {
					newPassword = getEncryptedPasswordValue(passwordDtls.confirmPassword);
					System.out.println(newPassword);
					ExtUserPasswordDetails newPasswordDtls = new ExtUserPasswordDetails();
					newPasswordDtls.password = newPassword;
					externalUser.modifyPassword(externalUserKey,
							newPasswordDtls);
				} else {
					System.out
							.println("Confirm password doesnot match new password");
				}

			} else {
				System.out.println("current password invalid");
			}
		} catch (InformationalException e) {

			e.printStackTrace();
		}

	}

	/**
	 * This method gets the name details related to the concernRoleID.
	 * 
	 * @param concernRoleID
	 * @return
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
	 * This method populates the External user details struct values required to
	 * create a external user.
	 * 
	 * @param roleDtls
	 * @param concernRoleID
	 * @return
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
	 * This method is used to encrypt a string value.
	 * 
	 * @param password
	 * @return
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
	 * This method is used to get the Intake client details.
	 * 
	 * @param userDtls
	 * @return
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
	 * This method is used to get external party link details.
	 * 
	 * @param concernRoleID
	 * @param clientDtls
	 * @return
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
						GetSmsStatusResponse statusresponse = messenger
								.getSmsStatus(smsStatus);
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
		String phNumber = "";
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
