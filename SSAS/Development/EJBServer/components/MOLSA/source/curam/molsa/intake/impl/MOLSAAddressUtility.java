package curam.molsa.intake.impl;

import curam.core.impl.EnvVars;
import curam.message.BPOADDRESS;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;

/**
 * Overridden from OOTB AddressUtility to include the Arabic Address.
 * 
 * 
 *  A PMR has been raised to include the Arabic Address.
 *  This is made as a temp fix , until the PMR is resolved. 
 *  We can remove this overriding class, once the PMR is resolved.
 * 
 */
public class MOLSAAddressUtility {
 
  /**
   *Constructor
   */
  public MOLSAAddressUtility() {
  }

  /**
   * Changed to include the Arabic address format.
   * 
   * @return string
   * @throws AppException
   * GeneralException
   * @throws InformationalException
   * GeneralException
   */
  @SuppressWarnings("unused")
  public String getBlankUSAddressDataWithoutCountyDBInsert()
      throws AppException, InformationalException {
      String defaultLocale = Configuration.getProperty(EnvVars.ENV_DEFAULT_LOCALE);
      if(null == defaultLocale) {
        defaultLocale = Configuration.getProperty("en");
      }
      String noAddress = (new LocalisableString(BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE)).getMessage(defaultLocale);
      return (new StringBuilder()).append("1\n0\nUS\nCT6\n1\n0\nZIP=\nADD5=\nADD4=\nCOUNTRY=QA\nUNITNO=\nPOBOXNO=\nADD2=MS17000")
      .append("\n").append("CITY=MM17000").append("\n").append("ADD1=MZ17000").append("\n").toString();
  }
}
