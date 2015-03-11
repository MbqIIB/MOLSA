package curam.rules.functions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import curam.molsa.util.impl.MOLSADateUtil;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.Date;

/**
 * 
 * this class is to validate the range of date between current date and the
 * future date which is 2 years ahead of current date
 * 
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidDateRange extends CustomFunctor {

  @SuppressWarnings("unused")
  @Override
  public Adaptor getAdaptorValue(RulesParameters rulesParameters) throws AppException, InformationalException {

    final List<Adaptor> parameters = getParameters();

    Date currentDate = Date.getCurrentDate();
    final Calendar currentDateCal = currentDate.getCalendar();
    // extracting the year from current date
    int currentYear = currentDateCal.get(Calendar.YEAR);

    final Date testDate = ((DateAdaptor) parameters.get(0)).getValue(rulesParameters);
    final Calendar testDateCal = testDate.getCalendar();
    // extracting the year from test date
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
    Boolean valid = Boolean.FALSE;
    if (testDate.after(currentDate) || testDate.equals(currentDate)) {
      Date futuredate = null;

      if (MOLSADateUtil.isLeapYear(testDate)) {
        valid = true;
      } else if (testDate.equals(futureDate) || testDate.before(futuredate)) {
        valid = true;
      }

    }
    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
  }
}
