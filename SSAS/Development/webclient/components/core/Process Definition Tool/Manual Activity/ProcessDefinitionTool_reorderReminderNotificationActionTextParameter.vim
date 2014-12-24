<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  PAGE_ID="ProcessDefinitionTool_reorderReminderNotificationActionTextParameter"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="Page.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>
  <PAGE_PARAMETER NAME="processID"/>
  <PAGE_PARAMETER NAME="processVersionNo"/>
  <PAGE_PARAMETER NAME="activityID"/>
  <PAGE_PARAMETER NAME="actionID"/>
  <PAGE_PARAMETER NAME="textParameterType"/>
  <PAGE_PARAMETER NAME="workflowDataObjectAttributeID"/>
  <SERVER_INTERFACE
    CLASS="ActivityActionTextParameterAdmin"
    NAME="DISPLAY"
    OPERATION="listActionTextParametersForReorder"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="ActivityActionTextParameterAdmin"
    NAME="ACTION"
    OPERATION="reorderActionTextParameter"
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
      PROPERTY="actionID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="actionID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="textParameterType"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="textParameterType"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="workflowDataObjectAttributeID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="workflowDataObjectAttributeID"
    />
  </CONNECT>
  <CLUSTER
    DESCRIPTION="Cluster.Description"
    LABEL_WIDTH="30"
  >
    <FIELD LABEL="Field.Label.InsertBeforeParameter">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="result$dtls$dtls$attributeID"
          NAME="DISPLAY"
          PROPERTY="result$dtls$dtls$attributeID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="insertBeforeWorkflowDataObjectAttributeID"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
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
      PROPERTY="actionID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="actionID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="workflowDataObjectAttributeID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="workflowDataObjectAttributeID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="textParameterType"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="textParameterType"
    />
  </CONNECT>
</VIEW>
