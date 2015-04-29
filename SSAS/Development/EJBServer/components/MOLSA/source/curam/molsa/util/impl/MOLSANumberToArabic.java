package curam.molsa.util.impl;

import java.math.BigDecimal;
import curam.molsa.message.MOLSABPONUMBERTOARABIC;
import curam.util.exception.LocalisableString;
public class MOLSANumberToArabic {
	private static BigDecimal number;
	private static Currency currency;
	private static CurrencyInfo currencyInfo;	
	
	private static String englishPrefixText = "";
	private static String englishSuffixText = "only.";
	static LocalisableString only = new LocalisableString(MOLSABPONUMBERTOARABIC.ONLY); 
	static LocalisableString alpha = new LocalisableString(MOLSABPONUMBERTOARABIC.ALPHA); 
	static LocalisableString alpha_Group = new LocalisableString(MOLSABPONUMBERTOARABIC.ALPHA_GROUP); 
	static LocalisableString twoThousand = new LocalisableString(MOLSABPONUMBERTOARABIC.TWO_THOUSAND); 
	static LocalisableString thousand = new LocalisableString(MOLSABPONUMBERTOARABIC.THOUSAND); 
	static LocalisableString thousands = new LocalisableString(MOLSABPONUMBERTOARABIC.THOUSANDS); 
	static LocalisableString zero = new LocalisableString(MOLSABPONUMBERTOARABIC.ZERO); 
	static LocalisableString arabicSuffix = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICSUFFIX); 
	private static String arabicPrefixText = only.getMessage();
	private static String arabicSuffixText = arabicSuffix.getMessage();
	
	private static long _intergerValue;
	private static int _decimalValue;
	
	static LocalisableString and = new LocalisableString(MOLSABPONUMBERTOARABIC.AND); 
	
	/**
	 * 
	 */
	public static enum Currency {
		AED, SYP, SAR, QAR, TND, XAU, JOD, BHD
	}
	
	private static String[] englishOnes =
        new String[] {
         "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
         "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    };

	private static String[] englishTens =
	     new String[] {
	     "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
	};
	
	private static String[] englishGroup =
	     new String[] {
	     "Hundred", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillian",
	     "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion",
	     "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion",
	     "Vigintillion", "Unvigintillion", "Duovigintillion", "10^72", "10^75", "10^78", "10^81", "10^84", "10^87",
	     "Vigintinonillion", "10^93", "10^96", "Duotrigintillion", "Trestrigintillion"
	};
	
	static LocalisableString ARABICONES_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_1); 
	static LocalisableString ARABICONES_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_2); 
	static LocalisableString ARABICONES_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_3); 
	static LocalisableString ARABICONES_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_4); 
	static LocalisableString ARABICONES_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_5); 
	static LocalisableString ARABICONES_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_6); 
	static LocalisableString ARABICONES_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_7); 
	static LocalisableString ARABICONES_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_8); 
	static LocalisableString ARABICONES_9 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_9); 
	static LocalisableString ARABICONES_10 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_10); 
	static LocalisableString ARABICONES_11 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_11); 
	static LocalisableString ARABICONES_12 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_12); 
	static LocalisableString ARABICONES_13 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_13); 
	static LocalisableString ARABICONES_14 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_14); 
	static LocalisableString ARABICONES_15 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_15); 
	static LocalisableString ARABICONES_16 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_16); 
	static LocalisableString ARABICONES_17 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_17); 
	static LocalisableString ARABICONES_18 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_18); 
	static LocalisableString ARABICONES_19 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICONES_19); 
	
	
	
	private static String[] arabicOnes =
        new String[] {
         "", ARABICONES_1.getMessage(),ARABICONES_2.getMessage(),ARABICONES_3.getMessage(),ARABICONES_4.getMessage(),ARABICONES_5.getMessage(),ARABICONES_6.getMessage(),ARABICONES_7.getMessage(), ARABICONES_8.getMessage(),ARABICONES_9.getMessage(),
         ARABICONES_10.getMessage(),ARABICONES_11.getMessage(), ARABICONES_12.getMessage(), ARABICONES_13.getMessage(),ARABICONES_14.getMessage(), ARABICONES_15.getMessage(), ARABICONES_16.getMessage(), ARABICONES_17.getMessage(), ARABICONES_18.getMessage(), ARABICONES_19.getMessage()
     };

	static LocalisableString ARABICFEMININEONES_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_1); 
	static LocalisableString ARABICFEMININEONES_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_2); 
	static LocalisableString ARABICFEMININEONES_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_3); 
	static LocalisableString ARABICFEMININEONES_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_4); 
	static LocalisableString ARABICFEMININEONES_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_5); 
	static LocalisableString ARABICFEMININEONES_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_6); 
	static LocalisableString ARABICFEMININEONES_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_7); 
	static LocalisableString ARABICFEMININEONES_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_8); 
	static LocalisableString ARABICFEMININEONES_9 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_9); 
	static LocalisableString ARABICFEMININEONES_10 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_10); 
	static LocalisableString ARABICFEMININEONES_11 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_11); 
	static LocalisableString ARABICFEMININEONES_12 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_12); 
	static LocalisableString ARABICFEMININEONES_13 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_13); 
	static LocalisableString ARABICFEMININEONES_14 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_14); 
	static LocalisableString ARABICFEMININEONES_15 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_15); 
	static LocalisableString ARABICFEMININEONES_16 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_16); 
	static LocalisableString ARABICFEMININEONES_17 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_17); 
	static LocalisableString ARABICFEMININEONES_18 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_18); 
	static LocalisableString ARABICFEMININEONES_19 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICFEMININEONES_19); 
	
     private static String[] arabicFeminineOnes =
        new String[] {
         "", ARABICFEMININEONES_1.getMessage(), ARABICFEMININEONES_2.getMessage(), ARABICFEMININEONES_3.getMessage(), ARABICFEMININEONES_4.getMessage(), ARABICFEMININEONES_5.getMessage(),ARABICFEMININEONES_6.getMessage(), ARABICFEMININEONES_7.getMessage(), ARABICFEMININEONES_8.getMessage(), ARABICFEMININEONES_9.getMessage(),
         ARABICFEMININEONES_10.getMessage(), ARABICFEMININEONES_11.getMessage(), ARABICFEMININEONES_12.getMessage(), ARABICFEMININEONES_13.getMessage(), ARABICFEMININEONES_14.getMessage(), ARABICFEMININEONES_15.getMessage(), ARABICFEMININEONES_16.getMessage(), ARABICFEMININEONES_17.getMessage(), ARABICFEMININEONES_18.getMessage(), ARABICFEMININEONES_19.getMessage()
     };

     static LocalisableString ARABICTENS_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_1); 
     static LocalisableString ARABICTENS_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_2); 
     static LocalisableString ARABICTENS_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_3); 
     static LocalisableString ARABICTENS_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_4); 
     static LocalisableString ARABICTENS_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_5); 
     static LocalisableString ARABICTENS_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_6); 
     static LocalisableString ARABICTENS_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_7); 
     static LocalisableString ARABICTENS_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTENS_8); 

     private static String[] arabicTens =
         new String[] {
    	 ARABICTENS_1.getMessage(), ARABICTENS_2.getMessage(), ARABICTENS_3.getMessage(), ARABICTENS_4.getMessage(), ARABICTENS_5.getMessage(),ARABICTENS_6.getMessage(), ARABICTENS_7.getMessage(), ARABICTENS_8.getMessage()
     };

     static LocalisableString ARABICHUNDRES_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_1); 
     static LocalisableString ARABICHUNDRES_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_2); 
     static LocalisableString ARABICHUNDRES_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_3); 
     static LocalisableString ARABICHUNDRES_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_4); 
     static LocalisableString ARABICHUNDRES_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_5); 
     static LocalisableString ARABICHUNDRES_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_6); 
     static LocalisableString ARABICHUNDRES_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_7); 
     static LocalisableString ARABICHUNDRES_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_8); 
     static LocalisableString ARABICHUNDRES_9 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICHUNDRES_9); 
     
     private static String[] arabicHundreds =
         new String[] {
         "",ARABICHUNDRES_1.getMessage(), ARABICHUNDRES_2.getMessage(),ARABICHUNDRES_3.getMessage(), ARABICHUNDRES_4.getMessage(), ARABICHUNDRES_5.getMessage(), ARABICHUNDRES_6.getMessage(), ARABICHUNDRES_7.getMessage(), ARABICHUNDRES_8.getMessage(),ARABICHUNDRES_9.getMessage()
     };

     static LocalisableString ARABICAPPENDEDTWOS_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_1); 
     static LocalisableString ARABICAPPENDEDTWOS_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_2); 
     static LocalisableString ARABICAPPENDEDTWOS_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_3); 
     static LocalisableString ARABICAPPENDEDTWOS_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_4); 
     static LocalisableString ARABICAPPENDEDTWOS_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_5); 
     static LocalisableString ARABICAPPENDEDTWOS_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_6); 
     static LocalisableString ARABICAPPENDEDTWOS_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_7); 
     static LocalisableString ARABICAPPENDEDTWOS_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDTWOS_8); 
     private static String[] arabicAppendedTwos =
         new String[] {
    	 ARABICAPPENDEDTWOS_1.getMessage(), ARABICAPPENDEDTWOS_2.getMessage(), ARABICAPPENDEDTWOS_3.getMessage(), ARABICAPPENDEDTWOS_4.getMessage(), ARABICAPPENDEDTWOS_5.getMessage(), ARABICAPPENDEDTWOS_6.getMessage(), ARABICAPPENDEDTWOS_7.getMessage(), ARABICAPPENDEDTWOS_8.getMessage()
     };

     static LocalisableString ARABICTWOS_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_1); 
     static LocalisableString ARABICTWOS_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_2); 
     static LocalisableString ARABICTWOS_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_3); 
     static LocalisableString ARABICTWOS_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_4); 
     static LocalisableString ARABICTWOS_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_5); 
     static LocalisableString ARABICTWOS_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_6); 
     static LocalisableString ARABICTWOS_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_7); 
     static LocalisableString ARABICTWOS_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICTWOS_8); 
     private static String[] arabicTwos =
         new String[] {
    	 ARABICTWOS_1.getMessage(), ARABICTWOS_2.getMessage(), ARABICTWOS_3.getMessage(), ARABICTWOS_4.getMessage(), ARABICTWOS_5.getMessage(), ARABICTWOS_6.getMessage(), ARABICTWOS_7.getMessage(), ARABICTWOS_8.getMessage()
     };

     static LocalisableString ARABICGROUP_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_1); 
     static LocalisableString ARABICGROUP_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_2); 
     static LocalisableString ARABICGROUP_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_3); 
     static LocalisableString ARABICGROUP_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_4); 
     static LocalisableString ARABICGROUP_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_5); 
     static LocalisableString ARABICGROUP_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_6); 
     static LocalisableString ARABICGROUP_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_7); 
     static LocalisableString ARABICGROUP_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICGROUP_8); 
     private static String[] arabicGroup =
         new String[] {
    	 ARABICGROUP_1.getMessage(),  ARABICGROUP_2.getMessage(), ARABICGROUP_3.getMessage(),  ARABICGROUP_4.getMessage(),  ARABICGROUP_5.getMessage(),  ARABICGROUP_6.getMessage(),  ARABICGROUP_7.getMessage(),  ARABICGROUP_8.getMessage()
     };


     static LocalisableString ARABICAPPENDEDGROUP_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_1);
     static LocalisableString ARABICAPPENDEDGROUP_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_2);
     static LocalisableString ARABICAPPENDEDGROUP_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_3);
     static LocalisableString ARABICAPPENDEDGROUP_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_4);
     static LocalisableString ARABICAPPENDEDGROUP_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_5);
     static LocalisableString ARABICAPPENDEDGROUP_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_6);
     static LocalisableString ARABICAPPENDEDGROUP_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICAPPENDEDGROUP_7);
  
     private static String[] arabicAppendedGroup =
         new String[] {
         "", ARABICAPPENDEDGROUP_1.getMessage(), ARABICAPPENDEDGROUP_2.getMessage(), ARABICAPPENDEDGROUP_3.getMessage(), ARABICAPPENDEDGROUP_4.getMessage(), ARABICAPPENDEDGROUP_5.getMessage(), ARABICAPPENDEDGROUP_6.getMessage(),ARABICAPPENDEDGROUP_7.getMessage()
     };

     static LocalisableString ARABICPLURALGROUP_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_1);
     static LocalisableString ARABICPLURALGROUP_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_2);
     static LocalisableString ARABICPLURALGROUP_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_3);
     static LocalisableString ARABICPLURALGROUP_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_4);
     static LocalisableString ARABICPLURALGROUP_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_5);
     static LocalisableString ARABICPLURALGROUP_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_6);
     static LocalisableString ARABICPLURALGROUP_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.ARABICPLURALGROUP_7);

     private static String[] arabicPluralGroups =
         new String[] {
         "", ARABICPLURALGROUP_1.getMessage(), ARABICPLURALGROUP_2.getMessage(), ARABICPLURALGROUP_3.getMessage(), ARABICPLURALGROUP_4.getMessage(), ARABICPLURALGROUP_5.getMessage(),ARABICPLURALGROUP_6.getMessage(),ARABICPLURALGROUP_7.getMessage()
     };
	
    public MOLSANumberToArabic() {	
    	 
    }
     
	public MOLSANumberToArabic(BigDecimal number, Currency currency) {	
		MOLSANumberToArabic.number = number;		
		MOLSANumberToArabic.currency = currency;
		MOLSANumberToArabic.currencyInfo = new CurrencyInfo(currency);
		
		numberToArabic(number, currencyInfo, englishPrefixText, englishSuffixText, arabicPrefixText, arabicSuffixText);
	}
	
	public MOLSANumberToArabic(BigDecimal number, Currency currency, String englishPrefixText, String englishSuffixText, String arabicPrefixText, String arabicSuffixText) {
		MOLSANumberToArabic.number = number;
		MOLSANumberToArabic.currency = currency;
		MOLSANumberToArabic.currencyInfo = new CurrencyInfo(currency);
		
		numberToArabic(number, currencyInfo, englishPrefixText, englishSuffixText, arabicPrefixText, arabicSuffixText);
	}
	
	private static void numberToArabic(BigDecimal number, CurrencyInfo currency, String englishPrefixText, String englishSuffixText, String arabicPrefixText, String arabicSuffixText) {		
        MOLSANumberToArabic.englishPrefixText = englishPrefixText;
        MOLSANumberToArabic.englishSuffixText = englishSuffixText;
        MOLSANumberToArabic.arabicPrefixText = arabicPrefixText;
        MOLSANumberToArabic.arabicSuffixText = arabicSuffixText;

        extractIntegerAndDecimalParts();
	}
	
	private static void extractIntegerAndDecimalParts() {		
        String[] splits = number.toString().split("\\.");

        _intergerValue = Long.valueOf(splits[0]).longValue();

        if (splits.length > 1)
            _decimalValue = Integer.valueOf(getDecimalValue(splits[1]));
        else 
        	_decimalValue = 0;
    }
	
	private static String getDecimalValue(String decimalPart) {
		String result = "";

        if (currencyInfo.getPartPrecision() != decimalPart.length()) {
                int decimalPartLength = decimalPart.length();

                for (int i = 0; i < currencyInfo.getPartPrecision() - decimalPartLength; i++)
                {
                    decimalPart += "0"; //Fix for 1 number after decimal ( 10.5 , 1442.2 , 375.4 ) 
                }

				int dec = decimalPart.length() <= currencyInfo.getPartPrecision()  ?  decimalPart.length() : currencyInfo.getPartPrecision();  
            result = decimalPart.substring(0, dec);
        }
        else
            result = decimalPart;

        for (int i = result.length(); i < currencyInfo.getPartPrecision(); i++) {
            result += "0";
        }

        return result;
    }
	
    private static String processGroup(int groupNumber) {
        int tens = groupNumber % 100;

        int hundreds = groupNumber / 100;

        String retVal = "";

        if (hundreds > 0) {
            retVal = String.format("%s %s", englishOnes[hundreds], englishGroup[0]);
        }
        if (tens > 0) {
            if (tens < 20) {
                retVal += ((retVal != "") ? " " : "") + englishOnes[tens];
            }
            else {
                int ones = tens % 10;

                tens = (tens / 10) - 2; // 20's offset

                retVal += ((retVal != "") ? " " : "") + englishTens[tens];

                if (ones > 0) {
                    retVal += ((retVal != "") ? " " : "") + englishOnes[ones];
                }
            }
        }

        return retVal;
    }	
    
    public static String convertToEnglish(BigDecimal value, String currencyCode) {    	   	
    	currency = Currency.valueOf(currencyCode);
    	currencyInfo = (new MOLSANumberToArabic()).new CurrencyInfo(currency);
    	number = value.setScale(currencyInfo.getPartPrecision(), BigDecimal.ROUND_HALF_DOWN);
    	
    	numberToArabic(number, currencyInfo, englishPrefixText, englishSuffixText, arabicPrefixText, arabicSuffixText);
    	
		return convertToEnglish();
    }
	
    public static String convertToEnglish() {
        BigDecimal tempNumber = number;

        if (tempNumber.compareTo(new BigDecimal(0)) == 0)
            return "Zero";

        String decimalString = processGroup(_decimalValue);

        String retVal = "";

        int group = 0;

        if (tempNumber.compareTo(new BigDecimal(0)) < 1)  {
            retVal = englishOnes[0];
        }
        else {
            while (tempNumber.compareTo(new BigDecimal(0)) > 0) {
                int numberToProcess = tempNumber.remainder(new BigDecimal(1000)).intValue();

                tempNumber = tempNumber.divideToIntegralValue(new BigDecimal(1000));

                String groupDescription = processGroup(numberToProcess);

                if (groupDescription != "") {
                    if (group > 0) {
                        retVal = String.format("%s %s", englishGroup[group], retVal);
                    }

                    retVal = String.format("%s %s", groupDescription, retVal);
                }

                group++;
            }
        }

        String formattedNumber = "";
        formattedNumber += (englishPrefixText != "") ? String.format("%s ", englishPrefixText) : "";
        formattedNumber += (retVal != "") ? retVal : "";
        formattedNumber += (retVal != "") ? (_intergerValue == 1 ? currencyInfo.englishCurrencyName : currencyInfo.englishPluralCurrencyName) : "";
        formattedNumber += (decimalString != "") ? " and " : "";
        formattedNumber += (decimalString != "") ? decimalString : "";
        formattedNumber += (decimalString != "") ? " " + (_decimalValue == 1 ? currencyInfo.englishCurrencyPartName : currencyInfo.englishPluralCurrencyPartName) : "";
        formattedNumber += (englishSuffixText != "") ? String.format(" %s", englishSuffixText) : "";

        return formattedNumber;
    }
    
    private static String getDigitFeminineStatus(int digit, int groupLevel) {
        if (groupLevel == -1) { // if it is in the decimal part
            if (currencyInfo.isCurrencyPartNameFeminine)
                return arabicFeminineOnes[digit]; // use feminine field
            else
                return arabicOnes[digit];
        }
        else
            if (groupLevel == 0) {
                if (currencyInfo.isCurrencyNameFeminine)
                    return arabicFeminineOnes[digit];// use feminine field
                else
                    return arabicOnes[digit];
            }
            else
                return arabicOnes[digit];
    }
    
    private static String processArabicGroup(int groupNumber, int groupLevel, BigDecimal remainingNumber) {
        int tens = groupNumber % 100;

        int hundreds = groupNumber / 100;

        String retVal = "";

        if (hundreds > 0) {
            if (tens == 0 && hundreds == 2) // 
                retVal = String.format("%s", arabicAppendedTwos[0]);
            else //  
                retVal = String.format("%s", arabicHundreds[hundreds]);
        }

        if (tens > 0) {
            if (tens < 20) { // if we are processing under 20 numbers
                if (tens == 2 && hundreds == 0 && groupLevel > 0) { // This is special case for number 2 when it comes alone in the group
                    if (_intergerValue == 2000 || _intergerValue == 2000000 || _intergerValue == 2000000000 || _intergerValue == 2000000000000L || _intergerValue == 2000000000000000L || _intergerValue == 2000000000000000000L)
                        retVal = String.format("%s", arabicAppendedTwos[groupLevel]); // 
                    else
                        retVal = String.format("%s", arabicTwos[groupLevel]);//  
                }
                else { // General case
                    if (retVal != "")
                        retVal += " "+and.getMessage()+" ";

                    if (tens == 1 && groupLevel > 0 && hundreds == 0)
                        retVal += " ";
                    else
                        if ((tens == 1 || tens == 2) && (groupLevel == 0 || groupLevel == -1) && hundreds == 0 && remainingNumber.compareTo(new BigDecimal(0)) == 0)
                            retVal += ""; // Special case for 1 and 2 numbers like: 
                        else
                            retVal += getDigitFeminineStatus(tens, groupLevel);// Get Feminine status for this digit
                }
            }
            else {
                int ones = tens % 10;
                tens = (tens / 10) - 2; // 20's offset

                if (ones > 0) {
                    if (retVal != "")
                        retVal += " "+and.getMessage()+" ";

                    // Get Feminine status for this digit
                    retVal += getDigitFeminineStatus(ones, groupLevel);
                }

                if (retVal != "")
                    retVal += " "+and.getMessage()+" ";

                // Get Tens text
                retVal += arabicTens[tens];
            }
        }

        return retVal;
    }
    
    
    public static String convertToArabic(BigDecimal value, String currencyCode) {
    	currency = Currency.valueOf(currencyCode);
    	currencyInfo = (new MOLSANumberToArabic()).new CurrencyInfo(currency);
    	number = value.setScale(currencyInfo.getPartPrecision(), BigDecimal.ROUND_HALF_DOWN);
    	
    	numberToArabic(number, currencyInfo, englishPrefixText, englishSuffixText, arabicPrefixText, arabicSuffixText);
    	
		return convertToArabic();
    }
    
    public static String convertToArabic()
    {
        BigDecimal tempNumber = number;

        if (tempNumber.compareTo(new BigDecimal(0)) == 0)
            return zero.getMessage();

        // Get Text for the decimal part
        String decimalString = processArabicGroup(_decimalValue, -1, new BigDecimal(0));

        String retVal = ""; 
        Byte group = 0;
        while (tempNumber.compareTo(new BigDecimal(0)) > 0)
        {
            // seperate number into groups
            int numberToProcess = tempNumber.remainder(new BigDecimal(1000)).intValue();

            tempNumber = tempNumber.divideToIntegralValue(new BigDecimal(1000));

            // convert group into its text
            String groupDescription = processArabicGroup(numberToProcess, group, new BigDecimal(Math.floor(tempNumber.doubleValue())));

            if (groupDescription != "")
            { // here we add the new converted group to the previous concatenated text
                if (group > 0)
                {
                    if (retVal != "")
                        retVal = String.format("%s %s", and.getMessage(), retVal);

                    if (numberToProcess != 2)
                    {
                        if (numberToProcess % 100 != 1)
                        {
                            if (numberToProcess >= 3 && numberToProcess <= 10) // for numbers between 3 and 9 we use plural name
                                retVal = String.format("%s %s", arabicPluralGroups[group], retVal);
                            else
                            {
                                if (retVal != "") // use appending case
                                    retVal = String.format("%s %s", arabicAppendedGroup[group], retVal);
                                else
                                    retVal = String.format("%s %s", arabicGroup[group], retVal); // use normal case
                            }
                        }
						else
							retVal = String.format("%s %s", arabicGroup[group], retVal); // use normal case
                    }
                }

                retVal = String.format("%s %s", groupDescription, retVal);
            }

            group++;
        }

        String formattedNumber = "";
        formattedNumber += (arabicPrefixText != "") ? String.format("%s ", arabicPrefixText) : "";
        formattedNumber += (retVal != "") ? retVal : "";
        if (_intergerValue != 0)
        { // here we add currency name depending on _intergerValue : 1 ,2 , 3--->10 , 11--->99
            int remaining100 = (int)(_intergerValue % 100);

            if (remaining100 == 0)
                formattedNumber += currencyInfo.arabic1CurrencyName;
            else
                if (remaining100 == 1)
                    formattedNumber += currencyInfo.arabic1CurrencyName;
                else
                    if (remaining100 == 2)
                    {
                        if (_intergerValue == 2)
                            formattedNumber += currencyInfo.arabic2CurrencyName;
                        else
                            formattedNumber += currencyInfo.arabic1CurrencyName;
                    }
                    else
                        if (remaining100 >= 3 && remaining100 <= 10)
                            formattedNumber += currencyInfo.arabic310CurrencyName;
                        else
                            if (remaining100 >= 11 && remaining100 <= 99)
                                formattedNumber += currencyInfo.arabic1199CurrencyName;
        }
        formattedNumber += (_decimalValue != 0) ? " "+and.getMessage()+" " : "";
        formattedNumber += (_decimalValue != 0) ? decimalString : "";
        if (_decimalValue != 0)
        { // here we add currency part name depending on _intergerValue : 1 ,2 , 3--->10 , 11--->99
            formattedNumber += " ";

            int remaining100 = (int)(_decimalValue % 100);

            if (remaining100 == 0)
                formattedNumber += currencyInfo.arabic1CurrencyPartName;
            else
                if (remaining100 == 1)
                    formattedNumber += currencyInfo.arabic1CurrencyPartName;
                else
                    if (remaining100 == 2)
                        formattedNumber += currencyInfo.arabic2CurrencyPartName;
                    else
                        if (remaining100 >= 3 && remaining100 <= 10)
                            formattedNumber += currencyInfo.arabic310CurrencyPartName;
                        else
                            if (remaining100 >= 11 && remaining100 <= 99)
                                formattedNumber += currencyInfo.arabic1199CurrencyPartName;
        }
        formattedNumber += (arabicSuffixText != "") ? String.format(" %s", arabicSuffixText) : "";

        return formattedNumber;
    }
    
    
    
	class CurrencyInfo {
		Currency currencyID;
		String currencyCode;
        boolean isCurrencyNameFeminine;
        String englishCurrencyName;
        String englishPluralCurrencyName;
        String englishCurrencyPartName;
        String englishPluralCurrencyPartName;
        String arabic1CurrencyName;
        String arabic2CurrencyName;
        String arabic310CurrencyName;
        String arabic1199CurrencyName;
        String arabic1CurrencyPartName;
        String arabic2CurrencyPartName;
        String arabic310CurrencyPartName;
        String arabic1199CurrencyPartName;
        int partPrecision;
        boolean isCurrencyPartNameFeminine;
		
        public Currency getCurrencyID() {
			return currencyID;
		}

		public void setCurrencyID(Currency currencyID) {
			this.currencyID = currencyID;
		}

		public String getCurrencyCode() {
			return currencyCode;
		}

		public void setCurrencyCode(String currencyCode) {
			this.currencyCode = currencyCode;
		}

		public boolean isCurrencyNameFeminine() {
			return isCurrencyNameFeminine;
		}

		public void setCurrencyNameFeminine(boolean isCurrencyNameFeminine) {
			this.isCurrencyNameFeminine = isCurrencyNameFeminine;
		}

		public String getEnglishCurrencyName() {
			return englishCurrencyName;
		}

		public void setEnglishCurrencyName(String englishCurrencyName) {
			this.englishCurrencyName = englishCurrencyName;
		}

		public String getEnglishPluralCurrencyName() {
			return englishPluralCurrencyName;
		}

		public void setEnglishPluralCurrencyName(String englishPluralCurrencyName) {
			this.englishPluralCurrencyName = englishPluralCurrencyName;
		}

		public String getEnglishCurrencyPartName() {
			return englishCurrencyPartName;
		}

		public void setEnglishCurrencyPartName(String englishCurrencyPartName) {
			this.englishCurrencyPartName = englishCurrencyPartName;
		}

		public String getEnglishPluralCurrencyPartName() {
			return englishPluralCurrencyPartName;
		}

		public void setEnglishPluralCurrencyPartName(
				String englishPluralCurrencyPartName) {
			this.englishPluralCurrencyPartName = englishPluralCurrencyPartName;
		}

		public String getArabic1CurrencyName() {
			return arabic1CurrencyName;
		}

		public void setArabic1CurrencyName(String arabic1CurrencyName) {
			this.arabic1CurrencyName = arabic1CurrencyName;
		}

		public String getArabic2CurrencyName() {
			return arabic2CurrencyName;
		}

		public void setArabic2CurrencyName(String arabic2CurrencyName) {
			this.arabic2CurrencyName = arabic2CurrencyName;
		}

		public String getArabic310CurrencyName() {
			return arabic310CurrencyName;
		}

		public void setArabic310CurrencyName(String arabic310CurrencyName) {
			this.arabic310CurrencyName = arabic310CurrencyName;
		}

		public String getArabic1199CurrencyName() {
			return arabic1199CurrencyName;
		}

		public void setArabic1199CurrencyName(String arabic1199CurrencyName) {
			this.arabic1199CurrencyName = arabic1199CurrencyName;
		}

		public String getArabic1CurrencyPartName() {
			return arabic1CurrencyPartName;
		}

		public void setArabic1CurrencyPartName(String arabic1CurrencyPartName) {
			this.arabic1CurrencyPartName = arabic1CurrencyPartName;
		}

		public String getArabic2CurrencyPartName() {
			return arabic2CurrencyPartName;
		}

		public void setArabic2CurrencyPartName(String arabic2CurrencyPartName) {
			this.arabic2CurrencyPartName = arabic2CurrencyPartName;
		}

		public String getArabic310CurrencyPartName() {
			return arabic310CurrencyPartName;
		}

		public void setArabic310CurrencyPartName(String arabic310CurrencyPartName) {
			this.arabic310CurrencyPartName = arabic310CurrencyPartName;
		}

		public String getArabic1199CurrencyPartName() {
			return arabic1199CurrencyPartName;
		}

		public void setArabic1199CurrencyPartName(String arabic1199CurrencyPartName) {
			this.arabic1199CurrencyPartName = arabic1199CurrencyPartName;
		}

		public int getPartPrecision() {
			return partPrecision;
		}

		public void setPartPrecision(int partPrecision) {
			this.partPrecision = partPrecision;
		}

		public boolean isCurrencyPartNameFeminine() {
			return isCurrencyPartNameFeminine;
		}

		public void setCurrencyPartNameFeminine(boolean isCurrencyPartNameFeminine) {
			this.isCurrencyPartNameFeminine = isCurrencyPartNameFeminine;
		}
		
		LocalisableString CURRENCYNAME_1 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_1); 
		LocalisableString CURRENCYNAME_2 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_2); 
		LocalisableString CURRENCYNAME_3 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_3); 
		LocalisableString CURRENCYNAME_4 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_4); 
		LocalisableString CURRENCYNAME_5 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_5); 
		LocalisableString CURRENCYNAME_6 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_6); 
		LocalisableString CURRENCYNAME_7 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_7); 
		LocalisableString CURRENCYNAME_8 = new LocalisableString(MOLSABPONUMBERTOARABIC.CURRENCYNAME_8); 
		public CurrencyInfo(Currency currency) {
			switch (currency) {
				
				case QAR :  currencyID = currency;
                			currencyCode = currency.toString();	
                			isCurrencyNameFeminine = false;
                			englishCurrencyName = "Qatar Riyal";
					englishPluralCurrencyName = "Qatar Riyals";
					englishCurrencyPartName = "Dirham";
					englishPluralCurrencyPartName = " Dirhams";
					arabic1CurrencyName = CURRENCYNAME_1.getMessage();
					arabic2CurrencyName = CURRENCYNAME_2.getMessage();
					arabic310CurrencyName = CURRENCYNAME_3.getMessage();
					arabic1199CurrencyName = CURRENCYNAME_4.getMessage();
					arabic1CurrencyPartName = CURRENCYNAME_5.getMessage();
					arabic2CurrencyPartName = CURRENCYNAME_6.getMessage();
					arabic310CurrencyPartName = CURRENCYNAME_7.getMessage();
					arabic1199CurrencyPartName = CURRENCYNAME_8.getMessage();
                			partPrecision = 2;
                			isCurrencyPartNameFeminine = true;



					break;
				
				
                  default  : currencyID = currency;
                            		currencyCode = currency.toString();	
                			isCurrencyNameFeminine = false;
                			englishCurrencyName = "Qatar Riyal";
					englishPluralCurrencyName = "Qatar Riyals";
					englishCurrencyPartName = "Dirham";
					englishPluralCurrencyPartName = " Dirhams";
					arabic1CurrencyName = CURRENCYNAME_1.getMessage();
					arabic2CurrencyName = CURRENCYNAME_2.getMessage();
					arabic310CurrencyName = CURRENCYNAME_3.getMessage();
					arabic1199CurrencyName = CURRENCYNAME_4.getMessage();
					arabic1CurrencyPartName = CURRENCYNAME_5.getMessage();
					arabic2CurrencyPartName = CURRENCYNAME_6.getMessage();
					arabic310CurrencyPartName = CURRENCYNAME_7.getMessage();
					arabic1199CurrencyPartName = CURRENCYNAME_8.getMessage();
                			partPrecision = 2;
                			isCurrencyPartNameFeminine = true;
					break;
			}
		}
	}
}
