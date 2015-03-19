/*
 * Licensed Materials - Property of IBM
 * 
 * PID 5725-H26
 * 
 * Copyright IBM Corporation 2014. All rights reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package curam.molsa.creole.statics.impl;

import java.util.Iterator;
import java.util.List;

import curam.creole.execution.session.Session;
import curam.util.type.Date;

public final class MOLSAStatics {

  /**
   * Constructor.
   */
  protected MOLSAStatics() {
    throw new UnsupportedOperationException();
  }

  /**
   * Returns the formatted name. For example : Fathima Khan, Firdous Khan, would
   * be returned as Fathima,Firdous
   * 
   * @param session
   *          The CER session.
   * @param unFormattedNames
   *          Holds the list of names.
   * 
   * @return Formatted name.
   */
  public static String formatNames(final Session session,
      final List<String> unFormattedNames) {

    if (unFormattedNames == null) {
      return null;
    }
    final Iterator<String> i1 = unFormattedNames.iterator();
    final StringBuffer unFormattedNamesText = new StringBuffer();
    while (i1.hasNext()) {
      unFormattedNamesText.append(i1.next());
      if (i1.hasNext()) {
        unFormattedNamesText.append(", ");
      } else {
        unFormattedNamesText.append("");
      }
    }
    return unFormattedNamesText.toString();
  }

  /**
   * Returns Current Date
   * @param session
   * @return
   */
  public static Date getCurrentDate(final Session session) {
    return Date.getCurrentDate();

  }

}
