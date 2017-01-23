package curam.rules.functions;

import java.util.List;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.Date;

/**
 * This class provides operation to compare Dates.
 */
@SuppressWarnings("restriction")
public class CustomFunctionCompareDates extends CustomFunctor {

  
/**
 * a method to get adaptor value
 * @param rulesParameters
 * a rules parameters
 * @throws AppException
 * Generic Exception
 * @throws InformationalException
 * Generic exception
 * @return Boolean value adapter (true\false) after a successful update.
 */
  public Adaptor getAdaptorValue(RulesParameters rulesParameters) throws AppException, 
  InformationalException {
    final List<Adaptor> parameters = getParameters();
    final Date startdate = ((DateAdaptor) parameters.get(0)).getValue(rulesParameters);
    Date enddate = Date.kZeroDate;
    if (null != (DateAdaptor) parameters.get(1)) {
      enddate = ((DateAdaptor) parameters.get(1)).getValue(rulesParameters);
    }
    if (enddate.isZero()) {
      return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(Boolean.TRUE));
    }

    if (startdate.after(enddate)) {
      return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(Boolean.FALSE));
    }
    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(Boolean.TRUE));
  }

}
