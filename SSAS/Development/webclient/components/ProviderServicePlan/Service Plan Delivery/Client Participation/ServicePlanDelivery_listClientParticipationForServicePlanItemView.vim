<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2009, 2011 Curam Software Ltd.                 			-->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This is included to list client participation for a particular service -->
<!-- PlanItem of the service plan                                           -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Title"
      />
    </CONNECT>
  </PAGE_TITLE>

  <!--BEGIN, CR00171307, GBA-->
  <SERVER_INTERFACE
    CLASS="ServicePlanDelivery"
    NAME="DISPLAY"
    OPERATION="listClienParticipationForPlannedItem"
  />
  <!--END, CR00171307-->
  <PAGE_PARAMETER NAME="plannedItemID"/>
  <PAGE_PARAMETER NAME="description"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="plannedItemID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="plannedItemIDKey$plannedItemID"
    />
  </CONNECT>

  <ACTION_SET
    BOTTOM="false"
    TOP="true"
  >
    <ACTION_CONTROL
      IMAGE="NewButton"
      LABEL="ActionControl.Label.New"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="ServicePlanDelivery_addClientParticipationServicePlanItem"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="plannedItemID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="plannedItemID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="piDtlsList$name"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="name"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </ACTION_SET>
  
  <LIST>
    <!--BEGIN, CR00249267, MR-->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ServicePlanDelivery_modifyClientParticipationServicePlanItem"
          >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="piDtlsList$dtls$dailyAttendanceID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="dailyAttendanceID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ServicePlanDelivery_cancelClientParticipationServicePlanItem" 
          >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="piDtlsList$dtls$dailyAttendanceID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="dailyAttendanceID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      
    </ACTION_SET>
    
    <!--BEGIN, CR00171307, GBA-->

    <FIELD
      LABEL="Field.Label.Date"
      WIDTH="25"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="piDtlsList$dtls$serviceDate"
        />
      </CONNECT>
    </FIELD>
    <!--BEGIN CR00128267, GBA-->
    <FIELD
      LABEL="Field.Label.ParticipationType"
      WIDTH="25"
    >
      <!--END CR00128267-->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="piDtlsList$dtls$attendance"
        />
      </CONNECT>
    </FIELD>
   
    <CONTAINER
      LABEL="Container.Label.totalTime"
      STYLE="date-time"
      WIDTH="30"
    >
      <FIELD ALIGNMENT="RIGHT">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="piDtlsList$dtls$totalHours"
          />
        </CONNECT>
      </FIELD>
      <FIELD ALIGNMENT="CENTER">
        <CONNECT>
          <SOURCE
            NAME="TEXT"
            PROPERTY="Container.TotalTime.Separator"
          />
        </CONNECT>
      </FIELD>
      <FIELD ALIGNMENT="LEFT">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="piDtlsList$dtls$totalMinutes"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="piDtlsList$dtls$recordStatus"
        />
      </CONNECT>
    </FIELD>
    
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ServicePlanDelivery_viewClientParticipationServicePlanItem">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="piDtlsList$dtls$dailyAttendanceID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="dailyAttendanceID"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!--END, CR00249267-->
    <!--END, CR00171307-->
  </LIST>
</VIEW>
