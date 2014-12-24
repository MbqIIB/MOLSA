<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2009, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2009-2011 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to modify Service Evaluation Criterion       -->
<VIEW>


  <SERVER_INTERFACE
    CLASS="MaintainServiceEvaluationCriteria"
    NAME="ACTION"
    OPERATION="modifyServiceEvaluationCriterion"
    PHASE="ACTION"
  />


  <SERVER_INTERFACE
    CLASS="MaintainServiceEvaluationCriteria"
    NAME="DISPLAY"
    OPERATION="viewServiceEvaluationCriterion"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="MaintainServiceEvaluationCriteria"
    NAME="DISPLAY1"
    OPERATION="listCriterionResponseTypeCodes"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="serviceEvaluationCriterionID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceEvaluationCriterionID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$serviceEvaluationCriterionID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceEvaluationCriterionID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$dtls$serviceEvaluationCriterionID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$details$dtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="32"
    NUM_COLS="1"
  >
    <FIELD
      LABEL="Field.Label.ServiceEvaluationCriterion.Criterion"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="60"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="criterion"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="criterion"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.ServiceEvaluationCriterion.ResponseType"
      WIDTH="40"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="criterionResponseCode"
          NAME="DISPLAY1"
          PROPERTY="criterionResponseCodeDescription"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="responseType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="responseType"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00407812, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00407812 -->
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
