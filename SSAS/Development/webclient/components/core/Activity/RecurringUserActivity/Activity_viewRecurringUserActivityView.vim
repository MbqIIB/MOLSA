<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2003-2004, 2010, 2012 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to view a recurring activity.                -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>


  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="Activity"
    NAME="DISPLAY"
    OPERATION="viewRecurringUserActivity"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="activityID"/>
  <PAGE_PARAMETER NAME="description"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="activityID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="maintainActivityKey$activityID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="17"
    NUM_COLS="1"
  >
    <FIELD LABEL="Field.Label.Subject">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="subject"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Location">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="locationName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >


    <FIELD LABEL="Field.Label.Priority">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="priorityCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recordStatusCode"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.Start">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDateTime"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AllDay">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="allDayInd"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.End">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDateTime"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ShowAs">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="timeStatusCode"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.Client">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="concernRoleName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CaseReference">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="caseReference"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >


    <FIELD LABEL="Field.Label.Frequency">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="frequencyPattern"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >


    <FIELD LABEL="Field.Label.NumOccurences">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="occurrencesStr"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.To">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recurrenceEndDate"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <LIST TITLE="List.Title.Attendees">


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Remove">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Activity_cancelInvitationFromRecurringActivity"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="activityID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="activityAttendeeID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityAttendeeID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="activityAttendeeType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityAttendeeType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attendeeName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="attendeeName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


    <FIELD
      LABEL="Field.Label.Attendee"
      WIDTH="60"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="attendeeName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00306738, VT -->
    <FIELD
      LABEL="Field.Label.AttendeeStatus"
      WIDTH="40"
    >
      <!-- END, CR00306738 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="invitationStatus"
        />
      </CONNECT>
    </FIELD>


  </LIST>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <FIELD HEIGHT="4">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="notes"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
