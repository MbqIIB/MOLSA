package curam.molsa.pdc.generator.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Bulk PDC Generator batch streams.
 * 
 */
public class MOLSABulkPDCGeneratorStreamWrapper implements BatchStream {

  private curam.molsa.pdc.generator.intf.MOLSABulkPDCGeneratorStream molsaBulkPDCGeneratorStream;

  /**
   * This method is a constructor for the class.
   * 
   * @param molsaBulkPDCGeneratorStream2
   *          MOLSABulkPDCGeneratorStream
   */
  public MOLSABulkPDCGeneratorStreamWrapper(curam.molsa.pdc.generator.intf.MOLSABulkPDCGeneratorStream molsaBulkPDCGeneratorStream2) {
    this.molsaBulkPDCGeneratorStream = molsaBulkPDCGeneratorStream2;
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
    return this.molsaBulkPDCGeneratorStream.processRecord(paramBatchProcessingID);
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
    this.molsaBulkPDCGeneratorStream.processSkippedCases(paramBatchProcessingSkippedRecordList);
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
    return this.molsaBulkPDCGeneratorStream.getChunkResult(paramInt);
  }

}
