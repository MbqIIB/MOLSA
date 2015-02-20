package curam.molsa.pdc.generator.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Bulk PDC Approve batch streams.
 * 
 */
public class MOLSABulkPDCApproveStreamWrapper implements BatchStream {

  private curam.molsa.pdc.generator.intf.MOLSABulkPDCApproveStream molsaBulkPDCApproveStream;

  /**
   * This method is a constructor for the class.
   * 
   * @param molsaBulkPDCApproveStream2
   *          MOLSABulkPDCApproveStream
   */
  public MOLSABulkPDCApproveStreamWrapper(curam.molsa.pdc.generator.intf.MOLSABulkPDCApproveStream molsaBulkPDCApproveStream2) {
    this.molsaBulkPDCApproveStream = molsaBulkPDCApproveStream2;
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
    return this.molsaBulkPDCApproveStream.processRecord(paramBatchProcessingID, (MOLSAMoiDtls) paramObject);
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
    this.molsaBulkPDCApproveStream.processSkippedCases(paramBatchProcessingSkippedRecordList);
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
    return this.molsaBulkPDCApproveStream.getChunkResult(paramInt);
  }

}
