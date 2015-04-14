package curam.molsa.casedetermination.sl.event.impl;

import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASETYPECODE;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.impl.CASETYPECODEEntry;
import curam.codetable.impl.REASSESSMENTRESULTEntry;
import curam.core.fact.CachedProductDeliveryFactory;
import curam.core.fact.CachedProductFactory;
import curam.core.fact.CaseHeaderFactory;
import curam.core.impl.ProductHookManager;
import curam.core.intf.ReviewGeneratedDecisions;
import curam.core.sl.infrastructure.assessment.event.impl.AssessmentEngineEvent;
import curam.core.sl.infrastructure.assessment.impl.OverUnderPaymentBreakdownDAO;
import curam.core.sl.infrastructure.paymentcorrection.impl.PaymentCorrectionEvidenceDAO;
import curam.core.sl.infrastructure.product.creole.impl.CREOLEProductAccessorDAO;
import curam.core.sl.struct.TaskCreateDetails;
import curam.core.struct.BeneficiaryDetails;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderKey;
import curam.core.struct.CompleteDecisionCreationList;
import curam.core.struct.CreateDecisionsAndComponentsResultDtls;
import curam.core.struct.DetermineEligibilityKey;
import curam.core.struct.NomineeReassessmentHeader;
import curam.core.struct.ObjectiveTotalDetailsList;
import curam.core.struct.OverUnderPaymentBreakdownKey;
import curam.core.struct.OverUnderPaymentHeaderDtls;
import curam.core.struct.OverUnderPaymentIn;
import curam.core.struct.ProcessOverUnderPaymentInput;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.core.struct.ProductDtls;
import curam.core.struct.ProductKey;
import curam.core.struct.ReassessmentMode;
import curam.core.struct.ReassessmentResult;
import curam.core.struct.StoreDecisionsInd;
import curam.creole.message.CODETABLEITEM;
import curam.message.BPOCASEREASSESSMENT;
import curam.message.BPOPROCESSOVERUNDERPAYMENTS;
import curam.message.BPOREASSESSMENTPRODUCT;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseconfiguration.impl.Product;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.piwrapper.casemanager.impl.NomineeOverUnderPaymentDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.workflow.impl.EnactmentService;

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
  
  @Inject
  private NomineeOverUnderPaymentDAO nomineeOverUnderPaymentDAO;
  
  @Inject 
  private OverUnderPaymentBreakdownDAO overUnderPaymentBreakdownDAO;
  
  @Inject
  private PaymentCorrectionEvidenceDAO paymentCorrectionEvidenceDAO;
  
  @Inject
  private CaseHeaderDAO caseHeaderDAO;

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
 
 @Override
 public void postProcessPaymentCorrection(
             ProcessOverUnderPaymentInput input,
             NomineeReassessmentHeader nomineeReassessmentHeader,
             BeneficiaryDetails beneficiaryDetails,
             OverUnderPaymentHeaderDtls overUnderPaymentHeaderDtls,
             ObjectiveTotalDetailsList objectiveTotalDetailsList)
             throws AppException, InformationalException {
       
		curam.piwrapper.casemanager.impl.NomineeOverUnderPayment nomineeOverUnderPayment = nomineeOverUnderPaymentDAO
				.get(nomineeReassessmentHeader.nomineeOverUnderPaymentDtls.nomineeOverUnderPaymentID);

		
		List<curam.core.sl.infrastructure.assessment.impl.OverUnderPaymentBreakdown> overUnderPaymentBreakdownList = overUnderPaymentBreakdownDAO
				.searchByNomineeOverUnderPayment(nomineeOverUnderPayment);
		List<curam.core.sl.infrastructure.paymentcorrection.impl.PaymentCorrectionEvidence> paymentCorrectionEvidenceList = null;
		OverUnderPaymentBreakdownKey overUnderPaymentBreakdownKey = new OverUnderPaymentBreakdownKey();

		// get payment correction evidence
		for (curam.core.sl.infrastructure.assessment.impl.OverUnderPaymentBreakdown breakdown : overUnderPaymentBreakdownList) {
			if (breakdown.getAmount().isZero()
					&& breakdown.getReassessmentResult().equals(
							REASSESSMENTRESULTEntry.NOCHANGE)) {
				continue;
			}
			overUnderPaymentBreakdownKey.overUnderPaymentBreakdownID = breakdown
					.getID();
			paymentCorrectionEvidenceList = paymentCorrectionEvidenceDAO
					.searchByOverUnderPaymentBreakdown(overUnderPaymentBreakdownKey);
			CaseHeaderDtls underpaymentCaseHeaderDtls = null;

			// All of the payment correction evidence will have the same caseID
			if (paymentCorrectionEvidenceList.size() > 0) {
				CaseHeaderKey caseHeaderKey = new CaseHeaderKey();
				// Since there is no method to get caseID directly we have
				// to do double DB reads on CaseHeader table
				caseHeaderKey.caseID = paymentCorrectionEvidenceList.get(0)
						.getCase().getID();
				underpaymentCaseHeaderDtls = CaseHeaderFactory.newInstance()
						.read(caseHeaderKey);

				final java.util.List<TaskCreateDetails> enactmentStructs = new java.util.ArrayList<TaskCreateDetails>();
				TaskCreateDetails taskCreateDetails = new TaskCreateDetails();
				
				taskCreateDetails.caseID=underpaymentCaseHeaderDtls.caseID;
				LocalisableString subject = null;
				
				subject = new LocalisableString(
						BPOPROCESSOVERUNDERPAYMENTS.INF_PAYMENT_CORRECTION_CREATED_REASON);
				 
				subject.arg(underpaymentCaseHeaderDtls.caseReference);
				
				//Read the product type
				Long PDCaseId=input.caseID;
				CaseHeader PDcaseHeader = caseHeaderDAO.get(PDCaseId);
				String NameandAlternateId=PDcaseHeader.getConcernRole().getName() + " - " + PDcaseHeader.getConcernRole().getPrimaryAlternateID();
				subject.arg(NameandAlternateId);
				taskCreateDetails.subject=subject.getMessage(TransactionInfo.getProgramLocale());
				enactmentStructs.add(taskCreateDetails);
				
				EnactmentService.startProcessInV3CompatibilityMode(
						MOLSAConstants.KMOLSAPaymentCorrectionCaseApprovalTask, enactmentStructs);
				break;
			}

		}

       
       
       
       

 }


}
