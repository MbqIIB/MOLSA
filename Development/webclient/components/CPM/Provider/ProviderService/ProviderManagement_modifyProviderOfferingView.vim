<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2009-2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- This page allows you to modify provider offering details.               -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00178272, AK -->
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="ProviderOffering"
    NAME="DISPLAY"
    OPERATION="viewProviderOfferingDetails"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProviderOffering"
    NAME="ACTION"
    OPERATION="updateProviderOfferingDetails"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="providerOfferingID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerOfferingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$providerOfferingKey$providerOfferingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$providerOfferingDtls$providerOfferingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$providerOfferingDetails$providerOfferingDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$providerOfferingDtls$versionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$providerOfferingDetails$providerOfferingDtls$providerConcernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$providerOfferingDtls$providerConcernRoleID"
    />
  </CONNECT>


  <!-- BEGIN, CR00187976, SS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <!-- END, CR00187976 -->


    <!-- BEGIN, CR00206671, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Service"
      WIDTH="90"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00206671 -->


      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$serviceOfferingName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$providerOfferingDtls$serviceOfferingID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerOfferingDtls$serviceOfferingID"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Label.StartDate"
      WIDTH="40"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$providerOfferingDtls$startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerOfferingDtls$startDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00197352, SS -->
    <FIELD CONTROL="SKIP"/>
    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Label.EndReason"
      USE_BLANK="true"
      WIDTH="80"
    >
      <!-- END, CR00197352 -->
      <!-- END, CR00228396 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$providerOfferingDtls$endReason"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerOfferingDtls$endReason"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Label.EndDate"
      WIDTH="40"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$providerOfferingDtls$endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerOfferingDtls$endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
  </CLUSTER>


  <!-- BEGIN, CR00186815, GP -->


  <!-- BEGIN, CR00246368, PS -->
  <CLUSTER
    LABEL_WIDTH="50"
    NUM_COLS="2"
  >
    <!-- END, CR00246368 -->
    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.IntakeProcedure"
    >
      <!-- BEGIN, CR00197352, SS -->
      <FIELD HEIGHT="4">
        <!-- END, CR00197352 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$intakeProcedureInfo"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$intakeProcedureInfo"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.ClientFee"
    >
      <!-- BEGIN, CR00197352, SS -->
      <FIELD HEIGHT="4">
        <!-- END, CR00197352 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$clientFeeInfo"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$clientFeeInfo"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.Eligibility"
    >
      <!-- BEGIN, CR00197352, SS -->
      <FIELD HEIGHT="4">
        <!-- END, CR00197352 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$eligibilityInfo"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$eligibilityInfo"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.DocumentsRequired"
    >
      <!-- BEGIN, CR00197352, SS -->
      <FIELD HEIGHT="4">
        <!-- END, CR00197352 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$documentsRequiredInfo"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$documentsRequiredInfo"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
  <!-- END, CR00186815 -->


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00187976, CR00407812, SS, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00187976, CR00407812 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingDetails$providerOfferingDtls$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerOfferingDtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00178272 -->
</VIEW>
