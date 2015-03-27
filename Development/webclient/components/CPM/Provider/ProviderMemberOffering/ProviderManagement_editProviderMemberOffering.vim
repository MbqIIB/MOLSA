<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2008, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the search provider groups  page  -->
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
    OPERATION="readProviderPartySummaryDetails"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProviderMember"
    NAME="DISPLAY1"
    OPERATION="viewProviderMemberOffering"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProviderMember"
    NAME="ACTION"
    OPERATION="modifyProviderMemberOffering"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="providerMemberOfferingID"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="providerPartyID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerPartyID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="providerPartyID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerMemberOfferingID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="key$providerMemberOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY1"
      PROPERTY="result$dtls$providerMemberOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerMemberOfferingDetails$dtls$providerMemberOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY1"
      PROPERTY="result$dtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo$versionNo"
    />
  </CONNECT>
  <!-- BEGIN, CR00197352, SS -->


  <!-- BEGIN, CR00199550, SS -->
  <CLUSTER
    LABEL_WIDTH="45"
    NUM_COLS="2"
  >
    <!-- END, CR00199550 -->


    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="40"
    >
      <!-- END, CR00197352 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="result$serviceOfferingName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="result$dtls$startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerMemberOfferingDetails$dtls$startDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD CONTROL="SKIP"/>


    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="result$dtls$endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerMemberOfferingDetails$dtls$endDate"
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
          NAME="DISPLAY1"
          PROPERTY="result$dtls$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerMemberOfferingDetails$dtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
