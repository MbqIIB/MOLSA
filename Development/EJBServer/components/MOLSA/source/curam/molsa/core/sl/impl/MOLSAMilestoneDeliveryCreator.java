package curam.molsa.core.sl.impl;

import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.AccessLevel;
import curam.util.type.AccessLevelType;
import curam.util.type.Implementable;

/**
 * 
 * Business interface provides operations related to Milestone Delivery creation
 * for Product.
 * 
 * 
 */
@AccessLevel(AccessLevelType.EXTERNAL)
@Implementable
public interface MOLSAMilestoneDeliveryCreator {

	/**
	 * Creates Milestone Delivery for the specified Case.
	 * 
	 * @param caseID
	 *            Case ID
	 * @throws AppException
	 * @throws InformationalException
	 */
	void createMilestoneDelivery(Long caseID) throws AppException,
			InformationalException;
}
