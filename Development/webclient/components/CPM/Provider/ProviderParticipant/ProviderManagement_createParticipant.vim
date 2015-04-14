<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
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
<!-- Description -->
<!-- =========== -->
<!-- This is the create participant for provider page  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <SERVER_INTERFACE
    CLASS="ProviderParticipant"
    NAME="ACTION"
    OPERATION="createProviderParticipant"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="details$providerID"
    />
  </CONNECT>
  <!-- BEGIN, CR00248011, GP -->
  <!-- BEGIN, CR00094584, SP -->
  <!-- BEGIN, CR00128007, NBR -->
  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER STYLE="cluster-cpr-no-internal-padding">
    <!-- END, CR00197352 -->


    <!-- BEGIN, CR00187976, SS -->
    <!-- BEGIN, CR00248555, PS -->
    <CLUSTER
      DESCRIPTION="Cluster.Details.Text1"
      LABEL_WIDTH="35"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <!-- END, CR00248555 -->
      <!-- BEGIN, CR00248011, GP -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Person"
        WIDTH="100"
      >
        <!-- END, CR00248011 -->
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$searchConcernRoleID"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <!-- BEGIN, CR00248555, PS -->
    <CLUSTER
      DESCRIPTION="Cluster.Details.Text2"
      LABEL_WIDTH="35"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <!-- END, CR00248555 -->


      <!-- BEGIN, CR00229065, PS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Name"
        WIDTH="100"
      >
        <!-- END, CR00187976 -->
        <!-- END, CR00229065 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$name"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <!-- END, CR00094584 -->


    <!-- BEGIN, CR00187976, SS -->
    <!-- BEGIN, CR00248555, PS -->
    <CLUSTER
      LABEL_WIDTH="35"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <!-- END, CR00248555 -->
      <FIELD WIDTH="100">
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$addressData"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <!-- BEGIN, CR00248555, PS -->
    <!-- BEGIN, CR00187976, SS -->
    <CLUSTER
      LABEL_WIDTH="35"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <!-- END, CR00248555 -->
      <!-- END, CR00128007 -->


      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Country"
        WIDTH="50"
      >
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneCountryCode"
          />
        </CONNECT>
      </FIELD>


      <!-- BEGIN, CR00187976, SS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.LocalNumber"
        WIDTH="50"
      >
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneNumber"
          />
        </CONNECT>
      </FIELD>


      <!-- BEGIN, CR00187976, SS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.AreaCode"
        WIDTH="50"
      >
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneAreaCode"
          />
        </CONNECT>
      </FIELD>


      <!-- BEGIN, CR00187976, SS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Extension"
        WIDTH="50"
      >
        <!-- END, CR00187976 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneExtension"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>


  <!-- <CLUSTER > -->


  <!-- BEGIN, CR00187976, SS -->
  <!-- BEGIN, CR00248555, PS -->
  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    SHOW_LABELS="true"
    TITLE="Cluster.Label.ParticipantDetails"
  >
    <!-- END, CR00248555 -->
    <!-- BEGIN, CR00229065, PS -->
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.Type"
      WIDTH="65"
    >
      <!-- END, CR00229065 -->
      <!-- END, CR00228396 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$type"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.StartDate"
      WIDTH="40"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$fromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.EndDate"
      USE_DEFAULT="false"
      WIDTH="40"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$toDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!--  </CLUSTER> -->
  <!-- END, CR00248011 -->


</VIEW>
