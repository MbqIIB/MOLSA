<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <CLUSTER
    NUM_COLS="2"
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <LIST TITLE="List.IncomingTransitions">
      <DETAILS_ROW>
        <INLINE_PAGE PAGE_ID="ProcessDefinitionTool_viewTransitionFromActivity">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$fromTransition$dtls$transitionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="transitionID"
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
              PROPERTY="result$type"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
        </INLINE_PAGE>
      </DETAILS_ROW>
      <ACTION_SET TYPE="LIST_ROW_MENU">
        <ACTION_CONTROL LABEL="Action.Label.Edit.Transition">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProcessDefinitionTool_editTransition"
          >
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="result$fromTransition$dtls$transitionID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="transitionID"
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
                PROPERTY="activityID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="activityID"
              />
            </CONNECT>
          </LINK>
        </ACTION_CONTROL>
      </ACTION_SET>
      <FIELD LABEL="Field.Label.TransFromActivity">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$fromTransition$dtls$activityName"
          />
        </CONNECT>
        <LINK PAGE_ID="ProcessDefinitionTool_resolveActivity">
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
              PROPERTY="result$fromTransition$dtls$activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$fromTransition$dtls$activityID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityID"
            />
          </CONNECT>
        </LINK>
      </FIELD>
    </LIST>
    <LIST TITLE="List.OutgoingTransitions">
      <DETAILS_ROW>
        <INLINE_PAGE PAGE_ID="ProcessDefinitionTool_viewTransitionFromActivity">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$toTransition$dtls$transitionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="transitionID"
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
              PROPERTY="result$type"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
        </INLINE_PAGE>
      </DETAILS_ROW>
      <ACTION_SET TYPE="LIST_ROW_MENU">
        <ACTION_CONTROL LABEL="Action.Label.Edit.Transition">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProcessDefinitionTool_editTransition"
          >
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="result$toTransition$dtls$transitionID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="transitionID"
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
          </LINK>
        </ACTION_CONTROL>
        <ACTION_CONTROL LABEL="Action.Label.Reorder.Transition">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProcessDefinitionTool_reorderTransition"
          >
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="result$toTransition$dtls$transitionID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="transitionID"
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
          </LINK>
        </ACTION_CONTROL>
      </ACTION_SET>
      <FIELD LABEL="Field.Label.TransToActivity">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$toTransition$dtls$activityName"
          />
        </CONNECT>
        <LINK PAGE_ID="ProcessDefinitionTool_resolveActivity">
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
              PROPERTY="result$toTransition$dtls$activityType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$toTransition$dtls$activityID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="activityID"
            />
          </CONNECT>
        </LINK>
      </FIELD>
    </LIST>
  </CLUSTER>
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Description"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
