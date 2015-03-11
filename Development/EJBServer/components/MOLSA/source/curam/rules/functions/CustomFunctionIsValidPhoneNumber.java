package curam.rules.functions;

import java.util.List;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;

/**
 * This class provides the operations to interact with data store.
 * <p>
 * Entities
 * </p>
 * <ol>
 * Application
 * </ol>
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidPhoneNumber extends CustomFunctor {

  /**
  * 
  */
  public CustomFunctionIsValidPhoneNumber() {

    GuiceWrapper.getInjector().injectMembers(this);
  }

  /**
   * @throws AppException
   * General excpetion
   * @throws InformationalException
   * general exception
   * @param rulesParameters
   * rules parameters
   * @return Boolean value adapter (true\false) after a successful update.
   */
  @Override
  @AccessLevel(AccessLevelType.EXTERNAL)
  public Adaptor getAdaptorValue(final RulesParameters rulesParameters)
      throws AppException, InformationalException {
    final List<Adaptor> parameters = getParameters();
    boolean valid = false;
    if(null!=parameters.get(0)){
    final String phoneNumber = ((StringAdaptor) parameters.get(0))
        .getStringValue(rulesParameters);
    if (phoneNumber.trim().isEmpty()) {
      return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(true));
    } else if ((phoneNumber.trim().matches("[0-9]+"))
        && phoneNumber.length() == 8) {
      valid = true;
    }
    } else {
      valid = true;
    }

    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
  }
}
