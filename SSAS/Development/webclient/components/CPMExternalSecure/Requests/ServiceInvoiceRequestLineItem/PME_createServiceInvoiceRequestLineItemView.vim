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
        <TARGET
          NAME="ACTION"
          PROPERTY="externalRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Service">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceStartDate">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceStartDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.NumberOfUnits">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="numberOfUnits"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.InvoiceAmount">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="invoiceAmount"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceAuthReferenceNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceAuthRefNum"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CaseReferenceNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="caseRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceEndDate">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceEndDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.UnitAmount">
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
        <TARGET
          NAME="ACTION"
          PROPERTY="payeeRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.PayeeName">
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
        <TARGET
          NAME="ACTION"
          PROPERTY="providerRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ProviderName">
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
        <TARGET
          NAME="ACTION"
          PROPERTY="clientRefNum"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ClientFirstName">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientFirstName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ClientDateOfBirth"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientDateOfBirth"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ClientLastName">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="clientLastName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
