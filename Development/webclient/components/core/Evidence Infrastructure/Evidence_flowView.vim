<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2010, 2013. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                     -->
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
  <PAGE_TITLE DESCRIPTION="Page.Description">
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="Page.Title"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="caseID"/>


  <SERVER_INTERFACE
    CLASS="Case"
    NAME="GETPARTICIPANT"
    OPERATION="getPrimaryCaseParticipantDetails"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="GETPARTICIPANT"
      PROPERTY="caseID"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="Evidence"
    NAME="DISPLAY"
    OPERATION="getEvidenceFlowDetails"
  />


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


  <!-- BEGIN, CR00359477, PS -->
  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="false"
    STYLE="evidence-in-page-navg"
  >
    <!-- END, CR00359477 -->


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
