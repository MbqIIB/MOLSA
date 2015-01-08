package curam.molsa.ip.batch.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.ip.entity.struct.MOLSAInformationProviderTmpDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAInformationProviderBatchStreamWrapper implements BatchStream {

  private curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream molsaInformationProviderBatchStream;

  public MOLSAInformationProviderBatchStreamWrapper(curam.molsa.ip.batch.intf.MOLSAInformationProviderBatchStream molsaInformationProviderBatchStream2) {
    this.molsaInformationProviderBatchStream = molsaInformationProviderBatchStream2;
  }

  @Override
  public BatchProcessingSkippedRecord processRecord(BatchProcessingID paramBatchProcessingID, Object paramObject) throws AppException, InformationalException {
    return this.molsaInformationProviderBatchStream.processRecord(paramBatchProcessingID, (MOLSAInformationProviderTmpDtls) paramObject);
  }

  @Override
  public void processSkippedCases(BatchProcessingSkippedRecordList paramBatchProcessingSkippedRecordList) throws AppException, InformationalException {
    this.molsaInformationProviderBatchStream.processSkippedCases(paramBatchProcessingSkippedRecordList);

  }

  @Override
  public String getChunkResult(int paramInt) throws AppException, InformationalException {
    return this.molsaInformationProviderBatchStream.getChunkResult(paramInt);
  }

}
