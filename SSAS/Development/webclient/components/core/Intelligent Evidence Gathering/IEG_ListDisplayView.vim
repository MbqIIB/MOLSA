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
        NAME="getQuestionBean"
        PROPERTY="answerDataType"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionBean"
    OPERATION="getQuestionByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getListMetaDataBean"
    OPERATION="getListMetaData"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listVisibleRowOptionsBean"
    OPERATION="listVisibleRowOptions"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="modifyListMetaDataBean"
    OPERATION="modifyListMetaData"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listListTypesCodeTableBean"
    OPERATION="listListTypesCodeTable"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionGroupBean"
    OPERATION="getQuestionGroupByID"
    PHASE="DISPLAY"
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
      NAME="getQuestionBean"
      PROPERTY="questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionIDParam"
    />
    <TARGET
      NAME="getQuestionBean"
      PROPERTY="questionGroupChildID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionIDParam"
    />
    <TARGET
      NAME="getListMetaDataBean"
      PROPERTY="questionGroupChildID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="getListMetaDataBean"
      PROPERTY="questionByID$questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionIDParam"
    />
    <TARGET
      NAME="modifyListMetaDataBean"
      PROPERTY="questionDetails$id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="modifyListMetaDataBean"
      PROPERTY="questionDetails$groupId"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="getQuestionGroupBean"
      PROPERTY="questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getQuestionGroupBean"
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
    LABEL_WIDTH="40"
    TITLE="Cluster.Title.Details"
  >
    <FIELD LABEL="Field.Label.ListType">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="type"
          NAME="listListTypesCodeTableBean"
          PROPERTY="description"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="getListMetaDataBean"
          PROPERTY="listType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyListMetaDataBean"
          PROPERTY="listType"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NumberOfVisibleRows">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="numberOfVisibleRows"
          NAME="listVisibleRowOptionsBean"
          PROPERTY="numberOfVisibleRows"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="getListMetaDataBean"
          PROPERTY="numberOfVisibleRows"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyListMetaDataBean"
          PROPERTY="numberOfVisibleRows"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.BlankDefaultEntry">
      <CONNECT>
        <SOURCE
          NAME="getListMetaDataBean"
          PROPERTY="blankDefaultEntry"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyListMetaDataBean"
          PROPERTY="blankDefaultEntry"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
