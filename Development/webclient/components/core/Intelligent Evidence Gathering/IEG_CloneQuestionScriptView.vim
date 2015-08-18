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
        PROPERTY="questionScriptParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptParam"/>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="cloneQuestionBean"
    OPERATION="cloneQuestionScript"
    PHASE="ACTION"
  />



  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="cloneQuestionBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>


  <CLUSTER LABEL_WIDTH="25">
    <FIELD LABEL="Field.Label.NewScriptID">
      <CONNECT>
        <TARGET
          NAME="cloneQuestionBean"
          PROPERTY="newQuestionScriptID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NewScriptName">
      <CONNECT>
        <TARGET
          NAME="cloneQuestionBean"
          PROPERTY="newQuestionScriptName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>