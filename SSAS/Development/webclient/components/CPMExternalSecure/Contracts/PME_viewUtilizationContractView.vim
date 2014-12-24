<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- This page allows the user to view contract details for a provider.     -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <!-- BEGIN, CR00228142, GP -->
  <CLUSTER NUM_COLS="2">


    <FIELD LABEL="Field.Label.LicenseType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requiredLicenseType"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.GenerationDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="generationDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.TerminationDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="terminationDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CreatedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="createdBy"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.GenerationReason">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="generationReason"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.TerminationReason">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="terminationReason"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00228142 -->


  </CLUSTER>


  <!-- Provider Offerings/Services List -->
  <LIST TITLE="List.Title.ProviderOfferings">


    <!-- Provider/Service Offering Link Page -->
    <!-- BEGIN, CR00228977, GP -->
    <FIELD LABEL="Field.Label.POName">
      <!-- END, CR00228977 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="viewUtilizationProviderOfferingDetails$name"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FixedAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fixedAmt"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.MinimumAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="minAmt"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.MaximumAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="maxAmt"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ProviderOfferingStatus">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="viewUtilizationProviderOfferingDetails$status"
        />
      </CONNECT>
    </FIELD>


  </LIST>


  <!-- List of Contract Contacts -->
  <LIST TITLE="List.Title.Contacts">
    <!-- Contract Contact Link Page -->
    <FIELD
      LABEL="Field.Label.ContactName"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ContactStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="viewContractContactDetails$startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ContactEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="viewContractContactDetails$endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ContactStatus">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="viewContractContactDetails$status"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
