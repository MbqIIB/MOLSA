package curam.molsa.address.entity.impl;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import curam.codetable.ADDRESSELEMENTTYPE;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.ADDRESSUSCOUNTY;
import curam.codetable.COUNTRY;
import curam.codetable.MOLSAZONE;
import curam.codetable.PROVINCEREGION_CHINA_ADF;
import curam.codetable.PROVINCEREGION_JAPAN_ADF;
import curam.codetable.STREETNUMBERSUFFIXTYPE;
import curam.codetable.STREETTYPE;
import curam.codetable.impl.ADDRESSLAYOUTTYPEEntry;
import curam.core.fact.AddressDataFactory;
import curam.core.impl.EnvVars;
import curam.core.intf.AddressData;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.sl.struct.AddressString;
import curam.core.struct.AddressDataLineStruct;
import curam.core.struct.AddressDtls;
import curam.core.struct.AddressHeaderDetails;
import curam.core.struct.AddressLine;
import curam.core.struct.AddressLineList;
import curam.core.struct.AddressMap;
import curam.core.struct.AddressMapList;
import curam.core.struct.AddressTagDetails;
import curam.core.struct.ElementDetails;
import curam.core.struct.EmptyIndStruct;
import curam.core.struct.FormatPostalCode;
import curam.core.struct.LayoutKey;
import curam.core.struct.OtherAddressData;
import curam.core.struct.ValidateAddressResult;
import curam.message.BPOADDRESS;
import curam.molsa.codetable.MOLSAMULTIPLICITY;
import curam.molsa.codetable.MOLSASTREET;
import curam.molsa.core.fact.MOLSAAddressDataDAFactory;
import curam.molsa.core.intf.MOLSAAddressDataDA;
import curam.molsa.message.MOLSABPOADDRESS;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.resources.StringUtil;
import curam.util.transaction.TransactionInfo;
import curam.util.type.CodeTable;
import curam.util.type.StringList;

/**
 * 
 * This is class is overridden from OOTB to include the Arabic Address Format changes.
 * Since adding the Arabic address format has larger impact to other parts of the code,
 *  this class is overridden by making replace superclass=yes, which is NOT complaint to the IBM standard.
 *  A PMR has been raised to include the Arabic Address.
 *  This is made as a temp fix , until the PMR is resolved. 
 *  We can remove this overriding class, once the PMR is resolved.
 *
 */
public abstract class MOLSAAddressDA extends curam.molsa.address.entity.base.MOLSAAddressDA{
  
  protected static final class TagComparator
  implements Comparator<AddressMap>
{
    //TODO MOLSA- Needs to be changed once the Arabic Version is In
  //protected static final String[] usTags = { ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2, ADDRESSELEMENTTYPE.LINE3, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.STATE, ADDRESSELEMENTTYPE.ZIP };
  protected static final String[] usTags = { ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2,  ADDRESSELEMENTTYPE.UNIT_NUMBER, ADDRESSELEMENTTYPE.LINE4,ADDRESSELEMENTTYPE.POBOXNO, ADDRESSELEMENTTYPE.ZIP,  ADDRESSELEMENTTYPE.COUNTRY,   ADDRESSELEMENTTYPE.LINE5 };
  protected static final String[] usCountyTags = { ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2, ADDRESSELEMENTTYPE.LINE3, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.USCOUNTY, ADDRESSELEMENTTYPE.STATE, ADDRESSELEMENTTYPE.ZIP };
  protected static final String[] ukTags = { ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2, ADDRESSELEMENTTYPE.LINE3, ADDRESSELEMENTTYPE.LINE4, ADDRESSELEMENTTYPE.LINE5, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.COUNTY, ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.COUNTRY };
  protected static final String[] caTags = { ADDRESSELEMENTTYPE.APT, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.PROVINCE, ADDRESSELEMENTTYPE.POSTCODE };
  protected static final String[] deTags = { ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2, ADDRESSELEMENTTYPE.DISTRICT, ADDRESSELEMENTTYPE.POBOXNO, ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.COUNTRY };
  protected static final String[] caCivicTags = { ADDRESSELEMENTTYPE.ADDITIONAL_DELIVERY_INFORMATION, ADDRESSELEMENTTYPE.UNIT_NUMBER, ADDRESSELEMENTTYPE.STREET_NUMBER, ADDRESSELEMENTTYPE.STREET_NUMBER_SUFFIX, ADDRESSELEMENTTYPE.STREET_NAME, ADDRESSELEMENTTYPE.STREET_TYPE, ADDRESSELEMENTTYPE.STREET_DIRECTION, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.PROVINCE, ADDRESSELEMENTTYPE.POSTCODE };
  protected static final String[] TW_Tags = { ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.DISTRICT, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2 };
  protected static final String[] CN_Tags = { ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.PROVINCE, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.DISTRICT, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2 };
  protected static final String[] JP_Tags = { ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.PROVINCE, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2 };
  protected static final String[] KR_Tags = { ADDRESSELEMENTTYPE.POSTCODE, ADDRESSELEMENTTYPE.CITY, ADDRESSELEMENTTYPE.LINE1, ADDRESSELEMENTTYPE.LINE2 };
  protected static final TagComparator US = new TagComparator(usTags);
  protected static final TagComparator USCounty = new TagComparator(usCountyTags);
  protected static final TagComparator UK = new TagComparator(ukTags);
  protected static final TagComparator CA = new TagComparator(caTags);
  protected static final TagComparator DE = new TagComparator(deTags);
  protected static final TagComparator CACivic = new TagComparator(caCivicTags);
  protected static final TagComparator TW = new TagComparator(TW_Tags);
  protected static final TagComparator CN = new TagComparator(CN_Tags);
  protected static final TagComparator JP = new TagComparator(JP_Tags);
  protected static final TagComparator KR = new TagComparator(KR_Tags);
  protected static final int kLess = -1;
  protected static final int kGreater = 1;
  protected static final int kEqual = 0;
  protected final List tagList;
  
  protected TagComparator(String[] tagArray)
  {
    this.tagList = Arrays.asList(tagArray);
  }
  
  /**
   * See the Class level comment.
   */
  protected static TagComparator getInstance(String layoutIndicator)
    throws AppException, InformationalException
  {
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.US))
    {
      if (Configuration.getProperty(EnvVars.ENV_USADDRESSWITHCOUNTY).equals(EnvVars.ENV_VALUE_YES)) {
        return USCounty;
      }
      return US;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.UK)) {
      return UK;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.DE)) {
      return DE;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.CA)) {
      return CA;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.CA_CIVIC)) {
      return CACivic;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.TW)) {
      return TW;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.CN)) {
      return CN;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.JP)) {
      return JP;
    }
    if (layoutIndicator.equals(ADDRESSLAYOUTTYPE.KR)) {
      return KR;
    }
    AppException ae = new AppException(BPOADDRESS.ERR_ADDRESS_FV_LAYOUT_TYPE_INVALID);
    

    ae.arg(layoutIndicator);
    ValidationManagerFactory.getManager().throwWithLookup(ae, "a", 3);
    


    return null;
  }
  
  /**
   * See the Class level comment.
   */
  public int compare(AddressMap addressMap1, AddressMap addressMap2)
  {
    if (this.tagList.indexOf(addressMap1.name) < this.tagList.indexOf(addressMap2.name)) {
      return -1;
    }
    if (this.tagList.indexOf(addressMap1.name) > this.tagList.indexOf(addressMap2.name)) {
      return 1;
    }
    return 0;
  }
}

  /**
   * See the Class level comment.
   */
  @Override
  public void insert(AddressDtls details) throws AppException, InformationalException {
    OtherAddressData otherAddressData = new OtherAddressData();
    AddressDataLineStruct addressDataLineStruct = new AddressDataLineStruct();

    otherAddressData.addressData = details.addressData;
    addressDataLineStruct.lineIndex = 4;
    addressDataLineStruct.lineValue = String.valueOf(1);

    setAddressDataLine(otherAddressData, addressDataLineStruct);
    details.addressData = otherAddressData.addressData;

    insertInternal(details);
  }


  /**
   * See the Class level comment.
   */
  @Override
  public OtherAddressData getShortFormat(OtherAddressData addressDataString) throws AppException, InformationalException {

    OtherAddressData otherAddressData = new OtherAddressData();
    
    AddressString addressString = new AddressString();
    

    AddressData addressDataObj = AddressDataFactory.newInstance();
    

    AddressString addressFormatString = new AddressString();
    
    addressFormatString.addressString = Configuration.getProperty(EnvVars.ENV_ADDRESSSTRINGFORMAT);
    if (addressFormatString.addressString == null) {
      addressFormatString.addressString = Configuration.getProperty("CITY, ADD1, ADD2, COUNTRY");
    }
    String addressLayoutName = new String();
    
    addressLayoutName = Configuration.getProperty(EnvVars.ENV_ADDRESS_LAYOUT);
    if (addressLayoutName == null) {
      addressLayoutName = Configuration.getProperty("US");
    }
    if (ADDRESSLAYOUTTYPEEntry.CA_CIVIC.getCode().equals(addressLayoutName))
    {
      addressString.addressString = addressFormatString.addressString;
      StringBuilder stringBuilder = new StringBuilder();
      
      addressString.addressString = addressString.addressString.replace(" ", "| ");
      
      addressString.addressString = addressString.addressString.replace(",| ", "|, ");
      

      stringBuilder.append(addressString.addressString.replace("-", "|-"));
      

      stringBuilder.append("|");
      addressString.addressString = stringBuilder.toString();
    }
    else
    {
      addressString.addressString = addressFormatString.addressString;
      StringBuilder stringBuilder = new StringBuilder();
      
      stringBuilder.append(addressString.addressString.replace(",", "|,"));
      

      stringBuilder.append("|");
      addressString.addressString = stringBuilder.toString();
    }
    AddressMapList addressMapList = addressDataObj.parseDataToMapWithDelimiter(addressDataString);
    for (int i = 0; i < addressMapList.dtls.size(); i++) {
      if (((AddressMap)addressMapList.dtls.item(i)).value.isEmpty())
      {
        int intTagPosStart = addressString.addressString.indexOf(((AddressMap)addressMapList.dtls.item(i)).name);
        if (intTagPosStart >= 0)
        {
          int intTagPosEnd = intTagPosStart;
          
          addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, "");
          if (intTagPosEnd < addressString.addressString.length()) {
            while (!Character.isLetterOrDigit(addressString.addressString.charAt(intTagPosEnd))) {
              intTagPosEnd++;
            }
          }
          while ((intTagPosStart > 0) && (('|' == addressString.addressString.charAt(intTagPosStart - 1)) || (',' == addressString.addressString.charAt(intTagPosStart - 1)) || (' ' == addressString.addressString.charAt(intTagPosStart - 1)))) {
            intTagPosStart--;
          }
          addressString.addressString = (addressString.addressString.substring(0, intTagPosStart) + addressString.addressString.substring(intTagPosEnd));
        }
      }
      else if ((ADDRESSELEMENTTYPE.CITY + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        if (addressLayoutName.equalsIgnoreCase(ADDRESSLAYOUTTYPE.CA_CIVIC)) {
          addressString = formatAddressCityElement(addressFormatString, addressString);
        }
        //addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, ((AddressMap)addressMapList.dtls.item(i)).value);
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(MOLSAMULTIPLICITY.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }
      else if ((ADDRESSELEMENTTYPE.LINE1 + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {       
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(MOLSAZONE.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }
      else if ((ADDRESSELEMENTTYPE.LINE2 + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(MOLSASTREET.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }   
     
      else if ((ADDRESSELEMENTTYPE.COUNTRY + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(COUNTRY.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }
      else if ((ADDRESSELEMENTTYPE.USCOUNTY + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(ADDRESSUSCOUNTY.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }
      else if ((ADDRESSELEMENTTYPE.STREET_NUMBER_SUFFIX + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(STREETNUMBERSUFFIXTYPE.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
      }
      else if ((ADDRESSELEMENTTYPE.STREET_TYPE + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        if (!((AddressMap)addressMapList.dtls.item(i)).value.equals(STREETTYPE.NOT_AVAILABLE)) {
          addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(STREETTYPE.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
        } else {
          addressString.addressString = addressString.addressString.replace(' ' + ((AddressMap)addressMapList.dtls.item(i)).name, "");
        }
      }
      
      else if ((ADDRESSELEMENTTYPE.PROVINCE + "|").equals(((AddressMap)addressMapList.dtls.item(i)).name))
      {
        if (addressLayoutName.equalsIgnoreCase(ADDRESSLAYOUTTYPE.CN)) {
          addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(PROVINCEREGION_CHINA_ADF.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
        } else if (addressLayoutName.equalsIgnoreCase(ADDRESSLAYOUTTYPE.JP)) {
          addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, CodeTable.getOneItem(PROVINCEREGION_JAPAN_ADF.TABLENAME, ((AddressMap)addressMapList.dtls.item(i)).value));
        } else if ((addressLayoutName.equalsIgnoreCase(ADDRESSLAYOUTTYPE.CA)) || (addressLayoutName.equalsIgnoreCase(ADDRESSLAYOUTTYPE.CA_CIVIC))) {
          addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, ((AddressMap)addressMapList.dtls.item(i)).value);
        }
      }
      else
      {
        addressString.addressString = addressString.addressString.replace(((AddressMap)addressMapList.dtls.item(i)).name, ((AddressMap)addressMapList.dtls.item(i)).value);
      }
    }
    if (addressString.addressString.contains(BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(TransactionInfo.getProgramLocale()))) {
      addressString.addressString = new LocalisableString(BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE).getMessage(TransactionInfo.getProgramLocale());
    }
    otherAddressData.addressData = addressString.addressString;
    
    return otherAddressData;
  
  }

  

  /**
   * See the Class level comment.
   */
  @Override
  protected void autovalidate(AddressDtls details) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    validate(details);
  }

  /**
   * See the Class level comment.
   */
  @Override
  public ValidateAddressResult validate(AddressDtls addressDtls) throws AppException, InformationalException {
    ValidateAddressResult validateAddressResult = new ValidateAddressResult();

    AddressData addressDataObj = AddressDataFactory.newInstance();
    OtherAddressData otherAddressData = new OtherAddressData();

    otherAddressData.addressData = addressDtls.addressData;

    validateAddressResult.addressHeaderDetails = addressDataObj.parseDataToHeader(otherAddressData);

    validateHeader(validateAddressResult.addressHeaderDetails);

    if (addressDtls.addressData.length() >= 2048) {
      ValidationManagerFactory.getManager().throwWithLookup(new AppException(BPOADDRESS.ERR_ADDRESS_FV_ADDRESSDATA_LONG), "a", 0);
    }

    AddressMapList addressMapList = addressDataObj.parseDataToMap(otherAddressData);

    AddressMap addressMap = new AddressMap();

    addressMap.name = ADDRESSELEMENTTYPE.LINE1;

    ElementDetails elementDetails = addressDataObj.findElement(addressMapList, addressMap);

    if ((elementDetails.elementFound) && (elementDetails.elementValue.length() > 256)) {
      AppException e = new AppException(BPOADDRESS.ERR_ADDRESS_FV_LINE1_LONG);

      e.arg(elementDetails.elementValue.length());
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 0);
    }

    addressMap.name = ADDRESSELEMENTTYPE.CITY;

    elementDetails = addressDataObj.findElement(addressMapList, addressMap);

    if ((elementDetails.elementFound) && (elementDetails.elementValue.length() > 256)) {
      AppException e = new AppException(BPOADDRESS.ERR_ADDRESS_FV_CITY_LONG);

      e.arg(elementDetails.elementValue.length());
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 0);
    }

    if (ADDRESSLAYOUTTYPE.FREEFORM.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
      validateAddressResult.freeformAddressLineList = addressDataObj.parseDataToFreeform(otherAddressData);

      validateFreeformAddress(validateAddressResult.freeformAddressLineList);
    } else {
      validateAddressResult.addressMapList = addressDataObj.parseDataToMap(otherAddressData);

      // TODO MOLSA -Needs to Change to Arabic
      if (ADDRESSLAYOUTTYPE.US.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateARAddress(validateAddressResult.addressMapList);
      }else if (ADDRESSLAYOUTTYPE.US.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateUSAddress(validateAddressResult.addressMapList);
      } else if (ADDRESSLAYOUTTYPE.UK.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateUKAddress(validateAddressResult.addressMapList);
      } else if (validateAddressResult.addressHeaderDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.DE)) {
        validateDEAddress(validateAddressResult.addressMapList);
      } else if (ADDRESSLAYOUTTYPE.CA.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateCAAddress(validateAddressResult.addressMapList);

        addressMap.name = ADDRESSELEMENTTYPE.POSTCODE;
        elementDetails = addressDataObj.findElement(addressMapList, addressMap);

        FormatPostalCode formatPostalCode = formatPostalCodeValue(elementDetails.elementValue.trim());

        if (!(formatPostalCode.postalCode.equals(elementDetails.elementValue))) {
          for (int i = 0; i < addressMapList.dtls.size(); ++i) {
            if (!(((AddressMap) addressMapList.dtls.item(i)).name.equals(ADDRESSELEMENTTYPE.POSTCODE))) {
              continue;
            }
            ((AddressMap) addressMapList.dtls.item(i)).value = formatPostalCode.postalCode;

            break;
          }

          addressDtls.addressData = addressDataObj.parseMapToData(addressMapList).addressData;

          validateAddressResult.addressMapList.assign(addressMapList);
        }

      } else if (ADDRESSLAYOUTTYPE.CA_CIVIC.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateCACivicAddress(validateAddressResult.addressMapList);

        addressMap.name = ADDRESSELEMENTTYPE.POSTCODE;
        elementDetails = addressDataObj.findElement(addressMapList, addressMap);

        FormatPostalCode formatPostalCode = formatPostalCodeValue(elementDetails.elementValue.trim());

        if (!(formatPostalCode.postalCode.equals(elementDetails.elementValue))) {
          for (int i = 0; i < addressMapList.dtls.size(); ++i) {
            if (!(((AddressMap) addressMapList.dtls.item(i)).name.equals(ADDRESSELEMENTTYPE.POSTCODE))) {
              continue;
            }
            ((AddressMap) addressMapList.dtls.item(i)).value = formatPostalCode.postalCode;

            break;
          }

          addressDtls.addressData = addressDataObj.parseMapToData(addressMapList).addressData;

          validateAddressResult.addressMapList.assign(addressMapList);
        }

      } else if (ADDRESSLAYOUTTYPE.TW.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateTWAddress(validateAddressResult.addressMapList);
      } else if (ADDRESSLAYOUTTYPE.CN.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateCNAddress(validateAddressResult.addressMapList);
      } else if (ADDRESSLAYOUTTYPE.JP.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateJPAddress(validateAddressResult.addressMapList);
      } else if (ADDRESSLAYOUTTYPE.KR.equals(validateAddressResult.addressHeaderDetails.addressLayoutType)) {
        validateKRAddress(validateAddressResult.addressMapList);
      } else {
        AppException e = new AppException(BPOADDRESS.ERR_ADDRESS_FV_LAYOUT_TYPE_INVALID);

        e.arg(validateAddressResult.addressHeaderDetails.addressLayoutType);
        ValidationManagerFactory.getManager().throwWithLookup(e, "a", 0);
      }

    }

    return validateAddressResult;
  }


  

  /**
   * See the Class level comment.
   */
  @Override
  public EmptyIndStruct isEmpty(OtherAddressData details) throws AppException, InformationalException {

    EmptyIndStruct emptyIndStruct = new EmptyIndStruct();

    AddressData addressDataObj = AddressDataFactory.newInstance();

    AddressMap addressMap = new AddressMap();

    LayoutKey layoutKey = new LayoutKey();

    String sBuff = "";

    if (details.addressData.length() == 0) {
      emptyIndStruct.emptyInd = true;
    } else {
      AddressHeaderDetails addressHeaderDetails = addressDataObj.parseDataToHeader(details);
      emptyIndStruct.emptyInd = true;

      //TODO MOLSA:- Needs to be changed once Arabic Version is in
      if ((ADDRESSLAYOUTTYPE.US.equals(addressHeaderDetails.addressLayoutType)) ) {
        AddressMapList addressMapList = addressDataObj.parseDataToMap(details);

        if (!(addressMapList.dtls.isEmpty())) {
          layoutKey.addressLayoutType = addressHeaderDetails.addressLayoutType;
          AddressTagDetails addressTagDetails = getAddressTagsForLayout(layoutKey);

          StringList tagList = StringUtil.tabText2StringList(addressTagDetails.addressTags);


          boolean isStreetEmpty = false;
          boolean isZoneEmpty = false;
          boolean isMunicipalityEmpty = false;
          boolean isCountryEmpty = false;
       
          for (int i = 0; i < tagList.size(); ++i) {
            addressMap.name = tagList.item(i);

            ElementDetails elementDetails = addressDataObj.findElement(addressMapList, addressMap);

           
            if (elementDetails.elementFound) {
              sBuff = StringUtil.rtrim(elementDetails.elementValue);

              //Municipality
              if ((ADDRESSELEMENTTYPE.CITY.equals(addressMap.name)) && (sBuff.length() == 0)) {
                isMunicipalityEmpty = true;
              }
              //Zone
              if ((ADDRESSELEMENTTYPE.LINE1.equals(addressMap.name)) && (sBuff.length() == 0)) {
                isZoneEmpty = true;                
              }
              //Street
              if ((ADDRESSELEMENTTYPE.LINE2.equals(addressMap.name)) && (sBuff.length() == 0)) {
                isStreetEmpty = true;
              }
              //Country
              if ((ADDRESSELEMENTTYPE.COUNTRY.equals(addressMap.name)) && (sBuff.length() == 0)) {
                isCountryEmpty = true;
              }
            }
            

          }
          if (isMunicipalityEmpty || isZoneEmpty || isStreetEmpty || isCountryEmpty) {
            emptyIndStruct.emptyInd = true;
           
          } else {
            emptyIndStruct.emptyInd = false;
          }

        }

      }else  if ((ADDRESSLAYOUTTYPE.US.equals(addressHeaderDetails.addressLayoutType)) || (ADDRESSLAYOUTTYPE.UK.equals(addressHeaderDetails.addressLayoutType))
          || (ADDRESSLAYOUTTYPE.CA.equals(addressHeaderDetails.addressLayoutType)) || (ADDRESSLAYOUTTYPE.TW.equals(addressHeaderDetails.addressLayoutType))
          || (ADDRESSLAYOUTTYPE.CN.equals(addressHeaderDetails.addressLayoutType)) || (ADDRESSLAYOUTTYPE.JP.equals(addressHeaderDetails.addressLayoutType))
          || (ADDRESSLAYOUTTYPE.KR.equals(addressHeaderDetails.addressLayoutType)) || (ADDRESSLAYOUTTYPE.CA_CIVIC.equals(addressHeaderDetails.addressLayoutType))) {
        AddressMapList addressMapList = addressDataObj.parseDataToMap(details);

        if (!(addressMapList.dtls.isEmpty())) {
          layoutKey.addressLayoutType = addressHeaderDetails.addressLayoutType;
          AddressTagDetails addressTagDetails = getAddressTagsForLayout(layoutKey);

          StringList tagList = StringUtil.tabText2StringList(addressTagDetails.addressTags);

          boolean isAdd1Empty = false;
          boolean isCountryUS = false;

       
          for (int i = 0; i < tagList.size(); ++i) {
            addressMap.name = tagList.item(i);

            ElementDetails elementDetails = addressDataObj.findElement(addressMapList, addressMap);

            
            if (elementDetails.elementFound) {
              sBuff = StringUtil.rtrim(elementDetails.elementValue);

              if ((ADDRESSELEMENTTYPE.LINE1.equals(addressMap.name)) && (sBuff.length() == 0)) {
                isAdd1Empty = true;
              }

              if ((ADDRESSELEMENTTYPE.COUNTRY.equals(addressMap.name)) && (sBuff.equals(COUNTRY.getDefaultCode()))) {
                isCountryUS = true;
              }
              if ((ADDRESSLAYOUTTYPE.UK.equals(addressHeaderDetails.addressLayoutType)) && (isAdd1Empty) && (isCountryUS)) {
                emptyIndStruct.emptyInd = true;
                break;
              }
              if (sBuff.length() > 0) {
                emptyIndStruct.emptyInd = false;
                break;
              }

            }


          }

        }

      } else if (addressHeaderDetails.addressLayoutType.equals(ADDRESSLAYOUTTYPE.DE)) {
        AddressMapList addressMapList = addressDataObj.parseDataToMap(details);

        if (!(addressMapList.dtls.isEmpty())) {
          layoutKey.addressLayoutType = addressHeaderDetails.addressLayoutType;
          AddressTagDetails addressTagDetails = getAddressTagsForLayout(layoutKey);

          StringList tagList = StringUtil.tabText2StringList(addressTagDetails.addressTags);

          for (int i = 0; i < tagList.size(); ++i) {
            addressMap.name = tagList.item(i);
            ElementDetails elementDetails = addressDataObj.findElement(addressMapList, addressMap);

            if (elementDetails.elementFound) {
              sBuff = StringUtil.rtrim(elementDetails.elementValue);

              if (sBuff.length() > 0) {
                emptyIndStruct.emptyInd = false;
                break;
              }

            }

          }

        }

      } else if (ADDRESSLAYOUTTYPE.FREEFORM.equals(addressHeaderDetails.addressLayoutType)) {
        AddressLineList addressLineList = addressDataObj.parseDataToFreeform(details);

        for (int j = 0; j < addressLineList.dtls.size(); ++j) {
          sBuff = StringUtil.rtrim(((AddressLine) addressLineList.dtls.item(j)).addressString);

          if (sBuff.length() <= 0)
            continue;
          emptyIndStruct.emptyInd = false;
          break;
        }

      } else {
        AppException ae = new AppException(BPOADDRESS.ERR_ADDRESS_FV_LAYOUT_TYPE_INVALID);

        ae.arg(addressHeaderDetails.addressLayoutType);
        ValidationManagerFactory.getManager().throwWithLookup(ae, "a", 1);
      }

    }

    return emptyIndStruct;
  
  }
 
  /**
   * See the Class level comment.
   */
  @Override
  protected void validateARAddress(AddressMapList addressMapList) throws AppException, InformationalException {
    LayoutKey layoutKey = new LayoutKey();

    MOLSAAddressDataDA addressDataObj = MOLSAAddressDataDAFactory.newInstance();

    AddressMap addressMap = new AddressMap();

    layoutKey.addressLayoutType = ADDRESSLAYOUTTYPE.US;
    AddressTagDetails addressTagDetails = this.getAddressTagsForLayout(layoutKey);
    
   

    if (addressTagDetails.addressTags.length() > 0) {
      addressDataObj.validateTags(addressMapList, addressTagDetails);
    }

    addressMap.name = ADDRESSELEMENTTYPE.CITY;
    ElementDetails elementDetails = addressDataObj.findElement(addressMapList, addressMap);
    boolean fMunicipalityLineEmpty = elementDetails.elementValue.length() == 0;

    addressMap.name = ADDRESSELEMENTTYPE.LINE1;
    elementDetails = addressDataObj.findElement(addressMapList, addressMap);
    boolean fZoneLineEmpty = elementDetails.elementValue.length() == 0;
    
    addressMap.name = ADDRESSELEMENTTYPE.LINE2;
    elementDetails = addressDataObj.findElement(addressMapList, addressMap);
    boolean fStreetLineEmpty = elementDetails.elementValue.length() == 0;
    String addressUnavailable = BPOADDRESS.TEXT_ADDRESS_UNAVAILABLE.getMessageText(TransactionInfo.getProgramLocale());
    //No Adress
    if(elementDetails.elementValue.equals(addressUnavailable)) {
      return;
    }
    
    addressMap.name = ADDRESSELEMENTTYPE.COUNTRY;
    elementDetails = addressDataObj.findElement(addressMapList, addressMap);
    boolean fCountryLineEmpty = elementDetails.elementValue.length() == 0;

    if (fMunicipalityLineEmpty) {
      AppException e = new AppException(MOLSABPOADDRESS.ERR_MUNICIPALITY_UNAVAILABLE);
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 4);
    } 
    
    if (fZoneLineEmpty) {
      AppException e = new AppException(MOLSABPOADDRESS.ERR_ZONE_UNAVAILABLE);
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 4);
    } 
    if (fStreetLineEmpty) {
      AppException e = new AppException(MOLSABPOADDRESS.ERR_STREET_UNAVAILABLE);
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 4);
    
    } 
    if (fCountryLineEmpty) {
      AppException e = new AppException(MOLSABPOADDRESS.ERR_COUNTRY_UNAVAILABLE);
      ValidationManagerFactory.getManager().throwWithLookup(e, "a", 4);
    }

    addressMap.name = ADDRESSELEMENTTYPE.ZIP;
    elementDetails = addressDataObj.findElement(addressMapList, addressMap);

  }

  /**
   * See the Class level comment.
   */
  @Override
  protected AddressTagDetails getAddressTagsForLayout(LayoutKey key) throws AppException, InformationalException {
    AddressTagDetails addressTagDetails = new AddressTagDetails();    
    StringBuffer addressTags = new StringBuffer();
    // TODO: MOLSA Needs to Change to Arabic
    if (key.addressLayoutType.equals(ADDRESSLAYOUTTYPE.US)) {
      addressTags.ensureCapacity(ADDRESSELEMENTTYPE.CITY.length() +ADDRESSELEMENTTYPE.LINE1.length() + ADDRESSELEMENTTYPE.LINE2.length() +  ADDRESSELEMENTTYPE.UNIT_NUMBER.length() + ADDRESSELEMENTTYPE.LINE4.length() + ADDRESSELEMENTTYPE.POBOXNO.length() +ADDRESSELEMENTTYPE.ZIP.length() + ADDRESSELEMENTTYPE.COUNTRY.length() + ADDRESSELEMENTTYPE.LINE5.length()+ 8);


      addressTags.append(ADDRESSELEMENTTYPE.CITY);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.LINE1);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.LINE2);
      addressTags.append("\t");      
      addressTags.append(ADDRESSELEMENTTYPE.UNIT_NUMBER);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.LINE4);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.POBOXNO);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.ZIP);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.COUNTRY);
      addressTags.append("\t");
      addressTags.append(ADDRESSELEMENTTYPE.LINE5);
      addressTagDetails.addressTags = addressTags.toString();
    } else {
      addressTagDetails = super.getAddressTagsForLayout(key);
    }
    return addressTagDetails;
   
  }

  /**
   * See the Class level comment.
   */
  @Override
  protected void internalInsert(AddressDtls details) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    super.internalInsert(details);
  }

  /**
   * See the Class level comment.
   */
  @Override
  protected void postinsertInternal(AddressDtls details) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    super.postinsertInternal(details);
  }

  /**
   * See the Class level comment.
   */
  @Override
  protected void preinsertInternal(AddressDtls details) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    super.preinsertInternal(details);
  }

  // ___________________________________________________________________________
  /**
   * Method decodes code table fields (e.g. city, state) to be in normal manner.
   *
   * @param addressDataString
   * contains address data string.
   *
   *
   * @throws AppException
   * Generic Exception Signature.
   * @throws InformationalException
   * Generic Exception Signature.
   */
  @Override
  public void getOneLineAddressString(final OtherAddressData addressDataString)
    throws AppException, InformationalException {
    
    OtherAddressData otherAddressData= getShortFormat(addressDataString);
    addressDataString.addressData = otherAddressData.addressData;
  }
  
  
  // ___________________________________________________________________________
  /**
   * Method takes in addressDataString and returns formatted address string.
   *
   * @param addressDataString
   * contains address data string.
   *
   *
   * @throws AppException
   * Generic Exception Signature.
   * @throws InformationalException
   * Generic Exception Signature.
   */
  @Override
  public void getLongFormat( OtherAddressData addressDataString)
    throws AppException, InformationalException {
    OtherAddressData otherAddressData= getShortFormat(addressDataString);
    addressDataString.addressData = otherAddressData.addressData;
  }
  
}
