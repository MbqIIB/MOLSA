<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006-2008, 2010 Curam Software Ltd.                      -->
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
    NAME="listQuestionScriptsBean"
    OPERATION="listQuestionScripts"
    PHASE="DISPLAY"
  />


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.View">
        <LINK
          OPEN_NEW="true"
          PAGE_ID="IEG_TreeWindow"
        >
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Clone">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_CloneQuestionScript"
        >
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_DeleteQuestionScript"
        >
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Validate">
        <LINK PAGE_ID="IEG_resolveValidateQuestionScript">
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptsBean"
              PROPERTY="result$questionScriptDtls$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD
      LABEL="Field.Label.Id"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="listQuestionScriptsBean"
          PROPERTY="result$questionScriptDtls$id"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="60"
    >
      <CONNECT>
        <SOURCE
          NAME="listQuestionScriptsBean"
          PROPERTY="result$questionScriptDtls$name"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
