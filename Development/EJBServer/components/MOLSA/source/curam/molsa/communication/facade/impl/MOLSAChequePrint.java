package curam.molsa.communication.facade.impl;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;

import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.ILICATEGORY;
import curam.codetable.METHODOFDELIVERY;
import curam.core.fact.InstructionLineItemFactory;
import curam.core.fact.MaintainXSLTemplateFactory;
import curam.core.fact.PaymentReceivedInstructionFactory;
import curam.core.fact.PaymentReceivedInstrumentFactory;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.intf.InstructionLineItem;
import curam.core.intf.MaintainXSLTemplate;
import curam.core.intf.PaymentReceivedInstruction;
import curam.core.intf.PaymentReceivedInstrument;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.ConcernRoleDocumentDetails;
import curam.core.struct.InstructionLineItemDtls;
import curam.core.struct.InstructionLineItemKey;
import curam.core.struct.PaymentReceivedInstructionDtls;
import curam.core.struct.PaymentReceivedInstrumentDtls;
import curam.core.struct.PaymentReceivedInstrumentKey;
import curam.core.struct.PmtRecvFinInstructionID;
import curam.core.struct.ProFormaDocumentData;
import curam.core.struct.SystemUserDtls;
import curam.core.struct.XSLTemplateIn;
import curam.core.struct.XSLTemplateReadDetails;
import curam.molsa.communication.facade.struct.MOLSAPrintChequeDetails;
import curam.molsa.communication.facade.struct.MOLSAPrintChequeKey;
import curam.molsa.message.MOLSABPOPRINTCHEQUE;
import curam.molsa.util.impl.MOLSANumberToArabic;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.internal.xml.impl.XMLPrintStreamConstants;
import curam.util.resources.Configuration;
import curam.util.resources.Locale;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Blob;
import curam.util.type.DateTime;
import curam.util.xml.impl.XMLDocument;
import curam.util.xml.impl.XMLEncodingConstants;
import curam.util.xml.impl.XMLPrintStream;

public class MOLSAChequePrint extends curam.molsa.communication.facade.base.MOLSAChequePrint{
    final long checkTemplateID= 45016;
    final int checkTemplateVersion= 1;
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
		if(!instructionLineItemDtls.deliveryMethodType.equals(METHODOFDELIVERY.CHEQUE)) {
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
		 
		 proFormaReturnDocDetails = generateAndPreviewXMLDocument(printChequeDetails);
		 proFormaReturnDocDetails.fileName="Cheque.pdf";
		return proFormaReturnDocDetails;
	}
	
	/**
	   * Generates an XML document from the specified XSL template and previews that
	   * document.
	   *
	   * @param details
	   * details of the document to be used
	   * @param data
	   * the data to be entered into the document
	   *
	   * @return the document details to be previewed
	   */
	  public ProFormaReturnDocDetails generateAndPreviewXMLDocument( MOLSAPrintChequeDetails data) throws AppException, InformationalException {

	    final curam.core.intf.SystemUser systemUserObj = curam.core.fact.SystemUserFactory.newInstance();
	    SystemUserDtls systemUserDtls;   

	    // Return type
	    final ProFormaReturnDocDetails proFormaReturnDocDetails = new ProFormaReturnDocDetails();

	    // Create Preview Stream
	    final ByteArrayOutputStream previewStream = new java.io.ByteArrayOutputStream();

	    // Create XMLPrintStream object
	    // BEGIN, CR00306943, KRK
	    final XMLPrintStream printStreamObj = new XMLPrintStream();
	    // END, CR00306943
	    final curam.util.administration.struct.XSLTemplateInstanceKey xslTemplateInstanceKey = new curam.util.administration.struct.XSLTemplateInstanceKey();

	    final MaintainXSLTemplate maintainXSLTemplateOBJ = MaintainXSLTemplateFactory.newInstance();
		final XSLTemplateIn xslTemplateIn = new XSLTemplateIn();

		xslTemplateIn.templateID = checkTemplateID;

		// BEGIN, CR00145315, SK
		xslTemplateIn.localeIdentifier = "ar";
		// END, CR00145315

		// Read the template details number.
		// BEGIN, CR00279987, KRK
		XSLTemplateReadDetails xslTemplateReadDetails = maintainXSLTemplateOBJ.readXSLTemplateDetails(
				xslTemplateIn);
	    // Set up XSL template instance
	    xslTemplateInstanceKey.templateID = checkTemplateID;
	    xslTemplateInstanceKey.templateVersion = xslTemplateReadDetails.latestVersion;

	    xslTemplateInstanceKey.locale = "ar";

	    // BEGIN, CR00408760, KRK
	    if (!Configuration.getBooleanProperty(
	      EnvVars.ENV_XMLSERVER_DISABLE_METHOD_CALLS, 
	      Configuration.getBooleanProperty(
	        EnvVars.ENV_XMLSERVER_DISABLE_METHOD_CALLS_DEFAULT))) {
	    
	     

	      printStreamObj.setPreviewStream(previewStream);
	      printStreamObj.setJobType(XMLPrintStreamConstants.kJobTypePDF);
	    
	      try {
	        // BEGIN, CR00306943, KRK
	        printStreamObj.open(xslTemplateInstanceKey);
	        // END, CR00306943

	      } catch (final AppException ex) {

	        // an error occurred - was the document not in valid XML format?
	        if (ex.getCatEntry().equals(
	          curam.util.message.CURAMXML.ERR_PRINT_STREAM_BAD_RESPONSE)) {

	          // the pro-forma form is not a valid XML document -
	          // convert this to a more meaningful message for the user
	          throw new AppException(
	            curam.message.BPOCONCERNROLEDOCUMENTGENERATION.ERR_INVALID_FORMAT_NOT_PRINTABLE,
	            ex);

	        } else {

	          // we can't do anything with it -
	          // just pass it on up to the calling method
	          throw ex;
	        }
	      }

	      // BGIN, CR00335810, MV
	      final XMLDocument documentObj = new XMLDocument(
	        printStreamObj.getStream(), XMLEncodingConstants.kEncodeUTF8);
	      // END, CR00335810

	      // Set data to print the document
	      String userName = CuramConst.gkEmpty;

	    
	        systemUserDtls = systemUserObj.getUserDetails();
	        userName = systemUserDtls.userName;
	      

	      final String generatedDate = Locale.getFormattedTime(
	        DateTime.getCurrentDateTime());

	      final String versionNo = xslTemplateReadDetails.latestVersion+"";
	      final String comments = "";

	      // Open document
	      documentObj.open(userName, generatedDate, versionNo, comments);

	      // Add data to document
	      documentObj.add(data);

	      // Close document and print stream objects
	      documentObj.close();
	      printStreamObj.close();      
	    }
	    // END, CR00408760
	    
	    proFormaReturnDocDetails.fileName = CuramConst.kProFormaDocumentPreview;
	    proFormaReturnDocDetails.fileDate = new Blob(previewStream.toByteArray());

	    return proFormaReturnDocDetails;
	  }

}
