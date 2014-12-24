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


  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="DISPLAY"
    OPERATION="getService"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="Referral"
    NAME="DISPLAY_POTENTIAL_REFERRALS"
    OPERATION="listAllReferralServiceOfferings"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="ACTION"
    OPERATION="setService"
    PHASE="ACTION"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="wizardData$relatedID"
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


  <MENU MODE="WIZARD_PROGRESS_BAR">
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="wizardMenu"
      />
    </CONNECT>
  </MENU>


  <CLUSTER
    DESCRIPTION="Cluster.Description.UnregisteredService"
    LABEL_WIDTH="7"
  >
    <FIELD
      LABEL="Field.Label.UnregisteredService"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$serviceName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST
    PAGINATED="false"
    SCROLL_HEIGHT="325"
  >


    <CONTAINER LABEL="Field.Label.Select">
      <WIDGET TYPE="SINGLESELECT">
        <WIDGET_PARAMETER NAME="SELECT_SOURCE">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY_POTENTIAL_REFERRALS"
              PROPERTY="serviceOfferingID"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
        <WIDGET_PARAMETER NAME="SELECT_TARGET">
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="dtls$serviceOfferingID"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
        <WIDGET_PARAMETER NAME="SELECT_INITIAL">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingID"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
      </WIDGET>
    </CONTAINER>
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="35"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_POTENTIAL_REFERRALS"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Description"
      WIDTH="65"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_POTENTIAL_REFERRALS"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
