package curam.molsa.servicedelivery.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * This class is a wrapper for the MOLSA Service Delivery Closure batch streams.
 * 
 */
public class MOLSAServiceDeliveryClosureStreamWrapper implements BatchStream {

  private curam.molsa.servicedelivery.intf.MOLSAServiceDeliveryClosureStream molsaServiceDeliveryClosureStream;

  /**
   * This method is a constructor for the class.
   * 
   * @param molsaServiceDeliveryClosureStream2
   *          MOLSAServiceDeliveryClosureStream
   */
  public MOLSAServiceDeliveryClosureStreamWrapper(curam.molsa.servicedelivery.intf.MOLSAServiceDeliveryClosureStream molsaServiceDeliveryClosureStream2) {
    this.molsaServiceDeliveryClosureStream = molsaServiceDeliveryClosureStream2;
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
    return this.molsaServiceDeliveryClosureStream.processRecord(paramBatchProcessingID);
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
    this.molsaServiceDeliveryClosureStream.processSkippedCases(paramBatchProcessingSkippedRecordList);
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
    return this.molsaServiceDeliveryClosureStream.getChunkResult(paramInt);
  }

}
