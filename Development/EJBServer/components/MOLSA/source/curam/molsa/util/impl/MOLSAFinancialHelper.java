package curam.molsa.util.impl;

import curam.core.fact.BankAccountFactory;
import curam.core.fact.BankBranchFactory;
import curam.core.fact.BankFactory;
import curam.core.intf.Bank;
import curam.core.intf.BankAccount;
import curam.core.intf.BankBranch;
import curam.core.struct.BankAccountDtls;
import curam.core.struct.BankAccountKey;
import curam.core.struct.BankBranchDtls;
import curam.core.struct.BankBranchKey;
import curam.core.struct.BankDtls;
import curam.core.struct.BankKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
/**
 * 
 * The helper class for Financial.
 *
 */
public class MOLSAFinancialHelper {
  
  /**
   * Return the Bank Account Details
   * 
   * @param bankAccountID Long
   * @return The BankAccount Details
   * @throws InformationalException General Exception
   * @throws AppException General Exception
   */
  public static BankAccountDtls returnBankAccountDetails(long bankAccountID) throws AppException, InformationalException{
    BankAccount  bankAccountObj = BankAccountFactory.newInstance();
    BankAccountKey bankAccountKey = new BankAccountKey();
    bankAccountKey.bankAccountID = bankAccountID;
    BankAccountDtls bankAccountDtls = bankAccountObj.read(bankAccountKey);
    return bankAccountDtls;
  }
  
  /**
   * Return the Bank Branch Details
   * 
   * @param bankBranchID Long
   * @return The Bank Branch Details
   * @throws InformationalException General Exception
   * @throws AppException General Exception
   */
  public static BankBranchDtls returnBankBranchDetails(long bankBranchID) throws AppException, InformationalException{
    BankBranch  bankBranchObj = BankBranchFactory.newInstance();
    BankBranchKey bankBranchKey = new BankBranchKey();
    bankBranchKey.bankBranchID = bankBranchID;
    BankBranchDtls bankBranchDtls = bankBranchObj.read(bankBranchKey);
    return bankBranchDtls;
  }
  /**
   * Return the Bank Details
   * 
   * @param bankID Long
   * @return The Bank Details
   * @throws InformationalException General Exception
   * @throws AppException General Exception
   */
  public static BankDtls returnBankDetails(long bankID) throws AppException, InformationalException{
    Bank  bankObj = BankFactory.newInstance();
    BankKey bankKey = new BankKey();
    bankKey.bankID = bankID;
    BankDtls bankDtls = bankObj.read(bankKey);
    return bankDtls;
  }
}
