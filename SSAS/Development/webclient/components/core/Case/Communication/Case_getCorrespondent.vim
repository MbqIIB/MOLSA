<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2004, 2011 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to create a new communication.               -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="caseID"/>


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


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="caseID"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="DISPLAY_CASEMEMBERS"
    OPERATION="getCaseParticipantsAgeConcernRoleID"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY_CASEMEMBERS"
      PROPERTY="caseID"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="DISPLAY"
    OPERATION="listCaseParticipantsDetails"
  />


  <!-- BEGIN, CR00178447, PM -->
  <SERVER_INTERFACE
    CLASS="Communication"
    NAME="ACTION"
    OPERATION="getCaseCorrespondentForCommunication"
    PHASE="ACTION"
  />
  <!-- END, CR00178447  -->


  <CLUSTER
    DESCRIPTION="Cluster.ParticipantSearch.Description"
    LABEL_WIDTH="25"
    TITLE="Cluster.ParticipantSearch.Title"
  >
    <FIELD
      LABEL="Field.Label.CaseParticipant"
      USE_BLANK="TRUE"
      WIDTH="35"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="participantRoleID"
          NAME="DISPLAY"
          PROPERTY="name"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="correspondentDetails$details$caseParticipantConcernRoleID"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    DESCRIPTION="Cluster.CorrespondentSearch.Description"
    LABEL_WIDTH="25"
  >


    <CONTAINER LABEL="Field.Label.CorrespondentSearch">
      <FIELD WIDTH="35">
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="correspondentDetails$details$correspondentType"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="correspondentDetails$details$correspondentConcernRoleID"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    DESCRIPTION="Cluster.CorrespondentContact.Description"
    LABEL_WIDTH="25"
  >
    <FIELD
      LABEL="Field.Label.CorrespondentName"
      WIDTH="35"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="correspondentDetails$details$correspondentName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="25"
    NUM_COLS="1"
    TITLE="Cluster.RegardingCaseMember.Title"
  >
    <FIELD
      LABEL="Field.Label.CaseMember"
      USE_BLANK="true"
      WIDTH="35"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="participantRoleID"
          NAME="DISPLAY_CASEMEMBERS"
          PROPERTY="name"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientConcernRoleID"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
