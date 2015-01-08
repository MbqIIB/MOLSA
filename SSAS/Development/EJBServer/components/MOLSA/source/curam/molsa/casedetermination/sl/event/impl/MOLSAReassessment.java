package curam.molsa.casedetermination.sl.event.impl;

import org.xml.sax.SAXException;

import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.util.exception.AppException;
import curam.util.exception.AppRuntimeException;
import curam.util.exception.InformationalException;

/**
 * Reassessment processing for CREOLE Product Deliveries.
 * 
 */
public final class MOLSAReassessment {

  /**
   * Post reassessment processing for CREOLE-enabled Social Assistance product
   * deliveries.
   * 
   * @param productDelivery
   *          The product delivery
   * 
   * @throws AppException
   * @throws InformationalException
   */
  public void postReassessmentProcessing(final ProductDelivery productDelivery)
      throws AppException, InformationalException {

    
    /*
     * Map unit information to case groups entity
     */
    try {
      final MOLSACaseGroupsMaintainer molsaCaseGroupsMaintainer = new MOLSACaseGroupsMaintainer(
          productDelivery);

      molsaCaseGroupsMaintainer.maintainCaseGroups();

    } catch (SAXException e) {
      throw new AppRuntimeException(e);
    }
  }

}
