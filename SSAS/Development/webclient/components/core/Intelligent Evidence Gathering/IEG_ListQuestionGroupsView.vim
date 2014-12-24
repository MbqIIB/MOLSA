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
    NAME="listQuestionGroupsBean"
    OPERATION="listQuestionGroups"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_DeleteQuestionGroup"
        >
          <CONNECT>
            <SOURCE
              NAME="listQuestionGroupsBean"
              PROPERTY="id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupIDParam"
            />
          </CONNECT>


          <CONNECT>
            <SOURCE
              NAME="listQuestionGroupsBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupParam"
            />
          </CONNECT>


          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD LABEL="Field.Label.Id">
      <CONNECT>
        <SOURCE
          NAME="listQuestionGroupsBean"
          PROPERTY="result$questionGroupDtls$id"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="listQuestionGroupsBean"
          PROPERTY="result$questionGroupDtls$name"
        />
      </CONNECT>
    </FIELD>
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="IEG_resolveViewQuestionGroup">
        <CONNECT>
          <SOURCE
            NAME="listQuestionGroupsBean"
            PROPERTY="result$questionGroupDtls$id"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="questionGroupIDParam"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="questionScriptIDParam"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="questionScriptIDParam"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>


  </LIST>


</VIEW>
