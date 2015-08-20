package curam.molsa.test.eft;

import java.util.Collections;
import java.util.Comparator;

import curam.core.struct.BankAccountDtls;
import curam.core.struct.BankBranchDtls;
import curam.core.struct.BankDtls;
import curam.core.struct.FinancialComponentDtls;
import curam.core.struct.FinancialComponentDtlsList;
import curam.dynamicevidence.util.impl.DateUtil;
import curam.evidence.sl.struct.MonthYearDetails;
import curam.molsa.codetable.MOLSABICCODE;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetailList;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTMsWordDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.util.impl.MOLSAFinancialHelper;
import curam.molsa.util.impl.MOLSAGenerateEFTHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.Date;
import curam.util.type.Money;

/**
 * 
 * This is to test Exel Helper function.
 * 
 */
public class MOLSAGenerateEFTHelperTest extends CuramServerTest {


  /**
   * Constructor.
   * 
   * @param arg0
   *          String
   */
  public MOLSAGenerateEFTHelperTest(String arg0) {
    super(arg0);
  }

 

  /**
   * Method to test the EFT Exel
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public void testGenerateExel() throws AppException, InformationalException {

    MOLSAGenerateEFTDetailList generateEFTDetailList = new MOLSAGenerateEFTDetailList();
    generateEFTDetailList.compCode="104";
    generateEFTDetailList.bankCode="QNB";
    generateEFTDetailList.compAccount="QA01 QNBA 0000 0000 1234 1234 1234 1";
    generateEFTDetailList.dueDate=Date.fromISO8601("20141030");
    generateEFTDetailList.remarks="Salary for the Month July 2014"+new Money(120000000);
    generateEFTDetailList.fileDesc="Sal";
    
    MOLSAGenerateEFTDetail generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 1";
    generateEFTDetail.amount=new Money(1000);
    generateEFTDetail.fullname_ar="James AR";
    generateEFTDetail.fullname_en ="James EN";
    generateEFTDetail.bankSwift="IBAN1";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT1";
    generateEFTDetail.staffNumber="QID1";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 2";
    generateEFTDetail.amount=new Money(2000);
    generateEFTDetail.fullname_ar="Linda AR";
    generateEFTDetail.fullname_en ="Linda EN";
    generateEFTDetail.bankSwift="IBAN2";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT2";
    generateEFTDetail.staffNumber="QID2";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.isSuspended= true;
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 3";
    generateEFTDetail.amount=new Money(2000);
    generateEFTDetail.fullname_ar="Robert AR";
    generateEFTDetail.fullname_en ="Robert EN";
    generateEFTDetail.bankSwift="IBAN3";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT3";
    generateEFTDetail.staffNumber="QID3";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 4";
    generateEFTDetail.isSuspended= true;
    generateEFTDetail.amount=new Money(5000);
    generateEFTDetail.fullname_ar="Ryan AR";
    generateEFTDetail.fullname_en ="Ryan EN";
    generateEFTDetail.bankSwift="IBAN3";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT4";
    generateEFTDetail.staffNumber="QID4";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    MOLSAGenerateEFTParam generateEFTParam = new MOLSAGenerateEFTParam();  
    boolean isExelGeneratedSuccessfully = false;
    try{
      MonthYearDetails monthYearDetails= MOLSAGenerateEFTHelper.getMonthYearDetail(Date.getCurrentDate());
      MOLSAGenerateEFTHelper.newInstance().generateExel(generateEFTDetailList, generateEFTParam, 
          MOLSAGenerateEFTHelper.getExelName(true, monthYearDetails));
      //Generated Exel sheet without any Error
      isExelGeneratedSuccessfully = true;
    } catch (Exception e) {
      //Error Occurred while generating the Exel
      isExelGeneratedSuccessfully = false;
      e.printStackTrace();
    }
    
    assertTrue(isExelGeneratedSuccessfully);
  }

  /**
   * Method to test the MSWord Generation
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public void testGenerateMsWord() throws AppException, InformationalException {

    MOLSAGenerateEFTMsWordDetail generateEFTMsWordDetail = new MOLSAGenerateEFTMsWordDetail();
    String compBankAccountID = Configuration.getProperty("curam.molsa.financial.eft.compBankAccountID");
    BankAccountDtls bankAccountDtls = 
      MOLSAFinancialHelper.returnBankAccountDetails(Long.parseLong(compBankAccountID));
    BankBranchDtls bankBranchDtls  = MOLSAFinancialHelper.returnBankBranchDetails(bankAccountDtls.bankBranchID);
    BankDtls bankDtls  = MOLSAFinancialHelper.returnBankDetails(bankBranchDtls.bankID);   
    
    generateEFTMsWordDetail.compAccount=bankAccountDtls.iban;
    	
    	//CodeTable.getOneItem(MOLSABICCODE.TABLENAME, 
			//bankAccountDtls.bic, TransactionInfo.getProgramLocale());
    generateEFTMsWordDetail.socialAffairMinisterName = 
      Configuration.getProperty("curam.molsa.financial.eft.nameOfAssistanceMinisterForSocialAffair");
    generateEFTMsWordDetail.securityDirectorName = 
      Configuration.getProperty("curam.molsa.financial.eft.nameOfSocialSecurityDirector");
    
    String dayOfMonth = Configuration.getProperty("curam.molsa.financial.paymentDay");
    MonthYearDetails monthYearDetails = MOLSAGenerateEFTHelper.getMonthYearDetail(Date.getCurrentDate()) ;
    Date dueDate = DateUtil.getISODate(monthYearDetails.year+monthYearDetails.monthCode+dayOfMonth);
    generateEFTMsWordDetail.dueDate=dueDate.toString();
    generateEFTMsWordDetail.forMonth=monthYearDetails.monthCode+"/"+monthYearDetails.year;
    Money mon = new Money(120000000);
    generateEFTMsWordDetail.transferAmount=mon.getValue()+" "+Configuration.getProperty("curam.financial.basecurrency");
    
     
    boolean isExelGeneratedSuccessfully = false;
    try{
      MOLSAGenerateEFTHelper.newInstance().generateMsWord(generateEFTMsWordDetail, 
          MOLSAGenerateEFTHelper.getMsWordName( monthYearDetails));
      //Generated Exel sheet without any Error
      isExelGeneratedSuccessfully = true;
    } catch (Exception e) {
      //Error Occurred while generating the Exel
      isExelGeneratedSuccessfully = false;
      e.printStackTrace();
    }
    
    assertTrue(isExelGeneratedSuccessfully);
  }
}
