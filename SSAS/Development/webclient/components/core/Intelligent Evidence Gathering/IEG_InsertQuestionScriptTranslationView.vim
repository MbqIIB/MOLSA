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
    NAME="insertQuestionScriptBean"
    OPERATION="insertQuestionScriptTranslation"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionScriptBean"
    OPERATION="getQuestionScriptByID"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="insertQuestionScriptBean"
      PROPERTY="questionScriptDetails$id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getQuestionScriptBean"
      PROPERTY="questionScriptID$questionScriptID"
    />
  </CONNECT>


  <!-- Only display this cluster if there are dependant scriptRelationships -->
  <JSP_SCRIPTLET>
  <![CDATA[
    curam.omega3.texthelper.TextHelper th =
      (curam.omega3.texthelper.TextHelper)pageContext.findAttribute("getQuestionScriptBean");
    String scriptRelationships = th.getFieldValue("result$scriptRelationships");
    
    if (scriptRelationships.length() > 0) {
  ]]>
  </JSP_SCRIPTLET>
  <CLUSTER SHOW_LABELS="false">
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getQuestionScriptBean"
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
    LABEL_WIDTH="25"
    TITLE="Cluster.Title.QuestionScriptDetails"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <TARGET
          NAME="insertQuestionScriptBean"
          PROPERTY="questionScriptDetails$locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.QuestionScriptName">
      <CONNECT>
        <TARGET
          NAME="insertQuestionScriptBean"
          PROPERTY="questionScriptDetails$name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.QuestionScriptDescription"
  >
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.QuestionScriptDescription"
    >
      <CONNECT>
        <TARGET
          NAME="insertQuestionScriptBean"
          PROPERTY="questionScriptDetails$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
