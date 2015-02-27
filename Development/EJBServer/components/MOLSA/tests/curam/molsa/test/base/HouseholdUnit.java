/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/*
 * Copyright 2012 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
package curam.molsa.test.base;

import java.util.List;

import curam.creole.value.Timeline;

/**
 * Class to hold the household unit information. This is used to check the 
 * CREOLE program recommendation result.  
 */
public class HouseholdUnit {
  
  private Timeline<? extends Boolean> eligibilityPeriod;
  
  private List<Long> mandatoryMembers;
  
  private List<Long> optionalMembers;
  
  private Long productID;

  public HouseholdUnit(List<Long> mandatoryMembers, List<Long> optionalMembers,
      Long productID, Timeline<? extends Boolean> eligibilityPeriod) {
    super();
    this.mandatoryMembers = mandatoryMembers;
    this.optionalMembers = optionalMembers;
    this.productID = productID;
    this.eligibilityPeriod = eligibilityPeriod;
  }

  @Override
  public boolean equals(final Object householdUnit) {
    
    HouseholdUnit actualHouseholdUnit = (HouseholdUnit) householdUnit;

    if (eligibilityPeriod.equals(actualHouseholdUnit.eligibilityPeriod)
        && mandatoryMembers.size() == actualHouseholdUnit.mandatoryMembers.size()
        && mandatoryMembers.containsAll(actualHouseholdUnit.mandatoryMembers)
        && optionalMembers.size() == actualHouseholdUnit.optionalMembers.size()
        && optionalMembers.containsAll(actualHouseholdUnit.optionalMembers)
        && productID == actualHouseholdUnit.productID.longValue()) {
      return true;
    } else {
      return false;
    }

  }

  public Timeline<? extends Boolean> getEligibilityPeriod() {
    return eligibilityPeriod;
  }

  public List<Long> getMandatoryMembers() {
    return mandatoryMembers;
  }

  public List<Long> getOptionalMembers() {
    return optionalMembers;
  }

  public Long getProductID() {
    return productID;
  }

  public void setEligibilityPeriod(Timeline<? extends Boolean> eligibilityPeriod) {
    this.eligibilityPeriod = eligibilityPeriod;
  }

  public void setProductID(Long productID) {
    this.productID = productID;
  }
  

}
