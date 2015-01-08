package curam.rules.functions;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * This class provides the validation of emailID
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidEmail extends CustomFunctor {

  @Override
  public Adaptor getAdaptorValue(RulesParameters rulesParam) throws AppException,
      InformationalException {
    final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    final List<Adaptor> parameters = getParameters();
    Pattern pattern;
    Matcher matcher;
    if(null!=parameters.get(0)){
    final String emailId = ((StringAdaptor) parameters.get(0))
        .getStringValue(rulesParam);
    pattern = Pattern.compile(EMAIL_PATTERN);
    matcher = pattern.matcher(emailId);
    return AdaptorFactory.getBooleanAdaptor(matcher.matches());
    } else {
      return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);
    }
      
  }

}