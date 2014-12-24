<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2011, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2011 Curam Software Ltd.                                                 -->
<!-- All rights reserved.                                                                                       -->
<!-- This software is the confidential and proprietary information of Curam      -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose             -->
<!-- such Confidential Information and shall use it only in accordance with       -->
<!-- the terms of the license agreement you entered into with Curam              -->
<!-- Software.                                                                                                     -->
<!-- This page is a generic page which allows the user to add a text                -->
<!-- translation to a localized text.                                                                    -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CLUSTER NUM_COLS="2">
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="result$isExternalUser"
      />
    </CONDITION>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.AdditionalName">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$additionalName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <CONTAINER LABEL="Cluster.Field.Label.PreferredLanguage">
      <!-- END, CR00342336 -->
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="preferredLanguage"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL IMAGE="InformationalIcon">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="userSkillsInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewProviderEnquiryOwnerLanguageSkillInformational"
          WINDOW_OPTIONS="width=650"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="providerEnquiryID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerEnquiryID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.EnquiryDate">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$enquiryDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ReasonForEnquiry">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$reasonForEnquiry"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ReceivedBy">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$ownerFullName"
        />
      </CONNECT>


      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_viewUserDetails"
        WINDOW_OPTIONS="width=600"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$ownerName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.PreferredCommunication">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="preferredCommunication"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.EndDate">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.CategoryType">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerType"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER NUM_COLS="2">
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="result$isExternalUser"
      />
    </CONDITION>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.AdditionalName">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$additionalName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.PreferredLanguage">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="preferredLanguage"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.EnquiryDate">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$enquiryDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ReasonForEnquiry">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$reasonForEnquiry"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NoOfChildren">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$noOfChildren"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$referenceNumber"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ReceivedBy">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$ownerName"
        />
      </CONNECT>
      <LINK PAGE_ID="ExternalUser_userHome">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$ownerName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.PreferredCommunication">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="preferredCommunication"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.EndDate">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.CategoryType">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerType"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- BEGIN, CR00342336, PB -->
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.ProvderAddresses"
  >
    <FIELD LABEL="Cluster.Field.Label.HomeAddress">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$formattedHomeAddressData"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.WorkAddress">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$formattedWorkAddressData"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- BEGIN, CR00342336, PB -->
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.ProvderPhoneNumbers"
  >
    <CONTAINER LABEL="Cluster.Field.Label.HomePhone">
      <!-- END, CR00342336 -->
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$homePhoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$homePhoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$homePhoneNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
    <!-- BEGIN, CR00342336, PB -->
    <CONTAINER LABEL="Cluster.Field.Label.WorkPhone">
      <!-- END, CR00342336 -->
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$workPhoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$workPhoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$workPhoneNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
    <!-- BEGIN, CR00342336, PB -->
    <CONTAINER LABEL="Cluster.Field.Label.MobilePhone">
      <!-- END, CR00342336 -->
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$mobilePhoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$mobilePhoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD WIDTH_UNITS="CHARS">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$mobilePhoneNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
  </CLUSTER>
  <!-- BEGIN, CR00342336, PB -->
  <CLUSTER TITLE="Cluster.Title.ProvderMeetingDetails">
    <FIELD LABEL="Cluster.Field.Label.PrefferedSession">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$preferredSession"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ScheduledMeeting">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$scheduledMeeting"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ConfirmMeetDetails">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$confirmedMeetingDetails"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.AttendedMeeting">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$attendedMeeting"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00342336, PB -->
    <FIELD LABEL="Cluster.Field.Label.ObtainApplForm">
      <!-- END, CR00342336 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$obtainedApplicationForm"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    NUM_COLS="2"
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <!-- BEGIN, CR00342336, PB -->
    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Label.ProvderAvailability"
      WIDTH="90"
    >
      <!-- END, CR00342336 -->
      <FIELD HEIGHT="3">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$availabilityForContact"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <!-- BEGIN, CR00342336, PB -->
    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Label.ProvderAdditionalInfo"
      WIDTH="90"
    >
      <!-- END, CR00342336 -->
      <FIELD HEIGHT="3">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$additionalInformation"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
</VIEW>
