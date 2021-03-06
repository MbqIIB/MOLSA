<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  PAGE_ID="ProcessDefinitionTool_editAllocationStrategyFunctionInputMapping"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>
  <PAGE_PARAMETER NAME="processID"/>
  <PAGE_PARAMETER NAME="processVersionNo"/>
  <PAGE_PARAMETER NAME="activityID"/>
  <PAGE_PARAMETER NAME="parameterIndex"/>
  <PAGE_PARAMETER NAME="fieldName"/>
  <PAGE_PARAMETER NAME="strategyParent"/>
  <SERVER_INTERFACE
    CLASS="AllocationStrategyAdmin"
    NAME="DISPLAY"
    OPERATION="readFunctionInputMappingForModify"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="AllocationStrategyAdmin"
    NAME="ACTION"
    OPERATION="modifyFunctionInputMapping"
    PHASE="ACTION"
  />
  <ACTION_SET>
    <ACTION_CONTROL
      LABEL="ActionControl.Label.Save"
      TYPE="SUBMIT"
    >
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="ActionControl.Label.Cancel">
    </ACTION_CONTROL>
  </ACTION_SET>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="processID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="processID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="processVersionNo"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="processVersionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="activityID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="activityID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="parameterIndex"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="parameterIndex"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="fieldName"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="fieldName"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="strategyParent"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="strategyParent"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="processID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="processID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="processVersionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="processVersionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="activityID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="activityID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="parameterIndex"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="parameterIndex"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="fieldName"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="fieldName"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="strategyParent"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="strategyParent"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <CLUSTER LABEL_WIDTH="40%">
    <FIELD LABEL="Field.Label.WorkflowDataObjectMapping">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="workflowDataObjectAttributeID"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="workflowDataObjectAttributeID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="wdoAttributeID"
        />
      </CONNECT>
      <LINK>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="processID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="processID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="processVersionNo"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="processVersionNo"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="activityID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$filterType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="filterType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="workflowDataObjectAttributeType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="workflowDataObjectAttributeType"
          />
        </CONNECT>
      </LINK>
    </FIELD>
  </CLUSTER>
</VIEW>
