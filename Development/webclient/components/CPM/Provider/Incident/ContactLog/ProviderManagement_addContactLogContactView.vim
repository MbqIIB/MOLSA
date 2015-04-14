<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2008, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2010, 2012 Curam Software Ltd.								-->
<!-- All rights reserved.                                                   	-->
<!-- This software is the confidential and proprietary information of Curam     -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose        -->
<!-- such Confidential Information and shall use it only in accordance with 	-->
<!-- the terms of the license agreement you entered into with Curam         	-->
<!-- Software.                                                              	-->
<!-- Description                                                            	-->
<!-- ===========                                                            	-->
<!-- This page allows the user to add the attendee to the contact log	        -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Title"
      />
    </CONNECT>
  </PAGE_TITLE>
  <!-- BEGIN, CR00313834, GA -->
  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="ACTION"
    OPERATION="addContactLogAttendee"
    PHASE="ACTION"
  />
  <!-- END, CR00313834 -->
  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY"
    OPERATION="listActiveProviderMember"
    PHASE="DISPLAY"
  />
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$concernRoleID"
    />
  </CONNECT>


  <PAGE_PARAMETER NAME="incidentID"/>
  <PAGE_PARAMETER NAME="contactLogID"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contactLogID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="contactLogID"
    />
  </CONNECT>
  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="true"
  >
    <CLUSTER
      DESCRIPTION="Cluster.Description.ProviderMember"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <CONTAINER LABEL="Field.Label.ProviderMember">
        <FIELD USE_BLANK="true">
          <CONNECT>
            <INITIAL
              HIDDEN_PROPERTY="details$concernRoleID"
              NAME="DISPLAY"
              PROPERTY="providerMemberName"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="providerMemberConcernRoleID"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>
      <FIELD CONTROL="SKIP"/>
    </CLUSTER>


    <CLUSTER
      DESCRIPTION="Cluster.Description.RegisteredParticipant"
      LABEL_WIDTH="25"
      NUM_COLS="1"
      STYLE="cluster-cpr-no-border"
    >
      <CONTAINER LABEL="Field.Label.Participant">
        <FIELD
          USE_BLANK="true"
          WIDTH="35"
        >
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="concernRoleType"
            />
          </CONNECT>
        </FIELD>
        <FIELD WIDTH="40">
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>
    </CLUSTER>
    <CLUSTER
      DESCRIPTION="Cluster.Description.UnRegisteredParticipant"
      NUM_COLS="2"
      STYLE="cluster-cpr-no-border"
    >
      <FIELD LABEL="Field.Label.ParticipantName">
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="newConcernRoleName"
          />
        </CONNECT>
      </FIELD>
      <FIELD CONTROL="SKIP"/>
    </CLUSTER>
  </CLUSTER>


  <CLUSTER
    DESCRIPTION="Cluster.Description.User"
    NUM_COLS="2"
    SHOW_LABELS="true"
    TITLE="Cluster.Label.UserDetails"
  >
    <FIELD LABEL="Field.Label.User">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="userName"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
  </CLUSTER>
</VIEW>
