<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010-2011 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the modify reservation  page  -->
<!-- BEGIN, CR00260871, ASN -->
<?curam-deprecated Since Curam 6.0 SP1,as this page has become 
  redundant and no longer accessed after merging edit reservation pages 
  to display and update the information as a part of single page. 
  Information present in this page is included in ProviderManagement_modifyReservation page.
  Hence, this page is deprecated. See release note: CR00260871 ?>
<!-- END, CR00260871 -->
<!-- END, CR00260871 -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="reservationID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="reservationPeriodDetails$reservationID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="reservationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$reservationID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="PROVIDEROFFERING"
      PROPERTY="providerID"
    />
  </CONNECT>
  <!-- BEGIN, CR00248198, GP -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- END, CR00248198 -->
    <FIELD LABEL="Field.Label.ClientName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$clientName"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00249481, PS -->
    <FIELD
      LABEL="Field.Label.From"
      WIDTH="90"
    >
      <!-- END, CR00249481 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$from"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reservationPeriodDetails$fromDate"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00249481, PS -->
    <FIELD LABEL="Field.Label.Service">
      <!-- END, CR00249481 -->
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="result$providerOfferingSummaryDetails$providerOfferingID"
          NAME="PROVIDEROFFERING"
          PROPERTY="name"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reservationPeriodDetails$serviceOfferingID"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00249481, PS -->
    <FIELD
      LABEL="Field.Label.To"
      WIDTH="90"
    >
      <!-- END, CR00249481 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$to"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reservationPeriodDetails$toDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
