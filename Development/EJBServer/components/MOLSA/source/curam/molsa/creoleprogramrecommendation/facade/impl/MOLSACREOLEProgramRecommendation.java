package curam.molsa.creoleprogramrecommendation.facade.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import curam.application.entity.struct.ApplicationKey;
import curam.core.base.Users;
import curam.core.fact.UsersFactory;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.creoleprogramrecommendation.facade.fact.CREOLEProgramRecommendationFactory;
import curam.creoleprogramrecommendation.facade.intf.CREOLEProgramRecommendation;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetails;
import curam.creoleprogramrecommendation.facade.struct.SimulatedDeterminationDetailsList;
import curam.creoleprogramrecommendation.struct.CREOLEProgramRecommendationKey;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetails;
import curam.molsa.creoleprogramrecommendation.facade.struct.MolsaSimulatedDeterminationDetailsList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * Facade class used to perform the operations related to eligible programs.
 */

public class MOLSACREOLEProgramRecommendation
		extends curam.molsa.creoleprogramrecommendation.facade.base.MOLSACREOLEProgramRecommendation {

	/**
	 * This method sets the details of eligible programs listed on IC home page
	 * under check eligibility tab
	 * 
	 * @param CREOLEProgramRecommendationKey
	 *            Contains Program Recommendation identifier
	 * 
	 * @return MolsaSimulatedDeterminationDetailsList Contains eligible program
	 *         details
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public MolsaSimulatedDeterminationDetailsList listEligibleSimulatedDeterminations(
			CREOLEProgramRecommendationKey key) throws AppException,
			InformationalException {

		CREOLEProgramRecommendation CreoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
				.newInstance();
		SimulatedDeterminationDetailsList SimulatedDeterminationDtlsList = new SimulatedDeterminationDetailsList();
		MolsaSimulatedDeterminationDetailsList molsaSimulatedDeterminationDtlsList = new MolsaSimulatedDeterminationDetailsList();

		SimulatedDeterminationDtlsList = CreoleProgramRecommendationObj
				.listEligibleSimulatedDeterminations(key);
		
		curam.core.intf.Users usersObj=UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();
		usersKey.userName= TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		for (SimulatedDeterminationDetails dtls : SimulatedDeterminationDtlsList.list) {
			MolsaSimulatedDeterminationDetails molsaSimulatedDeterminationDtls = new MolsaSimulatedDeterminationDetails();
			molsaSimulatedDeterminationDtls.dtls.assign(dtls);
			String date = molsaSimulatedDeterminationDtls.dtls.period
			.substring(134, 144);
			//DateFormat finald= new SimpleDateFormat("yyyy-MM-dd");
			String dates[] = date.split("-");
			String one = dates[1];
			String two = dates[2];
			String finalDate = dates[0].concat(one);
			finalDate = finalDate.concat(two);
			Date fromDate = Date.getDate(finalDate);
			if ((fromDate.after(Date.getCurrentDate()))
					|| (molsaSimulatedDeterminationDtls.dtls.isAuthorized)) {
				molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			//Disable the Case Authorize button for Case Workers MOLSA-2017-CR4.3
			if(usersDtls.roleName.equals(MOLSAConstants.kMolsaCaseWorkerRole)){
				molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			molsaSimulatedDeterminationDtlsList.dtls
			.addRef(molsaSimulatedDeterminationDtls);

		}
		return molsaSimulatedDeterminationDtlsList;
	}

	/**
	 * This method sets the details of eligible programs listed on Application
	 * home page under review eligibility page
	 * 
	 * @param ApplicationKey
	 *            Contains Program Recommendation identifier
	 * 
	 * @return MolsaSimulatedDeterminationDetailsList Contains eligible program
	 *         details
	 * 
	 * @throws AppException
	 *             Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 *             Generic Exception Signature.
	 */
	@Override
	public MolsaSimulatedDeterminationDetailsList listLatestAppliedForEligibleSimulatedDeterminations(
			ApplicationKey key) throws AppException, InformationalException {
		CREOLEProgramRecommendation CreoleProgramRecommendationObj = CREOLEProgramRecommendationFactory
				.newInstance();
		SimulatedDeterminationDetailsList SimulatedDeterminationDtlsList = new SimulatedDeterminationDetailsList();
		MolsaSimulatedDeterminationDetailsList molsaSimulatedDeterminationDtlsList = new MolsaSimulatedDeterminationDetailsList();

		SimulatedDeterminationDtlsList = CreoleProgramRecommendationObj
				.listLatestAppliedForEligibleSimulatedDeterminations(key);
		for (SimulatedDeterminationDetails dtls : SimulatedDeterminationDtlsList.list) {
			MolsaSimulatedDeterminationDetails molsaSimulatedDeterminationDtls = new MolsaSimulatedDeterminationDetails();
			molsaSimulatedDeterminationDtls.dtls.assign(dtls);
			String date = molsaSimulatedDeterminationDtls.dtls.period
					.substring(134, 144);
			String dates[] = date.split("-");
			String one = dates[1];
			String two = dates[2];
			String finalDate = dates[0].concat(one);
			finalDate = finalDate.concat(two);
			Date fromDate = Date.getDate(finalDate);
			if (molsaSimulatedDeterminationDtls.dtls.isActionPending) {
				if ((fromDate.after(Date.getCurrentDate()))) {
					molsaSimulatedDeterminationDtls.isPDAuthorized = false;
				} else
					molsaSimulatedDeterminationDtls.isPDAuthorized = true;
			}
			molsaSimulatedDeterminationDtlsList.dtls
					.addRef(molsaSimulatedDeterminationDtls);

		}
		return molsaSimulatedDeterminationDtlsList;

	}

}
