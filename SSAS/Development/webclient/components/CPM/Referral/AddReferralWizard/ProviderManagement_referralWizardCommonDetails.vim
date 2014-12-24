<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="relatedID"/>
  <PAGE_PARAMETER NAME="relatedType"/>
  <PAGE_PARAMETER NAME="serviceOfferingID"/>
  <PAGE_PARAMETER NAME="rootEntityID"/>
  <PAGE_PARAMETER NAME="serviceName"/>


  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="DISPLAY"
    OPERATION="getDetails"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="ReferralWizard"
    NAME="ACTION"
    OPERATION="setDetails"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="Referral"
    NAME="DISPLAY_CLIENTS"
    OPERATION="listClientsForCase"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="DISPLAY_CLIENTS"
      PROPERTY="caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="wizardData$relatedID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedType"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="relatedType"
    />
  </CONNECT>
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
      PROPERTY="serviceName"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$serviceName"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="rootEntityID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="rootEntityID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$wizardData$relatedID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedType"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$relatedType"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$serviceOfferingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceName"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$serviceName"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="rootEntityID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$wizardData$rootEntityID"
    />
  </CONNECT>


  <!-- Display if only a sinlge client may be selected and the owner cluster should be displayed-->
  <CLUSTER
    LABEL_WIDTH="28"
    NUM_COLS="2"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="multipleClientsSelectableInd"
      />
    </CONDITION>
    <!-- Col 1 -->


    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="caseParticipantRoleID"
          NAME="DISPLAY_CLIENTS"
          PROPERTY="participantDescription"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientStringList"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientStringList"
        />
      </CONNECT>
    </FIELD>


    <CLUSTER
      NUM_COLS="2"
      STYLE="referralWizardDetails-inner-cluster"
    >
      <CLUSTER
        LABEL_WIDTH="59"
        STYLE="referralWizardDetails-inner-cluster"
      >
        <FIELD LABEL="Field.Label.ReferredByMe">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="loggedOnUserOwnerInd"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="loggedOnUserOwnerInd"
            />
          </CONNECT>
        </FIELD>
      </CLUSTER>
      <CLUSTER
        LABEL_WIDTH="20"
        STYLE="referralWizardDetails-inner-cluster inner-cluster-td-padding"
      >
        <FIELD LABEL="Field.Label.Or">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="referredBy"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="referredBy"
            />
          </CONNECT>
        </FIELD>
      </CLUSTER>
    </CLUSTER>


    <FIELD
      LABEL="Field.Label.Sensitivity"
      WIDTH="4"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="sensitivity"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="sensitivity"
        />
      </CONNECT>
    </FIELD>


    <!-- col 2 -->
    <FIELD
      LABEL="Field.Label.ReferralDate"
      WIDTH="15"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="referralDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="referralDate"
        />
      </CONNECT>
    </FIELD>


    <CLUSTER
      NUM_COLS="2"
      STYLE="referralWizardDetails-inner-cluster"
    >
      <CLUSTER
        LABEL_WIDTH="50"
        STYLE="referralWizardDetails-inner-cluster"
      >
        <FIELD LABEL="Field.Label.FollowUp">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="followUpRequiredInd"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="followUpRequiredInd"
            />
          </CONNECT>
        </FIELD>
      </CLUSTER>
      <CLUSTER
        LABEL_WIDTH="50"
        STYLE="referralWizardDetails-inner-cluster"
      >
        <FIELD
          LABEL="Field.Label.WarningDays"
          WIDTH="3"
          WIDTH_UNITS="CHARS"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="followUpWarningDays"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="followUpWarningDays"
            />
          </CONNECT>
        </FIELD>
      </CLUSTER>


    </CLUSTER>
  </CLUSTER>


  <!-- Display if multiple clients may be selected and the owner cluster should be displayed-->
  <CLUSTER NUM_COLS="2">
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="multipleClientsSelectableInd"
      />
    </CONDITION>
    <!-- Col 1 -->


    <LIST
      SCROLL_HEIGHT="100"
      TITLE="List.Title.SelectClients"
    >


      <WIDGET TYPE="MULTISELECT">


        <WIDGET_PARAMETER NAME="MULTI_SELECT_SOURCE">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY_CLIENTS"
              PROPERTY="caseParticipantRoleID"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
        <WIDGET_PARAMETER NAME="MULTI_SELECT_TARGET">
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="clientStringList"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
        <WIDGET_PARAMETER NAME="MULTI_SELECT_INITIAL">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="clientStringList"
            />
          </CONNECT>
        </WIDGET_PARAMETER>
      </WIDGET>


      <FIELD
        LABEL="Field.Label.Name"
        WIDTH="70"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY_CLIENTS"
            PROPERTY="participantName"
          />
        </CONNECT>
      </FIELD>
      <FIELD
        LABEL="Field.Label.Age"
        WIDTH="30"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY_CLIENTS"
            PROPERTY="ageLocalisableStringOpt"
          />
        </CONNECT>
      </FIELD>
    </LIST>


    <!-- col 2 -->
    <CLUSTER
      LABEL_WIDTH="27"
      TITLE="Cluster.Title.ReferralDetails"
    >
      <FIELD
        LABEL="Field.Label.ReferralDate"
        WIDTH="15"
        WIDTH_UNITS="CHARS"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="referralDate"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="referralDate"
          />
        </CONNECT>
      </FIELD>


      <CLUSTER
        NUM_COLS="2"
        STYLE="referralWizardDetails-inner-cluster"
      >
        <CLUSTER
          LABEL_WIDTH="54"
          STYLE="referralWizardDetails-inner-cluster"
        >
          <FIELD LABEL="Field.Label.ReferredByMe">
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="loggedOnUserOwnerInd"
              />
            </CONNECT>
            <CONNECT>
              <TARGET
                NAME="ACTION"
                PROPERTY="loggedOnUserOwnerInd"
              />
            </CONNECT>
          </FIELD>
        </CLUSTER>
        <CLUSTER
          LABEL_WIDTH="18"
          STYLE="referralWizardDetails-inner-cluster inner-cluster-td-padding"
        >
          <FIELD
            LABEL="Field.Label.Or"
            WIDTH="100"
          >
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="referredBy"
              />
            </CONNECT>
            <CONNECT>
              <TARGET
                NAME="ACTION"
                PROPERTY="referredBy"
              />
            </CONNECT>
          </FIELD>
        </CLUSTER>
      </CLUSTER>


      <CLUSTER
        NUM_COLS="2"
        STYLE="referralWizardDetails-inner-cluster"
      >
        <CLUSTER
          LABEL_WIDTH="54"
          STYLE="referralWizardDetails-inner-cluster"
        >
          <FIELD LABEL="Field.Label.FollowUp">
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="followUpRequiredInd"
              />
            </CONNECT>
            <CONNECT>
              <TARGET
                NAME="ACTION"
                PROPERTY="followUpRequiredInd"
              />
            </CONNECT>
          </FIELD>
        </CLUSTER>
        <CLUSTER
          LABEL_WIDTH="75"
          STYLE="referralWizardDetails-inner-cluster"
        >
          <FIELD
            LABEL="Field.Label.WarningDays"
            WIDTH="3"
            WIDTH_UNITS="CHARS"
          >
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="followUpWarningDays"
              />
            </CONNECT>
            <CONNECT>
              <TARGET
                NAME="ACTION"
                PROPERTY="followUpWarningDays"
              />
            </CONNECT>
          </FIELD>
        </CLUSTER>
      </CLUSTER>
      <FIELD
        LABEL="Field.Label.Sensitivity"
        WIDTH="4"
        WIDTH_UNITS="CHARS"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="sensitivity"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="sensitivity"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="cluster-rich-text"
    TITLE="Cluster.Title.Reason"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="multipleClientsSelectableInd"
      />
    </CONDITION>
    <FIELD HEIGHT="170">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="reason"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reason"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="cluster-rich-text"
    TITLE="Cluster.Title.Reason"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="multipleClientsSelectableInd"
      />
    </CONDITION>
    <FIELD HEIGHT="220">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="reason"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reason"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
