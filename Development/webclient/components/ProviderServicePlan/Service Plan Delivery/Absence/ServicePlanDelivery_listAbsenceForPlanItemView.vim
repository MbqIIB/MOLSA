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
<!-- This page lists absences for the particular PlanItem of the            -->
<!-- of the service plan.                                                   -->
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
    CLASS="ProviderServicePlanDelivery"
    NAME="DISPLAY"
    OPERATION="listAbsenceForPlanItem"
  />
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
        PAGE_ID="ServicePlanDelivery_addAbsenceForPlanItem"
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
          PAGE_ID="ServicePlanDelivery_modifyAbsenceForPlanItemFromList"
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
              PROPERTY="absencePeriodID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="absencePeriodID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      
      
      <ACTION_CONTROL
        IMAGE="DeleteButton"
        LABEL="ActionControl.Label.Delete"
        >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ServicePlanDelivery_cancelPlanItemAbsence"
          SAVE_LINK="false"
          >
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
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="absencePeriodID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="absencePeriodID"
            />
          </CONNECT>
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
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <!--END, CR00249267 -->
    <FIELD
      LABEL="Field.Label.PeriodStartDate"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="periodStartDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.PeriodEndDate"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="periodEndDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.AbsenceReason"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="absenceReason"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.UnitsUnattended"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="unitsUnattended"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Status"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recordStatus"
        />
      </CONNECT>
    </FIELD>
    
    <!--BEGIN, CR00249267, MR-->
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ServicePlanDelivery_viewAbsenceForPlanItem">
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
              PROPERTY="absencePeriodID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="absencePeriodID"
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
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!--END, CR00249267 -->
  </LIST>
</VIEW>
