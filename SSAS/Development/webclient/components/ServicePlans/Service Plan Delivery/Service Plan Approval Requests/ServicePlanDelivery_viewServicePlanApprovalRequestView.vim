<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to view an Servcie Plan Approval Request     -->
<!-- for a specific service plan                                            -->
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
    OPERATION="viewServicePlanApprovalRequest"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="servicePlanApprovalRequestID"/>
  <PAGE_PARAMETER NAME="currentPlanInd"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="servicePlanApprovalRequestID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="spApprovalRequestKey$servicePlanApprovalRequestID"
    />
  </CONNECT>

  <!-- BEGIN, CR00236070, SS -->
  <CLUSTER
    LABEL_WIDTH="45"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.RequestedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requestedByUserFullName"
        />
      </CONNECT>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_viewUserDetails"
        WINDOW_OPTIONS="width=800,height=300"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="requestedByUser"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    
    <!--BEGIN, CR00237189, MR -->
    <FIELD LABEL="Field.Label.DecisionMadeBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="decisionMadeByUserFullName"
        />
      </CONNECT>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_viewUserDetails"
        >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="approvalDecisionByUser"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    
    
    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>
    
    
    <FIELD LABEL="Field.Label.RequestDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requestedDate"
        />
      </CONNECT>
    </FIELD>
    
    
    <FIELD LABEL="Field.Label.DecisionDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="approvalDecisionDate"
        />
      </CONNECT>
    </FIELD>
    <!--END, CR00237189 -->
  </CLUSTER>
  <!-- END, CR00236070 -->
  <CLUSTER
    LABEL_WIDTH="21"
    NUM_COLS="1"
    TITLE="Cluster.Title.Rejection"
  >
    <FIELD
      LABEL="Field.Label.RejectionReason"
      WIDTH="36"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="rejectionReason"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.RejectionComments"
      WIDTH="36"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="rejectionComments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="45"
    NUM_COLS="2"
    TITLE="Cluster.Title.Baselines"
  >

    <!-- BEGIN, CR00236070, SS -->
    <FIELD
      LABEL="Field.Label.SubmissionBaseline"
      WIDTH="36"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$servicePlanApprovalRequestFullDetails$spSubmissionBaselineDetails$baselineName"
        />
      </CONNECT>
   
    </FIELD>


    <FIELD
      LABEL="Field.Label.ApprovalBaseline"
      WIDTH="36"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$servicePlanApprovalRequestFullDetails$spApprovalBaselineDetails$baselineName"
        />
      </CONNECT>
    
    </FIELD>
  </CLUSTER>
  <!-- END, CR00236070 -->

</VIEW>