package curam.molsa.casedetermination.sl.event.impl;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.xpath.XPathAPI;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.google.inject.Inject;

import curam.core.sl.infrastructure.assessment.codetable.impl.CASEDETERMINATIONASSESSMENTSTATUSEntry;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseAssessmentDeterminationAccessor;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseAssessmentDeterminationAccessorDAO;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseDeterminationAccessor;
import curam.core.sl.infrastructure.assessment.impl.Determination;
import curam.core.sl.infrastructure.product.creole.impl.CREOLEProductDecisionDisplayCategoryAccessor;
import curam.core.struct.CaseGroupDetails;
import curam.creole.value.BoundedInterval;
import curam.creole.value.Timeline;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.util.exception.AppRuntimeException;
import curam.util.persistence.GuiceWrapper;
import curam.util.type.Date;
import curam.util.type.DateRange;
import curam.util.type.DateRange.DateRangeSet;
import curam.util.type.DateRanged;

/**
 * This class knows how to retrieve unit member information from rules using the
 * latest determination information.
 * 
 * NB This class uses a Unit Information display rule class to extract concern
 * role information from rules. The decision details xml is parsed to produce
 * these results. Changes to the unit information display rule class for a
 * product may adversely affect the processing within this class.
 * 
 */
final class MOLSARulesUnitInformationExtractor {

	@Inject
	private CREOLECaseAssessmentDeterminationAccessorDAO creoleCaseAssessmentDeterminationAccessorDAO;


	final Set<CaseGroupDetails> eligibleMembers = new HashSet<CaseGroupDetails>();

	final Set<CaseGroupDetails> mandatoryMembers = new HashSet<CaseGroupDetails>();

	final ProductDelivery productDelivery;

	@Inject
	private CaseHeaderDAO caseHeaderDAO;

	/**
	 * Constructor a new extractor.
	 * 
	 * @param productDelivery
	 *            The relevant product delivery
	 */
	public MOLSARulesUnitInformationExtractor(final ProductDelivery productDelivery) {
		GuiceWrapper.getInjector().injectMembers(this);
		this.productDelivery = productDelivery;

		extractUnitInformationFromRules();
	}
	/**
	 * The set of eligible members.
	 * 
	 * @return The set of eligible members.
	 */
	Set<CaseGroupDetails> getEligibleMembers() {
		return eligibleMembers;
	}

	/**
	 * The set of mandatory members.
	 * 
	 * @return The set of mandatory members.
	 */
	Set<CaseGroupDetails> getMandatoryMembers() {
		return mandatoryMembers;
	}

	/**
	 * Extract the latest member information from rules.
	 */
	private void extractUnitInformationFromRules() {

		final Determination latestDetermination = this
				.getLatestDetermination(productDelivery);

		final Timeline<? extends String> unitInformationDisplayXML = getUnitInformationDisplayXML(latestDetermination);

		if (unitInformationDisplayXML != null) {

			mandatoryMembers.addAll(extractMembers(unitInformationDisplayXML,
					MOLSAConstants.kDecisionDetailsXPath_MandatoryMembers));

			eligibleMembers.addAll(extractMembers(unitInformationDisplayXML,
					MOLSAConstants.kDecisionDetailsXPath_EligibleMembers));
		}
	}

	/**
	 * Extract the member details from the rules result
	 */
	private Set<CaseGroupDetails> extractMembers(
			final Timeline<? extends String> unitInformationDisplayXML,
			final String... memberTypes) {

		final Map<Long, List<MemberDateRanged>> memberMap = new HashMap<Long, List<MemberDateRanged>>();

		for (final BoundedInterval<? extends String> xmlInterval : unitInformationDisplayXML
				.intervals()) {

			final Set<Long> membersFromRules = new HashSet<Long>();

			if (xmlInterval.value() != null) {
				try {

					final Document document = DocumentBuilderFactory
							.newInstance()
							.newDocumentBuilder()
							.parse(new InputSource(new StringReader(xmlInterval
									.value())));

					for (final String memberType : memberTypes) {

						final NodeList countableMemberNodeList = XPathAPI
								.selectNodeList(document, memberType);

						for (int i = 0; i < countableMemberNodeList.getLength(); i++) {
							final Long concernRoleID = Long
									.valueOf(countableMemberNodeList.item(i)
											.getTextContent());
							membersFromRules.add(concernRoleID);
						}
					}

				} catch (final Exception ex) {
					throw new AppRuntimeException(ex);
				}

				processMembersFromRules(memberMap, membersFromRules,
						xmlInterval);
			}
		}

		final Set<CaseGroupDetails> members = new HashSet<CaseGroupDetails>();

		for (final Long member : memberMap.keySet()) {

			final List<MemberDateRanged> memberDateRangeList = memberMap
					.get(member);

			for (final DateRangeSet<MemberDateRanged> memberDateRanges : DateRange
					.findContiguousDateRanges(memberDateRangeList)) {

				final DateRange dateRange = memberDateRanges.getDateRange();

				final CaseGroupDetails caseGroupDetails = new CaseGroupDetails();
				caseGroupDetails.concernRoleID = member;
				caseGroupDetails.startDate = dateRange.start();
				caseGroupDetails.endDate = dateRange.end();
				members.add(caseGroupDetails);
			}
		}

		return members;
	}

	/**
	 * Method to process the values from the rules and get the case group
	 * details
	 */
	private void processMembersFromRules(
			final Map<Long, List<MemberDateRanged>> memberMap,
			final Set<Long> membersFromRules,
			final BoundedInterval<? extends String> xmlInterval) {

		final CaseHeader caseHeader = caseHeaderDAO
				.get(productDelivery.getID());

		for (final Long member : membersFromRules) {

			Date startDate;
			Date endDate;

			if (xmlInterval.startDate() == null
					|| xmlInterval.startDate()
							.before(caseHeader.getStartDate())) {

				startDate = caseHeader.getStartDate();
			} else {
				startDate = xmlInterval.startDate();
			}

			if (xmlInterval.endDate() != null
					&& xmlInterval.endDate().before(
							caseHeader.getExpectedEndDate())) {
				endDate = xmlInterval.endDate();
			} else {
				endDate = null;
			}
			final DateRange memberDateRange = new DateRange(startDate, endDate);
			final MemberDateRanged memberDateRanged = new MemberDateRanged(
					memberDateRange);

			if (memberMap.containsKey(member)) {

				memberMap.get(member).add(memberDateRanged);
			} else {

				final List<MemberDateRanged> dateRangeList = new ArrayList<MemberDateRanged>();
				dateRangeList.add(memberDateRanged);
				memberMap.put(member, dateRangeList);
			}

		}

	}

	/**
	 * Retrieve the latest determination.
	 * 
	 * @param productDelivery
	 *            The product delivery
	 * 
	 * @return the latest determination.
	 */
	private Determination getLatestDetermination(
			final ProductDelivery productDelivery) {

		final List<? extends CREOLECaseAssessmentDeterminationAccessor> creoleCaseAssessmentDeterminations = creoleCaseAssessmentDeterminationAccessorDAO
				.searchBy(productDelivery,
						CASEDETERMINATIONASSESSMENTSTATUSEntry.CURRENT);

		final CREOLECaseDeterminationAccessor creoleCaseDetermination = creoleCaseAssessmentDeterminations
				.get(creoleCaseAssessmentDeterminations.size() - 1);

		return creoleCaseDetermination.getDeterminationResult();

	}

	/**
	 * Retrieve the unit information display category XML from a determination.
	 * 
	 * @param determination
	 *            The determination.
	 * 
	 * @return The unit information display category XML from a determination.
	 */
	private Timeline<? extends String> getUnitInformationDisplayXML(
			final Determination determination) {

		final Map<CREOLEProductDecisionDisplayCategoryAccessor, Timeline<? extends String>> decisionDetailsTimelines = determination
				.decisionDetailsTimelines();

		for (final CREOLEProductDecisionDisplayCategoryAccessor category : decisionDetailsTimelines
				.keySet()) {

			if (category.getCategoryReference().equals(
					MOLSAConstants.kDisplayCategoryReference_UnitInformation)) {

				// Found relevant display XML
				return decisionDetailsTimelines.get(category);
			}
		}

		return null;
	}

	private final class MemberDateRanged implements DateRanged {

		private final DateRange dateRange;

		public MemberDateRanged(final DateRange dateRange) {
			this.dateRange = dateRange;
		}

		@Override
		public DateRange getDateRange() {
			return dateRange;
		}

	}

}
