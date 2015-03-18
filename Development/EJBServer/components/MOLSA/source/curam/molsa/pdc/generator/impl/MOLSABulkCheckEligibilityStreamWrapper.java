package curam.molsa.pdc.generator.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Bulk CheckEligibility batch streams.
 * 
 */
public class MOLSABulkCheckEligibilityStreamWrapper implements BatchStream {

  private curam.molsa.pdc.generator.intf.MOLSABulkCheckEligibilityStream molsaBulkCheckEligibilityStream;

  /**
   * This method is a constructor for the class.
   * 
   * @param molsaBulkCheckEligibilityStream2
   *          MOLSABulkCheckEligibilityStream
   */
  public MOLSABulkCheckEligibilityStreamWrapper(curam.molsa.pdc.generator.intf.MOLSABulkCheckEligibilityStream molsaBulkCheckEligibilityStream2) {
    this.molsaBulkCheckEligibilityStream = molsaBulkCheckEligibilityStream2;
  }

  /**
   * @param paramBatchProcessingID
   *          BatchProcessingID
   * @param paramObject
   *          Object
   * @return BatchProcessingSkippedRecord
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public BatchProcessingSkippedRecord processRecord(BatchProcessingID paramBatchProcessingID, Object paramObject) throws AppException, InformationalException {
    return this.molsaBulkCheckEligibilityStream.processRecord(paramBatchProcessingID);
  }

  /**
   * @param paramBatchProcessingSkippedRecordList
   *          BatchProcessingSkippedRecordList
   * @return void
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public void processSkippedCases(BatchProcessingSkippedRecordList paramBatchProcessingSkippedRecordList) throws AppException, InformationalException {
    this.molsaBulkCheckEligibilityStream.processSkippedCases(paramBatchProcessingSkippedRecordList);
  }

  /**
   * @param paramInt
   *          int
   * @return String
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  @Override
  public String getChunkResult(int paramInt) throws AppException, InformationalException {
    return this.molsaBulkCheckEligibilityStream.getChunkResult(paramInt);
  }

}
