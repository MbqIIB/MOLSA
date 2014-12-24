<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view address details for a Participant -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Label.ServiceInvoiceRequestLineItemDetails"
  >
    <FIELD LABEL="Field.Label.ExternalReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="externalRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="externalRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Service">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="service"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceStartDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceStartDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NumberOfUnits">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="numberOfUnits"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="numberOfUnits"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.InvoiceAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="invoiceAmount"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="invoiceAmount"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceAuthReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceAuthRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceAuthRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.CaseReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="caseRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="caseRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceEndDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceEndDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.UnitAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="unitAmount"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="unitAmount"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Label.PayeeDetails"
  >
    <FIELD LABEL="Field.Label.PayeeReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="payeeRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="payeeRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.PayeeName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="payeeName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="payeeName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.ProviderDetails"
  >
    <FIELD LABEL="Field.Label.ProviderReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ProviderName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="providerName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.ClientDetails"
  >
    <FIELD LABEL="Field.Label.ClientReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientRefNum"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientRefNum"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ClientFirstName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientFirstName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientFirstName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ClientDateOfBirth">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientDateOfBirth"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientDateOfBirth"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ClientLastName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientLastName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientLastName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
