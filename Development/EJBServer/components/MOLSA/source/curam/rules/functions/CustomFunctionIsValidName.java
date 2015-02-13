package curam.rules.functions;

import java.util.List;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * This class validates whether the name is valid or not
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidName extends CustomFunctor {

	@Override
	public Adaptor getAdaptorValue(RulesParameters paramRulesParameters)
			throws AppException, InformationalException {
	    final List<Adaptor> parameters = getParameters();
	    final String name = ((StringAdaptor) parameters.get(0)).getStringValue(paramRulesParameters);
	    boolean valid = false;
	    if (name.trim().isEmpty()) {
        return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(true));
      } else if (name.trim().matches("[a-zA-Z]+|[[a-zA-Z]+\\s+[a-zA-Z]+]*")) {
        valid = true;
      }
	    return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
	}

}
