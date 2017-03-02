package curam.molsa.financial.facade.impl;

import java.util.Calendar;

import curam.core.impl.CuramConst;
import curam.molsa.codetable.MOLSAFINSCHEDULESTATUS;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDetails;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDetailsList;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDtls;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDtlsList;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleKey;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleYearMonthTypeKey;
import curam.molsa.financial.facade.struct.MOLSAFinancialScheduleByTypeKey;
import curam.molsa.financial.facade.struct.MOLSAFinancialScheduleCreate;
import curam.molsa.financial.sl.fact.MOLSAMaintainFinancialScheduleFactory;
import curam.molsa.financial.sl.intf.MOLSAMaintainFinancialSchedule;
import curam.molsa.message.MOLSABPOFINANCIALSCHEDULE;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public abstract class MOLSAFinancialSchedule extends
		curam.molsa.financial.facade.base.MOLSAFinancialSchedule {

	@Override
	public void createNewSchedule(MOLSAFinancialScheduleCreate details)
			throws AppException, InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();

		// run date must be in future
		if (details.runDate.equals(Date.getCurrentDate())
				|| details.runDate.before(Date.getCurrentDate())) {
			// throw exception
			final AppException appException = new AppException(
					MOLSABPOFINANCIALSCHEDULE.ERR_FIN_SCHEDULE_RUNDATE_MUST_INFUTURE);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}

		// check if entry exist for new entry year, month, batch type and
		// status.
		if (isRecordExist(details)) {
			// throw exception
			final AppException appException = new AppException(
					MOLSABPOFINANCIALSCHEDULE.ERR_FIN_SCHEDULE_EXISTS);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}

		slObj.createNewSchedule(details);
	}

	@Override
	public void createNewCompletedSchedule(MOLSAFinancialScheduleDetails details)
			throws AppException, InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();

		slObj.createNewCompletedSchedule(details);

	}

	@Override
	public void cancelSchedule(MOLSAFinancialScheduleKey key)
			throws AppException, InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();

		// Validate - record is in Active Status
		// If status is Cancel or Completed, throw exception
		MOLSAFinancialScheduleDtls dtls = slObj.readScheduleByID(key);

		if (dtls.batchScheduleStatus
				.equals(MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED)) {
			// Exception
			final AppException appException = new AppException(
					MOLSABPOFINANCIALSCHEDULE.ERR_FIN_SCHEDULE_EXISTS);

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							appException,
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetThree,
							0);
			TransactionInfo.getInformationalManager().failOperation();
		}

		if (dtls.batchScheduleStatus
				.equals(MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE)) {
			slObj.cancelSchedule(key);
		}
	}

	@Override
	public void completeSchedule(MOLSAFinancialScheduleKey key)
			throws AppException, InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();
		slObj.completeSchedule(key);
	}

	@Override
	public MOLSAFinancialScheduleDtlsList listSchedule() throws AppException,
			InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();
		MOLSAFinancialScheduleDtlsList result = slObj.listSchedule();
		return result;
	}

	@Override
	public MOLSAFinancialScheduleDetails getCurrentMonthScheduleByBatchType(
			MOLSAFinancialScheduleByTypeKey key) throws AppException,
			InformationalException {

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleDetails result = slObj
				.getCurrentMonthScheduleByBatchType(key);

		return result;
	}

	protected Boolean isRecordExist(MOLSAFinancialScheduleCreate details)
			throws AppException, InformationalException {

		Boolean recordExist = false;

		MOLSAMaintainFinancialSchedule slObj = MOLSAMaintainFinancialScheduleFactory
				.newInstance();

		MOLSAFinancialScheduleYearMonthTypeKey key = new MOLSAFinancialScheduleYearMonthTypeKey();

		Calendar rubCalendar = details.runDate.getCalendar();

		key.runYear = rubCalendar.get(Calendar.YEAR);
		key.runYear = rubCalendar.get(Calendar.MONTH);
		key.batchType = details.batchType;

		MOLSAFinancialScheduleDetailsList list = slObj
				.searchByYearMonthAndType(key);

		for (MOLSAFinancialScheduleDetails dtls : list.dtls) {
			if (dtls.batchScheduleStatus
					.equals(MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED)
					|| dtls.batchScheduleStatus
							.equals(MOLSAFINSCHEDULESTATUS.FINSCHEDULE_ACTIVE)) {
				recordExist = true;
				Trace.kTopLevelLogger
						.warn("The same Month Financial Schedule exist for provided date month.");
				break;
			}
		}

		return recordExist;
	}

}
