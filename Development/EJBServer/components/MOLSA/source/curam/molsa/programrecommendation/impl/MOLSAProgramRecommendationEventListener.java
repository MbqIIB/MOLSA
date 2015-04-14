package curam.molsa.programrecommendation.impl;

import java.util.Set;

import curam.application.impl.Application;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationEvent;
import curam.creoleprogramrecommendation.product.impl.CREOLEProgramRecommendationProduct;
import curam.molsa.programrecommendation.sl.fact.MOLSAProgramRecommendationValidationFactory;
import curam.molsa.programrecommendation.sl.intf.MOLSAProgramRecommendationValidation;
import curam.molsa.programrecommendation.sl.struct.ValidateProgramRecommendationDetails;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * Events are raised during the processing of program recommendation these
 * events allow customers to add additional processing as required.
 */
public class MOLSAProgramRecommendationEventListener extends
		CREOLEProgramRecommendationEvent {

	/**
	 * Invoked before program recommendation is executed.
	 * 
	 * @param integratedCase
	 *            The integrated case details
	 * @param application
	 *            The application details
	 * @param creoleProgramRecommendationProducts
	 *            Contains set of program requested for program recommendation
	 * @throws InformationalException
	 *             Generic informational exception.
	 * @throws AppException
	 *             Generic application exception.
	 */
	public void preCREOLEProgramRecommendation(
			final IntegratedCase integratedCase,
			final Application application,
			final Set<CREOLEProgramRecommendationProduct> creoleProgramRecommendationProducts)
			throws InformationalException, AppException {

		ValidateProgramRecommendationDetails validateProgramRecommendationDetails = new ValidateProgramRecommendationDetails();
		validateProgramRecommendationDetails.caseID = integratedCase.getID();
		final MOLSAProgramRecommendationValidation programRecommendationValidation = MOLSAProgramRecommendationValidationFactory
				.newInstance();
		programRecommendationValidation
				.validate(validateProgramRecommendationDetails);
	}

	/**
	 * Invoked after program recommendation is executed.
	 * 
	 * @param integratedCase
	 *            The integrated case details
	 * @throws InformationalException
	 *             Generic informational exception.
	 * @throws AppException
	 */
	public void postCREOLEProgramRecommendation(
			final CREOLEProgramRecommendation creoleProgramRecommendation)
			throws InformationalException, AppException {

	}

}
