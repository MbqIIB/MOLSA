<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  PAGE_ID="ProcessDefinitionTool_listReminderNotificationActions"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_PARAMETER NAME="activityID"/>
  <PAGE_PARAMETER NAME="processID"/>
  <PAGE_PARAMETER NAME="processVersionNo"/>
  <PAGE_PARAMETER NAME="activityType"/>
  <PAGE_PARAMETER NAME="reminderID"/>
  <SERVER_INTERFACE
    CLASS="ReminderAdmin"
    NAME="DISPLAY"
    OPERATION="listReminderNotificationActions"
    PHASE="DISPLAY"
  />
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
      PROPERTY="reminderID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="reminderID"
    />
  </CONNECT>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="activityName"
      />
    </CONNECT>
  </PAGE_TITLE>
  <MENU MODE="IN_PAGE_NAVIGATION">
    <ACTION_CONTROL LABEL="Control.Label.Summary">
      <LINK PAGE_ID="ProcessDefinitionTool_viewManualActivityReminderNotification">
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
            NAME="PAGE"
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="Control.Label.NotificationSubject">
      <LINK PAGE_ID="ProcessDefinitionTool_viewManualActivityReminderNotificationSubject">
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
            NAME="PAGE"
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="Control.Label.NotificationBody">
      <LINK PAGE_ID="ProcessDefinitionTool_viewManualActivityReminderNotificationBody">
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
            NAME="PAGE"
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="Control.Label.NotificationActions">
      <LINK PAGE_ID="ProcessDefinitionTool_listManualActivityReminderNotificationActions">
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
            NAME="PAGE"
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="Control.Label.NotificationAllocationStrategy">
      <LINK PAGE_ID="ProcessDefinitionTool_viewManualActivityReminderNotificationAllocationStrategyRedirect">
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
            NAME="PAGE"
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </MENU>
  <LIST TITLE="List.NotificationActions">
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProcessDefinitionTool_viewReminderNotificationAction">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$action$dtls$actionID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="actionID"
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
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="Action.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProcessDefinitionTool_editReminderNotificationAction"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$actionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionID"
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
              PROPERTY="activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="reminderID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="reminderID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="Action.Label.NewTextParameter">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProcessDefinitionTool_createReminderNotificationActionTextParam"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$actionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionID"
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
              PROPERTY="reminderID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="reminderID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$text"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionText"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Parameter.Type.ReminderAction"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="textParameterType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <!-- TODO: remove this if it turns out not to be necessary -->
          <!-- <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$filterType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="filterType"
            />
          </CONNECT> -->
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="Action.Label.NewLinkParameter">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProcessDefinitionTool_createReminderNotificationActionLinkParam"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$actionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionID"
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
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$text"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionText"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Parameter.Type.ReminderAction"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <!-- TODO: remove this if it turns out not to be necessary -->
          <!-- <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$filterType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="filterType"
            />
          </CONNECT> -->
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="reminderID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="reminderID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="Action.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProcessDefinitionTool_deleteReminderNotificationAction"
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
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
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
              PROPERTY="result$action$dtls$actionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$action$dtls$text"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionText"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="CONSTANT"
              PROPERTY="Parameter.Type.ReminderAction"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="actionType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="reminderID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="reminderID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD LABEL="Field.Label.ActionText">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$action$dtls$text"
        />
      </CONNECT>
      <LINK PAGE_ID="ProcessDefinitionTool_viewReminderNotificationAction">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$action$dtls$actionID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="actionID"
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
            PROPERTY="activityType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="activityType"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reminderID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reminderID"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD LABEL="Field.Label.PageID">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$action$dtls$pageID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Occurring.Action">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="multipleOccuringAction"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>