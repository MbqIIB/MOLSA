package curam.molsa.util.impl;

import java.util.ArrayList;

import curam.codetable.ALTERNATENAMESTATUS;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.GENDER;
import curam.codetable.RECORDSTATUS;
import curam.core.fact.AlternateNameFactory;
import curam.core.fact.ConcernRolePhoneNumberFactory;
import curam.core.fact.DatabasePersonSearchFactory;
import curam.core.fact.MaintainConcernRoleAltIDFactory;
import curam.core.fact.MaintainConcernRoleDetailsFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.ConcernRolePhoneNumber;
import curam.core.intf.DatabasePersonSearch;
import curam.core.intf.MaintainConcernRoleAltID;
import curam.core.intf.MaintainConcernRoleDetails;
import curam.core.sl.entity.fact.CaseParticipantRoleFactory;
import curam.core.sl.entity.intf.CaseParticipantRole;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.struct.CaseIDKey;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.AlternateIDRMDtls;
import curam.core.struct.AlternateNameDtls;
import curam.core.struct.AlternateNameReadByTypeKey;
import curam.core.struct.ConcernRolePhoneNumberDtls;
import curam.core.struct.ConcernRolePhoneNumberDtlsList;
import curam.core.struct.MaintainConcernRoleAltIDKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.core.struct.PersonSearchDetails;
import curam.core.struct.PersonSearchKey1;
import curam.core.struct.PersonSearchResult1;
import curam.core.struct.PhoneNumberDtls;
import curam.core.struct.PhoneNumberDtlsList;
import curam.core.struct.PhoneNumberKey;
import curam.core.struct.ReadConcernRoleDetails;
import curam.core.struct.ReadConcernRoleKey;
import curam.core.struct.ReadmultiByConcernRoleIDAltIDResult;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.molsa.moi.facade.fact.MOLSAMoiFactory;
import curam.molsa.moi.facade.intf.MOLSAMoi;
import curam.molsa.phonenumber.entity.fact.MOLSAPhoneNumberDAFactory;
import curam.molsa.phonenumber.entity.intf.MOLSAPhoneNumberDA;
import curam.molsa.phonenumber.entity.struct.MOLSAPhoneNumberDAKeyStruct1;
import curam.pdc.facade.struct.PDCEvidenceDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;

/**
 * 
 * The helper method for Participant.
 * 
 */
public class MOLSAParticipantHelper {

	/**
	 * Return the preferred Alternate ID of a ConcernRole.
	 * 
	 * @param concernRoleID
	 *            Long
	 * @return AlternateIDDetails AlternateIDRMDtls
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static AlternateIDRMDtls returnPreferredConcernRoleAlternateID(
			long concernRoleID) throws AppException, InformationalException {
		AlternateIDRMDtls returnAlternateIDRMDtls = null;
		MaintainConcernRoleAltID maintainConcernRoleAltIDObj = MaintainConcernRoleAltIDFactory
				.newInstance();
		MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();
		maintainConcernRoleAltIDKey.concernRoleID = concernRoleID;
		ReadmultiByConcernRoleIDAltIDResult readmultiByConcernRoleIDAltIDResult = maintainConcernRoleAltIDObj
				.readmultiByConcernRoleID(maintainConcernRoleAltIDKey);
		for (AlternateIDRMDtls alternateIDRMDtls : readmultiByConcernRoleIDAltIDResult.details.dtls
				.items()) {
			if (alternateIDRMDtls.statusCode.equals(RECORDSTATUS.NORMAL)
					&& alternateIDRMDtls.primaryInd) {
				returnAlternateIDRMDtls = alternateIDRMDtls;
			}
		}
		return returnAlternateIDRMDtls;
	}

	/**
	 * Return the active Alternate ID of a ConcernRole for a
	 * type.
	 * 
	 * @param concernRoleID
	 *            Long
	 * @param typeCode
	 *            String
	 * @return String
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static String returnConcernRoleAlternateID(long concernRoleID,
			String typeCode) throws AppException, InformationalException {
		String alternateID = CuramConst.gkEmpty;
		MaintainConcernRoleAltID maintainConcernRoleAltIDObj = MaintainConcernRoleAltIDFactory
				.newInstance();
		MaintainConcernRoleAltIDKey maintainConcernRoleAltIDKey = new MaintainConcernRoleAltIDKey();
		maintainConcernRoleAltIDKey.concernRoleID = concernRoleID;
		ReadmultiByConcernRoleIDAltIDResult readmultiByConcernRoleIDAltIDResult = maintainConcernRoleAltIDObj
				.readmultiByConcernRoleID(maintainConcernRoleAltIDKey);
		for (AlternateIDRMDtls alternateIDRMDtls : readmultiByConcernRoleIDAltIDResult.details.dtls
				.items()) {
			if (alternateIDRMDtls.typeCode.equals(typeCode)
					&& alternateIDRMDtls.statusCode.equals(RECORDSTATUS.NORMAL)) {
				alternateID = alternateIDRMDtls.alternateID;
			}
		}
		return alternateID;
	}

	/**
	 * Return the Participant details from MOI table
	 * 
	 * @param QID
	 * @return PersonRegistrationDetails
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static PersonRegistrationDetails getMOIDetailsByQID(String qid)
			throws AppException, InformationalException {
		MOLSAMoi moiObj = MOLSAMoiFactory.newInstance();
		MOLSAMoiKey moiKey = new MOLSAMoiKey();
		moiKey.qid = qid;
		// get moi details from MOI entity based in QID
		MOLSAMoiDtls moiDtls = moiObj.getMoiDetails(moiKey);
		PersonRegistrationDetails personRegistrationDetails = new PersonRegistrationDetails();
		personRegistrationDetails.firstForename = moiDtls.firstName_ar;
		// append the second ,third and fourth name in middlename.

		if (!moiDtls.secondName_ar.isEmpty()) {
			personRegistrationDetails.otherForename = moiDtls.secondName_ar
					+ " ";
		}

		if (!moiDtls.thirdName_ar.isEmpty()) {
			personRegistrationDetails.otherForename = personRegistrationDetails.otherForename
					+ moiDtls.thirdName_ar + " ";
		}

		if (!moiDtls.fourthName_ar.isEmpty()) {
			personRegistrationDetails.otherForename = personRegistrationDetails.otherForename
					+ moiDtls.fourthName_ar + " ";
		}

		personRegistrationDetails.surname = moiDtls.fifthName_ar;
		personRegistrationDetails.dateOfBirth = moiDtls.dateOfBirth;
		if (moiDtls.statusCode == 1) {
			personRegistrationDetails.dateOfDeath = moiDtls.statusDate;
		}
		personRegistrationDetails.registrationDate = Date.getCurrentDate();
		if (moiDtls.sexCode == 1) {
			personRegistrationDetails.sex = GENDER.MALE;
		} else if (moiDtls.sexCode == 2) {
			personRegistrationDetails.sex = GENDER.FEMALE;
		}
		return personRegistrationDetails;
	}

	/**
	 * Return the concernrole name in the default locale
	 * 
	 * @param concernRoleID
	 *            Long
	 * @return String
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static String returnConcernRoleName(long concernRoleID)
			throws AppException, InformationalException {
		ReadConcernRoleKey readConcernRoleKey = new ReadConcernRoleKey();
		readConcernRoleKey.concernRoleID = concernRoleID;
		MaintainConcernRoleDetails maintainConcernRoleDetailsObj = MaintainConcernRoleDetailsFactory
				.newInstance();
		ReadConcernRoleDetails readConcernRoleDetails = maintainConcernRoleDetailsObj
				.readConcernRole(readConcernRoleKey);
		return readConcernRoleDetails.concernRoleName;
	}
	
  /**
   * Return the concernrole ID .
   * 
   * @param caseParticipantRoleID
   *          Long
   * @return String
   * @throws InformationalException
   *           General Exception
   * @throws AppException
   *           General Exception
   */
  public static long returnConcernRoleIDFromCaseParticipantRoleID(long caseParticipantRoleID) throws AppException, InformationalException {
    CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory.newInstance();
    CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();
    caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;
    CaseParticipantRoleDtls caseParticipantRoleDtls = caseParticipantRoleObj.read(caseParticipantRoleKey);
    return caseParticipantRoleDtls.participantRoleID;
  }
  
  /**
   * Return the concernrole name in the default locale
   * 
   * @param caseParticipantRoleID
   *          Long
   * @return String
   * @throws InformationalException
   *           General Exception
   * @throws AppException
   *           General Exception
   */
  public static String returnConcernRoleNameFromCaseParticipantRoleID(long caseParticipantRoleID) throws AppException, InformationalException {
    CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory.newInstance();
    CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();
    caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;
    CaseParticipantRoleDtls caseParticipantRoleDtls = caseParticipantRoleObj.read(caseParticipantRoleKey);
    return returnConcernRoleName(caseParticipantRoleDtls.participantRoleID);
  }

  
	/**
	 * Return the concernrole name in the mentioned name type.
	 * 
	 * @param concernRoleID
	 *            Long
	 * @param nameType
	 *            String
	 * @return Name in English
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static String returnAlternateName(long concernRoleID, String nameType)
			throws AppException, InformationalException {
		String concernRoleName = CuramConst.gkEmpty;
		
		AlternateNameReadByTypeKey alternateNameReadByTypeKey = new AlternateNameReadByTypeKey();
		alternateNameReadByTypeKey.concernRoleID = concernRoleID;
		alternateNameReadByTypeKey.nameType = nameType;
		alternateNameReadByTypeKey.nameStatus = RECORDSTATUS.NORMAL;
		NotFoundIndicator notFoundIndicator = new NotFoundIndicator();
		curam.core.intf.AlternateName alternateNameObj = AlternateNameFactory
				.newInstance();
		AlternateNameDtls alternateNameDtls = alternateNameObj.readByType(
				notFoundIndicator, alternateNameReadByTypeKey);
		
		AlternateIDRMDtls alternateIDRMDtls = returnPreferredConcernRoleAlternateID(concernRoleID);
		curam.molsa.moi.entity.intf.MOLSAMoi moiObj = curam.molsa.moi.entity.fact.MOLSAMoiFactory.newInstance();
		curam.molsa.moi.entity.struct.MOLSAMoiKey moiKey = new curam.molsa.moi.entity.struct.MOLSAMoiKey();
		moiKey.qid = alternateIDRMDtls.alternateID;
		NotFoundIndicator moiNotFoundIndicator = new NotFoundIndicator();
		// get moi details from MOI entity based in QID
		MOLSAMoiDtls moiDtls = moiObj.read(notFoundIndicator,moiKey);
		
		if (!moiNotFoundIndicator.isNotFound()) {
			concernRoleName = moiDtls.fullName_ar;
		} else if (!notFoundIndicator.isNotFound()) {
			concernRoleName = alternateNameDtls.fullName;
		} else {
			concernRoleName = returnConcernRoleName(concernRoleID);
		}
		return concernRoleName;
	}

	/**
	 * Return the ConcernRole details with respect to a phone number.
	 * This can result in duplicate concern result. The calling method need to
	 * filter out. the duplicate result. The helper method is given in this
	 * helper class - removeDuplicateFromPerson
	 * 
	 * @param phoneNumber
	 *            Long
	 * @return PersonSearchResult1 PersonSearchResult1
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static PersonSearchResult1 searchConcernByPhoneNumber(
			String phoneNumber) throws AppException, InformationalException {
		PersonSearchResult1 personSearchResult1 = new PersonSearchResult1();

		MOLSAPhoneNumberDA phoneNumberObj = MOLSAPhoneNumberDAFactory
				.newInstance();
		MOLSAPhoneNumberDAKeyStruct1 phoneNumberDAKeyStruct1 = new MOLSAPhoneNumberDAKeyStruct1();
		phoneNumberDAKeyStruct1.phoneNumber = phoneNumber;
		ConcernRolePhoneNumber concernRolePhoneNumberObj = ConcernRolePhoneNumberFactory
				.newInstance();
		DatabasePersonSearch personSearchObj = DatabasePersonSearchFactory
				.newInstance();
		PersonSearchKey1 personSearchKey1 = new PersonSearchKey1();
		PersonSearchResult1 personSearchResult;
		PhoneNumberKey phoneNumberKey = new PhoneNumberKey();
		ConcernRolePhoneNumberDtlsList concernRolePhoneNumberDtlsList = null;
		PhoneNumberDtlsList phoneNumberDtlsList = phoneNumberObj
				.searchByPhoneNumber(phoneNumberDAKeyStruct1);
		for (PhoneNumberDtls phoneNumberDtls : phoneNumberDtlsList.dtls.items()) {
			if (phoneNumberDtls.statusCode.equals(RECORDSTATUS.NORMAL)) {
				phoneNumberKey.phoneNumberID = phoneNumberDtls.phoneNumberID;
				concernRolePhoneNumberDtlsList = concernRolePhoneNumberObj
						.searchByPhoneNumber(phoneNumberKey);

				for (ConcernRolePhoneNumberDtls concernRolePhoneNumberDtls : concernRolePhoneNumberDtlsList.dtls
						.items()) {
					personSearchKey1.referenceNumber = returnConcernRoleAlternateID(
							concernRolePhoneNumberDtls.concernRoleID,
							CONCERNROLEALTERNATEID.INSURANCENUMBER);
					personSearchResult = personSearchObj
							.search1(personSearchKey1);
					personSearchResult1.dtlsList
							.addAll(personSearchResult.dtlsList);
				}

			}
		}

		return removeDuplicateFromPhoneNumberSearch(personSearchResult1);
	}

	/**
	 *Remove the Duplicate from the input parameter.
	 * 
	 * @param personSearchResult1
	 *            PersonSearchResult1
	 * @return PersonSearchResult1 PersonSearchResult1
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static PersonSearchResult1 removeDuplicateFromPhoneNumberSearch(
			PersonSearchResult1 personSearchResult1) throws AppException,
			InformationalException {
		PersonSearchResult1 outPersonSearchResult = new PersonSearchResult1();
		ArrayList<Long> concernRoleIDs = new ArrayList<Long>();
		for (PersonSearchDetails personSearchDetails : personSearchResult1.dtlsList
				.items()) {
			if (!concernRoleIDs.contains(personSearchDetails.concernRoleID)) {
				outPersonSearchResult.dtlsList.addRef(personSearchDetails);
			}
			concernRoleIDs.add(personSearchDetails.concernRoleID);
		}

		return outPersonSearchResult;
	}

	/**
	 * Remove the Duplicate concenrnrole's by comparing the 2 lists.
	 * 
	 * @param personSearchResult1
	 *            PersonSearchResult1
	 * @param phonePersonSearchResult1
	 *            PersonSearchResult1
	 * @return PersonSearchResult1 PersonSearchResult1
	 * @throws InformationalException
	 *             General Exception
	 * @throws AppException
	 *             General Exception
	 */
	public static PersonSearchResult1 removeDuplicateFromPhoneNumberSearch(
			PersonSearchResult1 personSearchResult1,
			PersonSearchResult1 phonePersonSearchResult1) throws AppException,
			InformationalException {
		PersonSearchResult1 outPersonSearchResult = new PersonSearchResult1();
		ArrayList<Long> concernRoleIDs = new ArrayList<Long>();
		for (PersonSearchDetails personSearchDetails : personSearchResult1.dtlsList
				.items()) {
			concernRoleIDs.add(personSearchDetails.concernRoleID);
		}

		for (PersonSearchDetails personSearchDetails : phonePersonSearchResult1.dtlsList
				.items()) {
			if (!concernRoleIDs.contains(personSearchDetails.concernRoleID)) {
				outPersonSearchResult.dtlsList.addRef(personSearchDetails);
			}
			concernRoleIDs.add(personSearchDetails.concernRoleID);
		}

		return outPersonSearchResult;
	}
	
	
	
	 /**
   * Reads the dynamic evidence details for a PDC evidence.
   * 
   * @param pdcEvidenceDetails
   *          The PDC evidence details.
   * 
   * @return The dynamic evidence details.
   */
  @SuppressWarnings("restriction")
  public static DynamicEvidenceDataDetails getDynamicEvidenceDataDetails(
      final PDCEvidenceDetails pdcEvidenceDetails) throws AppException,
      InformationalException {

    final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
    evidenceTypeKey.evidenceType = pdcEvidenceDetails.evidenceType;

    final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
        .instance(evidenceTypeKey, Date.getCurrentDate());

    final EvidenceKey evidenceKey = new EvidenceKey();
    evidenceKey.evidenceID = pdcEvidenceDetails.evidenceID;
    evidenceKey.evType = pdcEvidenceDetails.evidenceType;

    final CaseIDKey caseIDKey = new CaseIDKey();
    caseIDKey.caseID = pdcEvidenceDetails.caseID;

    final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
    evidenceCaseKey.caseIDKey = caseIDKey;
    evidenceCaseKey.evidenceKey = evidenceKey;

    final ReadEvidenceDetails readEvidenceDetails = evidenceServiceInterface
        .readEvidence(evidenceCaseKey);

    final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readEvidenceDetails.dtls;

    return dynamicEvidenceDataDetails;
  }

}
