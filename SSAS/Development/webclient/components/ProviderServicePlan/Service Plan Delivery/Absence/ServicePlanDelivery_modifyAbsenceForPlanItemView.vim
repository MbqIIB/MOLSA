<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2011 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to modify absence details                    -->
<!-- for the particular plan item of the service plan.                      -->
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


  <SERVER_INTERFACE
    CLASS="ServicePlanDelivery"
    NAME="DISPLAY"
    OPERATION="readAbsenceForPlanItem"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ServicePlanDelivery"
    NAME="ACTION"
    OPERATION="modifyAbsenceForPlanItem"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="plannedItemID"/>
  <PAGE_PARAMETER NAME="absencePeriodID"/>
  <PAGE_PARAMETER NAME="description"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="plannedItemID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$key$plannedItemID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="absencePeriodID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$key$absencePeriodID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="key$key$plannedItemID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$dtls$plannedItemID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="key$key$absencePeriodID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$dtls$dtls$dtls$absencePeriodID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="recordStatus"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="createdBySystem"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="createdBySystem"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="creationDate"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="creationDate"
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


  <CLUSTER
    NUM_COLS="2"
  >


    <FIELD LABEL="Field.Label.PeriodStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="periodStartDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="periodStartDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.PeriodEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="periodEndDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="periodEndDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AbsenceDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="absenceDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="absenceDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.UnitsNotAttended">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="unitsUnattended"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="unitsUnattended"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AbsenceReason">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="absenceReason"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="absenceReason"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
