<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Lists all of the services offered by a Provider.                       -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_PARAMETER NAME="serviceInvoiceID"/>
  <SERVER_INTERFACE
    CLASS="ServiceInvoice"
    NAME="DISPLAY"
    OPERATION="viewServiceInvoice"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceInvoiceID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$serviceInvoiceID"
    />
  </CONNECT>


  <!-- BEGIN, CR00233823, PS -->
  <!-- BEGIN, CR00246368, PS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <!-- END, CR00246368 -->
    <FIELD LABEL="Field.Label.OriginatorReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="originatorReferenceNo"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ExternalReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="externalReferenceNo"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00233823 -->


  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comment"
  >


    <!-- BEGIN, CR00417165, GK -->
    <FIELD
      HEIGHT="3"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00417165 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
