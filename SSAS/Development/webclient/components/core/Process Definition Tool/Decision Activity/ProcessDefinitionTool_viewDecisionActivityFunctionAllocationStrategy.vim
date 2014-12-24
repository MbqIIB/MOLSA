<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  PAGE_ID="ProcessDefinitionTool_viewDecisionActivityFunctionAllocationStrategy"
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
  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="result$info$dtls$message"
      />
    </CONNECT>
  </INFORMATIONAL>
  <SERVER_INTERFACE
    CLASS="AllocationStrategyAdmin"
    NAME="DISPLAY"
    OPERATION="readFunctionAllocationStrategy"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="processID"/>
  <PAGE_PARAMETER NAME="processVersionNo"/>
  <PAGE_PARAMETER NAME="activityID"/>
  <PAGE_PARAMETER NAME="strategyParent"/>
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
      PROPERTY="strategyParent"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="strategyParent"
    />
  </CONNECT>
  <CLUSTER LABEL_WIDTH="30%">
    <FIELD LABEL="Field.Label.AllocationStrategyType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="allocationStrategyType"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.AllocationFunction">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="functionName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <LIST
    DESCRIPTION="List.AllocationFunctionInputMappings.Description"
    TITLE="List.AllocationFunctionInputMappings.Title"
  >
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="Action.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProcessDefinitionTool_editAllocationFunctionInputMapping"
        >
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
              PROPERTY="parameterIndex"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="parameterIndex"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="fieldName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="fieldName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="strategyParent"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="strategyParent"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD LABEL="Field.Label.ParameterToSet">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="parameterName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FieldToSet">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fieldName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FieldToSetType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fieldType"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.WorkflowDataObjectAttribute">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="workflowDataObjectMapping"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="CENTER"
      LABEL="Field.Label.Valid"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="valid"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
