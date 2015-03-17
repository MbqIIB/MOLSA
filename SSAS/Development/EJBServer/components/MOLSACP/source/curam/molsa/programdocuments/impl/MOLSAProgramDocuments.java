/**
 * 
 */
package curam.molsa.programdocuments.impl;

import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.programdocuments.struct.MOLSADocumentService;
import curam.molsa.programdocuments.struct.MOLSADocumentServiceKey;
import curam.molsa.programdocuments.struct.MOLSAProgramDocumentDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.impl.PropertiesResourceCache;

/**
 *
 * 
 */
public class MOLSAProgramDocuments extends
		curam.molsa.programdocuments.base.MOLSAProgramDocuments {

	@Override
	public MOLSAProgramDocumentDetails readDocuments() throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		MOLSAProgramDocumentDetails molsaProgramDocumentDetails = new MOLSAProgramDocumentDetails();
		//molsaProgramDocumentDetails.document.
		return molsaProgramDocumentDetails;
	}

	@Override
	public MOLSADocumentService getDocumentMessageText(
			MOLSADocumentServiceKey key) throws AppException,
			InformationalException {
		curam.molsa.programdocuments.struct.MOLSADocumentService text = new MOLSADocumentService();
		StringBuffer stringBuffer = new StringBuffer();
	    stringBuffer.append(key.template);
		text.documentText=PropertiesResourceCache.getInstance().getProperty(MOLSAConstants.kMegaMenuPropertyFile, stringBuffer.toString());
		return text;
	}

}
