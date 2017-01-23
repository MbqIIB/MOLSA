package curam.rules.functions;

import java.util.List;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 *This is to validate whether string contains only number(0-9)
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsValidNumber extends CustomFunctor{
	
	  /**
	   *@throws AppException
	   *General excpetion
	   *@throws InformationalException
	   *General exception
	   *@param rp
	   *rules parameters
	   *@return Boolean value adapter (true\false) after a successful update.
	  */
		@Override
		public Adaptor getAdaptorValue(RulesParameters rp) 
		throws AppException, InformationalException {
				
		  
				final List<Adaptor> parameters = getParameters();
				final String name =((StringAdaptor) parameters.get(0)).getStringValue(rp);
				boolean valid = false;
				if(name.matches(" ")) {
          valid=true;
        } else if(name.matches("[0-9]+")) {
          valid=true;
        }
					
			return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
		}
		

}
