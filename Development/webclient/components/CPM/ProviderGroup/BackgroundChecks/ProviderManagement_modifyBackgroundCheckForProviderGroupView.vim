<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
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
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to modify the BackgroundCheck For Provider.  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_PARAMETER NAME="providerBackgroundCheckID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerBackgroundCheckID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="providerBackgroundCheckKey$providerBackgroundCheckID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="providerBackgroundCheckDtls$providerBackgroundCheckID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerBackgroundCheckDtls$providerBackgroundCheckID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$providerBackgroundCheckDetails$providerBackgroundCheckDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerBackgroundCheckDtls$versionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="providerPartyID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerPartyID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerConcernRoleID"
    />
  </CONNECT>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="ProviderBackgroundCheck"
    NAME="DISPLAY"
    OPERATION="viewProviderGroupBackgoundCheck"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="ProviderBackgroundCheck"
    NAME="ACTION"
    OPERATION="updateProviderGroupBackgroundCheck"
    PHASE="ACTION"
  />
  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER NUM_COLS="2">
    <!-- END, CR00197352 -->


    <!-- BEGIN, CR00207959, SS -->
    <FIELD LABEL="Field.Label.ProviderGroupMember">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerMemberName"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00207959 -->


    <!-- BEGIN, CR00248555, PS -->
    <FIELD
      LABEL="Field.Label.RequestDate"
      WIDTH="60"
    >
      <!-- END, CR00248555 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requestDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="requestDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00229065, PS -->
    <FIELD LABEL="Field.Label.Result">
      <!-- END, CR00229065 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="result"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00207959, SS -->
    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00207959 -->
    <!-- BEGIN, CR00248555, PS -->
    <FIELD
      LABEL="Field.Label.ReceiptDate"
      WIDTH="60"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="receiptDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ExpiryDate"
      WIDTH="60"
    >
      <!-- END, CR00248555 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerBackgroundCheckDetails$providerBackgroundCheckDtls$expiryDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerBackgroundCheckDtls$expiryDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00197352, CR00407812, SS, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00197352, CR00407812 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
