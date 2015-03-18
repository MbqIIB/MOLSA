<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006-2008 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of       -->
<!-- Curam Software, Ltd. ("Confidential Information"). You                 -->
<!-- shall not disclose such Confidential Information and shall use it only -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- with Curam Software.                                                   -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="Page.Title"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionGroupBean"
    OPERATION="getQuestionGroupByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="insertQuestionTranslationBean"
    OPERATION="insertQuestionTranslation"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="questionIDParam"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="getQuestionGroupBean"
      PROPERTY="questionGroupID$questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getQuestionGroupBean"
      PROPERTY="questionGroupID$scriptId"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="insertQuestionTranslationBean"
      PROPERTY="groupId"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionIDParam"
    />
    <TARGET
      NAME="insertQuestionTranslationBean"
      PROPERTY="id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="insertQuestionTranslationBean"
      PROPERTY="scriptId"
    />
  </CONNECT>
  <!-- Only display this cluster if there are dependant scriptRelationships -->
  <JSP_SCRIPTLET>
  <![CDATA[
    curam.omega3.texthelper.TextHelper th =
      (curam.omega3.texthelper.TextHelper)pageContext.findAttribute("getQuestionGroupBean");
    String scriptRelationships = th.getFieldValue("result$scriptRelationships");
    
    if (scriptRelationships.length() > 0) {
  ]]>
  </JSP_SCRIPTLET>
  <CLUSTER SHOW_LABELS="false">
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getQuestionGroupBean"
          PROPERTY="scriptRelationships"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <JSP_SCRIPTLET>
  <![CDATA[
    }
  ]]>
  </JSP_SCRIPTLET>
  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.QuestionDetails"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <TARGET
          NAME="insertQuestionTranslationBean"
          PROPERTY="locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Question">
      <CONNECT>
        <TARGET
          NAME="insertQuestionTranslationBean"
          PROPERTY="question"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    NUM_COLS="2"
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.ScriptText"
    >
      <FIELD HEIGHT="3">
        <CONNECT>
          <TARGET
            NAME="insertQuestionTranslationBean"
            PROPERTY="scriptText"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.QuestionHelpText"
    >
      <FIELD HEIGHT="3">
        <CONNECT>
          <TARGET
            NAME="insertQuestionTranslationBean"
            PROPERTY="helpText"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
  <CLUSTER
    LABEL_WIDTH="40"
    TITLE="Cluster.Title.Links"
  >
    <FIELD LABEL="Field.Label.Legislation">
      <CONNECT>
        <TARGET
          NAME="insertQuestionTranslationBean"
          PROPERTY="legislationLink"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Policy">
      <CONNECT>
        <TARGET
          NAME="insertQuestionTranslationBean"
          PROPERTY="policyLink"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>