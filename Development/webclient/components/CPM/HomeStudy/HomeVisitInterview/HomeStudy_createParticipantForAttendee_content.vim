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
    CLASS="HomeVisitInterview"
    NAME="ACTION"
    OPERATION="registerProviderParticpantInterviewAttendee"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="HomeVisitInterview"
    NAME="DISPLAY1"
    OPERATION="getInitialDateForAttendee"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <PAGE_PARAMETER NAME="homeStudyHomeVisitID"/>
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
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="homeStudyHomeVisitID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="homeStudyHomeVisitID"
    />
  </CONNECT>
  <!-- BEGIN, CR00200179, SS -->
  <!-- BEGIN, CR00094584, SP -->
  <!-- BEGIN, CR00128007, NBR -->
  <!-- BEGIN, CR00228688, PS -->
  <CLUSTER>
    <!-- BEGIN, CR00247455, PS -->
    <!-- BEGIN, CR00197352, SS -->
    <!-- BEGIN, CR00246783, GP -->
    <CLUSTER
      DESCRIPTION="Cluster.Details.Text1"
      LABEL_WIDTH="20"
      SHOW_LABELS="true"
    >
      <!-- END, CR00246783 -->
      <!-- END, CR00247455 -->
      <!-- END, CR00228688 -->
      <!-- END, CR00200179 -->
      <!-- BEGIN, CR00248877, PS -->
      <FIELD
        LABEL="Field.Label.Person"
        WIDTH="70"
      >
        <!-- END, CR00248877 -->
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$searchConcernRoleID"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <!-- BEGIN, CR00200179, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <!-- BEGIN, CR00246783, GP -->
    <CLUSTER
      DESCRIPTION="Cluster.Details.Text2"
      LABEL_WIDTH="40"
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <!-- END, CR00246783 -->
      <!-- END, CR00200179 -->
      <!-- BEGIN, CR00247455, PS -->
      <!-- BEGIN, CR00236219, PS -->
      <FIELD
        LABEL="Field.Label.Name"
        WIDTH="100"
      >
        <!-- END, CR00247455 -->
        <!-- END, CR00236219 -->
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$name"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <!-- END, CR00094584 -->
    <!-- BEGIN, CR00197352, SS -->
    <!-- BEGIN, CR00247455, PS -->
    <CLUSTER
      LABEL_WIDTH="40"
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <!-- END, CR00247455 -->
      <!-- END, CR00200179 -->
      <!-- BEGIN, CR00236219, PS -->
      <FIELD WIDTH="100">
        <!-- END, CR00236219 -->
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$addressData"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
    <!-- BEGIN, CR00200179, SS -->
    <!-- BEGIN, CR00197352, SS -->
    <CLUSTER
      LABEL_WIDTH="40"
      NUM_COLS="2"
      SHOW_LABELS="true"
    >
      <!-- END, CR00200179 -->
      <!-- BEGIN, CR00236219, PS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Country"
        WIDTH="40"
      >
        <!-- END, CR00236219 -->
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneCountryCode"
          />
        </CONNECT>
      </FIELD>
      <!-- BEGIN, CR00236219, PS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.LocalNumber"
        WIDTH="40"
      >
        <!-- END, CR00236219 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneNumber"
          />
        </CONNECT>
      </FIELD>
      <!-- BEGIN, CR00236219, PS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.AreaCode"
        WIDTH="40"
      >
        <!-- END, CR00236219 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneAreaCode"
          />
        </CONNECT>
      </FIELD>
      <!-- BEGIN, CR00236219, PS -->
      <FIELD
        ALIGNMENT="LEFT"
        LABEL="Field.Label.Extension"
        WIDTH="40"
      >
        <!-- END, CR00236219 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="details$phoneExtension"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>
  <!-- END, CR00128007 -->
  <!-- BEGIN, CR00247455, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    SHOW_LABELS="true"
    TITLE="Cluster.Label.ParticipantDetails"
  >
    <!-- BEGIN, CR00246783, GP -->
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.StartDate"
      WIDTH="50"
    >
      <!-- END, CR00246783 -->


      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="initialDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$fromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
    <!-- BEGIN, CR00246783, GP -->
    <FIELD
      ALIGNMENT="LEFT"
      LABEL="Field.Label.EndDate"
      USE_DEFAULT="false"
      WIDTH="50"
    >
      <!-- END, CR00246783 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="details$toDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00247455 -->
</VIEW>
