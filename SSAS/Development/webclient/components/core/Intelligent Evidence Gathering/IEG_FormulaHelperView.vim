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
    NAME="areGroupsAndRDOsAvailableBean"
    OPERATION="areGroupsAndRDOsAvailable"
    PHASE="DISPLAY"
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
      NAME="areGroupsAndRDOsAvailableBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="areGroupsAndRDOsAvailableBean"
      PROPERTY="questionPageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="includeCurrentPage"
    />
    <TARGET
      NAME="areGroupsAndRDOsAvailableBean"
      PROPERTY="includeCurrentPage"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="isLoopsizeExpression"
    />
    <TARGET
      NAME="areGroupsAndRDOsAvailableBean"
      PROPERTY="isLoopsizeExpression"
    />
  </CONNECT>


  <CLUSTER SHOW_LABELS="false">
    <CONDITION>
      <IS_TRUE
        NAME="areGroupsAndRDOsAvailableBean"
        PROPERTY="groupsAvailable"
      />
    </CONDITION>
    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="QuestionGroupIcon"
        LABEL="ActionControl.Label.SelectQuestionGroup"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_FormulaHelperQuestionGroup"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
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
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.SelectQuestionGroup">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_FormulaHelperQuestionGroup"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
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
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER SHOW_LABELS="false">
    <CONDITION>
      <IS_TRUE
        NAME="areGroupsAndRDOsAvailableBean"
        PROPERTY="rdosAvailable"
      />
    </CONDITION>
    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="RulesDataObjectIcon"
        LABEL="ActionControl.Label.SelectRDO"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_FormulaHelperRDO"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
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
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.SelectRDO">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_FormulaHelperRDO"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
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
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


</VIEW>
