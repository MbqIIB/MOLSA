package curam.molsa.moi.impl;

import curam.core.impl.BatchStream;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.intf.MOLSAMoiBatchStream;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAMoiBatchStreamWrapper implements BatchStream {

	  private MOLSAMoiBatchStream molsaMoiBatchStream;

	  public MOLSAMoiBatchStreamWrapper(MOLSAMoiBatchStream molsaMoiBatchStream2) {
	    this.molsaMoiBatchStream = molsaMoiBatchStream2;
	  }

	  @Override
	  public BatchProcessingSkippedRecord processRecord(BatchProcessingID paramBatchProcessingID, Object paramObject) throws AppException, InformationalException {
	    return this.molsaMoiBatchStream.processRecord(paramBatchProcessingID, (MOLSAMoiDtls) paramObject);
	  }

	  @Override
	  public void processSkippedCases(BatchProcessingSkippedRecordList paramBatchProcessingSkippedRecordList) throws AppException, InformationalException {
	    this.molsaMoiBatchStream.processSkippedCases(paramBatchProcessingSkippedRecordList);

	  }

	  @Override
	  public String getChunkResult(int paramInt) throws AppException, InformationalException {
	    return this.molsaMoiBatchStream.getChunkResult(paramInt);
	  }

	}
