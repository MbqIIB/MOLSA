<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2009-2011 Curam Software Ltd.                                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Create view page for a service enquiry.            -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="providerConcernRoleID"/>
  <PAGE_PARAMETER NAME="serviceDeliveryID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerConcernRoleID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceDeliveryID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceDeliveryID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    STYLE="cluster-no-bottom-margin-border"
  >
    <!-- col 1 -->
    <FIELD LABEL="Field.Label.ServiceFrom">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="fromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Frequency">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="frequency"
        />
      </CONNECT>
    </FIELD>
    <!-- col 2 -->
    <FIELD
      LABEL="Field.Label.ServiceTo"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="toDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.TimeOfDay"
      WIDTH="50"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="timeOfDay"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00291683, SS -->
    <FIELD
      HEIGHT="220"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00291683 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
