<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2009-2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Display the time line  for a product delivery determination.           -->
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


  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="determinationID"/>
  <PAGE_PARAMETER NAME="contextDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="determinationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="determinationID"
    />
  </CONNECT>


  <SERVER_INTERFACE
    CLASS="CaseDetermination"
    NAME="DISPLAY"
    OPERATION="listKeyData"
  />


  <MENU MODE="IN_PAGE_NAVIGATION">


    <ACTION_CONTROL
      LABEL="ActionControl.Label.Decisions"
      STYLE="in-page-link"
    >
      <LINK PAGE_ID="ProductDelivery_listCreoleDecisions">
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.KeyEvent"
      STYLE="in-page-current-link"
    >
      <LINK PAGE_ID="ProductDelivery_listDeterminationTimeLine">
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="determinationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="determinationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


  </MENU>


  <!--
  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >

BEGIN, CR00422014, BD
    <ACTION_CONTROL LABEL="ActionControl.Label.GraphicalView">
      <LINK PAGE_ID="ProductDelivery_determinationFlexView">
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="determinationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="determinationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
        </CONNECT>
      </LINK>


    </ACTION_CONTROL>
END, CR00422014

  </ACTION_SET>
-->


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="determinationDesc$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST>


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="isDecision"
        />
      </CONDITION>


      <ACTION_CONTROL LABEL="ActionControl.Label.View">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="isDecision"
          />
        </CONDITION>


        <LINK PAGE_ID="ProductDelivery_resolveDecisionDisplayTab">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="determinationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="determinationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="date"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="displayDate"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


    <FIELD
      LABEL="Field.Label.Date"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="date"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Description"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$description"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
