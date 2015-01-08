package curam.rules.functions;

import java.util.List;

import curam.util.exception.AppException;

import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * This class provides operations related to String.
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidString extends CustomFunctor {

  /**
   * This method validate whether
   * string contains only characters(a-z)
   * @throws AppException
   * general exception 
   * @throws InformationalException
   * general exception
   * @param rp
   * rules parameter
   * @return Boolean value adapter (true\false) after a successful update.
   */
  @Override
  public Adaptor getAdaptorValue(RulesParameters rp) 
  throws AppException,  InformationalException {
     
    final List<Adaptor> parameters = getParameters();
    final String name = ((StringAdaptor) parameters.get(0)).getStringValue(rp);
    boolean valid = false;
    if (name.trim().isEmpty()) {
      return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(true));
    } else if (name.trim().matches("[a-zA-Z]+")) {
      valid = true;
    }

    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
  }

}