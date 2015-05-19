/**
 * 
 */
package curam.rules.functions;

import java.util.List;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.Date;

/**
 * This is to validate the application date
 * 
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidApplicationDate extends CustomFunctor {

  /**
   * Constructor.
   * 
   */
  public CustomFunctionIsValidApplicationDate() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  /**
   * this is to check whether the application date is valid or not
   * @param rulesParameters
   * rules parameters
   * @throws AppException
   * general exception
   * @throws InformationalException
   * general exception
   * @return Boolean value adapter (true\false) after a successful update.
   */
 
  public Adaptor getAdaptorValue(final RulesParameters rulesParameters) 
  throws AppException, InformationalException {
    Date currentDate = Date.getCurrentDate();
    final List<Adaptor> parameters = getParameters();
    Boolean valid = false;
    final Date applicationDate = ((DateAdaptor) parameters.get(0)).getValue(rulesParameters);

    if (applicationDate.equals(currentDate) || applicationDate.before(currentDate)) {

      valid = true;
    }

    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));

  }

}
