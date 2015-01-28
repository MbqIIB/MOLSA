package curam.molsa.evidence.impl;

import com.google.inject.Inject;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.RECORDSTATUS;
import curam.codetable.RELATIONSHIPRECIPTYPE;
import curam.codetable.RELATIONSHIPTYPECODE;
import curam.core.fact.ConcernRoleFactory;
import curam.core.fact.ProspectPersonFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.ConcernRole;
import curam.core.intf.ProspectPerson;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.CaseParticipantRoleNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.impl.ReciprocalEvidenceConversion;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseIDTypeAndStatusKey;
import curam.core.sl.struct.CaseParticipantRoleDetails;
import curam.core.sl.struct.CaseParticipantRoleIDAndNameDtlsList;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.ConcernRoleDtls;
import curam.core.struct.ConcernRoleKey;
import curam.core.struct.PersonKey;
import curam.core.struct.ProspectPersonAltNameDetails;
import curam.core.struct.ProspectPersonKey;
import curam.core.struct.ReadGenderDetails;
import curam.core.struct.ReadProspectPersonGenderDetails;
import curam.creole.value.CodeTableItem;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.dynamicevidence.impl.DynamicEvidenceDataAttributeDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.sl.util.fact.EvidenceUtilityFactory;
import curam.dynamicevidence.sl.util.intf.EvidenceUtility;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSABPOHHOLDRELATIONSHIP;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;

/**
 * Has the custom code to perform reciprocal evidence conversion operations.
 */
public class MOLSAHouseholdRelationshipReciprocalConversion implements
		ReciprocalEvidenceConversion {

	// Evidence attribute names.
	static final String kCaseParticipantAttr = "participant";
	static final String kRelatedCaseParticipantAttr = "relatedParticipant";
	static final String kStartDateAttr = "startDate";
	static final String kEndDateAttr = "endDate";
	static final String kRelationshipTypeAttr = "relationshipType";
	static final String kCommentsAttr = "comments";

	@Inject
	private EvidenceTypeDefDAO etDefDAO;

	@Inject
	private EvidenceTypeVersionDefDAO etVerDefDAO;

	// no-arg constructor for use only by Guice
	public MOLSAHouseholdRelationshipReciprocalConversion() {
	}

	/**
	 * Creates reciprocal evidence details from the original evidence details.
	 * This method will create case participants on the target case if needed.
	 * 
	 * @param original
	 *            Object form of original Evidence.
	 * @param targetCaseID
	 *            ID of the target case.
	 * @return Object form of reciprocal evidence.
	 * @throws AppException
	 * @throws InformationalException
	 */
	public Object getReciprocal(final Object original, final long targetCaseID)
			throws AppException, InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetailsOriginal = (DynamicEvidenceDataDetails) original;

		// Create Dynamic Evidence Data Details for the new reciprocal evidence.
		final EvidenceTypeKey eType = new EvidenceTypeKey();

		eType.evidenceType = CASEEVIDENCE.HOUSEHOLDRELATIONSHIP;

		final curam.dynamicevidence.definition.impl.EvidenceTypeDef evidenceType = etDefDAO
				.readActiveEvidenceTypeDefByTypeCode(eType.evidenceType);

		curam.dynamicevidence.definition.impl.EvidenceTypeVersionDef evTypeVersion = etVerDefDAO
				.getActiveEvidenceTypeVersionAtDate(evidenceType,
						Date.getCurrentDate());

		DynamicEvidenceDataDetails dynamicEvidenceDataDetailsReciprocal = DynamicEvidenceDataDetailsFactory
				.newInstance(evTypeVersion);

		// Update new reciprocal details from original details.
		return updateNewReciprocalDetailsFromOriginal(
				dynamicEvidenceDataDetailsOriginal,
				dynamicEvidenceDataDetailsReciprocal, targetCaseID);

	}

	/**
	 * Creates modified reciprocal evidence details from the original and
	 * unmodified reciprocal evidence details.
	 * 
	 * @param original
	 *            Object form of original Evidence.
	 * @param unmodifiedReciprocal
	 *            Object form of unmodified reciprocal Evidence.
	 * @return Object form of updated reciprocal evidence.
	 * @throws AppException
	 * @throws InformationalException
	 */
	public Object getUpdatedReciprocal(final Object original,
			final Object unmodifiedReciprocal) throws AppException,
			InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetailsOriginal = (DynamicEvidenceDataDetails) original;
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetailsReciprocal = (DynamicEvidenceDataDetails) unmodifiedReciprocal;

		// Update reciprocal details from original details.
		return updateReciprocalDetailsFromOriginal(
				dynamicEvidenceDataDetailsOriginal,
				dynamicEvidenceDataDetailsReciprocal);

	}

	/**
	 * Retrieves primary participant from the original evidence.
	 * 
	 * @param originalEvidence
	 *            Object form of original Evidence.
	 * @return ID of primary participant.
	 * @throws AppException
	 * @throws InformationalException
	 */
	public long getPrimaryParticipant(final Object originalEvidence)
			throws AppException, InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetailsOriginal = (DynamicEvidenceDataDetails) originalEvidence;

		return getParticipantID(dynamicEvidenceDataDetailsOriginal,
				kCaseParticipantAttr);

	}

	/**
	 * Retrieves related participant from the original evidence.
	 * 
	 * @param originalEvidence
	 *            Object form of original Evidence.
	 * @return ID of related participant.
	 * @throws AppException
	 * @throws InformationalException
	 */
	public long getRelatedParticipant(final Object originalEvidence)
			throws AppException, InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetailsOriginal = (DynamicEvidenceDataDetails) originalEvidence;

		return getParticipantID(dynamicEvidenceDataDetailsOriginal,
				kRelatedCaseParticipantAttr);

	}

	/**
	 * Matches evidence details. Returns true if the evidence details match.
	 * 
	 * @param evidenceDetails1
	 *            First evidence details in the object form.
	 * @param evidenceDetails2
	 *            Second evidence details in the object form.
	 * 
	 * @return true if evidence details match
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	public boolean matchEvidenceDetails(final Object evidenceDetails1,
			final Object evidenceDetails2) throws AppException,
			InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails1 = (DynamicEvidenceDataDetails) evidenceDetails1;
		final DynamicEvidenceDataDetails dynamicEvidenceDataDetails2 = (DynamicEvidenceDataDetails) evidenceDetails2;

		final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.fact.CaseParticipantRoleFactory
				.newInstance();
		final CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataDetails1
						.getAttribute(kCaseParticipantAttr));

		final Long concernRoleID1 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataDetails1
						.getAttribute(kRelatedCaseParticipantAttr));

		final Long relConcernRoleID1 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;
		if (dynamicEvidenceDataDetails2.getAttribute(kCaseParticipantAttr) == null) {
			return false;
		} else {

			caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
					.convert(dynamicEvidenceDataDetails2
							.getAttribute(kCaseParticipantAttr));

			final Long concernRoleID2 = caseParticipantRoleObj
					.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

			caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
					.convert(dynamicEvidenceDataDetails2
							.getAttribute(kRelatedCaseParticipantAttr));

			final Long relConcernRoleID2 = caseParticipantRoleObj
					.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

			return dynamicEvidenceDataDetails1
					.getAttribute(kRelationshipTypeAttr)
					.getValue()
					.equals(dynamicEvidenceDataDetails2.getAttribute(
							kRelationshipTypeAttr).getValue())
					&& (concernRoleID1.longValue() == concernRoleID2
							.longValue())
					&& (relConcernRoleID1.longValue() == relConcernRoleID2
							.longValue());
		}

	}

	/**
	 * Matches original and reciprocal evidence details. Returns true if
	 * original evidence details matching reciprocal evidence details.
	 * 
	 * @param originalEvidence
	 *            Original evidence details in the object form.
	 * @param reciprocalEvidence
	 *            Reciprocal evidence details in the object form.
	 * 
	 * @return true if evidence details match
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	public boolean matchOriginalAndReciprocal(final Object originalEvidence,
			final Object reciprocalEvidence) throws AppException,
			InformationalException {

		final DynamicEvidenceDataDetails dynamicEvidenceDataOriginal = (DynamicEvidenceDataDetails) originalEvidence;
		final DynamicEvidenceDataDetails dynamicEvidenceDataReciprocal = (DynamicEvidenceDataDetails) reciprocalEvidence;

		final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.fact.CaseParticipantRoleFactory
				.newInstance();
		final CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataOriginal
						.getAttribute(kCaseParticipantAttr));

		final Long concernRoleID1 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataOriginal
						.getAttribute(kRelatedCaseParticipantAttr));

		final Long relConcernRoleID1 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataReciprocal
						.getAttribute(kCaseParticipantAttr));

		final Long concernRoleID2 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

		caseParticipantRoleKey.caseParticipantRoleID = (Long) DynamicEvidenceTypeConverter
				.convert(dynamicEvidenceDataReciprocal
						.getAttribute(kRelatedCaseParticipantAttr));

		final Long relConcernRoleID2 = caseParticipantRoleObj
				.readCaseIDandParticipantID(caseParticipantRoleKey).participantRoleID;

		final String originalRelationshipType = dynamicEvidenceDataOriginal
				.getAttribute(kRelationshipTypeAttr).getValue();

		// Get Concern Role type.
		final ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
		final ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		concernRoleKey.concernRoleID = concernRoleID1;

		// Do comparison.
		return (concernRoleID1.longValue() == relConcernRoleID2.longValue())
				&& (relConcernRoleID1.longValue() == concernRoleID2.longValue());

	}

	/**
	 * Updates reciprocal Relationships evidence details using original details.
	 * Returns updated details.
	 * 
	 * @param originalDetails
	 *            Original Relationships evidence details.
	 * @param reciprocalDetails
	 *            Reciprocal Relationships evidence details.
	 * @return Updated reciprocal Relationships evidence details.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected DynamicEvidenceDataDetails updateReciprocalDetailsFromOriginal(
			final DynamicEvidenceDataDetails originalDetails,
			final DynamicEvidenceDataDetails reciprocalDetails)
			throws AppException, InformationalException {

		// Get reciprocal evidence details that will not change
		final long caseParticipantRoleIDRec = Long.parseLong(reciprocalDetails
				.getAttribute(kCaseParticipantAttr).getValue());
		final long relCaseParticipantRoleIDRec = Long
				.parseLong(reciprocalDetails.getAttribute(
						kRelatedCaseParticipantAttr).getValue());
		long relParticipantRoleID = getParticipantID(originalDetails,
				kRelatedCaseParticipantAttr);

		String relationshipTypeRec = determineRelatedPersonsRelationshipType(
				originalDetails.getAttribute(kRelationshipTypeAttr).getValue(),
				relParticipantRoleID, false);

		// Assign all attributes from original details to reciprocal details.
		for (final DynamicEvidenceDataAttributeDetails listDetails : originalDetails
				.getAttributes()) {
			reciprocalDetails.getAttribute(listDetails.getName()).setValue(
					listDetails.getValue());
		}

		// Set reciprocal evidence attributes.
		DynamicEvidenceDataAttributeDetails relationshipTypeAttrRec = reciprocalDetails
				.getAttribute(kRelationshipTypeAttr);

		DynamicEvidenceTypeConverter.setAttribute(relationshipTypeAttrRec,
				new CodeTableItem(RELATIONSHIPTYPECODE.TABLENAME,
						relationshipTypeRec));

		DynamicEvidenceDataAttributeDetails participantAttrRec = reciprocalDetails
				.getAttribute(kCaseParticipantAttr);

		DynamicEvidenceTypeConverter.setAttribute(participantAttrRec,
				caseParticipantRoleIDRec);

		DynamicEvidenceDataAttributeDetails relatedParticipantAttrRec = reciprocalDetails
				.getAttribute(kRelatedCaseParticipantAttr);

		DynamicEvidenceTypeConverter.setAttribute(relatedParticipantAttrRec,
				relCaseParticipantRoleIDRec);

		return reciprocalDetails;

	}

	/**
	 * Updates reciprocal Relationships evidence details using original details.
	 * Returns updated details.
	 * 
	 * @param originalDetails
	 *            Original Relationships evidence details.
	 * @param reciprocalDetails
	 *            Reciprocal Relationships evidence details.
	 * @param targetCaseID
	 *            ID of the target case.
	 * @return Updated reciprocal Relationships evidence details.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected DynamicEvidenceDataDetails updateNewReciprocalDetailsFromOriginal(
			final DynamicEvidenceDataDetails originalDetails,
			final DynamicEvidenceDataDetails reciprocalDetails,
			final long targetCaseID) throws AppException,
			InformationalException {

		long relParticipantRoleID = getParticipantID(originalDetails,
				kRelatedCaseParticipantAttr);

		String relRelationshipType = determineRelatedPersonsRelationshipType(
				originalDetails.getAttribute(kRelationshipTypeAttr).getValue(),
				relParticipantRoleID, false);

		// Reciprocal evidence 'primary participant' is 'related participant' on
		// the original evidence
		// and reciprocal evidence 'related participant' is 'primary
		// participant' on the original evidence.
		final long participantIDRec = getRelatedParticipant(originalDetails);
		final long relParticipantIDRec = getPrimaryParticipant(originalDetails);

		// Primary participant on the Relationships evidence should already
		// have case participant role on the case which will be either
		// PRIMARY or MEMBER.
		long caseParticipantRoleIDRec = getCaseParticipantRoleID(targetCaseID,
				participantIDRec, CASEPARTICIPANTROLETYPE.PRIMARY);

		if (0 == caseParticipantRoleIDRec) {
			caseParticipantRoleIDRec = getCaseParticipantRoleID(targetCaseID,
					participantIDRec, CASEPARTICIPANTROLETYPE.MEMBER);
		}

		// Related participant must have case participant role of RELATEDPERSON.
		// If it does not have it, then this case participant role must be
		// created.
		long caseParticipantRoleIDRelatedRec = getCaseParticipantRoleID(
				targetCaseID, relParticipantIDRec,
				CASEPARTICIPANTROLETYPE.MEMBER);

		if (0 == caseParticipantRoleIDRelatedRec) {

			final curam.core.sl.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.fact.CaseParticipantRoleFactory
					.newInstance();

			final CaseParticipantRoleDetails caseParticipantRoleDetails = new CaseParticipantRoleDetails();

			caseParticipantRoleDetails.dtls.caseID = targetCaseID;
			caseParticipantRoleDetails.dtls.fromDate = Date.getCurrentDate();
			caseParticipantRoleDetails.dtls.participantRoleID = relParticipantIDRec;
			caseParticipantRoleDetails.dtls.recordStatus = RECORDSTATUS.NORMAL;
			caseParticipantRoleDetails.dtls.toDate = Date.kZeroDate;
			caseParticipantRoleDetails.dtls.typeCode = CASEPARTICIPANTROLETYPE.MEMBER;

			caseParticipantRoleObj
					.insertCaseParticipantRole(caseParticipantRoleDetails);

			caseParticipantRoleIDRelatedRec = caseParticipantRoleDetails.dtls.caseParticipantRoleID;

		}

		// Assign all attributes from original details to reciprocal details.
		for (final DynamicEvidenceDataAttributeDetails listDetails : originalDetails
				.getAttributes()) {
			reciprocalDetails.getAttribute(listDetails.getName()).setValue(
					listDetails.getValue());
		}

		// Set reciprocal evidence attributes.
		DynamicEvidenceDataAttributeDetails relationshipTypeAttrRec = reciprocalDetails
				.getAttribute(kRelationshipTypeAttr);

		DynamicEvidenceTypeConverter.setAttribute(relationshipTypeAttrRec,
				new CodeTableItem(RELATIONSHIPTYPECODE.TABLENAME,
						relRelationshipType));

		DynamicEvidenceDataAttributeDetails participantAttrRec = reciprocalDetails
				.getAttribute(kCaseParticipantAttr);

		DynamicEvidenceTypeConverter.setAttribute(participantAttrRec,
				caseParticipantRoleIDRec);

		DynamicEvidenceDataAttributeDetails relatedParticipantAttrRec = reciprocalDetails
				.getAttribute(kRelatedCaseParticipantAttr);

		DynamicEvidenceTypeConverter.setAttribute(relatedParticipantAttrRec,
				caseParticipantRoleIDRelatedRec);

		return reciprocalDetails;

	}

	/**
	 * Determines related person's relationship type based on person's gender
	 * and relating person's relationship type
	 * 
	 * @param relatingRelationshipType
	 *            Contains relating person's relationship type.
	 * @param relParticipantRoleID
	 *            Contains related person's participant role ID.
	 * @param reversedInd
	 *            Indicates is relatingRelationshipType passed in already
	 *            reversed.
	 * 
	 * @return Relationship type of the related person.
	 */
	protected String determineRelatedPersonsRelationshipType(
			String relatingRelationshipType, long relParticipantRoleID,
			boolean reversedInd) throws AppException, InformationalException {

		// Return value
		String relationshipType = new String();

		ReadGenderDetails readGenderDetails = new ReadGenderDetails();
		boolean relatedPersonISMale = false;

		ConcernRole concernRoleObj = ConcernRoleFactory.newInstance();
		ConcernRoleKey concernRoleKey = new ConcernRoleKey();

		concernRoleKey.concernRoleID = relParticipantRoleID;
		ConcernRoleDtls concernRoleDtls = concernRoleObj.read(concernRoleKey);

		if (concernRoleDtls.concernRoleType
				.equals(curam.codetable.CONCERNROLETYPE.PROSPECTPERSON)) {

			ProspectPerson prospectPersonObj = ProspectPersonFactory
					.newInstance();
			ProspectPersonKey prospectPersonKey = new ProspectPersonKey();

			prospectPersonKey.concernRoleID = relParticipantRoleID;
			ReadProspectPersonGenderDetails readProspectPersonGenderDetails = prospectPersonObj
					.readProspectPersonGender(prospectPersonKey);

			readGenderDetails.gender = readProspectPersonGenderDetails.gender;

			ProspectPersonAltNameDetails prospectPersonAltNameDetails = prospectPersonObj
					.readProspectPersonAltName(prospectPersonKey);

			if (readGenderDetails.gender.equals("")) {

				// Informational Manager
				InformationalManager informationalManager = TransactionInfo
						.getInformationalManager();

				AppException appException = new AppException(
						MOLSABPOHHOLDRELATIONSHIP.ERR_HHOLDRELATIONSHIP_FV_RELATIONSHIP_CANNOT_BE_CREATED);

				appException.arg(prospectPersonAltNameDetails.firstForename
						+ CuramConst.gkSpace
						+ prospectPersonAltNameDetails.surname);

				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								appException,
								MOLSAConstants.kEmptyString,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetFour,
								0);
				// Check for errors, not warnings.
				// Invokes informationalManager.failOperation() on errors.
				EvidenceUtility evidenceUtilityObj = EvidenceUtilityFactory
						.newInstance();

				evidenceUtilityObj.checkForInformationals();
			}

		} else if (concernRoleDtls.concernRoleType
				.equals(curam.codetable.CONCERNROLETYPE.PERSON)) {

			// Read the gender details
			curam.core.intf.Person personObj = curam.core.fact.PersonFactory
					.newInstance();
			PersonKey personKey = new PersonKey();

			personKey.concernRoleID = relParticipantRoleID;
			readGenderDetails = personObj.readGender(personKey);

		}

		relationshipType = CodeTable.getOneItem(
				RELATIONSHIPRECIPTYPE.TABLENAME, relatingRelationshipType,
				TransactionInfo.getProgramLocale());

		if (readGenderDetails.gender.equals(curam.codetable.GENDER.MALE)) {
			relatedPersonISMale = true;
		}

		//
		// Handle gender specific relationships
		//
		if (relatingRelationshipType
				.equals(curam.codetable.RELATIONSHIPTYPECODE.NEPHEW)
				|| relatingRelationshipType
						.equals(curam.codetable.RELATIONSHIPTYPECODE.NIECE)) {

			if (relatedPersonISMale) {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.UNCLE;
			} else {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.AUNT;
			}

		}

		if (relatingRelationshipType
				.equals(curam.codetable.RELATIONSHIPTYPECODE.UNCLE)
				|| relatingRelationshipType
						.equals(curam.codetable.RELATIONSHIPTYPECODE.AUNT)) {

			if (relatedPersonISMale) {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.NEPHEW;
			} else {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.NIECE;
			}

		}

		if (relatingRelationshipType
				.equals(curam.codetable.RELATIONSHIPTYPECODE.NEPHEW)
				|| relatingRelationshipType
						.equals(curam.codetable.RELATIONSHIPTYPECODE.NIECE)) {

			if (relatedPersonISMale) {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.GREATUNCLE;
			} else {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.GREATAUNT;
			}

		}

		if (relatingRelationshipType
				.equals(curam.codetable.RELATIONSHIPTYPECODE.GREATUNCLE)
				|| relatingRelationshipType
						.equals(curam.codetable.RELATIONSHIPTYPECODE.GREATAUNT)) {

			if (relatedPersonISMale) {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.GREATNEPHEW;
			} else {
				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.GREATNIECE;
			}

			if (relatingRelationshipType
					.equals(curam.codetable.RELATIONSHIPTYPECODE.SISTERWIFE)) {

				relationshipType = curam.codetable.RELATIONSHIPTYPECODE.SISTERWIFE;
			}

		}

		// if relationship type is not set yet,
		// then it must be retrieved from reciprocal relationship code-table
		// or used directly (if it is passed in already reversed).
		if (relationshipType.equals("")) {

			if (reversedInd) {

				relationshipType = relatingRelationshipType;

			} else {

				String relType = CodeTable.getOneItem(
						RELATIONSHIPTYPECODE.TABLENAME,
						RELATIONSHIPTYPECODE.UNRELATED);

				if (relType != null) {

					relationshipType = relType;

				}

			}

		}

		return relationshipType;

	}

	/**
	 * Retrieves participant ID from the original Relationships evidence for the
	 * case participant role attribute name specified.
	 * 
	 * @param originalEvidence
	 *            Original Relationships evidence details.
	 * @param caseParticipantAttributeName
	 *            Case participant attribute name.
	 * @return concern role ID of the case participant specified.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected long getParticipantID(
			final DynamicEvidenceDataDetails originalEvidence,
			final String caseParticipantAttributeName) throws AppException,
			InformationalException {

		final long caseParticipantRoleID = Long.parseLong(originalEvidence
				.getAttribute(caseParticipantAttributeName).getValue());

		final curam.core.sl.entity.intf.CaseParticipantRole caseParticipantRoleObj = curam.core.sl.entity.fact.CaseParticipantRoleFactory
				.newInstance();
		final CaseParticipantRoleKey caseParticipantRoleKey = new CaseParticipantRoleKey();

		caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;

		final CaseParticipantRoleDtls caseParticipantRoleDtls = caseParticipantRoleObj
				.read(caseParticipantRoleKey);

		return caseParticipantRoleDtls.participantRoleID;

	}

	/**
	 * Retrieves case participant ID from the original Relationships evidence
	 * for the case participant role id specified.
	 * 
	 * @param caseID
	 *            Case id.
	 * @param concernRoleID
	 *            Participant Role id.
	 * @param caseParticipantRoleType
	 *            Case Participant Role Type.
	 * @return caseParticipantRoleID Case Participant Role ID.
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	protected long getCaseParticipantRoleID(final long caseID,
			final long concernRoleID, final String caseParticipantRoleType)
			throws AppException, InformationalException {

		final CaseParticipantRole caseParticipantRoleObj = CaseParticipantRoleFactory
				.newInstance();

		long relCaseParticipantRoleID = 0;

		final CaseIDTypeAndStatusKey caseIDTypeAndStatusKey = new CaseIDTypeAndStatusKey();

		caseIDTypeAndStatusKey.key.caseID = caseID;
		caseIDTypeAndStatusKey.key.typeCode = caseParticipantRoleType;
		caseIDTypeAndStatusKey.key.recordStatus = RECORDSTATUS.NORMAL;

		final CaseParticipantRoleIDAndNameDtlsList caseParticipantRoleIDAndNameDtlsList = caseParticipantRoleObj
				.listCaseParticipantRolesByTypeCaseIDAndStatus(caseIDTypeAndStatusKey);

		for (final CaseParticipantRoleNameDetails caseParticipantRoleNameDetails : caseParticipantRoleIDAndNameDtlsList.dtls.dtls) {

			if (caseParticipantRoleNameDetails.participantRoleID == concernRoleID) {
				relCaseParticipantRoleID = caseParticipantRoleNameDetails.caseParticipantRoleID;
				break;
			}

		}

		return relCaseParticipantRoleID;

	}

}
