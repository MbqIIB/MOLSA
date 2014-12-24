<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007-2011 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- ==================================                                      -->
<!-- This page allows the user to view service offering details.             -->
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


  <!-- BEGIN, CR00157486, AK -->
  <SERVER_INTERFACE
    CLASS="MaintainServiceOfferingApprovalCheck"
    NAME="SERVICEOFFERINGAPPROVALCHECKS"
    OPERATION="listServiceOfferingApprovalChecks"
  />
  <!-- END, CR00157486 -->


  <PAGE_PARAMETER NAME="serviceOfferingID"/>


  <!-- BEGIN, CR00157486, AK -->
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
  <!-- END, CR00157486 -->


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


  <CLUSTER
    NUM_COLS="2"
  >

    <!-- BEGIN, CR00178548, AK -->
    <CONTAINER LABEL="Field.Label.ServiceOffering.Name">
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
        <!-- BEGIN, CR00180149, ASN -->
        <!-- BEGIN, CR00237603, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableSONameText"
        >
          <!-- END, CR00237603 -->
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
      <!-- END, CR00180149 -->


    </CONTAINER>
    <!-- END, CR00178548  -->


    <!-- BEGIN, CR00187899, PS -->

    <FIELD LABEL="Field.Label.ServiceOffering.MaximumUnits">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$maximumUnits"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ServiceOffering.PlacementBasedPayment">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="placementPmtInd"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00110514, RPB -->
    <FIELD LABEL="Field.Label.ServiceOffering.InhibitAuthorizationViaPlacement">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="saPlmtInhibitInd"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00110514 -->


    <FIELD LABEL="Field.Label.ServiceOffering.ProvisionMethod">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="provisionMethod"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ServiceOffering.UnitFrequency">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$unitFrequency"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00187899 -->


    <!-- BEGIN, CR00115627, GP -->
    <FIELD LABEL="Field.Label.ServiceOffering.PayBasedOnAttendanceIndicator">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$payBasedOnAttendanceInd"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00115627 -->

    <!--BEGIN,   CR00222593,  JG -->
    <FIELD LABEL="Field.Label.CheckAvailabilityExcludeIndicator">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingDtls$availabilityCheckExcludeInd"
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
    <!-- BEGIN, CR00178548, AK -->
    <CONTAINER>
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
      </FIELD>
      <!-- BEGIN, CR00180149, ASN -->
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
        <!-- BEGIN, CR00187417, PS -->
        <!-- BEGIN, CR00187899, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_addDescriptionTranslationToServiceOffering"
          WINDOW_OPTIONS="width=500"
        >
          <!-- END, CR00187899 -->
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
          WINDOW_OPTIONS="width=500"
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
    <!-- END, CR00180149 -->
    <!-- END, CR00178548 -->
  </CLUSTER>


  <!-- BEGIN, CR00198609, PS -->
  
  <CLUSTER NUM_COLS="2">
    <!-- BEGIN, CR00229065, PS -->
    <LIST TITLE="Cluster.Label.ServiceGroup" WIDTH="90">
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


    <!-- BEGIN, CR00157486, AK -->
    <LIST TITLE="List.Title.ApprovalChecks">
      <!-- BEGIN, CR00198609, PS -->
      <ACTION_SET TYPE="LIST_ROW_MENU">
        <!-- END, CR00198609 -->


        <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
          <!-- BEGIN, CR00197766, PS -->
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProviderManagement_modifyServiceOfferingApprovalCheck"
            WINDOW_OPTIONS="width=450"
          >
            <!-- END, CR00197766 -->
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
        <!-- BEGIN, CR00198609, PS -->


        <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
          <LINK
            OPEN_MODAL="true"
            PAGE_ID="ProviderManagement_deleteServiceOfferingApprovalCheck"
            WINDOW_OPTIONS="width=350"
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
      <!-- END, CR00198609 -->


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


      <!-- BEGIN, CR00198609, PS -->
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
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingDtls$name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
          </CONNECT>
        </INLINE_PAGE>
      </DETAILS_ROW>
      <!-- END, CR00198609 -->
    </LIST>
    <!-- END, CR00157486 -->
  </CLUSTER>
  <!-- END, CR00198609 -->


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


  </CLUSTER>
  <!-- END, CR00171887 -->


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Comments"
  >
    <!-- BEGIN, CR00187899, PS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00187899 -->
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
