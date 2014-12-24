<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2009-2010 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view a service invoice request line item.   -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00228977, GP -->
  <CLUSTER NUM_COLS="2">


    <FIELD LABEL="Field.Label.ReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="referenceNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Service">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="service"
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
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
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
    </FIELD>
    <FIELD CONTROL="SKIP"/>
    <!--Amount paid missing here. TODO -->
    <FIELD LABEL="Field.Label.ExternalReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="externalRefNum"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
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
    </FIELD>
    <FIELD LABEL="Field.Label.ServiceEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
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
    </FIELD>
    <FIELD LABEL="Field.Label.InvoiceAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="invoiceAmount"
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
    </FIELD>
    <FIELD LABEL="Field.Label.PayeeName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
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
    </FIELD>
    <FIELD LABEL="Field.Label.ProviderName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerName"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00158345, GP -->
  <LIST TITLE="List.Label.ClientDetails">
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Remove">
        <!-- BEGIN, CR00187425, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="PME_removeClientFromServiceInvoiceRequestLineItem"
          WINDOW_OPTIONS="width=300"
        >
          <!-- END, CR00187425 -->


          <CONNECT>
            <SOURCE
              NAME="DISPLAY2"
              PROPERTY="serviceInvReqLineItemClientID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceInvReqLineItemClientID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="serviceInvoiceRequestLineItemID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceInvReqLineItemID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY2"
              PROPERTY="clientReferenceNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="clientReferenceNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


    <FIELD LABEL="Field.Label.ClientReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="clientReferenceNo"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ClientFirstName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="clientFirstName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ClientLastName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="clientLastName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ClientDateOfBirth"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="clientDateOfBirth"
        />
      </CONNECT>
    </FIELD>
  </LIST>
  <!-- END, CR00158345 -->
  <!-- END, CR00228977 -->


</VIEW>
