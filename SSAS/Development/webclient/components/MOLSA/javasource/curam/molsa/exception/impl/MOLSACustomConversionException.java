package curam.molsa.exception.impl;

import curam.util.client.domain.convert.ConversionException;
import curam.util.common.message.CatalogMessageLocalizer;
import curam.util.common.message.MessageLocalizer;

/**
 * The MOLSA Custom Conversion Exception Class.
 */
public class MOLSACustomConversionException extends ConversionException {
  public static final int ERR_CONV_PARSE_FAILED_QID = -90001;



  private static final long serialVersionUID = 1L;

  /** The Constant MESSAGE_LOCALIZER. */
  private static final MessageLocalizer MESSAGE_LOCALIZER = new CatalogMessageLocalizer("curam.molsa.exception.impl.MOLSACustomValidationMessages");

  /**
   * Instantiates a new custom conversion exception.
   * 
   * @param messageID
   *          the message ID
   */
  public MOLSACustomConversionException(int messageID) {
    super(messageID);
  }

  /**
   * Instantiates a new custom conversion exception.
   * 
   * @param messageID
   *          the message ID
   * @param messageArgs
   *          the message args
   */
  public MOLSACustomConversionException(final int messageID, final String[] messageArgs) {
    super(messageID, messageArgs);
  }

  /**
   * Instantiates a new custom conversion exception.
   * 
   * @param messageID
   *          the message ID
   * @param messageArg
   *          the message arg
   */
  public MOLSACustomConversionException(final int messageID, final String messageArg) {
    super(messageID, messageArg);
  }

  /*
   * (non-Javadoc)
   * 
   * @see curam.util.client.domain.convert.ConversionException#getMessageLocalizer()
   */
  @Override
  public MessageLocalizer getMessageLocalizer() {
    return MESSAGE_LOCALIZER;
  }

}
