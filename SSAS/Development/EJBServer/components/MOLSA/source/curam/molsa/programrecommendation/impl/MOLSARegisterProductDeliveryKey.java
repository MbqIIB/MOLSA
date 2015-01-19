package curam.molsa.programrecommendation.impl;

import com.google.inject.ImplementedBy;

import curam.core.struct.RegisterProductDeliveryKey;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;
import curam.util.type.Implementable;

/**
 * 
 * Business interface provides operations related to Registering Product
 * Delivery key for Product.
 * 
 * 
 */

@ImplementedBy(MOLSASocialAssistanceRegisterPDKey.class)
public interface MOLSARegisterProductDeliveryKey {
	/**
	 * Register a Product Delivery Key for a case
	 * 
	 * @param caseID
	 *            Case ID
	 * @throws AppException
	 * @throws InformationalException
	 */

	RegisterProductDeliveryKey registerProductDeliveryKey(
			SimulatedDetermination simulatedDetermination) throws AppException,
			InformationalException;

}
