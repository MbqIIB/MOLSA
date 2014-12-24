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
    <CONNECT>
      <SOURCE
        NAME="PAGE"
        PROPERTY="questionParam"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionAliasTranslationBean"
    OPERATION="getQuestionAliasTranslation"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="questionIDParam"/>
  <PAGE_PARAMETER NAME="aliasTypeParam"/>
  <PAGE_PARAMETER NAME="localeParam"/>
  <PAGE_PARAMETER NAME="questionParam"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="getQuestionAliasTranslationBean"
      PROPERTY="questionAliasDetails$groupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionIDParam"
    />
    <TARGET
      NAME="getQuestionAliasTranslationBean"
      PROPERTY="questionAliasDetails$id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="getQuestionAliasTranslationBean"
      PROPERTY="questionAliasDetails$locale"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="aliasTypeParam"
    />
    <TARGET
      NAME="getQuestionAliasTranslationBean"
      PROPERTY="questionAliasDetails$type"
    />
  </CONNECT>
  <CLUSTER
    LABEL_WIDTH="40"
    TITLE="Cluster.Title.QuestionDetails"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="getQuestionAliasTranslationBean"
          PROPERTY="result$locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      HEIGHT="3"
      LABEL="Field.Label.QuestionText"
    >
      <CONNECT>
        <SOURCE
          NAME="getQuestionAliasTranslationBean"
          PROPERTY="result$question"
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
          <SOURCE
            NAME="getQuestionAliasTranslationBean"
            PROPERTY="result$scriptText"
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
          <SOURCE
            NAME="getQuestionAliasTranslationBean"
            PROPERTY="result$helpText"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
</VIEW>
