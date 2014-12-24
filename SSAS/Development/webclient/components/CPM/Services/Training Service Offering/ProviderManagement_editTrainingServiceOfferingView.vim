<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2008, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description 															-->
<!-- =========== 															-->
<!-- This page allows the user to edit training service offering details. 	-->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00171770, SG -->
  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="DISPLAY"
    OPERATION="viewServiceOffering"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="DISPLAY1"
    OPERATION="viewTrainingServiceOffering"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="ACTION"
    OPERATION="updateTrainingServiceOffering"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="serviceOfferingID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$serviceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="key$serviceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceOfferingDtls$serviceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$serviceOfferingDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceOfferingDtls$versionNo"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY1"
      PROPERTY="trainingServiceOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="trainingServiceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="trainingServiceOfferingDtls$serviceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY1"
      PROPERTY="trainingServiceOffering$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="trainingServiceOfferingDtls$versionNo"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY1"
      PROPERTY="training$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="trainingDtls$versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00171887, ASN -->
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="creoleRuleSetLinkDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="creoleRuleSetLinkDtls$versionNo"
    />
  </CONNECT>


  <CONNECT>
    <!-- BEGIN, CR00188479, ASN -->
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="creoleRuleSetLinkDtls$creoleRuleSetLinkID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="creoleRuleSetLinkDtls$creoleRuleSetLinkID"
    />
    <!-- END, CR00188479 -->
  </CONNECT>
  <!-- END, CR00171887 -->


  <!-- BEGIN, CR00228079, PS -->
  <CLUSTER NUM_COLS="2">
    <!-- END, CR00228079 -->
    <!-- BEGIN, CR00245942, PS -->
    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.Name"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceOfferingDtls$name"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.StartDate"
      WIDTH="50"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceOfferingDtls$startDate"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197766, PS -->
    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.UnitOfMeasure"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$unitOfMeasure"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="unitOfMeasure"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00197766 -->


    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.MaximumUnits"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$maximumUnits"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$maximumUnits"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->


    <!-- BEGIN, CR00178548, AK -->
    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.ServiceOffering.Reference"
      USE_BLANK="true"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$reference"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$serviceOfferingDtls$reference"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00178548 -->


    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.EndDate"
      WIDTH="50"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceOfferingDtls$endDate"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00206310, PS -->
    <!-- BEGIN, CR00245761, EC -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.ProvisionMethod"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="100"
    >
      <!-- END, CR00245761 -->
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="provisionMethod"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="provisionMethod"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.UnitFrequency"
      USE_BLANK="true"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <!-- END, CR00245942 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$unitFrequency"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="unitFrequency"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00187899 -->


    <!-- BEGIN, CR00248112, PS -->
    <FIELD LABEL="Field.Label.CheckAvailabilityExcludeIndicator">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$availabilityCheckExcludeInd"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="availabilityCheckExcludeInd"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00248112 -->


  </CLUSTER>


  <!-- BEGIN, CR00197766, PS -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Description"
  >
    <!-- BEGIN, CR00187899, PS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00187899 -->
      <CONNECT>
        <!-- BEGIN, CR00186631, ASN -->
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$localizableDescription"
        />
      </CONNECT>
      <!-- END, CR00186631 -->
      <CONNECT>
        <!-- BEGIN, CR00186631, ASN -->
        <TARGET
          NAME="ACTION"
          PROPERTY="localizableDescription"
        />
        <!-- END, CR00186631 -->
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00197766 -->


  <!-- BEGIN, CR00245942, PS -->
  <!-- BEGIN, CR00187899, PS -->
  <CLUSTER
    DESCRIPTION="Cluster.Description.Training"
    LABEL_WIDTH="40"
    NUM_COLS="2"
    TITLE="Cluster.Label.TrainingDetails"
  >
    <!-- END, CR00187899 -->
    <FIELD LABEL="Field.Label.TrainingServiceOffering.Training">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY1"
          PROPERTY="result$trainingSODetails$training$trainingName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="training$trainingID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingDtls$trainingID"
        />
      </CONNECT>
    </FIELD>


    <FIELD CONTROL="SKIP"/>


  </CLUSTER>


  <!-- BEGIN, CR00187899, PS -->
  <CLUSTER
    DESCRIPTION="Cluster.Description.NewTraining"
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- END, CR00187899 -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.TrainingName"
      WIDTH="100"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->
    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.TrainingType"
      USE_BLANK="true"
      WIDTH="85"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingType"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00187899 -->
  </CLUSTER>


  <!-- BEGIN, CR00187899, PS -->
  <!-- BEGIN, CR00247984, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- END, CR00247984 -->
    <FIELD LABEL="Field.Label.TrainingServiceOffering.ApprovalRequired">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="approvalRequired"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="approvalRequired"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.TrainingServiceOffering.UnitsRequired"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="trainingServiceOffering$unitsRequired"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingSODetails$unitsRequired"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00187899 -->
  <!-- END, CR00245942 -->


  <!-- BEGIN, CR00171887, ASN -->
  <!-- BEGIN, CR00247984, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    TITLE="Cluster.Title.EstimatedCostRuleSet"
  >
    <!-- END, CR00247984 -->


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.RuleSet">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetName"
        />
      </CONNECT>
      <CONNECT>
        <!-- BEGIN, CR00188479, ASN -->
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$creoleRuleSetID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="creoleRuleSetLinkDtls$creoleRuleSetID"
        />
        <!-- END, CR00188479 -->
      </CONNECT>


    </FIELD>
    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.EstimatedCostRuleSet.StartDate"
      WIDTH="45"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="creoleRuleSetLinkDtls$startDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.DataStoreName">
      <CONNECT>
        <!-- BEGIN, CR00188479, ASN -->
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$creoleDataStoreName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$creoleDataStoreName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="creoleRuleSetLinkDtls$creoleDataStoreName"
        />
        <!-- END, CR00188479 -->
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.EstimatedCostRuleSet.EndDate"
      WIDTH="45"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="creoleRuleSetLinkDtls$endDate"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- END, CR00171887 -->


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Comments"
  >
    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00187899 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceOfferingDtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00171770 -->


</VIEW>
