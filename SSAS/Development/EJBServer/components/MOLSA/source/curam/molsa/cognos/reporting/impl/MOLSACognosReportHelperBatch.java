package curam.molsa.cognos.reporting.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import curam.molsa.message.MOLSABPOCOGNOSREPORT;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;

/**
 * THIS BATCH IS NOT USED FOR CURAM
 * This is used to populate the payment details into the Cognos Staging Table using a view.
 *
 */
public class MOLSACognosReportHelperBatch extends curam.molsa.cognos.reporting.base.MOLSACognosReportHelperBatch{
  
  /**
   * The batch api to populate the details into the Cognos staging table.
   */
  @Override
  public void process() throws AppException, InformationalException {
    String sql = " INSERT INTO MOLSACognosPaymentDetails SELECT * FROM VW_ MOLSAPAYMENTDETAILS" ; 
    try {
      PreparedStatement stmt = TransactionInfo.getInfo().getInfoConnection().prepareStatement(sql);
      stmt.executeQuery();
    } catch (SQLException e) {
      Trace.kTopLevelLogger.error(
          "Error Occurred while inseting the records to MOLSACognosPaymentDetails . " + e, e.getCause());
      throw new AppException(MOLSABPOCOGNOSREPORT.ERR_WHILE_INSERTING_COGNOS_TABLE);
    }
    
  }

}
