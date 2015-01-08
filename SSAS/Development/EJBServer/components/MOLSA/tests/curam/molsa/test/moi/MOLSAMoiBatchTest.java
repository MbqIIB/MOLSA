package curam.molsa.test.moi;

import java.util.ArrayList;

import antlr.collections.List;
import curam.core.facade.struct.PersonRegistrationDetails;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.molsa.moi.base.MOLSAMoiBatchStream;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.fact.MOLSAMoiBatchStreamFactory;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

public class MOLSAMoiBatchTest extends CuramServerTest {

	public MOLSAMoiBatchTest(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}
 
	public void process() throws AppException, InformationalException{
		MOLSAParticipantHelper participantHelerObj = new MOLSAParticipantHelper();
		curam.core.struct.PersonRegistrationDetails person1Details =  participantHelerObj.getMOIDetailsByQID("12345678901");
		curam.molsa.moi.intf.MOLSAMoiBatchStream molsaBatchStream = MOLSAMoiBatchStreamFactory.newInstance();
		curam.molsa.moi.intf.MOLSAMoiBatchStream molsaBatchStream2 = MOLSAMoiBatchStreamFactory.newInstance();
		ArrayList<BatchProcessingID> batchIdArray = new ArrayList<BatchProcessingID>();
		BatchProcessingID batchId = new BatchProcessingID();
		batchId.recordID = 12345678901L;
		//12345678914L not registered as a person
		BatchProcessingID batchId2 = new BatchProcessingID();
		batchId2.recordID = 12345678937L;
		batchIdArray.add(batchId);
		batchIdArray.add(batchId2);

		MOLSAMoiDtls dtls = new MOLSAMoiDtls();
		MOLSAMoiDtls dtls2 = new MOLSAMoiDtls();
		BatchProcessingSkippedRecord skippedRecordDtls = molsaBatchStream.processRecord(batchIdArray.get(0), dtls);
		assertEquals(0, skippedRecordDtls.recordID);
		BatchProcessingSkippedRecord skippedRecordDtls2 = molsaBatchStream2.processRecord(batchIdArray.get(1), dtls2);
		assertEquals(12345678937L, skippedRecordDtls2.recordID);	
	}

	
}
