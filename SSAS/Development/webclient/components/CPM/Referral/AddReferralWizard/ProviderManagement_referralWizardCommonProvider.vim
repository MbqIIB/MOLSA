<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
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


  <PAGE_PARAMETER NAME="relatedID"/>
  <PAGE_PARAMETER NAME="relatedType"/>
  <PAGE_PARAMETER NAME="rootEntityID"/>
  <PAGE_PARAMETER NAME="serviceOfferingID"/>
  <PAGE_PARAMETER NAME="serviceName"/>


  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="DISPLAY"
    OPERATION="getProvider"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    ACTION_ID_PROPERTY="searchPerformedInd"
    CLASS="ReferralWizard"
    NAME="ACTION"
    OPERATION="setProvider"
    PHASE="ACTION"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="relatedID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedType"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="relatedType"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="rootEntityID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="rootEntityID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$wizardData$relatedID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="rootEntityID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$wizardData$rootEntityID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedType"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$relatedType"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="20"
    NUM_COLS="2"
    TITLE="Cluster.Title.SpecifyProviderDetails"
  >
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerDetails$providerName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerDetails$providerName"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
  </CLUSTER>
  <CLUSTER
    LABEL_WIDTH="20"
    NUM_COLS="2"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerAddressDetails"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerAddressDetails"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    LABEL_WIDTH="20"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.Email">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="emailAddress"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="emailAddress"
        />
      </CONNECT>
    </FIELD>
    <CONTAINER LABEL="Field.Label.Phone">
      <FIELD
        WIDTH="3"
        WIDTH_UNITS="CHARS"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="phoneCountryCode"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        WIDTH="3"
        WIDTH_UNITS="CHARS"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="phoneAreaCode"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        WIDTH="8"
        WIDTH_UNITS="CHARS"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="phoneNumber"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
  </CLUSTER>


</VIEW>
