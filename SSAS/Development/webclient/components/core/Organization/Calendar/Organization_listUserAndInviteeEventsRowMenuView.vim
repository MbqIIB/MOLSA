<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2011 Curam Software Ltd.                                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view to display the list row menu actions appropriate to  -->
<!-- each of the event types. This view applys for most of the integrated   -->
<!-- and product delivery case types.                                       -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- Meeting Event -->
  <ACTION_SET TYPE="LIST_ROW_MENU">


    <!-- Review, Referral and Appeal Events -->
    <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="editIndAndNoMinutesRecorded"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_resolveUserActivityModify"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="recurringInd"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="recurringInd"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <!-- BEGIN, CR00250750, CW -->


    <ACTION_CONTROL
      LABEL="ActionControl.Label.EditMeetingMinutes"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingDetails_updateRichTextDetails"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.EditNotes"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingDetails_updateRichTextNotes"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.EditAgenda"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingDetails_editAgenda"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.EditDecisions"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingDetails_editDecisions"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL LABEL="ActionControl.Label.Invite">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="organizerInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeeting_resolveInviteAttendee"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL LABEL="ActionControl.Label.RecordMeetingMinutes">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingNoMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeeting_Wizard"
        SAVE_LINK="false"
        WINDOW_OPTIONS="width=800,height=600"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="CONSTANT"
            PROPERTY="ZeroID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="teamID"
          />
        </CONNECT>
        <!-- BEGIN, CR00245614, CW -->
        <CONNECT>
          <SOURCE
            NAME="CONSTANT"
            PROPERTY="ListMeetingFromUserCalendarPage"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingOriginPage"
          />
        </CONNECT>
        <!-- END, CR00245614 -->
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.NewAction"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingMinutes_createAction"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.AddAttachment"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingMinutes_addAttachmentsFromView"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.GeneratePDF"
      TYPE="FILE_DOWNLOAD"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.IssueMinutes"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>


      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingMinutes_issueMinutes"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesVersionNo"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="versionNo"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      LABEL="ActionControl.Label.Delete"
      TYPE="ACTION"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="meetingWithMinutesRecordedInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeetingDetails_remove"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="meetingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="meetingMinutesVersionNo"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="versionNo"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <!-- END, CR00250750 -->


    <ACTION_CONTROL LABEL="ActionControl.Label.Cancel">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="organizerIndAndMeetingNoMinutes"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="CalendarMeeting_cancelMeeting"
        SAVE_LINK="true"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
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
      </LINK>
    </ACTION_CONTROL>


    <!-- Activity Event -->
    <ACTION_CONTROL
      IMAGE="InviteAttendeesButton"
      LABEL="ActionControl.Label.Invite"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="activityInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_inviteAttendeeToStandardActivityFromView"
        SAVE_LINK="false"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      IMAGE="DeleteButton"
      LABEL="ActionControl.Label.Cancel"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="activityInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_cancelStandardUserActivity"
        SAVE_LINK="false"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
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
      </LINK>
    </ACTION_CONTROL>


    <!-- Recurring Activity Event -->
    <ACTION_CONTROL
      IMAGE="InviteAttendeesButton"
      LABEL="ActionControl.Label.Invite"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="recurringInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_inviteAttendeeToRecurringActivityFromView"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      IMAGE="DeleteButton"
      LABEL="ActionControl.Label.Cancel"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="recurringInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_cancelRecurringUserActivity"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
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
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      IMAGE="AcceptInvitationButton"
      LABEL="ActionControl.Label.Accept"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="acceptInviteInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_acceptStandardInvitation"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="subject"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      IMAGE="RejectInvitationButton"
      LABEL="ActionControl.Label.Reject"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="rejectInviteInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_rejectStandardInvitation"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
            PROPERTY="subject"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="subject"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


  </ACTION_SET>


</VIEW>
