/**
 * 
 */
package curam.molsa.util.impl;

import java.util.Calendar;
import java.util.GregorianCalendar;

import curam.util.type.Date;

/**
 * Utility class for All Date related conversions
 * 
 */
public class MOLSADateUtil {

	public static int calculateAge(final Date birthDate) {

		final Calendar currentDate = Date.getCurrentDate().getCalendar();
		final Calendar dateOfBirth = birthDate.getCalendar();

		int diffInYears = currentDate.get(Calendar.YEAR)
				- dateOfBirth.get(Calendar.YEAR);

		if (currentDate.get(Calendar.MONTH) < dateOfBirth.get(Calendar.MONTH)) {
			diffInYears--;
		}

		if ((currentDate.get(Calendar.MONTH) == dateOfBirth.get(Calendar.MONTH))
				&& (currentDate.get(Calendar.DAY_OF_MONTH) < dateOfBirth
						.get(Calendar.DAY_OF_MONTH))) {
			diffInYears--;
		}

		if (diffInYears < 0) {
			diffInYears = 0;
		}
		return diffInYears;
	}

	/**
	 * Checks if Given year is Leap
	 * 
	 * @param date
	 * @return
	 */
	public static boolean isLeapYear(final Date date) {

		final boolean isLeap = new GregorianCalendar().isLeapYear(date
				.getCalendar().get(Calendar.YEAR));
		return isLeap;
	}

	/*
	 * Gives the start of month provided any date.
	 */
	public static Date shiftToStartOfMonth(final Date date) {

		if (date == null) {
			return date;
		}
		final Calendar calendar = date.getCalendar();
		if (calendar.get(Calendar.DAY_OF_MONTH) == 1) {
			return date;
		}
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		return new Date(calendar);
	}

	/**
	 * Determines age based on the specified date.
	 * 
	 * @param endDate
	 *            Specified date against which age need to be determined
	 * @param dateOfBirth
	 *            Date of Birth
	 * @return Age
	 */
	public static long determineAge(final Date endDate, final Date dateOfBirth) {

		final Calendar endDateCal = endDate.getCalendar();

		final Calendar dateOfBirthCal = dateOfBirth.getCalendar();

		int diffInYears = endDateCal.get(Calendar.YEAR)
				- dateOfBirthCal.get(Calendar.YEAR);

		if (endDateCal.get(Calendar.MONTH) < dateOfBirthCal.get(Calendar.MONTH)) {
			diffInYears--;
		}

		if ((endDateCal.get(Calendar.MONTH) == dateOfBirthCal
				.get(Calendar.MONTH))
				&& (endDateCal.get(Calendar.DAY_OF_MONTH) < dateOfBirthCal
						.get(Calendar.DAY_OF_MONTH))) {
			diffInYears--;
		}

		if (diffInYears < 0) {
			diffInYears = 0;
		}
		return diffInYears;
	}

}
