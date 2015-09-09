package curam.molsa.eft.batch.impl;

import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.log4j.Logger;

import curam.codetable.ALTERNATENAMETYPE;
import curam.codetable.BATCHPROCESSNAME;
import curam.codetable.CASERELATIONSHIPREASONCODE;
import curam.codetable.CASERELATIONSHIPTYPECODE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.FINCOMPONENTSTATUS;
import curam.codetable.FINCOMPONENTTYPE;
import curam.codetable.ILICATEGORY;
import curam.codetable.ILISTATUS;
import curam.codetable.ILITYPE;
import curam.codetable.METHODOFDELIVERY;
import curam.codetable.PMTRECONCILIATIONSTATUS;
import curam.codetable.PRODUCTTYPE;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.facade.intf.Participant;
import curam.core.facade.struct.ListOverUnderPaymentKey;
import curam.core.facade.struct.ListParticipantFinancials1;
import curam.core.facade.struct.ListParticipantFinancialsKey;
import curam.core.facade.struct.ParticipantFinancials1;
import curam.core.facade.struct.ReassessmentResultDetails;
import curam.core.facade.struct.ReassessmentResultDetailsList;
import curam.core.fact.CaseHeaderFactory;
import curam.core.fact.CaseRelationshipFactory;
import curam.core.fact.CaseStatusFactory;
import curam.core.fact.FinancialComponentFactory;
import curam.core.fact.InstructionLineItemFactory;
import curam.core.fact.PaymentInstrumentFactory;
import curam.core.fact.ProductDeliveryFactory;
import curam.core.impl.BatchStreamHelper;
import curam.core.impl.EnvVars;
import curam.core.impl.SecurityImplementationFactory;
import curam.core.intf.CaseHeader;
import curam.core.intf.CaseRelationship;
import curam.core.intf.CaseStatus;
import curam.core.intf.FinancialComponent;
import curam.core.intf.InstructionLineItem;
import curam.core.intf.PaymentInstrument;
import curam.core.intf.ProductDelivery;
import curam.core.sl.entity.fact.CaseNomineeFactory;
import curam.core.sl.entity.intf.CaseNominee;
import curam.core.sl.entity.struct.CaseNomineeDtls;
import curam.core.sl.entity.struct.CaseNomineeKey;
import curam.core.struct.BankAccountDtls;
import curam.core.struct.BatchProcessStreamKey;
import curam.core.struct.BatchProcessingID;
import curam.core.struct.BatchProcessingSkippedRecord;
import curam.core.struct.BatchProcessingSkippedRecordList;
import curam.core.struct.CaseHeaderByStatusKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.CaseHeaderDtlsList;
import curam.core.struct.CaseRelationshipCaseIDKey;
import curam.core.struct.CaseRelationshipDtls;
import curam.core.struct.CaseRelationshipDtlsList;
import curam.core.struct.Count;
import curam.core.struct.CurrentCaseStatusKey;
import curam.core.struct.EffectiveDateReconcilStatusVersionNo;
import curam.core.struct.FCstatusCodeCaseID;
import curam.core.struct.FinancialComponentDtls;
import curam.core.struct.FinancialComponentDtlsList;
import curam.core.struct.FinancialComponentID;
import curam.core.struct.ILICaseID;
import curam.core.struct.ILIStatusCodeKey;
import curam.core.struct.ILITabDetail;
import curam.core.struct.ILITabDetailList;
import curam.core.struct.InstructionLineItemDtls;
import curam.core.struct.InstructionLineItemDtlsList;
import curam.core.struct.InstructionLineItemKey;
import curam.core.struct.PIStatusCode;
import curam.core.struct.PaymentInstrumentDtls;
import curam.core.struct.PaymentInstrumentDtlsList;
import curam.core.struct.PaymentInstrumentKey;
import curam.core.struct.ProductDeliveryDtls;
import curam.core.struct.ProductDeliveryKey;
import curam.dynamicevidence.util.impl.DateUtil;
import curam.evidence.sl.struct.MonthYearDetails;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.codetable.MOLSABICCODE;
import curam.molsa.codetable.MOLSASMSMESSAGETEMPLATE;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetailList;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTMsWordDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;
import curam.molsa.message.MOLSABPOGENERATEEFT;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.molsa.util.impl.MOLSAFinancialHelper;
import curam.molsa.util.impl.MOLSAGenerateEFTHelper;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.DateRange;
import curam.util.type.FrequencyPattern;
import curam.util.type.Money;

/**
 * The Stream class to generate the EFT Document from Batch.
 * 
 */
public class MOLSAGenerateEFTBatchStream extends
		curam.molsa.eft.batch.base.MOLSAGenerateEFTBatchStream {

	/**
	 * Calls the runStream method.
	 * 
	 * @param batchProcessStreamKey
	 *            BatchProcessStreamKey
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	@Override
	public void process(BatchProcessStreamKey batchProcessStreamKey)
			throws AppException, InformationalException {
		BatchStreamHelper batchStreamHelper = new BatchStreamHelper();
		MOLSAGenerateEFTBatchStreamWrapper molsaGenerateEFTBatchStreamWrapper = new MOLSAGenerateEFTBatchStreamWrapper(
				this);
		SecurityImplementationFactory.register();
		if (batchProcessStreamKey.instanceID.length() == 0) {
			batchProcessStreamKey.instanceID = BATCHPROCESSNAME.MOLSA_GENERATE_EFT;
		}
		batchStreamHelper.runStream(batchProcessStreamKey,
				molsaGenerateEFTBatchStreamWrapper);

	}

	/**
	 * Note:- Not used in MOLSA. So empty implementation
	 * 
	 * @param skippedCasesCount
	 *            int
	 * @return String.
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	@Override
	public String getChunkResult(int skippedCasesCount) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * Note:- Not used in MOLSA. So empty implementation
	 * 
	 * @param batchProcessingSkippedRecordList
	 *            BatchProcessingSkippedRecordList
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	@Override
	public void processSkippedCases(
			BatchProcessingSkippedRecordList batchProcessingSkippedRecordList)
			throws AppException, InformationalException {
		// TODO Auto-generated method stub

	}

	/**
	 * Invoked from the batch program to generate the EFT documents. Read all
	 * the processed Payment Instrument and create the EFT documents (Word and
	 * Exel). Once the exel is generated, the Payment Instrument Status is
	 * updated to Issued.
	 * 
	 * @param batchProcessingID
	 *            BatchProcessingID
	 * @param generateEFTParam
	 *            MOLSAGenerateEFTParam
	 * @return BatchProcessingSkippedRecord
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	@Override
	public BatchProcessingSkippedRecord processRecord(
			BatchProcessingID batchProcessingID,
			MOLSAGenerateEFTParam generateEFTParam) throws AppException,
			InformationalException {

		PaymentInstrument paymentInstrumentObj = PaymentInstrumentFactory
				.newInstance();
		PIStatusCode piStatusCode = new PIStatusCode();
		piStatusCode.reconcilStatusCode = PMTRECONCILIATIONSTATUS.PROCESSED;
		PaymentInstrumentDtlsList proPaymentInstrumentDtlsList = paymentInstrumentObj
				.searchByStatusCode(piStatusCode);
		PaymentInstrumentDtlsList paymentInstrumentDtlsList = filterEFTPayment(proPaymentInstrumentDtlsList);
		
		BatchProcessingSkippedRecord batchProcessingSkippedRecord = new BatchProcessingSkippedRecord();

		MOLSAGenerateEFTDetailList bankGenerateEFTDetailList = generateExelForBank(
				paymentInstrumentDtlsList, generateEFTParam);
		
		Money totalMoney = bankGenerateEFTDetailList.totalAmount;
		
		double totalUnProcessedAmount = generateExelForFinance(bankGenerateEFTDetailList, generateEFTParam);
		generateMsWord(totalMoney);
		Money totalMoneyForMinistry = new Money(bankGenerateEFTDetailList.totalAmount.getValue()+totalUnProcessedAmount);
		generateMsWordForMinistry(totalMoneyForMinistry);
		updatePaymentInstrumentStatus(paymentInstrumentDtlsList);

		return batchProcessingSkippedRecord;
	}
    
	private PaymentInstrumentDtlsList filterEFTPayment(PaymentInstrumentDtlsList proPaymentInstrumentDtlsList){
		PaymentInstrumentDtlsList paymentInstrumentDtlsList = new PaymentInstrumentDtlsList();
		for(PaymentInstrumentDtls paymentInstrumentDtls :proPaymentInstrumentDtlsList.dtls.items()) {
			if(paymentInstrumentDtls.deliveryMethodType.equals(METHODOFDELIVERY.EFT)) {
				paymentInstrumentDtlsList.dtls.addRef(paymentInstrumentDtls);
			}
		}
		return paymentInstrumentDtlsList;
	}
	
	/**
	 * Populate the MsWord struct details.
	 * 
	 * @param totalAmount
	 *            double
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private void generateMsWord(Money totalAmount) throws AppException,
			InformationalException {

		MOLSAGenerateEFTMsWordDetail generateEFTMsWordDetail = new MOLSAGenerateEFTMsWordDetail();
		String compBankAccountID = Configuration
				.getProperty(EnvVars.EFT_BANKACCOUNTID);
				
		generateEFTMsWordDetail.compAccount = Configuration
    .getProperty(EnvVars.EFT_COMPANY_ACCOUNT_NUMBER);
			//CodeTable.getOneItem(MOLSABICCODE.TABLENAME, 
				//bankAccountDtls.bic, TransactionInfo.getProgramLocale());
		generateEFTMsWordDetail.socialAffairMinisterName = Configuration
				.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_NAME_ONE);
		generateEFTMsWordDetail.securityDirectorName = Configuration
				.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_NAME_TWO);

		String dayOfMonth = Configuration
				.getProperty(EnvVars.EFT_FINANCIAL_DAY);
		MonthYearDetails monthYearDetails = MOLSAGenerateEFTHelper
				.getMonthYearDetail(Date.getCurrentDate());
		Date dueDate = DateUtil.getISODate(monthYearDetails.year
				+ monthYearDetails.monthCode + dayOfMonth);
		SimpleDateFormat dateFormat = new SimpleDateFormat(Configuration
				.getProperty(EnvVars.EFT_DATE_FORMAT));
		generateEFTMsWordDetail.dueDate = dateFormat.format(dueDate.getCalendar().getTime());
		
		generateEFTMsWordDetail.forMonth = monthYearDetails.monthCode + "-"
				+ monthYearDetails.year;
		generateEFTMsWordDetail.transferAmount = totalAmount + " /- ";
		generateEFTMsWordDetail.transferAmountMoney=totalAmount;
		
		MOLSAGenerateEFTHelper.newInstance().generateMsWord(
				generateEFTMsWordDetail,
				MOLSAGenerateEFTHelper.getMsWordName(monthYearDetails));

	}
	
	/**
	 * Populate the MsWord struct details.
	 * 
	 * @param totalAmount
	 *            double
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private void generateMsWordForMinistry(Money totalAmount) throws AppException,
			InformationalException {

		MOLSAGenerateEFTMsWordDetail generateEFTMsWordDetail = new MOLSAGenerateEFTMsWordDetail();
		String compBankAccountID = Configuration
				.getProperty(EnvVars.EFT_BANKACCOUNTID);
				
		generateEFTMsWordDetail.compAccount = Configuration
    .getProperty(EnvVars.EFT_COMPANY_ACCOUNT_NUMBER);
			//CodeTable.getOneItem(MOLSABICCODE.TABLENAME, 
				//bankAccountDtls.bic, TransactionInfo.getProgramLocale());
		generateEFTMsWordDetail.socialAffairMinisterName = Configuration
				.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_NAME_ONE);
		generateEFTMsWordDetail.securityDirectorName = Configuration
				.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_NAME_TWO);

		String dayOfMonth = Configuration
				.getProperty(EnvVars.EFT_FINANCIAL_DAY);
		MonthYearDetails monthYearDetails = MOLSAGenerateEFTHelper
				.getMonthYearDetail(Date.getCurrentDate());
		Date dueDate = DateUtil.getISODate(monthYearDetails.year
				+ monthYearDetails.monthCode + dayOfMonth);
		SimpleDateFormat dateFormat = new SimpleDateFormat(Configuration
				.getProperty(EnvVars.EFT_DATE_FORMAT));
		generateEFTMsWordDetail.dueDate = dateFormat.format(dueDate.getCalendar().getTime());
		
		generateEFTMsWordDetail.forMonth = monthYearDetails.monthCode + "-"
				+ monthYearDetails.year;
		generateEFTMsWordDetail.transferAmount = totalAmount+"";
		generateEFTMsWordDetail.transferAmountMoney=totalAmount;

		MOLSAGenerateEFTHelper.newInstance().generateMsWordForMinistry(
				generateEFTMsWordDetail,
				MOLSAGenerateEFTHelper.getMinistryMsWordName(monthYearDetails));

	}

	/**
	 * Checks whether the Payment is generated for the Financial Component. This
	 * also remove the Benefit UnderPayment.
	 * 
	 * @param financialComponentDtls
	 *            FinancialComponentDtls
	 * @return boolean
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private boolean checkPaymentIsGenerated(
			FinancialComponentDtls financialComponentDtls) throws AppException,
			InformationalException {
		boolean isFinancialGenerated = false;
		
		//** Need to checked for closed LIV
		FinancialComponent financialComponentObj = FinancialComponentFactory
		.newInstance();		
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		fcstatusCodeCaseID.caseID = financialComponentDtls.caseID;
		fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.CLOSED_OUTOFDATE;
		FinancialComponentDtlsList financialComponentDtlsList = financialComponentObj
				.searchByStatusCaseID(fcstatusCodeCaseID);
		
		InstructionLineItem instructionLineItemObj = InstructionLineItemFactory
				.newInstance();
		FinancialComponentID financialComponentID = new FinancialComponentID();
		financialComponentID.financialCompID = financialComponentDtls.financialCompID;
		Count count = instructionLineItemObj
				.countByFinancialCompID(financialComponentID);
		if (count.numberOfRecords > 0) {
			isFinancialGenerated = true;
		}
		if(!isFinancialGenerated) {
			for (FinancialComponentDtls closedFinancialComponentDtls : financialComponentDtlsList.dtls
					.items()) {
				financialComponentID.financialCompID = closedFinancialComponentDtls.financialCompID;
				count = instructionLineItemObj
						.countByFinancialCompID(financialComponentID);
				if (count.numberOfRecords > 0) {
					isFinancialGenerated = true;
				}
			}
		}
		
		return isFinancialGenerated;
	}

	/**
	 * Remove the Benefit UnderPayment record from the input list.
	 * 
	 * @param financialComponentDtlsList
	 *            FinancialComponentDtlsList
	 * @return FinancialComponentDtlsList
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private FinancialComponentDtlsList filterFinancialComponent(
			FinancialComponentDtlsList financialComponentDtlsList)
			throws AppException, InformationalException {
		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if (!financialComponentDtls.typeCode
					.equals(FINCOMPONENTTYPE.MOLSA_COMP)
					|| !checkPaymentIsGenerated(financialComponentDtls)) {
				financialComponentDtlsList.dtls.remove(financialComponentDtls);
			}
		}
		return financialComponentDtlsList;
	}
	
	/**
	 * Return the UnderPayment Case Details to the output struct.
	 * 
	 * @return List<MOLSAGenerateEFTDetail>
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private List<MOLSAGenerateEFTDetail> getOpenAndSubmittedUnderPaymentCaseDetails()
			throws AppException, InformationalException {
		List<MOLSAGenerateEFTDetail> generateEFTDetailList = new ArrayList<MOLSAGenerateEFTDetail>();
		MOLSAGenerateEFTDetail generateEFTDetail;

		
		// Suspended Cases Amount
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderByStatusKey caseHeaderByStatusKey = new CaseHeaderByStatusKey();
		caseHeaderByStatusKey.statusCode = CASESTATUS.OPEN;
		CaseHeaderDtlsList caseHeaderDtlsOpenList = caseHeaderObj
				.searchByStatusCode(caseHeaderByStatusKey);
		caseHeaderByStatusKey.statusCode = CASESTATUS.COMPLETED;
		CaseHeaderDtlsList caseHeaderDtlsSubmittedList = caseHeaderObj
				.searchByStatusCode(caseHeaderByStatusKey);
		CaseHeaderDtlsList caseHeaderDtlsList = new CaseHeaderDtlsList();
		CaseHeaderDtlsList caseHeaderDtlsListBeforeFilter = new CaseHeaderDtlsList();
		caseHeaderDtlsListBeforeFilter.dtls.addAll(caseHeaderDtlsOpenList.dtls);
		caseHeaderDtlsListBeforeFilter.dtls
				.addAll(caseHeaderDtlsSubmittedList.dtls);
		caseHeaderDtlsList = filterProductDelivery(caseHeaderDtlsListBeforeFilter);
		ProductDelivery productDeliveryObj = ProductDeliveryFactory
				.newInstance();
		ProductDeliveryKey productDeliveryKey = new ProductDeliveryKey();
		ProductDeliveryDtls productDeliveryDtls;
		CaseHeaderDtlsList caseHeaderDtlsUnderPaymentList = new CaseHeaderDtlsList();
		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsList.dtls.items()) {
			productDeliveryKey.caseID = caseHeaderDtls.caseID;
			productDeliveryDtls = productDeliveryObj.read(productDeliveryKey);
			if (productDeliveryDtls.productType
					.equals(PRODUCTTYPE.PAYMENTCORRECTION)) {
				caseHeaderDtlsUnderPaymentList.dtls.addRef(caseHeaderDtls);
			}
		}

		CaseNominee caseNomineeObj = CaseNomineeFactory.newInstance();
		CaseRelationship caseRelationShipObj = CaseRelationshipFactory
				.newInstance();
		CaseRelationshipCaseIDKey caseRelationshipCaseIDKey = new CaseRelationshipCaseIDKey();

		curam.core.facade.intf.ProductDelivery productDeliveryFacadeObj = curam.core.facade.fact.ProductDeliveryFactory
				.newInstance();
		ListOverUnderPaymentKey listOverUnderPaymentKey = new ListOverUnderPaymentKey();
		CaseNomineeKey caseNomineeKey = new CaseNomineeKey();
		CaseNomineeDtls caseNomineeDtls;

		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsUnderPaymentList.dtls
				.items()) {

			
					
			caseRelationshipCaseIDKey.caseID = caseHeaderDtls.caseID;
			CaseRelationshipDtlsList caseRelationshipDtlsList = caseRelationShipObj
					.searchByCaseID(caseRelationshipCaseIDKey);
			for (CaseRelationshipDtls caseRelationshipDtls : caseRelationshipDtlsList.dtls
					.items()) {
				if (caseRelationshipDtls.typeCode
						.equals(CASERELATIONSHIPTYPECODE.PRODUCTPRODUCT)
						&& caseRelationshipDtls.reasonCode
								.equals(CASERELATIONSHIPREASONCODE.PAYMENTCORRECTIONCASE)
						&& caseRelationshipDtls.statusCode
								.equals(RECORDSTATUS.NORMAL)) {
					listOverUnderPaymentKey.getAllOverUnderPaymentsIn.caseID = caseRelationshipDtls.relatedCaseID;
					ReassessmentResultDetailsList reassessmentResultDetailsList = productDeliveryFacadeObj
							.listReassessmentResults(listOverUnderPaymentKey);
					for (ReassessmentResultDetails reassessmentResultDetails : reassessmentResultDetailsList.dtlsList
							.items()) {
						if (reassessmentResultDetails.overUnderPaymentCaseID == caseHeaderDtls.caseID) {

							generateEFTDetail = new MOLSAGenerateEFTDetail();
							generateEFTDetail.isSuspended = true;
							generateEFTDetail.deptCode = Configuration
									.getProperty(EnvVars.EFT_DEPT_CODE);

							caseNomineeKey.caseNomineeID = reassessmentResultDetails.caseNomineeID;
							caseNomineeDtls = caseNomineeObj
									.read(caseNomineeKey);
							long concernRoleID = MOLSAParticipantHelper
									.returnConcernRoleIDFromCaseParticipantRoleID(caseNomineeDtls.caseParticipantRoleID);

							generateEFTDetail.staffNumber = MOLSAParticipantHelper
									.returnConcernRoleAlternateID(
											concernRoleID,
											CONCERNROLEALTERNATEID.INSURANCENUMBER);

							generateEFTDetail.fullname_ar = MOLSAParticipantHelper
							.returnAlternateName(concernRoleID, ALTERNATENAMETYPE.REGISTERED);
							generateEFTDetail.fullname_en = MOLSAParticipantHelper
									.returnAlternateName(concernRoleID,
											ALTERNATENAMETYPE.ENGLISH);
							PaymentInstrumentDtls paymentInstrumentDtls = returnLatestPaymentDetails(concernRoleID);
							if(paymentInstrumentDtls !=null) {
								BankAccountDtls bankAccountDtls = MOLSAFinancialHelper
										.returnBankAccountDetails(paymentInstrumentDtls.bankAccountID);
								generateEFTDetail.accountNumber = bankAccountDtls.iban;
								generateEFTDetail.bankSwift = CodeTable.getOneItem(
										MOLSABICCODE.TABLENAME,
										bankAccountDtls.bic,
										TransactionInfo.getProgramLocale());
							}
							generateEFTDetail.currencyCode = Configuration
									.getProperty(EnvVars.EFT_CURRENCY_CODE);
							generateEFTDetail.amount = reassessmentResultDetails.amount;
							generateEFTDetailList.add(generateEFTDetail);
						}
					}

				}

			}

		}

		return generateEFTDetailList;
	}
	
	
	/**
	 * Return the UnProcssed ILI Details to the output struct.
	 * 
	 * @return List<MOLSAGenerateEFTDetail>
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private List<MOLSAGenerateEFTDetail> getUnProcessedAmountDetails()
			throws AppException, InformationalException {
		List<MOLSAGenerateEFTDetail> generateEFTDetailList = new ArrayList<MOLSAGenerateEFTDetail>();
		MOLSAGenerateEFTDetail generateEFTDetail;

		InstructionLineItem instructionLineItemObj = InstructionLineItemFactory
				.newInstance();
		ILIStatusCodeKey iliStatusCodeKey = new ILIStatusCodeKey();
		iliStatusCodeKey.statusCode = ILISTATUS.UNPROCESSED;
		InstructionLineItemDtlsList instructionLineItemDtlsList = instructionLineItemObj
				.searchByStatusCode(iliStatusCodeKey);
		for (InstructionLineItemDtls instructionLineItemDtls : instructionLineItemDtlsList.dtls
				.items()) {
			generateEFTDetail = new MOLSAGenerateEFTDetail();
			generateEFTDetail.deptCode = Configuration
					.getProperty(EnvVars.EFT_DEPT_CODE);

			generateEFTDetail.staffNumber = MOLSAParticipantHelper
					.returnConcernRoleAlternateID(
							instructionLineItemDtls.concernRoleID,
							CONCERNROLEALTERNATEID.INSURANCENUMBER);

			generateEFTDetail.fullname_ar = MOLSAParticipantHelper
			.returnAlternateName(instructionLineItemDtls.concernRoleID, ALTERNATENAMETYPE.REGISTERED);
			generateEFTDetail.fullname_en = MOLSAParticipantHelper
					.returnAlternateName(instructionLineItemDtls.concernRoleID,
							ALTERNATENAMETYPE.ENGLISH);
			generateEFTDetail.currencyCode = Configuration
					.getProperty(EnvVars.EFT_CURRENCY_CODE);
			generateEFTDetail.amount = instructionLineItemDtls.unprocessedAmount;
			generateEFTDetailList.add(generateEFTDetail);
		}

		return generateEFTDetailList;
	}
	
	/**
	 * Return the Open and Suspended Case Details to the output struct.
	 * 
	 * @return List<MOLSAGenerateEFTDetail>
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private List<MOLSAGenerateEFTDetail> getOpenAndSubmittedCaseDetails()
			throws AppException, InformationalException {
		List<MOLSAGenerateEFTDetail> generateEFTDetailList = new ArrayList<MOLSAGenerateEFTDetail>();
		MOLSAGenerateEFTDetail generateEFTDetail;

		// Suspended Cases Amount
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderByStatusKey caseHeaderByStatusKey = new CaseHeaderByStatusKey();
		caseHeaderByStatusKey.statusCode = CASESTATUS.OPEN;
		CaseHeaderDtlsList caseHeaderDtlsOpenList = caseHeaderObj
				.searchByStatusCode(caseHeaderByStatusKey);
		caseHeaderByStatusKey.statusCode = CASESTATUS.COMPLETED;
		CaseHeaderDtlsList caseHeaderDtlsSubmittedList = caseHeaderObj
		.searchByStatusCode(caseHeaderByStatusKey);
		CaseHeaderDtlsList caseHeaderDtlsList = new CaseHeaderDtlsList();
		caseHeaderDtlsList.dtls.addAll(caseHeaderDtlsOpenList.dtls);
		caseHeaderDtlsList.dtls.addAll(caseHeaderDtlsSubmittedList.dtls);
		caseHeaderDtlsList = filterProductDelivery(caseHeaderDtlsList);
		CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
		CurrentCaseStatusKey currentCaseStatusKey;
		
		CaseNominee caseNomineeObj = CaseNomineeFactory.newInstance();
		CaseNomineeKey caseNomineeKey = new CaseNomineeKey();
		CaseNomineeDtls caseNomineeDtls;


		FinancialComponent financialComponentObj = FinancialComponentFactory
				.newInstance();
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		Date currentDate = Date.getCurrentDate();
		FrequencyPattern frequencyPattern = new FrequencyPattern();
		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsList.dtls.items()) {
		
			
			currentCaseStatusKey = new CurrentCaseStatusKey();
			currentCaseStatusKey.caseID = caseHeaderDtls.caseID;
			

			fcstatusCodeCaseID = new FCstatusCodeCaseID();
			fcstatusCodeCaseID.caseID = caseHeaderDtls.caseID;
			fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.LIVE;
			FinancialComponentDtlsList financialComponentDtlsList = financialComponentObj
					.searchByStatusCaseID(fcstatusCodeCaseID);
			FinancialComponentDtls financialComponentDtls = returnLastFinancialComponentForOpenAndSubmittedCase(financialComponentDtlsList, caseHeaderDtls.caseID);
			if (financialComponentDtls != null) {
				generateEFTDetail = new MOLSAGenerateEFTDetail();
				generateEFTDetail.isSuspended = true;
				generateEFTDetail.deptCode = Configuration
						.getProperty(EnvVars.EFT_DEPT_CODE);
				generateEFTDetail.staffNumber = MOLSAParticipantHelper
						.returnConcernRoleAlternateID(
								financialComponentDtls.concernRoleID,
								CONCERNROLEALTERNATEID.INSURANCENUMBER);
				caseNomineeKey.caseNomineeID = financialComponentDtls.caseNomineeID;
				caseNomineeDtls = caseNomineeObj.read(caseNomineeKey);
				long concernRoleID = MOLSAParticipantHelper
						.returnConcernRoleIDFromCaseParticipantRoleID(caseNomineeDtls.caseParticipantRoleID);
				PaymentInstrumentDtls paymentInstrumentDtls = returnLatestPaymentDetails(concernRoleID);
				if(paymentInstrumentDtls !=null) {
					BankAccountDtls bankAccountDtls = MOLSAFinancialHelper
							.returnBankAccountDetails(paymentInstrumentDtls.bankAccountID);
					generateEFTDetail.accountNumber = bankAccountDtls.iban;
					generateEFTDetail.bankSwift = CodeTable.getOneItem(
							MOLSABICCODE.TABLENAME,
							bankAccountDtls.bic,
							TransactionInfo.getProgramLocale());
				}
				generateEFTDetail.fullname_ar = MOLSAParticipantHelper
				.returnAlternateName(concernRoleID, ALTERNATENAMETYPE.REGISTERED);
				generateEFTDetail.fullname_en = MOLSAParticipantHelper
						.returnAlternateName(concernRoleID,
								ALTERNATENAMETYPE.ENGLISH);

				generateEFTDetail.currencyCode = Configuration
						.getProperty(EnvVars.EFT_CURRENCY_CODE);

				frequencyPattern = new FrequencyPattern(
						financialComponentDtls.frequency);
				
				Date calculatedEndDate=Date.kZeroDate;
				if(financialComponentDtls.endDate.before(currentDate)) {
					calculatedEndDate=financialComponentDtls.endDate;
				} else {
					calculatedEndDate=currentDate;
				}
				Date[] dates = frequencyPattern.getAllOccurrences(
						financialComponentDtls.dueDate, calculatedEndDate);
	
				double amount = 0.00;
				int numberOfMonths = dates.length+1;
				amount = financialComponentDtls.amount.getValue()
				* numberOfMonths;

				generateEFTDetail.amount = new Money(amount);
				generateEFTDetailList.add(generateEFTDetail);

			}

		}
		return generateEFTDetailList;
	}
	
	private CaseHeaderDtlsList filterProductDelivery(CaseHeaderDtlsList caseHeaderDtlsList){
		CaseHeaderDtlsList pdcCaseHeaderDtlsList = new CaseHeaderDtlsList();
		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsList.dtls.items()) {
			if(caseHeaderDtls.caseTypeCode.equals(CASETYPECODE.PRODUCTDELIVERY)) {
				pdcCaseHeaderDtlsList.dtls.addRef(caseHeaderDtls);
			}
		}
		return pdcCaseHeaderDtlsList;
	}
			
	/**
	 * Return the latest Payment Instrument.
	 * 
	 * @param paymentInstrumentDtls
	 *            PaymentInstrumentDtls
	 * @return FinancialComponentDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private PaymentInstrumentDtls returnLatestPaymentDetails(long concernRoleID)
			throws AppException, InformationalException {
		Participant participantObj = ParticipantFactory.newInstance();
		long paymentInstrumentID=0;
		PaymentInstrumentDtls paymentInstrumentDtls = null;
		PaymentInstrument  paymentInstrumentObj = PaymentInstrumentFactory.newInstance();
		PaymentInstrumentKey  paymentInstrumentKey = new PaymentInstrumentKey();
		ListParticipantFinancialsKey listParticipantFinancialsKey = new ListParticipantFinancialsKey();
		
		 listParticipantFinancialsKey.concernRoleID=concernRoleID;
		 ListParticipantFinancials1 listParticipantFinancials1 =participantObj.listParticipantFinancial1(listParticipantFinancialsKey);
		 for(ParticipantFinancials1 ParticipantFinancials1 : listParticipantFinancials1.participantFinancialsList.dtls.items()) {
			 paymentInstrumentID = ParticipantFinancials1.pmtInstrumentID;
			 break;
		 }
		 if(paymentInstrumentID !=0 ) {
			 paymentInstrumentKey.pmtInstrumentID = paymentInstrumentID;
			 paymentInstrumentDtls = paymentInstrumentObj.read(paymentInstrumentKey);
		 }
		 return paymentInstrumentDtls;
	}
	/**
	 * Return the latest Closed Financial Component.
	 * 
	 * @param financialComponentDtlsList
	 *            FinancialComponentDtlsList
	 * @return FinancialComponentDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private FinancialComponentDtls returnLastFinancialComponentForOpenAndSubmittedCase(
			FinancialComponentDtlsList financialComponentDtlsList, long caseID)
			throws AppException, InformationalException {
		FinancialComponentDtls outFinancialComponentDtls = null;
		filterFinancialComponent(financialComponentDtlsList);

		// Sort with respect to Next Processing Date Date
		Collections.sort(financialComponentDtlsList.dtls,
				new Comparator<FinancialComponentDtls>() {
					public int compare(FinancialComponentDtls o1,
							FinancialComponentDtls o2) {
						return o2.dueDate.compareTo(o1.dueDate);
					}
				});

		
		
		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if ( financialComponentDtls.nextProcessingDate.before(Date
							.getCurrentDate()) || financialComponentDtls.nextProcessingDate
							.equals(Date.getCurrentDate())) {				
					outFinancialComponentDtls = financialComponentDtls;
					break;				
			}
		}
		
		
		/*
		boolean isPaidOutForCurrentMonth=false;
		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if ( financialComponentDtls.nextProcessingDate.after(Date
							.getCurrentDate())) {				
						if(financialComponentDtls.amount.getValue()>0)	{
							isPaidOutForCurrentMonth=true;
						}
			}
		}
		
		if(!isPaidOutForCurrentMonth) {
			if(outFinancialComponentDtls==null || outFinancialComponentDtls.amount.isZero()) {
				outFinancialComponentDtls = getTheLastPaidNonZeroAmount(caseID);
			}
		}
		*/
		
		boolean isAllLiveRecordZero = true;
		if(outFinancialComponentDtls==null) {
			for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
					.items()) {
				if (!financialComponentDtls.amount.isZero()) {				
					isAllLiveRecordZero=false;				
				}
			}
			
			if(isAllLiveRecordZero && financialComponentDtlsList.dtls
					.items().length>0) {
				outFinancialComponentDtls = financialComponentDtlsList.dtls.item(0);
			}
		}
		
		
		FinancialComponentDtls closedFinancialComponentDtls = getTheLastPaidNonZeroAmount(caseID);
		if(outFinancialComponentDtls!=null && outFinancialComponentDtls.amount.isZero()) {
			if(closedFinancialComponentDtls!=null) {
				outFinancialComponentDtls.amount = getTheLastPaidNonZeroAmount(caseID).amount;
			}
		} else if (outFinancialComponentDtls==null && financialComponentDtlsList.dtls.isEmpty()){
			outFinancialComponentDtls = closedFinancialComponentDtls;
		}
		
		return outFinancialComponentDtls;
	}
	
	private FinancialComponentDtls getTheLastPaidNonZeroAmount(long caseID) throws AppException, InformationalException {
		FinancialComponentDtls outFinancialComponentDtls = null;
		Money amount = new Money(0);
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		fcstatusCodeCaseID.caseID = caseID;
		fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.CLOSED_OUTOFDATE;
		FinancialComponent financialComponentObj = FinancialComponentFactory
		.newInstance();
		FinancialComponentDtlsList financialComponentDtlsList = financialComponentObj
				.searchByStatusCaseID(fcstatusCodeCaseID);
		// Sort with respect to Next Processing Date Date
		Collections.sort(financialComponentDtlsList.dtls,
				new Comparator<FinancialComponentDtls>() {
					public int compare(FinancialComponentDtls o1,
							FinancialComponentDtls o2) {
						int sort = o2.dueDate.compareTo(o1.dueDate);
						if(sort==0) {
							sort = o2.expiryDate.compareTo(o1.expiryDate);
						}
						return sort;
					}
				});
		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if (financialComponentDtls.typeCode.equals(FINCOMPONENTTYPE.MOLSA_COMP)) {
				if(financialComponentDtls.amount.getValue()>0) {
					outFinancialComponentDtls = financialComponentDtls;
					break;
				}
			}
			
			
		}
		
		return outFinancialComponentDtls;
	}
	
	private boolean isSuspendedPaidForMonth(long caseID) throws AppException, InformationalException {
		boolean isPaid = false;
		FinancialComponent financialComponentObj = FinancialComponentFactory
		.newInstance();
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		fcstatusCodeCaseID.caseID = caseID;
		fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.LIVE;
		FinancialComponentDtlsList livFinancialComponentDtlsList = financialComponentObj
				.searchByStatusCaseID(fcstatusCodeCaseID);
		InstructionLineItem instructionLineItemObj = InstructionLineItemFactory
		.newInstance();
		InstructionLineItemKey  instructionLineItemKey = new InstructionLineItemKey();
		InstructionLineItemDtls  instructionLineItemDtls;
		ILICaseID iliCaseID = new ILICaseID();
		iliCaseID.caseID = caseID;
		ILITabDetailList iliTabDetailList = instructionLineItemObj.searchByCaseID(iliCaseID);
		FinancialComponentID financialComponentID = new FinancialComponentID();
		
		ArrayList<Long> finComponentIDs = new ArrayList<Long>();
		Date currentDate = Date.getCurrentDate();
		for (FinancialComponentDtls financialComponentDtls : livFinancialComponentDtlsList.dtls
				.items()) {
			if (financialComponentDtls.typeCode.equals(FINCOMPONENTTYPE.MOLSA_COMP)) {
				finComponentIDs.add(financialComponentDtls.financialCompID);
			}
			
			
		}
		for (ILITabDetail iliTabDetail : iliTabDetailList.dtls.items()) {
			instructionLineItemKey.instructLineItemID = iliTabDetail.instructLineItemID;
			instructionLineItemDtls = instructionLineItemObj.read(instructionLineItemKey);
			DateRange coverPeriodDateRange = new DateRange(instructionLineItemDtls.coverPeriodFrom,instructionLineItemDtls.coverPeriodTo);
			if(coverPeriodDateRange.contains(currentDate) 
					&& instructionLineItemDtls.statusCode.equals(ILISTATUS.PROCESSED)
					&& instructionLineItemDtls.instructLineItemCategory.equals(ILICATEGORY.PAYMENTINSTRUCTION)
					&& instructionLineItemDtls.instructionLineItemType.equals(ILITYPE.MOLSA_AMOUNT)) {
				isPaid = true;
			}
			
			
		}
		
		
		return isPaid;
	}

	/**
	 * Return the suspended Case Details to the output struct.
	 * 
	 * @return List<MOLSAGenerateEFTDetail>
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private List<MOLSAGenerateEFTDetail> getSupendedCaseDetails()
			throws AppException, InformationalException {
		List<MOLSAGenerateEFTDetail> generateEFTDetailList = new ArrayList<MOLSAGenerateEFTDetail>();
		MOLSAGenerateEFTDetail generateEFTDetail;

		// Suspended Cases Amount
		CaseHeader caseHeaderObj = CaseHeaderFactory.newInstance();
		CaseHeaderByStatusKey caseHeaderByStatusKey = new CaseHeaderByStatusKey();
		caseHeaderByStatusKey.statusCode = CASESTATUS.SUSPENDED;
		CaseHeaderDtlsList caseHeaderDtlsList = caseHeaderObj
				.searchByStatusCode(caseHeaderByStatusKey);
		caseHeaderDtlsList = filterProductDelivery(caseHeaderDtlsList);
		CaseStatus caseStatusObj = CaseStatusFactory.newInstance();
		CurrentCaseStatusKey currentCaseStatusKey;
		
		CaseNominee caseNomineeObj = CaseNomineeFactory.newInstance();
		CaseNomineeKey caseNomineeKey = new CaseNomineeKey();
		CaseNomineeDtls caseNomineeDtls;

		double totalSuspendedAmount = 0;
		FinancialComponent financialComponentObj = FinancialComponentFactory
				.newInstance();
		FCstatusCodeCaseID fcstatusCodeCaseID = new FCstatusCodeCaseID();
		Date currentDate = Date.getCurrentDate();
		FrequencyPattern frequencyPattern = new FrequencyPattern();
		for (CaseHeaderDtls caseHeaderDtls : caseHeaderDtlsList.dtls.items()) {
			currentCaseStatusKey = new CurrentCaseStatusKey();
			currentCaseStatusKey.caseID = caseHeaderDtls.caseID;
			

			fcstatusCodeCaseID = new FCstatusCodeCaseID();
			fcstatusCodeCaseID.caseID = caseHeaderDtls.caseID;
			fcstatusCodeCaseID.statusCode = FINCOMPONENTSTATUS.CLOSED_OUTOFDATE;
			FinancialComponentDtlsList financialComponentDtlsList = financialComponentObj
					.searchByStatusCaseID(fcstatusCodeCaseID);
			FinancialComponentDtls financialComponentDtls = returnLastFinancialComponentForSuspendedCase(financialComponentDtlsList);
			if (financialComponentDtls != null && ! isSuspendedPaidForMonth(caseHeaderDtls.caseID)) {
				generateEFTDetail = new MOLSAGenerateEFTDetail();
				generateEFTDetail.isSuspended = true;
				generateEFTDetail.deptCode = Configuration
						.getProperty(EnvVars.EFT_DEPT_CODE);
				generateEFTDetail.staffNumber = MOLSAParticipantHelper
						.returnConcernRoleAlternateID(
								financialComponentDtls.concernRoleID,
								CONCERNROLEALTERNATEID.INSURANCENUMBER);
				caseNomineeKey.caseNomineeID = financialComponentDtls.caseNomineeID;
				caseNomineeDtls = caseNomineeObj.read(caseNomineeKey);
				long concernRoleID = MOLSAParticipantHelper
						.returnConcernRoleIDFromCaseParticipantRoleID(caseNomineeDtls.caseParticipantRoleID);
				
				PaymentInstrumentDtls paymentInstrumentDtls = returnLatestPaymentDetails(concernRoleID);
				if(paymentInstrumentDtls !=null) {
					BankAccountDtls bankAccountDtls = MOLSAFinancialHelper
							.returnBankAccountDetails(paymentInstrumentDtls.bankAccountID);
					generateEFTDetail.accountNumber = bankAccountDtls.iban;
					generateEFTDetail.bankSwift = CodeTable.getOneItem(
							MOLSABICCODE.TABLENAME,
							bankAccountDtls.bic,
							TransactionInfo.getProgramLocale());
				}

				generateEFTDetail.fullname_ar = MOLSAParticipantHelper
				.returnAlternateName(concernRoleID, ALTERNATENAMETYPE.REGISTERED);
				generateEFTDetail.fullname_en = MOLSAParticipantHelper
						.returnAlternateName(concernRoleID,
								ALTERNATENAMETYPE.ENGLISH);

				generateEFTDetail.currencyCode = Configuration
						.getProperty(EnvVars.EFT_CURRENCY_CODE);

				frequencyPattern = new FrequencyPattern(
						financialComponentDtls.frequency);
				Date[] dates = frequencyPattern.getAllOccurrences(
						financialComponentDtls.dueDate, currentDate);
				double amount = 0.00;
				int numberOfMonths = dates.length+1;
				amount = financialComponentDtls.amount.getValue()
				* numberOfMonths;
				

				generateEFTDetail.amount = new Money(amount);
				generateEFTDetailList.add(generateEFTDetail);

			}

		}
		return generateEFTDetailList;
	}

	/**
	 * Return the latest Closed Financial Component.
	 * 
	 * @param financialComponentDtlsList
	 *            FinancialComponentDtlsList
	 * @return FinancialComponentDtls
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private FinancialComponentDtls returnLastFinancialComponentForSuspendedCase(
			FinancialComponentDtlsList financialComponentDtlsList)
			throws AppException, InformationalException {
		FinancialComponentDtls outFinancialComponentDtls = null;
		filterFinancialComponent(financialComponentDtlsList);

		// Sort with respect to Expiry Date
		Collections.sort(financialComponentDtlsList.dtls,
				new Comparator<FinancialComponentDtls>() {
					public int compare(FinancialComponentDtls o1,
							FinancialComponentDtls o2) {
						return o2.expiryDate.compareTo(o1.expiryDate);
					}
				});

		for (FinancialComponentDtls financialComponentDtls : financialComponentDtlsList.dtls
				.items()) {
			if (!financialComponentDtls.expiryDate.equals(Date.kZeroDate)
					&& (financialComponentDtls.nextProcessingDate.before(Date
							.getCurrentDate()) || financialComponentDtls.nextProcessingDate
							.equals(Date.getCurrentDate()))) {
				if(financialComponentDtls.amount.getValue()>0) {
					outFinancialComponentDtls = financialComponentDtls;
					break;
				}
			}
		}
		return outFinancialComponentDtls;
	}

	/**
	 * Updates the Payment Instrument Status to Issued.
	 * 
	 * @param paymentInstrumentDtlsList
	 *            PaymentInstrumentDtlsList
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private void updatePaymentInstrumentStatus(
			PaymentInstrumentDtlsList paymentInstrumentDtlsList)
			throws AppException, InformationalException {
		PaymentInstrument paymentInstrumentObj = PaymentInstrumentFactory
				.newInstance();
		EffectiveDateReconcilStatusVersionNo effectiveDateReconcilStatusVersionNo;
		PaymentInstrumentKey paymentInstrumentKey;
		for (PaymentInstrumentDtls paymentInstrumentDtls : paymentInstrumentDtlsList.dtls
				.items()) {
			effectiveDateReconcilStatusVersionNo = new EffectiveDateReconcilStatusVersionNo();
			effectiveDateReconcilStatusVersionNo.versionNo = paymentInstrumentDtls.versionNo;
			effectiveDateReconcilStatusVersionNo.effectiveDate = Date
					.getCurrentDate();
			effectiveDateReconcilStatusVersionNo.reconcilStatusCode = PMTRECONCILIATIONSTATUS.ISSUED;
			paymentInstrumentKey = new PaymentInstrumentKey();
			paymentInstrumentKey.pmtInstrumentID = paymentInstrumentDtls.pmtInstrumentID;
			paymentInstrumentObj.modifyEffectiveDateReconcilStatus(
					paymentInstrumentKey, effectiveDateReconcilStatusVersionNo);

			// Code to send call SMS interface and select a
			// correct message.
			curam.molsa.sms.sl.intf.MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory
					.newInstance();
			 AppException msg =new AppException(MOLSASMSSERVICE.SALARYINFORMATION);
		     msg.arg(paymentInstrumentDtls.amount);
		     String message=msg.getLocalizedMessage();
		        
			MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails = new MOLSAConcernRoleListAndMessageTextDetails();
			// Set the message details.
			concernRoleListAndMessageTextDetails.dtls.smsMessageText = message;
			concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList = String
					.valueOf(paymentInstrumentDtls.concernRoleID);
			// Pointing to the message template.
			concernRoleListAndMessageTextDetails.dtls.smsMessageType = MOLSASMSMESSAGETEMPLATE.SALARYINFORMATION;
			molsasmsUtilObj.sendSMSDPMode(concernRoleListAndMessageTextDetails);
			invokeNotification(paymentInstrumentDtls.pmtInstrumentID, "paymentNotification");
		}
	}

	/**
	 * Method to invoke Mobility Payment Notification.
	 * 
	 * @param paymentId
	 *          - PaymentInstrument Id
	 * @param apiName
	 *          - method name to invoke
	 * @return
	 */
	private <T> T invokeNotification(long paymentId, String apiName) {
		T handler = null;
		try {

			String handlerClass = Configuration
					.getProperty("dm.notification.service.PaymentNotificationHandlerClass");
			if (handlerClass == null) {
				// assign default implementation.
				return null;
			}
			Class<?> eventClass = Class.forName(handlerClass);
			final T resultObjecct = (T) eventClass.newInstance();
			handler = resultObjecct;
			resultObjecct.getClass().getMethod(apiName, new Class[] { long.class })
					.invoke(resultObjecct, new Object[] { paymentId });
		} catch (InvocationTargetException e) {
			Logger.getLogger(this.getClass()).error(e.getMessage());
		} catch (Throwable e) {
			Logger.getLogger(this.getClass()).error(e.getMessage());
		}
		return handler;
	}

	/**
	 * Populate the general details and return the current Month/Year Details.
	 * 
	 * @param generateEFTDetailList
	 *            MOLSAGenerateEFTDetailList
	 * @return MonthYearDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private MonthYearDetails populateExelGenericDetails(
			MOLSAGenerateEFTDetailList generateEFTDetailList)
			throws AppException, InformationalException {
		String compBankAccountID = Configuration
				.getProperty(EnvVars.EFT_BANKACCOUNTID);

		generateEFTDetailList.bankCode = Configuration.getProperty(EnvVars.EFT_BANK_CODE);
		generateEFTDetailList.compAccount = Configuration
    .getProperty(EnvVars.EFT_COMPANY_ACCOUNT_NUMBER);
		
			//CodeTable.getOneItem(MOLSABICCODE.TABLENAME, bankAccountDtls.bic, TransactionInfo.getProgramLocale());

		generateEFTDetailList.compCode = Configuration
				.getProperty(EnvVars.EFT_COMP_CODE);
		generateEFTDetailList.fileDesc = Configuration
				.getProperty(EnvVars.EFT_SAL_CODE);

		String dayOfMonth = Configuration
				.getProperty(EnvVars.EFT_FINANCIAL_DAY);

		MonthYearDetails monthYearDetails = MOLSAGenerateEFTHelper
				.getMonthYearDetail(Date.getCurrentDate());
		Date dueDate = DateUtil.getISODate(monthYearDetails.year
				+ monthYearDetails.monthCode + dayOfMonth);
				
		generateEFTDetailList.dueDate = dueDate;
		return monthYearDetails;
	}

	/**
	 * This method will populate the exel details and Generate the Exel.
	 * 
	 * @param generateEFTDetailList
	 *            List<PaymentInstrumentDtls>
	 * @param generateEFTParam
	 *            MOLSAGenerateEFTParam
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */

	private double generateExelForFinance(
			MOLSAGenerateEFTDetailList generateEFTDetailList,
			MOLSAGenerateEFTParam generateEFTParam) throws AppException,
			InformationalException {

		double totalAmount = generateEFTDetailList.totalAmount.getValue();
		MonthYearDetails monthYearDetails = MOLSAGenerateEFTHelper
				.getMonthYearDetail(Date.getCurrentDate());
		List<MOLSAGenerateEFTDetail> generateEFTDetailListForSuspended = getSupendedCaseDetails();
		for (MOLSAGenerateEFTDetail molsaGenerateEFTDetail : generateEFTDetailListForSuspended) {
		  if(molsaGenerateEFTDetail.amount.getValue()>0) {
  			totalAmount += molsaGenerateEFTDetail.amount.getValue();
  			generateEFTDetailList.dtls.addRef(molsaGenerateEFTDetail);
		  }
		}
		List<MOLSAGenerateEFTDetail> generateEFTDetailListForOpenAndSubmitted = getOpenAndSubmittedCaseDetails();
		for (MOLSAGenerateEFTDetail molsaGenerateEFTDetail : generateEFTDetailListForOpenAndSubmitted) {
		  if(molsaGenerateEFTDetail.amount.getValue()>0) {
  			totalAmount += molsaGenerateEFTDetail.amount.getValue();
  			generateEFTDetailList.dtls.addRef(molsaGenerateEFTDetail);
		  }
		}
		List<MOLSAGenerateEFTDetail> generateEFTDetailListForOpenAndSubmittedUnderPaymentCase
		= getOpenAndSubmittedUnderPaymentCaseDetails();
		for (MOLSAGenerateEFTDetail molsaGenerateEFTDetail : generateEFTDetailListForOpenAndSubmittedUnderPaymentCase) {
		  if(molsaGenerateEFTDetail.amount.getValue()>0) {
  			totalAmount += molsaGenerateEFTDetail.amount.getValue();
  			generateEFTDetailList.dtls.addRef(molsaGenerateEFTDetail);
		  }
		}
		generateEFTDetailList.totalAmount=new Money(totalAmount);
		
		LocalisableString remarks = new LocalisableString(
				MOLSABPOGENERATEEFT.REMARKS_CONTENT);
		remarks.arg(monthYearDetails.monthCode + "-" + monthYearDetails.year);
		remarks.arg(new Money(totalAmount)+"");
		generateEFTDetailList.remarks = remarks.getMessage();

		/** Starting the UnProcessed Amount */
		MOLSAGenerateEFTDetailList unprocessedGenerateEFTDetailList = new MOLSAGenerateEFTDetailList();
		List<MOLSAGenerateEFTDetail> unProcessedGenerateEFTDetailList = getUnProcessedAmountDetails();
		unprocessedGenerateEFTDetailList.bankCode= generateEFTDetailList.bankCode;
		unprocessedGenerateEFTDetailList.compAccount=generateEFTDetailList.compAccount;
		unprocessedGenerateEFTDetailList.compCode=generateEFTDetailList.compCode;
		unprocessedGenerateEFTDetailList.dueDate=generateEFTDetailList.dueDate;
		unprocessedGenerateEFTDetailList.fileDesc=generateEFTDetailList.fileDesc;
		double unProcessedTotalAmount = 0;
		for (MOLSAGenerateEFTDetail molsaGenerateEFTDetail : unProcessedGenerateEFTDetailList) {
			  if(molsaGenerateEFTDetail.amount.getValue()>0) {
				  unProcessedTotalAmount += molsaGenerateEFTDetail.amount.getValue();
				  unprocessedGenerateEFTDetailList.dtls.addRef(molsaGenerateEFTDetail);
			  }
			}
		LocalisableString remarks1 = new LocalisableString(
				MOLSABPOGENERATEEFT.REMARKS_CONTENT);
		remarks1.arg(monthYearDetails.monthCode + "-" + monthYearDetails.year);
		remarks1.arg(new Money(unProcessedTotalAmount)+"");
		unprocessedGenerateEFTDetailList.remarks = remarks1.getMessage();
		unprocessedGenerateEFTDetailList.remarks=remarks1.getMessage();
		
		MOLSAGenerateEFTHelper.newInstance().generateExelForFinance(
				generateEFTDetailList, unprocessedGenerateEFTDetailList, generateEFTParam,
				MOLSAGenerateEFTHelper.getExelName(false, monthYearDetails));

		return unProcessedTotalAmount;
	}

	/**
	 * This method will populate the exel details and Generate the Exel.
	 * 
	 * @param paymentInstrumentDtlsList
	 *            List<PaymentInstrumentDtls>
	 * @param generateEFTParam
	 *            MOLSAGenerateEFTParam
	 * @return MOLSAGenerateEFTDetailList
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General ExceptionList
	 */
	private MOLSAGenerateEFTDetailList generateExelForBank(
			PaymentInstrumentDtlsList paymentInstrumentDtlsList,
			MOLSAGenerateEFTParam generateEFTParam) throws AppException,
			InformationalException {

		MOLSAGenerateEFTDetailList generateEFTDetailList = new MOLSAGenerateEFTDetailList();

		MonthYearDetails monthYearDetails = populateExelGenericDetails(generateEFTDetailList);

		double totalAmount = 0;

		MOLSAGenerateEFTDetail generateEFTDetail;
		BankAccountDtls bankAccountDtls;
		for (PaymentInstrumentDtls paymentInstrumentDtls : paymentInstrumentDtlsList.dtls
				.items()) {
			generateEFTDetail = new MOLSAGenerateEFTDetail();
			generateEFTDetail.deptCode = Configuration
					.getProperty(EnvVars.EFT_DEPT_CODE);
			generateEFTDetail.staffNumber = MOLSAParticipantHelper
					.returnConcernRoleAlternateID(
							paymentInstrumentDtls.concernRoleID,
							CONCERNROLEALTERNATEID.INSURANCENUMBER);

			generateEFTDetail.fullname_ar = MOLSAParticipantHelper
			.returnAlternateName(paymentInstrumentDtls.concernRoleID, ALTERNATENAMETYPE.REGISTERED);
			generateEFTDetail.fullname_en = MOLSAParticipantHelper
					.returnAlternateName(paymentInstrumentDtls.concernRoleID,
							ALTERNATENAMETYPE.ENGLISH);

			bankAccountDtls = MOLSAFinancialHelper
					.returnBankAccountDetails(paymentInstrumentDtls.bankAccountID);
			generateEFTDetail.accountNumber = bankAccountDtls.iban;
			generateEFTDetail.bankSwift = CodeTable.getOneItem(MOLSABICCODE.TABLENAME, bankAccountDtls.bic, TransactionInfo.getProgramLocale());
			generateEFTDetail.currencyCode = Configuration
					.getProperty(EnvVars.EFT_CURRENCY_CODE);
			generateEFTDetail.amount = paymentInstrumentDtls.amount;
			if(paymentInstrumentDtls.amount.getValue()> 0) {
  			totalAmount += generateEFTDetail.amount.getValue();
  			generateEFTDetailList.dtls.addRef(generateEFTDetail);
			}

		}

		LocalisableString remarks = new LocalisableString(
				MOLSABPOGENERATEEFT.REMARKS_CONTENT);
		remarks.arg(monthYearDetails.monthCode + "-" + monthYearDetails.year);
		remarks.arg(new Money(totalAmount));
		generateEFTDetailList.remarks = remarks.getMessage();
		generateEFTDetailList.totalAmount = new Money(totalAmount);

		MOLSAGenerateEFTHelper.newInstance().generateExel(
				generateEFTDetailList, generateEFTParam,
				MOLSAGenerateEFTHelper.getExelName(true, monthYearDetails));
		return generateEFTDetailList;

	}
	
	

}
