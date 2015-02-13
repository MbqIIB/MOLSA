<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to update service offering details.          -->
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
    NAME="ACTION"
    OPERATION="updateServiceOffering"
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
      NAME="ACTION"
      PROPERTY="serviceOfferingDtls$serviceOfferingID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="serviceOfferingDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceOfferingDtls$versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00293377, GYH -->
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$serviceOfferingDtls$deliveryType"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="deliveryType"
    />
  </CONNECT>
  <!-- END, CR00293377 -->


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


  <CLUSTER NUM_COLS="2">


    <!-- BEGIN, CR00245942, PS -->
    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.ServiceOffering.Name"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$name"
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
      LABEL="Field.Label.ServiceOffering.StartDate"
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
      LABEL="Field.Label.ServiceOffering.UnitOfMeasure"
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


    <!-- BEGIN, CR00206310, PS -->
    <FIELD
      LABEL="Field.Label.ServiceOffering.MaximumUnits"
      WIDTH="100"
    >
      <!-- END, CR00206310 -->
      <!-- END, CR00197766 -->
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


    <!-- BEGIN, CR00110514, RPB -->
    <FIELD LABEL="Field.Label.ServiceOffering.InhibitAuthorizationViaPlacement">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$saPlmtInhibitInd"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="saPlmtInhibitInd"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00110514 -->


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
      LABEL="Field.Label.ServiceOffering.EndDate"
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
      LABEL="Field.Label.ServiceOffering.ProvisionMethod"
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
      LABEL="Field.Label.ServiceOffering.UnitFrequency"
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


    <!--BEGIN,   CR00222593,  JG -->
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
    <!-- END, CR00222593 -->


  </CLUSTER>


  <!-- BEGIN, CR00197766, PS -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Field.Label.ServiceOffering.Description"
  >


    <!-- BEGIN, CR00187899, PS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00187899 -->
      <CONNECT>
        <!-- BEGIN, CR00186299, ASN -->
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$localizableDescription"
        />
        <!-- END, CR00186299 -->
      </CONNECT>
      <CONNECT>
        <!-- BEGIN, CR00186299, ASN -->
        <TARGET
          NAME="ACTION"
          PROPERTY="localizableDescription"
        />
        <!-- END, CR00186299 -->
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- END, CR00197766 -->


  <!-- BEGIN, CR00171887, ASN -->
  <!-- BEGIN, CR00206310, PS -->
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.EstimatedCostRuleSet"
  >
    <!-- END, CR00206310 -->


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
      WIDTH="40"
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


    <!-- BEGIN, CR00334942, GA -->
    <FIELD
      LABEL="Field.Label.EstimatedCostRuleSet.DataStoreName"
      WIDTH="100"
    >
      <!-- END, CR00334942 -->
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
      WIDTH="40"
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


    <!-- BEGIN, CR00187899,CR00407812, PS, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00187899,CR00407812 -->
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
