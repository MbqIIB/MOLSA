package curam.molsa.cognos.facade.impl;

import curam.core.impl.EnvVars;
import curam.molsa.cognos.reporting.struct.MOLSACognosDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;

public class MOLSACognosURL extends curam.molsa.cognos.facade.base.MOLSACognosURL{

	@Override
	public MOLSACognosDetails getCognosURL() throws AppException,
			InformationalException {
		MOLSACognosDetails cognosDetails =  new MOLSACognosDetails();
		cognosDetails.cognosURL=Configuration.getProperty(EnvVars.COGNOS_URL);
		return cognosDetails;
	}

}
