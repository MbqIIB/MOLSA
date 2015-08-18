<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2007 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the create participant for provider page  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <SERVER_INTERFACE
    CLASS="ExternalProviderParticipantRequest"
    NAME="ACTION"
    OPERATION="createProviderParticipantRequest"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerConcernRoleID"
    />
  </CONNECT>


  <CLUSTER TITLE="Cluster.Label.Details">
    <CLUSTER
      NUM_COLS="1"
      SHOW_LABELS="false"
    >
      <FIELD
        ALIGNMENT="LEFT"
        EDITABLE="NONEDITABLE"
      >
        <CONNECT>
          <SOURCE
            NAME="TEXT"
            PROPERTY="Cluster.Details.Text1"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Person"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="referenceNumber"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      NUM_COLS="1"
      SHOW_LABELS="false"
    >
      <FIELD
        ALIGNMENT="LEFT"
        EDITABLE="NONEDITABLE"
      >
        <CONNECT>
          <SOURCE
            NAME="TEXT"
            PROPERTY="Cluster.Details.Text2"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Name"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$name"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <FIELD>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="addressData"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <CLUSTER
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Country"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.LocalNumber"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneNumber"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.AreaCode"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Extension"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="phoneExtension"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>


  <CLUSTER TITLE="Cluster.Label.ParticipantDetails">
    <CLUSTER
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Type"
        USE_BLANK="true"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$type"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.StartDate"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$startDate"
          />
        </CONNECT>
      </FIELD>
      <FIELD CONTROL="SKIP"/>
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.EndDate"
        USE_DEFAULT="false"
      >
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="dtls$endDate"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
</VIEW>
