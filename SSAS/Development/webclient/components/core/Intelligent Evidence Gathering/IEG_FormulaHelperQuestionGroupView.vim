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
    NAME="listQuestionGroupsByScriptIDBean"
    OPERATION="listQuestionGroupsByScriptID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listQuestionsBean"
    OPERATION="listQuestionsByGroupID"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="includeCurrentPage"/>
  <PAGE_PARAMETER NAME="isLoopsizeExpression"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listQuestionGroupsByScriptIDBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="listQuestionGroupsByScriptIDBean"
      PROPERTY="questionPageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="includeCurrentPage"
    />
    <TARGET
      NAME="listQuestionGroupsByScriptIDBean"
      PROPERTY="includeCurrentPage"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="isLoopsizeExpression"
    />
    <TARGET
      NAME="listQuestionGroupsByScriptIDBean"
      PROPERTY="isLoopsizeExpression"
    />
  </CONNECT>
  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.SearchCriteria"
    WIDTH="90"
  >
    <FIELD LABEL="Field.Label.QuestionGroup">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="result$questionGroupDtls$id"
          NAME="listQuestionGroupsByScriptIDBean"
          PROPERTY="result$questionGroupDtls$name"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="listQuestionsBean"
          PROPERTY="questionGroupID"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <LIST TITLE="List.Title.SearchResults">
    <CONTAINER
      LABEL="Container.Title.Action"
      WIDTH="20"
    >
      <ACTION_CONTROL
        LABEL="ActionControl.Label.Copy"
        TYPE="CLIPBOARD"
      >
        <CONNECT>
          <SOURCE
            NAME="listQuestionsBean"
            PROPERTY="fullId"
          />
        </CONNECT>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD LABEL="Field.Title.QuestionName">
      <CONNECT>
        <SOURCE
          NAME="listQuestionsBean"
          PROPERTY="question"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Title.ID"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="listQuestionsBean"
          PROPERTY="id"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
