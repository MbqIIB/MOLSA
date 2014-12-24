<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user ot modify participant details for            -->
<!-- the provider group.                                                    -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_PARAMETER NAME="providerParticipantID"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>


  <SERVER_INTERFACE
    CLASS="ProviderParticipant"
    NAME="DISPLAY"
    OPERATION="viewProviderParticipant"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProviderParticipant"
    NAME="ACTION"
    OPERATION="updateProviderParticipant"
    PHASE="ACTION"
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


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerParticipantID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$providerPartyID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00198612, SS -->
  <!-- BEGIN, CR00187976, SS -->
  <!-- BEGIN, CR00248011, GP -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- BEGIN, CR00200179, SS -->
    <!-- END, CR00198612 -->
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="80"
    >
      <!-- END, CR00187976 -->
      <!-- END, CR00200179 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$name"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00229065, PS -->
    <FIELD LABEL="Field.Label.FromDate">
      <!-- END, CR00229065 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$from"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$startDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00207959, SS -->
    <!-- BEGIN, CR00200179, SS -->
    <!-- BEGIN, CR00198612, SS -->
    <!-- BEGIN, CR00187976, SS -->
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="82"
    >
      <!-- END, CR00187976 -->
      <!-- END, CR00198612 -->
      <!-- END, CR00200179 -->
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$type"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$participantType"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00229065, PS -->
    <FIELD LABEL="Field.Label.ToDate">
      <!-- END, CR00229065 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$to"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$endDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00248011 -->
</VIEW>
