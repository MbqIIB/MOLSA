<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2008, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010 Curam Software Ltd.									-->
<!-- All rights reserved.                                                       -->
<!-- This software is the confidential and proprietary information of Curam		-->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose		-->
<!-- such Confidential Information and shall use it only in accordance with		-->
<!-- the terms of the license agreement you entered into with Curam	            -->
<!-- Software.                                                                  -->
<!-- Description                                                                -->
<!-- ===========                                                                -->
<!-- This page allows the user to modify a Provider Incident Participant.       -->
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


  <PAGE_PARAMETER NAME="incidentParticipantID"/>
  <PAGE_PARAMETER NAME="versionNo"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="incidentParticipantID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$incidentParticipantRoleID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="incidentParticipantID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="incidentParticipantRoleID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="incidentParticipantDtls$versionNo"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY"
    OPERATION="viewParticipant"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="ACTION"
    OPERATION="modifyParticipant"
    PHASE="ACTION"
  />


  <!-- BEGIN, CR00200179, SS -->
  <!-- BEGIN, CR00198612, SS -->
  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    LABEL_WIDTH="48"
    NUM_COLS="2"
  >
    <!-- END, CR00197352 -->
    <!-- END, CR00198612 -->
    <!-- END, CR00200179 -->
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="userNameInd"
      />
    </CONDITION>
    <!-- BEGIN, CR00198612, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Incident.ParticipantName"
      WIDTH="70"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00198612 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="participantName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00200179, SS -->
    <!-- BEGIN, CR00198612, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Incident.ParticipantRole"
      WIDTH="90"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00198612 -->
      <!-- END, CR00200179 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="role"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="role"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    LABEL_WIDTH="60"
    NUM_COLS="2"
  >
    <!-- END, CR00197352 -->
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="userNameInd"
      />
    </CONDITION>
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Incident.ParticipantName"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="participantName"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Incident.ParticipantRole"
      WIDTH="63"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="role"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="role"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Incident.Comments"
  >
    <!-- BEGIN, CR00407812, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00407812 -->
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentParticipantDtls$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="incidentParticipantDtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>