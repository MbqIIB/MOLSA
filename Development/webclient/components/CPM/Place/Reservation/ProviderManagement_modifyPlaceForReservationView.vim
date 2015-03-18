<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the modify reservation  page  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <!-- BEGIN, CR00260871, ASN -->
  <?curam-deprecated Since Curam 6.0 SP1,as this page is redundant and not in use anymore by the application.
    Edit reservation page has been merged to display and update the information as a part of single page. 
    Information present in this page is included in ProviderManagement_modifyReservation page.
    Hence, this page is deprecated. See release note: CR00260871 ?>
  <!-- END, CR00260871 -->


  <!-- BEGIN, CR00249314, PS -->
  <SERVER_INTERFACE
    CLASS="MaintainReservation"
    NAME="DISPLAY2"
    OPERATION="retrieveReservationPeriod"
    PHASE="DISPLAY"
  />
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="from"
    />
    <TARGET
      NAME="DISPLAY2"
      PROPERTY="reservationPeriodDetails$fromDateString"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="to"
    />
    <TARGET
      NAME="DISPLAY2"
      PROPERTY="reservationPeriodDetails$toDateString"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY2"
      PROPERTY="result$fromDate"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$from"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY2"
      PROPERTY="result$toDate"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$to"
    />
  </CONNECT>
  <!-- END, CR00249314 -->


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="reservationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$key$reservationID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceOfferingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="reservationID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$reservationID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00228688, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- END, CR00228688 -->
    <FIELD LABEL="Field.Label.FromDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="result$fromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Place">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="result$placeName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$placeID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$placeID"
        />
      </CONNECT>
      <LINK>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="reservationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="reservationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="from"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="from"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="to"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="to"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD LABEL="Field.Label.ToDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY2"
          PROPERTY="result$toDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Comments.Title"
  >
    <!-- BEGIN, CR00228688, PS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00228688 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
