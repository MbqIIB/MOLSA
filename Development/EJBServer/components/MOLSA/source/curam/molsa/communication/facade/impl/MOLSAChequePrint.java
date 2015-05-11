package curam.molsa.communication.facade.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;

import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.ILICATEGORY;
import curam.core.fact.InstructionLineItemFactory;
import curam.core.fact.PaymentReceivedInstructionFactory;
import curam.core.fact.PaymentReceivedInstrumentFactory;
import curam.core.impl.EnvVars;
import curam.core.intf.InstructionLineItem;
import curam.core.intf.PaymentReceivedInstruction;
import curam.core.intf.PaymentReceivedInstrument;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.InstructionLineItemDtls;
import curam.core.struct.InstructionLineItemKey;
import curam.core.struct.PaymentReceivedInstructionDtls;
import curam.core.struct.PaymentReceivedInstrumentDtls;
import curam.core.struct.PaymentReceivedInstrumentKey;
import curam.core.struct.PmtRecvFinInstructionID;
import curam.molsa.communication.facade.struct.MOLSAPrintChequeDetails;
import curam.molsa.communication.facade.struct.MOLSAPrintChequeKey;
import curam.molsa.message.MOLSABPOPRINTCHEQUE;
import curam.molsa.util.impl.MOLSANumberToArabic;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;

public class MOLSAChequePrint extends curam.molsa.communication.facade.base.MOLSAChequePrint{

	@Override
	public ProFormaReturnDocDetails printCheque(MOLSAPrintChequeKey arg1)
			throws AppException, InformationalException {
		ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();
		MOLSAPrintChequeDetails printChequeDetails = new MOLSAPrintChequeDetails();
		InstructionLineItem  instructionLineItemObj= InstructionLineItemFactory.newInstance();
		InstructionLineItemKey instructionLineItemKey = new InstructionLineItemKey();
		instructionLineItemKey.instructLineItemID = arg1.instructionLineItemID;
		InstructionLineItemDtls instructionLineItemDtls =  instructionLineItemObj.read(instructionLineItemKey);
		if(!instructionLineItemDtls.instructLineItemCategory.equals(ILICATEGORY.PAYMENTRECEIVEDINSTRUCTION)) {
			throw new AppException(MOLSABPOPRINTCHEQUE.ERR_PRINT_ALLOWED_ONLY_FOR_PAYMENT_RECEIVED);
		}
		
		PaymentReceivedInstruction paymentReceivedInstructionObj = PaymentReceivedInstructionFactory.newInstance();
		PmtRecvFinInstructionID pmtRecvFinInstructionID = new PmtRecvFinInstructionID();
		pmtRecvFinInstructionID.finInstructionID=instructionLineItemDtls.finInstructionID;
		PaymentReceivedInstructionDtls paymentReceivedInstructionDtls = 
			paymentReceivedInstructionObj.readByFinInstructionID(pmtRecvFinInstructionID);
		
		PaymentReceivedInstrument paymentReceivedInstrumentObj = PaymentReceivedInstrumentFactory.newInstance();
		PaymentReceivedInstrumentKey paymentReceivedInstrumentKey = new PaymentReceivedInstrumentKey();
		paymentReceivedInstrumentKey.pmtRecInstrumentID=paymentReceivedInstructionDtls.pmtRecInstrumentID;
		PaymentReceivedInstrumentDtls paymentReceivedInstrumentDtls = paymentReceivedInstrumentObj.read(paymentReceivedInstrumentKey);
		printChequeDetails.checkNumber=String.valueOf(paymentReceivedInstrumentDtls.receiptNumber);
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		printChequeDetails.accountDateString = dateFormat.format(instructionLineItemDtls.creationDate.getCalendar().getTime());
		printChequeDetails.beneficiaryName=MOLSAParticipantHelper
		.returnAlternateName(paymentReceivedInstrumentDtls.concernRoleID, ALTERNATENAMETYPE.REGISTERED);
		
		printChequeDetails.checkAmount=instructionLineItemDtls.amount;
		 BigDecimal bigDecimal = new BigDecimal(instructionLineItemDtls.amount.getValue());
		 printChequeDetails.checkAmountInWords = MOLSANumberToArabic.convertToArabic(bigDecimal,"QAR"); 
		 proFormaReturnDocDetails.fileName="Cheque.pdf";
		return proFormaReturnDocDetails;
	}

}
