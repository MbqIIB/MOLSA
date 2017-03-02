package curam.molsa.financial.batch.impl;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import curam.core.impl.EnvVars;
import curam.molsa.codetable.MOLSAFINANCIALBATCHTYPE;
import curam.molsa.codetable.MOLSAFINSCHEDULESTATUS;
import curam.molsa.codetable.impl.MOLSAFINANCIALBATCHTYPEEntry;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleDetails;
import curam.molsa.financial.entity.struct.MOLSAFinancialScheduleKey;
import curam.molsa.financial.facade.fact.MOLSAFinancialScheduleFactory;
import curam.molsa.financial.facade.intf.MOLSAFinancialSchedule;
import curam.molsa.financial.facade.struct.MOLSAFinancialScheduleByTypeKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.wizard.util.impl.CodetableUtil;

public abstract class MOLSAFinancialScheduleBatch extends
		curam.molsa.financial.batch.base.MOLSAFinancialScheduleBatch {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * curam.molsa.financial.batch.intf.MOLSAFinancialScheduleBatch#process()
	 */
	@Override
	public void process() throws AppException, InformationalException {

		MOLSAFinancialSchedule MOLSAFinancialScheduleObj = MOLSAFinancialScheduleFactory
				.newInstance();
		MOLSAFinancialScheduleKey key = new MOLSAFinancialScheduleKey();

		MOLSAFinancialScheduleDetails details = null;

		MOLSAFinancialScheduleByTypeKey molsaFinancialScheduleByTypeKey = new MOLSAFinancialScheduleByTypeKey();

		molsaFinancialScheduleByTypeKey.batchType = MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MAIN;

		Trace.kTopLevelLogger.info("Financial Schedule Batch ==> "
				+ molsaFinancialScheduleByTypeKey.batchType
				+ " - "
				+ CodetableUtil.getCodetableDescription(
						MOLSAFINANCIALBATCHTYPEEntry.TABLENAME,
						molsaFinancialScheduleByTypeKey.batchType));

		details = MOLSAFinancialScheduleObj
				.getCurrentMonthScheduleByBatchType(molsaFinancialScheduleByTypeKey);

		if (details != null) {
			// write to a file for MAIN job execution
			String mainBatchControlFilename = Configuration
					.getProperty(EnvVars.ENV_MOLSA_FINANCIAL_SCHEDULER_MAIN_CONTROLFILENAME);

			Trace.kTopLevelLogger
					.info("Financial Schedule Main Batch control filename is ==> "
							+ mainBatchControlFilename);

			writeToFile(mainBatchControlFilename,
					MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MAIN);
			details.batchScheduleStatus = MOLSAFINSCHEDULESTATUS.FINSCHEDULE_EXECUTED;

			if (details.molsaFinancialScheduleID == 0) {
				// No Main batch schedule exist, execute on default date
				MOLSAFinancialScheduleObj.createNewCompletedSchedule(details);
				Trace.kTopLevelLogger
						.info("Financial Schedule for Main Batch Not exist, executing on default date.");
			} else {
				// Main batch schedule exist, execute on scheduled date
				key.molsaFinancialScheduleID = details.molsaFinancialScheduleID;
				MOLSAFinancialScheduleObj.completeSchedule(key);
				Trace.kTopLevelLogger
						.info("Financial Schedule for Main Batch exist, executing on scheduled date.");
			}
		}

		// MID batch execute only on record exist
		molsaFinancialScheduleByTypeKey.batchType = MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MID;

		Trace.kTopLevelLogger.info("Financial Schedule Batch ==> "
				+ molsaFinancialScheduleByTypeKey.batchType
				+ " - "
				+ CodetableUtil.getCodetableDescription(
						MOLSAFINANCIALBATCHTYPEEntry.TABLENAME,
						molsaFinancialScheduleByTypeKey.batchType));

		details = MOLSAFinancialScheduleObj
				.getCurrentMonthScheduleByBatchType(molsaFinancialScheduleByTypeKey);

		if (details != null) {
			// write to a file for MID job execution
			String midBatchControlFilename = Configuration
					.getProperty(EnvVars.ENV_MOLSA_FINANCIAL_SCHEDULER_MID_CONTROLFILENAME);

			Trace.kTopLevelLogger
					.info("Financial Schedule Mid batch control filename is ==> "
							+ midBatchControlFilename);
			writeToFile(midBatchControlFilename,
					MOLSAFINANCIALBATCHTYPE.FINANCIALBATCH_MID);
			key.molsaFinancialScheduleID = details.molsaFinancialScheduleID;
			MOLSAFinancialScheduleObj.completeSchedule(key);
			Trace.kTopLevelLogger
					.info("Financial Schedule exist for Mid batch, executing Mid batch on scheduled date.");
		}

	}

	private void writeToFile(String fileName, String batchType) {
		try {
			File file = new File(fileName);
			FileWriter fileWriter = new FileWriter(file);
			fileWriter.write(batchType);
			fileWriter.write(": ");
			fileWriter.flush();
			fileWriter.close();
		} catch (IOException e) {
			Trace.kTopLevelLogger.error(
					"Error Occurred while writting to the file. " + e,
					e.getCause());
			e.printStackTrace();
		}
	}

}
