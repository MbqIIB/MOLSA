package curam.molsa.financial.sl.impl;

import java.util.Calendar;

import curam.codetable.FINCALENDAREXCLUSIONREASON;
import curam.codetable.METHODOFDELIVERY;
import curam.core.facade.fact.OrganizationFactory;
import curam.core.facade.intf.Organization;
import curam.core.facade.struct.AddExclusionDateKey;
import curam.core.fact.MaintainExclusionDateFactory;
import curam.core.impl.EnvVars;
import curam.core.intf.MaintainExclusionDate;
import curam.core.struct.ExclusionDatesSummary;
import curam.molsa.codetable.MOLSAFINANCIALBATCHTYPE;
import curam.molsa.codetable.MOLSAFINSCHEDULESTATUS;
import curam.molsa.codetable.impl.MOLSAFINANCIALBATCHTYPEEntry;
import curam.molsa.financial.entity.fact.MOLSAFinancialScheduleFactory;
import curam.molsa.financial.entity.intf.MOLSAFinancialSchedule;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDetails;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDetailsList;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDtls;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDtlsList;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleKey;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleYearMonthTypeKey;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleYearMonthTypeStatus;
import curam.molsa.financial.facade.struct.MOLSAFinancialScheduleByTypeKey;
import curam.molsa.financial.facade.struct.MOLSAFinancialScheduleCreate;
import curam.util.dataaccess.ReadmultiOperation;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;
import curam.util.type.NotFoundIndicator;
import curam.wizard.util.impl.CodetableUtil;

public abstract class MOLSAMaintainFinancialSchedule extends
		curam.molsa.financial.sl.base.MOLSAMaintainFinancialSchedule {

	/**
	 * This method will create new entry in MOLSAFinancialSchedule table. If
	 * entry active entry exist then this method will throw AppException with
	 * message.
	 * 
	 * @param MOLSAFinancialScheduleCreate
	 *            runDate batchType batchScheduleStatus
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public void createNewSchedule(MOLSAFinancialScheduleCreate details)
			throws AppException, InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDtls createDtls = new MOLSAFinancialScheduleDtls();

		createDtls.batchType = details.batchType;
		createDtls.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE;
		createDtls.runDate = details.runDate;

		Calendar runCalendar = details.runDate.getCalendar();

		createDtls.runYear = runCalendar.get(Calendar.YEAR);
		createDtls.runMonth = runCalendar.get(Calendar.MONTH);

		if (details.batchType
				.equals(MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MAIN)) {

			addFinancialExclusion(details.runDate);

		}

		entityObj.insert(createDtls);
	}


	/**
	 * This method will create new entry in MOLSAFinancialSchedule table with
	 * batch type and status of Executed.
	 * 
	 * @param MOLSAFinancialScheduleDetails
	 *            runDate batchType batchScheduleStatus
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public void createNewCompletedSchedule(MOLSAFinancialScheduleDetails details)
			throws AppException, InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDtls createDtls = new MOLSAFinancialScheduleDtls();

		createDtls.batchType = details.batchType;
		createDtls.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED;
		createDtls.runDate = details.runDate;

		Calendar rubCalendar = details.runDate.getCalendar();

		createDtls.runYear = rubCalendar.get(Calendar.YEAR);
		createDtls.runYear = rubCalendar.get(Calendar.MONTH);

		entityObj.insert(createDtls);

	}

	/**
	 * This method will update of provided ids entry in MOLSAFinancialSchedule
	 * table with status of Canceled.
	 * 
	 * @param MOLSAFinancialScheduleDetails
	 *            MOLSAFinancialScheduleID
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public void cancelSchedule(MOLSAFinancialScheduleKey key)
			throws AppException, InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDtls cancelDtls = new MOLSAFinancialScheduleDtls();

		NotFoundIndicator nfIndicator = new NotFoundIndicator();

		cancelDtls = entityObj.read(nfIndicator, key);

		if (!nfIndicator.isNotFound()) {
			cancelDtls.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_CANCEL;

			if (cancelDtls.batchType
					.equals(MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MAIN)) {

				// Remove Financial Schedule Exclusion
				Date exclusionToDate = getDefaultDate(cancelDtls.runDate)
						.addDays(2);

				ExclusionDatesSummary exclusionDatesSummary = new ExclusionDatesSummary();

				exclusionDatesSummary.dateFrom = cancelDtls.runDate.addDays(1);
				exclusionDatesSummary.dateTo = exclusionToDate;
				exclusionDatesSummary.deliveryMethodType = METHODOFDELIVERY.EFT;
				exclusionDatesSummary.reasonCode = FINCALENDAREXCLUSIONREASON.OFFICECLOSED;

				if (exclusionDatesSummary.dateTo
						.after(exclusionDatesSummary.dateFrom)) {
					MaintainExclusionDate maintainExclusionDateObj = MaintainExclusionDateFactory
							.newInstance();
					maintainExclusionDateObj
							.removeExclusionDate(exclusionDatesSummary);
				}

			}

			entityObj.modify(key, cancelDtls);
		}

	}

	/**
	 * This method will update of provided ids entry in MOLSAFinancialSchedule
	 * table with status of Executed.
	 * 
	 * @param MOLSAFinancialScheduleDetails
	 *            MOLSAFinancialScheduleID
	 * @return
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public void completeSchedule(MOLSAFinancialScheduleKey key)
			throws AppException, InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDtls completelDtls = new MOLSAFinancialScheduleDtls();

		NotFoundIndicator nfIndicator = new NotFoundIndicator();

		completelDtls = entityObj.read(nfIndicator, key);

		if (!nfIndicator.isNotFound()) {

			completelDtls.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED;

			entityObj.modify(key, completelDtls);
		}
	}

	/**
	 * This method will retrieve records from MOLSAFinancialSchedule with run
	 * date after current date subtracting 365 days.
	 * 
	 * @param
	 * 
	 * @return List of MOLSAFinancialScheduleDtls
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public MOLSAFinancialScheduleDtlsList listSchedule() throws AppException,
			InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();
		final MOLSAFinancialScheduleDtlsList list = new MOLSAFinancialScheduleDtlsList();

		entityObj.readAll(new ReadmultiOperation<MOLSAFinancialScheduleDtls>() {

			@Override
			public boolean operation(MOLSAFinancialScheduleDtls dtls)
					throws AppException, InformationalException {

				if (dtls.runDate.after(TransactionInfo.getSystemDate().addDays(-365))) {
					list.dtls.add(dtls);
					//return true;
				}

				return true;
			}
		});

		return list;
	}

	/**
	 * This method will retrieve entry from MOLSAFinancialSchedule table with
	 * run date is current date. If entry not found the returns null
	 * 
	 * @param MOLSAFinancialScheduleByTypeKey
	 *            batchType
	 * @return MOLSAFinancialScheduleDetails
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public MOLSAFinancialScheduleDetails getCurrentMonthScheduleByBatchType(
			MOLSAFinancialScheduleByTypeKey key) throws AppException,
			InformationalException {

		Boolean isRunDay = false;
		
		Boolean defaultMainBatchExecutionDay = false;
		Boolean defaultMidBatchExecutionDay = false;

		MOLSAFinancialScheduleDetails details = null;
		
		Integer midBatchDefaultRunDay = Configuration
				.getIntProperty(EnvVars.ENV_MOLSA_FINANCIAL_SCHEDULER_MIDBATCH_DEFAULTRUNDAY);
		
		Integer mainBatchDefaultRunDay = Configuration
				.getIntProperty(EnvVars.ENV_MOLSA_FINANCIAL_SCHEDULER_MAINBATCH_DEFAULTRUNDAY);
		
		Date processingDate = TransactionInfo.getSystemDate();
		
		if (processingDate.getCalendar().get(Calendar.DAY_OF_MONTH) == mainBatchDefaultRunDay ) {
			defaultMainBatchExecutionDay = true;
		}
		
		if (processingDate.getCalendar().get(Calendar.DAY_OF_MONTH) == midBatchDefaultRunDay ) {
			defaultMidBatchExecutionDay = true;
		}
		

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		Calendar currentCalendar = processingDate.getCalendar();

		MOLSAFinancialScheduleYearMonthTypeStatus yearMonthTypeStatusKey = new MOLSAFinancialScheduleYearMonthTypeStatus();

		yearMonthTypeStatusKey.batchType = key.batchType;
		yearMonthTypeStatusKey.runYear = currentCalendar.get(Calendar.YEAR);
		yearMonthTypeStatusKey.runMonth = currentCalendar.get(Calendar.MONTH);
		yearMonthTypeStatusKey.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE;

		MOLSAFinancialScheduleDetailsList detailsList = entityObj.readByYearMonthTypeAndStatus(
				yearMonthTypeStatusKey);
		
		for (MOLSAFinancialScheduleDetails financialScheduleDetails: detailsList.dtls) {
			
			if (financialScheduleDetails.runDate.equals(processingDate)) {
				details = financialScheduleDetails;
				break;
			}
		}

		if (key.batchType.equals(MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MAIN)) {

			//Date defaultDate = getDefaultDate(processingDate);

			if (details != null) {
				// Active Record Found
				// Execute Job
				isRunDay = true;
				Trace.kTopLevelLogger
						.info("Financial Schedule Main Batch record exist for current date.");
			} else {
				// If Active Record Not Found then check for Executed
				yearMonthTypeStatusKey.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED;
				MOLSAFinancialScheduleDetailsList executedDetailsList = entityObj
						.readByYearMonthTypeAndStatus(yearMonthTypeStatusKey);

				yearMonthTypeStatusKey.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE;
				MOLSAFinancialScheduleDetailsList activeDetailsList = entityObj
						.readByYearMonthTypeAndStatus(yearMonthTypeStatusKey);
				
				
				if (executedDetailsList.dtls.isEmpty() && activeDetailsList.dtls.isEmpty()
						&& defaultMainBatchExecutionDay) {

					details = new MOLSAFinancialScheduleDetails();
					details.batchType = key.batchType;
					details.runDate = TransactionInfo.getSystemDate();
					details.runYear = currentCalendar.get(Calendar.YEAR);
					details.runMonth = currentCalendar.get(Calendar.MONTH);

					isRunDay = true;
					
					// Add Financial Exclusion
					addFinancialExclusion(details.runDate);
					
					Trace.kTopLevelLogger
							.info("Financial Schedule Main Batch record not exist and today is default date.");
				}
			}

		} else { // MID batch
			if (details != null) {
				// Active Record Found
				if (details.runDate.equals(processingDate)) {
					// Execute Job
					isRunDay = true;
					Trace.kTopLevelLogger
							.info("Financial Schedule Mid Batch record exist for current date.");
				} 
			} else {
				// If Active Record Not Found then check for Executed
				yearMonthTypeStatusKey.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE;
				detailsList = entityObj
						.readByYearMonthTypeAndStatus(yearMonthTypeStatusKey);

				if (detailsList.dtls.isEmpty()
						&& defaultMidBatchExecutionDay) {
					details = new MOLSAFinancialScheduleDetails();
					details.batchType = key.batchType;
					details.runDate = TransactionInfo.getSystemDate();
					details.runYear = currentCalendar.get(Calendar.YEAR);
					details.runMonth = currentCalendar.get(Calendar.MONTH);

					isRunDay = true;
					Trace.kTopLevelLogger
							.info("Financial Schedule Mid Batch record not exist and today is default date.");
				}
			}
		}

		if (!isRunDay) {
			details = null;
			Trace.kTopLevelLogger.info("There is no Financial Schedule for "
					+ key.batchType
					+ " - "
					+ CodetableUtil.getCodetableDescription(
							MOLSAFINANCIALBATCHTYPEEntry.TABLENAME,
							key.batchType) + " to execute today.");
		}

		return details;
	}

	/**
	 * This method will retrieve entries from MOLSAFinancialSchedule table with
	 * matching run year, run month and batch type.
	 * 
	 * @param MOLSAFinancialScheduleByTypeKey
	 *            batchType runYear runMonth
	 * @return list of MOLSAFinancialScheduleDetails.
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public MOLSAFinancialScheduleDetailsList searchByYearMonthAndType(
			MOLSAFinancialScheduleYearMonthTypeKey key) throws AppException,
			InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDetailsList list = entityObj
				.searchByYearMonthAndType(key);

		return list;
	}

	/**
	 * This method will retrieve entries from MOLSAFinancialSchedule table with
	 * matching key field MOLSAFinancialScheduleID.
	 * 
	 * @param MOLSAFinancialScheduleKey
	 *            MOLSAFinancialScheduleID
	 * 
	 * @return MOLSAFinancialScheduleDtls.
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public MOLSAFinancialScheduleDtls readScheduleByID(
			MOLSAFinancialScheduleKey key) throws AppException,
			InformationalException {

		MOLSAFinancialSchedule entityObj = MOLSAFinancialScheduleFactory
				.newInstance();

		NotFoundIndicator nfIndicator = new NotFoundIndicator();
		MOLSAFinancialScheduleDtls dtls = entityObj.read(nfIndicator, key);

		return dtls;
	}

	// The default date will be calculated by subtracting the off set(16) from Delivery date 
	private Date getDefaultDate(Date runDate) throws AppException,
			InformationalException {

		Calendar runCalendar = runDate.getCalendar();

		int numDays;

		Integer offSetDays = Configuration
				.getIntProperty(EnvVars.ENV_MOLSA_FINANCIAL_SCHEDULER_OFFSETDAYS);

		Trace.kTopLevelLogger.info("Financial Schedule off set days ==> "
				+ offSetDays);

		// Add one day for the First day of every month (next month) 
		//  which is the delivery date as per Delivery Frequency pattern.
		numDays = runCalendar.getActualMaximum(Calendar.DAY_OF_MONTH) + 1;

		int runDay = numDays - offSetDays.intValue();

		runCalendar.set(Calendar.DAY_OF_MONTH, runDay);

		java.util.Date defaultDate = runCalendar.getTime();

		Trace.kTopLevelLogger
				.info("Financial Schedule Default date calculated ==> "
						+ defaultDate);

		return Date.getFromJavaUtilDate(defaultDate);
	}
	
	/**
	 * @param details
	 * @throws AppException
	 * @throws InformationalException
	 */
	private void addFinancialExclusion(Date runDate) throws AppException,
			InformationalException {

		Date exclusionToDate = getDefaultDate(runDate);

		if (exclusionToDate.after(runDate)) {

			// Add Financial Schedule Exclusion
			AddExclusionDateKey addExclusionDateKey = new AddExclusionDateKey();
			addExclusionDateKey.exclusionDatesSummary.dateFrom = runDate
					.addDays(1);
			addExclusionDateKey.exclusionDatesSummary.dateTo = exclusionToDate
					.addDays(2);
			addExclusionDateKey.exclusionDatesSummary.deliveryMethodType = METHODOFDELIVERY.EFT;
			addExclusionDateKey.exclusionDatesSummary.reasonCode = FINCALENDAREXCLUSIONREASON.OFFICECLOSED;
			addExclusionDateKey.prePaymentIndicator.prePmtIndicator = true;

			if (addExclusionDateKey.exclusionDatesSummary.dateTo
					.after(addExclusionDateKey.exclusionDatesSummary.dateFrom)) {
				Organization organizationObj = OrganizationFactory
						.newInstance();
				organizationObj.addEFTExclusionDate(addExclusionDateKey);
			}

		}
	}

}
