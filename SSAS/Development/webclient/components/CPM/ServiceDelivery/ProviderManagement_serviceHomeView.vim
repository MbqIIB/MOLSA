<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2009-2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Service Delivery home page details.                                          -->
<VIEW xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd">
  <SERVER_INTERFACE CLASS="ServiceDelivery" NAME="DISPLAY" OPERATION="viewServiceDelivery"
    PHASE="DISPLAY"/>


  <PAGE_PARAMETER NAME="serviceDeliveryID"/>


  <CONNECT>
    <SOURCE NAME="PAGE" PROPERTY="serviceDeliveryID"/>
    <TARGET NAME="DISPLAY" PROPERTY="key$serviceDeliveryID"/>
  </CONNECT>


  <CLUSTER LABEL_WIDTH="40" NUM_COLS="2" STYLE="cluster-transparent-with-border">


    <FIELD LABEL="Field.Label.Owner">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="ownerFullname"/>
      </CONNECT>
      <LINK OPEN_MODAL="true" PAGE_ID="Organization_viewUserDetails"
        WINDOW_OPTIONS="width=800,height=250">
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="ownerUsername"/>
          <TARGET NAME="PAGE" PROPERTY="userName"/>
        </CONNECT>
      </LINK>
    </FIELD>
    <CONTAINER LABEL="Container.AddedByString.Label">
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="createdByDate"/>
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="createByFullname"/>
        </CONNECT>
        <LINK OPEN_MODAL="true" PAGE_ID="Organization_viewUserDetails"
          WINDOW_OPTIONS="width=800,height=250">
          <CONNECT>
            <SOURCE NAME="DISPLAY" PROPERTY="createdBy"/>
            <TARGET NAME="PAGE" PROPERTY="userName"/>
          </CONNECT>
        </LINK>
      </FIELD>
    </CONTAINER>
    <FIELD LABEL="Field.Label.Sensitivity">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="sensitivity"/>
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Supervisor">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="supervisorFullname"/>
      </CONNECT>
      <LINK OPEN_MODAL="true" PAGE_ID="Organization_viewUserDetails"
        WINDOW_OPTIONS="width=800,height=250">
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="supervisorUsername"/>
          <TARGET NAME="PAGE" PROPERTY="userName"/>
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD LABEL="Field.Reason.Label">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="reason"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="40" NUM_COLS="2">
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="completedInd"/>
    </CONDITION>
    <CONTAINER LABEL="Container.CompletedByString.Label">
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="completedByDate"/>
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="completedByUserFullname"/>
        </CONNECT>
        <LINK OPEN_MODAL="true" PAGE_ID="Organization_viewUserDetails"
          WINDOW_OPTIONS="width=800,height=250">
          <CONNECT>
            <SOURCE NAME="DISPLAY" PROPERTY="completedBy"/>
            <TARGET NAME="PAGE" PROPERTY="userName"/>
          </CONNECT>
        </LINK>
      </FIELD>
    </CONTAINER>


    <FIELD LABEL="Field.Label.CompletionComments">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="completionComments"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- Units delivered, displayed if units are configurable for the service-->
  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="20" >
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="numberOfUnitsInd"/>
    </CONDITION>
    <FIELD>
      <LABEL>
        <CONNECT>
          <SOURCE NAME="TEXT" PROPERTY="Field.Label.UnitsDelivered"/>
        </CONNECT>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="serviceUnitsLabelDisplayString"/>
        </CONNECT>
      </LABEL>
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="unitsDelivered"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- Authorized Rate, displayed if configurable for the service-->
  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="20" >
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="authorizedRateInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.AuthorizedRate">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="authorizedRate"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- Frequency, displayed if configurable for the service-->
  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="20" >
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="displayFrequencyInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.Frequency">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="frequency"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- Nominee, displayed if configurable for the service-->
  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="20" >
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="nomineeToBeSpdInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.Nominee">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="nomineeConcernName"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER LABEL_WIDTH="20" TITLE="Cluster.Participation.Title">
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="servDelParticipationInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.Frequency">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="participationFrequencyAndDuration"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- Federal Allowable Component, displayed if one is linked to the service-->
  <CLUSTER BEHAVIOR="NONE" LABEL_WIDTH="20" >
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="linkedFedComponentInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.FederalAllowableComponent">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="federalAllowableComponentName"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER LABEL_WIDTH="40" NUM_COLS="2" TITLE="Cluster.Label.Provider">
    <CONDITION>
      <IS_TRUE NAME="DISPLAY" PROPERTY="displayProviderInd"/>
    </CONDITION>
    <FIELD LABEL="Field.Label.ProviderName">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="providerName"/>
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Address">
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="address"/>
      </CONNECT>
    </FIELD>
    <CONTAINER LABEL="Field.Label.PhoneNumber">
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="phoneCountryCode"/>
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="phoneAreaCode"/>
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="phoneNumber"/>
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE NAME="DISPLAY" PROPERTY="phoneExtension"/>
        </CONNECT>
      </FIELD>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER SHOW_LABELS="false" TITLE="Cluster.Notes.Title">
    <FIELD>
      <CONNECT>
        <SOURCE NAME="DISPLAY" PROPERTY="comments"/>
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
