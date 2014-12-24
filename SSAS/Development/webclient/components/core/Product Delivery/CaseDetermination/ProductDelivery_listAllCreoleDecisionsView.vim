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
<!-- This page is used to display a list of all decisions for the product   -->
<!-- delivery -->
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
    CLASS="CaseDetermination"
    NAME="DISPLAY"
    OPERATION="listDecisionPeriodsForDetermination"
  />


  <PAGE_PARAMETER NAME="caseID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$caseID"
    />
  </CONNECT>


  <MENU MODE="IN_PAGE_NAVIGATION">


    <ACTION_CONTROL
      LABEL="ActionControl.Label.Decisions"
      STYLE="in-page-current-link"
    >
      <LINK PAGE_ID="ProductDelivery_listCreoleDecisions">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$caseID"
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
      STYLE="in-page-link"
    >
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
            NAME="DISPLAY"
            PROPERTY="result$determinationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="determinationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseDesc$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </MENU>
  
  
  <ACTION_SET>
    <ACTION_CONTROL LABEL="ActionControl.Label.Reassess">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="ProductDelivery_reassessCaseDetermination"
        WINDOW_OPTIONS="width=700,height=190"
      >
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
            NAME="DISPLAY"
            PROPERTY="caseDesc$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </ACTION_SET>
  
  
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


    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProductDelivery_resolveDecisionSummary">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$determinationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="determinationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="decisionFromDate"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="displayDate"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>


    <FIELD
      LABEL="Field.Label.CoverPeriod"
      WIDTH="33"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="coverPeriod"
        />
      </CONNECT>
      <LINK PAGE_ID="ProductDelivery_resolveDecisionDisplayTab">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$determinationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="determinationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="decisionFromDate"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="displayDate"
          />
        </CONNECT>
      </LINK>


    </FIELD>


    <FIELD
      LABEL="Field.Label.Decision"
      WIDTH="33"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="resultCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Summary"
      WIDTH="34"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="summary"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
