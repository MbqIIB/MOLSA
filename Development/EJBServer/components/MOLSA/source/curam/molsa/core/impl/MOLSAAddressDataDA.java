package curam.molsa.core.impl;

import curam.codetable.ADDRESSELEMENTTYPE;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.core.impl.EnvVars;
import curam.core.struct.AddressFieldDetails;
import curam.core.struct.OtherAddressData;
import curam.message.BPOADDRESS;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;

/**
 * 
 * This is class is overridden from OOTB to include the Arabic Address Format changes.
 * Since adding the Arabic address format has larger impact to other parts of the code,
 *  this class is overridden by making replace superclass=yes, which is NOT complaint to the IBM standard.
 *  A PMR has been raised to include the Arabic Address.
 *  This is made as a temp fix , until the PMR is resolved. 
 *  We can remove this overriding class, once the PMR is resolved.
 *  
 *
 */
public abstract class MOLSAAddressDataDA extends  curam.molsa.core.base.MOLSAAddressDataDA{

 
  /**
   * See the Class level comment.
   */
  @Override
  public OtherAddressData parseFieldsToData(AddressFieldDetails addressFieldDetails) throws AppException, InformationalException {
    OtherAddressData addressData;
    //MOLSA- Needs to change to Arabic Version
    if(ADDRESSLAYOUTTYPE.US.equals(addressFieldDetails.addressLayoutType))
    {
            addressData = parseARFieldsToData(addressFieldDetails);
    } else if(ADDRESSLAYOUTTYPE.US.equals(addressFieldDetails.addressLayoutType))
    {
        if(Configuration.getBooleanProperty(EnvVars.ENV_USADDRESSWITHCOUNTY, Configuration.getBooleanProperty("NO")))
            addressData = parseUSWithCountyFieldsToData(addressFieldDetails);
        else
            addressData = parseUSFieldsToData(addressFieldDetails);
    } else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.UK))
        addressData = parseUKFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.CA))
        addressData = parseCAFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.CA_CIVIC))
        addressData = parseCACivicFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.TW))
        addressData = parseTWFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.CN))
        addressData = parseCNFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.KR))
        addressData = parseKRFieldsToData(addressFieldDetails);
    else
    if(addressFieldDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.JP))
        addressData = parseJPFieldsToData(addressFieldDetails);
    else
        addressData = new OtherAddressData();
    return addressData;
  }

  /**
   * See the Class level comment.
   */
  @Override
  protected OtherAddressData parseARFieldsToData(AddressFieldDetails addressFieldDetails) throws AppException, InformationalException {
    OtherAddressData addressData = new OtherAddressData();
    String sModifiableInd = "";
    StringBuffer formatBuffer = new StringBuffer();
    String sZip;
    if(addressFieldDetails.zipCode.length() > 0)
        sZip = addressFieldDetails.zipCode;
    else
        sZip = "";
    if(sZip == null)
        sZip = "";
    if(addressFieldDetails.modifiableInd)
        sModifiableInd = "1";
    else
        sModifiableInd = "0";
    formatBuffer.ensureCapacity("\n".length() * 11 + "0".length() * 2 + 6 + "1".length() 
        + ADDRESSLAYOUTTYPE.US.length() + addressFieldDetails.countryCode.length() + sModifiableInd.length() 
        + ADDRESSELEMENTTYPE.CITY.length() + addressFieldDetails.city.length() 
        + ADDRESSELEMENTTYPE.LINE1.length() + addressFieldDetails.addressLine1.length() 
        + ADDRESSELEMENTTYPE.LINE2.length() + addressFieldDetails.addressLine2.length() 
        + ADDRESSELEMENTTYPE.UNIT_NUMBER.length() + addressFieldDetails.suiteNum.length() 
        + ADDRESSELEMENTTYPE.LINE4.length() + addressFieldDetails.addressLine4.length() 
        + ADDRESSELEMENTTYPE.POBOXNO.length() + addressFieldDetails.postalCode.length() 
        + ADDRESSELEMENTTYPE.LINE5.length() + addressFieldDetails.addressLine5.length() 
        + ADDRESSELEMENTTYPE.COUNTRY.length() + addressFieldDetails.countryCode.length() 
        + ADDRESSELEMENTTYPE.ZIP.length() + sZip.length());
    formatBuffer.append("1");
    formatBuffer.append("\n");
    formatBuffer.append("0");
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSLAYOUTTYPE.US);
    formatBuffer.append("\n");
    formatBuffer.append(addressFieldDetails.countryCode);
    formatBuffer.append("\n");
    formatBuffer.append(sModifiableInd);
    formatBuffer.append("\n");
    formatBuffer.append("0");
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.CITY);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.city);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.LINE1);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.addressLine1);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.LINE2);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.addressLine2);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.UNIT_NUMBER);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.suiteNum);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.LINE4);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.addressLine4);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.LINE5);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.addressLine5);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.POBOXNO);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.postalCode);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.ZIP);
    formatBuffer.append('=');
    formatBuffer.append(sZip);
    formatBuffer.append("\n");
    formatBuffer.append(ADDRESSELEMENTTYPE.COUNTRY);
    formatBuffer.append('=');
    formatBuffer.append(addressFieldDetails.countryCode);
    addressData.addressData = formatBuffer.toString();
    return addressData;
  }

  /**
   * See the Class level comment.
   */
  public OtherAddressData getAddressDataForLocale()
    throws AppException, InformationalException
  {
    return getAddressDataForLocale(false);
  }
  
  /**
   * See the Class level comment.
   */
  protected OtherAddressData getAddressDataForLocale(boolean displayInd)
    throws AppException, InformationalException
  {
    String kEnGB = "en_GB";
    String noAddress;

    if (displayInd) {
      noAddress = new LocalisableString(BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE).getMessage(TransactionInfo.getProgramLocale());
    } else {
      noAddress = BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(TransactionInfo.getProgramLocale());
    }
    String kDeDE = "de_DE";
    

    String kEnCA = "en_CA";
    String kZhTw = "zh_TW";
    String kZhCn = "zh_CN";
    String kJa = "ja";
    String kKo = "ko";
    

    String addressDataLocaleForDefaultAddresses = Configuration.getProperty(EnvVars.ENV_ADDRESSDATALOCALEFORDEFAULTADDRESSES);
    if (addressDataLocaleForDefaultAddresses == null) {
      addressDataLocaleForDefaultAddresses = Configuration.getProperty("en_US");
    }
    OtherAddressData otherAddressData = new OtherAddressData();
    if ("en_GB".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nUK\nGB\n1\n0\nADD1=" + noAddress + "\n" + "ADD2=" + "\n" + "ADD3=" + "\n" + "ADD4=" + "\n" + "ADD5=" + "\n" + "CITY=" + "\n" + "POSTCODE=" + "\n" + "COUNTRY=" + "\n");
    }
    else if ("de_DE".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nDE\nDE\n1\n0\nADD1=" + noAddress + "\n" + "ADD2=" + "\n" + "DISTRICT=" + "\n" + "POBOXNO=" + "\n" + "POSTCODE=" + noAddress + "\n" + "CITY=" + noAddress + "\n" + "COUNTRY=" + "\n");
    }
    else if ("en_CA".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      String addressLayout = Configuration.getProperty(EnvVars.ENV_ADDRESS_LAYOUT);
      if ((addressLayout == null) || (addressLayout.isEmpty())) {
        addressLayout = "US";
      }
      if (addressLayout.equals(ADDRESSLAYOUTTYPE.CA_CIVIC)) {
        otherAddressData.addressData = ("1\n0\nCACIVIC\nCA\n1\n0\nADI=\nUNITNO=\nSTRNUMBER=\nSTRNOSFX=\nSTRNAME=" + noAddress + "\n" + "STRTYPE=" + "\n" + "STRDIR=" + "\n" + "CITY=" + "\n" + "PROV=" + "\n" + "POSTCODE=" + "\n");
      } else {
        otherAddressData.addressData = ("1\n0\nCA\nCA\n1\n0\nPOSTCODE=\nAPT=\nADD1=" + noAddress + "\n" + "CITY=" + noAddress + "\n" + "ADD2=" + "\n" + "PROV=" + "\n");
      }
    }
    else if ("zh_TW".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nTW\nTW\n1\n0\nPOSTCODE=\nCITY=\nDISTRICT=\nADD1=" + noAddress + "\n" + "ADD2=" + "\n");
    }
    else if ("zh_CN".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nCN\nCN\n1\n0\nPOSTCODE=\nPROV=\nCITY=\nDISTRICT=\nADD1=" + noAddress + "\n" + "ADD2=" + "\n");
    }
    else if ("ja".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nJP\nJP\n1\n0\nPOSTCODE=\nPROV=\nCITY=\nADD1=" + noAddress + "\n" + "ADD2=" + "\n");
    }
    else if ("ko".equalsIgnoreCase(addressDataLocaleForDefaultAddresses))
    {
      otherAddressData.addressData = ("1\n0\nKR\nKR\n1\n0\nPOSTCODE=\nCITY=\nADD1=" + noAddress + "\n" + "ADD2=" + "\n");
    }
    else if (Configuration.getBooleanProperty(EnvVars.ENV_USADDRESSWITHCOUNTY, Configuration.getBooleanProperty("NO")))
    {
      otherAddressData.addressData = ("1\n0\nUS\nUS\n1\n0\nZIP=\nADD3=\nUSCOUNTY=\nADD2=" + noAddress + "\n" + "CITY=" + "\n" + "ADD1=" + "\n" + "STATE=" + "\n");
    }
    else
    {
      otherAddressData.addressData = ("1\n0\nUS\nUS\n1\n0\nZIP=\nCITY="+ "MM17000"+ "\nADD1="+"MZ17000"+"\nADD2=" + "MS17000" + "\n" + "UNITNO=" + "\n" + "POBOXNO=" + "\n" + "ADD4=" + "\n"+ "COUNTRY=QA" + "\n"+ "ADD5=" + "\n");
    }
    return otherAddressData;
  }
 
  

}
