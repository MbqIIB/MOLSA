package curam.molsa.pd.facade.impl;

import java.util.Calendar;

import com.google.inject.Inject;

import curam.core.facade.struct.MaintainCertificationKey;
import curam.core.fact.UsersFactory;
import curam.core.impl.EnvVars;
import curam.core.intf.Users;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.molsa.codetable.MOLSACERTPERIODCODE;
import curam.molsa.pd.facade.struct.MOLSACertCaseKey;
import curam.molsa.pd.facade.struct.MOLSARenewalCertDateDetails;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public class MOLSACalcCertDateRange extends
		curam.molsa.pd.facade.base.MOLSACalcCertDateRange {

	@Inject
	private CaseHeaderDAO caseHeaderDAO;
	

	public MOLSACalcCertDateRange() {
		super();
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * curam.molsa.pd.facade.intf.MOLSACalcCertDateRange#calcCertDateForRenewal
	 * (curam.core.struct.CaseKey)
	 */
	@Override
	public MOLSARenewalCertDateDetails calcCertificationDates(MOLSACertCaseKey caseKey)
			throws AppException, InformationalException {

		MOLSARenewalCertDateDetails molsaRenewalCertDateDetails = new MOLSARenewalCertDateDetails();

		String modifierRoleNames = Configuration
				.getProperty(EnvVars.ENV_MOLSA_CERTDATE_MODIFIER_ROLES);
		
		String notModifierRoleNames = Configuration
				.getProperty(EnvVars.ENV_MOLSA_CERTDATE_NOT_MODIFIER_ROLES);
		
		CaseHeader caseHeader = caseHeaderDAO.get(caseKey.caseID);

		String caseStatus = caseHeader.getStatus().getCode();

		Users usersObj = UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();

		usersKey.userName = TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		
		// check it is first record
		// New Record
		if (caseHeader.getStartDate().equals(caseHeader.getExpectedEndDate())) {
			Calendar startCalendar = caseHeader.getStartDate().getCalendar();
			 if (startCalendar.get(Calendar.DAY_OF_MONTH) < 26 ) {
				 startCalendar.set(Calendar.DAY_OF_MONTH, 1);
			 } else {
				 startCalendar.set(Calendar.DAY_OF_MONTH, 1);
				 int currentMonth = startCalendar.get(Calendar.MONTH);
				 startCalendar.set(Calendar.MONTH, currentMonth+1);
			 }
			
			 java.util.Date fromDate = startCalendar.getTime();
			 molsaRenewalCertDateDetails.fromDate = Date
						.getFromJavaUtilDate(fromDate);
			
			// Add one year start date to calculate toDate
			startCalendar.add(Calendar.YEAR, 1);
			startCalendar.add(Calendar.DATE, -1);
			java.util.Date toDate = startCalendar.getTime();
			molsaRenewalCertDateDetails.toDate = Date
					.getFromJavaUtilDate(toDate);
			
		} else {

			molsaRenewalCertDateDetails.fromDate = caseHeader.getExpectedEndDate()
					.addDays(1);
			Calendar toCalendar = caseHeader.getExpectedEndDate().getCalendar();
			toCalendar.add(Calendar.YEAR, 1);
			java.util.Date toDate = toCalendar.getTime();
			molsaRenewalCertDateDetails.toDate = Date
					.getFromJavaUtilDate(toDate);
		}
		
		molsaRenewalCertDateDetails.certPeriodCode = MOLSACERTPERIODCODE.CERTPERIOD_12MONTHS;
		
		if (modifierRoleNames.indexOf(usersDtls.roleName) >= 0 ) {
			molsaRenewalCertDateDetails.modifiableInd = true;
		} 
		
		if (notModifierRoleNames.indexOf(usersDtls.roleName) >= 0 ) {
			
			if (!caseKey.certPeriodCode.isEmpty()) {
				Calendar toCalendar = molsaRenewalCertDateDetails.fromDate.getCalendar();
				
				if (caseKey.certPeriodCode.equals(MOLSACERTPERIODCODE.CERTPERIOD_3MONTHS)) {
					toCalendar.add(Calendar.MONTH, 3);
				} else if (caseKey.certPeriodCode.equals(MOLSACERTPERIODCODE.CERTPERIOD_6MONTHS)) {
					toCalendar.add(Calendar.MONTH, 6);
				} else if (caseKey.certPeriodCode.equals(MOLSACERTPERIODCODE.CERTPERIOD_12MONTHS)) {
					toCalendar.add(Calendar.YEAR, 1);
				}
				
				toCalendar.add(Calendar.DATE, -1);
				java.util.Date toDate = toCalendar.getTime();
				molsaRenewalCertDateDetails.toDate = Date
						.getFromJavaUtilDate(toDate);
				molsaRenewalCertDateDetails.certPeriodCode = caseKey.certPeriodCode;
			}
		}
		
		return molsaRenewalCertDateDetails;
	}

	/*
	 * (non-Javadoc)
	 * @see curam.molsa.pd.facade.intf.MOLSACalcCertDateRange#calcCertModificationIndicator(curam.core.facade.struct.MaintainCertificationKey)
	 */
	@Override
	public MOLSARenewalCertDateDetails getCertModifiableInd(
			MaintainCertificationKey key) throws AppException,
			InformationalException {

		MOLSARenewalCertDateDetails molsaRenewalCertDateDetails = new MOLSARenewalCertDateDetails();
		
		String modifierRoleNames = Configuration
				.getProperty(EnvVars.ENV_MOLSA_CERTDATE_MODIFIER_ROLES);
		
		Users usersObj = UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();

		usersKey.userName = TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		
		if (modifierRoleNames.indexOf(usersDtls.roleName) >= 0 ) {
			molsaRenewalCertDateDetails.modifiableInd = true;
		}
		
		return molsaRenewalCertDateDetails;
	}

	
}
