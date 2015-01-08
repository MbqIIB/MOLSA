package curam.rules.functions;

import java.util.List;

import curam.core.struct.PersonRegistrationDetails;
import curam.ieg.impl.IEG2Context;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.rules.functor.CustomFunctor;

/**
 * this is to check the availability of person details
 */
@SuppressWarnings("restriction")
public class CustomFunctionIsPersonDetailsAvailable extends CustomFunctor {
    @SuppressWarnings({ "unused", "static-access" })
    @Override
    public Adaptor getAdaptorValue(RulesParameters rulesParameters)
        throws AppException, InformationalException {
      
      
      final List<Adaptor> parameters = getParameters();
      final String qid =((StringAdaptor) parameters.get(0)).getStringValue(rulesParameters);
      final IEG2Context ieg2Context = (IEG2Context) rulesParameters;
      try{
        MOLSAParticipantHelper molsaParticipantHelper = new MOLSAParticipantHelper();
        PersonRegistrationDetails personRegistrationDetails = molsaParticipantHelper.getMOIDetailsByQID(qid);
      
      } catch(Exception e){
        return AdaptorFactory.getBooleanAdaptor(Boolean.FALSE);
      }
      
      return AdaptorFactory.getBooleanAdaptor(Boolean.TRUE);
  }

}
