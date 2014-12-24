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
    OPERATION="insertQuestionScript"
    PHASE="ACTION"
  />


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.QuestionScriptDetails"
  >
    <FIELD
      LABEL="Field.Label.QuestionScriptID"
      WIDTH="45"
    >
      <CONNECT>
        <TARGET
          NAME="insertQuestionScriptBean"
          PROPERTY="questionScriptDetails$id"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.QuestionScriptName"
      WIDTH="45"
    >
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
    <FIELD HEIGHT="4">
      <CONNECT>
        <TARGET
          NAME="insertQuestionScriptBean"
          PROPERTY="questionScriptDetails$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
