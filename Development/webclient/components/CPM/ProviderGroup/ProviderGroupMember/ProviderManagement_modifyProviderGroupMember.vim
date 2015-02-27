<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to modify provider group member details.     -->
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
    CLASS="ProviderMember"
    NAME="DISPLAY"
    OPERATION="viewMember"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProviderMember"
    NAME="ACTION"
    OPERATION="modifyProviderGroupMember"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="providerPartyID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerPartyID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="memberKey$providerPartyID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerPartyID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="memberDetails$providerPartyID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$role"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="memberDetails$memberRole"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="memberDetails$versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00200333, SS -->
  <!-- BEGIN, CR00198612, SS -->
  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <!-- END, CR00198612 -->
    <!-- END, CR00200333 -->
    <!-- BEGIN, CR00233746, PS -->
    <FIELD
      LABEL="Field.Label.From"
      WIDTH="50"
    >
      <!-- END, CR00233746 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$fromDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="memberDetails$startDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00207959, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Role"
      USE_BLANK="true"
      WIDTH="78"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$role"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00233746, PS -->
    <FIELD
      LABEL="Field.Label.To"
      WIDTH="50"
    >
      <!-- END, CR00233746 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$toDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="memberDetails$endDate"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00207959, SS -->
    <!-- BEGIN, CR00206896, SS -->
    <!-- BEGIN, CR00199550, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Position"
      USE_BLANK="true"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00199550 -->
      <!-- END, CR00206896 -->
      <!-- END, CR00207959 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$position"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="memberDetails$position"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
