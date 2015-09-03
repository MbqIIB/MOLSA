package curam.molsa.cognos.reporting.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import curam.core.sl.struct.BooleanIndicator;
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
  public void process(BooleanIndicator isMidRun) throws AppException, InformationalException {
    String midRunSql1 = " INSERT INTO MOLSAPAYMENTFLAG SELECT MAX(EFFECTIVEDATE) , 2 FROM PAYMENTINSTRUMENT" ; 
    //String midRunSql2 = " INSERT INTO MOLSACognosPaymentDetails SELECT * FROM VW_MOLSAPAYMENTDETAILS" ; 
    
    String normalRunSql1 = " INSERT INTO MOLSAPAYMENTFLAG SELECT MAX(EFFECTIVEDATE) , 1 FROM PAYMENTINSTRUMENT" ; 
    String normalRunSql2 = " INSERT INTO MOLSACOGNOSPAYMENTDETAILS SELECT * FROM VW_MOLSAPAYMENT_OTHER" ; 
    try {
      PreparedStatement stmt1 = null;
      PreparedStatement stmt2 = null;
      if(isMidRun.flag) {
    	  System.out.println("For Mid Run Batch -flag is set to true");
    	  stmt1 = TransactionInfo.getInfo().getInfoConnection().prepareStatement(midRunSql1);
    	  //stmt2 = TransactionInfo.getInfo().getInfoConnection().prepareStatement(midRunSql2);
    	  stmt1.executeQuery();
      } else {
    	  System.out.println("For Main Run Batch - flag is Not set");
    	  stmt1 = TransactionInfo.getInfo().getInfoConnection().prepareStatement(normalRunSql1);
    	  stmt2 = TransactionInfo.getInfo().getInfoConnection().prepareStatement(normalRunSql2);
    	  stmt1.executeQuery();
    	  stmt2.executeQuery();
      }
      
      
    } catch (SQLException e) {
      Trace.kTopLevelLogger.error(
          "Error Occurred while inseting the records to MOLSACognosPaymentDetails . " + e, e.getCause());
      throw new AppException(MOLSABPOCOGNOSREPORT.ERR_WHILE_INSERTING_COGNOS_TABLE);
    }
    
  }



}
