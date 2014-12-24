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
    OPERATION="getNotifications"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="ACTION"
    OPERATION="setNotifications"
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
      PROPERTY="relatedType"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$relatedType"
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


  <CLUSTER
    DESCRIPTION="Cluster.Description.NotificationSummary"
    NUM_COLS="2"
    SHOW_LABELS="false"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="providerEnteredInd"
      />
    </CONDITION>
    <CLUSTER
      LABEL_WIDTH="40"
      TITLE="Cluster.Title.ClientNotification"
    >
      <FIELD LABEL="Field.Label.AutomaticallySendLetterClient">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="notifyClientAutomatically"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="notifyClientAutomatically"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <CLUSTER SHOW_LABELS="false">
      <FIELD HEIGHT="220">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="clientNotificationText"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="clientNotificationText"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <CLUSTER
      LABEL_WIDTH="40"
      TITLE="Cluster.Title.ProviderNotification"
    >
      <FIELD LABEL="Field.Label.AutomaticallySendLetterProvider">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="notifyProviderAutomatically"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="notifyProviderAutomatically"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <CLUSTER SHOW_LABELS="false">
      <FIELD HEIGHT="220">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="providerNotificationText"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="providerNotificationText"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>


  <CLUSTER
    DESCRIPTION="Cluster.Description.ClientOnlyNotificationSummary"
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.ClientNotification"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="providerEnteredInd"
      />
    </CONDITION>
    <FIELD LABEL="Field.Label.AutomaticallySendLetterClient">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="notifyClientAutomatically"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="notifyClientAutomatically"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER SHOW_LABELS="false">
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="providerEnteredInd"
      />
    </CONDITION>
    <FIELD HEIGHT="260">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientNotificationText"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientNotificationText"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
