<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007,2010 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view participant details.  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <PAGE_PARAMETER NAME="providerParticipantID"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>


  <SERVER_INTERFACE
    CLASS="ProviderParticipant"
    NAME="DISPLAY"
    OPERATION="viewProviderParticipant"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerParticipantID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$providerPartyID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
    TITLE="Cluster.Label.Details"
  >
    <CONTAINER LABEL="Field.Label.Name">
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Name"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$name"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL LABEL="ActionControl.Label.Homepage">
        <!-- BEGIN, CR00180249, SK -->
        <LINK PAGE_ID="Participant_resolveRoleHome">
          <!-- END, CR00180249 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$concernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$concernRoleType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="participantType"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.StartDate"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$from"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.Status"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$recordStatus"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.Type"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$type"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.EndDate"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$to"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
