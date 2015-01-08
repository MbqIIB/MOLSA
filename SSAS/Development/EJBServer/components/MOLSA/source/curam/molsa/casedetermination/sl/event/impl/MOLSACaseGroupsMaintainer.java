package curam.molsa.casedetermination.sl.event.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.xml.sax.SAXException;

import com.google.inject.Inject;

import curam.codetable.impl.CASEGROUPTYPEEntry;
import curam.codetable.impl.PRODUCTNAMEEntry;
import curam.core.fact.CaseGroupsFactory;
import curam.core.fact.UniqueIDFactory;
import curam.core.intf.CaseGroups;
import curam.core.intf.UniqueID;
import curam.core.struct.CaseGroupDetails;
import curam.core.struct.CaseGroupsDtls;
import curam.core.struct.CaseGroupsDtlsList;
import curam.core.struct.CaseGroupsKey;
import curam.core.struct.CaseGroupsReadmultiKey;
import curam.creoleprogramrecommendation.impl.SimulatedDeterminationAuthorizationDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeDefDAO;
import curam.dynamicevidence.definition.impl.EvidenceTypeVersionDefDAO;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;

/**
 * Class responsible for maintaining case group information.
 * <p>
 * NB Case Group processing has the following limitations:-
 * <li>Timeline information available from CREOLE rules is not utilized.</li>
 * 
 */
final class MOLSACaseGroupsMaintainer {

	/**
	 * The unit rule object helper.
	 */
	private MOLSARulesUnitInformationExtractor rulesUnitInformationExtractor;

	/**
	 * The product delivery.
	 */
	private ProductDelivery productDelivery;

	/**
	 * The Simulated Determination Authorization DAO.
	 */
	@Inject
	private SimulatedDeterminationAuthorizationDAO simulatedDeterminationAuthorizationDAO;

	/**
	 * Constructor.
	 * 
	 * @param productDelivery
	 *            The product delivery
	 */
	MOLSACaseGroupsMaintainer(final ProductDelivery productDelivery) {
		GuiceWrapper.getInjector().injectMembers(this);
		this.productDelivery = productDelivery;
		rulesUnitInformationExtractor = new MOLSARulesUnitInformationExtractor(
				productDelivery);
	}

	/**
	 * Maintain the case groups for a product delivery on reassessment.
	 * 
	 * @param productDelivery
	 *            The product delivery.
	 * 
	 * @throws SAXException
	 * @throws AppException
	 * @throws InformationalException
	 */
	void maintainCaseGroups() throws SAXException, AppException,
			InformationalException {

		final Set<CaseGroupDetails> eligibleMemberConcernRolesFromRules = rulesUnitInformationExtractor
				.getEligibleMembers();

		adjustCaseGroupsInformation(getCaseGroupType(),
				eligibleMemberConcernRolesFromRules);

	}

	/**
	 * For a set of concern roles derived in rules, adjust the information
	 * stored in the case groups entity.
	 * 
	 * @param caseGroupType
	 *            The type of case group
	 * @param concernRolesFromRules
	 *            The concern roles derived in rules
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	private void adjustCaseGroupsInformation(
			final CASEGROUPTYPEEntry caseGroupType,
			final Set<CaseGroupDetails> concernRolesFromRules)
			throws AppException, InformationalException {

		final CaseGroupsDtlsList caseGroupMembers = this
				.filterCurrentCaseGroupMembersByType(caseGroupType);

		CaseGroups caseGroupsObj = CaseGroupsFactory.newInstance();
		// remove all records when the rules return empty list
		if (concernRolesFromRules.isEmpty()) {

			for (final CaseGroupsDtls caseGroupsDtls : caseGroupMembers.dtls) {
				final CaseGroupsKey caseGroupsKey = new CaseGroupsKey();
				caseGroupsKey.caseClientGroupID = caseGroupsDtls.caseClientGroupID;
				caseGroupsObj.remove(caseGroupsKey);
			}
			return;
		}

		final Map<String, CaseGroupsDtls> caseGroupsDtlsMapForModify = new HashMap<String, CaseGroupsDtls>();
		final Map<String, CaseGroupsDtls> caseGroupsDtlsMapForRetain = new HashMap<String, CaseGroupsDtls>();

		for (final CaseGroupsDtls caseGroupsDtls : caseGroupMembers.dtls) {

			for (final CaseGroupDetails caseGroupDetails : concernRolesFromRules) {

				if (caseGroupDetails.concernRoleID == caseGroupsDtls.concernRoleID
						&& caseGroupDetails.startDate
								.equals(caseGroupsDtls.startDate)
						&& ((caseGroupDetails.endDate != null && !caseGroupDetails.endDate
								.equals(caseGroupsDtls.endDate)) || (caseGroupsDtls.endDate != null && !caseGroupsDtls.endDate
								.equals(caseGroupDetails.endDate)))) {

					caseGroupsDtls.endDate = caseGroupDetails.endDate;
					final StringBuffer keyBuffer = new StringBuffer();
					Long concernRoleID = caseGroupsDtls.concernRoleID;
					keyBuffer.append(caseGroupsDtls.startDate.toString()
							+ concernRoleID.toString());
					caseGroupsDtlsMapForModify.put(keyBuffer.toString(),
							caseGroupsDtls);

				} else if (caseGroupDetails.concernRoleID == caseGroupsDtls.concernRoleID
						&& caseGroupDetails.startDate
								.equals(caseGroupsDtls.startDate)
						&& ((caseGroupDetails.endDate == null && caseGroupsDtls.endDate == null)
								|| (caseGroupDetails.endDate != null && caseGroupDetails.endDate
										.equals(caseGroupsDtls.endDate)) || (caseGroupsDtls.endDate != null && caseGroupsDtls.endDate
								.equals(caseGroupDetails.endDate)))) {

					final StringBuffer keyBuffer = new StringBuffer();
					Long concernRoleID = caseGroupsDtls.concernRoleID;
					keyBuffer.append(caseGroupsDtls.startDate.toString()
							+ concernRoleID.toString());
					caseGroupsDtlsMapForRetain.put(keyBuffer.toString(),
							caseGroupsDtls);

				}
			}
		}

		for (final CaseGroupsDtls caseGroupsDtls : caseGroupMembers.dtls) {

			if (caseGroupsDtlsMapForModify.containsValue(caseGroupsDtls)) {

				final CaseGroupsKey caseGroupsKey = new CaseGroupsKey();
				caseGroupsKey.caseClientGroupID = caseGroupsDtls.caseClientGroupID;
				caseGroupsObj.modify(caseGroupsKey, caseGroupsDtls);

			} else if (!caseGroupsDtlsMapForRetain
					.containsValue(caseGroupsDtls)) {

				final CaseGroupsKey caseGroupsKey = new CaseGroupsKey();
				caseGroupsKey.caseClientGroupID = caseGroupsDtls.caseClientGroupID;
				caseGroupsObj.remove(caseGroupsKey);
			}
		}

		for (final CaseGroupDetails caseGroupDetails : concernRolesFromRules) {

			final StringBuffer keyBuffer = new StringBuffer();
			Long concernRoleID = caseGroupDetails.concernRoleID;
			keyBuffer.append(caseGroupDetails.startDate.toString()
					+ concernRoleID.toString());

			if (!caseGroupsDtlsMapForModify.containsKey(keyBuffer.toString())
					&& !caseGroupsDtlsMapForRetain.containsKey(keyBuffer
							.toString())) {

				final UniqueID uniqueObj = UniqueIDFactory.newInstance();
				final CaseGroupsDtls caseGroupsDtls = new CaseGroupsDtls();
				caseGroupsDtls.caseID = productDelivery.getID();
				caseGroupsDtls.concernRoleID = caseGroupDetails.concernRoleID;
				caseGroupsDtls.groupCode = caseGroupType.getCode();
				caseGroupsDtls.caseClientGroupID = uniqueObj.getNextID();
				caseGroupsDtls.startDate = caseGroupDetails.startDate;
				if (caseGroupDetails.endDate != null) {
					caseGroupsDtls.endDate = caseGroupDetails.endDate;
				}
				caseGroupsObj.insert(caseGroupsDtls);
			}
		}

	}

	/**
	 * Retrieve the list of current case group records for a particular type for
	 * a product delivery.
	 * 
	 * @param caseGroupType
	 *            The filter type
	 * 
	 * @return The current case group records of the specified type
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	private CaseGroupsDtlsList filterCurrentCaseGroupMembersByType(
			final CASEGROUPTYPEEntry caseGroupType) throws AppException,
			InformationalException {

		final CaseGroupsDtlsList filteredList = new CaseGroupsDtlsList();

		final CaseGroupsReadmultiKey caseGroupsReadmultiKey = new CaseGroupsReadmultiKey();
		caseGroupsReadmultiKey.caseID = productDelivery.getID();

		final CaseGroupsDtlsList caseGroupDtlsList = CaseGroupsFactory
				.newInstance().searchByCase(caseGroupsReadmultiKey);

		for (final CaseGroupsDtls caseGroupDtls : caseGroupDtlsList.dtls) {

			if (caseGroupDtls.groupCode.equals(caseGroupType.getCode())) {
				filteredList.dtls.add(caseGroupDtls);
			}
		}

		return filteredList;
	}

	/**
	 * Based on the Product name retrieves the corresponding Case group type.
	 * 
	 * @return Case group type entry.
	 */
	private CASEGROUPTYPEEntry getCaseGroupType() {

		final PRODUCTNAMEEntry productName = productDelivery.getProduct()
				.getName();

		CASEGROUPTYPEEntry caseGroupType = CASEGROUPTYPEEntry.BENEFITGROUP;

		if (productName.equals(PRODUCTNAMEEntry.ANONYMOUSPARENTS)) {
			caseGroupType = CASEGROUPTYPEEntry.ANONYMOUSPARENTS;
		}
		if (productName.equals(PRODUCTNAMEEntry.ORPHAN)) {
			caseGroupType = CASEGROUPTYPEEntry.ORPHAN;
		}
		if (productName.equals(PRODUCTNAMEEntry.WIDOW)) {
			caseGroupType = CASEGROUPTYPEEntry.WIDOW;
		}
		if (productName.equals(PRODUCTNAMEEntry.DESERTEDWIFE)) {
			caseGroupType = CASEGROUPTYPEEntry.DESERTEDWIFE;
		}
		if (productName.equals(PRODUCTNAMEEntry.DIVORCEDLADY)) {
			caseGroupType = CASEGROUPTYPEEntry.DIVORCEDLADY;
		}
		if (productName.equals(PRODUCTNAMEEntry.HANDICAP)) {
			caseGroupType = CASEGROUPTYPEEntry.HANDICAP;
		}
		if (productName.equals(PRODUCTNAMEEntry.FAMILYINNEED)) {
			caseGroupType = CASEGROUPTYPEEntry.FAMILYINNEED;
		}
		if (productName.equals(PRODUCTNAMEEntry.FAMILYOFMISSING)) {
			caseGroupType = CASEGROUPTYPEEntry.FAMILYOFMISSING;
		}
		if (productName.equals(PRODUCTNAMEEntry.FAMILYOFPRISONER)) {
			caseGroupType = CASEGROUPTYPEEntry.FAMILYOFPRISONER;
		}
		if (productName.equals(PRODUCTNAMEEntry.INCAPABLEOFWORKING)) {
			caseGroupType = CASEGROUPTYPEEntry.INCAPABLEOFWORKING;
		}
		if (productName.equals(PRODUCTNAMEEntry.SENIORCITIZEN)) {
			caseGroupType = CASEGROUPTYPEEntry.SENIORCITIZEN;
		}
		if (productName.equals(PRODUCTNAMEEntry.MAIDALLOWANCE)) {
			caseGroupType = CASEGROUPTYPEEntry.MAIDALLOWANCE;
		}
		return caseGroupType;
	}
}
