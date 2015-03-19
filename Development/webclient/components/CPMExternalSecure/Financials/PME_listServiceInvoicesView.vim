<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007-2008, 2010-2011 Curam Software Ltd.                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view a service invoice details for a      -->
<!--  provider.                                                             -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <LIST>


    <FIELD
      LABEL="Field.Label.ReferenceNumber"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$dtlsList$summaryDetailsList$referenceNo"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ReceiptDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00093556, ELG -->
    <FIELD
      LABEL="Field.Label.CreationDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creationDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceInvoiceDerivedStatus"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00093556 -->


    <!-- BEGIN, CR00235784, GP -->
    <FIELD
      LABEL="Field.Label.AmountInvoiced"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="amountInvoiced"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.AmountPaid"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="amountPaid"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00235784 -->


    <!-- BEGIN, CR00227646, GP -->
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="PME_viewServiceInvoice">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="serviceInvoiceID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="serviceInvoiceID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="pageContextDescription"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageContextDescription"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!-- END, CR00227646 -->
  </LIST>


</VIEW>
