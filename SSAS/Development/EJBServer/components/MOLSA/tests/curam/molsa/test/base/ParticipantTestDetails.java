/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/*
 * Copyright 2005 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
package curam.molsa.test.base;


import curam.util.type.Date;


/**
 * Class to hold details on participants in the household
 */

public final class ParticipantTestDetails {

  // NOTE: there can be multiple case participant
  // role types

  // The participant role id of the member
  public long participantRoleID;

  // The participant
  public String participantType;

  // The case participant role id of the member
  public long caseParticipantRoleID;

  // The case Participant Role Type
  public String caseParticipantRoleType;

  // This is used to uniquely identify the person
  public String uniqueName;

  // The date of birth of the participant
  public Date dateOfBirth;

}
