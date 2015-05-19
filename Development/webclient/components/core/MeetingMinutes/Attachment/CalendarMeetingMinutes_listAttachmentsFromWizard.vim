<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010 - 2011 Curam Software Ltd.                        -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows a user to create a new case attachment.               -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="MeetingMinutesManagement"
    NAME="DISPLAY"
    OPERATION="listAttachments"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="meetingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="meetingID"
    />
  </CONNECT>


  <LIST SCROLL_HEIGHT="190">
    <!-- BEGIN, CR00221064, CW -->
    <FIELD
      LABEL="Field.Label.List.Description"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00221064 -->


    <FIELD
      LABEL="Field.Label.List.Date"
      WIDTH="25"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.List.Status"
      WIDTH="25"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="CalendarMeetingMinutes_modifyAttachmentFromListFromAgenda"
          SAVE_LINK="true"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="attachmentLinkID"
            />
          </CONNECT>


          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="meetingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="meetingID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="CalendarMeetingMinutes_removeAttachmentFromListFromAgenda"
          SAVE_LINK="true"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkDtls$attachmentLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="attachmentLinkID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkDtls$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="context"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


  </LIST>
</VIEW>
