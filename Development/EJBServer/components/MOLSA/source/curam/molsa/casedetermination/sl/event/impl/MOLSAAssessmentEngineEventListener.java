package curam.molsa.casedetermination.sl.event.impl;

import com.google.inject.Inject;

import curam.core.fact.CachedProductDeliveryFactory;
import curam.core.fact.CachedProductFactory;
import curam.core.impl.ProductHookManager;
import curam.core.intf.ReviewGeneratedDecisions;
import curam.core.sl.infrastructure.assessment.event.impl.AssessmentEngineEvent;
import curam.core.sl.infrastructure.product.creole.impl.CREOLEProductAccessorDAO;
import curam.core.struct.CompleteDecisionCreationList;
import curam.core.struct.CreateDecisionsAndComponentsResultDtls;
import curam.core.struct.DetermineEligibilityKey;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDtls;
import curam.core.struct.ProductKey;
import curam.core.struct.ReassessmentResult;
import curam.piwrapper.caseconfiguration.impl.Product;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * An event listener for the {@link AssessmentEngineEvent} class.
 */
public class MOLSAAssessmentEngineEventListener extends AssessmentEngineEvent {

  @Inject
  private ProductDeliveryDAO productDeliveryDAO;

  @Inject
  private CREOLEProductAccessorDAO creoleProductAccessorDAO;

  @Inject
  private MOLSAReassessment creoleReassessment;

  /**
   * This method is called after the new decision details have been stored.
   * Custom code wishing to store or link the old and new decisions can do so by
   * overriding this hook and providing an alternative implementation.
   *
   * @param newCaseDecisions
   * the list of new decisions made for this case
   * @param existingCaseDecisions
   * the list of existing decisions for the case
   *
   * @throws InformationalException
   * Generic Exception Signature.
   * @throws AppException
   * Generic Exception Signature.
   */

  @Override
  @SuppressWarnings("deprecation")
  public void postInsertExamineDecisions(
      CompleteDecisionCreationList newCaseDecisions,
      CompleteDecisionCreationList existingCaseDecisions) throws AppException,
      InformationalException {

    if (!newCaseDecisions.dtls.isEmpty()) {

      // Get the product delivery details
      ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
      productDeliveryKey.caseID = newCaseDecisions.dtls.item(0).details.caseID;
      ProductDeliveryDtls productDeliveryDtls = CachedProductDeliveryFactory
          .newInstance().read(productDeliveryKey);

      // Get the product details
      ProductKey productKey = new ProductKey();
      productKey.productID = productDeliveryDtls.productID;
      ProductDtls productDtls = CachedProductFactory.newInstance().read(
          productKey);

      ProductHookManager productHookManagerObj = new ProductHookManager();

      ReviewGeneratedDecisions result = productHookManagerObj
          .getDecisionReviewHook(productDtls.typeCode);

      result
          .postInsertExamineDecisions(newCaseDecisions, existingCaseDecisions);
    }

  }


  /**
   * Performs post-processing when evaluating eligibility on a case.
   *
   * @param key
   * Input details for eligibility assessment.
   * @param reassessmentResult
   * The result of evaluating eligibility on a case.
   *
   * @throws InformationalException
   * Generic Exception Signature.
   * @throws AppException
   * Generic Exception Signature.
   */
  @Override
  public void postReassessEligibility(final DetermineEligibilityKey key,
      final ReassessmentResult reassessmentResult) throws AppException,
      InformationalException {

    final ProductDelivery productDelivery = productDeliveryDAO.get(key.caseID);

    /*
     * CREOLE-enabled products - post reassessment processing
     */
    if (isCREOLEEnabledProduct(productDelivery.getProduct())) {
      creoleReassessment.postReassessmentProcessing(productDelivery);
    }

  }

  /**
   * Checks whether a product is CREOLE-enabled.
   *
   * @param product
   *          The product to check
   *
   * @return Boolean indicating whether or not the product is CREOLE-enabled
   */
  private boolean isCREOLEEnabledProduct(final Product product) {

    return (null != creoleProductAccessorDAO.getIfExists(product.getID()));
  }

  /**
   * Reviews the rolled up decisions created as a result of the assessment
   * process.
   *
   * @param details
   * Contains the decisions and components to be reviewed.
   *
   * @throws InformationalException
   * Generic Exception Signature.
   * @throws AppException
   * Generic Exception Signature.
   */
 @Override
  public void reviewDecisionAndComponents(
      CreateDecisionsAndComponentsResultDtls details) throws AppException,
      InformationalException {

   
   if (details.existingCaseDecisionsList.dtls.size() != 0){

    final ProductDelivery productDelivery = productDeliveryDAO.get(details.existingCaseDecisionsList.dtls.get(0).details.caseID);

    /*
     * CREOLE-enabled products - post reassessment processing
     */
    if (isCREOLEEnabledProduct(productDelivery.getProduct())) {
      creoleReassessment.postReassessmentProcessing(productDelivery);

    }
  }
 }
}
