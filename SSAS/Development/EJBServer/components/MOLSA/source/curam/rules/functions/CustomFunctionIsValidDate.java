package curam.rules.functions;

import java.util.List;

import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;
import curam.util.type.Date;

/**
 * This is to check whether the date is valid or not
 */

@SuppressWarnings("restriction")
public class CustomFunctionIsValidDate extends CustomFunctor {

/**
  * This method validate date to be in between 1900-01-01 to current date
  * @throws AppException 
  * General Exception
  * @throws InformationalException
  * General Exception
  * @param rulesParameters
  * an arguement storing rules parameters
  * @return Boolean value adapter (true\false) after a successful update.
 */
	public Adaptor getAdaptorValue(RulesParameters rulesParameters) 
	throws AppException,InformationalException {
			
		final List<Adaptor> parameters = getParameters();
		boolean valid = false;
		
		//mindate consist of the minimum range for date
		//here the date is captured form parameter and is initialised to local variable "date"
		
		final Date date =((DateAdaptor) parameters.get(0)).getValue(rulesParameters);
		
		if(date.after(MOLSADatastoreConst.KValidMinDate)|| date.equals(MOLSADatastoreConst.KValidMinDate)){
		
			if( date.before(Date.getCurrentDate())|| date.equals(Date.getCurrentDate())) {
        valid=true;
      }
		}
		return AdaptorFactory.getBooleanAdaptor(Boolean.valueOf(valid));
	}

}
