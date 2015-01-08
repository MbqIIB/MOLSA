package curam.socialassistance.creole.statics.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import curam.creole.execution.RuleObject;
import curam.creole.execution.session.Session;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
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

	public static Timeline<Integer> yearlyAnniversaryTimeline(Session session,
			Date startDate) {
		int intNumberOfAnniversaries = 110;

		List anniversaryIntervals = new ArrayList(112);

		anniversaryIntervals.add(new Interval(null, Integer.valueOf(0)));

		for (int anniversary = 0; anniversary <= 110; ++anniversary) {
			Calendar anniversaryDateCalendar = startDate.getCalendar();

			anniversaryDateCalendar.roll(1, anniversary);
			Date anniversaryDate = new Date(anniversaryDateCalendar);
			anniversaryIntervals.add(new Interval(anniversaryDate, Integer
					.valueOf(anniversary)));
		}

		Timeline anniversaryTimeline = new Timeline(anniversaryIntervals);
		return anniversaryTimeline;
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

}