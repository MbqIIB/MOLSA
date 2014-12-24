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
        PROPERTY="questionGroupIDParam"
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
    NAME="insertQuestionGroupTranslationBean"
    OPERATION="insertQuestionGroupTranslation"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  
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
      NAME="insertQuestionGroupTranslationBean"
      PROPERTY="id"
    />
  </CONNECT>

  <!-- Only display this cluster if there are dependant scriptRelationships [72054] -->
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
    TITLE="Cluster.Title.QuestionGroupDetails"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupTranslationBean"
          PROPERTY="locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.QuestionGroupName">
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupTranslationBean"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.QuestionGroupDescription"
  >
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.QuestionGroupDescription"
    >
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupTranslationBean"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>