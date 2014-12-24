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


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listQuestionSubScriptsBean"
    OPERATION="listQuestionSubScripts"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listQuestionSubScriptsBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Select">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_AddSubScript"
        >
          <CONNECT>
            <SOURCE
              NAME="listQuestionSubScriptsBean"
              PROPERTY="questionScriptDtls$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionSubScriptByID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptByID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="listQuestionSubScriptsBean"
          PROPERTY="questionScriptDtls$name"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
