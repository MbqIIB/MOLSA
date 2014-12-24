<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2011 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- ====================================                 -->
<!-- This page allows the user to view a training service offering's home page -->
<!-- details and further details.																 -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <!-- BEGIN, CR00171770, SG -->
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Home"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="DISPLAY"
    OPERATION="viewServiceOffering"
  />


  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="DISPLAY1"
    OPERATION="viewTrainingServiceOffering"
  />


  <PAGE_PARAMETER NAME="serviceOfferingID"/>

  <!-- BEGIN, CR00228079, PS -->
  <SERVER_INTERFACE
    CLASS="MaintainServiceOfferingApprovalCheck"
    NAME="SERVICEOFFERINGAPPROVALCHECKS"
    OPERATION="listServiceOfferingApprovalChecks"
  />
  
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="SERVICEOFFERINGAPPROVALCHECKS"
      PROPERTY="serviceOfferingID"
    />
  </CONNECT>
  <!-- END, CR00228079 -->

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

  <!-- BEGIN, CR00228079, PS -->
  <CLUSTER
    NUM_COLS="2"
  >
    <!-- END, CR00228079 -->
    <!-- BEGIN, CR00186631, ASN -->
    <CONTAINER LABEL="Field.Label.TrainingServiceOffering.Name">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$serviceOfferingDtls$name"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >


        <!-- BEGIN, CR00187417, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableSONameText"
          WINDOW_OPTIONS="width=700"
        >
          <!-- END, CR00187417 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$nameTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <!-- END, CR00186631 -->

    <!-- BEGIN, CR00187899, PS -->

    <FIELD LABEL="Field.Label.TrainingServiceOffering.MaximumUnits">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$maximumUnits"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TrainingServiceOffering.PlacementBasedPayment">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$placementPmtInd"
        />
      </CONNECT>
    </FIELD>

    <!-- END, CR00228079 -->
    <!-- END, CR00187899 -->

    <!-- BEGIN, CR00248112, PS -->
    <FIELD LABEL="Field.Label.CheckAvailabilityExcludeIndicator">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$availabilityCheckExcludeInd"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00248112 -->
    
    <FIELD LABEL="Field.Label.TrainingServiceOffering.ProvisionMethod">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="provisionMethod"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TrainingServiceOffering.UnitFrequency">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$unitFrequency"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ServiceOffering.PayBasedOnAttendanceIndicator">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="payBasedOnAttendanceInd"
        />
      </CONNECT>
    </FIELD>

  </CLUSTER>


  <!-- BEGIN, CR00197766, PS -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Field.Label.TrainingServiceOffering.Description"
  >
    <!-- BEGIN, CR00186631, ASN -->
    <CONTAINER>
      <!-- END, CR00186631 -->
      <FIELD HEIGHT="3">
        <CONNECT>
          <!-- BEGIN, CR00186631, ASN -->
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$localizableDescription"
          />
          <!-- END, CR00186631 -->
        </CONNECT>
      </FIELD>
      <!-- BEGIN, CR00186631, ASN -->
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="descAddInd"
          />
        </CONDITION>
        <!-- BEGIN, CR00206671, SS -->
        <!-- BEGIN, CR00187417, PS -->
        <!-- BEGIN, CR00187899, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_addDescriptionTranslationToServiceOffering"
          WINDOW_OPTIONS="width=350"
        >
          <!-- END, CR00187899 -->
          <!-- END, CR00187417 -->
          <!-- END, CR00206671 -->
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$descriptionTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="descViewInd"
          />
        </CONDITION>
        <!-- BEGIN, CR00187417, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableDescriptionTextForServiceOffering"
          WINDOW_OPTIONS="width=700"
        >
          <!-- END, CR00187417 -->
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceOfferingID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$descriptionTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <!-- END, CR00186631 -->
  </CLUSTER>
  <!-- END, CR00197766 -->

  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Label.TrainingDetails"
  >


    <FIELD LABEL="Field.Label.TrainingServiceOffering.TrainingName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="trainingName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TrainingServiceOffering.ApprovalRequired">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="approvalRequired"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197766, PS -->
    <FIELD
      LABEL="Field.Label.Training.TrainingType"
      WIDTH="70"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="result$trainingSODetails$training$trainingType"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00197766 -->


    <FIELD LABEL="Field.Label.TrainingServiceOffering.UnitsRequired">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="trainingServiceOffering$unitsRequired"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST TITLE="Cluster.Label.TrainingCredits">
    <!-- BEGIN, CR00198609, PS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00198609 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_modifyTrainingCredit"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="trainingCreditID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="trainingCreditID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <!-- BEGIN, CR00197352, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_cancelTrainingCredit"
          WINDOW_OPTIONS="width=350"
        >
          <!-- END, CR00197352 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="trainingCreditID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="trainingCreditID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="details$trainingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="trainingID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="details$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00198609, PS -->
    </ACTION_SET>
    <!-- END, CR00198609 -->


    <FIELD LABEL="Field.Label.ProviderCategory">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="providerCategory"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ProviderType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="providerType"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      LABEL="Field.Label.Type"
      USE_BLANK="true"
      WIDTH="8"
    >
      <!-- END, CR00187899 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="result$trainingSODetails$trainingCredits$details$details$type"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      LABEL="Field.Label.Value"
      WIDTH="8"
    >
      <!-- END, CR00187899 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="value"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ValidityPeriod">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="validityPeriodString"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ValidityPeriodUnit">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="validityPeriodUnit"
        />
      </CONNECT>
    </FIELD>
  </LIST>

  <!-- BEGIN, CR00228079, PS -->
  <CLUSTER NUM_COLS="2">
    <!-- BEGIN, CR00229065, PS -->
  <LIST
    TITLE="Cluster.Label.ServiceGroup"
    WIDTH="90"
    >
    <!-- END, CR00229065 -->
    <FIELD LABEL="Field.Label.ServiceGroup.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceGroupDtlsList$dtls$name"
        />
      </CONNECT>
    </FIELD>
  </LIST>
    
    <LIST TITLE="List.Title.ApprovalChecks">
      <ACTION_SET TYPE="LIST_ROW_MENU">
        
        
        <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProviderManagement_modifyServiceOfferingApprovalCheck"
            WINDOW_OPTIONS="width=450"
            >
            <CONNECT>
              <SOURCE
                NAME="SERVICEOFFERINGAPPROVALCHECKS"
                PROPERTY="result$approvalCheckDtls$approvalCheckDtls$approvalCheckID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="approvalCheckID"
              />
            </CONNECT>
            <CONNECT>
              <SOURCE
                NAME="SERVICEOFFERINGAPPROVALCHECKS"
                PROPERTY="result$approvalCheckDtls$approvalCheckDtls$versionNo"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="versionNo"
              />
            </CONNECT>
          </LINK>
        </ACTION_CONTROL>
        
        
        <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProviderManagement_deleteServiceOfferingApprovalCheck"
            >
            <CONNECT>
              <SOURCE
                NAME="SERVICEOFFERINGAPPROVALCHECKS"
                PROPERTY="result$approvalCheckDtls$approvalCheckDtls$approvalCheckID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="approvalCheckID"
              />
            </CONNECT>
            <CONNECT>
              <SOURCE
                NAME="SERVICEOFFERINGAPPROVALCHECKS"
                PROPERTY="result$approvalCheckDtls$approvalCheckDtls$versionNo"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="versionNo"
              />
            </CONNECT>
          </LINK>
        </ACTION_CONTROL>
      </ACTION_SET>
      
      
      <FIELD LABEL="Field.Label.ApprovalCheck.Percentage">
        <CONNECT>
          <SOURCE
            NAME="SERVICEOFFERINGAPPROVALCHECKS"
            PROPERTY="result$approvalCheckDtls$approvalCheckDtls$percentage"
          />
        </CONNECT>
      </FIELD>
      
      
      <FIELD LABEL="Field.Label.ApprovalCheck.Status">
        <CONNECT>
          <SOURCE
            NAME="SERVICEOFFERINGAPPROVALCHECKS"
            PROPERTY="result$approvalCheckDtls$approvalCheckDtls$recordStatus"
          />
        </CONNECT>
      </FIELD>
      
      <DETAILS_ROW>
        <INLINE_PAGE PAGE_ID="ProviderManagement_viewServiceOfferingApprovalCheck">
          <CONNECT>
            <SOURCE
              NAME="SERVICEOFFERINGAPPROVALCHECKS"
              PROPERTY="result$approvalCheckDtls$approvalCheckDtls$approvalCheckID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="approvalCheckID"
            />
          </CONNECT>
        </INLINE_PAGE>
      </DETAILS_ROW>
    </LIST>
  </CLUSTER>
  <!-- END, CR00228079 -->
  
  <!-- BEGIN, CR00171887, ASN -->
  <CLUSTER
    LABEL_WIDTH="50"
    NUM_COLS="2"
    TITLE="Cluster.Title.EstimatedCostRuleSet"
  >


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.RuleSet">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$startDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.DataStoreName">
      <CONNECT>
        <!-- BEGIN, CR00188479, ASN -->
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$creoleDataStoreName"
        />
        <!-- END, CR00188479 -->
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.EstimatedCostRuleSet.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creoleRuleSetLinkDtls$endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00171887 -->
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Comments"
  >
    <FIELD HEIGHT="3">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00171770 -->


</VIEW>
