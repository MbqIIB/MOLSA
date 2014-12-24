<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Create an action for the meeting from the Record Meeting Minutes agenda player -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="MeetingMinutesManagement"
    NAME="DISPLAY_ATTENDEES"
    OPERATION="listPotentialActionAssignees"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="MeetingMinutesManagement"
    NAME="ACTION"
    OPERATION="createMeetingAction"
    PHASE="ACTION"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="meetingID"
    />
    <TARGET
      NAME="DISPLAY_ATTENDEES"
      PROPERTY="meetingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="meetingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="meetingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseID"
    />
  </CONNECT>


  <CLUSTER LABEL_WIDTH="14">
    <FIELD LABEL="Field.Label.Subject">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="subject"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="14"
    NUM_COLS="1"
    STYLE="cluster-no-top-margin-border cluster-smaller-date"
  >
    <FIELD
      LABEL="Field.Label.DueDate"
      WIDTH="30"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="deadlineDateTime"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST
    SCROLL_HEIGHT="140"
    TITLE="List.Title.SelectAssignees"
  >
    <CONTAINER
      LABEL="Field.Label.Select"
      WIDTH="10"
    >
      <WIDGET TYPE="MULTISELECT">
        <WIDGET_PARAMETER NAME="MULTI_SELECT_SOURCE">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY_ATTENDEES"
              PROPERTY="userName"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
        <WIDGET_PARAMETER NAME="MULTI_SELECT_TARGET">
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="actionAssigneeList"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
      </WIDGET>
    </CONTAINER>
    <FIELD LABEL="Field.Label.AssigneeName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_ATTENDEES"
          PROPERTY="fullName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Role">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_ATTENDEES"
          PROPERTY="role"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Attended">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_ATTENDEES"
          PROPERTY="attendedInd"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
