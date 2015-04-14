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
        NAME="getPostconditionByIDBean"
        PROPERTY="result$id"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getPostconditionByIDBean"
    OPERATION="getPostconditionByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="areGroupsOrRDOsAvailableBean"
    OPERATION="areGroupsOrRDOsAvailable"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="modifyPostconditionBean"
    OPERATION="modifyPostcondition"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionScriptBean"
    OPERATION="getQuestionScriptByID"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="postconditionIDParam"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="modifyPostconditionBean"
      PROPERTY="pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="modifyPostconditionBean"
      PROPERTY="scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="modifyPostconditionBean"
      PROPERTY="id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="areGroupsOrRDOsAvailableBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="areGroupsOrRDOsAvailableBean"
      PROPERTY="questionPageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="CONSTANT"
      PROPERTY="Constant.True"
    />
    <TARGET
      NAME="areGroupsOrRDOsAvailableBean"
      PROPERTY="includeCurrentPage"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="CONSTANT"
      PROPERTY="Constant.True"
    />
    <TARGET
      NAME="areGroupsOrRDOsAvailableBean"
      PROPERTY="isLoopsizeExpression"
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
    TITLE="Cluster.Title.Name"
  >


    <FIELD LABEL="Field.Label.ID">
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$id"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER LABEL_WIDTH="25">
    <CONDITION>
      <IS_TRUE
        NAME="areGroupsOrRDOsAvailableBean"
        PROPERTY="groupOrRdoAvailable"
      />
    </CONDITION>
    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="FormulaHelperIcon"
        LABEL="ActionControl.Label.FormulaHelper"
        TYPE="ACTION"
      >
        <LINK
          OPEN_NEW="true"
          PAGE_ID="IEG_FormulaHelper"
        >
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
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Constant.True"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Constant.False"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.FormulaHelper"
        TYPE="ACTION"
      >
        <LINK
          OPEN_NEW="true"
          PAGE_ID="IEG_FormulaHelper"
        >
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
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Constant.True"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="includeCurrentPage"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Constant.False"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="isLoopsizeExpression"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Value"
    >
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$value"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyPostconditionBean"
          PROPERTY="value"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER LABEL_WIDTH="25">
    <CONDITION>
      <IS_FALSE
        NAME="areGroupsOrRDOsAvailableBean"
        PROPERTY="groupOrRdoAvailable"
      />
    </CONDITION>
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Value"
    >
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$value"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyPostconditionBean"
          PROPERTY="value"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER LABEL_WIDTH="25">
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Message"
    >
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$message"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyPostconditionBean"
          PROPERTY="message"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
