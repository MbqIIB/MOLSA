package curam.molsa.converter.impl;

import java.util.Locale;

import curam.molsa.exception.impl.MOLSACustomConversionException;
import curam.util.client.domain.convert.AbstractConverter;
import curam.util.client.domain.convert.ConversionException;
import curam.util.client.domain.convert.ConverterUtils;
import curam.util.client.domain.convert.DomainConverter;
import curam.util.client.domain.convert.SvrInt64Converter;

/**
 * MOLSA Custom QID Converter class.
 */
public class MOLSAQIDConverter extends SvrInt64Converter {
  /**
   * Converts a string representation of this domain to a 11 object.
   * 
   * @see DomainConverter#parse(String)
   * 
   * @param data
   * @return
   * @throws ConversionException
   */
  public Object parse(String data) throws ConversionException {
    return parseCommon(data, getLocale());
  }

  /**
   * calling super
   * 
   * @see AbstractConverter#format(Object)
   * 
   * @param data
   * @return
   * @throws ConversionException
   */
  public String format(Object data) throws ConversionException {
    return super.format(data);
  }

  /**
   * Checking whether the input is 11 digit number.
   * 
   * @param data
   * @param locale
   * @return
   * @throws ConversionException
   */
  private Object parseCommon(String data, Locale locale) throws ConversionException {
    Number value = ConverterUtils.parseNumber(data, locale, true);
    boolean isProperQID = data.trim().length() == 11;
    if (value == null || !isProperQID) {
      throw new MOLSACustomConversionException(MOLSACustomConversionException.ERR_CONV_PARSE_FAILED_QID);
    } else {
     return data;
    }
  }

}
