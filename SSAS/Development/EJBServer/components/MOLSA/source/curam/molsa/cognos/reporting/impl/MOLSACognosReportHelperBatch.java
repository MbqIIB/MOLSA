package curam.molsa.cognos.reporting.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import curam.molsa.message.MOLSABPOCOGNOSREPORT;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Trace;
import curam.util.transaction.TransactionInfo;

public class MOLSACognosReportHelperBatch extends curam.molsa.cognos.reporting.base.MOLSACognosReportHelperBatch{
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
