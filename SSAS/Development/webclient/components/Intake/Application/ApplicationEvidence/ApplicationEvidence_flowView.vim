<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2011 Curam Software Ltd.                                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This is the Evidence Flow screen for a case.                           -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <!-- BEGIN CR00278596, MN -->
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="Page.Title"
      />
    </CONNECT>
  </PAGE_TITLE>
  <!-- END CR00278596 -->


  <PAGE_PARAMETER NAME="applicationID"/>


  <SERVER_INTERFACE
    CLASS="ApplicationEvidence"
    NAME="GETPARTICIPANT"
    OPERATION="getPrimaryCaseParticipantDetails"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="applicationID"
    />
    <TARGET
      NAME="GETPARTICIPANT"
      PROPERTY="applicationID"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="ApplicationEvidence"
    NAME="DISPLAY"
    OPERATION="getEvidenceFlowDetails"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="applicationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="applicationID"
    />
  </CONNECT>


  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="false"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="data"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
