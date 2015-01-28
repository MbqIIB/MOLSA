package curam.socialassistance.creole.statics.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.Comparator;

import curam.core.impl.CuramConst;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.execution.RuleObject;
import curam.creole.execution.session.Session;
import curam.creole.ruleclass.MOLSARuleSet.impl.HouseholdUnit;
import curam.creole.ruleclass.MOLSARuleSet.impl.HouseholdUnitMember;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitCalculator;
import curam.creole.ruleclass.SocialAssistanceRuleSet.impl.SAHouseholdUnitMember;
import curam.creole.value.BoundedInterval;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.creole.value.XmlMessage;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.DateTime;

public final class Statics {
	protected Statics() {
		throw new UnsupportedOperationException();
	}

	public static Timeline<Boolean> createSpecificPeriodTimeline(
			Session session, Date startDate, Date endDate) {
		if ((endDate != null) && (startDate != null)
				&& (startDate.after(endDate))) {
			return Timeline.FALSE_FOREVER;
		}

		List condensedIntervals = new ArrayList();

		if (startDate == null) {
			if (endDate != null)
				condensedIntervals
						.add(new Interval(null, Boolean.valueOf(true)));
			else {
				condensedIntervals.add(new Interval(null, Boolean
						.valueOf(false)));
			}
		}
		if (startDate != null) {
			condensedIntervals.add(new Interval(null, Boolean.valueOf(false)));
			condensedIntervals.add(new Interval(startDate, Boolean
					.valueOf(true)));
		}
		if (endDate != null) {
			condensedIntervals.add(new Interval(endDate.addDays(1), Boolean
					.valueOf(false)));
		}

		return new Timeline(condensedIntervals);
	}

	public static Date getDate(Session session, DateTime dateTime)
			throws AppException, InformationalException {
		if (dateTime == null) {
			return Date.getCurrentDate();
		}
		return new Date(dateTime.getCalendar());
	}

	public static Timeline<Number> yearlyAnniversaryTimeline(Session session,
			Date startDate) {
		int intNumberOfAnniversaries = 110;
		final List<Interval<Number>> resultIntervals = new ArrayList<Interval<Number>>();

		List anniversaryIntervals = new ArrayList(112);

		anniversaryIntervals.add(new Interval(null, Integer.valueOf(0)));

		for (int anniversary = 0; anniversary <= 110; ++anniversary) {
			Calendar anniversaryDateCalendar = startDate.getCalendar();

			anniversaryDateCalendar.roll(1, anniversary);
			Date anniversaryDate = new Date(anniversaryDateCalendar);
			anniversaryIntervals.add(new Interval(anniversaryDate, Integer
					.valueOf(anniversary)));
		}
		Date intervalStartDate = null;
		Number fistinterval = null;
		final SortedSet<Date> sortedStartDates = new TreeSet<Date>(
				new Comparator<Date>() {

					public int compare(final Date lhs, final Date rhs) {
						return lhs.compareTo(rhs);
					}
				});

		Timeline<Number> anniversaryTimeline = new Timeline(
				anniversaryIntervals);

		for (BoundedInterval<Number> interval : anniversaryTimeline.intervals()) {

			intervalStartDate = interval.startDate();
			if (intervalStartDate == null) {
				fistinterval = interval.value();
			}
			if (intervalStartDate != null) {

				if (interval.value().doubleValue() == 17
						|| interval.value().doubleValue() == 18
						|| interval.value().doubleValue() == 60) {
					intervalStartDate = shiftToStartOfNextMonth(intervalStartDate);
					sortedStartDates.add(intervalStartDate);
				} else {
					sortedStartDates.add(intervalStartDate);
				}

			}
		}
		Iterator<Date> iterator = sortedStartDates.iterator();
		resultIntervals.add(new Interval<Number>(null, fistinterval));

		while (iterator.hasNext()) {
			final Date startDate1 = iterator.next();
			resultIntervals.add(new Interval<Number>(startDate1,
					anniversaryTimeline.valueOn(startDate1)));
		}
		Timeline<Number> ageTimeline = new Timeline<Number>(resultIntervals);

		return ageTimeline;
	}

	/**
	 * For a given timeline of rule objects, return the list of unique rule
	 * objects.
	 * 
	 * Interval1 = {RO1, RO2, RO3} Interval2 = {RO1, RO2} Interval3 = {RO3}
	 * 
	 * E.G. For the above intervals, the unique list returned is {RO1, RO2,
	 * RO3}.
	 * 
	 * 
	 * @param session
	 *            The CREOLE Session
	 * @param timeline
	 *            The input timeline
	 * 
	 * @return The list of unique rule objects derived from the input timeline
	 * 
	 * @throws AppException
	 * @throws InformationalException
	 */
	public static <T extends RuleObject> List<T> getUniqueRuleObjects(
			final Session session, final Timeline<List<T>> timeline)
			throws AppException, InformationalException {

		final List<T> uniqueRuleObjects = new ArrayList<T>();

		for (final Interval<List<T>> ruleObjectList : timeline.intervals()) {

			if (ruleObjectList.value() != null) {

				for (final T ruleObject : ruleObjectList.value()) {

					if (!uniqueRuleObjects.contains(ruleObject)) {
						uniqueRuleObjects.add(ruleObject);
					}
				}
			}

		}
		return uniqueRuleObjects;
	}

	public static Date shiftDateByYears(Session session, Date actualDate,
			Number numberOfYears, boolean shiftToStartOfNextMonth) {
		Date shiftedDate = null;

		if (actualDate != null) {
			Calendar shiftedDateCalendar = actualDate.getCalendar();

			shiftedDateCalendar.add(1, numberOfYears.intValue());

			shiftedDate = new Date(shiftedDateCalendar);

			if (shiftToStartOfNextMonth) {
				shiftedDate = shiftToStartOfNextMonth(shiftedDate);
			}
		}

		return shiftedDate;
	}

	public static Date shiftToStartOfNextMonth(Date date) {
		if (date == null) {
			return date;
		}

		Calendar calendar = date.getCalendar();
		calendar.add(2, 1);
		calendar.set(5, 1);
		return new Date(calendar);
	}

	public static <T extends RuleObject> List<T> getValueOfTimelineListOnDate(
			Session session, Timeline<List<T>> timeline) throws AppException,
			InformationalException {
		List list = (List) timeline.valueOn(Date.getCurrentDate());

		return list;
	}

	public static Object getValueOfTimelineOnDate(Session session,
			Timeline<Object> timeline) throws AppException,
			InformationalException {
		Object object = timeline.valueOn(Date.getCurrentDate());

		return object;
	}

	public static int getDifferenceInDaysFromCurrentDate(Session session,
			final Date startDate) {
		return Date.getCurrentDate().subtract(startDate);
	}

	public static Boolean validateQIDNumber(Session session, String qidNumber,
			String absentPerson) throws AppException, InformationalException {

		MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
		PersonRegistrationDetails personDetails = new PersonRegistrationDetails();
		if (qidNumber.isEmpty()) {
			return false;
		}
		personDetails = molsaParticipantHelper.getMOIDetailsByQID(qidNumber);
		String concernRoleName = null;
		String name[] = absentPerson.split(CuramConst.gkSpace);
		int i = name.length;
		if (i == 2) {
			if (name[0].equalsIgnoreCase(personDetails.firstForename)
					&& name[1].equalsIgnoreCase(personDetails.surname)) {
				return false;
			} else {
				return true;
			}
		} else if (i == 1) {
			if (name[0].equalsIgnoreCase(personDetails.firstForename)
					|| name[0].equalsIgnoreCase(personDetails.surname)) {
				return false;
			} else {
				return true;
			}
		} else
			return false;
	}

	public static List<RuleObject> removeDuplicateRuleObjects(
			final Session session, List<RuleObject> units)
			throws AppException, InformationalException {

		
		Map<XmlMessage, RuleObject> map = new HashMap<XmlMessage, RuleObject>();
		
		final List<RuleObject> uniqueRuleObjects = new ArrayList<RuleObject>();
        
		
		for(RuleObject unit : units){
			map.put( (XmlMessage) unit.description().getValue(), unit);
		}
		 
		uniqueRuleObjects.addAll(map.values());
		
		return uniqueRuleObjects;
	}

	private static <T> String getCaseParticipantRoleIDasString(final RuleObject firstUnit) {
		Timeline<List<RuleObject>> householdUnitMembers ;
		ArrayList<Number> ids = new ArrayList<Number>();
		householdUnitMembers =  (Timeline<List<RuleObject>>) firstUnit.getAttributeValue("mandatoryEligibleMembersTimeline").getValue();
		String caseParticipantRoleIDList ="";
		for(BoundedInterval<List<RuleObject>> member :householdUnitMembers.intervals()){
			List<RuleObject> ruleObjectList = member.value();
			for (Iterator iterator = ruleObjectList.iterator(); iterator
					.hasNext();) {
				RuleObject ruleObject = (RuleObject) iterator.next();
              ids.add( (Number) ruleObject.getAttributeValue("caseParticipantRoleID").getValue());
			}
		}
		ArrayList<Long> idlong = new ArrayList<Long>();
		
		for(Number number : ids){
			idlong.add(number.longValue());
		}
		
		Collections.sort(idlong);
		for(Long value : idlong){
			caseParticipantRoleIDList = caseParticipantRoleIDList+value;
		}
		
		return caseParticipantRoleIDList.trim();
	}

}