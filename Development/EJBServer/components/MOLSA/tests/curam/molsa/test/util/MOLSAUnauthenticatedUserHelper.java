package curam.molsa.test.util;

import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.OrganizationFactory;
import curam.core.facade.intf.Organization;
import curam.core.facade.struct.UserForPositionDetails;
import curam.core.fact.UsersFactory;
import curam.core.intf.Users;
import curam.core.sl.entity.fact.OrgUnitParentLinkFactory;
import curam.core.sl.entity.intf.OrgUnitParentLink;
import curam.core.sl.entity.struct.OrgUnitParentLinkDtls;
import curam.core.sl.struct.PositionHolderLinkDetails;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;

/**
 * This helper class will Contains the methods to use unauthenticated user be a part of organisation.
 * 
 */
public class MOLSAUnauthenticatedUserHelper {

  public static final long KORGSTRUCTID = 45000;
  public static final long KPOSITIONID = 45000;
  public static final long KORGUNITID = 1;
  public static final long KDEFPRINTERID = 1;
  public static final String  KUSERNAME= "unauthenticated";
  /**
   * This helper method will make the unauthenticated user be a part of organisation
   * with position added
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public static void insertUnauthenticatedUserDetails() throws AppException, InformationalException {
    Users userObj = UsersFactory.newInstance();
    UsersKey usersKey = new UsersKey();
    usersKey.userName = KUSERNAME;
    UsersDtls usersDtls = userObj.read(usersKey);
    usersDtls.defaultPrinterID = KDEFPRINTERID;
    userObj.modify(usersKey, usersDtls);

    OrgUnitParentLink orgUnitParentLinkObj = OrgUnitParentLinkFactory.newInstance();
    OrgUnitParentLinkDtls orgUnitParentLinkDtls = new OrgUnitParentLinkDtls();
    orgUnitParentLinkDtls.organisationStructureID = KORGSTRUCTID;
    orgUnitParentLinkDtls.organisationUnitID = KORGUNITID;
    orgUnitParentLinkDtls.recordStatus = RECORDSTATUS.NORMAL;
    orgUnitParentLinkObj.insert(orgUnitParentLinkDtls);

    Organization organizationObj = OrganizationFactory.newInstance();
    UserForPositionDetails userForPositionDetails = new UserForPositionDetails();
    userForPositionDetails.organisationID = 1;

    PositionHolderLinkDetails positionHolderLinkDetails = new PositionHolderLinkDetails();
    positionHolderLinkDetails.positionHolderLinkDtls.organisationStructureID = KORGSTRUCTID;
    positionHolderLinkDetails.positionHolderLinkDtls.positionID = KPOSITIONID;
    positionHolderLinkDetails.positionHolderLinkDtls.userName = KUSERNAME;
    positionHolderLinkDetails.positionHolderLinkDtls.fromDate = Date.getCurrentDate();
    positionHolderLinkDetails.positionHolderLinkDtls.recordStatus = RECORDSTATUS.NORMAL;

    userForPositionDetails.positionHolderLinkDetails = positionHolderLinkDetails;
    organizationObj.addUserForPosition(userForPositionDetails);
  }
}
