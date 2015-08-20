package curam.molsacp.eventlisteners.impl;

import java.util.List;

import curam.citizenworkspace.configuration.impl.ScreeningType;
import curam.citizenworkspace.impl.CWScreeningEvents;
import curam.citizenworkspace.rules.impl.Program;
import curam.datastore.impl.Entity;
import curam.molsacp.impl.MOLSAScreeningHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.DateTime;

public class MOLSAScreeningEventListener extends CWScreeningEvents {

	MOLSAScreeningHelper screeningHelper = new MOLSAScreeningHelper();

    /**
     * {@inheritDoc}
     */
    @Override
    public void screeningResultsAvailable(final ScreeningType screening,
      final List<Program> programs, final Entity rootDatastoreEntity,
      final DateTime dateTime) {
      //Screening results are available after the screening is completed.
  	  // store this screening information 
	  try {
		screeningHelper.storeScreeningInfo(screening, programs, rootDatastoreEntity);
	} catch (AppException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (InformationalException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
    }
}
