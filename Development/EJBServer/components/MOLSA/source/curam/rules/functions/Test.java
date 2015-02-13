/**
 * 
 */
package curam.rules.functions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import curam.molsa.util.impl.MOLSADateUtil;
import curam.util.type.Date;

/**
 * This is to validate the date ranging from current date to future date
 * which is 2 years ahead from current date
 * 
 */
public class Test {

  /**
   * @param args
   */
  public static void main(String[] args) {

    Test test = new Test();

    test.isValidDate(Date.fromISO8601("20140229"));

  }

  private void isValidDate(Date testDate) {
    MOLSADateUtil isLeapObj = new MOLSADateUtil();
    Date currentDate = Date.getCurrentDate();
    final Calendar currentDateCal = currentDate.getCalendar();
    // extracting the year from current date
    int currentYear = currentDateCal.get(Calendar.YEAR);

    final Calendar testDateCal = testDate.getCalendar();
    // extracting the year from test date
    int testYear = testDateCal.get(Calendar.YEAR);

    /*
     * incrementing current date year to 2 years to get the futureDate year
     * which is 2 years ahead from currentDate year
     */
    int futureYear = currentYear += 2;

    int futureMonth = currentDateCal.get(Calendar.MONTH);
    int futureDay = currentDateCal.get(Calendar.DAY_OF_MONTH);
    String futureDate = futureDay + "/" + futureMonth + "/" + futureYear;

    try {
      SimpleDateFormat formatter = new SimpleDateFormat("dd/mm/yyyy");
      java.util.Date futuredate = formatter.parse(futureDate);

    } catch (ParseException e) {

      e.getMessage();
    }

    if (testDate.after(currentDate) || testDate.equals(currentDate)) {
      Date futuredate = null;

      if (isLeapObj.isLeapYear(testDate)) {
        Boolean Valid = true;
      } else if (testDate.equals(futureDate) || testDate.before(futuredate)) {
        Boolean Valid = true;
      }

      else {
        Boolean Valid = false;
      }
    }

  }

}
