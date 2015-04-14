package curam.molsa.core.facade.impl;

import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.struct.ActionIDProperty;
import curam.core.facade.struct.ParticipantRegistrationWizardResult;
import curam.core.facade.struct.PersonSearchWizardKey;
import curam.core.facade.struct.RegisterPersonState;
import curam.core.facade.struct.RegisterPersonWizardSearchDetails;
import curam.core.fact.MaintainConcernRoleAltIDFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.MaintainConcernRoleAltID;
import curam.core.sl.struct.WizardStateID;
import curam.core.struct.AlternateIDDetails;
import curam.core.struct.MaintainConcernRoleAltIDKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.core.facade.struct.MOLSAPersonRegistrationDetails;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.wizardpersistence.impl.WizardPersistentState;

/**
 * The Class for participant Registration. This class is overridden from OOTB
 */
public abstract class MOLSAParticipantRegistrationDA extends
		curam.molsa.core.facade.base.MOLSAParticipantRegistrationDA {

	@Override
	/**
	 * Overrides {@link ParticipantRegistration.setRegisterPersonForPDCDetails()} method to insert the QID as Primary Alternate ID.
	 * 
	 * @param registrationDtls PersonRegistrationDetails
	 * @param stateID WizardStateID
	 * @param actionID ActionIDProperty
	 * @return The registration details
	 * @throws AppException
	 *           General Exception
	 * @throws InformationalException
	 *           General Exception
	 */
	public ParticipantRegistrationWizardResult setRegisterPersonForPDCDetails(
			MOLSAPersonRegistrationDetails molsaRegistrationDtls,
			WizardStateID stateID, ActionIDProperty actionID)
			throws AppException, InformationalException {

		PersonRegistrationDetails registrationDtls = molsaRegistrationDtls.dtls;
		if (!(registrationDtls.phoneNumber.isEmpty())) {
			if (!((registrationDtls.phoneNumber.length() == 8) && (registrationDtls.phoneNumber
					.matches("[0-9]+")))) {
				AppException e = new AppException(MOLSANOTIFICATION.PHONE_NO);
				throw e;
			}
		}
		ParticipantRegistrationWizardResult participantRegistrationWizardResult = super
				.setRegisterPersonForPDCDetails(registrationDtls, stateID,
						actionID);
		MaintainConcernRoleAltID maintainConcernRoleAltIDObj = MaintainConcernRoleAltIDFactory
				.newInstance();
		MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();
		maintainConcernRoleAltIDKey.concernRoleID = participantRegistrationWizardResult.registrationResult.concernRoleID;
		AlternateIDDetails alternateIDDetails = null;
		if (!molsaRegistrationDtls.qid.equals(CuramConst.gkEmpty)) {
			alternateIDDetails = new AlternateIDDetails();
			alternateIDDetails.concernRoleID = participantRegistrationWizardResult.registrationResult.concernRoleID;
			alternateIDDetails.typeCode = CONCERNROLEALTERNATEID.INSURANCENUMBER;
			alternateIDDetails.startDate = Date.getCurrentDate();
			alternateIDDetails.statusCode = RECORDSTATUS.NORMAL;
			alternateIDDetails.primaryAlternateInd = true;
			alternateIDDetails.alternateID = molsaRegistrationDtls.qid;
			maintainConcernRoleAltIDObj.createAlternateID(
					maintainConcernRoleAltIDKey, alternateIDDetails);
		}

		return participantRegistrationWizardResult;
	}

	/**
	 * Sets the register person details by given search wizard.
	 * 
	 * @param personSearchWizardKey
	 *            contains participant search key.
	 * @param wizardStateID
	 *            contains wizard state Id
	 * @param actionIDProperty
	 *            contains action Id property details
	 * 
	 * @return person wizard details
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 * @throws AppException
	 *             Generic Exception Signature.
	 */
	public RegisterPersonWizardSearchDetails setRegisterPersonSearchCriteriaDetails(
			final PersonSearchWizardKey personSearchWizardKey,
			final WizardStateID wizardStateID,
			final ActionIDProperty actionIDProperty) throws AppException,
			InformationalException {

		if (personSearchWizardKey.searchKey.referenceNumber.isEmpty()
				|| !personSearchWizardKey.searchKey.referenceNumber
						.matches("[0-9]+")
				|| MOLSAConstants.gkEleven != personSearchWizardKey.searchKey.referenceNumber
						.length()) {
			AppException e = new AppException(MOLSANOTIFICATION.QID_LENGTH);
			throw e;
		}
		WizardPersistentState wizardPersistentState = new WizardPersistentState();
		WizardStateID wizardStateIDObj = new WizardStateID();
		wizardStateIDObj.assign(wizardStateID);
		RegisterPersonWizardSearchDetails registerPersonWizardSearchResult = new RegisterPersonWizardSearchDetails();
		registerPersonWizardSearchResult.wizardStateID = wizardStateID;
		// check for the action button use has clicked
		if (CuramConst.kNextPageAction
				.equalsIgnoreCase(actionIDProperty.actionIDProperty)) {
			RegisterPersonState registerPersonState = (RegisterPersonState) wizardPersistentState
					.read(wizardStateID.wizardStateID);
			String qid = personSearchWizardKey.searchKey.referenceNumber;
			MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
			// get person details from MOI entity
			registerPersonState.registrationDtls = molsaParticipantHelper
					.getMOIDetailsByQID(qid);
			registerPersonState.searchKey = personSearchWizardKey;
			registerPersonState.searchKey.stateID = wizardStateID;
			wizardPersistentState.modify(wizardStateID.wizardStateID,
					registerPersonState);
		} else if (CuramConst.kSearchAction
				.equalsIgnoreCase(actionIDProperty.actionIDProperty)) {
			registerPersonWizardSearchResult.searchResult = searchPersonDetails(personSearchWizardKey);
		} else if (CuramConst.kResetAction
				.equalsIgnoreCase(actionIDProperty.actionIDProperty)) {
			RegisterPersonState registerPersonState = (RegisterPersonState) wizardPersistentState
					.read(wizardStateID.wizardStateID);
			registerPersonState.searchKey = new PersonSearchWizardKey();
			wizardPersistentState.modify(wizardStateID.wizardStateID,
					registerPersonState);
		}
		return registerPersonWizardSearchResult;
	}
}
