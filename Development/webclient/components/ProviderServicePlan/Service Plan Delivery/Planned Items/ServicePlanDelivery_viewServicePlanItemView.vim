<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to view the details of a service plan item   -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- Page level information -->
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Title"
      />
    </CONNECT>
  </PAGE_TITLE>


  <!-- Page Parameter for this page -->
  <PAGE_PARAMETER NAME="plannedItemID"/>
  <PAGE_PARAMETER NAME="description"/>
  <PAGE_PARAMETER NAME="caseID"/>
  <!-- Display Phase Server access beans -->


  <SERVER_INTERFACE
    CLASS="ProviderServicePlanDelivery"
    NAME="DISPLAY"
    OPERATION="viewPlannedItem"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ServicePlanDelivery"
    NAME="DISPLAY_APPROVALDETAILS"
    OPERATION="getListOfApprovalCriteriaForPlannedItem"
    PHASE="DISPLAY"
  />


  <!-- Page Level Connect Statements -->
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


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="plannedItemID"
    />
    <TARGET
      NAME="DISPLAY_APPROVALDETAILS"
      PROPERTY="key$plannedItemIDKey$plannedItemIDKey$plannedItemID"
    />
  </CONNECT>

  <!-- Cluster displaying the details of a Planned Item-->
  <CLUSTER
    NUM_COLS="2"
  >
    <!--Fields need to be rearranged-->
    <FIELD LABEL="Field.Label.PlanItemName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Owner">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="userFullName"
        />
      </CONNECT>
      <!-- BEGIN, CR00200487, GP -->
      <!-- BEGIN, CR00237116, MR -->
      <LINK OPEN_MODAL="true" PAGE_ID="Organization_viewUserDetails">
      <!-- END, CR00237116 -->
        <!-- END, CR00200487 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="ownerUserName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD LABEL="Field.Label.ExpectedStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expectedStartDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ActualStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="actualStartDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.SubGoal">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="subGoalName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ExpectedOutcome">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="outcomeName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.EstimatedCost">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="estimatedCost"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.GoodCause">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="goodCauseName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.GuidanceURL">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$plannedItemDetails$plannedItemDetails$plannedItemDtls$guidanceURL"
        />
      </CONNECT>
      <LINK
        OPEN_NEW="true"
        URI_SOURCE_NAME="DISPLAY"
        URI_SOURCE_PROPERTY="result$plannedItemDetails$plannedItemDetails$plannedItemDtls$guidanceURL"
      />
    </FIELD>
    <FIELD LABEL="Field.Label.ConcerningName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="concerningName"
        />
      </CONNECT>
      <!-- BEGIN, CR00199030, GP -->
      
      <!-- BEGIN, CR00237116, MR -->
      <LINK PAGE_ID="Participant_resolveConcernRoleTypeHome">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="concerningID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        
      </LINK>
      <!-- END, CR00237116 -->
    </FIELD>
    <FIELD LABEL="Field.Label.Responsibility">
      <!--BEGIN CR00116260, PP -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="planItemRespUserFullName"
        />
      </CONNECT>
      <!--END CR00116260 -->
      <LINK
        OPEN_NEW="true"
        PAGE_ID="ServicePlanDelivery_resolveResponsibilityHome"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="responsibilityID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="respSetToClientInd"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="respSetToClientInd"
          />
        </CONNECT>
        <!--BEGIN CR00109143, GBA-->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="respSetToParticipant"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="respSetToParticipant"
          />
        </CONNECT>
        <!--END CR00109143-->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="respUserName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="respUserName"
          />
        </CONNECT>
      </LINK>
    </FIELD>


    <FIELD LABEL="Field.Label.ExpectedEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expectedEndDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ActualEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="actualEndDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Outcome">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="outcomeAchieved"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ActualCost">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="actualCost"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NomineeName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="nomineeName"
        />
      </CONNECT>
    </FIELD>


    <!-- END, CR00109143 -->
  </CLUSTER>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Label.ProviderDetails"
  >
    <FIELD LABEL="Field.Label.ServiceOffering">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceOfferingName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Provider">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.UnitsAuthorized">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="authorizedUnits"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.RateAuthorized">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="rateAuthorized"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.TotalUnitsAuthorized">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="totalUnitsAuthorized"
        />
      </CONNECT>
    </FIELD>
    <!--END CR00116062-->
    <FIELD LABEL="Field.Label.ProviderType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerTypeName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.UnitOfMeasure">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="unitOfMeasure"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.UnitsDelivered">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="unitsDelivered"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Frequency">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="frequency"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Sensitivity">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="sensitivityCode"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00123487 -->
  </CLUSTER>


  <!-- Cluster for displaying Reason For Referral -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.ReasonForReferral"
  >
    <FIELD HEIGHT="3">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="referralReason"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST TITLE="List.Title.ApprovalCriteria">
    <FIELD LABEL="Field.Label.CriteriaName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_APPROVALDETAILS"
          PROPERTY="result$dtls$criteriaName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.OccursWhen">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_APPROVALDETAILS"
          PROPERTY="result$dtls$occursWhen"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Priority">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY_APPROVALDETAILS"
          PROPERTY="result$dtls$priority"
        />
      </CONNECT>
    </FIELD>


  </LIST>
  <!--  Cluster for displaying comments-->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Comments"
  >
    <FIELD HEIGHT="3">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
